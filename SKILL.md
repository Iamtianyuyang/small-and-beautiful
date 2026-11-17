---
name: small-and-beautiful
description: Small-and-beautiful product principles for personal apps and tools. Use for scoping, UI/UX, copy, dependencies, and product review.
version: 1.1.0
metadata:
  author: "tianyy <Iamtianyuyang@users.noreply.github.com>"
  tags: [design, ui, product, chinese-typography]
---

# Small and Beautiful · Software Principles

> One sentence: **Do one thing, and make it so good people can't resist screenshotting it.**

## Scope (read this first)

For lightweight products built for individuals: mobile apps, small tools, landing pages, content sites.

**Partially inapplicable**: back-office systems, data-dense tools, multi-user collaboration products. These still use the ten principles, but the four defaults below should be adjusted for dense interfaces; when you adjust one, state which one and why:

| Principle | Default on dense interfaces |
|---|---|
| Feature budget (≤3) | Count by role, not by feature; one primary workflow per role |
| Body 15–17, generous whitespace | Lists 13–14, row height 32–40; whitespace only between blocks |
| No dividers | 1-unit dividers allowed; remove vertical rules and card borders |
| Touch 44×44 | Mouse-only: 24×24 only for low-frequency secondary icons; high-frequency controls ≥32×32; mixed input follows touch |

For multi-user dense tools: handle concurrent edits with an optimistic 409 conflict, and mask PII (phone, address) in list rows.

## Three influences

| Source | What to take |
|---|---|
| **Apple** | Focus and restraint: say no to a thousand things. Clarity over decoration. Do the invisible parts well. Wholeness: every part looks like it came from the same hands. |
| **Smartisan** | Craft and human warmth: obsession with Chinese typography; tactile icons; small features with attitude (notes exported as beautiful long images, Big Bang word splitting, Idea Pills). "Beautiful" is itself a feature. |
| **Meizu** | Light, simple, quiet: one button that solves everything, like mBack; generous whitespace; calm and unobtrusive; focus on a few products. |

## Ten principles

1. **One thing**: describe what it does in one sentence. If you can't, it's too big.
2. **Feature budget**: at most 3 core features in v1. To add one, decide what to remove. Avoid settings; good defaults beat options.
3. **Open and usable**: no forced sign-up, no onboarding carousel, no pop-ups. The first screen is the workspace.
4. **Light**: small bundle, fast launch, few dependencies. Use native platform capabilities before adding a framework; every dependency needs a reason.
5. **Restrained visuals**: one accent color, a neutral gray scale, generous whitespace. Hierarchy through type size and weight; use color and lines sparingly.
6. **Text is the interface**: treat Chinese typography seriously (see defaults below).
7. **Every action responds**: press states, progress, confirmation. Motion should feel physical. Prefer undo over confirmation dialogs for reversible local actions; for batch actions with external side effects (shipping, refunds, messages), confirm with count and impact — undo alone is not enough.
8. **Warm details**: empty, error, loading, and completion states reveal personality. Copy should sound human; one or two easter eggs are allowed.
9. **Respect the user**: no ads, no dark patterns, no unnecessary permissions, no pointless tracking. If a permission is truly needed, expose a switch in the UI and keep the feature usable when denied. Data belongs to the user: local-first, exportable at any time.
10. **Polish the last 1%**: run the [checklist](references/checklist.md) and [self-check](references/self-check.md) before release. Better to ship one feature less than one rough edge.

## Defaults (project may override)

> Units: native uses pt (dp on Android), web uses px; values below apply to both unless stated otherwise.

### Layout and spacing
- Use an 8-step grid; 4 is allowed for details. Page margins 16–24.
- Use one corner-radius set (e.g. 8 / 12 / 20); nested corners: outer = inner + spacing. Exception: skeuomorphic motifs (cups, physical objects, illustrations) may use a second set, but no more than two sets per app, and both must be documented.
- Touch targets at least 44×44; mouse-only can go to 24×24; mixed input follows touch.
- Group with whitespace before reaching for dividers or borders.

### Color
- Light: background `#FFFFFF` / `#F7F7F8`; primary text `#1A1A1A`, secondary `#666`, tertiary `#999`.
- One accent color only; use it only for primary actions and selected states.
- Dark mode is not a simple inversion: use `#121212` for the background and lower accent saturation.
- Contrast: body text vs background ≥ 4.5:1; large text and icons ≥ 3:1. Verify dark mode against the same thresholds.

### Typography and Chinese typesetting
- Font stack: `-apple-system, "PingFang SC", "HarmonyOS Sans SC", "MiSans", "Noto Sans SC", "Microsoft YaHei", sans-serif`.
- Body 15–17, line height 1.6–1.75, paragraph spacing greater than line spacing; keep lines to roughly 35–40 Chinese characters. Dense lists may go to 13–14, but detail pages, long text, and forms return to 15–17.
- Add a space between Chinese and Latin text or numerals; use full-width punctuation in Chinese; never justify Chinese text into wide gaps.
- Heading weight around 600; don't reach for heavy black by default.

### Motion
- Duration 150–300 ms; ease-out for entrances, spring curves for drag and gestures.
- Direction should make sense: come from where it belongs, return where it came from.
- Motion explains state changes, not decoration. Respect the system "reduce motion" setting.
- Easter eggs and decorative motion only at low-frequency moments (first completion, goal reached, empty state). In a spec, give amplitude, period, and trigger conditions; never write "wiggle it a bit".

### Icons
- One style across the app: consistent stroke width for line icons, consistent fill for solid icons; don't mix.
- App icons may have Smartisan-like texture; in-app icons stay simple.

### Copy
- Buttons use verbs: "Save", "Delete photo" — not "OK", "Confirm". In Chinese UI, use 保存 / 删除照片, not 确定 / 好的.
- Errors = what happened + what to do next. Never blame the user; never show a bare error code.
- Empty state = one warm sentence + one clear action.

### Engineering
- Performance budget: interaction response < 100 ms; cold start < 1 s; first-load JS < 150 KB (gzipped).
- Code should be small and clear; delete what you can. Every new dependency needs a reason.
- Work offline; prefer local storage; support data export.

## Instructions

**Starting a new project**
1. Write a one-sentence definition, then a "what we won't do" list.
2. List the core features; no more than 3.
3. Choose the lightest stack that meets the need.
4. Build the core screen first: write a one-page design spec (grid, color, type, motion, state copy), then build it and polish before expanding.
5. Before release, run the [checklist](references/checklist.md) and [self-check](references/self-check.md).

**Reviewing or polishing an existing product**
- Judge first, then cite a principle: every recommendation states the judgment and reason for this product, not a restatement of a principle ("good defaults beat options" is not a reason; "this setting is changed once a week, and a 2000 default covers 95% of people" is).
- Go through the ten principles with ✓ / △ / ✗; every △ and ✗ gets a concrete fix.
- Prefer "remove" and "simplify" before "add".
- Finish with a consistency self-check: each rule is defined once, no recommendation contradicts another, and a cut feature does not reappear later as a risk or easter egg.

## Examples

**Reviewing a settings page**

A user asks for a "reminder time" setting. Judgment: it is changed once a week; a 10:00 default covers most people; adding it requires a new page. Recommendation: cut the setting, default to 10:00, and let people long-press the time to edit it in place.

| Scenario | What to do |
|---|---|
| Starting a new project | One-sentence definition: "Only tracks how many glasses of water you drank today." Won't do: reminders, charts, social. Core feature: "Tap once to log a glass." |
| Writing button copy | Use verbs: "Save", "Delete photo", not "OK", "Confirm". In Chinese UI: 保存 / 删除照片, not 确定 / 好的. For errors, say what happened, then what to do. |
| Choosing a dependency | If the platform can do it, don't add a framework. If you add one, state how much code it replaces and what it buys you. |

## When in doubt, ask three questions

- **Apple**: can this be removed?
- **Smartisan**: will the user smile when they get here?
- **Meizu**: can this be lighter and quieter?
