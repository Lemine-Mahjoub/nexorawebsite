"use client"

import {
  Monitor,
  Smartphone,
  Layers,
  Plug,
  Gauge,
  Lightbulb,
  LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { serviceKeys, serviceIcons } from "@/constants/site"
import { useInView } from "@/hooks/use-in-view"
import { SectionGlow } from "@/components/shared/section-glow"
import { cn } from "@/lib/utils"

export function ServicesSection() {
  const t = useTranslations("services")
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 })

  const iconMap: Record<string, LucideIcon> = {
    Monitor,
    Smartphone,
    Layers,
    Plug,
    Gauge,
    Lightbulb,
  }

  return (
    <section id="services" className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8">
      <SectionGlow position="right" />
      <div ref={ref} className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div
          className={cn(
            "mb-16 space-y-4 text-center transition-none",
            inView ? "animate-fade-in-up" : "opacity-0"
          )}
        >
          <p className="font-mono-accent font-semibold text-primary">
            {t("label")}
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
          {/* Expanding accent line */}
          <div className="mx-auto w-12 h-px bg-primary/50 mt-2" />
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((key, i) => {
            const Icon = iconMap[serviceIcons[key]] ?? Monitor
            return (
              <div
                key={key}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md hover:shadow-primary/8",
                  inView ? "animate-fade-in-up" : "opacity-0"
                )}
                style={{ animationDelay: inView ? `${i * 80 + 100}ms` : "0ms" }}
              >
                {/* Icon */}
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mb-2 text-base font-bold tracking-tight text-foreground">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`items.${key}.description`)}
                </p>

                {/* Bottom accent line */}
                <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

