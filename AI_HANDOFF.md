## v0.36.18.669 — hardened radial Crease viewport launch

Current release:
- v0.36.18.669

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

.669:
- Fixes .668 Crease panel not appearing.
- Radial Crease now has a direct launch handshake from Total Gizmo:
  - Total Gizmo clicks the existing authoritative #applyCreaseBtn first
  - then explicitly calls __boxlabCreaseViewportSession.openFromHub()
  - semantic boxlab-selection-hub-tool event is still emitted for compatibility
- Crease session also keeps the event listener as a fallback.
- openFromHub validates Edge mode + non-empty selection, shows the panel immediately, then reasserts visibility on the next animation frame.
- Existing main.js Crease remains authoritative; no topology/history duplication.

Immediate hands-on:
1. Select Edge(s) -> puck -> Edge tools -> Crease.
2. Crease panel should now appear reliably beside the selected Edge(s).
3. Change Strength; left Strength should mirror.
4. Tap Edge(s) to apply existing Crease.
5. Done should disarm Crease, preserve selection and return puck.
6. Left-panel Crease should not open viewport panel.

Next after PASS:
- Continue gizmo-related Edge tools: audit Slide / Offset viewport-session needs.

Protected:
- working Edge Extrude workflow.
- existing Crease owner/history semantics.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
