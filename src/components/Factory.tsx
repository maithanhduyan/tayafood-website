"use client";

import type { Dictionary } from "@/i18n";
import { useScrollVisible } from "@/hooks/useScrollVisible";

const FACTORY_IMAGES = [
  "https://tayafood.github.io/profile/asset/images/TAYAFOOD-09.png",
  "https://tayafood.github.io/profile/asset/images/TAYAFOOD-10.png",
  "https://tayafood.github.io/profile/asset/images/TAYAFOOD_ISO.jpg",
  "https://tayafood.github.io/profile/asset/images/TAYAFOOD-06.png",
];

export default function Factory({ t }: { t: Dictionary }) {
  const { ref, visible } = useScrollVisible();

  return (
    <section id="factory" className="relative overflow-hidden bg-gray-50 py-24">
      <div ref={ref} className={`animate-on-scroll ${visible ? "visible" : ""}`}>
        <div className="mx-auto max-w-7xl px-5">
          {/* Header */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D71920]">
              {t.factory.label}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-5xl">
              {t.factory.title}
            </h2>
          </div>

          {/* Grid */}
          <div className={`stagger-children mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${visible ? "visible" : ""}`}>
            {t.factory.items.map((item, i) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={FACTORY_IMAGES[i]}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D71920] backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-1.5 text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a
              href="https://tayafood.github.io/website/assets/docs/TAYAFOOD_PROFILE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-[#D71920] hover:text-[#D71920]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              {t.factory.ctaProfile}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
