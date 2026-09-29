## v0.36.18.595 — owner-correct gizmo Rotate/Scale detents

- .594 hands-on feedback:
  - Scale catches did not work.
  - Rotate still followed the old 15° left-panel snap; disabling that snap removed all catch behavior.
- Root cause:
  - Scale drag is owned by `main.js`, so .594's Scale detent logic in transform-upgrade could not affect the real drag.
  - Rotate needed a more explicit indicator that the active transform came from Total Gizmo rather than relying on indirect API state.
- .595 adds explicit `globalThis.__boxlabActiveGizmoDrag` ownership state at Total Gizmo pointer-down and clears it at completion.
- Rotate:
  - transform-upgrade now checks the explicit gizmo-drag state
  - while a Total Gizmo Rotate drag is active, gizmo soft angle detents own the interaction
  - the legacy 15° left-panel snap is only used for non-gizmo Rotate
- Scale:
  - soft ratio detents moved into `main.js`, the actual Scale gesture owner
  - catches: .25× / .5× / .75× / 1× / 1.25× / 1.5× / 2× / 3× / 4×
  - HUD/status reports “detent” when caught
- Move and the .593 floating exact-entry system are untouched.
- Protected interaction ownership rule remains in AI_WORKFLOW.md.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 9/9 PASS.

Hands-on check:
1. Regression: Move floating exact entry still works.
2. Regression: Rotate/Scale floating exact entry still works.
3. Total Gizmo Rotate: with the left 15° snap ON, dragging should use the new soft catches, not hard 15° stepping.
4. Total Gizmo Rotate: turn left 15° snap OFF; gizmo soft catches should still remain.
5. Continue dragging past a Rotate catch; it should release.
6. Total Gizmo Scale: drag through .5× / .75× / 1× / 1.25× / 1.5× / 2× and confirm soft catches.
7. Continue dragging past a Scale catch; it should release.
8. Legacy/non-gizmo Rotate should retain its existing 15° snap behavior.

