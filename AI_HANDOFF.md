## v0.36.18.679 — Object transform background dismiss

Current release:
- v0.36.18.679

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.
- .663/.664 Edge Extrude radial workflow: works really well.
- .670 radial Crease selection-first workflow: PERFECT / PASS.
- .675 navigation recovery: good for now / provisional PASS.
- .676 guided radial Edge Bridge: PASS.
- .677 Edge radial one-shot cleanup: PASS.
- .678 Duplicate Faces: Duplicate works great and hands off to Object gizmo.

.679:
- Fixes Object transform lifecycle after Duplicate Faces and generally in Object mode.
- Root cause: Total Gizmo forced Object mode back to transform every sync frame, so background tap could never actually dismiss the gizmo.
- Added explicit objectTransformDismissed state.
- Empty-background tap while Object transform gizmo is active:
  - disarms transform arming
  - clears transient gizmo state
  - hides Object gizmo
  - keeps the object selected
- Tapping the object again reactivates the transform gizmo.
- Object selection key now includes active/selected object IDs so selecting a different object naturally resets dismissed state.
- Duplicate completion explicitly clears dismissed state so the new duplicate still receives the gizmo immediately.
- No transform geometry code changed.

Immediate hands-on:
1. Duplicate Face(s) and move the duplicate with gizmo.
2. Tap empty background.
3. Gizmo should disappear / transform mode should cancel.
4. Duplicate should remain selected.
5. Tap duplicate object again.
6. Gizmo should reappear and transform should work again.
7. Select another object; gizmo should appear for that object normally.

Protected:
- .678 Duplicate Faces semantics.
- .675 navigation recovery.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
