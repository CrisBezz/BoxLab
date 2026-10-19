# Roughness data and scene transport foundation — .917, 19 October 2026

User .916 PASS accepts compact left Paint, original colour/image interactions and
Object radial UV navigation. Protect those behaviours; this build adds no controls.

Audit found only sRGB baseColor resources and existing imported material-map writers.
Do not label that colour stack Roughness: scalar data must retain its byte values.
`roughness-resource.js` adds owned R8 pixels, version1, channel roughness, linear data,
UV-v0-first rows, explicit dimensions16–512 per axis, and existing UV binding digest
syntax. One byte per texel:0 smooth,255 rough; no gamma, alpha, mask or blend math.
Capture/encode/decode isolate caller buffers; committed resources are read-only BY
CONVENTION like colour resources. Frozen metadata does not freeze typed-array pixels.
Binding is retained for future original UV-key validation, not proof of current UV
compatibility. Stale resources remain stored; no stale map can be exported in917.

`project-roughness-resources.js` adds strict canonical base64 envelopes using original
project byte encoder/decoder, content+descriptor resource dedup and shared decoded
resource identity. Bound4MiB unique R8 data /8MiB reference-expanded, charged before
byte decoding. Failed adds leave quotas/pool unchanged. Reject duplicate/unused pool
entries, invalid refs, dimensions/byte lengths, wrong data semantics and unknown fields.
Existing32MiB File Save/Open limit and colour8/16 or image24/48 budgets are unchanged.
Combined maximum pools are not guaranteed to fit one32MiB file; normal file limits apply.

Scenev6 is explicit ONLY when roughness exists. Its mandatory `colourPaintVersion`
records the unchanged originalv1–5 colour envelope; original colour pool/byte-pool
owners validate that envelope. No roughness => same legacy version and exact JSON.
Legacy files with injected roughness fields refuse; v6 needs a used nonempty roughness
pool. Native UV resource envelope stays strictly UV-only. Existing linked/reference/
procedural resource owners refuse through the original native-UV eligibility guard.
No native material/provenance fields are attached to UVs.

Original object history capture/restore, addMesh and single/Multi ordinary Duplicate
share committed `roughnessPaint` and replace on edit. Original atomic project Open
stages resources and clears history only after successful installation. Corrupt Open
and failed render installation leave scene/resource identity/history unchanged.
Existing native-UV linked duplication protection remains; Join additionally refuses
roughness-only paint. Geometry/modelling/gesture/history kernels remain authoritative.

OBJ, GLB and native NOM currently REFUSE roughness-bearing objects in their shared
resolveExportMesh owner, including colour+roughness objects. This intentionally
prevents a saved channel disappearing at export; no new material writer or invented
native field. Existing colour-only and imported-map export behaviour stays intact.
Future exporter stage must copy roughness before await, validate binding with original
paintTargetKey/digest, and adapt R8 to existing scalar PNG/material writers. GLB uses
roughness G; its material identity must include both colour and roughness resources.
Normal vectors, opacity and displacement remain separate future work.

Six integration checks cover byte ownership/0–255 data, exact scenev6 + all original
colourv1–5 envelopes (including shared bytes), canonical/size/ref/budget preflight,
actual history and both Duplicate paths, real File Save/Open/corruption/install rollback,
original OBJ/GLB/NOM export + Join refusal and UV-only envelope protection. Full
regression remains active; none of these Node checks proves iPad rendering/performance.

Next: wire data export into original GLB/Nomad writers with source binding and async
capture tests, then add visible roughness channel controls/preview through existing
painter and compact panel. There is no roughness brush, map preview, scalar factor UI,
layer stack, importer, material-slot parity or displacement implementation in917.
No new manual roughness test is possible yet; existing paint Save/Open and Duplicate
are the meaningful nearby device checks. Data fixtures and refusals are automated.
