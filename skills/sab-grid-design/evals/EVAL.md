# sab-grid-design — evaluation cases

Fixtures live in `evals/files/` and are staged to `/workspace/input/`. The
agent is text-only, so every case is judged from source and the reply; no
screenshots are required.

- `pricing-page.html` — a 940 px fixed page with three plan cards (300 px,
  300 px, 296 px), a 620 + 280 content row with a 20 px gap, four 220 px stat
  boxes, and five 20%-wide badges inside a 280 px sidebar. The 900 px hero is
  a distractor: at 940 px minus 20 px margins it is on-grid and should not be
  flagged.
- `dashboard-fixed/` — `index.html` + `styles.css` for a 1200 px fixed
  dashboard: 300 px sidebar, 880 px main column, three 280 px metric cards.
- `bootstrap-settings/` — `index.html` + `grid.css` (a Bootstrap 5 grid
  subset) for an app that already uses Bootstrap breakpoints.
- `theme.css` — a primary button with white text on `#f0a000`, below WCAG AA.

## Questions

1. Can the agent review a fixed-width page on a 12-column grid and name the
   measured off-grid blocks, rather than giving generic alignment advice?
2. Can it convert a fixed-width dashboard to a responsive 12-column layout
   using spans at a small number of breakpoints, without building separate
   pages?
3. Does it detect an existing Bootstrap grid and keep that grid instead of
   imposing the four design canvases?
4. Does it stay out of color-only work and avoid giving grid advice?

## Behaviors

- Every visible row totals 12 columns; blocks start and end on column lines.
- Adaptation happens through column spans at breakpoints, not per-width pages.
- The four canvases (750 / 720 / 940 / 1140) are a fallback, not a replacement
  for a project grid that already exists.
- A review names measured widths from the file and proposes whole-column spans
  with one shared gutter/margin.
- Layout width only; color and contrast are out of scope.

## Negative Cases

- `negative-contrast` asks for a WCAG AA color fix on a button. The skill
  should not load, and the reply should not contain grid, breakpoint, or
  column-span advice.

## Notes

The cases deliberately avoid screenshots and browser automation so the
evaluation measures grid reasoning from source. Review cases allow the agent
to say which visual checks are unverified, matching the skill's own rule.
