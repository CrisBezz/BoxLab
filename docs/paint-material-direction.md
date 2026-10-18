# Paint, image projection, layers and materials — user direction, 18 October 2026

This is product direction, not a list of implemented features. Repository source and
current AI_HANDOFF distinguish delivered functionality from staged work.

## User requirements

- BoxLab supplies direct mesh paint alongside existing Nomad import/bake workflow.
- Paint layers AND editable image layers. Import image onto surface; Move/Rotate/Scale
  with Pencil. Reuse Insert methodology: tap cycles Move → Rotate → Scale → Move.
  Audit src/insert-tool.js and shared cycleSurfaceTransformMode in
  src/surface-transform-core.js before implementing image gestures; no second raw
  pointer owner layered on the modelling app. Preserve normal finger navigation.
- Project from View: screen image over model; user aligns model behind it and presses
  Project at current orientation. Visible/front-facing coverage and angle limits;
  no stamp-through to hidden/back surfaces. Capture projection/view state explicitly.
- Keep source images and placement editable; explicit bake is separate. Store original
  source + placement when image implementation lands, not only flattened raster bytes.
- Non-destructive masks on paint/image layers: black hides, white reveals, grey partial;
  enable/disable/invert, eventually linked/unlinked independent placement/editing.
- Familiar layer order/name/duplicate/visibility/opacity and blend modes from supplied
  screenshot: Normal; Darken, Multiply, Color Burn, Linear Burn, Darker Color; Lighten,
  Screen, Color Dodge, Linear Dodge, Lighter Color; Overlay, Soft Light, Hard Light,
  Vivid Light, Linear Light, Pin Light, Hard Mix; Difference, Exclusion, Subtract,
  Divide; Hue, Saturation, Color, Luminosity. Define behavior rather than assuming
  every app uses identical math/colour handling. Channel overrides are eventual scope.

## Material slots from user's Nomad screenshot

| Slot | Intended controls |
| --- | --- |
| Color | colour factor + map/layers |
| Normal | map + strength; vector-aware composition |
| Roughness | scalar value + map/layers |
| Metalness | scalar value + map/layers |
| Opacity | scalar value + map/layers, separate from coverage masks |
| Displacement | reserved map + settings; geometry Apply disabled until implemented |
| Emissive | colour/map + separate intensity |

Do not conflate layer opacity, layer mask, material opacity and geometry displacement.
Normal vectors must not inherit ordinary RGB modes blindly. Non-colour maps use data
semantics, not sRGB colour compositing. Actual displacement needs mesh density and
Undo-safe vertex changes; placeholder must never imply a working Apply. Existing
imported displacement native export888 remains authoritative and is not removed or
reimplemented by this direction. Audit current material/resource/export owners first.

## Implementation sequence

1.902 opaque base + transparent overlay compositor foundation delivered.
2.903 colour blend functions + per-overlay masks, v1→v2 owned upgrade delivered,
  isolated API only. No mask drawing, image source schema or material slots UI yet.
3.904 layered colour resourcev2 in existing colourPaint, explicit projectv3 and original
  history/duplicate/atomic Open integration delivered. See paint-layer-resources-904.md.
  Preserve explicit project pool via existing codec, atomic
  Open, original scene Undo/Redo and ordinary Duplicate. Retain v1/v2 plain/opaque
  project compatibility and binding validation; never silently flatten editable saves.
4.905 transparent brush + layer controls delivered in main viewport through current
  painter. 906 mask drawing/enable/invert/remove UI delivered through same owner;905 layer UI
  accepted. Broader UX polish follows feature flow work as user requested.
  Copy only edited payload where safe; no duplicate scene/paint history or editor.
5.907 image source/placement foundation;908 retained image layer resources/projectv4
  and original history/export integration delivered. Next picker/overlay + Project
  from View, then surface placement via audited Insert cycle.
6. Material slots and per-channel stacks in stages; displacement reserved until real
  implementation. Preserve current rich imported maps/export without false parity claims.

.boxlab should retain editable sources/masks/modes/placement. NOM/GLB should receive
composited channel maps through existing writers where supported; never silently drop
unsupported data or invent native fields. Editable Nomad layer equivalence is not
promised. Current512²/four-layer foundation budget is provisional, not the final UI
limit. Measure iPad memory/upload/frame costs before raising resolution/layer counts.
