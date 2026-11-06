Warning: truncated output (original token count: 151046)
Total output lines: 7692

# Current build — .1087 imported NOM/GLB UV Paint — 6 November 2026

`.1087` connects the existing viewport painter and paint resource owner to imported NOM/GLB meshes with complete UVs in the 0–1 tile, a single solid material and no embedded images. The existing source payload is kept; a new colour paint base starts with the imported material’s solid colour. Paint binding, undo/history and `.boxlab` Save/Open remain owned by the original systems. Imported image textures, multiple materials, vertex colours, tangent maps, morph targets, out-of-tile UVs and targets above 20,000 corners remain safely refused. This is the first imported-paint stage, not completion of textured NOM/GLB painting.

Focused `.1087` imported-Paint tests pass 3/3; nearby Paint/project/export/NOM-retention tests pass 24/24. Full local Node regression passes 3,171/3,171 (0 failures; 146.4 s). `git diff --check` passes. Publication and live Pages byte verification are recorded in `DEV_HISTORY.md` after deployment. Native iPad/Safari acceptance is pending.

GLB opacity uses the existing paint snapshot/export owners, original UV binding, and base-colour RGBA with glTF `BLEND` and double-sided materials. Opacity-only maps use white RGB. NOMAD and OBJ retain their explicit opacity-export refusals. `.1085` clean Pencil onset and Done/reopen/redraw smoke are also protected, as are `.1077` multi-channel Paint, `.1076` two-sided preview, `.1075` opacity authoring, and `.1074` brush pressure controls.

## Current next step — finish imported textured NOM/GLB painting

The user put imported NOM/GLB UV painting ahead of WASM. `.1087` only accepts textureless single-material imports; embedded source images and multi-material meshes remain protected. Next, extend existing import/paint owners to compose authored paint with eligible source base-colour images while preserving the original image bytes, UV transforms and material appearance. Audit source texture channels and material assignment before expanding eligibility. Do not start WASM until textured NOM/GLB paint passes native checks.

After that gate, begin the measured WASM feasibility audit: benchmark existing JavaScript owners with repeatable workloads and define pass thresholds before any A/B prototype. Keep the JavaScript owner as fallback; require output equivalence and a measured speed gain. Test memory separately before claiming larger-mesh capacity. Never add a duplicate modelling kernel.

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

# BoxLab current handoff — build .1062

## .1062 — native edge picking inside edge tools — 2 November 2026

User .1061 PASS protects right Layers dock and object-following Paint palette, plus accepted Paint and UV help. New request: SELECT EDGE → SPLIT → SELECT EDGE still misses convex edges; audit other tool-then-edge actions for the general selection fix.

Audit confirmed .954 main edge-screen-picking ranks rendered cage lines by CSS-pixel proximity, then depth; Split and direct Bevel still used world-radius raycast depth ordering. Edge Extrude had the same old picker; Edge Slide and Offset Loop tested selected proxies in selection-list order. Those existing owners now prefer __boxlabSelectionBridge.pick('edge',event), including native misses; selected-edge drag starts require the native winning edge to belong to the selection. Existing world-radius fallback remains only when no native bridge picker is available (standalone/bootstrap compatibility). No new picker/kernel, threshold, gesture or history owner. Loop Cut already uses main's native picker; Edge paint and component-toggle already share it; Sweep Follow Edges and Add Vertex use screen-distance snapping for their distinct cross-object/point payloads, so no equivalent world-depth picker was replaced there. One-shot Rotate/Collapse act on preselection. Legacy edge-toggle-repair is not loaded.

Offset Loop had two module URLs (drawer .671 and loose-bootstrap .0.32.19). Both now resolve the same .1062 URL so UI listeners/module execute once. Refreshed the bootstrap→uniform-inset→multi-face-direct cache chain only; modelling logic and protected Multi1.0 remain unchanged. Split's retained fixed old cache assertion now checks its reviewed runtime asset reference.

Regression executes each actual tool picker on the supplied .954 convex OBJ (twelve previously depth-stolen midpoints) at 0.1/1/10 scales, verifies native misses and rejects neighbouring unselected edge steals. Actual Split button→two native edge taps commits exactly one canonical insertFaceSegment split and preserves exact History Undo/Redo snapshots. Final focused run: 115 PASS / 0 FAIL across tool/native convex picking, Split transaction, tool eligibility/session behavior, cache/release wiring, UV help and protected Paint layout/contact. Hosted Topology `41422973800` passed 3,106 / 3,106. Pages `41422972772` succeeded; live `.1062` marker, shell and all five repaired tool modules match the release commit. Device acceptance pending for convex Split taps, other edge-tool targeting, Undo/Redo/exit/navigation and accepted Paint layout. Device: Split two opposite convex-face edges, repeat after orbit/zoom; Bevel/Edge Slide/Offset Loop and boundary Edge Extrude pick the edge under the Pencil; Undo/Redo, Done/background exit and navigation; quick accepted Paint layout smoke. Keep eligibility/face adjacency/boundary checks intact.

# BoxLab current handoff — build .1061

## .1061 — right Paint layers and object-following palette — 2 November 2026

User .1060 PASS protects UV help/Projection help, accepted Paint .1059 and .1057 camera/Done-reentry behavior. New user request (annotated screenshot): Layers on the right like the object menu; open Paint radial clear of the object and follow it like the gizmo.

Audit: one tool-session-ui Paint dock owns original panel/layers/footer; viewport-paint owns palette, drag handle and frame loop. Existing gizmo projection patterns use the editor camera but no reusable object-bounds layout helper exists. Move the existing Paint-only dock to right:8px/left:auto; other session placement/restoration stays authoritative. Add presentation-only paint-palette-layout helper: cache editable mesh bounds once at Paint open, project eight corners through the authoritative camera, prefer placement to the left, choose another side to avoid model/right panel/selection controls when space allows, clamp to viewport when cramped. Reuse Paint's frame loop for view-following; keep a dragged palette offset relative to the object. Recompute placement for wheel/material/control sizes; freeze auto-placement during live strokes/drag and focused native material-input editing; new Paint session resets safe placement. No new frame loop, gesture owner, modelling kernel, pivot or history owner. Model itself is never moved by placement.

Final focused run: 94 PASS / 0 FAIL across Paint layout/contact/material workflow, right dock, object radial, UV help and release/cache wiring. Real Three camera projection test covers pan/orbit/zoom, dock avoidance, bounds and no vertex mutation. Real Paint UI test covers frame following, manual offset, resize, Done/reopen and unchanged history/navigation state. Updated former left-dock assertions to explicit right-dock expectations requested by user; preserved footer/listeners/ordinary-session checks. Hosted Topology `41419359928` passed 3,103 / 3,103. Pages `41419359664` succeeded; live `.1061` marker, shell, viewport-paint.js, tool-session-ui.js and paint-palette-layout.js match the release tree. Device acceptance pending for right Layers dock, palette clearance/following, manual drag and accepted Paint workflow. Device: Layers at right; open Tools beside model; orbit/pan/zoom with menu visible; drag menu then move view; Material/Metalness continuous paint and Done/reopen; quick UV help smoke. On cramped screens placement minimizes overlap while keeping controls reachable.

# BoxLab current handoff — build .1060

## .1060 — touch-accessible UV help — 2 November 2026

User /nextbuild selects the queued UV help slice after .1059 device PASS. Audit found long gesture footer in uv-workspace.js and projection notes in mesh-health.js; no shared generic help owner exists. Use native details/summary disclosures in those original surfaces, with touch/keyboard activation and visible focus; no extra popup layer or gesture owner. UV help contains existing navigation/history instructions, dynamic Move/Scale/Rotate Pencil hint, map-reference and layout-action explanations. Escape closes help before exiting the editor; help closes on workspace exit and resets collapsed on entry. Projection help exposes method guidance previously in long notes/native titles. Base-only/replaces-UV/clear-paint warnings, 4096-face and 20,000-corner caps, curved-face stretching warning, clear-paint consequences, dynamic errors/status and action labels stay visible.

Original canvas/control ownership, header/Back to 3D, selection, UV transforms, Undo/Redo and Paint remain intact. Paint .1059 source and cache pin are unchanged; its device PASS and protected Multi1.0 remain protected. Focused run: 97 PASS / 0 FAIL, covering workspace help/Escape/close/reopen with unchanged view/history, UV transforms/navigation, atlas/projection, workspace layering, Paint contact/Material recovery and release/cache wiring. Hosted Topology `41387557443` passed 3,101 / 3,101. Corrected Pages `41387557387` succeeded; live `.1060` marker, index, UV workspace and Mesh Health match the release sources. Device acceptance pending for UV help, Projection help, return/reopen and accepted Paint smoke. Device: open UV Editor→expand UV help→switch Move/Scale/Rotate→close help→pan/pinch/UndoRedo→Back to 3D and reopen; UV or Mesh Health→Projection help while warnings remain visible. Then quick accepted Paint Material/Metalness smoke.

## .1059 device PASS — 2 November 2026

User confirms PASS after the Material colour-edit contact repair. Protect the tested Material→colour change→continuous Metalness paint, repeated strokes/colour changes without Done, and retained .1057 camera/gizmo/Done-re-entry behavior. .1058 remains a historical failed attempt, superseded by .1059. Runtime remains .1059; no new app build from this acceptance entry. Hosted regression: 3,100 PASS / 0 FAIL; published runtime cc84d1ed2d41a9d54c5aab0dd0af52de1d7d1c98.

User asks what is next, without /nextbuild. Recommended next narrow build follows the recorded .1043 queue: audit existing UV Editor and Mesh Health UV help, then move long gesture instructions into touch-accessible contextual help using existing owners. Keep action labels, errors, scope/cap warnings and Paint PASSes intact. Later resume the native NOM displacement payload/settings audit before any displacement preview, with performance benchmarks before heavy subdivision work. No new runtime implementation authorized by this status question alone.

# BoxLab current handoff — build .1059

## .1059 — Paint contact recovery after Material colour editing — 2 November 2026

User FAIL on .1058: still one dab followed by lock-up. Do not protect .1058 as accepted; its menu equivalence test was insufficient to cover native pointer delivery. .1057 camera/Done-re-entry PASS remains protected.

Audit of the existing viewport-paint pointer owner found: a retained contact causes all later pointerdown events to be swallowed; positive-pressure pen movement is rejected solely for buttons=0; intentional release clears contact only after calling releasePointerCapture; the native colour control can retain focus as the stroke begins. Repair within that owner: fresh Pencil down cancels an unfinished previous contact; clear stored contact before releasing capture; accept pressure-positive moves/coalesced samples even when buttons=0; blur focused palette input before beginning the stroke; capture the viewport before hiding the palette. Existing stroke cancellation, rollback, history, touch/palm and orbit owners retained.

Regression executes the UI with missed pointerup, synchronous lostpointercapture on intentional release, native-input blur callback and pressure-positive/buttons-zero coalesced movement. It verifies a moving trail exceeds a dab, repeated metallic strokes commit, controls restore and Paint remains active. These reproduce code-level failure cases, not a confirmed trace of iPad native colour-picker events. Final focused run: 66 PASS / 0 FAIL across pointer recovery, radial Material, Paint tools/channels, Pencil pressure, camera ownership, release contracts, comparison UI and shared bootstrap tests. Hosted Topology `41384738678` passed 3,100 / 3,100. Pages `41384738314` succeeded; live `.1059` marker, index and viewport-paint.js match the release source. Native iPad Material/colour-picker lock-up acceptance remains pending; .1058 was FAIL and .1057 camera/Done-re-entry PASS stays protected. Device check: radial Material→change colour→draw continuous strokes with Metalness; repeat colour changes without Done; then Done/reopen and gizmo/orbit.

# BoxLab current handoff — build .1058

## .1058 — radial Material uses the working Brush entry — 2 November 2026

User PASS protects .1057 editor-camera ownership repair, multi-channel Done/re-entry and aligned gizmo. New residual FAIL: opening Material from the Paint radial, changing colour then painting makes one blob and becomes unresponsive until Done/reopen. Selecting Brush before changing colour works. Audit: radial Material directly called showMaterialMenu, bypassing the Brush action change that clears image stage, cancels stroke/capture and synchronizes tool/fill state. Radial Material now calls the same selectPaintTool('paint') owner as Brush. Header Material still edits the current tool's material settings. No new Paint or navigation owner.

Regression executes the real UI: Fill→Material prepares Brush; Material cancels a stale active Pencil contact; colour edits plus two moving metallic strokes commit separately with controls restored and Paint active. Focused Paint/camera/release checks: 35 PASS; bootstrap/cache/release checks: 36 PASS after preserving the unchanged modelling bootstrap cache keys. Hosted Topology `41381820929` passed 3,098 / 3,098. Pages `41381821044` succeeded; live `.1058` marker, index and viewport-paint.js match the release source. Device acceptance pending for radial Material colour changes and repeated Metalness strokes. Device: radial Material→change colour→paint continuous strokes with Metalness, repeat; then check Brush, Done/reopen and gizmo. .1057 hosted Topology had 3,096 PASS / 1 FAIL from old .1056 visible comparison labels; .1058 aligns those visible labels with the actual release. Earlier device PASS is protected, not inferred from CI.

# BoxLab current handoff — build .1057

## .1057 — keep the editor camera authoritative — 2 November 2026

Repeated user FAIL: multi-channel Colour/Roughness/Metalness Paint → Done → re-enter displaces gizmo and turns paint contacts into orbit. Colour-only re-entry is protected PASS. Root cause found in `bridge-topology.js`: global PerspectiveCamera.updateProjectionMatrix observer overwrote bridge.camera for every perspective camera. Metallic PMREM generation constructs its own PerspectiveCamera, stealing the editor camera reference used by gizmo projection and painting raycasts. Main already publishes camera and OrbitControls together. Observer now accepts projection updates only from controls.object once controls exist; startup fallback remains. Existing modelling, Paint, PMREM and transform owners retained. The .1056 matrix refresh alone did not repair this camera identity fault.

Regression uses real Three.js perspective cameras across three reflection/clone cycles and confirms the bridge retains editor identity. Focused camera/release/bootstrap checks: 37 PASS; material painting/reflections/orbit checks: 15 PASS. Full local suite ended without a final summary after reporting one bootstrap cache-pin assertion; that pin was corrected and its focused tests rerun successfully. No full-suite PASS claimed; hosted regression and deployment pending. Protected Multi1.0 unchanged. Device acceptance pending: multi-channel paint → Done → reopen → paint; switch brushes and Pencil orbit; repeat three times; check Colour-only, previews and shadows.

# BoxLab current handoff — build .1056

User reports that during UV Paint testing, changing brushes and orbiting with Pencil can leave the Total Gizmo displaced far from the selected object. The issue has recurred while orbiting, so the failure is treated as a camera/gizmo synchronization problem, not a brush action moving the object. Existing owners were audited: `viewport-paint` changes tool state and ends strokes; `pencil-orbit-gate` owns Pencil routing; `total-gizmo` continuously projects the active selection. `.1056` refreshes the Three.js camera world matrix inside the gizmo frame owner immediately before projecting the anchor, so a separate orbit frame cannot leave it using the prior view matrix.

`.1056` updates the release markers and direct cache pins. Pages deployed `.1056`, but the first hosted Topology run failed: 33 legacy gizmo harness cases lacked the new camera method, and the release-version loader pin remained `.1055`. Both are corrected in the pending follow-up; await the rerun and live-byte check before device testing. No local tests were added or run. Do not claim the issue fixed until the iPad orbit check passes. Protect map preview/update PASSes, separate paint channels/toolbars, Smudge improvement and all earlier accepted Paint behavior. `src/multi-object-transform.js?v=0.36.1.0` remains protected and unchanged.

Standing BoxLab authorization: the user has authorized every development-stage push to `origin/main` and GitHub Pages publication. Do not ask again for routine BoxLab release publication; complete the required checks and verify the live release.

## .1056 hands-on device checks

1. Enter UV Paint, switch Brush → Eraser/Smudge → Brush, and paint after each change.
2. While Paint is active, orbit around the model with Pencil and confirm the gizmo stays anchored to the selected object throughout and after orbiting.
3. Press Done; confirm the complete Total Gizmo remains over the object and Move/Rotate/Scale work.
4. Recheck Roughness/Metalness previews and live updates; compare shadows on Metalness-only and Colour+Metalness surfaces.

---

## .1043 — contextual Paint help and app-wide copy audit — 31 October 2026

Current target: BoxLab 0.36.18.1043. User .1040 PASS protects textured SubD on
multiple NOM objects, visibility in Studio/Solid and existing VIEW/navigation. .1041
remains a synthetic displacement feasibility report only; actual NOM displacement data
and settings still need a source audit before any preview implementation.

.1042's draggable contextual Paint panel is preserved. .1043 removes repeated brush,
Fill, blur, roughness and metalness help lines from the quick panel and adds one small
“i” button with a touch-toggleable, tool/scope/channel-aware popover. Existing controls,
Paint state, Pencil ownership and history are reused. The File import note now accurately
states that NOM imports supported material maps. The app-wide copy audit found further
candidates in the UV Editor gesture footer, Mesh Health UV guidance, short modelling
session notes, and hover-only native title explanations. Keep destructive/reset warnings,
import/export outcomes, live validation/status, accessible control names and essential
scope/cap warnings visible. Native `title` alone is not usable on iPad; future help must
have an explicit touch and keyboard path.

Focused Paint/help, release-contract, release-owner and shell-comparison checks pass.
Full Node suite: 3,086 PASS / 0 FAIL / 0 skipped; changed JS syntax and `git diff --check`
pass. App changes are published on GitHub `main` at `3e3f8c95c3fd62400f0d1ccc22c514cad1977d49`;
Pages deployment succeeded (workflow 41246780287). Topology regression 41246780922 is
still running. Native iPad acceptance remains pending; see the top of TEST_CHECKLIST.md.
The complete release record is in DEV_HISTORY_1043.md; the full pre-existing DEV_HISTORY.md
was retained intact.

Next: obtain combined .1042/.1043 iPad results. On PASS, continue the app-wide help
migration in small slices, starting with UV Editor and Mesh Health UV panels; then resume
the NOM displacement payload/settings audit. Keep the existing 20,000-corner and image
budgets. Do not add another renderer or subdivision kernel. Protected
`src/multi-object-transform.js?v=0.36.1.0` remains unchanged.

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
source still required…101046 tokens truncated…ate pending.

## .933 publication verified — 21 October 2026 (Brisbane)

Runtime `284f292306c06a857ffc047bd5dd497370312337`, tested tree
`4209dda642676652b76feb89c3148ec55da2f9b2`, is published on main.
Connected Git Data uploaded19 exact local blobs; fetched main matches tested tree.
Local Node24 and hosted Node22 regression39510312183/job118929399272 both pass
**2,670 tests / 0 failures / 0 skipped**; complete hosted logs verified.
Pages39510311401/deploy118929589714 succeeded. All24 fresh checked live files
byte-match: shell/version, complete changed image/Blur reverse loader graph,
new shared graph/wrap chart, recovery, main/cage, protected Multi1.0 and retained
exporter/UV inspector/raster/image-source/recipe owners. Frozen builds untouched;
no assertions relaxed. All four continuity files updated.

Build933 complete and ready: +Image→On surface, place near cube edge, lift and orbit
to inspect continuation. Drag onto next face; rotate/scale, lift; try curved patch.
Apply→UndoRedo, SaveOpen retains exact result. Contact guide stays planar; wrapped
mesh preview updates on lift. Interactive chart remains transient; Edit image→
On surface repicks, as912. Curvature/large closed patches can stretch/reach boundary.
No device933 appearance/latency PASS inferred;932 Blur and929 alpha gates pending.
Next stronger Blur, image conversion/blur, Merge/Flatten, bounded resolution/layer
options; Smudge/AO/seam authoring remain queued. Reflection preview independent.
This proof changes documentation only; verified runtime remains byte-identical.

## .934 — Blur Amount; .933 user PASS — 21 October 2026 (Brisbane)

User933PASS protects image wrapping across cube edges/UV seams, Move/Rotate/Scale,
Apply/history/SaveOpen. Audit main6688de17/live933: original paint-core has fixed
centre4/cardinal1 one-pass blur, no stronger filter/slider owner. Extend original
raster only; no new brush, adjacency, input, history, resource or writer implementation.

Blur shows Amount1–32, default8. Amount repeats existing smoothing kernel over the
stroke-start snapshot; Opacity mixes filtered target with original; Size controls brush
footprint. Core filter.amount defaults1 (legacy calls/settings remain valid). Main
UI passes optional blurAmount; shared brush defaults/Lab saved settings/native schemas
unchanged. Existing original neighbour table handles connected faces/UV seams on every
pass; no atlas-neighbour reads or new topology plan. Writes still clip to picked face:
stroke both sides. One-pass exact accepted .931/.932 outputs retained; strong blur
uses premultiplied RGBA through all passes (raw masks/scalars remain independent).

Compute target once/contact, using two bounded Float64 RGBA buffers to avoid rounding
between passes; one target retained for contact. At512² each buffer8MiB,16MiB filtering
buffers total; target8MiB retained plus existing before/coverage/domain/pool resources.
Uniform sources shortcut; opacity0 skips filtering. Max32*512² texel visits, no
per-dab repeated filtering or unbounded feedback. Coverage remains max/contact;
lift/repeat for more. Finish/cancel/dispose drops target; validation precedes contact
state publication. Amount input cancels in-flight work and updates existing readout;
original Paint history reopen retains tool/amount. Current selected layer/channel only.
Image colour stays source-preserved/read-only pending explicit image conversion.

Five new regressions: analytical one/two/32-pass impulse and independent opacity;
alpha/raw scalar/domain/invalid/no-op/cancel; strong folded-seam sampling excludes
atlas decoy and far-face writes; actual UI low/high softness, amount-change rollback,
Paint UndoRedo and SaveOpen/exact native PNG; scalar/mask isolation/checkpoint refusal.
Focused26PASS incl .933 wrapping6 and Paint-history5; release5PASS; full below.
No old assertions relaxed. Complete changed raster/Lab/main reverse loader graph934;
accepted933 wrap/graph/export/UV inspector, main/cage/Multi/frozen bytes unchanged.
Device934 strength/first-contact latency pending; Node timings are not iPad evidence.
Read docs/paint-blur-amount-934.md. Reflection preview independently unresolved.
Next image-to-paint conversion/blur, then Merge Down/Flatten, staged resolutions/layer
budgets; Smudge/AO/edge-seam authoring queued. Current512²/1024²/256²/base+3 unchanged.

.934 final local Node24.19.0 regression: **2,675 PASS / 0 FAIL / 0 skipped**.
Focused26PASS + release5PASS; no existing assertions relaxed. Hosted/Pages/live
verification follows; actual iPad934 strength/latency gate pending.

## .934 publication closed; user PASS — 21 October 2026 (Brisbane)

Runtimebc84450ce760a54424938e0f2548d05eca0aaf1e, tested treee59b2bac3b9c531a815403f6bab1816d9e3a04ae,
published. Hosted Node22 regression39512294347/job118936016708 logs confirm2675PASS/
0FAIL/0skip, matching recorded local Node24 run. Pages39512293048/deploy118936225379
succeeded. Live934 manifest and all27 checked runtime/protected files byte-match the
published934 source (git-show snapshot used while935 working tree was dirty). User
PASS934 protects dedicated Blur Amount1–32/default8, independent Opacity/Size, retained
Paint history and earlier933 image wrapping. Prior interrupted publication proof is now
closed; no new934 runtime changes. Alpha929 acceptance remains independently pending.

## .935 — Image to paint conversion; .934 PASS — 21 October 2026 (Brisbane)

Audit mainbc84450c/live934: source-preserved image cache and explicit paired replacement
exist; no raster conversion. Extend original paint-layer-stack with explicit
rasterizeImagePaintLayer: validated owned snapshot, same stack/version/order/ID/name/
visibility/opacity/blend/mask/pixels; ONLY selected image recipe becomes null. Existing
compositor verifies identical appearance, including every supported blend and inverted
mask. No implicit compositing into base, extra layer, resampling, new writer/schema,
brush, history, modelling or UV owner. Existing three-overlay/512² limits unchanged.

Image-only Convert to paint button uses original layerAction/scene checkpoint/preflight/
COW owner. Conversion selects Colour even when image mask was selected; Brush, Eraser,
Fill and Blur then use original raster and accepted934 Amount. Other image layers keep
source editing. Same pixels include933 wrapped placement. Edit image button disappears
by original state when no recipe; name/slot retained. Undo restores retained source and
placement editing, Redo restores raster conversion. After Save/Open converted layer is
ordinary editable pixels; source recipe isn't serialized for that layer. Other objects
sharing old resource and original saved image sources remain unchanged. Source release
reduces committed resource bytes; Undo may still retain it in bounded scene history.

Block conversion while staged image placement exists, keeping candidate/committed work
intact; Apply/Cancel first. Missing/nonimage/scalar/stale target/checkpoint/pool errors
leave committed resources/history untouched. Read-only image message keeps accepted
'Image colour is retained' prefix and points to conversion. UI return/result reused for
accurate success status, no separate input/listener/history system. Current Paint stays.

Five new tests: all-blend/mask exact appearance and owned buffers/byte accounting;
actual wrapped image UI→convert→strong Blur→Paint UndoRedo→SaveOpen→exact native PNG;
mask→Colour and Brush/Eraser/full-stack/other-image/scalar behavior; staged/missing/stale/
checkpoint/pool refusal; staged UI edit/cancel guard. Nearby908/933/934 and release5
remain active; full/publication below. Complete changed stack/resource/project/export/
Lab/main reverse loader graph935; functional change confined to original3 owners.
Accepted raster934, wrap933/UV/mesh kernels/main/cage/Multi/frozen bytes unchanged.
Read docs/paint-image-rasterize-935.md. Device935 conversion/blur/Undo feel pending.
Next Merge Down/Flatten through existing compositor to free slots, then staged texture/
source/alpha resolution and layer budgets. Smudge/AO/UV edge-seam authoring queued;
reflection preview independently unresolved. Current512²/1024²/256²/base+3 retained.

.935 final local Node24.19.0 regression: **2,680 PASS / 0 FAIL / 0 skipped**.
Focused29PASS (new5, image908 eight, wrap933 six, Amount934 five, release5); no
existing assertions relaxed. Hosted/Pages/live publication verification follows.

## Permanent completion-instruction audit — 21 October 2026

User repeated PASS /nextbuild while935 publication was pending and asked to audit
manual-test instructions. AI_WORKFLOW already explicitly requires readiness/build
number and3–6 quick device checks; AI_HANDOFF also contained the19 October reminder
inside an older entry. Promoted the same rule to the TOP of AI_HANDOFF as a permanent
section. It applies every build, including an explicit no-new-test statement when
appropriate; never end with only progress. No runtime change in this audit. Current
next build remains935 (published main was934 when PASS arrived); finish935 and its
hands-on image conversion/Blur/Undo/SaveOpen list before declaring it ready.

## .935 publication verified — 21 October 2026 (Brisbane)

Runtime `44c4eccf036fd7fa1d61bbee4802a506166c49b3`, published tree
`f3749803243107a097ecb798c56edb0ec73a1903`, matches local main exactly.
Original local tested treeac566305 had identical runtime; only four continuity files
changed to promote the permanent completion rule before publication. Git Data tree
verified with all28 blobs. Local Node24 and hosted Node22 regression39586601556/
job119176937360 both pass **2,680 tests / 0 failures / 0 skipped**; full hosted logs
verified. Pages39586601079/deploy119177154130 succeeded. All37 fresh checked live
files byte-match: shell/version, complete changed resource/project/export/Lab/paint
loader graph and retained raster934, wrap933, UV inspector, main/cage/Multi1.0/recovery/
image-source owners. Frozen builds untouched; no assertions relaxed.

Handoff audit complete: permanent readiness/build/manual-test rule was already in
AI_WORKFLOW and an older AI_HANDOFF entry; now prominently at TOP of AI_HANDOFF.
Every finished build must give its readiness, build number and short device tests,
or explicitly say no new test is needed. Never end with progress alone.
All four continuity files current. This proof changes documentation only.

Build935 complete and ready: applied image layer→Convert to paint, appearance kept;
Blur Amount/Brush/Eraser edits pixels; Undo edits and conversion restores Edit image;
Redo then SaveOpen retains editable paint. Source recipe belongs to old Undo resource,
not the converted saved layer; masks/blends/other image layers remain independent.
User934PASS protected; actual935 appearance/feel gate pending. Next Merge Down/Flatten
to free slots, then staged resolution/layer budgets; Smudge/AO/seam authoring queued.
Reflection preview remains independent; alpha929 device gate not inferred.

.936 final local Node24.19.0 regression: **2,687 PASS / 0 FAIL / 0 skipped**.
Seven new resolution integrations plus every original test pass unchanged. Reviewed
release/cache contract5PASS, original902 size513 refusal retained. Initial exploratory
run admitted intermediate sizes; original guard now only adds exact1024² above512.
GLB fixture follows actual primitive material ID; no production writer workaround.
All four continuity files current. Publication/hosted/live verification follows;
actual .936 iPad sharpness, brush/Blur latency and memory acceptance remain pending.

## .936 publication verified — 21 October 2026 (Brisbane)

Runtime `dd313a08a0163ea16ca86034b607553bff06e635`, tested tree
`80165089f0ecde310eede444f7ebd972ffcf90d0`, is published on main. Connected Git
Data uploaded31 exact blobs and created the identical tested tree; fetched main
matched and local branch was aligned without file changes. Local Node24 and hosted
Node22 regression39593356534/job119199545040 both pass **2,687 tests / 0 failures /
0 skipped**; complete hosted logs verified. Pages39593355281/deploy119199756737
succeeded. All31 checked runtime/Lab/shell/recovery/protected files byte-match.
Initial fetch began during rollout and returned six .935 ancestors; fresh postdeploy
rechecks closed all six. No frozen/main/cage/Multi edits. Eleven functional owners;
eleven reverse-graph parent files contain cache-reference changes only.

All four continuity files current. Proof is documentation-only, same runtime bytes.
User .935 PASS protects conversion/Blur/edit/history/persistence; .936 device detail/
latency/memory gate remains pending. Ready: Paint → Texture resolution → Increase
to1024×1024; fresh strokes/new image placement, Undo512/Redo1024, SaveOpen and NOMAD.
Existing pixels enlarge exactly; re-place retained sources for fresh image detail.
Independent512 scalars/source1024/alpha256/base+three limits retained. Next resolution
feedback then Merge Down/Flatten; larger sources/maps/layers remain staged.

.937 File-size follow-through: actual fresh1024 three-layer duplicate exceeded the
old32MiB JSON file cap despite valid resource quotas. Original object-management
Save/Open now permits96MiB ONLY for validated layeredv2/v3 colour1024² projects;
legacy/ordinary projects retain32MiB. Open rejects>96MiB before reading; files32–96
are parsed/staged, decoded with original strict resource/geometry guards, then must
qualify BEFORE confirmation or scene/history replacement. Save qualifies only after
original exact roundtrip validation. Original quota/predecode/canonical/ref rules,
native24MiB cap, confirmation and failed-Open rollback remain. Raw JSON parsing is
now bounded96MiB (not a total browser-memory guarantee). Three-layer512 duplicate
regressions explicitly seed a legacy512 base to retain their8/16MiB assertions. A new
actual1024 three-layer duplicate test verifies real Save/Open>32MiB, exact pixels,
96MiB pre-read refusal, legacy32MiB rejection and unchanged scene/history on errors.
No blanket file-limit increase for ordinary projects or invented schema fields.

.937 final local validation: complete2,691-check run passed2,690; the new high-res
File test had already saved/reopened exact pixels, then a test-only cross-realm
empty-array comparator failed. Replaced that comparator with original history length/
identity checks, retaining every assertion. Corrected focused high-res test now1PASS
(69s), including actual>32MiB Save/Open,96MiB pre-read bound,32MiB legacy eligibility
and unchanged scene/history on failures. No runtime failure remains from that run.
New default+legacy resolution10PASS, nearby scalar/alpha16PASS; final release/cache
contract5PASS after completing drawer-ui parent pin. No protected/frozen changes.
Hosted full-suite rerun and publication/live evidence follow; device sharpness pending.

## .937 publication verified — 22 October 2026 (Brisbane)

Runtime `1bbb4d6d2620d6ff801259c02fe61c6df90fc9d5`, tree
`3bbfe418d10a633e66f4580091f5f4f94f958edd`, is published. Connected Git Data
uploaded18 exact local blobs/tree; fetched main matches local tested tree. Hosted
Node22 regression39694120390/job119547225819 passes **2,691 tests / 0 failures /
0 skipped**; complete job logs verify totals, including corrected high-res File test.
Local complete run covered2,690 passing checks; corrected File case separately passed,
and the hosted rerun closes the full final-tree proof. Pages39694119853 succeeded.
All19 checked live shell/runtime/parent/recovery and retained paint/source/project/
native-export/Multi files byte-match. Main/Multi/frozen bytes unchanged.

This proof changes documentation only. User .935 PASS protected; .936 pixelation
report remains a device issue awaiting .937 confirmation, not an inferred PASS.
Ready for new cube → Paint showing Colour texture1024×1024 BEFORE first mark/image;
compare fresh detail, then UndoRedo/SaveOpen. Existing512 saved textures stay512 until
visible Increase. Higher-res project Save/Open96MiB (ordinary32MiB), scalar512 and
source1024/tip256/base+three limits retained. No2K/4K or all-zoom pixel-free claim.
Next confirmed1024 device feedback; inspect source/UV density if still coarse, then
stage larger maps/sources/memory work. Merge/Flatten/Smudge/AO/seams remain queued.

## .938 publication verified — 22 October 2026

Runtime f441e92b0950f0e7b2ab1b46a8b67d9940a12396, tree
239a55d76de49ddf840fa19abcdbfbb351b262d8, matches tested local tree.
Hosted regression39699769504/job119565892975 succeeded; full job logs confirm
2697PASS/0FAIL/0skip, matching complete local run. Pages39699769015 build119565895457/
deploy119566078569 succeeded. All25 checked live shell/version, changed runtime/Lab,
recovery and retained core/main/Multi files byte-match tested source. Reviewed pins938;
protected main/cage/Multi/frozen unchanged. This proof updates documentation only.
User .937 PASS protected; .938 device merge/flatten/UndoRedo/SaveOpen gate pending.

.939 final local Node24 full regression: **2,703 PASS / 0 FAIL / 0 skipped**.
New creation6PASS, original nearby Add/Box/Sphere19PASS, reviewed release5PASS.
No assertions removed or relaxed. Complete reviewed main/Lab reverse loader graph939;
protected main930/cage/Multi1.0/frozen untouched. Hosted/Pages/live proof follows;
actual iPad UV-ready creation/paint/persistence acceptance remains pending.

## .939 publication verified — 22 October 2026 (Brisbane)

Runtime e076ba40c61f1c5ad202112b60e67fd75a6a7ccd, tree
52aaf4c3504f6c6e8ba2c44d98fdd8f6bf497bdc, is published on main.
Connected Git Data uploaded20 exact blobs and matched tested tree; fetched main
matched local source. Local Node24 and hosted Node22 regression39722181487/
job119637927281 both pass **2703 tests / 0 failures / 0 skipped**; complete job
logs verify totals. Pages39722181024 build119637930190/deploy119638067800 succeeded.
All20 postdeployment checked shell/version, every changed runtime/Lab owner, recovery,
retained main/cage/Multi1.0/primitive factory/paint owners and frozenBeta7 marker
byte-match tested source. Main/cage/Multi1.0/frozen beta bytes unchanged. No assertion
relaxed. This proof changes docs only; same runtime bytes. User .938 PASS protected;
.939 actual iPad startup/reset/Add/UV checkbox/paint/history/SaveOpen gate pending.

.940 final local Node24 full regression: **2,709 PASS / 0 FAIL / 0 skipped**.
New Torus6 and expanded939 creation6 =12 focusedPASS; reviewed release5PASS.
No original behaviour assertions relaxed; superseded Torus-unavailable checks now
require mapped/optional plain Torus and exact project/NOM/GLB output. Protected
main/cage/Multi1.0/frozen retained. Hosted/Pages/live proof follows; device940 pending.

## .940 publication verified — 22 October 2026 (Brisbane)

Runtime e3118c0fc6a27c61f4f199e35ce77eccd89c19c2, tree
dbd5f70836152bafdf7a8b32cfc8e1504db2bdb7, published on main. Connected Git Data
uploaded14 exact local blobs and matched tested tree; fetched main identical.
Local Node24 and hosted Node22 regression39725820759/job119649340149 both pass
**2709 tests / 0 failures / 0 skipped**; complete hosted logs verify totals.
Pages39725820263 build119649342511/deploy119649486563 succeeded. All20 checked
postdeployment shell/version, changed UV/Add/MeshHealth/Multi parent, recovery and
retained main/cage/Multi1.0/factory/signature/import/export/paint/raster/frozenBeta7
marker files byte-match tested source. Reviewed graph940; main/cage/Multi1.0/frozen
bytes unchanged. No old behaviour assertions relaxed. This proof changes docs only;
same runtime bytes. User .939 PASS protected; .940 Torus device gate pending.

## .940 user PASS — 22 October 2026 (Brisbane)

User PASS protects Torus automatic UVs/optional plain Add, Torus UVs (Y), Paint,
UV Editor, UndoRedo and SaveOpen. .940 runtime/CI/Pages/live proof above is closed.
Next authorized /nextbuild audits bounded Smudge through original paint owners.

.941 final local Node24.19.0 regression: **2,715 PASS / 0 FAIL / 0 skipped**.
All six new Smudge integrations pass on final source, plus every existing assertion.
Nearby Blur/seam15PASS and reviewed release5PASS also passed. No original assertions
relaxed. Complete main/Lab reverse-loader closure941; protected main/cage/Multi1.0/
frozen unchanged. Publication/hosted/live verification follows; device941 pending.

## .941 publication verified — 22 October 2026 (Brisbane)

Runtime a39c2db8a8aaa8e07fcd59025211b130a53e0e27, tested tree
72e49c4433676a761c2ac5df662df18a1a7da87f, is published on main. Connected Git
Data uploaded15 exact blobs; created tree and fetched main match local tested tree.
Local Node24 and hosted Node22 regression39756577806/job119749968964 both pass
**2715 tests / 0 failures / 0 skipped**; complete hosted log totals verified.
Pages39756577517 build119749975949/deploy119750207283 succeeded. All20 checked
postdeployment shell/version, every changed main/Lab runtime owner, recovery and
retained main/Multi1.0/UV/filter/seam/graph/project/export/primitive/frozenBeta7 marker
files byte-match tested source. No original assertions relaxed; protected/frozen
bytes unchanged. This proof changes four continuity files only, same runtime bytes.

Build941 is complete and ready for device testing: hard colour patch on cube →
Tool Smudge within face, drag outward, compare Opacity, tap makes no mark; try an
overlay, UndoRedo stays in Paint, SaveOpen retains result. Face edges/misses restart
pickup. Actual iPad feel/latency remains pending. User940PASS protected; independent
alpha929/reflection gates unchanged. Next device feedback before cross-face Smudge,
AO or Edge-seam authoring; no automatic next runtime build before that gate.

.942 final local Node24.19.0 full regression: **2,720 PASS / 0 FAIL / 0 skipped**.
Five new connected-Smudge checks, original941+seam11 and reviewed release5 pass.
No original assertions relaxed. Reviewed changed main/Lab reverse graph942; protected
main/cage/Multi1.0/triangle graph/frozen unchanged. Hosted/Pages/live proof follows.
User repeated PASS /nextbuild while942 was still local/in regression:941 acceptance
remains protected; no942 device PASS inferred before publication/manual test list.

## .942 publication verified — 22 October 2026 (Brisbane)

Runtime b49bb81d67836a1c2cc569d9755cdd54abb7b5f9, tested tree
5fbb934dae7594d22bc4a64438b0d5bc003097fd, is published on main. Connected Git
Data uploaded17 exact blobs; created tree and fetched main match locally tested tree.
Local Node24 and hosted Node22 regression39762188060/job119768813511 both pass
**2720 tests / 0 failures / 0 skipped**; complete hosted log totals verified.
Pages39762187055 build119768816536/deploy119769033835 succeeded. All20 checked
postdeployment shell/version, changed main/Lab/filter/seam runtime graph, recovery,
retained main/Multi1.0/triangle graph/UV/project/export/primitive and frozenBeta7
marker files byte-match tested source. Original assertions retained; protected/frozen
bytes unchanged. This publication proof changes four continuity files only.

Build942 complete and ready: cube two faces visible, paint patch up to shared edge,
Smudge across it, compare Opacity and painted overlay, UndoRedo retains Paint, SaveOpen
retains result. Seam transition carries averaged colour, not detailed patch orientation.
User941PASS protected. Repeated PASS/nextbuild arrived before942 publication: it is
not942 device acceptance. Actual942 iPad seam feel gate remains next. Then refine from
feedback before AO/Edge seam authoring; alpha929/reflection gates stay independent.

## .942 user PASS — 22 October 2026 (Brisbane)

A further PASS/nextbuild arrived AFTER942 deployment,20 live-file matches and hosted
2720PASS verification. Accept this latest PASS for LIVE942 connected-face mean carry,
Opacity/overlay/Paint UndoRedo/SaveOpen; earlier prepublication repetitions remain941.
Protect942 alongside941. Next authorized943 narrow build begins bounded object-only
AO bake foundation via original UV ownership/triangle geometry; visible controls follow
validated bake pixels/work guards. No AO UI or rendered AO acceptance is inferred.

.943 final local Node24.19.0 complete regression: **2,725 PASS / 0 FAIL / 0 skipped**.
Five new AO/ownership checks, original Smudge941/942 eleven and release/cache five
pass on final runtime. No original assertions relaxed; main/cage/Multi1.0/frozen
unchanged. Hosted regression/Pages/live proof follows. No new AO device controls.

## .943 publication verified — 22 October 2026 (Brisbane)

Runtime `3feb36097fb677165b3162ac852c58c1e452f735`, tested tree
`223e2d8e82855137f804faf9e95134614fcee51e`, is published on main. Connected Git
Data uploaded13 exact local blobs and created the identical locally tested tree;
fetched main matched, local branch aligned with no file changes. Local Node24 and
hosted Node22 regression39765950426/job119781312111 both pass **2725 tests / 0
failures / 0 skipped**; complete hosted log totals verified (hosted219.8s).
Pages39765949659 build119781316369/deploy119781518834 succeeded. All20 checked
postdeployment shell/version, every changed runtime owner, new AO module, recovery,
retained main/cage/Multi1.0/triangle graph/UV/paint/project/export and frozenBeta7 marker
files byte-match tested source. Reviewed pins943; protected/frozen bytes unchanged.
No original assertion relaxed. This publication proof changes four continuity files
only, with identical tested runtime bytes.

Build943 complete: no new hands-on AO test needed because no AO controls are exposed.
Pure bake/ownership/work/refusal coverage is automated. User942PASS remains protected;
next narrow build integrates explicit AO Multiply-layer creation through original Paint
history/pool/compositor with staged/cancel/stale/refusal guards and then visible controls.
AO foundation is local-object16–128 samples only, not rendered SSAO, neighbour-object
shadows, persistent AO resources or high-resolution albedo baking. Alpha929 and
reflection-preview gates remain independent. Existing Smudge/Paint history/SaveOpen
is optional nearby device sanity, not an invented AO acceptance gate.

.944 final local Node24.19.0 full regression: **2,731 PASS / 0 FAIL / 0 skipped**.
Six new AO integration checks + existing2725 pass on final source; original nearby
943/938/942 sixteen and reviewed release five also pass. No existing assertions
relaxed. Complete AO-helper/painter/shell reverse pins944 reviewed; main/cage/Multi1.0/
frozen unchanged. Hosted/Pages/live publication proof follows; device944 pending.

## .944 publication verified — 22 October 2026 (Brisbane)

Runtime `e43997b122f7e29cb8dff29db8c6752deccc2d86`, tested tree
`2331a0d86cd9e87771cf21f4ca9de67f581cfa04`, is published on main. Connected Git
Data uploaded12 exact blobs and created identical tested tree; fetched main matched,
local branch aligned cleanly. Local Node24 and hosted Node22 regression39772067820/
job119801794196 both pass **2731 tests / 0 failures / 0 skipped**; complete hosted
log totals verified (230.0s). Pages39772066609 build119801796950/deploy119801996752
succeeded. All20 postdeployment checked shell/version, changed painter UI/core/new
AO transfer helper, retained943 bake/domain, recovery/main/cage/Multi1.0/triangle
geometry/UV/paint/project/export and frozenBeta7 marker byte-match tested source.
Original assertions retained; protected/frozen algorithms unchanged. This proof
updates four continuity files only; tested/published runtime bytes unchanged.

Build944 is complete and ready for hands-on testing: simple recessed native UV mesh
→ Paint → Ambient occlusion → Bake AO preview; orbit, Cancel retains prior paint.
Bake→Apply creates selected editable AO Multiply layer; Layer opacity/visibility,
Paint UndoRedo, SaveOpen and native shaded export sanity. Redo follows original
selection rules and can keep Base selected; choose AO layer if needed. Convex cube
may show little/no shadow; same-object/local64²/16-ray bake, not screen-space or
neighbour-object AO. Work/refusal limits remain; small UV meshes first. Device944
appearance/latency/persistence acceptance remains pending, not inferred from Node.
User942 connected Smudge PASS protected; alpha929/reflection-preview independent.
Next narrow runtime work follows actual944 device feedback rather than automatic
AO quality/lighting changes. No new AO device PASS inferred from /nextbuild.

.945 final local Node24.19.0 full regression: **2,737 PASS / 0 FAIL / 0 skipped**.
All original2731 and six new quality/cancellation checks pass on final source;
original AO943/944 eleven and reviewed release five also pass. No assertions
relaxed. Reviewed AO/painter/shell reverse graph945; protected main/cage/Multi1.0/
frozen unchanged. Hosted/Pages/live publication proof follows; device quality pending.

## .945 publication verified — 23 October 2026 (Brisbane)

Runtime `bc04adb66457223c2a3654ecbd059ef41804a4bf`, tested tree
`8ab57dcdbcfe0303c80932cfd8d4e5f91e951c40`, is published on main. Connected Git
Data uploaded13 exact blobs and created identical tested tree; fetched main matched
and local branch aligned cleanly. Local Node24 and hosted Node22 regression39887637934/
job120199434595 both pass **2737 tests / 0 failures / 0 skipped**; complete hosted
log totals verified (233.1s). Pages39887637391 build120199437013/deploy120199572392
succeeded. All20 checked postdeployment shell/version, changed AO baker/transfer/
painter UI/core, retained domain/triangle graph, recovery/main/cage/Multi1.0/UV/paint/
project/export and frozenBeta7 marker byte-match tested source. Reviewed pins945;
original assertions retained, protected/frozen algorithms unchanged. This proof
changes four continuity files only; tested/published runtime bytes unchanged.

Build945 complete and ready for SAME-model comparison: hide/delete old AO, Quality
Quick64/16→Bake/inspect/Cancel; High256/64 at same Reach/Strength, compare finer shade
and wait time. Medium128/64 remains available if High work cap refuses. Cancel during
bake leaves no layer/history; retry/Apply, Layer opacity/visibility, Paint UndoRedo,
SaveOpen/native shading. Old saved AO pixels do not automatically improve; rebake.
User944PASS protects workflow with explicit poor/patchy appearance exception;945
actual iPad quality/latency acceptance remains PENDING, not inferred from Node.
Quality test proves actual higher grid/more levels/thin-face coverage, not perfect
smoothness on every model. Alpha929/reflection gates remain independent. Next
runtime refinement follows device comparison rather than unrelated lighting changes.

.946 runtime published: `9af9a37ebeb0913e3c50f76a0e5b198f89143fdf`, tested tree
`318f420120392e573f463f8834af05103563c6fc`. Local Node24 full regression:
**2,741 PASS / 0 FAIL / 0 skipped** (212.9s), including original2737 and four new
recovery tests; no original assertions relaxed. Release contract five pass. Remote
main fetched, exact tested tree matched and local branch aligned cleanly.
Hosted regression39900966420 and Pages39900966243 verified below.

.946 publication verified: hosted Node22 regression39900966420/job120242198371
passes **2741 tests / 0 failures / 0 skipped** (full log totals verified), matching
local Node24. Pages39900966243 build120242201383/deploy120242345149 SUCCESS.
All20 checked postdeployment shell/version, reset/UV/painter/creation loaders,
release-recovery/AO/main/Multi1.0/inspection/paint/project/export and frozenBeta7
marker byte-match tested source. No tested runtime changed after validation.

Build946 complete and ready for device testing: Object → UV → Clear paint keeps
UVs and starts a blank paint session, including the old binding-error case. Clear
paint + UVs permits fresh Box/appropriate projection and repaint. UndoRedo restores
resources/UVs; SaveOpen retains cleared/repainted result. Device946 PENDING. User945
PASS protected. General atlas unwrap remains a separate future build; Pack all only
arranges existing islands. This proof changes continuity docs only.

.947 final local Node24 regression: **2,746 PASS / 0 FAIL / 0 skipped** (180.9s);
original2741 and five new visual-list checks retained. Original905/906/928 targeted19
and reviewed release five pass. No original assertion relaxed. Runtime published
`789924e19b10cef2b81409d34290e3f5dccd82f0`, exact tested tree
`bb97d1e5facc367b0f52feb040f2906eb336556e`. Fetched main matched that tree and
local branch aligned cleanly. Hosted regression / Pages / live-file proof verified below.

## .947 publication verified — 23 October 2026

Runtime789924e19b10cef2b81409d34290e3f5dccd82f0 / tested tree
bb97d1e5facc367b0f52feb040f2906eb336556e published and fetched main matched exactly.
Local Node24 and hosted Node22 regression39903168453/job120249065878 both pass
**2746 tests / 0 failures / 0 skipped**; full hosted log totals verified. Original
checks retained. Pages39903167923 build120249067854/deploy120249209727 SUCCESS.
All20 checked live shell/version, layer-list/painter/recovery, retained layer/blend/
paint/project/export/AO/UV/reset/main/Multi1.0 and frozenBeta7 marker byte-match tested
source. Reverse loader keys947 reviewed; no tested runtime changes after validation.
This proof updates continuity documentation only.

Build947 ready for iPad testing: open Paint with two or more layers, tap rows and
paint distinct marks; previews update on Pencil lift. Blend code / opacity% opens
selected settings; edit them and check row/mesh. Visibility check toggles selected
row with one original Undo; Base immutable. Check image/mask rows, reorder Up/Down,
UndoRedo/SaveOpen and bounded left dock scrolling/Done. Device947 PENDING;946 user
PASS protected. General atlas unwrap remains deferred behind current UI request.


.948 final local Node24.19.0 full regression: **2,750 PASS / 0 FAIL / 0 skipped**
(97.7s). Four new checks plus original2746 retained; targeted paint/material/layer/
duplicate/project/release50PASS. Superseded unlit/sharing expectations in920/923 and
904/909 were updated to requested lit/private-texture behavior; exact pixel, stale
channel, duplicate isolation and persistence assertions retained. Initial exploratory
full run hit those old expectations; this FINAL complete run closes all regressions.
Reviewed loader closure948; main930/cage/Multi1.0/frozen unchanged. Hosted regression,
Pages and postdeployment live-file verification follow. Device948 lighting pending.


## .948 publication verified — 23 October 2026 (Brisbane)

Runtime `a2453a6b1b12d49a310f99d281209624f4e40a61`, exact tested tree
`6f937c9c3c25802fa57cc4a83b5bcf6f4290cb32`, is published on main. Connected
Git Data uploaded22 exact blobs and created the identical local tree. Fetched main
matched, local branch aligned cleanly. Local Node24 full regression and hosted
Node22 regression39934931497/job120352039428 both pass **2750 tests / 0 failures /
0 skipped**; complete hosted log totals verified (249.9s). Pages39934930737 build
120352042059/deploy120352235264 succeeded. All19 checked postdeployment files
(shell/version, complete changed runtime/Lab graph, recovery, retained947 layer list,
main930/cage/Multi1.0 and frozenBeta7 marker) byte-match tested source. Reviewed pins;
no protected/frozen changes. This proof updates four continuity files only and keeps
tested/published runtime bytes unchanged. User947PASS is protected, not inferred948.

Build948 complete and ready for device testing: Colour-only painted UV cube → Done →
VIEW Studio, orbit for shaded faces and scene shadows. Add another mesh/switch active
selection; painted inactive objects remain scene-lit. Reopen existing painted.boxlab,
confirm appearance and original colour; reopen Paint for Channel(unlit)/Lit and retained
947 layer list, UndoRedo/continue painting. Standard material/shadow inheritance and
exact bytes verified automatically; real GPU/iPad shadow/appearance acceptance pending.
Older smooth-metal reflection and alpha929 gates remain independent; general atlas
unwrap remains future work (Pack all arranges existing islands). No new light/brush/
history/project/export/modelling owner or source pixel/schema changes.


.949 final local Node24.19.0 full regression: **2,756 PASS / 0 FAIL / 0 skipped**
(101.7s), retaining every original2750 check plus six new Face atlas integrations.
New+nearby Box/Pack/density/reset/release30PASS. No existing behavior assertion changed
or removed. Reviewed UV/Add/Multi/Lab reverse pins949 including newly recorded Lab
sample import; main930/cage/Multi-transform1.0/frozen/948lighting unchanged. Hosted
regression/Pages/live publication proof follows. DEVICE949 remains pending.


## .949 publication verified — 23 October 2026 (Brisbane)

Runtime `342f05b4a3b2822467d025dc19000f3281434492`, exact tested tree
`57fd40f453c15363c607690fab4c6e26de538ab1`, is published on main. Connected
Git Data uploaded15 exact blobs/tree; fetched main matched, local branch aligned
cleanly. Local Node24 and hosted Node22 regression39937602575/job120360872192 both
pass **2756 tests / 0 failures / 0 skipped**; complete hosted log totals verified
(145.1s). Pages39937601356 build120360875053/deploy120361068122 succeeded. All20
checked postdeployment shell/version, complete UV/Add/Multi/Lab graph, recovery,
retained UV workspace/inspector/948 lit owners/main/cage/Multi-transform1.0/947 layer
list/frozenBeta7 marker byte-match tested source. No existing assertions removed or
changed. This proof updates four continuity files only, retaining tested runtime.

Build949 complete and ready for device testing: plain cube or small planar-faced
extruded mesh → Object → UV → Face atlas → Open UV Editor. Separate face islands,
UndoRedo, Paint/Done retains accepted948 lighting, SaveOpen and optional NOMAD.
Existing paint must be explicitly cleared first; action never discards it. Face atlas
is one island per planar face, up to128 faces/20K corners; it is not joined-chart or
general curved unwrap. Existing Box/Planar/Cylinder/Sphere/Torus/Pack/auto-Add retain
original algorithms. DEVICE949 pending; user948 PERFECT PASS protected. Next actual
949 feedback, then scoped atlas/chart/seam direction. Alpha929/reflection independent.


.950 final local Node24.19.0 full regression: **2,761 PASS / 0 FAIL / 0 skipped**
(101.9s), retaining original2756 plus five new exact-file/warped-face integrations.
Focused new/949/density/Pack/release26PASS. Old949 unavailable-preview/degeneracy
refusals remain; its UI text expectation reflects new scope. Standalone density895
planarity contract unchanged. Supplied OBJ fixture byte-identical; no source upload
modified. Reviewed full UV/Add/Multi/Lab/recovery950 graph, main/cage/Multi-transform/
frozen/accepted948lighting unchanged. Hosted/Pages/live proof follows; device950
SAME-model atlas/paint/UndoRedo/SaveOpen acceptance pending, no949 PASS inferred.


## .950 publication verified — 23 October 2026 (Brisbane)

Runtime `dac0fc655727a68693aa761d87ede425e12abd00`, exact tested tree
`4170c78794755c3f60417b4012d2f93d4ae65eda`, is published on main. Connected
Git Data uploaded17 exact blobs/tree; fetched main matched and local branch aligned
cleanly. Local Node24 and hosted Node22 regression39942759656/job120377956989 both
pass **2761 tests / 0 failures / 0 skipped**; complete hosted log totals verified
(247.2s). Pages39942759456 build120377961102/deploy120378158885 succeeded. All20
checked postdeployment shell/version, complete UV/Add/Multi/Lab graph, recovery,
retained UV workspace/inspector/948 lit owners/main/cage/Multi-transform1.0/947 layer
list/frozenBeta7 marker byte-match tested source. Original895 planar-density guard
retained;949 UI wording updated for intended warped-face support. This proof changes
four continuity files only, retaining tested runtime. Original supplied OBJ unchanged.

Build950 complete and ready: SAME extrusion/scale mesh → Object → UV → Face atlas →
Open UV Editor should map all20 faces. Original quads/ngons remain; UndoRedo restores
UVs, paint/Done retains948 lighting, SaveOpen and optional NOMAD sanity. Exact supplied
file now passes real-owner atlas/paint/history/transport integrations, but iPad950
appearance/performance acceptance remains pending. Clear existing paint explicitly
first. Source949 failure recorded, not accepted as PASS; user948 PERFECT PASS protected.
Next actual950 feedback before unrelated features; no permanent triangulation workaround.


.951 full local Node24 regression: **2767 PASS / 0 FAIL / 0 skipped** (99.0s),
retaining all2761 plus six coplanar integrations. Focused32PASS. Reviewed19-file
runtime loader closure, three functional owners only; retained main/cage/Multi1.0/
frozen bytes and recovery owners unchanged. Source949/950 Face atlas outputs and
standalone895 density guards stay protected. Hosted/Pages/live proof follows;
DEVICE951 comparison/paint/UndoRedo/SaveOpen remains pending.


## .951 publication verified — 23 October 2026

Runtime `63f4c6986756d65dc6682b8c76f31f834d035aea`, exact tested tree
`fc4050afa6437d9dca2127af0d0f2cdae9b310cd`, is published on main. All26 uploaded
blobs and Git Data tree matched local hashes; fetched main matched and checkout clean.
Local Node24 full regression2767PASS/0FAIL/0skipped (99.0s); hosted Node22 run
39952990826/job120411804887 complete log verifies same2767/0/0 (198.0s).
Pages39952990462 build120411810503/deploy120411996505 succeeded. All29 postdeployment
shell/version, complete reviewed UV/Add/Multi/Lab/paint loader graph, recovery,
retained948lit/main/cage/Multi-transform1.0/947layers/frozenBeta7 marker byte-match.
Proof commit updates four continuity files only; tested runtime retained.

User950 PASS is recorded/protected. Build951 complete/ready for device testing:
same unpainted extrusion/scale mesh → Object → UV → Coplanar atlas → Open UV Editor.
Exact fixture automatically gives14 islands versus Face atlas20, four warped faces
stay isolated and all original24 vertices/20 quads/ngons unchanged. Compare charts,
UndoRedo, paint across connected flat faces and SaveOpen. Clear existing paint
explicitly first. DEVICE951 appearance/performance remains pending. Next follow951
feedback before broader unwrap/seam tooling; keep original owners and protected
modelling/navigation/lighting/frozen behavior. No general curved unwrap claim.


.952 local Node24 full regression: **2770 PASS / 0 FAIL / 0 skipped** (97.5s),
all2767 retained plus three workspace layer/entry lifecycle tests. Focused UV/history/
Pencil/island/image-reference/Pack/density/release53PASS. No assertions relaxed or old
checks deleted. Functional changes only uv-workspace; MeshHealth import + reviewed
shell/recovery cache keys952. Main/cage/Multi-transform1.0 and frozen bytes unchanged.
Hosted/Pages/live publication evidence follows. DEVICE952 intermittent iPad UI-loss
retest remains pending; no exact browser/GPU reproduction or device fix PASS claimed.


## .952 publication verified — 24 October 2026 (Brisbane)

Runtime `105b95ca8b0cd2b8ffde8a57a15c38074923943d`, tested tree
`ea50e9e98994c4abcbc4f3829a0d1418938d0c35`, published on main. Ten uploaded
blobs/tree matched local hashes; fetched main matched and checkout clean. Local
Node24 regression2770PASS/0FAIL/0skipped (97.5s); hosted Node22 run39955713017 /
job120420921065 complete logs verify2770/0/0 (248.6s). Pages39955712534 build
120420925921/deploy120421167189 succeeded. All29 postdeployment checked shell/version,
workspace/MeshHealth/UV/Add/Multi/Lab/paint loaders, recovery, retained main/cage/
Multi-transform1.0/lit948/layers947/frozenBeta7 marker byte-match tested source.
This proof changes four continuity files only; tested runtime retained.

Build952 complete and ready for iPadPro retest. User951 atlas PASS protected; separate
intermittent UV/main-toolbar disappearance is still pending DEVICE952 confirmation.
Repeatedly open editor and Back to3D; check whole editor, exit beside title, main top-right
buttons/VIEW, pan/pinch/Pencil island editing/UndoRedo and return/reopen. Original924
header-above-viewport behavior preserved with sibling workspace layer. Cloud WebGL
unavailable, no exact intermittent Safari reproduction or full-app rendered acceptance
claimed. Next follow952 device feedback; don't infer that automated tests prove the
reported intermittent disappearance resolved. No modelling/atlas/paint algorithm changes.

.953 final local Node24.19.0 regression: **2776 PASS / 0 FAIL / 0 skipped**
(91.6s), retaining original2770 plus six Edge-cut integrations. Focused new/atlas/
workspace/release20PASS; radial709/713 retained all old IDs and now requires20 Edge
actions. First full run's only failure was old713 inventory19; updated to intended
20 and final COMPLETE rerun above passes. No behavior assertion dropped or skipped.
Reviewed9-file runtime/loader closure + recovery keys953; main930/cage/Multi1.0/
frozen unchanged. Actual953 iPad tactile acceptance pending. Hosted/Pages/live
publication proof follows. Reprojecting UVs replaces cuts; no persistent seam recipe.


## .953 publication verified — 24 October 2026 (Brisbane)

Runtime `1d3185fb08ec44bd61dc01b00aa36078eaddab47`, tested tree
`e31ab5696a9155691ae26b8b2a6313e74eebd8db`, published on main. All18 blobs
and created tree matched local hashes; fetched main matched exactly and checkout
aligned cleanly. Local Node24 full2776PASS/0FAIL/0skip (91.6s); hosted Node22 run
40039584933/job120707236946 complete logs verify2776/0/0 (214.7s). Pages40039584537
build120707240032/deploy120707397865 SUCCESS. All20 checked live files byte-match:
shell/version, COMPLETE changed UV/Add/Multi/Lab/gizmo graph, recovery, retained
workspace952/inspector951/main930/cage/Multi1.0/native writer/project/frozenBeta7.
This proof changes four continuity documents only; tested runtime retained.

Build953 ready for iPad testing: Add UV Plane X2/Y1 → select centre shared Edge →
radial Cut UVs → Object UV Editor shows two islands. UndoRedo restores/reapplies;
Pencil island move, Paint after cut and SaveOpen retain layout. Existing seam/boundary
repeat no-ops; paint requires explicit Clear paint before cutting. Complete paths or
closed loops only; partial slits refuse atomically. No general unwrap/stitch/persistent
seam recipe. User952 UI/history PASS protected; DEVICE953 feel/visibility pending.
Next actual953 feedback, then scoped seam/stitch/unwrap audit through original owners.

.954 final local Node24.19.0 regression: **2783 PASS / 0 FAIL / 0 skipped**
(95.1s), original2776 retained plus seven supplied-file/picker/input integrations.
Focused new/native Face/Vertex/floating-edge/gesture/release38PASS. No old assertions
relaxed or removed. Uploaded OBJ fixture byte-identical. Main source changes only
helper import and Edge picker branch; direct-bevel is pin-only. Component Edge toggle
and Edge-paint use existing native owner; no new pointer/geometry/history implementation.
Reviewed cache closure954; cage930/Multi1.0/frozen unchanged. Hosted/Pages/live-file
publication proof follows; actual954 iPad tap/Flip/reselect acceptance pending.


## .954 publication verified — 24 October 2026 (Brisbane)

Runtime `989a1c1a0ef919a106e239ab6c85fafad788ecc1`, tested tree
`07f00248ab50e88a0e50a82b712757da0e6339c6`, published on main. All15 blobs
and Git Data tree matched local hashes; fetched main matched exact tested tree and
checkout aligned cleanly. Local Node24 full2783PASS/0FAIL/0skip (95.1s); hosted
Node22 run40041192199/job120712416004 complete logs verify2783/0/0 (244.4s).
Pages40041191386 build120712417098/deploy120712558241 SUCCESS. All20 checked live
files byte-match: shell/version, new picker + changed main/toggle/Edge-paint/Bevel
loader graph, recovery, retained workspace952/UV953/gizmo953/Pencil gate/cage930/
Multi1.0/Flip337/native writer/project/frozenBeta7. Original upload fixture unchanged.
This proof changes four continuity files only; tested/published runtime retained.

Build954 complete/ready for SAME-file iPad retest: unselected circled edge and its
neighbours, orbit/zoom/reselect, original Flip Edge→deselect→reselect new diagonal,
UndoRedo, multi-edge selection and finger navigation. Automated exact-file/native
picker and real Flip/history/input fixtures pass; actual iPad feel/appearance remains
pending. Screenshot952 failure reproduced on same picker in953; no forced stale-cache
workaround. User952 UI/history PASS protected;953 Cut UVs device gate remains separate.
Next actual954 feedback before further unwrap/seam features; no new953/954 PASS inferred.

.955 final local Node24.19.0 full regression: **2789 PASS / 0 FAIL / 0 skipped**
(93.4s), original2783 retained plus six Stitch integrations. New/Cut/accepted954
picking/radial/release35PASS. Original953 source-test boundaries kept intact after
initial new-button placement exposed a fixture slice; button declarations precede
both callbacks, and original assertions remain.713/709 inventory now21 with every
old tool retained. No old behavior assertion removed or relaxed. Main/picker/toggle/
Edge-paint954, cage930/Multi1.0/frozen bytes unchanged. Reviewed9-file reverse UV/
Add/Multi/Lab/gizmo closure955 and recovery pins; full hosted/Pages/live proof follows.
Actual955 iPad feel/flat-stitch workflow acceptance pending;953/954 user PASS protected.


## .955 publication verified — 24 October 2026 (Brisbane)

Runtime `0b1062de451327f9d685243af31bcbc2e44ba791`, tested tree
`c82ffe358084236295770486d5a15f781f00e5c6`, published on main. All18 uploaded
blobs and Git Data tree matched local hashes; fetched main matched exactly and local
checkout aligned cleanly. Local Node24 full2789PASS/0FAIL/0skip (93.4s); hosted
Node22 run40045851250/job120727280088 complete logs verify2789/0/0 (244.9s).
Pages40045851225 build120727283788/deploy120727410695 SUCCESS. All20 checked live
files byte-match: shell/version, COMPLETE changed UV/Add/Multi/Lab/gizmo graph,
recovery, retained954 main/picker/component-toggle/Edge-paint, workspace952/cage930/
Multi1.0/frozenBeta7. Actual original makePlane(2,2,1)+automatic XZ native UV owner
also smoke-tested Cut→Stitch→one island. This proof changes four continuity files
only; tested/published runtime retained. User953 and954 PASS recorded/protected.

Build955 complete and ready: unpainted UV Plane X2/Y1 → shared Edge Cut UVs → SAME
selected seam Stitch UVs → Object UV Editor shows ONE joined island. Pencil island
move moves both faces; UndoRedo restores/reapplies stitch separately from cut. Paint
then SaveOpen retains layout/result. Whole two charts must share one flat source
plane; curved/cube-corner/bent charts refuse, no general unwrap or seam recipe.
Actual955 iPad appearance/feel remains pending. Next actual955 feedback before broader
stitch/unwrap work; retain accepted953 cuts/954 picking/952 UI and original owners.

## User product direction — Paint, facegroups and graphical UI — 24 October 2026

User explicitly says these are FUTURE GUIDELINES, not immediate requests to implement
all of them in956. Preserve current atlas build scope. Future direction:
- Paint facegroups directly on the mesh: assign existing mesh.faceGroups per polygon,
  not RGB texture pixels. Existing clone/history/project/OBJ/NOM group owners stay
  authoritative. Reuse surface face picking/Pencil/navigation; a UV-free group-target
  needs deliberate target validation rather than pretending current UV painter already
  supports it. One scene checkpoint per stroke; no parallel mesh/group/history kernel.
- Bring production Paint into mainstream app access; current viewport-paint.js launcher
  is in File. Reconnect original painter/session, not a second painting implementation.
- Contextual paint radial for brushes and layers/masks, retaining original controls/
  action owners and the accepted left dock until deliberately migrated and tested.
- More graphical UI: consistent function icons with SMALL VISIBLE text captions below,
  inspired by user's uploaded Nomad Sculpt screenshot0D6C6D33-1097-419E-AC66-52B94B18D841.
  Keep readable labels/accessibility/touch targets; coherent icon family and active state.
  Stage changes in small reviewed surfaces; retain accepted radial locations, gestures,
  Focus, history and modeller behavior. No wholesale reskin automatically authorized
  as the next untested change. These directions remain in roadmap after atlas feedback.

Audit: mesh.js stores string/null faceGroups and preserves them on clone; original
facegroup-colours-core displays them. Preview already has source-face triangle mapping.
956 does not ship facegroup brushes, new Paint entry, paint radial or icon redesign.

.956 final local Node24.19.0 full regression: **2796 PASS / 0 FAIL / 0 skipped**
(101.5s), original2789 plus seven new atlas/angle/save-name checks. Focused atlas949/
950/951, cut953/stitch955, Pack/density/release51PASS. Only original limit-boundary
fixtures moved to requested4097; atomic refusal and prior128 success retained.
Original951 panel fixture explicitly chooses0° under new UI angle forwarding. No
skipped behavior checks. Reviewed8-file UV/Add/Multi/Lab reverse cache closure956;
main/picking954/gizmo955/workspace952/Multi1.0/frozen unchanged. Save/Open owner also
unchanged; Safari external-download overwrite limitation verified from primary sources.
Hosted/Pages/live proof follows. No955 or956 device PASS inferred.


## .956 publication verified — 24 October 2026

Runtime commit `f0b790fed52ebfb191699d5b9a30ee18792b995b` on main; exact tested tree
`2702bb86c769e8ca854bf98ccf39d85ac4e482d8`. Local Node24.19.0:2796 PASS,
0 FAIL/0 skipped (101501.6ms); focused atlas/pack/density/release:51 PASS.
Hosted Node22 Topology regression run40047733605/job120733187764 SUCCESS:
2796 PASS,0 FAIL/0 cancelled/0 skipped (146421.2ms), completed2026-10-24T01:02:46Z.
https://github.com/CrisBezz/BoxLab/actions/runs/40047733605
Pages run40047733370 SUCCESS. Cache-busted public GETs:20/20 byte-identical to tested
checkout, including version/index, all8 reviewed UV/Add/Multi/Lab changed assets,
release loaders, protected954 main/picker/toggle/edge-paint,952 workspace,955 gizmo,
930 cage batching,Multi1.0 and frozen beta7 marker. First pre-deployment GET returned
old runtime; fresh requests after deployment matched every file. No mixed live build.
https://github.com/CrisBezz/BoxLab/actions/runs/40047733370

Ready for DEVICE956: previously over128-face unpainted model → Object UV → Auto atlas
15°; inspect islands/time. Compare0°/15° shallow bends and sharp seam retention.
Undo/Redo, paint a new map, then .boxlab Save/Open should preserve UVs and paint.
953/954/952 PASS protected. No955/956 device PASS inferred. Future facegroup brushes,
mainstream Paint access, paint/layer radial and captioned icon UI remain recorded
roadmap directions; none are part of956 runtime. Safari overwrite limitation remains
browser-owned; Save/Open filename owner unchanged. Docs-only proof commit follows.

## .957 — variable-size shelf packing; .956 PASS — 24 October 2026

User .956 PASS /nextbuild protects angle Auto atlas and larger limits. Audit main
82ddf0de: packedLayout allocates identical cells using largest chart bounds; original
UV workspace still disabled Pack/density above128 despite4096-capable owner.
Extend SAME packedLayout with height/width/ID sorted next-fit shelves and24 bounded
common-scale trials. Choose only if common scale strictly improves over original
grid; equal-sized charts retain original grid. No chart rotation, shape nesting,
relaxation, seam changes or optimal-packing claim. Source geometry and original
UV/history/paint refusal/numeric-collapse validation retained. All callers (Auto/
Face atlas, Pack, Cut/Stitch repack) reuse original owner. Workspace Pack/density
now enabled through4096 islands. Margin and count-dependent gaps unchanged.
New tests verify mixed-size coverage, common relative density, separation, bounds,
determinism, equal-size fallback and actual workspace129/4096/4097 control gating.
Validation: full suite2797PASS/0FAIL/0skip (98.8s), plus two new shelf tests
PASS separately (added after full run enumerated files);2799 distinct tests covered.
Release+new packing/workspace focused11PASS. No assertions removed/relaxed.
Published runtime cac6a27c2488700ae7c289c1d0fe3418ce41d370; exact tested tree
c0b12d1cb6abfe78cc6439aab2800fdd8bb265a0 verified before updating main.
Pages40067515702 SUCCESS;12/12 public files byte-match (all changed runtime/cache
loaders plus protected main954/Multi1.0). Hosted regression40067515962/job120793756375 SUCCESS; complete hosted logs
verify2799PASS/0FAIL/0skip. Local full and focused checks above passed.
No device957 PASS inferred. Docs-only proof commit follows; runtime unchanged.
Reviewed reverse cache graph957; main954/picker954/gizmo955/Multi1.0/frozen unchanged.
DEVICE957: unpainted varied-size mesh → Auto atlas → inspect packing; existing UV
layout → Pack all; UndoRedo; paint then SaveOpen. Painted targets require Clear paint
before UV repacking. Bigger chart bounding boxes do not guarantee tight concave nesting.
Next follow actual packing quality/device timing before broader unwrap or UI changes.

## .958 — UV popup clipping containment — 24 October 2026

User screenshot FA9BB69D on957 shows right toolbar and bottom status disappearing
at the SAME vertical boundary while UV TOOLS popup is open, before UV Workspace.
Not stale shell; not evidence against957 packing. No957 device PASS inferred.
Audit shared tool-session-ui begin: UV tools uses transformed scrolling shared dock.
Existing952 Workspace sibling fix does not apply to this preceding popup.
Narrow mitigation: original UV-tools host uses left/right8px + auto margins instead
of translateX centring, local isolation and layout/paint containment. Original nodes,
listeners, wide body/actions, history and all UV algorithms unchanged. Clear these
UV-only styles before the next dock (including left Paint); ordinary tools keep
shared placement. No new editor, pointer listener, resize polling or z-index escalation.
Exact iPad/WebKit compositor failure is NOT reproduced here; this is a targeted
containment repair requiring device acceptance, not a proven browser-engine diagnosis.
New test executes original begin for UV→Paint→ordinary tool and verifies scoped clip,
transform-free UV placement and style cleanup. Release contract/cache keys reviewed958;
main954/picker954/Multi1.0/frozen and957 packing/workspace unchanged.
DEVICE958: repeat Object→UV and Close, watch full top-right toolbar/status; Auto atlas,
Open UV Editor→Back to3D, then Paint and another tool to check popup positions.
Next actual958 iPad clipping retest before further unrelated development.
Initial full run found one old711 assertion requiring left50% for UV as well as
ordinary tools; updated only UV expectation to inset8px/right8px/no-transform,
retaining every other launch/close/history check. Focused20PASS. Final full-run2800PASS/0FAIL/0skip (94.95s). Publication evidence follows. No957 packing source changed.

.958 publication: runtime8deba41d15d06825d28e0195fe486e0d1499b9e5 on main.
Tested tree2a806a34735d045e057b2cb6f224e20a60cccbad matched uploaded Git tree exactly.
Local final2800PASS/0FAIL/0skip; focused20PASS. Pages40068587680 SUCCESS.
All13 checked public files byte-match tested checkout: shell/version/new session UI,
retained957 UV/packing/loaders and protected main954/Multi1.0. No packing algorithm
changes958. Hosted regression40068588195/job120796941024 SUCCESS:2800PASS/0FAIL/0skip.
Actual intermittent iPad failure not reproduced; DEVICE958 popup/header/status retest
required. No957/958 device PASS inferred. Docs-only publication proof follows.

## .959 — reconnect production Paint in Object radial; .958 PASS — 24 October 2026

User958 PASS /nextbuild protects UV-popup/header/status clipping repair and style
cleanup across UV→Paint→ordinary tools. Prior pending958 device notes superseded.
Audit main85544a7e: original object-radial-session already maps UV Paint to original
viewportPaintBtn/uv-paint/__boxlabViewportPaint, but total-gizmo ring omitted button.
Add UV Paint at outer45° radius230; every existing sector stays in place. Original
adapter launches SAME production painter, owns cancellation/completion/gizmo hide;
existing File launcher retained. Painter opens left dock and enforces original one
active independent UV object/paint target guards. No new brush/layer/history/input
owner, no painter changes or icon overhaul. Original left Paint exception retained.
Extend original711 inventory/launch/close/spacing fixture with UV Paint; left8px
expectation includes original Paint dock, all old assertions and positions retained.
Local full2800PASS/0FAIL/0skip (95.99s); focused19PASS, final radial14PASS.
No assertions removed. Publication evidence follows. Only runtime functionality: one radial
button; shell/recovery/gizmo cache pin959 and reviewed asset contract. Session958,
main954/picker954/Multi1.0/UV957/packing/frozen unchanged.
DEVICE959: select one UV object → Object radial → UV Paint (outer upper-right);
Pencil paint, fingers orbit/pan/pinch, UndoRedo stays in Paint; Done→radial→reopen
same layers. Try UV popup→close→Paint and Paint→Done→another tool. SaveOpen retains
paint. File Paint entry still works. Invalid/no-UV targets retain original refusal.
Next feedback on mainstream access before a separate paint-tool/layer radial build.

.959 runtime57cb1ca5e86addf0d875e39fadd94fce8ac38088 published on main; uploaded
tree0d80b7f3c25e805e9b422076e51921473cea5d66 exactly equals tested local tree.
Local2800PASS/0FAIL/0skip, focused19PASS, final inventory/lifecycle14PASS. Hosted
regression40069141161/job120798590171 SUCCESS:2800PASS/0FAIL/0skip;
Pages40069140924 SUCCESS.
All16 checked public files byte-match tested checkout (shell/version/new gizmo,
original painter/adapter/session958/UV957/packing/main954/Multi1.0 and loader graph).
User958 PASS explicitly protected;959 hands-on gate remains separate. No957 packing
PASS inferred and no packing/paint/UV/session algorithm changed in959.

## .960 — captioned brush-tool radial in Paint dock; .959 PASS — 24 October 2026

User959 PASS /nextbuild protects original Object radial UV Paint access and accepted
958 clipping fix. Audit current099f117d: painter's paint-action select owns tool
settings/change cancellation, Brush/Fill/Eraser/Smudge/Blur already implemented.
Replace visible select with native details Brush tools picker in SAME Paint dock;
original select remains hidden as settings/event owner. Five66×52px buttons on a
220px radial, SVG function icons and visible captions; selected aria-pressed highlight
and collapsed current-tool caption. Each click checks original active/disabled gate,
sets original select and dispatches SAME change event (clear staged image/cancel live
stroke/sync controls). Picker closes on choice and session end. AO disabled selection
is mirrored. No new viewport input, brush raster/history/paint resource or layer owner.
Accepted left dock/footer/layers/settings/gesture/tool positions retained. No layer
radial, facegroups or broad reskin in960; staged graphical UI only on these5 tools.
Two actual production UI integrations: all5 tools/caption/selection/blur controls/
no history and disabled refusal; live Pencil stroke→radial switch cancels original
contact while retaining committed paint/history and navigation. Initial new fixture
read aria-pressed from property instead of existing attributes map; corrected test
access, no production workaround or original assertion removed. New+release7PASS,
original900 UI/core+release12PASS. Full local2802PASS/0FAIL/0skip (97.20s); publication evidence follows.
DEVICE960: Object→UV Paint→Brush tools; inspect icons/captions, pick Brush/Eraser/
Fill/Blur/Smudge; picker collapses and current tool caption follows. Paint/UndoRedo,
finger navigation; Done→reopen and verify compact dock/layers. UV popup clipping
and959 Object radial entry remain protected. Next feedback before layer/mask radial.

.960 publication: runtime61f9d1b7944fa3417c8639e72ae3394b434e4b4b on main;
exact tested treeb2ad8cc85e787509d6e3b6c6fc3d845f1069580f matched Git upload.
Local2802PASS/0FAIL/0skip (97.20s); new/release7PASS and original900/release12PASS.
Pages40071442619 SUCCESS;16/16 checked public files byte-identical to tested checkout:
shell/version/new painter, retained959 gizmo/adapter,958 session host,957 UV/packing/
loaders, main954/Multi1.0 and lab graph. Hosted40071442658/job120805544281 SUCCESS:2802PASS/0FAIL/0skip.
User959PASS protected. DEVICE960 icon spacing/selection/paint/navigation/history
acceptance pending; no device PASS inferred. Original layer/mask controls remain.

## .961 — bound hidden gizmo projection and SVG compositor surface; .960 radial PASS

24 October2026. User960 PASS for brush radial; separately reports giant red/green
lines after Paint Done and recurring right-side UI disappearance following UV tools/
map views, changing as gizmo/object orbits across screen. Prior958 clipping PASS is
historical; recurrence is OPEN and not dismissed by prior PASS or Node results.
Reviewed uploaded1EC44980 screenshot and9.7s ScreenRecording17-11-35 frames1s/7s.
Video shows live model/gizmo while header/object UI disappears. Exact iPad compositor
fault remains unreproduced locally; do not claim a proven WebKit engine diagnosis.
Audit current13a0b4a9: total-gizmo sync sets root.hidden during Paint but still calls
syncAxisVisuals. projectedRingPath uses SIZE196/max(1,hiddenRect.width0): hidden
projection magnifies ring coordinates196×; root drop-shadow filter and overflowing
main SVG allow enormous paint/filter bounds. Both failures plausibly share this
unbounded presentation surface, unlike previous popup-only mitigation.
Repair SAME gizmo owner: no axis update while hidden; projectedRingPath returns empty
for hidden/zero/nonfinite dimensions or any nonfinite/out-of-local196×196 ring point.
Degenerate rings clear both visible and hit paths through existing sync owner;
hidden gizmos skip updates and recompute normally when shown.
Remove root drop-shadow filter; bound only direct main SVG overflow. External radial
sectors/corner shortcuts remain outside main SVG and keep original placement/input.
No transform geometry, gesture, UV/paint/history/render kernel or Multi1.0 changes.
959 radial/960 brush controls and958 popup containment unchanged. This targets the
actual hidden sizing defect and constrains rendering; iPad retest is still required.
Two tests execute original ring functions with realThree perspective camera: normal
XYZ paths, hidden→zero→restore exact recovery, finite local coordinates, invalid
projection refusal; hidden sync guard/main SVG/filter scope and retained external
Paint button/shortcut contracts. Focused7PASS; local full2804PASS/0FAIL/0skip (104.73s). Publication evidence follows.
DEVICE961: Paint→Done on same model; no giant coloured lines. Repeat UV tools→UV
Editor→Back/Close; orbit model/gizmo into right side and watch entire toolbar/Object
Browser/status remain visible. Move/Rotate/Scale and radial tools still usable;
Paint/UndoRedo and finger navigation preserved. Next actual961 rendering feedback
before unrelated features. If recurrence persists, keep independent clipping report
open and inspect other filtered/overflowing layers; do not infer acceptance.

## Paint UI direction clarified by user — 24 October2026

User says960 dock-contained radial misunderstood intent. Desired SAME floating
viewport radial theme as Vertex/Edge/Face/Object, with Paint context. Choose brush:
radial disappears; compact, correctly sized contextual settings at TOP CENTRE;
remaining viewport clear for painting. Hold EMPTY BACKGROUND to reopen Paint radial,
choose Blur/etc, then radial disappears and contextual top panel changes. Layers,
masks and image placement should open contextual panels only when requested.
Existing left all-controls dock is transitional, not desired final Paint interface.
User explicitly defers possible bottom-left Paint mode button alongside selection.
Do not silently replace this request with another radial embedded in a dock.
Stage migration using current painter/action/history/layer owners and shared panel
position/compact layout; no new brush engine. Paint-context background hold must
belong to single existing gesture owner and override modelling invert ONLY while
painting; fingers still orbit/pan/pinch, Pencil paints, UndoRedo stays in Paint.
Do not open a radial from a surface paint stroke or navigation; cancel pending hold
on movement/multitouch. Scope regular modelling radial/gesture owners unchanged.
This is documented direction;961 fixes rendering only and does not ship this UI.

.961 publication verified: runtime5fb4a4fabeee8c8155b9dfc3cba918536b5bed23,
exact tested tree00cbdf01bb0719b4dbcad13c4e180202937be354. Local2804PASS,
0FAIL/0skip; focused7PASS. Pages40073818786 SUCCESS; hosted regression40073818564
SUCCESS. All16 checked public runtime/loader/protected files byte-match tested tree.
Device961 red/green lines and orbit-dependent clipping acceptance remains pending;
no proof of iPad compositor root cause inferred from automated passes.

## .962 — startup/lifecycle viewport sizing; .961 rendering FAIL — 24 October2026

User961 FAIL: right-side UI broken immediately after refresh; portrait→landscape
restores it. Do NOT mark961 rendering fixed from2804 automated passes.960 brush
radial acceptance is separate; user's clarified floating viewport Paint radial with
compact TOP contextual settings remains recorded and is NOT implemented in962.
Audit main5fb4a4fa: renderer resize runs once at startup and on window.resize only,
DPR is set once. Later layout/container/visual viewport changes have no sizing owner.
Original main resize now accepts measured width/height/cappedDPR and updates SAME
renderer/camera/selection display. New small viewport-sizing scheduler coalesces
ResizeObserver, window resize/orientation/pageshow, visualViewport resize and semantic
tool-session transitions into one frame. Startup has an additional settling frame.
Unchanged observer dimensions no-op; lifecycle transitions request one same-size
canvas repaint. Zero sizes defer, DPR is capped2, no per-frame polling/synthetic
resize events/temporary1px jiggle/forcedorientation/second renderer or input owner.
This follows rotation's resize/repaint path but exact iPad compositor fault remains
unreproduced;962 is a targeted lifecycle repair requiring device feedback.
Main changes ONLY helper import, resize function and binding; internal main stamp
retained. Main loader962 intentional.961 gizmo bounds retained; UV/paint/geometry/
history, protectedMulti1.0 and frozen releases unchanged. Reviewed asset contract
adds exact main→viewport-sizing import; shell/recovery/main pins962.
Three integrations: original main resize callback preserves renderer/camera/position;
startup/settled layout/container-only resize/DPR/coalescing/no
polling; same-size pageshow/session/orientation repaint/zero-size/cleanup. Focused7PASS.
Full/publication evidence follows. Prior961 proof and clarified Paint direction are
included in this handoff, superseded by explicit961 FAIL above.
DEVICE962: refresh in LANDSCAPE without rotation; inspect whole right toolbar/Object
Browser/status. UV tools→Editor→Back/Close, orbit to both sides. Paint→Done checks
lines independently, then Move/Rotate/Scale and UndoRedo. Report if rotation is still
needed; do not infer device PASS from tests. Defer Paint layout migration until stable.

.962 targeted validation30PASS/0FAIL/0skip (~1.1s): production sizing scheduler+
main resize, release contract, original961 ring guards,954 picking,952 UV workspace,
900 actual Paint/core and960 brush radial. Syntax checks main/helper pass. Prior full
run was interrupted and temporary log unavailable; no full962 count claimed.
User asks why builds slow: avoid blocking handover on duplicate local+hosted full
suite for narrow changes; run relevant checks and verify deployment, report hosted
full-suite status accurately. GitHub still runs full regression automatically.

.962 published runtime9c3d22757255d582b9de06300b7467dd832972d4; exact uploaded
and local tested treef46fcbb7020270aecb67c13c0e58066b6e05393a. Pages40095700923
build/deploy SUCCESS; changed shell/version/main/sizing helper4/4 live byte-match.
Thirty relevant checks PASS; no full962 pass count claimed. Hosted full regression
40095701546 in progress at handover; not blocking device retest.961 user FAIL
recorded, portrait→landscape workaround is diagnostic only. DEVICE962 fresh-landscape
load/UV-entry/return/orbit/right toolbar+Objects+status retest required. Paint radial
redesign remains documented direction, not shipped. No device962 PASS inferred.


## .963 — floating Paint radial and contextual controls; .962 PASS — 24 October 2026

User confirms .962 PASS; protect fresh-landscape viewport sizing, UV workspace return,
orbit visibility and Paint Done rendering. Ship the clarified Paint interaction using
the existing viewport painter and original main background-hold owner. The floating
radial offers Brush/Fill/Eraser/Smudge/Blur plus Layers/Mask/Image/AO/Texture pages.
Choosing an item closes the radial; the original painter controls appear in a compact
top-centre contextual panel. Holding empty background reopens the Paint radial. Pencil
strokes, finger navigation, Undo/Redo, resource, AO and image placement continue through
original owners. Paint hold is allowed only while idle (no stroke/image/AO preview); the
original hold cancels on movement, multitouch, pointer cancel or session change.
Paint settings use the shared panel position owner with a compact option; other popup
layouts remain unchanged. iPad tactile acceptance remains pending.

DEVICE963: Enter UV Paint; use Brush then hold empty space to reopen the floating radial; choose Blur and confirm its top-centre settings; test Layers/Mask/Image/AO/Texture pages, Undo/Redo, Pencil, finger orbit and Done.


## .964 — left side compact Paint settings; user direction — 25 October 2026

User requests Paint contextual popups at LEFT because top-centre settings obstruct the viewport. Keep the floating radial and existing painter/control owners from .963. Reuse shared position owner with compact layout; set Paint host 8px from left/top, width capped at320px, viewport-height scroll. Reduce gaps modestly while preserving readable labels and minimum tap heights. Other tool popups retain top-centre placement. DEVICE964: Brush/Blur left placement, spacing, radial hold/reopen, Pencil, finger navigation, UndoRedo, contextual pages and Done. Next: obtain iPad acceptance of radial + left popup before more controls; then prioritize facegroup painting.


.965 validation: full local Node24 suite2810 PASS/0 FAIL/0 skipped (90.1s);
focused production/UI/hold/debug/Smudge and release checks passed. Revised old tests
only where user-directed UI changed (radial persistence, scalar-layer visibility,
removed Object Paint sector); retained raster cancel/refusal and protected gizmo
bounds/navigation assertions. Old fixed732 shared-dock pin assertion now uses reviewed
cache contract; negative background test mutates BOTH native hold branches; debug
fixture preserves multiple observers and existing runtime-error extraction boundary.
.964 rendering issue remains OPEN; debug report is diagnostic evidence, not a fix.
Runtime publication and hosted CI proof are verified separately after this commit.


.966 validation: full local Node24 suite2813 PASS/0 FAIL/0 skipped (95.0s);
focused Smudge/gesture/UI/debug/Lab/release41 PASS. New checks prove renewed work
windows retain pixels and cancellation baseline; long actual surface-picked Smudge
passes original12000 path budget, edits late pixels and commits ONE Undo/Redo entry;
right toolbar centre probes include headerY30 and persist in pageshow evidence.
Prior .965 hosted regression40181206048 has now completed SUCCESS. Exact supplied
refresh report observations are archived in docs/ui-debug-refresh-965-report.md.
Right-side native iPad failure remains OPEN; no rendering fix inferred.


.967 validation: full local Node24 suite2815 PASS/0 FAIL/0 skipped (93.9s);
focused release/sizing/UV/Paint/debug checks40 PASS. New coverage checks focus/visible
return coalescing, hidden-document refusal and disposal; canvas containment and
untransformed/unclipped VIEW popup contract retained. A local Chromium layout smoke
was attempted but the installed Playwright package has no browser executable here;
no rendered-browser or native WebKit proof claimed. User's .966 report is archived
in docs/ui-debug-invisible-controls-966.md. Device visual gate remains OPEN.

.968 pre-publication validation: 54 focused checks PASS/0 FAIL/0 skipped; all23 encoded SVGs parse as valid XML. Face markup, routing JavaScript, protected Multi1.0 and .967 composition stylesheet remain unchanged. Native iPad visual review pending.

## .968 publication verified — 26 October 2026

Runtime commit17b3d57d588afa2c1859180c2d3dff4b97c8da11; exact uploaded tree
bd31341293981379ed92b1df700f52087e5c8d42 matches tested local commit0992674d.
Main .968 manifest fetched and verified. Public cache-busted version.json, index.html
and face-radial-icons.css all byte-match tested checkout. Focused54 PASS/0 FAIL;
23 valid embedded SVGs. Hosted regression40244377464 status checked separately;
no hosted PASS or native iPad visual acceptance inferred. Face-only device tests
are now ready; remaining modes wait for size/readability feedback.

.968 Pages build/deploy40244377315 completed SUCCESS. Hosted full regression40244377464 was still in progress at publication proof.

.969 validation:59 focused checks PASS/0 FAIL/0 skipped. All14 encoded SVGs valid; original gizmo/action JavaScript, accepted Face CSS, protected Multi1.0 and composition stylesheet byte-identical to .968. Native iPad icon review pending.

## .969 publication verified — 26 October 2026

Runtime a88c5e146fd1e011b71af5db13fd90fd0cef2b4c; uploaded tree aaec5368d1e3421eb49e7e4fa348357c3f8a47e9 matches tested local defd0613. Current main manifest .969 verified; public cache-busted version.json, index.html, vertex-radial-icons.css and protected face-radial-icons.css all byte-match local.59 focused checks PASS/0 FAIL/0 skip,14 valid SVGs. Hosted Actions status could not be confirmed (public API403, combined statuses empty); do not claim hosted full-suite PASS. User .968 PASS protected; .969 ready for native Vertex icon review. Next Object then Edge/Paint after feedback.

.970 pre-publication validation:67 focused checks PASS/0 FAIL/0 skipped;13 encoded SVGs parse as valid XML. Face/Vertex CSS, gizmo routing JavaScript, protected Multi1.0 and composition stylesheet byte-identical to .969. Native Object icon review pending.

## .970 publication verified — 26 October 2026

Runtime cd3e6b5f6f00eb10960878d5987e51de4e6af462; uploaded tree35d255728a40c7327bbc5422c3f9c2184678fd1d matches local tested edc60c6b. Current main version/shell970 verified. Cache-busted public version.json,index.html,object-radial-icons.css,face-radial-icons.css,vertex-radial-icons.css all byte-match tested checkout.67 focused checks PASS/0 FAIL/0 skip;13 valid SVGs. Pages40246891322 and hosted topology40246891448 were in progress when queried, while live bytes already matched; do not infer hosted full-suite PASS. User .968/.969 PASS protected. Object .970 ready for iPad review; next Edge then Paint.

.971 validation:100 focused tests PASS/0 FAIL/0 skipped (~1.8s); syntax checks for Array/helper/gizmo pass. New actual-manager tests cover ordinary native-UV copies, exact authored UV preservation, Live count/reopen/Convert, UndoRedo, project codec, stale/paint refusal and copy-failure scene rollback. Existing literal Array861 pin checks (382/384/418) now use reviewed asset contract; semantic assertions retained. Two SVG glow-filter removals are not native visual proof.

## .971 publication verified — 26 October 2026

Runtime13ad9e6204ae75525d1dc2957554d3ae588e21e9; uploaded tree2eeaaad200b4d7cad6b321c3438ecdf9d2d6554d matches tested local3c1eea80. Main .971 manifest/pins verified. All5 cache-busted live files byte-match:version.json,index.html,linear-array,array-native-uv,total-gizmo. Pages40249928997 completed SUCCESS. Focused100 PASS/0 FAIL/0 skip; hosted full regression40249929436 was in progress at proof, not claimed PASS. Device gate remains for Array ordinary/Live and recurring right-side visuals. Source editing native-UV Live Array remains unsupported (Convert first). .968/.969 artwork PASS retained; .970 overall acceptance not inferred. Next respond to .971 device results before Edge/Paint icon work.

.972 pre-publication validation:39 focused tests PASS/0 FAIL/0 skipped. Reviewed release contract includes new UI-only stylesheet. Array/helper/gizmo/main composition stylesheet and accepted icon sheets are byte-unchanged. No local native iPad rendering reproduction or visual repair claimed.

## .972 publication verified — 26 October 2026

Runtime a799ee6af0f4dee09eee7b614dad3d3e991364cc; uploaded tree a363ffe4385ee26f1bab62c9c21cbffd2230025c matches tested local7556cec7. Main972 version and new stylesheet pin verified; all3 cache-busted public files version.json/index.html/ui-stability.css byte-match tested checkout.39 focused tests PASS/0 FAIL/0 skip. Pages40253411508 was queued and hosted topology40253412100 in progress at last query; live bytes subsequently matched, no hosted full-suite PASS claimed. User Array971 PASS protected. .972 opaque/plain UI device test ready, recurring right-side rendering remains OPEN until explicit feedback. No native compositor root cause claimed.

.973 validation:26 focused tests PASS/0 FAIL/0 skipped (~3.4s); original debug/paint/history/Array and release contracts retained. Two new tests exercise exact visibility/priority restoration, busy refusal and actual debug-button observation/off/pagehide flow; dimensions/model/history remain unchanged. Main renderer/sizing/Array/gizmo and all CSS byte-identical to972. No native UI repair claimed.

## .973 publication verified — 26 October 2026

Runtime cbc30cf5e822addb47e0aa3d3b44a3853598fd8f; uploaded tree e8bd5e0cf3d6d519b82d8d361dd46eabc4fc1bf4 matches tested local e5b23e9a. Main .973 version/debug pin verified; public cache-busted version.json,index.html,gesture-debug.js all byte-match tested files. Pages40254207091 completed SUCCESS. Focused26 PASS/0 FAIL/0 skip; hosted topology40254207098 in progress at proof, no hosted full-suite PASS claimed. DIAGNOSTIC READY: hide only 3D while failure present, record visible/missing, Show3D, Copy report. No visual repair claimed. Array971 PASS retained; .972 plain-profile FAIL recorded.

.974 validation:58 focused checks PASS/0 FAIL/0 skipped (~0.84s), final reviewed release checks5 PASS after outer height58px sizing adjustment.21 SVGs valid; zero pairwise button-box overlaps at retained angles/radii. Outer58px includes two9px text lines,32px icon,padding/gap/border. All runtimeJS, prior accepted CSS/972 stability and973 probe byte-unchanged. Native label readability pending.

## .974 publication verified — 26 October 2026

Runtime17c1d910f5771214cde3b2cbaf74c6a3c17dae0f; uploaded treebcda162b745e4459cd4494a7e80da8cce1a283ad matches tested localf628959a. Main974 version/shell/new Edge CSS pin verified. Public cache-busted version.json,index.html,edge-radial-icons.css all byte-match tested checkout.58 focused checks PASS/0 FAIL; final release checks5 PASS;21 valid SVGs/zero target overlaps. Pages40256386271 and hosted topology40256386756 were in progress at query; live files subsequently matched, no hosted full-suite PASS claimed. Edge974 ready for native readability/action review. User cannot currently reproduce right fault, not marked fixed;973 probe/972 plain CSS retained. Next Paint icons after feedback; Array971 PASS protected.

.975 validation:88 focused tests PASS/0 FAIL/0 skipped (~0.56s), including8 new real-owner plane integrations and original Edge/Vertex/Exact/Repeat/cancel/gizmo/release/Array/diagnostic contracts. Syntax checks pass. Original757 fixture now expects plane group alongside axes/centre. Renderer, Multi1.0, Array, diagnostics and all accepted icon/stability CSS byte-unchanged. Native iPad pad size/picking/readability remains device gate.

## .975 publication verified — 26 October 2026

Runtime a3a448bf64e71c1e07200f569375038895f0c441; uploaded tree74fe3638a43564928232eaf25ad5764609e504f5 matches tested localf9113adc. All7 cache-busted public files byte-match: version.json,index.html,edge-extrude,vertex-extrude,total-gizmo,vertex-tool-viewport-session,extrude-plane-constraints.88 focused tests PASS/0 FAIL/0 skip; final5 release checks PASS. Native plane pad acceptance pending. Hosted full-suite result not claimed. User supplied Edge Fail.obj (24 vertices/14 quads, open clean export from892); selected edge/attempt not recorded, no failure cause inferred. Array PASS and icon974 PASS protected; intermittent right-side fault remains watch.

## .977 publication verified — 26 October 2026

Runtime acb5e78c23f40c59218d9f805904f559290e7c36; tested/uploaded tree8351748b9a36658137189c1e51b1ecb247751f31, all12 blobs verified. Current main shell/manifest and dynamic drawer/precision pins977 match tested source. All4 cache-busted public files (version,index,drawer-ui,precision-face) byte-match after rollout. Focused final128PASS/0FAIL/0skip; full2833PASS belongs to976 baseline. Hosted workflow results unavailable (query returned no runs), no hosted full977 PASS claimed. Canvas Hide3D→Show3D recovery is user-confirmed; underlying visual fault remains OPEN. DEVICE977 negative Exact near-front/orbit/UndoRedo and Bridge pair; physical refusal and inference/readback remain audit follow-ups. This proof changes documentation only.

## .978 publication verified — 26 October 2026

Runtime2cce82749cf3e8818b6a2d86e62572c9f4c32695; exact tested/uploaded tree9bc49bc0186e798fa12942dfdc6aa346a90e3e21, all10 blob hashes verified. Current main release/shell/session978 pin and source match tested checkout. Cache-busted public version.json,index.html,selection-hub-bridge-session.js all byte-match after rollout. Focused232PASS/0FAIL/0skip; hosted query returned no runs, no hosted full-suite result claimed. Edge Bridge blue preview BEFORE Apply, Cancel/source isolation and context disposal are ready for DEVICE978; no native iPad preview acceptance inferred. Face Bridge, original Bridge kernels,977 Exact correction,972/973 rendering safeguards and protected Multi1.0 remain unchanged. Recurring right-side fault stays OPEN. This proof changes documentation only.

## .979 publication verified — 26 October 2026

Runtime6ed08001967ef5f558f84f44d52878603a93b7fa; exact tested/uploaded tree7d82c67d2646ba83c8989b8b8332a3433cd7d24a, all12 blob hashes verified. Current main release/shell and direct/drawer/precision loader keys979 match tested source. All5 cache-busted live files (version,index,drawer-ui,precision-face,multi-face-direct) byte-match after rollout. Final517 focusedPASS/0FAIL/0skip (8.7s); hosted query returned no runs, no hosted or local full979 suite claimed. DEVICE979 ready: inference ON Exact distance across views; refused cut keeps last successful value/history; Through readback reports actual exit. Bridge978 user PASS protected. Right-side recurring visibility remains OPEN with manual Hide3D→Show3D recovery. This proof changes documentation only.

## .980 publication verified — 26 October 2026

Runtime5d72ce2bfa18a8d92d512005caa3b8adb5dc8b92; exact tested/uploaded tree4c794620742ddcca5e1a48766c3abecb0cfa1790, all11 blob hashes verified. Current main release/shell/gesture-debug980 pin/source match tested files. All3 cache-busted live files version.json,index.html,gesture-debug.js byte-match. Final39 focusedPASS/0FAIL/0skip (0.28s); no full-suite/hosted result claimed. DEVICE980 ready: File Refresh display without Debug, canvas automatic return/work/UndoRedo retained, actual right-control recurrence recovery. Underlying intermittent fault remains OPEN; no permanent fix claim. Bridge978 and Exact979 user PASS protected. This proof changes documentation only.

## .981 publication verified — 26 October 2026

Runtimedbe1336800d86f4aa8265169711e4ad2b83e39b9; exact tested/uploaded treee45f640e3361de7b44b8eb2d42333de8db95d5f7, all13 blob hashes verified. Current main release/shell and session/health/debug981 keys/source match tested files. All5 cache-busted public files version,index,tool-session-ui,mesh-health,gesture-debug byte-match after rollout. Final364 focusedPASS/0FAIL/0skip (4.5s); no full/hosted/native WebKit result claimed. Structural UV popup repair is READY for DEVICE981 repeated UV open/Close and Editor/Back WITHOUT Refresh, app-switch or rotation. Hidden host now parks inside drawer-content (parentId can be null because that div has no ID); popup is released/unstyled. Underlying visibility gate stays OPEN until native confirmation, not closed by Node tests. No automatic recovery invoked. .980 PASS applies only to recovery feature;979Exact/978Bridge acceptance protected. This proof changes documentation only.

## .982 publication verified — 26 October 2026

Runtime bc99a6f9d8a28762daa3e379b33ec81fde1b9706; exact tested/uploaded tree 4b6b77520aee0844616585a46f65fa57d055a985, all8 blob hashes verified. Main release/shell/new Paint stylesheet match tested source. All3 fresh public files version.json,index.html,paint-radial-icons.css byte-match after rollout. Final33 focused PASS/0 FAIL/0 skipped (4.9s),10 exact valid approved SVGs and zero target-box overlaps; no hosted full-suite or rendered-browser result claimed (workflow query returned no runs). UV981 user PASS is protected, not pending; Paint982 icon readability remains DEVICE982. No runtime JS, accepted modelling icon, Multi1.0 or frozen changes. This publication proof changes documentation only.

## .983 publication verified — 26 October 2026

Runtime 155c5e61f3af3a1ab3cfda365d39d824a840f559; exact tested/uploaded tree b0e99ab4a076aef57b4efd027dec40ee85174324, all13 blob hashes verified. Main shell/release/new early toolbar CSS and two original action-owner pins/source match tested files. All5 fresh live files version.json,index.html,viewport-toolbar-shell.css,src/direct-bevel.js,src/view-modes.js byte-match after rollout. Final319 focused PASS/0 FAIL/0 skipped (4.4s); no hosted full-suite/rendered/native result claimed (workflow query returned no runs). Paint982 user PASS protected. Refresh-triggered invisible right controls remain OPEN despite earlier981 acceptance;983 removes verified late startup toolbar construction but is not a proven permanent native rendering repair. DEVICE983 browser reload before UV/app-switch/rotation, original toolbar actions once, then accepted UV/Paint smoke. This proof changes documentation only.

## Permanent completion format — 27 October 2026

User instruction: ALWAYS end every reply with the current status and a short list
of possible things to test. Include current build, whether work is complete or
ongoing, and whether a new build has shipped. Keep hands-on checks short and
realistic; distinguish pending diagnostics from tests of newly shipped behavior.
Apply this to progress handovers and blocked/no-code replies as well as releases.

### `.1056` hosted correction update

Topology run `41303647185` reported 3,093 PASS / 3 FAIL. Failures were a stale reviewed gizmo hash and the nested `face-workflow-layout.js` release-version import still at `.1055` (also caught by the canonical loader check). Updated that nested pin to `.1056` and refreshed the reviewed hashes. Camera sync remains guarded with optional `camera.updateMatrixWorld?.(true)` for real Three cameras and minimal harnesses. Rerun Topology, verify Pages/live bytes, then device-check brush switching and Pencil orbit in Paint. No local tests were run.


### `.1056` second hosted correction

Topology `41304456910` reported 3,093 PASS / 3 FAIL: `drawer-ui.js` retained a `.1055` import of the face workflow layout, and its index cache pin was also stale. Both now use `.1056`; the release-version import in the layout and reviewed hashes remain aligned. Re-run hosted checks and verify live Pages bytes before device acceptance. No local tests were run.


### Recording evidence and final `.1056` contract update

The new recording confirms a narrower trigger: Colour-only Done→UV Paint re-entry works; with Colour/Roughness/Metalness active, painting works until Done, then the gizmo is already displaced from the cube. Update the reviewed nested `release-version.js` URL in the face-layout contract to `.1056`; hosted Topology `41304988636` had 3,095 PASS / 1 FAIL from that stale fixture URL. Do not mark the camera sync change as fully accepted; investigate the Done/re-entry path and device-check that exact sequence after the next hosted run.


### `.1056` hosted status and device evidence

Final Topology run `41305462939` passed 3,096 / 3,096. Pages run `41305462046` succeeded. Live release marker is `0.36.18.1056`; deployed `index.html` (SHA-256 `f45871ecb151bef7d56602e5bcbb471a12911cc10ebbec29b7223e40a52728d3`), Total Gizmo (`cddf1a3d97a0532fd3faa44b8b1956e532de1f61d8d63e257bf029e6b80f5900`), drawer UI (`51ff1069a2b8349d34373d3cd5c4adcd51365f7159822a637bc9b497477ee2fe`) and face layout (`57c5806d228bba994a8d5c43b26492965bc713ac1525923c9a5f85fac39479d8`) match the release tree. The supplied recording shows the gizmo offset immediately after Done for multi-channel paint, before another orbit; the camera matrix refresh is therefore not device-accepted as a full repair. The exact Colour/Roughness/Metalness Done→re-enter→paint flow remains open for the next narrow build. Colour-only Done/re-entry and Paint maps/tools PASSes remain protected. No local tests were run.


`.1057` publication: runtime commit `0694a15427d369ced3021d3d5342fb91bdc74413`; Pages `41380409300` succeeded. Cache-busted live version.json reports `.1057`; index and bridge-topology.js match local SHA-256 (bridge `5a9c0052639eb62abd7c3620c52ea42891f27901aa0e7c669d7ce645570c17f3`). Original observer was executed separately and reproduced replacement by the reflection camera; repaired regression retains editor camera. Hosted Topology `41380410101` is pending. Device acceptance remains pending for repeated multi-channel Paint → Done → reopen → paint and Pencil orbit. Colour-only re-entry PASS protected.


`.1058` publication verified: runtime commit `0c48392d9575de3d65a45b589cbc38ca434a3d09`. Hosted Topology `41381820929` passed 3,098 / 3,098. Pages `41381821044` succeeded; live `.1058` marker, index and viewport-paint.js match the release source. Device acceptance pending for radial Material colour changes and repeated Metalness strokes. Paint UI SHA-256 `507ccd1e34b2d4d6ce0c20ec13c6e34eabb5196b45fb98d757a8f7749db97696`; shell SHA-256 `8bdbb342678f7169ac9cc62cb75f94179e99a1c648bff14b7984dc450c37a1ff`. User .1057 PASS remains protected.


`.1059` publication verified: runtime commit `cc84d1ed2d41a9d54c5aab0dd0af52de1d7d1c98`. Hosted Topology `41384738678` passed 3,100 / 3,100. Pages `41384738314` succeeded; live `.1059` marker, index and viewport-paint.js match the release source. Native iPad Material/colour-picker lock-up acceptance remains pending; .1058 was FAIL and .1057 camera/Done-re-entry PASS stays protected. Paint UI SHA-256 `035c875a70252824de879d997cd0f8d55bd23e1d2389f08d858e14017e3c7bc2`; index SHA-256 `ae89054a73de08e924a624fc202d09c5587f6fc0a31d72288ed8004073447070`.

.1060 hosted correction: Topology 41386888486 reported 3,100 PASS / 1 FAIL. Existing Face atlas test requires its original explanation “one island per face, up to 4096 faces”. Restored that wording inside Projection help while keeping atlas caps and clear-paint warning visible outside it; no test expectation was weakened. Bumped the corrected Mesh Health asset key to .1060.1 so the previously deployed .1060 asset cannot stay cached. Application release remains .1060. All 27 focused correction checks PASS; corrected hosted regression and deployment are verified below.


`.1060` publication verified: corrected runtime commit `c59dff749b568fcc2a4f9dbbe08530e2df17b323`. Hosted Topology `41387557443` passed 3,101 / 3,101. Corrected Pages `41387557387` succeeded; live `.1060` marker, index, UV workspace and Mesh Health match the release sources. Device acceptance pending for UV help, Projection help, return/reopen and accepted Paint smoke. Index SHA-256 `7b8627d7f22c4610e72ada105dbb9b22839317fd1048ee58286444018751b9a8`; UV workspace `85a9a75ebff6930c4460179fdf4572233f2e503222b4c908da9b474a479a7aea`; Mesh Health (`.1060.1` cache key) `4d9a434a43737551e1b2f57aa3bfcf8976268ef0ba3e67978a38e4fcb5a9a429`. Paint `.1059` source/pin and user PASS remain protected. Next device list: toggle UV help and switch Move/Scale/Rotate; toggle Projection help and check visible warnings; Back to 3D/reopen and quick Material/Metalness paint.


`.1061` publication verified: runtime commit `75b6c4dae4ba158414c3ccfc2abe472addd3c9cb`. Hosted Topology `41419359928` passed 3,103 / 3,103. Pages `41419359664` succeeded; live `.1061` marker, shell, viewport-paint.js, tool-session-ui.js and paint-palette-layout.js match the release tree. Device acceptance pending for right Layers dock, palette clearance/following, manual drag and accepted Paint workflow. SHA-256: shell `2c4cdb42ed8ff8ed99ea507c4a6bebc9bab3cb42153311897e8835c82714c5ef`; Paint UI `b94c721c229fa3ac46b9cc7cfb5ea165a9831b6d0e52498b8272d6358530cc71`; dock owner `1718ff6c3bc185010bafdbd7f37a85d5012f401fa6cd473843bdf75b75f027d1`; palette helper `e94fa66150f489701e5187e609daf095805242ff6505de385d7e89cf0811d59f`. .1060 help and .1059 Paint user PASSes are protected. Short device checks: open UV Paint and verify right Layers + clear palette; pan/orbit/zoom while menu visible, drag it then navigate; change Material colour and Metalness paint, Done/reopen and UV help smoke.


`.1062` publication verified: runtime commit `421d6cca3f0326b2918bfdb23eaef4f062db8ac4`. Hosted Topology `41422973800` passed 3,106 / 3,106. Pages `41422972772` succeeded; live `.1062` marker, shell and all five repaired tool modules match the release commit. Device acceptance pending for convex Split taps, other edge-tool targeting, Undo/Redo/exit/navigation and accepted Paint layout. SHA-256: shell `7493f33e7f87a0abfc880e551704b2b84b1d1630eb1ccf1f3251a8712e26f597`; Split `ef7f92ead98ca96e1802f230c7b850e3955027d68c5d9ab524ec33effee56937`; Bevel `d25e7e87011a575987cf96f33f7cf4c3ea78bc05258f683376a21ec3a1ad69e0`; Extrude `1668e68282d8ad59dc6cfa871a88776841805b658754c36a7da30edd31b0ede7`; Slide `9ef0ddec79101115bc8cd252b6cb270683b40ffec6fbf7d260385ac925f39864`; Offset `e2110de1cf17b03c9dc3f94fe40e941f2150e35918d342a4c2eb7ff60e448280`. User .1061 Paint layout PASS and earlier Paint/help PASSes remain protected. Short device list: Split opposite convex-face edges after orbit/zoom; Bevel/Slide/Offset and boundary Extrude target the intended edge; Undo/Redo and Done/background exit, then navigation.

## Current release status — 6 November 2026

Current main and live Pages release: `0.36.18.1085`. User has PASSed native Pencil Paint: startup blobs are gone, steady pressure keeps normal brush size, tap and Undo/Redo work, and Colour/Roughness/Metalness/Opacity paint together. Protect this result and the earlier `.1077`–`.1074` Paint PASSes recorded in `TEST_CHECKLIST.md`. `.1085` full local regression passed 3,166 / 3,166. No hosted status checks were returned. The native acceptance is recorded in this handoff, history, checklist and roadmap. Preserve the `.1085` Paint acceptance when continuing from current main.
