# Writing an ADR

Follow these steps to add a new Architecture Decision Record to this repository.

## Step 1: Find the next number

Open `docs/ADR.md`. Find the highest ADR number already present. Your new ADR is that number + 1, zero-padded to three digits (e.g. if the last is ADR-010, yours is ADR-011).

```bash
grep "^## ADR-" docs/ADR.md | tail -1
```

## Step 2: Write the ADR block

Append to the end of `docs/ADR.md`:

```markdown
## ADR-NNN: Short Decision Title

Status: Accepted

One paragraph describing what was decided, why, and any key constraints it implies.
Be specific enough that someone reading it six months later understands both the
decision and the reasoning — not just that a decision was made.
```

**Status values:**
- `Accepted` — in effect; use this for almost all new ADRs
- `Proposed` — under discussion, not yet in effect
- `Deprecated` — was accepted, no longer applies; note why in the body

## Step 3: Commit

```bash
git add docs/ADR.md
git commit -m "docs: add ADR-NNN <short topic name>"
```

Replace `NNN` with the actual number and `<short topic name>` with 2–4 lowercase words (e.g. `docs: add ADR-011 resume-pdf-hosting`).

## What Makes a Good ADR

- **One decision per ADR.** Don't combine unrelated decisions in a single entry.
- **Explain the why.** "We chose X" is not useful. "We chose X because Y constraint ruled out Z" is.
- **Keep it short.** One paragraph is usually enough. Two is the maximum.
- **Accepted means in effect.** To reverse a decision: deprecate the old ADR and write a new one.
- **Never renumber.** ADR numbers are permanent. Don't reorder or reuse numbers.
