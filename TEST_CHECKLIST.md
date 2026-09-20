## Beta 3 release gate

- [x] Complete the hands-on checks in `BETA3_RELEASE_CHECKLIST.md` on iPad Safari before freezing `/beta-3/`
- [x] Do not add new modelling features during the release-candidate cycle
- [x] Fix only reproducible release-blocking regressions
- [ ] Confirm the frozen Beta 3 URL and live main URL both smoke-test successfully after Pages deployment

# BoxLab Regression Test Checklist

This checklist is the persistent regression contract for BoxLab.

Run the sections relevant to a change. Expand this file when a new stable workflow becomes worth protecting.

## Core navigation

- [ ] Safari/iPad native text or element selection never washes the BoxLab modelling UI blue during ordinary touch/Pencil actions
- [ ] native long-press callout/drag selection is suppressed on BoxLab chrome and viewport
- [ ] input / textarea / select / contenteditable controls retain normal text/value interaction
- [ ] one-finger orbit works
- [ ] after finger-selecting another object, one-finger orbit remains orbit (not pan) and pinch zoom still works
- [ ] two-finger pan works
- [ ] pinch zoom works
- [ ] two-finger tap Undo works
- [ ] three-finger tap Redo works
- [ ] orbit pivot does not jump
- [ ] navigation does not unexpectedly clear persistent selections

## Selection

- [ ] Vertex selection works
- [ ] Edge selection works
- [ ] Face selection works
- [ ] Face multi-select works immediately after a fresh app load, without requiring a mode change first
- [ ] returning to Face/Edge/Vertex from another selection mode restores intended additive component multi-selection
- [ ] Object selection works
- [ ] Visible / Through selection-depth controls work
- [ ] Loop selection works
- [ ] Ring selection works
- [ ] Boundary selection works
- [ ] Grow / Shrink / Connected selection works where applicable
- [ ] Angle / Normal selection works where applicable
- [ ] selection indicators remain usable while zooming
- [ ] navigation preserves the intended selection

## Object / Multi

- [ ] ordinary Duplicate stays independent and does not share geometry
- [ ] Linked Duplicate creates a second editable object that shares source geometry but keeps independent Object-mode placement
- [ ] moving / rotating / scaling one linked instance in Object mode does not move the others
- [ ] component edits on one linked instance propagate to all linked peers in their own placements
- [ ] Make Unique detaches only the active linked instance; later edits no longer propagate between it and the former link group
- [ ] Linked Duplicate / Make Unique survive Object-mode Undo/Redo with link metadata intact
- [ ] with Object Multi active, Linked Duplicate operates on every selected editable object and selects the newly created linked set
- [ ] Multi Linked Duplicate skips Reference guides and preserves duplicated group relationships / relative arrangement
- [ ] with Object Multi active, Make Unique detaches all selected linked objects in one history step
- [ ] ordinary Multi Duplicate remains independent and does not silently become linked
- [ ] Join produces a unique combined result even if one input was linked
- [ ] object creation works
- [ ] switching active object works
- [ ] duplicate works and uses padded numbering (01, 02, 03…) instead of appending copy
- [ ] duplicating an already-numbered sibling continues the same numbering family rather than nesting another suffix
- [ ] linked and Multi duplicate naming follows the same numbered object-name rule
- [ ] rename works
- [ ] Object Rename opens the BoxLab rename field already focused with the current text selected for immediate typing
- [ ] Object footer is compact Add / Duplicate / More, while Rename / Delete / Linked Duplicate / Make Unique remain available and correctly enabled inside More
- [ ] delete works
- [ ] each object-row More menu includes Delete Object and deletes that specific object with one Undo step
- [ ] in Object mode, Delete and Backspace trigger the authoritative Delete action for the current single/Multi/Group selection
- [ ] Delete / Backspace do nothing while typing in Rename or another editable field
- [ ] Boolean results use compact B numbering (B1, B2, B3…) from the active/base object name instead of concatenating operand names
- [ ] Join works
- [ ] multi-object selection/management works
- [ ] Object Selection toolbar stays in a compact five-button strip with readable status text
- [ ] grouped Outliner hierarchy preserves group membership through Object Undo/Redo
- [ ] custom group names survive scene Undo/Redo and group rename is one Undo step
- [ ] Group Rename immediately updates the visible Group header and opens focused with the current name selected
- [ ] selecting one complete group enables the normal Rename button as Rename Group
- [ ] selected group header is visibly distinct and its name acts as the primary group selection target
- [ ] selecting a whole Group promotes the hidden active/primary object into that Group if the previous active object was outside it
- [ ] a whole selected Group renders amber as one viewport selection state
- [ ] a whole selected Group moves together on iPad/Pencil even when every member is already selected in the hierarchy
- [ ] Group context survives the object-origin selection wrapper so viewport tint and transform routing agree
- [ ] while a whole Group is selected, the active member's individual cage/verts are suppressed and no outside object remains visually highlighted
- [ ] Group Selection immediately creates the visible hierarchy row; it must not merely stamp per-object group IDs/tags
- [ ] compact Group tree keeps Group Selection contextual: the creation control is hidden unless 2+ groupable objects are selected
- [ ] compact Group header uses disclosure + name + visibility + More; Lock / Rename / Ungroup live inside More without expanding drawer height unnecessarily
- [ ] compact object rows use Name + SubD + Visibility + More; Lock / Solo / Delete remain available inside More
- [ ] per-object SubD button reflects object.settings.subd and updates inactive-object rendering without changing active object
- [ ] active-object SubD button stays synchronized with the existing Modifiers > SubD Preview checkbox
- [ ] Reference objects cannot enable SubD from the Outliner
- [ ] Object / Group / footer More popovers are explicitly anchored above their trigger and remain visible above the drawer's lower edge
- [ ] Group More menu Rename/Ungroup works while the normal Rename Group pathway remains available
- [ ] exactly two selected objects show amber/blue viewport tint (active/primary amber, second blue) while the Outliner remains neutral unless Boolean-specific UI is in use
- [ ] group visibility and lock each Undo/Redo as one Object scene-history step
- [ ] group header direct Ungroup works without breaking normal Group Selection / Multi behavior
- [ ] collapsed/expanded group state survives scene Undo/Redo when the group still exists
- [ ] removed groups do not leak stale names/collapse state into later groups that reuse an ID
- [ ] object transforms do not regress
- [ ] reference objects remain protected from destructive editing
- [ ] Reference imports are permanently read-only guides: single, Multi and Group lock controls cannot unlock them
- [ ] Reference visibility / solo still work and visible Reference geometry remains eligible for cross-object snapping
- [ ] duplicating or restoring a Reference through scene Undo/Redo must preserve kind=reference and locked=true

## Component alignment

- [ ] existing Make Planar remains available for a selected Face
- [ ] Align X enters anchor-pick mode, then aligns the other selected component vertices to the picked anchor X coordinate
- [ ] Align Y enters anchor-pick mode, then aligns the other selected component vertices to the picked anchor Y coordinate
- [ ] Align Z enters anchor-pick mode, then aligns the other selected component vertices to the picked anchor Z coordinate
- [ ] picked Align anchor stays fixed
- [ ] picked Align anchor gets the amber Boolean-style reference cue
- [ ] component Align preserves the current component selection
- [ ] component Align commits as one Undo step
- [ ] component Align is hidden in Object mode

## Precision snapping

- [ ] component Move displays live ΔX / ΔY / ΔZ while dragging
- [ ] snapped component Move keeps numeric delta readback visible alongside the snap target label
- [ ] Geometry-enabled component Move can snap selected vertices to visible geometry on other objects
- [ ] free component Move can align an edge/face/multi-component centre to another-object snap target
- [ ] axis-constrained component Move changes only the constrained coordinate when snapping cross-object
- [ ] target object remains unchanged during component Move snapping
- [ ] hidden/solo-excluded objects do not contribute component Move snap targets

## Vertex tools

- [ ] Add Vertex can snap to visible geometry on other objects without modifying the target object
- [ ] cross-object snapping prefers target vertices, then midpoints, then generic edge positions
- [ ] hidden/solo-excluded objects do not contribute snap targets
- [ ] Add Vertex works
- [ ] Build Edge works
- [ ] arming Build Edge fully disarms Add Vertex; Add must not light back up after the Build Edge click
- [ ] Vertex Active Tools keep the fixed order Bevel / Add / Build Edge / Slide / Create Face / Circle without jumping during selection renders
- [ ] Vertex Slide works
- [ ] Vertex Bevel works
- [ ] multi-vertex bevel works where supported
- [ ] Vertex Join works
- [ ] Weld works
- [ ] Delete Vertex works safely

## Circle / regularize

- [ ] Circle appears in contextual Vertex / Edge / Face Active Tools, not in Selection
- [ ] Vertex Circle sits in the Slide / Create Face row as the third button
- [ ] Edge Circle sits immediately after Delete in the bottom Topology row
- [ ] Face Circle sits beside Poke Faces in the same row
- [ ] no old standalone bottom Circle row remains
- [ ] Circle is available for a simple closed selected Vertex/Edge loop or exactly one selected Face boundary
- [ ] Circle preserves the selected loop centre and working plane
- [ ] Circle regularizes existing loop vertices to one radius with even angular spacing
- [ ] Circle does not create or delete topology
- [ ] Circle preserves the current Vertex/Edge/Face selection
- [ ] Circle commits as one Undo step
- [ ] open chains / branched / ambiguous selections are refused

## Edge tools

- [ ] Grid Fill enables only for one simple planar convex four-sided boundary with matching opposite segment counts
- [ ] Grid Fill preserves all existing boundary vertices
- [ ] Grid Fill creates an all-quad U×V patch and selects the new faces
- [ ] Grid Fill is one Undo step and commits only after topology validation
- [ ] Grid Fill rejects irregular/curved boundaries, mismatched opposite counts, internal/non-boundary Edges and simple 4-edge caps
- [ ] Flip Edge is the single existing triangle-pair diagonal-swap tool (formerly Rotate Edge)
- [ ] Flip Edge enables only for one uncreased shared Edge between exactly two triangles
- [ ] Flip Edge selects the new diagonal after commit
- [ ] Flip Edge commits as one Undo step and rejects unsafe/inverted results
- [ ] Face Split works while canonical additive Multi selection remains enabled
- [ ] arming Face Split temporarily prevents Edge paint selection from consuming its boundary-edge taps
- [ ] leaving Face Split restores ordinary additive Edge paint selection
- [ ] Loop Cut works
- [ ] Face Split works
- [ ] Edge Bevel works
- [ ] multi-edge bevel works where supported
- [ ] Crease works
- [ ] Uncrease works
- [ ] Edge Slide works
- [ ] Offset Loop works
- [ ] Offset Loop drag and exact-entry commits validate topology and roll back invalid results
- [ ] Offset Loop leaves canonical additive Multi enabled and selects both created support rails directly
- [ ] while Offset Loop is armed, Edge paint selection yields so Pencil drag reaches the modelling tool
- [ ] Edge Bridge works
- [ ] Fill works
- [ ] Dissolve Loop works
- [ ] Dissolve Edge works
- [ ] Delete Edge works safely

## Face tools

- [ ] Face Active Tools primary row remains 3 columns: Extrude / Inset / Knife; Join Coplanar wraps below instead of forcing 4 across
- [ ] Face secondary row remains 3 columns with Duplicate present; selecting/arming Inset or Extrude must not reshuffle Face buttons
- [ ] File menu opens below the command bar, fits within the viewport, and scrolls internally when needed
- [ ] Precision Face / Repeat Previous UI appears only once
- [ ] drawer-ui is the single authoritative loader for Precision Face / Repeat Previous
- [ ] normal Extrude drag records an exact previous value for Repeat Previous
- [ ] normal Inset drag records an exact previous value for Repeat Previous
- [ ] Repeat Previous can be armed and applied by tapping another Face
- [ ] repeated Face operation uses the exact previously committed value
- [ ] Through / blocked / rollback Extrude gestures do not become Repeat Previous operations
- [ ] Extrude works
- [ ] connected multi-face Extrude works
- [ ] Inset works
- [ ] Knife works
- [ ] Extract works
- [ ] Face Bridge works
- [ ] Delete Face works safely

## Through / topology-sensitive extrusion

- [ ] normal Through works
- [ ] Through into an existing cavity/tunnel works
- [ ] continuing through a cavity to a farther outer wall works
- [ ] multiple ordered Through targets work where supported
- [ ] invalid Through topology rolls back cleanly
- [ ] unrelated Extrude/Inset behaviour is unchanged after Through edits

## Clean for SubD / Quad Clean
- [ ] Clean for SubD must preserve sharp geometric folds/corners even when those edges are not explicitly creased
- [ ] all-quad relaxation may only move vertices across a genuinely smooth incident normal fan

- [ ] Clean for SubD button is available in Object > Active Tools
- [ ] locked/reference objects cannot be destructively cleaned
- [ ] safe four-triangle fan repair works
- [ ] conservative sliver/skinny-triangle repair works
- [ ] bounded even triangle islands can be proposed up to the current 40-triangle envelope
- [ ] a safe 40-triangle strip can resolve to 20 quads
- [ ] a 42-triangle connected island remains outside the bounded complete-matching stage
- [ ] poor-quality patches are preserved rather than forced
- [ ] surrounding quad-flow context influences candidate quality
- [ ] internal proposed-quad flow coherence influences candidate quality
- [ ] coherent neighboring proposed quads score better than an equivalent zig-zag internal flow arrangement
- [ ] completed-patch ranking prefers smooth interior vertices closer to quad valence 4 when safe alternatives exist
- [ ] crease/boundary-protected vertices are excluded from valence regularity scoring
- [ ] equal-average valence alternatives prefer the patch with the lower worst local valence error
- [ ] equal-average internal-flow alternatives prefer the patch with the lower worst local flow mismatch
- [ ] topology audit accepts valid open-boundary meshes
- [ ] topology audit rejects duplicate/non-manifold/collapsed topology deterministically
- [ ] core Clean for SubD pipeline is transactional and restores the original mesh if a stage fails its topology audit
- [ ] generated irregular triangulated-strip fixtures remain topologically valid after cleanup
- [ ] safe remaining triangle pairs can merge to quads
- [ ] all-quad tangent relaxation remains guarded
- [ ] topology validation rejects/rolls back invalid results
- [ ] no-change result reports safely without corrupting the mesh
- [ ] Undo/Redo remains valid after a clean operation

## Phase D — Solidify / Shell foundation

- [ ] Solidify is available in Object > Active Tools with a Thickness control
- [ ] one open quad Solidify produces a closed six-face solid
- [ ] a connected multi-face open sheet Solidify produces one watertight solid and bridges every boundary edge
- [ ] flat Solidify offsets the duplicate shell consistently by the requested thickness
- [ ] a 90° folded multi-sheet preserves full requested thickness to both source planes using a proper miter/plane intersection
- [ ] existing crease weights are preserved on the original shell and copied to the inner shell
- [ ] Solidify refuses an already closed mesh without mutation
- [ ] Solidify refuses non-manifold, branched-boundary, inconsistent-winding, duplicate/degenerate or zero-area input without partial mutation
- [ ] Solidify output is topology-validated as closed/manifold and rolls back if validation fails
- [ ] first Solidify tap creates a non-destructive preview rather than committing
- [ ] Thickness slider updates the Solidify preview live
- [ ] Pencil/finger can press the translucent generated shell and drag interactively to change thickness
- [ ] direct thickness drag follows the picked preview face's projected normal rather than a fixed screen axis
- [ ] direct drag updates the Thickness slider/output continuously
- [ ] OrbitControls pauses only during direct thickness drag and restores immediately on release/cancel
- [ ] Active Tools stays open for the entire armed Solidify preview/drag session so Apply Solidify remains accessible
- [ ] Solidify uses the existing drawer keep-open contract without changing drawer-ui global behaviour
- [ ] Apply/Cancel releases Solidify's temporary drawer lock cleanly
- [ ] direct drag clamps safely to the Thickness control range and creates no history entry
- [ ] preview visually distinguishes generated inner shell / boundary walls from the unchanged source sheet
- [ ] Apply Solidify commits geometry matching the preview
- [ ] leaving Object mode or changing active object cancels preview without mutation
- [ ] Solidify is one Object-scene Undo step and Redo restores the solid
- [ ] Solidify on a linked instance propagates shared geometry without collapsing independent instance placement
- [ ] Reference / locked objects cannot Solidify
- [ ] frozen `/beta-3/` remains unchanged

## Boolean / extraction

- [ ] Boolean workflow works
- [ ] Boolean and Join both use the authoritative Object scene-history bridge; Boolean must not install a second Undo/Redo wrapper
- [ ] Boolean Undo restores the two selected originals with linked-instance metadata/placements intact; Redo restores the unique result
- [ ] Boolean hides only the selected A/B operands; unselected linked peers remain unaffected
- [ ] Boolean result is unique even when an operand was linked
- [ ] Boolean cleanup does not leave duplicate/degenerate faces
- [ ] Extract + Undo works
- [ ] Extract + Redo works

## Modifiers / display

- [ ] Mirror X works
- [ ] Mirror Y works
- [ ] Mirror Z works
- [ ] Align Object to Mirror works where enabled
- [ ] SubD Preview works
- [ ] Show Cage works
- [ ] SubD levels 1–4 behave correctly
- [ ] Studio realtime mode works
- [ ] multiple objects display correctly in Studio
- [ ] ground plane / lighting does not incorrectly follow only the active object

## Import / export

- [ ] Editable OBJ import works
- [ ] Editable GLB/GLTF import works where supported
- [ ] Reference import works
- [ ] Base OBJ export works
- [ ] multi-object Base OBJ export works
- [ ] SubD OBJ export works
- [ ] multi-object SubD OBJ export works

## History / transaction safety

- [ ] Undo works after the changed workflow
- [ ] Redo works after the changed workflow
- [ ] failed topology operations restore the pre-operation mesh
- [ ] object-manager state remains synchronized after geometry commits
- [ ] no partial mutation remains after a rejected operation

## UI / release integrity

- [ ] visible app version matches intended release
- [ ] protected multi-object-transform legacy v0.36.1.0 stamp cannot override the current release label/title
- [ ] module cache pins changed only where intended
- [ ] `styles.css?v=0.36.18.270` remains pinned unless deliberately changed
- [ ] `src/multi-object-transform.js?v=0.36.1.0` remains untouched unless deliberately changed
- [ ] `component-multi-init.js?v=0.36.18.314` remains present/pinned unless component-selection startup is deliberately changed
- [ ] drawer behaviour remains intact
- [ ] no service worker was introduced unintentionally
- [ ] GitHub Pages loads the intended build after release

## Session-specific additions

Add new permanent regression checks below when future features need protection.
