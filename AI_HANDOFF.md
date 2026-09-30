## v0.36.18.621 — reusable Gesture Debug diagnostic build

- .620 hands-on FAIL: Face long-press selection browser did not start.
- User requested that interaction bugs jump directly to diagnostics rather than repeated speculative fixes.
- Added reusable src/gesture-debug.js.
- Debug module exposes:
  - globalThis.__boxlabGestureDebug.log(stage,detail)
  - clear()
  - enable()
  - disable()
  - enabled getter
- .621 enables the overlay visibly for diagnostics.
- This is a diagnostic-only build: no intended Face Hold or gizmo behavior change.

Current instrumentation:
Face Hold in main.js:
- FACE CANVAS DOWN
- FACE HOLD REQUEST
- FACE HOLD REJECT
- FACE HOLD ARMED
- FACE HOLD CANCEL MOVE
- FACE HOLD TIMER
- FACE HOLD LOST TO DRAG
- FACE CANDIDATES START
- FACE CANDIDATES count/kinds
- FACE HOLD FIRED
- FACE PREVIEW
- FACE HOLD POINTERUP

Total Gizmo:
- GIZMO DOWN
- GIZMO HANDOFF OK / FALLBACK
- GIZMO FINISH

Semantic transform owner:
- OWNER REQUEST
- OWNER REJECT EARLY / STATE / EMPTY
- OWNER BEGIN

Hands-on diagnostic:
1. Load .621 and confirm GESTURE DEBUG .621 panel appears.
2. In Face mode, select a face if needed.
3. Press and hold the face where Face Hold is expected.
4. Report the last visible lines in the panel or send a screenshot.
5. Especially note whether trace starts with FACE CANVAS DOWN or GIZMO DOWN.
6. Do not change gesture timing until trace identifies the owner.

Workflow rule going forward:
- For interaction/gesture bugs that survive one straightforward correction, add/use Gesture Debug before further behavioral changes.
- Keep diagnostics reusable rather than creating one-off debug panels.

Protected:
- .615 unified gizmo baseline unchanged.
- .616 Group/Multi routing unchanged.
- Edge long-press browser unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
