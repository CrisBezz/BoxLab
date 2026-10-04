# BoxLab Development Roadmap

This is the persistent product roadmap for BoxLab.

The repository is the source of truth. Keep this file aligned with `AI_HANDOFF.md`, `DEV_HISTORY.md`, and `TEST_CHECKLIST.md`.

## User-directed priority — updated 2026-10-04

Radial menus contain active modelling/repair tools only. Selection is handled by
long press and gestures. Do not add selection filters/helpers to contextual rings.

All development is now directed at finalizing radial menus and contextual settings.
Defer unrelated feature/gesture/strengthening work until this is complete.

Primary goal: finish contextual radial menus and top-centre pop-out settings so routine
modelling needs as little left-drawer interaction as possible.
Required order: **Face gaps → Vertex → Object → final Edge completeness pass**.
The .690 PASS completed the lifecycle of the existing Face ring; it did NOT prove
that all Face drawer actions/settings had migrated into the contextual workflow.
Edge's existing radial lifecycle is protected, but overall Edge completeness must
be finalized after Vertex and Object. Stop broad gesture expansion while this
radial-menu work is the priority. .691 remains protected; .692 is already published
and its Edge neutral-return hands-on checks remain pending.
Before the next runtime build, compare the full Face drawer against the current
Face rings, audit existing action/settings owners, and choose the next related
Face contextual batch. Preserve current passes. Add contextual access/pop-outs by
reusing owners; remove redundant drawer UI only after its replacement passes.
Do not mistake a working ring lifecycle for complete contextual tool coverage.

## Align to Face — v0.36.18.705

Implemented in the existing top-centre Align pop-out beside X/Y/Z. Select moving
planar Faces plus the fixed Face, choose Align to Face, then tap the selected fixed
Face. Moving group rotates rigidly and translates along anchor normal; shared hinges
work where anchor vertices remain fixed. Bent groups, warped anchors and unsafe
surrounding geometry reject without mutation. Selection/puck and one-step Undo/Redo;
no-op adds no history. Existing anchor owner/quaternion/health audit reused; no new
radial sector or pointer owner. Hands-on PASS. Resume Face gaps → Vertex → Object
→ final Edge after this confirmation.

## Tool-session popup placement

All viewport tool-session popups appear at the top centre, using the shared
placement owner. Preserve selection-relative gizmo/rings. This applies to future
Face, Vertex, Object and Edge session controls and floating numeric entry.

## Product direction

BoxLab is an **iPad-first touch/Pencil polygon modeller and Nomad Sculpt companion**.

Core principle:

**Import → Clean → Model → Export → Nomad Sculpt**

BoxLab should stay fast, direct, topology-aware and shallow. It should not become Blender-on-iPad.

## Phase A — Topology intelligence / Clean for SubD

**Status: COMPLETE at v0.36.18.323.**

Delivered:
- conservative four-triangle fan repair
- sliver/skinny-triangle cleanup
- bounded even triangle-island complete matching up to 40 connected triangles
- complete matching only; no stranded triangle forcing
- surrounding quad-flow quality
- whole-patch boundary guards
- internal proposed-quad flow coherence
- average + worst-local internal-flow ranking
- smooth-interior valence regularity
- average + worst-local valence ranking
- conservative residual triangle-pair merge
- guarded all-quad tangent relaxation
- topology audit for invalid references, repeated/collapsed edges, duplicate faces, non-manifold edges and orphan crease data
- transactional rollback in the core cleanup pipeline
- generated irregular-mesh regression fixtures
- UI-level topology validation remains as a second line of defence

Phase A freeze rule:
- v0.36.18.339 reopened Phase A only for a concrete Clean shape-preservation regression; sharp incident normal breaks are now protected during relaxation
- do not resume blind triangle-cap growth
- do not chase exotic remeshing research without a concrete user-facing failure
- future Clean for SubD changes require a real modelling case or a reproducible regression

## Phase B — Precision modelling

**Status: planned precision slice complete through v0.36.18.340.**

Priority candidates:
- cross-object snapping — **Add Vertex in v0.36.18.324; component Move snapping added in v0.36.18.325**
- precision drag/readback polish — **live component Move ΔX/ΔY/ΔZ readback added in v0.36.18.326**
- Repeat Previous audit/polish for exact repeated operations — **Repeat Extrude / Repeat Inset pre-existed .327; redundant duplicate loader removed in v0.36.18.328**
- Align / Flatten component tools — **existing Make Planar retained; Align X/Y/Z added in .329 and upgraded to explicit pick-anchor workflow in v0.36.18.330**
- Circle / regularize selected components where topology permits — **simple closed Vertex/Edge loop Circle added in .331; single selected Face boundary support added in .333; UI moved from Selection to contextual Active Tools in .334; exact Vertex/Edge/Face Active Tools slots arranged in v0.36.18.336**
- Edge Split canonical-Multi regression — **fixed in v0.36.18.335 by making Edge paint selection yield while Face Split is armed**
- Edge Flip for manual topology-flow correction — **existing Rotate Edge audited as the same triangle-pair diagonal swap; consolidated under the clearer Flip Edge label in v0.36.18.337**
- stronger structured Fill / Grid Fill / Cap workflows — **existing Fill is the current single-face Cap; conservative four-sided all-quad Grid Fill added in v0.36.18.338**
- support-loop construction improvements — **existing Offset Loop audited as the support-loop tool; transactional validation, canonical rail selection and Multi-safe Pencil handoff added in v0.36.18.340**
- **Edge Extrude** — **direct boundary/loose-edge ribbon workflow added in v0.36.18.423; repeated pulls automatically continue from the newly created outer rail; v0.36.18.425 adds Free/X/Y/Z/Auto directional constraints projected perpendicular to the source edge; v0.36.18.426 adds free Plane-constrained pulling perpendicular to the grabbed edge; v0.36.18.427 keeps the tool/constraint armed while tapping or switching boundary-edge selection**
- preserve direct Pencil interaction and minimal mode switching

## Phase C — Object / instance workflow

**Active phase.**

- linked-instance editing robustness — **explicit Linked Duplicate + shared-source manager foundation added in v0.36.18.343; ordinary Duplicate remains independent** — **v0.36.18.362 hardens the shared-geometry / independent-placement contract across activation and modelling edits**; **v0.36.18.363 makes linked-copy creation atomic so second-generation links are born attached before activation** — **v0.36.18.366 makes the live mesh bridge authoritative before every render so linked edits commit the visible mesh**
- Make Unique audit/polish — **explicit Make Unique detach path added in v0.36.18.343; v0.36.18.641 materializes authoritative source+instance placement before detaching active/inactive instances, removing cached-mesh dependence**
- cross-object reference/edit workflows — **Reference imports already served as snap targets; v0.36.18.344 hardens them as permanently read-only modelling guides across single/Multi/Group/history paths**
- stronger multi-object editing — **audit confirmed Multi Move / Scale / Rotate / numeric transforms / grouping / Duplicate / Join / Boolean already existed; Multi Linked Duplicate + Multi Make Unique parity added in v0.36.18.346**
- Join/Boolean workflow polish — **v0.36.18.347 consolidates both workflows onto the authoritative Object scene-history bridge; legacy parallel Boolean Undo/Redo wrapper removed while A/B UX, hidden originals, unique results, linked-instance metadata and Reference exclusions are preserved**
- persistent object/region organization — **v0.36.18.348 makes Group metadata persistent; v0.36.18.349 makes Groups first-class; v0.36.18.350 compacts the tree; v0.36.18.351 centralizes Group ownership; v0.36.18.352 restores two-object viewport feedback + compact naming; v0.36.18.353 fixes focused Rename/live header refresh; v0.36.18.354 adds whole-Group visual context; v0.36.18.355 fixes grouped transform routing; v0.36.18.356 compacts Object/Group rows; v0.36.18.357–.358 harden upward More popovers; v0.36.18.359 restores per-object Delete and adds keyboard Delete/Backspace.; v0.36.18.360 makes Origin/Pivot contextual and compacts the Object Selection toolbar.; v0.36.18.361 adds direct per-object SubD Preview toggles to compact Outliner rows.**

- Group Boolean convenience — **v0.36.18.368–.369:** two complete Groups can act as Boolean A/B operands; .369 replaces the naive disconnected Join operand with a shell-by-shell compound Boolean path, while source Groups remain intact/hidden for Undo.

### Beta 3 release-candidate hardening

**v0.36.18.371** is the approved **frozen Beta 3** checkpoint. The user completed the hands-on release gate on 2026-09-20 and the exact approved release tree is published under `/beta-3/`. Phase D may now resume on live `main` while Beta 3 remains immutable except for an explicitly approved emergency release fix.

### Beta 5 release checkpoint

**v0.36.18.538** is the approved **frozen Beta 5** checkpoint from source commit `343dc4dec00046762c7a9a11edaa92e0160a5a55`, snapshotted under `/beta-5/` by freeze commit `7667df2f889aca84b67bad56bf559d9c8d67478e`. The user completed the hands-on release gate on 2026-09-27. Normal development may resume on live `main`; Beta 5 remains immutable except for an explicitly approved emergency release fix.

### Beta 4 release checkpoint

**v0.36.18.427** is the Beta 4 checkpoint, frozen from main commit `ec45b3ba208ef3ffa40015d7a3b62666c63f379e` under `/beta-4/`. It captures the Phase D Tool Session consolidation plus the direct Edge Extrude ribbon workflow through Plane constraints and live edge-selection handoff. Normal development continues on live `main`; Beta 4 remains immutable except for an explicitly approved emergency fix.

## Phase D — Construction tools
- surface-relative Transform / Insert workflow — **Transform Tool foundation added in v0.36.18.436; v0.36.18.437 upgrades it to source-face → target-face true face-to-face anchoring; v0.36.18.438 adds the linked-instance Insert Tool foundation using the same surface-frame controller and existing sourceId/instanceMatrix architecture.**


Only add focused tools that suit BoxLab:
- topology-aware Symmetry / Bisect / Apply — **origin-plane X/Y/Z foundation with Keep +/- and optional welded Mirror added in v0.36.18.428; movable X/Y/Z plane with Vertex/Edge/Midpoint/Face geometry snapping added in v0.36.18.433; arbitrary-plane rotation and transform ownership added in v0.36.18.434; Align to Face + Flip Plane added in v0.36.18.435**
- Shell / Solidify
- Array
- Sweep where appropriate — **Sweep Path foundation added in v0.36.18.393; v0.36.18.394 added reliable Apply redraw + true 3D Geometry Snap; v0.36.18.395 changes Sweep to a profile-first workflow with a movable Profile Plane, Circle/Rectangle/custom profiles, editable construction state, and dual path sources: SketchUp-style Follow Edges or free Draw Path; v0.36.18.396 refines custom Draw with a compact Profile Plane and explicit Open/Closed profiles, including open-profile surface Sweep preview; v0.36.18.397 fixes profile closure/orientation mirroring; v0.36.18.398 hardens concave closed profiles and exact start-ring placement; v0.36.18.399 corrects side-face normals; v0.36.18.400 fixes Sweep edit ownership/transform disarm; v0.36.18.401 adds Use Selection for a preselected Face or closed Edge loop; v0.36.18.402 adds direct Face/Edge selection launch; v0.36.18.403 fixes closed-profile node insertion; v0.36.18.404 anchors selected profiles directly to the first rail edge; v0.36.18.405 unifies closed-shell normals; v0.36.18.406 moves Sweep into the new exclusive Tool Session UI with PROFILE / PATH / FINISH stages**
- Lathe where appropriate
- lightweight deformers only if they fit direct touch modelling

## Phase E — Import / repair / handoff

- Mesh Health / Inspect workflow — **foundation added in v0.36.18.439: non-destructive Object audit with Closed/Open clean states and topology issue counts; v0.36.18.440 adds transactional Safe Repair for exact duplicate faces, zero-area faces and accidental orphan vertices**
- Auto Close / Make Watertight — **v0.36.18.441 adds conservative Auto Close for Open · Clean meshes made entirely of simple closed boundary loops, with cap orientation reuse and closed-topology validation**
- stronger boundary diagnostics — **v0.36.18.442 classifies connected boundary groups as loops/chains/branched and hands boundary/non-manifold edges directly into native Edge selection**
- normals / triangulation controls — **v0.36.18.443 adds Unify Winding, Flip Normals, and ear-clipped Triangulate controls inside Mesh Health**
- export polish — **v0.36.18.444 adds evaluated-mesh OBJ preflight, per-object Mesh Health metadata, scene health summary, and OBJ group records while preserving permissive export**
- OBJ facegroup / polygroup preservation — **v0.36.18.445 preserves OBJ `g` data as per-face metadata, keeps grouped meshes as one object by default, and adds optional Split objects by groups import**
- viewport facegroup colours — **v0.36.18.446 adds a non-destructive Facegroups Render Look with stable per-group colours and neutral ungrouped faces**
- facegroup colour controls — **v0.36.18.447 adds contextual palette, saturation, lightness, ungrouped colour, reseed and reset controls**
- GLB export if useful for the Nomad/3D handoff workflow

## Phase F — iPad UX polish

- browser-selection interaction guard — **native Safari selection/callout suppressed across BoxLab UI while editable fields remain exempt in v0.36.18.345**
- **Solidify/Shell migrated in .421; Revolve Profile migrated in .422**
- persistent tool modes
- viewport contextual Selection Hub — **Face-mode v1 added in v0.36.18.642: closed puck -> transform gizmo -> contextual tool ring -> closed puck; tool sectors proxy existing authoritative actions and hide during active modelling**
- Edge contextual Selection Hub — **v1 added in v0.36.18.654 with Extrude / Bevel / Crease / Slide / Offset / Bridge / Dissolve / Delete proxies**
- Radial contextual availability — **v0.36.18.658: Face + Edge sectors mirror authoritative enabled/disabled/active state**
- Edge hold browser transactional preview — **v0.36.18.655: candidate probes restore original selection; scrub replaces rather than accumulates; loop enumeration covers both seed endpoints plus Boundary/Ring**
- Edge hold closed Face Boundary candidates — **v0.36.18.657: each Face incident to the held Edge contributes its complete perimeter as a browsable closed candidate**
- Edge hold additive base selection — **v0.36.18.659: pre-hold selection persists while the currently browsed candidate is replaced transactionally**
- Direct-tool Pencil ownership handshake — **v0.36.18.660: main direct tools block Pencil orbit stealing; Bevel disarms after completion**
- Bevel viewport session — **v0.36.18.662: radial Edge Bevel gets Width / Segments / Apply Exact / Cancel beside the model while existing Bevel owner remains authoritative**
- Selection Hub session palettes — **Sweep viewport session proxy added in v0.36.18.643; Profile / Path / Finish controls mirror the existing authoritative Sweep owner beside the model**
- Shell viewport session proxy — **added in v0.36.18.653; Thickness / Apply / Cancel mirror the existing Shell owner beside the model**
- left-hand access
- reduced tap count — **v0.36.18.406 makes Face/Edge → Sweep jump directly to PATH/Follow Edges and removes the need to hunt through Object Active Tools**
- consistent Pencil drag behaviour
- selection-region workflow
- numerical precision entry/readback
- landscape-first layout
- selection visibility at all zoom levels

### Selection Hub / modeless UX checkpoint — v0.36.18.690

- Edge radial lifecycle is complete and hands-on protected through .677.
- Face radial lifecycle is complete and hands-on protected through .690; refreshed-shell Shell/Sweep exits and Knife regression confirmed PASS on 2026-10-03.
- Protected Object-mode contract from .682:
  - finger/Pencil background tap dismisses Object gizmo
  - Pencil background drag still orbits
  - tapping the object restores the gizmo reliably
- Radial menu completion is the active priority: Face gaps → Vertex → Object → final Edge. .691 Face neutral return is protected; .692 Edge parity is published with hands-on checks pending. Broader gestures are secondary.

### Face contextual coverage / Vertex completion batch — .710

- .694 outer-ring Join/Circle and existing eight inner sectors are hands-on PASS and protected.
- .695 Poke/Make Planar are hands-on PASS and protected.
- .696 Triangulate/Flip Faces are hands-on PASS and protected.
- .697 Orient Faces/Orient Outward are hands-on PASS and protected.
- .698 Face Bridge viewport preview and centred × are hands-on PASS and protected.
- .699 Extrude/Inset Exact/Repeat/Done are hands-on PASS and protected.
- .700 shared top-centre session dock and Extrude/Inset background Done are hands-on PASS and protected.
- .701 selection owners passed hands-on, but user clarified that radial menus are active tools only.
- .702 removes Coplanar/Connected radial access and restores nine outer active tools; awaiting hands-on PASS.
- .703 adds Close Holes / Quad Cleanup / Quadify N-gons through a top-centre whole-active-object Apply/Cancel panel, reusing existing owners. Successful rebuilding clears stale Face IDs; Cancel preserves selection. Hands-on pending.
- .704 adds Clean Vertices to whole-object repair controls and Align to X/Y/Z anchor settings at top centre. Existing kernels reused; eight inner/fourteen outer tools. Hands-on pending; .702/.703 also remain pending.
- .705 adds arbitrary-plane Align to Face in the existing Align pop-out; rigid planar group placement, fixed anchor, guarded candidate commit, one-step history. Hands-on PASS.
- .706 exposes existing Merge by Distance through whole-object top-centre exact tolerance/Apply/Cancel, preserving Face mode and using existing safe scanner/weld owner. Fifteen outer tools; combined cluster validation, one history step and stale-ID cleanup. Hands-on pending.
- .707 adds Face Bevel using existing Edge bevel controller/kernel and shared top-centre Width/Segments settings. Single Face or connected region outside boundary, same Pencil drag/exact, Face mode retained, one Undo and guarded cancellation. Sixteen outer tools; hands-on pending.
- .708 responds to .707 Face drag FAIL: early owner dispatch/main fallback guard and Shell-like blue snapshot preview for Width/Segments/Pencil. Release retains preview; explicit Apply commits once, Cancel discards. Existing Edge/kernel/ring preserved; full manual list hands-on PASS and protected.
- Populate complete Face tool coverage before deciding inner/main vs outer/secondary placement. More is an accepted fallback if the completed two-ring layout is crowded.
- .709 Face owner/settings inventory accounted for all 24 active tools; Through already lives in inward Extrude. Pending Face repair confirmations and final placement review remain. Vertex starts with existing Merge Center / Merge First, same owner/history/chronology and puck lifecycle; hands-on pending. User requests all existing Vertex Active Tools in .710, followed by combined testing/refinement.

### Vertex Active Tools radial coverage — .710

All thirteen existing tools exposed: inner Add/Build Edge/Bevel/Slide/Join/Weld/
Create Face/Delete; outer Circle/Merge Center/Merge First/Merge Dist/Clean Vertices.
Existing owners/settings/history reused. Add/Build Done, Bevel Width/Exact/Cancel,
Slide signed exact/Done, selected-only Merge tolerance/Apply/Cancel and whole-object
Clean Apply/Cancel appear at top centre. No new modelling or pointer kernel.
Align is in Selection controls, outside this explicitly Active-Tools-only batch.

Bevel's inner90° /3-o'clock position is now consistent across Face, Edge and Vertex.
Face Knife135°, Duplicate180°, Extract moves outer337.5°; Edge Slide45°/Crease135°.
41 targeted PASS; full1169 tests/884 PASS and same285 failure names as .709.
Hands-on .710 AWESOME / PASS; protected. Object .711 now complete; combined
test/refinement before final Edge. Keep drawer fallbacks, .708 protected Face Bevel and earlier pending checks.

## Strengthening list

Concrete modelling cases to strengthen after the current Selection Hub / gizmo UX pass:

- **Connected-chain Edge Bevel through ordinary quad valence** — current multi-edge chamfer routing rejects some open connected chains when affected vertices are normal 4-valence quad-mesh vertices. Example captured 2026-10-02: a continuous top-profile edge chain across a subdivided/reshaped quad strip should bevel as one connected chain. Treat this as a Bevel capability gap, not invalid user topology. Preserve existing single-edge, loop/perimeter and already-working connected bevel paths while extending support.

## Protected product behaviour

Preserve:
- one-finger orbit
- two-finger pan
- pinch zoom
- two-finger tap Undo
- three-finger tap Redo
- no-jump orbit pivot
- persistent selections during navigation
- Studio realtime default/behaviour
- object management / Multi
- current snapping
- mature Through behaviour
- existing core modelling tools
- transactional topology operations

## Deferred / intentionally not active

- path tracing: abandoned in favour of Studio realtime
- broad sculpting / voxel remesh: belongs in Nomad rather than BoxLab
- Blender-scale scene-management complexity
- speculative topology work without a user-facing failure

- Tool-first UI/UX consolidation — **v0.36.18.450 hides inactive Tool Session settings, contextualises legacy Vertex settings, and moves Boolean behind a Tool Session launcher; planned as the pre-Beta-5 cleanup baseline.**


## Recovery rule after .465

- Current development restarts from the hands-on-good v0.36.18.449 runtime.
- Reintroduce UI/UX cleanup one narrow slice at a time.
- Each slice must pass hands-on interaction checks before the next UI slice begins.
- Do not reapply the v0.36.18.450 bulk consolidation wholesale.

- [ ] Complex logical-quad Loop Cut through multiple collinear boundary vertices — strengthen separately without changing protected v0.36.18.162 Loop Cut reconstruction / slide behaviour.

### Object Active Tools radial coverage — .711

All ten existing launchers now in two rings: Transform, Insert, Solidify, Array,
Boolean, Join, Symmetry/Bisect, Mesh Health; outer Revolve Profile/Clean for SubD.
Original owner controls docked top-centre in Object mode, intact settings/child
controls/Apply/Cancel. Authoritative owner cancellation and completion/gizmo return.
No parallel kernel/pointer owner; protected .710 Vertex and component Bevel positions.
32 targeted PASS; full1181/897/284, no new failures versus .710. Hands-on pending.
Next combined Object test/refine → final Edge inventory/settings audit.


### Coordinated popout / gizmo refinement — .712

User sketches supersede centre-to-radial access: centre free transforms; corner
shortcuts for Radial/Focus+Frame/Undo+Redo/Object Multi. All top tool popouts use
wide settings + stacked right terminal actions through shared presentation owner.
Original controls/geometry/history/gesture owners retained. .711 screenshots confirm
load, but no full Object PASS. 41 targeted PASS; full1190/906/284, no new failures.
Next .712 combined visual/tactile refinement before final Edge inventory/settings.


### Final Edge Active Tools coverage — .713

User .712 AWESOME PASS protects wide popouts/gizmo shortcuts/Object coverage.
All nineteen existing Edge tools exposed, including eleven reported gaps. Loop/Split
settings and Done reuse original owners; Edge Sweep uses existing staged proxy.
One-shot handoffs and shared angular/tier slots aligned across component modes.
No new kernel or protected Loop core changes. 46 targeted PASS; full1195/911/284,
no new failures. Next combined .713 hands-on/refinement; retain drawer fallbacks
until approved. No unrelated gesture/topology expansion.


### Object List access in Focus — .714

Object gizmo gets list icon beside Multi, reusing original Objects disclosure and
Focus owner. Focus reveals only Objects, keeps Focus active, restores state on close
or mode/Focus exit. No parallel outliner/selection owner. 29 targeted PASS; no new
full-suite failure names. Next .714 hands-on plus pending .713 Edge combined checks.


### Persistent Edge radial Loop / Bevel — .715

.714 Object List PASS protected. Loop retains slide rail after placement; EXACT
finalizes without closing, more cuts allowed. Radial Edge Bevel drag/exact stays
ready for new selections. Background tap exits both; original navigation owner,
kernels/history retained. .688/.162 Loop core and Face blue Bevel unchanged.
50 targeted PASS; no new full-suite failure names. Next .715 hands-on and remaining
Edge refinement, retaining drawer fallbacks.


### Face preview / Boolean compact refinement — .716

.715 repeat Edge sessions PASS protected. Blue Face Bevel render overlay now excludes
unchanged polygons/other shells; original candidate and history remain unchanged.
Boolean two-row operands/operations with Close right, original controls retained.
51 targeted PASS; no new full-suite failure names. Next .716 visual/tactile checks.


### Object Multi gizmo / Boolean access — .717

Presentation anchor uses earliest surviving visible selected object from the actual
selection Set. Scene picker shared with activation prevents inactive object taps
from dismissing gizmo, including Pencil semantic guard. Genuine background dismissal
and existing Multi transforms/pivots preserved; protected transform1.0 untouched.
33 targeted PASS; full1210/926/284, no new failure names. .716 visuals remain pending.
Next .717 iPad Multi/Boolean access checks, then radial refinement.
