import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function TermsOfUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <Header locale={locale} t={t} />
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-5">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {t.termsOfUse.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {t.termsOfUse.lastUpdated}
          </p>
          <p className="mt-6 leading-relaxed text-gray-600">
            {t.termsOfUse.intro}
          </p>

          <div className="mt-10 space-y-8">
            {t.termsOfUse.sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-lg font-semibold text-gray-900">
                  {section.title}
                </h2>
                <p className="mt-2 whitespace-pre-line leading-relaxed text-gray-600">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
