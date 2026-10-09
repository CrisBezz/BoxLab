# BoxLab AI Handoff — Armed Face validation

## Current state — 2026-10-10

Repository CrisBezz/BoxLab is the source of truth. Live https://crisbezz.github.io/BoxLab/.
Current build **v0.36.18.776**. Last explicit user acceptance is **.775 PASS**.
Parent mainfbfa4c8d91d11f5c43aaf9062a9f43ce6dfac925; .776 published and live-verified.
.775 release4d10bedc73a627a128550232d2d60a5da6968070: Node22 CI2052/1970PASS/
82FAIL/0skip with exact local identities; Pages38001174378/live verified; user PASS.
All historical details/publication evidence remain in DEV_HISTORY.md and
corresponding docs/reliability-build-*.md/JSON; this handoff describes current owners.

## .776 — Armed Face selection / drag validation — 2026-10-10

User .775 PASS recorded. Parent mainfbfa4c8d91d11f5c43aaf9062a9f43ce6dfac925.
Audited existing multi-face-direct753/native main762 bridge and accepted .501/
.516/.518/.519/.535 history. Seven .484/.485/.490 source checks enforce obsolete
inline tap/raycast/union working-set or function-placement text. Replace these
seven one-for-one with behavior of the whole existing Face controller. Keep five
other original checks and all nearby .535/Through/Bevel/Knife checks unchanged.
Reuse negative-extrude-runtime fixture with optional in-memory source transform;
no writes to runtime. New shared test helper installs real Face region and current
uniform Inset kernels via their existing owners. DOM/primary picker/native toggle
bridge/dispatch are controlled doubles; selected-Face raycast, EditableMesh, Inset/
Extrude kernels and History are real. No native Safari picking/propagation proof.

Both Extrude/Inset: repeated tap add/remove delegates to bridge once, preserves
other IDs, geometry/metadata/redo and armed tool; provisional unselected press is
restored before tap/cancel. Cancel cannot toggle; old release has no latent effect.
Down/5px movement do not validate region or clone a transaction; tap works even
with region refusal.9px promotes to modelling. Unselected drag isolates its hit;
selected drag retains deliberate multi-Face set. Real preview preserves redo,
release commits once without tap-toggle, previous unselected Face unchanged;
Cancel restores geometry, retains working selection and redo, releases capture.
Actual one-step Undo/Redo compared with exact geometry/creases/loose values and
accepted .756 effective Face labels (absent/null equivalent). No blanket metadata
normalization. Initial12checks/5PASS/7FAIL; revised13PASS. One new test rejects eight
mutations: missing primary picker, wrong toggle ID, cancel toggling, early threshold,
union working set, omitted history, premature region validation, cancel committing.

Focused122PASS; fullNode24:2053tests/1978PASS/75FAIL/0skip. Exactly seven reviewed
.775 failures removed; no new identities. Remaining74source-pattern/1version-pin
checks active, classifications do not prove all obsolete. No exclusions/skips/CI
gate. Runtime/frozenBeta2–6 unchanged; shell/recovery776 and two corresponding
reviewed fixture URLs only. Main762/FaceDirect+Inset753/Gate766/Bevel769/Knife763/
AddText771/Gizmo759/Multi1.0/Loop715 retained. Publication/Node22/live verified below.
.776 device sanity pending; no new feature qualification. Next remaining75
historical checks and scoped Bevel/Knife/Loop reliability. Add Vertex occasional
picking/NOM import/Lasso tightening deferred.

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

User .775 PASS; .776 Face-selection device sanity pending. Continue remaining75 historical
checks and scoped Bevel/Knife/Loop reliability. No new feature qualification for
this validation-only release. Add Vertex occasional picking, NOM import and slight
Lasso tightening deferred. FrozenBeta2–6 immutable.

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
Current recovery776; Add UI/factory/Text/font771; direct-Bevel769; direct-Vertex-Bevel767; Gate766; Knife763;
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
real-group preservation. Remaining75 active failures visible until reconciled.

## .776 publication verification — 2026-10-10

Published release commit `fa6e961f12775ff7690e1badb1df5f88b9b88e80`,
tree `6f2bb498821a2d1c3c5c1caabcb6645b64d66a4a` matches tested checkout.
Actual Node22 Topology run38003439298/job114066673069:2053tests/1978PASS/75FAIL/
0skip; all75 failure names exactly match local inventory, no new failures.
Pages38003438462 completed successfully. Fresh live .776 index.html/version.json
byte-match; unchanged multi-face-direct.js/uniform-inset.js and frozenBeta6 version
also match repository bytes. Focused122PASS. User .775 PASS recorded; .776 device
sanity pending. Runtime/frozenBeta unchanged.
