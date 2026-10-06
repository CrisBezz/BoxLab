# .742 — finite negative Extrude, polygon preservation and Exact origin

User-directed task on 2026-10-06 supersedes the next historical-test-only batch.
Parent main: 6a63d2b0cdd840aa67657831fea19711abfddda1 (.741).

## Reproduction and implementation

User supplied EXTRUDE TEST.obj after extrusion and screenshots identifying the
four selected red faces. Preserved byte-for-byte as negative-extrude-742.obj.
The fixture contains four disconnected rectangular caps at x=-0.080418. Old
sidewalls overlap original z=±1 faces; edge-manifold validation still accepts it.
The pre-extrusion cage is recovered from the original sidewall endpoints and
retained original faces/vertices, with a positive volume of 8. No screenshot
coordinates or unprovided selection state are invented. Supplied-model cap
indices are 3/5/8/10; helper records the reconstruction explicitly.

The authoritative multi-face-direct controller now calls buildNegativeExtrude
on closed meshes for inward drag/replay. It reuses Through's polygon clipping,
solid winding classification, canonical seam assembly and strict winding/vertex
fan validation. Each selected convex planar face supplies its own finite inward
prism; sequential subtraction removes intersected exterior geometry and shared
walls. No hidden Object Manager object or generic Boolean UI/history action.
Positive connected-miter/open-mesh routes retain their old implementation.
Single-source drag retains ordered cavity-exit target snapping. Selection follows
surviving recessed caps; full cuts disarm and clear disappeared selection.

Convex affected faces clip as polygons, untouched faces remain polygons (their
edges may acquire conforming subdivisions). The uploaded rectangular-band result
is 34 faces: 25 quads, 9 ngons, **0 triangles**. At depth1.080418 its exact volume
is 5.839164; full depth2 leaves volume4 with no recessed cap. This is not a claim
that arbitrary concave geometry can remain all-quad. Concave/nonplanar source
faces, invalid closed topology and full solid removal refuse privately. The old
edge-manifold input check still cannot diagnose every geometric self-intersection;
this build does not automatically repair already overlapping old extrusions.

Facegroups follow retained/source fragments; surviving creases are split through
the canonical assembler; loose data is retained while unused vertices compact.
Face direct restore now copies faceGroups as well as geometry. Trials suppress
UI edges observers. History mutates only after accepted commit.

Initial triangle-by-triangle clipping caused unnecessary fragmentation and a
zero-area refusal at an exact alignment. Convex polygon clipping resolved this.
Rotation fixture exposed numerical zero-area Earcut triangles on straight
subdivided boundaries generating arbitrary cutting planes; finite cutter now
filters them. Old buildThrough geometry algorithm is unchanged.

Exact input's existing synthetic single-move path started its drag at the move
endpoint, producing zero travel. The controller now uses the synthetic press
origin (pointer9876) and bypasses physical8px threshold; actual Pencil/touch
threshold/origin is retained. Zero Exact is a no-op; small negative, positive,
refused cut and normal negative Exact operations are runtime tested.

## Automated validation

27 new tests pass. Actual Face module runs in VM with real Three geometry,
History and cut kernel; DOM/camera/bridge surfaces are controlled doubles.
Covers preview, commit, source retention, Cancel, selection, one-step Undo/Redo,
replay, Exact synthetic event flow, small/zero values, refusal/redo retention and
physical drag threshold. Geometry covers finite-depth and through band cuts,
side-strip removal, no orphan vertices, groups, creases/loose geometry, source
order, inset/corner, rotation/translation/scale and23 accepted old corner/Loop/
Knife source-face Through fixtures through the new cutter. These are not device
rendering or iPad latency claims.

Add Vertex runtime is unchanged: actual splitter replaces manifold/boundary/loose
edges with two children and inherits creases; a real Three line raycaster picks
boundary child edges separately. User's observed Add Vertex failure remains
unreproduced; do not label it fixed. Next audit includes live snap/selection and
first-three-vertex face normals after insertion.

Full Node24: **1706 total /1604 PASS /102 FAIL /0 skipped**. Same102 failure
identities as .741, no new/resolved failures. Inventory JSON retains every failure.
Focused negative/Through/navigation:53PASS. Syntax/whitespace clean. Full suite
also includes release contracts, Beta6, OBJ/GLB/NOM and protected baseline checks.
The .242 literal child URL assertion was switched to the reviewed current-loader
contract; its ordered cavity target assertions remain. No failures skipped.

Runtime changes: src/through-kernel.js and src/multi-face-direct.js only.
Face controller shell pin and its Through import are .742; recovery shell pins
.742; all release markers agree. Reviewed asset fixture updates only those URLs
and two source hashes. Frozen beta2–6, Multi pin0.36.1.0, Loop .715 and CSS untouched.

Published runtime85dbb83e960d06b926b071e96dfaa988b5d8ad8b. Actual Node22CI
37463033743/job112267082488:1706/1604PASS/102FAIL/0skip; all102 failure names
match localNode24. Pages37463032493success. Live shell/version, both changed
source assets, before/corrected OBJ fixtures and Beta6 version byte-match local/main.
No .742 device acceptance inferred.

## Device checks

1. Import recovered negative-extrude-742-before.obj, select four right-hand bands
   at y=-.75..-.5, -.25..0, .25...5, .75..1, cut inward: side strips disappear
   without flickering overlaps or triangular cage fragments. Undo old .741 cut
   first if using the existing session.
2. Shallow recess and full-depth cut, then one Undo/Redo. Caps remain selected
   for a recess; full-cut missing caps clear and tool exits.
3. Apply Exact negative depth1.080418; check Repeat on another face; positive
   band Extrude remains familiar.
4. Add a vertex on an edge, leave Add, switch Edge and tap each half separately;
   if failure remains, supply the mesh and indicate placement/selected segment.

Before/corrected OBJ fixtures are derived through the actual scene OBJ exporter
for convenient model inspection. They are regression artifacts in this repo.
