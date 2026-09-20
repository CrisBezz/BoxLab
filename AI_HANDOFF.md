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

- Repository release: **v0.36.18.363**
- Current documentation HEAD before this final `AI_HANDOFF.md` update: **7422482f6e7210db6aa9932360c4136d0f32f8ab**
- Current code-bearing/release commit: **4f0441660512c4eacf557320d8a5f935b931243e**
- v0.36.18.363 release PR: **#47**
- PR topology regression: **merged successfully; connector does not expose the Actions check run ID**
- Post-merge topology regression: **not separately verified through the connector in this session**
- Current `version.json`: **0.36.18.363**
- Current main runtime pin remains: **main.js?v=0.36.18.326**
- Authoritative drawer loader pin: **drawer-ui.js?v=0.36.18.361**
- Offset Loop loader: **drawer-ui.js → loop-offset.js?v=0.36.18.340**
- Precision Offset Loop loader: **drawer-ui.js → precision-offset-loop.js?v=0.36.18.340**
- Object management loader: **object-management.js?v=0.36.18.361**
- Boolean A/B UX pin: **boolean-ux-history.js?v=0.36.18.348**
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

## Latest completed development — v0.36.18.363

Theme: **linked copies are born linked before first activation**.

Critical fix:
- `linkedDuplicateObject()` no longer creates a normal object and patches link metadata afterward
- `addObject()` now accepts `sourceId`, `instanceMatrix` and `origin` at creation time
- linked copies therefore enter activation/rendering with their shared source + placement already valid
- linked duplicate of a linked duplicate follows the same source and should propagate edits
- .362 source × matrix regeneration remains authoritative for active/inactive linked rendering

Target regressions:
- second-generation linked duplicate not propagating edits
- finger-selecting another object causing linked copies to vanish from viewport while remaining in Outliner

Protected behavior:
- Group baseline remains `object-origin.js?v=0.36.18.355`
- compact Outliner / SubD row toggle / contextual Origin-Pivot unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.362

Theme: **linked instances keep independent placement while sharing geometry**.

Critical fix:
- moving and editing one linked instance no longer permits stale evaluated world meshes to become authoritative
- Object-mode save first tries to recover placement from shared source → live mesh
- if that fails, the live mesh is treated as a shared geometry edit under the existing instanceMatrix
- shared source is updated in local coordinates and every peer is regenerated from source × its own instanceMatrix
- selecting a linked peer regenerates its active world mesh from source × instanceMatrix
- inactive linked rendering does the same

Intended invariant:
- geometry edits propagate to linked peers
- object placement does not
- switching active peer must never collapse instances onto one another

Protected behavior:
- Group baseline remains `object-origin.js?v=0.36.18.355`
- compact Outliner, SubD row toggle and contextual Origin/Pivot remain unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.361

Theme: **per-object SubD control in the compact Outliner**.

User-facing behavior:
- editable Object rows now show **Name / S / Visibility / More**
- S is lit when that object's existing SubD Preview is enabled
- tap S to toggle SubD for that object without opening Modifiers
- inactive objects can be toggled without becoming active
- active-object S stays synchronized with the existing Modifiers > SubD Preview checkbox
- Reference rows cannot enable SubD

Implementation principle:
- no second SubD system was added
- existing `object.settings.subd`, `subdLevel`, `displayMeshFor()` and main SubD controls remain authoritative
- each toggle participates in Object scene history

Protected behavior:
- contextual Origin/Pivot UI from .360 unchanged
- Group selection/transform baseline remains `object-origin.js?v=0.36.18.355`
- linked instances, Boolean behavior and Reference protection unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.360

Theme: **contextual Object-mode controls**.

UI behavior:
- single-object selection shows compact Origin presets and hides Pivot controls
- Multi / whole-Group selection shows compact Pivot controls and hides Origin presets
- Object Selection actions are tightened into a five-button strip with a compact status line
- all existing control IDs and handlers remain authoritative

Protected behavior:
- no changes to Origin/Pivot transform maths
- no changes to Group selection or Group Move/Rotate/Scale
- `object-origin.js?v=0.36.18.355` remains the protected Group transform baseline
- compact Outliner / upward popovers / Delete shortcut remain unchanged
- linked instances, Boolean behavior and Reference protection unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.359

Theme: **restore discoverable Delete + hardware keyboard shortcut**.

User-facing behavior:
- every object-row More menu includes **Delete Object**
- Object-mode hardware keyboard **Delete** and **Backspace** trigger the authoritative Delete action
- keyboard Delete respects existing single / Multi / whole-Group selection behavior
- Delete/Backspace is ignored while typing in Rename or other editable fields
- row-level Delete and global Delete each create one history step, not two

Roadmap addition:
- future **Group Boolean convenience**: two complete Groups can become temporary compound operands by reusing Join → Boolean internally; original Groups remain intact for history/Undo

Protected behavior:
- compact Outliner + upward popovers unchanged
- `object-origin.js?v=0.36.18.355` remains the protected Group transform baseline
- linked instances, Boolean behavior and Reference protection unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.358

Theme: **Safari-resistant upward Outliner popovers**.

- Object, Group and footer More menus are now anchored at the trigger top and translated upward by their own height.
- This replaces the .357 `bottom:` approach, which Safari/iPad still rendered downward for Group More.
- Positioning is enforced with explicit `top:0 !important`, `bottom:auto !important` and upward transform.
- No functional Object/Group behavior changed.
- Protected `object-origin.js?v=0.36.18.355` and `multi-object-transform.js?v=0.36.1.0` remain untouched.

## Previous completed development — v0.36.18.357

Theme: **upward Outliner popovers**.

User-facing polish:
- Object row More menus open upward from the dots
- Group row More menus open upward from the dots
- bottom Object action More menu opens upward
- prevents Lock / Solo / Rename / Delete / Linked Duplicate / Make Unique menus from being clipped by the drawer bottom

Protected behavior:
- no changes to Group selection or transform behavior
- `object-origin.js?v=0.36.18.355` remains the protected Group transform baseline
- compact Outliner structure from .356 unchanged
- linked instances, Boolean behavior and Reference protection unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.356

Theme: **compact Outliner polish on the protected .355 Group baseline**.

Object scene-tree:
- object rows now show **Name / Visibility / More**
- Lock/Unlock and Solo/Exit Solo moved into the object's More menu
- existing behavior is reused; no parallel action system was added

Group scene-tree:
- Group rows now show **Disclosure / Name / Visibility / More**
- Group More contains Lock/Unlock, Rename Group and Ungroup
- selected Group amber treatment, whole-Group context and Group transforms are unchanged from .355

Object action footer:
- permanent footer reduced to **Add / Duplicate / More**
- existing Rename / Linked Duplicate / Make Unique / Delete controls are moved into More
- original button IDs and event handlers are preserved, including Multi enable/disable behavior

Protected behavior:
- .355 Group selection/transform routing is the protected baseline
- `object-origin.js?v=0.36.18.355` intentionally remains pinned
- amber whole-Group and amber/blue ordinary Multi viewport cues unchanged
- focused Rename and compact naming unchanged
- linked instances and Reference protection unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.355

Theme: **whole-Group transform routing repair**.

Critical functional fix:
- a whole selected Group is now recognised as a grouped Move context even when all members are already selected
- `object-origin.js` no longer requires expansion to add extra IDs before Group Move engages
- the legacy selection wrapper now forwards `wholeGroupId`, so viewport Group tint and transform routing see the same context
- grouped Move continues through the existing group-aware origin/pivot transform pathway
- protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched

Cache correction:
- `object-origin.js` was still pinned at .351 inside `drawer-ui.js`
- refreshed to `object-origin.js?v=0.36.18.355`
- refreshed surrounding Object management / drawer / release pins for Safari/iPad

Expected user-facing state:
- Group header selected = Group context
- grouped objects all amber in viewport
- Move/Rotate/Scale acts on the whole Group
- no amber/blue split while exactly one whole Group is selected
- ordinary two-object Multi selection remains amber/blue

## Previous completed development — v0.36.18.354

Theme: **whole-Group visual selection context**.

User-facing fix:
- selecting a Group no longer leaves an unrelated previously active object visually highlighted
- if the current active object is outside the selected Group, an editable Group member becomes the hidden primary
- the whole selected Group is tinted amber in the viewport
- the selected Group header gets amber emphasis
- Group child rows suppress stale individual active/selection emphasis
- the hidden primary member's Object cage/verts/mirror-edge overlays are suppressed while whole-Group context is active
- renderer-level suppression prevents the cage from reappearing during Group Move/Rotate/Scale refreshes
- leaving Group context restores normal single-object cage behavior
- ordinary two-object Multi selection still uses amber primary + blue secondary

Protected behavior:
- authoritative Group ownership unchanged
- Group transform expansion unchanged
- compact hierarchy and focused Rename unchanged
- duplicate numbering / Boolean B-numbering unchanged
- linked instances and Reference protection unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.353

Theme: **focused Rename + live Group header reconciliation**.

Rename behavior:
- Object Rename uses a BoxLab-native modal input rather than `window.prompt`
- input opens focused with the current name selected, so typing immediately replaces it
- iPad/Safari gets immediate + animation-frame + short delayed focus/select attempts
- Enter confirms; Escape/Cancel dismisses
- Group Rename uses the same dialog

Group hierarchy fix:
- existing compact Group blocks are reconciled on Object UI refresh
- visible Group name now updates immediately after rename
- collapse, visibility and lock indicators are also refreshed from current state
- stale/invalid Group blocks are unwrapped so hierarchy changes can rebuild cleanly
- Group Rename still checkpoints authoritative Object scene history once

Protected behavior:
- authoritative Group ownership unchanged
- compact Group hierarchy unchanged
- amber/blue two-object scene cue unchanged
- duplicate numbering and Boolean B-numbering unchanged
- linked instances and Reference protection unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.352

Theme: **two-object selection colour cue + compact naming**.

Selection feedback:
- exactly two selected objects in Object mode are tinted in the viewport
- active / primary = amber
- second selected = blue
- this is a general Multi-selection cue, not a Boolean-only cue
- the Outliner remains neutral; generic A/B row borders and badges stay removed

Naming:
- ordinary Duplicate uses padded numbers: `Cube 01`, `Cube 02`, ...
- duplicating a numbered sibling continues the same base-name family
- Linked Duplicate and Multi Duplicate use the same allocator
- Boolean results use compact active/base stem + `B1`, `B2`, ... rather than long operand-concatenated names

Protected behavior:
- authoritative Group ownership from .351 unchanged
- compact Group hierarchy unchanged
- Boolean geometry/history behavior unchanged
- linked-instance behavior unchanged
- Reference protection unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.351

Theme: **authoritative Group ownership + Boolean UI decoupling**.

Critical bug fixed:
- legacy `object-origin.js` was still mutating group membership and only adding per-object `G#` tags
- the newer Object Management hierarchy was not notified, so Group Selection could appear to do nothing
- Object Management now owns Group/Ungroup mutation and hierarchy refresh in one pathway
- legacy origin/transform code delegates Group/Ungroup and no longer owns visible group tags

Boolean UI cleanup:
- generic two-object Multi selection is now visually neutral
- no automatic amber/blue Outliner borders/badges
- no automatic viewport A/B tint
- no Boolean drawer forcing itself open merely because two objects are selected
- Boolean A/B names remain inside the Boolean operand controls; Boolean geometry behavior is unchanged

Protected behavior:
- compact Group hierarchy from .350 preserved
- first-class Group selection / Rename preserved
- Group metadata history preserved
- automatic Group transforms preserved
- linked instances and Reference protection preserved
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.350

Theme: **compact Group tree UX**.

User-facing change:
- Grouping no longer consumes a permanent management strip in the Object drawer
- existing Groups are represented as compact scene-tree rows: disclosure / name / visibility / lock / More
- children are tightly indented beneath the Group header
- More contains Rename Group + Ungroup
- Group Selection only appears contextually when 2+ selected objects can form a new Group
- fully selected Groups still use the first-class selection / Rename Group model from .349

History consistency:
- group visibility checkpoints Object scene history
- group lock checkpoints Object scene history
- direct Ungroup continues through the existing authoritative group action/history route
- collapse is UI presentation state, not treated as a modelling history action

Protected behavior:
- automatic Group transform expansion unchanged
- linked-instance behavior unchanged
- Reference guides remain permanently read-only
- Group metadata persistence from .348 unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.349

Theme: **first-class Group selection UX**.

User-facing issue:
- selecting a Group selected all members but left normal Object Rename disabled
- Group controls felt split between the Outliner header and normal Object actions

v0.36.18.349 behavior:
- exactly one fully selected Group is detected as a Group context
- normal Object **Rename** enables and changes to **Rename Group**
- Group Rename uses the existing metadata/history pathway
- partial or mixed Multi selections remain ordinary Multi and cannot masquerade as a Group
- selection readout shows the Group name + member count
- selected Group header receives stronger visual emphasis
- group name remains the primary tap target
- header actions are now Collapse / Name / Visibility / Lock / Ungroup; old tiny rename pencil is removed
- existing Group transform expansion, linked-instance behavior and Reference protection are unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched

## Previous completed development — v0.36.18.348

Theme: **persistent Group organization**.

Mandatory audit result:
- Group membership and transform expansion already existed in `object-origin.js`
- grouped Outliner hierarchy, custom names and collapse UI already existed in `object-management.js`
- the real gap was persistence: Object scene snapshots stored each object's `groupId` but not the group's custom name or collapsed state
- no second grouping, hierarchy, or transform system was added

v0.36.18.348 behavior:
- Object scene snapshots now include custom group names and collapsed group IDs
- Undo/Redo restores group metadata only for groups present in the restored scene
- stale group metadata is pruned when groups genuinely disappear
- group Rename creates one Object scene-history checkpoint
- existing Group membership, whole-group transforms, linked-instance behavior and Reference protection remain unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched
- Safari/iPad cache chain refreshed through `object-management.js → drawer-ui.js → index.html`

Regression coverage protects metadata snapshot/restore, rename history, stale metadata cleanup and the protected transform pin.

## Previous completed development — v0.36.18.347

Theme: **Join / Boolean scene-history consolidation**.

Mandatory audit result:
- existing Join already lives in Object > Active Tools and already checkpoints through the authoritative Object scene-history bridge
- existing Boolean already checkpoints that same Object scene before creating the result
- `boolean-ux-history.js` still contained an older second Undo/Redo wrapper and private Boolean history stacks
- no second Join, Boolean, result-management, or transform system was added

v0.36.18.347 behavior:
- removed the legacy parallel Boolean Undo/Redo wrapper
- Join and Boolean now rely on one authoritative Object scene-history pathway
- Boolean A/B colours, active/base labels, Swap control, solver dispatch and cleanup chain are unchanged
- Boolean still hides only selected A/B originals and creates a new unique editable result
- Boolean results do not inherit `sourceId` / `instanceMatrix` even when an operand was linked
- unselected linked peers remain untouched
- Object Undo/Redo restores linked metadata/placements from scene snapshots
- Reference objects remain excluded from both Join and Boolean
- protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched

Regression coverage now protects single history ownership plus Boolean linked-instance/Reference contracts.

## Previous completed development — v0.36.18.346

Theme: **Object Multi linked-instance parity**.

Stronger-Multi audit result:
- Object Multi Move / Scale / Rotate already existed
- numeric transforms and pivot modes already existed
- grouping, ordinary Multi Duplicate, Join and Boolean already existed
- protected `multi-object-transform.js?v=0.36.1.0` remains authoritative and unchanged
- no second multi-transform layer was added

v0.36.18.346 Multi link behavior:
- with Object Multi active, the existing **Linked Duplicate** control duplicates every selected editable object as a linked peer
- Reference guides are skipped
- duplicated group relationships are recreated in a new group set
- newly created linked copies become the current Multi selection
- with Object Multi active, the existing **Make Unique** control detaches every selected linked object in one history step
- ordinary Duplicate / Multi Duplicate remain independent
- single-object Linked Duplicate / Make Unique behavior from .343 remains unchanged

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

**Phase C — Object / instance workflow remains active.**

Recommended next build:
- **user-test .363 linked creation lifecycle first**
- make Linked Duplicate A → B, then Linked Duplicate B → C
- move A / B / C apart
- edit geometry on B or C and verify A / B / C all update
- finger-select an unrelated object and verify all linked peers remain visible
- repeatedly switch active object between A / B / C and unrelated objects
- verify Make Unique still detaches only the chosen peer
- preserve `object-origin.js?v=0.36.18.355` unless a concrete Group regression requires changing it
- do not touch protected `src/multi-object-transform.js?v=0.36.1.0`

Do not continue UI polish until linked-instance lifecycle is confirmed stable.

## End-of-session requirement

Before finishing any future code-changing BoxLab session:
- rewrite this handoff to the resulting repo state
- append the milestone to `DEV_HISTORY.md`
- update `TEST_CHECKLIST.md` for newly stable behavior
- verify a brand-new chat could continue using only the repo and these files
