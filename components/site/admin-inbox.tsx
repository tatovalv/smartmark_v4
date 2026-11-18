"use client"

import { useEffect, useState } from "react"
import type { Inquiry, InquiryStatus } from "@/lib/inquiry-types"

const labels: Record<InquiryStatus, string> = {
  unread: "Sin leer",
  read: "Leído",
  replied: "Respondido",
}

const filters: Array<{ id: "all" | InquiryStatus; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "unread", label: "Sin leer" },
  { id: "read", label: "Leídos" },
  { id: "replied", label: "Respondidos" },
]

function when(value: string) {
  return new Intl.DateTimeFormat("es-CR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value))
}

export function AdminInbox() {
  const [items, setItems] = useState<Inquiry[] | null>(null)
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all")
  const [error, setError] = useState("")
  const [pendingId, setPendingId] = useState("")

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then(async (response) => {
        if (response.status === 401) {
          window.location.href = "/admin/login"
          return null
        }
        if (!response.ok) throw new Error("load")
        return response.json() as Promise<{ items: Inquiry[] }>
      })
      .then((body) => {
        if (body) setItems(body.items)
      })
      .catch(() => setError("No se pudieron cargar los mensajes."))
  }, [])

  async function setStatus(id: string, status: InquiryStatus) {
    const previous = items
    setItems((current) => current?.map((item) => (item.id === id ? { ...item, status } : item)) ?? current)
    setPendingId(id)
    setError("")
    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      if (response.status === 401) {
        window.location.href = "/admin/login"
        return
      }
      if (!response.ok) throw new Error("save")
    } catch {
      setItems(previous)
      setError("No se pudo guardar el estado. Intente de nuevo.")
    } finally {
      setPendingId("")
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  const visible = (items ?? []).filter((item) => filter === "all" || item.status === filter)
  const count = (id: (typeof filters)[number]["id"]) => (id === "all" ? items?.length ?? 0 : items?.filter((item) => item.status === id).length ?? 0)

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <a href="/">
          <img src="/logo-mark.png" alt="SmartMark Consultores" width={188} height={81} className="h-11 w-auto" />
        </a>
        <button className="btn btn-ghost" type="button" onClick={logout}>
          Salir
        </button>
      </div>
      <h1 className="mt-8 text-3xl font-semibold tracking-tight text-brand-secondary">Mensajes de contacto</h1>
      <p className="mt-2 max-w-2xl text-brand-muted">
        Cada envío del formulario aparece aquí. Marque si sigue sin leer, si ya lo leyó o si ya lo respondió.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar mensajes">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            className={filter === item.id ? "btn btn-primary btn-sm" : "btn btn-ghost btn-sm"}
            onClick={() => setFilter(item.id)}
          >
            {item.label} ({count(item.id)})
          </button>
        ))}
      </div>

      {error ? (
        <p role="alert" className="mt-4 rounded-2xl bg-brand-surface px-4 py-3 text-sm font-medium text-brand-secondary">
          {error}
        </p>
      ) : null}

      {items === null && !error ? <p className="mt-8 text-brand-muted">Cargando mensajes…</p> : null}
      {items && visible.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-brand-line bg-brand-surface px-4 py-6 text-brand-muted">
          {items.length === 0 ? "Todavía no hay mensajes del formulario." : "No hay mensajes en este estado."}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4">
        {visible.map((item) => (
          <article key={item.id} className="rounded-3xl border border-brand-line bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-brand-text">
                  {item.name} · {item.company}
                </h2>
                <p className="mt-1 text-sm text-brand-muted">{when(item.createdAt)} · {item.locale === "en" ? "Inglés" : "Español"}</p>
              </div>
              <label className="field min-w-44">
                <span>Estado</span>
                <select
                  value={item.status}
                  disabled={pendingId === item.id}
                  onChange={(event) => setStatus(item.id, event.target.value as InquiryStatus)}
                >
                  {Object.entries(labels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold">Correo</dt>
                <dd>
                  <a className="underline" href={`mailto:${item.email}`}>
                    {item.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Teléfono</dt>
                <dd>{item.phone || "—"}</dd>
              </div>
              <div>
                <dt className="font-semibold">Prefiere contacto por</dt>
                <dd>{item.contactMethod}</dd>
              </div>
              <div>
                <dt className="font-semibold">País</dt>
                <dd>{item.country}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold">Servicio</dt>
                <dd>{item.service}</dd>
              </div>
            </dl>
            <p className="mt-4 whitespace-pre-wrap leading-relaxed">{item.message}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
