# .913 — second retained surface image refused by old paint quota

Audit base c75b8156 (.912 proof). User .912 PASS with explicit exception: first surface
image works perfectly; second add does not complete. Protect accepted first-image
placement/navigation/Apply behavior; repeated adds remain the device retest gate.

## Reproduction and repair

Actual .912 UI: two16px sources append successfully. One1024² source applies, but the
second fails with `Colour paint pool exceeds 8 MiB`. A decoded1024² source alone costs
4MiB. The resource also retains original encoded image,512² UV raster per layer,
base/flattened colour and optional masks. This is a confirmed quota refusal, not a
projection/gesture/kernel failure. No user's source file was supplied; device retest
must confirm this repair covers their reported second-add case.

New shared paint-budget.js selects bounded profiles by existing resource kind:

| Profile | Unique retained bytes | Expanded decode/working resource bytes |
| --- | --- | --- |
| Raster-only (resourcev1/v2, original scenes) | 8MiB | 16MiB |
| Image-capable resourcev3 / mixed image scene | 24MiB | 48MiB |

Three allowed1024² sources require12MiB decoded, up to6MiB original encoded,3MiB
surface rasters,2MiB base+flat and at most.75MiB masks:≤23.75MiB retained per full
resource before content dedup. Image dimensions1024²/encoded2MiB, surface512² and
three-overlay limits stay unchanged. Sources are retained exactly, not downsized.
These are retained/expanded bounds, not total process/GPU/history RAM guarantees;
whole-resource copies remain. No measured iPad performance claim or sparse-cache work.

Original stack/resource and project byte-pool owners enforce the SAME selected
profile before copies/decode/checkpoint. Byte pool upgrades to the image profile
only after an image entry passes its staged quota checks; failed adds do not raise
its allowance or publish partial buffers. Decode selects image profile from declared
v3 entries, then original strict metadata/ref/canonical/source/cache checks remain.
Per-resource kind caps also remain on decode. Raster-only8/16 tests remain active.

The original8MiB transport threshold is deliberately unchanged: larger image scenes
use EXISTING scenev5 shared-byte references, exact byte dedup and aggregate/ref checks.
No new schema, native UV fields or history owner. Old scenev1–4 encoding is unchanged;
old builds may refuse newer larger image projects by their older budget. Original
32MiB File Save/Open size gate remains; unusually large complete files can still refuse.

Existing UI now shows image-operation errors inside the active image panel, alongside
its original status message, so genuine layer/memory/geometry refusal is visible.
Screen projection, surface frame/guide/input, .911 raster/visibility/work caps, Undo/
Redo/COW/duplicates, masks/blends and original flat NOM/GLB writers are unchanged.
Changed resource/pool/parent loader graph913 includes Lab's codec chain. Protected
Multi1.0/modelling/frozen/brush/Insert owners remain untouched.

## Validation

Four new focused tests execute actual UI/core/File/native paths: repeat-add three
DIFFERENT1024² sources with independent original bytes/cache/history; same-source second
add and replacement of second; canonical shared project decode, real File Save/Open
of two then continued third add and exact native PNG; image24/48 unique/expanded
predecode refusal with zero mesh construction and atomic byte-pool refusal.

Existing908/912 IMAGE quota fixtures now exceed image24MiB, retaining refusal/rollback/
predecode assertions; invalid dimension fixture still refuses before source allocation.
Legacy inlinev4 preflight remains8MiB and raster-only .899/.904/.905/.906/.909 budget
checks remain unchanged. Cross-realm scene canonicality compares exact JSON bytes, as
in existing project tests; no assertion is removed to conceal a runtime failure.

Local Node24.19.0 full: **2574 PASS / 0 FAIL / 0 skipped**.

Next device: add first then second image On surface in ONE paint session; optionally
third; Apply each, verify originals retained. Edit second independently, UndoRedo and
Save/Open. If still failing, the panel now exposes the refusal text; investigate actual
file/geometry/state instead of assuming this quota explanation covers every symptom.
Material-channel work remains queued until repeated-image flow is accepted.
