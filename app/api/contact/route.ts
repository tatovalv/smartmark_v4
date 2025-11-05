import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El formato del email es inválido" },
        { status: 400 }
      )
    }

    // Check if Resend API key is configured
    const apiKey = process.env.RESEND_API_KEY
    
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is not set")
      return NextResponse.json(
        { 
          error: "Email service is not configured. RESEND_API_KEY is missing.",
          details: process.env.NODE_ENV === "development" ? "Check your .env.local file and restart the dev server" : undefined
        },
        { status: 500 }
      )
    }

    // Initialize Resend with API key
    const resend = new Resend(apiKey)

    // Escape HTML to prevent XSS
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>")

    // Send email using Resend
    // Using onboarding@resend.dev for testing - you need to verify your domain for production
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
    // Always send to the business email
    const toEmail = process.env.RESEND_TO_EMAIL || "jc@smartmarkconsultores.com"
    
    console.log("Attempting to send email...")
    console.log("From:", fromEmail)
    console.log("To:", toEmail)
    
    try {
      const result = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: email,
        subject: `Contact Form: ${safeSubject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
              Nuevo mensaje del formulario de contacto
            </h2>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 10px 0;"><strong>Nombre:</strong> ${safeName}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${safeEmail}</p>
              <p style="margin: 10px 0;"><strong>Asunto:</strong> ${safeSubject}</p>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <strong>Mensaje:</strong>
                <p style="margin-top: 10px; white-space: pre-wrap; color: #374151;">${safeMessage}</p>
              </div>
            </div>
          </div>
        `,
        text: `
          Nuevo mensaje del formulario de contacto
          
          Nombre: ${name}
          Email: ${email}
          Asunto: ${subject}
          
          Mensaje:
          ${message}
        `,
      })

      if (result.error) {
        console.error("Resend API error:", JSON.stringify(result.error, null, 2))
        const error = result.error as any
        
        // Provide a more helpful error message if domain is not verified
        if (error.statusCode === 403 && error.name === "validation_error") {
          return NextResponse.json(
            { 
              error: "Error al enviar el email. Por favor, verifica tu dominio en Resend.",
              details: process.env.NODE_ENV === "development" ? error.message : undefined
            },
            { status: 500 }
          )
        }
        
        return NextResponse.json(
          { 
            error: "Error al enviar el email. Por favor, inténtalo más tarde.",
            details: process.env.NODE_ENV === "development" ? JSON.stringify(result.error) : undefined
          },
          { status: 500 }
        )
      }

      console.log("Email sent successfully:", result.data)
      return NextResponse.json(
        { message: "Mensaje enviado exitosamente", data: result.data },
        { status: 200 }
      )
    } catch (resendError) {
      console.error("Resend send error:", resendError)
      throw resendError
    }

  } catch (error) {
    console.error("Contact form error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { 
        error: "Error del servidor. Por favor, inténtalo más tarde.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}

