"use client"

import { CheckCircle2 } from "lucide-react"
import { useTranslations } from "next-intl"

import { statValues } from "@/constants/site"
import { useInView } from "@/hooks/use-in-view"
import { SectionGlow } from "@/components/shared/section-glow"
import { cn } from "@/lib/utils"

const aboutStatKeys = ["projects", "satisfaction", "experience", "rating"] as const
const stepKeys = ["discovery", "design", "dev", "delivery"] as const

export function AboutSection() {
  const t = useTranslations("about")
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="about" className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8">
      <SectionGlow position="right" />
      <div ref={ref} className="relative mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left – text */}
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
                <span className="text-muted-foreground/70">{t("titleAlt")}</span>
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              {t("intro1")}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              {t("intro2")}
            </p>

            {/* Values list */}
            <ul className="space-y-3">
              {(t.raw("values") as string[]).map((v, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right – stats */}
          <div
            className={cn(
              "space-y-6",
              inView ? "animate-fade-in-up delay-200" : "opacity-0"
            )}
          >
            {/* 2×2 stat cards */}
            <div className="grid grid-cols-2 gap-4">
            {aboutStatKeys.map((key, idx) => (
                <div
                  key={key}
                  className="group rounded-2xl border border-border bg-card p-6 text-center shadow-sm shadow-primary/5 transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:shadow-primary/8"
                >
                  <p className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                    {statValues[idx]}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{t(`stats.${key}`)}</p>
                </div>
              ))}
            </div>

            {/* Process card */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm shadow-primary/5">
              <p className="font-mono-accent font-semibold text-primary text-sm">
                {t("process")}
              </p>
              <div className="space-y-3">
                {stepKeys.map((key, i) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="font-mono-accent text-muted-foreground/50 text-xs w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-sm font-medium text-foreground">{t(`steps.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

