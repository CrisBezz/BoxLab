# Blur within face — .931

Base main a9f2a10d (.930); user .930 PASS protects solid Object display, component
cage restoration and continued Paint/history. Alpha929 acceptance is not inferred.

Audit found no neighbour-reading production brush. UV inspection already owns island
connectivity; original exporter owns face triangulation and grouped triangle order.
Island membership alone cannot identify safe sampled atlas texels or prevent nearby
unrelated surfaces being touched by a brush footprint. This first visible Blur is
therefore deliberately restricted to each original polygon face, including internal
triangulation edges, without sampling across polygon boundaries or UV seams.

Authoritative buildUVPreviewGeometry gets opt-in faceIndices. The ORIGINAL triangle
emission loop records one frozen source-face ID per output triangle; default previews
and all file-export output remain unchanged. Painter requests this metadata, with no
new triangulation, topology signature, mesh or history implementation.

paint-filter-domain rasterizes that exact indexed preview at the existing brush's
x/(size-1),y/(size-1) texel convention. Labels identify one face; outside and ambiguous
boundary texels cannot be edited. Distinct-face sampled interior overlaps, out-of-tile
UVs, degenerate triangles and >2 million scanned candidate texels refuse before stroke
state/history or resource mutation. Native20,000 corner and512² limits retained.
At most1MiB labels are cached per Paint session;256KiB interior scratch exists only
while constructing the map. No claim of subtexel/general overlap detection or padding.

Tool → Blur · within face uses the SAME stroke/raycast/Pencil/contact/preview owner.
Each dab gets its face ID from the actual ray hit's triangle. Writes are clipped to
that face; reads use only same-face cardinal neighbours and the centre, with weights
1/1/1/1/4. Clipped weights are renormalized. Per-stroke source pixels and per-contact
maximum coverage stay fixed: holding/retracing does not repeatedly blur; lift and
repeat for stronger smoothing. Size/pressure/hardness/opacity and optional PNG alpha
coverage reuse the original raster. Colour swatch is ignored/disabled for Blur.

Opaque/scalar channels average original raw bytes; transparent colour overlays use
premultiplied RGBA for averaging AND interpolation, then publish straight alpha to the
original layer owner. Transparent hidden RGB cannot tint neighbours. Base/layer/mask/
Roughness/Metalness selection remains authoritative; image colour stays read-only,
with its existing mask editable. No rendered appearance parity or linear-light colour
filtering claim. Linear R8 channels retain raw values without sRGB conversion.

Original per-stroke checkpoint/COW/pool/rollback, .928 Paint history reopening,
.boxlab transports and flattened NOM/GLB exports are unchanged. A1MiB private label
snapshot exists during each Blur stroke and is released by original finish/cancel;
map is not project/history metadata. Misses/fingers never start Blur. Failed ownership
construction leaves Paint open; source resources/navigation/history remain intact.

Five focused regressions cover source-face metadata/group order, original geometry
and UV identity, exact domain boundaries/refusals/work caps, byte-level filtering and
alpha/coverage/cancel, actual UI/layer/history/project/native PNG, scalar/mask separation
and checkpoint/overlap refusal. Original nearby21 checks retain semantics. Tests use
real geometry/raster/project/native writer; Node canvas/DOM adapters are not iPad proof.

Manual: paint a hard-edged mark, enlarge Size, choose Blur within face and brush its
edge; lift/repeat. Undo/Redo should stay in Paint. Try an overlay to confirm lower
paint stays unchanged, return Brush and continue. Save/Open/native export keeps marks.
This build does not implement Smudge, across-face/seam stitching, AO or seam authoring.
Next device Blur feedback, then similarly protected Smudge; AO/Edge seams remain queued.
Reflection preview independently unresolved; correct native exports remain protected.
