Warning: truncated output (original token count: 299719)
... 150298 bytes omitted ...

## BoxLab .1168 — separate surface opacity for non-emissive materials — 15 November 2026

`.1167 PASS` remains protected for map replacement persistence through PBR/Helios
switches. `.1168` adds scalar opacity in the existing integrated Helios material dock;
all adjustments remain render-session-only.

- [ ] On an imported material with no emission, lower Surface opacity and confirm the
  object becomes see-through in the ray trace and shadows behind it become lighter.
- [ ] Compare the PBR preview and ray trace at full, partial and zero Surface opacity;
  confirm it affects only the selected material.
- [ ] Raise Emission and confirm Surface opacity is replaced by the separate Emitter
  opacity control. Lower Emitter opacity and confirm the emitting surface remains
  visible while rays continue through it.
- [ ] Switch between Helios and PBR and confirm Surface opacity remains during the
  current render session; confirm BoxLab saved material/project data is unchanged.
- [ ] Recheck `.1167` map replacement through a PBR → Helios round trip and the
  normalized Helios menus and material map controls.

Automated: focused Helios/release checks pass 36/36; full local `npm test` passes
3,455/3,455 (118.917s), zero failures/cancelled/skips. Tracer bundle build, changed-JS
syntax, release asset contract and `git diff --check` pass. Hosted Topology
`43696493623` passes 3,455/3,455 on runtime commit
`b0097ecfd7e0a2cc11378c25252da2faa6008a2e`; headless Chromium comparison reports
11/11 exact parity (`LAB_ONLY`), artifact `subdivision-wasm-headless-43696493623`
(ID `14155021519`). Pages run `43696493446` succeeds; main `version.json` is `.1168`.
Native iPad visual acceptance remains pending.

## BoxLab .1167 — Helios map-session persistence — protected PASS

Cris confirms `.1167 PASS`. Protect map replacement persistence when switching from
Helios to PBR and back, Restore preset maps replay before later replacements, and
discarding overrides when the BoxLab object identity set changes. The behavior stays
transient and does not alter saved material/project data.

- [x] Replace a map, switch to PBR and return to Helios; confirm the replacement remains.
- [x] Use Restore preset maps, switch modes, then replace again; confirm replay ordering.
- [x] `.1165 PASS` mapping controls and `.1164 PASS` neutral menu styling remain protected.

## Helios Studio 0.1.4 PASS and BoxLab .1165 mapping port — 15 November 2026

Cris confirms standalone Helios Studio `0.1.4 PASS`; this source behavior is
protected. BoxLab `.1165 PASS` protects the accepted mapping controls and render-only behavior.

- [x] Open VIEW > Helios > Materials and verify albedo, normal and roughness map
  previews match the active material. Change each map with an image and confirm its
  preview and rendered surface update. Restore preset maps and confirm they return.
- [x] Change Scale U and V independently; then test Offset U/V and Rotation. Confirm
  each changes the ray-traced texture placement/orientation without changing the
  BoxLab object's UV layout or saved material.
- [x] Adjust Normal / height relief and confirm shading depth changes. Confirm the
  mesh silhouette does not change (true geometry displacement is not in this build).
- [x] On an emissive preset, lower Emitter opacity and confirm the light source
  remains visible through the surface while less emission contributes. Return it to
  full opacity; confirm other non-emissive material controls remain usable.
- [x] Switch away from Helios and return, and orbit/pan while the dock is open. Confirm
  the render controls remain responsive and BoxLab project/material data are intact.

Automated: focused Helios/release checks passed 14/14; full local regression passed
3,446/3,446. `npm run build:helios-tracer`, changed-module syntax checks and
`git diff --check` passed. Hosted Topology `43670538811` and Pages `43670537933` passed; live marker `.1165` was verified.

## BoxLab .1166 — separate Metalness map preview/replacement — 15 November 2026

BoxLab `.1165 PASS` remains protected. `.1166` exposes the packed glTF metalness
channel in the existing VIEW > Helios map controls and retains the independent
roughness/metalness image channels.

- [ ] Open VIEW > Helios > Materials and inspect all four map previews. On an
  imported GLB with both scalar maps, confirm Roughness and Metalness show distinct
  grayscale previews; replace each and confirm the other map remains visually intact.
- [x] Replace only Metalness on a preset or imported material. The user confirms map
  addition/replacement itself passes. `.1166` round-trip through PBR was reported FAIL
  because Helios restored the PBR source map; `.1167` addresses that lifecycle defect.
- [ ] Switch between Ray Trace and PBR preview and confirm the metalness map applies
  in both. Reopen the material card and confirm the Metalness preview remains current.
- [ ] Save/inspect the BoxLab project material and confirm this render-only override
  has not changed the modelling material. Verify `.1165` map controls and menu layout
  still appear as accepted.

Automated coverage: scalar-channel helper, both glTF map imports, shared packed map
render owners, map-card wiring and release/cache contracts. Focused Helios/release
checks pass 26/26; full local suite passes 3,450/3,450 (121.741s), zero
failures/cancelled/skips. Tracer bundle build, changed-module syntax checks and
`git diff --check` pass. Hosted Topology `43688283714` passes `npm test` and its
headless Chromium comparison; Pages `43688546947` succeeds. The live marker reports
`.1166`, and nine cache-busted assets byte-match source. This checklist remains
pending iPad acceptance.

---

---

## .1164 BoxLab Helios menu visual normalization — hands-on check

Cris confirms `.1164 PASS`; protect this visual normalization and the `.1163 PASS` behavior. Protect the 28 material presets, render-session-only
application, imported texture-map retention, clean PNG capture, 512 spp and reset
controls. `.1164` changes only the Helios dock appearance in BoxLab.

- [x] Open VIEW > Helios and visit Lights, Materials, Ray Tracer and Camera. Confirm
  active tabs and selected choices use BoxLab's white active-button style without a
  blue border.
- [x] Check material/light controls, numeric values, reset, gallery and render
  buttons. Confirm colors and corners match BoxLab's standard menus; focus remains
  visibly indicated with a neutral outline.
- [x] In portrait and landscape, confirm the dock still scrolls and the controls
  remain usable while orbiting outside the panel.
- [x] Confirm Helios still becomes ready and the render controls work when tested
  on the iPad.

GitHub Pages run `43659303518` built and deployed successfully. The live title and visible marker report
`.1164`; browser observation confirms the active Materials tab has the white
selected fill and no blue border. Hosted Topology run `43659304210` passed, including
`npm test` and the headless Chromium subdivision comparison. Cris confirms `.1164 PASS`.
No local tests were run in this session.

### Helios material mapping note

The renderer uses UV-space maps for preset albedo/normal/roughness. It keeps an
imported mesh's existing UV attribute; only a mesh with no UV attribute gets
generated box-projected UVs. It does not unwrap a mesh automatically. See the
handoff's “Helios material texture mapping audit” before changing mapping behavior.

---

## .1163 BoxLab Helios Studio 0.1.3 material integration — protected PASS

Cris confirms `.1163 PASS`. Protect the 28 preview cards, all eight architectural
additions, single parent-panel scroll owner, render-session-only preset application,
imported custom maps, clean PNG capture, 512 spp, and light/material reset controls.

- [x] All 28 previews are visible; the gallery scrolls to the final cards in portrait
  and landscape.
- [x] Warm Limestone, Red Clay Brick, Spotted Gum, Terrazzo, Glazed Ceramic Tile,
  Lime Plaster, Weathered Corten Steel and Polished Concrete apply visibly.
- [x] Presets leave saved BoxLab project/material data and imported maps unchanged.
- [x] Clean render capture, sample target including 512 spp, and reset controls work.

Focused checks 29/29 and full local suite 3,444/3,444 were recorded for the .1163
release. Live Pages marker and title were verified at .1163 before this build.
Hosted Topology status for .1163 was not recorded.

---

## .1162 BoxLab material gallery scroll repair — protected PASS

Cris confirms BoxLab `.1162 PASS`. Protect the single parent-panel touch-scroll
owner, adaptive panel height, final-row scrolling, and preset application. The
automated focused checks pass 23/23; full local suite passes 3,441/3,441. Hosted
Topology `43565280205` and Pages `43565279997` succeeded; live marker is
`.1162`. Existing Helios capture, twenty previews, material isolation, 512 spp,
and reset controls remain protected.

## .1161 BoxLab clean render capture and material gallery — protected PASS

Cris confirms `.1161 PASS`. Protect canvas-only render capture, all twenty material
cards/previews, selected render-session material application, and `.1160` 512 spp
and reset controls. Catalogue and preview helper byte-match Helios Studio `.1.1`.

- [x] Capture becomes available at the selected sample target; saved PNG excludes
  BoxLab/Helios controls and surrounding UI.
- [x] Preset grid shows all twenty named material previews; presets modify only the
  selected render-session material, leaving BoxLab scene/material data and imported
  texture maps unchanged.
- [x] Reconfirm 512 spp and selected light/material reset icons.
- [ ] **Follow-up defect from native use:** Cris reports the BoxLab preset menu has
  the same non-scrollable behavior previously fixed in Helios Studio `.1.2`.
  `.1162` addresses this; complete the checks above before protecting the scroll.

---

# .1155 — subdivision comparison table in Actions summary — 13 November 2026

- [x] Formatter generates the 11-row source-face/level/JS median/WASM median/decision table and repeats parity count plus the host-timing `LAB_ONLY` caveat.
- [x] The headless runner appends the summary to `GITHUB_STEP_SUMMARY` only after successful completion, and continues writing the JSON artifact.
- [x] Focused summary/release/cache and shell-comparison checks 27/27 PASS.
- [x] Full local suite 3,438/3,438 PASS (84.158s); zero failures/cancelled/skips.
- [x] Hosted Topology `43418568813` / job `131862526521` on `.1155` commit `59875276abd4a5164eb99add9698bb5d45a3e060` passed 3,438/3,438 and ran headless Chromium. Logs confirm the Actions summary table was emitted, 11/11 parity and `LAB_ONLY`; artifact `subdivision-wasm-headless-43418568813` (ID `14033257675`, 4,153 bytes) uploaded.
- [x] Pages run `43418568589` succeeded for `.1155`; `version.json`, HTML title, `#appVersion` data/visible label and release-version/cache pins in the deployed source are `.1155`.
- [x] Existing `.1154` hosted actual Chromium run and `.1153` Safari PASS remain protected. No user interaction with the app is needed to validate this reporting addition.

---

# .1154 — automatic headless subdivision comparison — 13 November 2026

- [x] Playwright driver targets the actual subdivision comparison HTML page, starts Compare, and validates all 11 workload rows, exact-parity flags, five measured pairs and output cap.
- [x] Topology workflow installs Chromium, runs the headless benchmark automatically and uploads the JSON report as a run artifact. The report labels Chromium/headless/runner metadata and keeps the comparison `LAB_ONLY`.
- [x] Hosted Topology `43338162446` passed; actual headless Chromium completed 11 comparisons with 11/11 parity and aggregate `LAB_ONLY`. Artifact `subdivision-wasm-headless-43338162446` is attached (artifact ID `13998632102`). Pages `43338163067` succeeded for runtime commit `8cb57348f6e840d0c08cbdeba3de144588274a7a`. Local Chromium launch is sandbox-blocked; hosted run provides the browser proof. Full local suite: 3,436/3,436 PASS.
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

scripts/benchmark-subdivision-profile-1147.mjs drives ACTUAL page script with minimal DOM and native imported owner, retaining9 raw rows at docs/performance-subdivision-profile-1147.json. Largest256-source L3 ->16384 faces median74.73ms in first desktop run; assembly largest accumulated span170.57ms across5 samples, vertex points68.01ms. Baseline/no candidate, no desktop acceptance extrapolated. Next collect same bounded iPad JSON, then choose target u…246152 tokens truncated…k close/reopen/object switches in this session.
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

### `.1056` hosted correction follow-up

- [x] Keep `camera.updateMatrixWorld?.(true)` as the camera/gizmo sync repair.
- [x] Align nested release-version loader in `src/face-workflow-layout.js` with `.1056`.
- [x] Refresh reviewed runtime asset hashes for `face-workflow-layout.js` and `total-gizmo.js`.
- [ ] Recheck hosted Topology and Pages/live bytes.
- [ ] On iPad, switch Paint brushes, orbit with Pencil, and confirm gizmo stays at the selected object and remains fully usable after Done.

- [x] Align the drawer's face-layout import and its shell cache pin to `.1056` after hosted checks exposed the remaining `.1055` hop.
- [ ] Rerun hosted Topology and confirm Pages/live bytes.

- [ ] Regression from the new recording: with Colour, Roughness and Metalness enabled, paint, click Done, re-enter UV Paint and paint again; verify the gizmo stays anchored throughout. Colour-only Done/re-entry is a protected PASS.


### `.1056` hosted result and remaining device failure

- [x] Pages `41305462046` succeeded; live release marker and changed runtime assets match the repo.
- [x] Topology `41305462939`: 3,096 PASS / 0 FAIL.
- [ ] Device regression: multi-channel Colour/Roughness/Metalness → Done → re-enter UV Paint → paint again. Recording shows the gizmo already displaced after Done. Do not count `.1056` as accepted for this sequence.
- [x] Preserve Colour-only Done/re-entry and earlier map preview/update, channel toolbar, Smudge, and shadow PASSes.


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

## .1085 — native Pencil Paint — protected PASS — 6 November 2026

- [x] Slow-light Pencil strokes start without oversized blobs; steady pressure retains the full brush size.
- [x] Deliberate tap and Undo/Redo.
- [x] Colour, Roughness, Metalness and Opacity paint in the same stroke.

User confirms `.1085` PASS. Protect this acceptance and the existing `.1077` menu/four-channel, `.1076` two-sided opacity, `.1075` opacity authoring and `.1074` brush-controls PASSes. `.1085` local suite: 3,166 PASS / 0 FAIL. Published app remains `0.36.18.1085`.


## .1156 Helios ray-trace view — user PASS protected

- [ ] Open VIEW > Helios on a textured BoxLab model. Confirm the trace appears and retains base colour plus supported GLB PBR maps.
- [ ] Orbit, pan and zoom; confirm an interactive preview appears and accumulation resumes when navigation stops.
- [ ] Edit the model while Helios is selected; after the short debounce, confirm the traced scene reflects the edit.
- [ ] Return to Studio and verify normal viewport rendering and editing resume without a stale tracer image or locked controls.
- [ ] Reopen Helios, then leave it again; confirm no repeated rebuild or lingering overlay after deactivation.

User confirms .1156 PASS; protect the existing trace activation, GLB texture/PBR retention, navigation, live edit rebuild, Studio recovery and repeat activation behavior. Hosted `.1156` Pages run `43435484477` and Topology run `43435484777` succeeded; Topology passed 3,438/3,438.

## .1157 Helios bottom render dock — user PASS protected

- [x] Open Helios and switch Lights, Materials, Ray Tracer and Camera tabs; confirm the dock usability and collapse/reopen behavior.
- [x] Test light selection/toggles, temperature/color, intensity, angle, softness and lighting rigs.
- [x] Test material sliders/presets, imported GLB texture retention and unchanged saved BoxLab project materials.
- [x] Test environment, exposure, bounce/fill, denoiser, clay, sample target and accumulation restart.
- [x] Test camera presets/FOV and orbit/pan/zoom responsiveness.
- [x] Edit the model, verify dock settings survive rebuild, return to Studio and re-enter Helios.

User confirms `.1157 PASS`; protect all checks above. Automated status: Helios bundle build and changed JavaScript syntax/diff checks pass; focused dock/release checks 27/27; local and hosted Node regression 3,440/3,440, zero failures/cancelled/skips. Hosted Topology `43441747837` ran headless Chromium: 11 subdivision comparisons, 11/11 parity, decision `LAB_ONLY`; artifact ID `14045519451` uploaded. Pages `43441747701` succeeded. Runtime commit `bb233cf25112f9c228f47a55836808eb64498e20`. No WASM performance promotion is inferred.

.1158 BoxLab-style Helios dock — partial appearance PASS; placement FAIL

User reports the styling is much better and no longer obscures mode controls, but the bottom dock itself is obscured by them. Keep the `.1158` palette/type styling accepted while replacing its bottom placement in `.1159`.

## .1159 Helios right-side menu — hands-on check

- [ ] Open VIEW > Helios; confirm the panel sits at the viewport upper-right and shares BoxLab panel color, typography, spacing and corners. Confirm it no longer intersects the bottom mode controls.
- [ ] Expand/collapse; confirm the header remains reachable. Scroll the panel body and switch Lights, Materials, Ray Tracer and Camera.
- [ ] Exercise one light control, one material control, a tracer setting and camera preset; confirm `.1157` behavior remains intact.
- [ ] On iPad portrait and landscape, check right safe-area spacing, panel scrolling and orbit/pan/zoom outside the panel.

Automated status: focused Helios/release and shell-comparison checks pass 17/17; full local and hosted Topology suites pass 3,440/3,440 (0 failures/cancelled/skips); changed JavaScript syntax and `git diff --check` pass. Hosted Chromium subdivision comparison completes 11/11 parity, aggregate `LAB_ONLY`; artifact `subdivision-wasm-headless-43535835773` (ID `14088514733`). Pages `43535834843` succeeds. Live shell reports `.1159`; the right panel is visibly upper-right. Native iPad portrait/landscape panel, scrolling, controls and trace acceptance remain pending. User `.1157 PASS` and `.1158` styling acceptance are protected.

## .1160 Helios 512 spp and reset controls — hands-on check

- [ ] In VIEW > Helios > Ray Tracer, select **512 spp** and confirm the sample count accumulates to 512 and then converges.
- [ ] Change the selected light's settings, tap its circular-arrow reset once, and confirm that light returns to its default values while other lights remain unchanged.
- [ ] Change a material's albedo and PBR sliders, tap its reset arrow once, and confirm its values return to the current GLB's initial values.
- [ ] Repeat material reset on an imported GLB with texture maps; confirm textures remain connected and the saved BoxLab project material is unchanged.
- [ ] Confirm the right-side panel remains usable in portrait/landscape and the reset targets are easy to tap.

Automated status: focused release/dock/comparison checks pass 20/20; local and hosted Node suites pass 3,440/3,440 (local 71.944s), zero failures/cancelled/skips; changed JavaScript syntax and cache-contract checks pass. Pages `43552236354` and Topology `43552236764` succeeded on runtime commit `b9abd9dfa059d9c2d9faae5a5bca9d9e89c45a86`. Hosted Chromium reports 11/11 exact subdivision parity, aggregate `LAB_ONLY`, artifact `subdivision-wasm-headless-43552236764` (ID `14096229662`). Live title/version is `.1160`; cloud browser WebGL is disabled, so iPad PASS/FAIL remains pending. Helios Studio standalone is release `0.1.0`, and the independent BoxLab and HeliosStudio repos now develop side by side; see `AI_HANDOFF.md`.


## BoxLab .1167 — retain Helios map replacements across mode switches

The `.1166` map upload PASS is protected. The reported PBR → Helios reset is fixed in
the existing pathtrace lifecycle owner; user acceptance is pending.

- [ ] Replace a Metalness or Roughness map, switch to PBR, then return to Helios. Confirm
  the replacement preview and rendered result remain active. Repeat for each slot used.
- [ ] Select Restore preset maps, switch to PBR and back, and confirm source preset maps
  remain restored. Then replace one slot again and confirm Restore replays before the
  newer replacement.
- [ ] Confirm the BoxLab object's saved material/project data is unchanged. Verify the
  prior `.1164` dock styling and `.1165` mapping controls remain intact.

Automated lifecycle coverage verifies map replay, Restore ordering, stale-scene cleanup
and release pins. Focused Helios/release checks pass 29/29; full local suite passes
3,453/3,453 (118.807s). Changed-module syntax checks and `git diff --check` pass.
Hosted Topology `43692331821` passes 3,453/3,453; headless Chromium subdivision parity
is 11/11 (`LAB_ONLY`). Pages `43692331687` deployed runtime commit
`79b644d1cbf4c150215c624daa7a653e582aa0f1`. iPad acceptance remains pending.
