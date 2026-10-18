# .909 — duplicate paint persists on Pencil release

User .908 FAIL: paint on duplicate disappears on Pencil release. Audit main0313796f,
release908; reproduced with actual painter/UI and original ordinary Duplicate. Source
has3 coloured paint layers (with or without mask). During drawing the temporary preview
shows the stroke. Commit charges the source stack AND the edited duplicate's whole
stack (base + flat + every layer/mask), exceeding8MiB. It rolls back and previously
closed Paint. Existing duplicate tests assigned replacement resources directly; they
did not paint a full-stack duplicate through actual pointer release. Preserve this
regression coverage rather than claiming earlier synthetic Duplicate checks proved it.

## Fix through the existing pool and codec

Original resource/stack/scene history/duplicate and pointer owners remain authoritative.
No paint/model kernel or shadow history added. Existing paint pool now counts exact
canonical byte content once across resources and layer/base/flat/mask/image buffers.
Equality uses complete canonical encoded bytes plus length, not hash alone. Whole-
resource identity/content dedup retained. Unique retained transport budget remains8MiB.
A separate16MiB expanded resource budget bounds repeated owned decode/capture buffers;
it is NOT total JS/GPU/Undo RAM, and no iPad performance claim follows. Copies remain
copy-all at resource capture, not sparse live COW. The pool's add preflight stages all
new buffers and publishes none if either budget refuses.

Projectsv1–4 retain exact previous encoding whenever expanded inline resources fit8MiB.
If inline resources exceed8MiB but unique buffers fit8MiB and expanded buffers fit16MiB,
Save uses explicit sceneprojectv5:
- colourPaintBytePool:{version:1,buffers:[original canonical byte transport…]}
- colourPaintPool entries:{version:4,entry:original v1/v2/v3 resource envelope with
  {version:1,index} byte refs at every binary position}
- existing object colourPaintResource refs unchanged.

SAME paint-layer-resource strict envelope walker maps inline bytes or refs. Complete
unique+expanded/ref/schema/usage/duplicate checks BEFORE binary decode; original byte
codec verifies canonical base64; original resource verifies metadata/UV/mask/cache.
Unnecessary pooled encoding, unused/duplicate bytes, bad versions/refs/data, resource
and scene duplicates/ref usage still refuse. Each resource remains≤8MiB expanded.
Original32MiB file cap, nativeUVv3 and GLB image pool untouched. Atomic File Open and
canonical reencode checks retained; .boxlab remains editable and NOM/GLB flattened.
No automatic bypass of genuinely distinct data above quota. Save/Open and paint commit
use SAME pool accounting, including opaque colour (previously preflight only layered).

A refused stroke still restores committed preview/resource/history and navigation.
Paint stays open with the existing visible error, so user can recover; body/target/
mode invalidation retains existing close owner. No gesture/render/topology changes.
Parent and Lab codec loader graph refreshed909; stack/image owners908, source/placement
907, brush905/blend903/Insert437/protected modelling/Multi/frozen remain unchanged.

## Verification and device gate

Five new regressions: actual single and Multi Duplicate → move copy → Pencil paint
3layers+mask → release → original committed display → Undo/Redo → actual File Save/Open
v5/re-edit; corrupt byte-pool File Open atomic rollback; strict corrupt refs/data/
versions/duplicate/unused buffers and both predecode budgets; staged pool refusal and
true unique quota; UI checkpoint refusal restores bytes and keeps Paint open.
.906 budget fixture updated to use8MiB of DISTINCT bytes before mask allocation, since
repeated white base/flat bytes now correctly share the charge. The quota/rollback
assertions stay active. All earlier source ownership/export/mask semantic checks stay.
Node UI/render adapters are not Safari/WebGL/iPad evidence. Latest device PASS remains
.906; .908 duplicate FAIL is fixed in source, .909 device retest pending.

Manual: duplicate painted layered object, move apart, paint on copy and lift Pencil;
original unchanged. Done/reselect preserves paint. Save/Open and continue painting;
Undo/Redo restores only intended copy. Then resume image projection roadmap after pass.
