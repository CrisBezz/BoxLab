## v0.36.18.573 — Total Gizmo axis constraint fixed in actual Object drag owner

- .572 hands-on FAIL: X/Y/Z gizmo move handles still moved freely with Axis Snap OFF.
- Root cause traced to `src/main.js`, which owns the actual Object/component drag path. Its `drag.axisLock` was initialized to null and only assigned when global Axis Snap was enabled.
- .573 fixes the real owner:
  - on component/Object drag start, `main.js` reads `globalThis.__boxlabTotalGizmo.activeConstraint()`
  - explicit X/Y/Z gizmo handles initialize `drag.axisLock` immediately
  - automatic Axis Snap inference only runs when no explicit gizmo axis lock already exists
- Therefore explicit gizmo axis movement no longer depends on Axis Snap.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Static regression 6/6 PASS.

Hands-on check:
1. Axis Snap OFF.
2. Drag X gizmo arrow: object must move on X only.
3. Drag Y gizmo arrow: object must move on Y only.
4. Drag Z gizmo arrow: object must move on Z only.
5. Turn Axis Snap ON and repeat: explicit gizmo axis must still win.
6. Center free-move remains free.
7. Navigation/Undo/Redo unchanged.

