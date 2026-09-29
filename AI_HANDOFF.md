## v0.36.18.590 — Rotate floating type-in isolated onto proven gizmo release path

- .589 restored Move floating exact entry and user confirmed Move is back.
- Investigation of `rotate-transform.js` shows it does not own Object-mode rotation; it only handles Vertex/Edge/Face.
- Object-mode Total Gizmo rotation is therefore owned by `transform-upgrade.js`.
- .590 leaves Move completely unchanged and gives Object-mode Rotate the same proven gizmo pointer-release palette trigger as Move.
- Rotation maths remains in transform-upgrade; this build changes only the floating Degrees palette trigger.
- Scale remains untouched for the next isolated build.
- The semantic transform-end path remains available but is no longer required just to show the Object-mode Rotate palette.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 4/4 PASS.

Hands-on check:
1. Confirm Move floating Distance entry still works exactly as .589.
2. Drag/release X/Y/Z rotation ring.
3. Floating palette should appear with Rotate X/Y/Z + Degrees.
4. Tap field, enter exact angle, Enter or Apply.
5. Undo exact Rotate.
6. Ignore Scale for this build; it is intentionally unchanged.

