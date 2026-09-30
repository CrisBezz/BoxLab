## v0.36.18.603 — first modeless gesture: Edge long-press selects Loop

- .602 hands-on PASS for stronger Rotate/Scale gizmo soft catches.
- Modeless/contextual gesture phase has started.
- Existing background-tap deselect in `main.js` was audited and retained as the first proven modeless primitive.
- .603 adds the first new gesture:
  - in Edge mode, Pencil/mouse long-press on an edge selects that edge's Loop
  - uses the existing proven Loop command rather than duplicating topology logic
  - touch/finger input is excluded so one-finger orbit remains protected
  - movement beyond a small threshold cancels the hold immediately
  - if a component transform drag was only prepared but not yet armed, the hold cancels that pending drag before invoking Loop
- Ordinary tap selection/deselection behavior remains unchanged.
- Ring cycling is intentionally NOT included yet; prove Loop hold first, then extend the same owner.
- .601 Save GLB to Files workflow remains unchanged.
- HTML shell, main.js pin and `version.json` are synced to `0.36.18.603`.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. Confirm .603 loads and stays .603.
2. Edge mode: Pencil long-press an unselected edge for about half a second → its Loop should select.
3. Long-press an already-selected edge → Loop should select without starting Move.
4. Start moving before the hold delay → the hold must cancel and normal drag behavior should continue.
5. Finger orbit/pan/zoom must remain unchanged.
6. Ordinary edge tap selection/deselection must remain unchanged.
7. Background tap deselect must remain unchanged.

Next:
- If .603 passes, extend the same gesture owner to Loop/Ring cycling rather than adding another raw-pointer listener.
