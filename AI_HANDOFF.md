## v0.36.18.622 — lower-level Pencil gesture diagnostics

- .621 screenshot showed only DEBUG READY after attempted Face hold.
- Therefore Face press did not reach main.js Face Hold instrumentation or Total Gizmo instrumentation.
- Capture-listener audit identified pencil-orbit-gate.js as an earlier possible interceptor.
- Pencil orbit gate treats pressure <= 0 as Pencil hover and stopImmediatePropagation()s pointerdown/move/hover events.
- On iPad, initial Pencil pointerdown may report pressure 0, so this is a strong suspect.
- .622 is diagnostic-only; no interaction behavior changed.

New diagnostics:
- gesture-debug.js logs RAW POINTERDOWN at document capture.
- pencil-orbit-gate.js logs:
  - PEN HOVER SWALLOW
  - PEN CANVAS DOWN with pressure/buttons/hover state

Interpretation:
- RAW POINTERDOWN + PEN HOVER SWALLOW, but no FACE CANVAS DOWN -> Pencil gate is swallowing the press.
- RAW POINTERDOWN + PEN CANVAS DOWN + FACE CANVAS DOWN -> press reaches Face Hold; investigate timer/candidates.
- RAW POINTERDOWN targeting gizmo + GIZMO DOWN -> gizmo interception.
- no RAW POINTERDOWN -> browser/iPad event path issue outside current listeners.

Workflow rule retained:
- interaction bug survives one straightforward fix -> instrument first, change behavior second.

Protected:
- .620 Face Hold implementation unchanged.
- .615/.616 gizmo and Group/Multi baselines unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
