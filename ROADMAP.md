# BoxLab Development Roadmap

This is the persistent product roadmap for BoxLab.

The repository is the source of truth. Keep this file aligned with `AI_HANDOFF.md`, `DEV_HISTORY.md`, and `TEST_CHECKLIST.md`.

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

## .896 — isolated UV Paint Lab, 2026-10-17

User /nextbuild after selective-reuse audit. Base main569d4e7e; build896 adds File link
to separate evaluations/uv-paint/?build=896. Shared screen inputs compare BoxLab distance
carry and attributed Klecks-derived BezierLine/PointLine/Vec2 (cc24e977), SAME new opaque
colour raster, two512² buffers, one paired6-step UndoRedo. Original BoxLab primitives/
Planar/Box/Sphere UVs and export-as-panel892 buildUVPreviewGeometry; no second triangulator.
No production paint/scene/input/history/resource integration. Exact upstream source and
MIT notice retained; no full Klecks brush/history/selection/editor/Parcel dependency.
Pressure→size, hardness, per-stroke opacity cap, subpixel stamps; real raycast per screen
dab, at most one texture-dirty mark/frame. CPU timings exclude GPU/frame time. Demo same
inputs, switch candidates, cancel/lost capture/blur/resize/visibility/settings rollback,
palm suppression/finger navigation, reset/disposal and top-down selected PNG.20MiB raw
active paint buffer budget excluding browser/GPU/PNG,12k dabs/candidate cap.
Seven tests plus full Node24 **2474PASS/0FAIL/0skip**. Real Three geometry/raycast/raster,
adapted controller Canvas/WebGL/OrbitControls; browser/iPad separate. Plane test caught
back-facing sample; rotate temporary display -X90 only. Distance parity allows1e-12
floating roundoff, not altered source geometry. All prior semantic checks retained.
Read docs/uv-paint-lab-896.md. Main shell/recovery896; original exporter892, MeshHealth895,
main854 and all protected Multi/frozen/modelling owners unchanged. Existing TexturePaint
trial intact. No layers/.boxlab/Nomad paint persistence, imported texture base, seam-safe
projection/world radius/PBR claim.895 density and trial device gates remain pending;
prior894PASS protected. Consolidated living handoff references exact prior193KB handoff
in git; historical chronology/acceptance retained in DEV_HISTORY/TEST_CHECKLIST.
Next: compare Pencil feel; refine chosen stroke/footprint, then explicit paint resource/
codec/COW/global history before real scene integration. No896 device PASS inferred.
Publication/CI/Pages/live proof follows separately.

## UV Paint integration audit — 2026-10-17

User says TexturePaint brush needs work but promising; requests audit of TexturePaint
and Klecks and delegates reuse-versus-new decision. No blanket trial or .895 PASS.
See docs/uv-paint-integration-audit-2026-10-17.md. Audited BoxLab main353e9881,
TexturePaint3af8a61e and Klecks cc24e97712c199929760250881ffe2e25233ce6d.
Decision: BoxLab-owned architecture + selective attributed brush/stroke/compositor
reuse; no wholesale editor/history/input import, no TexturePaint runtime dependency.
Klecks Pen/Eraser read and push KlHistory; LayerCompositor is a smaller extraction
candidate. Screen-space smoothing BEFORE picking; no UV spline across islands.
Three instrumented upstream probes confirm atlas-spanning Bezier marks (162),
smoothing position/pressure and compositor call order; no rendered pixel/perf proof.
Existing focused trial/release tests10PASS/0FAIL/0skip; not a new full-suite run.
Native resource v3 remains UV-only; design paint resource/codec/COW/history explicitly.
Next narrow build: isolated identical-stroke comparison on BoxLab-generated UV geometry,
one colour layer; benchmark adapted Klecks vs simple BoxLab brush before live integration.
No upstream source imported, no runtime/pin/version/frozen changes; .895 remains live.
No new hands-on test required for this documentation-only audit. Existing device gates
remain pending; user feedback is qualitative. Full report carries integration/acceptance plan.

## TexturePaint evaluation — 2026-10-17

User directs evaluation of ceramicSoda/TexturePaint for direct in-viewport Pencil
painting with instant feedback, ultimately brushes/layers/colour controls. This is
NOT a .895 PASS or a numbered main-app build. .895 density device gate stays pending;
.894 and earlier accepted gates remain protected. Main shell/runtime/pins unchanged895.

Audit upstream master commit3af8a61e9493ff960ff29ed429fc734335c80931 (MIT, source and
licence retained byte-exact) and BoxLab renderer/UV geometry/preview/gesture/tool-session/
resource/history owners. Upstream is CPU DataTexture stamping, no layer engine; confirmed
row-wrap corruption at texture edges and destructive getTexture reset/reallocation.
Other integration gaps: linear colour bytes, aliasing private Undo/no Redo, anonymous
mouse listeners, frame-rate stamping, no pressure/coalescing, seam masks or persistence.
See docs/texturepaint-evaluation-2026-10-17.md for exact findings and production plan.

Add SEPARATE evaluations/texturepaint/ browser trial on sample sphere/plane; no live
BoxLab objects, no production loader imports or app-state mutation. Reuse original
constructor/brush/DataTexture through attributed adapter with clipped stamp blending,
sRGB quantisation, hardness/opacity/pressure, screen-space resampling and real Three
nearest-surface raycasts. Live texture updates during movement. Pencil paints; fingers
use trial OrbitControls orbit/pan/pinch.512² map, radius1–64,12 Undo/Redo snapshots,
cancel/no-op/disposal; Download PNG flattens pixels with correct top-down row order.
Reset/reload clears volatile trial. Labels explicitly say no layers/project/Nomad save.
No claim of actual BoxLab mesh integration, seam stitching, world-radius brush or GPU
stamping. This separate page does NOT replace protected app gesture/history owners.

Five tests reproduce upstream faults and check corrected pixels/bounds/colour/pressure/
opacity, texture invalidation, bounded history/cancel/disposal, sampled actual sphere
raycasts, exact upstream SHA256/licence and app isolation. Full2467PASS/0FAIL/0skip
(Node24). Headless Chromium download returned truncated archives; rendered browser and
iPad acceptance remain distinct. Publish evaluation + report, then verify Pages/assets.

Next: evaluate Pencil feel and seams on M2; production prototype should reuse existing
buildUVPreviewGeometry/render owner and original tool/gesture/history owners. Native
resource v3 is UV-only: design explicit paint-resource transport/COW/codec before
promising Save/Open or native painted exports. Preserve replaceable paint backend.
Do not add further UV utilities in place of proving the requested 3D brush experience.

## .895 — Equalize UV density, 2026-10-17

User .894 PASS protects Sphere UV creation/layout/seams, Pencil edits/Pack all,
UndoRedo/navigation, project reopening and NOMAD Base UV export. Audit main39ae725e /
runtime260817ff, live .894 markers and current loader graph, original projection /
UV inspection/edit/workspace/history/export owners. No existing equal-density action;
Box/Cylinder projections already use common density, Pack all preserves input ratios.

Add Equalize density to ORIGINAL UV workspace for all1–128 islands, with or without
selection. SAME editImportedUV transaction/copy-on-write/native scene checkpoint,
expected payload/object/mesh/session guards, source images/peers/geometry read-only,
tangent retirement and selection retention. No new pointer/history/schema/kernel.
Each island gets one positive uniform scale about its bounding-box centre; preserve
shape, orientation and mirroring. Target is total input UV area / total Base surface
area; preserve total UV area, equalize each island's AVERAGE UV-area/Base-area ratio.
Aggregate ALL faces, including beyond preview. Read-only planar polygon area vectors
and signed UV polygon areas with normalized input; concave planar polygons supported.
No triangulation or source face mutation. Nonplanar/degenerate/missing/nonfinite mesh
or UV area refuses; numeric/export-f32 edge collapse, nonfinite export coordinates,
unsupported count or changed island connectivity refuses BEFORE history/mutation.
Already-equal/repeated result within1e-12 scale tolerance adds no history. Original
Pack all tolerance/maths unchanged; avoid absolute tile-coordinate no-op tolerance
for density because small off-tile coordinates must not hide meaningful rescaling.

Centres stay fixed, so enlarged islands MAY overlap or leave tile; use Pack all next.
Images stay fixed: sampling changes intentionally. This is UV-area density; equal
pixel density assumes the same image resolution. Does not remove within-island
stretch/distortion or bake/repaint textures. Success uses original workspace Fit;
rejection leaves view unchanged. Existing Pencil preview is cancelled on click.

Five new regressions: actual history/COW/peers/metadata/centres/aspect/area/no-op;
unequal surface areas/mirrored UVs, native Box quads+Pack, concave polygons, multi-face
islands/full-face metrics and huge/tiny geometry; stale/invalid/history/nonplanar/
zero-area/export-collapse/new-seam-join/count refusals; ACTUAL workspace+MeshHealth
no-selection action/Pencil cancellation/selection/stale guard; actual project codec,
NOM UV indices/f32 corners and Three GLB UV/tangent retirement.15 focused PASS.
Full Node24 **2462 PASS / 0 FAIL / 0 skipped**. Reviewed narrow graph shell/recovery/
MeshHealth895 -> workspace895/edit895; inspector880/preview/render/native892 and
scalar889 retained. Internal MeshHealth stamp880, Multi1.0/frozen/modelling untouched.

Device895 pending: cube -> MeshHealth UVs -> Box UVs -> Open UV Editor; select island,
Pencil Scale it larger, Equalize density makes six sides comparable again, then Pack
all separates them. UndoRedo, repeat no-op and Pencil/pan/pinch still work. Save/Open
.boxlab and File NOMAD Base retain layout. .894 user PASS protected; no895 device PASS
inferred. Next: density feedback, then audit next narrow UV authoring/painting stage.

## .894 — Sphere UVs (Y), 2026-10-17

User .893 PASS protects Pack all, framing/selection, UndoRedo, project/native UV export
and prior Pencil/navigation/map references. Audited main ccf5e0e4/runtime bbc0e4b2,
current markers/pins and original primitive/projection/UV/history/export owners; no
spherical UV authoring exists in current or frozen code (orbit spherical maths unrelated).

Add Sphere UVs (Y) alongside original MeshHealth Planar/Box/Cylinder buttons. Extend
SAME imported-uv-edit native projection owner and commitNativeUV transaction. Round
sphere with two Y vertex poles and seam-aligned longitude rings, including BoxLab's
Sphere primitive. Equirectangular longitude/latitude with 2% tile margin; deterministic
seam through the first non-pole corner. Split UV poles per face wedge without splitting
geometry. Replaces existing native UVs; refuses imported/resource-bearing, linked,
procedural, locked, modifier, nonround/no-pole/invalid/degenerate/unsupported seam spans
before history/mutation. Coordinates normalized before subtraction for huge/tiny input.
One existing native checkpoint, copy-on-write/peer isolation, repeat no-op. No geometry,
resource schema, exporter, pointer owner or native modelling kernel changes.

Five new regressions: source identity, pole/seam/tile layout, real UndoRedo/no-op;
4/5/12/32 radial and 2/3/8 latitude bands, translations/Y rotations and huge/tiny scales;
Box replacement/shared peers/Pack all; actual MeshHealth context action, project codec,
native NOM UV pool and Three GLB pole variants; context/invalid/history refusals.
15 focused PASS; full Node24 **2457 PASS / 0 FAIL / 0 skipped**. Reviewed cache graph:
shell/recovery/MeshHealth894 -> edit894; workspace893, inspector880, preview/render/
native892, scalar889 unchanged. Internal MeshHealth stamp880 retained. Protected
Multi1.0/modelling/frozen betas unchanged. Publication verified below.

Device894 pending: add Sphere -> Object MeshHealth -> UVs -> Sphere UVs (Y) -> Open
UV Editor; check flat latitude layout, Checker and surface seam/poles. Edit with Pencil,
Pack all, UndoRedo, pan/pinch. Save/Open .boxlab and File NOMAD Base retain UV layout.
Equirectangular mapping intentionally distorts near poles; not equal-density unwrapping.
Does not promise arbitrary deformed/tilted spheres, Quadball mapping, seam cutting,
optimal packing, painting, opacity recovery, native multi-materials or NOM import.
Next: Sphere device feedback, then audit next narrow UV authoring or painting stage.

## .893 — Pack all UV islands, 2026-10-17

User .892 PASS protects Roughness(G)/Metalness(B) references, prior map choices,
Pencil/navigation/history, project reopening and native six-map export. Audit main
321674aa/runtime68ee2db6 and original UV inspection/edit/workspace/history/export owners;
Fit-to-tile exists for ONE island, no all-island packer exists.

Add Pack all to ORIGINAL UV workspace. Whole current object's complete UV layout,
with or without an island selection; supported imported GLB and native BoxLab channels.
Deterministic GRID packing, not optimal polygon packing, seam unwrap or texture baking.
Try column counts for best common uniform scale; preserve every island's orientation,
shape and RELATIVE UV sizes/density. Island IDs/order unchanged.2% tile outer margin
and at least2% gap between island BOUNDING BOXES. At most128 islands; larger layouts
refuse before history. Does not remove overlaps WITHIN an island. Texture images stay
fixed: packing intentionally changes their sampling, like existing UV transforms.
Button title explains all-island scope/fixed images. No auto-pack on import/export.

Extend SAME imported-uv-edit transaction with packImportedUVIslands, using original
inspector connectivity/full faceIslands and shared bounds. Expected payload/scope/context,
complete matching channel, independent/unlocked/resource/history guards retained. Plan
with normalized coordinates to handle huge/tiny finite UVs; reject zero-extent islands,
nonfinite scale, collapsed extents or newly collapsed UV edges in double OR export-f32
precision before mutation. Existing copy-on-write payload/tangent retirement and one
native scene checkpoint. Source mesh, metadata/images, peers and source arrays read-only.
Near-identical repeated packed result (32EPS absolute in0–1) adds no Undo entry. Original
selected-island/whole-layout Rotate/Flip/Move/Scale/Fit maths unchanged.

Pack click cancels pending Pencil preview through existing owner, delegates original
MeshHealth transaction and retains matching selected-island membership. Successful pack
frames resulting tile with EXISTING view Fit; rejection leaves view unchanged. No new
pointer/history/resource/UV signature owner, schema or geometry changes. No packing of
selected subsets or user-adjustable gutters in this first stage.

Five native regressions: common scale/aspect/orientation/bounding gaps/COW/peer isolation/
actual UndoRedo/repeat no-op; native Box UVs, huge/tiny/full-face-beyond-preview layouts;
invalid/stale/locked/no-history/zero-extent/f64/f32 collapse refusals and128 allowed vs129
refused; ACTUAL workspace+MeshHealth no-selection launch/Pencil cancel/selection/context;
actual .boxlab codec, native NOM UV indices/f32 corners and Three GLB UV/tangent roundtrip.
Full local Node24 2452PASS/0FAIL/0skip. Narrow cache graph shell/recovery/MeshHealth893 ->
workspace893/edit893; inspector880/preview892/render/native export892/scalar889 retained.
Internal MeshHealth stamp880 retained. All protected modelling/Multi/frozen bytes unchanged.

Device893: cube -> MeshHealth UVs -> Box UVs -> Open UV Editor -> Pack all: separated
islands inside tile, result framed; select/move island then Pack all with selection
retained. Undo/Redo restores layout; repeated Pack all adds no extra Undo. Save/Open
.boxlab and File NOMAD Base retain packed layout/seams. This is manual UV layout
editing; do not expect imported painted texture appearance to stay fixed after packing.
Next: device packing feedback, then audit staged seam/UV authoring or resource-backed
painting; no new opacity recovery/native multi-material/NOM import claim.

## .892 — UV Editor Roughness / Metalness references, 2026-10-17

User .891 PASS protects Normal/Emissive references, existing Pencil/navigation/history,
Image-off reopen, project resources and native six-map export. Audit current main
433c73f0/runtime278b0042 and original chooser/decoder/controller/workspace plus native
packed-map owner. Existing native export proves glTF roughness=G and metalness=B.

Extend ORIGINAL optional UV map chooser with Roughness (G) and Metalness (B), BOTH
resolving material.pbrMetallicRoughness.metallicRoughnessTexture through the same
embedded-image resolver. Never use red/occlusion, luminance, filenames or inferred
images. Raw channel references: do not bake roughnessFactor/metallicFactor or simulate
PBR shading. Only UV workspace opts into five map kinds; default base-colour consumers
(surface/native writer) retain identical source selection/shape/behaviour.

Extend SAME bounded decodeUVImage: colour/normal/emissive path unchanged. Packed
references request existing <=1024² bitmap with colour conversion/premultiplication
none, use one OffscreenCanvas or DOM canvas for readback, repeat G/B into RGB with
opaque alpha, no Y flip or PNG encoding. Translucent readback refuses because Canvas
premultiplication could lose RGB. Source bitmap closes in finally; failures reset the
scratch canvas. Successful canvas is the single controller-held image, with close()
resetting dimensions to1. No second output bitmap, retained conversion cache, GPU
material change or permanent image/UV/project mutation. Bitmap + canvas + readback
are temporary bounded allocations; inspection is a resized reference, NOT full-resolution
lossless data analysis. Original encoded8MB guard and one held preview remain.

Existing generation cancellation, slot-aware UV-refresh reuse, chooser Pencil-cancel/
capture release/view/selection, tile/V0 projection, pan/pinch/history and Image-off
reopen remain original. Aria label now UV image reference, matching all image choices.
Four regressions cover exact bindings/G/B vs red/factors/default parity/guards, actual
bounded decoder pixels and DOM fallback, context/read/write/alpha failure and late
cleanup, ACTUAL workspace grayscale rendering/switch/Pencil/view/selection/reopen.
Prior891 workspace test now locates its Normal/Emissive entries before the added two;
all previous behavioural assertions retained. Full Node24 2447PASS/0FAIL/0skip.

Actual supplied FULL MATERIAL.glb resolves both to image4/733,993B packed JPEG,
SHA2563c0ec3a61999f04ee7e5e2376ebf4a4324f1c56b09caf1334523b639b3b2d9b5.
Pillow1024² readback transport -> REAL decoder channel conversion verifies every G/B
value in1,048,576 pixels per reference; original source hash unchanged, both source
bitmaps closed. Browser decode/readback adapted; iPad visual gate remains separate.
No private pixels committed or lossless/resizing-equivalence claim for browser thumbnail.

Reviewed shell/recovery/MeshHealth/workspace/shared preview and surface/render/native
parent cache graph892; native parent changes ONLY shared import pins. ScalarPNG889,
UV maths/decoder options for existing maps, all native binary/dedup/kernel/history/
resource/import owners, protected Multi1.0 and frozen betas retained. All four docs current.
Device892: UV Editor -> Image -> Roughness (G), Metalness (B): separate grayscale
references under UV outlines; Normal/Emissive still work. Pencil edits/UndoRedo/pan/
pinch, reopen and Save/Open -> native six-map export remain intact. Next after feedback:
audit next staged UV-authoring/packing capability; separate opacity requires source-
complete input. No opacity/displacement/occlusion inspection, painting or NOM import.

## .891 — UV Editor Normal / Emissive references, 2026-10-17

User .890 Perfect PASS protects two independent FULL MATERIAL.glb imports/native
six-map export, individual UV edits and .boxlab Save/Open; .889 remains protected.
Audit current main a0a56749/runtime08f0256e and original UV chooser/resolver/decoder,
workspace gesture owner and native/render consumers. Importer already retains exact
normalTexture/emissiveTexture links; no UV inspection chooser for those slots existed.

Extend ORIGINAL importedUVImageChoices with an optional colour/normal/emissive slot
list. Default callers stay colour-only with identical output shape/labels/eligibility;
only UV workspace opts into three slots. Same image-source dropdown shows Material ·
Colour/Normal/Emissive, with explicit reference status. Resolve actual material texture
index -> texture.source -> embedded image, never names/array position/facegroup guesses.
Normal/emissive texture extensions, nonUV0/transformed/missing/external/oversize/invalid
sources refuse independently; valid remaining references still available. Read-only
image reference only: normal scale and emissive factors/lighting are not evaluated.
No packed roughness/metalness/displacement/opacity selector, painting or new material UI.

Same controller/one1024² bitmap,8MB encoded source limit, generation cancellation,
late-result cleanup and UV-only payload reuse. Selected semantic slot survives refresh
when still present, including two slots sharing one image; removed slots cannot leave a
stale Normal label on Colour. Switching chooser uses EXISTING Pencil-cancel/capture
release and retains view/island selection without a transaction or history checkpoint.
Close/reopen starts Image off. Original V0/tile clipping/projection/pan/pinch/history
and Pencil Move/Scale/Rotate owner unchanged. 3D UV Image remains base-colour-only;
no additional surface/GPU bitmap residency or changed export/resource schema.

Three native regressions cover exact/reordered map links/default caller parity/codec,
unsupported refs/bytes/budgets, shared-image semantic refresh/cancel/dispose lifecycle,
and ACTUAL workspace labels/1024² decode/Pencil cancellation/view/selection/reopen.
Actual supplied FULL MATERIAL.glb source audit resolves normal image1/1,248,872B and
emissive image2/2,754B. Its11,121,601B colour remains outside existing8MB preview policy;
Normal/Emissive stay inspectable. No private pixels committed, browser visual gate pending.
Full local Node24 2443PASS/0FAIL/0skip. Cache graph reviewed: workspace/preview891,
MeshHealth parent891; shared preview consumers surface/render/native-displacement/
native-core/packed/export parents891 (imports only), scalar889 retained. Internal
MeshHealth stamp880 intentionally retained. Protected Multi1.0/modelling/frozen beta,
actual decoder, native image/dedup maths and source/export image bytes unchanged.

Device891: imported GLB -> Object Mesh Health -> UVs -> Open UV Editor -> Image;
choose Normal, then Emissive; inspect alignment/orientation beneath UV outlines.
Pencil edit/UndoRedo and pan/pinch still work; close/reopen starts Image off.
Save/Open .boxlab -> chooser and native NOMAD six-map export remain intact.
Next after feedback: audit packed-map inspection or the next staged UV-authoring
step; separate opacity still needs source-complete input. No NOM import claim.

## .890 — identical native export images shared by content, 2026-10-17

User .889 PASS protects exact FULL MATERIAL.glb six-slot native download/open,
Pencil UV repeat and .boxlab Save/Open. The .888 24MB device failure is resolved for
that accepted case; keep the failure history and .889 lossless encoding protected.
Audit main a5e671ca/runtime b7c5d1e3, shell .889 and original native writer/preflight.
Native pooling and packed conversion previously used buffer identity only, unlike
existing content-pooled .boxlab files. Re-importing the same GLB independently could
therefore exceed the native 24MB pool although a reopened pooled project fitted.

Extend ORIGINAL native writer with export-local createNomadImageIdentity; no second
binary pool/container/resource owner. MIME + byte length + FNV-1a hash selects a
candidate bucket; full byte comparison decides equality, including subarray offsets.
Hash collisions never merge unequal data; per-buffer/MIME memo avoids repeated scans.
Original image table, alignment, 24MB guard, mesh/UV/material/slot owners retained.
Async preflight uses the SAME identity helper to count unique raw and converted bytes;
equal packed source content converts once even across independent buffers. Distinct
encoded images remain distinct regardless of names. Original image buffers stay
read-only and independent; no content merging in scene/history/import/project state.
Each object keeps its own material factors, texture names, geometry and UVs. No image
resampling/reencoding, increased limits, permanent cache or new modelling/history owner.

Four regressions cover an actual same-length FNV collision, MIME/length/offset identity,
separate materials/names/selected UVs/native field bytes, ACTUAL File NOMAD two full-size
independent six-map payloads, conversion once, project reopen and exact unique budget
including equal converted slots. Existing six historical budget tests now use genuinely
DIFFERENT bytes instead of identical filler; all rejection assertions remain active.
Full local Node24: 2440 PASS / 0 FAIL / 0 skipped. Reviewed graph shell/recovery/export
panel890 -> packed890 -> native-core890; scalar889, displacement888 and all other
resource/UV/render/import/protected modelling/Multi/frozen owners unchanged.

Actual uploaded GLB source images + actual JPEG G/B decode transport, REAL production
scalar encoder/native writer: two independent textured objects with different UVs,
6 unique images, 22,557,536B payload, 2,608,288B headroom; one packed decode. Original
colour/normal/emissive/displacement hashes exact. Browser readback adapted in Node;
iPad/Nomad .890 multiple-import gate remains pending, no device PASS inferred.

Opacity audit of actual paired files: GLB colour PNG RGBA2048x2048 already carries
alpha0..123; native template ALREADY use_color_opacity=1/factorOpacity1, and exporter
retains the encoded colour bytes. NOM separate opacity image is RGB1024x1024,
417,303B, SHA256440163515a426e5017aa0695f537f48ca8d9d20a36717f040ba08161b4e0b440.
That separate image is ABSENT from GLB, whose extras name Water_001_DISP_opacity.png;
NOM slot names Water_001_DISP.png. Do not derive/rename alpha as a recovered separate
map, invent missing pixels, or claim new opacity/transparency support. No opacity
runtime change in890. Public reference: https://nomadsculpt.com/manual/material
(texture-panel Opacity uses colour alpha; Auto uses UV when present).

Device890: reset; import FULL MATERIAL.glb TWICE, SubD off; move one object aside;
File NOMAD must download/open two objects with six maps each. Pencil UV edit one object
then repeat; Save/Open .boxlab repeat. Genuine unique-image excess still refuses with
source/converted/object breakdown. Next: device feedback, then source-complete opacity
input/native material audit or staged UV/texture work; no invented opacity/NOM import.

## .889 — lossless scalar PNG encoding / .888 budget FAIL, 2026-10-17

User reports888 File NOMAD failed: embedded images exceed24MB. Do not mark888 PASS.
Audit main9af5dff1/runtime888, original packed-map preparation and24MB native pool.
Prior offline audit used Pillow scalar PNGs in place of browser output; this did NOT
prove the real platform-encoded files would fit. Actual browser PNG byte sizes were
not captured, and multiple independent textured imports can also exceed source budget.
.887 exact-file five-map/Pencil/project PASS remains protected. Keep888 displacement
binding/schema/16-bit byte tests; repair derived encoding rather than enlarge the pool.

Original splitNomadPackedImage used canvas.createImageData RGBA, repeated G/B into
three channels plus opaque alpha, then platform convertToBlob/toBlob PNG. Scalar data
needs only ONE8-bit channel. New small nomad-scalar-png owner encodes colour type0 PNG,
adaptive per-row None/Sub/Up/Average/Paeth filtering, real CompressionStream('deflate')
zlib and chunk CRCs. Standard: https://www.w3.org/TR/png-3/ and
https://compression.spec.whatwg.org/ . Original2048² bound and8MB derived-image cap
remain; source bytes/dimensions/G/B values unchanged. No gamma/profile/alpha chunks,
resampling, factor baking, lossy compression or quality reduction. Encoder does not
mutate readback/source. Removes full RGBA output scratch allocation and platform PNG
encoder dependency; browser bitmap decode/canvas readback + finally cleanup stay original.
CompressionStream unavailable/failure refuses clearly; no oversized RGBA fallback.

Native24MB aggregate guard stays ACTIVE. Async preparation now reports source-image MiB,
converted-map MiB and visible object count in overbudget error, distinguishing derived
size from repeated/large imports. Dedup still source-buffer identity as protected884;
independent imports of identical bytes are NOT content-deduped. Do not silently raise
limits or claim this permits unlimited scenes. Test one fresh import to isolate result.
Original native writer/displacement helper888/image/surface/resource887/UV/render/kernel/
history/importer/frozen owners unchanged; no duplicate pool, decoder or modelling owner.

Existing886 tests now inspect actual production grayscale PNGs with independent Node
zlib/CRC/inverse-filter reader; retain all exact G/B/geometry/UV/source/factor/resource/
cleanup/DOM-readback assertions. Encoding-failure injection moves to CompressionStream;
platform PNG encoder calls must be zero. Three new regressions cover real compressed
PNG pixels/headers/CRC/filters/bounds/API failure, ACTUAL File NOMAD six-map export at
reported source sizes with real compression and forbidden platform PNG encoder, and
retained24MB source guard with diagnostic breakdown. Full local2436PASS/0FAIL/0skip.

ACTUAL user packed JPEG decoded to RGBA through Pillow as Node transport fixture, then
REAL production scalar encoder/deflate (no substitute PNG encoder): roughness2,035,568B,
metalness1,948,291B. Independent Pillow PNG decode confirms EVERY G/B byte identical.
Actual retained source assets + production split/native facade:6images,22,557,536B image
payload (21.51MiB),2,608,288B pool headroom,22,629,956B native file. Colour/normal/emissive/
displacement original hashes exact, displacement16-bit/settings untouched. Native Box
UVs used for byte-budget audit; original imported UV/history coverage remains in suite.
Browser decoder/readback adapted in Node; no Safari/Nomad visual acceptance inferred.
Private images/readback not committed. This replaces the earlier Pillow-encoded size
estimate;888 failure preserved as device evidence and889 exact-file gate remains pending.

Reviewed889 graph: shell/recovery/export-panel889→packed-child889→new scalar encoder889;
packed child still imports native-core888→displacement888 and source/image helpers887.
All unrelated UI/import/codec/UV maths/protected modelling/Multi/frozen/native donor bytes
unchanged. All four continuity docs updated; publication proof follows.
Device889: reset scene, import FULL MATERIAL.glb ONCE, SubD off→File→NOMAD must download;
check all six native slots including displacement; UV edit and .boxlab Save/Open repeat.
If still overbudget, report FULL new source/converted/object breakdown rather than guess.
Opacity remains pending; displacement numeric settings copied unchanged, no amplitude
rescaling/BoxLab geometry bake/generic glTF displacement/native multi-material/NOM import.

## .888 — explicit Nomad displacement-map handoff, 2026-10-17

User887 PASS /nextbuild protects supplied FULL MATERIAL.glb native download, original
large colour plus normal/emissive/roughness/metalness slots, UV-edit repeat and .boxlab
Save/Open after validator repair. Resolves reported885 FAIL screenshot886 for this case;
earlier smaller native/UV/Pencil/navigation baselines retained. Audit current
main714bd5a1/runtime3f605425/live887/owners and paired user GLB/NOM donors.

Original importer ALREADY retains meshExtras.nomad.version1/textures.displacement
semantic NAME REFERENCE plus all original image definitions/core texture links. Proved
that explicitly named GLB image3 (6,200,450B16-bit PNG) equals BOTH native donors'
displacement image, SHA25645771544a0c7442d03136ce78fc8b79f4341a5a1541eb34f9f6e45cf3cc0b501.
Generator nomad11 observed. Metadata-only paired provenance fixture includes saved native
slot/strength/midpoint/world and a tiny synthetic16-bit PNG; no private pixels committed.
No new import channel, envelope/version, filename-stem inference or duplicate kernel.

Small nomad-displacement-map binding helper reads only explicit version1 Nomad slot.
Require EXACTLY ONE image.definition.name matching that explicit reference and EXACTLY
ONE core texture sourcing it; missing/ambiguous/no-data/unsupported refs refuse before
download. A matching image filename WITHOUT semantic slot never enables displacement.
Shared embeddedUVImage validates PNG/JPEG bytes/MIME≤24MB;16-bit data copied unchanged,
no decode/reencode/downsample or precision loss. Default repeat/linear sampling; source
Auto/UV and identity transforms only, unknown slot keys/transforms/Triplanar refuse.
Observed native Auto encoding used with REQUIRED complete matching Base UV channel
(Auto uses UV when UVs exist; official manual https://nomadsculpt.com/manual/material).
Hardness/world projection metadata and finite source strength/midpoint/world fields
validated; numeric settings preserved VERBATIM, including negative strength and source
world boolean. This stage does not compensate displacement amplitude for import-fit
or baked object scaling, bake displaced geometry, or add a BoxLab displacement renderer.

ORIGINAL nativeMaterialMaps/writer now includes displacement-only input or displacement alongside existing
map slots, original image-table dedup/alignment/24MB aggregate and donor material slot.
Original one opaque material/Base UV/stale/evaluated refusal stays. .887 raw colour/
normal/emissive24MB and display8MB/1024², packed8MB/2048² budgets unchanged. Source
mesh/UV/resources/history stay read-only. Async facade already counts ALL nonpacked
maps in same pool; no duplicate conversion/cache. File NOMAD status adds displacement
count. Plain/no-explicit-slot and prior map output paths retain original behaviour.

Five native regressions: explicit reference vs filename-only/array reorder, valid16-bit
bytes/native donor slot/settings/unchanged geometry+UV fields, ambiguous/missing/sampler/
transform/factor/stale/evaluated refusals, shared-image dedup/aggregate budgets and
selected UV/project continuity, ACTUAL File NOMAD six slots/status/error recovery.
Full local2433PASS/0FAIL/0skip. Actual user GLB→original importer/Three geometry conversion
→resource Save/Open→native output22,511,792B:1object/6faces/1UVobject/6images; colour/
normal/emissive/displacement hashes exact; native strength.17320507764816284, midpoint.5,
worldfalse exact. Import fit scale2 retained as before. Offline packed split uses Pillow
G/B and Node private geometry input strips image refs only; no browser/Nomad appearance
proof inferred. .887 device PASS protected; .888 displacement device gate pending.

Reviewed888 graph: shell/recovery/export-panel→packed-child→native-core→new displacement
binding helper; core/image/surface and new helper's shared decoder remain887. All other
UI/importer/resource/UV math/navigation/protected modelling/Multi/frozen beta/native donor
bytes unchanged. All four continuity docs updated; publication verification follows.
Device888: same FULL MATERIAL.glb/SubD off→File→NOMAD: Displacement slot populated with
original image and saved settings, previous five maps intact; Pencil UV/project repeat.
Separate opacity texture absent from GLB despite named extras, so opacity remains
pending. Do not guess missing pixels or declare generic glTF displacement/NOM import.
Next:888 device feedback; then audit opacity source/baked colour alpha and native material
semantics before adding transparency or unrelated UV painting/native per-face materials.

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

## .890 publication verified — 2026-10-17

Runtime08f0256ef54901f205311b25d93b04b3250c2746; tested tree
c7f3fd960f69b86bba150b377cc84646f18ced47 exactly matches fetched main.
Actual Node22.23.3 CI38985850970/job117257022771 SUCCESS2440PASS/0FAIL/0skip;
Pages38985850874 build/deploy SUCCESS. Fresh live shell/manifest/recovery/export-panel/
packed-child/native-core890, unchanged scalar889/displacement888/protected Multi1.0
and frozenBeta7 marker all byte-match repository. Initial reads preceded deployment;
final graph matches890. All four continuity files current; proof changes docs only.
User889 PASS protected;890 two-independent-import/UV/project native device gate PENDING.

## .891 publication verified — 2026-10-17

Runtime278b0042b4a1815e1765cf69edd1a2462862e669; tested tree
fdf44a1b86e9faa474fe1b785e104a70a0a12a34 exactly matches fetched main.
Actual Node22.23.3 CI38987566193/job117262477050 SUCCESS2443PASS/0FAIL/0skip;
Pages38987566624 build/deploy SUCCESS. Fresh live shell/manifest/recovery/MeshHealth/
workspace/preview/surface/render/export/native-parent graph891, scalar889, protected
Multi1.0 and frozenBeta7 marker all byte-match repository. Initial reads preceded
deployment; final complete graph matches891. All four continuity files current.
User890 PASS protected;891 UV Normal/Emissive/Pencil/project/native device gate PENDING.
Proof is documentation-only; tested runtime bytes unchanged.

## .892 publication verified — 2026-10-17

Runtime68ee2db64bf7b3bd6bb4df7433141fef48db44f7; tested tree
ce6c0a21c0fd49925ed557d4997edbb5fa2e1b89 exactly matches fetched main.
Actual Node22.23.3 CI38991841599/job117275721906 SUCCESS2447PASS/0FAIL/0skip;
Pages38991841149 build/deploy SUCCESS. Fresh live shell/manifest/recovery/MeshHealth/
workspace/preview/surface/render/export/native-parent graph892, scalar889, protected
Multi1.0 and frozenBeta7 marker all byte-match repository. All four continuity files
current. User891 PASS protected;892 grayscale/Pencil/project/native device gate PENDING.
Proof is documentation-only; tested runtime bytes unchanged.

## .893 publication verified — 2026-10-17

Runtimebbc0e4b20d55a47fbac9fa3daaa1b4a0c226a3e0; tested tree
efd82dfde462eca6e53e7ed61f23d8bf4332dc8b exactly matches fetched main.
Actual Node22.23.3 CI39003980800/job117312549657 SUCCESS2452PASS/0FAIL/0skip;
Pages39003980205 build/deploy SUCCESS. Fresh live shell/manifest/recovery/MeshHealth/
workspace/edit893, unchanged inspector880/preview/render/native892, protected Multi1.0
and frozenBeta7 marker all byte-match repository. All four continuity files current.
User892 PASS protected;893 Pack all/framing/history/project/native UV device gate PENDING.
Proof is documentation-only; tested runtime bytes unchanged.

## .894 publication verified — 2026-10-17

Runtime260817ff6794ce467346ad36dd8543978cdaf4d3; tested tree
60b9ca959af6b1c0e04bf766ea1aee8225390eda exactly matches fetched main.
Actual Node22.23.3 CI39005188711/job117316093356 SUCCESS2457PASS/0FAIL/0skip;
Pages39005188424 build/deploy SUCCESS. Fresh postdeployment live shell/manifest/
recovery/MeshHealth894/edit894, unchanged workspace893/inspector880/render892,
protected Multi1.0 and frozenBeta7 marker all byte-match repository. Initial reads
preceded deployment; final complete graph matches894. All four continuity files
current. User893 PASS protected;894 Sphere layout/Pencil/history/project/native UV
device gate PENDING. Proof is documentation-only; tested runtime bytes unchanged.

## .895 publication verified — 2026-10-17

Runtime6b1e003324e5e883d8a0f4625a1e69ba0336fde7; tested tree
d972fde28ba3b85d3cda78c4f33afe5a97a727ac exactly matches fetched main.
Actual Node22.23.3 CI39005809090/job117317939014 SUCCESS2462PASS/0FAIL/0skip;
Pages39005808724 build/deploy SUCCESS. Fresh live shell/manifest/recovery/
MeshHealth895/workspace895/edit895, unchanged inspector880/render892,
protected Multi1.0 and frozenBeta7 marker all byte-match repository. All four
continuity files current. User894 PASS protected;895 density/Pack/Pencil/history/
project/native UV device gate PENDING. Proof changes documentation only; tested
runtime bytes unchanged.

## TexturePaint evaluation publication verified — 2026-10-17

Evaluation commit ec7d0f6666a7b7713bece07c603ea0e976eb2634; tested tree
f12d0461396b98f883acb279cb728bbc6d512c56 exactly matches fetched main.
Node22.23.3 CI39006748131/job117320658726 SUCCESS2467PASS/0FAIL/0skip;
Pages39006747665 build/deploy SUCCESS. Fresh live trial index/controller/adapter,
byte-exact upstream source/licence and evaluation report match repository. Main
index/version remain byte-identical .895. Rendered browser verification did not
complete; iPad Pencil/navigation/seam/PNG tests remain pending, no device PASS inferred.
All four continuity docs current. Next is hands-on trial feedback before production
paint resource/history/gesture integration. Proof is documentation-only.

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

## .899 — project colour resource preservation; .898 user PASS — 2026-10-17

User898PASS protects .boxpaint Save/Open/continued brush/history/settings/view;895
not inferred. Audit37c77ab5 synchronous codec/actual history/manager/duplicates: no
colour resource forwarding existed. Separate colourPaint owner, original scene
snapshot/restore/ordinary single+Multi Duplicate share committed read-only buffers;
replace resource for COW edits. Original .boxlab Save/Open handles explicit scenev2
paint pool/ref envelopesv1 using existing canonical binary transport,8MiB unique raw
budget; plain projects retain v1 exactly. Native UVv3 remains strictly UV-only.
Owned decode/pool sharing/content+identity dedup; malformed/unknown/alpha/ref/budget/
linked/procedural/reference owners refuse. Original exact roundtrip/atomic Open,
render-failure rollback/history reset retained. Four tests + full2487PASS/0FAIL/0skip;
focused4PASS includes added failed-render rollback assertions. No rendered/iPad claim.
Binding opaque, no project SHA/current UV validity claim; .boxpaint SHA unchanged.
Main Open says colour preserved but display/editing unavailable. No authoring/transfer
UI/main paint/layers/UV propagation/GLB/Nomad paint export yet. Read
 docs/project-paint-resources-899.md. Next bounded selected-object bridge through
original preview/selection/history, explicit validity/rebinding/lifetime/refusals.
Shell/recovery and changed owner graph899; original sample/resource898, brush896,
preview897 and protected modelling/frozen bytes retained. Publication proof follows.

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

## .900 — main viewport UV Paint; .899 user PASS — 2026-10-17

Audit2c56d33f original native UV preview/raster/scene history/resource/render/input
owners. File Paint selected object, actual main viewport, one plain native UV object,
SubD/Mirror off≤20k corners. Original top-centre Tool Session/transform disarm/radial
lifecycle. Reuse896 raster + both samplers unchanged; opaque512², Pencil paints/fingers
navigate, occlusion/surface rays, one dirty upload/frame. Changed stroke checkpoints
original scene then COW resource; UndoRedo original/exits Paint. Async UV-envelope binding
uses original codec/signature; ordinary movement/deformation follows unchanged UVs,
UV/topology changes hide/refuse stale. Preview/body/context/disposal/capture/controls/
palm/interruption guards. Original render owner active/live + inactive/locked display
in Studio/Solid/UV Image. Main .boxlab v2 persistence through899. Original export resolver
now refuses painted OBJ/GLB/NOM rather than dropping paint; Quick OBJ catches; Join
refuses pending resource propagation. No PBR/layers/imported paint base/seam-safe/export
paint claim. Seven new tests; full2494PASS/0FAIL/0skip, no browser/Pencil proof inferred.
Historical741 pin test uses reviewed contract and retains shell/dynamic equality.
Read docs/viewport-paint-900.md. User899PASS protected;900 device gate pending.
Next hands-on actual paint, then flattened colour export through original owners.
Publication proof follows; protected Multi1.0/frozen/modelling/brush bytes retained.

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

## .901 — painted native Nomad / GLB export; .900 user PASS — 2026-10-17

Audit50bcdb2a: original native image/material/UV/container writer and GLB patch already
supply handoff; adapt export-local512² colour through them. New paint-export capture/
UV binding guard/private prepared snapshot association, owned geometry/UV/pixels before
await; no fake imported provenance/stored nativeUV material mutation. Existing PNG owner
adds losslessRGB8/sRGB and reuses CRC/zlib; scalar remains unchanged. Rows follow native/
glTF UV-v0-first convention, no Lab human PNG flip. Native white-factor colour image,
original independent UV/polygon buffers/image pool24MiB/dedup/offset/header. GLB embedded
PNG/neutral material/clamp sampler/original groups/seams/loader verification; painted
path enables existing source-winding flag only. Nonpainted path retained. Painted OBJ/
Join/raw unprepared sync export still refuse; .boxlab remains editable paint project.
Six focused tests PASS: exact PNG/UV/material/geometry/dedup/winding/snapshots/refusals
and both real File download actions. Full Node24 2500PASS/0FAIL/0skip; publication proof follows. User900PASS
protects viewport/Pencil/history/persistence/COW; no new Nomad/device acceptance inferred.
Read docs/paint-export-901.md. Next export feedback, then layer/compositor resource plan
through original owners. No rendered/PBR/seam-safe/imported paint-base/NOM import claim.

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

.902 local validation: Node24.19.0 full suite **2505 PASS / 0 FAIL / 0 skipped**;
five new focused compositor checks PASS. No new device/rendered layer proof.


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

.903 local validation: Node24.19.0 full **2512 PASS / 0 FAIL / 0 skipped**;
seven new focused checks + existing902 tests PASS. No rendered/device gate inferred.


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

.904 local validation: Node24.19.0 full **2519 PASS / 0 FAIL / 0 skipped**;
seven new resource/history/codec/export checks PASS. No device acceptance inferred.


## .905 — visible main viewport colour layers; .904 PASS — 2026-10-18

User904PASS protects paint Save/Open/Undo/Duplicate/NOM/GLB regression. Audit1d246735:
connect existing900 painter/903 stack+26 blends/904 resource and original scene history.
Layers panel: select/top-first, + Layer (max3), rename/reorder/delete, visibility,
layer opacity and26 modes. Base paintable/opaque; existing v1 converts only on + Layer.
Same raster gains optional straight-alpha layer mode with preserved opaque default,
pressure/hardness/per-stroke cap/cancel; same stroke/input/raycast/navigation owners.
Separate mutable layer/composite preview; original one dirty upload/frame; no measured
M2 performance claim. Whole-stack copies/preflight remain, not sparse optimization.
Every changed stroke/metadata operation checkpoints original scene and COW replaces
resource; selection/no-op creates no history. Full-scene8MiB pool checked BEFORE
checkpoint; invalid/budget/checkpoint failure restores original resource/preview.
Stored masks persist; no mask/image/material UI claim. Save/Openv3 and flat NOM/GLB use
original904 owners. Hidden/zero opacity layer refuses strokes while panel stays open.
Seven focused905 checks PASS; all original900 assertions retained in extracted shared
runtime.904 refusal assertion superseded by real layered opening/editable-path tests.
Read docs/paint-layer-ui-905.md. Changed painter/shared raster and Lab loader graph905;
compositor903/resource+project+export904/stroke896/protected/frozen owners retained.
Next DEVICE layer/Pencil/navigation/persistence feedback, then mask paint/UI through
same owners, followed by image projection/Insert cycle/material plan. Full suite and
publication proof follow. No905 userPASS or rendered browser evidence inferred.

.905 local validation: Node24.19.0 full **2526 PASS / 0 FAIL / 0 skipped**;
seven new layer/raster/UI checks PASS, original semantic checks retained. iPad gate pending.


## .906 — main viewport layer mask painting; .905 PASS — 2026-10-18

User905PASS: layers work well; UI/UX polish after feature flows are present. Audit
mainf8455236/local verified905 treefb902274: reuse903 masks/compositor,904 resource/
project/history/export and905 raster/input. Add Mask selects Mask paint target; same
opaque raster edits raw grey coverage, R8 committed, source colour pixels unchanged.
Hide/Reveal/Grey brush presets account for inversion; raw value0–255 slider, size/
hardness/pressure/opacity and both samplers retained. Colour picker preserved/disabled
in Mask mode. Layer switch/reopen starts Colour; base has no mask. Enabled/invert/
remove use COW + original checkpoints; selection/preset/no-op do not create history.
Cancel/settings/target/layer/body-loss restore mask/preview/navigation. Parent layer
must show/nonzero opacity and mask enabled to paint. Original8MiB preflight/rollback
preserved. Same resourcev2/projectv3/flat NOM+GLB, no new schema/history/kernel.
Seven focused906 tests PASS incl actual UI/core/source preservation, flags/UndoRedo,
interruption/invalid/budget/checkpoint rollback, exact Save/Open/re-edit and native
export. Full suite/publication proof follows; no rendered/iPad acceptance inferred.
Read docs/paint-mask-ui-906.md. Only main painter + shell/recovery906; raster/Lab905,
compositor903/resource+project+export904 and protected modelling/Multi/frozen untouched.
Next DEVICE mask gate, then editable image sources/Project from View through original
UV/geometry and Insert cycle. No material opacity/displacement or broad UI redesign
claim. Product direction remains docs/paint-material-direction.md.

.906 local validation: Node24.19.0 full **2533 PASS / 0 FAIL / 0 skipped**;
seven new mask UI/core tests PASS. Device906 pending; no rendered proof inferred.


## .907 — editable image source and placement foundation; .906 PASS — 2026-10-18

User906PASS protects mask/Pencil/navigation/history/project behaviour. Audit remote
4778567c and existing read-only UV image892/Insert437 owners. New isolated image
source importer retains original encoded PNG/JPEG + owned decoded RGBA, preflight
2MiB/1024² before bitmap decode, exact dimensions, async snapshot and cleanup.
Camera placement snapshots original Three matrices plus NDC centre/size/rotation;
projector clips camera/image bounds, returns top-first UVs. Original Insert cycle
re-exported verbatim; no new pointer/mesh/history owner. Six focused tests PASS.
Read docs/paint-image-source-907.md for browser colour/alpha/EXIF and memory limits.
NOT connected to painter, layer/project schema or UI yet. Coordinate projection
does NOT enforce facing/angle/scene occlusion; existing painter must do so before
rasterization. No Project from View/surface placement/manual device claim.
Main paint906/resource904/compositor903/protected Multi1.0/frozen unchanged.
Next explicit image source+placement resource/pool versioning and original history/
project/export integration, then picker/overlay/visible-front projection UI.
No new hands-on gate this foundation build; .906 PASS is protected, not907 image UI.

.907 local validation: Node24.19.0 full **2539 PASS / 0 FAIL / 0 skipped**; six new
focused image source/placement checks PASS. No new image UI or device gate.


## .908 — retained image layers in original resource/project owners — 2026-10-18

Auditfa81af3d:907 input/placement isolated;903/904 strict raster-only storage. Extend
SAME stack/resource/pool to explicitv3 and sceneprojectv4. Image recipe retains original
encoded+decoded source, placement and affine capture frame, separate surface raster.
Paired image+preview append/replace APIs; generic colour pixel edits refuse images.
All source/cache/mask/flat/base bytes charged to existing8MiB pool BEFORE decode;
legacy projects and nativeUVv3 unchanged. Original scene history/Undo/single+Multi
Duplicate/atomic File Open and flattened NOM/GLB retained. Existing painter supports
v3 controls/masks with image label and colour-stroke guard, no implicit bake.
Eight focused actual codec/history/File/painter/UI/export checks PASS. No new image
picker/Project UI, facing/occlusion rasterizer or rendered/device claim yet.
Source+placement907/brush905/blend903/Insert437/protected modelling/Multi/frozen retained;
changed owners and parent/Lab loader graph908. Read docs/paint-image-resources-908.md.
Next visible picker/overlay/Project via original UV geometry and current viewport input,
front/angle/scene/self-occlusion before texel acceptance, atomic recipe+raster commit.
Manual: existing paint/masks Save/Open/continue, UndoRedo, duplicate/export sanity.
Latest user906PASS protected; no907/908 devicePASS inferred.

.908 local validation: Node24.19.0 full **2547 PASS / 0 FAIL / 0 skipped**; eight new
image resource/history/project/UI/export checks PASS. Device gate remains separate.


## .909 — duplicate paint release fix; .908 user FAIL — 2026-10-18

User: duplicate paint disappears on Pencil release. Reproduced original Duplicate +
actual UI,3layers: whole-resource quota double-charges unchanged base/layers/flat and
refuses8MiB commit. Existing direct-assignment Duplicate tests missed actual release.
Repair SAME paint pool: exact canonical buffer-content dedup,8MiB unique /16MiB
expanded resource cap. Explicit scenev5 shared-byte transport only when inline>8MiB;
old scenev1–4 encoding retained below limit, complete predecode/schema/ref guards.
Original history/Undo/Duplicate/atomic File Open and flat NOM/GLB unchanged. All paint
commits preflight same pool, including opaque; failed commit restores buffers and
keeps Paint panel open. Five new regressions cover real single+Multi copy paint/release,
committed display/history/actual SaveOpen/re-edit, corrupt pool+both budgets/atomic
rollback, genuine limits/staged add and recoverable UI refusal.906 budget fixture
now uses genuinely distinct data; quota/rollback assertions retained. See
docs/paint-duplicate-909.md. Changed owners/parent/Lab cache909; stack/image908,
source907/brush905/blend903/Insert437/protected Multi/frozen/modelling retained.
Latest devicePASS906;908 duplicateFAIL recorded;909 device retest pending.
Next device duplicate release/Done/SaveOpen/Undo, then resume Project from View UI.

.909 local validation: Node24.19.0 full **2552 PASS / 0 FAIL / 0 skipped**; five new
actual duplicate/pool/recovery regressions PASS. Device release retest pending.


## .910 — native paint texture-name collisions; .909 viewport PASS — 2026-10-18

User909PASS protects duplicate paint release/Done/SaveOpen/Undo; NOMAD exception:
copy adopts original paint. Screenshots show909/green copy strokes in BoxLab, absent
in Nomad. Auditc1b350e0: prepared PNGs/material+image indices already distinct, but all
paint textures namedBoxLab paint.png. Repair authoritative native writer name registry:
NFC/case-folded collision names get numeric suffix for DIFFERENT image indices; equal
images keep sharing, unique names and existing aliases retained. Export-local only;
source bytes/names,890 exact image dedup, factors/UV/offsets/24MiB budget unchanged.
Four actual NOM/File/SaveOpen/async/dedup/mixed-name regression tests PASS. Consumer
name caching is an inference; actual Nomad device retest remains required. Read
docs/paint-nomad-duplicate-910.md. Native/File/Lab loader graph910; viewport/resource/
history/pool909 and protected Multi/modelling/frozen unchanged.
Next DEVICE re-export original+green copy from910; confirm distinct paint in Nomad,
then second export after further copy painting. If persistent inspect actual NOM bytes;
no invented native fields. Then resume original image projection UI plan.

.910 local validation: Node24.19.0 full **2556 PASS / 0 FAIL / 0 skipped**; four new
native paint/export/name regressions PASS. Actual Nomad retest remains pending.


## .911 — retained image Project from View; .910 user PASS — 2026-10-18

User910PASS protects independent duplicate paint in Nomad, clearing external gate.
Audit b0fd19a8: source/placement907 + retained image stack908/pool909 already present;
missing real picker/overlay/visible-front raster. Connect SAME painter/input/history.
+ Image PNG/JPEG ≤1024²/2MiB;65% screen guide, Pencil Move→Rotate→Scale tap cycle uses
original Insert437 function; fingers navigate behind image. Project captures current
camera/body frame; original UV triangles/Three rays enforce75° front and scene/self
occlusion BEFORE texels. Refuse sampled overlapping/cross-tile UVs and bounded work.
Paired908 image recipe+raster append/replace, original preflight/checkpoint/COW; Edit
image reprojects retained source FROM CURRENT VIEW, retains mask/blend/name/order.
Cancel/layer change/close/stale async preserves committed work, original Undo exits
Paint. Same .boxlab codec/source persistence/flat NOM+GLB; no new schema/history/kernel.
Screen-projector gestures are not tangent-following surface decals. Three overlays,
8MiB unique/16MiB expanded retained; complex scenes may refuse; no seam-safe/performance
claim. Read docs/paint-image-project-911.md. Seven focused actual raster/UI/persistence/
export tests PASS; Node24.19.0 full **2563 PASS / 0 FAIL / 0 skipped**. Publication
verification follows. Changed painter/core+new projector/
overlay graph911;907/908/909 storage,910 native exporter and protected modelling/Multi/
frozen retained. Device911 gate pending. Next hands-on Project feedback then surface-
relative placement; material slots/UI polish follow product direction.


## .911 publication verified — 2026-10-18

Runtime cf86b14a0585d6242a13b3007a60c7a7a9e1ac67; tested tree
1f2b43401ec2245c392afa1d86d9067a39fad79d. All14 uploaded blob hashes and created
tree match tested local source. Fetched origin/main has exactly the same tree;
remote manifest/title/data/visible label and reviewed painter911 graph verified.
Local Node24.19.0 full2563PASS/0FAIL/0skip; Node22 topology CI39102076649 /
job117600224293 SUCCESS. Pages39102076118 build117600224532 /
deploy117600313566 SUCCESS. All14 checked postdeployment live shell/version/
painter/core/projector/overlay/source/placement/image/stack/pool/native writer/
recovery files byte-match repository. Initial live manifest served910 before deploy;
final complete checked graph matches911. Protected Multi1.0/modelling/frozen unchanged.
All four continuity documents updated. This proof is documentation-only; tested
runtime bytes retained. User910PASS recorded;911 actual Safari/Pencil/image picker/
latency/front-only appearance gate remains pending. No rendered acceptance inferred
from Node canvas adapters or byte verification. Next manual Project checklist in
paint-image-project-911.md, then surface-relative placement from original Insert.


## .912 — surface-relative retained images; .911 user PASS — 2026-10-18

User911PASS protects Project from View/picker/Pencil/navigation/persistence/history.
Audit a647d08f: reuse911 projector and908/909 storage/pool; new surface frame uses actual
Insert437 alignment/cycle and907 orthographic camera capture, no new geometry kernel.
+ Image/Edit image → On surface → pick selected mesh. First tap places; then tap-cycle
Move/Rotate/Scale, Move follows original hit/triangle normal. Planar65% contact guide;
lift regenerates exact UV mesh preview, Apply commits ONE original scene checkpoint.
Preview never assigns object colourPaint or enters Save/history; original preflight,
commit/COW/export and .911 front/occlusion/UV/work limits retained. Cancel/close/layer/
body loss restores committed work and controls, guide disposed. Back to view preserves
accepted .911 path. Edit / On surface starts fresh anchor/default size; persisted source/
projection/frame/cache support re-placement, not automatic old anchor/spin/scale resume.
Same scene/project schema and flat native handoff. No continuous curved raster while
contact, seam-safe wrapping, larger budgets or iPad performance claim. Read
docs/paint-image-surface-912.md. Seven focused new checks cover actual frame/guide/
preview/UI/history/limits/curved Sphere UV+Save/native PNG. Node24.19.0 full
**2570 PASS / 0 FAIL / 0 skipped**; publication verification follows.
Changed painter/core/new helper graph912; projector911/source907/stack908/pool909/native
writer910/Insert437 and protected modelling/Multi/frozen retained. Device912 gate pending.
Next surface interaction feedback, then audit material-channel slots/placeholder plan.


## .912 publication verified — 2026-10-18

Runtime7c5002a42016621916fb7874df570a7425638421; tested tree
9264653aefcbbff915d09139391807bb393d5681. All13 uploaded blobs and created tree
match tested local source; fetched origin/main has identical tree. Main version/
shell/painter912 pin verified. Node24.19.0 local full2570PASS/0FAIL/0skip;
Node22 topology CI39103377854/job117604045125 SUCCESS. Pages39103377692 /
build117604047193/deploy117604136007 SUCCESS. All15 checked postdeployment live
shell/version/painter/core/surface/projector/overlay/source/placement/stack/pool/
native writer/Insert alignment/recovery files byte-match repository. Protected
Multi1.0/modelling/frozen unchanged. All four continuity files current; this proof
changes documentation only and retains tested runtime bytes. User911PASS protected;
912 Safari/Pencil/guide appearance/release-preview latency gate pending, no rendered
or M2 performance acceptance inferred. Next On surface manual gate, then material/
channel owner audit per product direction. Original screen Project remains available.


## .913 — repeated surface image quota repair; .912 partial PASS — 2026-10-18

User912PASS first surface image; explicit second-add failure. Actual912 UI reproduced:
16px second image works; second1024² source fails8MiB preflight (decoded source4MiB
alone). No user's file supplied; quota explanation verified, device retest required.
Same stack/resource/pool owners select bounded image-capablev3 profile24MiB unique /
48MiB expanded; raster-only8/16 retained. Three1024² sources+encoded+cache+base/flat/
masks fit≤23.75MiB resource. Original source dimensions/bytes,512² maps,three-overlay
and32MiB file limits unchanged; no downsizing, new schema/history/kernel or performance
claim. Original8MiB transport threshold retained: larger images use EXISTING scenev5
shared-byte codec; strict per-resource/ref/canonical/predecode/atomic refusal retained.
Failed pool upgrades cannot publish buffers or raise allowance. Image errors now also
appear inside active panel. Read docs/paint-image-repeat-913.md. Four new focused real
UI/same+different1024²/File/codec/native/quota checks added.908/912 image budget fixtures
updated to genuine24MiB overflow; all raster-only8/16 assertions retained. Local
Node24.19.0 full **2574 PASS / 0 FAIL / 0 skipped**; publication verification follows. Resource/pool and parent/Lab graph913; surface912/projector911/
source907/Insert437/brush/protected modelling/Multi/frozen retained. Native writer only
parent paint-export pin changed. Next DEVICE two/three adds in same session, edit second,
UndoRedo/SaveOpen; material work follows acceptance, not an inferred blanket912PASS.


## .913 publication verified — 2026-10-18

Runtimeb4849c600938243311cdcbce7828b8a64869a072; tested tree
8a859acf4b1d30b97fa3348dd9aa0efcddaa9514. All30 uploaded blob hashes/created tree
match local tested source; fetched origin/main identical. Main913 shell/manifest/
painter pin verified. Local Node24.19.0 full2574PASS/0FAIL/0skip; Node22 topology
CI39105181178/job117609354728 SUCCESS. Pages39105180906 /
build117609356689/deploy117609442669 SUCCESS. All26 postdeployment live shell/
version/resource/pool/new budget/UI/parent/Lab/recovery plus unchanged surface/
projector/source files byte-match source. Initial reads during deployment mixed912
and new files/new budget404; final fresh complete graph26/26 matches913. Protected
Multi1.0/frozen/modelling/brush/Insert algorithms retained; native writer only loader
pin changes. All four continuity files current. This proof changes docs only; tested
runtime bytes retained. User912 first-placement PASS protected; repeated-image device
exception remains pending913 retest. No actual user source file, Safari latency or
M2 RAM acceptance inferred from Node/source-byte checks. Next repeat-add SAME session,
verify first preserved, edit second/UndoRedo/SaveOpen; material work stays queued.


## .914 — Cylinder UVs for cones and upright Revolves — 2026-10-18

User requested Cylinder UVs for Revolve/cylinders/cones and completion up to the
next manual gate before pausing overnight. Audit: applied Revolve has revolveProfile
(not curveProfile), already eligible in Mesh Health; constant-radius/axis-side
checks in the original Cylinder mapper were the refusal. Extend THAT mapper only:
ordinary cylinders retain exact measured-edge strip/two-cap layout; fallback recovers
regular concentric world-Y rings and their single profile chain from Base topology.
Angular seam plus measured radius/height profile distance supports taper, pointed
ends, shoulders and return walls. Pole U splits per face wedge; n-gon caps stay planar.
No geometry, recipe, modelling/gesture/history/export kernel changes. Same native
corner payload, commit, original UV edits, Save/Open and GLB/NOM writers. UI explains
upright cylinder/cone/Revolve scope. Tilted/elliptical/twisted/branching/malformed
and procedural/modifier/imported contexts still refuse atomically. Not arbitrary-axis
projection, remeshing, auto-bake, zero-distortion or automatic packing. Closed profile
loops are unsupported. Four new tests cover native cone3–64 sides/multiple bands,
huge/tiny scale, original Revolve owner output with poles/taper/shoulders/return walls,
no geometry/metadata mutation, one Undo/Redo/idempotence, UV edits/codec/actual native
and GLB values, atomic refusal and retained original cylinder layout. Entire changed
UV/parent/Lab graph and shell/recovery keys914; other module pins retained.

Next DEVICE: Add+ Cylinder and Cone → Mesh Health → UVs → Cylinder UVs (Y), inspect
UV Editor; apply upright Revolve and repeat; Undo/Redo and Save/Open, paint/export
as desired. Also retest913 two images in SAME On surface session, first preserved,
second independent. No new PASS inferred; first912 placement remains protected.
Material-channel work stays queued behind these manual gates. User pausing overnight;
continue from repository tomorrow, no further automatic build needed tonight.

Local Node24.19.0 complete regression: **2578 PASS / 0 FAIL / 0 skipped**.
Reviewed shell changes only Mesh Health and both recovery URLs; UV child and Lab
parent chain914. Original913 painter/resource budget retained. An initial local
cache-contract run caught an overbroad shell pin replacement during preparation;
restored unrelated913 pins before FINAL full2578PASS run. No published bad graph.
Publication evidence to follow; manual device gates remain pending.


## .914 publication verified — 2026-10-18

Runtime88315294db29a9046ace8cef4896c449a31166e9; tested tree
 d5dcff41107bed86a43b34f7bf95240122cfa22e. Uploaded13 exact source blobs/tree,
fetched main and aligned local equivalent tree. LocalNode24.19.0 and hostedNode22
full2578PASS/0FAIL/0skip. TopologyCI39123430499/job117663549250 SUCCESS;
Pages39123429994/build117663550431/deploy117663655310 SUCCESS. All12 checked
live shell/manifest/UV owner/Mesh Health/Lab parents/recovery/Multi/painter/budget
files byte-match source after deployment. Initial public proxy timeouts/old913
manifest resolved on retried versioned fetch; final12/12 match914. Extra unversioned
manifest request timed out at proxy; no evidence of app regression. Protected
Multi1.0/frozen/modelling/paint kernels and unrelated913 pins retained. All four
continuity files current; proof changes docs only. No device PASS inferred.
Stop at manual gate: tomorrow914 Cylinder/Cone/upright Revolve UVs +913 repeat-image
retake; first912 image placement PASS protected. Material-channel work stays queued.


## .915 — precise paint RGB / HSB / hex; .914 user PASS — 2026-10-19

User914PASS accepts preceding Cylinder/Cone/upright Revolve UVs, UV Editor/history/
SaveOpen and repeated On surface images manual list. Protect914 UV +913 repeat-add
behaviour and earlier surface placement, masks/layers/paint/native exports. Audit
0a7ba302: production paint has only browser swatch, no numeric RGB/HSB editor.
New small paint-colour-controls binds ORIGINAL input, sRGB0–255 / HSV hue0–360,
saturation+brightness0–100%, hex optional#; shorthand only commits on change.
Hue survives grey, saturation survives black; invalid/partial/range entries never
publish and revert on commit. Same swatch input event owns stroke cancel/rollback;
no pointer/history/paint kernel or resource/codec/export change. Numeric controls
follow original mask/image disabled state. Collapsed foldout, original swatch retained.
Brush preferences are session UI only, not object/save metadata. Three focused actual
UI/pixel/history/project/native tests added; full suite/publication follows.
Only painter UI/new helper and shell/recovery keys915; core/budgets913/UV914/frozen/
Multi1.0 remain pinned. Read docs/paint-colour-controls-915.md for owner audit.
Next DEVICE setRGB/HSB/hex, paint, picker sync and grey→colour/black→colour; mask
colour controls disabled; history/image placement remains accepted. Then independent
roughness DATA-resource + explicit scene transport foundation through authoritative
owners, followed by visible controls/preview; no sRGB blends for data/normal maps,
no arbitrary native-UV material metadata or new writer. Other material slots queued.

Local Node24.19.0 full regression **2581 PASS / 0 FAIL / 0 skipped**; existing905/906
nearby14PASS and new915 focused3PASS. Original colour brush/resource/history/UV/
image/export/Multi/frozen owners unchanged. Publication verification follows.


## .915 publication verified — 19 October 2026 (Brisbane)

Runtime6c094e8448dbbc324146af621a709b5581160e06; tested tree
 e0d4f532e7c2a558d585d155ac1052769c797f95. Uploaded13 exact blobs and identical
tested tree; main fetched/local equivalent tree aligned. Node24 local + Node22
hosted full2581PASS/0FAIL/0skip. TopologyCI39167551114/job117793558051 SUCCESS;
Pages39167550557/build117793559585/deploy117793690409 SUCCESS. Final12/12 checked
live shell/manifest/painter/new colour helper/recovery/core/UV/Multi/budget/surface
files byte-match source. Initial in-flight reads served914 and helper404 with proxy
timeout; fresh postdeployment complete graph matches915. Only painter/new helper,
three shell cache keys and reviewed fixture changed; all other algorithm pins retained.
All four continuity files current, user914PASS protected. This proof is docs only;
915 device colour/picker/grey-black recovery/paint gate pending. Next independent
roughness data-resource/transport foundation per docs/paint-colour-controls-915.md;
no extra material-channel parity or iPad performance claim inferred.


## .916 — compact left Paint + Object radial UV; .915 PASS — 2026-10-19

User915PASS protects linkedRGB/HSB/hex and prior paint/UV. User explicitly requests
Paint left/tidy because bulky UI obstructs mesh, plus dedicatedUV in Object radial.
This user direction takes priority over roughness work; audit only, no roughness
resource/schema changes made. Same tool-session-ui owner special-casesuv-paint as
left8px/top12px/272px bounded scrolling dock, keeps original footer/buttons intact,
skips wide action reparenting; next tool clears width and original centred placement
returns. Shared positioner/wide-layout732 unchanged. Painter re-groups SAME controls:
colour/size/opacity/layer/Add exposed; brush/RGBHSB/layer settings/masks collapsed,
image controls staged only; sticky UndoRedoDone. No pointer/brush/resource changes.
UV outer90°/230px added preserving other Object sectors; newuvToolsBtn launches SAME
Mesh Health UV owner inuv-tools session, titleUV and diagnostic nodes hidden. Projection/
workspace/history/payload/Close owners unchanged; Refresh stays visible. Mesh Health
mode hides UVs and retains repairs. UV-only reports skip health analysis and refresh
on context/history changes. Close old mode before switching IDs; original radial/
background close adapters includeuv-tools. No second editor/kernel/history.
Two new integration checks + updated original radial/workspace harness retain semantic
checks; full suite/publication follow. All6 changed owners+shell/recovery916; unchanged
paint core/budgets913/colour915/UV mapper914/Multi/frozen/modelling/shared layouts retained.
Read docs/paint-uv-layout-916.md. Next DEVICE left dock footprint/sections, paint/mask/
image placement; ObjectUV project/editor/Back/Close and Mesh Health repair regression.
Then resume independent roughness data-resource/explicit transport foundation.

Local Node24.19.0 final full **2583 PASS / 0 FAIL / 0 skipped**. Initial full run
caught two outdated test adapters:439 expected literal fixed Mesh Health ID,731
Sweep host omitted real DOM style property. Updated fixtures to dual ID and actual
host shape; kept all semantic/read-only/Sweep assertions. Focused9PASS, final full
2583PASS; no runtime Sweep or shared positioner changes. Publication/visual proof follows.


## .916 publication verified — 19 October 2026 (Brisbane)

Runtime3295032ca2bd89cf7c4a7de3b870656d765fcd2f; tested tree
5be85556700c13b08b8294e45082406f5e2b9759. All21 uploaded blobs/tree match tested
local source; fetched main/local equivalent tree aligned. LocalNode24 + hostedNode22
full2583PASS/0FAIL/0skip. TopologyCI39173064962/job117809986464 SUCCESS;
Pages39173064486/build117809988186/deploy117810083028 SUCCESS. Live13/15 checked
files byte-match, including shell/manifest and ALL6 changed runtime owners, recovery
version/wide layout/Multi/colour/UV mapper. Two UNCHANGED files (release-bootstrap,
shared positioner732) repeatedly proxy-timed-out on HTTP recheck; repository exact
bytes/pins retained and previously verified. No claim those two were fetched916.
Cloud browser loaded visible916 shell but WebGL context creation failed in unchanged
main854/Three renderer; therefore no mesh/radial/Paint rendered acceptance claimed.
Isolated test tab closed; no screenshot of a blank mesh returned as layout proof.
Actual session/UV owner semantics and native paint/image flows remain tested by Node;
iPad left-dock/section/scroll and UV navigation manual gate remains pending916.
All four continuity files + workflow user exception updated. User915PASS protected;
this proof changes docs only. Roughness audit read-only, implementation deferred.


## .917 — roughness data / project foundation; .916 user PASS — 2026-10-19

User916PASS protects compact LEFT Paint/sections/Done, colour/image Pencil cycle,
Object radialUV projection/editor/exit and Mesh Health repair baseline. Audit current
ddf240f6: only sRGB colour resources exist; imported scalar writers already own map
export. Add separate R8roughness resource16–512 axes, linear data/UV-v0-first/binding,
owned capture/encode/decode, committed read-only sharing convention. Exact schema,
canonical original project bytes, dedup4MiB unique/8MiB expanded and predecode budget/
ref validation. Scenev6 ONLY with roughness; mandatorycolourPaintVersion delegates
original colourv1–5 envelope to unchanged owners. Without roughness exact legacyJSON/
version retained. UV envelope stays UV-only; original32MiB file + colour budgets stay.
Original scene snapshot/restore/addMesh/single+Multi Duplicate share resource, edits
replace; atomic Open corruption and render failure retain scene/resources/history.
Join refuses scalar-only paint; linked nativeUV guard retained. Shared export mesh
resolver refuses roughness-bearing OBJ/GLB/NOM (including alongside colour) instead
of silently dropping unsupported channel. No writer/provenance/geometry/brush/UI
kernel added. Six new integration tests cover data bytes, all legacy colour transports,
quotas/refs/predecode/ownership, actual history/Duplicate/File/Open/rollback and writer/
Join refusals. Full suite/publication follow. Docs: roughness-resource-917.md.
Actual resource/codec/metadata/guard + complete parent/Lab graph917; painter UI only
parent pin, retains accepted916 left dock/UV access. Multi1.0/frozen/UV914/colour915/
brush/projection/layout/modelling kernels unchanged. No roughness controls/render/
export/layers/displacement parity claim. No new device roughness test possible yet.
Next original scalarPNG + NOM/GLB material export adaptation with async capture/binding/
combined material identity tests, then visible channel/preview through original painter.
Manual nearby: existing colour paint SaveOpen/Duplicate; do not ask synthetic R8 fixtures.

Local Node24.19.0 full **2589 PASS / 0 FAIL / 0 skipped**; six new917 checks and
all existing colour/UV/left-dock/paint/image/native regressions pass. Reviewed complete
parent/Lab cache graph, source stamps retained, protected Multi/frozen unchanged.
Publication evidence follows; no new roughness device UI or render claim.


### Build .917 publication verification

Runtime commit `30f39970f808a022af054f0e4505d20eaef39772`, tested tree `0b4dc5441f3399232a36cdddfb1e458567eb641c`, is published. Hosted Node 22 regression run 39194785838 (job 117875081484) passed all 2,589 tests, with zero failures or skips. Pages run 39194785560 completed successfully (deploy job 117875216536). All 25 checked live runtime, Lab, release and protected Multi files matched repository bytes. Protected .916 user PASS remains in force; no rendered roughness UI acceptance is claimed.

Hands-on .917 checks: paint a distinctive mark, Save .boxlab and reopen; duplicate a painted object, paint the copy, and Undo/Redo while confirming the original remains unchanged. Roughness has no controls yet; its resource/project/history foundation is covered by automated tests. Next narrow work remains scalar PNG and existing export-owner adaptation before visible roughness painting.


## .918 — roughness export through existing writers; .917 user PASS — 19 October 2026

User917PASS protects existing colour Save/Open, painted Duplicate isolation and
Undo/Redo. Audit main0f040ed2/.917: scalarPNG/native material slots/GLB material patch
already exist. Extend original paint-export capture with strict owned R8 copies
before await, existing native Base UV key/digest for both channels, and scalarPNG G
encoding (no gamma/flip/resample/factor bake). Original NOM roughness slot/factor1,
UV/polygon/container/name/dedup/24MiB budget retained. GLB G roughnessFactor1 and
metallicFactor0; image identity separate from combined colour+roughness material
identity so shared colour cannot merge distinct roughness maps. Scalar-only and
colour+scalar supported; unprepared sync native/OBJ/Join still refuse. No project
schema/history/brush/UI/kernel/provenance changes. Five actual writer/File/PNG/async/
binding/refusal/source-immutability regressions added; old917 async refusal updated
to stale-binding validation, other guards retained. Changed owners and recursive
parent/Lab cache graph918; protected Multi1.0/frozen/modelling and accepted Paint UI
retained. Read docs/roughness-export-918.md. Full validation/publication follow.
No roughness controls/preview yet; next original painter scalar channel integration.
Manual nearby: export differently painted original/copy to NOMAD and GLB, confirm
independent colour/UV placement; paint Save/Open/history remains protected917PASS.


User reminder — 19 October 2026: every build completion must explicitly state
whether there is something to test, with build/readiness and quick hands-on checks,
or clearly state no new hands-on test is needed. Reaffirmed in AI_WORKFLOW.md.


.918 final local validation: Node24.19.0 full **2,594 PASS / 0 FAIL / 0 skipped**.
Five new export integrations and all existing paint/image/UV/modelling checks pass.
Initial cache preparation accidentally repinned unchanged917 shell owners; regression
checks caught this, unrelated pins were restored, reviewed contract passed, and the
final complete suite above ran against corrected source. No bad graph published.
Multi1.0 and frozen betas unchanged. Publication verification follows.


## .918 publication verified — 19 October 2026 (Brisbane)

Runtime commit `57a53f93ffb8c9a194bb1baaccbb738ab0d8b924`, tree
`c15f998e6ecaa416e159bca959312370e419b048`, is published. Hosted topology
regression run `39232675588`, job `117994153957`, completed successfully;
Pages run `39232675125` completed successfully. The build's recorded local full
suite is 2,594 PASS / 0 FAIL / 0 skipped; this continuation verified hosted success,
without rerunning the local suite. All 19 checked live files byte-match main:
shell/manifest, every changed runtime and Lab file, and protected Multi1.0.
No runtime changes in this continuation and no .918 device PASS inferred.

The app is ready for testing — build .918. Export differently colour-painted
original/copy to NOMAD and GLB; check independent colour and UV placement. Repaint
the copy and repeat NOMAD export to confirm the original remains unchanged.
Roughness fixtures are automated; there are no roughness controls to test yet.
Next narrow build: visible roughness channel/preview through existing compact Paint,
raster/input/history owners, preserving scalar data semantics and existing exports.


## .919 — Roughness Pencil painting and grayscale inspection — 19 October 2026

User .918 PASS protects independent original/copy colour and UV placement in NOMAD
and GLB, including repaint/re-export isolation. Audit c005f107: .917 resource/project/
history and .918 original writers exist; no scalar channel in the painter. Extend
original viewport-paint-core and compact left UI only. Channel Colour/Roughness,
0–255 value slider, same size/hardness/opacity/pressure and BoxLab/Klecks samplers.
Opaque raster's raw-byte interpolation carries equal RGB values; publish owned R8
through original roughness resource/pool and scene checkpoint. White default =255;
0 smooth /255 rough. No gamma conversion or colour blend modes in scalar math.
Grayscale inspection is temporary and labelled; Done returns existing colour/Studio
appearance. No lit material roughness preview yet. New maps512²; valid other sizes
remain savable/exportable but painting refuses without resampling. Roughness channel
has no layers/masks/image operations; original colour controls disabled, restored
on Colour. Channel change cancels live contact/placement, never adds history.

Scalar identity joins existing async/current-state guards. Invalid/stale binding,
quota/checkpoint failure rolls back preview and leaves scene/shared resources intact.
Original single/Multi Duplicate, history, scenev6 Save/Open and NOM/GLB writers remain
owners. Only two painter modules and their shell pins change; new child references
use existing918 resource/pool pins. Multi1.0/frozen/modelling/render/export kernels,
Lab and brush sources unchanged. Six focused integration checks cover actual UI,
bytes/cancel/coverage, history/project, actual single+Multi Duplicate and GLB/native
PNG, quotas/rollback and stale/non512 refusals. Full validation/publication below.

Next DEVICE: Paint → Channel Roughness, paint value0 then255 elsewhere; inspect gray
map. Colour returns original paint; reselect Roughness to inspect retained map.
Done/Undo/Redo, Save/Open then Roughness; duplicate/repaint and export NOMAD to check
smooth/rough regions under lighting. No rendered/iPad performance acceptance inferred
from Node adapters. Next build: lit roughness preview through existing material/
surface lifetime owner, retaining accepted colour appearance where no scalar exists.

.919 final local validation: Node24.19.0 full **2,600 PASS / 0 FAIL / 0 skipped**.
Six new scalar integration checks pass; reviewed release contract5PASS and original
colour/mask checks retained. No runtime tests skipped, no protected/frozen changes.
Publication verification follows; actual iPad/grayscale/native-lighting gate pending.


## .919 publication verified — 19 October 2026 (Brisbane)

Runtime `76e48e3b4ee5dc73018e566a5f8a4b323ca3bac9`, tested tree
`e58d35ee563881ae74fefbb03c3cfbfe62f567b2`, is published. Connected Git Data
created the identical local tested tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39242723896` / job `118027165309` both pass
2,600 tests, zero failures/skips; hosted complete logs verified counts. Pages
`39242722754`, deploy job `118027373427`, completed all deployment steps successfully.
Ten fresh live files byte-match tested source: shell/version, both changed painter
owners, both recovery scripts, paint target, roughness resource/pool and Multi1.0.
Initial predeployment requests served918; final complete graph matches919.
Shell push lacked credentials; connected Git Data publication used expected-parent,
non-forced ref update. No protected/frozen/modelling/export/render changes.

All four continuity files are current; this proof changes docs only. User918PASS
protected. .919 iPad Pencil/grayscale/navigation/native-lighting acceptance pending;
no actual rendered proof inferred from Node adapters. Ready for hands-on checks in
this build's entry. Next lit material preview through existing surface/lifetime owner.


## .920 — lit roughness material preview — 19 October 2026

User .919 PASS protects Roughness0/255 Pencil painting, Channel/grayscale retention,
Undo/Redo, Save/Open and native smooth/rough map handoff. Audit fb7f928a: original
paint-target surface is unlit Basic, render-modes owns existing Studio/base lighting.
Extend SAME paint surface/lifetime; no new mesh, raycast, shader, light or history owner.
Paint Preview select offers Channel(default, preserving919) / Lit material. Existing
UI/input owner cancels active contact/placement on toggle; no scene/history metadata.
Live Standard material receives current flattened colour(sRGB) and roughness(linear
NoColorSpace/G), factor1/metalness0/white colour. Working roughness reads raw equal-RGB
bytes from original opaque raster; no gamma/factor bake, resampling or source writes.
Dirty updates coalesce with original frame tick; textures/materials reused until dispose.

Committed valid roughness displays lit after Done/rebuild in original Studio/Solid/
UV Image modes, active and inactive/locked objects. Scalar-only uses neutral white;
colour-only remains original unlit appearance unless explicit Paint Lit preview.
Both channel identities/UV binding checked after await; stale scalar is not sampled,
valid colour can retain Basic fallback. Malformed scalar/unsupported owners safely
fall back to original body; stale colour or all invalid channels dispose preview.
Existing diagnostic modes clear through same lifetime owner. All surface textures
are privately owned; dispose once on body/mode/session loss; original body restored.
Non-square16–512 committed data maps display without resampling (editing512² rule
retained). Auxiliary lit textures up to two512²RGBA buffers per surface, plus existing
channel surface and GPU copies; not a measured device-performance/memory claim.

Six focused integration checks cover exact data/sRGB/UV/material settings and lifetime,
scalar-only/colour-only/stale fallback, actual UI toggle/cancel/dirty coalescing, live
colour+scalar isolation/checkpoint rollback/body disposal, async/project/history and
actual render owner active/inactive/mode behavior. Node uses real Three materials,
geometry and pixels; no WebGL render, highlights, iPad latency or Nomad parity proof.
Same source resources/projectv6/brushes/export algorithms retained. Four changed
runtime owners plus recursive export/Lab cache graph; Multi1.0/frozen unchanged.
Read docs/roughness-preview-920.md. Full regression/publication evidence below.

Next DEVICE: Roughness → Preview Lit material; paint0 then255, orbit in Studio to
compare highlights. Channel returns retained grayscale, Lit returns colour/material.
Done keeps lit roughness; Save/Open and select a different object retain appearance.
Undo/Redo and duplicate isolation remain protected. Existing no-roughness colour
objects retain original look. Then audit remaining material slots, starting Metalness
resource/export/preview owners; keep stages narrow and data-aware, no parity claims.

.920 FINAL local validation: Node24.19.0 full **2,606 PASS / 0 FAIL / 0 skipped**.
Six new focused checks and all legacy semantics pass. Reviewed shell/cache-contract
5PASS; other export/Lab parent edits verified pin-only; protected Multi1.0/frozen intact.
Initial preparation run caught an incorrect temporary write target that replaced the
local HTML shell with cache-fixture JSON. Restored shell from main, applied only reviewed
pins/markers, corrected fixture destination, then reran the entire final suite above.
No malformed shell published and no behavior checks relaxed. Publication proof follows.


## .920 publication verified — 19 October 2026 (Brisbane)

Runtime `b3aae5266bcff0f206500d2e5fea278825e5cd41`, tested tree
`22b91cd354bb03f4acd9540adf4952b04a69b546`, is published. Connected Git Data
created an identical local tested tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39245427937` / job `118036074696` both pass
2,606 tests, zero failures/skips (hosted complete logs verified). Pages run
`39245427818` deploy job `118036289017` completed all deployment steps successfully.
All18 fresh live shell/version, four runtime owners, complete changed export/Lab
parent graph, recovery, protected Multi1.0, retained roughness resource/pool and
project codec files byte-match tested source. Initial predeployment reads served919;
final complete checked graph matches920. No frozen/modelling/brush/project/export
algorithm changes. Source scalar bytes/data semantics retained; no custom lights.

All four continuity documents updated; this proof is docs-only. User919PASS protected;
920 actual iPad highlights/material appearance/latency acceptance remains pending,
not established by Node Three material/texture tests. Ready for hands-on Paint
Roughness → Preview Lit material0/255/orbit, Channel return, Done/SaveOpen/selection
and existing no-roughness colour appearance. Next remaining material-slot audit
(Metalness candidate) follows device feedback, through original owners.


## .921 — metalness data/project foundation via shared scalar owners — 19 October 2026

User920PASS protects Lit/Channel roughness preview, highlights, Done/SaveOpen/selection
appearance and original colour-only look. Audit main05ddf085: imported NOM/GLB metalness
slots exist; editable resource/scene transport do not. Extract the accepted917 R8
validation/canonical byte codec and dedup/quota/predecode pool into shared scalar
owners; existing roughness API/descriptor/byte serialization/errors and4MiB unique /
8MiB expanded budgets retained. Metalness uses separate strict linear R8 descriptor,
16–512 axes, UV-v0-first, owned captures, read-only committed sharing. No RGB blending,
new brush/kernel/history/writer or metalness UI/preview delivered.

Explicit scenev7 ONLY when metalness exists: mandatorypaintProjectVersion1–6 delegates
existing envelopes, roughnessv6 retainscolourPaintVersion1–5. Without metalness original
legacy JSON/version retained exactly. Independent metalness pool4MiB unique/8MiB
expanded, original32MiB file and colour/roughness budgets retained. Complete resource/
ref/schema/size preflight before mesh creation; corruption/quota/unsupported owners
refuse atomically. Native UV envelope remains UV-only. Original history snapshots/
restore/addMesh/single+Multi Duplicate carry metalness by read-only reference; edits
replace. Original File Save/Open and render-failure scene/history rollback retained.
Join/linked operations and raw/async OBJ/GLB/NOM exports refuse metalness-bearing
objects, even alongside accepted colour/roughness, so pending channels cannot vanish.
No imported metalness export behavior changed; native paint export adaptation next.

Six new integrations cover codec ownership/channel separation, all six legacy formats/
exact removal/dedup, schemas/refs/quotas/owner guards, actual history+single/Multi
Duplicate, actual File Save/Open/corrupt/render rollback, all writer/Join refusals.
Existing917–920 scalar/paint/preview nearby23PASS. Complete reviewed resource/codec/
metadata/export/parent/Lab graph921; UI/render/brush algorithms unchanged. Multi1.0,
frozen betas and modelling kernels untouched. Read docs/metalness-resource-921.md.
Full regression/publication evidence below. No new metalness device feature yet.

No new hands-on test needed for921; user920PASS is protected. New foundation fixtures
are automated, never a synthetic iPad task. Next narrow build: captured metalness
through existing scalar PNG/NOM/GLB material owners, including combined colour+
roughness+metalness identities/async capture and data semantics. Then visible Pencil
channel and lit preview through existing compact Paint/material owners.

.921 final local validation: Node24.19.0 full **2,612 PASS / 0 FAIL / 0 skipped**.
Six new integrations + existing917–920 nearby23PASS; release contract5PASS.
All other changed JS parents verified pin-only; protected Multi1.0/frozen/modelling
and existing paint/preview/export algorithms retained. No behavior checks relaxed.
No new hands-on gate; user920PASS protected. Publication verification follows.


## .921 publication verified — 19 October 2026 (Brisbane)

Runtime `21ea62ebddef2a404b14e029fdb0744a1bd0862f`, tested tree
`f0d7a3f92abab520806a4ed5874f99f3b7cb25f2`, is published. Connected Git Data
created an identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39248074915` / job `118044791985` both pass
2,612 tests with zero failures/skips; hosted full logs verified. Pages run
`39248074813`, deploy job `118045052264`, completed all steps successfully.
All30 checked live files byte-match tested source: shell/version, every changed
runtime/parent/Lab file, four new scalar modules, recovery, protected Multi1.0 and
retained colour pool. Initial in-flight reads served920/new modules404; final whole
checked graph matches921. No protected/frozen/modelling/brush/preview algorithm changes.

All four continuity files current; this proof changes docs only. User920PASS protects
existing lit roughness/Channel/Done/SaveOpen/selection/colour appearance. Build921 is
complete; no new hands-on test needed because metalness controls/preview/export are
not exposed yet. Fixture transport/history/atomic Open and refusal checks are automated.
Next narrow build: captured metalness through original scalar PNG/NOM/GLB writers,
then original Paint channel/material preview. No metalness visual acceptance claimed.


## .922 — metalness export through original NOM/GLB owners — 20 October 2026

Continue authorized921 foundation; no new device PASS inferred. User920PASS remains
protected for paint/lit roughness/Channel/history/SaveOpen/selection/colour-only look.
Audit main2c438348: existing native metalness slot, scalar PNG, paint capture and GLB
material patch own required transport. Extend these owners; no new writer, schema,
metadata provenance, history, modelling/paint kernel or UI controls.

Capture owned metalness alongside colour/roughness/geometry/native UVs BEFORE await;
original Base target digest validates all channels. Native metalness uses original
lossless grayscalePNG + metalness slot/factor1; roughness factor1/default1 retained.
Original names/content dedup/polygon UV pool/container/24MiB aggregate budget remain.
GLB uses packed RGB data PNG G=roughness(or255), B=metalness, R=255, factors1; only
roughness retains accepted grayscale PNG/metallicFactor0. Same PNG RGB/filter/CRC/zlib
packager gets explicit no-colour-metadata path, not a canvas/gamma/resample encoder.
Packed pair cache plus original colour image cache and full material key distinguish
all colour/roughness/metalness combinations; shared exact resource pairs reuse images.
Absent colour remains white. Independent non-square maps remain exact in NOM; GLB
requires matching roughness/metalness dimensions and refuses rather than resizing.
New data rows remain UV-v0-first, no factor baking or sRGB metadata on scalar data.

Original File actions report metalness counts. Raw OBJ/unprepared sync native/Join
still refuse metalness; invalid descriptor/stale binding/evaluated/imported/linked
owners refuse. Async download captures never assign maps to source scene or native
UV metadata. Resource/projectv7/history/brush/UI/lit preview algorithms unchanged.
Complete changed PNG/export/parent/Lab graph922 only; Multi1.0/frozen unchanged.
Old921 async blanket-refusal assertions now check stale binding; raw guards retained.

Eight new integration tests cover actual NOM/GLB export+loader and File actions,
independent PNG CRC/zlib/channel bytes, combinations/dedup, metal-only defaults,
unequal-size refusal/NOM retention, async snapshots, invalid owners, original native
24MiB preflight AND final writer cap, PNG data-vs-colour metadata/ownership.
Native writer budget test imports its ACTUAL versioned paint-export dependency:
prepared WeakMaps are module-local, so an unversioned Node helper cannot prepare
another versioned module's writer. First fixture attempt hit the intended raw guard;
corrected test wiring, not the runtime guard. Read docs/metalness-export-922.md.
Full regression/publication evidence below; no renderer/Nomad appearance acceptance
inferred from Node adapters. No new hands-on test needed: metalness has no controls
yet. Next original Pencil scalar channel + material preview integration in narrow
stages, preserving existing colour/roughness and independent resource semantics.

.922 final local validation: Node24.19.0 full **2,620 PASS / 0 FAIL / 0 skipped**.
Eight new integrations and all existing paint/preview/modelling/import/export checks
pass; reviewed release contract5PASS. PNG data metadata path preserves old colour/
scalar semantics; source resource/project/history/UI algorithms and Multi/frozen
unchanged. No assertions excluded; old async refusal upgraded to binding contract.
No new hands-on gate; publishing verification follows.


## .922 publication verified — 20 October 2026 (Brisbane)

Runtime `e550ae539d3a59789de95c6b9d18b800f4a7eb27`, tested tree
`28860d5de9252cf60d31a11636082113f678bc95`, is published. Connected Git Data
created an identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39335979744` / job `118345461602` both pass
2,620 tests, zero failures/skips; complete hosted logs verified counts. Pages
`39335978411`, deploy job `118345671446`, completed all steps successfully.
All18 checked fresh live files byte-match source: shell/version, all five changed
export/PNG runtime owners and Lab parents, recovery, protected Multi1.0 and retained
scalar resources/project codec/painter UI/core/paint target. Initial in-flight reads
served921; final complete checked graph matches922. No frozen/modelling/brush/
project/history/preview algorithms changed; same native image budget and raw guards.

All four continuity files current; this proof is docs-only. Build922 complete and
published. No new hands-on test needed: editable metalness controls/preview remain
next; export fixtures and actual File actions are automated, no rendered/native
appearance acceptance inferred. User920PASS remains protected; no921/922 devicePASS
invented. Next original scalar Pencil channel, then existing material preview owner.

## .923 — Metalness Pencil channel and existing lit material preview — 20 October 2026

Audit main f2cc8a38 / .922: scalar resources, codec/history/duplicate and native/GLB
writers already exist; expose them through original compact LEFT Paint and surface
owners. Shared scalar configuration reuses accepted raster, quota/checkpoint and
cancellation paths. Metalness starts black0, brush defaults255; opaque raw equal-RGB
working bytes publish independent linear R8 only. Colour/masks/images stay disabled
while editing either scalar; returning Colour restores existing controls/layers.
Non512 retained maps refuse painting rather than resampling. All identity/binding,
body lifetime, budget and checkpoint refusal rules retained.

Existing surface owns separate linear roughness G and metalness B textures; metal
factor1 with a map, default0 otherwise. Existing lighting/UVs/colour sRGB remain.
Live dirty uploads coalesce; switching Channel/Lit or scalars cancels contact without
history. Committed active/inactive/locked overlays use same owner; disposal frees maps.
No new brush/kernel/writer/history owner, lights, environment, or modelling changes.
Reverse loader/cache graph reviewed and pinned923; protected Multi1.0/frozen intact.
13 new integrations cover UI/raw0/255/opacity/no-op, cancellation, quota/checkpoint,
identity/stale/non512, history/SaveOpen/single+Multi Duplicate, actual NOM/GLB bytes,
linear B material, map independence/lifetime and active/inactive render ownership.
Existing roughness/mask nearby19PASS. Read docs/metalness-paint-923.md.

User920PASS remains protected; /nextbuild alone is not921/922/923 device acceptance.
DEVICE923: Metalness0/255 Channel/Lit, low Roughness highlights, independent channels,
Done/SaveOpen, UndoRedo and duplicate isolation; native Nomad material sanity check.
Next: respond narrowly to923 device feedback before adding more material channels.

.923 local validation: Node24.19.0 full **2,633 PASS / 0 FAIL / 0 skipped**;
13 new integrations, nearby roughness/mask19PASS and release contract5PASS.
No existing assertions relaxed; protected Multi1.0/frozen/modelling unchanged.
Publication/hosted regression/live-byte verification follows. Device923 pending.

## .923 publication verified — 20 October 2026 (Brisbane)

Runtime `e505f232856a7d6581368de7f7cf29e45cc514da`, tested tree
`342c4ca1282a98ab95abfe65a66bccdc311ac757`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39337186659` / job `118349490286` both pass
2,633 tests, zero failures/skips; complete hosted logs verified. Pages run
`39337186074`, deploy job `118349698451`, completed all steps successfully.
All19 fresh live files byte-match source: shell/version, every changed runtime/
export/parent/Lab file, recovery, protected Multi1.0, retained scalar resources/
metalness pool and project codec. Initial in-flight reads served922; final complete
checked graph matches923. No frozen/modelling/lighting/UV or writer algorithm changes.

All four continuity files current; this proof is docs-only. Build923 complete and
ready for hands-on Metalness0/255 Channel/Lit, low Roughness highlights and independent
channels, Done/SaveOpen, UndoRedo and duplicate isolation. Optional native Nomad
appearance sanity check. Actual GPU highlights/Pencil latency and923 device acceptance
remain pending; user920PASS protected, no921/922/923 devicePASS inferred.
Next: respond narrowly to923 device feedback before another material channel.

## .924 — UV workspace layers contained beneath main toolbar — 20 October 2026

User reports intermittent missing TOP-RIGHT MAIN APP buttons during UV Editor;
clarified these are Frame/UndoRedo/Focus/Objects/VIEW, not UV-local controls.
Audit main553ba061: no UV action deliberately hides the toolbar. Header stacking
context is10; viewport had no stacking context, allowing workspace180 to overpaint
header descendants (including VIEW dropdown200 trapped inside header10).
Add one active-UV-only isolation rule in original uv-workspace stylesheet: viewport
contains its own layers while visible workspace exists. Original header remains
above it; closing/hiding UV automatically removes containment. No z-index arms race,
DOM replacement, event/pointer/history/model/UV/paint algorithm changes. Refresh
UV workspace + Mesh Health loader and shell/recovery924; unrelated pins retained.

Source layering defect identified; exact intermittent iPad button disappearance
not reproduced. Cloud main WebGL creation fails (same known environment limitation),
so no full-app rendered acceptance claimed. Synthetic data-URL layout experiment
blocked by browser URL policy; no workaround attempted. Nearby workspace navigation/
history/lifetime/background/Focus + release20PASS. Initial prep contract caught an
over-broad shell pin replacement; restored unrelated pins before final validation.
No tests weakened, no user923PASS inferred; user920PASS and protected Multi1.0/frozen
remain. DEVICE: repeatedly enter/exit UV, pan/pinch/edit/UndoRedo, check top-right
buttons and VIEW dropdown while inside UV and after Back to3D. If disappearance
persists, obtain screenshot and exact trigger before more presentation changes.
Metalness923 device gate still pending. Next:924 device feedback, narrow repair only.

.924 final local Node24.19.0 regression: **2,633 PASS / 0 FAIL / 0 skipped**;
nearby UV/workspace/history/Focus/background/release20PASS. Final source contains
only active-UV isolation + reviewed loader/release pins; no assertions relaxed.
No rendered/device disappearance acceptance inferred; publication proof follows.

## .924 publication verified — 20 October 2026 (Brisbane)

Runtime `97a4d9e118e8a2bc71b66b90e393eec3818dc264`, tested tree
`0413e5a8253f822d93154f1e4d145b69f0bb97f6`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39338873374` / job `118355146518` both pass
2,633 tests, zero failures/skips; complete hosted logs verified. Pages
`39338872454`, deploy job `118355375163`, completed all steps successfully.
All16 fresh live files byte-match source: shell/version, UV workspace/Mesh Health
loader, recovery, protected Multi1.0, original header/toolbar/view CSS and owners,
painter, retained scalar resources/pool and project codec. Initial in-flight reads
served923; final checked graph matches924. No UV/model/paint/history/input algorithm
changes; only one active-UV CSS rule and reviewed release/cache references.

All four continuity files current; this proof is docs-only. Build924 complete and
ready for iPad retest: repeatedly enter UV Editor, pan/pinch/edit/history, use VIEW,
then Back to3D; confirm main top-right buttons remain visible and usable. Source
layering issue repaired; exact intermittent Safari disappearance still needs this
device confirmation. Cloud main WebGL unavailable, no full-app rendered proof.
If it persists obtain screenshot and exact trigger before further UI changes.
User920PASS protected;923 Metalness device gate still pending, no inferred PASS.

## Device feedback — .924 toolbar PASS; Metalness FAIL — 20 October 2026

User: “PASS for the fix.” Protect .924 main top-right toolbar visibility through UV
Editor; keep active-UV viewport isolation and original header/action owners intact.

Metalness is NOT accepted: user reports whole model black in Channel, white draws
black / black draws white, Lit paints black, and no metal channel in export.
Treat all reported symptoms as an open device failure; do not infer Metalness PASS
from the separate toolbar acceptance. No speculative inversion or resource migration.

Audit current009d45f3: slider forwards integer0–255 directly; scalar raster publishes
raw R8 independent of colour; Channel uses grayscale; Lit samples B with factor1;
existing native slot and GLB packed B receive captured metalness. Rerun actual UI/
painter/history/duplicate/preview/export suites:21PASS/0FAIL/0skip. Those fixtures
write255 white/0black and contain exact metalness in NOM/GLB, so they do NOT yet
reproduce user failure. Lit material/scene have no reflection environment; possible
dark-metal appearance contributor, NOT a confirmed diagnosis of all symptoms.
Cloud GPU limitation still prevents rendered-device reproduction.

Next required evidence: affected .boxlab project and its exported .nom, plus screenshot
with Channel/Preview selector and Value visible. Trace exact authored bytes/binding,
actual exported slot/factors and displayed preview before changing slider semantics.
Do not dismiss report because fixtures pass. Keep original owners; no parallel material
or brush implementation. Runtime remains924, no new build or new manual gate yet.

## .925 — painted metal Lit preview reflection input — 20 October 2026

User clarified with924 screenshots + METAL TEST.boxlab/.nom: Channel255 draws white
correctly; metal exports perfectly in Nomad. Smooth metallic patches turn black in
BoxLab Lit, including when Roughness0 is painted over metal. Prior suspected byte
inversion/export loss are superseded by concrete evidence. Decoded actual project
has independent512² colour and metalness; metal contains0–255. Actual native material
has color+metalness, metalness/factorMetalness1; exported grayscalePNG matches EVERY
project metalness byte exactly. Supplied project predates shown roughness edit; no
roughness map present in that snapshot, not proof of dropped roughness. Uploads remain
unmodified and are not copied into runtime/repository.

Root source omission: Standard painted metal had no scene/material reflection input.
Direct lights give narrow highlights; smooth metal can otherwise show black. Keep raw
0/nonmetal /255metal semantics and existing writers. Original surface/lifetime owner
now acquires a local room PMREM only for metallic Lit material with no existing scene
environment. Original Three179 RoomEnvironment + PMREMGenerator,128cube size, no HDR
network fetch, custom shader or added live-scene lights. Independent envMap per material
uses shared per-renderer/refcount pool; generator/room temporary assets disposed after
creation, render target freed exactly once after last surface. Channel holds accepted
unlit map, colour/roughness-only paths unchanged; explicit scene environment respected.
Source paint/UVs/history/projects and export factors/maps unchanged. No inverted-slider
workaround, source migration or scene-global lighting change.

3new regressions cover original surface binding of reflection+exact scalar channels,
Channel/Lit reuse/source preservation, colour-only/custom environment isolation,
multiple surfaces/reference lifetime, renderer separation and failed-generation retry.
Nearby new+roughness/metalness/export30PASS, release5PASS; full/publication below.
Cloud GPU cannot render actual main; fake target verifies ownership only, not GPU look.
Official API: threejs.org/docs/pages/RoomEnvironment.html and PMREMGenerator.html;
pinned installed Three179 source verified supports fromScene options.size.

User924 toolbar PASS protected; current runtime correction only painted material
reflection path and reviewed reverse loader graph925. Metalness authoring/exports
are confirmed by user clarification,925 visual acceptance pending. DEVICE: reopen
saved painted cube, Lit + Metalness255 and Roughness0, orbit; should reflect studio
panels rather than solid black. Compare Roughness255, Channel0/255, Done/reopen and
NOMAD export. Next respond narrowly to925 visual feedback before new channels.

.925 final local Node24.19.0: **2,636 PASS / 0 FAIL / 0 skipped**;
nearby30PASS and release5PASS. Actual supplied NOM/project metalness compared byte
for byte: identical. No test assertions relaxed; no source/user file modifications.
Protected924 toolbar and Multi1.0/frozen retained. Publication proof follows;
real GPU/925 iPad reflection appearance still pending.

## .925 publication verified — 20 October 2026 (Brisbane)

Runtime `597659e1889220b0a209c1028ec518cb526023c5`, tested tree
`760f3a6e749949ced660cf536d5ead98daff0829`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39362761751` / job `118432489899` both pass
2,636 tests, zero failures/skips; complete hosted logs verified. Pages
`39362761578`, deploy job `118432624041`, completed all steps successfully.
All20 fresh live files byte-match source: shell/version, new reflection helper,
original paint surface and every changed runtime/export/parent/Lab file, recovery,
protected Multi1.0, retained scalar/project owners and accepted924 UV isolation.
Initial in-flight reads served924/new helper404; final checked graph matches925.
Only painted material reflection behavior changed; native/GLB algorithms and source
scalar values retain exact accepted bytes. Supplied project/native files unmodified.

All four continuity files current; this proof is docs-only. Build925 complete and
ready for iPad Lit material metal255/roughness0+orbit reflection check, rough255
blur comparison, Channel0/255 and Done/SaveOpen. Existing Channel and native export
confirmed correct by supplied files/user clarification, not reversed. Real GPU
reflection appearance and latency remain device-pending; Node PMREM target adapter
verifies binding/sharing/lifetime only. User924 toolbar PASS protected.
Next:925 visual feedback, narrow fixes before further material-channel work.

## .926 — whole-object Tap Fill; requested brush roadmap — 20 October 2026

User925 feedback: reflections still not visible in BoxLab preview; Nomad export
“great” and protected.925 visual fix is NOT accepted. No further speculative lighting
change in926; preserve raw maps and correct native handoff. Need actual925/926 preview
version/state or renderer diagnostics before claiming another reflection repair.
User requests Tap to Fill, alpha compatibility, delete-paint/eraser, blur and smudge.
Clarified Tap Fill default WHOLE OBJECT, selected layer/channel, not island/flood region.
Audit existing raster/input/stack/history and prior Klecks integration audit first.

Original raster now shares exactly the same coverage/opaque/straight-alpha texel
operation for brush and fill. New Tool selector Brush / Tap fill · whole object.
Pencil/mouse down must hit visible selected mesh; whole512² selected layer/channel
previews at current opacity/value, release commits once via original finish/preflight/
checkpoint/COW. Size/pressure do not limit fill. Drag>8px, pointercancel/tool/channel
switch/body loss cancel; fingers still navigate, background contacts never fill.
Colour/image/hidden-layer/scalar eligibility guards retained; image colour remains
read-only, editable masks fill normally. No-op adds no history; quota/checkpoint
failure restores original resource/preview/navigation. No schema/writer changes.

4new integrations: exact shared raster coverage/alpha/no-op/cancel; actual UI layer
fill and source preservation/UndoRedo/SaveOpen/native PNG; independent scalar+mask
fill; mesh miss/finger/drag/cancel/settings/body-loss/checkpoint rollback. Nearby19PASS;
full and publication below. Original brush expectations retained, no frozen/Multi/kernel
changes. Reviewed shared raster/main+Lab reverse cache graph926 only.

Remaining requested brushes are accepted roadmap, not delivered buttons: eraser
(transparent overlays/masks; explicit Base reset semantics), alpha tips (bounded PNG
coverage/rotation with original brush), blur and smudge with UV-island/seam-aware
sampling so neighbouring atlas islands cannot contaminate unrelated surfaces.
No ABR import or general Nomad brush-format compatibility promised. Prefer audited
Klecks algorithms in existing raster/input/history over another painting engine.
Next narrow build: reflection diagnostic evidence plus eraser/alpha implementation;
keep blur/smudge scope bounded and test before exposing. No new material channel work.
DEVICE926: choose Tool Tap Fill, tap mesh with chosen colour; UndoRedo. Fill an overlay
at50% opacity; confirm underlying paint retained. Fill Roughness/Metalness0/255 and
check Channel/export independence; switch Brush and confirm normal Pencil strokes.

.926 final local Node24.19.0 regression: **2,640 PASS / 0 FAIL / 0 skipped**;
new fill4PASS, nearby19PASS, release5PASS. Initial preparation contract caught shared
Lab raster omitted from loader closure; complete main/Lab graph reviewed and updated
before final run. No assertions relaxed; protected Multi1.0/frozen/export retained.
Reflection925 remains user-reported unresolved, no lighting fix claim in926.
Publication and hosted/live verification follow.

## .926 publication verified — 20 October 2026 (Brisbane)

Runtime `3b01bce1d66b7a06b2286565811f5e67962ab91f`, tested tree
`e606147e30b8f86de7b009b25c31af536963edec`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39365018326` / job `118439759937` both pass
2,640 tests, zero failures/skips; complete hosted logs verified. Pages
`39365017500`, deploy job `118439889747`, completed all steps successfully.
All19 fresh live files byte-match source: shell/version, main painter/core, shared
raster and complete changed Lab session/loader graph, recovery, protected Multi1.0,
retained scalar/codec/native export/paint export/material/reflection/UV owners.
Initial in-flight reads served925; final checked graph matches926. No frozen,
modelling, project or export algorithm change; original brush semantics retained.

All four continuity files current; proof is docs-only. Build926 complete and ready
for Tool → Tap fill · whole object: tap colour fill/UndoRedo, overlay50% preservation,
scalar0/255 independence and return to Brush. Alpha tips, eraser, blur and smudge are
requested pending stages, not implemented. Reflection preview remains user-reported
unresolved despite925, no new lighting repair claimed. Nomad export confirmed great
and protected;924 toolbar PASS protected. Next:926 device feedback, narrow eraser/
alpha additions and evidence-led preview diagnosis through original owners.

## .927 — explicit scalar label rows and Eraser — 20 October 2026

User926PASS protects whole-object Tap Fill/opacity/history/channel workflow. Screenshot
identifies earlier metal white/black confusion as inline hint text joining readout:
“255Black…” / “0Black…”. No inverted bytes. Shared scalar controls now grid rows:
label + flexible slider + fixed3ch readout, then separate block hints. Explicit
0=non-metal(black)/255=metal(white); roughness0=smooth(black)/255=rough(white).
Help cannot sit beside numeric output. Compact LEFT dock/scroll/footer retained.
No scalar/data/export/light semantic change; reflection925 remains separate unresolved
report, not implied PASS from926 or this clarification. Native export protected.

Next requested narrow brush: original Tool selector gains Eraser. Same samplers,
pressure/size/hardness/maximum per-contact coverage and existing commit/checkpoint/
COW/pools. Transparent colour overlays reduce alpha only, retaining RGB/source/base;
Base resets white. Roughness resets255, Metalness0, masks reveal (raw0 if inverted,
255 otherwise). Original image colour stays retained/read-only; erase its mask.
No scene/material opacity, destructive image baking or deletion of layer/resource.
Colour controls disable for Eraser and restore on return; colour brush setting retained.
Cancellation/settings/body-loss/failed checkpoint retain original pixels/history.
Original Brush and accepted Tap Fill retain semantics; no new pointer/history owner.

3new integration tests cover alpha coverage/RGB/no-op/cancel; actual UI overlay/Base
isolation + UndoRedo/SaveOpen/exact composed native PNG; defaults/mask inversion/
scalar independence and refusal rollback. Existing fill/roughness/metalness/mask23PASS;
full/cache/publication below. Shared main/Lab raster reverse graph repinned927 only;
protected Multi1.0/frozen/modelling/UV/project/native writer unchanged.
DEVICE927: read Metalness0/255 hint below slider with no joined text; erase a painted
overlay to reveal lower paint, UndoRedo; erase Base/scalars, switch Brush/Fill back.
Alpha PNG tips next, UV-safe blur/smudge remain queued. Reflection diagnosis remains
open and should use device/version/renderer evidence, no further lighting guesses.

.927 final local Node24.19.0: **2,643 PASS / 0 FAIL / 0 skipped**;
3new eraser integrations, nearby23PASS and release5PASS. No tests relaxed.
Protected926 Fill/924 toolbar/native export/Multi1.0/frozen retained. Scalar mapping
unchanged; layout/device confirmation and Eraser hands-on gate pending.
Publication/hosted regression/live verification follows.

## .927 publication verified — 20 October 2026 (Brisbane)

Runtime `2fab3eb743d00acdfb93c053957ad1d9be8f6f68`, tested tree
`c97a8423f236aec542b314541b9a9529847b0413`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39369984553` / job `118455433985` both pass
2,643 tests, zero failures/skips; complete hosted logs verified. Pages
`39369984116`, deploy job `118455588608`, completed all steps successfully.
All19 fresh live files byte-match source: shell/version, painter/core/shared raster,
complete changed Lab graph, recovery, protected Multi1.0, retained scalar/codec/native
and paint export/material/reflection/UV owners. Initial in-flight reads served926;
final checked graph matches927. No frozen/modelling/UV/project/writer changes.

All four continuity files current; proof is docs-only. Build927 complete and ready
for label separation/explicit0-255 meaning and Tool Eraser overlay reveal/UndoRedo,
Base white/scalar defaults and return to Brush/accepted Tap Fill. Actual iPad text
layout and Eraser feel remain device-pending; automated tests are not visual proof.
User926 Fill and924 toolbar PASS protected; native export correct. Alpha PNG tips
next; UV-safe blur/smudge pending. Reflection925 remains independently unresolved,
not a slider inversion or an inferred PASS from the corrected help text.

## .928 — Paint stays open across Undo/Redo — 20 October 2026

User .927 PASS protected: scalar hint layout and Eraser, alongside .926 Fill and
.924 toolbar. Requested history gesture fix takes priority over PNG alpha tips.
Audit: original main doUndo/doRedo restores scene/body and painter closes on disposal;
Paint footer also explicitly closed. Original history owner now brackets restoration
with painter preparation/resume. Cancel transient stroke/image before capture, close
old display, reopen on rebuilt active body; retain layer if present, channel/mask if
valid, Lit/Channel preview and existing brush/action/slider controls. No duplicate
history or gesture owner/checkpoint. Empty history and rapid repeated history retain
Paint; Done/other session/object changes defeat stale reopen. Original two/three-finger
gestures, toolbar and footer share this path. Five regressions execute original main
Undo/Redo and touch-end functions with real scene snapshots, paint resources and UI.
Reflection preview remains unresolved; native Nomad export remains correct. Alpha
PNG tips next, UV-safe blur/smudge pending. Device .928 acceptance pending.

.928 local Node24 full regression: **2,648 PASS / 0 FAIL / 0 skipped**;
five new history regressions and reviewed release contract5PASS. Protected Multi1.0
and frozen builds unchanged. Publication/hosted/live-byte verification follows.

## .928 publication verified — 20 October 2026 (Brisbane)

Runtime `6584f8d060dbbe8a52f901d814d655cece4209ba`, tested tree
`e554ccf0c77018eb4b3fd4134ab80f50a8bddd90`, published through connected Git Data
with the exact locally tested tree; fetched origin/main matched and working tree clean.
Local Node24 and hosted Node22 regression run `39373206187`, job `118465435842`,
both **2,648 PASS / 0 FAIL / 0 skipped**; full hosted log totals verified. Pages run
`39373205537`, deploy `118465573202`, completed successfully. All17 checked fresh
live files byte-match: shell/version, changed main/painter, recovery, unchanged paint
core/raster/scalar/project/export/reflection/UV and protected Multi1.0. Frozen builds
unchanged. All four continuity files current; this proof is documentation-only.

Build928 complete and ready for two-finger Undo / three-finger Redo while Paint stays
open, continued Pencil strokes, retained channel/preview/brush controls and original
Paint footer history. Done still closes. User927 PASS protected; actual928 iPad
acceptance pending. Reflection preview remains independently unresolved; native export
correct. Next bounded PNG alpha tips; UV-safe blur/smudge pending.

## .929 — PNG alpha brush tips; .928 user PASS — 20 October 2026

User .928 PASS protects Paint staying open across two/three-finger and footer
Undo/Redo, retained controls and continued Pencil strokes. Audit main5ee8bb54:
original shared raster/input/history already own brush and Eraser; no custom tip
importer/sampler. Add bounded PNG coverage through those SAME owners, reusing907
image preflight/decode. Brush settings: Load alpha PNG / rotation / Round tip.
PNG≤256²/256KiB, luminance×alpha coverage; white paints, black/transparent skips.
Owned R8 tip≤64KiB, copied per contact; top-first/aspect-preserving rotated bilinear
sampling in UV texels. Alpha replaces round hardness, original pressure/opacity cap/
source-over/erase/cancel retained. Whole-object Fill ignores tip. No new pointer,
history, paint-resource/project/native writer or modelling kernel. Tips/rotation are
session preferences, retained through928 reopen but not saved in.boxlab. Marks persist.
Late/invalid imports retain previous tip and committed work; original decode cleanup.
Read docs/paint-alpha-929.md. Four focused tests cover limits/cleanup/coverage ownership,
rotation/aspect/cancel/erase, real UI/history/project/native PNG and async refusal.
Original shared raster reverse main/Lab cache graph929 reviewed; Multi1.0/frozen intact.
Reflection preview remains unresolved, native export correct. Alpha device gate pending.
Next device alpha feedback, then UV-safe blur/smudge; viewport/baked AO and Edge-based
seam-authoring remain queued for existing-owner audits, not delivered features.
Validation/publication evidence follows; no rendered or device performance claim.

.929 final local Node24.19.0: **2,652 PASS / 0 FAIL / 0 skipped**.
Four new alpha tests and original nearby18PASS; release/cache checks included.
No assertions relaxed. Shared raster main/Lab reverse graph929 reviewed; Multi1.0
and frozen builds unchanged. Publication/hosted/live verification follows.

## .929 publication verified — 20 October 2026 (Brisbane)

Runtime `c9f29fa240fa87a4a3310138058b1cc6f906e58a`, tested tree
`cafdf77c8cdcf612f411659ea1ff953b5ade692f`, published via connected Git Data.
All18 uploaded blobs and tree match locally tested source; fetched main identical.
Local Node24 and hosted Node22 regression39409570949/job118583708420 both
**2,652 PASS / 0 FAIL / 0 skipped**; full hosted logs verified. Pages39409570873,
deploy118583935503 completed successfully. All16 fresh checked live files byte-match:
shell/version, every changed runtime/Lab owner, recovery, protected Multi1.0,
retained image importer/export/paint surface. Frozen builds unchanged.

All four continuity files current; proof is documentation-only. Build929 complete
and ready for Brush settings → Load alpha PNG≤256²/256KiB, rotate/paint/overlay
Eraser, UndoRedo and continued painting, Round tip, SaveOpen/export retained marks.
User928PASS protected;929 visible/Pencil/picker/latency acceptance remains pending.
Reflection preview independently unresolved; native exports correct. Next alpha
feedback then UV-safe blur/smudge; AO and Edge seam audits queued, not implemented.

## .930 — solid Object-mode display, no modelling cage — 20 October 2026

User requests removing the distracting Object-mode X-ray, especially while painting.
Audit current6ce62fe3/.929: main addCage uses depthTest:false neutral axis-line material
for every selected Object edge, drawn over solid body/paint. Actual VIEW X-Ray is a
separate explicit diagnostic mode; do not confuse it with this automatic cage.
Original cage batch gets optional showEdges(defaulttrue); main passes false in Object,
showVertices remains Vertex-only. Surface cage geometry/batches are not allocated; isolated loose edges remain
visible with ordinary depth-tested edgeMaterial so wire-only objects do not vanish;
original invisible indexed edge/vertex picking proxies/bridge registry remain intact.
Mirror cage is also omitted in Object; active SubD no longer evaluates spare mirrored
base solely for that omitted wire. Original evaluated surface and its geometry cache
are unchanged. Vertex/Edge/Face restore their original cages and material/order/selection
semantics. Clean/Soft, Multi/group tints, gizmos, history, brush/paint/material/export
owners untouched. Explicit VIEW Wire/X-Ray modes retain deliberate user control.
No frame-rate or broad memory claim; removed visual cage draws/allocation only.

Two new native-owner tests cover Object↔component transitions, absent visual batches,
actual Three raycast proxy IDs/disposal, mirrored SubD base-call counts and exact solid
geometry. Existing810/851 Object visual-cage expectation replaced by new user request;
all component/proxy assertions retained. Existing850/809/812 render fixtures now supply their real selectionMode='face'
dependency;809 Object loose-wire material expectation follows the new depth-tested
policy, all component/geometry/metadata/enumeration assertions retained. No production
fallback or weakened cache/timing checks.
Focused cage/cache/timing/release29PASS and earlier paint-history/tint/cage24PASS.
Legacy809 loose-wire normalization inspects a CLONE: original loose edges() can add
its historical faces[-1] sentinel. Original source-preservation assertion retained.
Only main/cage batch and shell/recovery cache930; Multi1.0/frozen unchanged. Alpha929
manual gate not inferred PASS. Reflection preview independently unresolved; exports correct.
Next DEVICE Object orbit/paint no through-cage; component cages return; Multi/gizmo and
Paint UndoRedo stay intact. Then resume alpha feedback/UV-safe blur/smudge; AO/seams queued.
Full validation/publication follows; no rendered/iPad proof inferred from Node.

.930 final local Node24.19.0 regression: **2,654 PASS / 0 FAIL / 0 skipped**.
Focused native cage/cache/timing/release29PASS; original surface/proxy/metadata,
history/paint/alpha/image/native export assertions retained. Only superseded Object
visual cage and depth-tested loose-wire expectations changed. Multi1.0/frozen intact.
Publication/hosted/live verification follows; iPad display acceptance pending.

## .930 publication verified — 20 October 2026 (Brisbane)

Runtime `defbd5b79b89166aaef3a8e479ab09e6bce1df63`, tested tree
`d4234bfa273e1640ff515b9937f016f0849efb24`, is published. Connected Git Data
uploaded all13 exact local blobs/tree; fetched main has identical tested files.
Local Node24 and hosted Node22 regression39411220064/job118589175903 both pass
**2,654 tests / 0 failures / 0 skipped**; complete hosted logs verified. Pages
39411219467/deploy118589389324 completed successfully. All11 checked fresh live
files byte-match: shell/version, main/cage batch, recovery, protected Multi1.0 and
unchanged painter/raster/render/material surface. Frozen builds unchanged.

All four continuity files current; this proof changes documentation only. Build930
complete and ready for Object-mode solid orbit/paint without automatic through-cage,
Vertex/Edge/Face cage restoration, Object return and Paint UndoRedo/continued marks.
Loose wire geometry remains depth-tested; original picking/bridge/cache owners intact.
No measured FPS claim or rendered iPad acceptance inferred. User928PASS protected;
929 alpha gate remains pending. Reflection preview remains independently unresolved;
native exports correct. Resume alpha feedback then UV-safe blur/smudge; AO/seams queued.

## .931 — Blur within original polygon faces; .930 user PASS — 20 October 2026

User930PASS protects solid Object display/component cages and Paint/history. Audit
maina9f2a10d: original UV inspector owns islands, exporter owns triangle emission;
no neighbour brush exists. First Blur clips BOTH reads and writes to picked polygon
face; never samples adjacent atlas faces. Original preview builder gains opt-in frozen
triangle→source-face metadata from its existing emission loop (group order retained).
Default previews/export bytes unchanged. Painter requests map; new small filter-domain
raster labels original geometry,512²,2M scanned budget. Sampled interior overlaps,
out-of-tile/degenerate/unsupported UVs refuse atomically; ambiguous borders excluded.
No new triangulation/signature/UV editor/input/history/resource/writer owner.

Tool Blur · within face uses original raster, samplers, raycast and commit/rollback.
Fixed five-tap centre4/cardinal1 smoothing of stroke-start pixels; face-only reads and
writes, renormalized clipped weights. Maximum per-contact coverage/opacity retained;
lift/repeat for stronger smoothing. Same size/pressure/hardness/alpha tips. Transparent
layers use premultiplied RGBA filtering/interpolation to avoid hidden-colour halos;
scalar/mask raw values stay independent. Colour picker ignored/disabled. Base/layers/
masks/Roughness/Metalness work; retained image colour remains read-only. No across-face
or seamless/world-radius claim, no Smudge yet. Original scene checkpoint/COW/pools,
SaveOpen/NOM/GLB and Paint history928 remain; domain1MiB/session+1MiB/contact is transient.
Read docs/paint-blur-931.md. Five new regressions + nearby21=26PASS; release5PASS;
full/publication below. Complete changed main/export/Lab reverse loader graph931;
Multi1.0/frozen and accepted930 main/cage bytes unchanged. Alpha929 device gate not
inferred PASS. Reflection remains unresolved; native export protected. Next DEVICE
hard-edged mark→Blur brush/lift/repeat, overlay isolation, UndoRedo/continue, then
similarly bounded Smudge. AO and Edge-seam audits remain queued, not delivered.

.931 final local Node24.19.0 regression: **2,659 PASS / 0 FAIL / 0 skipped**.
New Blur5 + nearby21=26PASS, release5PASS; no existing assertions relaxed.
Default export/preview geometry and accepted930 main/cage/protected Multi/frozen bytes
unchanged. Publication/hosted/live verification follows; actual iPad Blur gate pending.

## .931 publication verified — 20 October 2026 (Brisbane)

Runtime `0226dc19bdb401b4851bb9d84ee95acb8785b957`, tested tree
`ed0b12770fc595035fbfebd435d398ac77d59e97`, is published. Connected Git Data
uploaded all17 exact local blobs/tree; fetched main matches tested source.
Local Node24 and hosted Node22 regression39416319307/job118606105355 both pass
**2,659 tests / 0 failures / 0 skipped**; complete hosted logs verified. Pages
39416319079/deploy118606303731 completed successfully. All18 fresh checked live
files byte-match: shell/version, every changed runtime/export/Lab owner, new filter
domain, recovery, accepted930 main/cage, protected Multi1.0 and retained paint surface/
export/image projector. Frozen builds unchanged. No assertions relaxed.

All four continuity files current; this proof changes documentation only. Build931
complete and ready for Tool Blur within face on a hard-edged painted mark, larger
Size, lift/repeat for stronger smoothing; overlay/channel isolation and UndoRedo stay
in Paint, return Brush and continue. SaveOpen/native export retains results. User930
PASS protected; actual931 appearance/Pencil feel/latency and929 alpha gate pending.
No rendered/iPad performance claim. Reflection preview independently unresolved;
native exports correct. Next Blur feedback then protected Smudge; AO/seams queued.

## .932 — Connected-face Blur sampling; .931 user PASS — 20 October 2026

User PASS protects .931 Blur and prior .930 solid Object display. Audit main05a790e8:
original UV inspector already owns polygon edges, exporter owns triangle emission;
reuse both via optional edgeOwners and original vertex IDs. Default reports/geometry/
exports unchanged. New small read-only seam plan unfolds original triangle neighbours
across real manifold edges, mapping into detached/rotated/mirrored UV islands. Atlas
proximity never connects faces. Internal diagonals use the same original emission.
Fixed centre4/cardinal1 stroke-start blur now reads mapped connected-face texels.
Writes remain clipped to picked face: stroke BOTH sides of edge; brush footprint does
not wrap automatically. No world-radius/full seamless-footprint claim, no Smudge.
Boundary/nonmanifold/ambiguous corner/long walks clip; invalid/stale ownership and
existing overlapping/degenerate/out-of-tile/complex UV refusals stay atomic. Max8
crossings/sample and2M walk steps; lazy session plan512² labels1MiB+links4MiB,
temporary triangle map1MiB; owned contact copies5MiB plus original stroke buffers.
Premultiplied colour alpha, raw masks/scalars, capped coverage, original alpha tips,
input/raycast/history/COW/SaveOpen/NOM/GLB owners retained. UI says connected faces
and explicitly asks strokes over both sides. No modelling/UV authoring kernel added.
Five new tests cover 12 fold/rotation/mirror layouts, disconnected atlas decoy,
nonmanifold/stale metadata, exact raster alpha/cancel and actual UI→history→SaveOpen→
exact native PNG. Focused20PASS incl release5; full/publication below. Complete changed
reverse loader graph repinned932; retained main/cage/Multi1.0/frozen bytes unchanged.
Read docs/paint-seams-932.md. Device932 seam appearance/latency pending; alpha929 gate
not inferred. Reflection preview independently unresolved; native exports protected.
Next device feedback then bounded Smudge through original paint owner; AO and UV seam
AUTHORING remain queued. Seam sampling is not seam authoring.

.932 final local Node24.19.0 regression: **2,664 PASS / 0 FAIL / 0 skipped**.
Focused20PASS; no existing assertions relaxed. Hosted/Pages/live verification follows.

## .932 publication verified — 20 October 2026

Runtime `5bac11821f49d7d47c6ed99cd90755c05fded102`, tested tree
`8a6f25d6e380442b8c2c7c89893d8f94d153404d`, is published on main.
Connected Git Data uploaded24 exact local blobs; fetched main matches tested tree.
Local Node24 and hosted Node22 regression39418615870/job118613691692 both pass
**2,664 tests / 0 failures / 0 skipped**; complete hosted logs verified.
Pages39418615854/deploy118613868578 succeeded. All22 fresh checked live files
byte-match: shell/version, complete changed runtime/export/UV/Lab loader graph,
new seam helper, recovery, accepted main, protected Multi1.0 and retained surface.
Frozen builds unchanged; no assertions relaxed. All four continuity files updated.

Build932 complete and ready for testing: paint different colours across a cube edge,
Blur strokes over BOTH sides, lift/repeat, UndoRedo stay in Paint, SaveOpen retains.
This connects sample reads across real face edges/UV seams; footprint does not wrap.
User931PASS protected; actual932 Pencil feel/appearance/first-use latency pending.
Alpha929 device gate remains independent. Reflection preview unresolved; native exports
correct. Next feedback then bounded Smudge through original owner; AO/seam authoring
remain queued. This proof changes documentation only, not the verified runtime.

## .933 — Surface image wrapping; user priority — 21 October 2026 (Brisbane)

User asks image placement to wrap connected surfaces rather than clip at one face.
Audit main36845450/live932: .912 On surface follows anchor/normal but feeds flat
orthographic .911 projector with75° facing/visibility cuts; no wrapping image owner.
Extend that original path; preserve separate Project from View. Extract existing932
read-only triangle graph into paint-triangle-graph.js; original UV inspector polygon
edges and exporter face/vertex metadata stay authoritative. Blur uses exact same graph,
existing sample walk unchanged. No duplicate adjacency/triangulation/modelling kernel.

On surface retains raycast triangle index with point/normal; Move updates all three.
Surface orientation still Insert's original helper. New paint-image-wrap.js carries a
local image chart over real manifold triangle neighbours, unfolding common edges with
world lengths and opposite-side third vertex; midpoint/centroid distance queue chooses
one route per triangle. Reconcile shared canonical vertex coordinates to avoid cracks
at local cycle closures; seed triangle pinned. Curved/closed patches necessarily stretch;
not a globally distortion-free spherical unwrap. Stops expanding outside image rectangle,
20K triangles/200K queue-pop cap. Boundaries/nonmanifold/disconnected components clip;
no coordinate welding or atlas adjacency. Original .911 UV raster/source alpha sampling,
overlap/tile/2M scan budgets and stack/pool/history/export owners remain. Wrapped samples
follow connected target surfaces round corners even when not front-facing/visible from
anchor projector; picked anchor still obeys original visible-target/occlusion hit guard.
Flat Project from View retains original75°/scene/self occlusion/30M ray-work rules.

Existing contact tangent guide remains planar; lift updates exact wrapped mesh preview.
Apply recomputes current candidate then commits ONE original checkpoint/COW. Cancel,
close, body loss, layer/target change and refusal preserve committed resource/history.
Source/raster retained together through original recipe/codec: no schema/budget increase.
Interactive wrap chart/anchor is transient, as912: Edit image→On surface repicks anchor;
old flat matrix alone cannot regenerate a wrapped chart. Saved pixels/native exports
retain exact wrapping; never auto-rasterize retained source from that matrix on Open.

Six new regressions: exact asymmetric pixels across flat/oblique/90° + mirrored UVs,
disconnected/nonmanifold exclusions, original view rules/stale anchor/UV refusal,
transformed frame/rotation/scale, actual UI drag onto another face/cancel/cycle→Apply→
history→SaveOpen→exact native PNG, sphere/denied checkpoint and shared-vertex continuity.
Focused image+seam25PASS and release5PASS; full/publication follows. Complete changed
reverse loader graph933, retained exporter/inspector/main/cage/Multi/frozen unchanged.
No932 device PASS inferred. Device933 wrap appearance/stretch/first-use latency pending.
Read docs/paint-image-wrap-933.md. Independent reflection preview unresolved.

Pending user requests explicitly retained: stronger Blur amount/radius separate from
opacity; image raster conversion/editable blur; Merge Down/Flatten with blend/mask
appearance preserved; staged texture/image/alpha resolution and layer-count choices
with memory budgets. Current512² painted maps,1024² sources,256² tips,base+3 overlays
unchanged. Smudge/AO/UV edge-seam authoring queued; this is image wrapping only.

.933 final local Node24.19.0 regression: **2,670 PASS / 0 FAIL / 0 skipped**.
Six new checks + nearby19 =25PASS; release5PASS. No existing assertions relaxed.
Publication/hosted/live verification follows; actual iPad933 gate pending.

## .933 publication verified — 21 October 2026 (Brisbane)

Runtime `284f292306c06a857ffc047bd5dd497370312337`, tested tree
`4209dda642676652b76feb89c3148ec55da2f9b2`, is published on main.
Connected Git Data uploaded19 exact local blobs; fetched main matches tested tree.
Local Node24 and hosted Node22 regression39510312183/job118929399272 both pass
**2,670 tests / 0 failures / 0 skipped**; complete hosted logs verified.
Pages39510311401/deploy118929589714 succeeded. All24 fresh checked live files
byte-match: shell/version, complete changed image/Blur reverse loader graph,
new shared graph/wrap chart, recovery, main/cage, protected Multi1.0 and retained
exporter/UV inspector/raster/image-source/recipe owners. Frozen builds untouched;
no assertions relaxed. All four continuity files updated.

Build933 complete and ready: +Image→On surface, place near cube edge, lift and orbit
to inspect continuation. Drag onto next face; rotate/scale, lift; try curved patch.
Apply→UndoRedo, SaveOpen retains exact result. Contact guide stays planar; wrapped
mesh preview updates on lift. Interactive chart remains transient; Edit image→
On surface repicks, as912. Curvature/large closed patches can stretch/reach boundary.
No device933 appearance/latency PASS inferred;932 Blur and929 alpha gates pending.
Next stronger Blur, image conversion/blur, Merge/Flatten, bounded resolution/layer
options; Smudge/AO/seam authoring remain queued. Reflection preview independent.
This proof changes documentation only; verified runtime remains byte-identical.

## .934 — Blur Amount; .933 user PASS — 21 October 2026 (Brisbane)

User933PASS protects image wrapping across cube edges/UV seams, Move/Rotate/Scale,
Apply/history/SaveOpen. Audit main6688de17/live933: original paint-core has fixed
centre4/cardinal1 one-pass blur, no stronger filter/slider owner. Extend original
raster only; no new brush, adjacency, input, history, resource or writer implementation.

Blur shows Amount1–32, default8. Amount repeats existing smoothing kernel over the
stroke-start snapshot; Opacity mixes filtered target with original; Size controls brush
footprint. Core filter.amount defaults1 (legacy calls/settings remain valid). Main
UI passes optional blurAmount; shared brush defaults/Lab saved settings/native schemas
unchanged. Existing original neighbour table handles connected faces/UV seams on every
pass; no atlas-neighbour reads or new topology plan. Writes still clip to picked face:
stroke both sides. One-pass exact accepted .931/.932 outputs retained; strong blur
uses premultiplied RGBA through all passes (raw masks/scalars remain independent).

Compute target once/contact, using two bounded Float64 RGBA buffers to avoid rounding
between passes; one target retained for contact. At512² each buffer8MiB,16MiB filtering
buffers total; target8MiB retained plus existing before/coverage/domain/pool resources.
Uniform sources shortcut; opacity0 skips filtering. Max32*512² texel visits, no
per-dab repeated filtering or unbounded feedback. Coverage remains max/contact;
lift/repeat for more. Finish/cancel/dispose drops target; validation precedes contact
state publication. Amount input cancels in-flight work and updates existing readout;
original Paint history reopen retains tool/amount. Current selected layer/channel only.
Image colour stays source-preserved/read-only pending explicit image conversion.

Five new regressions: analytical one/two/32-pass impulse and independent opacity;
alpha/raw scalar/domain/invalid/no-op/cancel; strong folded-seam sampling excludes
atlas decoy and far-face writes; actual UI low/high softness, amount-change rollback,
Paint UndoRedo and SaveOpen/exact native PNG; scalar/mask isolation/checkpoint refusal.
Focused26PASS incl .933 wrapping6 and Paint-history5; release5PASS; full below.
No old assertions relaxed. Complete changed raster/Lab/main reverse loader graph934;
accepted933 wrap/graph/export/UV inspector, main/cage/Multi/frozen bytes unchanged.
Device934 strength/first-contact latency pending; Node timings are not iPad evidence.
Read docs/paint-blur-amount-934.md. Reflection preview independently unresolved.
Next image-to-paint conversion/blur, then Merge Down/Flatten, staged resolutions/layer
budgets; Smudge/AO/edge-seam authoring queued. Current512²/1024²/256²/base+3 unchanged.

.934 final local Node24.19.0 regression: **2,675 PASS / 0 FAIL / 0 skipped**.
Focused26PASS + release5PASS; no existing assertions relaxed. Hosted/Pages/live
verification follows; actual iPad934 strength/latency gate pending.

## .934 publication closed; user PASS — 21 October 2026 (Brisbane)

Runtimebc84450ce760a54424938e0f2548d05eca0aaf1e, tested treee59b2bac3b9c531a815403f6bab1816d9e3a04ae,
published. Hosted Node22 regression39512294347/job118936016708 logs confirm2675PASS/
0FAIL/0skip, matching recorded local Node24 run. Pages39512293048/deploy118936225379
succeeded. Live934 manifest and all27 checked runtime/protected files byte-match the
published934 source (git-show snapshot used while935 working tree was dirty). User
PASS934 protects dedicated Blur Amount1–32/default8, independent Opacity/Size, retained
Paint history and earlier933 image wrapping. Prior interrupted publication proof is now
closed; no new934 runtime changes. Alpha929 acceptance remains independently pending.

## .935 — Image to paint conversion; .934 PASS — 21 October 2026 (Brisbane)

Audit mainbc84450c/live934: source-preserved image cache and explicit paired replacement
exist; no raster conversion. Extend original paint-layer-stack with explicit
rasterizeImagePaintLayer: validated owned snapshot, same stack/version/order/ID/name/
visibility/opacity/blend/mask/pixels; ONLY selected image recipe becomes null. Existing
compositor verifies identical appearance, including every supported blend and inverted
mask. No implicit compositing into base, extra layer, resampling, new writer/schema,
brush, history, modelling or UV owner. Existing three-overlay/512² limits unchanged.

Image-only Convert to paint button uses original layerAction/scene checkpoint/preflight/
COW owner. Conversion selects Colour even when image mask was selected; Brush, Eraser,
Fill and Blur then use original raster and accepted934 Amount. Other image layers keep
source editing. Same pixels include933 wrapped placement. Edit image button disappears
by original state when no recipe; name/slot retained. Undo restores retained source and
placement editing, Redo restores raster conversion. After Save/Open converted layer is
ordinary editable pixels; source recipe isn't serialized for that layer. Other objects
sharing old resource and original saved image sources remain unchanged. Source release
reduces committed resource bytes; Undo may still retain it in bounded scene history.

Block conversion while staged image placement exists, keeping candidate/committed work
intact; Apply/Cancel first. Missing/nonimage/scalar/stale target/checkpoint/pool errors
leave committed resources/history untouched. Read-only image message keeps accepted
'Image colour is retained' prefix and points to conversion. UI return/result reused for
accurate success status, no separate input/listener/history system. Current Paint stays.

Five new tests: all-blend/mask exact appearance and owned buffers/byte accounting;
actual wrapped image UI→convert→strong Blur→Paint UndoRedo→SaveOpen→exact native PNG;
mask→Colour and Brush/Eraser/full-stack/other-image/scalar behavior; staged/missing/stale/
checkpoint/pool refusal; staged UI edit/cancel guard. Nearby908/933/934 and release5
remain active; full/publication below. Complete changed stack/resource/project/export/
Lab/main reverse loader graph935; functional change confined to original3 owners.
Accepted raster934, wrap933/UV/mesh kernels/main/cage/Multi/frozen bytes unchanged.
Read docs/paint-image-rasterize-935.md. Device935 conversion/blur/Undo feel pending.
Next Merge Down/Flatten through existing compositor to free slots, then staged texture/
source/alpha resolution and layer budgets. Smudge/AO/UV edge-seam authoring queued;
reflection preview independently unresolved. Current512²/1024²/256²/base+3 retained.

.935 final local Node24.19.0 regression: **2,680 PASS / 0 FAIL / 0 skipped**.
Focused29PASS (new5, image908 eight, wrap933 six, Amount934 five, release5); no
existing assertions relaxed. Hosted/Pages/live publication verification follows.

## Permanent completion-instruction audit — 21 October 2026

User repeated PASS /nextbuild while935 publication was pending and asked to audit
manual-test instructions. AI_WORKFLOW already explicitly requires readiness/build
number and3–6 quick device checks; AI_HANDOFF also contained the19 October reminder
inside an older entry. Promoted the same rule to the TOP of AI_HANDOFF as a permanent
section. It applies every build, including an explicit no-new-test statement when
appropriate; never end with only progress. No runtime change in this audit. Current
next build remains935 (published main was934 when PASS arrived); finish935 and its
hands-on image conversion/Blur/Undo/SaveOpen list before declaring it ready.

## .935 publication verified — 21 October 2026 (Brisbane)

Runtime `44c4eccf036fd7fa1d61bbee4802a506166c49b3`, published tree
`f3749803243107a097ecb798c56edb0ec73a1903`, matches local main exactly.
Original local tested treeac566305 had identical runtime; only four continuity files
changed to promote the permanent completion rule before publication. Git Data tree
verified with all28 blobs. Local Node24 and hosted Node22 regression39586601556/
job119176937360 both pass **2,680 tests / 0 failures / 0 skipped**; full hosted logs
verified. Pages39586601079/deploy119177154130 succeeded. All37 fresh checked live
files byte-match: shell/version, complete changed resource/project/export/Lab/paint
loader graph and retained raster934, wrap933, UV inspector, main/cage/Multi1.0/recovery/
image-source owners. Frozen builds untouched; no assertions relaxed.

Handoff audit complete: permanent readiness/build/manual-test rule was already in
AI_WORKFLOW and an older AI_HANDOFF entry; now prominently at TOP of AI_HANDOFF.
Every finished build must give its readiness, build number and short device tests,
or explicitly say no new test is needed. Never end with progress alone.
All four continuity files current. This proof changes documentation only.

Build935 complete and ready: applied image layer→Convert to paint, appearance kept;
Blur Amount/Brush/Eraser edits pixels; Undo edits and conversion restores Edit image;
Redo then SaveOpen retains editable paint. Source recipe belongs to old Undo resource,
not the converted saved layer; masks/blends/other image layers remain independent.
User934PASS protected; actual935 appearance/feel gate pending. Next Merge Down/Flatten
to free slots, then staged resolution/layer budgets; Smudge/AO/seam authoring queued.
Reflection preview remains independent; alpha929 device gate not inferred.

## .936 — Optional 1024 colour textures; .935 PASS — 21 October 2026 (Brisbane)

User .935 PASS is protected. User priority moves resolution ahead of Merge/Flatten.
Audit: colour resource already permits1024, but painter/stack/projection/display/export
and Blur domain were512. Extend those SAME owners: Paint → Texture resolution →
Increase to1024×1024, one original checkpoint, explicit per-object opt-in. Exact2×
nearest texel replication preserves old base/overlays/masks/blends/image raster and
source; fresh paint/new projections use1,048,576 texels. Wrapped source is NOT silently
reprojected from an insufficient flat recipe. Original Undo restores512; redo/reopen
keeps1024. Sources1024²/2MiB and tips256² unchanged; scalars remain independently512.
Original composite/scene codec/immutable sharing/native+GLB writers retained.

Explicit layered1024v2/v3 dimensions select32/64MiB raster or48/96MiB image pool
profiles (unique/expanded); original opaquev1 and5128/16 or24/48 unchanged. Enlargement
uses existingv2 even with no overlays, no new schema. Existing content dedup/pooledv5,
strict refs/canonical bytes/predecode/atomic errors and32MiB file/24MiB native cap
retained. Unsupported dimensions/checkpoint/stale/budget/staged-placement refuse
without changed resources/history. Larger full image scenes can still hit file limits.

Original raster/filter size ceiling1024 only; accepted32-pass Blur math unchanged.
At1024 Blur has two32MiB Float64 buffers (64MiB filtering peak;32MiB target retained)
plus ownership/stroke/resource/GPU copies; no device RAM/FPS/latency claim. Original
2M UV scan/2M seam-walk/30M projection ray-work guards retained, so complex high-res
layouts can refuse atomically. Brush Size remains texel-based. Shared Lab remains512.
All changed reverse-loader parents repinned936; main930/cage/Multi1.0/frozen unchanged.
Read docs/paint-resolution-936.md for test scope and memory/transport distinctions.
Validation/publication follow; .936 actual iPad feel remains pending.

.936 final local Node24.19.0 regression: **2,687 PASS / 0 FAIL / 0 skipped**.
Seven new resolution integrations plus every original test pass unchanged. Reviewed
release/cache contract5PASS, original902 size513 refusal retained. Initial exploratory
run admitted intermediate sizes; original guard now only adds exact1024² above512.
GLB fixture follows actual primitive material ID; no production writer workaround.
All four continuity files current. Publication/hosted/live verification follows;
actual .936 iPad sharpness, brush/Blur latency and memory acceptance remain pending.

## .936 publication verified — 21 October 2026 (Brisbane)

Runtime `dd313a08a0163ea16ca86034b607553bff06e635`, tested tree
`80165089f0ecde310eede444f7ebd972ffcf90d0`, is published on main. Connected Git
Data uploaded31 exact blobs and created the identical tested tree; fetched main
matched and local branch was aligned without file changes. Local Node24 and hosted
Node22 regression39593356534/job119199545040 both pass **2,687 tests / 0 failures /
0 skipped**; complete hosted logs verified. Pages39593355281/deploy119199756737
succeeded. All31 checked runtime/Lab/shell/recovery/protected files byte-match.
Initial fetch began during rollout and returned six .935 ancestors; fresh postdeploy
rechecks closed all six. No frozen/main/cage/Multi edits. Eleven functional owners;
eleven reverse-graph parent files contain cache-reference changes only.

All four continuity files current. Proof is documentation-only, same runtime bytes.
User .935 PASS protects conversion/Blur/edit/history/persistence; .936 device detail/
latency/memory gate remains pending. Ready: Paint → Texture resolution → Increase
to1024×1024; fresh strokes/new image placement, Undo512/Redo1024, SaveOpen and NOMAD.
Existing pixels enlarge exactly; re-place retained sources for fresh image detail.
Independent512 scalars/source1024/alpha256/base+three limits retained. Next resolution
feedback then Merge Down/Flatten; larger sources/maps/layers remain staged.

## .937 — Actual1024 fresh Paint default; .936 pixelation feedback — 22 October 2026

User: images still pixelated, then clarified fresh cube paint after refresh too.
No .936 PASS inferred. Audit f1f13afc: fresh production painter still defaulted512;
optional .936 Increase sat in collapsed details. Refresh does not select that control.
Correct production makeController to explicitly request newColourSize1024 from SAME
painter. Only no-colour-resource objects use default. Their temporary1024 base/stack
remains uncommitted until first real paint/image edit; no blank resource or extra
history on Open/Close. First edit uses accepted layeredv2/v3 and high-res pool profile.
Existing512/1024 saved resources override default and retain exact bytes/history.
Original reusable API512/Lab defaults remain; all production UI paths request1024.

Move original resolution nodes into visible row near Channel/Tool, explicit Colour
texture label; Increase exposed for512, hidden at1024, scalar channel guard retained.
Open status reports actual size. No new listeners/history/kernel or automatic raster
upscale/reprojection, source limits/UV/render/native-export/resource-budget/schema change. Original
nearest image sample/linear texture display unchanged; no claim all zoomed pixelation
is solved or that user was definitely painting512. 1024 is whole atlas, shared by faces.
Two painter owners + existing File owner and parent shell/recovery pins937 only; main/Multi/frozen intact.

Three new actual UI tests verify fresh1024 before paint, no Open history/payload,
first-edit resource/UndoRedo/new-controller reopening; existing512 visible opt-in with
one checkpoint; first image projection→SaveOpen→exact native1024 PNG and512 scalar
independence. Original .936 enlargement test now explicitly creates a legacy512 map.
Existing alpha test samples actual paint.width; scalar UI tests compare every displayed
texel to the exact512 source at current display size. Their old fixed512 display indices
were incompatible with the newly requested production default; no raw-data assertions
removed or weakened. Read docs/paint-default-resolution-937.md. Validation follows.

DEVICE: new cube → Paint; visible Colour texture1024×1024 BEFORE first mark. Fresh
fine strokes/new image; orbit/zoom and judge detail/latency. UndoRedo keeps Paint;
SaveOpen retains1024; existing512 project offers Increase and remains512 until tapped.
Actual iPad sharpness gate remains pending. Next device evidence before higher-map/
source/UV-density work; Merge/Flatten and other queued requests preserved.

.937 File-size follow-through: actual fresh1024 three-layer duplicate exceeded the
old32MiB JSON file cap despite valid resource quotas. Original object-management
Save/Open now permits96MiB ONLY for validated layeredv2/v3 colour1024² projects;
legacy/ordinary projects retain32MiB. Open rejects>96MiB before reading; files32–96
are parsed/staged, decoded with original strict resource/geometry guards, then must
qualify BEFORE confirmation or scene/history replacement. Save qualifies only after
original exact roundtrip validation. Original quota/predecode/canonical/ref rules,
native24MiB cap, confirmation and failed-Open rollback remain. Raw JSON parsing is
now bounded96MiB (not a total browser-memory guarantee). Three-layer512 duplicate
regressions explicitly seed a legacy512 base to retain their8/16MiB assertions. A new
actual1024 three-layer duplicate test verifies real Save/Open>32MiB, exact pixels,
96MiB pre-read refusal, legacy32MiB rejection and unchanged scene/history on errors.
No blanket file-limit increase for ordinary projects or invented schema fields.

.937 final local validation: complete2,691-check run passed2,690; the new high-res
File test had already saved/reopened exact pixels, then a test-only cross-realm
empty-array comparator failed. Replaced that comparator with original history length/
identity checks, retaining every assertion. Corrected focused high-res test now1PASS
(69s), including actual>32MiB Save/Open,96MiB pre-read bound,32MiB legacy eligibility
and unchanged scene/history on failures. No runtime failure remains from that run.
New default+legacy resolution10PASS, nearby scalar/alpha16PASS; final release/cache
contract5PASS after completing drawer-ui parent pin. No protected/frozen changes.
Hosted full-suite rerun and publication/live evidence follow; device sharpness pending.

## .937 publication verified — 22 October 2026 (Brisbane)

Runtime `1bbb4d6d2620d6ff801259c02fe61c6df90fc9d5`, tree
`3bbfe418d10a633e66f4580091f5f4f94f958edd`, is published. Connected Git Data
uploaded18 exact local blobs/tree; fetched main matches local tested tree. Hosted
Node22 regression39694120390/job119547225819 passes **2,691 tests / 0 failures /
0 skipped**; complete job logs verify totals, including corrected high-res File test.
Local complete run covered2,690 passing checks; corrected File case separately passed,
and the hosted rerun closes the full final-tree proof. Pages39694119853 succeeded.
All19 checked live shell/runtime/parent/recovery and retained paint/source/project/
native-export/Multi files byte-match. Main/Multi/frozen bytes unchanged.

This proof changes documentation only. User .935 PASS protected; .936 pixelation
report remains a device issue awaiting .937 confirmation, not an inferred PASS.
Ready for new cube → Paint showing Colour texture1024×1024 BEFORE first mark/image;
compare fresh detail, then UndoRedo/SaveOpen. Existing512 saved textures stay512 until
visible Increase. Higher-res project Save/Open96MiB (ordinary32MiB), scalar512 and
source1024/tip256/base+three limits retained. No2K/4K or all-zoom pixel-free claim.
Next confirmed1024 device feedback; inspect source/UV density if still coarse, then
stage larger maps/sources/memory work. Merge/Flatten/Smudge/AO/seams remain queued.

## Current direction — .938, 22 October 2026

.937 accepted Perfect PASS: protect fresh1024/default/readout/detail and saved512
optional Increase. .938 implements queued Merge to Base/Flatten colour through
original compositor/history owners, retaining resolution/budgets/three overlays.
Merge includes selected and all below; hidden merged layers removed; Undo restores.
Local2697PASS; device .938 merge/flatten/history/SaveOpen gate pending. Follow that
feedback before next narrow audited Smudge/AO/seam authoring step. Alpha929 and
reflection preview gates remain independent; no 2K/4K or larger source promise.

## .938 publication verified — 22 October 2026

Runtime f441e92b0950f0e7b2ab1b46a8b67d9940a12396, tree
239a55d76de49ddf840fa19abcdbfbb351b262d8, matches tested local tree.
Hosted regression39699769504/job119565892975 succeeded; full job logs confirm
2697PASS/0FAIL/0skip, matching complete local run. Pages39699769015 build119565895457/
deploy119566078569 succeeded. All25 checked live shell/version, changed runtime/Lab,
recovery and retained core/main/Multi files byte-match tested source. Reviewed pins938;
protected main/cage/Multi/frozen unchanged. This proof updates documentation only.
User .937 PASS protected; .938 device merge/flatten/UndoRedo/SaveOpen gate pending.

## Current direction — .939, 22 October 2026

User .938 Awesome PASS protects Merge/Flatten/free slots/history/SaveOpen. Explicit
new priority delivered: UV-ready initial/reset cube and optionalUV Add for existing
supported Cube/Plane/Cylinder/Cone/Sphere projection owners. Checkbox defaults ON;
plain creation remains available. Torus/Text no automatic unwrap; special procedural
launchers and saved objects unchanged. No geometry/projector duplication or larger
paint budgets. Device .939 startup/reset/Add/UndoRedo/SaveOpen gate next. Follow
feedback before queued Smudge/AO/edge-seam authoring. Torus/general unwrap candidate
future bounded work; native topology/modifier/linked restrictions remain. Reflection
and929 alpha gates independent. Publication/automated results follow.

.939 final local Node24 full regression: **2,703 PASS / 0 FAIL / 0 skipped**.
New creation6PASS, original nearby Add/Box/Sphere19PASS, reviewed release5PASS.
No assertions removed or relaxed. Complete reviewed main/Lab reverse loader graph939;
protected main930/cage/Multi1.0/frozen untouched. Hosted/Pages/live proof follows;
actual iPad UV-ready creation/paint/persistence acceptance remains pending.

## .939 publication verified — 22 October 2026 (Brisbane)

Runtime e076ba40c61f1c5ad202112b60e67fd75a6a7ccd, tree
52aaf4c3504f6c6e8ba2c44d98fdd8f6bf497bdc, is published on main.
Connected Git Data uploaded20 exact blobs and matched tested tree; fetched main
matched local source. Local Node24 and hosted Node22 regression39722181487/
job119637927281 both pass **2703 tests / 0 failures / 0 skipped**; complete job
logs verify totals. Pages39722181024 build119637930190/deploy119638067800 succeeded.
All20 postdeployment checked shell/version, every changed runtime/Lab owner, recovery,
retained main/cage/Multi1.0/primitive factory/paint owners and frozenBeta7 marker
byte-match tested source. Main/cage/Multi1.0/frozen beta bytes unchanged. No assertion
relaxed. This proof changes docs only; same runtime bytes. User .938 PASS protected;
.939 actual iPad startup/reset/Add/UV checkbox/paint/history/SaveOpen gate pending.

## Current direction — .940, 22 October 2026

User .939 PASS protects UV-ready startup/reset, Add checkbox/plain path, paint/history/
persistence. .940 closes remaining supported primitive Torus gap through original
native UV owner: regular round worldY angular grid, two seams/one rectangle, Add
UV checkbox defaultON, explicit Torus UVs (Y) for older plain tori. Text/procedural
objects and existing projects not auto-unwrapped. No geometry or parallel kernel.
Device .940 Add/Paint/UV/UndoRedo/SaveOpen next; follow feedback then bounded Smudge/
AO/edge-seam authoring audits. General/Text unwrap future, alpha929 and reflection
gates independent. Existing resolution/budgets/native restrictions retained.

.940 final local Node24 full regression: **2,709 PASS / 0 FAIL / 0 skipped**.
New Torus6 and expanded939 creation6 =12 focusedPASS; reviewed release5PASS.
No original behaviour assertions relaxed; superseded Torus-unavailable checks now
require mapped/optional plain Torus and exact project/NOM/GLB output. Protected
main/cage/Multi1.0/frozen retained. Hosted/Pages/live proof follows; device940 pending.

## .940 publication verified — 22 October 2026 (Brisbane)

Runtime e3118c0fc6a27c61f4f199e35ce77eccd89c19c2, tree
dbd5f70836152bafdf7a8b32cfc8e1504db2bdb7, published on main. Connected Git Data
uploaded14 exact local blobs and matched tested tree; fetched main identical.
Local Node24 and hosted Node22 regression39725820759/job119649340149 both pass
**2709 tests / 0 failures / 0 skipped**; complete hosted logs verify totals.
Pages39725820263 build119649342511/deploy119649486563 succeeded. All20 checked
postdeployment shell/version, changed UV/Add/MeshHealth/Multi parent, recovery and
retained main/cage/Multi1.0/factory/signature/import/export/paint/raster/frozenBeta7
marker files byte-match tested source. Reviewed graph940; main/cage/Multi1.0/frozen
bytes unchanged. No old behaviour assertions relaxed. This proof changes docs only;
same runtime bytes. User .939 PASS protected; .940 Torus device gate pending.

## .940 user PASS — 22 October 2026 (Brisbane)

User PASS protects Torus automatic UVs/optional plain Add, Torus UVs (Y), Paint,
UV Editor, UndoRedo and SaveOpen. .940 runtime/CI/Pages/live proof above is closed.
Next authorized /nextbuild audits bounded Smudge through original paint owners.

## Current direction — .941, 22 October 2026

User940PASS protected. First bounded Smudge uses original paint owners, selected
layer/channel only, tip-local premultiplied pickup, existing Size/Opacity/alpha and
history/persistence. Face-confined reads/writes; face changes/misses restart pickup.
No cross-face carry claim, original connected Blur unchanged.8M pickup-visit contact
cap cancels atomically; original resource/File/native limits retained. Device941
Smudge feel next, then refine from evidence before cross-face/AO/Edge seam work.
Alpha929/reflection-preview gates remain independent. See docs/paint-smudge-941.md.

.941 final local Node24.19.0 regression: **2,715 PASS / 0 FAIL / 0 skipped**.
All six new Smudge integrations pass on final source, plus every existing assertion.
Nearby Blur/seam15PASS and reviewed release5PASS also passed. No original assertions
relaxed. Complete main/Lab reverse-loader closure941; protected main/cage/Multi1.0/
frozen unchanged. Publication/hosted/live verification follows; device941 pending.

## .941 publication verified — 22 October 2026 (Brisbane)

Runtime a39c2db8a8aaa8e07fcd59025211b130a53e0e27, tested tree
72e49c4433676a761c2ac5df662df18a1a7da87f, is published on main. Connected Git
Data uploaded15 exact blobs; created tree and fetched main match local tested tree.
Local Node24 and hosted Node22 regression39756577806/job119749968964 both pass
**2715 tests / 0 failures / 0 skipped**; complete hosted log totals verified.
Pages39756577517 build119749975949/deploy119750207283 succeeded. All20 checked
postdeployment shell/version, every changed main/Lab runtime owner, recovery and
retained main/Multi1.0/UV/filter/seam/graph/project/export/primitive/frozenBeta7 marker
files byte-match tested source. No original assertions relaxed; protected/frozen
bytes unchanged. This proof changes four continuity files only, same runtime bytes.

Build941 is complete and ready for device testing: hard colour patch on cube →
Tool Smudge within face, drag outward, compare Opacity, tap makes no mark; try an
overlay, UndoRedo stays in Paint, SaveOpen retains result. Face edges/misses restart
pickup. Actual iPad feel/latency remains pending. User940PASS protected; independent
alpha929/reflection gates unchanged. Next device feedback before cross-face Smudge,
AO or Edge-seam authoring; no automatic next runtime build before that gate.

## Current direction — .942, 22 October 2026

User941PASS protected. Original manifold seam graph now permits Smudge mean colour
pickup across connected picked faces without atlas contamination. Same-face spatial
pickup941 unchanged; detailed texture patch orientation is not transported at seam.
Existing Size/Opacity/alpha/raw channels/history/persistence retained. Misses/unknown/
nonmanifold/vertex-only restart; strict captured pairs and existing work caps. Device
942 seam/Opacity/overlay/history/SaveOpen feedback next, then narrow refinements or
AO/Edge seam owner audits. Alpha929/reflection gates independent; no new budgets.
See docs/paint-smudge-seams-942.md. Full/publication evidence follows.

.942 final local Node24.19.0 full regression: **2,720 PASS / 0 FAIL / 0 skipped**.
Five new connected-Smudge checks, original941+seam11 and reviewed release5 pass.
No original assertions relaxed. Reviewed changed main/Lab reverse graph942; protected
main/cage/Multi1.0/triangle graph/frozen unchanged. Hosted/Pages/live proof follows.
User repeated PASS /nextbuild while942 was still local/in regression:941 acceptance
remains protected; no942 device PASS inferred before publication/manual test list.

## .942 publication verified — 22 October 2026 (Brisbane)

Runtime b49bb81d67836a1c2cc569d9755cdd54abb7b5f9, tested tree
5fbb934dae7594d22bc4a64438b0d5bc003097fd, is published on main. Connected Git
Data uploaded17 exact blobs; created tree and fetched main match locally tested tree.
Local Node24 and hosted Node22 regression39762188060/job119768813511 both pass
**2720 tests / 0 failures / 0 skipped**; complete hosted log totals verified.
Pages39762187055 build119768816536/deploy119769033835 succeeded. All20 checked
postdeployment shell/version, changed main/Lab/filter/seam runtime graph, recovery,
retained main/Multi1.0/triangle graph/UV/project/export/primitive and frozenBeta7
marker files byte-match tested source. Original assertions retained; protected/frozen
bytes unchanged. This publication proof changes four continuity files only.

Build942 complete and ready: cube two faces visible, paint patch up to shared edge,
Smudge across it, compare Opacity and painted overlay, UndoRedo retains Paint, SaveOpen
retains result. Seam transition carries averaged colour, not detailed patch orientation.
User941PASS protected. Repeated PASS/nextbuild arrived before942 publication: it is
not942 device acceptance. Actual942 iPad seam feel gate remains next. Then refine from
feedback before AO/Edge seam authoring; alpha929/reflection gates stay independent.

## .942 user PASS — 22 October 2026 (Brisbane)

A further PASS/nextbuild arrived AFTER942 deployment,20 live-file matches and hosted
2720PASS verification. Accept this latest PASS for LIVE942 connected-face mean carry,
Opacity/overlay/Paint UndoRedo/SaveOpen; earlier prepublication repetitions remain941.
Protect942 alongside941. Next authorized943 narrow build begins bounded object-only
AO bake foundation via original UV ownership/triangle geometry; visible controls follow
validated bake pixels/work guards. No AO UI or rendered AO acceptance is inferred.

## .943 — read-only object AO bake foundation — 22 October 2026 (Brisbane)

User .942 PASS remains protected. Audit found no existing AO baker. New
`src/paint-ao-bake.js` uses original preview triangle ownership/triangle graph,
original paint-filter-domain texel raster and Three Ray.intersectTriangle. The
filter domain optionally returns its existing transient triangle map; ordinary
brush callers retain exact return shape and allocations. No second triangulator,
UV rasterizer, adjacency, brush, history, scene resource or export owner.

Pure synchronous object-local bake returns owned linear R8 visibility and separate
coverage, UV-v0-first. White=unoccluded; uncovered texels white/coverage0. Deterministic
cosine-weighted hemisphere samples, double-sided same-object blockers, source winding
normal, normalized object-diagonal radius/bias. Size16–128/default64, samples4–64/
default16, radius .001–2/default.25 of diagonal. Conservative8M ray/triangle-test
preflight plus original2M UV scan cap; excess complexity refuses with no scene writes.
Normalized private graph points only; source mesh/UV/geometry remain unchanged.
No scene-neighbour, ground-plane, world-transform, rendered SSAO or albedo bake yet.
No main-app AO import/button/resource/persistence/export change or device-performance
claim. This intentionally low-resolution foundation is NOT a new paint resolution.

Five new regression tests cover opt-in exact ownership, white open plane/coverage/
determinism/copy isolation, facing blockers/radius/double-sided rays, supported scale/
translation/rotated UVs, stale/invalid/overlap/work refusals and source preservation.
Tiny1e-8 source fixture was rejected by the ORIGINAL preview builder before baking;
scale tests use accepted .01–1e8 geometry instead, no builder tolerance change.
Read `docs/paint-ao-foundation-943.md`. Main painter reverse loader chain + shell/
recovery pins943 reviewed; Lab/main/cage/Multi1.0/frozen algorithms unchanged.

Next: original Paint layer/history transaction for an explicit non-destructive AO
Multiply layer, with cancellation/stale/pool/checkpoint guards and visible controls,
then iPad appearance/latency testing. Do not imply AO UI acceptance from pure tests.
Alpha929/reflection-preview gates remain independently unresolved. No new AO hands-on
test exists in943; existing Smudge/Paint UndoRedo/SaveOpen remains the nearby baseline.
Validation/publication evidence follows; do not infer completion before verification.

.943 final local Node24.19.0 complete regression: **2,725 PASS / 0 FAIL / 0 skipped**.
Five new AO/ownership checks, original Smudge941/942 eleven and release/cache five
pass on final runtime. No original assertions relaxed; main/cage/Multi1.0/frozen
unchanged. Hosted regression/Pages/live proof follows. No new AO device controls.

## .943 publication verified — 22 October 2026 (Brisbane)

Runtime `3feb36097fb677165b3162ac852c58c1e452f735`, tested tree
`223e2d8e82855137f804faf9e95134614fcee51e`, is published on main. Connected Git
Data uploaded13 exact local blobs and created the identical locally tested tree;
fetched main matched, local branch aligned with no file changes. Local Node24 and
hosted Node22 regression39765950426/job119781312111 both pass **2725 tests / 0
failures / 0 skipped**; complete hosted log totals verified (hosted219.8s).
Pages39765949659 build119781316369/deploy119781518834 succeeded. All20 checked
postdeployment shell/version, every changed runtime owner, new AO module, recovery,
retained main/cage/Multi1.0/triangle graph/UV/paint/project/export and frozenBeta7 marker
files byte-match tested source. Reviewed pins943; protected/frozen bytes unchanged.
No original assertion relaxed. This publication proof changes four continuity files
only, with identical tested runtime bytes.

Build943 complete: no new hands-on AO test needed because no AO controls are exposed.
Pure bake/ownership/work/refusal coverage is automated. User942PASS remains protected;
next narrow build integrates explicit AO Multiply-layer creation through original Paint
history/pool/compositor with staged/cancel/stale/refusal guards and then visible controls.
AO foundation is local-object16–128 samples only, not rendered SSAO, neighbour-object
shadows, persistent AO resources or high-resolution albedo baking. Alpha929 and
reflection-preview gates remain independent. Existing Smudge/Paint history/SaveOpen
is optional nearby device sanity, not an invented AO acceptance gate.

## .944 — editable AO Multiply layer preview — 22 October 2026 (Brisbane)

Base main0a4e094 /943 audited. No existing AO UI/layer transaction found. New small
paint-ao-layer helper calls the original943 baker at64²/16 rays and original UV
filter-domain raster at64 and current512/1024. Same-face, coverage-aware bilinear
transfer renormalizes only matching source-face samples; atlas neighbours never
contribute. Uncovered/unsampled thin faces stay transparent. Radius remains a
fraction of LOCAL object diagonal; no world-transform/scene-neighbour/ground/SSAO.
Colour Multiply uses existing byte-space compositor, not a physically linear PBR AO
slot or high-resolution ray bake. Current colour/scalar/source/tip budgets unchanged.

Original painter owns transient AO preview, pool validation, one Apply checkpoint,
COW resource assignment and selection. New layer is ordinary editable raster named
AO n, Multiply, user Strength as Layer opacity; existing visibility/mask/eraser/paint/
Delete/Merge/Flatten/history/SaveOpen and flattened native/GLB writers remain owners.
No saved AO descriptor/recipe/schema or new writer/history/gesture/modelling kernel.
Preview never assigns object colourPaint or enters Save/history; Cancel/Done/history/
body loss discards it. Apply rechecks live positions/UV binding/current target and
pool before checkpoint; failures keep committed resources/history unchanged.

Compact LEFT Paint → collapsed Ambient occlusion: Reach5–100% (default25%),
Strength0–100% (default65%), Bake AO preview, Apply AO layer / Cancel AO. Preview
blocks paint and layer/channel edits; fingers still navigate. Apply selects AO layer;
existing layer opacity/visibility can change strength afterward. Existing Undo/Redo
retains Paint with ORIGINAL selection rules (Redo may keep Base selected; select AO).
Image placement must Apply/Cancel first; image sources/scalars stay independent.
Three-overlay cap remains; merge/delete to free a slot. Bake defaults64/16 fixed;
8M ray-work and2M UV-scan limits refuse complex/overlapping/out-of-tile layouts before
resource/history changes. Final transfer≤4 texel samples per512²/1024² destination.
No interactive cancellation during the bounded synchronous calculation or iPad
latency/RAM/appearance claim. Small low-poly UV meshes first; convex cube may show
little/no darkening. Concave/recessed geometry is the meaningful appearance test.

Important failed approach: manager.objects/target getters call saveActive and CLONE
the active mesh. Reference identity cannot establish unchanged AO source. Original
UV key plus exact serialized live vertex content guard the candidate; do not add an
identity-only check or mutate the manager to make such a check pass. Temporary debug
reason text removed. No accepted manager/mesh/export algorithm changed.

Six new integrations pass:512/1024 domain-safe output/source preservation; transient
preview/Cancel/Apply/opacity/visibility/scalar/peer isolation; actual1024 UI+original
Paint history+SaveOpen+exact NOM/GLB PNG; checkpoint/pool/deformed-source/close refusal;
scalar/mask/full stack/complexity guards; retained images/staged mutual exclusion and
Done discarding unapplied AO. Original nearby943/938/942 tests16PASS; release5PASS.
Read docs/paint-ao-layer-944.md. Full/publication evidence follows. User942PASS remains
protected; /nextbuild is not AO device acceptance. Alpha929/reflection gates separate.

DEVICE944: simple recessed UV mesh → Paint → Ambient occlusion → Bake; orbit,
Cancel retains previous paint. Bake→Apply creates AO layer, adjust Layer opacity/
Visible; UndoRedo keeps Paint, select AO if needed; SaveOpen/native export keeps shade.
Next: actual iPad quality/latency feedback, then narrowly refine AO quality/coverage/
work budget as evidence warrants. No automatic further AO feature before device gate.

.944 final local Node24.19.0 full regression: **2,731 PASS / 0 FAIL / 0 skipped**.
Six new AO integration checks + existing2725 pass on final source; original nearby
943/938/942 sixteen and reviewed release five also pass. No existing assertions
relaxed. Complete AO-helper/painter/shell reverse pins944 reviewed; main/cage/Multi1.0/
frozen unchanged. Hosted/Pages/live publication proof follows; device944 pending.

## .944 publication verified — 22 October 2026 (Brisbane)

Runtime `e43997b122f7e29cb8dff29db8c6752deccc2d86`, tested tree
`2331a0d86cd9e87771cf21f4ca9de67f581cfa04`, is published on main. Connected Git
Data uploaded12 exact blobs and created identical tested tree; fetched main matched,
local branch aligned cleanly. Local Node24 and hosted Node22 regression39772067820/
job119801794196 both pass **2731 tests / 0 failures / 0 skipped**; complete hosted
log totals verified (230.0s). Pages39772066609 build119801796950/deploy119801996752
succeeded. All20 postdeployment checked shell/version, changed painter UI/core/new
AO transfer helper, retained943 bake/domain, recovery/main/cage/Multi1.0/triangle
geometry/UV/paint/project/export and frozenBeta7 marker byte-match tested source.
Original assertions retained; protected/frozen algorithms unchanged. This proof
updates four continuity files only; tested/published runtime bytes unchanged.

Build944 is complete and ready for hands-on testing: simple recessed native UV mesh
→ Paint → Ambient occlusion → Bake AO preview; orbit, Cancel retains prior paint.
Bake→Apply creates selected editable AO Multiply layer; Layer opacity/visibility,
Paint UndoRedo, SaveOpen and native shaded export sanity. Redo follows original
selection rules and can keep Base selected; choose AO layer if needed. Convex cube
may show little/no shadow; same-object/local64²/16-ray bake, not screen-space or
neighbour-object AO. Work/refusal limits remain; small UV meshes first. Device944
appearance/latency/persistence acceptance remains pending, not inferred from Node.
User942 connected Smudge PASS protected; alpha929/reflection-preview independent.
Next narrow runtime work follows actual944 device feedback rather than automatic
AO quality/lighting changes. No new AO device PASS inferred from /nextbuild.

## .945 — higher-resolution AO and cancellable quality jobs — 23 October 2026 (Brisbane)

User944PASS with explicit poor/patchy AO quality exception. Protect the existing
preview/Apply/Cancel/layer/history/persistence workflow; AO appearance is NOT accepted.
User authorizes higher resolution /nextbuild. Audit main6ddd9d2: actual bake64²/16
rays only;1024 colour texture was just interpolated shade. Existing pathtrace-only
remote BVH is unrelated to this CPU baker; no additional kernel/library imported.

Original baker now has ONE generator tracing kernel. Legacy bakePaintAO remains
synchronous, exact64/16 outputs and8M work cap/128 maximum retained. Async high path
permits≤256²/64 rays with a separate FIXED128M conservative ray/triangle-work cap;
original2M UV scan cap/20K triangle bound retained. No unbounded caller work limit.
Chunk events every65,536 visited triangle candidates; runner checks AbortSignal and
yields to browser timers after approximately8ms accumulated work between events.
Ray preparation/UV raster remain bounded synchronous setup; no hard frame-time or
M2 latency guarantee. Trace and final face-safe transfer share same scheduler.
Cancellation drops staged data; source geometry untouched. Owned domain labels reused
for transfer instead of rasterizing low grid twice. No new triangulation/UV raster/
adjacency/ray kernel. Original hemisphere/radius/bias formulas and sampling pattern
unchanged, merely more positions/directions. No denoiser or all-patchiness-solved claim.

Paint AO Quality: High(default)256²/64 samples; Medium128²/64; Quick64²/16. High has
16× baked pixels and4× sampled directions versus944 (up to64× sampling work for the
same coverage/mesh). Geometry/occlusion can require fewer actual intersection visits;
cap refuses complicated layouts, suggest Medium/Quick or simpler mesh. Existing
colour512/1024 textures, source/tip/scalar resolutions, layer/resource/File/export
budgets and schemas unchanged. Old saved AO pixels stay as-is; hide/delete old AO
layer and rebake to compare rather than stacking two shadow layers.

Original Paint session stages async job with progress/Cancel; pending job blocks
paint/layer/channel/quality edits while fingers navigate. Cancel, Done/close/body
loss/history abort it; late results cannot publish into a new/stopped/replaced job.
Fresh mesh-position/UV/current-resource and original pool guards precede preview;
Apply remains ONE original checkpoint/COW commit to an editable Multiply layer.
State flags are transient only; no persistent AO recipe or new history owner.
Quality is session UI preference, not saved project metadata. Existing Quick remains
byte-identical. Same-face coverage transfer still excludes atlas neighbours; thinner
UV faces now get actual256-grid samples rather than borrowing another face's shade.

Six new tests cover genuine256/64 grid and finer shade levels, exact asyncQuick parity,
new thin-face coverage and isolation, progress/abort/pre-abort/invalid quality,
actual painter cancel/close/stale/retry/checkpoint/pool/work refusal, actual UI default/
Cancel while busy/Done late-result suppression/Quick comparison. Original943+944 eleven
and reviewed release five pass. No original assertion relaxed; old943 size129 and
8M refusal checks remain active. Read docs/paint-ao-quality-945.md. Full/publication
proof follows. All changed AO/painter/shell reverse loader pins945 reviewed; main/
cage/Multi1.0/frozen/modelling/UV/project/export algorithms unchanged.

DEVICE945: on SAME recessed model hide old AO, Quality Quick→Bake/inspect/Cancel;
High→Bake/inspect at same Reach/Strength, compare detail/banding and wait time. Cancel
DURING High and confirm no layer/history; rebake/Apply then Layer opacity/visibility,
Paint UndoRedo and SaveOpen/native shading. Use Medium if work guard refuses High.
Actual iPad smoother-result/latency acceptance pending; alpha929/reflection gates
independent. Next narrow improvement follows user comparison; do not guess a light
source or silently smooth unrelated UV islands to hide remaining defects.

.945 final local Node24.19.0 full regression: **2,737 PASS / 0 FAIL / 0 skipped**.
All original2731 and six new quality/cancellation checks pass on final source;
original AO943/944 eleven and reviewed release five also pass. No assertions
relaxed. Reviewed AO/painter/shell reverse graph945; protected main/cage/Multi1.0/
frozen unchanged. Hosted/Pages/live publication proof follows; device quality pending.

## .945 publication verified — 23 October 2026 (Brisbane)

Runtime `bc04adb66457223c2a3654ecbd059ef41804a4bf`, tested tree
`8ab57dcdbcfe0303c80932cfd8d4e5f91e951c40`, is published on main. Connected Git
Data uploaded13 exact blobs and created identical tested tree; fetched main matched
and local branch aligned cleanly. Local Node24 and hosted Node22 regression39887637934/
job120199434595 both pass **2737 tests / 0 failures / 0 skipped**; complete hosted
log totals verified (233.1s). Pages39887637391 build120199437013/deploy120199572392
succeeded. All20 checked postdeployment shell/version, changed AO baker/transfer/
painter UI/core, retained domain/triangle graph, recovery/main/cage/Multi1.0/UV/paint/
project/export and frozenBeta7 marker byte-match tested source. Reviewed pins945;
original assertions retained, protected/frozen algorithms unchanged. This proof
changes four continuity files only; tested/published runtime bytes unchanged.

Build945 complete and ready for SAME-model comparison: hide/delete old AO, Quality
Quick64/16→Bake/inspect/Cancel; High256/64 at same Reach/Strength, compare finer shade
and wait time. Medium128/64 remains available if High work cap refuses. Cancel during
bake leaves no layer/history; retry/Apply, Layer opacity/visibility, Paint UndoRedo,
SaveOpen/native shading. Old saved AO pixels do not automatically improve; rebake.
User944PASS protects workflow with explicit poor/patchy appearance exception;945
actual iPad quality/latency acceptance remains PENDING, not inferred from Node.
Quality test proves actual higher grid/more levels/thin-face coverage, not perfect
smoothness on every model. Alpha929/reflection gates remain independent. Next
runtime refinement follows device comparison rather than unrelated lighting changes.

## .946 — paint / UV restart; .945 user PASS — 23 October 2026

User explicitly reports **945 = PASS**: protect higher-resolution AO and its existing
preview/cancel/apply/history workflow. This supersedes earlier pending945 notes;
no implication of perfect AO on all meshes or acceptance of unrelated open gates.

Audit main d0c1400: original UV projections and Pack all exist, no paint reset and
no general atlas unwrap. xatlas appears only in pathtrace dependency URL; Pack all
arranges existing islands and does not generate an atlas. Keep atlas unwrap as a
separate future narrow task through original UV/history owners.

Object → UV now exposes Clear paint (keeps UVs) and Clear paint + UVs (choose a
projection again). Both work with stale geometry/UV bindings without opening Paint.
All colour layers/masks/images/AO plus roughness and metalness resources detach in
one original scene checkpoint; shared resources/copies remain intact. No rebind of
old pixels, no geometry edits, no automatic discard on UV edits. Undo/Redo restores
exact resources/UVs. Reset is for independent BoxLab meshes; imported GLB materials,
linked/procedural/locked/reference objects are refused. Existing projection Base
restrictions remain. Viewport refresh uses original render-mode owner. Stale paint
errors now direct to Object → UV → Clear paint.

Four new946 tests cover all-channel stale recovery and reopen, actual UndoRedo/COW,
stale UV removal/reproject/repaint, blank native SaveOpen, no-op/refusal atomicity,
and original panel callback/render delegation. New manual gate: reproduce stale
paint → Clear paint → Paint; clear both → Box/appropriate projection → Paint;
UndoRedo reset and SaveOpen blank/repainted result. Atlas generation not shipped.
Release graph946 reviewed; Multi1.0/frozen files unchanged. Validation/publication
results follow; no946 device PASS inferred.

.946 runtime published: `9af9a37ebeb0913e3c50f76a0e5b198f89143fdf`, tested tree
`318f420120392e573f463f8834af05103563c6fc`. Local Node24 full regression:
**2,741 PASS / 0 FAIL / 0 skipped** (212.9s), including original2737 and four new
recovery tests; no original assertions relaxed. Release contract five pass. Remote
main fetched, exact tested tree matched and local branch aligned cleanly.
Hosted regression39900966420 and Pages39900966243 verified below.

.946 publication verified: hosted Node22 regression39900966420/job120242198371
passes **2741 tests / 0 failures / 0 skipped** (full log totals verified), matching
local Node24. Pages39900966243 build120242201383/deploy120242345149 SUCCESS.
All20 checked postdeployment shell/version, reset/UV/painter/creation loaders,
release-recovery/AO/main/Multi1.0/inspection/paint/project/export and frozenBeta7
marker byte-match tested source. No tested runtime changed after validation.

Build946 complete and ready for device testing: Object → UV → Clear paint keeps
UVs and starts a blank paint session, including the old binding-error case. Clear
paint + UVs permits fresh Box/appropriate projection and repaint. UndoRedo restores
resources/UVs; SaveOpen retains cleared/repainted result. Device946 PENDING. User945
PASS protected. General atlas unwrap remains a separate future build; Pack all only
arranges existing islands. This proof changes continuity docs only.

## .947 — visual Paint layer stack; user946PASS — 23 October 2026

User reports946PASS: protect explicit undoable Clear paint / Clear paint + UVs,
stale-binding recovery/reproject and original resources/history. User now prioritizes
a Procreate-style layer list; atlas unwrap remains deferred, not implemented by Pack.
Audit current8c98072: all layer operations already belong to original Paint core and
UI controls; only dropdown presentation existed, no thumbnail/list owner.

Replace visible layer dropdown with compact top-first list in existing272px LEFT
dock:64px content thumbnails displayed40px over checkerboard, name, unique1–2-letter
blend code, opacity%, visibility toggle, selected blue row and image/mask labels.
Tap row to select; blend/opacity opens original Selected layer settings below list.
Original hidden select/visibility nodes remain event transport for original owners
and regression contracts, not duplicate visible controls. + Layer/+ Image remain
beside heading; image edit/conversion moves into selected settings. Original rename,
opacity, blend, order, delete, merge, flatten, masks and image actions retained.
Base visibility/blend/opacity stay immutable; scalar channels hide colour stack;
AO staging disables row edits. No new paint schema, budgets, history, compositor or
modelling owner. All original protected gestures/Multi1.0/frozen files retained.

src/paint-layer-list.js is presentation only; viewport painter exposes owned tiny
layerThumbnail snapshots of committed raw colour/alpha, before layer opacity/blend/
mask. Area reduction includes thin marks and alpha-weighted RGB, flips UVv0-first
rows for top-up previews, caches by immutable pixel identity using session WeakMap.
No full texture bytes exposed to DOM; no thumbnails serialized or history entries
for browsing. Updates after original Pencil release/actions/history reopen, clears
on close. Canvas thumbnails are content previews, not final composites or mask maps.

Five new tests cover all26 unique blend codes, alpha/thin/orientation/ownership,
actual UI row order/content/mask/rename/blend/opacity, visibility one checkpoint,
UndoRedo/reopen/SaveOpen, stroke Cancel and scalar/AO/close guards. Original905/906/
928 targeted19PASS. Headless Chromium rendering of actual markup/styles/list module
with fixture metadata verified no overflow at272px dock /1024 and390 viewport widths,
selection settings/visibility and screenshot inspection; real painter/history tested
through original integration harness, no iPad acceptance inferred. Screenshot is QA
fixture only; original app/session layout owners unchanged. Full/publication proof
follows. DEVICE947: layer taps/strokes/previews; blend/opacity/visibility; ordering/
image+mask selection; UndoRedo/SaveOpen and left dock scrolling/Done on iPad.

.947 final local Node24 regression: **2,746 PASS / 0 FAIL / 0 skipped** (180.9s);
original2741 and five new visual-list checks retained. Original905/906/928 targeted19
and reviewed release five pass. No original assertion relaxed. Runtime published
`789924e19b10cef2b81409d34290e3f5dccd82f0`, exact tested tree
`bb97d1e5facc367b0f52feb040f2906eb336556e`. Fetched main matched that tree and
local branch aligned cleanly. Hosted regression / Pages / live-file proof verified below.

## .947 publication verified — 23 October 2026

Runtime789924e19b10cef2b81409d34290e3f5dccd82f0 / tested tree
bb97d1e5facc367b0f52feb040f2906eb336556e published and fetched main matched exactly.
Local Node24 and hosted Node22 regression39903168453/job120249065878 both pass
**2746 tests / 0 failures / 0 skipped**; full hosted log totals verified. Original
checks retained. Pages39903167923 build120249067854/deploy120249209727 SUCCESS.
All20 checked live shell/version, layer-list/painter/recovery, retained layer/blend/
paint/project/export/AO/UV/reset/main/Multi1.0 and frozenBeta7 marker byte-match tested
source. Reverse loader keys947 reviewed; no tested runtime changes after validation.
This proof updates continuity documentation only.

Build947 ready for iPad testing: open Paint with two or more layers, tap rows and
paint distinct marks; previews update on Pencil lift. Blend code / opacity% opens
selected settings; edit them and check row/mesh. Visibility check toggles selected
row with one original Undo; Base immutable. Check image/mask rows, reorder Up/Down,
UndoRedo/SaveOpen and bounded left dock scrolling/Done. Device947 PENDING;946 user
PASS protected. General atlas unwrap remains deferred behind current UI request.


## .948 — committed colour lighting; .947 user PASS — 23 October 2026 (Brisbane)

User reports .947 PASS: protect visual layer selection/thumbnails, blend/opacity/
visibility, history/persistence and bounded LEFT dock. Continue requested repair:
colour-only UV paint/image/AO composites must rejoin scene lighting after Paint Done.
Audit main d17be438: original createCommittedPaintSurface only selected Standard for
valid roughness/metalness; colour-only intentionally stayed Basic. Studio shadow flags
were queued after material creation and could be copied too early. No missing light,
new rendering engine or second material owner is required for this specific defect.

Original committed surface now always calls its existing Standard material path for
valid channels. Colour remains exact sRGB albedo, white factor, default roughness1 /
metalness0; no scalar maps/resources invented. Stale scalar is omitted; stale colour
still refuses. Same original geometry/UV/lifetime and async identity guards. Studio
sets original body cast/receive flags synchronously before async surface creation,
so both active and inactive/locked paint replacements inherit shadows regardless of
digest/frame order. Existing Studio lights/rig/floor and reflection pool unchanged.
Paint Channel remains intentionally unlit while editing; Paint Lit preview unchanged.
Existing saved colour projects gain lit display on reopen/rebuild without migration,
resource/history/pixel/export changes. No new AO bake, general atlas unwrap or claim
that the older smooth-metal reflection report is resolved by this colour-only fix.

Four new integrations cover512/1024 exact owned sRGB pixels/UVs/shadow flags/disposal,
original Studio active+inactive/locked path BEFORE queued refresh, rebuild/diagnostic
cleanup, actual Paint Channel→Done→lit and exact Save/Open without extra history,
stale/replaced/body-loss suppression. Original920/923 colour-only Basic assertions now
require requested Standard fallback while retaining exact pixels and absent stale
scalar map; live Channel expectations remain Basic. Original904/909 committed display
checks retain exact pixel equality and now require private lit texture ownership, as
already used for scalar-lit surfaces. New+nearby paint/layers/scalar/
reflection/release30PASS. Full regression/publication evidence follows.

Reviewed entire surface→painter/render/export→Lab reverse loader graph948 and shell/
recovery keys; parent/export edits are cache pins only. Main930/cage/Multi1.0/frozen,
brushes/history/project/export algorithms unchanged. Actual GPU/iPad shadows and
appearance remain DEVICE948 gate, not established by Node material/texture tests.

DEVICE948: paint a UV cube in Colour only, Done→Studio, orbit for shaded faces; add
another mesh and switch selection, shadows/lighting remain on both. Reopen existing
painted .boxlab; compare lit display and paint unchanged. Paint Channel remains flat;
Lit preview/Done restore scene shading. UndoRedo remains in Paint; .947 layer list
remains accepted. Next narrow work follows948 device feedback; keep independent
alpha929/reflection gates and general atlas unwrap request visible.


.948 final local Node24.19.0 full regression: **2,750 PASS / 0 FAIL / 0 skipped**
(97.7s). Four new checks plus original2746 retained; targeted paint/material/layer/
duplicate/project/release50PASS. Superseded unlit/sharing expectations in920/923 and
904/909 were updated to requested lit/private-texture behavior; exact pixel, stale
channel, duplicate isolation and persistence assertions retained. Initial exploratory
full run hit those old expectations; this FINAL complete run closes all regressions.
Reviewed loader closure948; main930/cage/Multi1.0/frozen unchanged. Hosted regression,
Pages and postdeployment live-file verification follow. Device948 lighting pending.


## .948 publication verified — 23 October 2026 (Brisbane)

Runtime `a2453a6b1b12d49a310f99d281209624f4e40a61`, exact tested tree
`6f937c9c3c25802fa57cc4a83b5bcf6f4290cb32`, is published on main. Connected
Git Data uploaded22 exact blobs and created the identical local tree. Fetched main
matched, local branch aligned cleanly. Local Node24 full regression and hosted
Node22 regression39934931497/job120352039428 both pass **2750 tests / 0 failures /
0 skipped**; complete hosted log totals verified (249.9s). Pages39934930737 build
120352042059/deploy120352235264 succeeded. All19 checked postdeployment files
(shell/version, complete changed runtime/Lab graph, recovery, retained947 layer list,
main930/cage/Multi1.0 and frozenBeta7 marker) byte-match tested source. Reviewed pins;
no protected/frozen changes. This proof updates four continuity files only and keeps
tested/published runtime bytes unchanged. User947PASS is protected, not inferred948.

Build948 complete and ready for device testing: Colour-only painted UV cube → Done →
VIEW Studio, orbit for shaded faces and scene shadows. Add another mesh/switch active
selection; painted inactive objects remain scene-lit. Reopen existing painted.boxlab,
confirm appearance and original colour; reopen Paint for Channel(unlit)/Lit and retained
947 layer list, UndoRedo/continue painting. Standard material/shadow inheritance and
exact bytes verified automatically; real GPU/iPad shadow/appearance acceptance pending.
Older smooth-metal reflection and alpha929 gates remain independent; general atlas
unwrap remains future work (Pack all arranges existing islands). No new light/brush/
history/project/export/modelling owner or source pixel/schema changes.


## .949 — bounded Face atlas UVs; .948 user PASS — 23 October 2026 (Brisbane)

User PERFECT PASS948 protects committed colour-only scene lighting/Studio shadows,
active/inactive appearance, existing paint/layers/history/persistence and Channel/Lit.
Next audited deferred atlas request. Main e5bf44b3 has Box/Planar/Cylinder/Sphere/Torus,
density equalization and Pack all, but no joined-chart/general atlas solver. xatlas
is only an unused pathtrace dependency URL. No new external library/kernel imported.

Object → UV → Face atlas now stages ORIGINAL Box directional per-face projection,
ORIGINAL densityLayout with explicit one-island-per-polygon membership, then ORIGINAL
packedLayout. Only final corners commit through commitNativeUV: one native checkpoint,
read-only old/peer payloads, no source geometry/face-group changes. Repeat is an exact
no-op. Original projections/Pack/density math and Add automatic choices unchanged.

This is a FIRST bounded face atlas:1–128 planar polygons,≤20K corners, one island per
face, common average world-area density, existing .02 tile margins/gaps/grid packing.
It cuts every face boundary; it does NOT join charts, optimize packing, author seams,
or implement xatlas/general curved unwrap. Dominant-plane projection retains its
existing angular distortion; equal density fixes average area, not angle distortion.
Invalid/nonplanar/degenerate/over-limit and imported/procedural/modifier targets refuse.
This scope is visible beside the button, not hidden behind a generic Unwrap claim.

Any colour/roughness/metalness paint refuses BEFORE staging/history; UI disables Face
atlas with paint present and points to explicit existing Clear paint / Clear paint +
UVs. No silent paint discard, resampling or stale-resource rebind. Existing stale native
UVs can be replaced after clearing paint. Undo restores old UVs; paint reset remains a
separate undoable user action. Native codec, original Paint/Lit/SaveOpen/NOM/GLB owners
handle unchanged version1 source:boxlab face-corner payload. No schema/writer/history
or modelling kernel added; no automatic atlas on Add, no new UV pointer/UI owner.

Six new integrations cover concave/tilted/disconnected/subdivided planar faces,
non-overlapping separate bounds/equal average density/exact geometry,128-face limit/
scale/refusals, real original UndoRedo/idempotence/peer COW, explicit paint refusal/
clear/repaint, owner/history atomic refusal, exact native project/NOM/GLB UVs and
actual UV panel target/context callback. New+Box/Pack/density/reset/release30PASS;
no existing assertion changed. Full regression/publication follows; iPad949 pending.

Surface audit found Lab samples' old914 UV import absent from the reviewed cache
manifest. Added that REAL dependency and refreshed its samples→Lab→index ancestors,
alongside original MeshHealth/Add/Multi UV import graph949 and shell/recovery keys.
Only UV mapper + MeshHealth functionality changes; other source changes are pins.
Main930/cage/Multi-transform1.0/frozen/948lighting/paint/export algorithms unchanged.

DEVICE949: plain cube or small planar-faced extruded mesh → Object → UV → Face atlas
→ Open UV Editor: separate face islands inside tile. UndoRedo restores/reapplies UVs;
Paint/Done retains accepted948 lit scene. Existing paint: explicitly Clear paint first,
then Face atlas/repaint. SaveOpen and optional NOMAD retain new UVs/paint.128 planar
faces maximum; nonplanar faces require other projection or future chart unwrap.
Next:949 device feedback, then scoped atlas/chart improvements or Edge seam authoring
audit. General joined-chart unwrap remains queued; no automatic kernel replacement.


.949 final local Node24.19.0 full regression: **2,756 PASS / 0 FAIL / 0 skipped**
(101.7s), retaining every original2750 check plus six new Face atlas integrations.
New+nearby Box/Pack/density/reset/release30PASS. No existing behavior assertion changed
or removed. Reviewed UV/Add/Multi/Lab reverse pins949 including newly recorded Lab
sample import; main930/cage/Multi-transform1.0/frozen/948lighting unchanged. Hosted
regression/Pages/live publication proof follows. DEVICE949 remains pending.


## .949 publication verified — 23 October 2026 (Brisbane)

Runtime `342f05b4a3b2822467d025dc19000f3281434492`, exact tested tree
`57fd40f453c15363c607690fab4c6e26de538ab1`, is published on main. Connected
Git Data uploaded15 exact blobs/tree; fetched main matched, local branch aligned
cleanly. Local Node24 and hosted Node22 regression39937602575/job120360872192 both
pass **2756 tests / 0 failures / 0 skipped**; complete hosted log totals verified
(145.1s). Pages39937601356 build120360875053/deploy120361068122 succeeded. All20
checked postdeployment shell/version, complete UV/Add/Multi/Lab graph, recovery,
retained UV workspace/inspector/948 lit owners/main/cage/Multi-transform1.0/947 layer
list/frozenBeta7 marker byte-match tested source. No existing assertions removed or
changed. This proof updates four continuity files only, retaining tested runtime.

Build949 complete and ready for device testing: plain cube or small planar-faced
extruded mesh → Object → UV → Face atlas → Open UV Editor. Separate face islands,
UndoRedo, Paint/Done retains accepted948 lighting, SaveOpen and optional NOMAD.
Existing paint must be explicitly cleared first; action never discards it. Face atlas
is one island per planar face, up to128 faces/20K corners; it is not joined-chart or
general curved unwrap. Existing Box/Planar/Cylinder/Sphere/Torus/Pack/auto-Add retain
original algorithms. DEVICE949 pending; user948 PERFECT PASS protected. Next actual
949 feedback, then scoped atlas/chart/seam direction. Alpha929/reflection independent.


## .950 — Face atlas warped-face repair; .949 device FAIL — 23 October 2026 (Brisbane)

User949 reports the Equalize-density planar/non-degenerate error after ordinary
extrusions/scales. Screenshot confirms949 and24verts/20faces, far below128-face cap.
Exact supplied Extrude and scale.obj reproduces rejection: first four polygons are
mildly warped (point-to-plane deviations≈.010–.013 local units). This is949's atlas
planarity restriction, not evidence of damaged modelling topology or a stale build.
OBJ exporter header892 is the retained internal writer stamp, not shell release.
Exact input retained as tests/fixtures/extrude-and-scale-950.obj; SHA256
07178d51ab561392fa508624d088460f33b1da57ed87617ede4138c09272b46d, identical to upload.

Original Face atlas first tries EXACT949 planar path. Only its planar/area refusal
requests the ORIGINAL buildUVPreviewGeometry({faceIndices:true}) owner, forwarded
explicitly by MeshHealth UV callback. Original triangle→face/vertex metadata becomes
transient local-corner lists; no triangulator, new adjacency or mesh mutation. Require
complete n−2 triangles per polygon, valid unique corner ownership, finite nonzero UV
triangle areas and consistent per-face UV orientation. Folded/collapsed candidates
refuse with face number; absent/failed preview refuses. Temporary geometry disposes
in finally on success/error. Same original density math optionally sums measured
normalized 3D triangle areas; standalone Equalize density RETAINS strict planar rule.
Original planar outputs/extreme scales remain exact; no blanket tolerance relaxation.

Final atlas still uses original Pack/commit, one island per source face and one scene
checkpoint; source quads/ngons/positions/groups and old/peer resources remain intact.
No permanent triangulation or schema/export/history/brush/lighting changes. Original
128faces/20Kcorner/pool/history/clear-paint guards retained. UI no longer calls atlas
planar-only; says curved faces may stretch. This is still projected per-face atlas,
not joined-chart/general UV optimization or a guarantee every folded face maps.

Five new integrations exercise exact user file with20 separated equal-density islands,
unchanged24 vertices/14quads/6ngons, temporary disposal and exact repeat; ordinary
extrusion+axis-scale reproducer at .01/1/10000; original UndoRedo/Paint/exact SaveOpen/
actual NOM and GLB UV+paint slots; unavailable/malformed/folded preview/refused history/
paint atomicity; actual panel forwarding/target guards. Original949 negative unavailable
warped-preview test retained; its UI wording expectation follows intended scope change.
Original895 standalone nonplanar refusal stays active. Focused new/949/density/Pack/
release26PASS; full validation/publication follows. Native test prepares through ACTUAL
writer's versioned paint-export owner (module-local WeakMaps); canonical JSON handles
cross-realm UV prototypes without weakening exact values. Bitmap shim is transport
only, not GPU/Nomad visual proof. Main/cage/Multi-transform/frozen bytes unchanged.

DEVICE950: SAME supplied model → Object → UV → Face atlas → Open UV Editor should
map all20 faces. UndoRedo restores/reapplies original quads/UVs; Paint/Done remains
scene-lit; SaveOpen and optional NOMAD sanity. Clear existing paint explicitly first.
Exact uploaded mesh now maps in automated real-owner path; actual iPad950 gate pending,
not inferred PASS.948 scene-lighting acceptance remains protected;949 warped failure
recorded. Next actual950 retest; don't ask user to permanently triangulate a valid box
model as a workaround or add a second modelling/UV kernel. Other chart/seam work queued.


.950 final local Node24.19.0 full regression: **2,761 PASS / 0 FAIL / 0 skipped**
(101.9s), retaining original2756 plus five new exact-file/warped-face integrations.
Focused new/949/density/Pack/release26PASS. Old949 unavailable-preview/degeneracy
refusals remain; its UI text expectation reflects new scope. Standalone density895
planarity contract unchanged. Supplied OBJ fixture byte-identical; no source upload
modified. Reviewed full UV/Add/Multi/Lab/recovery950 graph, main/cage/Multi-transform/
frozen/accepted948lighting unchanged. Hosted/Pages/live proof follows; device950
SAME-model atlas/paint/UndoRedo/SaveOpen acceptance pending, no949 PASS inferred.


## .950 publication verified — 23 October 2026 (Brisbane)

Runtime `dac0fc655727a68693aa761d87ede425e12abd00`, exact tested tree
`4170c78794755c3f60417b4012d2f93d4ae65eda`, is published on main. Connected
Git Data uploaded17 exact blobs/tree; fetched main matched and local branch aligned
cleanly. Local Node24 and hosted Node22 regression39942759656/job120377956989 both
pass **2761 tests / 0 failures / 0 skipped**; complete hosted log totals verified
(247.2s). Pages39942759456 build120377961102/deploy120378158885 succeeded. All20
checked postdeployment shell/version, complete UV/Add/Multi/Lab graph, recovery,
retained UV workspace/inspector/948 lit owners/main/cage/Multi-transform1.0/947 layer
list/frozenBeta7 marker byte-match tested source. Original895 planar-density guard
retained;949 UI wording updated for intended warped-face support. This proof changes
four continuity files only, retaining tested runtime. Original supplied OBJ unchanged.

Build950 complete and ready: SAME extrusion/scale mesh → Object → UV → Face atlas →
Open UV Editor should map all20 faces. Original quads/ngons remain; UndoRedo restores
UVs, paint/Done retains948 lighting, SaveOpen and optional NOMAD sanity. Exact supplied
file now passes real-owner atlas/paint/history/transport integrations, but iPad950
appearance/performance acceptance remains pending. Clear existing paint explicitly
first. Source949 failure recorded, not accepted as PASS; user948 PERFECT PASS protected.
Next actual950 feedback before unrelated features; no permanent triangulation workaround.
