## v0.36.18.656 — Edge hold closed Face Boundary candidates

Current release:
- v0.36.18.656

Protected hands-on:
- .652 background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .655 Edge hold browsing: much better selections; replacement behaviour improved.

User screenshot / remaining selection gap:
- On a cube Face, the browser offered a three-edge path but omitted the obvious fourth side needed to close the Face perimeter.
- User expects complete loops around Faces to be offered.

.656:
- Added Face Boundary candidate generation independent of continuation heuristics.
- For the held Edge:
  - inspect every incident Face,
  - enumerate the Face vertex perimeter,
  - resolve each perimeter segment to the corresponding current edge index,
  - add full perimeter as candidate kind "Face Boundary".
- On a cube edge, normally two adjacent Face perimeters are available.
- Candidate signatures are deduplicated against all other candidates.
- Existing Loop/Boundary/Ring selector logic is untouched.
- Preview/commit semantics remain .655 candidate-only replacement.

Immediate hands-on:
1. Use the same cube case from the screenshot.
2. Hold the seed Edge.
3. Scrub horizontally through candidates.
4. Expect a Face Boundary candidate selecting all four edges of the front Face, including the previously missing vertical side.
5. Continue scrub; expect the other adjacent Face perimeter too.
6. Release on one; only that full perimeter should remain selected.
7. Quick check Loop/Ring still appear.

Deferred until selection feels right:
- radial disabled/unavailable visual states.
- Edge Extrude gizmo-assist.
- Bevel viewport settings.

Protected:
- .640 modeless selection checkpoint.
- .643 Sweep viewport session.
- .652 Face-direct background-yield.
- .653 Shell viewport session.
- .654 Edge Selection Hub structure.
- .655 transactional Edge candidate preview.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
