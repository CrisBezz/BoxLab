# BoxLab Development Roadmap

This is the persistent product roadmap for BoxLab.

The repository is the source of truth. Keep this file aligned with `AI_HANDOFF.md`, `DEV_HISTORY.md`, and `TEST_CHECKLIST.md`.

## Product direction

BoxLab is an **iPad-first touch/Pencil polygon modeller and Nomad Sculpt companion**.

Core principle:

**Import → Clean → Model → Export → Nomad Sculpt**

BoxLab should stay fast, direct, topology-aware and shallow. It should not become Blender-on-iPad.

## Phase A — Topology intelligence / Clean for SubD

**Status: COMPLETE at v0.36.18.323.**

Delivered:
- conservative four-triangle fan repair
- sliver/skinny-triangle cleanup
- bounded even triangle-island complete matching up to 40 connected triangles
- complete matching only; no stranded triangle forcing
- surrounding quad-flow quality
- whole-patch boundary guards
- internal proposed-quad flow coherence
- average + worst-local internal-flow ranking
- smooth-interior valence regularity
- average + worst-local valence ranking
- conservative residual triangle-pair merge
- guarded all-quad tangent relaxation
- topology audit for invalid references, repeated/collapsed edges, duplicate faces, non-manifold edges and orphan crease data
- transactional rollback in the core cleanup pipeline
- generated irregular-mesh regression fixtures
- UI-level topology validation remains as a second line of defence

Phase A freeze rule:
- do not resume blind triangle-cap growth
- do not chase exotic remeshing research without a concrete user-facing failure
- future Clean for SubD changes require a real modelling case or a reproducible regression

## Phase B — Precision modelling

**Next active phase.**

Priority candidates:
- cross-object snapping — **Add Vertex in v0.36.18.324; component Move snapping added in v0.36.18.325**
- precision drag/readback polish — **live component Move ΔX/ΔY/ΔZ readback added in v0.36.18.326**
- Repeat Previous audit/polish for exact repeated operations — **Repeat Extrude / Repeat Inset pre-existed .327; redundant duplicate loader removed in v0.36.18.328**
- Align / Flatten component tools — **existing Make Planar retained; Align X/Y/Z added in .329 and upgraded to explicit pick-anchor workflow in v0.36.18.330**
- Circle / regularize selected components where topology permits — **simple closed Vertex/Edge loop Circle added in .331; single selected Face boundary support added in .333; UI moved from Selection to contextual Active Tools in .334; exact Vertex/Edge/Face Active Tools slots arranged in v0.36.18.336**
- Edge Split canonical-Multi regression — **fixed in v0.36.18.335 by making Edge paint selection yield while Face Split is armed**
- Edge Flip for manual topology-flow correction — **existing Rotate Edge audited as the same triangle-pair diagonal swap; consolidated under the clearer Flip Edge label in v0.36.18.337**
- stronger structured Fill / Grid Fill / Cap workflows — **existing Fill is the current single-face Cap; conservative four-sided all-quad Grid Fill added in v0.36.18.338**
- support-loop construction improvements
- preserve direct Pencil interaction and minimal mode switching

## Phase C — Object / instance workflow

- finish linked-instance editing robustness
- Make Unique audit/polish
- cross-object reference/edit workflows
- stronger multi-object editing
- Join/Boolean workflow polish
- persistent object/region organization

## Phase D — Construction tools

Only add focused tools that suit BoxLab:
- topology-aware Symmetry / Bisect / Apply
- Shell / Solidify
- Array
- Sweep where appropriate
- Lathe where appropriate
- lightweight deformers only if they fit direct touch modelling

## Phase E — Import / repair / handoff

- Mesh Health / Inspect workflow
- Auto Close / Make Watertight
- stronger boundary diagnostics
- normals / triangulation controls
- export polish
- GLB export if useful for the Nomad/3D handoff workflow

## Phase F — iPad UX polish

- drawer consolidation
- persistent tool modes
- left-hand access
- reduced tap count
- consistent Pencil drag behaviour
- selection-region workflow
- numerical precision entry/readback
- landscape-first layout
- selection visibility at all zoom levels

## Protected product behaviour

Preserve:
- one-finger orbit
- two-finger pan
- pinch zoom
- two-finger tap Undo
- three-finger tap Redo
- no-jump orbit pivot
- persistent selections during navigation
- Studio realtime default/behaviour
- object management / Multi
- current snapping
- mature Through behaviour
- existing core modelling tools
- transactional topology operations

## Deferred / intentionally not active

- path tracing: abandoned in favour of Studio realtime
- broad sculpting / voxel remesh: belongs in Nomad rather than BoxLab
- Blender-scale scene-management complexity
- speculative topology work without a user-facing failure
