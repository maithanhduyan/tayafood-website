import type { Dictionary } from "@/i18n";

const IMAGES = {
  factory: "https://tayafood.github.io/website/assets/images/factory-01.jpg",
};

export default function Hero({ t }: { t: Dictionary }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.factory}
          alt="Nhà máy Taya Food"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/30" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-[#D71920]/10 blur-[100px]" />
      <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-[#D4A853]/10 blur-[100px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5">
        <div className="w-full pb-20 pt-32 lg:max-w-2xl lg:pt-0">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-white/90">{t.hero.badge}</span>
          </div>

          {/* Tagline */}
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A853]">
            {t.hero.tagline}
          </p>

          {/* Title */}
          <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t.hero.titleLine1}
            <br />
            <span className="gradient-text">{t.hero.titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300 md:text-xl">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#D71920] px-8 py-4 text-base font-bold text-white shadow-xl shadow-red-500/25 transition-all hover:bg-[#b9151b] hover:shadow-2xl hover:shadow-red-500/30"
            >
              {t.hero.ctaPrimary}
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#process"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {t.hero.stats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-[#D4A853]/40 pl-4">
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-6 rounded-full border-2 border-white/30 p-1">
            <div className="h-2 w-1.5 rounded-full bg-white/60 animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
}
