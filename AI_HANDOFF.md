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

- Repository release: **v0.36.18.341**
- Current documentation HEAD before this final `AI_HANDOFF.md` update: **779ed8da4e6d9855d806c082ad9b86918475f158**
- Current code-bearing/release commit: **f04cbb2a92c7bc0a54155cc65d07e4f3a0cc1300**
- v0.36.18.341 release PR: **#25**
- Corrected PR topology regression: **35432049975** — success
- Current `version.json`: **0.36.18.341**
- Current main runtime pin remains: **main.js?v=0.36.18.326**
- Authoritative drawer loader pin: **drawer-ui.js?v=0.36.18.341**
- Offset Loop loader: **drawer-ui.js → loop-offset.js?v=0.36.18.340**
- Precision Offset Loop loader: **drawer-ui.js → precision-offset-loop.js?v=0.36.18.340**
- Edge paint selector pin: **edge-paint-select.js?v=0.36.18.340**
- Component Align loader: **drawer-ui.js → component-align.js?v=0.36.18.330**
- Component Circle loader: **drawer-ui.js → component-circle.js?v=0.36.18.341**
- Component Circle core: **component-circle-core.js?v=0.36.18.333**
- Existing Make Planar remains: **make-planar.js?v=0.36.18.93** via `face-workflow-layout.js`
- Precision Face implementation pin: **precision-face.js?v=0.36.18.327**
- Repeat Previous implementation pin: **repeat-face-previous.js?v=0.36.18.327**
- Current Add Vertex pin: **add-vertex-edge-snap.js?v=0.36.18.324**
- Current Clean for SubD pin: **quad-clean.js?v=0.36.18.339**
- Current component multi-select initializer pin: **component-multi-init.js?v=0.36.18.314**
- `styles.css` intentionally remains pinned at **v0.36.18.270**
- `src/multi-object-transform.js` intentionally remains pinned at **v0.36.1.0**
- Protected `src/multi-object-transform.js` git blob SHA: **0b6f676900bf9a3787cf420e276bbb0f57ac46ff**

Phase A remains frozen except for concrete regressions. The planned Phase B precision-modelling slice is complete through v0.36.18.340. Phase C — Object / instance workflow — is the next active focus.

## Latest completed development — v0.36.18.341

Theme: **Vertex Active Tools stability and Build Edge/Add handoff hotfix**.

User-visible regression fixed:
- tapping Build Edge on iPad no longer reshuffles the Vertex buttons
- Circle no longer jumps to the first row
- Add no longer re-lights when Build Edge is being armed

Protected Vertex toolbar baseline:
- fixed six-button order: **Bevel / Add / Build Edge / Slide / Create Face / Circle**
- `face-reconstruct.js` is the single Vertex layout owner
- stable layout sync must not physically re-append already-correct buttons
- Circle delegates Vertex placement to that owner
- Build Edge fully disarms both Add's wrapper session and underlying core Add direct-tool state before arming

Mandatory existing-feature audit result:
- BoxLab already had the support-loop construction capability
- the authoritative tool is **Offset Loop**
- Loop Cut and Bevel remain separate modelling operations
- no duplicate Support Loop button/tool was added

v0.36.18.340 improvements:
1. drag-finish Offset Loop validates topology before history commit
2. invalid drag results restore the pre-drag snapshot
3. exact-entry Offset Loop uses the same validate-before-commit / rollback discipline
4. the two created support rails are selected directly through the canonical Selection Bridge
5. the legacy hidden Multi control is no longer toggled off after support-loop creation
6. canonical additive Multi therefore remains active
7. while Offset Loop is armed, Edge paint selection yields its capture-phase Pencil handler
8. Offset Loop exposes one armed-state controller through `globalThis.__boxlabOffsetLoop`

Preserve this as the support-loop baseline. Future work should improve this implementation rather than introducing a second support-loop tool.

The v0.36.18.339 Clean sharp-fold guard remains protected:
- genuinely smooth all-quad regions may relax
- sharp incident normal breaks >30° remain protected even without an explicit Crease

Protected transform and Through systems remain untouched.

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
- Grid Fill
- Flip Edge
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

**Phase C — Object / instance workflow is next.**

Recommended next build:
- **linked-instance editing robustness + Make Unique audit**
- perform the mandatory existing-feature audit first across current instance/link/duplicate/object-management modules
- verify the current live behavior before relying on older .19.3/.19.4 history
- prefer repairing/consolidating the existing instance pathway rather than introducing a second instance model

Phase B completed precision slices:
- Add Vertex cross-object snapping (.324)
- component Move cross-object snapping (.325)
- live component Move ΔX/ΔY/ΔZ readback (.326)
- Repeat UI duplication corrected (.328)
- component Align X/Y/Z (.329)
- explicit pick-anchor Align workflow (.330)
- Circle regularize (.331–.336)
- Face Split restored under canonical additive Multi (.335)
- existing Rotate Edge consolidated as Flip Edge (.337)
- four-sided transactional all-quad Grid Fill (.338)
- Clean sharp-fold cave-in regression fixed (.339)
- transactional/Multi-safe Offset Loop support workflow (.340)
- Vertex toolbar / Build Edge handoff regression fixed (.341)

Keep existing Fill as the simple Cap and Grid Fill as the structured four-sided quad patch.

Do not reopen Phase A unless a concrete cleanup regression is reported.

## End-of-session requirement

Before finishing any future code-changing BoxLab session:
- rewrite this handoff to the resulting repo state
- append the milestone to `DEV_HISTORY.md`
- update `TEST_CHECKLIST.md` for newly stable behavior
- verify a brand-new chat could continue using only the repo and these files
