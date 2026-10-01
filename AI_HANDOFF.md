## v0.36.18.640 — global Face-direct release ownership

Current release:
- Visible/app version: v0.36.18.640
- version.json and HTML shell title are synced to .640.

Why .640 exists:
- .639 hands-on showed multi-face Extrude preview correctly while Pencil was down, then snapping back on Pencil lift.
- No topology-gate rollback message appeared, so the failure path points to release ownership / cancellation rather than bad preview topology.
- multi-face-direct still finished at document capture.

.640 change:
- Extrude/Inset finish now runs at window capture for pointerup and pointercancel.
- This matches the repo's proven completion rule used by Total Gizmo and modeless holds.
- Added Gesture Debug marker:
  FACE DIRECT FINISH • type=pointerup|pointercancel • changed/preview/blocked state.
- Normal pointerup commits as before.
- Genuine pointercancel still rolls back as before.

Immediate hands-on:
1. Recreate the dense multi-face selection from .639.
2. Arm Extrude and drag outward.
3. Lift Pencil.
4. Geometry must stay extruded.
5. With Gesture Debug ON, confirm FACE DIRECT FINISH shows type=pointerup.
6. Repeat one simple single-face Extrude and one Inset.
7. If snap-back still happens, send the FACE DIRECT FINISH line; pointercancel vs pointerup will tell us the exact next fix.

Protected:
- .638 Grow/Shrink gesture contract unchanged.
- .639 collapsed gizmo hit isolation unchanged.
- Extrude/Inset topology and Through kernels unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
