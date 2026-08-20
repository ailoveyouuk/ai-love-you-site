# Design language — Akaru-inspired direction (pilot)

Reference: [akaru.fr](https://www.akaru.fr) — Lyon-based Awwwards/FWA-winning
digital agency. This document captures the system trialled on the homepage
(`app/page.tsx`) and the APKI Technologies case study
(`app/work/apki-technologies/page.tsx`) so it can be rolled out to the rest
of the site consistently once approved.

## What we took from Akaru

- **Numbered-index structure instead of decoration.** Every section and
  every project carries a two-digit number (`01`, `02`...) as the primary
  organising device — it replaces cards, icons, and borders as the thing
  that gives the page rhythm.
- **Near-monochrome palette, one accent used sparingly.** Warm off-white
  background, near-black ink, a single muted grey, and the studio accent
  (vermilion) used only on small labels and links — never as a fill,
  never decorative.
- **Oversized mixed-case display type vs. tiny tracked-out labels.** The
  opposite of the old uppercase-everything treatment: headlines are huge,
  normal case, tight leading and negative tracking; metadata (category,
  captions, nav) stays small, uppercase, letter-spaced, monospace.
- **Imagery-first case studies.** Full-bleed screenshots/video carry the
  page; body copy is reduced to short captions underneath, not paragraphs
  wrapped around the image.
- **The "sliding door" reveal.** Two panels meeting at the centre line
  that part toward the outer edges — used for scroll-entrance and for
  swapping between projects in the homepage showcase, in place of a
  crossfade.
- **Underlined text links instead of pill buttons**, for primary and
  secondary actions alike — a `→` and a 1px rule, nothing more.

## New tokens (scoped under `.akaru-theme` for now)

Defined in `app/globals.css`:

| Token | Value | Use |
|---|---|---|
| `--ak-bg` | `#f6f5f2` | Page background (warm paper, not stark white) |
| `--ak-ink` | `#111110` | Primary text |
| `--ak-muted` | `#8c8880` | Secondary text |
| `--ak-line` / `--ak-line-strong` | `rgba(17,17,16,.12/.22)` | Hairline rules |
| `--ak-accent` | `#e34234` | Labels/links only — same studio vermilion, used far more sparingly than before |

Utility classes: `.ak-label` (tiny tracked caps), `.ak-index` (numbered
tag), `.ak-headline` / `.ak-heading` (display type), `.ak-btn` (underline
link-as-button), `.ak-rule` (hairline divider), `.ak-door-frame` /
`.ak-door-panel` (sliding-door mechanics).

## Components

- **`SlidingDoorReveal`** (`components/SlidingDoorReveal.tsx`) — wraps any
  image/video. Opens once on scroll-into-view (`revealOnView`, default
  on); optionally closes and reopens when an `openKey` prop changes (used
  to transition between projects rather than crossfading).
- **`AkaruShowcase`** (`components/AkaruShowcase.tsx`) — the homepage
  numbered-project showcase: sticky visual panel + door reveal on desktop,
  same scroll-tracking approach as the previous `ScrollShowcase` but
  restyled and using doors instead of opacity crossfade.

## Update — homepage is now a full-viewport paged experience

The homepage no longer scrolls vertically on desktop. It's a fixed,
full-height/width stage between the header and a slim persistent footer,
holding seven sections (Intro, Work, Capabilities, Development,
Management, Design, Contact) navigated by:

- a side index nav (top-right, click any label to jump),
- the keyboard (arrow keys),
- or the mouse wheel / trackpad (any scroll gesture pages to the next/prev
  section, with a cooldown so one gesture = one page).

Every transition — regardless of direction — is a single large door
(`.ak-paged-door`) that wipes in from the right, covers the screen, swaps
the panel content while fully covered, then continues off-screen to the
left. This replaced the earlier vertical scroll-linked `AkaruShowcase` /
`ScrollShowcase` approach on the homepage specifically (those components
are still in the codebase but currently unused — remove once this
direction is confirmed).

Mobile/tablet (below the `lg` breakpoint) gets none of this: it's a plain
stacked, normally-scrolling page with the same seven sections in order,
via `PagedHome`'s `MobilePanels` fallback.

Key files: `components/PagedHome.tsx` (the engine + all seven panels),
`components/HomeFooter.tsx` (the slim fixed footer, homepage-only),
`components/ConditionalFooter.tsx` (swaps the standard `Footer` out on
`/`), and the `.ak-paged-*` rules in `app/globals.css`.

A faint, slowly-drifting AI Love You script-mark watermark (`.ak-logo-watermark`)
sits behind the content on every panel, desktop and mobile, and a bouncing
"Scroll or swipe ↓" hint appears under the intro panel's CTAs to signal the
paging gesture. The side arrow buttons point up/down (not left/right) to
match the vertical wheel/swipe gesture that actually drives navigation.

Responsive: confirmed working at 375px (mobile stacked flow), 768px
(tablet, same stacked flow), 1024px (the `lg` boundary where the paged
desktop experience switches on), and 1280px+. The Work panel's project
grid is `sm:grid-cols-2 xl:grid-cols-4` rather than `lg:grid-cols-4` —
at exactly 1024px a 4-up grid collided with the fixed side-nav gutter, so
it stays at 2 columns through the 1024–1279px range and only goes to 4
from 1280px, where there's room.

## What's still pixel-art (not yet migrated)

Everything outside the homepage and the APKI case study: `/work` grid,
the other three case studies, `/about`, `/website-development`,
`/platform-development`, `/ai-integration`, `/contact`, `/privacy`,
`/legal`, and the global `Nav`/`Footer` chrome. These still use the
original studio system (`PixelReveal`, `PixelRevealGroup`,
`PixelRevealProjectCard`, `PixelGridHero`, uppercase headings, pill
buttons). Expect a visible seam between pixel-themed pages/chrome and the
two Akaru-themed pages until the rest of the site is migrated.

## Open decisions for full rollout

- **Nav & Footer**: currently untouched (still small-mono-uppercase links
  + red pill CTA). Worth a light restyle to underline links so they don't
  clash with the new page content once this becomes the default.
- **Display typeface**: still the system Helvetica Neue stack. The
  original brand notes call for Inter Tight via `next/font/google`, but
  this sandbox has no build-time network access to Google Fonts to verify
  it — it should fetch fine at build time on a machine with normal
  internet access (e.g. Vercel), since the `--font-display` variable is
  already wired to pick it up. Worth testing once deployed.
- **Case study template**: APKI's new layout was hand-built rather than
  going through the shared `CaseStudyLayout` component (which still uses
  old tokens). If this direction is approved, `CaseStudyLayout` should be
  rebuilt on the new tokens so all four case studies share one component
  again instead of diverging.
