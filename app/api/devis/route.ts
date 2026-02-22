import { NextRequest, NextResponse } from "next/server"

import { transporter } from "@/lib/mailer"
import {
  devisInternalHtml,
  devisInternalText,
  devisConfirmHtml,
  devisConfirmText,
  type DevisFields,
} from "@/lib/emails"

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { name, company, email, phone, type, budget, description } = body

  if (!name || !email || !type || !description) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 })
  }

  const fields: DevisFields = { name, company, email, phone, type, budget, description }

  try {
    await Promise.all([
      // Internal notification
      transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_TO,
        replyTo: email,
        subject: `[Devis] ${name}${company ? ` — ${company}` : ""} · ${type}`,
        html: devisInternalHtml(fields),
        text: devisInternalText(fields),
      }),
      // Auto-reply to sender
      transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Votre demande de devis a bien été reçue — Nexora",
        html: devisConfirmHtml(name),
        text: devisConfirmText(name),
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[api/devis] SMTP error:", err)
    return NextResponse.json({ error: "Échec de l'envoi. Veuillez réessayer." }, { status: 500 })
  }
}
