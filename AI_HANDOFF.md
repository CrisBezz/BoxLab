## v0.36.18.630 — defer Paint Select ownership until drag

- Repeated diagnostics showed:
  - RAW POINTERDOWN
  - PEN CANVAS DOWN
  - RAW CANVAS CAPTURE
  - no RAW CANVAS BUBBLE
  - no FACE CANVAS DOWN
- Static audit identified edge-paint-select.js as a capture-phase component selection owner active whenever hidden component Multi is enabled.
- component-multi-init intentionally forces Multi ON in Vertex / Edge / Face.
- Previous Paint Select behavior:
  - on pointerdown over an unselected component
  - immediately preventDefault + stopImmediatePropagation
  - begin paint ownership
- This is incompatible with modeless tap/hold gestures because Paint Select owns the press before main.js can interpret tap or hold.

.630 ownership change:
- pointerdown on unselected Vertex / Edge / Face now creates pendingPaint only.
- pointerdown does NOT preventDefault or stop propagation.
- ordinary tap proceeds to main selection.
- stationary hold remains available to Face/Edge hold logic.
- Paint Select claims the gesture only after >=6 px movement.
- on claim:
  - pointer capture begins
  - move stream is prevented/stopped
  - paint selection continues as before.
- already-selected components do not enter pending Paint Select.
- Gesture Debug logs PAINT PENDING / PAINT CLAIM when enabled.

Hands-on:
1. Enable Gesture Debug.
2. Face mode: select one face.
3. Press-and-hold selected face without moving.
4. Expected trace now includes FACE CANVAS DOWN -> FACE HOLD REQUEST -> FACE HOLD ARMED -> FACE HOLD TIMER.
5. If candidates exist, FACE CANDIDATES / FACE HOLD FIRED should follow.
6. Verify ordinary component tap select/deselect still works.
7. Verify drag-paint selection still works by dragging across unselected components.
8. Edge long-press/scrub regression.
9. Gizmo / Group / Multi regression.

Protected:
- .615 unified gizmo baseline unchanged.
- .616 Group/Multi routing unchanged.
- Face Hold candidate logic unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
