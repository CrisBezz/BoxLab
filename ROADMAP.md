# BoxLab Development Roadmap

This is the persistent product roadmap for BoxLab.

The repository is the source of truth. Keep this file aligned with `AI_HANDOFF.md`, `DEV_HISTORY.md`, and `TEST_CHECKLIST.md`.

## Current direction — .854 native Loop completion, 2026-10-14

853 user PASS protected. Replace internal Undo/Redo clicks with existing main slide
cleanup exposed through guarded native commit. Same mesh/history/placed cuts remain;
853 colour detection, exact/repeat/background exit retained. Full2282PASS/0FAIL.
Device repeat/EXACT/exit/UndoRedo gate pending. Next project-resource stage or measured
bottleneck after feedback; accepted owners remain protected.

## Previous direction — .853 Loop/MultiLoop completion repair, 2026-10-14

User852 FAIL: lingering yellow/blue loops and no finalisation. Screenshot counts show
cut topology but5active slide groups. Commit reads wrong proxy material after batching;
use actual cageMaterial. Main disarm retires loop slides, preserving cut/history.
Full2280PASS/0FAIL; actual single/5cut + batch + EXACT + native finish tests.
User853 PASS2026-10-14 protects completion/editable faces/history.
851 PASS protected;852 optimisation acceptance not assumed.

## Previous direction — .852 skip unused active base calculation, 2026-10-14

851 user PASS protected. Audit main: SubD render calculates base even when no body/
mirror cage uses it. Skip only unused base path; nonSubD body, enabled mirror cage,
explicit base export and native SubD/cache remain original. Full2278PASS/0FAIL.
Device SubD/Mirror/ShowCage/edit/history/export gate pending, no speed claim.
Next measured bottleneck or richer project resources after feedback.

## Previous direction — .851 mode-specific vertex dots / frozen Beta 7, 2026-10-14

User requests dots only in Vertex mode. Existing cage batch builder skips visual marker
instances outside Vertex; indexed proxies retained for picking/snapping/bridge. Edges,
face picking, Clean/Soft and original cage suppression retained. Avoids marker drawing
and instance updates outside Vertex, no quantified speed claim. Full2276PASS/0FAIL.
User851 PASS2026-10-14 protects mode-switch/selection/Clean/Soft;850 PASS protected.
Next measured bottleneck or project-resource work after feedback.

## Previous direction — .850 active render geometry reuse / frozen Beta 7, 2026-10-13

849 screenshot113rebuilds mean8.6/max25ms; inactive0.1/6ms with226hits/0misses;
Body2.8/9ms. Cage workload differs from848, no controlled improvement claim.
Reuse one active SubD BufferGeometry through existing main + cache812 display identity;
changed display/modifiers/source replace it, SubD Off releases it; normal cage and
nonSubD cleanup retained. Full2273PASS/0FAIL. User850 PASS2026-10-14 protects
selection/edit/history/modifier/render-look baseline. Latest screenshot851:94rebuilds,
mean6.2/max39ms, Body1.0/9ms; no controlled before/after timing claim. Next measured bottleneck or richer
project resources after feedback; accepted846 and earlier protections retained.

## Previous direction — .849 inactive render geometry reuse / frozen Beta 7, 2026-10-13

848 capture111inactive hits/1miss but6.4ms inactive mean, cage6.2ms and activeSubD5.7ms.
Next narrow build reuses owned buffers for visible independent inactive SubD objects
through existing layer/display identity. Changes invalidate, hidden/active/removed
objects free buffers; shared wire wrappers never dispose retained geometry. Linked
path unchanged. Full2271PASS/0FAIL; same-scene849 visual/resource/timing gate pending.
Next measured cage/active geometry work or richer project resources after acceptance.

## Previous direction — .848 cache owner measurements / frozen Beta 7, 2026-10-13

847 device capture shows281aggregate hits/41misses,106rebuilds mean14.5ms and inactive
mean5.8ms, without comparable pre-change sample. Split existing Performance cache counts
into Active/Inactive while retaining total; no geometry/cache algorithm change.
Full2268PASS/0FAIL; repeat device capture to scope next measured improvement or richer
project resources. Full847 manual visual/history acceptance still not inferred.

## Previous direction — .847 inactive SubD display reuse / frozen Beta 7, 2026-10-13

User PASS .846 completes audited cage display fixes. Resume measured performance:
existing exact-input cache812 now serves each independent inactive SubD object through
native displayMeshFor, avoiding repeat subdivision of unchanged objects. Linked source
path unchanged; GPU geometry still rebuilt. Four native checks/full2266PASS/0FAIL.
Device multi-object surfaces/history/visibility and Performance phase capture pending.
Retains one CPU display result per cached object; iPad speed/memory tradeoff must be
measured. Next measured inactive/render work or staged project resource preservation.

## Previous direction — .846 Soft cage batch compatibility / frozen Beta 7, 2026-10-13

User Perfect PASS .845 protects Clean View. Adjacent existing Soft owner missed810
batch kinds too; now applies original opacity factors to batched lines/vertex markers.
Full restores exact materials, Clean compatibility/picking retained. Full2262PASS/0FAIL;
iPad Soft/Full/Clean/rebuild gate pending. This finishes the audited display mismatch
before staged project resources/measured performance. No new modelling capability.

## Previous direction — .845 Clean View repair / frozen Beta 7, 2026-10-13

User PASS .844 protects Live Array source editing. Clean On screenshot still shows
batched cage: existing Clean owner now handles810 batch kinds and restores prior
visibility safely. Full2259PASS/0FAIL; iPad Clean/rebuild/restore gate pending.
No broader feature change. Resume project resources/performance or concrete Live
Array polish after this repair is accepted; source editing and conversion are passed.

## Previous direction — .844 staged Live Array source editing / frozen Beta 7, 2026-10-13

User PASS .843 protects explicit conversion. Edit Source isolates the placed original
on the same object, with existing component tools and local Undo/Redo. Apply Source
regenerates all items with saved/staged count and END transforms, one final history
step; Cancel restores the original scene and history. Top-centre source bar yields
to existing component tool panels. Source-only stage updates result on Apply.
Full2256PASS/0FAIL; iPad source/exit/history/project gate pending before expansion.
Optional generated preview can be scoped after acceptance; richer project resources
and measured performance remain next broader priorities.

## Previous direction — .843 Live Array conversion / frozen Beta 7, 2026-10-13

User PASS .842 protects progressive endpoint transforms and combined persistence.
Convert to Mesh in the reopened Array panel commits its staged preview as ONE ordinary
editable mesh with a single Undo restoring the live recipe. Apply Array remains live;
separate objects are not created. Full2250PASS/0FAIL; device test pending.
Source component editing is the next Live Array stage after this conversion gate.

## Previous direction — .842 progressive Live Array transforms / frozen Beta 7, 2026-10-13

User PASS .841 protects one-object/reopen/history/project foundation. .842 adds END
rotation rings and uniform/axis scale handles + exact values. Original0°/1× interpolates
to END across intermediate items; per-item centres remain on evenly spaced path.
One recipe persists count/placement/rotation/scale; shared preview/Apply maths and
canonical frame preserve combined effects after whole-object transforms. Full2247PASS/0FAIL;
iPad acceptance pending. Next source editor/conversion or resume resources/performance
following acceptance and authoritative-owner audit.

## Previous direction — .841 accepted Live Array foundation, 2026-10-13

Optional Live mode in existing Array keeps one object with source/count/END recipe.
Reopen count/spacing, Cancel, one-step Undo/Redo and basic .boxlab persistence implemented;
whole-object affine placement recoverable, non-affine edits refuse safely. Full2241PASS/0FAIL.
User PASS .841 protected. Progressive endpoint scale/rotation now implemented842; source component editing
and full requested scope remain queued. Rich resources/performance follow.

## Previous direction — .840 accepted; project resources/performance, 2026-10-13

.839 user FAIL: idle source writes. Legacy bridge-topology edges also writes state.mesh;
.840 dedicated main publication prevents those helper writes taking live ownership.
Expanded actual legacy/live/manager chain fails839, passes840 with1000idle reads stable.
User PASS fresh Linked/Array idle/editing gate on2026-10-13. Protect owner repair.
Next scoped build may resume project resource persistence and measured performance;
linked-file round-trip sanity remains relevant before expanding rich resources.

## Requested Live Array — staged implementation, 2026-10-13

User requests a persistent, non-destructive Live Array presented as ONE object in the
Object Browser, following the existing Live Boolean result/source editing pattern.
Keep the array editable after creation: reopen its source, count, spacing/placement
and endpoint transforms rather than baking separate scene objects on Apply.

- Moving the last item controls the array extent through the existing Array end-copy
  interaction; rotating/scaling that last item controls the final orientation/size.
- Interpolate rotation and scale gradually from the unchanged original to the final
  item across every intermediate item. Support combined placement, rotation and scale.
- Transform handles on the last item remain available when reopening the Live Array;
  editing the original/source updates the generated array without losing parameters.
- Preserve one-object selection, Undo/Redo and .boxlab recipe/resource round-trip.
  Explicit conversion to independent meshes may be a separate operation; normal
  completion must retain the editable procedural array.

Before implementation, audit existing Array end-copy, instance/source, modifier/recipe
and Live Boolean object-list owners. Extend those authoritative owners; do not add a
parallel modelling kernel. Protect .840 linked/Array placement and idle stability.
Count/placement/single-object/persistence stage shipped and accepted in .841; endpoint
rotation/scale shipped842 and user PASS protected. Staged source component editing ships844 (device gate pending); conversion to one
ordinary mesh shipped843 and user PASS protected. Protect accepted .840 drift repair.

## Previous direction — .839 live-mesh identity feedback repair / frozen Beta 7, 2026-10-13

.838 stack identifies temporary instance-local mesh stealing live-world bridge identity,
then inverse placement repeatedly shifts source. .839 bridge honors explicit main owner,
ignores helper edges after publication and publishes bounded identity events. New tests
fail on actual old bridge/pass repaired; full2237PASS/0FAIL. Device Linked/Array move→Face
and linked-file gate pending before further feature work. .830/.831 PASS protected.

## Previous direction — .838 exact instancing source-write audit / frozen Beta 7, 2026-10-13

User .837 repair FAIL. .838 traces exact authoritative shared-source assignment, branch,
geometry bounds/placement and caller stack through existing Debug. No behavior change;
need device writer evidence before correcting placement/edit boundary. Features paused.

## Previous direction — .837 native main Object drag repair / frozen Beta 7, 2026-10-12

User .836 FAIL; diagonal move and Array produce same source jump. .837 covers actual
main direct Object drag completion, which .836 transform-upgrade fix did not own.
Actual main+manager regression reproduces old drift and preserves straight/diagonal
linked/Array-style placements after completion. Local2232PASS/0FAIL; iPad gate pending.
Keep broader feature work paused until Linked Duplicate and Array pass.

## Previous direction — .836 stale transform release repair / frozen Beta 7, 2026-10-12

.835 screenshot confirms shared-source jump with visibility retained. .836 authoritative
transform owner completes at window capture and closes before mode change, preventing
reused Pencil ID from continuing old move. Full2230PASS/0FAIL; iPad original/copy
placement and linked-edit/project gate pending before resources/performance expansion.

## Previous direction — .835 linked original drift diagnosis / frozen Beta 7, 2026-10-12

User screenshots .834 active geometry/placement/visibility agree, original moves far away.
AFTER microtask was early; .835 next-task trace and browser/render-error reporting expose
completed mode/UI/peer geometry. Device failure unresolved; no further feature work.

## Previous direction — .834 linked disappearance evidence / frozen Beta 7, 2026-10-12

.833 user retest FAIL. .834 adds off-by-default read-only LINKED bounds/visibility traces
inside existing Gesture Debug. Obtain iPad mode-switch screenshot before another repair;
no new modeling feature work until this failure is understood and fixed.

## Previous direction — .833 linked mode-transition failure repair / frozen Beta 7, 2026-10-12

User FAIL .832: moved Linked Duplicate disappears on Face-mode switch. .833 flushes
outgoing Object placement before main mode mutation; real-owner regression covers
Face/Edge/Vertex and later shared edits. Retest this case and .832 project persistence
before richer resources/performance expansion. .831/.830 PASS remain protected.

## Previous direction — .832 linked project instances / frozen Beta 7, 2026-10-12

User PASS .831 protected. .832 reopens linked instance pool from existing persisted
world meshes/matrices, validates shared local data, preserves independent placement and
allocator integrity. Save/Open guards and peer-sync tested; device linked edit/Move/Make
Unique/history gate pending. Next rich resource persistence and measured performance;
NOM/Curve cutters/UV remain queued. .830 zero-failure baseline remains protected.

## Previous direction — .831 basic project reference guides / frozen Beta 7, 2026-10-12

User PASS .830 protected. .831 restores mixed reference/editable projects via existing
codec/Open/manager, keeps guides locked, chooses editable primary, refuses reference-only
and linked/rich resources. Full2219PASS/0FAIL/0skip; iPad guide Save/Open gate pending.
Next linked-instance project persistence then rich resources, with performance work
alongside; NOM import/Curve cutters/UV tools remain queued.

## Previous direction — .830 zero regression failures / frozen Beta 7, 2026-10-12

User prioritised failures. .830 fixes new quadball orphan poles with versioned recipes,
keeps old grid recipes editable, reconciles three stale UI/diagnostic checks and tests
safe shallow concavity alongside unsafe-notch refusal. Full2216PASS/0FAIL/0skip.
Next iPad Balloon/merge/navigation sanity, then .boxlab resource completeness and
performance improvements before NOM/Curve cutters/UV painting. .829 Open device gate
also pending. All accepted gestures and frozen Beta7 remain protected.

## Previous direction — .829 project Open hardening / frozen Beta 7, 2026-10-12

.829 hardens existing basic Open manager rollback, allocator and history integrity;
corrects stale Save status and unifies drawer/shell object-management loading.
Focused tests12PASS; full2216/2211PASS/5 existing FAIL, no new failures versus main.
Device Save/Open Cancel/Confirm/Add/edit gate pending. Next audit five existing
Curve/Balloon test failures, then staged project resources; NOM/UV remain queued.


.797 PASS protects the green baseline, GLB group import and Rotate. .796 Add+ previews,
unit-zone scale and Text remain protected. First Editable Boolean build stores independent
A/B source recipes and reopens them for existing Move/Rotate/Scale, explicit Update Preview,
Apply/Cancel and one scene Undo/Redo. User .801 PASS protects activation/exit and corrected radial. Concrete uploaded dense
Extrude repair in .802 takes priority before expanding: existing coalescer now handles
more than256 private wall cells, preserving guarded topology. User .802 PASS protects
the clean extrusion case and continued-modelling/history checks. .803 implements automatic
staged Live Boolean previews through existing editor/solver/history owners; device
acceptance failed for combined source/result presentation. .804 repairs this with
exclusive Result/Sources views; user .804 PASS protected. .805 compacts the Boolean
object list using existing recipes;  .806 removes redundant Update Preview and matches compact popup typography;
User .806 PASS protected; .807 matches startup/reset cube to accepted Add+1unit.
User .807 AWESOME PASS; Beta7 freeze/deployment explicitly requested and implemented
from accepted source; Pages and regression CI succeeded. User then chose to start the shared curve foundation: .808 Add+ Curve draw/edit profiles, user PASS protected. .809 performance readout and crease lookup accepted with iPad captures. .810 batches visible cage edges/markers while retaining authoritative picking proxies. .811 reuses unchanged active SubD results through exact cage/settings comparison; existing kernels and export isolation retained. User .812 Awesome acceptance recorded; readout identifies inactive displays as dominant cost. Performance work paused as requested. .813 brings the audited MeshUtilz Outline Balloon generator into the existing Curve editor, with Depth/rotatable preview, native editable triangle solid and recipe/history reuse. Convex closed outlines first; drawing/point editing and valid-profile preview accepted. .814 repairs over-strict rejection of tiny hand-drawn oval wobbles, explains invalid candidates inside preview; device retest pending. .815 cancels profile sessions on Reset and moves the existing Pencil authoring owner ahead of document modelling consumers; Reset/draw/navigation retest required before expanding. User PASS .815 Reset/Pencil but reports severe Balloon insertion slowdown. .816 adds optional donor Density4–12 for new Balloons, preserves legacy tessellation, and awaits iPad device performance test. User reports .816 substantially more responsive. .817 tests shallow star-shaped concavities through existing donor radial interpolation and actual-rim fold guard; await iPad feedback before promising broad concave support. User .817 accepts concave C and star; deep crescent fails. .818 offers optional quad-dominant ring strips (triangular poles remain), preserving existing triangle fallback. Real iPad test will determine whether stronger quad pole patching is worthwhile. User accepts .818 quad editing and wants cleaner poles. .819 pairs adjacent pole fan triangles for new Balloons; device and CI gates pending before stronger pole patches. User requests true quadball poles, not .819 kite faces. .820 introduces boundary-matched quad grid caps for new Balloons, preserving legacy geometry and needing iPad tests. Remaining triangulation/render-buffer optimisation can resume later; project Save/Open, NOM import, then Balloon and Curve Cutter consumers. Beta7 remains
frozen at .807 and immutable.

## Requested UV/texture workflow and performance — queued

Imported GLB UV/material/texture passthrough exists. Stage imported-UV inspection,
authoritative editable face-corner seam channels, projection/seam unwrap and packing,
then painting through existing Three.js textures. Preserve channels through topology,
history and .boxlab embedded resources. Larger painting/PBR/layer budgets need iPad
measurement; these are not implemented or promised by the Curve build.

User reports rapid slowdown with higher polygon counts. Audit identifies per-edge
Line/per-vertex sphere objects, active-display rebuilds, per-frame marker work and
full mesh/stack history clones. Measure first, then batch/instance cage geometry and
reuse render buffers; cache topology and accelerate picking as justified. Keep recent
Undo resident; optimise duplicate snapshots and evaluate older history in IndexedDB/
OPFS with quota/recovery handling. Exporting history alone will not improve draw calls.

User PASS .821 Pencil point merge. .822 introduces read-only project snapshot preflight through existing scene owner; versioned .boxlab codec and File Save/Open remain next steps, not shipped.\n\n## Added priorities — project files and NOM import

User requests native `.BOXLAB` Save/Open and Nomad `.nom` import. Recommended order:
1. Versioned `.boxlab` project format and File Save/Open, preserving complete editable
   scene including hidden Boolean sources/recipes, groups/links, modifiers and scale.
2. NOM import using existing container reader and scene importer, validated against
   real Nomad files; staged geometry/names/facegroups before richer attributes.
3. Shared curve editor and Balloon silhouette object, auditing existing Balloon code.
4. Extruded curve cutters feeding existing editable Boolean owner.
5. Quad-remeshing feasibility using open algorithms or licensed integration.

The project schema should be portable between browser and a future native iPad app.
Version migrations, validated atomic reopen and future procedural parameters belong
to the design. Native file-type registration and cross-session Undo persistence are
separate decisions. Export/import meshes do not replace native project persistence.
Both additions are queued, not implemented. Editable/live Boolean steps are complete.

## Beta 6 delivery refinement — .736

.735 user PASS. NOMAD now follows validated MeshUtilz browser-download/preview
route instead of generic save/share, with longer URL lifetime. Format/geometry
unchanged. Await iPad Download → Open In/Share → Nomad result and final release
smoke, then accepted candidate freeze. No more native-format features queued.

## Beta 6 native-handoff refinement — .735

.734 user PASS. Shared XYZ button colours and File NOMAD exporter implemented,
reusing MeshUtilz balloon-v0.6 native container/template. Geometry/names/groups,
Base/SubD/Mirror covered; existing GLB retained for richer channels. Await .735
Nomad first-open test and final iPad smoke, then freeze exact accepted Beta6 source.
No unrelated features or NOM-import promise.

## Beta 6 candidate correction — .734

User requests component Align on gizmos. Vertex/Edge original Align functionality
is exposed using point/line icons; Face Align moves out of radial to face icon.
All reuse component-align .705 and original anchor/history behavior. Await .734
Align plus .733 Focus device checks, then final release smoke/Files/Nomad and freeze.
No unrelated features.

## Beta 6 final candidate — .733, 2026-10-05

.732 user PASS. Default-launch Focus and armed toolbar icon implemented in .733.
No further feature work before Beta6 freeze. Release notes draft prepared. Remaining
checks: .733 Focus toggle/browser, final iPad navigation/history/Multi/Boolean/
Extract smoke, Files/Nomad round-trip. After those pass, freeze exact accepted
source into /beta-6/, finalize notes, publish and verify immutable frozen URL.
Existing full-suite test debt is documented, not claimed green.

## Current bundled refinement — .732, 2026-10-05

.731 explicitly PASS. .732 implements popup packing, audited background exits,
Array axis/Free handles, operation-scoped Inset Repeat, and top-bar/right-side
Object Browser with original Modifiers. Automated checks complete; grouped iPad
acceptance pending (TEST_CHECKLIST.md). Resume Beta 6 release checks after feedback;
no Beta 6 freeze or unrelated feature work.

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


### Combined viewport UI refinement — .718

Viewport Multi repair stays in actual early activation owner; original transform
file1.0 unchanged. Top icons share gizmo shapes, VIEW retained; original Snap/Lasso
controls above mode buttons. Confirmed double-background tap inverts original set
through selection owners with context guards. 61 targeted PASS; no new failures.
Minimal-drawer audit in handoff: modifiers, selection depth/filters/bulk controls and
Object List access with empty selection remain. Keep drawer available; user chooses
remaining homes after .718 hands-on, no unsolicited radial selection items.

### Lasso / Invert completion refinement — .719

Follow-up to .718: stationary background tap ends Lasso through its original owner
and existing main completion; semantic/canvas delivery is deduplicated per release.
No new raw-pointer owner or modelling/history changes. Full regression has identical
283 failure names to .718 (1219/936/283). Next iPad Lasso/Invert/Multi/navigation
confirmation and pending .716/.713 checks; retain drawer fallbacks.

### Edge Lasso / double-background timing refinement — .720

.719 Edge/Lasso and timing FAIL recorded. Existing Edge Paint yields to Lasso;
main background owner uses early window capture; native release timestamps replace
Safari timer-based deduplication and drive500ms Invert. No new gesture owner or
modelling kernel. Seven new regressions,38 targeted PASS; full1226/943/283, same
failure names as .719. Next iPad Edge/Lasso/Invert/navigation confirmation; use
Gesture Debug if still failing. Keep drawer and prior pending checks.

### Object List Modifiers / double-tap diagnosis — .721

.720 Lasso cancellation/drawing/finger navigation passed and protected. Slight
Lasso selection tightening explicitly deferred MUCH LATER to final perfection.
Double-background Invert still FAIL. .721 exposes original collapsed Modifiers
below Objects in Focus Object List; original controls and disclosure restoration.
Existing Invert matcher gains diagnostic-only reason/timing/count logs; behavior
unchanged pending on-device Gesture Debug screenshot before further gesture fixes.
21 targeted PASS; full1228/945/283, same failure names. Next Modifiers hand checks
and double-tap debug capture. Keep other pending checks/drawer fallbacks.


### Readable background-tap evidence — .722

.721 screenshot flooded by Pencil hover/movement; no Invert decision visible.
Pin last six BACKGROUND diagnostics and quiet repetitive logs, without gesture
changes. 8 targeted PASS; full1231/948/283, same failures. Next one-finger then
Pencil double-background trace; Invert and Modifiers device checks still pending.


### Physical double-tap evidence — .723

.722 screenshots do not identify second-contact failure. Preserve read-only
physical down/up/cancel evidence alongside semantic decisions; no gesture change.
10 targeted PASS; full1233/950/283, same failures. Invert and Modifiers device
checks pending. Main/Pencil movement thresholds both8px; do not repeat mismatch claim.


### Background hold replaces double-tap Invert — .724

User chose500ms stationary background hold for current-selection Invert; short tap
clears/exits Lasso, hold retains Lasso and survives release. Existing owner and
original selection APIs, guarded against navigation/multiple contact/context/session
changes. Double-tap retired.24 targeted PASS; full1237/954/283, same failures. Next
iPad hold/tap/release/Lasso/navigation tests, then pending Modifiers/radial refinement.


### Beta6 drawer access — .726

VIEW Object List closes empty-selection/hidden-gizmo Focus access gap by reusing
original mode/list owners. Original collapsed Modifiers included; busy tools guarded.
12 targeted PASS; full1240/957/283, same failures. Next iPad list/Modifiers checks,
remaining selection-depth/filter/bulk Object access audit, combined radial/session
regression before Beta6 freeze. Keep drawer fallback and passed .724 interactions.


### Beta6 viewport selection depth — .727

.726 Object List access user PASS. Move original Visible/Through depth controls to
viewport strip for normal/Focus access. Original owners/listeners and geometry math
retained.27 targeted PASS; .726 full baseline1240/957/283 retained. Next iPad depth/
layout sanity check, remaining advanced filters/bulk Object audit and release regression.


### .728 Beta6 grouped build progress
Selection-access batch implemented: viewport SELECT exposes complete original component filters/commands and contextual Object bulk controls; manual validation pending. Next batch: radial/session polish across all modes, then release-candidate navigation/transform/Multi/Boolean/history/object/file/Nomad regressions, then Beta6 freeze. Lasso tightening remains deferred until final polish.


### .729 Beta6 grouped radial/session audit
Batch2 implemented and automated: all modes' original inventory/availability/settings/lifecycle reviewed; fixed Face drag guards, Edge context/queued exits and puck suppression, Crease single Undo ownership, rejected launches/read-only actions and shared wide-panel spacing/hidden stages. Device acceptance pending. Next /nextbuild 3: release-candidate regression across navigation/transforms/type-in/Multi/Boolean/history/object management/files/Nomad; then combined passes and Beta6 freeze. .728 manual acceptance still pending; Lasso tightening deferred.


### .730 Beta6 release-candidate audit / compact UI
User supersedes fixed-width popouts and removes Visible/Through UI (retain Lasso/SELECT). Compact content-sized panels implemented; RC audit restores missing Extract closing brace, validates279 source modules and actual transform/export/Extract owners.53 focused PASS; full1265/982/283 with identical existing failures. Device/WebGL/Files/Nomad checks still pending; see BETA_6_RELEASE_CHECKLIST.md. Next grouped iPad smoke test and issue review, then Beta6 freeze/notes. No Beta6 release claimed yet.


### .731 quick pre-finalization refinement — device checks pending

Sweep Face/Edge uses one original staged viewport dock; Edge Slide persists until
Done/background; Edge/Vertex popup blue bevel preview added through original owners,
retaining viewport drag bevel. 86 focused PASS; no new full-suite failure names.
Continue .730/.731 grouped iPad checks and Files/Nomad export acceptance; freeze Beta6
only after user feedback and blocker review. Slight Lasso tightening deferred.

## 2026-10-05 — Beta 6 released

Accepted .736 frozen at /beta-6/. No more feature work in this snapshot.
Next: final frozen-link device smoke, then choose post-Beta6 work separately.

## 2026-10-05 — Post-Beta6 reliability path

User approves reliability audit. Complete report/inventory in docs. Next batch
repairs test contracts and visibility without changing accepted runtime/frozenbeta;
then CI gate/coverage, varied Bevel/Knife→Loop, scene history and Nomad handoff.
277 failures are check results, not confirmed app bugs; no blanket quarantine.

## 2026-10-05 — .737 reliability batch1

Release/cache contracts and historicalscope reconciled;333 named scriptchecks,
full1610/1492/118/0skip. Modeller/frozenbetas unchanged. Next currentselection/
Gizmo/tool lifecycle semantic fixtures and OBJgroups before algorithms; CI release
gate follows genuine test reconciliation. See docs/reliability-build-737.md.


### .773 publication verification — 2026-10-09

Published32d70bb2e73151b3cb3b61f387e312d1d4371965; tree86adb0a691e79059379ac202554ac4c7a1d7f145 exactly matches tested checkout.
Actual Node22 Topology37933050867/job113828237624:2050tests/1964PASS/86FAIL/0skip;
all86 failure names match local. Pages37933050504 success. Live shell/version,
unchanged Gizmo and frozenBeta6 version byte-match tested checkout. Focused74PASS.
User .772 PASS recorded; .773 device sanity pending. Runtime source unchanged.

## .778 publication verification — 2026-10-10

Release commit `d0ba0fe19edee45b6a82f41b33d1a37b681d9e5f`, tree
`620c4e497aaef5586a46ffe959a4d5209e00e9af` matches tested checkout.
Actual Node22 Topology run38005274839/job114072505737:2055tests/2000PASS/55FAIL/
0skip; all55 failure names exactly match local inventory. Pages38005274578 succeeded.
Fresh live index.html/version.json, unchanged Face/main owners and frozenBeta6
version byte-match repository. Focused65PASS. User .777 PASS recorded; .778 device
sanity pending. Runtime/frozenBeta unchanged.

## .779 publication verification — 2026-10-10

Release commit `5b24a307f9239286ece4d9947ad6a3f79dfb5542`, tree
`7fc73ef19749c57ec1c910724af03851d6f84905` matches tested checkout.
Actual Node22 Topology run38006619712/job114076765987:2068tests/2013PASS/55FAIL/
0skip; all55 failure names exactly match local inventory and778. Pages38006618687
succeeded. Fresh live index/version/kernel/Face import owner, unchanged main and
frozenBeta6 version byte-match repository.84focusedPASS. User .778 PASS recorded;
.779 supplied-model device acceptance pending.

## .780 publication verification — 2026-10-10

Release commit `2f200c6bec86eebc417034619949923e14633e4a`, tree
`ff10ed4fc279c5e7973b92d798461bc99a02218f` matches tested checkout.
Actual Node22 Topology run38007376560/job114079177377:2071tests/2019PASS/52FAIL/
0skip; all52 failure names exactly match local inventory. Pages38007376421 succeeded.
Fresh live index/version, unchanged main/accepted Through779 and frozenBeta6 version
byte-match repository.120focusedPASS. User .779 PASS recorded; .780 device sanity
pending. Runtime/frozenBeta unchanged.

## .781 publication verification — 2026-10-10

Release commit `c49f57c40528236343c38671313868dc526c82a8`, tree
`f45523d23b7618a672ca93c0c91497a614cfccc2` matches tested checkout.
Actual Node22 Topology run38009270303/job114085236411:2072tests/2025PASS/47FAIL/
0skip; all47 failure names exactly match local inventory. Pages38009270112 succeeded.
Fresh live index/version, unchanged main/Face779 and frozenBeta6 version byte-match
repository.115clean-focusedPASS; target group19PASS/1existing diagnostic FAIL.
User .780 PASS recorded; .781 device sanity pending. Runtime/frozenBeta unchanged.

## .782 publication verification — 2026-10-10

Release commit `8b74b8c1107d1eda3778cca05afaddad0e085710`, tree
`f9ad57892348ae6336d17a2bfae1fb93939f834c` matches tested checkout.
Actual Node22 Topology run38011380865/job114091946863:2073tests/2033PASS/40FAIL/
0skip; all40 failure names exactly match local inventory. Pages38011380490 succeeded.
Fresh live index/version, unchanged central debug/Face779 and frozenBeta6 version
byte-match repository.123focusedPASS; all five original .722 test bodies byte-identical.
User .781 PASS recorded; .782 device sanity pending. Runtime/frozenBeta unchanged.


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


### .785 publication verification — 2026-10-10

Release commit `4437ecb4ab9e8223260b912163ee1310a2761732`, tree
`e5aadf925fe9b39f57d9a00f32899a24b11f8f23` exactly matches tested checkout.
Actual Node22 Topology run38018332508/job114113537665:2077tests/2045PASS/32FAIL/
0skip; all32failure identities exactly match docs/reliability-build-785.json.
Pages run38018332469 succeeded. Fresh live index.html/version.json byte-match785;
unchanged main762/Face779 and frozenBeta6 version also match live repository bytes.
110focusedPASS; source/frozenBeta unchanged. .784 user PASS protected; .785 device
sanity pending. Shell markers/recovery785 coherent, original modelling pins retained.


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
