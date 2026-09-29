## v0.36.18.585 — direct post-transform input + top-line Focus

- User feedback on .584:
  - Rotate/Scale gizmo exact input still did not behave reliably.
  - Focus View itself worked well and should be promoted to the top action row.
- .585 changes gizmo precision UX rather than adding another transform wrapper:
  - after any gizmo transform finishes, the HUD now exposes a real numeric `<input>` immediately
  - no intermediate “tap HUD text to convert it into an input” step
  - placeholders are context-aware: Distance / Degrees / Factor
  - larger 96×30px input improves iPad touch targeting
  - exact commit still calls the direct `__boxlabTransformUpgrade.applyExact(tool,constraint,value)` path added in .584
- Focus View moved out of Viewport menu and onto the top action row, immediately before Viewport.
- Focus remains an in-page workspace toggle; top bar remains visible.
- Share/Open In unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 9/9 PASS.

Hands-on check:
1. Drag/release Move gizmo handle -> numeric input appears directly in HUD.
2. Drag/release Rotate ring -> Degrees input appears directly; tap field, type angle, Enter.
3. Drag/release Scale handle/ring -> Factor input appears directly; type factor, Enter.
4. Undo exact Rotate and Scale.
5. Top row contains Focus beside the existing top actions, before Viewport.
6. Focus toggles left drawer without hiding top row.
7. Exit Focus restores drawer.

