"use client";

import type { Dictionary } from "@/i18n";
import { useScrollVisible } from "@/hooks/useScrollVisible";

const SERVICE_ICONS = [
  /* R&D */ <svg key="rd" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
  /* ISO */ <svg key="iso" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  /* MOQ */ <svg key="moq" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>,
  /* Delivery */ <svg key="del" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.093-1.124a21.5 21.5 0 00-.557-4.126M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>,
];

export default function About({ t }: { t: Dictionary }) {
  const { ref, visible } = useScrollVisible();

  return (
    <section id="about" className="relative overflow-hidden bg-white py-24">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-50 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-amber-50 blur-[100px]" />

      <div ref={ref} className={`animate-on-scroll ${visible ? "visible" : ""}`}>
        <div className="relative mx-auto max-w-7xl px-5">
          {/* Section header */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D71920]">
              {t.about.label}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-5xl">
              {t.about.title}
            </h2>
          </div>

          {/* Description + Vision/Mission */}
          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-lg leading-relaxed text-gray-600">{t.about.desc}</p>

              {/* Vision & Mission cards */}
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-red-100 bg-gradient-to-r from-red-50 to-white p-5">
                  <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#D71920]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t.about.visionLabel}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.about.vision}</p>
                </div>
                <div className="rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 to-white p-5">
                  <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#D4A853]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m6 5.96a14.926 14.926 0 01-5.84 2.58m0 0a14.926 14.926 0 01-5.84-2.58" />
                    </svg>
                    {t.about.missionLabel}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.about.mission}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-8">
              <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-[#D71920] via-[#D4A853] to-gray-200" />
              <div className="space-y-8">
                {t.about.timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[22px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#D71920] bg-white">
                      <div className="h-2 w-2 rounded-full bg-[#D71920]" />
                    </div>
                    <span className="inline-block rounded-md bg-[#D71920] px-2.5 py-0.5 text-xs font-bold text-white">
                      {item.year}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service highlights */}
          <div className={`stagger-children mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${visible ? "visible" : ""}`}>
            {t.about.services.map((s, i) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#D71920]/20 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#D71920] transition-colors group-hover:bg-[#D71920] group-hover:text-white">
                  {SERVICE_ICONS[i]}
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
