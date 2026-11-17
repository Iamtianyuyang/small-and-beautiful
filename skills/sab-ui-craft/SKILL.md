---
name: sab-ui-craft
description: "Review, design, and polish web or desktop UI: hierarchy, spacing, type, color, states, and product UI design systems. Use for UI/UX review, visual polish, UI refactors, screenshot-based improvements, and new product UI; can review only or modify code when asked. Not for backend-only, UI-less, brand/logo design, pure logic bug fixes, or motion-only work."
version: 1.0.0
metadata:
  author: "tianyy <Iamtianyuyang@users.noreply.github.com>"
  tags: [ui, design, review, frontend]
---

# SAB UI Craft — UI quality review and polish

## Purpose

Make the interface feel **restrained, clear, precise, and finished**, not merely decorated.

Craft comes from information hierarchy, typography, space, surface relationships, interaction consistency, and real, complete states — not from the number of shadows, gradients, animations, or glass effects.

Follow **small-and-beautiful**: focus on the core task, unify and delete first, add detail last. Combine Apple-like focus, craftsman-level detail, and lightweight interaction, without imitating any specific product's visual style.

## When to use

- The user says the UI "has no craft", "feels flat", "looks like an admin panel", or "looks like components bolted together", and wants the cause or a fix.
- The user provides a screenshot, design file, or existing frontend code and asks for UI/UX review, polish, or a UI refactor.
- The user wants to establish or unify design rules for color, type, spacing, radii, states, motion, and so on.
- The user wants to turn a prototype into a shippable product, not add more features.

**Not for:** brand identity, logo design, marketing illustration, backend-only work, pure logic or data-flow bug fixes, animation work where motion is the main deliverable, or a full accessibility audit.

**Identify the mode first:**
- **Review mode**: the user only asks questions, advice, or options. Analyze and propose actionable changes; do not edit code unasked.
- **Implementation mode**: the user explicitly asks to modify, implement, or refactor. Read the project, change the minimum necessary, and verify.
- **New-build mode**: no existing UI. Establish the user's key task and visual constraints, then build a small, complete solution. As a rule, v1 should have no more than 3 core features.

If the user moves from review to implementation mid-conversation, restate the first 3 changes and confirm the scope before editing. Do not expand a review into a rewrite.

## Prerequisites

- Access to evidence: a screenshot, a running page, or the relevant source code. If you only have source, say which visual and interaction claims you cannot verify.
- For implementation mode, permission to edit the project and the ability to run its existing checks.
- For contrast, compute ratios from actual color values; for Chinese UI, verify the font stack renders every character in use.

## Non-negotiable rules

1. **Evidence first, conclusions second.** Use screenshots, the running page, code, and existing rules. Do not claim an effect is verified if you have not run or seen it.
2. **Preserve product identity.** Keep existing brand colors, the component system, and platform conventions; do not turn every project into the same gray-white style.
3. **Function over decoration.** Never trade readability, keyboard access, contrast, layout stability, or performance for a "premium" look.
4. **Delete and unify first.** Remove duplicate entry points, meaningless dividers, extra labels, and placeholder decoration before considering new elements.
5. **Avoid rewrites.** Reuse the project's layout, design tokens, components, and icons; do not add a new UI library or animation dependency unless genuinely necessary.
6. **Handle complete states.** Do not polish only the default screenshot; cover loading, empty, error, disabled, hover, focus, selected, and narrow-screen states.
7. **No fake interactions.** Buttons, tabs, settings entries, and navigation must have a clear behavior; never keep something that looks clickable but does nothing.

## Instructions

### 1. Get UI context

In an existing project, inspect as much as possible:
- Target users, the primary task, and the page's most important content and action.
- The current screenshot or running page; if there are several sizes, start with the main desktop view and a narrower view.
- Tech stack, existing CSS/styling approach, component library, fonts, icons, and theme tokens.
- Components, routes, state, and interaction logic that affect the current page.

Separate **directly observable problems** from **hypotheses that still need verification**. When information is missing but you can proceed reasonably, state the assumption; ask only when a key requirement is missing and would change the plan.

### 2. Seven-dimension diagnosis

Check each dimension; skip those irrelevant to the current interface.

| Dimension | Key question | Direction |
| --- | --- | --- |
| Information hierarchy | Can the user identify the main content, primary action, and secondary tools within 3 seconds? | Clarify rank; focus content, recede tools |
| Space and density | Does whitespace have a purpose? Are there too many dividers? Are elements crowded or scattered? | Unify spacing, reduce cuts, adjust container proportions |
| Type and typesetting | Do size, weight, and leading have rhythm? Are Chinese, Latin, and numerals harmonious? | Define title/body/supporting levels; improve Chinese reading |
| Color and surface | Is everything on the same plane? Are background, panel, and selected states distinct? | Use a few surface levels, not shadows everywhere |
| Component consistency | Are inputs, buttons, tabs, and icons consistent in size and state? | Converge on shared tokens and component variants |
| Interaction feedback | Does every action respond? Are empty and error states complete? | Fill in states, accessibility, progressive disclosure |
| Content presentation | Do long text, tables, formulas, code, and charts fit the reading task? | Build type for the content type, not one default style for all |

For each problem record: **location → observable evidence → impact → smallest fix → what can be deleted**.

### 3. Rank by impact, pick only the most important changes

Priority:
1. **P0 usability**: text hard to read, layout overflow, dead interactions, invisible focus, incomplete states.
2. **P1 structure and hierarchy**: wrong visual weight, bad reading width, tool panels stealing space, duplicate controls.
3. **P2 consistency**: inconsistent sizes, spacing, radii, borders, colors, icons, and button states.
4. **P3 decorative detail**: micro-shadows, local transitions, and subtle motion.

The first iteration focuses on at most **3 high-impact changes**. If you propose a larger overhaul, split it into later iterations; do not mix many unrelated changes into one polish pass.

### 4. Establish minimal visual rules

**Start from the project's existing tokens.** Add only what is missing; the baseline below is not a mandatory style:

- **Spacing**: use a few multiples of 4 (4/8/12/16/24/32); let component semantics choose the step, not a mechanical scale.
- **Radii**: 2–3 steps are enough. Controls in the same row and at the same level share one radius.
- **Surfaces**: distinguish page, content, and hover/selected surfaces; borders must group or show state.
- **Text**: three levels — primary, secondary, muted — are usually enough; do not put important information in very light small text.
- **Accent**: primary action, selection, and meaningful states only; do not color unrelated elements to look "richer".
- **Shadows**: use only for overlays, popovers, and real elevation; they cannot replace clear layout.
- **Motion**: short, natural, and in service of feedback; respect reduced-motion; avoid pointless loops.

Additional checks for Chinese UI:
- Prefer a Chinese font fallback that renders well on the platform; avoid pairings where the Latin face is beautiful but the Chinese glyphs look out of place.
- For reading text, protect a comfortable line length and leading; utility text should stay compact and clear.
- Check mixed Chinese/Latin/number/punctuation setting for bad line breaks, crowding, and baseline misalignment.
- Set formulas, code, and tables with typography suited to their semantics; do not use a gray box as a substitute for "professional".

### 5. Make changes (implementation mode only)

In this order:
1. **Delete**: duplicate entry points, useless copy, excessive dividers, valueless status labels, purely decorative containers.
2. **Layout**: adjust primary/secondary region widths, margins, max content width, alignment, density, and responsive behavior.
3. **Typography**: fix sizes, leading, weights, text colors, and the reading experience of long content.
4. **Components**: unify buttons, inputs, tabs, panels, selected and focus states using existing tokens.
5. **Feedback**: complete empty/loading/error/disabled/keyboard states, then add only the motion that is necessary.

Implementation constraints:
- Respect existing component APIs, routes, business logic, data flow, and state management.
- Do not rewrite the business architecture for visual polish; do not add dependencies, settings, or new configurable themes without reason.
- Change shared tokens and a few key components rather than overriding styles everywhere.
- Give every new style a clear purpose; avoid magic numbers and long CSS override chains.
- If a control exposes a feature that is not wired up, do not hide it with visuals; wire it up or mark it clearly unavailable.

### 6. Verify and iterate

When running/screenshot tools are available, compare the same page, same window size, and same data state before and after:
- Is the visual focus clearer? Did meaningless noise decrease?
- Are Chinese titles, body text, code, and formulas clear, with no overflow, truncation, or jumping?
- Are the primary action, secondary action, disabled, hover, selected, and keyboard focus states distinguishable?
- Does it still work when the window narrows, zoom changes, or long file names/text appear?
- Do empty, error, and loading states preserve the layout?
- Are existing features, navigation, shortcuts, and data relationships intact?
- Do text and control contrast meet the project's accessibility target (WCAG AA 4.5:1 for normal body text)?

Run the project's existing lint, typecheck, tests, or build commands relevant to the change. If you cannot run them, say so honestly; **do not claim "verified"**.

If the result is only "fancier" without improving hierarchy, reading, or operation, revert it.

### New-build mode

When there is no existing UI, use this sequence instead of steps 1–5:

1. **Define the job.** Write one sentence for the primary user, the primary task, and the single most important action. If the user cannot state them, propose a one-sentence draft and ask for correction.
2. **Choose the screen shape.** Pick one primary screen and at most one secondary screen. List the 3 core features for v1 and explicitly park the rest.
3. **Set the minimum system.** Define 3–5 spacing steps, 2–3 radii, 3 text levels, one accent, and the page/content surfaces. Start from platform defaults; add a UI library only when the project already uses one.
4. **Build the complete slice.** Implement the primary task end to end, including empty, loading, error, disabled, and narrow-screen states. Do not add settings, themes, or onboarding until the core task works.
5. **Verify.** Run step 6 on the new screens. If the task cannot be completed without explanation, cut features before adding UI.

## Output format

### Review mode

Keep it structured and short:

1. **Overall judgment**: one sentence naming the core problem; no empty phrases like "lacks premium feel".
2. **Main problems**: 3–5 at most; each with location, evidence, and impact.
3. **Proposed changes**: actionable steps by priority, and explicitly **what should be deleted**.
4. **First-round tasks**: at most 3, each with the expected improvement and how to verify it.
5. **Uncertainties**: judgments not supported by a screenshot, code, or running evidence.

### Implementation mode

Report:

- **Findings**: key UI problems and their evidence.
- **Changes**: files and change points, especially what was deleted.
- **Verification**: commands run, pages viewed, states covered, and results.
- **Remaining issues**: what is unresolved or cannot be verified.

In implementation mode, do not stop at a design recommendation: make the changes. Do not call the result "more polished" unless the changes are checkable.

### New-build mode

Report:

- **Task**: the primary user, task, and main action in one sentence.
- **Scope**: the 3 core features and what was explicitly parked.
- **Screens**: the primary screen and any secondary screen.
- **System**: the spacing, type, radius, and color decisions, and why they fit this product.
- **Verification**: screens and states checked, and what could not be verified.

## Examples

### Review mode: data table page

**Overall judgment**: The table is readable, but the filter sidebar, the table, and the metrics strip all use the same white surface, so the eye has no entry point.

**Main problems**
1. **Filter sidebar (280 px, left)**: same surface and border as the table, so it competes with the primary content. Move filters into a compact toolbar above the table and delete the sidebar container.
2. **Table rows (56 px high, 13 px text)**: density is too low for a data tool; only 12 rows fit at 1280×800. Use 40 px rows and 14 px text, then re-check the same viewport.
3. **Empty state ("No data" plus a disabled export button)**: the user cannot tell whether to wait or act. Explain why it is empty, offer the next action, and remove the disabled export.

**First round**
1. Collapse filters into a toolbar — one clear content column; verify at 1280 px and 1024 px.
2. Tighten table density — 16–18 rows visible; verify at the same viewport.
3. Rewrite the empty state — the next step is obvious; verify with zero rows and with a load error.

**Uncertainties**: Hover and keyboard focus were not visible in the screenshot.

### Implementation mode: settings page

**Findings**: Inputs use three heights (32/36/40 px) and two focus styles; the primary and danger buttons share the same shape and weight.

**Changes**
- Shared token stylesheet: added control height and radius tokens.
- Settings form: all inputs use the shared height and one focus ring; removed per-field border overrides.
- Danger button: uses the danger variant; its confirmation now states the count and impact.
- Deleted the divider between every row; spacing now does the grouping.

```css
:root {
  --control-height: 36px;
  --radius-control: 8px;
}
```

**Verification**: `pnpm lint`, `pnpm typecheck`, and `pnpm test` passed. Viewed 1280×800 and 390×844; checked empty, loading, error, disabled, hover, and keyboard-focus states.

**Remaining**: Avatar upload still has no error state; it needs a product decision on allowed file types.

### New-build mode: small internal tool

**Task**: An ops engineer needs to find a failed job, read its error, and retry it; the primary action is Retry.

**Scope**: job list, job detail with error, retry confirmation. Parked: scheduling, filters, bulk actions, audit log.

**Screens**: one list screen with a detail panel; no dashboard, no settings.

**System**: 4/8/16/24 spacing, 6/10 radii, 13/15/20 type, one blue accent, white content on a light gray page.

**Verification**: list, empty, loading, error, and retry-failure states checked at 1280 px and 390 px; retry was not run against a real backend.

### Request variations

- **Explicit**: "Review this settings page and tell me why it feels like an admin panel."
- **Implicit**: "Our dashboard looks fine, but nothing stands out; can you fix the hierarchy?"
- **Screenshot**: "Here is a screenshot of our pricing page—make it feel more considered."
- **New build**: "We need a small internal tool for retrying failed jobs; design the first screen."
- **Out of scope**: "Design a logo and brand palette for our new product." Do not trigger; this skill is product UI, not brand design.

## Anti-patterns

- Stacking glassmorphism, gradients, blur, shadows, large radii, and pointless motion for a "premium" feel.
- Putting a border or card around every region until the page looks like a component gallery.
- Treating reading areas and tool areas the same, so every panel has equal visual weight.
- Shrinking text and lowering contrast to create "lightness".
- Hiding necessary information for "minimalism" until users cannot find features.
- Making an unfinished state or button prettier without verifying what it actually does.
- Declaring a framework, font, or technique the root cause from a screenshot alone; do not conclude without evidence.
- Redoing product positioning or navigation structure, or introducing a whole new design system, unasked.

## Limitations

- Static code cannot prove visual quality, motion, overflow, or contrast. Without a screenshot or running page, treat those claims as hypotheses.
- A screenshot cannot show keyboard focus, hover, loading, error, empty, or responsive behavior. List what you could not inspect.
- The minimal rules are a baseline, not a design system. If the project has no tokens, derive a small set from existing values instead of inventing a new system.
- This skill improves craft inside the existing product. It does not replace user research, brand strategy, or a full accessibility audit, and it will not fix missing product features or positioning.
- A single polish pass is not a redesign, and brand palette creation is out of scope. If the hierarchy is fundamentally wrong, propose a separate effort; use existing brand colors rather than inventing a brand identity.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| The page feels flat, but adding shadows and gradients makes it worse | Hierarchy and spacing are doing too little work | Fix rank and whitespace first; add decoration only after the structure reads clearly |
| The screenshot looks good but the app breaks with real data | Only the default state was checked | Test long names, empty lists, errors, disabled controls, and narrow widths |
| Contrast is "close enough" by eye | The ratio was not computed | Measure the actual foreground and background colors; target 4.5:1 for body text and 3:1 for large text and UI edges |
| Every component has a slightly different height or radius | Styles are local instead of tokenized | Converge on shared control height, radius, and spacing tokens; delete local overrides |
| The polish pass made it prettier but not easier to use | Only decoration changed; hierarchy, reading, or operation did not | Revert the decorative changes; keep only changes tied to a named problem |
| The project cannot be run or screenshotted | No runtime evidence | Review code-level issues only; label visual and interaction claims as unverified and give the user a short manual check list |
| The improvement conflicts with the existing brand or design system | Brand rules and craft rules point in different directions | Keep the brand constraint; fix hierarchy, spacing, and states within it. If the brand rule causes the usability problem, show the evidence and ask for a brand-level decision |

## Success criteria

When done, the user should find it easier to identify the main content, understand how actions relate, read continuously, and complete the task; similar components behave consistently, empty states feel real, and the interface is quieter without losing information. **Restraint is the result, not the goal; clarity and usability are the goal.**
