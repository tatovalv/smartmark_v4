import fs from "fs"
import path from "path"
import zlib from "zlib"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, "..", "public")

function crc32(buf) {
  let c = ~0
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i]
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1))
  }
  return ~c >>> 0
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type)
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])))
  return Buffer.concat([len, typeBuf, data, crc])
}

function encodePNG(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y++) {
    const rowStart = y * (width * 4 + 1)
    raw[rowStart] = 0
    rgba.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ])
}

function decodePNG(buf) {
  let off = 8
  let width = 0
  let height = 0
  const idats = []
  while (off < buf.length) {
    const len = buf.readUInt32BE(off)
    const type = buf.toString("ascii", off + 4, off + 8)
    const data = buf.subarray(off + 8, off + 8 + len)
    if (type === "IHDR") {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
    } else if (type === "IDAT") idats.push(data)
    else if (type === "IEND") break
    off += 12 + len
  }
  const inflated = zlib.inflateSync(Buffer.concat(idats))
  const bpp = 4
  const rowLen = width * bpp
  const out = Buffer.alloc(height * rowLen)
  let i = 0
  let prev = Buffer.alloc(rowLen)
  for (let y = 0; y < height; y++) {
    const filter = inflated[i++]
    const row = inflated.subarray(i, i + rowLen)
    i += rowLen
    const recon = Buffer.alloc(rowLen)
    for (let x = 0; x < rowLen; x++) {
      const a = x >= bpp ? recon[x - bpp] : 0
      const b = prev[x]
      const c = x >= bpp ? prev[x - bpp] : 0
      let v = row[x]
      if (filter === 1) v = (v + a) & 255
      else if (filter === 2) v = (v + b) & 255
      else if (filter === 3) v = (v + Math.floor((a + b) / 2)) & 255
      else if (filter === 4) {
        const p = a + b - c
        const pa = Math.abs(p - a)
        const pb = Math.abs(p - b)
        const pc = Math.abs(p - c)
        const pr = pa <= pb && pa <= pc ? a : pb <= pc ? b : c
        v = (v + pr) & 255
      }
      recon[x] = v
    }
    recon.copy(out, y * rowLen)
    prev = recon
  }
  return { width, height, rgba: out }
}

function recolor(rgba) {
  const out = Buffer.alloc(rgba.length)
  for (let i = 0; i < rgba.length; i += 4) {
    const r = rgba[i]
    const g = rgba[i + 1]
    const b = rgba[i + 2]
    const a = rgba[i + 3]
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
    if (a < 10 || lum < 22) continue
    if (g > r + 12 && g > b + 8 && g > 50) {
      const alpha = g > 120 ? 255 : Math.round((g / 120) * 255)
      out[i] = r
      out[i + 1] = g
      out[i + 2] = b
      out[i + 3] = alpha
      continue
    }
    if (max - min < 32) {
      const alpha = Math.round(Math.min(255, ((lum - 22) / (255 - 22)) * 255))
      out[i] = 10
      out[i + 1] = 10
      out[i + 2] = 10
      out[i + 3] = alpha
    }
  }
  return out
}

function bounds(rgba, width, height) {
  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] < 16) continue
      if (x < minX) minX = x
      if (y < minY) minY = y
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
    }
  }
  return { minX, minY, maxX, maxY }
}

function crop(rgba, width, height, box, pad) {
  const x0 = Math.max(0, box.minX - pad)
  const y0 = Math.max(0, box.minY - pad)
  const x1 = Math.min(width - 1, box.maxX + pad)
  const y1 = Math.min(height - 1, box.maxY + pad)
  const w = x1 - x0 + 1
  const h = y1 - y0 + 1
  const out = Buffer.alloc(w * h * 4)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const src = ((y0 + y) * width + (x0 + x)) * 4
      const dst = (y * w + x) * 4
      rgba.copy(out, dst, src, src + 4)
    }
  }
  return { rgba: out, width: w, height: h }
}

function resize(src, sw, sh, dw, dh) {
  const dst = Buffer.alloc(dw * dh * 4)
  for (let y = 0; y < dh; y++) {
    const y0 = Math.floor((y * sh) / dh)
    const y1 = Math.max(y0 + 1, Math.floor(((y + 1) * sh) / dh))
    for (let x = 0; x < dw; x++) {
      const x0 = Math.floor((x * sw) / dw)
      const x1 = Math.max(x0 + 1, Math.floor(((x + 1) * sw) / dw))
      let r = 0
      let g = 0
      let b = 0
      let a = 0
      let n = 0
      for (let yy = y0; yy < y1 && yy < sh; yy++) {
        for (let xx = x0; xx < x1 && xx < sw; xx++) {
          const i = (yy * sw + xx) * 4
          const pa = src[i + 3] / 255
          r += src[i] * pa
          g += src[i + 1] * pa
          b += src[i + 2] * pa
          a += pa
          n++
        }
      }
      const o = (y * dw + x) * 4
      if (a === 0 || n === 0) continue
      dst[o] = Math.round(r / a)
      dst[o + 1] = Math.round(g / a)
      dst[o + 2] = Math.round(b / a)
      dst[o + 3] = Math.min(255, Math.round((a / n) * 255))
    }
  }
  return dst
}

function contain(src, sw, sh, size, pad, background) {
  const inner = size - pad * 2
  const scale = Math.min(inner / sw, inner / sh)
  const dw = Math.max(1, Math.round(sw * scale))
  const dh = Math.max(1, Math.round(sh * scale))
  const resized = resize(src, sw, sh, dw, dh)
  const canvas = Buffer.alloc(size * size * 4)
  if (background) {
    for (let i = 0; i < canvas.length; i += 4) {
      canvas[i] = background[0]
      canvas[i + 1] = background[1]
      canvas[i + 2] = background[2]
      canvas[i + 3] = 255
    }
  }
  const ox = Math.floor((size - dw) / 2)
  const oy = Math.floor((size - dh) / 2)
  for (let y = 0; y < dh; y++) {
    for (let x = 0; x < dw; x++) {
      const s = (y * dw + x) * 4
      const d = ((oy + y) * size + (ox + x)) * 4
      const sa = resized[s + 3] / 255
      if (sa === 0) continue
      if (!background || canvas[d + 3] === 0) {
        canvas[d] = resized[s]
        canvas[d + 1] = resized[s + 1]
        canvas[d + 2] = resized[s + 2]
        canvas[d + 3] = resized[s + 3]
      } else {
        canvas[d] = Math.round(resized[s] * sa + canvas[d] * (1 - sa))
        canvas[d + 1] = Math.round(resized[s + 1] * sa + canvas[d + 1] * (1 - sa))
        canvas[d + 2] = Math.round(resized[s + 2] * sa + canvas[d + 2] * (1 - sa))
        canvas[d + 3] = 255
      }
    }
  }
  return canvas
}

function greenMark(rgba, width, height) {
  const cols = new Array(width).fill(0)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      if (rgba[i + 3] < 20) continue
      if (rgba[i + 1] > rgba[i] + 12) cols[x]++
    }
  }
  let minX = width
  let maxX = 0
  for (let x = 0; x < width; x++) {
    if (!cols[x]) continue
    if (x < minX) minX = x
    if (x > maxX) maxX = x
  }
  // Stop the mark at the first wide gap after it starts, so the wordmark is excluded.
  let gap = 0
  let end = minX
  for (let x = minX; x <= maxX; x++) {
    if (cols[x] === 0) {
      gap++
      if (gap > 8) break
    } else {
      gap = 0
      end = x
    }
  }
  let minY = height
  let maxY = 0
  for (let y = 0; y < height; y++) {
    for (let x = minX; x <= end; x++) {
      const i = (y * width + x) * 4
      if (rgba[i + 3] < 20) continue
      if (rgba[i + 1] > rgba[i] + 12) {
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  const cropped = crop(rgba, width, height, { minX, minY, maxX: end, maxY }, 8)
  for (let i = 0; i < cropped.rgba.length; i += 4) {
    const r = cropped.rgba[i]
    const g = cropped.rgba[i + 1]
    const b = cropped.rgba[i + 2]
    if (!(g > r + 12 && g > b + 8 && cropped.rgba[i + 3] > 20)) {
      cropped.rgba[i] = 0
      cropped.rgba[i + 1] = 0
      cropped.rgba[i + 2] = 0
      cropped.rgba[i + 3] = 0
    }
  }
  const tight = bounds(cropped.rgba, cropped.width, cropped.height)
  return crop(cropped.rgba, cropped.width, cropped.height, tight, 0)
}

function writeIco(png) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)
  const entry = Buffer.alloc(16)
  entry[0] = 32
  entry[1] = 32
  entry[2] = 0
  entry[3] = 0
  entry.writeUInt16LE(1, 4)
  entry.writeUInt16LE(32, 6)
  entry.writeUInt32LE(png.length, 8)
  entry.writeUInt32LE(22, 12)
  return Buffer.concat([header, entry, png])
}

const source = decodePNG(fs.readFileSync(path.join(publicDir, "logo.png")))
const colored = recolor(source.rgba)
const box = bounds(colored, source.width, source.height)
const logo = crop(colored, source.width, source.height, box, 12)
fs.writeFileSync(path.join(publicDir, "logo-mark.png"), encodePNG(logo.width, logo.height, logo.rgba))

const mark = greenMark(colored, source.width, source.height)
const fav32 = contain(mark.rgba, mark.width, mark.height, 32, 2, null)
const fav16 = contain(mark.rgba, mark.width, mark.height, 16, 1, null)
const apple = contain(mark.rgba, mark.width, mark.height, 180, 24, [255, 255, 255])
fs.writeFileSync(path.join(publicDir, "favicon-32x32.png"), encodePNG(32, 32, fav32))
fs.writeFileSync(path.join(publicDir, "favicon-16x16.png"), encodePNG(16, 16, fav16))
fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), encodePNG(180, 180, apple))
const favPng = fs.readFileSync(path.join(publicDir, "favicon-32x32.png"))
fs.writeFileSync(path.join(publicDir, "favicon.ico"), writeIco(favPng))

console.log(`logo-mark ${logo.width}x${logo.height}`)
console.log(`mark ${mark.width}x${mark.height}`)
