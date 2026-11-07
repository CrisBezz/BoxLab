# .942 — colour pickup across connected faces

User PASS .941 protects same-face Smudge/Opacity/tap/overlay/Paint UndoRedo/SaveOpen.
Audit main76f9d70f: original read-only triangle graph already proves manifold
polygon adjacency. Reuse that proof through paint-seam-neighbours/filter-domain;
do not author another adjacency, unwrap, raycast, mesh, history or pointer owner.

The existing seam plan now also returns frozen canonical face pairs from its
original graph's cross-face edges. Atlas proximity, vertex-only contact,
nonmanifold edges and paths through a third face do not create a pair. Existing
Blur neighbour samples and triangle ownership remain unchanged. Original graph
guards/stale topology/UV overlap/tile/work refusals still apply.

Extend the .941 tip-local reservoir only when consecutive picked faces share one
of those edges. Average its valid samples inside the previous pressure-sized
round footprint (or original alpha-tip mask), in premultiplied RGBA. Seed the new
face reservoir with 75% of that mean plus 25% of that face's stroke-start pixels.
The usual pressure/hardness/alpha footprint and maximum-contact Opacity mix then
write ONLY the newly picked face. Subsequent same-face dabs retain exact .941
spatial pickup. Swatch remains ignored. Masks/scalars retain equal-RGB raw values.

This is deliberately orientation-independent COLOUR carry across a seam. It does
not transport the orientation or detail of the original tip-sized texture patch.
Different UV texel densities retain the existing texel-based Size behavior. No
automatic far-face footprint stamping or global seamless/world-radius claim.
Misses, ambiguous labels, disconnected/nonmanifold/vertex-only or unproven face
jumps still start a fresh pickup without ink. Direct raster callers without the
new optional connection list retain .941 face-reset behavior.

Connection pairs are strictly validated and captured into a private lookup at
contact start. Existing graph bounds cap the producer; consumer refuses >60,000
pairs or malformed/sparse entries before starting a contact. No serialized seam
metadata. The existing 8M per-contact work guard now counts BOTH reservoir updates
and cross-face mean visits; existing whole-contact rollback/navigation recovery
remains. Same reusable ~321KiB maximum reservoir, plus bounded adjacency lookup;
no measured iPad RAM/FPS/latency claim. Original resource/File/native caps unchanged.

Four functional owners: original seam plan, shared raster, viewport core and UI.
Filter-domain and main/Lab reverse-loader parents receive reviewed pins only.
No main/cage/Multi1.0/frozen, UV projection, triangle graph, resource, compositor,
project, export, geometry or lighting algorithm changes. Retained image colour
still requires Convert to paint; image masks remain paintable. AO and Edge seam
authoring remain queued; alpha929/reflection-preview gates remain independent.

Five new checks cover original graph pairs over 12 fold/mirror/rotation layouts,
nonmanifold/vertex-only exclusions/read-only sources; exact carried RGBA/Opacity/
alpha and atlas-decoy isolation; captured/invalid/sparse pairs, misses and bounded
cross-face cancellation; actual continuous surface-picked UI stroke, one Paint
UndoRedo, SaveOpen and exact native PNG; scalar/mask independence/cancel/checkpoint
refusal. All .941 same-face behavior assertions and existing Blur tests retained.

Device: orbit cube to see two faces; paint a broad patch up to their shared edge,
then Tool Smudge across it. Try lower Opacity, painted overlay, UndoRedo and SaveOpen.
Colour continues across the edge; fine texture detail is averaged at the transition.
