/* ─────────────────────────────────────────────
   Shared email HTML shell
   ───────────────────────────────────────────── */
function shell(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f4f5; font-family: Arial, sans-serif; color: #18181b; }
    .wrapper { max-width: 600px; margin: 32px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7; }
    .header { background: #18181b; padding: 28px 32px; }
    .header span { color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
    .header span em { color: #6366f1; font-style: normal; }
    .body { padding: 32px; }
    h2 { margin: 0 0 20px; font-size: 18px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    td { padding: 10px 12px; font-size: 14px; vertical-align: top; border-bottom: 1px solid #f4f4f5; }
    td:first-child { font-weight: 600; white-space: nowrap; width: 140px; color: #71717a; }
    .message-box { background: #f4f4f5; border-radius: 8px; padding: 14px 16px; font-size: 14px; line-height: 1.6; margin-top: 16px; white-space: pre-wrap; }
    .footer { padding: 20px 32px; font-size: 12px; color: #a1a1aa; border-top: 1px solid #f4f4f5; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header"><span>Nexora<em>.</em></span></div>
    <div class="body">${body}</div>
    <div class="footer">© ${new Date().getFullYear()} Nexora — nexora.dev</div>
  </div>
</body>
</html>`
}

function row(label: string, value: string | null | undefined) {
  if (!value) return ""
  return `<tr><td>${label}</td><td>${value}</td></tr>`
}

/* ─────────────────────────────────────────────
   DEVIS — internal notification
   ───────────────────────────────────────────── */
export interface DevisFields {
  name: string
  company?: string
  email: string
  phone?: string
  type: string
  budget?: string
  description: string
}

export function devisInternalHtml(f: DevisFields) {
  return shell(
    "Nouvelle demande de devis",
    `<h2>📋 Nouvelle demande de devis</h2>
    <table>
      ${row("Nom", f.name)}
      ${row("Entreprise", f.company)}
      ${row("Email", `<a href="mailto:${f.email}">${f.email}</a>`)}
      ${row("Téléphone", f.phone)}
      ${row("Type de projet", f.type)}
      ${row("Budget", f.budget)}
    </table>
    <p style="margin-top:20px;font-size:13px;font-weight:600;color:#71717a">Description</p>
    <div class="message-box">${f.description}</div>`,
  )
}

export function devisInternalText(f: DevisFields) {
  return [
    "Nouvelle demande de devis",
    `Nom: ${f.name}`,
    f.company ? `Entreprise: ${f.company}` : "",
    `Email: ${f.email}`,
    f.phone ? `Téléphone: ${f.phone}` : "",
    `Type: ${f.type}`,
    f.budget ? `Budget: ${f.budget}` : "",
    `\nDescription:\n${f.description}`,
  ]
    .filter(Boolean)
    .join("\n")
}

/* ─────────────────────────────────────────────
   DEVIS — auto-reply to sender
   ───────────────────────────────────────────── */
export function devisConfirmHtml(name: string) {
  return shell(
    "Votre demande de devis a bien été reçue",
    `<h2>Merci, ${name} !</h2>
    <p style="font-size:15px;line-height:1.7;color:#3f3f46">
      Nous avons bien reçu votre demande de devis et nous vous répondrons
      avec une estimation détaillée <strong>sous 48 heures ouvrées</strong>.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#3f3f46">
      En attendant, n'hésitez pas à explorer nos réalisations sur
      <a href="https://nexora.dev/#work" style="color:#6366f1">nexora.dev</a>.
    </p>
    <p style="margin-top:24px;font-size:14px;color:#71717a">L'équipe Nexora</p>`,
  )
}

export function devisConfirmText(name: string) {
  return `Merci ${name} !\n\nNous avons bien reçu votre demande de devis et vous répondrons sous 48 heures ouvrées.\n\nL'équipe Nexora`
}

/* ─────────────────────────────────────────────
   CONTACT — internal notification
   ───────────────────────────────────────────── */
export interface ContactFields {
  name: string
  email: string
  subject: string
  message: string
}

export function contactInternalHtml(f: ContactFields) {
  return shell(
    "Nouveau message de contact",
    `<h2>✉️ Nouveau message de contact</h2>
    <table>
      ${row("Nom", f.name)}
      ${row("Email", `<a href="mailto:${f.email}">${f.email}</a>`)}
      ${row("Sujet", f.subject)}
    </table>
    <p style="margin-top:20px;font-size:13px;font-weight:600;color:#71717a">Message</p>
    <div class="message-box">${f.message}</div>`,
  )
}

export function contactInternalText(f: ContactFields) {
  return [
    "Nouveau message de contact",
    `Nom: ${f.name}`,
    `Email: ${f.email}`,
    `Sujet: ${f.subject}`,
    `\nMessage:\n${f.message}`,
  ].join("\n")
}

/* ─────────────────────────────────────────────
   CONTACT — auto-reply to sender
   ───────────────────────────────────────────── */
export function contactConfirmHtml(name: string) {
  return shell(
    "Votre message a bien été reçu",
    `<h2>Merci, ${name} !</h2>
    <p style="font-size:15px;line-height:1.7;color:#3f3f46">
      Nous avons bien reçu votre message et nous vous répondrons
      <strong>sous un jour ouvré</strong>.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#3f3f46">
      À très bientôt sur <a href="https://nexora.dev" style="color:#6366f1">nexora.dev</a>.
    </p>
    <p style="margin-top:24px;font-size:14px;color:#71717a">L'équipe Nexora</p>`,
  )
}

export function contactConfirmText(name: string) {
  return `Merci ${name} !\n\nNous avons bien reçu votre message et vous répondrons sous un jour ouvré.\n\nL'équipe Nexora`
}
