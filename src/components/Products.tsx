"use client";

import type { Dictionary } from "@/i18n";
import { useScrollVisible } from "@/hooks/useScrollVisible";

const PRODUCT_IMAGES = [
  "https://tayafood.github.io/website/assets/images/products/hat-dieu-tam-vi-toi-ot-200g.png",
  "https://tayafood.github.io/website/assets/images/products/hat-dieu-tam-vi-rong-bien-200g.png",
  "https://tayafood.github.io/website/assets/images/products/hat-dieu-tam-vi-pho-mai-200g.png",
  "https://tayafood.github.io/website/assets/images/products/gia-vi-xot.png",
  "https://tayafood.github.io/website/assets/images/products/gia-vi-rac-tam.png",
  "https://tayafood.github.io/website/assets/images/products/gia-vi-bot-soup.png",
];

const CATEGORY_COLORS: Record<string, string> = {
  "NÔNG SẢN TẨM VỊ": "bg-amber-50 text-amber-700",
  "FLAVORED NUTS": "bg-amber-50 text-amber-700",
  "XỐT & GIA VỊ LỎNG": "bg-red-50 text-red-700",
  "SAUCES & LIQUID": "bg-red-50 text-red-700",
  "GIA VỊ BỘT": "bg-orange-50 text-orange-700",
  "SEASONING POWDER": "bg-orange-50 text-orange-700",
};

export default function Products({ t }: { t: Dictionary }) {
  const { ref, visible } = useScrollVisible();

  return (
    <section id="products" className="relative overflow-hidden bg-gray-50 py-24">
      <div className="absolute top-0 left-0 h-full w-full bg-grid opacity-50" />

      <div ref={ref} className={`animate-on-scroll ${visible ? "visible" : ""}`}>
        <div className="relative mx-auto max-w-7xl px-5">
          {/* Header */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D71920]">
              {t.products.label}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-5xl">
              {t.products.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-500">{t.products.subtitle}</p>
          </div>

          {/* Products grid */}
          <div className={`stagger-children mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${visible ? "visible" : ""}`}>
            {t.products.items.map((p, i) => (
              <div
                key={p.title}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                  <img
                    src={PRODUCT_IMAGES[i]}
                    alt={p.title}
                    className="h-full w-auto max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className={`absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[p.category] || "bg-gray-100 text-gray-700"}`}>
                    {p.category}
                  </span>
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-gray-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Download CTAs */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://tayafood.github.io/website/assets/docs/TAYAFOOD_CATALOG.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#D71920] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition hover:bg-[#b9151b]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              {t.products.cta}
            </a>
            <a
              href="https://tayafood.github.io/website/assets/docs/TAYAFOOD_PROFILE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-[#D71920] hover:text-[#D71920]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              {t.products.ctaProfile}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
