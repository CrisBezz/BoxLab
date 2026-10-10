# BoxLab AI Handoff — Editable Boolean sources

## Current state — 2026-10-10

CrisBezz/BoxLab main is source of truth; live https://crisbezz.github.io/BoxLab/.
Current build **v0.36.18.798**. Last whole-build acceptance **.797 PASS**, protected.
Parent main `2366d1d984e5c6b832cf825836656a7c09b3ec03`.

## .798 — Editable Boolean, first narrow step

User approved sequence: Editable Boolean → automatic Live Boolean → shared Curve
editor/Balloon → Curve Cutter → quad-remeshing feasibility. .797 PASS protects the
2125-check green baseline, GLB groups and Rotate; .796 Add+ preview/unit fit remains protected.

New independent two-object Union/A−B/Intersect results retain a small versioned recipe.
Select the result in Object mode, open Edit Boolean, choose source A/B and use existing
Move/Rotate/Scale gizmo. Update Preview calls the existing Boolean solver. Apply recomputes
stale previews, replaces the same result, hides sources, and records one scene-history action.
Cancel/no-op Apply restores geometry, visibility, settings and original history tokens.
Undo during editing cancels first. Amber/blue guides and mint result preview use disposable
Three overlays; no viewport pointer handler or modelling kernel added.

Owners: boolean-prototype creates recipes; editable-boolean-core orchestrates transaction;
editable-boolean supplies shared-session UI; multi-object replaces active geometry through
its existing replacement helper; object-management retains recipes in snapshots and accepts
an optional prior mesh for same-result scene checkpoints. tool-session-ui routes launch.
Drawer dynamic import and direct management pin match. Protected Multi1.0/Loop715 and
frozen Beta2–6 untouched. New recipes only: historical/exported meshes cannot recover their
source relationships. Linked/grouped/nested or source-modifier cases deliberately retain
ordinary Boolean behavior; manually edited result geometry refuses reopening. Automatic
live recompute, source topology editing and Boolean chains are future narrow builds.

Real manager activation/save/history plus actual Boolean geometry tests cover all three
operations, source movement, Update/Apply, stale/failing preview, Cancel, exact history tokens,
no-op, busy guards, and scene Undo/Redo. Automated results and publication verification below.
Device gate: touch/Pencil gizmo, panel layout, navigation, export and visible preview.

## .797 — Final historical failures / real GLB group import repair — 2026-10-10

User .796 AWESOME PASS protected: Add+ live candidate previews/unit-zone primitives
and Text, Apply/Cancel/history and transfer-scale feedback. User asks to push through
as many remaining failures as possible. Audited all11 active checks: Rotate4 and GLB7.
Read .479→.483 and accepted .635/.636 ownership; .547 shared Nomad material, .550–.556
channel/pole/morph/scale pipeline. No modelling kernel or broad UI restoration.

Four retired Rotate source requirements replaced one-for-one by whole current
transform-upgrade/rotate-transform execution with actual Three/EditableMesh/History,
controlled ordered DOM/dispatch/arming/redraw. Modern puck makes legacy owner yield;
canvas component drags yield to original main selection owner. Explicit gizmo API
rotates selected Vertex/Edge/Face/Object about shared centre with real 90° quaternion,
preserves unselected vertices/IDs, one history push, Undo/Redo and semantic completion.
Legacy fallback reads bridge IDs when modern gizmo absent. Competing-owner and missing
gizmo-tool mutations rejected. This is not main integration/Safari propagation proof.
Other historical Rotate assertions retained; no Rotate runtime change.

Seven GLB source spelling checks replaced one-for-one with actual import conversion,
fit/weld/quad reconstruction, export geometry/build/verification/metadata patch and
Three GLTFExporter/GLTFLoader. Blob FileReader is Node transport polyfill only;
DOM/File picker/object-manager boundary controlled. Material groups/names and world
matrix, one logical GLB object/multiple group slots, shared material/Nomad table,
Split groups, corner UV reconstruction/position correspondence, topology-gated Base
UV versus SubD/changed topology, real indexed UV reload, UV/tangent/color/morph seams
and accepted high-valence UV/tangent pole collapse covered. Colour/morph pole seams
stay split. Import report includes all current attribute counters. Metadata patch
retains opaque mesh/node/layer extras and two objects' binary image bytes/aligned
bufferViews/remapped texture/material references. No image decode/texture render or
rich native NOM passthrough claim. Other .547/.551/.552/.554/.555/.556 tests retained.

Real GLB round-trip reproduced groups Front/Back becoming one BoxLab Material label
before repair. Export already carries correct primitive extras.nomad.group and mesh
extras.nomad.groups; GLTFLoader puts these on geometry/node respectively. Existing
importedMeshes now reads valid integer primitive IDs and nearest named owner table,
labels that primitive's faces before existing merge/weld/quad pipeline. Malformed IDs
keep material fallback; ancestor tables supported. Actual binary round-trip now keeps
both names, one object and optional two split objects. Runtime edit confined to this
metadata hookup and importer797 stamp/pin; no geometry/export/selection rewrite.
Four whole-source in-memory GLB mutations reject lost group hookup, UV weld seam,
stale UV export and corrupted binary image bytes. Source files never mutated on disk.

56focusedPASS. Full local Node24:2125tests/2125PASS/0FAIL/0skip. All11 reviewed historical
failure identities removed, six new top-level regression tests added. No excluded/
skipped tests or blanket quarantine. First release check caught an accidental unchanged
Add UI repin; corrected to protected796, reviewed importer797 and shell/recovery797 only.
All other runtime hashes/pins, Multi1.0/Loop715, accepted Add795/796 and frozenBeta2–6
unchanged. Fresh chat next: .797 iPad GLB names/colours/Split and Rotate/history checks,
then scoped Bevel/Knife/Loop reliability. Zero automated failures is coverage evidence,
not a claim of all app behavior proven. Publication verification follows separately.

## .796 — Add+ unit insertion zone — 2026-10-10

User requests Add+ insertion within1×1×1 for similar Nomad scale. Audited existing
primitive factory/Text/Add creation and preview; factory defaults remain unchanged.
Original Add build now uniformly fits each fresh primitive/Text candidate into a
centred unit bounding cube (longest extent1, each coordinate within±0.5). Same build
feeds preview/counts and original Apply. Proportions/face cycles/vertex indices
preserved; no export scaling, imported/existing scene edits or alternate kernel.
Text thickness label becomes Relative thickness because complete word is fitted
uniformly. Small panel note explains unit bounds/proportions. Revolve/Sweep retain
original separate authoring owners and are outside this primitive/Text settings scope.
No claim of measured Nomad import scale parity; device transfer check pending.

Three new actual-helper/whole-Add tests cover18 density combinations, uniform pair
distances/topology/centred bounds, all six Apply paths plus Text and original scene
Undo/Redo; nonfinite/empty candidates refuse before mutation. Original .771 UI exact
Text thickness assertion reviewed for intentional fitted scale; factory/Text-core
absolute-thickness tests retained unchanged.37focusedPASS; full2119/2108PASS/11FAIL/
0skip, identical11 failure identities to795. Protected owners/frozen betas unchanged.
Shell/recovery796, Add UI796/new fit child796 reviewed; preview child795 and factory/
Text/font771 retained. .795/.794 user PASS not supplied; manual acceptance pending.
Next: unit-size/preview/Apply/Cancel/history and Nomad transfer feedback, then remaining
Rotate4/GLB7 audit and scoped Bevel/Knife/Loop reliability.

## .795 — Add+ live object previews — 2026-10-10

Requested live previews before insertion. Audited primitive-ui771/factory/Text771:
existing candidate generation/counts are authoritative; no preview existed. Added
presentation-only add-object-preview795 inside original top-centre settings panel.
Canvas projects actual candidate face cycles with shaded fill and polygon boundaries;
Pencil/finger drag rotates this isolated preview. X/Y and Low/Medium/High update it;
Text word/thickness/detail/depth bands update after original asynchronous font load.
No second modelling kernel, WebGL context, viewport event owner or scene insertion.
Original Apply factory/object selection/history stay authoritative. Preview never
adds history; Cancel/Escape/outside/Add-toggle/resize dispose resources/capture;
invalid candidates clear preview and original Apply remains disabled. Orthographic
painter preview is a topology inspection aid, not the Studio/WebGL renderer.

27 Add/factory/Text/preview checks PASS; four new tests execute actual Add controller
and projection against recorded Canvas calls, real factory/Text/Object history and
controlled DOM/manager. Covers polygon counts/finite projections, density/rotation,
Text readiness/invalid input, disposal/capture and preserved redo. No whole Safari
or device rendering proof; iPad visual/tactile acceptance pending. Full local Node24:
2116 tests / 2105 PASS / 11 FAIL / 0 skipped; failure identities exactly match794.
Release markers/recovery795, Add UI parent795 and new child795 reviewed; other
runtime hashes/pins, protected Multi1.0/Loop715 and frozenBeta2–6 unchanged.
.794 user PASS not supplied; its manual checks remain pending. Next: user preview
feedback, then remaining Rotate4/GLB7 audit and scoped Bevel/Knife/Loop reliability.

## .794 — Mode dock / File / VIEW layout contract validation — 2026-10-10

User .793 PASS recorded/protected: Facegroups first activation/Studio switch,
SubD/Mirror colours and selection/navigation/history. Parent main
`4c76dbb04ccf1df548e730359aad6f39e1abef69`.
Audit .557/.342/.467 failures against current topbar734 and VIEW owner732.
Mode dock CSS lives in topbar owner, not retired styles557 comment/fixed dock.
File no longer has command bar: local summary-relative top and topbar-height bound.
VIEW scroll bound uses current topbar-height variable, not historical fixed118px.
No broad UI restoration or layout implementation change needed.

Reuse .791 ordered DOM adapter; execute whole topbar owner with imported toolbar/
selection installers as controlled adapters. Original mode nodes/listeners retained
through repeated docking/icon setup, command row removed, titles/aria labels intact.
Execute actual VIEW style construction block; inspect exact emitted selector
property blocks in source order for base/narrow media rules. Dock absolute within
viewport, safe-area left offsets and protected status-lane clearance27/25px;
File relative placement, height bound, internal scrolling and narrow width;
VIEW base/narrow bounds, scroll containment/touch momentum/pan-y and widths.
This is emitted stylesheet contract coverage, not computed cascade/layout engine,
full VIEW UI or Safari/device evidence. Original shell/mode IDs, Face stable-row/
Duplicate and loading/protected-pin checks retained. Four in-memory mutations reject
lost docking/status clearance, removed File scrolling and retired VIEW bound.

48focusedPASS including File interactions, Face layout, Facegroups ownership,
accepted picking/clean negative Extrude and release contracts. FullNode24:2112tests/
2101PASS/11FAIL/0skip; exactly three reviewed failures removed from793, none new.
All remaining11source-pattern checks active, no skips/exclusions/CI gate. All runtime
sources/hashes/modelling pins and frozenBeta2–6 unchanged. Shell/recovery794 and
exactly two reviewed recovery URLs refreshed; accepted UI791/main/Face/Vertex786,
Sweep789/Revolve788/Through779/Multi1.0/Loop715 retained. Publication/Node22/live verified below. Next: audit remaining component Rotate4 and Nomad GLB7 checks,
then scoped Bevel/Knife/Loop reliability. Manual: confirm794; mode buttons work;
File and VIEW open/scroll to lower controls, then return to modelling/navigation.

## .793 — Facegroups render ownership / retry validation — 2026-10-10

User .792 PASS recorded/protected: Shell/Solidify Apply/Cancel/history and navigation/
selection; prior accepted owners retained. Parent main
`304e370ba26d59dbf948f9eb7a6e44f1eb3aa133`.
Audit .456/.457/.459 failures against actual render owner and accepted .458/.460
history: bounded pending-state retry replaced fixed two-frame delay, and SubD was
later restored before Mirror. Source lookup evaluates bridge/object mesh instead
of returning it directly. Reconcile exactly these three earlier checks; retain
split-import default/wiring, other material fallback assertions and existing Mirror,
SubD, pending-state tests. Replace retired .456 hard pins with reviewed current assets.

Execute original render-owner lookup/evaluation/apply/entry/retry functions with
actual Three scene/bodies/materials, EditableMesh, SubD/Mirror and colour core.
Active body uses bridge mesh even when manager mesh differs; inactive uses its own
object ID, missing source returns null, metadata fallback retained. Real evaluated
SubD2→Mirror output equals expected geometry/groups, source remains unchanged,
actual colour application installs complete attributes/material and clears pending.
Evaluation call instrumentation delegates to actual kernels, not substitutes.

Controlled frame/DOM/Studio/UI callbacks isolate render ownership, not full module
startup/prototype hook/WebGL/browser/device. Invalid geometry on first two frames
keeps pending normal material; third-frame readiness applies colours and stops retry.
Entry normalizes settings/rebuilds; queued retry yields after switching look. Three
in-memory mutations reject stale manager source, reversed evaluation order and
one-frame-only retry. Runtime source never written; no new rendering/modelling owner.

42focusedPASS including original colour/core/SubD/Mirror, Shell/Solidify rollback,
accepted picking/clean negative Extrude and release contracts. FullNode24:2108tests/
2094PASS/14FAIL/0skip; exactly three reviewed failures removed from792, none new.
Remaining13source-pattern/1version-pin active, no skips/exclusions/CI gate. All runtime
sources/hashes/modelling pins and frozenBeta2–6 unchanged. Shell/recovery793 and
exactly two reviewed recovery URLs refreshed. Shared UI791, main/Face/Vertex786,
Sweep789/Revolve788/Through779/Multi1.0/Loop715 retained. Publication/Node22/live verified below. Next: audit remaining14 historical checks, then scoped Bevel/
Knife/Loop reliability. Manual: grouped object → VIEW Facegroups, first activation/
Studio switch; SubD and Mirror retain expected colours; selection/navigation/history.

## .792 — Shell / Solidify Facegroup contract validation — 2026-10-10

User .791 PASS recorded/protected: Face settings/Done, normal selection/modelling/
history and late Join ordering; prior accepted owners retained. Parent main
`175f32b50bde02723156a2ade1b1eb0b3c77ed61`.
Audit remaining .464 recovery and .465 Shell source prohibitions against current
whole cores and DEV_HISTORY .464→.465→.466. Historical recovery temporarily removed
metadata; later separately accepted builds restored Solidify then Shell labels.
Do not roll back accepted propagation to satisfy the earlier no-assignment tests.
Replace exactly those two failed checks with actual current geometry/provenance.
Original .465 Solidify test and .462/.466 propagation/core tests retained.

Actual cores with real Three/EditableMesh: two-quad Solidify retains source cycles,
reversed offset inner cycles, source/inner labels and crease copies, ungrouped six
boundary walls and watertightness. One- and connected two-Face Shell openings retain
compacted source cycles and correctly paired outer/inner labels, remove opening
label, retain null labels and keep generated walls ungrouped. Duplicate selected
IDs do not remove extra faces. Real mesh History snapshot Undo/Redo preserves exact
geometry/groups/creases; this is mesh serialization, not tool-session history wiring.
Existing session/preview tests remain separate. No browser/device/render proof.

Zero/nonfinite thickness refuses without mutation. Controlled one-time edge-cache
exception after geometry mutation exercises actual core catch/rollback; geometry,
complete label arrays and creases restored. Three whole-core in-memory mutations
reject dropped Shell copy labels, grouped Solidify walls and missing label rollback.
Dependencies stay actual; source files never changed. One initial normalized snapshot
hid extraneous post-failure labels; corrected test compares complete arrays and now
rejects that mutation. No production behavior changed to satisfy assertions.

71focusedPASS including actual cores, mirrored Solidify, original sessions, accepted
picking/negative Extrude and Face layout mutation checks. FullNode24:2104tests/
2087PASS/17FAIL/0skip; exactly two reviewed failures removed from791, none new.
Remaining16source-pattern/1version-pin active; no skips/exclusions/CI gate. All runtime
sources/hashes/modelling pins, Multi1.0/Loop715 and frozenBeta2–6 unchanged. Shell
markers/recovery792 and exactly two reviewed recovery URLs refreshed; shared UI791,
main/Face/Vertex786, Sweep789/Revolve788 and Through779 retained. Publication/Node22/live verified below. Next: audit remaining17 historical checks, then scoped
Bevel/Knife/Loop reliability. Manual: confirm792; grouped Shell Apply/Cancel/Undo/Redo;
Solidify on an open mesh, Apply/Cancel and Undo/Redo; normal navigation/selection.

## .791 — Face layout ownership and late Join ordering — 2026-10-10

User .790 PASS recorded/protected: Edge Bevel settings, Apply/Cancel and history;
prior Sweep789/Revolve788/picking786 accepted. Parent main
`c851cf8182f2ca57f2542ef76170a17f62f14bd2`.
Audit .503–.506 failures against shared Face layout and Join placement owners.
Current layout is six compact rows, with Value/readout/Repeat under Extrude row
and Inspect/Repair/Topology Gate at true drawer bottom. Historical three-row IDs,
old diagnostics insertion and Join's former loader are retired. Join actually loads
through drawer-ui, not face-workflow-layout; retain reviewed actual loading coverage.

Ordered DOM adapter extracted from .790 Edge fixture and reused, retaining Edge
behavior checks. Execute actual Face layout functions/startup/event callbacks and
original Join placement function; late contextual/diagnostic/Join nodes arrive after
initial layout. Reproduced real defect before repair: late Join appends behind Bridge
and Sweep and parent-only synchronization leaves wrong order. Existing shared owner
now restores only this row's declared Join/Bridge/Sweep order when needed. Original
nodes/listeners remain intact; no new UI, modelling kernel or Join geometry changes.

Seven retired historical checks replaced with current owner behavior: six rows/
contents/widths, Extrude anchor despite earlier action row, immediate contextual
order, true diagnostic bottom after extra late nodes, repeated Join relocation/
listener preservation and original node identity. Four in-memory mutations reject
missing row ordering, Repeat placement, bottom diagnostics and wrong Join row.
Controlled DOM/function slices, not full browser/CSS/Safari or actual Join geometry.
Other historical CSS/pin/source checks retained. Two formerly passing .406/.418
hard732 loader assertions updated to reviewed reference/order after legitimate UI
cache hop; Array/runtime behavior assertions retained.

124focusedPASS including Edge precision, accepted Face Bevel/picking, supplied
negative Extrude, Bevel chains, Knife/Loop and Sweep Cancel/history. FullNode24:
2100tests/2081PASS/19FAIL/0skip; exactly seven reviewed failures removed from790,
no new identities. Remaining18source-pattern/1version-pin checks active; no skips,
exclusions or CI gate. Runtime change only six lines in shared Face layout;
main/Face/Vertex786, Sweep789/Revolve788/Through779/Multi1.0/Loop715/frozenBeta2–6
unchanged. Shared UI direct shell pin732→791/hash reviewed; Edge internal layout
stamp515 unchanged. Shell/recovery791 and two reviewed recovery URLs refreshed.
Publication/Node22/live verified below. Next: audit remaining19 historical
checks, then scoped Bevel/Knife/Loop reliability. Manual: confirm791; Face Extrude/
Inset settings and Done; ordinary selection/modelling/Undo/Redo. Optionally disable
Focus and check Join/Bridge/Sweep order in Face drawer after reload/mode switch.

## .790 — Current Edge layout and Bevel precision validation — 2026-10-10

User .789 PASS recorded/protected: Sweep Cancel/Redo, Apply/history and selection/
navigation; prior Revolve788 and picking786 accepted. Parent main
`a30f29f4ace104a6b82503fc9d65433c94d60a7d`.
Audit .472 obsolete Slide anchor, .508 compact rows, current precision710/shared
layout515 and accepted radial Bevel owner. Current precision places Edge Exact
inside Bevel options after Segments; current final three-column row includes Circle.
Replace only those two historical source expectations with actual current owners.
No runtime/UI implementation change, broad layout restoration or modelling kernel.

Ordered DOM adapter models node moves and sibling order, executes whole precision
owner and original shared Edge layout functions/timers. Five three-column rows,
Circle and original button identities survive repeated synchronization; contextual
Loop/Slide/Bevel/Offset blocks retain actual order. Exact placement tested with0/1/2
existing range rows, original input/Apply listeners survive layout passes, physical
press captures deduplicated IDs before selection changes, Apply delegates numeric
value/IDs to existing direct owner. Invalid value refuses delegation. Actual bevel
controller is an explicit call adapter here; adjacent real geometry/history tests
remain unchanged. Not a CSS/layout engine, renderer or Safari device proof. Original
.472 Sweep declarations/pins and .508 progressive CSS/protected pin checks retained.
Two in-memory mutations reject omitted Circle and unrepositioned Exact controls.

114focusedPASS including actual Edge/Face Bevel ownership, clean chain/Knife/Loop
combinations, accepted Sweep cancellation/picking and release contracts.
FullNode24:2096tests/2070PASS/26FAIL/0skip; exactly reviewed .472/.508 failures removed
from789, no new identities. Remaining25source-pattern/1version-pin active; no skips/
exclusions. Runtime/frozenBeta2–6 unchanged. Shell/recovery790 only; exactly two
reviewed recovery URLs updated, all hashes and modelling pins retained. Publication/
Node22/live verified below. Next: audit remaining26 checks, then scoped Bevel/Knife/Loop reliability.
Manual: confirm790; Edge radial Bevel Width/Segments and Apply/Cancel sanity, then
Undo/Redo. No manual recreation of synthetic node-order fixtures requested.

## .789 — Sweep Cancel history tokens and editing ownership — 2026-10-10

User .788 PASS recorded/protected: Revolve Cancel/Redo, authoring/Edit/Apply/history
and selection/navigation. Parent main `4b22766cf8c760cc401f9db7f58b8a4f02bf1487`.
Audit existing Sweep731 transaction, actual object-history checkpoint bridge,
.469 recovery and current transform-upgrade editing getter. Whole Sweep reproduces
wrong evicted undo token before repair; code also clears redo at creation then
restores lengths only, as in prior Revolve incident. Existing transaction now saves
both token arrays and restores entries in place on Cancel. Same tokens preserve
WeakMap scene tags; Apply discards rollback entries. No new history/modelling owner.

Extract existing .788 controlled construction/manager/session fixture to shared
helper; Revolve retains all test bodies and its own whole owner wrapper. Whole
Sweep uses real Three/core/mesh/History and actual object-management history bridge;
scene capture/restore and shared host remain controlled adapters. Cancellation
protects original scene, redo, evicted undo, controls and duplicate completion;
real tagged redo restores future scene. Competing session exit restores history
without ending new Array session. Incomplete path refusal preserves current stacks;
valid seeded path uses original core, commits/selects result and Undo/Redo. Cancel
after Apply does not undo committed geometry/history. No device propagation claim.

One failing .400 test calls an obsolete editing method; current API is a boolean
getter. Execute actual transform startGesture/beginGizmoGesture entrypoints against
real whole Sweep profile/path button transitions. Editing rejects both before
transform preflight; nonediting reaches preflight sentinel. Mutation omitting guard
fails. Two history mutations reject length-only undo/redo restoration. Existing
other .400 checks retained. Update .472 declaration check for repaired array names;
its unrelated Edge precision anchor failure remains active. Two formerly passing
.393/.394 hard731 pin checks legitimately fail on reviewed cache hop: use reviewed
asset contract, preserving Add/runtime/source stamp and other behavior assertions.

121focusedPASS. FullNode24:2094tests/2066PASS/28FAIL/0skip; exactly obsolete .400
failure removed from788, no new identities. Remaining27source-pattern/1version-pin
active, no skips/exclusions. Only runtime change Sweep Cancel stacks/stamp789;
geometry/authoring/stages and transform implementation unchanged. Accepted Revolve788,
main/Vertex/Face786, Through779, Multi1.0/Loop715/frozenBeta2–6 unchanged. Shell/recovery789
and Sweep URL/hash/stamp reviewed; recovery hashes retained. Publication/Node22/live verified below.
Next: remaining28 historical checks, then scoped Bevel/Knife/Loop reliability.
Manual: edit then Undo; Add Sweep, Cancel, then Redo restores edit. Reopen Sweep,
choose profile/draw simple path, Apply and Undo/Redo. Selection/navigation sanity.

## .788 — Revolve launch contract and Cancel history repair — 2026-10-10

User .787 PASS recorded/protected: Edge repeated Y pulls, fresh Free/Plane session,
history/navigation. .786 Vertex/Face picking and accepted Edge remain protected.
Parent main `43889bf279386791f74c19f9416c26e3229e06d1`.
Audit current Revolve owner469/517 recovery/defaults, .389/.422 history and existing
.469/.517 tests. The two failing checks expect retired hidden launcher and Edit-off
creation; current launcher is always available and new construction starts editing.
Reconcile these two only, preserving all other historical assertions and core tests.

Behavior audit also reproduced a real Cancel bug: profile creation checkpoints
through actual object-history bridge and History.push clears redo or evicts oldest
undo at the limit. Original Cancel restored stack lengths only, yielding missing
redo tokens/wrong undo tokens. Existing Revolve transaction now retains shallow
copies of both stacks and restores entries in place on Cancel. Original token
identities preserve bridge WeakMap scene metadata. Apply drops saved rollback
entries through original completion listener. No new history owner or geometry
kernel; no Sweep/general-session rewrite. Revolve owner stamp/cache pin788 reviewed.

Reuse controlled DOM/dispatch/camera fixture with whole Revolve owner and real
Three/core/mesh/History; execute actual object-management installHistoryBridge with
controlled scene capture/restore, manager and shared-session boundary. Launcher
creates/reuses/cancels/restarts. Creation starts Edit, touch yields, Pencil authors
plane UV; Edit-off yields and reposition keeps UV; Apply selection/mesh and one
history step plus Undo/Redo verified. Mesh.clone normalizes missing group slots to
null for history equality; no Facegroup behavior changed. Cancel restores original
scene and exact redo/evicted undo tokens. Real bridge tagged redo restores future
scene after Cancel. Four mutations reject hidden launcher/Edit-off creation and
length-only undo/redo restoration. Not whole Safari, Object manager or shared-session
host execution; controlled adapters are explicit.

88focusedPASS. FullNode24:2087tests/2058PASS/29FAIL/0skip; exactly two reviewed .389/
.422 failures removed from787, no new identities. Remaining28source-pattern/1version-
pin stay active. Only runtime change is Revolve Cancel stacks/stamp; geometry,
launcher/Edit defaults, existing transforms and frozenBeta2–6 unchanged. Main/Face/
Vertex assist786, Through779/Multi1.0/Loop715 retained. Shell/recovery788, reviewed
Revolve URL/hash/stamp and two recovery URLs refreshed. Publication/Node22/live verified below.
Next: audit remaining29 checks, then scoped Bevel/Knife/Loop reliability. Other
session Cancel length-only approaches (e.g. Sweep) require separate owner audit;
do not infer their safety from this Revolve fix.
Manual: create an undoable edit then Undo; open Revolve Profile, Cancel, Redo must
restore prior edit. Reopen, author simple profile, switch Edit off/on, Apply then
Undo/Redo. Confirm existing component selection/navigation remains intact.

## .787 — Edge Extrude repeated-constraint validation — 2026-10-10

User .786 PASS recorded/protected: assisted Vertex additive/deselect and native
front Face taps accepted; Edge acceptance retained. Parent main
`d567a4a0b61092d752be9eca6bfe1870190b0421`.
Audit .510 failing repeated-pull assertion against original Edge759 owner and
shared .759 parity fixture. Its source slice ends at the first precision query,
which now precedes setArmed, yielding empty text. Actual first-arm default and
idempotent commit rearm already preserve later user-selected constraints.
No runtime implementation change needed.

Extract original whole-Edge/native-line fixture into shared helper, retaining all
10 .759 test bodies. Replace only the obsolete .510 slice with two actual Pencil
pulls using Y, verifying two ribbons/history steps, persistent arm/direction,
retired drag, cancellation restoring geometry/redo and released capture. An
idempotent rearm retains Y; Done followed by new session restores Plane. Mutation
resetting Plane on every arm fails at first commit. Controlled DOM/dispatch and
transform-arming adapter with real Three/mesh/history; not full Safari integration.
Other .510 source/pin checks retained, no skips or excluded failures.

67focusedPASS. FullNode24:2082tests/2051PASS/31FAIL/0skip; exactly reviewed .510
failure removed from786, no new identities. Remaining30source-pattern/1version-pin
checks stay active. Runtime/frozenBeta2–6 untouched; main/Vertex assist/Face786,
Through779/Multi1.0/Loop715 and all modelling pins/hashes retained. Shell/recovery787
and exactly two reviewed recovery URLs updated. Publication/Node22/live verified below.
Next: audit remaining31 historical checks, then scoped Bevel/Knife/Loop reliability.
Manual: confirm787; Edge Extrude choose Y and pull twice; Done/reopen and check Free
(Plane default); selection/Undo/Redo/navigation quick sanity.

## .786 — Assisted Vertex ownership and front Face taps — 2026-10-10

User .785 FAIL: Vertex additive taps sometimes clear prior selection/deselect wrong
vertex; Face taps sometimes select rear faces; Edge explicitly performs well and
is protected. Last whole-build user PASS remains .784. Parent main `8637d16da0f7e089b0be3887234dd783787eae4d`.
Audit actual main window background classifier, rendered-marker Vertex assist,
armed Face selected-priority/sequential path, native main raycasts and UI owners.
.785 seeded intent tests did not cover assist/background mismatch or hidden markers.
Three new runtime reproductions fail before fixes; do not equate historical regex
failure counts with product reliability or mark .785 device accepted.

Existing Vertex assist exports its guarded physical pick policy. Main's earlier
window background classifier consults that same owner before strict marker raycast,
so22px assisted taps do not arm background-clear ahead of document completion.
Assist filters invisible ancestors, clipped markers and candidates outside22px,
then rejects markers occluded by same-parent rendered body using a separate centre
ray and bounded distance tolerance. Loose scaffolds without body remain pickable;
existing additive toggle, transform/direct-tool guards and tap/move thresholds kept.
Occlusion applies to normal assisted taps, not deliberate Lasso/Through selection.
No new pointer listener/modelling kernel; visibility uses rendered marker positions.

Armed Face controller records physical native primary separately from modelling
hit. Tap completion toggles native front Face; selected-hit priority and scoped
single-Extrude continuation still route deliberate modelling drags exactly as before.
Synthetic Exact, Cancel, working sets and geometry kernels remain unchanged.
This fixes armed Face rear-selection/continuation overrides; ordinary unarmed native
Face picking already chooses nearest. No new screen polygon picker or global culling.

Real markers/body/raycasts, main window classifier and whole Vertex assist reproduce
add/remove at8px outside marker while retaining prior selection/history. Hidden rear
marker at pointer centre cannot steal nearby visible front vertex. Whole Face plus
actual main cube raycasts protects selected rear/single/multi tap add/remove and
post-Extrude continuation tap. Three mutations reject reinstated background clear,
hidden-marker acceptance and rear tap routing. Controlled DOM/dispatch/renderer;
on-device tap accuracy still requires user retest. Original .490 cancellation
mutation adapted to inserted comment; all other mutation checks retained.

267clean-focusedPASS (Vertex tools/picking, Face/native/negative cuts, Pencil/floating
Edge/background and release). Broader focused547/536PASS/11existingFAIL, all active.
FullNode24:2081tests/2049PASS/32FAIL/0skip; exactly same32identities as785, no new
failures. Runtime edits only main background branch, Vertex assist and Face tap-hit
record/finish. Shell/recovery786; three changed runtime module pins/hashes and two
recovery URLs reviewed. Through779/Inset753, Edge owners, Multi1.0/Loop715 and
frozenBeta2–6 unchanged. Publication/Node22/live verified below; .786 user retest pending.
Next: obtain Vertex/Face acceptance before remaining32 historical check review.
Manual: confirm786; select several front Vertices and tap one off (also just outside
dot); orbit then repeat; front Face taps with Extrude/Inset armed while other Faces
selected; normal Face/Edge selection, negative Extrude/Undo/Redo/navigation.

## .785 — Main selection navigation and tap completion validation — 2026-10-10

User .784 PASS recorded/protected. Parent main `973d8fc44fbad313359338553c7e37e58a9fb3c8`.
Audit main762 background movement/hold/confirmed tap owners and componentTapIntent
against historical navigation/unified-toggle assertions. Three failures demand
retired source spelling or old endDrag tapHit dispatch. Replace exactly those three
with actual current owner behavior; keep other source/pin checks and all original
.720 native-owner test bodies. No implementation changes or skipped checks.

Extract original .720 native background fixture into shared helper; actual main
window movement listener replaces previously manufactured movement code. Vertex,
Edge and Face retain selection on navigation, moving away/back, diagonal/exact8px
threshold, cancellation, second contact and movement only at release. Confirmed
short blank tap clears once, disarms Lasso and duplicate native/semantic release
is inert. Existing .724 hold-invert, exclusions and session lifecycle tests retained.
Execute actual main component tap-intent release/cancel, toggleSelection and endDrag
listeners with seeded press intent, real EditableMesh/History and controlled selection/
render dependencies. Each component mode toggles only intended selected ID, ignores
wrong pointer until matching release and protects cancel/long/moved/cancelled intent.
Release retires drag/intent, restores controls, tap releases capture, geometry/history/
redo unchanged and duplicate completion inert. Not full down/move/hold arbitration,
whole renderer or Safari propagation proof; original down-source assertion retained.
Three in-memory mutations rejected: lost navigation flag, absent toggle, premature
blank completion. Runtime source never written; no parallel pointer/modelling owner.

110focusedPASS including background/Lasso/session, Pencil/floating Edge and release
contracts. Full Node24:2077tests/2045PASS/32FAIL/0skip; exactly three reviewed .784
failures removed, no new identities. Remaining31source-pattern/1version-pin stay
active; no exclusions/skips/CI gate. Runtime/frozenBeta2–6 unchanged. Shell/recovery785
and only two reviewed recovery URLs refreshed; all source hashes retained. Protected
main762/Face+Through779/Inset753/Debug736/Multi1.0/Loop715 retained.
Publication/Node22/live verified below; .785 hands-on sanity pending.
Next: remaining32 checks and scoped Bevel/Knife/Loop reliability. Add Vertex picking,
NOM import and Lasso tightening deferred.
Manual: confirm785; selected Face/Edge/Vertex tap removes just that selection;
background orbit/pan/pinch preserve selection; short blank tap clears; model then
Undo/Redo. No synthetic timing fixture recreation requested.

## .784 — Face Deselect and contextual session-exit validation — 2026-10-10

User .783 PASS recorded and protected. Parent main `bcbcf487b58bb7d3a75d29fe1e4b5dd44e4ac1c2`.
Audit current main762 Deselect listener, Face779 controller, contextual Face value
session732 and semantic background policy759 against .496 and accepted .699/.700.
The one failing .496 assertion demands a retired direct-controller Deselect hook.
Current main owns Deselect; contextual Done/background own session completion.
Replace only that obsolete assertion with connected owner behavior; retain the
original selected-aware hit-stack and reviewed/protected pin checks unchanged.

Execute actual main Deselect listener with the existing whole Face fixture and
controlled selection/render dependencies. Both Extrude/Inset restart after repeated
Deselect without rearming, geometry changes or history/redo loss. Connect unchanged
whole contextual value session and background policy to that same Face controller.
Done and semantic background taps refuse closure during a real active drag; after
pointer Cancel they disarm direct/Repeat, hide panel, preserve selection and emit
exactly one completion. Duplicate exits are inert; retired direct controller no
longer consumes Face taps. Three in-memory mutations rejected with assertion errors:
missing main clear, missing direct disarm and missing active-drag guard. No runtime
source writes, parallel modelling owner or Safari/whole-renderer propagation claim.

Initial .496:3 checks/2PASS/1FAIL; revised5PASS. Focused97PASS including contextual
session/background ownership, native picking, supplied negative Extrude fixtures and
release contracts. Full Node24:2076tests/2041PASS/35FAIL/0skip; exactly the reviewed
.496 failure removed from783, no new identities. Remaining34source-pattern/1version-
pin checks stay active; no exclusions/skips/CI gate. Runtime/frozenBeta2–6 unchanged.
Shell/recovery784 and exactly two reviewed recovery URLs refreshed; all asset hashes,
main762/Face+Through779/Inset753/Debug736/Multi1.0/Loop715 retained.
Publication/Node22/live verified below; .784 hands-on sanity pending.
Next: remaining35 checks and scoped Bevel/Knife/Loop reliability; Add Vertex picking,
NOM import and Lasso tightening deferred.
Manual: confirm784; radial Extrude then SELECT Deselect and fresh Face selection;
repeat with Inset; Done/background returns puck; model and Undo/Redo/navigation.

## .783 — Native Face picking across cube viewpoints — 2026-10-10

User .782 PASS recorded. Parent main36e11eca8c2811bc6721536d11521c8d8a2bf484.
Audit .498 projected-polygon experiment, .499 removal and accepted .534/.535.
Four failures demand retired screen polygon/back-facing candidate/depth-sort picker
or prohibit later scoped hit-stack continuation. Reconcile those four with existing
native integration/selected priority/sequential scope; retain original tap/drag/pin
check. Separate .496 Deselect workaround failure remains active; requires session-exit
owner audit, not assumed obsolete picking behavior.

Extend shared whole-Face/native-main fixture with six axis viewpoints and real cube
fan meshes, shared perspective camera/viewport rectangle. Both Extrude/Inset choose
camera-side cap for empty selection, nearest raw hit even though far shell is present
in distance-ordered stack. Actual press uses that cap/one-Face working set, release
toggles once, retains geometry/history/redo and retires ownership. Reuse selected/
multi working set and properly scoped continuation checks. One shared face-mesh builder
serves existing native integration and new viewpoint checks; no parallel runtime owner.
Two in-memory mutations rejected: wrong pointer coordinates and farthest primary.
Controlled DOM/selection/render/events; not whole renderer/Safari propagation or a
new blanket back-face culling promise. Current native owner semantics remain intact.

Initial5checks/1PASS/4FAIL; revised6PASS.131focusedPASS including current diagnostics,
native integration/targeting and .742/.750/.751/.779 supplied clean-negative/Through
fixtures. FullNode24:2074tests/2038PASS/36FAIL/0skip; exactly four reviewed782 failures
removed, no new identities. Remaining35source-pattern/1version-pin active; no skips/
exclusions/CI gate. Runtime/frozenBeta2–6 unchanged; shell/recovery783 and only two
reviewed recovery fixture URLs, all hashes retained. Face+Through779/main762/Inset753/
Debug736/Multi1.0/Loop715 protected. Publication/Node22/live verified below; .783 device sanity
pending. Next remaining36 checks and scoped Bevel/Knife/Loop reliability.
Add Vertex/NOM import/Lasso tightening deferred.
Manual: confirm783; orbit to another side and tap Faces with Extrude/Inset armed;
model then Undo/Redo and normal navigation.

## Accepted .779 clean negative Extrude

User awesome fix/PASS. Existing Through kernel conforms private cutter partition
seams and cancels reversed internal edges for one convex area-preserving union per
component. Holes/branches/concave cases retain prior conservative merger; bound256.
Canonical assembly retains required neighbour seams. Exact before/after fixtures
negative-extrude-779-*.obj retained: source106verts110quads, prior149verts123faces,
fixed110verts114faces with one quad cap/four walls.13newchecks protect five depths,
rotated source, groups/crease, untouched faces, physical/Exact/replay/history/Cancel.
No global dissolve/flattening. Selected sources planar/convex; closed oriented input.

## Add+ / Text baseline — .771

Original primitive-ui/factory owners extended with top-centre X/Y density settings
for six primitives, presets, actual counts and Apply/Cancel. Cube grids weld
boundaries; Cylinder/Cone caps remain n-gons with Y height bands. Text uses bundled
licensed Helvetiker Regular/Three Font + ShapeUtils: word1–64, thickness0.01–100,
curve detail1–16, depth bands1–32. All letters/dots form one ordinary editable mesh,
holes preserved, centredXY/extrudedZ. Unsupported glyphs/blank/bad thickness refuse;
async completion ignores cancelled/replaced panels. Not editable typography; .795 adds an isolated rotatable preview in the settings panel. Original object creation/history one-step Undo/Redo,
Sweep/Revolve routes retained.23newchecks/55focusedPASS plus temporary real-DOM
layout/history smoke. Whole-app WebGL/browser QA unavailable (Chromium absent and
download failed); separate .771 device acceptance not explicitly recorded here.

## Next task / outstanding issues

.796 whole-build user PASS protects Add+ previews/unit fit, Text, lifecycle/history.
.797 awaits iPad: GLB grouped-object export/import retains names/colours as one object,
Split groups remains optional; component gizmo Rotate and Undo/Redo unchanged.
Full current suite2125/2125PASS/0FAIL/0skip; no historical tests suppressed. Next scoped
Bevel/Knife/Loop reliability audit using actual cases; avoid speculative kernel changes.
.794 File/VIEW manual gate remains separately pending. NOM import/Lasso deferred;
frozen betas immutable. Node transport/controlled DOM do not prove Safari or textures.

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
Current recovery797; importer797; shared Tool Session UI791; Sweep789; Revolve Profile788; Add UI/fit796; preview795; factory/Text/font771; direct-Bevel769; direct-Vertex-Bevel767; Gate766; Knife763;
main786(background-only); Vertex assist786; scaffold-helper761; Drawer/Lasso760; shared Vertex/Edge Extrude/total-gizmo/
background759; Vertex Extrude/core752; Vertex kernels/bootstrap/Inset753; Face direct786(tap-only);
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
real-group preservation. Current .797 suite has zero failures; historical audit remains recorded for provenance.


### .783 publication verification — 2026-10-10

Published release commit `30e2a9f0af57222ea24b27fb960cf486dac2f07d`, tree
`9ef9c75b66c2456700cd3980d54ff4490b834bf0`. Pages run `38015557953`
completed successfully. Topology CI run `38015558359`, job `114104912894`,
completed with the expected active inventory: 2074 tests / 2038 PASS / 36 FAIL /
0 skipped. All 36 failure identities match `docs/reliability-build-783.json`;
four .782 failures removed and no new failures. Focused validation: 131 PASS.
Fresh live `index.html`, `version.json`, `src/main.js`,
`src/multi-face-direct.js`, and `beta-6/version.json` match repository bytes.
Runtime owners and protected pins unchanged. User accepted .782; .783 device
sanity remains pending.


### .784 publication verification — 2026-10-10

Release commit `1ed2807186c94684ff088a6ecdb1955f5f4dacc1`, tree
`f05d5abf98191f9cb1e43a265e27c106480227f8` exactly matches tested checkout.
Actual Node22 Topology run38017194089/job114109994738:2076tests/2041PASS/35FAIL/
0skip; all35failure identities exactly match docs/reliability-build-784.json.
Pages run38017193466 completed successfully.97focusedPASS. Runtime and frozenBeta
unchanged; .783 user PASS protected; .784 device sanity pending.
Fresh live index.html/version.json byte-match .784 repository. Unchanged main762,
Face779 and frozenBeta6 version also byte-match live. Shell markers/recovery784
coherent; reviewed runtime pins and hashes retained.


### .785 publication verification — 2026-10-10

Release commit `4437ecb4ab9e8223260b912163ee1310a2761732`, tree
`e5aadf925fe9b39f57d9a00f32899a24b11f8f23` exactly matches tested checkout.
Actual Node22 Topology run38018332508/job114113537665:2077tests/2045PASS/32FAIL/
0skip; all32failure identities exactly match docs/reliability-build-785.json.
Pages run38018332469 succeeded. Fresh live index.html/version.json byte-match785;
unchanged main762/Face779 and frozenBeta6 version also match live repository bytes.
110focusedPASS; source/frozenBeta unchanged. .784 user PASS protected; .785 device
sanity pending. Shell markers/recovery785 coherent, original modelling pins retained.


### .786 publication verification — 2026-10-10

Release commit `d1bef467466ac66e08433e412686a399c8473f4a`, tree
`bec9f248300ac1fcad0deaaf3b931d732fc7e190` exactly matches tested checkout.
Actual Node22 Topology run38019322721/job114116561321:2081tests/2049PASS/32FAIL/
0skip; all32failure identities exactly match docs/reliability-build-786.json.
Pages run38019322728 succeeded. Fresh live index/version and changed main786/
Face786/Vertex assist786 byte-match repository. Through779, protected Multi1.0 and
frozenBeta6 version also match live repository bytes.267clean-focusedPASS; broader
547/536PASS/11existingFAIL retained. .785 device FAIL and Edge acceptance recorded;
.786 user retest pending. Shell/recovery and reviewed runtime module pins verified.


### .787 publication verification — 2026-10-10

Release commit `503d4c3825bddaf190f5e4bffe11ce8e83146b1b`, tree
`a961927d5c843dcabdecb09a5c201e204310a78b` exactly matches tested checkout.
Actual Node22 Topology run38020165850/job114119194349:2082tests/2051PASS/31FAIL/
0skip; all31failure identities exactly match docs/reliability-build-787.json.
Pages run38020165585 succeeded. Fresh live index/version match787; unchanged
main/Face/Vertex assist786, Edge759, Through779, protected Multi1.0 and frozenBeta6
version byte-match repository.67focusedPASS. .786 user PASS recorded/protected;
.787 narrow device sanity pending. Shell/recovery787 reviewed; runtime unchanged.


### .788 publication verification — 2026-10-10

Release commit `da4939dbcf70e426989f08face2ca3875cda48af`, tree
`8b5a81cbbd6b7379fed0a07426a8e8b372f6d8b9` exactly matches tested checkout.
Actual Node22 Topology run38028448281/job114144169023:2087tests/2058PASS/29FAIL/
0skip; all29failure identities exactly match docs/reliability-build-788.json.
Pages run38028447713 succeeded. Fresh live index/version/Revolve788 match repository;
accepted main/Vertex assist/Face786, Through779, protected Multi1.0 and frozenBeta6
version also byte-match live.88focusedPASS. .787 user PASS protected; .788 device
Cancel/Redo and profile authoring/Apply sanity pending. Reviewed shell/recovery788
and changed Revolve hash/stamp/pin verified; all other runtime owners untouched.


### .789 publication verification — 2026-10-10

Release commit `3d1683dce1f6fa275124aa4aece39009e196d8e0`, tree
`c78afd2b601e4a0d3fbffcf4a9069bf74ff93f4b` exactly matches tested checkout.
Actual Node22 Topology run38029040477/job114145919199:2094tests/2066PASS/28FAIL/
0skip; all28failure identities exactly match docs/reliability-build-789.json.
Pages run38029040178 succeeded. Fresh live index/version/Sweep789 byte-match;
accepted Revolve788/main/Vertex assist/Face786, Through779, protected Multi1.0 and
frozenBeta6 version byte-match repository and are unchanged from accepted parent.
121focusedPASS. .788 user PASS protected; .789 Sweep Cancel/Redo and Apply/history
sanity pending. Reviewed Sweep hash/stamp/pin and shell/recovery789 verified.


### .790 publication verification — 2026-10-10

Release commit `253afa3edf83b4aa890f43a6f2a8995fb0b3b06f`, tree
`55adf4d70903a25f0a058021116ddbc7ebeb28cd` exactly matches tested checkout.
Actual Node22 Topology run38029874102/job114148372358:2096tests/2070PASS/26FAIL/
0skip; all26failure identities exactly match docs/reliability-build-790.json.
Pages run38029873759 succeeded. Fresh live index/version byte-match790. Unchanged
precision/shared layout, Sweep789/Revolve788/main/Vertex assist/Face786, Through779,
protected Multi1.0 and frozenBeta6 version byte-match repository. No runtime/frozen
changes.114focusedPASS. .789 user PASS protected; .790 Edge Bevel UI/history sanity
pending. Shell/recovery790 and exactly two reviewed recovery URLs coherent.


### .791 publication verification — 2026-10-10

Release commit `f1d134e077726ae88da6a9e6a19644894d8853e8`, tree
`89ba5c3685e6e5cf9a71804e5e961df67d68a559` exactly matches tested checkout.
Actual Node22 Topology run38032058820/job114154883205:2100tests/2081PASS/19FAIL/
0skip; all19failure identities exactly match docs/reliability-build-791.json.
Pages run38032058768 succeeded. Fresh live index/version/shared UI791 byte-match
repository; accepted main/Face/Vertex786, Sweep789/Revolve788, Through779, protected
Multi1.0 and frozenBeta6 version byte-match unchanged repository bytes.124focused
PASS. .790 user PASS protected; .791 Face UI/history sanity pending. Shared UI
cache pin/hash and shell/recovery791 reviewed; no kernel or frozenBeta changes.


### .792 publication verification — 2026-10-10

Release commit `e1372c9cc2c379eb8a4f261fca1728517b318551`, tree
`c87dc4da613e0bb2941fec3a59ac1b50409259d6` exactly matches tested checkout.
Actual Node22 Topology run38033318243/job114158546682:2104tests/2087PASS/17FAIL/
0skip; all17failure identities exactly match docs/reliability-build-792.json.
Pages run38033318385 succeeded. Fresh live index/version byte-match792. Unchanged
Shell/Solidify cores, shared UI791/main/Face/Vertex786, Sweep789/Revolve788, Through779,
protected Multi1.0 and frozenBeta6 version all byte-match repository.71focusedPASS.
No runtime/frozenBeta changes. .791 user PASS protected; .792 Shell/Solidify device
sanity pending. Shell markers/recovery792 coherent; exactly two reviewed recovery
URLs changed with every runtime hash retained.


### .793 publication verification — 2026-10-10

Release commit `f098586bf7c2cf5eeb227d82cd408be294234714`, tree
`f8f3a85abfcc64caa9b53f57cd3e9d2d73fab958` exactly matches tested checkout.
Actual Node22 Topology run38034916611/job114163240465:2108tests/2094PASS/14FAIL/
0skip; all14failure identities exactly match docs/reliability-build-793.json.
Pages run38034916795 succeeded. Fresh live index/version byte-match793. Unchanged
render owner568/colour core547, shared UI791/main/Face/Vertex786, Sweep789/Revolve788,
Through779, protected Multi1.0 and frozenBeta6 version all byte-match repository.
42focusedPASS. .792 user PASS protected; .793 Facegroups device sanity pending.
No runtime/frozenBeta changes. Shell/recovery793 coherent; exactly two reviewed
recovery URLs changed, all runtime hashes retained.


### .794 publication verification — 2026-10-10

Release commit `4ae051d79fc855f0ab4e8224e0d4fb83770c3322`, tree
`4df564fce34f340b525fdcc8186825ebe6a0fd12` exactly matches tested checkout.
Actual Node22 Topology run38036208096/job114167039767:2112tests/2101PASS/11FAIL/
0skip; all11failure identities exactly match docs/reliability-build-794.json.
Pages run38036207720 succeeded. Fresh live index/version byte-match794. Unchanged
styles/topbar734/VIEW732, shared UI791/main/Face/Vertex786, Sweep789/Revolve788,
Through779, protected Multi1.0 and frozenBeta6 version byte-match repository.
48focusedPASS. .793 user PASS protected; .794 menus/modes device sanity pending.
No runtime/frozenBeta changes; shell/recovery794 coherent and exactly two reviewed
recovery URLs changed, all runtime hashes retained.


### .795 publication verification — 2026-10-10

Release `56f60d06263c53a2dd4bbd790e60599367349937`, tree
`ba0d059cef528827c68b07ebdc357060a972a61c` exactly matches tested checkout.
Pages38038583902 succeeded. Actual Node22 Topology38038584082/job114174121931:
2116tests/2105PASS/11FAIL/0skip; all11 names match local inventory and794.
34focusedPASS including seven release checks. Fresh live index/version/Add UI/
preview child byte-match main; protected Multi1.0 and frozenBeta6 version byte-match.
Device preview/gesture/render acceptance remains pending; no .794 PASS inferred.


### .796 publication verification — 2026-10-10

Release `ff1fe94ac4ef970dd5da400169f5de210ecd78af`, tree
`4c717f63aa0c9023dfe77c830d35074c4272c068` exactly matches tested checkout.
Pages38040570537 succeeded. Actual Node22 Topology38040570929/job114179817579:
2119tests/2108PASS/11FAIL/0skip; all11 identities match local and795.
37focusedPASS. Fresh live index/version/Add UI/fit child byte-match main;
protected Multi1.0 and frozenBeta6 version byte-match. iPad/Nomad acceptance pending.


### .797 publication verification — 2026-10-10

Release `7927b53ca1668bb114209457a981dc57a38d210e`, tree
`126db9144ea1080491dad90346270a608e3f57c4` exactly matches tested checkout.
Pages38046675975 succeeded. Actual Node22 Topology38046675999/job114197501430:
2125tests/2125PASS/0FAIL/0skip; CI green, no exclusions.56focusedPASS.
Fresh live index/version/importer797 byte-match main; accepted Add UI796,
protected Multi1.0 and frozenBeta6 version byte-match unchanged repository bytes.
.796 user PASS protected; .797 grouped GLB/Rotate device acceptance pending.

.798 local validation: **2134/2134 PASS, 0 FAIL, 0 skipped** (Node24 full suite). Whole UI module also exercised with actual manager/Boolean/Three and controlled DOM: shared session, real guide/preview geometry, Apply disposal, Escape/conflicting-action cancellation. Device rendering/touch checks pending.

.798 publication verified: code commit `b48f888f591868bffb8553e14380e47e19e97e41`.
Topology CI `38051036769` / job `114210039725`: SUCCESS; Pages `38051036202`: SUCCESS.
Fresh live version.json, HTML shell and all seven changed/new module owners match
main byte-for-byte. Shell/recovery798, matching direct/drawer management798 pins,
protected Multi1.0/Loop715 and frozen Beta2–6 retained. .798 device PASS pending.
