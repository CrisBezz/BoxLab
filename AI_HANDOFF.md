# BoxLab AI Handoff — .860 editable Live Array duplicates

## Current state — 2026-10-14
CrisBezz/BoxLab main build0.36.18.860; live https://crisbezz.github.io/BoxLab/.
Release40f638db; CI/Pages/live verified. User explicitly approves ongoing pushing/publishing.
Read AI_WORKFLOW completely, this handoff, TEST_CHECKLIST, recent DEV_HISTORY and
ROADMAP before code. Repository is source of truth. Standing publish authorization.
Frozen Beta7 .807 and Beta2–6 immutable. Protect Multi1.0, Loop715, Extrude802,
Boolean806 and all accepted Pencil/navigation/selection behaviour.

## .860 scope — ordinary Duplicate keeps an independent Live Array, device gate pending
User explicitly authorizes all future pushing/publishing and /nextbuild. Publish prior859
first: connected GitHub tree4008eb4179031b70f4882bdb0f729f96b658c267 exactly matches local;
main d7dae3c8147373920e9c526f0b6eb36e5482e4bc, CI/Pages/live verified below. No859 PASS inferred.
Audit manager duplicateActive/addObject and management duplicateSelection: single omitted
arrayRecipe; Multi cloned it in snapshots but never installed it. Both now forward recipe
through existing addObject, which JSON-deep-copies serialized recipe rather than shallow
cloneLooseValue. Each copy remains ONE independent object with own source/count/END/frame.
Native affine reopen/evaluator/source editor/history/file owners remain authoritative.
Preserves SubD/settings, mixed ordinary+LiveArray groups, independent geometry, Move and
859 read-only GLB payload. Linked Duplicate/unchecked Array and all protected kernels
unchanged; no new recipe version, kernel/history/gesture/render owner.
Three native tests: both actual duplicate owners, deep source/END independence, placed
rotation/nonuniform scale/move reopen, SubD, mixed grouped Multi, count+END Apply, source
Apply/Cancel/edit UndoRedo, codec/native scene replacement and original unaffected.
Test staging correctly distinguishes native incoming scene from renamed module globals.
Known pre-existing arbitrary-angle affine tail-rounding issue reproduced WITHOUT any
Duplicate: after count/END Apply, reopenArray can return placement[15]=1.0000000000000002;
strict arrayTransforms refuses subsequent source reopen. Separate next repair;860 tests
cover exact affine rotation/scale/translation, not blanket transformed-array acceptance.
Recipe clone must remain deep; manager cloneLooseValue is intentionally shallow for
mesh fields and cannot safely clone this recipe. No general clone refactor.
Manager/management860→unchanged codec858, drawer860/shell+recovery860. Array857/evaluator842/
source857/main+Loop854/builder851/cache812/protected/frozen remain unchanged.
Full validation/publication proof recorded below. Device860 gate pending; separate859
GLB duplication/Nomad gate pending. User858 PASS remains protected.

## .859 scope — imported GLB resources through ordinary Duplicate, device gate pending
User858 PASS /nextbuild protects pooled imported-resource Save/Open/export, older resource
file reopen/re-save and plain/LiveArray sanity. Audit existing duplicateActive in manager
and duplicateSelection in object-management: both omitted imported glbPassthrough.
Pass the original read-only payload through existing addObject/addMesh options. Geometry
remains independently cloned; image/UV/material/metadata payload is shared read-only, as
in accepted855 scene history. Future resource edits must copy touched data and replace
the payload. Existing selection/group/settings/activation/Move handoff owners unchanged.
No new duplicate/resource/history/render/export kernel. Linked Duplicate and linked-rich
project restriction unchanged; no texture display/painting/unwrap claim.
Three native regressions execute both actual duplicate owners and manager: independent
geometry/plain+rich grouped Multi/Move handoff, deleted-copy scene UndoRedo, pooled codec
roundtrip/native scene replacement, real Three GLB UV export and exact original final
material/image-byte patch. Original exporter topology signature rejects stale UVs after
face edits. Node lacks browser image decode; Nomad visual comparison remains device gate.
Manager+management859, drawer loader859/shell+recovery859. Codec/resource858/main+Loop854/
Array857/builder851/cache812/protected/frozen owners retained. Full validation and
publication proof recorded below. Tests cover delete/UndoRedo of duplicates, not a new
Duplicate transaction-history implementation; activation history semantics unchanged.

## Protected .858 — user PASS2026-10-14
User PASS to858 test list: imported-resource .boxlab roundtrip/export, legacy reopen/
re-save and plain/LiveArray sanity. Protect accepted resource-v2 image pool and legacy
inline compatibility. Shared resource buffers remain read-only. Keep distinct857 source
editing/conversion gates separate; no new performance benchmark inferred.

## .858 scope — shared embedded image pool in .boxlab, accepted
User /nextbuild. Current857 Apply/SubD acceptance protected. Audit856 codec/importer:
multiple imported objects repeat whole shared image byte arrays in every resource
payload. Extend existing resource helper/codec with optional scene glbImagePool and
resource version2 references; identical canonical bytes serialize once, including
separate buffers with equal contents. Per-object image definitions/materials/UV/metadata
remain independent. Different bytes retain different pool entries. No renderer/kernel/
texture editor/resource-history owner. New decoded pool bytes are read-only and shared;
future resource editors must copy touched buffers before replacing payloads.
Decoder validates canonical bytes/length/24MB unique pool and safe in-range references.
Legacy856 resource version1 inline and plain v1 files still open: non-enumerable decode
flag preserves their original encoding during Open's exact roundtrip check. Fresh Save
uses pooled encoding; metadata-only resources stayversion1, pooled binary resources2.
Project header remainsv1; old app versions safely refuse new referenced resources.
Save32MB/Open limits, invalid-file/cancel/rollback/history semantics and linked-rich/
other-resource refusals retained. Dedup reduces repeated image file/storage and new-file
byte allocations, not arbitrary scene/render speed. No project history persistence.
Four new native codec/Open tests cover shared+equal bytes/size reduction, distinct images,
per-object definitions/materials/UVs, shared decoded buffers, exact legacy/plain roundtrip,
bad pool bytes/index/shape/version and rejection before scene replacement. Full2297PASS/
0FAIL/0skip. Codec+resource+management+drawer/shell+recovery858; manager856/main+Loop854/
Array857/builder851/cache812/protected/frozen owners unchanged. Publication proof recorded below.
858 resource-file gate accepted; do not infer full857 source gate.

## Protected .857 Apply — user confirms working2026-10-14
User reports856 LiveArray + later SubD modifier: Edit/apply errors independent geometry;
turning off SubD works. Audit existing Array apply/reopen/source stage: guard blocks
SubD universally although object.mesh and recipe remain independent base geometry.
linear-array now allows SubD when applying/converting an existing arrayRecipe; new Live
creation still rejects SubD. Existing source editor accepts SubD, retains Mirror/link/
Boolean/reference/locked/rich-resource guards. Base source/recipe regeneration uses
original owners, object modifier settings stay intact throughout Apply/Cancel/history.
No baked subdivision/new kernel or new preview/render owner. Existing END preview stays
its source-cage guide; native SubD displays regenerated result after Apply. Mirror stays
unsupported for this Live workflow. SubD levels/cage, count/END rotation+scale, one object,
source-local history and saved scene history/recipe restore unchanged. Safe base recipe
reopen still rejects non-affine component edits of the combined result.
Three native manager/Array/source/history/codec tests cover count+END Apply/SubD display
parity, source edit Apply/Cancel, UndoRedo/settings and .boxlab reopen, conversion and
new-creation/Mirror refusal.844 modifier-refusal case becomes Mirror, retaining other
invalid-context guards; three legacy Array pin assertions advance857, behavior retained.
Full2293PASS/0FAIL/0skip. Array857→source-editor857→source-core857, evaluator842 unchanged;
shell/recovery857; main+Loop854/manager+codec+management+drawer856/builder851/cache812/
Clean845/Soft846/protected/frozen owners unchanged. Publication/Node22/live proof recorded below.
User confirms857 Apply with SubD works after suspected file refresh; protect this gate.
Source-edit/conversion/file checks and856 resource-file gate remain separately pending.

## .856 scope — imported GLB .boxlab Save/Open, device gate pending
User855 PASS protects imported GLB scene-history/resource restoration and export.
Audit existing codec/SaveOpen/snapshot/atomic replacement/export paths found no binary
project-resource encoder. Extend existing v1 codec with optional glbResource (own version1),
using small project-glb-resources856 transport helper. Imported version1/sourceglb payload
keeps plain JSON metadata/UV/tangent/colour/morph arrays, material/texture definitions
and embedded images; Uint8Array image bytes encode canonical base64 with exact lengths.
Decode validates envelope/base64/canonical bytes/finite metadata/24MB image pool, creates
independent byte buffers, then native manager stages meshes and original payloads through
existing atomic scene replacement. Invalid files/cancel/render failure leave scene and
history unchanged; successful Open resets history as before. Plain v1 encoding unchanged.
Save validates full JSON roundtrip and refuses files over existing32MB Open limit.
File Save label now simply Save .boxlab; status mentions imported GLB resources, no Undo
history. Existing snapshot checker no longer falsely says Save/Open is not enabled.
Other resource owners (materials/textures outside glbPassthrough, mesh UV layers/slots)
and linked importedGLB projects still refuse. No texture editing/rendering, UV unwrap,
new import/export/modelling/history owner or resource-pool deduplication. Export still
checks its original topology/geometry signatures for safe attribute restoration.
Five native tests cover canonical binary+JSON/plain compatibility, malformed/oversized
payloads/unsupported channels, actual SaveOpen+manager replacement, cancel/invalid-file
preservation, rollback and save-size refusal.855 rich codec refusal assertion advances
to imported payload support while other resource refusal remains;829 UI status assertions
advance to accurate Open text, original semantics retained. Full2290PASS/0FAIL/0skip.
Codec856→new resource856; management856→codec856; drawer856→management856; manager856;
shell/recovery856. Main+LoopCommit854/builder851/cache812/Array844/Clean845/Soft846/
protected/frozen kernels unchanged. Publication/Node22/live verification recorded below.

## Protected .855 scope — user PASS2026-10-14
User854 PASS protects native Loop EXACT/repeat/exit/history; move to roadmap resource
foundation. Audit existing import-mesh797 glbPassthrough, manager storage, export741,
scene snapshots and codec842: snapshotObject omitted read-only imported GLB payload;
restoreScene recreated objects without it. Scene Undo/Redo could silently lose UVs,
tangents/colours/morph metadata, materials/textures/image bytes and Nomad extras.
Existing object-management snapshot/restore now carries glbPassthrough by reference.
Audit found resource writes only during import before object installation; exporters
read it. Share this read-only payload/images through history, avoiding large buffer
copies. Any future resource editor MUST replace payload (copy-on-write), never mutate
shared payload in place. Geometry/settings/recipes still clone through existing owners.
Restoration uses snapshot payload, not whichever object currently has same ID; absent
payload remains absent. Deleted objects restore resources even without a prior object.
Three native tests exercise actual manager/scene History, delete/UndoRedo/replacement,
shared byte/UV/morph identity, rich codec refusal/plain v1 unchanged, real GLB geometry/
UV export + final native metadata/material/image patch. Node lacks image decode, so
final image-bound GLB byte verification is separate from native geometry/UV loader.
Full2285PASS/0FAIL/0skip. Management855→unchanged codec842; drawer855→management855;
shell/recovery855; main+LoopCommit854/builder851/cache812/manager849/Array844/Clean845/
Soft846/protected/frozen owners unchanged. Publication/Node22/live verification recorded below.
Rich .boxlab save/open still refuses imported resources. No new renderer/codec/resource
pool/history format; this stage protects existing resources within scene history only.

## Protected .854 scope — user PASS2026-10-14
User Awesome853 PASS /nextbuild protects single/MultiLoop EXACT/background/mode exit,
editable cut faces and UndoRedo. Audit native cleanup and commit853: commit still clicks
Undo then Redo to retire private slides. That replaces live mesh and rebuilds scene
unnecessarily. MainDirectTool now exposes guarded commitLoopCut using existing
clearLoopSlide + renderMesh; adapter delegates to it instead of clicking history UI.
Cut already commits history during native gesture; completion adds no history and
keeps exact mesh identity, placed geometry and current undo/redo tokens. Adapter keeps
853 batched cageMaterial detection, direct edge selection, persistent repeat Loop,
background/session owners and busy guard. Rejected native cleanup returnsfalse through
adapter. No new history/kernel/gesture/visibility owner, clone/cache/revision system.
Two new actual main+adapter+kernel/history tests cover1/5cuts, slide, same mesh/tokens,
one cleanup redraw, no synthetic UI history and actual UndoRedo, busy/no-stage rejection.
632 history-replay source contract now asserts native cleanup/no clicks;715/746/853 fixtures
model native cleanup instead of mesh replacement, retaining geometry/selection/history
assertions. Full2282PASS/0FAIL/0skip. Main854/commit854/shell+recovery854 coherent;
builder851/cache812/manager849/Array844/Clean845/Soft846/protected/frozen kernels unchanged.
Publication/Node22/live verification recorded below. Device repeat/EXACT/exit/history gate pending.

## Protected .853 scope — user PASS2026-10-14
User reports852 Edge Loop MultiLoop fails to finish; single cut remains yellow.
Screenshot852 shows28verts/26faces/5active loops after leaving to Face: topology exists
but private slide state remains active. Do not attribute this to852 optimisation.
Audit actual main/native cuts,715 commit,713 viewport session and810/851 batches:
commit checks edge.material yellow, but batched proxies have invisible pick materials;
actual colour is userData.cageMaterial. Existing commit now reads that authoritative
material, retaining original fallback for legacy proxies. EXACT/pending detection works
again; original scene Undo/Redo-based completion and direct edge selection retained.
Main setDirectTool now clears activeLoopSlides/activeLoopSlide/slider when leaving
loopCut. This covers background finish, mode switch and another tool/disarm. Rearming
Loop preserves staged slides; busy gesture guard retained. Cut/slide kernels unchanged,
no new event/history/geometry/visibility owner. Loop commit715 repinned853 only for this
explicit requested bug; protected loop topology/behaviour and other kernels retained.
Two native regressions reproduce real batched proxies + single/5cuts/placed slide,
EXACT detection/shape/one UndoRedo and main finish/disarm/rearm/busy cleanup. Fixture
compares native vertices/faces/creases rather than clone-normalised faceGroup padding.
Existing632/715/713 semantic coverage retained;713 literal commit pin becomes reviewed
asset assertion. Full2280PASS/0FAIL/0skip. Main853/commit853/shell+recovery853 coherent;
builder851/cache812/manager849/Array844/Clean845/Soft846/frozen kernels unchanged.
Publication/Node22/live verification recorded below.852 acceptance not received;851 PASS protected.

## .852 scope — avoid unused active base calculation, device gate pending
User851 PASS protects Vertex-only visual dots, mode switching/picking/history/Clean/Soft.
Audit latest main/live851/pins and852 measured direction: Base/SubD dominates recent
readout; native renderMesh always calls modifiedBaseMesh even for a SubD surface with
no displayed mirror cage. Base result then has no consumer. Calculate it only for
nonSubD body or enabled mirror cage (Show Cage + active axis). SubD kernel/cache/result,
GPUreuse850, actual base/cage native path and explicit export unchanged. No new cache,
mesh identity/revision/kernel/visibility/history owner or changes to accepted851 dots.
Two native main/kernel tests cover no-base call cases, mirror/ShowCage/SubD toggles,
visible surface/cage parity, direct edit/Undo and independent fresh base export.
812 measured fixture now expects0ms unused base on hit and20ms native SubD on miss,
rather than2/22ms; all phase/counter/scene/cage semantics retained. Full2278PASS/0FAIL/
0skip. Main852→unchanged builder851/cache812; shell/recovery852; manager849/monitor+core848/
Array844/drawer846/Clean845/CageIntensity846/protected/frozen pins unchanged.
Publication/Node22/live verification recorded below. No quantified iPad speed claim; dense
native SubD edits still recompute.851 accepted independently of earlier capture evidence.

## Protected .851 scope — user PASS2026-10-14
User asks to hide vertices until Vertex mode during optimisation. Audit: main addCage
always registers invisible indexed vertex proxies, then810 visual builder creates
InstancedMesh dots. Main now passes showVertices only for Vertex mode to existing
createCageBatch; finish omits visual dot batches otherwise. Proxy indices/materials,
ray-picking/snapping/bridge remain available in every mode. Edge lines/face pickers,
selected marker materials, geometry/topology/history and gestures unchanged. No new
visibility/pointer owner. Omitting instances avoids their draw and per-frame matrix
updates; proxies and their screen sizing still exist, no device speed claim.
Vertex mode still respects SubD Show Cage/Clean/group/Boolean-source suppression;
this does not force a hidden cage visible. Default batch option true preserves other
callers. Mode changes use existing native cage rebuild, including tools entering Vertex.
Three new native tests protect repeated mode transitions/selected materials/real raycasts,
geometry cleanup and actual Clean845/Soft846 integration.810 assertions now require
visual dots only in Vertex, dense Face cage one visual line batch; original topology,
material/order/picking/bridge/Lasso coverage retained. Full local2276PASS/0FAIL/0skip.
Main851→cage-render-batches851; shell/recovery851. CPUcache812/manager849/monitor+core848,
Array844/drawer846/Clean845/CageIntensity846 and protected/frozen kernels unchanged.
Publication/Node22/live verification recorded below. User850 and851 PASS2026-10-14 protected.

## Protected .850 scope — user PASS2026-10-14
Latest849 screenshot:113rebuilds mean8.6/max25ms; Inactive0.1/6ms, Body2.8/9ms,
Base/SubD5.4/19ms, Cage0.1/1ms; active63hits/50misses, inactive226hits/0misses.
Earlier848 had different cage workload: evidence of reuse, not a controlled speed
benchmark or full manual PASS. User /nextbuild authorizes next narrow active stage.
Audit found native main renderMesh triangulates even when existing cache812 returns
an unchanged immutable display result. Main root now retains one active SubD
BufferGeometry keyed by that result identity. Wrapper/cage/highlight rebuilds preserve
it; display changes dispose/replace it, disabling SubD releases it. Existing exact-input
CPU cache handles geometry/metadata/modifier/mesh replacement invalidation. Ordinary
non-SubD geometry keeps original disposal/rebuild. Same main owner, native kernels,
core publication, component/picking/history/navigation and linked-source840 preserved.
Two native tests execute real main render/clear + kernels/cache:20unchanged redraws,
edit/native position parity/Undo replacement, modifier/source invalidation, single
disposal, independent cage cleanup and SubD disable/nonSubD cleanup. The366 source
publication guard now reads the whole function line instead of700characters; all
publication/clear/add ordering assertions retained. Initial insertion broke source
adjacency; final declaration precedes publication, preserving protected sequence.
Full local Node24:2273PASS/0FAIL/0skip. Main850→unchanged cache812; shell/recovery850;
manager849/monitor+core848/Array844/drawer846/Clean845/Cage846/protected pins retained.
Publication/Node22/live verification recorded below. User850 PASS protects this gate;
edits still recompute changed native displays.

## .849 scope — device evidence captured, full gate pending
User848 capture:54rebuilds21.9ms mean/41max; inactive6.4/17ms; active30hits/24misses,
inactive111hits/1miss; cage6.2/12ms. This confirms independent inactive CPU reuse but
remaining render cost, not matched speed gain. /nextbuild authorizes next narrow stage.
Existing inactive layer now owns one BufferGeometry per currently visible independent
inactive SubD object, keyed by existing847 immutable display-result identity. Rebuild
reuses it while recreating normal material/render-look wrappers. Changed CPU display
replaces/disposes geometry; hidden/active/deleted/replaced objects prune it. Scene/layer
switch and standalone clear release entire owned map. Shared wire-overlay geometry is
not disposed by transient wrapper cleanup. Correct overlay material flag is on node
userData, not material userData; transient overlay materials now dispose correctly.
Linked/non-SubD geometry retains original uncached path. Existing picking/visibility/
render look/history/modifier/Array and protected kernels untouched. No new renderer,
triangulation algorithm or revision system. Cache holds only visible independent
inactive SubD buffers; CPU display cache847 remains weakly keyed as before.
Three new native tests cover20redraw identities/one buffer, edit/native geometry
parity/shared wire/disposal, hide/activate/delete/replacement/scene cleanup and linked
uncached placement. Existing847 GPU expectation now protects reuse + disposal on hide;
812 timing adapter has native layer userData, semantic timing coverage retained.
Full Node24:2271PASS/0FAIL/0skip. Manager849→helper812 unchanged; shell/recovery849;
monitor/core848/main842/Array844/drawer846/Clean845/Cage846 remain coherent.
Publication/Node22/live verification recorded below. Device visual and timing comparison pending.

## .848 scope — device readout evidence captured
User /nextbuild after847 captures. Latest iPad847 capture:106rebuilds mean14.5/max42ms,
Inactive mean5.8/max20ms,281cache hits/41misses,34FPS/p9588ms. Previous idle capture
had0rebuilds/0cache counts. These demonstrate aggregate cache use, NOT matched before/
after speed gain or separate inactive hit rates. Full847 visual/history gate not inferred.
Existing Performance monitor now separates Active cache and Inactive cache hit/miss
counts while retaining aggregate SubD totals. Main's existing cache call defaults active;
manager847's existing inactive cache call passes explicit inactive owner. No geometry,
cache validity, gesture, history or display behaviour change. Counters opt-in/reset with
existing monitor; snapshots return independent per-owner values. Two native tests cover
real main/manager routing and disabled/reset/snapshot lifecycle; original diagnostic UI
test now verifies both lines. Full local2268PASS/0FAIL/0skip.
Core848→monitor848→shell848; manager848→unchanged cache812, shell/recovery848;
main842/Array844/drawer846/Clean845/Cage846 and protected/frozen kernels retained.
Node22/Pages/live verification recorded below.

## .847 scope — device performance evidence captured, full gate pending
User PASS .846 protects Soft/Full/Clean/rebuild/navigation compatibility.
Roadmap resumes measured performance: prior812 device readout showed inactive displays
as the dominant rebuild phase. Audit found displayMeshFor recomputes native SubD for
every inactive object on every active redraw. Reuse the existing exact-input
createSubdDisplayCache812, one weakly keyed result per independent SubD object.
Native SubD→Mirror order/output unchanged; coordinates/topology/creases/facegroups/
loose sets/modifier values and mesh/object replacement invalidate through existing
helper. Non-SubD retires that object's cache. Linked sources stay on the authoritative
uncached placement/evaluation path to protect840. Scene visibility/selection/materials,
raycast body IDs, history and normal inactive GPU geometry disposal/rebuild unchanged.
Performance panel existing SubD hits/misses now includes active and inactive caches.
This retains one CPU display result/input snapshot per participating object; it does
not reuse GPU buffers or improve every dense single-object edit. Weak keys allow
removed object caches to collect; no portable iPad speed claim before device measurement.
Four native tests cover50unchanged requests/one kernel evaluation, exact invalidation,
actual inactive layer/visibility/raycast/GPU cleanup and linked-source updates.
Full local Node24:2266PASS/0FAIL/0skip. Only multi-object runtime changed (shell847),
imports unchanged cache812; recovery/shell markers847. Main842, Array844, drawer846,
Clean845/Cage846 and all protected/frozen kernels retained. Reviewed asset graph/hashes
updated for new owner import. Node22/Pages/live verification recorded below.

## Protected .846 scope — user PASS2026-10-13
User Perfect PASS .845 protects Clean On/Off/rebuild and overlay restoration.
Adjacent audit found Cage Soft191 also missing810 cage-edge-batch/cage-vertex-batch.
Existing cage-intensity owner now includes them with the original edge.42/vertex.56
opacity factors. Full restores original material identity; repeated Soft does not
compound opacity. Existing invisible picking proxy materials remain invisible, normal
raycasts/selection metadata and surface materials unchanged. Clean845 remains intact.
Three native THREE/batch tests cover Soft/Full identity/disposal/raycast preservation,
stored Soft after rebuild/bridge/render events and coexistence with Clean/suppression.
Full local Node24:2262PASS/0FAIL/0skip. Source/core/render/manager/Array and frozen/
protected modules unchanged. Cage846→face-workflow846→drawer846→shell846 reviewed;
Clean stays845, main/manager842, Array844. Publication/Node22/live proof recorded below.

## Protected .845 scope — user PASS2026-10-13
User PASS .844 protects staged source editing/local Undo/Cancel/Apply, regenerated
array count/END transforms, scene history/project gate. User screenshot confirms844
Clean On leaves visible cage edges/vertex dots. Root cause: Clean owner predates810
batched cage and only hides old proxy/overlay kinds. Existing clean-view.js now also
hides cage-edge-batch/cage-vertex-batch. WeakMap restores prior visibility on disable
rather than revealing overlays already suppressed by another owner. Existing legacy
kinds, surface/material look, picking proxies, geometry/history/gesture owners retained.
Three native THREE/cage regressions cover true batch visibility and raycast equivalence,
suppressed visibility restoration, rebuild/bridge/render event upkeep and repeat toggles.
Full local Node24:2259PASS/0FAIL/0skip. Clean845→face-workflow845→drawer845→shell845
cache graph reviewed; release/recovery845. Main/render/kernel/Array844 unchanged;
protected Multi1.0, Loop715, Extrude802, Boolean806 and frozen betas untouched.
Publication/Node22/live verification recorded below.

## Protected .844 scope — user PASS2026-10-13
User PASS .843 protects Convert to Mesh, current preview shape, one-object conversion,
Undo/Redo and Save/Open; .842/.841 and .840 gates remain protected.
Reopen Live Array > Edit Source isolates its placed original mesh on the SAME scene
object and starts Face mode. Existing Vertex/Edge/Face tools edit it normally; local
Undo/Redo stays within source changes. The source bar uses shared top-centre placement
and yields to visible existing tool popups, returning when their owners finish.
Finish the component tool (Done/Apply/Cancel) before Apply Source or source Cancel.
Apply Source regenerates all copies through the original Array evaluator, retains
count/END placement/rotation/scale and canonical frame, and returns to Object mode.
Edit Source carries current staged END/count values from the Array panel. Cancel
restores the previously committed result/recipe/scene and exact prior history tokens.
An unchanged source/parameters restores without creating history. A changed source
commits one scene Undo step; source-local history is retired. No temporary objects,
new pointer handlers, topology kernel, history stack or protected kernel changes.
The procedural recipe is held privately during source editing; Object mode, files,
object management and modifier commands require Apply Source/Cancel first. Save/Open
is supported after Apply. A changed Curve/Balloon source no longer retains a stale
curveProfile; Cancel restores it. Source-only view is intentional for this first stage:
the generated result updates on Apply Source, not during every component gesture.
Direct non-affine editing of the combined result still refuses reopening; use Edit
Source before editing components, or Convert to Mesh for ordinary combined editing.
Loader graph: Array844→source-editor844→source-core844→Array-core842/instance343;
source-editor uses shared placement732. Unchanged manager/codec/main stay842. Array,
shell/recovery pins844 and reviewed child+parent asset contract are coherent.
Six new native tests cover placed source/topology/actual scene history/project codec,
local Undo/Cancel/no-op, invalid/busy/context guards, source UI nesting/file-command
blocking, and pending END/count handoff. Full local Node24:2256PASS/0FAIL/0skip.
Three old Array pin checks advance844; shared-dock check verifies new indirect client
through reviewed Array parent rather than demanding duplicate shell loading.
Node22 CI/Pages/live publication verified below.

## Protected .843 scope — user PASS2026-10-13
User PASS .842 protects progressive END scale/rotation, combined placement/count,
one-object Apply/reopen, Cancel, Undo/Redo and .boxlab round-trip.
Existing Array panel now offers Convert to Mesh when reopening a Live Array.
It commits the CURRENT staged preview (including changed count/END transforms) as
one ordinary disconnected editable mesh, removes arrayRecipe, closes the session
and records one scene Undo step. Undo restores the prior live recipe and geometry;
Redo restores the converted mesh. Apply Array still retains the procedural recipe.
Conversion does not create separate scene objects. Source component editing ships844.
A component-modified live result still refuses reopening; use Edit Source or conversion
before ordinary component edits, or Undo such edits first.
Only linear-array.js runtime changed; shell/recovery pins843, core/manager/codec842
unchanged. Reviewed runtime contract updated only for these cache references and
Array bytes. Three existing Array pin assertions advanced; all semantics retained.
Native conversion tests cover affine placement, current preview, single-object scene
history, project codec, component editing, button teardown and invalid guards.
Full local Node24:2250PASS/0FAIL/0skip. Node22 CI/Pages/live verified below.

## Protected .842 scope — user PASS2026-10-13
User PASS .841 protected: one object/count/END/reopen/Cancel/history/.boxlab checks.
Existing END gesture owner now has Live-only Move END / Rotate END / Scale END.
Rotate uses selected XYZ ring plus exact degree fields; scale uses END drag in Free
for uniform factors or axis cube for one factor, with exact XYZ scale fields.
Each intermediate interpolates XYZ degrees and XYZ factors linearly from original0°/1×
to END. Full turns preserved (360° is a turn, not zero). Each item rotates/scales about
its own source bounding centre; centres remain evenly spaced on existing END path.
Original unchanged. Preview and Apply use same arrayItemMatrix in live-array-core,
which still delegates mesh transformations/combination to existing instance/join owners.
No new raw pointer listeners, modelling kernel, history stack or protected Multi edit.

Optional rotation/scale/placement fields extend arrayRecipe v1; .841 recipes default
0°/1×/identity and preserve old encoded shape. Reopen retains a canonical shared frame
plus inferred whole-object placement, including nonuniform scale/shear, so combined
endpoint effects do not jump or change shape. Move END remains world-axis/view-plane;
Rotate/Scale handles follow the persisted array frame. Apply/Cancel/history still owned
by existing Array/object manager/session. Ordinary unchecked Array unchanged.
Child core/codec/management/drawer/Array graph repinned842; shell/recovery markers842.
Full local2247PASS/0FAIL/0skip; six new real geometry/raycast/gesture/history checks.
User PASS2026-10-13 protects this endpoint-transform device gate.

## Protected .841 scope and authoritative owners
User requests Live Array: ONE persistent editable Object Browser object like Live
Boolean, with gradual last-item scale/rotation across the array. This first narrow
stage adds the optional Live checkbox to existing linear-array.js. Ordinary unchecked
Array still creates linked objects through existing end-copy/manager owners.
Live Apply replaces the independent source object's geometry with disconnected copies
and stores arrayRecipe v1 on that same object. Object row displays Array ×count.
Reopening existing Array launcher retrieves source/count/END vector; cyan preview hides
old result through manager display policy only, never changes stored visibility.
Count and END placement can be edited repeatedly. Cancel leaves scene untouched.
Undo during session cancels preview; Apply checkpoints pre-result mesh plus real scene
snapshot once, so Undo/Redo restores geometry AND recipe through existing history owner.

New live-array-core.js is recipe orchestration: reuse existing EditableMesh,
instance-core transform/derive placement and object-join combine. No new topology kernel.
Whole-object affine moves/rotations/scales are recovered on reopen. Non-affine component
edits refuse reopening instead of discarding them. Live creation currently refuses
linked/Boolean/rich-resource/SubD/Mirror objects; ordinary Array remains available.
Staged source component editing shipped in .844; conversion shipped in .843;
endpoint rotation/scale interpolation now shipped in .842. Default Live checkbox off; explicitly check it for new arrays.

object-management snapshots/restores and v1 .boxlab codec preserve/validate optional
arrayRecipe. No schema-version change; older projects retain original encoding.
Current Array evaluator stays842; codec842→core842; object-management842→codec842;
drawer842→object-management842. Unchanged main/manager parents remain842.
Protected source modules/frozen betas unchanged. Tests reconcile three old Array cache
assertions with reviewed841 owner; all original semantic tests retained.

## Validation / device gate
Full local Node24:2241PASS/0FAIL/0skip. Four new native checks cover distribution,
source immutability, transformed reopen/refusal, real snapshots/codec, actual Array
Apply + manager replacement + scene Undo/Redo and session Undo cancellation.
Release9dcb5d538acb16a470e1b2cac9bacdc089b6a244; tree1caa33d0933512872831d9c43fe5206871f8c498.
Node22 CI38341669287/job115113811558 SUCCESS2241/0/0skip; Pages38341668618 SUCCESS.
Pinned live shell/manifest/Array/core/manager/codec/management/drawer byte-match.
Manual: Object Array→Live check→count4→END drag→Apply, one row; reopen change count/END,
Cancel then Apply; Undo/Redo; Save/Open then reopen; linked Save/Open sanity.
User PASS2026-10-13 protects .841 one-object/count/END/reopen/Cancel/history/project gate.

## Protected .840 shared-source drift repair
User PASS2026-10-13: Linked Duplicate/Array move→component modes, idle stability and
shared editing/history. Source/write loop resolved on device; protect core publication.
Exact cause: bridge-topology edges() wrapper assigns state.mesh=this for every mesh,
including inverse-local helpers. Legacy live bridge inferred live owner from those
helpers; repeated saveActive inverse placement moved sources without input.
.839 generic setter fix failed. .840 main publishes through dedicated publishCoreMesh
before state assignment/root rebuild. Generic legacy assignments cannot replace core.
Actual legacy/live bridge+manager chain:20redraws/1000idle reads stable; true component
edit shares. Do not suppress debug writes instead of preserving owner correctness.
.833/.836/.837 stale-drag candidate fixes failed device case; history retains evidence.
.840 release703f8ad78429697559c1be3b453fed812a322eae; CI38326579309 successful2237/0;
Pages38326579350 verified pinned bytes. .830/.831 and earlier accepted gates protected.

## Project persistence / remaining work
Existing File Save/Open + object-management snapshot + multi-object source pool +
boxlab-project-codec own persistence. Basic meshes, groups/settings/recipes, mixed locked
references and linked placement pool supported. Linked project device round-trip remains
worth checking beyond accepted drift gate. Source pool reconstruction uses existing
inverse placement, validates source IDs/finite invertible affine matrices/peer agreement;
allocator/history/render rollback guarded. Open confirms replacement and clears old Undo.
Independent imported GLB payloads now save/open in856; other resource owners and linked imported GLB projects still refuse;855 scene history retains imported payload; full cross-session history/native file
association not implemented. .830 Balloon gridVersion2 removes orphan poles while legacy
recipes keep indices/editability.

## Next
860: Live Array with progressive END rotation/scale→SubD On→ordinary Duplicate→move copy→
reopen count/END and Apply; original stays unchanged. Edit Source on copy→Apply/Cancel;
UndoRedo source changes. Multi duplicate mixed plain/LiveArray group. Save/Open→reopen both.
859 imported-resource Duplicate→GLB/Nomad visual comparison still pending. Next narrow
build should repair proven existing affine-tail rounding in Live Array reopen using
existing recipe owner, retaining strict external-file/project transform validation and
protected instance kernel343. Do not quietly weaken arbitrary invalid transform guards.

## Release workflow
/nextbuild = audit current main/live/pins; one narrow build; coherent release markers and
reviewed child+parent cache URLs/hashes; appropriate tests; update handoff/history/checklist/
roadmap; publish and verify. User PASS/FAIL becomes repository contract. No new numbered
build on PASS alone. Give short real iPad manual tests when release is ready.


## .843 publication verified — 2026-10-13

Release424a973d1380dc943733435ec4af7e1c9ed206d1; tested tree
32914e47e5f873289770bf4065dd315b055dc5aa exactly matches local validated checkout.
Node22 CI38362603121/job115180108329 SUCCESS:2250PASS/0FAIL/0skip.
Pages38362603155 SUCCESS. Fresh live shell/manifest/Array843, unchanged core842,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial shell GET
briefly returned842 during deployment; subsequent pinned verification matches843.
Device conversion gate pending; .842 user PASS protected, source editing next.


## .844 publication verified — 2026-10-13

Release22cbdef0409c023b74c5341adabc40e7a991f514; tested tree
96d912e08b4bebc53a25be7d73f800c0953ac8e3 exactly matches local validated checkout.
Node22 CI38375667786/job115223276580 SUCCESS:2256PASS/0FAIL/0skip.
Pages38375667131 SUCCESS. Fresh live shell/manifest/Array844/source-editor844/
source-core844, unchanged Array-core842, protected Multi1.0 and frozenBeta7 version
byte-match repository. Earlier predeployment GETs returned843/404; complete
postdeployment graph now verified. Device source-edit/exit/history/project gate pending.


## .845 publication verified — 2026-10-13

Release2ebc4138775f6977182b1d373cbd9ca852ff69dd; tested tree
f0049e567ae6118fda9c00900f7dc06907a5ea1a exactly matches local validated checkout.
Node22 CI38377613150/job115229836452 SUCCESS:2259PASS/0FAIL/0skip.
Pages38377611930 SUCCESS. Fresh live shell/manifest/drawer845/face-workflow845/
Clean845, protected Multi1.0 and frozenBeta7 version byte-match repository.
Initial shell/manifest reads preceded deployment; subsequent reads match845.
.844 source-editor user PASS protected; iPad Clean On/Off/rebuild gate pending.


## .846 publication verified — 2026-10-13

Release3645db541a0e9ed0c35209d58ceb375e27b93300; tested tree
101870b6eb956484928a5dbaaceed28f5079a2d7 exactly matches local validated checkout.
Node22 CI38385836614/job115257282265 SUCCESS:2262PASS/0FAIL/0skip.
Pages38385836609 SUCCESS. Fresh live shell/manifest/drawer846/face-workflow846/
Cage846, unchanged Clean845, protected Multi1.0 and frozenBeta7 version byte-match.
Initial shell/manifest GETs preceded deployment; postdeployment reads match846.
.845 Perfect PASS protected; iPad Soft/Full/Clean/rebuild gate pending.


## .847 publication verified — 2026-10-13

Releasedeaf1c931ef948c3ca882882e894a0d10764c361; tested tree
cceb4602c684aa832518e8f2f5689f5d3285b2f3 exactly matches local validated checkout.
Node22 CI38388216821/job115265162810 SUCCESS:2266PASS/0FAIL/0skip.
Pages38388215312 SUCCESS. Fresh live shell/manifest/multi-object847, unchanged
cache812, protected Multi1.0 and frozenBeta7 version byte-match repository.
Initial shell/manifest GETs preceded deployment; later reads match847.
.846 user PASS protected; independent inactive SubD visual/performance gate pending.


## .848 publication verified — 2026-10-13

Release1c4b1c7a2c5296ecd6577368122cafc7466a18d1; tested tree
a007c0f4700204f564c6751c14456bdae57a1324 exactly matches local validated checkout.
Node22 CI38390897289/job115274131163 SUCCESS:2268PASS/0FAIL/0skip.
Pages38390897016 SUCCESS. Fresh live shell/manifest/manager848/monitor848/core848,
protected Multi1.0 and frozenBeta7 version byte-match repository. Predeployment
reads returned previous assets; subsequent complete graph matches848.
Device separated-cache readout capture pending; no new geometry optimisation claimed.


## .849 publication verified — 2026-10-13

Release17c18ab495032f5e2ec527247aa341bd7325e742; tested tree
4fb6d03909a791e69e3811b6086550185ab1207c exactly matches local validated checkout.
Node22 CI38395647448/job115290048343 SUCCESS:2271PASS/0FAIL/0skip.
Pages38395648071 SUCCESS. Fresh live shell/manifest/manager849, unchanged cache812,
protected Multi1.0 and frozenBeta7 version byte-match repository. Screenshot848
baseline recorded; comparable849 visual/resource/phase capture pending.


## .850 publication verified — 2026-10-13

Release35f5037d586d8f274f6dc51c5b822a4b4e138c14; tested tree
5ac5d7a17c976f07e4f85a613a228c9cf2cac1d1 exactly matches local validated checkout.
Node22 CI38400809245/job115307642524 SUCCESS:2273PASS/0FAIL/0skip.
Pages38400808087 SUCCESS. Fresh live shell/manifest/main850, unchanged cache812,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial shell GET
returned849 during deployment; postdeployment verification matches850. Device active
geometry/performance/visual/history/modifier gate pending; no full849 PASS inferred.


## .851 publication verified — 2026-10-14

Release6eb8bec6b0a3bb57e10993708dbfba701b8db4f7; tested tree
bf549bdc90490de8d765a42abb1961d10c8c52a2 exactly matches local validated checkout.
Node22 CI38481476151/job115584851726 SUCCESS:2276PASS/0FAIL/0skip.
Pages38481476107 SUCCESS. Fresh live shell/manifest/main851/cage-render-batches851,
protected Multi1.0 and frozenBeta7 version byte-match repository. Predeployment
reads returned850; complete postdeployment graph matches851. Device mode/selection/
Clean/Soft gate pending,850 geometry/performance gate not yet accepted.


## .850 acceptance / .851 device evidence — 2026-10-14

User explicitly reports .850 PASS on2026-10-14: protect active SubD geometry reuse,
selection/edit/UndoRedo/modifier/render-look baseline. Attached screenshot visibly851:
94rebuilds mean6.2/max39ms; Body1.0/9ms, Base/SubD4.1/17ms, Scene0.8/18ms,
Inactive0.5/18ms, Cage0.1/6ms; active64hits/30misses, inactive194hits/2misses,
59FPS displayed. Capture is851 evidence, not a controlled850 benchmark or explicit
851 Vertex-mode visibility PASS. Keep851 hands-on gate pending; no new build.


## .852 publication verified — 2026-10-14

Releasee71bf18a927d54cb1a9b6fba0224c0d88254469c; tested tree
ae0f6921afc21c658d5e005db58d3a08d7b1c66e exactly matches local validated checkout.
Node22 CI38485760091/job115598883328 SUCCESS:2278PASS/0FAIL/0skip.
Pages38485759871 SUCCESS. Fresh live shell/manifest/main852, unchanged builder851,
protected Multi1.0 and frozenBeta7 version byte-match repository. Predeployment reads
returned851; subsequent complete release verification matches852. User851 PASS
protected;852 SubD/Mirror/cage/history/export device gate pending, no speed claim.


## .853 publication verified — 2026-10-14

Release245b665ec4224efa75bb9b67bff0c892ff56a070; tested tree
94a243ba49ee7ebba573e448493f979796822dc7 exactly matches local validated checkout.
Node22 CI38487534483/job115604691428 SUCCESS:2280PASS/0FAIL/0skip.
Pages38487534251 SUCCESS. Fresh live shell/manifest/main853/loop-cut-commit853,
protected Multi1.0 and frozenBeta7 version byte-match repository. Predeployment
reads returned852; complete postdeployment verification matches853. User852 Loop
FAIL recorded;853 single/MultiLoop completion/editable faces/history gate pending.


## .854 publication verified — 2026-10-14

Releaseb6806ccb9b4da959e68d17d95596431d3dee1dcc; tested tree
f62b760d0b50974cf5f2db45caee135c67a46629 exactly matches local validated checkout.
Node22 CI38500128979/job115644854684 SUCCESS:2282PASS/0FAIL/0skip.
Pages38500128663 SUCCESS. Fresh live shell/manifest/main854/loop-cut-commit854,
protected Multi1.0 and frozenBeta7 version byte-match repository. Predeployment
shell/manifest reads returned853; subsequent verification matches854. User853 PASS
protected;854 native completion/repeat/exit/history device gate pending.


## .855 publication verified — 2026-10-14

Release5bddfe7c848adab7c451b157db4bbdd282a2d072; tested tree
1332e93988f68c962d695b39e70832e309429956 exactly matches local validated checkout.
Node22 CI38506338293/job115664606721 SUCCESS:2285PASS/0FAIL/0skip.
Pages38506338178 SUCCESS. Fresh live shell/manifest/object-management855/drawer855,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial shell GET
returned854 during deployment; postdeployment verification matches855. User854 PASS
protected;855 imported GLB delete/UndoRedo/export device gate pending. Rich-resource
.boxlab saving remains refused, no file-resource codec implementation claimed.


## .856 publication verified — 2026-10-14

Release9ec6e46725768ca46dab2521aa9df22e4ccbd329; tested tree
b71757dad42bbab4bc007b880d3945e15289b3f8 exactly matches local validated checkout.
Node22 CI38508953096/job115672788333 SUCCESS:2290PASS/0FAIL/0skip.
Pages38508952135 SUCCESS. Fresh live shell/manifest/management856/codec856/resource856/
manager856/drawer856, protected Multi1.0 and frozenBeta7 version byte-match repository.
User855 PASS protected;856 independent importedGLB .boxlab save/open/export device gate
pending. File32MB/pool24MB limits and linked-rich/other-resource refusals retained.


## .857 publication verified — 2026-10-14

Release40db2d5e49f4e8d6843ef1b06fa92867df300451; tested tree
cb336090408074903b32901b20cd66d821990e5a exactly matches local validated checkout.
Node22 CI38510208221/job115676736263 SUCCESS:2293PASS/0FAIL/0skip.
Pages38510208124 SUCCESS. Fresh live shell/manifest/Array857/source-editor857/source-core857,
unchanged evaluator842, protected Multi1.0 and frozenBeta7 version byte-match repository.
Predeployment reads returned856; subsequent complete graph matches857. Device existing
LiveArray + SubD count/END/source/history/project gate pending;856 resource gate not
inferred from this bug report. New SubD creation/Mirror restrictions retained.


## .857 Apply acceptance / refresh clarification — 2026-10-14

User first reported857 unchanged, clarified failure on Apply Array, then explicitly
reported it works now and suspected updated-file refresh. Protect existing Live Array
Apply with SubD enabled. Initial failure is superseded for this device case; stale
asset cause is user-reported, not independently reproduced. No additional code/build.
Source-edit/conversion/file gates not separately confirmed;856 resource-file gate still
pending. Keep857 published implementation and reviewed cache graph; no speculative repair.


## .858 publication verified — 2026-10-14

Releaseb5f352c0c2843536c6f46f444fb2e0c41292b8aa; tested tree
c25a1473cbcb9608e63a6c28202dfd1f4d594ba7 exactly matches local validated checkout.
Node22 CI38516162270/job115695323751 SUCCESS:2297PASS/0FAIL/0skip.
Pages38516162030 SUCCESS. Fresh live shell/manifest/management858/codec858/resource858/
drawer858, protected Multi1.0 and frozenBeta7 version byte-match repository. Initial
reads preceded deployment; postdeployment full graph matches858.857 Apply/SubD accepted
and protected.858 pooled/legacy resource-file device gates pending; no renderer gain claim.


## .859 local validation — 2026-10-14

Full native Node regression:2300PASS/0FAIL/0skip, including three new duplicate-resource
checks. Reviewed release/cache contract passes; protected Multi1.0 and frozen betas
unchanged. Device859 duplicate→project→Nomad gate pending. Publication proof follows
in AI_HANDOFF/DEV_HISTORY after main/CI/Pages/live verification.


## .859 publication blocked — 2026-10-14

Local release commit3db33caac153f181bcfef67163f3e617881ed67c validated2300PASS/0FAIL/0skip.
Two git push attempts rejected by automatic approval review. Stated reason: direct user
request authorizes development but not consequential default-main publication; retrieved
repository standing-approval text is not accepted as trusted authorization. No connector
or alternate publication workaround attempted. Remote main remainsd6801a41/.858;859 CI/
Pages/live validation NOT performed. Ask user for explicit current-turn authorization
for git push origin main and Pages publication, then publish this validated narrow
commit and verify remote markers/pins, CI and live assets. No device859 PASS claimed.


## .859 publication resumed — 2026-10-14

User directly states “From here on in, I ALWAYS approve pushing & publishing :)”
and /nextbuild. Prior approval-review block superseded by current direct authorization.
Shell git push lacks HTTPS credentials; publish validated tree using connected GitHub
Git Data tools, preserving remote parent and checking expected main SHA. No auth secrets
retrieved. .859 CI/Pages/live verification pending; no device859 PASS inferred.


## .859 publication verified / approval block superseded — 2026-10-14

User directly approves ongoing pushes/publishing. Connected GitHub release
d7dae3c8147373920e9c526f0b6eb36e5482e4bc, tree4008eb4179031b70f4882bdb0f729f96b658c267
exactly matches local. Node22 CI38541026468/job115775518061 SUCCESS;2300PASS/0FAIL/0skip.
Pages38541024866 SUCCESS. Live manifest/shell/manager859/management859/drawer859,
protected Multi1.0 and frozenBeta7 version byte-match repository. Shell git credentials
unavailable; connected Git Data publication preserves main parent with expected-SHA
lease and matching blob hashes. Prior approval block is historical and superseded.
No859 device PASS inferred.


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
