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

export const navLinks = [
  { label: "Solutions", href: "/#services" },
  { label: "Réalisations", href: "/#work" },
  { label: "À propos", href: "/#about" },
  { label: "Contact", href: "/#contact" },
]

export const services = [
  {
    title: "Développement Web",
    description:
      "Applications web full-stack construites avec des frameworks modernes — rapides, accessibles et prêtes pour la production.",
    icon: "Monitor",
  },
  {
    title: "Développement Mobile",
    description:
      "Applications mobiles cross-platform pour iOS et Android, conçues pour la performance et une expérience utilisateur exceptionnelle.",
    icon: "Smartphone",
  },
  {
    title: "UI / UX Design",
    description:
      "Systèmes de design et interfaces qui convertissent — épurés, intentionnels et dans l'identité de votre marque dès le premier jour.",
    icon: "Layers",
  },
  {
    title: "API & Intégrations",
    description:
      "APIs robustes et intégrations tierces qui unifient votre stack et automatisent vos flux de travail.",
    icon: "Plug",
  },
  {
    title: "Audits de Performance",
    description:
      "Audits approfondis qui identifient les goulots d'étranglement et réduisent les temps de chargement — des améliorations mesurables garanties.",
    icon: "Gauge",
  },
  {
    title: "Conseil Technique",
    description:
      "Revues d'architecture, renforcement d'équipe et guidance stratégique pour faire avancer votre produit.",
    icon: "Lightbulb",
  },
]

export const workItems = [
  {
    title: "Yes More Bet",
    description:
      "Croupier professionnel pour vos événements casino sur la Côte d'Azur. Tables de Blackjack, Roulette, animations haut de gamme. Nice, Cannes, Grasse, Antibes. Devis gratuit.",
        image: "/work/yesmorebet.jpg",
        href: "https://yesmorebet.com",
  },
  {
    title: "SOS Plombier Vence & alentours",
    description:
      "Artisan plombier a Vence, Cagnes-sur-Mer, Nice et dans toutes les Alpes-Maritimes. Depannage urgence, debouchage, chauffe-eau et renovation. Devis gratuit et sans engagement.",
        image: "/work/plombier.png",
        href: "https://plombier-vence.fr/",
  },
  {
    title: "ESCADIA | Escape Game",
    description:
      "Escape game immersif avec acteurs professionnels. Le Refuge (horreur) et Planète Escadia (sci-fi). Vivez une expérience terrifiante de 80 minutes avec effets spéciaux et décors grandeur nature. Réservez maintenant !",
        image: "/work/escadia.png",
        href: "https://escadia.fr/",
  },
  {
    title: "Plateforme des Dépanneurs",
    description:
      "Service de dépannage d'urgence disponible 24h/24, 7j/7 à Nice et dans les Alpes-Maritimes. Serrurier, plombier, vitrier, électricien. Intervention en 30 minutes. Devis gratuit.",
        image: "/work/Depanneurs.png",
        href: "https://www.la-plateforme-des-depanneurs.fr/",
  },
] 
