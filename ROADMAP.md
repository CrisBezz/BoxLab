Warning: truncated output (original token count: 248991)
Total output lines: 11101

# BoxLab Roadmap — .1168

## Current coordinated releases

- Standalone Helios Studio `0.1.4 PASS` remains the protected upstream base at
  `0e79c5163e5d87703d369250e1a9fff9e2b9085f`.
- BoxLab `.1165 PASS` protects the 0.1.4 texture replacement/previews, mapping,
  relief, emitter transparency and `.1164` menu styling; `.1163 PASS` protects the
  28-material gallery.
- BoxLab `.1166` adds a dedicated Metalness preview/replacement slot; the user confirms
  map addition/replacement passes. Cris confirms `.1167 PASS`, protecting uploaded-map
  persistence and Restore ordering through PBR/Helios rebuilds.
- BoxLab `.1168` adds separate render-session scalar Surface opacity for non-emissive
  materials, with matching PBR and ray-trace behavior. Emitter opacity stays separate.
  Standalone Helios remains at the accepted 0.1.4 base; no saved BoxLab material is changed.

## Current focus

## .1168 focus — non-emissive surface opacity

The Materials tab exposes Surface opacity only when emission is off. Its default is the
imported GLB material alpha (or fully opaque when absent); changes apply to the existing
PBR preview and path tracer/shadow rays, remain transient, and are not exported to
BoxLab project materials. Emissive surfaces retain their independent Emitter opacity
and pass-through behavior. Opacity texture maps remain a separate future step.

The importer now transfers both source glTF scalar maps independently into packed
roughness G and metalness B, instead of silently selecting one when both exist. The
existing dock offers separate grayscale previews and replacement controls. Each
replacement updates only its own channel; the other channel and the preset below it
remain. The path tracer uses its existing custom-metalness flag, and the PBR preview
shares one packed texture between Three.js roughnessMap and metalnessMap. No second
texture array, renderer, project schema or UV unwrap was added. The `.1166` packed-channel checks passed 26/26 and its full suite passed 3,450/3,450.
`.1167` focused checks pass 29/29 and the full local suite passes 3,453/3,453; hosted
Topology `43692331821` and Pages `43692331687` succeed. Cris confirms `.1167 PASS`.
For `.1168`, focused checks pass 36/36 and full local `npm test` passes 3,455/3,455
(118.917s), zero failures/cancelled/skips. Bundle build, changed-JS syntax, release
asset contract and `git diff --check` pass. Hosted Topology `43696493623` passes
3,455/3,455 on runtime commit `b0097ecfd7e0a2cc11378c25252da2faa6008a2e`; headless
Chromium comparison reports 11/11 exact parity (`LAB_ONLY`), artifact
`subdivision-wasm-headless-43696493623` (ID `14155021519`). Pages run `43696493446`
succeeds; main `version.json` is `.1168`. Native iPad visual acceptance remains
pending.

## Next-build ideas

1. Consider an opacity/alpha map slot with preview, replacement and map-persistence
   behavior matching the existing Helios texture owners.
2. Evaluate true height displacement only with a bounded subdivision/BVH rebuild
   design and representative iPad memory/performance gates.

The `.1168` scalar-opacity extension is BoxLab VIEW integration work; keep its
render-session state out of saved BoxLab scene data. Develop any future standalone
material-map feature in Helios Studio first, then port its accepted behavior through
BoxLab's vendor bundle/adapter.

---

# .1159 — Helios right-side controls — 14 November 2026

User accepts the `.1158` BoxLab palette/type styling and reports the bottom dock is obscured by the mode controls. `.1159` keeps the same authoritative dock/action owner and moves its panel to the familiar upper-right BoxLab menu position with a scrollable body and safe-area spacing. The `.1156` ray-trace view and `.1157` controls remain protected; saved scene/material ownership is unchanged. Focused Helios/release checks pass 17/17; full local and hosted Topology suites pass 3,440/3,440, zero failures/cancelled/skips; syntax and diff checks pass. Pages run `43535834843` succeeds and runtime commit is `a328e77a4350cece6a690e0e0f3623bc50898510`. Hosted Chromium comparison completes 11/11 parity (`LAB_ONLY`). Live browser confirms the upper-right panel; native iPad panel/trace acceptance remains pending. Hands-on acceptance should check panel visibility, tabs/actions, scroll and coexistence with viewport controls at iPad portrait/landscape sizes.

---

# Current focus — .1153 Safari project-file suffix — 13 November 2026

Fix the observed iOS Safari filename `BoxLab_Model.boxlab.json` by keeping the existing JSON codec/payload and changing only the downloaded Blob MIME to `application/octet-stream`. Open retains compatibility with already-suffixed `.boxlab.json` files. Focused save/open + release checks pass30/30. Full local suite passes 3,435/3,435 (79.436s); hosted Topology `43322391711` passes 3,435/3,435 (223.126s), Pages `43322391266` succeeds, and six changed live assets byte-match. Physical Safari filename/open check remains pending. Manual Safari filename/open check remains necessary because automated CI cannot access the user's physical iPad; no further benchmark rerun is needed. .1152 native results remain LAB_ONLY, with production subdivision in JavaScript.

---

# Current focus — .1152 compare larger input at the same output cap — 12 November 2026

User .1151 PASS is protected for disconnected inward-corner diagonals and the existing single-region repair. .1152 adds a bounded 4,096-source-face, level-1 comparison beside 1,024-source-face, level-2; both stop at 16,384 outputs. This measures a different source-topology size while keeping output work fixed. Existing WASM candidate and binary remain .1150/.1148; production subdivision remains JavaScript. Focused tests pass22/22; full local suite passes3,435/3,435 (245.152s); hosted Topology run `43223351459` passes3,435/3,435 (261.364s) and Pages `43223344279` succeeds; eight changed live assets byte-match. Native iPad comparison is complete: all 11 workload parity checks pass, but the new 4,096/level-1 row is 7 ms median for both JS and WASM (0% reduction; row FAIL for speed). The 1,024/level-2 row is CONDITIONAL (9 ms JS, 8 ms WASM; matching 11 ms p95). The full result remains LAB_ONLY. Keep production subdivision in JavaScript; do not repeat the same timing workload or infer capacity from the memory proxy.

---


# Current direction — .1150 native validation

The user supplied a mixed native .1149 comparison; its raw report remains private. Build .1150 removes two flattened JS input arrays from the lab bridge by writing edge fields and face-edge IDs into existing candidate memory. Exact parity is covered, focused checks pass34/34, and full local regression passes3432/3432. The single desktop comparison run is noisy and inconclusive despite parity. Production JavaScript remains authoritative. Hosted Topology `43201001744` and Pages `43201001018` succeeded for runtime commit `3d83610e0288bed03efafefe87607b6b70ff547d`; nine changed live assets byte-match. Native .1150 comparison and short modelling smoke now PASS and are protected. All nine workload pairs report exact parity, but the report remains `LAB_ONLY`: timing does not meet the promotion gate across the workload set. Keep the WASM trial isolated and production subdivision in JavaScript. Do not repeat the same benchmark; the next build should follow a separately measured bottleneck, with performance, memory and reliability gates intact.

---

# .1149 — reduce subdivision bridge coordinate allocations — 12 November 2026

Publication: runtime `b995e595`, Pages43186272095 SUCCESS; nine live assets byte-match source, local3,430/3,430 PASS. Hosted regression43186273655 SUCCESS:3,430/3,430 PASS; native1149 benchmark remains the next gate.

Current next step: measure .1149 bridge allocation reduction on the same bounded native iPad comparison. Production integration remains gated on complete native performance, memory and reliability evidence. .1149 removes coordinate staging/triplet arrays around the unchanged existing lab kernel; JS remains authoritative in the app. Desktop largest REVIEW43.55% is only a reason to collect native evidence, with unchanged extra linear-memory requirements. Preserve honest FAIL/INCONCLUSIVE results and full-operation gates; do not optimize the chart until green. If native benefit remains conditional or memory/control gates fail, reject this bridge for production and follow measured existing-owner bottlenecks before another port. No larger editable-capacity, viewport/gesture, UV or GPU claim.

DEVICE1149: VIEW > Diagnostics > Performance Lab > Profile subdivision > Compare JS / WASM; let all9 finish, Download JSON and share. FAIL/INCONCLUSIVE are valid results. Return to model: SubD preview, Move/UndoRedo and edge DRAG -> puck -> gizmo smoke. No larger stress fixture or packing repeat required. Do not promote from desktop or short timing-only wins.

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

Release1147 markers and canonical release-version -> Face workflow -> drawer/comparison closure refreshed. Performance monitor -> lab UI1147; pilot WASMJS/binary1146 unchanged. Import map redirects both unversioned subdivision and explicit historical1037 key to1147, so unchanged main/Multi/export parents resolve same reviewed current owner without disturbing protected files/pins. Standalone benchmark pins subdivision1147 and maps mesh to accepted1140. Main/picker1144, Edge paint1145, original Pencil gate1100, gizmo1142, mesh aliases1140, Paint1137/radial1135, cage930 and Multi0.36.1.0 retained. Validation/publication follows.

DEVICE1147: VIEW > Diagnostics > Performance Lab > Profile subdivision (new tab). Run benchmark, Download JSON and share. Optionally Cancel and rerun. Return to model: SubD preview plus Move/UndoRedo and Face DRAG -> puck -> gizmo smoke. No new WASM speed test or speedup expected; this identifies a worthwhile heavier target. Next follow iPad profile; keep packing candidate rejected.

---

# .1146 — real opt-in JS/WASM pilot; .1145 protected PASS — 11 November 2026

FINAL .1146 local validation and publication: focused75/75 PASS; full local3,420/3,420 PASS,0 failures/cancelled/skips (170.077s). Runtime9d340e55bfbf40f4b3ff6fbc33025e2f41eb8a9e, tested treed3a44bbc9732eff19f7287dd02a8cecae9908da8. Pages43023878707 build130533558603/deploy130533784772 SUCCESS. Six live cache-busted assets byte-match source: version.json, index.html, Performance monitor, lab UI, WASM pilot JS and actual133-byte WASM binary. Protected main/mesh/Edge sweep/gizmo/Multi remain byte-identical to .1145. docs/publication-1146.json records hosted regression43023879760/job130533555072 status and final evidence. All desktop timing gates FAIL honestly; the module stays opt-in lab-only. Native iPad measurements remain pending, with no speed or editable-capacity claim. This proof update changes documents only, retaining validated runtime bytes. Build complete/live/ready for10k/50k Compare JS / WASM -> Download JSON and accepted selection/gizmo smoke.

User PASS protects .1145 Visible Edge sweep responsiveness and existing .1141 concave front targeting, .1142 Face DRAG -> puck -> transform gizmo, .1143/.1144 picker work. User asks whether WASM has been ruled out: NO. The JS work was prerequisite measured waste removal; current direction now advances from B0/B1 to W0/W1 proof of value, not an indefinite queue of tiny JS tweaks.

Audited current main296116de/runtime61ad9281, markers1145, script/cache graph, existing Performance Lab1096/UI1106 and mesh1140 packing owner. No runtime WASM module existed. Read BOXLAB_WASM_PERFORMANCE_HANDOFF.md: retain JS fallback, complete transfer/allocation/kernel/copyback costs, exact parity, raw matched samples, memory proxies and native iPad gates. Reuse VIEW > Diagnostics > Performance Lab; new Compare JS / WASM is opt-in only. No production mesh, picker, gesture, cage, history, Paint, export or modelling kernel changes. Existing baseline and viewport reports remain available.

W0: checked-in src/wasm/body-pack.wat and reproducible body-pack.wasm, built by npm run build:wasm with exact dev-only wabt1.0.39. No compiler/CDN runtime dependency. Fetch bytes then WebAssembly.instantiate avoids MIME-specific streaming dependence. Reports binary bytes and fetch/compile/instantiate duration, including browser cache if applicable. Failure reports UNAVAILABLE and JavaScript remains active. Original app never routes to WASM. Maximum linear memory16MiB; fixture sizes10k/50k/100k; no worker/shared-memory/cross-origin requirements.

W1 pilot packs the original fan index order from Float64 editable positions to independent Float32 geometry and calls the same Three computeVertexNormals. JS reference is original mesh.triangulatedGeometry, unchanged. Every pair checks byte-exact positions AND normals outside timing; fixture fingerprint unchanged, outputs disposed. Two warm-up pairs then seven alternating JS/WASM measured pairs. WASM total includes input conversion/allocation, fan indices, bulk memory writes, kernel call, independent copyback and original Three geometry/normals. JSON retains raw samples/order, stage times, initialization and committed/required linear memory plus output-byte proxy. This is complete CPU BODY construction, not full scene/cage rebuild, GPU, navigation or editable capacity. Extra retained linear memory is additional overhead; never call these figures total Safari RAM.

Gates fixed before native testing: >=25% complete body reduction -> REVIEW only,10–24% CONDITIONAL,<10% FAIL; exact parity mandatory. Neither REVIEW nor conditional permits production promotion: target iPad reliability, complete-app controls and memory acceptance still required. Historical <=10% comparable-memory overhead budget and <=5% unaffected-path regression gates remain promotion requirements; this pilot has EXTRA linear memory and fails the current speed gate. No WASM speed/capacity claim.

Desktop first run scripts/benchmark-wasm-body-1146.mjs -> docs/performance-wasm-body-1146.json FAIL all3 sizes:10k -13.37%,50k -11.82%,100k -165.57% median reduction (negative=slower). Original raw samples retained, no retries to green or threshold relaxation. Extra committed linear memory0.625/2.875/5.75MiB respectively. Do not promote THIS packing-only bridge: newly optimized JS1140 is cheap and transfer/validation costs dominate. These are noisy short desktop Node samples, not iPad verdicts or evidence against WASM globally. Next: collect target-device JSON, then identify a heavier batch/resident-data operation from real profiling; prefer existing owner, avoid duplicate topology kernels. Do not merely optimize this lab until its chart turns green.

Five new regression tests cover actual compiled module parity across cube/n-gon/degenerate/empty faces, independently owned output despite later memory reuse, invalid index rejection, unavailable/network/invalid-module fallback, alternating report samples/cancellation/parity rejection, deterministic source-to-binary reproducibility and actual UI failure/export/control recovery. Existing lab baseline/viewport tests retained. Release1146 shell and Performance monitor -> lab UI -> pilot -> binary closure reviewed/repinned; core1096 unchanged. Canonical release-version -> Face workflow -> drawer/comparison1146. Protected main/picker1144, Edge paint1145, original Pencil gate1100, gizmo1142, mesh aliases1140, Paint1137/radial1135, cage930 and Multi0.36.1.0 unchanged. Validation/publication proof follows.

DEVICE1146: open VIEW > Diagnostics > Performance Lab; Compare JS / WASM at10k, Download JSON; repeat50k only if comfortable. A FAIL report is a valid measured result, not app failure. Confirm model unchanged, Cancel recovers controls, normal selection/navigation and Face DRAG puck -> gizmo still work. Share JSON for next decision. Native performance and memory acceptance pending.

---

# .1145 — Visible Edge sweep uses accepted first-hit policy; .1144 protected PASS — 11 November 2026

FINAL .1145 publication/validation VERIFIED through connected GitHub: hosted Topology43020923451 / job130523627342 checked out runtime61ad928196c8a131281eee03e151feba1f680f0b and completed3,415/3,415 PASS,0 failures/cancelled/skips (188.654s); exact log totals inspected. Local focused56/56 PASS. Local full run started but its final totals were unavailable after workspace transport disconnected; do not claim a completed local full run. Pages43020923245 build/deploy SUCCESS. Current main version.json, HTML title/data/visible marker, Edge paint1145 pin and source blobs match the tested published release; main/picker1144, original Pencil gate1100 and gizmo1142 retained. No direct public-CDN byte comparison completed: workspace was unavailable and alternate fetch tools could not read Pages; no20-file live-byte identity claimed. See docs/publication-1145.json. Build complete/published/ready for Pencil Edge sweep -> release/navigation, Visible/Through targeting and accepted Face DRAG -> gizmo tests. Only the sampler policy ships; bounds experiment is fully rejected/restored, its five correctness tests explicitly historical. Continue from remote main; reconnect/clone rather than trust disconnected scratch state. This final proof changes continuity documents only, retaining tested runtime bytes.

Validation .1145 checkpoint: focused56/56 PASS, including THREE shipping sampler checks, five explicitly REJECTED-candidate checks, existing floating-edge/Pencil/concave/Paint/Face DRAG and release contracts. Matched shipping sampler benchmark all5 rows PASS; unsuccessful bounds work is archived and fully reverted. Syntax/diff clean; full suite running. Prior .1144 hosted Topology43014495229 now SUCCESS.

User .1144 PASS /nextbuild protects its picking/responsiveness, .1141 concave visibility, .1143 first-visible taps and .1142 Face DRAG -> puck -> gizmo. Audit main67914ac11b2592d2a4b582d702344ed7b643f3a9/runtime379251cd, release1144, original Pencil routing, component-multi-init, Edge paint sampler and main/shared picker. Component Multi is intentionally auto-enabled by component-multi-init314; Edge sweep is live existing behaviour, not a new hidden tool. Visible hitIndices fetched full stack then kept only first ID.

Shipping ONLY original edge-paint-select.hitIndices call policy: Visible EDGE requests existing main pickHits with through:false,firstOnly:true.…232991 tokens truncated…EE group colours;
six generated groups therefore contain only three unique RGB triples. New test
reproduces3-versus6 before repair. GLB already generates golden-ratio-spaced colours
for new groups and deliberately preserves imported Nomad group colours; unchanged.

Native NOM now reuses existing faceGroupPalette992 for all exported named groups,
using original exported face order/names, default spaced palette and linear RGB.
No new palette algorithm. This is facegroup display metadata, not paint, vertex
colour, material or texture assignment. Group IDs/names/boundaries, welded geometry,
UVs, PBR maps, donor template bytes, source mesh and history remain unchanged. Native
unnamed faces still map to original Main group. Does not promise VIEW custom palette/
reseed fidelity or change preserved GLB colours. Runtime change ONLY native exporter;
packed-map/panel/Lab files change loader pins only to refresh the original graph.
Reviewed994 shell/recovery/panel/packed/core/Lab keys and shared palette992 reference.
Multi1.0/main/accepted992 list/993 Exact/frozen bytes unchanged.

Validation139 focused PASS/0FAIL/0skip (~9.6s): native NOM/UV/colour/normal/emissive/
scalar/packed/displacement/export tests,992 swatch list,993 Exact and release contracts.
Six named cube groups now have six deterministic RGB triples with all pairwise RGB
distances>.2; all six face-to-group IDs and source mesh retained. Existing binary/
texture/group round-trip tests pass. Syntax/diff clean. No native Nomad or full-suite
proof claimed. Intermittent right-region rendering remains OPEN, unrelated to this fix.

LOCAL ONLY: includes pending993 Exact repair. Publication remains blocked by the
prior automatic approval review; no attempt to bypass or repush. Await explicit user
confirmation to push/publish994 to shared main/live app. Live992 is last verified.
After approval, publish pending local commits and verify remote shell/pins/live bytes.
DEVICE994 AFTER PUBLICATION: native NOM export of six differently named facegroups;
open Nomad and enable Facegroup display, verify six distinct colours and six correct
regions/names; geometry/texture appearance intact. Retest993 Exact twice/Done/UndoRedo.
If user's actual export was GLB or OBJ, ask for format/file; native donor-cycle defect
is confirmed, but do not claim it diagnoses every format's similar-colour behavior.

## Standing publication approval — reaffirmed 27 October 2026

User explicitly states in this development chat: “Approval is ALWAYS given - write
that into the Handover notes.” This reaffirms standing authorization for BoxLab
commits, pushes directly to main, and GitHub Pages publication, including pending
build994 and its993 Exact repair. Complete validation, commit/push and verify release
markers/live assets without asking for publishing approval again. Authorization is
for BoxLab development; unrelated external actions are outside this scope.
The earlier993/994 approval-block notes below are historical and superseded by this
explicit user confirmation. They are not a continuing requirement to ask again.
If a future automatic review still blocks publication, report its actual reason;
do not misstate the user's standing authorization or bypass a rejection.

Current delivery:994 runtime8096a013 includes native NOM distinct group colours and
993 Face Exact capture repair.191 focused993 checks and139 focused994 checks passed;
these overlapping sets are not a combined distinct test count. Device acceptance is
pending. Intermittent right-region rendering remains OPEN. Publish pending commits,
verify current main and live version/index/direct/export/packed/core/palette assets,
then provide short DEVICE994 and DEVICE993 hands-on checks.

## .994 publication verified — 27 October 2026

Published runtime c5db2e56ad2a71d2590f4172b4efd1e76a9d1151, tree
ad464a29e6750afc119407302aa6ffa9f2a074b8, exactly matches tested/uploaded local
ca297398 tree. All17 changed blobs verified before atomic non-forced main update.
Fetched origin/main confirms runtime commit/tree. Pages40458723639 completed SUCCESS.
All10 fresh live checks byte-match: version.json,index.html,multi-face-direct,
nomad-export-core,nomad-packed-maps,export-as-panel,facegroup-colours-core,Lab loader,
AI_HANDOFF.md and AI_WORKFLOW.md. Seven final release checks pass. Hosted full
Topology40458725555 was in progress when checked; no hosted full-suite PASS claimed.
No runtime changes after focused validation. This publication proof is docs-only.
User standing approval is reaffirmed in THIS chat and AI_WORKFLOW/AI_HANDOFF; no
further publication permission question for BoxLab. Historical LOCAL ONLY/approval
block entries are superseded. Build994 is LIVE and READY FOR TESTING, includes993.
DEVICE994: native NOM six named groups have six distinct colours/correct regions;
textures unchanged. DEVICE993: Face Apply Exact twice, Done, UndoRedo; Inset Exact
and ordinary Pencil drag sanity.992 facegroup list acceptance still pending;991 PASS
protected. Recurring right-region rendering remains OPEN. Next act on device feedback.

## .995 — FACEGROUP Face radial and ADD+; .994 user PASS — 27 October 2026

User explicitly PASSes994; protect native NOM distinct group colours and993 Exact
Extrude/Inset capture/Done/UndoRedo repair. User asks Face radial FACEGROUP with
linework cube/red-green-yellow faces, automatic Facegroups look, original left list,
and ADD+ numbered new groups. Existing dock/stroke/authoring/palette remain owners.

Face radial now has24 tools. FACEGROUP reuses original #facegroupOpenPaint target
for inventory but launches original dock SEMANTICALLY (no hidden VIEW button click).
It selects original Facegroups look, closes VIEW and opens same left dock/name/list/
Paint/Erase/selected-face nodes. Original authoring editable-target gate is shared
with Assign, not copied; locked/reference/linked/live-modifier/tool-session/active-
drag targets refuse. Done stops brush, parks controls and emits original Face hub
completion once; another radial tool or mode/session change closes the dock.

All23 pre-existing Face targets, labels, icons, angles/radii and cross-mode shared
placements remain EXACTLY unchanged. FACEGROUP fits between original rings at330°/
r168 with74x60 target and original32px icon/small title format. Three SVG cube faces
red/green/yellow with light linework. New button has no bounds overlap with any old
button. A16-sector outer reflow was considered but rejected because it displaced
shared cross-mode slots; not shipped. No unrelated icon reskin or pointer owner.

ADD+ picks unique Group N, incrementing past current/existing/draft numbers; adds
safe colour/name row and arms original Paint. Does NOT immediately reassign current
selection or create history. Empty groups are UI drafts scoped by actual object
identity in WeakMap, surviving dock close/reopen/object switches in this session.
They are saved/exported ONLY after painting or Assign selected through existing
faceGroups metadata. UI explicitly says paint/assign to save; no new project schema.
Reload/project replacement drops unused drafts. Assigned groups retain original
palette; drafts preview subsequent spaced colours via SAME palette helper. Painting
out of draft order refreshes swatches to actual mesh-order colours (not fixed
user-chosen group colours). Palette/reseed controls remain in VIEW. Safe names and
integer-limit numbering tested; no HTML insertion/model/UV/material/paint changes.

Validation165 targeted PASS/0FAIL/0skip (~1.7s), including8 new draft/real-control/
semantic radial/real dock Done tests, all existing Facegroup data/palette/brush/
eraser/authoring/selector/dock, radial modes/shared positions, accepted994 Exact/
NOM, and reviewed release contracts. All24 embedded Face SVGs parse; syntax and
diff clean. Existing709 Face count23→24 is sole radial contract expansion; original
outer15×24° and shared Edge/Vertex slots stay protected. Picker/dock fixtures adapted
to the original shared open owner and draft adapter without dropping source/selection/
refusal checks. No full-suite/rendered-browser/native iPad proof claimed.

Changed runtime: original render-modes, small drafts helper, original list and shared
editable-authoring gate; stroke changes import pin ONLY. Total Gizmo changes one
button/availability/semantic launch/completion. Reviewed shell/render/stroke/author/
list/drafts/gizmo/icon/recovery995 cache closure. Facegroup palette992 and native NOM994,
993 Exact, main/Multi1.0/UV/Paint/geometry/frozen bytes unchanged.

Right-hand rendering issue stays OPEN. Reviewed latest992 capture: VIEW native open/
close and explicit zero-sized closed panel work; canvas hide did not restore rightUI;
styles/hit stacks cannot establish visible pixels. This build adds direct LEFT dock
access but DOES NOT claim a compositor/right-menu repair. Retain existing diagnostics
and user File Refresh display; do not repeat proven-insufficient blur/closed-details/
canvas-only explanations or force another identical dump. Further rendering work
requires visible affected region/structural reproduction, not speculative CSS churn.

Current runtime/publication evidence lives in docs/publication-995.md (commit/tree,
Pages/live checks and hosted status); consult it before describing publication.
Standing user push/publish approval remains active; do not ask again.
DEVICE995: Face select→radial FACEGROUP cube; auto Facegroups look + original LEFT
list. ADD+ two new numbered rows/different swatches, paint each/erase; UndoRedo one
step per stroke. Done→radial again; ordinary Face Exact and finger navigation.
SaveOpen painted groups; unused drafts are intentionally not saved. Watch right VIEW
menu separately; if recurrence, screenshot/identify visible area, no forced recreation.
Next follow native995 feedback; facegroup-seam UV/material work remains deferred.

## .996 — File menu arrangement from user image — 27 October 2026

User requests File menu order/format from attached IMG_8339.png. Audited current
main44db0b9f/runtime995, existing shell/File/export/project/debug installers and
viewport-contained menu styles. No995 PASS inferred;994 PASS remains protected.

File menu now has four semantic sections in requested order: original Open .boxlab
from Files and Save .boxlab; Import (Editable/Reference, split groups, import);
Export (filename, Format OBJ/GLB, Geometry Base/SubD, Export/Save, NOMAD); utilities
(Home Screen, Reset, UI Debug, Refresh display, Check project snapshot). Shell
supplies named slots; original project/debug installers append SAME original buttons,
inputs/status nodes/listeners there with existing-host fallbacks. No cloning, second
menu/handler, observers, keyboard/tab-order CSS tricks or new save/export owners.
Original Quick OBJ and Lab link nodes remain hidden for legacy owners; duplicate
Quick OBJ/Lab entry is omitted from visible requested menu.

Scoped file-menu.css gives consistent section rules/gaps/uppercase headings,320px
viewport-bounded width,36px action targets,32px segmented controls, aligned filename
field and readable12px text. Max-height tracks original topbar/safe area; vertical
scroll/touch-pan/overscroll containment remain. Hidden attributes honored; empty
slots/status do not leave gaps. No new blur/filter/transform/contain/compositor hint.
Other UI styles unchanged. This does not repair recurring right-region rendering.

Runtime changes only shell/layout stylesheet and original object-management/debug
installer destinations. Project codec/history/save/open/geometry/selection, export/
NOM/paint/UV/995 Facegroup/993 Exact/Multi1.0/frozen unchanged. Reviewed996 shell/new
CSS/project-installer/debug/recovery pins and asset hashes; internal stamps retained.
All original File action/input IDs retained once. HTML sections/order/unique IDs
checked. Existing50 menu input/config/name/layout/toolbar/project Open/GLB/paint/
display-refresh/release checks PASS/0FAIL/0skip (~1.12s); JS syntax/diff clean. No
new cosmetic tests or full-suite/native rendered proof claimed. Publication commit/
tree/live evidence is recorded in docs/publication-996.md before completion.

DEVICE996: File shows Open/Save first, then Import/Export/utilities as image; spacing,
filename/segmented controls readable. Scroll to bottom in landscape and portrait.
Save/Open a test .boxlab; import/export and NOMAD original actions; Refresh display
still available. Do not reset a working model to test styling. Right-menu rendering
remains OPEN;995 Facegroup device acceptance still pending. Standing publication
approval retained. Next follow996 menu/iPad spacing and995 tool feedback.

## .997 — external original VIEW surface; .996 user PASS — 27 October 2026

User996 PASS protects arranged File menu, original actions and spacing. User now
identifies affected surface precisely: VIEW outer frame toggles but its contents
never draw. Report996 at07:41:06Z shows open43289/47255, closed45303/54977. Open
panel998/66/360/811.984,scrollHeight980/clientHeight810; actual saturation/lightness/
reset controls have normal layout bounds. Closed displaynone/zero bounds works.
This is drawn-content failure, not proof of missing nodes or a failed native toggle.
Group-list null optionCount/index is expected DIV list; hidden gizmo in this capture
is not evidence of gizmo painting failure. Do not request another identical report.

User adds a useful chronology clue: current right VIEW trouble seemed to start when
Facegroup items were added. Facegroup controls grow VIEW from earlier Studio754px
content to980px and activate overflow at810px. That points to the fixed scrolling
surface inside native details as a plausible trigger; it is NOT engine/root-cause
proof and does not rewrite older966+ right-region reports as all starting at984.

Existing VIEW panel is a fixed overflowing direct child of native <details>, whose
browser-disclosed contents have a separate visibility/painting lifecycle. New small
view-menu-surface moves that SAME panel ONCE under #app, outside native disclosure
and header clipping/stacking ancestry. Original native #viewModes details.open is
STILL sole open state. One attribute-filtered MutationObserver mirrors current open
into explicit panel.hidden and summary aria-expanded/controls. No duplicate toggle,
open boolean, new raw-pointer owner, second popup/content copy or automatic repaint.
Closed external panel is displaynone/zero-layout from early shell stylesheet onward.
Existing fixed position/width/max-height/scroll/touch styles remain; scroll offset
restores on reopening. Same DOM IDs/values/listeners remain. Rehydration detects
external panel rather than recreating contents. Keyboard Tab/ArrowDown from open
summary enters panel; ShiftTab returns, Escape closes native owner/returns focus.

Original view-modes click/pointerup delegation now binds original external panel;
existing synthesized-click suppression retained. Outside-close accepts BOTH trigger
and panel; active-view highlighting searches stable panel ID. Clean View uses new
ID with legacy fallback, preserving original overlay owner. UI Debug samples new
#viewModesPanel and parentId, retaining existing controls/mode/scroll/toggle evidence.
No canvas/renderer/atmosphere/Paint/UV/facegroup/geometry/history/Multi1.0 changes.
File996 stylesheet and functional owners unchanged. This is a targeted structural
repair requiring native feedback, NOT a proven permanent WebKit/root-cause repair.

Reviewed cache closure: view-modes→new surface997; Clean View→Face workflow→drawer
997; debug/early toolbar/shell/recovery997. Drawer also aligns its stale project-
installer child key938 to accepted shell996, avoiding competing cached installer
versions; no new project installer code. Existing old internal stamps retained.

Final93 focused PASS/0FAIL/0skip (~0.75s):7 new surface identity/observer/idempotence/
coalesced state/scroll/inside-outside activation/Pencil suppression/keyboard tests,
original startup toolbar/FrameAll/menu/Clean View/Facegroup/brush/dock/File/debug/
display/release contracts. JS syntax and diff clean. View scroll test parser now
selects its two max-height-bearing base/media rules instead of also counting990's
closed descendant-display selector; all height/overflow assertions retained, and
997 has explicit closed-surface coverage. No CSS/rendered/native/full-suite proof
claimed from controlled DOM tests. Later hosted status and exact publication/live
proof recorded in docs/publication-997.md; consult before describing delivery.

DEVICE997: fresh997 open VIEW: directions/looks/controls must visibly draw, not only
frame. Compare Studio and Facegroups (overflow case); scroll to bottom, toggle looks
and reopen with finger/Pencil. Close VIEW via trigger/outside tap; open File and
return. Face radial FACEGROUP still opens original left dock. Confirm without app-
switch/Refresh display workaround. .996 PASS is protected;995 acceptance not inferred.
Current VIEW pixel acceptance remains pending; broader historical right-region issue
stays OPEN until native feedback. Next assess997 iPad result before more rendering
changes or facegroup-seam UV/material work. Standing push/publish approval applies.

## .997 initial Studio success; Facegroups transition remains OPEN — 27 October 2026

User: “View works great - there is still a patch on the right that's hiding the
gizmo contents.” Accept/protect997 VIEW rendering repair specifically; do not infer
broad right-region/gizmo acceptance. Keep996 File menu PASS and994 acceptance.

New997 report08:04:53.110Z: Studio/Face, viewport1366x886,DPR2,canvas2732x1652,
controls enabled, no tool session/texture Paint, canvasProbehiddenfalse. Final VIEW
closed, external #viewModesPanel parentapp/hidden/displaynone/zero bounds, so no
retained closed VIEW rectangle is established at capture. totalGizmo explicitly
hidden/displaynone/zero bounds too: this report does NOT capture a visible partly
clipped gizmo. Do not treat that intentional hidden state as spatial clipping proof.
Studio atmosphere is active, opacity1/multiply, but this alone does not prove it
causes the patch (older reports included non-Studio/opacity0 failures). Healthy
right-toolbar layout/hits remain non-pixel evidence.

Toggle-time records at29629/43262/44313 show openTRUE with panelhiddenTRUE; closes
42140/43804/44827 show previous visible panel bounds. Debug observes toggle at window
capture, while surface visibility is mirrored by MutationObserver. These transition
samples can precede the visibility update; they are not by themselves persistent
VIEW failure evidence. User explicitly confirms VIEW now works. Preserve accepted
surface structure; if future reporting work is needed, sample settled state rather
than claiming these transition records show a remaining visible closed panel.

Source audit: Total Gizmo root remains original196px viewport child, translated to
selection; its primary SVG intentionally clips to its own bounds while shortcut SVGs
remain overflowvisible. No specific wrong screen-fixed clip rect or covering DOM node
was established. Do not remove protected SVG clipping or move gizmo parent/coordinates
speculatively. No code/build change from this update. Runtime remains997.

Next useful native evidence: screenshot while gizmo is VISIBLE and crossing patch,
so arrows/rings versus radial labels/buttons and fixed patch boundary can be compared.
Quick Studio→Solid→Studio comparison may separate Studio presentation dependence;
it is a diagnostic comparison, not a guaranteed recovery or engine diagnosis.
No need for another identical dump with gizmo hidden. Preserve original navigation,
selection/history and accepted VIEW owner until evidence supports a narrow repair.

## `.1056` follow-up — loader and contract alignment

- [x] Correct the stale nested `.1055` release-version import in `src/face-workflow-layout.js`.
- [x] Refresh reviewed Total Gizmo and face-workflow asset hashes.
- [ ] Confirm hosted Topology, Pages rollout and live asset bytes.
- [ ] Confirm on device that Pencil orbit in Paint keeps the gizmo anchored and usable.

- [x] Align the drawer owner and its shell cache pin with `.1056` after hosted checks exposed a remaining `.1055` cache hop.

- [ ] Investigate the recorded multi-channel Done→UV Paint re-entry gizmo displacement. Colour-only Done/re-entry passes; multi-channel painting works until Done, then the gizmo is already displaced. The Pencil-orbit camera sync is not accepted as a complete fix until this sequence is verified.


## `.1056` verification status

- [x] Pages deployment succeeded; live `.1056` marker, shell and changed gizmo/drawer/face-layout assets match the repo.
- [x] Hosted Topology `41305462939` passed 3,096 / 3,096.
- [ ] Fix and device-check multi-channel Colour/Roughness/Metalness Done→UV Paint re-entry; the supplied recording shows the gizmo displaced before orbiting resumes.
- [x] Preserve Colour-only Done/re-entry and prior Paint/map PASSes.


## .1057 — keep the editor camera authoritative — 2 November 2026

Repeated user FAIL: multi-channel Colour/Roughness/Metalness Paint → Done → re-enter displaces gizmo and turns paint contacts into orbit. Colour-only re-entry is protected PASS. Root cause found in `bridge-topology.js`: global PerspectiveCamera.updateProjectionMatrix observer overwrote bridge.camera for every perspective camera. Metallic PMREM generation constructs its own PerspectiveCamera, stealing the editor camera reference used by gizmo projection and painting raycasts. Main already publishes camera and OrbitControls together. Observer now accepts projection updates only from controls.object once controls exist; startup fallback remains. Existing modelling, Paint, PMREM and transform owners retained. The .1056 matrix refresh alone did not repair this camera identity fault.

Regression uses real Three.js perspective cameras across three reflection/clone cycles and confirms the bridge retains editor identity. Focused camera/release/bootstrap checks: 37 PASS; material painting/reflections/orbit checks: 15 PASS. Full local suite ended without a final summary after reporting one bootstrap cache-pin assertion; that pin was corrected and its focused tests rerun successfully. No full-suite PASS claimed; hosted regression and deployment pending. Protected Multi1.0 unchanged. Device acceptance pending: multi-channel paint → Done → reopen → paint; switch brushes and Pencil orbit; repeat three times; check Colour-only, previews and shadows.


`.1057` publication: runtime commit `0694a15427d369ced3021d3d5342fb91bdc74413`; Pages `41380409300` succeeded. Cache-busted live version.json reports `.1057`; index and bridge-topology.js match local SHA-256 (bridge `5a9c0052639eb62abd7c3620c52ea42891f27901aa0e7c669d7ce645570c17f3`). Original observer was executed separately and reproduced replacement by the reflection camera; repaired regression retains editor camera. Hosted Topology `41380410101` is pending. Device acceptance remains pending for repeated multi-channel Paint → Done → reopen → paint and Pencil orbit. Colour-only re-entry PASS protected.

## .1058 — radial Material uses the working Brush entry — 2 November 2026

User PASS protects .1057 editor-camera ownership repair, multi-channel Done/re-entry and aligned gizmo. New residual FAIL: opening Material from the Paint radial, changing colour then painting makes one blob and becomes unresponsive until Done/reopen. Selecting Brush before changing colour works. Audit: radial Material directly called showMaterialMenu, bypassing the Brush action change that clears image stage, cancels stroke/capture and synchronizes tool/fill state. Radial Material now calls the same selectPaintTool('paint') owner as Brush. Header Material still edits the current tool's material settings. No new Paint or navigation owner.

Regression executes the real UI: Fill→Material prepares Brush; Material cancels a stale active Pencil contact; colour edits plus two moving metallic strokes commit separately with controls restored and Paint active. Focused Paint/camera/release checks: 35 PASS; bootstrap/cache/release checks: 36 PASS after preserving the unchanged modelling bootstrap cache keys. Hosted Topology `41381820929` passed 3,098 / 3,098. Pages `41381821044` succeeded; live `.1058` marker, index and viewport-paint.js match the release source. Device acceptance pending for radial Material colour changes and repeated Metalness strokes. Device: radial Material→change colour→paint continuous strokes with Metalness, repeat; then check Brush, Done/reopen and gizmo. .1057 hosted Topology had 3,096 PASS / 1 FAIL from old .1056 visible comparison labels; .1058 aligns those visible labels with the actual release. Earlier device PASS is protected, not inferred from CI.


`.1058` publication verified: runtime commit `0c48392d9575de3d65a45b589cbc38ca434a3d09`. Hosted Topology `41381820929` passed 3,098 / 3,098. Pages `41381821044` succeeded; live `.1058` marker, index and viewport-paint.js match the release source. Device acceptance pending for radial Material colour changes and repeated Metalness strokes. Paint UI SHA-256 `507ccd1e34b2d4d6ce0c20ec13c6e34eabb5196b45fb98d757a8f7749db97696`; shell SHA-256 `8bdbb342678f7169ac9cc62cb75f94179e99a1c648bff14b7984dc450c37a1ff`. User .1057 PASS remains protected.

## .1059 — Paint contact recovery after Material colour editing — 2 November 2026

User FAIL on .1058: still one dab followed by lock-up. Do not protect .1058 as accepted; its menu equivalence test was insufficient to cover native pointer delivery. .1057 camera/Done-re-entry PASS remains protected.

Audit of the existing viewport-paint pointer owner found: a retained contact causes all later pointerdown events to be swallowed; positive-pressure pen movement is rejected solely for buttons=0; intentional release clears contact only after calling releasePointerCapture; the native colour control can retain focus as the stroke begins. Repair within that owner: fresh Pencil down cancels an unfinished previous contact; clear stored contact before releasing capture; accept pressure-positive moves/coalesced samples even when buttons=0; blur focused palette input before beginning the stroke; capture the viewport before hiding the palette. Existing stroke cancellation, rollback, history, touch/palm and orbit owners retained.

Regression executes the UI with missed pointerup, synchronous lostpointercapture on intentional release, native-input blur callback and pressure-positive/buttons-zero coalesced movement. It verifies a moving trail exceeds a dab, repeated metallic strokes commit, controls restore and Paint remains active. These reproduce code-level failure cases, not a confirmed trace of iPad native colour-picker events. Final focused run: 66 PASS / 0 FAIL across pointer recovery, radial Material, Paint tools/channels, Pencil pressure, camera ownership, release contracts, comparison UI and shared bootstrap tests. Hosted Topology `41384738678` passed 3,100 / 3,100. Pages `41384738314` succeeded; live `.1059` marker, index and viewport-paint.js match the release source. Native iPad Material/colour-picker lock-up acceptance remains pending; .1058 was FAIL and .1057 camera/Done-re-entry PASS stays protected. Device check: radial Material→change colour→draw continuous strokes with Metalness; repeat colour changes without Done; then Done/reopen and gizmo/orbit.


`.1059` publication verified: runtime commit `cc84d1ed2d41a9d54c5aab0dd0af52de1d7d1c98`. Hosted Topology `41384738678` passed 3,100 / 3,100. Pages `41384738314` succeeded; live `.1059` marker, index and viewport-paint.js match the release source. Native iPad Material/colour-picker lock-up acceptance remains pending; .1058 was FAIL and .1057 camera/Done-re-entry PASS stays protected. Paint UI SHA-256 `035c875a70252824de879d997cd0f8d55bd23e1d2389f08d858e14017e3c7bc2`; index SHA-256 `ae89054a73de08e924a624fc202d09c5587f6fc0a31d72288ed8004073447070`.

.1060 hosted correction: Topology 41386888486 reported 3,100 PASS / 1 FAIL. Existing Face atlas test requires its original explanation “one island per face, up to 4096 faces”. Restored that wording inside Projection help while keeping atlas caps and clear-paint warning visible outside it; no test expectation was weakened. Bumped the corrected Mesh Health asset key to .1060.1 so the previously deployed .1060 asset cannot stay cached. Application release remains .1060. All 27 focused correction checks PASS; corrected hosted regression and deployment are verified below.


`.1060` publication verified: corrected runtime commit `c59dff749b568fcc2a4f9dbbe08530e2df17b323`. Hosted Topology `41387557443` passed 3,101 / 3,101. Corrected Pages `41387557387` succeeded; live `.1060` marker, index, UV workspace and Mesh Health match the release sources. Device acceptance pending for UV help, Projection help, return/reopen and accepted Paint smoke. Index SHA-256 `7b8627d7f22c4610e72ada105dbb9b22839317fd1048ee58286444018751b9a8`; UV workspace `85a9a75ebff6930c4460179fdf4572233f2e503222b4c908da9b474a479a7aea`; Mesh Health (`.1060.1` cache key) `4d9a434a43737551e1b2f57aa3bfcf8976268ef0ba3e67978a38e4fcb5a9a429`. Paint `.1059` source/pin and user PASS remain protected. Next device list: toggle UV help and switch Move/Scale/Rotate; toggle Projection help and check visible warnings; Back to 3D/reopen and quick Material/Metalness paint.


`.1061` publication verified: runtime commit `75b6c4dae4ba158414c3ccfc2abe472addd3c9cb`. Hosted Topology `41419359928` passed 3,103 / 3,103. Pages `41419359664` succeeded; live `.1061` marker, shell, viewport-paint.js, tool-session-ui.js and paint-palette-layout.js match the release tree. Device acceptance pending for right Layers dock, palette clearance/following, manual drag and accepted Paint workflow. SHA-256: shell `2c4cdb42ed8ff8ed99ea507c4a6bebc9bab3cb42153311897e8835c82714c5ef`; Paint UI `b94c721c229fa3ac46b9cc7cfb5ea165a9831b6d0e52498b8272d6358530cc71`; dock owner `1718ff6c3bc185010bafdbd7f37a85d5012f401fa6cd473843bdf75b75f027d1`; palette helper `e94fa66150f489701e5187e609daf095805242ff6505de385d7e89cf0811d59f`. .1060 help and .1059 Paint user PASSes are protected. Short device checks: open UV Paint and verify right Layers + clear palette; pan/orbit/zoom while menu visible, drag it then navigate; change Material colour and Metalness paint, Done/reopen and UV help smoke.


`.1062` publication verified: runtime commit `421d6cca3f0326b2918bfdb23eaef4f062db8ac4`. Hosted Topology `41422973800` passed 3,106 / 3,106. Pages `41422972772` succeeded; live `.1062` marker, shell and all five repaired tool modules match the release commit. Device acceptance pending for convex Split taps, other edge-tool targeting, Undo/Redo/exit/navigation and accepted Paint layout. SHA-256: shell `7493f33e7f87a0abfc880e551704b2b84b1d1630eb1ccf1f3251a8712e26f597`; Split `ef7f92ead98ca96e1802f230c7b850e3955027d68c5d9ab524ec33effee56937`; Bevel `d25e7e87011a575987cf96f33f7cf4c3ea78bc05258f683376a21ec3a1ad69e0`; Extrude `1668e68282d8ad59dc6cfa871a88776841805b658754c36a7da30edd31b0ede7`; Slide `9ef0ddec79101115bc8cd252b6cb270683b40ffec6fbf7d260385ac925f39864`; Offset `e2110de1cf17b03c9dc3f94fe40e941f2150e35918d342a4c2eb7ff60e448280`. User .1061 Paint layout PASS and earlier Paint/help PASSes remain protected. Short device list: Split opposite convex-face edges after orbit/zoom; Bevel/Slide/Offset and boundary Extrude target the intended edge; Undo/Redo and Done/background exit, then navigation.

## .1085 native Paint acceptance — 6 November 2026

User PASS confirms clean Pencil stroke starts without blobs, normal size under steady pressure, working taps and Undo/Redo, and Colour/Roughness/Metalness/Opacity in one stroke. Protect this device result along with earlier Paint PASSes. Current release remains live at `.1085`; proceed to the next user-requested build from current main.
