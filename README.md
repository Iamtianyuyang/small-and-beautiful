# Small and beautiful skills

Two agent skills for product and UI work. Each skill is a `SKILL.md` file with optional reference material, so it works with any agent that can load a skill directory.

## Skills

| Skill | Use it for |
| --- | --- |
| [small-and-beautiful](skills/small-and-beautiful/SKILL.md) | Scoping a personal app or tool, deciding what to cut, and reviewing UI, copy, and dependencies before release. |
| [sab-ui-craft](skills/sab-ui-craft/SKILL.md) | Reviewing or polishing a web or desktop UI: hierarchy, spacing, type, color, states, and consistency. It follows the small-and-beautiful approach and restates the core rules. |

`small-and-beautiful` answers what to build or cut. `sab-ui-craft` answers how the interface looks and behaves.

## Install

For Claude Code, copy the skills into your personal skills folder:

```bash
mkdir -p ~/.claude/skills
cp -R skills/* ~/.claude/skills/
```

To keep a copy with a project:

```bash
mkdir -p .claude/skills
cp -R skills/* .claude/skills/
```

Add `.claude/` to `.gitignore` if you do not want to commit that copy.

Other agents can load `SKILL.md` directly. The install path only matters for automatic discovery.

## Layout

```
skills/
  small-and-beautiful/
    SKILL.md
    references/
      checklist.md
      self-check.md
  sab-ui-craft/
    SKILL.md
```

`SKILL.md` is the entry point. Reference files hold longer checklists and load only when the skill links to them.

## Adding a skill

Create `skills/<name>/SKILL.md`. The `name` in the frontmatter must match `<name>`, and the description should say when to use the skill and when not to. Put long material in `skills/<name>/references/` and link it from `SKILL.md`. A skill with no references is fine.

## Checks

Both skills pass SkillEvaluator Tier 1. Rerun the static checks from the repo root:

```bash
skillevaluator validate skills --profile default --tiers 1 -c
```

Tier 1 uses local scanners and may download them on the first run.

The LLM rubric is separate and needs a model provider:

```bash
skillevaluator rubric-eval skills/sab-ui-craft
```

The rubric score depends on the judge model, so compare runs only when the model is the same.
