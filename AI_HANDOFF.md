# BoxLab AI Handoff — Negative Extrude clean seams

## Current state — 2026-10-10

Repository CrisBezz/BoxLab is the source of truth. Live https://crisbezz.github.io/BoxLab/.
Current build **v0.36.18.779**. Last explicit user acceptance is **.778 PASS**.
Parent main996bbe7101aea54fd7fd8c039fcb1e129d8999e4; .779 published and live-verified.
.778 released0ba0fe19edee45b6a82f41b33d1a37b681d9e5f: Node22 CI2055/2000PASS/
55FAIL/0skip with exact local identities; Pages38005274578/live verified; user PASS.
All historical details/publication evidence remain in DEV_HISTORY.md and
corresponding docs/reliability-build-*.md/JSON; this handoff describes current owners.

## .779 — Clean negative Extrude partition seams — 2026-10-10

User .778 PASS, then supplied Before/After Extrude OBJ and screenshot778 showing
fragmented shallow cap. Parent main996bbe7101aea54fd7fd8c039fcb1e129d8999e4.
Exact source files retained as negative-extrude-779-before.obj/after.obj (106verts/
110quads before;149verts/123faces after). Source0 is inset z=-1 rectangle1.772 square;
depth0.161517. Prior751 kernel reproduces exact output cycles/cap3; point differences
under1e-4 arise from six-decimal exported source rounding. Not a recent runtime
rollback: .772–.778 validation releases did not change Extrude geometry.

Audit existing Face753→Through751 finite cutter and .742/.750/.751 cleanliness
work. Accepted cutter-boundary pieces have differently subdivided shared seams;
complete-edge greedy merging leaves unnecessary partitions. Extend existing kernel:
conform private piece edges, cancel reversed interior edges per connected component,
trace one simple boundary, coalesce only convex area-preserving unions. Remove straight
partition vertices; canonical assemble restores neighbouring required seam vertices.
Holes, branches, concave unions retain prior conservative merger; disconnected pieces
stay separate;256piece bound retained. No global dissolve/flatten/retriangulate or
new pointer/kernel owner. Existing source/target restrictions and legacy242 path remain.

Your shallow recess now110verts/114faces, one quad cap/four quad walls, no triangles,
closed consistent winding and exact rectangular removed volume. Other105 original
faces retain exact points/cycles; groups/crease preserved. Five depths0.01–2.2,
rotated/translated/scaled copy, physical/Exact/replay actual controller with fallback,
one-step Undo/Redo, preview reversal/Cancel/redo, mismatched seam/hole/disconnected
private boundaries covered.13newPASS/84focusedPASS; fullNode24:2068tests/2013PASS/
55FAIL/0skip, same exact55identities as778; all remaining checks active. Original
fixtures unchanged. Runtime edit only Through kernel; Face import-only cache chain
and shell/recovery779. Reviewed kernel+Face hashes including legacy242 reference;
legacy URL retained. Main762/Inset753/Multi1.0/Loop715/frozenBeta2–6 unchanged.
Publication/Node22/live verified below; .779 device acceptance pending.

Next: confirm supplied-model device negative Extrude, then remaining55 checks and
scoped Bevel/Knife/Loop reliability. Add Vertex picking/NOM import/Lasso deferred.
Manual: load Before Extrude, shallow inward pull of same inset; Undo/Redo, then
another inward/outward pull and normal background navigation.

Source SHA256 before a6d3ca81e70ee50c11c25edb331263a4b34eddce325f61ad894662c3c3dd78b2;
after70c0f4d27ed0f0cc5d9cee01ceeb05f0fbb777436546c761312564c811aff235.

## Add+ / Text baseline — .771

Original primitive-ui/factory owners extended with top-centre X/Y density settings
for six primitives, presets, actual counts and Apply/Cancel. Cube grids weld
boundaries; Cylinder/Cone caps remain n-gons with Y height bands. Text uses bundled
licensed Helvetiker Regular/Three Font + ShapeUtils: word1–64, thickness0.01–100,
curve detail1–16, depth bands1–32. All letters/dots form one ordinary editable mesh,
holes preserved, centredXY/extrudedZ. Unsupported glyphs/blank/bad thickness refuse;
async completion ignores cancelled/replaced panels. Not editable typography; no
viewport preview promised. Original object creation/history one-step Undo/Redo,
Sweep/Revolve routes retained.23newchecks/55focusedPASS plus temporary real-DOM
layout/history smoke. Whole-app WebGL/browser QA unavailable (Chromium absent and
download failed); separate .771 device acceptance not explicitly recorded here.

## Next task / outstanding issues

User .778 PASS; supplied negative Extrude cap fragmentation repaired in779.
.779 device acceptance pending. Continue remaining55 checks and scoped
Bevel/Knife/Loop reliability after supplied-model confirmation. Add Vertex picking/
NOM import/Lasso tightening deferred. FrozenBeta2–6 immutable.

## Accepted interaction / UI baseline

- iPad/Pencil-first: one-finger Orbit, two-finger pan, pinch, two-finger Undo,
  three-finger Redo, no-jump pivot and persistent selection. Studio realtime.
- Selection → puck → expanded gizmo. Centre free transforms; radial shortcut
  top-left; Focus/Frame top-right; Undo/Redo bottom-right; Object Multi bottom-left.
  Tool sessions hide gizmo, return to puck when selection survives.
- Face/Vertex/Object/Edge modelling radials complete. Selection helpers belong
  to gestures/SELECT. Bevel inner90°/3-o'clock, Extrude inner0°/12-o'clock across
  components. Face outer15tools evenly24° apart with Circle anchored0°.
- Focus defaults on (.733); original toggle reveals left list. Top row FrameAll,
  Undo, Redo, Focus, ObjectBrowser, VIEW. Browser opens right under icons with
  original Objects/Modifiers, Modifiers initially collapsed; works in Focus.
- Component Align uses original .705 fixed-anchor/XYZ owner and point/line/face
  gizmo icons. Face also Align-to-Face plane. Gizmo hides during anchor picking.
- XYZ colours follow Move RGB via axis-colours.css735. Tool popups top-centre,
  content-sized shared7px/8px packing; ObjectBrowser is intentional right exception.
- .724 short background tap clears selection/Lasso; stationary500ms background
  hold inverts CURRENT selection. Double tap retired. Original semantic exit
  owners disarm appropriate tools; placement/drawing preserves empty-space input.
- .759 Vertex/Edge Extrude full Distance/Apply Exact/Repeat/Done parity plus
  viewport XYZ/Free chooser; old direction buttons/transform strip hidden.
  Edge Free perpendicular, Vertex Free view plane; no implicit faces/welded tips.
- Scaffold cap action is **Fill Face**, actual Edge radial #fillFaceBtn. Earlier
  handoff shorthand “Close Face” meant this action, not an additional tool.
- Split Done/background; Slide persists until Done/background. Sweep staged
  Face/Edge docks preserved. Array axis endpoint/Free mixed coordinates retained.
  Inset Repeat stores its own value, never Extrude's.
- Actual gesture completion uses window capture where document owners consume
  events. Prefer semantic transitions; do not add competing raw pointer owners.

## Recent reliability work / accepted owners

See DEV_HISTORY.md and docs/reliability-build-*.md/JSON for full evidence and commits.

.769 user PASS: Face Bevel captures activeId, rejects stale previews/Apply/drag
when another object shares the mesh; Cancel restores only owned selection.19new
checks/231focusedPASS; full2026/1933PASS/93FAIL/0skip. Runtime7f0469d5eb8874db98d5ba795237dd986b43db14,
Node22 run37893155389/job113698392066 matched93 names; Pages37893154964 success.

.768 user PASS: five obsolete .646/.648/.650/.651 Pencil/Orbit source expectations
replaced one-for-one with owner behavior, other43 historical assertions and all14
.760/.766 assertions retained. Extracted original whole Gate/Paint/Lasso fixture;
real Three raycasts, controlled Orbit callbacks/canvas down adapter. Four deliberate
routing mutations rejected and source byte-restored.107focusedPASS; full2007/
1914PASS/93FAIL/0skip. Node22 run37865322509/job113610547339 exactly matched93
names; Pages37865321691 success and live bytes verified. Runtime unchanged.

.767 user PASS: direct Vertex Bevel live drag tracks last owned values, activeId,
mesh/mode/lock, loose Sets and groups/creases; invalid context uses original disarm,
restores only its owned preview, releases capture, preserves newer edits/redo.
Original blue-preview comparator/kernel unchanged.28newPASS/156focusedPASS.

.766 user PASS: deferred Pencil gate yields to matching-pointer pending/active
Edge paint regardless of body backdrop. Original .720 paint/main .762 hold owners
and thresholds retained; no paint claim keeps original idle navigation.14whole-
gate tests cover floating/body-backed horizontal/vertical and cancellation.

.765 user PASS: four obsolete candidate-only Edge hold expectations replaced
with actual fixed-base additive .659 behavior. Original12scaffold assertions
retained; four mutations rejected. Source/runtime unchanged.

.764 user PASS: direct Edge Bevel owns source/context during drag; stale newer
edits survive, only owned preview rolls back.24newPASS. .769 changes Face session
ownership only; Edge drag, kernels/blue preview/thresholds/repeat retained.

.763 user PASS: Knife captures coordinates/real face cycles at down, validates
before move/release; stale geometry/context cancels without overwriting edits.
Metadata-only updates use fresh current snapshot; value-equivalent arrays allowed.
.755 guards mesh/object/mode/lock and cancellation; .754 perspective snap edge
interpolation uses clip weights, orthographic weights1; no near-plane clipping.
.749 invalid concave diagonal/boundary sliver/third-vertex/nonplanar cut refuses;
valid concave chord works. Original splitter/picker/gesture feel preserved.

.761/.762 user PASS: bounded planar loose scaffold cells in existing Edge hold
browser, original surfaced order preserved. Real Fill Face one-step Undo/Redo;
vertical Grow/Shrink release retains result/resets horizontal cycle. No implicit
welding/nonplanar caps. Original selection history and additive base retained.

.753 user PASS: Vertex Bevel groups propagate unanimously to caps, mixed null;
Face/Edge/Vertex provenance, Apply/Cancel and stale-label refusal protected.
.756 effective per-face labels compare missing with null, extraneous labels ignored.

.746 user PASS: uploaded tests/fixtures/loop-cut-746.obj31verts24faces (21quads,
3ngons). Guarded parallel convex-planar strip continues vertical seeds across
collinear polygon boundaries; native quad slide/715 feel unchanged. Concave,
nonplanar/ambiguous/nonparallel fallback refuses. Source OBJ remains unchanged.
.748 open simple Bevel chain through four-way vertices works where two internal
selected edges do not share a face; endpoint one edge. Complete-loop/three-way
routing preserved. Branched/four-way turns unsupported; no all-quad guarantee.
.747 checks opposite shared-edge winding on initially closed oriented shells.

.750/.751 user PASS: inward finite cutters use displayed first-vertex fan on
warped targets, ordered exit+epsilon; original fragments/winding/groups retained.
Source tests/fixtures/bevel-inset-750.obj42verts36faces; original uploaded source
unchanged. Selected sources must be planar/convex; closed consistently wound input.
Concave targets may triangulate; no arbitrary concave/warped-source promise.
.742 synthetic Exact pointer9876 uses press origin, real deliberate threshold
unchanged. Through .242 route retained; no-op/refusal/cancel preserves redo.

## Protected modules / cache pins

Frozen beta2/3/4/5/6 immutable. src/multi-object-transform.js?v=0.36.1.0 explicitly
protected; LoopCut commit/feel715 protected. Intentionally old pins are not errors.
Current recovery779; Add UI/factory/Text/font771; direct-Bevel769; direct-Vertex-Bevel767; Gate766; Knife763;
main762; scaffold-helper761; Drawer/Lasso760; shared Vertex/Edge Extrude/total-gizmo/
background759; Vertex Extrude/core752; Vertex kernels/bootstrap/Inset753; Face direct779;
Through child779; multi-chamfer748; guard747; other bevel engines745; Loop logical
addon/drawer746, fallback743; legacy Through242. Export/NOM/core741; debug736;
axis735; Focus733; component-align705. Repin only changed modules and necessary
loading parents, plus shell title/visible/data/version and recovery owners.
Runtime-asset-contract.json is reviewed declared references/hashes, not execution
proof; use tests/helpers/release-contract.mjs. Never blindly regenerate pins.

## File / Nomad baseline and limitations

File NOMAD replaces secondary SaveGLB/note, normal OBJ/GLB retained. Geometry,
names/facegroups/Base/SubD/Mirror implemented735; user PASS735/736. Delivery736
matches MeshUtilz appended-anchor download, .nom extension, application/x-nomad-sculpt
Blob and60s URL lifetime. iOS controls OpenIn; no forced app launch.
No NOM import, native UV/paint/material/morph/crease passthrough promise; GLB retains
richer channel workflow. Source src/nomad-export-core.js and templates/nomad-tube.nom
SHA2569cc56cc4fdea095ec5b8eb917e0101b0e9433f5af54dd3e554ac5b76724010d8.
Provenance MeshUtilz-Sweep-Lab balloon-v0.6 commit18e72a6bf964974591038345d68c2196a18f6af2;
source repo read-only, relative import.meta template isolates frozenbeta.
Beta6 freeze source e1551b3e9c3983c5d0fabfbe44c4ff9e760ff189, publication
acb4012f6a925244f98630dc1fc3b0a8d4be8f86, https://crisbezz.github.io/BoxLab/beta-6/.

## Session / validation contract

Read AI_WORKFLOW.md, all of this handoff, TEST_CHECKLIST.md, recent relevant
DEV_HISTORY.md, ROADMAP.md, current main/live markers/pins/commits. Audit existing
owners first. /nextbuild authorizes scoped implementation, validation, docs and
publication; GitHub/Pages always authorized, no repeat question. Final reply:
“The app is ready for testing — build .XXX”, then brief realistic device checks.
Keep updates during work; be explicit about ongoing versus finished.
Reproduce full suite: node --test --test-reporter=junit tests/*.test.mjs > /tmp/boxlab.xml
then python scripts/audit-test-results.py /tmp/boxlab.xml output.json. Audit only
inventories; does not gate release or suppress failures. Node24 local/Node22 CI.
Original audit docs/reliability-audit-2026-10-05.md/JSON:277check failures, not277
bugs; conflicts include accepted Facegroups, Boolean checkpointSnapshot and OBJ
real-group preservation. Remaining55 active failures visible until reconciled.

## .779 publication verification — 2026-10-10

Release commit `5b24a307f9239286ece4d9947ad6a3f79dfb5542`, tree
`7fc73ef19749c57ec1c910724af03851d6f84905` matches tested checkout.
Actual Node22 Topology run38006619712/job114076765987:2068tests/2013PASS/55FAIL/
0skip; all55 failure names exactly match local inventory and778. Pages38006618687
succeeded. Fresh live index/version/kernel/Face import owner, unchanged main and
frozenBeta6 version byte-match repository.84focusedPASS. User .778 PASS recorded;
.779 supplied-model device acceptance pending.
