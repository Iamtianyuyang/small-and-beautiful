---
name: sab-grid-design
description: "Use when laying out or reviewing a web page on a responsive 12-column grid: breakpoints, column spans, retina canvases, and off-grid content."
version: 1.0.0
metadata:
  author: "tianyy"
  tags: [grid, layout, responsive, design]
---

# SAB Grid Design: responsive 12-column layout

## Purpose

Give a page one geometric skeleton: a **12-column grid** that holds at every screen size. Content occupies whole columns, each row adds up to exactly 12, and layouts adapt by changing spans instead of inventing new widths. Follow **small-and-beautiful**: one grid, few breakpoints, no per-component measurements.

The rules come from the grid-design convention: 12 columns, four device canvases (750 / 720 / 940 / 1140 px), and a 2× canvas for retina phones.

## When to use

- Laying out a new page or screen, or converting a fixed-width design into a responsive layout.
- Deciding breakpoints, container widths, column spans, gutters, or margins.
- A layout "feels off" and you suspect column alignment, widths, or breakpoints (not type, color, or spacing rhythm).
- Specifying a design so an implementer can reproduce it at every size.

Typical requests: "lay out this settings page on our 12-column grid", "the pricing row doesn't line up at 940 px", "make this page responsive without adding breakpoints", "check this screenshot for off-grid blocks".

**Not for:** brand identity, typography scale, color systems, motion, or component styling that does not affect layout width. For overall UI polish use `sab-ui-craft`.

**First check the project.** If it already uses a grid (Bootstrap, Tailwind, Ant Design, a design system, or its own tokens), use that grid and its breakpoints. This skill's numbers are the fallback when none exist; never run two grids in parallel.

## Prerequisites

- The page's content and its priority order: what must stay visible first on a narrow screen.
- The widths to support, or the project's existing breakpoints.
- For reviews: a screenshot or running page at each target width, or the source and a way to resize it.
- For retina work: which assets are raster images or icons, and their intended display size.

## Non-negotiable rules

1. **12 columns, exactly.** Every row of top-level content spans 12 columns: `12`, `6+6`, `4+4+4`, `3+3+3+3`. Never 13, never a row that stops at 10 because the remainder was rounded away.
2. **Content stays inside the grid.** A block starts and ends on a column line. No "almost aligned" widths, no fixed pixel widths that ignore the grid.
3. **One grid per page.** Nested grids restart the 12-column count inside their parent cell; they do not extend the outer grid.
4. **Adapt with spans, not with new layouts.** At each breakpoint change how many columns a block occupies. Do not build a separate page for each width.
5. **Design the phone at 2×.** A 375 CSS px phone is designed on a 750 px canvas so retina screens stay sharp; assets export at 2× and display at half size. This is why the phone canvas (750) is wider than the tablet canvas (720).
6. **Use the fewest breakpoints that work.** Four device classes are enough; add a breakpoint only for content that genuinely breaks.

## Instructions

### 1. Pick the canvas widths

Use the project's widths if they exist. Otherwise use the grid-design convention:

| Device | Design canvas | CSS width | Columns |
| --- | --- | --- | --- |
| Phone | 750 px (2×) | 375 px | 12 |
| Tablet | 720 px | 720 px | 12 |
| Desktop | 940 px | 940 px | 12 |
| Large desktop | 1140 px | 1140 px | 12 |

These are **design canvases**, matching the PSD templates. CSS media-query values may round to the nearest common breakpoint; state the mapping you use and keep it consistent.

If the project has no grid tokens, define these four once and reuse them everywhere (keep the project's names if it has them):

| Token | Meaning |
| --- | --- |
| `columns` | 12 |
| `gutter` | one gap value, used between every pair of columns |
| `page-margin` | one outer margin per device class |
| `container-max` | the canvas width at which the container stops growing |

Record the values you choose in the output.

### 2. Assign spans by content priority

For each content block, decide its span at each canvas width, widest first:

- **Primary content** keeps the largest span and the most columns.
- **Secondary content** (filters, metadata, related items) shrinks or stacks first.
- **Nothing disappears** at a breakpoint unless the user explicitly agreed to cut it.

A typical responsive set:

| Block | Phone (12) | Tablet (12) | Desktop (12) | Large (12) |
| --- | --- | --- | --- | --- |
| Page heading | 12 | 12 | 12 | 12 |
| Card list | 12 (1 per row) | 6 (2 per row) | 4 (3 per row) | 3 (4 per row) |
| Sidebar | 12 (stacks) | 12 (stacks) | 3 | 3 |
| Main column | 12 | 12 | 9 | 9 |

Check the arithmetic at every width: each visible row must sum to 12.

### 3. Lay out on the grid

- Place blocks by column line, not by eyeballed pixel offsets.
- Align text baselines and block edges to the same grid lines.
- Keep one reading column; do not split the primary content across unrelated columns.
- Full-bleed media is the only allowed exception: mark it as deliberate and keep the content inside it on the grid.
- Fix stray widths at the shared grid/container level, not with per-component overrides.

### 4. Design for retina

- Phone canvas 750 px → CSS 375 px; export raster assets at 2× and size them in CSS at 1×.
- Icons and logos: use SVG where possible; otherwise provide 2× assets.
- Check thin borders, hairlines, and 1 px dividers at 2×; a 1 CSS px line may need a 0.5 px fallback rather than a blurry scaled bitmap.
- Do not upscale a 1× screenshot and call it a retina design.

### 5. Verify at every width

For each target width, check:

- Every row sums to 12; no block starts or ends between column lines.
- No horizontal overflow, clipped text, or content sliding under a fixed header/sidebar.
- The primary action and primary content are visible without horizontal scrolling on the phone.
- Images keep their aspect ratio and are sharp at 2×.
- The layout still holds with long text, empty lists, and error messages.
- Browser zoom and narrow windows do not collapse the grid.

To check, open the page at each canvas width (DevTools device mode or Playwright) and compare computed block widths with the column math. With no browser, inspect the shared grid/container CSS and mark visual checks unverified. Do not claim "responsive" from source alone.

## Output format

**Implementation mode**

1. **Grid**: columns, canvas widths, gutter, margin, and the breakpoint mapping.
2. **Spans**: a table of blocks × breakpoints, with each row totalling 12.
3. **Changes**: files and the shared grid/container rules touched.
4. **Verification**: widths checked, overflow and retina results, and what remains unverified.

**Review mode**

1. **Overall judgment**: one sentence on where the layout leaves the grid.
2. **Off-grid findings**: 3–5 at most; each with location, measured evidence (width or span), and impact.
3. **Fixes**: the smallest change that returns the block to a whole column; prefer fixing the shared grid over patching each component.
4. **Unverified**: widths or states you could not inspect.

## Examples

**Review finding**

> **Pricing cards (desktop, 940 px canvas)**: three cards are 300 px each with 20 px gaps, so the row spans 940 px but no card lands on a column line; the third card is 4 px narrower than the others. Fix: set all three cards to span 4 columns with the shared gutter, then re-check at 940 and 1140 px.

**Span change instead of a second layout**

> The dashboard uses 12/12 on the phone, 6/6 on the tablet, 8+4 on desktop, and 9+3 on large desktop. The sidebar is the same component at every width; only its span changes.

**From a request to a plan**

> "The dashboard is a fixed 1200 px page; make it responsive." → Keep 1140 px as `container-max`, with 940 desktop, 720 tablet, and 375 phone; main column 12/6/8/9 and sidebar 12/6/4/3, every row summing to 12; verify at all four widths and list what you could not inspect.

**Retina**

> The hero image is exported at 1600×900 and displayed at 800×450 CSS px. Its intrinsic size is 2×, so it stays sharp; the CSS sets `width: 100%` and the aspect ratio, not a pixel width.

## Limitations

- The four canvases are a design convention from one source (PSD templates), not a platform standard; a project with an existing grid keeps its own breakpoints.
- It judges layout width only. Type, color, component styling, and motion are out of scope; use `sab-ui-craft` for those.
- Canvas sizes are design sizes, not browser breakpoints; a direct 1:1 mapping is not guaranteed, so record the mapping actually used.
- Static source cannot show overflow, clipping, or retina blur. Without a rendered page or screenshots at each target width, say which checks are unverified.
- Behavior between the four widths is the project's choice (fluid or fixed at the previous canvas); state it rather than implying the grid exists only at those four sizes.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| A row totals 11 or 13 columns | Spans rounded or gutters counted as columns | Count spans only; let gutters live in the gap, not in the column count |
| Layout "almost" aligns | Fixed pixel widths mixed with grid widths | Move the block to whole-column spans; remove the fixed width |
| Phone design is blurry on retina | 1× canvas or 1× assets on a 2× screen | Design at 750 px for a 375 px phone; export assets at 2× |
| Too many breakpoints | Each component invented its own | Return to the four canvas widths; add one only for content that breaks |
| Sidebar squeezes the main column | Sidebar span did not shrink | Reduce its span or stack it at that breakpoint; keep the primary column first |
| Nested grid overflows | Nested columns were added to the outer 12 | Restart the count at 12 inside the parent cell |

## Source

Converted from [ColdXu/grid-design](https://github.com/ColdXu/grid-design) (12-column convention, 750/720/940/1140 canvases, retina 2× phone canvas). The original repo also ships PSD templates for these canvases.
