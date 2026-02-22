"use client"

import { CheckCircle2 } from "lucide-react"
import { statValues } from "@/constants/site"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const aboutStats = [
  { value: statValues[0], label: "Projets livrés" },
  { value: statValues[1], label: "Satisfaction client" },
  { value: statValues[2], label: "D'expérience" },
  { value: statValues[3], label: "Note moyenne" },
]

const values = [
  "Accès direct aux ingénieurs qui construisent votre produit",
  "Code source propre, testé et documenté",
  "Délais respectés, budgets maîtrisés",
  "Communication transparente à chaque étape",
]

export function AboutSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="mx-auto max-w-6xl">
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
                qui sommes-nous
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
                Conçu pour livrer.
                <br />
                <span className="text-muted-foreground/70">Pensé pour durer.</span>
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              Nexora est une agence de développement full-service qui réunit des
              ingénieurs seniors et des designers produit pour créer des expériences
              digitales exceptionnelles. Nous accompagnons fondateurs, équipes produit
              et entreprises à chaque étape — du zéro au un et au-delà.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Nous sommes sélectifs sur les projets que nous acceptons parce que nous
              nous tenons à un niveau d&apos;exigence élevé. Chaque mission bénéficie
              de notre pleine attention avec un engagement partagé sur les résultats
              qui font vraiment la différence.
            </p>

            {/* Values list */}
            <ul className="space-y-3">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3 text-sm">
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
            {aboutStats.map(({ value, label }) => (
                <div
                  key={label}
                  className="group rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
                >
                  <p className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* Process card */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="font-mono-accent font-semibold text-primary text-sm">
                notre processus
              </p>
              <div className="space-y-3">
                {[
                  ["01", "Découverte & stratégie"],
                  ["02", "Design & prototype"],
                  ["03", "Développement itératif"],
                  ["04", "Livraison & support"],
                ].map(([num, step]) => (
                  <div key={num} className="flex items-center gap-3">
                    <span className="font-mono-accent text-muted-foreground/50 text-xs w-6 shrink-0">{num}</span>
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-sm font-medium text-foreground">{step}</span>
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

