# .1154 — automatic headless subdivision comparison — 13 November 2026

- [x] Playwright driver targets the actual subdivision comparison HTML page, starts Compare, and validates all 11 workload rows, exact-parity flags, five measured pairs and output cap.
- [x] Topology workflow installs Chromium, runs the headless benchmark automatically and uploads the JSON report as a run artifact. The report labels Chromium/headless/runner metadata and keeps the comparison `LAB_ONLY`.
- [ ] Hosted verification: confirm Topology passes and the subdivision report artifact is attached. Local `npm test` passes 3,436/3,436; local browser launch is sandbox-blocked, so hosted Chromium execution is the actual-browser gate.
- [x] User .1153 PASS protects Safari `.boxlab` save/open, including `.boxlab.json` compatibility. No manual benchmark click/download/upload is required for CI evidence.

---

# .1153 — Safari .boxlab extension repair — 13 November 2026

- [x] Existing save owner keeps its encoded JSON content, in-memory round-trip validation and requested `.boxlab` name; Blob MIME changes to `application/octet-stream` to avoid Safari `.json` suffix inference.
- [x] Existing Open owner accepts both `.boxlab` and legacy Safari `.boxlab.json`; saved project name strips either suffix.
- [x] Focused save/open and release/cache pin checks 30/30 PASS; syntax and diff checks PASS.
- [x] Full local suite 3,435/3,435 PASS (79.436s), zero failures/cancelled/skips. Hosted Topology `43322391711` passes 3,435/3,435 (223.126s); Pages `43322391266` succeeds; six changed live assets byte-match.
- [ ] Manual Safari: Save .boxlab, confirm filename ends in `.boxlab` only, then reopen it in BoxLab. Optional: reopen an existing `.boxlab.json` file. Chrome regression is covered by filename/payload assertions; iPad Safari needs the physical browser.

---

# .1152 — dense-input WASM comparison at output cap — 12 November 2026

- [x] Preserve .1151 user-PASS inward shoulder corner repair and single-region behavior.
- [x] Add 4,096 source faces at level 1, exactly 16,384 output faces, alongside 1,024 source faces at level 2; original nine workloads and phase-profile run remain unchanged.
- [x] Compiled candidate test verifies exact JS output parity, 5 samples, source immutability, 16MiB linear memory cap and source/output bounds.
- [x] Focused release/comparison checks 22/22 PASS. Full local suite 3,435/3,435 PASS (245.152s); hosted Topology run `43223351459` passes 3,435/3,435 (261.364s); Pages run `43223344279` succeeds; eight changed live assets byte-match source.
- [x] Native iPad report received (iPadOS 27.2, DPR 2): all 11 workloads, including 4,096/level-1 and 1,024/level-2 at 16,384 outputs, completed with exact parity and unchanged source.
- [x] New 4,096/level-1 row: JS median 7 ms / p95 8 ms; WASM median 7 ms / p95 7 ms; 0% median reduction, therefore row decision FAIL for speed. The 1,024/level-2 row is CONDITIONAL (9/8 ms medians; p95 11/11 ms). Aggregate stays LAB_ONLY. Initialization 306 ms was excluded.
- [ ] User has not explicitly marked the workflow PASS/FAIL; do not treat timing FAIL as correctness failure. Keep the raw device report private and do not repeat the same benchmark to chase timing.

---

# .1151 — four-region inward corners and bounded high-input comparison — protected PASS — 12 November 2026

- [x] Existing .1131 single-band inward corner behavior remains protected; new four-disconnected-band regression verifies diagonal shoulder joins, source immutability, valid topology and preserved volume.
- [x] Comparison page adds 1,024 source faces at level 2 (16,384 outputs); original nine comparisons and phase-profile run remain unchanged. Candidate stays .1150, binary .1148 and production subdivision JavaScript.
- [x] Focused tests 19/19 PASS, including release pins, legacy nine-case parity/binary, new high-input exact parity, and both inward corner suites.
- [x] Full local suite 3,434/3,434 PASS (86.804s), zero failures/cancelled/skips after updating current release/cache expectations and the intentionally expanded comparison page.
- [x] Hosted Topology run `43216291191` passes 3,434/3,434 (324.024s); Pages build/deploy run `43216644179` succeeds; 11 live release/cache-busted assets byte-match source.
- [x] User confirms PASS. Protect four-region diagonal joins and existing single-region inward-corner behavior. Keep raw native comparison JSON private.

# .1150 — direct WASM input-span population — 12 November 2026

- [x] Existing .1148 compiled-kernel exact parity, creases, n-gons, groups, limits, cancellation, zero-median and binary reproducibility regressions remain active.
- [x] .1149 direct output/source/memory ownership checks remain active.
- [x] .1150 captured canonical edge fields and face-edge IDs directly from WASM spans; verified original order, non-manifold/n-gon indices and exact production JS parity.
- [x] Existing .1150 comparison page has versioned candidate import, report release, download name, completion/cancel/unavailable paths.
- [x] Focused34/34 PASS; one desktop run retained, mixed/noisy. No repeated run or performance promotion claim.
- [x] Full local Node regression3432/3432 PASS (130.025s); syntax, diff and protected-byte checks PASS.
- [x] Hosted Topology `43201001744` passed3,432/3,432 (227.044s); Pages `43201001018` succeeded; nine changed live assets byte-match runtime commit `3d83610e0288bed03efafefe87607b6b70ff547d`.
- [x] User PASS protects native .1150 comparison workflow and SubD/Move/UndoRedo/edge DRAG -> puck -> gizmo smoke. All nine workload pairs report exact parity.
- [x] Keep performance outcome distinct: overall `LAB_ONLY`; most small workloads FAIL/INCONCLUSIVE, larger workloads REVIEW/CONDITIONAL. No production promotion.

---

# .1149 — reduce subdivision bridge coordinate allocations — 12 November 2026

- [x] Existing bounded nine-case irregular geometry/creases/groups parity and source immutability coverage remains active; original WAT binary reproducibility unchanged.
- [x] Real output is EditableMesh with distinct mutable Three Vector3 instances; no source or WASM alias after explicit memory growth/overwrite; clone/Move and metadata independence verified.
- [x] NaN/+Infinity/-Infinity on every input axis refuses before kernel execution.
- [x] Same complete timing boundary, two warm-up/five alternating measured pairs, caps, zero-median INCONCLUSIVE, unavailable/cancel recovery and all9-case export retained. Candidate revision1149 is identified in JSON notes; binary stays1148.
- [x] Focused32/32 PASS. Desktop timing mixed; largest REVIEW is not promotion.
- [x] Final full local3,430/3,430 PASS, zero failures/cancelled/skips (89.699s); syntax/diff/protected byte checks PASS.
- [x] Pages43186272095 SUCCESS; nine cache-busted live assets byte-match source.
- [x] Hosted topology43186273655/job131074093956 SUCCESS:3,430/3,430 PASS, zero failures/cancelled/skips; runtime checkout verified. See publication1149 evidence.
- [ ] Native1149 comparison JSON, then SubD/Move/UndoRedo/edge DRAG/puck smoke. No device PASS inferred from .1148 correctness or desktop REVIEW.

Audited main `5de50994` (runtime .1148 `d90e98a1`), current release markers, live shell, cache graph and existing subdivision/mesh/lab owners. User `/nextbuild` authorizes this narrow follow-up. Existing public .1147 profiling and .1148 complete-operation trial identify bridge preparation/reconstruction as candidate overhead; this build removes specific temporary coordinate arrays found by source audit. Device evidence was reviewed privately and is not part of this publication. No overall UI PASS, safe capacity or promotion inferred. .1146 packing remains rejected. Protect .1145 edge selection and .1142 puck/gizmo acceptance.

---

# .1148 — complete bounded subdivision JS/WASM trial; .1147 iPad profile recorded — 12 November 2026

FINAL .1148 local validation/publication: focused84/84 PASS including unchanged1140 mesh-loading contract; final clean full local3,428/3,428 PASS,0 failures/cancelled/skips (110.041s). This supersedes the pre-fix one-failure run, without weakening that test. Runtimed90e98a1633ee48a52af64c3df4a10daeffcfba2, tested tree060c56e95301c6e194171b89969685bbdd576198. Pages43123360382 build130869138330/deploy130869342489 SUCCESS. Eight checked live cache-busted assets byte-match source: version.json, index.html, Performance monitor, lab UI, original benchmark page, new lab module, actual1733-byte WASM kernel and unchanged production subdivision owner. Protected main/mesh/subdivision/Edge sweep/gizmo/Multi remain byte-identical to1147. docs/publication-1148.json records hosted regression43123361515/job130869137926 status and exact evidence. Desktop mixed/largest FAIL, native iPad comparison pending; no production promotion or speed/capacity claim. Ready for Profile subdivision -> Compare JS / WASM -> Download JSON, then ordinary modelling smoke. This final proof update changes documents only, retaining tested runtime bytes.

Audited main4c43b3d3/runtime6e691aca, current1147 shell/script/import-map graph, AI workflow/handoff/checklist/roadmap/recent history and original subdivision/mesh/benchmark owners. User .1147 iPad profile preserved at docs/performance-subdivision-ipad-1147.json: all9 baseline cases completed, source/output parity PASS; largest256-source L3->16384 faces median12ms,5-sample assembly25ms/vertex-points14ms/edges7ms totals. Timer~1ms. This is profiling correctness, not a blanket UI/native speed PASS. Do not infer navigation lag/capacity solved. .1145 selection and .1142 puck/gizmo remain protected; .1146 packing pilot remains rejected.

User /nextbuild now implements a real complete-operation subdivision WASM comparison, opt-in ONLY on SAME docs/subdivision-benchmark-1036.html. Performance Lab > Profile subdivision > Compare JS / WASM. Existing JS phase Run benchmark and exports retained; page1148 with mutually disabled run buttons, cancellation/hidden-tab/error recovery, full JSON download. Original9 cases16/64/256 source quads, levels1–3, output<=16384 faces,1200ms single-operation guard unchanged. Comparison2 warm-up pairs +5 alternating measured pairs per case. Unresolved zero timing medians INCONCLUSIVE, never Infinity/false PASS. Partial/error comparisons never download as success.

New src/subdivision-wasm-lab.js wraps real mesh.edges, finite input/index checks, CSR topology/incident-face/edge preparation, bulk copy to retained linear memory, ONE compiled batch per level, independent EditableMesh reconstruction and original-order crease/group propagation. Compiled src/wasm/subdivision-step.wasm (1733 bytes), human-readable WAT port of original .1147 Catmull–Clark formulas; F64 operation order retained, face points/edge points/vertex points and quad indices generated in WASM. Boundary, 1/2/3+ crease rules, stable tie order and original face/edge indexing tested. Lab port is a benchmark candidate, NOT another live modelling owner. Production src/subdivision.js/main/mesh/UV kernel unchanged. No live WASM route; no UV interpolation path. No editable-capacity, GPU, scene/cage/history or gesture claim.

End-to-end candidate timing starts BEFORE input/size preflight and initial clone; includes input conversion/validation, allocations/CSR/mesh.edges, copies, WASM, materialization of independently owned output, metadata and intermediate levels. Same authoritative uninstrumented JS subdivide is reference. Every measured/warm-up pair checks EXACT coordinates including sign/order, face indices, crease/group insertion/order and source snapshot outside timing. Report retains raw5 pairs/order, per-level preparation+copy/kernel/reconstruction, required/committed linear memory and raw output-coordinate/index byte proxies. JS temporary staging, Vector3/array/Map object heaps, GC/GPU and total Safari RAM are not measured; do not call compact proxies total memory or infer safe capacity. Module hard limit16MiB, output cap16384, source vertices<=20000. Comparison validates bounds BEFORE invoking potentially expensive JS baseline; standalone candidate also caps before clone/allocation. Cancel is cooperative between synchronous calls, cannot interrupt one step. Fetch/cache/compile/instantiate time and binary bytes reported separately; unsupported/network/invalid module -> clear unavailable, production JS unaffected.

Build npm run build:wasm:subdivision uses already pinned dev-only wabt1.0.39; source-to-binary exact reproducibility regression, no compiler/CDN runtime dependency. Existing body pilot build untouched. No C/Rust toolchain adopted before proof of value; small WAT module reuses established build path. WAT is authoritative port source; raw temporary loop-generation helper is not required to reproduce binary.

Desktop actual-page driver scripts/benchmark-subdivision-wasm-1148.mjs -> docs/performance-subdivision-wasm-1148.json is MIXED and NOT accepted for promotion. Final largest256/L3 JS29.066ms versus WASM42.295ms (-45.51% reduction, FAIL). Two rows REVIEW>=25%, two CONDITIONAL10–24%, five FAIL incl largest. Short desktop cases and large sample variance are not native acceptance; allocation/GC or scheduling contributions are not independently measured. Initial prototype raw report retained docs/performance-subdivision-wasm-trial-1148.json (largest FAIL -33.6%); pre-alias run retained docs/performance-subdivision-wasm-pre-alias-1148.json (largest FAIL -29.84%). Reruns follow code changes: adding all-operation preflight timing/caps, then repairing constructor/import-map contract. No gate/warm-up/sample change, no retries to green. Final driver and candidate share canonical mesh module, matching browser import-map identity. Do not cherry-pick middle/kernel-only wins. Extra retained WASM at largest~1.44MiB; not comparable to1146's different-size body fixture or total RAM. Memory/reliability/native gates remain separate. All9 rows exact correctness PASS. Next collect complete iPad comparison; reject port if gains do not repay bridge/reconstruction and extra memory. No production promotion based on desktop REVIEW rows.


Full-suite audit caught the new module's explicit mesh.js?v=0.12.1140 import missing the protected shell map's source-key coverage. Repaired new lab module to use EXISTING unversioned ./mesh.js alias; app and standalone page already map this to canonical1140, preserving two established constructor identities. Did not weaken body-packing1140 test or add a third identity. Add that four-test file to focused coverage:84/84 PASS. Pre-fix full run had ONE failure (3427PASS/3428 total); it is superseded only after clean final full validation. Zero-median clock cases are explicitly INCONCLUSIVE. Expanded crease tests include all12 cube edges (3+ branch) and equal-strength two-edge ties.

Six new regressions execute actual compiled module: all9 irregular grids/levels; exact fractional geometry/boundaries/n-gons/nonmanifold/isolated vertices/crease strengths incl >1 and stable ties/groups; output independence under memory reuse/source immutability; source/output/level/index/finite guards, unavailable loaders, cancellation/parity rejection; complete raw pairs/stages/memory; deterministic WAT binary; actual page full9-case JSON plus cancel/unavailable recovery. Existing1147 page-test/desktop harness mocks only add new button ID. No original behavioural coverage removed. Focused84/84 PASS; full validation follows.

Release1148 markers and canonical release-version -> Face workflow -> drawer/comparison closure refreshed; Performance monitor -> lab UI -> original benchmark page1148 -> new candidate/binary1148 reviewed. Production subdivision import map/alias1147 and source unchanged; profile source1147, mesh aliases1140, main/picker1144, Edge sweep1145, Pencil gate1100, gizmo1142, Paint1137/radial1135, cage930 and Multi0.36.1.0 retained exactly. Frozen betas untouched. Standalone benchmark continues canonical mesh1140 mapping. Initial WAT syntax errors were fixed before validation; no compiler/library install added beyond existing wabt.

DEVICE1148: VIEW > Diagnostics > Performance Lab > Profile subdivision > Compare JS / WASM. Let bounded9 cases finish; Download JSON and share. FAIL/INCONCLUSIVE/REVIEW are timing results, not app errors or promotion. Return to app; normal SubD preview, Move/UndoRedo and concave selection/puck gizmo smoke. Native benchmark correctness/speed/memory pending; no further packing trial required. Next follow complete device evidence; keep JS authoritative unless full-operation and memory/control gates support explicit promotion.

---

# .1147 — profile the existing subdivision owner; .1146 iPad packing candidate rejected — 12 November 2026

FINAL .1147 local validation/publication: focused74/74 PASS; full local3,422/3,422 PASS,0 failures/cancelled/skips (267.112s). Runtime6e691aca8167db11e8ca6116cecb8461494931e2, tested tree5b662aab11e3a2251ddefa46962b3933fa2c5458. Pages43118910661 build130854033271/deploy130854247009 SUCCESS. Six checked cache-busted live assets byte-match source: version.json, index.html, Performance monitor, lab UI, subdivision owner and original1036 benchmark page upgraded1147. Current main/protected mesh/Edge/gizmo/Multi bytes unchanged. docs/publication-1147.json records hosted regression43118911555/job130854029567 status and exact evidence. Diagnostic-only phase baseline; no WASM promotion/speed gain/capacity result. Target iPad subdivision profile pending;1146 iPad packing FAIL is now preserved and rejected. Ready for Profile subdivision -> Run -> Download JSON, then return to ordinary SubD/Move/UndoRedo/selection smoke. This final proof update changes documentation only, retaining validated runtime bytes.

Current source audited from main8e808c34/runtime9d340e55, release1146 and live script/import-map pins. User supplied all3 target-iPad reports, now preserved exactly in docs/performance-wasm-body-ipad-1146.json. Positions/normals correctness PASS; COMPLETE body speed gate FAIL at10k/50k/100k: JS medians1/2/3ms versus WASM2/2/4ms, extra retained WASM0.625/2.875/5.75MiB. Millisecond quantization prevents precise percentage claims. This rejects the packing bridge for production, not WASM generally. No user blanket functional PASS for1146 was stated; do not convert benchmark correctness into native UI/performance/capacity acceptance. Protect existing1145 selection PASS and1142 puck/gizmo workflow.

Audit found existing docs/subdivision-benchmark-1036.html (and separate UV1038) already calls the authoritative Catmull–Clark owner. Reuse/upgrade1036, not a parallel subdivision/WASM kernel. Add Profile subdivision link in existing VIEW > Diagnostics > Performance Lab; same original historical page and File test-list link remain. Page now1147, two warmups/five ordered samples per existing9 cases, phase raw spans, source immutability and production-output/count checks, Download JSON, Cancel, error/hidden-tab control recovery. Original caps remain16/64/256 source quads, levels1–3,16384 output faces,1200ms single-operation stop (now applies to warmups too). Calls remain synchronous between yields: Cancel takes effect at next yield, cannot interrupt one running step. No project/live selection/history/resources touched.

src/subdivision.js adds optional observer to SAME private catmullClarkStep and diagnostic-only profileSubdivide export. Stage boundaries: initial input clone, per-step clone, mesh.edges, face points, edge points, adjacency, vertex points, assembly incl result EditableMesh construction/crease/group propagation. No arithmetic, ordering, topology, UV algorithm, crease/group handling or production signatures changed. No alternate subdivision implementation. Ordinary subdivide/catmullClark/subdivideWithCornerUVs pass no observer: no timers/phase allocations; only optional null checks at stage boundaries. The diagnostic total includes clocks/callbacks; spans include allocations/GC and observer overhead, not pure kernel cost. UV interpolation excluded. Zero spans reflect timer granularity, not zero work; do not add phase medians. This is BASELINE_ONLY, no WASM speed gain or full gesture/GPU/capacity claim.

scripts/benchmark-subdivision-profile-1147.mjs drives ACTUAL page script with minimal DOM and native imported owner, retaining9 raw rows at docs/performance-subdivision-profile-1147.json. Largest256-source L3 ->16384 faces median74.73ms in first desktop run; assembly largest accumulated span170.57ms across5 samples, vertex points68.01ms. Baseline/no candidate, no desktop acceptance extrapolated. Next collect same bounded iPad JSON, then choose target using full owner time AND bridge/memory costs. Assembly dominance suggests moving arithmetic alone may not repay conversion. Do not optimize this benchmark until green or declare navigation lag diagnosed from synthetic subdivision. Existing complete viewport report/trace remains owner for real scene stalls.

Two new regression tests execute SAME production/profiled outputs for boundaries, fractional/full creases, facegroups, n-gons and levels0–3 without source mutation, verify phase count/order, and execute actual page for9-case JSON export, five samples, Cancel/hidden-tab recovery. Existing1036 geometry assertions retained, one import-contract assertion updated for reviewed diagnostic export/pin. Original UV1037/1038 and topology tests remain active.

Release1147 markers and canonical release-version -> Face workflow -> drawer/comparison closure refreshed. Performance monitor -> lab UI1147; pilot WASMJS/binary1146 unchanged. Import map redirects both unversioned subdivision and explicit historical1037 key to1147, so unchanged main/Multi/export parents resolve same reviewed current owner without disturbing protected files/pins. Standalone benchmark pins subdivision1147 and maps mesh to accepted1140. Main/picker1144, Edge paint1145, original Pencil gate1100, gizmo1142, mesh aliases1140, Paint1137/radial1135, cage930 and Mul