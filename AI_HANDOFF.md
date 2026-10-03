## v0.36.18.676 — guided radial Edge Bridge

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
- .675 navigation recovery: good for now / provisionally protected.

Strengthening list:
- Connected-chain Edge Bevel through ordinary 4-valence quad vertices remains recorded in ROADMAP.md.

.676:
- Continues gizmo-related Edge tool centralisation with Bridge.
- Legacy Bridge only enabled after two complete compatible boundary loops were already selected, which did not fit the radial puck workflow.
- Added src/selection-hub-bridge-session.js.
- Radial Bridge can now START from one complete boundary loop even though the legacy drawer button is still disabled at that stage.
- Workflow:
  1. select first complete boundary loop
  2. puck -> Edge tools -> Bridge
  3. first boundary stays selected
  4. add/select the second matching boundary loop in viewport
  5. panel changes to “Two compatible boundaries ready”
  6. Apply Bridge delegates to authoritative bridge-ui.js / bridge-topology.js
  7. created bridge faces become selected
- The panel suggests hold Edge -> Boundary for selecting the second loop.
- Cancel restores the original first boundary and returns the puck.
- bridge-ui.js exposes bridgeEdgesFromHub() and selects created faces for Selection Hub launches.
- Existing legacy Edge Bridge and Face Bridge behaviour remain unchanged.
- No Bridge topology kernel duplicated.

Immediate hands-on:
1. Make two open boundary loops with matching edge counts.
2. Select ONLY the first boundary loop.
3. Puck -> Edge tools: Bridge should be available even though left drawer Bridge is disabled.
4. Tap Bridge: guided panel should appear beside the first loop.
5. Add the second boundary loop to selection; easiest route is hold an Edge -> Boundary while preserving the first selection.
6. Panel should say “Two compatible boundaries ready”; Apply Bridge enables.
7. Apply Bridge: bridge is created through existing owner, Face mode becomes active, new bridge faces are selected.
8. Cancel before Apply: original first boundary remains selected and puck returns.
9. Regression: legacy left-panel Bridge still requires both loops and behaves as before.

Next after PASS:
- Continue remaining Edge radial tools only where there is a meaningful contextual workflow gap; Dissolve/Delete are likely already sufficient as one-shot actions.

Protected:
- .675 navigation recovery.
- .670 Crease.
- .671 Offset.
- .672 Slide.
- working Edge Extrude.
- existing Bridge topology/history owner.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
