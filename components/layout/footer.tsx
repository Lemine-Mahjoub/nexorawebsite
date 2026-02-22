import Link from "next/link"
import { Instagram, Linkedin, Code2, Mail, Phone } from "lucide-react"

import { navLinks, siteConfig } from "@/constants/site"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background">
      {/* Subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-2 text-xl font-bold tracking-tight">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Code2 className="h-4 w-4" />
              </span>
              {siteConfig.name}
              <span className="text-primary">.</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            {/* Quick contact */}
            <div className="space-y-1.5">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5 text-primary/60" />
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5 text-primary/60" />
                {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Navigation
            </p>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/devis"
                className="text-sm font-medium text-primary/80 transition-colors hover:text-primary"
              >
                Demande de Devis →
              </Link>
            </nav>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Réseaux
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                {
                  href: siteConfig.socials.instagram,
                  label: "Instagram",
                  Icon: Instagram,
                },
                {
                  href: siteConfig.socials.linkedin,
                  label: "LinkedIn",
                  Icon: Linkedin,
                },
                {
                  href: siteConfig.socials.whatsapp,
                  label: "WhatsApp",
                  Icon: WhatsAppIcon,
                },
                {
                  href: siteConfig.socials.discord,
                  label: "Discord",
                  Icon: DiscordIcon,
                },
              ].map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-4 w-4 text-muted-foreground/60" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
          </p>
          <p className="font-mono-accent text-muted-foreground/50">
            built with Next.js · React · TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}

