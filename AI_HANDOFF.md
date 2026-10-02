## v0.36.18.659 — additive Edge hold selection with clean replacement browsing

Current release:
- v0.36.18.659

Protected hands-on:
- .652 background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.

Context:
- .655 fixed candidate contamination and candidate-to-candidate accumulation.
- That made browser previews candidate-only.
- User correctly noted long-press could therefore no longer ADD another loop/ring to an existing Edge selection.

.659 model:
- hold.baseIndices = Edge selection that existed before this hold began.
- Every candidate preview is recomputed as:
  fixed baseIndices + CURRENT candidate.indices
- Scrubbing A -> B:
  base + A
  becomes
  base + B
- Candidate A is fully removed; base remains untouched.
- No A+B accumulation.
- Release commits base + current candidate.
- Cancel restores the exact pre-hold selection.

This restores additive multi-loop selection without reintroducing the .655 bug because candidate probing itself is now transactional.

Immediate hands-on:
1. Select a complete loop or Face Boundary.
2. Long-press an Edge elsewhere.
3. First candidate should be ADDED to the existing selection.
4. Scrub to another candidate.
5. Existing first selection must remain.
6. Previous candidate must disappear completely.
7. Release: existing selection + current candidate remain.
8. Repeat again to add a third distinct loop if desired.
9. Cancel test: pre-hold selection must restore exactly.

Still next after selection PASS:
- verify .658 radial availability UI hands-on.
- Edge Extrude gizmo-assisted axis/plane workflow.
- Bevel viewport settings.

Protected:
- .655 transactional probing.
- .657 Face Boundary candidate generation.
- .658 radial availability.
- .652 Face-direct background-yield.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
