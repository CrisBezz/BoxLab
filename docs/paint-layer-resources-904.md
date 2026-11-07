# .904 — editable layered colour in original project/history/resource owners

Audit main5efdc7d9: original scene snapshots/restores and both ordinary Duplicate paths
already retain colourPaint by identity/read-only convention. Reuse these owners instead
of adding paintLayers shadow properties or another history. Main900 painter is opaque;
903 compositor supports v1/v2 stacks, masks and26 colour blends but no scene transport.

## Authoritative resource

New paint-layer-resource.js owns committed layered colour v2, stored in the EXISTING
object.colourPaint field. Existing opaque resource898 v1 and lab remain unchanged.
v2 includes the same colour descriptor and opaque pixels plus layers (owned903 stackv2).
Original captureColourResource validates opaque base; same903 compositor derives the
preview. capturePaintResource strictly validates descriptor and exact preview pixels
against stack, refusing mismatched/stale cache. No hashing/integrity claim added beyond
canonical existing project bytes and exact value validation. Typed buffers are read-only
by caller convention; metadata frozen. Stack captures copy base/overlays/masks; current
copy-all CPU/memory behavior is not optimized or benchmarked on iPad.

Storage uses original colourPaintPool with new entryv2 (descriptor + canonical flattened
bytes + stack base/overlays/masks transport). Every embedded buffer is encoded by SAME
encodeProjectBytes/decodeProjectBytes. Entire pool raw flat+base+RGBA overlays+R8 masks
≤8MiB BEFORE decoding;32MiB file gate unchanged. Whole-resource identity/content dedup,
not per-tile or independent buffer dedup. Two independently edited large stacks can hit
pool limit. All dimensions/modes/names/IDs/opacity/mask/version/ref/unknown-field guards
remain. Entryv1 encodes identically; ordinary opaque scenes stay projectv2, plain v1.
Layered scenes explicitly projectv3; v1/v2 scene refuses layer entry. Scenev3 must include
at least one layered resource. Do not confuse scenev3 with nativeUV envelopev3, which
remains strictly UV-only and receives no paint/layer fields. No fake imported metadata.

Original codec decode + exact reencode guards + manager staged replacement handle Open.
Duplicate/shared resources and capture/checkpoint/UndoRedo/deletion owners are unchanged;
editing MUST capture a replacement resource after original checkpoint, never mutate
committed arrays. Existing global Undo history is not persisted across sessions.

## Display and external export

Original committed surface owner reads opaque pixels/binding from layered resources;
validated512² native Base colours display using same original async geometry/UV guard.
Same paintTargetKey signature/UV codec/binding semantics; moving geometry does not
invalidate paint, UV/topology changes still hide/refuse stale channels.

Export capture uses new validator then an OWNED opaque v1 snapshot BEFORE await. Existing
NOM/GLB writers/material/image/PNG/UV owners remain unchanged except loader graph. External
files contain flattened colour, not editable layers. Source layers unchanged, corrupt
preview refuses export. Original OBJ/Join/unsupported owners remain guarded.

Existing900 painter explicitly refuses resourcev2 BEFORE opening surface or checkpoint,
so a new opaque stroke cannot silently discard layers. No layer UI is added here; user
cannot yet create these resources through the main app. No main mask painting, image
sources/projection/material authoring claim. Resource stores colour raster overlays only;
future image-source/placement fields require explicit versioning, not arbitrary passthrough.

## Tests and cache

Seven904 tests cover owned resource/cache rejection; exact projectv3 masks/modes/base/
row bytes and shared resources; v1/v2 compatibility, strict corrupt descriptors/refs/
budgets/unsupported owners; ACTUAL single/Multi Duplicate and history replacements;
ACTUAL File Save/Open download + corrupt layer/render-failure rollback; actual NOM and
GLB flattening plus async source capture; original committed display and legacy painter
refusal without history/resource mutation. Original899/900/901/902/903 semantic checks
retained. Canvas/ImageBitmap/render transport adapted in Node; no rendered/iPad claim.

Reviewed904 codec/resource/paint export/binding/painter/render parent graph and Lab
codec/export loader graph. Algorithms outside listed resource/export adapter/painter
guard unchanged. Multi-transform1.0/frozen betas/modelling kernels untouched. Lab904
uses original opaque .boxpaint transport, not editable layered scene sessions.

Manual regression only: existing native UV object paint→Done→Save .boxlab→reload/Open;
continue paint/Undo/Redo, ordinary Duplicate isolated paint and NOMAD/GLB colour sanity.
New editable-layer checks automated; do not ask user to synthesize a v3 project fixture.

Next: real layer/transparent brush controls in main viewport, using this resource,
original scene checkpoints and903 compositor. Never add a second paintLayers object
field/history. Follow docs/paint-material-direction.md for later image projection,
Insert Move/Rotate/Scale tap cycle, per-channel material slots and displacement placeholder.
