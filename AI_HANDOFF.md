## v0.36.18.668 — Crease viewport session

Current release:
- v0.36.18.668

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.
- .663/.664 Edge Extrude radial workflow: works really well.
- .667 transactional Edge Extrude exit is awaiting hands-on retest.

Strengthening list:
- Connected-chain Edge Bevel through ordinary 4-valence quad vertices is now logged in ROADMAP.md as a future capability-strengthening case. Do not workaround by changing selection semantics.

.668:
- Continues Selection Hub / gizmo-related Edge tool centralisation with Crease.
- New src/selection-hub-crease-session.js.
- Appears only when Crease is launched from the Edge Selection Hub radial ring.
- Compact viewport panel sits beside the current selected Edge(s).
- Strength slider mirrors the existing authoritative #creaseStrength control.
- Existing main.js Crease remains authoritative:
  - set strength in viewport panel
  - tap Edge(s) in viewport to apply Crease using existing direct Crease path
  - no duplicate crease kernel or history path
- Uncrease button delegates to existing #clearCreaseBtn for the current selection.
- Done:
  - disarms existing Crease owner
  - disarms transform arming
  - preserves current Edge selection (fallback to launch selection)
  - returns the Selection Hub to the closed puck.
- Left-toolbar Crease remains unchanged and does not open the viewport panel.

Immediate hands-on:
1. Select Edge(s) -> puck -> Edge tools -> Crease.
2. Expect compact Crease panel beside selection with Strength, Uncrease, Done.
3. Change Strength in viewport panel; left Strength value/readout should mirror.
4. Tap an Edge to apply Crease and confirm normal existing Crease behaviour.
5. Select a creased Edge and tap Uncrease; confirm existing Uncrease behaviour.
6. Tap Done; Crease should turn off, selection should remain, puck should return.
7. Launch Crease from left panel; no viewport Crease panel should appear.
8. Regression: radial Edge Extrude remains unchanged.

Next after PASS:
- Continue radial Edge tool settings centralisation, likely Offset Loop spacing or Slide session polish, after auditing the existing owner.

Protected:
- working Edge Extrude ribbon workflow and drag-on-edge interaction.
- .664 side constraint palette.
- existing Crease owner/history semantics.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
