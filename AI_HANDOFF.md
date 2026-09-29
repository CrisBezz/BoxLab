## v0.36.18.589 — restore proven Move floating exact-input path

- .588 hands-on regression: Move floating type-in stopped working.
- .589 restores the known-good Move completion path from .587:
  - Move gizmo release shows the standalone floating Distance palette directly from the gizmo's own pointer-release path.
  - This path was already hands-on proven before the semantic-event experiment.
- Rotate/Scale continue to use the semantic `boxlab-transform-end` architecture introduced in .588, since those are the transforms whose raw pointer completion can be swallowed by competing owners.
- The first route to open the palette clears `awaitingTransformEnd`, preventing duplicate palettes.
- Old gizmo HUD is hidden when the standalone palette opens.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 5/5 PASS.

Hands-on check:
1. Move gizmo -> release -> floating Distance palette appears again.
2. Enter/Apply exact Move works.
3. Rotate/Scale behavior remains available for continued diagnosis.
4. No duplicate floating palette/HUD.

