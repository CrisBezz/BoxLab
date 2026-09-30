## v0.36.18.624 — canvas capture-owner tracer

- .623 diagnostic result:
  - RAW POINTERDOWN present
  - PEN CANVAS DOWN present
  - RAW CANVAS CAPTURE present
  - RAW CANVAS BUBBLE absent
  - FACE CANVAS DOWN absent
- Therefore the real Pencil press reaches canvas target capture, then a later canvas pointerdown capture listener stops propagation before normal canvas listeners.
- .624 upgrades gesture-debug.js to wrap every canvas pointerdown capture listener registered after the debug module.
- For each listener it logs:
  - CAPTURE LISTENER REGISTER
  - CAPTURE ENTER
  - CAPTURE EXIT
  - cancelBubble before/after
  - listener label and registration stack where available
- Diagnostic-only build. No Face Hold, gizmo, Pencil gate, transform, or selection behavior changed.

Expected diagnostic:
- On Face press, identify the final CAPTURE ENTER before RAW CANVAS BUBBLE disappears.
- If CAPTURE EXIT shows cancelAfter=true, that listener called stopPropagation/stopImmediatePropagation.
- If CAPTURE ENTER appears with no matching EXIT, listener may throw or stop execution before return.
- Registration stack should identify the module/file where possible.

Dormant-gizmo proposal:
- retained as the next architecture/UX experiment after this interceptor is identified.
- do not combine it with diagnostics.

Protected:
- .620 Face Hold implementation unchanged.
- .615/.616 transform ownership baselines unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
