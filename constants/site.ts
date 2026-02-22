export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME!,
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE!,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION!,
  url: process.env.NEXT_PUBLIC_SITE_URL!,
  email: process.env.NEXT_PUBLIC_SITE_EMAIL!,
  phone: process.env.NEXT_PUBLIC_SITE_PHONE!,
  phoneHref: process.env.NEXT_PUBLIC_SITE_PHONE_HREF!,
  address: process.env.NEXT_PUBLIC_SITE_ADDRESS!,
  addressHref: process.env.NEXT_PUBLIC_SITE_ADDRESS_HREF!,
  hours: process.env.NEXT_PUBLIC_SITE_HOURS!,
  socials: {
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM!,
    whatsapp: process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP!,
    discord: process.env.NEXT_PUBLIC_SOCIAL_DISCORD!,
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN!,
  },
}

export const statValues = [
  process.env.NEXT_PUBLIC_STAT1_VALUE!,
  process.env.NEXT_PUBLIC_STAT2_VALUE!,
  process.env.NEXT_PUBLIC_STAT3_VALUE!,
  process.env.NEXT_PUBLIC_STAT4_VALUE!,
]

export const navLinkKeys = ["solutions", "work", "about", "contact"] as const
export const navHrefs: Record<(typeof navLinkKeys)[number], string> = {
  solutions: "/#services",
  work: "/#work",
  about: "/#about",
  contact: "/#contact",
}

export const serviceKeys = [
  "web",
  "mobile",
  "ui",
  "api",
  "audit",
  "consulting",
] as const
export const serviceIcons: Record<(typeof serviceKeys)[number], string> = {
  web: "Monitor",
  mobile: "Smartphone",
  ui: "Layers",
  api: "Plug",
  audit: "Gauge",
  consulting: "Lightbulb",
}

export const workItemKeys = [
  "yesmorebet",
  "plombier",
  "escadia",
  "depanneurs",
] as const
export const workItems = [
  { key: "yesmorebet" as const, image: "/work/yesmorebet.jpg", href: "https://yesmorebet.com" },
  { key: "plombier" as const, image: "/work/plombier.png", href: "https://plombier-vence.fr/" },
  { key: "escadia" as const, image: "/work/escadia.png", href: "https://escadia.fr/" },
  { key: "depanneurs" as const, image: "/work/Depanneurs.png", href: "https://www.la-plateforme-des-depanneurs.fr/" },
]
