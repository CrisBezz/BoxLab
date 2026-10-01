## v0.36.18.638 — vertical Grow/Shrink gestures + Vertex hold access

Current release:
- Visible/app version: v0.36.18.638
- version.json and HTML shell title are synced to .638.

Hands-on status:
- .637 single-owner restore after gizmo collapse: PASS.

.638 gesture contract:
- Long-hold component to enter selection gesture.
- Face / Edge:
  - horizontal scrub = existing candidate browser
  - vertical UP = Grow
  - vertical DOWN = Shrink
  - axis locks once intent is clear.
- Vertex:
  - vertical UP = Grow
  - vertical DOWN = Shrink
  - no horizontal Loop/Ring browser.
- Vertical distance controls repeat count; preview always recomputes from the selection snapshot at hold-fire time.
- Existing Grow/Shrink buttons/advanced-selection.js remain authoritative.

Vertex gizmo access:
- A single selected Vertex no longer has the dormant puck sitting directly over it.
- The dormant puck is offset up/right in screen space.
- With multiple selected vertices the puck remains at the selection centroid.
- Full expanded gizmo still pivots on the true selection centre.

Immediate hands-on:
1. Vertex mode -> select one vertex. Confirm puck is offset and the vertex remains directly tappable.
2. Hold that vertex, then drag UP: Grow. Drag DOWN: Shrink.
3. On a denser mesh, drag farther vertically and verify several predictable steps.
4. Face hold: horizontal still browses candidates; vertical Grow/Shrink.
5. Edge hold: horizontal still browses Loop/Ring; vertical Grow/Shrink.
6. Confirm Paint Select still works when dragging before the hold fires.
7. Tap the offset Vertex puck and confirm the expanded gizmo still centres/transforms correctly.

Protected:
- .615 unified gizmo transform maths unchanged.
- .616 Group/Multi routing unchanged.
- .636 semantic component gizmo ownership unchanged.
- .637 Face-tool restore ownership unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
