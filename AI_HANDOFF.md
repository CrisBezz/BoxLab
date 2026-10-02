## v0.36.18.671 — Offset Loop viewport session

Current release:
- v0.36.18.671

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.
- .663/.664 Edge Extrude radial workflow: works really well.
- .670 radial Crease selection-first workflow: PERFECT / PASS.

Strengthening list:
- Connected-chain Edge Bevel through ordinary 4-valence quad vertices remains recorded in ROADMAP.md.

.671:
- Continues gizmo-related Edge tool centralisation with Offset Loop.
- Slide audit: current Edge Slide is already largely viewport-native (arm + direct drag), so Offset Loop was the stronger target.
- New src/selection-hub-offset-session.js.
- Radial Offset:
  - activates the existing authoritative #offsetLoopBtn drag owner
  - opens a compact viewport panel beside the selected loop
  - Support Spacing slider mirrors existing #offsetLoopSpacing
  - exact numeric field delegates to existing __boxlabPrecisionOffsetLoop.apply()
  - Done exits the session and returns the closed puck
- Existing drag Offset remains authoritative:
  - Pencil-drag selected loop Edge
  - live topology preview
  - validation / rollback
  - history push
  - created left/right support loops selected after commit
- loop-offset.js now emits boxlab-offset-loop-complete after successful drag commit.
- precision-offset-loop.js now returns success and emits the same semantic completion for exact Apply.
- Radial session listens to that semantic event and closes cleanly onto the created support-loop selection.
- Left-panel Offset remains unchanged and does not open the viewport panel.
- drawer-ui dynamic import pins updated for both modified Offset owners.
- No Offset topology kernel duplicated.

Immediate hands-on:
1. Select a valid closed Edge loop.
2. Puck -> Edge tools -> Offset.
3. Expect Offset Loop panel beside selection with Spacing, exact value, Apply Exact, Done.
4. Move Spacing slider; left Support Spacing should mirror.
5. Option A: drag selected loop Edge -> normal live Offset -> commit -> created support loops stay selected and puck returns.
6. Option B: relaunch -> enter exact % -> Apply Exact -> created support loops stay selected and puck returns.
7. Done without applying -> original loop selection remains and puck returns.
8. Left-panel Offset -> no viewport panel.
9. Regression: radial Crease and Edge Extrude remain unchanged.

Next after PASS:
- Continue gizmo-related Edge tools with Slide viewport-session polish only if a concrete missing control remains; otherwise move to the next radial Edge tool with meaningful contextual settings.

Protected:
- .670 radial Crease.
- working Edge Extrude workflow.
- existing Offset Loop drag/topology/validation/history owner.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
