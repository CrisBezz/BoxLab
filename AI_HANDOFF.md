# BoxLab AI Handoff — .898 / Paint resource and lab sessions

## Current state — 17 October 2026

CrisBezz/BoxLab main release0.36.18.898: colour resource + lab Save/Open after user897PASS.
File → UV Paint Lab opens https://crisbezz.github.io/BoxLab/evaluations/uv-paint/?build=898 .
Base6677ce85c3e40dd6f4da08da29c917a6b897b6e7; prior runtime897=1db5769b.
Local Node24 and Node22 CI2483PASS/0FAIL/0skip;898 Pages/live verified below.
Runtime62849d78; current main adds documentation proof without runtime changes.
User897PASS protects preview outward winding/visible surface paint/plane/brush/history/
navigation, alongside896PASS. No898 device PASS yet;895 density remains separate pending.
Ongoing pushing/publishing authorization retained. Save/Open .boxpaint is a LAB session,
not production .boxlab or Nomad paint persistence. Read docs/paint-session-898.md.

Read AI_WORKFLOW.md completely, this handoff completely, relevant TEST_CHECKLIST,
recent DEV_HISTORY and ROADMAP before code. Repository is authoritative. This file
now consolidates current state; full older handoff is preserved at main569d4e7e:
https://github.com/CrisBezz/BoxLab/blob/569d4e7e09d34e043bae7cd1038b9034c31823a7/AI_HANDOFF.md .
All earlier chronology, failures, acceptance and publication evidence remain in
DEV_HISTORY/TEST_CHECKLIST and git. Do not treat historical pending-gate paragraphs
as overriding later explicit PASS or current state.

## .898 — paint resource v1 and lab Save/Open; .897 PASS, 2026-10-17

User897PASS protects corrected outward preview, paint/navigation/history/plane baseline.
Audit current6677ce85: no editable paint-resource codec exists; native projectv3 UV-only.
Add src/paint-resource.js: version1 opaque baseColor/sRGB/RGBA8/UV-v0-first, explicit size/
binding, owned pixel capture/async encode/decode copies, exact SHA256 integrity. Metadata
frozen; typed pixels are read-only by caller contract, not magically immutable. No global
history owner or changes to native .boxlab resource envelopes.
Lab Save/Open .boxpaint v1 embeds scene through ORIGINAL BoxLab scene/nativeUV codec,
actual sample geometry/UVs, both512² results, settings/selected brush/camera. Binary header
≤1MiB/file≤4MiB, two exact raw RGBA buffers with descriptors/hash, bounded plain native
sample only. No fake GLB metadata, new mesh kernel, PNG reencoding or main paint save claim.
Save snapshots before await; Open stages/validates before replacement, clears lab history
on success, disposes old resources once. Invalid/corrupt/stale files keep committed work;
revision/generation checks block late Open after a new Pencil contact/settings/history/
reset/candidate/navigation or another Open. Unfiltered iPad picker follows existing
.boxlab Open to avoid unknown-extension filtering. PNG and accepted brush semantics intact.
Six new tests cover owned resource/integrity, exact three-sample pixel/UV/geometry/settings/
view restoration, async capture and load guards, budgets/corruption, real controller Save/
Open/continued Undo/stale-stage rollback/new contact. Extracted original lab test harness;
all original assertions retained. Full Node24 **2483PASS/0FAIL/0skip**. Browser/iPad gate
separate; no rendered/filepicker proof inferred from Node.
Shell/recovery898; lab loader/sample/session/resource898. Export897/codec887/core+stroke896
and all production UV/project/history/import/export/modelling/frozen owners unchanged.
No layers/autosave/main .boxlab paint/global scene history/Nomad paint export claim.
Manual: paint→Save Paint; Reset/reload→Open Paint from Downloads; compare both brushes,
settings/view, then draw/Undo/Redo and PNG. Next original scene-resource/codec/COW/history
integration after feedback. Publication verification follows; no898 device PASS inferred.

## .897 — UV preview winding repair; .896 brush PASS, 2026-10-17

User .896 PASS; only reported issue paint mesh normals not consistently outward.
Protect accepted brush comparison/Pencil/settings/navigation/paired history/PNG workflow;
normal orientation is the explicit exception, not a blanket896 failure or895 PASS.
Audit main53abe68b and original primitive/projection/export preview owners. Source sphere
and cube faces are outward, but projected Earcut triangles lose polygon winding:
original sample sphere240/528 triangles inward; cube6/12 inward. Recomputed normals or
DoubleSide cannot repair picking/culling orientation. Root is existing triangulateFace.
Add preserveFaceWinding option in SAME triangulation owner, enabled ONLY by
buildUVPreviewGeometry. Compare signed projected polygon area with each triangle and
swap two local triangle indices when opposite. Original face winding, including deliberate
reversed/imported surfaces, is preserved; no convex-centre heuristic/new triangulator,
source mesh/UV mutation or general normals repair command. Normals recomputed by original
geometry builder. Preview checker/image consumers also gain correct source winding.
Ordinary editableToGeometry/GLB file export keeps original default false; native NOM,
UV storage, brush raster/strokes/history/input and frozen/protected modelling unchanged.
Known ordinary export winding behavior is NOT repaired or claimed fixed in this scope.
After proper source winding, plane temporary display uses +X90 instead of896 -X90.
Three regressions cover EVERY sphere/cube triangle+normal, real front-sided raycasts from
six external directions/near hit, plane front, concave tilted/reversed polygon winding,
exact position/UV corner correspondence/read-only source and unchanged ordinary export
path plus triangle-corner sets. Full Node24 **2477PASS/0FAIL/0skip**.
Reviewed shell/recovery/export-parent897 and lab index/lab-loader/sample897; shared brush/
curve/core896 and native/export children892 retained. Main exporter internal stamp892
intentionally distinct from loader897. No blind all-module repin. Previous browser WebGL
limitation unchanged; device897 winding confirmation pending, no897 PASS inferred.
Next: orbit sphere/cube, paint around all sides; plane visible; switch brushes/UndoRedo.
Then resume paint resource/codec/COW/global-history design after chosen-brush feedback.
Publication verification follows; no layered or persistent painting claim.

## .896 scope / owners

Read docs/uv-paint-lab-896.md for implementation, limits, budgets and manual gate.
Two candidates get identical screen-space inputs: BoxLab linear distance carry and
Klecks-derived Bézier curve. Both use SAME new BoxLab colour raster and settings,
separate512² maps, ONE paired6-step lab Undo/Redo. This is a curve comparison, NOT
full Klecks PenBrush integration. Upstream pinned cc24e97712c199929760250881ffe2e25233ce6d;
exact line.ts/vec2.ts and MIT notice retained, unrelated Paint.NET spline not in runtime.
No Klecks history/selection/editor/gesture/Parcel owner imported. TexturePaint original
trial at evaluations/texturepaint remains unchanged; not a production dependency.

Lab sample Sphere/Cube/Plane come from original primitive-factory and native UV projection
owners. It loads original export-as-panel897 (internal stamp892) ONLY in the separate document to call
buildUVPreviewGeometry (same authoritative triangulation/corner mapping). No main.js,
manager, scene history or modelling input loaded there. Main HTML loads no paint modules;
new File link only. Preserve existing module pins, not blanket shell-version repinning.

New raster: opaque sRGB bytes, texel-radius circle, hardness, maximum per-stroke opacity,
pressure→size, subpixel position, immediate CPU edits, at most one dirty texture mark per
frame. CPU readout is stroke/raycast/raster time, NOT GPU upload/render/FPS. Curve can
show look-ahead lag. Both output sample positions are raycast on surface; no UV spline.

Cancellation/lost capture/blur/visibility/resize/settings/candidate changes roll back both.
Palm/finger ownership is isolated to lab OrbitControls. Reset/model replacement/page exit
release resources; BFCache cancel without disposal. PNG exports selected flattened pixels
with top-down row conversion. Six paired history entries and12,000-dab/candidate cap;
raw active CPU paint-buffer peak~20MiB excluding PNG/browser/GPU/geometry allocations.

Scope is sample-mesh painting, with .boxpaint Save/Open from898. No layers or MAIN
.boxlab/native paint export persistence, real user-object editing, imported texture base, seam stitching/island masks,
world-radius projection, smudge or PBR. Adjacent islands can bleed. Do not promise that
splitting paths alone makes painting seamless or that CPU timings establish M2 performance.

## Next narrow step

Test898 Save Paint→Reset/reload→Open Paint from Downloads, both maps/settings/view and
continued paired Undo/Redo/PNG. .897 winding and .896 brush acceptance are protected.
Then integrate the explicit colour resource with ORIGINAL scene snapshots/codec/history
and copy-on-write under an explicit schema. Native resourcev3 must remain UV-only.
Actual selected-object display/input and flattened GLB/native paint export follow through
existing owners. No second mesh/history kernel or premature .boxlab/Nomad claim.
Keep backend replaceable; no further unrelated UV utilities in place of3D painting.

## Protected interaction and modelling baseline

- One-finger orbit; two-finger pan; pinch; two-finger tap Undo; three-finger tap Redo;
  no-jump orbit pivot and persistent selections through navigation.
- Studio default and Focus default on launch. Original Object Browser right-side placement,
  Multi/group/object management, snapping, modeless radial/gizmo interaction.
- src/multi-object-transform.js?v=0.36.1.0 explicitly protected, byte-identical Beta6.
  Frozen Beta2–7 immutable (Beta7 runtime .807). No service worker.
- Existing Loop topology715, Extrude802, Boolean806 kernels and accepted modelling tools.
  Actual Loop completion/main owner854 repairs supersede older “never touch715” wording;
  do not undo their accepted EXACT/repeat/exit behavior.
- Face/Edge/Vertex Extrude inner12-o’clock; Bevel inner3-o’clock across component modes;
  Circle outer12-o’clock. Selection helpers stay with gestures, not modelling radial slots.
- Tool popups top-centre via original shared placement, compact/wide terminal layout;
  Object Browser remains the intentional right-side exception. Gizmo centre free transform;
  corner shortcuts retain actual Focus/history/Multi/radial owners.
- Main core-mesh publication840 fixes linked-instance drift; generic bridge edges() assignments
  must never replace core. Linked source editing, no idle source-write loop and per-instance
  placements remain protected. No duplicate modelling/triangulation/history kernels.
- Live Array source/count/END rotation+scale, single object, conversion and source edit,
  SubD re-edit857, deep independent duplicate860, internal affine-tail canonicalization861.
  External matrix/recipe validation stays exact; arbitrary non-affine result editing refuses.
- Active/inactive SubD reuse847–852, Vertex-only visual dots851, Clean845 and Soft846
  batches, original invisible picking proxies. No unmeasured generic performance claim.

## Protected UV/resource/export baseline

- Imported resources are shared READ-ONLY through history855 and ordinary Duplicate859.
  Future edits replace payload and copy only touched data/buffers. Never mutate shared images.
- .boxlab native mesh/group/settings/linked placement/Array/curve recipes; imported GLB
  resources856 and pooled v2 images858; canonical bytes/bounds/atomic Open rollback.
  Linked-rich resources and unrelated resource owners still refuse. Save/Open32MB limit;
  shared encoded GLB image pool24MiB. Scene Undo history is not persisted across sessions.
- Native UV payload uses source:'boxlab', version1, only topology signature/corner UVs;
  project resource envelopev3 is STRICTLY UV-ONLY. Adding arbitrary paint fields must fail.
  Original exporter topologySignature is authoritative; no duplicate signature algorithm.
- UV inspector862/863; native file UV pool865; Flip866; large workspace867; selection868;
  island scoped edits869/870; Pencil Move871/Scale872/Rotate873; fit874; native Planar875,
  Box876, Cylinder877;2D checker878; temporary surface checker879; image chooser880;
  active surface image881/multiple exact face materials882; material GLB handoff883;
  native colour884/normal+emissive885/packed maps886/large resource887/displacement888;
  lossless scalar PNG889/content image dedup890; image references891/892; Pack893;
  Sphere894; density895. Accepted gates through .894 protected; .895 gate not inferred.
- Original native scene history/copy-on-write/selected island membership and payload guards;
  no second pointer owner. UV topology changes hide stale channel; Undo restores it.
  Pack grid1–128islands2% margin/gaps preserves relative density; Equalize density preserves
  total area but centres fixed, so Pack afterwards. Images fixed: UV edits change sampling.
- UV surface previews use original buildUVPreviewGeometry, max20,000face corners, Base only,
  independent plain targets; overlays intentionally non-raycastable. Production painting
  needs explicit hit proxy, transform/occlusion/sidedness and lifetime, not overlay mutation.
- Read-only image previews≤8MiB encoded/1024²; active≤4materials with exact IDs/assignments.
  Whole Solid fallback for unsupported/stale/missing resources; original bitmap/disposal races.
  Preview decoding is NOT an editable full-resolution texture decoder.
- Native File NOMAD retains real NOM container/donor/material/UV offsets/independent UV pool;
  ordinary GLB/OBJ remain. Native known-stale/evaluated UVs refuse; no invented fields.
  Colour/normal/emissive raw byte copies≤24MiB aggregate; roughness=G/metalness=B bounded
  conversion≤2048² using production scalar PNG889, no factor baking/resampling. Content
  dedup890 requires exact bytes after hash bucket. Displacement only explicit supported
  Nomad binding;16-bit source/settings copied, no physical amplitude compensation promised.
- Supplied FULL MATERIAL opacity separate image is ABSENT from GLB despite extras names.
  Do not invent recovery, use filenames to guess assignments, or claim NOM import, arbitrary
  native per-face materials, general unwrap, painting persistence or evaluated UV propagation.

## Testing, cache and publication

Use reviewed tests/helpers/release-contract.mjs and runtime-asset-contract.json.
Module internal version, asset pin and shell release are distinct. Only refresh changed
owners/parent loader graph after review. .896 changes shell title/data/visible label/
version.json plus release-bootstrap/release-version loader keys896 (source unchanged),
and new lab graph896. Original exporter892/MeshHealth895 and other accepted pins retained.

Seven new lab checks and full2474PASS/0FAIL/0skip locally. Controller Canvas/WebGL/OrbitControls
adapted in Node; actual Three geometry/raycast and paint code execute. Browser render and
iPad gates remain separate. Do not claim historical2467 suite is a new result.

Before completion: update this handoff/DEV_HISTORY/TEST_CHECKLIST/ROADMAP, commit/push main,
verify remote tree against tested local tree, CI/Pages and live graph. Standing publishing
authorization applies; no repeat permission. If shell git has no credentials, connected
Git Data tools create exact blobs/tree/commit with old main parent, non-forced expected-SHA
ref update. Check every blob matches local hash (large base64 tool stdout can truncate).
Never publish a mismatched tree. The main navigation link loads no painting modules into the modelling app.

## Publication evidence

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
