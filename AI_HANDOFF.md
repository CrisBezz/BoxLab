## v0.36.18.562 — bottom Selection dock + top Viewport actions

- Continues incremental UI/UX pass from verified .561.
- Existing `#selectionDrawer` is reparented by `topbar-layout.js` into `#viewportWrap` and docked directly above the bottom-left Vertex / Edge / Face / Object mode strip.
- Selection panel is hidden in its original drawer location until runtime relocation completes, preventing a one-frame flash.
- Existing selection controls/IDs/handlers are unchanged.
- `#viewModes` is no longer moved into the second command row; runtime keeps it in `.top-actions` beside the existing top action buttons.
- Top-action typography/height is normalized through the shared `.top-actions` container so Frame All / Viewport / Undo / Redo use the same 13px font sizing and 38px control height where present.
- The scrolling left tool drawer regains its normal usable height because Selection is no longer inside it.
- No gizmo or gesture changes in this build.
- Automated syntax/static regression 11/11 PASS.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Frozen Beta 5 v0.36.18.538 untouched.

Hands-on check:
1. Selection panel appears at bottom-left immediately above the mode strip.
2. Selection panel does not flash in its old drawer position.
3. Left tool drawer scrolls independently and no longer contains Selection.
4. Viewport settings appears on the top action line beside Frame All / Undo / Redo.
5. Frame All / Viewport / Undo / Redo look typographically consistent.
6. All selection controls, mode switching and navigation gestures remain functional.

