# Skills

A small collection of agent skills for building and polishing software products.

## Skills

| Skill | What it does |
| --- | --- |
| [small-and-beautiful](skills/small-and-beautiful/SKILL.md) | Product principles for personal apps and tools: scoping, UI/UX, copy, dependencies, and release review. |
| [sab-ui-craft](skills/sab-ui-craft/SKILL.md) | UI quality review and polish for web and desktop apps: hierarchy, spacing, typography, color, surfaces, states, and design systems. Builds on small-and-beautiful. |

## Using a skill

Copy or symlink a directory under `skills/` into your agent's skills directory, or point the agent at its `SKILL.md`. Each skill is self-contained: `SKILL.md` is the entry point, and longer material lives in `references/`.

## Adding a skill

Create `skills/<name>/SKILL.md` with frontmatter whose `name` matches the directory name. Keep the file focused, put long reference material in `skills/<name>/references/`, and link it from `SKILL.md` so it loads only when needed.
