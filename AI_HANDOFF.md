## v0.36.18.677 — radial Edge one-shot hub cleanup

Current release:
- v0.36.18.677

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.
- .663/.664 Edge Extrude radial workflow: works really well.
- .670 radial Crease selection-first workflow: PERFECT / PASS.
- .675 navigation recovery: good for now / provisional PASS.
- .676 guided radial Edge Bridge: PASS.

Strengthening list:
- Connected-chain Edge Bevel through ordinary 4-valence quad vertices remains recorded in ROADMAP.md.

.677:
- Final Edge-ring polish for one-shot radial tools Dissolve and Delete.
- No new panels added; both remain direct one-shot actions.
- Root issue: Selection Hub suppresses the launch selection while a radial tool runs. Dissolve/Delete can remove that topology and clear selection, but the old suppressed selection key could remain cached.
- Because topology edge indices may later be reused, a future Edge selection could accidentally match that stale key and fail to show its puck.
- After radial Edge Dissolve/Delete completes:
  - clear hubSuppressedKey
  - if a valid Edge selection remains, return the closed puck immediately
  - if no selection remains, keep the hub hidden
  - the next Edge selection is therefore fresh and gets the puck normally
- Existing Dissolve/Delete topology/history/selection behaviour remains authoritative and unchanged.

Immediate hands-on:
1. Select dissolvable Edge(s) -> puck -> Dissolve.
2. Dissolve should happen once; no extra panel.
3. If selection clears, select any surviving Edge: puck should appear immediately.
4. Select Edge(s) -> puck -> Delete.
5. Delete should happen once; if selection clears, select any surviving Edge: puck should appear immediately.
6. If either operation leaves a valid Edge selection, puck should return on it.
7. Regression: .676 Bridge still PASS.

Next after PASS:
- Edge radial ring contextualisation is effectively complete. Move to Face-ring gaps / modeless interaction polish rather than adding UI to already-direct Edge tools.

Protected:
- .676 Bridge.
- .675 navigation recovery.
- .670 Crease.
- .671 Offset.
- .672 Slide.
- working Edge Extrude.
- authoritative Dissolve/Delete owners.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
