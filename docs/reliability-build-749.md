

## 2026-10-07 — v0.36.18.749 Knife diagonal validity / transactional rollback

- User PASS .748; Add Vertex remains deferred.
- Actual prior Knife release on U-notched planar face creates exterior diagonal3/6,
  two faces and one history entry. Topology-only mesh splitter unchanged.
- Knife validates proposed chord in source plane: reject outside/vertex-hit/boundary
  sliver/nonplanar cuts, keep valid concave cuts. Source-relative projection/tolerance.
- Catch failures/exceptions with vertices/faces/groups/creases/loose restoration;
  invalid edge-snap splits retain source and redo. Actual gesture/snapping unchanged.
-10newPASS/focused89PASS; full1797/1695PASS/102FAIL/0skip, same102identities as748.
- Knife body only; shell/directKnife/recovery749, all other loaded pins retained;
  one reviewed hash. main/Loop715/Multi/frozen betas untouched.
- Publication/Node22/live verification and device .749 acceptance pending.

Reproduction uses actual prior git Knife release in VM, not just raw splitter:
source U polygon vertices0..7=(0,0),(3,0),(3,3),(2,3),(2,1),(1,1),(1,3),(0,3).
3→6 crosses missing notch; .748 produces2faces/onehistory/exterior edge. .749 refuses
unchanged. 0→4 lies inside and remains valid, including reversed winding and scaled
rotated/translated polygons. 0→2 crosses existing vertex5 and refuses.

Validation occurs after private endpoint resolution and before authoritative
connectVertices; failure restores full source. Existing mesh.js behavior deliberately
unchanged. No pointer-owner/placement/snapping edits. Nonplanar source now refuses,
and third-vertex chord requires separate strokes; not a multi-face/free-space Knife.
No source self-intersection repair or arbitrary-geometry guarantee.

Focused89PASS; full1797tests/1695PASS/102FAIL/0skip with exact unchanged failure
identities. DOM/VM fixtures do not establish iPad feel. Runtime df89e43581f82d325d9431b31e23191cacd3489b published. Actual Node22 CI37619318589/job112785293117:1797tests/1695PASS/102FAIL/0skip; all102failure names match baseline. Pages37619317487 success; live shell/version/Knife and frozenBeta6 version byte-match main. Focused89PASS. Device .749 acceptance pending.; device .749 acceptance pending.
