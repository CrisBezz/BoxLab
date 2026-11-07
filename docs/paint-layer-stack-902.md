# .902 — bounded layer/compositor foundation

User PASS .901 accepts painted NOMAD/GLB colour placement/orientation, duplicate
separation and continued BoxLab editing/project persistence. No .895 PASS inferred.

Audit at main 0bfb6819: main viewport900 uses createPaintLayer896, whose stroke
coverage blends directly into an opaque white-backed RGBA map. Resource898,
project899, display900 and export901 all require opaque colour. No production layer
stack/compositor exists. Klecks curve extraction is stroke sampling only; importing
its editor/history would duplicate existing BoxLab owners.

New src/paint-layer-stack.js is an isolated data/compositor API. It is intentionally
NOT imported by the main app or lab yet. Version1 stack has one existing opaque
colour resource base and zero to three straight-alpha overlays, dimensions16–512
per axis. IDs unique, names bounded64 characters, visibility boolean, opacity0–1;
unknown fields, bad descriptors, mismatched buffers and excess layers refuse.
Base row order/binding/channel remain the original resource owner's contract.

Capture, append and explicit overlay replacement own copied buffers; metadata and
arrays frozen. Pixels remain read-only by caller convention, not immutable typed
arrays. No history, gesture, render, triangulation, scene resource or project codec
owner is added. Current foundation copies all buffers per edit; no sparse/COW or
performance claim. Four512² RGBA buffers total4MiB per stack, temporary copies and
flattened outputs are additional allocations; this is not an app memory ceiling.

Bottom-to-top normal source-over uses straight alpha times layer opacity, rounds
RGB bytes per layer, keeps output opaque. Blend in sRGB BYTE space deliberately
matches accepted brush raster semantics, not linear-light compositing. Hidden/zero
opacity/zero alpha leave underlying bytes untouched. Flatten never trusts a cache
and returns the SAME v1 opaque resource type through captureColourResource, so
existing display/project/PNG/NOM/GLB owners remain the eventual handoff target.
No editable stack is assigned to colourPaint; strict project/export envelopes
continue rejecting it. Flattening alone discards layer editability.

Five tests cover exact fractional alpha/opacity/order/endpoints/visibility and
asymmetric rows; independent inputs/edits/outputs; schema/buffer/budget/ID refusals;
maximum-size four-layer stack; actual original project codec and native Nomad PNG
round-trip of flattened pixels, and refusal to store an editable stack as opaque
colourPaint. Full-suite results and publication proof live in handoff/history.
No rendered/iPad layer interaction, GPU/performance, transparent brush, layer UI,
editable-layer Save/Open or global history integration is claimed.

Next narrow build: explicit separate scene layer resource/project pool, preserving
old opaque project reads, bounded allocations, atomic Open and duplicate/history
isolation. Only then connect transparent stroke raster and layer UI through the
current viewport/history owners. Keep flattened resource compatible with901 export;
never silently save a layered session as a flattened editable project.

No new hands-on test in902: no layer UI/runtime path is enabled. Existing901 PASS is
protected. Shell/recovery release902; accepted runtime/lab pins intentionally kept.
