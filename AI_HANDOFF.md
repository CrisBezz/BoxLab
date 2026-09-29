## v0.36.18.591 — direct Object Rotate completion handoff to floating exact input

- .590 hands-on FAIL: Rotate floating Degrees palette still did not appear.
- Root cause narrowed further: Object-mode Rotate is owned by `transform-upgrade.js`, and the event/waiting-flag handoff back to the gizmo could still be disrupted by pointer capture/cancel ordering.
- .591 removes event timing from Object Rotate exact-entry display:
  - on successful Object-mode Rotate commit, `transform-upgrade.js` calls `__boxlabTotalGizmo.completeExactEntry(...)` directly
  - Total Gizmo opens the standalone floating Degrees palette immediately from that direct callback
  - no document pointerup dependency
  - no custom-event dependency for Object Rotate
- Move remains on the known-good .589 path and is untouched.
- Raw gizmo pointer-release no longer tries to open Rotate's palette.
- Scale remains intentionally untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 7/7 PASS.

Hands-on check:
1. Confirm Move floating Distance entry remains working.
2. Drag/release X/Y/Z Rotate ring.
3. Floating Rotate X/Y/Z / Degrees palette should appear.
4. Enter exact angle with Enter or Apply.
5. Undo exact Rotate.
6. Ignore Scale for this build.

