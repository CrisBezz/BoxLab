## v0.36.18.610 — component Total Gizmo runtime diagnostics

- .609 hands-on FAIL: effectively no component gizmo transforms worked.
- Stopped transform rewrites. .610 is diagnostic-only.
- Added a temporary on-screen `GIZMO DEBUG .610` panel in the viewport.
- Runtime stages:
  - HANDLE DOWN
  - OWNER REQUEST
  - OWNER REJECT (with reason), or OWNER BEGIN
  - HANDOFF OK / HANDOFF FAIL
  - MOVE with mode/tool/axis/dx/dy/pointerId
  - OWNER FINISH with changed true/false
  - GIZMO POINTERUP
- No intended transform behavior changes in .610.
- Purpose: identify the first broken link in the live iPad event chain before any further transform change.
- Component direct handoff from .609 remains in place.
- Object gizmo remains untouched.
- .606 modeless Edge selection remains untouched.
- HTML shell, Total Gizmo pin, transform-upgrade pin and version.json synced to 0.36.18.610.
- Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.

Hands-on diagnostic:
1. Load .610.
2. Face mode -> select one face.
3. Press and drag ONE gizmo X Move arrow.
4. Read the final text in the GIZMO DEBUG .610 panel.
5. Report the exact last stage/text shown. A screenshot is ideal.
6. Do not spend time testing every transform yet; one gesture should identify the broken stage.

Next:
- Fix only the first broken runtime stage shown by .610.
