# BoxLab Development History

This is the concise append-only development log used for cross-chat continuity.

Do not record every tiny cache-busting or temporary deployment workflow commit. Record meaningful modelling, architecture, UI, stability, and release milestones.

Newest entries should be added at the top.

---

## 2026-09-19 — v0.36.18.347 Join / Boolean scene-history consolidation

- Phase C audit confirmed existing **Join** is already authoritative in Object > Active Tools and already checkpoints through the Object scene-history bridge.
- Audit confirmed Boolean already uses the same Object scene checkpoint before creating its result, but `boolean-ux-history.js` still installed an older second Undo/Redo wrapper with private Boolean stacks.
- Removed that parallel Boolean history layer instead of adding another result-management system.
- Boolean A/B operand colours, Swap control, active/base semantics, solver dispatch, cleanup chain and button ownership are unchanged.
- Boolean still hides only the two selected operands and creates a new unique editable result; selected linked operands are not propagated into the result and unselected linked peers remain untouched.
- Object scene snapshots remain responsible for restoring `sourceId` and `instanceMatrix` on Undo/Redo.
- Reference operands remain excluded from Join and Boolean.
- Protected `src/multi-object-transform.js?v=0.36.1.0` and `styles.css?v=0.36.18.270` remain untouched.
- Added regression coverage enforcing one authoritative scene-history owner for Join/Boolean and protecting unique-result / linked-peer / Reference behavior.
- Released from PR **#31**; squash merge commit: `ebc9ec498d16b82301fc86e4bc3203afdd9d5cd2`.

## 2026-09-19 — v0.36.18.346 Multi linked-instance parity

- Released **v0.36.18.346** from PR #30; squash merge commit: `c9e52c091da47a5e88539a14a9abba7807fe45f6`.
- Mandatory stronger-Multi audit confirmed BoxLab already had Object Multi Move / Scale / Rotate, numeric transforms, pivot modes, grouping, ordinary Multi Duplicate, Join and Boolean.
- No second multi-transform system was added; protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- The genuine gap was linked-instance parity while Object Multi was active.
- The existing **Linked Duplicate** control now operates on every selected editable object when Multi is active.
- Selected Reference guides are skipped and remain protected.
- Multi Linked Duplicate preserves each object's current placement, visibility and linked-source semantics.
- Duplicated group relationships are recreated as a new linked group set rather than mixing copies back into the source group.
- The newly created linked copies become the current Multi selection and Move is re-armed for immediate placement.
- The existing **Make Unique** control now detaches every selected linked object when Multi is active.
- Multi Make Unique commits as one scene-history step; selected unlinked objects are ignored.
- Ordinary Duplicate and ordinary Multi Duplicate remain independent copies and never silently become linked.
- Shared-source registry lifetime remains unchanged so Object Undo/Redo can restore prior linked metadata safely.
- First PR regression run failed only because the new single-control test regex was too broad; every implementation contract passed. The test was tightened to the actual ownership invariant.
- Corrected PR topology regression run **35437992611** passed before merge.

## 2026-09-19 — v0.36.18.345 Safari native-selection interaction guard

- Released **v0.36.18.345** from PR #29; squash merge commit: `296c2742faff6734f9af422a5050918a700dceb4`.
- Added a standalone `src/app-interaction-guard.js` to prevent Safari/iPad native text/element selection, touch callouts and drag-selection from washing the modelling UI blue during touch/Pencil work.
- The guard applies `user-select:none`, `-webkit-user-select:none`, and `-webkit-touch-callout:none` across BoxLab chrome and the modelling surface.
- `selectstart` and native `dragstart` are prevented outside editable controls.
- Real editable controls remain exempt: `input`, `textarea`, `select`, `contenteditable`, and explicit `data-allow-selection=true` targets retain normal selection/value interaction.
- Existing `touch-action:none` gesture routing was left unchanged.
- Protected `styles.css?v=0.36.18.270`, Pencil/orbit handlers, and `src/multi-object-transform.js?v=0.36.1.0` were untouched.
- Added regression coverage for native-selection suppression, editable-field exceptions, single authoritative loader, and protected gesture/transform pins.
- PR topology regression run **35437021036** passed on the first run.

## 2026-09-19 — v0.36.18.344 Reference guides permanently read-only

- Released **v0.36.18.344** from PR #28; squash merge commit: `6118b0f60073573fb035c31d17d2082512c31d41`.
- Mandatory audit confirmed imported **Reference** meshes already participated in existing cross-object snapping; no second reference/snap system was added.
- The real gap was protection consistency: Reference objects could be unlocked through Outliner, Multi, or Group lock controls.
- Reference objects are now permanently read-only modelling guides.
- `multi-object.js` forces `kind='reference'` objects to `locked=true` at creation, including duplicated References.
- The per-object lock control renders Reference as `R`, is disabled, and describes it as an always-read-only guide.
- Multi lock/unlock operates only on editable selected objects and leaves selected References locked.
- Group lock/unlock operates only on editable group members; reference-only groups expose a disabled `R` control.
- Scene-history restore reasserts `locked=true` for every Reference, so Undo/Redo cannot revive an unlocked guide.
- Reference visibility, solo/isolate behavior, Outliner identity, and existing cross-object snap eligibility remain unchanged.
- Editable-object lock behavior remains unchanged.
- Added regression coverage for import kind/lock, single/Multi/Group protection, scene restore, duplicated References, and continued cross-object snap eligibility.
- PR topology regression run **35436090086** passed on the first run.

## 2026-09-19 — v0.36.18.343 linked-instance foundation + Make Unique

- Released **v0.36.18.343** from PR #27; squash merge commit: `b35e542b93469b8c957b55c3c3de1e96e9ebc65a`.
- Mandatory audit confirmed current main had **no live linked-instance system**; the old v0.36.19.x instance foundation had been deliberately removed when BoxLab was restored to the pre-instance modelling baseline.
- Ordinary **Duplicate remains independent** and continues to clone geometry normally.
- Added explicit **Linked Duplicate** and **Make Unique** controls in the Objects drawer.
- Linked instances are implemented inside the authoritative `multi-object.js` manager rather than through an external pointerup/event synchronizer.
- Each link group owns one shared local source mesh; each object stores its own `instanceMatrix` and evaluated world-space mesh.
- Object-mode Move / Rotate / Scale update only that instance's placement matrix.
- Component edits are transformed back to shared local source space, then regenerated into every linked peer using each peer's own placement.
- Added tested placement solving for both solid 3D meshes and planar meshes; solved transforms are validated against all vertices before acceptance.
- **Make Unique** removes only the active object's link metadata while leaving its evaluated geometry unchanged.
- **Join** explicitly detaches the combined primary result from any link group.
- Reset clears the linked-source registry.
- Object scene snapshots now preserve `sourceId` and `instanceMatrix`.
- Linked Duplicate captures the scene-before state and transfers that checkpoint to the newly active duplicate's history so Undo can restore the pre-duplicate scene.
- Outliner labels linked peers with `Link ×N`.
- The protected `src/multi-object-transform.js?v=0.36.1.0` was not modified.
- First PR run failed only because the previous .342 UI test hard-coded the parent drawer cache version. All new instance tests passed on that run. The parent-loader assertion was made version-resilient.
- Corrected PR topology regression run **35435127026** passed before merge.

## 2026-09-19 — v0.36.18.342 File menu fit + stable 3-column Face layout

- Released **v0.36.18.342** from PR #26; squash merge commit: `cf9ee2dc3c1b9db9963e5fdc23435d3b1acabbe8`.
- User reported two UI issues on iPad: File menu did not fit cleanly on screen, and selecting/arming Inset caused Face Active Tools to jump to four buttons across.
- File menu now opens below the second command bar, sits above it in z-order, is constrained to the available viewport height, and scrolls internally when required.
- Face primary tools are now protected as a 3-column grid: **Extrude / Inset / Knife**. Join Coplanar wraps below rather than forcing a fourth column.
- Face secondary tools are also 3-column: **Extract / Duplicate / Bridge**, with Delete wrapping below rather than squeezing four across.
- `join-selected-coplanar-faces.js` now avoids re-appending already-correct primary buttons during sync, preventing click-time DOM movement.
- Updated dynamic loader/cache chain for Face workflow and topbar layout.
- Added regression coverage for File menu fit, Face 3-column layout, and stable no-op Face sync.
- First PR run failed only from stale parent-loader version assertions in Flip Edge and Vertex layout tests; those were made version-resilient.
- Corrected PR topology regression run **35432345834** passed before merge.

## 2026-09-19 — v0.36.18.341 Vertex toolbar stability / Build Edge handoff hotfix

- Released **v0.36.18.341** from PR #25; squash merge commit: `f04cbb2a92c7bc0a54155cc65d07e4f3a0cc1300`.
- Concrete iPad regression from user screenshots: tapping **Build Edge** caused the Vertex Active Tools buttons to jump; Circle moved to the first slot and Add appeared active instead of Build Edge.
- Root cause 1: `face-reconstruct.js` re-appended the pre-Circle Vertex buttons on every selection/render sync, physically moving the tapped DOM node during the click lifecycle and stranding Circle at the front.
- Root cause 2: the Add Vertex wrapper session could stop while the older core `directTool='addVertex'` remained armed underneath, so a render could light Add back up.
- `face-reconstruct.js` is now the single Vertex toolbar layout owner with deterministic order: **Bevel / Add / Build Edge / Slide / Create Face / Circle**.
- The layout owner first checks whether the order is already correct and does not move any DOM nodes when stable.
- Circle delegates Vertex placement to the shared layout owner rather than independently appending itself.
- Arming Build Edge now fully stops the Add session and clears any remaining core Add direct-tool state before Build Edge becomes armed.
- Added regression coverage for stable six-button ordering, no-op stable layout sync, Circle delegation, Build Edge/Add handoff, and the current cache chain.
- First PR run failed only because the prior Offset Loop test hard-coded the parent drawer cache version; the new .341 tests already passed. That parent-loader assertion was made version-resilient.
- Corrected PR topology regression run **35432049975** passed before merge.

## 2026-09-19 — v0.36.18.340 transactional Offset Loop support workflow

- Released **v0.36.18.340** from PR #24; squash merge commit: `54d7e1822235db0cb88c05c0541fae7d8c1560b7`.
- Mandatory existing-feature audit confirmed **Offset Loop is already BoxLab's support-loop construction tool**; no duplicate Support Loop tool was added.
- Offset Loop drag commits now run both the topology validator and topology gate before history commit; invalid results restore the pre-drag snapshot.
- Exact Offset Loop now uses the same validate-before-commit / rollback discipline.
- Created left/right support rails are selected directly through the canonical Selection Bridge instead of toggling the legacy hidden Multi control.
- Canonical additive Multi therefore remains enabled after Offset Loop.
- While Offset Loop is armed, `edge-paint-select.js` yields its capture-phase Pencil handler so the modelling drag receives the gesture.
- Offset Loop now exposes one armed-state controller through `globalThis.__boxlabOffsetLoop`.
- Refreshed `loop-offset.js`, `precision-offset-loop.js`, `edge-paint-select.js`, and the drawer/cache chain to .340.
- New Offset Loop regression contracts all passed from the first PR run. Two subsequent CI failures were only stale historical parent-loader / exact-handler assertions in Face Split and Grid Fill tests; those tests were made invariant-based.
- Corrected PR topology regression run **35431669328** passed before merge.

## 2026-09-19 — v0.36.18.339 Clean sharp-fold shape-preservation hotfix

- Released **v0.36.18.339** from PR #23; squash merge commit: `e651e7d1360d9f09e8723ddf1d6c0556b8b9b395`.
- Concrete user video regression: Object > Clean for SubD visibly caved in a box-with-opening after the all-quad relaxation phase.
- Root cause: `quadRelaxFlow()` treated any interior all-quad, uncreased vertex as smooth. Around an opening/corner, horizontal and vertical incident faces could be averaged into a blended tangent even though the geometry represented a sharp fold.
- Added a geometric normal-fan guard: a relax candidate is now protected if any incident quad-face normal pair differs by more than 30°.
- This protection applies even when the user has not explicitly assigned a Crease.
- Existing planar smooth-grid relaxation remains enabled and still improves a perturbed interior quad vertex.
- Added regression coverage for both cases: smooth planar relaxation still works; an uncreased sharp folded quad fan remains fixed.
- Clean remains transactional; protected topology systems and `src/multi-object-transform.js?v=0.36.1.0` were untouched.
- First PR run failed only because the old Clean UI contract hard-coded the .323 module pin. The new geometry tests already passed. The loader contract was made version-resilient.
- Corrected PR topology regression run **35430414020** passed before merge.

## 2026-09-19 — v0.36.18.338 conservative four-sided Grid Fill

- Released **v0.36.18.338** from PR #22; squash merge commit: `72ec70b123e27c2ee8d3ca116f0b23481a0f1afa`.
- Mandatory existing-feature audit confirmed existing **Fill** is already the simple single-face Cap and Bridge/Quadify do not provide a structured hole grid.
- Added **Grid Fill** as a distinct Edge Topology operation for one simple planar convex four-sided boundary with matching opposite segment counts.
- Corner detection treats collinear intermediate boundary vertices as side subdivisions, so a segmented rectangular boundary can form a U×V quad grid.
- Existing boundary vertices remain fixed; only required interior vertices are created.
- Grid positions use a Coons-style interpolation across the four boundary sides.
- Grid Fill creates only quads, selects the resulting faces, and commits as one Undo step.
- Candidate topology is built on a clone and validated before the live mesh is changed.
- Irregular/curved boundaries, mismatched opposite counts, non-boundary/internal edges, ambiguous loops, and simple four-edge caps are rejected.
- Grid Fill is loaded once through `drawer-ui.js` and is placed beside existing Fill in the Edge Topology row.
- First PR run failed only because an older Flip Edge test hard-coded the prior drawer loader version; the Grid Fill tests themselves all passed. The parent-loader test was made version-resilient.
- Corrected PR topology regression run **35429713006** passed before merge.

## 2026-09-19 — v0.36.18.337 existing Rotate Edge consolidated as Flip Edge

- Released **v0.36.18.337** from PR #21; squash merge commit: `72f1847dad79b15955a4f406b273b60b44b4ee9f`.
- Mandatory existing-feature audit confirmed the queued Edge Flip already existed as `src/rotate-edge.js`.
- The existing tool already performs the intended conservative diagonal swap between exactly two consistently wound triangles.
- No second Edge Flip implementation was added.
- Renamed the user-facing control/status language from **Rotate Edge** to **Flip Edge** while preserving the existing topology, selection and Undo behavior.
- Refreshed the `rotate-edge.js` → `face-workflow-layout.js` → `drawer-ui.js` cache chain for iPad/Safari.
- Added regression coverage protecting one authoritative Flip Edge implementation.
- First PR run failed only because a Circle test hard-coded the previous drawer cache version; that test was made version-resilient.
- Corrected PR topology regression run **35419239003** passed before merge.
- Audit also confirmed existing **Fill** already acts as a single-face Cap for one selected closed edge loop; the remaining structured-fill gap is **Grid Fill**.

## 2026-09-19 — v0.36.18.336 Circle exact Active Tools layout

- Released **v0.36.18.336** from PR #20; squash merge commit: `586efff69f7d1565ff5687c296e183143b0566c7`.
- Pure UI rearrangement of the existing Circle tool; geometry/selection/history behavior unchanged.
- Vertex: Circle is the third item in the row with Slide and Create Face.
- Edge: Circle sits immediately after Delete in the bottom Topology row.
- Face: Circle sits beside Poke Faces in the same two-column row.
- Removed the old standalone `componentCircleRow` wrapper entirely, preventing an old bottom Circle location from remaining.
- PR topology regression run **35418641336** passed before merge.

## 2026-09-19 — v0.36.18.335 restore Edge Split with canonical Multi

- Released **v0.36.18.335** from PR #19; squash merge commit: `04b23e2d445888dea952efc650161be1d5a53286`.
- Root cause: canonical always-additive component Multi left `edge-paint-select.js` active, and its capture-phase pointer handler consumed an unselected Edge tap before `face-split.js` could receive it.
- Face Split now exposes an armed state and participates in the existing `boxlab-direct-tool-exclusive` convention.
- While Face Split is armed, additive Edge paint selection yields instead of consuming the gesture.
- When Face Split is disarmed, normal canonical additive Edge selection resumes immediately.
- Global Multi remains enabled; there is no rollback to the old Multi toggle model.
- Cache-hopped `edge-paint-select.js` and `face-split.js` to .335.
- PR topology regression run **35417550936** passed before merge.

## 2026-09-19 — v0.36.18.334 Circle moved to Active Tools

- Released **v0.36.18.334** from PR #18; squash merge commit: `6dc2d183e0332d6953f60e9bf21f5b39c1686ec8`.
- Relocated the existing Circle control out of the Selection drawer.
- Circle now appears contextually inside Vertex / Edge / Face **Active Tools**.
- Kept one authoritative Circle implementation and one handler; geometry, selection, Undo, and Face/Edge/Vertex behavior are unchanged.
- Updated dynamic loader/cache pins to .334.
- PR topology regression run **35417217225** passed before merge.

## 2026-09-19 — v0.36.18.333 Face Circle support

- Released **v0.36.18.333** from PR #17; squash merge commit: `fbfbf9f46f45b4551cb0e5fdc1086cac248e7919`.
- Extended Circle so exactly one selected Face can drive the operation from its perimeter vertices.
- Face mode now enables Circle for one valid face; multiple selected Faces are refused.
- Existing Vertex/Edge Circle behavior remains unchanged.
- No topology is created or deleted; the selected Face remains selected and the operation is one Undo step.
- Cache-hopped `component-circle-core.js`, `component-circle.js`, and the authoritative `drawer-ui.js` loader to .333.
- First PR run failed only because older Circle contract tests still hard-coded .331/.332 pins/text; those assertions were rewritten to protect invariants instead of stale version strings.
- Corrected PR topology regression run **35417107014** passed before merge.

## 2026-09-19 — v0.36.18.332 Circle visibility hotfix

- Released **v0.36.18.332** from PR #16; squash merge commit: `86f5efe098b26fa7543d1018122fc7deeeacdb04`.
- Fixed Circle not appearing on iPad/Safari because `index.html` still loaded `drawer-ui.js?v=0.36.18.210`, allowing the browser to reuse an older cached drawer module that did not import Circle.
- Cache-hopped the authoritative drawer loader to `drawer-ui.js?v=0.36.18.332`.
- Circle now remains visible-but-disabled outside Vertex/Edge mode instead of disappearing, improving discoverability.
- Added regression coverage for the current drawer cache key and Circle visibility.

## 2026-09-19 — v0.36.18.331 Circle regularize for closed loops

- Released **v0.36.18.331** from PR #15; squash merge commit: `64bb42b17ef463e489c66989bf6f51dc99917126`.
- Existing-feature audit confirmed there was no current Circle / Regularize equivalent.
- Added conservative Circle regularization for one simple closed selected Vertex or Edge loop.
- The operation preserves the loop centre and current working plane, uses the average loop radius, and evenly spaces the existing vertices around the circle.
- No topology is created or deleted.
- Open chains, branches, multiple/ambiguous loops, and degenerate selections are refused.
- Selection is preserved and the operation commits as one Undo step.
- New modules: `src/component-circle-core.js` and `src/component-circle.js`.
- `drawer-ui.js` remains the single authoritative loader.
- PR topology regression run **35416581512** passed before merge.

## 2026-09-19 — v0.36.18.330 explicit Align anchor workflow

- Released **v0.36.18.330** from PR #14; squash merge commit: `e5ee279298b14cca76cbca5274c10f6a2484e802`.
- Upgraded component Align X/Y/Z from average-based flattening to an explicit iPad anchor workflow.
- Workflow: multi-select components → choose Align X/Y/Z → tap one selected component as the fixed anchor.
- The picked anchor component stays fixed; other selected component vertices align to the anchor component's centre coordinate on the chosen axis.
- Reused the existing Boolean amber/orange reference colour (`#f3b34a`) for the temporary anchor cue.
- Existing Make Planar remains unchanged and distinct.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- PR topology regression run **35415067002** passed before merge.

## 2026-09-19 — v0.36.18.329 component Align X/Y/Z

- Released **v0.36.18.329** from PR #13; squash merge commit: `6edb552a3219435f1a3a2de7cc9a47be46815c07`.
- Existing-feature audit confirmed **Make Planar** already existed for Face-specific arbitrary-plane flattening; it was retained unchanged.
- Added only the missing generic component axis-align tool for Vertex / Edge / Face selections.
- Align X / Y / Z sets all vertices belonging to the selected components to their average coordinate on the chosen axis.
- Selection is preserved, Object mode is excluded, and the operation commits as one history step.
- New modules: `src/component-align-core.js` and `src/component-align.js`.
- `drawer-ui.js` is the single loader for the new UI module.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- PR regression run **35411656859** passed before merge.

## 2026-09-19 — v0.36.18.328 duplicate Repeat UI removed

- Released **v0.36.18.328** from PR #12; squash merge commit: `f731849f96b5808c986b6d46dc92e53c9f64f9c3`.
- Fixed duplicate Precision Face / Repeat Previous controls introduced by v0.36.18.327.
- Root cause: `drawer-ui.js` already dynamically imported both modules, while .327 also added direct `index.html` module loads.
- Removed the direct `index.html` loads.
- Kept `drawer-ui.js` as the single authoritative loader and updated its Precision Face / Repeat Previous pins to `0.36.18.327`.
- Added regression coverage ensuring there is only one loader path for each module.
- This fix preserves the existing Repeat Previous behavior and exact-value replay logic; it only removes duplicate UI instantiation.

## 2026-09-19 — v0.36.18.327 redundant Repeat Previous reconnect

- Released **v0.36.18.327** from PR #11; squash merge commit: `462eabc59076afdfa7efaf10338bfa49f83355c1`.
- This release was later identified as redundant: Repeat Extrude / Repeat Inset were already live through `drawer-ui.js` before .327.
- Normal Face Extrude and Inset operations record committed model-unit values.
- Repeat Previous can replay the exact previous Extrude/Inset value on another Face.
- Through-ready, Through, blocked and rollback Extrude gestures remain explicitly non-repeatable.
- No `main.js`, Through kernel, or protected `src/multi-object-transform.js?v=0.36.1.0` changes were required.
- Final PR regression run **35410554813** passed after aligning the exported Precision Face API version with the .327 release.

## 2026-09-19 — v0.36.18.326 live component Move precision readback

- Released **v0.36.18.326** from PR #10; squash merge commit: `80605a225d9855f098a1cff7596d77fc8d6a2d7e`.
- Added live component Move readback in the existing stats line: **ΔX / ΔY / ΔZ** to three decimal places.
- Numeric readback remains visible during ordinary drags and cross-object snapping.
- Existing snap target labels remain visible alongside the numeric delta.
- No transform math changed; this is presentation/readback only.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- Final PR regression run **35408617550** passed. The earlier failed run only flagged a stale .325 cache-pin assertion; the new .326 readback tests were already passing.

## 2026-09-19 — v0.36.18.325 component Move cross-object snapping

- Released **v0.36.18.325** from PR #9; squash merge commit: `11f3d80d871d2fa2375d908aa904527bd549e394`.
- Extended Phase B precision modelling so Geometry-enabled component Move can snap to visible geometry on other objects.
- Single-vertex Move snaps that vertex; Edge/Face/multi-component Move snaps the component centre.
- Free Move can snap to other-object vertices, midpoints and edge positions.
- Axis-constrained Move only adopts the target coordinate on the constrained axis.
- Object mode is excluded and target objects remain unchanged.
- Added `componentSnapDelta()` to the shared cross-object snap core and dedicated runtime/delta regression coverage.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- Final PR regression run **35407390765** passed. The earlier failed run only flagged the intentionally changed `main.js` cache pin in an old release contract.

## 2026-09-19 — v0.36.18.324 Phase B begins / cross-object Add Vertex snapping

- Released **v0.36.18.324** from PR #8; squash merge commit: `70df4c4f137a55e553227aa391bdd68324a0d732`.
- Started Phase B precision modelling with cross-object snapping for Add Vertex.
- Existing local-edge snapping keeps priority.
- When no local edge is hit, Add Vertex can snap to visible other-object vertices, then midpoints, then arbitrary edge positions.
- Snap targets do not modify the target object; hidden and solo-excluded objects are ignored.
- Added pure helper module `src/cross-object-snap-core.js` plus dedicated regression coverage.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- Final corrected PR regression run **35406677103** passed successfully. Earlier PR runs failed only because the new test fixture incorrectly used loose edges that `EditableMesh.edges()` does not enumerate.

## 2026-09-19 — v0.36.18.323 Phase A complete / transactional topology audit

- Released **v0.36.18.323** from PR #7; squash merge commit: `040e210bf2868a45791c35c9c1392bc1e6f244fe`.
- This is the final planned Phase A Clean for SubD backend release.
- Added `quadTopologyAudit(mesh)` covering invalid references, repeated/collapsed edges, duplicate faces, non-manifold edges, orphan crease data, and valid open-boundary handling.
- `quadCleanMesh(mesh)` now snapshots the original mesh and audits after retopo, sliver cleanup, bounded triangle-patch solving, residual pair merge, and relaxation; any stage failure restores the original mesh transactionally.
- Added deterministic generated irregular-strip fixtures and invalid-topology regression coverage.
- Kept the 40-triangle solver cap and all existing quality/acceptance gates unchanged.
- Added persistent `ROADMAP.md`; Phase A is frozen unless a concrete modelling failure justifies reopening it.
- PR topology regression run **35406242201** completed successfully before merge.

## 2026-09-19 — v0.36.18.322 worst-local internal-flow ranking

- Released **v0.36.18.322** from PR #6; squash merge commit: `0f03befbb7d69ca53194536579c240a993efd9ff`.
- Clean for SubD internal proposed-quad flow ranking now combines average mismatch with a small worst-local mismatch term.
- New helper `quadInternalFlowPenalty(flows)` separates the acceptance penalty from the ranking-only worst-local term.
- Equal-average alternatives now prefer the patch that avoids concentrating flow mismatch into one badly aligned internal quad junction.
- The new worst-local term is ranking-only: the .321 acceptance score, quality thresholds, and 40-triangle solver envelope are unchanged.
- Regression workflow run **35404138276** completed successfully before merge.

## 2026-09-19 — v0.36.18.321 worst-local valence-aware patch ranking

- Released **v0.36.18.321** from PR #5; squash merge commit: `0b838da0cd2a31cd4d88c2390a9e15e9b0c58905`.
- Clean for SubD valence ranking now combines average smooth-interior valence error with a small worst-local error term.
- New helper `quadValencePenalty(errors)` makes the ranking behavior explicit and regression-testable.
- Equal-average alternatives now prefer the patch that avoids concentrating error into a more extreme extraordinary vertex.
- The new worst-local term is ranking-only; the .320 acceptance/quality gates and 40-triangle solver envelope are unchanged.
- Regression workflow for PR #5 passed successfully before merge.

## 2026-09-19 — v0.36.18.320 interior valence-aware patch ranking

- Released **v0.36.18.320** from PR #4; squash merge commit: `40e119774f39373ffadab22d0782428e8be7ea2c`.
- Clean for SubD complete-patch ranking now includes smooth-interior vertex valence regularity after the existing shape, surrounding-flow, and internal-flow terms.
- The new helper is `quadPatchValenceContext(mesh,pairs)` with `PATCH_VALENCE_WEIGHT=.25`.
- Ranking prefers safe complete matchings that leave eligible smooth interior vertices closer to quad valence 4 after paired triangle diagonals are removed.
- Boundary vertices and vertices touching creases are excluded from valence scoring.
- Valence is ranking-only: the existing .319 quality score still controls acceptance, so the 40-triangle envelope and prior quality/eligibility guards remain unchanged.
- Added regression coverage for valence-4 preference and crease-ring exclusion; Topology regression run **35401945842** completed successfully on the corrected PR head.

## 2026-09-19 — .319 handoff audit / repo reconciliation

- Re-audited current `main` against `AI_WORKFLOW.md` before closing the development chat.
- Confirmed **v0.36.18.319** is the released/live baseline: internal proposed-quad flow coherence is present, the bounded triangle-island envelope remains 40 triangles, and the .319 release/verifier had already completed successfully.
- Canonical .319 release commit remains `68e45845f6696b3e66929ee4b181748b85d99b09`; final clean Pages marker commit remains `4ed534dfe8697e54921a8a80d7b50945b6792342`.
- After the handoff files were first introduced, three later .319 commits (`51117f59...`, `a91ac689...`, `a0a2d072...`) re-exposed/cache-hopped/tested the same .319 internal-flow state. They do **not** represent a newer numbered release.
- Current code-bearing HEAD at this audit is `a0a2d072acbf2e397ca68e2276fd75c8a1643846`.
- Only permanent workflow currently present under `.github/workflows` is `through-regression.yml`; temporary .319 release/verifier workflows are removed.

## 2026-09-19 — Repository handoff system established

- Added `AI_WORKFLOW.md`, `AI_HANDOFF.md`, `DEV_HISTORY.md`, and `TEST_CHECKLIST.md`.
- Future AI development sessions must treat the repository as source of truth.
- Future sessions must update the living handoff and append meaningful history before finishing code-changing work.
- Initial handoff was audited from current `main`, not reconstructed from an older chat version.

## v0.36.18.319 — Internal proposed-quad flow coherence

- Clean for SubD patch scoring now considers flow coherence inside the proposed quad patch in addition to surrounding boundary context.
- Bounded triangle-island solving remains conservative and quality-gated.
- User-facing Clean for SubD wrapper retains topology validation and rollback.
- Release commit: `68e45845f6696b3e66929ee4b181748b85d99b09`.
- Audited post-release HEAD: `4ed534dfe8697e54921a8a80d7b50945b6792342`.

## v0.36.18.318 — Forty-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 40 triangles.
- Kept conservative patch quality guards and regression tests.

## v0.36.18.317 — Thirty-eight-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 38 triangles.

## v0.36.18.316 — Thirty-six-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 36 triangles.

## v0.36.18.315 — Thirty-four-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 34 triangles.

## Earlier protected baseline retained

The current repository has evolved through many earlier releases. Important protected behaviours that remain relevant include:

- iPad navigation gesture model
- persistent selections during navigation
- Studio realtime workflow
- object management / Multi
- Knife / Loop Cut / Bevel / Extrude / Inset
- connected multi-face Extrude
- cavity-aware Through
- Extract
- Bridge
- Join
- Boolean workflows
- Base/SubD export
- protected `src/multi-object-transform.js?v=0.36.1.0`
- intentionally pinned selection/UI stylesheet baseline where still referenced by current `index.html`

For exact implementation state, always inspect current `main`; this history is context, not authority.
