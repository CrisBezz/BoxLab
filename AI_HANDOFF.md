# BoxLab AI Handoff — post-Beta 6 reliability

## Current state — 2026-10-09

Repository CrisBezz/BoxLab is the source of truth. Live https://crisbezz.github.io/BoxLab/.
Current build **v0.36.18.769**. User .768 PASS recorded2026-10-09.
Parent main48a2f77598ff469828a1bd593b155047423e5ff9; accepted .768 runtime
d77866b4d110eb569de247a9b318e474203f9ab2. Final publication references below.

## .769 — Face Bevel active-object and selection ownership — 2026-10-09

User .768 PASS recorded. Parent main48a2f77598ff469828a1bd593b155047423e5ff9. User clarifies the scaffold-cap action is Fill Face; use this actual Edge radial label rather than Close Face. Existing controller src/direct-bevel.js owns Face blue previews and Edge live drags. Face session validated mesh/mode/lock/selection but omitted active object identity, unlike Edge ownership. Switching active object while retaining a shared mesh allowed stale preview/Apply/drag continuation. Cancel also restored old Face IDs over a newer selection or locked context.

Capture activeId in Face session and compare in existing faceContextValid. Cancel determines selection ownership before disarm and restores only a still-valid session selection. No new controller/gesture owner; original source comparator, kernels, picker, thresholds, blue preview/Apply, Edge repeat and history unchanged. Invalid object/selection contexts refuse stale Apply; existing panel sync/drag cancellation retires preview, releases capture and restores controls without touching newer mesh/selection/history.

New19 actual whole-controller/viewport-panel checks with real Bevel kernels and rendering-preview objects; pointer picking/DOM are controlled doubles. Initial15-case baseline6PASS/9FAIL; all19 nowPASS, including same-mesh active-object transitions, Apply/slider/press/move/release/cancel, current selection/lock/mesh/mode preservation, panel sync and fresh relaunch, single/multi-Face normal Apply/Cancel, exact Undo/Redo and capture/control/ghost cleanup. Focused231PASS (226 nearby modelling/selection cases plus5 release-contract checks). FullNode24:2026tests/1933PASS/93FAIL/0skip; all93failure identities exactly .768. No skips/exclusions or CI gate. Syntax/whitespace pass.

Shell/recovery769 and single direct-Bevel769 index pin/hash reviewed. Vertex Bevel767/Gate766/Knife763/main762/scaffold761/Extrude759/Loop715/Multi1.0 and frozenBeta2–6 unchanged. Device .769 Face Bevel sanity pending. Next varied Bevel/Knife/Loop reliability and remaining93 historical checks; Add Vertex unconfirmed picking/NOM import/Lasso tightening deferred.

## Next task / outstanding issues

Await .769 Face Bevel iPad sanity, then continue scoped Bevel/Knife/Loop reliability
and the active93 historical failing checks. Counts are test results, not app bug counts.
Do not revert accepted runtime to match obsolete source expectations; reconcile
intended behavior and real owners with semantic coverage. No CI release gate or
exclusions are installed; npm test remains failing until genuinely reconciled.
Add Vertex occasional picking report remains unconfirmed/deferred; actual splitter
and child-edge raycast passed .742, no runtime fix claimed. NOM import and slight
Lasso tightening remain deferred. No broad device requalification requested.

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
Current recovery769; direct-Bevel769; direct-Vertex-Bevel767; Gate766; Knife763;
main762; scaffold-helper761; Drawer/Lasso760; shared Vertex/Edge Extrude/total-gizmo/
background759; Vertex Extrude/core752; Vertex kernels/bootstrap/Inset/Face direct753;
Through child751; multi-chamfer748; guard747; other bevel engines745; Loop logical
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
real-group preservation. Remaining93 active failures visible until reconciled.
