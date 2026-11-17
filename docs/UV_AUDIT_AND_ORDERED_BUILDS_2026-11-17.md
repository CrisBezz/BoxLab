# UV audit and unified BoxLab / Helios build progression

17 November 2026. Supersedes the priority order in NEXT_BUILDS_AUDIT_2026-11-17.md; that report remains supporting evidence for non-UV findings. B = BoxLab modelling/painting/integration; H = Helios Studio/shared renderer; UV = BoxLab UV workflow. These are queue identifiers, not runtime versions. No runtime feature is implemented by this audit.

## User-directed priority

Reliable painting and controlled UV creation are core deliverables. Bring general auto unwrap, large usable patches, Facegroup guidance and selected-edge seams ahead of more presets, output polish and geometric displacement. Every step below delivers a usable capability or directly protects the following feature; exploratory backend work is part of UV1's acceptance gate, not an indefinite separate lab branch.

## Current implementation and why it refuses

Audited BoxLab main after the previous documentation audit: runtime .1188; original UV owners remain unchanged. Existing UV creation/editing belongs to imported-uv-edit.js, inspection to imported-uv-inspection.js, Facegroup planning/flattening to facegroup-uv-core.js, workflow preview to facegroup-uv-workflow.js, and the editor to uv-workspace.js. Reuse those persistent UV/history/paint/export owners.

| Existing capability | Finding |
|---|---|
| Planar, Box, Cylinder, Sphere, Torus projections | Useful existing shape-specific paths; not a general arbitrary-surface unwrap. Preserve them. |
| Face atlas / Auto atlas | Starts with Box coordinates and joins coplanar or small-angle compatible faces (0–30°). It is not a general conformal unfolding algorithm. |
| Facegroups → UV Seams | Treats group borders as hard chart boundaries and requires each connected chart already to be one disk. Checks Euler characteristic=1, one simple boundary loop and no pinched boundary. Closed groups, holes and handles fail before flattening. |
| Curved Facegroup flattening | Positive-weight harmonic solve with boundary fixed to an arc-length circle. Good for its restricted domain, but the circular boundary and uniform graph weights are not a general low-distortion solution for long or irregular patches. Planar shapes use a separate exact projection path. |
| Selected-edge Cut UVs | Requires complete native UVs first; changes existing chart connectivity and repacks. A slit that does not split whole islands is refused. It is not a persistent seam-design tool usable before initial unwrap. |
| Stitch UVs | Limited to two coplanar, undistorted native islands, with a128-face cap. No general curved stitch-and-relax. |
| UV editor | Island move/scale/rotate, checker/image reference, fit, density and pack already exist. Do not re-add them as new features. Persistent pins, locked charts and selective re-unwrap are not present. |
| Packing | Grid plus height-sorted shelves; gaps expressed in UV fractions, not a user-selected pixel gutter tied to map size. Useful existing fallback, not final control over paint texel allocation. |
| Targets and paint | Native UV authoring rejects imported payloads and many evaluated/linked objects; UV creation/cut/stitch rejects painted targets. Safety is valuable, but the workflow currently ends with “clear paint” rather than preservation/reprojection. |
| Quality report | Current inspector reports validity, missing faces, bounds and connectivity. It does not constitute a complete triangle-overlap and distortion-quality validator. |

The issue is a missing chart-planning/general-unwrapping capability, not something to solve by weakening finite/topology/ownership checks. A valid planar ring can have a hole and still map perfectly without an extra seam; “not a disk” is a limitation of the present solver, not proof of an invalid model.

### Reproduced during this audit

- Original planner: closed cube with every face in Facegroup Body → refused for needing an open disk-shaped patch.
- Original planner: four-quad flat ring with central hole in one Facegroup Ring → same refusal.
- Existing Facegroup core/workflow regression tests:9/9 PASS, 592ms. They intentionally protect refusal/no mutation for these old strict cases; passing them does not mean general unwrap exists.
- Separate downloaded watlas checkout `9a8f004c1053145e97b2c489fc73a37fe48a44a7`, existing WASM executed in Node: closed cube →6 charts,36 indices,24 output vertices; planar ring with all triangles sharing one material/region ID →1 chart,24 indices,8 output vertices; finite UVs and valid original-vertex references checked on the ring.
- These are isolated backend feasibility checks, not BoxLab integration, seam-control proof, packing quality measurements, output-overlap certification or Safari/iPad performance acceptance. The wrapper emitted615×385 for the cube and521×521 for the ring when asked for resolution512: that setting is not proof of exact512² output. The adapter must normalize and enforce BoxLab's output contract explicitly.

## External algorithms: recommendation and limits

| Candidate | Suitability | Decision |
|---|---|---|
| xatlas through watlas | Automatic charting/parameterization/packing, existing browser/Node WASM route; wrapper exposes mesh material IDs, input UVs, polygon counts and original-vertex references. | Leading candidate. Audit execution succeeded. Pin source and binary provenance, package locally, verify controls in UV1. |
| xatlas.js | Existing JS/WASM wrapper with documented worker usage. | Alternative wrapper over the same engine if its constraint/mapping surface fits better; do not install two automatic-unwrapping engines by default. |
| libigl LSCM / ARAP | Established parameterization building blocks; LSCM permits fixed vertex constraints without forcing the complete boundary to a circle. Eigen/C++ integration and selected-module licensing need review. | Candidate for later pinned/relaxable chart solving, not a drop-in replacement for seam planning, packing and the editor. |
| Microsoft UVAtlas | Isochart library; current official repository is archived and README advises against new-project adoption. | Do not choose as the new primary integration. |

Sources checked17 November2026:

- [xatlas repository and licence](https://github.com/jpcy/xatlas), [native API](https://github.com/jpcy/xatlas/blob/master/source/xatlas/xatlas.h), [licence file](https://github.com/jpcy/xatlas/blob/master/LICENSE).
- [watlas README/API](https://github.com/toji/watlas/blob/main/README.md); local reviewed source includes web/watlas.cpp and dist/watlas.d.ts. MIT notices must travel with shipped artifacts.
- [xatlas.js README](https://github.com/repalash/xatlas.js/blob/master/README.md).
- [libigl parameterization tutorial](https://libigl.github.io/tutorial/#least-squares-conformal-maps), [LSCM header](https://github.com/libigl/libigl/blob/main/include/igl/lscm.h), [MPL2 file](https://github.com/libigl/libigl/blob/main/LICENSE.MPL2). Inspect the exact chosen modules and dependencies; do not assume the entire repository has one uniform licence.
- [UVAtlas official README](https://github.com/microsoft/UVAtlas/blob/main/README.md).

### What “Facegroups guide the unwrap” means

1. **Auto:** no Facegroups required. Generate a complete layout, preferring usable large patches within the chosen distortion tolerance.
2. **Guided:** Facegroups establish intended regions, but the solver may create additional seams inside them where needed. Disconnected regions of the same group stay disconnected. Preserve original Facegroup labels. A separate “keep groups separate” constraint prevents chart crossing at selected borders; one group is not promised to equal one island.
3. **Selected seams:** mark/clear mesh edges before unwrap, preview the seam network and solve the resulting corner topology. Distinguish required seams from automatically suggested seams. Existing seams and selected patch boundaries can be retained.
4. **Controlled patches:** select faces or a Facegroup as the target, keep other islands locked, and regenerate only that patch. Later pins constrain selected UV coordinates while relaxing a chart.

Important API distinction: xatlas faceMaterialData keeps different IDs out of the same chart; it is a hard separation mechanism, not an arbitrary soft “preferred seam” weight. Same-ID regions may still split. The native chart weights are not an exact island-count or minimal-seam guarantee. Soft-border preferences, keep-together and selected-edge cuts must be implemented/verified by the adapter, never inferred from the parameter name. If topology forces extra cuts, preview them and explain why; do not return a generic refusal or secretly ignore the user's seams.

A proposed Large Patches control should tune the seam/distortion tradeoff, show chart count and stretch, and preserve sharp/important boundaries. It must not promise one chart for every group or claim fewer islands is always better. Large patches with foldovers or severe stretching are not a successful result.

## Integration contract: one UV workflow, unchanged editable mesh

- Preserve native vertices, polygon faces, ordering, Facegroups, creases and modelling history. Temporary triangulation uses the current authoritative preview/export triangle ownership, with explicit source face/corner correspondence.
- External libraries duplicate vertices at UV seams and return a new index buffer. Map that result into existing face-corner `uvCorners`; never replace the editable quad mesh with the backend's triangulated render mesh.
- Prove that seams inside temporary triangulation do not create incompatible UV coordinates for one original polygon corner. Prefer polygon input when supported, verify n-gons/warped faces and winding. If correspondence is ambiguous, identify the affected face and suggest a safe repair; do not average away a discontinuity or silently remesh.
- Persist seam intent as versioned data associated with the existing UV owner/topology identity; no second independent UV payload. Preserve the original strict Facegroup mode for compatibility, and add explicit Guided semantics rather than weakening its old tests.
- Use a dedicated worker, same-origin pinned JS/WASM, bounded input/work/memory and one active job. Start single-threaded without requiring SharedArrayBuffer or new cross-origin isolation headers. Terminating/recreating the worker provides real cancellation if a synchronous native solve cannot poll it. Ignore stale results after edits/Undo/scene changes.
- Own resource destruction explicitly. Normalize backend texel coordinates, inspect atlas count, and choose one final pack policy. Reuse current editor/history/export owners. Existing Pack must retain its accepted behavior until a tested replacement is selected.
- Validate complete per-corner coverage, finite/noncollapsed triangles, flips/winding, unexpected overlaps, requested seams, chart identity, distortion, bounds, pixel padding and float32 export. Separate legitimate intentionally stacked UVs from unintended overlaps; initial Auto should produce unique non-overlapping charts.
- Preview checker/stretch/seams before Apply; one Apply means one Undo. Cancel preserves original mesh/UV/paint. Save/Open must preserve seam intent and applied UVs.
- Start within the existing4096-face/20,000-corner envelope; later raise limits from real worker/preview/paint/export measurements. WASM here supplies a missing algorithm, not a claim that old subdivision bridges became faster or browser RAM limits disappeared.

## Unified delivery order — supersedes the previous queue

B1's browser workflow checks are added to early UV releases rather than becoming a long test-only project that postpones UV work. Existing modelling regression gates remain mandatory throughout. H1/H2 are early because texture correctness protects painting/render validation.

| Order | ID | Concrete build outcome | Depends on / acceptance |
|---|---|---|---|
| 1 | **UV1** | Bounded **Auto Unwrap** for independent unpainted Base meshes: backend adapter, worker, seam/checker preview, Apply/Cancel/Undo and source-corner mapping. Auto needs no groups. | Backend proof includes closed cube, ring, curved strip, sphere, torus, concave n-gon and original quad preservation. Existing primitive projections remain. If watlas API fails a critical adapter test, use a minimal pinned xatlas wrapper within this same milestone; do not leave an unrelated permanent lab. |
| 2 | **H1** | Repair shared texture-slot ownership, release and overflow; add executable Helios behavior tests. | Ninth texture cannot overwrite first; freed non-next slot reusable; failed allocations preserve existing materials. |
| 3 | **B1** | Port H1 safety into BoxLab's vendor/import paths and fix surface-opacity Reset; add full browser selection→Extrude→Undo regression to CI. Split runtime scopes if necessary. | H1; preserve all modelling, UV and render-session ownership gates. |
| 4 | **UV2** | **Facegroup Guided Unwrap**: groups as regions with automatic extra cuts where necessary; show those cuts rather than demand pre-existing disks. | UV1; closed/same-group and holed regions supported where geometrically valid; original labels preserved; optional hard group separation verified. |
| 5 | **H2** | Transactional async model/map load with scene/material/request tokens. | H1; delayed A→B, Restore, cancel, failed import and dispose cannot publish stale assets. |
| 6 | **UV3** | **Selected-edge seam unwrap**: mark/clear seam edges before initial UVs, loop/path selection, combine with group guides, regenerate preview. | UV1/UV2; required seam constraints proven, including cylinder slit and torus cuts; same-position vertices must not be accidentally re-welded by backend adjacency. |
| 7 | **UV4** | **Packing and quality control**: density target, real pixel gutters at selected map size, chart count/stretch/overlap report, predictable rotate/pack controls. | UV1–3; no overlap/float32 collapse;1024/2048 gutter behavior tested; common curved fixtures form materially fewer usable islands than face-atlas baseline without unacceptable distortion. |
| 8 | **B2** | **Painting reliability pass on new large charts**: continuous colour/scalar strokes, seam neighbors/padding, size/pressure, cancel, Done and Undo/Redo. | UV4 + texture safety; source pixels/layers/masks and all supported channels remain correct; no stale gizmo/navigation regression. |
| 9 | **UV5** | **Selective patch refinement**: target faces/group/island, keep other charts locked, re-unwrap selected area, controlled merge/split with reflatten. | UV2–4; untouched UV coordinates and their painted content stay exact; no whole-layout surprise on a local edit. Existing island move/rotate/scale retained. |
| 10 | **UV6** | **Imported editable-mesh unwrap** using same adapter with explicit make-independent/evaluated-geometry preparation. Retain original imported maps/provenance until commit. | UV1–5; GLB/NOM imports, multi-material meshes, stale topology, Make Unique and Undo/Save/Open fixtures; no automatic destruction of imported assets. |
| 11 | **UV7** | **Safe re-unwrap of painted assets**: retain old layout as source and reproject/bake supported channels into the candidate layout; preview then transactional commit. | B2 + UV5/6; color/roughness/metalness/opacity and masks/layers have declared preservation policy; no silent flattening or “clear paint” as the only route. Start at bounded resolution, clone/export before destructive alternatives. |
| 12 | **B3** | **Complete authored-opacity NOMAD handoff and new-UV roundtrip**. | UV4/B2, then UV7 regression; native NOM and GLB preserve valid maps, groups and corner correspondence; .1188 geometry-only warning fallback stays. |
| 13 | **H3** | Standalone material parity: selective backport of independent Metalness map/packed channels and non-emissive scalar opacity. | H1/H2; PBR/trace/reset/transparent-shadow parity, keep emitter opacity separate. |
| 14 | **H4** | Correct grouped/source material import and explicit limits. | H1/H2; material arrays, glass/emissive, external-file policy and multi-map/capacity fixtures. |
| 15 | **B4** | Integrate accepted H4 fidelity changes without overwriting BoxLab's newer material extensions. | H4; new UV/paint export→Helios→return checks with source modelling data unchanged. |
| 16 | **B5** | Measured large multi-face extrusion preview optimization. | Protected inward/Knife/launch gates;5/18/32-region latency, allocation and exact topology parity. Add the same worker/stale-result discipline where appropriate, not another cutter. |
| 17 | **B6** | Measured high-poly imported-mesh navigation/picking/rebuild improvement. | Full gesture release/restart, textured10k/50k/100k scenes and object-list actions; preserve concave/front selection. Existing WASM promotion gates unchanged. |
| 18 | **UV8** | **Pinned chart relaxation** and finer stretch correction via a verified constrained solver, potentially selected libigl LSCM/ARAP modules behind the same adapter. | UV5; pin exactness, no flips, lower distortion and locked-island preservation. No second UV store; if xatlas cannot expose pins, use the explicit chart-solver path rather than fake a pin UI. |
| 19 | **H5** | Save/reload Helios render setups/assets/model linkage. | H1–4; camera/lights/material/mapping restore, malformed/missing assets and size budgets. |
| 20 | **B7** | BoxLab saved render-session sidecar integration. | H5; reuse setup schema, validate scene identity, keep editable .boxlab modelling/material data separate. |
| 21 | **H6** | Bounded dedicated render output dimensions/aspect/quality around existing PNG capture. | H5; clean pixels, cancel restores preview, native iPad memory test. No unconditional4K targets. |
| 22 | **H7** | Opacity/cutout map and then AO/ORM controls with previews/Restore/persistence. Split channel work into narrow releases. | H1–5; new UV and painted opacity fixtures, source-channel fidelity, both renderers. |
| 23 | **B8** | Integrate accepted H6/H7 output/map capabilities with BoxLab authored paint. | H6/H7 + B3; UV/paint/source data preserved, no duplicate export UI or renderer. |
| 24 | **H8** | Controlled true-displacement experiment. | Resource/fidelity foundations; bounded tessellation/BVH, genuine silhouette/shadow changes and cancellation. Normal/parallax alternatives labelled accurately. |
| 25 | **B9** | Integrate displacement only after H8 acceptance and a matching BoxLab memory budget. | H8; retained height-map precision and source mesh ownership protected. If geometric displacement fails its budget, publish the evidence and retain useful bounded normal/height workflow instead of forcing a failing feature. |

This is a serial priority order, not a demand to implement25 features in one release. Some rows can require two small releases. Runtime versions are assigned when work starts. H1/H2 may proceed while UV acceptance is being collected, but no optional renderer feature should stall the UV1–UV7 painting path.

## Practical acceptance suite

Use one permanent corpus across Auto, Guided, edge seams, packing, painting and export: cube; cylinder with caps; flat ring/hole; sphere/poles; torus/two periodic directions; long curved strip; recessed/Knife-cut architectural object; disconnected same-group components; concave n-gon; imported textured mesh; invalid/non-manifold control.

Record charts/face-corner coverage, seam correctness, overlap/flips, median/tail stretch, texel density/gutter, elapsed full-operation time and retained buffers. No single island-count target fits all shapes: flat ring can remain one chart; curved/closed objects may need more seams. Compare chart quality against current face/auto atlas, not merely successful return codes. Invalid geometry should still receive precise diagnostics; supported topology should receive an actual proposed cut/layout rather than a generic NO GO.

Run real browser worker/lifecycle/UV Apply/Undo/Save/Open tests in CI, existing protected modelling tests and the full suite for runtime changes. Use native iPad tests for Pencil interaction, memory and responsiveness; Node-only backend success is not that evidence. End every UV capability build with a usable editor/painting/export path and carry its fixtures into the next row.
