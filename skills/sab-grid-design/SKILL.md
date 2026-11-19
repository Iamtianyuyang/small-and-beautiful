---
name: sab-grid-design
description: "Use when laying out or reviewing a web page on a responsive 12-column grid: breakpoints, column spans, retina canvases, and off-grid content. Not for color, type, or contrast fixes."
version: 1.0.0
metadata:
  author: "tianyy"
  tags: [grid, layout, responsive, design]
---

# SAB Grid Design: responsive 12-column layout

## Purpose

Give a page one geometric skeleton: a **12-column grid** that holds at every screen size. Content occupies whole columns, each row adds up to exactly 12, and layouts adapt by changing spans, following **small-and-beautiful**: one grid, few breakpoints, no per-component pixel values.

What makes the work reliable is the **measured audit**: record rendered geometry, compare it with the column math, and report the delta; "looks aligned" is not evidence.

## When to use

- Laying out a new page, converting a fixed-width design, or choosing breakpoints, container widths, spans, gutters, or margins.
- A layout "feels off" and you suspect column alignment or widths (not type, color, or spacing rhythm).
- Reviewing a page or screenshot and needing evidence someone can re-check: measured positions, widths, and deltas.

Typical requests: "lay out this page on our 12-column grid", "one row doesn't line up at 940 px", "make this responsive without adding breakpoints".

**Not for:** brand identity, typography scale, color systems, motion, or component styling that does not affect layout width. For overall UI polish use `sab-ui-craft`.

**First check the project.** If it already uses a grid (Bootstrap, Tailwind, Ant Design, a design system, or its own tokens), use that grid and its breakpoints. This skill's numbers are the fallback when none exist; never run two grids in parallel.

## Prerequisites

- The page's content and priority order, and the widths or existing breakpoints to support.
- For reviews: a rendered page at each target width (DevTools device mode, Playwright, or screenshots with known viewport widths). Source alone can propose a layout, never verify one.
- For retina: which assets are raster, and their intended display size.

## Bundled templates and diagrams

- `assets/templates/`: 12-column overlays for the 750, 720, 940, and 1140 px canvases, plus all four side by side.
- `assets/diagrams/`: the device canvases, a 12-column page, and span comparisons across widths.

These SVGs replace the original PSD/GIF files, which stay in the repository under `assets/grid-design-source/`. `references/source-notes.md` has the rules, dimensions, and attribution.

## Non-negotiable rules

1. **Measure before judging.** At every target width, record each block's computed `x` and `width` and compare them with the column math. Report the delta. Without a rendered page, mark the check **unverified**; do not claim alignment from CSS alone.
2. **12 columns, exactly.** Every row of content spans 12 columns: `12`, `6+6`, `4+4+4`, `3+3+3+3`. Never 13, never a row that stops at 10 because the remainder was rounded away.
3. **One grid per page.** Nested grids restart the 12-column count inside their parent cell; they do not extend the outer grid. A nested grid keeps the **same gutter token** and adds no second outer margin: the parent cell's content box is the nested grid's boundary.
4. **Content stays inside the grid.** A block starts and ends on a column line. No "almost aligned" widths, no fixed pixel widths that ignore the grid.
5. **Adapt with spans, not with new layouts.** At each breakpoint change how many columns a block occupies. Do not build a separate page for each width.
6. **Design the phone at 2×.** A 375 CSS px phone is designed on a 750 px canvas so retina screens stay sharp; assets export at 2× and display at half size.
7. **Use the fewest breakpoints that work.** Four device classes are enough; add a breakpoint only for content that genuinely breaks.

## Instructions

### 1. Write the grid contract

Use the project's widths and tokens if they exist. Otherwise use the grid-design convention and state the breakpoint mapping you choose:

| Device | Design canvas | CSS width | Columns |
| --- | --- | --- | --- |
| Phone | 750 px (2×) | 375 px | 12 |
| Tablet | 720 px | 720 px | 12 |
| Desktop | 940 px | 940 px | 12 |
| Large desktop | 1140 px | 1140 px | 12 |

These are design canvases, not browser breakpoints; write the mapping down and keep it consistent.

Define the four tokens once; the gutter is reused at every nesting level (keep the project's names if it has them):

| Token | Meaning |
| --- | --- |
| `columns` | 12 |
| `gutter` | one gap value, used between every pair of columns, including nested grids |
| `page-margin` | one outer margin per device class |
| `container-max` | the canvas width at which the container stops growing |

Put the resolved values in the output before describing any layout.

### 2. Inventory every row

A **row** is any horizontal group laid out together: header, card list, stat strip, main + aside, form section, toolbar, badge strip, table header. Inventory every row at every nesting level.

For each row, record:

- its span pattern at each target width (`12`, `8+4`, `4+4+4`, ...), and whether the pattern sums to 12;
- whether it is a nested row, and the content width of its parent cell;
- whether it is a deliberate full-bleed exception. A full-bleed row escapes the 12 columns: audit only its inner container against the grid, and mark the bleed itself as an exception.

A row that "looks fine" still needs its spans counted; an uninventoried nested row is the usual source of overflow.

### 3. Compute the expected geometry

Use the same formulas at every level. For a container of width `canvas`:

```text
content      = canvas - 2 * page-margin
column       = (content - (columns - 1) * gutter) / columns
x(i)         = page-margin + (i - 1) * (column + gutter)
width(span)  = span * column + (span - 1) * gutter
```

For a nested grid, replace `canvas` with the parent cell's **content width**, set `page-margin` to `0` (the parent's padding is the inset), and keep the same `gutter` token.

At 940 px with a 20 px margin and a 20 px gutter, the contract resolves to:

| Value | Result |
| --- | --- |
| content | 900 px |
| column | 56.667 px |
| span 3 | 210 px |
| span 4 | 286.667 px |
| span 6 | 440 px |
| span 8 | 593.333 px |
| x of spans 1 / 5 / 9 | 20 / 326.667 / 633.333 px |

A block is **on-grid** when its measured position and width match one whole span within **±0.5 px**. Compare `x` and `x + width`; a block can look centered and still be off by several pixels because flex shrink distributed the error.

### 4. Measure the rendered page

At each target width, in DevTools device mode or with Playwright:

- use one browser session for all widths: open the page once, set each viewport, and collect every inventoried row in one `evaluate` per width;
- read `getBoundingClientRect()` for every item and record `x` and `width` to two decimals;
- compute the delta from the expected value for its span, and check the row's right edge against the next column line;
- repeat at every breakpoint in the contract (the project's own when it has a grid; otherwise 375, 720, 940, and 1140 px), plus one width between breakpoints to catch a layout that collapses between canvases.

Drive the browser through its library API (Playwright or Puppeteer), not hand-rolled shell `fetch` calls to a DevTools port: they are brittle.

For a nested or centered container, subtract the parent content-box origin from each child's `x` before comparing; the parent content box is the local canvas.

Also check overflow, clipped text, long content, empty lists, and errors. If no browser is available, inspect the shared grid rules and list the visual checks as **unverified**. Do not call a page responsive from source alone.

### 5. Assign spans by content priority

For each block, decide its span at each width, widest first:

- **Primary content** keeps the largest span and the most columns.
- **Secondary content** (filters, metadata, related items) shrinks or stacks first.
- **Nothing disappears** at a breakpoint unless the user explicitly agreed to cut it.
- **Match the unit named in the request.** If the request says sections reflow into two columns, the section elements get the spans; splitting the fields inside one section does not satisfy it.

A typical responsive set:

| Block | Phone (12) | Tablet (12) | Desktop (12) | Large (12) |
| --- | --- | --- | --- | --- |
| Page heading | 12 | 12 | 12 | 12 |
| Card list | 12 (1 per row) | 6 (2 per row) | 4 (3 per row) | 3 (4 per row) |
| Sidebar | 12 (stacks) | 12 (stacks) | 3 | 3 |
| Main column | 12 | 12 | 9 | 9 |

Check the arithmetic at every width: each visible row must sum to 12, including nested rows.

### 6. Fix at the shared level

- Fix stray widths at the shared grid/container level, not with per-component overrides.
- Replace a fixed width with a whole-column span; do not keep a fixed-width alternative as a fallback.
- For nested rows, restart the count at 12 inside the parent cell and reuse the same gutter. If the nested content is denser, reduce the number of visible items or let it wrap; do not shrink the gap.
- After the fix, re-measure the same rows and show the new delta. A fix without a re-measurement is a proposal, not a result.

### 7. Design for retina

- Phone canvas 750 px → CSS 375 px; export raster assets at 2× and size them at 1×.
- Prefer SVG for icons and logos; otherwise provide 2× assets.
- Check hairlines and 1 px dividers at 2×; do not upscale a 1× screenshot and call it a retina design.

### 8. Verify and report

For each target width, report:

- every inventoried row, its span, expected geometry, measured geometry, and delta;
- any row that fails the ±0.5 px test, with the smallest span change that fixes it;
- overflow, clipping, and long-content results;
- what remains unverified.

Before answering, run this check: every row at every nesting level is counted; every off-grid claim has a measured delta; every fix is a whole-column span using the shared gutter; every check you could not run is named **unverified**.

## Output format

**Implementation mode**

1. **Grid contract**: columns, gutter, page-margin, container-max, content width, and the breakpoint mapping.
2. **Row inventory**: every row at every nesting level, with its span table and row sums.
3. **Changes**: files and the shared grid/container rules touched; show the changed markup lines, not a full file dump.
4. **Audit table**: at each target width, expected vs. measured geometry and the delta.
5. **Verification**: overflow and retina results, and what remains unverified.

**Review mode**

1. **Verdict**: one sentence on where the layout leaves the grid.
2. **Grid contract**: the resolved values and the expected geometry used for the comparison.
3. **Audit table** (required when a rendered page exists): one row per inventoried block. Without a rendered page, list the expected geometry per row and mark the measurements **unverified**.

   | Block | Span | Expected x / width | Measured x / width | Delta | Verdict |
   | --- | --- | --- | --- | --- | --- |
   | Stat cards | 3+3+3+3 | 20 / 210, 250 / 210, 480 / 210, 710 / 210 | 20 / 222.5, 262.5 / 222.5, 505 / 222.5, 747.5 / 222.5 | x +12.5, width +12.5 | off-grid |

4. **Fixes**: the smallest change that returns each failing block to whole columns; prefer the shared grid over per-component patches, and state the nested gutter explicitly.
5. **Unverified**: widths or states you could not inspect.

Keep findings tied to table rows. Keep the table compact: one line per block, two decimals, no restating the CSS. Do not list a block as off-grid without a measured delta, and do not omit a row because it looks correct.

## Examples

**Review finding with evidence**

> **Badge strip (nested in a 360 px card)**: five `20%` items plus four 8 px gaps need 392 px, so flex shrinks every item below 72 px and the longest label clips. Rebuild it as a nested 12-column grid with the page's 16 px gutter: content 360, column 15.333; span 4 = 109.333 px, span 6 = 172 px; rows `4+4+4` (3 × 109.333 + 2 × 16 = 360) and `6+6` (2 × 172 + 16 = 360). Using 8 px would introduce a second gutter.

**Span change instead of a second layout**

> The dashboard uses 12/12 on the phone, 6/6 on the tablet, 8+4 on desktop, and 9+3 on large desktop. The sidebar is the same component at every width; only its span changes. Every row sums to 12 at every width.

**From a request to a plan**

> "The dashboard is a fixed 1200 px page; make it responsive." → Keep 1140 px as `container-max`, with 940 desktop, 720 tablet, and 375 phone; main 12/6/8/9 and sidebar 12/6/4/3; every row sums to 12; audit all four widths and list what you could not inspect.

**Retina assets**

> The phone canvas is 750 px for a 375 CSS px screen: export raster images at 2×, display at 1×, and set `width: 100%` plus aspect ratio rather than a pixel width.

## Anti-patterns

| Anti-pattern | Do instead |
| --- | --- |
| "Looks aligned" from a screenshot | Measure `x` and `width`, compare with the formula, report the delta |
| Checking only the page-level rows | Inventory nested rows: card headers, form sections, toolbars, badge strips |
| Keeping a fixed-width fallback beside the grid | Replace the width with a whole-column span |
| Treating a 940 px canvas as a 940 px media query | Write the design-canvas → breakpoint mapping explicitly |
| Using one gutter at the top level and another inside a card | Reuse the same gutter tokens at every nesting level |

## Limitations

- The four canvases are a design convention from one source (PSD templates), not a platform standard; a project with an existing grid keeps its own breakpoints.
- It judges layout width only. Type, color, component styling, and motion are out of scope; use `sab-ui-craft` for those.
- Canvas sizes are design sizes, not browser breakpoints; a direct 1:1 mapping is not guaranteed, so record the mapping actually used.
- A source-only review cannot see flex shrink, overflow, clipping, or retina blur. Without a rendered page or screenshots at each target width, say which checks are unverified.
- Behavior between the four widths is the project's choice (fluid or fixed at the previous canvas); state it rather than implying the grid exists only at those four sizes. The bundled PSDs are 2015-era mockups; their canvas size includes a device frame and is not the design width.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| A row totals 11 or 13 columns | Spans rounded or gutters counted as columns | Count spans only; let gutters live in the gap, not in the column count |
| A nested row overflows its card | Nested columns were added to the outer 12, or the nested gap differs | Restart the count at 12 inside the parent cell and reuse the shared gutter |
| A nested container is narrower than 11 gutters | There is no room left for a single column | Reduce the gutter or widen the container; a grid with no column left is not a grid |
| Layout "almost" aligns | Fixed pixel widths mixed with grid widths | Move the block to whole-column spans; remove the fixed width |
| Measured delta is under 0.5 px | Subpixel rounding | Accept ±0.5 px; report the delta instead of calling it off-grid |
| A row looks even but is off-grid | Flex shrink distributed the error across items | Compare `x` positions with the formula, not the visual gaps |
| Phone design is blurry on retina | 1× canvas or 1× assets on a 2× screen | Design at 750 px for a 375 px phone; export assets at 2× |

## Source

Converted from [ColdXu/grid-design](https://github.com/ColdXu/grid-design) (12-column convention, 750/720/940/1140 canvases, retina 2× phone canvas). Source rules, dimensions, and attribution are in `references/source-notes.md`; the original PSD/GIF files are in the repository's `assets/grid-design-source/`.
