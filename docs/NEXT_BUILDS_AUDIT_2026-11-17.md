> Priority order superseded by [UV audit and unified B / H / UV progression](UV_AUDIT_AND_ORDERED_BUILDS_2026-11-17.md). User places robust UV creation and painting ahead of optional renderer features. Findings below remain supporting evidence.

# BoxLab and Helios Studio: next-build audit

Audit date: 17 November 2026. This is a source and release-evidence audit, not a new application release or a claim of fresh physical-iPad testing.

## Recommendation

BoxLab's next narrow runtime build should protect the complete selection → radial Extrude → inward cut → Undo workflow with a real-browser test. Helios Studio's next runtime build should repair custom-texture allocation and guard asynchronous texture/model replacement. Apply the shared texture fix to BoxLab's vendor copy in a separate, verified integration build. Follow with measured modelling performance, standalone material parity, and saved Helios setups. Defer geometric displacement until the texture/memory and fidelity foundations are sound.

Do not introduce a second modelling kernel, renderer, or material owner. Do not repeat the rejected WASM benchmarks merely to obtain a better result. Runtime version numbers below are suggestions; allocate them from actual main when implementation starts.

## Baselines and evidence

| App | Audited main | Current runtime | Evidence and limits |
|---|---|---|---|
| BoxLab | `a83ba7222222346316e8ed495ae5c596ff3a03f8` | 0.36.18.1188 | Local 3,507/3,507 tests passed in 93.407s before publication. Hosted Topology run 44082843031 subsequently succeeded; Pages run 44083125547 succeeded. User now reports PASS for .1188. This accepts the warning-based NOMAD export; no separate .1187-only device result was stated. |
| Helios Studio | `d9d7df4ba5d0ad18f1f1219885326f79fdb477e9` | 0.1.4; runtime `0e79c5163e5d87703d369250e1a9fff9e2b9085f` | Pages runs 43663848502 and 43663949379 succeeded with locked install, type-check and production build. No fresh local Helios build was run for this audit; Bun is unavailable locally. Repo still marks .1.4 device checks pending; BoxLab integration documents describe that upstream base as accepted. Reconcile that documentation without inventing a new device PASS. |

Inspected workflow/handoff/checklist/history/roadmap, release markers, latest commits/Actions, UI handlers, import/export, material/texture engines, vendor provenance, performance reports, and regression coverage. Source comparisons found exact matches for preset catalogue, preview helper, BVH and UV cleanup; models, textures, tracer and types have diverged. The audit executed the actual allocator method with controlled non-GPU dependencies in both repositories; it did not run an interactive GPU scene.

## What is already present

| Capability | BoxLab Helios VIEW | Standalone Helios Studio |
|---|---|---|
| 28 material presets and visual gallery | Present | Present |
| Albedo, normal, roughness previews/replacement | Present | Present |
| Independent metalness-map preview/replacement | Present (.1166) | Missing; metalness scalar exists |
| U/V scale, offset and rotation; normal relief | Present | Present |
| Emitter opacity | Present | Present |
| Non-emissive surface opacity scalar | Present (.1168) | Missing |
| Opacity/cutout map slot | Missing | Missing |
| PNG image capture | Present, waits for sample target | Present, captures current viewport/render mode |
| True silhouette-changing displacement | Missing; retained height maps and diagnostics exist in BoxLab | Missing; normal relief exists |
| Persistent user-authored Helios setup file | No render-session sidecar; in-memory rebuild retention exists | No setup serializer found |

Do not schedule already-delivered features as new work. In particular: do not rebuild the material gallery, add a second PNG button, add another UV transform owner, or describe normal relief as geometric displacement.

## Confirmed findings

### 1. Custom-texture slots can overwrite an existing material — high priority, both apps

`PbrTextureManager.allocateCustomLayer()` has eight slots and wraps its counter to zero. Executing the unchanged allocator nine times returned `100,101,102,103,104,105,106,107,100` in both repositories. The ninth allocation therefore selects an occupied layer unless the caller separately prevents it.

Standalone `StudioEngine.uploadMaterialTexture()` has no eight-slot guard. Both model importers call the allocator directly. BoxLab's `boxlab-entry.ts` rejects some direct uploads at eight active layers, but that is not a complete allocator fix: imports bypass it, and after restoring a non-next layer, a simple active-count check does not guarantee that the next counter slot is free.

Repair in the existing texture manager: explicit ownership/free-slot allocation and release, transactional import reservations, and clear capacity warnings. Keep eight slots initially rather than multiplying memory. Test 8→9, restore material 4 then allocate, reuse existing slot, failed upload and interrupted import. No previously textured surface may change when another material receives a map.

Source: Helios `src/engine/textures.ts` allocation and `src/engine/StudioEngine.ts` upload; BoxLab equivalents under `src/helios-vendor`, importer `engine/models.ts`, and `boxlab-entry.ts` upload/restore.

### 2. Async import/upload has stale-result hazards — high priority, prove scenarios with tests

Standalone clears the live texture counter and layer map before `await importModelFromFile()`, then installs the result without a request-generation check. Texture uploads reserve a layer before image decoding and publish after the await without checking whether the project/material has changed. Failed import can disturb the old scene's bookkeeping; earlier slow operations can finish after newer choices. These are confirmed code paths; visible corruption from each timing scenario was not reproduced on an iPad during the audit.

BoxLab has generation checks around rebuilding its tracer, but an individual dock upload awaits `tracer.uploadMaterialMap()` and then updates saved map state using current global scene state. Audit that smaller transaction too. A top-level rebuild guard does not prove per-upload safety.

Stage imports/resources privately; commit only if request, scene and material identity still match. Dispose abandoned resources and release reservations. Test delayed upload A→B, upload→preset Restore, upload→scene change, failed import and dispose during decoding. Do not add a parallel asset manager if the existing owner can hold request tokens.

### 3. Imported material fidelity has bounded and silent losses — high priority after allocation

Both importers select `mesh.material[0]` when a mesh has a material array, assign a single replacement material, and redirect materials beyond twenty to the first material. Standalone material construction also sets transmission to zero, IOR to 1.5, clearcoat to 0.1 and emissive intensity to zero instead of preserving source values. BoxLab has added packed roughness/metalness handling and scalar opacity, so do not overwrite its importer with the older standalone copy.

Build fixtures for a grouped multi-material mesh, separate roughness and metalness maps, a transparent/emissive source, and 9/21-material scenes. Preserve supported fields; warn explicitly for unsupported data/capacity. GLTF external `.bin`/texture references also need a declared import policy: the current single-file `loader.parse(buffer,'',...)` route is not evidence of a complete multi-file GLTF package importer.

### 4. BoxLab's surface-opacity reset omits the new field — small confirmed gap

`pathtrace-mode.js` reset-material key list includes emitter opacity but omits `surfaceOpacity`, although the vendor material API accepts it. A material can therefore stay translucent after Reset. Add that field and test PBR/path-trace agreement plus independence from emitter opacity. Keep this a small repair, not a shading redesign.

### 5. Whole browser workflows are less protected than geometry kernels

BoxLab has 3,507 passing tests and mandatory inward/Knife/launch gates. Most relevant interaction fixtures execute real handlers in a controlled VM. The .1187 selection regression demonstrates why passing geometry tests cannot prove event capture, radial proxy click, browser focus and DOM lifecycle together. Existing CI headless Chromium runs the subdivision benchmark, not the complete modelling route. Local Chromium was blocked by socket restrictions in the preceding build; CI is the available browser-runner owner.

Helios package scripts expose build/type-check but no behavior-test command; its Pages CI performs no material/import behavior tests. Add tests for existing failures as part of each repair. Preserve touch gallery acceptance and avoid an unrelated UI rewrite.

## BoxLab build sequence

| Rank / suggested build | Narrow scope and user benefit | Completion gate | Risk / effort |
|---|---|---|---|
| B1 / .1189 | Real-browser select multiple faces → open radial → Extrude → inward/through → Undo/Redo. Include Inset and direct-button route. Fix only failures actually reproduced. | Browser selection count/highlight, mesh output, one history step, cancel/focus behavior; existing protected suites and full tests unchanged. | Medium; one QA/repair build. |
| B2 / .1190 | Fix surface-opacity Reset and import the tested shared texture-allocation repair once Helios H1 is ready. Keep those as separate builds if integration expands. | Eight-slot, freed-slot, overflow/import and reset parity tests; no saved BoxLab material changes. | Medium; depends on H1, not on new map features. |
| B3 | Profile large multi-region inward previews in the actual owner, then reduce redundant work. Existing cutter processes each selected cutter, assembles/validates each trial, and may restart for additional corner relief. | Representative 5/18/32-region and dense/sloped cases; pointer-to-preview/commit latency, allocation counts, exact geometry/Undo parity; release/cancel cannot publish stale preview. | Medium/high. Measure first; do not claim a general speedup from a single timing. |
| B4 | Address the measured imported-mesh interaction bottleneck: body/cage/highlight rebuilds or face picking, whichever traces identify. | Full gesture cycle including lifting/reapplying fingers; 10k/50k/100k representative meshes, object list/delete and texture-present cases; no concave/front-selection regression. | High; narrow to one authoritative owner per build. |
| B5 | Finish authored opacity-paint NOMAD handoff. .1188 handles incompatible UV fallback, but valid-UV `opacityPaint` still triggers an explicit native-core refusal. | Native NOM opacity/color-alpha semantics, facegroups, matching UVs, mixed objects and unchanged source resources; geometry-only warning path retained. | Medium/high; do not silently drop valid authored opacity. |
| B6 | Port accepted standalone import/material fidelity and saved-render-setup improvements. Save render settings/assets separately from editable BoxLab mesh/material data. | Repeat view switch/rebuild, save/reopen render setup, scene identity mismatch and missing assets; original .boxlab content unchanged. | Medium/high; coordinate with H3–H5. |

B3 and B4 are different workloads: expensive modelling previews and imported-scene navigation. Reuse the existing performance monitor/trace rather than add a second diagnostic dashboard. Suggested performance acceptance is no correctness regression and an improvement in full-operation median and tail latency on the same representative workload, with bounded retained memory; select numerical targets after establishing a stable baseline.

## Helios Studio build sequence

| Rank / suggested build | Narrow scope and user benefit | Completion gate | Risk / effort |
|---|---|---|---|
| H1 / 0.1.5 | Fix eight-slot ownership/release and failed allocation/import rollback. Add the first executable behavior tests and a CI test step. | Ninth texture warns without overwriting; restored slot reused safely; existing eight retain their pixels. | Medium; highest priority shared correctness repair. |
| H2 / 0.1.6 | Protect asynchronous model/map operations with request and scene tokens. | Slow A→fast B, Restore during decode, failed import, scene switch and disposal; abandoned resources released. | Medium; stage private state before live commit. |
| H3 / 0.1.7 | Bring standalone up to tested BoxLab material parity: independent metalness slot and packed-channel preservation, then non-emissive scalar opacity. Split if needed. | Roughness G/metalness B independently preserved; PBR and ray-trace opacity/reset/shadow behavior; normal/emitter behavior unchanged. | Medium; backport selective fixes, not the BoxLab adapter. |
| H4 | Repair grouped material import and preserve supported source material properties; make limits explicit. | Grouped mesh, glass, emissive, separate scalar maps and overflow fixtures render as declared. | Medium/high; depends on H1/H2. |
| H5 | Save/reload a Helios setup: camera, lights, environment, material scalars/transforms and uploaded maps/model linkage. | Reload matches, references validated, malformed/missing assets recover, source geometry unchanged; test quotas/size before choosing embedded vs referenced assets. | High; first useful persistence build should be bounded. |
| H6 | Dedicated render-output settings: chosen dimensions/aspect and quality target, with preview-independent capture. Existing screenshot export remains. | Output dimensions/color correct, overlays excluded, cancellation restores preview, no giant uncapped render targets; native iPad test. | Medium/high; start with bounded output sizes, not unconditional 4K. |
| H7 | Add opacity/cutout map, then optional AO/packed ORM controls with clear channel semantics. | Both renderers agree; upload/Restore/persistence/capacity tests; no unnecessary new texture array for channels that can reuse existing storage. | Medium/high; do not treat AO as a substitute for ray-traced GI. |
| H8 | Evaluate true geometric displacement on a small controlled scene. | Distinguish normal, parallax and geometry results; silhouette/depth/shadow fidelity; explicit tessellation/BVH/memory budgets and cancellation. | High; experimental, multiple builds; not the next production feature. |

## Performance and WASM assessment

BoxLab already contains real WASM trials. The iPad body-packing report rejects production promotion: JS medians 1/2/3 ms versus WASM 2/2/4 ms for 10k/50k/100k, with extra retained WASM memory and coarse ~1 ms timing. The .1152 iPad subdivision comparison has exact parity but a 4,096-source/level-1 row of 7 ms vs 7 ms and only conditional benefit elsewhere; production remains JavaScript. These results reject those bridges, not WebAssembly generally. Do not schedule another identical benchmark or promise that WASM raises browser memory capacity.

Helios currently allocates three custom 1024×1024 RGBA arrays across eight layers: **96 MiB of CPU backing arrays**, once custom storage is allocated, plus about **10.5 MiB** for three 14-layer 256×256 preset arrays. GPU copies, mipmaps, per-material Three.js textures, render targets, BVH and transient decode buffers are additional; these arithmetic counts are not measured total browser memory. Texture budget/lifecycle work is therefore a prerequisite for more maps, larger textures or displacement. Worker/BVH acceleration may help preparation responsiveness, but WebGL rendering remains GPU work and must be measured separately from JS/WASM geometry preparation.

## Coordination and work deliberately deferred

1. Keep independent version numbers and publication records. Shared changes start in the existing standalone owner, then receive a separate BoxLab vendor/adapter integration and tests. First reconcile the already-shipped BoxLab-only fixes upstream deliberately.
2. Keep preset/preview/BVH/UV-cleanup parity checks for files that should match; allow documented differences in models/textures/tracer/types. Never wholesale replace the vendor folder with older upstream files.
3. Simplify the current roadmap front pages. Both contain stale acceptance wording; BoxLab's long roadmap retains superseded "current" sections. Put the approved current queue at the top and preserve older entries as history. This audit is a recommendation, not authorization to implement every row at once.
4. Defer more decorative presets, another radial/layout redesign, a new renderer/modelling kernel, automatic production WASM promotion, blanket 4K textures and unbounded displacement. Existing work already covers much of the visible feature set; correctness, saved setups and responsiveness provide more value now.

## Evidence pointers

BoxLab: `AI_WORKFLOW.md`; `tests/face-extrude-launch-1187.test.mjs`, `tests/many-region-through-1186.test.mjs`, `tests/corner-recess-1183.test.mjs`, `tests/knife-multiface-1182.test.mjs`; `.github/workflows/through-regression.yml`; `src/multi-face-direct.js`, `src/through-kernel.js`, `src/main.js`, `src/pathtrace-mode.js`, `src/nomad-export-core.js`; `src/helios-vendor/UPSTREAM.txt`; `docs/performance-wasm-body-ipad-1146.json`; roadmap .1150/.1152 native results.

Helios: `package.json`, `.github/workflows/pages.yml`; `src/engine/textures.ts`, `StudioEngine.ts`, `models.ts`, `bvh.ts`; `src/types/studio.ts`, `src/App.tsx`, `src/components/BottomDock.tsx`; `AI_HANDOFF.md`, `ROADMAP.md`, `TEST_CHECKLIST.md`.

All priorities are engineering recommendations from the audited source. Device-specific timings, visual regressions and actual saved-model cases still need their own evidence; none are inferred merely from a passing type-check or kernel test.
