## v0.36.18.572 — Total Gizmo axis handles are intrinsically constrained

- User correctly identified that X/Y/Z gizmo movement should never depend on the separate Axis Snap toggle.
- Root cause: the gizmo set a UI constraint, but `transform-upgrade.js` still resolved the actual drag axis from its own local constraint/Axis Snap state.
- .572 makes the active Total Gizmo handle authoritative:
  - `src/total-gizmo.js` exposes the currently active gizmo constraint
  - `src/transform-upgrade.js` checks that constraint first in `explicitAxis()`
  - X/Y/Z move handles therefore always move strictly along their axis
  - X/Y/Z scale handles always scale strictly on their axis
  - X/Y/Z rotation arcs always rotate strictly around their axis
- The global Axis Snap toggle remains relevant only to free/auto transforms outside explicit gizmo handles.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Syntax/static regression 8/8 PASS.

Hands-on check:
1. Turn Axis Snap OFF.
2. Drag X move arrow: movement must remain X-only.
3. Repeat Y and Z.
4. Drag X/Y/Z scale squares: each must affect only that axis.
5. Drag X/Y/Z rotation arcs: each must rotate only around that axis.
6. Free center move should remain free unless another snapping mode is intentionally active.
7. Navigation gestures and legacy transform strip remain unchanged.

