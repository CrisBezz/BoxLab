# BoxLab AI Handoff — post-Beta 6 reliability audit

## Current state — 2026-10-05

Repo CrisBezz/BoxLab. Live https://crisbezz.github.io/BoxLab/. Current app
**v0.36.18.738, published and live**. User PASS .737 in prior session; current request continues from
repo handoff. Second reliability batch adds actual Boolean scene-history fixtures
and reconciles two superseded .347/.368 assertions. Modeller source/CSS and frozen
betas unchanged. Shell markers/recovery loader keys .738. Read
 docs/reliability-build-738.md +JSON for evidence and remaining failure list.
Next: selection/puck/Gizmo/direct-tool lifecycle fixtures for remaining116 checks,
then OBJ group contract; no algorithm changes or NOM import in this batch.
Parent main ab13b4f7d701b4aa5559ade730fccae5f235b2c7.

Beta6 released/frozen at https://crisbezz.github.io/BoxLab/beta-6/ from accepted
source `e1551b3e9c3983c5d0fabfbe44c4ff9e760ff189`; freeze publication commit
`acb4012f6a925244f98630dc1fc3b0a8d4be8f86`. This commit is the audited baseline.
Frozen beta2/3/4/5/6 are immutable. Further development happens on main; no beta
hotfix without a documented user-directed decision. Freeze was byte-verified,
Pages successful; no separate post-freeze device result invented.

## .738 current validation / mandatory next work

Full1623/1507PASS/116FAIL/0skip on Node24.13 new behavior fixtures pass; two
obsolete Boolean checkpoint assertions reconciled after tracing accepted .538.
No new failure identities versus .737.35 focusedPASS. Actual Boolean apply and
scene-history bridge execute; DOM/manager/solver are doubles. Covers three
operations for Object/Groups, one-step complete-scene Undo/Redo, metadata/selection,
only selected operands hidden, refusal/creation failure preserving both stacks.
Join listener capture uses same bridge; full Join geometry is not tested here.
Reviewed337 cache/hash fixture changes ONLY two shell recovery URLs to .738;
all source hashes unchanged. No skips, fake green or runtime algorithms changed.
Published runtime commit cc1c8c257790736517d170c265d96a73f94cc2b7; local validation
commit f18fd3ef44f02abb91d206a07473086221036ac8 has the same implementation.
Earlier push rejection is resolved by explicit user approval on 2026-10-05:
“I approve any commits to github repos, page pushes and so on - moving forward for eternity :)”
Standing approval is recorded in AI_WORKFLOW.md. Pages run37303252947 succeeded;
live version.json .738 and shell bytes/markers/recovery pins verified against main.
Actual Node22CI run37303253624:1623/1507PASS/116FAIL/0skip; all116 failure names
match local Node24. CI remains truthfully red; no new environment-specific failure.
Previous .737 CI run37288886319 matched1610/1492/118; this is historical evidence,
not .738 validation. CI path triggers cover runtime assets; still red, no Pages gate.
Keep116 unresolved checks active until semantic coverage proves accepted behavior.

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
Current recovery pins .738; debug/export module pins .736; native export core+axis .735,
Focus .733; component-align .705. Repin only directly changed modules and their
loading parents; update title/visible label/data stamp/version.json together on
actual runtime builds. App .738 is a numbered test-infrastructure build; modelling code unchanged.

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
For .738 just confirm current release/Focus launch and normal edit/Undo.
Frozen Beta6 remains .736; no broad device requalification requested.
Slight Lasso tightening deferred. PostBeta6 user-authorized reliability direction
supersedes earlier pre-freeze feature restriction; keep accepted new interface.
