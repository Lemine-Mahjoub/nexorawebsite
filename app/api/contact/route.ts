import { NextRequest, NextResponse } from "next/server"

import { transporter } from "@/lib/mailer"
import {
  contactInternalHtml,
  contactInternalText,
  contactConfirmHtml,
  contactConfirmText,
  type ContactFields,
} from "@/lib/emails"

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { name, email, subject, message } = body

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 })
  }

  const fields: ContactFields = { name, email, subject, message }

  try {
    await Promise.all([
      // Internal notification
      transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_TO,
        replyTo: email,
        subject: `[Contact] ${name} — ${subject}`,
        html: contactInternalHtml(fields),
        text: contactInternalText(fields),
      }),
      // Auto-reply to sender
      transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Votre message a bien été reçu — Nexora",
        html: contactConfirmHtml(name),
        text: contactConfirmText(name),
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[api/contact] SMTP error:", err)
    return NextResponse.json({ error: "Échec de l'envoi. Veuillez réessayer." }, { status: 500 })
  }
}
