# BoxLab AI Handoff — post-Beta 6 reliability audit

## Current state — 2026-10-05

Repo CrisBezz/BoxLab. Live https://crisbezz.github.io/BoxLab/. Current app
**v0.36.18.741, published and live**. User PASS .740 then /nextbuild. OBJ reliability batch fixes
missing explicit initial ungrouped reset and multiline facegroup records in scene
export core, with nine new round-trip fixtures. Normal scene/Quick OBJ own path;
no modelling or interaction algorithm changes. Frozenbeta2–6 unchanged.
Read docs/reliability-build-741.md +JSON. Parent main
7bbc142f42a90d488b530a18f0470aa79ac69729. Runtime9bc1b3165e614173ad168ae8cf0b4f464a6aac22 published.
Next remaining Face/selection-owner checks, then Bevel/Knife→Loop geometry and
trustworthy CI gate. NOM import remains future work.

Beta6 released/frozen at https://crisbezz.github.io/BoxLab/beta-6/ from accepted
source `e1551b3e9c3983c5d0fabfbe44c4ff9e760ff189`; freeze publication commit
`acb4012f6a925244f98630dc1fc3b0a8d4be8f86`. This commit is the audited baseline.
Frozen beta2/3/4/5/6 are immutable. Further development happens on main; no beta
hotfix without a documented user-directed decision. Freeze was byte-verified,
Pages successful; no separate post-freeze device result invented.

## .741 current validation / mandatory next work

Node24 full1679/1577PASS/102FAIL/0skip. Ten new cases pass; one obsolete .444
synthetic object-name group assertion reconciled; no new failure identities.
Two new fixtures fail on .740 and pass after core fixes. Initial ungrouped g reset
prevents inherited state in independent OBJ stream reader (BoxLab importer resets
at o and masked omission). CR/LF group names now use existing safe name normalizer;
synthetic multiline label no longer creates extra faces/objects. No Nomad defect
or device acceptance inferred. Export→actual importer covers Base/SubD/Mirror,
geometry/groups/names/global offsets/source retention; independent scanner validates
indices/group transitions. Modifier expectation uses established resolver.
Focused39/38PASS/1historicalFAIL (.459 viewport demands noSubD; .460 supersedes it);
this unresolved check stays active. Initial17OBJ/release checks pass; final export-focused38PASS (the unrelated
.459 viewport case remains active in full suite). Changed source/
test syntax, whitespace and frozen/protected diffs clean.
Changed core and4import parents only; shell/recovery .741, changed wrapper/panel
.741, child core/NOM loader .741. Reviewed asset fixture updates only changed URLs
and5source hashes. Internal stamps .450/.736 remain informational. GLB/NOM payload
construction unchanged; existing nativeNOM/GLB fixtures pass. Legacy export.js
unchanged; authoritative scene document-capture path handles normal/Quick OBJ.
Keep102 unresolved checks active, no CI gate yet. Standing GitHub/Pages publication
approval in AI_WORKFLOW; use connected app if direct git lacks credentials.
Pages37307745660success; live version/shell and all5changed assets byte-match main;
Beta6 version .736 verified. Actual Node22CI37307745974:1679/1577PASS/102FAIL/0skip;
all102 failure names match localNode24. No .741 device acceptance inferred. Historical .740 runtimeb522da13,
Pages37306257859success, Node22CI37306258245 matched1669/1566/103/0.

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
Current recovery pins .741; export panel/wrapper/NOM/core cache URLs .741; debug .736; axis .735,
Focus .733; component-align .705. Repin only directly changed modules and their
loading parents; update title/visible label/data stamp/version.json together on
actual runtime builds. App .741 changes scene OBJ group emission; modelling/interaction code unchanged.

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
For .741 check named grouped/ungrouped OBJ reimport, Base/SubD and normal GLB/NOM.
Frozen Beta6 remains .736; no broad device requalification requested.
Slight Lasso tightening deferred. PostBeta6 user-authorized reliability direction
supersedes earlier pre-freeze feature restriction; keep accepted new interface.
