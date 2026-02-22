"use client"

import { useState } from "react"
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react"

import { siteConfig } from "@/constants/site"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const contactInfo = [
  {
    icon: Phone,
    label: "Téléphone",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: siteConfig.address,
    href: siteConfig.addressHref,
  },
  {
    icon: Clock,
    label: "Horaires",
    value: siteConfig.hours,
    href: null,
  },
]

export default function DevisPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [typeValue, setTypeValue] = useState("")
  const [typeError, setTypeError] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!typeValue) {
      setTypeError(true)
      return
    }
    setStatus("sending")
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Estimez votre projet
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Demande de Devis
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Remplissez le formulaire ci-dessous et nous vous répondrons avec
            une estimation détaillée sous 48 heures.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
          {/* ── Form ── */}
          {status === "sent" ? (
            <div className="rounded-xl border border-border bg-card p-10 text-center">
              <p className="text-2xl font-bold">Demande envoyée !</p>
              <p className="mt-2 text-muted-foreground">
                Nous reviendrons vers vous très prochainement avec votre devis.
              </p>
            </div>
          ) : status === "error" ? (
            <div className="rounded-xl border border-destructive bg-destructive/5 p-10 text-center">
              <p className="text-2xl font-bold">Une erreur est survenue</p>
              <p className="mt-2 text-muted-foreground">
                L&apos;envoi a échoué. Veuillez réessayer ou nous contacter directement à{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-primary underline">
                  {siteConfig.email}
                </a>.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-sm underline text-muted-foreground hover:text-foreground"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-xl border border-border bg-card p-8"
            >
              {/* Name + Company */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Nom complet <span className="text-destructive">*</span></Label>
                  <Input id="name" name="name" placeholder="Jean Dupont" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company">Entreprise</Label>
                  <Input id="company" name="company" placeholder="Acme SAS" />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jean@acme.fr"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+33 6 00 00 00 00" />
                </div>
              </div>

              {/* Project type */}
              <div className="space-y-1.5">
                <Label htmlFor="type">Type de projet <span className="text-destructive">*</span></Label>
                <Select
                  name="type"
                  value={typeValue}
                  onValueChange={(v) => { setTypeValue(v); setTypeError(false) }}
                >
                  <SelectTrigger id="type" className={typeError ? "border-destructive focus:ring-destructive" : ""}>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Application web</SelectItem>
                    <SelectItem value="mobile">Application mobile</SelectItem>
                    <SelectItem value="design">UI / UX Design</SelectItem>
                    <SelectItem value="api">API & Intégrations</SelectItem>
                    <SelectItem value="audit">Audit de performance</SelectItem>
                    <SelectItem value="consulting">Conseil technique</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
                {typeError && (
                  <p className="text-xs text-destructive mt-1">Veuillez sélectionner un type de projet.</p>
                )}
              </div>

              {/* Budget */}
              <div className="space-y-1.5">
                <Label htmlFor="budget">Budget estimé</Label>
                <Select name="budget">
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Fourchette budgétaire" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="500_1000">500 € — 1 000 €</SelectItem>
                  <SelectItem value="1000_2000">1 000 € — 2 000 €</SelectItem>
                  <SelectItem value="2000_4000">2 000 € — 4 000 €</SelectItem>
                  <SelectItem value="4000_8000">4 000 € — 8 000 €</SelectItem>
                  <SelectItem value="gt8000">8 000 € +</SelectItem>

                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="description">Description du projet <span className="text-destructive">*</span></Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Décrivez votre projet, vos objectifs, vos contraintes et votre calendrier idéal…"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === "sending"}
                className="w-full gap-2"
              >
                {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          )}

          {/* ── Contact info ── */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <h2 className="font-semibold text-lg">Nous contacter</h2>

              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Vous préférez échanger directement ? Appelez-nous ou envoyez
                un email — nous répondons en général sous quelques heures
                pendant les jours ouvrés.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
