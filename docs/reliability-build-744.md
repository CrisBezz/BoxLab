# .744 — Bevel / Knife / Loop boundary conformance

User PASS .743; Add Vertex explicitly deferred and retained on watch list.

Loop previously split quads while leaving the neighbouring n-gon edge unsplit.
A single edge bevel on a cube followed by Loop at a terminal rail reproduced six
boundary edges in an initially closed shell. Knife introduces similar boundaries.
The existing logical-quad addon now conforms terminal polygons using the same cut
vertex IDs. Existing subdivisions on uncut logical rails are reinserted. Single and
multiple operations inherit Loop facegroups and split original rail creases.

No new triangulation or arbitrary n-gon ring traversal. Loop can still terminate
at n-gons; the termination boundary now remains shared. Protected .715 commit owner,
main drag/placement, Multi and frozen betas unchanged. Drawer and addon refresh744;
Face direct743 and finite negative kernel742 remain unchanged. Reviewed contract
updates two changed module hashes and intentional cache references only.

13 new semantic geometry cases cover all seeds of bevel1/3segment and Knife meshes
with1/3Loop cuts, exact volume/closed incidence, original subdivisions, Slide/history,
groups/creases, reverse operation order and coincident disconnected shells. Knife
uses actual pointerup/resolve/split/connect/history code with resolved snap doubles;
Bevel uses authoritative installer chain. DOM/snapping doubles do not prove device
feel. Existing Face Bevel and protected Loop commit tests also pass.

Full Node24:1726 tests/1624PASS/102FAIL/0skip, identical failure identities to .743.
One obsolete688 addon pin assertion now checks reviewed contract; protected715
assertion retained. Full suite remains red; no blanket exclusions or CI gate.

Further observed work: some Bevel-after-Loop edges pass eligibility but execution
refuses; bevel facegroup array can be shorter than output faces. This build does
not fix either finding. General normals/metadata and arbitrary n-gon traversal
need further auditing. No Add Vertex fix claimed.

Runtime e67548c8dac9a62ffade5833da06e3c46c45af80 published. Actual Node22CI
37552628205/job112571439435 matches1726/1624PASS/102FAIL/0skip and all102
failure names. Pages37552627347success; live index/version/drawer/logical-addon
and frozenBeta6 version byte-match main. Focused46PASS. Device .744 pending.

Device smoke: Bevel→Loop,
Knife→single/multipleLoop→Slide, then Undo/Redo and tool exit/navigation.
