## v0.36.18.581 — Total Gizmo precision HUD + adaptive axis detents

- Builds on the hands-on PASS .580 projected-ring checkpoint.
- Adds the first precision-transform layer directly to the Total Gizmo.
- Explicit X/Y/Z gizmo movement now gets **soft adaptive detents**:
  - the step is chosen from a "nice" increment series based on current projected pixels-per-unit
  - target spacing is roughly 18 screen pixels
  - snapping only engages when the drag comes within roughly 4 screen pixels of a detent
  - dragging through the detent remains possible, so this is a soft catch rather than a hard grid lock
  - Free/planar movement remains unrestricted in this first pass
- Main transform owner stores soft-snap feedback for the HUD/status layer.
- Gizmo HUD now remains visible briefly after a transform instead of disappearing instantly.
- Tap the HUD during that post-drag window to open a compact exact-value input:
  - Move X/Y/Z => exact distance
  - Rotate => exact degrees
  - Scale => exact factor
- Exact entry reuses the existing `#transformValue` engine so history/undo behavior stays on the established transform path.
- The HUD exact-entry bridge explicitly transfers the last X/Y/Z gizmo constraint into the legacy precision controls before committing.
- Projected ring geometry from .580 is unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Syntax/static regression PASS.

Hands-on check:
1. With Axis Snap OFF, drag X/Y/Z gizmo arrows slowly: movement should feel small soft catches at useful increments, but you must be able to drag through them.
2. Zoom in/out and confirm the apparent screen spacing of detents remains sensible rather than using one rigid world-unit step.
3. Free centre move and XY/XZ/YZ plane move should remain unsnapped.
4. After an X/Y/Z move, HUD should remain briefly visible.
5. Tap HUD, enter a value, press Enter: exact move should follow the last axis used.
6. After rotation, HUD exact entry should accept degrees.
7. After scale, HUD exact entry should accept factor.
8. Undo should still revert exact transforms through the existing history path.
9. Projected rotation rings and navigation remain unchanged.

