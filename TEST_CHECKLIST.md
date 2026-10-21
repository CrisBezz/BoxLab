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

- [x] User PASS .754: angled perspective face, Knife arbitrary EDGE→EDGE endpoints follow markers.
- [x] User PASS .754: Inference ON retains END/MID/PERP snapping; ordinary cube Knife still feels familiar.
- [x] User PASS .754: Bevel→Knife→supported Loop; Undo/Redo restores each operation.


### .754 publication verification

Runtime 5a7f6d585a72f076fe9d80f1bb05fd6a3b269915 published. Actual Node22 Topology run37725898931/job113143857359:1864tests/1762PASS/102FAIL/0skip; all102failure names match local inventory and .753 exactly. Pages37725898285 succeeded after a delayed deployment step; live shell/version/Knife, accepted Vertex Extrude and frozenBeta6 version byte-match the tested checkout. Focused88PASS. .754 device acceptance pending.


### .754 acceptance — 2026-10-08

User PASS .754: perspective Knife EDGE placement, END/MID/PERP, Bevel→Knife→Loop and Undo/Redo. No new runtime changes or build started.


## 2026-10-08 — v0.36.18.755 Knife gesture context / cancellation

- User PASS .754 /nextbuild. Actual Pencil reproduction: start on cube1, swap
  active mesh/object to cube2 before release; cube1 stays6faces, cube2 becomes7,
  history1. Knife had no starting mesh/object/lock guard and cancel leaked capture.
- Existing owner stores starting mesh/activeId, checks Face mode/unlocked state
  before starting, previewing and committing. Changed context disarms semantically
  without cutting/history; locked Knife arming refuses. No parallel input owner.
- One cancellation helper retires drag before releasing capture and removing markers;
  used by Done/exclusive/context, pointercancel/lostcapture and Escape/blur.
  Ordinary pointercancel/lostcapture keep Knife armed for another cut; terminal
  exits emit existing boxlab-knife-disarmed for original session close.
-17new whole-owner behavioral tests: before16FAIL/1PASS, after17PASS; focused105PASS.
  Full Node24:1881/1779PASS/102FAIL/0skip, same102names as754. Real camera/raycast/
  Pencil moves/releases, changed mesh/object/lock/mode at move and up, marker/capture
  cleanup, repeat/Undo/Redo/redo retention and existing Bevel/Knife/Loop covered.
- Two historical prepared-endpoint release fixtures now supply actual starting
  mesh/object context; no guard bypass or weakened assertions. Screen harness
  records real semantic events/capture/markers. Protected/frozen diff clean.
- Runtime body only Knife; one reviewed hash and required recovery/shell/Knife755.
  .754 perspective conversion/snap priorities, topology splitter and Loop untouched.
  Same-instance in-place geometry edits are not fingerprinted by this context guard;
  existing tool-exclusive events still own their cancellation.
- Publication/actual Node22/live verification and .755 device acceptance pending.

- [x] User PASS .755: two ordinary Knife cuts remain armed; each Undo/Redo restores one cut.
- [x] User PASS .755: Done or switch modelling mode/tool → ordinary navigation, no stuck capture/markers.
- [x] User PASS .755: Locked object refuses Knife; unlock and launch again permits the ordinary cut.


### .755 publication verification

Runtime cb28427114df517083239ef07b31e3abc4cac9d9 published. Actual Node22 Topology run37737755836/job113181100425:1881tests/1779PASS/102FAIL/0skip; all102failure names exactly match the local inventory and .754. Pages37737755773 succeeded. Live shell/version/Knife, accepted Vertex Extrude and frozenBeta6 version byte-match the tested checkout. Focused105PASS; .755 device acceptance pending.


### .755 acceptance — 2026-10-08

User PASS .755: repeated Knife/history, Done/tool/mode/navigation and locked-object refusal.


## 2026-10-08 — v0.36.18.756 Bevel preview facegroup validity

- User PASS .755 /nextbuild. Reproduced Face Bevel staged source Original labels,
  then external Reassigned label: Apply accepts and restores Original into live
  geometry and Undo. Edge blue preview likewise ignores label changes, although
  Edge exact already recomputes from current mesh rather than restoring old groups.
- Existing shared sourceUnchanged now compares effective label for every real face.
  Changed/deleted labels invalidate stale Face/Edge preview/Apply; Cancel retains
  current source and redo. Fresh relaunch uses current provenance/history.
- Missing legacy labels equal explicit null. Initial strict array-length comparison
  rejected the existing disconnected unlabelled-shell preview fixture; corrected to
  per-face semantic comparison, without editing/weakening that rendering test.
  Extra entries without a corresponding real face are not part of this comparison.
-15new tests: before9FAIL/6PASS, after15PASS; focused121PASS. Full Node24:
  1896/1794PASS/102FAIL/0skip; same102failure identities as755. Actual shared owner/
  session/history, reassignment/removal/truncation, Cancel/redo, fresh Apply/Undo/Redo,
  array replacement with same values, legacy unlabelled previews, Face Bevel→Knife→
  supported Loop closed shells/current labels covered. No blanket exclusions.
- Runtime body only shared Bevel validation; geometry/gestures/history algorithms
  unchanged. One reviewed hash; required shell/recovery/direct-Bevel756 pins.
  Knife755/VertexBevel753/Extrude752/Through751/protected main/Loop715/Multi/frozen
  betas retained. Publication/actual Node22/live verification and device756 pending.

- [ ] .756 iPad: grouped Face Bevel Width/Segments preview → Cancel retains source labels.
- [ ] Face and Edge Bevel Apply → Undo → Redo retains expected geometry/groups.
- [ ] Normal Knife and supported Loop after Bevel retain accepted feel.


### .756 publication verification — 2026-10-08

Runtime d1832204c878212a4254701c8996171e446215a3 published. Actual Node22 Topology run37750469278/job113222151677:1896tests/1794PASS/102FAIL/0skip; all102failure names exactly match the local inventory and .755. Pages37750468365 succeeded. Live shell/version/direct Bevel, accepted Knife and frozenBeta6 version byte-match the tested checkout. Focused121PASS; .756 device acceptance pending.


## 2026-10-08 — .756 acceptance / .757 Vertex Extrude axis chooser

User PASS .756.

User PASS .756; explicitly requests Vertex Extrude method match Edge Extrude's
viewport axis chooser, avoiding old drawer XYZ controls.

Audit: Vertex Extrude already owns Free/XYZ drag and exact vectors with a contextual
panel. Its session unconditionally hid the gizmo. Edge Extrude already uses the
expanded Move arrows/centre as constraint controls, offset beside selected geometry.
Reuse that existing presentation and handle owner for Vertex Extrude. XYZ arrows
select world axis; centre selects Free, without arming Move or moving geometry.
Original Vertex Extrude pointer/kernel/history/Repeat/Exact owners unchanged.
Original top-centre Exact/Repeat/Done and optional local direction buttons remain.
Chooser survives new-tip selection, highlights current direction, shows Free/axis
badge, hides Rotate/Scale/plane handles and retires on session exit. During live
pulls axis changes refuse. Closing hub discards preview through existing owner.
Edge remains XYZ / Plane perpendicular to edge; not changed to Vertex Free semantics.

10 new behavioral checks cover actual gizmo sync/handle/visual/session functions,
existing Vertex owner real Pencil pull, signed direction/exact/history and Edge
constraint event. Focused52PASS. Full Node24:1906tests/1804PASS/102FAIL/0skip;
all102failure names identical to .756, no exclusions. An extracted Object hub test
now loads the new predicate together with setHubState; assertions unchanged.
Syntax and whitespace checks pass. Two runtime bodies only: total-gizmo and
Vertex session explanatory text/version. Original geometry owner unchanged.
Reviewed two hashes and shell/recovery/two module757 keys. Bevel756/Knife755/
Extrude752/core/protected main/Loop715/Multi/frozen betas unchanged.
Publication/actual Node22/live verification pending. Device .757 acceptance pending.

Manual checks:
- Vertex → Extrude: viewport arrows appear beside selection. Tap X/Y/Z then pull;
  tap centre Free and pull diagonally. Axis choice alone does not move the vertex.
- Extrude another selected tip; Exact and Repeat still work. Undo/Redo each pull.
- Done/background returns selection to puck and navigation; Edge Extrude unchanged.


### .757 publication verification — 2026-10-08

Runtime 98ed74d9df3b09aa97856b38ef271a429a36a6bb published. Actual Node22 Topology run37753453091/job113232091538:1906tests/1804PASS/102FAIL/0skip; all102failure names exactly match local inventory and .756. Pages37753452518 succeeded. Live version/shell/total-gizmo/Vertex session, unchanged Vertex Extrude and frozenBeta6 version byte-match the tested checkout. Focused52PASS. Device .757 acceptance pending.


## 2026-10-08 — .758 radial UI refinement

User requests hiding old Vertex Extrude Free/XYZ buttons, moving Vertex Extrude
into shared Face/Edge location and normalizing Face outer ring after Align removal.
Existing owners audited: presentation only, no pointer/kernel/history changes.
Vertex panel direction row remains hidden; viewport arrows/Free centre are sole
visible direction chooser. Exact/Repeat/Done retained.
Extrude inner0°/12-o'clock across Face/Edge/Vertex. Add moves to former Vertex
Extrude outer216° slot; all14Vertex tools remain. Bevel90° unchanged.
Face15outer tools spread evenly at24° intervals, clockwise order retained and
Circle0° anchored. Align remains on gizmo. Shared Join Coplanar Edge24°, Vertex
Clean Vertices288°/Merge Dist312° match Face slots; other shared slots retained.
Existing cross-mode placement assertion caught that Face-only spacing would break
shared outer positions; coordinated those three controls rather than weakening it.
58focusedPASS; fullNode24:1906tests/1804PASS/102FAIL/0skip, identical102failure
identities to757. Existing inventory/spacing/hidden-controls assertions extended;
no new duplicate implementation/tests. Computed outer-button bounds do not overlap
in Face/Edge/Vertex. Original inner geometry retained. Syntax/whitespace pass.
Two reviewed runtime hashes and shell/recovery/total-gizmo/Vertex-panel758 pins.
Original VertexExtrude752/core, main732/Loop715/Multi1.0 and frozenbetas unchanged.
Publication/Node22/live verification pending. Device .758 acceptance pending.

Manual checks:
- Vertex Extrude: only viewport axes/Free centre; Exact/Repeat/Done still present.
- Extrude at12-o'clock in Face/Edge/Vertex; Vertex Add accessible on outer ring.
- Face outer ring evenly spaced, all tools reachable; Bevel remains3-o'clock.


### .758 publication verification — 2026-10-08

Runtime39a699296bcf990cadecb7621f7f5c4c9970c61b published. Actual Node22 Topology run37754720314/job113236320113:1906tests/1804PASS/102FAIL/0skip; all102failure names exactly match local inventory and .757. Pages37754719444 succeeded. Live shell/version/total-gizmo/Vertex panel, unchanged Vertex Extrude and frozenBeta6 version byte-match tested checkout. Focused58PASS. Device .758 acceptance pending.


## 2026-10-08 — .759 full Vertex / Edge Extrude UI parity

User rejects remaining UI/UX difference. Audit found Vertex top-centre Distance/
Apply Exact/Repeat/Done versus Edge chooser-only. .757/.758 aligned chooser/slots,
not full interface. Use Vertex interface as standard for both via SAME panel DOM,
styles, controls and lifecycle. No cloned panel or parallel extrusion kernel.
Existing Vertex settings owner accepts mode-specific Extrude adapter; other Vertex
sessions stay intact. Edge gets signed Exact/last-vector Repeat through its existing
boundary ribbon builder/private candidate validation/history. Exact applies chosen
axis (perpendicular projection for Edge) or last pull/view-up projected for Plane.
Repeat ON taps a boundary edge, same vector, new outer rail selected, one Undo.
Old direction rows and transform-strip settings hidden during both Extrude sessions.
Shared viewport XYZ arrows/Free centre; Edge centre labelled Free perpendicular
rather than Plane, preserving accepted perpendicular ribbon geometry. Vertex remains
view-plane Free. Same12-o’clock launch, offset chooser, popup and Done→puck/history.
Edge pointer owner retains direct pulls; context/cancel/capture protection, popup
click exemption and semantic completion added so shared controls cannot terminate
or compete with its session. Existing exclusive tool handoff preserves new owner.
Background policy uses Edge rendered hit ownership, protects Repeat from semantic
background delivery and closes Edge shared panel. No new raw background handler.
Edge restore includes facegroups; new ribbon labels explicitly null so committed
state and History clone agree. Source labels/creases retained; no provenance claim
for new ribbons beyond null. Extrusion geometry core unchanged.

10new behavioralPASS, focused62PASS. FullNode24:1916tests/1814PASS/102FAIL/0skip;
all102failure names identical to758. Actual shared DOM/controls, drawer/radial,
Pencil drag, Exact negative/refusal/history, Repeat, panel click capture, source
metadata/private validator failure, context/lock/Escape/background, Done→actual
puck owner tested. Existing Vertex/Edge/radial/background/release suites included.
Four reviewed runtime hashes/pins: Edge owner, shared panel, total-gizmo, background
policy; shell/recovery759. Vertex owner/core752, Edge geometry426, protected main/
Loop715/Multi and frozenbetas unchanged. Syntax/whitespace verified.
Publication/actualNode22/live verification pending; .759 device acceptance pending.

Manual checks:
- Compare Vertex and boundary/loose Edge Extrude: same axis chooser and top panel,
  Distance/Apply Exact/Repeat/Done; no old XYZ/Move controls.
- In each mode choose axis, pull; enter signed Exact, Repeat ON tap another source,
  then Undo/Redo. New tips/outer rails remain selected.
- Done/background restores puck and navigation; repeat next launch. Edge Free
  remains perpendicular to edge; Vertex Free follows view plane.


### .759 publication verification — 2026-10-08

Runtimeb2b5752804be956489e5f007d2f4859331fa1a9b published. Actual Node22 Topology run37757723383/job113246285445:1916tests/1814PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .758. Pages37757723210 succeeded. Live shell/version/all four changed runtime modules, unchanged Vertex Extrude and frozenBeta6 version byte-match tested checkout. Focused62PASS. Device .759 acceptance pending.


## .760 floating Edge selection regression

- [x] .759 user PASS recorded; accepted Extrude/radial UI retained
- [x] Seven new automated checks reproduce six baseline failures and pass after repair
- [x] Floating Edge tap survives window release without semantic background clear
- [x] Multi Edge Paint claims pending/active drag before Orbit
- [x] Held horizontal/vertical browser state receives moves without Orbit (state stub)
- [x] Visible Lasso selects no-body and foreground rails, rejects nearer occluders;
      Through retains hidden-edge selection; stationary Edge tap stays selected
- [x] Genuine background Pencil and finger Orbit forwarding preserved
- [x] Focused69PASS; full1923/1821PASS/102FAIL/0skip; exact759 failure identities
- [ ] iPad floating Edge tap persistence and Multi horizontal/vertical hold gestures
- [ ] iPad Visible Lasso floating rails, including foreground rails over another body
- [ ] Finger navigation and empty-background Pencil orbit still work
- [x] Pages publication and live760 shell/loader/module bytes verified


### .760 publication verification — 2026-10-08

Runtime a85585c2a0c6ce42b74d808ed939660ebd257d34 published. Actual Node22 Topology run37766273730/job113274606897:1923tests/1821PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .759. Pages37766272406 succeeded. Live shell/version/Gate/Lasso/Drawer, accepted Edge Extrude and frozenBeta6 version byte-match tested checkout. Focused69PASS. Device .760 acceptance pending.


## .761 floating scaffold hold / Fill Face

- [x] Ten new behavioral checks pass; .760 actual hold-to-Close-Face fault reproduced
- [x] Branched wire cube/grid return individual planar closed cells through loose seed
- [x] Subdivided rails, tails, rotated/scaled geometry covered; open/warped/crossing refused
- [x] Actual hold timer, horizontal browse, window release and Pencil gate retain outline
- [x] Original Fill creates one face, one history entry, Undo/Redo; cancel restores base
- [x] Actual Grow owner still receives vertical scrub; surfaced candidates exactly unchanged
- [x] Focused79PASS; full1933/1831PASS/102FAIL/0skip, exact .760 failure identities
- [x] iPad floating hold -> sideways browse -> release -> Fill Face -> Undo/Redo (.761 user PASS)
- [ ] Surface loops plus floating tap/Lasso and finger/empty-background navigation
- [x] Pages/live shell/main/new helper bytes verified


### .761 publication verification — 2026-10-08

Runtime8d4d0d51af2b09908863ab9e47b88d96fdfe2a70 published. Actual Node22 Topology run37770573916/job113288865380:1933tests/1831PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .760. Pages37770573883 succeeded. Live shell/version/main/scaffold helper, unchanged Pencil gate/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused79PASS. Device .761 acceptance pending.


## .762 Edge vertical selection release

- [x] .761 user PASS recorded; accepted closed scaffold outlines preserved
- [x] Actual main .761 reproduces Grow/Shrink/neutral release failures (9PASS/3FAIL)
- [x] Current12PASS: actual hold/move/window release preserves Grow preview on wire/surface
- [x] Shrink-to-empty and neutral return survive release; cancel restores pre-hold selection
- [x] Vertical completion retires horizontal cycle without new history
- [x] Existing sideways browser/Fill Face/Undo/Redo tests retained
- [x] Focused81PASS; full1935/1833PASS/102FAIL/0skip, exact .761 failure identities
- [x] iPad UP/DOWN preview retained after release; neutral return and sideways browser (.762 user PASS)
- [x] Pages/live shell/main bytes verified


### .762 publication verification — 2026-10-08

Runtimec3bf95c4173341917fe203527178bd9cd24c2a79 published. Actual Node22 Topology run37771704243/job113292612101:1935tests/1833PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .761. Pages37771703594 succeeded. Live shell/version/main and unchanged scaffold helper/Pencil gate/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused81PASS. Device .762 acceptance pending.


## .763 Knife same-mesh source validity

- [x] .762 user PASS recorded; original gesture/Fill Face releases retained
- [x] Whole-owner source edit tests reproduce12FAIL/1PASS on old Knife
- [x] New13PASS: coordinate/count/winding/topology changes cancel before endpoint work
- [x] Newer source/history/redo/capture/markers preserved; no stale rollback
- [x] Identical-value array replacements and latest metadata permit normal cut
- [x] Legacy injected drags capture source via actual owner helper; assertions intact
- [x] Focused156PASS; full1948/1846PASS/102FAIL/0skip, exact .762 failure identities
- [ ] iPad Bevel → two Knife cuts → supported Loop/Slide → Undo/Redo → Done/navigation
- [x] Pages/live shell/Knife bytes verified


### .763 publication verification — 2026-10-08

Runtime4b4f909d8ed2b1c0fda3174f07c6b53860a362ed published. Actual Node22 Topology run37772536234/job113295375073:1948tests/1846PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .762. Pages37772535751 succeeded. Live shell/version/Knife and unchanged main/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused156PASS. Device .763 acceptance pending.


## v0.36.18.764 — direct Edge Bevel drag ownership

- [x] User .763 PASS;24 new controller checks and153focusedPASS. Full1972/1870PASS/102FAIL/0skip, exact .763 failures. No exclusions.
- [x] Newer coordinate/topology/groups/creases/loose edits survive move/release/cancel/disarm; changed mesh/object/mode/lock refuses stale commit. Owned preview rollback, capture/control release, equal arrays and repeated history covered.
- [x] Visible .764: Edge Bevel repeated Pencil drags and Width/Segments Exact work; Undo/Redo restores each result.
- [x] Cancel/Done during Edge Bevel restores only its own preview; switching mode/object or locking cannot commit stale geometry; navigation resumes.
- [x] Face/Vertex blue Bevel Apply/Cancel and Bevel→Knife→Loop still work; accepted floating scaffold selection/Fill Face preserved.


### .764 publication verification — 2026-10-08

Runtime b7bc824eaafb8b9cc109d27cb980b61946d1cf35 published. Actual Node22 Topology run37849650856/job113559106858:1972tests/1870PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .763. Pages37849650385 succeeded. Live shell/version/direct-Bevel and unchanged main/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused153PASS. Device .764 acceptance pending.


## v0.36.18.765 — additive Edge hold regression contracts

- [x] User .764 PASS recorded2026-10-09. Exactly four obsolete candidate-only expectations replaced with semantic fixed-base/candidate/probe/perimeter checks; other35 assertions retained.
- [x] Existing12 scaffold/vertical-release assertions retained through shared original fixture; real owner blocks/selectors/raycast, controlled down adapter documented.
- [x] Four deliberate bad-source mutations caught; original source byte-restored. Focused102PASS/full1972/1874PASS/98FAIL/0skip; no new failure names, exclusions or skips.
- [ ] Visible .765: with an existing Edge selection, hold another edge and browse sideways; prior selection survives and old previews do not pile up.
- [ ] Cancel restores prior selection; UP/DOWN Grow/Shrink keeps its result after release.
- [ ] Floating scaffold outline → Fill Face → Undo/Redo works; navigation resumes.


### .765 publication verification — 2026-10-09

Runtime201d8c4aa2bc24006542d4ad69df37e6781dfa6d published. ActualNode22 Topology run37862651977/job113601797169:1972tests/1874PASS/98FAIL/0skip; all98failure names exactly match local inventory. Exactly four reviewed .764 failures resolved, no new failures. Pages37862651054 succeeded. Live shell/version and unchanged main/direct-Bevel/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused102PASS. Device .765 sanity pending.


## v0.36.18.766 — Edge selection paint versus Orbit

- [x] User .765 PASS with remaining Edge selection drag→Orbit report; no blanket gesture PASS inferred.
- [x] Actual gate/paint baseline14/8PASS/6FAIL; repaired14PASS. Seven new cases; original seven .760 assertions unchanged. Pending/active body-backed rails, horizontal/vertical and surfaced boundary cancellation covered.
- [x] Existing actual scaffold/vertical-release/selection/Extrude and shell checks92PASS. Full1979/1881PASS/98FAIL/0skip; exact .765 failures, no exclusions. Navigation with no paint claim retained.
- [x] Visible .766: Multi Edge Pencil drag across edges over a body and floating rails keeps selection ownership; try quick movement and a small move followed by a longer drag.
- [x] Edge hold → sideways candidates and UP/DOWN Grow/Shrink retain results on release; floating Fill Face still works.
- [x] Pencil background Orbit and finger Orbit/pan/pinch still work, keeping selections; no stuck controls after selection drag/cancel.


### .766 publication verification — 2026-10-09

Runtimeb4d3270032543270603c5512ea205b883f0c8cca published. ActualNode22 Topology run37863375359/job113604189509:1979tests/1881PASS/98FAIL/0skip; all98failure names exactly match local inventory and .765. Pages37863374755 succeeded. Live shell/version/updated Pencil Orbit gate and unchanged main/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused92PASS. Device .766 acceptance pending.


## v0.36.18.767 — Vertex Bevel live-drag ownership

- [x] User .766 PASS recorded2026-10-09; accepted body-backed/floating Edge selection and navigation retained.
- [x] Initial25-case actual-owner baseline2PASS/23FAIL; new28PASS. Geometry/metadata/loose/context preservation, owned rollback, exact Undo/Redo, capture cleanup, equal arrays and start/no-op guards covered.
- [x] Focused156PASS; full2007/1909PASS/98FAIL/0skip, exact .766 failures. No exclusions/skips or gate. Accepted .753 blue previews/provenance and Bevel→Knife→Loop preserved.
- [x] Visible .767: single/multi Vertex Bevel Pencil drags still commit once; Undo/Redo restores source/result.
- [x] Blue Width preview → Apply and Cancel still work; cancel a drag/session and resume selection/navigation cleanly.
- [x] Vertex Bevel followed by supported Knife/Loop still works; .766 Edge drag-selection stays protected.


### .767 publication verification — 2026-10-09

Runtime85bc2cd65bf1f99f18a2ce823db7d62efd5859c8 published. ActualNode22 Topology run37863984676/job113606195654:2007tests/1909PASS/98FAIL/0skip; all98failure names exactly match local inventory and .766. Pages37863983873 succeeded. Live shell/version/updated direct Vertex Bevel and unchanged accepted Pencil Orbit gate/Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused156PASS. Device .767 acceptance pending.


## v0.36.18.768 — Pencil/Orbit validation reconciliation

- [x] User .767 PASS recorded2026-10-09.
- [x] Five obsolete checks replaced; other43 historical and14 floating/body-backed Edge assertions retained. Four intentional routing mutations caught by behavioral replacements; runtime restored.
- [x] Focused107PASS; full2007/1914PASS/93FAIL/0skip. Exactly five reviewed failures removed; no new failures or exclusions. All modelling pins/hashes unchanged.
- [x] Visible .768: Edge Multi tap/drag/hold and scaffold Fill Face stay reliable over background and bodies.
- [x] Pencil background navigation and selection recover after release/cancel; active tools keep ownership.
- [x] Vertex Bevel/Undo/Redo and shared Extrude axis chooser remain as accepted.


### .768 publication verification — 2026-10-09

Runtimed77866b4d110eb569de247a9b318e474203f9ab2 published. ActualNode22 Topology run37865322509/job113610547339:2007tests/1914PASS/93FAIL/0skip; all93failure names exactly match local inventory. Exactly five reviewed .767 failures resolved; no new failure identities. Pages37865321691 succeeded. Live shell/version and unchanged Pencil Orbit gate/Vertex Bevel/Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused107PASS. User .767 PASS recorded; device .768 sanity pending.


## v0.36.18.769 — Face Bevel session ownership

- [x] User .768 PASS recorded2026-10-09. Fill Face is the scaffold-cap action, reusing #fillFaceBtn.
- [x] Initial15-case baseline6PASS/9FAIL;19 current owner/panel/kernel cases pass. Active-object change with same mesh refuses stale preview/Apply/press; drag terminals/panel sync clean capture/controls/ghosts. Cancel preserves newer Face IDs and mesh/context/history.
- [x] Focused231PASS; full2026/1933PASS/93FAIL/0skip with exact .768 failures. Bevel kernel/Edge repeat and all unrelated pins unchanged; no exclusions/skips.
- [x] Visible .769: single/connected multi-Face Bevel Pencil and Width preview → Apply commits once; Undo/Redo restores source/result.
- [x] Face Bevel Cancel leaves original mesh/selection; a fresh Face selection can launch Bevel again and navigation resumes.
- [x] Edge/Vertex Bevel and subsequent supported Knife/Loop work as accepted.


### .769 publication verification — 2026-10-09

Runtime7f0469d5eb8874db98d5ba795237dd986b43db14 published. ActualNode22 Topology run37893155389/job113698392066:2026tests/1933PASS/93FAIL/0skip; all93failure names exactly match local inventory and .768. Pages37893154964 succeeded. Live shell/version/updated direct Bevel and unchanged Vertex Bevel/Pencil Orbit gate/frozenBeta6 version byte-match tested checkout. Focused231PASS. User .768 PASS recorded; device .769 Face Bevel sanity pending.


## v0.36.18.770 — Face background / Orbit registration checks

- [x] User .769 PASS recorded2026-10-09.
- [x] Exactly four obsolete checks replaced; other21 historical checks and existing negative-cut assertions retained. Whole owners/real kernels; DOM/picking/Orbit callbacks remain controlled doubles, not browser proof.
- [x] Five deliberate source mutations caught by behavioral replacements; runtime source restored byte-for-byte. Focused168PASS/full2026/1937PASS/89FAIL/0skip, four reviewed failures removed/no new failures/no exclusions. All modelling pins/hashes unchanged.
- [ ] Visible .770: Face Extrude/Inset background Pencil exit and subsequent navigation remain as accepted.
- [ ] Face/Edge selection and Face Bevel Apply/Cancel/Undo/Redo remain as accepted.

### .770 publication verification — 2026-10-09

Runtime499e377a3a8889a5f4d03b450b9355396eb29ff3 published. ActualNode22 Topology run37901813205/job113725877011:2026tests/1937PASS/89FAIL/0skip; all89failure names exactly match local inventory. Exactly four reviewed .769 failures removed, no new failures. Pages37901812074 succeeded. Live shell/version and unchanged Face direct/Pencil Orbit gate/direct Bevel/frozenBeta6 version byte-match tested checkout. Focused168PASS. User .769 PASS recorded; device .770 light sanity pending.


## .771 — Add+ density and extruded Text (device acceptance pending)

- Object Add+ → each primitive: X/Y sliders both change face count; try asymmetric
  Cube7/3 (102 faces), Plane4/3 (12 faces), Cylinder/Cone height bands, Sphere/Torus.
  Presets change detail; Apply makes one object. Verify shapes/normals and selected
  object's gizmo work. Defaults retain ordinary Cube/Plane and curved primitives.
- Add+ → Text: type BOX, set thickness0.4, Apply. All letters should be one Object
  selection/transform. Inspect B/O holes from front and behind; thickness visible
  from side. Try Hello and i j for separated letters/dots, and X/Y detail controls.
- Cancel text or primitive settings (also outside tap) adds nothing; blank word,
  unsupported glyph or invalid thickness disables Apply with explanation. Closing
  during font load must not add an object later. Font is bundled; device loading
  and keyboard/touch popup layout need checking.
- Undo once removes the newly added primitive or Text; Redo restores exact object,
  word mesh/density/thickness and selection. Cancel must preserve existing redo.
- Existing Add+ Revolve Profile/Sweep still launch original sessions. Ordinary
  one-finger Orbit, two-finger pan/pinch and Pencil selection remain unaffected.

Automated:23 new cases, focused55PASS; fullNode24 2049/1960PASS/89FAIL/0skip,
exact .770 failure identities. Additional actual-DOM/shared-layout/history smoke
passes; controlled DOM/manager owner tests and real geometry are not whole-app
WebGL/touch evidence. Local Chromium unavailable, installation failed; visual/iPad
acceptance pending. No frozenBeta or protected modelling/gesture edits.

.771 deployment verified: runtimeba54fd977437696266f6cc1b9ac890beb4b47ba6,
Node22 CI2049/1960PASS/89FAIL/0skip with exact local failure identities; Pages
37907016763 success. Live shell/version/AddUI/factory/Text/font/Beta6 markers
byte-match tested source. Device acceptance remains pending.


## .772 — Join Coplanar loader contract — 2026-10-09

Validation-only build from main51e4937e2e68867d770aa9e50feea75952a5b71f.
Audited original Join placement/kernel and current Drawer import. Historical .507
check incorrectly inspected face-workflow-layout, which no longer imports Join.
Point only that loading assertion at authoritative drawer-ui; retain its row3
placement assertion and all other eight .507 layout checks. Missing-import and
stale-pin mutations of an in-memory loader string both reject; runtime unchanged.
64 focused Add/Text, Face Bevel, Knife and layout checks PASS. Full Node24:
2049tests/1961PASS/88FAIL/0skip, exactly one reviewed failure removed and no new
failure identities against fresh .7712049/1960/89. No exclusions or CI gate.
Only shell/recovery pins772 and their two reviewed fixture URLs change; every
runtime source/hash, Add/Text771, protected Multi1.0/Loop715/frozenBeta2–6 retained.
Publication/Node22/live verification pending. .771 device acceptance remains pending
in repository; no inferred PASS. Next scoped modelling reliability and remaining88
checks. No new feature qualification needed: optional Join/Undo/Redo sanity only.


### .772 publication verification — 2026-10-09

Published commit ee789b3f9b660233d2fbb01f828fd3d6b8a1560f, tree253def3b3e470929c3ea42a43f910d945ed4f36c exactly matches tested checkout.
Node22 Topology37932246644/job113825549904:2049tests/1961PASS/88FAIL/0skip;
all88 failure names match local inventory. Pages37932245305 success. 64 focused
owner/layout checks plus5 release-contract checks PASS (69 total). Unchanged
AddUI/Join/Beta6 live bytes verified; live shell/version also byte-match .772.


## .773 — Gizmo asset and hit-proxy validation — 2026-10-09

User .772 PASS recorded. Parent main a9a557ef (verified origin/main).
Audit found two historical .570 expectations superseded by accepted Gizmo:
original comment stamp570 versus current595 comment, and literal strokeWidth16
versus current per-handle inline widths. Replace exactly these checks: reviewed
loader/hash for asset identity; execute actual proxy-construction block in vm with
explicit DOM/event doubles. Preserve other13 original checks. Verify all five
stroke-handle kinds, proxy insertion/class/transparent fill/stroke, visual links,
hover enter/leave and same-event/receiver forwarding. Selector excludes centre and
plane handles. Current CSS important override sets effective16px; fixture documents
this and does not claim variable effective widths or native Safari SVG hit accuracy.
Four in-memory mutations (no pointer events, visible stroke, missing visual link,
wrong forwarding receiver) rejected by one additional test; source never mutated.
Initial .57015tests/13PASS/2FAIL; current16PASS. Focused74PASS across proxy/collapsed
isolation/Extrude chooser, Face Bevel, Knife, Join and release contracts. Full Node24:
2050tests/1964PASS/86FAIL/0skip; exactly two reviewed failures removed, no new
identities against .7722049/1961/88. All remaining checks active, no exclusions/gate.
Runtime source/geometry/gesture owners and frozenBeta2–6 unchanged. Shell/recovery773
and two reviewed fixture URLs only; Add/Text771, Gizmo759, Multi1.0/Loop715 retained.
Publication/Node22/live verification pending. Next remaining86 historical checks and
scoped Bevel/Knife/Loop reliability. Add Vertex/NOM import/Lasso tightening deferred.
No new feature qualification; optional gizmo Move/Rotate/Scale and Undo/Redo sanity.


### .773 publication verification — 2026-10-09

Published32d70bb2e73151b3cb3b61f387e312d1d4371965; tree86adb0a691e79059379ac202554ac4c7a1d7f145 exactly matches tested checkout.
Actual Node22 Topology37933050867/job113828237624:2050tests/1964PASS/86FAIL/0skip;
all86 failure names match local. Pages37933050504 success. Live shell/version,
unchanged Gizmo and frozenBeta6 version byte-match tested checkout. Focused74PASS.
User .772 PASS recorded; .773 device sanity pending. Runtime source unchanged.


## .774 — Component hold terminal routing validation — 2026-10-09

User .773 PASS recorded. Parent ee046392d0d9d3cd5e79957e98ed974f1983a28d.
Two .631 source checks expected only Face/Edge completion, but current main762
also finishes Vertex at window capture. Replace exactly those two assertions with
execution of actual registration callbacks: all three completions receive same
physical event, once, in existing order, above a simulated consuming document owner.
Explicit callback spies/control dispatch are not native browser propagation proof.
Reuse existing .761 owner fixture for real Edge hold/timer/scrub/release/cancel:
release keeps fixed-base current candidate; cancel restores previous selection;
hold retires, no later timer effect, geometry/loose data/history unchanged.
Original seven other .631 assertions and12 .761/.762 assertions retained. One new
test rejects eight in-memory mutations: omitted Vertex/Face/Edge completion or late
capture, independently on up/cancel. Runtime source never mutated. Initial .631
9tests/7PASS/2FAIL; revised10PASS.63focusedPASS incl actual gate/paint/floating rails,
scaffold/Grow/Shrink/Fill history, Gizmo/collapsed isolation and release contracts.
Full Node24:2051tests/1967PASS/84FAIL/0skip; exactly two reviewed failures removed,
no new identities against .7732050/1964/86. Remaining83source-pattern/1version-pin
checks active; classifications do not prove all obsolete. No skips/exclusions/gate.
Runtime/geometry/gesture files and frozenBeta2–6 unchanged. Only shell/recovery774
and two reviewed fixture URLs advance. Main762/Gizmo759/Gate766/AddText771,
protected Multi1.0/Loop715 retained. Publication/Node22/live verification pending.
Next remaining84 historical checks and scoped Bevel/Knife/Loop reliability.
Add Vertex occasional picking/NOM import/Lasso tightening deferred. No new feature
qualification; optional hold sideways/release, UP/DOWN selection and navigation sanity.

## .774 publication verification — 2026-10-09

Published runtime/test release commit `895519977bcf9b3b971d911e204d24ceacc69f3b`,
tree `4baed78f41b7078b3b9bd0103a8e8d6b9682853d`. Node 22 CI run
37934475663, job 113832966074: 2051 tests / 1967 PASS / 84 FAIL / 0 skipped;
all 84 failure identities match the local inventory, with no new failures.
Pages run 37934474546 completed successfully. Fresh live .774 index.html and
version.json match repository bytes; main.js, pencil-orbit-gate.js and frozen
beta-6/version.json also match. Focused validation: 63 PASS.
User .773 PASS recorded; .774 device acceptance remains pending.


## .775 — File menu interaction validation — 2026-10-10

User .774 PASS recorded. Parent main454a51cf1a3dda1607ac3b0526f697e7342b4b2a.
Audited authoritative topbar-layout734, current shell/export controls and .541–.545
history. One .542 editable assertion had a malformed optional-call source regex;
the other expected every button to close File, superseded by accepted .545 terminal-
action-only behavior. Replace exactly these two checks with execution of complete
current topbar owner, imports stubbed and unrelated layout nodes absent. Explicit
selector-aware DOM/dispatch/microtask doubles are not native Safari focus, event
propagation, file-picker or export-output evidence. Editing inputs/checkboxes/
textarea/select/contenteditable, labels/summary and both Import/Format/Geometry
choices preserve open menu; editable descendants take precedence over terminal
ancestors. Six existing terminal actions close only after controlled target callback,
without consuming interaction; nested targets resolve through closest. Outside
pointerdown dismisses; closed menu is inert. One new test rejects six in-memory
mutations: missing editable exemption, all-button close, omitted Import terminal,
early synchronous close, absent outside dismissal and late pointerdown registration.
Runtime source never mutated. Retain original third .542 pin/protection check and
all seven .541/.545 assertions. Initial10checks/8PASS/2FAIL; revised11PASS.
Focused29PASS including File controls, export/NOM and release contracts. FullNode24:
2052tests/1970PASS/82FAIL/0skip; exactly two reviewed .774 failures removed, no new
failure identities. Remaining81source-pattern/1version-pin active; classifications
do not prove all obsolete. No skips/exclusions/CI gate. Runtime and frozenBeta2–6
unchanged; shell markers/recovery775 and corresponding two reviewed fixture URLs
only. Topbar734/Export741/AddText771/Main762/Gate766/Gizmo759/Multi1.0/Loop715 kept.
Publication/Node22/live verification pending. .775 device acceptance pending.
Next remaining82 historical checks and scoped Bevel/Knife/Loop reliability; Add
Vertex occasional picking/NOM import/Lasso tightening remain deferred.

Manual .775 sanity (runtime unchanged): confirm .775; File → edit name/switch
Editable/Reference, OBJ/GLB and Base/SubD without menu closing; tap outside to close.
Optional normal export should complete as before. Device acceptance is not inferred.

## .775 publication verification — 2026-10-10

Published release commit `4d10bedc73a627a128550232d2d60a5da6968070`,
tree `e0fd3cb8b8dc2d3df7f63c754dacba4380b12bea` matches tested checkout.
Actual Node22 Topology run38001174835/job114059327679:2052tests/1970PASS/82FAIL/
0skip, all82 failure identities exactly match local inventory; no new failures.
Pages38001174378 completed successfully. Fresh live index.html/version.json byte-
match .775; unchanged topbar-layout.js/export-as-panel.js and frozenBeta6 version
also match repository bytes. Focused29PASS. User .774 PASS; .775 device sanity
pending. No runtime modelling/UI or frozen-beta changes.


## .776 — Armed Face selection / drag validation — 2026-10-10

User .775 PASS recorded. Parent mainfbfa4c8d91d11f5c43aaf9062a9f43ce6dfac925.
Audited existing multi-face-direct753/native main762 bridge and accepted .501/
.516/.518/.519/.535 history. Seven .484/.485/.490 source checks enforce obsolete
inline tap/raycast/union working-set or function-placement text. Replace these
seven one-for-one with behavior of the whole existing Face controller. Keep five
other original checks and all nearby .535/Through/Bevel/Knife checks unchanged.
Reuse negative-extrude-runtime fixture with optional in-memory source transform;
no writes to runtime. New shared test helper installs real Face region and current
uniform Inset kernels via their existing owners. DOM/primary picker/native toggle
bridge/dispatch are controlled doubles; selected-Face raycast, EditableMesh, Inset/
Extrude kernels and History are real. No native Safari picking/propagation proof.

Both Extrude/Inset: repeated tap add/remove delegates to bridge once, preserves
other IDs, geometry/metadata/redo and armed tool; provisional unselected press is
restored before tap/cancel. Cancel cannot toggle; old release has no latent effect.
Down/5px movement do not validate region or clone a transaction; tap works even
with region refusal.9px promotes to modelling. Unselected drag isolates its hit;
selected drag retains deliberate multi-Face set. Real preview preserves redo,
release commits once without tap-toggle, previous unselected Face unchanged;
Cancel restores geometry, retains working selection and redo, releases capture.
Actual one-step Undo/Redo compared with exact geometry/creases/loose values and
accepted .756 effective Face labels (absent/null equivalent). No blanket metadata
normalization. Initial12checks/5PASS/7FAIL; revised13PASS. One new test rejects eight
mutations: missing primary picker, wrong toggle ID, cancel toggling, early threshold,
union working set, omitted history, premature region validation, cancel committing.

Focused122PASS; fullNode24:2053tests/1978PASS/75FAIL/0skip. Exactly seven reviewed
.775 failures removed; no new identities. Remaining74source-pattern/1version-pin
checks active, classifications do not prove all obsolete. No exclusions/skips/CI
gate. Runtime/frozenBeta2–6 unchanged; shell/recovery776 and two corresponding
reviewed fixture URLs only. Main762/FaceDirect+Inset753/Gate766/Bevel769/Knife763/
AddText771/Gizmo759/Multi1.0/Loop715 retained. Publication/Node22/live pending.
.776 device sanity pending; no new feature qualification. Next remaining75
historical checks and scoped Bevel/Knife/Loop reliability. Add Vertex occasional
picking/NOM import/Lasso tightening deferred.

Manual .776 sanity (runtime unchanged): confirm .776; with Extrude or Inset armed,
tap selected/unselected Faces to remove/add; drag a different Face, Undo/Redo once,
then confirm background Pencil exit/navigation remain normal. Device PASS not inferred.

## .776 publication verification — 2026-10-10

Published release commit `fa6e961f12775ff7690e1badb1df5f88b9b88e80`,
tree `6f2bb498821a2d1c3c5c1caabcb6645b64d66a4a` matches tested checkout.
Actual Node22 Topology run38003439298/job114066673069:2053tests/1978PASS/75FAIL/
0skip; all75 failure names exactly match local inventory, no new failures.
Pages38003438462 completed successfully. Fresh live .776 index.html/version.json
byte-match; unchanged multi-face-direct.js/uniform-inset.js and frozenBeta6 version
also match repository bytes. Focused122PASS. User .775 PASS recorded; .776 device
sanity pending. Runtime/frozenBeta unchanged.


## .777 — Face target / Exact / replay validation — 2026-10-10

User .776 PASS recorded. Parent mainebd18b11288313b6b3edb5942f4a2cbffbe06f63.
Audited current Face753/main762 selection bridge, precision/repeat owners and
accepted .516–.535 history. Eleven .516/.518/.519/.526/.527/.528/.529/.530 failures
expect superseded working-set spellings, old overlap/reset conditions or synthetic
Repeat routing. Replace exactly those eleven checks with whole current-owner
behavior using the .776 fixture; retain all fourteen other assertions. .519's
same failing case also hid two old pins: review existing Face753/main762 bytes and
use reviewed loader contracts, without repinning either runtime owner. Current
Repeat uses direct replay since .531; synthetic pointer9876 remains for Exact.
Do not describe these as the same live UI route.

Extend existing armed-face helper, not another runtime owner. Real selected-Face
Three raycast at projected cap centres overrides a controlled conflicting native
primary for deliberate single/multi sets. Sequential preference is enabled through
actual Extrude commit, not seeded booleans. It substitutes only an unchanged single
Extrude selection; Inset, matching-key multi selection with no selected hit, or
changed selection key retain intended primary. Real explicit tap and tool switch/
rearm clear continuation even when original IDs are restored. Unselected drag
isolates hit, selected drag retains full working set and actual Undo/Redo remains
covered by reused .776 checks. Synthetic Exact makes zero native primary/stack
calls, retains explicit single/multi set and commits once with Undo/Redo. Current
direct replay API changes supplied Face rather than picker result, keeps unrelated
Face cycle and commits once with Undo/Redo for Extrude/Inset. Repeat UI launcher and
native Safari propagation/primary hit accuracy are not proven by these doubles.

Initial25checks/14PASS/11FAIL; revised26PASS. One additional test rejects ten
in-memory mutations: missing single/multi selected priority, Inset overlap stealing,
multi overlap substitution, missing key check, tap reset, arm reset, synthetic
primary/stack repick and wrong replay kernel target. Runtime source never written.
Focused148PASS including original .776 checks and nearby .535/Through/Knife/Face
Bevel/label/release contracts. FullNode24:2054tests/1990PASS/64FAIL/0skip; exactly
eleven reviewed .776 failures removed, no new identities. Remaining63source-pattern/
1version-pin active; classification does not prove all obsolete. No skips/exclusions/
CI gate. Runtime/frozenBeta2–6 unchanged; shell/recovery777 and two corresponding
reviewed fixture URLs only. Main762/Face+Inset753/Gate766/Bevel769/Knife763/AddText771/
Gizmo759/Multi1.0/Loop715 retained. Publication/Node22/live pending; .777 device
sanity pending. Next remaining64 checks and scoped Bevel/Knife/Loop reliability.
Add Vertex occasional picking/NOM import/Lasso tightening deferred.

Manual .777 sanity (runtime unchanged): confirm .777; deliberately select a Face
(or several) and use Extrude/Inset; try Exact and Repeat on another Face, with normal
Undo/Redo and background navigation. No synthetic overlap fixture recreation needed.

## .777 publication verification — 2026-10-10

Published release commit `681821cd6abce11b739c4fcbf17372e06711151a`,
tree `84fc0d230d4cdb38f38b6db20d8b6fa8ef6d6f1a` matches tested checkout.
Actual Node22 Topology run38004448143/job114069891788:2054tests/1990PASS/64FAIL/
0skip; all64 failure names exactly match local inventory, no new failures.
Pages38004447563 completed successfully. Fresh live .777 index.html/version.json
byte-match; unchanged multi-face-direct.js/uniform-inset.js and frozenBeta6 version
also match repository bytes. Focused148PASS. User .776 PASS recorded; .777 device
sanity pending. Runtime/frozenBeta unchanged.

## .778 — Native Face bridge ownership validation — 2026-10-10

User .777 PASS recorded. Parent main5d6b7d258c7ae77f99769df067d0c218b766e4b0.
Audited current Face753/main762 and historical .486–.491 plus accepted .535.
Nine failing assertions demanded retired faceObjects/scene pickers, pending native
handoff, obsolete picker/toggle spelling or additive drag union. Reconcile exactly
those nine using the existing whole-controller armed-face fixture; retain all
thirteen other assertions, including the still-failing .489 main bridge definition
check. That definition needs its own main-owner audit; it is not suppressed.

Native primary bridge receives the original event/type. Direct owner consumes and
captures the press, emits one semantic press with correct hit/working set, and
releases ownership on completion. Both Extrude/Inset preserve additive/subtractive
taps without geometry/history/redo changes. Selected-face real Three raycast priority,
provisional unselected selection/cancel, deliberate threshold, actual kernels and
one-step Undo/Redo reuse existing checks. Five in-memory routing mutations rejected:
wrong component type, cloned event, wrong tap target, too-early promotion and absent
promotion. No runtime writes or parallel owner. Controlled native picker/event/DOM
are not evidence of native Safari propagation or primary hit accuracy.

Initial22checks/12PASS/10FAIL; revised23checks/22PASS/1FAIL. Clean focused65PASS;
fullNode24:2055tests/2000PASS/55FAIL/0skip. Exactly nine reviewed .777 failures removed,
no new identities; remaining54source-pattern/1version-pin stay active. No exclusions,
skips or CI gate. Runtime/frozenBeta2–6 unchanged. Shell/recovery778 and only two
reviewed recovery fixture URLs changed; all source hashes retained. Multi1.0 and
Loop715 protected. Publication/Node22/live pending. .778 device sanity pending.
Next remaining55 checks and scoped Bevel/Knife/Loop reliability; Add Vertex occasional
picking/NOM import/Lasso tightening deferred.

Manual sanity: confirm .778; armed Extrude/Inset tap to add/remove Faces; drag on
selected and another Face, then Undo/Redo and normal background navigation.

## .778 publication verification — 2026-10-10

Release commit `d0ba0fe19edee45b6a82f41b33d1a37b681d9e5f`, tree
`620c4e497aaef5586a46ffe959a4d5209e00e9af` matches tested checkout.
Actual Node22 Topology run38005274839/job114072505737:2055tests/2000PASS/55FAIL/
0skip; all55 failure names exactly match local inventory. Pages38005274578 succeeded.
Fresh live index.html/version.json, unchanged Face/main owners and frozenBeta6
version byte-match repository. Focused65PASS. User .777 PASS recorded; .778 device
sanity pending. Runtime/frozenBeta unchanged.

## .779 — Clean negative Extrude partition seams — 2026-10-10

User .778 PASS, then supplied Before/After Extrude OBJ and screenshot778 showing
fragmented shallow cap. Parent main996bbe7101aea54fd7fd8c039fcb1e129d8999e4.
Exact source files retained as negative-extrude-779-before.obj/after.obj (106verts/
110quads before;149verts/123faces after). Source0 is inset z=-1 rectangle1.772 square;
depth0.161517. Prior751 kernel reproduces exact output cycles/cap3; point differences
under1e-4 arise from six-decimal exported source rounding. Not a recent runtime
rollback: .772–.778 validation releases did not change Extrude geometry.

Audit existing Face753→Through751 finite cutter and .742/.750/.751 cleanliness
work. Accepted cutter-boundary pieces have differently subdivided shared seams;
complete-edge greedy merging leaves unnecessary partitions. Extend existing kernel:
conform private piece edges, cancel reversed interior edges per connected component,
trace one simple boundary, coalesce only convex area-preserving unions. Remove straight
partition vertices; canonical assemble restores neighbouring required seam vertices.
Holes, branches, concave unions retain prior conservative merger; disconnected pieces
stay separate;256piece bound retained. No global dissolve/flatten/retriangulate or
new pointer/kernel owner. Existing source/target restrictions and legacy242 path remain.

Your shallow recess now110verts/114faces, one quad cap/four quad walls, no triangles,
closed consistent winding and exact rectangular removed volume. Other105 original
faces retain exact points/cycles; groups/crease preserved. Five depths0.01–2.2,
rotated/translated/scaled copy, physical/Exact/replay actual controller with fallback,
one-step Undo/Redo, preview reversal/Cancel/redo, mismatched seam/hole/disconnected
private boundaries covered.13newPASS/84focusedPASS; fullNode24:2068tests/2013PASS/
55FAIL/0skip, same exact55identities as778; all remaining checks active. Original
fixtures unchanged. Runtime edit only Through kernel; Face import-only cache chain
and shell/recovery779. Reviewed kernel+Face hashes including legacy242 reference;
legacy URL retained. Main762/Inset753/Multi1.0/Loop715/frozenBeta2–6 unchanged.
Publication/Node22/live pending; .779 device acceptance pending.

Next: confirm supplied-model device negative Extrude, then remaining55 checks and
scoped Bevel/Knife/Loop reliability. Add Vertex picking/NOM import/Lasso deferred.
Manual: load Before Extrude, shallow inward pull of same inset; Undo/Redo, then
another inward/outward pull and normal background navigation.

Source SHA256 before a6d3ca81e70ee50c11c25edb331263a4b34eddce325f61ad894662c3c3dd78b2;
after70c0f4d27ed0f0cc5d9cee01ceeb05f0fbb777436546c761312564c811aff235.

## .779 publication verification — 2026-10-10

Release commit `5b24a307f9239286ece4d9947ad6a3f79dfb5542`, tree
`7fc73ef19749c57ec1c910724af03851d6f84905` matches tested checkout.
Actual Node22 Topology run38006619712/job114076765987:2068tests/2013PASS/55FAIL/
0skip; all55 failure names exactly match local inventory and778. Pages38006618687
succeeded. Fresh live index/version/kernel/Face import owner, unchanged main and
frozenBeta6 version byte-match repository.84focusedPASS. User .778 PASS recorded;
.779 supplied-model device acceptance pending.

## .780 — Main native picker contract validation — 2026-10-10

User .779 awesome fix/PASS recorded. Parent main9b4ea4ba1dbd59df27d38c63b1d3b10b60501f83.
Audited main762 picker/bridge, Face779 owner, .489/.499/.501 and accepted .535
selected priority/sequential scope. Three failures enforce superseded picker spelling,
component-only bridge routing or absent firstUnselected. Reconcile those three;
retain all nine other historical checks, including legacy selector yield and pins.
No further runtime change to accepted .779 clean negative Extrude.

Execute actual main setPointer/pickKindHits/pickKind/pickObject functions and bridge
assignment from source. Controlled canvas rect/selection/render dependencies with real
Three tagged plane meshes, camera and raycasts prove original-event coordinates,
nearest matching-kind primary, raw distance-ordered hit stack, separate Object body
route, live root changes and null/empty misses. Raw plane centre yields two triangle
hits per face; preserve main's current unfiltered hit-stack contract. This fixture
is scoped main code, not whole app/native edge/vertex picker geometry or Safari QA.
Reuse existing whole Face behavior for native taps, real selected raycast and properly
scoped sequential Extrude; preserve legacy yielding source assertion. Four in-memory
mutations rejected: missing kind filter, farthest primary, cloned event and missing
Object route. Runtime never written. Initial12checks/9PASS/3FAIL; revised15PASS.

120focusedPASS including current Face ownership and all .742/.750/.751/.779 supplied
negative-cut/Through fixtures. FullNode24:2071tests/2019PASS/52FAIL/0skip; exactly
three reviewed failures removed from779, no new identities. Remaining51source-pattern/
1version-pin active, no skips/exclusions/CI gate. Runtime/frozenBeta2–6 unchanged;
shell/recovery780 and two reviewed recovery fixture URLs only, hashes unchanged.
Face+Through779/main762/Inset753/Multi1.0/Loop715 retained.
Publication/Node22/live pending; .780 device sanity pending. Next remaining52 checks
and scoped Bevel/Knife/Loop reliability. Add Vertex/NOM import/Lasso deferred.
Manual: confirm780; Face tap/Extrude/Inset; Object pick then Move, Undo/Redo and navigation.

## .780 publication verification — 2026-10-10

Release commit `2f200c6bec86eebc417034619949923e14633e4a`, tree
`ff10ed4fc279c5e7973b92d798461bc99a02218f` matches tested checkout.
Actual Node22 Topology run38007376560/job114079177377:2071tests/2019PASS/52FAIL/
0skip; all52 failure names exactly match local inventory. Pages38007376421 succeeded.
Fresh live index/version, unchanged main/accepted Through779 and frozenBeta6 version
byte-match repository.120focusedPASS. User .779 PASS recorded; .780 device sanity
pending. Runtime/frozenBeta unchanged.

## .781 — Connected native Face picking validation — 2026-10-10

User .780 PASS recorded. Parent main4dd598328bbd7be3c4bebad382a7c5c42fd6e8b1.
Audit current main762/Face779 and .495/.497/.523→accepted .534/.535 history.
Five failures enforce unrestricted deeper-hit substitution, obsolete handoff spelling,
or nearest-only picking that excludes later selected-hit priority. Reconcile exactly
those five through existing whole-owner selected priority/sequential scope/tap/drag
checks; retain all six other assertions, including still-failing .495 trace format.
Diagnostics require separate owner audit, not suppression or resurrection.

Extend existing main-picker fixture to accept shared root/camera/canvas. Connect its
actual setPointer/pickKindHits/pickKind/pickObject/bridge to existing whole Face owner,
using real cube face fan meshes and same perspective camera/viewport rectangle.
Both Extrude/Inset, empty/preselected-other/selected-single/selected-multi cases resolve
front cap1, delegate original event for primary+stack, retain intended working set,
consume press, toggle exactly once, retire capture and preserve geometry/history/redo.
Native selection/render/event/DOM are controlled dependencies; not whole WebGL app or
Safari propagation proof. Existing deliberate selected priority, actual committed
single-Extrude-only continuation, Inset/multi/key protection and explicit reset behavior
remain covered. One new test rejects wrong-kind and farthest-primary mutations of
main picker in memory. Runtime never written or repinned.

Initial11checks/5PASS/6FAIL; revised12checks/11PASS/1FAIL.115clean-focusedPASS including
.780 main picker and .742/.750/.751/.779 supplied clean-negative/Through fixtures;
target group plus .489 is19PASS/1existing trace FAIL. FullNode24:2072tests/2025PASS/
47FAIL/0skip; exactly five reviewed780 failures removed, no new identities. Remaining
46source-pattern/1version-pin active; no skips/exclusions/CI gate. Runtime/frozenBeta2–6
unchanged; shell/recovery781 and only two reviewed recovery fixture URLs, hashes retained.
Face+Through779/main762/Inset753/Multi1.0/Loop715 protected. Publication/Node22/live
pending; .781 device sanity pending. Next remaining47 checks and scoped Bevel/Knife/
Loop reliability. Add Vertex/NOM import/Lasso tightening deferred.
Manual: confirm781; armed Extrude/Inset tap Faces to add/remove; selected/multi Face
modelling then Undo/Redo and background navigation.

## .781 publication verification — 2026-10-10

Release commit `c49f57c40528236343c38671313868dc526c82a8`, tree
`f45523d23b7618a672ca93c0c91497a614cfccc2` matches tested checkout.
Actual Node22 Topology run38009270303/job114085236411:2072tests/2025PASS/47FAIL/
0skip; all47 failure names exactly match local inventory. Pages38009270112 succeeded.
Fresh live index/version, unchanged main/Face779 and frozenBeta6 version byte-match
repository.115clean-focusedPASS; target group19PASS/1existing diagnostic FAIL.
User .780 PASS recorded; .781 device sanity pending. Runtime/frozenBeta unchanged.

## .782 — Current Face diagnostic owner validation — 2026-10-10

User .781 awesome PASS recorded. Parent main192384a668c53dcc80dd1465cf6fbb455734f05e.
Audit .492–.495 temporary FaceTap trace, .497 removal, .536 cleanup, current Face779
semantic press/finish and central Gesture Debug736. Seven failures demand retired
FaceTap readout/staged microtask/RAF trace or obsolete picker spelling. Reconcile
those seven with current semantic/central-owner behavior; retain all seven other
historical assertions, including native stack exposure and pins. No resurrection of
retired primary/stack text or claim that current panel displays those old fields.

Extract unchanged whole-debug-owner fixture from existing .722 tests into shared
helper; all five .722 test bodies retained. Connect real central debug API to existing
whole Face controller fixture. Both Extrude/Inset emit original pointer/tool/chosen
hit/selectionBefore/workingFaces semantic press; snapshots remain unchanged after
selection tap. Real central panel records tap and Cancel finish fields in newest-first
order, old release adds no duplicate, recent log bounded12, Clear removes evidence,
Disable removes panel and later selection adds no panel. Geometry/history/redo and
expected native toggles remain intact. Reuse real native picker integration checks.
Controlled DOM/storage/events/bridge; not Safari screenshot or whole-app proof.
One new test rejects missing semantic event, wrong chosen hit and missing finish
stage in memory. Runtime source never written. Retired FaceTap overlay stays absent.

Initial14checks/7PASS/7FAIL; revised15PASS. Shared .722 five checks alsoPASS.
123focusedPASS including .536 cleanup, native bridge/selection scope and all supplied
.742/.750/.751/.779 clean-negative/Through fixtures. FullNode24:2073tests/2033PASS/
40FAIL/0skip; exactly seven reviewed781 failures removed, no new identities. Remaining
39source-pattern/1version-pin active; no skips/exclusions/CI gate. Runtime/frozenBeta2–6
unchanged; shell/recovery782 and only two reviewed recovery fixture URLs, hashes retained.
Face+Through779/main762/Inset753/Debug736/Multi1.0/Loop715 protected. Publication/Node22/
live pending; .782 device sanity pending. Next remaining40 checks and scoped Bevel/
Knife/Loop reliability. Add Vertex/NOM import/Lasso tightening deferred.
Manual: confirm782; armed Extrude/Inset Face selection taps; model and Undo/Redo,
then background navigation. Diagnostic internals already automated, no special device
trace recreation required.

## .782 publication verification — 2026-10-10

Release commit `8b74b8c1107d1eda3778cca05afaddad0e085710`, tree
`f9ad57892348ae6336d17a2bfae1fb93939f834c` matches tested checkout.
Actual Node22 Topology run38011380865/job114091946863:2073tests/2033PASS/40FAIL/
0skip; all40 failure names exactly match local inventory. Pages38011380490 succeeded.
Fresh live index/version, unchanged central debug/Face779 and frozenBeta6 version
byte-match repository.123focusedPASS; all five original .722 test bodies byte-identical.
User .781 PASS recorded; .782 device sanity pending. Runtime/frozenBeta unchanged.

## .783 — Native Face picking across cube viewpoints — 2026-10-10

User .782 PASS recorded. Parent main36e11eca8c2811bc6721536d11521c8d8a2bf484.
Audit .498 projected-polygon experiment, .499 removal and accepted .534/.535.
Four failures demand retired screen polygon/back-facing candidate/depth-sort picker
or prohibit later scoped hit-stack continuation. Reconcile those four with existing
native integration/selected priority/sequential scope; retain original tap/drag/pin
check. Separate .496 Deselect workaround failure remains active; requires session-exit
owner audit, not assumed obsolete picking behavior.

Extend shared whole-Face/native-main fixture with six axis viewpoints and real cube
fan meshes, shared perspective camera/viewport rectangle. Both Extrude/Inset choose
camera-side cap for empty selection, nearest raw hit even though far shell is present
in distance-ordered stack. Actual press uses that cap/one-Face working set, release
toggles once, retains geometry/history/redo and retires ownership. Reuse selected/
multi working set and properly scoped continuation checks. One shared face-mesh builder
serves existing native integration and new viewpoint checks; no parallel runtime owner.
Two in-memory mutations rejected: wrong pointer coordinates and farthest primary.
Controlled DOM/selection/render/events; not whole renderer/Safari propagation or a
new blanket back-face culling promise. Current native owner semantics remain intact.

Initial5checks/1PASS/4FAIL; revised6PASS.131focusedPASS including current diagnostics,
native integration/targeting and .742/.750/.751/.779 supplied clean-negative/Through
fixtures. FullNode24:2074tests/2038PASS/36FAIL/0skip; exactly four reviewed782 failures
removed, no new identities. Remaining35source-pattern/1version-pin active; no skips/
exclusions/CI gate. Runtime/frozenBeta2–6 unchanged; shell/recovery783 and only two
reviewed recovery fixture URLs, all hashes retained. Face+Through779/main762/Inset753/
Debug736/Multi1.0/Loop715 protected. Publication/Node22/live pending; .783 device sanity
pending. Next remaining36 checks and scoped Bevel/Knife/Loop reliability.
Add Vertex/NOM import/Lasso tightening deferred.
Manual: confirm783; orbit to another side and tap Faces with Extrude/Inset armed;
model then Undo/Redo and normal navigation.


### .783 publication verification — 2026-10-10

Published release commit `30e2a9f0af57222ea24b27fb960cf486dac2f07d`, tree
`9ef9c75b66c2456700cd3980d54ff4490b834bf0`. Pages run `38015557953`
completed successfully. Topology CI run `38015558359`, job `114104912894`,
completed with the expected active inventory: 2074 tests / 2038 PASS / 36 FAIL /
0 skipped. All 36 failure identities match `docs/reliability-build-783.json`;
four .782 failures removed and no new failures. Focused validation: 131 PASS.
Fresh live `index.html`, `version.json`, `src/main.js`,
`src/multi-face-direct.js`, and `beta-6/version.json` match repository bytes.
Runtime owners and protected pins unchanged. User accepted .782; .783 device
sanity remains pending.


## .784 — Face Deselect / contextual session exits

- [x] User .783 PASS: native viewpoint Face selection, modelling, Undo/Redo and normal navigation protected.
- [x] Actual main Deselect listener plus whole Face controller: both tools restart selection without rearming; repeated clear preserves geometry/history/redo.
- [x] Whole contextual value session plus background policy/direct controller: Done/background refuse during active drag; idle closure disarms direct/Repeat once, hides panel, preserves selection and emits one completion.
- [x] Three in-memory owner-transition mutations rejected; original .496 selected-aware and pin checks retained.
- [x] 97 focused PASS; full2076/2041PASS/35FAIL/0skip; exactly one reviewed old failure removed, no new identities. Runtime/frozenBeta unchanged.
- [ ] .784: radial Extrude → SELECT Deselect → fresh Face tap, without rearming; repeat with Inset.
- [ ] Done/background closes settings and returns surviving selection puck; normal modelling, Undo/Redo and navigation.


### .784 publication verification — 2026-10-10

Release commit `1ed2807186c94684ff088a6ecdb1955f5f4dacc1`, tree
`f05d5abf98191f9cb1e43a265e27c106480227f8` exactly matches tested checkout.
Actual Node22 Topology run38017194089/job114109994738:2076tests/2041PASS/35FAIL/
0skip; all35failure identities exactly match docs/reliability-build-784.json.
Pages run38017193466 completed successfully.97focusedPASS. Runtime and frozenBeta
unchanged; .783 user PASS protected; .784 device sanity pending.
Fresh live index.html/version.json byte-match .784 repository. Unchanged main762,
Face779 and frozenBeta6 version also byte-match live. Shell markers/recovery784
coherent; reviewed runtime pins and hashes retained.


## .785 — Main navigation / selection tap completion

- [x] User .784 PASS: Deselect restart, contextual Done/background, modelling/history/navigation protected.
- [x] Actual main window movement and completion: Vertex/Edge/Face navigate-away/back, diagonal8px/threshold, cancel/secondary/release movement preserve selection; confirmed blank tap clears once, disarms Lasso, deduplicates native/semantic release.
- [x] Actual main selected-component intent/toggle/endDrag: intended ID toggles once, wrong pointer waits, cancel/long/moved/cancelled intent retained; controls restored, tap capture released; mesh/history/redo unchanged.
- [x] Original .720 native-owner test bodies retained; three mutations rejected; no runtime source changes.
- [x] 110 focused PASS; full2077/2045PASS/32FAIL/0skip; exactly three reviewed old failures removed, no new identities. FrozenBeta unchanged.
- [ ] .785: selected Vertex/Edge/Face tap removes just that item; blank short tap clears.
- [ ] Orbit/pan/pinch preserve selection; ordinary modelling and Undo/Redo still work.


### .785 publication verification — 2026-10-10

Release commit `4437ecb4ab9e8223260b912163ee1310a2761732`, tree
`e5aadf925fe9b39f57d9a00f32899a24b11f8f23` exactly matches tested checkout.
Actual Node22 Topology run38018332508/job114113537665:2077tests/2045PASS/32FAIL/
0skip; all32failure identities exactly match docs/reliability-build-785.json.
Pages run38018332469 succeeded. Fresh live index.html/version.json byte-match785;
unchanged main762/Face779 and frozenBeta6 version also match live repository bytes.
110focusedPASS; source/frozenBeta unchanged. .784 user PASS protected; .785 device
sanity pending. Shell markers/recovery785 coherent, original modelling pins retained.


## .786 — .785 device FAIL / actual Vertex and Face picking repair

- [x] .785 FAIL recorded: Vertex additive/deselect unreliable; Face rear bleed. Edge performs well and is protected; no overall .785 PASS inferred.
- [x] Three failures reproduced before runtime changes with real Three marker/body/main raycasts and actual selection owners.
- [x] Assisted22px Vertex tap shares main background classification; add/remove retains previous selection and geometry/history/redo.
- [x] Hidden rear marker cannot steal a nearby visible front marker; no-body loose scaffolds retain existing tools/selection.
- [x] Armed Face taps toggle native front primary even with selected rear Faces or Extrude continuation; drag selection priority/Exact/replay/negative cuts retained.
- [x] Three mutations rejected;267clean-focusedPASS; broader547/536PASS/11existingFAIL; full2081/2049PASS/32FAIL/0skip, identical failure names to785.
- [ ] .786: multi-select visible Vertices and tap individual ones off, also near dot edge; orbit/repeat with finger and Pencil.
- [ ] Front Face taps with Extrude/Inset armed while other Faces remain selected; no rear selection bleed.
- [ ] Ordinary Face/Edge selection, negative Extrude, Undo/Redo and protected navigation.


### .786 publication verification — 2026-10-10

Release commit `d1bef467466ac66e08433e412686a399c8473f4a`, tree
`bec9f248300ac1fcad0deaaf3b931d732fc7e190` exactly matches tested checkout.
Actual Node22 Topology run38019322721/job114116561321:2081tests/2049PASS/32FAIL/
0skip; all32failure identities exactly match docs/reliability-build-786.json.
Pages run38019322728 succeeded. Fresh live index/version and changed main786/
Face786/Vertex assist786 byte-match repository. Through779, protected Multi1.0 and
frozenBeta6 version also match live repository bytes.267clean-focusedPASS; broader
547/536PASS/11existingFAIL retained. .785 device FAIL and Edge acceptance recorded;
.786 user retest pending. Shell/recovery and reviewed runtime module pins verified.


## .787 — protected .786 PASS and Edge repeated-constraint contract

- [x] User PASS .786: Vertex additive/deselect and front native Face taps accepted;
  preserve those repairs and previously accepted Edge picking.
- [x] Actual whole Edge759 owner retains selected Y across two physical pulls,
  commits two history entries and ribbons, and retires drag while remaining armed.
- [x] Cancel restores source/redo, releases capture and retains chosen direction;
  idempotent arm retains Y, Done/new session defaults back to Plane.
- [x] Regression resetting Plane on every rearm is rejected by behavior test.
- [x] All original ten .759 parity tests and other .510 checks retained.
- [x] 67 focused PASS; full2082/2051PASS/31FAIL/0skip, only reviewed .510 removed.
- [x] User .787 PASS: Edge Y two pulls, Done/reopen Free, history/navigation protected.
- [x] .787 Pages38020165585 success; Node22 run38020165850/job114119194349
  matches all31 failures and2082/2051PASS/31FAIL/0skip. Live shell/runtime/protected
  markers byte-match repository; release503d4c3825bddaf190f5e4bffe11ce8e83146b1b.


## .788 — Revolve launch/edit and Cancel history tokens

- [x] User .787 PASS recorded/protected; accepted .786 Vertex/Face/Edge unchanged.
- [x] Whole current Revolve launcher creates/reuses/cancels/restarts; Add starts Edit,
  touch yields, Pencil authors UV, Edit-off yields for plane positioning.
- [x] Actual Apply/core commits one mesh history entry, selects result, Undo/Redo
  preserve geometry and effective null groups. Existing historical core checks kept.
- [x] Cancel restores original undo/redo tokens, including evicted history-limit
  token; actual object-history WeakMap redo tag restores future scene after Cancel.
- [x] Four default/history mutations rejected;88focusedPASS. Full2087/2058PASS/
  29FAIL/0skip; only reviewed .389/.422 failures removed, no exclusions.
- [x] User .788 PASS protected: edit then Undo; Revolve open/Cancel then Redo restores edit.
- [x] User .788 PASS: authoring, Edit off/on, Apply and Undo/Redo protected.
- [x] User .788 PASS: component selection and navigation protected.
- [x] .788 Pages38028447713 success; Node22 run38028448281/job114144169023
  exactly matches29 failures and2087/2058PASS/29FAIL/0skip. Live shell, changed
  Revolve and accepted/protected owners byte-match release da4939dbcf70e426989f08face2ca3875cda48af.


## .789 — Sweep Cancel history and editing getter

- [x] User .788 PASS recorded/protected; Revolve/selection owners unchanged.
- [x] Whole Sweep Cancel restores original scene and exact undo/redo tokens at
  history limit, retains real object-history tagged redo; duplicate Cancel inert.
- [x] Competing session Cancel restores history without ending new session.
- [x] Incomplete path refusal preserves source/stacks; original Apply/core plus
  Undo/Redo and post-Apply Cancel retain committed result.
- [x] Actual transform entrypoints yield to Sweep editing boolean getter through
  profile/path button transitions; no editing reaches preflight sentinel.
- [x] Three history/transform mutations rejected; other historical checks retained.
- [x]121focusedPASS; full2094/2066PASS/28FAIL/0skip, only reviewed .400 removed.
- [x] User .789 PASS protected: edit/Undo, Sweep/Cancel, Redo restores edit.
- [x] User .789 PASS: Sweep Apply, Undo/Redo, selection/navigation protected.
- [x] .789 Pages38029040178 success; Node22 run38029040477/job114145919199
  matches all28 failures and2094/2066PASS/28FAIL/0skip. Live shell/Sweep and accepted/
  protected owners byte-match release3d1683dce1f6fa275124aa4aece39009e196d8e0.


## .790 — Current Edge layout / Bevel Exact validation

- [x] User .789 PASS protected; all runtime owners unchanged.
- [x] Actual shared Edge layout retains five three-column rows including Circle,
  original node identity, contextual option order and idempotent sync.
- [x] Whole precision owner retains Exact/readout inside Bevel settings after
  range rows; repeated layout preserves original inputs/Apply listeners.
- [x] Captured selection survives to Exact delegation, deduplicated IDs/numeric
  value correct, nonfinite values refuse; actual direct owner is adapter here.
- [x] Two mutations rejected; existing CSS, Sweep declaration and pin checks kept.
- [x]114focusedPASS; full2096/2070PASS/26FAIL/0skip; exactly two reviewed failures
  removed, no new identities/skips/exclusions. Adjacent geometry tests retained.
- [x] User .790 PASS protected: Edge radial Bevel Width/Segments, Apply/Cancel and Undo/Redo.
- [x] .790 Pages38029873759 success; Node22 run38029874102/job114148372358
  matches26 failures and2096/2070PASS/26FAIL/0skip. Live shell and unchanged runtime/
  protected owners match release253afa3edf83b4aa890f43a6f2a8995fb0b3b06f.


## .791 — Face layout / late Join ordering

- [x] User .790 PASS protected; retain Edge Bevel/history and accepted picking/construction owners.
- [x] Current six Face rows retain original buttons, three-column styling, ordered contextual Value/readout/Repeat directly below Extrude row, despite earlier unrelated action row.
- [x] Late Join placement reproduces wrong order before repair; existing shared layout restores Join/Bridge/Sweep order and keeps original listeners after repeated relocation/synchronization.
- [x] Inspect/Repair/Topology Gate stay true drawer bottom after late extra controls.
- [x] Four mutations rejected; all original Edge layout/precision tests kept after ordered DOM fixture extraction; CSS and reviewed actual Join loader retained.
- [x]124focusedPASS; full2100/2081PASS/19FAIL/0skip; exactly seven reviewed failures removed, none new. Two legitimate shared UI cache-hop assertions reconciled, no excluded checks.
- [x] User .791 PASS protected: Face settings/Done, selection/modelling/history and late Join ordering.
- [ ] Optional drawer sanity: Focus off, reload/switch Face mode; Join/Bridge/Sweep retain order.
- [x] .791 Pages38032058768 success; Node22 run38032058820/job114154883205 matches2100/2081PASS/19FAIL/0skip and all19 identities; live shell/shared UI and accepted/protected owners byte-match tested release.


### .791 publication verification — 2026-10-10

Release commit `f1d134e077726ae88da6a9e6a19644894d8853e8`, tree
`89ba5c3685e6e5cf9a71804e5e961df67d68a559` exactly matches tested checkout.
Actual Node22 Topology run38032058820/job114154883205:2100tests/2081PASS/19FAIL/
0skip; all19failure identities exactly match docs/reliability-build-791.json.
Pages run38032058768 succeeded. Fresh live index/version/shared UI791 byte-match
repository; accepted main/Face/Vertex786, Sweep789/Revolve788, Through779, protected
Multi1.0 and frozenBeta6 version byte-match unchanged repository bytes.124focused
PASS. .790 user PASS protected; .791 Face UI/history sanity pending. Shared UI
cache pin/hash and shell/recovery791 reviewed; no kernel or frozenBeta changes.


## .792 — Shell / Solidify metadata recovery contracts

- [x] User .791 PASS recorded/protected; shared layout791 and accepted interaction owners unchanged.
- [x] Two earlier no-metadata checks reconciled against separately accepted .465/.466 propagation; original .465/.462/.466 coverage retained.
- [x] Actual cores keep source and reversed offset inner cycles, expected Facegroup provenance, null side-wall labels, watertightness and creases; one/two-Face Shell openings and duplicate selected IDs covered.
- [x] Real mesh History serialization retains exact geometry/groups/creases across Undo/Redo; tool-session wiring is separate coverage.
- [x] Invalid thickness refuses without mutation; one-time post-mutation exception restores complete arrays/creases through actual catch paths.
- [x] Three whole-core in-memory mutations rejected, including complete label-array rollback; no runtime source writes.
- [x]71focusedPASS; full2104/2087PASS/17FAIL/0skip, exactly two audited failures removed, none new. No skipped/excluded checks or runtime/frozenBeta changes.
- [x] User .792 PASS protected: Shell Apply/Cancel and Undo/Redo.
- [x] User .792 PASS protected: Solidify Apply/Cancel/history; navigation/selection.
- [x] .792 Pages38033318385 success; Node22 run38033318243/job114158546682 matches2104/2087PASS/17FAIL/0skip and all17 identities; live shell and unchanged cores/protected owners byte-match tested release.


### .792 publication verification — 2026-10-10

Release commit `e1372c9cc2c379eb8a4f261fca1728517b318551`, tree
`c87dc4da613e0bb2941fec3a59ac1b50409259d6` exactly matches tested checkout.
Actual Node22 Topology run38033318243/job114158546682:2104tests/2087PASS/17FAIL/
0skip; all17failure identities exactly match docs/reliability-build-792.json.
Pages run38033318385 succeeded. Fresh live index/version byte-match792. Unchanged
Shell/Solidify cores, shared UI791/main/Face/Vertex786, Sweep789/Revolve788, Through779,
protected Multi1.0 and frozenBeta6 version all byte-match repository.71focusedPASS.
No runtime/frozenBeta changes. .791 user PASS protected; .792 Shell/Solidify device
sanity pending. Shell markers/recovery792 coherent; exactly two reviewed recovery
URLs changed with every runtime hash retained.


## .793 — Facegroups render ownership

- [x] User .792 PASS protected; accepted runtime remains unchanged.
- [x] Actual owner active bridge / inactive object-ID lookup with stale manager and missing-source cases; metadata fallback retained.
- [x] Actual SubD2→Mirror geometry/groups equal expected evaluation, source unchanged; colour attributes/material/pending success checked with real Three.
- [x] First two missing-geometry frames retain normal material; later readiness installs colours and stops pending retry; look change cancels queued application.
- [x] Three in-memory mutations rejected; split import/other material assertions and original SubD/Mirror/pending tests retained.
- [x]42focusedPASS; full2108/2094PASS/14FAIL/0skip, only three reviewed failures removed, none new. No skips/exclusions/runtime/frozenBeta changes.
- [x] User .793 PASS protected: Facegroups first activation/Studio switch and SubD/Mirror colours.
- [x] User .793 PASS protected: selection/navigation and Undo/Redo.
- [x] .793 Pages38034916795 success; Node22 run38034916611/job114163240465 matches2108/2094PASS/14FAIL/0skip and all14 identities; live shell, render and protected owners byte-match tested release.


### .793 publication verification — 2026-10-10

Release commit `f098586bf7c2cf5eeb227d82cd408be294234714`, tree
`f8f3a85abfcc64caa9b53f57cd3e9d2d73fab958` exactly matches tested checkout.
Actual Node22 Topology run38034916611/job114163240465:2108tests/2094PASS/14FAIL/
0skip; all14failure identities exactly match docs/reliability-build-793.json.
Pages run38034916795 succeeded. Fresh live index/version byte-match793. Unchanged
render owner568/colour core547, shared UI791/main/Face/Vertex786, Sweep789/Revolve788,
Through779, protected Multi1.0 and frozenBeta6 version all byte-match repository.
42focusedPASS. .792 user PASS protected; .793 Facegroups device sanity pending.
No runtime/frozenBeta changes. Shell/recovery793 coherent; exactly two reviewed
recovery URLs changed, all runtime hashes retained.


## .794 — Mode dock / File / VIEW contracts

- [x] User .793 PASS recorded/protected; accepted runtime unchanged.
- [x] Whole topbar owner moves original mode buttons/listeners, retains icon/title/aria labels through repeated sync and removes command row.
- [x] Actual emitted dock rules retain base/narrow safe-area offsets and status-lane clearance; File/VIEW maintain current height bounds and internal touch scrolling.
- [x] Four in-memory mutations rejected; existing Face row/Duplicate/loading/mode-ID/protected-pin and File interaction checks retained.
- [x]48focusedPASS; full2112/2101PASS/11FAIL/0skip, exactly three audited failures removed, none new. All11 remaining checks active; no skipped/excluded tests/runtime/frozenBeta changes.
- [ ] .794: mode buttons; File/VIEW open and scroll to lower controls; return to modelling/navigation.
- [x] .794 Pages38036207720 success; Node22 run38036208096/job114167039767 matches2112/2101PASS/11FAIL/0skip and all11 identities; live shell/styles/menu and protected owners byte-match tested release.


### .794 publication verification — 2026-10-10

Release commit `4ae051d79fc855f0ab4e8224e0d4fb83770c3322`, tree
`4df564fce34f340b525fdcc8186825ebe6a0fd12` exactly matches tested checkout.
Actual Node22 Topology run38036208096/job114167039767:2112tests/2101PASS/11FAIL/
0skip; all11failure identities exactly match docs/reliability-build-794.json.
Pages run38036207720 succeeded. Fresh live index/version byte-match794. Unchanged
styles/topbar734/VIEW732, shared UI791/main/Face/Vertex786, Sweep789/Revolve788,
Through779, protected Multi1.0 and frozenBeta6 version byte-match repository.
48focusedPASS. .793 user PASS protected; .794 menus/modes device sanity pending.
No runtime/frozenBeta changes; shell/recovery794 coherent and exactly two reviewed
recovery URLs changed, all runtime hashes retained.


## .795 — Add+ candidate previews

- [x] All six primitive previews draw actual face boundaries/counts, update X/Y, keep scene/history unchanged and Apply through original owner.
- [x] Preview rotation changes projection only; mismatched pointer ignored, Cancel ends drag and releases capture.
- [x] Text readiness, word/thickness/depth updates and invalid-candidate clearing execute actual owners.
- [x] Cancel/Escape/outside/Add-toggle disposal preserves scene and redo; original .771 checks retained.
- [x] Full2116/2105PASS/11FAIL/0skip; same11 failures as794, no new identities.
- [ ] iPad .795: X/Y and presets visibly change divisions, Pencil/finger preview rotation works.
- [ ] iPad .795: Text word/thickness updates preview; Apply creates one matching object; Undo/Redo and Cancel work.


## .796 — Add+ unit insertion zone

- [x] Six primitive density variants fit centred±0.5 bounds with longest extent1, uniform distances and identical topology.
- [x] Actual Add+ Apply for primitives/Text and original Undo/Redo retain fitted dimensions.
- [x] Invalid candidates refuse before mutation; original factory/core absolute-scale behavior remains covered.
- [x]37focusedPASS; full2119/2108PASS/11FAIL/0skip; same11 identities as795.
- [ ] iPad .796: preview X/Y and rotation, Apply/Cancel/history; primitive/Text proportions remain correct.
- [ ] Nomad transfer: inserted objects have the requested comparable scale on import.


## .797 — Green reliability baseline / GLB group import

- [x] User .796 AWESOME PASS protected: Add+ previews/unit fit/Text/Apply/Cancel/history and Nomad-scale feedback.
- [x] Whole current Rotate owners yield with modern puck; explicit gizmo math/selection/history/Undo/Redo verified; legacy bridge fallback retained.
- [x] Actual Three GLB binary round-trip keeps one object, distinct group names/IDs, shared material and optional split objects.
- [x] Material fallback/malformed Nomad IDs/ancestor tables, actual UV fit/weld/reconstruction, topology gating, indexed UV reload and pole/channel seams verified.
- [x] Opaque metadata and binary image bytes/remapped references verified separately; no image decode or texture render claim.
- [x] Six routing/GLB mutations rejected; all unrelated historical tests retained.56focusedPASS.
- [x] Full2125/2125PASS/0FAIL/0skip, exactly11 reviewed failures removed, no quarantine/exclusions.
- [ ] .797 iPad grouped-object GLB export/import retains facegroup names/colours and one object; optional split works.
- [ ] .797 Vertex/Edge/Face gizmo Rotate, selection/navigation and Undo/Redo sanity.

## .798 — Editable Boolean sources

- [x] .797 user PASS protected: green baseline, GLB group import and Rotate; .796 Add+ preview/unit fit remains protected.
- [x] Actual Boolean creation/manager/session verifies Union/A−B/Intersect, source transform, same-result Apply and single scene Undo/Redo.
- [x] Cancel after source history swaps restores scene and exact original global tokens; no-op Apply adds no history.
- [x] Failed preview/Apply keeps previous valid preview; stale preview recomputed; busy/history controls safe.
- [ ] iPad: create overlapping independent boxes, Boolean A−B, select result → Edit Boolean; choose A/B, Move/Rotate/Scale, Update Preview and Apply. Sources hidden/result updated.
- [ ] Undo/Redo edit once; reopen, transform, Cancel restores original; navigate with fingers/Pencil during session.
- [ ] Union/Intersect and operation switching; failed Intersect can recover; export applied visible result to Nomad.
- [ ] Confirm panel/gizmo and amber/blue/mint guides, Add+ and ordinary group/linked Boolean remain usable.

.798 local validation: **2134/2134 PASS, 0 FAIL, 0 skipped** (Node24 full suite). Whole UI module also exercised with actual manager/Boolean/Three and controlled DOM: shared session, real guide/preview geometry, Apply disposal, Escape/conflicting-action cancellation. Device rendering/touch checks pending.

.798 publication verified: code commit `b48f888f591868bffb8553e14380e47e19e97e41`.
Topology CI `38051036769` / job `114210039725`: SUCCESS; Pages `38051036202`: SUCCESS.
Fresh live version.json, HTML shell and all seven changed/new module owners match
main byte-for-byte. Shell/recovery798, matching direct/drawer management798 pins,
protected Multi1.0/Loop715 and frozen Beta2–6 retained. .798 device PASS pending.

## .799 — Boolean edit radial / exit repair — 2026-10-10

.798 user FAIL: trapped edit window and missing contextual radial label. Existing
Boolean Object radial slot now displays Edit Boolean for eligible results; actual
Object adapter launches/cancels boolean-edit, preserves transform gizmo, and avoids
premature completion when ordinary Boolean launch opens an edit. Background semantic
exit routes to existing Cancel; failed cancellation blocks switching. No new kernel,
viewport pointer owner or unrelated changes; .797 remains last protected PASS.

- [x] Whole editor + actual radial/background adapters: contextual label, launch,
  Cancel, background cancellation, restored scene/session/overlay and failed-preview Cancel.
- [ ] iPad: select Boolean result → radial → Edit Boolean; move source then Cancel.
- [ ] Reopen, move then background tap: closes and restores original result.
- [ ] Reopen, Update Preview/Apply; one Undo/Redo; ordinary Boolean still works.

.799 validation: **2136/2136 PASS, 0 FAIL, 0 skipped**. Full Node24 suite; touch/layout rendering remains device gate.

## .800 — Boolean A/B visibility / Object radial actions — 2026-10-11

User .799 FAIL: A/B missing. Native visibility now permits current edit sources
through Solo without changing Solo ID; exit restores filtering. Added translucent
amber/blue source bodies alongside edge guides and mint preview. Device reproduction
still a manual gate; .798/.799 not accepted, .797 last protected PASS.

Duplicate inner180° and Delete inner315° reuse original object actions. Boolean and
Mesh Health outer90°/270°; radius230 retains spacing. Multi Select outer225° uses shared
icon/original toolbar action, also available at object footer and existing gizmo corner.
Original footer Duplicate retained. No new group/history/Multi owner.

- [x] Actual visibility owner: Solo result → both A/B visible during edit → original visibility after Cancel.
- [x] Whole editor source surfaces/preview cleanup; actual radial original action dispatch and common slots/spacing.
- [ ] iPad: Edit Boolean visibly shows A/B; source buttons and gizmo work; Update/Apply and Cancel/background exit.
- [ ] Object radial Duplicate at bottom / Delete at upper-left; Undo/Redo both; footer Duplicate retained.
- [ ] Multi icons in radial, gizmo corner and footer toggle the same state; select objects/group and verify no unwanted edits.

.800 validation: **2138/2138 PASS, 0 FAIL, 0 skipped**; Node24 complete suite. Device A/B display/controls remain acceptance gate.

## .801 — Reproduced Boolean activation reentrancy / radial correction — 2026-10-11

User .800 FAIL. Real manager clears component selection by clicking CURRENT mode;
editor capture guard treated this internal click as exit and Cancel re-entered,
ending session before outer restoreTokens (null.undo), leaving orphan popup and no A/B.
Previous fixture stubbed this click; visibility-only .800 did not address root.
Guard now only exits on different mode. Cancel closes orphan host if transaction ended.
Whole-source old-guard mutation reproduces exception with actual manager/mode-click path.

Radial Multi removed; Clean for SubD outer225°; Boolean/Edit Boolean outer180° below
Duplicate inner180°. Existing Delete315°, footer Duplicate/Multi and corner Multi retained.
Only editor/radial/gizmo owners changed; protected geometry, Multi1.0, Loop715 and betas untouched.

- [x] Actual internal selection-clearing click/capture ordering, source A/B switching, Apply/Cancel and restored scene; old guard mutation rejected.
- [x] Cancel closes orphaned host; normal session and existing radial lifecycle checks retained.
- [x] Corrected radial positions / no radial Multi / footer Multi and Duplicate retained.
- [x] User .801 PASS — iPad: Edit Boolean → A/B visible, switch/transform → Cancel; reopen → Update/Apply → Undo/Redo.
- [x] User .801 PASS — Background exit and mode switch close safely; radial Boolean below Duplicate, Clean in prior Multi slot, no radial Multi.

.801 validation: **2141/2141 PASS, 0 FAIL, 0 skipped** (full Node24 suite). Includes actual activation click plus old-guard mutation; User .801 PASS recorded/protected.


## .802 — Dense negative Extrude regression — 2026-10-11

User .801 PASS recorded/protected: Editable Boolean A/B edit/exit and corrected Object
radial. Separate attached BAD EXTRUDE.obj814v/730f and screenshot801 reveal dense
rectangular cut walls. Audit live/main and .779 owner: no kernel rollback;256-piece
cleanup shortcut returns unmerged cells when plane classification is denser.
Existing coalescer now spatially welds and axis-indexes private seams, cancels interior
edges at existing10000 generation bound, iterative component lookup. Convex/area/
single-boundary guards and hole/concave conservative fallback retained. No new kernel,
global dissolve, pointer/history/UI change. Face import-only parent/cache chain802,
shell/recovery802; reviewed hashes include retained legacy242 plan/Through reference.

Exact uploaded OBJ preserved (SHA256a3ebd5e09db1c46e4b0dedaa12fa60d82a9b3aadce59ced100a5336bd4f1c212).
No original before export available: reconstructed closed146v/120f regression cage
closes two rectangular final openings and removes only their straight seam points.
Old256 guard produces >1000 faces. Fixed recess150v/124f and through146v/122f;
corrected downloadable OBJ preserves all118 exterior boundaries within2e-6, volume
within2e-7 and warped anchors exactly. Not an automatic saved-mesh repair feature.
12new regression checks: upload, old-guard mutation, four depths,3000-cell/hole,
labels/crease/unchanged faces, physical/Exact/replay and Undo/Redo/Cancel. Earlier
.779 tests retained. Device new-cut/corrected-file acceptance pending; Live Boolean
deferred until this case is accepted. Protected Boolean801/Multi1.0/Loop715/betas untouched.

- [x] Actual attached after mesh and explicitly reconstructed before cage; old256 guard mutation reproduces fragmentation.
- [x] Four depths,3000 private cells/mismatched seams/hole, closed orientation, volume, metadata and unrelated warped geometry.
- [x] Corrected downloadable OBJ matches original exterior boundaries/volume within six-decimal rounding.
- [x] Physical/Exact/replay, one-step Undo/Redo, repeated-cap preview and Cancel/redo preservation.
- [x] User .802 PASS: import corrected mesh, inspect middle section and continue a simple inward/outward Face extrusion.
- [x] User .802 PASS: Undo/Redo restores each new operation cleanly; normal orbit/pan/zoom and selection remain intact.

.802 full Node24 validation: **2153/2153 PASS, 0 FAIL, 0 skipped**. 12 new checks; all historical tests retained. Publication verified below; device acceptance pending.


### .802 publication verification — 2026-10-11

Release `bbfa37b1676bbda1c7cfe11a5fe0a81f0ef57d0d`, tree
`09184ca39e60ceb9035385acb4efb86fd3c53ac7` exactly matches tested checkout.
Full Node24:2153tests/2153PASS/0FAIL/0skip. GitHub Topology38097266187 SUCCESS;
Pages38097266175 SUCCESS. Fresh live version.json/index.html/Through802/Face802
byte-match main. Protected .801 Boolean/radial, Multi1.0/Loop715 and frozenBeta2–6
unchanged. Corrected fixture146v/122f verified closed, same exterior boundaries and
volume within export rounding. Device extrusion/continued-modelling acceptance pending.


## .802 user acceptance — 2026-10-11

User PASS recorded. Clean dense negative Extrude, corrected-file continued modelling,
and Undo/Redo/navigation manual checks are accepted and protected. .801 Editable
Boolean/radial acceptance retained. Runtime and release markers unchanged. Next
scoped /nextbuild: automatic Live Boolean using existing recipe/session/solver owners.


## .803 — Automatic Live Boolean preview — 2026-10-11

User .802 PASS recorded/protected; /nextbuild proceeds to agreed automatic preview.
Audited manager live save/getter, bridge render events and transform-end before changes.
Existing editor now schedules private preview clones on150ms coalesced first deadlines:
opening, A/B transforms and operation edits update automatically. Idle unchanged and
unchanged failed signatures do not repeatedly solve. Failure keeps last valid result;
changed inputs/manual Update can retry. Cancel/Apply invalidate pending callbacks.
Existing controller permits preview-only busy solve; mutation/exit controls keep drag
guards, same result Apply and one scene Undo/Redo retained. No new kernel/pointer/
history owner. Synchronous solver performance remains iPad gate; not an always-on
scene dependency graph or chains/groups/links extension. Beta7 not frozen by this build.

Five new checks execute whole editor/actual manager/solver/history with controlled
timers, verify unsaved Rotate/Scale, drag-time private previews, coalescing, operation
switch/failure/recovery/Cancel, unchanged suppression and retired callbacks. Existing
.801 integration and .802 dense Extrude coverage retained. UI/core/scheduler803 plus
shell/recovery pins reviewed; other owners and protected Multi1.0/Loop715/betas unchanged.

- [x] Whole UI/real manager and solver: automatic opening preview, latest coalesced A/B transforms/operation, private drag-time solve without history/activation.
- [x] Unsaved live Rotate/Scale coordinates; no repeated idle/failed solves; last valid preview/refusal/recovery; pending Cancel and retired callbacks.
- [x] Accepted .801 A/B activation/exit and .802 Extrude tests retained; existing Apply/Cancel/Undo transaction coverage retained.
- [ ] iPad: Edit Boolean, choose A/B and Move/Rotate/Scale; mint result changes automatically without Update.
- [ ] Switch Union/A−B/Intersect; preview updates. Try a non-overlapping Intersect, then bring source back; recover preview safely.
- [ ] Cancel restores original result; reopen/edit/Apply, then Undo/Redo once. Navigation and source selection remain usable.

.803 complete Node24 validation: **2158/2158 PASS, 0 FAIL, 0 skipped**. All historical checks remain active; five new checks. Publication verified below; device acceptance pending.


### .803 publication verification — 2026-10-11

Release `704b76a6ceac2f3375812e2f37dbe7831013ac1e`, tree
`d248c92e862628bc78d147230dd0a009c54424d9` exactly matches tested checkout.
Full Node24:2158tests/2158PASS/0FAIL/0skip. GitHub Topology38098655432 SUCCESS;
Pages38098655578 SUCCESS. Fresh live manifest/shell/editor/core/scheduler byte-match
main. .802 Extrude, .801 radial/activation, Multi1.0/Loop715 and frozenBeta2–6 untouched.
.803 device live-preview performance/visibility and Apply/Cancel/history pending.
No Beta7 freeze performed; .802 remains last device-accepted release checkpoint.

## .804 Boolean preview visibility repair — user PASS protected

- [x] Edit Boolean defaults to Result: one solid result, no A/B solid duplication.
- [x] Sources shows A/B for editing without a result layered over them.
- [x] A/B selection and Move/Rotate/Scale still work; Result updates automatically.
- [x] Switching views creates no history; Solo remains unchanged on exit.
- [x] Apply/Cancel/background exit and one scene Undo/Redo retain .801 behavior.
- [x] Automated exclusive overlay and native render visibility/Solo/Cancel checks pass.

## .805 Boolean result-only object list — acceptance pending

- [ ] After Boolean creation, object list shows result, with A/B absent; unrelated objects retain normal rows.
- [ ] Edit Boolean A/B buttons/transforms/Result/Sources work; Apply/Cancel keep compact list.
- [ ] Scene Undo/Redo restores correct result/source rows; deleting result reveals retained sources.
- [x] Actual outliner/manager/history coverage: hidden ordinary rows, no history mutation, active edit, Cancel, Apply/Undo/Redo, locked/damaged/missing/deleted recipes.

## .806 Edit Boolean compactness — user PASS protected

- [x] No Update Preview button; source transforms and operation changes update automatically.
- [x] Fonts and spacing match compact popups; Cancel/Apply remain stacked right, at top centre.
- [x] Result/Sources and A/B, Apply/Cancel/Undo/Redo remain functional with result-only object list.

## .807 Startup/reset unit cube — user PASS protected

- [x] Fresh launch default cube matches Add+ Cube at1×1×1.
- [x] Reset returns to one1×1×1 cube; Add+ density/preview and navigation remain unchanged.

## Beta 7 freeze — .807

- [x] User .807 AWESOME PASS and explicit release request recorded.
- [x]303 runtime/supporting files match accepted source; immutable SHA256 manifest added.
- [x] Frozen shell/modules/templates/refresh/PWA references stay within beta-7 namespace.
- [x] Pages and regression CI succeed; live/frozen critical assets byte-match repository.
- [ ] Recommended final frozen-link iPad launch, navigation and Nomad export smoke.

## Planned project/NOM persistence gates — not implemented

- [ ] .boxlab Save/Open preserves exact scene scale/topology, groups/links/modifiers and hidden Boolean recipes/sources.
- [ ] Reopen remains editable; invalid/unsupported projects leave current scene intact; schema migrations covered.
- [ ] NOM import uses real file fixtures, preserves supported geometry/transforms/names/facegroups and reports unsupported data.


## .808 Curve Profile — user PASS protected

- Add+ > Curve: Pencil/mouse draw, Open/Closed, Smooth/Straight and Detail preview.
- Edit points by dragging; candidate Undo/Clear and Cancel leave scene/history intact.
- Apply creates one connected wire outline fitted to 1unit (not a solid yet).
- Select Curve via object list; Add+ > Edit Curve changes existing outline.
- Move/Rotate/Scale then reopen; Apply preserves placement; Cancel preserves mesh.
- Creation/edit Undo and Redo restore recipe and geometry; duplication remains editable.
- Normal Add previews, Lasso, one/two-finger navigation and popup exit remain stable.
- Frozen Beta7 .807 acceptance protected; user “Awesome!! /nextbuilf” accepts .808.

.808 local full regression: **2170/2170 PASS, 0 FAIL, 0 skipped**; five new Curve
tests and reviewed changed loader/hash contract pass. Device acceptance pending.


## .809 Performance — user acceptance / iPad evidence protected

- [x] Actual cage geometry, edge indices, crease/selection/loop styling unchanged; edge enumeration reduced to one pass.
- [x] Off-by-default capture, bounded samples/pause/reset, actual main frame/rebuild timing and whole UI enable/close/timer cleanup.
- [ ] VIEW > Diagnostics > Performance opens a readable overlay; Close and Reset work.
- [ ] On a denser mesh, orbit and select components; readout updates without altering selection or geometry.
- [ ] Creased edges and selected vertices/edges look normal; Undo/Redo and Curve draw/edit still work.
- [ ] Screenshot dense-mesh performance readout with FPS/draw calls/rebuild cost for next optimisation.

.809 full local Node24 regression: **2175/2175 PASS, 0 FAIL, 0 skipped**.


## .810 Cage batching — device acceptance pending

- [x] Exact .809/.810 edge raycasts, loop/index identity, materials/order and marker instance matrices; three camera views/zoom.
- [x] Original Vertex assist and Lasso keep indexed/loose vertices; Bridge Topology maps/native group and source visibility retain contracts.
- [x] Shared geometry and instance resources dispose, mirror endpoints match, dense unselected cage uses two visible batches.
- [ ] Same dense mesh, cage on: Reset Performance, tap/select components, orbit; draw calls/resources are substantially lower and markers look normal at different zooms.
- [ ] Vertex/Edge multi-select and deselect, Lasso and long-hold Loop; direct Slide/Bevel/Extrude still find intended components.
- [ ] Mirror/SubD cage, whole-group selection and Boolean Result/Sources hide/show the cage correctly.
- [ ] Edit then Undo/Redo; Curve draw/edit and normal finger navigation remain stable. Send reset readout screenshot.

.810 full local Node24 regression: **2182/2182 PASS, 0 FAIL, 0 skipped**.


## .811 Active SubD reuse — device acceptance pending

- [x] Native-kernel equivalence, repeated reuse, direct geometry/topology/crease/groups/loose inputs and modifier invalidation; source/history replacement and export isolation.
- [x] Actual main render path reuses selection-only SubD; failed recomputation retries; full2187tests PASS,0FAIL,0skips.
- [ ] Dense SubD mesh with cage on: Reset Performance, select/deselect Vertex/Edge/Face without editing; record rebuild mean/max.
- [ ] Reset again, move selected components; surface follows cage. Undo/Redo restores both. Record separate edit timings.
- [ ] Change SubD level/Mirror and switch objects: correct surfaces, selections and finger navigation.
- [ ] Export SubD geometry matches the edited surface.

.810 readout evidence:57FPS/17calls,44rebuilds mean529ms/max614ms during Edge Move;
selection-only cost not isolated and full .810 tactile PASS not inferred.


## .812 Rebuild phase readout — user Awesome acceptance protected

- [x] Bounded off/reset phase/counters, actual main timings/cache counts and inactive nested timing with native skip/error behavior; whole UI phase output/Reset/Close tests.
- [ ] Open Performance on same dense SubD scene, Reset, select/deselect components without editing; capture phase timings and cache hits/misses.
- [ ] Reset separately, make a small component move and Undo/Redo; capture phases.
- [ ] Reset clears phases/counters; Close removes panel and modelling/navigation continue.

Inactive time is included in Scene hooks, not additive. Phase means/maxima use
independent last120samples and need not sum to total rebuild time. After this test,
user requests pausing performance work and returning to modelling development.

.812 full local Node24 regression: **2190/2190 PASS, 0 FAIL, 0 skipped**.


## .813 Outline Balloon — drawing/editing/valid-profile preview accepted; remaining checks pending

- [x] Exact donor hash and geometry, closed shell/rim/winding/volume across depth/direction; invalid convex scope refuses and wire Curve preserved.
- [x] Actual Add launcher, core affine/invalidation, whole editor depth/preview/history/Cancel and native duplication metadata.
- [ ] Add+ > Balloon: Pencil draw an oval; rotate preview, change Depth/Detail, Apply. One editable solid appears.
- [ ] Select it, Add+ > Edit Balloon: change Depth/points, Cancel then Apply; creation/edit Undo/Redo work.
- [ ] Move/Rotate/Scale, reopen editor and confirm placement remains; duplicate retains independent edit recipe.
- [ ] Original Add+ Curve drawing, ordinary mesh selection and finger navigation remain usable.

Performance paused after user .812 Awesome and readout; future target unchanged
inactive object displays (304.1ms mean of444.3ms total sample), no current fix claim.

.813 full local Node24 regression: **2197/2197 PASS, 0 FAIL, 0 skipped**.


## .814 Balloon oval preview — device retest pending

- [x] Screenshot-derived oval produces closed oriented shells at5details/3depths/both windings; authored points retained and donor unchanged.
- [x] Actual editor records triangle Canvas draws, depth/rotation updates, Apply/reopen; invalid preview text/no mutation and dent/crossing refusal covered.
- [ ] Draw an ordinary oval like the screenshot: preview appears and Apply enables. Change Detail/Depth and rotate preview.
- [ ] Apply, reopen Edit Balloon, move points slightly; preview/Apply remain usable, Cancel and Undo/Redo retain expected state.
- [ ] Open outline shows its reason inside the preview; close it again to restore preview. Original Curve and Add+ primitive previews remain usable.

.813 Pencil drawing/point editing and valid-profile preview accepted by user; protect
these specific passes. Original broad .813 history/placement gates are not inferred.

.814 full local Node24 regression: **2201/2201 PASS, 0 FAIL, 0 skipped**.


## .815 Profile stroke / Reset — device retest pending

- [x] Existing authoring owner precedes competing document consumer; touch/unrelated pointer yielding and controls/capture cleanup covered.
- [x] Actual main Reset callback observes cancelled editor, same pointer ID can reopen/draw/Apply; repeated exits leave no stroke listeners.
- [ ] Reset, Add+ Balloon, Pencil draw inside outline box: profile follows Pencil and viewport stays still. Repeat Reset/reopen once.
- [ ] Change Depth/Detail, rotate preview, Apply; reopen Edit Balloon, drag points, Cancel then test Undo/Redo.
- [ ] Add+ Curve still draws; Cancel/Apply then finger orbit/pan/pinch work normally in viewport.

.815 full local Node24 regression: **2204/2204 PASS, 0 FAIL, 0 skipped**.


## Balloon density .816

- [ ] New Balloon Density 4 gives reduced triangle mesh and rapid candidate preview/Apply on iPad
- [ ] Density 4/8/12 increases section/outline tessellation without distorting depth or shape
- [ ] Existing .815 Balloon with no resolution retains prior topology; only explicit slider move migrates
- [ ] Pencil drawing after Reset, Edit/Cancel, Curve Undo, scene Undo/Redo continue working
- [ ] One-finger orbit, two-finger pan, pinch, component selection and downstream transforms remain usable
- [ ] Record real iPad preview, insertion and modelling delay, not idle FPS alone


## Concave Balloon .817

- [ ] Shallow concave notch/C-like outline previews and Applies at Density4
- [ ] Result has outward surfaces, no visibly crossed/folded triangles, and can be orbited
- [ ] Deep unsupported indentation and self crossing reject without scene/history mutation
- [ ] Convex Balloon, Density4/8/12, Edit, Cancel, Undo/Redo remain functional
- [ ] iPad Pencil/Reset and normal touch navigation remain unchanged


## Balloon optional quads .818

- [ ] New Balloon defaults to Triangles, preserves .817 convex and concave cases
- [ ] Topology switch to Quads reduces displayed editable face count; ring strips show quads, poles remain triangles
- [ ] Convex oval, moderate C and five-point star preview and Apply with no visible inverted/folded faces
- [ ] Existing older Balloon Edit retains triangle mode until explicitly switched
- [ ] Topology Undo in editor restores selector and mesh; scene Undo/Redo after Apply works
- [ ] Density4, preview, Pencil after Reset, orbit/pan/pinch and editing performance remain protected


## Balloon paired pole quads .819

- [ ] New Balloon defaults to Quads, poles consist of four-sided faces at Density4
- [ ] Convex oval and accepted C/star preview and Apply without folded/overlapping geometry
- [ ] Face/Edge selection and SubD at poles remain usable, inspect pinching
- [ ] Older .818 quad Balloon retains original triangular pole fans
- [ ] Topology switch to Triangles retains original mode
- [ ] Density, Pencil/Reset, Edit, Cancel, Undo/Redo and navigation remain protected


## Quadball grid poles .820

- [ ] New Density4 Balloon produces quad grid caps and no high-valence central pole
- [ ] Convex oval, C and star produce clean surfaces without twisted cap faces
- [ ] Density4/6/8 preview and Apply with manifold all-quad topology; odd slider values must have supported counts or show safe failure
- [ ] Face, Edge, SubD and Edit Balloon work on newly generated pole grids
- [ ] Older saved Balloon retains previous topology; Triangle fallback works
- [ ] Pencil/Reset, history, iPad navigation and performance remain protected


## Shared Curve point merge .821

- [ ] In Edit points, drag one point near another; target turns red, release removes source
- [ ] Editor Undo restores point and silhouette; ordinary point drag stays unmerged
- [ ] Closed 3-point/open 2-point minimum guarded, Cancel non-mutating
- [ ] Works in Curve and Balloon edit, preserves .820 Quadball preview
- [ ] Pencil Reset, orbit, pan, pinch and scene Undo/Redo unaffected


## Native project preflight .822

- [ ] File > Check project snapshot reports object/vertex/face counts, groups, Boolean and Curve recipes
- [ ] Audit does not alter selection, geometry or native scene Undo/Redo
- [ ] Invalid coordinates are diagnosed without crashing File menu
- [ ] .821 Pencil merge, .820 Quadball, Reset and viewport gestures retain accepted behaviour
- [ ] No .boxlab Save/Open advertised until serializer round-trip and resource support are tested


## Compact File menu .823

- [ ] File controls visually match other compact menus; no oversized padding or fonts
- [ ] On smaller landscape screen File menu scrolls down to Check project snapshot without overlap blocking interaction
- [ ] Import, Export/Save and About controls remain tappable and File menu scroll never orbits viewport
- [ ] Portrait prompt reads Rotate device to landscape
- [ ] .820 Quadball and .821 Pencil merge unaffected


## Balloon drawing camera regression .824

- [ ] Reset then draw Balloon outline with Pencil: 3D camera does not orbit/pan/zoom
- [ ] Repeat after File menu scroll/open and after Cancel/reopen
- [ ] Inside-pad primary touch draws rather than moving 3D scene; outside-pad finger orbit, two-finger pan and pinch remain unchanged
- [ ] .821 Edit points merge/Undo and .820 Quadball preview/Apply remain intact


## Native .boxlab round-trip preflight .825

- [ ] File > Check project snapshot on basic scene reports BOXLAB v1 round-trip verified in memory
- [ ] Test Quadball and two objects, with creases/groups or Curve recipes where feasible
- [ ] Project verification never modifies scene; editing and Undo/Redo still work
- [ ] Unsupported rich resource scenes safely refuse rather than losing data
- [ ] .824 Pencil drawing after Reset and .823 File menu scroll remain operational


## Basic .boxlab Save .826

- [ ] File > Save .boxlab (basic scene) downloads a nonempty .boxlab file from iPad Safari
- [ ] Download filename follows File export name; no changes to live model or Undo stack
- [ ] Created simple Quadball and second object survive in the saved JSON metadata
- [ ] Unsupported GLB passthrough/UV/material resource scene refuses to save with visible explanation
- [ ] Open is not yet offered; file is basic scene data and excludes history and rich resources
- [ ] .824 Pencil capture, .823 compact File scroll, .821 Merge and .820 Quadball unchanged


## Basic .boxlab Open .827

- [ ] Save a simple 2-object scene, change the scene, select Open; Cancel confirmation leaves scene unchanged
- [ ] Confirm Open restores saved object names, meshes, groups and settings; editing remains possible
- [ ] New Add+ after Open allocates a new distinct object ID; no broken Outliner references
- [ ] Wrong extension/malformed JSON/unsupported linked/reference scene refuses without replacing the current project
- [ ] Open explicitly warns Undo/history reset, no misleading full-resource support; File menu scroll and iPad file picker work
- [ ] Quadball, Pencil stroke capture, point merge and native Export/Save remain unchanged


## iPad Files custom extension .828

- [ ] Within BoxLab choose File > Open .boxlab from Files; Browse → Downloads shows .boxlab selectable, not greyed out
- [ ] Selected .boxlab passes filename check and reaches replacement confirmation without changing scene
- [ ] Cancel leaves current scene intact; Confirm restores basic saved project
- [ ] Select a wrong-extension file: explicit Open refused, scene remains intact
- [ ] Do not claim Files-app direct association until native iOS app declares .boxlab document type


## Protected .828 acceptance / Work handoff — 2026-10-12

- [x] User reports PERFECT after .828 fix for .boxlab file recognition from BoxLab's Open picker
- [x] .826 basic .boxlab download user PASS; .825 in-memory codec user PASS
- [x] .824 Balloon Pencil drawing no viewport movement user PASS
- [x] .821 point merge user PASS; .820 quadball topology user PASS
- [ ] Independently verify full Confirm Open restore, subsequent object IDs, Cancel and malformed file refusal on iPad
- [ ] Rich embedded material/UV/GLB resources, linked instances and scene Undo persistence intentionally unsupported in basic project format


## .829 Basic Open replacement — automated verified; device gate pending

- [x] Actual manager stages independent mesh clones and advances object-ID allocator.
- [x] Synchronous settings/render/outliner failures restore prior live mesh, objects, active/solo IDs, linked sources, allocator and Undo/Redo tokens.
- [x] Clone failure, duplicate/max-safe IDs and all-locked scenes refuse without mutation.
- [x] Actual Open Cancel avoids replacement/selection owners; Confirm round-trips native EditableMesh.
- [x] Malformed JSON, wrong extension, oversize and invalid IDs refuse before confirmation.
- [x] Reviewed shell/child cache contracts pass; Object management shell and drawer use one identical URL.
- [ ] Save two named objects, change scene, Open and Cancel: current scene remains.
- [ ] Open and Confirm: saved meshes/names/settings return; old Undo history is cleared.
- [ ] Add another object, select each, edit and Undo/Redo normally.
- [ ] File menu scrolling and Balloon Pencil drawing remain accepted.

Full local Node24 2216/2211 PASS/5 existing FAIL/0skip. Remaining tests kept active;
see docs/reliability-build-829.json. Device/WebGL acceptance not inferred from automation.


## .830 All five failures resolved — automated green; iPad gate pending

- [x] All existing2216checks pass,0FAIL/0skip; no removed/quarantined checks.
- [x] New grid caps at every Density4–12: all quads, closed oriented edge incidence, Euler2 and no orphan vertices.
- [x] Legacy unflagged grid recipe retains exact layout and remains editable.
- [x] Concave shallow notch matches donor; unsafe pole fan/deep notch/crossing still refuse.
- [x] Merge queries current SVG target, red cue/merge/Undo verified.
- [x] Primary touch inside pad authoring and outside-pad navigation yielding match accepted824.
- [ ] New Balloon: draw oval, Density4/5/8; Apply, select pole area, Edit/Cancel and Undo/Redo.
- [ ] Older Balloon: Edit Balloon still available; shape/placement preserved.
- [ ] Drag point onto another: red target, release merges, Undo restores.
- [ ] Pencil drawing stays stationary; outside-pad orbit/pan/pinch still work.


## .830 user PASS / .831 Reference project guides

- [x] User PASS .830 new/legacy Balloon, merge/history and external navigation; protected.
- [x] .831 existing codec round-trips reference geometry/kind/visibility/lock/groups.
- [x] Actual manager stages guides locked, excludes guide from active editable fallback.
- [x] Actual Open mixed scene accepts; Cancel leaves owners untouched.
- [x] Reference-only/unlocked forged reference/linked scenes refuse before confirmation.
- [x] Full local2219PASS/0FAIL/0skip; no old checks removed.
- [ ] Import OBJ as Reference alongside editable object, Save .boxlab, change scene.
- [ ] Open/Cancel preserves changed scene; Open/Confirm restores guide + editable object.
- [ ] Reference remains read-only; hide/show works, editable object can select/Add/edit/Undo.
- [ ] Balloon Pencil drawing and point merge remain accepted.


## .831 user PASS / .832 Linked project instances

- [x] User PASS .831 mixed guide Save/Open, reference lock/visibility and editable history; protected.
- [x] Manager restores local linked source pool, separate world placements and source allocator.
- [x] Existing peer-sync propagates component edits through separate placements.
- [x] Malformed/singular/projective matrices, source IDs and mismatched linked meshes refuse; rollback restores allocator/source pool/history.
- [x] Save validation precedes download; Open validation precedes confirmation; Cancel preserves scene.
- [ ] Linked Duplicate an object, move copy separately, Save .boxlab and reopen.
- [ ] Component edit propagates between linked copies; Object move affects only moved copy.
- [ ] Make Unique breaks sharing; edit then Undo/Redo remains normal.
- [ ] Add another linked pair after Open; original links stay separate from new pair.


## .833 Linked Duplicate mode transition — .832 device FAIL recorded

- [x] Real saveActive fixture reproduces pending Object transform reinterpreted as shared component edit.
- [x] Outgoing Object placement flush precedes mode switch; Face/Edge/Vertex preserve both placements.
- [x] Subsequent genuine component edit still propagates through original linked owner.
- [ ] Linked Duplicate, move aside, select Face: both objects remain visible in original positions.
- [ ] Repeat Object Move → Edge and Vertex; component edit shares without moving other copy.
- [ ] Save/Open linked scene, repeat mode switch; Make Unique/Undo/Redo normal.
- [ ] Pencil orbit/pan/pinch unchanged.


## .834 Linked disappearance diagnostics — .833 retest FAIL

- [x] User .833 no good recorded; exact iPad disappearance remains unresolved.
- [x] Read-only trace off by default, no mesh/source mutation, records distinct bounds.
- [ ] Enable VIEW > Gesture Debug; Linked Duplicate > move > Face; capture pinned LINKED lines.
- [ ] If no LINKED lines, note it as routing evidence, not a successful placement guard.


## .835 original linked object drift / completed-event diagnostics

- [x] User .834 screenshot evidence: active bounds agree, original reported moving far away.
- [x] AFTER samples next task after native mode callbacks; prior early mode inference withdrawn.
- [x] Runtime/rejection errors off by default and pinned when enabled; inactive render-skip logs IDs/message.
- [ ] .835 Linked Duplicate > move > Face; screenshot final AFTER, peers/inactive count and any runtime/render error.
- [ ] Keep .832/.833 failure active until real iPad repair passes.


## .836 shared-source jump after mode switch

- [x] .835 screenshot confirms shared-source jump -18.148 with matching visible copy, not disappearance alone.
- [x] Existing transform finish sees window release before consuming document handler.
- [x] Mode switch commits/closes owned gesture; reused pointer movement cannot change mesh/history.
- [x] Full local2230PASS/0FAIL/0skip; existing rotate/helper checks retained.
- [ ] Linked Duplicate > Move > Face/Edge/Vertex: original and copy retain exact placements.
- [ ] Component edit shares; Object move independent; Save/Open/Make Unique/Undo/Redo normal.
- [ ] Pencil/finger navigation and ordinary Move/Rotate/Scale unaffected.


## .837 native main Object drag / shared-source drift

- [x] .836 user FAIL and diagonal-relative original movement / Array report recorded.
- [x] Actual main move plus linked manager save reproduces source corruption with unfinished drag.
- [x] Completion preserves straight/diagonal move and original/extra placed peer positions, one history entry.
- [x] Main window completion scoped to Object drag; original component tap handlers retained.
- [x] Local2232PASS/0FAIL/0skip; revised Array-style peer focused checks pass.
- [ ] Linked Duplicate > diagonal Move > Face/Edge/Vertex: no jump in original or copy.
- [ ] Array > move an instance > Face: all placements retained, component edits share.
- [ ] Undo/Redo, Make Unique, linked project Open and external navigation remain stable.


## .838 shared-source exact write evidence

- [x] .837 user FAIL recorded; actual device cause not established by synthetic stale-drag tests.
- [x] Both source-write branches traced only when Debug enabled, centres/placement/caller captured.
- [x] Test checks component source write and no extra source mutation/revision.
- [ ] Gesture Debug ON; reproduce Linked Duplicate/Array move→Face; capture SOURCE WRITE stack lines.
- [ ] Do not mark linked source drift repaired until device PASS.


## .839 live mesh identity / inverse placement feedback

- [x] User .838 stack evidence identifies bridge→quad-clean→objects getter→saveActive source writes.
- [x] Two new native tests fail on old bridge and pass after explicit core owner priority.
- [x] Temporary local/helper edges cannot replace published world mesh;20events do not accumulate inverse placement.
- [x] Actual manager/bridge observers preserve source/original; genuine component edit still shares.
- [x] Identity notifications bounded, next core clone honored; legacy cage inference preserved pre-publication.
- [x] Local2237PASS/0FAIL/0skip; revised focused sharing checks pass.
- [ ] Linked Duplicate straight/diagonal move→Face/Edge/Vertex: both positions remain exact.
- [ ] Array, move copy, switch Face: all positions remain; component edit sharing normal.
- [ ] Undo/Redo/Make Unique/linked Save/Open and Pencil navigation still work.


## .840 idle linked-source writes / legacy bridge chain

- [x] .839 user FAIL: idle object-origin reads trigger repeated source writes.
- [x] Actual bridge-topology wrapper loaded before live bridge in regression;3checks FAIL on839.
- [x] Explicit main publishCoreMesh precedes state assignment; generic helper assignments cannot replace core.
- [x]20redraws/1000idle linked save reads preserve world/source geometry and revision0.
- [x] Genuine component edit still shares, legacy pre-core inference stays supported.
- [ ] Fresh Linked Duplicate > diagonal move > Face > idle10seconds: no SOURCE WRITE churn/drift.
- [ ] Array idle/edit sharing and Undo/Redo normal; external navigation and project Open remain protected.


## .840 accepted / protected — 2026-10-13

- [x] User PASS latest .840 Linked Duplicate/Array mode-switch and idle stability gate.
- [x] User PASS shared component editing and Undo/Redo gate.
- [x] Protect explicit main core-mesh publication; temporary/legacy edge queries never replace it.


## .841 Live Array foundation — user PASS protected2026-10-13

- [x] Existing instance/join owners distribute geometry without source mutation.
- [x] Whole-object transformed results reopen; non-affine edits refuse safely.
- [x] Optional recipe survives actual scene snapshot and codec round-trip.
- [x] Actual Apply/manager/history keeps one object, one Undo step, restores recipe/mesh on Undo/Redo.
- [x] Undo during session cancels preview without consuming history or changing scene.
- [x] Full2241PASS/0FAIL/0skip; existing linked/Array/Boolean semantics retained.
- [ ] Object→Array→check Live→count4→drag END→Apply: ONE row labelled Array ×4.
- [ ] Reopen Array, change count/END; Cancel restores old result, Apply updates same object.
- [ ] Undo/Redo restores count/placement/recipe; whole-object Move then reopen remains correct.
- [ ] Save/Open .boxlab restores Live Array and reopening; linked pair Save/Open remains stable.
- [ ] Ordinary unchecked Array and Pencil orbit/pan/pinch remain accepted.


## .841 user PASS / .842 END rotation and scale

- [x] User PASS .841 one-object creation/reopen/count/placement/Cancel/history/project checks; protect.
- [x] Each copy rotates/scales around its own centre; original unchanged, evenly spaced centres.
- [x] XYZ degree/factor interpolation includes deliberate full turns; invalid transforms refuse.
- [x] Mixed effects reopen after affine whole-object placement and survive codec/count edits.
- [x] Actual native THREE ring/uniform/axis handle raycasts drive existing END owner; preview matches Apply.
- [x] Actual Apply/history restores transforms and geometry with one Undo/Redo step.
- [x] Full2247PASS/0FAIL/0skip;841 and protected linked/ordinary Array coverage retained.
- [ ] Live Array count5: Scale END + Free drag gives gradual sizes, original stays unchanged.
- [ ] Rotate END + XYZ ring/degree fields gives gradual orientation, including360° turn.
- [ ] Combine scale/rotation/placement/count; Apply keeps ONE row; reopen preserves values/result.
- [ ] Cancel restores previous result; Undo/Redo restores transforms and recipe.
- [ ] Save/Open and whole-object Move/reopen retain array; Pencil navigation/unchecked Array stable.


## .842 user PASS / .843 Live Array conversion

- [x] User PASS .842 gradual scale/rotation/full-turn, combined preview/reopen, Cancel/history and project gate protected.
- [x] Native conversion preserves affine placed geometry, one object and ordinary component edits.
- [x] Convert commits current staged count/transforms and closes actual session button once.
- [x] One Undo restores original live recipe/result; Redo restores converted mesh; codec preserves conversion.
- [x] Locked/reference/wrong-object/unchecked/no-recipe/invalid-transform conversion refuses without scene/history changes.
- [x] Full local2250PASS/0FAIL/0skip; original semantic coverage retained, three Array cache checks advance843.
- [ ] Reopen Live Array > Convert to Mesh: same shape, ONE object row, no Array label; component edits work.
- [ ] Change count or END scale/rotation before converting: resulting mesh matches preview.
- [ ] Undo restores the previous editable Live Array; Redo restores converted mesh.
- [ ] Save/Open the converted mesh preserves geometry and component editing.
- [ ] Apply Array still keeps live editability; Cancel, ordinary Array and Pencil navigation remain protected.


## .843 user PASS / .844 Live Array source editing

- [x] User PASS .843 conversion/current preview/one-object/history/project gate protected.
- [x] Native source isolation retains one object and affine world placement; topology Apply regenerates all copies with original count/END transforms.
- [x] Existing source component Undo/Redo, source Cancel, exact prior history tokens and unchanged Apply verified.
- [x] One final scene Undo/Redo restores full result and recipe; saved project reopens source parameters and regenerated mesh.
- [x] Invalid geometry, busy tools, context changes and unsupported sources refuse safely; pending count/END settings transfer to source editor.
- [x] Actual UI source bar yields to visible nested tool panels; object/file commands guarded, component modes and viewport gesture owners retained.
- [x] Full local2256PASS/0FAIL/0skip; existing semantics retained; reviewed shell/parent/child pins validated.
- [ ] Reopen Live Array > Edit Source: original only; move a Face/Vertex or Extrude a Face; finish the tool > Apply Source: all items update, ONE live row remains.
- [ ] Reopen Edit Source, make an edit, Undo/Redo within source, then Cancel: prior complete array returns.
- [ ] Source Apply then scene Undo/Redo restores old/new array; reopen count/END values unchanged.
- [ ] Whole-object Move/Rotate first, then source edit: placement and progressive END effects retained.
- [ ] Save/Open .boxlab, reopen source editing; conversion/ordinary Array/Pencil orbit-pan-pinch remain protected.


## .844 user PASS / .845 Clean View batched cage

- [x] User PASS .844 source/edit/exit/local+scene history/project gate protected.
- [x] Actual batched edges/instanced vertex markers, mirrored cage and legacy selection overlays hide in Clean On; body and native raycast hits unchanged.
- [x] Clean Off restores prior visibility without revealing suppressed group/hidden overlays; unrelated nodes retained.
- [x] New cage/rebuild/bridge/render events and repeated toggle cycles retain the Clean state.
- [x] Full local2259PASS/0FAIL/0skip; reviewed Clean/face-workflow/drawer/shell parent pins pass.
- [ ] VIEW > Clean On: cage lines and white vertex dots disappear, model remains visible.
- [ ] Clean Off: normal cage returns; selection and Pencil/finger orbit-pan-pinch still work.
- [ ] Clean On, edit or switch component mode/Undo/Redo: cage stays hidden after rebuild.
- [ ] Mirror/SubD and Live Array source Apply/Cancel retain their accepted behaviour.


## .845 user Perfect PASS / .846 Soft cage batching

- [x] User Perfect PASS .845 Clean On/Off/rebuild/normal-navigation gate protected.
- [x] Actual batched lines/markers receive original edge42%/vertex56% opacity factors; invisible proxies/native raycast hits unchanged.
- [x] Repeated Soft does not compound opacity; Full restores exact original material identity and disposes generated clones.
- [x] Saved Soft state applies to rebuilt batches through bridge/render events; surface material and selection metadata unchanged.
- [x] Soft/Full coexist with Clean845 visibility and preserve suppressed batches.
- [x] Full local2262PASS/0FAIL/0skip; reviewed cage/face-workflow/drawer/shell graph retained.
- [ ] VIEW > Cage > Soft visibly softens lines/dots; Full restores their normal intensity.
- [ ] Clean On still hides cage; Clean Off while Soft selected restores a soft cage.
- [ ] Edit/Undo or switch objects: selected intensity persists; component picking/orbit/pan/pinch unchanged.


## .846 user PASS / .847 independent inactive SubD reuse

- [x] User PASS .846 Soft/Full/Clean/rebuild/selection-navigation gate protected.
- [x] Actual displayMeshFor returns exact native SubD+Mirror output;50unchanged calls evaluate kernel once without source mutation.
- [x] Coordinates/topology/crease/group/loose/settings/mesh+object replacement invalidate; disabled SubD retires cached result.
- [x] Actual inactive rebuild retains visibility/raycast object IDs and GPU geometry disposal while repeated redraws reuse SubD result.
- [x] Linked placement/source geometry remains uncached and responds immediately to native source edits.
- [x] Full local2266PASS/0FAIL/0skip; existing semantics retained; shell847/cache812 owner graph reviewed.
- [ ] Two or more independent SubD objects: select/edit active mesh; other surfaces stay correct and selecting components remains responsive.
- [ ] Switch to previously inactive object, edit and Undo/Redo; change SubD level/Mirror: surfaces update correctly.
- [ ] Hide/show/solo, Object selection and linked component edit retain accepted behavior.
- [ ] VIEW > Performance > Reset, repeat active selections/edits with dense inactive SubD visible; capture Inactive phase and scene SubD hit/miss counts.


## .847 device evidence / .848 cache owner readout

- [x]847 capture106rebuilds mean14.5/max42ms; inactive5.8/20ms;281hits/41misses,34FPS/p9588ms. Aggregate evidence only; no comparative speed or full manual PASS inferred.
- [x] Native main/manager report separate active/inactive hits and misses while preserving total counts.
- [x] Off/reset/re-enable and snapshot isolation retain existing monitor lifecycle; native UI exposes both lines.
- [x] Full2268PASS/0FAIL/0skip; reviewed monitor/core/manager/shell848 graph coherent.
- [ ] Performance > Reset, select/deselect several times with independent inactive SubD objects: Inactive cache hits increase.
- [ ] Small active edit then Undo: Active misses/hits change; inactive surfaces remain correct. Send readout capture.
- [ ] Reset clears both rows; Close removes diagnostic panel; normal gestures/history remain accepted.


## .848 device evidence / .849 inactive GPU geometry reuse

- [x]848 capture active30hits/24misses, inactive111/1;54rebuilds21.9/41ms, inactive6.4/17ms, cage6.2/12ms. Owner reuse confirmed, no comparative speed/full manual PASS inferred.
- [x] Native repeated rebuild preserves geometry identity and bytes; wire overlays share cache without disposing it, transient overlay material disposes.
- [x] Source edit invalidates/disposes once and matches native geometry; standalone clear frees owned map.
- [x] Hide/activate/delete/object replacement/scene switch prune geometry; linked bodies stay uncached with correct placement.
- [x] Full2271PASS/0FAIL/0skip; original picking/visibility/timing coverage retained and ownership expectation revised.
- [ ] Same scene: active select/edit/Undo with inactive SubD visible; all surfaces and Object picks remain correct.
- [ ] Switch/edit old inactive object, change SubD/Mirror, hide/show and Undo/Redo: no stale surfaces/disappearance.
- [ ] VIEW render looks, linked Move/component edits and Live Array source edit remain accepted.
- [ ] Performance Reset/capture Inactive timing and resource counts after comparable interaction; orbit/navigation stable.


## .850 active SubD render geometry reuse — 2026-10-13

849 screenshot evidence:113rebuilds8.6ms mean25max, Inactive0.1/6ms,226hits/0misses,
Body2.8/9ms. Different848 cage workload means no matched speed claim; full device
847–849 gates not inferred. Accepted846 and earlier PASSes remain protected.
Automated: two native main/clear/kernel/cache tests protect unchanged geometry identity,
edit/native parity/Undo replacement, modifiers/source invalidation, exactly-once buffer
disposal, independent cage cleanup and SubD Off/normal geometry replacement. Existing
366 full-line source ordering guard retains publication before clear/add; all other
protected contracts remain. Full local2273PASS/0FAIL/0skip.
Manual pending850:
- Same multi-SubD scene, Performance Reset; select/deselect then edit/Undo/Redo; capture
  Body phase and active/inactive counts, without changing cage workload mid-comparison.
- Switch objects and change SubD level/Mirror; verify visible surfaces and picking update.
- Toggle Studio/Wire and Clean/Soft; selection/cage restoration and navigation remain sane.
One root-owned active SubD buffer retained; changed displays still rebuild. Main850,
unchanged CPUcache812/manager849, shell/recovery850; protected/frozen sources untouched.


## .851 vertex-mode-only dots — 2026-10-14

User-requested behaviour, not yet device PASS: visual vertex markers only in Vertex
mode; cage lines remain Face/Edge/Object. Keep invisible indexed proxies every mode
for ray-picking/snapping/bridge. Clean/Soft and Show Cage/group/Boolean suppression
still apply; entering Vertex must not forcibly reveal a suppressed cage.
Automated three native regressions: repeated native mode cage rebuilds/selected
materials/indexed real raycasts, shared geometry lifetime and Clean845/Soft846 owners.
810 original topology/material/order/picking/Lasso/bridge contracts retained; visible
marker/dense Face assertions updated for intentional requested presentation change.
Full local2276PASS/0FAIL/0skip. Main851→builder851/shell/recovery851 reviewed.
Manual pending:
- Face→Edge→Object: lines without dots. Vertex: dots return, selecting shows highlight.
- Vertex select/Lasso/move→Undo/Redo→mode switch: normal picking and navigation.
- Clean On/Off and Soft/Full across modes: correct restoration; no dots outside Vertex.
850 device geometry/timing gate remains pending; no new PASS inferred.


## .850 user PASS protected / .851 performance capture — 2026-10-14

User explicitly reports .850 PASS on2026-10-14: protect active SubD geometry reuse,
selection/edit/UndoRedo/modifier/render-look baseline. Attached screenshot visibly851:
94rebuilds mean6.2/max39ms; Body1.0/9ms, Base/SubD4.1/17ms, Scene0.8/18ms,
Inactive0.5/18ms, Cage0.1/6ms; active64hits/30misses, inactive194hits/2misses,
59FPS displayed. Capture is851 evidence, not a controlled850 benchmark or explicit
851 Vertex-mode visibility PASS. Keep851 hands-on gate pending; no new build.


## .851 user PASS protected / .852 unused-base render gate — 2026-10-14

User851 PASS: protect Vertex-only visual dots, Face/Edge/Object lines, selecting/moving/
UndoRedo/mode transitions and Clean/Soft compatibility.850 PASS also protected.
Automated852 native render/kernel tests: unused-base call avoidance, exact visible
surface/cage parity across SubD/Mirror/ShowCage toggles, direct edits/Undo and original
fresh independent base export.812 fixture timing updates reflect removed2ms base work;
phase/counter/lifecycle coverage retained. Full2278PASS/0FAIL/0skip.
Manual852 pending:
- SubD edit/select→Undo/Redo; visible shape/picking and navigation remain correct.
- Mirror On/Off + Show Cage toggle + SubD Off/On: surface/cage updates correctly.
- Base OBJ export remains correct with Mirror;851 dots return only in Vertex.
Main852→builder851/cache812 unchanged; shell/recovery852 and protected pins coherent.
No new cache/kernel/history/visibility owner and no quantified hardware gain claimed.


## .853 Loop/MultiLoop finish regression — 2026-10-14

User852 FAIL scoped to Loop completion: yellow/blue rails and5active loops in Face;
screenshot topology counts increased. Keep851 PASS protected;852 acceptance pending.
Automated: actual batch proxies + native single/5cuts + placed slide/commit detect
cageMaterial yellow, exact shape and oneUndoRedo. Native main disarm/finish clears
slide groups/slider while preserving cuts; busy guard and rearm remain. Original632/
715/713 semantic tests retained; commit pin advanced853 through reviewed asset graph.
Full2280PASS/0FAIL/0skip; main853/commit853/shell/recovery853 coherent, kernel unchanged.
Manual pending853:
- Fresh cube Edge Loop1 then5; cut/slide→EXACT→background exit: rails clear.
- Enter Face and select/move a cut patch; confirm real faces, Undo/Redo restores cuts.
- Repeat cuts on another edge, then exit directly via Face or another tool: no stale
  yellow/blue lines or active-loop count. Vertex-only dots/Clean/Soft still sane.


## .853 user PASS protected / .854 native Loop completion — 2026-10-14

User853 PASS protects Loop1/MultiLoop5 completion, rail cleanup, editable cut faces,
repeat/background/Face exit and UndoRedo.851 and850 accepted protections retained.
Automated854 actual main + commit adapter + native kernel/history checks:1/5cuts with
placed slide, unchanged live mesh and undo/redo token identity, original geometry,
no synthetic Undo/Redo clicks, native redraw and busy/no-stage refusal.632 source
history guard updated to native cleanup/no replay;715/746/853 fixtures use native cleanup
and retain original output/selection/UndoRedo assertions. Full2282PASS/0FAIL/0skip.
Manual pending854:
- Single/MultiLoop cut→slide→EXACT→repeat on another edge→background exit.
- Switch Face, select/move a cut face; no active yellow/blue rails remain.
- Undo/Redo through cuts and placement: completion adds no extra step.
Main854/commit854/shell/recovery854 coherent; no topology/history/gesture changes.


## .854 user PASS protected / .855 imported-resource scene history — 2026-10-14

User854 PASS protects native Loop EXACT/repeat/exit/UndoRedo.853/851/850 retained.
Automated855 actual scene History/manager: imported object delete→UndoRedo resources,
reference/embedded-byte/UV/morph preservation without buffer clones, payload replacement
uses correct snapshot (not current object), absent payload unchanged, basic v1 codec
still rejects rich resources. Native GLB geometry/UV export + final metadata/material/
image-byte patch tested separately; Node image decode/WebGL not claimed. Full2285PASS/
0FAIL/0skip. Management855/drawer855/shell+recovery855 reviewed; other owners untouched.
Manual855 pending:
- Import known UV/material GLB with another editable object present; delete imported
  object, Undo→Redo→Undo and check restored geometry.
- Export restored GLB to Nomad; check known UV/texture/material data remains available.
- Plain .boxlab Save/Open sanity; rich imported scene should still refuse basic Save.
Imported payload is read-only shared history data. Future editors must replace it via
copy-on-write; file-resource encoding is separate and not enabled in this build.


## .855 user PASS protected / .856 imported GLB project roundtrip — 2026-10-14

User855 PASS protects scene history imported resources;854/853/851/850 retained.
Automated856 five native tests: payload+binary canonical JSON roundtrip, independent
byte buffers, plain v1 unchanged, corrupt/version/base64/size/finite/unsupported owners,
actual SaveOpen/native manager restore, cancellation/invalid data/history preservation,
render rollback and Save32MB refusal.855 other-resource refusal retained while supported
imported payload encodes;829 Open status assertions updated, original behavior retained.
Full2290PASS/0FAIL/0skip; codec/resource/management/drawer/manager/shell/recovery856 reviewed.
Manual856 pending:
- Independent imported UV/textured GLB→Save .boxlab→reset→Open saved .boxlab.
- Export restored GLB to Nomad; compare geometry, UVs/materials/textures.
- Plain or LiveArray .boxlab SaveOpen; cancel replacement leaves current scene, successful
  Open resets Undo as before. Loop EXACT/repeat remains correct.
Embedded images supported; file32MB/pool24MB limits. Linked imported resources and other
resource owners still refuse; no texture rendering/editing/unwrap/dedup claim.


## .857 existing SubD Live Array editing — 2026-10-14

856 scoped issue: LiveArray Edit refuses after enabling SubD; no856 resource PASS inferred.
Automated857 three native manager/Array/source/history/codec tests protect SubD retained
for existing count/END Apply, actual subdivided output parity, source isolation Apply/
Cancel/UndoRedo, one object/history/recipe/settings, .boxlab reopen and conversion.
New Live creation with SubD and Mirror still refuse;844 invalid-context test now Mirror,
other guards retained. Three old Array cache expectations advanced857, semantics retained.
Full2293PASS/0FAIL/0skip. Parent/children/shell/recovery857 reviewed, evaluator842 unchanged.
Manual857 pending:
- Make Live Array→SubD On→Edit Array count/END→Apply; repeat Cancel; SubD stays enabled.
- Edit Source with SubD On→component change→Apply Source/Cancel→UndoRedo.
- Save/Open .boxlab and reopen Array; keep SubD level and count/END settings.
Preview remains source-cage guide; committed result uses existing SubD rendering owner.
856 imported-resource .boxlab roundtrip gate still pending; prior accepted gates retained.


## .857 Apply acceptance / refresh clarification — 2026-10-14

User first reported857 unchanged, clarified failure on Apply Array, then explicitly
reported it works now and suspected updated-file refresh. Protect existing Live Array
Apply with SubD enabled. Initial failure is superseded for this device case; stale
asset cause is user-reported, not independently reproduced. No additional code/build.
Source-edit/conversion/file gates not separately confirmed;856 resource-file gate still
pending. Keep857 published implementation and reviewed cache graph; no speculative repair.


## .858 shared embedded project images — 2026-10-14

857 Apply/SubD accepted and protected, other pending gates not inferred. Four native
codec/Open regressions: identical bytes stored once across shared/equal buffers, distinct
bytes remain distinct, independent image/material/UV definitions, new decoded read-only
shared bytes, fixture size reduction, exact856 inline/plain roundtrip, bad pool bytes/
refs/version and actual legacy/new Open acceptance/rejection without scene replacement.
Full2297PASS/0FAIL/0skip. Pool references resourcev2; plain/inlinev1 remains supported.
Manual858 pending:
- Multi-object GLB sharing textures→Save .boxlab→reset→Open saved file.
- Export restored GLB to Nomad; verify every object's UV/materials/textures.
- Open an older856 resource project; re-save and compare size if images were duplicated;
  plain/LiveArray SaveOpen and SubD Array Apply sanity.
32MB project/24MB unique pool limits retained. Codec/resource/management/drawer858;
manager856/main+Loop854/Array857/protected/frozen unchanged. Future image edits must
copy touched buffers; read-only shared image data must never mutate across objects/history.


## .858 user PASS protected / .859 ordinary Duplicate GLB resources — 2026-10-14

User858 PASS protects shared-image pooled .boxlab Save/Open/export, legacy resource file
reopen/re-save and plain/LiveArray sanity.857 Apply/SubD acceptance retained separately.
Automated859: actual manager single and management Multi duplication share read-only
resource payload/bytes while geometry stays independent; plain+rich group duplication,
Move handoff, deleted-copy native scene UndoRedo, pooled codec + native project replacement,
real GLB UV export + original final material/image bytes, stale-topology UV rejection.
Node browser texture/image decoding remains separate; no new history transaction behavior.
Manual859 pending:
- Import known textured GLB; Object Duplicate, move copy; export Base GLB to Nomad and
  compare both objects' UV/materials/textures.
- Repeat with Multi selected imported objects; independent copies move normally.
- Save .boxlab→reset→Open→export; duplicate resources remain; delete a copy→Undo→Redo→
  Undo and export restored resources.
- Plain/group Duplicate and existing LiveArray+SubD Apply sanity.
Manager+management859/drawer859/shell+recovery859; original codec/resource858 and
protected/frozen kernels retained. Linked-rich project refusal unchanged. Future resource
editors MUST copy touched buffers and replace payloads rather than mutate shared data.


## .859 local validation — 2026-10-14

Full native Node regression:2300PASS/0FAIL/0skip, including three new duplicate-resource
checks. Reviewed release/cache contract passes; protected Multi1.0 and frozen betas
unchanged. Device859 duplicate→project→Nomad gate pending. Publication proof follows
in AI_HANDOFF/DEV_HISTORY after main/CI/Pages/live verification.


## .859 publication status — 2026-10-14

Complete local build3db33caa;2300PASS/0FAIL/0skip. Automatic approval review rejected
push to main despite recorded repository standing approval; direct authorization for
publication is now required by the review. Remote/live remain858.859 CI/Pages/live
verification and device gate pending. See AI_HANDOFF publication block; do not claim859
published or route around rejection through another tool.


## .859 publication verified — 2026-10-14

Direct user standing authorization supersedes prior approval block. Release
d7dae3c8147373920e9c526f0b6eb36e5482e4bc/tree4008eb4179031b70f4882bdb0f729f96b658c267
match local validated files. CI38541026468/job115775518061 SUCCESS2300/0/0skip;
Pages38541024866 SUCCESS. Live shell/manifest/manager859/management859/drawer859 and
protected Multi1.0/frozenBeta7 version match.859 device gate pending.


## .860 independent editable Live Array duplication — 2026-10-14

Three native tests execute existing single/Multi duplicate owners with actual manager:
- Separate deeply copied source vertices/faces/count/END rotation/scale/frame; geometry,
  SubD/settings and Move handoff retained. Exact affine rotation/nonuniform scale/move
  reopens correctly; mixed/group plain+LiveArray copies keep independent recipe status.
- Copy count/END Apply, source Cancel/Apply and source edit UndoRedo preserve original;
  copied object remains one editable LiveArray and uses original geometry/history owners.
- Codec roundtrip and native atomic scene replacement retain independent recipes and
  SubD; successful Open clears old history.859 resource duplicate tests remain active.
Manual860 pending:
- Live Array with END rotate/scale→SubD On→ordinary Duplicate→move copy→reopen Array,
  change count/END→Apply. Original remains unchanged; both still one object each.
- Copy Edit Source→small face edit→Apply Source/Cancel; UndoRedo source change.
- Multi duplicate plain+LiveArray group, then Save .boxlab→reset→Open→reopen both arrays.
Known separate existing issue: some arbitrary-angle whole-array rotations/scales cause
reopenArray affine[15] roundoff after later count/END Apply, then source reopen refuses.
Reproduces without duplication. Repair next; no blanket transformed-array gate claimed.
No new native kernel/history/renderer; linked Duplicate/unchecked Array and protected/
frozen owners untouched. Publication/build validation follows in handoff/history.


## .860 local validation — 2026-10-14

Full native Node regression:2303PASS/0FAIL/0skip, including three new Live Array
duplicate tests and retained859 resource coverage. Reviewed shell/cache contract passes.
Protected Multi1.0/frozen betas unchanged; device860 gate and proven prior affine-tail
roundoff remain separate. Publication verification pending.


## .860 publication verified — 2026-10-14

Release40f638db7033dff8b79469e880531055a051cc72; tested tree
925bfba7f07e248a7c3ac58e0527ee693e3c68b7 exactly matches local.
Node22 CI38541986782/job115778710723 SUCCESS2303PASS/0FAIL/0skip;
Pages38541985896 build/deploy SUCCESS. Fresh live shell/manifest/manager860/
management860/drawer860, protected Multi1.0 and frozenBeta7 version byte-match.
Connected Git Data publication uses expected-main SHA and verified file/tree hashes.
Device860 duplicate/source/file gate pending;859 imported-duplicate/Nomad gate
not yet accepted. Next proven original-array affine-tail rounding repair remains queued.


## .861 arbitrary affine Live Array reopen — device gate pending2026-10-14

Native regressions: repeated arbitrary XYZ rotation/nonuniform scale and count/END
edits preserve geometry/first item/canonical inferred tail and project roundtrip.
Actual Array Apply→Edit Source→Cancel/Apply→UndoRedo keeps SubD and recipe. Strict
external near-affine recipe/project refusal and non-affine component guards retained.
Manual861 pending:
- Live Array→whole-object Rotate (e.g.17°,31°,27°) and nonuniform Scale→Edit Array;
  change count/END rotation/scale→Apply→reopen and Apply again.
- With SubD enabled, Edit Source→small face edit→Apply Source; reopen→Cancel.
  Undo/Redo retains shape and editable recipe.
- Save .boxlab→reset→Open→reopen Array and Edit Source successfully.
860 Duplicate and859 imported-resource/Nomad gates remain separately pending.
Only inferred reopen output gets a guarded canonical tail; external validation stays
strict. All loaders refreshed861; protected instance343/Multi1.0/frozen betas retained.


## .861 local validation — 2026-10-14

Full native Node24 regression:2306PASS/0FAIL/0skip. Three new native affine reopen
checks and all prior semantic coverage pass. Reviewed cache contract/shell markers
coherent; protected Multi1.0/instance343/frozen beta files untouched. Publication
CI/Pages/live verification pending; device gates not inferred.


## .861 publication verified — 2026-10-14

Releasef36b216a9c272a024e64f773279157858698cab2; tested tree
c94fbe5d4dd85b79ca536df549c190f8931b2f3a exactly matches fetched main.
Node22 CI38556571969/job115827100089 SUCCESS2306PASS/0FAIL/0skip.
Pages38556564998 build/deploy SUCCESS. Fresh postdeployment live shell/manifest,
core861/Array861/source-core861/source-editor861/codec861/management861/drawer861,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial asset reads
preceded completed deployment; complete postdeployment verification matches861.
All four handoff files current; device861 gate pending,860 duplicate and859 imported
resource/Nomad gates remain separately pending. No new user PASS inferred.


## .861 user PASS protected — 2026-10-15

User PASS accepts861 whole-array rotation/nonuniform scale→count/END Apply/reopen,
Edit Source Apply/Cancel with SubD, UndoRedo and .boxlab reopen. Strict external affine
validation and non-affine component refusal retained.860/859 pending gates stay separate.

## .862 imported UV inspection — device gate pending2026-10-15

Four native regressions: real GLB importer/exporter and .boxlab channel roundtrip,
read-only payload, original exporter topology/facegroup signature, coordinate-only edits,
stale/invalid/missing/partial channels; canvas tile/orientation/tiled/extreme finite UVs,
20000-corner budget; original MeshHealth launch/expand/Refresh/close/context lifecycle
without history writes. Full2310PASS/0FAIL/0skip. No browser visual proof (Chromium
archive download truncated); real iPad canvas/scroll/layout gate remains pending.
Manual862:
- Import known UV GLB→Object→Mesh Health→expand Imported UVs: face coverage and cyan
  outlines visible; grey square shows tile0–1. Plain cube reports no imported UVs.
- Close, make a topology edit, reopen: stale message and no layout. Undo the edit and
  reopen: UV layout returns. Inspection adds no Undo step.
- Save .boxlab→reset→Open→inspect again; original UV-bearing GLB export still works.
Base UV inspection only; no unwrap/painting/texture display or SubD/Mirror UV export.
Stats cover full channel; preview caps20000corners with displayed-face count when limited.
861 PASS protected;860 Duplicate and859 imported-resource/Nomad gates remain separate.


## .862 publication verified — 2026-10-15

Release47767d31bdcb54e23493fbe4a40adc4597592c1c; tested tree
e0fe02a94a7be968f147ff487e4c616c480aab65 exactly matches fetched main.
Node22 CI38658512748/job116173915714 SUCCESS2310PASS/0FAIL/0skip.
Pages38658512404 build/deploy SUCCESS. Fresh live shell/manifest, MeshHealth862/
inspection862 and protected Multi1.0/frozenBeta7 version byte-match repository.
861 user PASS protected;862 iPad layout/UV/stale-Undo/project checks pending. Separate
860 Duplicate and859 Nomad/resource gates not inferred. Four handoff files current.


## .862 user PASS protected — 2026-10-15

User PASS accepts imported UV face coverage/layout, plain-mesh no-channel state,
stale-after-topology-edit hiding→Undo preview recovery, and native .boxlab reopening.
Resources remain read-only; original exporter topology signature and history retained.

## .863 UV island/seam inspection — device gate pending2026-10-15

Four native regressions protect shared vertex-ID adjacency, winding-independent exact
UV endpoint matching, tiny intentional splits, point-touch/disconnected overlap,
missing UV borders/ambiguous non-manifold edge separation, stale refusal and full
connectivity beyond preview budget. Real GLB import→project→export stays unchanged;
no mesh.edges() side effects. Deterministic palette and orange seam sides bounded by
original preview budget. Original862 tests retained; full2314PASS/0FAIL/0skip.
Manual863:
- Known seamed GLB→Object Mesh Health→Imported UVs: island count/colours and orange
  seam sides visible. Grey tile and face coverage remain readable.
- Close→move a vertex: layout still available. Topology edit→reopen: stale preview
  hidden; Undo edit→reopen: island/seam view returns, no inspection Undo step.
- Save .boxlab→reset→Open→inspect: same counts/layout and normal GLB export.
Six-colour palette cycles. Islands are connectivity diagnostics, not overlap detection;
physical/missing-UV borders are not labelled interior seam edges. No UV authoring yet.
862/861 PASS protected;860 Duplicate and859 resource/Nomad gates stay separate.


## .863 publication verified — 2026-10-15

Release406cfd1f37ca9ab3e5eccaf7a6dd0c1ad59579ce; tested tree
3a8b20c62f2c5c86c3b3ea4d91135761ec46960b exactly matches fetched main.
Node22 CI38662867643/job116187970520 SUCCESS2314PASS/0FAIL/0skip.
Pages38662867413 build/deploy SUCCESS. Fresh live shell/manifest, MeshHealth863/
inspection863 and protected Multi1.0/frozenBeta7 version byte-match repository.
862 user PASS protected;863 iPad island/seam/coordinate-vs-topology/Undo/project gate
pending. Separate860 Duplicate and859 resource/Nomad gates not inferred. All four
handoff files current; no new authoring/channel/kernel/history owner.


## .863 user PASS protected — 2026-10-15

User PASS accepts island count/colours/orange seams, coordinate-only vs topology edit
stale handling and Undo recovery, .boxlab persistence.862/861 protections retained.

## .864 imported UV Rotate90° — device gate pending2026-10-15

Native regressions: payload copy-on-write/shared original unchanged, image/metadata
identity, live geometry unchanged, one actual scene UndoRedo step, project codec and
real Three GLB rotated UV attributes with prior tangent basis excluded. Guard linked/
locked/reference/procedural/stale/partial contexts and missing/failed history; central
UV no-op adds no checkpoint. Actual MeshHealth action delegates owner and refreshes.
Manual864:
- Valid UV-bearing GLB→Object MeshHealth→Imported UVs→Rotate UVs90°: visible layout
  rotation; four clicks return to starting orientation. Island/seam counts stay sane.
- Close→Undo→reopen, then Redo→reopen: old/new UV layout, unchanged model geometry.
- Save .boxlab→reset→Open→inspect→export Base GLB to Nomad: rotated UV map retained.
Plain/stale/incomplete/locked/linked/procedural meshes cannot rotate UVs. Base channel
only; existing evaluated SubD/Mirror UV-export restrictions stay. No UV unwrap/painting.
863/862/861 PASS protected;860 Duplicate and859 resource/Nomad gates remain separate.


## .864 local validation — 2026-10-15

Full native Node24 regression2318PASS/0FAIL/0skip, including four new UV authoring
checks and unchanged862/863 inspection coverage. Reviewed shell/cache graph coherent;
protected/frozen files unchanged. Device864 UV rotate/history/project/export gate pending.
Publication CI/Pages/live proof follows after verification.


## .864 publication verified — 2026-10-15

Releasec84b5c1b48034be7e597459c9c276e6d51df0dd7; tested tree
55358c7e8530028e071d44fbb502f01735e94ad6 exactly matches fetched main.
Node22 CI38664362797/job116192739572 SUCCESS2318PASS/0FAIL/0skip.
Pages38664361873 SUCCESS. Postdeployment live shell/manifest/MeshHealth864/edit864,
unchanged inspector863 and protected Multi1.0/frozenBeta7 version byte-match repository.
Initial reads preceded deployment; final complete graph matches864.863 user PASS
protected;864 iPad rotation/history/project/BaseGLB→Nomad gate pending. Separate860/859
gates not inferred; all four handoff files current. No geometry/kernel/schema changes.


## .864 FAIL native File NOMAD / .865 UV repair — 2026-10-15

User confirms failing route File→NOMAD. Do not infer a Base GLB or UV-rotation failure;
old native writer always stored zeros. Four new native tests check actual NOM UV binary
coordinates/independent face UV indices at seams, rotated→project→actual NOMAD download,
triangle/ngon correspondence/shared UV indices/mixed object offsets, invalid/stale/
partial/evaluated refusal. Full2322PASS/0FAIL/0skip; original native/GLB tests retained.
Manual865 (native Nomad compatibility pending):
- Known UV-bearing GLB→rotate UVs90°→File NOMAD with Base geometry→open in Nomad;
  inspect UV layout and seams in Nomad's UV view (not material appearance).
- Save/Open .boxlab and repeat File NOMAD: rotated layout preserved.
- Plain cube File NOMAD: geometry/groups intact; original Base GLB UV export sanity.
If known stored UVs cannot match evaluated geometry, NOMAD must give an explicit error
rather than a silent zero-UV file. Native materials/textures/layers not extended here.
864 broad acceptance pending;863/862/861 PASS and protected/frozen baseline retained.


## .865 publication verified — 2026-10-15

Releaseb080c811a3b4e901b4a360fb314f63adc38034de; tested tree
d548e4c2ff0bf1765933cbec32a9b511e6a06502 exactly matches fetched main.
Node22 CI38665811583/job116197395797 SUCCESS2322PASS/0FAIL/0skip.
Pages38665810713 build/deploy SUCCESS. Postdeployment live shell/manifest/export-panel865/
native-core865 and protected Multi1.0/frozenBeta7 version byte-match repository.
Initial reads preceded deployment; final complete graph matches865. Native Nomad UV
layout/seam device gate pending;864 FAIL recorded specifically on File NOMAD.863 PASS
retained; no native texture/material claim or new device acceptance inferred. Four
handoff files current; frozen donor/protected geometry owners unchanged.


## .865 user PASS protected — 2026-10-15

User Perfect PASS accepts native File NOMAD UV layout/seams, rotated layout and project
reopen→native export. Protect separate UV indices/counts and polygon-corner mapping,
original geometry/groups/header/donor and clear incompatible-UV refusal.864 native-route
FAIL superseded for this case; other pending gates not inferred.

## .866 imported UV Flip U/V — device gate pending2026-10-15

Four new native tests: U/V coordinate transforms, twice restores original, one actual
scene UndoRedo checkpoint per change, shared payload/images/metadata/peer independence,
geometry unchanged, project roundtrip, real native NOM UV/seam indices and Three GLB
UV attributes/tangent exclusion. Unsupported/stale/partial/axis/no-op guards and actual
MeshHealth actions retained. Full2326PASS/0FAIL/0skip; original rotate/NOM tests unchanged.
Manual866:
- Imported UVs→Flip U (horizontal)/Flip V (vertical): preview mirrors; repeat the same
  flip restores starting orientation. Rotate90° still works beside them.
- Close→Undo/Redo→reopen: expected UV map and unchanged mesh geometry.
- Save/Open .boxlab→File NOMAD with Base geometry: Nomad UV view keeps flipped layout
  and seams. Existing865 native gate is protected.
Whole imported layout only. Plain/stale/partial/locked/linked/procedural controls stay
unavailable. No projection/per-island transforms/unwrap/painting in this build.


## .866 publication verified — 2026-10-15

Release8186bf45691bed9b173d8db1af5033c136edec34; tested tree
cb39f28fdef41a49b0cb8bee2a05747cf3db611d exactly matches fetched main.
Node22 CI38676132706/job116230036867 SUCCESS2326PASS/0FAIL/0skip.
Pages38676132006 SUCCESS. Postdeployment live shell/manifest/MeshHealth866/edit866,
unchanged inspector863/export-panel865/native-core865 and protected Multi1.0/frozen
Beta7 version byte-match repository.865 native UV roundtrip user PASS protected;866
flip/history/project/native-export device gate pending. All four handoff files current;
no new device PASS inferred and no native schema/exporter/geometry changes.


## .866 user PASS protected / .867 UV workspace — 2026-10-15

- [x] User .866 PASS: Flip U/V, twice restoration, native history and UV roundtrip protected.
- [x] Full Node24 regression:2332PASS/0FAIL/0skip, six workspace regressions.
- [x] Same Mesh Health session/original canvas/edit buttons/native history; no duplicate edit kernel.
- [x] Scoped pan/pinch anchor continuation, Fit/bounded zoom, tap-history discrimination and pen/palm guard.
- [x] DPR sizing, observer/capture cleanup, close/reopen and both native keyboard Delete guards.
- [x] User867 PASS iPad: Mesh Health → Open UV Editor gives large readable layout; summary and controls visible.
- [x] User867 PASS Pencil/finger drag pans; pinch zooms; Fit restores; buttons remain tappable.
- [x] User867 PASS Rotate/Flip U/V → toolbar and two-/three-finger Undo/Redo restore exact layout.
- [x] User867 PASS Back to 3D ends session; original orbit/pan/pinch/selection work; reopen remains clean.
- [ ] File NOMAD Base after UV edits retains layout/seams in Nomad; Save/Open retains UVs.

Island picking/transforms and unwrap/painting are not implemented in867. Workspace device PASS is recorded above; new868 selection gate remains separate.


## .867 publication verified / user PASS — 2026-10-15

Release d7b43cac5313fcf01e2b3adfc45b82fc758d9916; tree
217eeca8a73a0d3cd3488cfc601ab6b42cb8af2f. Node22 CI38677757901 /
job116235131037 SUCCESS2332PASS/0FAIL/0skip; Pages38677757250 SUCCESS.
Live shell/version/workspace867/navigation867 byte-match repository before868 changes.
User Works well PASS accepts large workspace, navigation and session exit; protect
same canvas/controls/history and clean Back to3D. Native865 and866 protections retained.

## .868 UV island selection — user PASS2026-10-15

- [x] Full Node24:2337PASS/0FAIL/0skip; five native selection regressions.
- [x] Original island IDs and shared renderer/picker mapping after zoom/pan; UV data unchanged.
- [x] Continuous/stacked/boundary/concave/limited/stale picking; topmost stacked island only.
- [x] Single pen/finger/mouse short tap selects; drag/long/cancel/multitouch never picks.
- [x] Gold highlight, Clear/empty tap, report refresh/history/close resets; Fit retains selection.
- [x] Native edit/history/export owners unchanged; Rotate/Flip clearly affect whole layout.
- [x] User868 PASS iPad tap separate islands: selected island highlights and number updates.
- [x] User868 PASS Pan/pinch, then tap an island: highlight follows the visible island; Fit still works.
- [x] User868 PASS Clear Selection and empty tap clear; close/reopen starts with no selection.
- [x] User868 PASS Two-/three-finger Undo/Redo and Back to3D retain accepted867 behaviour.

Only previewed faces are pickable; stacked islands choose topmost. Selected-island
transforms, unwrap and painting are future work. Selection creates no Undo checkpoint.

## .868 publication verified — 2026-10-15

Release984c33265abc3118eb978121dac91737c8ac272c; tested tree
eebfa006c906772b0cfb8773e1dd9fe5541fbea1 exactly matches fetched main.
Node22 CI38696478096/job116294097328 SUCCESS2337PASS/0FAIL/0skip;
Pages38696477599 SUCCESS. Live shell/version/MeshHealth/workspace/navigation/
inspector/edit868, unchanged native865, protected Multi1.0 and frozenBeta7 marker
byte-match repository. User867 PASS protected;868 island selection device gate
pending. No selected-island transforms or new UV/history/resource/export schema.


## .869 selected-island edits — user PASS2026-10-16

- [x] User868 PASS protected: selection/highlight/clear/navigation/history/session exit.
- [x] Full Node24:2341PASS/0FAIL/0skip; four native selected-edit regressions.
- [x] Original inspector full-face connectivity (including beyond preview); selected pivot at island bounds centre.
- [x] Existing UV edit transaction/native history/resource copy-on-write; other islands/peers/geometry unchanged.
- [x] Native project/NOM UV bytes/GLB export, no stale tangents; stale scope/topology/index/context/overflow refuse.
- [x] Selection survives only matching full membership after edit; history/close/refresh clears; original whole-layout maths retained.
- [x] User869 PASS Select island → Rotate90° / Flip U / Flip V: only that island changes, about its own centre.
- [x] User869 PASS Repeat same flip twice; selected highlight remains; Undo/Redo restores one operation at a time.
- [x] User869 PASS Clear Selection → buttons affect whole layout; pan/pinch/Fit and Back to3D retain868 behavior.
- [x] User869 PASS Save/Open .boxlab and File NOMAD Base preserve edited layout/seams in Nomad.

No island Move/Scale/unwrap/painting yet. User869 PASS is protected;870 has a separate device gate.

### .869 final scope-label correction

Final source review caught a text replacement also changing the no-selection label;
whole-layout maths stayed correct. Restore explicit whole-layout label when cleared,
add actual workspace assertions at open/clear and refresh only MeshHealth/workspace
cache keys to869.1 (shell/version869; internal MeshHealth stamp869). No new user PASS.

## .869 publication verified — 2026-10-15

Final release312e030d95bd582dcd641b1835ba13f77ef93e74; tested tree
b72f182c44f1cfbf61d686e4dbf9ceaaf8f74970 matches fetched main. Node22 CI
38724621405/job116387284480 SUCCESS2341PASS/0FAIL/0skip; Pages38724621331
SUCCESS. Live shell/version869, MeshHealth/workspace869.1, edit/inspector869,
nav868/native865/protected Multi1.0/frozenBeta7 marker byte-match repository.
Final label correction included;868 user PASS protected.869 selected-island edit,
UndoRedo and project/native Nomad device gate pending. Repeated /nextbuild during
publication continued the active release; no869 PASS or later build is inferred.


## .870 selected-island numeric Move / Scale — user PASS2026-10-16

- [x] User869 PASS protected; selected/whole Rotate/Flip and native UV roundtrip retained.
- [x] Full Node24:2345PASS/0FAIL/0skip; four native numeric regressions.
- [x] Selected-only Move(U,V)/uniform positive Scale around island centre; original transaction/history/guards.
- [x] Other islands/geometry/shared resources/peers unchanged; native UndoRedo/project/NOM UV bytes/GLB attributes.
- [x] Zero Move/Scale1 no checkpoint; blank/nonfinite/nonpositive/stale/locked/overflow refuse.
- [x] Original workspace numeric delegation/disable/validation, reopen defaults0/0/1 and input Backspace.
- [x] Select island → ΔU0.1 / ΔV0 → Move: only that island moves right; ΔV0.1 moves up.
- [x] Scale0.5 then2: selected island shrinks then returns about its own centre; other islands stay put.
- [x] Undo/Redo steps through numeric edits; Clear disables Move/Scale; Rotate/Flip and pan/pinch still work.
- [x] iPad numeric entry/backspace and close/reopen work; Save/Open→File NOMAD Base retains edited UVs/seams.

Numeric Move/Scale are selected-only; canvas drag remains pan. No unwrap/painting/new-mesh UVs yet.

## .871 Pencil Move for selected UV islands — user PASS2026-10-16

- [x] .870 user PASS protected; exact Move/Scale retained under collapsed disclosure.
- [x] Actual canvas-owner Pencil preview is read-only; one original Move transaction at lift.
- [x] Native history/peer/resource isolation, seam-side preview, stable projection, DPR/zoom mapping.
- [x] Jitter/cancel/lost capture/report/lock/resize/Fit/history/close do not commit previews.
- [x] Finger/pinch/background Pencil navigation and palm suppression; stale context refuses.
- [x] Tap an island; Pencil-drag it right/up: island and orange seam outlines follow, others stay fixed.
- [x] Lift, drag again; one Undo per stroke and Redo restores. No tiny-tap movement or view jump.
- [x] Finger pan, pinch zoom, background Pencil pan, Fit and two-/three-finger UndoRedo still work.
- [x] Back to3D, Save/Open and File NOMAD Base retain moved UVs/seams; optional Exact controls still work.

Pencil Move accepted; Pencil Scale ships in872, with Rotate to follow after feedback.

## .871 publication verified — 2026-10-16

Release bb0191af0c7ee0266d95662b1ec2073f9eb12224; tested tree
7d6ea21850ddeb29b9a4189cd25c5ba2cfa5b1d0 exactly matches fetched main.
Actual Node22 CI38818127353/job116707802378 SUCCESS2349PASS/0FAIL/0skip;
Pages38818126928 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth871/workspace871/edit871/inspector871, unchanged navigation868,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial live reads
preceded deployment and returned870; final complete graph matches871. All four
handoff files current. User870 PASS protected;871 Pencil feel/navigation/history/
project/native-export device gate pending. Scale remains numeric under Exact;
Pencil Scale/Rotate follow feedback, no871 user PASS inferred.

## .872 Pencil Scale for selected UV islands — user PASS2026-10-16

- [x] User871 PASS protected; default Pencil Move, native history/navigation/export retained.
- [x] Actual workspace Scale uses original transaction once on lift; preview/payload/resource isolation.
- [x] Shared full-island pivot beyond preview budget, selected seam-side isolation and stable projection.
- [x] Cancel/mode switch/no-op/jitter/horizontal/locked/stale guards, positive limits and reopen default.
- [x] Select island → Scale → Pencil-drag up/down: enlarge/shrink about its centre; other islands stay fixed.
- [x] Lift, repeat, Undo/Redo: one step per stroke. Live factor and seam outlines match committed result.
- [x] Switch back to Move; Pencil Move, finger pan/pinch and background Pencil pan still work.
- [x] Save/Open → File NOMAD Base preserves scaled UVs/seams. Optional Exact Scale still works.

Pencil Rotate is next after feedback. No new unwrap/painting/mesh UV channel in872.

## .872 publication verified — 2026-10-16

Release bbb8efdfa00b6ccc073400a9f36339fdb1c8808f; tested tree
9a4a162fa38eaff472a1596fdc1204a612dc6ea8 exactly matches fetched main.
Actual Node22 CI38823964047/job116726929368 SUCCESS2353PASS/0FAIL/0skip;
Pages38823962841 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth872/workspace872/edit872/inspector872, unchanged navigation868,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial live reads
preceded deployment and returned871; final complete graph matches872. User871 PASS
protected;872 Pencil Scale/navigation/history/project/native-export device gate
pending. All four handoff files current; Pencil Rotate next after feedback.

## .873 Pencil Rotate for selected UV islands — user PASS2026-10-16

- [x] User872 PASS protected; Pencil Move/Scale, scene history/navigation/export retained.
- [x] Existing transaction + shared point maths; read-only preview, full-island pivot and isolated seam sides.
- [x] Quarter-turn parity, arbitrary-angle project/actual NOM/GLB UVs, peer/resource/history isolation.
- [x] Cancel/mode switch/jitter/vertical/full-turn/stale/locked/overflow refusal and default Move.
- [x] Select island → Rotate → Pencil-drag right/left: centred rotation with live angle/seam preview; others fixed.
- [x] Lift, repeat, Undo/Redo: one native step per stroke. Rotate90/Flip still work.
- [x] Switch Move/Scale; Pencil edits and finger pan/pinch/background Pencil navigation remain good.
- [x] Save/Open → File NOMAD Base preserves rotated UV layout/seams.

No new unwrap/new-mesh UVs/painting in873. Device873 acceptance remains separate.

## .873 publication verified — 2026-10-16

Release 0087d2cbe3d8fd00d586619ebd890c0f4668e4a9; tested tree
015ab6da6fb23c90e3a9c1924faac9fac1f39927 exactly matches fetched main.
Actual Node22 CI38826931252/job116736445051 SUCCESS2357PASS/0FAIL/0skip;
Pages38826931247 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth873/workspace873/edit873/inspector873, unchanged navigation868,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial live reads
preceded deployment and returned872; final complete graph matches873. User872 PASS
protected;873 Pencil Rotate/navigation/history/project/native-export device gate
pending. All four handoff files current; next UV-authoring stage needs owner audit
and873 feedback. No new unwrap/new-mesh channels/painting or device PASS inferred.

## .874 Fit selected UV island to tile — user PASS2026-10-16

- [x] User873 PASS protected; Pencil Move/Scale/Rotate/navigation/history/native export retained.
- [x] Selected-only proportional centring/2% margin, full island beyond preview, shared bounds owner.
- [x] One checkpoint/COW resource isolation; repeat no-op; stale/locked/zero-extent/extreme/tiny guards.
- [x] Actual workspace cancels Pencil preview; view Fit is navigation; native project/NOM/GLB coverage.
- [x] Move/scale island outside tile → Fit to tile: centred fit, proportions retained, others fixed.
- [x] Undo/Redo restores fit in one step; repeat Fit to tile adds no extra Undo step.
- [x] View Fit changes only framing; Pencil Move/Scale/Rotate, finger pan/pinch remain intact.
- [x] Save/Open → File NOMAD Base preserves fitted layout/seams.

Selected fit only; no automatic island packing/new-mesh UVs/unwrap/painting in874.

## .874 publication verified — 2026-10-16

Release 594de3e95bb49dccc8484be92030f6d80fe9ad7a; tested tree
46c868ca785f9dc84744606f3345fd2becd14839 exactly matches fetched main.
Actual Node22 CI38852645045/job116817062661 SUCCESS2361PASS/0FAIL/0skip;
Pages38852644283 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth874/workspace874/edit874/inspector874, unchanged navigation868,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial live reads
preceded deployment and returned873; final complete graph matches874. User873 PASS
protected;874 fit/aspect/isolation/history/navigation/project/native-export device
gate pending. All four handoff files current; next native UV-channel/projection stage
requires owner audit and874 feedback. Selected fit does not pack multiple islands.

## .875 Native BoxLab planar UVs — user PASS2026-10-16

- [x] User874 PASS protected; original imported UV authoring/file/Nomad baseline retained.
- [x] Native sourceboxlab/v3 UV-only envelope, strict validation, legacy/plain/imported bytes retained.
- [x] XY/XZ/YZ same geometry; one original history checkpoint, repeated no-op/reprojection UndoRedo.
- [x] Native edits/Duplicate/deleted-copy Undo/project atomic replacement and actual NOM/GLB UV bytes.
- [x] Locked/reference/linked/procedural/imported/modifier/invalid/collapsed refusals and finite extremes.
- [x] Native Linked Duplicate refuses before mutation; resource-bearing Live Array remains refused.
- [x] Full local Node24:2368PASS/0FAIL/0skip;12 focused native/release checks PASS.
- [x] Plain mesh/SubD off → Object Mesh Health → UVs → Planar XY → Open UV Editor shows native layout.
- [x] Try XZ/YZ and Undo/Redo; Pencil Move/Scale/Rotate/Fit works on generated UVs, geometry stays fixed.
- [x] Save/Open .boxlab → reopen UV Editor → File NOMAD Base preserves created/edited UVs.
- [x] Existing imported UV mesh still edits/exports; Planar buttons stay disabled for imported resources.

Planar projection can overlap/collapse faces; no full unwrap/box mapping/painting or evaluated UVs yet.

## .875 publication verified — 2026-10-16

Release 6272110710d0a590c701d9c587c4cee3e6d12fdd; tested tree
66fd86f936273230409adf6bb56e1e88a80b5b55 exactly matches fetched main.
Actual Node22 CI38857230889/job116831332240 SUCCESS2368PASS/0FAIL/0skip;
Pages38857230399 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth/edit/manager/codec/resource/management/drawer875, unchanged workspace874,
GLB/native exporters865, protected Multi1.0 and frozenBeta7 version byte-match
repository. Initial live reads preceded deployment and returned874; final complete
published graph matches875. User874 PASS protected;875 native Planar/editor/history/
project/native Nomad device gate pending. All four handoff files current. Native
resource v3/sourceboxlab is explicit; no seam unwrap/painting/evaluated UV claim.

## .876 Native Box UVs — user PASS2026-10-16

- [x] User875 PASS protected; Planar/sourceboxlab/v3/native editor/history/export baseline retained.
- [x] Cube six disjoint noncollapsed islands/12seams, fixed directional cells, rectangular proportions/density.
- [x] Original one checkpoint/COW/Planar replacement/native Undo/no-op and selected-only edit isolation.
- [x] Native project/NOM independent UV pool+corner bytes/actual Three GLB UVs; guarded refusal coverage.
- [x] Cube/SubD off → Mesh Health→UVs→Box UVs→Open UV Editor: six separate coloured islands.
- [x] Pencil-move/scale/rotate one island; others stay fixed. Undo/Redo restores each action.
- [x] Planar→Box→Undo restores prior layout; repeated Box adds no Undo. Geometry unchanged.
- [x] Save/Open .boxlab → UV Editor → File NOMAD Base retains box panels/seams.

Axis-aligned box projection first; general directional patches may overlap/distort.
No seam unwrap/optimal packing/painting/evaluated UVs in876.

## .876 publication verified — 2026-10-16

Release 51e05f4cdccce9765ed3c3840680b19c520deb74; tested tree
88afe5f38e4c0f1d853752c6b927ecc54591165f exactly matches fetched main.
Actual Node22 CI38861934472/job116845958125 SUCCESS2373PASS/0FAIL/0skip;
Pages38861934138 build/deploy SUCCESS. Fresh live shell/manifest, MeshHealth/edit876,
unchanged workspace874/GLB+native exporters865/protected Multi1.0/frozenBeta7 version
byte-match repository. Manager/codec/resources875 and all protected/frozen owners
unchanged. User875 PASS protected;876 Box panels/selected edits/history/project/
NOMAD Base device gate pending. All four handoff files current. No general seam
unwrap/optimal packing/painting/evaluated UV claim; directional patches may overlap.

## .877 Native Cylinder UVs (Y) — user PASS2026-10-16

- [x] User876 PASS protected; Box/Planar/native v3/editor/history/NOMAD Base retained.
- [x] Upright closed cylinder: one measured-edge strip/two caps, deterministic seam, native one-step history/no-op.
- [x] Odd rings/height bands/side+cap density, geometry/peer/island isolation and guarded refusals.
- [x] Full local2378PASS/0FAIL/0skip; native GLB preserves all seam+cap UV variants; imported pole-weld path unchanged; actual NOM/project/GLB checks.
- [x] Upright Cylinder/SubD off → Mesh Health→UVs→Cylinder UVs (Y)→Open UV Editor: strip plus two caps.
- [x] Pencil-edit side/cap separately; other islands fixed. Undo/Redo and repeated mapping behave correctly.
- [x] Save/Open .boxlab → UV Editor → File NOMAD Base retains layout/seams; Base GLB also retains seam/caps.
- [x] Existing Box/Planar and imported UV workflows still behave as accepted.

Round aligned world-Y rings first; no general seam unwrap/elliptic mapping/painting/evaluated UVs.

## .877 publication verified — 2026-10-16

Runtime release `e1d5ccffd03941b982df25d9463de9b0746e5e4a`; tested tree `c872ec647f8a7188f227d48c6cfc5459237a4328` matched fetched main exactly. Actual Node 22 topology CI run 38865991906 / job 116858835631 succeeded: **2378 PASS / 0 FAIL / 0 skipped**. Pages run 38865990703 build and deploy succeeded. Fresh live shell, manifest, Mesh Health/edit/GLB panel .877, unchanged UV workspace .874, native NOM core .865, protected Multi .1.0, and frozen beta-7 version all byte-matched repository files.

User .876 PASS remains protected. The .877 device gate remains pending: upright round world-Y Cylinder UVs, independent Pencil edits, Undo/Redo, project persistence, NOMAD Base and native GLB seam checks. No general unwrap, elliptic mapping, painting, or evaluated-modifier UV claim. All four continuity documents are current.


## .878 UV Editor checker reference — user PASS2026-10-16

- [x] User .877 PASS protected; Cylinder/Box/Planar/imported native history/project/export baselines retained.
- [x] Shared renderer projection/picking/DPR parity, clipped bounded256cells, extreme/tiled/offscreen/stale guards.
- [x] Checker under island selection/seams; payload/report read-only; no edit/history callback from toggle.
- [x] Actual workspace cancels pending Pencil/capture, retains view/selection, refresh preference, reopen off.
- [x] Full local Node24:2381PASS/0FAIL/0skip. Original UV edit maths/export/render/kernel owners unchanged.
- [x] Open UV Editor → Checker: readable16×16 grid inside tile0–1; toggle off restores plain view.
- [x] Pan/pinch/+/−/Fit: grid and UV tile stay aligned, selection stays usable.
- [x] Pencil Move/Scale/Rotate and Undo/Redo work with checker; grid stays fixed while islands move.
- [x] Back to3D and reopen: checker defaults off; ordinary viewport navigation works.

2D reference only; 3D texture/stretch inspection and painting remain later stages.

## .878 publication verified — 2026-10-16

Release `7b7cf2751e371959437a6ad10601c930f727a64d`; tested tree `ef9e7b6005166f3c6e38eb93830963f11f513e36` exactly matches fetched main. Actual Node22 CI38867402179/job116863294620 SUCCESS **2381 PASS / 0 FAIL / 0 skipped**; Pages38867401881 build/deploy SUCCESS. Fresh live shell/manifest, MeshHealth/workspace/inspector/edit878, unchanged GLB panel877/protected Multi1.0/frozenBeta7 version byte-match repository. Native NOM865, manager/codec/resources875/nav868 and protected modelling owners unchanged. All four continuity documents current. User877 PASS protected;878 checker readability/navigation/Pencil/history/reopen device gate pending. This checker is a 2D reference only; 3D texture/stretch inspection remains the next audited stage.


## .879 temporary 3D UV Checker view — user PASS2026-10-16

- [x] User878 PASS protected: 2D checker/navigation/Pencil/history/reopen.
- [x] Original exporter triangulation/corner mapping; live positions/no import-fit restoration; concave and seam variants.
- [x] Missing/stale/partial/invalid/nonfinite/f32/over20k-corner refusal, safe full Solid fallback.
- [x] Actual Three overlay disposal once on native source-geometry cleanup or mode change; original body geometry/picking retained.
- [x] Actual render active bridge/inactive object/fallback/session-end UV refresh and Studio/Clay restoration.
- [x] Cylinder seam+cap variants preserved; preview leaves native NOM bytes unchanged; all export/history regressions retained.
- [x] Full local Node24:2386PASS/0FAIL/0skip; reviewed cache graph and all original8 view modes retained.
- [x] Cube→Box UVs or upright Cylinder→Cylinder UVs(Y), SubD off: VIEW→UV Checker shows checker over surface.
- [x] Orbit/pan/pinch remain normal; inspect box panels and cylinder side/cap seam.
- [x] UV Editor→Scale island→Back to3D changes checker size there; Undo/Redo restores it.
- [x] VIEW→Studio/Solid restores ordinary look; mesh without UVs remains plain in checker mode.

Base stored UVs only, maximum20,000 face corners; evaluated/linked/procedural/stale channels use Solid.
Temporary view only; no image painting/persistent materials/export changes.

## .879 publication verified — 2026-10-16

Release `6b20c3939a9ebe7b9847fdc0830adb565fd0a1ba`; tested tree `794865b855df33763e91136e5421b4933569507a` exactly matches fetched main. Actual Node22 CI38870113315/job116871955152 SUCCESS **2386 PASS / 0 FAIL / 0 skipped**; Pages38870112481 build/deploy SUCCESS. Final fresh live shell/manifest/render-owner/preview-child/export-panel879, unchanged workspace878/native NOM865/protected Multi1.0/frozenBeta7 version byte-match repository. Initial reads preceded deployment (old878/child404); final full graph matches879. All four continuity docs current. User878 PASS protected;879 surface checker/navigation/UV edit→session-exit/history/look-restoration device gate pending. Stored Base UVs only; unsupported/stale/over20k-corner objects use Solid; no painting/evaluated UV propagation claim.


## .880 embedded colour-image reference — user PASS2026-10-16

- [x] User879 Perfect PASS protected: 3D checker/navigation/Pencil/session refresh/history/look restoration.
- [x] Actual GLB importer image/material shape and codec byte continuity; original resources shared read-only.
- [x] Used material UV0/core PNG/JPEG source resolution; transform/extension/external/missing/bad/over8MB refusal.
- [x] Bounded1024 bitmap decode, off/select/close cleanup, late result close, canceled-before-start skip, same-image reuse.
- [x] Shared projection/V0 vertical orientation, clipping/draw order, read-only report and picking/UV maths unchanged.
- [x] Actual workspace image toggle/source chooser, Pencil cancellation/view+selection retention, native/plain disabled.
- [x] Full local Node24:2391PASS/0FAIL/0skip; surface checker/render/export/protected/frozen owners retained.
- [x] Import GLB with embedded base-colour image (Split groups off) → UV Editor→Image: image behind UVs, correct orientation.
- [x] Pan/pinch/Fit; Pencil Move/Scale/Rotate over stationary image, Undo/Redo; original checker still works.
- [x] If multiple compatible materials exist, image chooser changes reference; Back to3D/reopen defaults Image off.
- [x] Save/Open .boxlab → UV Editor→Image still works; plain/native meshes keep Image disabled.

Whole selected source-image reference in tile0–1, not per-face material/PBR rendering, wrapping, 3D image texturing or painting.
Only embedded PNG/JPEG UV0 without texture transforms, ≤8MB source; reference decoding requires browser createImageBitmap.


## .881 active-object UV Image surface — user PASS2026-10-16

- [x] .880 Perfect PASS protected: image reference/orientation/Pencil/chooser/project persistence.
- [x] Single-used opaque image/material/sampler guards, codec/resource read-only identity.
- [x] Real Three source UVs, V0 orientation, sRGB/linear factor, wrap/filter/double-side mapping.
- [x] Original source geometry/picking retained; geometry/material/texture/bitmap disposed once.
- [x] Async cancellation-before-start, late results, decode failure and mode/rebuild cleanup.
- [x] Actual render active-only/Base guards, inactive Solid, UV session refresh and look restoration.
- [x] Native NOM/project/image bytes and GLB UVs retained; full local2396PASS/0FAIL/0skip.
- [x] Single-material textured GLB/SubD off → VIEW→UV Image: colour image correctly oriented on active object; orbit/pan/pinch normal.
- [x] UV Editor→Pencil Move/Scale island→Back to3D: surface updates; Undo/Redo restores layout.
- [x] VIEW→Studio/Solid restores ordinary look. Switch active object: only active supported object receives image.
- [x] Plain/native/mixed-material/SubD objects remain Solid; existing UV Checker and UV Editor Image still work.

Temporary unlit active Base inspection only, one opaque embedded PNG/JPEG UV0 material,
≤8MB source/1024² bitmap/20k corners. No painting or persistent material/export changes.


## .882 exact face-material UV Image — user PASS2026-10-16

- [x] User881 PERFECT PASS protects active-image/navigation/Pencil→surface/history/look restoration.
- [x] Actual GLTFLoader/parser associations preserve reversed IDs with identical material names through logical merge/weld/quad import.
- [x] Removed-face IDs drop correctly; cross-material equal-name triangles cannot merge; same-material quad path retained.
- [x] Exact optional payload mapping/signature survives existing codec; legacy files never guess assignments.
- [x] Original preview geometry material slots align with triangle positions/UVs; stale/bad maps refuse; ordinary checker/export grouping unchanged.
- [x] Real Three multi-slot image/factor/sampler mapping, serial all-ready display, cancellation/failure/budgets and exact-once disposal.
- [x] Actual File GLB callback supplies associations; editable OBJ callback remains independent.
- [x] Full local2402PASS/0FAIL/0skip; all prior881/880/879 semantic tests retained.
- [x] FRESH import GLB with2–4 opaque embedded-image materials, Split groups OFF/SubD OFF → UV Image: distinct images occupy correct face areas.
- [x] Pencil UV edit→Back to3D updates affected areas; Undo/Redo restores them. Orbit/pan/pinch unchanged.
- [x] Save/Open .boxlab retains multi-material UV Image assignment; switch Studio/Solid and back safely.
- [x] Existing single-material GLB still works; unsupported/legacy mixed-material inputs remain Solid.

Fresh import required for old mixed-material projects. Active Base only, max4 opaque
image materials/8MB encoded aggregate/1024² per decode; all-or-Solid. No painting or
persistent material changes. Existing multi-material GLB OUTPUT patcher repair remains
separate;882 preview/codec tests do not claim that export route is repaired.


## .883 exact GLB material handoff — device gate pending

- [x] .882 PASS protected including intentional active-only image view; native missing-texture report is a separate failure.
- [x] Actual Three GLB triangle/material/UV mapping and original group table/IDs retained across material splits.
- [x] Multiple objects retain distinct global material/texture bases even with identical names.
- [x] Final embedded image bytes, five core texture slots/samplers/alignment verified; Node private verification input avoids image decoding only.
- [x] Selected UV edit + resource project roundtrip retains exact GLB material mapping.
- [x] Missing/stale/invalid/evaluated multi-material assignments refuse; failure cleanup and subsequent valid export pass.
- [x] Full local2407PASS/0FAIL/0skip; native NOM865 writer/donor and protected/frozen bytes unchanged.
- [ ] File format GLB + Base → Export/Save → Nomad: correct image on each area with original facegroups.
- [ ] Pencil UV edit→Base GLB→Nomad retains new UV layout and material placement.
- [ ] Save/Open .boxlab→Base GLB repeats correctly; ordinary single/plain GLB remains accepted.

## OPEN native File→NOMAD texture omission — user report2026-10-16

- [x] User explicitly confirms native File→NOMAD (.nom), not GLB; UVs survive, images do not.
- [x] Audit proves writer865 lacks imported image serialization; donor has no texture/image records.
- [x] User supplied textured native donor;884 audits exact image/material/header conventions.
- [x] First single-material colour-image implementation884 follows donor/byte/resource tests; full PBR/per-face native materials remain pending.
- [x] User884 PASS accepts native colour-image textures plus865 UVs; additional map slots tracked separately.

883 GLB repair is NOT acceptance/repair of native texture export. Do not infer NOM
image support from GLB final-byte assertions or native UV-only tests.


## .884 native colour-image export — user PASS2026-10-16

- [x] Real donor schema/header7/image descriptors/material colour slot extracted, SHA provenance recorded; no private pixels shipped.
- [x] Actual donor1.4MB JPEG retained byte-for-byte through native writer audit.
- [x] Original PNG/JPEG image bytes, native links/RGB factors/alignment/bounds; UV/geometry fields unchanged.
- [x] Multiple single-material coloured/plain objects, native-local image dedup, material/mesh offsets and counts correct.
- [x] Selected UV edit + resource project roundtrip retain native colour bytes; original scene payload unchanged.
- [x] Unsafe materials/UVs/samplers/missing/oversize/aggregate image budget refuse clearly.
- [x] ACTUAL File NOMAD action downloads .nom image-bearing bytes and reports colour image count.
- [x] No-image revision6/native UV tests retained; full local2412PASS/0FAIL/0skip.
- [x] ONE opaque image-material GLB, UV0/default repeat sampler/SubD off → File→NOMAD: image visible and correctly aligned in Nomad.
- [x] Pencil-edit one island → File→NOMAD retains moved UVs and image; original geometry/facegroups retained.
- [x] Save/Open .boxlab → File→NOMAD repeats; ordinary plain meshes still open normally.

FIRST COLOUR stage only. Native normal/roughness/metalness/displacement image maps and
per-face multiple materials are NOT implemented. Native visual success is not proven
by final-byte assertions; source≤8MB, total≤24MB, observed native revision7 for images.


## .885 native normal + emissive maps — smaller-case PASS; full-material FAIL resolved on887

- [x] User884 PASS protected: native colour image/alignment/Pencil UV repeat/project reopen.
- [x] Full material donor schema/provenance recorded; private pixels/file not shipped.
- [x] Shared embedded-image/material guards preserve prior880–884 choice/preview/native behavior.
- [x] Real native map slots, original PNG/JPEG bytes, normal scale/defaultY convention, emissive RGB/defaults.
- [x] Normal-only/emissive-only materials work without fake colour images.
- [x] Cross-slot/object image dedup, material links/counts/offsets and unchanged UV/geometry bytes.
- [x] Unsupported source/transform/UV/sampler/factor/budgets refuse; source resources unchanged.
- [x] Actual File NOMAD action + selected UV/project persistence + status counters verified.
- [x] Real donor normal1,248,872B and emissive2,754B hashes retained through native writer audit.
- [x] Full local2417PASS/0FAIL/0skip; original tests/protected/frozen/native donor retained.
- [x] Import one-material GLB with normal/emissive maps, SubD off→File→NOMAD: slots populated and visible bump/emission correct in Nomad.
- [x] Pencil UV edit→NOMAD keeps map alignment; original colour-image behavior retained.
- [x] Save/Open .boxlab→NOMAD repeats with normal/emissive resources intact.

Emissive effect follows source RGB factor (defaultblack). Roughness/metalness packed
channel conversion, displacement source binding and native per-face multi-materials
remain pending. HDR material extensions remain unsupported in native map route.


## .886 native roughness + metalness — full-material blocker resolved/accepted on887

- [x] User885 PASS protected: normal/emissive strengths/alignment/UV/project; colour884 and native UV865 retained.
- [x] Original packed ref resolver and native writer retained; green→roughness/blue→metalness, original resolution, separate donor slots/factors.
- [x] Actual per-pixel unpacking/valid PNG CRC+inflate/native image bytes; geometry/UV fields and source project resources unchanged.
- [x] All five core map slots coexist; source-buffer conversion once across objects; native dedup/offsets/counts and factor defaults guarded.
- [x] Selected UV/project continuity and snapshot-before-await isolation from ongoing scene edits.
- [x] Source/UV/sampler/factor/bit-depth/dimensions/orientation/alpha/encoded+aggregate budgets refuse; no silent packed-map loss.
- [x] Bitmap/canvas cleanup on failure; JPEG header checks and DOM canvas/toBlob fallback; browser transport adapted in Node.
- [x] ACTUAL File NOMAD waits, downloads real native PNGs, reports counts and restores button on failure; prior action semantics retained.
- [x] Full local2424PASS/0FAIL/0skip; reviewed cache graph; protected modelling/Multi/frozen betas/native donor unchanged.
- [x] One opaque-material GLB with packed roughness/metalness≤2048², SubD off→File→NOMAD: separate Roughness/Metalness slots and correct glossy/matte/metallic regions.
- [x] Colour/normal/emissive still present and correctly aligned; Pencil island edit→NOMAD repeat keeps every map aligned.
- [x] Save/Open .boxlab→NOMAD repeats with roughness/metalness maps intact; plain mesh still opens normally.

Conversion supports opaque8-bit embedded PNG/JPEG, no EXIF/eXIf orientation metadata,
UV0/default repeat sampler, one material per object. Source≤8MB, derived≤8MB/image,
native image aggregate≤24MB. No resampling/gamma/factor baking; scalar multipliers stored
in native factorRoughness/Metalness. Real Safari/Nomad appearance remains a device gate.
Displacement binding, native per-face materials and NOM import remain unimplemented.


## .887 large native colour image / project validation — user PASS2026-10-17

- [x] User885 FAIL screenshot886 recorded; exact FULL MATERIAL.glb SHA/metadata audited. Earlier smaller map PASS baselines protected, no blanket full-file PASS.
- [x] Original importer payload reproduces failure:11,121,601B colour exceeds inherited8MB preview guard; one opaque UV0/default-sampler material is otherwise supported.
- [x] Native raw colour/normal/emissive opt into existing24MB aggregate; preview8MB/1024² and packed8MB/2048² limits unchanged.
- [x] Exact original image bytes, native slots/offsets/counts/dedup;24MB boundary/oversize/aggregate/packed-policy guards.
- [x] Original project base64 validator no longer overflows stack on large images; strict alphabet/padding/canonical bits/length/pool/version checks retained.
- [x] Selected UV/resource repeat + ACTUAL File NOMAD downloaded bytes + ACTUAL pooled .boxlab Open handler pass.
- [x] Actual user-file native audit:5nativeimages/6faces/16,310,924B output; unchanged colour/normal/emissive hashes. Offline packed split is Pillow, not browser visual proof.
- [x] Actual5-image pooled resource roundtrip25,750,555B encoded /19,307,670B decoded retains all source bytes.
- [x] Full local2428PASS/0FAIL/0skip; parent/child cache contracts reviewed; protected modelling/Multi/frozen betas retained.
- [x] Supplied FULL MATERIAL.glb, SubD off→File→NOMAD downloads successfully and opens in Nomad with colour/normal/emissive/roughness/metalness slots intact.
- [x] Pencil-edit one UV island→NOMAD retains alignment of all supported maps.
- [x] Save/Open this textured .boxlab project→NOMAD repeats without validation errors; ordinary small/plain meshes still export.

Large-image preview may stay Solid under unchanged display budget; native export byte
copy does not require rendering that image. Opacity/displacement slots remain pending;
latest opaque NOM donor confirms opacity STORAGE only, GLB name-only extras need audit.


## .888 explicit Nomad displacement map — FAIL:24MB image budget on device

- [x] User887 PASS protects exact FULL MATERIAL native five-map export, Pencil UV repeat and large .boxlab Save/Open; prior885/886 reported blocker resolved for this case.
- [x] Paired GLB/NOM explicit slot reference and same6,200,450B16-bit PNG SHA proven; metadata-only provenance fixture, no private pixels shipped.
- [x] No image-name-only guessing: explicit version1 Nomad displacement slot + unique exact image definition + unique core texture link required.
- [x] Original16-bit image bytes/MIME/offsets, native slot/strength/midpoint/world setting, geometry+UV field bytes retained; no decode/reencode/bake.
- [x] Missing/ambiguous/unsupported/non-UV/transformed/sampler/factor/stale/evaluated inputs refuse; existing material/source/pool guards retained.
- [x] Native dedup/24MB aggregate includes displacement; packed/display/large raw source budgets unchanged.
- [x] Selected UV/project resource continuity, ACTUAL File NOMAD six-slot output/status and failure recovery; no scene/source mutation.
- [x] Actual user-file/resource-roundtrip audit22,511,792B native file/6images/6faces retains original colour/normal/emissive/displacement hashes and exact native scalar settings.
- [x] Full local2433PASS/0FAIL/0skip; narrow cache graph reviewed; protected modelling/Multi/native donor/frozen beta bytes retained.
- [ ] Same FULL MATERIAL.glb, SubD off→File→NOMAD: Displacement texture slot populated with the original image and saved strength/midpoint/world setting.
- [ ] Colour/normal/emissive/roughness/metalness remain intact; Pencil island UV edit→NOMAD keeps displacement aligned.
- [ ] Save/Open .boxlab→NOMAD repeats with displacement slot/settings intact; ordinary small/plain export still works.

Slot/settings handoff only: no BoxLab displacement display/geometry bake or strength
compensation for import-fit/baked object scale.16-bit bytes retained exactly. Explicit
Auto/UV + identity texture transforms only. Separate opacity image is absent from this
GLB; named-but-missing opacity is not evidence of usable pixels. Generic glTF displacement,
transparency, native per-face materials, painting and NOM import remain later stages.


## .889 scalar PNG encoding / native image-budget repair — user PASS2026-10-17

- [x] User88824MB FAIL recorded; earlier offline Pillow-encoded size estimate did not prove platform PNG output fits.887 PASS protected.
- [x] Original converter now uses real one-channel8-bit PNG encoder with adaptive filters/CRC/zlib; no platform RGBA PNG serialization, resize, gamma or lossy compression.
- [x] Independent Node CRC/inflate/inverse-filter checks preserve every G/B pixel, dimensions, factors/source resources; bounds/missing compression API/failure cleanup retained.
- [x] Existing886 tests retain semantics and use actual production PNG bytes; platform encoder calls zero, DOM canvas readback fallback retained.
- [x] ACTUAL File NOMAD six-map export at reported source byte sizes uses real production compression and fits24MB; original colour/normal/emissive/displacement bytes remain exact.
- [x] Native24MB guard still rejects excess sources, reports sources/converted MiB + object count; no content-based dedup or increased limits implied.
- [x] Actual user JPEG→production encoder:roughness2,035,568B/metalness1,948,291B; independent Pillow decode confirms all pixel bytes.
- [x] Actual source assets/native pipeline audit:image payload22,557,536B/21.51MiB with2,608,288B headroom; native file22,629,956B. Browser decode/readback adapted; no device PASS inferred.
- [x] Full local2436PASS/0FAIL/0skip; narrow cache graph and protected/frozen owners retained.
- [x] Reset scene; import FULL MATERIAL.glb ONCE; SubD off→File→NOMAD downloads without24MB error.
- [x] Nomad shows all six slots including original16-bit displacement; colour/normal/roughness/metalness/emissive alignment and saved displacement settings retained.
- [x] Pencil island UV edit→NOMAD and Save/Open .boxlab→NOMAD repeat normally.

If overbudget remains, capture complete sources/converted/object breakdown. Multiple
independent imports can still legitimately exceed24MB; pool dedup is buffer identity.
No source texture reduction, displacement amplitude compensation or BoxLab geometry bake.
Opacity and native multi-material/NOM import remain pending.


## .890 identical native image content — user PASS2026-10-17

- [x] User .889 PASS protects original full-material six maps, UV/project repeat; .888 reported budget case resolved by889.
- [x] Existing native table/layout retained; identical MIME/length/bytes share across independent source buffers; no scene/history/resource mutation.
- [x] Actual FNV collision does not alias; subarrays, MIME, different names/equal bytes and same names/different bytes covered.
- [x] Same helper governs async budget and native writer; equal packed sources convert once; equal converted slots count once; distinct unique sources still refuse above24MB.
- [x] ACTUAL File NOMAD two full-size independent six-map payloads, factors/names/UVs/native fields, project reopen and source independence.
- [x] Earlier budget fixtures now contain distinct bytes; all existing unsupported-map/budget assertions retained.
- [x] Full Node24 suite2440PASS/0FAIL/0skip; actual supplied source-image audit two objects/six images/22,557,536B payload, exact raw hashes and one packed decode.
- [x] Opacity donor audited: separate1024² opacity image absent from GLB; existing colour alpha/native opacity flag retained, no invented separate slot or transparency claim.
- [x] Reset; import FULL MATERIAL.glb TWICE, move one aside, SubD off; File NOMAD downloads and opens two objects with all six supported map slots.
- [x] Pencil-edit one object's UV island; repeat NOMAD export: independent UVs and maps remain aligned on both objects.
- [x] Save/Open .boxlab then NOMAD repeats normally; original single-import export stays correct.

Unique-image24MB pool and original raw24MB/packed8MB/2048²/display budgets remain.
No source texture resampling, material merging, geometry/UV/history/kernel changes.

## .890 publication verified — 2026-10-17

Runtime08f0256ef54901f205311b25d93b04b3250c2746; tested tree
c7f3fd960f69b86bba150b377cc84646f18ced47 exactly matches fetched main.
Actual Node22.23.3 CI38985850970/job117257022771 SUCCESS2440PASS/0FAIL/0skip;
Pages38985850874 build/deploy SUCCESS. Fresh live shell/manifest/recovery/export-panel/
packed-child/native-core890, unchanged scalar889/displacement888/protected Multi1.0
and frozenBeta7 marker all byte-match repository. Initial reads preceded deployment;
final graph matches890. All four continuity files current; proof changes docs only.
User889 PASS protected;890 two-independent-import/UV/project native device gate PENDING.


## .891 UV Normal / Emissive references — user PASS2026-10-17

- [x] User890 PASS protects repeated-import native dedup, individual UVs and project repeat.
- [x] Existing chooser/resolver/controller reused; optional slot list only for UV workspace, all default colour-only consumers retained.
- [x] Exact index/source binding, Material · map labels, UV0/PNG/JPEG/extension/missing/budget guards, original project bytes unchanged.
- [x] One1024² bitmap/8MB source, same semantic slot across refresh/shared image, stale-label prevention, async cancel/late/close cleanup.
- [x] ACTUAL workspace chooser cancels Pencil preview without edit/history, keeps view/selection, existing projection and Image-off reopen.
- [x] Supplied GLB audit resolves original normal1/1,248,872B and emissive2/2,754B; large colour still obeys original preview limit.
- [x] Full2443PASS/0FAIL/0skip; parent/child cache graph reviewed; protected/frozen and native export behavior retained.
- [x] Mesh Health -> UVs -> Open UV Editor -> Image: choose Normal then Emissive; images align with UV outlines.
- [x] Pencil Move/Scale/Rotate + UndoRedo and pan/pinch work over chosen reference; Back to3D/reopen starts Image off.
- [x] Save/Open .boxlab retains available image choices; File NOMAD still exports all six supported maps correctly.

Raw 2D references: normal strength/emissive factor and PBR lighting are not evaluated.
No painting/packed-channel/opacity/displacement inspection or 3D normal/emissive shading.

## .891 publication verified — 2026-10-17

Runtime278b0042b4a1815e1765cf69edd1a2462862e669; tested tree
fdf44a1b86e9faa474fe1b785e104a70a0a12a34 exactly matches fetched main.
Actual Node22.23.3 CI38987566193/job117262477050 SUCCESS2443PASS/0FAIL/0skip;
Pages38987566624 build/deploy SUCCESS. Fresh live shell/manifest/recovery/MeshHealth/
workspace/preview/surface/render/export/native-parent graph891, scalar889, protected
Multi1.0 and frozenBeta7 marker all byte-match repository. Initial reads preceded
deployment; final complete graph matches891. All four continuity files current.
User890 PASS protected;891 UV Normal/Emissive/Pencil/project/native device gate PENDING.
Proof is documentation-only; tested runtime bytes unchanged.


## .892 UV Roughness / Metalness references — user PASS2026-10-17

- [x] User891 PASS protects Normal/Emissive references, Pencil/navigation/history, Image-off reopen, project/native export.
- [x] Original chooser resolves exact packed ref: green->Roughness, blue->Metalness; no red/occlusion/name inference/factor baking/default colour-consumer change.
- [x] Actual <=1024² decoder readback -> opaque grayscale, original pixel orientation, Offscreen/DOM fallback, no PNG/second output bitmap or source mutation.
- [x] Bitmap closes on success/failure; scratch/output canvas resets on context/read/write/alpha/late-cancel/chooser/session cleanup.
- [x] ACTUAL workspace grayscale under original UV projection, Pencil cancellation/view/selection, reopen and unchanged resource bytes.
- [x] Actual supplied packed JPEG733,993B source audit, every transported1024² G/B pixel verified, original hash exact; browser visual gate separate.
- [x] Full2447PASS/0FAIL/0skip; reviewed parent cache graph; native maths/protected/frozen owners retained.
- [x] UV Editor -> Image -> Roughness (G), then Metalness (B): different grayscale maps under UV outlines; Normal/Emissive still available.
- [x] Pencil UV edits/UndoRedo and pan/pinch work; switching maps preserves view/selection; reopening starts Image off.
- [x] Save/Open .boxlab retains choices and edited UVs; File NOMAD still transfers six supported maps correctly.

Thumbnail raw-channel references, not PBR lighting or full-resolution numeric analysis.
One held <=1024² preview/8MB source; temporary scalar bitmap/canvas/readback bounded.

## .892 publication verified — 2026-10-17

Runtime68ee2db64bf7b3bd6bb4df7433141fef48db44f7; tested tree
ce6c0a21c0fd49925ed557d4997edbb5fa2e1b89 exactly matches fetched main.
Actual Node22.23.3 CI38991841599/job117275721906 SUCCESS2447PASS/0FAIL/0skip;
Pages38991841149 build/deploy SUCCESS. Fresh live shell/manifest/recovery/MeshHealth/
workspace/preview/surface/render/export/native-parent graph892, scalar889, protected
Multi1.0 and frozenBeta7 marker all byte-match repository. All four continuity files
current. User891 PASS protected;892 grayscale/Pencil/project/native device gate PENDING.
Proof is documentation-only; tested runtime bytes unchanged.


## .893 Pack all UV islands — user PASS protected

- [x] User892 PASS protects scalar/earlier map references, Pencil/navigation/history and project/native export.
- [x] Original UV inspector/edit/history owners; whole-layout grid1–128 islands,2% outer margin/gaps, common scale/orientation/relative density, deterministic and repeat no-op.
- [x] Geometry/resources/peers/source arrays unchanged; one native UndoRedo checkpoint, old tangents retired; original transforms unchanged.
- [x] Stale/context/incomplete/locked/history/zero-extent/extreme/collapsed f64+f32 edge refusal before mutation;128 allowed/129 refused.
- [x] ACTUAL workspace+MeshHealth works without selection, cancels Pencil, retains selected membership and uses original view Fit on success.
- [x] Actual project codec/native NOM independent UV indices+f32 corners/Three GLB UVs and tangent retirement.
- [x] Full2452PASS/0FAIL/0skip; narrow cache graph reviewed; protected/frozen/native owners retained.
- [x] Cube -> MeshHealth UVs -> Box UVs -> Open UV Editor -> Pack all: islands fit with gaps, whole result framed.
- [x] Move a selected island then Pack all: selection retained; UndoRedo restores layouts; repeated Pack all adds no extra Undo step.
- [x] Save/Open .boxlab and File NOMAD Base preserve packed layout/seams; Pencil/navigation/reference choices still work.

Manual UV layout operation: images stay fixed, so packing changes texture sampling.
Grid bounding boxes only; no optimal packing/unwrap/within-island overlap repair/painting.

## .893 publication verified — 2026-10-17

Runtimebbc0e4b20d55a47fbac9fa3daaa1b4a0c226a3e0; tested tree
efd82dfde462eca6e53e7ed61f23d8bf4332dc8b exactly matches fetched main.
Actual Node22.23.3 CI39003980800/job117312549657 SUCCESS2452PASS/0FAIL/0skip;
Pages39003980205 build/deploy SUCCESS. Fresh live shell/manifest/recovery/MeshHealth/
workspace/edit893, unchanged inspector880/preview/render/native892, protected Multi1.0
and frozenBeta7 marker all byte-match repository. All four continuity files current.
User892 PASS protected;893 Pack all/framing/history/project/native UV device gate PENDING.
Proof is documentation-only; tested runtime bytes unchanged.


## .894 Sphere UVs (Y) — user PASS protected

- [x] User .893 PASS protects Pack all/framing/selection/history/project/native export and prior Pencil/navigation/map references.
- [x] Same native UV projection/history owner; round Y-pole sphere, equirectangular layout, aligned seam, per-wedge pole UVs, no geometry changes.
- [x] Real UndoRedo/repeat no-op, copy-on-write peers, Box replacement and existing Pack all.
- [x] Minimum/odd/dense rings, Y rotation/translation, finite huge/tiny coordinates; unsupported/invalid/context/history refusals before mutation.
- [x] Actual MeshHealth callback/session guard; actual .boxlab, native NOM UV pool and Three GLB pole-variant preservation.
- [x] Full2457PASS/0FAIL/0skip; reviewed narrow cache graph; protected/frozen owners retained.
- [x] Add Sphere -> Object MeshHealth UVs -> Sphere UVs (Y) -> Open UV Editor: latitude layout inside tile; Checker/surface seam and pole appearance.
- [x] Pencil edit, Pack all, UndoRedo, pan/pinch remain usable; repeat projection adds no redundant Undo.
- [x] Save/Open .boxlab and File NOMAD Base preserve the sphere UV layout/seams.

Equirectangular pole distortion expected. Round Y-pole meshes with aligned longitude
rings only; no general deformed/Quadball unwrap, seam cutting, painting or new kernel.

## .894 publication verified — 2026-10-17

Runtime260817ff6794ce467346ad36dd8543978cdaf4d3; tested tree
60b9ca959af6b1c0e04bf766ea1aee8225390eda exactly matches fetched main.
Actual Node22.23.3 CI39005188711/job117316093356 SUCCESS2457PASS/0FAIL/0skip;
Pages39005188424 build/deploy SUCCESS. Fresh postdeployment live shell/manifest/
recovery/MeshHealth894/edit894, unchanged workspace893/inspector880/render892,
protected Multi1.0 and frozenBeta7 marker all byte-match repository. Initial reads
preceded deployment; final complete graph matches894. All four continuity files
current. User893 PASS protected;894 Sphere layout/Pencil/history/project/native UV
device gate PENDING. Proof is documentation-only; tested runtime bytes unchanged.


## .895 Equalize UV density — device gate pending

- [x] User .894 PASS protects Sphere UVs/seams, Pencil/Pack all/history/navigation/project and native export.
- [x] Original edit/history/workspace owners; all1–128 islands, same positive uniform scale per island about unchanged centre, average UV-area/Base-area ratio equal; total UV area preserved.
- [x] Mirroring/orientation/aspect/source geometry/resources/peers retained; tangent retirement, one native UndoRedo and repeat no-op.
- [x] Planar concave/quad/triangles, multi-face islands/full metrics beyond preview, normalized huge/tiny geometry; nonplanar/degenerate/nonfinite/stale/history/context/count/collapse/export overflow/new seam-join refusal.
- [x] Actual workspace + MeshHealth works without selection, cancels pending Pencil preview, retains selection and uses original Fit on success.
- [x] Actual project codec, NOM independent UV indices/f32 corners and Three GLB UV/tangent retirement.
- [x] Full2462PASS/0FAIL/0skip; reviewed cache graph; protected/frozen owners unchanged.
- [ ] Cube -> Box UVs -> Open UV Editor; Pencil Scale one island larger, Equalize density makes sides comparable again; Pack all separates islands.
- [ ] UndoRedo restores each step; repeated Equalize adds no redundant Undo; Pencil/pan/pinch and selected-island editing still work.
- [ ] Save/Open .boxlab and File NOMAD Base preserve final density/layout/seams.

All-island UV-area scaling; images/centres fixed so overlaps/outside tile and changed
sampling are possible. Pack separately. Same pixel density assumes equal map resolution;
no within-island stretch correction, painting, baking, general seam unwrap or new kernel.

## .895 publication verified — 2026-10-17

Runtime6b1e003324e5e883d8a0f4625a1e69ba0336fde7; tested tree
d972fde28ba3b85d3cda78c4f33afe5a97a727ac exactly matches fetched main.
Actual Node22.23.3 CI39005809090/job117317939014 SUCCESS2462PASS/0FAIL/0skip;
Pages39005808724 build/deploy SUCCESS. Fresh live shell/manifest/recovery/
MeshHealth895/workspace895/edit895, unchanged inspector880/render892,
protected Multi1.0 and frozenBeta7 marker all byte-match repository. All four
continuity files current. User894 PASS protected;895 density/Pack/Pencil/history/
project/native UV device gate PENDING. Proof changes documentation only; tested
runtime bytes unchanged.


## TexturePaint isolated evaluation — 2026-10-17, device gate pending

- [x] Exact MIT upstream commit/source/hash/licence retained; pixel-level original row-wrap and destructive texture-reset defects reproduced.
- [x] Adapter clips XY, sRGB bytes/falloff/pressure/opacity, immediate texture invalidation; real UndoRedo/cancel/no-op, bounded pixel/history memory and cleanup.
- [x] Screen-space resampling raycasts actual Three sphere; no line interpolated across UV atlas; nearest front surface hit.
- [x] Trial separate from BoxLab scene/history/resources/loaders; main .895 markers/pins and protected/frozen code unchanged. No .895 user PASS inferred.
- [x] Five new tests; full2467PASS/0FAIL/0skip. Evaluation report records fit/limitations and authoritative production integration owners.
- [ ] Trial: Pencil paint appears during motion; colour/radius/hardness/opacity/pressure usable, fingers orbit/pan/pinch without paint.
- [ ] UndoRedo/cancel/Reset work; inspect sphere seam and Plane texture boundaries; report bleed or latency.
- [ ] Download PNG has matching colours/orientation; Back to BoxLab leaves original scene unchanged.

Volatile sample-mesh trial only. No layers/project/Nomad persistence, actual BoxLab
mesh paint integration, seam stitching, world-size brush or GPU-stamping claim.

## TexturePaint evaluation publication verified — 2026-10-17

Evaluation commit ec7d0f6666a7b7713bece07c603ea0e976eb2634; tested tree
f12d0461396b98f883acb279cb728bbc6d512c56 exactly matches fetched main.
Node22.23.3 CI39006748131/job117320658726 SUCCESS2467PASS/0FAIL/0skip;
Pages39006747665 build/deploy SUCCESS. Fresh live trial index/controller/adapter,
byte-exact upstream source/licence and evaluation report match repository. Main
index/version remain byte-identical .895. Rendered browser verification did not
complete; iPad Pencil/navigation/seam/PNG tests remain pending, no device PASS inferred.
All four continuity docs current. Next is hands-on trial feedback before production
paint resource/history/gesture integration. Proof is documentation-only.


## UV Paint integration audit — 2026-10-17

User says TexturePaint brush needs work but promising; requests audit of TexturePaint
and Klecks and delegates reuse-versus-new decision. No blanket trial or .895 PASS.
See docs/uv-paint-integration-audit-2026-10-17.md. Audited BoxLab main353e9881,
TexturePaint3af8a61e and Klecks cc24e97712c199929760250881ffe2e25233ce6d.
Decision: BoxLab-owned architecture + selective attributed brush/stroke/compositor
reuse; no wholesale editor/history/input import, no TexturePaint runtime dependency.
Klecks Pen/Eraser read and push KlHistory; LayerCompositor is a smaller extraction
candidate. Screen-space smoothing BEFORE picking; no UV spline across islands.
Three instrumented upstream probes confirm atlas-spanning Bezier marks (162),
smoothing position/pressure and compositor call order; no rendered pixel/perf proof.
Existing focused trial/release tests10PASS/0FAIL/0skip; not a new full-suite run.
Native resource v3 remains UV-only; design paint resource/codec/COW/history explicitly.
Next narrow build: isolated identical-stroke comparison on BoxLab-generated UV geometry,
one colour layer; benchmark adapted Klecks vs simple BoxLab brush before live integration.
No upstream source imported, no runtime/pin/version/frozen changes; .895 remains live.
No new hands-on test required for this documentation-only audit. Existing device gates
remain pending; user feedback is qualitative. Full report carries integration/acceptance plan.

## .896 UV Paint Lab — user PASS, normals exception repaired in .897

- [x] Original BoxLab primitive/projection/UV geometry builder and actual Three ray hits for Sphere/Cube/Plane; no duplicate triangulator.
- [x] Exact colour/pressure size/opacity cap/clipping/PNG rows, paired bounded history, no-op/Redo/cancel/disposal.
- [x] Screen samplers: subdivision parity within1e-12, Klecks curve tail/finite pressure/dab cap; every emitted dab raycast, no UV spline.
- [x] Actual controller movement/dirty-frame policy/Undo/lost capture, finger/palm ownership, demo cancel/blur/reset/disposal, source provenance and production isolation.
- [x] Seven new tests; full Node24 2474PASS/0FAIL/0skip. Browser transport adapted; not rendered/Pencil proof.
- [x] File → UV Paint Lab; Demo then switch BoxLab round/Klecks curve and compare shapes/lag (.896 user PASS).
- [x] Pencil paints during movement; size/hardness/opacity/pressure→size; fingers orbit/pan/pinch without paint; paired UndoRedo and interrupted strokes restore correctly (.896 user PASS).
- [x] Selected PNG/Back to BoxLab baseline accepted in .896; inconsistent outward sample winding is explicitly excepted and retested in .897.

512² volatile sample layers only; reload/Reset clears them. No persistent project/native
paint, full Klecks PenBrush/layers, seam stitching/world radius/smudge/PBR claim. .895
density gate remains pending; qualitative TexturePaint feedback is not blanket PASS.

## .896 publication verified — 2026-10-17

Runtime81871e11aa9890747bea1ef337694a8666ce0eac; tested tree
011024983673d1d5d40a1cfc448f4031491ddfdb matches fetched main/local exactly.
Node22 topology CI39017673843/job117353013439 SUCCESS2474PASS/0FAIL/0skip;
Pages39017673462 build117353014782/deploy117353094301 SUCCESS.
Fresh live shell/version and all9 lab source/vendor assets byte-match repository.
Main protected modelling/Multi/frozen beta bytes and original TexturePaint trial unchanged.
Cloud Chrome loads lab modules/UI but WebGL context creation fails; unchanged original
TexturePaint page fails identically. Thus rendered surface/Pencil/navigation/PNG device
acceptance remains pending, not passed by browser inspection or Node adapters. No claim
of an iPad WebGL failure; this is the observed cloud-browser limitation. No896 user PASS.
Documentation proof changes no tested runtime bytes. Next: user paired-brush comparison,
then selected refinement/resource/codec/global-history work per docs/uv-paint-lab-896.md.

## .897 — preview winding; .896 user PASS

- [x] User896PASS protects brush/Pencil/settings/navigation/paired UndoRedo/PNG workflow; reported paint normals explicitly excepted.895 density acceptance not inferred.
- [x] Every Sphere/Cube preview triangle and normal outward; real front-sided raycasts from six directions hit near exterior. Plane front remains visible.
- [x] Tilted concave/reversed polygons retain SOURCE winding and exact UV/position pairing; no source mutations, no convex-centre outward guess.
- [x] Ordinary export default path/geometry unchanged; same triangle corner sets. Full2477PASS/0FAIL/0skip; brush/kernel/frozen/protected code retained.
- [x] Orbit Sphere/Cube through all sides: no inside-out/missing patches; Pencil paint stays on visible outer surface (.897 user PASS).
- [x] Plane visible; paired brush switching and UndoRedo still work (.897 user PASS).

Winding fix is shared UV PREVIEW only. General file-export winding repair remains out
of scope; preserve intentionally reversed source polygons. No897 device PASS yet.

## .897 publication verified — 2026-10-17

Runtime1db5769b9888e6f6d1c5cbda4e968ffd27afab1d; tested tree
49fc268524ca308bb6dffcf0ca459346b87247fc matches fetched main/local exactly.
Node22.23.3 topology CI39018873809/job117356495970 SUCCESS2477PASS/0FAIL/0skip;
Pages39018873340 build117356496893/deploy117356596313 SUCCESS.
Postdeployment live shell/version/export-parent897 and lab index/controller/sample897
byte-match repository; protected Multi1.0/frozenBeta7 marker unchanged. Initial live
reads preceded completed deployment and served896; final postdeployment graph matches897.
User896PASS protects brush workflow with reported winding exception;897 fixes preview
orientation only, device retest pending. No897PASS inferred. Prior cloud WebGL limitation
remains separate from this actual Three geometry/raycast/source-winding test evidence.
This verification updates documentation only; tested runtime bytes retained. Next:
user orbit/paint sphere and cube all sides, plane/paired history sanity; then paint
resource/codec/COW/global-history design per current roadmap. Ordinary file-export
winding remains a separate audit item; no automatic general outward-repair promise.

## .898 — Paint Lab sessions, user PASS protected

- [x] .897 userPASS protects corrected preview winding/visible-surface paint and prior brush/history/navigation.
- [x] Version1 colour resource owned copies and exact integrity; strict size/channel/alpha/binding guards.
- [x] Actual BoxLab scene/nativeUV codec and exact maps/settings/view for Sphere/Cube/Plane; no fake GLB or parallel mesh schema.
- [x] Binary/corruption/budget/refusal, asynchronous Save snapshots, superseded/stale Open, atomic staged rollback and new Pencil contact guards.
- [x] Actual controller Save/Open bytes, continued paired history, settings/view/brush restoration and disposal; original test assertions retained. Full2483PASS/0FAIL/0skip.
- [x] (.898 user PASS) Paint, select brush/change settings/view → Save Paint (.boxpaint); Reset/reload → Open Paint from Downloads restores BOTH results/settings/view.
- [x] (.898 user PASS) Continue painting after Open; Undo/Redo works for new strokes, PNG remains correct; older pre-save Undo is intentionally absent.

.boxpaint is a separate lab session; no main .boxlab paint, layers, autosave or native
paint export yet. Invalid file must not replace committed work; unfiltered iPad picker.

## .898 publication verified — 2026-10-17

Runtime62849d782d40767f330adf79344c17b843bf8a34; tested tree
4047f6d1c5ca540e14e605ca5897f6ddabb1821d matches fetched main/local exactly.
Node22.23.3 topology CI39025253753/job117374865418 SUCCESS2483PASS/0FAIL/0skip;
Pages39025253372 build117374867123/deploy117374959488 SUCCESS.
Postdeployment shell/version and exact lab898 index/controller/sample/session plus
paint-resource898 byte-match repository. Initial predeployment reads served897/404;
final complete changed graph matches898. Main codec/native resources/export/brush core/
winding/protected modelling and frozen beta bytes retained. User897PASS protected.
Documentation proof changes no tested runtime bytes;898 filepicker/download/reload/
Open/Pencil continuation gate pending, no898 device PASS inferred. No new cloud WebGL
or Safari rendering proof. .boxpaint is a lab session, not main .boxlab/Nomad paint.
Next: Save Paint→Reset/reload→Open Paint from Downloads, compare both results/settings/
view and continued UndoRedo; then original scene-resource/codec/COW/history integration.

## .899 — colour project resource foundation

- [x] Exact colour bytes/descriptor/native UVs round-trip through explicit projectv2; ordinary v1 remains identical; UVv3 refuses paint fields.
- [x] Actual snapshot/UndoRedo/deletion and both ordinary Duplicate owners share committed resources; replacements isolate edits, geometry independent.
- [x] Pool content/identity dedup,8MiB boundary, malformed schema/alpha/base64/refs/owners refuse; no unencoded paint passthrough.
- [x] Original Save/Open/download/atomic replacement and render-failure rollback preserve resource/history state; full2487PASS/0FAIL/0skip, focused4PASS.
- [x] (.899 user PASS) Nearby regression: lab Save/Reset/Open and continued paint/UndoRedo; main ordinary Duplicate/Undo and plain .boxlab Save/Open.

Storage foundation only, no new main paint authoring/display. Binding opaque until
production validity/rebinding bridge; no paint export/UV propagation/SHA-authenticated
project claim. .898 file workflow userPASS protected. No synthetic fixture device test.

## .899 publication verified — 2026-10-17

Runtime47136701c9c667ecdb410d89ca6e8b751c773680; tested tree
da7f9e98766dff998f71e60d6deb20947dc692e1 matches fetched main/local exactly.
Node22.23.3 topology CI39028416328/job117383876628 SUCCESS2487PASS/0FAIL/0skip;
Pages39028415912 build117383877465/deploy117383953976 SUCCESS.
Postdeployment exact live shell/version, lab899 index/controller/session and changed
manager/management/drawer/codec/project-GLB/new paint-codec graph899 byte-match repository;
unchanged resource898 and recovery loader899 graph also match. Protected Multi-transform/
frozen/modelling/brush/preview bytes retained. User898PASS protected;899 nearby lab/main
project device sanity pending. No new rendered/Pencil proof or main paint authoring claim.
Documentation proof changes no tested runtime bytes. Next bounded original-owner
selected-object paint bridge requires validity/rebinding/lifetime/refusal rules before UI.

## .900 — main viewport UV Paint, device gate pending

- [x] Original UV topology/codec binding; moved geometry follows unchanged UVs, names/IDs excluded; UV edits/stale/unsupported owners refuse.
- [x] Real Three active front rays/occlusion, no-op/Redo/cancel, COW checkpoint and global history, exact project bytes.
- [x] Async opening/display races, once-only disposal, dirty-frame uploads; original render owner active/live + inactive/locked and ordinary look restoration.
- [x] Actual paint UI window capture/Pencil/hover/finger/palm/pressure/interruption/context loss routing adapted in Node; full2494PASS/0FAIL/0skip.
- [x] (.900 user PASS) Native UV cube, SubD/Mirror off → File/Paint selected object → Pencil marks appear during motion; fingers orbit/pan/pinch without paint.
- [x] (.900 user PASS) Try both brushes/settings; Done → global UndoRedo; reopen to continue; duplicate/edit leaves original paint intact.
- [x] (.900 user PASS) Save .boxlab → reload/Open restores paint in Studio/Solid/UV Image; ordinary object Move retains paint.

First single opaque512² base layer only. Seams can bleed; UV/topology edits guarded,
not silently rebound. Painted OBJ/GLB/NOM and Join refuse pending propagation/export.
Save .boxlab; global history50 entries, current unique pool8MiB. Device/rendering not
inferred from Node or previous lab PASS. User899PASS protected.

## .900 publication verified — 2026-10-17

Runtimeeb26b99141af4a1e3a77d1f09fe559887880dd7e; tested tree
b687f2b2f3665f389f67e02db1e67bf991b487bf matches fetched main/local exactly.
Node22.23.3 topology CI39030804811/job117390693515 SUCCESS2494PASS/0FAIL/0skip;
Pages39030803672 build117390693845/deploy117390798136 SUCCESS.
Postdeployment exact shell/version, main viewport paint/target/core/render/radial/
manager/management/drawer/export/refusal parent graph900 plus Lab900 index/controller
and unchanged accepted raster/stroke896 byte-match repository. Recovery900 matches.
Protected Multi-transform1.0/frozen/modelling algorithms/brush bytes retained. User899
PASS protected;900 actual viewport/Pencil/navigation/project device gate pending.
No rendered/iPad proof inferred from Node adapters or previous cloud WebGL limitation.
Documentation proof changes no tested runtime. Next: device feedback, then flattened
paint export through original GLB/NOM owners; painted export refusal remains meanwhile.

## .901 — painted native NOM / GLB export, device gate pending

- [x] Shared PNG packaging: exactRGB8/sRGB/opaque pixels/rows/CRC/zlib/source ownership; existing scalar tests retained.
- [x] Actual native image/material/header/UV/polygon bytes and dedup; actual GLB exporter/loader/PNG/UV/white factors/painted source winding.
- [x] Geometry/UV/pixel capture before await; stale/Base/unsupported refusals; raw synchronous and OBJ safeguard retained.
- [x] Actual File NOMAD and GLB actions download paint, report colour count and restore buttons; six focused checks PASS; full Node24 2500PASS/0FAIL/0skip.
- [x] (.901 user PASS) Paint asymmetric colours/marks, Done → File NOMAD → open in Nomad: compare placement/orientation/colour.
- [x] (.901 user PASS) Repeat GLB+Base; painted duplicate retains its own colour/UVs alongside original.
- [x] (.901 user PASS) Continue BoxLab paint/Undo and .boxlab Save/Open after exports; original resource remains editable.

Flattened colour only in NOM/GLB. .boxlab retains editable paint resource; no layer/
brush-history/PBR expansion/seam-safe/NOM import claim. .900 device PASS protected.

## .901 publication verified — 2026-10-17

Runtime32cca00338fc3bcd8894fb9f0c7ed9a14171c223; tested tree
5780a931a693f41bf4d72128d48289f014cad204 matches fetched main/local exactly.
Node22.23.3 topology CI39036938146/job117408573676 SUCCESS2500PASS/0FAIL/0skip;
Pages39036937708 build117408575029/deploy117408682503 SUCCESS.
Postdeployment exact live shell/version and export-panel/native-core/packed-parent/
PNG/new paint-export graph901 plus Lab901 index/controller byte-match repository.
Unchanged main paint/binding900 and recovery901 match. Protected Multi1.0/frozen/
modelling/raster/input bytes retained. User900PASS protected;901 external Nomad and
GLB colour/orientation/placement device gate pending, no rendered proof inferred.
Documentation proof changes no tested runtime. Next device export feedback, then layer/
compositor design through original owners; .boxlab remains editable paint project.


## .902 — layer/compositor foundation; .901 user PASS — 2026-10-18

User901PASS protects painted NOMAD/GLB placement/orientation/colour, independent
painted duplicates and continued painting/Undo/.boxlab. Audit main0bfb6819: raster896
writes opaque bytes, resource898/project899/export901 have no editable layer stack.
New isolated paint-layer-stack API: existing opaque base + up to3 straight-alpha
512² overlays, bounded IDs/names, visible/opacity, owned capture/append/replace,
byte-space source-over and flattened resource via ORIGINAL captureColourResource.
No new history/input/kernel or app wiring. Strict schemas/budgets; typed buffers
read-only by convention. Current copy-all API has no sparse/COW/performance claim.
Five focused checks PASS: exact blending/order/visibility/opacity/rows, input/edit/
output isolation, refusal/budgets/max stack, actual original project + native PNG
flattened handoff; editable stack still refuses as project colourPaint.
Read docs/paint-layer-stack-902.md. No layer UI/transparent brush/editable layer save
claim. No new hands-on test; existing paint/export unchanged. Shell/recovery902;
main paint900/export901/resource898/project899/lab901/protected/frozen bytes retained.
Next separate layered scene resource/project codec + atomic Open/history/duplicate
integration, then transparent raster/UI through current viewport owner. Publication
and full-suite evidence follow; no902 device PASS inferred.

- [x] Five focused902 checks cover exact source-over/ordering/visibility/opacity,
  opaque output/asymmetric rows, independent captures/edits/flatten, strict schema/
  buffer/ID/size/layer limits and max512² stack.
- [x] Flattened bytes survive original project/native Nomad PNG owners; project
  rejects stack as opaque colourPaint rather than silently discarding layers.
- No new hands-on902 check: layer API is intentionally not loaded by app/lab.

.902 local validation: Node24.19.0 full suite **2505 PASS / 0 FAIL / 0 skipped**;
five new focused compositor checks PASS. No new device/rendered layer proof.


## .903 — masks/blend foundation and material direction — 2026-10-18

User requests surface image placement/Project from View, Insert Move→Rotate→Scale tap
cycle, masks/blend modes and Nomad-style material slots with displacement placeholder.
Read docs/paint-material-direction.md for requirements, sequencing and limitations.
Audit787cfcb9:902 compositor Normal-only;900 paint/899 project/901 export opaque.
Extend SAME isolated stack owner to v2 with owned per-overlay8-bit coverage masks,
enable/invert and26 colour blend modes in paint-blend-modes903. v1 Normal upgrade
byte-identical; strict unknown fields/invalid modes/masks and sparse arrays refuse.
Alpha×opacity×mask gates blended RGB; Normal exact902; standard W3C colour formulas,
extra modes explicitly defined in docs/paint-layers-903.md. Not Nomad bit-parity or
normal-vector/scalar/PBR blending. Buffers read-only by convention; max4.75MiB stack
plus copies/flat outputs, no measured performance claim.
Seven focused903 checks PASS; existing902 semantic checks retained (unknown-mode
refusal supersedes its obsolete Multiply refusal). Actual opaque project/native PNG
handoff retained. No app/lab layer UI, mask drawing, image projection or editable
layer persistence yet. Main resource/project/export continue refusing editable stack.
Shell/recovery903, isolated child903; main900/export901/lab901/brush896/protected
Multi1.0/frozen/modelling owners unchanged. No new hands-on test or user903PASS.
Next explicit layered scene/project pool through original codec/history/duplicate
owners, then transparent brush+layer/mask UI; image projection/Insert-cycle follows.
Full suite/publication proof follows;901 userPASS remains latest accepted device gate.

- [x]26 fixed grayscale vectors + nonlinear branch/endpoints; colour-luminosity/gamut
  and whole-RGB darker/lighter selection; all26 modes finite/bounded on49 colour pairs.
- [x]Mask white/black/grey/disabled/inverted, coverage×alpha×opacity, owned bytes,
  invalid schema/mode/size, asymmetric UV-v0-first rows, v1 upgrade and sparse refusal.
- [x]PNG output exact; existing902 actual project/native handoff tests retained.
- No new903 device test: main paint/lab UI unchanged, compositor still isolated.

.903 local validation: Node24.19.0 full **2512 PASS / 0 FAIL / 0 skipped**;
seven new focused checks + existing902 tests PASS. No rendered/device gate inferred.


## .904 — editable layered project/history resources — 2026-10-18

Audit5efdc7d9: existing colourPaint history/ordinary Duplicate already share read-only
resources. New paint-layer-resource owner stores explicit layered resourcev2 in SAME
colourPaint field: validated opaque preview + owned903 stack with exact masks/modes.
Original colourPaintPool entryv2 and sceneprojectv3 transport all buffers through
original canonical bytes, whole-resource dedup;8MiB aggregate BEFORE decode includes
flat/base/overlays/masks. Plainv1/opaquev2 unchanged; strict field/version/ref/cache/
budget/unsupported owner guards. Original nativeUVv3 remains UV-only.
Same history/checkpoint/single+Multi Duplicate/atomic Open owners unchanged. Original
surface display reads validated flat colour; export adapter validates/captures owned
flatv1 BEFORE await and uses existing NOM/GLB writers. Editable layers persist only
in.boxlab. Existing opaque painter refuses layered resource until controls land,
preventing destructive flattening. No new layer UI/image sources/material authoring.
Seven focused904 checks PASS: exact resource/project/pool, real history/duplicates,
File Save/Open/corrupt input/render rollback, actual NOM/GLB+async snapshot and
committed display/painter guard. Node transport adapters are not rendered/iPad proof.
Read docs/paint-layer-resources-904.md. Changed codec/export/binding/paint/render+
parent loader graph904; main modelling/Multi1.0/frozen/brush algorithms unchanged.
No extra902/903/904 devicePASS inferred;901 userPASS remains protected.
Next REAL layer UI/transparent brush through original viewport/history and this
resource; do not add a parallel paintLayers property or history. Full suite and
publication proof follow. Manual904: existing paint/save/reopen/Undo/Duplicate/export
regression only; new layered fixtures automated, not user tasks.

- [x]Layered resourcev2 exact preview/stack check and owned masks/base/overlays.
- [x]Exact scenev3 roundtrip/shared dedup; plainv1/opaquev2 preserved, strict
  versions/modes/refs/corruption/complete8MiB raw pool before allocation.
- [x]Actual single/Multi Duplicate/checkpoint/UndoRedo + replacement isolate masks.
- [x]Actual Save/Open/corrupt layered transport/failed-render rollback unchanged.
- [x]Actual NOM/GLB flatten+async snapshot; original surface/legacy-painter refusal.
- [x](.904 user PASS) Existing opaque paint→Done→Save .boxlab→reload/Open→continue/UndoRedo sanity.
- [x](.904 user PASS) Ordinary Duplicate independent paint and NOMAD/GLB colour regression sanity.

.904 local validation: Node24.19.0 full **2519 PASS / 0 FAIL / 0 skipped**;
seven new resource/history/codec/export checks PASS. No device acceptance inferred.


## .905 — visible main viewport colour layers; .904 PASS — 2026-10-18

User904PASS protects paint Save/Open/Undo/Duplicate/NOM/GLB regression. Audit1d246735:
connect existing900 painter/903 stack+26 blends/904 resource and original scene history.
Layers panel: select/top-first, + Layer (max3), rename/reorder/delete, visibility,
layer opacity and26 modes. Base paintable/opaque; existing v1 converts only on + Layer.
Same raster gains optional straight-alpha layer mode with preserved opaque default,
pressure/hardness/per-stroke cap/cancel; same stroke/input/raycast/navigation owners.
Separate mutable layer/composite preview; original one dirty upload/frame; no measured
M2 performance claim. Whole-stack copies/preflight remain, not sparse optimization.
Every changed stroke/metadata operation checkpoints original scene and COW replaces
resource; selection/no-op creates no history. Full-scene8MiB pool checked BEFORE
checkpoint; invalid/budget/checkpoint failure restores original resource/preview.
Stored masks persist; no mask/image/material UI claim. Save/Openv3 and flat NOM/GLB use
original904 owners. Hidden/zero opacity layer refuses strokes while panel stays open.
Seven focused905 checks PASS; all original900 assertions retained in extracted shared
runtime.904 refusal assertion superseded by real layered opening/editable-path tests.
Read docs/paint-layer-ui-905.md. Changed painter/shared raster and Lab loader graph905;
compositor903/resource+project+export904/stroke896/protected/frozen owners retained.
Next DEVICE layer/Pencil/navigation/persistence feedback, then mask paint/UI through
same owners, followed by image projection/Insert cycle/material plan. Full suite and
publication proof follow. No905 userPASS or rendered browser evidence inferred.

- [x]Transparent/opaque raster vectors, alpha coverage/cancel, same original stroke.
- [x]Actual layer UI/Pencil state/history/base isolation/order/name/visibility/blends.
- [x]Scene budget/checkpoint rollback, masks retained, v3 re-open and native export.
- [x](.905 user PASS) Two contrasting layers + base: select/reorder/hide/opacity/blend, Pencil/fingers.
- [x](.905 user PASS) Done/UndoRedo/reopen and .boxlab reload/Open keep editable layers.
- [x](.905 user PASS) Duplicate layer edits independent; native NOM/GLB optional colour sanity.

.905 local validation: Node24.19.0 full **2526 PASS / 0 FAIL / 0 skipped**;
seven new layer/raster/UI checks PASS, original semantic checks retained. iPad gate pending.


## .906 — main viewport layer mask painting; .905 PASS — 2026-10-18

User905PASS: layers work well; UI/UX polish after feature flows are present. Audit
mainf8455236/local verified905 treefb902274: reuse903 masks/compositor,904 resource/
project/history/export and905 raster/input. Add Mask selects Mask paint target; same
opaque raster edits raw grey coverage, R8 committed, source colour pixels unchanged.
Hide/Reveal/Grey brush presets account for inversion; raw value0–255 slider, size/
hardness/pressure/opacity and both samplers retained. Colour picker preserved/disabled
in Mask mode. Layer switch/reopen starts Colour; base has no mask. Enabled/invert/
remove use COW + original checkpoints; selection/preset/no-op do not create history.
Cancel/settings/target/layer/body-loss restore mask/preview/navigation. Parent layer
must show/nonzero opacity and mask enabled to paint. Original8MiB preflight/rollback
preserved. Same resourcev2/projectv3/flat NOM+GLB, no new schema/history/kernel.
Seven focused906 tests PASS incl actual UI/core/source preservation, flags/UndoRedo,
interruption/invalid/budget/checkpoint rollback, exact Save/Open/re-edit and native
export. Full suite/publication proof follows; no rendered/iPad acceptance inferred.
Read docs/paint-mask-ui-906.md. Only main painter + shell/recovery906; raster/Lab905,
compositor903/resource+project+export904 and protected modelling/Multi/frozen untouched.
Next DEVICE mask gate, then editable image sources/Project from View through original
UV/geometry and Insert cycle. No material opacity/displacement or broad UI redesign
claim. Product direction remains docs/paint-material-direction.md.

- [x]Mask strokes preserve exact colour pixels; Hide/Reveal/grey raw coverage.
- [x]Actual UI/presets/inversion/colour return/removal and settings cancellation.
- [x]Flags/no-op/original checkpoints/UndoRedo, loss/budget/checkpoint rollback.
- [x]Exact projectv3 re-open/re-edit and original native composed colour export.
- [ ]+ Mask→Hide/Reveal/Grey on mesh; visible results, Pencil/fingers unchanged.
- [ ]Enabled/invert/remove+Undo restore underlying layer; Save/Open/reselect Mask.

.906 local validation: Node24.19.0 full **2533 PASS / 0 FAIL / 0 skipped**;
seven new mask UI/core tests PASS. Device906 pending; no rendered proof inferred.


## .907 — editable image source and placement foundation; .906 PASS — 2026-10-18

User906PASS protects mask/Pencil/navigation/history/project behaviour. Audit remote
4778567c and existing read-only UV image892/Insert437 owners. New isolated image
source importer retains original encoded PNG/JPEG + owned decoded RGBA, preflight
2MiB/1024² before bitmap decode, exact dimensions, async snapshot and cleanup.
Camera placement snapshots original Three matrices plus NDC centre/size/rotation;
projector clips camera/image bounds, returns top-first UVs. Original Insert cycle
re-exported verbatim; no new pointer/mesh/history owner. Six focused tests PASS.
Read docs/paint-image-source-907.md for browser colour/alpha/EXIF and memory limits.
NOT connected to painter, layer/project schema or UI yet. Coordinate projection
does NOT enforce facing/angle/scene occlusion; existing painter must do so before
rasterization. No Project from View/surface placement/manual device claim.
Main paint906/resource904/compositor903/protected Multi1.0/frozen unchanged.
Next explicit image source+placement resource/pool versioning and original history/
project/export integration, then picker/overlay/visible-front projection UI.
No new hands-on gate this foundation build; .906 PASS is protected, not907 image UI.

- [x] User .906 PASS: mask brush/flags/UndoRedo/project/navigation protected.
- [x] .907 original byte/pixel ownership, malformed/dimension/budget refusal.
- [x] Async decode snapshot and cleanup on success, dimension/canvas failures.
- [x] Actual Three perspective/orthographic snapshot and placement coordinates.
- [x] Shared Insert cycle; no second pointer or mesh kernel.
- [ ] Future projector integration must enforce facing/angle/scene occlusion.
- No .907 image UI/device gate: isolated modules only.

.907 local validation: Node24.19.0 full **2539 PASS / 0 FAIL / 0 skipped**; six new
focused image source/placement checks PASS. No new image UI or device gate.


## .908 — retained image layers in original resource/project owners — 2026-10-18

Auditfa81af3d:907 input/placement isolated;903/904 strict raster-only storage. Extend
SAME stack/resource/pool to explicitv3 and sceneprojectv4. Image recipe retains original
encoded+decoded source, placement and affine capture frame, separate surface raster.
Paired image+preview append/replace APIs; generic colour pixel edits refuse images.
All source/cache/mask/flat/base bytes charged to existing8MiB pool BEFORE decode;
legacy projects and nativeUVv3 unchanged. Original scene history/Undo/single+Multi
Duplicate/atomic File Open and flattened NOM/GLB retained. Existing painter supports
v3 controls/masks with image label and colour-stroke guard, no implicit bake.
Eight focused actual codec/history/File/painter/UI/export checks PASS. No new image
picker/Project UI, facing/occlusion rasterizer or rendered/device claim yet.
Source+placement907/brush905/blend903/Insert437/protected modelling/Multi/frozen retained;
changed owners and parent/Lab loader graph908. Read docs/paint-image-resources-908.md.
Next visible picker/overlay/Project via original UV geometry and current viewport input,
front/angle/scene/self-occlusion before texel acceptance, atomic recipe+raster commit.
Manual: existing paint/masks Save/Open/continue, UndoRedo, duplicate/export sanity.
Latest user906PASS protected; no907/908 devicePASS inferred.

- [x]908 exact image source/cache/frame ownership, old compositor arithmetic retained.
- [x]Projectv4 exact original buffers/metadata/masks, whole-resource dedup, oldv1–3.
- [x]Strict version/schema/frame/cache/refusal; complete source+cache pool preflight.
- [x]Actual File Save/Open atomic rollback, single/Multi Duplicate/global history.
- [x]Actual image mask/UI/painter guards, normal paint layers and re-edit after Open.
- [x]Budget/checkpoint rollback, original NOM+GLB flattened bytes and async snapshot.
- [ ]908 existing paint+mask Save/Open/continue and fingers; UndoRedo/Duplicate/export.
- Future image picker/projection gate is separate; no image fixture task for user.

.908 local validation: Node24.19.0 full **2547 PASS / 0 FAIL / 0 skipped**; eight new
image resource/history/project/UI/export checks PASS. Device gate remains separate.


## .909 — duplicate paint release fix; .908 user FAIL — 2026-10-18

User: duplicate paint disappears on Pencil release. Reproduced original Duplicate +
actual UI,3layers: whole-resource quota double-charges unchanged base/layers/flat and
refuses8MiB commit. Existing direct-assignment Duplicate tests missed actual release.
Repair SAME paint pool: exact canonical buffer-content dedup,8MiB unique /16MiB
expanded resource cap. Explicit scenev5 shared-byte transport only when inline>8MiB;
old scenev1–4 encoding retained below limit, complete predecode/schema/ref guards.
Original history/Undo/Duplicate/atomic File Open and flat NOM/GLB unchanged. All paint
commits preflight same pool, including opaque; failed commit restores buffers and
keeps Paint panel open. Five new regressions cover real single+Multi copy paint/release,
committed display/history/actual SaveOpen/re-edit, corrupt pool+both budgets/atomic
rollback, genuine limits/staged add and recoverable UI refusal.906 budget fixture
now uses genuinely distinct data; quota/rollback assertions retained. See
docs/paint-duplicate-909.md. Changed owners/parent/Lab cache909; stack/image908,
source907/brush905/blend903/Insert437/protected Multi/frozen/modelling retained.
Latest devicePASS906;908 duplicateFAIL recorded;909 device retest pending.
Next device duplicate release/Done/SaveOpen/Undo, then resume Project from View UI.

- [x]909 actual single AND Multi full-stack duplicate strokes survive release.
- [x]Source unchanged, committed surface/UndoRedo and real File SaveOpen/re-edit.
- [x]Shared byte pool refs/versions/canonical data/duplicates/usage refuse atomically.
- [x]8MiB unique and16MiB expanded preflight before decode; staged quota rollback.
- [x]Genuine failed stroke restores data/history/controls and keeps Paint open.
- [x]909 DEVICE duplicate3layer paint → lift Pencil → Done/reselect; source unchanged. USER909PASS.
- [x]909 DEVICE Save/Open/continue/UndoRedo on duplicate. USER909PASS clears908 release failure; native export exception tracked910.

.909 local validation: Node24.19.0 full **2552 PASS / 0 FAIL / 0 skipped**; five new
actual duplicate/pool/recovery regressions PASS. Device release retest pending.


## .910 — native paint texture-name collisions; .909 viewport PASS — 2026-10-18

User909PASS protects duplicate paint release/Done/SaveOpen/Undo; NOMAD exception:
copy adopts original paint. Screenshots show909/green copy strokes in BoxLab, absent
in Nomad. Auditc1b350e0: prepared PNGs/material+image indices already distinct, but all
paint textures namedBoxLab paint.png. Repair authoritative native writer name registry:
NFC/case-folded collision names get numeric suffix for DIFFERENT image indices; equal
images keep sharing, unique names and existing aliases retained. Export-local only;
source bytes/names,890 exact image dedup, factors/UV/offsets/24MiB budget unchanged.
Four actual NOM/File/SaveOpen/async/dedup/mixed-name regression tests PASS. Consumer
name caching is an inference; actual Nomad device retest remains required. Read
docs/paint-nomad-duplicate-910.md. Native/File/Lab loader graph910; viewport/resource/
history/pool909 and protected Multi/modelling/frozen unchanged.
Next DEVICE re-export original+green copy from910; confirm distinct paint in Nomad,
then second export after further copy painting. If persistent inspect actual NOM bytes;
no invented native fields. Then resume original image projection UI plan.

- [x]User909 PASS: duplicate release/Done/SaveOpen/Undo protected; NOMAD exception.
- [x]910 exact per-object PNG/material/image links and distinct native texture names.
- [x]Actual File NOMAD after project Open + async snapshot, identical-image dedup.
- [x]Mixed/case-folded/pre-suffixed names distinct, deterministic, source untouched.
- [x]910 DEVICE fresh NOM: green copy strokes remain independent in Nomad. USER910PASS.
- [x]910 DEVICE native duplicate export acceptance reported USER910PASS.

.910 local validation: Node24.19.0 full **2556 PASS / 0 FAIL / 0 skipped**; four new
native paint/export/name regressions PASS. Actual Nomad retest remains pending.


## .911 — retained image Project from View; .910 user PASS — 2026-10-18

User910PASS protects independent duplicate paint in Nomad, clearing external gate.
Audit b0fd19a8: source/placement907 + retained image stack908/pool909 already present;
missing real picker/overlay/visible-front raster. Connect SAME painter/input/history.
+ Image PNG/JPEG ≤1024²/2MiB;65% screen guide, Pencil Move→Rotate→Scale tap cycle uses
original Insert437 function; fingers navigate behind image. Project captures current
camera/body frame; original UV triangles/Three rays enforce75° front and scene/self
occlusion BEFORE texels. Refuse sampled overlapping/cross-tile UVs and bounded work.
Paired908 image recipe+raster append/replace, original preflight/checkpoint/COW; Edit
image reprojects retained source FROM CURRENT VIEW, retains mask/blend/name/order.
Cancel/layer change/close/stale async preserves committed work, original Undo exits
Paint. Same .boxlab codec/source persistence/flat NOM+GLB; no new schema/history/kernel.
Screen-projector gestures are not tangent-following surface decals. Three overlays,
8MiB unique/16MiB expanded retained; complex scenes may refuse; no seam-safe/performance
claim. Read docs/paint-image-project-911.md. Seven focused actual raster/UI/persistence/
export tests PASS; Node24.19.0 full **2563 PASS / 0 FAIL / 0 skipped**. Publication
verification follows. Changed painter/core+new projector/
overlay graph911;907/908/909 storage,910 native exporter and protected modelling/Multi/
frozen retained. Device911 gate pending. Next hands-on Project feedback then surface-
relative placement; material slots/UI polish follow product direction.

- [x]911 exact source orientation/alpha and original geometry/frame projection.
- [x]911 front/75°/scene/self occlusion; sampled UV ambiguity/work refusal atomic.
- [x]911 actual picker/staging/Pencil cycle/cancel/finger ownership + original history.
- [x]911 actual projection .boxlab codec/Open/re-edit and native flattened PNG.
- [x]911 checkpoint/stack and stale async refusal preserves committed state.
- [x]911 overlay aspect/rotation affine parity/disposal; no second pointer owner.
- [x]911 DEVICE + Image → Pencil Move/Rotate/Scale; fingers align view → Project. USER911PASS.
- [x]911 DEVICE orbit confirms back/hidden surfaces clean; Edit image/cancel/reproject. USER911PASS.
- [x]911 DEVICE UndoRedo/SaveOpen/re-edit; mask/blend and Nomad colour sanity. USER911PASS.


## .911 publication verified — 2026-10-18

Runtime cf86b14a0585d6242a13b3007a60c7a7a9e1ac67; tested tree
1f2b43401ec2245c392afa1d86d9067a39fad79d. All14 uploaded blob hashes and created
tree match tested local source. Fetched origin/main has exactly the same tree;
remote manifest/title/data/visible label and reviewed painter911 graph verified.
Local Node24.19.0 full2563PASS/0FAIL/0skip; Node22 topology CI39102076649 /
job117600224293 SUCCESS. Pages39102076118 build117600224532 /
deploy117600313566 SUCCESS. All14 checked postdeployment live shell/version/
painter/core/projector/overlay/source/placement/image/stack/pool/native writer/
recovery files byte-match repository. Initial live manifest served910 before deploy;
final complete checked graph matches911. Protected Multi1.0/modelling/frozen unchanged.
All four continuity documents updated. This proof is documentation-only; tested
runtime bytes retained. User910PASS recorded;911 actual Safari/Pencil/image picker/
latency/front-only appearance gate remains pending. No rendered acceptance inferred
from Node canvas adapters or byte verification. Next manual Project checklist in
paint-image-project-911.md, then surface-relative placement from original Insert.


## .912 — surface-relative retained images; .911 user PASS — 2026-10-18

User911PASS protects Project from View/picker/Pencil/navigation/persistence/history.
Audit a647d08f: reuse911 projector and908/909 storage/pool; new surface frame uses actual
Insert437 alignment/cycle and907 orthographic camera capture, no new geometry kernel.
+ Image/Edit image → On surface → pick selected mesh. First tap places; then tap-cycle
Move/Rotate/Scale, Move follows original hit/triangle normal. Planar65% contact guide;
lift regenerates exact UV mesh preview, Apply commits ONE original scene checkpoint.
Preview never assigns object colourPaint or enters Save/history; original preflight,
commit/COW/export and .911 front/occlusion/UV/work limits retained. Cancel/close/layer/
body loss restores committed work and controls, guide disposed. Back to view preserves
accepted .911 path. Edit / On surface starts fresh anchor/default size; persisted source/
projection/frame/cache support re-placement, not automatic old anchor/spin/scale resume.
Same scene/project schema and flat native handoff. No continuous curved raster while
contact, seam-safe wrapping, larger budgets or iPad performance claim. Read
docs/paint-image-surface-912.md. Seven focused new checks cover actual frame/guide/
preview/UI/history/limits/curved Sphere UV+Save/native PNG. Node24.19.0 full
**2570 PASS / 0 FAIL / 0 skipped**; publication verification follows.
Changed painter/core/new helper graph912; projector911/source907/stack908/pool909/native
writer910/Insert437 and protected modelling/Multi/frozen retained. Device912 gate pending.
Next surface interaction feedback, then audit material-channel slots/placeholder plan.

- [x]912 surface frame aspect/spin/normal and actual Insert alignment parity.
- [x]912 guide is non-raycastable, source unchanged and disposed on all stage exits.
- [x]912 transient display survives tick; no scene resource/history/save before Apply.
- [x]912 original UI pick/tap-cycle/move/cancel/finger/palm and single history Apply.
- [x]912 masks/blends/source sharing retained; pool/checkpoint/body-loss atomic refusal.
- [x]912 real curved sphere projection/codec/native flattened PNG through original owners.
- [x]912 DEVICE first On surface image works perfectly, USER912PASS; second add exception tracked913.
- [ ]912 DEVICE Apply UndoRedo; Edit image/On surface, Cancel/reapply, SaveOpen/export.


## .912 publication verified — 2026-10-18

Runtime7c5002a42016621916fb7874df570a7425638421; tested tree
9264653aefcbbff915d09139391807bb393d5681. All13 uploaded blobs and created tree
match tested local source; fetched origin/main has identical tree. Main version/
shell/painter912 pin verified. Node24.19.0 local full2570PASS/0FAIL/0skip;
Node22 topology CI39103377854/job117604045125 SUCCESS. Pages39103377692 /
build117604047193/deploy117604136007 SUCCESS. All15 checked postdeployment live
shell/version/painter/core/surface/projector/overlay/source/placement/stack/pool/
native writer/Insert alignment/recovery files byte-match repository. Protected
Multi1.0/modelling/frozen unchanged. All four continuity files current; this proof
changes documentation only and retains tested runtime bytes. User911PASS protected;
912 Safari/Pencil/guide appearance/release-preview latency gate pending, no rendered
or M2 performance acceptance inferred. Next On surface manual gate, then material/
channel owner audit per product direction. Original screen Project remains available.


## .913 — repeated surface image quota repair; .912 partial PASS — 2026-10-18

User912PASS first surface image; explicit second-add failure. Actual912 UI reproduced:
16px second image works; second1024² source fails8MiB preflight (decoded source4MiB
alone). No user's file supplied; quota explanation verified, device retest required.
Same stack/resource/pool owners select bounded image-capablev3 profile24MiB unique /
48MiB expanded; raster-only8/16 retained. Three1024² sources+encoded+cache+base/flat/
masks fit≤23.75MiB resource. Original source dimensions/bytes,512² maps,three-overlay
and32MiB file limits unchanged; no downsizing, new schema/history/kernel or performance
claim. Original8MiB transport threshold retained: larger images use EXISTING scenev5
shared-byte codec; strict per-resource/ref/canonical/predecode/atomic refusal retained.
Failed pool upgrades cannot publish buffers or raise allowance. Image errors now also
appear inside active panel. Read docs/paint-image-repeat-913.md. Four new focused real
UI/same+different1024²/File/codec/native/quota checks added.908/912 image budget fixtures
updated to genuine24MiB overflow; all raster-only8/16 assertions retained. Local
Node24.19.0 full **2574 PASS / 0 FAIL / 0 skipped**; publication verification follows. Resource/pool and parent/Lab graph913; surface912/projector911/
source907/Insert437/brush/protected modelling/Multi/frozen retained. Native writer only
parent paint-export pin changed. Next DEVICE two/three adds in same session, edit second,
UndoRedo/SaveOpen; material work follows acceptance, not an inferred blanket912PASS.

- [x]913 actual second/third distinct1024² UI adds preserve originals and history.
- [x]913 same-source second add / second replacement, canonical shared scene transport.
- [x]913 real File Save/Open two1024² images then continue third; exact native PNG.
- [x]913 image24/48 unique/expanded quota preflight and atomic failure; raster8/16 retained.
- [ ]913 DEVICE first+second On surface add/Apply in SAME paint session; originals retained.
- [ ]913 DEVICE optionally third; edit second independently, UndoRedo/SaveOpen.


## .913 publication verified — 2026-10-18

Runtimeb4849c600938243311cdcbce7828b8a64869a072; tested tree
8a859acf4b1d30b97fa3348dd9aa0efcddaa9514. All30 uploaded blob hashes/created tree
match local tested source; fetched origin/main identical. Main913 shell/manifest/
painter pin verified. Local Node24.19.0 full2574PASS/0FAIL/0skip; Node22 topology
CI39105181178/job117609354728 SUCCESS. Pages39105180906 /
build117609356689/deploy117609442669 SUCCESS. All26 postdeployment live shell/
version/resource/pool/new budget/UI/parent/Lab/recovery plus unchanged surface/
projector/source files byte-match source. Initial reads during deployment mixed912
and new files/new budget404; final fresh complete graph26/26 matches913. Protected
Multi1.0/frozen/modelling/brush/Insert algorithms retained; native writer only loader
pin changes. All four continuity files current. This proof changes docs only; tested
runtime bytes retained. User912 first-placement PASS protected; repeated-image device
exception remains pending913 retest. No actual user source file, Safari latency or
M2 RAM acceptance inferred from Node/source-byte checks. Next repeat-add SAME session,
verify first preserved, edit second/UndoRedo/SaveOpen; material work stays queued.


## .914 — Cylinder UVs for cones and upright Revolves — 2026-10-18

User requested Cylinder UVs for Revolve/cylinders/cones and completion up to the
next manual gate before pausing overnight. Audit: applied Revolve has revolveProfile
(not curveProfile), already eligible in Mesh Health; constant-radius/axis-side
checks in the original Cylinder mapper were the refusal. Extend THAT mapper only:
ordinary cylinders retain exact measured-edge strip/two-cap layout; fallback recovers
regular concentric world-Y rings and their single profile chain from Base topology.
Angular seam plus measured radius/height profile distance supports taper, pointed
ends, shoulders and return walls. Pole U splits per face wedge; n-gon caps stay planar.
No geometry, recipe, modelling/gesture/history/export kernel changes. Same native
corner payload, commit, original UV edits, Save/Open and GLB/NOM writers. UI explains
upright cylinder/cone/Revolve scope. Tilted/elliptical/twisted/branching/malformed
and procedural/modifier/imported contexts still refuse atomically. Not arbitrary-axis
projection, remeshing, auto-bake, zero-distortion or automatic packing. Closed profile
loops are unsupported. Four new tests cover native cone3–64 sides/multiple bands,
huge/tiny scale, original Revolve owner output with poles/taper/shoulders/return walls,
no geometry/metadata mutation, one Undo/Redo/idempotence, UV edits/codec/actual native
and GLB values, atomic refusal and retained original cylinder layout. Entire changed
UV/parent/Lab graph and shell/recovery keys914; other module pins retained.

Next DEVICE: Add+ Cylinder and Cone → Mesh Health → UVs → Cylinder UVs (Y), inspect
UV Editor; apply upright Revolve and repeat; Undo/Redo and Save/Open, paint/export
as desired. Also retest913 two images in SAME On surface session, first preserved,
second independent. No new PASS inferred; first912 placement remains protected.
Material-channel work stays queued behind these manual gates. User pausing overnight;
continue from repository tomorrow, no further automatic build needed tonight.

- [x]914 cone/revolve topology and UVs: four focused automated checks.
- [x]914 DEVICE Cylinder/Cone/Revolve UV Editor/history/SaveOpen: user PASS2026-10-19.
- [x]913 DEVICE repeated On surface retest: user914 PASS2026-10-19.

Local Node24.19.0 complete regression: **2578 PASS / 0 FAIL / 0 skipped**.
Reviewed shell changes only Mesh Health and both recovery URLs; UV child and Lab
parent chain914. Original913 painter/resource budget retained. An initial local
cache-contract run caught an overbroad shell pin replacement during preparation;
restored unrelated913 pins before FINAL full2578PASS run. No published bad graph.
Publication evidence to follow; manual device gates remain pending.


## .914 publication verified — 2026-10-18

Runtime88315294db29a9046ace8cef4896c449a31166e9; tested tree
 d5dcff41107bed86a43b34f7bf95240122cfa22e. Uploaded13 exact source blobs/tree,
fetched main and aligned local equivalent tree. LocalNode24.19.0 and hostedNode22
full2578PASS/0FAIL/0skip. TopologyCI39123430499/job117663549250 SUCCESS;
Pages39123429994/build117663550431/deploy117663655310 SUCCESS. All12 checked
live shell/manifest/UV owner/Mesh Health/Lab parents/recovery/Multi/painter/budget
files byte-match source after deployment. Initial public proxy timeouts/old913
manifest resolved on retried versioned fetch; final12/12 match914. Extra unversioned
manifest request timed out at proxy; no evidence of app regression. Protected
Multi1.0/frozen/modelling/paint kernels and unrelated913 pins retained. All four
continuity files current; proof changes docs only. No device PASS inferred.
Stop at manual gate: tomorrow914 Cylinder/Cone/upright Revolve UVs +913 repeat-image
retake; first912 image placement PASS protected. Material-channel work stays queued.


## .915 — precise paint RGB / HSB / hex; .914 user PASS — 2026-10-19

User914PASS accepts preceding Cylinder/Cone/upright Revolve UVs, UV Editor/history/
SaveOpen and repeated On surface images manual list. Protect914 UV +913 repeat-add
behaviour and earlier surface placement, masks/layers/paint/native exports. Audit
0a7ba302: production paint has only browser swatch, no numeric RGB/HSB editor.
New small paint-colour-controls binds ORIGINAL input, sRGB0–255 / HSV hue0–360,
saturation+brightness0–100%, hex optional#; shorthand only commits on change.
Hue survives grey, saturation survives black; invalid/partial/range entries never
publish and revert on commit. Same swatch input event owns stroke cancel/rollback;
no pointer/history/paint kernel or resource/codec/export change. Numeric controls
follow original mask/image disabled state. Collapsed foldout, original swatch retained.
Brush preferences are session UI only, not object/save metadata. Three focused actual
UI/pixel/history/project/native tests added; full suite/publication follows.
Only painter UI/new helper and shell/recovery keys915; core/budgets913/UV914/frozen/
Multi1.0 remain pinned. Read docs/paint-colour-controls-915.md for owner audit.
Next DEVICE setRGB/HSB/hex, paint, picker sync and grey→colour/black→colour; mask
colour controls disabled; history/image placement remains accepted. Then independent
roughness DATA-resource + explicit scene transport foundation through authoritative
owners, followed by visible controls/preview; no sRGB blends for data/normal maps,
no arbitrary native-UV material metadata or new writer. Other material slots queued.

- [x]915 numeric colour UI linking, grey/black memory and no scene history on selection.
- [x]915 invalid/partial values, shorthand commit and mask-disabled controls.
- [x]915 actual stroke cancel, exact cyan pixels, Undo/Redo, Save/Open and native PNG.
- [x]915 DEVICE preciseRGB/HSB/hex and paint checks: user PASS2026-10-19.

Local Node24.19.0 full regression **2581 PASS / 0 FAIL / 0 skipped**; existing905/906
nearby14PASS and new915 focused3PASS. Original colour brush/resource/history/UV/
image/export/Multi/frozen owners unchanged. Publication verification follows.


## .915 publication verified — 19 October 2026 (Brisbane)

Runtime6c094e8448dbbc324146af621a709b5581160e06; tested tree
 e0d4f532e7c2a558d585d155ac1052769c797f95. Uploaded13 exact blobs and identical
tested tree; main fetched/local equivalent tree aligned. Node24 local + Node22
hosted full2581PASS/0FAIL/0skip. TopologyCI39167551114/job117793558051 SUCCESS;
Pages39167550557/build117793559585/deploy117793690409 SUCCESS. Final12/12 checked
live shell/manifest/painter/new colour helper/recovery/core/UV/Multi/budget/surface
files byte-match source. Initial in-flight reads served914 and helper404 with proxy
timeout; fresh postdeployment complete graph matches915. Only painter/new helper,
three shell cache keys and reviewed fixture changed; all other algorithm pins retained.
All four continuity files current, user914PASS protected. This proof is docs only;
915 device colour/picker/grey-black recovery/paint gate pending. Next independent
roughness data-resource/transport foundation per docs/paint-colour-controls-915.md;
no extra material-channel parity or iPad performance claim inferred.


## .916 — compact left Paint + Object radial UV; .915 PASS — 2026-10-19

User915PASS protects linkedRGB/HSB/hex and prior paint/UV. User explicitly requests
Paint left/tidy because bulky UI obstructs mesh, plus dedicatedUV in Object radial.
This user direction takes priority over roughness work; audit only, no roughness
resource/schema changes made. Same tool-session-ui owner special-casesuv-paint as
left8px/top12px/272px bounded scrolling dock, keeps original footer/buttons intact,
skips wide action reparenting; next tool clears width and original centred placement
returns. Shared positioner/wide-layout732 unchanged. Painter re-groups SAME controls:
colour/size/opacity/layer/Add exposed; brush/RGBHSB/layer settings/masks collapsed,
image controls staged only; sticky UndoRedoDone. No pointer/brush/resource changes.
UV outer90°/230px added preserving other Object sectors; newuvToolsBtn launches SAME
Mesh Health UV owner inuv-tools session, titleUV and diagnostic nodes hidden. Projection/
workspace/history/payload/Close owners unchanged; Refresh stays visible. Mesh Health
mode hides UVs and retains repairs. UV-only reports skip health analysis and refresh
on context/history changes. Close old mode before switching IDs; original radial/
background close adapters includeuv-tools. No second editor/kernel/history.
Two new integration checks + updated original radial/workspace harness retain semantic
checks; full suite/publication follow. All6 changed owners+shell/recovery916; unchanged
paint core/budgets913/colour915/UV mapper914/Multi/frozen/modelling/shared layouts retained.
Read docs/paint-uv-layout-916.md. Next DEVICE left dock footprint/sections, paint/mask/
image placement; ObjectUV project/editor/Back/Close and Mesh Health repair regression.
Then resume independent roughness data-resource/explicit transport foundation.

- [x]916 actual session docking/node identity and next-tool centre restoration.
- [x]916 UV-only projection/history/close and Mesh Health mode restoration.
- [x]916 DEVICE left Paint size/scroll/sections/Done and image M/R/S: user PASS2026-10-19.
- [x]916 DEVICE Object radialUV/editor/exit and Mesh Health: user PASS2026-10-19.

Local Node24.19.0 final full **2583 PASS / 0 FAIL / 0 skipped**. Initial full run
caught two outdated test adapters:439 expected literal fixed Mesh Health ID,731
Sweep host omitted real DOM style property. Updated fixtures to dual ID and actual
host shape; kept all semantic/read-only/Sweep assertions. Focused9PASS, final full
2583PASS; no runtime Sweep or shared positioner changes. Publication/visual proof follows.


## .916 publication verified — 19 October 2026 (Brisbane)

Runtime3295032ca2bd89cf7c4a7de3b870656d765fcd2f; tested tree
5be85556700c13b08b8294e45082406f5e2b9759. All21 uploaded blobs/tree match tested
local source; fetched main/local equivalent tree aligned. LocalNode24 + hostedNode22
full2583PASS/0FAIL/0skip. TopologyCI39173064962/job117809986464 SUCCESS;
Pages39173064486/build117809988186/deploy117810083028 SUCCESS. Live13/15 checked
files byte-match, including shell/manifest and ALL6 changed runtime owners, recovery
version/wide layout/Multi/colour/UV mapper. Two UNCHANGED files (release-bootstrap,
shared positioner732) repeatedly proxy-timed-out on HTTP recheck; repository exact
bytes/pins retained and previously verified. No claim those two were fetched916.
Cloud browser loaded visible916 shell but WebGL context creation failed in unchanged
main854/Three renderer; therefore no mesh/radial/Paint rendered acceptance claimed.
Isolated test tab closed; no screenshot of a blank mesh returned as layout proof.
Actual session/UV owner semantics and native paint/image flows remain tested by Node;
iPad left-dock/section/scroll and UV navigation manual gate remains pending916.
All four continuity files + workflow user exception updated. User915PASS protected;
this proof changes docs only. Roughness audit read-only, implementation deferred.


## .917 — roughness data / project foundation; .916 user PASS — 2026-10-19

User916PASS protects compact LEFT Paint/sections/Done, colour/image Pencil cycle,
Object radialUV projection/editor/exit and Mesh Health repair baseline. Audit current
ddf240f6: only sRGB colour resources exist; imported scalar writers already own map
export. Add separate R8roughness resource16–512 axes, linear data/UV-v0-first/binding,
owned capture/encode/decode, committed read-only sharing convention. Exact schema,
canonical original project bytes, dedup4MiB unique/8MiB expanded and predecode budget/
ref validation. Scenev6 ONLY with roughness; mandatorycolourPaintVersion delegates
original colourv1–5 envelope to unchanged owners. Without roughness exact legacyJSON/
version retained. UV envelope stays UV-only; original32MiB file + colour budgets stay.
Original scene snapshot/restore/addMesh/single+Multi Duplicate share resource, edits
replace; atomic Open corruption and render failure retain scene/resources/history.
Join refuses scalar-only paint; linked nativeUV guard retained. Shared export mesh
resolver refuses roughness-bearing OBJ/GLB/NOM (including alongside colour) instead
of silently dropping unsupported channel. No writer/provenance/geometry/brush/UI
kernel added. Six new integration tests cover data bytes, all legacy colour transports,
quotas/refs/predecode/ownership, actual history/Duplicate/File/Open/rollback and writer/
Join refusals. Full suite/publication follow. Docs: roughness-resource-917.md.
Actual resource/codec/metadata/guard + complete parent/Lab graph917; painter UI only
parent pin, retains accepted916 left dock/UV access. Multi1.0/frozen/UV914/colour915/
brush/projection/layout/modelling kernels unchanged. No roughness controls/render/
export/layers/displacement parity claim. No new device roughness test possible yet.
Next original scalarPNG + NOM/GLB material export adaptation with async capture/binding/
combined material identity tests, then visible channel/preview through original painter.
Manual nearby: existing colour paint SaveOpen/Duplicate; do not ask synthetic R8 fixtures.

- [x]917 R8 owned bytes and colourv1–5 exact transport preservation under explicit scenev6.
- [x]917 malformed/ref/unique+expanded budgets before decode; failed adds do not alter pool.
- [x]917 original history/single+Multi Duplicate/File/atomic Open and render rollback.
- [x]917 unsupported data export/Join refuse; no roughness inside nativeUV envelope.
- [ ]917 DEVICE nearby existing colour paint SaveOpen and ordinary Duplicate regression.

Local Node24.19.0 full **2589 PASS / 0 FAIL / 0 skipped**; six new917 checks and
all existing colour/UV/left-dock/paint/image/native regressions pass. Reviewed complete
parent/Lab cache graph, source stamps retained, protected Multi/frozen unchanged.
Publication evidence follows; no new roughness device UI or render claim.


### Build .917 publication verification

Runtime commit `30f39970f808a022af054f0e4505d20eaef39772`, tested tree `0b4dc5441f3399232a36cdddfb1e458567eb641c`, is published. Hosted Node 22 regression run 39194785838 (job 117875081484) passed all 2,589 tests, with zero failures or skips. Pages run 39194785560 completed successfully (deploy job 117875216536). All 25 checked live runtime, Lab, release and protected Multi files matched repository bytes. Protected .916 user PASS remains in force; no rendered roughness UI acceptance is claimed.

Hands-on .917 checks: paint a distinctive mark, Save .boxlab and reopen; duplicate a painted object, paint the copy, and Undo/Redo while confirming the original remains unchanged. Roughness has no controls yet; its resource/project/history foundation is covered by automated tests. Next narrow work remains scalar PNG and existing export-owner adaptation before visible roughness painting.


## .918 — roughness export through existing writers; .917 user PASS — 19 October 2026

User917PASS protects existing colour Save/Open, painted Duplicate isolation and
Undo/Redo. Audit main0f040ed2/.917: scalarPNG/native material slots/GLB material patch
already exist. Extend original paint-export capture with strict owned R8 copies
before await, existing native Base UV key/digest for both channels, and scalarPNG G
encoding (no gamma/flip/resample/factor bake). Original NOM roughness slot/factor1,
UV/polygon/container/name/dedup/24MiB budget retained. GLB G roughnessFactor1 and
metallicFactor0; image identity separate from combined colour+roughness material
identity so shared colour cannot merge distinct roughness maps. Scalar-only and
colour+scalar supported; unprepared sync native/OBJ/Join still refuse. No project
schema/history/brush/UI/kernel/provenance changes. Five actual writer/File/PNG/async/
binding/refusal/source-immutability regressions added; old917 async refusal updated
to stale-binding validation, other guards retained. Changed owners and recursive
parent/Lab cache graph918; protected Multi1.0/frozen/modelling and accepted Paint UI
retained. Read docs/roughness-export-918.md. Full validation/publication follow.
No roughness controls/preview yet; next original painter scalar channel integration.
Manual nearby: export differently painted original/copy to NOMAD and GLB, confirm
independent colour/UV placement; paint Save/Open/history remains protected917PASS.

- [x]917 DEVICE existing paint Save/Open and Duplicate/UndoRedo: user PASS2026-10-19. Protected.
- [x]918 automated scalar PNG/NOM/GLB exact bytes, UVs, combined materials and dedup.
- [x]918 automated async capture, malformed/stale owner refusal and source immutability.
- [x]918 actual File NOMAD/GLB actions download scalar maps and report counts.
- [ ]918 DEVICE nearby colour NOMAD/GLB export appearance; no roughness controls yet.


User reminder — 19 October 2026: every build completion must explicitly state
whether there is something to test, with build/readiness and quick hands-on checks,
or clearly state no new hands-on test is needed. Reaffirmed in AI_WORKFLOW.md.


.918 final local validation: Node24.19.0 full **2,594 PASS / 0 FAIL / 0 skipped**.
Five new export integrations and all existing paint/image/UV/modelling checks pass.
Initial cache preparation accidentally repinned unchanged917 shell owners; regression
checks caught this, unrelated pins were restored, reviewed contract passed, and the
final complete suite above ran against corrected source. No bad graph published.
Multi1.0 and frozen betas unchanged. Publication verification follows.


## .918 publication verified — 19 October 2026 (Brisbane)

Runtime commit `57a53f93ffb8c9a194bb1baaccbb738ab0d8b924`, tree
`c15f998e6ecaa416e159bca959312370e419b048`, is published. Hosted topology
regression run `39232675588`, job `117994153957`, completed successfully;
Pages run `39232675125` completed successfully. The build's recorded local full
suite is 2,594 PASS / 0 FAIL / 0 skipped; this continuation verified hosted success,
without rerunning the local suite. All 19 checked live files byte-match main:
shell/manifest, every changed runtime and Lab file, and protected Multi1.0.
No runtime changes in this continuation and no .918 device PASS inferred.

The app is ready for testing — build .918. Export differently colour-painted
original/copy to NOMAD and GLB; check independent colour and UV placement. Repaint
the copy and repeat NOMAD export to confirm the original remains unchanged.
Roughness fixtures are automated; there are no roughness controls to test yet.
Next narrow build: visible roughness channel/preview through existing compact Paint,
raster/input/history owners, preserving scalar data semantics and existing exports.


## .919 — Roughness Pencil painting and grayscale inspection — 19 October 2026

User .918 PASS protects independent original/copy colour and UV placement in NOMAD
and GLB, including repaint/re-export isolation. Audit c005f107: .917 resource/project/
history and .918 original writers exist; no scalar channel in the painter. Extend
original viewport-paint-core and compact left UI only. Channel Colour/Roughness,
0–255 value slider, same size/hardness/opacity/pressure and BoxLab/Klecks samplers.
Opaque raster's raw-byte interpolation carries equal RGB values; publish owned R8
through original roughness resource/pool and scene checkpoint. White default =255;
0 smooth /255 rough. No gamma conversion or colour blend modes in scalar math.
Grayscale inspection is temporary and labelled; Done returns existing colour/Studio
appearance. No lit material roughness preview yet. New maps512²; valid other sizes
remain savable/exportable but painting refuses without resampling. Roughness channel
has no layers/masks/image operations; original colour controls disabled, restored
on Colour. Channel change cancels live contact/placement, never adds history.

Scalar identity joins existing async/current-state guards. Invalid/stale binding,
quota/checkpoint failure rolls back preview and leaves scene/shared resources intact.
Original single/Multi Duplicate, history, scenev6 Save/Open and NOM/GLB writers remain
owners. Only two painter modules and their shell pins change; new child references
use existing918 resource/pool pins. Multi1.0/frozen/modelling/render/export kernels,
Lab and brush sources unchanged. Six focused integration checks cover actual UI,
bytes/cancel/coverage, history/project, actual single+Multi Duplicate and GLB/native
PNG, quotas/rollback and stale/non512 refusals. Full validation/publication below.

Next DEVICE: Paint → Channel Roughness, paint value0 then255 elsewhere; inspect gray
map. Colour returns original paint; reselect Roughness to inspect retained map.
Done/Undo/Redo, Save/Open then Roughness; duplicate/repaint and export NOMAD to check
smooth/rough regions under lighting. No rendered/iPad performance acceptance inferred
from Node adapters. Next build: lit roughness preview through existing material/
surface lifetime owner, retaining accepted colour appearance where no scalar exists.

- [x] .918 DEVICE independent colour/UVs in NOMAD+GLB and repaint isolation: user PASS. Protected.
- [x] .919 six integration checks: actual UI, byte interpolation/cancel, history/project,
  actual single/Multi Duplicate + native/GLB maps, quota/checkpoint and stale/size guards.
- [x] .919 DEVICE Roughness value0/255 strokes, channel return and retained grayscale: user PASS2026-10-19.
- [x] .919 DEVICE Undo/Redo, Save/Open, duplicate isolation and Nomad smooth/rough appearance: user PASS2026-10-19.

.919 final local validation: Node24.19.0 full **2,600 PASS / 0 FAIL / 0 skipped**.
Six new scalar integration checks pass; reviewed release contract5PASS and original
colour/mask checks retained. No runtime tests skipped, no protected/frozen changes.
Publication verification follows; actual iPad/grayscale/native-lighting gate pending.


## .919 publication verified — 19 October 2026 (Brisbane)

Runtime `76e48e3b4ee5dc73018e566a5f8a4b323ca3bac9`, tested tree
`e58d35ee563881ae74fefbb03c3cfbfe62f567b2`, is published. Connected Git Data
created the identical local tested tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39242723896` / job `118027165309` both pass
2,600 tests, zero failures/skips; hosted complete logs verified counts. Pages
`39242722754`, deploy job `118027373427`, completed all deployment steps successfully.
Ten fresh live files byte-match tested source: shell/version, both changed painter
owners, both recovery scripts, paint target, roughness resource/pool and Multi1.0.
Initial predeployment requests served918; final complete graph matches919.
Shell push lacked credentials; connected Git Data publication used expected-parent,
non-forced ref update. No protected/frozen/modelling/export/render changes.

All four continuity files are current; this proof changes docs only. User918PASS
protected. .919 iPad Pencil/grayscale/navigation/native-lighting acceptance pending;
no actual rendered proof inferred from Node adapters. Ready for hands-on checks in
this build's entry. Next lit material preview through existing surface/lifetime owner.


## .920 — lit roughness material preview — 19 October 2026

User .919 PASS protects Roughness0/255 Pencil painting, Channel/grayscale retention,
Undo/Redo, Save/Open and native smooth/rough map handoff. Audit fb7f928a: original
paint-target surface is unlit Basic, render-modes owns existing Studio/base lighting.
Extend SAME paint surface/lifetime; no new mesh, raycast, shader, light or history owner.
Paint Preview select offers Channel(default, preserving919) / Lit material. Existing
UI/input owner cancels active contact/placement on toggle; no scene/history metadata.
Live Standard material receives current flattened colour(sRGB) and roughness(linear
NoColorSpace/G), factor1/metalness0/white colour. Working roughness reads raw equal-RGB
bytes from original opaque raster; no gamma/factor bake, resampling or source writes.
Dirty updates coalesce with original frame tick; textures/materials reused until dispose.

Committed valid roughness displays lit after Done/rebuild in original Studio/Solid/
UV Image modes, active and inactive/locked objects. Scalar-only uses neutral white;
colour-only remains original unlit appearance unless explicit Paint Lit preview.
Both channel identities/UV binding checked after await; stale scalar is not sampled,
valid colour can retain Basic fallback. Malformed scalar/unsupported owners safely
fall back to original body; stale colour or all invalid channels dispose preview.
Existing diagnostic modes clear through same lifetime owner. All surface textures
are privately owned; dispose once on body/mode/session loss; original body restored.
Non-square16–512 committed data maps display without resampling (editing512² rule
retained). Auxiliary lit textures up to two512²RGBA buffers per surface, plus existing
channel surface and GPU copies; not a measured device-performance/memory claim.

Six focused integration checks cover exact data/sRGB/UV/material settings and lifetime,
scalar-only/colour-only/stale fallback, actual UI toggle/cancel/dirty coalescing, live
colour+scalar isolation/checkpoint rollback/body disposal, async/project/history and
actual render owner active/inactive/mode behavior. Node uses real Three materials,
geometry and pixels; no WebGL render, highlights, iPad latency or Nomad parity proof.
Same source resources/projectv6/brushes/export algorithms retained. Four changed
runtime owners plus recursive export/Lab cache graph; Multi1.0/frozen unchanged.
Read docs/roughness-preview-920.md. Full regression/publication evidence below.

Next DEVICE: Roughness → Preview Lit material; paint0 then255, orbit in Studio to
compare highlights. Channel returns retained grayscale, Lit returns colour/material.
Done keeps lit roughness; Save/Open and select a different object retain appearance.
Undo/Redo and duplicate isolation remain protected. Existing no-roughness colour
objects retain original look. Then audit remaining material slots, starting Metalness
resource/export/preview owners; keep stages narrow and data-aware, no parity claims.

- [x] .919 DEVICE scalar strokes, Channel retention, history/SaveOpen and Nomad appearance: user PASS. Protected.
- [x] .920 six focused tests: texture semantics, lifetime, live UI/cancel/coalescing,
  channel isolation/checkpoint rollback, history/project and real render-owner modes.
- [x] .920 DEVICE Lit material0/255 highlights under orbit; Channel/Lit switch preserves maps: user PASS2026-10-19.
- [x] .920 DEVICE Done/SaveOpen/active↔inactive appearance, UndoRedo and duplicate isolation: user PASS2026-10-19.

.920 FINAL local validation: Node24.19.0 full **2,606 PASS / 0 FAIL / 0 skipped**.
Six new focused checks and all legacy semantics pass. Reviewed shell/cache-contract
5PASS; other export/Lab parent edits verified pin-only; protected Multi1.0/frozen intact.
Initial preparation run caught an incorrect temporary write target that replaced the
local HTML shell with cache-fixture JSON. Restored shell from main, applied only reviewed
pins/markers, corrected fixture destination, then reran the entire final suite above.
No malformed shell published and no behavior checks relaxed. Publication proof follows.


## .920 publication verified — 19 October 2026 (Brisbane)

Runtime `b3aae5266bcff0f206500d2e5fea278825e5cd41`, tested tree
`22b91cd354bb03f4acd9540adf4952b04a69b546`, is published. Connected Git Data
created an identical local tested tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39245427937` / job `118036074696` both pass
2,606 tests, zero failures/skips (hosted complete logs verified). Pages run
`39245427818` deploy job `118036289017` completed all deployment steps successfully.
All18 fresh live shell/version, four runtime owners, complete changed export/Lab
parent graph, recovery, protected Multi1.0, retained roughness resource/pool and
project codec files byte-match tested source. Initial predeployment reads served919;
final complete checked graph matches920. No frozen/modelling/brush/project/export
algorithm changes. Source scalar bytes/data semantics retained; no custom lights.

All four continuity documents updated; this proof is docs-only. User919PASS protected;
920 actual iPad highlights/material appearance/latency acceptance remains pending,
not established by Node Three material/texture tests. Ready for hands-on Paint
Roughness → Preview Lit material0/255/orbit, Channel return, Done/SaveOpen/selection
and existing no-roughness colour appearance. Next remaining material-slot audit
(Metalness candidate) follows device feedback, through original owners.


## .921 — metalness data/project foundation via shared scalar owners — 19 October 2026

User920PASS protects Lit/Channel roughness preview, highlights, Done/SaveOpen/selection
appearance and original colour-only look. Audit main05ddf085: imported NOM/GLB metalness
slots exist; editable resource/scene transport do not. Extract the accepted917 R8
validation/canonical byte codec and dedup/quota/predecode pool into shared scalar
owners; existing roughness API/descriptor/byte serialization/errors and4MiB unique /
8MiB expanded budgets retained. Metalness uses separate strict linear R8 descriptor,
16–512 axes, UV-v0-first, owned captures, read-only committed sharing. No RGB blending,
new brush/kernel/history/writer or metalness UI/preview delivered.

Explicit scenev7 ONLY when metalness exists: mandatorypaintProjectVersion1–6 delegates
existing envelopes, roughnessv6 retainscolourPaintVersion1–5. Without metalness original
legacy JSON/version retained exactly. Independent metalness pool4MiB unique/8MiB
expanded, original32MiB file and colour/roughness budgets retained. Complete resource/
ref/schema/size preflight before mesh creation; corruption/quota/unsupported owners
refuse atomically. Native UV envelope remains UV-only. Original history snapshots/
restore/addMesh/single+Multi Duplicate carry metalness by read-only reference; edits
replace. Original File Save/Open and render-failure scene/history rollback retained.
Join/linked operations and raw/async OBJ/GLB/NOM exports refuse metalness-bearing
objects, even alongside accepted colour/roughness, so pending channels cannot vanish.
No imported metalness export behavior changed; native paint export adaptation next.

Six new integrations cover codec ownership/channel separation, all six legacy formats/
exact removal/dedup, schemas/refs/quotas/owner guards, actual history+single/Multi
Duplicate, actual File Save/Open/corrupt/render rollback, all writer/Join refusals.
Existing917–920 scalar/paint/preview nearby23PASS. Complete reviewed resource/codec/
metadata/export/parent/Lab graph921; UI/render/brush algorithms unchanged. Multi1.0,
frozen betas and modelling kernels untouched. Read docs/metalness-resource-921.md.
Full regression/publication evidence below. No new metalness device feature yet.

No new hands-on test needed for921; user920PASS is protected. New foundation fixtures
are automated, never a synthetic iPad task. Next narrow build: captured metalness
through existing scalar PNG/NOM/GLB material owners, including combined colour+
roughness+metalness identities/async capture and data semantics. Then visible Pencil
channel and lit preview through existing compact Paint/material owners.

- [x]920 DEVICE Lit/Channel appearance and Done/SaveOpen/selection: userPASS protected.
- [x]921 six automated integrations: scalar bytes/legacy1–6/v7 schemas/quotas,
  original history/Duplicate/File/rollback and all unsupported writer/Join refusals.
- No new921 hands-on gate or metalness controls;920 appearance acceptance protected.

.921 final local validation: Node24.19.0 full **2,612 PASS / 0 FAIL / 0 skipped**.
Six new integrations + existing917–920 nearby23PASS; release contract5PASS.
All other changed JS parents verified pin-only; protected Multi1.0/frozen/modelling
and existing paint/preview/export algorithms retained. No behavior checks relaxed.
No new hands-on gate; user920PASS protected. Publication verification follows.


## .921 publication verified — 19 October 2026 (Brisbane)

Runtime `21ea62ebddef2a404b14e029fdb0744a1bd0862f`, tested tree
`f0d7a3f92abab520806a4ed5874f99f3b7cb25f2`, is published. Connected Git Data
created an identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39248074915` / job `118044791985` both pass
2,612 tests with zero failures/skips; hosted full logs verified. Pages run
`39248074813`, deploy job `118045052264`, completed all steps successfully.
All30 checked live files byte-match tested source: shell/version, every changed
runtime/parent/Lab file, four new scalar modules, recovery, protected Multi1.0 and
retained colour pool. Initial in-flight reads served920/new modules404; final whole
checked graph matches921. No protected/frozen/modelling/brush/preview algorithm changes.

All four continuity files current; this proof changes docs only. User920PASS protects
existing lit roughness/Channel/Done/SaveOpen/selection/colour appearance. Build921 is
complete; no new hands-on test needed because metalness controls/preview/export are
not exposed yet. Fixture transport/history/atomic Open and refusal checks are automated.
Next narrow build: captured metalness through original scalar PNG/NOM/GLB writers,
then original Paint channel/material preview. No metalness visual acceptance claimed.


## .922 — metalness export through original NOM/GLB owners — 20 October 2026

Continue authorized921 foundation; no new device PASS inferred. User920PASS remains
protected for paint/lit roughness/Channel/history/SaveOpen/selection/colour-only look.
Audit main2c438348: existing native metalness slot, scalar PNG, paint capture and GLB
material patch own required transport. Extend these owners; no new writer, schema,
metadata provenance, history, modelling/paint kernel or UI controls.

Capture owned metalness alongside colour/roughness/geometry/native UVs BEFORE await;
original Base target digest validates all channels. Native metalness uses original
lossless grayscalePNG + metalness slot/factor1; roughness factor1/default1 retained.
Original names/content dedup/polygon UV pool/container/24MiB aggregate budget remain.
GLB uses packed RGB data PNG G=roughness(or255), B=metalness, R=255, factors1; only
roughness retains accepted grayscale PNG/metallicFactor0. Same PNG RGB/filter/CRC/zlib
packager gets explicit no-colour-metadata path, not a canvas/gamma/resample encoder.
Packed pair cache plus original colour image cache and full material key distinguish
all colour/roughness/metalness combinations; shared exact resource pairs reuse images.
Absent colour remains white. Independent non-square maps remain exact in NOM; GLB
requires matching roughness/metalness dimensions and refuses rather than resizing.
New data rows remain UV-v0-first, no factor baking or sRGB metadata on scalar data.

Original File actions report metalness counts. Raw OBJ/unprepared sync native/Join
still refuse metalness; invalid descriptor/stale binding/evaluated/imported/linked
owners refuse. Async download captures never assign maps to source scene or native
UV metadata. Resource/projectv7/history/brush/UI/lit preview algorithms unchanged.
Complete changed PNG/export/parent/Lab graph922 only; Multi1.0/frozen unchanged.
Old921 async blanket-refusal assertions now check stale binding; raw guards retained.

Eight new integration tests cover actual NOM/GLB export+loader and File actions,
independent PNG CRC/zlib/channel bytes, combinations/dedup, metal-only defaults,
unequal-size refusal/NOM retention, async snapshots, invalid owners, original native
24MiB preflight AND final writer cap, PNG data-vs-colour metadata/ownership.
Native writer budget test imports its ACTUAL versioned paint-export dependency:
prepared WeakMaps are module-local, so an unversioned Node helper cannot prepare
another versioned module's writer. First fixture attempt hit the intended raw guard;
corrected test wiring, not the runtime guard. Read docs/metalness-export-922.md.
Full regression/publication evidence below; no renderer/Nomad appearance acceptance
inferred from Node adapters. No new hands-on test needed: metalness has no controls
yet. Next original Pencil scalar channel + material preview integration in narrow
stages, preserving existing colour/roughness and independent resource semantics.

- [x]922 eight integrations: exact native/GLB G/B, all-channel materials/dedup,
  metal-only defaults, unequal dims, async capture, invalid owners, File downloads,
  no sRGB on data PNGs and original native24MiB caps.
- [x]921 raw OBJ/unprepared native/Join guards retained; async stale-binding tests updated for922 capability.
- No new922 device task: metalness controls pending; user920PASS remains protected.

.922 final local validation: Node24.19.0 full **2,620 PASS / 0 FAIL / 0 skipped**.
Eight new integrations and all existing paint/preview/modelling/import/export checks
pass; reviewed release contract5PASS. PNG data metadata path preserves old colour/
scalar semantics; source resource/project/history/UI algorithms and Multi/frozen
unchanged. No assertions excluded; old async refusal upgraded to binding contract.
No new hands-on gate; publishing verification follows.


## .922 publication verified — 20 October 2026 (Brisbane)

Runtime `e550ae539d3a59789de95c6b9d18b800f4a7eb27`, tested tree
`28860d5de9252cf60d31a11636082113f678bc95`, is published. Connected Git Data
created an identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39335979744` / job `118345461602` both pass
2,620 tests, zero failures/skips; complete hosted logs verified counts. Pages
`39335978411`, deploy job `118345671446`, completed all steps successfully.
All18 checked fresh live files byte-match source: shell/version, all five changed
export/PNG runtime owners and Lab parents, recovery, protected Multi1.0 and retained
scalar resources/project codec/painter UI/core/paint target. Initial in-flight reads
served921; final complete checked graph matches922. No frozen/modelling/brush/
project/history/preview algorithms changed; same native image budget and raw guards.

All four continuity files current; this proof is docs-only. Build922 complete and
published. No new hands-on test needed: editable metalness controls/preview remain
next; export fixtures and actual File actions are automated, no rendered/native
appearance acceptance inferred. User920PASS remains protected; no921/922 devicePASS
invented. Next original scalar Pencil channel, then existing material preview owner.

## .923 — Metalness Pencil channel and existing lit material preview — 20 October 2026

Audit main f2cc8a38 / .922: scalar resources, codec/history/duplicate and native/GLB
writers already exist; expose them through original compact LEFT Paint and surface
owners. Shared scalar configuration reuses accepted raster, quota/checkpoint and
cancellation paths. Metalness starts black0, brush defaults255; opaque raw equal-RGB
working bytes publish independent linear R8 only. Colour/masks/images stay disabled
while editing either scalar; returning Colour restores existing controls/layers.
Non512 retained maps refuse painting rather than resampling. All identity/binding,
body lifetime, budget and checkpoint refusal rules retained.

Existing surface owns separate linear roughness G and metalness B textures; metal
factor1 with a map, default0 otherwise. Existing lighting/UVs/colour sRGB remain.
Live dirty uploads coalesce; switching Channel/Lit or scalars cancels contact without
history. Committed active/inactive/locked overlays use same owner; disposal frees maps.
No new brush/kernel/writer/history owner, lights, environment, or modelling changes.
Reverse loader/cache graph reviewed and pinned923; protected Multi1.0/frozen intact.
13 new integrations cover UI/raw0/255/opacity/no-op, cancellation, quota/checkpoint,
identity/stale/non512, history/SaveOpen/single+Multi Duplicate, actual NOM/GLB bytes,
linear B material, map independence/lifetime and active/inactive render ownership.
Existing roughness/mask nearby19PASS. Read docs/metalness-paint-923.md.

User920PASS remains protected; /nextbuild alone is not921/922/923 device acceptance.
DEVICE923: Metalness0/255 Channel/Lit, low Roughness highlights, independent channels,
Done/SaveOpen, UndoRedo and duplicate isolation; native Nomad material sanity check.
Next: respond narrowly to923 device feedback before adding more material channels.

.923 local validation: Node24.19.0 full **2,633 PASS / 0 FAIL / 0 skipped**;
13 new integrations, nearby roughness/mask19PASS and release contract5PASS.
No existing assertions relaxed; protected Multi1.0/frozen/modelling unchanged.
Publication/hosted regression/live-byte verification follows. Device923 pending.

## .923 publication verified — 20 October 2026 (Brisbane)

Runtime `e505f232856a7d6581368de7f7cf29e45cc514da`, tested tree
`342c4ca1282a98ab95abfe65a66bccdc311ac757`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39337186659` / job `118349490286` both pass
2,633 tests, zero failures/skips; complete hosted logs verified. Pages run
`39337186074`, deploy job `118349698451`, completed all steps successfully.
All19 fresh live files byte-match source: shell/version, every changed runtime/
export/parent/Lab file, recovery, protected Multi1.0, retained scalar resources/
metalness pool and project codec. Initial in-flight reads served922; final complete
checked graph matches923. No frozen/modelling/lighting/UV or writer algorithm changes.

All four continuity files current; this proof is docs-only. Build923 complete and
ready for hands-on Metalness0/255 Channel/Lit, low Roughness highlights and independent
channels, Done/SaveOpen, UndoRedo and duplicate isolation. Optional native Nomad
appearance sanity check. Actual GPU highlights/Pencil latency and923 device acceptance
remain pending; user920PASS protected, no921/922/923 devicePASS inferred.
Next: respond narrowly to923 device feedback before another material channel.

## .924 — UV workspace layers contained beneath main toolbar — 20 October 2026

User reports intermittent missing TOP-RIGHT MAIN APP buttons during UV Editor;
clarified these are Frame/UndoRedo/Focus/Objects/VIEW, not UV-local controls.
Audit main553ba061: no UV action deliberately hides the toolbar. Header stacking
context is10; viewport had no stacking context, allowing workspace180 to overpaint
header descendants (including VIEW dropdown200 trapped inside header10).
Add one active-UV-only isolation rule in original uv-workspace stylesheet: viewport
contains its own layers while visible workspace exists. Original header remains
above it; closing/hiding UV automatically removes containment. No z-index arms race,
DOM replacement, event/pointer/history/model/UV/paint algorithm changes. Refresh
UV workspace + Mesh Health loader and shell/recovery924; unrelated pins retained.

Source layering defect identified; exact intermittent iPad button disappearance
not reproduced. Cloud main WebGL creation fails (same known environment limitation),
so no full-app rendered acceptance claimed. Synthetic data-URL layout experiment
blocked by browser URL policy; no workaround attempted. Nearby workspace navigation/
history/lifetime/background/Focus + release20PASS. Initial prep contract caught an
over-broad shell pin replacement; restored unrelated pins before final validation.
No tests weakened, no user923PASS inferred; user920PASS and protected Multi1.0/frozen
remain. DEVICE: repeatedly enter/exit UV, pan/pinch/edit/UndoRedo, check top-right
buttons and VIEW dropdown while inside UV and after Back to3D. If disappearance
persists, obtain screenshot and exact trigger before more presentation changes.
Metalness923 device gate still pending. Next:924 device feedback, narrow repair only.

.924 final local Node24.19.0 regression: **2,633 PASS / 0 FAIL / 0 skipped**;
nearby UV/workspace/history/Focus/background/release20PASS. Final source contains
only active-UV isolation + reviewed loader/release pins; no assertions relaxed.
No rendered/device disappearance acceptance inferred; publication proof follows.

## .924 publication verified — 20 October 2026 (Brisbane)

Runtime `97a4d9e118e8a2bc71b66b90e393eec3818dc264`, tested tree
`0413e5a8253f822d93154f1e4d145b69f0bb97f6`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39338873374` / job `118355146518` both pass
2,633 tests, zero failures/skips; complete hosted logs verified. Pages
`39338872454`, deploy job `118355375163`, completed all steps successfully.
All16 fresh live files byte-match source: shell/version, UV workspace/Mesh Health
loader, recovery, protected Multi1.0, original header/toolbar/view CSS and owners,
painter, retained scalar resources/pool and project codec. Initial in-flight reads
served923; final checked graph matches924. No UV/model/paint/history/input algorithm
changes; only one active-UV CSS rule and reviewed release/cache references.

All four continuity files current; this proof is docs-only. Build924 complete and
ready for iPad retest: repeatedly enter UV Editor, pan/pinch/edit/history, use VIEW,
then Back to3D; confirm main top-right buttons remain visible and usable. Source
layering issue repaired; exact intermittent Safari disappearance still needs this
device confirmation. Cloud main WebGL unavailable, no full-app rendered proof.
If it persists obtain screenshot and exact trigger before further UI changes.
User920PASS protected;923 Metalness device gate still pending, no inferred PASS.

## Device feedback — .924 toolbar PASS; Metalness FAIL — 20 October 2026

User: “PASS for the fix.” Protect .924 main top-right toolbar visibility through UV
Editor; keep active-UV viewport isolation and original header/action owners intact.

Metalness is NOT accepted: user reports whole model black in Channel, white draws
black / black draws white, Lit paints black, and no metal channel in export.
Treat all reported symptoms as an open device failure; do not infer Metalness PASS
from the separate toolbar acceptance. No speculative inversion or resource migration.

Audit current009d45f3: slider forwards integer0–255 directly; scalar raster publishes
raw R8 independent of colour; Channel uses grayscale; Lit samples B with factor1;
existing native slot and GLB packed B receive captured metalness. Rerun actual UI/
painter/history/duplicate/preview/export suites:21PASS/0FAIL/0skip. Those fixtures
write255 white/0black and contain exact metalness in NOM/GLB, so they do NOT yet
reproduce user failure. Lit material/scene have no reflection environment; possible
dark-metal appearance contributor, NOT a confirmed diagnosis of all symptoms.
Cloud GPU limitation still prevents rendered-device reproduction.

Next required evidence: affected .boxlab project and its exported .nom, plus screenshot
with Channel/Preview selector and Value visible. Trace exact authored bytes/binding,
actual exported slot/factors and displayed preview before changing slider semantics.
Do not dismiss report because fixtures pass. Keep original owners; no parallel material
or brush implementation. Runtime remains924, no new build or new manual gate yet.

## .925 — painted metal Lit preview reflection input — 20 October 2026

User clarified with924 screenshots + METAL TEST.boxlab/.nom: Channel255 draws white
correctly; metal exports perfectly in Nomad. Smooth metallic patches turn black in
BoxLab Lit, including when Roughness0 is painted over metal. Prior suspected byte
inversion/export loss are superseded by concrete evidence. Decoded actual project
has independent512² colour and metalness; metal contains0–255. Actual native material
has color+metalness, metalness/factorMetalness1; exported grayscalePNG matches EVERY
project metalness byte exactly. Supplied project predates shown roughness edit; no
roughness map present in that snapshot, not proof of dropped roughness. Uploads remain
unmodified and are not copied into runtime/repository.

Root source omission: Standard painted metal had no scene/material reflection input.
Direct lights give narrow highlights; smooth metal can otherwise show black. Keep raw
0/nonmetal /255metal semantics and existing writers. Original surface/lifetime owner
now acquires a local room PMREM only for metallic Lit material with no existing scene
environment. Original Three179 RoomEnvironment + PMREMGenerator,128cube size, no HDR
network fetch, custom shader or added live-scene lights. Independent envMap per material
uses shared per-renderer/refcount pool; generator/room temporary assets disposed after
creation, render target freed exactly once after last surface. Channel holds accepted
unlit map, colour/roughness-only paths unchanged; explicit scene environment respected.
Source paint/UVs/history/projects and export factors/maps unchanged. No inverted-slider
workaround, source migration or scene-global lighting change.

3new regressions cover original surface binding of reflection+exact scalar channels,
Channel/Lit reuse/source preservation, colour-only/custom environment isolation,
multiple surfaces/reference lifetime, renderer separation and failed-generation retry.
Nearby new+roughness/metalness/export30PASS, release5PASS; full/publication below.
Cloud GPU cannot render actual main; fake target verifies ownership only, not GPU look.
Official API: threejs.org/docs/pages/RoomEnvironment.html and PMREMGenerator.html;
pinned installed Three179 source verified supports fromScene options.size.

User924 toolbar PASS protected; current runtime correction only painted material
reflection path and reviewed reverse loader graph925. Metalness authoring/exports
are confirmed by user clarification,925 visual acceptance pending. DEVICE: reopen
saved painted cube, Lit + Metalness255 and Roughness0, orbit; should reflect studio
panels rather than solid black. Compare Roughness255, Channel0/255, Done/reopen and
NOMAD export. Next respond narrowly to925 visual feedback before new channels.

.925 final local Node24.19.0: **2,636 PASS / 0 FAIL / 0 skipped**;
nearby30PASS and release5PASS. Actual supplied NOM/project metalness compared byte
for byte: identical. No test assertions relaxed; no source/user file modifications.
Protected924 toolbar and Multi1.0/frozen retained. Publication proof follows;
real GPU/925 iPad reflection appearance still pending.

## .925 publication verified — 20 October 2026 (Brisbane)

Runtime `597659e1889220b0a209c1028ec518cb526023c5`, tested tree
`760f3a6e749949ced660cf536d5ead98daff0829`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39362761751` / job `118432489899` both pass
2,636 tests, zero failures/skips; complete hosted logs verified. Pages
`39362761578`, deploy job `118432624041`, completed all steps successfully.
All20 fresh live files byte-match source: shell/version, new reflection helper,
original paint surface and every changed runtime/export/parent/Lab file, recovery,
protected Multi1.0, retained scalar/project owners and accepted924 UV isolation.
Initial in-flight reads served924/new helper404; final checked graph matches925.
Only painted material reflection behavior changed; native/GLB algorithms and source
scalar values retain exact accepted bytes. Supplied project/native files unmodified.

All four continuity files current; this proof is docs-only. Build925 complete and
ready for iPad Lit material metal255/roughness0+orbit reflection check, rough255
blur comparison, Channel0/255 and Done/SaveOpen. Existing Channel and native export
confirmed correct by supplied files/user clarification, not reversed. Real GPU
reflection appearance and latency remain device-pending; Node PMREM target adapter
verifies binding/sharing/lifetime only. User924 toolbar PASS protected.
Next:925 visual feedback, narrow fixes before further material-channel work.

## .926 — whole-object Tap Fill; requested brush roadmap — 20 October 2026

User925 feedback: reflections still not visible in BoxLab preview; Nomad export
“great” and protected.925 visual fix is NOT accepted. No further speculative lighting
change in926; preserve raw maps and correct native handoff. Need actual925/926 preview
version/state or renderer diagnostics before claiming another reflection repair.
User requests Tap to Fill, alpha compatibility, delete-paint/eraser, blur and smudge.
Clarified Tap Fill default WHOLE OBJECT, selected layer/channel, not island/flood region.
Audit existing raster/input/stack/history and prior Klecks integration audit first.

Original raster now shares exactly the same coverage/opaque/straight-alpha texel
operation for brush and fill. New Tool selector Brush / Tap fill · whole object.
Pencil/mouse down must hit visible selected mesh; whole512² selected layer/channel
previews at current opacity/value, release commits once via original finish/preflight/
checkpoint/COW. Size/pressure do not limit fill. Drag>8px, pointercancel/tool/channel
switch/body loss cancel; fingers still navigate, background contacts never fill.
Colour/image/hidden-layer/scalar eligibility guards retained; image colour remains
read-only, editable masks fill normally. No-op adds no history; quota/checkpoint
failure restores original resource/preview/navigation. No schema/writer changes.

4new integrations: exact shared raster coverage/alpha/no-op/cancel; actual UI layer
fill and source preservation/UndoRedo/SaveOpen/native PNG; independent scalar+mask
fill; mesh miss/finger/drag/cancel/settings/body-loss/checkpoint rollback. Nearby19PASS;
full and publication below. Original brush expectations retained, no frozen/Multi/kernel
changes. Reviewed shared raster/main+Lab reverse cache graph926 only.

Remaining requested brushes are accepted roadmap, not delivered buttons: eraser
(transparent overlays/masks; explicit Base reset semantics), alpha tips (bounded PNG
coverage/rotation with original brush), blur and smudge with UV-island/seam-aware
sampling so neighbouring atlas islands cannot contaminate unrelated surfaces.
No ABR import or general Nomad brush-format compatibility promised. Prefer audited
Klecks algorithms in existing raster/input/history over another painting engine.
Next narrow build: reflection diagnostic evidence plus eraser/alpha implementation;
keep blur/smudge scope bounded and test before exposing. No new material channel work.
DEVICE926: choose Tool Tap Fill, tap mesh with chosen colour; UndoRedo. Fill an overlay
at50% opacity; confirm underlying paint retained. Fill Roughness/Metalness0/255 and
check Channel/export independence; switch Brush and confirm normal Pencil strokes.

.926 final local Node24.19.0 regression: **2,640 PASS / 0 FAIL / 0 skipped**;
new fill4PASS, nearby19PASS, release5PASS. Initial preparation contract caught shared
Lab raster omitted from loader closure; complete main/Lab graph reviewed and updated
before final run. No assertions relaxed; protected Multi1.0/frozen/export retained.
Reflection925 remains user-reported unresolved, no lighting fix claim in926.
Publication and hosted/live verification follow.

## .926 publication verified — 20 October 2026 (Brisbane)

Runtime `3b01bce1d66b7a06b2286565811f5e67962ab91f`, tested tree
`e606147e30b8f86de7b009b25c31af536963edec`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39365018326` / job `118439759937` both pass
2,640 tests, zero failures/skips; complete hosted logs verified. Pages
`39365017500`, deploy job `118439889747`, completed all steps successfully.
All19 fresh live files byte-match source: shell/version, main painter/core, shared
raster and complete changed Lab session/loader graph, recovery, protected Multi1.0,
retained scalar/codec/native export/paint export/material/reflection/UV owners.
Initial in-flight reads served925; final checked graph matches926. No frozen,
modelling, project or export algorithm change; original brush semantics retained.

All four continuity files current; proof is docs-only. Build926 complete and ready
for Tool → Tap fill · whole object: tap colour fill/UndoRedo, overlay50% preservation,
scalar0/255 independence and return to Brush. Alpha tips, eraser, blur and smudge are
requested pending stages, not implemented. Reflection preview remains user-reported
unresolved despite925, no new lighting repair claimed. Nomad export confirmed great
and protected;924 toolbar PASS protected. Next:926 device feedback, narrow eraser/
alpha additions and evidence-led preview diagnosis through original owners.

## .927 — explicit scalar label rows and Eraser — 20 October 2026

User926PASS protects whole-object Tap Fill/opacity/history/channel workflow. Screenshot
identifies earlier metal white/black confusion as inline hint text joining readout:
“255Black…” / “0Black…”. No inverted bytes. Shared scalar controls now grid rows:
label + flexible slider + fixed3ch readout, then separate block hints. Explicit
0=non-metal(black)/255=metal(white); roughness0=smooth(black)/255=rough(white).
Help cannot sit beside numeric output. Compact LEFT dock/scroll/footer retained.
No scalar/data/export/light semantic change; reflection925 remains separate unresolved
report, not implied PASS from926 or this clarification. Native export protected.

Next requested narrow brush: original Tool selector gains Eraser. Same samplers,
pressure/size/hardness/maximum per-contact coverage and existing commit/checkpoint/
COW/pools. Transparent colour overlays reduce alpha only, retaining RGB/source/base;
Base resets white. Roughness resets255, Metalness0, masks reveal (raw0 if inverted,
255 otherwise). Original image colour stays retained/read-only; erase its mask.
No scene/material opacity, destructive image baking or deletion of layer/resource.
Colour controls disable for Eraser and restore on return; colour brush setting retained.
Cancellation/settings/body-loss/failed checkpoint retain original pixels/history.
Original Brush and accepted Tap Fill retain semantics; no new pointer/history owner.

3new integration tests cover alpha coverage/RGB/no-op/cancel; actual UI overlay/Base
isolation + UndoRedo/SaveOpen/exact composed native PNG; defaults/mask inversion/
scalar independence and refusal rollback. Existing fill/roughness/metalness/mask23PASS;
full/cache/publication below. Shared main/Lab raster reverse graph repinned927 only;
protected Multi1.0/frozen/modelling/UV/project/native writer unchanged.
DEVICE927: read Metalness0/255 hint below slider with no joined text; erase a painted
overlay to reveal lower paint, UndoRedo; erase Base/scalars, switch Brush/Fill back.
Alpha PNG tips next, UV-safe blur/smudge remain queued. Reflection diagnosis remains
open and should use device/version/renderer evidence, no further lighting guesses.

.927 final local Node24.19.0: **2,643 PASS / 0 FAIL / 0 skipped**;
3new eraser integrations, nearby23PASS and release5PASS. No tests relaxed.
Protected926 Fill/924 toolbar/native export/Multi1.0/frozen retained. Scalar mapping
unchanged; layout/device confirmation and Eraser hands-on gate pending.
Publication/hosted regression/live verification follows.

## .927 publication verified — 20 October 2026 (Brisbane)

Runtime `2fab3eb743d00acdfb93c053957ad1d9be8f6f68`, tested tree
`c97a8423f236aec542b314541b9a9529847b0413`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39369984553` / job `118455433985` both pass
2,643 tests, zero failures/skips; complete hosted logs verified. Pages
`39369984116`, deploy job `118455588608`, completed all steps successfully.
All19 fresh live files byte-match source: shell/version, painter/core/shared raster,
complete changed Lab graph, recovery, protected Multi1.0, retained scalar/codec/native
and paint export/material/reflection/UV owners. Initial in-flight reads served926;
final checked graph matches927. No frozen/modelling/UV/project/writer changes.

All four continuity files current; proof is docs-only. Build927 complete and ready
for label separation/explicit0-255 meaning and Tool Eraser overlay reveal/UndoRedo,
Base white/scalar defaults and return to Brush/accepted Tap Fill. Actual iPad text
layout and Eraser feel remain device-pending; automated tests are not visual proof.
User926 Fill and924 toolbar PASS protected; native export correct. Alpha PNG tips
next; UV-safe blur/smudge pending. Reflection925 remains independently unresolved,
not a slider inversion or an inferred PASS from the corrected help text.

## .928 — Paint stays open across Undo/Redo — 20 October 2026

User .927 PASS protected: scalar hint layout and Eraser, alongside .926 Fill and
.924 toolbar. Requested history gesture fix takes priority over PNG alpha tips.
Audit: original main doUndo/doRedo restores scene/body and painter closes on disposal;
Paint footer also explicitly closed. Original history owner now brackets restoration
with painter preparation/resume. Cancel transient stroke/image before capture, close
old display, reopen on rebuilt active body; retain layer if present, channel/mask if
valid, Lit/Channel preview and existing brush/action/slider controls. No duplicate
history or gesture owner/checkpoint. Empty history and rapid repeated history retain
Paint; Done/other session/object changes defeat stale reopen. Original two/three-finger
gestures, toolbar and footer share this path. Five regressions execute original main
Undo/Redo and touch-end functions with real scene snapshots, paint resources and UI.
Reflection preview remains unresolved; native Nomad export remains correct. Alpha
PNG tips next, UV-safe blur/smudge pending. Device .928 acceptance pending.

- [x] .928: paint two marks, two-finger Undo then continue painting without reopening.
- [x] .928: three-finger Redo and Paint footer Undo/Redo keep channel/tool settings.
- [x] .928: Done still exits Paint; rapid history does not reopen a closed session.

.928 local Node24 full regression: **2,648 PASS / 0 FAIL / 0 skipped**;
five new history regressions and reviewed release contract5PASS. Protected Multi1.0
and frozen builds unchanged. Publication/hosted/live-byte verification follows.

## .928 publication verified — 20 October 2026 (Brisbane)

Runtime `6584f8d060dbbe8a52f901d814d655cece4209ba`, tested tree
`e554ccf0c77018eb4b3fd4134ab80f50a8bddd90`, published through connected Git Data
with the exact locally tested tree; fetched origin/main matched and working tree clean.
Local Node24 and hosted Node22 regression run `39373206187`, job `118465435842`,
both **2,648 PASS / 0 FAIL / 0 skipped**; full hosted log totals verified. Pages run
`39373205537`, deploy `118465573202`, completed successfully. All17 checked fresh
live files byte-match: shell/version, changed main/painter, recovery, unchanged paint
core/raster/scalar/project/export/reflection/UV and protected Multi1.0. Frozen builds
unchanged. All four continuity files current; this proof is documentation-only.

Build928 complete and ready for two-finger Undo / three-finger Redo while Paint stays
open, continued Pencil strokes, retained channel/preview/brush controls and original
Paint footer history. Done still closes. User927 PASS protected; actual928 iPad
acceptance pending. Reflection preview remains independently unresolved; native export
correct. Next bounded PNG alpha tips; UV-safe blur/smudge pending.

## .929 — PNG alpha brush tips; .928 user PASS — 20 October 2026

User .928 PASS protects Paint staying open across two/three-finger and footer
Undo/Redo, retained controls and continued Pencil strokes. Audit main5ee8bb54:
original shared raster/input/history already own brush and Eraser; no custom tip
importer/sampler. Add bounded PNG coverage through those SAME owners, reusing907
image preflight/decode. Brush settings: Load alpha PNG / rotation / Round tip.
PNG≤256²/256KiB, luminance×alpha coverage; white paints, black/transparent skips.
Owned R8 tip≤64KiB, copied per contact; top-first/aspect-preserving rotated bilinear
sampling in UV texels. Alpha replaces round hardness, original pressure/opacity cap/
source-over/erase/cancel retained. Whole-object Fill ignores tip. No new pointer,
history, paint-resource/project/native writer or modelling kernel. Tips/rotation are
session preferences, retained through928 reopen but not saved in.boxlab. Marks persist.
Late/invalid imports retain previous tip and committed work; original decode cleanup.
Read docs/paint-alpha-929.md. Four focused tests cover limits/cleanup/coverage ownership,
rotation/aspect/cancel/erase, real UI/history/project/native PNG and async refusal.
Original shared raster reverse main/Lab cache graph929 reviewed; Multi1.0/frozen intact.
Reflection preview remains unresolved, native export correct. Alpha device gate pending.
Next device alpha feedback, then UV-safe blur/smudge; viewport/baked AO and Edge-based
seam-authoring remain queued for existing-owner audits, not delivered features.
Validation/publication evidence follows; no rendered or device performance claim.

- [ ] .929: Brush settings → Load alpha PNG ≤256²; white paints, black/transparent skips.
- [ ] .929: rotate asymmetrical tip, paint/erase overlay; Undo/Redo stays in Paint.
- [ ] .929: Round tip restores circular brush; Save/Open and NOMAD retain painted marks.

.929 final local Node24.19.0: **2,652 PASS / 0 FAIL / 0 skipped**.
Four new alpha tests and original nearby18PASS; release/cache checks included.
No assertions relaxed. Shared raster main/Lab reverse graph929 reviewed; Multi1.0
and frozen builds unchanged. Publication/hosted/live verification follows.

## .929 publication verified — 20 October 2026 (Brisbane)

Runtime `c9f29fa240fa87a4a3310138058b1cc6f906e58a`, tested tree
`cafdf77c8cdcf612f411659ea1ff953b5ade692f`, published via connected Git Data.
All18 uploaded blobs and tree match locally tested source; fetched main identical.
Local Node24 and hosted Node22 regression39409570949/job118583708420 both
**2,652 PASS / 0 FAIL / 0 skipped**; full hosted logs verified. Pages39409570873,
deploy118583935503 completed successfully. All16 fresh checked live files byte-match:
shell/version, every changed runtime/Lab owner, recovery, protected Multi1.0,
retained image importer/export/paint surface. Frozen builds unchanged.

All four continuity files current; proof is documentation-only. Build929 complete
and ready for Brush settings → Load alpha PNG≤256²/256KiB, rotate/paint/overlay
Eraser, UndoRedo and continued painting, Round tip, SaveOpen/export retained marks.
User928PASS protected;929 visible/Pencil/picker/latency acceptance remains pending.
Reflection preview independently unresolved; native exports correct. Next alpha
feedback then UV-safe blur/smudge; AO and Edge seam audits queued, not implemented.

## .930 — solid Object-mode display, no modelling cage — 20 October 2026

User requests removing the distracting Object-mode X-ray, especially while painting.
Audit current6ce62fe3/.929: main addCage uses depthTest:false neutral axis-line material
for every selected Object edge, drawn over solid body/paint. Actual VIEW X-Ray is a
separate explicit diagnostic mode; do not confuse it with this automatic cage.
Original cage batch gets optional showEdges(defaulttrue); main passes false in Object,
showVertices remains Vertex-only. Surface cage geometry/batches are not allocated; isolated loose edges remain
visible with ordinary depth-tested edgeMaterial so wire-only objects do not vanish;
original invisible indexed edge/vertex picking proxies/bridge registry remain intact.
Mirror cage is also omitted in Object; active SubD no longer evaluates spare mirrored
base solely for that omitted wire. Original evaluated surface and its geometry cache
are unchanged. Vertex/Edge/Face restore their original cages and material/order/selection
semantics. Clean/Soft, Multi/group tints, gizmos, history, brush/paint/material/export
owners untouched. Explicit VIEW Wire/X-Ray modes retain deliberate user control.
No frame-rate or broad memory claim; removed visual cage draws/allocation only.

Two new native-owner tests cover Object↔component transitions, absent visual batches,
actual Three raycast proxy IDs/disposal, mirrored SubD base-call counts and exact solid
geometry. Existing810/851 Object visual-cage expectation replaced by new user request;
all component/proxy assertions retained. Existing850/809/812 render fixtures now supply their real selectionMode='face'
dependency;809 Object loose-wire material expectation follows the new depth-tested
policy, all component/geometry/metadata/enumeration assertions retained. No production
fallback or weakened cache/timing checks.
Focused cage/cache/timing/release29PASS and earlier paint-history/tint/cage24PASS.
Legacy809 loose-wire normalization inspects a CLONE: original loose edges() can add
its historical faces[-1] sentinel. Original source-preservation assertion retained.
Only main/cage batch and shell/recovery cache930; Multi1.0/frozen unchanged. Alpha929
manual gate not inferred PASS. Reflection preview independently unresolved; exports correct.
Next DEVICE Object orbit/paint no through-cage; component cages return; Multi/gizmo and
Paint UndoRedo stay intact. Then resume alpha feedback/UV-safe blur/smudge; AO/seams queued.
Full validation/publication follows; no rendered/iPad proof inferred from Node.

- [x] .930: selected Object stays solid without automatic through-mesh cage; orbit and paint.
- [x] .930: Vertex/Edge/Face restore cages; return Object hides them, including mirrors/SubD.
- [x] .930: Object Multi selection/gizmo and Paint UndoRedo/continue remain usable.

.930 final local Node24.19.0 regression: **2,654 PASS / 0 FAIL / 0 skipped**.
Focused native cage/cache/timing/release29PASS; original surface/proxy/metadata,
history/paint/alpha/image/native export assertions retained. Only superseded Object
visual cage and depth-tested loose-wire expectations changed. Multi1.0/frozen intact.
Publication/hosted/live verification follows; iPad display acceptance pending.

## .930 publication verified — 20 October 2026 (Brisbane)

Runtime `defbd5b79b89166aaef3a8e479ab09e6bce1df63`, tested tree
`d4234bfa273e1640ff515b9937f016f0849efb24`, is published. Connected Git Data
uploaded all13 exact local blobs/tree; fetched main has identical tested files.
Local Node24 and hosted Node22 regression39411220064/job118589175903 both pass
**2,654 tests / 0 failures / 0 skipped**; complete hosted logs verified. Pages
39411219467/deploy118589389324 completed successfully. All11 checked fresh live
files byte-match: shell/version, main/cage batch, recovery, protected Multi1.0 and
unchanged painter/raster/render/material surface. Frozen builds unchanged.

All four continuity files current; this proof changes documentation only. Build930
complete and ready for Object-mode solid orbit/paint without automatic through-cage,
Vertex/Edge/Face cage restoration, Object return and Paint UndoRedo/continued marks.
Loose wire geometry remains depth-tested; original picking/bridge/cache owners intact.
No measured FPS claim or rendered iPad acceptance inferred. User928PASS protected;
929 alpha gate remains pending. Reflection preview remains independently unresolved;
native exports correct. Resume alpha feedback then UV-safe blur/smudge; AO/seams queued.

## .931 — Blur within original polygon faces; .930 user PASS — 20 October 2026

User930PASS protects solid Object display/component cages and Paint/history. Audit
maina9f2a10d: original UV inspector owns islands, exporter owns triangle emission;
no neighbour brush exists. First Blur clips BOTH reads and writes to picked polygon
face; never samples adjacent atlas faces. Original preview builder gains opt-in frozen
triangle→source-face metadata from its existing emission loop (group order retained).
Default previews/export bytes unchanged. Painter requests map; new small filter-domain
raster labels original geometry,512²,2M scanned budget. Sampled interior overlaps,
out-of-tile/degenerate/unsupported UVs refuse atomically; ambiguous borders excluded.
No new triangulation/signature/UV editor/input/history/resource/writer owner.

Tool Blur · within face uses original raster, samplers, raycast and commit/rollback.
Fixed five-tap centre4/cardinal1 smoothing of stroke-start pixels; face-only reads and
writes, renormalized clipped weights. Maximum per-contact coverage/opacity retained;
lift/repeat for stronger smoothing. Same size/pressure/hardness/alpha tips. Transparent
layers use premultiplied RGBA filtering/interpolation to avoid hidden-colour halos;
scalar/mask raw values stay independent. Colour picker ignored/disabled. Base/layers/
masks/Roughness/Metalness work; retained image colour remains read-only. No across-face
or seamless/world-radius claim, no Smudge yet. Original scene checkpoint/COW/pools,
SaveOpen/NOM/GLB and Paint history928 remain; domain1MiB/session+1MiB/contact is transient.
Read docs/paint-blur-931.md. Five new regressions + nearby21=26PASS; release5PASS;
full/publication below. Complete changed main/export/Lab reverse loader graph931;
Multi1.0/frozen and accepted930 main/cage bytes unchanged. Alpha929 device gate not
inferred PASS. Reflection remains unresolved; native export protected. Next DEVICE
hard-edged mark→Blur brush/lift/repeat, overlay isolation, UndoRedo/continue, then
similarly bounded Smudge. AO and Edge-seam audits remain queued, not delivered.

- [ ] .931: hard-edged mark → Tool Blur within face, Size larger than mark, brush edge/lift/repeat.
- [ ] .931: overlay Blur keeps Base; mask/scalar Blur edits only selected target.
- [ ] .931: UndoRedo stays in Paint; return Brush, SaveOpen and native export retain results.

.931 final local Node24.19.0 regression: **2,659 PASS / 0 FAIL / 0 skipped**.
New Blur5 + nearby21=26PASS, release5PASS; no existing assertions relaxed.
Default export/preview geometry and accepted930 main/cage/protected Multi/frozen bytes
unchanged. Publication/hosted/live verification follows; actual iPad Blur gate pending.

## .931 publication verified — 20 October 2026 (Brisbane)

Runtime `0226dc19bdb401b4851bb9d84ee95acb8785b957`, tested tree
`ed0b12770fc595035fbfebd435d398ac77d59e97`, is published. Connected Git Data
uploaded all17 exact local blobs/tree; fetched main matches tested source.
Local Node24 and hosted Node22 regression39416319307/job118606105355 both pass
**2,659 tests / 0 failures / 0 skipped**; complete hosted logs verified. Pages
39416319079/deploy118606303731 completed successfully. All18 fresh checked live
files byte-match: shell/version, every changed runtime/export/Lab owner, new filter
domain, recovery, accepted930 main/cage, protected Multi1.0 and retained paint surface/
export/image projector. Frozen builds unchanged. No assertions relaxed.

All four continuity files current; this proof changes documentation only. Build931
complete and ready for Tool Blur within face on a hard-edged painted mark, larger
Size, lift/repeat for stronger smoothing; overlay/channel isolation and UndoRedo stay
in Paint, return Brush and continue. SaveOpen/native export retains results. User930
PASS protected; actual931 appearance/Pencil feel/latency and929 alpha gate pending.
No rendered/iPad performance claim. Reflection preview independently unresolved;
native exports correct. Next Blur feedback then protected Smudge; AO/seams queued.

## .932 — Connected-face Blur sampling; .931 user PASS — 20 October 2026

User PASS protects .931 Blur and prior .930 solid Object display. Audit main05a790e8:
original UV inspector already owns polygon edges, exporter owns triangle emission;
reuse both via optional edgeOwners and original vertex IDs. Default reports/geometry/
exports unchanged. New small read-only seam plan unfolds original triangle neighbours
across real manifold edges, mapping into detached/rotated/mirrored UV islands. Atlas
proximity never connects faces. Internal diagonals use the same original emission.
Fixed centre4/cardinal1 stroke-start blur now reads mapped connected-face texels.
Writes remain clipped to picked face: stroke BOTH sides of edge; brush footprint does
not wrap automatically. No world-radius/full seamless-footprint claim, no Smudge.
Boundary/nonmanifold/ambiguous corner/long walks clip; invalid/stale ownership and
existing overlapping/degenerate/out-of-tile/complex UV refusals stay atomic. Max8
crossings/sample and2M walk steps; lazy session plan512² labels1MiB+links4MiB,
temporary triangle map1MiB; owned contact copies5MiB plus original stroke buffers.
Premultiplied colour alpha, raw masks/scalars, capped coverage, original alpha tips,
input/raycast/history/COW/SaveOpen/NOM/GLB owners retained. UI says connected faces
and explicitly asks strokes over both sides. No modelling/UV authoring kernel added.
Five new tests cover 12 fold/rotation/mirror layouts, disconnected atlas decoy,
nonmanifold/stale metadata, exact raster alpha/cancel and actual UI→history→SaveOpen→
exact native PNG. Focused20PASS incl release5; full/publication below. Complete changed
reverse loader graph repinned932; retained main/cage/Multi1.0/frozen bytes unchanged.
Read docs/paint-seams-932.md. Device932 seam appearance/latency pending; alpha929 gate
not inferred. Reflection preview independently unresolved; native exports protected.
Next device feedback then bounded Smudge through original paint owner; AO and UV seam
AUTHORING remain queued. Seam sampling is not seam authoring.

- [x] User .931 PASS: within-face Blur, original Paint/history and .930 solid Object display protected.
- [ ] .932 device: paint different colours across a cube edge, Blur strokes over both sides blend connected faces despite UV split.
- [ ] .932 device: lift/repeat strengthens, Undo/Redo stays in Paint; Save/Open retains result.
- [ ] .932 device: base/layer/mask/scalar isolation, Pencil feel and first-Blur latency acceptable.

.932 final local Node24.19.0 regression: **2,664 PASS / 0 FAIL / 0 skipped**.
Focused20PASS; no existing assertions relaxed. Hosted/Pages/live verification follows.

## .932 publication verified — 20 October 2026

Runtime `5bac11821f49d7d47c6ed99cd90755c05fded102`, tested tree
`8a6f25d6e380442b8c2c7c89893d8f94d153404d`, is published on main.
Connected Git Data uploaded24 exact local blobs; fetched main matches tested tree.
Local Node24 and hosted Node22 regression39418615870/job118613691692 both pass
**2,664 tests / 0 failures / 0 skipped**; complete hosted logs verified.
Pages39418615854/deploy118613868578 succeeded. All22 fresh checked live files
byte-match: shell/version, complete changed runtime/export/UV/Lab loader graph,
new seam helper, recovery, accepted main, protected Multi1.0 and retained surface.
Frozen builds unchanged; no assertions relaxed. All four continuity files updated.

Build932 complete and ready for testing: paint different colours across a cube edge,
Blur strokes over BOTH sides, lift/repeat, UndoRedo stay in Paint, SaveOpen retains.
This connects sample reads across real face edges/UV seams; footprint does not wrap.
User931PASS protected; actual932 Pencil feel/appearance/first-use latency pending.
Alpha929 device gate remains independent. Reflection preview unresolved; native exports
correct. Next feedback then bounded Smudge through original owner; AO/seam authoring
remain queued. This proof changes documentation only, not the verified runtime.

## .933 — Surface image wrapping; user priority — 21 October 2026 (Brisbane)

User asks image placement to wrap connected surfaces rather than clip at one face.
Audit main36845450/live932: .912 On surface follows anchor/normal but feeds flat
orthographic .911 projector with75° facing/visibility cuts; no wrapping image owner.
Extend that original path; preserve separate Project from View. Extract existing932
read-only triangle graph into paint-triangle-graph.js; original UV inspector polygon
edges and exporter face/vertex metadata stay authoritative. Blur uses exact same graph,
existing sample walk unchanged. No duplicate adjacency/triangulation/modelling kernel.

On surface retains raycast triangle index with point/normal; Move updates all three.
Surface orientation still Insert's original helper. New paint-image-wrap.js carries a
local image chart over real manifold triangle neighbours, unfolding common edges with
world lengths and opposite-side third vertex; midpoint/centroid distance queue chooses
one route per triangle. Reconcile shared canonical vertex coordinates to avoid cracks
at local cycle closures; seed triangle pinned. Curved/closed patches necessarily stretch;
not a globally distortion-free spherical unwrap. Stops expanding outside image rectangle,
20K triangles/200K queue-pop cap. Boundaries/nonmanifold/disconnected components clip;
no coordinate welding or atlas adjacency. Original .911 UV raster/source alpha sampling,
overlap/tile/2M scan budgets and stack/pool/history/export owners remain. Wrapped samples
follow connected target surfaces round corners even when not front-facing/visible from
anchor projector; picked anchor still obeys original visible-target/occlusion hit guard.
Flat Project from View retains original75°/scene/self occlusion/30M ray-work rules.

Existing contact tangent guide remains planar; lift updates exact wrapped mesh preview.
Apply recomputes current candidate then commits ONE original checkpoint/COW. Cancel,
close, body loss, layer/target change and refusal preserve committed resource/history.
Source/raster retained together through original recipe/codec: no schema/budget increase.
Interactive wrap chart/anchor is transient, as912: Edit image→On surface repicks anchor;
old flat matrix alone cannot regenerate a wrapped chart. Saved pixels/native exports
retain exact wrapping; never auto-rasterize retained source from that matrix on Open.

Six new regressions: exact asymmetric pixels across flat/oblique/90° + mirrored UVs,
disconnected/nonmanifold exclusions, original view rules/stale anchor/UV refusal,
transformed frame/rotation/scale, actual UI drag onto another face/cancel/cycle→Apply→
history→SaveOpen→exact native PNG, sphere/denied checkpoint and shared-vertex continuity.
Focused image+seam25PASS and release5PASS; full/publication follows. Complete changed
reverse loader graph933, retained exporter/inspector/main/cage/Multi/frozen unchanged.
No932 device PASS inferred. Device933 wrap appearance/stretch/first-use latency pending.
Read docs/paint-image-wrap-933.md. Independent reflection preview unresolved.

Pending user requests explicitly retained: stronger Blur amount/radius separate from
opacity; image raster conversion/editable blur; Merge Down/Flatten with blend/mask
appearance preserved; staged texture/image/alpha resolution and layer-count choices
with memory budgets. Current512² painted maps,1024² sources,256² tips,base+3 overlays
unchanged. Smudge/AO/UV edge-seam authoring queued; this is image wrapping only.

- [ ] .933 device: +Image→On surface; place near cube edge, lift, orbit to see image continue onto adjacent face.
- [ ] .933 device: move anchor onto next face; tap-cycle Rotate/Scale, lift; image remains wrapped. Try sphere patch for acceptable curvature/stretch.
- [ ] .933 device: Apply→Undo/Redo, Save/Open retains wrapping; Edit image→On surface repicks; Cancel preserves committed image.

.933 final local Node24.19.0 regression: **2,670 PASS / 0 FAIL / 0 skipped**.
Six new checks + nearby19 =25PASS; release5PASS. No existing assertions relaxed.
Publication/hosted/live verification follows; actual iPad933 gate pending.

## .933 publication verified — 21 October 2026 (Brisbane)

Runtime `284f292306c06a857ffc047bd5dd497370312337`, tested tree
`4209dda642676652b76feb89c3148ec55da2f9b2`, is published on main.
Connected Git Data uploaded19 exact local blobs; fetched main matches tested tree.
Local Node24 and hosted Node22 regression39510312183/job118929399272 both pass
**2,670 tests / 0 failures / 0 skipped**; complete hosted logs verified.
Pages39510311401/deploy118929589714 succeeded. All24 fresh checked live files
byte-match: shell/version, complete changed image/Blur reverse loader graph,
new shared graph/wrap chart, recovery, main/cage, protected Multi1.0 and retained
exporter/UV inspector/raster/image-source/recipe owners. Frozen builds untouched;
no assertions relaxed. All four continuity files updated.

Build933 complete and ready: +Image→On surface, place near cube edge, lift and orbit
to inspect continuation. Drag onto next face; rotate/scale, lift; try curved patch.
Apply→UndoRedo, SaveOpen retains exact result. Contact guide stays planar; wrapped
mesh preview updates on lift. Interactive chart remains transient; Edit image→
On surface repicks, as912. Curvature/large closed patches can stretch/reach boundary.
No device933 appearance/latency PASS inferred;932 Blur and929 alpha gates pending.
Next stronger Blur, image conversion/blur, Merge/Flatten, bounded resolution/layer
options; Smudge/AO/seam authoring remain queued. Reflection preview independent.
This proof changes documentation only; verified runtime remains byte-identical.

## .934 — Blur Amount; .933 user PASS — 21 October 2026 (Brisbane)

User933PASS protects image wrapping across cube edges/UV seams, Move/Rotate/Scale,
Apply/history/SaveOpen. Audit main6688de17/live933: original paint-core has fixed
centre4/cardinal1 one-pass blur, no stronger filter/slider owner. Extend original
raster only; no new brush, adjacency, input, history, resource or writer implementation.

Blur shows Amount1–32, default8. Amount repeats existing smoothing kernel over the
stroke-start snapshot; Opacity mixes filtered target with original; Size controls brush
footprint. Core filter.amount defaults1 (legacy calls/settings remain valid). Main
UI passes optional blurAmount; shared brush defaults/Lab saved settings/native schemas
unchanged. Existing original neighbour table handles connected faces/UV seams on every
pass; no atlas-neighbour reads or new topology plan. Writes still clip to picked face:
stroke both sides. One-pass exact accepted .931/.932 outputs retained; strong blur
uses premultiplied RGBA through all passes (raw masks/scalars remain independent).

Compute target once/contact, using two bounded Float64 RGBA buffers to avoid rounding
between passes; one target retained for contact. At512² each buffer8MiB,16MiB filtering
buffers total; target8MiB retained plus existing before/coverage/domain/pool resources.
Uniform sources shortcut; opacity0 skips filtering. Max32*512² texel visits, no
per-dab repeated filtering or unbounded feedback. Coverage remains max/contact;
lift/repeat for more. Finish/cancel/dispose drops target; validation precedes contact
state publication. Amount input cancels in-flight work and updates existing readout;
original Paint history reopen retains tool/amount. Current selected layer/channel only.
Image colour stays source-preserved/read-only pending explicit image conversion.

Five new regressions: analytical one/two/32-pass impulse and independent opacity;
alpha/raw scalar/domain/invalid/no-op/cancel; strong folded-seam sampling excludes
atlas decoy and far-face writes; actual UI low/high softness, amount-change rollback,
Paint UndoRedo and SaveOpen/exact native PNG; scalar/mask isolation/checkpoint refusal.
Focused26PASS incl .933 wrapping6 and Paint-history5; release5PASS; full below.
No old assertions relaxed. Complete changed raster/Lab/main reverse loader graph934;
accepted933 wrap/graph/export/UV inspector, main/cage/Multi/frozen bytes unchanged.
Device934 strength/first-contact latency pending; Node timings are not iPad evidence.
Read docs/paint-blur-amount-934.md. Reflection preview independently unresolved.
Next image-to-paint conversion/blur, then Merge Down/Flatten, staged resolutions/layer
budgets; Smudge/AO/edge-seam authoring queued. Current512²/1024²/256²/base+3 unchanged.

- [x] User .933 PASS protects connected surface image wrapping, next-face placement/Rotate/Scale, Apply/history/SaveOpen.
- [ ] .934 device: compare Amount1 versus32 on same painted mark (Undo between), Opacity100%; higher amount visibly softer/wider.
- [ ] .934 device: lower Opacity mixes less; Size changes affected area. First contact/max-Amount latency acceptable.
- [ ] .934 device: Blur over both sides of cube edge, Undo/Redo stays in Paint with Amount retained; continue painting and wrapped images remain intact.

.934 final local Node24.19.0 regression: **2,675 PASS / 0 FAIL / 0 skipped**.
Focused26PASS + release5PASS; no existing assertions relaxed. Hosted/Pages/live
verification follows; actual iPad934 strength/latency gate pending.

## .934 publication closed; user PASS — 21 October 2026 (Brisbane)

Runtimebc84450ce760a54424938e0f2548d05eca0aaf1e, tested treee59b2bac3b9c531a815403f6bab1816d9e3a04ae,
published. Hosted Node22 regression39512294347/job118936016708 logs confirm2675PASS/
0FAIL/0skip, matching recorded local Node24 run. Pages39512293048/deploy118936225379
succeeded. Live934 manifest and all27 checked runtime/protected files byte-match the
published934 source (git-show snapshot used while935 working tree was dirty). User
PASS934 protects dedicated Blur Amount1–32/default8, independent Opacity/Size, retained
Paint history and earlier933 image wrapping. Prior interrupted publication proof is now
closed; no new934 runtime changes. Alpha929 acceptance remains independently pending.

## .935 — Image to paint conversion; .934 PASS — 21 October 2026 (Brisbane)

Audit mainbc84450c/live934: source-preserved image cache and explicit paired replacement
exist; no raster conversion. Extend original paint-layer-stack with explicit
rasterizeImagePaintLayer: validated owned snapshot, same stack/version/order/ID/name/
visibility/opacity/blend/mask/pixels; ONLY selected image recipe becomes null. Existing
compositor verifies identical appearance, including every supported blend and inverted
mask. No implicit compositing into base, extra layer, resampling, new writer/schema,
brush, history, modelling or UV owner. Existing three-overlay/512² limits unchanged.

Image-only Convert to paint button uses original layerAction/scene checkpoint/preflight/
COW owner. Conversion selects Colour even when image mask was selected; Brush, Eraser,
Fill and Blur then use original raster and accepted934 Amount. Other image layers keep
source editing. Same pixels include933 wrapped placement. Edit image button disappears
by original state when no recipe; name/slot retained. Undo restores retained source and
placement editing, Redo restores raster conversion. After Save/Open converted layer is
ordinary editable pixels; source recipe isn't serialized for that layer. Other objects
sharing old resource and original saved image sources remain unchanged. Source release
reduces committed resource bytes; Undo may still retain it in bounded scene history.

Block conversion while staged image placement exists, keeping candidate/committed work
intact; Apply/Cancel first. Missing/nonimage/scalar/stale target/checkpoint/pool errors
leave committed resources/history untouched. Read-only image message keeps accepted
'Image colour is retained' prefix and points to conversion. UI return/result reused for
accurate success status, no separate input/listener/history system. Current Paint stays.

Five new tests: all-blend/mask exact appearance and owned buffers/byte accounting;
actual wrapped image UI→convert→strong Blur→Paint UndoRedo→SaveOpen→exact native PNG;
mask→Colour and Brush/Eraser/full-stack/other-image/scalar behavior; staged/missing/stale/
checkpoint/pool refusal; staged UI edit/cancel guard. Nearby908/933/934 and release5
remain active; full/publication below. Complete changed stack/resource/project/export/
Lab/main reverse loader graph935; functional change confined to original3 owners.
Accepted raster934, wrap933/UV/mesh kernels/main/cage/Multi/frozen bytes unchanged.
Read docs/paint-image-rasterize-935.md. Device935 conversion/blur/Undo feel pending.
Next Merge Down/Flatten through existing compositor to free slots, then staged texture/
source/alpha resolution and layer budgets. Smudge/AO/UV edge-seam authoring queued;
reflection preview independently unresolved. Current512²/1024²/256²/base+3 retained.

- [x] User934PASS protects Blur Amount/Opacity/Size and original Paint/history, alongside933 wrapped placement.
- [ ] .935 device: select applied image→Convert to paint; appearance/placement unchanged, then Brush/Blur Amount edits it.
- [ ] .935 device: Undo edits then conversion restores Edit image; Redo returns converted paint, staying in Paint.
- [ ] .935 device: Save/Open retains converted paint; other image layers remain editable. Apply/Cancel staged placement before conversion.

.935 final local Node24.19.0 regression: **2,680 PASS / 0 FAIL / 0 skipped**.
Focused29PASS (new5, image908 eight, wrap933 six, Amount934 five, release5); no
existing assertions relaxed. Hosted/Pages/live publication verification follows.

## Permanent completion-instruction audit — 21 October 2026

User repeated PASS /nextbuild while935 publication was pending and asked to audit
manual-test instructions. AI_WORKFLOW already explicitly requires readiness/build
number and3–6 quick device checks; AI_HANDOFF also contained the19 October reminder
inside an older entry. Promoted the same rule to the TOP of AI_HANDOFF as a permanent
section. It applies every build, including an explicit no-new-test statement when
appropriate; never end with only progress. No runtime change in this audit. Current
next build remains935 (published main was934 when PASS arrived); finish935 and its
hands-on image conversion/Blur/Undo/SaveOpen list before declaring it ready.

## .935 publication verified — 21 October 2026 (Brisbane)

Runtime `44c4eccf036fd7fa1d61bbee4802a506166c49b3`, published tree
`f3749803243107a097ecb798c56edb0ec73a1903`, matches local main exactly.
Original local tested treeac566305 had identical runtime; only four continuity files
changed to promote the permanent completion rule before publication. Git Data tree
verified with all28 blobs. Local Node24 and hosted Node22 regression39586601556/
job119176937360 both pass **2,680 tests / 0 failures / 0 skipped**; full hosted logs
verified. Pages39586601079/deploy119177154130 succeeded. All37 fresh checked live
files byte-match: shell/version, complete changed resource/project/export/Lab/paint
loader graph and retained raster934, wrap933, UV inspector, main/cage/Multi1.0/recovery/
image-source owners. Frozen builds untouched; no assertions relaxed.

Handoff audit complete: permanent readiness/build/manual-test rule was already in
AI_WORKFLOW and an older AI_HANDOFF entry; now prominently at TOP of AI_HANDOFF.
Every finished build must give its readiness, build number and short device tests,
or explicitly say no new test is needed. Never end with progress alone.
All four continuity files current. This proof changes documentation only.

Build935 complete and ready: applied image layer→Convert to paint, appearance kept;
Blur Amount/Brush/Eraser edits pixels; Undo edits and conversion restores Edit image;
Redo then SaveOpen retains editable paint. Source recipe belongs to old Undo resource,
not the converted saved layer; masks/blends/other image layers remain independent.
User934PASS protected; actual935 appearance/feel gate pending. Next Merge Down/Flatten
to free slots, then staged resolution/layer budgets; Smudge/AO/seam authoring queued.
Reflection preview remains independent; alpha929 device gate not inferred.

## .935 user PASS / .936 resolution regression — 21 October 2026

- [x] User .935 PASS: image→paint appearance/Brush/Eraser/Blur, Undo restored source,
  Redo/SaveOpen editable pixels. Earlier .933/.934 and Paint-history PASSes protected.
- [ ] DEVICE .936: Paint → Texture resolution → Increase to1024×1024; existing marks
  retained; fresh fine strokes/newly projected image use sharper grid; Paint stays open.
- [ ] DEVICE: Undo→512 / Redo→1024; Save/Open retains1024, continued paint; export to
  Nomad preserves image placement and fresh marks. Test larger Size/Blur feel.
- [ ] DEVICE: Roughness/Metalness and mask/colour switching remain independent.
- Automated .936: exact owned2× colour/image/mask replication, retained source/settings,
  original one-checkpoint UI/history/continued1024 Brush+Blur/mask,512 scalar/material
  dimensions, committed display, three overlays, pooled scene transport/exact native PNG,
  predecode corruption/quota, staged/checkpoint/stale rollback. No iPad performance proof.
- Preserve old512 and opaquev1 quota tests; only layered1024 opts into new budgets.
  Existing source/tip/layer-count/file/native caps and UV/work guards remain active.

.936 final local Node24.19.0 regression: **2,687 PASS / 0 FAIL / 0 skipped**.
Seven new resolution integrations plus every original test pass unchanged. Reviewed
release/cache contract5PASS, original902 size513 refusal retained. Initial exploratory
run admitted intermediate sizes; original guard now only adds exact1024² above512.
GLB fixture follows actual primitive material ID; no production writer workaround.
All four continuity files current. Publication/hosted/live verification follows;
actual .936 iPad sharpness, brush/Blur latency and memory acceptance remain pending.

## .936 publication verified — 21 October 2026 (Brisbane)

Runtime `dd313a08a0163ea16ca86034b607553bff06e635`, tested tree
`80165089f0ecde310eede444f7ebd972ffcf90d0`, is published on main. Connected Git
Data uploaded31 exact blobs and created the identical tested tree; fetched main
matched and local branch was aligned without file changes. Local Node24 and hosted
Node22 regression39593356534/job119199545040 both pass **2,687 tests / 0 failures /
0 skipped**; complete hosted logs verified. Pages39593355281/deploy119199756737
succeeded. All31 checked runtime/Lab/shell/recovery/protected files byte-match.
Initial fetch began during rollout and returned six .935 ancestors; fresh postdeploy
rechecks closed all six. No frozen/main/cage/Multi edits. Eleven functional owners;
eleven reverse-graph parent files contain cache-reference changes only.

All four continuity files current. Proof is documentation-only, same runtime bytes.
User .935 PASS protects conversion/Blur/edit/history/persistence; .936 device detail/
latency/memory gate remains pending. Ready: Paint → Texture resolution → Increase
to1024×1024; fresh strokes/new image placement, Undo512/Redo1024, SaveOpen and NOMAD.
Existing pixels enlarge exactly; re-place retained sources for fresh image detail.
Independent512 scalars/source1024/alpha256/base+three limits retained. Next resolution
feedback then Merge Down/Flatten; larger sources/maps/layers remain staged.
