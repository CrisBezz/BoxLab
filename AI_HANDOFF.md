## v0.36.18.655 — Edge hold-browser selection cleanup

Current release:
- v0.36.18.655

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .654 Edge Selection Hub:
  - Edge Extrude works but needs future gizmo-assisted constraint UX.
  - Slide PASS.
  - Bevel PASS; future viewport Bevel settings requested.
  - radial availability feedback requested for Face + Edge.
- Before tool UX expansion, user requested Edge hold selection browser correctness.

.655 Edge hold-browser:
- Candidate probing is transactional.
- invokeEdgeSelector now:
  1. saves live Edge selection,
  2. seeds the existing authoritative selector,
  3. captures its result,
  4. restores the saved selection.
- Candidate preview is REPLACEMENT, not additive.
- Each horizontal scrub candidate sets exactly candidate.indices.
- Previous preview disappears completely.

Candidate enumeration:
- Loop from seed alone.
- Loop from each neighbour at seed endpoint A.
- Loop from each neighbour at seed endpoint B.
- Loop from every A/B neighbour pair through the seed.
- Boundary using #selectBoundaryBtn.
- Ring using #selectRingBtn.
- Duplicate signatures removed.
- Existing selectors remain authoritative; no new loop/ring topology kernel.

Commit/cancel:
- pointerup keeps current candidate only.
- pointercancel restores the selection that existed before hold.
- vertical Grow/Shrink path remains based on the selection present when the hold fired.

Immediate hands-on:
1. Edge mode, choose a mesh area with several possible loops.
2. Hold seed Edge until first candidate appears.
3. Scrub horizontally.
4. Confirm candidate A is removed completely when B appears.
5. Confirm more distinct possibilities are offered than before, especially at branching/irregular seed positions.
6. Release on a candidate: only it remains selected.
7. Cancel a hold: pre-hold selection returns.
8. Vertical Grow/Shrink quick regression.
9. Edge Selection Hub should return from the resulting selection.

Deferred until selection PASS:
- radial unavailable/disabled visual state.
- Edge Extrude gizmo-assisted Plane/Axis control.
- Bevel viewport settings palette.

Protected:
- .640 modeless selection checkpoint.
- .643 Sweep viewport session.
- .652 Face-direct background-yield.
- .653 Shell viewport session.
- .654 Edge Selection Hub structure.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
