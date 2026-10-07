

## 2026-10-07 — v0.36.18.748 partial-chain Bevel through four-way vertices

- User PASS .747; Add Vertex remains deferred.
- Actual prior multi-chamfer rejects consecutive7/35 or7/35/42 on supplied loop
  cage. Existing engine extended to one open nonbranching strip chain, four-valence
  straight-through internal vertices and one-selected-edge endpoints.
- Directed local one-owner boundary rings supply complete end caps, preserving
  rounded subdivisions. Chamfer two triangular end caps are necessary geometry;
  rounded caps are polygons. Existing groups/creases/loose remapping retained.
- Four-way turns/branches remain safe refusal; complete loops retain dedicated
  engine. Early widening accidentally routed complete rings to connected engine;
  existing semantic tests caught it, fixed by explicit connected-open-chain gate.
-10newPASS/140partialpaths; focused120PASS; full1787/1685/102/0, same102identities.
- Multi-chamfer runtime only; bootstrap/Inset/Face import-only chain748, guard747;
  reviewed4hashes/pins; main/Loop715/Multi/frozen betas untouched.
- Node22/Pages verification and device .748 acceptance pending.

The source fixture is tests/fixtures/loop-cut-746.obj unchanged. Prior engine
probed from actual .747 git source with imported utility functions: two/three
consecutive source-loop edges returned null. Current engine routes connected and
executes; no new competing Bevel tool or pointer owner.

Caps use topology order, reversing each existing directed boundary edge. Require
one complete cycle covering all endpoint points. Existing outer guard restores
source on null and validates closedness/winding; actual preview Apply/Cancel and
history tested. Endpoint provenance unanimous source group; mixed groups null.

Limits: four-valence adjacent-face turns and branches remain unsupported, higher
valence remains unsupported. Does not repair prior damaged meshes, prove no
self-intersection, or guarantee all-quads. Chamfer uses natural triangular end caps.

Focused120PASS. Full1787tests/1685PASS/102FAIL/0skip; all102 failure identities match
.747, no exclusions or gates. Publication/Node22/live verification pending.
Device .748 acceptance pending.
