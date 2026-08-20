# AI Love You — studio portfolio site

Portfolio/showcase site for AI Love You, the studio Lewis McKinnon builds
under as a freelance web and platform developer. Built with Next.js (App
Router), TypeScript and Tailwind CSS v4.

## Running it

```
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` produces a production
build; `npm run lint` runs ESLint. Both currently pass clean.

## Contact form

The enquiry form on `/contact` submits via [Netlify
Forms](https://docs.netlify.com/forms/setup/) — no third-party email
service, API key, or environment variable needed. `public/__forms.html`
is a hidden static replica of the form that exists purely so Netlify's
build-time form detection registers it; `components/ContactForm.tsx`
submits the real form to that same registered name via `fetch`.

To receive enquiries by email, turn on notifications once in the Netlify
dashboard: **Site settings → Forms → Form notifications → Add
notification → Email notification** → `lewis@ailoveyou.uk`. Submissions
also show up under **Forms** in the dashboard regardless of whether email
notifications are configured, so nothing is silently dropped.

This only works once the site is deployed on Netlify — Netlify's form
detection has nothing to register against in local dev (`npm run dev`),
so submissions there will fail silently. Test on the deployed site.

## Pages

- `/` — Home: interactive pixel-grid hero, selected work, tech stack, CTA
- `/work` — all four case studies + a pointer to the live Journal
- `/work/apki-technologies`, `/work/yardley-hastings-garage`,
  `/work/renewables-connect`, `/work/ai-love-you-journal` — case studies
- `/website-development`, `/platform-development`, `/ai-integration` —
  service/capability pages
- `/about`, `/contact` — studio info, working enquiry form
- `/privacy`, `/legal` — privacy policy and terms/trading disclosure

## Known gaps

- **Renewables Connect** — the platform isn't live yet, so this case study
  still uses placeholder screenshot blocks and explicitly flags its
  outcome figures as pending (see the HTML comments in
  `app/work/renewables-connect/page.tsx`). Replace once it ships.
- **Legal pages** — `/privacy` and `/legal` are drafted to a reasonable UK
  sole-trader standard but haven't been reviewed by a solicitor. Worth a
  professional check before relying on them, especially if the business
  takes on VAT registration, employees, or consumer (as opposed to
  business) clients.
- **Cookie banner** — `components/CookieConsent.tsx` is essential-only by
  default; no analytics are wired up on the site yet, so "Accept all"
  doesn't currently enable anything. Update the banner copy and
  `/privacy#cookies` together if analytics are added later.
- **SEO** — only the homepage has a custom meta description; inner pages
  inherit it rather than having their own. No `sitemap.xml`/`robots.txt`
  yet. The favicon is still the Next.js default.
- **Video source files** — `public/video/` still contains the original
  uncompressed screen recordings for YHG and the Journal (the `.mov`
  files directly inside `yhg/` and `ai_love_you_journal/`, plus three
  stray `*-web.mov` files at the top level and a leftover
  `yhg/yhg_web/` folder). None of these are referenced by any page — the
  site uses the compressed versions in `public/video/apki/`,
  `public/video/yardley-hastings-garage/` and `public/video/journal/` —
  but they add ~350MB of dead weight to the project folder and would get
  deployed along with everything else in `/public` if left in place.
  Worth deleting manually via Finder (the build sandbox this was built in
  can't delete from the synced project folder, only add to it).
- **Deployment** — the site isn't hosted anywhere yet; still local-dev
  only. Vercel is the path of least resistance for a Next.js site.

## Design system

Studio palette, pulled from the AI Love You Journal reference build:
background `#fcfcfd`, ink `#0e0e10`, ink-gray `#7f8489`, border
`rgba(14,14,16,0.1)`, accent "Studio Vermilion" `#e34234`, plus a small set
of accent "pops" (amber, teal, indigo, pink) used sparingly in the pixel
animations. See `app/globals.css` for tokens and utility classes
(`.btn`/`.btn-solid`, `.eyebrow`, `.visual-caption`, `.pixel-hero*`,
`.pixel-dots`).

**Pixel-art language**: the homepage hero (`components/PixelGridHero.tsx`)
is an interactive generative canvas — cells drift on a slow wave cycle and
brighten smoothly under the cursor. Card grids across the site
(`components/PixelReveal.tsx`, `PixelRevealProjectCard.tsx`, both
orchestrated by `PixelRevealGroup.tsx`) draw themselves in one at a time:
an SVG outline traces itself, then the number/image, then the text,
cascading through the grid rather than all firing at once. All of it
respects `prefers-reduced-motion`.

Typography: body/headings use the system `Helvetica Neue` stack (the
brand reference calls for Inter Tight via Google Fonts, but this build
environment blocks outbound font-fetching at build time — see the
commented pointer in `app/layout.tsx` to wire it in once building
somewhere with normal internet access). Small uppercase labels (nav,
eyebrows, captions) use a system monospace stack as a restrained nod to
the pixel-art language, defined as `--font-pixel` in `globals.css`.

`components/Cursor.tsx` (a custom circular cursor) exists but is not
currently imported anywhere — dead code, left in case it's wanted again,
otherwise safe to delete.
