## v0.36.18.594 — gizmo soft Rotate/Scale detents + live precision readout

- .593 hands-on PERFECT: full floating exact-entry system PASS for Move / Rotate / Scale / Uniform Scale.
- .594 preserves .593 floating type-in unchanged.
- Total Gizmo now exposes its active drag spec to transform-upgrade so precision behavior can be gizmo-specific.
- Gizmo Rotate:
  - replaces the legacy hard 15° step during an active Total Gizmo drag with soft catches
  - useful catches: 0°, 5°, 15°, 30°, 45°, 60°, 90°, 120°, 135°, 180°
  - catch window is about ±3.5°
  - dragging through the catch releases naturally
  - legacy/non-gizmo Rotate keeps its existing 15° snap behavior
- Gizmo Scale:
  - soft catches at 0.25×, 0.5×, 0.75×, 1×, 1.25×, 1.5×, 2×, 3×, 4×
  - logarithmic catch window keeps behavior consistent across small/large factors
  - legacy/non-gizmo Scale unchanged
- Existing gizmo HUD already mirrors transform status, so live angle/factor appears during drag with “detent” when caught.
- Move's adaptive detents unchanged.
- Protected interaction capture rule remains documented in AI_WORKFLOW.md.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 7/7 PASS.

Hands-on check:
1. Regression: Move floating type-in still works.
2. Regression: Rotate floating type-in still works.
3. Regression: Scale/Uniform floating type-in still works.
4. Drag Rotate slowly through 15° / 30° / 45° / 90° and feel/observe soft catches.
5. Drag past a caught angle and confirm it releases rather than locking.
6. Drag Scale through 0.5× / 0.75× / 1× / 1.25× / 1.5× / 2× and confirm soft catches.
7. Confirm HUD shows live value and “detent” while caught.
8. Legacy Rotate button still uses its existing 15° snap behavior.

