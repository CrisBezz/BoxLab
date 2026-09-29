## v0.36.18.570 — Total Gizmo v1 working prototype

- First implementation pass of the unified BoxLab Total Gizmo after the .568 UI cleanup.
- New isolated module: `src/total-gizmo.js`.
- Object mode only in this first prototype.
- The gizmo drives the established transform engine underneath it; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Combined controls currently included:
  - center puck = free move
  - X / Y / Z arrows = axis move
  - X / Y / Z rotation arcs = axis rotate
  - inner neutral ring = screen/view rotate
  - outer orange ring = uniform scale
  - small X / Y / Z square handles = single-axis scale
- Projected X/Y/Z move/scale axes follow the current camera orientation.
- Visible geometry remains thin while invisible 16px SVG hit strokes provide Pencil/finger-friendly targeting.
- Hover/proximity emphasizes the candidate handle; while dragging, competing handles dim.
- Live compact HUD mirrors established transform feedback during a gizmo drag.
- Touch/Pencil starts are handed into the existing transform engine as a gizmo-owned transform gesture so they do not get rejected as ordinary viewport touch navigation.
- Existing Move / Scale / Rotate strip remains temporarily as a fallback during gizmo testing.
- Static test added: `tests/total-gizmo-570.test.mjs`.
- Syntax/static regression 13/13 PASS.
- Frozen Beta 5 v0.36.18.538 untouched.

Hands-on test:
1. Switch to Object mode and select/activate an object: Total Gizmo should appear at its center.
2. Orbit camera: X/Y/Z move axes should continue to point along projected world axes.
3. Drag center puck: free move.
4. Drag red/green/blue arrow shafts: X/Y/Z constrained move.
5. Drag red/green/blue small square handles: X/Y/Z constrained scale.
6. Drag colored rotation arcs: X/Y/Z rotation.
7. Drag inner neutral ring: screen/view rotation.
8. Drag outer orange ring: uniform scale.
9. Hover/Pencil proximity should thicken/highlight the intended handle; active drag should dim competitors.
10. HUD should show live transform feedback.
11. Confirm one-finger orbit, two-finger pan, pinch zoom, Undo/Redo remain unchanged away from the gizmo.
12. Existing transform strip must still work as fallback.

Next after hands-on validation:
- tune geometry/spacing and hit priorities
- add planar move handles
- begin integrated precision/type-in HUD
- then extend same gizmo language to Face/Edge/Vertex selections

