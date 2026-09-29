## v0.36.18.587 — standalone floating exact-transform input

- User confirmed .586's persistent left-panel exact type-in works for Rotate/Scale, proving the transform maths/context is correct.
- Floating exact entry remained unreliable when nested inside the Total Gizmo overlay.
- .587 rebuilds the floating entry as a completely separate normal HTML palette:
  - sibling of `#totalGizmo` under `#viewportWrap`
  - no SVG ancestry
  - no `pointer-events:none` inheritance
  - no gizmo transform inheritance
  - `touch-action:auto` and normal text selection/focus behavior
- After a gizmo transform releases, the standalone palette appears adjacent to the gizmo with:
  - Move X/Y/Z + Distance
  - Rotate X/Y/Z + Degrees
  - Scale X/Y/Z + Factor
  - Scale Free/Uniform + Factor
- Enter or Apply calls the exact same proven `__boxlabTransformUpgrade.applyExact(tool,constraint,value)` API used by the working left-panel path.
- New gizmo drag hides any existing palette; background tap dismisses it.
- Palette position follows the gizmo from the viewport sibling layer.
- Existing left-panel type-in remains untouched as fallback.
- Focus top-row placement remains unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 9/9 PASS.

Hands-on check:
1. Drag/release Move X -> floating palette shows Move X / Distance.
2. Tap floating field, type exact distance, Enter or Apply.
3. Drag/release Rotate X/Y/Z -> palette shows matching Rotate axis / Degrees.
4. Tap field, type exact angle, Enter or Apply.
5. Drag/release Scale X/Y/Z -> palette shows matching Scale axis / Factor.
6. Outer scale ring -> Scale Uniform/Free / Factor.
7. Confirm iPad keyboard appears for all three transform types.
8. Confirm exact transforms and Undo work.
9. Background tap dismisses palette.
10. Left-panel type-in still works as fallback.

