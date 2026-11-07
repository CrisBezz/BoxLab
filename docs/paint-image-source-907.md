# .907 — editable image input and camera placement foundation

User .906 PASS protects mask painting, flags, history, project continuation and finger
navigation. This build is isolated groundwork; it adds no image button or project
schema yet. Do not label it delivered Project from View or an editable image layer.

Audit: uv-image-preview892 and uv-image-surface-preview are read-only embedded GLB
references, capped/resized for inspection. They are not original-file paint importers.
paint-layer-stack903/resource904 strictly accept raster overlays; extra source fields
must still refuse. Existing Insert uses surface-transform-core437 cycle; reuse it.

paint-image-source.js provides bounded PNG/JPEG input, header dimension preflight before
browser decoding, maximum2MiB encoded and1024² decoded. Only8-bit baseline/extended/
progressive JPEG frame headers supported. Header inspection is not full file validation:
browser decoding must succeed and return exact declared dimensions. No automatic resize.
Original encoded bytes copied before await, retained exactly alongside owned RGBA8
sRGB straight-alpha browser-decoded cache, image-top-first rows. Browser colour handling
and canvas premultiplication can affect decoded RGB, particularly transparent pixels;
no cross-browser bit-parity or EXIF auto-rotation promise. Dimensions that differ after
decode refuse. Bitmap/canvas cleanup on all completed success/failure paths. Caller owns
request cancellation/generation before publishing result; importer never mutates scene.
Metadata frozen, typed arrays read-only by caller convention, same as paint resources.
Max source payload6MiB plus temporary/captured copies; NOT a new allowance on top of the
existing8MiB project pool. Integration must budget source, cache, raster, base and masks
before allocation/checkpoint. PNG/JPEG only, not SVG/network URL/animated playback.

paint-image-placement.js snapshots the original Three camera world-to-clip matrix,
NDC centre and width/height (2×2 fills viewport), CCW rotation in radians. Projection
returns image-top-first UVs (v0 at top) and clips camera near/far, behind-camera, viewport
and image bounds. Snapshot unchanged by subsequent camera navigation. Source RGBA must
be converted explicitly when baking to existing UV-v0-first texture rows. Uses original
Insert cycle export verbatim. No pointer listeners, mesh mutation or triangulation.

IMPORTANT: projector computes coordinates only. It does NOT test triangle sidedness,
normal angle or scene occlusion; the existing paint hit/proxy/geometry owner must do
those before accepting surface samples. It must never be used alone to stamp through.
No bake/rasterizer, surface-aligned placement or .boxlab transport yet. No changes to
material/export/history/native UV schemas. Both modules remain unloaded in main.

Six automated checks cover ownership/strict input, dimension/budget/header refusal,
async capture + cleanup, actual Three perspective/orthographic coordinates and camera
snapshot, translation/rotation/scale clipping, and identical Insert cycle owner.
Canvas/bitmap adapters are not rendered browser/iPad evidence. No new manual gate.

Next narrow build: explicit versioned image overlay in SAME layered resource and
project pool, owned source+placement transport/byte accounting/corruption checks,
original Undo/Duplicate/Open and flat export adapters. Then connect image picker,
overlay/Project from View and visible-front occlusion through current viewport owner.
Do not create separate image history, nativeUV fields or baked-only image editing.
