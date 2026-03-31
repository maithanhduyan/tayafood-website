import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import "./globals.css";

const SITE_URL = "https://tayafood.com";
const OG_IMAGE = "/images/product-09.jpg";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  const url = `${SITE_URL}/${locale}`;

  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
    icons: { icon: "/favicon.svg" },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: { vi: `${SITE_URL}/vi`, en: `${SITE_URL}/en` },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url,
      siteName: "Taya Food",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 799,
          alt: t.meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
