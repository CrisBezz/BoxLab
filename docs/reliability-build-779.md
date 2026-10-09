# Build .779 reliability evidence

## .779 — Clean negative Extrude partition seams — 2026-10-10

User .778 PASS, then supplied Before/After Extrude OBJ and screenshot778 showing
fragmented shallow cap. Parent main996bbe7101aea54fd7fd8c039fcb1e129d8999e4.
Exact source files retained as negative-extrude-779-before.obj/after.obj (106verts/
110quads before;149verts/123faces after). Source0 is inset z=-1 rectangle1.772 square;
depth0.161517. Prior751 kernel reproduces exact output cycles/cap3; point differences
under1e-4 arise from six-decimal exported source rounding. Not a recent runtime
rollback: .772–.778 validation releases did not change Extrude geometry.

Audit existing Face753→Through751 finite cutter and .742/.750/.751 cleanliness
work. Accepted cutter-boundary pieces have differently subdivided shared seams;
complete-edge greedy merging leaves unnecessary partitions. Extend existing kernel:
conform private piece edges, cancel reversed interior edges per connected component,
trace one simple boundary, coalesce only convex area-preserving unions. Remove straight
partition vertices; canonical assemble restores neighbouring required seam vertices.
Holes, branches, concave unions retain prior conservative merger; disconnected pieces
stay separate;256piece bound retained. No global dissolve/flatten/retriangulate or
new pointer/kernel owner. Existing source/target restrictions and legacy242 path remain.

Your shallow recess now110verts/114faces, one quad cap/four quad walls, no triangles,
closed consistent winding and exact rectangular removed volume. Other105 original
faces retain exact points/cycles; groups/crease preserved. Five depths0.01–2.2,
rotated/translated/scaled copy, physical/Exact/replay actual controller with fallback,
one-step Undo/Redo, preview reversal/Cancel/redo, mismatched seam/hole/disconnected
private boundaries covered.13newPASS/84focusedPASS; fullNode24:2068tests/2013PASS/
55FAIL/0skip, same exact55identities as778; all remaining checks active. Original
fixtures unchanged. Runtime edit only Through kernel; Face import-only cache chain
and shell/recovery779. Reviewed kernel+Face hashes including legacy242 reference;
legacy URL retained. Main762/Inset753/Multi1.0/Loop715/frozenBeta2–6 unchanged.
Publication/Node22/live verified below; .779 device acceptance pending.

Next: confirm supplied-model device negative Extrude, then remaining55 checks and
scoped Bevel/Knife/Loop reliability. Add Vertex picking/NOM import/Lasso deferred.
Manual: load Before Extrude, shallow inward pull of same inset; Undo/Redo, then
another inward/outward pull and normal background navigation.

Source SHA256 before a6d3ca81e70ee50c11c25edb331263a4b34eddce325f61ad894662c3c3dd78b2;
after70c0f4d27ed0f0cc5d9cee01ceeb05f0fbb777436546c761312564c811aff235.

## .779 publication verification — 2026-10-10

Release commit `5b24a307f9239286ece4d9947ad6a3f79dfb5542`, tree
`7fc73ef19749c57ec1c910724af03851d6f84905` matches tested checkout.
Actual Node22 Topology run38006619712/job114076765987:2068tests/2013PASS/55FAIL/
0skip; all55 failure names exactly match local inventory and778. Pages38006618687
succeeded. Fresh live index/version/kernel/Face import owner, unchanged main and
frozenBeta6 version byte-match repository.84focusedPASS. User .778 PASS recorded;
.779 supplied-model device acceptance pending.
