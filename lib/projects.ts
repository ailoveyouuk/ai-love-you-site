export type Project = {
  slug: string;
  name: string;
  client: string;
  summary: string;
  category: string;
  stack: string[];
  href: string;
  /** Representative real image for card thumbnails, and the poster shown
   * before `video` loads/plays. Omit to fall back to PlaceholderShot. */
  image?: string;
  /** Screen recording used in place of the still image where the
   * homepage carousel wants motion. Falls back to `image` when absent
   * (Renewables Connect has screenshots only, no recording yet). */
  video?: string;
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
    video: "/video/apki/homepage-to-product.mp4",
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
    video: "/video/yardley-hastings-garage/homepage.mp4",
  },
  {
    slug: "renewables-connect",
    name: "Renewables Connect",
    client: "Renewables Connect",
    summary:
      "A four-app learning platform rebuild — learner, institution, employer and admin — replacing a SharePoint-based system with a working dashboard, module viewer and assessment engine on Azure.",
    category: "Platform",
    stack: ["Next.js", "TypeScript", "Chart.js", "Azure"],
    href: "/work/renewables-connect",
    image: "/images/renewables-connect/dashboard.jpg",
    // No screen recording for this one yet — static screenshots only.
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
    video: "/video/journal/homepage.mp4",
  },
];
