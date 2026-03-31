import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Process from "@/components/Process";
import Factory from "@/components/Factory";
import Pricing from "@/components/Pricing";
import TrialForm from "@/components/TrialForm";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollToTop from "@/components/ScrollToTop";

function JsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Taya Food",
    legalName: "Công ty TNHH Thực Phẩm Taya Việt Nam",
    url: "https://tayafood.com",
    logo: "https://tayafood.com/logo.svg",
    image: "https://tayafood.com/images/product-09.jpg",
    description:
      locale === "vi"
        ? "Chuyên gia công OEM/ODM xốt, gia vị, nông sản tẩm vị. ISO 22000:2018."
        : "Specialized OEM/ODM manufacturing of sauces, seasonings, and flavored agricultural products. ISO 22000:2018.",
    telephone: "+84-945-614-800",
    email: "anmtt@tayafood.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5C2 Hòa Bình, P. Bình Thới",
      addressLocality: "Hồ Chí Minh",
      addressCountry: "VN",
    },
    sameAs: [
      "https://www.facebook.com/tayafood",
      "https://www.youtube.com/@TAYA-Official",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "OEM/ODM Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "OEM/ODM Sauce Manufacturing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seasoning Powder Production" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flavored Nuts Processing" } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <JsonLd locale={locale} />
      <Header locale={locale} t={t} />
      <main>
        <Hero t={t} />
        <About t={t} />
        <Products t={t} />
        <Process t={t} />
        <Factory t={t} />
        <Pricing t={t} />
        <TrialForm t={t} />
      </main>
      <Footer locale={locale} t={t} />
      <ChatWidget t={t} />
      <ScrollToTop />
    </>
  );
}
