# Metalness painting — build .923

The existing Paint Channel selector now includes Metalness. New maps begin at0
(non-metal); brush value defaults255 (metal). Values use the same opaque scalar
raster, pressure/coverage, budget, checkpoint and cancellation owners as Roughness.
The stored result is independent linear R8, never a colour layer or mask.

Lit material uses the existing lighting and surface owner. Roughness samples linear G;
metalness samples linear B with factor1. Without a metalness map factor0 remains.
Separate cached textures support independently sized committed maps. Painting existing
non512 maps refuses rather than resizing. Source UVs, sRGB colour and source maps stay
unchanged. Channel mode is grayscale; changing target/preview cancels contact.
Done displays the committed material for active/inactive objects. Original Save/Open,
Undo/Redo, ordinary Duplicate and NOM/GLB export carry the same independent resources.

Automated checks cover byte semantics, controls, cancellation, rollback, identities,
quotas, texture channels/lifetime, codec/history, actual single/Multi Duplicate and
NOM/GLB images. These checks do not establish real GPU highlights or Pencil latency.

Hands-on: create UVs and open Paint. Use Metalness255 then0 in Channel mode; compare
Lit with a low Roughness value such as32 and orbit in Studio. Switch Colour/Roughness/
Metalness and confirm independence. Done, Save/Open, Undo/Redo, then duplicate and
paint only one copy. Export NOMAD and check material appearance in Nomad if available.
User920PASS remains protected;923 acceptance pending.
