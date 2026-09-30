## v0.36.18.623 — canvas boundary gesture diagnostics

- .622 diagnostic result:
  - RAW POINTERDOWN reached document capture.
  - PEN CANVAS DOWN reached canvas capture.
  - actual Pencil press had pressure about 0.08, buttons=1, hover=false.
  - therefore Pencil hover gate did NOT swallow the real press.
  - FACE CANVAS DOWN still did not appear.
- This localizes the loss to the canvas event boundary after the Pencil gate capture listener but before main.js Face pointerdown handling.
- .623 adds two reusable sentinels in gesture-debug.js:
  - RAW CANVAS CAPTURE
  - RAW CANVAS BUBBLE
- No gesture behavior changes.

Interpretation:
- RAW CANVAS CAPTURE appears, RAW CANVAS BUBBLE absent:
  - another canvas capture listener is stopping propagation before bubble listeners.
- both RAW CANVAS CAPTURE and RAW CANVAS BUBBLE appear, but FACE CANVAS DOWN absent:
  - main.js listener path itself is returning before Face pick/arm.
- neither appears after PEN CANVAS DOWN:
  - an earlier canvas capture listener is stopping immediate propagation before the debug sentinel.

Workflow rule retained:
- diagnose ownership boundary first, then change behavior.

Protected:
- Face Hold implementation unchanged.
- .615/.616 gizmo and Group/Multi baselines unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
