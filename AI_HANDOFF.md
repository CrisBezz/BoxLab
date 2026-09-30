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

Hands-on result:
- PASS: Edge Pencil long-press Loop selection works well.
- Confirmed intended strictness: the gesture only selects when the loop continuation is clean and unambiguous.
- At junctions / multiple-choice topology (for example around the top of a cube), no loop is selected rather than guessing a direction.
- Preserve this refusal-to-guess rule in all future modeless Loop/Ring work.

Next:
- Extend the same gesture owner to Loop/Ring cycling, but only when the requested path is topologically unambiguous.
