## v0.36.18.602 — stronger owner-local Rotate/Scale soft catches

- Returned from the completed .601 Nomad Files-handoff UX to the pending Total Gizmo catch work.
- Ownership audit confirmed:
  - Object-mode Scale drag is owned by `main.js`
  - gizmo Rotate drag is owned by `transform-upgrade.js`
  - legacy left-panel 15° Rotate snap remains non-gizmo behavior
- .602 strengthens the existing soft catches in the real owners:
  - Rotate soft catch window: ±5° around useful angles
  - Scale soft catch window: logarithmic threshold widened from 0.035 to 0.065
- Scale catch targets remain:
  - 0.25×, 0.5×, 0.75×, 1×, 1.25×, 1.5×, 2×, 3×, 4×
- Rotate targets remain:
  - 0°, 5°, 15°, 30°, 45°, 60°, 90°, 120°, 135°, 180°
- Catches remain soft:
  - geometry holds on the detent while the raw gesture stays within the catch window
  - continuing the drag beyond the window releases and resumes free movement
- No new snap system was added.
- .601 Save GLB to Files workflow remains unchanged.
- HTML shell, main.js pin, transform-upgrade.js pin and `version.json` are synced to `0.36.18.602`.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. Confirm .602 loads and stays .602.
2. Gizmo Rotate with 15° left-panel snap ON: feel soft catches rather than rigid 15° stepping.
3. Turn left-panel 15° OFF: gizmo Rotate catches should still remain.
4. Drag through 30°, 45°, 90° and confirm each catch is noticeable but releases when pushed through.
5. Gizmo Scale through 0.5×, 0.75×, 1×, 1.25×, 1.5× and 2×; catches should now be clearly noticeable.
6. Push through a Scale catch and confirm it releases.
7. Regression: Move/Rotate/Scale floating exact-entry remains working.

Next:
- If .602 feels right, continue into the planned modeless/contextual gesture work.
