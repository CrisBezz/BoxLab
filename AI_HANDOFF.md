## v0.36.18.676 — modeless radial Bridge completion

Current release:
- v0.36.18.676

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.
- .663/.664 Edge Extrude radial workflow: works really well.
- .670 radial Crease selection-first workflow: PERFECT / PASS.
- .675 touch navigation recovery: good for now; continue monitoring.

Strengthening list:
- Connected-chain Edge Bevel through ordinary 4-valence quad vertices remains recorded in ROADMAP.md.

.676:
- Continues remaining Edge Selection Hub cleanup with Bridge.
- Audit found radial Bridge was a one-shot action that used the legacy Bridge completion path:
  - switch to Face mode
  - then clear the newly created bridge faces.
- Radial Edge Bridge now has a modeless completion path owned by existing bridge-ui.js:
  - captures current selected bridge-compatible Edge boundaries
  - runs existing mesh.bridgeSelectedEdges()
  - pushes existing history snapshot
  - switches to Face mode
  - selects the faces created by Bridge
  - emits boxlab-bridge-complete
  - Total Gizmo clears suppression and restores the CLOSED Face puck on those new faces.
- Left-panel Edge Bridge keeps its previous legacy completion and still clears selection.
- Face Bridge is unchanged.
- No Bridge topology kernel duplicated or rewritten.

Immediate hands-on:
1. Create/select a valid Edge Bridge pair.
2. Puck -> Edge tools -> Bridge.
3. Bridge should complete exactly as before geometrically.
4. BoxLab should switch to Face mode.
5. Newly created bridge face(s) should be selected.
6. Closed Face puck should appear on that new selection.
7. Undo should remove Bridge in one step.
8. Left-panel Edge Bridge should retain legacy behaviour.
9. Regression: Edge Extrude / Bevel / Crease / Offset / Slide radial flows unchanged.
10. Keep an eye on .675 navigation recovery during normal work.

Next after PASS:
- Audit radial Dissolve and Delete completion semantics. These are one-shot tools and should not gain panels unless needed.

Protected:
- .670 radial Crease.
- .671 Offset session.
- .672 Slide session.
- working Edge Extrude / Bevel.
- existing Bridge topology/history implementation.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
