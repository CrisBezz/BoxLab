# .908 — image layers in the existing colour resource and project pool

Audit mainfa81af3d (.907 proof): image input/placement existed but strict903 stack and
904 project resource accepted only raster layers. This build extends those SAME owners.
There is no second layer property, scene history, image editor or triangulator.

## Delivered storage and guards

- Stackv3: base remains original opaquev1; max3 overlays, each has explicit image:null
  (paint) or image recipe. Existing stackv1/v2 unchanged; upgrade only on append image.
- Recipev1: owned907 original encoded PNG/JPEG AND decoded RGBA source,907 camera
  placement, and immutable capture-time affine objectToWorld matrix. Future projection
  uses worldToClip*objectToWorld for local geometry. Keep capture frame when object or
  camera moves. This is provenance, not a current transform interaction or new kernel.
- Layer pixels are the UV-v0-first surface raster cache, separate from source image-top-
  first pixels. Mask/opacity/blend/order operate on that cache through903 compositor.
- appendImagePaintLayer and replaceImagePaintLayer require BOTH image recipe and raster
  preview. Generic replacePaintLayer refuses pixel replacement for image layers. No
  implicit bake or conversion to paint. Source replacement uses explicit paired API.
- Resourcev3 and pooled envelopev3 retain stackv3 plus verified outer opaque preview.
  Sceneprojectv4 carries it; native UV envelopev3 remains strictly UV-only. Old plainv1,
  opaquev2 and raster-layer projectv3 encodings stay unchanged. Explicit stackv3 survives
  deletion of final image, so projectv4 may contain image-capable all-paint stacks.
- Original encodeProjectBytes/decodeProjectBytes transport every source/cache buffer;
  strict keys, versions, dimensions, image header, projection/frame and cache checks.
  Original scene canonical reencode/atomic Open and32MiB file limit retained.
- Existing8MiB aggregate raw pool includes outer flat/base/overlay RGBA/masks AND original
  encoded/decoded sources. Check complete serialized pool BEFORE any byte decoding.
  Capture preflight counts source+preview before stack copying. Whole-resource identity/
  content dedup retained; shared sources in different layer/resource recipes are charged
  conservatively per occurrence. No new resolution/size allowance or per-image pool.
- Original read-only scene checkpoints, Undo/Redo and single/Multi Duplicate share entire
  resources; edits replace via existing checkpoint/COW owner. Metadata frozen; typed
  bytes remain read-only by caller convention. Full-stack copies remain; no sparse or
  measured iPad performance claim. Budget is retained payload, not total working RAM.

## Painter and export

The existing painter opens v3, labels image layers, permits layer controls and mask
painting, and refuses ordinary colour strokes on an image. Colour picker disabled;
select a paint layer to paint colour. Base and newly added paint layers still work.
Mask strokes preserve original/source/placement/cache colour bytes exactly. Same input,
raycast/occlusion, cancellation, dirty upload and original checkpoint/preflight owners.
Source image/placement authoring controls are NOT yet exposed. Existing files do not
become v4 until an image-capable stack is actually assigned; ordinary paint stays v3.

Original NOM/GLB export adapters capture owned composited colour before await and use
original writers. They receive flattened map, while .boxlab keeps editable sources.
No editable Nomad layer equivalence, new material/displacement/PBR claim or NOM import.
Committed preview binding/stale topology guards unchanged; protected modelling/Multi/
frozen bytes retained. Child + parent loader graph and Lab codec graph refreshed908;
brush905/stroke896/blend903/input methodology/Insert437/source+placement907 retained.

## Validation and next step

Eight focused tests: exact source ownership/schema/compositing; projectv4 lossless and
whole-resource dedup plus legacy encodings; invalid fields/data/frames/cache/versions and
complete pool preflight; actual single/Multi Duplicate/history; actual File Save/Open
and atomic rollback; actual painter/UI mask/colour guard/layer controls/reopen; budget/
checkpoint rollback; original NOM/GLB exact composed pixels and async snapshot.
Fixture layer raster is supplied explicitly; tests do not claim it was projected from
source. Outer preview validated against compositor, not geometrically regenerated from
recipe. Header validation does not fully parse/decode PNG/JPEG on project Open; retain
browser importer validation for new files. No new browser/WebGL/iPad acceptance inferred.

Next narrow build: image picker + overlay and explicit Project from View through current
viewport owner and original UV geometry. Implement triangle-facing angle and scene/self-
occlusion BEFORE accepting texels;907 projector supplies coordinates only. Capture frame
at Project, publish recipe+raster atomically through908 APIs/pool/history. Then surface
Move→Rotate→Scale via original Insert cycle; no parallel raw pointer owner. Save/Open must
retain the image and support later re-projection; keep bake explicit and separate.

Manual908: existing paint/masks → Save/Open → continue; Undo/Redo; painted Duplicate
isolation and NOM/GLB colour sanity. New image creation is automated fixture coverage,
not a user task until authoring UI lands. .906 PASS protected; no .907/.908 device PASS.
