## v0.36.18.614 — selected-component tap owner + true plane Move

- .613 hands-on:
  - component Total Gizmo remained good
  - Face additive selection still could not reliably remove a selected face by tapping it
  - Plane Move did not constrain motion to the selected XY/XZ/YZ plane
- .614 fixes both as ownership issues.

Selection:
- Added a dedicated selected-component tap intent in main.js.
- On pointerdown over an already-selected Face/Edge/Vertex:
  - record tap candidate independently of transform drag
  - normal transform drag may still prepare
- If Pencil movement exceeds TAP_MAX_MOVE, tap intent cancels and transform proceeds normally.
- If pointerup remains within TAP_MAX_MS + TAP_MAX_MOVE:
  - cancel/rollback any tiny component transform
  - toggle only that selected component off
  - leave the rest of the multi-selection intact
- This no longer depends on endDrag() being the selection owner.
- Background deselect remains unchanged.
- Additive component selection remains unchanged.

Plane Move:
- Total Gizmo already supplied xy/xz/yz correctly.
- transform-upgrade previously treated every non-axis Move as camera-facing Free Move.
- Direct component gizmo owner now builds the actual world plane through the selection pivot:
  - XY -> normal Z
  - XZ -> normal Y
  - YZ -> normal X
- Pointer movement is ray/plane-intersected on that selected world plane.
- Axis Move and Free Move remain unchanged.
- Plane Move status now reports XY/XZ/YZ.

Protected:
- .612 direct component-gizmo handoff preserved.
- .606 Edge hold/scrub preserved.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
- HTML shell, main.js, transform-upgrade.js and version.json synced to 0.36.18.614.

Hands-on check:
1. Face: select A + B; tap A -> only B remains.
2. Tap B -> no face selected.
3. Background tap still clears all.
4. Deliberate Face drag still transforms instead of deselecting.
5. Quick Edge / Vertex tap-to-remove regression.
6. Plane Move XY -> Z coordinate must remain unchanged.
7. Plane Move XZ -> Y coordinate must remain unchanged.
8. Plane Move YZ -> X coordinate must remain unchanged.
9. Axis Move / Free Move / Scale / Rotate quick regression.
