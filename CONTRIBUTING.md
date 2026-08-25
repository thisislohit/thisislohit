# CONTRIBUTING.md

This is a solo-maintained personal portfolio, but this document keeps the project consistent across sessions (human or AI-assisted).

## Session workflow

Before making any change, read in order:
1. [memory.md](memory.md)
2. [scope.md](scope.md)
3. [architecture.md](architecture.md)
4. [design.md](design.md)
5. [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
6. [plan.md](plan.md)
7. [tasks.md](tasks.md)

Then identify the current task, implement only that work, test it, and update `tasks.md` + `memory.md` before ending the session.

## Core rules

- **`design.md` is the visual source of truth.** Never invent a new visual direction. If a value is missing from it, check [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) §1.7 for the documented resolution before deciding one yourself.
- **Tokens only.** No raw hex color, arbitrary px value, or ad-hoc spacing may appear in a component. Every value must trace to a token in `DESIGN_SYSTEM.md` Part 2.
- **No invented content.** Never fabricate projects, skills, experience, or biographical claims. If content is missing, it belongs in `tasks.md` "Content Needed," not in the code.
- **No unnecessary dependencies or abstractions.** Before adding a package, check `architecture.md`'s "Explicitly rejected" list and confirm the need isn't already covered.
- **Server Components by default.** A component becomes a Client Component only when it needs interactivity that can't be done otherwise.
- **Reuse before creating.** Check the component inventory in `DESIGN_SYSTEM.md` Part 3 before adding a new component.

## After completing work

- Update `tasks.md` (check off completed items, add any newly discovered ones).
- Update `memory.md`: append a dated entry to the Session Log (decision / architecture / design / completed / next / notes — keep it compact, do not paste full conversations), and update "Current Progress."
- Do not rewrite historical decisions in `memory.md` unless they were actually reversed — if reversed, note the change and why, don't silently delete the old entry.

## Commits

Keep commits scoped to one phase/task where practical. Reference the `plan.md` phase or `tasks.md` item in the commit message when applicable.
