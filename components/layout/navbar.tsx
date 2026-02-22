"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, FileText, Code2 } from "lucide-react"

import { navLinks, siteConfig } from "@/constants/site"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])
  return scrolled
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const visibleMap: Record<string, boolean> = {}

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          visibleMap[id] = entry.isIntersecting
          const first = ids.find((i) => visibleMap[i])
          setActive(first ?? "")
        },
        { rootMargin: "-40% 0px -55% 0px" }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [ids])

  return active
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrolled()
  const sectionIds = navLinks.map((l) => l.href.replace("/#", ""))
  const active = useActiveSection(sectionIds)

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/90 shadow-sm shadow-black/5 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
            <Code2 className="h-4 w-4" />
          </span>
          {siteConfig.name}
          <span className="text-primary">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("/#", "")
            const isActive = active === id
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden md:inline-flex gap-1.5 text-xs font-semibold">
            <Link href="/devis">
              <FileText className="h-3.5 w-3.5" />
              Demande Devis
            </Link>
          </Button>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "overflow-hidden border-b border-border/60 bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="mt-2 gap-1.5">
            <Link href="/devis" onClick={() => setMobileOpen(false)}>
              <FileText className="h-3.5 w-3.5" />
              Demande Devis
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

