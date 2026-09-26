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

