# BoxLab Development History

## 2026-09-26 — v0.36.18.464 Shell/Solidify recovery

- User found Shell broken after .462.
- Restored `solidify-core.js` and `shell-core.js` exactly to the confirmed-working .461 state rather than layering another speculative fix.
- Retained the successful Extract Faces and Object Join facegroup preservation work.
- Solidify/Shell facegroup propagation is deferred for separate reintroduction after functional recovery is hands-on confirmed.

# BoxLab Development History

## 2026-09-26 — v0.36.18.463 Object Join facegroup preservation

- v0.36.18.462 Extract/Solidify/Shell propagation passed hands-on testing.
- `combineEditableMeshes()` now carries `faceGroups[]` in lockstep with appended faces.
- Joined source objects preserve their existing group IDs and colours in the combined editable mesh.
- No Boolean or interaction behavior changed.

## 2026-09-26 — v0.36.18.462 Extract / Solidify / Shell facegroup propagation

- v0.36.18.461 Mesh Health facegroup preservation passed hands-on testing.
- Extract Faces now carries selected facegroup IDs into the new object and preserves remaining source groups.
- Solidify copies source groups to inner duplicate faces and marks new side-wall faces Ungrouped.
- Shell's compact/restore path now preserves groups and inherits Solidify semantics.
- No modelling interaction changes.

## 2026-09-26 — v0.36.18.461 Mesh Health facegroup preservation recovery

- v0.36.18.460 SubD facegroup propagation passed hands-on testing.
- Restored facegroup metadata preservation through Safe Repair, Auto Close, Unify Winding, Flip Normals and Triangulate.
- Safe Repair filters `faceGroups[]` in lockstep with removed faces.
- Auto Close caps are deliberately ungrouped while existing faces retain their groups.
- Triangulated child faces inherit the source polygon's facegroup.
- No modelling interaction changes.

## 2026-09-26 — v0.36.18.460 SubD facegroup propagation recovery

- v0.36.18.459 Mirror propagation passed hands-on testing.
- Restored facegroup inheritance through Catmull-Clark subdivision only.
- Each generated child quad inherits its parent facegroup ID.
- Facegroups viewport evaluation now applies SubD before Mirror, matching BoxLab's display/evaluation order.
- No modelling interaction/tool-ownership changes.

## 2026-09-26 — v0.36.18.459 Mirror facegroup propagation recovery

- v0.36.18.458 first-activation pending-state repair passed hands-on testing.
- Restored facegroup inheritance through non-destructive Mirror only.
- Mirrored descendant faces inherit the source face's facegroup ID.
- Facegroups Render Look evaluates current Mirror settings before applying viewport colours.
- SubD propagation remains deferred for separate isolation.

## 2026-09-26 — v0.36.18.458 Facegroups pending-state first-activation repair

- .457 historical two-frame retry did not resolve the recovered-runtime first-activation dark view.
- Replaced fixed-delay logic with a bounded pending-state retry tied to newly created viewport bodies and scene bodies.
- Failed colour generation keeps normal material rather than applying invalid vertex colours; retries stop as soon as colour generation succeeds.
- No modelling/topology or OBJ semantics changed.

## 2026-09-26 — v0.36.18.457 Facegroups first-activation recovery

- Restored the historical fix for the dark first Facegroups activation.
- Facegroup material is now assigned only when colour generation succeeds.
- Failed first pass falls back to the normal front material instead of a dark invalid vertex-colour state.
- Entering Facegroups normalises settings, rebuilds the viewport, waits for two animation frames, then reapplies colours.
- No topology, OBJ data or modelling interaction changes.

## 2026-09-26 — v0.36.18.456 Facegroup data connection + split import recovery

- .455 passed hands-on, but a known facegrouped OBJ still displayed no Facegroups colours.
- Root cause: render-mode source lookup expected mesh metadata on the Three.js body, while authoritative editable mesh data lives in the active bridge mesh / object manager.
- Restored active/inactive mesh lookup without rewriting render runtime.
- Restored File > Import > **Split objects by groups** checkbox, OFF by default, and wired it to the already recovered OBJ parser.
- No Mirror/SubD facegroup propagation or modelling topology changes in this build.

## 2026-09-26 — v0.36.18.455 Facegroup colour controls recovery

- v0.36.18.454 additive Facegroups viewport integration passed hands-on testing.
- Reintroduced the original visual-only Facegroup palette controls in isolation: Default/Soft/Vivid/Contrast, saturation, lightness, ungrouped colour, reseed and reset.
- Settings persist in localStorage and do not change facegroup IDs, topology or OBJ data.
- Kept the .453/.454 render and modelling paths intact; no SubD/Mirror evaluation machinery added.
- Regression boundary remains: .452 rejected because its render integration replaced proven runtime code and failed to load.

## 2026-09-25 — replay v0.36.18.442 from Beta 4 audit lane

- Reapplied the original Mesh Health boundary diagnostics build exactly.
- Historical source commit: `cd3bc0ad6b5da3298b1b3e9d408e49c03c2f4a71`.
- No .443+ changes included.
- Inset was hands-on confirmed working on .441 before this replay.
- Awaiting hands-on Inset and boundary diagnostics selection handoff result on .442.

## 2026-09-25 — replay v0.36.18.441 from Beta 4 audit lane

- Reapplied the original Mesh Health Auto Close / Make Watertight build exactly.
- Historical source commit: `d4e964e3741d7e53ac0176c1a811b05ea3edb727`.
- No .442+ changes included.
- Inset was hands-on confirmed working on .440 before this replay.
- Awaiting hands-on Inset and Auto Close result on .441.

## 2026-09-25 — replay v0.36.18.440 from Beta 4 audit lane

- Reapplied the original Mesh Health Safe Repair build exactly.
- Historical source commit: `73e6958874de73d8e553f0bb2ad73cd31c503004`.
- No .441+ changes included.
- Inset was hands-on confirmed working on .439 before this replay.
- Awaiting hands-on Inset and Safe Repair result on .440.

## 2026-09-25 — replay v0.36.18.439 from Beta 4 audit lane

- Reapplied the original Mesh Health / Inspect foundation exactly.
- Historical source commit: `60187e2f17c444c319c6862a80e3a107588dc9cb`.
- No .440+ changes included.
- Inset was hands-on confirmed working on .438 before this replay.
- Awaiting hands-on Inset and Mesh Health inspection result on .439.

## 2026-09-25 — replay v0.36.18.438 from Beta 4 audit lane

- Reapplied the original linked-instance Insert Tool exactly.
- Historical source commit: `3483edd3b8809b38fca738ed8e6f3085bb2e26f6`.
- No .439+ changes included.
- Inset was hands-on confirmed working on .437 before this replay.
- Awaiting hands-on Inset and Insert Tool result on .438.

## 2026-09-25 — replay v0.36.18.437 from Beta 4 audit lane

- Reapplied the original face-to-face Surface Transform anchoring build exactly.
- Historical source commit: `5a6ef4338c2997b5e65dbf59f77bc129d7e152cd`.
- No .438+ changes included.
- Inset was hands-on confirmed working on .436 before this replay.
- Awaiting hands-on Inset and face-to-face Transform result on .437.

## 2026-09-25 — replay v0.36.18.436 from Beta 4 audit lane

- Reapplied the original Surface Transform Tool foundation exactly.
- Historical source commit: `db817eb623ebc52ff2d7b6e344f2911873ead8d6`.
- No .437+ changes included.
- Inset was hands-on confirmed working on .435 before this replay.
- Awaiting hands-on Inset and Surface Transform result on .436.

## 2026-09-25 — replay v0.36.18.435 from Beta 4 audit lane

- Reapplied the original Symmetry Align to Face + Flip Plane build exactly.
- Historical source commit: `6bf2b5a5308d639c0e03f7cd2862695d10624591`.
- No .436+ changes included.
- Inset was hands-on confirmed working on .434 before this replay.
- Awaiting hands-on Inset and Align to Face / Flip Plane result on .435.

## 2026-09-25 — replay v0.36.18.434 from Beta 4 audit lane

- Reapplied the original Symmetry plane transform ownership + arbitrary rotation build exactly.
- Historical source commit: `6cb0a5aca9d2d69dbed23511ef617d381a1871c6`.
- No .435+ changes included.
- Inset was hands-on confirmed working on .433 before this replay.
- Awaiting hands-on Inset and Symmetry Rotate ownership result on .434.

## 2026-09-25 — replay v0.36.18.433 from Beta 4 audit lane

- Reapplied the original movable/snappable Symmetry/Bisect plane exactly.
- Historical source commit: `ff9be6110c7e34b79fac08e82589b3bd40b66237`.
- No .434+ changes included.
- Inset was hands-on confirmed working on .432 before this replay.
- Awaiting hands-on Inset and movable/snappable plane result on .433.

## 2026-09-25 — replay v0.36.18.432 from Beta 4 audit lane

- Reapplied the original Face Delete orphan-compaction fix exactly.
- Historical source commit: `31e2c4d0c727f1910543d10d723a4fcedda72e77`.
- No .433+ changes included.
- Inset was hands-on confirmed working on .431 before this replay.
- Awaiting hands-on Inset result on .432.

## 2026-09-25 — replay v0.36.18.431 from Beta 4 audit lane

- Reapplied the original Mirror-seam-aware Solidify fix exactly.
- Historical source commit: `b3b63b00c505827f74a00175e2d18770a1aeeb55`.
- No .432+ changes included.
- Inset was hands-on confirmed working on .430 before this replay.
- Awaiting hands-on Inset result on .431.

## 2026-09-25 — replay v0.36.18.430 from Beta 4 audit lane

- Reapplied the original Mirror-preserving Solidify fix exactly.
- Historical source commit: `4a393fa0021d196c9921cf978fd029f109035ce9`.
- No .431+ changes included.
- Inset was hands-on confirmed working on .429 before this replay.
- Awaiting hands-on Inset result on .430.

## 2026-09-25 — replay v0.36.18.429 from Beta 4 audit lane

- Reapplied the original mirrored-object Solidify fix exactly.
- Historical source commit: `70831c5a24d975417c81adb16d6e56a76d4191cc`.
- No .430+ changes included.
- Inset was hands-on confirmed working on .428 before this replay.
- Awaiting hands-on Inset result on .429.

## 2026-09-25 — replay v0.36.18.428 from Beta 4 audit lane

- Reapplied the original .428 Symmetry / Bisect foundation exactly.
- Historical source commit: `72a30c2f5799d048235684e326da8fdf3a71fa2c`.
- No .429+ changes included.
- Inset was hands-on confirmed working immediately before this replay on .427.
- Awaiting hands-on Inset result on .428 before continuing.

## 2026-09-25 — Beta 4 forward replay audit begins

- Reset active runtime/tests exactly to frozen v0.36.18.427 for hands-on Inset verification.
- This is a forensic replay lane: .428 through .449 will be reapplied in original order, one numbered build at a time.
- Inset is the sentinel regression check after every replay step.
- No post-Beta-4 feature is being discarded; original commits remain the source for replay, including Mesh Health and later export/facegroup work.
- Frozen /beta-4/ remains unchanged.

## 2026-09-25 — deliberate recovery to v0.36.18.449 baseline

- User chose to stop patching the interaction regressions introduced after the large v0.36.18.450 UI/UX consolidation.
- Restored every runtime and regression-test file to the exact v0.36.18.449 main snapshot at `4d700dc26e8a23a65a4fba27bcca259062c5be07`.
- Preserved current handoff/history/roadmap/checklist documents so the .450–.465 investigation remains available.
- Removed post-.449 runtime wrappers and post-.449 recovery-only tests from the active baseline.
- Git history remains forward-moving; no force-reset of main.
- Released via PR **#154**; squash merge `83fd257442d21d7db64385c0084d1cb314fae017`.
- Recovery Topology regression **36112631181 PASS**.
- Future UI cleanup must be reintroduced as small, independently hands-on-tested slices from this baseline.

## 2026-09-25 — v0.36.18.465 live Inset Face Region API repair

- Hands-on .464: Extrude and Extrude Through pass; Inset fails.
- Found the remaining ES-module split: live Uniform Inset methods existed, but their Face Region dependencies did not exist on the live `mesh.js?v=0.12` class.
- Copied `faceRegionInfo`, `faceRegionNormal`, and `faceRegionsInfo` onto the live EditableMesh prototype before installing Uniform Inset methods.
- Avoided rerunning the full Face Region installer to prevent duplicate legacy UI/event handlers.
- No changes to Extrude, Through, Through kernel, Bevel, or protected multi-object transform code.
- Released via PR **#153**; squash merge `d7b32672f1757dfbef80f5eb5f364ed1dcfc41ea`.
- Final Topology regression run **36105980083 PASS**.


## 2026-09-25 — v0.36.18.464 public version + explicit Through runtime

- Production shell and `version.json` now genuinely advance from .461 to .464.
- Live runtime cache keys were aligned so Safari/GitHub Pages does not mix .461/.463/.464 modules.
- Inward Extrude/Through takeover is now an explicit main runtime module as well as remaining available from the Drawer dynamic import.
- Protected `through-kernel.js?v=0.36.18.242`, `multi-face-direct.js?v=0.36.18.242`, and `multi-object-transform.js?v=0.36.1.0` remain unchanged.
- Released via PR **#152**; squash merge `f7a092b82addc517a53ec1990324fdb0b66a00e3`.
- Final Topology regression run **36094996497 PASS**.


## 2026-09-25 — v0.36.18.464 public version sync + explicit Through runtime

- User reported only v0.36.18.461 was visibly loading, despite later hotfix merges.
- User also confirmed ordinary Extrude worked but Extrude Through did not.
- Advanced the actual public shell and version manifest to v0.36.18.464.
- Standardised current live runtime cache keys to .464 while retaining protected historical pins.
- Loaded `sequential-through-fallback.js` explicitly in the main runtime, with its dynamic drawer import aligned to the same URL.
- Protected `through-kernel.js?v=0.36.18.242` and `multi-face-direct.js?v=0.36.18.242` remain unchanged.
- Final Topology regression **36094996497 PASS**.
- PR **#152**, squash merge `f7a092b82addc517a53ec1990324fdb0b66a00e3`.


## 2026-09-25 — v0.36.18.463 live Uniform Inset prototype repair

- Extrude confirmed working again; Inset remained inert.
- Found ES-module identity mismatch: `uniform-inset.js` patched `./mesh.js`, but live BoxLab uses `./mesh.js?v=0.12`.
- Installed all Uniform Inset methods on the live versioned EditableMesh prototype too.
- Loaded the repaired Uniform Inset module before the proven Face direct controller.
- No changes to Extrude, Through, pointer ownership, Bevel, or protected transform code.
- Released via PR **#151**; squash merge `d8af8ac6c140c15ea83122baa16164d1905b0c88`.
- Final PR Topology regression run **36086343100 PASS**.


## 2026-09-25 — v0.36.18.462 restore proven Face direct path

- User confirmed .461 broke Extrude as well as Inset.
- Restored the proven `multi-face-direct.js?v=0.36.18.242` controller.
- Removed the .461 Face self-pick experiment.
- Allowed normal Face paint selection while Extrude/Inset are armed so selection can occur first, then the proven controller owns the drag.
- Legacy Move remains blocked under Face direct tools.
- No Through topology rewrite and no Bevel changes in this build.
- Released as a targeted v0.36.18.461 hotfix via PR **#150**; squash merge `5408b084e4f0fd5e953ab8483e7cce29fd1068b4`.
- Final PR Topology regression run **36073060381 PASS**.


## 2026-09-25 — v0.36.18.461 direct tools own pick + drag

- .460 proved legacy Move was no longer stealing the gesture, but Inset and Bevel still received no modelling drag.
- Corrected the architecture: the armed tool itself now owns component hit-test plus modelling drag.
- Face direct tools can acquire an unselected face and begin Inset/Extrude on the same Pencil press.
- Component paint yields to armed Face direct tools and Edge Bevel.
- Removed the .460 coordination shim from the live runtime.
- No Through solver or Bevel topology rewrite.
- Released via PR **#149**; squash merge `a3c1fa4200da58dd01a1f54b337ae32053a3e341`.
- Final PR Topology regression run **36068948326 PASS**.


## 2026-09-25 — v0.36.18.460 direct-tool ownership repair

- Inset: arming the tool could leave hidden component selection unavailable, while legacy `main.js` Move remained a fallback owner.
- Edge Bevel: additive hidden Multi could hand the mature controller an invalid stale edge set.
- Preserved the mature Face and Bevel controllers unchanged.
- Added a small ownership coordinator and made legacy component drag yield to mature direct tools.
- No topology, Through, navigation or UI layout changes.
- Released via PR **#148**; squash merge `d66425309248f220968cf11d86a0d6d8bc7ee9e0`.
- Final PR Topology regression run **36067498993 PASS**.


## 2026-09-25 — v0.36.18.459 armed-tool component selection

- Navigation and ordinary selection remained good, but arming Inset prevented a face from being highlighted.
- Found the regression in .457: `edge-paint-select.js` returned early whenever a direct tool was active.
- Restored .449-style component selection while tools are armed, while keeping touch reserved for viewport navigation.
- Removed the experimental .458 persistent Face handoff loader.
- No topology or UI layout changes.
- Released via PR **#147**; squash merge `6ca71fc6142060498a46e73acac0b9b7d7a9a044`.
- Final PR Topology regression run **36065555151 PASS**.


## 2026-09-25 — v0.36.18.458 armed Face selection handoff

- User confirmed orbit/pan/zoom and ordinary selection work; Inset fails because a face cannot be highlighted after arming the tool.
- Found `persistent-face-tool-select.js` present but omitted from the live loader.
- Restored it immediately before `multi-face-direct.js`, re-enabling tool-first face selection for Extrude/Inset.
- No UI, topology or navigation changes.


## 2026-09-24 — v0.36.18.457 viewport pointer ownership repair

- User confirmed the UI itself is good but all viewport interaction is dead.
- Identified shared component Multi paint selection as capable of capturing the first touch pointer before OrbitControls/direct tools.
- Reserved finger touch for viewport navigation and made component paint yield to armed direct tools.
- Kept current UI/UX intact.
- Hid Edge Lathe/Revolve settings until Revolve is actually armed; compact Revolve launcher remains visible.
- No topology changes.
- Released via PR **#145**; squash merge `b4ce2101bc749193a4f03934889efbf8500ceb5f`.
- Final PR Topology regression run **35998556661 PASS**.


## 2026-09-24 — v0.36.18.456 UI-preserved tool runtime repair

- User clarified the redesigned UI is correct; only the modelling tools underneath it regressed.
- Abandoned the proposed UI rollback before merge.
- Preserved the complete .455 presentation layer.
- Restored pre-reorder transform and component-selection ownership runtimes.
- Restored transactional Boolean pre-scene snapshot for one-step Undo.
- No modelling topology or UI layout changes.
- Released via PR **#144**; squash merge `6e93491e841991631fc09b79cf0c9f7d53faa9e7`.
- Final PR Topology regression run **35996984651 PASS**.


## 2026-09-24 — v0.36.18.455 Object Multi + Boolean presentation recovery

- User clarified Boolean itself works; the broken part is the operand-selection and Active Tools presentation.
- Preserved the .454 interaction-ownership recovery.
- Restored the established compact five-button Object Selection toolbar.
- Restored only the narrow Boolean launcher/close presentation wrapper.
- Broad .451 component presentation wrapper remains disabled.
- No modelling algorithm changes.
- Released via PR **#143**; squash merge `3ec6d638b08a437480d9be9efb232f4f3783b596`.
- Final PR Topology regression run **35995205443 PASS**.


## 2026-09-24 — v0.36.18.454 iPad interaction ownership recovery

- User hands-on report on .453: Inset, Edge Bevel, Vertex Bevel, Boolean, Edge Revolve and navigation all failed.
- Reframed the failure as interaction ownership rather than separate topology failures.
- Component paint selection now ignores touch so finger gestures remain available to OrbitControls.
- Paint selection yields to armed direct modelling tools; shared transform gestures also yield to authoritative direct-tool state.
- Symmetry/Bisect, Surface Transform and Insert attach capture-phase pointer listeners only while active.
- Restored authoritative hidden state for inactive Tool Session shells.
- Restored frozen Beta 4 Boolean checkpoint-before-mutation transaction path.
- Protected multi-object transform remained untouched.
- Released via PR **#141**; squash merge `9cecc658ab40c9a4f8f6e286453cdb8045835e98`.
- Final PR Topology regression run **35994630718 PASS**.


## 2026-09-24 — v0.36.18.453 Proven-runtime recovery

- User hands-on test reported that .452 still left the affected modelling tools unusable.
- Abandoned the .450–.452 presentation-wrapper/ownership repair direction as the active runtime.
- Restored transform and Edge Revolve interaction runtimes from the last hands-on-good .449 state; retained the hands-on-passed .452 Revolve Profile controller.
- Removed the Boolean Tool Session and .451 presentation wrappers from the live loader.
- Retained the .452 Boolean transactional one-step scene snapshot fix in the core Boolean module.
- Kept mature Through topology and protected multi-object transform untouched.
- Added regression checks that the failed wrappers are not loaded and protected runtime pins remain intact.
- Beta 5 remains deferred until hands-on recovery passes.
- Released via PR **#140**; squash merge `69a4a8b8ab13bb03f8d93d93ee798106f0b6ed18`.
- Final PR Topology regression run **35991654724 PASS**.


## 2026-09-24 — v0.36.18.452 Tool ownership / Boolean Undo recovery

- User retest of .451: Inset failed; Through passed; Edge Bevel failed; Vertex Bevel failed; Boolean one-step Undo failed; Revolve Profile passed; Edge Revolve failed.
- Traced the common modelling failure to transform gesture ownership surviving while direct component tools were armed.
- Fixed this in the transform layer rather than modifying proven Face/Bevel topology controllers.
- Edge Revolve now has a real arm API instead of launcher -> hidden-button click indirection.
- Boolean now captures the complete pre-operation scene and checkpoints that snapshot once after successful result creation.
- No Through topology changes; the strong cavity-aware baseline remains protected.
- Beta 5 remains deferred pending hands-on confirmation.
- Released via PR **#139**; squash merge `4e2733d1ac38974265a4da9524239429481b90ea`.
- Final PR Topology regression run **35988721656 PASS**.

## 2026-09-24 — v0.36.18.451 Cross-mode UI regression recovery

- User hands-on test of .450 reported a common regression pattern across Object / Face / Edge / Vertex.
- Reported: Boolean not returning in one Undo; Revolve Profile launcher requiring Object > Add and lacking Cancel; Face exact controls orphaned; Inset moving the face; Through weakened; Edge Bevel inactive; Lathe controls visible while unarmed; Edge UI still cluttered; Vertex Bevel inactive.
- Audit showed Face direct/Through, Edge Bevel and Vertex Bevel controller source was byte-identical to the proven .449 baseline, so topology code was not rewritten.
- Restored the .449 Tool Session runtime and moved cleanup into a late presentation-only wrapper that does not intercept tool events.
- Boolean solver/history remains pinned at .369; its cleanup wrapper now only shows/hides the existing controls.
- Revolve Profile can now launch/create directly from Active Tools and Cancel restores the pre-tool scene.
- Added cross-mode regression checks for controller arming plus presentation-only UI ownership.
- Beta 5 remains deferred until user hands-on pass.
- Released via PR **#138**; squash merge `b4ad4077d6813df50699fb53dccd11252809d5b5`.
- Final PR Topology regression run **35984043420 PASS**.

## 2026-09-24 — v0.36.18.450 Tool-first UI/UX consolidation

- User requested a deliberate UI/UX rebuild before freezing Beta 5.
- Formalised the interaction rule: mode home shows tool launch buttons only; settings appear only while the owning tool is active.
- Root-caused widespread Object/Shell clutter to a shared Tool Session CSS bug: `.boxlab-tool-session-shell` forced `display:flex` and could defeat the HTML `hidden` state.
- Added an explicit `.boxlab-tool-session-shell[hidden]{display:none!important}` contract.
- Made Vertex Slide exact controls contextual to Slide active state.
- Made Vertex Bevel width/exact controls contextual to Bevel active state.
- Migrated Boolean behind a single Boolean launcher with Union/Cut/Intersect inside a Tool Session.
- Kept protected modelling/navigation runtimes and topology algorithms untouched.
- Intended next milestone after user hands-on pass: Beta 5 freeze.
- Released via PR **#137**; squash merge `d77ec35968d0f59a75747c7be573a3fc3d33bc8c`.
- Final PR Topology regression run **35976396864 PASS**.
- Boolean core remained pinned at `boolean-prototype.js?v=0.36.18.369`; UI cleanup is provided by a separate Tool Session wrapper.

## 2026-09-24 — v0.36.18.449 Scrollable Viewport menu

- User confirmed .448 works and reported the expanded Viewport menu now extends beyond the iPad screen and cannot scroll.
- Added viewport-relative max height, vertical overflow scrolling, contained overscroll and iPad inertial scrolling.
- Kept the Viewport menu position/width and existing controls unchanged.
- No modelling or facegroup data behavior changed.
- Released via PR **#136**; squash merge `df6f10db0df4fb6b8bdcc9af4367db9bf9c9827c`.
- Final PR Topology regression run **35974096070 PASS**.

## 2026-09-24 — v0.36.18.448 Facegroups first-activation fix

- User reported that first selecting Viewport > Facegroups showed an almost-black mesh until Default/Soft/Vivid/Contrast was pressed.
- Fixed render lifecycle so Facegroups rebuilds then reapplies after viewport/evaluated mesh synchronisation.
- Vertex-colour facegroup material is no longer assigned when colour application fails.
- Failure falls back to normal material rather than a dark invalid state.
- No topology, facegroup IDs, OBJ handoff data, or protected modelling/navigation runtimes changed.
- Released via PR **#135**; squash merge `7c8eb0c1c36fe0bc8a69397390771043c0aefe20`.
- Final PR Topology regression run **35970042762 PASS**.

## 2026-09-24 — v0.36.18.447 Facegroup colour controls

- User hands-on passed .446 Facegroups Render Look and requested direct colour controls before the broader UI/UX cleanup.
- Added contextual Facegroup Colours controls inside Viewport settings.
- Added Default / Soft / Vivid / High Contrast palettes, Saturation, Lightness, Ungrouped colour, Reseed and Reset.
- View settings persist in local storage and remain purely visual.
- Controls remain hidden unless Facegroups is the active Render Look.
- No facegroup IDs, mesh topology, or OBJ handoff data are changed.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#134**; squash merge `cfd8e9e64f84e8a3f5b19dfb0dd5de3f421a0bf3`.
- Final PR Topology regression run **35955642406 PASS**.

## 2026-09-24 — v0.36.18.446 Viewport Facegroup Colours

- User hands-on passed .445 facegroup import/export and requested facegroup colours in Viewport settings.
- Added Facegroups to the existing Viewport Render Look menu.
- Stable deterministic colours are derived from facegroup names; ungrouped faces remain neutral grey.
- Display uses the evaluated active/inactive meshes so Mirror/SubD inherited groups remain visible.
- Facegroup view is non-destructive and does not alter export metadata.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#133**; squash merge `fcd19de9f38bfca2d65a1de643387a64e03ab318`.
- Final PR Topology regression run **35950814715 PASS**.

## 2026-09-24 — v0.36.18.445 OBJ facegroup preservation foundation

- User clarified Nomad/Blender/ZBrush facegroup semantics: facegroups are per-face IDs inside one object, not separate objects.
- Corrected editable OBJ parsing so `o` creates object boundaries and `g` only changes per-face facegroup metadata.
- Added `EditableMesh.faceGroups[]` and preservation through clone, Extrude, Inset, face split, Triangulate, Mirror and SubD.
- Added File > Import > **Split objects by groups** checkbox, OFF by default, to deliberately reproduce split-by-group behavior when wanted.
- OBJ export now emits preserved `g` records within each object and clears groups when required.
- Safe Repair preserves surviving group metadata; Auto Close caps are intentionally ungrouped.
- Added regression coverage for one object with eight facegroups, explicit split mode, OBJ round-trip, and parent-to-descendant inheritance.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#132**; squash merge `66e9e6e00d7734a0c5f0df28b1f8413bd6a220b9`.
- Final PR Topology regression run **35949682949 PASS**.

## 2026-09-24 — v0.36.18.444 OBJ export polish / topology preflight

- User hands-on passed .443 normals/triangulation and advanced with /nextbuild.
- Audited export and retained the existing scene OBJ exporter rather than introducing a parallel path.
- Added a reusable scene OBJ export core that evaluates each object after Mirror and optional SubD before preflight.
- Each exported mesh is audited with Mesh Health and receives compact health metadata comments in the OBJ.
- Scene header reports closed-clean / open-clean / issues counts.
- Added OBJ `g` records alongside `o` records for clearer downstream grouping.
- Export remains permissive; problems are surfaced rather than blocking file creation.
- Reference objects remain excluded.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#131**; squash merge `b9e16eaedad2044c8ce031bc8ae56f7ee736de4f`.
- Final PR Topology regression run **35934485708 PASS**.

## 2026-09-24 — v0.36.18.443 Mesh Health normals / triangulation controls

- User hands-on passed .442 boundary diagnostics and advanced with /nextbuild.
- Added Unify Winding, Flip Normals, and Triangulate to Mesh Health.
- Unify Winding fixes adjacency direction across manifold connected faces without making an outward/inward assumption.
- Flip Normals reverses every face explicitly.
- Triangulate uses projected ear clipping so concave n-gons do not rely on unsafe fan triangulation.
- All three operations run transactionally with validation and one Object Undo step.
- Mesh Health refreshes immediately after each operation.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#130**; squash merge `1313089ed7c445ac03124ad2a71f7185eb89afee`.
- Final PR Topology regression run **35933890155 PASS**.

## 2026-09-24 — v0.36.18.442 Mesh Health boundary diagnostics

- Advanced from .441 Auto Close into the next Phase E roadmap item: stronger boundary diagnostics.
- Added connected-component analysis for boundary edges with loop / chain / branched classification.
- Mesh Health now reports boundary group counts alongside existing edge totals.
- Added Select Boundary and Select Non-Manifold diagnostic handoffs.
- Diagnostic handoff exits Mesh Health into standard Edge mode with the relevant edges selected so existing Fill / Bridge / Move / Delete / repair tools remain authoritative.
- No geometry or Object history mutation occurs during diagnostic selection.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#129**; squash merge `cd3bc0ad6b5da3298b1b3e9d408e49c03c2f4a71`.
- Final PR Topology regression run **35929633430 PASS**.

## 2026-09-24 — v0.36.18.441 Mesh Health Auto Close / Make Watertight foundation

- Advanced from .440 Safe Repair into the next Phase E roadmap item: Auto Close / Make Watertight.
- Audited existing Boundary + Fill first and reused their simple-loop detection/orientation principles rather than adding a parallel cap convention.
- Auto Close is available only for otherwise-clean open meshes.
- Entire boundary graph must resolve to simple closed loops with degree 2 at every boundary vertex.
- One or multiple disjoint holes are capped together, each oriented opposite its neighbouring surface along the shared boundary.
- Branched/open boundary graphs and meshes with pre-existing topology issues are refused.
- Candidate must re-audit as Closed · Clean with zero boundary/non-manifold/winding issues before commit.
- Successful close is one Object Undo step and Mesh Health refreshes immediately.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#128**; squash merge `d4e964e3741d7e53ac0176c1a811b05ea3edb727`.
- Final PR Topology regression run **35928602689 PASS**.

## 2026-09-23 — v0.36.18.440 Mesh Health Safe Repair

- Advanced from the .439 inspection baseline into the first Phase E repair action.
- Added Safe Repair inside the Mesh Health Tool Session.
- Repair is intentionally narrow: exact same-direction duplicate faces, zero-area faces, and accidental orphan vertices only.
- Opposite-winding coincident faces are preserved as ambiguous rather than guessed away.
- Candidate repair runs on a clone first and is refused if topology health worsens or the issue load fails to improve.
- Successful repair saves back through the existing Object manager and records one Object Undo step.
- Mesh Health automatically refreshes after repair to show remaining issues.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#127**; squash merge `73e6958874de73d8e553f0bb2ad73cd31c503004`.
- Final PR Topology regression run **35858042579 PASS**.

## 2026-09-23 — v0.36.18.439 Mesh Health / Inspect foundation

- User hands-on passed .438 Insert Tool and advanced with /nextbuild.
- Phase D Transform/Insert slice is now considered functionally established, so development moves into Phase E Import / Repair / Handoff.
- Added non-destructive Object-mode Mesh Health Tool Session.
- Audit reports mesh counts and polygon mix, boundary/non-manifold edges, invalid or degenerate faces, zero-area faces, duplicate faces, inconsistent winding, orphan vertices, and intentional loose topology.
- Open-but-valid meshes are reported as **Open · Clean**, not incorrectly treated as failures.
- Closed valid meshes report **Closed · Clean**; structural problems report **Issues Found**.
- Reuses the existing topology seam-conformance summary as the base topology definition.
- No geometry/history mutation is performed by Inspect.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#126**; squash merge `60187e2f17c444c319c6862a80e3a107588dc9cb`.
- Final PR Topology regression run **35854298290 PASS**.

## 2026-09-23 — v0.36.18.438 linked-instance Insert Tool foundation

- Continued the approved Nomad-style Transform interaction into an Insert workflow rather than creating another unrelated placement system.
- Added **Insert** beside Transform in Object Active Tools.
- Insert first captures a source face, then a target face on another visible object.
- The target pick creates a linked duplicate through the existing linked-instance manager, preserving shared geometry and independent Object placement.
- The inserted source face is positioned face-to-face using the existing Surface Transform core.
- Move / Rotate / Scale use the same surface-frame interaction and tap-cycle as Transform; touch navigation remains protected.
- Cancel restores the exact pre-session scene; Apply commits one Object-history step.
- `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#125**; squash merge `3483edd3b8809b38fca738ed8e6f3085bb2e26f6`.
- Final PR Topology regression run **35843005403 PASS**.


## 2026-09-23 — v0.36.18.437 Surface Transform face-to-face anchoring

- First hands-on test of .436 was a strong interaction PASS, but user identified that centre-of-mass anchoring caused the placed object to intersect the target surface.
- Transform workflow now picks two faces: first a source face on the selected object, then a target face on another visible object.
- Source face centre becomes the placement anchor.
- Source face normal is rotated to oppose the target face normal, so the two faces meet rather than the object centre being embedded in the target.
- Existing Nomad-style Move → Rotate → Scale → Move tap-cycle remains unchanged after placement.
- Surface transform core generalized with sourceAnchor/sourceNormal and oppose mode for reuse by the future Insert Tool.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#124**; squash merge `5a6ef4338c2997b5e65dbf59f77bc129d7e152cd`.
- Final PR Topology regression run **35841565536 PASS**.


## 2026-09-23 — v0.36.18.436 Surface Transform Tool foundation

- After .435 Align to Face hands-on PASS, product direction expanded from separate Align commands toward a Nomad-inspired surface-relative Transform / Insert interaction model.
- Added Object-mode Transform Tool Session for one editable object.
- First target-face tap on another visible object places the selected object centre at the hit point and aligns source +Y to the target face normal.
- Persistent surface frame drives three states: Move slides across the target plane, Rotate spins around the target normal, Scale grows/shrinks around the placement point.
- Pencil/mouse tap cycles Move → Rotate → Scale → Move; touch remains ordinary iPad navigation.
- Existing 15° rotation snap is reused.
- Tool is transactional: full Object scene captured before launch, Cancel restores it, Apply records that captured scene as one Object Undo step.
- Placement math extracted to `surface-transform-core.js` so the future Insert Tool can reuse exactly the same controller instead of duplicating interaction logic.
- Existing linked-instance Object-mode save path can derive independent `instanceMatrix` placement from the transformed live mesh while retaining shared geometry.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#123**; squash merge `db817eb623ebc52ff2d7b6e344f2911873ead8d6`.
- Final PR Topology regression run **35839401940 PASS**.


## 2026-09-23 — v0.36.18.435 Symmetry Align to Face + Flip Plane

- Continued the now-working arbitrary Symmetry plane after .434 hands-on PASS.
- Added one-shot Align to Face inside the Symmetry Tool Session.
- With Align to Face armed, Pencil/mouse tap on a source face moves the plane to the hit point and adopts that source face normal.
- Touch remains reserved for ordinary iPad navigation.
- Added Flip Plane to reverse the plane normal in place without moving the plane.
- X/Y/Z remain quick orientation presets; aligned faces are treated as Custom orientation.
- Existing Move/Rotate plane ownership and arbitrary-plane topology kernel remain unchanged.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#122**; squash merge `6bf2b5a5308d639c0e03f7cd2862695d10624591`.
- Final PR Topology regression run **35819789567 PASS**.


## 2026-09-23 — v0.36.18.434 Symmetry plane transform ownership + arbitrary rotation

- User found that pressing Rotate during an active Symmetry / Bisect session rotated the source cube instead of the yellow construction plane.
- Root cause: .433 owned direct plane dragging but the shared transform engine still owned Object-mode Move/Rotate/Scale.
- Symmetry now has explicit transform ownership while its Tool Session is active; the shared Object transform engine yields completely.
- Move/direct drag targets the symmetry plane; Rotate targets the plane normal; Scale is disabled because an infinite cut plane has no meaningful scale.
- X/Y/Z remain quick orientation presets. After free rotation the plane is marked Custom.
- Rotate respects the existing world-axis transform constraints and the existing 15° rotation snap toggle.
- Bisect core generalized from axis+offset to arbitrary plane point+normal while keeping legacy X/Y/Z+offset calls working.
- Mirrored symmetry across an arbitrary plane reflects geometry directly across that plane and reuses seam vertices to weld the cut boundary.
- Touch remains ordinary iPad navigation; Pencil/mouse owns plane transform gestures.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#121**; squash merge `6cb0a5aca9d2d69dbed23511ef617d381a1871c6`.
- Final PR Topology regression run **35818444568 PASS**.


## 2026-09-23 — v0.36.18.433 movable / snappable Symmetry plane

- Continued the .428 Symmetry / Bisect foundation after the .432 Face Delete regression fix and handoff cleanup.
- Bisect core now accepts a non-zero X/Y/Z plane offset rather than being locked to object-local origin.
- Mirrored results translate the clipped mesh to a temporary origin, reuse the proven Mirror engine for welding, then translate back so the seam weld occurs on the moved plane.
- Symmetry Tool Session adds Move Plane, Reset Origin and live offset readback.
- Pencil/mouse drag on the yellow plane moves it along its normal; touch is deliberately ignored so ordinary iPad navigation stays intact.
- Geometry Snap can move the plane to active/visible Vertex, Edge, Midpoint and Face hit positions.
- X/Y/Z, Keep + / Keep − and optional Mirror remain live during plane movement.
- Face-normal orientation is intentionally deferred to the next refinement rather than broadening this first interaction build.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#120**; squash merge `ff9be6110c7e34b79fac08e82589b3bd40b66237`.
- Final PR Topology regression run **35812426602 PASS**.


## 2026-09-23 — handoff cleanup after v0.36.18.432

- Reworked `AI_HANDOFF.md` back into a true current-state document before the next major handoff.
- Removed stale audit lines that still described .394-era main as current while preserving chronology in this file.
- New handoff snapshot now records live v0.36.18.432, Beta 4 frozen at .427, current PR/CI, protected files/pins, mature Phase D systems, recent architecture lessons, and next intended build .433 movable/snappable Symmetry / Bisect plane.
- Added a compact copy/paste handoff prompt for the next chat.
- Documentation-only cleanup; no runtime version bump.


## 2026-09-23 — v0.36.18.432 Face Delete orphan compaction

- User isolated the apparent mirrored-Solidify failure to a simpler reproduction: cube with three adjacent faces deleted would not Solidify, while an extracted/duplicated equivalent mesh would.
- Root cause: Face Delete removed face records but left vertices no longer referenced by any face. Solidify then encountered those zero-incidence vertices and failed offset solving with `zero-vertex-normal`.
- Added `EditableMesh.compactUnusedVertices()` to remove accidental orphan vertices, remap faces/creases, and preserve explicitly loose vertices/edges.
- Face Delete now runs this compaction once after a multi-face delete transaction.
- Added regression for cube → delete three adjacent faces → compact one orphan vertex → Solidify succeeds.
- Existing intentional loose geometry is regression-protected through the compaction pass.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#118**; squash merge `31e2c4d0c727f1910543d10d723a4fcedda72e77`.
- Final PR Topology regression run **35810612232 PASS**.


## 2026-09-23 — v0.36.18.431 Mirror-seam-aware Solidify

- User confirmed .430 still failed on a mirrored object despite Shell working.
- Root cause is geometric: an ordinary Solidify on a half-mesh creates side walls along mirror-plane boundary edges and can offset inner seam vertices away from the mirror plane. Mirroring that result produces overlapping/internal seam topology.
- Solidify now accepts active symmetry axes from the Mirror modifier.
- Boundary edges lying wholly on an active mirror plane are treated as symmetry seams and do not receive Solidify side walls.
- Inner vertices whose source lies on a mirror plane are pinned back onto that plane after offset.
- For mirror-aware Solidify, topology validation runs on the evaluated mirrored result; the editable half is allowed to remain open along symmetry seams by design.
- Mirror remains non-destructive and enabled after Apply.
- Added a dedicated half-sheet-on-X-mirror-plane regression proving the evaluated mirrored solid is closed manifold topology.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#117**; squash merge `b3b63b00c505827f74a00175e2d18770a1aeeb55`.
- Final PR Topology regression run **35809943265 PASS**.


## 2026-09-22 — v0.36.18.430 Solidify preserves Mirror modifier

- Hands-on testing showed the .429 bake-on-apply approach still failed on the user's mirrored object, while Shell worked correctly.
- Comparing Shell and Solidify confirmed the better BoxLab modifier model: destructive tools should edit the authoritative base mesh and leave non-destructive Mirror active.
- Solidify preflight/apply now operate on the base editable mesh again.
- Solidify preview mirrors only the newly-created preview shell so the translucent preview matches the currently displayed mirrored object.
- Apply no longer bakes or clears Mirror; the Mirror modifier remains ON after Solidify.
- This matches Shell's proven modifier-preserving behavior and avoids double/overlapping evaluated topology during Solidify preflight.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#116**; squash merge `4a393fa0021d196c9921cf978fd029f109035ce9`.
- Final PR Topology regression run **35724663296 PASS**.


## 2026-09-22 — v0.36.18.429 Solidify mirrored-object fix

- Hands-on testing after .428 exposed that Solidify could not operate on an object with the existing non-destructive Mirror modifier enabled.
- Root cause: Solidify preflight/preview/apply read the editable base mesh while the viewport displayed applyMirror(base, mirrorAxes).
- Solidify now evaluates the active Mirror modifier before preflight, preview and Apply.
- Apply bakes the evaluated mirrored geometry into the editable mesh, then clears the old Mirror modifier so the result is not mirrored twice.
- The baked mirrored Solidify result remains one Object-history step.
- Added a regression fixture using a half-sheet mirrored across X and confirmed the evaluated mesh solidifies to closed topology.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#115**; squash merge `70831c5a24d975417c81adb16d6e56a76d4191cc`.
- Final PR Topology regression run **35723194132 PASS**.


## 2026-09-22 — v0.36.18.428 Symmetry / Bisect foundation

- Development resumed after the Beta 4 freeze with the next Phase D construction tool.
- Audited existing Mirror first: it remains the authoritative non-destructive origin-based mirror modifier and is not replaced.
- Added destructive Object-mode Symmetry / Bisect as a separate Tool Session.
- Foundation uses the object local origin plane on X, Y or Z.
- Keep + / Keep − clips polygon faces against the selected plane using shared edge-intersection vertices.
- Mirror kept half optionally reflects the clipped result through the existing applyMirror path, welding coincident centre-plane vertices.
- Bisect-only leaves the cut boundary open by design; Mirror produces the symmetric welded shell/surface result.
- Session provides live translucent result preview plus visible symmetry plane, Cancel and Apply.
- Apply is one Object-history step and commits back into the active editable mesh.
- Existing non-destructive Mirror must be turned off before launching to avoid double-mirror ambiguity.
- Frozen Beta 4 remains exactly v0.36.18.427 and is regression-protected.
- Released via PR **#114**; squash merge `72a30c2f5799d048235684e326da8fdf3a71fa2c`.
- Final PR Topology regression run **35721391817 PASS**.


## 2026-09-22 — Beta 4 freeze at v0.36.18.427

- User requested a Beta 4 release after hands-on approval of the Edge Extrude workflow through .427.
- Frozen source main commit: `ec45b3ba208ef3ffa40015d7a3b62666c63f379e`.
- Snapshot includes the current app shell, src, tests, docs and release assets under `/beta-4/`.
- Fixed Pages URL: https://crisbezz.github.io/BoxLab/beta-4/
- Beta 4 captures post-Beta-3 Phase D work including Sweep, Array/Solidify/Shell/Revolve Tool Sessions and Edge Extrude ribbon/axis/plane/selection-handoff workflows.
- `/beta-4/` is now intended to be immutable during normal development.
- Beta 4 freeze PR **#113** merged as `2743d9d0e10f8fb9605e1e37ab92f0c53c636837`.
- The snapshot reuses the exact v0.36.18.427 blobs/tree; frozen source regression run **35713131703 PASS**.


## 2026-09-22 — v0.36.18.427 Edge Extrude selection handoff

- Hands-on .426 exposed a workflow break: after an extrusion, the new outer edge stayed selected but could not be deselected by tapping while Edge Extrude owned the viewport.
- Edge Extrude now owns tap-selection semantics while armed instead of treating every no-drag pointer gesture as a cancelled extrusion.
- Tap a selected edge to deselect it; tap a different valid boundary edge to switch selection to it; drag a different valid boundary edge to switch and extrude in the same gesture.
- Extrude and the current Plane/X/Y/Z/Auto constraint remain armed even when the selection becomes temporarily empty.
- This removes the previous Deselect → select edge → Move → Extrude → Plane re-entry loop.
- Ribbon topology, Plane math and one-pull-per-Undo are unchanged.
- Released via PR **#112**; squash merge `387e7d00470e4aa300f0212ceddf9446cdd66fb9`.
- Final PR Topology regression run **35713131703 PASS**.


## 2026-09-22 — v0.36.18.426 Edge Extrude Plane constraint

- User requested free Edge Extrude movement constrained to a plane perpendicular to the grabbed edge.
- Added an Edge-Extrude-only Plane control into the shared transform constraint strip; it is visible only while Edge Extrude is armed.
- Plane origin is the current selected-edge/chain centre and plane normal is the specific edge grabbed to begin the pull.
- Pointer motion is raycast directly onto that plane for free 2D movement while preserving zero along-edge displacement.
- A final projection removes any numerical along-edge component before topology generation.
- Plane mode leaves Free/X/Y/Z/Auto behavior from .425 unchanged.
- Repeated outer-rail selection and one-pull-per-Undo remain unchanged.
- Initial PR regression failure was only a stale .425 transform-upgrade cache-pin assertion; the new .426 Plane tests passed.
- Released via PR **#111**; squash merge `3ecb2d9ba6004a6f6379985e4ae6064ca62356f6`.
- Final PR Topology regression run **35709099628 PASS**.


## 2026-09-22 — v0.36.18.425 Edge Extrude directional constraints

- User approved constrained Edge Extrude so ribbon pulls can produce more regular controlled geometry.
- Edge Extrude now reads the existing shared transform constraint state: Free / X / Y / Z / Auto.
- X/Y/Z are projected perpendicular to the source edge before extrusion, removing any component that would slide along the edge.
- If the chosen world axis is effectively parallel to the source edge, the pull refuses with a clear status instead of generating a sliver.
- Auto evaluates valid perpendicular X/Y/Z candidates and locks to the one that best matches the initial drag direction.
- Free remains the existing unconstrained screen-plane ribbon workflow.
- Axis Snap ON with Free behaves as Auto for Edge Extrude, matching existing Move behavior.
- While Edge Extrude is armed, it owns the viewport pointer drag so normal Move does not steal Pencil input; the shared constraint strip remains interactive.
- Ribbon topology and repeated outer-rail selection from .423/.424 are unchanged.
- Released via PR **#110**; squash merge `44fa20f0f769750b6c956f16ac5d8cb071144fb2`.
- Final PR Topology regression run **35707683401 PASS**.


## 2026-09-22 — v0.36.18.424 Edge Extrude arming hotfix

- First hands-on .423 test showed a valid selected boundary edge with Edge Extrude incorrectly disabled.
- Root cause was UI validation calling boundarySelectionInfo(mesh()) without passing the live selected edge IDs.
- Both button enable/disable sync and the click-to-arm gate now call boundarySelectionInfo(mesh(), selectedEdges()).
- Edge Extrude topology and ribbon generation are unchanged from .423.
- Released via PR **#109**; squash merge `9be062ec965ca8c21e5ea00d1ba784865598e1d6`.
- Final PR Topology regression run **35705932023 PASS**.


## 2026-09-22 — v0.36.18.423 direct Edge Extrude ribbons

- User promoted Edge Extrude ahead of Symmetry and requested fast repeated ribbon-style geometry creation.
- Added direct Edge-mode Extrude for selected boundary edges, connected boundary chains and loose edges.
- Dragging a selected valid edge creates a live quad-strip preview.
- Shared chain vertices are duplicated once so connected selections stay welded.
- The newly created outer rail remains selected after commit and Edge Extrude remains armed for repeated pulls without reselecting or mode switching.
- Boundary validation rejects interior edges and branched selections.
- Each pull is one history step and validates topology before commit; invalid results roll back.
- Edge Extrude is placed in the existing Edge Move row with Edge Slide and Offset Loop.
- Protected multi-object transform remains pinned at v0.36.1.0.
- Initial PR regression failure was only a stale .422 cache-pin assertion; the Edge Extrude topology tests passed.
- Released via PR **#108**; squash merge `e92c11463449f481e6ef84d74f4a00dad8f3775c`.
- Final PR Topology regression run **35704689025 PASS**.


## 2026-09-22 — v0.36.18.422 Revolve Profile Tool Session

- User hands-on passed v0.36.18.421 Solidify/Shell Tool Sessions and advanced with /nextbuild.
- Revolve Profile now uses the shared exclusive Tool Session instead of its private Active Tools drawer-lock implementation.
- New Revolve Profile construction still starts as a normal Object-mode positioning plane; it does not immediately steal the drawer.
- A compact Revolve Profile launcher is available while the construction plane is active.
- Moving/snapping the plane or entering profile editing automatically claims the Revolve Profile Tool Session.
- Session contains Edit Profile, Undo Point, Delete Point, Clear, Segments 3–64 and Apply Revolve.
- Existing Pencil/mouse profile authoring, touch navigation, segment slider ownership, winding/normals, snapping and Apply geometry are unchanged.
- Apply ends the Tool Session and retains the established single-object selection / Boolean tint cleanup.
- Initial PR regressions were stale tests for the retired private drawer-lock contract and old current-build cache pins; tests were updated to protect the shared Tool Session contract instead.
- Released via PR **#107**; squash merge `478f2a8613873c0c3533a3ce82bb7227925e8230`.
- Final PR Topology regression run **35696735145 PASS**.


## 2026-09-22 — v0.36.18.421 Solidify / Shell Tool Sessions

- User hands-on passed v0.36.18.420 Vertex transform ownership and advanced to the next roadmap task.
- Audited Solidify and Shell before migration; they remain separate modelling operations:
  - Solidify: Object-mode open sheet → closed solid.
  - Shell: Face-mode closed solid + selected opening faces → hollow solid.
- Both tools now use the shared exclusive Tool Session UI after launch.
- Idle Object/Face Active Tools remain compact; session controls contain live Thickness plus Cancel / Apply.
- Solidify direct viewport thickness dragging is preserved.
- Shell Apple Pencil thickness-slider ownership / late Safari range guard is preserved.
- Geometry algorithms, object history, selection semantics and protected multi-object transform are unchanged.
- Initial PR regression run `35695668683` failed only because older tests still asserted the retired pre-Tool-Session drawer/button implementation; tests were updated to the new shared-session contract.
- Released via PR **#106**; squash merge `f7ac0b986b01c5441be888d69bfeda88c92299d2`.
- Final PR Topology regression run **35695761384 PASS**.


## 2026-09-22 — v0.36.18.420 Vertex transform ownership

- Hands-on after .419 showed Vertex selection and Bevel worked, while Vertex Move/Scale/Rotate did not; Edge and Face transforms remained good.
- Root cause was Vertex Pick Assist owning viewport pointerdown at document-capture phase and stopping propagation even when a transform was armed.
- Vertex Pick Assist now yields completely whenever Move / Scale / Rotate owns the interaction.
- Ordinary Vertex tap selection, Bevel, Add, Build Edge and other direct Vertex tools remain unchanged.
- Protected multi-object transform remains pinned at v0.36.1.0.
- Released via PR **#105**; squash merge `80677f75d32329a452ccc517ce4d52379d0fb628`.
- Final PR Topology regression run **35695257815 PASS**.


## 2026-09-22 — v0.36.18.419 Array pointer cleanup

- User hands-on passed the .418 Array drawer-ownership fix but reported that free Vertex movement no longer worked afterward.
- The narrow shared-state risk was Array END-copy pointer cleanup: Array captured the viewport pointer during endpoint drag but relied on browser implicit release.
- Array now explicitly releases viewport pointer capture when END-copy drag ends, is cancelled, or is torn down by Apply/mode/session changes.
- Existing OrbitControls restoration remains in the same teardown path.
- Free component Move code is unchanged; protected multi-object transform remains pinned at v0.36.1.0.
- Released via PR **#104**; squash merge `c2b054d418a5c3b7e9f4fdfc747b6109c6c95fcb`.
- Final PR Topology regression run **35691232067 PASS**.


## 2026-09-22 — v0.36.18.418 Tool Session drawer ownership

- User hands-on showed .417 still allowed Active Tools itself to collapse as soon as the Array END copy was touched, even though Array session/source ownership remained armed.
- Root cause was at the shared Tool Session layer: begin() opened the <details> drawer, but there was no contract preventing another interaction path from closing it later in the same live session.
- Tool Session now watches the Active Tools drawer toggle event and reopens it on the next microtask whenever a session is active.
- The guard is generic for Array, Sweep and future Solidify/Shell/Revolve migrations; normal drawer collapse remains unchanged when no Tool Session is active.
- Array endpoint drag math, linked-instance Apply, Object selection and protected multi-object transform remain unchanged.
- Released via PR **#103**; squash merge `5bbe750f4fc21fd85f0d47b7a0117be11072273f`.
- Final PR Topology regression run **35690638630 PASS**.


## 2026-09-22 — v0.36.18.417 Array session ownership during repositioning

- User reported Array Tool Session dropped back to normal Object Active Tools when selecting/repositioning the array object.
- Removed the old preview cancellation rule for temporary active-object changes while Array remains in Object mode.
- Array now restores its original preview source if selection changes during an armed preview and reasserts the `array` Tool Session if displaced.
- Endpoint preview pointer-down moved to document capture level (canvas target only) so Array can win before ordinary object selection.
- Array still exits on Apply, Cancel, or explicitly leaving Object mode.
- Released via PR **#102**; squash merge `58e65c14d04ce3f8ebc21f98b4860373007a3126`.
- Final PR Topology regression run **35689604956 PASS**.

## 2026-09-22 — v0.36.18.416 Array Tool Session migration

- Migrated existing Linear Array onto the reusable exclusive Tool Session UI introduced for Sweep.
- Replaced the permanently expanded Object-mode Array block with one compact Array launcher.
- Active Array preview now owns Active Tools and shows only Direction, Count, viewport endpoint guidance, Cancel and Apply Array.
- Cancel and Apply both end the Tool Session and restore normal Active Tools.
- Preserved endpoint-vector preview/dragging, Free/X/Y/Z constraints, linked-instance commit, one scene-history snapshot and Pencil Count handling.
- No Array geometry or linked-instance engine rewrite.
- Released via PR **#101**; squash merge `00f555ed3475c11194c131aca9599db8280a7536`.
- Final corrected PR Topology regression run **35689094456 PASS**.

## 2026-09-22 — v0.36.18.415 fresh Sweep placement and immediate Move

- Fixed fresh Add → Sweep profile plane spawning at world origin inside the default cube.
- Fresh Sweep now creates a camera-facing profile plane just in front of the current active mesh bounding sphere, toward the camera.
- Fresh Sweep automatically arms real Move on the next frame so repositioning is immediately available without reselecting the construction object.
- Selected Face/Edge Sweep placement remains unchanged and still comes directly from the selected source geometry.
- Released via PR **#100**; squash merge `69299520f61b36186d121026f8e27b807889db46`.
- Final corrected PR Topology regression run **35688505420 PASS**.

## 2026-09-22 — v0.36.18.414 Follow Edges root-cause fix

- Found the actual reason Follow Edges would not activate: `hotRailHit` and `railSnapRefs` had been lost from the module-level state declaration while the code still referenced them.
- This caused a runtime `ReferenceError` at the start of Follow Edges activation, before button state or rail overlay could update.
- Restored both variables at module scope.
- Added regression coverage to protect the rail-state declarations from disappearing again.
- No geometry, picker or Tool Session behaviour changed.
- Released via PR **#99**; squash merge `ac6c3a630757f849962cae832f0b53999d68fbc9`.
- Final PR Topology regression run **35686712355 PASS**.

## 2026-09-22 — v0.36.18.413 atomic selected-profile Follow Edges handoff

- .412 hands-on screenshot proved PATH stage activation succeeded while Follow Edges mode activation did not.
- Reworked selected-profile auto launch so profile loading and Follow Edges activation happen atomically on the same `sweepPath` metadata object.
- `applySelectionProfile({activateFollowEdges:true})` now sets `pathMode='edges'`, `editPath=true`, `sessionStage='path'`, refreshes rail refs and syncs path buttons before save/render events.
- Removed the fragile follow-up `setPathMode()` / `setSweepStage()` re-lookup from the auto launch queue.
- Manual Use Selection behaviour remains profile-only.
- Released via PR **#98**; squash merge `e30e895e82453e85d3b8ac4e97dbfb0ebdc0a82f`.
- Final corrected PR Topology regression run **35686329704 PASS**.

## 2026-09-22 — v0.36.18.412 hard Follow Edges active-state indicator

- User reported .411 still did not visibly light Follow Edges.
- Added a dedicated `aria-pressed="true"` selected-state selector with `!important` styling.
- Active Follow Edges / Draw Path buttons now change their visible label to include `· Active`.
- Candidate rail guide is fully opaque white for maximum contrast over shaded surfaces.
- No Sweep picker, geometry or Tool Session behavior changed.
- Released via PR **#97**; squash merge `01784ed914e1351da3c3d84af6bafefb576ca654`.
- Final corrected PR Topology regression run **35685824200 PASS**.

## 2026-09-22 — v0.36.18.411 Follow Edges explicit state and rail visibility

- User reported .410 Follow Edges still did not visibly light as active and internal Knife-cut rails remained invisible on shaded faces.
- Added immediate path-mode button synchronization via `syncPathModeButtons()` plus `aria-pressed` state.
- Added explicit Sweep active-button styling so Follow Edges visibly highlights when selected.
- Changed candidate rail guide to render without depth testing, preventing coplanar topology lines from disappearing into shaded faces.
- Kept .410 dedicated edge-only picker and all Sweep geometry behaviour unchanged.
- Released via PR **#96**; squash merge `57186abed6bf6daff3015b7d3d01e7601fe74062`.
- Final corrected PR Topology regression run **35684868346 PASS**.

## 2026-09-22 — v0.36.18.410 Follow Edges edge-only picker

- Fixed .409 regression where Follow Edges could fail because the generic snapper returned a Vertex near edge endpoints.
- Added dedicated edge-only rail picking for Follow Edges.
- Hot-edge preview and click selection now use the exact same edge-only picker.
- Cached rail reference meshes during active Follow Edges to avoid cloning them on every Pencil hover event.
- Draw Path retains the generic Vertex/Edge/Face snapper.
- .409 rail contrast remains unchanged.
- Released via PR **#95**; squash merge `19652f2ecff87f9de5a75fe0aaa678e132b88ee0`.
- Final corrected PR Topology regression run **35684334992 PASS**.

## 2026-09-22 — v0.36.18.409 Sweep rail contrast and hot-edge feedback

- User confirmed .408 exposed internal rail edges but requested stronger selectable-path contrast.
- Added three rail states in PATH → Follow Edges: bright candidate edge network, distinct hot edge under Pencil/cursor, and strong cyan accepted rail.
- Hot-edge detection uses the same forced external edge snap used by Follow Edges, so hover feedback matches the edge that would be selected.
- Hot state clears on mode/stage exit and Sweep Apply/exit.
- No Sweep geometry, snap logic or Tool Session structure changed.
- Released via PR **#94**; squash merge `1ee7a5ff1fe2b6105d6cb26eebcef6a8484b96b8`.
- Final corrected PR Topology regression run **35683804432 PASS**.

## 2026-09-22 — v0.36.18.408 Sweep Follow Edges rail guide

- User passed .407 and reported that internal topology edges were pickable by Follow Edges but not visible, making Knife-cut rails difficult to use.
- Added a temporary rail-edge overlay built from the same evaluated snap-reference meshes used by Follow Edges.
- The overlay includes internal mesh edges as well as boundaries, so Knife/Loop Cut topology can be followed visually.
- Rail guides appear only in PATH → Follow Edges and disappear automatically in PROFILE, Draw Path, FINISH, Apply, or Sweep exit.
- No Sweep geometry, path-selection or Tool Session behaviour changed.
- Released via PR **#93**; squash merge `e2bdaaa18b803fce0adb7d3ef4b63c8dad64b455`.
- Final PR Topology regression run **35682072137 PASS**.

## 2026-09-22 — v0.36.18.407 Sweep local face-winding unification

- User passed the .406 Tool Session UX but reported one remaining isolated Sweep backface.
- Added adjacency-based face-winding unification across all generated Sweep faces.
- Shared-edge neighbours are forced to traverse their common edge in opposite directions, repairing local reversed quads/triangles.
- Closed capped Sweeps then retain the .405 signed-volume check to orient the now-consistent shell outward globally.
- Open/uncapped Sweep surfaces receive local consistency only.
- No UI or Sweep shape/path behaviour changed.
- Released via PR **#92**; squash merge `9eaf20a927aa0c87f27e19df1ade2026b1453fad`.
- Final corrected PR Topology regression run **35680632722 PASS**.

## 2026-09-22 — v0.36.18.406 Tool Session UI foundation + Sweep UX

- Audited Sweep, Revolve, Array, Boolean, Solidify, Shell and the shared Active Tools architecture after the user reported that Sweep had become difficult to navigate.
- Confirmed the root UX issue: complex tools independently append persistent controls into the same mode-tools containers, so unrelated Object controls accumulate and bury the active workflow.
- Added reusable `tool-session-ui.js` with an exclusive Active Tools host; an active session hides normal drawer content and restores prior drawer state on exit.
- Migrated Sweep as the first Tool Session client.
- Reorganized Sweep into **PROFILE / PATH / FINISH** stages with only one stage visible at a time.
- Promoted Face/Edge contextual launch to a compact **Sweep** button near the top of the active component tools.
- Face/Edge → Sweep now auto-loads the selected profile and opens directly on PATH with Follow Edges active; Object Add → Sweep starts on PROFILE.
- Apply Sweep ends the session and restores normal Active Tools.
- Kept .405 Sweep geometry/topology behaviour unchanged; this build is UI ownership/workflow only.
- Released via PR **#91**; squash merge `84bb7c68af215560061fda034f723d42be5dce2a`.
- Final corrected PR Topology regression run **35680137829 PASS**.

## 2026-09-22 — v0.36.18.405 Sweep shell normal unification

- User confirmed .404 selected-profile anchoring was correct but the final closed Sweep shell still displayed flipped normals.
- Added signed-volume validation for closed capped Sweep shells.
- If the generated shell has negative signed volume, all generated faces are reversed once before EditableMesh creation.
- This provides a Sweep-specific final Unify Normals pass without depending on source face winding or anchor orientation.
- Open or uncapped Sweep surfaces remain untouched.
- .404 profile-anchor/path behaviour remains unchanged.
- Released via PR **#90**; squash merge `5076c8ee5fa268bc6fa0722a3796f2e766b86bc5`.
- Final PR Topology regression run **35678568877 PASS**.

## 2026-09-22 — v0.36.18.404 selected-profile Sweep anchor

- Fixed Face/Edge-loop Sweep starting from the profile centroid before reaching the selected Follow Edge path.
- Added a profile anchor index for selected-profile Sweep.
- First Follow Edge selection chooses the nearest profile vertex and rail endpoint, translates the Profile Plane so they coincide, and rebases the swept section around that vertex.
- Removes the unwanted centre-to-edge lead-in while preserving the selected profile's exact shape and offset.
- Default Circle/Rectangle Sweep remains centre-anchored.
- Released via PR **#89**; squash merge `4b3b1c09e52341e0bc02e2c4f9614be919130e59`.
- Final PR Topology regression run **35678133922 PASS**.

## 2026-09-22 — v0.36.18.403 closed Sweep profile node insertion

- Fixed inability to insert a new node into a closed Sweep profile.
- Root cause was a missing `segmentDistance()` helper used only by closed-profile edge hit-testing.
- Added a clamped 2D point-to-segment distance implementation in `sweep-path.js`.
- Open-profile authoring, profile closure, Sweep topology and path behaviour remain unchanged.
- Released via PR **#88**; squash merge `e5b62249db5d80ed6148f02b52bb20563c088c4b`.
- Final PR Topology regression run **35675477945 PASS**.

## 2026-09-22 — v0.36.18.402 Sweep direct selection launch

- Fixed the .401 workflow flaw where Face/Edge selection was lost when entering Object mode before Add → Sweep.
- Added **Sweep from Selection** directly to Face and Edge Active Tools.
- The component profile is captured before object-mode handoff, then Sweep is created and the saved profile is applied automatically.
- Existing Use Selection profile validation/alignment remains authoritative; this build changes the launch path rather than duplicating profile conversion logic.
- Released via PR **#87**; squash merge `1c512bd2b3c487e9839b0021e8607473340910f4`.
- Final corrected PR Topology regression run **35674435817 PASS**.

## 2026-09-22 — v0.36.18.401 Sweep Use Selection profile

- User hands-on passed the .400 Sweep edit-ownership fixes and requested the next Sweep build.
- Added **Use Selection** as the fourth Sweep profile source beside Circle / Rectangle / Draw.
- A single selected Face or connected closed selected Edge loop is captured before Add → Sweep changes the active object.
- Use Selection aligns the Profile Plane to the source geometry and converts the exact planar outline into an editable closed Draw profile.
- Closed Edge-loop validation requires a single cycle; invalid/non-planar selections are rejected conservatively.
- Source geometry is snapshotted only for profile construction and remains unchanged.
- Released via PR **#86**; squash merge `0b6ae224f717c9c95a408f1db9bc77ad52c09169`.
- Final corrected PR Topology regression run **35673404201 PASS**.

## 2026-09-22 — v0.36.18.400 Sweep edit ownership

- Fixed Draw Profile remaining/returning Closed during free profile authoring; selecting Draw now explicitly opens the custom profile until the user chooses Closed.
- Fixed point 4+ authoring so custom profiles continue to append normally.
- Added explicit transform disarm when Sweep Profile or Path editing takes viewport ownership.
- Added a Sweep `editing` state and made `transform-upgrade.js` yield while Sweep is editing, preventing Move/Scale/Rotate from stealing Pencil/mouse gestures.
- Preserved touch orbit/pan/pinch and all .399 Sweep topology/normal work.
- Released via PR **#85**; squash merge `45419ad01b683d46c26179497bafb186ca90f632`.
- Final PR Topology regression run **35672719322 PASS**.

## 2026-09-22 — v0.36.18.399 Sweep side-normal correction

- User confirmed .398 geometry was much improved but side-face normals were flipped.
- Replaced Sweep side winding based only on whole-profile clockwise state with an edge-local outward-normal test.
- Each side quad now compares its actual 3D normal against the outward direction of the corresponding profile edge mapped through adjacent Sweep frames.
- Concave corners and changing path directions can therefore orient each side face independently while preserving authored profile order.
- .398 exact start ring and concave-cap triangulation remain unchanged.
- Released via PR **#84**; squash merge `0884f4d1acad778c9cbca1f93526a072eda495da`.
- Final PR Topology regression run **35663109891 PASS**.

## 2026-09-21 — v0.36.18.398 Sweep concave profile + exact start ring

- Added **Edge Extrude** to the persistent modelling backlog.
- Fixed Sweep start geometry so ring 0 is generated directly from the Profile Plane U/V basis and exactly matches the authored profile.
- Added Profile Plane normal into Sweep frame construction while preserving the established transported-frame logic for later rings.
- Replaced concave closed Sweep cap n-gons with proper polygon triangulation, avoiding fan-triangulation overlap on C-shaped profiles.
- Oriented start/end cap triangles to the actual path direction to prevent inside-out end faces.
- Left global mesh triangulation untouched; the fix is scoped to Sweep.
- Regression refinement: convex profiles keep their existing single-cap topology; only concave profiles use triangulated caps.
- Released via PR **#83**; squash merge `eb56d9df1c08fbbd3ba95112378f0a6e8397eb47`.
- Final corrected PR Topology regression run **35659397337 PASS**.

## 2026-09-21 — v0.36.18.397 Sweep profile orientation fix

- Fixed custom Draw profile closure jumping by preserving authored profile point order exactly.
- Removed automatic clockwise profile reversal from `cleanProfile()`; winding is now handled only when generating side/cap face order.
- Fixed mirrored profile editing when the Sweep path leaves opposite the Profile Plane normal.
- Added an orientation-preserving initial Sweep frame that keeps Profile Plane U/V axes visually stable for both path directions.
- Added regression coverage for clockwise point order, last→first closure integrity and left/right orientation preservation.
- Released via PR **#82**; squash merge `2cc8e9d89a87ef080411d61afd8f8d2535e97a42`.
- Final PR Topology regression run **35594079715 PASS**.

## 2026-09-21 — v0.36.18.396 Sweep Draw Profile refinement

- Reduced the initial Sweep Profile Plane from 4×4 units to 0.7×0.7 units, close to the default Circle profile footprint.
- Fixed the custom Draw profile two-point trap: open-profile drawing now appends point 3 and beyond naturally instead of interpreting the 2-point line as a closed loop segment.
- Added explicit Open / Closed profile state.
- Open profiles preview from two points as swept surfaces with no seam or caps.
- Closed profiles require 3+ points and retain the normal closed-section Sweep with optional end caps.
- Circle/Rectangle stay closed; Edit Profile preserves closure when converting built-ins to editable points.
- Added focused .396 regression coverage for open two-point Sweep surfaces, closure validation and runtime UI contract.
- Released via PR **#81**; squash merge `37ad0fc5c1dea9e6ba5281b93f9e72ba366d4b69`.
- Final PR Topology regression run **35593175171 PASS**.

## 2026-09-21 — v0.36.18.395 Sweep Profile + dual path

- User hands-on passed the .394 Sweep redraw/3D Geometry Snap build and chose to continue Sweep rather than move to another construction tool.
- Reframed the existing Sweep construction plane as the **Profile Plane**; no visible path construction plane is required.
- Generalized sweep-core.js from circular tubes to arbitrary closed 2D profiles through buildSweepProfile(), while retaining buildSweepTube() as a compatibility wrapper.
- Added Circle, Rectangle and custom Draw profile modes with live preview and pre-Apply profile editing.
- Added two interchangeable path sources: **Follow Edges** for SketchUp-style connected existing-edge routes and **Draw Path** for free 3D path authoring.
- Follow Edges deliberately works independently of the Geometry Snap toggle; Draw Path retains optional external Vertex/Edge/Face snapping.
- Free Draw Path uses an invisible view-facing working plane through the current path end instead of showing a path plane.
- Profile and Path construction remain live/editable until Apply; Apply still produces ordinary editable mesh.
- Added focused regression coverage for arbitrary-profile straight/bent Sweep generation and the profile-first dual-path runtime contract.
- Protected transform, Through, Shell/Solidify and frozen Beta 3 behavior remain untouched.
- Released via PR **#80**; squash merge `1855f447784d13067088dd179f472d4d2cc8e000`.
- Final PR Topology regression run **35583108817 PASS**.

## 2026-09-21 — v0.36.18.394 Sweep Apply redraw + Geometry Snap

- Fixed post-Apply Sweep viewport state: generated geometry now redraws immediately instead of leaving the construction plane visible until object selection changes.
- Added Geometry Snap to Sweep path authoring.
- Vertex targets take priority, then Edge, then true Face ray-hit points.
- Free drawing still falls back to the Sweep construction plane when no geometry target is acquired.
- Sweep path point storage extended from plane `u/v` to plane-local `u/v/w`, enabling snapped points to follow existing mesh geometry in 3D while remaining relative to the construction plane transform.
- Geometry Snap works on both point creation and point drag.
- Preserved touch navigation, live preview, Radius/Sides/Caps, parallel-transport frames and post-Apply single-selection/Boolean tint cleanup.
- PR **#79**, squash merge `375cced7bc5c2fd2e863cd16f631c3d2e2b379d9`.
- PR Topology regression **35574552705 PASS**.


## 2026-09-21 — v0.36.18.394 Sweep Apply redraw + 3D geometry snapping

- Fixed Sweep Apply stale-view bug: construction plane no longer remains visible until another object is selected.
- Apply Sweep now disposes its overlay, hides construction controls and forces an immediate viewport rebuild like Revolve.
- Geometry Snap during Sweep Path editing now targets visible external vertices, edges and face hit-points.
- Sweep path coordinates expanded from planar u/v to construction-local u/v/w, allowing snapped path points to sit off-plane and create a true 3D path.
- Free drawing remains construction-plane based when Geometry Snap is off or no target is found.
- PR #78; squash merge `300bf36b75306e413afc70760e4dc020f599a0ad`.
- Final PR regression run **35569411629** passed.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.


## 2026-09-21 — v0.36.18.393 Sweep Path foundation

- Released Phase D **Sweep Path** foundation from PR #77; squash merge commit: `403cfc677fa934f2c9c3b9a7a25fe50bf9c559f8`.
- Added Add → Sweep Path construction object with movable/snappable construction plane and Pencil/mouse path authoring.
- Touch remains dedicated to normal BoxLab navigation while path editing is active.
- Added live circular-section preview with Radius, Sides 3–24 and Caps On/Off controls; Pencil sliders use the established Safari late-event guard.
- New `sweep-core.js` builds quad-ring tubes using parallel-transport section frames to reduce section flipping along bent paths.
- Apply converts to ordinary editable mesh, owns one mesh-history step, returns to authoritative single-object selection and resyncs Boolean viewport tint.
- V1 deliberately stays shallow: planar path + circular section; custom profiles, arbitrary 3D paths, twist/banking and corner fillets are deferred.
- Final PR regression run **35568629908** passed; post-merge main regression run **35568666909** passed.
- `src/multi-object-transform.js?v=0.36.1.0` remained untouched.


This is the concise append-only development log used for cross-chat continuity.

Do not record every tiny cache-busting or temporary deployment workflow commit. Record meaningful modelling, architecture, UI, stability, and release milestones.

Newest entries should be added at the top.

---

## 2026-09-21 — v0.36.18.392 Revolve Apply selection cleanup

- User observed an inactive cube showing amber while the freshly applied Revolve mesh was grey.
- Confirmed amber originated in Boolean/Object multi-selection viewport tinting, not Revolve geometry/material generation.
- Added authoritative Object-selection `single(id)` API to leave Multi mode and select one active object cleanly.
- Revolve Apply now resets to the active Revolve object and immediately resyncs Boolean UX, clearing stale operand tint.
- Valid Boolean A/B selection behavior is preserved.

## 2026-09-21 — v0.36.18.391 Revolve Active Tools auto-open

- User reported that after positioning/interacting with a Revolve Profile plane, Active Tools stayed closed and hid the Revolve-specific controls.
- Added construction-plane interaction detection from its initial vertex signature.
- Move / Rotate / Scale / Geometry Snap changes now automatically open and retain Active Tools for the active Revolve construction.
- Entering Edit Profile also opens/retains Active Tools.
- Uses the existing Shell/Solidify `data-keep-open` drawer contract; Apply or leaving construction releases the lock.
- No modelling-core changes.
- Released from PR **#75**; squash merge commit: `fd6b27f79fd1a78d51b3a96ba618e36ef1f43b34`.
- Final Topology regression passed in workflow run **35563645227**.

## 2026-09-21 — v0.36.18.390 Revolve profile point editing

- Continued from the successful .389 Revolve refinement baseline.
- Added explicit profile point selection and selected-point highlight.
- Tapping/pressing close to an existing profile segment inserts a new point into that segment rather than forcing append-only editing.
- Tapping elsewhere still appends to the profile end.
- Added Delete Point for selected profile points.
- Undo/Clear now clear stale selected-point state safely.
- Preserved touch navigation, plane positioning/snap, live preview, 3–64 segments, normal unification and Apply behavior.
- Released from PR **#74**; squash merge commit: `eb46b48f221ceea87432fdd7725afbd39977ece7`.
- Final Topology regression passed in workflow run **35563284475**.

## 2026-09-21 — v0.36.18.389 Revolve refinement

- .388 Revolve Profile UI received a strong hands-on pass; four refinements requested.
- Revolve Profile now starts in positioning mode (Edit Profile off), allowing Object Move/Rotate/Scale and existing Geometry Snap before drawing.
- Touch navigation remains live while profile editing: one-finger orbit and two-finger pan/pinch pass through; Pencil/mouse handles profile authoring.
- Segments minimum lowered from 6 to 3.
- Replaced per-face radial normal flipping with shared-edge winding unification plus one global shell orientation decision, fixing inward normal bands on concave profiles.
- Preserved live profile preview, plane-relative UV points, Apply behavior and legacy loose-edge Revolve.
- Released from PR **#73**; squash merge commit: `f733c23f7f15e861a10b2e607e54c684de9b92b5`.
- Final Topology regression passed in workflow run **35559953090**.

## 2026-09-21 — v0.36.18.388 live Revolve Profile construction

- User identified the missing authoring layer for Revolve: free Add Vertex points could not guarantee a coplanar profile or obvious revolve axis.
- Added Add → Revolve Profile construction object.
- Construction object is a plane whose left edge is visibly blue and authoritative as the revolve axis.
- Profile points are normalized plane UV coordinates; Pencil/finger taps add points and direct drags reshape them while remaining on the plane.
- Profile chain connects automatically and points near the axis snap exactly to it.
- Live translucent revolve preview updates continuously when profile points or Segments change.
- Edit Profile can be toggled off for navigation and back on for further shaping.
- Added local Undo Point/Clear controls before Apply.
- Revolve core now exposes arbitrary-axis `buildRevolveFromPoints`; .386 loose-edge Revolve path remains intact.
- Apply converts construction to ordinary mesh in one history step.
- No changes to protected Array, Through/Extrude or multi-object transform.
- Released from PR **#72**; squash merge commit: `f6b0870e8651c212b8b3af83fb8ebbd0d068b086`.
- Final Topology regression passed in workflow run **35558948343**.

## 2026-09-21 — v0.36.18.387 component Delete key routing

- Extended Delete/Backspace UX from Object mode to Face, Edge and Vertex modes.
- New router delegates to the existing delete buttons instead of reimplementing deletion.
- Preserves each mode's established history/topology behavior and Object Multi/Group semantics.
- Ignores editable text controls and modified-key shortcuts.
- No protected modelling core changes.
- Released from PR **#71**; squash merge commit: `b955b9077a3ac0ec1290b04bee7d45d787ca8449`.
- Final Topology regression passed in workflow run **35557933604**.

## 2026-09-21 — v0.36.18.386 Revolve foundation

- .385 inward Extrude cut passed hands-on testing.
- Added Edge-mode Revolve for a standalone selected loose-edge open chain.
- Revolve axis is X/Y/Z through Object Origin; full 360° with Segments 6–64.
- Preview is non-destructive with translucent fill, wire overlay and axis guide.
- Axis/Segments rebuild preview live; Segments uses hardened Pencil range handling.
- Core orders the loose-edge chain, rejects branches/closed/partial/mixed profiles, and collapses points on the axis to single pole vertices.
- Apply replaces the loose profile with ordinary editable revolve faces in one history step and uses existing Object Manager save propagation.
- No changes to Array, inward Extrude/Through, or protected multi-object transform.
- Released from PR **#70**; squash merge commit: `2984d6dd4f3173652cdbbb2061cc736e3a77bba5`.
- Final Topology regression passed in workflow run **35557272061**.

## 2026-09-21 — v0.36.18.385 inward Extrude side-wall cut

- .384 endpoint-vector Array passed hands-on testing.
- Investigated inward Face Extrude screenshot artifact: duplicate extrusion walls overlapped existing exterior side faces.
- Reused the existing sequential region/Through topology classifier instead of inventing a parallel cutter.
- Sequential fallback now takes over immediately once the drag is meaningfully directed inward toward the opposing shell, rather than waiting for 55% travel.
- Added partial inward cut rebuild: clips swept exterior side-face regions, skips duplicate walls on exterior slots, adds recess walls on interior slots, and caps at the current depth.
- Mature Through kernel remains preferred when the drag reaches the far side.
- Partial and Through commits run through closed-topology gate and rollback on failure.
- Removed early history push at takeover; successful pointer-up is the history commit point.
- Outward Extrude and connected multi-face Extrude are unchanged.
- Released from PR **#69**; squash merge commit: `a1cbd03d782cb03529447af292c379ab731051bc`.
- Final Topology regression passed in workflow run **35548866964**.

## 2026-09-21 — v0.36.18.384 endpoint-vector Array UX

- Reworked Array from axis+spacing to source→endpoint vector workflow.
- Array opens with exactly one END duplicate preview (Count=2).
- END copy supports direct Free/X/Y/Z movement; Free uses the camera plane and constrained modes adjust world-axis components.
- Count fills linked preview/committed copies evenly using endpoint * i/(Count-1).
- Removed Spacing slider as primary UX.
- Apply remains one history step and linked-instance creation still uses the established Object Manager API.
- Next task remains inward/negative Face Extrude cutting.
- Released from PR **#68**; squash merge commit: `daa7ef47b34a79f1b00c167217d4eeb116a349ea`.
- Final Topology regression passed in workflow run **35547016085**.

## 2026-09-21 — v0.36.18.383 Array direct spacing drag

- .382 Linear Array passed initial iPad hands-on testing.
- Added direct Pencil/finger spacing drag on any preview instance.
- Drag projects the selected world X/Y/Z axis into screen space and converts pointer movement back to world spacing.
- Later preview copies divide movement by their array index so the grabbed copy follows the gesture while all copies remain equally spaced.
- Orbit controls pause only during the direct spacing gesture and restore on release/cancel.
- Slider remains synchronized and available when the axis is too camera-aligned for a stable screen drag.
- No history is created during preview drag; Apply Array remains one scene-history operation.
- Next task is inward/negative Face Extrude cutting behavior.
- Released from PR **#67**; squash merge commit: `5babe7eb2905fe12907d0a6edc61b02d495cba73`.
- Final Topology regression passed in workflow run **35545622459**.

## 2026-09-21 — v0.36.18.382 Phase D Linear Array foundation

- Added Object-mode Linear Array using the existing linked-instance Object Manager path.
- Count is total objects including the source; spacing is world-space; axes X/Y/Z are supported.
- First tap arms a non-destructive translucent preview; Apply creates linked instances.
- Apply uses one Object-scene history snapshot and reactivates the source.
- Generated instance placement is committed through the existing live-mesh + saveActive instance derivation path rather than protected transform code.
- Count/Spacing Pencil sliders use explicit Pencil mapping and late native Safari event protection.
- Active Tools stays open while the preview is armed.
- No edits to protected multi-object-transform, Through, Boolean, Solidify core or Shell core.
- Released from PR **#66**; squash merge commit: `6871a0dbdfaa338b2528d53254c97d98bdd65158`.
- Final Topology regression passed in workflow run **35545288948**.

## 2026-09-21 — v0.36.18.381 Solidify preview backface visibility

- User screenshots confirmed the remaining preview visibility issue was Solidify, not Shell.
- Replaced Solidify's single translucent preview Mesh with a Group containing translucent DoubleSide fill plus brighter DoubleSide wireframe overlay.
- Disabled depth test/write on both preview layers so generated inner/back faces remain visible through the source sheet.
- Preserved direct preview thickness dragging by switching raycast to recursive Group traversal and using the hit child mesh matrix for normal projection.
- Preview disposal now traverses child meshes and disposes shared resources safely.
- No Solidify topology, offset solver, history or linked-instance behavior changed.
- Released from PR **#65**; squash merge commit: `a4ee4ae3779586be82365ee98f169527d49fb08d`.
- Final Topology regression passed in workflow run **35544854000**.

## 2026-09-21 — v0.36.18.380 Shell preview backface visibility

- User requested better Shell preview visibility from the reverse/interior side.
- Replaced wireframe-only preview with a two-layer Group: translucent DoubleSide fill plus brighter DoubleSide wireframe overlay.
- Both preview layers render depth-test/write disabled so inner/back faces remain legible through the source mesh.
- Preview disposal now traverses child meshes and disposes shared resources safely.
- No Shell topology, thickness, selection, history or Apply behaviour changed.
- Released from PR **#64**; squash merge commit: `39252588b9e7530fd276a0715739a040efc87d59`.
- Final Topology regression passed in workflow run **35544543433**.

## 2026-09-20 — v0.36.18.379 Shell Pencil late-native guard

- .378 still snapped to 0.01 under Apple Pencil hands-on testing.
- Pencil coordinate mapping was correct; Safari could emit a late native range input/change after pointerup and overwrite the value.
- Shell now retains Pencil ownership of the thickness value through two animation frames after release.
- Input/change handlers enforce the Pencil-owned value before updating output/preview.
- Finger/touch remains native after Pencil ownership clears.
- No topology/history/selection changes.
- Released from PR **#63**; squash merge commit: `13d9ea9aa3c58333abfc660dcd990ed26363d94f`.
- Final Topology regression passed in workflow run **35507874713**.

## 2026-09-20 — v0.36.18.378 Shell Pencil thickness parity

- User reported Shell Thickness worked correctly with finger input but Apple Pencil snapped the value back to 0.01.
- Root cause scope was the native iPad range-control Pencil path, not Shell topology.
- Added an explicit Pencil-only pointer handler on the Shell Thickness range.
- Pencil X position maps to slider bounds, clamps to min/max, snaps to the same step, and dispatches the normal input event so preview/output use the existing pathway.
- Pointer capture stabilizes Pencil dragging beyond the narrow slider track.
- Finger/touch native range behaviour remains unchanged.
- No Shell core, Solidify core, selection, drawer or history logic changed.
- Released from PR **#62**; squash merge commit: `4b50d300a72c41c774f74eb55daf18a220f8acdd`.
- Final Topology regression passed in workflow run **35507531277**.

## 2026-09-20 — v0.36.18.377 closed-solid Shell

- Phase D advanced from open-sheet Solidify to closed-solid Shell.
- Shell consumes the existing Face selection bridge rather than creating a parallel selection system.
- Selected Face(s) become openings; remaining solid Faces are compacted to an open manifold sheet and sent through the shared .374 Solidify offset/miter core.
- Added non-destructive preview with Shell Thickness and Apply Shell.
- Adjacent selected Faces can form one larger opening.
- Closed-input, loose-topology, all-faces-selected and invalid-opening guards run before live mutation.
- Final output is validated as watertight; Apply is one Object-scene history step and uses Object Manager save propagation.
- Added cube one-face and adjacent-two-face automated fixtures plus refusal cases.
- Released from PR **#61**; squash merge commit: `91de88416823050100ed3df3a40ec8886087095f`.
- Final Topology regression passed in workflow run **35507041994**.

## 2026-09-20 — v0.36.18.376 Solidify Active Tools drawer lock

- User reported that Active Tools collapsed during interactive Solidify thickness dragging, hiding Apply Solidify.
- Root cause path is the shared drawer exclusivity system; it already supports `data-keep-open="true"`.
- Solidify now temporarily claims that existing keep-open contract for the entire armed preview session.
- Active Tools is explicitly reopened if any competing UI path closes it before the preview is applied/cancelled.
- Keep-open ownership is released after Apply/Cancel/invalidation; `drawer-ui.js` remains unchanged.
- No topology, hard-fold, direct-drag or history logic changed.\n- Released from PR **#60**; squash merge commit: `77eab5bb8e441f5ce93801963c432dcf2f12bd86`.\n- Final Topology regression passed in workflow run **35506658206**.

## 2026-09-20 — v0.36.18.375 direct-drag Solidify thickness

- User requested direct interactive thickness control by dragging the translucent Solidify preview itself.
- Added preview ray-picking on the viewport.
- A picked preview face supplies a screen-projected normal axis; Pencil/finger drag along that axis maps to world-space thickness.
- Thickness slider/output remains synchronized for exact numeric fallback.
- OrbitControls is disabled only during the active thickness drag and restored on pointer-up/cancel.
- Preview shows generated inner shell + boundary walls rather than repainting the unchanged source sheet.
- Direct drag remains preview-only: no mesh mutation and no history entry until Apply Solidify.
- The .374 90° hard-fold/miter solver remains authoritative and unchanged.\n- Released from PR **#59**; squash merge commit: `3bc25065adfcc4de8c840c9fd00a6771cb6a2d59`.\n- Final Topology regression passed in workflow run **35506408342**.

## 2026-09-20 — v0.36.18.374 Solidify hard-fold offset + live preview

- User confirmed Solidify worked on flat sheets but reported incorrect thickness around a 90° multi-sheet fold.
- Root cause: the .372 core used a normalized averaged vertex normal, which under-offsets each source plane at hard folds.
- Replaced hard-fold displacement with offset-plane intersection / miter solving.
- Added an explicit 90° two-quad regression fixture requiring full requested thickness to both source planes.
- Added conservative guards for opposed folds, singular plane systems and excessive miters.
- Solidify now uses a two-stage preview workflow: Solidify → live preview; Thickness slider updates non-destructively; Apply Solidify commits.
- Preview cancellation occurs when leaving Object mode or changing active object.
- Preview does not push history or mutate live geometry; final commit remains one Object-scene history step.
- Frozen `/beta-3/` remains unchanged.\n- Released from PR **#58**; squash merge commit: `85046592160df22d8bc12666ddd821cc1c44c13e`.\n- Final Topology regression passed in workflow run **35503005511**.

## 2026-09-20 — v0.36.18.373 visible-version ownership fix

- User observed live main apparently reverting to **v0.36.1.0**.
- Root cause was found in protected `src/multi-object-transform.js`, which contains legacy UI-only lines that stamp `#appVersion` and `document.title` to its own historical module version.
- Transform logic and the protected file/blob were deliberately left untouched.
- The top-bar version label now carries an explicit release-shell version stamp.
- `release-version.js` uses that shell value immediately and its existing observer reasserts the real app version if any older module mutates the label later.
- `version.json` remains the network/source-of-truth confirmation path.
- Phase D Solidify from .372 is unchanged.\n- Released from PR **#57**; squash merge commit: `3a7139dabc09731ffb29bb952c15ef1bb276559f`.\n- PR Topology regression passed in workflow run **35502647303**.

## 2026-09-20 — v0.36.18.372 Phase D Solidify foundation

- Phase D higher-level modelling started from the frozen v0.36.18.371 Beta 3 baseline.
- Audit confirmed no existing Shell/Solidify implementation was present.
- Added Object-mode Solidify for valid open manifold sheets.
- The new topology core duplicates the sheet, offsets the inner shell along averaged area-weighted vertex normals, reverses inner winding, and bridges every open boundary edge with a side quad.
- Input guards reject closed, non-manifold, branched-boundary, inconsistent-winding, duplicate/degenerate and zero-area inputs before mutation.
- Output must validate as a closed consistently wound manifold or the edit rolls back.
- Existing crease weights are mirrored to the inner shell.
- One authoritative Object scene-history checkpoint owns the operation; existing Object Manager save/linked propagation pathway is reused.
- Frozen `/beta-3/` remains untouched.
- Next Phase D slice: closed-solid Shell with selected-face removal, built on this same thickness core.\n- Released from PR **#56**; squash merge commit: `537c83069b749ff8ad8ed7a8887f7dc3e7f5b37a`.\n- PR Topology regression passed in workflow run **35501284867**.

## 2026-09-20 — Beta 3 frozen and published

- User completed the v0.36.18.371 hands-on iPad release gate with a **BIG PASS**.
- Frozen Beta 3 is an exact checkpoint of the approved v0.36.18.371 code-bearing release commit:
  - release commit: `c17fb0f996f406449975a1add5b774eadc30e529`
  - freeze PR: **#55**
  - freeze merge commit: `a227042e2bd2972c96361aedf7840bdcc62c78bb`
- `/beta-3/` was created by reusing the approved release commit's blob/tree SHAs, not by rewriting runtime files.
- Frozen checkpoint contains the approved app assets and source tree, including `index.html`, styles/assets, `src/`, `docs/`, `tests/`, package/version files and the Beta 3 release checklist.
- Live main runtime was not changed by the freeze operation.
- Public checkpoint URL: `https://crisbezz.github.io/BoxLab/beta-3/`
- Frozen Beta 3 should now be treated as immutable except for an explicitly approved emergency release fix.
- Phase D / post-Beta-3 development may resume on live `main`.

## 2026-09-20 — v0.36.18.371 Beta 3 release candidate

- Entered Beta 3 release-candidate hardening after user confirmation that v0.36.18.369 Group Boolean works.
- No new modelling feature was added.
- App/version metadata advanced to **v0.36.18.371**; .370 remains an abandoned, unmerged experimental branch.
- Added `BETA3_RELEASE_CHECKLIST.md` as the persistent hands-on release gate for iPad Safari.
- Added `tests/beta3-release-candidate-371.test.mjs` to guard the release-sensitive architecture and frozen pins:
  - linked-instance/navigation baseline `multi-object.js?v=0.36.18.367`
  - persistent inactive-object scene layer
  - authoritative selection-mode bridge
  - authoritative live-mesh publication before render rebuild
  - protected Group transform `object-origin.js?v=0.36.18.355`
  - protected `multi-object-transform.js?v=0.36.1.0`
  - fresh-load component Multi `component-multi-init.js?v=0.36.18.314`
  - mature Through loader pins
  - Clean for SubD `quad-clean.js?v=0.36.18.339`
  - Group Boolean compound path from .369
  - no-service-worker release policy
- Beta 3 scope freeze: fix only reproducible release-blocking regressions until the checkpoint is frozen.
- Planned frozen URL after user approval: `https://crisbezz.github.io/BoxLab/beta-3/`.
- PR **#54** Topology regression passed (`npm test`, workflow run **35495835508**) before merge.
- Released from PR **#54**; squash merge commit: `c17fb0f996f406449975a1add5b774eadc30e529`.

## 2026-09-20 — v0.36.18.369 shell-by-shell Group Boolean + persistent Swap drawer

- User test of .368 showed Group selection/A-B assignment worked, but Cut failed topology validation with boundary/non-manifold edges.
- Root cause: .368 concatenated every Group member into one disconnected EditableMesh and then fed that multi-shell mesh into the existing pairwise Boolean solver, which assumes a single closed solid operand.
- .369 keeps Group members as separate closed shells throughout the Boolean calculation.
- Added `splitConnectedShells()` to split pairwise results back into closed components after operations that can divide a solid.
- Added `solidsInteract()` using real face intersections plus point-in-solid containment so disjoint shells do not enter the pairwise solver unnecessarily.
- Group Cut:
  - starts with each A shell independently
  - applies every B cutter shell to every surviving A shell
  - drops shells that become empty
  - splits resulting geometry into connected shells before the next cutter
- Group Intersect:
  - evaluates every interacting A/B shell pair
  - collects the resulting closed pieces
  - normalizes overlapping result pieces through compound union
- Group Union:
  - incrementally unions only interacting/contained shells
  - genuinely disjoint shells stay separate
  - final closed shells are concatenated only after all pairwise Boolean solving is complete
- Group operand eligibility now validates every member as a closed manifold individually; it no longer uses a disconnected concatenated Group mesh as solver input.
- Result remains one normal editable object and may contain multiple disconnected closed shells where that is geometrically correct.
- User also reported Swap closed Active Tools.
- Boolean A/B UX now marks Active Tools as `keepOpen` while valid Boolean operands exist, explicitly opens it before Swap, and reopens it after active-operand activation.
- Protected linked-instance/navigation baseline `multi-object.js?v=0.36.18.367` remains untouched.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Released from PR **#53**; squash merge commit: `4520d63bb39e0b3b6f61287dd92b423377f3aad9`.

## 2026-09-20 — v0.36.18.368 Group Boolean convenience

- Built the queued Phase C Group Boolean workflow without introducing a Group geometry type.
- Group header selection is additive while Multi is active:
  - select Group A
  - tap Group B
  - both complete Groups become one Multi selection
- Boolean eligibility now accepts either:
  - the existing exactly-two-object workflow, unchanged
  - exactly two complete Groups with no partial/extra selected objects
- Each Group operand is built in memory with the existing `combineEditableMeshes()` Join helper.
- Existing Boolean solver remains authoritative for Union / Cut / Intersect.
- Reference members and locked members are refused.
- Source Group members are hidden only after one authoritative Object scene-history checkpoint.
- Boolean result is a normal unique editable object; no Group metadata is attached to the result.
- Undo can therefore restore original source objects, Group names/hierarchy, visibility and selection through the existing scene-history bridge.
- Existing Boolean A/B panel now understands Group operands:
  - active Group = A / amber
  - other Group = B / blue
  - all member rows and Group headers receive the corresponding A/B cue
  - Swap activates a member of the opposite Group to reverse A/B
- Protected linked-instance baseline `multi-object.js?v=0.36.18.367` remains pinned.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for additive Group selection, Group eligibility, history semantics, A/B UX and protected pins.
- Released from PR **#52**; squash merge commit: `960db8c5d89c987c82c2a95c8ab3dd3a7eccdf04`.

## 2026-09-20 — v0.36.18.367 touch orbit + selection-mode stability

- User confirmed .366 fixed linked Extrude commit/propagation.
- Remaining regressions:
  - after selecting another object with a finger, one-finger navigation became pan and pinch zoom broke
  - selecting/changing mode could still make non-active objects disappear
- Navigation root cause: .364 consumed the touch pointer-up after object activation even though OrbitControls had already received the matching pointer-down.
- OrbitControls therefore retained a stale touch pointer and interpreted the next one-finger gesture as a multi-touch gesture.
- Touch activation now uses the non-consuming path again so OrbitControls always receives pointer-up cleanup.
- .365 persistent inactive scene layer means the old pointer-up suppression is no longer needed to protect inactive bodies.
- Object activation now schedules an additional inactive-layer refresh at microtask + requestAnimationFrame boundaries after the full activation handoff.
- `currentMode()` now reads `__boxlabSelectionBridge.mode()` first, using the DOM active-button class only as fallback.
- This removes a one-render lag where Object → Edge/Face/Vertex could be processed as the previous mode during `saveActive()`.
- .366 authoritative live-mesh publication remains unchanged.
- Protected `object-origin.js?v=0.36.18.355` and `multi-object-transform.js?v=0.36.1.0` remain untouched.
- Added regression coverage for OrbitControls pointer-up visibility, authoritative mode source, post-activation inactive rebuild and protected pins.
- Released from PR **#51**; squash merge commit: `db74acc2c2069c16b583874c67f4051ba1310fc4`.

## 2026-09-20 — v0.36.18.366 authoritative live-mesh bridge timing

- User confirmed .365 fixed ordinary object activation persistence, but two linked-instance regressions remained:
  - Extrude showed all linked peers updating during preview, then the edit snapped back on commit
  - changing from Object mode to Edge mode caused inactive objects to disappear
- Root cause: `__boxlabBridgeState.mesh` was being published indirectly by `EditableMesh.edges()`.
- The multi-object `THREE.Group.add(body)` hook calls `saveActive()` as soon as the new body is added.
- On renders where the core lexical `mesh` had just been reassigned (notably direct Extrude / Inset preview), the bridge could still point at the previous mesh object when `saveActive()` ran.
- Result: screen showed the new mesh, but linked save/propagation could commit the previous mesh and snap the shared source back.
- Mode changes could likewise rebuild inactive linked geometry from stale bridge state.
- `main.js::renderMesh()` now explicitly assigns:
  - `globalThis.__boxlabBridgeState.mesh = mesh`
  - before `clearGroup(root)`
  - before the active body is created/added
- Downstream modules therefore see the exact lexical mesh being rendered in that frame.
- No linked-source algorithm was otherwise changed.
- Persistent inactive scene layer from .365 remains in place.
- Linked creation/propagation from .363 and touch isolation from .364 remain in place.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for publish-before-clear/body-add ordering and protected pins.
- Released from PR **#50**; squash merge commit: `40e25b3425971a970ac97641734517be91e6df42`.

## 2026-09-20 — v0.36.18.365 persistent inactive-object scene layer

- User confirmed .364 still failed immediately: the first finger activation left only the newly active object visible; all other objects remained in the Outliner but disappeared from the viewport.
- Root cause is architectural: inactive object meshes were being injected directly into the same core modelling `root` group that `renderMesh()` destroys with `clearGroup(root)` on every rebuild.
- That made inactive visibility depend on the monkey-patched `root.add(body)` hook re-inserting all inactive meshes at exactly the right moment after every active switch.
- Inactive objects now live in a dedicated persistent scene sibling:
  - `BoxLab Inactive Objects`
  - attached directly to the scene
  - not a child of the core modelling root
- Every active body rebuild now refreshes this dedicated layer rather than injecting peers into `root`.
- `clearInactiveLayer()` explicitly removes/disposes the old inactive meshes before rebuilding.
- Core `renderMesh()` is free to clear/rebuild its modelling root without deleting inactive object bodies.
- Ray-picking remains valid because `inactiveBodies` still tracks the scene-layer meshes directly.
- Studio/render modes still apply to each inactive body and Studio bounds continue to include `boxlab-inactive-body`.
- Linked propagation and atomic linked creation from .363 remain unchanged.
- Touch event isolation from .364 remains unchanged.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for persistent scene-layer ownership, rebuild behavior, linked propagation retention and protected pins.
- Released from PR **#49**; squash merge commit: `8acba4d282d1c51293f9b9cf08ea7c462ac7ac6e`.

## 2026-09-20 — v0.36.18.364 touch object activation render-race fix

- User confirmed .363 restored linked edit propagation, but finger-tapping a different object still made every non-tapped linked peer disappear from the viewport while their Outliner rows remained.
- Root cause was a touch-only event collision between the multi-object activation layer and the core modeller's background-tap handler.
- On touch pointer-down over an inactive object:
  - core modeller cannot ray-pick inactive bodies because it only considers the active `body`
  - core therefore arms a background tap
- On pointer-up:
  - multi-object layer correctly activates the inactive object
  - but .363 passed `stopEvent=false`, allowing the same pointer-up to continue into core
  - core then completed its stale background tap and called another `renderMesh()`, racing the inactive-body rebuild
- Touch object activation now calls `handleViewportActivation(event, true)`.
- When an inactive object is actually hit, the event is prevented and stopped immediately after activation, so the core background-tap handler cannot run a second render.
- Ordinary background taps remain unaffected because `handleViewportActivation()` only consumes the event when it actually handles an inactive/locked object hit.
- Linked propagation logic from .363 remains unchanged.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for consuming touch activation, non-hit fallthrough, linked propagation retention and protected pins.
- Released from PR **#48**; squash merge commit: `001b4078e9fe38c365797794341b9bbfe467af39`.

## 2026-09-20 — v0.36.18.363 atomic linked-duplicate creation

- User reported two regressions after .362:
  - a linked duplicate made from another linked duplicate did not propagate edits
  - finger-selecting a different object could make linked copies disappear from the viewport while their Outliner rows remained
- Root cause: `linkedDuplicateObject()` created and activated the new object first, then attached `sourceId` and `instanceMatrix` afterward.
- That allowed a new linked copy to enter the scene/activation lifecycle temporarily as a normal independent object.
- `addObject()` now accepts optional linked metadata:
  - `sourceId`
  - `instanceMatrix`
  - `origin`
- `linkedDuplicateObject()` now:
  - resolves the shared source
  - captures source instance placement
  - evaluates source × placement
  - creates the new object with linked metadata already attached
  - only then allows normal activation/rendering
- No post-activation reassignment of `copy.sourceId` or `copy.instanceMatrix` remains.
- This makes first-generation and second-generation linked duplicates follow the same creation path.
- Existing .362 source × matrix regeneration remains in place for active/inactive rendering.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for atomic linked metadata, second-generation propagation, inactive linked rendering and protected pins.
- Released from PR **#47**; squash merge commit: `4f0441660512c4eacf557320d8a5f935b931243e`.

## 2026-09-20 — v0.36.18.362 linked-instance placement stability

- User reported linked instances could be moved and modelled independently, but selecting a different peer caused them to jump together and lose independent placement.
- Root cause was a split source-of-truth problem between cached evaluated world meshes and shared source + instanceMatrix state.
- In Object mode, `saveActive()` still first attempts to recover a placement matrix from shared source → live mesh.
- If placement recovery succeeds, only that instance's `instanceMatrix` is updated.
- If placement recovery fails, BoxLab now treats the live mesh as a shared-geometry edit at the existing instance placement:
  - transforms live world mesh back through the current instance matrix
  - updates the shared local source
  - increments source revision
  - regenerates linked peers from shared source × each peer's own instanceMatrix
- Activating a linked object now regenerates its world mesh from shared source × instanceMatrix before loading it into the live mesh.
- Inactive linked rendering also regenerates from shared source × instanceMatrix rather than trusting stale cached world geometry.
- Intended contract is now explicit: **shared geometry, independent placement**.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for placement fallback, activation regeneration, inactive rendering and protected pins.
- Released from PR **#46**; squash merge commit: `8dcef36d789bf6d42bc092aa2897115789c636bd`.

## 2026-09-20 — v0.36.18.361 per-object Outliner SubD toggle

- Added a compact per-object **S** button to each editable Object row.
- Outliner row layout is now **Name / S / Visibility / More**.
- **S** directly reflects the existing per-object `object.settings.subd` state.
- Lit/active S = SubD Preview on; dim S = off.
- Toggling an inactive object updates its existing stored modifier settings and refreshes the viewport without making it active.
- Toggling the active object drives the existing `#subdToggle` control and then re-captures the same authoritative object settings, so the Outliner and Modifiers drawer stay synchronized.
- Each SubD toggle creates one Object scene-history checkpoint.
- Reference objects keep SubD disabled.
- No new subdivision implementation or modifier state was introduced; existing `displayMeshFor()`, `subdivide()`, SubD level and Cage controls remain authoritative.
- Contextual Origin/Pivot UI from .360 and compact Outliner behavior remain unchanged.
- Protected `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for row presence/state, active/inactive synchronization, Reference exclusion and protected pins.
- Released from PR **#45**; squash merge commit: `81121843def91f766c8f0b25f6b5cc479671598b`.

## 2026-09-20 — v0.36.18.360 contextual Object controls

- Continued UI/UX polish on the protected v0.36.18.355 Group transform baseline.
- Audited Object-mode Origin/Pivot controls and confirmed:
  - Origin presets are single-object controls.
  - Pivot mode only affects multi-object / grouped Scale and Rotate behavior.
- Object UI now exposes a lightweight selection-context class from authoritative Object Management:
  - single-object context
  - multi / whole-Group context
- Presentation is now contextual:
  - single object → compact Origin row shown, Pivot row hidden
  - Multi / whole Group → compact Pivot row shown, Origin row hidden
- Origin/Pivot button dimensions, gaps and labels are tightened for iPad without changing their handlers.
- Object Selection toolbar is forced into a compact five-button strip with smaller gaps and a tighter status readout.
- No changes to Origin/Pivot maths, Group selection, Group transforms, linked instances, Boolean behavior or Reference protection.
- Protected `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `object-management.js → drawer-ui.js → index.html` cache chain.
- Added regression coverage for contextual visibility, compact Selection layout and protected pins.
- Released from PR **#44**; squash merge commit: `41fa0636d5b601cd059afe4bc911f4f36b4a9dab`.

## 2026-09-20 — v0.36.18.359 Outliner Delete restoration + keyboard Delete

- User reported that compact Outliner polish had made object Delete too hard to find and requested a keyboard shortcut.
- Every object-row **More** menu now includes **Delete Object**.
- Row-level Delete removes that specific object and creates exactly one Object scene-history checkpoint.
- Global/footer Delete keeps its existing authoritative history capture; `deleteActive()` therefore suppresses a second internal checkpoint.
- In Object mode, hardware-keyboard **Delete** and **Backspace** trigger the existing authoritative Delete button.
- Keyboard Delete therefore inherits current selection semantics:
  - single object → delete active object
  - Multi selection → delete selected objects
  - whole Group selection → delete selected Group members through the existing Multi pathway
- Keyboard handling ignores Meta/Ctrl/Alt-modified shortcuts and does not fire inside inputs, textareas, selects, contenteditable elements or the BoxLab Rename dialog.
- Added future roadmap item for **Group Boolean convenience** using temporary Join-derived compound operands rather than a new Group geometry type.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for row Delete, keyboard Delete/Backspace, editable-field protection and one-step history semantics.
- Released from PR **#43**; squash merge commit: `d9da984e331e561dc2a490554df95eaf8f1e7f94`.

## 2026-09-20 — v0.36.18.358 anchored upward Outliner popovers

- User confirmed v0.36.18.357 still rendered Group More downward on iPad despite `bottom:` CSS.
- Replaced bottom-offset positioning with an explicit Safari-resistant anchor:
  - popup `top:0`
  - `bottom:auto`
  - translated upward by its own full height
  - critical positioning uses `!important`
- Applied consistently to Object row More, Group More and footer Object-action More.
- No changes to selection, Group hierarchy, transforms, linked instances, Boolean behavior or Reference protection.
- Protected `object-origin.js?v=0.36.18.355` and `multi-object-transform.js?v=0.36.1.0` remain untouched.
- Released from PR **#42**; squash merge commit: `59ec46a6e8198befabfc5723928cc0df525da5f2`.

## 2026-09-20 — v0.36.18.357 upward Outliner popovers

- User screenshot showed the compact Object **More** menu opening downward near the bottom of the Objects drawer, causing Lock/Solo to be clipped by the drawer edge.
- Object row More menus now open upward from the dots.
- Group row More menus now open upward from the dots.
- Bottom Object action More menu also opens upward.
- This is CSS/layout only; no changes to selection, Group hierarchy, transforms, linked instances, Boolean behavior or Reference protection.
- Protected Group transform baseline remains `object-origin.js?v=0.36.18.355`.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `object-management.js → drawer-ui.js → index.html` cache chain.
- Added regression coverage for upward popover positioning and protected pins.
- Released from PR **#41**; squash merge commit: `d7c4655f125c0811bbee12c8733da02090ec3926`.

## 2026-09-20 — v0.36.18.356 compact Outliner polish

- User confirmed v0.36.18.355 as the stable Group baseline and approved continuing UI/UX polish.
- This build is presentation-only around the Object Outliner; Group selection/transform routing from .355 is intentionally untouched.
- Object rows are reduced from permanent **Name / Visibility / Lock / Solo** controls to **Name / Visibility / More**.
- Object **More** contains the existing Lock/Unlock and Solo/Exit Solo actions; the underlying behavior and handlers are preserved.
- Group rows are reduced from **Disclosure / Name / Visibility / Lock / More** to **Disclosure / Name / Visibility / More**.
- Group **More** now contains Lock/Unlock, Rename Group and Ungroup.
- The bottom Object action stack is reduced from three rows to **Add / Duplicate / More**.
- The existing Rename, Linked Duplicate, Make Unique and Delete buttons are physically moved into the Object More menu so their existing IDs, handlers and Multi enable/disable logic remain authoritative.
- Object and Group rows now share a denser visual rhythm with 28–32 px touch targets and fewer permanent boxed controls, following the compact scene-tree direction established by the user's Nomad reference.
- No changes to Group membership, selection semantics, transform routing, Boolean geometry, linked-instance geometry or Reference protection.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- `object-origin.js?v=0.36.18.355` remains pinned to the confirmed working Group transform baseline.
- Refreshed `multi-object.js`, `object-management.js`, `drawer-ui.js` and outer release cache pins.
- Added regression coverage for compact Object/Group row structure, relocated action buttons and protected Group transform pins.
- Released from PR **#40**; squash merge commit: `562dd8697aca5c4a2d9b6c39729e8d725857320b`.

## 2026-09-20 — v0.36.18.355 whole-Group transform routing fix

- User reported that a hierarchy-declared Group could still move as separate ordinary selected objects on iPad/Pencil, and that the two grouped objects still showed amber/blue instead of unified Group amber.
- Root cause 1: `object-origin.js` only treated Move as a grouped transform when group expansion added extra IDs. If every Group member was already selected, `groupedExpansionActive()` returned false and Move fell back to ordinary object behavior.
- Root cause 2: the legacy selection wrapper replaced `__boxlabObjectSelection` without forwarding `wholeGroupId`, so downstream viewport selection code could not see whole-Group context.
- Added `wholeGroupSelectionActive()` and made Move use the grouped pivot/transform pathway when either:
  - selecting a member expands to more Group members, or
  - exactly one whole Group is already selected.
- The legacy wrapper now forwards `wholeGroupId`, authoritative owner metadata and refresh.
- The wrapper continues to suppress generic Multi-transform interception for grouped Move so the existing group-aware origin/pivot transform pathway owns the gesture.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed the stale `object-origin.js` cache pin from .351 to .355 through `drawer-ui.js`, and refreshed the outer release cache chain for iPad/Safari.
- Added regression coverage for whole-Group Move routing, wrapper context preservation, cache refresh and the protected transform pin.
- Released from PR **#39**; squash merge commit: `1cace3102b45dcf6d830849efbda0a82e66f3307`.

## 2026-09-20 — v0.36.18.354 whole-Group viewport selection context

- User screenshot showed a selected/moving Group with no viewport-level Group selection feedback while an unrelated previously active object (Cube 2) still showed its Object-mode cage/verts and active Outliner emphasis.
- Root cause: Group selection was a higher-level Multi selection but `activeId` could remain outside the selected Group, while the base renderer continued presenting that active object as the visible Object selection.
- Group selection now ensures the hidden active/primary object belongs to the selected Group. If the previous active object is outside the Group, BoxLab promotes an editable Group member as primary.
- The authoritative Object selection API now exposes `wholeGroupId` when exactly one complete Group is selected.
- Whole-Group selection is a first-class visual state:
  - all selected Group member bodies are tinted amber in the viewport
  - ordinary two-object Multi selection still uses amber primary + blue secondary
  - selected Group header gets explicit amber emphasis
  - child object rows lose stale individual active/selected emphasis while Group context is active
- The multi-object render observer now suppresses the active member's normal Object cage/vertex/mirror-edge overlays as they are created while a whole Group is selected, so they do not reappear during Move/Rotate/Scale refreshes.
- Leaving Group context restores normal single-object cage behavior automatically.
- Group transforms themselves remain on the existing protected expansion/transform pathways.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `multi-object.js`, `object-management.js`, `boolean-ux-history.js`, `drawer-ui.js` and `index.html` cache pins.
- Added regression coverage for in-Group primary promotion, explicit whole-Group context, amber Group tint, cage suppression and protected cache/transform pins.
- Released from PR **#38**; squash merge commit: `7ab87d240569f71a6cdf82f79405411241db989e`.

## 2026-09-20 — v0.36.18.353 focused Rename + live Group header refresh

- User reported Group Rename either did not work or did not update the visible Group name, and requested that Rename open with the edit cursor already inside the text field.
- Root cause of the stale Group label: once a compact Group block had been composed, later `updateUI()` calls did not reconcile the already-existing header text/state.
- Added `reconcileExistingHierarchy()` so existing Group rows refresh their:
  - Group name
  - disclosure/collapse state
  - visibility state
  - lock state
- Invalid/stale Group blocks are unwrapped back to object rows so hierarchy changes can be rebuilt cleanly.
- Added a BoxLab-native Rename dialog shared by Object and Group rename.
- Rename input is focused and its current text selected immediately, with repeated focus/select on the next animation frame and a short iPad/Safari retry.
- Object Rename no longer uses `window.prompt`.
- Group Rename uses the shared focused dialog, preserves the existing Object scene-history checkpoint, and updates the visible Group header immediately via normal UI reconciliation.
- Enter confirms, Escape/Cancel dismisses.
- Group ownership, compact hierarchy, two-object amber/blue scene cue, numbered duplicate naming, Boolean B-numbering, linked instances and Reference protection remain unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `multi-object.js`, `object-management.js`, `drawer-ui.js` and `index.html` cache pins.
- Added regression coverage for focused rename behavior, shared Group Rename routing, live Group header reconciliation and protected cache/transform pins.
- Released from PR **#37**; squash merge commit: `3816c57f1ecfa2fd1d1ff150f9dac098b888cbe4`.

## 2026-09-20 — v0.36.18.352 two-object colour cue + compact naming

- User clarified that the amber/blue viewport colouring was useful as a general two-object Multi-selection indicator, even though Boolean-specific Outliner takeover was not.
- Restored viewport tint for exactly two selected objects in Object mode:
  - active / primary object = amber
  - second selected object = blue
- Outliner remains neutral; Boolean A/B row borders/badges are not restored as a generic Multi-selection treatment.
- Ordinary Duplicate naming now uses padded sibling numbers instead of `copy`: `Cube` → `Cube 01` → `Cube 02`.
- Duplicating an already numbered object continues the same base-name family rather than nesting suffixes.
- Linked Duplicate and Multi Duplicate use the same numbered object-name allocator.
- Boolean result naming is now compact: active/base object stem + `B1`, `B2`, etc., instead of concatenating active name + operation + cutter name.
- Boolean operation status text and geometry behavior remain unchanged.
- Group ownership / compact hierarchy from .351 remains unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `multi-object.js`, `object-management.js`, `boolean-ux-history.js`, `boolean-prototype.js`, `drawer-ui.js` and `index.html` cache pins.
- Added regression coverage for two-object viewport tint, numbered Duplicate/Linked/Multi naming, Boolean B-numbering and protected cache/transform pins.
- Released from PR **#36**; squash merge commit: `c848cf3f867edcfd732b21d400f11d734b614caf`.

## 2026-09-20 — v0.36.18.351 Group ownership + Boolean UI cleanup

- User reported that the visible Group Selection button did not actually produce the compact Group hierarchy and that the amber/blue Boolean A/B treatment still dominated the Object rows.
- Root cause: legacy `object-origin.js` still owned Group/Ungroup mutation. It assigned `groupId` and added per-object `G#` tags, but did not notify the newer hierarchy renderer; therefore the compact Group row was never built.
- `object-management.js` is now the authoritative owner of Group/Ungroup mutations as well as Group hierarchy presentation.
- Added `__boxlabObjectGroups` API for Group Selection / Ungroup / Select / Rename / refresh.
- Legacy `object-origin.js` now delegates Group/Ungroup and only consumes group membership for transform expansion; legacy `G#` row tags are removed.
- Group Selection now updates the hierarchy immediately in the same action, so a newly formed Group becomes a visible compact Group row without waiting for an unrelated Outliner redraw.
- Removed duplicate automatic history checkpointing on legacy Group buttons; authoritative Group API owns the single history step.
- Generic two-object Multi selection no longer triggers Boolean A/B Outliner borders, operand badges, viewport tinting, or automatic drawer forcing.
- Boolean A/B information remains in the Boolean operand controls and Boolean operations themselves are unchanged.
- This allows two-object selection for Grouping, Join, transforms or other workflows to remain visually neutral.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `object-management.js`, `object-origin.js`, `boolean-ux-history.js`, `drawer-ui.js` and `index.html` cache pins.
- Added regression coverage for authoritative Group ownership, legacy delegation, immediate hierarchy refresh, neutral generic Multi selection and protected transform/cache pins.
- Released from PR **#35**; squash merge commit: `8faa0cb38cd25f1a1acf561929d6685fc0aabe6e`.

## 2026-09-20 — v0.36.18.350 compact Group tree

- User supplied a dense scene/group hierarchy reference and reported the current Group UX still consumed too much vertical space.
- Kept the existing Group ownership and transform model; no second hierarchy system was introduced.
- Existing Groups now present as a compact Outliner tree row with disclosure, Group name, visibility, lock and a small More menu.
- Group children are more tightly indented beneath the header with a simple tree guide rather than a large rounded container.
- Group More menu contains **Rename Group** and **Ungroup**; the normal Object **Rename Group** action from v0.36.18.349 remains valid.
- The old Group/Ungroup control strip is no longer permanently visible. **Group Selection** appears only when 2+ selected objects can actually form a new Group; the plumbing Ungroup control remains hidden for existing history-safe behavior.
- Group visibility and lock now checkpoint authoritative Object scene history before state changes, so each action has predictable Undo/Redo.
- Collapse remains a lightweight Outliner presentation state rather than a destructive modelling action.
- Existing automatic Group transform expansion, linked-instance behavior, Reference read-only protection and Group metadata persistence remain unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `object-management.js → drawer-ui.js → index.html` cache chain for iPad/Safari.
- Added regression coverage for contextual Group creation, compact tree structure, More actions, history-safe visibility/lock and protected cache/transform pins.
- Released from PR **#34**; squash merge commit: `11843516865bfcb50aa4d5686d7405611ba567e0`.

## 2026-09-20 — v0.36.18.349 first-class Group selection UX

- User reported that normal **Rename** stayed disabled after selecting a whole Group and that Group interaction still felt fragmented.
- Audit confirmed a selected Group is represented as a Multi selection of all member objects, but the normal Object action row still treated every multi-selection as anonymous objects.
- Added one-whole-group detection to the authoritative Object management layer.
- When exactly one complete Group is selected, the existing **Rename** button now enables and changes label to **Rename Group**.
- Rename Group uses the existing group name store and authoritative Object scene-history checkpoint, so it remains one Undo/Redo step.
- Partial/mixed multi-selections still cannot rename as a Group.
- Selected Group readout now shows the Group name and member count instead of the generic multi-selection message.
- Strengthened the selected Group header visual state.
- Simplified the Group header: group name is the primary selection target; collapse, visibility and lock stay directly available; the old tiny rename pencil was replaced by a direct **Ungroup** action because rename now belongs to the standard Object action row.
- Existing Group Selection / Ungroup controls, automatic whole-group transforms, linked instances and Reference protection remain unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Updated `object-management.js → drawer-ui.js → index.html` cache chain for iPad/Safari.
- Added regression coverage for whole-group detection, Rename Group routing, simplified header and protected transform/cache pins.
- Released from PR **#33**; squash merge commit: `12fdaa389d507799253482bd7c8f4747a1e1a8f4`.

## 2026-09-19 — v0.36.18.348 persistent Group organization

- Mandatory Phase C audit confirmed BoxLab already had one authoritative Group implementation: membership and transforms are owned by `object-origin.js`, while the grouped Outliner hierarchy / names / collapse UI are owned by `object-management.js`.
- No second hierarchy or group-transform layer was added.
- Audit found Object scene snapshots preserved each object's `groupId` but did not preserve custom group names or collapsed/expanded state.
- Added group metadata to the authoritative Object scene snapshot and restore path.
- Restore filters metadata against group IDs that genuinely exist in the restored scene, preventing stale names/collapse flags from attaching to unrelated later groups.
- Group Rename now checkpoints Object scene history before changing the label, making rename one Undo/Redo step.
- Stale name/collapse metadata is pruned when a group truly disappears.
- Existing Group membership, automatic whole-group transform expansion, linked-instance behavior and Reference protection remain unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Updated the `object-management.js → drawer-ui.js → index.html` cache chain for iPad/Safari.
- Added regression coverage for metadata snapshot/restore, rename history, stale metadata pruning and protected transform/cache pins.
- Released from PR **#32**; squash merge commit: `cf80a9bd11a4916eb586e954a2152b04dd46b49f`.

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
