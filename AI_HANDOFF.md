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

- Repository release: **v0.36.18.345**
- Current documentation HEAD before this final `AI_HANDOFF.md` update: **a3310b62e7a499f64cbd4c5b0889001ab16e6139**
- Current code-bearing/release commit: **296c2742faff6734f9af422a5050918a700dceb4**
- v0.36.18.345 release PR: **#29**
- PR topology regression: **35437021036** — success
- Post-merge topology regression: **35436107413** — success
- Current `version.json`: **0.36.18.345**
- Current main runtime pin remains: **main.js?v=0.36.18.326**
- Authoritative drawer loader pin: **drawer-ui.js?v=0.36.18.344**
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

Phase A remains frozen except for concrete regressions. The planned Phase B precision-modelling slice is complete through v0.36.18.340. Phase C — Object / instance workflow — is active.

## Latest completed development — v0.36.18.345

Theme: **Safari native-selection interaction hardening**.

Protected iPad interaction baseline:
- BoxLab chrome and modelling surface must not become native Safari-selected during touch/Pencil work
- native long-press callout and browser drag-selection are suppressed on the app surface
- real editable controls remain selectable/editable
- existing touch-action / orbit / pan / pinch / Pencil gesture routing is unchanged
- guard lives in `src/app-interaction-guard.js`; do not duplicate this behavior elsewhere

Reference guide baseline:
- imported Reference meshes already participate in existing cross-object snapping
- no second reference/snap implementation exists or is needed
- every Reference object is permanently `locked=true`
- single-object Outliner lock control displays disabled **R**
- Multi and Group lock/unlock ignore Reference members and only operate on editable objects
- duplicated References remain Reference + locked
- Object scene Undo/Redo restore reasserts Reference locked state
- visibility and solo remain available
- visible References remain valid cross-object snap targets
- Reference objects remain excluded from Join and linked duplication
- editable-object lock behavior is unchanged

Linked-instance architecture from v0.36.18.343 remains protected.

Mandatory audit result:
- current main did not contain a live linked-instance implementation
- the old v0.36.19.x instance layer had been intentionally removed
- ordinary Duplicate in current main was already independent
- therefore v0.36.18.343 adds a new explicit linked path without changing ordinary Duplicate

Current linked-instance architecture:
- owned by the authoritative `multi-object.js` manager
- **Linked Duplicate** creates a shared-source peer
- **Make Unique** detaches only the active peer
- each linked object keeps its own world placement through `instanceMatrix`
- Object-mode transforms update placement only
- component edits update the shared local source and regenerate all linked peers
- placement solving is tested for both solid and planar meshes
- Outliner labels linked groups with `Link ×N`
- Object scene snapshots preserve `sourceId` and `instanceMatrix`
- Join always produces a unique result
- protected `multi-object-transform.js?v=0.36.1.0` remains untouched

User-visible UI baseline:
- File menu opens below the command bar and fits inside the available iPad viewport
- File menu scrolls internally if the available height is too small
- Face primary tools remain a stable 3-column grid: **Extrude / Inset / Knife**
- Join Coplanar wraps below instead of forcing a fourth column
- Face secondary tools remain a stable 3-column grid: **Extract / Duplicate / Bridge**
- Delete wraps below instead of creating a four-column row
- Face layout sync must not physically re-append already-correct buttons

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
- **stronger multi-object editing audit**
- inspect current Object Multi selection, transforms, Join/Boolean, grouping, duplication and any existing cross-object component-edit hooks before adding anything
- preserve the now-tested linked-instance manager and permanent Reference-guide contract
- prefer extending the authoritative Object/Multi pathway rather than adding a parallel multi-edit system

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
- File menu fit + stable 3-column Face layout (.342)
- linked-instance foundation + Make Unique (.343)
- permanent read-only Reference guide workflow (.344)
- Safari native-selection interaction guard (.345)

Keep existing Fill as the simple Cap and Grid Fill as the structured four-sided quad patch.

Do not reopen Phase A unless a concrete cleanup regression is reported.

## End-of-session requirement

Before finishing any future code-changing BoxLab session:
- rewrite this handoff to the resulting repo state
- append the milestone to `DEV_HISTORY.md`
- update `TEST_CHECKLIST.md` for newly stable behavior
- verify a brand-new chat could continue using only the repo and these files
