# BoxLab reliability audit — 2026-10-05

Audited main `acb4012f6a925244f98630dc1fc3b0a8d4be8f86`, app .736 / released
Beta 6. No runtime, test expectation or frozen-beta changes in this audit.

## What the 277 failures mean

Fresh full run: **1,302 tests / 1,025 pass / 277 fail / 0 skipped** on Node v24.19.0.
They are failed automated checks, not 277 confirmed application bugs. Some tests
inspect source strings; others execute kernels or mocked browser owners. One
standalone script is counted as one test even when several checks inside fail.
The counts are therefore neither a bug count nor a probability of app reliability.

| Failure signature | Count | Meaning and disposition |
| --- | ---: | --- |
| Version / asset pin assertions | 147 | Old release numbers or requirements that every module equal current shell. Replace with current shell/manifest coherence, asset existence and intentionally protected pin contracts; do not repin runtime just to satisfy tests. |
| Source-pattern assertions | 92 | Exact variable names, code order, markup, diagnostics or old implementation contracts. Review behavior individually; superseded expectations can be replaced only with coverage of the current intended behavior. |
| Aggregate standalone scripts | 31 | Scripts exit nonzero; rerunning individually exposes **121 failed internal checks**, no harness exception observed. Mostly old pins plus source-pattern expectations. Convert meaningful checks to named node:test cases. |
| Recovery / rollback sentinels | 6 | .451/.453-era exact render hash/import count/helper/UI absence. Historical release contracts need explicit historical scope, not enforcement against today's app. |
| OBJ output contract | 1 | Actual generated output lacks obsolete adjacent `o Closed Cube\ng Closed Cube`. Investigated below; update semantic export coverage. |

The machine inventory lists every failed test and the script subchecks:
[JSON inventory](reliability-audit-2026-10-05.json). Classifications identify failure
signatures, not proof that all failures are obsolete. Assertions stop at their first
failure, so repairing an old pin can expose an additional problem. The 92 source
pattern cases and script behavior cases remain unresolved until traced to their
current owners. No confirmed new modelling defect was isolated by this audit.
Previous shorthand describing these collectively as source/pin/VM failures was too
broad: this run's 31 aggregate scripts are static check scripts, and none threw a
VM/DOM harness exception. Do not repeat the earlier VM diagnosis without evidence.

## Verified examples of conflicting expectations

- `tests/453-facegroup-core-dormant.test.mjs` demands no `applyFaceGroupColours`;
  current `src/render-modes.js` deliberately imports it. Facegroup support is an
  accepted feature. Other recovery tests demand no Facegroups UI or an old render
  blob hash. Reverting current functionality to satisfy those would be wrong.
- `tests/boolean-object-history.test.mjs` and `group-boolean-368.test.mjs` demand
  the old `checkpoint()` call. Current `src/boolean-prototype.js` captures the
  scene before adding results and uses `checkpointSnapshot(beforeScene)` afterward.
  `tests/boolean-undo-538.test.mjs` explicitly forbids the old call and passes.
  Both contracts cannot govern current main. The passing .538 checks are still
  source checks; stronger end-to-end Boolean Undo coverage is warranted.
- `tests/delete-key-router-387.test.mjs` expects module .444 to equal shell .736.
  An unchanged module's deliberately old cache pin is not by itself a stale app.
- `tests/scene-obj-export-444.test.mjs` actually builds OBJ successfully and passes
  preflight checks, then fails at its old object-name group text. Commit
  `deb2277a` (.449, preserve facegroups in scene OBJ export) changed group writing.
  Current output preserves `o` names and writes real facegroup `g` values. Test
  object names and groups independently, including multi-object import behavior;
  do not restore synthetic groups just to recover an old adjacent text sequence.

## What is passing — and its limits

| Coverage inspected in this run | Result |
| --- | ---: |
| Through + cavity contract | 16 / 16 |
| Bridge closed/unequal/open-chain/transactional suites | 85 / 85 |
| Current Face/Edge Bevel preview/session fixture suite | 21 / 21 |
| Loop repeat fixture | 1 / 1 |
| Beta 6 exact Move/Rotate/Scale Undo/Redo and GLB channels | 4 / 4 |
| Native NOM export and delivery | 9 / 9 |

These are selected existing suites, not newly independent acceptance gates. Many
other passing checks are textual too. No real Safari/Pencil run was performed;
mocked owners cannot prove native event dispatch, GPU rendering, iOS Open In or
all densely edited meshes. Through includes saved double-Knife/Loop fixtures, but
that is not a live Knife gesture → Loop editing acceptance test.

## Reliability risks and next build order

1. **Restore a useful test signal first.** Centralize shell/version checks; fix old
   pin assertions without changing protected runtime pins. Convert aggregate
   scripts, replace superseded source checks with semantic behavior checks, and
   give recovery snapshots explicit archival scope. Keep `npm test` failing until
   genuinely reconciled; no blanket skip, deletion or exclusion to claim green.
2. **Close CI coverage gaps.** The current workflow triggers for a narrow list of
   topology sources, tests, package and index. Many other runtime-only changes do
   not trigger it. Expand triggers to all runtime sources/CSS/shell/export assets.
   CI uses Node 22, this audit Node 24; repeat on the CI runtime after reconciliation.
   Pages deployment currently succeeds independently of failing regression tests.
   Require a validated release gate before publishing release candidates once the
   active suite is trustworthy; retain manual iPad acceptance.
3. **Modelling reliability batch.** Prioritize edge-chain/junction Bevel, repeated
   Bevel after Knife/Loop edits, and actual Knife → Loop editing sequences. Existing
   Bevel fixtures cover simple selections and lifecycle; extend diverse topology,
   non-manifold/degenerate rejection and unchanged source on failure. Bridge and
   Through have substantial passing kernel coverage; add combined-operation
   fixtures and event/history coverage before altering those accepted algorithms.
4. **History and handoff batch.** Actual scene Boolean/Extract/Array Undo/Redo and
   failed/cancelled preview transactions; retain GLB channel tests and extend OBJ
   object/group round trips and NOM multi-object checks. Keep rich-data limits
   explicit and verify Open In on iPad.

Each batch should report total/passed/failed tests, newly introduced failures,
resolved failure reasons and remaining behavior investigations separately.
Stable counts do not prove the change is safe. No new user test is needed for this
read-only audit; main and frozen Beta 6 remain .736.

## Reproduce

```sh
node --test --test-reporter=junit tests/*.test.mjs > /tmp/boxlab.xml
python scripts/audit-test-results.py /tmp/boxlab.xml /tmp/boxlab-inventory.json
```

The test command is expected to exit 1 at the audited baseline. The inventory tool
only describes the output and does not convert a failing run into a passing gate.
