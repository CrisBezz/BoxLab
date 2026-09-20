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
- Frozen Beta 3: https://crisbezz.github.io/BoxLab/beta-3/
- Product: iPad-first touch/Pencil polygon modeller and Nomad Sculpt companion.

## Current audited repository state

Audited from current `main` on 2026-09-20.

- Frozen release checkpoint: **v0.36.18.371 — Beta 3**
- Current live development build: **v0.36.18.377 — closed-solid Shell with selected-face openings**
- Current documentation HEAD: **post-v0.36.18.372 merge documentation; see latest main**
- Current live code-bearing commit: **77eab5bb8e441f5ce93801963c432dcf2f12bd86**
- Frozen Beta 3 code-bearing/release commit: **c17fb0f996f406449975a1add5b774eadc30e529**
- v0.36.18.371 release PR: **#54**
- Previous v0.36.18.372 PR: **#56**
- Previous v0.36.18.373 PR: **#57**
- Previous v0.36.18.374 PR: **#58**
- Previous v0.36.18.375 PR: **#59**
- Current v0.36.18.376 PR: **#60**
- Current PR regression / CI status: **PASS — Topology regression / `npm test`, workflow run 35506658206**
- Release regression / CI status: **PASS — PR #54 Topology regression / `npm test`, workflow run 35495835508**
- User hands-on release gate: **PASS**
- Beta 3 freeze PR: **#55**
- Beta 3 freeze merge commit: **a227042e2bd2972c96361aedf7840bdcc62c78bb**
- Current `version.json`: **0.36.18.377**
- Current Phase D loaders: **solidify.js?v=0.36.18.377** → `solidify-core.js?v=0.36.18.374`; **shell.js?v=0.36.18.377** → `shell-core.js?v=0.36.18.377` → shared Solidify core
- Current main runtime pin: **main.js?v=0.36.18.366**
- Authoritative drawer loader pin: **drawer-ui.js?v=0.36.18.361**
- Offset Loop loader: **drawer-ui.js → loop-offset.js?v=0.36.18.340**
- Precision Offset Loop loader: **drawer-ui.js → precision-offset-loop.js?v=0.36.18.340**
- Object management loader: **object-management.js?v=0.36.18.368**
- Boolean A/B UX pin: **boolean-ux-history.js?v=0.36.18.369**
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

Phase A remains frozen except for concrete regressions. Phase B precision modelling is complete. Phase C Object / instance workflow reached the Beta 3 checkpoint. **Phase D — higher-level modelling features — is now active.**

## Latest completed development — v0.36.18.377

Theme: **closed-solid Shell with selected Face openings**.

- Added Face > Active Tools > **Shell** as the closed-solid companion to Object > Solidify.
- Shell uses the authoritative Face selection bridge already used by Extract/Duplicate.
- One or more selected Faces are removed as openings; the remaining closed-solid skin is compacted into an open sheet and passed through the existing .374 Solidify offset engine.
- Thickness offsets inward using the same hard-fold plane-intersection/miter solver already proven by Solidify.
- Adjacent selected Faces can form a larger connected opening.
- Input must be a closed manifold solid; open sheets, loose topology, empty selections and selecting every Face are refused before live mutation.
- Shell preview is non-destructive and uses **Shell Thickness** before **Apply Shell** commits.
- Apply Shell owns one Object scene-history checkpoint, saves through Object Manager, clears stale Face selection after compaction, and validates the final result as closed/manifold.
- Active Tools uses the same keep-open contract during Shell preview so Apply Shell stays accessible.
- Frozen Beta 3 remains untouched.

## Previous completed development — v0.36.18.376

Theme: **keep Active Tools available throughout interactive Solidify**.

- User reported Active Tools collapsing during direct thickness drag, making **Apply Solidify** inaccessible.
- Solidify now claims the drawer system's existing `data-keep-open="true"` contract for the whole preview session.
- The Active Tools drawer is explicitly opened when Solidify preview is armed.
- If another UI path tries to close it while preview remains armed, a toggle guard immediately reopens it.
- The temporary keep-open ownership is released only after Apply, Cancel, object/mode invalidation, or unload.
- Existing `drawer-ui.js?v=0.36.18.361` is untouched; this is a narrow Solidify-side fix.
- Direct thickness drag, slider synchronization, .374 hard-fold core, navigation protection, and one-step Apply history are unchanged.

## Previous completed development — v0.36.18.375

Theme: **direct-manipulation Solidify thickness**.

- Solidify preview remains non-destructive, but Thickness can now be adjusted directly in the viewport.
- Pencil/finger down on the translucent generated shell ray-picks the preview surface.
- Drag distance is projected onto that picked face's screen-space normal, giving a spatial thicker/thinner gesture rather than a generic vertical slider gesture.
- During direct thickness drag only, OrbitControls is temporarily disabled; release/cancel restores its previous enabled state.
- Preview rebuilds continuously while dragging and the existing Thickness slider/output stays synchronized as the exact-value fallback.
- Preview now shows only generated geometry (inner shell + boundary walls), leaving the source sheet visually distinct underneath.
- Direct drag clamps to the existing Thickness control range and does not create history.
- Apply Solidify remains the sole commit and remains one Object-scene history step.
- The .374 hard-fold plane-intersection solver is unchanged.

## Previous completed development — v0.36.18.374

Theme: **Solidify hard-fold correctness + pre-commit thickness preview**.

- Replaced averaged-vertex-normal thickness at hard folds with offset-plane intersection / miter solving.
- A 90° two-face fold now preserves the full requested thickness to both source planes instead of under-offsetting the inside corner diagonally.
- Single-plane regions still offset normally; two-plane folds use an exact two-plane solution; multi-plane corners use a least-squares plane intersection with conservative singular/excessive-miter guards.
- Solidify is now two-stage: tap **Solidify** to arm a non-destructive translucent preview, drag **Thickness** to update the preview live, then tap **Apply Solidify** to commit.
- Preview does not create history or mutate the editable mesh.
- Leaving Object mode or changing active object cancels the preview.
- Commit remains one Object-scene history step and continues through the existing Object Manager / linked-instance save pathway.
- Frozen Beta 3 remains untouched.

## Previous completed development — v0.36.18.373

Theme: **visible app version ownership fix**.

- Root cause of apparent reversion to v0.36.1.0 was confirmed inside protected `src/multi-object-transform.js`: it still writes the historical v0.36.1.0 string into `#appVersion` and `document.title`.
- The protected transform file and its exact cache pin remain untouched.
- `#appVersion` now carries an explicit `data-release-version` shell stamp.
- `release-version.js` now prefers that immutable shell stamp immediately, then continues to verify against `version.json`.
- Its MutationObserver remains authoritative, so any later legacy module attempt to write an internal module version is corrected back to the actual app release.
- This fixes version display ownership without changing transform behaviour.
- Phase D Solidify behaviour from .372 is unchanged.

## Previous completed development — v0.36.18.372

Theme: **Phase D begins — open-sheet Solidify foundation**.

- Added Object > Active Tools > **Solidify** with a Thickness control.
- Solidify accepts a valid open manifold sheet and generates a closed watertight solid.
- New inner shell is offset along area-weighted averaged vertex normals.
- Boundary edges are bridged automatically with side quads.
- Existing crease weights are copied to the corresponding inner-shell edges.
- Closed meshes, non-manifold inputs, branched boundaries, inconsistent winding, duplicate/degenerate faces and zero-area normals are refused before mutation.
- Final topology is validated as closed/manifold; failed output rolls back transactionally.
- Operation owns one Object scene-history checkpoint and saves through the existing Object Manager so linked-instance propagation remains in the established pathway.
- No Through / Extrude / Boolean / Group / transform implementation was changed.
- Frozen Beta 3 at `/beta-3/` remains immutable.
- This is the conservative Solidify foundation. Closed-solid **Shell with selected-face removal** is the next Phase D extension.

## Previous completed development — v0.36.18.371

Theme: **frozen Beta 3 checkpoint / post-release handoff**.

Release intent:
- v0.36.18.371 passed the hands-on iPad release gate
- exact approved runtime tree is frozen at `/beta-3/`
- frozen checkpoint derives from code-bearing release commit `c17fb0f996f406449975a1add5b774eadc30e529`
- freeze merged in PR #55 at `a227042e2bd2972c96361aedf7840bdcc62c78bb`
- Beta 3 is immutable except for an explicitly approved emergency release fix

New release guards:
- `tests/beta3-release-candidate-371.test.mjs` locks the critical linked-instance, navigation, Group transform, component-Multi, Through, Clean and Group Boolean baselines
- `BETA3_RELEASE_CHECKLIST.md` is the authoritative manual pre-release checklist

Protected release baseline:
- linked-instance/navigation: `multi-object.js?v=0.36.18.367`
- Group transforms: `object-origin.js?v=0.36.18.355`
- protected transform core: `multi-object-transform.js?v=0.36.1.0`
- Group Boolean compound solver: .369
- no service worker
- no speculative UI or topology refactors during release testing

## Previous completed development — v0.36.18.369

Theme: **real compound Group Boolean + persistent Boolean drawer**.

Fixes from user test of .368:
- Group Boolean no longer sends a disconnected concatenated Group mesh into the ordinary pairwise Boolean solver
- Group members remain separate closed shells during Boolean solving
- Cut applies each B shell across surviving A shells
- Intersect evaluates interacting A/B shell pairs
- Union only merges interacting/contained shells and leaves genuinely disjoint shells as separate closed result components
- final result is assembled only after pairwise solving
- Swap keeps Active Tools open before and after changing the active Boolean operand

Preserved:
- .368 additive whole-Group A/B selection
- one-step Object scene-history ownership and source Group preservation
- .367 confirmed linked-instance/navigation baseline
- .355 protected Group transforms
- protected multi-object-transform.js v0.36.1.0

## Previous completed development — v0.36.18.368

Theme: **Group Boolean convenience over the existing Join + Boolean architecture**.

User-facing workflow:
- select a whole Group
- with Multi active, tap a second Group header to add that whole Group
- existing Boolean controls become available for Union / Cut / Intersect
- A Group is amber, B Group is blue
- result is a normal editable object
- source Groups remain intact but hidden after success

Architecture:
- no Group geometry type
- each Group is combined temporarily in memory with existing `combineEditableMeshes()`
- existing Boolean solver remains authoritative
- one Object scene-history checkpoint owns the operation
- Undo restores source Groups/hierarchy/visibility
- partial Groups, Reference members and locked members are rejected

Protected:
- confirmed stable linked-instance/navigation baseline remains `multi-object.js?v=0.36.18.367`
- Group transform baseline remains `object-origin.js?v=0.36.18.355`
- `multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.367

Theme: **restore touch navigation after object activation and harden selection-mode transitions**.

Critical fixes:
- touch object activation no longer consumes pointer-up, allowing OrbitControls to clean up the pointer it saw on pointer-down
- fixes one-finger orbit turning into pan and broken pinch zoom after selecting another object
- activation schedules final persistent inactive-layer refreshes after the full handoff
- multi-object `currentMode()` now uses `__boxlabSelectionBridge.mode()` as authoritative, avoiding a one-frame stale DOM mode during Object ↔ Edge/Face/Vertex renders

Preserved:
- .366 live-mesh bridge fix and linked edit propagation
- .365 persistent inactive scene layer
- .363 atomic linked creation
- protected Group transform baseline

## Previous completed development — v0.36.18.366

Theme: **the bridge now publishes the exact mesh currently being rendered**.

Critical fix:
- `main.js::renderMesh()` explicitly sets `__boxlabBridgeState.mesh = mesh` before clearing/rebuilding the root
- multi-object `saveActive()` therefore cannot read a one-render-old mesh during direct Extrude / Inset preview or selection-mode changes
- linked edit commit should no longer snap back after preview
- Object → Edge / Face / Vertex transitions should rebuild inactive peers from current geometry, not stale bridge geometry

Preserved:
- .365 persistent inactive scene layer
- .363 linked source propagation + atomic creation
- .364 touch event isolation
- existing SubD / Studio / Outliner behavior

Protected behavior:
- Group baseline remains `object-origin.js?v=0.36.18.355`
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.365

Theme: **inactive objects moved out of the core modelling root**.

Critical architectural fix:
- inactive object bodies no longer live inside the core `root` that `renderMesh()` clears on every rebuild
- a persistent scene sibling named **BoxLab Inactive Objects** now owns all non-active object bodies
- every active-body rebuild refreshes that persistent layer
- core modelling renders can no longer accidentally delete all inactive object meshes

Preserved:
- .363 linked source propagation + atomic linked creation
- .364 touch event isolation
- Studio/render-mode handling for inactive bodies
- viewport ray-picking via the existing `inactiveBodies` list

Target regression:
- first object activation leaving only the active object visible while all peers remain in the Outliner

Protected behavior:
- Group baseline remains `object-origin.js?v=0.36.18.355`
- compact Outliner / SubD row toggle / contextual Origin-Pivot unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.364

Theme: **touch object activation no longer races the core background-tap renderer**.

Critical fix:
- finger pointer-up activation of an inactive object now uses the consuming event path
- once an inactive object is successfully hit/activated, `preventDefault()` + `stopImmediatePropagation()` prevent the core modeller from completing a stale background tap and calling a second render
- background taps still fall through normally when no inactive object was handled

Preserved from .363:
- linked duplicate of linked duplicate stays on the same source
- edits propagate across linked peers
- source × instanceMatrix remains authoritative for linked rendering

Target regression:
- non-tapped linked peers disappearing from viewport after finger-selecting another object while remaining in Outliner

Protected behavior:
- Group baseline remains `object-origin.js?v=0.36.18.355`
- compact Outliner / SubD row toggle / contextual Origin-Pivot unchanged
- protected `src/multi-object-transform.js?v=0.36.1.0` untouched

## Previous completed development — v0.36.18.363

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

**Hands-on verify v0.36.18.374 before moving to closed-solid Shell.**

- Test a flat sheet and a 90° folded multi-sheet at several thicknesses.
- Confirm preview updates continuously and commit matches the preview.
- Confirm Undo/Redo and linked-instance propagation remain correct.
- Then continue with closed-solid **Shell with selected-face removal**, reusing this corrected offset-plane core.


## End-of-session requirement

Before finishing any future code-changing BoxLab session:
- rewrite this handoff to the resulting repo state
- append the milestone to `DEV_HISTORY.md`
- update `TEST_CHECKLIST.md` for newly stable behavior
- verify a brand-new chat could continue using only the repo and these files
