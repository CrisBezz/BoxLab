## Current recovery checkpoint — v0.36.18.481

- Hands-on .480 still failed for Vertex, Edge and Face Rotate.
- Shared transform pointerdown was already on document capture, but pointermove remained on canvas capture.
- The protected Pencil orbit gate installs earlier canvas-capture handlers, so an armed transform could begin successfully yet have its Pencil movement stopped before the transform owner received pointermove.
- v0.36.18.481 moves shared transform pointermove to document capture too, keeping the full active drag above the Pencil orbit gate.
- Rotate maths, hit-testing, selection ownership, main.js and protected multi-object transform remain unchanged.
- Sentinel: Vertex / Edge / Face Rotate must now visibly move during Pencil drag; Move/Scale and orbit/pan/zoom must remain unchanged.

## Current recovery checkpoint — v0.36.18.480

- Hands-on after .479 showed the failure is not Face-specific: Vertex, Edge and Face Rotate all fail.
- Root cause scope therefore moved back to the shared component transform owner.
- `transform-upgrade.js` was reading the active transform only from the button's visual `.active` class, even though BoxLab already has authoritative transform state in `__boxlabTransformArming`.
- v0.36.18.480 changes shared transform ownership to read `__boxlabTransformArming.tool()` first, with the active button only as fallback.
- The .479 Face-only yield is removed: the shared transform engine once again owns Move / Scale / Rotate for Vertex, Edge and Face consistently.
- No Rotate maths, `main.js`, Pencil orbit gate or protected `multi-object-transform.js?v=0.36.1.0` are changed.
- Sentinel: Vertex multi-selection, Edge and Face Rotate all respond to Pencil drag; Move/Scale remain unchanged.

## Current recovery checkpoint — v0.36.18.479

- User explicitly requested Face Rotate repair before continuing UI rebuild.
- Audit found overlapping rotate ownership: generic `transform-upgrade.js` and dedicated `rotate-transform.js` could both claim Rotate gestures.
- The dedicated rotate fallback also used stale `bridgeState.selectedFaces` / `selectedEdges` fields instead of the authoritative `__boxlabSelectionBridge`.
- v0.36.18.479 gives Face Rotate one owner only:
  - generic transform-upgrade yields when mode=Face and tool=Rotate;
  - dedicated rotate-transform reads the selected face IDs from `__boxlabSelectionBridge`, converts them to face vertices, and owns that gesture.
- Move/Scale and Vertex/Edge/Object transform paths remain on transform-upgrade unchanged.
- `main.js` and `multi-object-transform.js?v=0.36.1.0` remain untouched.
- Sentinel: select face → Rotate → Pencil-drag selected face rotates around its selection center; selection remains; one-finger navigation stays orbit.

## Current recovery checkpoint — v0.36.18.478

- v0.36.18.477 made Loop and Bevel mutually exclusive, but hands-on showed Loop → Bevel required two taps.
- Root cause: the exclusivity shim disarmed Loop on pointerdown, before Bevel's own click handler. On iPad the state/UI change could consume the first gesture's eventual click.
- v0.36.18.478 moves only the Loop↔Bevel handoff to document click-capture. The old tool is toggled off at the start of the same click, then the original click continues to the target tool's existing handler and arms it.
- Split behavior is untouched and remains good.
- Face Rotate cache repair from .477 is unchanged.
- Sentinel: Loop → Bevel is one tap; Bevel → Loop is one tap; only one is active; Split handoff remains good.

## Current recovery checkpoint — v0.36.18.477

- v0.36.18.476 Edge progressive-disclosure polish is the current hands-on baseline.
- User found two follow-up issues:
  - Loop and Bevel could remain armed at the same time.
  - Face Rotate appeared non-functional.
- Loop and Bevel are now mutually exclusive through the existing Edge handoff shim: arming one first toggles the other off through its own existing button/controller path.
- Face Rotate audit found the complete transform implementation remains byte-identical to the hands-on-good .449 runtime: `main.js`, `transform-upgrade.js`, `rotate-transform.js`, selection and Pencil/orbit layers are unchanged.
- The rebuilt loader had regressed to the older cache key `transform-upgrade.js?v=0.36.18.444`, whereas .449 loaded the proven transform runtime under a fresh .449 key. v0.36.18.477 cache-hops the unchanged transform source to .477 so iPad/Safari cannot reuse a stale .444 module.
- No Face Rotate algorithm, selection, transform ownership or protected multi-object transform code is modified.
- Sentinel: Loop and Bevel cannot coexist; Face Rotate works with selected face(s); Move/Scale, Vertex/Edge transforms and navigation remain unchanged.

## Current recovery checkpoint — v0.36.18.476

- v0.36.18.475 Edge progressive disclosure passed to hands-on with five requested polish fixes.
- Edge control ordering is refined without changing modelling algorithms:
  - Loop Slide now sits directly under the Loops slider.
  - Edge Bevel Exact % row/readout now sit directly under Segments.
  - Offset Loop Support Spacing now sits above the Exact Offset % row/readout.
- Crease Strength remains contextual to Crease active state only.
- Added a narrow Edge-only Crease handoff shim because Crease is owned by legacy `main.js` while Bevel / Edge Slide / Offset Loop / Face Split own separate controllers. Selecting another Edge tool, Move/Scale/Rotate, or leaving Edge mode now toggles Crease off through its existing button path.
- Protected `main.js?v=0.36.18.366` remains untouched.
- Only presentation/cache owners are advanced: `tool-session-ui.js`, `precision-bevel.js`, `precision-offset-loop.js`, `drawer-ui.js`, plus the new `edge-crease-handoff.js`.
- Sentinel: Edge tool functionality remains unchanged; Crease never stays armed behind another tool; Strength hides when Crease is off; control order matches the active tool.

## Current recovery checkpoint — v0.36.18.475

- v0.36.18.474 Vertex progressive disclosure passed hands-on and is now the clean Vertex baseline.
- UI/UX recovery continues with the next isolated slice: **Edge progressive disclosure only**.
- Edge settings are now hidden at rest and revealed only by the owning tool's existing active state:
  - Loop: Loops + Loop Slide controls.
  - Bevel: Width + Segments + Exact % + readout.
  - Crease: Strength.
  - Edge Slide: Exact Slide % + readout.
  - Offset Loop: Exact Offset % + readout + Support Spacing.
- The implementation is CSS-only inside the existing Tool Session stylesheet. No Edge click/pointer handlers, selection ownership, topology controllers or transform ownership are changed.
- Bevel Exact % remains in the Move area above Slide/Offset precision controls when Bevel is active.
- Revolve remains absent from normal Edge Active Tools.
- Only `tool-session-ui.js` is cache-hopped to .475. Protected `main.js?v=0.36.18.366` and `multi-object-transform.js?v=0.36.1.0` remain untouched.
- Sentinel: Edge home is clean at rest; each tool reveals only its own settings; Bevel/Loop/Crease/Slide/Offset interaction and selection/navigation remain unchanged.

## Current recovery checkpoint — v0.36.18.474

- v0.36.18.473 is the hands-on-good forward baseline after true Bisect Only.
- UI/UX recovery resumes with the next single isolated slice: **Vertex progressive disclosure only**.
- Restored the proven historical .450 Vertex presentation rules only:
  - Vertex Slide exact row/readout are hidden at rest and shown only while `#vertexSlideBtn.active`.
  - Vertex Bevel Width, Exact % row and readout are hidden at rest and shown only while `#vertexBevelBtn.active`.
- The implementation is CSS-only inside the existing Tool Session stylesheet. It does not add pointer/click handlers, mutate selection, arm tools, or alter Vertex topology/controllers.
- Add, Build Edge, Slide, Bevel, Join, Weld, Delete and Vertex Move/Scale/Rotate remain on their existing runtime paths.
- Only `tool-session-ui.js` is cache-hopped to .474. Protected `main.js?v=0.36.18.366` and `multi-object-transform.js?v=0.36.1.0` remain untouched.
- Sentinel: Vertex home is clean at rest; Slide settings appear only while Slide is active; Bevel settings appear only while Bevel is active; selection/navigation and all Vertex operations remain unchanged.

## Current recovery checkpoint — v0.36.18.473

- v0.36.18.472 restored Add > Sweep and the Edge Bevel precision-control placement.
- User identified a missing Symmetry/Bisect operation: the current unchecked Mirror state kept only one clipped half, despite being described as “Bisect only”.
- v0.36.18.473 adds a true **Bisect Only** action inside the existing Symmetry/Bisect Tool Session.
- True Bisect Only uses the current movable/rotatable/snappable plane, inserts plane intersections into crossed faces, splits those faces into two faces sharing the cut edge, and keeps geometry on both sides. It does not mirror or discard either side.
- Existing Symmetry Apply behavior is unchanged. Its non-mirrored state is now described as **Keep half** rather than the misleading “Bisect only”.
- Facegroup IDs are inherited by both child faces created from a split source face. Existing crease edges are preserved/remapped through plane intersections where applicable.
- Only `symmetry-bisect.js` is cache-hopped in `index.html`; protected transform/navigation runtime remains untouched.
- Sentinel: Symmetry remains working; Bisect Only cuts without deleting/mirroring; moved/rotated/aligned planes still work; Sweep/Inset/Bevel/Extrude/Through/navigation remain healthy.

## Current recovery checkpoint — v0.36.18.472

- v0.36.18.471 successfully removed Edge Revolve from Edge Active Tools, but Add > Sweep still appeared inert.
- Deeper audit found the actual .469 regression: transactional Sweep cancellation introduced assignments to `sweepBeforeScene`, `sweepUndoDepth` and `sweepRedoDepth` without declaring those variables.
- Because `sweep-path.js` is an ES module, Add > Sweep threw a ReferenceError before `manager.addMesh()` could run.
- v0.36.18.472 declares all three transaction-state variables in the existing Sweep runtime state block. The .471 mode-switch guard remains in place.
- No Sweep profile/path/result geometry is changed.
- Edge Bevel **Exact %** UI is relocated from the bottom of Edge Active Tools to the Move section, before the existing Slide % / Offset % precision controls.
- `precision-bevel.js` is cache-hopped through `drawer-ui.js`, and the drawer loader is cache-hopped in `index.html` so iPad/Safari receives the new placement.
- Edge Revolve remains absent from the Edge tool surface.
- Sentinel: Add > Sweep creates the construction object/session; Cancel/mode escape remain transactional; Bevel Exact % sits above Slide % and Offset %; Inset/Bevel/Extrude/Through/navigation remain healthy.

## Current recovery checkpoint — v0.36.18.471

- v0.36.18.470 Edge Revolve progressive disclosure passed hands-on: Revolve itself works.
- User requested Edge Revolve be removed from the normal Edge Active Tools because its loose-edge-only input is difficult to discover/use in ordinary modelling.
- `src/revolve.js` remains loaded for historical/core availability, but its controls are intentionally no longer mounted into the Edge tool surface.
- User also reported Add > Sweep appears to do nothing.
- Root cause: .469 mode-switch cancellation queued a `pathObject()` check. Sweep creation itself calls Object-mode entry through `addMesh(...,{enterObjectMode:true})`; the queued cancellation then ran after `o.sweepPath` had been attached and immediately restored the pre-Sweep scene.
- Fix: mode-switch cancellation now captures whether a Sweep already existed at the instant the mode click began. Initial Add → Object mode therefore does not cancel the new Sweep, while later user mode changes still cancel the same active Sweep transactionally.
- Only changed runtime cache keys are advanced: `revolve.js?v=0.36.18.471` and `sweep-path.js?v=0.36.18.471`.
- No Sweep geometry/profile/path algorithms, Inset, Bevel, Extrude, Through, navigation or protected multi-object transform code is changed.
- Sentinel: Add > Sweep creates the Sweep construction object/session; Cancel still restores the prior scene; switching mode after Sweep exists still cancels; Edge Active Tools has no Revolve control; core modelling/navigation remains healthy.

## Current recovery checkpoint — v0.36.18.470

- v0.36.18.469 Revolve Profile + Sweep cancellation recovery remains the functional baseline.
- UI cleanup continues as one isolated Edge-mode presentation slice only.
- Restored the previously proven historical Edge Revolve progressive-disclosure pattern from the old .457 line: at rest only **Revolve** is shown; Lathe/Revolve label, X/Y/Z axis buttons and Segments are hidden until Revolve is successfully armed.
- Arming adds only the `revolve-active` presentation state; Apply/Cancel/mode escape removes it. Revolve geometry, preflight, preview, history, selection and Pencil-range logic are unchanged.
- No Face direct-tool, Inset, Bevel, Through, navigation, Object Tool Session or protected multi-object transform code is changed.
- Important repo condition discovered during this audit: PR #199 (.469) regression job failed with 57 stale contract failures, largely old runtime-pin/current-version assertions plus recovery-era contracts. Do not broad-repin the recovered runtime merely to satisfy those stale tests; repair the test suite separately and deliberately.
- Sentinel: Edge mode home shows one Revolve launcher at rest; selecting a valid loose-edge profile and pressing Revolve reveals X/Y/Z + Segments and normal preview/apply behavior; leaving Edge mode cancels/hides settings; Inset/Bevel/Extrude/Through/navigation remain healthy.

## Current recovery checkpoint — v0.36.18.469

- v0.36.18.468 Object Tool-first presentation is merged.
- User found two pre-existing workflow gaps during UI testing: Revolve Profile could not be added; Sweep could not be cancelled / escaped by changing mode.
- Revolve Profile is restored from the confirmed-good historical .453 controller, which contains the proper Add event handler, transactional scene snapshot/rollback and explicit Cancel action.
- Sweep gains a real session-level transactional Cancel. The pre-Sweep scene is captured; Cancel restores it and restores history depths.
- Sweep Cancel is available as an explicit button and also triggers when leaving the Sweep workflow via selection-mode change or opening another Tool Session.
- No Face direct-tool, Bevel, Inset, Through or navigation ownership code is changed.
- Sentinel: Add > Revolve Profile creates a construction plane and can Cancel; Sweep can Cancel from any stage and mode-switch escape restores the prior scene; Inset/Bevel/Extrude/Through/navigation remain healthy.

## Current recovery checkpoint — v0.36.18.468

- v0.36.18.467 Viewport scrolling is the hands-on-good forward baseline after Facegroup recovery.
- UI/UX cleanup resumes with **Object mode progressive disclosure only**.
- Critical lesson from the rejected broad cleanup: this build does not touch modelling controllers, pointer ownership, selection ownership, direct-tool arming, index cache rewiring, or protected runtime pins.
- Restored the missing CSS contract `.boxlab-tool-session-shell[hidden]{display:none!important}`, so inactive Object/Face Tool Session panels cannot leak into the mode home.
- Boolean is presented as one **Boolean** launcher at rest; Union/Cut/Intersect live inside the existing Tool Session and Close returns cleanly to Object home.
- Existing Symmetry, Transform, Insert, Mesh Health, Array, Revolve Profile, Sweep, Solidify and Shell session code is unchanged; only their existing hidden state is now respected.
- Sentinel: Object mode home is clean; launch/cancel each Tool Session; Inset, Edge Bevel, Vertex Bevel, Extrude, Through and navigation must remain unchanged.

## Current recovery checkpoint — v0.36.18.467

- v0.36.18.466 Shell-only Facegroup propagation was hands-on PASS.
- Facegroup recovery is now treated as complete; historical .445 runtime/cache rewiring remains quarantined.
- v0.36.18.467 restores only the useful historical .449 Viewport menu scrolling behavior inside `view-modes.js`.
- Viewport menu gets viewport-relative max height, vertical scrolling, contained overscroll, iPad inertial scrolling and vertical pan touch handling.
- No `index.html` cache/version rewiring and no modelling interaction changes.
- After this checkpoint, proceed directly into UI cleanup in small functional slices rather than replaying the old broad .450 rewrite.

## Current recovery checkpoint — v0.36.18.466

- v0.36.18.465 Solidify-only facegroup propagation was hands-on PASS and Shell remained healthy.
- v0.36.18.466 reintroduces **Shell facegroup propagation only**. `solidify-core.js` is intentionally untouched.
- Shell compact/restore paths now preserve `faceGroups[]` alongside faces.
- Selected opening faces are removed with their groups; surviving faces retain their IDs. The already-proven Solidify layer then handles inner-face inheritance and Ungrouped side walls.
- No Shell interaction/session/UI behavior changes.
- Sentinel: Shell still launches/previews/applies/cancels correctly on grouped meshes and preserves colours on surviving/inner faces while new side walls remain neutral.

## Current recovery checkpoint — v0.36.18.465

- v0.36.18.464 Shell/Solidify recovery was hands-on PASS: Shell is back and Solidify works normally.
- v0.36.18.465 reintroduces **Solidify facegroup propagation only**. `shell-core.js` is intentionally untouched.
- Solidify original faces keep their group IDs; inner duplicate faces inherit the same IDs; new side-wall faces are Ungrouped.
- Solidify rollback restores the prior faceGroups array together with vertices/faces/creases.
- Shell remains on the confirmed-good .461 core path and should behave exactly as in .464.
- Sentinel: Solidify on grouped open mesh preserves source/inner colours and neutral side walls; Shell still works unchanged; core modelling/navigation sentinels remain healthy.

## Current recovery checkpoint — v0.36.18.464

- User reported Shell broken after the .462 Facegroup propagation slice; .463 Join did not touch Shell but cannot be treated as a safe baseline until Shell is restored.
- v0.36.18.464 restores `src/solidify-core.js` and `src/shell-core.js` exactly to the confirmed-working .461 versions.
- Good .462 Extract Faces facegroup preservation and .463 Object Join facegroup preservation remain in place.
- Solidify/Shell facegroup propagation is temporarily removed and will be reintroduced separately after Shell functionality is confirmed.
- No UI/interaction changes.
- Sentinel: Shell must work exactly as before; Solidify must work; Extract/Join Facegroups remain preserved; Inset/Bevel/Extrude/navigation remain healthy.

## Current recovery checkpoint — v0.36.18.463

- v0.36.18.462 Extract/Solidify/Shell facegroup propagation was hands-on PASS.
- v0.36.18.463 restores Facegroup preservation through Object Join only.
- The first object's cloned faceGroups remain intact; every appended joined face now appends its source facegroup in the same order.
- Creases, loose topology and modifier compatibility behavior are unchanged.
- Boolean facegroup semantics remain intentionally untouched for the next higher-risk slice.
- Sentinel: join two grouped editable objects and confirm all pre-join colours survive in the joined object; prior Facegroup and modelling sentinels remain healthy.

## Current recovery checkpoint — v0.36.18.462

- v0.36.18.461 Mesh Health facegroup preservation was hands-on PASS.
- v0.36.18.462 restores facegroup propagation through Extract Faces, Solidify and the Shell path that depends on Solidify.
- Extracted faces retain their original facegroup IDs; remaining source faces keep their corresponding IDs.
- Solidify duplicates each source facegroup onto the inner face copy; newly created boundary side walls are intentionally Ungrouped.
- Shell preserves groups on surviving/opened faces, inherits them onto the inner shell via Solidify, and keeps new side walls Ungrouped.
- No interaction/tool ownership changes.
- Sentinel: Extract keeps group colours on source/new object; Solidify/Shell preserve original groups and neutral side walls; prior Facegroup/Mirror/SubD/Mesh Health and modelling sentinels remain healthy.

## Current recovery checkpoint — v0.36.18.461

- v0.36.18.460 SubD facegroup propagation was hands-on PASS.
- v0.36.18.461 restores Facegroup metadata preservation through Mesh Health operations only.
- Safe Repair keeps surviving faces aligned with their original facegroup IDs when duplicate/zero-area faces are removed.
- Auto Close keeps all existing facegroups and assigns newly created cap faces `null` / Ungrouped.
- Unify Winding and Flip Normals preserve facegroup IDs because face identity is unchanged.
- Triangulate assigns every generated triangle the parent polygon's facegroup ID.
- No modelling interaction/tool ownership changes.
- Sentinel: grouped mesh retains groups through Safe Repair, Unify/Flip/Triangulate; Auto Close cap is neutral/ungrouped; Inset/Bevel/Extrude/navigation remain healthy.

## Current recovery checkpoint — v0.36.18.460

- v0.36.18.459 Mirror facegroup propagation was hands-on PASS.
- v0.36.18.460 restores **SubD facegroup propagation only**.
- Each Catmull-Clark child quad inherits the parent facegroup ID.
- Facegroups viewport source evaluation now applies SubD at the object's current level before Mirror, matching the display pipeline.
- Mirror propagation remains from .459; no additional modelling interaction changes.
- Sentinel: grouped OBJ + SubD Preview preserves colours across subdivided descendants; SubD+Mirror also matches; first activation remains immediate; Inset/Bevel/Extrude/navigation remain healthy.

## Current recovery checkpoint — v0.36.18.459

- v0.36.18.458 pending-state first-activation repair was hands-on PASS.
- v0.36.18.459 restores **Mirror facegroup propagation only**.
- `applyMirror()` now copies each source facegroup to each mirrored descendant face.
- Facegroups viewport source evaluation now applies the object's current Mirror settings before generating colours, for active and inactive editable bodies.
- SubD facegroup propagation remains intentionally deferred to the next isolated build.
- No modelling interaction/tool ownership changes.
- Sentinel: grouped OBJ + Mirror X/Y/Z shows matching colours on original and mirrored faces; no dark first activation; Inset/Bevel/Extrude/navigation remain healthy.

## Current recovery checkpoint — v0.36.18.458

- v0.36.18.457 historical two-frame first-activation fix was hands-on FAIL in the recovered runtime: initial Facegroups view could still be dark until Reseed.
- v0.36.18.458 replaces timing-only recovery with a pending-state retry at the actual body lifecycle.
- If applyFaceGroupColours cannot yet match viewport geometry to the authoritative editable mesh, the body remains on normal material and is marked boxlabFacegroupPending.
- Pending active/inactive bodies retry for up to 8 animation frames; newly created active bodies also retry from the Group.add hook.
- Successful colour application clears the pending flag and applies the Facegroups material immediately.
- No topology, OBJ data, facegroup IDs or modelling/navigation code changes.
- Sentinel: first Facegroups activation must show colours with no Reseed; if it cannot colour immediately it must remain normal material rather than dark; modelling sentinels remain healthy.

## Current recovery checkpoint — v0.36.18.457

- v0.36.18.456 restored the actual Facegroup data connection and Split objects by groups import option.
- v0.36.18.457 restores the historical first-activation lifecycle fix.
- Root cause: the first Facegroups render pass can occur before viewport body geometry and editable mesh are synchronised. Assigning a vertex-colour material before a valid colour attribute exists produces a dark/near-black mesh.
- Fix: only assign the Facegroups material after applyFaceGroupColours succeeds; otherwise keep the normal front material and mark the body pending. Entering Facegroups now rebuilds, waits two animation frames, then reapplies colours after the viewport settles.
- No topology, facegroup IDs, OBJ handoff or modelling/navigation code changes.
- Sentinel: first tap into Facegroups must immediately show colours with no Reseed; switching away/back must also work; Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain healthy.

## Current recovery checkpoint — v0.36.18.456

- v0.36.18.455 Facegroup colour controls passed hands-on testing.
- User identified two missing functional links: known facegrouped OBJ data did not colour in Facegroups mode, and the historical **Split objects by groups** import option was absent.
- v0.36.18.456 restores only those links:
  - File > Import checkbox splitImportGroups, OFF by default, passed to parseEditableOBJ with splitByGroups.
  - Facegroups viewport source lookup now reads the active editable mesh from __boxlabBridgeState.mesh and inactive object meshes from __boxlabObjectManager.objects.
- This does not restore Mirror/SubD facegroup propagation yet and does not change modelling topology.
- .452 remains rejected; render changes must remain additive.
- Sentinel: grouped OBJ imports as one object by default and shows distinct Facegroups colours; Split checkbox imports groups separately; Studio switching, Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain healthy.

## Current recovery checkpoint — v0.36.18.455

- v0.36.18.454 additive Facegroups viewport integration was hands-on PASS: load, Studio/Facegroups switching, navigation and modelling sentinels remained healthy.
- v0.36.18.455 adds only contextual Facegroup colour controls: Default/Soft/Vivid/Contrast palettes, saturation, lightness, ungrouped colour, reseed and reset, persisted in localStorage.
- The controls are visual-only. Do not alter facegroup IDs, mesh topology, OBJ import/export, Inset, Bevel or the protected interaction runtime.
- v0.36.18.452 remains REJECTED: its wholesale render-modes integration failed to load. Future render work must remain additive against the proven runtime.
- Sentinel after .455: load; Studio → Facegroups → Studio; palette/slider/reseed/reset; Inset; Edge Bevel; Vertex Bevel; Extrude; orbit/pan/zoom.

## Audit replay lane — Beta 4 forward

### Replay checkpoint v0.36.18.442

- Replayed original .442 Mesh Health boundary diagnostics exactly from `cd3bc0ad6b5da3298b1b3e9d408e49c03c2f4a71`.
- Active runtime/tests match historical .442 exactly.
- Sentinel status entering this step: Inset confirmed working on .441.
- Next action: hands-on Inset plus boundary/non-manifold selection handoff check on .442 before replaying .443.

### Replay checkpoint v0.36.18.441

- Replayed original .441 Mesh Health Auto Close / Make Watertight exactly from `d4e964e3741d7e53ac0176c1a811b05ea3edb727`.
- Active runtime/tests match historical .441 exactly.
- Sentinel status entering this step: Inset confirmed working on .440.
- Next action: hands-on Inset plus Auto Close check on .441 before replaying .442.

### Replay checkpoint v0.36.18.440

- Replayed original .440 Mesh Health Safe Repair exactly from `73e6958874de73d8e553f0bb2ad73cd31c503004`.
- Active runtime/tests match historical .440 exactly.
- Sentinel status entering this step: Inset confirmed working on .439.
- Next action: hands-on Inset plus Safe Repair check on .440 before replaying .441.

### Replay checkpoint v0.36.18.439

- Replayed original .439 Mesh Health / Inspect foundation exactly from `60187e2f17c444c319c6862a80e3a107588dc9cb`.
- Active runtime/tests match historical .439 exactly.
- Sentinel status entering this step: Inset confirmed working on .438.
- Next action: hands-on Inset plus Mesh Health inspection check on .439 before replaying .440.

### Replay checkpoint v0.36.18.438

- Replayed original .438 linked-instance Insert Tool exactly from `3483edd3b8809b38fca738ed8e6f3085bb2e26f6`.
- Active runtime/tests match historical .438 exactly.
- Sentinel status entering this step: Inset confirmed working on .437.
- Next action: hands-on Inset plus Insert Tool check on .438 before replaying .439.

### Replay checkpoint v0.36.18.437

- Replayed original .437 face-to-face Surface Transform anchoring exactly from `5a6ef4338c2997b5e65dbf59f77bc129d7e152cd`.
- Active runtime/tests match historical .437 exactly.
- Sentinel status entering this step: Inset confirmed working on .436.
- Next action: hands-on Inset plus face-to-face Surface Transform check on .437 before replaying .438.

### Replay checkpoint v0.36.18.436

- Replayed original .436 Surface Transform Tool foundation exactly from `db817eb623ebc52ff2d7b6e344f2911873ead8d6`.
- Active runtime/tests match historical .436 exactly.
- Sentinel status entering this step: Inset confirmed working on .435.
- Next action: hands-on Inset plus Surface Transform interaction check on .436 before replaying .437.

### Replay checkpoint v0.36.18.435

- Replayed original .435 Symmetry Align to Face + Flip Plane exactly from `6bf2b5a5308d639c0e03f7cd2862695d10624591`.
- Active runtime/tests match historical .435 exactly.
- Sentinel status entering this step: Inset confirmed working on .434.
- Next action: hands-on Inset plus Align to Face / Flip Plane check on .435 before replaying .436.

### Replay checkpoint v0.36.18.434

- Replayed original .434 Symmetry plane transform ownership + arbitrary rotation exactly from `6cb0a5aca9d2d69dbed23511ef617d381a1871c6`.
- Active runtime/tests match historical .434 exactly.
- Sentinel status entering this step: Inset confirmed working on .433.
- Next action: hands-on Inset test and Symmetry Rotate ownership check on .434 before replaying .435.

### Replay checkpoint v0.36.18.433

- Replayed original .433 movable/snappable Symmetry/Bisect plane exactly from `ff9be6110c7e34b79fac08e82589b3bd40b66237`.
- Active runtime/tests match historical .433 exactly.
- Sentinel status entering this step: Inset confirmed working on .432.
- Next action: hands-on Inset test and movable/snappable Bisect plane check on .433 before replaying .434.

### Replay checkpoint v0.36.18.432

- Replayed original .432 Face Delete orphan-compaction fix exactly from `31e2c4d0c727f1910543d10d723a4fcedda72e77`.
- Active runtime/tests match historical .432 exactly.
- Sentinel status entering this step: Inset confirmed working on .431.
- Next action: hands-on Inset test on .432 before replaying .433.

### Replay checkpoint v0.36.18.431

- Replayed original .431 Mirror-seam-aware Solidify fix exactly from `b3b63b00c505827f74a00175e2d18770a1aeeb55`.
- Active runtime/tests match historical .431 exactly.
- Sentinel status entering this step: Inset confirmed working on .430.
- Next action: hands-on Inset test on .431 before replaying .432.

### Replay checkpoint v0.36.18.430

- Replayed original .430 Mirror-preserving Solidify fix exactly from `4a393fa0021d196c9921cf978fd029f109035ce9`.
- Active runtime/tests match historical .430 exactly.
- Sentinel status entering this step: Inset confirmed working on .429.
- Next action: hands-on Inset test on .430 before replaying .431.

### Replay checkpoint v0.36.18.429

- Replayed original .429 mirrored-object Solidify fix exactly from `70831c5a24d975417c81adb16d6e56a76d4191cc`.
- Active runtime/tests match historical .429 exactly.
- Sentinel status entering this step: Inset confirmed working on .428.
- Next action: hands-on Inset test on .429 before replaying .430.

### Replay checkpoint v0.36.18.428

- Replayed the original .428 Symmetry / Bisect foundation exactly from historical commit `72a30c2f5799d048235684e326da8fdf3a71fa2c`.
- Active runtime/tests match historical .428 exactly.
- Sentinel status entering this step: Inset confirmed working on .427 by hands-on test.
- Next action: hands-on Inset test on .428 before any .429 replay.


- Active development has been deliberately reset to the exact frozen Beta 4 v0.36.18.427 runtime/test tree for regression isolation.
- Source checkpoint: freeze commit `2743d9d0e10f8fb9605e1e37ab92f0c53c636837` / source tree from v0.36.18.427.
- Goal: replay historical builds .428 → .449 one release at a time and hands-on test Face Inset after each step.
- Stop immediately at the first build where Inset fails; inspect only that build's delta.
- Frozen `/beta-4/` remains immutable and available as a permanent reference.
- Later good work (including Mesh Health .439-.443, export/facegroups .444-.448, viewport .449) is to be replayed from original history rather than rewritten.

# BoxLab — AI Development Handoff

## Read this first

This is the **current-state handoff**, not the historical archive.

Before changing code:
1. read `AI_WORKFLOW.md`
2. read this file completely
3. read `TEST_CHECKLIST.md`
4. read the newest relevant entries in `DEV_HISTORY.md`
5. inspect current `main`
6. read `ROADMAP.md` before choosing the next build

The repository is authoritative. `DEV_HISTORY.md` holds chronology; keep this file concise and current.

## Project

- Repository: `CrisBezz/BoxLab`
- Production branch: `main`
- Live app: https://crisbezz.github.io/BoxLab/
- Frozen Beta 2: https://crisbezz.github.io/BoxLab/beta-2/
- Frozen Beta 3: https://crisbezz.github.io/BoxLab/beta-3/
- Frozen Beta 4: https://crisbezz.github.io/BoxLab/beta-4/
- Product: **iPad-first touch/Pencil polygon modeller and Nomad Sculpt companion**
- Core principle: **Import → Clean → Model → Export → Nomad Sculpt**
- Product rule: stay direct, shallow and topology-aware; do not become Blender-on-iPad.

## Authoritative current state

Audited from the recovery branch on 2026-09-25.

- Current live version / branch target: **v0.36.18.449 — restored hands-on-good baseline**
- Pre-recovery main HEAD: **d7b32672f1757dfbef80f5eb5f364ed1dcfc41ea**
- Recovery source commit: **v0.36.18.449 / `4d700dc26e8a23a65a4fba27bcca259062c5be07`**
- Recovery release: **PR #154 / squash `83fd257442d21d7db64385c0084d1cb314fae017`**
- Recovery regression: **36112631181 PASS** (original `.449` regression was **35974096070 PASS**)
- Frozen release checkpoint: **Beta 4 = v0.36.18.427**
- Beta 4 frozen source commit: **ec45b3ba208ef3ffa40015d7a3b62666c63f379e**
- Beta 4 freeze PR: **#113**
- Beta 4 freeze merge: **2743d9d0e10f8fb9605e1e37ab92f0c53c636837**
- Beta 4 frozen regression: **35713131703 PASS**
- `/beta-4/` is immutable during normal development.

### Phase status

- Phase A — Clean for SubD: **frozen except concrete regressions**
- Phase B — Precision modelling: **planned slice complete**
- Phase C — Object / instance workflow: **mature baseline reached**
- Phase D — Construction tools: **mature current slice**
- Phase E — Import / repair / handoff: **active**
- Phase F — iPad UX polish: **continuous as real issues surface**

## Current development

### Recovery to v0.36.18.449 — deliberate stability reset

- User elected to abandon the accumulated .450–.465 interaction-repair line and return to the last broadly hands-on-good baseline.
- Runtime and regression-test files are restored exactly to main commit `4d700dc26e8a23a65a4fba27bcca259062c5be07` (v0.36.18.449).
- The recovery is forward-moving Git history: later commits remain available for reference; history is not rewritten.
- Living documentation remains current and records lessons from .450–.465.
- Post-.449 UI/runtime wrappers and their tests are removed from the active recovery branch.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- **Next development rule:** rebuild the desired UI/UX cleanup from .449 in very small, independently hands-on-tested slices. Do not reintroduce the .450 bulk cleanup wholesale.
- First hands-on target after deployment: confirm the .449 baseline (navigation, Face Inset/Extrude/Through, Edge/Vertex Bevel, Boolean one-step Undo, Edge Revolve) before starting any new UI slice.


### v0.36.18.465 — Live Inset Face Region API repair

**Released on main via PR #153; squash merge `d7b32672f1757dfbef80f5eb5f364ed1dcfc41ea`. Final regression `36105980083` passed.**

- User confirmed v0.36.18.464: ordinary Extrude and Extrude Through both work; Inset remains inert.
- Root cause is now fully isolated to the live mesh prototype:
  - `uniform-inset.js` successfully installs the Inset methods on `mesh.js?v=0.12`;
  - but those methods depend on `faceRegionInfo()`, `faceRegionNormal()`, and `faceRegionsInfo()`;
  - `loose-bootstrap.js` only installed those Face Region methods on the other EditableMesh module identity.
- `uniform-inset.js` now copies only the three Face Region geometry methods onto the live EditableMesh prototype before copying the Uniform Inset methods.
- The full `installFaceRegion()` installer is deliberately NOT rerun because it also registers legacy UI/event handlers and would duplicate interaction ownership.
- Confirmed-good Extrude, Through, the .242 Through kernel/controller, and protected transforms are untouched.


### v0.36.18.464 — Public version + explicit Through runtime

**Released on main via PR #152; squash merge `f7a092b82addc517a53ec1990324fdb0b66a00e3`. Final regression `36094996497` passed.**

- Fixes the release-identification problem where production remained visibly stamped v0.36.18.461 despite later hotfixes.
- `index.html` and `version.json` now both identify v0.36.18.464.
- Current live runtime cache keys are aligned to .464 while protected historical modelling pins remain intact.
- `sequential-through-fallback.js` is loaded explicitly in the main runtime immediately after the proven Face direct controller, rather than depending only on the later dynamic Drawer import.
- The cavity-aware `through-kernel.js?v=0.36.18.242` solver remains untouched.
- The live Uniform Inset prototype repair remains active and cache-busted in .464.


### v0.36.18.464 — Public version sync + explicit Through runtime

**Released on main via PR #152; squash merge `f7a092b82addc517a53ec1990324fdb0b66a00e3`. Final regression `36094996497` passed.**

- Corrects the release ambiguity where merged hotfixes still presented publicly as v0.36.18.461.
- Shell, version manifest and current live runtime cache chain now identify v0.36.18.464.
- Loads `sequential-through-fallback.js` explicitly after the proven `multi-face-direct.js?v=0.36.18.242` controller, instead of relying only on the later dynamic drawer import.
- Keeps the protected cavity-aware `through-kernel.js?v=0.36.18.242` unchanged.
- Retains the v0.36.18.463 live Uniform Inset prototype repair.
- No Extrude/Through topology solver rewrite.


### v0.36.18.463 — Live Uniform Inset prototype repair

**Released on main via PR #151; squash merge `d8af8ac6c140c15ea83122baa16164d1905b0c88`. Final regression `36086343100` passed.**

- User confirmed Extrude is restored and working in both post-arm and preselected-face workflows.
- Inset still selected/captured correctly but produced no geometry.
- Root cause: `uniform-inset.js` patched the unversioned `./mesh.js` class, while the live app uses the distinct ES-module identity `./mesh.js?v=0.12`.
- The live mesh therefore did not have `insetFaceRegions()`; the direct Face controller's optional call returned `undefined` and preview stayed empty.
- `uniform-inset.js` now installs `insetFaceRegion`, `insetFaceRegions`, and `insetFace` onto the live versioned EditableMesh class as well.
- A cache-busted live uniform-Inset module is loaded before the proven `multi-face-direct.js?v=0.36.18.242` controller.
- Extrude/Through controller and geometry are untouched.


### v0.36.18.462 — Restore proven Face direct path; isolate Inset selection

- User confirmed .461 broke Extrude as well as Inset.
- Reverted `multi-face-direct.js` to the proven .242 controller used when Extrude/Through was confirmed working.
- Removed the .461 self-pick Face-controller change.
- Face paint selection is again allowed while Extrude/Inset is armed.
- Intended interaction:
  - no selection: first Pencil tap selects/highlights the face;
  - selected face: next drag is captured by the proven Face direct controller;
  - preselected face: first drag after arming goes directly to Extrude/Inset.
- Legacy Move remains blocked while Face direct tools are armed.
- Bevel ownership is unchanged in this build.


### v0.36.18.461 — Direct tools own pick + drag

**Released on main via PR #149; squash merge `a3c1fa4200da58dd01a1f54b337ae32053a3e341`. Final PR regression run `36068948326` passed.**

- User confirmed .460 stopped legacy Move, but Inset and Bevel still did not perform.
- Root cause: armed direct tools still depended on separate paint-selection ownership. The paint selector could consume the first Pencil press before the modelling controller received the gesture.
- Face direct tools now hit-test and acquire the face themselves on the same pointerdown that begins Inset/Extrude.
- While Face direct tools or Edge Bevel are armed, component paint selection yields to those self-picking controllers.
- The .460 coordination shim is removed from the live runtime.
- Legacy `main.js` Move still yields while these direct tools are armed.
- Through and Bevel topology solvers are otherwise unchanged.


### v0.36.18.460 — Direct tool ownership repair

**Released on main via PR #148; squash merge `d66425309248f220968cf11d86a0d6d8bc7ee9e0`. Final PR regression run `36067498993` passed.**

- User confirmed Inset still cannot acquire a face after arming; preselecting a face then arming Inset falls through to legacy Move. Edge Bevel can acquire edges but may reject the additive set as non-bevellable.
- Mature `multi-face-direct.js?v=0.36.18.242` and `direct-bevel.js?v=0.36.18.253` are preserved unchanged.
- Legacy `main.js` component drag now yields whenever mature Face direct tools or Edge Bevel are visibly armed.
- Added `direct-tool-ownership-460.js` as a coordination-only layer:
  - re-enables hidden component selection after arming Extrude/Inset;
  - reduces only an invalid additive Bevel set to the edge actually touched before the mature Bevel controller handles the gesture.
- No Inset/Bevel topology, Through, UI layout or navigation changes.


### v0.36.18.459 — Restore armed-tool component selection

**Released on main via PR #147; squash merge `6ca71fc6142060498a46e73acac0b9b7d7a9a044`. Final PR regression run `36065555151` passed.**

- User confirmed navigation and ordinary component selection work; failure occurs only after arming a direct tool.
- Root cause traced to the .457 component paint guard: `directToolActive()` prevented Face/Edge/Vertex selection whenever Inset/Extrude/Bevel/etc. was armed.
- Restored the proven pre-UI selector behaviour from .449: Pencil can still select/highlight components while a direct tool is armed.
- Retained the .457 iPad navigation protection: finger/touch remains reserved for viewport navigation.
- Removed the .458 `persistent-face-tool-select.js` loader because the known-good .449 runtime did not use that architecture.
- No topology, Through, navigation or UI layout changes.


### v0.36.18.458 — Restore armed Face selection handoff

**Released on main via PR #146; squash merge `ad62458c55ec6a5c3bf02f32e389093889874325`. Final PR regression run `36062528604` passed.**

- User confirmed viewport navigation and ordinary component selection are working; failure occurs only after arming a direct tool such as Inset.
- Root cause: `persistent-face-tool-select.js` existed in the repo but was not loaded by `index.html`.
- That module is the explicit handoff for the tool-first workflow: arm Extrude/Inset, then Pencil-select a face, then let `multi-face-direct.js` own the drag.
- Restored the handoff loader immediately before `multi-face-direct.js`.
- No UI layout, topology, Through, transform or navigation changes.


### v0.36.18.457 — Viewport pointer ownership repair

**Released on main via PR #145; squash merge `b4ce2101bc749193a4f03934889efbf8500ceb5f`. Final PR regression run `35998556661` passed.**

- User confirmed the redesigned UI is good; the remaining failure is that viewport interaction is dead.
- Root cause found in shared component Multi plumbing: component Multi is intentionally enabled by default, while `edge-paint-select.js` could capture the first touch pointer over selectable geometry before OrbitControls or direct tools received it.
- Finger/touch is now reserved for viewport navigation in component paint selection.
- Component paint selection yields to armed direct modelling tools, including Face Extrude/Inset, Edge/Vertex Bevel and Revolve.
- Current .456 UI/UX is otherwise preserved.
- Edge Revolve remains available as a compact launcher, while Lathe/Revolve axis/segment settings remain hidden until Revolve is actually armed.
- No topology solver changes.


### v0.36.18.456 — Preserve new UI, repair underlying tool ownership

**Released on main via PR #144; squash merge `6e93491e841991631fc09b79cf0c9f7d53faa9e7`. Final PR regression run `35996984651` passed.**

- User clarified the new UI/UX itself is correct and should not be rolled back; the regression is that multiple modelling tools stopped responding after the UI reordering.
- Current .455 presentation is preserved: compact five-button Object Selection, Tool Session visibility rules and Boolean launcher remain.
- Restored `transform-upgrade.js` from the pre-reorder .449 runtime so the proven transform ownership path sits underneath the new UI.
- Restored `edge-paint-select.js` from the pre-reorder runtime so component selection no longer uses the later global ownership interception.
- Restored the .452 transactional Boolean pre-scene snapshot so Boolean returns to one-step Undo without changing Boolean geometry or the new launcher UI.
- Direct Face/Edge/Vertex modelling cores, Through topology, Revolve controller, protected multi-object transform and new UI presentation remain untouched.
- Hands-on validation should focus on the previously failed tools while confirming the current UI looks identical to .455.


### v0.36.18.455 — Object Multi + Boolean presentation recovery

**Released on main via PR #143; squash merge `3ec6d638b08a437480d9be9efb232f4f3783b596`. Final PR regression run `35995205443` passed.**

- User clarified that Boolean geometry works; the problem is the workflow/presentation around selecting operands.
- Keeps the v0.36.18.454 global iPad interaction ownership recovery intact.
- Restores Object Selection to the established compact five-button strip so Multi / All / Hide / Lock / Clear stay inside one consistent Selection UI.
- Restores the narrow Boolean launcher/close wrapper so Union / Cut / Intersect are hidden until Boolean is opened.
- The broad .451 Face/Edge/Vertex presentation wrapper remains disabled.
- Shared Tool Session hidden-shell protection from .454 remains intact.
- No modelling topology or protected multi-object transform behaviour is changed.
- Hands-on target: Object Multi stays compact; Active Tools stays clean; Boolean opens from one button and closes after operation.


### v0.36.18.454 — iPad interaction ownership recovery

**Released on main via PR #141; squash merge `9cecc658ab40c9a4f8f6e286453cdb8045835e98`. Final PR regression run `35994630718` passed.**

- Hands-on .453 report: Inset, Edge Bevel, Vertex Bevel, Boolean, Edge Revolve and navigation all still failed.
- Reframed the problem as global interaction ownership rather than six independent tool regressions.
- Finger/touch is now reserved for viewport navigation in component paint selection; paint selection no longer captures the first touch of an OrbitControls gesture.
- Component paint selection explicitly yields to armed direct modelling tools including Face Extrude/Inset, Edge Bevel, Vertex Bevel and Edge Revolve.
- Shared transform gesture handling explicitly yields to all armed direct component tools using authoritative runtime state.
- Symmetry/Bisect, Surface Transform and Insert no longer register global capture-phase pointer listeners while inactive; listeners attach only for the active Tool Session and detach on Apply/Cancel.
- Inactive Tool Session shells are authoritatively hidden with `display:none!important`.
- Boolean core is restored to the frozen Beta 4 one-checkpoint transaction path.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains unchanged.
- Beta 5 remains blocked pending hands-on confirmation of the six regression checks.


### v0.36.18.453 — Restore proven pre-cleanup interaction runtime

**Released on main via PR #140; squash merge `69a4a8b8ab13bb03f8d93d93ee798106f0b6ed18`. Final PR regression run `35991654724` passed.**

- User hands-on report on .452: the affected modelling tools remained unusable; the .450–.452 UI/ownership recovery path was not successful.
- Recovery strategy: return the interaction-sensitive runtime to the last hands-on-good .449 behaviour instead of adding another interception/ownership patch.
- Restored `transform-upgrade.js` and Edge `revolve.js` from the .449 runtime; retained the hands-on-passed .452 Revolve Profile controller and cache-bumped it for .453.
- Removed `boolean-tool-session-ui.js` and `ui-presentation-451.js` from the live loader. Their files remain for history but they no longer participate in runtime interaction.
- Boolean core keeps the .452 transactional pre-scene snapshot fix, but its direct proven UI is exposed again because the Boolean wrapper is no longer loaded.
- Protected `multi-object-transform.js?v=0.36.1.0`, core Face/Bevel controllers, Through topology, main runtime and styles remain untouched.
- This is a deliberate stability recovery. UI consolidation can be reintroduced later only in small independently hands-on-tested slices.
- Beta 5 remains blocked pending hands-on confirmation of Inset, Edge Bevel, Vertex Bevel, Boolean, Edge Revolve and general navigation; Revolve Profile remains on its previously passed controller.

### v0.36.18.452 — Authoritative tool ownership + Boolean one-step Undo

**Released on main via PR #139; squash merge `4e2733d1ac38974265a4da9524239429481b90ea`. Final PR regression run `35988721656` passed.**

- Hands-on .451 retest passed Extrude Through, Revolve Profile and UI presentation, but Inset, Edge Bevel, Vertex Bevel, Boolean Undo and Edge Revolve still failed.
- Root cause for the modelling-tool failures: the transform layer could still begin a Move/Scale/Rotate gesture while a direct component tool was armed. Through survived because its transactional takeover has its own higher-priority path.
- `transform-upgrade.js` now explicitly yields whenever Face Extrude/Inset, Edge Bevel, Vertex Bevel or Edge Revolve owns the interaction.
- Proven modelling controllers remain byte-for-byte unchanged: `multi-face-direct.js?v=0.36.18.242`, `direct-bevel.js?v=0.36.18.253`, and `direct-multi-vertex-bevel.js?v=0.30.1`.
- Edge Revolve now exposes an authoritative `arm()` API; the clean launcher calls that directly instead of synthesising a click on hidden controls.
- Boolean Undo is converted from pre-mutation `checkpoint()` to the transactional scene pattern: capture exact pre-Boolean scene, perform the Boolean, then store that scene once with `checkpointSnapshot(beforeScene)` after successful result creation.
- This is a concrete regression fix, so `boolean-prototype.js` intentionally advances from the previously protected .369 pin to .452.
- Beta 5 remains blocked until hands-on confirms these five regressions.

### v0.36.18.451 — Cross-mode UI regression recovery

**Released on main via PR #138; squash merge `b4ad4077d6813df50699fb53dccd11252809d5b5`. Final PR regression run `35984043420` passed.**

- .450 hands-on testing found that the UI cleanup was too invasive: Boolean lost expected one-step Undo, Revolve Profile launch/cancel UX was incomplete, and Face/Edge/Vertex tool arming appeared broken across Inset / Through / Bevel workflows.
- Source audit confirmed the proven modelling controllers for Face Inset/Extrude/Through, Edge Bevel and Vertex Bevel were unchanged from the working .449 baseline.
- Restores the proven .449 shared Tool Session implementation rather than changing topology/model algorithms.
- Adds a late-loaded **presentation-only** UI wrapper that changes visibility after tool state changes but never calls `preventDefault`, never owns pointer events, and never mutates selection.
- Face exact controls are hidden at rest and relabel to **Extrude Exact** or **Inset Exact** only while that direct tool is armed.
- Edge Bevel / Edge Slide / Offset / Loop settings are contextual. Lathe/Revolve is a single launcher at rest; axis/segments/Apply/Cancel appear only while active.
- Vertex Slide and Vertex Bevel settings are contextual without changing their established arming controllers.
- Boolean keeps the protected `boolean-prototype.js?v=0.36.18.369` solver/history path and uses a presentation-only show/hide launcher; the wrapper adds no history operation.
- Revolve Profile is now directly launchable from Active Tools without first using Object > Add, and has **Cancel** which restores the pre-tool scene/history depth.
- Strong cavity-aware Extrude Through remains the required baseline; there is no intended reduction in supported Through behaviour.
- Beta 5 remains blocked until this recovery receives a hands-on pass.

### v0.36.18.450 — Tool-first UI/UX consolidation

**Released on main via PR #137; squash merge `d77ec35968d0f59a75747c7be573a3fc3d33bc8c`. Final regression run `35976396864` passed.**

- Begins the dedicated pre-Beta-5 UI/UX cleanup without changing modelling algorithms.
- Establishes the UI rule: **mode home shows tool buttons only; tool settings are visible only while that tool is active**.
- Fixes the shared Tool Session visibility bug where `.boxlab-tool-session-shell { display:flex }` could override `hidden=true` and expose inactive Object/Face session panels.
- Object Tool Sessions such as Symmetry/Bisect, Transform, Insert, Mesh Health, Array, Revolve Profile and Sweep now remain visually hidden until activated by their launcher/workflow.
- Face Shell settings remain hidden until Shell is launched.
- Vertex Slide exact controls/readout remain hidden until Slide is armed.
- Vertex Bevel Width + Exact controls/readout remain hidden until Bevel is armed.
- Boolean is migrated from an always-open operation block to a single **Boolean** launcher that opens a Tool Session containing Union / Cut / Intersect and Close.
- Protected modelling/navigation runtimes remain unchanged: `main.js?v=0.36.18.366`, `multi-object.js?v=0.36.18.367`, `multi-object-transform.js?v=0.36.1.0`, and `styles.css?v=0.36.18.270`.
- Next step after hands-on UI pass: freeze **Beta 5** for wider testing.

### v0.36.18.449 — Scrollable Viewport menu

**Released on main via PR #136; squash merge `df6f10db0df4fb6b8bdcc9af4367db9bf9c9827c`. Final regression run `35974096070` passed.**

- Fixes Viewport settings overflowing off-screen on iPad now that Facegroup colour controls increased menu height.
- Viewport panel now has a viewport-relative maximum height and vertical scrolling.
- Adds iPad-friendly inertial scrolling, contained overscroll and vertical pan touch handling.
- Keeps the Viewport button and floating-panel placement unchanged.
- No modelling, facegroup, export, selection or navigation behaviour is changed.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.448 — Facegroups first-activation fix

**Released on main via PR #135; squash merge `7c8eb0c1c36fe0bc8a69397390771043c0aefe20`. Final regression run `35970042762` passed.**

- Fixes a hands-on regression where entering Viewport > Facegroups could initially show the mesh nearly black until a palette button was pressed.
- Root cause: the first render-mode pass could occur before evaluated mesh/body geometry were fully synchronised; the vertex-colour material was still being assigned even when colour application failed.
- Facegroup material is now assigned only when the colour attribute is successfully generated.
- Entering Facegroups normalises the current viewport colour preferences, forces a clean viewport rebuild, then reapplies colours after the viewport settles.
- Failed first-pass colour application now falls back to the normal front material instead of rendering a dark/invalid vertex-colour state.
- No facegroup IDs, mesh topology, OBJ handoff data, or protected modelling/navigation runtimes are changed.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.447 — Facegroup colour controls

**Released on main via PR #134; squash merge `cfd8e9e64f84e8a3f5b19dfb0dd5de3f421a0bf3`. Final regression run `35955642406` passed.**

- Extends Viewport > Facegroups with contextual colour controls shown only while the Facegroups Render Look is active.
- Adds palette presets: **Default, Soft, Vivid, High Contrast**.
- Adds Saturation and Lightness controls.
- Adds a user-selectable **Ungrouped** face colour.
- Adds **Reseed Colours** to change deterministic group colour assignment without changing group IDs.
- Adds **Reset** to restore the default palette, saturation, lightness, seed and ungrouped colour.
- Preferences persist in browser local storage as viewport-only settings.
- No mesh topology, facegroup IDs, OBJ import/export data, or protected modelling/navigation runtimes are changed.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.446 — Viewport Facegroup Colours

**Released on main via PR #133; squash merge `fcd19de9f38bfca2d65a1de643387a64e03ab318`. Final regression run `35950814715` passed.**

- Adds **Facegroups** as a Viewport > Render Look option.
- Uses preserved `EditableMesh.faceGroups[]` metadata from .445; no mesh/export data is changed by the display mode.
- Each facegroup gets a stable deterministic colour from its group name.
- Ungrouped faces display in neutral grey.
- Facegroup colours are lighting-aware through a MeshStandardMaterial rather than a flat debug overlay.
- Active and inactive scene objects both use the evaluated display mesh, so Mirror/SubD inherited facegroups display correctly.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.445 — OBJ facegroup preservation foundation

**Released on main via PR #132; squash merge `66e9e6e00d7734a0c5f0df28b1f8413bd6a220b9`. Final regression run `35949682949` passed.**

- Corrects editable OBJ semantics so `o` defines BoxLab object boundaries while `g` is preserved as per-face facegroup metadata inside that object.
- Adds `EditableMesh.faceGroups[]`, aligned one-to-one with `faces[]`; clone and common face-topology methods preserve or inherit it.
- Editable OBJ import now keeps one OBJ object as one BoxLab object by default even when it contains many groups.
- Adds **Split objects by groups** in File > Import, OFF by default. When enabled, OBJ groups are deliberately split into separate BoxLab objects.
- OBJ export writes preserved facegroups back as `g` records within each `o` object instead of using `g` as a duplicate object record.
- Obvious descendants inherit parent facegroups through Extrude, Inset, face split, Triangulate, Mirror and SubD.
- Safe Repair preserves surviving facegroups; Auto Close creates new cap faces as ungrouped.
- Object transforms / linked-instance placement preserve facegroups through the existing mesh clone path.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.444 — OBJ export polish / topology preflight

**Released on main via PR #131; squash merge `b9e16eaedad2044c8ce031bc8ae56f7ee736de4f`. Final regression run `35934485708` passed.**

- Keeps the existing multi-object scene OBJ exporter as the authoritative export path.
- Adds an export-core preflight that resolves the exact mesh being written, including Mirror and optional SubD evaluation.
- Every exported object is audited with Mesh Health before serialization.
- OBJ output now embeds compact per-object health comments: Closed/Open/Issues, boundary count, non-manifold count, winding count, and triangle/quad/ngon mix.
- Export header includes a scene preflight summary with counts of closed-clean, open-clean, and issue-bearing objects.
- OBJ now writes both `o` and `g` records for each BoxLab object to improve handoff grouping in downstream apps.
- Export remains permissive: open/problem meshes are reported, not silently blocked.
- Status bar reports the export preflight immediately after download.
- Reference objects remain excluded exactly as before.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.443 — Mesh Health normals / triangulation controls

**Released on main via PR #130; squash merge `1313089ed7c445ac03124ad2a71f7185eb89afee`. Final regression run `35933890155` passed.**

- Adds explicit Object-level normals and triangulation preparation controls inside Mesh Health.
- **Unify Winding** propagates consistent face orientation across manifold connected faces without guessing outward vs inward.
- **Flip Normals** deliberately reverses every face in the active mesh.
- **Triangulate** converts polygon faces to triangles using projected ear-clipping rather than naive fan splitting, including concave n-gons.
- Unify Winding refuses invalid/non-manifold ambiguity and validates zero inconsistent winding before commit.
- Triangulate preserves vertices and validates that invalid/non-manifold/boundary counts do not worsen.
- Each operation is transactional and records one Object Undo step; Mesh Health refreshes immediately afterward.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.442 — Mesh Health boundary diagnostics

**Released on main via PR #129; squash merge `cd3bc0ad6b5da3298b1b3e9d408e49c03c2f4a71`. Final regression run `35929633430` passed.**

- Extends Mesh Health with stronger boundary diagnostics rather than another automatic repair.
- Boundary edges are grouped into connected components and classified as **loop**, **chain**, **branched**, or other.
- Mesh Health shows the number of boundary groups plus loop/chain/branched counts.
- **Select Boundary** exits Mesh Health into normal Edge mode with all boundary edges selected.
- **Select Non-Manifold** does the same for non-manifold edges.
- Diagnostic selection deliberately hands control back to the mature native modelling tools instead of inventing a separate viewport overlay/highlight system.
- No geometry mutation occurs during diagnostic selection.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.441 — Mesh Health Auto Close / Make Watertight foundation

**Released on main via PR #128; squash merge `d4e964e3741d7e53ac0176c1a811b05ea3edb727`. Final regression run `35928602689` passed.**

- Extends Mesh Health with conservative **Auto Close** for otherwise-clean open meshes.
- Reuses the existing Boundary / Fill rules: boundary components must be simple closed loops and cap winding is oriented opposite the neighbouring face along the shared boundary.
- Auto Close is enabled only for **Open · Clean** meshes whose entire boundary graph resolves into one or more simple loops.
- All simple boundary loops are capped in one transaction; multiple disjoint holes can be closed together.
- Branched/open boundary graphs, non-manifold input, duplicate/degenerate/winding issues, and other ambiguous topology are refused rather than guessed.
- Candidate topology must re-audit as **Closed · Clean** with zero boundary/non-manifold/winding issues before commit.
- Successful Auto Close is one Object Undo step and Mesh Health immediately refreshes to show the watertight result.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.440 — Mesh Health Safe Repair

**Released on main via PR #127; squash merge `73e6958874de73d8e553f0bb2ad73cd31c503004`. Final regression run `35858042579` passed.**

- Extends the .439 Mesh Health inspector with a deliberately conservative **Safe Repair** action.
- Safe Repair currently fixes only high-confidence topology defects: exact same-direction duplicate faces, zero-area faces, and accidental orphan vertices.
- Opposite-winding coincident faces are left untouched because they can represent ambiguous double-sided/shell intent.
- Holes, non-manifold structures, boundary reconstruction, and broad winding repair remain diagnostic-only for now.
- Repair runs on a cloned candidate first and is refused if invalid/non-manifold/winding issue counts worsen or the overall issue load does not improve.
- Apply is transactional through Object scene history and becomes one Undo step.
- Linked instances keep the existing shared-geometry / independent-placement contract because Object save-back remains authoritative.
- Mesh Health immediately re-runs after repair so unresolved findings remain visible.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.439 — Mesh Health / Inspect foundation

**Released on main via PR #126; squash merge `60187e2f17c444c319c6862a80e3a107588dc9cb`. Final regression run `35854298290` passed.**

- Starts Phase E Import / Repair / Handoff with a non-destructive Object-mode **Mesh Health** Tool Session.
- Reports verts/faces/edges plus triangle/quad/ngon mix.
- Distinguishes **Closed · Clean**, **Open · Clean**, and **Issues Found** rather than treating every open mesh as broken.
- Detects boundary edges, non-manifold edges, invalid/degenerate faces, zero-area faces, duplicate faces, inconsistent winding, orphan vertices, and intentional loose geometry.
- Refresh reruns the audit without changing geometry; Close exits cleanly.
- Uses the existing topology seam-conformance summary as the base rather than inventing a parallel topology definition.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.438 — linked-instance Insert Tool foundation

**Released on main via PR #125; squash merge `3483edd3b8809b38fca738ed8e6f3085bb2e26f6`. Final regression run `35843005403` passed.**

- Adds Nomad-inspired **Insert** beside Transform in Object Active Tools.
- Workflow: choose a source face on the selected editable object, then choose a target face on another visible object.
- The target pick creates a **Linked Duplicate**, not an independent copy: geometry stays shared through the existing sourceId/instanceMatrix architecture.
- The inserted source face lands face-to-face on the target using the same `surface-transform-core.js` placement engine as Transform.
- After placement, Pencil/mouse keeps the established Move → Rotate → Scale → Move tap-cycle; touch remains ordinary navigation.
- Move slides on the target surface plane, Rotate spins about the target normal, and Scale acts about the placement point.
- Cancel restores the exact pre-tool Object scene, including removing the inserted linked instance; Apply records one Object Undo step.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Beta 4 remains frozen at v0.36.18.427.


### v0.36.18.437 — Surface Transform face-to-face anchoring

**Released on main via PR #124; squash merge `5a6ef4338c2997b5e65dbf59f77bc129d7e152cd`. Final regression run `35841565536` passed.**

- Corrects .436 centre-of-mass placement after hands-on testing.
- Transform now uses a two-face workflow: first tap source face on selected object, second tap target face on another visible object.
- Source face centre is the placement anchor.
- Source face normal aligns opposite the target face normal for true face-to-face contact.
- Existing Move / Rotate / Scale tap-cycle is preserved exactly after placement.
- `surface-transform-core.js` now supports sourceAnchor/sourceNormal + oppose mode, keeping the future Insert Tool on the same placement engine.
- Beta 4 remains frozen at v0.36.18.427.


### v0.36.18.436 — Surface Transform Tool foundation

**Released on main via PR #123; squash merge `db817eb623ebc52ff2d7b6e344f2911873ead8d6`. Final regression run `35839401940` passed.**

- Product direction now includes a Nomad-inspired surface-relative Transform / future Insert workflow rather than separate conventional Align commands.
- New Object-mode Transform Tool: tap a target face on another visible object, selected object centre snaps to the hit and source +Y aligns to that face normal.
- Surface frame persists through Move / Rotate / Scale. Move slides across the target plane; Rotate spins around target normal; Scale works about the placement point.
- Pencil/mouse tap cycles Move → Rotate → Scale → Move. Touch remains protected navigation.
- Existing 15° rotation snap is reused.
- Tool is transactional via pre-launch Object scene capture: Cancel restores exact prior state; Apply checkpoints it as one Object Undo step.
- `surface-transform-core.js` is intentionally reusable by the planned Insert Tool, which should place linked instances through the same controller.
- Linked-instance placement should remain independent via existing Object-mode `instanceMatrix` derivation; shared geometry must stay protected.
- Beta 4 remains frozen at v0.36.18.427.


### v0.36.18.435 — Symmetry Align to Face + Flip Plane

**Released on main via PR #122; squash merge `6bf2b5a5308d639c0e03f7cd2862695d10624591`. Final regression run `35819789567` passed.**

- Adds one-shot Align to Face inside the Symmetry/Bisect Tool Session.
- Pencil/mouse tap on a source face sets plane point to the hit and plane normal to that face normal.
- Touch remains normal navigation while alignment is armed.
- Flip Plane reverses the plane normal in place so Keep +/- direction can be inverted without moving the cut.
- X/Y/Z presets, Move/Rotate plane ownership, snapping and arbitrary-plane Apply remain intact.
- Beta 4 remains frozen at v0.36.18.427.


### v0.36.18.434 — Symmetry plane transform ownership + arbitrary rotation

**Released on main via PR #121; squash merge `6cb0a5aca9d2d69dbed23511ef617d381a1871c6`. Final regression run `35818444568` passed.**

- Fixes .433 hands-on issue where Rotate acted on the source object instead of the yellow symmetry plane.
- While Symmetry / Bisect is active, shared Object transforms yield to the construction plane.
- Move/direct plane drag moves the plane; Rotate changes the plane normal; Scale is disabled during the session.
- X/Y/Z remain quick orientation presets; rotated planes become Custom.
- Existing transform X/Y/Z constraints and 15° rotation snap are reused for plane rotation.
- Core clipping/mirroring now supports arbitrary plane point+normal, so rotated previews and Apply are genuine oblique topology operations.
- Touch remains navigation; Pencil/mouse handles plane transforms.
- Beta 4 remains frozen at v0.36.18.427.


### v0.36.18.433 — Movable / snappable Symmetry plane

**Released on main via PR #120; squash merge `ff9be6110c7e34b79fac08e82589b3bd40b66237`. Final regression run `35812426602` passed.**

- Symmetry/Bisect plane is no longer locked to object origin.
- X/Y/Z plane offset is topology-aware in the core.
- Pencil/mouse drag on the yellow plane moves it along its normal while touch remains normal navigation.
- Geometry Snap targets Vertex, Edge, Midpoint and Face hit positions from active/visible geometry.
- Reset Origin restores offset 0.
- Keep + / Keep − and optional Mirror remain live while the plane moves.
- Mirrored results weld on the moved plane by translating to/from the proven origin-based Mirror engine.
- Face-normal orientation / Align to Selection remains a likely .434 refinement.

## Latest completed work

### v0.36.18.432 — Face Delete orphan compaction

User isolated the recent Solidify failure to Face Delete rather than Mirror.

Root cause:
- deleting three adjacent cube faces left an unused/orphan vertex
- Solidify offset solving iterates every vertex
- the orphan had no incident face normal and caused `zero-vertex-normal`
- Extract/Duplicate worked because that workflow already compacts the mesh

Current fix:
- `EditableMesh.compactUnusedVertices()` removes accidental orphan vertices
- remaps faces and creases
- preserves intentional `looseVertices` / `looseEdges`
- Face Delete runs compaction once after the requested multi-face delete transaction
- exact cube-minus-three-faces → Solidify case is regression-protected

Hands-on status: **PASS from user: “PERFECT!! Finally found the issue.”**

### v0.36.18.431 — Mirror-seam-aware Solidify

Keep this behavior:
- Solidify receives active Mirror axes
- boundary edges lying on an active mirror plane are treated as symmetry seams
- no Solidify side wall is created on the symmetry seam
- inner seam vertices stay pinned to the mirror plane
- validation uses the evaluated mirrored result
- Mirror remains non-destructive and enabled after Apply

This work remains valid even though the user’s original failing test was ultimately caused by Face Delete orphan topology.

### v0.36.18.428 — Symmetry / Bisect foundation

Current implemented foundation:
- Object-mode destructive **Symmetry / Bisect** Tool Session
- fixed object-origin plane
- X / Y / Z axis
- Keep + / Keep −
- optional **Mirror kept half**
- welded centre-plane result through existing Mirror path
- live translucent result preview + visible plane
- Apply = one Object-history step
- Cancel leaves source unchanged
- existing non-destructive Mirror remains separate

## Next intended build

### Beta 5 checkpoint after .451 regression-recovery hands-on pass

1. Hands-on audit Object / Face / Edge / Vertex mode homes for any remaining orphan settings.
2. Fix only concrete UI regressions found in that pass.
3. Freeze the resulting clean main as **Beta 5** for wider user testing.
4. Resume Phase E / Phase F development from live main after the checkpoint.


## Protected interaction behavior

Preserve unless the user explicitly asks to change it:

- one-finger orbit
- two-finger pan
- pinch zoom
- two-finger tap Undo
- three-finger tap Redo
- no-jump orbit pivot
- persistent component selections during navigation
- Studio realtime default
- object management / Multi behavior
- current snapping behavior
- mature Through topology and cavity-aware Through behavior
- connected multi-face Extrude
- established Knife / Loop Cut / Bevel / Inset / Face Extrude behavior
- direct Edge Extrude ribbon workflow
- Tool Session ownership behavior
- transactional topology validation / rollback

## Critical protected files / pins

Do not casually edit:

- `src/multi-object-transform.js?v=0.36.1.0`
  - protected blob SHA: `0b6f676900bf9a3787cf420e276bbb0f57ac46ff`
- `styles.css?v=0.36.18.270` intentionally pinned
- `src/component-multi-init.js?v=0.36.18.314` protects fresh-load additive component Multi
- `src/main.js?v=0.36.18.366` remains the current main runtime pin
- `src/object-management.js?v=0.36.18.392`
- `src/drawer-ui.js?v=0.36.18.361`
- `src/boolean-ux-history.js?v=0.36.18.369`
- `src/boolean-prototype.js?v=0.36.18.369` is regression-protected; UI changes must wrap it rather than repin/rewrite it casually.
- `src/quad-clean.js?v=0.36.18.339`
- no service worker
- avoid broad MutationObservers

Current live wrappers in `index.html` are versioned with the live release:
- `tool-session-ui.js?v=0.36.18.432`
- `solidify.js?v=0.36.18.432`
- `symmetry-bisect.js?v=0.36.18.432`
- `shell.js?v=0.36.18.432`
- `linear-array.js?v=0.36.18.432`
- `revolve.js?v=0.36.18.432`
- `revolve-profile.js?v=0.36.18.432`
- `sweep-path.js?v=0.36.18.432`
- `edge-extrude.js?v=0.36.18.432`
- `transform-upgrade.js?v=0.36.18.432`

Do not assume a wrapper’s cache pin equals the version of its core algorithm; inspect imports before editing.

## Mature Phase D systems

### Tool Session lineage

Shared Tool Session UX is now the expected architecture for substantial construction tools.

Migrated / implemented:
- Sweep
- Array
- Solidify
- Shell
- Revolve Profile
- Symmetry / Bisect foundation

Important behavior:
- exclusive ownership where appropriate
- Active Tools drawer stays available while session owns it
- navigation must continue to work
- Pencil/mouse modelling ownership must not steal normal touch navigation

### Edge Extrude

Mature current workflow:
- boundary edge / compatible non-branching chain / loose edge
- direct drag creates welded quad ribbon
- newly created outer rail remains selected
- tool remains armed for repeated pulls
- Free / X / Y / Z / Auto constraints
- Plane constraint = free 2D movement within plane perpendicular to grabbed edge
- can switch/deselect boundary edges while tool remains armed
- can drag a different valid edge directly to switch-and-extrude
- each pull is one Undo step

Do not extend Edge Extrude speculatively. Only revisit for a concrete modelling/UX case.

### Sweep

Sweep is mature enough to protect:
- Profile-first workflow
- selected Face / closed Edge-loop launch
- Follow Edges path authoring
- free Draw Path
- 3D Geometry Snap
- custom/open/closed profiles
- Tool Session PROFILE / PATH / FINISH stages
- correct closed-shell normals
- immediate redraw on Apply

### Solidify / Shell

- Shell currently behaves correctly with non-destructive Mirror.
- Solidify now also supports Mirror seam logic.
- Face Delete compaction fixed the orphan-vertex failure that masqueraded as a Mirror issue.
- If a future Solidify failure appears, first inspect mesh cleanliness / boundary topology before blaming modifiers.

## Known architecture lessons / failed approaches

Keep these so the next chat does not repeat them:

- **Do not bake Mirror into Solidify by default.** The .429 bake-on-apply experiment was the wrong modifier architecture.
- Solidify/Shell should operate on the authoritative editable base mesh; non-destructive Mirror should remain a modifier.
- Mirror-plane boundaries need special Solidify seam treatment, but not all Solidify failures are Mirror failures.
- Face deletion can expose orphan topology; compact after destructive face removal while preserving intentional loose geometry.
- Extract Faces works from a compacted mesh and was the clue that revealed the Face Delete bug.
- Do not patch topology failures by only special-casing the latest arrangement.
- Path tracing was abandoned; Studio realtime is the rendering path.
- Do not add Blender-scale scene-management complexity.

## Release checkpoints

- Beta 2: frozen legacy checkpoint
- Beta 3: **v0.36.18.371**
- Beta 4: **v0.36.18.427**
- Live main / active development target: **v0.36.18.438**

Future Beta folders are immutable snapshots. Normal development continues at the live root.

## Git / release workflow

User has repeatedly granted permission to create branches, open PRs, merge and update main without asking again.

For each build:
1. audit current `main`
2. make a narrow branch
3. add / update synthetic regression fixtures
4. update `version.json` and runtime pins only for code-bearing releases
5. update `AI_HANDOFF.md`, `DEV_HISTORY.md`, and `TEST_CHECKLIST.md`
6. open PR
7. wait for topology regression
8. fix real failures or stale contract tests
9. squash merge after PASS
10. record PR / merge SHA / workflow run
11. give the user only 3–6 focused hands-on checks

Documentation-only handoff cleanup does **not** require a runtime version bump.

## What to tell a new chat

Use this:

> Continue BoxLab from current main. Read AI_WORKFLOW.md, AI_HANDOFF.md, TEST_CHECKLIST.md, newest DEV_HISTORY.md and ROADMAP.md, then inspect current main before coding. Live development target is v0.36.18.438; Beta 4 is frozen at v0.36.18.427. Surface Transform .437 is the face-to-face placement baseline. Current work is the linked-instance Insert Tool using the same surface-frame controller and existing sourceId/instanceMatrix architecture. Preserve all protected iPad navigation, mature topology/construction systems, linked-instance geometry/placement separation, and src/multi-object-transform.js?v=0.36.1.0 exactly.
