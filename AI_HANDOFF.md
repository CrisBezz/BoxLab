# BoxLab — AI Development Handoff

## Read this first

This is a living handoff document, not a historical log.

Before changing BoxLab, read:
- `AI_WORKFLOW.md`
- this file
- `TEST_CHECKLIST.md`
- recent relevant entries in `DEV_HISTORY.md`

Then inspect current `main`.

If this file conflicts with the repository, the repository wins. Correct this file before proceeding.

Before finishing any development session that changes BoxLab, update this file and append the milestone to `DEV_HISTORY.md`.

## Project

- Repository: `CrisBezz/BoxLab`
- Production branch: `main`
- Live app: https://crisbezz.github.io/BoxLab/
- Frozen Beta 2: https://crisbezz.github.io/BoxLab/beta-2/
- Product: iPad-first, touch/Pencil polygon modeller with a deliberately shallow modelling workflow and Nomad Sculpt handoff in mind.

## Current repository state

Audited from `main` on 2026-09-19 (Australia/Brisbane context).

- Visible app version: **v0.36.18.319**
- Current audited HEAD: **4ed534dfe8697e54921a8a80d7b50945b6792342**
- Release commit for .319: **68e45845f6696b3e66929ee4b181748b85d99b09**
- Latest release theme: **Clean for SubD — internal proposed-quad flow coherence**
- `styles.css` remains intentionally pinned at **v0.36.18.270**
- `src/multi-object-transform.js` remains intentionally loaded as **v0.36.1.0**

Always re-check these values at the start of a later session; do not assume they remain current.

## Current focus

The latest completed work is the Clean for SubD / Quad Clean development line.

At .319 the implementation is structured as a guarded transactional cleanup pipeline. The core currently includes:

1. safe four-triangle quad-fan repair
2. conservative skinny/sliver triangle-edge collapse where demonstrably better
3. bounded even triangle-island retopology up to 40 triangles
4. surrounding-quad boundary-flow scoring
5. internal proposed-quad flow-coherence scoring
6. guarded remaining triangle-pair to quad merging
7. safe tangent relaxation of interior all-quad vertices
8. topology validation with rollback in the UI wrapper

The next modelling target is **user-directed**. Do not invent a new feature merely because the previous chat ended.

## Relevant current files

- `src/quad-clean.js` — user-facing Clean for SubD transaction/UI wrapper
- `src/quad-clean-core.js` — cleanup/retopology logic and flow-quality scoring
- `src/bridge-flow-regularity.js` — shared/related flow-quality logic where applicable
- `src/object-management.js` — object management
- `src/multi-object.js` — multi-object behaviour
- `src/multi-object-transform.js` — explicitly protected transform baseline
- `index.html` — visible version and module cache pins

## Protected behaviours

Preserve unless the user explicitly requests a change:

- one-finger orbit
- two-finger pan
- pinch zoom
- two-finger tap Undo
- three-finger tap Redo
- no-jump orbit pivot
- persistent selection during navigation
- Studio realtime default/behaviour
- object-management / Multi workflow
- existing snapping
- Knife
- Loop Cut
- Edge Bevel
- Vertex Bevel
- ordinary Extrude
- connected multi-face Extrude
- Inset
- Through and cavity-aware Through behaviour
- selection behaviour outside the requested task
- Extract
- Bridge
- Join
- Boolean workflows
- base/SubD export workflows

## Protected files / pins

- **Do not casually modify:** `src/multi-object-transform.js?v=0.36.1.0`
- **Do not casually update:** `styles.css?v=0.36.18.270`
- Treat mature Through behaviour as topology-sensitive and regression-prone.
- Treat Clean for SubD / Quad Clean as transactional: failed or invalid topology must not leave a partially modified mesh.
- Do not add a service worker unless the user explicitly asks for one.
- Avoid broad MutationObserver-style patches when a narrow event/module hook is possible.

Old-looking cache/version pins can be intentional. Verify before changing them.

## Current Clean for SubD guards

As of .319, `src/quad-clean-core.js` includes conservative quality limits including:

- bounded triangle patch size: up to 40 triangles
- edge/aspect-ratio guards
- normal/fold guards
- boundary-flow scoring against surrounding quads
- internal proposed-quad flow scoring
- aggregate patch-quality checks
- topology validation/rollback after the operation

Do not loosen these merely to make more geometry "clean". Prefer safe preservation over destructive repair.

## Confirmed user-facing tool surface in current index

Object:
- Join
- Clean for SubD

Vertex:
- Add
- Build Edge
- Slide
- Bevel
- Join
- Weld
- Delete

Edge:
- Loop
- Split
- Bevel
- Crease / Uncrease
- Edge Slide
- Offset Loop
- Bridge
- Fill
- Dissolve Loop
- Dissolve Edge
- Delete

Face:
- Extrude
- Inset
- Knife
- Extract
- Bridge
- Delete

Modifiers / scene:
- Mirror X/Y/Z
- SubD Preview
- Show Cage
- SubD levels 1–4
- editable/reference mesh import
- Base OBJ export
- SubD OBJ export

## Known watchouts

- The repository contains many deliberately version-pinned modules; do not normalize them wholesale.
- Clean for SubD is conservative by design. "No safe repairs found" can be a valid result.
- Any topology change should preserve history, object-manager synchronization, selection state where appropriate, and rollback safety.
- The README is older than the live application and must not be treated as the authoritative feature/version list.
- Deployment/cache-hop commits may follow a feature commit; distinguish the visible release feature from Pages/cache maintenance commits.

## Recent verified milestones

- **.315** — bounded local retopo extended to 34-triangle islands.
- **.316** — bounded local retopo extended to 36 triangles.
- **.317** — bounded local retopo extended to 38 triangles.
- **.318** — bounded local retopo extended to 40 triangles.
- **.319** — added internal proposed-quad flow coherence to patch scoring and exposed/released the result.

See `DEV_HISTORY.md` for the concise chronology.

## Start-next-session procedure

1. Re-read `AI_WORKFLOW.md`.
2. Re-check current `main` HEAD and visible app version.
3. Inspect any commits newer than the audited HEAD above.
4. Read the current user request.
5. Continue from the repo, not from remembered chat state.
6. Update these handoff files before finishing any code-changing session.
