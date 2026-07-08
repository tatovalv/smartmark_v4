"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast"

const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  subject: z.string().min(3, "El asunto debe tener al menos 3 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        const errorMessage = result.error + (result.details ? ` (${result.details})` : "")
        throw new Error(errorMessage || "Error al enviar el mensaje")
      }

      toast({
        title: "¡Mensaje enviado!",
        description: "Tu mensaje ha sido enviado exitosamente. Te responderemos pronto.",
      })

      reset()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative text-white pt-36 sm:pt-44">
      <section className="relative py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="section-label justify-center mb-6">{t("contact.badge")}</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 text-balance">
              <span className="gradient-text-accent">{t("contact.page.title")}</span>
            </h1>
            <p className="text-lg text-zinc-400">{t("contact.page.description")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="glow-card p-8 md:p-10">
                <h2 className="text-xl font-semibold mb-8 tracking-tight">{t("contact.form.title")}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">
                        {t("contact.form.name")}
                      </label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder={t("contact.form.name.placeholder")}
                        className="bg-white/[0.03] border-white/10 focus:border-emerald-500/50 h-12 rounded-xl"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">
                        {t("contact.form.email")}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder={t("contact.form.email.placeholder")}
                        className="bg-white/[0.03] border-white/10 focus:border-emerald-500/50 h-12 rounded-xl"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">
                      {t("contact.form.subject")}
                    </label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder={t("contact.form.subject.placeholder")}
                      className="bg-white/[0.03] border-white/10 focus:border-emerald-500/50 h-12 rounded-xl"
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">
                      {t("contact.form.message")}
                    </label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder={t("contact.form.message.placeholder")}
                      rows={6}
                      className="bg-white/[0.03] border-white/10 focus:border-emerald-500/50 rounded-xl resize-none"
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-glow h-12 rounded-xl disabled:opacity-50"
                  >
                    {isSubmitting ? "Enviando..." : t("contact.form.button")}
                  </Button>
                </form>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glow-card p-6">
                <p className="section-label mb-5">{t("contact.info.title")}</p>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{t("contact.info.email")}</p>
                    <p className="text-white">info@smartmarkconsultores.com</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{t("contact.info.phone")}</p>
                    <p className="text-white">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{t("contact.info.office")}</p>
                    <p className="text-white">Ciudad de México, México</p>
                  </div>
                </div>
              </div>

              <div className="glow-card p-6">
                <p className="section-label mb-5">{t("contact.hours.title")}</p>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between text-zinc-400">
                    <span>{t("contact.hours.weekdays")}</span>
                    <span className="text-emerald-400">9–18h</span>
                  </li>
                  <li className="flex justify-between text-zinc-400">
                    <span>{t("contact.hours.saturday")}</span>
                    <span className="text-emerald-400">10–16h</span>
                  </li>
                  <li className="flex justify-between text-zinc-400">
                    <span>{t("contact.hours.sunday")}</span>
                    <span className="text-zinc-600">{t("contact.hours.closed")}</span>
                  </li>
                </ul>
              </div>

              <div className="cta-panel p-6 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-sm font-semibold text-emerald-400">{t("contact.response.title")}</p>
                </div>
                <p className="text-sm text-zinc-400">{t("contact.response.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
