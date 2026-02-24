import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/shared/theme-provider";
import { getMessages, getLocale } from "next-intl/server";
import { siteConfig } from "@/constants/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export async function generateMetadata(): Promise<Metadata> {
  const messages = await getMessages()
  const hero = messages?.hero as { description?: string } | undefined
  const description = hero?.description ?? siteConfig.description
  const baseUrl = siteConfig.url ?? "http://localhost:3000"
  const locale = await getLocale()

  return {
    title: {
      default: siteConfig.name,
      template: `%s — ${siteConfig.name}`,
    },
    description,
    keywords: [
      "agence web",
      "développement web",
      "application mobile",
      "Nexora",
      "startup",
      "full-service",
      "web agency",
      "mobile app",
      "digital products",
    ],
    authors: [{ name: siteConfig.name, url: baseUrl }],
    creator: siteConfig.name,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: baseUrl,
      languages: {
        fr: `${baseUrl}/fr`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: siteConfig.name,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: siteConfig.name,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: "/logo.webp",
          width: 512,
          height: 180,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description,
      images: ["/logo.webp"],
    },
    icons: {
      icon: "/logo.webp",
      apple: "/logo.webp",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale()

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
