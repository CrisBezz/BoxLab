## v0.36.18.670 — selection-first radial Crease

Current release:
- v0.36.18.670

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.
- .663/.664 Edge Extrude radial workflow: works really well.
- .667 transactional Edge Extrude exit still awaiting hands-on retest.

Strengthening list:
- Connected-chain Edge Bevel through ordinary 4-valence quad vertices is recorded in ROADMAP.md for later strengthening.

.670:
- Fixes the confusing radial Crease behaviour revealed hands-on in .668/.669.
- Root cause: the legacy left-panel Crease owner intentionally clears Edge selection when armed, so proxying its button destroyed the radial launch selection before the viewport panel could open.
- Radial Crease now has a distinct selection-first UX:
  - selected Edge IDs are captured before any action
  - radial Crease does NOT click/arm the legacy paint-Crease button
  - the selected Edge(s) remain selected
  - Crease panel opens immediately beside that selection
  - current Strength is applied immediately to the captured selection
  - Strength slider updates the same captured Edge(s) live
  - Uncrease previews 0 strength on that same captured selection
  - Done commits one history snapshot and returns to the closed puck
- main.js now exposes applyCreaseSelection(ids,value,{pushHistory}) so the authoritative mesh/history owner performs the mutation; the viewport session does not duplicate the crease data implementation.
- Left-panel Crease remains unchanged and retains its old paint-style "tap edges to crease" workflow.
- Semantic Selection Hub tool event remains emitted; the radial session flag prevents duplicate opening.

Immediate hands-on:
1. Select one or more Edge(s).
2. Puck -> Edge tools -> Crease.
3. Existing selection must remain selected; do NOT enter blank paint-Crease selection mode.
4. Crease panel must appear immediately beside that selection.
5. Selected Edge(s) should take the current Strength immediately.
6. Drag Strength; same selected Edge(s) update live.
7. Tap Uncrease; same selected Edge(s) go to 0.
8. Tap Done; one commit, selection preserved, puck returns.
9. Left-panel Crease still uses legacy tap-edge paint workflow and does not open this panel.

Next after PASS:
- Continue gizmo-related Edge tools: audit Slide / Offset viewport-session needs.

Protected:
- working Edge Extrude workflow.
- left-panel legacy Crease workflow.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
