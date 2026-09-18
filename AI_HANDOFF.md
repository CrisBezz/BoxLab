# BoxLab — AI Development Handoff

## Read this first

This is the living current-state handoff for BoxLab.

Before changing code:
1. read `AI_WORKFLOW.md`
2. read this file completely
3. read `TEST_CHECKLIST.md`
4. read the newest relevant entries in `DEV_HISTORY.md`
5. inspect current `main`

The repository is authoritative. If anything here conflicts with current `main`, reconcile this file before coding.

## Project

- Repository: `CrisBezz/BoxLab`
- Production branch: `main`
- Live app: https://crisbezz.github.io/BoxLab/
- Frozen Beta 2: https://crisbezz.github.io/BoxLab/beta-2/
- Product: iPad-first touch/Pencil polygon modeller and Nomad Sculpt companion.

## Current audited repository state

Audited from current `main` on 2026-09-19.

- Repository release: **v0.36.18.322**
- Current documentation HEAD before this final `AI_HANDOFF.md` update: **cdcc90e85dc53a98fde943e11a5b0774695c675f**
- Current code-bearing/release commit: **0f03befbb7d69ca53194536579c240a993efd9ff**
- v0.36.18.322 release PR: **#6**
- PR topology regression: **35404138276** — success
- Current `version.json`: **0.36.18.322**
- Current Clean for SubD cache pin: **quad-clean.js?v=0.36.18.322**
- Current component multi-select initializer pin: **component-multi-init.js?v=0.36.18.314**
- `styles.css` intentionally remains pinned at **v0.36.18.270**
- `src/multi-object-transform.js` intentionally remains pinned at **v0.36.1.0**
- Protected `src/multi-object-transform.js` git blob SHA: **0b6f676900bf9a3787cf420e276bbb0f57ac46ff**
- Only permanent workflow currently under `.github/workflows`: **through-regression.yml**

Chronology note: .319 added internal proposed-quad flow coherence. .320 added average interior valence regularity. .321 added worst-local valence regularity. .322 now adds worst-local internal proposed-quad flow regularity, still within the same 40-triangle bounded solver and without relaxing acceptance.

## Latest completed development — v0.36.18.322

Theme: **Clean for SubD — worst-local internal proposed-quad flow ranking**.

The bounded triangle-island solver remains capped at **40 connected triangles**. .322 does not expand that envelope and does not change any .321 eligibility or acceptance threshold.

The internal flow ranking now uses:
- `PATCH_INTERNAL_FLOW_WEIGHT=.5`
- `PATCH_INTERNAL_WORST_WEIGHT=.1`

The new helper `quadInternalFlowPenalty(flows)` returns:
- average internal flow mismatch
- worst local internal flow mismatch
- the existing average-only `penalty` used by the quality/acceptance score
- a `rankingPenalty` that adds the small worst-local term only for comparing safe complete matchings

This prevents a single badly aligned proposed quad junction from being diluted by several coherent internal junctions when two candidate patches have the same average internal-flow mismatch.

Important safety property: `qualityScore` still uses only `internal.penalty`; the new `internal.rankingPenalty` affects patch selection only.

Regression coverage proves that equal-average flow distributions keep the same acceptance penalty while the alternative with lower worst local mismatch receives the better ranking.

## Current Clean for SubD pipeline

1. **Four-triangle center-fan repair**
   - conservative local repair
   - guarded manifold/crease/normal/fold/aspect checks

2. **Sliver cleanup**
   - conservative short smooth interior triangle-edge collapse
   - only commits demonstrably safe improvements

3. **Bounded even triangle-island complete matching**
   - connected triangle-only components
   - bounded up to **40 triangles**
   - complete matching required
   - no stranded triangles
   - surrounding quad-flow scoring
   - aggregate patch-quality guard
   - worst-boundary mismatch guard
   - **.319 internal proposed-quad flow-coherence scoring**
   - **.320 smooth-interior valence-aware completed-patch ranking**
   - **.321 worst-local valence-aware completed-patch ranking**
   - **.322 worst-local internal-flow-aware completed-patch ranking**
   - no vertex movement
   - no surrounding-quad rewrite
   - rejected patches remain untouched

4. **Residual safe triangle-pair merge**
   - same surrounding-flow and quality context
   - conservative non-overlapping merge

5. **Guarded all-quad tangent relaxation**
   - safe interior vertices only
   - boundary/crease/non-quad protections
   - commits only when flow improves

The user-facing wrapper validates topology and rolls back invalid results transactionally.

## Important recent selection fix — v0.36.18.314

A regression caused Face multi-select not to work immediately after startup; switching away from Face mode and back made it work.

The fix is `src/component-multi-init.js?v=0.36.18.314`.

It initializes intended additive component multi-selection for Face/Edge/Vertex and restores that state after relevant mode/tool handoffs.

**Protect this behavior.** Fresh-load Face multi-select must work without requiring a mode cycle first.

## Protected interaction baseline

Preserve unless the user explicitly requests otherwise:

- one-finger orbit
- two-finger pan
- pinch zoom
- two-finger tap Undo
- three-finger tap Redo
- no-jump orbit pivot
- persistent selections during navigation
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
- Through, including cavity-aware Through
- Extract
- Bridge
- Join
- Boolean workflows
- Base/SubD export workflows

## Protected files / pins

- **Never casually edit:** `src/multi-object-transform.js?v=0.36.1.0`
- Expected protected blob SHA: `0b6f676900bf9a3787cf420e276bbb0f57ac46ff`
- **Do not casually update:** `styles.css?v=0.36.18.270`
- Preserve `component-multi-init.js?v=0.36.18.314` unless intentionally changing component-selection startup.
- Mature Through behavior is topology-sensitive and regression-prone.
- Clean for SubD must remain transactional.
- No service worker.
- Avoid broad MutationObservers when a narrow module/event hook is possible.
- Old-looking cache pins may be intentional.

## Current user-facing modelling surface

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

Scene / modifiers:
- Mirror X/Y/Z
- SubD Preview
- Show Cage
- SubD levels 1–4
- editable/reference mesh import
- Base OBJ export
- SubD OBJ export

## Known watchouts

- The README is older than the live application; do not use it as the authoritative feature/version source.
- Many module cache pins are deliberately old/frozen.
- Clean for SubD is intentionally conservative; “no safe repairs found” can be correct.
- Preserve history/object-manager/selection synchronization around topology commits.
- Failed topology operations must restore the pre-operation mesh.
- Distinguish release commits from later cache-hop, Pages-marker, or handoff-documentation commits.
- Do not infer a new release number just because current `main` has commits after the canonical release commit.

## Next development step

There is **no unfinished .323 feature recorded in the repo**.

The .322 worst-local internal-flow ranking step is complete and merged. On the next user `/nextbuild`:
1. inspect current `main`
2. confirm version/live deployment state
3. choose another conservative qualitative topology improvement
4. preserve the 40-triangle envelope unless there is specific evidence that expansion is needed
5. preserve the .314 Face multi-select fix and all protected baselines
6. keep complete-patch preference terms ranking-only unless there is explicit evidence for changing acceptance

The current preferred development principle remains:

**detect → bounded enumerate → validate → score complete patch → commit only safe/better → otherwise leave untouched**

## End-of-session requirement

Before finishing any future code-changing BoxLab session:
- rewrite this handoff to the resulting repo state
- append the milestone to `DEV_HISTORY.md`
- update `TEST_CHECKLIST.md` for newly stable behavior
- verify a brand-new chat could continue using only the repo and these files
