## v0.36.18.613 — remove gizmo diagnostics + robust component tap deselect

- .612 hands-on PASS and protected component-gizmo baseline.
- Removed the temporary GIZMO DEBUG overlay and runtime trace calls.
- Preserved the proven direct Vertex / Edge / Face Total Gizmo handoff exactly.
- User noted a selection regression:
  - additive Face multi-select works
  - tapping an already-selected face does not reliably remove it
  - tapping background still clears all
- Root cause is Pencil jitter crossing the 8 px transform-arm threshold before pointerup.
- .613 makes quick component taps tolerant of small Pencil movement:
  - component drag records startTime
  - on pointerup, if duration <= TAP_MAX_MS and movement <= TAP_MAX_MOVE, treat it as a selection tap
  - if a tiny transform had already armed within that tap envelope, restore the pre-drag mesh before toggling selection
  - deliberate drags outside the tap envelope still transform normally
- This applies consistently to Face / Edge / Vertex selected-component taps.
- Background deselect remains unchanged.
- Additive selection remains unchanged.
- HTML shell, main.js, total-gizmo.js, transform-upgrade.js and version.json synced to 0.36.18.613.
- Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.

Hands-on check:
1. Confirm .613 loads and stays .613.
2. Face mode: tap face A, tap face B -> both selected.
3. Tap selected face A -> A deselects, B remains.
4. Tap selected face B -> selection clears.
5. Background tap still clears all.
6. Deliberate direct component drag still transforms.
7. Vertex / Edge selected-component tap-to-remove quick regression.
8. Total Gizmo Move / Scale / Rotate regression from .612.
9. .606 Edge hold/scrub regression.

Next:
- If .613 passes, continue component-gizmo polish from the .612/.613 baseline.
