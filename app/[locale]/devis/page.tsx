"use client"

import { useState } from "react"
import { Send, Phone, Mail } from "lucide-react"
import { useTranslations } from "next-intl"

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

const PROJECT_TYPES = ["web", "mobile", "design", "api", "audit", "consulting", "other"] as const
const BUDGET_KEYS = ["500_1000", "1000_2000", "2000_4000", "4000_8000", "gt8000"] as const

export default function DevisPage() {
  const t = useTranslations("devis")
  const tForm = useTranslations("devis.form")
  const tPlaceholders = useTranslations("devis.form.placeholders")
  const tTypes = useTranslations("devis.form.types")
  const tBudgets = useTranslations("devis.form.budgets")
  const tContact = useTranslations("devis.contact")

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [typeValue, setTypeValue] = useState("")
  const [typeError, setTypeError] = useState(false)

  const contactInfo = [
    { icon: Phone, key: "phone" as const, value: siteConfig.phone, href: siteConfig.phoneHref },
    { icon: Mail, key: "email" as const, value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  ]

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
            {t("label")}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground max-w-xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
          {/* ── Form ── */}
          {status === "sent" ? (
            <div className="rounded-xl border border-border bg-card p-10 text-center">
              <p className="text-2xl font-bold">{t("sent")}</p>
              <p className="mt-2 text-muted-foreground">{t("sentDetail")}</p>
            </div>
          ) : status === "error" ? (
            <div className="rounded-xl border border-destructive bg-destructive/5 p-10 text-center">
              <p className="text-2xl font-bold">{t("error")}</p>
              <p className="mt-2 text-muted-foreground">
                {t("errorDetail")}{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-primary underline">
                  {siteConfig.email}
                </a>.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-sm underline text-muted-foreground hover:text-foreground"
              >
                {t("retry")}
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
                  <Label htmlFor="name">{tForm("name")} <span className="text-destructive">*</span></Label>
                  <Input id="name" name="name" placeholder={tPlaceholders("name")} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company">{tForm("company")}</Label>
                  <Input id="company" name="company" placeholder={tPlaceholders("company")} />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="email">{tForm("email")} <span className="text-destructive">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={tPlaceholders("email")}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">{tForm("phone")}</Label>
                  <Input id="phone" name="phone" type="tel" placeholder={tPlaceholders("phone")} />
                </div>
              </div>

              {/* Project type */}
              <div className="space-y-1.5">
                <Label htmlFor="type">{tForm("type")} <span className="text-destructive">*</span></Label>
                <Select
                  name="type"
                  value={typeValue}
                  onValueChange={(v) => { setTypeValue(v); setTypeError(false) }}
                >
                  <SelectTrigger id="type" className={typeError ? "border-destructive focus:ring-destructive" : ""}>
                    <SelectValue placeholder={tPlaceholders("type")} />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_TYPES.map((k) => (
                      <SelectItem key={k} value={k}>
                        {tTypes(k)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {typeError && (
                  <p className="text-xs text-destructive mt-1">{tForm("typeError")}</p>
                )}
              </div>

              {/* Budget */}
              <div className="space-y-1.5">
                <Label htmlFor="budget">{tForm("budget")}</Label>
                <Select name="budget">
                  <SelectTrigger id="budget">
                    <SelectValue placeholder={tPlaceholders("budget")} />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_KEYS.map((k) => (
                      <SelectItem key={k} value={k}>
                        {tBudgets(k)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="description">{tForm("description")} <span className="text-destructive">*</span></Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder={tPlaceholders("description")}
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === "sending"}
                className="w-full gap-2"
              >
                {status === "sending" ? tForm("sending") : tForm("submit")}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          )}

          {/* ── Contact info ── */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <h2 className="font-semibold text-lg">{tContact("title")}</h2>

              {contactInfo.map(({ icon: Icon, key, value, href }) => (
                <div key={key} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-0.5">
                      {tContact(key)}
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
                {tContact("prefer")}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
