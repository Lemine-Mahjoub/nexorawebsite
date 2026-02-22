import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"

import { siteConfig, statValues } from "@/constants/site"

const heroStats = [
  { value: statValues[0], label: "Projets livrés" },
  { value: statValues[1], label: "Clients satisfaits" },
  { value: statValues[2], label: "D'expérience" },
]
import { Button } from "@/components/ui/button"

export function HeroSection() {
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

      {/* Primary glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-52 left-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl animate-pulse-glow"
      />
      {/* Secondary offset glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl"
      />

      <div className="mx-auto max-w-4xl space-y-8">

        {/* Availability badge */}
        <div className="animate-fade-in-up flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Disponible pour de nouveaux projets
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up delay-100 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          {siteConfig.tagline}
        </h1>

        {/* Description */}
        <p className="animate-fade-in-up delay-200 mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {siteConfig.description}
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up delay-300 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="gap-2 px-6 shadow-md shadow-primary/20">
            <Link href="/#work">
              Voir nos réalisations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 px-6 backdrop-blur-sm"
          >
            <Link href="/#contact">
              Démarrer un projet
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up delay-500 mx-auto grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border/60 shadow-sm">
          {heroStats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-0.5 bg-card/90 px-4 py-5 backdrop-blur-sm"
            >
              <span className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                {value}
              </span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="animate-fade-in delay-700 absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="h-5 w-5 animate-bounce text-muted-foreground/40" />
      </div>
    </section>
  )
}

