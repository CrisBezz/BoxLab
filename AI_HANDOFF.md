# BoxLab AI Handoff — .849 inactive render geometry reuse

## Current state — 2026-10-13
CrisBezz/BoxLab main; live https://crisbezz.github.io/BoxLab/; release0.36.18.849.
Read AI_WORKFLOW completely, this handoff, TEST_CHECKLIST, recent DEV_HISTORY and
ROADMAP before code. Repository is source of truth. Standing publish authorization.
Frozen Beta7 .807 and Beta2–6 immutable. Protect Multi1.0, Loop715, Extrude802,
Boolean806 and all accepted Pencil/navigation/selection behaviour.

## .849 scope — device geometry/performance gate pending
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
Rich GLB/UV/material/texture pools still refuse; full cross-session history/native file
association not implemented. .830 Balloon gridVersion2 removes orphan poles while legacy
recipes keep indices/editability.

## Next
Same multi-SubD scene849: Performance Reset, repeat active select/edit/Undo, capture
Inactive phase versus8486.4ms mean. Check switching/editing former inactive objects,
modifier changes, hide/show and Undo/Redo; render modes and linked placement remain
correct. If accepted, target measured cage/active geometry cost or project resources.
No quantified iPad speed improvement until comparable workload capture. Preserve
published848 split counters and all prior explicitly accepted device gates.

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
