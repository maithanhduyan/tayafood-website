"use client";

import { useState, useEffect } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

interface HeaderProps {
  locale: Locale;
  t: Dictionary;
}

export default function Header({ locale, t }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const home = `/${locale}`;
  const NAV_ITEMS = [
    { label: t.nav.about, href: `${home}#about` },
    { label: t.nav.products, href: `${home}#products` },
    { label: t.nav.process, href: `${home}#process` },
    { label: t.nav.partnership, href: `${home}#pricing` },
    { label: t.nav.contact, href: `${home}#contact` },
  ];

  const otherLocale = locale === "vi" ? "en" : "vi";
  const localeLabel = locale === "vi" ? "EN" : "VI";

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-gray-100/50 bg-white/95 shadow-lg shadow-black/5 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20">
        {/* Logo */}
        <a href={home} className="flex items-center gap-2">
          <img src="/logo.svg" alt="TAYAFOOD" className="h-12 w-auto md:h-14" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium uppercase transition-colors ${
                scrolled
                  ? "text-gray-600 hover:bg-gray-50 hover:text-[#D71920]"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}

          <div className="ml-2 flex items-center gap-2">
            <a
              href={`/${otherLocale}`}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                scrolled
                  ? "border-gray-200 text-gray-600 hover:border-[#D71920] hover:text-[#D71920]"
                  : "border-white/30 text-white hover:border-white hover:bg-white/10"
              }`}
            >
              <img src={`/images/flags/${otherLocale}.svg`} alt={localeLabel} className="h-3.5 w-5 rounded-sm object-cover" />
              {localeLabel}
            </a>
            <a
              href={`${home}#contact`}
              className="rounded-lg bg-[#D71920] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition hover:bg-[#b9151b] hover:shadow-lg hover:shadow-red-500/30"
            >
              {t.nav.cta}
            </a>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="relative h-6 w-6 lg:hidden"
          aria-label={t.nav.openMenu}
        >
          <span
            className={`absolute left-0 block h-0.5 w-6 rounded transition-all duration-300 ${
              open ? "top-[11px] rotate-45" : "top-1"
            } ${scrolled ? "bg-gray-700" : "bg-white"}`}
          />
          <span
            className={`absolute left-0 top-[11px] block h-0.5 w-6 rounded transition-all duration-300 ${
              open ? "scale-x-0 opacity-0" : "opacity-100"
            } ${scrolled ? "bg-gray-700" : "bg-white"}`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-6 rounded transition-all duration-300 ${
              open ? "top-[11px] -rotate-45" : "top-[19px]"
            } ${scrolled ? "bg-gray-700" : "bg-white"}`}
          />
        </button>
      </div>

      {/* Mobile nav */}
      <nav
        className={`overflow-hidden bg-white transition-all duration-300 ease-in-out lg:hidden ${
          open ? "max-h-[400px] border-t border-gray-100 opacity-100 shadow-xl" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 pb-5 pt-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg py-2.5 text-sm font-medium uppercase text-gray-700 transition hover:bg-gray-50 hover:text-[#D71920]"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3 flex items-center gap-3">
            <a
              href={`/${otherLocale}`}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600"
            >
              <img src={`/images/flags/${otherLocale}.svg`} alt={localeLabel} className="h-3.5 w-5 rounded-sm object-cover" />
              {localeLabel}
            </a>
            <a
              href={`${home}#contact`}
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg bg-[#D71920] py-2.5 text-center text-sm font-semibold text-white"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
