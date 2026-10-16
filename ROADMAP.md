# BoxLab Development Roadmap

This is the persistent product roadmap for BoxLab.

The repository is the source of truth. Keep this file aligned with `AI_HANDOFF.md`, `DEV_HISTORY.md`, and `TEST_CHECKLIST.md`.

## .887 — large native colour image / project validation repair, 2026-10-17

User reports885 FAIL; screenshot explicitly shows886 and native File NOMAD refusing
at generic colour-material guard. This supersedes earlier885 PASS for the supplied
FULL MATERIAL case; prior smaller accepted colour/normal/emissive/UV behaviour remains
protected. Audit main44dca980/live886/pins; original importer parses supplied
FULL MATERIAL.glb SHA256a68dbedf6cfa49efcfd3b5a86c0a599d5502410e7235913ff482790e24b1419d.
Exactly one OPAQUE material, alpha1, UV0, default sampler, no material extensions.
Colour PNG11,121,601B fails shared preview's8MB encoded guard. Reproduced same error
with ACTUAL retained importer payload before change; no alpha/material-format guess.

Shared embeddedUVImage takes optional maxBytes, default8MB and capped24MB; existing
choices/surface resolver forward caller policy. ONLY native colour/normal/emissive
byte-copy path opts into24MB. Existing native24MB unique-image aggregate remains exact;
packed source/derived images remain8MB and≤2048² conversion. UV Editor and active surface
preview still enforce8MB/default1024² decode, including large-image Solid/no-image
fallback. No new decoder/material/UV/signature/history owner, downscale/reencode or
change to unsupported material/sampler guards. Original native layout/UV/header/slot/
image-dedup/download owners retained. This is a byte-copy budget repair, not added RAM
for display textures or blanket PBR/opacity/displacement support.

New large-resource test also reproduces RangeError Maximum call stack size exceeded
in ORIGINAL project-glb-resources.decodeBytes repeated-group base64 regex. Replace
only grammar validation with expected padding from decoded byteLength and a flat
invalid-alphabet search; original byte length, atob→btoa canonical check,24MB pool,
resource versions1/2/3,32MB project Open and legacy compatibility retained. No new codec
or looser malformed-padding/unused-bit acceptance. Actual Open handler + large shared
pooled file now passes; inline large resource and selected UV→native repeat pass too.

Four native tests use metadata-only reported fixture + synthetic same-length bytes:
exact11,121,601B native colour/normal/emissive output and preview rejection;24MB boundary,
shared-slot/object dedup/aggregate/packed-budget guards; selected UV/resource/ACTUAL File
NOMAD downloads; pooled .boxlab ACTUAL Open and strict invalid/valid base64 cases.
Full local2428PASS/0FAIL/0skip. Extra ACTUAL user-file audit: original importer/Three
geometry conversion→native cube6faces/1UVobject/5images,16,310,924B file, all colour/
normal/emissive hashes identical to source. Node geometry-loader copy strips image refs
only; original retained resources go to writer. Packed JPEG split in this offline audit
uses Pillow G/B, so browser conversion/Nomad appearance still needs device confirmation.
Actual full5-image pooled resource roundtrip25,750,555B encoded /19,307,670B decoded
retains ALL five image bytes, including unused displacement. No private pixels shipped.

Latest native donor FULL MATERIAL EXPORT(1).nom SHA25689170a6ecc5427413069ad9902c1b0c128ee17ad7136e8737a28be324196e47c
adds textures.opacity index4,417,303B PNG, factorOpacity1/use_color_opacity1; material
stillopaque. GLB meshExtras.nomad has NAME-ONLY displacement/opacity slots and factors;
displacement texture/image3 is unreferenced by core glTF material; opacity named image
is absent. Metadata fixture records this; audit explicit binding/semantics in a later
stage, never assign by image filename alone. No opacity/displacement implementation887.

Reviewed887 cache graph: export-panel→packed-child→native-core→surface/image-helper;
render→surface; MeshHealth→workspace→image-helper; drawer→management→project-codec→
resource helper (also direct management shell entry). Existing internal stamps retained
except export-panel887; all corresponding parent URLs/hash contracts reviewed. Importer882,
UV maths/inspector880/nav868, manager875, protected Multi1.0/native donor/modelling and
frozen betas unchanged. All four continuity docs updated; publication proof follows.
Device887: supplied FULL MATERIAL.glb, SubD off→File→NOMAD must download/open; colour,
normal/emissive/roughness/metalness slots intact; UV edit→export and .boxlab Save/Open→
export repeat. Native visual gate remains pending; do not infer PASS from file upload.
Next: this exact-file retest before advancing opacity/displacement/native multi-materials.

## .886 — native roughness + metalness from packed GLB maps, 2026-10-16

User .885 PASS /nextbuild protects native normal/emissive slots, strengths, alignment,
UV edit repeat and project reopening, alongside accepted .884 colour and .865 UVs.
Audited current main25412b5c/runtime9154caaa and live .885 markers/owners. Original GLB
resources retain pbrMetallicRoughness.metallicRoughnessTexture; no channel conversion
exists. Full donor885 proves separate textures.roughness/metalness and factorRoughness/
factorMetalness. No filename inference, new modelling/material/history kernel or schema.

New small nomad-packed-maps child performs export-local preparation, then delegates
ORIGINAL native writer. Shared nativeMaterialMaps guard now recognizes the packed ref
with the same single opaque material, embedded PNG/JPEG UV0, default repeat/linear
sampling and finite factors. Green→roughness, blue→metalness per official glTF2 spec;
no red/occlusion reuse, luminance conversion, factor baking, gamma maths or Y flip.
Original dimensions retained: at most2048×2048, 8-bit source. Header inspection bounds
BEFORE bitmap decode; 16-bit PNG, EXIF/eXIf orientation metadata and translucent decoded
pixels refuse clearly. Browser createImageBitmap uses colorSpaceConversion:none and
premultiplyAlpha:none, then canvas produces opaque grayscale PNGs. OffscreenCanvas or
original DOM canvas/toBlob fallback; bitmap close and scratch canvas reset in finally,
including encode/decode failure. No preview-thumbnail decoder changes. Original colour/
normal/emissive images stay exact encoded bytes. Full donor's relevant JPEGs are2048²;
its16-bit displacement is a distinct unsupported source, not treated as packed PBR.

One conversion per shared encoded buffer per export. Derived PNGs exist only within
this download, never source/project/history payload. Same native image-table alignment,
byte-identity dedup and≤8MB/image /24MB aggregate guards. Native factorRoughness and
factorMetalness carry source scalar factors (default1); native slot/header7/mesh/UV/
facegroup owners retained. Synchronous core refuses unprepared declared packed maps,
never silently omits them. Async facade captures mesh/settings and read-only payload
BEFORE any await so ongoing scene edits cannot mix UV/geometry states. Plain/no-packed
output remains byte-identical; existing File NOMAD download owner reports both map
counts. Existing GLB/OBJ and surface preview/import/resource/editor math unchanged.

Seven new regressions cover actual G/B pixel arrays→distinct valid PNG bytes (inflate+
CRC), donor slots/factors/native geometry+UV byte identity, all five core maps together,
shared source conversion once across objects, selected UV/project continuity, in-flight
snapshot isolation, source/sampler/UV/factor/size/budget refusals, bitmap/canvas cleanup,
JPEG header/metadata guards, DOM canvas fallback and ACTUAL File NOMAD downloaded bytes/
status/failure recovery. Browser transport is adapted in Node; no browser/Nomad rendering
proof claimed. Prior735/865/884/885 action fixtures now supply real async facade, retaining
all their semantic assertions. Full local2424PASS/0FAIL/0skip; publication proof follows.

Reviewed cache graph: shell/recovery/export-panel886→packed-child886→native-core886;
core→unchanged surface/image885. Render/MeshHealth/workspace885, importer882, UV edit/
inspector880/nav868, Multi1.0, native donor and all modelling/frozen beta bytes unchanged.
Device886: one-material GLB with packed roughness/metalness (≤2048²), SubD off→File→NOMAD:
separate Roughness/Metalness slots, expected glossy/matte and metallic regions; existing
colour/normal/emissive intact; Pencil UV edit and .boxlab Save/Open→export repeat.
Next:886 device feedback, then audit actual source binding for displacement or native
multi-material schema before claiming either. No native NOM import or painting added.

## .885 — native normal + emissive maps from full donor, 2026-10-16

User .884 Perfect PASS protects native colour image visibility/alignment, Pencil UV
edit repeat and project reopening. User requests other maps and supplies FULL MATERIAL
EXPORT.nom, SHA256dc9102c6eb38ea95e4d7705b0d2fe89eb58cf0c1248c35f2cce35a2a15cf8685.
Audit current main3cd0d5ae/native884, full material donor and retained GLB resources.
Donor revision7 confirms slots color/normal/emissive/roughness/metalness/displacement,
same image descriptors/texture projection/samplers; normal_neg_y=false, factorNormal,
factorEmissive and factorEmissiveStrength observed. Only metadata/provenance fixture
committed, not user's large file/images.885 scope: normal+emissive can transfer exact
encoded bytes. Roughness/metalness packed G/B conversion and displacement source
channel identification remain separate; never guess from retained image filenames.

Reuse original image resolver: extract embeddedUVImage from unchanged880 choice rules,
with importedUVImageChoices delegating same exact PNG/JPEG/UV0/mime/≤8MB checks. Same
renderer/decoder lifecycle/math retained. Extract uvImageMaterialSource from original
surface helper for shared single-used opaque/material factor checks; original colour
surface API delegates it and retains original sampler/image policies. No parallel
material/UV/signature/history/picking owner. Only parent import URLs change for UV
workspace/MeshHealth/render, preserving old internal MeshHealth stamp880 deliberately.

Extend ORIGINAL synchronous native writer's884 local image table/material links for
normalTexture→textures.normal, emissiveTexture→textures.emissive. No decode/reencode,
gamma conversion or resampling. Match Base UVs, source UV0/PNG/JPEG/no transforms,
default repeat+linear mipmap sampler and one opaque material. Explicit source normal
scale→factorNormal (finite f32/nonnegative); native normal_neg_y=false matches donor/
glTF convention. Source emissiveFactor→factorEmissive (defaultblack), native strength1.
HDR/material extensions remain refused. Normal/emissive-only materials do not require
fake colour image; base RGB factor supplies constant colour. Existing colour-only/plain
flow retained. Source images shared read-only, byte-identity dedup across slots/objects,
existing≤8MB per image/24MB aggregate. Whole export refuses unsupported declared normal/
emissive refs rather than dropping them. Original geometry/UV bytes/field offsets/native
revision7/donor/header/download owners retained. Status adds normal/emissive map counts.

Five native tests cover donor slot descriptors/raw PNG+JPEG bytes/normal strength/
emissive RGB/defaults, normal-only/emissive-only input, shared-image dedup/material
links/counts, unsupported image/UV/transform/sampler/factor/aggregate guards, selected
UV+project continuity and ACTUAL File NOMAD downloaded bytes/status. All880–884 checks
retained. Full local2417PASS/0FAIL/0skip. Additional real donor audit exported actual
1,248,872-byte normal JPEG and2,754-byte emissive PNG, both original hashes matched.
No browser/Nomad appearance proof claimed. Original .884 colour PASS protected.
Reviewed885 cache graph: export-panel→native-core→surface/image helper; render→surface;
MeshHealth→workspace→image helper. Inspector/edit880/nav868/importer882/native baseline
donor/protected modelling/frozen betas untouched. Publication proof follows.

Device885: one-material GLB containing normal/emissive maps, SubD off → File→NOMAD:
Nomad Material Normal/Emissive slots populated, bump detail/emission factor correct;
Pencil UV edit→export repeat; .boxlab Save/Open→NOMAD; accepted colour map retained.
Next narrow stage after feedback: unpack glTF metallicRoughnessTexture GREEN→roughness,
BLUE→metalness with bounded browser conversion; native slot layout now proven by donor.
Reference: Khronos glTF2.0 Specification additional textures/material metallic-roughness,
https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html . No direct copy of packed RGB
image into scalar slots, no invented displacement reference, no native multi-material
support or Nomad import claim. Keep885 device gate separate from883 GLB export gate.

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

## Previous direction — .866 imported UV flips, 2026-10-15

865 native File NOMAD UV gate user PASS protected. Extend existing imported UV edit
owner with Flip U/V beside Rotate; common transaction/guards/copy-on-write/history and
stale tangent retirement. Whole layout about tile centre, no per-island/unwrap feature.
Full2326PASS/0FAIL; four native history/resource/project/GLB/NOM/seam/UI tests, original
rotate/native export tests retained. Device flip/UndoRedo/project/native export pending.
Native865 writer/protected/frozen bytes unchanged; next small authoring step after
feedback and authoritative UV/history/resource/export owner audit.

## Previous direction — .865 native File NOMAD UV repair, 2026-10-15

864 FAIL is confirmed on File→NOMAD, separate native path still writing zeros. Existing
native writer now writes stored valid base UVs with independent UV indices at seams,
preserves polygon/triangulation corner mapping and counts UV objects. Stale/invalid/
evaluated unsupported UVs refuse clearly; no-UV legacy geometry unchanged.
Full2322PASS/0FAIL; four actual native byte/UI/rotation/project/seam/guard regressions.
Native Nomad device UV gate pending before more UV feature work.863 PASS remains
protected;864 broad acceptance not inferred. No native texture/material/layer extension.

## Previous direction — .864 imported UV rotation, 2026-10-15

863 PASS protected. First imported-channel authoring operation: Rotate UVs90° in
existing MeshHealth, full valid independent imported layout only. Copy UV arrays and
replace shared payload; one native scene checkpoint, Undo/Redo/project/export reuse.
Old tangents retired, metadata/images shared read-only; geometry unchanged. No new
UV channel/schema/history/kernel or BoxLab projection/unwrap/painting. Four native
history/resource/codec/GLB/guard/UI tests; full2318PASS/0FAIL. Device rotation/UndoRedo/file/export pending.
Next small UV authoring stage after feedback and authoritative resource/topology audit.

## Previous direction — .863 UV island/seam inspection, 2026-10-15

User862 PASS protects imported layout/stale-Undo/project gate. Extend existing inspector
with connected UV island colours/count and orange discontinuous shared-edge seams.
Vertex-ID adjacency/exact UV endpoints, conservative ambiguous-edge handling; no shared
payload mutations/new channel/history/kernel. Preview budget retained, full diagnostics.
Full2314PASS/0FAIL/0skip; four new native GLB/project/export/connectivity/canvas tests.
iPad colour/seam/layout/history/project gate pending.862 and861 PASS protected;860/859
gates remain separate. Next staged editable UV channel/authoring design after existing
topology/history/resource/export audit; no unwrap/painting/overlap analysis claim.

## Previous direction — .862 imported UV inspection, 2026-10-15

User861 PASS protects affine Array source/history/project gate. Existing importer
corner UV and exporter topology owner supply read-only Imported UVs disclosure in
Object Mesh Health. Shows coverage/base outlines/tile0–1/outside corners, hides stale
or malformed data and bounds preview drawing. Existing MeshHealth session owns lifecycle.
Full2310PASS/0FAIL; four native import/export/codec/channel/canvas/UI tests. iPad visual
and stale-edit/Undo/file sanity pending. No unwrap/painting/editable UV owner or evaluated
SubD/Mirror UV export. Next staged UV/resource work after feedback/authoritative audit;
860 Duplicate and859 Nomad gates remain separately pending.

## Previous direction — .861 affine Live Array reopen repair, 2026-10-14

Repository continuation audits860/main/live and reproduces the queued original-array
failure. Existing reopen owner canonicalizes only its internally inferred near-affine
matrix tail within32*Number.EPSILON. Strict external recipe/file validation remains.
Native tests cover repeated arbitrary rotation/nonuniform scale with count/END Apply,
source Apply/Cancel/history/SubD and project roundtrip; component edits still refuse.
Device861 gate pending;860 duplicate and859 Nomad resource gates remain separate.
Next: hands-on placed-array source/history/project sanity, then staged resource/UV
inspection or measured performance after feedback and authoritative-owner audit.

## Previous direction — .860 ordinary Duplicate retains editable Live Arrays, 2026-10-14

859 published/CI/Pages/live verified after direct standing push/publish approval.
Single Duplicate omitted arrayRecipe; Multi captured but dropped it at addMesh. Existing
addObject now deep-copies serialized recipe; both original duplicate owners forward it.
One independent editable array per copy, native count/END/source/subdivision/file owners
retained. Three native tests cover independent source/parameters, placement/Move/settings,
mixed grouped Multi, count/END Apply, source Cancel/Apply/edit UndoRedo and native project
replacement. Device860 gate pending;859 Nomad duplicate visual gate not yet accepted.
Next: proven existing affine-tail rounding in reopenArray after arbitrary-angle/nonuniform
placement+count/END edits can give[15]=1.0000000000000002 and refuse source reopen. This
also reproduces on original without duplication; repair native recipe owner separately,
retain strict external-transform/file guards and protected instance kernel.

## Previous direction — .859 imported resources through ordinary Duplicate, 2026-10-14

858 user PASS protects imported-resource pooled/legacy .boxlab Save/Open/export.
Audit found ordinary single and Multi Duplicate drop glbPassthrough. Pass read-only
payload through existing manager/addMesh; geometry remains independent, buffers shared.
Native tests cover both owners, mixed/group Multi and Move, delete/UndoRedo, pooled
project replacement and actual GLB UV/material/image bytes with topology safety retained.
Device duplicate→move→Save/Open→Nomad gate pending. Linked-rich project restriction
unchanged; no new history/render/export/texture editor. Next scoped resource work or
imported-UV inspection after feedback and audit of authoritative owners.

## Previous direction — .858 shared project image pool, accepted 2026-10-14

857 SubD Apply accepted.856 imported objects repeat shared image bytes in project JSON.
Existing codec now pools identical bytes once, with per-object metadata and validated
resource-v2 references. New decoded buffers shared read-only; legacy856 inline/plain
files preserve exact Open roundtrip. Full2297PASS/0FAIL.32MB file/24MB unique pool limits.
User858 PASS protects imported multi-object resources/legacy-open gate. No rendering or
texture editing change; next narrow resource stage after feedback.

## Previous direction — .857 SubD Live Array editing repair, 2026-10-14

User856 LiveArray+SubD edit error: universal guard wrongly rejects existing recipe base
geometry. Existing Array/source owners now allow existing Live Array SubD edits and
retain modifier settings, native recipe/history. New Live creation with SubD and Mirror
remain restricted. Full2293PASS/0FAIL, native Apply/Cancel/source/history/codec coverage.
User857 Apply/SubD works after suspected asset refresh; protect it. Source/reopen
checks and856 resource-file gate remain separately pending.
No modelling/render kernel change. Resume resource stage after feedback.

## Previous direction — .856 imported GLB project resources, 2026-10-14

855 PASS protected. Existing .boxlab v1 adds optional versioned imported GLB payload;
canonical binary image encoding, UV/material/metadata preservation, validated native
Save/Open/atomic replacement,32MB file limit. Plain v1 unchanged. Full2290PASS/0FAIL.
Device GLB→.boxlab→Open→GLB→Nomad gate pending. Linked imported GLB and other resource
owners still refuse; texture editing/UV unwrap/pool dedup not implemented. Next scoped
resource validation/pool stage after acceptance, retain accepted history/Loop/optimisation.

## Previous direction — .855 imported GLB scene-history resources, 2026-10-14

854 PASS protected; resume project-resource foundation. Existing imported glbPassthrough
was dropped by scene snapshots/restoration. Carry read-only payload through existing
history, share image buffers, require copy-on-write for future resource edits.
Full2285PASS/0FAIL; native History + UV/metadata/material/image export byte checks.
User855 PASS2026-10-14 protects imported delete/UndoRedo/export. Rich .boxlab remains refused;
resource-aware encode/open is next scoped stage, not silently enabled by this change.

## Previous direction — .854 native Loop completion, 2026-10-14

853 user PASS protected. Replace internal Undo/Redo clicks with existing main slide
cleanup exposed through guarded native commit. Same mesh/history/placed cuts remain;
853 colour detection, exact/repeat/background exit retained. Full2282PASS/0FAIL.
User854 PASS2026-10-14 protects repeat/EXACT/exit/UndoRedo. Next project-resource stage or measured
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


## .859 local validation — 2026-10-14

Full native Node regression:2300PASS/0FAIL/0skip, including three new duplicate-resource
checks. Reviewed release/cache contract passes; protected Multi1.0 and frozen betas
unchanged. Device859 duplicate→project→Nomad gate pending. Publication proof follows
in AI_HANDOFF/DEV_HISTORY after main/CI/Pages/live verification.


## .859 publication status — 2026-10-14

Complete local build3db33caa;2300PASS/0FAIL/0skip. Automatic approval review rejected
push to main despite recorded repository standing approval; direct authorization for
publication is now required by the review. Remote/live remain858.859 CI/Pages/live
verification and device gate pending. See AI_HANDOFF publication block; do not claim859
published or route around rejection through another tool.


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
