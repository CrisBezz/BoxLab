## v0.36.18.635 — selection stays available while tools are armed

Current release:
- Visible/app version: v0.36.18.635
- Release manifest: version.json = 0.36.18.635
- HTML shell title is synced to v0.36.18.635.

Why .635 exists:
- .634 added explicit component gizmo collapse.
- Hands-on then showed basic deselection was still blocked in two armed-tool states:
  1. Extrude/Inset bypassed main.js, so background taps had no deselect owner.
  2. legacy pre-.615 face/rotate transform listeners still consumed component taps while Move/Scale/Rotate was armed.

.635 behavior:
- Extrude/Inset remain armed while a quick Pencil/mouse background tap clears Face selection.
- A quick selected-Face tap under Extrude/Inset still toggles that Face without disarming the tool.
- Movement beyond the tap threshold cancels background deselect and preserves direct drag editing.
- Touch background gestures are not claimed, preserving iPad navigation.
- Legacy face-transform.js and rotate-transform.js stand down whenever the modern Total Gizmo/puck is visible.
- Therefore component selection/deselection returns to the modern main.js selection owner while Move/Scale/Rotate is armed.
- Modern gizmo transforms remain the authoritative transform path.

Immediate hands-on:
1. Face -> Extrude armed -> background tap. Selection should clear; Extrude stays lit.
2. Face -> Extrude armed -> tap selected face. That face should deselect; Extrude stays lit.
3. Repeat 1–2 with Inset.
4. Select Face -> activate Move. Tap selected face to remove it; reselect then background tap to clear.
5. Repeat with Scale and Rotate.
6. Confirm a deliberate Extrude/Inset drag still edits geometry.
7. Confirm expanded gizmo Move/Scale/Rotate still works, and centre-dot collapse still returns to puck.

Protected:
- .615 unified semantic gizmo transform maths unchanged.
- .616 Group/Multi routing unchanged.
- .631 global release ownership unchanged.
- .632 Loop Cut fix unchanged.
- .633 dormant component gizmo/browser ownership unchanged.
- .634 explicit gizmo collapse unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
