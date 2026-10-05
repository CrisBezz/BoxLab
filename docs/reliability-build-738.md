# .738 — Boolean scene-history behavior fixtures

Parent main: ab13b4f7d701b4aa5559ade730fccae5f235b2c7. This is a narrow second
reliability batch. Runtime src/CSS and frozen beta2–6 are unchanged. Only shell
release markers and the two recovery loader pins advance from .737 to .738;
the reviewed asset fixture changes those two URLs, retaining every content hash.

Two obsolete .347/.368 assertions demanded checkpoint() before creating a Boolean
result. That conflicts with accepted .538, which captures the scene before hiding
operands and checkpoints that captured scene after addMesh activates the result.
Replaced those two assertions with execution of current owners; no tests skipped.

Thirteen new fixtures execute actual Boolean apply, scene capture/restore,
installHistoryBridge and History. Object-manager/DOM/solver dependencies are
controlled doubles, not actual browser or solver geometry coverage. They test:

- Object and Group Union/Cut/Intersect: capture → create → checkpoint ordering,
  exactly one history entry, only operand visibility changes, unique named result,
  result activation/selection, complete scene Undo/Redo and repeated Undo.
- Restored geometry/facegroups, linked source IDs/instance placement/origin, group
  names/collapse state, object settings, reference locks, active ID and selection.
- Ineligible operation, solver refusal and returned creation failure: exact scene
  restoration, original hidden-member visibility and unchanged undo/redo stacks.
- Actual shared Join capture listener uses the same installed scene-history bridge.
  This checks listener/history integration, not execution of Join's geometry owner.

Validation on Node24: **1623 total /1507 PASS /116 FAIL /0 skipped**.
Thirteen added cases pass; exactly the two investigated failure identities resolve;
no new failure identities versus .737. **35 focused PASS** for release coherence,
cache negative controls, Boolean/Group history and Beta6 transform/GLB coverage.
Full remaining inventory: reliability-build-738.json. CI remains red; Pages release
gating is still deferred. Device behavior and Node22 CI are separate evidence.

No newly confirmed runtime bug or modelling algorithm change. Next: selection,
puck/Gizmo and direct-tool lifecycle semantic fixtures for remaining active checks;
then OBJ object/facegroup contract and diverse Bevel/Knife→Loop geometry fixtures.
Do not convert unresolved source checks into permissive patterns or hide failures.

Manual smoke only: .738 Focus launch; normal edit/Undo/Redo; optional familiar
Boolean/Undo/Redo. Beta6 remains immutable at .736. NOM import remains future work.

Published runtime: cc1c8c257790736517d170c265d96a73f94cc2b7. User explicitly
reaffirmed continuing GitHub/Pages authorization on 2026-10-05. Connected app
publication used the exact locally validated tree after direct git lacked credentials.
Pages37303252947 succeeded; live version .738 and byte-identical shell verified.
Actual Node22CI37303253624:1623/1507/116/0, all116 failure names match localNode24.
CI remains truthfully red. No device acceptance inferred.
