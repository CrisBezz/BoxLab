# BoxLab AI Handoff — post-Beta 6 reliability audit

## Current state — 2026-10-07

Repo CrisBezz/BoxLab. Live https://crisbezz.github.io/BoxLab/. Current build
**v0.36.18.746**, uploaded bevelled-cage horizontal Loop continuation. User reported
red-line Loop unavailable in .745 and supplied LOOP CUT.obj. This is not .745 PASS.
Add Vertex remains deferred; frozen beta2–6 immutable.

Exact source preserved in tests/fixtures/loop-cut-746.obj:31verts24faces,21quads and
3ngons. Export header736 is the exporter stamp; screenshot confirms running745.
No native quad route from edge0 (0:2); other vertical seeds returned partial strips.
The old logical addon only treats a five-gon with ONE collinear point as a quad;
source has multi-subdivided7/8gons plus genuine bevel corners. This was not covered
by prior simple Bevel/Knife→Loop fixtures. Do not erase those subdivisions.

Existing logical Loop addon now tries a guarded polygon-strip continuation when
native/logical route refuses OR creates an open cut chain. It follows a closed
strip of convex planar faces with exactly two crossings per face and rails parallel
to the seed, using shared vertex IDs. All13vertical source seeds complete7faces;
no new triangles, volume/winding/original vertices preserved. Multi2/3/8cuts also
covered. Shared rail-height overlap bounds Slide; initial cut stays at clicked seed
height, then slides level within that common interval. Regular quad/Added paths
and protected715commit/main pointer owner remain unchanged. This is not arbitrary
n-gon Loop support: concave/nonplanar/ambiguous/nonparallel/open fallback refuses.
Existing native boundary-termination behavior remains if no safe continuation exists.

15newPASS; focused63PASS including actual protected commit owner on supplied mesh,
Slide/History/retained rail selection, groups/creases, rotated/translated source,
refusal immutability and ordinary cube placement. Full Node24:1770/1668PASS/102FAIL/
0skip, identical102failure identities as745. DOM doubles do not prove iPad feel.
Read docs/reliability-build-746.md/JSON. Runtime commit 48595c3d767dc99b34458b1c6c9793070d53a461 published. Actual Node22 CI run 37585236460, job 112673733525: 1770 tests, 1668 PASS, 102 FAIL, 0 skipped; all 102 failure names match the recorded baseline. Pages run 37585235717 succeeded. Live index, version, Drawer loader, Loop addon, original OBJ fixture and Beta6 version byte-match main. Focused 63 PASS; device .746 acceptance remains pending.

Logical addon/drawer and recovery shell pins746; Bevel/Face direct/Inset745,
Through742/fallback743 retained. Only addon and drawer runtime changed. No edits to
protected Loop715/main/Multi or frozen betas. Reviewed two hashes/loading references.
Next device test original uploaded mesh horizontal loop, Slide/EXACT, multiple cuts
and Undo/Redo; then continue diverse topology/normal/reliability work. NOM import
and Add Vertex remain deferred. Full CI still red102, no release gate installed.

.745 runtimee5d18e5fcff22dd8cf4f268866f1a9b5b5ff51a4, actual Node22CI
37568114774/job112620395437 matched1755/1653/102/0 and102failure names;
Pages37568114308success/all13src/live shell/Beta6 verified. Mixed endpoint cap,
rounded duplicate-cap/winding and6engine group provenance fixes retained. Device
Loop failure led to746; do not mark all745device checks PASS.
.744 user PASS, protected boundary conformance retained. .743 accepted stronger
finite negative Extrude; old triangular meshes not auto-repaired; fixtures retained.

## .742 accepted multiple-cut baseline and limitations (historical)

New tests cover uploaded four bands, shallow/through cuts, exact volume, zero
triangles on rectangular band/inset/corner fixtures, rotated/scaled geometry,
side-strip removal, source-order independence, groups, creases/loose geometry,
invalid-input/total-removal refusal, actual Face controller preview/commit/cancel/
replay/history and Exact synthetic input. Existing Loop/Knife/corner Through
fixtures are tested through the new finite route as well as old Through suites.
Add Vertex actual splitter creates two child edges on manifold/boundary/loose
fixtures; actual Three ray picking selects the child segments independently.
User's Add Vertex failure is **not reproduced or claimed fixed**; runtime unchanged.

Exact-input fixture exposed an existing bug: one synthetic move started the drag
at its endpoint, yielding zero travel. Synthetic pointer9876 now uses press origin
and bypasses physical threshold; real Pencil/touch deliberate-drag threshold and
origin remain unchanged. Zero Exact input creates no history entry. Small positive/
negative Exact operations and failed-cut redo preservation covered.

Known limits: source faces must be planar and convex, input closed with consistent
winding; invalid/unsupported cuts refuse privately with source/history retained.
Concave targets may need triangulation; this is not an all-quad guarantee for arbitrary
geometry. Existing edge-manifold gate does not detect every self-intersection.
Tiny numerical zero-area Earcut triangles along rotated collinear boundaries are
filtered from the finite cutter's shell planes; old buildThrough algorithm unchanged.

Full Node24:1706/1604PASS/102FAIL/0skip; same102 failure identities as .741.
27 new tests and focused53PASS. Syntax/whitespace and protected/frozen diffs clean.
Actual Node22CI37463033743/job112267082488 matches1706/1604/102/0 and
all102 failure names. Pages37463032493success; live shell/version, two changed
modules, before/corrected OBJ fixtures and frozenBeta6 version byte-match main.
User PASS .742 multiple-region cuts on2026-10-07; single-face issue led to .743.
Remaining reliability inventory stays active; no CI release gate installed.
User PASS .743; Add Vertex deferred to watch list. Current priority Bevel/Knife/Loop
combinations. NOM import remains deferred.

Beta6 released/frozen at https://crisbezz.github.io/BoxLab/beta-6/ from accepted
source e1551b3e9c3983c5d0fabfbe44c4ff9e760ff189; freeze publication commit
acb4012f6a925244f98630dc1fc3b0a8d4be8f86. Frozen beta2/3/4/5/6 are immutable.

## Original audit findings (historical baseline)

Read docs/reliability-audit-2026-10-05.md and the matching JSON inventory.
Fresh full Node24 run:1302 tests /1025 pass /277 fail /0 skipped. Failure signatures:
147 old version/pin assertions;92 source-pattern reviews;31 standalone scripts
containing121 failed internal static checks;6 recovery sentinels;1 old OBJ output
contract. These are not277 confirmed app bugs. Source expectations can hide real
missing behavior; first failing assertions can hide later failures. No new modelling
bug isolated; no assertion was skipped or weakened. Prior shorthand about VM
failures is unsupported by this run: aggregate scripts threw no harness exception.

Confirmed conflicts: .453 tests forbid accepted Facegroups; old Boolean tests
require checkpoint() while .538 contract forbids it and requires pre-result capture
plus checkpointSnapshot(); .444 OBJ test expects synthetic object-name group,
changed intentionally by .449 to preserve actual facegroups.

Selected existing suites pass: Bridge85, Through16, Bevel21, LoopRepeat1,
Beta6 transform/history+GLB4, nativeNOM9. Many other passes are static checks;
mocked browser tests do not establish actual iPad behavior. Node24 local versus
Node22 CI is recorded. Workflow narrowly filters paths; Pages is independent of
red regression CI. Next batch: central shell/pin checks, named standalone cases,
semantic replacement of obsolete source contracts, explicit archival recovery
scope. Keep full npm test truthfully failing until reconciled. Then expand CI
runtime path coverage/release gate and tackle diverse Bevel/Knife→Loop/history
fixtures. Do not fix runtime to match superseded tests or blanket exclude failures.

Reproduce node --test --test-reporter=junit tests/*.test.mjs > /tmp/boxlab.xml
then python scripts/audit-test-results.py /tmp/boxlab.xml /tmp/inventory.json.
Audit script only inventories failures; it is not a passing release gate.

## Accepted interaction and UI baseline

- iPad/Pencil-first; one-finger orbit, two-finger pan, pinch, two-finger Undo,
  three-finger Redo, no-jump pivot and persistent selections. Studio realtime.
- Selection → puck → expanded gizmo; radial shortcut top-left. Centre owns free
  transforms. Tool sessions hide gizmo and return to puck if selection survives.
- Contextual Face/Vertex/Object/Edge modelling radials completed. Selection helpers
  belong to gestures/SELECT, not tool rings. Bevel inner3-o'clock across components.
- Focus defaults on in shell (.733), icon visibly armed, toggles left list.
  Top row:FrameAll/Undo/Redo/Focus/ObjectBrowser/VIEW. ObjectBrowser opens right,
  original Objects+Modifiers, Modifiers initially collapsed; works in Focus.
- Component Align icons in Vertex/Edge/Face gizmo bottom-left; use existing .705
  XYZ fixed-anchor owner; Face also Align-to-Face plane. Gizmo hidden while picking.
- XYZ semantic buttons use original Move RGB via axis-colours.css .735.
- Tool popups top-centre, content-sized with shared7px/8px packing. ObjectBrowser
  is deliberate right-hand exception. Preserve original listeners/session owners.
- .724 short background tap clears selection and Lasso; stationary500ms background
  hold inverts CURRENT selection. Double tap retired. Appropriate armed tools
  exit on semantic background tap; placement/drawing tools preserve empty space.
  Shared tool-background-exit .732 never adds competing raw-pointer owners.
- SplitDone/background; Slide stays armed untilDone/background; Sweep edge/face
  popups fixed; Face/Edge/Vertex Bevel popup preview preserves in-window bevel.
- Array XYZ puts endpoint on chosenaxis, constraineddrag; Free keeps mixedcoords
  withXYZ handles. Inset Repeat stores own distance, never displays ExtrudeRepeat.
- Preserve actual gesture/history owners; completion on window capture where
  document owners stopImmediatePropagation. Main/transform-upgrade/Face owners
  distinct; do not implement precision in a helper that does not own the drag.

## Protected files / pins

src/multi-object-transform.js?v=0.36.1.0 explicitly protected; LoopCut commit/feel
.715 protected. Frozen betas untouched. Intentionally older pins are not errors.
Current recovery pins .746; bevel bootstrap/children/direct/Inset/Face direct .745; Loop logical-addon/drawer .746; fallback .743; Through child .742; export panel/wrapper/NOM/core cache URLs .741; debug .736; axis .735,
Focus .733; component-align .705. Repin only directly changed modules and their
loading parents; update title/visible label/data stamp/version.json together on
actual runtime builds. App .742 adds finite negative cuts and corrects synthetic Exact origin; protected gestures unchanged.

## File/Nomad baseline and limitations

File NOMAD replaces secondary SaveGLB+note; normal OBJ/GLB retained. Native NOM
geometry/names/facegroups/Base/SubD/Mirror implemented .735. User PASS .735/.736.
Delivery .736 matches MeshUtilz appended anchor browser download, .nom extension,
application/x-nomad-sculpt Blob,60s objectURL lifetime. iOS controls OpenIn targets.
No BoxLab NOM import; no promise native UV/paint/material/morph/crease passthrough;
GLB retains richer channel workflow. No fake application URI or forced iOS launch.

Core src/nomad-export-core.js, template src/templates/nomad-tube.nom; SHA256
9cc56cc4fdea095ec5b8eb917e0101b0e9433f5af54dd3e554ac5b76724010d8. Provenance:
CrisBezz/MeshUtilz-Sweep-Lab balloon-v0.6 commit18e72a6bf964974591038345d68c2196a18f6af2;
source repo read-only. Relative import.meta template URL keeps frozenbeta isolated.

## Session contract

Read AI_WORKFLOW.md, this handoff, TEST_CHECKLIST.md and recent DEV_HISTORY.md.
Audit existing owners before adding anything. User ALWAYS authorizes publishing;
/nextbuild implements scoped work, validates, updates handover/history/checklist,
publishes/verifies Pages then reports ready for testing with realistic device list.
For .746 check uploaded bevelled cage horizontal Loop, Slide/EXACT, count and Undo/Redo. Add Vertex remains a deferred, unconfirmed report.
Frozen Beta6 remains .736; no broad device requalification requested.
Slight Lasso tightening deferred. PostBeta6 user-authorized reliability direction
supersedes earlier pre-freeze feature restriction; keep accepted new interface.
