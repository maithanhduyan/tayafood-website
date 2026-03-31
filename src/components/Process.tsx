"use client";

import type { Dictionary } from "@/i18n";
import { useScrollVisible } from "@/hooks/useScrollVisible";

const STEP_ICONS = [
  /* 01 Consultation */
  <svg key="c" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>,
  /* 02 R&D */
  <svg key="r" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
  /* 03 Compliance */
  <svg key="p" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  /* 04 Production */
  <svg key="f" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>,
  /* 05 Delivery */
  <svg key="d" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h3.75a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H3.375m0 9V6.375c0-.621.504-1.125 1.125-1.125h1.5m0 0h9.75M7.875 5.25v9m9.75-9h1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.125m0-3.75V9.75m0-4.5h2.25" /></svg>,
];

export default function Process({ t }: { t: Dictionary }) {
  const { ref, visible } = useScrollVisible();

  return (
    <section id="process" className="relative overflow-hidden bg-white py-24">
      <div ref={ref} className={`animate-on-scroll ${visible ? "visible" : ""}`}>
        <div className="mx-auto max-w-7xl px-5">
          {/* Header */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D71920]">
              {t.process.label}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-5xl">
              {t.process.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-500">{t.process.subtitle}</p>
          </div>

          {/* Steps */}
          <div className={`stagger-children relative mt-16 grid gap-8 md:grid-cols-5 ${visible ? "visible" : ""}`}>
            {/* Connecting line (desktop only) */}
            <div className="pointer-events-none absolute top-14 right-[10%] left-[10%] hidden h-0.5 bg-gradient-to-r from-red-200 via-[#D71920] to-[#D4A853] md:block" />

            {t.process.steps.map((s, i) => (
              <div key={s.step} className="group relative flex flex-col items-center text-center">
                {/* Circle */}
                <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-red-100 bg-white shadow-md transition-all group-hover:border-[#D71920] group-hover:shadow-lg group-hover:shadow-red-500/10">
                  <div className="text-[#D71920]">{STEP_ICONS[i]}</div>
                  <span className="mt-1 text-xs font-bold text-[#D4A853]">{s.step}</span>
                </div>
                {/* Content */}
                <h3 className="mt-5 text-sm font-bold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#D71920] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-[#b9151b]"
            >
              {t.process.cta}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
