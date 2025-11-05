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
    <main className="min-h-screen bg-black text-white pt-32">
      <section className="relative py-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <span className="text-emerald-400 text-sm font-medium">{t("contact.badge")}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">{t("contact.page.title")}</h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto text-pretty">
              {t("contact.page.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-900/50 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-zinc-800/50 hover:border-emerald-500/30 transition-colors">
                <h2 className="text-3xl font-bold mb-8">{t("contact.form.title")}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                        {t("contact.form.name")}
                      </label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder={t("contact.form.name.placeholder")}
                        className="bg-black/50 border-zinc-700 focus:border-emerald-500 h-12 text-base"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                        {t("contact.form.email")}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder={t("contact.form.email.placeholder")}
                        className="bg-black/50 border-zinc-700 focus:border-emerald-500 h-12 text-base"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">
                      {t("contact.form.subject")}
                    </label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder={t("contact.form.subject.placeholder")}
                      className="bg-black/50 border-zinc-700 focus:border-emerald-500 h-12 text-base"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                      {t("contact.form.message")}
                    </label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder={t("contact.form.message.placeholder")}
                      rows={6}
                      className="bg-black/50 border-zinc-700 focus:border-emerald-500 text-base resize-none"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 h-12 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Enviando..." : t("contact.form.button")}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info - Takes 1 column */}
            <div className="space-y-6">
              <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-3xl border border-zinc-800/50">
                <h3 className="text-lg font-bold mb-6 text-emerald-400">{t("contact.info.title")}</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-emerald-400"
                      >
                        <path
                          d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-400 mb-1">{t("contact.info.email")}</h4>
                      <p className="text-white text-sm break-all">info@smartmarkconsultores.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-purple-400"
                      >
                        <path
                          d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-400 mb-1">{t("contact.info.phone")}</h4>
                      <p className="text-white text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-blue-400"
                      >
                        <path
                          d="M17.6569 16.6569C16.7202 17.5935 14.7616 19.5521 13.4138 20.8999C12.6327 21.681 11.3677 21.6814 10.5866 20.9003C9.26234 19.576 7.34159 17.6553 6.34315 16.6569C3.21895 13.5327 3.21895 8.46734 6.34315 5.34315C9.46734 2.21895 14.5327 2.21895 17.6569 5.34315C20.781 8.46734 20.781 13.5327 17.6569 16.6569Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-400 mb-1">{t("contact.info.office")}</h4>
                      <p className="text-white text-sm leading-relaxed">
                        Avenida Empresarial 123, Suite 100
                        <br />
                        Ciudad, Estado 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-3xl border border-zinc-800/50">
                <h3 className="text-lg font-bold mb-6 text-emerald-400">{t("contact.hours.title")}</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{t("contact.hours.weekdays")}</span>
                    <span className="text-emerald-400 text-sm font-medium">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{t("contact.hours.saturday")}</span>
                    <span className="text-emerald-400 text-sm font-medium">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{t("contact.hours.sunday")}</span>
                    <span className="text-gray-500 text-sm font-medium">{t("contact.hours.closed")}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 backdrop-blur-sm p-6 rounded-3xl border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <h3 className="text-sm font-bold text-emerald-400">{t("contact.response.title")}</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {t("contact.response.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
