import type { MetadataRoute } from "next";

const SITE_URL = "https://www.ailoveyou.uk";

// Every real page on the site. Kept as a flat, hand-written list rather
// than generated from the filesystem — small enough site that it's not
// worth the extra machinery, and it makes it obvious when a new page
// needs adding here too.
const routes = [
  "",
  "/website-development",
  "/platform-development",
  "/microsoft-365",
  "/learning-platforms",
  "/ai-integration",
  "/work",
  "/work/apki-technologies",
  "/work/yardley-hastings-garage",
  "/work/renewables-connect",
  "/work/ai-love-you-journal",
  "/about",
  "/contact",
  "/privacy",
  "/legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/work") ? 0.8 : 0.6,
  }));
}
