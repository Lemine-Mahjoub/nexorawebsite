"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ExternalLink } from "lucide-react"

import { workItems } from "@/constants/site"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

export function WorkSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 })

  return (
    <section
      id="work"
      className="relative py-28 px-4 sm:px-6 lg:px-8"
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

      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Header */}
        <div
          className={cn(
            "mb-16 space-y-4 text-center",
            inView ? "animate-fade-in-up" : "opacity-0"
          )}
        >
          <p className="font-mono-accent font-semibold text-primary">
            études de cas
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Nos Réalisations
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground leading-relaxed">
            Une sélection des produits que nous avons livrés — des MVPs aux
            plateformes à grande échelle.
          </p>
          <div className="mx-auto w-12 h-px bg-primary/50 mt-2" />
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {workItems.map((item, i) => (
            <Link
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={cn(
                "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8",
                inView ? "animate-fade-in-up" : "opacity-0"
              )}
              style={{ animationDelay: inView ? `${i * 100 + 100}ms` : "0ms" }}
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-primary/20 via-primary/8 to-muted/30">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono-accent text-3xl font-bold text-primary/20">
                      {item.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Arrow badge */}
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-md backdrop-blur-sm opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <ArrowUpRight className="h-4 w-4 text-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-2.5 p-6">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-base font-bold tracking-tight text-foreground leading-tight">
                    {item.title}
                  </p>
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-primary/60" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {item.description}
                </p>
                <div className="mt-auto pt-3 border-t border-border/60">
                  <span className="text-xs font-medium text-primary/70 font-mono-accent">
                    Voir le projet →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

