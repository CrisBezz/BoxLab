# BoxLab AI Handoff — .904 / Editable layered project resources

## Current state — 18 October 2026

CrisBezz/BoxLab main release0.36.18.904, based on5efdc7d9 (.903 runtimea0a910de).
Latest user devicePASS901 protects exports and900 paint/history/project/duplicates.
904 connects layered colour resourcev2 to SAME colourPaint pool/scene history/duplicates,
projectv3 and existing flattened display/export. No layer UI yet; old painter refuses
layered resources until UI build. Read docs/paint-layer-resources-904.md and
 docs/paint-material-direction.md. Publication/full-suite evidence follows.

## .904 — editable layered project/history resources — 2026-10-18

Audit5efdc7d9: existing colourPaint history/ordinary Duplicate already share read-only
resources. New paint-layer-resource owner stores explicit layered resourcev2 in SAME
colourPaint field: validated opaque preview + owned903 stack with exact masks/modes.
Original colourPaintPool entryv2 and sceneprojectv3 transport all buffers through
original canonical bytes, whole-resource dedup;8MiB aggregate BEFORE decode includes
flat/base/overlays/masks. Plainv1/opaquev2 unchanged; strict field/version/ref/cache/
budget/unsupported owner guards. Original nativeUVv3 remains UV-only.
Same history/checkpoint/single+Multi Duplicate/atomic Open owners unchanged. Original
surface display reads validated flat colour; export adapter validates/captures owned
flatv1 BEFORE await and uses existing NOM/GLB writers. Editable layers persist only
in.boxlab. Existing opaque painter refuses layered resource until controls land,
preventing destructive flattening. No new layer UI/image sources/material authoring.
Seven focused904 checks PASS: exact resource/project/pool, real history/duplicates,
File Save/Open/corrupt input/render rollback, actual NOM/GLB+async snapshot and
committed display/painter guard. Node transport adapters are not rendered/iPad proof.
Read docs/paint-layer-resources-904.md. Changed codec/export/binding/paint/render+
parent loader graph904; main modelling/Multi1.0/frozen/brush algorithms unchanged.
No extra902/903/904 devicePASS inferred;901 userPASS remains protected.
Next REAL layer UI/transparent brush through original viewport/history and this
resource; do not add a parallel paintLayers property or history. Full suite and
publication proof follow. Manual904: existing paint/save/reopen/Undo/Duplicate/export
regression only; new layered fixtures automated, not user tasks.

## .903 — masks/blend foundation and material direction — 2026-10-18

User requests surface image placement/Project from View, Insert Move→Rotate→Scale tap
cycle, masks/blend modes and Nomad-style material slots with displacement placeholder.
Read docs/paint-material-direction.md for requirements, sequencing and limitations.
Audit787cfcb9:902 compositor Normal-only;900 paint/899 project/901 export opaque.
Extend SAME isolated stack owner to v2 with owned per-overlay8-bit coverage masks,
enable/invert and26 colour blend modes in paint-blend-modes903. v1 Normal upgrade
byte-identical; strict unknown fields/invalid modes/masks and sparse arrays refuse.
Alpha×opacity×mask gates blended RGB; Normal exact902; standard W3C colour formulas,
extra modes explicitly defined in docs/paint-layers-903.md. Not Nomad bit-parity or
normal-vector/scalar/PBR blending. Buffers read-only by convention; max4.75MiB stack
plus copies/flat outputs, no measured performance claim.
Seven focused903 checks PASS; existing902 semantic checks retained (unknown-mode
refusal supersedes its obsolete Multiply refusal). Actual opaque project/native PNG
handoff retained. No app/lab layer UI, mask drawing, image projection or editable
layer persistence yet. Main resource/project/export continue refusing editable stack.
Shell/recovery903, isolated child903; main900/export901/lab901/brush896/protected
Multi1.0/frozen/modelling owners unchanged. No new hands-on test or user903PASS.
Next explicit layered scene/project pool through original codec/history/duplicate
owners, then transparent brush+layer/mask UI; image projection/Insert-cycle follows.
Full suite/publication proof follows;901 userPASS remains latest accepted device gate.

## .902 — layer/compositor foundation; .901 user PASS — 2026-10-18

User901PASS protects painted NOMAD/GLB placement/orientation/colour, independent
painted duplicates and continued painting/Undo/.boxlab. Audit main0bfb6819: raster896
writes opaque bytes, resource898/project899/export901 have no editable layer stack.
New isolated paint-layer-stack API: existing opaque base + up to3 straight-alpha
512² overlays, bounded IDs/names, visible/opacity, owned capture/append/replace,
byte-space source-over and flattened resource via ORIGINAL captureColourResource.
No new history/input/kernel or app wiring. Strict schemas/budgets; typed buffers
read-only by convention. Current copy-all API has no sparse/COW/performance claim.
Five focused checks PASS: exact blending/order/visibility/opacity/rows, input/edit/
output isolation, refusal/budgets/max stack, actual original project + native PNG
flattened handoff; editable stack still refuses as project colourPaint.
Read docs/paint-layer-stack-902.md. No layer UI/transparent brush/editable layer save
claim. No new hands-on test; existing paint/export unchanged. Shell/recovery902;
main paint900/export901/resource898/project899/lab901/protected/frozen bytes retained.
Next separate layered scene resource/project codec + atomic Open/history/duplicate
integration, then transparent raster/UI through current viewport owner. Publication
and full-suite evidence follow; no902 device PASS inferred.

## .901 — flattened base-colour handoff

File NOMAD and GLB+Base now carry validated512² main paint through ORIGINAL image/
material/binary/UV owners. New paint-export.js captures geometry/settings/native UVs
and owned resource pixels before await; validates900 UV binding; registers export-local
prepared snapshots only. No scene/history mutations, fake imported GLB provenance or
stored material fields on native UVv3. Shared resource copies/PNG reused. Stale/unknown/
evaluated/linked/procedural paint refuses, raw sync resolver still guards unprepared paint.

Original PNG owner gets RGB8/sRGB colour alongside scalar encoder; common CRC/zlib/
packaging, scalar byte semantics unchanged. Exact UV-v0-first rows (no Lab PNG flip),
opaque alpha dropped only after validation, no canvas decode/resample/gamma-factor bake.
NOM original writer: white colour factor, roughness1/metalness0; original image/material
slots/donor/header/offsets/independent UV pool/polygons and24MiB image budget/dedup.
GLB original binary patch: embedded PNG + clamp/linear texture + neutral opaque material,
original groups/UV seams/loader self-check; painted triangles enable SAME authoritative
preserveFaceWinding option. Non-painted GLB path/winding retains baseline, not general
normals repair. GLB status reports painted count; NOM colour-image count already exists.

Painted OBJ/Join still refuse. .boxlab v2 remains editable paint project (8MiB current
raw paint pool/32MiB file), GLB/NOM flattened colour only, no brush/Undo/layer persistence
or editable paint re-import/NOM import claim. Main unlit preview vs external lighting
may differ; verify placement/orientation/colour on device. Native repeat sampling remains
accepted convention, seams may bleed. No layers/imported paint base/PBR expansion.

900 input/raster/stroke/render/binding/project/history owners and protected modelling/
Multi1.0/frozen betas unchanged. Export/PNG/new adapter and parent graph901; main paint/
render900, resource898/codec899/brush896 intentionally retained. Six tests cover actual
native/GLB formats and both File download actions, exact PNG pixels/CRC/rows/UV/materials,
painted winding, shared images, async capture and refusals. Independent PNG reader RGB;
ImageBitmap transport adapter is NOT rendered/browser/Nomad proof.900 high-level GLB
refusal assertion superseded by901 exact-export tests; raw resolver/OBJ still refuse.

User901PASS now protects the export device checks. Continue layered resource/codec
integration after the902 isolated compositor; keep existing flattened export compatible.

Read AI_WORKFLOW.md and this handoff completely; checklist/history/roadmap and current
repo authoritative. Historical pending-pass proof entries below reflect their time,
not current900 acceptance. Prior full old handoff at main569d4e7e:
https://github.com/CrisBezz/BoxLab/blob/569d4e7e09d34e043bae7cd1038b9034c31823a7/AI_HANDOFF.md .

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

904 layered resource lives in EXISTING object.colourPaint (version2 with layers),
project scenev3/pool entryv2. No separate paintLayers object field or second history.
Next REAL main viewport layer controls/transparent raster, original history checkpoints,
903 compositor and904 captureLayeredColourResource. Replace resource atomically; never
paint into flat preview and drop layers. Existing opaque strokes/Undo/Pencil navigation
remain protected; remove current layered-painter refusal only when editable path exists.
Then image sources/Project from View and shared Insert Move→Rotate→Scale tap cycle;
material channels staged, displacement placeholder per docs/paint-material-direction.md.

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

## .899 publication verified — 2026-10-17

Runtime47136701c9c667ecdb410d89ca6e8b751c773680; tested tree
da7f9e98766dff998f71e60d6deb20947dc692e1 matches fetched main/local exactly.
Node22.23.3 topology CI39028416328/job117383876628 SUCCESS2487PASS/0FAIL/0skip;
Pages39028415912 build117383877465/deploy117383953976 SUCCESS.
Postdeployment exact live shell/version, lab899 index/controller/session and changed
manager/management/drawer/codec/project-GLB/new paint-codec graph899 byte-match repository;
unchanged resource898 and recovery loader899 graph also match. Protected Multi-transform/
frozen/modelling/brush/preview bytes retained. User898PASS protected;899 nearby lab/main
project device sanity pending. No new rendered/Pencil proof or main paint authoring claim.
Documentation proof changes no tested runtime bytes. Next bounded original-owner
selected-object paint bridge requires validity/rebinding/lifetime/refusal rules before UI.

## .900 publication verified — 2026-10-17

Runtimeeb26b99141af4a1e3a77d1f09fe559887880dd7e; tested tree
b687f2b2f3665f389f67e02db1e67bf991b487bf matches fetched main/local exactly.
Node22.23.3 topology CI39030804811/job117390693515 SUCCESS2494PASS/0FAIL/0skip;
Pages39030803672 build117390693845/deploy117390798136 SUCCESS.
Postdeployment exact shell/version, main viewport paint/target/core/render/radial/
manager/management/drawer/export/refusal parent graph900 plus Lab900 index/controller
and unchanged accepted raster/stroke896 byte-match repository. Recovery900 matches.
Protected Multi-transform1.0/frozen/modelling algorithms/brush bytes retained. User899
PASS protected;900 actual viewport/Pencil/navigation/project device gate pending.
No rendered/iPad proof inferred from Node adapters or previous cloud WebGL limitation.
Documentation proof changes no tested runtime. Next: device feedback, then flattened
paint export through original GLB/NOM owners; painted export refusal remains meanwhile.

## .901 publication verified — 2026-10-17

Runtime32cca00338fc3bcd8894fb9f0c7ed9a14171c223; tested tree
5780a931a693f41bf4d72128d48289f014cad204 matches fetched main/local exactly.
Node22.23.3 topology CI39036938146/job117408573676 SUCCESS2500PASS/0FAIL/0skip;
Pages39036937708 build117408575029/deploy117408682503 SUCCESS.
Postdeployment exact live shell/version and export-panel/native-core/packed-parent/
PNG/new paint-export graph901 plus Lab901 index/controller byte-match repository.
Unchanged main paint/binding900 and recovery901 match. Protected Multi1.0/frozen/
modelling/raster/input bytes retained. User900PASS protected;901 external Nomad and
GLB colour/orientation/placement device gate pending, no rendered proof inferred.
Documentation proof changes no tested runtime. Next device export feedback, then layer/
compositor design through original owners; .boxlab remains editable paint project.

.902 local validation: Node24.19.0 full suite **2505 PASS / 0 FAIL / 0 skipped**;
five new focused compositor checks PASS. No new device/rendered layer proof.

## .902 publication verified — 2026-10-18

Runtime0d37f014a47e7b473aa12710a467da736047e22a; tested tree
3961609068a980cb26982be472f4a6dd0199626c matches fetched main/local exactly.
Node22.23.3 CI39081195618/job117538289593 SUCCESS2505PASS/0FAIL/0skip;
Pages39081195076 build117538290786/deploy117538384344 SUCCESS.
Postdeployment live shell/version/new isolated compositor/recovery902 and unchanged
viewport900/export901 byte-match repository. Initial live version still901 before
completed deployment; final complete checked graph902 matches. Main app does not
import compositor yet; layer UI/storage/transparent raster remain future work.
Protected Multi/frozen/modelling/brush/resource/project/export owners unchanged.
User901PASS recorded; no new902 manual gate or rendered layer acceptance claimed.
All four continuity files updated; this proof is documentation-only and changes
no tested runtime bytes. Next separate layer scene-resource/project integration.

.903 local validation: Node24.19.0 full **2512 PASS / 0 FAIL / 0 skipped**;
seven new focused checks + existing902 tests PASS. No rendered/device gate inferred.

## .903 publication verified — 2026-10-18

Runtimea0a910de17eecbb3732122f5df7ac515be316454; tested tree
cb166e9709360ccb936056f43acf6e42f3b09716 matches fetched main/local exactly.
Node22.23.3 CI39082365708/job117541786361 SUCCESS2512PASS/0FAIL/0skip;
Pages39082365678 build117541788777/deploy117541886468 SUCCESS.
Postdeployment live shell/version/stack/blend903/recovery903 and unchanged viewport900/
export901 byte-match repository. Initial predeployment reads served902/new child404;
final full checked graph903 matches. All four continuity documents updated; full
material/image direction is in docs/paint-material-direction.md. This verification is
documentation-only, no tested runtime byte changes and no new rendered/iPad layer
acceptance inferred. Next explicit layered project/scene resource/history integration.

.904 local validation: Node24.19.0 full **2519 PASS / 0 FAIL / 0 skipped**;
seven new resource/history/codec/export checks PASS. No device acceptance inferred.
