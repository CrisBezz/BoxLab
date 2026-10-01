## v0.36.18.637 — single-owner restore after gizmo collapse

Current release:
- Visible/app version: v0.36.18.637
- version.json and HTML shell title are synced to .637.

Hands-on status:
- .636 explicit gizmo ownership over armed Face tools: PASS.
- Face gestures, multi-Extrude and gizmo handles now coexist without click-through.

.637 hardening:
- When a Face tool was suspended for gizmo use, collapse now:
  1. disarms Move/Scale/Rotate transform arming,
  2. clears transient gizmo state / exact-entry float state,
  3. restores the suspended Extrude/Inset tool.
- This guarantees one logical owner after collapse instead of allowing a hidden transform state to survive underneath the resumed Face tool.
- No transform or topology maths changed.

Immediate hands-on:
1. Arm Extrude.
2. Expand gizmo and perform Move.
3. Collapse with centre dot.
4. Extrude should be the only active/lit tool and should immediately drag-extrude normally.
5. Repeat with Scale and Rotate.
6. Repeat once with Inset.
7. Re-open gizmo after resume and confirm Face tool suspends cleanly again.

Protected:
- .615 unified gizmo transform maths unchanged.
- .616 Group/Multi routing unchanged.
- .636 semantic component gizmo ownership unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
