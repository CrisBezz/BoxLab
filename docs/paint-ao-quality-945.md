# Higher-resolution AO quality (.945)

## .945 — higher-resolution AO and cancellable quality jobs — 23 October 2026 (Brisbane)

User944PASS with explicit poor/patchy AO quality exception. Protect the existing
preview/Apply/Cancel/layer/history/persistence workflow; AO appearance is NOT accepted.
User authorizes higher resolution /nextbuild. Audit main6ddd9d2: actual bake64²/16
rays only;1024 colour texture was just interpolated shade. Existing pathtrace-only
remote BVH is unrelated to this CPU baker; no additional kernel/library imported.

Original baker now has ONE generator tracing kernel. Legacy bakePaintAO remains
synchronous, exact64/16 outputs and8M work cap/128 maximum retained. Async high path
permits≤256²/64 rays with a separate FIXED128M conservative ray/triangle-work cap;
original2M UV scan cap/20K triangle bound retained. No unbounded caller work limit.
Chunk events every65,536 visited triangle candidates; runner checks AbortSignal and
yields to browser timers after approximately8ms accumulated work between events.
Ray preparation/UV raster remain bounded synchronous setup; no hard frame-time or
M2 latency guarantee. Trace and final face-safe transfer share same scheduler.
Cancellation drops staged data; source geometry untouched. Owned domain labels reused
for transfer instead of rasterizing low grid twice. No new triangulation/UV raster/
adjacency/ray kernel. Original hemisphere/radius/bias formulas and sampling pattern
unchanged, merely more positions/directions. No denoiser or all-patchiness-solved claim.

Paint AO Quality: High(default)256²/64 samples; Medium128²/64; Quick64²/16. High has
16× baked pixels and4× sampled directions versus944 (up to64× sampling work for the
same coverage/mesh). Geometry/occlusion can require fewer actual intersection visits;
cap refuses complicated layouts, suggest Medium/Quick or simpler mesh. Existing
colour512/1024 textures, source/tip/scalar resolutions, layer/resource/File/export
budgets and schemas unchanged. Old saved AO pixels stay as-is; hide/delete old AO
layer and rebake to compare rather than stacking two shadow layers.

Original Paint session stages async job with progress/Cancel; pending job blocks
paint/layer/channel/quality edits while fingers navigate. Cancel, Done/close/body
loss/history abort it; late results cannot publish into a new/stopped/replaced job.
Fresh mesh-position/UV/current-resource and original pool guards precede preview;
Apply remains ONE original checkpoint/COW commit to an editable Multiply layer.
State flags are transient only; no persistent AO recipe or new history owner.
Quality is session UI preference, not saved project metadata. Existing Quick remains
byte-identical. Same-face coverage transfer still excludes atlas neighbours; thinner
UV faces now get actual256-grid samples rather than borrowing another face's shade.

Six new tests cover genuine256/64 grid and finer shade levels, exact asyncQuick parity,
new thin-face coverage and isolation, progress/abort/pre-abort/invalid quality,
actual painter cancel/close/stale/retry/checkpoint/pool/work refusal, actual UI default/
Cancel while busy/Done late-result suppression/Quick comparison. Original943+944 eleven
and reviewed release five pass. No original assertion relaxed; old943 size129 and
8M refusal checks remain active. Read docs/paint-ao-quality-945.md. Full/publication
proof follows. All changed AO/painter/shell reverse loader pins945 reviewed; main/
cage/Multi1.0/frozen/modelling/UV/project/export algorithms unchanged.

DEVICE945: on SAME recessed model hide old AO, Quality Quick→Bake/inspect/Cancel;
High→Bake/inspect at same Reach/Strength, compare detail/banding and wait time. Cancel
DURING High and confirm no layer/history; rebake/Apply then Layer opacity/visibility,
Paint UndoRedo and SaveOpen/native shading. Use Medium if work guard refuses High.
Actual iPad smoother-result/latency acceptance pending; alpha929/reflection gates
independent. Next narrow improvement follows user comparison; do not guess a light
source or silently smooth unrelated UV islands to hide remaining defects.
