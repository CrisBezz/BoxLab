Warning: truncated output (original token count: 191378)
Total output lines: 10129

# Current build: .1087 imported NOM/GLB UV Paint — automated PASS; device pending (6 November 2026)

## Delivered and protected

- `.1087` reconnects imported NOM and GLB UV meshes to the existing viewport painter, paint binding, history and `.boxlab` project codec. It preserves the source payload and solid base colour while painting.
- Scope is deliberately bounded to complete UVs in tile 0–1, one solid material, no embedded images, vertex colours, tangent maps or morph targets, and 20,000 corners maximum. Imported image textures and multi-material meshes remain protected and cannot enter Paint yet.
- Focused imported-Paint tests: 3 PASS / 0 FAIL. Focused surrounding Paint/project/export/NOM-retention tests: 24 PASS / 0 FAIL. Full `.1087` local regression: 3,171 PASS / 0 FAIL; `git diff --check` clean. Publication status is recorded in `DEV_HISTORY.md` after deployment.
- `.1086` native PASS: Colour + Opacity paint in one stroke; Done/reopen/redraw; exported GLB transparency and reverse faces in Nomad; opacity-only GLB transparency. Protect this acceptance.
- `.1086` exports authored opacity through the existing paint snapshot/export owners, using the bound 512 × 512 R8 map in base-colour RGBA. Materials use standard glTF `BLEND` and double-sided rendering; opacity-only maps use white RGB. OBJ and NOMAD remain unsupported for authored opacity.
- Preserve `.1085` onset/Paint PASSes and earlier Paint PASSes.

## Next: finish imported textured NOM/GLB UV painting

Keep WASM queued until imported textured painting is usable and passes its native gate. Next extend the existing import and paint owners so authored paint composes with eligible imported base-colour images without dropping the source maps, UV transforms, or material appearance. Audit multi-material and tile behavior before broadening eligibility. Retain explicit safe refusals for unsupported source materials until their composition path is covered.

After imported NOM/GLB painting passes, begin the measured WASM feasibility audit. Establish repeatable JavaScript baselines for existing performance-sensitive owners, then prototype only an existing operation if evidence shows a worthwhile target. Keep the JavaScript owner as fallback; require equivalent output and a measured speed gain. Treat memory capacity as a separate test.

## Protected device results — 6 November 2026

`.1087` imported NOM/GLB textureless Paint is pending native acceptance. `.1086` combined Colour/Opacity, Done/reopen/redraw, transparent/double-sided GLB and opacity-only GLB PASS. `.1085` clean Pencil onset, pressure sizing, tap, Undo/Redo and four-channel stroke PASS. `.1077` compact Paint/four-channel strokes, `.1076` two-sided opacity preview, `.1075` opacity authoring and `.1074` brush controls PASS.

## Protected device results — 4 November 2026

PASS .1074 Pencil onset and brush pressure controls. PASS .1071 image adjustments. PASS .1070 proportional image import. These gates are closed. Continue with the next open roadmap priority below.

## .1074 — brush controls and Pencil onset — 4 November 2026

.1073 native FAIL: strokes started at the upper right with Size 256 and a large head. The first moving pressure sample could still stamp an oversized head. .1074 confirms it against the next distinct moving sample and uses the lower reading for the initial segment. Later samples retain normal dynamics. Taps retain release behaviour.

Brush tip settings are visible in Brush controls. Independent Pencil Size and Opacity toggles use the sliders as ceilings. Size 256 gives the full size range. Defaults remain pressure sizing on and opacity dynamics off. Fill uses slider opacity and hides pressure options.

Native gate: test light Size 256 strokes with both brushes, all four toggle combinations, deliberate taps and combined channels. User device PASS for .1074 on 4 November 2026. Pencil stroke onset no longer produces the large dab. Protect the two-sample onset handling and independent Size/Opacity pressure controls. Standing main/Pages push authorization applies.

## .1073 — defer the positive Pencil-down stamp — 3 November 2026

USER .1072 FAIL: screenshot visibly reports v0.36.18.1072 and shows round thick caps followed by thin strokes. Zero-pressure/stale-pressure handling was insufficient. Do NOT claim .1072 repaired the native onset, or explain this as stale cache. Auto removal remains retained (14 sliders), but no unrelated device PASS is inferred.

Audit found createStroke.start always emits an immediate dab. The main painter still called it on every positive initial event; a large first reported pressure followed by light movement therefore permanently stamped the cap. No actual device event-pressure trace was supplied: a high-positive-down/light-motion stream reproduces this failure pattern, but is not a claim about Safari's exact reported values. Existing .1072 tests exercised zero starts and genuine constant-low starts, not a positive first-sample spike or uncommitted preview pixels.

Repair only original viewport UI/painter owners. Pencil input marks deferPenStart; mouse/direct API strokes remain immediate. Pencil down claims/captures the existing Paint contact and suspends orbit, but does not start the original BoxLab/Klecks path or stamp visible pixels. Stationary samples update the latest pressure without ink. On the first positive moving sample, start the SAME path at the contact origin using the MOVING sample's pressure at both ends of that first segment, discarding the unsettled down pressure. If the origin was unpressured, start at the current pressured location so no bridge is painted across unpressured travel. No timer, artificial pressure floor, motion threshold or new input owner.

A deliberate stationary tap stamps on release with the latest pressure from that contact; an all-zero contact still creates no pixels/resources/history. Pending cancellation/lost release disposes the same original transaction and restores controls. Fill and image placement retain their existing immediate pressure-independent paths. All multi-channel scratch layers share the same deferred path. No-op finish now refreshes the original material preview after discarding scratch layers, so a pending/no-ink contact cannot leave a temporary scalar preview displayed. Existing single checkpoint, stencil/alpha, tool/radial/camera and gizmo owners remain. Native acceptance is still required.

Three new integration tests use the actual UI and painter: .9 down followed by .035 motion must match a .035 reference PIXEL FOR PIXEL in Colour/Roughness/Metalness, in BOTH brush paths; draft viewport texture must remain white on down (not merely resource undefined until commit). Stationary .9→.04 settling remains visibly unpainted until release and matches a .04 tap; pending positive cancellation with pressure sizing disabled leaves no resources/history and restores controls. Prior .1072 zero onset/no bridge, .1047 Paint-not-orbit/Done-reopen, .1059 colour-focus/lost-release and all-channel tests remain active.

Focused: 23 PASS / 0 FAIL across onset, existing pressure/contact/all-channel cases; 14 release/cache/radial checks PASS / 0 FAIL. Only main viewport/painter and release loader pins refresh to .1073; original raster kernel .1071, stroke/Bezier .896, 14-control adjustment UI/helper .1072, importer .1070, camera .1057, edge .1062, palette .1061 and protected Multi1.0 remain unchanged. No broad UI cleanup or parallel stroke implementation.

Validation complete: 37 focused checks PASS; hosted full regression 3156 PASS / 0 FAIL (run 41635394374, job 125915185206, runtime commit bb9ea4fb34d965a51b00619c844a4bd21d1c28fe). Pages run 41635392457 succeeded. Live version.json, index.html, viewport-paint.js, viewport-paint-core.js and shell-comparison.js bytes match the .1073 runtime sources. Native Pencil acceptance remains PENDING; no device PASS inferred. Device: repeat the long light lines from the supplied .1072 screenshot; first moving stroke should not acquire a large round head. Firm-to-light starts; deliberate tap/lift (tap inks on release), both brushes, combined Colour/Roughness/Metalness, Undo/Redo, Done/reopen and finger navigation. Next: native onset feedback; if failure remains, collect first-event pressure/motion evidence before another speculative algorithm change. Earlier native adjustment/import/layout gates remain pending. Standing direct-main push/publish authorization remains active.

## .1072 — first-contact Pencil pressure and removal of Auto — 3 November 2026

User reports an unwanted dab on the first touch even when lowering Pencil lightly. During this same build user explicitly requests removal of the useless Auto slider. No .1071 device PASS inferred; .1070 import/.1068 layer layout and .1071 native adjustment gates remain pending. .1069 Home Screen and earlier functional PASSes stay protected.

Audit found the authoritative viewport point adapter initialized lastPressure to 1, ignored zero pressure, and substituted previous positive pressure or 1 for first contact. A zero-pressure Pencil down could therefore stamp a full/stale-size brush immediately. Reset pressure to 0 on each fresh Pencil down (including lost-release recovery). Finite current pressure, including zero, updates the per-contact value and is clamped to 0–1; missing initial pressure stays zero. Only pointer-up retains last current-contact pressure to finish the existing tail. Mouse still uses 1. No arbitrary dead zone, delay or minimum-force threshold was added; actual low positive pressure remains low.

Original viewport painter now skips zero-pressure sampled dabs even if pressure→size is disabled. Its existing stroke stores waitingPressure until the first positive sample, then restarts the SAME original path at that actual location. Stationary pressure rise therefore paints intentionally without requiring pointer movement; unpressured travel does not draw a bridge from the initial touch. Both BoxLab/Klecks, multi-channel scratch layers, cancel/missed-up recovery, stroke history, contact capture and navigation owners remain original. Fill and image placement retain their pressure-independent behaviour. No raster kernel, camera, gizmo, mesh or new raw-pointer owner.

Remove Auto from the shared PAINT_ADJUSTMENTS descriptor and delete its unused histogram/percentile transform. Native panel therefore shows exactly 14 sliders; all remaining settings, cached filters, Before/Reset/Cancel/Apply and image conversion warning remain. Old applied pixels stay baked; no project migration or stored slider state exists. Tests explicitly reject a future reintroduction of auto settings. Re-pin adjustment helper→UI→viewport and current painter/release loader graph to .1072; original .1071 raster kernel remains untouched and pinned. New docs/paint-adjustments-1072.html exercises the current 14-control panel; .1071 proof/history remains historical.

Focused validation: 32 PASS / 0 FAIL across five new first-pressure tests, .1071 adjustment suite, all-channel tools, .1059 contact recovery and radial workflow; 9 release/cache checks PASS. New coverage tests zero contacts with pressure sizing on/off and both brush paths, no scalar/history resources, stationary onset, genuine small positive dabs versus firm dabs, zero/unknown contacts after firm strokes, no unpressured bridge, cancel/control restoration, mouse taps and Fill. Original positive-pressure zero-buttons coalesced movement and colour-focus/lost-release recovery remain covered. Auto absence and all 14 remaining slider effects/neutral/cancel/apply behaviour are covered.

Initial hosted Topology 41629906235 reported 3,152 PASS / 1 FAIL: historical paint-orbit-pressure-1047 explicitly required an all-zero-pressure tap to paint. This is the behaviour the user now asks to remove. Updated that original test to retain claimed/prevented Pencil contact, orbit-disabled ownership and Done/reopen assertions, add zero-pressure no-resource/no-history assertions, then require positive stationary pressure to paint exactly one checkpoint. Corrected focused run 8 PASS / 0 FAIL. Runtime code unchanged; application release remains .1072. Pages 41629904112 succeeded and all seven checked live files byte-match runtime e208f92bfbab99bb586dbe55c2e71e7b0905aa94. Browser fixture shows exactly 14 sliders starting with Exposure, no Auto, working Exposure/Brightness preview and Cancel leaving zero edits. Proof docs/paint-pressure-auto-1072-proof-1793706371075.jpg. Corrected hosted Topology 41631063517 (job 125900450459) passed 3,153 / 3,153, zero failures. Corrected Pages 41631063109 succeeded; runtime source remains byte-identical to e208f92bfbab99bb586dbe55c2e71e7b0905aa94 (tree 3474aa71ba7e8ffcc003394e92e159e54a5e8f02), with reviewed historical-test correction in 932cf514e46124bc2ee4206c3e1e0e135aa7f769. Seven live marker/shell/Paint/adjustment/fixture files byte-match tested runtime. 42 unique focused cases PASS / 0 FAIL. Browser inspection confirms exactly 14 sliders, Exposure first, no Auto; Exposure/Brightness preview enables Apply and Cancel retains zero edits. Archived proof docs/paint-pressure-auto-1072-proof-1793706371075.jpg. Native iPad first-touch pressure acceptance remains pending; no .1071/.1070/.1068 device PASS is inferred. Next: light start after firm stroke with pressure sizing enabled, both brushes/multi-channel paint, intentional taps/Fill/navigation, and remaining adjustment Apply/Cancel smoke. Device: gently lower Pencil then increase pressure; no large starting blob. Make a firm stroke then a light start, try both brushes and Colour with Roughness/Metalness. Deliberate tap, Fill, Undo/Redo, Done/reopen and finger navigation. Adjust layer starts with Exposure and has no Auto; remaining sliders/Apply/Cancel still work. Next: native first-contact and adjustment feedback before deferred height benchmarks. Standing direct-main push/publish authorization remains active.

## .1071 — Sharpen brush and selected-layer adjustments — 3 November 2026

User requests Sharpen paint tool, whole-image Blur/Sharpen and usual art adjustment sliders. User explicitly chose SELECTED LAYER over combined colour texture. This is new work, not a PASS for .1070 resize or .1068 layer layout; both native gates remain pending. .1069 Home Screen icon PASS and earlier protected Paint/camera/gizmo/edge behaviours remain.

Audit: original paint-core blurSnapshot, filter-domain/seam graph, viewport-paint-core resource/history and image-to-paint conversion already own this functionality. Extend them, not a second painter. New Sharpen action uses original one-pass premultiplied blur target as an unsharp reference; original Amount scales strength (8 = 1×), Opacity/Size/tips/pressure/contact cancellation remain original. Alpha/coverage is preserved. All Colour/Roughness/Metalness combinations and mask painting use original 512/1024 layers, stencil, filtered-domain and single-history transaction. Existing Blur/Smudge output remains protected. New inline Sharpen icon joins existing Paint radial; Brush retains first slot, other tools remain ordered. Tool routing now uses paintTools.length rather than hardcoded five tools.

Selected layer settings gains Adjust layer. Native modal blocks background input without adding a raw gesture owner. All 15 controls are present: Auto, Exposure (±3 stops), Brilliance, Highlights, Shadows, Contrast, Brightness, Black point, Saturation, Vibrance, Warmth, Tint, Blur, Sharpness, Definition. Own bounded editor formulas, not claimed Apple Photos algorithm parity. Colour layers/Base only; scalar-only and mask contexts refuse global colour adjustment. Mask, layer opacity/blend/order/visibility and other layers/scalar maps remain unchanged. Blur/Sharpness/Definition use original face/seam-aware read neighbourhood; UV atlas neighbours are never treated as connected surfaces. All controls preserve source alpha and transparent RGB.

Preview always renders from the opening raw layer snapshot (no repeated cumulative slider application). Auto uses alpha-weighted 1st/99th luminance percentiles; Exposure uses linear-light gain; separate fine/broad local detail targets reuse the existing kernel. Spatial targets and histogram are cached; input is debounced 160ms. Before/Reset/Cancel create no scene checkpoint. Apply preflights original pool/binding and makes ONE existing checkpoint. Neutral/no-op creates no history. Stale selection/resource/topology or checkpoint refusal cannot publish partial pixels. Existing imagePreview slot carries temporary layer candidate; existing commit owns publication. Tick/close retain original scene ownership.

IMPORTANT scope communicated to user BEFORE implementation: applying adjustments to an editable image uses the EXISTING rasterizeImagePaintLayer path, retaining its current placed/wrapped pixels as paint rather than trying to reconstruct a curved wrap from a flat image recipe. Dialog explicitly says Apply converts the image to paint; one Undo restores editable source/placement. Preview/Cancel keep the exact recipe; masks and settings remain. No source-image recipe mismatch, second projection, schema or save codec added. Applied adjustment values are baked pixels; reopening starts at neutral.

New paint-adjustments.js is a bounded colour transform helper sharing the original filter kernel. paint-adjustments-ui.js owns only native modal controls; access stays in original Paint layer panel. Main viewport/core/kernel pins .1071; accepted importer .1070, palette .1061, layer-list .1050, camera .1057, edge .1062, icon .1069 and protected Multi1.0 remain. Existing older standalone kernel consumers keep their previous URLs/semantics; reviewed hashes updated for the additive filter export and opt-in Sharpen path.

Validation: completed focused runs 27, 14 and 13 PASS / 0 FAIL (overlapping), plus original layer/mask nearby 14 PASS / 0 FAIL. Eight new tests cover all slider effects/neutral bounds, alpha, disconnected islands, brush sharpening/cancel, selected-layer preview/apply/Save-Open/Undo-Redo, stale/checkpoint refusal, explicit image conversion/Undo, actual UI access and one-step combined Colour/Roughness/Metalness Sharpen. Development-host 1024 helper sample: first spatial+tone render ~494ms, cached mixed ~129ms, cached detail-only ~49ms; excludes UV-domain construction and is NOT iPad frame-time evidence. Optimized away per-pixel iterators and caches filter targets. First spatial preview may pause; native device responsiveness remains a gate.

Add docs/paint-adjustments-1071.html to exercise the production modal/pixel helper on a generated browser sample without touching the app project; actual scene/history integration is separately tested above. Hosted Topology 41623847723 (job 125876122694) passed 3,148 / 3,148, zero failures. Pages 41623847372 succeeded. Runtime bf16f04a84780fce20c346eb047bee96843479ef, tree c6e612c1029ea1dda746fd347c5da6da5179c3d0: live version.json, index.html, viewport Paint UI/core, original paint kernel, both adjustment modules and browser fixture byte-match the checked source. 61 unique focused cases passed across successful focused runs. Real Chromium production-modal fixture confirms all 15 sliders, completed brightness and combined Exposure/Blur/Sharpness/Definition previews, Before disables Apply/restores original, Reset clears controls without edits, Cancel retains zero edits, and Apply closes with exactly one edit. Screenshot docs/paint-adjustments-1071-proof-1793703817744.jpg shows all 15 control names, explicit image-conversion notice and reachable footer. This generated-sample fixture validates real DOM/controls/pixel helper; actual painter resource/history/Save-Open and image conversion are covered by integration tests, not a claim of native iPad/WebGL acceptance. Native iPad responsiveness, Sharpen gestures and global layer adjustments remain pending; .1070 import and .1068 layer layout device gates remain pending.

Device: Paint radial → Sharpen; compare edge detail, Size/Opacity/Amount, combined channel previews and Undo. Layers → selected layer settings → Adjust layer; try tone/colour and Blur/Sharpness/Definition; Before, Reset, Cancel; reopen and Apply then one Undo/Redo. Image conversion warning, mask/blend/other-layer preservation, Save/Open, Done/reopen and Pencil/finger navigation. Next: native adjustment/import/layout feedback before deferred height benchmark work. Standing direct-main commit/push/Pages authorization remains active.

## .1070 — proportional incoming Paint image resize — 3 November 2026

User .1069 PASS protects approved three-box Safari/Home Screen icon installation and launch. No separate .1068 native Paint-row layout PASS inferred. User requests incoming images larger than 1024 × 1024 fit proportionally with longest side 1024, and asks whether files are live linked.

Audit: authoritative paint-image-source owns PNG/JPEG header preflight, browser decode, exact encoded bytes and decoded pixels; original File input refused >2 MiB or >1024 per side. Image recipes embed source bytes/pixels in the existing project pools: no path/URL live link. Add importResizedPaintImage in that same stateless module for the file-input path only. Strict inspectPaintImage/capturePaintImageSource/importPaintImage stay bounded to the original 1024-side/2 MiB stored source, and alpha tip size/bytes are unchanged. Existing image layers, save/export and projection owners remain authoritative.

Incoming files are preflighted before decode: PNG/JPEG, at most 16 MiB encoded, 8192 per side and 24 × 1024² pixels. Small images within stored budgets use the exact original import with no enlargement/re-encoding. Otherwise snapshot source before await; request high-quality bounded ImageBitmap, explicitly fit via canvas even if resize options are ignored, encode PNG with alpha or JPEG at .92 quality, validate stored dimensions/format/2 MiB budget, release bitmap/canvas and decode the normalized encoding through the existing importer. JPEG retained pixel cache therefore matches its saved lossy encoding. No crop, stretch, new EXIF/orientation policy, live-link mechanism, resource schema or pool-budget increase. Normalized PNG that still exceeds 2 MiB is refused with explanation; unsupported/truncated/extreme inputs refuse before allocation or leave the scene unchanged. Existing stale request/selection/session guard remains in the File input.

Only viewport Paint uses the new .1070 importer URL. Existing alpha/capture consumers retain their .907 stateless URL and original semantics; reviewed hashes for the shared file are updated for both URLs. Parent viewport Paint .1070 and release/cache chain refreshed; .1066 core, .1068 layer CSS, gestures/camera/gizmo, icon assets and protected Multi1.0 retained. Add isolated docs/image-import-resize-1070.html for real browser PNG/JPEG scaling, alpha, row orientation, small-source byte equality and reopened pixel checks; no project/WebGL mutation.

Validation: focused importer/source/alpha/UI/image-layer/Base/history/project/NOM and release checks pass (individual runs 29, 17 and 9, zero failures; overlapping coverage). New importer tests exercise landscape, portrait, square, rounding/one-pixel aspect, exact small images, ignored decoder resizing, HTML and Offscreen encoder paths, JPEG storage/cache, before-await snapshot, bounds and failure cleanup. Real Chromium browser fixture: 4 / 4 PASS for PNG 2048×1024→1024×512, PNG 1200×2400→512×1024, JPEG 4032×3024→1024×768 and unchanged PNG 64×32. Actual browser encoders/decoders verified row orientation, PNG alpha, exact small-source bytes and reopened normalized pixel equality. Screenshot docs/image-import-resize-1070-proof-1793698823423.jpg. Hosted Topology 41612660143 (job 125838188025): 3,140 PASS / 0 FAIL. Unique focused cases 43 PASS / 0 FAIL. Pages 41612658677 succeeded. Runtime 11584f64f44e2b63a73e7cec2f731c6905b605c8, tree 7b7ec1f34cf879d0654f39543dc87a3665960fba: live version.json, index.html, viewport-paint.js, paint-image-source.js and browser fixture byte-match the checked source. Native iPad import/placement/Save-Open acceptance remains pending. .1069 Home Screen user PASS protected; no additional .1068 layout PASS inferred.

Device: + Image with a large landscape and portrait PNG/JPEG; proportions remain correct, no cropping. Place/Apply, Undo/Redo, Save/Open and Edit image; stored copy remains embedded. Try a transparent PNG and a small image; alpha stays and small images are not enlarged. Input safety caps above remain. Next: native image-import feedback; .1068 layout acceptance and .1064 height timings remain pending. Standing direct-main push/publish authorization remains active.

## .1069 — approved three-box Home Screen icon — 3 November 2026

User approved the edited Three Box Symbol (green upper hollow box, blue lower-left, red lower-right, bottom-centre notch) and requested it for File → Add BoxLab to Home Screen. Protect this artwork choice; this approval is NOT a device PASS for the .1068 Paint layout repair, whose native acceptance remains pending. .1066 and earlier functional PASSes remain protected.

Audit: src/pwa-install.js already owns the File button, deferred native beforeinstallprompt and Safari Share → Add to Home Screen guidance. Preserve that owner and its exact source/pin. index.html and manifest.webmanifest still referenced the old .28.3 SVG. Replace active links with opaque square PNG exports of the approved image: 180px apple-touch-icon, 192/512px manifest icons and 32px favicon in icons/boxlab-1069-*.png. Versioned filenames and refreshed manifest URL avoid reusing old icon URLs. Keep relative start_url ./, standalone display, background/theme and original install path. Add apple-mobile-web-app-title BoxLab. No fake native install, share-sheet interception, new handler or service worker. Retain legacy icon.svg and frozen betas without changes; they are no longer active main-shell icons.

Export only: direct proportional downsampling of the approved raster, opaque RGB, no artwork regeneration/crop/rounding. icons/README.md records provenance and sizes. Only release/cache metadata in drawer-ui/face-workflow-layout and screen comparison updates; protected Paint UI/core, camera, gizmo, edge tools and Multi1.0 retain accepted bytes/pins. Reviewed asset contract includes all installed PNGs and refreshed manifest/parent loader URLs.

Validation: 15 focused release/cache/identity/frozen tests PASS, zero failures. Actual original install owner executed in a VM: Safari guidance, deferred native prompt once, then Safari fallback PASS. All four PNG signatures, declared dimensions, 8-bit RGB/opaque format and manifest start/display checked. 180px export visually reviewed. Hosted Topology 41606348676 (job 125817017568) passed 3,133 / 3,133, zero failures. Pages 41606347317 completed successfully. Runtime f732a77e03d3e5aab499fc35c328b533dfbce3c7, tree 944a598cf334315239edb605522ed5761f3bf110: live version.json, index.html, manifest.webmanifest, all four PNG icons and shell-comparison.js byte-match the checked release. Native Safari Add to Home Screen preview/launch acceptance remains pending; .1068 Paint layout device gate remains pending.

Device: open .1069 in Safari, File → Add BoxLab to Home Screen, then Safari Share → Add to Home Screen; preview must show the approved three-box icon and BoxLab name. Add it and launch the Home Screen web app. Existing saved shortcuts may retain their previous icon; test a newly added shortcut rather than promising automatic replacement. Also confirm .1068 Paint layer rows remain readable/scrollable with settings open. Next: native install-icon/layout feedback, then deferred .1064 height timings. Standing direct-main push/publish authorization remains active.

## .1068 — expanded Paint settings without compressed layer rows — 3 November 2026

User FAIL .1067: screenshot shows layer rows compressed into thin strips after removing the Selected layer settings disclosure. Do NOT protect .1067 layout as accepted; .1066 Base/mask/channel tools and earlier interaction PASSes remain protected. Keep the requested settings open rather than reinstating a disclosure.

Audit: Layers is a height-capped CSS grid with an overflow-auto layer list. Expanded section consumes intrinsic space while default auto grid tracks allow the scrollable list and overflow-hidden row tracks to shrink toward zero. The previous DOM/state tests and green full suite did not verify CSS row dimensions and missed this failure. Repair only existing viewport-paint CSS: max-content auto rows/start alignment in the outer Layers grid, max-content rows plus 52px minimum in the list, and 52px minimum row height. Retain 42vh panel/200px list caps and scrolling, right dock, open settings, control IDs/listeners and protected .1066 core/pin. No new panels, gesture/layout polling or modelling changes.

Add docs/paint-panel-layout-1068.html as an isolated rendering regression fixture, not a second Paint UI owner. It extracts current Paint Layers markup/styles and uses the actual createPaintLayerList module in four independent 320×620/320×450/220×450 iframe cases with 2/4 rows. Reports real computed row heights, list viewport and reachability of the last row/settings; comparison removes only the repair rules to reproduce .1067 sizing. No project/WebGL required. Cloud browser cannot create WebGL; fixture is needed for real browser sizing evidence. Local Chromium download was unavailable (truncated vendor download); no claim of native iPad reproduction from DOM mocks. Focused checks: 38 PASS / 0 FAIL across actual layer/Base/mask UI, contact/palette and release/cache wiring. Real Chromium layout fixture: all four 2/4-row compact cases PASS with 52px rows, 107/200px list viewports and last-row/settings reachability. Removing only the repair rules reproduced .1067 in every case: 2px rows and a zero-height list viewport. Browser proof: docs/paint-panel-layout-1068-proof-1793692954936.jpg. Hosted Topology 41599816025 passed 3,133 / 3,133, zero failures; focused checks 38 PASS / 0 FAIL. Pages 41599815167 succeeded. Runtime 9d40c1407400c5f44bd64939bcb0e27b8f1a402d: live marker, shell, Paint UI and layout fixture byte-match the release tree. Native iPad visibility/scroll acceptance remains pending; .1067 remains FAIL.

Device: Paint with 2–4 layers shows full readable rows, names/thumbnails and selection; scroll list/panel to lower layers/settings; settings remain open, footer/Done reachable; Done/reopen and ordinary mask/paint smoke. Next: native compact/iPad layout acceptance before returning to deferred height benchmarks. Standing push/publish authorization remains active.

## .1067 — selected layer settings stay open — 3 November 2026

User .1066 PASS protects Base → Layer, maskable Base paint, shared scalar stencil, combined Colour/Roughness/Metalness tools and earlier accepted Paint/camera/layout/edge behaviour. User requests Selected layer settings always open instead of a pull-out/disclosure.

Audit found one native details/summary in viewport-paint.js, plus two callbacks forcing it open. Replace only that wrapper with a labelled section and heading, preserving the actual controls, IDs, listeners, layer-list focus shortcuts and scroll bounds. Remove the two obsolete open assignments. Existing context eligibility remains: colour layer settings are hidden for scalar-only channel editing, and invalid/Base/AO actions retain original disabled states. No painter core, masks, history, resource, geometry or gesture changes; painter-core .1066 source and cache pin retained. Existing UI tests now assert section visibility instead of disclosure.open.

Focused checks: 38 PASS / 0 FAIL across actual Paint layer/mask/Base UI, contacts, palette and release/cache contracts. Hosted Topology 41588914712 passed 3,133 / 3,133, zero failures; focused checks 38 PASS / 0 FAIL. Pages 41588914085 succeeded. Runtime 7cae3dc4a1dda76912e68444cdccd16f852d6b74: live version.json, index.html, viewport-paint.js and shell-comparison.js byte-match the release tree. User .1066 PASS remains protected; device confirmation of the non-collapsible settings presentation is pending. Device: enter Paint and see Selected layer settings without expanding; select Base then an overlay and use Base → Layer/+ Mask or opacity/blend; Done/reopen leaves settings expanded and footer reachable by scrolling. Next: device feedback; collect real .1064 height decode timings before displacement preview work. Standing push/publish authorization remains active.

## .1066 — lift Base paint to a maskable layer — 2 November 2026

User additionally requests making Base into its own layer so it can be masked. Audit: Base is deliberately opaque/unmaskable; existing appendPaintLayer/captureLayeredColourResource and original layer mask can represent the requested result without a schema change. Add one Base → Layer command in Selected layer settings, visible only with Base selected in Colour. It lifts exact Base pixels into an opaque normal Base paint overlay, inserted BELOW every existing overlay, then leaves an opaque white backing. Composition remains byte-identical until layer/mask edits. Original masks, blend modes, image recipes, ordering, scalar maps and native UVs remain untouched. The new layer is selected and normal + Mask becomes available.

The existing painter owns all selection, preflight, checkpoint and resource publication; original stack/compositor/source pins are retained. One Undo restores old Base and Redo restores the editable layer. Preserve three-overlay cap and pool budgets: full stack disables command with merge/remove guidance. Quota/checkpoint/stale/scalar and staged-image refusal preserve resources, current placement and history. An explicit user conversion can create a white layer from an empty white Base; no automatic source image baking or UV change is implied. .1065 tool/channel/shared-stencil behaviour remains included; all earlier protected device PASSes remain.

Focused checks passed for 512/1024 exact before/after pixels, mask hide with raw pixels retained, Undo/Redo, Save/Open, decoded NOM pixels, mixed/masked/image overlay recipes/order, full-slot/quota/checkpoint/stale refusal, actual UI and staged-image preservation. Final focused validation: 54 PASS / 0 FAIL, including Base conversion, shared masks/channel tools, merge/image handling, contact/camera/layout/edge protections and release/cache contracts. Hosted .1066 Topology 41444218912 passed 3,133 / 3,133 (zero failures); final focused checks 54 PASS / 0 FAIL. Pages 41444218237 succeeded. Runtime 0e83c6fd9b1c5da250226fe8ef7a81a8d17ddf93: live version.json, index.html, viewport-paint.js, viewport-paint-core.js and shell-comparison.js byte-match the release tree. Native device acceptance for Base conversion and the included .1065 combined tools/shared stencil remains pending. Device: select a painted Base colour → Selected layer settings → Base → Layer; appearance stays, Base paint selects; + Mask → Hide/Reveal/Grey. Undo/Redo and Save/Open. Also test .1065 Fill/Eraser/Smudge/Blur with Colour plus Roughness+Metalness, map previews, Done/reopen and navigation. Next: device feedback on Base/masks and combined tools; .1064 height benchmark still awaits real iPad source timing before displacement preview work. Standing push/publish authorization remains active.

## .1065 final release validation — 2 November 2026

Runtime 47d806a621a45ce0a238d782d412179fbbff3dd7. Focused 80 PASS / 0 FAIL. Hosted Topology 41442368061: 3,127 PASS / 0 FAIL. Pages 41442366714 succeeded; live marker, shell, Paint UI, Paint core and screen comparison match the runtime tree. Native device acceptance remains pending. User added maskable Base requirement during publication; .1066 includes this accepted implementation scope, not a claimed device PASS. Shared stencil scope remains as explained to user: current colour-layer mask limits NEW scalar edits and does not retroactively hide/reveal committed scalar maps.

## .1065 — all-channel Paint tools and shared mask stencil — 2 November 2026

User requests Brush's combined Colour/Roughness/Metalness choice for Fill, Eraser, Smudge, Blur and Mask; explicitly chooses Shared mask over separate masks. User was informed before implementation: reuse the selected colour-layer mask as a stencil for NEW scalar edits; Colour retains existing non-destructive layer-mask behaviour, while previously committed scalar paint is not retroactively hidden/revealed by later mask edits. No independent per-channel masks or scalar-layer schema is introduced. This scope is visible in Mask UI/help. .1063 Paint/displacement inspection PASS and earlier interaction, layout, camera/gizmo and edge-tool PASSes remain protected.

Audit found multiPaintChannels restricted to action==='paint'; Fill did not retain scalar scratch layers, filters and smudge pickup only ran on the primary layer, and quick tool controls moved the channel dropdown but left combined toggles behind. Extend those existing owners: same single stroke/history transaction, per-channel raster layers, original face/facegroup/hold grow/shrink coverage plans, resolution-specific original filter domains, and pickup/work-budget resets on every selected channel. Eraser restores Roughness255/Metalness0 while retaining original Colour erase semantics. 1024 colour radius scales to the 512 scalar UV footprint (minimum one scalar texel). All secondary resources validate/preflight before one checkpoint; cancel, source loss, channel changes and checkpoint failures retain committed maps.

Reuse the existing selected-layer mask for new scalar edits: blend scratch R8 against committed values using shared mask coverage; 1024 masks area-average their 2×2 samples into 512 scalar pixels, honour enabled/inverted, and omit blocked no-op resources/history. Lit/scalar preview matches the filtered result; no-mask preview keeps the original direct RGBA path. Mask add/edit/remove accepts scalar mode when an overlay is selected, retaining the existing above-Base requirement. Hide/Reveal/Grey Brush commands prepare Brush through the original action-change/cancellation owner, so a preceding Blur/Fill cannot silently remain active while painting the mask. Combined toggles are reparented into each tool's quick controls and Mask page (original nodes/listeners); Material header preserves active tool and radial Material still prepares Brush per protected contact repair. Existing scalar export/project pools, raw resources, compositor, kernels, contact/camera and history owners retained; no resource/schema version changes. Updated three former tests that expected scalar masks to be inaccessible or ignored; all unrelated assertions remain.

Focused validation: 80 PASS / 0 FAIL across actual combined tools, shared stencil, independent scalar equality, face/group/hold coverage, UI contact, masks, filters, quotas, history/cancellation and release/cache/protected camera/edge/layout checks. Hosted .1065 regression and deployment succeeded; see final validation above. Device: Colour primary → enable Roughness+Metalness in Fill/Eraser/Smudge/Blur controls; use contrasting multi-channel marks for filters, inspect map previews. Test Face/Object Fill, then one Undo/Redo for all maps. On an overlay add shared Mask, hide/reveal/grey, then make new scalar/multi-channel edits and toggle inversion. Done/reopen, Material colour change, continuous Pencil painting, finger orbit and gizmo smoke. Scalar edits already committed remain unchanged when editing the stencil. Next: device feedback on tools, then collect .1064 native height timings before any displacement preview implementation. Standing push/publish authorization remains active.

## .1064 final release validation — 2 November 2026

Runtime 0020409bcb96ac57633994fc4d2c5c2a5886cbb9. Focused 37 PASS / 0 FAIL; hosted Topology 41439672043: 3,115 PASS / 0 FAIL. Pages 41439671709 succeeded; live marker, shell, native-height benchmark HTML/UI/helper and PNG owner byte-match the release. Native device benchmark results remain pending. User steered ongoing work to all-channel Paint tools before device testing this benchmark; no device PASS inferred for .1064.

## .1064 — isolated native height decode benchmark — 2 November 2026

User PASS after the disposable-cube unwrap/Paint check closes .1063 Paint device acceptance. Protect accepted Colour/Metalness/Roughness Paint alongside .1063 native displacement inspection, .1062 convex edge-tool picking, .1061 right Layers/object-following palette, .1059 Material contact recovery and .1057 editor-camera/gizmo ownership. Earlier .1063 pending-Paint notes are superseded by this PASS.

Audit: retained native images/settings already have authoritative owners. Preserved .1041 feasibility page tests generated 8-bit maps, not raw 16-bit heights. No production height decoder existed; extend the existing nomad-scalar-png owner using its CRC table and Paeth predictor. New decodeNomadHeightPNG returns exact 8/16-bit grayscale integer samples, original row order and raw min/max, with bounded streaming inflation, CRC/chunk/order/filter checks, 8 MiB encoded/2048-square caps. Unsupported colour/alpha/palette/interlace/animation is refused. No gamma, resampling, material strength/midpoint, projection or world-space conversion is applied. Existing PNG export/opaque-colour function bytes and app consumer pins remain unchanged; only the isolated benchmark imports the new .1064 export. This avoids refreshing the accepted Paint/render graph for an unused export.

New docs/native-height-benchmark-1064.html reads local NOM/PNG; NOM uses readNomadImport and explicit material displacement slots, without parsing geometry, requiring UVs or touching the open app. NOM limits remain 128 MiB container/24 MiB retained images/256 materials; selected PNG decoder adds its smaller source cap. Three decodes yield between runs and stop AFTER a run exceeds 1.2 seconds; not a hard interruption. Report includes original settings, exact bit depth/range/low-byte count, decode samples and known array bytes (not total memory). Tiny bundled 2×2 sample checks all four exact 16-bit values each run and is explicitly not performance evidence. Device/source timing must be sent back before the next preview decision. No viewport displacement ships; .1041 benchmark and original subdivision/renderer remain untouched.

Focused validation: 37 PASS / 0 FAIL across lossless height/PNG/export/inspection/UI, release wiring and protected Paint/camera/edge targeting. Hosted .1064 regression and deployment succeeded; see final validation above. Device: open the native height benchmark from File → Screen comparison / test list (or direct link), verify tiny sample, choose a native NOM containing displacement (no unwrap), measure and Copy report. Unsupported formats must explain refusal. Optional accepted Paint/camera/convex Split smoke. Next: assess real iPad height decode timings together with the existing geometry/render feasibility results before any bounded displacement preview; preserve original renderer/SubD owners, UV seams and native material transforms.

## .1063 device PASS — 2 November 2026

User confirms PASS for native NOM displacement inspection. Protect its displayed retained source settings and unchanged raw maps. Paint regression is NOT device-accepted in this build: the test object lacks a suitable UV unwrap, so Paint could not be tested. Prior accepted Paint behaviour remains protected. For an isolated Paint smoke test use a fresh disposable cube, Object radial → UV → Face atlas, then UV Paint. Do not replace the imported displacement sample UVs merely to test Paint; retained textures depend on them. Runtime remains .1063; no code changes.

## .1063 — native NOM displacement inspection — 2 November 2026

User .1062 PASS is protected: native convex edge picking within Split and other edge tools, canonical Offset loader, accepted Paint layout/contact and UV help. Standing authorization to validate, commit and push each BoxLab stage directly to origin/main and Pages remains in force.

Audit found native displacement images/settings already retained by nomad-material-resource and displayed raw by the UV image adapter. Existing adapter now appends retained source strength, midpoint, world-space flag, projection and exact source image byte count to Displacement inspection status. Missing fields explicitly say not recorded; no invented defaults, world-unit conversion, map extraction, image resampling or 3D displacement preview. Raw tile/mapping warning remains. Original bytes and metadata remain authoritative; triplanar is reported rather than applied. No new decoder, renderer, subdivision or modelling owner.

Focused validation: 34 PASS / 0 FAIL. Hosted Topology 41425188802: 3,107 PASS / 0 FAIL. Pages 41425187798 succeeded. Runtime commit dc33b47b03dc2cef5ae7bdc776bbbfd45caf69da; live version.json, index.html, nomad-uv-image-choices.js, uv-workspace.js and mesh-health.js byte-match the release tree. Native device acceptance remains pending. Device: import a native NOM with displacement, open UV Editor, enable image reference and select Displacement; inspect settings and raw-map warning; switch maps and reopen; confirm Paint and convex Split remain accepted. Next: benchmark-gated displacement preview planning using existing subdivision/UV owners, with no heavy preview before performance acceptance.

## .1062 — native edge picking inside edge tools — 2 November 2026

User .1061 PASS protects right Layers dock and object-following Paint palette, plus accepted Paint and UV help. New request: SELECT EDGE → SPLIT → SELECT EDGE still misses convex edges; audit other tool-then-edge actions for the general selection fix.

Audit confirmed .954 main edge-screen-picking ranks rendered cage lines by CSS-pixel proximity, then depth; Split and direct Bevel still used world-radius raycast depth ordering. Edge Extrude had the same old picker; Edge Slide and Offset Loop tested selected proxies in selection-list order. Those existing owners now prefer __boxlabSelectionBridge.pick('edge',event), including native misses; selected-edge drag starts require the native winning edge to belong to the selection. Existing world-radius fallback remains only when no native bridge picker is available (standalone/bootstrap compatibility). No new picker/kernel, threshold, gesture or history owner. Loop Cut already uses main's native picker; Edge paint and component-toggle already share it; Sweep Follow Edges and Add Vertex use screen-distance snapping for their distinct cross-object/point payloads, so no equivalent world-depth picker was replaced there. One-shot Rotate/Collapse act on preselection. Legacy edge-toggle-repair is not loaded.

Offset Loop had two module URLs (drawer .671 and loose-bootstrap .0.32.19). Both now resolve the same .1062 URL so UI listeners/module execute once. Refreshed the bootstrap→uniform-inset→multi-face-direct cache chain only; modelling logic and protected Multi1.0 remain unchanged. Split's retained fixed old cache assertion now checks its reviewed runtime asset reference.

Regression executes each actual tool picker on the supplied .954 convex OBJ (twelve previously depth-stolen midpoints) at 0.1/1/10 scales, verifies native misses and rejects neighbouring unselected edge steals. Actual Split button→two native edge taps commits exactly one canonical insertFaceSegment split and preserves exact History Undo/Redo snapshots. Final focused run: 115 PASS / 0 FAIL across tool/native convex picking, Split transaction, tool eligibility/session behavior, cache/release wiring, UV help and protected Paint layout/contact. Hosted Topology `41422973800` passed 3,106 / 3,106. Pages `41422972772` succeeded; live `.1062` marker, shell and all five repaired tool modules match the release commit. Device acceptance pending for convex Split taps, other edge-tool targeting, Undo/Redo/exit/navigation and accepted Paint layout. Device: Split two opposite convex-face edges, repeat after orbit/zoom; Bevel/Edge Slide/Offset Loop and boundary Edge Extrude pick the edge under the Pencil; Undo/Redo, Done/background exit and navigation; quick accepted Paint layout smoke. Keep eligibility/face adjacency/boundary checks intact.

## .1061 — right Paint layers and object-following palette — 2 November 2026

User .1060 PASS protects UV help/Projection help, accepted Paint .1059 and .1057 camera/Done-reentry behavior. New user request (annotated screenshot): Layers on the right like the object menu; open Paint radial clear of the object and follow it like the gizmo.

Audit: one tool-session-ui Paint dock owns original panel/layers/footer; viewport-paint owns palette, drag handle and frame loop. Existing gizmo projection patterns use the editor camera but no reusable object-bounds layout helper exists. Move the existing Paint-only dock to right:8px/left:auto; other session placement/restoration stays authoritative. Add presentation-only paint-palette-layout helper: cache editable mesh bounds once at Paint open, project eight corners through the authoritative camera, prefer placement to the left, choose another side to avoid model/right panel/selection controls when space allows, clamp to viewport when cramped. Reuse Paint's frame loop for view-following; keep a dragged palette offset relative to the object. Recompute placement for wheel/material/control sizes; freeze auto-placement during live strokes/drag and focused native material-input editing; new Paint session resets safe placement. No new frame loop, gesture owner, modelling kernel, pivot or history owner. Model itself is never moved by placement.

Final focused run: 94 PASS / 0 FAIL across Paint layout/contact/material workflow, right dock, object radial, UV help and release/cache wiring. Real Three camera projection test covers pan/orbit/zoom, dock avoidance, bounds and no vertex mutation. Real Paint UI test covers frame following, manual offset, resize, Done/reopen and unchanged history/navigation state. Updated former left-dock assertions to explicit right-dock expectations requested by user; preserved footer/listeners/ordinary-session checks. Hosted Topology `41419359928` passed 3,103 / 3,103. Pages `41419359664` succeeded; live `.1061` marker, shell, viewport-paint.js, tool-session-ui.js and paint-palette-layout.js match the release tree. Device acceptance pending for right Layers dock, palette clearance/following, manual drag and accepted Paint workflow. Device: Layers at right; open Tools beside model; orbit/pan/zoom with menu visible; drag menu then move view; Material/Metalness continuous paint and Done/reopen; quick UV help smoke. On cramped screens placement minimizes overlap while keeping controls reachable.

## .1060 — touch-accessible UV help — 2 November 2026

User /nextbuild selects the queued UV help slice after .1059 device PASS. Audit found long gesture footer in uv-workspace.js and projection notes in mesh-health.js; no shared generic help owner exists. Use native details/summary disclosures in those original surfaces, with touch/keyboard activation and visible focus; no extra popup layer or gesture owner. UV help contains existing navigation/history instructions, dynamic Move/Scale/Rotate Pencil hint, map-reference and layout-action explanations. Escape closes help before exiting the editor; help closes on workspace exit and resets collapsed on entry. Projection help exposes method guidance previously in long notes/native titles. Base-only/replaces-UV/clear-paint warnings, 4096-face and 20,000-corner caps, curved-face stretching warning, clear-paint consequences, dynamic errors/status and action labels stay visible.

Original canvas/control ownership, header/Back to 3D, selection, UV transforms, Undo/Redo and Paint remain intact. Paint .1059 source and cache pin are unchanged; its device PASS and protected Multi1.0 remain protected. Focused run: 97 PASS / 0 FAIL, covering workspace help/Escape/close/reopen with unchanged view/history, UV transforms/navigation, atlas/projection, workspace layering, Paint contact/Material recovery and release/cache wiring. Hosted Topology `41387557443` passed 3,101 / 3,101. Corrected Pages `41387557387` succeeded; live `.1060` marker, index, UV workspace and Mesh Health match the release sources. Device acceptance pending for UV help, Projection help, return/reopen and accepted Paint smoke. Device: open UV Editor→expand UV help→switch Move/Scale/Rotate→close help→pan/pinch/UndoRedo→Back to 3D and reopen; UV or Mesh Health→Projection help while warnings remain visible. Then quick accepted Paint Material/Metalness smoke.

## .1059 device PASS — 2 November 2026

User confirms PASS after the Material colour-edit contact repair. Protect the tested Material→colour change→continuous Metalness paint, repeated strokes/colour changes without Done, and retained .1057 camera/gizmo/Done-re-entry behavior. .1058 remains a historical failed attempt, superseded by .1059. Runtime remains .1059; no new app build from this acceptance entry. Hosted regression: 3,100 PASS / 0 FAIL; published runtime cc84d1ed2d41a9d54c5aab0dd0af52de1d7d1c98.

User asks what is next, without /nextbuild. Recommended next narrow build follows the recorded .1043 queue: audit existing UV Editor and Mesh Health UV help, then move long gesture instructions into touch-accessible contextual help using existing owners. Keep action labels, errors, scope/cap warnings and Paint PASSes intact. Later resume the native NOM displacement payload/settings audit before any displacement preview, with performance benchmarks before heavy subdivision work. No new runtime implementation authorized by this status question alone.

## .1056 — gizmo camera synchronization during Paint orbit

- [x] Audit existing Paint, Pencil orbit and Total Gizmo owners; keep them authoritative.
- [x] Refresh the current camera world matrix in the Total Gizmo frame before projecting its anchor.
- [x] Update direct asset pins, release markers, reviewed hashes and retained release assertion.
- [x] Initial Pages deployment succeeded. First Topology run exposed 33 legacy fake-camera assumptions and one stale release-version pin.
- [ ] Publish the compatibility/pin correction and verify Pages/live assets; rerun hosted Topology.
- [ ] Device-check brush switching, Pencil orbit while painting, gizmo anchoring and post-Done transforms.

The user reports this recurring during Pencil orbit in UV Paint. No Paint tool, mesh, pivot, or transform behavior is intentionally changed. Previous Paint and material PASSes remain protected. `src/multi-object-transform.js?v=0.36.1.0` is unchanged.

# BoxLab roadmap — current target

## .1055 — restore combined-map shadows and stabilize Paint navigation

- [x] Preserve Roughness/Metalness layer previews and live updates (user PASS).
- [x] Restore combined Colour+Metalness shadow contrast while retaining the Metalness-only PASS.
- [x] Route Pencil mesh contacts through the UV Paint owner's exact surface hit test after brush changes; keep empty-background orbit available.
- [x] On Pencil orbit takeover, cancel/reset the active Total Gizmo owner so all handles recover even after pointer retargeting.
- [x] Push `.1055`; Pages succeeded and live marker/assets byte-match `main`.
- [x] Hosted Topology `41296990402` passed 3,096 / 3,096 after restoring the offline UV Paint evaluation fixture pin to `.1039`.
- [ ] Obtain device confirmation for shadows, brush switching, background orbit and full gizmo recovery.

Standing user authorization permits each BoxLab development-stage push to `origin/main` and GitHub Pages publication; no repeat approval is required. Protected: map previews/update PASSes, metal-only shadow PASS, separate channels/toolbars, Smudge and combined material strokes. Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

## .1054 — release identity repair

- [x] Align visible shell-comparison title/launcher/help text with `.1054` release identity.
- [x] Update preserved `.1041` release-contract assertion to `.1054`.
- [x] Keep current direct/nested loader pins, reviewed hashes and `.1050`–`.1053` comparison logs aligned.
- [x] Pages `41294085210` succeeded; live `.1054` marker and cache-busted assets match `main`.
- [x] Hosted Topology `41294085728` passed 3,096 / 3,096.
- [x] User reports Roughness/Metalness previews and live updates PASS; protect both.

`.1053` Pages succeeded; its hosted Topology had 3,094 PASS / 2 FAIL because one preserved test expectation and shell-comparison user-visible labels still named `.1052`. `.1054` corrects those release-facing references. No local tests were run or added.
Protected: separate channel/toolbars PASS, `.1047` metal-only shadow PASS, `.1046` Smudge PASS, `.1045` combined material painting. `src/multi-object-transform.js?v=0.36.1.0` remains unchanged.

## .1049 — stronger Studio shadows and reliable Pencil Paint/orbit recovery

- [x] Preserve .1048 combined Colour+Metalness shadow visibility while tuning its reduced strength upward.
- [x] Keep matching Pencil orbit claims from leaving a stale Total Gizmo/transform gesture.
- [x] Keep mesh Pencil contacts with the active UV Paint owner after brush changes; preserve empty-background orbit.
- [x] Add focused material, Pencil routing and gizmo recovery regressions; refresh affected cache pins and reviewed hashes.
- [x] Focused set 42/42 and full Node suite 3,096 PASS / 0 FAIL / 0 skipped; syntax, runtime pins/hashes, protected Multi pin and diff check pass.
- [x] Hosted Topology regression passed (`41289594202`).
- [ ] Publish .1049 and verify live assets. Pages `41289594359` is blocked because GitHub reports prior `.1048` deployment `55d63c1a3cdd18e8e7cd418689ca335568a9280a` still in progress; live version remains `.1048`. Clear/cancel that deployment, rerun Pages, then verify cache-busted assets.
- [ ] Obtain device confirmation for shadow strength, brush switching, Paint mesh strokes, background orbit and subsequent gizmo rotation.

No new paint, render, orbit or gizmo implementation was added. The existing `paint-target`, Pencil gate, main semantic handoff and transform-upgrade owners remain authoritative. Separate channel/toolbars PASS, .1047 metal-only shadow PASS, .1046 Smudge PASS, and .1048 combined-map shadow presence PASS remain protected. `src/multi-object-transform.js?v=0.36.1.0` remains unchanged.


## .1047 — Metalness shadow contrast and stable Colour stroke start — device report

Separate material channels/toolbars PASS; metal-only shadows pass by user report. When a Colour map is used with Metalness, the shadow is lost. `.1048` addresses this remaining combined-map case. Pencil-orbit hands-on acceptance is not yet confirmed.

## .1045 — combined material strokes and Paint interaction — user PASS protected

The user passed .1045 on 1 November 2026. Preserve combined Colour/Roughness/Metalness strokes, Lit material preview and shadow restoration, Pencil background orbit, direct Brush-to-Material & Paint access, contextual Paint controls and .1045 Smudge behavior. The current .1046 follow-up addresses Metalness-only Studio shading and stronger Smudge.

Full local Node suite was 3,091 PASS / 0 FAIL before the final .1045 Smudge allocation optimization. Post-optimization focused material, Smudge, release and shell checks were 34 PASS; the broader 43-check set passed before that allocation-only optimization. Native .1045 acceptance was received in this turn.

## Follow-on work

After .1046 PASS, resume the app-wide help/text audit in the UV Editor gesture footer and Mesh Health UV guidance. Keep essential action names, live status, destructive/reset warnings and scope/cap warnings visible. Imported opacity-map authoring and the separate NOM displacement implementation remain unimplemented.
---

## Historical roadmap marker: .1043 Paint help first slice

The .1043 app tree is published on GitHub main at
`3e3f8c95c3fd62400f0d1ccc22c514cad1977d49`. Pages deployment workflow 41246780287
succeeded; Topology regression workflow 41246780922 is running. Native iPad acceptance
remains pending, and the checklist is ready at the top of TEST_CHECKLIST.md.

The draggable contextual Paint palette from .1042 remains intact. .1043 consolidates
repeated quick-tool explanations into one touch-friendly, context-aware help popover and
corrects stale NOM material-map import copy. The .1042 iPad checklist is still pending;
.1043 adds the new help and concise copy checks at the top of TEST_CHECKLIST.md.

The whole-app text audit found good tooltip candidates in the UV Editor gesture footer,
Mesh Health UV instructions, modelling-session gesture subtitles, gizmo/session guidance,
and native `title` explanations that are unavailable on touch. Keep action labels, ARIA
names, dynamic status/errors and destructive/reset or important scope/cap warnings visible.
Use a shared touch/focus/hover help pattern for the later app-wide slices; do not rely on
browser `title` alone.

Next after user PASS: continue help migration in small slices, starting with UV Editor
and Mesh Health UV panels, then resume the native NOM displacement payload/settings
audit before any displacement preview. Preserve existing renderer, surface/SubD owners,
corner limits and `src/multi-object-transform.js?v=0.36.1.0`.

## .1035 — pre-decode native colour alpha OFF repair — 31 October 2026

USER .1034 FAIL: screenshot shows right cube cyan/black checker on visible .1034.
.1033 standalone material PASS remains protected; .1034 shader-only claim was
insufficient. Three map_fragment multiplies RGB by sampled RGB, and alpha by
sampled alpha componentwise; it does NOT itself multiply RGB by sampled alpha.
Shader string tests cannot prove RGB survived browser PNG decode/resize.

Existing surface owner now passes an explicit alpha-OFF flag to its default
surface decoder. Existing nomad-scalar-png owner makes a transient opaque PNG
BEFORE createImageBitmap: unfilters original pixels, keeps original RGB including
alpha-zero pixels, sets preview alpha255, and recompresses. Shared GLB/UV decoder
has no native dependency. Explicit alpha ON and auxiliary channels keep original
decoding; source bytes, material metadata, UVs, Save/Open/NOM remain unchanged.
No source texture rewrite, canvas RGB recovery, new renderer or modelling kernel.

Supported pre-decode path: noninterlaced 8-bit RGBA/grayscale-alpha PNG; tRNS
transparency stripped for other native PNG types. Profiles/colour chunks retained.
Bounds: encoded source/output8MiB, dimensions2048 and4M source pixels, inflate output
exact expected scanline length; CRC/truncation/filter/animation/16bit-alpha refusals.
Unsupported alpha-OFF conversion keeps original body fallback, no black-map guess.
Existing GPU preview limits/lifetimes and .1033 standalone reservation remain intact.

Regression checks inspect actual browser-input PNG from original .1029 fixture:
all alpha-OFF texels exactly [55,175,220,255]; alpha ON still [55,175,220,0/255].
All five PNG filters tested with varied hidden RGB, tRNS and grayscale-alpha,
malformed/oversized/inflate overflow refused. Actual surface default decoder and
source-exact NOM roundtrip covered. Corrected .1034 alpha-ON test: default Three
onBeforeCompile is a no-op; Three expands map_fragment after that hook. .1034 CI
41152868866 FAILED; repair supersedes it only after passing validation/publication.
Restore DEV_HISTORY content from3397d287, which .1034 documentation accidentally
replaced, then retain .1034 entry and append this repair. Other old docs kept intact.
Reviewed cache closure repinned; stale .1034 index-only keys reconciled with owners.
Restore original five-step structural A/B checklist (1034 extra material step broke
completion); material check stays in build instructions. Correct stale1033 titles
and preserve1033/1034 result logs. Original13 checklist regression tests PASS.

DEVICE1035: use original docs/samples/NOM_COLOUR_ALPHA_1029.nom, Studio and Solid.
RIGHT solid cyan, no black squares; LEFT checker transparency; MIDDLE combined
alpha plus opacity. Switch/reopen VIEW; original .1032 seven-cube Colour cyan;
.1033 standalone sample unchanged. Move/UndoRedo and Save/Open/NOM retention.
Native iPad/GPU appearance acceptance still pending; do not claim device success.
Displacement remains deferred; next step is actual device validation before more work.
Validation: Node22 full suite3064 PASS/0FAIL (216.65s); focused13 material tests
and final13 checklist tests PASS. git diff --check clean. CI41154726829 and Pages41154726211 SUCCESS; live bytes verified. .1034 iPad FAIL remains recorded; .1035 GPU/device acceptance pending.

## .1034 — native colour alpha OFF shader correction — 31 October 2026

Current runtime target: 0.36.18.1034. Parent .1033 user PASS is protected,
including standalone PBR maps, seven-object import and VIEW stability.

Audit found the precise alpha-OFF defect in the existing native UV surface owner:
the RGB-only map shader hook was installed only when opacityMode() ran. A native
colour texture with use_color_opacity=false and no separate opacity map therefore
fell through to Three's default diffuseColor *= sampledDiffuseColor, multiplying
the constant cyan RGB by the image's checker alpha and producing black squares.
The original owner now installs the RGB-only shader hook for every supported lit
native colour surface with colour alpha OFF. opacityMode reuses the same hook when
a separate opacity map/factor also controls transparency. Explicit colour alpha ON
keeps Three's original RGBA sampling path; opacity, depth-write, shadow and source
byte behaviour are otherwise unchanged. No decoder rewrite or image re-encoding.

New actual-owner tests cover alpha OFF without a separate opacity map and explicit
alpha ON retaining RGBA. In-app TEST LIST adds the original comparison file:
docs/samples/NOM_COLOUR_ALPHA_1029.nom (left alpha ON, middle combined opacity,
right alpha OFF). Existing seven-object and standalone-map samples remain unchanged.
Displacement remains inspection/retention only.

Validation/publication status: source/test changes committed to main; local suite
not available in this connected session. Hosted CI and Pages/live byte verification
are pending and must be checked before calling this build fully released.
Native iPad/GPU appearance acceptance is pending.

DEVICE1034: import NOM_COLOUR_ALPHA_1029.nom in Studio and Solid. Right cube must be
solid cyan with no checker/black squares; left cube retains checker transparency;
middle retains combined colour-alpha plus separate opacity. Switch VIEW modes,
orbit, select/Move/UndoRedo, and verify prior .1033 standalone-map sample still works.
Next: confirm .1034 alpha behaviour, then separately benchmark displacement/subdivision
before implementation. Do not fold displacement into this shader correction.

## .1033 user PASS protected — 31 October 2026

User replied PASS after .1033 standalone-material test build. Protect accepted
standalone normal/emissive/roughness/metalness/opacity preview through existing
owners, six supported mapped cubes, seven-object loading, VIEW stability and
previous accepted behaviour. No new application build in this update.
This PASS does not close the separately deferred displacement preview or the
original .1032 alpha-OFF colour discrepancy (new .1033 sample uses opaque RGB).
Next narrow build: repair original alpha-OFF colour bitmap decode/resampling,
preserving RGB beneath transparent pixels without changing retained source bytes.
Then audit displacement preview subdivision/performance gates before implementation.
Current status: .1033 LIVE, user PASS; awaiting next /nextbuild for runtime work.
Optional regression: original .1032 Colour cube should eventually be solid cyan
with colour opacity OFF; enabling opacity should reveal its alpha checker.

Publication: application commit bbe1896581176abdfb297404161d5023b3d9a26a,
reviewed tree 8554d21a5068f6f38b0feb1d825bcd0c043643b0, fetched main verified.
Pages41150967831 SUCCESS; live version/shell/material/overlay/render/test-list and
91,528-byte sample all byte-identical. See docs/publication-1033.md. Hosted
Topology regression41150968538 completed SUCCESS. .1033 LIVE and READY FOR TESTING.
Manual iPad appearance acceptance remains pending; .1032 loading/VIEW PASS protected.

## .1033 — standalone native material maps — 31 October 2026

Current build: 0.36.18.1033. Parent main: 1cd744b63ff35cafea7a56b01c0cfbd81b53645f.
Reuses nomad-material-resource and uv-image-surface-preview: Studio/Solid now
accept normal, emissive, roughness, metalness and opacity maps without a colour
image, using native constant color (white default), roughness .25, metalness 0.
No generated colour texture or parallel renderer. Invalid existing colour bindings,
unlit, unsupported projections/materials and displacement-only keep prior fallback.
Map-only overlay replaces body only after a successful decode; failed/late work
releases the original owner and reservation. Source images/UVs/materials remain exact.

Protect explicit .1032 user PASS: seven-cube visibility/spacing and VIEW stability.
Four colour surfaces remain protected; up to eight map-only surfaces share original
aggregate ceilings: 15M decoded pixels, 80k UV corners, 32MiB encoded sources.
Per-map limits unchanged. Parent loader changes are cache-pin-only. main.js and
multi-object-transform remain untouched; no broad UI changes.

Fresh comparison: docs/samples/NOM_STANDALONE_MAPS_1033.nom. Seven independent
named cubes, same accepted spacing; TRUE opaque RGB checker for Colour and
Emissive. .1032 fixture remains immutable. Displacement stays retention/inspection
only, pending subdivision/performance work. Original .1032 alpha-OFF cyan/black
bitmap discrepancy remains OPEN and is not fixed by the new sample.

Hands-on pending: import new sample, verify all seven cubes and six supported
material channels in Studio/Solid; inspect gloss/reflections while orbiting.
Check opacity holes and shadows, switch/reopen all VIEW modes, Move/Undo/Redo,
Save/Open and export NOM. User PASS required for actual iPad/GPU appearance.
Next: address alpha-OFF bitmap decoding separately after this material validation.
Validation: Node22 full suite 3058 PASS, 0 FAIL (102.29s); final additional budget check and all four .1033 focused tests PASS on Node22. Existing 30 native material tests PASS. git diff --check clean. Hosted CI41150968538 and Pages41150967831 SUCCESS; live bytes verified.

## .1032 user PASS — loading/VIEW accepted; material gaps observed — 31 October 2026

User explicitly: “1032 PASS > all 7 cubes visible, no problems with view mode
disappearing.” Protect seven-object visibility/spacing, VIEW startup preservation,
all original mode actions/reopen and .1030 accepted behaviour. This is NOT native
standalone-PBR/displacement/opaque-colour-alpha acceptance. No new build this update.

User screenshots: BoxLab shows only Colour cube textured, other six plain. Nomad
shows Normal/Emissive/scalar/Opacity/Displacement effects; Colour cube solid cyan.
Source audit confirms native nomadColourSurfaceSource returns null without color;
nomadPBRSurfaceSources and original UV overlay consequently cannot activate other
maps by themselves. Seven-object fixture intentionally assigns exactly one slot
per cube. Therefore this exposes the remaining no-colour-map viewport dependency;
retained maps were not lost. Extend the SAME resource/material overlay owners for
supported normal/emissive/roughness/metalness/opacity without requiring a color map.
Displacement remains separately deferred behind subdivision/performance gates.

Important fixture finding: 01Colour PNG is128x128 with EXACTLY ONE RGB value
[55,175,220], and alpha0/255 checker. Every fixture material has use_color_opacity=0.
Nomad's uniform cyan is expected: the checker is ALPHA, not a colour pattern. Do
not call this missing colour texture or change Nomad bindings based on appearance.
BoxLab's checker/black squares despite alphaOFF is a separate discrepancy. Native
plan requests unpremultiplied bitmap but browser decode/resampling may lose RGB
under alpha0; exact cause not verified on iPad. Do not claim it fixed from a mocked
bitmap test. Investigate original decoder, keep source bytes unchanged, and use a
real opaque RGB colour-checker in the next comparison fixture to avoid ambiguity.

Status: current LIVE1032; explicit loading/VIEW PASS protected. Material viewport
gap and alphaOFF colour discrepancy OPEN. No runtime/code/new build this update.
Next scoped build: audit no-colour native base material path, preserve accepted
1032 UI, add meaningful per-channel sample and actual owner coverage; investigate
alphaOFF colour separately, retaining displacement as inspection/export-only.
Possible checks now: UV Editor Image on Normal/Opacity/Displacement cubes confirms
retained references; no repeated loading/VIEW regression test or reinstall needed.

## .1032 publication and final retest proof — 31 October 2026

Application runtime674828d515e5db3d6aa87fcf4f4fff94de47199a/tree41917b2d matched
validated local04d6863c tree;29 uploaded blobs verified. Final sample/test correction
b73818ed3deeec1280838e6c39c3b011cde08eb1/treeb667f741 matched validated local86f6be0e.
Application JS remains byte-identical to674828d5. Final sample blob:
4a9a16d419f4068487a2d093a9850f838bc6ecbd (91,588bytes). Spaced rows keep every cube
clear of size1 startup cube AFTER original2-unit import fit; actual File test asserts
that separation for all7. Import ADDS seven named cubes; an existing cube may remain.

Pages41147618892 SUCCESS. All8 checked public paths match final app/sample content:
shell/manifest,render owner,shared image resolver,UV workspace,native adapter,test
list and final spaced sample (sample rechecked after final deployment). Live cloud
DOM: title1032,all12 looks including Cavity/Silhouette,Studio->Solid->Studio status,
close/reopen retains list. Cloud WebGL remains disabled; screenshot API timed out.
This is UI/DOM activation evidence, not GPU/iPad pixel or material acceptance.

Full Node24.22.1:3055PASS/0FAIL/0skip/0cancel (107.44s), final fixture-only6PASS.
Full final CI-matching Node22.23.4:3055PASS/0FAIL/0skip/0cancel (100.18s).
Old hosted41146362394 failed on the two cross-Node compressed-demo-byte comparisons;
reproduced3053PASS/2FAIL on Node22. Replaced ONLY demo-equivalence assertions with
independent exact geometry/UV/material bindings,CRC/PNG pixels and literal16-bit
bytes. Production source-byte round-trip assertions stay unchanged. Corrected hosted
rerun41147618975 was in_progress at this proof; its final result is recorded in
`docs/publication-1032-ci.md`. Do not cite the superseded failed run as current CI.

GitHub upload/ref errors were transient: reuploaded two orphan blobs,verified exact
tree; REST-created correction commit was initially unavailable to GraphQL ref update.
Anchored it via repair/1032-fixture-validation,then expected-main non-forced update
succeeded. Keep this recovery reference; no force push or permission bypass used.

Build .1032 LIVE / READY FOR NATIVE RETEST once final hosted result below is checked.
.1031 user FAIL remains recorded; .1030 is last user-accepted build. No .1032 PASS
inferred. DEVICE: VIEW all12 before import,Studio/Solid/reopen; import FINAL sample
01Colour through07Displacement; select a cube,radialUV->UV Editor->Image shows its
ONE raw map;BackTo3D/Close and recheckVIEW. Exact original iPad whole-menu failure
cause remains unproven; repaired deterministic overwrite/ready-host defects covered.
No new feature work until repair feedback.

## .1032 — VIEW startup repair and seven-object retest — 31 October 2026

User .1031 FAIL: “7 Objects did not load” and VIEW modes “seem to have been
removed. BIG FAIL”. Stop feature rollout; .1030 remains the last accepted build.
Baseline main0c18e678/runtime80e2d61d. The .1031 sample ACTUALLY contains ONE cube
with seven maps, not seven objects. No importer object-loss reproduction found;
replace unclear retest with an explicit seven-object fixture instead of pretending
the original file contained seven. Keep .1031 failed/pending device gate visible.

VIEW source/buttons were not intentionally removed. Cloud browser on live1031
shows all12 look controls, but cloud WebGL is disabled, so this does NOT refute
native feedback or prove GPU operation. Concrete owner flaw reproduced: installUI
uses host.innerHTML, deleting Cavity/Silhouette if their independent owners run
first; dataset.ready also prevents restoring an emptied host. Two new real-owner
DOM tests FAIL against1031 source and PASS after repair. Exact iPad whole-menu
failure cause remains unproven; no speculative CSS/compositor or cache diagnosis.

Original render-modes installer now adds only missing base buttons from its same
10-button template, preserving existing Cavity/Silhouette nodes/listeners. Per-host
delegation binds ONCE. Native VIEW open re-runs this idempotent installer, restoring
missing/cleared base controls without polling, new render engine or geometry changes.
Original Facegroup controls and actual setMode actions retained. No shader/light/
material/selection/history/input/CSS/frozen/main/Multi implementation changes.

Native raw-image inspection adapter moved OUT of shared uv-image-preview into
workspace-only nomad-uv-image-choices. Shared image controller receives its resolver
as an option; GLB/3D paths retain original resolver and decoder. This removes the
inspection dependency from the render-mode graph; NOT a claim that it caused the
reported failure. Existing1031 seven-slot/byte/16-bit/cancel/UV read-only tests stay
active through the original workspace adapter. No duplicate decoder or image pool.

New docs/samples/NOM_SEVEN_OBJECTS_1032.nom: SEVEN independent cubes in two rows,
named01 Colour,02 Normal,03 Emissive,04 Roughness,05 Metalness,06 Opacity,
07 Displacement. Each contains ONE exact raw map reference for UV Image inspection.
Non-colour cubes may have ordinary solid 3D shading; this is a loading/inspection
fixture, not a claim of no-colour-map PBR or displacement rendering support.
Actual File dispatcher->fit->manager adds all7; checked sample matches generator.
Existing1031 one-cube fixture remains reproducible; do not overwrite it silently.

85 focused PASS/0FAIL/0skip, including4 new regressions, actual imported7 and
workspace/VIEW/native/GLB/release protection. Reviewed reverse-loader pins1032 and
canonical recovery chain; other runtime JS edits are pins only. Full local Node24.22.1:3055 PASS/0FAIL/0skip/0cancel (107.16s). No runtime/test edits after full-suite start. Publication and final CI evidence: docs/publication-1032.md and docs/publication-1032-ci.md; native .1032 acceptance is not inferred.
In-app test list explicitly distinguishes seven OBJECTS from seven MAPS.
DEVICE1032 first openVIEW before import: all12 looks including Cavity/Silhouette;
Studio->Solid->Studio and close/reopen. Import new sample: seven named cubes;
select a cube,Object radialUV->UV Editor->Image to see its ONE map,BackTo3D/Close,
recheckVIEW. Orbit/UndoRedo and accepted1030 transform sample sanity.
Next ONLY device repair feedback; defer new native material/performance features.

## .1031 publication verified — 30 October 2026

Runtime80e2d61d505226073af7f27f3842c40ec3f8b3dd; fetched origin/main tree
8c1f7130f0c55f6e9ef72683bef5c5fee931f4ed equals validated local6ba8ee98 tree.
All25 changed blobs hash-verified before expected-main/non-forced update.
Pages41058750880 completed SUCCESS.9/9 fresh live byte matches: shell/manifest,
UV image resolver/workspace,Mesh Health,test list,drawer,unchanged native material
plan and sample NOM (74,396bytes; retry after one transient503).
Full local Node24.22.1:3051 PASS/0FAIL/0skip/0cancel (121.47s), focused79PASS.
No runtime/test edits after full-suite start. Hosted topology41058751078 was
in_progress at proof; no hosted full PASS claimed. Native appearance gate pending.
This proof is documentation-only; runtime/contract stay exactly validated.

Build .1031 LIVE / READY FOR TESTING. User .1030 PASS protected. In Object mode
select sample cube -> radial UV -> UV Editor -> Image -> inspect7 named maps.
Raw image references, no material transforms/factors; displacement inspection only.
Pan/zoom/switch,Back to3D/Close/reopen; SaveOpen.boxlab and NOMAD preserve maps.
Next native viewer feedback then audit no-colour-map material preview; bounded
subdivision/displacement and benchmark decision remain deferred.

## .1031 — native NOM images in the existing UV Editor — 30 October 2026

User .1030 PASS /nextbuild protects per-map UV translation/rotation, accepted
native PBR/alpha/opacity/retention and round trips. Baseline main fceec6ea /
runtime caf0dede. Hosted .1030 regression41052704373 now completed SUCCESS.
Current numbered release .1031; validation/publication follows below.

Audit: UV workspace's original Image button/dropdown/controller/canvas only
resolved GLB resources. Native NOM materials already retain encoded maps and have
3D preview owners; reconnect the original viewer rather than add another inspector.
Existing importedUVImageChoices now resolves native resources via original
nomadMaterialMaps validation. Workspace requests Colour, Normal, Emissive,
Roughness, Metalness, Opacity and Displacement. Each option uses actual slot/name
and original bytes; native separate scalar images have NO inferred GLB G/B channel.
Default callers stay colour-only; GLB map resolution/packed-channel policy unchanged.

This is RAW image inspection in tile0–1. Explicit native status says inspection
only and material mapping not applied: no tiling/rotation/factors baked here, no
3D displacement support implied. PNG/JPEG signature/MIME and 8MiB default source
bounds remain; original decoder caps visual output at1024square. Sixteen-bit source
is retained unchanged despite the bounded browser image preview. Invalid resources
return no choices; invalid/unsupported image or oversize omits that reference only.
Safe option.textContent, original selection/pan/zoom, read-only native UV controls,
serial generation cancellation, late bitmap release, reopen/reset and source/history
remain. No raw-pointer/rendering/modelling/UV/export kernel or schema changes.

Five new real-owner tests cover all7 exact references/name safety/budgets/MIME,
no-colour input, late switch/close/failed decode, actual readonly UV workspace
buttons/canvas and exact pooled/inline SaveOpen/native NOM roundtrip/sample bytes.
79 focused PASS/0FAIL/0skip incl accepted native1030/1025–1029, GLB image/surface/
packed scalar/workspace/release checks. Full local Node24.22.1 suite:3051 PASS/0FAIL/0skip/0cancel (121.47s). No runtime/test edits after full-suite start. Publication verified in docs/publication-1031.md; no native browser/GPU appearance acceptance inferred. Reverse cache graph and canonical
release pins reviewed; parent changes are pin-only. Main/Multi1.0/frozen betas,
1030 material plan and actual3D/shadow implementations unchanged.

Generic sample docs/samples/NOM_MAP_INSPECTION_1031.nom is one cube with all7 maps,
including 16-bit triplanar displacement retained for inspection/export. In-app test
list updated; prior .1030 ratings retained, no new A/B batch.
DEVICE1031 import sample -> Object radial UV -> UV Editor -> Image; choose all7
images. Pan/zoom and switch; Back to3D/Close/reopen; SaveOpen.boxlab and NOMAD keep
maps. Retest accepted1030 viewport sample if convenient. Next native viewer feedback,
then audit supported PBR materials lacking a colour texture; subdivision/displacement
still needs its separate bounded performance/benchmark decision.

## .1030 publication verified — 30 October 2026

Runtime commit caf0dede9640b6fffefec02b501f670ba06d12db; fetched origin/main tree
8f0661e08a9319c8fa49b59546281d39b0993dfa matches validated local 1edf7cf4 tree.
All44 uploaded blob hashes verified before expected-main, non-forced ref update.
GitHub Pages41052704232 completed SUCCESS. Eight fresh public files byte-match:
version.json,index.html,native material plan,UV image overlay,drawer/face-layout
canonical loader chain,in-app test list and downloadable NOM transform sample.
Full local3046 PASS/0FAIL/0skip/0cancel (214.23s); final15 transform/release/cache/
identity checks PASS after the parent pin-only correction. Hosted topology41052704373
was in_progress at proof time; no hosted full PASS or native GPU acceptance claimed.
No functional runtime/test changes after the full suite started. This publication
proof is docs-only; runtime and asset contract remain byte-identical.

Build .1030 LIVE / READY FOR TESTING. User .1029 PASS protected. DEVICE1030 import
sample,compare original/offset/sideways repeated arrow in BoxLab and Nomad;
Studio/Solid/orbit,MoveUndoRedo,looks/back,SaveOpen.boxlab,NOMAD/Nomad. Accepted
colour-alpha1029 sample unchanged. Next follow native texture-transform feedback;
triplanar/displacement and their performance gates remain separately deferred.

## .1030 — native NOM texture translation and rotation — 30 October 2026

User explicitly reports .1029 PASS and /nextbuild. Protect colour-image alpha,
combined separate opacity/scalars, solid OFF control, source retention and all
accepted .1025–.1028 PBR/round-trip/lighting behaviours. Baseline main/runtime
6dff6e5a415b09b065b19f6e8285bac7d9ce684d. Current numbered release .1030.

Audit found native texture transforms already retained but viewport deliberately
refused nonzero offsets/rotation. Existing nomad-material-resource plan and
uv-image-surface-preview remain authoritative. Verified convention against
stephomi/nomad-link commit08391c8e00f274913c673e2459ed5a2e059a0ac0,
blender/nomad_blender_link/__init__.py set_mapping_transform: radians, native
UV origin at top left, scale THEN rotation THEN offset about UV zero. Conjugating
its Blender mapping by V -> 1-V gives native matrix rows:
[cos(r)*sx, sin(r)*sy, offsetX]; [-sin(r)*sx, cos(r)*sy, offsetY]; [0,0,1].
Three automatic texture transforms have a different order under nonuniform scale;
use its original per-texture matrix with matrixAutoUpdate=false, not baked UV edits.
Each colour/normal/roughness/metalness/emissive/opacity map has its own transform.
UV Image/always-unlit stay colour-only, now with supported colour transforms.
Malformed/nonfinite or Float32-overflow scale/offset remains retained-only; invalid
auxiliary skips only that map. Auto/UV projection, budgets, exact source bytes,
original picking/geometry/history, serial decode/cancel/disposal, transparency and
Studio shadow owners unchanged. No new renderer, UV/modelling kernel or UI reskin.
Triplanar/displacement/refraction/additive/dithering remain separately unsupported.

Four new actual-owner/real-Three tests check independent Blender-conjugate golden
UV positions, both rotation signs, signed/nonuniform scale, every map matrix and
colour space/alpha, unchanged UVs/source, malformed input and late cancellation,
UV Image/unlit and byte-identical pooled/inline SaveOpen and native NOM parse/export.
Older .1025–.1028 nonzero-transform refusal fixtures now use nonfinite transforms;
the same refusal assertions stay active and new tests cover the expanded capability.
41 focused checks PASS/0FAIL/0skip including release/cache/identity protection.
Full local Node24.22.1 suite: 3046 PASS/0FAIL/0skip/0cancel (214.23s). Final canonical parent-loader/cache checks rerun: 11 PASS after a pin-only correction to drawer -> face-layout -> release-version. No functional runtime/test changes after full-suite start. Publication verified: see docs/publication-1030.md; no GPU/iPad PASS claimed.

Generic docs/samples/NOM_TEXTURE_TRANSFORM_1030.nom (76,188 bytes): cyan arrow on
four coloured quadrants. Left original, middle offset[.25,.125], right scale[2,1]
then pi/2 rotation with offset[0,2]. Same source image; compare SAME file in Nomad.
In-app test list updated; earlier .1029 ratings retained; no new A/B batch.
Reviewed reverse loader graph and canonical release/recovery pins .1030; other
runtime JS changes are import pins only. Main/Multi1.0/frozen betas untouched.

DEVICE1030: import sample in Studio/Solid, compare original/shifted/sideways repeated
arrow with Nomad; orbit/select/Move/UndoRedo; switch looks, SaveOpen.boxlab and
NOMAD/Nomad comparison. Accepted .1029 colour-alpha sample should stay unchanged.
Next: native transform feedback, then audit remaining sampler/projection gaps;
displacement/subdivision needs its separate bounded performance/benchmark decision.

## .1029 — native NOM colour-image alpha — 30 October 2026

User corrects initial1028 FAIL: “1028 PASS - refresh took some time but it worked
eventually :) /nextbuild”. This supersedes the initial report; protect accepted
1028 grayscale opacity/blending/backface/shadow handling plus1027 emission and
1026/1025 PBR/retention. Refresh lag is an observation, not evidence of opacity
failure; verify new shell/manifest/pins/live bytes, no speculative refresh changes.
Baseline main797f3538 / runtime d781f169.

Audit: native material already retains use_color_opacity. Extend existing resource
plan and UV overlay only: explicit true/1 opts into colour-image alpha in lit native
Studio/Solid. false/0/absent stays solid unless existing opacity map/scalar applies.
Unknown flags retain prior opaque inspection/refusal; no truthiness coercion.
Three's ORIGINAL RGBA map shader now runs for opted-in surfaces, multiplying image
alpha with existing linear alphaMap and factorOpacity * blending material opacity.
Accepted1028 RGB-only shader stays for colour-alpha OFF when opacity is otherwise
active. Native lit colour requests existing unpremultiplied bitmap path even when
alpha OFF so nonzero RGB under zero alpha survives; no pixel rewrite/re-encode.
Existing serial cancellation, preview budgets, source bytes, normal/scalar/emission,
selection/picking/history, shadow/backface lifetime and both Studio owners retained.
Unlit/UV Image retain prior colour-only policy; refraction/additive/dithering/native
vertex opacity remain unsupported. Transparency sorting limitations unchanged.
No geometry/subdivision/extra renderer/light or global material change.

Four new real-owner/Three/actual RGBA PNG checks cover explicit flag semantics,
RGBA vs RGB-only shader routing, combined independent map/scalar factors, solid OFF
control, raw zero/full alpha+nonzero RGB and unpremultiplied decoder/cancellation,
unlit/UV Image and exact pooled SaveOpen/native NOM bytes.1028 test now accepts
explicit flag1 per new feature and still rejects invalid2; all previous map/shadow/
cleanup assertions retained.35 focused PASS/0FAIL/0skip. Full final local Node24.22.1 suite3042 PASS/
0FAIL/0skip/0cancel (222.31s); no runtime/test edits after full-suite start.
Syntax/diff clean. No native GPU/iPad visual acceptance inferred.
Reviewed reverse-loader cache closure; most changes import pins only. Protected
main/Multi1.0/frozen betas, decoder and both1028 Studio shadow owners unchanged.
In-app list includes1029 checks; prior1028 ratings retained; no A/B batch required.

Generic docs/samples/NOM_COLOUR_ALPHA_1029.nom: left alpha ON checker holes; middle
same image x separate2x opacity map x uniform65% (factorOpacity .8); right same image
alpha OFF, solid. Fixture is test-only RGBA PNG construction plus original native
writer; original production opaque PNG encoders untouched. No user artwork.
DEVICE1029 Studio/Solid orbit: left checker holes,middle combined transparency,
right solid cyan; select/Move/UndoRedo,looks/back,SaveOpen.boxlab,NOMAD/Nomad.
Accepted1028 and1027 samples unchanged. User .1029 PASS recorded on 30 October 2026.
Next native colour-alpha feedback, then audit native texture translation/rotation
sampling through same owner; displacement/subdivision remains separately deferred.

## .1028 — native NOM opacity viewport — 30 October 2026

Publication verified: runtime d781f169d8e594107147fa61081fa751a9dcb15a;
fetched origin/main treedc71f74e7ea3d495382cd651870cf4616bdfa0e6 exactly matches
validated/uploaded files. All45 changed blobs hash-verified before non-forced,
expected-main update.9/9 fresh live byte matches: shell/manifest,native resource,
UV surface/decoder,render-modes,late Studio scene fix,test list and NOM sample.
Pages41033460133 and hosted topology41033461559 were in_progress at last query;
no hosted full PASS claimed. Broad local3038PASS and final focused31PASS remain
validation. Build1028 LIVE / READY for native opacity testing; native GPU/iPad
appearance gate remains pending. This publication proof changes documentation only.

User explicitly reports “1027 PASS /nextbuild”. Protect accepted emissive1027,
normal/scalars1026, colour/tiling/retention1025 and underside lighting1024.
Baseline mainfb2fc2de / runtimef1b4405f. Repo/source audit confirms original native
resource/UV overlay/decoder and render-modes are authoritative.

Studio/Solid lit native surfaces now preview separate opaque grayscale opacity maps
(linear alphaMap <=512square, saved factorOpacity * material blending opacity) and
simple blending material uniform opacity including zero. Original colour still
required. Opaque base or blending only; other native types and use_color_opacity
remain retained-only for opacity; accepted opaque colour/PBR inspection is preserved
for colour-alpha files. Per-map repeat/sampler and combined8MiB/4surfaces/20k corners
remain. Unlit/UV Image keep prior colour-only policy; source bytes/settings untouched.
Unsupported/failed opacity retains accepted colour/PBR and original opacity fallback;
late cancellation closes image and cannot activate transparency.

One scoped original Standard material shader hook ignores colour-map alpha while
sampling RGB, because native colour alpha is opt-in/deferred. Original bitmap decode
requests unpremultiplied RGB for these surfaces without changing sRGB conversion.
No canvas alpha rewrite/re-encode: that rejected approach loses RGB at alpha0 through
canvas premultiplication. Shader uses installed Three0.179.1 map chunk/cache key.
Native transparency uses existing alpha blending/depthWritefalse; original mesh
picking remains solid. Transparent self/intersecting sorting and optical refraction
fidelity are NOT claimed. Original orange backface cue hides for confirmed translucent
surfaces and restores on disposal. Mesh shadows disabled (not transparent shadows);
both original Studio refresh owners respect overlay lifetime flag so it cannot re-enable solid
shadows. General floor contact cue remains unchanged. No geometry/history/input,
extra renderer/light, global material override or duplicate owner.

Six new owner/real-Three tests cover guards/budgets/factors/sampling, material and
shader semantics, uniform+map and zero alpha, failure/late disposal, decoder options,
actual Studio/Solid/rig and late pointer-release scene-refresh cleanup and exact pooled project/NOM byte roundtrip.
31 final focused PASS/0FAIL/0skip. Broad local Node24.22.1 suite3038 PASS/
0FAIL/0skip/0cancel (199.52s), following earlier3038PASS. Final focused31 rerun
covers backward-compatible opaque colour-alpha fallback and serializable UUID
opacity ownership (no circular userData). Syntax/diff clean; no native GPU PASS.
Reviewed reverse-loader pins include original decoder/UV/export/paint parents;
most changes are cache references only. Main/Multi1.0/frozen betas, actual light
code and accepted1027 emission behavior retained. In-app checklist includes1028.
Generic sample docs/samples/NOM_OPACITY_1028.nom uses original native writer;
left grayscale checker opacity, middle35% uniform, right opaque control.

DEVICE1028: import sample Studio/Solid, orbit and inspect checker holes/middle
transparency/control; no orange fill through transparent areas. Select/Move/UndoRedo,
switch looks/back; Save/Open.boxlab and NOMAD/Nomad retain opacity settings/maps.
Also reimport accepted1027 emissive sample for quick sanity. No new A/B batch.
Next: native opacity feedback, then audit colour-alpha support/remaining transform
sampling before displacement; displacement subdivision remains separately deferred.

Sources: official Nomad material manual https://nomadsculpt.com/manual/material
and stephomi/nomad-link blender/nomad_blender_link/__init__.py: separate non-colour
opacity and opt-in colour alpha; implementation uses bounded grayscale only.

## .1027 — native NOM emissive viewport — 30 October 2026

Publication verified: runtime f1b4405fcdbde50384f2b07c51d535ee8e3bce8e;
fetched origin/main tree6de75a1f9b6abab77cdc9453d11c6fc769f32a5d exactly matches
tested/uploaded tree. All40 changed blobs hash-verified before expected-main,
non-forced update. Seven fresh live files byte-match: shell/manifest, material
resource/overlay/import owner/test list and downloadable sample. Pages41030968556
and hosted topology41030969386 were in_progress at last query; no hosted PASS
claimed. Full local3032PASS remains validation. Build1027 LIVE / READY for native
emissive testing. No runtime edits after full suite; native visual gate pending.

User explicitly reports “1026 PASS /nextbuild”. Protect accepted native normal,
roughness/metalness, colour/5x tiling, retained source bytes and round trips, and
1024 underside lighting. Baseline main b07c2859 / runtime 68320e5c.

Audit: existing nomad-material-resource and uv-image-surface-preview own native map
planning/decoding/material lifetime. Extend those owners only: supported opaque
UV/Auto emissive texture in Studio/Solid, sRGB image, saved linear factorEmissive
RGB and factorEmissiveStrength, independent repeat/sampler. Saved zero values remain
zero. Invalid factors/projections or exhausted combined8MiB budget remain retained-
only; failed/late auxiliary decode keeps accepted colour/PBR and cleans up normally.
Emission is surface brightness, with no added scene light/bloom/renderer. Colour
source still required; always_unlit and UV Image remain colour-only inspection.
Opacity/displacement display and translated/rotated/triplanar sampling stay deferred.
Original source bytes/material JSON/export/codec and geometry/picking/history retained.
Four native surfaces/20k corners; emissive1024square uses original serial decoder.

Four new real-owner tests cover plan/factors/tiling/budget/refusals, actual Three
sRGB emissiveMap/intensity and existing data maps, late/failure/unlit cleanup, and
byte-identical pooled SaveOpen/NOM. Original1025/1026 tests unchanged.25 focused
checks PASS/0FAIL/0skip. Full local Node24.22.1:3032 PASS/0FAIL/0skip/0cancel
(185.63s); four new tests also rerun after adding explicit zero-factor assertions.
Syntax/diff clean; no native GPU/iPad emissive acceptance inferred.
Reviewed reverse-loader cache closure; most changes are pins only. Main/Multi1.0,
frozen betas, actual1024 lighting and paint/reflection code unchanged. Existing
in-app test list includes1027 checks; no new A/B batch required.

Generic sample: docs/samples/NOM_EMISSIVE_1027.nom, regenerated by the existing
nomadPBRFixture({emissive:true}) and native writer. Left cube adds blue emissive
factor/strength2 to normal+roughness, middle PBR and right colour controls unchanged.
DEVICE1027: import sample Studio/Solid and orbit below; left emissive remains bright,
other cubes retain normal/scalar shading; switch looks/back. Save/Open.boxlab and
NOMAD reopen in Nomad retain it. Check accepted1026 sample still looks the same.
Next: native emissive feedback; opacity display needs separate scoped audit, while
subdivision/displacement remains deferred. Publication proof follows below.…141378 tokens truncated…geometry object” on default UV cube. Audit main
 aa37c161/runtime cd3e6b5f: linkedDuplicateObject intentionally refuses native UV
resources, Live Array blanket-rejects any glbPassthrough; default UVs introduced
later now make both old Array paths refuse. No .970 PASS inferred; .968/.969 icon
PASS retained. Pause Edge/Paint icon rollout for these fixes.

Original Array owner now uses ordinary manager.addMesh for independent native-UV
copies, keeping exact face-corner UVs/settings, original placements and ONE history
checkpoint. Geometry-only Array retains linked path. New small array-native-uv helper
reuses original UV inspector/topology signature, validates complete current native
payloads, refuses paint/imported resources/stale UVs before mutation. Independent
copy failure restores captured scene. No global linked/UV/mesh engine changes.
Live Array repeats exact original source UVs per copy (deliberate UV overlap), stores
nativeUV source payload in existing JSON recipe and updates native result payload.
Count/END reopen/Convert/UndoRedo/project codec retain it; no schema bump, reprojection
or texture loss. Paint remains refused; source editing for native-UV Live Arrays
remains refused by original source editor—Convert to Mesh before component changes.

User .970 report00:27:56Z reopens right-side visual fault despite .967 safeguards:
1366×886,DPR2,canvas2732×1652; no session/Paint, hidden gizmo; toolbar enabled/visible,
in bounds and exact hit stacks. Canvas isolation/contain and header isolation active.
Not disabled controls, missing DOM or stale967 pins. Two remaining per-SVG handle
hover/active drop-shadow filters in original gizmo removed; stroke/opacity feedback,
hit proxies, bounds, input and composition967 remain. This is a targeted reduction
of filtered SVG surfaces, NOT proof of WebKit root cause or a guaranteed UI repair.
Native .971 visibility retest required. See docs/ui-recurrence-970.md.

DEVICE971: default cube ordinary Array6 copies; UndoRedo. New cube Live Array6,
reopen/count edit/Convert, SaveOpen/UV preview. Repeat refresh/Array/Done/navigation,
watch right toolbar and send UI Debug report if fault returns. Existing Face/Vertex/
Object artwork unchanged. Next device feedback before Edge/Paint icons.

## .972 — plain UI rendering; Array PASS, visual fault still open — 26 October 2026

User says “Array now works but right hand side of screen is still failing”. Record
Array971 acceptance only; do not infer971 visual PASS or close recurring visibility.
Audit main c311992b/runtime13ad9e62. Array nativeUV helper and both paths untouched.
.967 layer hints and971 SVG glow removal proved insufficient on real iPad.
Current screenshot/report indicates visually absent but DOM-healthy controls;
not locally reproduced, no confirmed browser-engine diagnosis.

Audit found backdrop blur still active in floating panels/File/VIEW/bottom modes,
legacy tool popups and rename dialog. Header/status/ObjectBrowser retain .967
will-change:opacity hints. New single ui-stability.css default disables both
prefixed/unprefixed backdrop filters under #app, decorative filters on buttons and
gizmo SVGs, and extra opacity-layer hints on those three UI roots. Existing opacity,
borders/fills/strokes still show disabled/active state. Opaque dark surfaces replace
frosted panel backgrounds. Dynamic later tool styles are overridden via!important.
No transforms, reparenting, polling, hidden→shown tricks, renderer/history/input
changes, layout offsets, display/visibility, geometry or accepted icons changed.
.967 canvas isolation/contain, header z10 and fixed VIEW popup placement retained.
The plain profile is a controlled rendering reduction, not a proven engine fix.
WebKit primary source explains backdrop filters composite background content and
need extra rendering passes: https://webkit.org/blog/3632/introducing-backdrop-filters/ .
This supports removing that rendering path; it does not identify this exact bug.

DEVICE972: refresh landscape multiple times BEFORE switching apps; inspect right
FrameAll/Undo/Redo/Focus/Objects/VIEW and right status. Open Objects and VIEW menus;
Array preview/Apply/Undo, UV Editor enter/exit and orbit to right edge. If visual
loss recurs, exact972 UI Debug report plus screenshot still needed; gate OPEN.
Array971 PASS protected; Edge/Paint icon rollout remains paused for visibility.

## .973 — opt-in canvas visibility probe; .972 visual FAIL — 26 October 2026

User supplies .972 report01:18:45Z after recurring right-side fault. .972 plain
profile is confirmed active: header/status willChange auto; all sampled filters and
backdrop filters none. Layout/hits are still healthy, so blur/layer-hint removal did
not repair visual loss. No stale-shell explanation or .972 visual PASS. Array971
user PASS retained. Do not continue speculative cosmetic fixes or icon rollout.

Audit main2646e5cb/runtimea799ee6a. Extend ONLY existing File→UI Debug owner with
“Hide 3D only” / “Show 3D again”. This explicit diagnostic temporarily sets original
canvas inline visibility hidden!important, retaining layout/backing dimensions,
renderer/model/history. Restore exact prior inline value/priority (or absence),
on Show, Debug off and pagehide. Refuse entry during Paint, active tool or gizmo drag;
restoration always works. No reload, second renderer, resize, polling or new raw
pointer consumer. Disabled debug/default app unchanged. Existing CSS972 retained.

While hidden, user chooses “Right UI visible” or “Still missing”; bounded evidence
records subjective outcome plus canvas hidden flag and current toolbar probes.
Capture/Copy includes canvasProbe state. Show clears cached report so next Copy
includes both observation and restoration events. UI log controls remain on left.
This is a diagnostic build, not a claim that controls are fixed. The outcome will
separate canvas participation from UI-only painting; neither outcome alone proves
an engine root cause. Tests cover exact restoration, busy refusal, actual buttons,
observation, off/pagehide cleanup, and unchanged canvas dimensions/model/history.

DEVICE973: while right controls visually missing, BEFORE app switching, use File→
UI Debug→Hide 3D only. Inspect top-right toolbar; choose visible/missing result.
Show3D again→Copy report and send. Also say if restored3D makes rightUI disappear
again. This is the next decision gate; Array remains accepted; no modelling changes.

## .974 — approved Edge icons; user resumes icon rollout — 26 October 2026

User cannot currently reproduce right-side fault on973 and explicitly requests
“Move onto updating icons as before /nextbuild”. This authorizes resuming icons;
NOT a proven compositor repair or broad973 PASS. Keep intermittent visibility OPEN,
retain opt-in973 canvas probe and972 plain UI. Array971 PASS protected.
Audit current main46dcc231/runtimecbc30cf5, shell973 and all21 existing Edge tools.
Add only edge-radial-icons.css: approved Proof03 artwork,32px icons and original
small captions. Includes revised Offset/MergeDist/FillFace/Dissolve and restored
Bridge. Extrude12/Bevel3 and ALL source target IDs/labels/angular slots retained.
Inner same76×60/r112 as Face/Vertex; outer68×58/r230 fits dense original spacing,
9px titles/line-height1/padding2px allow two-line captions without enlarging ring.
One-off rectangle check confirms0 pairwise button overlaps across21 targets.
Exact original tool event/availability/UV/history owners and all runtimeJS retained.
Face/Vertex/Object sheets, Array,973 debug and972 stability CSS/pins unchanged.

DEVICE974: Edge selection→radial inspect icons/titles/dense outer spacing; try Slide,
Bevel and Loop; Cut/Stitch UV access and UndoRedo on suitable mesh. Switch other
modes to confirm accepted icons, navigation and right controls remain usable.
Next Paint icons after Edge feedback. Keep canvas diagnostic if visibility recurs.

## .975 — XY/XZ/YZ pads for Edge and Vertex Extrude; .974 icon PASS — 26 October 2026

User .974 icons PASS protected; asks fixed world-plane choices via small square pads
like main Move gizmo, in BOTH Edge and Vertex Extrude. Audit main2af7fe53/runtime
17c1d910. Original gizmo already has XY/XZ/YZ polygons but Extrude hid their group;
Vertex owner accepts only Free/XYZ and Edge accepts original edge-perpendicular
Plane/XYZ. Extend these SAME owners, no new gesture/topology/history implementation.

Expose existing three plane polygons during Extrude, original main plane colours,
aria XY/XZ/YZ labels, selected-pad stroke/fill/opacity and “XY plane” badge. Pad tap
selects constraint only; drag original edge/vertex to extrude. Centre Free and XYZ
arrows retain previous meanings and controls. Rotation/Scale remain hidden during
Extrude; Done restores normal gizmo. Old direction row remains hidden (no duplicate).

Shared extrude-plane-constraints helper supplies world normals, omitted-coordinate
projection and Exact direction. XY→Z fixed, XZ→Y fixed, YZ→X fixed at ORIGINAL
component coordinates (not global zero). Original gesture owners raycast a plane
through selected component centre; free-view and edge-perpendicular paths preserved.
World-plane Edge drag uses named plane directly, not edge-perpendicular projection.
Exact follows last pull projected into selected plane, or projected view-up/fallback;
Edge skips collinear directions to avoid zero-area ribbons. Repeat also projects
last vector after a plane change. Near-parallel ray refuses safely with orbit hint;
no giant coordinates, extra history or lost navigation. Existing validation/metadata/
selection/history commit and cancellation owners retained. Internal old version
stamps retained intentionally; changed loader pins and reviewed hashes975 updated.

Tests execute BOTH actual gesture owners with oblique cameras for all3 planes:
multi-tip/edge ribbons, signedExact, Repeat, UndoRedo, cancel and constant omitted
coordinate; true edge-on refusal/firstExact fallback; actual chooser callbacks and
visible/highlighted pads. Existing757 show-selector assertion expanded to include
newly exposed plane group; no behavioral protection dropped. Accepted icon CSS,
Array971 and visibility972/973 safeguards untouched. Intermittent right fault remains
unproven; user recently unable to reproduce. Next device plane-pad acceptance,
then Paint icon rollout unless user reprioritizes.

DEVICE975: Edge boundary/loose edge→Extrude→XY/XZ/YZ small squares, drag each; orbit
obliquely if plane edge-on. Repeat in Vertex mode. Check XY holdsZ/XZ holdsY/YZ holdsX,
Exact/Repeat/UndoRedo/Cancel and centreFree/XYZ still work. .974 icon PASS retained.


## .976 — reconnect ready Edge Bridge selections — 26 October 2026

Audit main81ba4afd/build975. User supplies screenshot975 and exact Edge Fail(1).obj
(24 vertices/14 quads); retain unchanged fixture tests/fixtures/edge-bridge-976.obj.
The highlighted boundary pair is OBJ vertices3–10 and23–24 (runtime edges12/35).
Both have one face owner. Existing fully installed Open Chain Bridge accepts the pair,
creates quad[3,23,24,10] (OBJ one-based) and passes original topology validation.
Radial guided session676 incorrectly accepted ONLY one complete boundary loop in
canStart/openFromHub, disconnecting already-supported ready pairs. Repair SAME
session: delegate ready-pair eligibility to existing bridgeEdgeSelectionInfo, retain
single-loop guided entry, sync Apply immediately, show ready status. Original UI,
topology, winding/quality/transaction guards and history own Apply unchanged.
Cancel retains initial pair; invalid/interior/missing/single-open-edge inputs refuse.
No new kernel/gesture, gizmo changes, renderer fixes or icon work.975 pad acceptance
not inferred from uploaded screenshot.974 icon/971 Array PASS and972/973 visual
safeguards remain; intermittent right-side fault is still OPEN.

Validation:225 focused Bridge/selection-hub/radial/release tests PASS,0FAIL/0skip.
Four new real-owner integrations cover supplied pair→actual radial availability→
original UI Apply→one history step/UndoRedo, Cancel, guided single-loop→second-loop,
and invalid input atomic refusal. Node DOM adapters are not native iPad proof.
Changed runtime ONLY selection-hub-bridge-session; reviewed session/recovery pins976,
release markers976 and asset hashes updated; Multi1.0/frozen/icon/geometry unchanged.
Publication verification follows separately. DEVICE976: same model/two red edges →
Edge radial Bridge → Apply Bridge: one closing quad. UndoRedo; reopen then Cancel
retains pair/geometry. Also sanity-check existing two-loop Bridge. Next actual device
feedback, then Paint icon rollout; preserve independent975 Extrude pad device gate.

## .977 — radial wiring audit and near-front Exact Extrude — 26 October 2026

User requests audit of all radial tools; orbit sometimes changes Through refusal.
Audit current main563fede9/build976. Full route inventory81 entries (Face23/Edge21/
Vertex14/Object13/Paint10), original targets/availability/context adapters/action owners:
 docs/radial-wiring-audit-2026-10-26.md. No missing action owner or wrong-mode target
found in source review; this is not exhaustive native-gesture/mesh certification.
976 Bridge launcher defect repaired/published; all3 changed live files byte-match.
Baseline976 FULL2833PASS/0FAIL/0skip (100.7s), focused225PASS.

Confirmed separate Exact bug: precision-face projected-normal fallback threshold1e-5px
versus actual multi-face-direct gesture1e-4px can invert sign in narrow near-front
camera band. Existing bevel-inset750 face7, camera centre+normal*5+(0,1e-6,0): Exact
-2.2 incorrectly extrudes+2.2; orbit.01 cuts inward. Align ORIGINAL precision cutoff
to gesture1e-4 ONLY. No main/drag/kernel/geometry/history/inference/physical input change.
Dynamic precision-face child and drawer-ui parent/shell keys977 refreshed; original
internal stamps retained. Reviewed hashes and release recovery/shell markers977.
Three new tests use actual precision projection + native controller/fallback:10 angles,
exact closed output/UndoRedo, old-code mutation sensitivity, five physical drags and
pure-plan invariance. Focused final128PASS/0FAIL/0skip, not full977 rerun.

User's physical Through refusal remains unproven on affected model. Camera changes
projected dragging and reference inference; no blanket refusal fix claimed. Audit
also records two follow-ups: numeric synthetic input still traverses inference, and
precision success/readback lacks downstream commit acknowledgement. Keep these OPEN
for narrow result/constraint work; don't relax topology guards or replace kernel.

New visibility evidence while977 prepared: exact976 report04:53:18Z shows hide canvas
at24626, rightUI visible observation35014, restore37246. User confirms controls STAY
visible after Show3D. Top-level hidden:false is restored state. Layout/styles/hits
healthy throughout; noPaint/session, plain972 active. This implicates a canvas/UI
painting interaction but no engine root cause or permanent fix is proven. Retain
OPEN recurrence and device-proven manual Hide3D→Show3D recovery; no automatic blink,
poll/reload/renderer change. See docs/ui-canvas-probe-976.md for precise evidence.

DEVICE977: confirm977, same negative Exact on near-front then slightly orbited view;
UndoRedo; retry original physical Through with inference off/on, send exact refusal
and pre-attempt.boxlab if recurring. Bridge pair Apply/Cancel retained. If right UI
fails use existing Hide3D→Show3D;977 does NOT claim to repair visibility. Next prioritize
evidence-led canvas/UI diagnosis, then exact-result/inference follow-ups before more
feature rollout.974 icon/971 Array acceptance and protectedMulti1.0/frozen unchanged.

## .978 — Edge Bridge preview before Apply — 26 October 2026

User clarifies976 commits after Apply but does not PREVIEW, unlike accepted Face
Bridge. This is a missing interaction stage, not failed bridge topology. Prior976
ready-pair launcher repair retained; no broad976/977 PASS inferred. Audit mainf6a3ff30,
same guided Edge session had no preview owner; Face Bridge mutates preview mesh,
while accepted Face/Vertex Bevel already shares a rendering-only blue ghost helper.
Reuse existing createFaceBevelPreview/disposeFaceBevelPreview unchanged for Edge.

SAME selection-hub-bridge-session builds original bridgeSelectedEdges on private
clone and renders changed polygons with original blue translucent fill/wire helper.
Original source/selection/metadata/history/project remain untouched until Apply;
no new modelling/triangulation/history kernel, manager mesh replacement or renderer.
Candidate clone calls preserve active state.mesh despite historical edges observers.
Selection-key cache reuses preview during orbit; selected-boundary change rebuilds it,
incompatible/quality-refused candidates clear it. Guided first loop shows no ghost
until compatible second boundary selected. Apply disabled without actual preview.
Apply runs original bridge-ui commit once; Cancel removes ghost and retains initial
selection. Existing UndoRedo works. Preview renderer/helpers and Face Bridge unchanged.

Session owns source snapshot key, object/mode/lock/scene context. External geometry/
metadata changes, object/mode/tool change, pagehide dispose ghost WITHOUT restoring
stale mesh/selection or closing newer tool UI. Original background-exit route still
calls close; no new raw-pointer owner, per-frame polling or source rollback. Shared
geometry/material disposal occurs once. Overlay is transient outside scene object
manager and uses established Bevel blue style, not saved geometry or a second body.

Focused232PASS/0FAIL/0skip (~0.67s): original Bridge/radial/selection contracts and977
camera regressions; four added real-controller/Three scene tests prove visible ghost
BEFORE Apply with no source/history changes, one-step commit+UndoRedo, selection
update/removal/Cancel, source/object/mode/tool/pagehide cleanup, no-scene refusal and
single geometry/two material disposal. Existing976 harness supplies real scene/shared
preview functions; no old geometry/history assertion removed. No native iPad visual
acceptance inferred. Runtime change ONLY original Edge Bridge session; session/recovery
pins978, unchanged716 renderer import explicitly reviewed in asset contract.

DEVICE978: select same two boundary edges → Edge radial Bridge: BLUE span visible
BEFORE Apply. Orbit to inspect; Apply keeps bridge and removes blue, UndoRedo.
Cancel removes blue, preserves original mesh/selection. Guided two-loop selection
updates preview as second boundary is selected. Face Bridge remains unchanged.
Right-side fault stays OPEN with confirmed manual Hide3D→Show3D recovery; no rendering
repair or other .977 exact/inference/readback follow-up included. Next native preview
feedback, then evidence-led canvas/UI work and remaining audit follow-ups.

## .979 — Exact inference isolation and truthful commit readback; Bridge978 PASS — 26 October 2026

User explicitly PASSes978 Bridge preview before Apply/Cancel; protect its private
clone/blue ghost/source-neutral preview/one-step original commit and lifecycle.
User /nextbuild authorizes the two remaining Exact audit fixes. Audit remote/current
main028718a9, release978. Existing numeric gestures already use reserved pointer9876;
existing direct committed event owns successful geometry values. No new kernel needed.

Original Face referenceUnderPointer now ignores ONLY numeric pointer9876. Physical
Pencil/mouse inference and toggle state stay unchanged. Covers Extrude and Inset;
original model-unit/direction mapping,977 aligned near-front projection, Through
shell-exit snapping and inset safety clamp remain. Exact still enters original
controller and guarded geometry/history owners; no separate modelling algorithm.

Precision tracks one synchronous numeric request and listens to ORIGINAL
boxlab-face-direct-committed. It records success/Repeat/readback only after that
semantic acknowledgement, using ACTUAL committed value rather than requested input.
Existing positive/recess/closed-negative/Inset events retained; old open-sheet
Through success branch now emits same semantic event after original guarded commit.
Example: requested-2.2 stopping at shell exit-2.0 records/displays-2.0. Inset request
above safe range displays original clamped distance, never an unperformed100.

No acknowledgement means false/refused status, no fake value-committed event, prior
successful per-tool Repeat/value retained. Refusal readout survives subsequent status
observer callbacks, even with no prior success; next physical press/Exact attempt/
success clears it. Blank/zero/nonfinite input and absent history refuse before
synthetic geometry dispatch. Original refusal/rollback/selection/history remain.
Physical drag callbacks still record geometry normally. This is transaction reporting,
not relaxation of topology refusal or proof of user's physical Through failure repair.

Final517 focusedPASS/0FAIL/0skip (8.7s): new7 actual precision+direct-controller tests
plus Face/Through/negative/repeat/radial/Bridge/release regression. New fixtures run
original uniform-inset owner rather than centre-lerp fallback. Test exact.37 at3
cameras, Through at4near/oblique views, actual exit depth, UndoRedo/one checkpoint,
refused entire-solid cut with unchanged source/history/last value, actual clamped
Inset, numeric invalid/no-history refusal, real physical vertex inference vs same
numeric contact, persistent failure readout. No native iPad acceptance inferred.
Changed functionality ONLY precision-face and3lines in original multi-face-direct;
drawer-ui changes child pin only. Reviewed parent/child/direct/recovery pins979 and
shell markers/asset hashes. Main/geometry/Through kernels/Bridge978/Multi1.0/frozen/
icons/972plain/973probe remain unchanged. No duplicate history or input owner.

DEVICE979: with inference ON, Face Exact.37 (or convenient value), orbit/Undo/retry;
result should retain entered distance. Valid Through overshoot displays actual exit.
Try a refused cut: explicit refusal, previous successful value retained; Undo must
undo the last successful operation, not an invented failed action. Physical snap
still works. Bridge preview978 remains accepted. Right-side fault still OPEN; manual
Hide3D→Show3D recovery confirmed. Next evidence-led canvas/UI work or actual979
feedback; no new feature/icon expansion before outstanding reliability direction.

## .980 — explicit File Refresh display recovery; .979 user PASS — 26 October 2026

User PASS979 protects Exact inference isolation, actual commit readback, refusal/
last-value/history and existing physical snapping. Bridge978 PASS remains protected.
Audit main2f2ee78a/release979. Next reliability focus is recurring right-side UI.
976 device probe proved Hide3D restored controls and Show3D left them visible; this
narrows canvas/UI painting interaction but does not establish root cause. No further
speculative CSS/layer/renderer change or permanent repair claim in980.

Add File → Refresh display, available WITHOUT enabling debug. It uses SAME existing
createCanvasVisibilityProbe inline visibility save/restore owner. Explicit user click
hides ONLY original canvas for one presented frame (two RAF callbacks), then restores
exact original visibility value/priority/absence.250ms timer fallback and pagehide/
hidden-document/debug-off cancellation ensure restoration if animation frames stall.
No reload, canvas re-creation/resize/DPR/model/history/selection mutation, new renderer,
automatic recurring blink, idle polling, navigation or pointer owner. Debug off stays
off; File closes after successful start, button resets after restore. Confirmation
says Display refreshed, not that the fault is permanently fixed.

Pending refresh rejects repeats and does not take over manually hidden debug probe.
Existing probe busy guard now also checks main/Face/Edge/Vertex/Bevel live drags;
Paint/tool session/gizmo guards retained. Refused entry leaves work untouched and
asks to finish active operation or Show3D. Debug probe/observation buttons disabled
briefly during recovery. Optional debug logs record start/end and invalidate stale
cached reports. Original two-step diagnostic and user-observation flow unchanged.

Final39 focusedPASS/0FAIL/0skip (0.28s): new4 recovery tests + existing debug/display/
canvas973/Bridge978/Exact979/release contracts. Exact inline restoration across6
initial states, hidden frame before restore, stalled-frame fallback, cancel/late-frame
cleanup, busy/manual-probe refusal, scheduler failure restoration, actual File entry
with debugOFF, pagehide/debug-off cleanup, unchanged backing dimensions and model/
history identity tested. Original973 tests retained. Shared test helper only gains
optional File host. No native iPad recovery-speed/visual acceptance inferred.
Runtime change ONLY gesture-debug; direct shell/recovery pins980 and reviewed hashes.
979 modelling/Exact,978 Bridge/shared renderer, main/Multi1.0/icons/frozen unchanged.

DEVICE980: File→Refresh display: canvas returns automatically, model/selection stay;
UndoRedo still acts on actual prior modelling changes. No debug enable required.
When right controls next disappear, use this one action; report if they return and
stay visible. Existing manual Hide3D→Show3D remains available if brief refresh does
not reproduce its recovery. This is convenient evidence-based RECOVERY, not a claim
that intermittent painting fault is fixed. Next follow native feedback and investigate
canvas/UI boundary from evidence; retain all protected979/978 interactions.

## .981 — UV popup top layer and complete surface teardown; .980 recovery PASS only — 26 October 2026

User980 PASS accepts explicit recovery, but rejects needing manual Refresh as a
solution and supplies reproducible UV window report07:51:09Z. Keep right-side visual
failure OPEN; don't misrecord980 as UI repair PASS.979 Exact and978 Bridge protected.
Audit currentmaina00685a8: eventchain is Object UVtools88180→meshHealthClose92850→
finalsessionnull, no UV Editor/paint/displayrefresh needed. Controls/geometry/hits
healthy; hidden sharedhost remains viewport-contained with z134/overflowauto/
containlayoutpaint/isolationisolate. Source end lacked viewport-style/placement
cleanup. Exact evidence summary in docs/ui-uv-trigger-980.md; no proven engine cause.

Repair original tool-session-ui owner, NOT an automatic workaround. UV tools uses
manual native Popover top layer if supported; original host/control nodes remain in
DOM so existing scoped wide CSS/listeners/actions survive. Fixed positioning follows
viewport top+12px; dynamic viewport height bounds, window/visual resize listeners
active only while shown. Original .958 transformfree position retained, but failed
paint-containment layer removed. Transparent noninteractive backdrop, inherited text
colour; no modal/inert/focus-trap or new raw-pointer owner. Other tools unchanged.

On Close/context switch, hide/release native surface before returning original
controls; clear popover/dock/wide flags and ALL inline viewport styles; park empty
hidden host back in drawer. UV Editor handoff explicitly suspends source surface
before first workspace paint while preserving original logicalsession until Back/
Close. Thus no empty top-layer popup above2D editor. Existing workspace952 and all
UV/atlas/history/math owners untouched. Native unsupported/throwing API falls back
safely to original untransformed absolute panel, without containment; same cleanup.
No canvasvisibility/refresh/resize/renderer reset, timer, per-frame polling or mesh
change introduced. Existing manual recovery remains available but is not invoked.

Existing debug snapshot now includes source-parent/popover/topLayer state plus
meshHealthSession and boxlabUVWorkspace, so native rendering mode/clean close can be
verified if recurrence persists. This is evidence, not replacement controls.
364 targetedPASS/0FAIL/0skip (4.5s):5new controller/native-API-double tests cover15
open/close cycles, exact original nodes/context, top-layer release/styles/parking,
UV Editor handoff, resize/disposal, other-tool switch and unsupported/throw fallback.
OriginalUV/workspace/session/health/debug/Bridge/Exact/release checks retained.958
test now rejects old containment rather than preserving a mitigation that failed
ondevice. No local native WebKit visual reproduction/guaranteed permanent repair
claimed. Device must confirm this structural source fix prevents the trigger.

Changed runtime only original sharedsession/meshhealth handoff/debug evidence; direct
shell/recovery keys981 and reviewed hashes. Native API supported since Safari17;
primary sources in incidentdoc. No shared layout/positioner edits, duplicate popup,
UV kernel,main,980 recovery implementation,979Exact,978Bridge,Multi1.0 or frozen changes.

DEVICE981: without Refresh/app-switch/rotation, repeatedly Object→UV→Close, inspect
right toolbar/status each cycle; then Auto atlas/Open UV Editor/Back and orbit to
right edge. Controls must stay drawn and usable. UI Debug if recurrence: host parent
should be drawer afterclose, popovernull/topLayerfalse, containnone; send new report.
Do not close visual issue from automated PASS. Next actual981device result before
unrelatedfeature rollout or speculative further CSS/engine fixes.

## .982 — approved Paint radial icons; .981 user PASS — 26 October 2026

User explicitly PASSes .981 and requests /nextbuild. Protect the accepted UV popup
native-top-layer lifecycle, complete Close teardown and Editor handoff; this supersedes
older pending DEVICE981 notes. No Refresh display is required for that accepted flow.
Earlier .967 acceptance subsequently regressed, so retain diagnostics and investigate
any recurrence from fresh evidence rather than declaring every rendering path proven.
Bridge978, Exact979, Array971 and accepted modelling icons remain protected.

Audit main24f53cc3/runtime dbe13368, matching live981 shell/manifest, recent commits,
radial wiring inventory and selected65-tool Proof03 artwork. All confirmed audit
repairs are accepted; physical Through refusal still lacks its affected source/gesture.
Resume queued final Paint icon stage, not a speculative further rendering change.
All10 existing Paint actions/pages already have original buttons, labels, placement,
state and dispatch in viewport-paint.js. New scoped paint-radial-icons.css supplies
EXACT approved Proof03 Brush/Fill/Eraser/Smudge/Blur/Layers/Mask/Image/AO/Map size SVGs
as noninteractive32px pseudo-elements above original small captions. Hide their old
22px inline artwork visually; original DOM/text/actions remain. Same76px button width,
132px radius/350px surface/angles, explicit60px height; centre Paint control untouched.
Ten valid SVGs byte-match selected artwork; all target boxes fit existing bounds with
ZERO pairwise overlaps. Existing active/disabled feedback retained.

Runtime JavaScript, Paint gestures/resource/history, left settings/Layers, all modelling
icons and981 surface repair are byte-unchanged. Only new stylesheet, shell/recovery
keys982, manifest and reviewed asset contract change. No automatic refresh, new popup,
input owner, brush/kernel or frozen/Multi1.0 change. Native readability is DEVICE982.
Validation:33 focused PASS/0 FAIL/0 skipped (4.9s), covering existing Paint tools/
workflow/continuing Smudge, UV981 lifecycle, Bridge/Exact and release contracts.
Ten SVG XML/exact-artwork and original radial bounds/overlap checks pass. No local
rendered browser/native iPad appearance result claimed. Publication proof follows.

DEVICE982: UV PAINT -> inspect10 icons/captions; choose Brush/Blur/Smudge and confirm
left settings. Browse Layers/Mask/Image/AO/Map size; radial stays until Pencil touches
mesh and background hold reopens it. Paint, UndoRedo, Done; UV open/Close still leaves
right controls visible without refresh. Next await Paint icon acceptance, then audit
queued UV-free facegroup painting through existing faceGroups/selection/history owners;
do not invent a second painter or assume facegroups are absent.

## .983 — stable startup toolbar; .982 Paint PASS, refresh visibility recurrence — 26 October 2026

User: “PASS - refresh made the right controls disappear BUT several refreshes fixed
the intermittent bug. /nextbuild”. Protect982 Paint icons/workflow. REOPEN right-side
visual gate after refresh;981 accepted UV lifecycle is not blanket rendering repair.
No new debug report/browser trace accompanies recurrence; exact engine cause remains
unproven. Do not ask repeated refreshes as a solution or resume facegroup feature work.

Audit current main940cc66a/runtime bc99a6f9, live982 markers, current script pins,
original toolbar, View/Frame owners and967 composition/981 lifecycle. Shell initially
has only Undo/Redo; direct-bevel later prepends Frame, view-modes appends Focus/Objects/
VIEW, toolbar observer replaces their artwork and reorders them. Prior966 debug records
right-toolbar width134.56px at459ms ->317.61px at649ms after canvas creation. This is
confirmed staged startup DOM/layout, NOT proof that it causes native pixel loss.

Seed final five original SVG buttons plus original VIEW markup in initial HTML,
already in final order. New viewport-toolbar-shell.css makes established header/icon/
VIEW-summary dimensions available before module/WebGL startup. Old selection modes
inside header stay out of initial header flow until same topbar owner moves them to
existing bottom dock. Existing main UndoRedo bindings retained. Original direct-bevel
Frame All reuses/binds shell button once (old presence early-return would disconnect
it); exact original camera fitting remains. Original view-modes adopts shell Focus/
Objects/VIEW nodes, installs same handlers/CSS, preserves SVG/panel identity and order;
creation fallback retained for embedded shells. Existing late toolbar observer sees
already decorated/ordered nodes, so no startup button replacement/reorder is needed.
No duplicate action, new pointer/history owner, WebGL delay/reset, canvas hide/refresh,
polling, filter/layer hint or new top-layer chrome. UV981 implementation untouched.

This removes a verified startup instability; native iPad visual gate stays OPEN.
Do not call983 a proven permanent compositor repair. Right status path unchanged.
Changed runtime functionality only two original action owners plus shell/early CSS;
view-modes/direct-bevel/recovery pins983 and reviewed hashes. Paint icons982,
Multi1.0/main/rendering/modelling/frozen implementations unchanged. Existing Focus
literal733 pin test follows reviewed contract, behavior assertions retained. Bevel
DOM fixture now supplies its ordinary real-shaped Frame button instead of bare{};
all existing geometry/history/context assertions retained. New tests execute actual
VIEW/Frame owners to prove original-node adoption, one click binding, fallback and
camera fit; shell has single ordered IDs/artwork before module execution.
Final319 focused PASS/0 FAIL/0 skipped (4.4s), including Bevel geometry/context/
history, View/Focus/browser/toolbar, menu bounds, UV981 and release contracts.
Syntax and diff checks pass. No hosted/full-suite/native visual result claimed.

DEVICE983: reload several times and inspect right toolbar/status IMMEDIATELY before
UV/app-switch/rotation; report any invisible controls. Frame All, UndoRedo, Focus,
Objects and VIEW each perform original action once. UV tools -> Close and Editor ->
Back keep981 behavior; Paint icons remain accepted. If visual loss recurs, copy fresh
UI Debug report before recovery and say whether it occurred immediately on reload.
Next actual startup feedback/evidence before further rendering changes or new features.

## .983 device feedback — first-refresh visibility FAIL — 26 October 2026

User: “PASS / First refresh still causes loss of right hand side”. Record functional
PASS separately; .983 startup rendering repair FAILED its native visual gate. Static
initial toolbar did not eliminate the first-refresh problem. Do not keep presenting
startup construction as the cause or .983 as a permanent fix. No new source/debug
report supplied yet. Preserve accepted982 Paint icons, original toolbar actions and
981 UV teardown; overall intermittent visual failure remains OPEN.

Next evidence: enable File -> UI Debug before reproducing a browser reload; on the
FIRST failed load, Capture report -> Copy report BEFORE another refresh, app-switch,
rotation or Hide3D/Refresh display. This captures983 startup width/DOM/top-layer state
for comparison with966/980. It cannot directly diagnose browser compositor pixels;
if DOM is again healthy, don't claim the report proves an engine cause or repeat
speculative CSS/layer tweaks. Need native rendering evidence for further source work.
No new runtime/build in this feedback-only update; no new hands-on feature test.

## .983 evidence — UI visible, right ground shading missing — 27 October 2026

New user983 report at2026-10-26T21:36:08.875Z explicitly says UI IS VISIBLE but ground
plane shading is missing on the right. Treat this capture as a ground/render symptom,
not another visually absent toolbar. Earlier first-refresh UI failures remain separate
OPEN evidence; this capture alone neither retracts them nor proves permanent UI repair.

Toolbar width317.609375 at debug-startup1296ms and pageshow2814ms is stable. Canvas
CSS1366x826/backing2732x1652/DPR2, sessionnull/Paintfalse, UV workspace absent. Hidden
session host is unstyled/popovernull/topLayerfalse; no retained UV overlay in capture.
No reported error/context-loss event in supplied bounded log. DOM/hit probes cannot
show WebGL floor/shadow pixels or identify the browser compositor as root cause.

Read-only source audit: render-modes owns a finite Studio floor (minimum24 world units)
and finite directional shadow frustum; studio-scene-fix updates same floor/light;
studio-polish adds contact shadow, atmosphere adds CSS multiply vignette. Multiple
rendering contributors, no evidence yet which is missing. Do not enlarge floor,
shadow bounds or change CSS/blending from this report alone. Request screenshot of
actual missing region and whether its boundary stays at same SCREEN x during a small
orbit or moves with ground. This separates screen-region loss from world-space floor/
shadow extent; no further debug dump or recovery refresh required for this comparison.
No runtime/build changes;983 remains current. Paint982/functional983 PASS protected.

## .983 screenshot evidence follow-up — 27 October 2026

Initial screenshot now inspected: visible toolbar, cast cube shadow, vertical tonal
seam near right quarter while floor continues across it. Keep rendering issue OPEN;
do not treat that seam as the floor's distant edge or assume a larger floor fixes it.
Next small orbit comparison (fixed screen position / ground-relative / disappears),
without refresh or app-switch, before selecting a rendering change. No new runtime
build; .983 remains current. Accepted Paint icons and modelling behavior retained.

## .984 — selected-face group authoring — 27 October 2026

User cannot currently reproduce the right-region fault and authorizes resuming
development. Keep it OPEN: seam was screen-fixed, returned after view switching,
and user reports gizmo/UI disappears in that region while toolbar remains visible.
Do not claim a vignette-only cause or permanent repair. Rendering is unchanged.

First narrow step toward UV-free facegroup painting: VIEW > Facegroups now offers
a group name plus Assign selected / Clear selected. Select faces in Face mode
first. Existing selection/navigation owners remain; this is explicit selected-face
authoring, NOT a continuous Pencil facegroup brush. Same names join an existing
group; Clear restores ungrouped metadata. No UV requirement or texture modification.
Original manager replaceActiveMesh and scene capture/checkpointSnapshot own the
transaction. Refuse locked/reference/linked/recipe objects, active tools, invalid
selection/name or missing history before mutation; no-op creates no checkpoint.
Only faceGroups change on a clone; geometry/UV/resources retain original ownership.
Existing Facegroups render, save and export paths display/persist the metadata.
New module loaded by original render-modes; changed render/recovery pins984, shell
markers and reviewed asset hashes. Protected Multi and rendering safeguards untouched.
15 focused checks PASS including new metadata/no-op/refusal/checkpoint tests,
existing Facegroups owner, toolbar and release contracts. Additional codec/UV tests
reported separately. No native iPad or complete suite PASS claimed.

DEVICE984: select two faces, VIEW > Facegroups, name and Assign selected. Select
other faces and assign same/different name; Clear selected. UndoRedo and Save/Open
retain groups; UV Paint and navigation stay usable. Next: device acceptance, then
plan continuous group painting through existing selection/gesture ownership.

## .985 — reuse existing facegroup names; .984 user PASS — 27 October 2026

User PASS984 protects selected-face assignment/clear, UndoRedo and Save/Open.
Next narrow authoring step reuses current names: VIEW > Facegroups has native name
suggestions refreshed from authoritative live mesh whenever name input gains focus,
and Use selected group name copies the uniform group of selected faces into input.
Mixed groups, ungrouped/no/invalid selection and non-Face mode give explicit reason
and keep current input. Names are inserted through option.value, never HTML. Reads
change neither selection, mesh, texture nor history; Assign selected remains sole
metadata transaction owner. Duplicate names deduplicated; no global remembered list.
Original name length/validation and editable-object refusal remain. No new pointer
listener, automatic assignment, new painter/history owner or rendering change.

Audit found Pencil selection ownership shared by edge-paint-select and pencil-orbit
gate/main. Continuous facegroup brush remains deferred until that existing ownership
can be extended coherently;985 is group-name reuse, NOT Pencil facegroup painting.
Runtime changes only facegroup-authoring/render-modes UI, their loader pins985 and
release/recovery markers; reviewed hashes updated. Protected Multi,984 assignment
transaction, gestures, UV/Paint/resources and rendering safeguards unchanged.
24 targeted tests PASS/0FAIL/0skip: group reuse/refusal/read-only/text safety plus
984 authoring, Facegroups owner, original toolbar, project codec, UV and release.
Syntax/diff checks pass; native iPad suggestion UI and group-name use need review.
No full-suite/native compositor proof claimed. Intermittent right-region fault OPEN.

DEVICE985: select grouped faces > VIEW > Facegroups > Use selected group name;
select different faces and Assign selected with retained name. Focus name field for
current suggestions. Mixed/ungrouped selection refuses pickup without changing name.
UndoRedo should affect assignment only, not name reads; Save/Open stays accepted.
Next device result, then continuous facegroup gesture-owner audit.

## .986 — Pencil facegroup strokes; .985 user PASS — 27 October 2026

User PASS985 protects name reuse/suggestions and984 assignment/clear/UndoRedo/SaveOpen.
VIEW > Facegroups > choose name > Pencil facegroup strokes closes VIEW and arms
Pencil-only surface strokes in Face mode. Pending unique visible face hits are
collected privately and count shown in status; GROUP COLOURS UPDATE ON PENCIL LIFT,
not during contact. Lift commits through accepted assignSelectedFacegroup and
original manager/scene history once. No UVs required. Existing selection is untouched.
Reopen VIEW > Stop facegroup strokes; changing group name or picking another name
stops old named brush; rearm to paint new group. Switching render look also stops.

Original edge-paint-select owns down/move/end/cancel and visible first-hit raycast;
no parallel raw-pointer brush owner. Existing Pencil gate recognizes armed Face
brush as modelling intent on mesh; background Pencil navigation still forwards.
Finger navigation remains; a secondary canvas contact cancels pending stroke.
Capture loss, pointercancel, hidden/pagehide, orbit claim and Stop discard pending
faces and restore exact prior controls.enabled. Coalesced contact samples and lift
hit included; no interpolation/radius brush in this first build. Through selection
depth does NOT assign hidden/back faces: uses nearest face only. Existing Lasso,
FaceDirect/main direct tools and split/offset owners keep priority.

Controller refuses unsafe objects/tools/context; completion rechecks object, mesh
identity, geometry/groups signature, look/mode and original authoring gates. History
or geometry changes during contact discard stroke. No source preview mutation or
cancel rollback needed; duplicate/no-op faces do not create history. New pure stroke
controller imports original authoring helper; render owner supplies existing globals.
No geometry/UV/texture kernel or new history owner. Protected Multi untouched.

84 targeted checks PASS/0FAIL/0skip; expanded stroke test also passes actual original
selection-brush+Pencil gate with real Three face raycasts, lift, cancellation, secondary
touch, lost capture, pagehide, restored controls and background navigation. Controller
tests cover staging, unique faces, one checkpoint, refusal/stale context and no-op.
Existing selection/Lasso/Pencil,954 picking,984/985 authoring, toolbar, Facegroups,
project codec, UV and release contracts retained. Syntax/diff checks pass. No native
iPad/full-suite or rendered proof claimed. Existing runtime tests' visibility mock
lacks document events: visibility cleanup uses window capture, preserving fixture
and Lasso checks unchanged. Mesh clone lazily initializes loose-element bookkeeping;
source invariance test compares actual vertices/faces/groups, not auxiliary caches.

Changed owners: edge-paint-select, Pencil gate, render-modes and new stroke controller;
reviewed direct/child/recovery keys986 and hashes. Existing authoring helper stays985.
Intermittent right-region rendering/gizmo fault remains OPEN; no rendering fix claimed.
DEVICE986: Face mode > VIEW Facegroups > name > Pencil facegroup strokes; draw across
faces, lift to see group. Multiple strokes, one Undo per stroke/Redo. Finger orbit,
Stop, choose another name/rearm, SaveOpen. Clear selected remains984 behavior. Next
follow device stroke acceptance before adding live previews, brush radius or eraser.

## .987 — Pencil facegroup eraser; .986 user PASS — 27 October 2026

User PASS986 protects Pencil assignment-on-lift, one-step history, cancellation,
Stop/navigation and group persistence. Add Erase group strokes beside the original
Pencil facegroup strokes button in VIEW > Facegroups. Same controller and SAME
existing gesture owner; explicit null group requests accepted Clear metadata path.
No second brush, pointer handler or history implementation. Eraser stages sampled
visible faces and clears on lift; untouched groups/geometry/UV/resources preserved.
Already-ungrouped strokes are no-ops without history. No typed name needed to erase.

Assign/Erase controls show independent pressed/Stop labels through one shared
sync function. Choosing the other mode cancels pending stroke and arms new mode;
clicking active mode stops. Name edits/pickup and switching render look stop both.
Controller reports clear/assign pending and completion distinctly; null group is
separate from armed state, so Stop cannot accidentally enable erasing. Existing
986 gesture/gate modules byte-unchanged; only stroke controller/render UI plus
reviewed child/render/recovery987 pins, shell markers/hashes change.

86 targeted checks PASS/0FAIL/0skip, including new eraser staging, untouched groups/
geometry, one checkpoint, no-op, cancel/switch/Stop tests; retained actual986
Pencil/selection owner integration, existing Lasso/Pencil/picking,984/985 metadata,
Facegroups/toolbar/project/UV/release tests. Syntax/diff checks pass. No native/full
suite proof claimed. Intermittent rendering/gizmo loss remains OPEN, not repaired.
DEVICE987: group faces, arm Erase group strokes, draw and lift; only sampled faces
become ungrouped. UndoRedo once per stroke; erase ungrouped face adds no Undo. Switch
back to named Pencil strokes; stop and navigate. Save/Open retains groups. Next
follow device eraser acceptance before live feedback/radius work.

## .988 — explicit existing-group selector; .987 rendering recurrence — 27 October 2026

User reports entire VIEW menu temporarily vanished (not reproducible now), following
987 lower-right blank area/report and screenshot. No987 PASS inferred. Protect986
strokes and985/984 accepted workflows; rendering issue OPEN. Evidence summarized
in docs/ui-right-region-987.md, including limits of healthy DOM/hits and hidden
gizmo in this specific capture. Do not claim Studio-only cause or UI repair.

Independent actionable user failure: group list DOES NOT OPEN. Audit original
985 name input+datalist: name suggestions are not an explicit dropdown. Replace
with separate native Existing group select (same names from authoritative live
mesh) and keep original editable Group input for new names. No custom popup or new
pointer owner. Native select options have safe value/textContent, unique sorted
names and empty-state prompt. Refresh on VIEW toggle, Facegroups UI sync and after
assignment/clear, retaining current name when it exists. Choice copies name into
original input and dispatches its accepted input event, stopping previous armed
strokes/eraser; no mesh/selection/history change until actual assignment/stroke.
This is a group-selector fix, not a viewport/compositor repair.

Changed functionality ONLY render-modes UI; reviewed render/recovery988 pins and
release markers/hashes. Gesture/gate/stroke/authoring/UV/geometry/Multi owners
unchanged.88 targeted checks PASS/0FAIL/0skip: new actual picker population/change
callbacks, fresh/empty/unsafe-text cases, plus retained metadata/stroke/eraser,
Pencil/Lasso/picking,toolbar,project,UV and release tests. Syntax/diff checks pass.
Native iPad select opening needs hands-on review; no full-suite/rendered proof claimed.
DEVICE988: Face mode > VIEW Facegroups > Existing group opens real native list;
choose group, select more faces and Assign selected. Type another name to create
group, reopen VIEW and confirm listed; UndoRedo changes assignments only. Retest
erase and Save/Open if convenient. If VIEW blanks again, note scroll behavior and
whether explicit File Refresh display restores; no repeated debug dump required.
Next native selector/eraser feedback; broader rendering diagnosis remains separate.

## .989 — VIEW open/panel/scroll evidence; .988 user PASS — 27 October 2026

User PASS988 protects real Existing group dropdown, assignment reuse and existing
name/stroke/eraser workflows; functional acceptance does not close recurring VIEW
rendering issue. Latest988 dump00:41:42Z proves Pencil down/up/click reaches VIEW
summary without preventDefault, with same healthy1366x886/DPR2 layout and no UV
top layer. It omits native details.open, panel rect/scroll and mode, so cannot tell
closed menu from an open but unpainted panel. Do not request another identical dump
or claim engine cause; same existing opt-in debug owner gains missing evidence.

Snapshot now includes viewMenu: native open state (null if missing), actual active
render button, selection mode, facegroup stroke armed/contact/assign-or-erase,
group-picker option count/index/disabled (not group names), VIEW panel and selected
facegroup-control bounds/visibility/overflow/scrollTop/scrollHeight/clientHeight,
plus Studio overlay style including mixBlendMode. Existing control/DOM evidence
retained. Native toggle captures final open state; panel scroll captures its current
position. Both passive window-capture observers measure ONLY when debug enabled,
append to existing bounded100-event buffer, never consume input, focus/open/scroll
menus or invoke refresh. No polling, new popup or automatic repaint.

Changed runtime ONLY gesture-debug; original source debug/recovery989 keys and
release markers/reviewed hash. All rendering/CSS/VIEW/native selector/brush/history/
modelling/Multi implementations unchanged. This is DIAGNOSTIC, not a rendering fix.
29 focused checks PASS/0FAIL/0skip: new actual whole-debug report/observer tests
(open/closed/missing, geometry/scroll, modes/picker, read-only/debug-off refusal),
original probe/recovery/debug/release and984–988 authoring/stroke/selector tests.
Syntax/diff checks pass; no native/full-suite or permanent repair proof claimed.

DEVICE989: normal VIEW and Existing group remain accepted. If menu disappears or
blanks, File > UI Debug > try VIEW once > Capture/Copy before Refresh display or
app-switch. New viewMenu.open and panel nodes now separate native state from paint.
Try scroll inside panel if possible, capture again only if changed. If fault does
not recur, no forced reproduction required. Next native evidence; feature trajectory
can resume after feedback while retaining this open rendering gate.

## .990 — explicit closed VIEW surface removal — 27 October 2026

User /nextbuild after two989 captures. At00:58:35Z canvasProbehiddenTRUE and two
subjective rightUI:missing observations; at00:58:50Z canvas restored/hiddenFALSE.
Both Studio/Face, no brush/session/UV workspace, native VIEW openFALSE, yet fixed
panel rect982/114.5/360/756, scrollHeight/clientHeight754. No VIEW down/toggle in
recorded interval: these do not diagnose an attempted open panel. Hiding3D no longer
restored UI in this recurrence; do not repeat old canvas-only recovery guarantee.
Computed layout/healthy hits are not proof of drawn pixels or engine root cause.

Audit original view-modes: fixed overflowing panel relies entirely on native
closed-details content suppression; no explicit closed display rule. Add scoped
#viewModes:not([open]) > .viewport-menu-panel {display:none!important} in original
early toolbar stylesheet AND original view-modes style fallback. Thus closed VIEW
has zero panel layout/scrolling surface before hydration and after all native or
programmatic closes. Opening removes ONLY this closed-state rule and uses original
fixed panel/scroll/settings. Native details.open remains sole state owner; original
nodes/listeners/control identity preserved. No JS toggle, reparent, extra menu, timer,
refresh/blink, renderer/CSS-blend change or raw-pointer owner.

This is a narrow closed-surface lifecycle hardening, NOT proof the nonzero closed
box caused every right-region fault, or a guaranteed permanent compositor repair.
Open-panel clipping/whole viewport rendering gate remains OPEN until native feedback.
989 diagnostics retained. Only early toolbar CSS and original VIEW style function
change; reviewed shell/VIEW/CSS/recovery990 pins/hashes. All geometry/brush/UV/Multi
implementations unchanged. No989 PASS inferred from debug reports.988 acceptance
retained.32 focused PASS/0FAIL/0skip: original startup toolbar/hydration/action
identity, release, report/probe/recovery and984–988 authorship/stroke/selector.
Syntax/diff pass; no native/rendered/full-suite proof claimed.
DEVICE990: fresh reload, VIEW open/close several times; scroll and group picker.
Closed VIEW debug panel rect should be zero/displaynone; open must show original
settings. Watch right toolbar/footer/gizmo if visible, without forced reproduction.
If recurrence, existing989 report plus visible symptom; no repeated hide/show needed.
Next actual990 native feedback before speculative layer changes.

## .991 — compact left facegroup paint dock; .990 user PASS — 27 October 2026

User PASS990 protects explicit closed VIEW surface and original open/scroll/picker
behavior; continue watching intermittent rendering rather than claiming engine root
cause. User asks better facegroup painting UI/UX. Audit accepted authoring/stroke/
VIEW/session/position owners on baseline990. Existing controls lived inside VIEW
and stopped brush whenever revisited, requiring repeated menu cycling.

VIEW > Facegroups now offers Open facegroup paint controls. Opens compact290px
left dock8px from viewport top/left using ORIGINAL compact panel position helper;
paints default current group and invokes ORIGINAL Face mode button if needed.
Existing name input/native Existing group picker, Paint/Erase and selected-face
commands are SAME DOM nodes reparented from hidden home in VIEW, not cloned/proxied.
Palette/colour appearance stays in VIEW. Name and Existing group sit above two
clear pressed Paint/Erase mode buttons; advanced Assign/Clear/Use selected commands
collapse under Selected faces. Done is always at dock header; stops brush and parks
original controls back in hidden home, dock displaynone. Facegroups look remains
so user can inspect painted groups. No need to reopen VIEW between strokes/tools.

Paint/Erase now persistent radio-style choices; Done exits. Existing group choice
or completed name edit arms chosen named paint while dock open; typing pauses old
brush until change/commit. Use selected group name also rearms named Paint in dock.
Picker refreshes on focus and existing VIEW/assignment routes. Original stroke-on-
lift, unique-face staging, one-step history/cancel/resource owners unchanged. No
new raw-pointer/paint/history owner or UV requirement. Shared placement helper used
compact with explicit Paint-left exception; no new filter/contain/layer/repaint hint.
Dock closes on render-look change, non-Face mode click (read-only capture), or start
of another original tool session. Opening refuses a current session rather than
abandoning its preview. Scene/selection/history unaffected by dock close.

Runtime changes only original render UI and small reparenting dock helper; original
stroke/gate/geometry/UV/main/Multi/990 VIEW implementations byte-unchanged. Reviewed
render/new-child/recovery991 pins and hashes. Picker test now queries document IDs
for original controls after relocation, preserving its choice/input assertions.
91 targeted PASS/0FAIL/0skip: new actual dock lifecycle/value/listener identity over
12 reopen cycles, Done/unavailable parent, actual command routing/persistent modes/
active-tool refusal; retained picker/stroke/eraser/metadata, native selection/Pencil/
Lasso/picking,toolbar/project/UV/release. Syntax/diff checks pass. No native/rendered/
full-suite proof claimed. Native dock spacing and typing/dropdown usability pending.

DEVICE991: VIEW Facegroups > Open facegroup paint controls; verify left dock and
automatic Face mode, close VIEW. Select group or type a name, Pencil stroke/lift;
Paint/Erase without reopening VIEW. Selected faces advanced commands; UndoRedo.
Done hides dock/stops brush, fingers navigate; reopen retains name; Save/Open.
Next native UX feedback before extra cursor/radius/live colour feedback.

## .991 right-region recurrence — 27 October 2026, 04:01:19Z

User explicitly reports right-hand issue AGAIN on991. Do not treat990 functional
PASS as permanent rendering acceptance; retain closed-panel lifecycle protection
while reopening broad visibility gate.991 dock UX has NOT received user PASS.
Supplied report: Facegroups/Face, no active stroke/session/texture Paint; canvas
visible2732x1652, viewport1366x886/DPR2. Studio overlay opacity0. VIEW native
toggle evidence at28391/29205/30086/31107 shows open true/false/true/false. Open
panel rect998/66/360/811.984, scrollHeight980/clientHeight810; closed displaynone
and zero rect. Thus native input and990 closed-surface removal work, but do NOT
eliminate user's visual loss. Do not repeat native-toggle failure or retained closed
VIEW panel as explanation for this capture. Transparent Studio layer remains in
DOM; opacity0 weakens visible-vignette explanation without proving engine cause.
Controls/DOM/hits healthy is not pixel evidence. Gizmo explicitly hidden here.

In991 authoring nodes are parked in hidden home until Open facegroup paint controls.
Their zero bounds even while VIEW open are EXPECTED; palette appearance controls
remain in VIEW. Debug's groupPicker optionCount1 can simply mean empty named-group
list plus placeholder. Do not infer selector regression or missing authoring nodes.
Current debug does not sample new dock root. Source/UX991 remains pending device
acceptance. Runtime remains991; no speculative rendering changes in this update.
Live version/index/render-modes/dock byte-match verified;91 focused tests were
validated before publication. Next test new left dock and compare its visibility
with affected right region if recurrence persists; no repeated Hide3D/toggle dumps
needed. Root cause remains unconfirmed.

## .992 — facegroup colour/name list; .991 user PASS — 27 October 2026

User confirms991 paint controls work great after refresh and explicitly PASS991.
Protect compact left dock, original controls, persistent Paint/Erase, Done and stroke
history/navigation. Screenshot D8EC492A shows right VIEW border/background with
blank interior before refresh; keep intermittent rendering gate OPEN independently.

992 replaces Existing group native dropdown with a bounded200px layer-style list:
one tap target per named group, colour swatch + safe text name, selected-row highlight.
Name field still creates new groups; choosing a row reuses original input and arms
original Paint mode. Rows are presentation only, no mesh/history/material mutation.
Shared faceGroupPalette exposes EXACT existing viewport mesh-order/golden-ratio
colour map; both renderer and list use it. Palette/reseed/lightness/saturation update
swatches, original rendering algorithm unchanged. Rows keep node/focus identity on
selection/colour refresh; group membership rebuilds layout only when changed.
Refresh current mesh on open, name/edit/selection, palette changes and queued original
body rebuilds (stroke commit, active object switch, UndoRedo); no polling/new pointer
owner. Names are textContent, never HTML. Empty list explains name + paint workflow.
Legacy988 picker tests migrate to new list adapter preserving current-mesh/name/no
mutation coverage; new renderer tests cover selection/identity/empty/text safety,
original brush callback and swatch-to-render-attribute parity across all4 palettes.
Stroke987/authoring985/dock991/UV/Paint/main/Multi1.0 and990 VIEW rule unchanged.
Validation:93 targeted PASS/0FAIL/0skip; syntax and diff checks pass. Reviewed
changed render/core/new-list and shell/recovery cache keys; no full-suite/native
rendering proof claimed. The prior985 safe-text assertion now targets list labels
instead of native option implementation.992 awaits iPad list acceptance.

Future user goal: Facegroup boundaries define UV island seams, then group-targeted
image/PBR assignment. Audit original UV atlas/seam/stitch and paint mask/material
owners first. First likely route shared atlas with per-group masks/baking; separate
material slots require renderer/save/OBJ/GLB/NOM audit. This build DOES NOT implement
unwrap-by-groups or per-group materials, and must not imply they exist. Same-name
disconnected face patches may yield multiple islands; geometry stays welded.

DEVICE992: open Facegroups paint dock; paint2+ group names, inspect swatch/name rows.
Tap rows and paint/erase; selected name/highlight and UndoRedo refresh list. Adjust
VIEW palette/reseed and reopen dock: swatches follow viewport base colours (lighting
can shade model). Long names/many groups stay compact; Done/finger navigation.

## .993 — Face Apply Exact native-pointer capture repair — 27 October 2026

User reports Apply Extrude Exact does not work and traps the user in Extrude.
Audited current main5967db29/build992, original Face popup/precision/direct controller,
Pencil gate and Through fallback. No new geometry, history or gesture owner needed.
Confirmed regression: numeric Exact dispatches reserved synthetic pointer9876, but
original pointerdown AND beginDirectDrag call native setPointerCapture for it. Browsers
reject this nonexistent native pointer with NotFoundError. EventTarget reports handler
exceptions and continues dispatch; begin had already set drag, leaving pending press
alive too. Pointerup clears pending press first, leaving drag set; popup then disables
Exact/input/Done indefinitely. Earlier tests used a no-op capture stub and missed it.

Only runtime change: original multi-face-direct capture helper skips reserved numeric
pointer9876 at all three existing capture sites. Physical contacts retain native capture,
original window-capture completion, deliberate-drag threshold, selection, inference,
geometry/topology/refusal/Through safety and history. Exact still runs original
controller and semantic commit acknowledgement; no new numeric modelling kernel.
Popup and precision code unchanged. Shell/direct/recovery keys993 reviewed; no dynamic
child changes. Protected Multi1.0, main, accepted icons/Facegroup/Paint/UV/frozen unchanged.

Test helper now optionally models browser capture rejection and EventTarget exception
continuation; default fixtures still throw unexpected listener failures. Before runtime
repair, new tests reproduced false Exact success result and stranded dragging state.
After repair: repeated Extrude/Inset Exact, safe refusal then valid retry, no synthetic
capture/no listener errors/no pending drag, actual popup Apply/Done lifecycle, one history
step per success and UndoRedo pass. Physical capture/commit/cancel retained. Final191
focused PASS/0FAIL/0skip (~5.2s), including original Face/repeat/popup/camera/Through/
negative-extrude/release tests; syntax/diff checks pass. No full-suite or native proof claimed.

Separate992 rendering recurrence at05:39:15Z: user observed rightUI missing with canvas
hidden at47438, then restored canvas50523. Native VIEW open34532 had bounds998/66/360/
811.984 and980px scroll content; closed panel is displaynone/zero bounds. Toolbar layout/
hits healthy; gizmo present196x196 at752.75/443.234. Studio overlay opacity0. Group-list
optionCount/selectedIndex null is expected for992 DIV list, not a native-select failure.
No actual screenshot/affected region identified in this report; do not infer a new
rendering cause or guaranteed Hide3D recovery. Intermittent right-region visibility
remains OPEN; no rendering changes in993.992 list device acceptance still pending;
991 PASS retained. Facegroup-seam UV/material work remains future, not shipped.

DEVICE993: confirm993; select cube face, Extrude, enter0.2 (or convenient model units),
Apply Exact twice; both operations commit and Done exits. UndoRedo each step. Reopen
and try a valid negative recess; a refused value must still allow Done and later retry.
Ordinary Pencil drag then Done; Inset Exact sanity check. Watch existing right-region
fault separately. Next obtain device Exact/exit feedback before feature expansion.

### .993 publication status

Runtime/tested local commit b9fed522f95ae61fe82d58f912706acca194f8db, tree
bd178a99b8bac3b0a4947e070cde16edcf84aed8. All191 focused tests pass. Push was
blocked twice by automatic approval review. Live992/main5967db29 remains the last
verified publication; do not describe993 as shipped or ask for device993 tests yet.
Review rejected standing authorization in retrieved AI_WORKFLOW.md as insufficient
end-user authorization in this transcript. Await explicit user confirmation to push
and publish993 to main; do not bypass rejection with connector or alternate transport.
After approval push pending local commits, fetch main, verify release/pins and live
bytes, then give DEVICE993 checks. No runtime edits after validation.

## .994 — distinct native NOM facegroup colours — 27 October 2026

User reports six exported groups arrive in Nomad as near-identical colour pairs.
Audit found native NOM meshPart cycles the donor template's THREE group colours;
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
