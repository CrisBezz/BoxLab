## v0.36.18.636 — explicit gizmo owns transform over armed Face tools

Current release:
- Visible/app version: v0.36.18.636
- version.json and HTML shell title are synced to .636.

Video diagnosis from .635:
- Face selection gestures: PASS.
- Multi-face Extrude: PASS.
- Total Gizmo outer Scale ring: user reports PASS.
- Axis/other gizmo handles: FAIL; pressing them selected geometry through the gizmo.
- Gesture Debug path identified root cause:
  GIZMO DOWN -> OWNER REJECT EARLY -> GIZMO HANDOFF FALLBACK.
- OWNER REJECT EARLY was transform-upgrade rejecting because Extrude was still armed.
- total-gizmo then syntheticDown() replayed the gizmo press to the canvas, where Extrude/selection could own the geometry underneath.

.636 ownership rule:
- Expanding the Face gizmo suspends currently armed Extrude/Inset.
- Collapsing the gizmo back to the puck resumes the suspended Face tool.
- Vertex/Edge/Face gizmo handles are semantic-only. If beginGizmoGesture fails, the event is BLOCKED and is never synthetic-replayed to canvas.
- Object/Multi fallback remains unchanged.

Immediate hands-on:
1. Select several Faces with gestures, arm Extrude.
2. Activate gizmo puck. Extrude should suspend while full gizmo is expanded.
3. Test one Move axis handle, one Scale handle/ring, and one Rotate handle.
4. None should change Face selection or select geometry underneath.
5. Collapse via centre dot. Extrude should resume.
6. Confirm an Extrude drag still works after resume.
7. Repeat with Inset if 1–6 pass.

Protected:
- .615 unified gizmo transform maths unchanged.
- .616 Group/Multi routing unchanged.
- .635 modeless selection while armed remains unchanged outside explicit gizmo activation.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
