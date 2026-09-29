## v0.36.18.592 — Rotate floating input captured before document transform owners

- .591 hands-on FAIL: Rotate floating Degrees palette still did not appear.
- Root cause: Total Gizmo and transform-upgrade were both listening for pointerup on document capture. transform-upgrade is loaded earlier and calls stopImmediatePropagation(), so the later Total Gizmo document-capture listener never receives Rotate pointerup.
- .592 moves the Total Gizmo release listener to **window capture**, which runs before document capture.
- Move and Rotate now show their floating exact-entry palette from this early window-capture release path.
- Move's proven path is preserved.
- Scale remains intentionally unchanged for later isolated testing.
- Existing direct Rotate callback can remain as a harmless fallback but is no longer required for palette display.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 4/4 PASS.

Hands-on check:
1. Confirm Move floating Distance still works.
2. Drag/release X/Y/Z Rotate ring.
3. Floating Rotate X/Y/Z / Degrees palette should appear.
4. Enter exact angle via Enter or Apply.
5. Undo exact Rotate.
6. Ignore Scale for this build.

