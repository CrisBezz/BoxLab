## v0.36.18.684 — radial Knife viewport session

Current release:
- v0.36.18.684

Hands-on protected:
- .676 guided radial Edge Bridge: PASS.
- .677 Edge radial one-shot cleanup: PASS.
- .678 Duplicate Faces: works great.
- .682 Pencil/Object routing reliability: PERFECT / PASS.
- .683 Extract Faces handoff advanced to next build; no explicit PASS recorded yet.

.684:
- Continues Face-ring/modeless polish with Knife.
- Existing knife-tool.js remains authoritative for all Knife geometry, snapping, preview, history, and repeated-cut behaviour.
- Radial Knife now opens a compact viewport session:
  - “Knife active”
  - reminder: drag boundary -> boundary
  - Done button
- Knife remains armed after each successful cut exactly as before, allowing repeated cuts.
- Done:
  - disarms existing Knife owner
  - clears preview/armed state
  - clears Selection Hub suppression
  - keeps hub hidden while no Face is selected
  - next Face selection receives a fresh puck immediately
- Added minimal __boxlabKnifeTool lifecycle bridge and semantic armed/disarmed events.
- Left-panel Knife remains unchanged and does not open the radial viewport session.
- No Knife topology or snap algorithm changed.

Immediate hands-on:
1. Select a Face -> puck -> Face tools -> Knife.
2. Knife active badge with Done should appear.
3. Make one boundary-to-boundary cut.
4. Knife should remain active; make a second cut.
5. Tap Done.
6. Knife left-panel active state should turn off; badge disappears.
7. Tap/select any Face -> fresh puck appears immediately.
8. Left-panel Knife should still work normally without the viewport badge.
9. Regression: Pencil orbit/navigation remains correct.

Next after PASS:
- Face Delete one-shot hub cleanup, then reassess remaining Face-ring gaps.

Protected:
- .682 Object/Pencil contract.
- existing Knife topology/snap/history owner.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
