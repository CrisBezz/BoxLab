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

- Repository release: **v0.36.18.320**
- Current documentation HEAD before this final `AI_HANDOFF.md` update: **c27fae6054ffcbce7227fc01bb7e236965ddfa21**
- Current code-bearing/release commit: **40e119774f39373ffadab22d0782428e8be7ea2c**
- v0.36.18.320 release PR: **#4**
- Corrected PR regression run: **35401945842** — success
- Post-merge topology regression run: **35401986107** — success
- Current `version.json`: **0.36.18.320**
- Current Clean for SubD cache pin: **quad-clean.js?v=0.36.18.320**
- Current component multi-select initializer pin: **component-multi-init.js?v=0.36.18.314**
- `styles.css` intentionally remains pinned at **v0.36.18.270**
- `src/multi-object-transform.js` intentionally remains pinned at **v0.36.1.0**
- Protected `src/multi-object-transform.js` git blob SHA: **0b6f676900bf9a3787cf420e276bbb0f57ac46ff**
- Only permanent workflow currently under `.github/workflows`: **through-regression.yml**
- GitHub Pages deployment is triggered from `main`; a documentation commit may supersede/cancel the preceding Pages run while the newest `main` deployment completes.

Chronology note: .319 was the internal proposed-quad flow-coherence release. .320 builds on that same 40-triangle bounded solver with valence-aware completed-patch ranking; it is not a patch-cap expansion.

## Latest completed development — v0.36.18.320

Theme: **Clean for SubD — smooth-interior valence-aware complete-patch ranking**.

The bounded triangle-island solver remains capped at **40 connected triangles**. .320 does not expand that envelope and does not relax the .319 quality gates.

The new helper is `quadPatchValenceContext(mesh,pairs)` with:

- `PATCH_VALENCE_WEIGHT=.25`

It evaluates a **completed proposed matching** after the existing pair, surrounding-flow, and internal-flow terms. For vertices touched by removed triangle diagonals, it considers only smooth interior vertices whose incident edges are manifold and uncreased. It estimates the resulting quad valence after those paired diagonals are removed and adds a small ranking penalty for deviation from valence 4.

Important safety property: the valence term is **ranking-only**. The pre-existing .319 quality score remains the score used by `PATCH_MAX_AVG_SCORE` and the other acceptance guards. Therefore .320 can select a better complete matching without making a previously unsafe patch eligible or rejecting a safe patch merely because of the new preference.

Current relevant constants in `src/quad-clean-core.js` include:

- `MAX_TRIANGLE_PATCH=40`
- `PATCH_FLOW_WEIGHT=.75`
- `PATCH_MAX_EDGE_RATIO=4`
- `PATCH_MAX_AVG_SCORE=Math.log(4)`
- `PATCH_MAX_BOUNDARY_FLOW=.65`
- `PATCH_BOUNDARY_WORST_WEIGHT=.5`
- `PATCH_INTERNAL_FLOW_WEIGHT=.5`
- `PATCH_VALENCE_WEIGHT=.25`

Regression coverage now proves:
- coherent neighboring proposed quads score better than zig-zag internal flow
- a matching that restores an eligible smooth interior vertex to quad valence 4 scores better than an under-resolved alternative
- vertices in a protected crease ring are excluded from valence regularity scoring

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

There is **no unfinished .321 feature recorded in the repo**.

The .320 valence-aware qualitative step is complete and merged. On the next user `/nextbuild`:
1. inspect current `main` first
2. confirm version and the newest Pages deployment state
3. select the next conservative roadmap step from current code and user direction
4. prefer another qualitative topology improvement over blind expansion of the 40-triangle cap
5. preserve the .314 Face multi-select fix and all protected baselines
6. keep new complete-patch preferences ranking-only unless there is explicit evidence that an acceptance guard should change

The current preferred development principle remains:

**detect → bounded enumerate → validate → score complete patch → commit only safe/better → otherwise leave untouched**

## End-of-session requirement

Before finishing any future code-changing BoxLab session:
- rewrite this handoff to the resulting repo state
- append the milestone to `DEV_HISTORY.md`
- update `TEST_CHECKLIST.md` for newly stable behavior
- verify a brand-new chat could continue using only the repo and these files
