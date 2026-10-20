# BoxLab AI Handoff — .927 / scalar label fix and Eraser

## Current state — 20 October 2026

Build0.36.18.927 from main64886209 fixes scalar help joining slider readout and adds
Eraser through original paint stroke/raster/history. User926 Tap Fill PASS protected;
user confirms apparent metal inversion came from wrapping text, not reversed values.
Scalar hints now occupy separate rows with explicit0/255 meanings. Overlay Eraser
reveals lower layers; Base white, Roughness255, Metalness0, masks reveal.
Reflection925 remains unresolved independently; native export and924 toolbar PASS
protected. Alpha tips next; UV-safe blur/smudge queued. Validation/publication below.

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

Retest927 label separation and Eraser/UndoRedo/Brush+Fill return; protect926PASS.
Next bounded PNG alpha brush tips through original raster. UV-safe blur/smudge pending.
Reflection preview remains unresolved; obtain device/version/renderer evidence before
more lighting changes. Correct scalar values/native export and924 toolbar protected.

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

## .904 publication verified — 2026-10-18

Runtime598675a2088b03ad76f5acc9f577a036a57bc0c0; tested tree
5af1d449285527e5c99b1f2a18f24d1edbea5364 matches fetched main/local exactly.
Node22.23.3 CI39083654261/job117545612952 SUCCESS2519PASS/0FAIL/0skip;
Pages39083653898 build117545614117/deploy117545686267 SUCCESS.
All20 postdeployment live shell/version/new resource/project codec/pool/paint export/
NOM/GLB parent/binding/painter/render/management/drawer/recovery and Lab index/loader/
session files byte-match repository. Initial predeployment graph served903/new child404;
final complete checked graph904 matches. Protected modelling/Multi1.0/frozen/brush
algorithms retained; parent cache graph reviewed. All four continuity files updated.
This proof changes documentation only; no tested runtime bytes. User901PASS retained;
904 nearby device regressions remain pending, no rendered/layer UI acceptance inferred.
Next REAL layer controls/transparent brush through same resource/history, not more
parallel storage. Manual existing paint Save/Open/new-stroke UndoRedo, duplicate
isolation and NOM/GLB colour sanity. New layered fixtures are automated checks.

.905 local validation: Node24.19.0 full **2526 PASS / 0 FAIL / 0 skipped**;
seven new layer/raster/UI checks PASS, original semantic checks retained. iPad gate pending.

## .905 publication verified — 2026-10-18

Runtime30472e8d34ffe3804a5965c266de55a695a7cd8e; tested tree
7a0d19b675c99f030c32fb76361fcad0cb9edca3. Every remote blob and created tree SHA
matches tested local source; connected GitHub current main head verified30472e8d.
Node22.23.3 CI39084660612/job117548601242 SUCCESS2526PASS/0FAIL/0skip;
Pages39084660257 build117548602647/deploy117548680244 SUCCESS.
All14 checked live shell/version/painter/core/shared raster/Lab index+loader+session/
recovery905 and unchanged compositor903/resource+pool+paint export904 byte-match
repository. Source topology/Multi1.0/frozen/history/project/export owners retained.
Shell read-only git fetch stalled; publication used verified connected Git Data
blobs/tree/commit/non-forced expected-parent ref, not an unverified shell push.
All four continuity documents updated. This proof changes docs only, tested runtime
bytes retained. User904PASS recorded;905 actual layer/Pencil/navigation/latency and
project device gate pending. No cloud rendered or iPad performance proof inferred.
Next hands-on layering, then mask painting/UI and product direction as above.

.906 local validation: Node24.19.0 full **2533 PASS / 0 FAIL / 0 skipped**;
seven new mask UI/core tests PASS. Device906 pending; no rendered proof inferred.

## .906 publication verified — 2026-10-18

Runtime6824f14667f3e743bc52bc0607de52660222212f; tested tree
a4d869947ec2e27fb5314f740b1dd18e7cd325c0. All remote blobs/created tree SHA match
local tested source, connected GitHub current main head verified6824f146.
Node22.23.3 CI39087874612/job117558144690 SUCCESS2533PASS/0FAIL/0skip;
Pages39087874513 build117558146759/deploy117558241062 SUCCESS.
All12 checked live shell/version/painter/core/recovery906 and unchanged raster/Lab905,
compositor903/resource+pool+paint export904 byte-match repository. Initial predeployment
shell/painter served905; final checked graph matches906. Only intended painter/loader
source changed; protected modelling/Multi1.0/frozen/resource/project/export retained.
All four continuity files current. This proof changes documentation only and retains
tested runtime bytes. User905PASS protected;906 mask device gate pending, no rendered
browser or iPad performance acceptance inferred. Next mask feedback then editable
image sources/Project from View/Insert-cycle plan, as current product direction.

.907 local validation: Node24.19.0 full **2539 PASS / 0 FAIL / 0 skipped**; six new
focused image source/placement checks PASS. No new image UI or device gate.

## .907 publication verified — 2026-10-18

Runtime3e659dd1d09a42df0b9feabeb56ee22c6aa809cb; tested tree
028e6e81ccd7f6d8e056509b2efcf2bf53c5760d matches all uploaded blobs/created tree.
Remote main manifest/shell blob SHAs verified. Local2539PASS/0FAIL/0skip;
GitHub regression39094898396/job117579191429 SUCCESS;
Pages39094898116 build117579192795/deploy117579269550 SUCCESS.
All11 postdeployment live shell/version/source/placement/shared Insert cycle/main
painter/core/layer-resource/stack/recovery files byte-match tested repository.
All four continuity files updated. This proof is documentation-only; runtime bytes
retained. User906PASS protected. No image button or new device test in this isolated
foundation release. Next explicit image resource/project-pool integration, then
visible-front Project from View; never use coordinate projection alone for visibility.

.908 local validation: Node24.19.0 full **2547 PASS / 0 FAIL / 0 skipped**; eight new
image resource/history/project/UI/export checks PASS. Device gate remains separate.

## .908 publication verified — 2026-10-18

Runtime24e47147543e6010a99b58b0cbaf7b006d0c5310; tested tree
569840ed3dfeee9239c17984186d973200e1f0cf. All28 uploaded blob hashes and created tree
match tested local source; remote main shell/manifest blobs verified exactly.
Node22.23.3 CI39096320967/job117583416373 SUCCESS2547PASS/0FAIL/0skip;
Pages39096320411 build117583416785/deploy117583490568 SUCCESS.
All25 checked postdeployment live shell/version, changed resource/project/painter/
export/management/render/Lab loader graph, recovery and unchanged907 source/placement/
437 shared cycle byte-match repository. Protected Multi1.0/frozen/modelling/brush
bytes retained. All four continuity files updated; proof is documentation-only and
changes no tested runtime bytes. Latest user906PASS protected; no907/908 devicePASS.
Next REAL picker/overlay/visible-front Project UI per docs/paint-image-resources-908.md.
Manual908: existing paint/masks Save/Open/continue, UndoRedo/Duplicate/export sanity;
new image authoring not exposed yet, fixture coverage is automated not an iPad gate.

.909 local validation: Node24.19.0 full **2552 PASS / 0 FAIL / 0 skipped**; five new
actual duplicate/pool/recovery regressions PASS. Device release retest pending.

## .909 publication verified — 2026-10-18

Runtimeca8352337f5bfd3bc82a9235454836827d47b427; tested tree
26a49083ed61c00dce1dab6183dad49d311ce73f. All27 uploaded blob hashes/created tree
match tested local source; fetched main shell/manifest blobs verified exactly.
Node22.23.3 CI39098952488/job117591081486 SUCCESS2552PASS/0FAIL/0skip;
Pages39098952422 build117591083237/deploy117591156486 SUCCESS.
All26 checked live shell/version, shared-byte/resource/project/painter/export/render/
management/Lab loader graph, recovery and unchanged stack/image/source/placement/
Insert-cycle files byte-match repository. Protected Multi1.0/frozen/modelling/brush
bytes retained. All four continuity documents updated; proof is documentation-only,
no tested runtime changes. .908 user duplicate FAIL reproduced and repaired in source;
.909 device retest pending, latest accepted device baseline906. Next duplicate stroke
release/Done/reselect/SaveOpen/Undo test, then resume image projection UI after pass.

.910 local validation: Node24.19.0 full **2556 PASS / 0 FAIL / 0 skipped**; four new
native paint/export/name regressions PASS. Actual Nomad retest remains pending.

## .910 publication verified — 2026-10-18

Runtime7acecdcb7d1cbecbb4cc9fae7e38d91a17306638; tested tree
bbd6d9ea7989e8638ac4dad632bcffeb1046a5ab. All14 uploaded blob hashes/created tree
match tested local source; fetched main shell/manifest blobs verified exactly.
Node22.23.3 CI39100189745/job117594706071 SUCCESS2556PASS/0FAIL/0skip;
Pages39100189368 build117594707602/deploy117594794621 SUCCESS.
All14 checked live shell/version/native writer/packed parent/File export/Lab loaders/
recovery plus unchanged909 paint-export/viewport/pool/codec files byte-match source.
Only native texture-name policy changed; accepted909 viewport/persistence, image byte
identity, modelling/Multi1.0/frozen owners retained. All four continuity files current.
Proof is documentation-only, no tested runtime changes.909 user viewport PASS protected;
Nomad duplicate exception remains device-pending for910. Name collision proven removed;
private consumer caching remains inference, not rendered/native acceptance. Next fresh
NOM export of original+green copy, then further copy paint/export check; if persistent
inspect actual user NOM before speculating on other native fields. Projection UI follows.


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
