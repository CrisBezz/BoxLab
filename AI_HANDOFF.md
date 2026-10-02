## v0.36.18.664 — Edge Extrude side constraint palette

Current release:
- v0.36.18.664

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.
- .663 Edge Extrude radial workflow: extrusion works.

.664:
- Refines the .663 Edge Extrude radial constraint UX only.
- Existing drag-on-edge Edge Extrude interaction is preserved unchanged.
- The temporary Extrude constraint gizmo is now offset beside the selected Edge/chain instead of sitting directly on top of it.
- Offset automatically chooses the side with room in the viewport.
- Purpose is to read as a nearby constraint palette, not as a drag handle for the extrusion itself.
- Added compact contextual badge:
  - Extrude
  - current constraint (Plane ⟂ edge or X/Y/Z axis)
  - “Choose constraint • drag edge”
- Active constraint is highlighted on the mini gizmo.
- X/Y/Z and centre still only select constraint; they do not transform geometry.
- Actual ribbon preview/commit remains owned entirely by src/edge-extrude.js and begins by dragging the selected boundary Edge(s).
- Successful pulls continue to select the new outer rail; the side palette follows that new selection.
- No Edge Extrude topology, projection, validation, rollback, history or repeat-pull logic changed.

Immediate hands-on:
1. Select a valid boundary Edge/chain -> radial Extrude.
2. Expect the simplified constraint control offset beside the selection, not centred on it.
3. Default Plane should be clearly identified/highlighted.
4. Tap X/Y/Z; active constraint label/highlight should change without moving geometry.
5. Drag the Edge itself to Extrude; new outer rail should remain selected and the palette should follow it.
6. Near the right side of the viewport, palette should flip to the left rather than run off-screen.

Next after PASS:
- Continue Edge tool viewport-session centralisation with the next Edge tool that still depends on left-panel settings.

Protected:
- .657 Edge candidate selection.
- .659 additive Edge hold semantics.
- .661 Loop Cut ownership + Bevel reset.
- .662 Bevel viewport session.
- .658 radial availability.
- existing Edge Extrude topology/ribbon engine.
- drag-on-edge Edge Extrude interaction.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
