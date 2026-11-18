import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"
import { INQUIRY_STATUSES, type Inquiry, type InquiryStatus } from "@/lib/inquiry-types"

export { INQUIRY_STATUSES }
export type { Inquiry, InquiryStatus }

const filePath = path.join(process.cwd(), "data", "inquiries.json")
let queue: Promise<unknown> = Promise.resolve()

function enqueue<T>(task: () => Promise<T>) {
  const run = queue.then(task, task)
  queue = run.then(
    () => undefined,
    () => undefined,
  )
  return run
}

async function readAll() {
  try {
    const raw = await readFile(filePath, "utf8")
    const parsed = JSON.parse(raw) as Inquiry[]
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return []
    throw error
  }
}

async function writeAll(items: Inquiry[]) {
  await mkdir(path.dirname(filePath), { recursive: true })
  await writeFile(filePath, JSON.stringify(items, null, 2), "utf8")
}

export function listInquiries() {
  return enqueue(async () => {
    const items = await readAll()
    return items.sort((left, right) => right.createdAt.localeCompare(left.createdAt))
  })
}

export function addInquiry(input: Omit<Inquiry, "id" | "createdAt" | "status">) {
  return enqueue(async () => {
    const items = await readAll()
    const inquiry: Inquiry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "unread",
      ...input,
    }
    items.push(inquiry)
    await writeAll(items)
    return inquiry
  })
}

export function updateInquiryStatus(id: string, status: InquiryStatus) {
  return enqueue(async () => {
    const items = await readAll()
    const inquiry = items.find((item) => item.id === id)
    if (!inquiry) return null
    inquiry.status = status
    await writeAll(items)
    return inquiry
  })
}
