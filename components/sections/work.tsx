"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { workItems } from "@/constants/site"
import { useInView } from "@/hooks/use-in-view"
import { SectionGlow } from "@/components/shared/section-glow"
import { cn } from "@/lib/utils"

const AUTO_SCROLL_INTERVAL = 4000

/** 85° diagonal : tan(5°) ≈ 8.7% de largeur pour hauteur complète */
const DIAGONAL_OFFSET = "8.7%"

export function WorkSection() {
  const t = useTranslations("work")
  const scrollRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 })

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const slide = el.querySelector<HTMLElement>("[data-slide]")
    const step = slide?.offsetWidth ?? el.clientWidth
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const interval = setInterval(() => {
      const maxScroll = el.scrollWidth - el.clientWidth
      if (maxScroll <= 0) return

      const slide = el.querySelector<HTMLElement>("[data-slide]")
      const step = slide?.offsetWidth ?? el.clientWidth
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        el.scrollBy({ left: step, behavior: "smooth" })
      }
    }, AUTO_SCROLL_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  const getClipPath = (i: number, total: number) => {
    const hasLeft = i > 0
    const hasRight = i < total - 1
    if (hasLeft && hasRight) {
      return `polygon(${DIAGONAL_OFFSET} 0, 100% 0, calc(100% - ${DIAGONAL_OFFSET}) 100%, 0 100%)`
    }
    if (hasLeft) {
      return `polygon(${DIAGONAL_OFFSET} 0, 100% 0, 100% 100%, 0 100%)`
    }
    if (hasRight) {
      return `polygon(0 0, 100% 0, calc(100% - ${DIAGONAL_OFFSET}) 100%, 0 100%)`
    }
    return "none"
  }

  return (
    <section
      id="work"
      className="relative py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Section background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-muted/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_40%,transparent_100%)]"
      />
      <SectionGlow position="left" />

      <div ref={ref} className="relative">
        {/* Header */}
        <div
          className={cn(
            "mb-8 space-y-3 text-center",
            inView ? "animate-fade-in-up" : "opacity-0"
          )}
        >
          <p className="font-mono-accent font-semibold text-primary">
            {t("label")}
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="mx-auto w-12 h-px bg-primary/50 mt-2" />
        </div>

        {/* Carousel - 90% de la largeur de la page */}
        <div className="relative mx-auto w-[90vw] max-w-[90vw] overflow-hidden rounded-xl">
          <div
            className="relative overflow-hidden"
            style={{
              height: "min(58vh, 480px)",
              minHeight: "420px",
            }}
          >
            <div
              ref={scrollRef}
              className="flex h-full overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ scrollSnapType: "x mandatory" }}
            >
            {workItems.map((item, i) => (
              <div
                key={item.key}
                data-slide
                className="relative flex shrink-0 snap-center w-[min(75%,420px)] min-w-[min(75%,420px)] sm:w-[min(70%,480px)] sm:min-w-[min(70%,480px)] md:w-[min(60%,520px)] md:min-w-[min(60%,520px)]"
                style={{ scrollSnapAlign: "center" }}
              >
                {/* Séparateur diagonal 85° - ombre douce */}
                {i > 0 && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 -translate-x-1/2"
                    style={{
                      background: `linear-gradient(85deg, 
                        transparent 0%, 
                        rgba(0,0,0,0.3) 30%, 
                        rgba(0,0,0,0.6) 50%, 
                        rgba(0,0,0,0.3) 70%, 
                        transparent 100%)`,
                      boxShadow: "2px 0 12px rgba(0,0,0,0.25), -2px 0 12px rgba(0,0,0,0.25)",
                    }}
                  />
                )}

                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group relative flex h-full w-full overflow-hidden transition-opacity hover:opacity-95",
                    inView ? "animate-fade-in-up" : "opacity-0"
                  )}
                  style={{
                    animationDelay: `${Math.min(i * 80, 300)}ms`,
                    clipPath: getClipPath(i, workItems.length),
                    WebkitClipPath: getClipPath(i, workItems.length),
                  }}
                >
                  {/* Image - prend toute la diagonale / plein parallélogramme */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/8 to-muted/30">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={t(`items.${item.key}.title`)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 75vw, (max-width: 768px) 70vw, 520px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono-accent text-4xl font-bold text-primary/20">
                          {item.key.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Effet luminosité - gradient sombre pour lisible */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(to top, 
                          rgba(0,0,0,0.8) 0%, 
                          rgba(0,0,0,0.4) 35%, 
                          rgba(0,0,0,0.15) 55%, 
                          transparent 75%),
                        radial-gradient(ellipse 100% 80% at 50% 80%, 
                          rgba(0,0,0,0.2) 0%, 
                          transparent 50%)
                      `,
                    }}
                  />

                  {/* Texte superposé - thème du site, hiérarchie claire */}
                  <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 pl-[12%] pr-[12%] pb-4 pt-10 sm:pl-[14%] sm:pr-[14%] sm:pb-5 sm:pt-14">
                    <h3 className="text-lg font-bold tracking-tight text-primary-foreground [text-shadow:0_1px_3px_rgba(0,0,0,0.5)] sm:text-xl">
                      {t(`items.${item.key}.title`)}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-gray-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] sm:line-clamp-3">
                      {t(`items.${item.key}.description`)}
                    </p>
                    <span className="mt-0.5 text-xs font-medium text-primary font-mono-accent [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">
                      {t("seeProject")} →
                    </span>
                  </div>
                </a>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Nav buttons - sous le carrousel */}
        <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label={t("prev")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card/95 shadow-[0_2px_8px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-muted/80 sm:h-10 sm:w-10"
            >
              <ChevronLeft className="h-4 w-4 text-foreground sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label={t("next")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card/95 shadow-[0_2px_8px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-muted/80 sm:h-10 sm:w-10"
            >
              <ChevronRight className="h-4 w-4 text-foreground sm:h-5 sm:w-5" />
            </button>
          </div>
      </div>
    </section>
  )
}
