# Radial wiring audit — 26 October 2026

Audited main 563fede9 / build .976; resulting narrow build .977.
Scope: all 81 launch entries: Face23, Edge21, Vertex14, Object13, Paint10.
Source traces cover targets, availability, contextual launch adapters and action owners.
The inventory identifies routing; it does NOT certify every mesh/tool/gesture combination.
Node controller/geometry tests do not establish native Safari/Pencil appearance or timing.

## Confirmed defects and disposition

1. **Edge Bridge ready-pair launcher — FIXED .976.** The geometry owner already accepted
   two individual boundary edges. The radial session accepted only a single complete loop.
   Exact supplied OBJ pair3–10/23–24 creates one valid quad through original UI/history.
   Both ready-pair and guided-loop paths now share original eligibility. Live version,
   index and session bytes verified after .976 publication.
2. **Near-front Exact Extrude sign — FIXED .977.** Precision used projection cutoff1e-5px,
   while actual drag owner used1e-4px. Between them, precision could send downward inward
   displacement while the owner interpreted upward, reversing its sign. On existing
   bevel-inset-750 fixture face7, camera centre+normal*5+(0,1e-6,0), Exact -2.2 became
   outward +2.2. Merely orbiting to offset.01 restores inward cutting. Align the original
   precision cutoff with existing gesture owner1e-4; no geometry/Through kernel change.
   In-memory old-source mutation reproduces wrong sign, while repaired precision-generated
   gestures produce identical closed Through geometry at10 head-on/near/oblique views.

## Remaining observations, not claimed repaired

- The user's physical-drag refusal has not been reproduced on their affected model.
  The uploaded Edge Fail OBJ is an OPEN sheet; it supplies Bridge evidence, not a closed
  solid/selected face/gesture for an Extrude Through failure. The exact-view bug above is
  real but is NOT proof that it explains their physical-drag report.
- Face Extrude drag distance is a dot product against projected face normal. Orbit changes
  screen direction; nearly straight-on views deliberately fall back to upward-positive.
  A fixed screen stroke therefore need not produce the same signed travel after orbit.
- Inference Snap uses screen-space vertex/edge proximity18/16px, then raycast face references;
  changing view can change the snapped reference/distance. Existing synthetic exact events
  also traverse this owner if inference is enabled. Audit follow-up: numeric entry should
  be evaluated for reference independence before broadening its semantics. .977 does not
  change inference behavior or claim it explains every refusal.
- Precision applyExact currently returns/records the requested value after event dispatch,
  without a commit acknowledgement; a downstream rollback can therefore leave misleading
  success/readback. Keep this open for a separate result-reporting transaction fix, not a
  new history/kernel. Do not relax valid topology refusals merely to hide this symptom.
- Structural absence of broken targets does not prove freshness of every legacy disabled
  button under every asynchronous scene transition. The audit retains native iPad gates.

## Availability and dispatch review

The71 modelling sectors retain exact text labels and target selectors; icon CSS uses
pseudo-elements and adds no routing text. total-gizmo rechecks availability on radial open,
selection-state events and click. Special paths: Face Bevel uses direct owner eligibility;
Face repair tools use face-repair-viewport (explicit whole-active-object scope); Vertex7
contextual tools use vertex-tool-viewport-session; all13 Object tools use object-radial-session.
Edge Bridge ready/guided paths use its existing session (.976). Other sectors click original
buttons. Sweep uses existing selection launcher. Lock/read-only gate remains shared.
No missing action-owner definition or wrong-mode target was found in this source review.
Contextual availability can legitimately reject wrong topology, a reference/locked object,
unsupported UV/material/procedural resource or incompatible active session.

## Complete modelling target inventory

| Mode | Tool | Original target | Action owner | Launch path |
|---|---|---|---|---|
| Face | Extrude | `#extrudeBtn` | `multi-face-direct.js + precision-face.js` | Original button click |
| Face | Inset | `#insetBtn` | `multi-face-direct.js + precision-face.js` | Original button click |
| Face | Bevel | `#bevelBtn` | `direct-bevel.js` | Semantic direct Bevel launch |
| Face | Knife | `#knifeBtn` | `knife-tool.js` | Original button click |
| Face | Duplicate | `#duplicateFacesBtn` | `duplicate-faces.js` | Original button click |
| Face | Shell | `#shellFacesBtn` | `shell.js` | Original button click |
| Face | Sweep | `.sweep-selection-launch[data-sweep-selection-mode='face']` | `sweep-path.js` | Selection Sweep launcher |
| Face | Delete | `#deleteFaceBtn` | `main.js` | Original button click |
| Face | Join Coplanar | `#joinSelectedCoplanarFacesBtn` | `join-selected-coplanar-faces.js` | Original button click |
| Face | Circle | `#componentCircleBtn` | `component-circle.js` | Original button click |
| Face | Poke | `#pokeFacesBtn` | `poke-faces.js` | Original button click |
| Face | Make Planar | `#makePlanarBtn` | `make-planar.js` | Original button click |
| Face | Triangulate | `#triangulateFacesBtn` | `triangulate-faces.js` | Original button click |
| Face | Flip Faces | `#flipFacesBtn` | `flip-faces.js` | Original button click |
| Face | Orient Faces | `#orientFacesBtn` | `orient-faces.js` | Original button click |
| Face | Orient Outward | `#orientShellOutwardBtn` | `orient-shell-outward.js` | Original button click |
| Face | Bridge | `#bridgeFacesBtn` | `face-bridge-preview.js` | Original button click |
| Face | Close Holes | `#closeHolesBtn` | `close-holes.js` | Whole-object repair session → owner |
| Face | Quad Cleanup | `#quadPairCleanupBtn` | `quad-pair-cleanup.js` | Whole-object repair session → owner |
| Face | Quadify N-gons | `#quadifyNgonsBtn` | `quadify-ngons.js` | Whole-object repair session → owner |
| Face | Clean Vertices | `#cleanVerticesBtn` | `clean-vertices.js` | Whole-object repair session → owner |
| Face | Merge Dist | `#mergeByDistanceBtn` | `merge-by-distance.js` | Whole-object repair session → owner |
| Face | Extract | `#extractFacesBtn` | `extract-faces.js` | Original button click |
| Edge | Extrude | `#edgeExtrudeBtn` | `edge-extrude.js` | Original button click |
| Edge | Slide | `#edgeSlideBtn` | `component-slide.js` | Edge contextual session → owner |
| Edge | Bevel | `#bevelBtn` | `direct-bevel.js` | Original button click |
| Edge | Crease | `#applyCreaseBtn` | `main.js` | Edge contextual session → owner |
| Edge | Offset | `#offsetLoopBtn` | `loop-offset.js` | Edge contextual session → owner |
| Edge | Bridge | `#bridgeEdgesBtn` | `bridge-ui.js + bridge-open-chain.js` | Edge contextual session → owner |
| Edge | Sweep | `.sweep-selection-launch[data-sweep-selection-mode='edge']` | `sweep-path.js` | Selection Sweep launcher |
| Edge | Delete | `#deleteEdgeBtn` | `main.js` | Original button click |
| Edge | Circle | `#componentCircleBtn` | `component-circle.js` | Original button click |
| Edge | Join Coplanar | `#joinCoplanarBtn` | `join-coplanar.js` | Original button click |
| Edge | Loop | `#loopCutBtn` | `main.js + loop-cut-commit.js` | Original button click |
| Edge | Cut UVs | `#cutUVEdgesBtn` | `mesh-health.js / imported-uv-edit.js` | Original button click |
| Edge | Split | `#faceSplitBtn` | `face-split.js` | Original button click |
| Edge | Stitch UVs | `#stitchUVEdgeBtn` | `mesh-health.js / imported-uv-edit.js` | Original button click |
| Edge | Uncrease | `#clearCreaseBtn` | `main.js` | Original button click |
| Edge | Fill Face | `#fillFaceBtn` | `fill-boundary-ui.js` | Original button click |
| Edge | Grid Fill | `#gridFillBtn` | `grid-fill.js` | Original button click |
| Edge | Dissolve | `#dissolveEdgeBtn` | `dissolve-ui.js` | Original button click |
| Edge | Dissolve Loop | `#dissolveLoopBtn` | `dissolve-ui.js` | Original button click |
| Edge | Flip Edge | `#rotateEdgeBtn` | `rotate-edge.js` | Original button click |
| Edge | Collapse | `#collapseEdgeBtn` | `collapse-edge.js` | Original button click |
| Vertex | Extrude | `#vertexExtrudeBtn` | `vertex-extrude.js` | Vertex contextual session → owner |
| Vertex | Build Edge | `#buildEdgeBtn` | `add-edge-ui.js` | Vertex contextual session → owner |
| Vertex | Bevel | `#vertexBevelBtn` | `direct-multi-vertex-bevel.js` | Vertex contextual session → owner |
| Vertex | Slide | `#vertexSlideBtn` | `component-slide.js / vertex-slide-polish.js` | Vertex contextual session → owner |
| Vertex | Join | `#connectVertexBtn` | `main.js` | Original button click |
| Vertex | Weld | `#weldVertexBtn` | `main.js` | Original button click |
| Vertex | Create Face | `#createFaceFromVerticesBtn` | `face-reconstruct.js` | Original button click |
| Vertex | Delete | `#deleteVertexBtn` | `main.js / safe-loose-vertex-delete.js` | Original button click |
| Vertex | Add | `#addVertexBtn` | `main.js / add-vertex-edge-snap.js` | Vertex contextual session → owner |
| Vertex | Circle | `#componentCircleBtn` | `component-circle.js` | Original button click |
| Vertex | Merge Center | `#mergeVerticesCenterBtn` | `vertex-merge.js` | Original button click |
| Vertex | Merge First | `#mergeVerticesFirstBtn` | `vertex-merge.js` | Original button click |
| Vertex | Merge Dist | `#mergeByDistanceBtn` | `merge-by-distance.js` | Vertex contextual session → owner |
| Vertex | Clean Vertices | `#cleanVerticesBtn` | `clean-vertices.js` | Vertex contextual session → owner |
| Object | Transform | `#surfaceTransformBtn` | `surface-transform.js` | Object session → original action |
| Object | Insert | `#surfaceInsertBtn` | `insert-tool.js` | Object session → original action |
| Object | Solidify | `#solidifyBtn` | `solidify.js` | Object session → original action |
| Object | Array | `#linearArrayLaunchBtn` | `linear-array.js` | Object session → original action |
| Object | Boolean | `#booleanLaunchBtn` | `editable-boolean.js` | Object session → original action |
| Object | Join | `#joinObjectsBtn` | `object-management.js` | Object session → original action |
| Object | Symmetry / Bisect | `#symmetryBisectBtn` | `symmetry-bisect.js` | Object session → original action |
| Object | Mesh Health | `#meshHealthBtn` | `mesh-health.js` | Object session → original action |
| Object | UV | `#uvToolsBtn` | `mesh-health.js` | Object session → original action |
| Object | Duplicate | `#outlinerDuplicateBtn` | `object-management.js` | Object session → original action |
| Object | Delete | `#outlinerDeleteBtn` | `object-management.js` | Object session → original action |
| Object | Revolve Profile | `#revolveProfileLaunchBtn` | `revolve-profile.js` | Object session → original action |
| Object | Clean for SubD | `#quadCleanBtn` | `quad-clean.js` | Object session → original action |

## Paint inventory

Original viewport-paint.js owns all ten. Brush/Fill/Eraser/Smudge/Blur set the original
paint-action select and dispatch its change event; the original controller owns raster,
resources/history/cancellation. All five mirror its disabled state and refuse inactive
sessions. Layers/Mask/Image/AO/Map size set original contextual pages, guarded by active
controller/no live contact; actual operations retain their own target/channel/AO guards.
These five are page choices, not five additional brush kernels. Radial visibility and
background holds retain main's original gesture owner.

| Tool | Existing dispatch |
|---|---|
| Brush | tool-paint → paint-action=paint → original change |
| Fill | tool-fill → paint-action=fill → original change |
| Eraser | tool-erase → paint-action=erase → original change |
| Smudge | tool-smudge → paint-action=smudge → original change |
| Blur | tool-blur → paint-action=blur → original change |
| Layers | page-layers → showPage(layers) |
| Mask | page-mask → showPage(mask) |
| Image | page-image → showPage(image) |
| AO | page-ao → showPage(ao) |
| Map size | page-settings → showPage(settings) |

## Validation and limits

- Baseline .976 full suite:2833 PASS,0FAIL/0skip (100.7s).
- .976 focused Bridge/selection-hub/radial/release:225 PASS.
- .977 focused Through/Exact/repeat/radial/Bridge/release:128 PASS,0FAIL/0skip.
- Three new camera tests include10 precision-generated angles, old-code sensitivity,
  five physical projected-normal drags, pure-plan invariance and one-step UndoRedo.
- The128 final .977 checks follow the one-line fix and refreshed dynamic loader graph;
  the2833 count belongs to baseline .976, not a rerun of full .977.
- Parent closure audited: precision-face is dynamically loaded by drawer-ui; BOTH
  child977 and drawer-ui977 shell loader advance. Unchanged main/drag/kernel/icons/Multi
  remain untouched. Release-bootstrap/release-version and shell markers advance977.
- No browser/WebGL or native iPad reproduction asserted. Missing physical-failure input
  remains a device investigation, not a claim that all refusals are repaired.

## Device checks

1. Confirm .977. Retry the previously refused Face Extrude Through in the original view.
2. Near straight-on, try the same negative Exact value, orbit slightly, repeat from Undo;
   both should cut inward when the same source face/shell permits it.
3. Compare physical dragging with Inference Snap off/on; if failure persists send exact
   bottom status text, selected-face screenshot and a .boxlab saved BEFORE the attempt.
4. Existing Bridge: two red edges → Bridge → Apply, UndoRedo and Cancel retain behavior.

## .978 device correction — preview semantics

The initial wiring audit confirmed Edge Bridge Apply routing, but missed that its
ready state had no viewport preview. User screenshot976 identifies that missing
stage explicitly. .978 adds a private-clone blue preview using existing Bridge
geometry and shared Bevel renderer; original UI still owns Apply/history. Cancel
discards preview without source edits. This extends audit coverage from launch and
commit to the missing preview-before-commit interaction.232 focused checks pass;
actual iPad preview readability/interaction remains DEVICE978 gate.
