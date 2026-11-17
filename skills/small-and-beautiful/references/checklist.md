# Pre-release checklist

Go through every item; fix anything that fails before shipping.

## Focus
- [ ] One sentence explains what the product does
- [ ] No more than 3 core features; nothing "added along the way"
- [ ] Every setting earns its place (remove it only if a good default replaces it)

## First impression
- [ ] The first screen is usable immediately: no forced sign-up, onboarding, or pop-ups
- [ ] Cold start < 1 s; no flash or layout shift on first paint
- [ ] App icon and name hold up on a phone home screen or in the Dock

## Visuals
- [ ] One accent color, used only for primary actions and selected states
- [ ] No more than two corner-radius sets, both documented (skeuomorphic motifs may have their own set)
- [ ] Removable borders and dividers are gone
- [ ] Icon style is consistent; stroke widths match
- [ ] Dark mode checked screen by screen; not a simple inversion

## Text
- [ ] A space between Chinese and Latin/numerals; full-width punctuation in Chinese
- [ ] Comfortable line height and measure; no wide gaps from justified text
- [ ] Buttons use verbs, not "OK" / "Confirm"
- [ ] No typos, no machine-translation tone

## Interaction and motion
- [ ] Every tappable element has a pressed state and a disabled state
- [ ] Long operations show progress; completion is confirmed
- [ ] Every write action can be undone in place (at least the last one), without hunting through settings
- [ ] Destructive actions support undo; batch actions with external side effects require a confirmation showing count and impact
- [ ] Where a permission is requested, the UI has a switch for it and the feature still works when denied
- [ ] Motion is 150–300 ms, direction is logical, and "reduce motion" is respected
- [ ] Keyboard usable (desktop/web); touch targets ≥ 44×44 (mobile)

## Edge states
- [ ] Empty state: one warm sentence + one action
- [ ] Error state: what happened and what to do; no bare error codes
- [ ] Loading state: skeleton or progress, no long blank screen
- [ ] Tested offline, very long text, very large data, very small window

## Respect
- [ ] No ads, no dark patterns, no pre-checked "agree"
- [ ] Only necessary permissions, requested when first used
- [ ] Local-first data; full export available
- [ ] No unnecessary analytics

## Engineering
- [ ] Every dependency has a reason; no unused dependencies
- [ ] Bundle size and first-load assets are within budget
- [ ] Dead code, debug logs, and temporary comments are removed

## The last 1%
- [ ] At least one "makes you smile" detail, and it is not on a high-frequency path
- [ ] You would screenshot it and send it to a friend
