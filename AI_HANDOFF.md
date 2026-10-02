## v0.36.18.662 — Bevel viewport session

Current release:
- v0.36.18.662

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.

.662:
- New src/selection-hub-bevel-session.js.
- Appears ONLY when Bevel launched from Edge Selection Hub semantic event.
- Captures Edge selection at radial launch.
- Mirrors authoritative controls:
  - Width -> #bevelWidth
  - Segments -> #bevelSegments
  - readouts -> #bevelWidthOut / #bevelSegmentsOut
- Pencil-drag Bevel remains unchanged.
- Apply Exact delegates to __boxlabDirectBevel.applyExact(width, capturedSelection).
- Cancel delegates to direct Bevel disarm and restores captured selection.
- Existing .661 bevel completion semantic events hide palette automatically.
- Left-toolbar Bevel stays unchanged and does not open palette.
- No Bevel topology code duplicated.

Immediate hands-on:
1. Select Edge(s).
2. Puck -> gizmo -> Edge ring -> Bevel.
3. Expect compact Bevel palette beside selection.
4. Change Width and Segments; left values/readouts should mirror.
5. Option A: Pencil-drag selected Edge -> normal live Bevel -> release -> palette disappears / Bevel off.
6. Option B: reopen, set Width + Segments, tap Apply Exact -> commit -> palette disappears / Bevel off.
7. Option C: reopen, adjust values, Cancel -> no geometry change; launch selection restored.
8. Launch Bevel from left panel -> no viewport palette.

Next after PASS:
- Edge Extrude gizmo-assisted plane/axis workflow.

Protected:
- .657 Edge candidate selection.
- .659 additive Edge hold semantics.
- .661 Loop Cut ownership + Bevel reset.
- .658 radial availability.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
