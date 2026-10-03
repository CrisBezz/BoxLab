## v0.36.18.685 — Loop Cut through generalized logical quads

Current release:
- v0.36.18.685

Hands-on protected:
- .676 guided radial Edge Bridge: PASS.
- .677 Edge radial one-shot cleanup: PASS.
- .678 Duplicate Faces: works great.
- .682 Pencil/Object routing reliability: PERFECT / PASS.
- .684 radial Knife viewport session: PASS.

User-reported strengthening case:
- Loop Cut reported “no continuous quad path from this edge” on a face that is visually quad-like but contains multiple collinear boundary vertices from prior modelling.
- Existing loop-cut-added-vertex.js only promoted a 5-gon containing exactly one collinear added vertex.

.685:
- Generalizes the existing logical-quad Loop Cut owner; no second Loop Cut kernel added.
- A face is now eligible when it has:
  - exactly four genuine non-collinear corners
  - any number of intermediate collinear vertices distributed along its four boundary sides
- Genuine ngons / extra non-collinear corners / branched or ambiguous topology remain hard stops.
- Logical ring traversal uses those four corners.
- Physical boundary chains are preserved during face splitting:
  - existing collinear boundary vertices are retained
  - requested Loop Cut vertices are inserted/reused at the requested fraction
  - resulting polygons preserve original boundary detail
- Works for single and multi Loop Cut paths.
- Facegroups are preserved on generated strips.
- Existing base mesh.loopCut / loopCuts remain fallback for ordinary pure quads.
- drawer-ui dynamic import repinned to loop-cut-added-vertex.js?v=0.36.18.685.

Immediate hands-on:
1. Reopen the exact model/case from the screenshot.
2. Arm Loop Cut and drag on the previously failing edge.
3. Expected: cut propagates across the valid quad-like corridor instead of reporting unavailable.
4. It should stop cleanly when it reaches genuine non-quad/pole topology.
5. Slide the inserted loop and release.
6. Check existing collinear boundary vertices remain present.
7. Try Loop count >1 on same corridor.
8. Regression: simple cube Loop Cut remains unchanged.
9. Regression: .684 Knife remains PASS.

Protected:
- .684 Knife session.
- .682 Object/Pencil contract.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
