## v0.36.18.629 — deep capture-owner tracing when Gesture Debug is ON

- .628 permanent Gesture Debug toggle works hands-on.
- Repeated Face-hold diagnostic still shows:
  - RAW POINTERDOWN
  - PEN CANVAS DOWN
  - RAW CANVAS CAPTURE
  - no RAW CANVAS BUBBLE
  - no FACE CANVAS DOWN
- This confirms a canvas pointerdown capture listener is stopping propagation before main.js normal canvas handling.

.629 adds optional deep capture-owner tracing:
- only installed when Gesture Debug is enabled.
- wraps later canvas pointerdown capture listeners.
- logs:
  - CAPTURE REGISTER
  - CAPTURE ENTER
  - CAPTURE EXIT
  - cancelBubble before/after
  - listener label/registration stack where available.
- normal use with Gesture Debug OFF remains clean.
- no selection, Face Hold, gizmo, Circle, or transform behavior changes.

Hands-on:
1. Load .629.
2. Turn Gesture Debug ON.
3. Reload once with it still ON so deep trace installs before later modules register.
4. Press-and-hold a Face without moving.
5. Send screenshot showing CAPTURE REGISTER / ENTER / EXIT lines.
6. Identify first listener where after=true or last ENTER with no EXIT.

Protected:
- .615 unified gizmo baseline unchanged.
- .616 Group/Multi routing unchanged.
- .620 Face Hold unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
