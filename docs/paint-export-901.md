# .901 — painted colour export to native Nomad and GLB

User .900 PASS protects actual main-viewport Pencil painting, both brushes/settings,
finger navigation, Done/UndoRedo, .boxlab persistence and ordinary duplicate isolation.
Audit main50bcdb2a: native image/material writer884–890 and GLB binary resource patch
already own texture handoff. Reuse those, not a parallel format/material/mesh kernel.

New paint-export.js is an EXPORT-LOCAL adapter. It captures geometry/settings, owned
paint pixels/metadata and native UV corners synchronously before the first await.
Shared committed resource identities share one owned copy/PNG per export. Binding is
validated through original900 paintTargetKey/digest; only independent native Base512²
opaque resources supported, SubD/Mirror/linked/procedural/stale UV resources refuse.
Names/positions remain outside the binding, so ordinary movement with unchanged UVs
exports current geometry. Source scene/history/resources never change. No fake GLB
provenance, imported material fields or new .boxlab resource schema is stored.
A private WeakMap registers prepared snapshot objects; low-level synchronous raw export
still refuses painted objects without preparation. OBJ and Join remain guarded.

Existing nomad-scalar-png.js now exposes RGB colour PNG beside its scalar encoder,
sharing PNG chunk/CRC/zlib packaging. Scalar type0 filtering/chunks/pixels unchanged.
Colour uses lossless RGB8, opaque alpha validated before dropping alpha, sRGB chunk,
original dimensions and UV-v0-first row order. No canvas/image decode, premultiplication,
resampling or colour-factor baking. Row0 becomes first PNG scanline, following the
original native-image + glTF UV convention/flipY=false transport, NOT the human-oriented
Lab PNG topDownPixels flip. Device placement/orientation still requires confirmation.

File NOMAD: original async map preparer snapshots first, prepares paint in parallel
with template loading, includes generated images in existing24MiB unique image budget.
Original native writer uses prepared colour source with white factor, roughness1 and
metalness0, then its proven image table, material slot, offsets/header and independent
UV/polygon buffers. Native source UV payload remains UV-only. Existing imported colour/
normal/emissive/packed/displacement paths and byte/content dedup retained. Native repeat
sampling remains its existing donor convention; no new seam guarantee.

File GLB + Base: adapter precedes original geometry builder; existing binary patch
adds PNG/image view, texture/clamp-linear sampler and neutral opaque material to all
painted mesh primitives. Shared prepared images/materials reused. Existing facegroups,
UV seam preservation, object naming and actual GLTFLoader self-check retained. Painted
path enables original preserveFaceWinding option (same preview triangulator) so front
faces/normals agree with source. Non-painted ordinary GLB keeps its original path and
winding behavior; no general file-export normals repair claim. No PBR/unlit-rendering
match promise: exact colour pixels + white factors, external lighting remains external.
GLB status reports painted count; NOMAD status already reports colour images.

.boxlab is still the editable paint project. GLB/NOM contain flattened base colour,
not brush/Undo/layers or re-importable BoxLab paint resources. No NOM import or imported
texture painting base/layers/new PBR export/seam masking claim. Current512² paint, native
UV/corner budget, existing project8MiB raw pool/32MiB file and native24MiB image limits
remain. Invalid paint refuses the whole export without a partial download.

Six new tests: exact RGB/sRGB/rows/CRC/zlib/source bytes; actual native image link/white
factors/UV and polygon bytes/dedup; real GLB exporter/loader + PNG/UV/material/front
triangles; asynchronous geometry/UV/pixel snapshots and refusal guards; actual File
NOMAD and File GLB actions/downloads/status/reset buttons. Independent PNG reader now
also handles RGB. Node ImageBitmap adapter decodes PNG transport/dimensions; no rendered
WebGL or external Nomad proof inferred. .900 high-level GLB refusal is superseded by
these export tests, raw resolver/OBJ safeguards remain. Full Node24 2500PASS/0FAIL/0skip. Publication proof recorded in handoff.

Manual: paint asymmetric colours/marks → Done → File NOMAD → open in Nomad and compare
colours/placement/orientation. Repeat GLB + Base. Duplicate different paint: both objects
retain independent images/UVs; continue BoxLab painting/Undo and .boxlab Save/Open.
Next: export device feedback/refinement, then layer/compositor design through existing
paint/history/resource owners while retaining flattened export compatibility.
