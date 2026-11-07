# .932 Connected-face Blur sampling


## .932 — Connected-face Blur sampling; .931 user PASS — 20 October 2026

User PASS protects .931 Blur and prior .930 solid Object display. Audit main05a790e8:
original UV inspector already owns polygon edges, exporter owns triangle emission;
reuse both via optional edgeOwners and original vertex IDs. Default reports/geometry/
exports unchanged. New small read-only seam plan unfolds original triangle neighbours
across real manifold edges, mapping into detached/rotated/mirrored UV islands. Atlas
proximity never connects faces. Internal diagonals use the same original emission.
Fixed centre4/cardinal1 stroke-start blur now reads mapped connected-face texels.
Writes remain clipped to picked face: stroke BOTH sides of edge; brush footprint does
not wrap automatically. No world-radius/full seamless-footprint claim, no Smudge.
Boundary/nonmanifold/ambiguous corner/long walks clip; invalid/stale ownership and
existing overlapping/degenerate/out-of-tile/complex UV refusals stay atomic. Max8
crossings/sample and2M walk steps; lazy session plan512² labels1MiB+links4MiB,
temporary triangle map1MiB; owned contact copies5MiB plus original stroke buffers.
Premultiplied colour alpha, raw masks/scalars, capped coverage, original alpha tips,
input/raycast/history/COW/SaveOpen/NOM/GLB owners retained. UI says connected faces
and explicitly asks strokes over both sides. No modelling/UV authoring kernel added.
Five new tests cover 12 fold/rotation/mirror layouts, disconnected atlas decoy,
nonmanifold/stale metadata, exact raster alpha/cancel and actual UI→history→SaveOpen→
exact native PNG. Focused20PASS incl release5; full/publication below. Complete changed
reverse loader graph repinned932; retained main/cage/Multi1.0/frozen bytes unchanged.
Read docs/paint-seams-932.md. Device932 seam appearance/latency pending; alpha929 gate
not inferred. Reflection preview independently unresolved; native exports protected.
Next device feedback then bounded Smudge through original paint owner; AO and UV seam
AUTHORING remain queued. Seam sampling is not seam authoring.

The read plan is transient, not serialized. Existing .boxlab resource schemas and
export writers are unchanged. It follows canonical source vertex IDs, not coordinate
welding, normals or nearby UV islands. The original inspector supplies polygon edge
owners; the preview builder supplies original emitted triangle face/vertex metadata.
For a missing same-face cardinal texel, walk the existing triangle graph: intersect
the UV segment with the earliest edge, convert into 3D, unfold the remaining vector
into the neighbour plane using the common edge frame, then map through that triangle's
UV basis. Nearest destination texel must belong to the destination face. Tied vertex
crossings, ambiguous texels and unsupported edges are skipped and weights renormalized.

This is a narrow read-kernel extension. Five-tap one-texel sampling can soften across
an edge when both sides are stroked; increasing Size expands brush coverage, not the
filter radius. It does not stamp the far face automatically or guarantee identical
smoothing under different UV texel densities. First-use planning remains synchronous
and bounded; actual iPad latency must be checked. No measured GPU/resource-saving claim.

The first full UI test setup attempted replacing the scene through a harness whose
active-object closure still referenced its original array. Corrected the fixture via
the real in-place mesh owner before painting; production guards were not weakened.
