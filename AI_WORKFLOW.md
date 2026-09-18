# BoxLab AI Development Workflow

This file defines the handover protocol for every AI-assisted BoxLab development session.

## Core rule

The repository is the source of truth.

A brand-new ChatGPT conversation with no access to earlier BoxLab chats must be able to continue development by reading this file, `AI_HANDOFF.md`, `TEST_CHECKLIST.md`, the relevant recent entries in `DEV_HISTORY.md`, and inspecting current `main`.

If chat memory, an older handoff, or remembered version numbers conflict with the repository, use the repository and update the handoff.

## Start of every development session

Before changing code:

1. Read `AI_WORKFLOW.md`.
2. Read `AI_HANDOFF.md` completely.
3. Read `TEST_CHECKLIST.md`.
4. Read the recent relevant entries in `DEV_HISTORY.md`.
5. Inspect current `main`, including the visible app version and recent commits.
6. Identify protected files, protected behaviours, and the current task.
7. If the handoff is stale, reconcile it from the repository before coding.

## Development rules

- Keep changes narrow and modular.
- Preserve stable behaviour outside the requested scope.
- Do not silently refactor unrelated systems.
- Prefer topology-driven solutions over accumulating special cases.
- Preserve the iPad/Pencil interaction model.
- Preserve Undo/Redo semantics.
- Treat regression-sensitive systems as protected unless the requested task genuinely requires touching them.
- Record an important failed approach if a future developer could plausibly repeat it.

## Protected interaction baseline

Unless the user explicitly requests otherwise, preserve:

- one-finger orbit
- two-finger pan
- pinch zoom
- two-finger tap Undo
- three-finger tap Redo
- no-jump orbit pivot
- persistent selections during navigation
- Studio realtime behaviour
- object-management / Multi behaviour
- existing snapping
- existing modelling tools outside the requested scope

## Special protection

Check `AI_HANDOFF.md` for the current protected-file list before editing.

In particular, `src/multi-object-transform.js?v=0.36.1.0` has historically been explicitly protected and must not be casually changed.

Version-pinned UI assets and topology-critical modules may also be intentionally frozen. Do not "clean up" version pins merely because they look old.

## Testing

For each change:

1. Test the requested feature.
2. Test nearby functionality that shares topology, selection, history, object state, or UI wiring.
3. Use `TEST_CHECKLIST.md` as the regression baseline.
4. Add a new checklist item whenever a newly stable behaviour becomes worth protecting.

## End of every successful development session — mandatory

Before finishing a session that changes BoxLab:

0. Prepare a short **user manual test list** for the final reply:
   - normally 3–6 quick checks maximum
   - only ask the user to test visible/tactile behaviour they can realistically verify in the app
   - do not ask the user to recreate synthetic backend fixtures or topology torture cases that are better covered by automated tests
   - clearly distinguish what automated regression already covered from what the user should manually sanity-check
   - if no meaningful manual test is needed, say so explicitly

1. Rewrite `AI_HANDOFF.md` so it describes the repository AFTER the work.
2. Update current version, HEAD/release commit references, current focus, known issues, and next step as applicable.
3. Append a concise entry to `DEV_HISTORY.md`.
4. Update `TEST_CHECKLIST.md` when new regression coverage is needed.
5. Record any newly protected file or behaviour.
6. Record meaningful failed approaches when useful.
7. Verify the handoff is sufficient for a fresh chat with no earlier conversation context.

Development work is not considered fully handed over until these files are current.

## File roles

### AI_HANDOFF.md
Living current-state document. Keep it concise. Rewrite current-state sections rather than endlessly appending.

### DEV_HISTORY.md
Append-only development chronology. Record meaningful milestones, not every tiny cache-hop or deployment-marker commit.

### TEST_CHECKLIST.md
Regression contract for stable user-facing behaviour and topology-sensitive workflows.

## Handover test

Before ending a session, ask:

> Could a new ChatGPT conversation continue BoxLab correctly using only the current repository and these handoff files?

If not, improve the handoff first.
