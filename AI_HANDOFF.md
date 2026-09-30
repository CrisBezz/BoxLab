## v0.36.18.625 — deterministic Circle startup + permanent Gesture Debug toggle

- User reported:
  - Vertex Circle missing by default.
  - First click on Repair (example) only caused Circle/UI to appear; second click actually activated the tool.
  - Requested a permanent switchable debug listener for future interaction issues.
- Root cause of Circle issue:
  - drawer-ui.js dynamically imported face-reconstruct.js and component-circle.js concurrently.
  - face-reconstruct.js owns __boxlabVertexToolLayout.
  - component-circle.js depends on that layout owner when placing Circle.
  - load order was therefore race-dependent.
- .625 fix:
  - drawer-ui now loads face-reconstruct first.
  - component-circle loads immediately afterward in the same promise chain.
  - the later standalone concurrent component-circle import was removed.
  - Circle now asks the already-established Vertex layout owner to place it.
- Expected result:
  - Circle is present on first Vertex drawer render.
  - Repair/Inspect/other first clicks are no longer consumed by late Circle/layout reconciliation.

Permanent Gesture Debug:
- src/gesture-debug.js is now permanent infrastructure.
- OFF by default.
- state persists in localStorage.
- API retained:
  - __boxlabGestureDebug.log(...)
  - clear()
  - enable()
  - disable()
  - toggle()
  - setEnabled()
  - enabled
- Added Viewport -> Diagnostics -> Gesture Debug toggle.
- When enabled, panel appears and existing gesture instrumentation becomes visible.
- When disabled, log() is a no-op and panel is absent.
- Temporary EventTarget monkeypatch/deep capture tracer was removed from the permanent layer.
- Raw document/canvas capture/bubble traces remain available while debug is enabled.

Protected:
- .615 unified gizmo baseline unchanged.
- .616 Group/Multi ownership unchanged.
- .620 Face Hold code unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.

Hands-on checks:
1. Load .625 fresh in Vertex mode.
2. Circle is present immediately without any first interaction.
3. Open Repair/Inspect once -> first click performs intended action.
4. Switch modes and back to Vertex -> Circle remains in correct position.
5. Viewport menu contains Gesture Debug.
6. Gesture Debug is OFF by default.
7. Toggle ON -> debug panel appears.
8. Toggle OFF -> panel disappears.
9. Toggle ON, reload -> preference persists.
10. Gizmo / Group / Multi regressions remain clean.

Next:
- After this UI/debug infrastructure passes, return to Face Hold using permanent Gesture Debug rather than one-off diagnostic builds.
