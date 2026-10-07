# BoxLab AI Handoff — post-Beta 6 reliability audit

## Current state — 2026-10-07

Repo CrisBezz/BoxLab. Live https://crisbezz.github.io/BoxLab/. Current build
**v0.36.18.749**, Knife diagonal validity and full failed-cut rollback.
User PASS .748/.747; .746 big PASS. .745 not blanket device PASS. Add Vertex and
NOM import deferred. Frozen beta2–6 immutable; main/Loop715/Multi unchanged.

Actual prior .748 Knife release on a U-notched planar polygon connects vertices3/6
across exterior void, creates2faces and1history entry. Existing mesh.connectVertices
only checks shared topology; generic mesh splitter remains unchanged. Knife now
checks its proposed diagonal in the source face plane before calling that splitter:
reject exterior crossings, a third boundary vertex on the chord, zero-area cuts
along subdivided boundaries, and nonplanar/degenerate faces. Valid concave diagonals
retain source winding/groups and one history entry. Plane projection uses source-
relative coordinates and scale-relative tolerance. Pointer ownership/snapping/
hysteresis/armed-tool lifecycle unchanged; no new Knife tool or gesture handler.

Knife transaction catches splitter exceptions and restores vertices/faces/groups/
creases/loose metadata. Invalid split-edge attempts restore original boundaries;
failed cuts do not alter history/redo. Existing clean-cut failure message retained.
10newPASS: actual release exterior/edge-snap refusal, valid concave cuts both
windings/history, subdivided collinear/vertex-hit refusal, rotated/translated at
.001/1000scale, nonplanar refusal, injected actual splitter exception with full
metadata/redo retained. Focused89PASS including748/747/745/744/746 and release
contract. FullNode24:1797/1695PASS/102FAIL/0skip, identical102failure identities as
748. Publication/Node22/live verification pending. No historical tests excluded.

Only Knife runtime body changed; direct shell Knife URL749, recovery/shell749.
Bevel/bootstrap/Inset/Face chain748, guard747, Drawer/Loop746, Through742/fallback743
remain unchanged. Reviewed one source hash plus intentional shell URLs.
Read docs/reliability-build-749.md/JSON. Next device: normal Knife after Loop/Bevel;
concave notch outside chord should refuse, valid inside cut should work; Undo/Redo
and navigation. A single Knife still requires one planar shared face; crossing a
third boundary vertex requires separate strokes. No source self-intersection
repair or arbitrary nonplanar cutting guarantee. Add Vertex remains watch list.

.748 runtimeac7ef2c96274dbd4a96a929c595f3fb0a7fad159; final handoff a8ebbd3b.
Actual Node22CI37609372174/job112752603609:1787/1685/102/0 and all102names;
Pages37609371712success; live changed graph/Beta6 bytes verified. User PASS .748.
Existing multi-chamfer supports one open simple chain through four-way vertices;
internal two selected edges must not share a source face, endpoints one selected.
Complete-loop/three-way routes preserved; four-way turns/branches unsupported.
Directed local boundary end caps preserve rounded subdivisions. Chamfer two natural
triangular end caps; rounded polygon caps; no all-quad/self-intersection guarantee.
All35partial supplied-loop chains at1/2/3/4segments tested (140cases), plus actual
preview/history/groups/creases/loose/rotation and later Knife→Loop. Source fixture
loop-cut-746.obj unchanged. Do not reroute complete loops into the chain engine.

.747 runtimefd498652f9339c3df639e8bb5ea276ebd980875f; final handoff ff1533ea.
Actual Node22CI37594432292/job112703460695:1777/1675/102/0 and all102names;
Pages37594431221success; live changed graph/Beta6 bytes verified. User PASS .747.
Existing guard verifies opposite shared-edge winding for initially closed oriented
shells; injected flipped face restored metadata. Open/already misoriented inputs
retain prior routing. No existing Bevel engine generating that defect was claimed.

.746 runtime48595c3d767dc99b34458b1c6c9793070d53a461; finalhandoff4cdbcf37.
Actual Node22CI37585236460/job112673733525 matched1770/1668/102/0 and all102
failure names; Pages37585235717 success; runtime/live/sourceOBJ/Beta6 byte-verified.
User PASS2026-10-07. Exact source tests/fixtures/loop-cut-746.obj31verts24faces,
21quads3ngons; exporter header736 was not app version. Native edge0 refused, other
seeds stopped at subdivided7/8gons. Guarded parallel convex-planar polygon strip
completes all13vertical seed routes through7faces without new triangles. Slide uses
common rail-height overlap; native quad feel/715 commit unchanged. Concave,
nonplanar, ambiguous, nonparallel/open fallback refuses; existing native terminal
behavior retained when safe continuation unavailable. Preserve original source.

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
Current recovery pins .749; Knife .749; bevel bootstrap/Inset/Face direct/multi-chamfer .748; guard .747; other bevel engines .745; Loop logical-addon/drawer .746; fallback .743; Through child .742; export panel/wrapper/NOM/core cache URLs .741; debug .736; axis .735,
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
For .749 check normal/concave Knife validity and Undo/Redo. Add Vertex remains a deferred, unconfirmed report.
Frozen Beta6 remains .736; no broad device requalification requested.
Slight Lasso tightening deferred. PostBeta6 user-authorized reliability direction
supersedes earlier pre-freeze feature restriction; keep accepted new interface.
