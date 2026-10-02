## v0.36.18.672 — Edge Slide viewport session

Current release:
- v0.36.18.672

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.
- .663/.664 Edge Extrude radial workflow: works really well.
- .670 radial Crease selection-first workflow: PERFECT / PASS.
- .671 radial Offset viewport session advanced by /nextbuild.

Strengthening list:
- Connected-chain Edge Bevel through ordinary 4-valence quad vertices remains recorded in ROADMAP.md.

.672:
- Continues gizmo-related Edge tool centralisation with Edge Slide.
- Audit confirmed direct Edge Slide drag was already viewport-native; the remaining drawer dependency was signed exact Slide %.
- New src/selection-hub-slide-session.js.
- Radial Slide:
  - activates the existing authoritative #edgeSlideBtn owner
  - opens compact viewport panel beside selected Edge(s)
  - signed exact input supports -98% to +98%
  - Apply Exact delegates to existing __boxlabPrecisionEdgeSlide.apply()
  - Done disarms Slide and returns puck without changing geometry
- Existing component-slide.js remains authoritative for direct Pencil drag.
- component-slide.js now exposes __boxlabComponentSlide.disarmEdge() and emits boxlab-edge-slide-complete after successful Edge drag.
- precision-edge-slide.js now returns success and emits same completion semantic after exact Apply.
- Successful drag or exact Slide:
  - preserves selected Edge(s)
  - disarms Edge Slide
  - closes viewport panel
  - returns Selection Hub closed puck
- Left-panel Edge Slide remains unchanged and does not open viewport panel.
- No Slide geometry solver duplicated.

Immediate hands-on:
1. Select a Slide-compatible Edge or connected Edge set.
2. Puck -> Edge tools -> Slide.
3. Expect compact Edge Slide panel beside selection with signed exact field, Apply Exact, Done.
4. Option A: drag selected Edge(s) normally -> live Slide -> release -> selection remains and puck returns.
5. Option B: relaunch -> enter +25 or -25 -> Apply Exact -> Edge(s) slide to corresponding side -> selection remains and puck returns.
6. Done without moving/applying -> no geometry change; selection remains; puck returns.
7. Left-panel Edge Slide -> no viewport panel.
8. Regression: radial Crease / Offset / Edge Extrude unchanged.

Next after PASS:
- Continue remaining Edge Selection Hub tool polish only where contextual settings or session cleanup are genuinely missing.

Protected:
- .670 radial Crease.
- .671 Offset Loop viewport session.
- working Edge Extrude workflow.
- existing Edge Slide drag solver / exact solver.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
