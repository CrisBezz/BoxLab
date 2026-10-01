## v0.36.18.628 — Gesture Debug binding order fix

- .627 hands-on FAIL: Gesture Debug button still did not work.
- Root cause confirmed in src/view-modes.js:
  - Gesture Debug button is created by ensureUI().
  - .627 queried #gestureDebugToggle before calling ensureUI().
  - gestureDebugButton was therefore null at binding time.
  - ensureUI() then created the visible button afterward, but it had no listener.
- .628 fix:
  - call ensureUI() before querying/binding #gestureDebugToggle.
  - remove later duplicate ensureUI() declaration.
- No Gesture Debug API changes.
- No Face Hold, gizmo, Group/Multi, or Circle behavior changes in this build.

Hands-on:
1. Load .628.
2. Open Viewport -> Diagnostics.
3. Tap Gesture Debug once -> panel should appear immediately and button reads ON.
4. Tap again -> panel disappears.
5. Reload and verify persisted state.

Protected:
- .615 unified gizmo baseline unchanged.
- .616 Group/Multi routing unchanged.
- .620 Face Hold unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
