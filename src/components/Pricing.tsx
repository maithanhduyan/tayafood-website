"use client";

import type { Dictionary } from "@/i18n";
import { useScrollVisible } from "@/hooks/useScrollVisible";

const HREF = ["#contact", "#contact", "#contact"];

const PLAN_ICONS = [
  /* Startup – lightbulb */
  <svg key="s" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>,
  /* OEM – factory */
  <svg key="o" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>,
  /* Distributor – truck */
  <svg key="d" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h3.75a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H3.375m0 9V6.375c0-.621.504-1.125 1.125-1.125h1.5m0 0h9.75M7.875 5.25v9m9.75-9h1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.125m0-3.75V9.75m0-4.5h2.25" /></svg>,
];

export default function Pricing({ t }: { t: Dictionary }) {
  const { ref, visible } = useScrollVisible();

  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-24">
      <div ref={ref} className={`animate-on-scroll ${visible ? "visible" : ""}`}>
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <span className="inline-block rounded-full bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D71920]">
              Partnership
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-5xl">
              {t.pricing.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-500">
              {t.pricing.subtitle}
            </p>
          </div>

          <div className={`stagger-children mt-14 grid gap-6 lg:grid-cols-3 ${visible ? "visible" : ""}`}>
            {t.pricing.plans.map((plan, i) => {
              const highlight = i === 1;
              return (
                <div
                  key={plan.name}
                  className={`group relative overflow-hidden rounded-2xl border p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${
                    highlight
                      ? "border-[#D71920] bg-gradient-to-br from-red-50 to-white shadow-lg"
                      : "border-gray-100 bg-white shadow-sm"
                  }`}
                >
                  {highlight && (
                    <span className="absolute -top-0 right-0 rounded-bl-xl bg-[#D71920] px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {t.pricing.popular}
                    </span>
                  )}

                  <div className={`inline-flex rounded-xl p-3 ${highlight ? "bg-red-100 text-[#D71920]" : "bg-gray-100 text-gray-600"}`}>
                    {PLAN_ICONS[i]}
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-gray-900">{plan.name}</h3>

                  <div className="mt-3">
                    <span className={`text-3xl font-extrabold ${highlight ? "text-[#D71920]" : "text-gray-900"}`}>
                      {t.pricing.contactPrice}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#D71920]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={HREF[i]}
                    className={`mt-8 block rounded-xl py-3.5 text-center text-sm font-semibold transition ${
                      highlight
                        ? "bg-[#D71920] text-white shadow-md shadow-red-500/20 hover:bg-[#b9151b]"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
