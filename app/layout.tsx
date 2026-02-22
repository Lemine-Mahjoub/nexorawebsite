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
  return {
    title: {
      default: siteConfig.name,
      template: `%s — ${siteConfig.name}`,
    },
    description,
    metadataBase: new URL(siteConfig.url ?? "http://localhost:3000"),
    openGraph: {
      title: siteConfig.name,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description,
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
