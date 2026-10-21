# .935 — Convert retained image to paint


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

This is an explicit raster conversion of the committed512² image preview. It retains
straight RGBA pixels exactly and leaves masks/blending as editable layer settings.
It is neither Merge Down nor a higher-resolution bake. Conversion occupies the same
slot; the next planned merge work addresses layer count. Source editing can be restored
by current scene Undo; saving the converted result saves editable pixels without the
selected layer's source recipe. Full stack, project and writer schemas remain unchanged.

A PNG fixture initially tried the RGB export encoder with transparent pixels; corrected
the test to use a real RGBA PNG fixture. The original exporter properly rejected that
input. No production alpha/export guard was weakened. Existing .908 read-only message
assertions retained by preserving their original prefix and appending conversion help.
