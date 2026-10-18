# .911 — Project from View and retained image authoring

Audit base b0fd19a8 (.910). User .910 PASS now protects independently painted
native Nomad duplicates. Existing .907 source/placement, .908 image stack/resource,
.909 pool/codec and original scene history/export remain authoritative.

## Workflow

Object with native UVs → File / Paint selected object → + Image. Choose PNG/JPEG
(max 1024 × 1024, 2 MiB encoded; source retained at original dimensions).
A 65%-opacity guide appears over the viewport. Pencil/mouse drag moves it; a tap
cycles Move → Rotate → Scale using Insert's actual shared cycle function. Rotate
around the guide centre; Scale by dragging horizontally. Mode button also cycles.
Finger orbit/pan/zoom still aligns the model behind the stationary image. Project
from View captures the current camera and body frame and commits one image layer.
Guide opacity is display-only; source alpha and layer opacity govern projection.

Select image layer → Edit image opens its retained source and screen placement.
Project replaces that layer's recipe and raster together, retaining name/order/
blend/opacity/mask. It projects from the CURRENT view; it does not restore an old
camera or promise a continuously sliding surface decal. Cancel keeps committed
work. Layer change or closing Paint discards staging. Save .boxlab preserves source,
placement/frame, masks and preview. NOM/GLB receive existing flattened colour maps.

## Owners and visibility

- viewport-paint.js remains the sole window-capture pointer owner. Image staging is
  a branch of that owner, not another tool listener. Palm suppression, original
  control restoration/capture release and paint-stroke cancellation remain.
- paint-image-overlay.js owns two canvas lifetimes and no input. Its affine NDC
  guide matches .907 projector, including aspect and rotation; redraw only after
  placement/viewport changes. No extra WebGL context, scene mesh or raycast overlay.
- paint-image-project.js rasterizes texel centres of ORIGINAL buildUVPreviewGeometry
  triangles. No triangulation/model kernel. Interpolate local UV→world using captured
  body frame; original .907 projector supplies clipped source coordinates.
- Use transformed triangle winding for ≤75° front-facing coverage. Original Three
  double-sided raycasts against target and visible body/inactive-body geometries
  enforce scene and self occlusion before sampling. Hidden parents do not occlude.
  Non-body helpers/gizmos are excluded, as in existing painter.
- Source is straight-alpha sRGB, nearest source pixel; output is UV-v0-first512².
  Existing byte-space compositor/masks/blends flatten it. No seam padding, anisotropic
  reconstruction or general UV unwrap claim. Boundaries can alias/bleed.
- Reject cross-tile UVs and sampled interior UV overlaps between distinct surfaces:
  shared texels cannot isolate hidden faces. Pack separate islands / Box UVs first.
  This is a texel-centre ambiguity guard, not a complete analytic UV-overlap solver.
- Work caps: 2 million UV bounding-box samples / 30 million ray triangle candidates;
  synchronous operation can briefly pause, with no measured iPad performance claim.
  Complex scenes refuse atomically; limits intentionally bound the initial CPU path.
- Existing three-overlay stack, 8MiB unique/16MiB expanded pool and project file limits
  unchanged. New images can exceed the pool alongside large painted stacks. Full
  source/cache/flat bytes remain charged. No automatic downsizing or implicit bake.
- All visibility/raster/stack/pool checks precede original checkpoint and resource
  replacement. Errors keep committed resource/history/preview; staging remains for
  correction. No new project schema, history, imported material or nativeUV fields.
- Async source decoding snapshots bytes through .907; request/selection/controller/
  lifetime guards prevent late staging after close, layer change or canvas contact.
  Original importer owns bitmap/canvas cleanup. Device orientation/resize cancels
  an active image drag; screen guide refits to current viewport coordinates.

## Validation

Seven new focused tests execute original UV geometry, Three raycasts, painter,
viewport event wiring, codec/Open/history and native writer. Cover exact asymmetric
alpha/rows, perspective/orthographic/frame, 75°/self/scene/hidden-parent visibility,
UV ambiguity/work refusal, tap cycle/drag rollback/finger ownership, actual image
commit/edit/save/reopen/native PNG, checkpoint/stack failure and async stale-source
cancellation. Overlay affine math/disposal is tested with Canvas transport adapter.
No rendered WebGL/Safari/Pencil or iPad latency acceptance inferred from Node tests.
Previous .908 image/mask/save/export and .910 native duplicate tests remain active.

## Device gate and next work

1. Add a small asymmetric PNG/JPEG; Pencil move, tap-cycle rotate/scale; fingers orbit.
2. Project onto cube/sphere front; orbit to check backside remains clean.
3. Edit image → reposition → Project; Cancel and Undo/Redo sanity.
4. Save/Open .boxlab → Edit image; mask/blend controls and Nomad colour sanity.

Next use device feedback to refine Project interaction, then surface-relative image
placement through original Insert surface math as a distinct narrow step. Current
Move/Rotate/Scale edits a SCREEN projector, not a tangent-following surface decal.
Material channel UI/displacement placeholder and broader layer UX remain queued.
