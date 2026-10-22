# .938 — merge colour layers

User accepted .937 with “Perfect PASS”. This build frees existing layer slots.

Merge to Base bakes the selected layer and all lower layers into opaque Base.
A pair-only merge cannot generally retain backdrop-dependent blend results, so the
prefix is evaluated by existing flattenPaintLayerStack with its exact byte rounding.
Upper layers remain unchanged. Flatten colour evaluates the entire stack into Base.
Hidden merged layers are removed; UI states this before acting. Merged images lose
source editing, but original Undo restores them. Undo history can retain old bytes.

paint-layer-stack.js owns the pure operation. viewport-paint-core.js uses existing
capture/commit/preflight/checkpoint/history and guards staged image placement.
viewport-paint.js exposes two buttons in existing collapsed Layer settings. Scalar
channels disable both; Base cannot merge, an empty stack cannot flatten. Successful
actions select Base/Colour. No new panel, history owner, compositor or schema.

No resizing or budget expansion:512/1024 colour, production fresh1024, scalar512,
three overlays, source1024/tip256; File96MiB conditional/32MiB ordinary and native24MiB
limits unchanged. Other runtime edits only refresh complete reverse import pins.
Main/cage/Multi1.0/frozen betas remain unchanged.

Six integration tests cover26 blends, masks, wrapped source images, version ownership,
exact pixels, resource bytes/slots, real1024 UI,512 core, UndoRedo/SaveOpen/native PNG,
peer/scalar isolation and atomic staged/stale/checkpoint/quota refusal. Full local
suite2697PASS/0FAIL/0skip; device acceptance remains separate.

Hands-on: make several layers, Merge middle to Base and compare; Undo/Redo; Flatten
and add another layer; Save/Open and compare. Keep future work narrow and audited.
