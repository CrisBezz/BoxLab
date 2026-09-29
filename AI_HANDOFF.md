## v0.36.18.574 — legacy X/Y/Z constraints no longer depend on Axis Snap

- User confirmed .573 Total Gizmo explicit axis constraint works and noted the older precision X/Y/Z buttons had the same conceptual bug.
- Root cause: `src/main.js` only seeded `drag.axisLock` from the gizmo or from automatic Axis Snap inference; the legacy X/Y/Z precision buttons were not authoritative in the actual Object drag owner.
- .574 makes the active legacy X/Y/Z precision button an explicit hard axis constraint.
- Constraint priority:
  1. active Total Gizmo X/Y/Z handle
  2. active legacy precision X/Y/Z button
  3. Axis Snap auto-inference only if neither explicit constraint exists
- Therefore X/Y/Z buttons now work with Axis Snap OFF.
- Free remains free; Auto/Axis Snap remain inference behavior rather than master enable switches.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Static regression 7/7 PASS.

Hands-on check:
1. Axis Snap OFF.
2. Legacy Move > X: drag object and confirm X-only.
3. Repeat Y and Z.
4. Free should move freely.
5. With Axis Snap ON, explicit X/Y/Z must still win.
6. Total Gizmo X/Y/Z behavior from .573 remains unchanged.

