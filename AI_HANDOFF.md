# BoxLab AI Handoff — .884 Native Colour Images

## Current state — 2026-10-16
CrisBezz/BoxLab main build0.36.18.884; live https://crisbezz.github.io/BoxLab/.
Previous main7a601596 / .883 GLB publication; .884 native colour device gate pending. User explicitly approves ongoing pushing/publishing.
Read AI_WORKFLOW completely, this handoff, TEST_CHECKLIST, recent DEV_HISTORY and
ROADMAP before code. Repository is source of truth. Standing publish authorization.
Frozen Beta7 .807 and Beta2–6 immutable. Protect Multi1.0, Loop715, Extrude802,
Boolean806 and all accepted Pencil/navigation/selection behaviour.

## .884 — native File→NOMAD colour image embedding, 2026-10-16

User supplied EXPORTED TEXTURED.nom from Nomad during883 publication, lifting the
native-schema fixture blocker. SHA256ab3d9293d51d0597cdd6b17439112378e11a486c2898bc72282686a849dcfd6f.
Read donor fully through existing reader: revision7, JSON offset65608, images table
{length,offset,type} points to RAW JPEG/PNG bytes, material.textures.color.index links
image table. Donor contains colour/roughness/normal/displacement records. Metadata-only
fixture records provenance/header/image descriptors/colour texture convention; user's
10MB file/pixels are NOT committed or used as runtime donor. Frozen tube donor remains
byte-identical.883 GLB device acceptance is NOT inferred from native-file upload.

Extend original nomad-export-core writer, not another container/UV/export kernel.
First stage: one USED opaque core UV0 PNG/JPEG colour-image material per object, same
original uvImageSurfaceSource eligibility through unchanged882 helper. Require matching
complete Base UVs, default repeat wrapping + linear mipmap filters; unsupported/multi/
missing/nonopaque/transformed/invalid/nondefault-sampler inputs refuse clearly instead
of dropping colour. This is colour handoff only, not full PBR: normal/packed roughness-
metalness/displacement/other image slots remain pending. Constant roughness/metallic
factors and RGB baseColorFactor transfer with donor-proven colour slot convention.

Native-local image table embeds ORIGINAL source bytes (no decode/reencode/downscale),
4-byte aligned; image buffer identity dedup across objects within this build, ≤24MB
aggregate, original≤8MB source guard. Existing geometry parts append after images with
same offsetFields owner; mesh.material points to appended native material cloned from
original donor. Temporary table/material/parts are local; shared scene/project/history
payloads untouched. Textured output uses observed header revision7; no-image output
retains original revision6/header and native UV/geometry bytes. Original donor thumbnail/
other settings retained. Count now counts meshes, not binary image/padding parts.
Image field bounds verified with existing reader. Native action reports colour images
count while retaining real .nom MIME/name/download and original UV status.

Five new native tests verify donor metadata convention/header7, exact PNG/JPEG image
bytes/material links/factors, unchanged UV/geometry field bytes, mixed plain/coloured
objects/alignment/shared-image dedup, selected UV/project-resource continuity, unsafe
source/UV/sampler/budget refusals and ACTUAL File NOMAD downloaded bytes/status.881
preview-invariance fixture now uses default sampler for its native baseline; its
clamp/nearest preview tests remain, and new native refusal test explicitly covers them.
Full local2412PASS/0FAIL/0skip. Additional audit exported donor's actual1,412,537-byte
JPEG through new writer: original image hash matched, native revision7, one colour image.
No browser/Nomad visual proof claimed; iPad opening/orientation/appearance gate pending.

Cache graph shell/recovery/export-panel884→native-core884→unchanged surface882→decoder880.
Original importer/render/surface882/UV workspace880/resource875/native donor, protected
modelling and frozen betas unchanged. Only metadata fixture, no user image assets shipped.
All four continuity docs updated; publication proof follows.883 GLB tests remain active.

Device884: ONE-material textured GLB, SubD off → File→NOMAD → open in Nomad: colour
image+UV alignment; Pencil island edit→NOMAD repeat; .boxlab Save/Open→NOMAD; plain mesh
still exports. Multiple supported single-material objects may share one native file.
Next after feedback: native colour device result first; audit additional PBR channels
or native per-face material format using real donors before claiming support. Packed
roughness/metalness cannot be copied as a plain roughness image without channel handling.

## .883 — exact material GLB handoff; native NOM textures still unresolved, 2026-10-16

User .882 PASS /nextbuild after confirming active/selected-only UV Image is expected.
Protect fresh exact multi-material preview, Pencil/history/project persistence and
active-only memory policy. During883 user reports UVs but no textures on return to
Nomad and explicitly confirms File→NOMAD (.nom), NOT GLB. That report is a distinct
NATIVE image omission; do not claim this GLB repair fixes it or mark native textures PASS.

Audit main15e57665: original GLB patcher assigns first retained material to every
primitive. Original exporter now optionally buckets by BOTH facegroup and exact .882
face-material ID, using original triangulator/attribute/fit owners. Shared exporter
faceMaterialAssignments validates imported version/source, original topology signature,
face count and material IDs for both preview and Base GLB. Multi-material missing/
stale/invalid/evaluated/SubD mappings refuse with fresh-import/Base instruction rather
than first-material substitution. Legacy single/plain GLB paths unchanged.

Patch each exported primitive to the corresponding retained material with original
per-object texture/sampler/image base remapping and byte append. Facegroup identity is
independent of material splitting: unique original group table + per-primitive group ID;
several material primitives may belong to ONE Nomad facegroup. Exact multi-material
branch preserves all UV seam variants (old imported pole-collapse path unchanged for
legacy/single exports). GLB inspection remains original Loader self-check. Temporary
export geometry/material cleanup now runs in finally on errors too, shared materials
retired once. No image decoding/painting/render/kernel/resource/history changes.

Five native tests verify actual Three GLB triangles/material IDs/UV corners/group IDs,
reimport names, multiple objects/global material bases with duplicate names, final image
bytes + all five core texture slots/sampler references/alignment, selected UV edit +
resource-codec continuity, missing/stale/invalid/evaluated refusals and failure cleanup.
Image-bound test removes texture refs ONLY from private Node verification copy so actual
Loader can validate geometry without browser decoding; final real exporter/patcher bytes
checked independently. No automated browser/Nomad image rendering proof. Full local
2407PASS/0FAIL/0skip, earlier semantic tests retained.547 source assertion follows
separate group-ID mapping rather than freezing group=index. Reviewed shell/recovery/
export-panel883 only; importer/render/surface882/workspace+decoder880/NOM865/protected
modelling/frozen beta bytes unchanged. Publication proof follows.

NATIVE BLOCKER: nomad-export-core865 explicitly writes geometry/UVs/groups only and
retains donor material; no imported texture/image serialization exists. Sole validated
native donor nomad-tube.nom has material factors but NO image/texture records. No
textured .nom fixture or validated image-link/binary convention exists in repository.
Do not invent native fields or rename GLB as NOM. Request a real textured .nom SAVED BY
NOMAD (simple UV cube + one image sufficient) to inspect image payload/material links
and build a truthful native test before implementation. Native writer/donor unchanged;
accepted865 UVs remain protected. User texture omission remains OPEN, not fixed by883.

Device883 GLB gate: File format GLB + Base→Export/Save (NOT NOMAD button) → Nomad:
correct images/areas + facegroups; UV edit→repeat; .boxlab Save/Open→GLB. Exact maps
require fresh882+ GLB import with Split groups off. Next priority is native .nom
texture sample/format audit and repair once fixture available; painting later.

## .882 — exact imported face materials in UV Image, 2026-10-16

User .881 PERFECT PASS /nextbuild protects active-image orientation/colour/navigation,
Pencil UV edit→surface refresh/history and ordinary look restoration. Audit main007fdfb6
and original importer882 predecessor797 found retained materialIndices are a used-set,
NOT per-face assignments. Exporter buckets group by facegroup labels; duplicate names
are not proof of material identity. Do not infer image assignment from those labels.

Extend ORIGINAL importer conversion/merge/weld/quad owners with optional per-face global
material IDs from glTF.parser.associations. Carry them alongside existing corner channels;
drop matching entries for removed faces, retain IDs for reconstructed quads, and prevent
quad merges across differing IDs even if facegroup labels match. Store only complete
valid IDs in imported payload.faceMaterialIndices + materialTopologySignature. Legacy/
missing associations never claim provenance. File GLB callback supplies parser map; OBJ
flow unchanged. Existing generic imported resource codec/history/COW snapshots carry
optional fields without a new envelope/version/history owner. Old mixed-material project
files need a FRESH GLB import in882 to obtain exact assignments; no name-based migration.

Original buildUVPreviewGeometry adds explicit materials:true inspection option, validates
assignment/signature/IDs, and delegates same editableToGeometry triangulation/corner UVs.
Only that preview option groups by exact material ID and exposes slot IDs in geometry
userData. Ordinary GLB/NOM/OBJ writers and checker retain their original grouping/math;
this stage does NOT repair the older multi-material GLB output patcher's first-material
behavior. Keep that export limitation distinct from correct surface preview.

Extend SAME active-image helper: up to FOUR used opaque embedded-image materials,
aggregate≤8MB encoded source, each original1024² decode (up to16MiB decoded RGBA total
plus GPU textures). Decode serially and show image only after ALL sources are ready.
Any unsupported/missing/transparent/overbudget material, stale/missing map or failed
decode leaves whole object Solid. Source cleanup/mode switch cancels further decoding;
late results and all prior bitmaps/textures/materials/geometry release exactly once.
Per-slot baseColorFactor/sampler/sidedness retained. Existing881 single-material files
remain supported; inactive objects still Solid. No painting, PBR lighting, persistent
material edits, new pointer/kernel/history owner or evaluated UV propagation.

Six new native tests cover actual GLTFLoader reversed IDs/identical material names,
conversion/merge/weld/quad boundary provenance, optional channel codec roundtrip, original
triangulator group/position/UV slot mapping + stale refusal, real Three multi-image
factors/samplers/serial readiness/disposal/failure/cancel/budgets, actual File GLB callback
and independent OBJ callback. Full local2402PASS/0FAIL/0skip. One544 literal importer-call
assertion advances to include parser associations, preserving split-toggle contract;
all earlier tests retained. Reviewed pins shell/recovery/render/importer/export panel/
surface child882; decoder/workspace880/native NOM865/manager875/navigation868/protected
modelling and frozen betas unchanged. Publication proof follows.

Device882: FRESH import2–4 opaque embedded-image materials, Split groups OFF/SubD OFF →
VIEW→UV Image. Inspect correct image areas, edit UVs→Back to3D/history, Save/Open project,
and switch to Studio/Solid. Existing single-material gate remains protected. Next after
feedback audit original GLB patcher's per-face material export (without guessing from
facegroup names) before painting or broader material support.

## .881 — temporary active-object 3D UV Image view, 2026-10-16

User .880 Perfect PASS /nextbuild protects embedded image orientation/reference,
Pencil/navigation/history, source chooser and project persistence. Repeated PASS/
nextbuild while .881 was still in progress continues this release; no .881 device
acceptance inferred. Audit main6b6565c4/.880: retained importer material/sampler/image
resources, .880 bounded decoder, .879 exporter preview geometry and render owner are
sufficient. No second UV/triangulation/history/material-editing kernel.

VIEW→UV Image now inspects the ACTIVE plain independent Base object with exactly ONE
used opaque core material and embedded PNG/JPEG UV0 base-colour image. Unlit sRGB image
with linear baseColorFactor, glTF V0 (flipY=false), original core clamp/repeat/mirrored
wrap and nearest/linear/mipmap filters, material double-sided flag. Original decoder
limits retained (≤8MB encoded source,1024² bitmap). Inactive objects remain Solid,
bounding resident surface preview to one active image. Mixed used materials, alpha
blend/mask/nonopaque factor, material/texture transforms/extensions, missing/external/
invalid resources, linked/procedural/reference/SubD/Mirror/stale/incomplete/over20k-
corner channels retain Solid; no guessed per-face material assignment. UV Editor's
multi-image reference chooser remains accepted and unchanged.

Small uv-image-surface-preview child delegates original geometry builder and decoder.
Original body geometry/raycast untouched; overlay raycast disabled. Solid stays while
loading/on decode failure. Native source geometry disposal or existing render cleanup
removes overlay and disposes geometry/material/texture/bitmap once. Canceled-before-
start requests skip decode; late results close without replacing a newer look. Existing
Mesh Health session-end refresh applies UV changes; native rebuild handles history and
object switches. Startup Studio retained. No persistent textures, resource writes,
painting, PBR lighting, evaluated UV propagation or export changes.

Five real Three/native tests cover source/material/sampler guards + codec continuity,
sRGB/factor/wrap/filter/orientation/UV mapping, exact-once disposal and async cancellation/
failure races, actual render active/inactive/base eligibility + UV session refresh/look
restoration, original image/project/native NOM byte identity + GLB UVs. Full local suite:
2396 PASS /0 FAIL /0 skipped. Original .879/.880 tests remain intact. Render-button
contract now requires original9 plus UV Image. Cache graph shell/recovery881 → render881
→ new surface child881 → unchanged decoder880; exporter879/workspace880/native NOM865/
manager875/navigation868/protected modelling/frozen beta bytes retained.

Device .881 gate pending: textured single-material GLB/SubD off → VIEW→UV Image;
orientation/colour/orbit, Pencil island edit→Back to3D refresh + Undo/Redo, Studio/Solid
restoration, native/plain/mixed-material fallback. Next: .881 device feedback, then audit
per-face material assignments through the ORIGINAL exporter buckets before multi-material
surface support. Keep resource images read-only; painting remains later.

## .880 — embedded base-colour image reference in UV Editor, 2026-10-16

User .879 Perfect PASS protects temporary surface checker, navigation, UV edits/session
refresh/history and ordinary look restoration. Audit main67e01309/live879: importer797
retains materialIndices/materials/textures/embedded image bytes; resource875, history,
Duplicate and codec already preserve them. No image display/decoder exists. Extend the
ORIGINAL UV workspace/renderer with optional Image reference and material-name chooser
when multiple compatible sources exist. Whole selected image behind ALL UV outlines;
this is reference inspection, not face-material assignment or PBR rendering.

Small uv-image-preview helper resolves USED materialIndices → UV0 baseColorTexture →
texture.source → existing embedded PNG/JPEG bytes. No URLs/network fetches or unrelated
normal/roughness images. Texture transforms/other UV sets/texture extensions, external
or missing/invalid/over8MB image records refuse; missing native/plain resources disable
Image. Labels use textContent. Optional browser createImageBitmap produces a1024×1024
reference (square tile mapping); original image bytes never resized/replaced. Browser
unsupported/decode failures show inline status. At most one decoded image held; token
checks discard/close late results, canceled-before-start work never decodes. Switching,
off/close/payload replacement releases bitmap; same read-only image across UV-only payload
replacement reuses it. No new history/resource schema or image editor/cache pool.

Renderer shares original projection/picking, clips canvas+tile0–1, flips vertically so
stored glTF V0 corresponds to image top (GLTFLoader uses flipY=false). Image drawn above
optional checker and beneath outlines/selection/seams; Pencil transforms UVs over fixed
image. Reference is tile-only, not sampler wrapping/material colour-factor evaluation.
Controls cancel pending Pencil without commit, retain view/selection; off on reopen.
No 3D image look, painting, new UV channel, kernel, gesture owner, or topology changes.

Five native regressions cover actual importer container/resource shape+codec bytes,
used-source/unsupported guards, decoder thumbnail/budget/fail/cancel/race/reuse lifecycle,
renderer V0/projection/clip/order/read-only and actual workspace chooser/Pencil/session
cleanup. Full local Node24:2391PASS/0FAIL/0skip; final publication proof follows.
Cache MeshHealth/workspace/edit/inspector880 plus new image helper880 and shell/recovery;
edit880 changes ONLY shared inspector import. Surface checker/render/export879, native
NOM865, manager/codec/resources875/nav868, protected Multi1.0/main854/Loop/Extrude/Boolean
and frozen betas unchanged. Device880 image orientation/readability/Pencil/chooser/file
reopen gate pending. Next after feedback: audit temporary 3D base-colour image view with
per-material ambiguity/sampler/colour/lifetime handling before painting; reuse original
render/geometry/resource owners and keep imported images read-only.

## Protected .879 — user PASS2026-10-16

3D UV Checker surface/seams, orbit/pan/pinch, island Scale→Back to3D refresh, native
Undo/Redo and Studio/Solid restoration accepted. Preserve ephemeral overlay and original
body geometry/picking/export isolation; .880 image reference gate remains separate.

## .879 — temporary 3D UV Checker view, 2026-10-16

User .878 PASS protects 2D Checker readability/alignment/navigation/Pencil/history/
reopen. Audit main033d9950/live878: render-modes568 owns all body looks; exporter877
already owns polygon triangulation and corner UV seam mapping. Add UV Checker as a
ninth look under VIEW, through that same render owner. No new modelling/triangulation/
pointer/history kernel. Studio remains startup default; switching looks restores original
body geometry/material behavior. Plain independent Base meshes with complete valid stored
GLB/native UVs show a repeating16×16 unlit checker over the surface; missing/stale/invalid,
linked/procedural/reference/SubD/Mirror objects retain Solid fallback. Preview bounded to
20,000 face corners; larger channels fall back entirely, never partial checker surfaces.

Exporter exposes guarded buildUVPreviewGeometry, delegating original editableToGeometry/
triangulateFace with seam preservation, no imported-fit restoration (live coordinates),
finite f32/index/corner/signature/completeness guards. Actual GLB/NOM export maths unchanged.
Small uv-checker-preview owns temporary child geometry/ShaderMaterial; no textures/images,
paint or stored material edits. Original body geometry/raycast is untouched, preview
raycast disabled. Existing render cleanup disposes checker exactly once; original body
geometry dispose listener also removes/disposes it during native main/inactive redraw,
without modifying protected main854 or manager875. Read-only payload stays untouched.
Original Mesh Health session-end event refreshes checker after UV edits; native rebuilds
handle scene history/object changes. Importer/editor/navigation/resource codecs unchanged.

Five native regressions cover original corner mapping/live-space/concave triangulation,
invalid/stale/partial/overbudget refusals, actual Three overlay/picking/resource lifecycle,
actual render active bridge/inactive lookup/fallback/look restoration/session refresh,
and cylinder THREE seam+cap variants/native NOM bytes unchanged. Full Node24 suite:
2386PASS/0FAIL/0skip. Existing453 render-button test now requires all original8 plus new
checker, rather than freezing total8. Reviewed render/export-panel/child cache879 and
shell/recovery879 only; MeshHealth/workspace/edit/inspector878/nav868/NOM865 retained.
Protected Multi1.0/Loop/Extrude/Boolean/main and frozen beta bytes unchanged.
Device879: Cube Box UVs or upright Cylinder UVs, SubD off → VIEW→UV Checker; orbit to
inspect seam/stretch/relative density; edit island Scale then Back to3D; Undo/Redo;
VIEW→Studio/Solid. Native Base UVs only, no evaluated UV propagation/painting claim.
Next: device feedback on temporary checker, then imported-image inspection through
original resource/render owners before painting or broader seam unwrap work.

## Protected .878 — user PASS2026-10-16

2D Checker toggle/readability, tile-aligned pan/pinch/Fit, Pencil Move/Scale/Rotate and
Undo/Redo, Back to3D/reopen defaults accepted. .879 surface-checker device gate separate.

## .878 — UV Editor checker reference, 2026-10-16

User .877 PASS protects upright Cylinder strip/caps, Pencil/history, native project/
NOMAD Base and GLB seams; Box/Planar/imported baselines remain protected. Audit current
main83c0b563/live877: no checker inspection exists. Existing inspector canvas owns UV
projection; render-modes568 owns Studio/materials but has no UV-checker surface path.
Add optional Checker toggle to the ORIGINAL large UV workspace and renderer. Fixed
16×16 reference inside tile0–1 uses the same projection as outlines/picking, with
numerically clipped cells and at most256 rectangles regardless of UV bounds/zoom.
Draw under island colours/gold selection/orange seams. Default off on reopen; keep
view and selection when toggled, cancel pending Pencil preview/capture without edit.
Report/history refresh retains checker setting within current session. No scene/resource/
project/history writes, image decoding, new gesture/UV/render kernel or material changes.
This is a 2D size/alignment aid, not 3D stretch inspection or texture painting.

Three actual renderer/workspace regressions cover DPR/pan/zoom/picking, extreme/tiled/
offscreen/stale layouts, draw order/read-only arrays, pending-stroke cancellation,
view/selection/refresh/reopen lifecycle and no edit/history callbacks. Full local Node24
2381PASS/0FAIL/0skip. Cache graph MeshHealth/workspace/inspector878; edit878 changes ONLY
its inspector import pin; original edit maths/guards unchanged. Shell/recovery878.
Export panel877/native NOM865/manager+codec+resources875/nav868, protected Multi1.0,
main854/Loop/Extrude/Boolean and frozen betas unchanged. Publication proof follows.
Device878: Checker toggle/readability, pan/pinch/Fit, Pencil Move/Scale/Rotate + Undo,
close/reopen default off. Next audit a temporary 3D checker through existing render
and triangulation owners; do not add another triangulation kernel or persist a preview
material into resource/history/export. Imported image inspection and painting follow
separately after material/resource budget and lifecycle audit.

## Protected .877 — user PASS2026-10-16

Upright Cylinder UV strip/two caps, separate Pencil island edits, Undo/Redo, Save/Open,
NOMAD Base and Base GLB seam/cap continuity accepted. Preserve native sourceboxlab/v3
transport and imported pole-weld compatibility; .878 checker device gate remains separate.

## .877 — native Cylinder UVs (world Y), 2026-10-16

User876 Perfect PASS protects Box panels/seams/island edits/history/project/NOMAD
Base. Audit main79fec447/live876: no cylindrical mapper exists. Add Cylinder UVs (Y)
to Mesh Health→UVs for plain upright round aligned-ring cylinders/prisms. Uses the
same native eligibility, sourceboxlab/v3 channel and original commit/history owner.
One side strip with deterministic existing-column seam near maximum world X, plus
two separate planar caps for the standard closed Cylinder. No geometry split/change.
Open side-only forms can produce one strip; no general arbitrary seam-cut operation.
Measured cross-section polygon edge lengths unfold the strip, preserving side/cap
edge density, including odd radial counts and multiple height bands. Atlas is fitted
with gaps between strip/caps. Round rings about Y required; nonround/elliptic, axis-
collapsed, unaligned seam, degenerate/invalid/procedural/imported/modifier contexts
refuse before history/payload mutation. User can still use Planar/Box as appropriate.

Extend existing imported-uv-edit with createCylinderUV; read-only normalized positions
and unique radial columns, original native commit. Repeat no-op; replaces native UVs
with one checkpoint, Undo restores original; peers/resources untouched. Original
UV editor, selection, Pencil tools and navigation unchanged. Manager/codec/resources875,
inspector/workspace874/nav868/native NOM865 and protected/frozen owners unchanged.

Related GLB audit found old >=3-UV-variants pole-collapse rule could merge native
seam+cap variants at one geometry vertex. Existing exporter now sets preserveUVSeams
ONLY for sourceboxlab, retaining native UV corner variants; imported GLB pole/weld
path unchanged. No new exporter or triangle kernel. Prior membership-only attribute
tests did not prove this distinction. New real GLB assertion checks all THREE UV
variants of the seam/cap vertex against source values, in addition to NOM UV pool
bytes/project continuity. File NOMAD writer was already seam-correct and unchanged.
Five native regressions cover3islands/seam/no-op/Undo/geometry identity, measured edge
density/odd rings/finite extremes, native replacement/peer/island isolation, actual
MeshHealth/project/NOM/GLB seam variants, and invalid/unsupported refusals. Local Node24 full2378PASS/0FAIL/0skip; publication proof follows below. Cache graph MeshHealth/edit/export-panel877 plus
shell/recovery877; all other owner pins retained. Device877 gate pending;876 PASS
protected. Next after feedback: audit UV checker/texture inspection through existing
render/resource owners before painting or broader curved/seam unwrap work.

## Protected .876 — user PASS2026-10-16

Cube Box six-panel layout/seams, selected Pencil edits, native Undo/Redo/Planar
replacement and Save/Open→NOMAD Base accepted. Preserve Box mapper/sole gesture owner;
.877 Cylinder and native GLB seam gate remains separate.

## .876 — native Box UV mapping, 2026-10-16

User875 PASS protects native Planar/editor/history/SaveOpen→NOMAD Base and existing
imported-UV baseline. Audit main2f29af87/live875: no box/dominant-axis mapper exists;
native sourceboxlab/v3 channel, inspector/seam data and scene/export owners suffice.
Add Box UVs alongside Planar XY/XZ/YZ in Mesh Health→UVs. Whole plain Base mesh maps
by each face's dominant signed Newell normal (deterministic X/Y/Z tie order) into six
fixed3×2 directional cells. Normalized read-only coordinates avoid huge/tiny finite
scale overflow. One common projected-coordinate scale preserves rectangular face
proportions/equal axis-aligned density,2% horizontal tile/cell margins; spare space is
intentional. A normal cube yields six separate quad islands and12 seam edges, without
side-face collapse or opposite-face overlap. Same-direction subdivisions keep shared
UVs. General shapes can still overlap within a directional cell or distort; this is
box projection, not seam-based unwrap/optimal packing or texture painting.

Extend existing native creation owner in imported-uv-edit with createBoxUV. Extract
original native eligibility/commit into private shared helpers used by Planar and Box;
Planar maths/output retained. Invalid indices/nonfinite/degenerate faces/context/history
refuse before resource/history changes. Repeated same Box mapping adds no history;
Box can replace native Planar UVs in one checkpoint, Undo restores the previous payload.
Imported GLB/procedural/modifier/linked/reference/locked resource refusals retained.
Original COW transport, native envelope v3, inspector874/workspace874/navigation868,
manager/codec/resources875 and GLB/native exporters865 unchanged. No modelling kernel,
new schema/pointer/history/exporter or geometry mutation. UI native note now generic,
since same native channel supports more than Planar. All Pencil edits remain original.

Five native tests cover cube6islands/12seams/disjoint atlas/noncollapsed faces/native
Undo/no-op, rectangular proportions/density/same-direction adjacency/extreme finite
scales, Planar replacement/peer isolation/selected edit, actual MeshHealth callback/
project/native NOM independent UV indices+corner bytes/real GLB UVs, invalid/imported/
procedural/modifier/degenerate/history refusals. Local Node24 full2373PASS/0FAIL/0skip; publication proof follows below.
Cache graph MeshHealth/edit876; shell/recovery876. Other owners/protected Multi1.0,
Loop/Extrude/Boolean/main and frozen betas untouched. Device876 box/editor/history/
project/Nomad gate pending;875 PASS protected. Next: feedback on Box mapping, then
seam/unwrap or texture-inspection stages after owner audit; no evaluated UV guarantee.

## Protected .875 — user PASS2026-10-16

Native Planar XY/XZ/YZ layout, original Pencil manipulation/history, native project/
NOMAD Base roundtrip and imported UV baseline accepted. Preserve sourceboxlab/v3
transport and no fake GLB provenance;876 device acceptance remains separate.

## .875 — native BoxLab Planar UV creation, 2026-10-16

User874 PASS protects Fit-to-tile aspect/isolation/idempotence/history, Pencil tools,
navigation and project/Nomad UV roundtrip. Audit mainaeae3081/live874: existing read-
only resource/history/ordinary Duplicate/UV inspector/edit/export paths are sufficient;
no native UV authoring or projection exists. Mesh Health disclosure is now UVs, with
Planar XY/XZ/YZ for plain independent Base meshes (SubD/Mirror/linked/Boolean/Array/
curve/reference/locked/imported-resource contexts refuse). Projects the WHOLE mesh
onto chosen coordinate axes, uniformly fits to tile with2% margin, original geometry
unchanged; repeat same projection no-op. Reprojection replaces only native UVs with
one native scene checkpoint. Axis silhouettes can overlap/collapse opposite/side faces;
this is planar projection, not a box/seam unwrap, packing or painting.

Extend original imported-uv-edit owner with createPlanarUV; no parallel edit/history
kernel. Native channel uses the existing glbPassthrough face-corner RESOURCE TRANSPORT
with explicit source:'boxlab', version1 and only uvTopologySignature/uvCorners. This
is honest native provenance, never source:'glb' or invented material/image metadata.
Project resource envelope version3 encodes native UV-only records; strict keys/finite
corner/signature validation, no images/materials. Existing GLB envelopes1/2, plain
project format1, imported channels and pooled resources unchanged. Older apps refuse
v3 safely. Existing .boxlab codec/SaveOpen/manager atomic replacement now accept this
native record; read-only snapshots, single/Multi Duplicate and copy-on-write edits
reuse original owners. Native Linked Duplicate refuses before source conversion;
LiveArray/source guards already refuse attribute-bearing resources. No linked UV
propagation or topology/modifier UV regeneration promised.

Existing inspector874, workspace874/Pencil/navigation868 and UV Move/Scale/Rotate/
Flip/Fit now also accept native provenance through original edit guard. Existing GLB
and native NOM865 writers ALREADY consume this face-corner format/source-agnostically;
unchanged writers verified with real UV attributes/NOM indices and corner bytes.
Same topology signature owner; topology edits hide stale UVs and unsafe native export
refuses, Undo restores original resource. Initial projection normalizes coordinates
before subtracting, handles huge/tiny finite extents and refuses collapsed planes or
invalid indices/vertices/history without mutation. No texture rendering/paint/OBJ UV
expansion or evaluated UV export in875.

Seven native tests: axes/proportion/one Undo/no-op/reprojection; edits/COW/duplicate/
native scene replacement; strict v3 and legacy/plain codecs; actual NOM/GLB UVs and
stale topology; invalid/imported/procedural/modifier/finite-extreme guards; actual
MeshHealth callback; original single/Multi duplicate/deleted-copy Undo/linked refusal.
VM project replacement preserves incoming/global namespace separation (860 pattern).
Local Node24 full2368PASS/0FAIL/0skip;12 focused native/release PASS. Cache graph:
MeshHealth/edit875; manager875; resource875→codec875→management875→drawer875;
shell/recovery875. Inspector/workspace874/nav868/native+export865/protected kernels
and frozen betas unchanged. Device875 planar/editor/history/file/Nomad gate pending.
Next after feedback: inspect simple box/dominant-axis mapping and UV seams before a
full unwrap; preserve native channel transport and imported GLB protections.

## Protected .874 — user PASS2026-10-16

Fit-to-tile centring/aspect/other-island isolation, repeat no-op, one Undo/Redo,
view Fit distinction, Pencil/navigation and project/native UV roundtrip accepted.
.875 native channel/device acceptance remains separate.

## .874 — Fit selected UV island to tile, 2026-10-16

User873 Awesome PASS protects Pencil Rotate/pivot/seams, one Undo per stroke,
Move/Scale/navigation and project/Nomad UV roundtrip. Audit main3068b720/live873:
no UV fit-to-tile/packing operation exists; view Fit is navigation only. Add selected-
only Fit to tile beside existing workspace tools. Centres selected island at(.5,.5),
uniformly scales its longest UV dimension to.96, leaving2% margin; aspect ratio and
other islands unchanged. Single original UV transaction/checkpoint; repeated fitted
click is a no-op (8EPS centre/span tolerance only for fit-idempotence). This is selected-
island placement, not automatic multi-island packing or overlap prevention.

Extend SAME imported-uv-edit owner with fitImportedUVToTile(scope). Reuse original
island bounds loop through shared read-only importedUVIslandBounds; existing centre
helper delegates unchanged maths. Normalized coordinates avoid overflow/underflow,
including extreme/tiny finite UV extents. Zero-extent islands refuse; original complete-
imported/context/stale/history/locked guards remain. Full selected island includes
unpreviewed faces. Copy touched corners/replace payload/retire stale tangents as before;
resources/geometry/peers untouched. Workspace button cancels pending Pencil preview,
keeps matching selection and current view; original Fit still only frames the view.
Move/Scale/Rotate gesture owner and all original modelling owners unchanged.
Four native regressions cover native history/peer/resource isolation/idempotence,
aspect/full-island/extreme/degenerate guards, actual workspace/view-Fit distinction,
actual MeshHealth callback/stale scope and project/NOM UV bytes/GLB attributes.
Local Node24 full suite:2361PASS/0FAIL/0skip; publication proof follows below. Cache graph MeshHealth/workspace/edit/
inspector874; navigation868/Multi1.0/modelling kernels/frozen betas retained. Device874
gate pending;873 PASS protected. Next after feedback: audit a native BoxLab UV-channel/
projection foundation, using original history/project/export owners; no fake imported
GLB provenance, new-mesh UVs, seam unwrap, evaluated-modifier UVs or painting in874.

## Protected .873 — user PASS2026-10-16

Pencil Rotate centred preview/seams, repeated strokes/one native Undo, Move/Scale/
navigation and Save/Open→native Nomad UV roundtrip accepted. Preserve quarter-turn
parity and sole canvas gesture owner. .874 acceptance remains separate.

## .873 — Pencil Rotate for selected UV islands, 2026-10-16

User872 PASS protects Pencil Scale/pivot/seams, one Undo per stroke, Move/navigation
and project/Nomad UV roundtrip. Audit main89a17b3c/live872 and original workspace/edit
owners: Rotate90 exists, arbitrary-angle selected rotation does not. Add Rotate to
existing Move/Scale controls. Pencil horizontal drag right rotates counterclockwise,
left clockwise;120 CSS pixels =90degrees, live angle readout. Full-island bounds
centre remains shared with Scale, including unpreviewed faces. Default Move on reopen,
finger/background navigation, pinch and palm policy unchanged. Vertical-only/tiny
strokes add no edit. Original Rotate90/Flip buttons and exact Move/Scale remain.

Extend SAME imported-uv-edit transaction with rotateImportedUVByAngle(degrees,scope),
requiring selected island/expected payload/finite angle and all original guards.
Renderer and transaction share rotateImportedUVPoint; exact quarter-turn branches
retain accepted90-degree coordinates, generic angles use sine/cosine. Full turns
are exact no-ops. Read-only preview rotates selected outlines/highlight/orange seam
sides; original payload/other islands/resources remain untouched until lift. One
native checkpoint per changed stroke; mode/capture/report/lock/history/resize/close
cancel preview and original object/mesh/payload release guard remains. No new UV
schema/kernel/history/pointer owner. Four native regressions cover real workspace/
manager/history, reciprocal quarter turns, preview/seam/peer isolation, cancellation/
no-op/full-turn/navigation/palm/zoom/default Move, arbitrary-angle project/actual NOM
UV bytes/GLB attributes, actual MeshHealth callback, invalid/stale/overflow refusal
and full-island pivot. Local Node24 full suite:2357PASS/0FAIL/0skip; publication proof follows below. Cache graph
MeshHealth/workspace/edit/inspector873; navigation868, Multi1.0/modelling kernels and
frozen betas unchanged. Device873 gate pending;872 PASS protected.
Next: device feedback on Pencil Rotate, then audit the next staged UV-authoring step;
projection/unwrap/new-mesh UV channels and painting remain unimplemented, no blanket
UV propagation through topology edits or evaluated modifiers is claimed.

## Protected .872 — user PASS2026-10-16

Pencil Scale around island centre, seam preview, repeated strokes/one Undo, Move/
navigation and Save/Open→native Nomad UV roundtrip accepted. Protect uniform Scale
sensitivity/default Move; .873 device acceptance remains separate.

## .872 — Pencil Scale for selected UV islands, 2026-10-16

User .871 Perfect PASS protects Pencil Move, seam following, one Undo per stroke,
navigation and project/Nomad UV roundtrip. Audit main7864abe9/live871: workspace
owns the sole canvas gesture, imported-uv-edit already owns uniform Scale. Add
selected-only Move/Scale buttons to that workspace; Move remains default on reopen.
Scale: Pencil-drag selected island upward to enlarge/downward to shrink about its
full UV-bounds centre. 120 CSS pixels doubles/halves; positive factor clamped .01–100
per stroke, with live factor readout. Finger/background navigation and palm handling
remain unchanged; horizontal-only/tiny strokes do not scale. Mode switch cancels
preview. Exact fields remain optional under the existing collapsed disclosure.

Reuse the original read-only preview and one on-release Scale transaction/native
checkpoint. Shared importedUVIslandCentre extracts the existing bounds-centre loop
into the inspector; preview and commit use identical full-island bounds, including
faces beyond preview budget. Scale preview transforms only selected outlines/gold
highlight/orange seam sides; payload and report arrays stay unchanged until lift.
Existing stale context/locked/history/no-op/overflow guards and stable projection
remain. No new UV schema/kernel/history or pointer owner. Four native regressions
cover actual workspace/manager/history, preview/pivot/peer/resource isolation,
reciprocal strokes, cancellation/no-ops/mode switch/reopen, navigation/palm/zoom/DPR,
positive limits and bounded-preview/shared-corner seam correctness. Existing native
project/NOM/GLB and Move/Rotate/Flip tests remain active. Local Node24 full suite:2353PASS/0FAIL/0skip; publication proof follows below. Cache graph MeshHealth/workspace/edit/inspector872; nav868 and
protected Multi1.0/modelling kernels/frozen betas unchanged. Device872 gate pending.
Next after feedback: Pencil Rotate through the same workspace/transaction owners;
projection/unwrap/new-mesh UV channels/painting remain later.

## Protected .871 — user PASS2026-10-16

Pencil Move and orange seam following, repeated drags/one native Undo per stroke,
finger/pinch/background navigation and project→native Nomad UV roundtrip accepted.
Default Move remains protected when introducing Scale; .872 acceptance is separate.

## .871 — Pencil Move for selected UV islands, 2026-10-16

User .870 PASS protects numeric Move/Scale, native UndoRedo and project/Nomad UV
roundtrip. User requests Pencil movement instead of typing. Audit current main
604bac15 and live .870; existing workspace canvas owns pointers/navigation and
imported-uv-edit owns Move/history. Extend that canvas owner only: tap to select,
then Pencil-drag the selected island for a read-only live preview. Lift delegates
ONCE to the existing Move transaction (one native checkpoint for a changed stroke).
Finger drag, background/unselected Pencil drag, pinch, wheel and touch UndoRedo
retain navigation ownership. Palm touch while Pencil is down cannot edit UVs.
Exact Move/Scale fields remain available inside a collapsed disclosure; Scale stays
numeric in this narrow build. No new UV channel, edit kernel, scene history or schema.

Renderer preview offsets selected outlines/highlight and their orange seam sides
without changing payload/report arrays; seam-side island IDs avoid shared-corner
reference ambiguity. Screen deltas reuse the renderer projection, with CSS-pixel,
zoom and DPR parity. Workspace keeps projection bounds until Fit/reopen so moving
outside tile 0–1 does not auto-fit/jump. Whole selected island still moves through
existing transaction beyond the preview budget. Other islands/resources stay intact.
Tap jitter <=4px adds no edit. Cancel/lost capture/report replacement/lock/resize/
Fit/history/close discard previews; release guards original object/mesh/payload.
Four native tests exercise the actual workspace plus manager/history, live read-only
preview, repeated strokes/one checkpoint, seam sides, pointer/capture/palm/gesture
lifecycle, view mapping, peers and stale MeshHealth callback. Existing .870 export
regressions retain project, actual NOM corner bytes and GLB UV coverage.

Changed cache graph: MeshHealth871 → workspace871 / edit871 → inspector871;
nav868 and original Move math unchanged; shell/recovery871. Protected Multi1.0,
modelling kernels and frozen betas unchanged. Local Node24 full suite:2349PASS/0FAIL/0skip; final four Pencil tests also rerun
after seam assertions. Publication proof follows after verification. Device .871 Pencil feel/navigation/history/export
gate pending. Next: feedback on Pencil Move, then Pencil Scale/Rotate through the same
canvas/transaction owners; projection/unwrap/new-mesh UVs/painting remain later.

## Protected .870 — user PASS2026-10-16

Selected-island numeric Move/Scale, island isolation, UndoRedo, iPad field editing and
project/native Nomad UV roundtrip accepted. Pencil Move supersedes numeric-first UX
in .871; exact fields remain optional. Do not infer .871 device acceptance.

## .870 — selected-island numeric Move / Scale, 2026-10-16

User869 PASS protects selected Rotate/Flip, pivot/other-island isolation, native history
and project/Nomad UV roundtrip. Audit main82bed89c/live869 and original edit/workspace/
inspector/session/history owners: no UV Move/Scale controls exist. Extend existing
imported-uv-edit transaction with moveImportedUV(U,V,scope) and scaleImportedUV(factor,
scope). Require selected island + expected payload; all existing complete-imported/
context/stale/index/history guards remain. Positive uniform scale about original island
bounds centre; Move uses UV-tile offsets. Whole island includes faces beyond preview.
Other islands/geometry/peer payload/resources untouched; copy touched corners + payload,
retire old tangent basis, one native checkpoint per changed click. Zero Move/Scale1
no-op adds no history; nonfinite/nonpositive/overflow refuses before mutation.
Existing UV workspace gets compact ΔU/ΔV→Move and Scale×→Scale row, selected-only and
original edit eligibility. Fields default0/0/1 on reopen; retained after Apply so clicks
repeat. Blank/nonfinite/nonpositive values show inline error without edit. Original
MeshHealth callback supplies live context/scope, refreshes same report and retains only
matching island membership. Original Rotate/Flip/no-selection scopes unchanged. Canvas
drag stays pan; no new pointer owner/history/kernel/schema. Keyboard guard yields to
input editing, so Backspace/CtrlZ in fields remain normal native input actions.
Four native regressions: Move/Scale geometry/resource/peer/history isolation, project +
actual NOM UV bytes and indexed GLB attributes, no-op/invalid/stale/locked/overflow guards,
and real MeshHealth callback. Original868 workspace integration expanded for numeric
values/invalid/no-selection/UI delegation/Backspace;867 mock gets new callback binding.
Full Node24:2345PASS/0FAIL/0skip. MeshHealth/edit/workspace870, shell/recovery870;
inspector869/nav868/native865/manager+delete867/protected Multi1.0/frozen betas unchanged.
Device870 numeric/iPad keyboard/history/native-export gate pending;869 PASS protected.
Next after feedback: remaining narrow numeric UV transform controls via same edit owner;
projection/unwrap/new-mesh UV channels and painting remain later. No direct drag editing.

## Protected .869 — user PASS2026-10-16

Selected Rotate90°/FlipU/V around own bounds centre, unselected islands unchanged,
selection retention and native history/project/Nomad gate accepted. No-selection
whole-layout behavior and869.1 scope-label correction remain protected.

## .869 — selected-island Rotate / Flip, 2026-10-15

User868 PASS accepts tap selection/highlight, pan/pinch/Fit/clear and native history/
Back to3D. Audit main04ffe1a4/live868: existing imported-uv-edit transaction owns all
Rotate/Flip edits; inspector owns connectivity; no selected-island transform exists.
Extend SAME edit owner with optional island+expected-payload scope. Recompute original
inspector connectivity and validate current topology/payload/index; no stale island ID
silently applies to a replacement resource. Inspector now exposes faceIslands for ALL
mapped faces, retaining preview cap; whole selected island transforms beyond preview.
Selected Rotate90°/FlipU/V pivot around that island's UV bounds centre. Unselected faces
and resources are shared read-only; only touched UV arrays/payload replaced, prior tangent
basis retired. Existing no-op suppression/native checkpoint/guards remain. Without a
selection, original tile-centred WHOLE layout maths and exact APIs remain unchanged.
Original MeshHealth buttons pass workspace selection scope, refresh same report and
retain highlight only if full island membership still matches; merging/splitting clears.
Selection label explicitly says this island vs whole layout. UndoRedo/close/report
refresh still clear ephemeral selection; no new history/project schema or kernel.
Four native regressions cover continuous full island beyond preview, exact transforms/
twice flip, untouched peer/resources/geometry/native UndoRedo, codec + actual NOM UV
bytes and GLB indexed attributes, stale/invalid/locked/overflow refusal and real UI scope.
Existing868 test updated only selected scope text + membership retention/merge refusal;
all prior whole-layout/export/navigation contracts retained. Full Node24:2341PASS/0FAIL/
0skip. MeshHealth/edit/inspector/workspace869; nav868/manager+delete867/native865 unchanged.
Shell/recovery869; frozen betas/protected Multi1.0/modelling kernels unchanged.
Device869 selected edit/history/Nomad/project gate pending;868 PASS protected.
Next: after feedback, selected-island numeric Move/Scale through this same transaction;
no drag transform gesture takeover, unwrap, new-mesh UVs or painting in869.

## Protected .868 — user PASS2026-10-15

Tap selection/gold highlight, clear/empty tap, pan/pinch/Fit and native UndoRedo/Back
to3D accepted. Keep original gesture owner and shared renderer/picker projection.
869 deliberately extends Rotate/Flip from whole layout to current selected island;
no-selection whole-layout behavior remains protected. Stacked selection stays topmost.

## .868 — UV island selection, 2026-10-15

User Works well PASS /nextbuild accepts867 large workspace/navigation/session exit.
Audit current main d7b43cac/live867 and inspector/workspace/navigation/edit owners:
island IDs already exist; extend original inspector renderer and gesture owner.
Tap Pencil/finger/mouse selects the hit island, highlights its preview faces in gold,
and reports Island N of count. Clear Selection/empty tap clears. Shared uvProjection
maps both renderer and picker after pan/zoom; reverse paint order selects topmost
stacked island. Only previewed faces are pickable under existing20,000-corner budget.
Single short stationary tap uses existing navigation owner; restores tiny tap jitter.
Drag/long/multitouch/cancel do not pick; native two-/three-finger history unchanged.
Selection is ephemeral view state; refresh/edit/UndoRedo report replacement and close
clear it, Fit retains it. No UV coordinates/payload/geometry/history/project changes.
Existing Rotate/Flip remain WHOLE LAYOUT, explicitly labelled even with selection.
No selected-island editing yet; next narrow build extends existing edit transaction
with selected-island transforms after device feedback. No parallel UV kernel.
Five native tests cover continuous/stacked/concave/boundary/bounded/stale picking,
shared pan/zoom mapping, pen/mouse/touch and history discrimination, read-only highlight,
and actual workspace clear/reset/close/controls integration. Full Node24:2337PASS,
0FAIL/0skip. MeshHealth/edit/imported-inspector/workspace/navigation868; shell/recovery868.
Manager/delete867/native exporter865/protected Multi1.0/frozen betas unchanged.
Device868 selection/navigation/history gate pending; user867 PASS is protected.

## .867 publication verified / user PASS — 2026-10-15

Release d7b43cac5313fcf01e2b3adfc45b82fc758d9916; tree
217eeca8a73a0d3cd3488cfc601ab6b42cb8af2f. Node22 CI38677757901 /
job116235131037 SUCCESS2332PASS/0FAIL/0skip; Pages38677757250 SUCCESS.
Live shell/version/workspace867/navigation867 byte-match repository before868 changes.
User Works well PASS accepts large workspace, navigation and session exit; protect
same canvas/controls/history and clean Back to3D. Native865 and866 protections retained.

## .867 — large UV workspace, 2026-10-15

User 866 PASS protects Flip U/V, twice restoration, history and native/project UV
roundtrip. User approves dedicated large UV workspace after tiny Mesh Health preview
feedback. Audit main5b85e244/live866: inspector/drawing/edit/history/session owners exist;
no UV workspace/navigation owner. Reuse the same Mesh Health session, original canvas,
Rotate/Flip nodes and native Undo/Redo buttons. Mesh Health retains summary + Open UV
Editor; large overlay uses existing renderer with centred DPR-aware view, drag pan,
pinch/wheel/button zoom and Fit. New uv-navigation is presentation-only CSS-pixel state;
no modelling kernel, UV channel or history stack. Back to 3D/Escape closes original
session; capture/resize cleanup and pen/palm guards retained. Both existing keyboard
Delete owners yield while UV workspace is active. Root touch propagation is scoped,
but toolbar touch default remains available for Safari synthesized clicks.
Six native regressions cover pan/pinch continuation, tap Undo/Redo discrimination,
read-only renderer, original DOM/control/history/session wiring, DPR/resize/capture/
close/reopen/palm cleanup and actual Delete owners. Full Node24:2332PASS/0FAIL/0skip.
MeshHealth/edit/inspector/workspace/navigation867, manager/delete scoped guard pins867,
shell/recovery867; native export865, protected Multi1.0 and frozen betas unchanged.
Device workspace/pan/pinch/toolbar/history/exit/native-export gate pending. Preview
still capped at20,000 corners; no per-island picking/manipulation, unwrap or painting.
Next after feedback: island selection in this workspace using existing island data,
then narrowly scoped selected-island transforms. Do not build another UV edit owner.

## Protected .866 — user PASS2026-10-15

Flip U/V, twice restoration, history and UV roundtrip are accepted. Preserve the
existing copy-on-write edit owner and native865 UV exporter. New device gates separate.

## .866 scope — imported UV Flip U / Flip V, accepted2026-10-15
User Perfect PASS /nextbuild2026-10-15 accepts865 native File NOMAD UV layout/seams,
rotated UV export and .boxlab→native export. Audit main9ad41dba/live865/source pins:
no UV flip owner/UI exists. Extend existing imported-uv-edit, not another transaction
or UV channel. Rotate retains original API and maths; all transforms delegate one
private editImportedUV transaction with existing guards/copy-on-write/checkpoint.
New flipImportedUV axisU:[u,v]→[1-u,v], axisV:[u,v]→[u,1-v] around tile centre; rejects
unknown axes. Same complete independent imported-only guard, no-op history suppression,
new UV arrays/replacement payload and old tangent-basis retirement. Geometry, untouched
metadata/images, shared peer payload and scene history remain with original owners.
MeshHealth keeps Rotate90° plus FlipU/FlipV in one compact row, same enable/disable
state. One Undo per changed click; context guard and inspector refresh use same owners.
All UVs transform together; no per-island selection/unwrap/projection/painting claim.
Four new native tests cover exact U/V transforms/two-flip restoration, unchanged geometry/
shared resource/peer identities, actual scene UndoRedo, project roundtrip, real NOM
UV/seam bytes and Three GLB attributes/tangent exclusion, guards/no-ops and actual UI
actions. Full local Node24:2326PASS/0FAIL/0skip; all previous rotate/NOM tests unchanged.
MeshHealth866→edit866→unchanged inspector863; shell/recovery866. Export panel/native
core865, protected kernels and frozen betas unchanged. Reviewed cache graph only these
changed bytes/pins. Device866 flip/history/native-export/project gate pending.
Next: iPad flip U/V/twice/UndoRedo→File NOMAD with Base geometry, then project reopen;
continue small UV authoring stage after feedback and authoritative-owner audit.

## Protected .865 — user PASS2026-10-15
User accepts native File NOMAD stored UV layout/seams, rotated layout and Save/Open
repeat. Protect independent UV index pool/count_uv, polygon corner mapping, unchanged
geometry/groups/header/donor and explicit stale/evaluated UV refusal. Original864 FAIL
is resolved for this native-device case; broader unrelated gates not inferred.863/862/
861 protections retained;860 Duplicate and859 resource/Nomad gates remain separate.

## .865 scope — native File NOMAD UV export repair, accepted2026-10-15
User864 FAIL: UVs lost on return to Nomad; user explicitly identifies File→NOMAD,
not Base GLB. Do not mark864 accepted. Audit main6023e71c/live864 and both exporters:
GLB741 writes face-corner UVs; native nomad-export-core741 allocates zero-filled uvs
and writes faces_uv=geometry indices unconditionally. This long-standing native-route
omission was NOT covered by864's Base GLB tests. Do not attribute to UV rotation maths.
Existing native writer now consumes stored matching base glbPassthrough.uvCorners,
using the EXISTING exporter topologySignature supplied through public __boxlabExportAs
(or explicit core option). No second signature owner. Build separate UV index pool by
geometry vertex ID+exact UV pair; continuous corners share UV indices, seams can use
multiple UV indices per geometry vertex. count_uv/uvs/faces_uv reflect this pool.
Existing polygon triangulation retains source-corner UV correspondence; triangles use
same repeated fourth corner. Plain no-UV meshes keep legacy zero-UV layout unchanged.
Known stored UVs with stale topology/incomplete/nonfinite/f32-overflow data or evaluated
SubD/Mirror mismatch refuse with clear error rather than silently dropping UVs. Existing
resolver, geometry/normals/groups/header/template/binary alignment/scene/download flow
remain authoritative and unchanged. Status reports UV-bearing object count.
No native texture/material/layer preservation expansion; this repair writes UVs only.
Four native tests read actual NOM binary UV values/indices/bounds/seams, rotate→project→
actual File NOMAD downloaded bytes, ngons/triangles/shared UV indices/mixed offsets and
invalid/evaluated guards. Donor itself confirms independent count_uv2796 vs2642 vertices.
Full local Node24:2322PASS/0FAIL/0skip, all prior native9 and GLB/UV/history tests retained.
Core865→export panel865 (internal stamp865)→shell/recovery865 graph reviewed; other
owners/protected/frozen bytes retained. User865 PASS accepts the native Nomad UV gate.
Native known-UV/rotated/project→File NOMAD layout and seams accepted by user865 PASS.
Keep separate864 broader history gate and prior863 protections; flip stage now866.

## .864 scope — Rotate imported UVs90°, native NOM roundtrip FAIL (repaired865)
User PASS /nextbuild2026-10-15 protects863 island colours/count, orange seams,
coordinate-vs-topology/Undo and project inspection. Audit mainca84d25e/live863 plus
import797/export741/scene-history/codec858 finds existing imported UV corner channel,
shared read-only payload snapshots and native checkpointSnapshot already sufficient.
First narrow authoring operation adds Rotate UVs90° to existing MeshHealth disclosure.
New imported-uv-edit864 reuses inspector863 guards and native history. Valid complete
independent imported meshes only; locked/reference/linked/Boolean/Array/Curve/stale/
partial/absent UV contexts refuse. Rotate ALL corners90° counterclockwise around tile
centre(.5,.5):[u,v]→[1-v,u]. No per-island selection/unwrap/new-mesh projection yet.
Allocate new UV arrays and shallow replacement glbPassthrough; preserve original payload
and all untouched metadata/images/buffers read-only for duplicates/history. Retire ONLY
old tangentCorners + topology/geometry signatures because old tangents describe prior
UV basis. Native GLB export uses rotated UVs without stale tangents. Existing geometry,
scene/session/export/project owners and resource format remain unchanged. One original
scene checkpoint per changed operation; unchanged central degenerate map no history.
MeshHealth refreshes canvas after click; Close→Undo/Redo→reopen/Refresh shows old/new UVs.
Base UV editing; original SubD/Mirror evaluated-export restrictions remain. No texture
rendering/painting, new channel/kernel/history format or topology-UV propagation claim.
Four native regressions: shared payload/image/metadata independence, real scene Undo/
Redo, codec + actual Three GLB UV attributes/tangent exclusion, guarded/no-op/history
failure cases and actual UI action delegation. Native manager capture clones stored
object mesh normally; live geometry identity/coordinates remain unchanged. Test stale
fixture targets actual live mesh rather than manager's saved clone. Earlier862/863
inspection tests retained. Full validation/publication proof follows below.
MeshHealth864→new edit864→unchanged inspector863; shell/recovery864. All other owner,
protected kernel and frozen beta bytes retained. Next iPad rotate/UndoRedo/file/export
sanity; future UV authoring follows copy-on-write resource boundary and owner audit.

## Protected .863 — user PASS2026-10-15
Protect island count/colours and orange seam outlines, coordinate-only edits retaining
inspection, topology stale hiding→Undo restoration and .boxlab persistence.862/861
protections retained;860 Duplicate/859 resource/Nomad gates remain separately pending.

## .863 scope — read-only UV island/seam diagnostics, accepted2026-10-15
User PASS /nextbuild2026-10-15 protects862 imported UV layout/coverage, stale after
topology edit→Undo recovery, plain no-UV state and .boxlab reopening. Audit main85eb80ef,
live862/shell pins, existing inspection862/import797/export741 and topology helpers:
no UV island/seam analyser exists. Extend SAME imported-uv-inspection/MeshHealth owners.
Diagnostic edge adjacency comes from current face vertex IDs, not coordinates or
mesh.edges() (legacy wrappers can publish live mesh). Shared edges join mapped faces
only when both vertex-aligned UV endpoints are exactly equal. No tolerance welding;
minute deliberate UV splits remain seams. Point contacts, disconnected/overlapping
shells and ambiguous non-manifold/repeated/self edges do not join through those edges.
Union-find builds connected UV islands; a seam can exist within an otherwise connected
island via another path. Missing-UV neighbours count as borders, not invented seams.
Inspector shows island count/colours, seam-edge count and orange UV-side outlines.
Palette cycles six colours; colours do not identify material/groups or promise every
island a unique colour. Grey0–1 tile/fit/stale guard and original20000-corner preview
budget remain. Full channel connectivity is analysed even when preview is limited;
orange segments only for previewed faces, bounded by same corner budget. No viewport
frame/gesture work. No new editable channel/seam flags/kernel/history/resource version;
UVs unchanged and no overlap/distortion/unwrap/painting/evaluated-modifier claim.
Four new native tests: continuous/reversed/split/point-touch/disconnected layouts,
missing/ambiguous/bounded/stale data, actual GLB import→project→export unchanged, no
legacy edges() call, deterministic colours/orange sides. Original862 tests retained.
Full local Node24:2314PASS/0FAIL/0skip. User863 PASS accepts the visual/colour/seam gate.
MeshHealth863→inspection863/shell+recovery863 reviewed; other owners/protected/frozen
betas unchanged. Next iPad known seamed GLB/coordinate edit vs topology edit/Undo/file
sanity; then staged UV channel/authoring design after topology/history/resource audit.

## Protected .862 — user PASS2026-10-15
Protect imported UV coverage/base outlines, stale-topology hiding and Undo recovery,
plain-mesh no-UV state and .boxlab reopen. Existing exporter topologySignature remains
authoritative, resources remain read-only, inspection adds no Undo.861 protections and
separate860 Duplicate/859 resource/Nomad gates retained; no additional PASS inferred.

## .862 scope — imported UV inspection in existing Mesh Health, accepted2026-10-15
User PASS /nextbuild2026-10-15 protects861 rotated/nonuniformly scaled LiveArray
count/END Apply→Edit Source Apply/Cancel/history/project reopen. Separate860 Duplicate
and859 imported-resource/Nomad gates are not inferred. Audit current main5599eea7,
importer797 corner UV/reconstruction, exporter741 topologySignature and MeshHealth443:
UV storage/export exists; no imported UV layout UI exists. Reuse existing Object radial
Mesh Health launcher/session/Refresh/Close with collapsed Imported UVs disclosure.
New read-only imported-uv-inspection862 consumes original glbPassthrough.uvCorners and
calls the EXPORTER'S existing topologySignature through __boxlabExportAs. No duplicate
signature/model/kernel/channel/history owner. Missing/stale/invalid/unavailable states
are explicit; stale preview hidden, stored resources untouched. Ready view reports mapped
faces/missing/outside0–1 corners; cyan base-face outlines, grey0–1 square, fitting tiled
coordinates. Preview drawing capped20000corners with displayed-face count if limited;
statistics inspect all faces. Canvas draws only on open disclosure/explicit Refresh,
not viewport frames. SubD/Mirror evaluated UV export, islands/overlap/distortion analysis,
unwrap/painting/textures/UV editing are NOT implemented. Imported base channel only.
Four native regressions: actual GLB import/export and codec roundtrip, immutable payload,
export-owner topology/facegroup parity, malformed/missing/partial/stale channels, tiled/
extreme finite coordinates/bounded drawing, actual MeshHealth launch/toggle/Refresh/
close/context exit without history writes. Full local2310PASS/0FAIL/0skip. Browser visual
QA unavailable: Playwright Chromium download returned truncated archive; actual iPad
canvas/layout accepted by user862 PASS2026-10-15; no automated browser-render proof claimed.
MeshHealth862→new inspection862/shell+recovery862; all previous owners/protected/frozen
betas unchanged. Reviewed contract updates only these bytes/pins and new child reference.
User862 PASS accepts known-UV/plain/stale-after-edit/Undo and Save/Open sanity.
Island/seam inspection now863; continue staged UV/resource work after its device gate.

## Protected .861 — user PASS2026-10-15
Protect whole-array arbitrary rotation/nonuniform scale, repeated count/END Apply,
Edit Source Apply/Cancel with SubD, UndoRedo and .boxlab reopen. Strict external matrix
validation and existing non-affine component refusal remain intact. No other pending
build gate inferred from this PASS.

## .861 scope — internally inferred affine placement, accepted2026-10-15
Continued from current main697a9fa9/.860 after repository/owner audit. Baseline2303PASS;
live860 shell/manifest matched. Reproduced original array (no Duplicate): arbitrary XYZ
rotation/nonuniform scale→count/END Apply→reopen produces inferred placement[15]
1.0000000000000002, then strict recipe creation/source editing refuses.
Only reopenArray in existing live-array-core canonicalizes internally derived affine
bottom row to0/0/0/1 after finite and32*Number.EPSILON tail checks. Existing external
arrayTransforms/project codec validation stays exact; non-affine component refusal and
protected instance343 unchanged. No new kernel/history/gesture/render/recipe version.
Three native tests cover repeated placed count/END edits/shape/project roundtrip, actual
Array Apply→source Cancel/Apply→UndoRedo with SubD, and strict malformed external/file
refusal plus unchanged-source/non-affine edit refusal. Prior860 duplicate gates retained.
Core861 and all three import graphs refreshed: Array861→source-editor861→source-core861;
codec861→management861→drawer861; shell/recovery861. Other owners/frozen betas retained.
Three literal Array cache assertions advanced861; reviewed contract changes only to
these loaders/bytes. Full validation and publication evidence recorded below.
User861 PASS2026-10-15 protects the rotated/scaled Array source/history/file gate.
860 duplication and859 resource/Nomad gates remain separately pending. Imported UV
inspection is now862; continue after its device checks and authoritative-owner audit.

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
strict arrayTransforms refuses subsequent source reopen. Resolved by861;860 tests
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
.884 implements FIRST native colour-image stage using the user's textured NOM donor.
Test File→NOMAD with ONE opaque embedded-image material/UV0/default repeat sampler,
SubD off: image/UV orientation, Pencil edit repeat, project reopen and plain meshes.
Normal/roughness/displacement image maps and native per-face materials remain pending.
883 GLB exact-material device gate separate;882 active-only preview PASS protected.
Donor schema blocker is superseded by provided sample; native visual acceptance still
requires iPad feedback. Do not interpret uploaded donor as883/884 PASS.

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


## .861 local validation — 2026-10-14

Full native Node24 regression:2306PASS/0FAIL/0skip. Three new native affine reopen
checks and all prior semantic coverage pass. Reviewed cache contract/shell markers
coherent; protected Multi1.0/instance343/frozen beta files untouched. Publication
CI/Pages/live verification pending; device gates not inferred.


## .861 publication verified — 2026-10-14

Releasef36b216a9c272a024e64f773279157858698cab2; tested tree
c94fbe5d4dd85b79ca536df549c190f8931b2f3a exactly matches fetched main.
Node22 CI38556571969/job115827100089 SUCCESS2306PASS/0FAIL/0skip.
Pages38556564998 build/deploy SUCCESS. Fresh postdeployment live shell/manifest,
core861/Array861/source-core861/source-editor861/codec861/management861/drawer861,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial asset reads
preceded completed deployment; complete postdeployment verification matches861.
All four handoff files current; device861 gate pending,860 duplicate and859 imported
resource/Nomad gates remain separately pending. No new user PASS inferred.


## .862 publication verified — 2026-10-15

Release47767d31bdcb54e23493fbe4a40adc4597592c1c; tested tree
e0fe02a94a7be968f147ff487e4c616c480aab65 exactly matches fetched main.
Node22 CI38658512748/job116173915714 SUCCESS2310PASS/0FAIL/0skip.
Pages38658512404 build/deploy SUCCESS. Fresh live shell/manifest, MeshHealth862/
inspection862 and protected Multi1.0/frozenBeta7 version byte-match repository.
861 user PASS protected;862 iPad layout/UV/stale-Undo/project checks pending. Separate
860 Duplicate and859 Nomad/resource gates not inferred. Four handoff files current.


## .863 publication verified — 2026-10-15

Release406cfd1f37ca9ab3e5eccaf7a6dd0c1ad59579ce; tested tree
3a8b20c62f2c5c86c3b3ea4d91135761ec46960b exactly matches fetched main.
Node22 CI38662867643/job116187970520 SUCCESS2314PASS/0FAIL/0skip.
Pages38662867413 build/deploy SUCCESS. Fresh live shell/manifest, MeshHealth863/
inspection863 and protected Multi1.0/frozenBeta7 version byte-match repository.
862 user PASS protected;863 iPad island/seam/coordinate-vs-topology/Undo/project gate
pending. Separate860 Duplicate and859 resource/Nomad gates not inferred. All four
handoff files current; no new authoring/channel/kernel/history owner.


## .864 local validation — 2026-10-15

Full native Node24 regression2318PASS/0FAIL/0skip, including four new UV authoring
checks and unchanged862/863 inspection coverage. Reviewed shell/cache graph coherent;
protected/frozen files unchanged. Device864 UV rotate/history/project/export gate pending.
Publication CI/Pages/live proof follows after verification.


## .864 publication verified — 2026-10-15

Releasec84b5c1b48034be7e597459c9c276e6d51df0dd7; tested tree
55358c7e8530028e071d44fbb502f01735e94ad6 exactly matches fetched main.
Node22 CI38664362797/job116192739572 SUCCESS2318PASS/0FAIL/0skip.
Pages38664361873 SUCCESS. Postdeployment live shell/manifest/MeshHealth864/edit864,
unchanged inspector863 and protected Multi1.0/frozenBeta7 version byte-match repository.
Initial reads preceded deployment; final complete graph matches864.863 user PASS
protected;864 iPad rotation/history/project/BaseGLB→Nomad gate pending. Separate860/859
gates not inferred; all four handoff files current. No geometry/kernel/schema changes.


## .865 publication verified — 2026-10-15

Releaseb080c811a3b4e901b4a360fb314f63adc38034de; tested tree
d548e4c2ff0bf1765933cbec32a9b511e6a06502 exactly matches fetched main.
Node22 CI38665811583/job116197395797 SUCCESS2322PASS/0FAIL/0skip.
Pages38665810713 build/deploy SUCCESS. Postdeployment live shell/manifest/export-panel865/
native-core865 and protected Multi1.0/frozenBeta7 version byte-match repository.
Initial reads preceded deployment; final complete graph matches865. Native Nomad UV
layout/seam device gate pending;864 FAIL recorded specifically on File NOMAD.863 PASS
retained; no native texture/material claim or new device acceptance inferred. Four
handoff files current; frozen donor/protected geometry owners unchanged.


## .866 publication verified — 2026-10-15

Release8186bf45691bed9b173d8db1af5033c136edec34; tested tree
cb39f28fdef41a49b0cb8bee2a05747cf3db611d exactly matches fetched main.
Node22 CI38676132706/job116230036867 SUCCESS2326PASS/0FAIL/0skip.
Pages38676132006 SUCCESS. Postdeployment live shell/manifest/MeshHealth866/edit866,
unchanged inspector863/export-panel865/native-core865 and protected Multi1.0/frozen
Beta7 version byte-match repository.865 native UV roundtrip user PASS protected;866
flip/history/project/native-export device gate pending. All four handoff files current;
no new device PASS inferred and no native schema/exporter/geometry changes.

## .868 publication verified — 2026-10-15

Release984c33265abc3118eb978121dac91737c8ac272c; tested tree
eebfa006c906772b0cfb8773e1dd9fe5541fbea1 exactly matches fetched main.
Node22 CI38696478096/job116294097328 SUCCESS2337PASS/0FAIL/0skip;
Pages38696477599 SUCCESS. Live shell/version/MeshHealth/workspace/navigation/
inspector/edit868, unchanged native865, protected Multi1.0 and frozenBeta7 marker
byte-match repository. User867 PASS protected;868 island selection device gate
pending. No selected-island transforms or new UV/history/resource/export schema.

### .869 final scope-label correction

Final source review caught a text replacement also changing the no-selection label;
whole-layout maths stayed correct. Restore explicit whole-layout label when cleared,
add actual workspace assertions at open/clear and refresh only MeshHealth/workspace
cache keys to869.1 (shell/version869; internal MeshHealth stamp869). No new user PASS.

## .869 publication verified — 2026-10-15

Final release312e030d95bd582dcd641b1835ba13f77ef93e74; tested tree
b72f182c44f1cfbf61d686e4dbf9ceaaf8f74970 matches fetched main. Node22 CI
38724621405/job116387284480 SUCCESS2341PASS/0FAIL/0skip; Pages38724621331
SUCCESS. Live shell/version869, MeshHealth/workspace869.1, edit/inspector869,
nav868/native865/protected Multi1.0/frozenBeta7 marker byte-match repository.
Final label correction included;868 user PASS protected.869 selected-island edit,
UndoRedo and project/native Nomad device gate pending. Repeated /nextbuild during
publication continued the active release; no869 PASS or later build is inferred.

## .871 publication verified — 2026-10-16

Release bb0191af0c7ee0266d95662b1ec2073f9eb12224; tested tree
7d6ea21850ddeb29b9a4189cd25c5ba2cfa5b1d0 exactly matches fetched main.
Actual Node22 CI38818127353/job116707802378 SUCCESS2349PASS/0FAIL/0skip;
Pages38818126928 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth871/workspace871/edit871/inspector871, unchanged navigation868,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial live reads
preceded deployment and returned870; final complete graph matches871. All four
handoff files current. User870 PASS protected;871 Pencil feel/navigation/history/
project/native-export device gate pending. Scale remains numeric under Exact;
Pencil Scale/Rotate follow feedback, no871 user PASS inferred.

## .872 publication verified — 2026-10-16

Release bbb8efdfa00b6ccc073400a9f36339fdb1c8808f; tested tree
9a4a162fa38eaff472a1596fdc1204a612dc6ea8 exactly matches fetched main.
Actual Node22 CI38823964047/job116726929368 SUCCESS2353PASS/0FAIL/0skip;
Pages38823962841 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth872/workspace872/edit872/inspector872, unchanged navigation868,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial live reads
preceded deployment and returned871; final complete graph matches872. User871 PASS
protected;872 Pencil Scale/navigation/history/project/native-export device gate
pending. All four handoff files current; Pencil Rotate next after feedback.

## .873 publication verified — 2026-10-16

Release 0087d2cbe3d8fd00d586619ebd890c0f4668e4a9; tested tree
015ab6da6fb23c90e3a9c1924faac9fac1f39927 exactly matches fetched main.
Actual Node22 CI38826931252/job116736445051 SUCCESS2357PASS/0FAIL/0skip;
Pages38826931247 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth873/workspace873/edit873/inspector873, unchanged navigation868,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial live reads
preceded deployment and returned872; final complete graph matches873. User872 PASS
protected;873 Pencil Rotate/navigation/history/project/native-export device gate
pending. All four handoff files current; next UV-authoring stage needs owner audit
and873 feedback. No new unwrap/new-mesh channels/painting or device PASS inferred.

## .874 publication verified — 2026-10-16

Release 594de3e95bb49dccc8484be92030f6d80fe9ad7a; tested tree
46c868ca785f9dc84744606f3345fd2becd14839 exactly matches fetched main.
Actual Node22 CI38852645045/job116817062661 SUCCESS2361PASS/0FAIL/0skip;
Pages38852644283 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth874/workspace874/edit874/inspector874, unchanged navigation868,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial live reads
preceded deployment and returned873; final complete graph matches874. User873 PASS
protected;874 fit/aspect/isolation/history/navigation/project/native-export device
gate pending. All four handoff files current; next native UV-channel/projection stage
requires owner audit and874 feedback. Selected fit does not pack multiple islands.

## .875 publication verified — 2026-10-16

Release 6272110710d0a590c701d9c587c4cee3e6d12fdd; tested tree
66fd86f936273230409adf6bb56e1e88a80b5b55 exactly matches fetched main.
Actual Node22 CI38857230889/job116831332240 SUCCESS2368PASS/0FAIL/0skip;
Pages38857230399 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth/edit/manager/codec/resource/management/drawer875, unchanged workspace874,
GLB/native exporters865, protected Multi1.0 and frozenBeta7 version byte-match
repository. Initial live reads preceded deployment and returned874; final complete
published graph matches875. User874 PASS protected;875 native Planar/editor/history/
project/native Nomad device gate pending. All four handoff files current. Native
resource v3/sourceboxlab is explicit; no seam unwrap/painting/evaluated UV claim.

## .876 publication verified — 2026-10-16

Release 51e05f4cdccce9765ed3c3840680b19c520deb74; tested tree
88afe5f38e4c0f1d853752c6b927ecc54591165f exactly matches fetched main.
Actual Node22 CI38861934472/job116845958125 SUCCESS2373PASS/0FAIL/0skip;
Pages38861934138 build/deploy SUCCESS. Fresh live shell/manifest, MeshHealth/edit876,
unchanged workspace874/GLB+native exporters865/protected Multi1.0/frozenBeta7 version
byte-match repository. Manager/codec/resources875 and all protected/frozen owners
unchanged. User875 PASS protected;876 Box panels/selected edits/history/project/
NOMAD Base device gate pending. All four handoff files current. No general seam
unwrap/optimal packing/painting/evaluated UV claim; directional patches may overlap.

## .877 publication verified — 2026-10-16

Runtime release `e1d5ccffd03941b982df25d9463de9b0746e5e4a`; tested tree `c872ec647f8a7188f227d48c6cfc5459237a4328` matched fetched main exactly. Actual Node 22 topology CI run 38865991906 / job 116858835631 succeeded: **2378 PASS / 0 FAIL / 0 skipped**. Pages run 38865990703 build and deploy succeeded. Fresh live shell, manifest, Mesh Health/edit/GLB panel .877, unchanged UV workspace .874, native NOM core .865, protected Multi .1.0, and frozen beta-7 version all byte-matched repository files.

User .876 PASS remains protected. The .877 device gate remains pending: upright round world-Y Cylinder UVs, independent Pencil edits, Undo/Redo, project persistence, NOMAD Base and native GLB seam checks. No general unwrap, elliptic mapping, painting, or evaluated-modifier UV claim. All four continuity documents are current.

## .878 publication verified — 2026-10-16

Release `7b7cf2751e371959437a6ad10601c930f727a64d`; tested tree `ef9e7b6005166f3c6e38eb93830963f11f513e36` exactly matches fetched main. Actual Node22 CI38867402179/job116863294620 SUCCESS **2381 PASS / 0 FAIL / 0 skipped**; Pages38867401881 build/deploy SUCCESS. Fresh live shell/manifest, MeshHealth/workspace/inspector/edit878, unchanged GLB panel877/protected Multi1.0/frozenBeta7 version byte-match repository. Native NOM865, manager/codec/resources875/nav868 and protected modelling owners unchanged. All four continuity documents current. User877 PASS protected;878 checker readability/navigation/Pencil/history/reopen device gate pending. This checker is a 2D reference only; 3D texture/stretch inspection remains the next audited stage.

## .879 publication verified — 2026-10-16

Release `6b20c3939a9ebe7b9847fdc0830adb565fd0a1ba`; tested tree `794865b855df33763e91136e5421b4933569507a` exactly matches fetched main. Actual Node22 CI38870113315/job116871955152 SUCCESS **2386 PASS / 0 FAIL / 0 skipped**; Pages38870112481 build/deploy SUCCESS. Final fresh live shell/manifest/render-owner/preview-child/export-panel879, unchanged workspace878/native NOM865/protected Multi1.0/frozenBeta7 version byte-match repository. Initial reads preceded deployment (old878/child404); final full graph matches879. All four continuity docs current. User878 PASS protected;879 surface checker/navigation/UV edit→session-exit/history/look-restoration device gate pending. Stored Base UVs only; unsupported/stale/over20k-corner objects use Solid; no painting/evaluated UV propagation claim.

## .881 publication verified — 2026-10-16

Runtime release00be7829f43feafddb262d63de6b81c6e7fea8c9; tested tree
ccf22e986663736321186a41f38a655a8b33e303 exactly matches fetched main.
Actual Node22 CI38886425246/job116925168650 SUCCESS2396PASS/0FAIL/0skip.
Pages38886425248 build/deploy SUCCESS. Postdeployment live shell/manifest/render881/
new image surface child881, unchanged image decoder880/MeshHealth880, protected
Multi1.0 and frozenBeta7 version byte-match repository. Predeployment reads served880;
final full graph matches881. All four continuity documents current. User880 PASS
protected;881 active-image orientation/Pencil→surface/history/look-restoration device
gate pending. One active opaque embedded material only; mixed materials/inactive/
unsupported Base contexts use Solid. No painting or persistent material/export change.
Shell git has no HTTPS credentials; connected Git Data publication used expected-main
SHA lease and verified blob/tree hashes. Documentation-only verification follows runtime
release without changing tested assets. No881 device PASS inferred.

## .882 publication verified — 2026-10-16

Runtime releasea00022aafa3914a422e172d48f8de1e47b0c0950; tested tree
d5b9204dae40414e860399795f0a7b0bbe9be233 matches fetched main exactly.
Node22 CI38889866338/job116936462977 SUCCESS2402PASS/0FAIL/0skip.
Pages38889865865 build/deploy SUCCESS. Postdeployment live shell/manifest/importer/
export-panel/render/image-surface882, unchanged decoder880, protected Multi1.0 and
frozenBeta7 version byte-match repository. Initial live reads preceded deployment;
final full graph matches882. User881 PASS protected;882 fresh multi-material import/
UV edit/history/project device gate pending. All four continuity files current.
Connected Git Data used expected-main SHA and exact tested blob/tree hashes; final
documentation proof changes no runtime bytes. No882 device PASS inferred.

## .883 publication verified — 2026-10-16

Runtime7a601596261f3ea3c6085b6558c1fcc3f6d924c6; tree480f1d18a623d42c7cc20d75aae038ef2b45b7b2
matches fetched main. Node22 CI38896510322/job116958154004 SUCCESS2407PASS/0FAIL/0skip.
Pages38896509328 build/deploy SUCCESS. Final live shell/manifest/export-panel883,
unchanged render/importer882/native-core865/protected Multi1.0/frozenBeta7 marker
byte-match883 repository. Predeployment/time-out reads were retried after deployment.
Native donor arrived during verification;884 continues the authorized native repair.
No883 device PASS inferred; original native texture omission is separate from GLB fix.
