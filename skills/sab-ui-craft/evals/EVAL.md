# sab-ui-craft — evaluation cases

Fixtures live in `evals/files/` and are staged to `/workspace/input/`:

- `settings-page.html` — a deliberately admin-looking
  settings page (dense label/value rows, dividers, mixed radii, four
  equal-weight toolbar actions).
- `dashboard/` — `index.html`, `styles.css`, `app.js` with three metric-card
  systems and three panel styles bolted together.
- `billing.py` — `invoice_total` iterates `invoice["line_items"]` without a
  None check.

## Cases

1. **Explicit review** — `/workspace/input/settings-page.html` is described as
   looking like an admin panel. A good result names the causes visible in the
   file, gives at least three concrete changes with values, and does not edit
   code because only review was asked. A PNG rendering used for human review
   lives in `tmp/fixtures/settings-page.png`; it is not kept under `evals/`
   because a binary fixture makes the SkillSpector completeness check fail.
2. **Implicit polish** — `/workspace/input/dashboard` "looks like components
   bolted together". A good result edits the CSS to one spacing scale, one
   type scale, one accent color, and one radius set, and says which values it
   replaced.
3. **New build** — A small iOS habit tracker needs its main screen designed,
   written to `/workspace/input/habit-tracker/index.html`. The prompt states the
   constraints explicitly (one accent, one spacing scale, empty/loading/error/
   success states, at most three features) and asks the final summary to list
   them, so the judge can verify the result from the summary and file. The task
   is scoped to one file and forbids browser rendering or screenshots, so the
   evaluation measures the design output rather than screenshot tooling.
4. **Negative** — `/workspace/input/billing.py` has a null-pointer bug. The
   skill should not trigger; the agent should fix the bug without UI advice.
