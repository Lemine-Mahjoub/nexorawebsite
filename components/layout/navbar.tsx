"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, FileText, Code2, ChevronDown } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Link, usePathname } from "@/i18n/navigation"
import { navLinkKeys, navHrefs, siteConfig } from "@/constants/site"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const LOCALES = ["en", "fr"] as const

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
  const t = useTranslations("nav")
  const locale = useLocale()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrolled()
  const sectionIds = navLinkKeys.map((k) => navHrefs[k].replace("/#", ""))
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
        <Image
          src="/logo.webp"
          alt={`${siteConfig.name} logo`}
          width={80}
          height={28}
          className="object-contain invert transition-opacity group-hover:opacity-90 dark:invert-0"
          priority
        />
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinkKeys.map((key) => {
            const href = navHrefs[key]
            const id = href.replace("/#", "")
            const isActive = active === id
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {t(key)}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex gap-1.5 border-l border-border pl-2 ml-1 text-xs font-medium uppercase"
              >
                {locale}
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LOCALES.map((loc) => (
                <DropdownMenuItem key={loc} asChild>
                  <Link href={pathname || "/"} locale={loc} className="cursor-pointer">
                    {t(`locales.${loc}`)}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild size="sm" className="hidden md:inline-flex gap-1.5 text-xs font-semibold">
            <Link href="/devis">
              <FileText className="h-3.5 w-3.5" />
              {t("quote")}
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
          {navLinkKeys.map((key) => (
            <Link
              key={key}
              href={navHrefs[key]}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t(key)}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="mt-2 gap-1.5 text-xs font-medium uppercase">
                {t(`locales.${locale}`)}
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="ml-4">
              {LOCALES.map((loc) => (
                <DropdownMenuItem key={loc} asChild>
                  <Link href={pathname || "/"} locale={loc} onClick={() => setMobileOpen(false)} className="cursor-pointer">
                    {t(`locales.${loc}`)}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild size="sm" className="mt-2 gap-1.5">
            <Link href="/devis" onClick={() => setMobileOpen(false)}>
              <FileText className="h-3.5 w-3.5" />
              {t("quote")}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

