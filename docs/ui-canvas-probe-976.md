# .976 canvas probe evidence — 26 October 2026

Source: user-pasted UI Debug report time2026-10-26T04:53:18.047Z
(14:53 Brisbane), releasev0.36.18.976; follow-up response: controls STAYED VISIBLE
following Show3D. This document is a selected evidence summary, not the full raw report.

- Landscape1366×886,DPR2,visual scale1/offset0; backing canvas2732×1652.
- No tool session or Paint; controls enabled. Main toolbar buttons have normal
  in-bounds rects, visible/display/opacity1, correct own-button centre hit stacks.
  All sampled filters/backdrop filters none;972 plain profile active.
- Gizmo visible196×196 at693.828125,392.8125; no root filter. Prior reports sometimes
  had gizmo hidden, so its presence here alone does not establish causality.
- at24626: canvas-probe hidden:true. Toolbar layout/style/hit ownership remain healthy.
- at35014: canvas-probe-observation hidden:true,rightUI:'visible'.
- at37246: canvas-probe hidden:false; original canvas restored.
- User follow-up explicitly confirms right controls stayed visible after Show3D.
- Final capture canvasProbe.hidden:false is RESTORED state, not evidence the hide
  operation failed; event timeline proves hide, visible observation and restoration.

Conclusion: temporarily removing the3D canvas from painting recovered right-side UI,
with recovery persisting after restoration. This narrows investigation toward a
canvas/UI painting or compositing interaction. It does NOT establish a WebKit-engine
root cause, prove canvas overdraw, or certify a permanent repair. Layout/input were
healthy throughout. Keep recurring visibility OPEN;972/973 safeguards remain unchanged.
Current device-proven workaround: when it recurs, File→UI Debug→Hide3D only→Show3D again.
It preserves renderer, mesh, backing dimensions and history using existing opt-in probe.
No automatic polling/hide-show/reload added. Next narrow visibility task should use
this evidence; don't repeat blur/disabled-control guesses already contradicted here.
