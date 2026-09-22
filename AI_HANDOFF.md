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
- Frozen Beta 4: https://crisbezz.github.io/BoxLab/beta-4/
- Product: iPad-first touch/Pencil polygon modeller and Nomad Sculpt companion.

## Current audited repository state

Audited from current `main` on 2026-09-21.

- Frozen release checkpoint: **v0.36.18.427 — Beta 4**
- Beta 4 frozen source main commit: **ec45b3ba208ef3ffa40015d7a3b62666c63f379e**
- Current live development build: **v0.36.18.394 — Sweep Apply redraw + 3D geometry path snapping**
- Current documentation HEAD: **post-v0.36.18.372 merge documentation; see latest main**
- Current live code-bearing commit: **300bf36b75306e413afc70760e4dc020f599a0ad**
- Frozen Beta 3 code-bearing/release commit: **c17fb0f996f406449975a1add5b774eadc30e529**
- v0.36.18.371 release PR: **#54**
- Previous v0.36.18.372 PR: **#56**
- Previous v0.36.18.373 PR: **#57**
- Previous v0.36.18.374 PR: **#58**
- Previous v0.36.18.375 PR: **#59**
- Previous v0.36.18.376 PR: **#60**
- Previous v0.36.18.377 PR: **#61**
- Previous v0.36.18.378 PR: **#62**
- Previous v0.36.18.379 PR: **#63**
- Previous v0.36.18.380 PR: **#64**
- Previous v0.36.18.381 PR: **#65**
- Previous v0.36.18.382 PR: **#66**
- Previous v0.36.18.383 PR: **#67**
- Previous v0.36.18.384 PR: **#68**
- Previous v0.36.18.385 PR: **#69**
- Previous v0.36.18.386 PR: **#70**
- Previous v0.36.18.387 PR: **#71**
- Previous v0.36.18.388 PR: **#72**
- Previous v0.36.18.389 PR: **#73**
- Previous v0.36.18.390 PR: **#74**
- Previous v0.36.18.391 PR: **#75**
- Previous v0.36.18.392 PR: **#76**
- Previous v0.36.18.393 PR: **#77**
- Current v0.36.18.394 PR: **#78**
- Current PR regression / CI status: **PASS — Topology regression / `npm test`, workflow run 35569411629**
- Current post-merge main regression: **PASS — Topology regression / `npm test`, workflow run 35568666909**
- Release regression / CI status: **PASS — PR #54 Topology regression / `npm test`, workflow run 35495835508**
- User hands-on release gate: **PASS**
- Beta 3 freeze PR: **#55**
- Beta 3 freeze merge commit: **a227042e2bd2972c96361aedf7840bdcc62c78bb**
- Current `version.json`: **0.36.18.429**
- Current Phase D wrapper cache pins: **solidify.js?v=0.36.18.393** → core .374; **shell.js?v=0.36.18.393** → core .377; **linear-array.js?v=0.36.18.393** → endpoint-vector behavior .384; **revolve.js?v=0.36.18.393** → core .386; **revolve-profile.js?v=0.36.18.393** → Revolve Profile behavior through .392; **sweep-path.js?v=0.36.18.393** → **sweep-core.js?v=0.36.18.393**
- Current main runtime pin: **main.js?v=0.36.18.366**
- Authoritative drawer loader pin: **drawer-ui.js?v=0.36.18.361**
- Offset Loop loader: **drawer-ui.js → loop-offset.js?v=0.36.18.340**
- Precision Offset Loop loader: **drawer-ui.js → precision-offset-loop.js?v=0.36.18.340**
- Object management loader: **object-management.js?v=0.36.18.392**
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

## Current development — v0.36.18.429 Solidify mirrored-object fix

- Solidify now evaluates the existing non-destructive Mirror modifier before preflight, preview and Apply.
- On Apply, Solidify bakes the mirrored evaluated mesh into the editable object and clears the old Mirror modifier to prevent double mirroring.
- Mirrored open sheets now follow the same Solidify topology path as ordinary open sheets.
- The operation remains one Object-history step and Beta 4 remains frozen at v0.36.18.427.

**Hands-on verify .429:** create an open sheet crossing/meeting a Mirror plane, enable Mirror, launch Solidify, confirm preview covers the full mirrored form, Apply, and verify Mirror is now off while the resulting solid remains complete. Then Undo once.

## Current development — v0.36.18.428 Symmetry / Bisect foundation

**Released on main via PR #114; squash merge `72a30c2f5799d048235684e326da8fdf3a71fa2c`. Final regression run `35721391817` passed.**

- New destructive Object-mode Symmetry / Bisect Tool Session; existing non-destructive Mirror remains separate and untouched.
- Current plane is fixed to object-local origin and selectable X/Y/Z.
- Keep + / Keep − clips faces against the plane with shared intersection vertices.
- Mirror kept half optionally uses the proven Mirror deduplication path to reflect and weld the centre seam.
- Mirror OFF is a true bisect-only result with an open cut boundary.
- Live translucent preview and visible plane update with axis/side/mirror changes.
- Apply commits in one Object-history step; Cancel leaves source mesh unchanged.
- Existing non-destructive Mirror must be off before launch to prevent a double-mirror display/result ambiguity.
- Beta 4 at /beta-4/ remains frozen at v0.36.18.427.

**Hands-on verify .428:** on an offset/asymmetric object, launch Symmetry / Bisect in Object mode, test X/Y/Z, Keep + and Keep −, toggle Mirror off/on, Apply then Undo. Confirm the plane is through the object origin and the mirrored seam appears welded.

## Beta 4 freeze — v0.36.18.427

- User approved publishing Beta 4 after the Edge Extrude ribbon/constraint/selection-handoff sequence.
- Frozen source is main commit `ec45b3ba208ef3ffa40015d7a3b62666c63f379e`.
- Exact app tree is copied to `/beta-4/` for immutable GitHub Pages hosting.
- Beta 4 fixed URL: https://crisbezz.github.io/BoxLab/beta-4/
- Beta 4 freeze PR: **#113**
- Beta 4 freeze merge commit: **2743d9d0e10f8fb9605e1e37ab92f0c53c636837**
- Frozen source regression: **35713131703 PASS**
- Future development continues on live `main`; `/beta-4/` must not change except for an explicitly approved emergency release fix.

## Current development — v0.36.18.427 Edge Extrude selection handoff

**Released on main via PR #112; squash merge `387e7d00470e4aa300f0212ceddf9446cdd66fb9`. Final regression run `35713131703` passed.**

- Edge Extrude tap handling now distinguishes selection changes from actual drag extrusion.
- While armed, tapping the current selected edge deselects it and leaves Extrude + the active Plane/X/Y/Z/Auto constraint armed.
- Tapping a different valid boundary edge switches selection to it without leaving the tool.
- Dragging a different valid boundary edge switches selection and starts extrusion immediately in that same gesture.
- A temporarily empty selection no longer disarms Edge Extrude.
- Existing ribbon topology, Plane constraint math, X/Y/Z/Auto behavior and Undo semantics are unchanged.

**Hands-on verify .427:** after a Plane extrusion, tap the selected outer edge to deselect it, tap another boundary edge and confirm Plane remains active, then try dragging an unselected boundary edge directly to switch-and-extrude in one motion.

## Current development — v0.36.18.426 Edge Extrude Plane constraint

**Released on main via PR #111; squash merge `3ecb2d9ba6004a6f6379985e4ae6064ca62356f6`. Final regression run `35709099628` passed.**

- Edge Extrude now has an additional Plane constraint visible only while the tool is armed.
- The grabbed seed edge defines the working plane normal; the plane passes through the selected-edge/chain centre.
- Pointer movement is raycast onto that plane, allowing free two-dimensional extrusion while preventing movement along the seed edge direction.
- A final perpendicular projection hardens the zero along-edge displacement invariant.
- Existing Free/X/Y/Z/Auto modes, ribbon topology, repeated outer-rail selection and Undo semantics remain unchanged.

**Hands-on verify .426:** arm Edge Extrude, choose Plane, pull an edge diagonally around its perpendicular plane, then continue from the resulting edge. Switch between Plane and X/Y/Z/Auto while staying armed.

## Current development — v0.36.18.425 Edge Extrude directional constraints

**Released on main via PR #110; squash merge `44fa20f0f769750b6c956f16ac5d8cb071144fb2`. Final regression run `35707683401` passed.**

- Edge Extrude now consumes the existing shared Free / X / Y / Z / Auto constraint state.
- Explicit X/Y/Z directions are projected perpendicular to the selected source edge, preventing along-edge shear.
- A chosen axis parallel to the source edge refuses instead of generating degenerate ribbon geometry.
- Auto (or Axis Snap ON while Free) chooses the best valid perpendicular world-axis direction from the initial drag.
- Free with Axis Snap OFF preserves the .423/.424 screen-plane ribbon behavior.
- Edge Extrude owns viewport drag while armed; normal Move yields, but the shared transform constraint controls remain usable.
- Repeated outer-rail selection, transactional topology validation and one-pull-per-Undo remain unchanged.

**Hands-on verify .425:** make a ribbon from a boundary edge with X, Y and Z constraints; check that growth is square to the source edge, try an axis parallel to the edge and confirm refusal, then compare Auto and Free.

## Current development — v0.36.18.424 Edge Extrude arming hotfix

**Released on main via PR #109; squash merge `9be062ec965ca8c21e5ea00d1ba784865598e1d6`. Final regression run `35705932023` passed.**

- Hands-on .423 exposed a UI-only bug: valid selected boundary edges left the new Extrude button disabled.
- Root cause: the button validator omitted selectedEdges() and therefore always saw an empty selection.
- .424 passes the live selected edge IDs in both syncButton() and the click arming gate.
- Ribbon topology/geometry remains the proven .423 implementation.

## Current development — v0.36.18.423 direct Edge Extrude ribbons

**Released on main via PR #108; squash merge `e92c11463449f481e6ef84d74f4a00dad8f3775c`. Final PR regression run `35704689025` passed.**

Edge Extrude is now the active build following the hands-on pass of .422 Revolve Profile Tool Session.

- Edge mode now has Extrude in the Move row beside Edge Slide and Offset Loop.
- Valid inputs are boundary edges, connected non-branching boundary chains, and loose edges.
- Dragging a selected edge produces live quad-strip geometry.
- Connected chain vertices are duplicated once so the strip stays welded.
- After commit, the newly created outer rail is selected and Extrude remains armed for immediate repeated ribbon pulls.
- Each pull is transactional: one history step, topology validation, rollback on invalid output.
- Interior edges and branched selections refuse rather than guessing.
- Existing Face Extrude, Through, selection, navigation and protected multi-object transform are untouched.

**Hands-on verify .423:** create an open boundary, select one boundary edge, arm Edge Extrude and drag. Confirm the new outer edge stays selected, then drag again several times to make a ribbon. Also test a connected two-edge boundary chain and Undo one pull at a time.

## Latest completed development — v0.36.18.394

Theme: **Sweep Apply redraw + geometry-snapped 3D path authoring**.

- User hands-on found that Apply Sweep replaced the mesh internally but left the construction plane visible until another object selection forced a redraw.
- Sweep Apply now mirrors the proven Revolve Apply finish:
  - dispose construction overlay
  - hide Sweep construction controls
  - force immediate cage/view rebuild
  - keep the Sweep result as the authoritative active object
- Geometry Snap now works while drawing/editing Sweep Path against visible external objects:
  - Vertex has first priority
  - Edge projection has second priority
  - Face ray-hit point is the fallback
- Sweep path points now store construction-local **u/v/w** coordinates rather than being forced flat to the construction plane.
- Free Pencil drawing still uses the construction plane; snapped points may sit off-plane and therefore form a genuine 3D path.
- Visible/solo filtering and evaluated object geometry follow the established cross-object snap conventions.
- Touch navigation remains untouched while Edit Path is active.
- PR **#78**, squash merge **300bf36b75306e413afc70760e4dc020f599a0ad**.
- Final PR regression **35569411629 PASS**.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

## Previous completed development — v0.36.18.393


Theme: **iPad-native Sweep Path construction foundation**.

- User advanced from the hands-on-approved .392 Revolve selection/tint cleanup with `/nextbuild`.
- Added **Add → Sweep Path** as a new Phase D construction object.
- Sweep Path starts as an ordinary movable/rotatable/scalable/snappable construction plane.
- **Edit Path** gives Pencil/mouse ownership of path authoring while touch remains the normal BoxLab navigation path:
  - Pencil/mouse empty click appends a point
  - near-point click selects/drags an existing point
  - near-segment click inserts a point
  - Undo Point / Delete Point / Clear remain preview-only
- Path coordinates are stored in construction-plane UV space, so the path and preview remain attached when the construction plane is repositioned.
- Live preview uses a circular section with:
  - Radius 0.03–1.5
  - Sides 3–24
  - Caps On/Off
  - established Apple Pencil slider ownership / late-event guard
- `sweep-core.js` uses parallel-transport frames along the path to avoid obvious 180° section flips and builds quad strips between section rings.
- Apply Sweep converts the construction into ordinary editable mesh, pushes one mesh-history step, saves the active object, returns authoritative Object selection to the Sweep result, and resyncs Boolean tint state.
- V1 scope is intentionally shallow: **planar authored path + circular section**. No arbitrary 3D path authoring, custom profile, twist/banking control or corner fillet system yet.
- New files: `src/sweep-core.js`, `src/sweep-path.js`, `tests/sweep-core-393.test.mjs`, `tests/sweep-runtime-393.test.mjs`.
- Add menu wiring lives in `primitive-ui.js?v=0.36.18.393`.
- PR **#77**, squash merge **403cfc677fa934f2c9c3b9a7a25fe50bf9c559f8**.
- Final PR regression **35568629908 PASS**; post-merge main regression **35568666909 PASS**.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

## Previous completed development — v0.36.18.392


Theme: **restore normal single-object selection after Revolve Apply**.

- User reported post-Revolve shading inversion: the new Revolve mesh appeared normal grey while an inactive cube remained amber.
- Root cause was stale authoritative Object multi-selection state being interpreted by the Boolean A/B viewport tint layer after the construction mesh was converted.
- Added `__boxlabObjectSelection.single(id)` to return Object selection to normal non-Multi single-object state without UI clicking or material hacks.
- Revolve Apply now:
  - saves the final active geometry
  - resets authoritative Object selection to the active Revolve object only
  - explicitly resyncs Boolean/Object viewport tint state
- No changes to Boolean operand colours or material definitions; valid two-object Boolean selection remains unchanged.
- Object management loader advances to `object-management.js?v=0.36.18.392`.
- Revolve geometry/profile/normals/navigation remain unchanged.

## Previous completed development — v0.36.18.391

Theme: **surface Revolve tooling automatically after construction interaction**.

- Revolve Profile now records its initial construction-plane vertex signature.
- As soon as the plane is meaningfully transformed (move / rotate / scale / snap changes its vertices), the Revolve construction claims the Active Tools drawer.
- Active Tools is opened and held open via the same `data-keep-open="true"` contract used by Shell/Solidify.
- Entering Edit Profile also claims/opens Active Tools immediately.
- Apply Revolve releases the drawer lock.
- Switching away from the active construction or leaving construction geometry releases the drawer lock.
- No changes to Revolve geometry, profile editing, touch navigation, snapping, normals, or protected modelling systems.

## Previous completed development — v0.36.18.390

Theme: **Revolve profile point editing and refinement**.

- Builds directly on the user-approved .389 Revolve construction workflow.
- Existing profile points can now be explicitly selected.
- Selected profile point receives a clear highlighted marker in the construction overlay.
- Pencil/mouse drag on an existing point still reshapes it live.
- Pencil/mouse tap near an existing profile segment inserts a new point into that segment at the correct chain position.
- Tap elsewhere on the construction plane still appends a point to the profile end.
- Added **Delete Point** beside Edit Profile / Undo Point / Clear.
- Delete Point removes only the selected profile point and updates the live Revolve preview immediately.
- Undo Point reverses point add / insert / delete / drag edits; selection is cleared after undo to avoid stale indices.
- Clear resets points and point selection but preserves the Revolve construction plane.
- .389 touch navigation contract remains unchanged: touch orbits/pans/zooms; Pencil/mouse authors the profile.
- Existing positioning/snap workflow, 3–64 Segments, winding unification and Apply behavior remain protected.

## Previous completed development — v0.36.18.389

Theme: **Revolve Profile interaction and face-winding refinement**.

User hands-on response to .388: **"Awesome first revolve build, love the UI."**

Refinements:
- New Revolve Profile objects now begin with **Edit Profile OFF**.
  - this makes the construction plane a normal Object-mode object first
  - Move / Rotate / Scale can be used before drawing
  - existing Object Geometry Snap remains available for positioning against other geometry
  - profile UV coordinates remain relative to the plane, so later construction-plane transforms keep profile + preview attached
- While Edit Profile is ON:
  - **touch input is no longer captured by the profile editor**
  - one-finger orbit and two-finger pan/pinch zoom remain available through the normal BoxLab navigation path
  - Apple Pencil (and desktop mouse) owns profile point add/drag
- Segments range widened from **6–64 to 3–64**.
- Fixed concave Revolve normal/winding behavior:
  - removed the old per-face "point away from axis" decision that could flip local concave bands inward
  - generated strips are now topologically unified across shared edges
  - one global orientation choice is made after winding consistency is established
  - this preserves consistent normals through concave and overhanging profile regions
- Existing .388 construction UI and live preview remain intact.
- Existing legacy loose-edge Revolve remains available.
- No changes to protected Array, Through/Extrude or multi-object transform.

## Previous completed development — v0.36.18.388

Theme: **live iPad-native Revolve Profile construction object**.

- Added **Add → Revolve Profile** as a first-class construction workflow.
- A Revolve Profile starts as a rectangular construction plane.
- The **left plane edge is the blue Revolve axis**.
- Profile points are stored as normalized UV coordinates on that plane rather than free world-space points.
  - points therefore remain coplanar by construction
  - moving/rotating/scaling the construction plane keeps the profile attached to the plane
- While **Edit Profile** is active:
  - Pencil/finger tap on the plane adds the next profile point
  - Pencil/finger drag an existing point to reshape the profile
  - points are clamped to the plane bounds
  - points near the blue edge snap exactly onto the revolve axis
- The profile chain is connected automatically in draw order.
- A translucent fill + wire Revolve preview is generated as soon as there are at least two profile points.
- Dragging any profile point updates the preview live before commit.
- Segments 6–64 updates the preview live and uses the hardened Apple Pencil range ownership path.
- **Edit Profile** can be toggled off to return viewport navigation, then toggled back on without losing the profile.
- Added local **Undo Point** and **Clear** controls for pre-commit profile authoring.
- **Apply Revolve** replaces the construction plane with ordinary editable mesh geometry in one mesh-history step.
- The construction metadata remains attached so Undo back to the 4-vertex plane can restore the live construction state; Redo returns to the applied mesh.
- Extended `revolve-core.js` with `buildRevolveFromPoints(...)` using an arbitrary normalized axis vector. Existing .386 loose-edge Revolve remains available and is not removed.
- Protected Array, Extrude/Through, Object management and `multi-object-transform.js` remain untouched.

## Previous completed development — v0.36.18.387

Theme: **consistent Delete/Backspace routing across all selection modes**.

- Added a small capture-phase keyboard router in `src/delete-key-router.js`.
- Delete or Backspace now routes to the existing authoritative delete action for the current mode:
  - Object → `#outlinerDeleteBtn`
  - Face → `#deleteFaceBtn`
  - Edge → `#deleteEdgeBtn`
  - Vertex → `#deleteVertexBtn`
- The router deliberately does not implement topology deletion itself; existing button handlers remain authoritative for history, selection and topology semantics.
- Keyboard delete is ignored while typing in input/textarea/select/contenteditable controls.
- Modified-key combinations using Alt/Ctrl/Meta are ignored.
- Existing Object Multi/Group delete behavior is preserved because Object mode still clicks the existing Outliner Delete action.
- No edits to protected `main.js`, `multi-object-transform.js`, Array, Revolve, Extrude or Through topology.

## Previous completed development — v0.36.18.386

Theme: **Phase D Revolve / Lathe foundation**.

- .385 inward single-Face Extrude side-wall cutting passed user hands-on testing.
- Added a conservative first Revolve workflow based on BoxLab's existing loose-edge profile system.
- Revolve lives in **Edge mode** under Active Tools.
- First build intentionally accepts only a standalone selected loose-edge profile:
  - no existing Faces in the source object
  - selected edges must be loose edges
  - entire loose-edge profile must be selected
  - profile must be one connected open chain
  - branches, closed loops, partial profile selections and stray loose vertices refuse rather than guess
- Axis is world X/Y/Z through the active **Object Origin**.
- Default axis Y; Segments 6–64, default 24.
- First tap arms a non-destructive translucent filled + wire preview and shows the revolve axis guide.
- Axis and Segments update the preview live.
- Segments slider uses the hardened Apple Pencil range path.
- Full 360° revolve uses shared seam vertices around the ring.
- Profile points on the axis collapse to a single pole vertex, avoiding degenerate duplicate pole rings.
- Profile endpoints not on the axis remain open boundary rings; endpoints on the axis close naturally to poles.
- Apply converts the loose profile object into ordinary editable face geometry, clears loose topology and commits one mesh-history step.
- Object Manager save propagation is reused; no parallel object system.
- Protected Array, inward Extrude/Through and multi-object-transform remain untouched.

## Previous completed development — v0.36.18.385

Theme: **inward Face Extrude cuts overlapping side walls instead of stacking/stretching them**.

- .384 endpoint-vector Array passed hands-on testing as PERFECT and is the protected Array baseline.
- Root cause of the inward Extrude artifact was confirmed: normal Extrude preview duplicated boundary walls over existing exterior side faces until late Through fallback takeover.
- Existing `sequential-through-fallback.js` already knew which source boundary edges swept across exterior side faces, but only took over at ~55% of the distance toward the opposing region.
- The fallback now takes ownership as soon as a meaningful drag moves toward the opposite shell.
- For partial inward travel it builds a real cut preview:
  - source face is moved to the current depth as the new cap
  - existing exterior side faces intersected by the swept boundary are clipped back to the moving cap plane
  - boundary edges that do **not** run along an exterior wall receive normal recess side walls
  - exterior-edge slots do not get duplicate overlapping walls
- When the drag reaches the far side, the mature Through kernel is preferred; legacy region Through rebuild remains fallback only.
- Partial inward commit is closed-topology gated and transactional; invalid results rollback.
- History is now pushed only on successful pointer-up commit, not when fallback first takes over.
- Outward Extrude remains on the normal path.
- Connected multi-face Extrude is unchanged; this cut path remains single-Face only.
- Through kernel remains pinned to the protected .242 line.

## Previous completed development — v0.36.18.384

Theme: **endpoint-vector Array UX**.

- User requested a spatial Array workflow: start with one duplicate, position the end duplicate anywhere, then fill evenly spaced linked instances between source and endpoint.
- Array now starts with Count=2: source + one highlighted END preview copy.
- Spacing slider is removed. The authoritative parameter is a 3D endpoint vector from source to END copy.
- END copy can be moved by direct Pencil/finger drag using **Free / X / Y / Z** modes:
  - Free = drag in the current camera/view plane
  - X/Y/Z = constrain endpoint movement to the selected world axis
  - modes can be switched repeatedly while preview is active, allowing arbitrary 3D endpoint placement
- Count 2–12 includes source and END copy. Intermediate previews are generated at t=i/(Count-1), so they remain evenly distributed along any diagonal/3D vector.
- Apply creates linked instances at those same vector fractions and reactivates the source.
- Preview motion remains non-destructive and history-free; Apply Array remains one Object-scene history step.
- Endpoint is visually stronger than intermediate preview copies.
- Count retains hardened Pencil range handling.
- Next task after user verification remains inward/negative Face Extrude cutting behavior.

## Previous completed development — v0.36.18.383

Theme: **direct viewport spacing for Linear Array**.

- User hands-on testing passed the .382 Linear Array foundation.
- While Array preview is armed, Pencil/finger can now press any translucent preview instance and drag it along the currently selected X/Y/Z array direction.
- Dragging a later preview copy divides world movement by that copy's array index, so the grabbed copy tracks the Pencil/finger while maintaining equal spacing across the whole array.
- Spacing slider/output updates continuously during direct drag and remains the exact-value fallback.
- OrbitControls pauses only during the spacing drag and restores immediately on release/cancel.
- If the active world axis projects almost directly into the camera and has no useful screen direction, direct drag declines cleanly and the slider remains available.
- Direct spacing drag is preview-only and creates no history entry; Apply Array remains the single commit/history step.
- Existing linked-instance creation, Count, X/Y/Z, Pencil-safe sliders and source-reactivation behavior are unchanged.
- Next task after user verification: revisit inward Face Extrude so negative/inward extrusion cuts the surrounding side walls rather than folding/stretching them through the volume.

## Previous completed development — v0.36.18.382

Theme: **Phase D Linear Array foundation using existing linked instances**.

- Added Object > Active Tools > **Array** as a thin higher-level modelling layer over the existing authoritative linked-instance system.
- Linear Array controls:
  - Count 2–10, counting the original object
  - Spacing 0.1–10 world units
  - world X / Y / Z axis selection
- First Array tap arms a non-destructive viewport preview; the button becomes **Apply Array**.
- Preview displays every future copy as translucent fill + wire overlay while leaving the source object unchanged.
- Apply creates the requested copies through `__boxlabObjectManager.linkedDuplicateObject(...)`; it does not create a parallel object or instance system.
- Each generated object is a linked instance sharing source geometry while keeping independent placement.
- Generated placements are established by moving the live duplicate and using the existing Object Manager `saveActive()` instance-placement derivation path.
- The original source object is reactivated after Apply.
- Apply records one Object-scene history snapshot for Undo/Redo.
- Count and Spacing use explicit Pencil range mapping with the same late-Safari-event protection proven by Shell.
- Active Tools stays open throughout Array preview.
- Protected `multi-object-transform.js?v=0.36.1.0` is untouched.
- Frozen Beta 3 remains untouched.

## Previous completed development — v0.36.18.381

Theme: **Solidify preview visibility parity with Shell**.

- User screenshots showed the remaining visibility problem was in **Solidify preview**, not Shell preview.
- Solidify's generated-geometry preview is now a two-layer Group:
  - translucent filled **DoubleSide** surface layer for front/back/interior readability
  - brighter **DoubleSide wireframe** overlay for topology clarity
- Both layers render with depth test/write disabled so the generated inner shell remains visible through the source sheet from either viewing direction.
- Direct thickness drag remains supported:
  - raycasting now traverses the preview Group recursively
  - projected drag normal is derived from the actual hit child mesh transform
- Preview disposal now traverses the Group and safely disposes shared geometry/materials once.
- Solidify core/topology, thickness maths, drawer locking, history and linked propagation are unchanged.

## Previous completed development — v0.36.18.380

Theme: **Shell preview backface/interior visibility**.

- User confirmed .379 Pencil thickness handling works correctly.
- Shell preview was visually weak from many camera angles because the preview was wireframe-only.
- Preview is now a two-layer Group:
  - translucent filled **DoubleSide** surface layer for front and back/interior visibility
  - brighter **DoubleSide wireframe** overlay for topology clarity
- Both preview layers render without depth writing/testing so the hollow interior remains readable through the source mesh from either viewing direction.
- Preview disposal now traverses the Group and safely disposes shared geometry/materials once.
- Shell topology, thickness handling, history, Face selection and Apply behaviour are unchanged.

## Previous completed development — v0.36.18.379

Theme: **harden Apple Pencil ownership against late Safari range events**.

- Hands-on testing showed .378 still snapped to 0.01 with Apple Pencil.
- The .378 pointer mapping itself was correct; the remaining failure was a late native Safari range input/change arriving after Pencil-up and overwriting the computed value.
- Shell now stores the Pencil-owned thickness value for the entire Pencil gesture and through two animation frames after release.
- Every input/change event during that ownership window is forced back to the Pencil-computed value before output/preview update.
- Native finger interaction remains unchanged once Pencil ownership is released.
- No Shell topology, Solidify core, selection, drawer or history logic changed.

## Previous completed development — v0.36.18.378

Theme: **Apple Pencil / finger parity for Shell Thickness**.

- User hands-on testing found native iPad range behaviour diverged by input device: finger thickness selection worked, while Apple Pencil could snap the Shell Thickness control back to its minimum `0.01`.
- Shell now owns an explicit Pencil-only range interaction path.
- Pencil contact maps `clientX` across the live Shell Thickness slider bounds, clamps to the same min/max, snaps to the same `0.01` step and writes the value back through the existing `input` event pathway.
- Pencil pointer capture keeps a drag stable if the Pencil leaves the narrow slider track during adjustment.
- Finger/touch retains the already-working native range interaction.
- Both methods therefore converge on the same Shell Thickness value/preview source after input resolution.
- Shell topology, Solidify hard-fold core, Face selection, history and drawer-lock behaviour are unchanged.

## Previous completed development — v0.36.18.377

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


## Current development — v0.36.18.395 Sweep Profile + dual path

**Released on main via PR #80; squash merge `1855f447784d13067088dd179f472d4d2cc8e000`. PR regression run `35583108817` passed.**

The user hands-on passed v0.36.18.394 and requested the next Sweep iteration.

v0.36.18.395 changes the Sweep construction model while preserving the stable .394 Apply/preview foundation:
- the construction plane is now explicitly the **Profile Plane**
- built-in **Circle** and **Rectangle** profiles plus a custom **Draw** profile share one generalized Sweep backend
- built-in profiles can be converted into editable profile points through **Edit Profile**
- **Follow Edges** supplies a SketchUp-style path from existing visible connected geometry and does not depend on the Geometry Snap toggle
- **Draw Path** remains available for free 3D authoring; Geometry Snap can still target external vertices, edges and face hit-points
- free Draw Path uses an invisible camera-facing working plane through the current path end; no path construction plane is shown
- Profile and Path can be edited alternately before Apply
- generalized buildSweepProfile() parallel-transports arbitrary closed profiles along the path and produces ordinary editable mesh topology
- legacy buildSweepTube() remains as a compatibility wrapper over the generalized profile backend
- protected src/multi-object-transform.js?v=0.36.1.0 and pinned styles.css?v=0.36.18.270 remain untouched

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

## Current development — v0.36.18.396 Sweep Draw Profile refinement

**Released on main via PR #81; squash merge `37ad0fc5c1dea9e6ba5281b93f9e72ba366d4b69`. PR regression run `35593175171` passed.**

User feedback on .395: the Profile Plane was much too large; Circle/Rectangle worked; Draw became trapped at two points, gave no useful preview, and had no explicit open/closed state.

v0.36.18.396 addresses that directly:
- Profile Plane half-size reduced from 2.0 to 0.35, close to the default 0.25-radius Circle
- custom Draw profiles start **Open**
- open Draw appends points naturally instead of treating a two-point line as a closed insertion loop
- open profiles preview after two points as swept surfaces
- explicit **Open / Closed** profile toggle; closing requires at least three points
- closed profiles keep the solid-style seam and optional Caps; open profiles show Caps N/A
- Circle/Rectangle remain closed; converting them through Edit Profile preserves a closed editable profile

## Current development — v0.36.18.397 Sweep profile orientation fix

**Released on main via PR #82; squash merge `2cc8e9d89a87ef080411d61afd8f8d2535e97a42`. PR regression run `35594079715` passed.**

User feedback on .396: closing a Draw profile could jump to an unexpected vertex, and profile editing appeared mirrored — dragging a point left moved the Sweep preview right.

v0.36.18.397 fixes both from the same root cause:
- `cleanProfile()` no longer reverses clockwise authored point order
- closure remains exactly final point → point 0
- winding is handled in generated face/cap order instead of by mutating the profile
- the initial Sweep frame now preserves Profile Plane U and V orientation even when the path runs opposite the plane normal
- editing and preview should now move in the same screen-space direction

## Current development — v0.36.18.398 Sweep concave-profile + start-ring hardening

**Released on main via PR #83; squash merge `eb56d9df1c08fbbd3ba95112378f0a6e8397eb47`. Final corrected PR regression run `35659397337` passed.**

User feedback on .397: a closed C-shaped profile produced an inside-out/unclean mesh; the sweep generally followed the profile but the start of the sweep was visibly wrong.

v0.36.18.398 addresses the two concrete causes:
- ring 0 is now generated directly from the authored Profile Plane U/V basis, so the start section is exactly the profile drawn on the plane
- subsequent frames continue from the established transport logic
- concave closed profile caps use polygon triangulation instead of the generic fan-from-vertex-0 cap face
- cap triangle winding is oriented against/with the path direction at start/end to avoid inside-out end faces
- global mesh triangulation remains untouched

### Requested modelling backlog
- **Edge Extrude** — explicitly requested; not yet implemented. Preserve this as a Phase B/precision-modelling candidate.

## Current development — v0.36.18.399 Sweep side-normal correction

**Released on main via PR #84; squash merge `0884f4d1acad778c9cbca1f93526a072eda495da`. PR regression run `35663109891` passed.**

User feedback on .398: the C-profile geometry was substantially improved, but the resulting Sweep side faces displayed flipped normals.

v0.36.18.399 replaces the old global clockwise/anticlockwise side-face rule with an edge-local outward-orientation check:
- every profile edge derives its own outward 2D direction from the authored profile winding
- that outward vector is mapped through the adjacent transported Sweep frames into 3D
- each generated side quad compares its actual normal against that expected outward direction and reverses only when required
- cap logic and .398 exact start-ring placement remain unchanged
- this specifically protects concave profiles and direction-changing paths from inside-out side walls

## Current development — v0.36.18.400 Sweep edit ownership

**Released on main via PR #85; squash merge `45419ad01b683d46c26179497bafb186ca90f632`. PR regression run `35672719322` passed.**

User feedback on .399: Draw Profile could not add a fourth point until Open was selected again; Move also remained armed when Edit Profile/Edit Path was selected, blocking authoring.

v0.36.18.400 fixes the interaction ownership:
- selecting Draw Profile now explicitly forces the custom profile Open and keeps append-style authoring active until the user explicitly closes it
- point 4+ therefore appends normally without reselecting Open
- entering Profile or Path editing explicitly disarms BoxLab transform arming
- the upgraded Move/Scale/Rotate gesture layer now yields completely while Sweep reports itself as editing
- Sweep exposes an `editing` state so viewport gesture ownership is unambiguous
- existing touch navigation remains untouched

## Current development — v0.36.18.401 Sweep Use Selection profile

**Released on main via PR #86; squash merge `0b6ae224f717c9c95a408f1db9bc77ad52c09169`. Final corrected PR regression run `35673404201` passed.**

The user hands-on passed .400 and requested `/nextbuild`.

v0.36.18.401 completes the remaining profile-source option from the agreed Sweep design:
- select exactly one Face or a closed selected Edge loop **before** Add → Sweep
- Sweep snapshots that source before it switches to the new Sweep object
- **Use Selection** appears with Circle / Rectangle / Draw and is enabled only when a valid source was captured
- Use Selection aligns the Profile Plane to the selected planar geometry, preserving the actual outline as an editable closed Draw profile
- closed Edge-loop capture requires one connected cycle with degree 2 at every loop vertex
- non-planar or invalid selections are rejected rather than approximated
- applying Use Selection clears any stale path because the profile origin/plane may move
- the original source object remains untouched

## Current development — v0.36.18.402 Sweep direct selection launch

**Released on main via PR #87; squash merge `1c512bd2b3c487e9839b0021e8607473340910f4`. Final corrected PR regression run `35674435817` passed.**

User feedback on .401 exposed a workflow flaw: switching from Face/Edge mode to Object mode clears the component selection before Add → Sweep can capture it.

v0.36.18.402 fixes the workflow rather than trying to preserve component selection across mode changes:
- Face Active Tools now includes **Sweep from Selection** when exactly one Face is selected
- Edge Active Tools now includes **Sweep from Selection** when a closed-loop-sized Edge selection exists
- the button captures the selected component geometry immediately, while the selection still exists
- BoxLab then creates the Sweep object, enters Object mode, aligns the Profile Plane and automatically applies the captured profile
- the .401 Use Selection button remains available inside Sweep for already captured profile sources
- invalid/open/branched/non-planar edge selections are still rejected by the existing conservative validation

## Current development — v0.36.18.403 closed-profile node insertion fix

**Released on main via PR #88; squash merge `e5b62249db5d80ed6148f02b52bb20563c088c4b`. PR regression run `35675477945` passed.**

User feedback on .402: closed custom Sweep profiles could not accept an inserted node.

Root cause: `nearestProfileSegment()` called a missing `segmentDistance()` helper. Open-profile authoring never used that path, which is why the problem only appeared after closing the profile.

v0.36.18.403 adds the missing clamped point-to-segment distance helper, restoring edge hit-testing for closed profile insertion without changing profile topology or Sweep generation.

## Current development — v0.36.18.404 selected-profile Sweep anchor

**Released on main via PR #89; squash merge `4b3b1c09e52341e0bc02e2c4f9614be919130e59`. PR regression run `35678133922` passed.**

User feedback on .403: Face → Sweep worked, but Follow Edges swept from the profile centre to the first rail endpoint before following the path. In the supplied triangular-profile example, the desired rail anchor is the triangle's top-right profile vertex.

v0.36.18.404 adds an explicit profile anchor for selected Face/Edge-loop profiles:
- on the first Follow Edge pick, BoxLab finds the nearest profile-vertex / edge-endpoint pair
- that profile vertex becomes the Sweep anchor
- the Profile Plane is translated so the chosen vertex sits exactly on the rail start
- the section is rebased around that anchor before sweep generation, preserving the full profile shape and offset
- path generation begins directly at the rail endpoint, removing the old centroid-to-rail lead-in segment
- subsequent Follow Edges continue from the selected rail as before
- Circle/Rectangle/default-centred profiles remain centre-anchored
- Draw Path remains unchanged unless a rail anchor has explicitly been established

## Current development — v0.36.18.405 Sweep shell normal unification

**Released on main via PR #90; squash merge `5076c8ee5fa268bc6fa0722a3796f2e766b86bc5`. PR regression run `35678568877` passed.**

User feedback on .404: the selected-face anchor/rail relationship is now correct, but the applied closed Sweep still shows flipped normals.

v0.36.18.405 adds a final closed-shell orientation validation inside the Sweep generator:
- for closed profiles with both end caps, BoxLab computes the signed volume of the completed Sweep shell
- if the shell is inward-wound, every face is reversed once before the EditableMesh is created
- this acts as a Sweep-specific Unify Normals pass at generation time
- it is independent of source face winding, selected anchor vertex, concavity and path bends
- open-profile surface sweeps and uncapped sweeps are not auto-flipped because they are not closed solids
- .404 profile-anchor behaviour remains unchanged

## Current development — v0.36.18.406 Tool Session UI foundation + Sweep UX

**Released on main via PR #91; squash merge `84bb7c68af215560061fda034f723d42be5dce2a`. Final corrected PR regression run `35680137829` passed.**

The user confirmed .405 Sweep geometry/normals and requested a UI/UX audit before leaving Sweep. The audit found that recent complex tools were all appending controls into the same Active Tools container, causing Sweep to be buried among unrelated Object tools such as Array and Boolean.

v0.36.18.406 introduces a reusable **Tool Session** UI foundation and migrates Sweep onto it:
- new `src/tool-session-ui.js` owns an exclusive host at the top of Active Tools
- while a Tool Session is active, normal Active Tools content is hidden rather than left visible underneath
- previous drawer open/keep-open state is restored when the session ends
- Sweep is the first Tool Session client
- Sweep controls are regrouped into three persistent stages: **PROFILE / PATH / FINISH**
- only the selected stage's controls are visible; unrelated Array/Boolean/Clean/Solidify controls are hidden while Sweep is active
- selected Face/closed Edge-loop launch button is promoted near the top of the relevant contextual Active Tools and shortened to **Sweep**
- Face/Edge → Sweep captures/applies the profile and jumps directly into **PATH** with Follow Edges active
- Object Add → Sweep starts in **PROFILE**
- PROFILE/PATH stage ownership is exclusive so the hidden editor cannot continue stealing viewport gestures
- Apply Sweep ends the Tool Session and restores normal Active Tools
- stable .405 Sweep geometry/topology code remains unchanged apart from version wiring

This Tool Session pattern is the intended basis for later migration of Revolve, Array, Solidify and Shell; do not independently add more permanent complex-tool blocks to Active Tools.

## Current development — v0.36.18.407 Sweep local winding unification

**Released on main via PR #92; squash merge `9eaf20a927aa0c87f27e19df1ade2026b1453fad`. Final corrected PR regression run `35680632722` passed.**

User hands-on passed the .406 Tool Session UX and reported one remaining isolated backface in Sweep.

v0.36.18.407 adds a true local face-winding unification pass before the existing closed-shell signed-volume orientation check:
- shared edges are indexed across generated Sweep faces
- adjacent faces are traversed component-by-component
- any neighbour using the same shared-edge direction is reversed
- after all local winding is consistent, closed capped shells still use the .405 signed-volume pass to choose outward global orientation
- this repairs isolated backfaces that a shell-volume test cannot detect
- open/uncapped Sweep surfaces also gain local winding consistency, but are not globally flipped
- .406 Tool Session UX remains unchanged

## Current development — v0.36.18.408 Sweep Follow Edges rail guide

**Released on main via PR #93; squash merge `e2bdaaa18b803fce0adb7d3ef4b63c8dad64b455`. PR regression run `35682072137` passed.**

User hands-on passed .407 and reported a visibility problem in PATH → Follow Edges: BoxLab could snap to internal topology edges such as Knife cuts across a face, but those edges were not visibly drawn in the viewport.

v0.36.18.408 adds an automatic temporary rail-edge guide:
- while Sweep is in **PATH** with **Follow Edges** selected, BoxLab overlays the complete edge network of every eligible visible snap-reference mesh
- the guide is generated from the same evaluated meshes used by Follow Edges snapping, so visible rail candidates and pickable rail candidates match
- internal Knife / Loop Cut / topology edges are included, not only silhouette/boundary edges
- the guide is depth-tested and non-writing so it behaves like a modelling aid rather than permanent wireframe mode
- switching to PROFILE, Draw Path, FINISH, or ending Sweep removes the guide automatically with the normal Sweep construction overlay
- .406 Tool Session UX and .407 winding fixes remain unchanged

## Current development — v0.36.18.409 Sweep rail contrast / hot-edge feedback

**Released on main via PR #94; squash merge `1ee7a5ff1fe2b6105d6cb26eebcef6a8484b96b8`. Final corrected PR regression run `35683804432` passed.**

User feedback on .408: the rail network is now visible, but the selectable path still needs more contrast and clearer interaction feedback.

v0.36.18.409 adds a three-state visual hierarchy in PATH → Follow Edges:
- **candidate rails** use a brighter high-contrast neutral edge guide
- the edge currently under the Pencil/cursor becomes a distinct **hot rail** highlight
- the already accepted Sweep rail is redrawn as a strong Sweep-cyan path
- hover/proximity testing reuses the same Follow Edges edge picker, so the hot highlight represents the edge BoxLab would actually select
- hot-edge state clears automatically when leaving PATH, switching to Draw Path, applying Sweep, or exiting the tool
- no geometry, snapping or Tool Session behaviour changes

## Current development — v0.36.18.410 Follow Edges dedicated edge picker

**Released on main via PR #95; squash merge `19652f2ecff87f9de5a75fe0aaa678e132b88ee0`. Final corrected PR regression run `35684334992` passed.**

User reported that Follow Edges stopped working after .409 contrast/hot-edge feedback.

Root cause: .409 reused the generic geometry snapper for hot-edge feedback and Follow Edges. That snapper intentionally prioritizes Vertex before Edge, so near endpoints a rail click/hover could resolve as a Vertex and be rejected by Follow Edges.

v0.36.18.410 separates the rail interaction cleanly:
- new `externalEdgeSnap()` searches edges only
- both hot-edge hover and Follow Edges click use the same edge-only picker
- candidate rail references are cached for the active Follow Edges session, reducing repeated mesh cloning during Pencil hover
- entering Follow Edges refreshes the cache; leaving PATH/Follow Edges or applying Sweep clears it
- Draw Path continues using the generic Vertex/Edge/Face snapper
- .409 candidate/hot/accepted rail contrast is preserved

## Current development — v0.36.18.411 Follow Edges explicit state + surface-visible rails

**Released on main via PR #96; squash merge `57186abed6bf6daff3015b7d3d01e7601fe74062`. Final corrected PR regression run `35684868346` passed.**

User feedback after .410: Follow Edges still did not visibly light as active, and internal Knife-cut rails were still not visible on shaded faces.

v0.36.18.411 fixes the UI/visibility layer directly:
- adds `syncPathModeButtons()` so Follow Edges / Draw Path button state is updated immediately when path mode changes instead of waiting for the next overlay rebuild
- Follow Edges and Draw Path also expose `aria-pressed` state for an explicit UI state contract
- Sweep session buttons now have an explicit active-button style, so Follow Edges visibly lights when active rather than relying on unrelated global button styling
- candidate rail lines now render with `depthTest:false`, preventing coplanar Knife/Loop-Cut edges from disappearing into the shaded face through depth conflict
- the rail guide remains temporary and only appears during PATH → Follow Edges
- .410 dedicated edge-only picker remains unchanged

## Current development — v0.36.18.412 hard Follow Edges active-state indicator

**Released on main via PR #97; squash merge `01784ed914e1351da3c3d84af6bafefb576ca654`. Final corrected PR regression run `35685824200` passed.**

User reported .411 still did not make Follow Edges visibly light.

Audit confirmed global button CSS is not stripping the state, so .412 removes ambiguity from presentation:
- Follow Edges / Draw Path selected styling is now driven by `aria-pressed="true"` as well as the `active` class
- selected-state styling uses a dedicated Sweep selector with `!important`, independent of generic button styling
- active Follow Edges changes its label to **Follow Edges · Active**; Draw Path does the same when active
- candidate rail guide is made fully opaque white while active to maximize contrast over shaded surfaces
- no picker, path, geometry or Tool Session behavior changes

## Current development — v0.36.18.413 atomic selected-profile → Follow Edges handoff

**Released on main via PR #98; squash merge `e30e895e82453e85d3b8ac4e97dbfb0ebdc0a82f`. Final corrected PR regression run `35686329704` passed.**

The .412 screenshot proved CSS was not the root cause: PATH was active, but Follow Edges was not. This means the selected-profile launch reached the PATH stage while the actual path-mode activation was being lost during the profile/save/render handoff.

v0.36.18.413 removes that fragile second-stage lookup:
- `applySelectionProfile()` now accepts `activateFollowEdges:true`
- selected Face/Edge profile loading, `pathMode='edges'`, `editPath=true`, and `sessionStage='path'` are written atomically to the same Sweep metadata object
- Follow Edges button state and rail references are initialized before `manager.saveActive()` and the cage/render event
- the old sequence `applySelectionProfile(); setPathMode('edges'); setSweepStage('path')` is removed from the auto-launch path
- manual Use Selection still loads only the profile unless explicitly asked to activate Follow Edges
- .412 hard active-state label and .410 edge-only picker remain intact

## Current development — v0.36.18.414 Follow Edges root-cause fix

**Released on main via PR #99; squash merge `ac6c3a630757f849962cae832f0b53999d68fbc9`. PR regression run `35686712355` passed.**

Hands-on after .413 still showed PATH active but Follow Edges unable to activate.

Root cause was found in `src/sweep-path.js`: the module-level variables `hotRailHit` and `railSnapRefs` had accidentally disappeared from the declaration, while Follow Edges code still referenced them. Tapping Follow Edges therefore threw a `ReferenceError` before `setPathMode()` could update the UI or build the rail guide.

v0.36.18.414 restores both variables at module scope:
- `hotRailHit=null`
- `railSnapRefs=null`

No picker, geometry, Tool Session or workflow logic changes are made beyond restoring the missing runtime state.

## Current development — v0.36.18.415 fresh Sweep placement / immediate Move

**Released on main via PR #100; squash merge `69299520f61b36186d121026f8e27b807889db46`. Final corrected PR regression run `35688505420` passed.**

After .414 fixed Follow Edges, the user reported a fresh Add → Sweep construction plane spawning inside the first cube and being difficult/impossible to select for repositioning.

v0.36.18.415 changes only the fresh Add → Sweep placement path:
- a brand-new Sweep profile plane is created camera-facing rather than fixed to world XY
- its center is placed just in front of the currently active mesh bounding sphere, toward the camera, so it is immediately visible instead of buried inside the default cube
- the new Sweep remains the active object from `addMesh()`
- real Move is automatically armed on the next animation frame for fresh Sweep creation, matching the direct-manipulation behavior already used by Duplicate
- Face/Edge → Sweep does **not** use this offset; selected-profile Sweeps still replace the placeholder plane with the captured source geometry exactly in place

## Current development — v0.36.18.416 Array Tool Session migration

**Released on main via PR #101; squash merge `00f555ed3475c11194c131aca9599db8280a7536`. Final corrected PR regression run `35689094456` passed.**

After Sweep established the Tool Session pattern, the user selected roadmap item 1: migrate Array next.

v0.36.18.416 keeps the proven endpoint-vector Array engine and changes only UI ownership/workflow:
- normal Object Active Tools now shows one compact **Array** launch button instead of the full permanent Array control block
- launching Array starts an exclusive **Array Tool Session** and hides unrelated Object tools while preview is active
- the session contains only **Direction** (Free/X/Y/Z), **Count**, viewport endpoint guidance, **Cancel**, and **Apply Array**
- the highlighted END copy remains directly draggable in the viewport; Count still distributes linked instances evenly across the endpoint vector
- Apply keeps the existing one-scene-snapshot linked-instance commit and returns to the source object
- Cancel removes only the preview and restores normal Active Tools
- switching away from the active source/object mode still cancels the preview safely
- Array geometry, linked-instance semantics, Pencil Count ownership, Undo/Redo and endpoint drag math are unchanged

This is the second client of `tool-session-ui.js` after Sweep and confirms the intended migration path for Solidify/Shell and Revolve.

## Current development — v0.36.18.417 Array Tool Session ownership during repositioning

**Released on main via PR #102; squash merge `58e65c14d04ce3f8ebc21f98b4860373007a3126`. PR regression run `35689604956` passed.**

User hands-on found that while Array preview was active, selecting/repositioning the array object could cause Active Tools to leave the Array Tool Session and return to the normal Object drawer.

v0.36.18.417 hardens Array session ownership:
- while preview is armed, Object-mode selection changes no longer cancel Array
- the original Array source object remains authoritative; if another object temporarily becomes active during a repositioning gesture, Array immediately restores the preview source
- Array reasserts its Tool Session if any external drawer/selection path displaces it
- only explicit Apply, Cancel, or leaving Object mode ends the Array session
- endpoint preview pointer-down now listens at document capture level (while still requiring the viewport canvas target), so Array gets first refusal before ordinary object selection logic
- endpoint drag math, Count, linked-instance Apply and scene history remain unchanged

## Current development — v0.36.18.418 Tool Session drawer ownership

**Released on main via PR #103; squash merge `5bbe750f4fc21fd85f0d47b7a0117be11072273f`. PR regression run `35690638630` passed.**

User hands-on showed .417 still failed visually: touching the Array END copy collapsed Active Tools immediately even though Array remained logically armed.

v0.36.18.418 fixes the ownership at the shared Tool Session layer:
- Tool Session now listens for Active Tools <details> toggle events
- if another interaction path closes the drawer while a session is active, it is reopened on the next microtask
- this keeps Array controls visible throughout END-copy interaction without changing normal drawer behaviour outside Tool Sessions
- the fix automatically protects Sweep and future Solidify/Shell/Revolve Tool Session clients
- Array geometry, endpoint drag math, linked-instance Apply, selection semantics and protected multi-object transform are unchanged

## Current development — v0.36.18.419 Array pointer cleanup

**Released on main via PR #104; squash merge `c2b054d418a5c3b7e9f4fdfc747b6109c6c95fcb`. PR regression run `35691232067` passed.**

User hands-on passed .418 Array drawer ownership but reported free Vertex movement stopped afterward.

v0.36.18.419 keeps the .418 drawer fix and hardens END-copy teardown:
- Array now explicitly releases canvas pointer capture when endpoint dragging ends
- the same teardown is used by pointer-up, pointer-cancel, Apply, Cancel and mode/session exit paths
- OrbitControls restoration remains paired with pointer release
- free component Move implementation itself is untouched
- protected multi-object transform stays pinned at v0.36.1.0

## Current development — v0.36.18.420 Vertex transform ownership

**Released on main via PR #105; squash merge `80677f75d32329a452ccc517ce4d52379d0fb628`. PR regression run `35695257815` passed.**

Hands-on after .419 established a Vertex-only transform failure: vertices could be selected and bevelled, while Edge and Face transforms still worked.

v0.36.18.420 fixes the event-ownership conflict:
- Vertex Pick Assist now yields whenever Move / Scale / Rotate is armed
- it no longer stops the selected-vertex pointerdown before the transform system can own the drag
- ordinary Vertex tap selection still uses Vertex Pick Assist when no transform is armed
- direct Vertex tools remain unchanged
- Array .418/.419 fixes and protected multi-object transform remain intact

## Current development — v0.36.18.421 Solidify / Shell Tool Sessions

**Released on main via PR #106; squash merge `f7ac0b986b01c5441be888d69bfeda88c92299d2`. Final PR regression run `35695761384` passed.**

Following the hands-on pass of .420, the next Tool Session migration is Solidify/Shell.

Audit confirmed they must remain distinct modelling operations:
- Solidify = Object-mode open sheet → closed solid
- Shell = Face-mode closed solid + chosen opening faces → hollow solid

v0.36.18.421 migrates only their UX/session ownership:
- idle Object/Face Active Tools keep compact launch buttons
- launch starts the shared exclusive Tool Session
- live Thickness controls plus Cancel / Apply live inside the session
- Solidify direct viewport thickness dragging is preserved
- Shell Apple Pencil thickness slider guard is preserved
- geometry cores/history behavior are unchanged
- protected multi-object transform remains pinned at v0.36.1.0

**Hands-on verify v0.36.18.421:** Solidify an open sheet and confirm the exclusive session, live thickness/direct drag, Cancel and Apply. Then Shell a closed cube with one face selected and confirm session, thickness, Cancel/Apply. Quick Array/Vertex sanity check afterward.

## Current development — v0.36.18.422 Revolve Profile Tool Session

**Released on main via PR #107; squash merge `478f2a8613873c0c3533a3ce82bb7227925e8230`. Final PR regression run `35696735145` passed.**

Following the hands-on pass of .421, Revolve Profile is migrated to the shared exclusive Tool Session.

v0.36.18.422 preserves the proven Revolve construction workflow:
- a new Revolve Profile still starts as a normal movable/snappable Object-mode construction plane
- a compact Revolve Profile launcher is visible while that construction is active
- moving/snapping the plane automatically claims the Tool Session, matching the established .391 behavior
- tapping the launcher claims the session immediately without requiring a move first
- Edit Profile / Undo Point / Delete Point / Clear / Segments 3–64 / Apply Revolve live inside the exclusive session
- Pencil/mouse authors the profile while touch navigation remains unchanged
- Apply geometry, winding/normals, single-object selection cleanup and Boolean tint sync are unchanged
- old private drawer-lock ownership is removed in favor of the shared Tool Session
- protected multi-object transform remains pinned at v0.36.1.0

**Hands-on verify v0.36.18.422:** Add → Revolve Profile; move/snap the plane and confirm Active Tools becomes Revolve Profile. Draw/edit a profile, change Segments, orbit/pan/zoom while editing, and Apply. Also try a fresh profile without moving it: open Active Tools and tap the compact Revolve Profile launcher.

## Next development step

**Hands-on verify v0.36.18.417: launch Array, tap/drag the highlighted END copy and reposition it. Active Tools must stay on ARRAY throughout; only Apply/Cancel or leaving Object mode should exit the session.**

- Face selected → tap Sweep near the top of Face Active Tools; Sweep should take over Active Tools and open directly on PATH.
- Confirm Array, Boolean, Clean for SubD, Solidify and other normal Object tools are not visible while Sweep is active.
- Use PROFILE / PATH / FINISH tabs to move backward/forward without losing the live Sweep.
- Apply Sweep and confirm the normal Active Tools UI returns immediately.
- Add → Sweep from Object mode should begin on PROFILE rather than PATH.

## End-of-session requirement

Before finishing any future code-changing BoxLab session:
- rewrite this handoff to the resulting repo state
- append the milestone to `DEV_HISTORY.md`
- update `TEST_CHECKLIST.md` for newly stable behavior
- verify a brand-new chat could continue using only the repo and these files


