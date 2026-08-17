export type Project = {
  slug: string;
  name: string;
  client: string;
  summary: string;
  category: string;
  stack: string[];
  href: string;
  /** Representative real image for card thumbnails. Omit to fall back to
   * PlaceholderShot (used only for Renewables Connect, which isn't live
   * yet — every other project has a real screenshot or video still). */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "apki-technologies",
    name: "APKI Technologies",
    client: "APKI Technologies",
    summary:
      "A Next.js site for a UK-made ruggedised portable power unit, repositioning a proven DNO / home-medical product for humanitarian aid and field deployment.",
    category: "Website",
    stack: ["Next.js", "Tailwind CSS"],
    href: "/work/apki-technologies",
    image: "/images/apki/homepage-hero.jpg",
  },
  {
    slug: "yardley-hastings-garage",
    name: "Yardley Hastings Garage",
    client: "Yardley Hastings Garage",
    summary:
      "A Next.js + Supabase site for an independent garage, with a managed stocklist and customer reviews behind the marketing front end.",
    category: "Website + Platform",
    stack: ["Next.js", "Supabase", "Netlify"],
    href: "/work/yardley-hastings-garage",
    image: "/video/stills/yhg/homepage.jpg",
  },
  {
    slug: "renewables-connect",
    name: "Renewables Connect",
    client: "Renewables Connect",
    summary:
      "Architecture and build plan for a ground-up rebuild of a SharePoint-based learning platform into a structured, CMS-driven platform on Azure.",
    category: "Platform",
    stack: ["Next.js", "Sanity CMS", "Azure"],
    href: "/work/renewables-connect",
    // No image — platform isn't live/demonstrable yet, so this
    // deliberately falls back to the placeholder rather than implying
    // a screenshot of something that doesn't exist.
  },
  {
    slug: "ai-love-you-journal",
    name: "AI Love You Journal",
    client: "AI Love You (self)",
    summary:
      "A self-published editorial platform under the AI Love You name — searchable, filterable editions and a custom reading experience, designed and built end to end.",
    category: "Editorial Platform",
    stack: ["HTML", "CSS", "JavaScript"],
    href: "/work/ai-love-you-journal",
    image: "/video/stills/journal/homepage.jpg",
  },
];
