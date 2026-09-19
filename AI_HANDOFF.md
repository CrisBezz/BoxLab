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

- Repository release: **v0.36.18.330**
- Current documentation HEAD before this final `AI_HANDOFF.md` update: **9ee09e46e88f289255cbc9c3eca244f14fdff9c9**
- Current code-bearing/release commit: **e5ee279298b14cca76cbca5274c10f6a2484e802**
- v0.36.18.330 release PR: **#14**
- PR topology regression: **35415067002** — success
- Current `version.json`: **0.36.18.330**
- Current main runtime pin remains: **main.js?v=0.36.18.326**
- Component Align loader: **drawer-ui.js → component-align.js?v=0.36.18.330**
- Component Align core: **component-align-core.js?v=0.36.18.330**
- Existing Make Planar remains: **make-planar.js?v=0.36.18.93** via `face-workflow-layout.js`
- Precision Face implementation pin: **precision-face.js?v=0.36.18.327**
- Repeat Previous implementation pin: **repeat-face-previous.js?v=0.36.18.327**
- Current Add Vertex pin: **add-vertex-edge-snap.js?v=0.36.18.324**
- Current Clean for SubD pin: **quad-clean.js?v=0.36.18.323**
- Current component multi-select initializer pin: **component-multi-init.js?v=0.36.18.314**
- `styles.css` intentionally remains pinned at **v0.36.18.270**
- `src/multi-object-transform.js` intentionally remains pinned at **v0.36.1.0**
- Protected `src/multi-object-transform.js` git blob SHA: **0b6f676900bf9a3787cf420e276bbb0f57ac46ff**

Phase A remains frozen at v0.36.18.323. Phase B — Precision Modelling — is active.

## Latest completed development — v0.36.18.330

Theme: **explicit component Align anchor workflow**.

Workflow:
1. multi-select the Vertex / Edge / Face components to align
2. tap Align X, Align Y or Align Z
3. BoxLab enters a short anchor-pick state
4. tap one already-selected component to keep fixed
5. all other selected component vertices align to that anchor component's centre coordinate on the chosen axis

Anchor behavior:
- Vertex anchor uses that vertex coordinate directly
- Edge anchor uses the edge centre coordinate on the chosen axis
- Face anchor uses the face centre coordinate on the chosen axis
- anchor component vertices remain unchanged
- selected movable geometry keeps the normal selection colour
- anchor gets a temporary amber/orange reference cue matching the Boolean A/base visual language (`#f3b34a`)

Important:
- existing Make Planar remains unchanged and distinct
- Object mode remains excluded
- selection remains preserved after alignment
- operation is one Undo step
- `src/multi-object-transform.js?v=0.36.1.0` remains untouched

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
   - **.323 per-stage topology audit + transactional core rollback**
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

**Phase B — Precision Modelling remains active.**

Completed precision slices:
- Add Vertex cross-object snapping (.324)
- component Move cross-object snapping (.325)
- live component Move ΔX/ΔY/ΔZ readback (.326)
- Repeat UI duplication corrected (.328)
- component Align X/Y/Z (.329)
- explicit pick-anchor Align workflow with amber reference cue (.330)

Recommended next build:
- **Circle / regularize selected components**, but perform the mandatory existing-feature audit first for circle / regularize / relax / spacing equivalents

Other Phase B priorities remain:
- Edge Flip
- stronger structured Fill / Grid Fill / Cap workflows
- support-loop construction improvements

Do not reopen Phase A unless a concrete cleanup regression is reported.

## End-of-session requirement

Before finishing any future code-changing BoxLab session:
- rewrite this handoff to the resulting repo state
- append the milestone to `DEV_HISTORY.md`
- update `TEST_CHECKLIST.md` for newly stable behavior
- verify a brand-new chat could continue using only the repo and these files
