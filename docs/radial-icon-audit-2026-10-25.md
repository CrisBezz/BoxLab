# Radial icon audit and candidate brief — 25 October 2026

Planning only. Current runtime remains v0.36.18.967, user PERFECT / PASS.
Reference: supplied Nomad Sculpt screenshot CA472FA6-A085-4446-A865-97C0077A67D3.png.
Use original BoxLab artwork: icon above a small visible tool title, readable silhouettes,
consistent visual weight, restrained functional colour, clear selected/disabled states.
Do not copy Nomad artwork or use unrelated stock symbols without reviewing meaning.

## Audit scope and source

Actual radial entries extracted from src/total-gizmo.js and src/viewport-paint.js on
main acb4cd90d19fdf0b9510ed2cc8f1c200eba9ff82. This inventories launch buttons,
not every option within contextual panels. Paint already has SVG icons and captions;
audit/refine that owner rather than replacing it. Modelling radials are text buttons.
Some routing currently reads button.textContent: adding SVG title/desc content can
change dispatch labels. Keep stable action identity and original targets/listeners.

Face: 23 / Edge: 21 / Vertex: 14 / Object: 13 / Paint: 10. Total 81 entries; 65 distinct semantic candidates, separating Vertex Join from Object Join.

## Three concepts per tool

These are concept directions A/B/C for drawing, not finished icons or selected winners.
Each visual review sheet must render all three at equal size, with the tool title below,
and show intended in-app size. Review 6–8 tools at a time; record choices by tool + A/B/C.
Refine selected icons before implementation. Shared tools use one family; contextual
vertex/edge/face geometry may vary without changing the core meaning.

| Tool | Modes | A | B | C |
|---|---|---|---|---|
| Extrude | face, edge, vertex | Raised face with outward arrow | Edge pulled into a strip | Before/after stepped silhouette |
| Inset | face | Small square inside face | Face border with inward arrows | Nested polygon with highlighted rim |
| Bevel | face, edge, vertex | Clipped cube corner | Edge replaced by narrow strip | Vertex replaced by small polygon |
| Knife | face | Blade crossing polygon | Diagonal cut with endpoint dots | Cutting line through mesh grid |
| Duplicate | face, object | Overlapping outlined squares | Two offset cubes | Original plus ghost copy |
| Shell | face | Cutaway hollow box | Face opening with inner wall | Nested open surfaces with thickness arrow |
| Sweep | face, edge | Profile following curved path | Bent tube and guide curve | Cross-section repeated along arc |
| Delete | face, edge, vertex, object | Mesh fragment with cross | Trash bin with mesh tile | Fading selected polygon |
| Join Coplanar | face, edge | Adjacent faces becoming one | Flat tiles with shared edge removed | Planar patch with inward joining arrows |
| Circle | face, edge, vertex | Vertices arranged around ring | Polygon becoming circle | Circular guide with radial dots |
| Poke | face | Face centre joined to corners | Polygon with centre point | Four triangles meeting centrally |
| Make Planar | face | Uneven points projected to plane | Bent patch flattening | Plane with perpendicular settling arrows |
| Triangulate | face | Quad divided diagonally | Polygon filled with triangles | Fan of triangle edges |
| Flip Faces | face | Face normal reversing direction | Tile turning front to back | Opposing normals on one face |
| Orient Faces | face | Neighbour normals made consistent | Connected tiles with matching arrows | Mixed arrows resolving to one direction |
| Orient Outward | face | Cube with outward normals | Closed shell with radiating arrows | Sphere with outward surface arrows |
| Bridge | face, edge | Two boundaries joined by strip | Two loops connected by quads | Gap spanned by mesh arch |
| Close Holes | face | Open boundary with patch | Missing tile filled in | Boundary loop with closing face |
| Quad Cleanup | face | Paired triangles becoming quad | Quad grid with stray edge removed | Two faces resolving into clean tile |
| Quadify N-gons | face | N-gon divided into quads | Polygon with quad lattice | Many-sided tile becoming quad patch |
| Clean Vertices | face, vertex | Stray vertex removed from mesh | Mesh dots with small cleanup sparkle | Redundant point disappearing along edge |
| Merge Dist | face, vertex | Nearby dots within radius joining | Two close vertices with threshold bracket | Cluster contracting inside dashed circle |
| Extract | face | Face lifted away from mesh | Patch separated into second object | Selected tile pulled outside cube |
| Slide | edge, vertex | Vertex moving along existing edge | Edge loop moving over mesh | Constrained double arrow on mesh line |
| Crease | edge | Sharp folded mesh edge | Highlighted ridge with tight profile | Edge with crease-weight marker |
| Offset | edge | Parallel loops with distance arrow | Contour expanding beside original | Twin edge paths with spacing bracket |
| Loop | edge | New ring crossing quad strip | Highlighted continuous mesh loop | Quad band with added cross-cut |
| Cut UVs | edge | UV seam separating two islands | Scissors across UV boundary | Two charts pulling apart at seam |
| Split | edge | Face crossed by new edge | Polygon divided between vertices | Mesh patch with highlighted split line |
| Stitch UVs | edge | Two UV boundaries joining | Needle joining chart edges | Matching island edges with inward arrows |
| Uncrease | edge | Sharp ridge becoming smooth | Crease marker crossed out | Fold relaxing into shallow curve |
| Fill Face | edge | Boundary loop filled with tile | Three edges enclosing new face | Outlined polygon becoming solid |
| Grid Fill | edge | Hole filled by quad grid | Boundary loop with lattice | Two boundary chains joined by quad rows |
| Dissolve | edge | Shared edge fading from patch | Two faces becoming one | Mesh edge removed while outline remains |
| Dissolve Loop | edge | Continuous loop fading from grid | Quad band losing one ring | Dashed removed ring over preserved surface |
| Flip Edge | edge | Quad diagonal changing direction | Two crossing diagonals with curved arrow | Paired triangles pivoting shared edge |
| Collapse | edge | Edge endpoints converging | Mesh edge shrinking to point | Short edge with inward arrows |
| Build Edge | vertex | Pencil connecting vertex dots | New segment extending from vertex | Polyline with emerging endpoint |
| Join (Vertex) | vertex | Selected vertices connected by edge | New line between two mesh points | Separated vertices with bridging segment |
| Weld | vertex | Vertex snapping onto target | Two points fusing at seam | Mesh boundary points zipped together |
| Create Face | vertex | Selected vertices enclosing face | Polygon outline gaining fill | Corner dots around new tile |
| Add | vertex | Single vertex with plus | Point added on mesh plane | New dot at cursor crosshair |
| Merge Center | vertex | Several vertices converging centrally | Corners pointing to centroid | Cluster replaced by central dot |
| Merge First | vertex | Vertices converging to marked first point | Number-one anchor receiving arrows | Fixed highlighted point absorbing neighbours |
| Transform | object | Move arrows with rotate arc and scale handle | Cube with transform handles | Three miniature move/rotate/scale symbols |
| Insert | object | Object seated onto surface | Small cube landing on face | Surface with placement crosshair and object |
| Solidify | object | Thin sheet gaining thickness | Two parallel faces with depth arrow | Solid slab cutaway |
| Array | object | Repeated cubes along guide | Three evenly spaced copies | Linear repetitions with spacing bracket |
| Boolean | object | Overlapping solids with highlighted result | Intersecting circles with operation badge | Cube overlap divided into result regions |
| Join (Object) | object | Two objects becoming one object | Two cubes with joining bracket | Separate silhouettes enclosed together |
| Symmetry / Bisect | object | Mirrored halves across cutting plane | Half object reflected over dashed axis | Cube bisected with matching opposite halves |
| Mesh Health | object | Wireframe cube with check | Mesh patch with repair cross | Mesh inspection magnifier |
| UV | object | Unfolded cube net | UV islands inside square | Mesh-to-flat-chart symbol |
| Revolve Profile | object | Profile rotating around axis | Vase silhouette with rotation arc | Section curve sweeping into vessel |
| Clean for SubD | object | Irregular cage becoming quad cage | Quad patch with smooth preview outline | Mesh cleanup sparkle beside subdivision grid |
| Brush | paint | Brush laying curved stroke | Pencil tip over paint dab | Tapered painted swipe |
| Fill | paint | Bucket pouring into mesh silhouette | Solid object with colour droplet | Enclosed region flooding with colour |
| Eraser | paint | Eraser lifting stroke segment | Paint swipe with erased gap | Eraser revealing checkerboard |
| Smudge | paint | Finger dragging colour trail | Bent pigment streak | Two paint dabs pulled into one streak |
| Blur | paint | Hard edge becoming soft | Dots spreading into soft cluster | Sharp and feathered halves of paint dab |
| Layers | paint | Stacked offset sheets | Three separated paint tiles | Layer stack with selected middle sheet |
| Mask | paint | Half-covered paint tile | Shield over paint dab | Mesh patch with protected region |
| Image | paint | Picture tile placed on mesh | Landscape frame with placement corners | Image card projected onto surface |
| AO | paint | Object casting contact shadow | Shaded corner beneath cube | Concave surface with dark recess |
| Map size | paint | Texture grid with dimension arrows | Pixel tile with resolution bracket | Checkerboard with opposing size arrows |

## Naming and semantic cautions

- Keep actual labels during review; no silent renaming. Suggested clearer captions for user review:
  Loop → Loop Cut; Merge Dist → Merge Distance; Add → Add Vertex; AO → Ambient Occlusion.
- Vertex Join connects topology; Object Join combines objects. Give these distinct geometry cues.
- Join Coplanar versus Dissolve: both can remove an internal edge; the former needs a flat-plane cue.
- Fill Face versus Grid Fill versus Close Holes: distinguish one face, quad lattice and repair patch.
- Shell removes selected opening faces and builds interior walls; Solidify thickens a surface.
- Flip Faces reverses normals; Orient Faces repairs consistency; Orient Outward faces closed shells outward.
- Cut UVs/Stitch UVs operate UV charts, not mesh cuts/welds. Include a flat-chart or checker cue.
- Map size controls texture resolution. Do not reintroduce ambiguous Texture brush wording.
- Layers/Mask/Image/AO/Map size are contextual pages, not all stroke tools.
- Centre Close/Return, gizmo shortcuts, Move/Rotate/Scale and bottom SELECT/UV PAINT are separate
  controls outside the audited tool rings. Include them in a later consistency pass, not as new tools.

## Proposed sequence (not yet numbered builds)

1. Draw first visual review batch: Extrude, Inset, Bevel, Knife, Bridge, Sweep, Duplicate, Delete.
   Three candidates per tool, A/B/C. Audit exists for all modes before selecting art.
2. Refine chosen family, then remaining Face tools; Vertex, Edge, Object and Paint follow in
   manageable sheets, reusing accepted shared icons. Preserve Extrude at 12 and Bevel at 3.
3. First runtime build installs approved icons/captions on one radial only; test real iPad
   readability, spacing, touch targets, tool routing and selected/disabled state before rollout.
4. Continue remaining radials in narrow builds. Facegroup painting remains next functional
   roadmap work unless user changes priority; do not promise it was already implemented.

No icon choices are accepted yet. No runtime release bump or new app test is needed for this planning update.
