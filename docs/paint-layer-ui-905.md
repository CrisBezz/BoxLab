# .905 — main viewport colour layers

User904PASS protects existing paint/project/Duplicate/history/NOM/GLB regression.
Audit main1d246735:903 stack/masks/blends,904 resource/project/history/export and900
viewport input already own behavior. Connect same owners; no second editor/history.

File → Paint selected object now has a Layers section: top-first selector, + Layer,
Up/Down, Delete layer, name, Visible, Layer opacity, and26 colour blend modes. Base
colour is always opaque, selectable and paintable; its name/visibility/opacity/blend
controls disabled. Up to3 transparent paint layers above base (current resource cap).
Native UV Base only, independent object, SubD/Mirror off≤20k corners still required.
Layer selection is session UI state, no history entry; reopening picks top layer.
Name/opacity/blend/visibility commit on change (opacity slider release), not a live
metadata preview. Add/Delete/reorder/metadata each one original scene checkpoint;
unchanged metadata creates none. Done keeps commits; Undo/Redo still exits Paint.

Existing opaque objects paint unchanged as resourcev1 until + Layer. Conversion keeps
all existing paint as base, adds an empty transparent layer and commits resourcev2.
Layer painting replaces only selected layer content through original stack/resource
owners. Existing masks retained exactly and continue affecting composite; mask drawing/
mask UI not in this build. No image sources/Project from View/material slots yet.
Hidden or zero-opacity selected layer refuses paint with status, keeps panel open.

Original paint-core raster now supports optional transparent=true. Default opaque
arithmetic is preserved. Same footprint/hardness/pressure/maximum-per-stroke coverage;
straight-alpha source-over computes RGB/alpha from pre-stroke bytes. Repeated dabs
within a stroke do not compound opacity; successive strokes do. Cancel restores RGBA.
No duplicate raster, stroke sampler, raw pointer or history owner. Both accepted screen
samplers reused unchanged. Native raycast/occlusion/camera/Pencil/palm/navigation owners
retained. Layer UI cancels/reverts active stroke before changing selection/settings.

Painter has separate temporary editable layer and opaque composite preview; committed
resources never edited in place. Composite via SAME903 owner at most once per dirty
frame and original one texture-dirty upload/frame. Finish/metadata updates can also
compute preview; no GPU/render/FPS or M2 performance claim. Current whole-stack capture/
composition and resource preflight allocate/copy buffers; memory excludes retained
scene history, browser/GPU/geometry. Original global50-entry history can retain many
large snapshots. Sparse updates/performance work remains after actual iPad feedback.

Before layered commit, original project colour pool preflights ALL scene paint against
8MiB unique raw budget. Errors occur before checkpoint/assignment. Invalid metadata/
full3-layer stack/failed checkpoint preserve source/history; failed stroke restores
mutable layer/preview. Existing32MiB file and canonical904 resource/sceneprojectv3 stay
unchanged. No synthetic resource or parallel paintLayers object property. .boxlab keeps
editable layers; existing NOM/GLB capture/export composes them as flat colour.

Seven tests cover transparent raster/alpha/cap/cancel vs unchanged opaque bytes; ACTUAL
UI layer add/selection/Pencil/base isolation/history; rename/blend/opacity/hidden/order/
delete and one checkpoint; navigation; interrupted stroke/dirty upload limits/max3;
base painting beneath layers; retained masks and exact projectv3 Save/Open/reopen;
budget/checkpoint/invalid-edit rollback; actual native export of UI-authored layer paint.
Original900 assertions retained, shared test runtime extracted for reuse and original
manager replacement/link owner initialized. VM arrays require exact JSON roundtrip
comparison (same as actual Open), not cross-realm prototype equality.904 refusal gate
superseded by actual layered opening/no mutation check and905 editable-path coverage.
Node DOM/Canvas/render transport is adapted; no rendered browser/iPad proof inferred.

Shell/recovery/main painter/shared raster/affected Lab child+parent loader graph905.
Resource/project/export/render/binding904, compositor903 and stroke896 remain pinned;
protected Multi1.0/frozen/modelling unchanged. Main native export algorithms untouched.

Manual: native UV object→Paint→+ Layer→paint contrasting colours on two layers;
switch/rename/reorder/hide/opacity/Multiply; verify lower content intact and Pencil/
finger navigation. Done→UndoRedo→reopen; .boxlab Save/reload/Open retains layers and
continued edit. Duplicate independent paint; NOMAD/GLB colour handoff optional sanity.
Current seam/island bleeding and512² limits remain. No imported texture base painting.
Next: device layer feel/performance feedback, then mask paint/UI using same raster/
resource; image projection/Insert tap cycle/material slots follow product direction.
