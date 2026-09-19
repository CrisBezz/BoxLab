# BoxLab Development History

This is the concise append-only development log used for cross-chat continuity.

Do not record every tiny cache-busting or temporary deployment workflow commit. Record meaningful modelling, architecture, UI, stability, and release milestones.

Newest entries should be added at the top.

---

## 2026-09-19 — v0.36.18.334 Circle moved to Active Tools

- Released **v0.36.18.334** from PR #18; squash merge commit: `6dc2d183e0332d6953f60e9bf21f5b39c1686ec8`.
- Relocated the existing Circle control out of the Selection drawer.
- Circle now appears contextually inside Vertex / Edge / Face **Active Tools**.
- Kept one authoritative Circle implementation and one handler; geometry, selection, Undo, and Face/Edge/Vertex behavior are unchanged.
- Updated dynamic loader/cache pins to .334.
- PR topology regression run **35417217225** passed before merge.

## 2026-09-19 — v0.36.18.333 Face Circle support

- Released **v0.36.18.333** from PR #17; squash merge commit: `fbfbf9f46f45b4551cb0e5fdc1086cac248e7919`.
- Extended Circle so exactly one selected Face can drive the operation from its perimeter vertices.
- Face mode now enables Circle for one valid face; multiple selected Faces are refused.
- Existing Vertex/Edge Circle behavior remains unchanged.
- No topology is created or deleted; the selected Face remains selected and the operation is one Undo step.
- Cache-hopped `component-circle-core.js`, `component-circle.js`, and the authoritative `drawer-ui.js` loader to .333.
- First PR run failed only because older Circle contract tests still hard-coded .331/.332 pins/text; those assertions were rewritten to protect invariants instead of stale version strings.
- Corrected PR topology regression run **35417107014** passed before merge.

## 2026-09-19 — v0.36.18.332 Circle visibility hotfix

- Released **v0.36.18.332** from PR #16; squash merge commit: `86f5efe098b26fa7543d1018122fc7deeeacdb04`.
- Fixed Circle not appearing on iPad/Safari because `index.html` still loaded `drawer-ui.js?v=0.36.18.210`, allowing the browser to reuse an older cached drawer module that did not import Circle.
- Cache-hopped the authoritative drawer loader to `drawer-ui.js?v=0.36.18.332`.
- Circle now remains visible-but-disabled outside Vertex/Edge mode instead of disappearing, improving discoverability.
- Added regression coverage for the current drawer cache key and Circle visibility.

## 2026-09-19 — v0.36.18.331 Circle regularize for closed loops

- Released **v0.36.18.331** from PR #15; squash merge commit: `64bb42b17ef463e489c66989bf6f51dc99917126`.
- Existing-feature audit confirmed there was no current Circle / Regularize equivalent.
- Added conservative Circle regularization for one simple closed selected Vertex or Edge loop.
- The operation preserves the loop centre and current working plane, uses the average loop radius, and evenly spaces the existing vertices around the circle.
- No topology is created or deleted.
- Open chains, branches, multiple/ambiguous loops, and degenerate selections are refused.
- Selection is preserved and the operation commits as one Undo step.
- New modules: `src/component-circle-core.js` and `src/component-circle.js`.
- `drawer-ui.js` remains the single authoritative loader.
- PR topology regression run **35416581512** passed before merge.

## 2026-09-19 — v0.36.18.330 explicit Align anchor workflow

- Released **v0.36.18.330** from PR #14; squash merge commit: `e5ee279298b14cca76cbca5274c10f6a2484e802`.
- Upgraded component Align X/Y/Z from average-based flattening to an explicit iPad anchor workflow.
- Workflow: multi-select components → choose Align X/Y/Z → tap one selected component as the fixed anchor.
- The picked anchor component stays fixed; other selected component vertices align to the anchor component's centre coordinate on the chosen axis.
- Reused the existing Boolean amber/orange reference colour (`#f3b34a`) for the temporary anchor cue.
- Existing Make Planar remains unchanged and distinct.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- PR topology regression run **35415067002** passed before merge.

## 2026-09-19 — v0.36.18.329 component Align X/Y/Z

- Released **v0.36.18.329** from PR #13; squash merge commit: `6edb552a3219435f1a3a2de7cc9a47be46815c07`.
- Existing-feature audit confirmed **Make Planar** already existed for Face-specific arbitrary-plane flattening; it was retained unchanged.
- Added only the missing generic component axis-align tool for Vertex / Edge / Face selections.
- Align X / Y / Z sets all vertices belonging to the selected components to their average coordinate on the chosen axis.
- Selection is preserved, Object mode is excluded, and the operation commits as one history step.
- New modules: `src/component-align-core.js` and `src/component-align.js`.
- `drawer-ui.js` is the single loader for the new UI module.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- PR regression run **35411656859** passed before merge.

## 2026-09-19 — v0.36.18.328 duplicate Repeat UI removed

- Released **v0.36.18.328** from PR #12; squash merge commit: `f731849f96b5808c986b6d46dc92e53c9f64f9c3`.
- Fixed duplicate Precision Face / Repeat Previous controls introduced by v0.36.18.327.
- Root cause: `drawer-ui.js` already dynamically imported both modules, while .327 also added direct `index.html` module loads.
- Removed the direct `index.html` loads.
- Kept `drawer-ui.js` as the single authoritative loader and updated its Precision Face / Repeat Previous pins to `0.36.18.327`.
- Added regression coverage ensuring there is only one loader path for each module.
- This fix preserves the existing Repeat Previous behavior and exact-value replay logic; it only removes duplicate UI instantiation.

## 2026-09-19 — v0.36.18.327 redundant Repeat Previous reconnect

- Released **v0.36.18.327** from PR #11; squash merge commit: `462eabc59076afdfa7efaf10338bfa49f83355c1`.
- This release was later identified as redundant: Repeat Extrude / Repeat Inset were already live through `drawer-ui.js` before .327.
- Normal Face Extrude and Inset operations record committed model-unit values.
- Repeat Previous can replay the exact previous Extrude/Inset value on another Face.
- Through-ready, Through, blocked and rollback Extrude gestures remain explicitly non-repeatable.
- No `main.js`, Through kernel, or protected `src/multi-object-transform.js?v=0.36.1.0` changes were required.
- Final PR regression run **35410554813** passed after aligning the exported Precision Face API version with the .327 release.

## 2026-09-19 — v0.36.18.326 live component Move precision readback

- Released **v0.36.18.326** from PR #10; squash merge commit: `80605a225d9855f098a1cff7596d77fc8d6a2d7e`.
- Added live component Move readback in the existing stats line: **ΔX / ΔY / ΔZ** to three decimal places.
- Numeric readback remains visible during ordinary drags and cross-object snapping.
- Existing snap target labels remain visible alongside the numeric delta.
- No transform math changed; this is presentation/readback only.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- Final PR regression run **35408617550** passed. The earlier failed run only flagged a stale .325 cache-pin assertion; the new .326 readback tests were already passing.

## 2026-09-19 — v0.36.18.325 component Move cross-object snapping

- Released **v0.36.18.325** from PR #9; squash merge commit: `11f3d80d871d2fa2375d908aa904527bd549e394`.
- Extended Phase B precision modelling so Geometry-enabled component Move can snap to visible geometry on other objects.
- Single-vertex Move snaps that vertex; Edge/Face/multi-component Move snaps the component centre.
- Free Move can snap to other-object vertices, midpoints and edge positions.
- Axis-constrained Move only adopts the target coordinate on the constrained axis.
- Object mode is excluded and target objects remain unchanged.
- Added `componentSnapDelta()` to the shared cross-object snap core and dedicated runtime/delta regression coverage.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- Final PR regression run **35407390765** passed. The earlier failed run only flagged the intentionally changed `main.js` cache pin in an old release contract.

## 2026-09-19 — v0.36.18.324 Phase B begins / cross-object Add Vertex snapping

- Released **v0.36.18.324** from PR #8; squash merge commit: `70df4c4f137a55e553227aa391bdd68324a0d732`.
- Started Phase B precision modelling with cross-object snapping for Add Vertex.
- Existing local-edge snapping keeps priority.
- When no local edge is hit, Add Vertex can snap to visible other-object vertices, then midpoints, then arbitrary edge positions.
- Snap targets do not modify the target object; hidden and solo-excluded objects are ignored.
- Added pure helper module `src/cross-object-snap-core.js` plus dedicated regression coverage.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- Final corrected PR regression run **35406677103** passed successfully. Earlier PR runs failed only because the new test fixture incorrectly used loose edges that `EditableMesh.edges()` does not enumerate.

## 2026-09-19 — v0.36.18.323 Phase A complete / transactional topology audit

- Released **v0.36.18.323** from PR #7; squash merge commit: `040e210bf2868a45791c35c9c1392bc1e6f244fe`.
- This is the final planned Phase A Clean for SubD backend release.
- Added `quadTopologyAudit(mesh)` covering invalid references, repeated/collapsed edges, duplicate faces, non-manifold edges, orphan crease data, and valid open-boundary handling.
- `quadCleanMesh(mesh)` now snapshots the original mesh and audits after retopo, sliver cleanup, bounded triangle-patch solving, residual pair merge, and relaxation; any stage failure restores the original mesh transactionally.
- Added deterministic generated irregular-strip fixtures and invalid-topology regression coverage.
- Kept the 40-triangle solver cap and all existing quality/acceptance gates unchanged.
- Added persistent `ROADMAP.md`; Phase A is frozen unless a concrete modelling failure justifies reopening it.
- PR topology regression run **35406242201** completed successfully before merge.

## 2026-09-19 — v0.36.18.322 worst-local internal-flow ranking

- Released **v0.36.18.322** from PR #6; squash merge commit: `0f03befbb7d69ca53194536579c240a993efd9ff`.
- Clean for SubD internal proposed-quad flow ranking now combines average mismatch with a small worst-local mismatch term.
- New helper `quadInternalFlowPenalty(flows)` separates the acceptance penalty from the ranking-only worst-local term.
- Equal-average alternatives now prefer the patch that avoids concentrating flow mismatch into one badly aligned internal quad junction.
- The new worst-local term is ranking-only: the .321 acceptance score, quality thresholds, and 40-triangle solver envelope are unchanged.
- Regression workflow run **35404138276** completed successfully before merge.

## 2026-09-19 — v0.36.18.321 worst-local valence-aware patch ranking

- Released **v0.36.18.321** from PR #5; squash merge commit: `0b838da0cd2a31cd4d88c2390a9e15e9b0c58905`.
- Clean for SubD valence ranking now combines average smooth-interior valence error with a small worst-local error term.
- New helper `quadValencePenalty(errors)` makes the ranking behavior explicit and regression-testable.
- Equal-average alternatives now prefer the patch that avoids concentrating error into a more extreme extraordinary vertex.
- The new worst-local term is ranking-only; the .320 acceptance/quality gates and 40-triangle solver envelope are unchanged.
- Regression workflow for PR #5 passed successfully before merge.

## 2026-09-19 — v0.36.18.320 interior valence-aware patch ranking

- Released **v0.36.18.320** from PR #4; squash merge commit: `40e119774f39373ffadab22d0782428e8be7ea2c`.
- Clean for SubD complete-patch ranking now includes smooth-interior vertex valence regularity after the existing shape, surrounding-flow, and internal-flow terms.
- The new helper is `quadPatchValenceContext(mesh,pairs)` with `PATCH_VALENCE_WEIGHT=.25`.
- Ranking prefers safe complete matchings that leave eligible smooth interior vertices closer to quad valence 4 after paired triangle diagonals are removed.
- Boundary vertices and vertices touching creases are excluded from valence scoring.
- Valence is ranking-only: the existing .319 quality score still controls acceptance, so the 40-triangle envelope and prior quality/eligibility guards remain unchanged.
- Added regression coverage for valence-4 preference and crease-ring exclusion; Topology regression run **35401945842** completed successfully on the corrected PR head.

## 2026-09-19 — .319 handoff audit / repo reconciliation

- Re-audited current `main` against `AI_WORKFLOW.md` before closing the development chat.
- Confirmed **v0.36.18.319** is the released/live baseline: internal proposed-quad flow coherence is present, the bounded triangle-island envelope remains 40 triangles, and the .319 release/verifier had already completed successfully.
- Canonical .319 release commit remains `68e45845f6696b3e66929ee4b181748b85d99b09`; final clean Pages marker commit remains `4ed534dfe8697e54921a8a80d7b50945b6792342`.
- After the handoff files were first introduced, three later .319 commits (`51117f59...`, `a91ac689...`, `a0a2d072...`) re-exposed/cache-hopped/tested the same .319 internal-flow state. They do **not** represent a newer numbered release.
- Current code-bearing HEAD at this audit is `a0a2d072acbf2e397ca68e2276fd75c8a1643846`.
- Only permanent workflow currently present under `.github/workflows` is `through-regression.yml`; temporary .319 release/verifier workflows are removed.

## 2026-09-19 — Repository handoff system established

- Added `AI_WORKFLOW.md`, `AI_HANDOFF.md`, `DEV_HISTORY.md`, and `TEST_CHECKLIST.md`.
- Future AI development sessions must treat the repository as source of truth.
- Future sessions must update the living handoff and append meaningful history before finishing code-changing work.
- Initial handoff was audited from current `main`, not reconstructed from an older chat version.

## v0.36.18.319 — Internal proposed-quad flow coherence

- Clean for SubD patch scoring now considers flow coherence inside the proposed quad patch in addition to surrounding boundary context.
- Bounded triangle-island solving remains conservative and quality-gated.
- User-facing Clean for SubD wrapper retains topology validation and rollback.
- Release commit: `68e45845f6696b3e66929ee4b181748b85d99b09`.
- Audited post-release HEAD: `4ed534dfe8697e54921a8a80d7b50945b6792342`.

## v0.36.18.318 — Forty-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 40 triangles.
- Kept conservative patch quality guards and regression tests.

## v0.36.18.317 — Thirty-eight-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 38 triangles.

## v0.36.18.316 — Thirty-six-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 36 triangles.

## v0.36.18.315 — Thirty-four-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 34 triangles.

## Earlier protected baseline retained

The current repository has evolved through many earlier releases. Important protected behaviours that remain relevant include:

- iPad navigation gesture model
- persistent selections during navigation
- Studio realtime workflow
- object management / Multi
- Knife / Loop Cut / Bevel / Extrude / Inset
- connected multi-face Extrude
- cavity-aware Through
- Extract
- Bridge
- Join
- Boolean workflows
- Base/SubD export
- protected `src/multi-object-transform.js?v=0.36.1.0`
- intentionally pinned selection/UI stylesheet baseline where still referenced by current `index.html`

For exact implementation state, always inspect current `main`; this history is context, not authority.
