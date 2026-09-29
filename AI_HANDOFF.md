## v0.36.18.593 — Scale added to proven window-capture floating type-in path

- .592 hands-on PASS: Rotate floating Degrees type-in works.
- User requested the capture-order discovery be remembered for future development.
- The protected interaction rule has been added to `AI_WORKFLOW.md`:
  - later document listeners may be blocked by tool owners using stopImmediatePropagation()
  - use window capture for global completion that must run before document capture
  - prefer one gesture owner + semantic events/state for future modeless interactions
- .593 changes only Total Gizmo Scale completion:
  - Move remains on the proven window-capture path
  - Rotate remains on the proven window-capture path
  - Scale now joins that exact same path
- Scale axis nodes should open Factor input for X/Y/Z.
- Outer uniform scale ring should open Scale Uniform / Factor.
- Exact Scale commit continues to use the already proven transform-upgrade applyExact API.
- Focus/topbar unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 4/4 PASS.

Hands-on check:
1. Regression: Move floating Distance still works.
2. Regression: Rotate floating Degrees still works.
3. Drag/release X/Y/Z Scale node -> floating Scale axis / Factor palette.
4. Type e.g. 1.5 -> Enter or Apply.
5. Outer uniform scale ring -> Scale Uniform / Factor palette.
6. Undo exact Scale.

