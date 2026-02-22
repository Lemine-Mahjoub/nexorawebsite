"use client"

import { useTranslations } from "next-intl"

export default function MentionsLegalesPage() {
  const t = useTranslations("legal")

  return (
    <div className="min-h-screen px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
        </div>

        <article className="prose prose-muted dark:prose-invert max-w-none space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-4">{t("section1Title")}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {t("section1Content")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">{t("section2Title")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("section2Content")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">{t("section3Title")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("section3Content")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">{t("section4Title")}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {t("section4Content")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">{t("section5Title")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("section5Content")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">{t("section6Title")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("section6Content")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">{t("section7Title")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("section7Content")}
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
