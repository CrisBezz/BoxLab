## v0.36.18.645 — explicit Face-direct Pencil capture release

Current release:
- Visible/app version: v0.36.18.645
- version.json and HTML shell title synced.

Hands-on:
- .643 Sweep viewport session: AWESOME / PASS.
- .644 attempted post-Through Pencil-orbit fix: FAIL. Extrude disarmed, but Pencil still would not rotate/orbit viewport.

Deeper diagnosis:
- Face-direct pointerdown calls canvas.setPointerCapture(pointerId).
- Since .640, Face-direct completion correctly lives on window capture so it cannot miss pointerup.
- But finish then calls stopImmediatePropagation.
- Therefore canvas-level release/orbit listeners do not necessarily observe the same pointerup.
- Face-direct was relying on downstream/browser cleanup despite being the subsystem that acquired pointer capture.

.645:
- Adds releaseDirectPointer(pointerId).
- Every Face-direct owned completion explicitly releases canvas pointer capture BEFORE consuming pointerup/pointercancel:
  - armed-tool background press
  - armed-tool Face tap
  - Extrude / Inset drag finish
  - therefore successful Through as part of Extrude finish
- .644 post-Through disarm remains.
- FACE DIRECT THROUGH RELEASE debug now reports remaining pointerCapture state.

Immediate hands-on:
1. Select Face -> Extrude -> perform successful Through.
2. Lift Pencil.
3. Immediately Pencil-orbit the viewport.
4. Must rotate on the next gesture.
5. Quick normal Extrude, then orbit.
6. Quick Inset, then orbit.
7. Confirm Sweep viewport session remains unchanged.

If still failing:
- turn Gesture Debug on
- repeat Through once
- send FACE DIRECT FINISH and FACE DIRECT THROUGH RELEASE lines
- .645 release line should show pointerCapture=false.

Protected:
- .640 interaction checkpoint.
- .642 Selection Hub.
- .643 Sweep viewport session.
- Through topology/build/gate logic.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
