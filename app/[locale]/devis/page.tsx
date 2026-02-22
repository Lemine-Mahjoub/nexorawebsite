"use client"

import { useState } from "react"
import { Send, Phone, Mail, Clock, CheckCircle2, MessageSquare, FileText, Shield, Timer } from "lucide-react"
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
const DEADLINE_KEYS = ["asap", "lt1m", "1to3m", "3to6m", "flexible"] as const
const SOURCE_KEYS = ["google", "linkedin", "word_of_mouth", "social", "other"] as const

/* ── small helper: section heading inside the form ── */
function FormSection({ step, label }: { step: number; label: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
        {step}
      </span>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

export default function DevisPage() {
  const t = useTranslations("devis")
  const tForm = useTranslations("devis.form")
  const tPlaceholders = useTranslations("devis.form.placeholders")
  const tTypes = useTranslations("devis.form.types")
  const tBudgets = useTranslations("devis.form.budgets")
  const tDeadlines = useTranslations("devis.deadlines")
  const tSources = useTranslations("devis.sources")
  const tContact = useTranslations("devis.contact")
  const tSteps = useTranslations("devis.steps")
  const tGuarantees = useTranslations("devis.guarantees")

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [typeValue, setTypeValue] = useState("")
  const [budgetValue, setBudgetValue] = useState("")
  const [deadlineValue, setDeadlineValue] = useState("")
  const [sourceValue, setSourceValue] = useState("")
  const [typeError, setTypeError] = useState(false)

  const contactInfo = [
    { icon: Phone, key: "phone" as const, value: siteConfig.phone, href: siteConfig.phoneHref },
    { icon: Mail, key: "email" as const, value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  ]

  const nextSteps = [
    { icon: FileText, titleKey: "1title" as const, descKey: "1desc" as const },
    { icon: MessageSquare, titleKey: "2title" as const, descKey: "2desc" as const },
    { icon: CheckCircle2, titleKey: "3title" as const, descKey: "3desc" as const },
  ]

  const guarantees = [
    { icon: Timer, key: "response" as const },
    { icon: Shield, key: "noObligation" as const },
    { icon: CheckCircle2, key: "confidential" as const },
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
    // inject controlled select values
    data.type = typeValue
    data.budget = budgetValue
    data.deadline = deadlineValue
    data.source = sourceValue
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
    <div className="min-h-screen pb-24 pt-32">
      {/* ── Page header ── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t("label")}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="max-w-xl text-muted-foreground">
            {t("subtitle")}
          </p>
          {/* guarantee badges */}
          <div className="flex flex-wrap gap-3 pt-1">
            {guarantees.map(({ icon: Icon, key }) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                <Icon className="h-3.5 w-3.5 text-primary" />
                {tGuarantees(key)}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
          {/* ── Form ── */}
          {status === "sent" ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <p className="text-2xl font-bold">{t("sent")}</p>
              <p className="max-w-sm text-muted-foreground">{t("sentDetail")}</p>
            </div>
          ) : status === "error" ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-destructive bg-destructive/5 p-12 text-center">
              <p className="text-2xl font-bold">{t("error")}</p>
              <p className="text-muted-foreground">
                {t("errorDetail")}{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-primary underline">
                  {siteConfig.email}
                </a>.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-sm underline text-muted-foreground hover:text-foreground"
              >
                {t("retry")}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-7 rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              {/* ─ Section 1: Contact details ─ */}
              <FormSection step={1} label={tForm("sectionYou")} />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">
                    {tForm("name")} <span className="text-destructive">*</span>
                  </Label>
                  <Input id="name" name="name" placeholder={tPlaceholders("name")} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company">{tForm("company")}</Label>
                  <Input id="company" name="company" placeholder={tPlaceholders("company")} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="email">
                    {tForm("email")} <span className="text-destructive">*</span>
                  </Label>
                  <Input id="email" name="email" type="email" placeholder={tPlaceholders("email")} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">{tForm("phone")}</Label>
                  <Input id="phone" name="phone" type="tel" placeholder={tPlaceholders("phone")} />
                </div>
              </div>

              {/* ─ Section 2: Project ─ */}
              <FormSection step={2} label={tForm("sectionProject")} />

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="type">
                    {tForm("type")} <span className="text-destructive">*</span>
                  </Label>
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
                        <SelectItem key={k} value={k}>{tTypes(k)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {typeError && (
                    <p className="mt-1 text-xs text-destructive">{tForm("typeError")}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="budget">{tForm("budget")}</Label>
                  <Select name="budget" value={budgetValue} onValueChange={setBudgetValue}>
                    <SelectTrigger id="budget">
                      <SelectValue placeholder={tPlaceholders("budget")} />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGET_KEYS.map((k) => (
                        <SelectItem key={k} value={k}>{tBudgets(k)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="deadline">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      {tForm("deadline")}
                    </div>
                  </Label>
                  <Select name="deadline" value={deadlineValue} onValueChange={setDeadlineValue}>
                    <SelectTrigger id="deadline">
                      <SelectValue placeholder={tPlaceholders("deadline")} />
                    </SelectTrigger>
                    <SelectContent>
                      {DEADLINE_KEYS.map((k) => (
                        <SelectItem key={k} value={k}>{tDeadlines(k)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">
                  {tForm("description")} <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder={tPlaceholders("description")}
                  required
                />
              </div>

              {/* ─ Section 3: Additional details ─ */}
              <FormSection step={3} label={tForm("sectionMore")} />

              <div className="space-y-1.5">
                <Label htmlFor="referenceUrl">{tForm("referenceUrl")}</Label>
                <Input
                  id="referenceUrl"
                  name="referenceUrl"
                  type="url"
                  placeholder={tPlaceholders("referenceUrl")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="source">{tForm("source")}</Label>
                <Select name="source" value={sourceValue} onValueChange={setSourceValue}>
                  <SelectTrigger id="source">
                    <SelectValue placeholder={tPlaceholders("source")} />
                  </SelectTrigger>
                  <SelectContent>
                    {SOURCE_KEYS.map((k) => (
                      <SelectItem key={k} value={k}>{tSources(k)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

          {/* ── Sidebar ── */}
          <aside className="space-y-4">
            {/* Contact card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-5 font-semibold text-lg">{tContact("title")}</h2>
              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, key, value, href }) => (
                  <div key={key} className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs font-medium text-muted-foreground">
                        {tContact(key)}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-sm font-medium transition-colors hover:text-primary"
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
            </div>

            {/* What happens next card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-5 font-semibold text-lg">{tSteps("title")}</h2>
              <ol className="space-y-5">
                {nextSteps.map(({ icon: Icon, titleKey, descKey }, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      {idx < nextSteps.length - 1 && (
                        <span className="mt-1 h-full w-px bg-border" />
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="text-sm font-semibold">{tSteps(titleKey)}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                        {tSteps(descKey)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Prefer to contact directly */}
            <div className="rounded-2xl border border-border bg-muted/40 p-5">
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

