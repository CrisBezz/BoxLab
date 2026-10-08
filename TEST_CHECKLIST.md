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
- [ ] while any Tool Session is active, Active Tools cannot collapse from viewport interaction; Apply/Cancel/end-session restores normal drawer behaviour
- [ ] Solidify: Object launch opens exclusive Tool Session; live Thickness/direct viewport drag work; Cancel leaves source unchanged; Apply creates the same closed solid as before
- [ ] Shell: selected Face opening launch opens exclusive Tool Session; Pencil Thickness works; Cancel leaves solid unchanged; Apply creates the same hollow solid/opening as before
- [ ] Revolve Profile: new plane remains positionable before editing; moving/snapping or launcher opens exclusive Tool Session; Pencil profile editing, Segments 3–64 and Apply remain unchanged
- [ ] after Array END-copy drag / Apply / Cancel, free Vertex Move immediately works again and no stale pointer capture remains
- [ ] Vertex mode: selected vertex can Move / Scale / Rotate; Vertex Pick Assist still handles ordinary taps when no transform is armed

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
- [ ] inward single-Face Extrude trims overlapping exterior side walls instead of leaving stacked/z-fighting wall faces
- [ ] inward Extrude preview shows the side-wall cut continuously from the start of meaningful inward travel
- [ ] inward Extrude interior boundary edges create recess walls while exterior boundary edges cut existing wall faces
- [ ] partial inward Extrude commits a closed valid result or rolls back transactionally
- [ ] inward Extrude reaching the far side still resolves through the mature Through kernel
- [ ] cancelling an inward cut preview restores the exact pre-drag mesh and does not add history
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

## Phase D — Array

- [ ] Array opens with Count=2: source + exactly one highlighted END preview copy
- [ ] Spacing slider is no longer part of the primary Array UX
- [ ] END preview can be dragged with Pencil/finger
- [ ] Free endpoint movement follows the current camera/view plane
- [ ] X / Y / Z endpoint modes constrain only the selected world-axis component
- [ ] switching Free/X/Y/Z during one preview preserves the existing endpoint position
- [ ] Count includes source and END and supports 2–12 total objects
- [ ] increasing Count fills intermediate previews evenly between source and END
- [ ] diagonal/3D END vectors produce evenly spaced diagonal/3D intermediate copies
- [ ] END copy stays visually stronger than intermediate preview copies
- [ ] Count works with finger and Apple Pencil without late native snap-back
- [ ] changing Count/endpoint remains preview-only and does not create history
- [ ] Apply Array creates linked instances at the exact preview positions
- [ ] source geometry edits propagate to every Array instance after Apply
- [ ] Array instances retain independent object placement
- [ ] source object remains active after Apply
- [ ] Apply Array is one Object-scene Undo step and Redo restores all generated instances
- [ ] Active Tools remains open throughout Array preview
- [ ] locked/reference objects cannot Array
- [ ] existing Linked Duplicate / Make Unique behavior remains unchanged

## Cross-mode — Delete / Backspace keyboard routing

- [ ] Delete/Backspace in Object mode triggers existing Outliner Delete behavior
- [ ] Delete/Backspace in Face mode deletes selected face(s) exactly like Face > Delete
- [ ] Delete/Backspace in Edge mode deletes selected edge(s) exactly like Edge > Delete
- [ ] Delete/Backspace in Vertex mode deletes selected vertex/vertices exactly like Vertex > Delete
- [ ] component Delete remains one normal Undo step through existing handlers
- [ ] Delete/Backspace does not fire while typing in inputs, textareas, selects or contenteditable fields
- [ ] Object Multi/Group delete behavior remains unchanged

## Phase D — Revolve Profile — .392 post-Apply selection

- [ ] Apply Revolve leaves the Revolve object as the normal single active Object selection
- [ ] any previously active/inactive cube loses stale amber/blue Boolean tint after Apply
- [ ] Object Multi mode is not left armed by Revolve Apply
- [ ] Boolean A/B tint still appears correctly when two objects are deliberately selected afterward
- [ ] Undo/Redo of Revolve Apply does not corrupt authoritative Object selection
- [ ] Studio/Solid view materials remain normal after Apply

## Phase D — Revolve Profile — .391 Active Tools

- [ ] newly added Revolve Profile may remain in positioning mode without forcing Active Tools
- [ ] moving the Revolve plane opens Active Tools automatically
- [ ] rotating the Revolve plane opens Active Tools automatically
- [ ] scaling the Revolve plane opens Active Tools automatically
- [ ] snapping/repositioning the Revolve plane opens Active Tools automatically
- [ ] Edit Profile opens Active Tools immediately
- [ ] Active Tools stays open while active Revolve construction tooling is in use
- [ ] Apply Revolve releases the drawer lock
- [ ] switching away from the construction does not leave a stale drawer lock

## Phase D — Revolve Profile — .390 point editing

- [ ] tapping/pressing an existing profile point selects it
- [ ] selected profile point has a clear persistent highlight
- [ ] dragging selected point reshapes profile and live preview
- [ ] tapping close to a profile segment inserts a point into that segment
- [ ] inserted point appears between the correct two chain points
- [ ] tapping away from points/segments still appends at the end
- [ ] Delete Point removes only the selected profile point
- [ ] Delete Point disables when no profile point is selected
- [ ] Undo Point reverses add / insert / delete / drag profile edits
- [ ] Clear removes all points and clears point selection
- [ ] touch navigation remains available while Edit Profile is ON
- [ ] Apply Revolve after inserted/deleted points produces ordinary editable mesh

## Phase D — Revolve Profile — .389 refinement

- [ ] new Revolve Profile starts with Edit Profile OFF
- [ ] construction plane can Move / Rotate / Scale before drawing
- [ ] existing Object Geometry Snap can position the construction plane against another object
- [ ] after positioning, Edit Profile resumes plane-constrained authoring
- [ ] one-finger orbit works while Edit Profile is ON
- [ ] two-finger pan and pinch zoom work while Edit Profile is ON
- [ ] Apple Pencil still adds and drags profile points while touch remains navigation
- [ ] Segments permits 3, 4, 5 and all values through 64
- [ ] 3-segment Revolve preview and Apply produce valid triangular radial form
- [ ] concave/overhanging profiles finish with topologically unified face winding
- [ ] no isolated inward-normal bands appear on concave Revolve results
- [ ] .388 live preview / Undo Point / Clear / Apply behaviors remain unchanged

## Phase D — Live Revolve Profile construction

- [ ] Add → Revolve Profile creates a construction plane
- [ ] left edge of construction plane is visibly blue and acts as the revolve axis
- [ ] Edit Profile: tap plane adds points constrained to the plane
- [ ] consecutive profile points connect automatically as one open chain
- [ ] dragging a profile point keeps it on the construction plane
- [ ] dragging a profile point updates the revolved fill + wire preview live
- [ ] profile points near the blue axis snap exactly onto it
- [ ] toggling Edit Profile off restores viewport navigation without losing points
- [ ] toggling Edit Profile back on resumes profile editing
- [ ] Segments 6–64 updates preview live with finger and Apple Pencil
- [ ] Undo Point reverses the last profile authoring gesture
- [ ] Clear removes profile points but preserves the construction plane
- [ ] moving/rotating/scaling the construction plane keeps profile + preview attached
- [ ] Apply Revolve converts the construction to ordinary editable mesh geometry
- [ ] Apply Revolve is one Undo step; undo back to construction plane restores live profile state
- [ ] legacy loose-edge Revolve remains available

## Phase D — Revolve / Lathe

- [ ] Revolve is available in Edge mode for a standalone loose-edge profile
- [ ] entire loose profile must be selected; partial selection refuses
- [ ] branched loose profiles refuse
- [ ] closed-loop loose profiles refuse in the foundation build
- [ ] stray loose vertices outside the profile refuse
- [ ] X / Y / Z axis buttons revolve through active Object Origin
- [ ] Segments 6–64 updates preview live with finger and Apple Pencil
- [ ] first Revolve tap creates a non-destructive translucent fill + wire preview
- [ ] Revolve preview shows the active axis guide
- [ ] profile vertices on the axis collapse to a single pole rather than duplicate degenerate rings
- [ ] endpoints off-axis remain open boundary rings
- [ ] Apply Revolve converts the loose profile into ordinary editable faces
- [ ] Apply Revolve clears loose topology and is one Undo step
- [ ] existing Array, outward/inward Extrude, Through and navigation remain unchanged

## Phase D — Solidify / Shell foundation

- [ ] Shell appears in Face > Active Tools when one or more Faces are selected on an editable closed solid
- [ ] one selected cube Face becomes one open top/rim while the result remains a watertight solid shell
- [ ] adjacent selected Faces can create one larger connected opening
- [ ] Shell Thickness preview updates before Apply Shell commits
- [ ] Shell preview shows interior/back faces clearly from both viewing directions, not just wireframe edges
- [ ] Shell preview retains visible topology edges over the translucent filled preview
- [ ] Shell Thickness gives the same selected value with Apple Pencil and finger input
- [ ] Apple Pencil dragging Shell Thickness no longer snaps the value to the 0.01 minimum
- [ ] Pencil-selected Shell Thickness remains unchanged after Pencil-up (late Safari input/change cannot overwrite it)
- [ ] Finger can immediately take over the slider normally after Pencil ownership releases
- [ ] Pencil drag remains stable if the Pencil leaves the slider track while still pressed
- [ ] Pencil and finger both update the same visible thickness output and preview
- [ ] Apply Shell clears stale Face selection created against pre-compaction Face indices
- [ ] Shell uses the same inward hard-fold offset behaviour as Solidify
- [ ] Shell refuses open-sheet input, loose topology, no selected Faces and all Faces selected without partial mutation
- [ ] Shell preview keeps Active Tools open so Apply Shell remains accessible
- [ ] Shell is one Object-scene Undo step and linked-instance save propagation remains intact

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


## Phase D — Sweep Path — .393

- [ ] Add → Sweep Path creates a movable/snappable construction plane in Object mode
- [ ] Edit Path lets Apple Pencil/mouse add, insert, select and drag path points while touch navigation remains one-finger orbit / two-finger pan / pinch zoom
- [ ] Undo Point / Delete Point / Clear update the live preview without committing geometry
- [ ] Radius updates the live preview and is Pencil-draggable without late Safari value snap-back
- [ ] Sides 3–24 updates the live preview and is Pencil-draggable
- [ ] Caps On/Off toggles both sweep end caps
- [ ] curved multi-point paths keep a coherent section orientation without obvious 180° flips
- [ ] Apply Sweep converts the construction into ordinary editable mesh, returns to normal single-object selection and clears stale Boolean A/B tint
- [ ] one Undo returns the applied object geometry to the construction plane state
- [ ] Revolve, Array, Solidify, Shell, Through and touch navigation remain unchanged


## Phase D — Sweep Path — .394

- [ ] Apply Sweep immediately shows the generated Sweep result without requiring object reselection
- [ ] Apply Sweep immediately removes the construction plane/preview overlay
- [ ] Geometry Snap ON can place Sweep path points on visible external vertices
- [ ] Geometry Snap ON can place Sweep path points on visible external edges
- [ ] Geometry Snap ON can place Sweep path points on visible external face hit-points
- [ ] snapped Sweep points may sit off the construction plane and the live preview follows the resulting 3D path
- [ ] Geometry Snap OFF preserves free construction-plane path drawing
- [ ] touch orbit/pan/pinch remain normal while Pencil/mouse edits the Sweep path


## Phase D — Sweep Profile + dual path — .395

- [ ] Add → Sweep creates a movable/snappable **Profile Plane**, not a visible path plane
- [ ] Circle and Rectangle create live built-in profiles on the Profile Plane
- [ ] Draw creates a closed editable custom profile on the Profile Plane
- [ ] Edit Profile converts a built-in Circle/Rectangle into editable profile points without losing its current shape
- [ ] profile points can be inserted/moved and Undo Profile / Clear Profile update the live preview
- [ ] Follow Edges can use visible existing object/reference edges even when Geometry Snap is OFF
- [ ] Follow Edges extends along connected existing edges and refuses disconnected continuation edges
- [ ] Draw Path can create/edit path points without displaying a path construction plane
- [ ] Draw Path uses external Vertex/Edge/Face Geometry Snap when enabled
- [ ] profile and path can be edited alternately before Apply without restarting Sweep
- [ ] bent paths keep a stable transported profile orientation without obvious 180° flips
- [ ] touch orbit/pan/pinch remain available while Pencil/mouse authors profile/path geometry
- [ ] Apply Sweep converts preview to ordinary editable mesh and removes Profile Plane/preview immediately
- [ ] Apply Sweep remains one normal history step and preserves authoritative single-object selection


## Phase D — Sweep Draw Profile fixes — .396

- [ ] Profile Plane starts close to the default Circle profile size rather than filling the viewport
- [ ] Draw Profile starts Open and accepts 3+ points by appending points naturally
- [ ] Open Draw Profile previews after 2 points as a swept surface
- [ ] Closed button refuses closure below 3 points and closes a valid 3+ point profile explicitly
- [ ] Closed profile preview generates the normal closed-section Sweep and Caps become available
- [ ] Open profile shows Caps N/A and produces no profile seam/end caps
- [ ] Closed profile can be reopened without losing points
- [ ] Circle/Rectangle remain closed and unchanged
- [ ] Edit Profile on Circle/Rectangle converts current shape to editable closed Draw points


## Phase D — Sweep profile orientation — .397

- [ ] Closing a custom Draw profile connects the final authored point directly back to point 0 without reordering points
- [ ] Clockwise and counter-clockwise custom profiles preserve authored vertex order
- [ ] Dragging a profile point left moves the Sweep preview left, never mirrored right
- [ ] Profile Plane U/V orientation remains visually consistent whether the path leaves along +normal or -normal
- [ ] Existing Circle/Rectangle profile orientation remains unchanged


## Phase D — Sweep concave/start-ring hardening — .398

- [ ] Ring 0 exactly matches the authored Profile Plane section; no shifted/rotated/mirrored start section
- [ ] Closed concave C-shaped profile sweeps without inside-out side faces
- [ ] Concave start/end caps triangulate cleanly without fan-overlap artifacts
- [ ] Start cap faces outward opposite the first path segment and end cap faces outward along the final segment
- [ ] Convex Circle/Rectangle/custom profiles remain unchanged
- [ ] Open profiles remain uncapped and unaffected


## Phase D — Sweep side normals — .399

- [ ] Same concave C-profile used for .398 displays outward side normals around the complete Sweep
- [ ] Side normals stay outward through corners/path direction changes
- [ ] Concave inner returns face the cavity, outer edges face away from the section
- [ ] Clockwise and counter-clockwise authored profiles both produce outward side faces
- [ ] Exact ring-0 profile placement from .398 remains unchanged
- [ ] Concave cap triangulation and convex cap topology remain unchanged


## Phase D — Sweep edit ownership — .400

- [ ] Draw Profile starts/stays Open until the user explicitly presses Closed
- [ ] Draw Profile accepts point 4 and subsequent points without requiring Open to be reselected
- [ ] Edit Profile disarms Move/Scale/Rotate before Pencil/mouse profile editing begins
- [ ] Draw Path / Follow Edges / Edit Path disarm Move/Scale/Rotate before path authoring begins
- [ ] transform gesture layer yields while Sweep profile/path editing owns the viewport
- [ ] touch orbit/pan/pinch remain available during Sweep editing
- [ ] leaving Sweep editing does not silently re-arm Move


## Phase D — Sweep Use Selection — .401

- [ ] Select one Face, Add → Sweep, then Use Selection reproduces that face outline on an aligned Profile Plane
- [ ] Select a connected closed Edge loop, Add → Sweep, then Use Selection reproduces the loop in connected order
- [ ] Use Selection is disabled when no valid Face/closed Edge-loop source was captured before Add → Sweep
- [ ] open/disconnected/branched edge selections are rejected rather than converted
- [ ] non-planar selected outlines are rejected rather than flattened silently
- [ ] source object/selection geometry remains unchanged after Use Selection
- [ ] imported selection becomes an editable closed Draw profile via Edit Profile
- [ ] applying Use Selection clears stale path points if the Profile Plane is repositioned


## Phase D — Sweep direct selection launch — .402

- [ ] With one Face selected, Face Active Tools exposes Sweep from Selection
- [ ] Sweep from Selection captures the Face before Object mode clears component selection
- [ ] Face launch creates Sweep, enters Object mode and immediately loads/aligned the selected Face as the editable profile
- [ ] With a closed Edge loop selected, Edge Active Tools exposes Sweep from Selection
- [ ] Edge launch captures the loop before Object mode handoff and loads it as the editable profile
- [ ] user does not need to manually enter Object mode before launching selected-profile Sweep
- [ ] invalid open/branched/non-planar Edge selections are still rejected by .401 validation


## Phase D — closed Sweep profile insertion — .403

- [ ] Closed Draw profile in Edit Profile accepts a new node on any profile segment
- [ ] Closing segment from last point back to point 0 also accepts insertion
- [ ] Existing profile vertices still drag normally
- [ ] Open profile append behaviour remains unchanged
- [ ] inserted node updates live Sweep preview immediately


## Phase D — selected-profile Sweep anchor — .404

- [ ] Face → Sweep → Follow Edges begins directly from a profile vertex on the selected rail, with no profile-centre lead-in
- [ ] nearest profile vertex to the first selected rail endpoint becomes the anchor
- [ ] Profile Plane translates so the anchor vertex sits exactly on that endpoint
- [ ] selected profile shape/offset remains unchanged relative to the anchor
- [ ] subsequent connected Follow Edges continue from the same rail path
- [ ] same behaviour works for closed Edge-loop profile sources
- [ ] Circle/Rectangle Sweep remains centre-anchored
- [ ] Draw Path behaviour remains unchanged when no Follow Edge anchor is established


## Phase D — Sweep shell normal unification — .405

- [ ] Closed capped selected-Face Sweep has outward normals after Apply
- [ ] Closed capped clockwise and counter-clockwise profiles both resolve to outward shell orientation
- [ ] anchored profile geometry/path placement from .404 remains unchanged
- [ ] concave C-profile Sweep remains clean and outward-oriented
- [ ] open-profile Sweep surfaces are not auto-reversed
- [ ] uncapped closed-profile Sweep surfaces are not volume-flipped


## Phase F — Tool Session / Sweep UX — .406

- [ ] Face mode with one selected Face shows Sweep near the top of Face Active Tools, not appended at the bottom
- [ ] closed Edge-loop selection shows the same compact Sweep launch near the top of Edge Active Tools
- [ ] Face/Edge → Sweep takes exclusive ownership of Active Tools and opens directly on PATH
- [ ] normal Object tools (Array, Boolean, Clean for SubD, Solidify, etc.) are hidden while the Sweep Tool Session is active
- [ ] PROFILE / PATH / FINISH switch cleanly without scrolling through unrelated controls
- [ ] switching PROFILE/PATH prevents the hidden editor from retaining viewport gesture ownership
- [ ] Object Add → Sweep begins on PROFILE
- [ ] Apply Sweep ends the Tool Session and restores the previous Active Tools drawer state
- [ ] Sweep geometry, snapping, anchoring, normals and Apply behaviour remain unchanged from .405


## Phase D — Sweep local winding — .407

- [ ] previously isolated Sweep backface is gone
- [ ] every manifold shared edge has opposite face-edge traversal
- [ ] bent selected-profile Sweep remains outward and clean
- [ ] concave C-profile Sweep remains outward and clean
- [ ] .406 Tool Session UX remains unchanged


## Phase D/F — Sweep rail-edge visibility — .408

- [ ] PATH → Follow Edges shows the full edge network of eligible visible meshes
- [ ] Knife-cut edge across a face is visibly available as a rail
- [ ] Loop Cut/internal topology edges are visible, not only boundary/silhouette edges
- [ ] rail guide is sourced from the same evaluated meshes used by Follow Edges snapping
- [ ] PROFILE hides the rail guide
- [ ] Draw Path hides the rail guide
- [ ] FINISH and Apply remove the rail guide
- [ ] .406 Tool Session and .407 winding behaviour remain unchanged


## Phase D/F — Sweep rail contrast / hover — .409

- [ ] candidate Follow Edges network has stronger contrast than .408
- [ ] edge under Pencil/cursor receives a distinct hot highlight before selection
- [ ] hot highlight corresponds to the exact edge Follow Edges would select
- [ ] accepted Sweep path is visually distinct from both candidate and hot states
- [ ] hot state clears when leaving PATH or switching to Draw Path
- [ ] Apply/exit clears all temporary rail highlighting
- [ ] .408 internal-edge visibility remains intact


## Phase D/F — Follow Edges picker regression — .410

- [ ] Follow Edges selects an edge when tapping near either endpoint
- [ ] Vertex proximity no longer steals/rejects a Follow Edges pick
- [ ] hot edge and clicked edge use the same edge-only picker
- [ ] mid-edge picking remains reliable
- [ ] rail reference cache refreshes on entering Follow Edges and clears on exit/Apply
- [ ] Draw Path generic Vertex/Edge/Face snapping remains unchanged
- [ ] .409 candidate/hot/accepted contrast remains intact


## Phase D/F — Follow Edges state + rail visibility — .411

- [ ] Follow Edges lights immediately when activated
- [ ] Draw Path lights immediately when activated
- [ ] path buttons expose matching aria-pressed state
- [ ] Knife-cut/internal rail edge remains visible over a shaded face
- [ ] rail guide remains temporary and only visible in PATH → Follow Edges
- [ ] .410 edge-only picker behaviour remains unchanged


## Phase D/F — hard Follow Edges active-state indicator — .412

- [ ] active Follow Edges button literally reads `Follow Edges · Active`
- [ ] inactive Follow Edges button reads `Follow Edges`
- [ ] selected path button styling is driven by aria-pressed and remains visible regardless of generic button CSS
- [ ] active candidate rail guide is fully opaque over shaded surfaces
- [ ] .410 picker and .411 rail visibility behavior remain unchanged


## Phase D/F — atomic selected-profile Follow Edges handoff — .413

- [ ] Face → Sweep opens PATH with `Follow Edges · Active` immediately
- [ ] closed Edge-loop → Sweep does the same
- [ ] selected-profile auto launch has `editPath=true`, `pathMode='edges'`, `sessionStage='path'` before save/render events
- [ ] rail refs and button state initialize before `manager.saveActive()`
- [ ] manual Use Selection remains profile-only unless path mode is explicitly activated
- [ ] .410 picker and .412 hard visual state remain unchanged


## Phase D/F — Follow Edges rail-state declaration regression — .414

- [ ] Follow Edges activates without runtime error
- [ ] `hotRailHit` is declared at module scope
- [ ] `railSnapRefs` is declared at module scope
- [ ] Follow Edges button shows `Follow Edges · Active`
- [ ] rail candidate overlay appears immediately
- [ ] .410 edge-only picker and .413 atomic handoff remain intact


## Phase D/F — fresh Sweep placement — .415

- [ ] Object → Add → Sweep profile plane appears visibly in front of the current active object/scene
- [ ] fresh Sweep plane is camera-facing
- [ ] fresh Sweep remains the active object after creation
- [ ] real Move is armed automatically on the next frame
- [ ] fresh Sweep no longer spawns buried inside the default cube
- [ ] Face → Sweep and Edge-loop → Sweep still use the selected source geometry position/orientation exactly


## Phase F — Array Tool Session — .416

- [ ] normal Object Active Tools shows one compact Array launcher, not permanent Array controls
- [ ] launching Array makes Array exclusively own Active Tools
- [ ] unrelated Object tools are hidden during Array preview
- [ ] Free / X / Y / Z endpoint constraints behave as before
- [ ] highlighted END copy remains directly draggable in the viewport
- [ ] Count remains Pencil-friendly and redistributes preview live
- [ ] Apply creates evenly spaced linked instances in one scene-history step and restores normal Active Tools
- [ ] Cancel removes preview without creating objects and restores normal Active Tools
- [ ] changing active object or leaving Object mode cancels Array preview safely


## Phase F — Array Tool Session ownership — .417

- [ ] Array preview remains in exclusive Array Tool Session while repositioning the END copy
- [ ] tapping/dragging the Array preview does not return Active Tools to normal Object tools
- [ ] temporary active-object changes while Array is armed restore the original Array source instead of cancelling
- [ ] Array Tool Session reasserts itself if displaced while preview remains armed
- [ ] endpoint pointer-down is captured before normal object selection on the viewport
- [ ] leaving Object mode still cancels Array safely
- [ ] Apply and Cancel still exit Array and restore normal Active Tools

- [ ] Edge Extrude: select one boundary edge, arm Extrude, drag it to create one quad strip; the new outer edge remains selected and Extrude remains armed
- [ ] Edge Extrude ribbon: repeatedly drag the newly selected outer edge to grow a continuous ribbon without reselecting or leaving Edge mode
- [ ] Edge Extrude chain: select a connected boundary chain and drag; shared vertices stay welded and the new outer chain remains selected
- [ ] Edge Extrude refuses interior or branched selections and Undo removes one pull at a time

- [ ] Edge Extrude constraints: with X/Y/Z selected, drag a boundary edge and confirm the ribbon grows along that world-axis direction projected perpendicular to the source edge
- [ ] Edge Extrude constraints: choose an axis parallel to the source edge and confirm the pull refuses instead of producing a sliver
- [ ] Edge Extrude Auto: Auto or Axis Snap ON chooses one valid X/Y/Z perpendicular direction from the initial drag and keeps it locked through the pull
- [ ] Edge Extrude Free: Axis Snap OFF + Free preserves the original unconstrained ribbon drag

- [ ] Edge Extrude Plane: arm Extrude, choose Plane, drag one boundary edge and confirm free 2D motion remains perpendicular to the grabbed edge
- [ ] Edge Extrude Plane: after a Plane pull, the new outer edge remains selected and another Plane pull can continue immediately
- [ ] Edge Extrude Plane: switching between Plane and X/Y/Z/Auto while Extrude is armed does not disarm the tool

- [ ] Edge Extrude selection handoff: while armed, tap the selected outer edge to deselect it without losing Extrude or the active constraint
- [ ] Edge Extrude selection handoff: tap a different valid boundary edge and confirm selection switches while Extrude + Plane/X/Y/Z/Auto remain armed
- [ ] Edge Extrude direct handoff: drag a different valid boundary edge without preselecting it and confirm BoxLab switches selection and extrudes it in the same gesture

- [ ] Symmetry/Bisect: Object mode launcher opens exclusive Tool Session with visible origin plane
- [ ] Symmetry/Bisect X/Y/Z: changing axis updates live preview around the object local origin
- [ ] Symmetry/Bisect Keep + / Keep −: retained side swaps correctly
- [ ] Symmetry/Bisect Mirror ON: kept half is mirrored and centre seam is welded
- [ ] Symmetry/Bisect Mirror OFF: destructive bisect leaves the cut boundary open
- [ ] Symmetry/Bisect Apply is one Undo step and Cancel leaves source geometry unchanged
- [ ] Frozen Beta 4 remains v0.36.18.427 while live main advances beyond it

- [ ] Solidify with non-destructive Mirror enabled evaluates the mirrored result, previews correctly, and Apply produces one editable closed solid
- [ ] Solidify Apply on a mirrored object bakes the Mirror result and clears the old Mirror modifier so geometry is not doubled
- [ ] Undo after mirrored Solidify restores the pre-Solidify object/modifier state as one Object-history step

- [ ] Solidify on a mirrored open sheet operates on the base editable half/object and preserves the non-destructive Mirror modifier
- [ ] mirrored Solidify preview shows the added shell geometry on both mirrored sides
- [ ] Solidify Apply leaves Mirror enabled and the resulting mirrored solid visually intact
- [ ] Undo after mirrored Solidify restores the pre-Solidify base mesh while Mirror remains a modifier

- [ ] Solidify + Mirror seam: a half-sheet whose boundary lies on the active mirror plane solidifies without creating a side wall on that seam
- [ ] Solidify + Mirror seam: inner seam vertices remain exactly on the mirror plane after thickness offset
- [ ] Solidify + Mirror seam: evaluated mirrored result is closed/manifold after Apply while the editable half remains open only on symmetry seams
- [ ] Mirror remains enabled after mirror-aware Solidify Apply

- [ ] Face Delete + Solidify: delete three adjacent faces from a cube and confirm the remaining open 3-face corner Solidifies successfully
- [ ] Face Delete compaction removes only accidental orphan vertices and does not delete explicitly loose vertices/edges
- [ ] Face Delete remains one Undo step and restores the original cube cleanly

- [ ] Symmetry/Bisect .433: drag the yellow X/Y/Z plane with Pencil/mouse and confirm touch still orbits/pans/zooms normally
- [ ] Symmetry/Bisect .433: Geometry Snap moves the plane to active/visible Vertex, Edge/Midpoint or Face hit positions
- [ ] Symmetry/Bisect .433: Reset Origin returns the active plane offset to 0
- [ ] Symmetry/Bisect .433: Keep + / Keep − and Mirror remain live while the plane is moved
- [ ] Symmetry/Bisect .433: Apply welds mirrored geometry on the moved plane and Undo restores the source object in one step

- [ ] Symmetry/Bisect .434: while the Tool Session is active, Rotate changes the yellow plane and does not rotate the source object
- [ ] Symmetry/Bisect .434: Move continues to move the plane; Scale is disabled for the infinite plane
- [ ] Symmetry/Bisect .434: Free Rotate produces a true oblique cut/mirror, not just a rotated guide
- [ ] Symmetry/Bisect .434: X/Y/Z transform constraints rotate the plane around the chosen world axis; 15° rotation snap still applies
- [ ] Symmetry/Bisect .434: Apply/Cancel restores normal Object transform ownership

- [ ] Symmetry/Bisect .435: Align to Face arms a one-shot pick and tapping a source face moves/orients the plane to that face
- [ ] Symmetry/Bisect .435: Align to Face ignores touch navigation and uses Pencil/mouse for the face pick
- [ ] Symmetry/Bisect .435: Flip Plane reverses the plane normal in place and Keep + / Keep − responds predictably
- [ ] Symmetry/Bisect .435: after Align to Face, Move and Rotate continue to edit the plane and Apply creates the matching cut/mirror

- [ ] Transform Tool .436: select one editable object, start Transform, tap a face on another visible object and confirm the object centre snaps to the hit while +Y aligns to the face normal
- [ ] Transform Tool .436: Pencil/mouse drag in Move slides across the picked surface plane while touch still orbits/pans/zooms
- [ ] Transform Tool .436: a tap cycles Move → Rotate → Scale → Move without moving the object
- [ ] Transform Tool .436: Rotate spins around the target face normal and honours existing 15° snap; Scale works from the placement point
- [ ] Transform Tool .436: Cancel restores the exact pre-tool scene; Apply is one Object Undo step
- [ ] Transform Tool .436: linked objects retain shared geometry while placement remains independent through the existing instanceMatrix path

- [ ] Transform Tool .437: launch Transform and first tap chooses a source face on the selected object
- [ ] Transform Tool .437: second tap chooses the target face on another visible object
- [ ] Transform Tool .437: source face centre lands on the target hit point and source/target normals oppose, producing face-to-face contact without half the object intersecting the target
- [ ] Transform Tool .437: Move → Rotate → Scale tap-cycle remains unchanged after face-to-face placement

- [ ] Insert Tool .438: select one editable Object, launch Insert, pick a source face, then pick a target face on another visible object
- [ ] Insert Tool .438: the target pick creates a linked instance and leaves the original source object in place
- [ ] Insert Tool .438: the source face lands face-to-face on the target; Move → Rotate → Scale tap-cycle behaves like Transform while touch navigation remains normal
- [ ] Insert Tool .438: after Apply, component edits propagate between source and inserted instance while their Object placements remain independent
- [ ] Insert Tool .438: Cancel removes the temporary inserted instance exactly; Apply is one Object Undo step and Undo removes the insertion

- [ ] Mesh Health .439: default closed cube reports Closed · Clean with zero boundary/non-manifold/orphan issues
- [ ] Mesh Health .439: a valid open sheet reports Open · Clean rather than Issues Found
- [ ] Mesh Health .439: broken topology reports counts for non-manifold/duplicate/degenerate/winding/orphan problems as applicable
- [ ] Mesh Health .439: triangle/quad/ngon counts match the inspected active mesh
- [ ] Mesh Health .439: Refresh updates the report after edits without changing geometry
- [ ] Mesh Health .439: Close leaves mesh/history untouched and restores normal Object Active Tools

- [ ] Mesh Health .440: Safe Repair is disabled when the active mesh has no safe automatic repair candidates
- [ ] Mesh Health .440: exact same-direction duplicate faces are removed and report updates immediately
- [ ] Mesh Health .440: zero-area faces are removed without changing healthy faces
- [ ] Mesh Health .440: accidental orphan vertices are compacted while intentional loose vertices/edges are preserved
- [ ] Mesh Health .440: opposite-winding coincident faces are not auto-deleted
- [ ] Mesh Health .440: one Undo restores the exact pre-repair Object scene

- [ ] Mesh Health .441: cube with one deleted face reports Open · Clean and enables Auto Close
- [ ] Mesh Health .441: Auto Close caps the hole with correct winding and immediately reports Closed · Clean
- [ ] Mesh Health .441: multiple disjoint simple holes close together in one operation
- [ ] Mesh Health .441: branched/open boundary graphs keep Auto Close disabled/refused
- [ ] Mesh Health .441: meshes with existing topology issues are not auto-capped
- [ ] Mesh Health .441: one Undo restores the exact pre-close open mesh

- [ ] Mesh Health .442: a cube with one deleted face reports one boundary group / one loop
- [ ] Mesh Health .442: branched boundary topology is labelled branched rather than a closable loop
- [ ] Mesh Health .442: Select Boundary exits to Edge mode with all boundary edges selected
- [ ] Mesh Health .442: Select Non-Manifold exits to Edge mode with all non-manifold edges selected
- [ ] Mesh Health .442: diagnostic selection does not change geometry or create an Undo step

- [ ] Mesh Health .443: reversing one cube face makes Unify Winding available and it restores consistent winding
- [ ] Mesh Health .443: Flip Normals reverses the whole object and one Undo restores the prior winding
- [ ] Mesh Health .443: Triangulate converts cube quads to triangles while staying Closed · Clean
- [ ] Mesh Health .443: concave n-gon triangulates without creating invalid/non-manifold topology
- [ ] Mesh Health .443: each normals/triangulation action is one Object Undo step

- [ ] Export .444: Base OBJ status reports closed/open/issues preflight counts
- [ ] Export .444: exported OBJ contains per-object Mesh Health comments and scene preflight summary
- [ ] Export .444: OBJ contains both object and group records for each editable object
- [ ] Export .444: Mirror is evaluated before export preflight
- [ ] Export .444: SubD OBJ preflight reflects the subdivided export mesh, not only the base cage
- [ ] Export .444: Reference objects remain excluded from scene OBJ export

- [ ] Facegroups .445: import one OBJ object with 8 groups and confirm it remains one BoxLab object by default
- [ ] Facegroups .445: imported object retains 8 facegroup IDs internally
- [ ] Facegroups .445: enable Split objects by groups and confirm the same file imports as 8 BoxLab objects
- [ ] Facegroups .445: Base OBJ export writes one object plus preserved group records and round-trips the 8 groups
- [ ] Facegroups .445: moving/scaling/rotating the object does not lose facegroup metadata
- [ ] Facegroups .445: Extrude/Inset/face split descendants inherit the parent facegroup
- [ ] Facegroups .445: Mirror/SubD descendants inherit parent facegroups
- [ ] Facegroups .445: new Auto Close cap faces are ungrouped

- [ ] Facegroups .446: Viewport > Render Look includes Facegroups
- [ ] Facegroups .446: imported groups display with distinct stable colours
- [ ] Facegroups .446: ungrouped faces display neutral grey
- [ ] Facegroups .446: switching back to Studio/Solid restores normal rendering
- [ ] Facegroups .446: Mirror/SubD descendants retain and display inherited group colours
- [ ] Facegroups .446: inactive objects also show facegroup colours

- [ ] Facegroups .447: colour controls appear only while Viewport > Facegroups is active
- [ ] Facegroups .447: Default / Soft / Vivid / High Contrast visibly change the palette
- [ ] Facegroups .447: Saturation and Lightness update facegroup display live
- [ ] Facegroups .447: Ungrouped colour updates ungrouped faces only
- [ ] Facegroups .447: Reseed changes group colour assignment without changing facegroup IDs
- [ ] Facegroups .447: Reset restores default facegroup display settings
- [ ] Facegroups .447: settings persist after reload while OBJ export remains unchanged

- [ ] Facegroups .448: from Studio/Solid, first tap on Facegroups immediately shows group colours with no palette-button press
- [ ] Facegroups .448: first activation never renders the mesh near-black if evaluated mesh/body geometry is temporarily unsynchronised
- [ ] Facegroups .448: current persisted palette/Saturation/Lightness/Ungrouped settings are applied on first activation
- [ ] Facegroups .448: switching away and back to Facegroups immediately restores colours

- [ ] Viewport .449: menu remains within iPad landscape screen height
- [ ] Viewport .449: menu scrolls vertically with touch/Pencil when content exceeds available height
- [ ] Viewport .449: Facegroup colour controls and lower Studio Light controls are reachable without browser-page scrolling
- [ ] Viewport .449: tapping View Direction / Render Look controls still works after scrolling

- [ ] UI .450: Object mode home shows launch buttons only; inactive Symmetry/Transform/Insert/Mesh Health/Array/Revolve/Sweep settings are not visible
- [ ] UI .450: pressing an Object Tool Session launcher replaces mode-home clutter with that tool's settings, then returns cleanly on Apply/Cancel/Close
- [ ] UI .450: Boolean appears as one button at rest; Union/Cut/Intersect appear only after pressing Boolean
- [ ] UI .450: Face mode shows only Shell button at rest; Shell thickness/settings appear only while Shell is active
- [ ] UI .450: Vertex Slide number/exact controls appear only while Slide is active
- [ ] UI .450: Vertex Bevel width/exact controls appear only while Bevel is active
- [ ] UI .450: Edge and Face existing direct-tool behaviour remains unchanged

- [ ] UI .451: Face Inset arms normally and drag performs Inset rather than Move
- [ ] UI .451: Face Extrude retains strong cavity-aware Through behaviour from the proven pre-clean baseline
- [ ] UI .451: Face Exact row is absent at rest and appears as Extrude Exact / Inset Exact only for the armed tool
- [ ] UI .451: Edge Bevel arms and drag bevels the selected edge(s)
- [ ] UI .451: Edge Lathe/Revolve shows one launcher at rest; axis/segments/Apply/Cancel appear only while active
- [ ] UI .451: Edge Slide / Offset / Loop / Bevel settings are contextual rather than permanently exposed
- [ ] UI .451: Vertex Bevel arms and drag bevels the selected vertex/vertices
- [ ] UI .451: Boolean Union/Cut/Intersect result returns to the exact pre-Boolean scene with one Undo
- [ ] UI .451: Revolve Profile launches directly from Active Tools, can be positioned/edited, and Cancel restores the pre-tool scene

- [ ] .452 Face Inset: with Move previously used, arm Inset and drag selected face; transform must not steal gesture
- [ ] .452 Edge Bevel: with Move previously used, arm Bevel and drag selected edge(s); bevel owns pointer
- [ ] .452 Vertex Bevel: with Move previously used, arm Bevel and drag selected vertex/vertices; bevel owns pointer
- [ ] .452 Edge Revolve: launcher directly arms selected loose-edge profile and reveals axis/segments/Apply/Cancel
- [ ] .452 Boolean: Union/Cut/Intersect result returns to exact pre-operation scene with one Undo
- [ ] .452 Through: cavity-aware Through remains unchanged and still passes previous hard cases


## v0.36.18.453 recovery sanity

- [ ] Inset arms and drags the inset rather than moving the selected Face
- [ ] Edge Bevel arms and Pencil drag produces a bevel
- [ ] Vertex Bevel arms and Pencil drag produces a bevel
- [ ] Boolean direct controls operate and one Undo restores the exact pre-Boolean scene
- [ ] Edge Revolve arms and produces its preview/result using the proven pre-cleanup interaction path
- [ ] orbit / pan / zoom remain available whenever no direct tool owns the gesture
- [ ] the .450-.452 presentation wrappers are not loaded in the live runtime


## v0.36.18.454 interaction recovery

- [ ] one-finger touch orbits without component paint-selection stealing the gesture
- [ ] two-finger pan and pinch zoom begin reliably over mesh geometry
- [ ] Face Inset arms and drags the inset rather than moving the selected Face
- [ ] Edge Bevel arms and Pencil drag produces a bevel
- [ ] Vertex Bevel arms and Pencil drag produces a bevel
- [ ] Boolean operation completes and one Undo restores the pre-operation scene
- [ ] Edge Revolve arms and produces its preview/result
- [ ] inactive Symmetry / Transform / Insert sessions do not affect viewport interaction


## v0.36.18.449 recovery baseline

- [ ] one-finger orbit, two-finger pan and pinch zoom work over mesh geometry
- [ ] Face Extrude works with the established .449 interaction path
- [ ] Face Inset works with the established .449 interaction path
- [ ] Extrude Through retains the strong cavity-aware behaviour present at .449
- [ ] Edge Bevel and Vertex Bevel arm and drag correctly
- [ ] Boolean completes and one Undo restores the exact pre-Boolean scene
- [ ] Edge Revolve works using the .449 interaction path
- [ ] Object/Face/Edge/Vertex mode switching and persistent selection remain stable


- [ ] Facegroups .455: colour controls appear only while Facegroups is active
- [ ] Facegroups .455: Default / Soft / Vivid / Contrast visibly change group colours
- [ ] Facegroups .455: Saturation and Lightness update display live
- [ ] Facegroups .455: Ungrouped colour changes ungrouped faces only
- [ ] Facegroups .455: Reseed changes display colours without changing group IDs
- [ ] Facegroups .455: Reset restores defaults and settings persist after reload
- [ ] Facegroups .455: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .456: grouped OBJ remains one BoxLab object by default and Facegroups colours are visible
- [ ] Facegroups .456: Split objects by groups checkbox is present and OFF by default
- [ ] Facegroups .456: enabling Split objects by groups imports one object per OBJ group
- [ ] Facegroups .456: Facegroups mode colours active and inactive editable objects from their authoritative mesh data
- [ ] Facegroups .456: Studio ↔ Facegroups switching remains clean
- [ ] Facegroups .456: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .457: first tap from Studio/Solid immediately shows facegroup colours without pressing Reseed
- [ ] Facegroups .457: first activation never renders the mesh near-black while geometry is unsynchronised
- [ ] Facegroups .457: persisted palette/Saturation/Lightness/Ungrouped settings apply on first activation
- [ ] Facegroups .457: switching away and back immediately restores colours
- [ ] Facegroups .457: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .458: first activation shows group colours without Reseed
- [ ] Facegroups .458: temporarily unsynchronised body remains normal material, never dark vertex-colour material
- [ ] Facegroups .458: pending body retries automatically and clears pending when colours apply
- [ ] Facegroups .458: switching Studio ↔ Facegroups remains clean
- [ ] Facegroups .458: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .459: grouped OBJ + Mirror X shows the same facegroup colour on source and mirrored descendant faces
- [ ] Facegroups .459: Mirror Y/Z and multi-axis Mirror preserve facegroups without colour mismatch/dark fallback
- [ ] Facegroups .459: inactive mirrored objects also show inherited Facegroup colours
- [ ] Facegroups .459: first Facegroups activation remains immediate without Reseed
- [ ] Facegroups .459: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .460: grouped OBJ + SubD Preview preserves parent colours on all subdivided child faces
- [ ] Facegroups .460: SubD levels 1–4 preserve facegroup assignment consistently
- [ ] Facegroups .460: SubD + Mirror together preserve inherited colours and do not trigger dark fallback
- [ ] Facegroups .460: inactive SubD objects also show inherited Facegroup colours
- [ ] Facegroups .460: first activation remains immediate without Reseed
- [ ] Facegroups .460: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .461: Safe Repair preserves facegroups on all surviving faces
- [ ] Facegroups .461: Auto Close preserves existing groups and new cap faces appear Ungrouped/neutral
- [ ] Facegroups .461: Unify Winding preserves facegroup assignment
- [ ] Facegroups .461: Flip Normals preserves facegroup assignment
- [ ] Facegroups .461: Triangulate gives each child triangle its parent polygon facegroup
- [ ] Facegroups .461: first activation, Mirror and SubD behaviour remain correct
- [ ] Facegroups .461: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .462: Extract Faces new object retains the selected faces' original group colours
- [ ] Facegroups .462: source object retains correct groups after extraction
- [ ] Facegroups .462: Solidify original + inner duplicate faces share the same group IDs
- [ ] Facegroups .462: Solidify new side-wall faces are Ungrouped/neutral
- [ ] Facegroups .462: Shell preserves surviving groups, inner shell inheritance and ungrouped new side walls
- [ ] Facegroups .462: first activation, Mirror, SubD and Mesh Health preservation remain correct
- [ ] Facegroups .462: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .463: Join two grouped editable objects and confirm every original group colour survives in the combined object
- [ ] Facegroups .463: ungrouped faces remain Ungrouped after Join
- [ ] Facegroups .463: Join with compatible Mirror/SubD settings preserves Facegroup display after evaluation
- [ ] Facegroups .463: first activation, Mirror, SubD, Mesh Health, Extract, Solidify and Shell remain correct
- [ ] Facegroups .463: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Recovery .464: Shell launches, previews, adjusts thickness, Apply works, Cancel leaves source unchanged
- [ ] Recovery .464: Solidify works with its established preview/apply behavior
- [ ] Recovery .464: Extract Faces still preserves Facegroups
- [ ] Recovery .464: Object Join still preserves Facegroups
- [ ] Recovery .464: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .465: Solidify source faces retain original group colours
- [ ] Facegroups .465: Solidify inner duplicate faces inherit the same group colours
- [ ] Facegroups .465: Solidify generated side walls are Ungrouped/neutral
- [ ] Facegroups .465: failed/rolled-back Solidify restores original faceGroups exactly
- [ ] Recovery .465: Shell still launches, previews, adjusts thickness, Apply/Cancel correctly
- [ ] Facegroups .465: prior Mirror/SubD/Mesh Health/Extract/Join and modelling sentinels remain healthy


- [ ] Facegroups .466: Shell on grouped closed mesh still launches, previews, adjusts thickness and applies correctly
- [ ] Facegroups .466: removed opening faces no longer appear in faceGroups
- [ ] Facegroups .466: surviving outer faces retain original Facegroup colours
- [ ] Facegroups .466: inner Shell faces inherit the same groups via Solidify
- [ ] Facegroups .466: generated side walls remain Ungrouped/neutral
- [ ] Facegroups .466: Cancel/rollback restores the exact pre-Shell faceGroups


- [ ] Viewport .467: menu remains within iPad landscape screen height
- [ ] Viewport .467: menu scrolls vertically with touch/Pencil when content exceeds available height
- [ ] Viewport .467: Facegroup controls and lower Studio controls remain reachable
- [ ] Viewport .467: tapping View Direction / Render Look controls still works after scrolling
- [ ] Viewport .467: modelling/navigation sentinels remain unaffected


- [ ] UI .468: Object mode home shows launchers only; inactive Tool Session settings are not visible
- [ ] UI .468: Solidify, Symmetry/Bisect, Transform, Insert, Mesh Health, Array, Revolve Profile and Sweep settings appear only while active
- [ ] UI .468: Boolean appears as one launcher at rest; Union/Cut/Intersect + Close appear only in the Boolean Tool Session
- [ ] UI .468: Apply/Cancel/Close returns the Active Tools drawer cleanly to Object home
- [ ] UI .468: Face Inset still arms/selects/drags correctly
- [ ] UI .468: Edge Bevel and Vertex Bevel still arm/select/drag correctly
- [ ] UI .468: Extrude and cavity-aware Through remain unchanged
- [ ] UI .468: orbit / pan / zoom remain unchanged


- [ ] Workflow .469: Add > Revolve Profile creates the construction plane and opens the expected workflow
- [ ] Workflow .469: Revolve Profile Cancel restores the scene cleanly
- [ ] Workflow .469: Sweep shows Cancel Sweep at Profile / Path / Finish stages
- [ ] Workflow .469: Sweep Cancel restores the pre-Sweep scene and history state
- [ ] Workflow .469: changing selection mode while Sweep is active cancels Sweep cleanly
- [ ] Workflow .469: launching another Tool Session while Sweep is active cancels Sweep first
- [ ] Workflow .469: Inset, Edge Bevel, Vertex Bevel, Extrude, Through and navigation remain unaffected

- [ ] UI .470: Edge mode home shows a single Revolve launcher; Lathe/Revolve label, X/Y/Z and Segments are hidden at rest
- [ ] UI .470: selecting a valid loose-edge profile and pressing Revolve reveals X/Y/Z + Segments and starts the established preview
- [ ] UI .470: Apply returns Revolve to the compact resting state
- [ ] UI .470: leaving Edge mode or other Revolve cancellation returns Revolve to the compact resting state
- [ ] UI .470: Revolve topology/history behavior is unchanged
- [ ] UI .470: Inset, Edge Bevel, Vertex Bevel, Extrude, Through and orbit/pan/zoom remain unaffected

- [ ] Workflow .471: Add > Sweep creates and leaves visible the Sweep construction object rather than immediately restoring the previous scene
- [ ] Workflow .471: newly added Sweep opens its PROFILE / PATH / FINISH Tool Session normally
- [ ] Workflow .471: Cancel Sweep still restores the exact pre-Sweep scene/history
- [ ] Workflow .471: changing selection mode after Sweep already exists still cancels Sweep cleanly
- [ ] UI .471: Edge Active Tools no longer shows Revolve
- [ ] Workflow .471: Inset, Edge Bevel, Vertex Bevel, Extrude, Through and orbit/pan/zoom remain unaffected

- [ ] Workflow .472: Add > Sweep creates a Sweep construction object without any inert/no-op failure
- [ ] Workflow .472: Sweep PROFILE / PATH / FINISH session appears after Add
- [ ] Workflow .472: Cancel Sweep and later selection-mode escape still restore the exact pre-Sweep scene
- [ ] UI .472: Edge Bevel Exact % appears above Slide % and Offset % controls in Edge Active Tools
- [ ] UI .472: Edge Revolve remains absent
- [ ] Workflow .472: Inset, Edge Bevel drag, Vertex Bevel, Extrude, Through and orbit/pan/zoom remain unaffected

- [ ] Workflow .473: Symmetry/Bisect Tool Session exposes an explicit Bisect Only button
- [ ] Workflow .473: Bisect Only inserts a cut across intersected faces while retaining geometry on both sides
- [ ] Workflow .473: Bisect Only does not mirror either side and does not delete either side
- [ ] Workflow .473: moved / rotated / Align-to-Face plane positions are respected by Bisect Only
- [ ] Workflow .473: split faces preserve their source facegroup assignment
- [ ] Workflow .473: existing Symmetry Apply / Keep half behavior remains unchanged

- [ ] UI .474: Vertex mode home hides Slide % exact controls until Slide is armed
- [ ] UI .474: Vertex mode home hides Bevel Width / Exact % controls until Bevel is armed
- [ ] UI .474: arming Slide reveals only Slide controls; disarming or changing mode hides them again
- [ ] UI .474: arming Bevel reveals only Bevel controls; disarming or changing mode hides them again
- [ ] Workflow .474: Vertex Add, Build Edge, Slide drag/exact, Bevel drag/exact, Join, Weld, Delete remain functional
- [ ] Workflow .474: Vertex Move / Scale / Rotate and orbit/pan/zoom remain unchanged

- [ ] UI .475: Edge mode home hides Loop count/slide settings until Loop is armed
- [ ] UI .475: Edge mode home hides Bevel Width / Segments / Exact % until Bevel is armed
- [ ] UI .475: Edge mode home hides Crease Strength until Crease is armed
- [ ] UI .475: Edge mode home hides Slide % until Edge Slide is armed
- [ ] UI .475: Edge mode home hides Offset % / Support Spacing until Offset Loop is armed
- [ ] Workflow .475: Loop Cut, Bevel drag/exact, Crease/Uncrease, Edge Slide, Offset Loop, Fill/Bridge/Dissolve/Delete remain functional
- [ ] Workflow .475: Edge selection, Move / Scale / Rotate and orbit/pan/zoom remain unchanged

- [ ] UI .476: Loop Slide slider sits directly below Loops while Loop is active
- [ ] UI .476: Edge Bevel Exact % row/readout sit directly below Segments while Bevel is active
- [ ] UI .476: Offset Loop Support Spacing sits above Exact Offset % row/readout
- [ ] UI .476: Crease Strength is hidden whenever Crease is not active
- [ ] Workflow .476: arming Bevel / Edge Slide / Offset Loop / Face Split / another Edge tool disarms Crease
- [ ] Workflow .476: choosing Move / Scale / Rotate or leaving Edge mode disarms Crease
- [ ] Workflow .476: Loop, Bevel, Crease, Edge Slide, Offset Loop and navigation remain functional

- [ ] Workflow .477: arming Edge Bevel while Loop is active disarms Loop first
- [ ] Workflow .477: arming Loop while Edge Bevel is active disarms Bevel first
- [ ] Workflow .477: Loop and Bevel are never visually active at the same time
- [ ] Workflow .477: selected Face rotates by viewport drag with Rotate armed
- [ ] Workflow .477: Face Rotate numeric Degrees and X/Y/Z constraints remain functional
- [ ] Workflow .477: Face Move/Scale, Vertex/Edge transforms and orbit/pan/zoom remain unchanged

- [ ] Workflow .478: with Loop active, one tap on Bevel disarms Loop and arms Bevel
- [ ] Workflow .478: with Bevel active, one tap on Loop disarms Bevel and arms Loop
- [ ] Workflow .478: Loop -> Split remains a one-tap handoff

- [ ] Workflow .479: select one Face, arm Rotate, Pencil-drag the selected face and confirm visible rotation
- [ ] Workflow .479: selected Face remains selected after Rotate commit
- [ ] Workflow .479: multi-face selection rotates as one selection about its combined center
- [ ] Workflow .479: Face Move and Scale still work
- [ ] Workflow .479: Vertex / Edge / Object Rotate remain unchanged
- [ ] Navigation .479: one-finger orbit, two-finger pan and pinch zoom remain unchanged while Rotate is not Pencil-dragging a selected Face

- [ ] Workflow .480: Vertex multi-selection rotates with Rotate armed
- [ ] Workflow .480: selected Edge rotates with Rotate armed
- [ ] Workflow .480: selected Face rotates with Rotate armed
- [ ] Workflow .480: Move and Scale still work in Vertex / Edge / Face
- [ ] Navigation .480: orbit / pan / zoom remain unchanged

- [ ] Workflow .481: selected Vertex/Vertices visibly rotate during Pencil drag
- [ ] Workflow .481: selected Edge visibly rotates during Pencil drag
- [ ] Workflow .481: selected Face visibly rotates during Pencil drag
- [ ] Workflow .481: Move and Scale remain functional in Vertex / Edge / Face
- [ ] Navigation .481: one-finger orbit, two-finger pan and pinch zoom remain unchanged outside an active component transform

- [ ] Workflow .482: with Vertex selection + Rotate armed, Pencil-drag anywhere in viewport rotates selection
- [ ] Workflow .482: with Edge selection + Rotate armed, Pencil-drag anywhere in viewport rotates selection
- [ ] Workflow .482: with Face selection + Rotate armed, Pencil-drag anywhere in viewport rotates selection
- [ ] Workflow .482: Move/Scale still require their normal selected-component interaction
- [ ] Navigation .482: orbit/pan/zoom unchanged while Rotate is not armed

- [ ] Workflow .483: Vertex selection rotates in Free/View mode
- [ ] Workflow .483: Edge selection rotates in Free/View mode
- [ ] Workflow .483: Face selection still rotates in Free/View mode
- [ ] Workflow .483: X / Y / Z constrain Vertex / Edge / Face Rotate to the selected world axis
- [ ] Workflow .483: 15° button ON snaps component Rotate to 15-degree increments
- [ ] Workflow .483: 15° button OFF allows smooth unsnapped rotation
- [ ] Workflow .483: Move / Scale remain unchanged in Vertex / Edge / Face

- [ ] Workflow .484: arm Extrude, tap unselected face -> it adds to current Face selection
- [ ] Workflow .484: arm Extrude, tap already-selected face -> only that face deselects and Extrude stays armed
- [ ] Workflow .484: arm Extrude, drag selected face -> Extrude still executes
- [ ] Workflow .484: repeat the same three checks for Inset
- [ ] Workflow .484: multi-face additive selection still works after an Extrude/Inset operation
- [ ] Regression .484: Through, component Rotate and viewport navigation remain unchanged

- [ ] Workflow .485: Extrude armed -> tap unselected face adds it and keeps previous faces selected
- [ ] Workflow .485: Extrude armed -> tap selected face removes only that face
- [ ] Workflow .485: Extrude armed -> repeat add/remove across several faces without disarming
- [ ] Workflow .485: Extrude armed -> drag unselected face adds it to working selection and extrudes in one gesture
- [ ] Workflow .485: repeat all four checks for Inset
- [ ] Regression .485: Through, component Rotate .483 and viewport navigation remain unchanged

- [ ] Workflow .486: Extrude armed -> repeatedly tap several unselected faces and confirm each stays selected
- [ ] Workflow .486: Extrude armed -> tap selected faces and confirm only those faces deselect
- [ ] Workflow .486: Inset armed -> repeat additive select and deselect across several faces
- [ ] Workflow .486: drag selected or newly hit face still performs the armed tool
- [ ] Regression .486: no face flash/drop during armed selection taps
- [ ] Regression .486: Through, Rotate .483 and viewport navigation remain unchanged

- [ ] Workflow .487: Extrude armed -> tap several different unselected faces and each remains selected
- [ ] Workflow .487: Extrude armed -> tap selected faces to remove them without disarming
- [ ] Workflow .487: Inset armed -> repeat additive and subtractive face selection
- [ ] Workflow .487: drag a selected/newly hit face still performs the armed operation
- [ ] Regression .487: no flash/drop on additive selection
- [ ] Regression .487: Through, Rotate .483 and viewport navigation remain unchanged

- [ ] Workflow .488: Extrude armed -> tap an unselected face and confirm native Face selection adds it without flashing away
- [ ] Workflow .488: continue tapping additional unselected faces and confirm additive selection builds up
- [ ] Workflow .488: tap selected faces to remove them while Extrude stays armed
- [ ] Workflow .488: drag a newly selected face in one gesture and confirm Extrude takes over after threshold
- [ ] Workflow .488: repeat the same four checks for Inset
- [ ] Regression .488: Through, Rotate .483 and viewport navigation remain unchanged

- [ ] Workflow .489: Extrude armed -> tap multiple unselected faces; each remains selected
- [ ] Workflow .489: Extrude armed -> tap selected faces to remove them without disarming
- [ ] Workflow .489: Inset armed -> repeat additive/subtractive multi-selection
- [ ] Workflow .489: drag selected or newly hit face still performs Extrude/Inset
- [ ] Regression .489: Through and component Rotate .483 still work
- [ ] Regression .489: viewport navigation unchanged

- [ ] Workflow .490: Extrude armed -> tap unselected face with no drag; it remains selected
- [ ] Workflow .490: continue tapping more unselected faces; selection builds additively
- [ ] Workflow .490: tap selected faces; they deselect individually
- [ ] Workflow .490: drag after selecting still promotes into Extrude
- [ ] Workflow .490: repeat all four checks for Inset
- [ ] Regression .490: Through, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .491: Extrude armed -> tap unselected face A, B, C with no drag; all remain selected
- [ ] Workflow .491: tap selected face B; only B deselects and Extrude remains armed
- [ ] Workflow .491: repeat additive/subtractive taps for Inset
- [ ] Workflow .491: drag after threshold still performs Extrude/Inset on working selection
- [ ] Regression .491: Through and component Rotate .483 still work
- [ ] Regression .491: viewport navigation unchanged

- [ ] Diagnostic .492: arm Extrude, tap one unselected face without dragging
- [ ] Diagnostic .492: report the final FaceTap status-bar text after the tap
- [ ] Diagnostic .492: repeat once with Inset
- [ ] Do not evaluate progressive disclosure from .492; this build only traces armed Face tap state

- [ ] Workflow .495: with Face 1 selected, arm Extrude and tap overlapping Face 4 position; Face 4 is added instead of Face 1 being removed
- [ ] Workflow .495: tap a selected face where no unselected Face is also under the Pencil; it still deselects
- [ ] Workflow .495: repeat both checks for Inset
- [ ] Workflow .495: drag still promotes into Extrude/Inset normally
- [ ] Regression .495: ordinary Face selection outside armed tools unchanged
- [ ] Regression .495: Through, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .496: arm Extrude, build a multi-face selection, press Selection > Deselect, then tap a new face without re-arming
- [ ] Workflow .496: Extrude remains visibly armed after Deselect
- [ ] Workflow .496: repeat the same empty-selection restart for Inset
- [ ] Regression .496: .495 additive overlap selection still works
- [ ] Regression .496: Through, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .497: Selection depth = Visible, Extrude armed -> tapping a visible face selects only the nearest visible face
- [ ] Workflow .497: build a multi-face selection across separately visible faces without selecting rear faces
- [ ] Workflow .497: tap a selected visible face to deselect it
- [ ] Workflow .497: drag selected visible face(s) -> Extrude operates only on selected visible faces
- [ ] Workflow .497: repeat visible-only checks for Inset
- [ ] Regression .497: no unintended rear-face/through selection while Visible is active
- [ ] Regression .497: Through topology, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .498: Visible + Extrude armed -> tap a visible unselected face; it selects without rear-face selection
- [ ] Workflow .498: tap additional separately visible faces; selection builds additively
- [ ] Workflow .498: tap selected visible face; it deselects
- [ ] Workflow .498: drag selected face(s); Extrude affects only selected visible faces
- [ ] Workflow .498: repeat the same checks for Inset
- [ ] Regression .498: no rear/opposite Face selection while Visible is active
- [ ] Regression .498: Through topology, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .499: Extrude armed -> tap unselected visible face; it remains selected with no flash/drop
- [ ] Workflow .499: tap additional visible faces; selection builds additively
- [ ] Workflow .499: tap selected face; it deselects while Extrude remains armed
- [ ] Workflow .499: drag selected face(s); Extrude works
- [ ] Workflow .499: repeat all checks for Inset
- [ ] Regression .499: no rear/through selection while Visible is active
- [ ] Regression .499: ordinary Face selection outside armed tools unchanged
- [ ] Regression .499: Through topology, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .502: Face home -> exact Value row/readout and Repeat Previous are hidden
- [ ] Workflow .502: arm Extrude -> exact Value row/readout and Repeat Previous appear
- [ ] Workflow .502: disarm Extrude -> contextual controls hide again
- [ ] Workflow .502: arm Inset -> same contextual controls appear
- [ ] Regression .502: armed Extrude/Inset multi-face select/deselect from .501 still works
- [ ] Regression .502: Extrude, Inset, Through, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .503: Face home -> Value/readout/Repeat Previous remain hidden
- [ ] Workflow .503: arm Extrude -> Value/readout/Repeat Previous appear directly below the Extrude/Inset/Knife row
- [ ] Workflow .503: arm Inset -> same placement and visibility
- [ ] Workflow .503: disarm tool -> contextual controls hide again
- [ ] Regression .503: .501 armed Face multi-select/deselect/drag still works

- [ ] Workflow .504: Face mode -> Extrude / Inset / Knife row is directly below FACE title
- [ ] Workflow .504: arm Extrude or Inset -> Value/readout/Repeat appear directly below that primary row
- [ ] Workflow .504: Inspect then Repair sit near the bottom directly above Topology Gate
- [ ] Workflow .504: late startup does not move Inspect/Repair above primary Face tools
- [ ] Regression .504: .501 armed Face multi-select/deselect/drag remains unchanged

- [ ] Workflow .505: Face tools form three compact rows with no full-width Sweep/Join waste
- [ ] Workflow .505: Row 1 = Extrude / Inset / Knife
- [ ] Workflow .505: Row 2 = Sweep / Join Coplanar / Delete
- [ ] Workflow .505: Row 3 = Extract / Duplicate / Bridge
- [ ] Workflow .505: armed Value/readout/Repeat appear between Row 1 and Row 2
- [ ] Workflow .505: Inspect / Repair / Topology Gate are below all modelling rows
- [ ] Regression .505: .501 armed Face multi-select/deselect/drag still works

- [ ] Workflow .506: all Face modelling/repair tools appear above Inspect
- [ ] Workflow .506: Inspect is followed by Repair, then Topology Gate
- [ ] Workflow .506: nothing in Face mode appears below Topology Gate
- [ ] Regression .506: compact .505 rows remain intact
- [ ] Regression .506: .501 Face multi-select/deselect/drag remains unchanged

- [ ] Workflow .507: Row 1 = Extrude / Inset / Knife
- [ ] Workflow .507: Row 2 = Delete / Duplicate / Extract
- [ ] Workflow .507: Row 3 = Join Coplanar / Bridge / Sweep
- [ ] Workflow .507: Row 4 = Shell / Poke / Circle
- [ ] Workflow .507: Row 5 = Close Holes / Triangulate / Flip
- [ ] Workflow .507: Row 6 = Quad Cleanup / Quadify N-gons / blank
- [ ] Workflow .507: Orient Faces remains in Repair
- [ ] Workflow .507: Inspect / Repair / Topology Gate stay below all Face tools
- [ ] Regression .507: .501 armed Face multi-select/deselect/drag remains unchanged

- [ ] Workflow .508: Edge home Row 1 = Loop / Bevel / Crease
- [ ] Workflow .508: Edge home Row 2 = Split / Extrude / Sweep
- [ ] Workflow .508: Edge home Row 3 = Edge Slide / Offset Loop / Uncrease
- [ ] Workflow .508: Edge home Row 4 = Bridge / Fill / Dissolve Loop
- [ ] Workflow .508: Edge home Row 5 = Dissolve Edge / Delete / blank
- [ ] Workflow .508: Loop / Bevel / Crease / Edge Slide / Offset Loop controls appear only when their tool is active
- [ ] Regression .508: Edge Extrude and Sweep still launch and retain their existing handlers
- [ ] Regression .508: Face .501 armed multi-select/deselect/drag, Through, Rotate .483 and viewport navigation remain unchanged

- [ ] Workflow .509: Sweep active tabs/buttons use the same white active appearance as the rest of BoxLab
- [ ] Regression .509: no blue inset outline appears on Follow Edges, Editing Path, Profile/Path/Finish, or other active Sweep controls
- [ ] Regression .509: Sweep workflow behavior remains unchanged

- [ ] Workflow .510: select a valid boundary edge and arm Edge Extrude -> Move becomes visibly active automatically
- [ ] Workflow .510: Edge Extrude starts with Plane selected by default
- [ ] Workflow .510: Plane drag extrudes freely in the plane perpendicular to the grabbed edge
- [ ] Workflow .510: choose X/Y/Z/Auto after arming -> repeated pulls preserve the chosen constraint rather than resetting to Plane
- [ ] Regression .510: Edge Extrude selection switching/repeated pull behavior remains unchanged
- [ ] Regression .510: Face .501, Through, Rotate .483, Sweep .509 and viewport navigation remain unchanged

- [ ] Workflow .511: Vertex tool rows use the same compact 3-column visual rhythm as Edge and Face
- [ ] Workflow .511: Vertex button order remains stable when Add / Build Edge / Slide / Bevel / Create Face / Circle become available
- [ ] Workflow .511: arming Vertex Slide reveals only Slide controls and does not reshuffle the tool buttons
- [ ] Workflow .511: arming Vertex Bevel reveals only Bevel controls and does not reshuffle the tool buttons
- [ ] Regression .511: Vertex selection and Move / Scale / Rotate remain unchanged
- [ ] Regression .511: Edge .510 and Face .501 interaction remain unchanged

- [ ] Recovery .512: app refreshes and loads in Safari
- [ ] Recovery .512: app refreshes and loads in the other browsers that failed on .511
- [ ] Recovery .512: Vertex / Edge / Face modes open normally
- [ ] Recovery .512: confirmed .510 Edge Extrude Move + Plane behavior remains intact

- [ ] Workflow .513: arm Vertex Bevel -> Width appears directly beneath the tool row and Exact % sits immediately beneath Width
- [ ] Workflow .513: disarm Vertex Bevel -> Width and Exact % both disappear without reshuffling Vertex buttons
- [ ] Workflow .513: select vertex A then vertex B -> Merge to First collapses to A's position
- [ ] Workflow .513: reverse the selection order -> Merge to First collapses to the newly first-selected vertex
- [ ] Regression .513: Merge to Center remains unchanged
- [ ] Regression .513: Vertex Add / Build Edge / Slide / Bevel ordering remains stable

- [ ] Workflow .514: arm Edge Slide -> Slide % exact control appears directly beneath the Slide/Offset/Uncrease tool row
- [ ] Workflow .514: arm Offset Loop while Edge Slide is active -> Edge Slide disarms
- [ ] Workflow .514: arm Edge Slide while Offset Loop is active -> Offset Loop disarms
- [ ] Workflow .514: arm Edge Extrude -> Move is active and Plane, not Free, is visibly/default selected
- [ ] Regression .514: change Edge Extrude to X/Y/Z/Auto -> repeated pulls preserve the user-selected constraint
- [ ] Regression .514: Edge Slide drag and exact entry still work
- [ ] Regression .514: Offset Loop drag and exact entry still work

- [ ] Workflow .515: Edge Sweep launches on the first press
- [ ] Workflow .515: Circle is already present/stable before the first Sweep press; no toolbar mutation occurs under the pointer
- [ ] Workflow .515: Sweep Profile / Path / Finish controls use compact BoxLab sizing
- [ ] Workflow .515: Sweep still defaults to the same profile/path behavior and Follow Edges remains functional
- [ ] Regression .515: Edge Slide / Offset / Extrude behavior from .514 remains unchanged

- [ ] Workflow .516: arm Extrude with no Face selected -> drag Face A -> Extrude succeeds
- [ ] Workflow .516: with Extrude still armed -> drag a different unselected Face B -> only Face B extrudes
- [ ] Workflow .516: preselect multiple Faces -> drag one selected Face -> multi-face Extrude still works
- [ ] Workflow .516: repeat the same three checks with Inset
- [ ] Workflow .516: after an unselected-face Extrude/Inset, Repeat Previous becomes available and replays the committed value on another Face
- [ ] Regression .516: tap while Extrude/Inset is armed still toggles Face selection without modelling
- [ ] Regression .516: Extrude Through behavior remains unchanged

- [ ] Workflow .517: Array preview endpoint can be dragged without Objects drawer flicker; Active Tools stays pinned
- [ ] Workflow .517: new Revolve Profile enters with Edit Profile already active
- [ ] Workflow .517: new Revolve Profile can immediately accept profile drawing input
- [ ] Workflow .517: opening Boolean turns Multi selection on while keeping the current active object selected
- [ ] Regression .517: closing Boolean returns to normal Object tooling without losing the active object
- [ ] Regression .517: Array Apply/Cancel and Revolve Apply/Cancel remain unchanged

- [ ] Workflow .518: arm Extrude with nothing selected -> drag Face A -> then drag different unselected Face B -> only Face B extrudes
- [ ] Workflow .518: Face A must not move/deform during the Face B extrusion attempt
- [ ] Workflow .518: after unselected-face Extrude, Repeat Previous becomes available and replays the same Extrude value
- [ ] Regression .518: Inset unselected-face sequence remains passing
- [ ] Regression .518: deliberate preselected multi-face Extrude/Inset remains passing
- [ ] Regression .518: armed tap-selection and Extrude Through remain passing

- [ ] Workflow .519: arm Extrude with nothing selected -> drag Face A -> Extrude succeeds
- [ ] Workflow .519: with Extrude still armed, press and drag a different unselected Face B -> B becomes the live Face immediately and only B extrudes
- [ ] Regression .519: Face A does not move, deform or remain in the drag working set during Face B extrusion
- [ ] Workflow .519: armed tap on an unselected Face still restores the previous selection then performs the normal additive toggle
- [ ] Workflow .519: armed tap on a selected Face still deselects only that Face
- [ ] Workflow .519: Repeat Previous after a successful ordinary Extrude replays the committed Extrude value on another clean Face
- [ ] Regression .519: Inset sequential unselected-face drag, deliberate multi-face Extrude/Inset and Extrude Through remain passing

- [ ] Workflow .520: fresh cube -> arm Extrude -> drag Face A -> ordinary Extrude succeeds
- [ ] Workflow .520: keep Extrude armed -> drag different unselected Face B -> only B extrudes
- [ ] Workflow .520: repeat on a third unselected Face C -> only C extrudes
- [ ] Regression .520: prior Face A does not move/deform when B or C is dragged
- [ ] Workflow .520: after successful ordinary Extrude, Repeat Previous becomes available and replays the same Extrude value on another Face
- [ ] Regression .520: armed Face tap add/remove behavior still works
- [ ] Regression .520: Inset and Extrude Through remain unchanged on clean geometry

- [ ] Deployment .521: Safari refreshes and visibly reports v0.36.18.521
- [ ] Deployment .521: Chrome/other test browsers refresh and visibly report v0.36.18.521
- [ ] Deployment .521: reopening an already-stale tab converges to .521 without manual cache clearing
- [ ] Regression .521: no repeated reload loop once the running shell is .521
- [ ] Regression .521: Face runtime remains main.js .520 + multi-face-direct .519 with no modelling changes

- [ ] Workflow .522: fresh cube -> arm Extrude -> drag Face A -> native single-Face Extrude succeeds
- [ ] Workflow .522: keep Extrude armed -> drag different unselected Face B -> only B extrudes; A remains unchanged
- [ ] Workflow .522: keep Extrude armed -> drag Face C -> only C extrudes
- [ ] Workflow .522: Repeat Previous replays the last ordinary single-Face Extrude value on another Face
- [ ] Regression .522: deliberate 2+ selected Face Extrude still uses connected-band behavior
- [ ] Regression .522: Extrude Through and Inset unchanged on clean geometry

- [ ] Workflow .523: fresh cube -> Extrude Face A
- [ ] Workflow .523: keep Extrude armed -> drag visibly different Face B; B must be chosen even if A is the nearer overlapping ray hit
- [ ] Workflow .523: A remains unchanged during B drag
- [ ] Workflow .523: repeat with Face C
- [ ] Regression .523: tapping the already-selected Face still allows normal deselect when there is no unselected overlapping hit
- [ ] Regression .523: deliberate multi-face Extrude, Inset and Through unchanged

- [ ] Workflow .525: A Extrude -> B Extrude while Extrude remains armed
- [ ] Diagnostic .525: B reaches FACE DEBUG DRAG-START with hit/faces matching B
- [ ] Workflow .525: A remains unchanged while B extrudes
- [ ] Workflow .525: C sequential Extrude also works
- [ ] Regression .525: inward Extrude / Through fallback still takes over only on the resolved current single Face
- [ ] Regression .525: ordinary Extrude Through remains functional

- [ ] Workflow .526: select 2+ visible faces deliberately
- [ ] Workflow .526: with Extrude armed, drag from one selected face -> whole selected set extrudes
- [ ] Workflow .526: no unselected/rear face is substituted into the operation
- [ ] Regression .526: A -> B sequential single-Face Extrude remains PASS
- [ ] Regression .526: C sequential single-Face Extrude remains PASS
- [ ] Regression .526: Extrude Through / inward fallback still works on resolved current single Face

- [ ] Workflow .527: select one Face -> arm Inset -> drag that same selected Face
- [ ] Workflow .527: Inset operates the pressed selected Face, not a rear/unselected Face
- [ ] Workflow .527: select 2+ Faces -> Inset preserves and operates the selected set
- [ ] Regression .527: A -> B sequential Extrude remains PASS
- [ ] Regression .527: deliberate multi-face Extrude remains PASS
- [ ] Regression .527: Extrude Through / inward fallback unchanged

- [x] Stable .527: sequential armed single-Face Extrude A -> B PASS
- [x] Stable .527: deliberate multi-face Extrude PASS
- [x] Stable .527: single-Face Inset PASS
- [x] Stable .527: multi-face Inset PASS

- [ ] Workflow .528: ordinary Extrude -> Repeat Previous -> tap another Face -> same stored Extrude value applied
- [ ] Workflow .528: repeated Extrude stays on tapped/selected Face and does not substitute a rear Face
- [ ] Workflow .528: ordinary Inset -> Repeat Previous -> tap another Face -> same stored Inset distance applied
- [ ] Workflow .528: Repeat remains armed for additional Face taps until explicitly turned off
- [ ] Regression .528: sequential A -> B Extrude remains PASS
- [ ] Regression .528: single/multi-face Inset remains PASS

- [ ] Workflow .529: explicitly select visible front Face -> arm Extrude -> drag same Face; selected Face extrudes
- [ ] Workflow .529: no rear/unselected Face substitution after deliberate preselection
- [ ] Regression .529: after successful Extrude, keep armed -> drag another Face B -> sequential A -> B still PASS
- [ ] Regression .529: deliberate multi-face Extrude remains PASS
- [ ] Regression .529: single/multi-face Inset remains PASS
- [ ] Workflow .529: Repeat Extrude and Repeat Inset still to be hands-on closed

- [ ] Workflow .530: normal Extrude -> Repeat Extrude -> tap another Face -> exact stored value applied
- [ ] Workflow .530: Repeat Extrude remains on the tapped target Face
- [ ] Workflow .530: normal Inset -> Repeat Inset -> tap another Face -> stored inset distance applied
- [ ] Workflow .530: Repeat remains armed for another Face tap
- [ ] Regression .530: deliberate selected-Face Extrude remains PASS
- [ ] Regression .530: sequential A -> B Extrude and normal Inset remain PASS

- [ ] Workflow .531: normal Extrude -> Repeat -> tap Face B -> same stored Extrude distance
- [ ] Workflow .531: tap Face C without rearming -> Repeat stays active and applies again
- [ ] Workflow .531: normal Inset -> Repeat -> tap Face B -> same stored inset distance
- [ ] Regression .531: each Repeat action creates exactly one Undo step
- [ ] Regression .531: deliberate selected-Face Extrude remains PASS
- [ ] Regression .531: sequential A -> B, multi-face Extrude and normal Inset remain PASS

- [ ] Workflow .532: perform Inset -> Repeat Inset on another Face
- [ ] Workflow .532: then perform a new real Extrude -> Repeat label/armed operation changes to Extrude
- [ ] Workflow .532: Repeat Extrude applies new Extrude value
- [ ] Workflow .532: then perform a new real Inset -> Repeat changes back to Inset
- [ ] Regression .532: repeated Inset taps remain Inset until a new real operation occurs
- [ ] Regression .532: direct Repeat Extrude/Inset and normal Face tools remain PASS

- [x] Stable .532: deliberate selected-Face Extrude PASS
- [x] Stable .532: sequential A -> B Extrude PASS
- [x] Stable .532: deliberate multi-face Extrude PASS
- [x] Stable .532: single-face Inset PASS
- [x] Stable .532: multi-face Inset PASS
- [x] Stable .532: Repeat Extrude PASS
- [x] Stable .532: Repeat Inset PASS
- [x] Stable .532: Repeat remains armed across repeated taps PASS
- [x] Stable .532: newest real Face operation updates armed Repeat PASS

- [ ] Workflow .533: Repeat Inset -> real Extrude -> Repeat becomes Extrude
- [ ] Workflow .533: Repeat Extrude -> real Inset -> Repeat becomes Inset
- [ ] Workflow .533: Repeat Inset again -> real Extrude again -> Repeat becomes Extrude on second cycle
- [ ] Regression .533: repeated taps keep same Repeat op until a new real Face operation occurs
- [ ] Regression .533: Repeat Extrude/Inset geometry remains PASS

- [ ] Workflow .534: explicitly select Face -> Extrude selected Face only
- [ ] Regression .534: immediate sequential A -> B without changing selection still PASS
- [ ] Workflow .534: after Repeat Inset/Extrude cycles, explicitly select Face -> Extrude remains on selected Face
- [ ] Regression .534: no rear/unselected Face substitution after any explicit selection change
- [ ] Regression .534: Repeat Extrude/Inset and state switching remain PASS

- [ ] Workflow .535: deliberately select visible Face -> Extrude selected Face only
- [ ] Regression .535: immediate sequential A -> B still PASS
- [ ] Workflow .535: deliberately select 2+ Faces -> Extrude full selected set
- [ ] Regression .535: no through/rear Face substitution for deliberate single or multi selection
- [ ] Regression .535: Repeat Extrude/Inset and state switching remain PASS

- [x] Stable .535: deliberate selected single-Face Extrude PERFECT PASS
- [x] Stable .535: immediate sequential A -> B Extrude PASS
- [x] Stable .535: deliberate multi-face Extrude PERFECT PASS
- [x] Stable .535: single-face Inset PASS
- [x] Stable .535: multi-face Inset PASS
- [x] Stable .535: Repeat Extrude PASS
- [x] Stable .535: Repeat Inset PASS
- [x] Stable .535: Repeat multi-cycle operation switching PASS
- [x] Stable .535: no through/rear Face substitution for deliberate selection PASS


- [ ] Workflow .551: import a Nomad GLB containing COLOR_0 -> export Base immediately -> vertex colour appearance survives in Nomad
- [ ] Workflow .551: import a Nomad GLB containing TANGENT -> export Base immediately -> tangent/normal-map appearance survives in Nomad
- [ ] Regression .551: topology-preserving vertex-position edit keeps vertex colours eligible but disables imported tangent restoration
- [ ] Regression .551: topology-changing edit disables UV/tangent/vertex-colour restoration rather than exporting stale corner data
- [ ] Regression .551: conservative GLB quad reconstruction does not merge across UV/tangent/vertex-colour discontinuities
- [x] Automated .551: import/export modules syntax-parse after import stripping; 13/13 targeted preservation assertions PASS
- [x] Protection .551: Beta 5 remains v0.36.18.538 and src/multi-object-transform.js?v=0.36.1.0 remains pinned


- [ ] Workflow .552: Nomad GLB with visible sculpt layer -> BoxLab import reports layers preserved
- [ ] Workflow .552: immediate Base GLB export reports layers restored 1/1
- [ ] Workflow .552: re-open exported GLB in Nomad -> original sculpt layer(s), deformation and weights survive
- [ ] Regression .552: topology-changing edit disables morph-layer restoration rather than exporting stale target arrays
- [ ] Regression .552: conservative GLB quad reconstruction does not merge across morph POSITION discontinuities
- [x] Automated .552: import/export modules syntax-parse and 8/8 targeted morph assertions PASS
- [x] Protection .552: Beta 5 remains v0.36.18.538 and src/multi-object-transform.js?v=0.36.1.0 remains pinned


- [x] Workflow .553: BoxLab Base GLB re-opened in Nomad no longer imports as triangle-corner soup
- [x] Workflow .553: Nomad subdivision treats ordinary shared edges as connected/welded
- [ ] Regression .553: UV/tangent/vertex-colour/morph seams remain attribute-correct where values genuinely differ
- [ ] Regression .553: .552 morph/layer preservation still survives immediate BoxLab -> Nomad round-trip
- [x] Automated .553: exporter syntax-parse and 7/7 indexed-topology assertions PASS
- [x] Protection .553: Beta 5 remains v0.36.18.538 and src/multi-object-transform.js?v=0.36.1.0 remains pinned

- [ ] Workflow .554: Nomad sculpt-layer deformation is visible immediately after GLB import to BoxLab
- [ ] Workflow .554: immediate Base GLB round-trip to Nomad preserves deformation without doubling
- [ ] Workflow .554: original Nomad layer and weight control remain usable after round-trip
- [ ] Regression .554: .553 indexed/welded topology and Nomad subdivision remain connected
- [x] Automated .554: import/export modules syntax-parse and 8/8 weighted-morph assertions PASS
- [x] Protection .554: Beta 5 remains v0.36.18.538 and src/multi-object-transform.js?v=0.36.1.0 remains pinned

- [ ] Workflow .555: layered Nomad GLB imports to BoxLab with deformation shown once at correct magnitude
- [ ] Workflow .555: Base GLB round-trip to Nomad preserves deformation without doubling
- [ ] Workflow .555: original layer weight remains adjustable after round-trip
- [x] Workflow .555: high-valence pole vertices subdivide as connected/welded topology
- [ ] Regression .555: ordinary two-sided UV seams remain preserved outside singular pole vertices
- [x] Automated .555: import/export modules syntax-parse and 10/10 weight-location + pole-weld assertions PASS
- [x] Protection .555: Beta 5 remains v0.36.18.538 and src/multi-object-transform.js?v=0.36.1.0 remains pinned

- [x] Workflow .556: Base GLB returns to Nomad at original source size/placement
- [x] Workflow .556: morph/layer deformation magnitude matches the original source after scale restoration
- [x] Regression .556: .555 pole welding remains connected after restored-scale export
- [x] Regression .556: layer weight remains adjustable and is not doubled
- [x] Automated .556: import/export modules syntax-parse and 8/8 scale-restoration assertions PASS
- [x] Protection .556: Beta 5 remains v0.36.18.538 and src/multi-object-transform.js?v=0.36.1.0 remains pinned

- [ ] Workflow .557: Vertex / Edge / Face / Object selector appears bottom-left on landscape iPad
- [ ] Workflow .557: all four selection modes switch and highlight exactly as before
- [ ] Workflow .557: dock does not obstruct Selection/Active Tools controls or status text
- [ ] Regression .557: one-finger orbit, two-finger pan, pinch zoom, two-finger Undo and three-finger Redo unchanged
- [x] Automated .557: static mode-dock regression 6/6 PASS
- [x] Protection .557: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .558: Vertex / Edge / Face / Object dock appears at true bottom-left of viewport
- [ ] Workflow .558: all four selection modes switch and highlight exactly as before
- [ ] Workflow .558: dock does not overlap status text or left tool drawer
- [ ] Regression .558: orbit/pan/zoom/Undo/Redo unchanged
- [x] Automated .558: relocation regression 9/9 PASS
- [x] Protection .558: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .559: no selection-mode flashing or UI tug-of-war on load
- [ ] Workflow .559: BoxLab + version remain visible in the topbar
- [ ] Workflow .559: Vertex / Edge / Face / Object dock appears at true bottom-left
- [ ] Workflow .559: all four selection modes switch and highlight normally
- [ ] Regression .559: orbit/pan/zoom/Undo/Redo unchanged
- [x] Automated .559: runtime/static ownership regression 11/11 PASS
- [x] Protection .559: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .561: no top/header mode-selector flash during startup
- [ ] Workflow .561: mode dock remains bottom-left after load
- [ ] Workflow .561: left tool drawer scroll ends above mode dock with final controls fully reachable
- [ ] Workflow .561: BoxLab + version remain visible at top
- [ ] Regression .561: mode switching and orbit/pan/zoom/Undo/Redo unchanged
- [x] Automated .561: syntax/static regression 9/9 PASS
- [x] Protection .561: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .562: Selection panel appears immediately above the bottom-left mode strip
- [ ] Workflow .562: Selection panel does not flash in its old drawer location
- [ ] Workflow .562: left tool drawer scrolls independently with Selection removed
- [ ] Workflow .562: Viewport settings appears on top line beside Frame All / Undo / Redo
- [ ] Workflow .562: Frame All / Viewport / Undo / Redo font sizes and control heights look consistent
- [ ] Regression .562: selection controls, mode switching and orbit/pan/zoom/Undo/Redo unchanged
- [x] Automated .562: syntax/static regression 11/11 PASS
- [x] Protection .562: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .563: Selection panel is back inside the left scrolling tool drawer
- [ ] Workflow .563: bottom-left mode dock remains in place
- [ ] Workflow .563: Viewport remains on the top action line
- [ ] Workflow .563: empty second/packer row is gone and viewport gains vertical space
- [ ] Workflow .563: no startup flashes
- [ ] Regression .563: selection, mode switching and orbit/pan/zoom/Undo/Redo unchanged
- [x] Automated .563: syntax/static regression 10/10 PASS
- [x] Protection .563: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .564: Selection panel typography matches compact UI scale
- [ ] Workflow .564: Selection buttons are consistently 32px high with 12px text
- [ ] Workflow .564: symbol-only selection buttons remain legible without appearing oversized
- [ ] Regression .564: Selection behavior and mode switching unchanged
- [x] Automated .564: static sizing regression 8/8 PASS
- [x] Protection .564: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .565: left tool drawer scroll ends above bottom mode dock
- [ ] Workflow .565: final drawer controls remain fully visible/clickable at maximum scroll
- [ ] Workflow .565: Selection remains in original drawer position
- [ ] Workflow .565: mode dock remains fixed bottom-left
- [ ] Regression .565: selection and navigation behavior unchanged
- [x] Automated .565: syntax/static regression 5/5 PASS
- [x] Protection .565: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .566: bottom mode dock sits close to the iPad safe-area edge
- [ ] Workflow .566: mode dock remains comfortably above the home indicator / unsafe area
- [ ] Workflow .566: left tool drawer scroll still ends above the dock
- [ ] Workflow .566: reclaimed vertical space is visible/useful
- [ ] Regression .566: mode switching and navigation unchanged
- [x] Automated .566: syntax/static regression 7/7 PASS
- [x] Protection .566: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .567: Viewport flyout opens at the right screen/app border
- [ ] Workflow .567: flyout respects right safe-area margin
- [ ] Workflow .567: View Direction / Render Look controls remain fully usable
- [ ] Regression .567: Viewport button position and camera behavior unchanged
- [x] Automated .567: syntax/static regression 5/5 PASS
- [x] Protection .567: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .568: no Viewport ownership/reordering flash during startup
- [ ] Workflow .568: Viewport button sits at far-right of top action row
- [ ] Workflow .568: Viewport flyout remains right-edge anchored
- [ ] Workflow .568: Facegroup panel uses compact standard control sizing
- [ ] Workflow .568: Facegroup palette/sliders/reseed/reset remain functional
- [x] Automated .568: syntax/static regression 13/13 PASS
- [x] Protection .568: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .570: Total Gizmo appears in Object mode on active object
- [ ] Workflow .570: projected X/Y/Z move axes follow camera orientation correctly
- [ ] Workflow .570: center puck performs free move
- [ ] Workflow .570: X/Y/Z arrow shafts perform constrained move
- [ ] Workflow .570: X/Y/Z square handles perform constrained scale
- [ ] Workflow .570: X/Y/Z arcs perform constrained rotation
- [ ] Workflow .570: inner neutral ring performs screen/view rotation
- [ ] Workflow .570: outer orange ring performs uniform scale
- [ ] Workflow .570: hover/active emphasis makes intended handle obvious
- [ ] Workflow .570: live HUD reflects transform feedback
- [ ] Regression .570: navigation gestures and Undo/Redo unchanged away from gizmo
- [ ] Regression .570: existing Move / Scale / Rotate strip still works as fallback
- [x] Automated .570: syntax/static regression 13/13 PASS
- [x] Protection .570: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .571: no black circular background/hit-proxy fill is visible
- [ ] Workflow .571: X/Y/Z rotation arcs are all visible
- [ ] Workflow .571: idle gizmo linework is thin and visually quiet
- [ ] Workflow .571: invisible hit zones remain easy to acquire with Pencil/finger
- [ ] Workflow .571: hovered/active handle thickens clearly
- [ ] Regression .571: transforms and navigation unchanged
- [x] Automated .571: syntax/static regression 9/9 PASS
- [x] Protection .571: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .572: X/Y/Z move arrows remain axis-constrained with Axis Snap OFF
- [ ] Workflow .572: X/Y/Z scale handles remain axis-constrained with Axis Snap OFF
- [ ] Workflow .572: X/Y/Z rotation arcs remain axis-constrained with Axis Snap OFF
- [ ] Workflow .572: center free-move remains free when no intentional snap applies
- [ ] Regression .572: global Axis Snap still works for free/auto transforms
- [ ] Regression .572: navigation and legacy transform strip unchanged
- [x] Automated .572: syntax/static regression 8/8 PASS
- [x] Protection .572: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .573: with Axis Snap OFF, X gizmo arrow moves X only
- [ ] Workflow .573: with Axis Snap OFF, Y gizmo arrow moves Y only
- [ ] Workflow .573: with Axis Snap OFF, Z gizmo arrow moves Z only
- [ ] Workflow .573: with Axis Snap ON, explicit gizmo axis still wins
- [ ] Workflow .573: center free-move remains unconstrained
- [ ] Regression .573: navigation and Undo/Redo unchanged
- [x] Automated .573: source/static regression 6/6 PASS
- [x] Protection .573: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .574: with Axis Snap OFF, legacy Move > X constrains to X
- [ ] Workflow .574: with Axis Snap OFF, legacy Move > Y constrains to Y
- [ ] Workflow .574: with Axis Snap OFF, legacy Move > Z constrains to Z
- [ ] Workflow .574: Free remains unconstrained
- [ ] Workflow .574: with Axis Snap ON, explicit X/Y/Z still wins
- [ ] Regression .574: Total Gizmo axis constraints remain correct
- [x] Automated .574: source/static regression 7/7 PASS
- [x] Protection .574: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .575: XY pad moves only in XY
- [ ] Workflow .575: XZ pad moves only in XZ
- [ ] Workflow .575: YZ pad moves only in YZ
- [ ] Workflow .575: plane pads track projected world axes while orbiting
- [ ] Workflow .575: rotation arcs are clearly distinguishable
- [ ] Workflow .575: overlapping axis/ring handles have sensible hit priority
- [ ] Regression .575: X/Y/Z gizmo constraints remain correct
- [ ] Regression .575: navigation and legacy transforms unchanged
- [x] Automated .575: prepublish syntax/static regression 9/9 PASS
- [x] Protection .575: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .576: X rotation ring follows projected YZ plane
- [ ] Workflow .576: Y rotation ring follows projected XZ plane
- [ ] Workflow .576: Z rotation ring follows projected XY plane
- [ ] Workflow .576: all three rings change shape continuously with camera perspective
- [ ] Workflow .576: face-on ring appears close to circular
- [ ] Workflow .576: edge-on ring collapses toward a line
- [ ] Workflow .576: front ring half reads stronger than rear half
- [ ] Workflow .576: screen-rotate ring remains circular
- [ ] Workflow .576: X/Y/Z rotation dragging still works
- [ ] Regression .576: planar move and X/Y/Z movement unchanged
- [x] Automated .576: prepublish syntax/static regression 10/10 PASS
- [x] Protection .576: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .577: red X rotation ring is visible
- [ ] Workflow .577: green Y rotation ring is visible
- [ ] Workflow .577: blue Z rotation ring is visible
- [ ] Workflow .577: all three rings deform continuously with camera perspective
- [ ] Workflow .577: X/Y/Z ring dragging rotates around correct axis
- [ ] Regression .577: planar move and axis transforms unchanged
- [x] Automated .577: prepublish syntax/static regression 9/9 PASS
- [x] Protection .577: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .578: red/green/blue projected rotation rings are visible at useful size
- [ ] Workflow .578: rings deform with camera perspective
- [ ] Workflow .578: ring hit targets follow projected visual paths
- [ ] Workflow .578: X/Y/Z ring drags rotate around correct axis
- [ ] Regression .578: screen rotate, uniform scale and planar move unchanged
- [x] Automated .578: prepublish syntax/static regression 7/7 PASS
- [x] Protection .578: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .579: red/green/blue projected rings are visible
- [ ] Workflow .579: projected rings deform correctly while orbiting
- [ ] Workflow .579: ring hit proxies follow the visible paths
- [ ] Workflow .579: X/Y/Z ring drags rotate correctly
- [x] Automated .579: syntax/static regression 4/4 PASS

- [ ] Workflow .580: hovered ring thickens temporarily
- [ ] Workflow .580: ring returns to normal thin idle line after drag/release
- [ ] Workflow .580: X/Y/Z all clear transient highlight after interaction
- [ ] Workflow .580: move/scale handles also clear transient highlight
- [ ] Regression .580: projected ring perspective behavior unchanged
- [x] Automated .580: syntax/static regression 5/5 PASS

- [ ] Workflow .581: explicit X/Y/Z gizmo movement has soft adaptive increment catches
- [ ] Workflow .581: detents can be dragged through and do not hard-lock movement
- [ ] Workflow .581: detent spacing remains sensible across zoom levels
- [ ] Workflow .581: centre free move remains unrestricted
- [ ] Workflow .581: XY/XZ/YZ planar move remains unrestricted
- [ ] Workflow .581: HUD remains briefly visible after transform
- [ ] Workflow .581: tapping post-drag HUD opens exact value input
- [ ] Workflow .581: exact X/Y/Z move inherits the last gizmo axis
- [ ] Workflow .581: exact rotate accepts degrees
- [ ] Workflow .581: exact scale accepts factor
- [ ] Regression .581: Undo/history still works for exact transforms
- [ ] Regression .581: projected rings and navigation unchanged
- [x] Protection .581: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .582: mesh/vert readout is readable below mode dock
- [ ] Workflow .582: transform status is readable at bottom-right
- [ ] Workflow .582: Viewport > Full Screen enters native or focus fullscreen
- [ ] Workflow .582: Exit Full Screen restores layout
- [ ] Workflow .582: Share / Open In opens iPad share sheet with exported file
- [ ] Workflow .582: Nomad appears if iPadOS registers it for the exported file type
- [ ] Regression .582: normal Export / Save still works
- [ ] Regression .582: mode dock and left drawer scrolling remain usable
- [x] Automated .582: prepublish syntax/static regression 12/12 PASS
- [x] Protection .582: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .583: Rotate value field accepts touch/Pencil focus and keyboard input
- [ ] Workflow .583: exact Rotate applies entered degrees
- [ ] Workflow .583: Scale value field accepts touch/Pencil focus and keyboard input
- [ ] Workflow .583: exact Scale applies entered factor
- [ ] Regression .583: exact Move remains working
- [ ] Workflow .583: Focus View hides left drawer but keeps File/Frame All/Undo/Redo/Viewport
- [ ] Workflow .583: Exit Focus View restores left drawer cleanly
- [ ] Workflow .583: GLB Share / Open In tests broader iPadOS destination matching
- [ ] Regression .583: normal Export / Save remains unchanged
- [x] Automated .583: prepublish syntax/static regression 9/9 PASS
- [x] Protection .583: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .584: gizmo Rotate HUD accepts exact degree input
- [ ] Workflow .584: exact Rotate ignores 15-degree drag snap
- [ ] Workflow .584: Undo exact Rotate works
- [ ] Workflow .584: gizmo Scale HUD accepts exact factor input
- [ ] Workflow .584: Undo exact Scale works
- [ ] Regression .584: exact Move remains working
- [ ] Workflow .584: Focus View hides left drawer on first activation
- [ ] Workflow .584: Focus View keeps top File/Frame All/Undo/Redo/Viewport row
- [ ] Workflow .584: Exit Focus View restores left drawer
- [x] Automated .584: prepublish syntax/static regression 8/8 PASS
- [x] Protection .584: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .585: Move release shows direct Distance input in gizmo HUD
- [ ] Workflow .585: Rotate release shows direct Degrees input and accepts typing
- [ ] Workflow .585: exact Rotate commits typed angle
- [ ] Workflow .585: Scale release shows direct Factor input and accepts typing
- [ ] Workflow .585: exact Scale commits typed factor
- [ ] Regression .585: Undo exact Rotate/Scale works
- [ ] Workflow .585: Focus appears on top action row before Viewport
- [ ] Workflow .585: Focus hides/restores left drawer while top row remains
- [x] Automated .585: prepublish syntax/static regression 9/9 PASS
- [x] Protection .585: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .586: gizmo Move handle syncs left strip to Move + matching axis
- [ ] Workflow .586: gizmo Rotate ring syncs left strip to Rotate + matching axis
- [ ] Workflow .586: persistent Degrees field accepts exact Rotate input
- [ ] Workflow .586: gizmo Scale handle syncs left strip to Scale + matching axis
- [ ] Workflow .586: persistent Scale factor field accepts exact Scale input
- [ ] Workflow .586: uniform scale ring syncs Scale + Free/Uniform context
- [ ] Regression .586: exact Move remains working
- [ ] Regression .586: Focus top-row toggle remains working
- [x] Automated .586: prepublish syntax/static regression 8/8 PASS
- [x] Protection .586: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .587: Move release shows standalone floating Distance field
- [ ] Workflow .587: Rotate release shows standalone floating Degrees field
- [ ] Workflow .587: Scale release shows standalone floating Factor field
- [ ] Workflow .587: iPad keyboard opens when floating field is tapped for Move/Rotate/Scale
- [ ] Workflow .587: Enter commits exact Rotate
- [ ] Workflow .587: Enter commits exact Scale
- [ ] Workflow .587: Apply button commits exact value
- [ ] Workflow .587: background tap dismisses floating palette
- [ ] Regression .587: left-panel exact type-in remains working
- [ ] Regression .587: Undo exact transforms works
- [x] Automated .587: prepublish syntax/static regression 9/9 PASS
- [x] Protection .587: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .588: Move gizmo release shows one standalone Distance palette
- [ ] Workflow .588: Rotate gizmo release shows one standalone Degrees palette
- [ ] Workflow .588: Scale gizmo release shows one standalone Factor palette
- [ ] Workflow .588: uniform scale release shows Factor palette
- [ ] Workflow .588: old gizmo HUD is hidden when floating palette appears
- [ ] Workflow .588: iPad keyboard opens for floating field
- [ ] Workflow .588: Enter/Apply commits exact Rotate
- [ ] Workflow .588: Enter/Apply commits exact Scale
- [ ] Regression .588: left-panel exact entry remains working
- [ ] Regression .588: Undo exact transforms works
- [x] Automated .588: prepublish syntax/static regression 9/9 PASS
- [x] Protection .588: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .589: Move gizmo release shows floating Distance palette again
- [ ] Workflow .589: Move floating exact entry commits with Enter/Apply
- [ ] Workflow .589: no duplicate floating palette or old HUD
- [ ] Regression .589: left-panel Move type-in remains working
- [x] Automated .589: prepublish syntax/static regression 5/5 PASS

- [ ] Regression .590: Move floating Distance entry remains working
- [ ] Workflow .590: X Rotate ring release shows floating Degrees palette
- [ ] Workflow .590: Y Rotate ring release shows floating Degrees palette
- [ ] Workflow .590: Z Rotate ring release shows floating Degrees palette
- [ ] Workflow .590: Enter/Apply commits exact Rotate
- [ ] Workflow .590: Undo exact Rotate works
- [ ] Scope .590: Scale floating type-in intentionally unchanged
- [x] Automated .590: prepublish syntax/static regression 4/4 PASS
- [x] Protection .590: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Regression .591: Move floating Distance entry remains working
- [ ] Workflow .591: X Rotate ring release shows floating Degrees palette
- [ ] Workflow .591: Y Rotate ring release shows floating Degrees palette
- [ ] Workflow .591: Z Rotate ring release shows floating Degrees palette
- [ ] Workflow .591: Enter/Apply commits exact Rotate
- [ ] Workflow .591: Undo exact Rotate works
- [ ] Scope .591: Scale floating type-in intentionally unchanged
- [x] Automated .591: prepublish syntax/static regression 7/7 PASS
- [x] Protection .591: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Regression .592: Move floating Distance entry remains working
- [ ] Workflow .592: X Rotate ring release shows floating Degrees palette
- [ ] Workflow .592: Y Rotate ring release shows floating Degrees palette
- [ ] Workflow .592: Z Rotate ring release shows floating Degrees palette
- [ ] Workflow .592: Enter/Apply commits exact Rotate
- [ ] Workflow .592: Undo exact Rotate works
- [ ] Scope .592: Scale floating type-in intentionally unchanged
- [x] Automated .592: prepublish syntax/static regression 4/4 PASS
- [x] Protection .592: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Regression .593: Move floating Distance remains working
- [ ] Regression .593: Rotate floating Degrees remains working
- [ ] Workflow .593: X Scale node release shows floating Factor palette
- [ ] Workflow .593: Y Scale node release shows floating Factor palette
- [ ] Workflow .593: Z Scale node release shows floating Factor palette
- [ ] Workflow .593: outer uniform Scale ring release shows Factor palette
- [ ] Workflow .593: Enter/Apply commits exact Scale
- [ ] Workflow .593: Undo exact Scale works
- [x] Architecture .593: pointer capture ownership rule documented in AI_WORKFLOW.md
- [x] Automated .593: prepublish syntax/static regression 4/4 PASS
- [x] Protection .593: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Regression .594: Move floating exact entry remains working
- [ ] Regression .594: Rotate floating exact entry remains working
- [ ] Regression .594: Scale and Uniform Scale floating exact entry remain working
- [ ] Workflow .594: gizmo Rotate catches softly at useful angles
- [ ] Workflow .594: Rotate detent releases when drag continues past catch
- [ ] Workflow .594: gizmo Scale catches softly at useful ratios
- [ ] Workflow .594: Scale detent releases when drag continues past catch
- [ ] Workflow .594: gizmo HUD shows live angle/factor and detent state
- [ ] Regression .594: legacy Rotate retains existing 15° snap behavior
- [ ] Regression .594: Move adaptive soft detents unchanged
- [x] Automated .594: prepublish syntax/static regression 7/7 PASS
- [x] Protection .594: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Regression .595: Move floating exact entry remains working
- [ ] Regression .595: Rotate floating exact entry remains working
- [ ] Regression .595: Scale/Uniform floating exact entry remains working
- [ ] Workflow .595: gizmo Rotate soft catches work with legacy 15° snap ON
- [ ] Workflow .595: gizmo Rotate soft catches still work with legacy 15° snap OFF
- [ ] Workflow .595: gizmo Rotate catch releases when drag continues
- [ ] Workflow .595: gizmo Scale catches at useful ratios
- [ ] Workflow .595: gizmo Scale catch releases when drag continues
- [ ] Regression .595: legacy/non-gizmo Rotate retains existing 15° snap
- [x] Automated .595: prepublish syntax/static regression 9/9 PASS
- [x] Protection .595: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .596: Share / Open In shares exactly one GLB/OBJ file with no text sidecar
- [ ] Workflow .596: Nomad Sculpt appears as an eligible iPad destination for GLB
- [ ] Workflow .596: selected Nomad destination receives/opens the GLB
- [ ] Regression .596: Export / Save iPad share-sheet fallback still saves the model to Files
- [ ] Regression .596: GLB/OBJ geometry and Nomad preservation payload unchanged
- [x] Protection .596: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .597: clicking Move/Scale/Rotate does not leave Total Gizmo stuck
- [ ] Workflow .597: clicking Free/X/Y/Z/Auto does not leave Total Gizmo stuck
- [ ] Workflow .597: gizmo can immediately start a fresh drag after transform-menu interaction
- [ ] Regression .597: gizmo follows the selected object normally after menu interaction
- [ ] Regression .597: floating exact-entry still appears after completed gizmo Move/Rotate/Scale drag
- [x] Protection .597: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .598: GLB Share / Open In creates a single .glb File with type model/gltf-binary
- [ ] Workflow .598: Web Share payload contains files only, with no title/text sidecar
- [ ] Workflow .598: Nomad Sculpt appears as an eligible iPad destination for GLB
- [ ] Workflow .598: Nomad opens/imports the shared GLB
- [ ] Regression .598: OBJ Share / Open In remains functional
- [ ] Regression .598: Export / Save remains functional
- [x] Protection .598: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .599: GLB Share / Open In creates one *.glb File with extension-driven type inference
- [ ] Workflow .599: share payload contains files only
- [ ] Workflow .599: check whether Nomad Sculpt appears when type is inferred from .glb filename
- [ ] Regression .599: saved GLB still shares to Nomad successfully from Files app
- [ ] Regression .599: OBJ sharing remains functional
- [x] Protection .599: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Finding .599: direct Safari/Web Share does not surface Nomad, while Files does
- [ ] Workflow .600: GLB secondary action reads Save for Nomad…
- [ ] Workflow .600: GLB note instructs Save to Files, then Files Share → Nomad Sculpt
- [ ] Workflow .600: GLB share uses one real File with model/gltf-binary
- [ ] Workflow .600: saved GLB opens in Nomad from Files
- [ ] Regression .600: OBJ secondary action remains Share / Open In…
- [ ] Regression .600: normal Export / Save remains functional
- [x] Protection .600: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Finding .601: direct Safari/Web Share -> Nomad closed as unsupported
- [ ] Workflow .601: GLB secondary action reads Save GLB to Files…
- [ ] Workflow .601: GLB note explains Files -> Share -> Nomad Sculpt
- [ ] Workflow .601: saved GLB opens in Nomad from Files
- [ ] Regression .601: OBJ secondary action remains Share / Open In…
- [ ] Regression .601: normal Export / Save remains functional
- [x] Protection .601: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .602: gizmo Rotate has clearly noticeable soft catches
- [ ] Workflow .602: gizmo Rotate soft catches remain with legacy 15° snap OFF
- [ ] Workflow .602: gizmo Rotate does not revert to rigid 15° stepping when legacy snap is ON
- [ ] Workflow .602: Rotate catches release when drag continues beyond catch window
- [ ] Workflow .602: gizmo Scale clearly catches at 0.5x / 0.75x / 1x / 1.25x / 1.5x / 2x
- [ ] Workflow .602: Scale catches release when drag continues beyond catch window
- [ ] Regression .602: Move floating exact-entry remains working
- [ ] Regression .602: Rotate floating exact-entry remains working
- [ ] Regression .602: Scale floating exact-entry remains working
- [x] Protection .602: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Workflow .603: Edge Pencil long-press selects Loop
- [x] Workflow .603: long-press works from an already-selected edge without starting Move
- [ ] Workflow .603: moving before hold delay cancels Loop hold and preserves normal drag
- [ ] Regression .603: ordinary Edge tap selection/deselection unchanged
- [ ] Regression .603: background tap deselect unchanged
- [ ] Protection .603: finger orbit/pan/zoom unchanged
- [x] Protection .603: src/multi-object-transform.js?v=0.36.1.0 unchanged
- [x] Behavior .603: ambiguous Loop continuation refuses selection rather than guessing

- [ ] Workflow .604: first Edge long-press selects Loop
- [ ] Workflow .604: repeat long-press same seed selects Ring
- [ ] Workflow .604: third long-press same seed cycles back to Loop
- [ ] Workflow .604: changing seed resets cycle to Loop-first
- [ ] Workflow .604: background deselect resets cycle to Loop-first
- [ ] Regression .604: ordinary Edge tap selection/deselection unchanged
- [ ] Regression .604: ambiguous Loop still refuses rather than guesses
- [ ] Protection .604: finger orbit/pan/zoom unchanged
- [x] Protection .604: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .605: second Edge hold adds its Loop to the existing selection
- [ ] Workflow .605: third Edge hold adds again without losing earlier selections
- [ ] Workflow .605: repeated hold on last seed cycles only that seed Loop ↔ Ring
- [ ] Workflow .605: prior accumulated selection survives same-seed cycling
- [ ] Workflow .605: ambiguous/failed new seed leaves existing selection untouched
- [ ] Workflow .605: background tap clears the additive session
- [ ] Regression .605: ordinary Edge tap selection/deselection unchanged
- [ ] Protection .605: finger orbit/pan/zoom unchanged
- [x] Protection .605: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .606: Edge long-press enters candidate browser
- [ ] Workflow .606: horizontal scrub advances through Loop candidates
- [ ] Workflow .606: after Loop candidates, scrub advances into Ring candidates
- [ ] Workflow .606: reverse scrub returns to earlier candidates before release
- [ ] Workflow .606: release commits visible candidate
- [ ] Workflow .606: ambiguous cube-top Loop possibilities are browseable
- [ ] Workflow .606: Ring appears first when no Loop candidate exists
- [ ] Workflow .606: additive base selection remains intact while browsing another seed
- [ ] Regression .606: ordinary Edge tap selection/deselection unchanged
- [ ] Protection .606: finger orbit/pan/zoom unchanged
- [x] Protection .606: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .607: Total Gizmo appears on selected Vertex geometry
- [ ] Workflow .607: Total Gizmo appears on selected Edge geometry
- [ ] Workflow .607: Total Gizmo appears on selected Face geometry
- [ ] Workflow .607: component gizmo pivot is selection centroid
- [ ] Workflow .607: component gizmo Move works in Vertex / Edge / Face
- [ ] Workflow .607: component gizmo Scale works in Vertex / Edge / Face
- [ ] Workflow .607: component gizmo Rotate works in Vertex / Edge / Face
- [ ] Workflow .607: component selection remains selected after gizmo transform
- [ ] Regression .607: Object Total Gizmo unchanged
- [ ] Regression .607: .606 Edge hold/scrub Loop/Ring unchanged
- [ ] Protection .607: finger orbit/pan/zoom unchanged
- [x] Protection .607: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .608: Face axis Move follows selected gizmo arrow
- [ ] Workflow .608: Face axis Scale drag works; Uniform Scale remains good
- [ ] Workflow .608: Edge axis Move works for single and multi-edge selections
- [ ] Workflow .608: Edge Free Move works for multi-edge selections
- [ ] Workflow .608: Edge axis Scale drag and floating exact entry work without selection loss
- [ ] Workflow .608: Vertex multi-selection is not intercepted by transform-upgrade direct drag capture
- [ ] Workflow .608: Vertex axis Move / Scale / Rotate work from Total Gizmo
- [ ] Workflow .608: component gizmo click-release preserves selection before exact entry
- [ ] Workflow .608: gizmo hit targets reduce orbit fall-through near mesh edges
- [ ] Regression .608: Face/Edge/Vertex Rotate remains correct
- [ ] Regression .608: Object Total Gizmo unchanged
- [ ] Regression .608: .606 Edge hold/scrub Loop/Ring unchanged
- [x] Protection .608: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .609: component gizmo uses direct semantic handoff, not synthetic canvas pointerdown
- [ ] Workflow .609: Face axis Move follows gizmo axis
- [ ] Workflow .609: Face axis Scale follows gizmo axis
- [ ] Workflow .609: Edge single/multi axis Move works
- [ ] Workflow .609: Edge multi Free Move works
- [ ] Workflow .609: Edge axis Scale drag + floating exact entry work
- [ ] Workflow .609: Vertex multi-selection remains easy before gizmo transform
- [ ] Workflow .609: Vertex axis Move / Scale / Rotate work
- [ ] Workflow .609: component gizmo handle drag does not fall through to orbit
- [ ] Regression .609: Object Total Gizmo unchanged
- [ ] Regression .609: .606 Edge hold/scrub unchanged
- [x] Protection .609: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .610: Face X Move reports HANDLE DOWN
- [ ] Diagnostic .610: Face X Move reports OWNER REQUEST
- [ ] Diagnostic .610: owner reports OWNER BEGIN or explicit OWNER REJECT reason
- [ ] Diagnostic .610: handoff reports OK or FAIL
- [ ] Diagnostic .610: drag reports MOVE with matching pointerId
- [ ] Diagnostic .610: release reports OWNER FINISH and GIZMO POINTERUP
- [x] Protection .610: no intentional transform behavior change
- [x] Protection .610: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .611: Face X Move reports HANDOFF EXCEPTION with exact error text
- [x] Diagnostic .611: .610 established OWNER REQUEST is reached before failure
- [x] Protection .611: no intentional transform behavior change
- [x] Protection .611: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Diagnostic .612: Face X Move reaches OWNER BEGIN
- [x] Diagnostic .612: Face X Move reports HANDOFF OK
- [x] Diagnostic .612: Face X Move reports MOVE and OWNER FINISH
- [x] Workflow .612: Face X Move follows X axis rather than fallback free move
- [x] Workflow .612: Y/Z Move quick regression
- [x] Workflow .612: one component axis Scale quick check
- [x] Fix .612: SweepPath.editing treated as boolean property
- [x] Protection .612: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] HANDS-ON .612: component Total Gizmo confirmed working perfectly

- [ ] Workflow .613: Face additive multi-select still works
- [ ] Workflow .613: tapping an already-selected face removes only that face
- [ ] Workflow .613: tapping last selected face clears selection
- [ ] Workflow .613: background tap still clears all
- [ ] Workflow .613: tiny Pencil jitter does not turn deselect tap into transform
- [ ] Regression .613: deliberate direct component drag still transforms
- [ ] Regression .613: Vertex / Edge tap-to-remove works
- [ ] Regression .613: .612 component Total Gizmo remains fully working
- [ ] Regression .613: .606 Edge hold/scrub remains working
- [x] Protection .613: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .614: tapping selected Face removes only that face from multi-selection
- [ ] Workflow .614: tapping last selected Face clears selection
- [ ] Workflow .614: deliberate Face component drag still transforms
- [ ] Workflow .614: selected Edge / Vertex tap-to-remove works
- [ ] Workflow .614: Plane Move XY keeps Z fixed
- [ ] Workflow .614: Plane Move XZ keeps Y fixed
- [ ] Workflow .614: Plane Move YZ keeps X fixed
- [ ] Regression .614: Axis Move unchanged
- [ ] Regression .614: Free Move unchanged
- [ ] Regression .614: Scale / Rotate unchanged
- [x] Protection .614: .612 direct component gizmo architecture preserved
- [x] Protection .614: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Workflow .615: single Object X/Y/Z Move works
- [x] Workflow .615: single Object XY Plane Move keeps Z fixed
- [x] Workflow .615: single Object XZ Plane Move keeps Y fixed
- [x] Workflow .615: single Object YZ Plane Move keeps X fixed
- [x] Workflow .615: single Object Free Move works
- [x] Regression .615: single Object Scale works
- [x] Regression .615: single Object Rotate works
- [x] Regression .615: single Object exact-entry works
- [x] Regression .615: component gizmo remains correct from .614
- [x] Regression .615: Face tap-to-remove remains correct from .614
- [x] Regression .615: true Multi-object transforms remain working
- [x] Protection .615: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] HANDS-ON .615: unified semantic gizmo confirmed working perfectly

- [x] Workflow .616: whole Group gizmo Move transforms all members together
- [x] Workflow .616: whole Group gizmo Scale transforms all members with existing pivot rules
- [x] Workflow .616: whole Group gizmo Rotate transforms all members with existing pivot rules
- [x] Workflow .616: Group X/Y/Z Move works
- [x] Workflow .616: Group Free Move works
- [x] Regression .616: single Object semantic gizmo remains correct from .615
- [x] Regression .616: Vertex / Edge / Face gizmo remains correct from .615
- [x] Regression .616: ordinary Multi-object Move / Scale / Rotate remains working
- [x] Protection .616: group transform maths unchanged
- [x] Protection .616: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] HANDS-ON .616: Group/Multi gizmo routing confirmed working perfectly

- [ ] Workflow .617: Face single tap select/deselect remains correct
- [ ] Workflow .617: Face double-tap Grow selects one adjacency step
- [ ] Workflow .617: Face triple-tap Connected selects connected island
- [ ] Workflow .617: Edge double-tap Grow works
- [ ] Workflow .617: Edge triple-tap Connected works
- [ ] Workflow .617: Vertex double-tap Grow works
- [ ] Workflow .617: Vertex triple-tap Connected works
- [ ] Regression .617: Edge long-press/scrub Loop/Ring unchanged
- [ ] Regression .617: deliberate component drag breaks tap chain
- [ ] Regression .617: background tap deselect unchanged
- [ ] Regression .617: Vertex/Edge/Face/single Object gizmo unchanged
- [ ] Regression .617: Group/Multi gizmo routing unchanged from .616
- [x] Protection .617: no new topology solver
- [x] Protection .617: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .618: Face double-tap Grow works
- [ ] Workflow .618: Face triple-tap Connected works
- [ ] Workflow .618: Edge double/triple tap works
- [ ] Workflow .618: Vertex double/triple tap works
- [ ] Regression .618: single-tap selected component still removes
- [ ] Regression .618: deliberate component drag transforms without selection toggle
- [ ] Regression .618: Edge long-press/scrub unchanged
- [ ] Regression .618: gizmo and Group/Multi routing unchanged
- [x] Protection .618: one owner for component tap semantics
- [x] Protection .618: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .619: Face double-tap works even when tap #2 lands on gizmo
- [ ] Workflow .619: Face triple-tap Connected works
- [ ] Workflow .619: Edge double/triple tap works through gizmo overlap
- [ ] Workflow .619: Vertex double/triple tap works through gizmo overlap
- [ ] Regression .619: normal gizmo drag starts immediately outside active tap chain
- [ ] Regression .619: single-tap selected component still removes
- [ ] Regression .619: Edge long-press/scrub unchanged
- [x] Protection .619: no gizmo visibility delay introduced
- [x] Protection .619: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .620: Face long-press enters selection browser
- [ ] Workflow .620: first valid Face candidate previews on hold
- [ ] Workflow .620: horizontal scrub browses Face candidates
- [ ] Workflow .620: release commits visible Face candidate
- [ ] Workflow .620: invalid Loop/Ring candidates are skipped
- [ ] Workflow .620: additive existing Face selection survives browser
- [ ] Regression .620: Face single tap select/deselect unchanged
- [ ] Regression .620: deliberate Face component drag still transforms
- [ ] Regression .620: Edge long-press/scrub unchanged
- [ ] Regression .620: unified gizmo baseline unchanged
- [ ] Regression .620: Group/Multi routing unchanged
- [x] Protection .620: failed multi-tap experiment fully removed
- [x] Protection .620: no new topology solver
- [x] Protection .620: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .621: GESTURE DEBUG panel appears
- [ ] Diagnostic .621: Face press reports FACE CANVAS DOWN or GIZMO DOWN
- [ ] Diagnostic .621: Face canvas path reports FACE HOLD REQUEST + ARMED
- [ ] Diagnostic .621: stationary hold reaches FACE HOLD TIMER
- [ ] Diagnostic .621: candidate collection reports count/kinds
- [ ] Diagnostic .621: gizmo interception reports GIZMO DOWN + OWNER REQUEST/BEGIN
- [x] Protection .621: diagnostic-only, no intended interaction change
- [x] Protection .621: reusable debug module added for future gesture bugs
- [x] Protection .621: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .622: attempted Face hold logs RAW POINTERDOWN
- [ ] Diagnostic .622: Pencil press logs PEN CANVAS DOWN
- [ ] Diagnostic .622: determine whether PEN HOVER SWALLOW occurs on pointerdown
- [ ] Diagnostic .622: determine whether FACE CANVAS DOWN is reached
- [x] Protection .622: diagnostic-only, Face Hold behavior unchanged
- [x] Protection .622: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .623: Face hold attempt logs RAW CANVAS CAPTURE
- [ ] Diagnostic .623: determine whether RAW CANVAS BUBBLE appears
- [ ] Diagnostic .623: compare canvas boundary traces with FACE CANVAS DOWN
- [x] Protection .623: diagnostic-only, no gesture behavior change
- [x] Protection .623: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .624: capture listeners register with ids/labels
- [ ] Diagnostic .624: Face press logs CAPTURE ENTER/EXIT sequence
- [ ] Diagnostic .624: identify listener where cancelAfter becomes true
- [ ] Diagnostic .624: registration stack identifies owning module where possible
- [x] Protection .624: diagnostic-only, no interaction behavior change
- [x] Protection .624: dormant gizmo change deferred
- [x] Protection .624: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .625: Vertex Circle appears on initial load
- [ ] Workflow .625: first Repair/Inspect click performs intended action
- [ ] Workflow .625: mode switch away/back preserves Circle layout
- [ ] Workflow .625: Viewport menu includes Gesture Debug toggle
- [ ] Workflow .625: Gesture Debug defaults OFF
- [ ] Workflow .625: Gesture Debug ON shows panel
- [ ] Workflow .625: Gesture Debug OFF hides panel
- [ ] Workflow .625: Gesture Debug preference survives reload
- [ ] Regression .625: Vertex/Edge/Face/single Object gizmo unchanged
- [ ] Regression .625: Group/Multi routing unchanged
- [x] Protection .625: Circle load order is deterministic
- [x] Protection .625: permanent debug layer has no EventTarget monkeypatch
- [x] Protection .625: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .627: Gesture Debug button works before Focus View is ever used
- [ ] Workflow .627: Gesture Debug ON shows panel
- [ ] Workflow .627: Gesture Debug OFF hides panel
- [ ] Workflow .627: Gesture Debug persistence survives reload
- [ ] Workflow .627: Vertex Circle present immediately on fresh load
- [ ] Workflow .627: Vertex Circle remains after late Inspect/Repair sync
- [ ] Workflow .627: first Repair/Inspect click performs intended action
- [ ] Regression .627: Focus View unchanged
- [ ] Regression .627: mode switching preserves Circle layout
- [x] Protection .627: permanent Gesture Debug has no deep EventTarget monkeypatch
- [x] Protection .627: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .628: Gesture Debug button works on first tap
- [ ] Workflow .628: Gesture Debug ON shows panel
- [ ] Workflow .628: Gesture Debug OFF hides panel
- [ ] Workflow .628: persisted state survives reload
- [x] Protection .628: no transform/selection behavior change

- [ ] Diagnostic .629: Gesture Debug ON logs CAPTURE REGISTER lines after reload
- [ ] Diagnostic .629: Face hold logs CAPTURE ENTER/EXIT sequence
- [ ] Diagnostic .629: identify listener where cancelBubble becomes true
- [x] Protection .629: deep trace only active while Gesture Debug is ON
- [x] Protection .629: no interaction behavior change

- [ ] Workflow .630: selected Face hold reaches FACE CANVAS DOWN
- [ ] Workflow .630: Face Hold arms and timer fires
- [ ] Workflow .630: Face Hold candidate browser previews valid candidate
- [ ] Regression .630: ordinary component tap selection works
- [ ] Regression .630: selected component tap-to-remove works
- [ ] Regression .630: component paint drag still works after 6 px
- [ ] Regression .630: Edge hold/scrub unchanged
- [ ] Regression .630: gizmo / Group / Multi unchanged
- [x] Protection .630: Paint Select no longer owns pointerdown
- [x] Protection .630: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .631: ordinary Face tap selects one face only; no delayed Face Loop after release
- [ ] Workflow .631: ordinary Edge tap selects one edge only; no delayed Loop/Ring after release
- [ ] Workflow .631: genuine Face long-press still reaches candidate browser and release keeps the visible candidate
- [ ] Workflow .631: genuine Edge long-press/scrub still browses Loop/Ring candidates and release keeps the visible candidate
- [ ] Regression .631: pending Paint Select is cleared even when a newly appearing gizmo becomes the pointerup target
- [ ] Regression .631: component paint drag still claims after intentional drag
- [ ] Regression .631: selected component tap-to-remove remains correct
- [ ] Regression .631: Vertex / Edge / Face / single Object gizmo remains correct
- [ ] Regression .631: Group/Multi gizmo routing remains correct from .616
- [x] Static .631: global Face/Edge hold release uses window capture
- [x] Static .631: pending Paint Select release uses window capture
- [x] Protection .631: loop/ring candidate algorithms unchanged
- [x] Protection .631: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .632: Loop tool with Loops=1 adds exactly one clean loop
- [ ] Workflow .632: finished loop becomes normal edge selection without adding extra topology
- [ ] Workflow .632: Loop Slide still works before release/commit
- [ ] Regression .632: second intentional Loop Cut adds only the requested second loop
- [ ] Regression .632: Edge long-press Loop/Ring browser remains separate from Loop Cut tool
- [x] Static .632: no synthetic pointer replay remains in loop-cut-commit.js
- [x] Static .632: finished loop selection uses __boxlabSelectionBridge.set
- [x] Protection .632: .631 Face/Edge global release ownership unchanged
- [x] Protection .632: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .633: Vertex/Edge/Face selection shows only compact transform puck, not full gizmo
- [ ] Workflow .633: tapping transform puck expands full proven Total Gizmo
- [ ] Workflow .633: Move/Scale/Rotate transform control expands full gizmo for component selection
- [ ] Workflow .633: changing component selection collapses full gizmo back to compact puck
- [ ] Workflow .633: Face long-hold browser scrubs through multiple candidates without Paint Select taking over
- [ ] Workflow .633: Edge long-hold Loop/Ring browser scrubs without Paint Select taking over
- [ ] Regression .633: ordinary drag-paint selection still claims when no hold browser has fired
- [ ] Regression .633: Object full gizmo remains immediately available
- [ ] Regression .633: Group/Multi gizmo routing remains correct from .616
- [x] Static .633: Paint Select yields to active modeless browser
- [x] Static .633: Object mode forces full gizmo while component modes default dormant
- [x] Protection .633: transform maths unchanged
- [x] Protection .633: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .635: Face background tap clears selection while Extrude remains armed
- [ ] Workflow .635: Face background tap clears selection while Inset remains armed
- [ ] Workflow .635: tapping a selected Face removes it while Extrude/Inset remains armed
- [ ] Workflow .635: with Move armed, selected Face tap can deselect and background tap clears selection
- [ ] Workflow .635: with Scale armed, selected Face tap can deselect and background tap clears selection
- [ ] Workflow .635: with Rotate armed, selected Face tap can deselect and background tap clears selection
- [ ] Regression .635: deliberate Extrude/Inset drag still begins only after movement threshold
- [ ] Regression .635: modern Total Gizmo Move/Scale/Rotate remains unchanged
- [ ] Regression .635: dormant puck / expand / collapse behavior from .633/.634 remains unchanged
- [ ] Protection .635: touch navigation remains excluded from armed-tool background tap owner
- [x] Protection .635: legacy direct component transform owners stand down when Total Gizmo is visible
- [x] Protection .635: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .636: Extrude armed -> activate gizmo -> Extrude visually/behaviorally suspends
- [ ] Workflow .636: expanded gizmo axis Move handle transforms selection without selecting through geometry
- [ ] Workflow .636: expanded gizmo Scale handles transform selection without selecting through geometry
- [ ] Workflow .636: expanded gizmo Rotate handles transform selection without selecting through geometry
- [ ] Workflow .636: collapse gizmo -> previously armed Extrude resumes
- [ ] Workflow .636: repeat suspend/resume path with Inset
- [ ] Regression .636: outer Scale ring still transforms all selected faces
- [ ] Regression .636: Face selection gestures remain correct before gizmo activation
- [ ] Regression .636: component gizmo rejection never synthetic-clicks the canvas
- [ ] Regression .636: Object / Group / Multi gizmo behavior remains unchanged
- [x] Static .636: Face direct API exposes suspendForTransform/resumeAfterTransform
- [x] Static .636: Vertex/Edge/Face failed gizmo handoff is blocked, not syntheticDown
- [x] Protection .636: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .637: Extrude armed -> gizmo -> Move -> collapse -> only Extrude remains active
- [ ] Workflow .637: Extrude armed -> gizmo -> Scale -> collapse -> only Extrude remains active
- [ ] Workflow .637: Extrude armed -> gizmo -> Rotate -> collapse -> only Extrude remains active
- [ ] Workflow .637: Inset follows the same suspend/transform/collapse/resume ownership
- [ ] Regression .637: resumed Face tool performs normal direct drag immediately after collapse
- [ ] Regression .637: reopening gizmo after resumed Face tool suspends it cleanly again
- [x] Static .637: resume path disarms transform arming before restoring Face direct tool
- [x] Protection .637: transform maths unchanged
- [x] Protection .637: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .638: Face long-hold + drag UP grows selection
- [ ] Workflow .638: Face long-hold + drag DOWN shrinks selection
- [ ] Workflow .638: Edge long-hold + drag UP grows selection
- [ ] Workflow .638: Edge long-hold + drag DOWN shrinks selection
- [ ] Workflow .638: Vertex long-hold + drag UP grows selection
- [ ] Workflow .638: Vertex long-hold + drag DOWN shrinks selection
- [ ] Workflow .638: single selected Vertex puck is visibly offset and does not cover the vertex
- [ ] Workflow .638: multi-vertex selection puck remains at centroid
- [ ] Workflow .638: larger vertical drag produces multiple Grow/Shrink steps predictably
- [ ] Workflow .638: moving back toward hold point reduces preview step count instead of accumulating operations
- [ ] Regression .638: Face horizontal scrub still browses Loop/Ring/Coplanar/Connected
- [ ] Regression .638: Edge horizontal scrub still browses Loop/Ring
- [ ] Regression .638: Paint Select yields to fired Vertex/Edge/Face hold
- [ ] Regression .638: release keeps current Grow/Shrink preview
- [x] Static .638: Grow/Shrink gesture reuses existing authoritative buttons
- [x] Protection .638: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .639: collapsed puck leaves no invisible Move/Scale/Rotate handles hittable
- [ ] Workflow .639: click/drag through former gizmo handle locations performs normal Face selection/gesture behavior
- [ ] Workflow .639: single Vertex hold remains available while puck is offset
- [ ] Workflow .639: tapping puck expands full gizmo and handles become interactive normally
- [ ] Workflow .639: collapsing full gizmo immediately returns all former handle areas to viewport selection
- [ ] Regression .639: Face/Edge/Vertex Grow/Shrink gestures from .638 remain intact
- [ ] Regression .639: expanded gizmo Move/Scale/Rotate remains intact
- [x] Static .639: collapsed SVG subtree uses display:none
- [x] Static .639: onHandleDown rejects collapsed component gizmo events
- [x] Protection .639: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Workflow .640: multi-face Extrude preview survives Pencil release and commits
- [ ] Workflow .640: single-face Extrude preview survives Pencil release and commits
- [ ] Workflow .640: Inset preview survives Pencil release and commits
- [ ] Workflow .640: FACE DIRECT FINISH debug reports type=pointerup on normal Pencil lift
- [ ] Regression .640: pointercancel still rolls back an interrupted direct Face gesture
- [ ] Regression .640: Through/blocked Extrude commit/rollback behavior unchanged
- [ ] Regression .640: armed Face selection/deselection remains modeless
- [x] Static .640: multi-face-direct completion is owned at window capture
- [x] Protection .640: Extrude/Inset topology maths unchanged
- [x] Protection .640: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .641: Make Unique preserves active linked-instance world placement exactly
- [ ] Workflow .641: Make Unique preserves inactive linked-instance world placement exactly
- [ ] Workflow .641: editing detached object no longer propagates to former linked peers
- [ ] Workflow .641: editing remaining linked peer still propagates to its other linked peers
- [ ] Workflow .641: Multi Make Unique detaches all selected linked instances in one Undo step
- [ ] Workflow .641: Undo restores link metadata and shared editing
- [ ] Workflow .641: Redo restores unique independent meshes at the same placements
- [ ] Regression .641: Linked Duplicate still creates shared geometry with independent placement
- [ ] Regression .641: ordinary Duplicate remains independent
- [x] Static .641: detachment materializes source mesh + instanceMatrix before deleting link metadata
- [x] Protection .641: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .642: Face selection shows closed Selection Hub puck
- [ ] Workflow .642: tap puck -> full transform gizmo only
- [ ] Workflow .642: tap transform centre -> gizmo disappears and Face contextual tool ring appears
- [ ] Workflow .642: tap tool-ring centre -> tool ring closes and closed puck returns
- [ ] Workflow .642: closed puck can immediately reopen transform gizmo
- [ ] Workflow .642: tool ring preserves Face selection while cycling states
- [ ] Workflow .642: Extrude sector arms existing Extrude and entire hub disappears
- [ ] Workflow .642: Inset sector arms existing Inset and entire hub disappears
- [ ] Workflow .642: Knife / Duplicate / Extract / Shell / Sweep / Delete proxy existing authoritative actions
- [ ] Workflow .642: after tool launch, hub stays suppressed until Face selection changes
- [ ] Workflow .642: new Face selection restarts hub at closed puck
- [ ] Regression .642: no gizmo hit targets exist while Tools ring is visible
- [ ] Regression .642: no tool-ring hit targets exist while Transform gizmo is visible
- [ ] Regression .642: Face gestures and armed-tool deselection remain intact outside hub controls
- [x] Static .642: contextual sectors proxy existing buttons rather than duplicate modelling kernels
- [x] Protection .642: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .643: radial Sweep opens viewport Sweep session palette beside selection
- [ ] Workflow .643: Profile / Path / Finish viewport tabs drive the existing Sweep session stages
- [ ] Workflow .643: Circle / Rectangle / Draw / Use Selection proxy the existing Sweep controls
- [ ] Workflow .643: viewport Profile Size slider updates live Sweep profile
- [ ] Workflow .643: viewport Circle Sides slider updates live Sweep profile
- [ ] Workflow .643: viewport Edit / Closed / Undo / Clear mirror Profile state
- [ ] Workflow .643: Follow Edges / Draw Path proxy existing path modes
- [ ] Workflow .643: viewport Path Edit / Undo / Delete / Clear work without left-toolbar interaction
- [ ] Workflow .643: Caps mirrors existing state and Apply Sweep completes session
- [ ] Workflow .643: Cancel Sweep cancels/restores through existing Sweep owner
- [ ] Workflow .643: palette disappears after Apply or Cancel
- [ ] Regression .643: ordinary left-toolbar Sweep workflow remains unchanged
- [ ] Regression .643: Face Selection Hub direct-tool BIG PASS set remains intact
- [x] Static .643: viewport Sweep controls proxy existing #sweep* owners; no Sweep geometry kernel duplicated
- [x] Protection .643: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .644: successful Extrude Through completes and clears Face selection
- [x] Static .644: successful Through disarms Extrude, but hands-on Pencil orbit still FAIL
- [ ] Workflow .644: Extrude is visibly disarmed after successful Through
- [ ] Workflow .644: selecting a new Face after Through starts from normal selection state
- [ ] Regression .644: normal outward/inward Extrude remains armed/persistent as before
- [ ] Regression .644: Inset remains armed/persistent as before
- [ ] Regression .644: Through topology result and CLOSED validation unchanged
- [ ] Regression .644: .643 Sweep viewport session remains unchanged
- [x] Static .644: successful Through clears direct Face ownership and emits tool:none
- [x] Protection .644: Through kernel/gate maths unchanged
- [x] Protection .644: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .645: successful Through releases canvas Pencil capture on pointerup
- [ ] Workflow .645: Pencil orbit works on the immediately following gesture
- [ ] Workflow .645: normal Extrude completion does not leave stale Pencil capture
- [ ] Workflow .645: Inset completion does not leave stale Pencil capture
- [ ] Workflow .645: background deselect while Face tool armed does not leave stale Pencil capture
- [ ] Workflow .645: quick Face tap while tool armed does not leave stale Pencil capture
- [ ] Regression .645: .644 successful Through still disarms Extrude
- [ ] Regression .645: .643 Sweep viewport session remains PASS
- [x] Static .645: every Face-direct owned finish path calls releaseDirectPointer before stopImmediatePropagation
- [x] Protection .645: Through kernel/gate unchanged
- [x] Protection .645: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .646: after Through, failed Pencil orbit produces PEN ORBIT ROUTE
- [ ] Diagnostic .646: capture meshHit / selectionCount / faceToolActive / multiEnabled / paintPending / paintActive / controlsEnabled / route
- [ ] Diagnostic .646: if route is FORWARD_ORBIT, PEN ORBIT FORWARDED also appears
- [ ] Regression .646: no change to Face selection, paint selection or Pencil orbit behaviour
- [ ] Regression .646: .643 Sweep viewport session remains PASS
- [x] Static .646: Pencil route logging is diagnostic-only; no routing condition changed
- [x] Static .646: paint debug API is read-only
- [x] Protection .646: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .647: page load Gesture Debug shows PEN ORBIT LISTENER WRAPPED for OrbitControls pointer handlers
- [ ] Workflow .647: after Through, background Pencil-down produces PEN ORBIT ROUTE
- [ ] Workflow .647: background Pencil-down route is FORWARD_ORBIT and camera rotates
- [ ] Workflow .647: PEN ORBIT FORWARDED appears for successful Pencil orbit start
- [ ] Workflow .647: Pencil contact on editable geometry still follows existing selection policy
- [ ] Regression .647: Face tap/hold/paint selection remains intact
- [ ] Regression .647: successful Through remains correct and Extrude disarms
- [ ] Regression .647: .643 Sweep viewport session remains PASS
- [x] Static .647: OrbitControls constructor alone is bracketed by gate registration window
- [x] Static .647: routing policy BLOCK_MESH_HIT/FORWARD_ORBIT unchanged
- [x] Protection .647: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .648: Pencil contact move with buttons=1 is not classified as hover even if pressure=0
- [ ] Workflow .648: background Pencil orbit rotates camera after Through
- [ ] Workflow .648: Gesture Debug shows PEN ORBIT MOVE FORWARD during Pencil drag
- [ ] Workflow .648: true hover with buttons=0/pressure=0 remains swallowed
- [ ] Regression .648: one-finger touch orbit remains unchanged
- [ ] Regression .648: Pencil tap selection remains unchanged
- [ ] Regression .648: .643 Sweep viewport session remains PASS
- [x] Static .648: pen contact classifier uses buttons OR pressure
- [x] Protection .648: selection-vs-orbit mesh-hit policy unchanged
- [x] Protection .648: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .649: launch Inset from radial ring, perform Inset, closed puck reappears immediately
- [ ] Workflow .649: launch Extrude from radial ring, perform Extrude, closed puck reappears immediately
- [ ] Workflow .649: direct tool may remain armed while puck is visible
- [ ] Workflow .649: restored puck cycles normally to Gizmo -> Tools -> Puck
- [ ] Regression .649: Face selection remains intact after Inset
- [ ] Regression .649: .643 Sweep viewport session remains PASS
- [x] Static .649: hub restoration uses existing boxlab-face-direct-committed semantic event
- [x] Protection .649: no Extrude/Inset geometry code changed
- [x] Protection .649: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .650: Pencil pointerdown starts tracked contact
- [ ] Workflow .650: Pencil contact remains active across zero-pressure/zero-buttons move
- [ ] Workflow .650: Pencil orbit works after Through
- [ ] Workflow .650: PEN ORBIT MOVE FORWARD shows contactTracked=true during orbit
- [ ] Workflow .650: pointerup/cancel clears tracked Pencil contact
- [ ] Regression .650: true Pencil hover after lift is swallowed normally
- [ ] Regression .650: finger orbit unchanged
- [ ] Regression .650: Face Pencil tap selection unchanged
- [ ] Regression .650: .643 Sweep viewport session remains PASS
- [x] Static .650: contact lifecycle clears from window capture
- [x] Protection .650: selection-vs-orbit mesh-hit policy unchanged
- [x] Protection .650: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .651: Pencil tap on mesh remains selection/deselection
- [ ] Workflow .651: Pencil hold on mesh still enters existing Loop/Ring/Grow/Shrink browser
- [ ] Workflow .651: Pencil drag >=8px starting on mesh claims orbit
- [ ] Workflow .651: orbit claim restores pre-down component selection
- [ ] Workflow .651: PEN ORBIT DEFER CLAIM appears and subsequent move shows tracked=true
- [ ] Workflow .651: camera rotates when Pencil drag starts on model after Through
- [ ] Workflow .651: paint selection yields cleanly when orbit claims
- [ ] Workflow .651: component transform/tap intent yields cleanly when orbit claims
- [ ] Regression .651: active Extrude/Inset still own Pencil drag over selected Face
- [ ] Regression .651: finger orbit unchanged
- [ ] Regression .651: .643 Sweep viewport session remains PASS
- [x] Static .651: deferred orbit uses actual wrapped OrbitControls pointerdown listener
- [x] Protection .651: no modelling geometry kernels changed
- [x] Protection .651: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .652: arm Extrude, Pencil-down on empty background immediately disarms Extrude
- [ ] Workflow .652: same Pencil-down continues into orbit without lifting/restarting
- [ ] Workflow .652: arm Inset, Pencil-down on empty background immediately disarms Inset and orbits
- [ ] Workflow .652: Pencil-down on another Face while Extrude armed still starts repeat Extrude
- [ ] Workflow .652: Pencil-down on another Face while Inset armed still starts repeat Inset
- [ ] Workflow .652: background navigation does not clear the current Face selection merely from pointerdown
- [ ] Regression .652: finger orbit unchanged
- [ ] Regression .652: .643 Sweep viewport session remains PASS
- [ ] Regression .652: .649 puck restore after Extrude/Inset remains intact
- [x] Static .652: Pencil background-yield path contains no preventDefault / stopImmediatePropagation / setPointerCapture
- [x] Protection .652: Face geometry kernels unchanged
- [x] Protection .652: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Hands-on .652: armed Extrude/Inset + Pencil background-down disarms tool and same gesture orbits — PERFECT / PASS
- [ ] Workflow .653: radial Shell opens compact viewport Shell palette beside selection
- [ ] Workflow .653: viewport Thickness slider updates live Shell preview
- [ ] Workflow .653: viewport Thickness output mirrors authoritative Shell value
- [ ] Workflow .653: Apply Shell commits through existing Shell owner and palette disappears
- [ ] Workflow .653: Cancel restores/cancels through existing Shell owner and palette disappears
- [ ] Regression .653: ordinary left-toolbar Shell remains unchanged
- [ ] Regression .653: .643 Sweep viewport session remains PASS
- [ ] Regression .653: .652 Face-direct background-yield remains PASS
- [x] Static .653: Shell viewport controls proxy existing #shell* owners; no Shell kernel duplicated
- [x] Protection .653: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Hands-on .653: radial Shell viewport session PASS
- [ ] Workflow .654: Edge selection shows closed Selection Hub puck
- [ ] Workflow .654: Edge puck -> gizmo -> centre -> Edge tool ring -> centre -> puck
- [ ] Workflow .654: Face ring never appears in Edge mode
- [ ] Workflow .654: Edge Extrude radial sector arms existing Edge Extrude
- [ ] Workflow .654: Bevel radial sector arms existing Bevel
- [ ] Workflow .654: Crease radial sector uses existing Crease owner
- [ ] Workflow .654: Slide radial sector uses existing Edge Slide owner
- [ ] Workflow .654: Offset radial sector uses existing Offset Loop owner
- [ ] Workflow .654: Bridge radial sector respects existing validity/disabled state
- [ ] Workflow .654: Dissolve radial sector uses existing Dissolve Edge owner
- [ ] Workflow .654: Delete radial sector uses existing Delete Edge owner
- [ ] Regression .654: Face Selection Hub remains unchanged
- [ ] Regression .654: .643 Sweep and .653 Shell viewport sessions remain PASS
- [ ] Regression .654: .652 Face-direct background-yield remains PASS
- [x] Static .654: Edge ring proxies existing authoritative buttons; no Edge kernel duplicated
- [x] Protection .654: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .655: hold an Edge until candidate browser fires
- [ ] Workflow .655: first candidate previews alone, not original + candidate
- [ ] Workflow .655: horizontal scrub replaces candidate A with B; A is fully removed
- [ ] Workflow .655: scrub through all offered candidates; no accumulation
- [ ] Workflow .655: branching seed exposes all distinct one-ended/two-ended Loop possibilities found by existing selector
- [ ] Workflow .655: boundary seed offers Boundary candidate when valid
- [ ] Workflow .655: quad seed offers Ring candidate when valid
- [ ] Workflow .655: release commits only currently visible candidate
- [ ] Workflow .655: pointercancel restores pre-hold selection
- [ ] Regression .655: vertical Grow/Shrink scrub still works
- [ ] Regression .655: normal Edge tap selection unchanged
- [ ] Regression .655: .654 Edge Selection Hub remains available after committed selection
- [x] Static .655: candidate probes restore original selection
- [x] Static .655: candidate preview uses candidate.indices without base merge
- [x] Protection .655: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .656: hold a cube Edge and browse candidates
- [ ] Workflow .656: each adjacent Face can appear as a complete Face Boundary candidate
- [ ] Workflow .656: front Face candidate contains all 4 perimeter edges, including the previously missing side edge
- [ ] Workflow .656: opposite adjacent Face perimeter can also appear as a separate Face Boundary candidate
- [ ] Workflow .656: Face Boundary preview replaces prior candidate rather than accumulating
- [ ] Workflow .656: release commits only the complete currently visible perimeter
- [ ] Regression .656: .655 Loop candidates still browse correctly
- [ ] Regression .656: generic Boundary and Ring candidates still appear when valid
- [ ] Regression .656: vertical Grow/Shrink still works
- [x] Static .656: Face perimeter candidate maps mesh Face boundary segments to current edge indices
- [x] Protection .656: no Loop/Ring/Boundary selector kernel changed
- [x] Protection .656: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Static .657: Face Boundary helper exists in main.js
- [x] Static .657: collectEdgeHoldCandidates adds Face Boundary candidates
- [ ] Hands-on .657: cube front Face offers full 4-edge perimeter candidate

- [x] Hands-on .657: closed Face Boundary candidates AWESOME / PASS
- [ ] Workflow .658: unavailable radial tools are visibly dimmed and marked ×
- [ ] Workflow .658: unavailable sector remains visible but cannot launch tool
- [ ] Workflow .658: changing selection updates radial availability
- [ ] Workflow .658: active/armed authoritative tool highlights matching radial sector
- [ ] Workflow .658: Face Shell/Sweep availability mirrors underlying buttons
- [ ] Workflow .658: Edge Bridge/Offset/etc availability mirrors underlying buttons
- [ ] Regression .658: available Face tools launch exactly as before
- [ ] Regression .658: available Edge tools launch exactly as before
- [ ] Regression .658: .653 Shell viewport session remains PASS
- [ ] Regression .658: .657 Edge hold browser remains PASS
- [x] Static .658: radial disabled state derives only from authoritative target.disabled
- [x] Protection .658: no modelling kernels changed
- [x] Protection .658: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .659: select one complete Edge loop/perimeter
- [ ] Workflow .659: long-press another Edge; first candidate previews as existing selection + candidate
- [ ] Workflow .659: scrub candidate A -> B; existing selection remains, A disappears, B appears
- [ ] Workflow .659: no candidate-to-candidate accumulation
- [ ] Workflow .659: release commits existing selection + current candidate
- [ ] Workflow .659: pointercancel restores exact pre-hold selection
- [ ] Workflow .659: Face Boundary candidates from .657 still browse correctly
- [ ] Regression .659: starting with no prior selection behaves like candidate-only browser
- [ ] Regression .659: vertical Grow/Shrink remains functional
- [x] Static .659: preview recomputes from fixed hold.baseIndices + current candidate
- [x] Static .659: commit recomputes the same fixed-base result
- [x] Protection .659: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .660: arm Loop Cut and Pencil-down on valid Edge
- [ ] Workflow .660: cut topology appears and same Pencil drag slides inserted loop
- [ ] Workflow .660: camera does not orbit during Loop Cut slide drag
- [ ] Workflow .660: release commits cut/slide normally
- [ ] Workflow .660: after Loop Cut is manually disarmed, Pencil navigation works normally
- [ ] Workflow .660: perform Edge Bevel by Pencil drag
- [ ] Workflow .660: after Bevel release, Bevel button is no longer active
- [ ] Workflow .660: next Edge tap selects normally instead of immediately bevelling
- [ ] Workflow .660: Bevel pointercancel restores mesh and disarms
- [ ] Workflow .660: exact Bevel completion also disarms
- [ ] Regression .660: .652 Face Extrude/Inset background-yield still works
- [ ] Regression .660: .659 additive Edge hold selection still works
- [x] Static .660: Pencil gate recognizes main direct modelling owner
- [x] Static .660: direct Bevel pointerup/pointercancel call disarm
- [x] Protection .660: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Static .661: direct-bevel cache pin matches release
- [x] Static .661: main/pencil gate pins match release
- [ ] Hands-on .661: Loop Cut insert+drag slides, not orbits
- [ ] Hands-on .661: Bevel disarms after commit and next Edge tap selects

- [x] Hands-on .661: Loop Cut slide ownership PASS
- [x] Hands-on .661: Bevel post-commit reset PASS
- [ ] Workflow .662: radial Edge Bevel opens viewport palette
- [ ] Workflow .662: palette Width mirrors left #bevelWidth
- [ ] Workflow .662: palette Segments mirrors left #bevelSegments
- [ ] Workflow .662: Pencil-drag selected Edge still performs normal Bevel
- [ ] Workflow .662: Pencil-drag commit hides palette and disarms Bevel
- [ ] Workflow .662: Apply Exact commits captured radial launch selection using displayed Width/Segments
- [ ] Workflow .662: Apply Exact hides palette and returns to Edge selection
- [ ] Workflow .662: Cancel restores launch selection and disarms Bevel
- [ ] Workflow .662: ordinary left-toolbar Bevel does NOT open viewport palette
- [ ] Regression .662: .659 additive Edge hold remains PASS
- [ ] Regression .662: .658 radial availability remains intact
- [x] Static .662: viewport palette proxies existing Bevel controls/owner only
- [x] Protection .662: no Bevel topology kernel changed
- [x] Protection .662: src/multi-object-transform.js?v=0.36.1.0 unchanged



- [x] Hands-on .662: radial Bevel viewport session PASS
- [ ] Workflow .663: radial Edge Extrude opens simplified Total Gizmo constraint session
- [ ] Workflow .663: simplified gizmo shows Move X/Y/Z axes + centre only
- [ ] Workflow .663: centre selects local Plane constraint without transforming selected Edge
- [ ] Workflow .663: X/Y/Z axis tap changes Edge Extrude constraint without transforming selected Edge
- [ ] Workflow .663: dragging selected boundary Edge after constraint choice creates normal ribbon preview/commit
- [ ] Workflow .663: default radial Edge Extrude constraint remains Plane
- [ ] Workflow .663: successful pull selects new outer rail and gizmo follows it for repeat pull
- [ ] Workflow .663: disarming Edge Extrude restores normal Total Gizmo controls
- [ ] Workflow .663: changing away from Edge mode ends Extrude gizmo constraint session
- [ ] Regression .663: left-toolbar Edge Extrude remains unchanged and does not open simplified gizmo session
- [ ] Regression .663: .662 Bevel viewport session remains PASS
- [ ] Regression .663: .661 Loop Cut ownership + Bevel reset remain PASS
- [ ] Regression .663: .659 additive Edge hold selection remains PASS
- [x] Static .663: Edge Extrude topology/ribbon owner remains src/edge-extrude.js; no duplicate kernel added
- [x] Static .663: radial gizmo session maps constraint only and does not begin component transform
- [x] Protection .663: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .663: radial Edge Extrude ribbon workflow works
- [ ] Workflow .664: radial Edge Extrude constraint control is offset beside selected Edge/chain
- [ ] Workflow .664: side placement flips near viewport edge to avoid running off-screen
- [ ] Workflow .664: default Plane constraint is visibly identified/highlighted
- [ ] Workflow .664: tapping X/Y/Z changes active constraint label/highlight without moving geometry
- [ ] Workflow .664: dragging selected Edge still owns ribbon preview/commit
- [ ] Workflow .664: successful pull selects new outer rail and side palette follows it
- [ ] Regression .664: left-toolbar Edge Extrude remains unchanged
- [ ] Regression .664: .662 Bevel viewport session remains PASS
- [x] Static .664: no Edge Extrude topology/projection/history code changed
- [x] Protection .664: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .664: Edge Extrude radial workflow / drag-on-edge extrusion works really well
- [ ] Workflow .666: visible release remains v0.36.18.666 after release-version refresh
- [ ] Workflow .666: intentional Edge Extrude session exit disarms left-panel Extrude
- [ ] Workflow .666: Edge selection is preserved on Extrude session exit
- [ ] Workflow .666: closed Selection Hub puck reappears on preserved Edge selection
- [ ] Workflow .666: resulting outer rail remains immediately available for next Edge action
- [ ] Regression .666: radial Edge Extrude geometry/drag behaviour remains unchanged
- [x] Static .666: version.json and index.html release version match
- [x] Static .666: Extrude exit calls existing setArmed(false); no geometry kernel change
- [x] Protection .666: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .667: Edge Extrude exit preserves current outer Edge selection
- [ ] Workflow .667: Edge Extrude exit leaves left-panel Extrude OFF
- [ ] Workflow .667: Edge Extrude exit leaves Move transform OFF
- [ ] Workflow .667: closed puck returns on preserved Edge selection
- [ ] Regression .667: Edge Extrude ribbon/constraint behaviour unchanged
- [x] Static .667: exit snapshots/restores Edge IDs and disarms existing transform owner
- [x] Protection .667: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Strengthening .668: connected-chain Edge Bevel / 4-valence quad case recorded in ROADMAP.md
- [ ] Workflow .668: radial Edge Crease opens contextual viewport panel
- [ ] Workflow .668: viewport Strength mirrors authoritative left #creaseStrength control
- [ ] Workflow .668: tapping Edge applies Crease through existing main.js owner
- [ ] Workflow .668: viewport Uncrease delegates to existing selected-edge Uncrease
- [ ] Workflow .668: Done disarms Crease, preserves Edge selection and returns puck
- [ ] Regression .668: left-toolbar Crease does not open viewport panel
- [ ] Regression .668: Edge Extrude radial workflow unchanged
- [x] Static .668: no duplicate Crease kernel/history path added
- [x] Protection .668: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .669: radial Edge Crease reliably opens viewport panel
- [ ] Workflow .669: panel survives immediate radial launch/render sync
- [ ] Workflow .669: Strength mirrors left control
- [ ] Workflow .669: Done preserves Edge selection and returns puck
- [ ] Regression .669: left-panel Crease does not open viewport panel
- [x] Static .669: Total Gizmo directly calls Crease session openFromHub after authoritative Crease click
- [x] Protection .669: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .670: radial Crease preserves preselected Edge(s)
- [ ] Workflow .670: radial Crease does not enter legacy blank paint-selection mode
- [ ] Workflow .670: viewport Crease panel opens immediately beside preserved selection
- [ ] Workflow .670: current Strength applies immediately to captured selection
- [ ] Workflow .670: Strength slider updates same captured selection live
- [ ] Workflow .670: Uncrease sets captured selection to 0
- [ ] Workflow .670: Done commits once, preserves selection and returns puck
- [ ] Regression .670: left-panel Crease retains legacy tap-edge paint workflow
- [x] Static .670: radial session uses main.js authoritative applyCreaseSelection bridge
- [x] Protection .670: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .670: radial Crease selection-first workflow PERFECT / PASS
- [ ] Workflow .671: radial Offset opens contextual viewport panel
- [ ] Workflow .671: Support Spacing slider mirrors left #offsetLoopSpacing
- [ ] Workflow .671: drag selected loop uses existing live Offset preview/commit
- [ ] Workflow .671: drag commit selects created support loops and returns puck
- [ ] Workflow .671: Apply Exact delegates to existing precision Offset owner
- [ ] Workflow .671: exact commit selects created support loops and returns puck
- [ ] Workflow .671: Done without applying preserves original loop selection and returns puck
- [ ] Regression .671: left-panel Offset does not open viewport panel
- [ ] Regression .671: .670 radial Crease remains PASS
- [ ] Regression .671: Edge Extrude remains unchanged
- [x] Static .671: loop-offset + precision-offset emit shared completion semantic
- [x] Static .671: no duplicate Offset topology kernel added
- [x] Protection .671: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .672: radial Edge Slide opens contextual viewport panel
- [ ] Workflow .672: existing direct drag Slide remains unchanged
- [ ] Workflow .672: successful drag preserves Edge selection and returns puck
- [ ] Workflow .672: + exact percentage slides toward one side
- [ ] Workflow .672: - exact percentage slides toward opposite side
- [ ] Workflow .672: exact completion preserves Edge selection and returns puck
- [ ] Workflow .672: Done without action leaves geometry unchanged, preserves selection and returns puck
- [ ] Regression .672: left-panel Edge Slide does not open viewport panel
- [ ] Regression .672: radial Crease remains PASS
- [ ] Regression .672: radial Offset and Edge Extrude unchanged
- [x] Static .672: existing component-slide + precision-edge-slide remain authoritative
- [x] Static .672: no duplicate Slide solver added
- [x] Protection .672: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Regression .673: one finger orbits only
- [ ] Regression .673: two-finger drag pans
- [ ] Regression .673: pinch zooms
- [ ] Regression .673: Pencil orbits
- [ ] Regression .673: after tool interactions, no single-finger pan+zoom corruption
- [x] Static .673: OrbitControls gets touch/pen pointerup/cancel in early capture phase
- [x] Static .673: duplicate Orbit release delivery suppressed
- [x] Protection .673: modelling pointerdown/move ownership unchanged
- [x] Protection .673: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Regression .675: one finger orbits only after fresh load
- [ ] Regression .675: two-finger drag pans
- [ ] Regression .675: pinch zooms
- [ ] Regression .675: Pencil orbits
- [ ] Regression .675: touch navigation remains responsive after prolonged modelling
- [ ] Recovery .675: stale controls.enabled=false self-recovers on fresh first touch
- [ ] Recovery .675: stale controls.enabled=false self-recovers after last contact ends
- [x] Static .675: NAV CONTROLS RECOVER markers added
- [x] Protection .675: modelling pointerdown/move ownership unchanged
- [x] Protection .675: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .676: radial Edge Bridge completes using existing topology owner
- [ ] Workflow .676: successful radial Bridge switches to Face mode
- [ ] Workflow .676: created bridge face(s) remain selected
- [ ] Workflow .676: closed Face puck appears on created bridge face selection
- [ ] Workflow .676: Undo removes Bridge in one step
- [ ] Regression .676: left-panel Edge Bridge retains legacy completion behaviour
- [ ] Regression .676: Face Bridge unchanged
- [ ] Regression .676: Edge Extrude / Bevel / Crease / Offset / Slide radial flows unchanged
- [ ] Monitoring .676: .675 touch navigation remains good during normal modelling
- [x] Static .676: existing bridge-ui topology/history owner retained
- [x] Static .676: no Bridge topology kernel duplicated
- [x] Protection .676: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .675: navigation recovery good for now / provisional PASS
- [ ] Workflow .676: radial Bridge is available from one complete boundary loop
- [ ] Workflow .676: radial Bridge panel opens while legacy drawer Bridge remains disabled
- [ ] Workflow .676: first boundary remains selected during second-boundary acquisition
- [ ] Workflow .676: adding compatible second boundary enables Apply Bridge
- [ ] Workflow .676: Apply delegates to existing bridge owner and creates bridge
- [ ] Workflow .676: created bridge faces become selected in Face mode
- [ ] Workflow .676: Cancel restores first boundary and puck
- [ ] Regression .676: legacy left-panel Edge Bridge still requires complete two-loop selection
- [ ] Regression .676: Face Bridge unchanged
- [x] Static .676: guided session validates combined selection via bridgeEdgeSelectionInfo()
- [x] Static .676: no duplicate Bridge topology kernel added
- [x] Protection .676: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .676: guided radial Edge Bridge PASS
- [ ] Workflow .677: radial Dissolve executes once with no extra panel
- [ ] Workflow .677: next surviving Edge selection gets puck immediately after Dissolve
- [ ] Workflow .677: radial Delete executes once with no extra panel
- [ ] Workflow .677: next surviving Edge selection gets puck immediately after Delete
- [ ] Workflow .677: if valid Edge selection survives either action, closed puck returns on it
- [ ] Regression .677: .676 guided Bridge remains PASS
- [x] Static .677: stale hubSuppressedKey cleared after radial Edge one-shot completion
- [x] Static .677: Dissolve/Delete topology/history owners unchanged
- [x] Protection .677: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .677: Edge radial one-shot cleanup PASS
- [ ] Workflow .678: radial Face Duplicate is available
- [ ] Workflow .678: selected Face(s) duplicate into a new object
- [ ] Workflow .678: source object remains unchanged
- [ ] Workflow .678: duplicate becomes selected and Object mode activates
- [ ] Workflow .678: Object transform gizmo appears immediately on duplicate
- [ ] Workflow .678: Move/Rotate/Scale work immediately on duplicate
- [ ] Regression .678: Extract Faces unchanged
- [x] Static .678: existing duplicate-faces.js owner reused
- [x] Static .678: no duplicate Face duplication kernel added
- [x] Protection .678: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .678: Duplicate Faces works and moves with Object gizmo
- [ ] Workflow .679: background tap dismisses active Object gizmo
- [ ] Workflow .679: background dismiss keeps object selected
- [ ] Workflow .679: tapping object again restores gizmo
- [ ] Workflow .679: selecting a different object restores gizmo automatically
- [ ] Regression .679: Duplicate completion still opens gizmo immediately
- [x] Static .679: Object mode no longer force-reopens gizmo when dismissed
- [x] Protection .679: transform geometry owners unchanged
- [x] Protection .679: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Regression .680: Total Gizmo loads again
- [ ] Workflow .680: Duplicate Faces opens Object gizmo immediately
- [ ] Workflow .680: background tap dismisses gizmo
- [ ] Workflow .680: object remains selected after dismiss
- [ ] Workflow .680: tapping object restores gizmo
- [x] Static .680: duplicate top-level canvas declaration removed
- [x] Protection .680: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .681: Pencil tap empty background dismisses Object gizmo
- [ ] Workflow .681: object remains selected after Pencil dismiss
- [ ] Workflow .681: tapping object restores gizmo
- [ ] Regression .681: finger background dismiss remains PASS
- [ ] Regression .681: Pencil drag on empty background still orbits
- [ ] Regression .681: Pencil orbit drag does not fire background-tap dismiss
- [x] Static .681: semantic boxlab-pencil-background-tap added
- [x] Protection .681: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Workflow .682: repeated Pencil background taps dismiss Object gizmo reliably
- [x] Workflow .682: repeated Pencil object taps restore Object gizmo reliably
- [x] Workflow .682: object/background alternation remains stable
- [x] Regression .682: Pencil drag on background still orbits
- [x] Regression .682: finger background dismiss remains PASS
- [x] Static .682: Object picker routes through authoritative body raycast
- [x] Static .682: Pencil background candidacy begins at window capture
- [x] Protection .682: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .683: radial Extract executes from Face ring
- [ ] Workflow .683: source Faces removed unless whole source would become empty
- [ ] Workflow .683: new Extracted Faces object becomes active
- [ ] Workflow .683: Object gizmo appears immediately on extracted object
- [ ] Workflow .683: Move works immediately
- [ ] Workflow .683: finger/Pencil background dismiss still works
- [ ] Workflow .683: tapping extracted object restores gizmo
- [ ] Workflow .683: Undo restores scene transaction
- [x] Static .683: existing Extract owner reused
- [x] Static .683: no duplicate Extract topology kernel added
- [x] Protection .683: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .684: radial Knife opens compact viewport session
- [ ] Workflow .684: first Knife cut uses existing snapping/preview and commits normally
- [ ] Workflow .684: Knife remains active after cut for repeated cuts
- [ ] Workflow .684: second cut can be made without relaunching Knife
- [ ] Workflow .684: Done disarms Knife and hides viewport session
- [ ] Workflow .684: next Face selection gets fresh puck immediately
- [ ] Regression .684: left-panel Knife does not open radial session
- [ ] Regression .684: Pencil orbit/navigation unchanged
- [x] Static .684: existing Knife geometry/snap/history owner retained
- [x] Static .684: no duplicate Knife topology implementation added
- [x] Protection .684: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .684: radial Knife viewport session PASS
- [ ] Workflow .685: screenshot case accepts Loop Cut across logical quad corridor
- [ ] Workflow .685: Loop Cut stops at genuine non-quad / pole topology
- [ ] Workflow .685: existing collinear boundary vertices are preserved
- [ ] Workflow .685: live Loop Slide still works after generalized cut
- [ ] Workflow .685: Loop count >1 works on generalized corridor
- [ ] Regression .685: ordinary cube Loop Cut unchanged
- [ ] Regression .685: .684 Knife remains PASS
- [x] Static .685: logical quad requires exactly four genuine corners
- [x] Static .685: physical boundary chains retained during reconstruction
- [x] Static .685: existing logical-quad owner strengthened rather than duplicated
- [x] Protection .685: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .686: screenshot case still accepts Loop Cut
- [ ] Workflow .686: no long diagonal/sliver faces after generalized cut
- [ ] Workflow .686: outer boundary detail around opening remains intact
- [ ] Workflow .686: live Loop Slide works after cut
- [ ] Workflow .686: Loop count >1 creates clean bands
- [ ] Regression .686: ordinary cube Loop Cut unchanged
- [x] Static .686: only untouched logical sides used as outer connectors
- [x] Static .686: interior bands reconstructed deterministically
- [x] Protection .686: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .687: strengthened Loop Cut still traverses screenshot case
- [ ] Workflow .687: Loop Slide moves in expected direction from touched edge
- [ ] Workflow .687: reversing drag reverses slide
- [ ] Regression .687: .686 clean strip reconstruction remains intact
- [ ] Regression .687: ordinary cube Loop Cut unchanged
- [x] Static .687: logical seed direction derived from clicked physical edge
- [x] Static .687: promoted collinear-side segment direction projects to logical side
- [x] Protection .687: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Workflow .688: ordinary quad Loop Cut matches pre-.685 behaviour
- [x] Workflow .688: Loop Slide direction/feel matches pre-.685 behaviour
- [ ] Workflow .688: multi-loop count remains correct
- [ ] Workflow .688: single Add-vertex logical quad remains supported
- [ ] Safety .688: unsupported complex screenshot topology refuses cleanly rather than creating malformed faces
- [x] Static .688: loop-cut-added-vertex.js restored from known-good v0.36.18.162
- [x] Static .688: .685-.687 generalized reconstruction removed from live core
- [x] Protection .688: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .688: Loop Cut / Loop Slide old feel PASS
- [x] Workflow .689: radial Face Delete executes once with no extra panel
- [x] Workflow .689: next surviving Face selection gets puck immediately
- [ ] Workflow .689: valid surviving Face selection returns puck automatically
- [ ] Regression .689: .688 Loop Cut remains PASS
- [x] Static .689: stale Face hubSuppressedKey cleared after radial Delete
- [x] Static .689: Face Delete topology/history owner unchanged
- [x] Protection .689: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Workflow .690: radial Shell Cancel restores Face puck when selection survives
- [x] Workflow .690: radial Shell Apply closes cleanly and restores puck when selection survives
- [x] Workflow .690: radial Sweep Cancel restores Face puck when selection survives
- [x] Workflow .690: radial Sweep Apply closes cleanly with no stale suppression
- [x] Workflow .690: next Face selection gets fresh puck when session ends with no selection
- [x] Regression .690: Knife Done remains PASS
- [x] Static .690: Shell/Sweep geometry/history owners unchanged
- [x] Static .690: Knife/Shell/Sweep share one Face session completion path
- [x] Protection .690: src/multi-object-transform.js?v=0.36.1.0 unchanged


## Release / handoff checks — v0.36.18.690

- [x] Static .690: HTML title / data-release-version / version.json all agree on 0.36.18.690
- [x] Static .690: total-gizmo / Shell session / Sweep session are pinned to .690
- [x] Static .690: release-bootstrap.js and release-version.js repinned to .690 after refresh hardening
- [x] Release .690: stale-shell recovery remains live after repeated stale responses instead of stopping permanently after three attempts
- [x] Hands-on .690: iPad actually displays v0.36.18.690 after refresh hardening
- [x] Hands-on .690: Shell Cancel / Apply restore Face puck correctly
- [x] Hands-on .690: Sweep Cancel / Apply leave no stale Selection Hub suppression
- [x] Regression .690: Knife Done remains PASS
- [x] Handoff .690: AI_WORKFLOW release/cache protocol updated
- [x] Protection .690: v0.36.18.162 Loop Cut behaviour remains the protected live core
- [x] Protection .690: src/multi-object-transform.js?v=0.36.1.0 unchanged

## Modeless Face vertical scrub — v0.36.18.691

- [x] Hands-on .690: complete refreshed-shell Face-session exit check list PASS; Face radial lifecycle protected
- [x] Automated .691: Face Grow previews recompute from fixed base and return to neutral
- [x] Automated .691: Face Shrink/reversal restores the same starting selection
- [x] Automated .691: neutral band boundary tested; Edge/Vertex behavior unchanged
- [x] Hands-on .691: visibly loads v0.36.18.691
- [x] Hands-on .691: Face hold then UP grows; returning to start restores initial selection
- [x] Hands-on .691: farther UP then back reduces steps rather than accumulating
- [x] Hands-on .691: DOWN shrinks; returning to start restores initial selection; release keeps preview
- [x] Regression .691: Face sideways hold browser and tap select/deselect unchanged
- [x] Protection .691: .690 Shell/Sweep/Knife and .682 Pencil/Object owners unchanged
- [x] Protection .691: .688 Loop Cut core and multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Release .691: release-version and release-bootstrap pins updated to .691; targeted behavioral/release tests 9/9 PASS
- [x] Audit .691: full CI compared with .690 runtime; 285 existing failures, additional release pin mismatch corrected

## Modeless Edge vertical scrub — v0.36.18.692

- [x] Hands-on .691: Face neutral return complete manual list PASS and protected
- [x] Automated .692: Edge Grow/reversal/neutral and multi-edge Shrink/neutral restore fixed base
- [x] Automated .692: neutral boundary, protected Face behavior and Vertex baseline tested
- [x] Release .692: shell/manifest/main/refresh pins agree; targeted tests 12/12 PASS
- [ ] Hands-on .692: visibly loads v0.36.18.692
- [ ] Hands-on .692: Edge hold UP grows; return to origin restores starting selection
- [ ] Hands-on .692: farther UP and back reduces steps without accumulation
- [ ] Hands-on .692: DOWN shrinks; neutral restores initial selection; release keeps preview
- [ ] Regression .692: sideways Edge Loop/Ring/Boundary browsing and additive base intact
- [ ] Regression .692: Face .691 neutral return remains PASS
- [x] Protection .692: Loop Cut, radial tool owners and protected multi-object-transform unchanged

## Face radial gaps — v0.36.18.693

- [x] Static .693: primary eight Face sectors retain their labels/positions
- [x] Static .693: More pop-out Join proxies existing #joinSelectedCoplanarFacesBtn
- [x] Static .693: existing disabled-state and one-shot puck restoration paths reused
- [x] Protection .693: Join topology/history, Loop Cut and protected multi-object transform unchanged
- [ ] Hands-on .693: visible release .693; Face More pop-out opens beside ring and toggles closed
- [ ] Hands-on .693: selected adjacent coplanar Faces Join into one selected Face with puck
- [ ] Hands-on .693: one Undo restores separate Faces
- [ ] Hands-on .693: one Face/non-coplanar selection disables Join
- [ ] Regression .693: primary Face tools, Shell/Sweep exits and ring centre close remain intact

## Face two-ring batch — v0.36.18.694

- [x] Static .694: More UI removed; eight inner sectors unchanged; outer Join/Circle use existing owners
- [x] Protection .694: modelling kernels/Undo owners and protected transform untouched
- [x] Hands-on .694: visible .694; two rings readable and selectable with Pencil/touch
- [x] Hands-on .694: outer Join returns selected-result puck and undoes in one step
- [x] Hands-on .694: outer Circle returns puck and undoes in one step
- [x] Regression .694: disabled actions, ring-centre close and inner tools remain correct
- [x] Layout .694: spacing inspected near viewport edges and at different zooms

## Face outer Poke / Make Planar — v0.36.18.695

- [x] Hands-on .694: full manual list PASS; protected two-ring Join/Circle workflow
- [x] Static .695: Poke/Make Planar proxy existing loaded owners; previous sectors unchanged
- [x] Protection .695: modelling/Undo owners and protected transform unchanged
- [x] Hands-on .695: visible .695; both additional outer buttons usable
- [x] Hands-on .695: single/multi-face Poke returns selected-result puck and one-step Undo
- [x] Hands-on .695: one warped Face Make Planar returns puck; one Undo restores warp
- [x] Hands-on .695: planar/multiple Faces disable Make Planar
- [x] Regression .695: Join/Circle, centre close and protected navigation remain intact


## v0.36.18.696 — outer Face Triangulate / Flip Faces

- [x] .695 full manual list confirmed PASS by user; protect Poke/Make Planar validation, selection, puck return and one-step Undo.
- [x] iPad visibly shows v0.36.18.696 before judging.
- [x] Triangulate/Flip Faces appear on outer ring; previous sectors remain accessible.
- [x] Quad Triangulate produces two selected triangles, restores puck and undoes in one step; multi-Face works and triangle-only selection disables action.
- [x] Flip Faces reverses selected winding, preserves selection, restores puck and undoes in one step.
- [x] Poke/Make Planar, close and persistent selection/navigation remain intact.


## v0.36.18.697 — outer Face orientation tools

- [x] .696 full hands-on list PASS; protect Triangulate/Flip Faces.
- [x] iPad visibly shows .697; Orient Faces/Orient Outward and previous sectors accessible.
- [x] Connected patch with mixed winding becomes consistent; selection/puck return; one Undo restores mismatch.
- [x] Complete closed shell with mixed winding becomes outward; selection/puck return; one Undo restores mismatch.
- [x] Single Face / incomplete shell correctly disable the respective tools.
- [x] Already-correct eligible actions report no change, return puck and add no history.
- [x] Ring close, prior tools, navigation and viewport-edge spacing remain intact.


## v0.36.18.698 — radial Face Bridge preview / centre close

- [x] .697 full manual list PASS; orientation tools protected.
- [x] Automated: cycling adds no history; cancel restores mesh/selection; commit adds one history and emits completion after selection cleanup.
- [x] Visible .698; nine outer tools accessible; centre × aligned on puck.
- [x] Compatible two-Face Bridge opens nearby Next/Use Bridge/Cancel controls; Next cycles.
- [x] Cancel restores original Faces/selection and puck without history.
- [x] Use commits once, closes panel and clears selection; Undo restores; next Face tap gets puck.
- [x] Invalid selections disable Bridge; prior Face tools, protected Edge Bridge and navigation intact.


## v0.36.18.699 — radial Extrude / Inset exact and repeat controls

- [x] .698 full hands-on list PASS; Face Bridge lifecycle and centred × protected.
- [x] Automated: exact tool/value delegates to existing owner; no-selection disables exact; Repeat/Done delegate/disarm; another radial tool keeps its lifecycle.
- [x] Visible .699; radial Extrude/Inset each open correctly labelled nearby settings.
- [x] Small exact Extrude and Inset values affect selected Faces and each Undo in one step.
- [x] Normal drag updates last-value readout; Repeat toggles and replays existing Face-tap operation.
- [x] Done closes settings, disarms Repeat/tool, returns surviving-selection puck; normal selection/navigation work.
- [x] Other radial tools close settings; Bridge, Shell/Sweep, prior sectors and centred × remain intact.


## v0.36.18.700 — top-centre session dock / background Done

- [x] .699 Exact/Repeat/Done confirmed perfect by user.
- [x] Automated: all ten viewport panels/numeric entry use shared dock; contextual background taps preserve selection and complete; drags/cancelled multi-touch bypass completion.
- [x] Visible .700; all Face/Edge session panels and numeric popups top centre, stable during navigation.
- [x] Finger/Pencil background tap ends radial Extrude/Inset settings like Done, keeps surviving selection/puck, disarms Repeat/tool.
- [x] Background drag orbits; pan/pinch and two/three-finger Undo/Redo do not dismiss settings.
- [x] Face taps, Exact/Repeat and explicit Done remain correct.
- [x] Knife/Shell/Sweep/Face Bridge and protected Edge session completions work unchanged; gizmo/ring stay on selection.


## v0.36.18.701 — radial Face Coplanar / Connected selection

- [x] .700 full manual list PASS; top-centre popup placement and background Done protected.
- [x] Static: existing loaded button owners/validation reused; all previous targets retained; outer buttons have no overlap with each other/inner buttons.
- [x] Visible .701; eleven outer tools usable and previous eight inner tools unchanged.
- [x] One triangle of a triangulated quad → Coplanar selects flat connected region, preserves geometry and returns puck.
- [x] One cube Face → Connected selects complete shell, excludes disconnected components and returns puck.
- [x] Multi-Face selection disables both seed-based helpers.
- [x] Ring close, previous tools, top-centre panels, background Done/navigation and viewport-edge layout remain intact.


## v0.36.18.702 — active-tool-only radial correction

- [x] .701 selection command behavior PASS; user explicitly retires radial selection access.
- [x] Static: no selection button proxies remain on Face ring; all seventeen active tool targets retained.
- [ ] Visible .702; eight inner/nine outer active tools, Coplanar/Connected removed.
- [ ] Existing modelling sectors and centre close work.
- [ ] Normal/long-press selection browsing unchanged.
- [ ] Top-centre session panels and background Done remain correct.


## v0.36.18.703 — Face radial whole-object repair batch

- [x] Automated: three launches do not apply; top-centre scope controls; Cancel preserves selection and completes; Apply delegates once and clears stale Face IDs; owner failure preserves selection/reports reason; disabled/locked/context changes and superseding radial tools handled.
- [x] Static: twenty active targets, no selection helpers, no outer/outer or outer/inner button rectangle overlap; protected inner positions/modelling owners/transform/Loop Cut unchanged.
- [ ] Visible .703; eight inner/twelve outer tools and centre close remain usable.
- [ ] Close Holes / Quad Cleanup / Quadify N-gons show whole-active-object scope at top centre; Cancel returns original selected puck with no geometry/history change.
- [ ] Apply on suitable ordinary meshes repairs whole active object once; one Undo restores geometry. Successful Apply clears Face selection; next Face tap gets fresh puck.
- [ ] No eligible candidates disable corresponding tools; owner rollback reports reason and retains selection.
- [ ] Existing Face/Edge sessions, background Done, navigation and long-press selection remain protected.


## v0.36.18.704 — Face radial Clean Vertices / Align

- [x] Automated: all four repair launchers delegate existing APIs; cleanup actual owner returns safe success/failure with one history step and no-op cube protection; Align proxy axis delegation/Cancel/context changes/semantic completion/superseding tool; actual Align owner preserves anchor and commits once; existing core/dock/background/Bridge/value/release checks.
- [x] Static: all twenty previous targets retained; 22 active targets with no selection proxies; outer/outer and outer/inner spacing PASS; original inner positions/centre × and protected cores unchanged. Dynamic owner and parent-loader pins current.
- [ ] Visible .704; fourteen outer/eight inner buttons usable and centre close works.
- [ ] Two or more selected Faces → Align → X/Y/Z → tap selected anchor Face: anchor stays fixed, other selected vertices align on chosen axis, selection/puck returns, one Undo restores geometry.
- [ ] Align Cancel before/after axis arming leaves mesh/selection unchanged; one selected Face disables Align; navigation/selection remain correct.
- [ ] Clean Vertices top-centre whole-object panel Cancel preserves mesh/selection; Apply on eligible mesh removes safe redundant vertices once; Face selection clears, next tap gets fresh puck, one Undo restores geometry. Healthy cube disables cleanup.
- [ ] .703 repairs, Face/Edge sessions, Extrude/Inset background Done and protected navigation remain intact.


## v0.36.18.705 — Align to Face

- [x] Automated: arbitrary plane/group shape/fixed anchor/tangential positioning/shared hinge/bent and warped rejection, actual owner commit/Undo/Redo/no-op/topology rejection, popup delegation/feedback/Cancel and protected nearby checks.
- [x] Visible .705; existing Align pop-out exposes Align to Face beside X/Y/Z at top centre.
- [x] Selected moving planar Face(s) + tapped fixed selected Face → arbitrary-plane rotation and translation along anchor normal; fixed Face/vertices unchanged, moved group shape preserved, no tangential recentering.
- [x] Bent moving groups, warped anchors/shared-vertex conflicts and collapsing neighbours reject without changing geometry/history; reason stays visible. Shared boundary hinge works when fixed vertices can remain unchanged.
- [x] Success preserves Face selection, closes settings/returns puck, commits one Undo; Cancel changes neither geometry nor history.
- [x] Existing X/Y/Z Align, other radial tools, selection/navigation and protected transform/Loop Cut remain intact.


## v0.36.18.706 — Face radial Merge by Distance

- [x] .705 full manual list PASS; Align to Face protected.
- [x] Automated: existing welding/scanner kernels reused; Face panel opens despite disabled Vertex target, explicit tolerance scans without mutation, Cancel preserves selection, whole-object Apply stays Face/clears stale IDs/one history snapshot, invalid/unsafe/joint duplicate-Face batches reject, changed context rescanned/blocked, default Vertex results and intentional loose topology preserved.
- [x] Static: eight inner unchanged, fifteen outer active tools at 220px with no outer/outer or outer/inner rectangle overlap; all prior targets retained; dynamic child/parent pins and release markers updated; protected transform/Loop Cut untouched.
- [ ] Visible .706; Merge Dist and prior tools/centre × usable.
- [ ] Merge Dist top-centre panel clearly states whole active object and distance in model units; distance edits update readiness without geometry/history.
- [ ] Cancel retains original Face selection/puck and geometry/history.
- [ ] Apply on eligible ordinary mesh welds once without mode hop; clears stale Face IDs, next tap fresh puck; one Undo/Redo restores/repeats geometry.
- [ ] Invalid distance/no safe clusters disables Apply; Align to Face, prior repairs, background Done and navigation protected.


## v0.36.18.707 — Face radial Bevel

- [x] Automated: existing installed Edge bevel stack reused, Face/perimeter resolution through face-region, internal selected edges excluded, exact chamfer/rounded geometry matches Edge engine, one History Undo/Redo, actual Pencil preview/commit/cancel, failures rollback, lock/mesh/mode/selection guards, semantic Face dispatch without Edge button click, protected Edge drag/exact; nearby Face/dock/release checks.
- [x] Static: eight inner unchanged, sixteen active outer tools at 230px/22.5° with no outer/outer or outer/inner rectangle overlap; all previous targets retained; no additional raw-pointer owner or kernel edit; changed modules and release pins updated; protected transform/Loop Cut unchanged.
- [ ] Visible .707; select ordinary cube Face → radial Bevel opens top-centre Width/Segments/Apply Exact/Cancel, stays Face mode.
- [ ] Pencil-drag selected Face horizontally bevels entire perimeter; one Undo/Redo; segments 1 chamfer / multiple segments rounded.
- [ ] Apply Exact matches perimeter bevel, closes cleanly, clears stale selection; next Face tap fresh puck, one Undo restores.
- [ ] Cancel before apply and cancelled previews preserve original geometry/Face selection/history; puck returns and background orbit/pan/zoom work.
- [ ] Connected selected Faces bevel outside boundary only when current Edge engine supports it; unsupported/disconnected/no-boundary selections disabled.
- [ ] Protected Edge Bevel drag/exact/Cancel, prior Face tools, centre × and ring spacing remain correct. .706 pending checks retained.


## v0.36.18.708 — Face Bevel blue preview / ownership

- [x] .707 drag reported FAIL; no PASS recorded. Source/live release audit verified .707; exact screenshot stamp absent.
- [x] Automated: snapshot candidate slider preview does not mutate live geometry/history, Shell-blue fill/wire style and unique disposal, Window Face owner precedes consuming document Move handler, actual main fallback guard only during Face session, touch navigation passes, Pencil release retains preview until explicit Apply, one Undo/Redo, cancellation and external-source rejection, protected Edge drag/exact and nearby Face/dock/release checks.
- [x] Static: Edge exclusively canvas / Face exclusively window capture, same handler functions and kernel; direct helper/parent/main/session/release pins .708; ring/blue Shell-Solidify/protected transform/Loop Cut unchanged.
- [x] Visible .708; Face Bevel opens blue fill/wire preview and top-centre Width/Segments/Apply Bevel/Cancel.
- [x] Width/Segments update preview live without modifying original mesh/selection/history.
- [x] Pencil horizontal selected-Face drag adjusts preview without Move; release keeps it ready for explicit Apply.
- [x] Cancel removes preview, restores original selected puck with no geometry/history; background orbit/finger pan/pinch stay functional.
- [x] Apply commits once, removes preview/settings and clears stale Face selection; next Face tap gets puck; one Undo/Redo.
- [x] Protected Edge Bevel drag/exact/Cancel, prior Face tools/navigation remain correct. Pending .706 checks retained.


## v0.36.18.709 — Vertex radial Merge pair

- [x] .708 full manual list PASS; Face Bevel preview/ownership protected.
- [x] Automated: real Vertex merge owner through radial click, midpoint and chronological first placement, result selection/puck, one History Undo/Redo, disabled unsafe/single/read-only/wrong-mode no-op; protected Face/Edge ring targets and nearby sessions.
- [ ] Visible .709; Vertex puck → transform centre opens Merge Center / Merge First; centred × closes without changing selection.
- [ ] Adjacent cube vertices → Merge Center: midpoint result selected/puck, one Undo/Redo.
- [ ] Adjacent vertices selected in order → Merge First: first position preserved/result puck, one Undo/Redo.
- [ ] Single/unsafe selection disables actions; Vertex selection/navigation and protected Face/Edge tools remain correct. Earlier pending repair checks retained.

## v0.36.18.710 — all existing Vertex radial tools / cross-mode Bevel slot

- [x] Automated: thirteen existing Active Tools targets only; shared inner90° Bevel across Face/Edge/Vertex; requested Face/Edge rearrangement; outer/outer and outer/inner Vertex spacing.
- [x] Automated: actual Vertex Bevel exact/kernel/one History Undo/Redo and consuming drag completion; existing Slide rail/exact/drag completion, selected result; native Join/Weld/Delete, Create Face/Circle result modes/puck; Merge/Clean scope and history; existing Merge chronology/midpoint; numeric/readonly/mesh/mode guards; Add/Build arming/Done; nearby protected Face sessions.
- [x] Visible .710. Vertex inner Add/Build Edge/Bevel/Slide/Join/Weld/Create Face/Delete; outer Circle/Merge Center/Merge First/Merge Dist/Clean Vertices; centred × preserves selection.
- [x] Bevel at3 o'clock in all modes. Face Knife next clockwise, Duplicate next, Extract outer. Edge Slide in previous Bevel position, Crease in previous Slide position.
- [x] Add/Build existing placement/navigation and top-centre Done end correctly; Add selects last created vertex, Build ready for next ordinary selection.
- [x] Vertex Bevel/Slide Pencil drag and top-centre numeric settings use existing behavior, commit once, exit cleanly; Cancel/Done/puck/fresh tap and Undo/Redo.
- [x] Join/Weld/Create Face/Delete/Circle normal results and mode handoffs; selected result/puck or fresh next tap; one Undo; genuinely loose Delete remains safe.
- [x] Merge Center/First midpoint/chronological-first placement/result puck, one Undo/Redo. Merge Dist affects only selected vertices at edited tolerance, Apply once/Cancel no change. Clean explicitly affects whole active object, Apply once/Cancel no change.
- [x] Disabled/read-only/context changes safe; long-press selection, protected Face blue Bevel preview, Edge tools and navigation remain intact. Collect refinements before Object. Earlier pending checks retained.


## v0.36.18.711 — complete Object Active Tools radial workflow

- [x] User .710 Vertex radial AWESOME / PASS: all13 tools, settings/lifecycle and Bevel consistency protected.
- [x] Automated: ten existing Object launcher targets, spaced inner/outer sectors, original docked nodes/restoration, all eight session clients, owner cancellation/handoffs, original Solidify/Array preview cleanup and unchanged source, one-shot completion, lock/reference/Multi/mode guards, protected Face/Vertex sessions (32 targeted PASS).
- [x] Full1181/897/284; no new failure names versus .710. Historical376 pin check now passes. Syntax/diff/protected owners PASS.
- [ ] Confirm visibly .711; Object centre opens all ten radial tools, × returns gizmo.
- [ ] Solidify/Array original preview/gesture/settings/Apply/Cancel, top centre.
- [ ] Transform/Insert surface placement/tap-cycle and Symmetry plane settings/Align/Bisect Only, top centre, clean Apply/Cancel.
- [ ] Boolean operand selection/Swap/Union/Cut/Intersect/Close, one Undo/Redo, no stale suppression.
- [ ] Revolve Profile full editing/segments/Apply/Cancel; Mesh Health report/repair controls; Join/Clean existing results/history.
- [ ] Navigation and .682 Object finger/Pencil background dismissal/re-tap; Face/Edge/Vertex protected behavior.


## v0.36.18.712 — wide popouts / gizmo corner shortcuts

- [x] Screenshots visibly confirm .711 loaded; requested refinements, no full Object PASS.
- [x] 41 targeted: actual Symmetry/Array control identities/listeners; right action rail/staged Apply/hidden roots/lazy operands; all six shortcut actions/mode/disabled/busy guards; corner bounds/centre Move + Rotate wiring; full import/pin graph and nearby Object/Vertex/Face owners.
- [x] Full1190/906/284, identical failure names to clean .711; no new failures. Syntax/diff/protected modelling/multi-object-transform checks PASS.
- [ ] Visible .712; centre free Move and free Rotate ring, top-left radial in every mode, correct close/Bevel slot.
- [ ] Focus/Frame All, Undo/Redo corner shortcuts; Object Multi on/off/pressed state/additive object selection and transforms.
- [ ] Symmetry/Bisect + Array wide/shallow, all settings retained, right Cancel/Apply, original preview/Apply/Cancel/history.
- [ ] Other Face/Edge/Vertex settings wide and complete; blue Bevel/Shell/staged Sweep/repair/exact values retain clean completion/selection.
- [ ] Object Transform/Insert/Solidify/Revolve/Boolean complete controls/Cancel/Apply/history; navigation and .682 Pencil/finger background dismiss/re-tap protected.


## v0.36.18.713 — complete Edge Active Tools / shared radial positions

- [x] User .712 AWESOME PASS: wide top-centre popouts, centre transforms/corner shortcuts and additional Object tools protected.
- [x] Audit all nineteen existing Edge Active Tools; original owner actions, enabled states, kernel/history reused. 46 targeted PASS; full1195/911/284 with no new failure names versus .712.
- [x] Shared angular/tier positions match; Vertex outer spacing verified. .688 logical Loop Cut and .632 commit modules/pins untouched; protected multi-object-transform remains1.0.
- [ ] Confirm visibly .713. Edge ring includes all nineteen modelling tools; selection tools remain gesture-only.
- [ ] Loop: original tap/Pencil cut/slide feel, single/multiple Loops count, original Loop Slide value when available, top-centre Done exits and keeps work; next selection gets puck; Undo/Redo unchanged.
- [ ] Split: two non-adjacent edges on same face, repeat split, Done exits cleanly; bad pairs safe, navigation preserved.
- [ ] Sweep from closed Edge profile: top-centre Profile/Path/Finish, original settings/preview, Cancel preserves selection, Apply clean result; no stale suppression, next tap gets puck. Face Sweep regression.
- [ ] Uncrease, Circle, Flip Edge, Dissolve/Dissolve Loop/Delete: correct result, disabled unsafe cases, one Undo/Redo and selected puck/fresh next tap.
- [ ] Fill Face / Grid Fill / Join Coplanar hand result to Face puck; Collapse hands result to Vertex puck; Undo/Redo restores source/result safely.
- [ ] Protected Extrude/Bevel/Crease/Slide/Offset/Bridge still work with clean exits; all navigation/.682 Object behaviour unchanged.
- [ ] Circle outer top and Bevel inner right across Face/Edge/Vertex; Slide/Bridge/Sweep/Join Coplanar/Clean/Merge shared slots; Face Shell outer225 and expanded Vertex outer ring remain comfortable.


## v0.36.18.714 — Object List beside Multi

- [x] Original Objects node/actions retained; Focus owner reveals Objects only; toggle/previous disclosure/mode and Focus exit tested. Object-only shortcut/pressed/busy guards and nearby radial checks: 29 PASS.
- [x] Full1198/914/284, no new failure names versus .713. Protected modelling/transform/Loop owners unchanged; release/direct/helper/parent pins current.
- [x] Confirm visible .714; Object gizmo bottom-left has Object List icon beside Multi.
- [x] Focus View → Object List: original list appears, Focus remains on and other drawer controls stay hidden; second tap hides list and icon unhighlights.
- [x] Use object rows/visibility/lock/rename and Multi in revealed list; original selection/gizmo and navigation preserved.
- [x] Leave Object mode or exit Focus: temporary reveal cleared; normal drawer behavior restored. Normal-view icon opens/closes Objects disclosure. .713 Edge checks remain pending.


## v0.36.18.715 — repeated Edge Loop / Bevel EXACT sessions

- [x] User .714 PASS: Object List/Multi/Focus toggle and exits protected; other .713 Edge checks remain pending.
- [x] 50 targeted PASS: real Loop commit owner preserves slider position/deferred radial release/one Undo/Redo, persistent session Exact mesh adoption; actual Edge bevel drag/exact repeats/current IDs/history/stationary selection/cancel rollback/navigation release; Face unchanged; shared EXACT action rail and nearby sessions.
- [x] Full1204/920/284, no new failure names versus .7141198/914/284. .688 topology/slide core and multi-object-transform untouched, shared/direct/parent/main/refresh pins current.
- [x] Visible .715; Loop placement/release enables Loop Slide instead of closing. Slider moves latest loop with trusted feel; EXACT finalizes but leaves panel/tool open.
- [x] Another edge adds another Loop with current placement retained; repeat single/multiple count. Background finger/Pencil tap closes cleanly and keeps work; orbit/pan/pinch/cancelled multi-touch do not close. Undo/Redo per cut.
- [x] Edge Bevel drag commits once and stays open/armed for another edge. Stationary edge tap selects for Width/Segments + EXACT; EXACT commits once, clears used IDs, stays ready. Repeat with no stale source IDs.
- [x] Background finger/Pencil tap closes Bevel and returns puck/fresh next tap. Cancelled drag restores source/selection/no history and navigation; unsupported selections safe.
- [x] Face blue Bevel preview/Apply/Cancel, non-radial Edge Bevel, Split Done, Object List/Multi, other protected navigation/tools unchanged.


## v0.36.18.716 — affected-only Face Bevel preview / compact Boolean

- [x] User .715 PASS: repeat Loop and Edge Bevel EXACT/drag/background exits protected. Screenshot .714 is Boolean layout reference.
- [x] 51 targeted PASS; real Face preview leaves remote shell normally shaded, unchanged source/history and disposal; existing Face/Edge sessions and original Boolean controls/lazy insertion/dock retained. Full1205/921/284, no new failure names versus .715.
- [ ] Confirm visible .716. Single/connected Face bevel: blue only on changed region; unchanged faces/other shells keep normal shading. Width/Segments/Pencil/Apply/Cancel and Undo/Redo unchanged.
- [ ] Object Boolean: compact A/B/Swap top, Union/Cut/Intersect below, Close right; names/counts, disabled states, Multi/Swap/results/one Undo/Close work.
- [ ] .715 repeated Edge Loop/Bevel and .714 Object List/Focus remain intact.


## v0.36.18.717 — Multi first-object gizmo / radial Boolean access

- [x] Actual ordered selection/first-object live anchor/removal/empty selection tested; shared nearest-visible scene hit and Pencil semantic background guard tested. 33 targeted PASS; full1210/926/284, no new failure names versus .716. Protected Multi transform1.0 untouched.
- [ ] Confirm visible .717. Select first Object → Multi → add two others using finger/Pencil: gizmo and radial shortcut remain on first object, not group midpoint; adding/removing later operands retains access.
- [ ] From gizmo radial open Boolean: original Multi operands/Swap/Union/Cut/Intersect/Close, clean selection/result and one Undo/Redo. Compact .716 A/B/Swap above operations and Close right.
- [ ] Remove anchor via Object List: next surviving selected object owns presentation; empty Multi hides gizmo. Focus List toggle and original Multi Move/Rotate/Scale/pivot behavior unchanged.
- [ ] Genuine background finger/Pencil tap dismisses gizmo but retains selection; object tap restores. Orbit/pan/pinch preserve selections. .716 affected-only Face Bevel preview/Apply/Cancel and .715 Edge repeat sessions unchanged.


## v0.36.18.718 — viewport Multi repair / icons / Snap / Lasso / Invert

- [x] User reports .717 viewport Multi FAIL, Object Browser works; protected .715 still passed. No .716/.717 PASS inferred.
- [x] 61 targeted PASS; full1215/932/283, no new failure names. Existing authoritative owner early Multi/touch release/navigation/cancel guards, shared icons/original controls/listeners, lazy Lasso, seeded Invert context rejection and protected nearby Face/Edge/Object tested. Multi transform1.0 and modelling kernels untouched.
- [ ] Confirm visible .718. First Object → Multi → finger/Pencil add/remove other viewport objects; gizmo stays at first surviving selected object. Radial Boolean operands/Swap/results/Close/Undo; Object List still works in Focus.
- [ ] Top Undo/Redo/Frame All/Focus icons match gizmo, have hover tooltips; Focus icon remains after toggle, VIEW menu complete.
- [ ] SNAP above unchanged mode buttons: RGB Axis and GEO dot/line/face icons toggle original snapping with active state/tooltips. Lasso icon toggles actual owner in Face/Edge/Vertex/Object; Pencil draws, finger navigation, correct original depth behavior.
- [ ] Single component background tap clears; double nearby tap inverts ORIGINAL pre-first-tap set, using finger/Pencil/mouse. Object single tap retains actual selection/dismisses gizmo, double complements visible objects. No history entries; mode/mesh/selection changes or distant/late taps cannot invert stale set.
- [ ] Orbit/pan/pinch/two-finger Undo/three-finger Redo cancel tap intents and preserve selections; selected object re-tap restores gizmo; protected Multi Move/Rotate/Scale/pivots and Lasso do not compete.
- [ ] .715 Loop/Edge Bevel EXACT-repeat/background exits and .716 affected-only Face blue preview/compact Boolean retain correct completion/history.

## v0.36.18.719 — Lasso cancellation / double-background Invert refinement

- [x] Actual main owner: semantic + canvas delivery counts once per physical release in component/Object modes; second release inverts original seed once and does not clear the result.
- [x] Actual Lasso owner: stationary background completion after capture release; current drawing, mesh taps, drawn-away-and-return path and pointercancel do not trigger cancellation. Main retains session exclusions and navigation reset.
- [x] Full1219/936/283; same failure names as clean .7181215/932/283. Protected Multi transform1.0, Loop kernels, frozen betas untouched.
- [ ] Confirm visible .719. Arm Lasso/select components → single background finger/Pencil tap clears selection and turns off Lasso; next tap selects normally. Object tap retains the protected Object-selection contract while turning off Lasso.
- [ ] Face/Edge/Vertex: select a few components → double nearby background tap with finger/Pencil inverts the ORIGINAL selection; single tap clears immediately. Object double-background tap complements visible-object selection once.
- [ ] Lasso drawn selection/depth and finger navigation remain functional; drawn-away-and-return/cancelled paths do not disarm. Orbit/pan/pinch are not taps; two-finger Undo/three-finger Redo stay unchanged.
- [ ] Viewport Multi add/remove and Boolean, .715 Loop/Bevel repeat/background exits and .716 blue Face preview remain intact. Prior pending checks retained; no manual PASS inferred.

## v0.36.18.720 — Edge/Lasso completion / native double-tap timing

- [x] Actual Edge Paint owner yields to Lasso, including pending paint, without consuming Lasso move/end; no second raw-pointer owner.
- [x] Actual main window background owner clears Edge selection/disarms Lasso without canvas delivery; duplicate semantic native release cannot clear/invert twice; next same-pointer release accepted without timer expiry.
- [x] Native timestamps tolerate delayed callbacks and invert within500ms/32px; later/negative/context-changing taps do not invert stale seeds. Navigation, cancel, secondary-contact and long main-owner hold excluded.
- [x] Lasso idle-main-tool disarm and busy guard; original semantic timestamp propagation. Protected Face blue Bevel, contextual background Done and nearby ownership checks: 38 targeted PASS.
- [x] Full1226/943/283, same failure names as .7191219/936/283; protected Multi transform/Loop/frozen betas unchanged.
- [ ] Visible .720: Edge selection → Lasso → background finger/Pencil tap clears selection and turns Lasso off; next ordinary edge tap selects normally.
- [ ] Normal quick double-background taps invert original Edge/Face/Vertex selection once (500ms release interval); single tap clears immediately. Object complement follows original visible-object selection contract.
- [ ] Lasso draws correctly starting over edges or empty space; finger orbit/pan/pinch retain selection, cancelled draws do not disarm. Viewport Multi/Boolean and two-finger Undo/three-finger Redo preserved.
- [ ] .715 repeat Loop/Bevel sessions and .716 Face blue-preview/Apply/Cancel remain intact. If background failure persists, capture Gesture Debug BACKGROUND TAP DOWN/BLOCKED/COMPLETE entries; do not stack speculative gesture owners.

## v0.36.18.721 — original Modifiers access / Invert diagnosis

- [x] User .720 checks1/3 PASS: Edge background clear/Lasso disarm, Lasso drawing and finger navigation; preserve. Pencil draws while Lasso armed, fingers navigate: expected. Slight hit tightening deferred to final perfection MUCH LATER.
- [x] User .720 check2 FAIL: double-background Invert. .721 adds diagnostics only; do not mark behavior fixed/passed.
- [x] Actual Object List Focus owner reveals original Objects + Modifiers, Modifiers closed each opening; Focus/mode exits restore previous disclosure states. Normal-view opening also collapses Modifiers. Original nodes/owners retained.
- [x] Existing matcher trace reports rejection/reset reasons and dt/px/counts without altering results.21 targeted PASS; full1228/945/283, no new failure names versus .7201226/943/283.
- [ ] Visible .721, Focus → Object List: original Objects and collapsed Modifiers below. Expand and use Mirror/SubD/Cage; same controls and behavior. Reopen starts collapsed; list closes/Focus remains active; mode/Focus exits restore prior normal drawer state.
- [ ] VIEW → Gesture Debug: select some Edge/Face components, double-tap true background once and screenshot BACKGROUND DOUBLE TAP / COMPLETE entries. Diagnose actual rejection before next gesture fix.


## v0.36.18.722 — readable background-tap evidence

- [x] Background entries stay pinned through 1500 hover/move/unrelated logs; bounded to six, clear/disable/re-enable reset, actual contact/routing logs retained. 8 targeted PASS.
- [x] Full1231/948/283; same failure names as .721. Gesture/matcher/modelling owners unchanged.
- [ ] Visible .722 → VIEW Gesture Debug → select two edges → two quick taps on true background with ONE finger. Screenshot blue BACKGROUND section immediately; repeat separately with Pencil. Invert remains unresolved until evidence identifies rejection.
- [ ] Confirm original Modifiers under Object List collapsed on opening and original actions work; previous .721 checks remain pending.


## v0.36.18.723 — physical contacts alongside tap decisions

- [x] Passive window observer records viewport down/up/cancel with native timing/coordinates, never consumes events; ignores nonviewport and disabled debug. Four amber records bounded/reset separately from blue tap decisions.10 targeted PASS.
- [x] Full1233/950/283 vs clean .7221231/948/283: identical failure names; actual gesture/matcher owners untouched.
- [ ] Visible .723 → enable Gesture Debug → select two components → two quick screen taps on blank background. Immediately screenshot amber physical contacts AND blue decisions. Try finger/Pencil separately; diagnose delivery/reset before changing matcher.
- [ ] Original Modifiers under Objects remains closed on opening and actions work; prior pending checks retained.


## v0.36.18.724 — background hold Invert (supersedes double-tap checks)

- [x] Existing owner500ms hold complements current component/Object set once. Both native/semantic release orders retain result and Lasso; quick taps clear, never invert.24 targeted PASS.
- [x] Movement/secondary contact/cancel/context/mesh/selection/session/blur guards; actual Pencil contact required. Nearby Lasso/Edge Paint/tool background completion retained. Full1237/954/283, identical failure names to .723. Protected owners unchanged.
- [ ] Face/Edge/Vertex select some → short background tap clears and Lasso off; select again → stationary hold about half a second inverts once, release retains. Finger and Pencil separately. Double tap no longer inverts.
- [ ] Arm Lasso → stationary background hold inverts and keeps Lasso armed; release retains result; subsequent drawing still works. Short background tap exits Lasso.
- [ ] Background drag/orbit, two-finger pan/pinch cancel hold without inversion; two-finger Undo/three-finger Redo retain behavior. Active modelling sessions keep original background Done/exit semantics.
- [ ] Object hold complements visible objects using original owner; original Modifiers collapsed below Objects remains accessible.


## v0.36.18.725 — GEO icon / .724 baseline PASS

- [x] User .724 PERFECT/PASS: background tap/hold behavior accepted and protected. Double-tap remains retired.
- [x] Existing viewport control tests5 PASS; original snap checkbox/listeners/labels retained. Syntax/diff and child/parent cache pins checked.
- [ ] Visible .725: GEO clearly reads dot / line / face beside Axis; toggle retains active highlight and original geometry snapping. Tooltip still describes vertices, edges and faces.


## v0.36.18.726 — VIEW Object List access without selection

- [x] Original list/disclosure owner reused without selection/gizmo. Component mode routes through original Object button; busy/missing owner guards, menu closes only on success, iPad pointerup+synthetic click fires once.12 targeted PASS.
- [x] Full1240/957/283 vs clean .7251237/954/283: identical failure names. Passed .724 gesture/main and protected modelling unchanged.
- [ ] Focus, Object mode, empty selection: VIEW → Object List opens original Objects with collapsed Modifiers underneath. Close/reopen works; original row selection/management and Mirror/SubD/Cage controls work.
- [ ] Face mode → VIEW Object List enters Object mode once and opens same panels. Mouse/finger/Pencil activation works; active tool session remains protected.
- [ ] .725 GEO visual/toggle and earlier pending radial/session checks retained; .724 tap/hold PASS stays protected.


## v0.36.18.727 — selection depth in viewport strip

- [x] User .726 PASS: VIEW Object List access/reopen accepted; preserve.
- [x] Original Visible/Through group/buttons/listeners retained after move; scoped layout and child/parent pins verified.27 targeted PASS with nearby Lasso/hold/Edge Paint/list owners. Full .726 baseline1240/957/283 retained.
- [ ] Normal and Focus: Visible/Through sits beside Lasso above modes. Toggle active state; Lasso/paint respects original visible-only vs through behavior on overlapping/front/back geometry.
- [ ] Changing mode or Focus retains depth choice. Lasso drawing/finger navigation and passed background tap/hold still work; viewport strip fits without covering mode bar.


## v0.36.18.728 — selection-access batch (manual pending)
- Normal and Focus: SELECT opens/closes bounded top-centre panel; Escape and background close it; viewport gesture still works.
- Vertex/Edge/Face: original All/Deselect/Invert, Grow/Shrink/Connected; Edge Loop/Ring/Boundary; Face Angle/Normal threshold and alignment still act on existing selection.
- Object: original Multi/All/Clear/count, Hide/Show and Lock/Unlock update correctly; switch modes and reopen for correct contextual controls.
- Visible/Through, Lasso, .724 short-tap clear/disarm and 500ms hold Invert/retained release; finger navigation/history stay protected.
- Automated:27 targeted PASS; full1244/960/284 vs fresh .7271240/956/284, identical failures. Four new panel/owner tests pass.


## v0.36.18.729 — radial/session polish (device checks pending)
- [x] 62 focused tests pass across all four modes, original controls/stages, real nearby owners and new context/drag/exit cases. Full1259/976/283; no new failures vs fresh .7281244/960/284, old loader-pin fixture repaired. Broader112/108/4 existing failures retained.
- [ ] Face: Extrude/Inset Exact and Repeat remain available after operations; Done/background exits cleanly. Bevel/Shell/Sweep Cancel/Apply retains expected selection/puck, original blue-preview navigation.
- [ ] Vertex: Bevel/Slide and Merge/Clean settings/exits remain top-centre and return to selection/puck. No accidental Apply when input unavailable; original Add/Build Edge still exit cleanly.
- [ ] Object: Array/Solidify Cancel then Apply; Boolean Close/operation and one Undo; original full gizmo returns. Symmetry/Revolve retain their plane gizmos and staged Apply visibility.
- [ ] Edge: Slide/Offset exact or drag exits to puck; Crease strength/Uncrease/Done is one Undo. Switch tool/object/mode with settings open: old panel/selection never returns. Loop/Bevel EXACT remains repeatable; background exits; Split Done keeps completed edits.
- [ ] .728 SELECT in normal/Focus and original depth/Lasso; .724 finger/Pencil short tap and500ms hold, orbit/pan/pinch/two-finger Undo/three-finger Redo protected.
- [x] Crease history entry belongs to original owner on FIRST successful preview; Done adds none. Do not defer push across object history-stack swaps or rely only on mesh/reference identity.


## v0.36.18.730 — compact UI and Beta6 release-candidate checks
- [x] Visible/Through intentionally removed from UI; original depth host hidden internally. Lasso/SELECT retained. Supersedes .727 depth relocation and fixed720px popout requirements.
- [x] 53 focused PASS; real exact transform Undo/Redo, indexed export channels/morph/import-fit and actual Extract owner covered. All279 src modules syntax-pass. Full1265/982/283 vs .7291259/976/283, identical failure names. Historical RC113/97/16 limitations documented.
- [ ] Normal/Focus: Lasso and SELECT visible, no Visible/Through. SELECT component/Object controls and close work; original Lasso/tap/hold/navigation behavior retained.
- [ ] Sparse popouts fit content with no outer padding; larger Array/Sweep/Boolean settings stay bounded, scrollable, with original stage/Apply/Cancel visibility. Exact fields and notes remain readable.
- [ ] Extract one/two faces, then all faces: new object created, expected source retention/removal, one scene Undo/Redo, Facegroups retained.
- [ ] Move/Rotate/Scale numeric values, Object Multi/Boolean single Undo, orbit/pan/pinch and two-/three-finger history gestures on iPad/Pencil.
- [ ] Export/Save GLB to Files then Nomad; reimport unchanged file: object count, welded geometry, Facegroups, original scale/position and eligible UV/material/morph channels retained. External Nomad app cannot be validated in cloud browser.


## .731 pre-finalization tool checks (device acceptance pending)

- [ ] Face Sweep and closed Edge-loop Sweep open one top-centre Profile/Path/Finish popup; Follow Edges / Draw Path and original Apply/Cancel work, no second editor.
- [ ] Edge Slide stays armed after direct drag and exact Apply for further slides; Done or a short background finger/Pencil tap ends it and returns surviving selection/puck. Background hold must not invert during Slide.
- [ ] Edge Bevel Width/Segments show blue candidate without editing source/history; Apply Bevel commits once; Cancel/background removes ghost; existing in-window/Pencil direct bevel still commits on release and supports repeats.
- [ ] Vertex Bevel Width/exact shows blue candidate; Apply commits once and closes; Cancel retains original geometry/selection; existing in-window/Pencil direct bevel still works. Vertex has Width only, no invented Segments control.
- [ ] Bevel preview never overwrites source after geometry/active-object/mode/lock changes; preview resources dispose on exit; Undo/Redo each committed operation once.
- [ ] Protected Face Bevel blue preview/Apply/Cancel, navigation, Lasso/shorttap/500ms hold, compact panels and Object Multi remain intact.


## v0.36.18.732 — grouped iPad checks (awaiting device PASS)

.731 user PASS recorded. Automated:133 focused pass; full1285/1008/277, no new
failure names versus .731; all280 module syntax pass. No .732 device PASS inferred.

1. Open Split and several sparse/larger tool popups in normal and Focus view:
   small comfortable edge packing, variable width, legible hint and reachable actions.
2. Split an edge, then background-tap: tool closes, split and selection remain;
   Undo/Redo restores the edit. Repeat with Knife/Align/Slide/Bevel and idle preview
   Cancel. Orbit/pan must not close a tool; Vertex Add still places a floating vertex.
3. Array: Y puts END above source; X/Z place on their axes. Drag END on each axis,
   change Count, Cancel (source unchanged), Apply then one scene Undo/Redo. Free
   shows XYZ arrows; body drags freely and arrow drag changes only that coordinate.
4. Extrude then open Inset: no Repeat Extrude/Bevel label in Inset. Complete an
   inset: Repeat Inset enables and replays its distance on another Face. Done and
   background close preserve committed edits and original selection/history behavior.
5. Verify top icons Frame All / Undo / Redo / Focus / Object Browser / VIEW. Open
   browser from Face and empty Object selection, list appears on right under icons;
   original object selection/management work; Modifiers starts closed and expands.
   Close/reopen, change mode, and test normal/Focus layout and scrolling.
6. Protected regression: Pencil lasso + finger orbit/pan/pinch, short background
   deselect/Lasso-off, stationary long-hold invert, two-/three-finger Undo/Redo,
   Loop Cut, Multi Move/Rotate/Scale, .731 Sweep and Bevel previews.

Background policy/exceptions and owner audit are recorded in AI_HANDOFF.md.

## .733 — Focus launch and Beta 6 final smoke

User PASS .732 recorded. 44 focused pass; full1287/1010/277, same failure names
as .732. Focus starts on each new launch; icon active/aria-pressed true and bright.
Test toggle shows left tool list and removes active state, toggle again hides it;
original icon, right browser and Modifiers remain functional in both views.
Remaining final device gates: Focus check, short navigation/history/Multi/Boolean/
Extract smoke, and Files→Nomad→BoxLab GLB round-trip. Then freeze/publish Beta6;
see BETA_6_RELEASE_CHECKLIST.md. No device PASS inferred for .733.

## .734 — component-gizmo Align regression

106 focused pass; full1292/1015/277, no new failure names vs .733; all280 syntax pass.
- Vertex: select two or more vertices, tap point Align icon, choose X/Y/Z, then
  tap the selected vertex that stays fixed. Other selected vertices align on that
  coordinate. Gizmo hides during anchor picking and returns after apply. Undo/Redo.
- Edge: repeat with two or more edges and line Align icon. Fixed edge endpoints
  unchanged; other selected vertices use original anchor-coordinate alignment.
- Face: face icon opens X/Y/Z and Align to Face; radial no longer contains Align.
  Existing arbitrary-plane option keeps anchor unchanged and rejects invalid groups.
- Cancel/background retain selection, mode/object changes cancel stale session;
  icon is unavailable with insufficient selection or during drag; Object Multi stays.
- Launch Focus still armed; browser and navigation/history regressions unchanged.
Device acceptance pending; no inferred .733/.734 PASS or Beta6 freeze.

## .735 — axis colours and native NOMAD handoff

.734 user PASS. 51 focused pass; full1301/1024/277, no new failure names vs .734;
all281 source syntax pass. Native output parsed/validated locally; Nomad device
acceptance still required. No .nom import into BoxLab is claimed.
1. Align Vertex/Edge/Face, Move and Array buttons: X subtle red, Y green, Z blue;
   active state clearly stronger, disabled state/selection and gestures unchanged.
2. File NOMAD button replaces secondary Save GLB and explanatory note; filename
   uses name field + .nom; stays NOMAD when OBJ/GLB format switches.
3. Export a named multi-object scene with facegroups as Base, save/share to Files,
   open in Nomad. Inspect scene names, geometry/scale/quad topology/groups. Frame All
   if needed. Source BoxLab scene and Undo stack unchanged; hidden/reference omitted.
4. Repeat SubD/Mirror export; check displayed result in Nomad. Cancel saving safely;
   regular OBJ/GLB export still works. Rich GLB channels keep their previous workflow.
After device PASS, final Beta6 release smoke/freeze gate remains in checklist.

## .736 — NOM browser download/Open In delivery

User PASS .735.14 focused pass; full1302/1025/277 same failure names; changed syntax
and whitespace pass. Native NOMAD now downloads via anchor, preserving .nom name
and MIME, keeping URL60s. It must not call save picker/Web Share first.
- In iPad browser tap NOMAD, confirm ordinary browser download/preview. Open saved
  download then Open In/Share → Nomad; check object names, geometry/groups unchanged.
- Check normal GLB/OBJ save/share and cancellation remain unchanged.
Actual Open In/app targeting controlled by iOS/browser, not guaranteed by website;
record device result before Beta6 freeze. No .736 device PASS inferred.

## Beta 6 frozen release — 2026-10-05

- [ ] /beta-6/ fresh launch shows .736, Focus armed; toggle reveals tool list.
- [ ] Frozen navigation, selection, Undo/Redo and Multi retain accepted behavior.
- [ ] Frozen NOMAD download opens in Nomad; regular GLB remains available.
- [x] Runtime snapshot equals accepted .736; relative assets/recovery stay isolated.

## Post-Beta 6 reliability audit — 2026-10-05

- [x] Reproduce full suite and inventory each failure (1302/1025/277/0 skipped).
- [x] Trace aggregate script subchecks separately (31 scripts /121 failed checks).
- [ ] Reconcile old version pins with current shell and protected intentional pins.
- [ ] Replace superseded source assertions with current semantic behavior coverage.
- [ ] Scope recovery sentinels explicitly; do not blanket skip to claim green.
- [ ] Repeat on CI Node22; expand runtime path triggers and validated release gate.
- [ ] Extend diverse Bevel chains, actual Knife→Loop and scene Undo/Redo fixtures.
See docs/reliability-audit-2026-10-05.md; audit makes no runtime changes.

## .737 test-contract baseline

- [x] Shell title/visible stamp/manifest agree; assets retain reviewed pins/bytes.
- [x] Missing/truncated/wrong pin, changed source, wrong order, stale shell rejected.
- [x]31 historical scripts expose333 namedcases; no original check silently removed.
- [x] .453 historical constraints run against exact accepted archival fixture.
- [x] Bootstrap survives10 stale reloads within frozen path; matching shell stays.
- [x] Actual Repeat delegates tool/value/face to current owner; invalid/busy rejected.
- [x] CI triggers allruntime sources/assets.
- [ ] Reconcile118 remaining active behavior/source checks; full suite still red.
- [x] Actual Node22 CI matches local1610/1492/118 and all118 failure names.
- [ ] Install validated release gate after reconciliation.
- [ ] iPad .737 Focus launch and normal edit/Undo smoke; modeller unchanged.

## .738 Boolean scene-history owner fixtures

- [x] Actual Object/Group Boolean apply captures scene before hide/create and
  checkpoints it after result activation; one scene Undo/Redo restores all objects.
- [x] Geometry/facegroups, linked transforms/origin, group labels/collapse state,
  settings, reference locks, active ID and selection survive history restoration.
- [x] Ineligible/refused/returned creation failure preserves original visibility
  and both history stacks (including existing Redo).
- [x] Join capture listener uses the installed Object history bridge.
- [x] Full1623/1507/116, zero skips; no new failure identities versus .737.
- [x] .738 Node22 CI37303253624 independently matches1623/1507/116/0 and all116 failure names.
- [ ] .738 iPad launch/edit/Undo/Redo smoke; runtime modelling owners unchanged.

## .739 selection hub and Bevel lifecycle fixtures

- [x] Component selection starts at puck; actual controller handles transform/tools/
  close, selection change/loss/reselection and semantic completion return.
- [x] Object full gizmo/empty Multi and Face suspension/resume retain current owner.
- [x] Active sessions/Align hide gizmo; lost selection stays hidden after completion.
- [x] Edge Extrude close disarms existing owners and preserves selected edges.
- [x] Actual Bevel session closes on mode/mesh/object change; background defers while
  busy, Cancel preserves launch selection; Face invalid context cancels via owner.
- [x] Full1653/1544/109/0 skips; seven old failures resolve, no new identities.
- [x] .739 Node22CI37304998451 matches1653/1544/109/0 and all109 failure names;
  Pages37304998035success and live .739 shell byte-verified. No device PASS inferred.
- [ ] iPad .739 Focus; Face puck/gizmo/radial/tool Cancel; Edge Bevel exit→Pencil
  orbit, ordinary edit Undo/Redo. Runtime unchanged; no broad requalification.

## .740 contextual radial / Sweep routing fixtures

- [x] Actual corner callback opens tools in all modes; tools centre returns to
  component puck; same-selection suppression clears on selection change.
- [x] Generic target availability/active feedback, specialized session availability,
  locked-object guards and guided Edge Bridge exception execute current owner.
- [x] Actual Sweep semantic handlers accept Face/Edge; completion emits once with
  original mode; wrong modes/tools/unrelated end ignored; controls own visibility.
- [x] Full1669/1566/103/0; six old failures reconcile, no new failure identities.
- [x] .740 Node22CI37306258245 matches1669/1566/103/0 and all103 failure names;
  Pages37306257859success, live .740 version/shell byte-verified. Device PASS separate.
- [ ] .740 Focus/radial feedback; Face or Edge Sweep Cancel; Pencil navigation/edit
  Undo/Redo. Runtime unchanged; no broad device requalification.

## .741 scene OBJ round-trip reliability

- [x] Explicit g reset before first ungrouped face isolates prior-object group state.
- [x] CR/LF facegroup names cannot create extra OBJ geometry/object records.
- [x] Base/SubD/Mirror/plain multi-object round trips preserve evaluated geometry,
  winding/quads/groups/names; global indices valid; empty objects do not offset.
- [x] Sources unchanged; real facegroups retained, no synthetic object-name groups.
- [x] Full1679/1577/102/0, no new failures; one obsolete assertion reconciled.
- [x] .741 Node22CI37307745974 matches1679/1577/102/0 and all102 failure names;
  Pages37307745660success; live shell/version/5changed assets byte-verified.
- [ ] Export named grouped+ungrouped objects, reimport OBJ (Base and SubD), inspect
  separation/groups; normal GLB/NOM handoff remains usable.

- [x] Shell/integrity guard share the same refreshed Quick OBJ URL; changed parent
  pins and all five reviewed hashes verified. Final export-focused38PASS.


## v0.36.18.742 — negative Extrude side breakout / polygon preservation

- [x] Supplied four-band overlapping source reproduces despite old closed-health check.
- [x] Recovered pre-cut cage from actual source sidewall endpoints; original retained.
- [x] Finite prism subtraction removes side strips, preserves caps/volume/winding.
- [x] Rectangular band/inset/corner/rotated fixtures produce0triangles; boundary
  subdivisions retained for conformity, no arbitrary all-quad guarantee.
- [x] Full cuts remove caps/disarm; positive connected-miter route retained.
- [x] Actual Face preview/commit/cancel/replay/selection; one Undo/Redo; source,
  groups/creases/loose data and refusal redo stack retention covered.
- [x] Exact synthetic event path now uses press origin; smallnegative/positive/zero
  covered; physical Pencil8px modelling threshold preserved.
- [x] Accepted old corner/Loop/Knife Through source fixtures pass finite cutter.
- [x] Add actual splitter creates two children + crease inheritance; real Three
  boundary-line ray picking selects each child independently. User issue unconfirmed.
- [x] New27PASS, focused53PASS, full1706/1604PASS/102FAIL/0skip; no new failures.
- [x] Actual Node22CI37463033743/job112267082488 matches1706/1604/102/0
  and102failure names; Pages37463032493success; live shell/version/two changed
  modules/before+correctedOBJ/Beta6 version byte-verified.
- [ ] iPad four-band inward cut: side strips disappear, clean cage/no flicker.
- [ ] iPad shallow/full cut + Undo/Redo + negative Exact/Repeat + positive Extrude.
- [ ] iPad Add Vertex: exit Add, Edge mode, select both halves independently.

Use tests/fixtures/negative-extrude-742-before.obj or Undo the old extrusion first.
Already overlapping old output is not automatically repaired by this build.


## v0.36.18.743 — single Face negative-cut owner

- [x] User PASS .742 multiple-region cuts; single-face screenshot issue reproduced
  with both actual loaded handlers, not inferred from isolated-kernel tests.
- [x] Legacy takeover without ownership capability reproduces52triangles.
- [x] Explicit closed Extrude ownership prevents fallback planning/arming.
- [x] Actual window-before-document capture route, cancellation and event stopping.
- [x] Single shallow/deep/Through0tris, exact volume/caps, one Undo/Redo; Cancel
  preserves source/selection/redo; Multi unchanged; ownership tool/mesh scope.
- [x] Seven new tests and focused64PASS.
- [x] Full1713/1611PASS/102FAIL/0skip; same102 failure identities as .742.
- [x] Actual Node22CI37544260019/job112544354430 agrees counts/all102names;
  Pages37544259082success; live shell/version/3changed assets/Beta6 byte-verified.
- [ ] iPad one band shallow recess and full Through: no diagonal mesh fragments.
- [ ] Next single cut + Undo/Redo; two selected bands remain clean.

Undo old triangular cut or use negative-extrude-742-before.obj first.


## v0.36.18.744 — Bevel / Knife / Loop combinations

- [x] User PASS .743 stronger single/multiple negative Extrude.
- [x] Add Vertex explicitly deferred to watch list; no runtime fix claimed.
- [x] Bevel1/3segments→Loop1/3cuts at every seed: closed shell, unchanged volume.
- [x] Actual Knife release→Loop preserves existing subdivisions; reverse order.
- [x] Single/multiple Slide, History Undo/Redo; groups/creases; ordinary cube placement.
- [x] Coincident disconnected shells remain separate; no new triangulation.
- [x] Full1726/1624PASS/102FAIL/0skip, same102 failure identities as .743.
- [x] User PASS .744 Bevel/Knife/Loop combinations2026-10-07.
- [x] iPad Bevel an edge, then Loop nearby: no crack at the bevelled polygon.
- [x] Knife across a face, then single/multiple Loop and Slide nearby.
- [x] Undo/Redo each stage; selection/tool exit and navigation remain comfortable.
- [ ] Follow-up Bevel-after-Loop eligibility refusal and Bevel group provenance.

- [x] .744 Node22CI37552628205/job112571439435 matches counts/all102failures;
  Pages37552627347success; live shell/version/two changed modules/Beta6 verified.


## v0.36.18.745 — Bevel after Loop/Knife / facegroups

- [x] Mixed endpoint corner cap reused; all20Loop edges bevel1/3segments.
- [x] Knife release→Bevel; rounded perimeter shared profile avoids duplicate caps.
- [x] Full polygon normals; shared-edge winding including rotated/translated cages.
- [x] All6bevel engines keep source groups; uniform-generated groups/mixed null.
- [x] Actual Edge/Face preview Apply/Cancel/drag Cancel; one Undo/Redo with groups.
- [x] Failure/null/exception/third-owner rollback includes topology/groups/loose data.
- [x] Repeated Loop/Bevel/Knife history; bevelled OBJ groups round-trip.
- [x] Inset and shell share one bootstrap745 URL; refreshed import-only Face parent.
- [x]29newPASS, focused103PASS; full1755/1653/102/0, same102failure names as .744.
- [ ] iPad Loop-cut cube → Edge Bevel near a corner: chamfer then rounded profile.
- [ ] Knife → Face/Edge Bevel; facegroup colours/export retain sensible labels.
- [ ] Cancel preview, Undo/Redo repeated edits, return to selection/navigation.

- [x] .745 actual Node22CI37568114774/job112620395437 matches counts/all102names;
  Pages37568114308success, live shell/version/all13src/Beta6 bytes verified.


## v0.36.18.746 — uploaded bevelled cage / horizontal Loop

- [x] Exact31vert24face source retained; native edge0 refusal and partial paths found.
- [x] All13vertical seeds complete7face closed strips; no triangles/volume change.
- [x] Single3positions; multi2/3/8; level Slide; original vertices/groups/creases.
- [x] Actual715commit retains rail selection, one Undo/Redo; rotated source.
- [x] Nonplanar/open/vertex-hit fallback refuses unchanged; native cube unaffected.
- [x]15newPASS/focused63PASS/full1770/1668/102/0, same102failure identities.
- [x] User big PASS .746: original LOOP CUT.obj horizontal Loop at red-line height.
- [x] .746 user PASS: Slide/EXACT, repeat/multiple cuts; no crack/triangle fan.
- [x] .746 user PASS: Undo/Redo, selection and navigation.


### .746 publication verification

Runtime commit 48595c3d767dc99b34458b1c6c9793070d53a461 published. Actual Node22 CI run 37585236460, job 112673733525: 1770 tests, 1668 PASS, 102 FAIL, 0 skipped; all 102 failure names match the recorded baseline. Pages run 37585235717 succeeded. Live index, version, Drawer loader, Loop addon, original OBJ fixture and Beta6 version byte-match main. Focused 63 PASS; device .746 acceptance remains pending.


## 2026-10-07 — v0.36.18.747 supplied-cage combinations / Bevel winding guard

- User “big PASS” .746; Add Vertex remains deferred.
- All67eligible cage edges after polygon Loop bevel1/3segments cleanly; actual
  Knife on every quad and repeated Loop→Knife→Bevel→Loop preserve exact history.
- Existing watertight guard accepted injected reversed face with two edge owners.
  Check opposite shared-edge winding for initially closed oriented inputs; restore
  full mesh metadata and expose existing error on failure. No current engine defect
  claimed; open/already inconsistently oriented inputs retain prior routing.
-7newPASS/focused69PASS; full1777/1675PASS/102FAIL/0skip; same102identities.
- Guard only runtime edit; bootstrap/Inset/Face import-only cache chain747. Four
  reviewed hashes/pins; protected Loop715/main/Multi/frozen betas untouched.
- Publication verification pending; .747 device acceptance pending.

- [x] User PASS .747: supplied cage Loop → Knife → chamfer/rounded Bevel.
- [x] .747 user PASS: Cancel preview, Undo/Redo and nearby Loop.
- [x] .747 user PASS: selection/puck and navigation.


### .747 publication verification

Runtime fd498652f9339c3df639e8bb5ea276ebd980875f published. Actual Node22 CI37594432292/job112703460695:1777tests/1675PASS/102FAIL/0skip; all102failure names match baseline. Pages37594431221 success; live shell/version/guard/bootstrap/Inset/Face loader and frozenBeta6 version byte-match main. Focused69PASS. Device .747 acceptance pending.


## 2026-10-07 — v0.36.18.748 partial-chain Bevel through four-way vertices

- User PASS .747; Add Vertex remains deferred.
- Actual prior multi-chamfer rejects consecutive7/35 or7/35/42 on supplied loop
  cage. Existing engine extended to one open nonbranching strip chain, four-valence
  straight-through internal vertices and one-selected-edge endpoints.
- Directed local one-owner boundary rings supply complete end caps, preserving
  rounded subdivisions. Chamfer two triangular end caps are necessary geometry;
  rounded caps are polygons. Existing groups/creases/loose remapping retained.
- Four-way turns/branches remain safe refusal; complete loops retain dedicated
  engine. Early widening accidentally routed complete rings to connected engine;
  existing semantic tests caught it, fixed by explicit connected-open-chain gate.
-10newPASS/140partialpaths; focused120PASS; full1787/1685/102/0, same102identities.
- Multi-chamfer runtime only; bootstrap/Inset/Face import-only chain748, guard747;
  reviewed4hashes/pins; main/Loop715/Multi/frozen betas untouched.
- Node22/Pages verification and device .748 acceptance pending.

- [x] User PASS .748: partial2–3edge Loop chains Bevel1/3segments.
- [x] .748 user PASS: Cancel/Undo/Redo, Knife and nearby Loop.
- [x] .748 user PASS: complete-loop Bevel and selection/navigation.


### .748 publication verification

Runtime ac7ef2c96274dbd4a96a929c595f3fb0a7fad159 published. Actual Node22 CI37609372174/job112752603609:1787tests/1685PASS/102FAIL/0skip; all102failure names match baseline. Pages37609371712 success; live shell/version/multi-chamfer/bootstrap/Inset/Face loader and frozenBeta6 version byte-match main. Focused120PASS. Device .748 acceptance pending.


## 2026-10-07 — v0.36.18.749 Knife diagonal validity / transactional rollback

- User PASS .748; Add Vertex remains deferred.
- Actual prior Knife release on U-notched planar face creates exterior diagonal3/6,
  two faces and one history entry. Topology-only mesh splitter unchanged.
- Knife validates proposed chord in source plane: reject outside/vertex-hit/boundary
  sliver/nonplanar cuts, keep valid concave cuts. Source-relative projection/tolerance.
- Catch failures/exceptions with vertices/faces/groups/creases/loose restoration;
  invalid edge-snap splits retain source and redo. Actual gesture/snapping unchanged.
-10newPASS/focused89PASS; full1797/1695PASS/102FAIL/0skip, same102identities as748.
- Knife body only; shell/directKnife/recovery749, all other loaded pins retained;
  one reviewed hash. main/Loop715/Multi/frozen betas untouched.
- Publication/Node22/live verification and device .749 acceptance pending.

- [ ] .749 normal Knife after Loop/Bevel; valid strokes retain feel.
- [ ] Concave notched face: outside chord refuses, inside chord succeeds.
- [ ] Undo/Redo and selection/navigation remain accepted.


### .749 publication verification

Runtime df89e43581f82d325d9431b31e23191cacd3489b published. Actual Node22 CI37619318589/job112785293117:1797tests/1695PASS/102FAIL/0skip; all102failure names match baseline. Pages37619317487 success; live shell/version/Knife and frozenBeta6 version byte-match main. Focused89PASS. Device .749 acceptance pending.


## 2026-10-07 — v0.36.18.750 Bevel + Inset inward cuts on uploaded source

- User .748 screenshot/file BEVEL ISSUE.obj42verts36faces: selected inset7 planar,
  rounded caps30/31 warped~.06348. Existing finite target triangulation refuses
  every cut as nonplanar-input-face. Export header736 is not app build version.
- Exact untouched source retained in tests/fixtures/bevel-inset-750.obj.
- Finite cutter uses displayed first-vertex fan privately for warped targets;
  planar target handling unchanged. Uncut polygons retain points/fan anchor/groups.
- Rejoin accepted wall/cap pieces across complete reversed edges, preserve ambiguous
  unions; bounded optional coalescing256pieces. No flattening or wholesale triangles.
-15newPASS/focused81PASS; full1812/1710PASS/102FAIL/0skip, same102identities as749.
  Seven depths,zero triangles/closed,exact shallow prism volume, rotated source,
  groups, physical/Exact actual combined-owner history/Cancel covered.
- Selected warped source still refuses; legacyThrough path unchanged. No all-quad
  promise for arbitrary intersected warped surfaces or self-intersection detection.
- Kernel body only; Face import-only/kernel/shell750, all other pins retained;
  two reviewed hashes. main/Loop715/Multi/frozen betas untouched.
- Publication/Node22/live verification and device .750 acceptance pending.

- [x] User PASS .750: original Bevel/Inset source inward Exact/drag.
- [x] .750 user PASS: deeper/full cut, Cancel/Undo/Redo and positive Extrude.
- [ ] Bevel/Knife/Loop and selection/navigation retain accepted behavior.


### .750 publication verification

Runtime 4036c0fdf9c5cabc1173d68a3cf4281d7674b049 published. Actual Node22 CI37620905333/job112790634635:1812tests/1710PASS/102FAIL/0skip; all102failure names match baseline. Pages37620904201 success; live shell/version/kernel/Face loader/original OBJ fixture and frozenBeta6 version byte-match main. Focused81PASS. Device .750 acceptance pending.


## 2026-10-08 — v0.36.18.751 warped-target Through planning / ordered exits

- User PASS .750. Remaining legacy planner still rejects supplied Bevel/Inset
  object as nonplanar-input-face; target surface representation now shares750fan.
- Selected source remains strictly planar/convex. Warped-target buildThrough uses
  existing finite cutter at chosen ordered targetDepth + existing epsilon overshoot.
  Original planar legacy build preserved; no pointer/tool owner changes.
-8newPASS/focused78PASS; full1820/1718PASS/102FAIL/0skip, identical102identities.
  Source7 exactexit2; clean42faces/0tris; warped two-shell targets2/5 and first-only
  second shell untouched; rotation/scaling/volume, actual physical/Exact/history/
  selection clear and shallow cut compatibility covered.
- Kernel body only; Face import-only/kernel/shell751, retained other pins. Two
  reviewed hashes; main/Loop715/Multi/frozen betas untouched.
- Publication/Node22/live verification and device .751 acceptance pending.

- [x] User PASS .751: supplied object: shallow recess then full inward cut at shell exit.
- [x] User PASS .751: Cancel and Undo/Redo; selection clears when the cut passes through.
- [x] User PASS .751: ordinary cube Through and selection/navigation retain accepted feel.


### .751 publication verification

Runtime 5c3007ce3b9f5863dc924a12bce60c7b3946dc87 published. Node22 Topology run37697834551/job113053828900:1820tests/1718PASS/102FAIL/0skip; all102 failure names exactly match the local inventory and prior build. Pages run37697833503 succeeded. Live shell/version, Through kernel, Face direct, original source fixture and beta-6 version bytes match the tested checkout. Device .751 acceptance remains pending.


## v0.36.18.752 — Vertex Extrude scaffolding

- [x] User PASS .751 recorded; frozen betas/Loop715/Multi/main preserved.
- [x] New tips + loose edges on attached/boundary/loose/multi source vertices;
      existing faces, positions, groups, creases and source object retained.
- [x] Actual radial/drawer launch, original top-centre session, rendered picking,
      Free repeated pulls, signed XYZ Exact, last-vector Repeat and selected tips.
- [x] One successful pull = one Undo/Redo; cancelled/no-op/invalid preview retains redo.
- [x] Lock/changed mesh/object/mode, competing Build Edge, Escape/blur/capture cleanup.
- [x] Original Pencil background policy does not close a loose-tip Repeat tap;
      true background retains navigation and exits through existing session.
- [x] Closed scaffolding is eligible for original Create Face after existing Join.
- [x] 12 new PASS; focused88PASS/full1832/1730/102/0, same102failure identities.
- [x] User PASS .752: select vertex → radial Extrude → Free drag → drag selected tip again.
- [x] User PASS .752: XYZ signed Exact and Repeat ON tap another vertex; multi vertices create one edge each.
- [x] User PASS .752: Done → Join/Build Edge to close scaffold → original Create Face/Fill.
- [x] User PASS .752: Cancelled gesture, Undo/Redo, background exit and Pencil/finger navigation.


### .752 publication verification

Runtime 9be399909982719b9b7ecdf757bbf00c4695631f published. Actual Node22 Topology run37712338609/job113100902832:1832tests/1730PASS/102FAIL/0skip; all102failure names exactly match the local inventory. Pages37712337662 success; live shell/version/new Extrude core and owner/Vertex panel/gizmo/background policy and frozenBeta6 version byte-match the tested checkout. User PASS .752 on2026-10-08. Browser smoke attempt timed out; device acceptance is the user report.


## 2026-10-08 — v0.36.18.753 Vertex Bevel facegroup preservation

- User PASS .752 /nextbuild. Resume scoped Bevel/Knife/Loop reliability audit.
- Reproduced existing single/multi Vertex Bevel appending caps without group entries:
  grouped cube becomes7/8faces but retains only6labels; blue Apply also omitted groups.
- Repair existing kernels: source labels retained; cap inherits unanimous incident
  group, otherwise null, matching accepted Edge Bevel provenance. No geometry changes.
- Existing direct owner restores groups on preview Apply/repeated drag/Cancel and
  disarm; a changed facegroup invalidates old blue preview instead of overwriting it.
-16new behavioral PASS/focused82PASS; full1848/1746PASS/102FAIL/0skip; identical
  failure names to .752, all checks active. Real kernels/direct owner/history, single/
  adjacent/separate multi, mixed/uniform groups, creases/loose geometry, closed
  winding, Loop/Knife combinations and OBJ groups covered.
- Three runtime bodies changed; bootstrap/Inset/Face direct imports only repinned.
  Six reviewed hashes; required parent/recovery/shell753 pins. Through child751,
  Extrude752, protected main/Loop715/Multi/frozenbeta unchanged.
- Publication/actual Node22/live verification and .753 device acceptance pending.

- [x] User PASS .753: grouped model → Vertex Bevel Width preview → Apply retains groups.
- [x] User PASS .753: Multi Vertex Bevel, repeated Pencil Width drag and Cancel preserve source.
- [x] User PASS .753: Apply → Undo → Redo restores geometry/groups; ordinary Vertex Extrude still works.


### .753 publication verification

Runtime 0f11d92e7eb0655fac0c8b15ddd362278256c772 published. Actual Node22 Topology run37721519156/job113130013158:1848tests/1746PASS/102FAIL/0skip; all102failure names exactly match the local inventory and .752. Pages37721518051 succeeded. Live shell/version, all six changed runtime modules/loader parents, accepted Vertex Extrude owner and frozenBeta6 version byte-match the tested checkout. Focused82PASS; .753 device acceptance pending.


### .753 acceptance

User PASS .753 on2026-10-08: Vertex Bevel Apply/Cancel/multi drag/Undo/Redo and retained Vertex Extrude.


## 2026-10-08 — v0.36.18.754 Knife perspective EDGE accuracy

- User PASS .753 /nextbuild. Bevel/Knife/Loop audit reproduced Knife EDGE using a
  screen-space fraction as a world-edge fraction. Angled planar source worldt=.3
  resolves .2112676: .44366model units /42.88066screen pixels from shown marker.
- Existing freeBoundaryPoint now converts with camera clip weights before world
  interpolation. Orthographic weights1 preserve old result; END/MID/PERP priority,
  distances, release hysteresis, gestures, topology splitter/history unchanged.
-16new behavioral tests: before11FAIL/5PASS, after16PASS; focused88PASS.
  Full Node24:1864/1762PASS/102FAIL/0skip, same102failure identities as .753.
  Actual whole-owner camera/raycast/Pencil cut, reversed edges, rotations/transforms,
  .01/1/100scale, viewport offsets, groups/creases, Cancel/redo, exact Undo/Redo,
  Bevel1/3→Knife→supported Loop closed shells covered. No blanket exclusions.
- Runtime body only Knife; one reviewed hash and shell/recovery/Knife754 pins.
  Face/bootstrap/VertexBevel753, Extrude752, Through751 retained. Protected main,
  Loop715/Multi/frozen betas untouched. No near-plane clipping implementation;
  EDGE conversion refuses nonfinite or nonpositive clip weights.
- Publication/actual Node22/live verification and .754 device acceptance pending.

- [ ] .754 iPad: angled perspective face, Knife arbitrary EDGE→EDGE endpoints follow markers.
- [ ] Inference ON retains END/MID/PERP snapping; ordinary cube Knife still feels familiar.
- [ ] Bevel→Knife→supported Loop; Undo/Redo restores each operation.
