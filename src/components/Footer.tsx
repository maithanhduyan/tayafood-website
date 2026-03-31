import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://www.facebook.com/tayafood", icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg> },
  { name: "YouTube", href: "https://www.youtube.com/@TAYA-Official", icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg> },
  { name: "Zalo", href: "https://zalo.me/0945614800", icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.49 10.272v-.45h1.347v6.322h-.77l-.287-.4a3.233 3.233 0 01-2.055.674c-1.884 0-3.37-1.54-3.37-3.447 0-1.907 1.486-3.449 3.37-3.449a3.233 3.233 0 012.055.674l.287-.4h.77v.45l-.347.476v4.774l.347.476zm-1.764 5.001c1.334 0 2.417-1.1 2.417-2.454 0-1.355-1.082-2.455-2.417-2.455s-2.417 1.1-2.417 2.455c0 1.354 1.082 2.454 2.417 2.454zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" /></svg> },
];

export default function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="bg-gray-950 pt-16 pb-8 text-gray-400">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <img src="/logo-hands.svg" alt="" className="h-11 w-11 brightness-0 invert" />
              <span className="text-xl font-bold text-white">TAYA FOOD</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">{t.footer.desc}</p>
            <p className="mt-1 text-xs italic text-[#D4A853]">{t.footer.tagline}</p>

            {/* Social links */}
            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition hover:bg-[#D71920] hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#about" className="transition hover:text-white">{t.footer.linkAbout}</a></li>
              <li><a href="#products" className="transition hover:text-white">{t.footer.linkProducts}</a></li>
              <li><a href="#process" className="transition hover:text-white">{t.footer.linkProcess}</a></li>
              <li><a href="#factory" className="transition hover:text-white">{t.footer.linkFactory}</a></li>
              <li><a href="#pricing" className="transition hover:text-white">{t.footer.linkPartnership}</a></li>
              <li><a href="#contact" className="transition hover:text-white">{t.footer.linkQuote}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.servicesTitle}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>{t.footer.serviceOem}</li>
              <li>{t.footer.serviceSauce}</li>
              <li>{t.footer.servicePowder}</li>
              <li>{t.footer.serviceNuts}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.contactTitle}
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                anmtt@tayafood.com
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                (+84) 0945 614 800
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                tayafood.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
            <p>{t.footer.companyFull}</p>
            <div className="flex items-center gap-4">
              <a href={`/${locale}/privacy-policy`} className="transition hover:text-white">{t.footer.privacy}</a>
              <span className="text-gray-700">|</span>
              <a href={`/${locale}/terms-of-use`} className="transition hover:text-white">{t.footer.terms}</a>
            </div>
            <p>© {new Date().getFullYear()} Taya Food. {t.footer.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
