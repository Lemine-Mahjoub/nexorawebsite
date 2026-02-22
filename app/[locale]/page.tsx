import { use } from "react"
import { setRequestLocale } from "next-intl/server"
import { HeroSection } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { WorkSection } from "@/components/sections/work"
import { AboutSection } from "@/components/sections/about"
import { ContactSection } from "@/components/sections/contact"

type Props = {
  params: Promise<{ locale: string }>
}

export default function HomePage({ params }: Props) {
  const { locale } = use(params)
  setRequestLocale(locale)

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}
