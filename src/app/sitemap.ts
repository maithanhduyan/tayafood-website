import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://tayafood.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["vi", "en"];
  const pages = ["", "/privacy-policy", "/terms-of-use"];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1 : 0.3,
    }))
  );
}
