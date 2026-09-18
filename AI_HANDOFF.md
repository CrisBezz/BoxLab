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

- Repository release: **v0.36.18.323**
- Current documentation HEAD before this final `AI_HANDOFF.md` update: **a808a6a051ef8bc8bce492864e2afddbb070efca**
- Current code-bearing/release commit: **040e210bf2868a45791c35c9c1392bc1e6f244fe**
- v0.36.18.323 release PR: **#7**
- PR topology regression: **35406242201** — success
- Current `version.json`: **0.36.18.323**
- Current Clean for SubD cache pin: **quad-clean.js?v=0.36.18.323**
- Current component multi-select initializer pin: **component-multi-init.js?v=0.36.18.314**
- `styles.css` intentionally remains pinned at **v0.36.18.270**
- `src/multi-object-transform.js` intentionally remains pinned at **v0.36.1.0**
- Protected `src/multi-object-transform.js` git blob SHA: **0b6f676900bf9a3787cf420e276bbb0f57ac46ff**
- Persistent product roadmap: **ROADMAP.md**
- Only permanent workflow currently under `.github/workflows`: **through-regression.yml**

**Phase A is complete and frozen at v0.36.18.323.** Do not continue speculative Clean for SubD research or expand the 40-triangle envelope unless a concrete modelling failure or reproducible regression justifies reopening it.

## Latest completed development — v0.36.18.323

Theme: **Phase A final — transactional topology audit and cleanup freeze**.

The final Phase A release moves the safety contract into the Clean for SubD core itself.

New exported helper:
- `quadTopologyAudit(mesh)`

It detects:
- invalid face vertex references
- repeated vertices / zero edges
- collapsed edges
- duplicate faces
- non-manifold edges
- orphan crease references
- while treating valid open boundaries as valid topology

`quadCleanMesh(mesh)` now snapshots the original mesh and audits after:
1. local four-triangle retopo
2. sliver cleanup
3. bounded triangle-island solving
4. residual triangle-pair merge
5. guarded all-quad relaxation

If any stage fails or produces invalid topology, the original mesh is restored transactionally.

Regression coverage now also includes deterministic generated irregular triangulated-strip fixtures.

The **40-triangle cap, quality thresholds, acceptance guards, valence ranking and flow ranking are unchanged**.

This release closes the planned backend Clean for SubD development phase. Future work moves to Phase B precision modelling.

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

**Phase A is complete. The next active roadmap phase is Phase B — Precision Modelling.**

Before the next code change:
1. read `ROADMAP.md`
2. inspect current `main`
3. choose the highest-value Phase B item that can be added without destabilizing protected modelling behaviour

Current Phase B priority candidates:
- cross-object snapping
- precision drag/readback polish
- Repeat Previous audit/polish
- Align / Flatten component tools
- Circle / regularize selected components
- Edge Flip
- stronger structured Fill / Grid Fill / Cap workflows
- support-loop construction improvements

Do not reopen Clean for SubD merely to continue version increments. Reopen Phase A only for a concrete user-facing failure or reproducible topology regression.

The current modelling principle remains:

**direct Pencil interaction → precise topology-aware operation → validate → commit transactionally → preserve everything unrelated**

## End-of-session requirement

Before finishing any future code-changing BoxLab session:
- rewrite this handoff to the resulting repo state
- append the milestone to `DEV_HISTORY.md`
- update `TEST_CHECKLIST.md` for newly stable behavior
- verify a brand-new chat could continue using only the repo and these files
