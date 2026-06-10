# Design System — "Industrial Requisition" (Rev B, post-panel)

The IT supply catalog as an object of precision: an ink-on-white trade
manifest with a safety-orange action color. Scene: a procurement manager at
11:40, three supplier tabs open; ours looks like the supplier that ships
pallets on time. Rev B folds in the adversarial panel's blockers (buyer
trust 4/10, slop 4/10, typography 4/10 on Rev A).

## Color

| Token | Value | Role |
|---|---|---|
| `--paper` | `#ffffff` | base surface |
| `--ink` | `#16181d` | text, structural rules |
| `--coal` | `#101216` | hero + footer ONLY (CTA band stays on paper) |
| `--accent` | `#e04e10` | marks, rules, large graphics only (≥3:1 uses) |
| `--accent-text` | `#b53e0a` | text-bearing orange: button fills, links (5.7:1 w/ white) |
| `--accent-deep` | `#93340a` | pressed/hover on accent-text |
| `--muted` | `#555a64` | secondary text on paper/panel (≥4.5:1) |
| `--coal-muted` | `#aab0bb` | secondary text on coal (≥4.5:1) |
| `--panel` | `#f4f5f6` | alternate band (chroma-0 cool) |
| `--hairline` | `#e3e4e8` / `--hairline-2 #c9ccd2` | grid rules |
| `--ok` / `--danger` | `#1b7a4e` / `#b42318` | form feedback (functional, exempt from two-hue rule) |

Focus: 2px solid ink ring on light surfaces, 2px white on coal. Never orange
(reserved for actions, not states).

## Typography — language-scoped stacks (panel blocker #1)

- `html[data-lang="ka"]`: headings AND body = Noto Sans Georgian first.
  Display tier (h1/h2) uses `text-transform: uppercase`, which browsers map
  to **Mtavruli** capitals — the ownable Georgian display voice. Card titles
  (h3) stay Mkhedruli for legibility.
- `html[data-lang="en"]`: headings = Archivo first, `font-stretch: 115%`,
  weight 800, uppercase display tier. Body = Archivo.
- **IBM Plex Mono is Latin/digit-only by policy**: phone numbers, route
  paths, numeric annotations ("/ 06"), lang switch, 404 code, brand names'
  meta rows. Never a Georgian string. Annotations are numerals + slashes
  only — no invented words in either language.
- Mixed-script ka headings render uniformly in Noto (its Latin included);
  no font-stretch inside mixed lines.
- ka display sizes run one step smaller with taller leading (long caseless
  words): hero ka `clamp(1.7rem, 4.2vw, 3.1rem)` lh 1.14; en
  `clamp(2.1rem, 4.6vw, 3.7rem)` lh 1.05.

## Signatures (what makes it ours)

1. **Mtavruli display tier** in Georgian — no AI generator defaults to it.
2. **Registration marks**: print-production corner ticks on the hero media
   frame, manifest panel, and form panel.
3. **Title-block section heads**: h2 + numeral-only mono annotation seated
   on a 2px ink rule (vendors section exempt — "02" undersells; no count).
4. **Route stamps**: subpage headers carry their real URL path in mono.

## Commerce rules (buyer blockers)

- Photos: full color on touch (`hover: none`) and ≥70% saturation at rest
  on desktop; hover restores 100%. Merchandise must stay recognizable.
- No requisition/SKU codes on cards — the business is quote-only; mono
  implies apparatus that exists. Numerals only where data is real.
- Conversion at every depth: header phone (mono) + quote button; sticky
  bottom quote bar on ≤640px (quote + tel); form fully specced in-system.
- Coal confined to hero + footer; CTA band = paper with heavy ink rules.
- Computers category photo = open-plan office workstations (B2B), not a
  consumer/gamer desk.
- hero.eyebrow (client copy) renders as the hero intro line with an orange
  tick — content is never orphaned.

## Layout & components

Max width 1280; radius 0 (2px inputs). Cards: 1px `--hairline-2` border,
photo top, h3 + mono arrow row; hover = 2px accent top-rule sweep + full
color. Buttons: rectangles, verb+object labels; primary = `--accent-text`
bg/white; on coal = white bg/ink; secondary = 1px ink outline. Hairline
vertical column rules on coal bands. Services = ruled rows, not card grid.
Process = real 3-step sequence with mono numerals + connector. Sticky stack:
coal topbar (40px) + paper header, both sticky.

## Motion

Reveal: 14px rise + fade 480ms ease-out-quint behind `.js-reveal` (no-JS
sees everything). Hover sweeps 200ms. Reduced-motion collapses all.

## Bans honored

No eyebrow kickers, gradient text, glass, side-stripes, hero metrics,
identical icon-card grids, cream backgrounds, decorative numbers.
