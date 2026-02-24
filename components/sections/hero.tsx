"use client"

import { ArrowRight, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { statValues } from "@/constants/site"
import { SectionGlow } from "@/components/shared/section-glow"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const t = useTranslations("hero")
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-32 text-center sm:px-6 lg:px-8"
    >
      {/* Grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border)/0.6)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.6)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_50%,transparent_100%)]"
      />

      <SectionGlow position="top" />

      <motion.div
        className="mx-auto max-w-4xl space-y-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          hidden: {},
        }}
      >
        {/* Availability badge */}
        <motion.div
          className="flex justify-center"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 28 },
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm shadow-primary/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t("available")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 28 },
          }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("tagline")}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 28 },
          }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 28 },
          }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button asChild size="lg" className="gap-2 px-6 shadow-md shadow-primary/5">
            <Link href="/#work">
              {t("ctaWork")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 px-6 backdrop-blur-sm"
          >
            <Link href="/devis">
              {t("ctaContact")}
            </Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mx-auto grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border/60 shadow-sm shadow-primary/5"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 28 },
          }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            { value: statValues[0], labelKey: "projects" as const },
            { value: statValues[1], labelKey: "clients" as const },
            { value: statValues[2], labelKey: "experience" as const },
          ].map(({ value, labelKey }) => (
            <div
              key={labelKey}
              className="flex flex-col items-center gap-0.5 bg-card/90 px-4 py-5 backdrop-blur-sm"
            >
              <span className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                {value}
              </span>
              <span className="text-xs text-muted-foreground">{t(`stats.${labelKey}`)}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <ChevronDown className="h-5 w-5 animate-bounce text-muted-foreground/40" />
      </motion.div>
    </section>
  )
}

