# Editable AO Multiply layer (.944)

## .944 — editable AO Multiply layer preview — 22 October 2026 (Brisbane)

Base main0a4e094 /943 audited. No existing AO UI/layer transaction found. New small
paint-ao-layer helper calls the original943 baker at64²/16 rays and original UV
filter-domain raster at64 and current512/1024. Same-face, coverage-aware bilinear
transfer renormalizes only matching source-face samples; atlas neighbours never
contribute. Uncovered/unsampled thin faces stay transparent. Radius remains a
fraction of LOCAL object diagonal; no world-transform/scene-neighbour/ground/SSAO.
Colour Multiply uses existing byte-space compositor, not a physically linear PBR AO
slot or high-resolution ray bake. Current colour/scalar/source/tip budgets unchanged.

Original painter owns transient AO preview, pool validation, one Apply checkpoint,
COW resource assignment and selection. New layer is ordinary editable raster named
AO n, Multiply, user Strength as Layer opacity; existing visibility/mask/eraser/paint/
Delete/Merge/Flatten/history/SaveOpen and flattened native/GLB writers remain owners.
No saved AO descriptor/recipe/schema or new writer/history/gesture/modelling kernel.
Preview never assigns object colourPaint or enters Save/history; Cancel/Done/history/
body loss discards it. Apply rechecks live positions/UV binding/current target and
pool before checkpoint; failures keep committed resources/history unchanged.

Compact LEFT Paint → collapsed Ambient occlusion: Reach5–100% (default25%),
Strength0–100% (default65%), Bake AO preview, Apply AO layer / Cancel AO. Preview
blocks paint and layer/channel edits; fingers still navigate. Apply selects AO layer;
existing layer opacity/visibility can change strength afterward. Existing Undo/Redo
retains Paint with ORIGINAL selection rules (Redo may keep Base selected; select AO).
Image placement must Apply/Cancel first; image sources/scalars stay independent.
Three-overlay cap remains; merge/delete to free a slot. Bake defaults64/16 fixed;
8M ray-work and2M UV-scan limits refuse complex/overlapping/out-of-tile layouts before
resource/history changes. Final transfer≤4 texel samples per512²/1024² destination.
No interactive cancellation during the bounded synchronous calculation or iPad
latency/RAM/appearance claim. Small low-poly UV meshes first; convex cube may show
little/no darkening. Concave/recessed geometry is the meaningful appearance test.

Important failed approach: manager.objects/target getters call saveActive and CLONE
the active mesh. Reference identity cannot establish unchanged AO source. Original
UV key plus exact serialized live vertex content guard the candidate; do not add an
identity-only check or mutate the manager to make such a check pass. Temporary debug
reason text removed. No accepted manager/mesh/export algorithm changed.

Six new integrations pass:512/1024 domain-safe output/source preservation; transient
preview/Cancel/Apply/opacity/visibility/scalar/peer isolation; actual1024 UI+original
Paint history+SaveOpen+exact NOM/GLB PNG; checkpoint/pool/deformed-source/close refusal;
scalar/mask/full stack/complexity guards; retained images/staged mutual exclusion and
Done discarding unapplied AO. Original nearby943/938/942 tests16PASS; release5PASS.
Read docs/paint-ao-layer-944.md. Full/publication evidence follows. User942PASS remains
protected; /nextbuild is not AO device acceptance. Alpha929/reflection gates separate.

DEVICE944: simple recessed UV mesh → Paint → Ambient occlusion → Bake; orbit,
Cancel retains previous paint. Bake→Apply creates AO layer, adjust Layer opacity/
Visible; UndoRedo keeps Paint, select AO if needed; SaveOpen/native export keeps shade.
Next: actual iPad quality/latency feedback, then narrowly refine AO quality/coverage/
work budget as evidence warrants. No automatic further AO feature before device gate.
