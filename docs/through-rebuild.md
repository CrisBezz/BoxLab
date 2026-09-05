# Through rebuild — v0.36.16.0

Base: main 7e94540f17098e30c2cf12f729a86d5eea7e15c4 (v0.36.15.2).
Branch: rebuild/through-topology-v0.36.16.0. The user explicitly authorized push and merge after reviewing the results and remaining limits.

## Architecture

`through-kernel.js` has no DOM handlers and changes no mesh prototypes. The existing
`multi-face-direct.js` drag owner calls its planner and builder for one inward
source face. Outward Extrude, connected bands, and Inset keep their geometry paths.
The planner is cached for the drag. Crossing only part of a sloping exit cannot
commit an ordinary extrusion intersecting the shell.

The kernel requires a closed, consistently oriented input. It constructs side
half-spaces from a planar convex source and finds exit intersections by clipping
actual shell triangles, without face-history/ownership exclusions or ray samples.
It subtracts the bounded prism from all shell faces, retaining unchanged faces.
Tunnel walls come from each explicitly corresponding source edge's sweep plane;
these are subdivided by shell planes and classified by solid winding number on
the material side. This also removes coincident exterior walls at breakouts.
There is no loop rotation or generic bridgeLoops call.

Intersection vertices on original edges use topology-foundation canonical splits,
including crease propagation. All final shell and wall edges are conformed to the
same seam vertices. Trial meshes suppress the existing edges() UI publication hook.
The foundation supplies clone/state, canonical splitting, boundary extraction,
validation and transaction helpers; the kernel adds area, finite-coordinate,
edge-winding and connected vertex-fan validation. Successful output must have
exactly two oppositely directed owners per edge and no open boundary loops.
Live meshes are restored from a validated result only. Failed/cancelled drags
restore their source selection and geometry, and do not push Undo or clear Redo.

The numeric tolerance is bounding-box diagonal × 5e-7 (floor 1e-10), accounting
for six-decimal OBJ coordinate rounding. It is not an exact-predicate Boolean.

## Retired versus active

Active: through-kernel.js, multi-face-direct.js, topology-foundation.js.

Disconnected from startup: transactional-through.js, transactional-through-v2.js,
transactional-through-v3.js, extrude-region-through.js, extrude-corner-through.js,
through-breakout-cleanup.js and extrude-through-viability.js. Legacy files remain
for reference. The old embedded special-case Through builder was removed from
multi-face-direct.js. No additional pointer handler, MutationObserver, service
worker or broad startup listener was added. Foundation's ready notification is
only guarded for a Node test environment. The startup smoke module is no longer
loaded. Multi-object-transform.js and its ?v=0.36.1.0 URL are unchanged.

## Regression results

Run `npm install` then `npm test` (Node 24 used). 12 tests pass:

- Clean inset quad Through; exact expected volume 6 versus original 8; Undo/Redo.
- 14.8 fixture: all three front polygons, including the rear-corner breakout.
- 14.14 (2): all four remaining front source polygons of the double-Knife geometry.
- 14.14 (1): all sixteen source faces in the Loop Cut fixture.
- Sequential adjacent Through after a prior Through.
- Native loopCut across a rebuilt tunnel (eight faces split), then another Through.
- Triangulated targets / reordered face ownership.
- Damaged 14.15 inputs rejected unchanged for every source face.
- Whole-solid removal rejected unchanged.
- Diagonal sequential removal rejected: four owners on a shared edge.
- Crease retention / canonical splitting and loose metadata on a private trial.
- Protected Multi transform import and legacy startup disconnection assertions.

Each successful cut also checks manifold closure, winding, positive/decreased
volume, and unchanged input. Fixture filenames do not encode selected faces;
front face ranges above are explicit zero-based tests, not claims about unseen
interactive selections. The two 14.15 fixtures are **not successful-cut passes**:
14.15-base has 13 boundary edges and one non-manifold edge; 14.15-base (1) has
19 boundary edges before this operation. Neither is silently repaired.

JS syntax and git diff checks pass. Browser startup and touch/Pencil interaction
were not verified: no installed Chromium; the attempted browser download timed
out. Node history checks do not constitute a browser interaction test. Do not
describe this as a proven iPad build until that gate is completed. The user authorized merging with this verification still outstanding.

## Remaining limits

- Concave source polygons (convex triangles/quads/n-gons are supported).
- Nonplanar faces beyond OBJ rounding tolerance, open/non-manifold inputs, and
  inconsistent winding. Repair belongs to a separate explicit operation.
- Separate exit depth intervals, including multiple shells or some stepped exits;
  these return multiple-exit-depths instead of choosing a farther shell.
- Results consisting of solids touching only along an edge/vertex.
- Complete solid removal and arrangement complexity over 10,000 wall fragments.
- No general exact self-intersection predicate; pathological overlapping solids,
  nearly coincident geometry and extreme scale ratios need additional work.
- Some other source faces in 14.14 (2) roll back, including face 9's invalid output.
- Construction retains unused vertices and may introduce polygon subdivisions.
  It does not promise quad-only output or minimal face count.

Next gates: browser startup/drag/cancel/Undo/Redo and protected navigation tests;
robust overlap predicates and concave-source prism unions; repaired-input fixtures
for the two damaged 14.15 cases, with explicit intended source selection.
