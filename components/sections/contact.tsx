"use client"

import { useState } from "react"
import { Send, Mail, Phone, CheckCircle2, AlertCircle } from "lucide-react"
import { useTranslations } from "next-intl"

import { siteConfig } from "@/constants/site"
import { useInView } from "@/hooks/use-in-view"
import { SectionGlow } from "@/components/shared/section-glow"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function ContactSection() {
  const t = useTranslations("contact")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const contactItems = [
    { icon: Mail, key: "email" as const, getValue: () => siteConfig.email, getHref: () => `mailto:${siteConfig.email}` },
    { icon: Phone, key: "phone" as const, getValue: () => siteConfig.phone, getHref: () => siteConfig.phoneHref },
  ]
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    try {
      const res = await fetch("/api/contact", {
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
    <section id="contact" className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8">
      <SectionGlow position="left" />
      <div ref={ref} className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">

          {/* Left – info */}
          <div
            className={cn(
              "space-y-8",
              inView ? "animate-slide-in-left" : "opacity-0"
            )}
          >
            <div className="space-y-4">
              <p className="font-mono-accent font-semibold text-primary">
                {t("label")}
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
                {t("title")}
                <br />
                {t("titleLine2")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("subtitle")}
              </p>
            </div>

            {/* Contact items */}
            <div className="space-y-3">
              {contactItems.map(({ icon: Icon, key, getValue, getHref }) => {
                const value = getValue()
                const href = getHref()
                const inner = (
                  <div className="flex items-start gap-3.5">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground/70 font-mono-accent mb-0.5">
                        {t(key)}
                      </p>
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    </div>
                  </div>
                )
                return href ? (
                  <a
                    key={key}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block rounded-xl border border-border bg-card p-4 shadow-sm shadow-primary/5 transition-colors hover:border-primary/30 hover:bg-muted/30"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={key}
                    className="rounded-xl border border-border bg-card p-4 shadow-sm shadow-primary/5"
                  >
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right – form */}
          <div
            className={cn(
              inView ? "animate-fade-in-up delay-200" : "opacity-0"
            )}
          >
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                <div>
                  <p className="text-xl font-bold">{t("success")}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {t("successDetail")}
                  </p>
                </div>
              </div>
            ) : status === "error" ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-12 text-center">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <div>
                  <p className="text-xl font-bold">{t("error")}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {t("errorDetail")}{" "}
                    <a href={`mailto:${siteConfig.email}`} className="text-primary underline underline-offset-2">
                      {siteConfig.email}
                    </a>.
                  </p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground"
                >
                  {t("retry")}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl border border-border bg-card p-8 shadow-sm shadow-primary/5"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-medium text-muted-foreground font-mono-accent">
                      {t("form.name")}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={t("form.namePlaceholder")}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium text-muted-foreground font-mono-accent">
                      {t("form.email")}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t("form.emailPlaceholder")}
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-xs font-medium text-muted-foreground font-mono-accent">
                    {t("form.subject")}
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder={t("form.subjectPlaceholder")}
                    required
                    className="bg-background"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs font-medium text-muted-foreground font-mono-accent">
                    {t("form.message")}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t("form.messagePlaceholder")}
                    required
                    className="resize-none bg-background"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "sending"}
                  className="w-full gap-2 shadow-md shadow-primary/5"
                >
                  {status === "sending" ? t("form.sending") : t("form.submit")}
                  <Send className="h-4 w-4" />
                </Button>

                <p className="text-center text-xs text-muted-foreground/60">
                  {t("guarantee")}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

