# Build .783 reliability evidence

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
