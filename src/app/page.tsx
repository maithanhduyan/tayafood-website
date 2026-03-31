"use client";

import { useEffect } from "react";
import { locales, defaultLocale } from "@/i18n/config";

export default function RootPage() {
  useEffect(() => {
    const lang = navigator.language || "";
    const locale = locales.find((l) => lang.toLowerCase().startsWith(l)) || defaultLocale;
    window.location.replace(`/${locale}/`);
  }, []);

  return null;
}
