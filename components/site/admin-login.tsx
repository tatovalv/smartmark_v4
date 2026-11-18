"use client"

import { useState, type FormEvent } from "react"

const errors: Record<string, string> = {
  invalid: "Usuario o contraseña incorrectos.",
  rate: "Demasiados intentos. Espere unos minutos e intente de nuevo.",
  config: "Falta la configuración del acceso en el servidor.",
  send: "No se pudo entrar. Intente de nuevo.",
}

export function AdminLogin() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError("")
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      })
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        setError(errors[body?.error] || errors.send)
        setPending(false)
        return
      }
      window.location.href = "/admin"
    } catch {
      setError(errors.send)
      setPending(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-16">
      <a href="/" className="mb-8">
        <img src="/logo-mark.png" alt="SmartMark Consultores" width={188} height={81} className="h-12 w-auto" />
      </a>
      <h1 className="text-3xl font-semibold tracking-tight text-brand-secondary">Administración</h1>
      <p className="mt-2 text-brand-muted">Entre con su usuario para ver los mensajes del formulario.</p>
      <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
        {error ? (
          <p role="alert" className="rounded-2xl bg-brand-surface px-4 py-3 text-sm font-medium text-brand-secondary">
            {error}
          </p>
        ) : null}
        <label className="field">
          <span>Usuario</span>
          <input name="user" autoComplete="username" value={user} onChange={(event) => setUser(event.target.value)} required />
        </label>
        <label className="field">
          <span>Contraseña</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  )
}
