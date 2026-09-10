# Resume site

A single-page, bilingual (EN / UA), animated resume. Static output, so hosting
is free.

**Stack:** Astro 7 · Tailwind 4 · Motion · Lenis · TypeScript · React (configured, unused by default)

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check + static build -> dist/
npm run preview    # serve dist/ locally
npm run format     # prettier
```

---

## Start here: the four files you actually edit

| File                    | What lives there                                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `src/data/profile.ts`   | **All resume content** - name, about, skills, experience, education, projects. Both languages. Search for `TODO`. |
| `src/consts.ts`         | Email, GitHub, LinkedIn, Telegram, CV paths, site URL. Set a link to `null` to hide it everywhere.                |
| `src/i18n/ui.ts`        | UI labels - nav, buttons, section titles. Every key must exist in both locales (TypeScript enforces it).          |
| `src/styles/global.css` | Design tokens at the top: both palettes, fonts, fluid type scale, easing.                                         |

Then add the files listed in [`docs/public-assets.md`](docs/public-assets.md)
(OG image, touch icon).

---

## Architecture

```
src/
├─ consts.ts              links, locales, section ids (single source of truth)
├─ data/profile.ts        typed resume content, per locale
├─ i18n/
│  ├─ ui.ts               UI strings; `satisfies` forces locale parity
│  └─ utils.ts            getLocaleFromUrl, useTranslations, localizePath
├─ layouts/
│  ├─ Base.astro          <head>, SEO, hreflang, JSON-LD, backdrop, nav
│  └─ ResumePage.astro    section order - rendered by both locale pages
├─ components/
│  ├─ Nav / Hero / About / Skills / Experience / Projects / Contact
│  ├─ Section.astro       section shell (index + title + hairline)
│  ├─ MagneticLink.astro  cursor-following button (no JS framework)
│  ├─ Backdrop.astro      parallax blobs + grid
│  ├─ Icon.astro          inline SVG set
│  └─ react/              example React island (see below)
├─ scripts/fx.ts          all page motion, loaded once
├─ styles/global.css      tokens + base + components + reveal
└─ pages/
   ├─ index.astro         EN, served at /
   ├─ uk/index.astro      UA, served at /uk/
   └─ 404.astro
```

### Adding a section

1. Add the id to `SECTIONS` in `src/consts.ts` - the nav picks it up automatically.
2. Add `nav.<id>`, `section.<id>.index`, `section.<id>.title` to **both** locales
   in `src/i18n/ui.ts`. Missing a key is a type error, not a runtime surprise.
3. Create the component, then render it inside a `<Section>` in
   `src/layouts/ResumePage.astro`.

### Adding a language

1. Add the code to `LOCALES` + `LOCALE_LABELS` in `src/consts.ts` and to
   `i18n.locales` in `astro.config.mjs`.
2. Add the block to `ui` in `src/i18n/ui.ts` and a profile to
   `profiles` in `src/data/profile.ts`. TypeScript will list what is missing.
3. Create `src/pages/<code>/index.astro` rendering `<ResumePage />`.

---

## Design direction

Two themes off one set of tokens. Light is the default, blue-led; dark is
mint-green on near-black, opt-in via the header toggle.

Token names are **semantic, never literal** - `accent`, not `azure`. Both
themes share the names and only the values change, so no component knows
which theme is active. Three decisions carry the look:

1. **One accent does all the work.** It is the button, the section counters,
   the link hovers, the focus ring and the highlighter band - `#1F5AF0` blue
   in light, `#4ADE80` mint in dark. `--color-accent-soft` is its pale form
   for tints and bands, and `--color-on-accent` is the text that sits on top
   of it, which is why a bright mint button gets dark text rather than white.
   Text is never pure black or pure white: `#101C31` navy on light, `#E8E8EC`
   on dark.
2. **Depth from shadows in light, from borders in dark.** Cards sit on a
   slightly tinted page behind a hairline border plus a tinted shadow
   (`--shadow-card`). A neutral grey shadow on a cool background reads dirty,
   so it is tinted; on the dark theme shadows barely register at all, so that
   token drops to almost nothing and the border carries the separation.
3. **No stock effects.** No gradient text, no glassmorphism, no giant blurred
   blob as the whole background. Instead: a faint dot field, two restrained
   washes, a highlighter band behind key words (`.marker`, with
   `.marker-highlight` when one word needs to shout), accent counter pills,
   and cards that rotate a fraction of a degree as they lift.

Every pair clears WCAG AA in **both** themes. In light, `faint` and
`success` are deliberately darker than they look like they should be for
exactly that reason. Check before changing a value:

```
                        light      dark
ink       on canvas    16.03:1   16.19:1
muted     on canvas     6.58:1    7.73:1
faint     on canvas     4.86:1    5.87:1
accent    on canvas     5.23:1   11.36:1
accent    on soft       4.51:1    8.80:1
on-accent on accent     5.23:1   10.93:1
success   on canvas     4.87:1   11.36:1
```

Everything is tokenised at the top of `src/styles/global.css` under
`@theme` - colours, shadows, the three font stacks, the fluid type scale and
the easing curves. Change a token there and the whole site follows.

### The theme toggle

Light is the default; dark persists in `localStorage` under `theme`. The
inline script in `Base.astro` stamps `data-theme` on `<html>` **before first
paint** - it is deliberately `is:inline` rather than bundled, because a
deferred module would run after the first frame and flash the wrong theme.
`setupThemeToggle()` in `src/scripts/fx.ts` handles the click, persistence and
keeping `<meta name="theme-color">` in step with the page.

To follow the visitor's OS setting instead of defaulting to light, change the
`stored === 'dark'` fallback in that inline script to read
`matchMedia('(prefers-color-scheme: dark)')`.

The two backdrop washes and the dot field read `--dot` / `--wash-a` /
`--wash-b`, so the background follows the theme as well.

### The wordmark

The header says **handshake** - the TCP/TLS handshake and the human gesture
at once, which is what a resume site is for. It lives in `SITE.wordmark`
(`src/consts.ts`); swap it for your surname, a handle or your domain any
time. The squiggle underneath it draws itself on hover, and the favicon is
the same squiggle so the browser tab matches the page.

### Fonts

Headings are **Unbounded** (wide, geometric), body is **Onest** (round,
open), labels are **JetBrains Mono**. All three cover Cyrillic, which the
`/uk/` page needs - most distinctive display fonts do not, so check that
before swapping one in.

---

## How the animations work

Deliberately layered so almost nothing runs per frame:

| Effect                         | Mechanism                                                       | Cost      |
| ------------------------------ | --------------------------------------------------------------- | --------- |
| Hero letter-by-letter entrance | Text split at **build** time, per-char CSS `animation-delay`    | 0 JS      |
| Scroll reveal + stagger        | `IntersectionObserver` toggles a class; CSS does the transition | ~1 KB     |
| Reading progress bar           | Motion `scroll(animate(...))` - bound to the scroll timeline    | shared    |
| Backdrop parallax              | Same, via `[data-parallax]`                                     | shared    |
| Magnetic buttons               | `pointermove` writes `--tx/--ty`; CSS transition eases          | ~15 lines |
| Card border glow               | `pointermove` writes `--mx/--my`; CSS radial gradient           | ~10 lines |
| Smooth scroll                  | Lenis                                                           | ~4 KB     |

**Total shipped to the visitor: ~30 KB gzipped JS + ~10 KB gzipped CSS**, and
the HTML renders fully without any of it.

`prefers-reduced-motion: reduce` disables all of it - Lenis is never
constructed, reveals show instantly, keyframes are cancelled in CSS.
Content is also visible with JS disabled entirely (the `.no-js` guard in
`global.css`).

### React

`@astrojs/react` is configured, but **no island renders by default**, so no
page loads React. Check for yourself after a build:

```bash
grep -c "client\." dist/index.html   # -> 0
```

> `dist/_astro/client.*.js` (~216 KB) is emitted by the integration itself and
> is never referenced by any page, so it is never downloaded. It appears the
> moment the integration is enabled, island or no island.

`src/components/MagneticLink.astro` is the button actually used on the page -
the magnetic effect is two CSS custom properties, which does not justify a
framework. `src/components/react/MagneticButton.tsx` is the same effect built
as a real island, kept as a working template for when you add something that
genuinely needs component state: a filterable project grid, a validated
contact form, a live demo of your own API.

```astro
import MagneticButton from '~/components/react/MagneticButton';
<MagneticButton client:visible href="..." label="..." />
```

Hydrate with `client:visible` (defers until scrolled into view) unless the
island is above the fold, where `client:load` is right. If you decide you want
no React at all, drop `react()` from `astro.config.mjs` and delete
`src/components/react/`.

---

## Deploy to Cloudflare Pages (free)

Free tier: unlimited requests, unlimited bandwidth, 500 builds/month,
custom domain + SSL included.

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → pick the repo.
3. Build settings:

   | Field                  | Value                             |
   | ---------------------- | --------------------------------- |
   | Framework preset       | Astro                             |
   | Build command          | `npm run build`                   |
   | Build output directory | `dist`                            |
   | Node version           | add env var `NODE_VERSION` = `22` |

4. Deploy. Every push to `main` redeploys; every PR gets a preview URL.
5. Update the domain in **three** places once you know it:
   `astro.config.mjs` (`site`), `src/consts.ts` (`SITE.url`),
   `public/robots.txt` (`Sitemap:`).

`public/_headers` is read by Cloudflare at deploy time and sets the security
headers, a CSP, and immutable caching for fingerprinted assets.

### Alternative: direct upload

No GitHub account needed:

```bash
npm run build
npx wrangler pages deploy dist --project-name=resume
```

### Custom domain

A `.dev`/`.com` domain is ~$10-12/year (Cloudflare Registrar sells at cost).
Point it at the Pages project in **Custom domains** - SSL is automatic.
Total running cost: the domain, or $0 on the `*.pages.dev` subdomain.

---

## CI

`.github/workflows/ci.yml` runs `astro check`, `prettier --check` and
`astro build` on every push and PR. It does **not** deploy - Cloudflare does
that from the repo. Cheap insurance against pushing a broken build, and it
puts a green CI badge on a repo recruiters will open.

---

## Checklist before sharing the link

- [ ] Replace every `TODO` in `src/data/profile.ts` and `src/consts.ts`
- [ ] Add `og.png` (1200x630) so shared links show a preview card
- [ ] Set the real domain in the three places listed above
- [ ] Run Lighthouse on the deployed URL (target: 100 / 100 / 100 / 100)
- [ ] Check it at 375px wide
- [ ] Test with `prefers-reduced-motion` forced on (DevTools → Rendering)
- [ ] Tab through the page - focus ring visible, skip link works
