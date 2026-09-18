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

- Visible/live release: **v0.36.18.319**
- Current documentation HEAD after this audit sequence: **79adf5517e65781f8b2def97e3d2d8a22511925a** before the final `AI_HANDOFF.md` documentation commit
- Current code-bearing HEAD: **a0a2d072acbf2e397ca68e2276fd75c8a1643846**
- Canonical .319 release commit: **68e45845f6696b3e66929ee4b181748b85d99b09**
- Canonical .319 final clean Pages marker: **4ed534dfe8697e54921a8a80d7b50945b6792342**
- .319 release workflow run: **35398314887** — success
- .319 live verifier run: **35398373581** — success
- Current `version.json`: **0.36.18.319**
- Current Clean for SubD cache pin: **quad-clean.js?v=0.36.18.319**
- Current component multi-select initializer pin: **component-multi-init.js?v=0.36.18.314**
- `styles.css` intentionally remains pinned at **v0.36.18.270**
- `src/multi-object-transform.js` intentionally remains pinned at **v0.36.1.0**
- Protected `src/multi-object-transform.js` git blob SHA: **0b6f676900bf9a3787cf420e276bbb0f57ac46ff**
- Only permanent workflow currently under `.github/workflows`: **through-regression.yml**

Important chronology note: after the canonical .319 release and verifier completed, the handoff system was added. Three later .319 commits — `51117f59...`, `a91ac689...`, and `a0a2d072...` — re-exposed/cache-hopped/tested the same .319 internal-flow state. They do **not** represent a newer numbered release.

## Latest completed development — v0.36.18.319

Theme: **Clean for SubD — internal proposed-quad flow coherence**.

The bounded triangle-island solver remains capped at **40 connected triangles**. .319 did not increase that cap. Instead it added scoring at the completed-patch stage so that, when multiple safe complete triangle-pair matchings exist, the solver prefers internally coherent proposed quad rows over zig-zag arrangements.

Current relevant constants in `src/quad-clean-core.js` include:

- `MAX_TRIANGLE_PATCH=40`
- `PATCH_FLOW_WEIGHT=.75`
- `PATCH_MAX_EDGE_RATIO=4`
- `PATCH_MAX_AVG_SCORE=Math.log(4)`
- `PATCH_MAX_BOUNDARY_FLOW=.65`
- `PATCH_BOUNDARY_WORST_WEIGHT=.5`
- `PATCH_INTERNAL_FLOW_WEIGHT=.5`

The .319 internal-flow helper is `quadPatchInternalFlowContext(mesh,pairs)`.

The internal-flow score:
- is evaluated only for a completed proposed quad patch
- compares opposite-edge directions across shared edges between proposed quads
- adds a conservative average-flow penalty to patch ranking
- does **not** change eligibility rules
- does **not** loosen quality thresholds
- does **not** move vertices
- does **not** rewrite surrounding existing quads
- preserves deterministic all-or-nothing complete matching

Regression coverage includes a fixture proving coherent neighboring proposed quads score better than a zig-zag arrangement.

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

There is **no unfinished .320 feature recorded in the repo**.

The .319 qualitative flow-coherence step is complete and released. On the next user `/nextbuild`:
1. inspect current `main` first
2. confirm version/live state
3. select the next conservative roadmap step from current code and user direction
4. do not automatically resume blind patch-cap expansion without evaluating whether a qualitative topology improvement is more valuable
5. preserve the .314 Face multi-select fix and all protected baselines

The current preferred development principle remains:

**detect → bounded enumerate → validate → score complete patch → commit only safe/better → otherwise leave untouched**

## End-of-session requirement

Before finishing any future code-changing BoxLab session:
- rewrite this handoff to the resulting repo state
- append the milestone to `DEV_HISTORY.md`
- update `TEST_CHECKLIST.md` for newly stable behavior
- verify a brand-new chat could continue using only the repo and these files
