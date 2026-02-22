"use client"

import { useTranslations } from "next-intl"

export default function CGVPage() {
  const t = useTranslations("cgv")

  const sectionKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const

  return (
    <div className="min-h-screen px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t("intro")}
          </p>
        </div>

        <article className="prose prose-muted dark:prose-invert max-w-none space-y-10">
          {sectionKeys.map((key) => (
            <section key={key}>
              <h2 className="text-xl font-semibold mb-4">{t(`sections.${key}.title`)}</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {t(`sections.${key}.content`)}
              </p>
            </section>
          ))}
        </article>
      </div>
    </div>
  )
}
