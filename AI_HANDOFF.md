## v0.36.18.588 — unified semantic transform completion event

- .587 hands-on feedback:
  - Move displayed the standalone floating input.
  - Rotate/Scale still did not.
  - Screenshot also showed the old gizmo HUD underneath the new floating palette.
- Root cause: transform completion was still tied to raw pointerup visibility. Different transform modules own pointerup differently and some call `stopImmediatePropagation()`, so the Total Gizmo could not reliably observe completion across Move/Rotate/Scale.
- .588 introduces a semantic `boxlab-transform-end` event emitted by the actual transform owners:
  - `main.js`
  - `transform-upgrade.js`
  - `rotate-transform.js`
- Total Gizmo no longer uses raw pointerup to decide when to show floating exact entry.
- Instead it sets an `awaitingTransformEnd` flag on gizmo drag start and shows the standalone palette only when the semantic transform-end event arrives.
- When the standalone floating palette opens, the old gizmo HUD is explicitly hidden, removing the duplicate black boxes seen in .587.
- This event-based pattern is the intended foundation for later modeless contextual interaction: gesture owners emit semantic events and UI reacts, rather than multiple UI modules competing for raw pointer events.
- Existing .586 persistent left-panel exact entry remains untouched and remains a fallback.
- Focus top-row placement unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 9/9 PASS.

Hands-on check:
1. Move gizmo -> release -> one floating Distance palette appears; no old HUD beneath.
2. Rotate X/Y/Z ring -> release -> one floating Degrees palette appears.
3. Scale X/Y/Z handle -> release -> one floating Factor palette appears.
4. Uniform scale ring -> release -> floating Factor palette appears.
5. Tap field and confirm iPad keyboard opens.
6. Enter/Apply commits exact value.
7. Undo exact Rotate/Scale.
8. Left-panel exact input still works.

