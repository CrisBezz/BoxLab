## v0.36.18.667 — transactional Edge Extrude exit

Current release:
- v0.36.18.667

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.
- .663/.664 Edge Extrude radial workflow: works really well.

.667:
- Fixes the remaining Edge Extrude exit-state bug only.
- User reported exit dropped Edge selection and left Move active in the left transform menu.
- Root cause: Edge Extrude Plane setup activates the real Move transform state; prior teardown disarmed Extrude but did not atomically preserve selection and disarm transform arming.
- Exit is now transactional:
  1. capture current selected Edge IDs
  2. end temporary Extrude gizmo session
  3. disarm existing Edge Extrude owner
  4. disarm transform arming / Move constraint state
  5. restore the exact captured Edge selection
  6. clear hub suppression
  7. force Selection Hub CLOSED state and show puck
  8. re-assert transform disarm on next animation frame so later render sync cannot visually re-arm Move
- No Edge Extrude geometry/topology/history code changed.
- Current outer rail should remain selected after exit.

Immediate hands-on:
1. Confirm v0.36.18.667 remains visible after load settles.
2. Perform radial Edge Extrude.
3. Exit the Extrude session.
4. Confirm Extrude is OFF.
5. Confirm Move is NOT active in the left transform menu.
6. Confirm the current outer Edge selection remains selected.
7. Confirm the closed puck appears on that selection.

Protected:
- working Edge Extrude ribbon workflow and drag-on-edge interaction.
- .664 side constraint palette.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
