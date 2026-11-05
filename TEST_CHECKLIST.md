## .1078 native acceptance â€” pending user check

Use a BoxLab-created mesh with native UVs and Apple Pencil.

1. Set brush size to 256 with pressure sizing enabled. Start a light stroke; verify the first part has the same small width as the rest, with no oversized blob. Repeat after a firm stroke.
2. Repeat with BoxLab round and Klecks brushes. Try pressure sizing on and off, and pressure opacity on and off.
3. Test a deliberate stationary tap; it should still paint on lift at the pressure used. Check Undo/Redo and that controls recover after cancel.
4. Turn on Colour, Roughness, Metalness and Opacity together; verify the same onset behavior, updated map previews and one-step Undo/Redo.
5. Done/reopen Paint. Confirm `.1077` compact controls and `.1076` transparent interior preview remain correct; fingers continue to orbit/navigate.

Regression specifically covers high Pencil-down pressure followed by low-pressure coalesced move events without `pointerType`, for both brushes and all four maps. Focused onset/contact/channel checks: 14/14 PASS. Full local suite: 3162/3162 PASS / 0 FAIL. Hosted validation pending.

## Protected device results â€” 4 November 2026

PASS .1074 Pencil onset and brush pressure controls. PASS .1071 image adjustments. PASS .1070 proportional image import. Keep all three PASS results protected.

## .1074 â€” brush controls and Pencil onset â€” 4 November 2026

.1073 native FAIL: strokes started at the upper right with Size 256 and a large head. The first moving pressure sample could still stamp an oversized head. .1074 confirms it against the next distinct moving sample and uses the lower reading for the initial segment. Later samples retain normal dynamics. Taps retain release behaviour.

Brush tip settings are visible in Brush controls. Independent Pencil Size and Opacity toggles use the sliders as ceilings. Size 256 gives the full size range. Defaults remain pressure sizing on and opacity dynamics off. Fill uses slider opacity and hides pressure options.

Native gate: test light Size 256 strokes with both brushes, all four toggle combinations, deliberate taps and combined channels. User device PASS for .1074 on 4 November 2026. Pencil stroke onset no longer produces the large dab. Protect the two-sample onset handling and independent Size/Opacity pressure controls. Standing main/Pages push authorization applies.

## .1073 â€” defer the positive Pencil-down stamp â€” 3 November 2026

USER .1072 FAIL: screenshot visibly reports v0.36.18.1072 and shows round thick caps followed by thin strokes. Zero-pressure/stale-pressure handling was insufficient. Do NOT claim .1072 repaired the native onset, or explain this as stale cache. Auto removal remains retained (14 sliders), but no unrelated device PASS is inferred.

Audit found createStroke.start always emits an immediate dab. The main painter still called it on every positive initial event; a large first reported pressure followed by light movement therefore permanently stamped the cap. No actual device event-pressure trace was supplied: a high-positive-down/light-motion stream reproduces this failure pattern, but is not a claim about Safari's exact reported values. Existing .1072 tests exercised zero starts and genuine constant-low starts, not a positive first-sample spike or uncommitted preview pixels.

Repair only original viewport UI/painter owners. Pencil input marks deferPenStart; mouse/direct API strokes remain immediate. Pencil down claims/captures the existing Paint contact and suspends orbit, but does not start the original BoxLab/Klecks path or stamp visible pixels. Stationary samples update the latest pressure without ink. On the first positive moving sample, start the SAME path at the contact origin using the MOVING sample's pressure at both ends of that first segment, discarding the unsettled down pressure. If the origin was unpressured, start at the current pressured location so no bridge is painted across unpressured travel. No timer, artificial pressure floor, motion threshold or new input owner.

A deliberate stationary tap stamps on release with the latest pressure from that contact; an all-zero contact still creates no pixels/resources/history. Pending cancellation/lost release disposes the same original transaction and restores controls. Fill and image placement retain their existing immediate pressure-independent paths. All multi-channel scratch layers share the same deferred path. No-op finish now refreshes the original material preview after discarding scratch layers, so a pending/no-ink contact cannot leave a temporary scalar preview displayed. Existing single checkpoint, stencil/alpha, tool/radial/camera and gizmo owners remain. Native acceptance is still required.

Three new integration tests use the actual UI and painter: .9 down followed by .035 motion must match a .035 reference PIXEL FOR PIXEL in Colour/Roughness/Metalness, in BOTH brush paths; draft viewport texture must remain white on down (not merely resource undefined until commit). Stationary .9â†’.04 settling remains visibly unpainted until release and matches a .04 tap; pending positive cancellation with pressure sizing disabled leaves no resources/history and restores controls. Prior .1072 zero onset/no bridge, .1047 Paint-not-orbit/Done-reopen, .1059 colour-focus/lost-release and all-channel tests remain active.

Focused: 23 PASS / 0 FAIL across onset, existing pressure/contact/all-channel cases; 14 release/cache/radial checks PASS / 0 FAIL. Only main viewport/painter and release loader pins refresh to .1073; original raster kernel .1071, stroke/Bezier .896, 14-control adjustment UI/helper .1072, importer .1070, camera .1057, edge .1062, palette .1061 and protected Multi1.0 remain unchanged. No broad UI cleanup or parallel stroke implementation.

Validation complete: 37 focused checks PASS; hosted full regression 3156 PASS / 0 FAIL (run 41635394374, job 125915185206, runtime commit bb9ea4fb34d965a51b00619c844a4bd21d1c28fe). Pages run 41635392457 succeeded. Live version.json, index.html, viewport-paint.js, viewport-paint-core.js and shell-comparison.js bytes match the .1073 runtime sources. Native Pencil acceptance remains PENDING; no device PASS inferred. Device: repeat the long light lines from the supplied .1072 screenshot; first moving stroke should not acquire a large round head. Firm-to-light starts; deliberate tap/lift (tap inks on release), both brushes, combined Colour/Roughness/Metalness, Undo/Redo, Done/reopen and finger navigation. Next: native onset feedback; if failure remains, collect first-event pressure/motion evidence before another speculative algorithm change. Earlier native adjustment/import/layout gates remain pending. Standing direct-main push/publish authorization remains active.

## .1072 â€” first-contact Pencil pressure and removal of Auto â€” 3 November 2026

User reports an unwanted dab on the first touch even when lowering Pencil lightly. During this same build user explicitly requests removal of the useless Auto slider. No .1071 device PASS inferred; .1070 import/.1068 layer layout and .1071 native adjustment gates remain pending. .1069 Home Screen and earlier functional PASSes stay protected.

Audit found the authoritative viewport point adapter initialized lastPressure to 1, ignored zero pressure, and substituted previous positive pressure or 1 for first contact. A zero-pressure Pencil down could therefore stamp a full/stale-size brush immediately. Reset pressure to 0 on each fresh Pencil down (including lost-release recovery). Finite current pressure, including zero, updates the per-contact value and is clamped to 0â€“1; missing initial pressure stays zero. Only pointer-up retains last current-contact pressure to finish the existing tail. Mouse still uses 1. No arbitrary dead zone, delay or minimum-force threshold was added; actual low positive pressure remains low.

Original viewport painter now skips zero-pressure sampled dabs even if pressureâ†’size is disabled. Its existing stroke stores waitingPressure until the first positive sample, then restarts the SAME original path at that actual location. Stationary pressure rise therefore paints intentionally without requiring pointer movement; unpressured travel does not draw a bridge from the initial touch. Both BoxLab/Klecks, multi-channel scratch layers, cancel/missed-up recovery, stroke history, contact capture and navigation owners remain original. Fill and image placement retain their pressure-independent behaviour. No raster kernel, camera, gizmo, mesh or new raw-pointer owner.

Remove Auto from the shared PAINT_ADJUSTMENTS descriptor and delete its unused histogram/percentile transform. Native panel therefore shows exactly 14 sliders; all remaining settings, cached filters, Before/Reset/Cancel/Apply and image conversion warning remain. Old applied pixels stay baked; no project migration or stored slider state exists. Tests explicitly reject a future reintroduction of auto settings. Re-pin adjustment helperâ†’UIâ†’viewport and current painter/release loader graph to .1072; original .1071 raster kernel remains untouched and pinned. New docs/paint-adjustments-1072.html exercises the current 14-control panel; .1071 proof/history remains historical.

Focused validation: 32 PASS / 0 FAIL across five new first-pressure tests, .1071 adjustment suite, all-channel tools, .1059 contact recovery and radial workflow; 9 release/cache checks PASS. New coverage tests zero contacts with pressure sizing on/off and both brush paths, no scalar/history resources, stationary onset, genuine small positive dabs versus firm dabs, zero/unknown contacts after firm strokes, no unpressured bridge, cancel/control restoration, mouse taps and Fill. Original positive-pressure zero-buttons coalesced movement and colour-focus/lost-release recovery remain covered. Auto absence and all 14 remaining slider effects/neutral/cancel/apply behaviour are covered.

Initial hosted Topology 41629906235 reported 3,152 PASS / 1 FAIL: historical paint-orbit-pressure-1047 explicitly required an all-zero-pressure tap to paint. This is the behaviour the user now asks to remove. Updated that original test to retain claimed/prevented Pencil contact, orbit-disabled ownership and Done/reopen assertions, add zero-pressure no-resource/no-history assertions, then require positive stationary pressure to paint exactly one checkpoint. Corrected focused run 8 PASS / 0 FAIL. Runtime code unchanged; application release remains .1072. Pages 41629904112 succeeded and all seven checked live files byte-match runtime e208f92bfbab99bb586dbe55c2e71e7b0905aa94. Browser fixture shows exactly 14 sliders starting with Exposure, no Auto, working Exposure/Brightness preview and Cancel leaving zero edits. Proof docs/paint-pressure-auto-1072-proof-1793706371075.jpg. Corrected hosted Topology 41631063517 (job 125900450459) passed 3,153 / 3,153, zero failures. Corrected Pages 41631063109 succeeded; runtime source remains byte-identical to e208f92bfbab99bb586dbe55c2e71e7b0905aa94 (tree 3474aa71ba7e8ffcc003394e92e159e54a5e8f02), with reviewed historical-test correction in 932cf514e46124bc2ee4206c3e1e0e135aa7f769. Seven live marker/shell/Paint/adjustment/fixture files byte-match tested runtime. 42 unique focused cases PASS / 0 FAIL. Browser inspection confirms exactly 14 sliders, Exposure first, no Auto; Exposure/Brightness preview enables Apply and Cancel retains zero edits. Archived proof docs/paint-pressure-auto-1072-proof-1793706371075.jpg. Native iPad first-touch pressure acceptance remains pending; no .1071/.1070/.1068 device PASS is inferred. Next: light start after firm stroke with pressure sizing enabled, both brushes/multi-channel paint, intentional taps/Fill/navigation, and remaining adjustment Apply/Cancel smoke. Device: gently lower Pencil then increase pressure; no large starting blob. Make a firm stroke then a light start, try both brushes and Colour with Roughness/Metalness. Deliberate tap, Fill, Undo/Redo, Done/reopen and finger navigation. Adjust layer starts with Exposure and has no Auto; remaining sliders/Apply/Cancel still work. Next: native first-contact and adjustment feedback before deferred height benchmarks. Standing direct-main push/publish authorization remains active.

## .1071 â€” Sharpen brush and selected-layer adjustments â€” 3 November 2026

User requests Sharpen paint tool, whole-image Blur/Sharpen and usual art adjustment sliders. User explicitly chose SELECTED LAYER over combined colour texture. This is new work, not a PASS for .1070 resize or .1068 layer layout; both native gates remain pending. .1069 Home Screen icon PASS and earlier protected Paint/camera/gizmo/edge behaviours remain.

Audit: original paint-core blurSnapshot, filter-domain/seam graph, viewport-paint-core resource/history and image-to-paint conversion already own this functionality. Extend them, not a second painter. New Sharpen action uses original one-pass premultiplied blur target as an unsharp reference; original Amount scales strength (8 = 1Ã—), Opacity/Size/tips/pressure/contact cancellation remain original. Alpha/coverage is preserved. All Colour/Roughness/Metalness combinations and mask painting use original 512/1024 layers, stencil, filtered-domain and single-history transaction. Existing Blur/Smudge output remains protected. New inline Sharpen icon joins existing Paint radial; Brush retains first slot, other tools remain ordered. Tool routing now uses paintTools.length rather than hardcoded five tools.

Selected layer settings gains Adjust layer. Native modal blocks background input without adding a raw gesture owner. All 15 controls are present: Auto, Exposure (Â±3 stops), Brilliance, Highlights, Shadows, Contrast, Brightness, Black point, Saturation, Vibrance, Warmth, Tint, Blur, Sharpness, Definition. Own bounded editor formulas, not claimed Apple Photos algorithm parity. Colour layers/Base only; scalar-only and mask contexts refuse global colour adjustment. Mask, layer opacity/blend/order/visibility and other layers/scalar maps remain unchanged. Blur/Sharpness/Definition use original face/seam-aware read neighbourhood; UV atlas neighbours are never treated as connected surfaces. All controls preserve source alpha and transparent RGB.

Preview always renders from the opening raw layer snapshot (no repeated cumulative slider application). Auto uses alpha-weighted 1st/99th luminance percentiles; Exposure uses linear-light gain; separate fine/broad local detail targets reuse the existing kernel. Spatial targets and histogram are cached; input is debounced 160ms. Before/Reset/Cancel create no scene checkpoint. Apply preflights original pool/binding and makes ONE existing checkpoint. Neutral/no-op creates no history. Stale selection/resource/topology or checkpoint refusal cannot publish partial pixels. Existing imagePreview slot carries temporary layer candidate; existing commit owns publication. Tick/close retain original scene ownership.

IMPORTANT scope communicated to user BEFORE implementation: applying adjustments to an editable image uses the EXISTING rasterizeImagePaintLayer path, retaining its current placed/wrapped pixels as paint rather than trying to reconstruct a curved wrap from a flat image recipe. Dialog explicitly says Apply converts the image to paint; one Undo restores editable source/placement. Preview/Cancel keep the exact recipe; masks and settings remain. No source-image recipe mismatch, second projection, schema or save codec added. Applied adjustment values are baked pixels; reopening starts at neutral.

New paint-adjustments.js is a bounded colour transform helper sharing the original filter kernel. paint-adjustments-ui.js owns only native modal controls; access stays in original Paint layer panel. Main viewport/core/kernel pins .1071; accepted importer .1070, palette .1061, layer-list .1050, camera .1057, edge .1062, icon .1069 and protected Multi1.0 remain. Existing older standalone kernel consumers keep their previous URLs/semantics; reviewed hashes updated for the additive filter export and opt-in Sharpen path.

Validation: completed focused runs 27, 14 and 13 PASS / 0 FAIL (overlapping), plus original layer/mask nearby 14 PASS / 0 FAIL. Eight new tests cover all slider effects/neutral bounds, alpha, disconnected islands, brush sharpening/cancel, selected-layer preview/apply/Save-Open/Undo-Redo, stale/checkpoint refusal, explicit image conversion/Undo, actual UI access and one-step combined Colour/Roughness/Metalness Sharpen. Development-host 1024 helper sample: first spatial+tone render ~494ms, cached mixed ~129ms, cached detail-only ~49ms; excludes UV-domain construction and is NOT iPad frame-time evidence. Optimized away per-pixel iterators and caches filter targets. First spatial preview may pause; native device responsiveness remains a gate.

Add docs/paint-adjustments-1071.html to exercise the production modal/pixel helper on a generated browser sample without touching the app project; actual scene/history integration is separately tested above. Hosted Topology 41623847723 (job 125876122694) passed 3,148 / 3,148, zero failures. Pages 41623847372 succeeded. Runtime bf16f04a84780fce20c346eb047bee96843479ef, tree c6e612c1029ea1dda746fd347c5da6da5179c3d0: live version.json, index.html, viewport Paint UI/core, original paint kernel, both adjustment modules and browser fixture byte-match the checked source. 61 unique focused cases passed across successful focused runs. Real Chromium production-modal fixture confirms all 15 sliders, completed brightness and combined Exposure/Blur/Sharpness/Definition previews, Before disables Apply/restores original, Reset clears controls without edits, Cancel retains zero edits, and Apply closes with exactly one edit. Screenshot docs/paint-adjustments-1071-proof-1793703817744.jpg shows all 15 control names, explicit image-conversion notice and reachable footer. This generated-sample fixture validates real DOM/controls/pixel helper; actual painter resource/history/Save-Open and image conversion are covered by integration tests, not a claim of native iPad/WebGL acceptance. Native iPad responsiveness, Sharpen gestures and global layer adjustments remain pending; .1070 import and .1068 layer layout device gates remain pending.

Device: Paint radial â†’ Sharpen; compare edge detail, Size/Opacity/Amount, combined channel previews and Undo. Layers â†’ selected layer settings â†’ Adjust layer; try tone/colour and Blur/Sharpness/Definition; Before, Reset, Cancel; reopen and Apply then one Undo/Redo. Image conversion warning, mask/blend/other-layer preservation, Save/Open, Done/reopen and Pencil/finger navigation. Next: native adjustment/import/layout feedback before deferred height benchmark work. Standing direct-main commit/push/Pages authorization remains active.

## .1070 â€” proportional incoming Paint image resize â€” 3 November 2026

User .1069 PASS protects approved three-box Safari/Home Screen icon installation and launch. No separate .1068 native Paint-row layout PASS inferred. User requests incoming images larger than 1024 Ã— 1024 fit proportionally with longest side 1024, and asks whether files are live linked.

Audit: authoritative paint-image-source owns PNG/JPEG header preflight, browser decode, exact encoded bytes and decoded pixels; original File input refused >2 MiB or >1024 per side. Image recipes embed source bytes/pixels in the existing project pools: no path/URL live link. Add importResizedPaintImage in that same stateless module for the file-input path only. Strict inspectPaintImage/capturePaintImageSource/importPaintImage stay bounded to the original 1024-side/2 MiB stored source, and alpha tip size/bytes are unchanged. Existing image layers, save/export and projection owners remain authoritative.

Incoming files are preflighted before decode: PNG/JPEG, at most 16 MiB encoded, 8192 per side and 24 Ã— 1024Â² pixels. Small images within stored budgets use the exact original import with no enlargement/re-encoding. Otherwise snapshot source before await; request high-quality bounded ImageBitmap, explicitly fit via canvas even if resize options are ignored, encode PNG with alpha or JPEG at .92 quality, validate stored dimensions/format/2 MiB budget, release bitmap/canvas and decode the normalized encoding through the existing importer. JPEG retained pixel cache therefore matches its saved lossy encoding. No crop, stretch, new EXIF/orientation policy, live-link mechanism, resource schema or pool-budget increase. Normalized PNG that still exceeds 2 MiB is refused with explanation; unsupported/truncated/extreme inputs refuse before allocation or leave the scene unchanged. Existing stale request/selection/session guard remains in the File input.

Only viewport Paint uses the new .1070 importer URL. Existing alpha/capture consumers retain their .907 stateless URL and original semantics; reviewed hashes for the shared file are updated for both URLs. Parent viewport Paint .1070 and release/cache chain refreshed; .1066 core, .1068 layer CSS, gestures/camera/gizmo, icon assets and protected Multi1.0 retained. Add isolated docs/image-import-resize-1070.html for real browser PNG/JPEG scaling, alpha, row orientation, small-source byte equality and reopened pixel checks; no project/WebGL mutation.

Validation: focused importer/source/alpha/UI/image-layer/Base/history/project/NOM and release checks pass (individual runs 29, 17 and 9, zero failures; overlapping coverage). New importer tests exercise landscape, portrait, square, rounding/one-pixel aspect, exact small images, ignored decoder resizing, HTML and Offscreen encoder paths, JPEG storage/cache, before-await snapshot, bounds and failure cleanup. Real Chromium browser fixture: 4 / 4 PASS for PNG 2048Ã—1024â†’1024Ã—512, PNG 1200Ã—2400â†’512Ã—1024, JPEG 4032Ã—3024â†’1024Ã—768 and unchanged PNG 64Ã—32. Actual browser encoders/decoders verified row orientation, PNG alpha, exact small-source bytes and reopened normalized pixel equality. Screenshot docs/image-import-resize-1070-proof-1793698823423.jpg. Hosted Topology 41612660143 (job 125838188025): 3,140 PASS / 0 FAIL. Unique focused cases 43 PASS / 0 FAIL. Pages 41612658677 succeeded. Runtime 11584f64f44e2b63a73e7cec2f731c6905b605c8, tree 7b7ec1f34cf879d0654f39543dc87a3665960fba: live version.json, index.html, viewport-paint.js, paint-image-source.js and browser fixture byte-match the checked source. Native iPad import/placement/Save-Open acceptance remains pending. .1069 Home Screen user PASS protected; no additional .1068 layout PASS inferred.

Device: + Image with a large landscape and portrait PNG/JPEG; proportions remain correct, no cropping. Place/Apply, Undo/Redo, Save/Open and Edit image; stored copy remains embedded. Try a transparent PNG and a small image; alpha stays and small images are not enlarged. Input safety caps above remain. Next: native image-import feedback; .1068 layout acceptance and .1064 height timings remain pending. Standing direct-main push/publish authorization remains active.

## .1069 â€” approved three-box Home Screen icon â€” 3 November 2026

User approved the edited Three Box Symbol (green upper hollow box, blue lower-left, red lower-right, bottom-centre notch) and requested it for File â†’ Add BoxLab to Home Screen. Protect this artwork choice; this approval is NOT a device PASS for the .1068 Paint layout repair, whose native acceptance remains pending. .1066 and earlier functional PASSes remain protected.

Audit: src/pwa-install.js already owns the File button, deferred native beforeinstallprompt and Safari Share â†’ Add to Home Screen guidance. Preserve that owner and its exact source/pin. index.html and manifest.webmanifest still referenced the old .28.3 SVG. Replace active links with opaque square PNG exports of the approved image: 180px apple-touch-icon, 192/512px manifest icons and 32px favicon in icons/boxlab-1069-*.png. Versioned filenames and refreshed manifest URL avoid reusing old icon URLs. Keep relative start_url ./, standalone display, background/theme and original install path. Add apple-mobile-web-app-title BoxLab. No fake native install, share-sheet interception, new handler or service worker. Retain legacy icon.svg and frozen betas without changes; they are no longer active main-shell icons.

Export only: direct proportional downsampling of the approved raster, opaque RGB, no artwork regeneration/crop/rounding. icons/README.md records provenance and sizes. Only release/cache metadata in drawer-ui/face-workflow-layout and screen comparison updates; protected Paint UI/core, camera, gizmo, edge tools and Multi1.0 retain accepted bytes/pins. Reviewed asset contract includes all installed PNGs and refreshed manifest/parent loader URLs.

Validation: 15 focused release/cache/identity/frozen tests PASS, zero failures. Actual original install owner executed in a VM: Safari guidance, deferred native prompt once, then Safari fallback PASS. All four PNG signatures, declared dimensions, 8-bit RGB/opaque format and manifest start/display checked. 180px export visually reviewed. Hosted Topology 41606348676 (job 125817017568) passed 3,133 / 3,133, zero failures. Pages 41606347317 completed successfully. Runtime f732a77e03d3e5aab499fc35c328b533dfbce3c7, tree 944a598cf334315239edb605522ed5761f3bf110: live version.json, index.html, manifest.webmanifest, all four PNG icons and shell-comparison.js byte-match the checked release. Native Safari Add to Home Screen preview/launch acceptance remains pending; .1068 Paint layout device gate remains pending.

Device: open .1069 in Safari, File â†’ Add BoxLab to Home Screen, then Safari Share â†’ Add to Home Screen; preview must show the approved three-box icon and BoxLab name. Add it and launch the Home Screen web app. Existing saved shortcuts may retain their previous icon; test a newly added shortcut rather than promising automatic replacement. Also confirm .1068 Paint layer rows remain readable/scrollable with settings open. Next: native install-icon/layout feedback, then deferred .1064 height timings. Standing direct-main push/publish authorization remains active.

## .1068 â€” expanded Paint settings without compressed layer rows â€” 3 November 2026

User FAIL .1067: screenshot shows layer rows compressed into thin strips after removing the Selected layer settings disclosure. Do NOT protect .1067 layout as accepted; .1066 Base/mask/channel tools and earlier interaction PASSes remain protected. Keep the requested settings open rather than reinstating a disclosure.

Audit: Layers is a height-capped CSS grid with an overflow-auto layer list. Expanded section consumes intrinsic space while default auto grid tracks allow the scrollable list and overflow-hidden row tracks to shrink toward zero. The previous DOM/state tests and green full suite did not verify CSS row dimensions and missed this failure. Repair only existing viewport-paint CSS: max-content auto rows/start alignment in the outer Layers grid, max-content rows plus 52px minimum in the list, and 52px minimum row height. Retain 42vh panel/200px list caps and scrolling, right dock, open settings, control IDs/listeners and protected .1066 core/pin. No new panels, gesture/layout polling or modelling changes.

Add docs/paint-panel-layout-1068.html as an isolated rendering regression fixture, not a second Paint UI owner. It extracts current Paint Layers markup/styles and uses the actual createPaintLayerList module in four independent 320Ã—620/320Ã—450/220Ã—450 iframe cases with 2/4 rows. Reports real computed row heights, list viewport and reachability of the last row/settings; comparison removes only the repair rules to reproduce .1067 sizing. No project/WebGL required. Cloud browser cannot create WebGL; fixture is needed for real browser sizing evidence. Local Chromium download was unavailable (truncated vendor download); no claim of native iPad reproduction from DOM mocks. Focused checks: 38 PASS / 0 FAIL across actual layer/Base/mask UI, contact/palette and release/cache wiring. Real Chromium layout fixture: all four 2/4-row compact cases PASS with 52px rows, 107/200px list viewports and last-row/settings reachability. Removing only the repair rules reproduced .1067 in every case: 2px rows and a zero-height list viewport. Browser proof: docs/paint-panel-layout-1068-proof-1793692954936.jpg. Hosted Topology 41599816025 passed 3,133 / 3,133, zero failures; focused checks 38 PASS / 0 FAIL. Pages 41599815167 succeeded. Runtime 9d40c1407400c5f44bd64939bcb0e27b8f1a402d: live marker, shell, Paint UI and layout fixture byte-match the release tree. Native iPad visibility/scroll acceptance remains pending; .1067 remains FAIL.

Device: Paint with 2â€“4 layers shows full readable rows, names/thumbnails and selection; scroll list/panel to lower layers/settings; settings remain open, footer/Done reachable; Done/reopen and ordinary mask/paint smoke. Next: native compact/iPad layout acceptance before returning to deferred height benchmarks. Standing push/publish authorization remains active.

## .1067 â€” selected layer settings stay open â€” 3 November 2026

User .1066 PASS protects Base â†’ Layer, maskable Base paint, shared scalar stencil, combined Colour/Roughness/Metalness tools and earlier accepted Paint/camera/layout/edge behaviour. User requests Selected layer settings always open instead of a pull-out/disclosure.

Audit found one native details/summary in viewport-paint.js, plus two callbacks forcing it open. Replace only that wrapper with a labelled section and heading, preserving the actual controls, IDs, listeners, layer-list focus shortcuts and scroll bounds. Remove the two obsolete open assignments. Existing context eligibility remains: colour layer settings are hidden for scalar-only channel editing, and invalid/Base/AO actions retain original disabled states. No painter core, masks, history, resource, geometry or gesture changes; painter-core .1066 source and cache pin retained. Existing UI tests now assert section visibility instead of disclosure.open.

Focused checks: 38 PASS / 0 FAIL across actual Paint layer/mask/Base UI, contacts, palette and release/cache contracts. Hosted Topology 41588914712 passed 3,133 / 3,133, zero failures; focused checks 38 PASS / 0 FAIL. Pages 41588914085 succeeded. Runtime 7cae3dc4a1dda76912e68444cdccd16f852d6b74: live version.json, index.html, viewport-paint.js and shell-comparison.js byte-match the release tree. User .1066 PASS remains protected; device confirmation of the non-collapsible settings presentation is pending. Device: enter Paint and see Selected layer settings without expanding; select Base then an overlay and use Base â†’ Layer/+ Mask or opacity/blend; Done/reopen leaves settings expanded and footer reachable by scrolling. Next: device feedback; collect real .1064 height decode timings before displacement preview work. Standing push/publish authorization remains active.

## .1066 â€” lift Base paint to a maskable layer â€” 2 November 2026

User additionally requests making Base into its own layer so it can be masked. Audit: Base is deliberately opaque/unmaskable; existing appendPaintLayer/captureLayeredColourResource and original layer mask can represent the requested result without a schema change. Add one Base â†’ Layer command in Selected layer settings, visible only with Base selected in Colour. It lifts exact Base pixels into an opaque normal Base paint overlay, inserted BELOW every existing overlay, then leaves an opaque white backing. Composition remains byte-identical until layer/mask edits. Original masks, blend modes, image recipes, ordering, scalar maps and native UVs remain untouched. The new layer is selected and normal + Mask becomes available.

The existing painter owns all selection, preflight, checkpoint and resource publication; original stack/compositor/source pins are retained. One Undo restores old Base and Redo restores the editable layer. Preserve three-overlay cap and pool budgets: full stack disables command with merge/remove guidance. Quota/checkpoint/stale/scalar and staged-image refusal preserve resources, current placement and history. An explicit user conversion can create a white layer from an empty white Base; no automatic source image baking or UV change is implied. .1065 tool/channel/shared-stencil behaviour remains included; all earlier protected device PASSes remain.

Focused checks passed for 512/1024 exact before/after pixels, mask hide with raw pixels retained, Undo/Redo, Save/Open, decoded NOM pixels, mixed/masked/image overlay recipes/order, full-slot/quota/checkpoint/stale refusal, actual UI and staged-image preservation. Final focused validation: 54 PASS / 0 FAIL, including Base conversion, shared masks/channel tools, merge/image handling, contact/camera/layout/edge protections and release/cache contracts. Hosted .1066 Topology 41444218912 passed 3,133 / 3,133 (zero failures); final focused checks 54 PASS / 0 FAIL. Pages 41444218237 succeeded. Runtime 0e83c6fd9b1c5da250226fe8ef7a81a8d17ddf93: live version.json, index.html, viewport-paint.js, viewport-paint-core.js and shell-comparison.js byte-match the release tree. Native device acceptance for Base conversion and the included .1065 combined tools/shared stencil remains pending. Device: select a painted Base colour â†’ Selected layer settings â†’ Base â†’ Layer; appearance stays, Base paint selects; + Mask â†’ Hide/Reveal/Grey. Undo/Redo and Save/Open. Also test .1065 Fill/Eraser/Smudge/Blur with Colour plus Roughness+Metalness, map previews, Done/reopen and navigation. Next: device feedback on Base/masks and combined tools; .1064 height benchmark still awaits real iPad source timing before displacement preview work. Standing push/publish authorization remains active.

## .1065 final release validation â€” 2 November 2026

Runtime 47d806a621a45ce0a238d782d412179fbbff3dd7. Focused 80 PASS / 0 FAIL. Hosted Topology 41442368061: 3,127 PASS / 0 FAIL. Pages 41442366714 succeeded; live marker, shell, Paint UI, Paint core and screen comparison match the runtime tree. Native device acceptance remains pending. User added maskable Base requirement during publication; .1066 includes this accepted implementation scope, not a claimed device PASS. Shared stencil scope remains as explained to user: current colour-layer mask limits NEW scalar edits and does not retroactively hide/reveal committed scalar maps.

## .1065 â€” all-channel Paint tools and shared mask stencil â€” 2 November 2026

User requests Brush's combined Colour/Roughness/Metalness choice for Fill, Eraser, Smudge, Blur and Mask; explicitly chooses Shared mask over separate masks. User was informed before implementation: reuse the selected colour-layer mask as a stencil for NEW scalar edits; Colour retains existing non-destructive layer-mask behaviour, while previously committed scalar paint is not retroactively hidden/revealed by later mask edits. No independent per-channel masks or scalar-layer schema is introduced. This scope is visible in Mask UI/help. .1063 Paint/displacement inspection PASS and earlier interaction, layout, camera/gizmo and edge-tool PASSes remain protected.

Audit found multiPaintChannels restricted to action==='paint'; Fill did not retain scalar scratch layers, filters and smudge pickup only ran on the primary layer, and quick tool controls moved the channel dropdown but left combined toggles behind. Extend those existing owners: same single stroke/history transaction, per-channel raster layers, original face/facegroup/hold grow/shrink coverage plans, resolution-specific original filter domains, and pickup/work-budget resets on every selected channel. Eraser restores Roughness255/Metalness0 while retaining original Colour erase semantics. 1024 colour radius scales to the 512 scalar UV footprint (minimum one scalar texel). All secondary resources validate/preflight before one checkpoint; cancel, source loss, channel changes and checkpoint failures retain committed maps.

Reuse the existing selected-layer mask for new scalar edits: blend scratch R8 against committed values using shared mask coverage; 1024 masks area-average their 2Ã—2 samples into 512 scalar pixels, honour enabled/inverted, and omit blocked no-op resources/history. Lit/scalar preview matches the filtered result; no-mask preview keeps the original direct RGBA path. Mask add/edit/remove accepts scalar mode when an overlay is selected, retaining the existing above-Base requirement. Hide/Reveal/Grey Brush commands prepare Brush through the original action-change/cancellation owner, so a preceding Blur/Fill cannot silently remain active while painting the mask. Combined toggles are reparented into each tool's quick controls and Mask page (original nodes/listeners); Material header preserves active tool and radial Material still prepares Brush per protected contact repair. Existing scalar export/project pools, raw resources, compositor, kernels, contact/camera and history owners retained; no resource/schema version changes. Updated three former tests that expected scalar masks to be inaccessible or ignored; all unrelated assertions remain.

Focused validation: 80 PASS / 0 FAIL across actual combined tools, shared stencil, independent scalar equality, face/group/hold coverage, UI contact, masks, filters, quotas, history/cancellation and release/cache/protected camera/edge/layout checks. Hosted .1065 regression and deployment succeeded; see final validation above. Device: Colour primary â†’ enable Roughness+Metalness in Fill/Eraser/Smudge/Blur controls; use contrasting multi-channel marks for filters, inspect map previews. Test Face/Object Fill, then one Undo/Redo for all maps. On an overlay add shared Mask, hide/reveal/grey, then make new scalar/multi-channel edits and toggle inversion. Done/reopen, Material colour change, continuous Pencil painting, finger orbit and gizmo smoke. Scalar edits already committed remain unchanged when editing the stencil. Next: device feedback on tools, then collect .1064 native height timings before any displacement preview implementation. Standing push/publish authorization remains active.

## .1064 final release validation â€” 2 November 2026

Runtime 0020409bcb96ac57633994fc4d2c5c2a5886cbb9. Focused 37 PASS / 0 FAIL; hosted Topology 41439672043: 3,115 PASS / 0 FAIL. Pages 41439671709 succeeded; live marker, shell, native-height benchmark HTML/UI/helper and PNG owner byte-match the release. Native device benchmark results remain pending. User steered ongoing work to all-channel Paint tools before device testing this benchmark; no device PASS inferred for .1064.

## .1064 â€” isolated native height decode benchmark â€” 2 November 2026

User PASS after the disposable-cube unwrap/Paint check closes .1063 Paint device acceptance. Protect accepted Colour/Metalness/Roughness Paint alongside .1063 native displacement inspection, .1062 convex edge-tool picking, .1061 right Layers/object-following palette, .1059 Material contact recovery and .1057 editor-camera/gizmo ownership. Earlier .1063 pending-Paint notes are superseded by this PASS.

Audit: retained native images/settings already have authoritative owners. Preserved .1041 feasibility page tests generated 8-bit maps, not raw 16-bit heights. No production height decoder existed; extend the existing nomad-scalar-png owner using its CRC table and Paeth predictor. New decodeNomadHeightPNG returns exact 8/16-bit grayscale integer samples, original row order and raw min/max, with bounded streaming inflation, CRC/chunk/order/filter checks, 8 MiB encoded/2048-square caps. Unsupported colour/alpha/palette/interlace/animation is refused. No gamma, resampling, material strength/midpoint, projection or world-space conversion is applied. Existing PNG export/opaque-colour function bytes and app consumer pins remain unchanged; only the isolated benchmark imports the new .1064 export. This avoids refreshing the accepted Paint/render graph for an unused export.

New docs/native-height-benchmark-1064.html reads local NOM/PNG; NOM uses readNomadImport and explicit material displacement slots, without parsing geometry, requiring UVs or touching the open app. NOM limits remain 128 MiB container/24 MiB retained images/256 materials; selected PNG decoder adds its smaller source cap. Three decodes yield between runs and stop AFTER a run exceeds 1.2 seconds; not a hard interruption. Report includes original settings, exact bit depth/range/low-byte count, decode samples and known array bytes (not total memory). Tiny bundled 2Ã—2 sample checks all four exact 16-bit values each run and is explicitly not performance evidence. Device/source timing must be sent back before the next preview decision. No viewport displacement ships; .1041 benchmark and original subdivision/renderer remain untouched.

Focused validation: 37 PASS / 0 FAIL across lossless height/PNG/export/inspection/UI, release wiring and protected Paint/camera/edge targeting. Hosted .1064 regression and deployment succeeded; see final validation above. Device: open the native height benchmark from File â†’ Screen comparison / test list (or direct link), verify tiny sample, choose a native NOM containing displacement (no unwrap), measure and Copy report. Unsupported formats must explain refusal. Optional accepted Paint/camera/convex Split smoke. Next: assess real iPad height decode timings together with the existing geometry/render feasibility results before any bounded displacement preview; preserve original renderer/SubD owners, UV seams and native material transforms.

## .1063 device PASS â€” 2 November 2026

User confirms PASS for native NOM displacement inspection. Protect its displayed retained source settings and unchanged raw maps. Paint regression is NOT device-accepted in this build: the test object lacks a suitable UV unwrap, so Paint could not be tested. Prior accepted Paint behaviour remains protected. For an isolated Paint smoke test use a fresh disposable cube, Object radial â†’ UV â†’ Face atlas, then UV Paint. Do not replace the imported displacement sample UVs merely to test Paint; retained textures depend on them. Runtime remains .1063; no code changes.

## .1063 â€” native NOM displacement inspection â€” 2 November 2026

User .1062 PASS is protected: native convex edge picking within Split and other edge tools, canonical Offset loader, accepted Paint layout/contact and UV help. Standing authorization to validate, commit and push each BoxLab stage directly to origin/main and Pages remains in force.

Audit found native displacement images/settings already retained by nomad-material-resource and displayed raw by the UV image adapter. Existing adapter now appends retained source strength, midpoint, world-space flag, projection and exact source image byte count to Displacement inspection status. Missing fields explicitly say not recorded; no invented defaults, world-unit conversion, map extraction, image resampling or 3D displacement preview. Raw tile/mapping warning remains. Original bytes and metadata remain authoritative; triplanar is reported rather than applied. No new decoder, renderer, subdivision or modelling owner.

Focused validation: 34 PASS / 0 FAIL. Hosted Topology 41425188802: 3,107 PASS / 0 FAIL. Pages 41425187798 succeeded. Runtime commit dc33b47b03dc2cef5ae7bdc776bbbfd45caf69da; live version.json, index.html, nomad-uv-image-choices.js, uv-workspace.js and mesh-health.js byte-match the release tree. Native device acceptance remains pending. Device: import a native NOM with displacement, open UV Editor, enable image reference and select Displacement; inspect settings and raw-map warning; switch maps and reopen; confirm Paint and convex Split remain accepted. Next: benchmark-gated displacement preview planning using existing subdivision/UV owners, with no heavy preview before performance acceptance.

## .1062 â€” native edge picking inside edge tools â€” 2 November 2026

User .1061 PASS protects right Layers dock and object-following Paint palette, plus accepted Paint and UV help. New request: SELECT EDGE â†’ SPLIT â†’ SELECT EDGE still misses convex edges; audit other tool-then-edge actions for the general selection fix.

Audit confirmed .954 main edge-screen-picking ranks rendered cage lines by CSS-pixel proximity, then depth; Split and direct Bevel still used world-radius raycast depth ordering. Edge Extrude had the same old picker; Edge Slide and Offset Loop tested selected proxies in selection-list order. Those existing owners now prefer __boxlabSelectionBridge.pick('edge',event), including native misses; selected-edge drag starts require the native winning edge to belong to the selection. Existing world-radius fallback remains only when no native bridge picker is available (standalone/bootstrap compatibility). No new picker/kernel, threshold, gesture or history owner. Loop Cut already uses main's native picker; Edge paint and component-toggle already share it; Sweep Follow Edges and Add Vertex use screen-distance snapping for their distinct cross-object/point payloads, so no equivalent world-depth picker was replaced there. One-shot Rotate/Collapse act on preselection. Legacy edge-toggle-repair is not loaded.

Offset Loop had two module URLs (drawer .671 and loose-bootstrap .0.32.19). Both now resolve the same .1062 URL so UI listeners/module execute once. Refreshed the bootstrapâ†’uniform-insetâ†’multi-face-direct cache chain only; modelling logic and protected Multi1.0 remain unchanged. Split's retained fixed old cache assertion now checks its reviewed runtime asset reference.

Regression executes each actual tool picker on the supplied .954 convex OBJ (twelve previously depth-stolen midpoints) at 0.1/1/10 scales, verifies native misses and rejects neighbouring unselected edge steals. Actual Split buttonâ†’two native edge taps commits exactly one canonical insertFaceSegment split and preserves exact History Undo/Redo snapshots. Final focused run: 115 PASS / 0 FAIL across tool/native convex picking, Split transaction, tool eligibility/session behavior, cache/release wiring, UV help and protected Paint layout/contact. Hosted Topology `41422973800` passed 3,106 / 3,106. Pages `41422972772` succeeded; live `.1062` marker, shell and all five repaired tool modules match the release commit. Device acceptance pending for convex Split taps, other edge-tool targeting, Undo/Redo/exit/navigation and accepted Paint layout. Device: Split two opposite convex-face edges, repeat after orbit/zoom; Bevel/Edge Slide/Offset Loop and boundary Edge Extrude pick the edge under the Pencil; Undo/Redo, Done/background exit and navigation; quick accepted Paint layout smoke. Keep eligibility/face adjacency/boundary checks intact.

## .1061 â€” right Paint layers and object-following palette â€” 2 November 2026

User .1060 PASS protects UV help/Projection help, accepted Paint .1059 and .1057 camera/Done-reentry behavior. New user request (annotated screenshot): Layers on the right like the object menu; open Paint radial clear of the object and follow it like the gizmo.

Audit: one tool-session-ui Paint dock owns original panel/layers/footer; viewport-paint owns palette, drag handle and frame loop. Existing gizmo projection patterns use the editor camera but no reusable object-bounds layout helper exists. Move the existing Paint-only dock to right:8px/left:auto; other session placement/restoration stays authoritative. Add presentation-only paint-palette-layout helper: cache editable mesh bounds once at Paint open, project eight corners through the authoritative camera, prefer placement to the left, choose another side to avoid model/right panel/selection controls when space allows, clamp to viewport when cramped. Reuse Paint's frame loop for view-following; keep a dragged palette offset relative to the object. Recompute placement for wheel/material/control sizes; freeze auto-placement during live strokes/drag and focused native material-input editing; new Paint session resets safe placement. No new frame loop, gesture owner, modelling kernel, pivot or history owner. Model itself is never moved by placement.

Final focused run: 94 PASS / 0 FAIL across Paint layout/contact/material workflow, right dock, object radial, UV help and release/cache wiring. Real Three camera projection test covers pan/orbit/zoom, dock avoidance, bounds and no vertex mutation. Real Paint UI test covers frame following, manual offset, resize, Done/reopen and unchanged history/navigation state. Updated former left-dock assertions to explicit right-dock expectations requested by user; preserved footer/listeners/ordinary-session checks. Hosted Topology `41419359928` passed 3,103 / 3,103. Pages `41419359664` succeeded; live `.1061` marker, shell, viewport-paint.js, tool-session-ui.js and paint-palette-layout.js match the release tree. Device acceptance pending for right Layers dock, palette clearance/following, manual drag and accepted Paint workflow. Device: Layers at right; open Tools beside model; orbit/pan/zoom with menu visible; drag menu then move view; Material/Metalness continuous paint and Done/reopen; quick UV help smoke. On cramped screens placement minimizes overlap while keeping controls reachable.

## .1060 â€” touch-accessible UV help â€” 2 November 2026

User /nextbuild selects the queued UV help slice after .1059 device PASS. Audit found long gesture footer in uv-workspace.js and projection notes in mesh-health.js; no shared generic help owner exists. Use native details/summary disclosures in those original surfaces, with touch/keyboard activation and visible focus; no extra popup layer or gesture owner. UV help contains existing navigation/history instructions, dynamic Move/Scale/Rotate Pencil hint, map-reference and layout-action explanations. Escape closes help before exiting the editor; help closes on workspace exit and resets collapsed on entry. Projection help exposes method guidance previously in long notes/native titles. Base-only/replaces-UV/clear-paint warnings, 4096-face and 20,000-corner caps, curved-face stretching warning, clear-paint consequences, dynamic errors/status and action labels stay visible.

Original canvas/control ownership, header/Back to 3D, selection, UV transforms, Undo/Redo and Paint remain intact. Paint .1059 source and cache pin are unchanged; its device PASS and protected Multi1.0 remain protected. Focused run: 97 PASS / 0 FAIL, covering workspace help/Escape/close/reopen with unchanged view/history, UV transforms/navigation, atlas/projection, workspace layering, Paint contact/Material recovery and release/cache wiring. Hosted Topology `41387557443` passed 3,101 / 3,101. Corrected Pages `41387557387` succeeded; live `.1060` marker, index, UV workspace and Mesh Health match the release sources. Device acceptance pending for UV help, Projection help, return/reopen and accepted Paint smoke. Device: open UV Editorâ†’expand UV helpâ†’switch Move/Scale/Rotateâ†’close helpâ†’pan/pinch/UndoRedoâ†’Back to 3D and reopen; UV or Mesh Healthâ†’Projection help while warnings remain visible. Then quick accepted Paint Material/Metalness smoke.

## .1059 device PASS â€” 2 November 2026

User confirms PASS after the Material colour-edit contact repair. Protect the tested Materialâ†’colour changeâ†’continuous Metalness paint, repeated strokes/colour changes without Done, and retained .1057 camera/gizmo/Done-re-entry behavior. .1058 remains a historical failed attempt, superseded by .1059. Runtime remains .1059; no new app build from this acceptance entry. Hosted regression: 3,100 PASS / 0 FAIL; published runtime cc84d1ed2d41a9d54c5aab0dd0af52de1d7d1c98.

User asks what is next, without /nextbuild. Recommended next narrow build follows the recorded .1043 queue: audit existing UV Editor and Mesh Health UV help, then move long gesture instructions into touch-accessible contextual help using existing owners. Keep action labels, errors, scope/cap warnings and Paint PASSes intact. Later resume the native NOM displacement payload/settings audit before any displacement preview, with performance benchmarks before heavy subdivision work. No new runtime implementation authorized by this status question alone.

## .1056 â€” Total Gizmo follows Pencil orbit in UV Paint

- [ ] In UV Paint, change among Brush, Eraser and Smudge; paint after each change.
- [ ] Orbit the model with Pencil while Paint is active. Confirm the Total Gizmo remains aligned with the selected object during the orbit and after Pencil lifts.
- [ ] Press Done. Confirm the full gizmo is still over the object; Move, Rotate and Scale remain usable.
- [x] Preserve Roughness/Metalness preview and live-update PASS, separate Paint channel/toolbars PASS, Smudge improvement PASS, and prior Metalness-only shadow PASS.

First hosted `.1056` CI run failed on 33 legacy fake-camera calls and one stale release-version pin. The compatibility guard and pin are corrected; record the rerun before device acceptance. No local tests were added or run.

## .1055 â€” combined-map shadows, Paint hit routing and gizmo recovery

- [x] Pages reports `.1055`; live release marker and cache-busted runtime assets match `main`.
- [x] Hosted Topology `41296990402` passed 3,096 / 3,096 after restoring the offline evaluation fixture reference.
- [x] UV Paint â†’ Layers Roughness/Metalness previews and live updates PASS; retain this behavior.
- [ ] Compare Studio shadow contrast for Metalness-only and Colour+Metalness. Confirm metal-only retains its PASS and combined maps regain the stronger shadow contrast.
- [ ] In UV Paint, switch Brush â†’ Eraser/Smudge â†’ Brush and paint the same visible face after each change; confirm strokes do not fall through to orbit.
- [ ] Pencil-drag empty background to orbit; reselect the object and confirm the complete Total Gizmo and Move/Rotate/Scale handles return and work.

## .1054 â€” release identity repair and material map previews

- [x] Roughness and Metalness map previews display correctly.
- [x] Map previews update correctly while painting.
- [ ] Combined Colour+Metalness shadow contrast; Pencil brush switching/orbit; complete Total Gizmo after orbit (carried into .1055).

`.1053` Pages (`41293655018`) succeeded and live files matched `main`. Its hosted Topology run had 3,094 PASS / 2 FAIL: the `.1041` preserved-release check still expected `.1052`, and shell-comparison headings remained `.1052`. `.1054` updates the visible labels and preserved release assertion; prior logs remain accepted. No local tests were run or added. Commit `889ab5a226245cd62a030a8baf415b881c61f716` is on `main`; Pages `41294085210` succeeded; live `.1054` index, shell-comparison and runtime asset manifest match `main`. Hosted Topology `41294085728` is still running. Verify live assets and hosted regression before hands-on checks.
---

# BoxLab manual test checklist

## .1049 â€” stronger painted Metalness shadows and stable Pencil Paint/orbit handoff

- [ ] In Studio, paint Metalness on a surface with no Colour map. Confirm the shadow remains visible and has stronger contrast than .1048.
- [ ] Repeat with both Colour and Metalness maps. Confirm both painted responses and the shadow remain visible; compare shadow strength with metal-only.
- [ ] In UV Paint, paint a stroke, switch among Brush, Eraser or Smudge, then paint again on the mesh. Confirm the second stroke paints rather than orbiting.
- [ ] In UV Paint, Pencil-drag empty background to orbit, then rotate the object with Total Gizmo. Confirm orbit does not leave the gizmo unusable.
- [x] Separate material-channel painting and Paint toolbars PASS; .1048 combined Colour+Metalness shadow presence PASS with reduced strength noted; .1047 metal-only shadow case PASS; .1046 Smudge PASS remain protected.

Automated .1049 coverage: focused material/Pencil/gizmo/shell/release set 42 PASS / 0 FAIL; full Node suite 3,096 PASS / 0 FAIL / 0 skipped (296.37s). Changed JS syntax, reviewed runtime pin/hash contract, protected Multi pin, and `git diff --check` pass. Hosted Topology regression `41289594202` passed. Pages run `41289594359` failed twice because GitHub says the prior `.1048` deployment is still in progress; live `version.json` remains `.1048`, so .1049 is not yet available for device testing. Focused regressions exercise `.55` Metalness fill with both shadow flags, active-Paint mesh Pencil routing after brush changes versus background orbit, matching-pointer gizmo cancellation, and preserved gizmo rotation behavior. Native iPad rendering and Pencil feel must be confirmed after Pages is unblocked and the checks above can be run.


## .1047 â€” separate Paint channels and metal-only shadow

User confirms painting Metalness and Colour through their separate channels/toolbar flow PASS. The Colour-map case with Metalness loses the shadow; `.1048` fixes that combined-material path. The orbit test was not reported again and remains a hands-on check.

## .1046 â€” Metalness shading and stronger Smudge â€” user report

The .1046 Metalness-only shading claim did not pass on device: the user saw no shadow following Metalness painting without a Colour map. The stronger Smudge behavior passed and is protected. The .1047 shadow contrast repair addresses the reported case.


## .1045 â€” combined material strokes and UV Paint input/menu fixes â€” user PASS protected

User replied **1045 PASS** on 1 November 2026. Protect combined scalar strokes, Lit Paint preview, Pencil orbit, direct Brush menu and the .1045 Smudge behavior. The report also identifies a Metalness-only Studio shading restoration defect and asks for stronger Smudge; .1046 covers these fixes.


- [x] Open the Brush radial action. It should go straight to **Material & Paint**; the
  previous Brush controls screen should not appear first. Confirm Colour, Roughness,
  Metalness, brush size, stroke opacity and tip controls are present.
- [x] Enable â€œAlso paint in this strokeâ€ for Roughness and Metalness. Paint one Colour
  stroke, then deselect the object and confirm the three maps remain visible together.
  Undo once should remove all changes; Redo should restore all three.
- [x] Select Roughness and Metalness as the primary paint channel. Confirm preview stays
  Lit. Exit Paint with Done and confirm the normal Studio/Solid appearance and shadows return.
- [x] In Paint, move Pencil over empty viewport background and orbit; then paint a surface.
  Confirm a finger still orbits/pans/zooms and a finger already navigating blocks a new Pencil
  contact until it lifts.
- [x] Paint across two colours with Smudge. Drag from one into the other and confirm the
  mixed colour travels with the brush; test a connected folded edge and confirm it does not
  sample unrelated UV islands.
- [x] Open Fill, Eraser, Smudge and Blur from the wheel. Confirm each panel contains only
  its relevant controls, Tools returns to the wheel, and the floating palette remains draggable.

Automated .1045 validation: full Node suite 3,091 PASS / 0 FAIL / 0 skipped before the final
in-place Smudge reservoir allocation optimization. Final post-optimization focused material,
Smudge, release identity and shell checks passed 34 / 34. The broader Paint, Pencil-navigation
and cache-contract set passed 43 / 43 before that allocation-only optimization. Syntax checks
and `git diff --check` pass.
The user has now confirmed native .1045 behavior PASS. The Metalness restoration and Smudge strength reports are tracked under .1046.

Published on `main` as commit `a505c803f92da39b07747d4acb53b2aa31a7d2b3`; Pages `41257090423` and Topology regression `41257090347` succeeded. Version/shell and all nine changed or loader runtime modules byte-match cache-busted live files. Native iPad acceptance for .1045 is confirmed PASS; .1046 device acceptance is pending.


## .1044 â€” UV Paint material & values menu â€” device test pending

- [ ] Enter UV Paint and confirm preview remains Lit material mode. Choose Colour,
  Roughness and Metalness as paint channels; material lighting must remain visible.
- [ ] Open the radial wheel and confirm its Material swatch shows current colour and
  brush-stroke opacity. Open Material & Paint from the swatch and from the quick-panel
  header; both routes should show the same unified menu.
- [ ] Change colour with the picker and Hex/RGB/HSB values. Confirm the swatch and
  readout update. Adjust size and stroke opacity; the alpha preview must update.
- [ ] Choose Roughness then Metalness. Confirm both paint-value sliders stay available
  and the active channel is highlighted; paint a small test patch in each.
- [ ] Confirm Map Size and AO are absent from the radial and available at the bottom
  of the Layers page. Open/close each page and return to Layers/Brush.
- [ ] Drag the radial wheel and expanded menu to different viewport corners. Confirm
  the menu remains bounded and Pencil strokes, finger navigation, Undo/Redo still work.

BoxLab retains imported material opacity maps but does not paint their texture channel.
The swatch alpha represents brush stroke opacity.

Published: commit `f598df16eb592ab7eac91d9d45dec862b287a384`; Pages deployment
41251195407 succeeded. Hosted Topology regression 41251196062 passed: 3,086 PASS /
0 FAIL / 0 skipped. The prior .1044 run failed on stale release/UI assertions; the
listed fixes are in `f598df1`. Native iPad acceptance is pending.

## .1043 â€” contextual Paint help and copy audit â€” device test pending

- [ ] The floating Paint controls show a small â€œiâ€ help button. Tap it on iPad to
  open and close the tooltip; it must not start a stroke or move the palette.
- [ ] Switch Brush, Fill, Blur, Eraser, Roughness, Metalness and Mask contexts; check
  the help text follows the active tool/scope/channel and remains readable on screen.
- [ ] Confirm the help popover does not obstruct the controls needed to set colour,
  size, opacity, Fill scope or scalar values.
- [ ] Run the still-pending .1042 drag, Pencil, finger navigation and Undo/Redo checks
  below; the tooltip change must preserve those behaviors.
- [ ] Confirm the File menu now describes supported NOM material maps accurately.

Automated .1043 checks: full Node suite 3,086 PASS / 0 FAIL / 0 skipped. Focused
Paint/context-help, release-contract and shell-comparison checks pass. This does not
establish native touch/visual acceptance, which remains with the user.
Publication: .1043 is live from GitHub main commit
`3e3f8c95c3fd62400f0d1ccc22c514cad1977d49`. Pages workflow 41246780287 succeeded.
Topology regression workflow 41246780922 is running; native iPad acceptance is pending.

## .1042 â€” UV Paint draggable contextual palette â€” device test pending

- [x] The tool wheel is smaller/lighter; dragging its grab handle relocates it and keeps
  it inside the viewport. Position persists while Paint stays open.
- [x] Choosing Brush, Fill, Eraser, Smudge or Blur opens contextual quick controls;
  Tools returns to the wheel.
- [x] The quick panel reuses the original channel/preview, colour, brush size/opacity,
  fill, blur/scalar and mask-value nodes and listeners. The layer list remains in the
  persistent left Paint panel.
- [ ] On iPad, drag the wheel/panel to different corners and check controls remain
  reachable in both wheel and quick-control states.
- [ ] Adjust colour, brush size and opacity; switch to Fill and a scalar or Mask target
  to confirm the relevant controls update and disabled options stay unavailable.
- [ ] Paint with Pencil; verify fingers still orbit/pan/zoom, tool changes do not commit
  strokes, and Undo/Redo plus Done retain their existing behavior.

Automated .1042 coverage: 3,085 Node tests pass, including focused Paint/compact-layout
and release-contract checks. Hosted Topology regression 41201732663 and Pages deployment
41201732616 succeeded. The live shell, manifest, Paint module, compact stylesheet and
loader chain match the tested tree byte-for-byte. These checks do not establish iPad touch,
visual weight or GPU rendering acceptance; device checks above remain pending.

## .1041 â€” displacement feasibility report received (benchmark only)

- [x] The .1041 page ran all nine generated-map render combinations on the iPad; no
  case stopped early. This confirms the gate and its copyable report work.
- [x] Largest generated case: 16,384 output faces / 65,536 UV corners; UV subdivision
  21 ms median, geometry expansion 5â€“8 ms, expanded arrays 3 MiB.
- [x] 2048Â² generated PNG decoded in 48 ms; estimated base RGBA 16 MiB. RAF intervals
  were 17 ms median and 17â€“18 ms p95. GPU timer query was unavailable.

Interpretation: favorable bounded CPU/frame-scheduling evidence, not a product PASS or
GPU/memory safety proof. The benchmark used a single mesh and generated 8-bit maps; it
did not test actual Nomad 16-bit decode, BoxLab viewport time, shadows or full memory.
Next validation must audit the actual retained Nomad displacement image and the native
factor/midpoint/world settings before preview implementation. Keep current viewport
20,000-corner and aggregate-image budgets. No displacement feature is enabled in .1041.

Automated .1041 coverage checks the benchmark entry point, canonical corner-UV kernel,
displacement shader usage, case caps, timeout/report contract and release markers. The
full Node suite passed 3,083 / 0 / 0; live .1041 Pages deployment was verified.

## .1040 â€” textured SubD on inactive NOM objects â€” user PASS protected

- [x] Open the seven-object NOM sample. Confirm all seven base materials appear;
  the user PASS for this non-SubD behavior is protected from .1039.
- [x] Enable SubD on at least two textured objects. Confirm both remain textured
  while unselected; then select each and deselect all. Check Studio and Solid.
- [x] Toggle SubD off/on and change the active object; confirm texture alignment.
- [x] Enable Mirror on a textured SubD object and confirm the established
  untextured fallback; disable Mirror and confirm the texture preview returns.
- [x] Switch/reopen VIEW and orbit/pan; confirm preview and navigation remain.

Scope: editable NOM source with current UV topology, no Mirror, and within the
existing 20,000-corner preview cap. References, linked/recipe objects, stale UVs,
Mirror and over-cap results retain the untextured SubD fallback. This does not approve
displacement, texture decode/memory use, GPU behavior or rendered frame time.

Automated .1040 regression covers per-object UV-aware caches, shared eligibility,
inactive Studio/Solid overlay handoff and cleanup. Existing active SubD and NOM
material regressions remain covered. Full Node suite: 3,081 PASS / 0 FAIL. Release
asset-contract and version-marker checks pass. Hosted topology regression
41187547119 and Pages deployment 41187546752 succeeded. Live `.1040` marker and
seven changed runtime assets match local bytes. User confirms all objects retain
their materials under SubD, including while unselected; protect this iPad behavior.

## .1039 â€” active textured SubD; base-material PASS, inactive gap reported

The user confirmed all seven base materials displayed correctly in .1039. The follow-
up test found that only the selected object displayed its material after SubD was
enabled on multiple objects. The .1040 checklist above covers this repair.

## .1037 user PASS protected â€” corner UV subdivision

User replied PASS after the .1037 release. Protect seam-preserving per-corner UV propagation, unchanged geometry-only SubD behavior and the16,384-face/80,000-corner refusal limits. The helper is currently not connected to viewport rendering. Existing seven-object loading, VIEW stability and .1035 colour-alpha PASS remain protected.

## .1035 â€” pre-decode native colour alpha OFF repair â€” 31 October 2026

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

## .1034 â€” native colour alpha OFF shader correction â€” 31 October 2026

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

## .1033 user PASS protected â€” 31 October 2026

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

## .1033 â€” standalone native material maps â€” 31 October 2026

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

## .1032 explicit user acceptance â€” 31 October 2026

- [x] User1032 PASS: all7 cubes visible; no VIEW mode disappearance. Protect sample spacing and VIEW startup/mode availability/reopen.
- [ ] OPEN: native Normal/Emissive/Roughness/Metalness/Opacity without colour texture still falls back to plain3D shading; retained maps remain inspectable. No standalone-PBR PASS inferred.
- [ ] OPEN: sample colour RGB is constant cyan with alpha checker OFF. Nomad solid cyan expected; BoxLab checker/black squares require alphaOFF decoder/material investigation. Use opaque RGB checker in future comparison fixture.
- [ ] Displacement viewport remains deferred; inspection/export retention only.
- [x] Documentation-only acceptance/source audit; runtime remains1032, no new build/manual mandatory test.

## .1032 â€” repair .1031 FAIL â€” 31 October 2026

- [x] User .1031 FAIL recorded; last accepted .1030 protected. Original .1031 sample contains ONE cube/seven maps; no false seven-object claim.
- [x] Actual1031 installer reproduces lost early Cavity/Silhouette and failed ready-host restoration (2 baseline failures). Repaired original installer preserves optional nodes/listeners and restores missing base modes on VIEW open; binds once.
- [x] Workspace-only native image adapter; shared3D resolver has no inspection dependency. Existing map/byte/cancel/read-only tests retained.
- [x] New sample NOM_SEVEN_OBJECTS_1032.nom has7 named independent cubes/one map each; actual File dispatcher imports all7; checked bytes equal generator.
- [x] 85 focused PASS/0FAIL/0skip; syntax/diff/cache checks valid.
- [x] Full local Node24.22.1:3055 PASS/0FAIL/0skip/0cancel (107.16s); no runtime/test edits after start.
- [x] App674828d5/final fixture+tests b73818ed exact validated trees; final sample4a9a16d4 clear of startup cube; Pages41147618892 SUCCESS;8/8 live paths match. UI/DOM1032 all12 controls and Studio/Solid/reopen checked; cloudGPU unavailable.
- [x] CI mismatch reproduced3053PASS/2FAIL: compression bytes varied byNode. Independent fixture pixels/CRC/geometry/maps checks plus unchanged exact source round trips; final Node22 full3055PASS,Node24 full3055PASS+final6 fixture checks. Hosted final result: docs/publication-1032-ci.md.
- [ ] DEVICE1032 VIEW before import: all12 looks,Cavity/Silhouette,Studio/Solid/reopen. New sample seven named cubes; selecteach -> Object radial UV -> UV Editor -> Image -> one raw map. BackTo3D/Close/recheckVIEW; navigation/UndoRedo/accepted1030 sample. Exact iPad missing-menu cause remains unproven.

## .1031 â€” native NOM UV image inspection â€” 30 October 2026

- [x] User .1030 PASS protects accepted native map transforms/PBR/alpha/round trips; hosted .1030 regression41052704373 SUCCESS.
- [x] Original UV Image/dropdown/controller/canvas resolves native exact Colour/Normal/Emissive/Roughness/Metalness/Opacity/Displacement; native scalars never use glTF G/B extraction.
- [x] Raw-image/inspection-only/mapping-not-applied status; original source bytes/16-bit displacement retained, no native UV editing or displacement rendering.
- [x] Five real-owner checks plus accepted native/GLB/workspace/release coverage:79 focused PASS/0FAIL/0skip; syntax/diff/cache graph and protected owners checked.
- [x] Full local Node24.22.1:3051 PASS/0FAIL/0skip/0cancel (121.47s); no runtime/test edits after start.
- [x] Runtime80e2d61d/tree8c1f7130 equals validated/uploaded tree;25 blobs verified; Pages41058750880 SUCCESS;9/9 live matches. Hosted41058751078 in_progress at proof; native gate pending.
- [ ] USER .1031 FAIL â€” VIEW modes missing; expected seven objects (original file actually one cube/seven maps). Retest with .1032. Historical DEVICE1031 NOM_MAP_INSPECTION_1031.nom -> Object radial UV -> UV Editor -> Image: inspect all7 dropdown entries, pan/zoom/switch, Back to3D/Close/reopen; SaveOpen.boxlab and NOMAD maps intact. Accepted1030 viewport sample unchanged.

## .1030 â€” native UV texture transforms â€” 30 October 2026

- [x] Explicit .1029 user PASS protects native colour alpha/opacity and earlier PBR/round trips.
- [x] Existing resource/overlay owner: independent per-map offset/radians/scale; verified Blender-conjugate matrix, original UVs/bytes untouched.
- [x] Four actual-owner tests: signed/nonuniform scale, both rotations, all six maps, colour spaces/alpha, malformed/late cleanup, unlit/UV Image, pooled+inline project/NOM round trips.
- [x] 41 focused checks PASS/0FAIL/0skip; protected main/Multi/frozen and syntax/diff checks retained.
- [x] Full local Node24.22.1: 3046 PASS/0FAIL/0skip/0cancel (214.23s); final canonical parent-pin checks 11 PASS after pin-only correction.
- [x] Runtime caf0dede/tree8f0661e0 exact tested/uploaded match;44 blobs verified; Pages41052704232 SUCCESS;8/8 live byte matches; final15 checks PASS. Hosted41052704373 in_progress at proof; native gate pending.
- [x] User .1030 PASS: import docs/samples/NOM_TEXTURE_TRANSFORM_1030.nom: original left, shifted middle, sideways/twice-repeated right; compare same file in Nomad. Studio/Solid/orbit, Move/UndoRedo, looks/back, SaveOpen.boxlab, NOMAD/Nomad. Accepted colour-alpha sample unchanged.

## .1029 â€” native colour-image alpha â€” 30 October 2026

- [x]1028 PASS supersedes initial FAIL; accepted opacity/shadow/backface/PBR protected.
- [x]Explicit native use_color_opacity true/1: original Three RGBA multiplied with
  separate alphaMap/factor/uniform blending. false/0/absent keeps original OFF policy.
- [x]Unpremultiplied RGB survives alpha0 without rewriting pixels; scalar decode,
  cancellation/bounds/resources/history and both Studio shadow owners unchanged.
- [x]35 focused PASS/0FAIL/0skip including4 new real-owner/RGBA/round-trip checks;
  original1028 refusal now checks invalid2 while explicit1 follows new capability.
- [x]Full final local Node24.22.1:3042 PASS/0FAIL/0skip/0cancel (222.31s); no runtime/test edits after start.
- [x]User .1029 PASS: supplied sample: left checker alpha ON,middle combined opacity,
  right same image alpha OFF solid; Studio/Solid/orbit,selectMoveUndoRedo,
  looks/back,SaveOpen.boxlab,NOMAD/Nomad; accepted1028/1027 samples unchanged.

## .1028 â€” native opacity preview â€” 30 October 2026

- [x] Explicit1027 user PASS protects emissive/color/normal/scalars/retention/roundtrip.
- [x] Original lit native overlay: linear grayscale alphaMap/factor and blending
  opacity; bounded serial decode and native readonly resources preserved.
- [x] Scoped colour-alpha exclusion with unpremultiplied RGB; no image rewrite;
  transparent depth/shadow/backface lifetimes and Studio refresh respect same owner.
- [x]31 final focused checks PASS including6 new actual-owner/shader/lifetime/codec tests.
- [x]Broad local Node24.22.1:3038 PASS/0FAIL/0skip/0cancel (199.52s); final focus covers late Studio owner, serializable UUID and opaque colour-alpha compatibility.
- [x]Runtime d781f169/treedc71f74e verified;45 blobs match;9/9 fresh live files match. Pages/hosted in_progress at last query; native opacity gate pending.
- [x] User1028 PASS (initial FAIL superseded; delayed refresh): DEVICE1028 supplied opacity sample: checker holes,left; middle35% translucent;
  solid right control. Studio/Solid orbit,no orange fill; select/Move/UndoRedo;
  looks/back,SaveOpen.boxlab,NOMAD/Nomad; previous emissive sample unchanged.

## .1027 â€” native emissive preview â€” 30 October 2026

- [x] Explicit1026 PASS protects native normal/scalars/colour/retention/round trips.
- [x] Original native overlay: sRGB emissiveMap, linear RGB factor and strength,
  independent repeat/sampler; same total8MiB/4surfaces/20k corners and serial lifetime.
- [x] Invalid/unsupported/failure keeps accepted colour/PBR; canceled late bitmap closes;
  UV Image/always-unlit remain colour-only; no added lights/bloom or source mutation.
- [x]25 focused PASS/0FAIL/0skip including4 new real-owner/round-trip tests.
- [x]Full local Node24.22.1:3032 PASS/0FAIL/0skip/0cancel (185.63s); explicit zero-factor assertions rerun4PASS.
- [x] Runtimef1b4405f/tree6de75a1f exact tested/uploaded match;40 blobs verified;7/7 fresh live files match. Hosted/Pages in_progress at last query; local3032PASS.
- [x] User1027 PASS: DEVICE1027 import docs/samples/NOM_EMISSIVE_1027.nom Studio/Solid, orbit below:
  left cube emissive brightness, middle/right controls; switch looks/back; SaveOpen
  .boxlab/NOMAD in Nomad; previous1026 sample unchanged.

## .1026 â€” native NOM normal and scalar preview â€” 30 October 2026

- [x] User .1025 PASS protected: colour/tiling/retention/SaveOpen/NOM and1024 lighting.
- [x] Original native/UV overlay/decoder: linear tangent normals with native Y/strength;
  separate opaque grayscale roughness/metalness with saved factors and own UV scales.
- [x] Colour-first/failure fallback; serial cancel/late image release; original material-
  only reflection pool/refcount; explicit scene environment/unlit/UV Image preserved.
- [x] Four surfaces/20k corners,1024 colour+normal/512scalars,8MiB combined choices;
  encoded resource pool/raw bytes/settings unchanged. Other channels retained-only.
- [x] Six new owner/math/decoder/lifecycle/round-trip checks;157 focused PASS.
- [x] Full final local Node24.22.1:3028 PASS/0FAIL/0skip/0cancel (183.48s); syntax/diff clean.
- [x] Runtime68320e5c/tree7b59ab71 exactly tested;44 blobs verified; Pages41025737253 SUCCESS;9/9 fresh live byte matches. Hosted41025737405 in_progress at proof; native/GPU PASS pending.
- [x] User1026 PASS: DEVICE1026 supplied sample,left normal+roughness,middle metal variation,right
  colour control in Studio/Solid/orbit; SaveOpen.boxlab/NOMAD; accepted MAP TEST5x.

## .1025 â€” NOM maps and colour viewport â€” 30 October 2026

- [x] .1024 user PASS protected; original underside lights unchanged.
- [x] Native NOM source provenance/material JSON/encoded maps and source import fit;
  envelopev4 reuses original pooled/inline image transport; UVv3 strictness retained.
- [x] Original browser NOM writer preserves all native slots/raw bytes/factors/names/
  transforms;16-bit displacement retained; source units/world positions restored;
  stale UV/topology safely refuses and textured native GLB cannot silently drop maps.
- [x] Original UV overlay/geometry/decoder owner: Studio/Solid lit colour,5x repeat,
  original picking/cancel/disposal; display bounds4objects/20k corners/8MiB/1024square.
- [x] Six new actual-owner checks;159 focused PASS; real two MAP TEST source files
  dispatcher->fit->SaveOpen->browser NOM->parse preserve image hash/settings/worldpositions.
- [x] Final full local Node24.22.1:3022 PASS/0FAIL/0skip/0cancel (110.32s); syntax/diff clean.
- [x] Runtimeb7507920/tree80fdac20 exactly tested;39 blobs verified; Pages41012329078 and hosted full41012329141 SUCCESS.18/27 live byte matches (9 proxy timeouts); browser shell/data/loader pins1025 verified. WebGL disabled in cloud browser; native visual/PBR PASS pending.
- [x] User1025 PASS: DEVICE1025 reimport original MAP TEST.nom; colour cube in Studio/Solid,5x tiling,
  orbit/select/Move; SaveOpen.boxlab texture; NOMAD open in Nomad; looks/UndoRedo/floor.

## .1024 protected acceptance â€” 30 October 2026

- [x] Explicit .1024 user PASS protects Studio/Solid underside lighting, original ambient and shadow-free Solid.
- [x] Hosted full regression41009577601 completed SUCCESS, rechecked after feedback.
- [x] Documentation only; current build .1024, no new mandatory device test.

## .1024 â€” underside inspection lighting â€” 30 October 2026

- [x] User .1023 PASS protects grid/Pivot shortcut/selected-Face edge alignment.
- [x] Existing render owner reuses one directional lower fill in Studio/Solid only;
  original hemisphere/materials/KeyFillRim/floor controls unchanged; no extra shadow.
- [x]46 focused PASS/0FAIL/0skip: actual six-normal illumination/mode/reuse/isolation,
  original render/paint/floor/contact/release/cache/identity/comparison checks.
- [x] User .1024 PASS: DEVICE1024 Studio underside readable with shape contrast; Solid underside
  readable without shadows; look switches and floor/grid/off; moved model consistent.
- [x] Published runtime d90b3154/treefd6ca02e equals tested tree; Pages41009576824 SUCCESS;12/12 live byte matches. Hosted41009577601 in_progress at proof; no full-suite/browser/iPad PASS claimed.

## .1023 â€” Pivot/Face refinement and brighter grid â€” 30 October 2026

- [x] User1022 PASS protects floor/grid/off and contact-shadow behavior; Object/Edge pivot-edge workflow reported good. Face acceptance remains pending.
- [x] Original grid opacity +10% relative (.198 Studio/.374 other); floor states/Clean mask/axes retained.
- [x] Pivot editing exposes only Pivot and World/Local shortcut buttons/groups,restores original mode-specific icons on exit; real gizmo preview/centre/Y unchanged.
- [x] Selected Face owns shared-edge start and latched surface; nearest-only ray tie plus real shared-edge fallback preserves selected normal,actual edge X/Z snap and occlusion refusal. No model/selection mutation during draft.
- [x]76 focused PASS/0FAIL/0skip;3 new pre-fix/tilted-edge/hidden-face/shortcut checks and original pivot/history/codec/projection/floor/Clean/toolbar/cache/release checks; syntax/whitespace clean.
- [x]Runtimeb45a3a9a/treebf595927 exactly equals tested tree;21 blobs hash-verified; Pages40996655063 SUCCESS;18/18 live byte matches. Hosted40996655551 in_progress at proof; native Face acceptance pending.
- [ ] DEVICE1023 grid subtly clearer; Pivot shows two shortcuts then restores; selected Face drag to multiple/tilted/shared edges,greenY normal,model still; Object/Edge parity,finish Local transform/UndoRedo.

## .1022 â€” floor/grid/off shortcut â€” 30 October 2026

- [x] User1021 PASS protects corrected Pivot icon colour order; no1019 edge-snap PASS inferred.
- [x] Original top-right shell button cycles plane/grid/off/plane via existing ground owner, matching filled/grid/outline SVG and accessible labels. Fresh load plane; no geometry/history/extra renderer.
- [x] Existing grid/Studio floor exclusive; off hides both and contact decal. Original polish refresh cannot reveal decal in grid/off. Look/bridge restores chosen state; Clean View grid/axes masking retained.
- [x]54 focused checks PASS/0FAIL/0skip, including4 new actual-owner checks and original toolbar/render/clean/compact/Objects/snap/release/identity/comparison; syntax/whitespace clean. No full-suite/native PASS claimed.
- [x]Runtime4c10c95f/tree00f84fc4 exactly equals tested tree;18 blobs hash-verified; Pages40995326471 SUCCESS;16/16 live byte matches. Hosted40995327653 in_progress at proof; native acceptance pending.
- [ ] DEVICE1022 Studio: grey plane -> grid -> outline/off -> plane; orbit after each, no floating shadow; Studio/Solid/Studio choice, Clean grid hide/restore; nearby top-right actions and accepted Pivot icon remain usable.

## .1021 â€” Pivot icon colour order â€” 30 October 2026

- [x] Original Pivot SVG: blue bottom-left, green up, red bottom-right; yellow centre ring retained. Action owners unchanged.
- [x]37 focused release/corner/identity/comparison checks PASS; syntax/whitespace clean; exact SVG colour order and unchanged actions/other icons verified.
- [x]Runtime d8ae5d4c/tree26aa26a1 equals tested tree; all16 blobs hash-verified; Pages40991382103 SUCCESS;14/14 live bytes match. Hosted40991382283 in_progress at proof, no full-suite/native PASS claimed.
- [ ] DEVICE1021: verify order at normal size and with Pivot active; toggle/face placement sanity. No1019 device PASS inferred.

## .1020 â€” RGB Pivot icon â€” 30 October 2026

- [x] Original Pivot SVG only: red X/green Y/blue Z arrows and small yellow centre ring; explicit SVG colours, existing24px icon/40px button and all original action owners retained.
- [x]35 focused corner/release/cache/identity/comparison checks PASS; syntax/whitespace clean. Exact SVG XML valid and normal/active/disabled24px/enlarged render visually inspected.
- [x] Runtime6a05d77/tree947a0f26 exact tested match; Pages40985099430 SUCCESS;14/14 live byte matches. Hosted40985099175 in_progress at proof, no hosted PASS claim.
- [ ] DEVICE1020: RGB/yellow icon legible; colours persist when Pivot active. Toggle Pivot, existing face drag/edge snap and finish. .1019 native acceptance not inferred.

## .1019 â€” live face-drag / edge-aligned local pivot â€” 30 October 2026

- [x] User .1018 PASS and .1017 GIZMO ALIGN PASS protected. Original draft/history/transform owners retained.
- [x] Live touch/Pencil/mouse draft movement, actual gizmo projection/rings/hit proxies BEFORE release; no geometry/selection mutation. Base polygon edges only; Y latched to starting face normal, nearest X/Z sign, perspective-correct14/20 CSSpx magnet, no occluded snap.
- [x] Actual owner tests cover secondary contacts, per-drag rollback/capture loss, Escape/pagehide/control/listener restoration, UndoRedo/SaveOpen and no fan-diagonal snaps.
- [x]62 focused owner/projection/nearby/cache/release checks PASS; full local Node24.22.1:3007 PASS/0FAIL/0skip/0cancel (208.94s); syntax/whitespace clean.
- [x] Runtime380b61c/tree4c5ceba0 exact tested match; Pages40981504272 SUCCESS;13/13 fresh live bytes match. Hosted40981504381 in_progress at proof, no hosted PASS claim.
- [ ] DEVICE1019: Pivot -> press/drag face -> edges: visible gizmo moves and X or Z snaps, Y normal and model still. Release -> centre/Y manual turn -> Pivot finish -> Local transform; UndoRedo/SaveOpen. New contact on another face changes normal.

## .1018 â€” pivot-edit actual gizmo preview â€” 30 October 2026

- [x] User .1017 GIZMO ALIGN PASS protected; other .1017 device gates not inferred.
- [x] Reuse original live draft frame and actual Total Gizmo arrows/planes/front arcs; remove pivot-only visibility suppression. Existing centre/Y input gate and geometry/history/finish/cancel owners unchanged.
- [x]55 focused pivot/direction/ring/corner/release/identity/comparison checks PASS; syntax/whitespace clean. Native visual acceptance still pending.
- [x] Runtime bd11e9c/tree5f40a836 exact tested match; Pages40974848411 SUCCESS;11/11 live byte matches. Hosted40974848994 in_progress at proof, no hosted PASS claim.
- [x] User .1018 PASS accepts actual-gizmo preview. DEVICE1018: Pivot -> face -> centre -> greenY: actual RGB gizmo visibly turns, model stays still. Finish -> aligned Local transform; Cancel/UndoRedo and World/Local sanity.

## .1017 â€” local pivot / gizmo controls â€” 30 October 2026

- [x] Original per-object origin + flat quaternion/local fields; existing scene history/copy/project owners retained. Edit is transient, one scene checkpoint on finish, no model mutation; Escape/pagehide/cancel and controls restoration covered.
- [x] Active visible Base face hit, occlusion refusal; Y normal/XZ tangent right-handed frame. Centre enables Y twist; end via Pivot icon. Other shortcuts disabled during edit; Undo/Redo removed ONLY from gizmo.
- [x] World/Local icon state/artwork; per-object frame/space recall and existing Save/Open/UndoRedo; no new project version/channel.
- [x] Actual original exact/local projected Move/Rotate/Scale about custom pivot, component selected-only changes, object frame carrying, fixed start basis/nonaccumulation and cancel restoring geometry+origin.
- [x] Seven new owner/math/scene tests + updated corner tests;36 focused then25 final focused PASS. Final local Node24.22.1:3000 PASS/0FAIL/0skip/0cancel (117.43s); syntax/whitespace clean.
- [x] Local editing refuses Multi/locked/reference/linked/evaluated/procedural/busy/Paint; protected Multi1.0/frozen betas and1016 accepted direction/navigation unchanged.
- [x] Exact SVG icons rendered and inspected. Actual rendered app/browser QA unavailable (missing Chromium/truncated download); no native visual/feel claim.
- [x]Runtime6053092d/treee8ee3cb3; Pages40970022761 SUCCESS;17/17 live byte matches. Hosted40970023491 in_progress at proof; no hosted PASS claim.
- [ ] DEVICE1017 Pivot->face->centre->Y turn->exit; model unchanged during pivot edit. Local Move/Rotate/Scale/Exact, World/Local, second object/back, UndoRedo and Save/Open.

## .1016 protected user acceptance â€” 30 October 2026

- [x] Explicit user PASS accepts shipped1016 gizmo repair; protect Object rotation/scale directions, explicit constraints and component touch handoff with existing history/selection behaviour.
- [x] Runtime remains1016; documentation-only acceptance record. No new build/tests or separate1015 native NOM acceptance inferred.

## .1016 â€” gizmo directions / component touch â€” 30 October 2026

- [x] Reproduce component touch handoff refusal, explicit constraints overwritten by Axis Snap, XYZ opposite screen winding and quadrant-dependent uniform scale; original3 new tests fail before repair.
- [x] Existing semantic owner accepts touch/Pencil/mouse only on explicit gizmo launch; canvas touch navigation gate and component no-synthetic-replay retained. Actual onHandleDown capture verified for Move/Rotate/Scale in Vertex/Edge/Face.
- [x] ExplicitXYZ/free/uniform remains authoritative with Axis Snap ON; rotation direction across both camera sides/inverted views; uniform radius out/in all quadrants; selected-only changes, one history entry, selection retained.
- [x] Original Multi/group owner XYZ rotation/axis+uniform scale, pivots/origins and cancellation covered. Protected Multi1.0 unchanged.
- [x] Component tap/cancel explicitly clears transient gizmo state; cancel restores geometry and no-op tap leaves history unchanged. Grey View-axis ball and legacy canvas ownership retained.
- [x] Six new tests plus nearby/old gizmo/rotation/Multi/release checks:40 focused PASS. Full local Node24.22.1:2992 PASS/0FAIL/0skip/0cancel (114.10s); syntax/whitespace clean.
- [x] Reviewed1016 transform/object-origin/cache graph; Total Gizmo artwork1012, native NOM1015, navigation/Paint and frozen betas unchanged. No1015 native PASS inferred.
- [x]Runtime25cef857/tree9d729ee3; Pages40958753692 SUCCESS;12/12 live byte matches. Hosted40958754318 in_progress at proof; no hosted PASS claim.
- [x] DEVICE1016 user PASS accepts shipped gizmo repair: Object XYZ and grey rotation direction; orange uniform ring outward/inward around all quadrants, axis scale; component multi-vertex/edge/face Move/Rotate/Scale with finger/Pencil; UndoRedo/cancel and Multi/group.

## .1015 â€” native affine-row rounding repair â€” 29 October 2026

- [x] Actual MAP TEST.nom reproduces pre-fix refusal at Text matrix[15]=0.9999997615814209; patched decode imports Cube496v/504f and Text7911v/7916f with UVs. Source bytes unchanged.
- [x] Absolute1e-6 affine-row tolerance/canonicalization BEFORE hierarchy composition only; exact source upper3x3/translation preserved. Sample/mirror/UV/source/positive+negative parent+child drift covered.
- [x] Larger perspective/non-affine, invalid/non-finite/zero-w/singular matrices remain refused; large translations do not loosen tolerance; actual dispatcher adds nothing on refusal.
- [x] Actual uploaded geometry/UV .boxlab Save/Open and NOM export/reimport succeeds. No texture/material/paint import added; retained-map proposal stays deferred.
- [x]23 focused parser/dispatcher/release/identity checks PASS. Full local2986 PASS/0FAIL/0skip/0cancel (113.42s); syntax/whitespace clean.
- [x] Reviewed1015 importer->decoder and shell/canonical release/cache graph;1014 comparison ratings retained, A default; protected picker/Multi/frozen/UI/gestures unchanged.
- [x]Runtime6511ca38/treeb60c4c6a; Pages40869617898 SUCCESS;10/10 live byte matches. Hosted40869618748 in_progress at proof; no hosted PASS claim. Second cube-only MAP TEST(1).nom imports before/after repair; original live Text sample fails before and passes after.
- [ ] DEVICE1015 original MAP TEST.nom imports; inspect Cube/Text placement and UVs, import Undo/Redo, Save/Open and NOM geometry/UV export. Native acceptance pending.

## Planned native NOM material-retention gates â€” 29 October 2026

User direction: UV/embedded textures/PBR first; vertex paint deferred. Strategy only;
.1014 remains accepted, no implementation or new device-test request this session.

- [ ] Future NOM->.boxlab Save/Open->NOM preserves original image byte hashes/bit depth, map bindings/UV settings/material factors (including opacity/emissive/displacement), with unchanged supported mapping.
- [ ] Future UV/topology/import-scale handling marks stale bindings and preserves retained resources; no silent map loss, resampling or false rendering support.
- [ ] Future slots distinguish displayed from retained-only maps. Emissive self-lit preview, opacity cutout/blending and optional bounded displacement preview are separate device/benchmark gates.

## .1014 protected user acceptance â€” 29 October 2026

- [x] Explicit user â€œPERFECT 1014 PASSâ€: protect native NOM chooser and accepted selection/import workflow. Do not reintroduce picker accept filtering.
- [x] Hosted full regression40827907551 SUCCESS and Pages40827906168 SUCCESS rechecked after publication. No new code/build for this acceptance record.
- [x] Current runtime remains1014; NOM paint/material/layer preservation remains unimplemented. No full colour/material round-trip acceptance inferred.
- [ ] Optional existing-scope confidence check: imported NOM Save/Open .boxlab, mapped UV Editor. No new mandatory tests requested.

## .1014 â€” selectable NOM files / native chooser â€” 29 October 2026

- [x] Record1013 device blocker: NOM greyed out BEFORE selection; decoder/native import remains ungraded.
- [x] Original #importMeshInput has no accept/capture/multiple filter; no dynamic module reinstates it. Same button/input/listener/dispatcher retained.
- [x] Supported extensions still validated by app; unrelated extension refuses before file read or object addition. NOM content parser unchanged.
- [x]26 focused checks PASS; original NOM compressed/raw/legacy/native donor, actual import/UV SaveOpen/GLB/NOM tests and release identity retained. Syntax/whitespace clean.
- [x]Full1013 baseline2983 PASS retained; no fresh full local rerun for this shell-only change. Decoder/importer/exporter/protected navigation/UI/Multi/betas unchanged.
- [x]Runtime8a33141c/treee7d18056/Pages40827906168 SUCCESS;10/10 live byte matches; docs/publication-1014.md. Hosted40827907551 running at proof.
- [x]DEVICE1014 user PASS: native NOM picker/import workflow accepted; reported grey-file blocker closed for tested case.

## .1013 â€” native Nomad geometry import â€” 29 October 2026

- [x] User: right-side screen issue seems fixed; record positive device observation, no permanent-root-cause or full1012 PASS inference. Existing1010/1009 PASS protected.
- [x] Audit native NOM export/template reader and authoritative OBJ/GLB import before adding format. Original export/donor unchanged; same File dispatcher/manager.
- [x] Raw/zero/current chunked/legacy LZ4, header/thumbnail/bounds/types/counts/limits; real donor2642v/2640f and independently upstream-generated+decoded fixtures.
- [x] Native polygons/triangle conventions, shared indices/coincident spare preserved, groups/UV seams/names/hierarchy/mirror/visibility, active multires fallback/empty levels/baked shape.
- [x] Original File editable/reference import, fit, no partial geometry adds on parser refusal; exact source bytes unchanged. UV-only codec/SaveOpen/GLB/NOM reimport.
- [x] Geometry-only scope before File choice and status: paint/materials/masks not imported; layers flatten, hidden faces visible note; unsupported reconstruction/repeats refuse clearly.
- [x] 9 new native checks,30 focused PASS,19 release-focused PASS; syntax/whitespace clean.
- [x] Full local2983 PASS/0FAIL/0skip/0cancel (105.64s); final14 review checks PASS.
- [x] Runtime2e31ed3d/tree01d04607/Pages40821570325 SUCCESS;19/19 live byte matches; final7 release checks PASS. Hosted40821571190 still running at proof. See docs/publication-1013.md.
- [ ] DEVICE1013 small native .nom: names/placement/quads/groups and mapped UV Editor; Reference locked.
- [ ] Save/reopen .boxlab, export NOM and inspect native geometry/UVs in Nomad. No paint/material transfer promise; share failing file+exact error if refused.

## .1012 â€” grey View rotation ball / compact Split View â€” 29 October 2026

- [x] Audit current main/live1011 and original transform/Group/gizmo/UI owners; .1010 PASS and .1009 A/B/A PASS protected. .1011 native feel remains pending.
- [x] Grey ball uses original View-axis rotation for single/component/Multi/group, including Axis Snap ON. No 3D arcball/camera rotation/new modelling owner.
- [x] Front-only visible AND hit arcs, full face-on limb, original bounds refusal, charcoal/faint-grey ball and subtle yellow active fill; original Move/Scale/XYZ/corners/Exact retained.
- [x] Actual geometry/pivot/selection/camera assertions, one UndoRedo, click no-op and cancellation; original group origin rotation/cancel covered.
- [x] Optional portrait notice choice, denied-storage fallback, session/resize/BFCache lifecycle, same late Paint/tool nodes/routing text/listeners/accessibility and no synthetic resize/model/history access.
- [x] Compact picker fit covers320/390/450/678/760 widths; actual sync moves picker only. Icon targets44/48px, Paint292px, normal wide layout restores.
- [x] 35 focused +22 contract/corner checks PASS; nine new tests. Dark/light projected SVG inspected (not browser/native proof).
- [x] Full local2974 PASS/0FAIL/0skip/0cancel (104.38s); syntax/whitespace clean.
- [x] Runtimeb6a6d9d8 / tree5b091b02 / Pages40819129157 SUCCESS;17/17 live files byte-match; docs/publication-1012.md. Hosted40819129612 still running at proof.
- [ ] DEVICE1012 grey ball over light/dark model; front-only RGB arcs; grey drag rotates about view with faint yellow press, UndoRedo and Multi/group.
- [ ] Move centre/XYZ/planes/orange Scale/corner controls/Exact remain usable; no accidental rear-ring grabs.
- [ ] Split View -> Continue compact; modes/radial/Paint icons fit and launch same tools; Done/UndoRedo, pane widening restores labels. Check full-screen return/no-inertia/twofinger twist and Paint/light gestures.

## .1011 â€” anchored twist / no inertia;1010 user PASS â€” 29 October2026

- [x]Published runtimef9899386,treeb72a6e24,Pages40807730838 SUCCESS,11/11 live files match.
- [x]Explicit1010 PASS protects free orbit,light/Paint gestures,presets/preview/large brush/history. Inertia is deliberately removed by subsequent user request.
- [x]Existing Three native pointer/pan/dolly owner maps both contacts on target plane:parallel pan,pinch,twist,held finger1 or2,inverted/oblique view and page offsets.
- [x]Zoom limit preserves held point;near-coincident contacts rebase;disabled/cancel/release transitions retain native owner. Default orbit/pan/zoom show no post-release drift.
- [x]Full local2965 PASS/0FAIL/0skip/0cancel (111.97s),syntax/whitespace clean.
- [x]58 focused checks PASS,including10 new native pointer/controller checks;no original Paint/history/three-finger assertions dropped.
- [ ]DEVICE1011 orbit/flick stops on lift;twofinger parallel pan and pinch remain.
- [ ]Hold either finger and arc other:SCREEN-PLANE twist around held point;combine pan/pinch/twist,release one and resume orbit.
- [ ]Twofinger tapUndo/threefinger tapRedo,threefinger light and Paint size remain accepted. No repeat A/B required.

## .1010 â€” navigation, light and Paint gesture regression â€” 29 October2026

- [x]Published runtime7afc6a61,tested tree0630b732,Pages40780100247 SUCCESS,18/18 live byte matches.
- [x]Full local2955 PASS/0FAIL/0skip/0cancel (117.01s),10 new actual-owner checks;syntax/whitespace clean.
- [x]User1009 A/B/A ALL PASS:5 complete A +5 complete B,0 rated FAIL,20 unrated excluded; version identity1009 and saved/backing1x confirmed. Protect exact workflow acceptance; keep A default. See docs/shell-comparison-results-1009.md.
- [x]Real native-controller subclass crosses both poles,keeps distance/target,native pan/dolly after inverted orbit,inertia decay/contact stop/disabled/view reset.
- [x]Main actual touch owner retains2tapUndo/3tapRedo;3drag has axis lock/no history/drains all contacts/cancel restore. No second raw event owner.
- [x]Original Paint UI size1â€“256,standard five tips,preview uses original raster and coalesces latest setting;late/hidden preview suppressed. Size changes create no paint resource/history;cancel restores.
- [x]Large raster work window remains bounded,renews same snapshot,exact cancel;actual large Pencil stroke is ONE UndoRedo.
- [x]User1010 PASS:free tumble,onefinger orbit,twofinger pan/pinch,view commands;inertia deliberately superseded by1011.
- [x]User1010 PASS:Studio3finger horizontal light,tap3 Redo,release restores navigation.
- [x]User1010 PASS:Paint3finger vertical size/preview,presets/large stroke/UndoRedo/Done;Fill/left dock retained.
- [x]Native1010 PASS explicitly supplied by user;no inference from Node and no extra A/B batch required.

## .1009 â€” protect loaded shell provenance â€” 28 October 2026

- [x]Published runtime1e34c432, exact tested tree20cb43c1, Pages40683927107 SUCCESS and all9 live files byte-match; docs/publication-1009.md.

- [x] Classic head captures immutable shell identity before comparison/modules; actual OBJ exporter cannot write app version in either initialization order.
- [x] Original release owner repairs label AND dataset; metadata contamination before initialization, attribute-only mutation, arbitrary stamp argument, newer manifest and offline return cannot relabel loaded code.
- [x] Real OBJ Base/SubD wrapper output equals original production core with internal450 stamp; source mesh remains unchanged. Existing MIME/round-trip tests retained.
- [x] Comparison uses immutable identity, independently stamps1009, preserves exact1006/1007/1008 ratings/notes/first failures, and never copies PASS into new loads.
- [x]Full local2945 PASS/0FAIL/0skip/0cancel (117.67s).48 focused checks PASS; old actual exporter fails new regression. Protected Multi1.0/frozen/model/Paint/UV owners unchanged.
- [ ]DEVICE1009 visible app/checklist1009 and new Copy observations shellRelease1009; retain historical450 metadata unchanged.
- [ ]Alternate A/B with in-app controls, same resolution/orientation/default cube, startup FIRST; original five visible checks. Beta screen gate remains OPEN.
- [ ]B extended parity: navigation/selection/gizmo, UV Back/Paint Done, UndoRedo and SaveOpen before default adoption. No device1009 acceptance inferred from Node.

## .1008 native comparison results â€” 28 October 2026

User supplied Copy results at2026-10-28T11:41:00.510Z (21:41 Brisbane).
A/current:6 complete .1008 runs:2 all-five FAIL,4 all-five PASS;1 additional
unrated .1008 load excluded. B/separated:5 complete all-five PASS,0 FAIL;
1 four-of-five PASS (Paint unrated) and1 unrated load excluded from complete count.
Older .1006 partial/unrated records excluded. Protect the reported PASS observations
for those runs; they do not erase A failures or establish permanent screen repair.
See docs/shell-comparison-results-1008.md for run IDs, audit and next gate.

Both profiles report1366x886 CSS viewport, DPR2,1366x826 canvas CSS/backing,
requested1 and savedStartup1. A failed twice after saved1x startup: first-allocation
1x is NOT sufficient prevention. A canvas parent viewportWrap; B parent
boxlabComparisonCanvasSurface confirms actual structural switch without dimensions
change. A first-failure snapshot is STARTUP: closed VIEW / hidden gizmo there are
expected states, NOT proof those nodes were incorrectly hidden at later checks.

All new observations say checklistRelease1008 but shellRelease450. Audited live-main
source: src/scene-obj-export-238.js lines5-11 hardcode450 and overwrite BOTH label
text and dataset.releaseVersion. The diagnostic reads that mutable dataset; therefore
450 is contaminated metadata, NOT evidence an old450 HTML shell was loaded. .1008
running-shell identity fix is incomplete: release-version can capture contaminated
data depending on module order; current test only covers text overwrite, not dataset
mutation by the real exporter. Next narrow runtime work must remove secondary release
writes/use an immutable initial shell identity and regression-test the actual writer.
Do not change OBJ geometry/export behavior or ask for repeated cache clearing.

Decision: B is promising, not proven. A failed then had4 healthy runs BEFORE B;
time/order confounding prevents attributing B health solely to separation. Keep beta
screen gate OPEN. Next native gate: interleave A/B through original in-app reload
controls (same1x/orientation/default cube; startup first), then B navigation/selection/
gizmo/UV/Paint/UndoRedo/save-open parity before adopting B as default. No wholesale
interface reskin or duplicate tool/renderer/kernel. No additional runtime shipped in
this feedback session; .1008 remains live. No tests rerun for documentation only.

## .1008 â€” running-code identity and unobstructed UV test controls â€” 28 October 2026

- [x] Screenshot confirms apparent1007 and blocked A UV return; first3 A PASS toggles observed for ONE run, no broad rendering PASS inferred.
- [x] Network latest may differ; displayed version/title stay on loaded shell through pageshow/visibilitychange/legacy overwrite; no forced recovery.
- [x] Direct/nested release owner use same1008 URL; layout/drawer parent pins refreshed, protected Multi1.0 unchanged.
- [x] Actual runner Hide removes full list; small left-centre TEST LIST reopens with ratings preserved. Independent checklist .1008 stamp.
- [x] Actual app/UV hidden-state observer drives inline docking, restores on Back, stops on Hide/pagehide and resumes appropriately; no viewport/model writes.
- [x]1006/1007 records and notes retain original release; fresh1008 results remain unrated.
- [ ]DEVICE1008 checklist header .1008, A UV Back visible/clickable after Hide even if docking fails; reopen list, preserve ratings.
- [ ]Same B UV check, then finish native A/B; original beta rendering gate remains OPEN.

## .1007 â€” checklist must clear UV exit controls â€” 28 October 2026

- [x] User1006 A UV check blocked by test list; do not count as native compositor evidence.
- [x] 34 focused comparison/original UV/VIEW/release checks PASS, including exact1006 log migration and unrated new1007 load.
- [ ] UV Editor: expanded AND collapsed checklist below upper toolbar in A and B; Back to3D is visible and receives input.
- [ ] Back/Close returns checklist to normal top-left; viewport size/resolution/UV/history/navigation unchanged.
- [ ] Copy results retains1006 entries/notes/ratings/failure evidence tagged1006, new runs tagged1007; no prior PASS auto-copied.

## .1006 â€” shell comparison regression and native gate â€” 28 October 2026

- [x]1004 Fill behaviour explicitly user PASS; preserve accepted Face/Facegroup/Object scopes and hold/history.
- [x]1005 screen explicitly FAIL: empty Facegroup menu / missing bottom-right status at startup; beta blocker remains OPEN.
- [x]1006 A retains original hierarchy; B moves SAME canvas once before modules, retaining viewport/UI/renderer/input owners and dimensions.
- [x]1006 actual in-app checklist PASS/FAIL, notes, first-failure evidence, persistent bounded build-tagged logs, incomplete-versus-complete counts.
- [x]1006 storage corruption/denial/no-op failure, clipboard fallback, discard acknowledgement and busy guards; no silent reload/model loss.
- [x]1006 explicit reload-only profile switching, unchanged resolution settings; original Paint image-overlay parent/coordinates/disposal retained.
- [x]50 focused + full2935 local PASS/0FAIL/0skip; hosted40663447564 and Pages40663446569 SUCCESS;8 live files match.
- [x]Cloud UI-only Aâ†’B/rating/notes/Copy/viewport/hit/SELECT/Facegroups smoke passes; WebGL disabled, no native pixel acceptance.
- [ ]DEVICE1006 A: use in-app five-step list across up to5 reloads, startup FIRST before menus/collapse. No app-switch.
- [ ]DEVICE1006 B: same iPad/orientation/resolution/default cube; same five steps across up to5 reloads. No forced display recovery.
- [ ]Copy results after testing; retain which profile/load/step failed. Correct DOM/bounds do NOT establish visible pixels.
- [ ]Native B input parity: canvas orbit/pan/pinch, gizmo handles, UV workspace and Paint UI remain interactive; original pass-through overlays stay non-pickable.

## .1005 device feedback â€” Fill PASS; screen FAIL â€” 28 October 2026

User explicitly PASSes Fill behaviour. Protect1004 Face/Facegroup/Whole object Fill,
hold expansion, original raster/input/history owners and current accepted UI; no
new Fill changes requested. This acceptance supersedes pending Fill gates below.
User explicitly FAILs screen behaviour: Facegroup menu still empty. During refresh,
bottom-right startup messages normally settle to Face mode / nothing selected / Multi;
absence of that message lets user identify the failed right region immediately.
This is a useful startup symptom before opening the menu, not proof of an empty
selection/group model, failed status writer or a specific browser-engine cause.
Original main.updateStatus owns status text; existing Multi initialization can update
its wording. Status footer and VIEW use different UI owners; no missing shared action
or confirmed common application clip established. No speculative runtime/CSS repair.
Fresh saved1x launch is NOT verified by this feedback alone: no savedStartup/requested/
backing dimensions supplied. Confirm whether Keep1x on reload was enabled before the
failed refresh before declaring first-allocation1x disproven. Prior live1x recurrence
and current screen FAIL retained; do not claim1005 repaired visibility or request the
same old diagnostics. Current runtime1005; no new build or tests in this feedback update.
User now identifies this as a blocker for the next beta and asks whether an interface
rebuild is appropriate. Recommended next engineering direction: controlled shell
isolation/reconstruction with existing tool/DOM/action owners, same accepted appearance,
and native startup/reload comparison; no wholesale reskin or duplicate kernels.
This is a proposal, not implemented or claimed to guarantee a rendering repair.

## .1005 continuation audit â€” 28 October 2026

Audited current main dbc716d4 (runtime 698ef508); no runtime changes or new build.
Fresh local Node24.22.1 full regression: 2926 PASS / 0 FAIL / 0 skipped (109.81s).
Hosted regression40626823442 and Pages40626977468 completed SUCCESS.
Live version/index/main/viewport-sizing/gesture-debug all byte-match current main;
release markers and reviewed1005 sizing/debug/parent pins agree; protected Multi1.0 retained.
Existing1004 Face/Facegroup/Whole object Fill and1005 saved-startup1x reuse their
original owners. Neither has new device acceptance; right-region visibility remains OPEN.
Next: DEVICE1005 saved1x fresh reload, then DEVICE1004 Pencil Fill/hold/UndoRedo.
Obtain that result before another speculative rendering change; do not infer a repair
from automated regression or healthy DOM/hit tests. No PASS inferred from this audit.

## .1005 â€” opt-in startup 1x, after .1004 recurrence â€” 28 October 2026

User reports right-side failure following refresh to1004. Report03:21:34Z confirms
requested1x AND actual1366x826 backing (CSS1366x826/DPR2). No stale release or failed
live resolution switch. Startup logged at1489/pageshow3188; at7715 canvas2732x1652,
then1x requested7831 and1366x826 by11190. Thus failure persists in captured1x state,
but this launch began at2x. Earlier1x stability is NOT a reliable repair. Current-
resolution-only/2048 WebGL-backing-limit explanation is insufficient. Initial2x
allocation remains a hypothesis, not proven cause. Do not say1x cannot fail.

Capture: Studio/Face, no session/Paint, VIEW correctly closed/hidden with zero bounds,
no atmosphere, UV workspace absent. Visible DOM gizmo196x196 at753.69/408.77;
its right edge949.69 is short of earlier1024CSS cutoff. This report does not capture
where visible gizmo pixels disappear. Toolbar DOM/hits healthy; no visual success
inferred. Nothing ties fault to new1004 fill.1004 feature acceptance remains pending.

New File -> UI Debug -> Keep1Ã— on reload explicitly saves1x launch preference and
applies current1x. Same button becomes Use normal on reload to remove preference.
Original temporary Test1Ã—/Restore normal controls retained. Debug off/pagehide now
restore SAVED launch preference (normal when none), rather than always clearing1x.
Default normal capped2 unchanged for users who do not opt in. localStorage denial/
invalid values fall back to normal; failed save reported honestly, no false success.
Snapshot includes savedStartup; debug-startup now records requested/saved/backing size.
No automatic blink/reload, CSS/GPU-hint/menu/gizmo/geometry/history/paint changes.

Original sizing owner reads preference before binding; existing main immediate
resize now reads initialized owner request, so FIRST full drawing-buffer allocation
can be1x, not initial2x followed by delayed downgrade. Coalesced sizing remains only
lifecycle owner. Explicit change refusal while tools/Paint/drag/probes busy retained.
Tests execute actual first main allocation (1366x826x1, no2x intermediate), saved
binding restart, reset/pagehide/default restoration, storage failure/invalid values,
actual buttons/snapshot and nearby viewport/UV/Paint. Publication/results recorded
in docs/publication-1005.md. No native pixel repair claimed; right-region gate OPEN.

DEVICE1005: Finish tools -> File/UI Debug -> Keep1Ã— on reload. Confirm button reads
Use normal on reload, then refresh ONCE. Inspect right toolbar/menu/gizmo immediately
and after normal navigation. Copy report if failure returns; savedStartup1 plus
requested1/backing1366x826 establishes fresh1x launch. Debug off keeps saved1x. Use
normal on reload restores original resolution if wanted. No repeated cache-clearing
or identical old diagnostics requested.1004 Fill behavior retained; not marked PASS.

## .1004 â€” UV Paint Fill Face / Facegroup and hold expansion â€” 28 October 2026

User reports1x seems to stay healthy and explicitly parks right-region testing unless
it recurs. Record provisional1x stability only, not proven root cause/permanent fix.
Keep1003 sizing/debug bytes and default automatic DPR unchanged;1x is still temporary
and resets on reload/Debug off/pagehide. Resume requested UV Paint fill expansion.

Original Fill radial sector remains in its accepted position/artwork. Compact LEFT
settings add Face (default), Facegroup and Whole object scope. Pencil/mouse tap fills
clicked original polygon, not one rendered triangle. Face hold420ms expands preview
to connected coplanar region; up grows/down shrinks from fixed planar base in30px
steps with18px neutral band (max32 steps); right uses original Face Loop and left
Face Ring. Direction reversal recomputes baseline pixels rather than accumulating
opacity. Before hold, movement>8px cancels tap. Release commits one original paint
checkpoint; cancel/scope/tool/body/history loss restores baseline and clears timer.
Fingers still navigate. Scope changes never alter modelling selection or Facegroups.

Facegroup scope shows SAME orange non-pickable boundary preview as UV seam review;
click fills all same-name faces on target, including disconnected patches. Ungrouped
faces refuse with assignment hint. Scope exit/Done/body loss disposes overlay;
world matrix follows original body. UV review now shares extracted original boundary
renderer, retaining its exact seams/colour/timer/unwrap/cancellation behavior.

Copied existing read-only Coplanar inspect, quad-strip trace and Grow/Shrink math to
shared face-selection-regions; ORIGINAL selection UI owners call those same functions.
No duplicate geometry kernel or selection simulation. Raster original fill accepts
optional texel mask and baseline replacement; coverage/alpha/opacity/scalar/mask,
resource/pool validation, scene history, SaveOpen/export remain original owners.
Face masks use original UV texel ownership; require non-overlapping, nondegenerate
UVs in tile0â€“1, original bounded geometry/work limits. Shared/ambiguous boundary
texels stay conservative; no painting onto a different face's owned interior texels.
Whole object fill retains earlier behavior. Existing image-colour refusal retained.

Reviewed1004 reverse cache closure: shared modules, selection owners/Coplanar drawer,
paint raster/core/UI and Lab loaders, UV workflow/MeshHealth, shell/recovery. Internal
stamps retained. Main1003, viewport sizing/debug1003, accepted uniform Facegroups1002,
SVG/gizmo/right-region composition, palette, Multi1.0 and frozen releases unchanged.
Tests: actual region/painter/UI/UndoRedo/subset SaveOpen, preview reversal/opacity,
all-name group fill/overlay cleanup, original selection gestures and paint suite.
Legacy926/927 UI fixtures now explicitly choose Whole object for their full-texture
assertions; original pixel/UndoRedo/SaveOpen/native-export protections retained.
Test adapters import extracted real selection functions; no behavioral assertions
removed. Results and publication evidence: docs/publication-1004.md.

DEVICE1004: UV Paint -> Fill -> Face; tap one polygon, then hold on coplanar patch,
slide up/down and right/left, release; reversing/shrinking removes abandoned preview.
UndoRedo one gesture. Choose Facegroup: orange boundaries visible; tap named group,
only that group's faces fill; Brush/Done removes boundaries. Whole object still fills
all; SaveOpen retains paint. No new right-side diagnostic test requested. If earlier
fault returns after reload, existing1x control remains available; do not call it fixed.
Current1004 feature acceptance pending native Pencil test.

## .1003 â€” explicit render-resolution diagnostic; .1002 PASS protected â€” 28 October 2026

User requests further attempts after model change. Implement controlled1x versus
normal DPR through ORIGINAL viewport-sizing owner; default remains automatic capped2.
File -> UI Debug -> Test1Ã— render resolution toggles temporary cap1; same button
restores normal. Disabled Debug and pagehide restore automatic. No localStorage,
renderer replacement, CSS resize, model/history edits, forced canvas visibility,
synthetic resize or per-frame polling. Only original coalesced resize callback writes
backing buffer. Genuine resize/tool/mode lifecycle keeps requested cap. Disposing
sizing cancels pending frames, removes API/listeners and restores prior API identity.

Button refuses Paint, active tool/session/drag, disabled orbit controls, existing
canvas probe/refresh. Exit operation before scale change; restoration on Debug off
always works. Snapshot includes requested cap and actual backing dimensions. Compare
right-region pixels immediately after1x AND after repeating failing workflow; then
restore normal and repeat. A single recovery on either switch may merely reflect
buffer reallocation, not prove DPR dependence. Native pixel result remains pending;
this is diagnostic, not claimed permanent gizmo/menu fix. Earlier both-mode evidence
retained; no repeated Studio-versus-Facegroups diagnosis needed.

Main changes viewport-sizing import key ONLY; sizing/debug owners changed, shell/
recovery keys1003 reviewed. Existing .999 resize allocation/renderer/camera code,
.1002 unlit Facegroups, palette, modelling/UV/Paint, Multi1.0 and frozen bytes retained.
Tests execute actual scale API and debug button (busy refusal, switch/restore,
snapshot, Debug off), original viewport sizes/coalescing/pagehide/cleanup and unchanged
scene/history contracts. Validation/publication: docs/publication-1003.md.

DEVICE1003: while fault visible, finish tool -> File/UI Debug -> Test1Ã— render
resolution. Inspect right gizmo/menu; repeat original failing workflow at1x. Restore
normal resolution and repeat. Copy report while affected. Report whether1x prevents
recurrence, both switches only recover temporarily, or neither helps. Debug off
restores normal;1x intentionally looks softer. Fill Face/Facegroup remains unshipped.

## .1002 user PASS; shared gizmo/menu audit â€” 28 October 2026

User PASS1002 protects uniform Facegroup colour including undersides; Studio
lighting remains separate. User requests another investigation of gizmo/menu loss.
Both Studio and Facegroups affected; do not repeat that comparison. No new runtime
fix established. Gizmo local SVG overflow:hidden moves with original196px root;
VIEW fixed external sibling under app has different ancestry. No shared application
clip or scissor call established that explains both lost surfaces. Do not remove
protected SVG clipping speculatively. Prior UV screenshot cutoff near1024 CSS /
2048 physical pixels at DPR2 suggests a resolution-dependent paint/composition
hypothesis, not proof of GPU/texture-limit/WebKit cause. Next narrow diagnostic
candidate: explicit temporary1x versus automatic2x rendering using authoritative
viewport sizing owner, preserving CSS size/model/history and restoring on exit.
Not implemented; do not claim diagnostic controls exist or a fix is ready.

Current live1002; no new runtime build in this audit.69 focused tests belong to
1002 material change, not pixel-loss proof. Fill Face/Facegroup remains requested
and unshipped. No new device test required in this audit; do not ask for repeated
hidden-gizmo reports or identical Studio/Facegroups comparison.

## .1002 â€” uniform Facegroup colours, including undersides â€” 28 October 2026

User screenshot4DED25F9 shows bottom faces nearly black in Facegroups and requests
equalized shading. Original render-modes facegroupMaterial now uses unlit
MeshBasicMaterial with vertexColors and toneMapped:false instead of lit Standard.
Every front-facing polygon displays its existing group palette colour independent
of light/normal orientation. Original FrontSide, polygon offset, backface diagnostic,
palette/list/name data, selection/brush/history, other VIEW materials and renderer
lights remain unchanged. Bottom faces can now be read while orbiting underneath.
This deliberately flattens Facegroups shading; Studio retains original depth/lighting.

Scope is only original material plus reviewed render/shell/recovery1002 pins and
release markers. No UI/composition/gizmo changes; blank VIEW/right-region recurrence
stays OPEN. .1000 feature and .1001 functional acceptance retained. Requested UV
Fill Face/Facegroup with expansion remains active but unshipped; do not claim it
was included here. Validation/publication: docs/publication-1002.md.

DEVICE1002: Facegroups -> orbit below mesh; assigned undersides show same group
colour as upper faces. Paint/erase groups, UndoRedo; list colours remain consistent.
Switch Studio -> Facegroups: Studio lighting returns, group view is evenly coloured.
Current1002 native appearance acceptance pending; right-region fault still separate.

## .1001 recurrence â€” blank Facegroups VIEW and right-region gizmo loss â€” 28 October 2026

User previously PASSed1001, now reports Facegroups VIEW blank and gizmo disappears
on right, without former bottom-right ground tonal line. Reopen native visibility
gate; retain1000 feature acceptance and1001 functional/UV-specific PASS only.
Screenshot0BC723EC-C3F4-4F53-BFD5-EA081926119F.png visibly confirms1001, Facegroups
colours, Edge mode, full top-right toolbar and empty open VIEW frame. Gizmo is
visible near centre in this screenshot; disappearance at right is user-observed,
not captured as a clipped gizmo here. No new debug report supplied.

Source explanation:999 retired screen-wide DOM multiply vignette; render-modes
shows Studio floor/lights/shadows ONLY in Studio, not Facegroups. Thus absence of
old ground line in Facegroups is not proof of recovery and cannot reliably signal
UI health.1001 only removed UV workspace isolation/containment; VIEW and gizmo
runtime unchanged. Neither finding proves root cause of blank menu/gizmo loss.

No new runtime build or speculative CSS repair in this evidence update. Current
release1001. Prioritize this recurrence before implementing requested Fill Face /
Fill Facegroup; that request remains active and unshipped. Next useful device
comparison: close VIEW, move same visible gizmo across right region, then compare
Studio versus Facegroups without reload/app-switch/recovery. Do not demand another
identical hidden-gizmo dump or treat healthy DOM/hits as pixel proof.

## .1001 â€” UV Editor plain composition; .1000 feature PASS â€” 27 October 2026

User explicitly PASSes .1000 features, but reports right-side loss after entering
UV Editor. Protect .1000 UV validation/Studio handoff/Facegroup unwrap behavior;
do not interpret feature PASS as native visibility acceptance.

IMG_8342.png shows editor chrome cut off near screen x1024 CSS (image x2048),
including partial Checker label, right editor surface and top-right toolbar.
Underlying 3D floor remains visible at right. Report 09:41:45Z: uv-tools session,
uvchecker/Object, workspace visible at8/68/1350/793 under app; toolbar bounds/hits
healthy, VIEW closed/hidden, atmosphere absent, gizmo intentionally hidden.
Canvas2732x1652/DPR2. No evidence of missing DOM, stale release or UV topology loss.
Hide3D button clicks in supplied log do not establish an observed diagnostic result.

Source audit found UV entry still reintroduced old .952 isolation on viewport and
workspace, plus isolation/paint containment on UV canvas wrapper. This survived .999's
plain startup baseline. Remove those CSS declarations and active :has viewport rule
ONLY in original uv-workspace. Retain sibling root, z9 under header10, fixed insets,
scrolling, overflow clipping, original controls/canvas identity, sizing and gestures.
Mesh Health changes child cache key only; shell parent/recovery keys1001 reviewed.
No renderer, model/history/UV/paint algorithms, main999/styles999, Multi1.0 or frozen
changes. This closes a verified baseline mismatch, NOT proven WebKit root cause or
permanent right-region repair. Native visibility gate stays OPEN until device feedback.

Existing .952 CSS contract now protects plain UV composition, retaining all original
header/exit/geometry/scroll bounds and lifecycle/navigation/history assertions.
Validation/publication results: docs/publication-1001.md. Standing push/publish
approval applies. Next prioritize native UV-entry result before further rendering
changes; do not repeat blur/vignette/closed-menu hypotheses already disproved.

DEVICE1001: fresh load -> UV Editor, inspect full right border/Checker/Image/top
buttons; Back to3D and reopen several times without app-switch/recovery. Pan/pinch,
select/Pencil-move an island, UndoRedo. Back to3D -> VIEW Studio/Facegroups -> UV
Editor; inspect right side again. .1000 accepted workflow stays protected.

## .1000 â€” UV Paint handoff and Facegroups â†’ UV Seams â€” 27 October 2026

User says â€œPASS 999 so farâ€. Record PROVISIONAL .999 PASS and protect the exact
main/styles/retired-atmosphere startup baseline. This is not an unlimited native
visibility acceptance. User explicitly requests the next UV/Facegroups workflow.

UV PAINT now uses the existing paintTargetKey validator before entering Paint.
Missing/stale/incompatible UVs open the ORIGINAL UV session through __boxlabUVTools,
with â€œValid UVs required for UV Paintâ€ at the TOP. No UV/paint/history is authored
by the redirect. Valid targets in Facegroups view switch through the existing Studio
button, stopping the original Facegroup stroke/dock owners, before Paint opens.
Finished UV-tools sessions hand off directly to bottom UV PAINT; busy unwraps require
Finish/Cancel first. Existing other-tool protections remain intact.

UV menu adds â€œFacegroups â†’ UV Seamsâ€, orbitable orange boundary preview, explicit
â€œConfirm UV Unwrapâ€, elapsed timer and Cancel. Preview has no history or UV edits,
no raw pointer consumer and no control disabling. Connected equal-name regions form
charts, including an unassigned region; disconnected regions form separate islands.
Native mesh boundary and differing-group edges delimit patches. Original geometry,
groups, names, palette and selection are retained. Planar patches keep exact shapes;
curved disk patches use bounded positive-weight harmonic flattening with periodic
frame yields. Original UV preview triangulation validates every flattened face;
original density, packing, native UV commit, project transport and ONE history
checkpoint remain authoritative. Completion selects existing UV Checker and keeps
orange patch boundaries visible in 3D while the UV session stays open. Closing,
changing target, entering UV Editor or cancelling releases the owned seam overlay.

Honest limits: 4096 faces / 20,000 corners; plain independent unlocked Base mesh,
SubD/Mirror off, no stored paint. Closed groups, holes/handles, pinches, inconsistent
winding, non-manifold edges, solver failure/work overflow refuse without mutation
and ask for additional Facegroup boundaries. Never silently insert cuts within a
group. Curved patches can stretch; existing flat atlas remains available.

Testing: new UV projection/packing/curved chart/resource/SaveOpen checks; real Paint
entry and UV session handoff; timed confirm/cancel/target-change and overlay cleanup.
Repaired old test harnesses for original Sweep UV-release hook and dynamically loaded
Facegroup dock cache owner; no Sweep or dock runtime edits. Final full-suite and live
publication results: docs/publication-1000.md. No native iPad feature PASS inferred.
Standing push/publish authorization continues. .996 File and .994 palette protected.

DEVICE1000: (1) no-UV object â†’ UV PAINT â†’ original UV menu + top reminder;
(2) valid UV object in Facegroups â†’ UV PAINT â†’ Studio + paint;
(3) UV â†’ Facegroups â†’ UV Seams â†’ orbit/check â†’ Confirm UV Unwrap â†’ timer â†’ checker
and orange boundaries; (4) Undo/Redo and Save/Open retain UVs/groups; Cancel creates
no UV/history edits. Also check .999 initial/right viewport remains healthy.
Current build .1000; feature acceptance pending device test.

## .999 â€” rebuild initial viewport baseline; .998 FAIL â€” 27 October 2026

User explicitly FAILs .998: right-side viewport patch exists immediately after
refresh, VIEW initially works, then selecting Facegroups leaves it blank. Screenshot
715C468D-4F44-4AF8-8E86-5F1B083F9DFC.png shows the bottom/right tonal boundary before
VIEW opens. Do not repeat menu-only frame/scroller changes or infer success from
healthy DOM bounds. .997/.998 are not complete visibility repairs.

Rebuild the existing initial presentation path: remove .967 CSS paint containment,
canvas/wrapper/header isolation and opacity-layer requests; retain original z-order.
Retire the full-viewport HTML multiply vignette and its mode opacity animation;
existing Studio WebGL lights, ground and shadows remain authoritative. The original
main renderer now uses one atomic setDrawingBufferSize for actual dimensions/DPR
changes, without initial setPixelRatio followed by size reset, and does not rewrite
canvas backing dimensions on same-size startup/visibility/session callbacks.
No second renderer, canvas recreation, forced hide/show or refresh loop. No menu,
Facegroups modelling/colour, geometry, history, gesture or frozen Multi changes.
The vignette is intentionally removed: a slightly less dark edge is expected.

Validation: 20 focused startup/sizing/composition/VIEW/release checks PASS; syntax
and whitespace clean. Broader and publication results: docs/publication-999.md.
No native pixel proof is claimed. .999 is a baseline retest, not an accepted fix.
Keep feature work paused until initial refresh and Facegroups visibility are stable.
Standing user authorization to commit/push/publish remains in force.

DEVICE999, in order: refresh and inspect bottom/right BEFORE opening VIEW; open
Studio VIEW; select Facegroups, scroll and reopen VIEW; return Studio; select/move
near the right edge and inspect gizmo; verify orbit/pan/pinch and Undo/Redo. Report
which earliest stage fails. Current build .999; readiness = device retest pending.

## .998 â€” Facegroups transition repair, native acceptance pending â€” 27 October 2026

User clarified: VIEW works in Studio, then becomes empty when Facegroups is selected.
.997 is partial Studio success, not overall VIEW acceptance. Facegroups adds enough
content to overflow the menu (reported scrollHeight 980 versus clientHeight 810).
.998 separates the fixed external frame from a bounded normal-flow inner scroller,
retaining original controls, IDs, delegation, native open owner and Clean View section.
The fixed frame no longer owns touch overflow. Inner scroll position survives closing.
The right-side gizmo patch remains OPEN; no visible-gizmo capture proves its cause.
Protected: accepted .996 File menu and .994 palette, original Multi and gestures.
Validation: focused VIEW/layout/release/facegroup/File tests; native device test still
required: open Studio VIEW, switch Facegroups, scroll to bottom, close/reopen, return
Studio, and inspect right-side gizmo. Standing commit/push/publication authorization
continues; no repeat approval needed. Current build .998, ready for device retest only.

## Beta 3 release gate

- [x] Complete the hands-on checks in `BETA3_RELEASE_CHECKLIST.md` on iPad Safari before freezing `/beta-3/`
- [x] Do not add new modelling features during the release-candidate cycle
- [x] Fix only reproducible release-blocking regressions
- [ ] Confirm the frozen Beta 3 URL and live main URL both smoke-test successfully after Pages deployment

# BoxLab Regression Test Checklist

This checklist is the persistent regression contract for BoxLab.

Run the sections relevant to a change. Expand this file when a new stable workflow becomes worth protecting.

## Core navigation

- [ ] Safari/iPad native text or element selection never washes the BoxLab modelling UI blue during ordinary touch/Pencil actions
- [ ] native long-press callout/drag selection is suppressed on BoxLab chrome and viewport
- [ ] input / textarea / select / contenteditable controls retain normal text/value interaction
- [ ] one-finger orbit works
- [ ] after finger-selecting another object, one-finger orbit remains orbit (not pan) and pinch zoom still works
- [ ] two-finger pan works
- [ ] pinch zoom works
- [ ] two-finger tap Undo works
- [ ] three-finger tap Redo works
- [ ] orbit pivot does not jump
- [ ] navigation does not unexpectedly clear persistent selections
- [ ] while any Tool Session is active, Active Tools cannot collapse from viewport interaction; Apply/Cancel/end-session restores normal drawer behaviour
- [ ] Solidify: Object launch opens exclusive Tool Session; live Thickness/direct viewport drag work; Cancel leaves source unchanged; Apply creates the same closed solid as before
- [ ] Shell: selected Face opening launch opens exclusive Tool Session; Pencil Thickness works; Cancel leaves solid unchanged; Apply creates the same hollow solid/opening as before
- [ ] Revolve Profile: new plane remains positionable before editing; moving/snapping or launcher opens exclusive Tool Session; Pencil profile editing, Segments 3â€“64 and Apply remain unchanged
- [ ] after Array END-copy drag / Apply / Cancel, free Vertex Move immediately works again and no stale pointer capture remains
- [ ] Vertex mode: selected vertex can Move / Scale / Rotate; Vertex Pick Assist still handles ordinary taps when no transform is armed

## Selection

- [ ] Vertex selection works
- [ ] Edge selection works
- [ ] Face selection works
- [ ] Face multi-select works immediately after a fresh app load, without requiring a mode change first
- [ ] returning to Face/Edge/Vertex from another selection mode restores intended additive component multi-selection
- [ ] Object selection works
- [ ] Visible / Through selection-depth controls work
- [ ] Loop selection works
- [ ] Ring selection works
- [ ] Boundary selection works
- [ ] Grow / Shrink / Connected selection works where applicable
- [ ] Angle / Normal selection works where applicable
- [ ] selection indicators remain usable while zooming
- [ ] navigation preserves the intended selection

## Object / Multi

- [ ] ordinary Duplicate stays independent and does not share geometry
- [ ] Linked Duplicate creates a second editable object that shares source geometry but keeps independent Object-mode placement
- [ ] moving / rotating / scaling one linked instance in Object mode does not move the others
- [ ] component edits on one linked instance propagate to all linked peers in their own placements
- [ ] Make Unique detaches only the active linked instance; later edits no longer propagate between it and the former link group
- [ ] Linked Duplicate / Make Unique survive Object-mode Undo/Redo with link metadata intact
- [ ] with Object Multi active, Linked Duplicate operates on every selected editable object and selects the newly created linked set
- [ ] Multi Linked Duplicate skips Reference guides and preserves duplicated group relationships / relative arrangement
- [ ] with Object Multi active, Make Unique detaches all selected linked objects in one history step
- [ ] ordinary Multi Duplicate remains independent and does not silently become linked
- [ ] Join produces a unique combined result even if one input was linked
- [ ] object creation works
- [ ] switching active object works
- [ ] duplicate works and uses padded numbering (01, 02, 03â€¦) instead of appending copy
- [ ] duplicating an already-numbered sibling continues the same numbering family rather than nesting another suffix
- [ ] linked and Multi duplicate naming follows the same numbered object-name rule
- [ ] rename works
- [ ] Object Rename opens the BoxLab rename field already focused with the current text selected for immediate typing
- [ ] Object footer is compact Add / Duplicate / More, while Rename / Delete / Linked Duplicate / Make Unique remain available and correctly enabled inside More
- [ ] delete works
- [ ] each object-row More menu includes Delete Object and deletes that specific object with one Undo step
- [ ] in Object mode, Delete and Backspace trigger the authoritative Delete action for the current single/Multi/Group selection
- [ ] Delete / Backspace do nothing while typing in Rename or another editable field
- [ ] Boolean results use compact B numbering (B1, B2, B3â€¦) from the active/base object name instead of concatenating operand names
- [ ] Join works
- [ ] multi-object selection/management works
- [ ] Object Selection toolbar stays in a compact five-button strip with readable status text
- [ ] grouped Outliner hierarchy preserves group membership through Object Undo/Redo
- [ ] custom group names survive scene Undo/Redo and group rename is one Undo step
- [ ] Group Rename immediately updates the visible Group header and opens focused with the current name selected
- [ ] selecting one complete group enables the normal Rename button as Rename Group
- [ ] selected group header is visibly distinct and its name acts as the primary group selection target
- [ ] selecting a whole Group promotes the hidden active/primary object into that Group if the previous active object was outside it
- [ ] a whole selected Group renders amber as one viewport selection state
- [ ] a whole selected Group moves together on iPad/Pencil even when every member is already selected in the hierarchy
- [ ] Group context survives the object-origin selection wrapper so viewport tint and transform routing agree
- [ ] while a whole Group is selected, the active member's individual cage/verts are suppressed and no outside object remains visually highlighted
- [ ] Group Selection immediately creates the visible hierarchy row; it must not merely stamp per-object group IDs/tags
- [ ] compact Group tree keeps Group Selection contextual: the creation control is hidden unless 2+ groupable objects are selected
- [ ] compact Group header uses disclosure + name + visibility + More; Lock / Rename / Ungroup live inside More without expanding drawer height unnecessarily
- [ ] compact object rows use Name + SubD + Visibility + More; Lock / Solo / Delete remain available inside More
- [ ] per-object SubD button reflects object.settings.subd and updates inactive-object rendering without changing active object
- [ ] active-object SubD button stays synchronized with the existing Modifiers > SubD Preview checkbox
- [ ] Reference objects cannot enable SubD from the Outliner
- [ ] Object / Group / footer More popovers are explicitly anchored above their trigger and remain visible above the drawer's lower edge
- [ ] Group More menu Rename/Ungroup works while the normal Rename Group pathway remains available
- [ ] exactly two selected objects show amber/blue viewport tint (active/primary amber, second blue) while the Outliner remains neutral unless Boolean-specific UI is in use
- [ ] group visibility and lock each Undo/Redo as one Object scene-history step
- [ ] group header direct Ungroup works without breaking normal Group Selection / Multi behavior
- [ ] collapsed/expanded group state survives scene Undo/Redo when the group still exists
- [ ] removed groups do not leak stale names/collapse state into later groups that reuse an ID
- [ ] object transforms do not regress
- [ ] reference objects remain protected from destructive editing
- [ ] Reference imports are permanently read-only guides: single, Multi and Group lock controls cannot unlock them
- [ ] Reference visibility / solo still work and visible Reference geometry remains eligible for cross-object snapping
- [ ] duplicating or restoring a Reference through scene Undo/Redo must preserve kind=reference and locked=true

## Component alignment

- [ ] existing Make Planar remains available for a selected Face
- [ ] Align X enters anchor-pick mode, then aligns the other selected component vertices to the picked anchor X coordinate
- [ ] Align Y enters anchor-pick mode, then aligns the other selected component vertices to the picked anchor Y coordinate
- [ ] Align Z enters anchor-pick mode, then aligns the other selected component vertices to the picked anchor Z coordinate
- [ ] picked Align anchor stays fixed
- [ ] picked Align anchor gets the amber Boolean-style reference cue
- [ ] component Align preserves the current component selection
- [ ] component Align commits as one Undo step
- [ ] component Align is hidden in Object mode

## Precision snapping

- [ ] component Move displays live Î”X / Î”Y / Î”Z while dragging
- [ ] snapped component Move keeps numeric delta readback visible alongside the snap target label
- [ ] Geometry-enabled component Move can snap selected vertices to visible geometry on other objects
- [ ] free component Move can align an edge/face/multi-component centre to another-object snap target
- [ ] axis-constrained component Move changes only the constrained coordinate when snapping cross-object
- [ ] target object remains unchanged during component Move snapping
- [ ] hidden/solo-excluded objects do not contribute component Move snap targets

## Vertex tools

- [ ] Add Vertex can snap to visible geometry on other objects without modifying the target object
- [ ] cross-object snapping prefers target vertices, then midpoints, then generic edge positions
- [ ] hidden/solo-excluded objects do not contribute snap targets
- [ ] Add Vertex works
- [ ] Build Edge works
- [ ] arming Build Edge fully disarms Add Vertex; Add must not light back up after the Build Edge click
- [ ] Vertex Active Tools keep the fixed order Bevel / Add / Build Edge / Slide / Create Face / Circle without jumping during selection renders
- [ ] Vertex Slide works
- [ ] Vertex Bevel works
- [ ] multi-vertex bevel works where supported
- [ ] Vertex Join works
- [ ] Weld works
- [ ] Delete Vertex works safely

## Circle / regularize

- [ ] Circle appears in contextual Vertex / Edge / Face Active Tools, not in Selection
- [ ] Vertex Circle sits in the Slide / Create Face row as the third button
- [ ] Edge Circle sits immediately after Delete in the bottom Topology row
- [ ] Face Circle sits beside Poke Faces in the same row
- [ ] no old standalone bottom Circle row remains
- [ ] Circle is available for a simple closed selected Vertex/Edge loop or exactly one selected Face boundary
- [ ] Circle preserves the selected loop centre and working plane
- [ ] Circle regularizes existing loop vertices to one radius with even angular spacing
- [ ] Circle does not create or delete topology
- [ ] Circle preserves the current Vertex/Edge/Face selection
- [ ] Circle commits as one Undo step
- [ ] open chains / branched / ambiguous selections are refused

## Edge tools

- [ ] Grid Fill enables only for one simple planar convex four-sided boundary with matching opposite segment counts
- [ ] Grid Fill preserves all existing boundary vertices
- [ ] Grid Fill creates an all-quad UÃ—V patch and selects the new faces
- [ ] Grid Fill is one Undo step and commits only after topology validation
- [ ] Grid Fill rejects irregular/curved boundaries, mismatched opposite counts, internal/non-boundary Edges and simple 4-edge caps
- [ ] Flip Edge is the single existing triangle-pair diagonal-swap tool (formerly Rotate Edge)
- [ ] Flip Edge enables only for one uncreased shared Edge between exactly two triangles
- [ ] Flip Edge selects the new diagonal after commit
- [ ] Flip Edge commits as one Undo step and rejects unsafe/inverted results
- [ ] Face Split works while canonical additive Multi selection remains enabled
- [ ] arming Face Split temporarily prevents Edge paint selection from consuming its boundary-edge taps
- [ ] leaving Face Split restores ordinary additive Edge paint selection
- [ ] Loop Cut works
- [ ] Face Split works
- [ ] Edge Bevel works
- [ ] multi-edge bevel works where supported
- [ ] Crease works
- [ ] Uncrease works
- [ ] Edge Slide works
- [ ] Offset Loop works
- [ ] Offset Loop drag and exact-entry commits validate topology and roll back invalid results
- [ ] Offset Loop leaves canonical additive Multi enabled and selects both created support rails directly
- [ ] while Offset Loop is armed, Edge paint selection yields so Pencil drag reaches the modelling tool
- [ ] Edge Bridge works
- [ ] Fill works
- [ ] Dissolve Loop works
- [ ] Dissolve Edge works
- [ ] Delete Edge works safely

## Face tools

- [ ] Face Active Tools primary row remains 3 columns: Extrude / Inset / Knife; Join Coplanar wraps below instead of forcing 4 across
- [ ] Face secondary row remains 3 columns with Duplicate present; selecting/arming Inset or Extrude must not reshuffle Face buttons
- [ ] File menu opens below the command bar, fits within the viewport, and scrolls internally when needed
- [ ] Precision Face / Repeat Previous UI appears only once
- [ ] drawer-ui is the single authoritative loader for Precision Face / Repeat Previous
- [ ] normal Extrude drag records an exact previous value for Repeat Previous
- [ ] normal Inset drag records an exact previous value for Repeat Previous
- [ ] Repeat Previous can be armed and applied by tapping another Face
- [ ] repeated Face operation uses the exact previously committed value
- [ ] Through / blocked / rollback Extrude gestures do not become Repeat Previous operations
- [ ] Extrude works
- [ ] inward single-Face Extrude trims overlapping exterior side walls instead of leaving stacked/z-fighting wall faces
- [ ] inward Extrude preview shows the side-wall cut continuously from the start of meaningful inward travel
- [ ] inward Extrude interior boundary edges create recess walls while exterior boundary edges cut existing wall faces
- [ ] partial inward Extrude commits a closed valid result or rolls back transactionally
- [ ] inward Extrude reaching the far side still resolves through the mature Through kernel
- [ ] cancelling an inward cut preview restores the exact pre-drag mesh and does not add history
- [ ] connected multi-face Extrude works
- [ ] Inset works
- [ ] Knife works
- [ ] Extract works
- [ ] Face Bridge works
- [ ] Delete Face works safely

## Through / topology-sensitive extrusion

- [ ] normal Through works
- [ ] Through into an existing cavity/tunnel works
- [ ] continuing through a cavity to a farther outer wall works
- [ ] multiple ordered Through targets work where supported
- [ ] invalid Through topology rolls back cleanly
- [ ] unrelated Extrude/Inset behaviour is unchanged after Through edits

## Clean for SubD / Quad Clean
- [ ] Clean for SubD must preserve sharp geometric folds/corners even when those edges are not explicitly creased
- [ ] all-quad relaxation may only move vertices across a genuinely smooth incident normal fan

- [ ] Clean for SubD button is available in Object > Active Tools
- [ ] locked/reference objects cannot be destructively cleaned
- [ ] safe four-triangle fan repair works
- [ ] conservative sliver/skinny-triangle repair works
- [ ] bounded even triangle islands can be proposed up to the current 40-triangle envelope
- [ ] a safe 40-triangle strip can resolve to 20 quads
- [ ] a 42-triangle connected island remains outside the bounded complete-matching stage
- [ ] poor-quality patches are preserved rather than forced
- [ ] surrounding quad-flow context influences candidate quality
- [ ] internal proposed-quad flow coherence influences candidate quality
- [ ] coherent neighboring proposed quads score better than an equivalent zig-zag internal flow arrangement
- [ ] completed-patch ranking prefers smooth interior vertices closer to quad valence 4 when safe alternatives exist
- [ ] crease/boundary-protected vertices are excluded from valence regularity scoring
- [ ] equal-average valence alternatives prefer the patch with the lower worst local valence error
- [ ] equal-average internal-flow alternatives prefer the patch with the lower worst local flow mismatch
- [ ] topology audit accepts valid open-boundary meshes
- [ ] topology audit rejects duplicate/non-manifold/collapsed topology deterministically
- [ ] core Clean for SubD pipeline is transactional and restores the original mesh if a stage fails its topology audit
- [ ] generated irregular triangulated-strip fixtures remain topologically valid after cleanup
- [ ] safe remaining triangle pairs can merge to quads
- [ ] all-quad tangent relaxation remains guarded
- [ ] topology validation rejects/rolls back invalid results
- [ ] no-change result reports safely without corrupting the mesh
- [ ] Undo/Redo remains valid after a clean operation

## Phase D â€” Array

- [ ] Array opens with Count=2: source + exactly one highlighted END preview copy
- [ ] Spacing slider is no longer part of the primary Array UX
- [ ] END preview can be dragged with Pencil/finger
- [ ] Free endpoint movement follows the current camera/view plane
- [ ] X / Y / Z endpoint modes constrain only the selected world-axis component
- [ ] switching Free/X/Y/Z during one preview preserves the existing endpoint position
- [ ] Count includes source and END and supports 2â€“12 total objects
- [ ] increasing Count fills intermediate previews evenly between source and END
- [ ] diagonal/3D END vectors produce evenly spaced diagonal/3D intermediate copies
- [ ] END copy stays visually stronger than intermediate preview copies
- [ ] Count works with finger and Apple Pencil without late native snap-back
- [ ] changing Count/endpoint remains preview-only and does not create history
- [ ] Apply Array creates linked instances at the exact preview positions
- [ ] source geometry edits propagate to every Array instance after Apply
- [ ] Array instances retain independent object placement
- [ ] source object remains active after Apply
- [ ] Apply Array is one Object-scene Undo step and Redo restores all generated instances
- [ ] Active Tools remains open throughout Array preview
- [ ] locked/reference objects cannot Array
- [ ] existing Linked Duplicate / Make Unique behavior remains unchanged

## Cross-mode â€” Delete / Backspace keyboard routing

- [ ] Delete/Backspace in Object mode triggers existing Outliner Delete behavior
- [ ] Delete/Backspace in Face mode deletes selected face(s) exactly like Face > Delete
- [ ] Delete/Backspace in Edge mode deletes selected edge(s) exactly like Edge > Delete
- [ ] Delete/Backspace in Vertex mode deletes selected vertex/vertices exactly like Vertex > Delete
- [ ] component Delete remains one normal Undo step through existing handlers
- [ ] Delete/Backspace does not fire while typing in inputs, textareas, selects or contenteditable fields
- [ ] Object Multi/Group delete behavior remains unchanged

## Phase D â€” Revolve Profile â€” .392 post-Apply selection

- [ ] Apply Revolve leaves the Revolve object as the normal single active Object selection
- [ ] any previously active/inactive cube loses stale amber/blue Boolean tint after Apply
- [ ] Object Multi mode is not left armed by Revolve Apply
- [ ] Boolean A/B tint still appears correctly when two objects are deliberately selected afterward
- [ ] Undo/Redo of Revolve Apply does not corrupt authoritative Object selection
- [ ] Studio/Solid view materials remain normal after Apply

## Phase D â€” Revolve Profile â€” .391 Active Tools

- [ ] newly added Revolve Profile may remain in positioning mode without forcing Active Tools
- [ ] moving the Revolve plane opens Active Tools automatically
- [ ] rotating the Revolve plane opens Active Tools automatically
- [ ] scaling the Revolve plane opens Active Tools automatically
- [ ] snapping/repositioning the Revolve plane opens Active Tools automatically
- [ ] Edit Profile opens Active Tools immediately
- [ ] Active Tools stays open while active Revolve construction tooling is in use
- [ ] Apply Revolve releases the drawer lock
- [ ] switching away from the construction does not leave a stale drawer lock

## Phase D â€” Revolve Profile â€” .390 point editing

- [ ] tapping/pressing an existing profile point selects it
- [ ] selected profile point has a clear persistent highlight
- [ ] dragging selected point reshapes profile and live preview
- [ ] tapping close to a profile segment inserts a point into that segment
- [ ] inserted point appears between the correct two chain points
- [ ] tapping away from points/segments still appends at the end
- [ ] Delete Point removes only the selected profile point
- [ ] Delete Point disables when no profile point is selected
- [ ] Undo Point reverses add / insert / delete / drag profile edits
- [ ] Clear removes all points and clears point selection
- [ ] touch navigation remains available while Edit Profile is ON
- [ ] Apply Revolve after inserted/deleted points produces ordinary editable mesh

## Phase D â€” Revolve Profile â€” .389 refinement

- [ ] new Revolve Profile starts with Edit Profile OFF
- [ ] construction plane can Move / Rotate / Scale before drawing
- [ ] existing Object Geometry Snap can position the construction plane against another object
- [ ] after positioning, Edit Profile resumes plane-constrained authoring
- [ ] one-finger orbit works while Edit Profile is ON
- [ ] two-finger pan and pinch zoom work while Edit Profile is ON
- [ ] Apple Pencil still adds and drags profile points while touch remains navigation
- [ ] Segments permits 3, 4, 5 and all values through 64
- [ ] 3-segment Revolve preview and Apply produce valid triangular radial form
- [ ] concave/overhanging profiles finish with topologically unified face winding
- [ ] no isolated inward-normal bands appear on concave Revolve results
- [ ] .388 live preview / Undo Point / Clear / Apply behaviors remain unchanged

## Phase D â€” Live Revolve Profile construction

- [ ] Add â†’ Revolve Profile creates a construction plane
- [ ] left edge of construction plane is visibly blue and acts as the revolve axis
- [ ] Edit Profile: tap plane adds points constrained to the plane
- [ ] consecutive profile points connect automatically as one open chain
- [ ] dragging a profile point keeps it on the construction plane
- [ ] dragging a profile point updates the revolved fill + wire preview live
- [ ] profile points near the blue axis snap exactly onto it
- [ ] toggling Edit Profile off restores viewport navigation without losing points
- [ ] toggling Edit Profile back on resumes profile editing
- [ ] Segments 6â€“64 updates preview live with finger and Apple Pencil
- [ ] Undo Point reverses the last profile authoring gesture
- [ ] Clear removes profile points but preserves the construction plane
- [ ] moving/rotating/scaling the construction plane keeps profile + preview attached
- [ ] Apply Revolve converts the construction to ordinary editable mesh geometry
- [ ] Apply Revolve is one Undo step; undo back to construction plane restores live profile state
- [ ] legacy loose-edge Revolve remains available

## Phase D â€” Revolve / Lathe

- [ ] Revolve is available in Edge mode for a standalone loose-edge profile
- [ ] entire loose profile must be selected; partial selection refuses
- [ ] branched loose profiles refuse
- [ ] closed-loop loose profiles refuse in the foundation build
- [ ] stray loose vertices outside the profile refuse
- [ ] X / Y / Z axis buttons revolve through active Object Origin
- [ ] Segments 6â€“64 updates preview live with finger and Apple Pencil
- [ ] first Revolve tap creates a non-destructive translucent fill + wire preview
- [ ] Revolve preview shows the active axis guide
- [ ] profile vertices on the axis collapse to a single pole rather than duplicate degenerate rings
- [ ] endpoints off-axis remain open boundary rings
- [ ] Apply Revolve converts the loose profile into ordinary editable faces
- [ ] Apply Revolve clears loose topology and is one Undo step
- [ ] existing Array, outward/inward Extrude, Through and navigation remain unchanged

## Phase D â€” Solidify / Shell foundation

- [ ] Shell appears in Face > Active Tools when one or more Faces are selected on an editable closed solid
- [ ] one selected cube Face becomes one open top/rim while the result remains a watertight solid shell
- [ ] adjacent selected Faces can create one larger connected opening
- [ ] Shell Thickness preview updates before Apply Shell commits
- [ ] Shell preview shows interior/back faces clearly from both viewing directions, not just wireframe edges
- [ ] Shell preview retains visible topology edges over the translucent filled preview
- [ ] Shell Thickness gives the same selected value with Apple Pencil and finger input
- [ ] Apple Pencil dragging Shell Thickness no longer snaps the value to the 0.01 minimum
- [ ] Pencil-selected Shell Thickness remains unchanged after Pencil-up (late Safari input/change cannot overwrite it)
- [ ] Finger can immediately take over the slider normally after Pencil ownership releases
- [ ] Pencil drag remains stable if the Pencil leaves the slider track while still pressed
- [ ] Pencil and finger both update the same visible thickness output and preview
- [ ] Apply Shell clears stale Face selection created against pre-compaction Face indices
- [ ] Shell uses the same inward hard-fold offset behaviour as Solidify
- [ ] Shell refuses open-sheet input, loose topology, no selected Faces and all Faces selected without partial mutation
- [ ] Shell preview keeps Active Tools open so Apply Shell remains accessible
- [ ] Shell is one Object-scene Undo step and linked-instance save propagation remains intact

- [ ] Solidify is available in Object > Active Tools with a Thickness control
- [ ] one open quad Solidify produces a closed six-face solid
- [ ] a connected multi-face open sheet Solidify produces one watertight solid and bridges every boundary edge
- [ ] flat Solidify offsets the duplicate shell consistently by the requested thickness
- [ ] a 90Â° folded multi-sheet preserves full requested thickness to both source planes using a proper miter/plane intersection
- [ ] existing crease weights are preserved on the original shell and copied to the inner shell
- [ ] Solidify refuses an already closed mesh without mutation
- [ ] Solidify refuses non-manifold, branched-boundary, inconsistent-winding, duplicate/degenerate or zero-area input without partial mutation
- [ ] Solidify output is topology-validated as closed/manifold and rolls back if validation fails
- [ ] first Solidify tap creates a non-destructive preview rather than committing
- [ ] Thickness slider updates the Solidify preview live
- [ ] Pencil/finger can press the translucent generated shell and drag interactively to change thickness
- [ ] direct thickness drag follows the picked preview face's projected normal rather than a fixed screen axis
- [ ] direct drag updates the Thickness slider/output continuously
- [ ] OrbitControls pauses only during direct thickness drag and restores immediately on release/cancel
- [ ] Active Tools stays open for the entire armed Solidify preview/drag session so Apply Solidify remains accessible
- [ ] Solidify uses the existing drawer keep-open contract without changing drawer-ui global behaviour
- [ ] Apply/Cancel releases Solidify's temporary drawer lock cleanly
- [ ] direct drag clamps safely to the Thickness control range and creates no history entry
- [ ] preview visually distinguishes generated inner shell / boundary walls from the unchanged source sheet
- [ ] Apply Solidify commits geometry matching the preview
- [ ] leaving Object mode or changing active object cancels preview without mutation
- [ ] Solidify is one Object-scene Undo step and Redo restores the solid
- [ ] Solidify on a linked instance propagates shared geometry without collapsing independent instance placement
- [ ] Reference / locked objects cannot Solidify
- [ ] frozen `/beta-3/` remains unchanged

## Boolean / extraction

- [ ] Boolean workflow works
- [ ] Boolean and Join both use the authoritative Object scene-history bridge; Boolean must not install a second Undo/Redo wrapper
- [ ] Boolean Undo restores the two selected originals with linked-instance metadata/placements intact; Redo restores the unique result
- [ ] Boolean hides only the selected A/B operands; unselected linked peers remain unaffected
- [ ] Boolean result is unique even when an operand was linked
- [ ] Boolean cleanup does not leave duplicate/degenerate faces
- [ ] Extract + Undo works
- [ ] Extract + Redo works

## Modifiers / display

- [ ] Mirror X works
- [ ] Mirror Y works
- [ ] Mirror Z works
- [ ] Align Object to Mirror works where enabled
- [ ] SubD Preview works
- [ ] Show Cage works
- [ ] SubD levels 1â€“4 behave correctly
- [ ] Studio realtime mode works
- [ ] multiple objects display correctly in Studio
- [ ] ground plane / lighting does not incorrectly follow only the active object

## Import / export

- [ ] Editable OBJ import works
- [ ] Editable GLB/GLTF import works where supported
- [ ] Reference import works
- [ ] Base OBJ export works
- [ ] multi-object Base OBJ export works
- [ ] SubD OBJ export works
- [ ] multi-object SubD OBJ export works

## History / transaction safety

- [ ] Undo works after the changed workflow
- [ ] Redo works after the changed workflow
- [ ] failed topology operations restore the pre-operation mesh
- [ ] object-manager state remains synchronized after geometry commits
- [ ] no partial mutation remains after a rejected operation

## UI / release integrity

- [ ] visible app version matches intended release
- [ ] protected multi-object-transform legacy v0.36.1.0 stamp cannot override the current release label/title
- [ ] module cache pins changed only where intended
- [ ] `styles.css?v=0.36.18.270` remains pinned unless deliberately changed
- [ ] `src/multi-object-transform.js?v=0.36.1.0` remains untouched unless deliberately changed
- [ ] `component-multi-init.js?v=0.36.18.314` remains present/pinned unless component-selection startup is deliberately changed
- [ ] drawer behaviour remains intact
- [ ] no service worker was introduced unintentionally
- [ ] GitHub Pages loads the intended build after release

## Session-specific additions

Add new permanent regression checks below when future features need protection.


## Phase D â€” Sweep Path â€” .393

- [ ] Add â†’ Sweep Path creates a movable/snappable construction plane in Object mode
- [ ] Edit Path lets Apple Pencil/mouse add, insert, select and drag path points while touch navigation remains one-finger orbit / two-finger pan / pinch zoom
- [ ] Undo Point / Delete Point / Clear update the live preview without committing geometry
- [ ] Radius updates the live preview and is Pencil-draggable without late Safari value snap-back
- [ ] Sides 3â€“24 updates the live preview and is Pencil-draggable
- [ ] Caps On/Off toggles both sweep end caps
- [ ] curved multi-point paths keep a coherent section orientation without obvious 180Â° flips
- [ ] Apply Sweep converts the construction into ordinary editable mesh, returns to normal single-object selection and clears stale Boolean A/B tint
- [ ] one Undo returns the applied object geometry to the construction plane state
- [ ] Revolve, Array, Solidify, Shell, Through and touch navigation remain unchanged


## Phase D â€” Sweep Path â€” .394

- [ ] Apply Sweep immediately shows the generated Sweep result without requiring object reselection
- [ ] Apply Sweep immediately removes the construction plane/preview overlay
- [ ] Geometry Snap ON can place Sweep path points on visible external vertices
- [ ] Geometry Snap ON can place Sweep path points on visible external edges
- [ ] Geometry Snap ON can place Sweep path points on visible external face hit-points
- [ ] snapped Sweep points may sit off the construction plane and the live preview follows the resulting 3D path
- [ ] Geometry Snap OFF preserves free construction-plane path drawing
- [ ] touch orbit/pan/pinch remain normal while Pencil/mouse edits the Sweep path


## Phase D â€” Sweep Profile + dual path â€” .395

- [ ] Add â†’ Sweep creates a movable/snappable **Profile Plane**, not a visible path plane
- [ ] Circle and Rectangle create live built-in profiles on the Profile Plane
- [ ] Draw creates a closed editable custom profile on the Profile Plane
- [ ] Edit Profile converts a built-in Circle/Rectangle into editable profile points without losing its current shape
- [ ] profile points can be inserted/moved and Undo Profile / Clear Profile update the live preview
- [ ] Follow Edges can use visible existing object/reference edges even when Geometry Snap is OFF
- [ ] Follow Edges extends along connected existing edges and refuses disconnected continuation edges
- [ ] Draw Path can create/edit path points without displaying a path construction plane
- [ ] Draw Path uses external Vertex/Edge/Face Geometry Snap when enabled
- [ ] profile and path can be edited alternately before Apply without restarting Sweep
- [ ] bent paths keep a stable transported profile orientation without obvious 180Â° flips
- [ ] touch orbit/pan/pinch remain available while Pencil/mouse authors profile/path geometry
- [ ] Apply Sweep converts preview to ordinary editable mesh and removes Profile Plane/preview immediately
- [ ] Apply Sweep remains one normal history step and preserves authoritative single-object selection


## Phase D â€” Sweep Draw Profile fixes â€” .396

- [ ] Profile Plane starts close to the default Circle profile size rather than filling the viewport
- [ ] Draw Profile starts Open and accepts 3+ points by appending points naturally
- [ ] Open Draw Profile previews after 2 points as a swept surface
- [ ] Closed button refuses closure below 3 points and closes a valid 3+ point profile explicitly
- [ ] Closed profile preview generates the normal closed-section Sweep and Caps become available
- [ ] Open profile shows Caps N/A and produces no profile seam/end caps
- [ ] Closed profile can be reopened without losing points
- [ ] Circle/Rectangle remain closed and unchanged
- [ ] Edit Profile on Circle/Rectangle converts current shape to editable closed Draw points


## Phase D â€” Sweep profile orientation â€” .397

- [ ] Closing a custom Draw profile connects the final authored point directly back to point 0 without reordering points
- [ ] Clockwise and counter-clockwise custom profiles preserve authored vertex order
- [ ] Dragging a profile point left moves the Sweep preview left, never mirrored right
- [ ] Profile Plane U/V orientation remains visually consistent whether the path leaves along +normal or -normal
- [ ] Existing Circle/Rectangle profile orientation remains unchanged


## Phase D â€” Sweep concave/start-ring hardening â€” .398

- [ ] Ring 0 exactly matches the authored Profile Plane section; no shifted/rotated/mirrored start section
- [ ] Closed concave C-shaped profile sweeps without inside-out side faces
- [ ] Concave start/end caps triangulate cleanly without fan-overlap artifacts
- [ ] Start cap faces outward opposite the first path segment and end cap faces outward along the final segment
- [ ] Convex Circle/Rectangle/custom profiles remain unchanged
- [ ] Open profiles remain uncapped and unaffected


## Phase D â€” Sweep side normals â€” .399

- [ ] Same concave C-profile used for .398 displays outward side normals around the complete Sweep
- [ ] Side normals stay outward through corners/path direction changes
- [ ] Concave inner returns face the cavity, outer edges face away from the section
- [ ] Clockwise and counter-clockwise authored profiles both produce outward side faces
- [ ] Exact ring-0 profile placement from .398 remains unchanged
- [ ] Concave cap triangulation and convex cap topology remain unchanged


## Phase D â€” Sweep edit ownership â€” .400

- [ ] Draw Profile starts/stays Open until the user explicitly presses Closed
- [ ] Draw Profile accepts point 4 and subsequent points without requiring Open to be reselected
- [ ] Edit Profile disarms Move/Scale/Rotate before Pencil/mouse profile editing begins
- [ ] Draw Path / Follow Edges / Edit Path disarm Move/Scale/Rotate before path authoring begins
- [ ] transform gesture layer yields while Sweep profile/path editing owns the viewport
- [ ] touch orbit/pan/pinch remain available during Sweep editing
- [ ] leaving Sweep editing does not silently re-arm Move


## Phase D â€” Sweep Use Selection â€” .401

- [ ] Select one Face, Add â†’ Sweep, then Use Selection reproduces that face outline on an aligned Profile Plane
- [ ] Select a connected closed Edge loop, Add â†’ Sweep, then Use Selection reproduces the loop in connected order
- [ ] Use Selection is disabled when no valid Face/closed Edge-loop source was captured before Add â†’ Sweep
- [ ] open/disconnected/branched edge selections are rejected rather than converted
- [ ] non-planar selected outlines are rejected rather than flattened silently
- [ ] source object/selection geometry remains unchanged after Use Selection
- [ ] imported selection becomes an editable closed Draw profile via Edit Profile
- [ ] applying Use Selection clears stale path points if the Profile Plane is repositioned


## Phase D â€” Sweep direct selection launch â€” .402

- [ ] With one Face selected, Face Active Tools exposes Sweep from Selection
- [ ] Sweep from Selection captures the Face before Object mode clears component selection
- [ ] Face launch creates Sweep, enters Object mode and immediately loads/aligned the selected Face as the editable profile
- [ ] With a closed Edge loop selected, Edge Active Tools exposes Sweep from Selection
- [ ] Edge launch captures the loop before Object mode handoff and loads it as the editable profile
- [ ] user does not need to manually enter Object mode before launching selected-profile Sweep
- [ ] invalid open/branched/non-planar Edge selections are still rejected by .401 validation


## Phase D â€” closed Sweep profile insertion â€” .403

- [ ] Closed Draw profile in Edit Profile accepts a new node on any profile segment
- [ ] Closing segment from last point back to point 0 also accepts insertion
- [ ] Existing profile vertices still drag normally
- [ ] Open profile append behaviour remains unchanged
- [ ] inserted node updates live Sweep preview immediately


## Phase D â€” selected-profile Sweep anchor â€” .404

- [ ] Face â†’ Sweep â†’ Follow Edges begins directly from a profile vertex on the selected rail, with no profile-centre lead-in
- [ ] nearest profile vertex to the first selected rail endpoint becomes the anchor
- [ ] Profile Plane translates so the anchor vertex sits exactly on that endpoint
- [ ] selected profile shape/offset remains unchanged relative to the anchor
- [ ] subsequent connected Follow Edges continue from the same rail path
- [ ] same behaviour works for closed Edge-loop profile sources
- [ ] Circle/Rectangle Sweep remains centre-anchored
- [ ] Draw Path behaviour remains unchanged when no Follow Edge anchor is established


## Phase D â€” Sweep shell normal unification â€” .405

- [ ] Closed capped selected-Face Sweep has outward normals after Apply
- [ ] Closed capped clockwise and counter-clockwise profiles both resolve to outward shell orientation
- [ ] anchored profile geometry/path placement from .404 remains unchanged
- [ ] concave C-profile Sweep remains clean and outward-oriented
- [ ] open-profile Sweep surfaces are not auto-reversed
- [ ] uncapped closed-profile Sweep surfaces are not volume-flipped


## Phase F â€” Tool Session / Sweep UX â€” .406

- [ ] Face mode with one selected Face shows Sweep near the top of Face Active Tools, not appended at the bottom
- [ ] closed Edge-loop selection shows the same compact Sweep launch near the top of Edge Active Tools
- [ ] Face/Edge â†’ Sweep takes exclusive ownership of Active Tools and opens directly on PATH
- [ ] normal Object tools (Array, Boolean, Clean for SubD, Solidify, etc.) are hidden while the Sweep Tool Session is active
- [ ] PROFILE / PATH / FINISH switch cleanly without scrolling through unrelated controls
- [ ] switching PROFILE/PATH prevents the hidden editor from retaining viewport gesture ownership
- [ ] Object Add â†’ Sweep begins on PROFILE
- [ ] Apply Sweep ends the Tool Session and restores the previous Active Tools drawer state
- [ ] Sweep geometry, snapping, anchoring, normals and Apply behaviour remain unchanged from .405


## Phase D â€” Sweep local winding â€” .407

- [ ] previously isolated Sweep backface is gone
- [ ] every manifold shared edge has opposite face-edge traversal
- [ ] bent selected-profile Sweep remains outward and clean
- [ ] concave C-profile Sweep remains outward and clean
- [ ] .406 Tool Session UX remains unchanged


## Phase D/F â€” Sweep rail-edge visibility â€” .408

- [ ] PATH â†’ Follow Edges shows the full edge network of eligible visible meshes
- [ ] Knife-cut edge across a face is visibly available as a rail
- [ ] Loop Cut/internal topology edges are visible, not only boundary/silhouette edges
- [ ] rail guide is sourced from the same evaluated meshes used by Follow Edges snapping
- [ ] PROFILE hides the rail guide
- [ ] Draw Path hides the rail guide
- [ ] FINISH and Apply remove the rail guide
- [ ] .406 Tool Session and .407 winding behaviour remain unchanged


## Phase D/F â€” Sweep rail contrast / hover â€” .409

- [ ] candidate Follow Edges network has stronger contrast than .408
- [ ] edge under Pencil/cursor receives a distinct hot highlight before selection
- [ ] hot highlight corresponds to the exact edge Follow Edges would select
- [ ] accepted Sweep path is visually distinct from both candidate and hot states
- [ ] hot state clears when leaving PATH or switching to Draw Path
- [ ] Apply/exit clears all temporary rail highlighting
- [ ] .408 internal-edge visibility remains intact


## Phase D/F â€” Follow Edges picker regression â€” .410

- [ ] Follow Edges selects an edge when tapping near either endpoint
- [ ] Vertex proximity no longer steals/rejects a Follow Edges pick
- [ ] hot edge and clicked edge use the same edge-only picker
- [ ] mid-edge picking remains reliable
- [ ] rail reference cache refreshes on entering Follow Edges and clears on exit/Apply
- [ ] Draw Path generic Vertex/Edge/Face snapping remains unchanged
- [ ] .409 candidate/hot/accepted contrast remains intact


## Phase D/F â€” Follow Edges state + rail visibility â€” .411

- [ ] Follow Edges lights immediately when activated
- [ ] Draw Path lights immediately when activated
- [ ] path buttons expose matching aria-pressed state
- [ ] Knife-cut/internal rail edge remains visible over a shaded face
- [ ] rail guide remains temporary and only visible in PATH â†’ Follow Edges
- [ ] .410 edge-only picker behaviour remains unchanged


## Phase D/F â€” hard Follow Edges active-state indicator â€” .412

- [ ] active Follow Edges button literally reads `Follow Edges Â· Active`
- [ ] inactive Follow Edges button reads `Follow Edges`
- [ ] selected path button styling is driven by aria-pressed and remains visible regardless of generic button CSS
- [ ] active candidate rail guide is fully opaque over shaded surfaces
- [ ] .410 picker and .411 rail visibility behavior remain unchanged


## Phase D/F â€” atomic selected-profile Follow Edges handoff â€” .413

- [ ] Face â†’ Sweep opens PATH with `Follow Edges Â· Active` immediately
- [ ] closed Edge-loop â†’ Sweep does the same
- [ ] selected-profile auto launch has `editPath=true`, `pathMode='edges'`, `sessionStage='path'` before save/render events
- [ ] rail refs and button state initialize before `manager.saveActive()`
- [ ] manual Use Selection remains profile-only unless path mode is explicitly activated
- [ ] .410 picker and .412 hard visual state remain unchanged


## Phase D/F â€” Follow Edges rail-state declaration regression â€” .414

- [ ] Follow Edges activates without runtime error
- [ ] `hotRailHit` is declared at module scope
- [ ] `railSnapRefs` is declared at module scope
- [ ] Follow Edges button shows `Follow Edges Â· Active`
- [ ] rail candidate overlay appears immediately
- [ ] .410 edge-only picker and .413 atomic handoff remain intact


## Phase D/F â€” fresh Sweep placement â€” .415

- [ ] Object â†’ Add â†’ Sweep profile plane appears visibly in front of the current active object/scene
- [ ] fresh Sweep plane is camera-facing
- [ ] fresh Sweep remains the active object after creation
- [ ] real Move is armed automatically on the next frame
- [ ] fresh Sweep no longer spawns buried inside the default cube
- [ ] Face â†’ Sweep and Edge-loop â†’ Sweep still use the selected source geometry position/orientation exactly


## Phase F â€” Array Tool Session â€” .416

- [ ] normal Object Active Tools shows one compact Array launcher, not permanent Array controls
- [ ] launching Array makes Array exclusively own Active Tools
- [ ] unrelated Object tools are hidden during Array preview
- [ ] Free / X / Y / Z endpoint constraints behave as before
- [ ] highlighted END copy remains directly draggable in the viewport
- [ ] Count remains Pencil-friendly and redistributes preview live
- [ ] Apply creates evenly spaced linked instances in one scene-history step and restores normal Active Tools
- [ ] Cancel removes preview without creating objects and restores normal Active Tools
- [ ] changing active object or leaving Object mode cancels Array preview safely


## Phase F â€” Array Tool Session ownership â€” .417

- [ ] Array preview remains in exclusive Array Tool Session while repositioning the END copy
- [ ] tapping/dragging the Array preview does not return Active Tools to normal Object tools
- [ ] temporary active-object changes while Array is armed restore the original Array source instead of cancelling
- [ ] Array Tool Session reasserts itself if displaced while preview remains armed
- [ ] endpoint pointer-down is captured before normal object selection on the viewport
- [ ] leaving Object mode still cancels Array safely
- [ ] Apply and Cancel still exit Array and restore normal Active Tools

- [ ] Edge Extrude: select one boundary edge, arm Extrude, drag it to create one quad strip; the new outer edge remains selected and Extrude remains armed
- [ ] Edge Extrude ribbon: repeatedly drag the newly selected outer edge to grow a continuous ribbon without reselecting or leaving Edge mode
- [ ] Edge Extrude chain: select a connected boundary chain and drag; shared vertices stay welded and the new outer chain remains selected
- [ ] Edge Extrude refuses interior or branched selections and Undo removes one pull at a time

- [ ] Edge Extrude constraints: with X/Y/Z selected, drag a boundary edge and confirm the ribbon grows along that world-axis direction projected perpendicular to the source edge
- [ ] Edge Extrude constraints: choose an axis parallel to the source edge and confirm the pull refuses instead of producing a sliver
- [ ] Edge Extrude Auto: Auto or Axis Snap ON chooses one valid X/Y/Z perpendicular direction from the initial drag and keeps it locked through the pull
- [ ] Edge Extrude Free: Axis Snap OFF + Free preserves the original unconstrained ribbon drag

- [ ] Edge Extrude Plane: arm Extrude, choose Plane, drag one boundary edge and confirm free 2D motion remains perpendicular to the grabbed edge
- [ ] Edge Extrude Plane: after a Plane pull, the new outer edge remains selected and another Plane pull can continue immediately
- [ ] Edge Extrude Plane: switching between Plane and X/Y/Z/Auto while Extrude is armed does not disarm the tool

- [ ] Edge Extrude selection handoff: while armed, tap the selected outer edge to deselect it without losing Extrude or the active constraint
- [ ] Edge Extrude selection handoff: tap a different valid boundary edge and confirm selection switches while Extrude + Plane/X/Y/Z/Auto remain armed
- [ ] Edge Extrude direct handoff: drag a different valid boundary edge without preselecting it and confirm BoxLab switches selection and extrudes it in the same gesture

- [ ] Symmetry/Bisect: Object mode launcher opens exclusive Tool Session with visible origin plane
- [ ] Symmetry/Bisect X/Y/Z: changing axis updates live preview around the object local origin
- [ ] Symmetry/Bisect Keep + / Keep âˆ’: retained side swaps correctly
- [ ] Symmetry/Bisect Mirror ON: kept half is mirrored and centre seam is welded
- [ ] Symmetry/Bisect Mirror OFF: destructive bisect leaves the cut boundary open
- [ ] Symmetry/Bisect Apply is one Undo step and Cancel leaves source geometry unchanged
- [ ] Frozen Beta 4 remains v0.36.18.427 while live main advances beyond it

- [ ] Solidify with non-destructive Mirror enabled evaluates the mirrored result, previews correctly, and Apply produces one editable closed solid
- [ ] Solidify Apply on a mirrored object bakes the Mirror result and clears the old Mirror modifier so geometry is not doubled
- [ ] Undo after mirrored Solidify restores the pre-Solidify object/modifier state as one Object-history step

- [ ] Solidify on a mirrored open sheet operates on the base editable half/object and preserves the non-destructive Mirror modifier
- [ ] mirrored Solidify preview shows the added shell geometry on both mirrored sides
- [ ] Solidify Apply leaves Mirror enabled and the resulting mirrored solid visually intact
- [ ] Undo after mirrored Solidify restores the pre-Solidify base mesh while Mirror remains a modifier

- [ ] Solidify + Mirror seam: a half-sheet whose boundary lies on the active mirror plane solidifies without creating a side wall on that seam
- [ ] Solidify + Mirror seam: inner seam vertices remain exactly on the mirror plane after thickness offset
- [ ] Solidify + Mirror seam: evaluated mirrored result is closed/manifold after Apply while the editable half remains open only on symmetry seams
- [ ] Mirror remains enabled after mirror-aware Solidify Apply

- [ ] Face Delete + Solidify: delete three adjacent faces from a cube and confirm the remaining open 3-face corner Solidifies successfully
- [ ] Face Delete compaction removes only accidental orphan vertices and does not delete explicitly loose vertices/edges
- [ ] Face Delete remains one Undo step and restores the original cube cleanly

- [ ] Symmetry/Bisect .433: drag the yellow X/Y/Z plane with Pencil/mouse and confirm touch still orbits/pans/zooms normally
- [ ] Symmetry/Bisect .433: Geometry Snap moves the plane to active/visible Vertex, Edge/Midpoint or Face hit positions
- [ ] Symmetry/Bisect .433: Reset Origin returns the active plane offset to 0
- [ ] Symmetry/Bisect .433: Keep + / Keep âˆ’ and Mirror remain live while the plane is moved
- [ ] Symmetry/Bisect .433: Apply welds mirrored geometry on the moved plane and Undo restores the source object in one step

- [ ] Symmetry/Bisect .434: while the Tool Session is active, Rotate changes the yellow plane and does not rotate the source object
- [ ] Symmetry/Bisect .434: Move continues to move the plane; Scale is disabled for the infinite plane
- [ ] Symmetry/Bisect .434: Free Rotate produces a true oblique cut/mirror, not just a rotated guide
- [ ] Symmetry/Bisect .434: X/Y/Z transform constraints rotate the plane around the chosen world axis; 15Â° rotation snap still applies
- [ ] Symmetry/Bisect .434: Apply/Cancel restores normal Object transform ownership

- [ ] Symmetry/Bisect .435: Align to Face arms a one-shot pick and tapping a source face moves/orients the plane to that face
- [ ] Symmetry/Bisect .435: Align to Face ignores touch navigation and uses Pencil/mouse for the face pick
- [ ] Symmetry/Bisect .435: Flip Plane reverses the plane normal in place and Keep + / Keep âˆ’ responds predictably
- [ ] Symmetry/Bisect .435: after Align to Face, Move and Rotate continue to edit the plane and Apply creates the matching cut/mirror

- [ ] Transform Tool .436: select one editable object, start Transform, tap a face on another visible object and confirm the object centre snaps to the hit while +Y aligns to the face normal
- [ ] Transform Tool .436: Pencil/mouse drag in Move slides across the picked surface plane while touch still orbits/pans/zooms
- [ ] Transform Tool .436: a tap cycles Move â†’ Rotate â†’ Scale â†’ Move without moving the object
- [ ] Transform Tool .436: Rotate spins around the target face normal and honours existing 15Â° snap; Scale works from the placement point
- [ ] Transform Tool .436: Cancel restores the exact pre-tool scene; Apply is one Object Undo step
- [ ] Transform Tool .436: linked objects retain shared geometry while placement remains independent through the existing instanceMatrix path

- [ ] Transform Tool .437: launch Transform and first tap chooses a source face on the selected object
- [ ] Transform Tool .437: second tap chooses the target face on another visible object
- [ ] Transform Tool .437: source face centre lands on the target hit point and source/target normals oppose, producing face-to-face contact without half the object intersecting the target
- [ ] Transform Tool .437: Move â†’ Rotate â†’ Scale tap-cycle remains unchanged after face-to-face placement

- [ ] Insert Tool .438: select one editable Object, launch Insert, pick a source face, then pick a target face on another visible object
- [ ] Insert Tool .438: the target pick creates a linked instance and leaves the original source object in place
- [ ] Insert Tool .438: the source face lands face-to-face on the target; Move â†’ Rotate â†’ Scale tap-cycle behaves like Transform while touch navigation remains normal
- [ ] Insert Tool .438: after Apply, component edits propagate between source and inserted instance while their Object placements remain independent
- [ ] Insert Tool .438: Cancel removes the temporary inserted instance exactly; Apply is one Object Undo step and Undo removes the insertion

- [ ] Mesh Health .439: default closed cube reports Closed Â· Clean with zero boundary/non-manifold/orphan issues
- [ ] Mesh Health .439: a valid open sheet reports Open Â· Clean rather than Issues Found
- [ ] Mesh Health .439: broken topology reports counts for non-manifold/duplicate/degenerate/winding/orphan problems as applicable
- [ ] Mesh Health .439: triangle/quad/ngon counts match the inspected active mesh
- [ ] Mesh Health .439: Refresh updates the report after edits without changing geometry
- [ ] Mesh Health .439: Close leaves mesh/history untouched and restores normal Object Active Tools

- [ ] Mesh Health .440: Safe Repair is disabled when the active mesh has no safe automatic repair candidates
- [ ] Mesh Health .440: exact same-direction duplicate faces are removed and report updates immediately
- [ ] Mesh Health .440: zero-area faces are removed without changing healthy faces
- [ ] Mesh Health .440: accidental orphan vertices are compacted while intentional loose vertices/edges are preserved
- [ ] Mesh Health .440: opposite-winding coincident faces are not auto-deleted
- [ ] Mesh Health .440: one Undo restores the exact pre-repair Object scene

- [ ] Mesh Health .441: cube with one deleted face reports Open Â· Clean and enables Auto Close
- [ ] Mesh Health .441: Auto Close caps the hole with correct winding and immediately reports Closed Â· Clean
- [ ] Mesh Health .441: multiple disjoint simple holes close together in one operation
- [ ] Mesh Health .441: branched/open boundary graphs keep Auto Close disabled/refused
- [ ] Mesh Health .441: meshes with existing topology issues are not auto-capped
- [ ] Mesh Health .441: one Undo restores the exact pre-close open mesh

- [ ] Mesh Health .442: a cube with one deleted face reports one boundary group / one loop
- [ ] Mesh Health .442: branched boundary topology is labelled branched rather than a closable loop
- [ ] Mesh Health .442: Select Boundary exits to Edge mode with all boundary edges selected
- [ ] Mesh Health .442: Select Non-Manifold exits to Edge mode with all non-manifold edges selected
- [ ] Mesh Health .442: diagnostic selection does not change geometry or create an Undo step

- [ ] Mesh Health .443: reversing one cube face makes Unify Winding available and it restores consistent winding
- [ ] Mesh Health .443: Flip Normals reverses the whole object and one Undo restores the prior winding
- [ ] Mesh Health .443: Triangulate converts cube quads to triangles while staying Closed Â· Clean
- [ ] Mesh Health .443: concave n-gon triangulates without creating invalid/non-manifold topology
- [ ] Mesh Health .443: each normals/triangulation action is one Object Undo step

- [ ] Export .444: Base OBJ status reports closed/open/issues preflight counts
- [ ] Export .444: exported OBJ contains per-object Mesh Health comments and scene preflight summary
- [ ] Export .444: OBJ contains both object and group records for each editable object
- [ ] Export .444: Mirror is evaluated before export preflight
- [ ] Export .444: SubD OBJ preflight reflects the subdivided export mesh, not only the base cage
- [ ] Export .444: Reference objects remain excluded from scene OBJ export

- [ ] Facegroups .445: import one OBJ object with 8 groups and confirm it remains one BoxLab object by default
- [ ] Facegroups .445: imported object retains 8 facegroup IDs internally
- [ ] Facegroups .445: enable Split objects by groups and confirm the same file imports as 8 BoxLab objects
- [ ] Facegroups .445: Base OBJ export writes one object plus preserved group records and round-trips the 8 groups
- [ ] Facegroups .445: moving/scaling/rotating the object does not lose facegroup metadata
- [ ] Facegroups .445: Extrude/Inset/face split descendants inherit the parent facegroup
- [ ] Facegroups .445: Mirror/SubD descendants inherit parent facegroups
- [ ] Facegroups .445: new Auto Close cap faces are ungrouped

- [ ] Facegroups .446: Viewport > Render Look includes Facegroups
- [ ] Facegroups .446: imported groups display with distinct stable colours
- [ ] Facegroups .446: ungrouped faces display neutral grey
- [ ] Facegroups .446: switching back to Studio/Solid restores normal rendering
- [ ] Facegroups .446: Mirror/SubD descendants retain and display inherited group colours
- [ ] Facegroups .446: inactive objects also show facegroup colours

- [ ] Facegroups .447: colour controls appear only while Viewport > Facegroups is active
- [ ] Facegroups .447: Default / Soft / Vivid / High Contrast visibly change the palette
- [ ] Facegroups .447: Saturation and Lightness update facegroup display live
- [ ] Facegroups .447: Ungrouped colour updates ungrouped faces only
- [ ] Facegroups .447: Reseed changes group colour assignment without changing facegroup IDs
- [ ] Facegroups .447: Reset restores default facegroup display settings
- [ ] Facegroups .447: settings persist after reload while OBJ export remains unchanged

- [ ] Facegroups .448: from Studio/Solid, first tap on Facegroups immediately shows group colours with no palette-button press
- [ ] Facegroups .448: first activation never renders the mesh near-black if evaluated mesh/body geometry is temporarily unsynchronised
- [ ] Facegroups .448: current persisted palette/Saturation/Lightness/Ungrouped settings are applied on first activation
- [ ] Facegroups .448: switching away and back to Facegroups immediately restores colours

- [ ] Viewport .449: menu remains within iPad landscape screen height
- [ ] Viewport .449: menu scrolls vertically with touch/Pencil when content exceeds available height
- [ ] Viewport .449: Facegroup colour controls and lower Studio Light controls are reachable without browser-page scrolling
- [ ] Viewport .449: tapping View Direction / Render Look controls still works after scrolling

- [ ] UI .450: Object mode home shows launch buttons only; inactive Symmetry/Transform/Insert/Mesh Health/Array/Revolve/Sweep settings are not visible
- [ ] UI .450: pressing an Object Tool Session launcher replaces mode-home clutter with that tool's settings, then returns cleanly on Apply/Cancel/Close
- [ ] UI .450: Boolean appears as one button at rest; Union/Cut/Intersect appear only after pressing Boolean
- [ ] UI .450: Face mode shows only Shell button at rest; Shell thickness/settings appear only while Shell is active
- [ ] UI .450: Vertex Slide number/exact controls appear only while Slide is active
- [ ] UI .450: Vertex Bevel width/exact controls appear only while Bevel is active
- [ ] UI .450: Edge and Face existing direct-tool behaviour remains unchanged

- [ ] UI .451: Face Inset arms normally and drag performs Inset rather than Move
- [ ] UI .451: Face Extrude retains strong cavity-aware Through behaviour from the proven pre-clean baseline
- [ ] UI .451: Face Exact row is absent at rest and appears as Extrude Exact / Inset Exact only for the armed tool
- [ ] UI .451: Edge Bevel arms and drag bevels the selected edge(s)
- [ ] UI .451: Edge Lathe/Revolve shows one launcher at rest; axis/segments/Apply/Cancel appear only while active
- [ ] UI .451: Edge Slide / Offset / Loop / Bevel settings are contextual rather than permanently exposed
- [ ] UI .451: Vertex Bevel arms and drag bevels the selected vertex/vertices
- [ ] UI .451: Boolean Union/Cut/Intersect result returns to the exact pre-Boolean scene with one Undo
- [ ] UI .451: Revolve Profile launches directly from Active Tools, can be positioned/edited, and Cancel restores the pre-tool scene

- [ ] .452 Face Inset: with Move previously used, arm Inset and drag selected face; transform must not steal gesture
- [ ] .452 Edge Bevel: with Move previously used, arm Bevel and drag selected edge(s); bevel owns pointer
- [ ] .452 Vertex Bevel: with Move previously used, arm Bevel and drag selected vertex/vertices; bevel owns pointer
- [ ] .452 Edge Revolve: launcher directly arms selected loose-edge profile and reveals axis/segments/Apply/Cancel
- [ ] .452 Boolean: Union/Cut/Intersect result returns to exact pre-operation scene with one Undo
- [ ] .452 Through: cavity-aware Through remains unchanged and still passes previous hard cases


## v0.36.18.453 recovery sanity

- [ ] Inset arms and drags the inset rather than moving the selected Face
- [ ] Edge Bevel arms and Pencil drag produces a bevel
- [ ] Vertex Bevel arms and Pencil drag produces a bevel
- [ ] Boolean direct controls operate and one Undo restores the exact pre-Boolean scene
- [ ] Edge Revolve arms and produces its preview/result using the proven pre-cleanup interaction path
- [ ] orbit / pan / zoom remain available whenever no direct tool owns the gesture
- [ ] the .450-.452 presentation wrappers are not loaded in the live runtime


## v0.36.18.454 interaction recovery

- [ ] one-finger touch orbits without component paint-selection stealing the gesture
- [ ] two-finger pan and pinch zoom begin reliably over mesh geometry
- [ ] Face Inset arms and drags the inset rather than moving the selected Face
- [ ] Edge Bevel arms and Pencil drag produces a bevel
- [ ] Vertex Bevel arms and Pencil drag produces a bevel
- [ ] Boolean operation completes and one Undo restores the pre-operation scene
- [ ] Edge Revolve arms and produces its preview/result
- [ ] inactive Symmetry / Transform / Insert sessions do not affect viewport interaction


## v0.36.18.449 recovery baseline

- [ ] one-finger orbit, two-finger pan and pinch zoom work over mesh geometry
- [ ] Face Extrude works with the established .449 interaction path
- [ ] Face Inset works with the established .449 interaction path
- [ ] Extrude Through retains the strong cavity-aware behaviour present at .449
- [ ] Edge Bevel and Vertex Bevel arm and drag correctly
- [ ] Boolean completes and one Undo restores the exact pre-Boolean scene
- [ ] Edge Revolve works using the .449 interaction path
- [ ] Object/Face/Edge/Vertex mode switching and persistent selection remain stable


- [ ] Facegroups .455: colour controls appear only while Facegroups is active
- [ ] Facegroups .455: Default / Soft / Vivid / Contrast visibly change group colours
- [ ] Facegroups .455: Saturation and Lightness update display live
- [ ] Facegroups .455: Ungrouped colour changes ungrouped faces only
- [ ] Facegroups .455: Reseed changes display colours without changing group IDs
- [ ] Facegroups .455: Reset restores defaults and settings persist after reload
- [ ] Facegroups .455: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .456: grouped OBJ remains one BoxLab object by default and Facegroups colours are visible
- [ ] Facegroups .456: Split objects by groups checkbox is present and OFF by default
- [ ] Facegroups .456: enabling Split objects by groups imports one object per OBJ group
- [ ] Facegroups .456: Facegroups mode colours active and inactive editable objects from their authoritative mesh data
- [ ] Facegroups .456: Studio â†” Facegroups switching remains clean
- [ ] Facegroups .456: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .457: first tap from Studio/Solid immediately shows facegroup colours without pressing Reseed
- [ ] Facegroups .457: first activation never renders the mesh near-black while geometry is unsynchronised
- [ ] Facegroups .457: persisted palette/Saturation/Lightness/Ungrouped settings apply on first activation
- [ ] Facegroups .457: switching away and back immediately restores colours
- [ ] Facegroups .457: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .458: first activation shows group colours without Reseed
- [ ] Facegroups .458: temporarily unsynchronised body remains normal material, never dark vertex-colour material
- [ ] Facegroups .458: pending body retries automatically and clears pending when colours apply
- [ ] Facegroups .458: switching Studio â†” Facegroups remains clean
- [ ] Facegroups .458: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .459: grouped OBJ + Mirror X shows the same facegroup colour on source and mirrored descendant faces
- [ ] Facegroups .459: Mirror Y/Z and multi-axis Mirror preserve facegroups without colour mismatch/dark fallback
- [ ] Facegroups .459: inactive mirrored objects also show inherited Facegroup colours
- [ ] Facegroups .459: first Facegroups activation remains immediate without Reseed
- [ ] Facegroups .459: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .460: grouped OBJ + SubD Preview preserves parent colours on all subdivided child faces
- [ ] Facegroups .460: SubD levels 1â€“4 preserve facegroup assignment consistently
- [ ] Facegroups .460: SubD + Mirror together preserve inherited colours and do not trigger dark fallback
- [ ] Facegroups .460: inactive SubD objects also show inherited Facegroup colours
- [ ] Facegroups .460: first activation remains immediate without Reseed
- [ ] Facegroups .460: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .461: Safe Repair preserves facegroups on all surviving faces
- [ ] Facegroups .461: Auto Close preserves existing groups and new cap faces appear Ungrouped/neutral
- [ ] Facegroups .461: Unify Winding preserves facegroup assignment
- [ ] Facegroups .461: Flip Normals preserves facegroup assignment
- [ ] Facegroups .461: Triangulate gives each child triangle its parent polygon facegroup
- [ ] Facegroups .461: first activation, Mirror and SubD behaviour remain correct
- [ ] Facegroups .461: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .462: Extract Faces new object retains the selected faces' original group colours
- [ ] Facegroups .462: source object retains correct groups after extraction
- [ ] Facegroups .462: Solidify original + inner duplicate faces share the same group IDs
- [ ] Facegroups .462: Solidify new side-wall faces are Ungrouped/neutral
- [ ] Facegroups .462: Shell preserves surviving groups, inner shell inheritance and ungrouped new side walls
- [ ] Facegroups .462: first activation, Mirror, SubD and Mesh Health preservation remain correct
- [ ] Facegroups .462: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .463: Join two grouped editable objects and confirm every original group colour survives in the combined object
- [ ] Facegroups .463: ungrouped faces remain Ungrouped after Join
- [ ] Facegroups .463: Join with compatible Mirror/SubD settings preserves Facegroup display after evaluation
- [ ] Facegroups .463: first activation, Mirror, SubD, Mesh Health, Extract, Solidify and Shell remain correct
- [ ] Facegroups .463: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Recovery .464: Shell launches, previews, adjusts thickness, Apply works, Cancel leaves source unchanged
- [ ] Recovery .464: Solidify works with its established preview/apply behavior
- [ ] Recovery .464: Extract Faces still preserves Facegroups
- [ ] Recovery .464: Object Join still preserves Facegroups
- [ ] Recovery .464: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .465: Solidify source faces retain original group colours
- [ ] Facegroups .465: Solidify inner duplicate faces inherit the same group colours
- [ ] Facegroups .465: Solidify generated side walls are Ungrouped/neutral
- [ ] Facegroups .465: failed/rolled-back Solidify restores original faceGroups exactly
- [ ] Recovery .465: Shell still launches, previews, adjusts thickness, Apply/Cancel correctly
- [ ] Facegroups .465: prior Mirror/SubD/Mesh Health/Extract/Join and modelling sentinels remain healthy


- [ ] Facegroups .466: Shell on grouped closed mesh still launches, previews, adjusts thickness and applies correctly
- [ ] Facegroups .466: removed opening faces no longer appear in faceGroups
- [ ] Facegroups .466: surviving outer faces retain original Facegroup colours
- [ ] Facegroups .466: inner Shell faces inherit the same groups via Solidify
- [ ] Facegroups .466: generated side walls remain Ungrouped/neutral
- [ ] Facegroups .466: Cancel/rollback restores the exact pre-Shell faceGroups


- [ ] Viewport .467: menu remains within iPad landscape screen height
- [ ] Viewport .467: menu scrolls vertically with touch/Pencil when content exceeds available height
- [ ] Viewport .467: Facegroup controls and lower Studio controls remain reachable
- [ ] Viewport .467: tapping View Direction / Render Look controls still works after scrolling
- [ ] Viewport .467: modelling/navigation sentinels remain unaffected


- [ ] UI .468: Object mode home shows launchers only; inactive Tool Session settings are not visible
- [ ] UI .468: Solidify, Symmetry/Bisect, Transform, Insert, Mesh Health, Array, Revolve Profile and Sweep settings appear only while active
- [ ] UI .468: Boolean appears as one launcher at rest; Union/Cut/Intersect + Close appear only in the Boolean Tool Session
- [ ] UI .468: Apply/Cancel/Close returns the Active Tools drawer cleanly to Object home
- [ ] UI .468: Face Inset still arms/selects/drags correctly
- [ ] UI .468: Edge Bevel and Vertex Bevel still arm/select/drag correctly
- [ ] UI .468: Extrude and cavity-aware Through remain unchanged
- [ ] UI .468: orbit / pan / zoom remain unchanged


- [ ] Workflow .469: Add > Revolve Profile creates the construction plane and opens the expected workflow
- [ ] Workflow .469: Revolve Profile Cancel restores the scene cleanly
- [ ] Workflow .469: Sweep shows Cancel Sweep at Profile / Path / Finish stages
- [ ] Workflow .469: Sweep Cancel restores the pre-Sweep scene and history state
- [ ] Workflow .469: changing selection mode while Sweep is active cancels Sweep cleanly
- [ ] Workflow .469: launching another Tool Session while Sweep is active cancels Sweep first
- [ ] Workflow .469: Inset, Edge Bevel, Vertex Bevel, Extrude, Through and navigation remain unaffected

- [ ] UI .470: Edge mode home shows a single Revolve launcher; Lathe/Revolve label, X/Y/Z and Segments are hidden at rest
- [ ] UI .470: selecting a valid loose-edge profile and pressing Revolve reveals X/Y/Z + Segments and starts the established preview
- [ ] UI .470: Apply returns Revolve to the compact resting state
- [ ] UI .470: leaving Edge mode or other Revolve cancellation returns Revolve to the compact resting state
- [ ] UI .470: Revolve topology/history behavior is unchanged
- [ ] UI .470: Inset, Edge Bevel, Vertex Bevel, Extrude, Through and orbit/pan/zoom remain unaffected

- [ ] Workflow .471: Add > Sweep creates and leaves visible the Sweep construction object rather than immediately restoring the previous scene
- [ ] Workflow .471: newly added Sweep opens its PROFILE / PATH / FINISH Tool Session normally
- [ ] Workflow .471: Cancel Sweep still restores the exact pre-Sweep scene/history
- [ ] Workflow .471: changing selection mode after Sweep already exists still cancels Sweep cleanly
- [ ] UI .471: Edge Active Tools no longer shows Revolve
- [ ] Workflow .471: Inset, Edge Bevel, Vertex Bevel, Extrude, Through and orbit/pan/zoom remain unaffected

- [ ] Workflow .472: Add > Sweep creates a Sweep construction object without any inert/no-op failure
- [ ] Workflow .472: Sweep PROFILE / PATH / FINISH session appears after Add
- [ ] Workflow .472: Cancel Sweep and later selection-mode escape still restore the exact pre-Sweep scene
- [ ] UI .472: Edge Bevel Exact % appears above Slide % and Offset % controls in Edge Active Tools
- [ ] UI .472: Edge Revolve remains absent
- [ ] Workflow .472: Inset, Edge Bevel drag, Vertex Bevel, Extrude, Through and orbit/pan/zoom remain unaffected

- [ ] Workflow .473: Symmetry/Bisect Tool Session exposes an explicit Bisect Only button
- [ ] Workflow .473: Bisect Only inserts a cut across intersected faces while retaining geometry on both sides
- [ ] Workflow .473: Bisect Only does not mirror either side and does not delete either side
- [ ] Workflow .473: moved / rotated / Align-to-Face plane positions are respected by Bisect Only
- [ ] Workflow .473: split faces preserve their source facegroup assignment
- [ ] Workflow .473: existing Symmetry Apply / Keep half behavior remains unchanged

- [ ] UI .474: Vertex mode home hides Slide % exact controls until Slide is armed
- [ ] UI .474: Vertex mode home hides Bevel Width / Exact % controls until Bevel is armed
- [ ] UI .474: arming Slide reveals only Slide controls; disarming or changing mode hides them again
- [ ] UI .474: arming Bevel reveals only Bevel controls; disarming or changing mode hides them again
- [ ] Workflow .474: Vertex Add, Build Edge, Slide drag/exact, Bevel drag/exact, Join, Weld, Delete remain functional
- [ ] Workflow .474: Vertex Move / Scale / Rotate and orbit/pan/zoom remain unchanged

- [ ] UI .475: Edge mode home hides Loop count/slide settings until Loop is armed
- [ ] UI .475: Edge mode home hides Bevel Width / Segments / Exact % until Bevel is armed
- [ ] UI .475: Edge mode home hides Crease Strength until Crease is armed
- [ ] UI .475: Edge mode home hides Slide % until Edge Slide is armed
- [ ] UI .475: Edge mode home hides Offset % / Support Spacing until Offset Loop is armed
- [ ] Workflow .475: Loop Cut, Bevel drag/exact, Crease/Uncrease, Edge Slide, Offset Loop, Fill/Bridge/Dissolve/Delete remain functional
- [ ] Workflow .475: Edge selection, Move / Scale / Rotate and orbit/pan/zoom remain unchanged

- [ ] UI .476: Loop Slide slider sits directly below Loops while Loop is active
- [ ] UI .476: Edge Bevel Exact % row/readout sit directly below Segments while Bevel is active
- [ ] UI .476: Offset Loop Support Spacing sits above Exact Offset % row/readout
- [ ] UI .476: Crease Strength is hidden whenever Crease is not active
- [ ] Workflow .476: arming Bevel / Edge Slide / Offset Loop / Face Split / another Edge tool disarms Crease
- [ ] Workflow .476: choosing Move / Scale / Rotate or leaving Edge mode disarms Crease
- [ ] Workflow .476: Loop, Bevel, Crease, Edge Slide, Offset Loop and navigation remain functional

- [ ] Workflow .477: arming Edge Bevel while Loop is active disarms Loop first
- [ ] Workflow .477: arming Loop while Edge Bevel is active disarms Bevel first
- [ ] Workflow .477: Loop and Bevel are never visually active at the same time
- [ ] Workflow .477: selected Face rotates by viewport drag with Rotate armed
- [ ] Workflow .477: Face Rotate numeric Degrees and X/Y/Z constraints remain functional
- [ ] Workflow .477: Face Move/Scale, Vertex/Edge transforms and orbit/pan/zoom remain unchanged

- [ ] Workflow .478: with Loop active, one tap on Bevel disarms Loop and arms Bevel
- [ ] Workflow .478: with Bevel active, one tap on Loop disarms Bevel and arms Loop
- [ ] Workflow .478: Loop -> Split remains a one-tap handoff

- [ ] Workflow .479: select one Face, arm Rotate, Pencil-drag the selected face and confirm visible rotation
- [ ] Workflow .479: selected Face remains selected after Rotate commit
- [ ] Workflow .479: multi-face selection rotates as one selection about its combined center
- [ ] Workflow .479: Face Move and Scale still work
- [ ] Workflow .479: Vertex / Edge / Object Rotate remain unchanged
- [ ] Navigation .479: one-finger orbit, two-finger pan and pinch zoom remain unchanged while Rotate is not Pencil-dragging a selected Face

- [ ] Workflow .480: Vertex multi-selection rotates with Rotate armed
- [ ] Workflow .480: selected Edge rotates with Rotate armed
- [ ] Workflow .480: selected Face rotates with Rotate armed
- [ ] Workflow .480: Move and Scale still work in Vertex / Edge / Face
- [ ] Navigation .480: orbit / pan / zoom remain unchanged

- [ ] Workflow .481: selected Vertex/Vertices visibly rotate during Pencil drag
- [ ] Workflow .481: selected Edge visibly rotates during Pencil drag
- [ ] Workflow .481: selected Face visibly rotates during Pencil drag
- [ ] Workflow .481: Move and Scale remain functional in Vertex / Edge / Face
- [ ] Navigation .481: one-finger orbit, two-finger pan and pinch zoom remain unchanged outside an active component transform

- [ ] Workflow .482: with Vertex selection + Rotate armed, Pencil-drag anywhere in viewport rotates selection
- [ ] Workflow .482: with Edge selection + Rotate armed, Pencil-drag anywhere in viewport rotates selection
- [ ] Workflow .482: with Face selection + Rotate armed, Pencil-drag anywhere in viewport rotates selection
- [ ] Workflow .482: Move/Scale still require their normal selected-component interaction
- [ ] Navigation .482: orbit/pan/zoom unchanged while Rotate is not armed

- [ ] Workflow .483: Vertex selection rotates in Free/View mode
- [ ] Workflow .483: Edge selection rotates in Free/View mode
- [ ] Workflow .483: Face selection still rotates in Free/View mode
- [ ] Workflow .483: X / Y / Z constrain Vertex / Edge / Face Rotate to the selected world axis
- [ ] Workflow .483: 15Â° button ON snaps component Rotate to 15-degree increments
- [ ] Workflow .483: 15Â° button OFF allows smooth unsnapped rotation
- [ ] Workflow .483: Move / Scale remain unchanged in Vertex / Edge / Face

- [ ] Workflow .484: arm Extrude, tap unselected face -> it adds to current Face selection
- [ ] Workflow .484: arm Extrude, tap already-selected face -> only that face deselects and Extrude stays armed
- [ ] Workflow .484: arm Extrude, drag selected face -> Extrude still executes
- [ ] Workflow .484: repeat the same three checks for Inset
- [ ] Workflow .484: multi-face additive selection still works after an Extrude/Inset operation
- [ ] Regression .484: Through, component Rotate and viewport navigation remain unchanged

- [ ] Workflow .485: Extrude armed -> tap unselected face adds it and keeps previous faces selected
- [ ] Workflow .485: Extrude armed -> tap selected face removes only that face
- [ ] Workflow .485: Extrude armed -> repeat add/remove across several faces without disarming
- [ ] Workflow .485: Extrude armed -> drag unselected face adds it to working selection and extrudes in one gesture
- [ ] Workflow .485: repeat all four checks for Inset
- [ ] Regression .485: Through, component Rotate .483 and viewport navigation remain unchanged

- [ ] Workflow .486: Extrude armed -> repeatedly tap several unselected faces and confirm each stays selected
- [ ] Workflow .486: Extrude armed -> tap selected faces and confirm only those faces deselect
- [ ] Workflow .486: Inset armed -> repeat additive select and deselect across several faces
- [ ] Workflow .486: drag selected or newly hit face still performs the armed tool
- [ ] Regression .486: no face flash/drop during armed selection taps
- [ ] Regression .486: Through, Rotate .483 and viewport navigation remain unchanged

- [ ] Workflow .487: Extrude armed -> tap several different unselected faces and each remains selected
- [ ] Workflow .487: Extrude armed -> tap selected faces to remove them without disarming
- [ ] Workflow .487: Inset armed -> repeat additive and subtractive face selection
- [ ] Workflow .487: drag a selected/newly hit face still performs the armed operation
- [ ] Regression .487: no flash/drop on additive selection
- [ ] Regression .487: Through, Rotate .483 and viewport navigation remain unchanged

- [ ] Workflow .488: Extrude armed -> tap an unselected face and confirm native Face selection adds it without flashing away
- [ ] Workflow .488: continue tapping additional unselected faces and confirm additive selection builds up
- [ ] Workflow .488: tap selected faces to remove them while Extrude stays armed
- [ ] Workflow .488: drag a newly selected face in one gesture and confirm Extrude takes over after threshold
- [ ] Workflow .488: repeat the same four checks for Inset
- [ ] Regression .488: Through, Rotate .483 and viewport navigation remain unchanged

- [ ] Workflow .489: Extrude armed -> tap multiple unselected faces; each remains selected
- [ ] Workflow .489: Extrude armed -> tap selected faces to remove them without disarming
- [ ] Workflow .489: Inset armed -> repeat additive/subtractive multi-selection
- [ ] Workflow .489: drag selected or newly hit face still performs Extrude/Inset
- [ ] Regression .489: Through and component Rotate .483 still work
- [ ] Regression .489: viewport navigation unchanged

- [ ] Workflow .490: Extrude armed -> tap unselected face with no drag; it remains selected
- [ ] Workflow .490: continue tapping more unselected faces; selection builds additively
- [ ] Workflow .490: tap selected faces; they deselect individually
- [ ] Workflow .490: drag after selecting still promotes into Extrude
- [ ] Workflow .490: repeat all four checks for Inset
- [ ] Regression .490: Through, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .491: Extrude armed -> tap unselected face A, B, C with no drag; all remain selected
- [ ] Workflow .491: tap selected face B; only B deselects and Extrude remains armed
- [ ] Workflow .491: repeat additive/subtractive taps for Inset
- [ ] Workflow .491: drag after threshold still performs Extrude/Inset on working selection
- [ ] Regression .491: Through and component Rotate .483 still work
- [ ] Regression .491: viewport navigation unchanged

- [ ] Diagnostic .492: arm Extrude, tap one unselected face without dragging
- [ ] Diagnostic .492: report the final FaceTap status-bar text after the tap
- [ ] Diagnostic .492: repeat once with Inset
- [ ] Do not evaluate progressive disclosure from .492; this build only traces armed Face tap state

- [ ] Workflow .495: with Face 1 selected, arm Extrude and tap overlapping Face 4 position; Face 4 is added instead of Face 1 being removed
- [ ] Workflow .495: tap a selected face where no unselected Face is also under the Pencil; it still deselects
- [ ] Workflow .495: repeat both checks for Inset
- [ ] Workflow .495: drag still promotes into Extrude/Inset normally
- [ ] Regression .495: ordinary Face selection outside armed tools unchanged
- [ ] Regression .495: Through, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .496: arm Extrude, build a multi-face selection, press Selection > Deselect, then tap a new face without re-arming
- [ ] Workflow .496: Extrude remains visibly armed after Deselect
- [ ] Workflow .496: repeat the same empty-selection restart for Inset
- [ ] Regression .496: .495 additive overlap selection still works
- [ ] Regression .496: Through, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .497: Selection depth = Visible, Extrude armed -> tapping a visible face selects only the nearest visible face
- [ ] Workflow .497: build a multi-face selection across separately visible faces without selecting rear faces
- [ ] Workflow .497: tap a selected visible face to deselect it
- [ ] Workflow .497: drag selected visible face(s) -> Extrude operates only on selected visible faces
- [ ] Workflow .497: repeat visible-only checks for Inset
- [ ] Regression .497: no unintended rear-face/through selection while Visible is active
- [ ] Regression .497: Through topology, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .498: Visible + Extrude armed -> tap a visible unselected face; it selects without rear-face selection
- [ ] Workflow .498: tap additional separately visible faces; selection builds additively
- [ ] Workflow .498: tap selected visible face; it deselects
- [ ] Workflow .498: drag selected face(s); Extrude affects only selected visible faces
- [ ] Workflow .498: repeat the same checks for Inset
- [ ] Regression .498: no rear/opposite Face selection while Visible is active
- [ ] Regression .498: Through topology, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .499: Extrude armed -> tap unselected visible face; it remains selected with no flash/drop
- [ ] Workflow .499: tap additional visible faces; selection builds additively
- [ ] Workflow .499: tap selected face; it deselects while Extrude remains armed
- [ ] Workflow .499: drag selected face(s); Extrude works
- [ ] Workflow .499: repeat all checks for Inset
- [ ] Regression .499: no rear/through selection while Visible is active
- [ ] Regression .499: ordinary Face selection outside armed tools unchanged
- [ ] Regression .499: Through topology, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .502: Face home -> exact Value row/readout and Repeat Previous are hidden
- [ ] Workflow .502: arm Extrude -> exact Value row/readout and Repeat Previous appear
- [ ] Workflow .502: disarm Extrude -> contextual controls hide again
- [ ] Workflow .502: arm Inset -> same contextual controls appear
- [ ] Regression .502: armed Extrude/Inset multi-face select/deselect from .501 still works
- [ ] Regression .502: Extrude, Inset, Through, Rotate .483 and viewport navigation unchanged

- [ ] Workflow .503: Face home -> Value/readout/Repeat Previous remain hidden
- [ ] Workflow .503: arm Extrude -> Value/readout/Repeat Previous appear directly below the Extrude/Inset/Knife row
- [ ] Workflow .503: arm Inset -> same placement and visibility
- [ ] Workflow .503: disarm tool -> contextual controls hide again
- [ ] Regression .503: .501 armed Face multi-select/deselect/drag still works

- [ ] Workflow .504: Face mode -> Extrude / Inset / Knife row is directly below FACE title
- [ ] Workflow .504: arm Extrude or Inset -> Value/readout/Repeat appear directly below that primary row
- [ ] Workflow .504: Inspect then Repair sit near the bottom directly above Topology Gate
- [ ] Workflow .504: late startup does not move Inspect/Repair above primary Face tools
- [ ] Regression .504: .501 armed Face multi-select/deselect/drag remains unchanged

- [ ] Workflow .505: Face tools form three compact rows with no full-width Sweep/Join waste
- [ ] Workflow .505: Row 1 = Extrude / Inset / Knife
- [ ] Workflow .505: Row 2 = Sweep / Join Coplanar / Delete
- [ ] Workflow .505: Row 3 = Extract / Duplicate / Bridge
- [ ] Workflow .505: armed Value/readout/Repeat appear between Row 1 and Row 2
- [ ] Workflow .505: Inspect / Repair / Topology Gate are below all modelling rows
- [ ] Regression .505: .501 armed Face multi-select/deselect/drag still works

- [ ] Workflow .506: all Face modelling/repair tools appear above Inspect
- [ ] Workflow .506: Inspect is followed by Repair, then Topology Gate
- [ ] Workflow .506: nothing in Face mode appears below Topology Gate
- [ ] Regression .506: compact .505 rows remain intact
- [ ] Regression .506: .501 Face multi-select/deselect/drag remains unchanged

- [ ] Workflow .507: Row 1 = Extrude / Inset / Knife
- [ ] Workflow .507: Row 2 = Delete / Duplicate / Extract
- [ ] Workflow .507: Row 3 = Join Coplanar / Bridge / Sweep
- [ ] Workflow .507: Row 4 = Shell / Poke / Circle
- [ ] Workflow .507: Row 5 = Close Holes / Triangulate / Flip
- [ ] Workflow .507: Row 6 = Quad Cleanup / Quadify N-gons / blank
- [ ] Workflow .507: Orient Faces remains in Repair
- [ ] Workflow .507: Inspect / Repair / Topology Gate stay below all Face tools
- [ ] Regression .507: .501 armed Face multi-select/deselect/drag remains unchanged

- [ ] Workflow .508: Edge home Row 1 = Loop / Bevel / Crease
- [ ] Workflow .508: Edge home Row 2 = Split / Extrude / Sweep
- [ ] Workflow .508: Edge home Row 3 = Edge Slide / Offset Loop / Uncrease
- [ ] Workflow .508: Edge home Row 4 = Bridge / Fill / Dissolve Loop
- [ ] Workflow .508: Edge home Row 5 = Dissolve Edge / Delete / blank
- [ ] Workflow .508: Loop / Bevel / Crease / Edge Slide / Offset Loop controls appear only when their tool is active
- [ ] Regression .508: Edge Extrude and Sweep still launch and retain their existing handlers
- [ ] Regression .508: Face .501 armed multi-select/deselect/drag, Through, Rotate .483 and viewport navigation remain unchanged

- [ ] Workflow .509: Sweep active tabs/buttons use the same white active appearance as the rest of BoxLab
- [ ] Regression .509: no blue inset outline appears on Follow Edges, Editing Path, Profile/Path/Finish, or other active Sweep controls
- [ ] Regression .509: Sweep workflow behavior remains unchanged

- [ ] Workflow .510: select a valid boundary edge and arm Edge Extrude -> Move becomes visibly active automatically
- [ ] Workflow .510: Edge Extrude starts with Plane selected by default
- [ ] Workflow .510: Plane drag extrudes freely in the plane perpendicular to the grabbed edge
- [ ] Workflow .510: choose X/Y/Z/Auto after arming -> repeated pulls preserve the chosen constraint rather than resetting to Plane
- [ ] Regression .510: Edge Extrude selection switching/repeated pull behavior remains unchanged
- [ ] Regression .510: Face .501, Through, Rotate .483, Sweep .509 and viewport navigation remain unchanged

- [ ] Workflow .511: Vertex tool rows use the same compact 3-column visual rhythm as Edge and Face
- [ ] Workflow .511: Vertex button order remains stable when Add / Build Edge / Slide / Bevel / Create Face / Circle become available
- [ ] Workflow .511: arming Vertex Slide reveals only Slide controls and does not reshuffle the tool buttons
- [ ] Workflow .511: arming Vertex Bevel reveals only Bevel controls and does not reshuffle the tool buttons
- [ ] Regression .511: Vertex selection and Move / Scale / Rotate remain unchanged
- [ ] Regression .511: Edge .510 and Face .501 interaction remain unchanged

- [ ] Recovery .512: app refreshes and loads in Safari
- [ ] Recovery .512: app refreshes and loads in the other browsers that failed on .511
- [ ] Recovery .512: Vertex / Edge / Face modes open normally
- [ ] Recovery .512: confirmed .510 Edge Extrude Move + Plane behavior remains intact

- [ ] Workflow .513: arm Vertex Bevel -> Width appears directly beneath the tool row and Exact % sits immediately beneath Width
- [ ] Workflow .513: disarm Vertex Bevel -> Width and Exact % both disappear without reshuffling Vertex buttons
- [ ] Workflow .513: select vertex A then vertex B -> Merge to First collapses to A's position
- [ ] Workflow .513: reverse the selection order -> Merge to First collapses to the newly first-selected vertex
- [ ] Regression .513: Merge to Center remains unchanged
- [ ] Regression .513: Vertex Add / Build Edge / Slide / Bevel ordering remains stable

- [ ] Workflow .514: arm Edge Slide -> Slide % exact control appears directly beneath the Slide/Offset/Uncrease tool row
- [ ] Workflow .514: arm Offset Loop while Edge Slide is active -> Edge Slide disarms
- [ ] Workflow .514: arm Edge Slide while Offset Loop is active -> Offset Loop disarms
- [ ] Workflow .514: arm Edge Extrude -> Move is active and Plane, not Free, is visibly/default selected
- [ ] Regression .514: change Edge Extrude to X/Y/Z/Auto -> repeated pulls preserve the user-selected constraint
- [ ] Regression .514: Edge Slide drag and exact entry still work
- [ ] Regression .514: Offset Loop drag and exact entry still work

- [ ] Workflow .515: Edge Sweep launches on the first press
- [ ] Workflow .515: Circle is already present/stable before the first Sweep press; no toolbar mutation occurs under the pointer
- [ ] Workflow .515: Sweep Profile / Path / Finish controls use compact BoxLab sizing
- [ ] Workflow .515: Sweep still defaults to the same profile/path behavior and Follow Edges remains functional
- [ ] Regression .515: Edge Slide / Offset / Extrude behavior from .514 remains unchanged

- [ ] Workflow .516: arm Extrude with no Face selected -> drag Face A -> Extrude succeeds
- [ ] Workflow .516: with Extrude still armed -> drag a different unselected Face B -> only Face B extrudes
- [ ] Workflow .516: preselect multiple Faces -> drag one selected Face -> multi-face Extrude still works
- [ ] Workflow .516: repeat the same three checks with Inset
- [ ] Workflow .516: after an unselected-face Extrude/Inset, Repeat Previous becomes available and replays the committed value on another Face
- [ ] Regression .516: tap while Extrude/Inset is armed still toggles Face selection without modelling
- [ ] Regression .516: Extrude Through behavior remains unchanged

- [ ] Workflow .517: Array preview endpoint can be dragged without Objects drawer flicker; Active Tools stays pinned
- [ ] Workflow .517: new Revolve Profile enters with Edit Profile already active
- [ ] Workflow .517: new Revolve Profile can immediately accept profile drawing input
- [ ] Workflow .517: opening Boolean turns Multi selection on while keeping the current active object selected
- [ ] Regression .517: closing Boolean returns to normal Object tooling without losing the active object
- [ ] Regression .517: Array Apply/Cancel and Revolve Apply/Cancel remain unchanged

- [ ] Workflow .518: arm Extrude with nothing selected -> drag Face A -> then drag different unselected Face B -> only Face B extrudes
- [ ] Workflow .518: Face A must not move/deform during the Face B extrusion attempt
- [ ] Workflow .518: after unselected-face Extrude, Repeat Previous becomes available and replays the same Extrude value
- [ ] Regression .518: Inset unselected-face sequence remains passing
- [ ] Regression .518: deliberate preselected multi-face Extrude/Inset remains passing
- [ ] Regression .518: armed tap-selection and Extrude Through remain passing

- [ ] Workflow .519: arm Extrude with nothing selected -> drag Face A -> Extrude succeeds
- [ ] Workflow .519: with Extrude still armed, press and drag a different unselected Face B -> B becomes the live Face immediately and only B extrudes
- [ ] Regression .519: Face A does not move, deform or remain in the drag working set during Face B extrusion
- [ ] Workflow .519: armed tap on an unselected Face still restores the previous selection then performs the normal additive toggle
- [ ] Workflow .519: armed tap on a selected Face still deselects only that Face
- [ ] Workflow .519: Repeat Previous after a successful ordinary Extrude replays the committed Extrude value on another clean Face
- [ ] Regression .519: Inset sequential unselected-face drag, deliberate multi-face Extrude/Inset and Extrude Through remain passing

- [ ] Workflow .520: fresh cube -> arm Extrude -> drag Face A -> ordinary Extrude succeeds
- [ ] Workflow .520: keep Extrude armed -> drag different unselected Face B -> only B extrudes
- [ ] Workflow .520: repeat on a third unselected Face C -> only C extrudes
- [ ] Regression .520: prior Face A does not move/deform when B or C is dragged
- [ ] Workflow .520: after successful ordinary Extrude, Repeat Previous becomes available and replays the same Extrude value on another Face
- [ ] Regression .520: armed Face tap add/remove behavior still works
- [ ] Regression .520: Inset and Extrude Through remain unchanged on clean geometry

- [ ] Deployment .521: Safari refreshes and visibly reports v0.36.18.521
- [ ] Deployment .521: Chrome/other test browsers refresh and visibly report v0.36.18.521
- [ ] Deployment .521: reopening an already-stale tab converges to .521 without manual cache clearing
- [ ] Regression .521: no repeated reload loop once the running shell is .521
- [ ] Regression .521: Face runtime remains main.js .520 + multi-face-direct .519 with no modelling changes

- [ ] Workflow .522: fresh cube -> arm Extrude -> drag Face A -> native single-Face Extrude succeeds
- [ ] Workflow .522: keep Extrude armed -> drag different unselected Face B -> only B extrudes; A remains unchanged
- [ ] Workflow .522: keep Extrude armed -> drag Face C -> only C extrudes
- [ ] Workflow .522: Repeat Previous replays the last ordinary single-Face Extrude value on another Face
- [ ] Regression .522: deliberate 2+ selected Face Extrude still uses connected-band behavior
- [ ] Regression .522: Extrude Through and Inset unchanged on clean geometry

- [ ] Workflow .523: fresh cube -> Extrude Face A
- [ ] Workflow .523: keep Extrude armed -> drag visibly different Face B; B must be chosen even if A is the nearer overlapping ray hit
- [ ] Workflow .523: A remains unchanged during B drag
- [ ] Workflow .523: repeat with Face C
- [ ] Regression .523: tapping the already-selected Face still allows normal deselect when there is no unselected overlapping hit
- [ ] Regression .523: deliberate multi-face Extrude, Inset and Through unchanged

- [ ] Workflow .525: A Extrude -> B Extrude while Extrude remains armed
- [ ] Diagnostic .525: B reaches FACE DEBUG DRAG-START with hit/faces matching B
- [ ] Workflow .525: A remains unchanged while B extrudes
- [ ] Workflow .525: C sequential Extrude also works
- [ ] Regression .525: inward Extrude / Through fallback still takes over only on the resolved current single Face
- [ ] Regression .525: ordinary Extrude Through remains functional

- [ ] Workflow .526: select 2+ visible faces deliberately
- [ ] Workflow .526: with Extrude armed, drag from one selected face -> whole selected set extrudes
- [ ] Workflow .526: no unselected/rear face is substituted into the operation
- [ ] Regression .526: A -> B sequential single-Face Extrude remains PASS
- [ ] Regression .526: C sequential single-Face Extrude remains PASS
- [ ] Regression .526: Extrude Through / inward fallback still works on resolved current single Face

- [ ] Workflow .527: select one Face -> arm Inset -> drag that same selected Face
- [ ] Workflow .527: Inset operates the pressed selected Face, not a rear/unselected Face
- [ ] Workflow .527: select 2+ Faces -> Inset preserves and operates the selected set
- [ ] Regression .527: A -> B sequential Extrude remains PASS
- [ ] Regression .527: deliberate multi-face Extrude remains PASS
- [ ] Regression .527: Extrude Through / inward fallback unchanged

- [x] Stable .527: sequential armed single-Face Extrude A -> B PASS
- [x] Stable .527: deliberate multi-face Extrude PASS
- [x] Stable .527: single-Face Inset PASS
- [x] Stable .527: multi-face Inset PASS

- [ ] Workflow .528: ordinary Extrude -> Repeat Previous -> tap another Face -> same stored Extrude value applied
- [ ] Workflow .528: repeated Extrude stays on tapped/selected Face and does not substitute a rear Face
- [ ] Workflow .528: ordinary Inset -> Repeat Previous -> tap another Face -> same stored Inset distance applied
- [ ] Workflow .528: Repeat remains armed for additional Face taps until explicitly turned off
- [ ] Regression .528: sequential A -> B Extrude remains PASS
- [ ] Regression .528: single/multi-face Inset remains PASS

- [ ] Workflow .529: explicitly select visible front Face -> arm Extrude -> drag same Face; selected Face extrudes
- [ ] Workflow .529: no rear/unselected Face substitution after deliberate preselection
- [ ] Regression .529: after successful Extrude, keep armed -> drag another Face B -> sequential A -> B still PASS
- [ ] Regression .529: deliberate multi-face Extrude remains PASS
- [ ] Regression .529: single/multi-face Inset remains PASS
- [ ] Workflow .529: Repeat Extrude and Repeat Inset still to be hands-on closed

- [ ] Workflow .530: normal Extrude -> Repeat Extrude -> tap another Face -> exact stored value applied
- [ ] Workflow .530: Repeat Extrude remains on the tapped target Face
- [ ] Workflow .530: normal Inset -> Repeat Inset -> tap another Face -> stored inset distance applied
- [ ] Workflow .530: Repeat remains armed for another Face tap
- [ ] Regression .530: deliberate selected-Face Extrude remains PASS
- [ ] Regression .530: sequential A -> B Extrude and normal Inset remain PASS

- [ ] Workflow .531: normal Extrude -> Repeat -> tap Face B -> same stored Extrude distance
- [ ] Workflow .531: tap Face C without rearming -> Repeat stays active and applies again
- [ ] Workflow .531: normal Inset -> Repeat -> tap Face B -> same stored inset distance
- [ ] Regression .531: each Repeat action creates exactly one Undo step
- [ ] Regression .531: deliberate selected-Face Extrude remains PASS
- [ ] Regression .531: sequential A -> B, multi-face Extrude and normal Inset remain PASS

- [ ] Workflow .532: perform Inset -> Repeat Inset on another Face
- [ ] Workflow .532: then perform a new real Extrude -> Repeat label/armed operation changes to Extrude
- [ ] Workflow .532: Repeat Extrude applies new Extrude value
- [ ] Workflow .532: then perform a new real Inset -> Repeat changes back to Inset
- [ ] Regression .532: repeated Inset taps remain Inset until a new real operation occurs
- [ ] Regression .532: direct Repeat Extrude/Inset and normal Face tools remain PASS

- [x] Stable .532: deliberate selected-Face Extrude PASS
- [x] Stable .532: sequential A -> B Extrude PASS
- [x] Stable .532: deliberate multi-face Extrude PASS
- [x] Stable .532: single-face Inset PASS
- [x] Stable .532: multi-face Inset PASS
- [x] Stable .532: Repeat Extrude PASS
- [x] Stable .532: Repeat Inset PASS
- [x] Stable .532: Repeat remains armed across repeated taps PASS
- [x] Stable .532: newest real Face operation updates armed Repeat PASS

- [ ] Workflow .533: Repeat Inset -> real Extrude -> Repeat becomes Extrude
- [ ] Workflow .533: Repeat Extrude -> real Inset -> Repeat becomes Inset
- [ ] Workflow .533: Repeat Inset again -> real Extrude again -> Repeat becomes Extrude on second cycle
- [ ] Regression .533: repeated taps keep same Repeat op until a new real Face operation occurs
- [ ] Regression .533: Repeat Extrude/Inset geometry remains PASS

- [ ] Workflow .534: explicitly select Face -> Extrude selected Face only
- [ ] Regression .534: immediate sequential A -> B without changing selection still PASS
- [ ] Workflow .534: after Repeat Inset/Extrude cycles, explicitly select Face -> Extrude remains on selected Face
- [ ] Regression .534: no rear/unselected Face substitution after any explicit selection change
- [ ] Regression .534: Repeat Extrude/Inset and state switching remain PASS

- [ ] Workflow .535: deliberately select visible Face -> Extrude selected Face only
- [ ] Regression .535: immediate sequential A -> B still PASS
- [ ] Workflow .535: deliberately select 2+ Faces -> Extrude full selected set
- [ ] Regression .535: no through/rear Face substitution for deliberate single or multi selection
- [ ] Regression .535: Repeat Extrude/Inset and state switching remain PASS

- [x] Stable .535: deliberate selected single-Face Extrude PERFECT PASS
- [x] Stable .535: immediate sequential A -> B Extrude PASS
- [x] Stable .535: deliberate multi-face Extrude PERFECT PASS
- [x] Stable .535: single-face Inset PASS
- [x] Stable .535: multi-face Inset PASS
- [x] Stable .535: Repeat Extrude PASS
- [x] Stable .535: Repeat Inset PASS
- [x] Stable .535: Repeat multi-cycle operation switching PASS
- [x] Stable .535: no through/rear Face substitution for deliberate selection PASS


- [ ] Workflow .551: import a Nomad GLB containing COLOR_0 -> export Base immediately -> vertex colour appearance survives in Nomad
- [ ] Workflow .551: import a Nomad GLB containing TANGENT -> export Base immediately -> tangent/normal-map appearance survives in Nomad
- [ ] Regression .551: topology-preserving vertex-position edit keeps vertex colours eligible but disables imported tangent restoration
- [ ] Regression .551: topology-changing edit disables UV/tangent/vertex-colour restoration rather than exporting stale corner data
- [ ] Regression .551: conservative GLB quad reconstruction does not merge across UV/tangent/vertex-colour discontinuities
- [x] Automated .551: import/export modules syntax-parse after import stripping; 13/13 targeted preservation assertions PASS
- [x] Protection .551: Beta 5 remains v0.36.18.538 and src/multi-object-transform.js?v=0.36.1.0 remains pinned


- [ ] Workflow .552: Nomad GLB with visible sculpt layer -> BoxLab import reports layers preserved
- [ ] Workflow .552: immediate Base GLB export reports layers restored 1/1
- [ ] Workflow .552: re-open exported GLB in Nomad -> original sculpt layer(s), deformation and weights survive
- [ ] Regression .552: topology-changing edit disables morph-layer restoration rather than exporting stale target arrays
- [ ] Regression .552: conservative GLB quad reconstruction does not merge across morph POSITION discontinuities
- [x] Automated .552: import/export modules syntax-parse and 8/8 targeted morph assertions PASS
- [x] Protection .552: Beta 5 remains v0.36.18.538 and src/multi-object-transform.js?v=0.36.1.0 remains pinned


- [x] Workflow .553: BoxLab Base GLB re-opened in Nomad no longer imports as triangle-corner soup
- [x] Workflow .553: Nomad subdivision treats ordinary shared edges as connected/welded
- [ ] Regression .553: UV/tangent/vertex-colour/morph seams remain attribute-correct where values genuinely differ
- [ ] Regression .553: .552 morph/layer preservation still survives immediate BoxLab -> Nomad round-trip
- [x] Automated .553: exporter syntax-parse and 7/7 indexed-topology assertions PASS
- [x] Protection .553: Beta 5 remains v0.36.18.538 and src/multi-object-transform.js?v=0.36.1.0 remains pinned

- [ ] Workflow .554: Nomad sculpt-layer deformation is visible immediately after GLB import to BoxLab
- [ ] Workflow .554: immediate Base GLB round-trip to Nomad preserves deformation without doubling
- [ ] Workflow .554: original Nomad layer and weight control remain usable after round-trip
- [ ] Regression .554: .553 indexed/welded topology and Nomad subdivision remain connected
- [x] Automated .554: import/export modules syntax-parse and 8/8 weighted-morph assertions PASS
- [x] Protection .554: Beta 5 remains v0.36.18.538 and src/multi-object-transform.js?v=0.36.1.0 remains pinned

- [ ] Workflow .555: layered Nomad GLB imports to BoxLab with deformation shown once at correct magnitude
- [ ] Workflow .555: Base GLB round-trip to Nomad preserves deformation without doubling
- [ ] Workflow .555: original layer weight remains adjustable after round-trip
- [x] Workflow .555: high-valence pole vertices subdivide as connected/welded topology
- [ ] Regression .555: ordinary two-sided UV seams remain preserved outside singular pole vertices
- [x] Automated .555: import/export modules syntax-parse and 10/10 weight-location + pole-weld assertions PASS
- [x] Protection .555: Beta 5 remains v0.36.18.538 and src/multi-object-transform.js?v=0.36.1.0 remains pinned

- [x] Workflow .556: Base GLB returns to Nomad at original source size/placement
- [x] Workflow .556: morph/layer deformation magnitude matches the original source after scale restoration
- [x] Regression .556: .555 pole welding remains connected after restored-scale export
- [x] Regression .556: layer weight remains adjustable and is not doubled
- [x] Automated .556: import/export modules syntax-parse and 8/8 scale-restoration assertions PASS
- [x] Protection .556: Beta 5 remains v0.36.18.538 and src/multi-object-transform.js?v=0.36.1.0 remains pinned

- [ ] Workflow .557: Vertex / Edge / Face / Object selector appears bottom-left on landscape iPad
- [ ] Workflow .557: all four selection modes switch and highlight exactly as before
- [ ] Workflow .557: dock does not obstruct Selection/Active Tools controls or status text
- [ ] Regression .557: one-finger orbit, two-finger pan, pinch zoom, two-finger Undo and three-finger Redo unchanged
- [x] Automated .557: static mode-dock regression 6/6 PASS
- [x] Protection .557: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .558: Vertex / Edge / Face / Object dock appears at true bottom-left of viewport
- [ ] Workflow .558: all four selection modes switch and highlight exactly as before
- [ ] Workflow .558: dock does not overlap status text or left tool drawer
- [ ] Regression .558: orbit/pan/zoom/Undo/Redo unchanged
- [x] Automated .558: relocation regression 9/9 PASS
- [x] Protection .558: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .559: no selection-mode flashing or UI tug-of-war on load
- [ ] Workflow .559: BoxLab + version remain visible in the topbar
- [ ] Workflow .559: Vertex / Edge / Face / Object dock appears at true bottom-left
- [ ] Workflow .559: all four selection modes switch and highlight normally
- [ ] Regression .559: orbit/pan/zoom/Undo/Redo unchanged
- [x] Automated .559: runtime/static ownership regression 11/11 PASS
- [x] Protection .559: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .561: no top/header mode-selector flash during startup
- [ ] Workflow .561: mode dock remains bottom-left after load
- [ ] Workflow .561: left tool drawer scroll ends above mode dock with final controls fully reachable
- [ ] Workflow .561: BoxLab + version remain visible at top
- [ ] Regression .561: mode switching and orbit/pan/zoom/Undo/Redo unchanged
- [x] Automated .561: syntax/static regression 9/9 PASS
- [x] Protection .561: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .562: Selection panel appears immediately above the bottom-left mode strip
- [ ] Workflow .562: Selection panel does not flash in its old drawer location
- [ ] Workflow .562: left tool drawer scrolls independently with Selection removed
- [ ] Workflow .562: Viewport settings appears on top line beside Frame All / Undo / Redo
- [ ] Workflow .562: Frame All / Viewport / Undo / Redo font sizes and control heights look consistent
- [ ] Regression .562: selection controls, mode switching and orbit/pan/zoom/Undo/Redo unchanged
- [x] Automated .562: syntax/static regression 11/11 PASS
- [x] Protection .562: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .563: Selection panel is back inside the left scrolling tool drawer
- [ ] Workflow .563: bottom-left mode dock remains in place
- [ ] Workflow .563: Viewport remains on the top action line
- [ ] Workflow .563: empty second/packer row is gone and viewport gains vertical space
- [ ] Workflow .563: no startup flashes
- [ ] Regression .563: selection, mode switching and orbit/pan/zoom/Undo/Redo unchanged
- [x] Automated .563: syntax/static regression 10/10 PASS
- [x] Protection .563: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .564: Selection panel typography matches compact UI scale
- [ ] Workflow .564: Selection buttons are consistently 32px high with 12px text
- [ ] Workflow .564: symbol-only selection buttons remain legible without appearing oversized
- [ ] Regression .564: Selection behavior and mode switching unchanged
- [x] Automated .564: static sizing regression 8/8 PASS
- [x] Protection .564: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .565: left tool drawer scroll ends above bottom mode dock
- [ ] Workflow .565: final drawer controls remain fully visible/clickable at maximum scroll
- [ ] Workflow .565: Selection remains in original drawer position
- [ ] Workflow .565: mode dock remains fixed bottom-left
- [ ] Regression .565: selection and navigation behavior unchanged
- [x] Automated .565: syntax/static regression 5/5 PASS
- [x] Protection .565: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .566: bottom mode dock sits close to the iPad safe-area edge
- [ ] Workflow .566: mode dock remains comfortably above the home indicator / unsafe area
- [ ] Workflow .566: left tool drawer scroll still ends above the dock
- [ ] Workflow .566: reclaimed vertical space is visible/useful
- [ ] Regression .566: mode switching and navigation unchanged
- [x] Automated .566: syntax/static regression 7/7 PASS
- [x] Protection .566: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .567: Viewport flyout opens at the right screen/app border
- [ ] Workflow .567: flyout respects right safe-area margin
- [ ] Workflow .567: View Direction / Render Look controls remain fully usable
- [ ] Regression .567: Viewport button position and camera behavior unchanged
- [x] Automated .567: syntax/static regression 5/5 PASS
- [x] Protection .567: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .568: no Viewport ownership/reordering flash during startup
- [ ] Workflow .568: Viewport button sits at far-right of top action row
- [ ] Workflow .568: Viewport flyout remains right-edge anchored
- [ ] Workflow .568: Facegroup panel uses compact standard control sizing
- [ ] Workflow .568: Facegroup palette/sliders/reseed/reset remain functional
- [x] Automated .568: syntax/static regression 13/13 PASS
- [x] Protection .568: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .570: Total Gizmo appears in Object mode on active object
- [ ] Workflow .570: projected X/Y/Z move axes follow camera orientation correctly
- [ ] Workflow .570: center puck performs free move
- [ ] Workflow .570: X/Y/Z arrow shafts perform constrained move
- [ ] Workflow .570: X/Y/Z square handles perform constrained scale
- [ ] Workflow .570: X/Y/Z arcs perform constrained rotation
- [ ] Workflow .570: inner neutral ring performs screen/view rotation
- [ ] Workflow .570: outer orange ring performs uniform scale
- [ ] Workflow .570: hover/active emphasis makes intended handle obvious
- [ ] Workflow .570: live HUD reflects transform feedback
- [ ] Regression .570: navigation gestures and Undo/Redo unchanged away from gizmo
- [ ] Regression .570: existing Move / Scale / Rotate strip still works as fallback
- [x] Automated .570: syntax/static regression 13/13 PASS
- [x] Protection .570: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .571: no black circular background/hit-proxy fill is visible
- [ ] Workflow .571: X/Y/Z rotation arcs are all visible
- [ ] Workflow .571: idle gizmo linework is thin and visually quiet
- [ ] Workflow .571: invisible hit zones remain easy to acquire with Pencil/finger
- [ ] Workflow .571: hovered/active handle thickens clearly
- [ ] Regression .571: transforms and navigation unchanged
- [x] Automated .571: syntax/static regression 9/9 PASS
- [x] Protection .571: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .572: X/Y/Z move arrows remain axis-constrained with Axis Snap OFF
- [ ] Workflow .572: X/Y/Z scale handles remain axis-constrained with Axis Snap OFF
- [ ] Workflow .572: X/Y/Z rotation arcs remain axis-constrained with Axis Snap OFF
- [ ] Workflow .572: center free-move remains free when no intentional snap applies
- [ ] Regression .572: global Axis Snap still works for free/auto transforms
- [ ] Regression .572: navigation and legacy transform strip unchanged
- [x] Automated .572: syntax/static regression 8/8 PASS
- [x] Protection .572: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .573: with Axis Snap OFF, X gizmo arrow moves X only
- [ ] Workflow .573: with Axis Snap OFF, Y gizmo arrow moves Y only
- [ ] Workflow .573: with Axis Snap OFF, Z gizmo arrow moves Z only
- [ ] Workflow .573: with Axis Snap ON, explicit gizmo axis still wins
- [ ] Workflow .573: center free-move remains unconstrained
- [ ] Regression .573: navigation and Undo/Redo unchanged
- [x] Automated .573: source/static regression 6/6 PASS
- [x] Protection .573: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .574: with Axis Snap OFF, legacy Move > X constrains to X
- [ ] Workflow .574: with Axis Snap OFF, legacy Move > Y constrains to Y
- [ ] Workflow .574: with Axis Snap OFF, legacy Move > Z constrains to Z
- [ ] Workflow .574: Free remains unconstrained
- [ ] Workflow .574: with Axis Snap ON, explicit X/Y/Z still wins
- [ ] Regression .574: Total Gizmo axis constraints remain correct
- [x] Automated .574: source/static regression 7/7 PASS
- [x] Protection .574: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .575: XY pad moves only in XY
- [ ] Workflow .575: XZ pad moves only in XZ
- [ ] Workflow .575: YZ pad moves only in YZ
- [ ] Workflow .575: plane pads track projected world axes while orbiting
- [ ] Workflow .575: rotation arcs are clearly distinguishable
- [ ] Workflow .575: overlapping axis/ring handles have sensible hit priority
- [ ] Regression .575: X/Y/Z gizmo constraints remain correct
- [ ] Regression .575: navigation and legacy transforms unchanged
- [x] Automated .575: prepublish syntax/static regression 9/9 PASS
- [x] Protection .575: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .576: X rotation ring follows projected YZ plane
- [ ] Workflow .576: Y rotation ring follows projected XZ plane
- [ ] Workflow .576: Z rotation ring follows projected XY plane
- [ ] Workflow .576: all three rings change shape continuously with camera perspective
- [ ] Workflow .576: face-on ring appears close to circular
- [ ] Workflow .576: edge-on ring collapses toward a line
- [ ] Workflow .576: front ring half reads stronger than rear half
- [ ] Workflow .576: screen-rotate ring remains circular
- [ ] Workflow .576: X/Y/Z rotation dragging still works
- [ ] Regression .576: planar move and X/Y/Z movement unchanged
- [x] Automated .576: prepublish syntax/static regression 10/10 PASS
- [x] Protection .576: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .577: red X rotation ring is visible
- [ ] Workflow .577: green Y rotation ring is visible
- [ ] Workflow .577: blue Z rotation ring is visible
- [ ] Workflow .577: all three rings deform continuously with camera perspective
- [ ] Workflow .577: X/Y/Z ring dragging rotates around correct axis
- [ ] Regression .577: planar move and axis transforms unchanged
- [x] Automated .577: prepublish syntax/static regression 9/9 PASS
- [x] Protection .577: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .578: red/green/blue projected rotation rings are visible at useful size
- [ ] Workflow .578: rings deform with camera perspective
- [ ] Workflow .578: ring hit targets follow projected visual paths
- [ ] Workflow .578: X/Y/Z ring drags rotate around correct axis
- [ ] Regression .578: screen rotate, uniform scale and planar move unchanged
- [x] Automated .578: prepublish syntax/static regression 7/7 PASS
- [x] Protection .578: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .579: red/green/blue projected rings are visible
- [ ] Workflow .579: projected rings deform correctly while orbiting
- [ ] Workflow .579: ring hit proxies follow the visible paths
- [ ] Workflow .579: X/Y/Z ring drags rotate correctly
- [x] Automated .579: syntax/static regression 4/4 PASS

- [ ] Workflow .580: hovered ring thickens temporarily
- [ ] Workflow .580: ring returns to normal thin idle line after drag/release
- [ ] Workflow .580: X/Y/Z all clear transient highlight after interaction
- [ ] Workflow .580: move/scale handles also clear transient highlight
- [ ] Regression .580: projected ring perspective behavior unchanged
- [x] Automated .580: syntax/static regression 5/5 PASS

- [ ] Workflow .581: explicit X/Y/Z gizmo movement has soft adaptive increment catches
- [ ] Workflow .581: detents can be dragged through and do not hard-lock movement
- [ ] Workflow .581: detent spacing remains sensible across zoom levels
- [ ] Workflow .581: centre free move remains unrestricted
- [ ] Workflow .581: XY/XZ/YZ planar move remains unrestricted
- [ ] Workflow .581: HUD remains briefly visible after transform
- [ ] Workflow .581: tapping post-drag HUD opens exact value input
- [ ] Workflow .581: exact X/Y/Z move inherits the last gizmo axis
- [ ] Workflow .581: exact rotate accepts degrees
- [ ] Workflow .581: exact scale accepts factor
- [ ] Regression .581: Undo/history still works for exact transforms
- [ ] Regression .581: projected rings and navigation unchanged
- [x] Protection .581: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .582: mesh/vert readout is readable below mode dock
- [ ] Workflow .582: transform status is readable at bottom-right
- [ ] Workflow .582: Viewport > Full Screen enters native or focus fullscreen
- [ ] Workflow .582: Exit Full Screen restores layout
- [ ] Workflow .582: Share / Open In opens iPad share sheet with exported file
- [ ] Workflow .582: Nomad appears if iPadOS registers it for the exported file type
- [ ] Regression .582: normal Export / Save still works
- [ ] Regression .582: mode dock and left drawer scrolling remain usable
- [x] Automated .582: prepublish syntax/static regression 12/12 PASS
- [x] Protection .582: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .583: Rotate value field accepts touch/Pencil focus and keyboard input
- [ ] Workflow .583: exact Rotate applies entered degrees
- [ ] Workflow .583: Scale value field accepts touch/Pencil focus and keyboard input
- [ ] Workflow .583: exact Scale applies entered factor
- [ ] Regression .583: exact Move remains working
- [ ] Workflow .583: Focus View hides left drawer but keeps File/Frame All/Undo/Redo/Viewport
- [ ] Workflow .583: Exit Focus View restores left drawer cleanly
- [ ] Workflow .583: GLB Share / Open In tests broader iPadOS destination matching
- [ ] Regression .583: normal Export / Save remains unchanged
- [x] Automated .583: prepublish syntax/static regression 9/9 PASS
- [x] Protection .583: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .584: gizmo Rotate HUD accepts exact degree input
- [ ] Workflow .584: exact Rotate ignores 15-degree drag snap
- [ ] Workflow .584: Undo exact Rotate works
- [ ] Workflow .584: gizmo Scale HUD accepts exact factor input
- [ ] Workflow .584: Undo exact Scale works
- [ ] Regression .584: exact Move remains working
- [ ] Workflow .584: Focus View hides left drawer on first activation
- [ ] Workflow .584: Focus View keeps top File/Frame All/Undo/Redo/Viewport row
- [ ] Workflow .584: Exit Focus View restores left drawer
- [x] Automated .584: prepublish syntax/static regression 8/8 PASS
- [x] Protection .584: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .585: Move release shows direct Distance input in gizmo HUD
- [ ] Workflow .585: Rotate release shows direct Degrees input and accepts typing
- [ ] Workflow .585: exact Rotate commits typed angle
- [ ] Workflow .585: Scale release shows direct Factor input and accepts typing
- [ ] Workflow .585: exact Scale commits typed factor
- [ ] Regression .585: Undo exact Rotate/Scale works
- [ ] Workflow .585: Focus appears on top action row before Viewport
- [ ] Workflow .585: Focus hides/restores left drawer while top row remains
- [x] Automated .585: prepublish syntax/static regression 9/9 PASS
- [x] Protection .585: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .586: gizmo Move handle syncs left strip to Move + matching axis
- [ ] Workflow .586: gizmo Rotate ring syncs left strip to Rotate + matching axis
- [ ] Workflow .586: persistent Degrees field accepts exact Rotate input
- [ ] Workflow .586: gizmo Scale handle syncs left strip to Scale + matching axis
- [ ] Workflow .586: persistent Scale factor field accepts exact Scale input
- [ ] Workflow .586: uniform scale ring syncs Scale + Free/Uniform context
- [ ] Regression .586: exact Move remains working
- [ ] Regression .586: Focus top-row toggle remains working
- [x] Automated .586: prepublish syntax/static regression 8/8 PASS
- [x] Protection .586: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .587: Move release shows standalone floating Distance field
- [ ] Workflow .587: Rotate release shows standalone floating Degrees field
- [ ] Workflow .587: Scale release shows standalone floating Factor field
- [ ] Workflow .587: iPad keyboard opens when floating field is tapped for Move/Rotate/Scale
- [ ] Workflow .587: Enter commits exact Rotate
- [ ] Workflow .587: Enter commits exact Scale
- [ ] Workflow .587: Apply button commits exact value
- [ ] Workflow .587: background tap dismisses floating palette
- [ ] Regression .587: left-panel exact type-in remains working
- [ ] Regression .587: Undo exact transforms works
- [x] Automated .587: prepublish syntax/static regression 9/9 PASS
- [x] Protection .587: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .588: Move gizmo release shows one standalone Distance palette
- [ ] Workflow .588: Rotate gizmo release shows one standalone Degrees palette
- [ ] Workflow .588: Scale gizmo release shows one standalone Factor palette
- [ ] Workflow .588: uniform scale release shows Factor palette
- [ ] Workflow .588: old gizmo HUD is hidden when floating palette appears
- [ ] Workflow .588: iPad keyboard opens for floating field
- [ ] Workflow .588: Enter/Apply commits exact Rotate
- [ ] Workflow .588: Enter/Apply commits exact Scale
- [ ] Regression .588: left-panel exact entry remains working
- [ ] Regression .588: Undo exact transforms works
- [x] Automated .588: prepublish syntax/static regression 9/9 PASS
- [x] Protection .588: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .589: Move gizmo release shows floating Distance palette again
- [ ] Workflow .589: Move floating exact entry commits with Enter/Apply
- [ ] Workflow .589: no duplicate floating palette or old HUD
- [ ] Regression .589: left-panel Move type-in remains working
- [x] Automated .589: prepublish syntax/static regression 5/5 PASS

- [ ] Regression .590: Move floating Distance entry remains working
- [ ] Workflow .590: X Rotate ring release shows floating Degrees palette
- [ ] Workflow .590: Y Rotate ring release shows floating Degrees palette
- [ ] Workflow .590: Z Rotate ring release shows floating Degrees palette
- [ ] Workflow .590: Enter/Apply commits exact Rotate
- [ ] Workflow .590: Undo exact Rotate works
- [ ] Scope .590: Scale floating type-in intentionally unchanged
- [x] Automated .590: prepublish syntax/static regression 4/4 PASS
- [x] Protection .590: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Regression .591: Move floating Distance entry remains working
- [ ] Workflow .591: X Rotate ring release shows floating Degrees palette
- [ ] Workflow .591: Y Rotate ring release shows floating Degrees palette
- [ ] Workflow .591: Z Rotate ring release shows floating Degrees palette
- [ ] Workflow .591: Enter/Apply commits exact Rotate
- [ ] Workflow .591: Undo exact Rotate works
- [ ] Scope .591: Scale floating type-in intentionally unchanged
- [x] Automated .591: prepublish syntax/static regression 7/7 PASS
- [x] Protection .591: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Regression .592: Move floating Distance entry remains working
- [ ] Workflow .592: X Rotate ring release shows floating Degrees palette
- [ ] Workflow .592: Y Rotate ring release shows floating Degrees palette
- [ ] Workflow .592: Z Rotate ring release shows floating Degrees palette
- [ ] Workflow .592: Enter/Apply commits exact Rotate
- [ ] Workflow .592: Undo exact Rotate works
- [ ] Scope .592: Scale floating type-in intentionally unchanged
- [x] Automated .592: prepublish syntax/static regression 4/4 PASS
- [x] Protection .592: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Regression .593: Move floating Distance remains working
- [ ] Regression .593: Rotate floating Degrees remains working
- [ ] Workflow .593: X Scale node release shows floating Factor palette
- [ ] Workflow .593: Y Scale node release shows floating Factor palette
- [ ] Workflow .593: Z Scale node release shows floating Factor palette
- [ ] Workflow .593: outer uniform Scale ring release shows Factor palette
- [ ] Workflow .593: Enter/Apply commits exact Scale
- [ ] Workflow .593: Undo exact Scale works
- [x] Architecture .593: pointer capture ownership rule documented in AI_WORKFLOW.md
- [x] Automated .593: prepublish syntax/static regression 4/4 PASS
- [x] Protection .593: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Regression .594: Move floating exact entry remains working
- [ ] Regression .594: Rotate floating exact entry remains working
- [ ] Regression .594: Scale and Uniform Scale floating exact entry remain working
- [ ] Workflow .594: gizmo Rotate catches softly at useful angles
- [ ] Workflow .594: Rotate detent releases when drag continues past catch
- [ ] Workflow .594: gizmo Scale catches softly at useful ratios
- [ ] Workflow .594: Scale detent releases when drag continues past catch
- [ ] Workflow .594: gizmo HUD shows live angle/factor and detent state
- [ ] Regression .594: legacy Rotate retains existing 15Â° snap behavior
- [ ] Regression .594: Move adaptive soft detents unchanged
- [x] Automated .594: prepublish syntax/static regression 7/7 PASS
- [x] Protection .594: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Regression .595: Move floating exact entry remains working
- [ ] Regression .595: Rotate floating exact entry remains working
- [ ] Regression .595: Scale/Uniform floating exact entry remains working
- [ ] Workflow .595: gizmo Rotate soft catches work with legacy 15Â° snap ON
- [ ] Workflow .595: gizmo Rotate soft catches still work with legacy 15Â° snap OFF
- [ ] Workflow .595: gizmo Rotate catch releases when drag continues
- [ ] Workflow .595: gizmo Scale catches at useful ratios
- [ ] Workflow .595: gizmo Scale catch releases when drag continues
- [ ] Regression .595: legacy/non-gizmo Rotate retains existing 15Â° snap
- [x] Automated .595: prepublish syntax/static regression 9/9 PASS
- [x] Protection .595: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .596: Share / Open In shares exactly one GLB/OBJ file with no text sidecar
- [ ] Workflow .596: Nomad Sculpt appears as an eligible iPad destination for GLB
- [ ] Workflow .596: selected Nomad destination receives/opens the GLB
- [ ] Regression .596: Export / Save iPad share-sheet fallback still saves the model to Files
- [ ] Regression .596: GLB/OBJ geometry and Nomad preservation payload unchanged
- [x] Protection .596: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .597: clicking Move/Scale/Rotate does not leave Total Gizmo stuck
- [ ] Workflow .597: clicking Free/X/Y/Z/Auto does not leave Total Gizmo stuck
- [ ] Workflow .597: gizmo can immediately start a fresh drag after transform-menu interaction
- [ ] Regression .597: gizmo follows the selected object normally after menu interaction
- [ ] Regression .597: floating exact-entry still appears after completed gizmo Move/Rotate/Scale drag
- [x] Protection .597: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .598: GLB Share / Open In creates a single .glb File with type model/gltf-binary
- [ ] Workflow .598: Web Share payload contains files only, with no title/text sidecar
- [ ] Workflow .598: Nomad Sculpt appears as an eligible iPad destination for GLB
- [ ] Workflow .598: Nomad opens/imports the shared GLB
- [ ] Regression .598: OBJ Share / Open In remains functional
- [ ] Regression .598: Export / Save remains functional
- [x] Protection .598: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .599: GLB Share / Open In creates one *.glb File with extension-driven type inference
- [ ] Workflow .599: share payload contains files only
- [ ] Workflow .599: check whether Nomad Sculpt appears when type is inferred from .glb filename
- [ ] Regression .599: saved GLB still shares to Nomad successfully from Files app
- [ ] Regression .599: OBJ sharing remains functional
- [x] Protection .599: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Finding .599: direct Safari/Web Share does not surface Nomad, while Files does
- [ ] Workflow .600: GLB secondary action reads Save for Nomadâ€¦
- [ ] Workflow .600: GLB note instructs Save to Files, then Files Share â†’ Nomad Sculpt
- [ ] Workflow .600: GLB share uses one real File with model/gltf-binary
- [ ] Workflow .600: saved GLB opens in Nomad from Files
- [ ] Regression .600: OBJ secondary action remains Share / Open Inâ€¦
- [ ] Regression .600: normal Export / Save remains functional
- [x] Protection .600: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Finding .601: direct Safari/Web Share -> Nomad closed as unsupported
- [ ] Workflow .601: GLB secondary action reads Save GLB to Filesâ€¦
- [ ] Workflow .601: GLB note explains Files -> Share -> Nomad Sculpt
- [ ] Workflow .601: saved GLB opens in Nomad from Files
- [ ] Regression .601: OBJ secondary action remains Share / Open Inâ€¦
- [ ] Regression .601: normal Export / Save remains functional
- [x] Protection .601: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .602: gizmo Rotate has clearly noticeable soft catches
- [ ] Workflow .602: gizmo Rotate soft catches remain with legacy 15Â° snap OFF
- [ ] Workflow .602: gizmo Rotate does not revert to rigid 15Â° stepping when legacy snap is ON
- [ ] Workflow .602: Rotate catches release when drag continues beyond catch window
- [ ] Workflow .602: gizmo Scale clearly catches at 0.5x / 0.75x / 1x / 1.25x / 1.5x / 2x
- [ ] Workflow .602: Scale catches release when drag continues beyond catch window
- [ ] Regression .602: Move floating exact-entry remains working
- [ ] Regression .602: Rotate floating exact-entry remains working
- [ ] Regression .602: Scale floating exact-entry remains working
- [x] Protection .602: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Workflow .603: Edge Pencil long-press selects Loop
- [x] Workflow .603: long-press works from an already-selected edge without starting Move
- [ ] Workflow .603: moving before hold delay cancels Loop hold and preserves normal drag
- [ ] Regression .603: ordinary Edge tap selection/deselection unchanged
- [ ] Regression .603: background tap deselect unchanged
- [ ] Protection .603: finger orbit/pan/zoom unchanged
- [x] Protection .603: src/multi-object-transform.js?v=0.36.1.0 unchanged
- [x] Behavior .603: ambiguous Loop continuation refuses selection rather than guessing

- [ ] Workflow .604: first Edge long-press selects Loop
- [ ] Workflow .604: repeat long-press same seed selects Ring
- [ ] Workflow .604: third long-press same seed cycles back to Loop
- [ ] Workflow .604: changing seed resets cycle to Loop-first
- [ ] Workflow .604: background deselect resets cycle to Loop-first
- [ ] Regression .604: ordinary Edge tap selection/deselection unchanged
- [ ] Regression .604: ambiguous Loop still refuses rather than guesses
- [ ] Protection .604: finger orbit/pan/zoom unchanged
- [x] Protection .604: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .605: second Edge hold adds its Loop to the existing selection
- [ ] Workflow .605: third Edge hold adds again without losing earlier selections
- [ ] Workflow .605: repeated hold on last seed cycles only that seed Loop â†” Ring
- [ ] Workflow .605: prior accumulated selection survives same-seed cycling
- [ ] Workflow .605: ambiguous/failed new seed leaves existing selection untouched
- [ ] Workflow .605: background tap clears the additive session
- [ ] Regression .605: ordinary Edge tap selection/deselection unchanged
- [ ] Protection .605: finger orbit/pan/zoom unchanged
- [x] Protection .605: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .606: Edge long-press enters candidate browser
- [ ] Workflow .606: horizontal scrub advances through Loop candidates
- [ ] Workflow .606: after Loop candidates, scrub advances into Ring candidates
- [ ] Workflow .606: reverse scrub returns to earlier candidates before release
- [ ] Workflow .606: release commits visible candidate
- [ ] Workflow .606: ambiguous cube-top Loop possibilities are browseable
- [ ] Workflow .606: Ring appears first when no Loop candidate exists
- [ ] Workflow .606: additive base selection remains intact while browsing another seed
- [ ] Regression .606: ordinary Edge tap selection/deselection unchanged
- [ ] Protection .606: finger orbit/pan/zoom unchanged
- [x] Protection .606: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .607: Total Gizmo appears on selected Vertex geometry
- [ ] Workflow .607: Total Gizmo appears on selected Edge geometry
- [ ] Workflow .607: Total Gizmo appears on selected Face geometry
- [ ] Workflow .607: component gizmo pivot is selection centroid
- [ ] Workflow .607: component gizmo Move works in Vertex / Edge / Face
- [ ] Workflow .607: component gizmo Scale works in Vertex / Edge / Face
- [ ] Workflow .607: component gizmo Rotate works in Vertex / Edge / Face
- [ ] Workflow .607: component selection remains selected after gizmo transform
- [ ] Regression .607: Object Total Gizmo unchanged
- [ ] Regression .607: .606 Edge hold/scrub Loop/Ring unchanged
- [ ] Protection .607: finger orbit/pan/zoom unchanged
- [x] Protection .607: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .608: Face axis Move follows selected gizmo arrow
- [ ] Workflow .608: Face axis Scale drag works; Uniform Scale remains good
- [ ] Workflow .608: Edge axis Move works for single and multi-edge selections
- [ ] Workflow .608: Edge Free Move works for multi-edge selections
- [ ] Workflow .608: Edge axis Scale drag and floating exact entry work without selection loss
- [ ] Workflow .608: Vertex multi-selection is not intercepted by transform-upgrade direct drag capture
- [ ] Workflow .608: Vertex axis Move / Scale / Rotate work from Total Gizmo
- [ ] Workflow .608: component gizmo click-release preserves selection before exact entry
- [ ] Workflow .608: gizmo hit targets reduce orbit fall-through near mesh edges
- [ ] Regression .608: Face/Edge/Vertex Rotate remains correct
- [ ] Regression .608: Object Total Gizmo unchanged
- [ ] Regression .608: .606 Edge hold/scrub Loop/Ring unchanged
- [x] Protection .608: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .609: component gizmo uses direct semantic handoff, not synthetic canvas pointerdown
- [ ] Workflow .609: Face axis Move follows gizmo axis
- [ ] Workflow .609: Face axis Scale follows gizmo axis
- [ ] Workflow .609: Edge single/multi axis Move works
- [ ] Workflow .609: Edge multi Free Move works
- [ ] Workflow .609: Edge axis Scale drag + floating exact entry work
- [ ] Workflow .609: Vertex multi-selection remains easy before gizmo transform
- [ ] Workflow .609: Vertex axis Move / Scale / Rotate work
- [ ] Workflow .609: component gizmo handle drag does not fall through to orbit
- [ ] Regression .609: Object Total Gizmo unchanged
- [ ] Regression .609: .606 Edge hold/scrub unchanged
- [x] Protection .609: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .610: Face X Move reports HANDLE DOWN
- [ ] Diagnostic .610: Face X Move reports OWNER REQUEST
- [ ] Diagnostic .610: owner reports OWNER BEGIN or explicit OWNER REJECT reason
- [ ] Diagnostic .610: handoff reports OK or FAIL
- [ ] Diagnostic .610: drag reports MOVE with matching pointerId
- [ ] Diagnostic .610: release reports OWNER FINISH and GIZMO POINTERUP
- [x] Protection .610: no intentional transform behavior change
- [x] Protection .610: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .611: Face X Move reports HANDOFF EXCEPTION with exact error text
- [x] Diagnostic .611: .610 established OWNER REQUEST is reached before failure
- [x] Protection .611: no intentional transform behavior change
- [x] Protection .611: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Diagnostic .612: Face X Move reaches OWNER BEGIN
- [x] Diagnostic .612: Face X Move reports HANDOFF OK
- [x] Diagnostic .612: Face X Move reports MOVE and OWNER FINISH
- [x] Workflow .612: Face X Move follows X axis rather than fallback free move
- [x] Workflow .612: Y/Z Move quick regression
- [x] Workflow .612: one component axis Scale quick check
- [x] Fix .612: SweepPath.editing treated as boolean property
- [x] Protection .612: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] HANDS-ON .612: component Total Gizmo confirmed working perfectly

- [ ] Workflow .613: Face additive multi-select still works
- [ ] Workflow .613: tapping an already-selected face removes only that face
- [ ] Workflow .613: tapping last selected face clears selection
- [ ] Workflow .613: background tap still clears all
- [ ] Workflow .613: tiny Pencil jitter does not turn deselect tap into transform
- [ ] Regression .613: deliberate direct component drag still transforms
- [ ] Regression .613: Vertex / Edge tap-to-remove works
- [ ] Regression .613: .612 component Total Gizmo remains fully working
- [ ] Regression .613: .606 Edge hold/scrub remains working
- [x] Protection .613: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .614: tapping selected Face removes only that face from multi-selection
- [ ] Workflow .614: tapping last selected Face clears selection
- [ ] Workflow .614: deliberate Face component drag still transforms
- [ ] Workflow .614: selected Edge / Vertex tap-to-remove works
- [ ] Workflow .614: Plane Move XY keeps Z fixed
- [ ] Workflow .614: Plane Move XZ keeps Y fixed
- [ ] Workflow .614: Plane Move YZ keeps X fixed
- [ ] Regression .614: Axis Move unchanged
- [ ] Regression .614: Free Move unchanged
- [ ] Regression .614: Scale / Rotate unchanged
- [x] Protection .614: .612 direct component gizmo architecture preserved
- [x] Protection .614: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Workflow .615: single Object X/Y/Z Move works
- [x] Workflow .615: single Object XY Plane Move keeps Z fixed
- [x] Workflow .615: single Object XZ Plane Move keeps Y fixed
- [x] Workflow .615: single Object YZ Plane Move keeps X fixed
- [x] Workflow .615: single Object Free Move works
- [x] Regression .615: single Object Scale works
- [x] Regression .615: single Object Rotate works
- [x] Regression .615: single Object exact-entry works
- [x] Regression .615: component gizmo remains correct from .614
- [x] Regression .615: Face tap-to-remove remains correct from .614
- [x] Regression .615: true Multi-object transforms remain working
- [x] Protection .615: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] HANDS-ON .615: unified semantic gizmo confirmed working perfectly

- [x] Workflow .616: whole Group gizmo Move transforms all members together
- [x] Workflow .616: whole Group gizmo Scale transforms all members with existing pivot rules
- [x] Workflow .616: whole Group gizmo Rotate transforms all members with existing pivot rules
- [x] Workflow .616: Group X/Y/Z Move works
- [x] Workflow .616: Group Free Move works
- [x] Regression .616: single Object semantic gizmo remains correct from .615
- [x] Regression .616: Vertex / Edge / Face gizmo remains correct from .615
- [x] Regression .616: ordinary Multi-object Move / Scale / Rotate remains working
- [x] Protection .616: group transform maths unchanged
- [x] Protection .616: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] HANDS-ON .616: Group/Multi gizmo routing confirmed working perfectly

- [ ] Workflow .617: Face single tap select/deselect remains correct
- [ ] Workflow .617: Face double-tap Grow selects one adjacency step
- [ ] Workflow .617: Face triple-tap Connected selects connected island
- [ ] Workflow .617: Edge double-tap Grow works
- [ ] Workflow .617: Edge triple-tap Connected works
- [ ] Workflow .617: Vertex double-tap Grow works
- [ ] Workflow .617: Vertex triple-tap Connected works
- [ ] Regression .617: Edge long-press/scrub Loop/Ring unchanged
- [ ] Regression .617: deliberate component drag breaks tap chain
- [ ] Regression .617: background tap deselect unchanged
- [ ] Regression .617: Vertex/Edge/Face/single Object gizmo unchanged
- [ ] Regression .617: Group/Multi gizmo routing unchanged from .616
- [x] Protection .617: no new topology solver
- [x] Protection .617: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .618: Face double-tap Grow works
- [ ] Workflow .618: Face triple-tap Connected works
- [ ] Workflow .618: Edge double/triple tap works
- [ ] Workflow .618: Vertex double/triple tap works
- [ ] Regression .618: single-tap selected component still removes
- [ ] Regression .618: deliberate component drag transforms without selection toggle
- [ ] Regression .618: Edge long-press/scrub unchanged
- [ ] Regression .618: gizmo and Group/Multi routing unchanged
- [x] Protection .618: one owner for component tap semantics
- [x] Protection .618: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .619: Face double-tap works even when tap #2 lands on gizmo
- [ ] Workflow .619: Face triple-tap Connected works
- [ ] Workflow .619: Edge double/triple tap works through gizmo overlap
- [ ] Workflow .619: Vertex double/triple tap works through gizmo overlap
- [ ] Regression .619: normal gizmo drag starts immediately outside active tap chain
- [ ] Regression .619: single-tap selected component still removes
- [ ] Regression .619: Edge long-press/scrub unchanged
- [x] Protection .619: no gizmo visibility delay introduced
- [x] Protection .619: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .620: Face long-press enters selection browser
- [ ] Workflow .620: first valid Face candidate previews on hold
- [ ] Workflow .620: horizontal scrub browses Face candidates
- [ ] Workflow .620: release commits visible Face candidate
- [ ] Workflow .620: invalid Loop/Ring candidates are skipped
- [ ] Workflow .620: additive existing Face selection survives browser
- [ ] Regression .620: Face single tap select/deselect unchanged
- [ ] Regression .620: deliberate Face component drag still transforms
- [ ] Regression .620: Edge long-press/scrub unchanged
- [ ] Regression .620: unified gizmo baseline unchanged
- [ ] Regression .620: Group/Multi routing unchanged
- [x] Protection .620: failed multi-tap experiment fully removed
- [x] Protection .620: no new topology solver
- [x] Protection .620: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .621: GESTURE DEBUG panel appears
- [ ] Diagnostic .621: Face press reports FACE CANVAS DOWN or GIZMO DOWN
- [ ] Diagnostic .621: Face canvas path reports FACE HOLD REQUEST + ARMED
- [ ] Diagnostic .621: stationary hold reaches FACE HOLD TIMER
- [ ] Diagnostic .621: candidate collection reports count/kinds
- [ ] Diagnostic .621: gizmo interception reports GIZMO DOWN + OWNER REQUEST/BEGIN
- [x] Protection .621: diagnostic-only, no intended interaction change
- [x] Protection .621: reusable debug module added for future gesture bugs
- [x] Protection .621: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .622: attempted Face hold logs RAW POINTERDOWN
- [ ] Diagnostic .622: Pencil press logs PEN CANVAS DOWN
- [ ] Diagnostic .622: determine whether PEN HOVER SWALLOW occurs on pointerdown
- [ ] Diagnostic .622: determine whether FACE CANVAS DOWN is reached
- [x] Protection .622: diagnostic-only, Face Hold behavior unchanged
- [x] Protection .622: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .623: Face hold attempt logs RAW CANVAS CAPTURE
- [ ] Diagnostic .623: determine whether RAW CANVAS BUBBLE appears
- [ ] Diagnostic .623: compare canvas boundary traces with FACE CANVAS DOWN
- [x] Protection .623: diagnostic-only, no gesture behavior change
- [x] Protection .623: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .624: capture listeners register with ids/labels
- [ ] Diagnostic .624: Face press logs CAPTURE ENTER/EXIT sequence
- [ ] Diagnostic .624: identify listener where cancelAfter becomes true
- [ ] Diagnostic .624: registration stack identifies owning module where possible
- [x] Protection .624: diagnostic-only, no interaction behavior change
- [x] Protection .624: dormant gizmo change deferred
- [x] Protection .624: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .625: Vertex Circle appears on initial load
- [ ] Workflow .625: first Repair/Inspect click performs intended action
- [ ] Workflow .625: mode switch away/back preserves Circle layout
- [ ] Workflow .625: Viewport menu includes Gesture Debug toggle
- [ ] Workflow .625: Gesture Debug defaults OFF
- [ ] Workflow .625: Gesture Debug ON shows panel
- [ ] Workflow .625: Gesture Debug OFF hides panel
- [ ] Workflow .625: Gesture Debug preference survives reload
- [ ] Regression .625: Vertex/Edge/Face/single Object gizmo unchanged
- [ ] Regression .625: Group/Multi routing unchanged
- [x] Protection .625: Circle load order is deterministic
- [x] Protection .625: permanent debug layer has no EventTarget monkeypatch
- [x] Protection .625: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .627: Gesture Debug button works before Focus View is ever used
- [ ] Workflow .627: Gesture Debug ON shows panel
- [ ] Workflow .627: Gesture Debug OFF hides panel
- [ ] Workflow .627: Gesture Debug persistence survives reload
- [ ] Workflow .627: Vertex Circle present immediately on fresh load
- [ ] Workflow .627: Vertex Circle remains after late Inspect/Repair sync
- [ ] Workflow .627: first Repair/Inspect click performs intended action
- [ ] Regression .627: Focus View unchanged
- [ ] Regression .627: mode switching preserves Circle layout
- [x] Protection .627: permanent Gesture Debug has no deep EventTarget monkeypatch
- [x] Protection .627: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .628: Gesture Debug button works on first tap
- [ ] Workflow .628: Gesture Debug ON shows panel
- [ ] Workflow .628: Gesture Debug OFF hides panel
- [ ] Workflow .628: persisted state survives reload
- [x] Protection .628: no transform/selection behavior change

- [ ] Diagnostic .629: Gesture Debug ON logs CAPTURE REGISTER lines after reload
- [ ] Diagnostic .629: Face hold logs CAPTURE ENTER/EXIT sequence
- [ ] Diagnostic .629: identify listener where cancelBubble becomes true
- [x] Protection .629: deep trace only active while Gesture Debug is ON
- [x] Protection .629: no interaction behavior change

- [ ] Workflow .630: selected Face hold reaches FACE CANVAS DOWN
- [ ] Workflow .630: Face Hold arms and timer fires
- [ ] Workflow .630: Face Hold candidate browser previews valid candidate
- [ ] Regression .630: ordinary component tap selection works
- [ ] Regression .630: selected component tap-to-remove works
- [ ] Regression .630: component paint drag still works after 6 px
- [ ] Regression .630: Edge hold/scrub unchanged
- [ ] Regression .630: gizmo / Group / Multi unchanged
- [x] Protection .630: Paint Select no longer owns pointerdown
- [x] Protection .630: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .631: ordinary Face tap selects one face only; no delayed Face Loop after release
- [ ] Workflow .631: ordinary Edge tap selects one edge only; no delayed Loop/Ring after release
- [ ] Workflow .631: genuine Face long-press still reaches candidate browser and release keeps the visible candidate
- [ ] Workflow .631: genuine Edge long-press/scrub still browses Loop/Ring candidates and release keeps the visible candidate
- [ ] Regression .631: pending Paint Select is cleared even when a newly appearing gizmo becomes the pointerup target
- [ ] Regression .631: component paint drag still claims after intentional drag
- [ ] Regression .631: selected component tap-to-remove remains correct
- [ ] Regression .631: Vertex / Edge / Face / single Object gizmo remains correct
- [ ] Regression .631: Group/Multi gizmo routing remains correct from .616
- [x] Static .631: global Face/Edge hold release uses window capture
- [x] Static .631: pending Paint Select release uses window capture
- [x] Protection .631: loop/ring candidate algorithms unchanged
- [x] Protection .631: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .632: Loop tool with Loops=1 adds exactly one clean loop
- [ ] Workflow .632: finished loop becomes normal edge selection without adding extra topology
- [ ] Workflow .632: Loop Slide still works before release/commit
- [ ] Regression .632: second intentional Loop Cut adds only the requested second loop
- [ ] Regression .632: Edge long-press Loop/Ring browser remains separate from Loop Cut tool
- [x] Static .632: no synthetic pointer replay remains in loop-cut-commit.js
- [x] Static .632: finished loop selection uses __boxlabSelectionBridge.set
- [x] Protection .632: .631 Face/Edge global release ownership unchanged
- [x] Protection .632: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .633: Vertex/Edge/Face selection shows only compact transform puck, not full gizmo
- [ ] Workflow .633: tapping transform puck expands full proven Total Gizmo
- [ ] Workflow .633: Move/Scale/Rotate transform control expands full gizmo for component selection
- [ ] Workflow .633: changing component selection collapses full gizmo back to compact puck
- [ ] Workflow .633: Face long-hold browser scrubs through multiple candidates without Paint Select taking over
- [ ] Workflow .633: Edge long-hold Loop/Ring browser scrubs without Paint Select taking over
- [ ] Regression .633: ordinary drag-paint selection still claims when no hold browser has fired
- [ ] Regression .633: Object full gizmo remains immediately available
- [ ] Regression .633: Group/Multi gizmo routing remains correct from .616
- [x] Static .633: Paint Select yields to active modeless browser
- [x] Static .633: Object mode forces full gizmo while component modes default dormant
- [x] Protection .633: transform maths unchanged
- [x] Protection .633: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .635: Face background tap clears selection while Extrude remains armed
- [ ] Workflow .635: Face background tap clears selection while Inset remains armed
- [ ] Workflow .635: tapping a selected Face removes it while Extrude/Inset remains armed
- [ ] Workflow .635: with Move armed, selected Face tap can deselect and background tap clears selection
- [ ] Workflow .635: with Scale armed, selected Face tap can deselect and background tap clears selection
- [ ] Workflow .635: with Rotate armed, selected Face tap can deselect and background tap clears selection
- [ ] Regression .635: deliberate Extrude/Inset drag still begins only after movement threshold
- [ ] Regression .635: modern Total Gizmo Move/Scale/Rotate remains unchanged
- [ ] Regression .635: dormant puck / expand / collapse behavior from .633/.634 remains unchanged
- [ ] Protection .635: touch navigation remains excluded from armed-tool background tap owner
- [x] Protection .635: legacy direct component transform owners stand down when Total Gizmo is visible
- [x] Protection .635: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .636: Extrude armed -> activate gizmo -> Extrude visually/behaviorally suspends
- [ ] Workflow .636: expanded gizmo axis Move handle transforms selection without selecting through geometry
- [ ] Workflow .636: expanded gizmo Scale handles transform selection without selecting through geometry
- [ ] Workflow .636: expanded gizmo Rotate handles transform selection without selecting through geometry
- [ ] Workflow .636: collapse gizmo -> previously armed Extrude resumes
- [ ] Workflow .636: repeat suspend/resume path with Inset
- [ ] Regression .636: outer Scale ring still transforms all selected faces
- [ ] Regression .636: Face selection gestures remain correct before gizmo activation
- [ ] Regression .636: component gizmo rejection never synthetic-clicks the canvas
- [ ] Regression .636: Object / Group / Multi gizmo behavior remains unchanged
- [x] Static .636: Face direct API exposes suspendForTransform/resumeAfterTransform
- [x] Static .636: Vertex/Edge/Face failed gizmo handoff is blocked, not syntheticDown
- [x] Protection .636: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .637: Extrude armed -> gizmo -> Move -> collapse -> only Extrude remains active
- [ ] Workflow .637: Extrude armed -> gizmo -> Scale -> collapse -> only Extrude remains active
- [ ] Workflow .637: Extrude armed -> gizmo -> Rotate -> collapse -> only Extrude remains active
- [ ] Workflow .637: Inset follows the same suspend/transform/collapse/resume ownership
- [ ] Regression .637: resumed Face tool performs normal direct drag immediately after collapse
- [ ] Regression .637: reopening gizmo after resumed Face tool suspends it cleanly again
- [x] Static .637: resume path disarms transform arming before restoring Face direct tool
- [x] Protection .637: transform maths unchanged
- [x] Protection .637: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .638: Face long-hold + drag UP grows selection
- [ ] Workflow .638: Face long-hold + drag DOWN shrinks selection
- [ ] Workflow .638: Edge long-hold + drag UP grows selection
- [ ] Workflow .638: Edge long-hold + drag DOWN shrinks selection
- [ ] Workflow .638: Vertex long-hold + drag UP grows selection
- [ ] Workflow .638: Vertex long-hold + drag DOWN shrinks selection
- [ ] Workflow .638: single selected Vertex puck is visibly offset and does not cover the vertex
- [ ] Workflow .638: multi-vertex selection puck remains at centroid
- [ ] Workflow .638: larger vertical drag produces multiple Grow/Shrink steps predictably
- [ ] Workflow .638: moving back toward hold point reduces preview step count instead of accumulating operations
- [ ] Regression .638: Face horizontal scrub still browses Loop/Ring/Coplanar/Connected
- [ ] Regression .638: Edge horizontal scrub still browses Loop/Ring
- [ ] Regression .638: Paint Select yields to fired Vertex/Edge/Face hold
- [ ] Regression .638: release keeps current Grow/Shrink preview
- [x] Static .638: Grow/Shrink gesture reuses existing authoritative buttons
- [x] Protection .638: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .639: collapsed puck leaves no invisible Move/Scale/Rotate handles hittable
- [ ] Workflow .639: click/drag through former gizmo handle locations performs normal Face selection/gesture behavior
- [ ] Workflow .639: single Vertex hold remains available while puck is offset
- [ ] Workflow .639: tapping puck expands full gizmo and handles become interactive normally
- [ ] Workflow .639: collapsing full gizmo immediately returns all former handle areas to viewport selection
- [ ] Regression .639: Face/Edge/Vertex Grow/Shrink gestures from .638 remain intact
- [ ] Regression .639: expanded gizmo Move/Scale/Rotate remains intact
- [x] Static .639: collapsed SVG subtree uses display:none
- [x] Static .639: onHandleDown rejects collapsed component gizmo events
- [x] Protection .639: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Workflow .640: multi-face Extrude preview survives Pencil release and commits
- [ ] Workflow .640: single-face Extrude preview survives Pencil release and commits
- [ ] Workflow .640: Inset preview survives Pencil release and commits
- [ ] Workflow .640: FACE DIRECT FINISH debug reports type=pointerup on normal Pencil lift
- [ ] Regression .640: pointercancel still rolls back an interrupted direct Face gesture
- [ ] Regression .640: Through/blocked Extrude commit/rollback behavior unchanged
- [ ] Regression .640: armed Face selection/deselection remains modeless
- [x] Static .640: multi-face-direct completion is owned at window capture
- [x] Protection .640: Extrude/Inset topology maths unchanged
- [x] Protection .640: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .641: Make Unique preserves active linked-instance world placement exactly
- [ ] Workflow .641: Make Unique preserves inactive linked-instance world placement exactly
- [ ] Workflow .641: editing detached object no longer propagates to former linked peers
- [ ] Workflow .641: editing remaining linked peer still propagates to its other linked peers
- [ ] Workflow .641: Multi Make Unique detaches all selected linked instances in one Undo step
- [ ] Workflow .641: Undo restores link metadata and shared editing
- [ ] Workflow .641: Redo restores unique independent meshes at the same placements
- [ ] Regression .641: Linked Duplicate still creates shared geometry with independent placement
- [ ] Regression .641: ordinary Duplicate remains independent
- [x] Static .641: detachment materializes source mesh + instanceMatrix before deleting link metadata
- [x] Protection .641: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .642: Face selection shows closed Selection Hub puck
- [ ] Workflow .642: tap puck -> full transform gizmo only
- [ ] Workflow .642: tap transform centre -> gizmo disappears and Face contextual tool ring appears
- [ ] Workflow .642: tap tool-ring centre -> tool ring closes and closed puck returns
- [ ] Workflow .642: closed puck can immediately reopen transform gizmo
- [ ] Workflow .642: tool ring preserves Face selection while cycling states
- [ ] Workflow .642: Extrude sector arms existing Extrude and entire hub disappears
- [ ] Workflow .642: Inset sector arms existing Inset and entire hub disappears
- [ ] Workflow .642: Knife / Duplicate / Extract / Shell / Sweep / Delete proxy existing authoritative actions
- [ ] Workflow .642: after tool launch, hub stays suppressed until Face selection changes
- [ ] Workflow .642: new Face selection restarts hub at closed puck
- [ ] Regression .642: no gizmo hit targets exist while Tools ring is visible
- [ ] Regression .642: no tool-ring hit targets exist while Transform gizmo is visible
- [ ] Regression .642: Face gestures and armed-tool deselection remain intact outside hub controls
- [x] Static .642: contextual sectors proxy existing buttons rather than duplicate modelling kernels
- [x] Protection .642: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .643: radial Sweep opens viewport Sweep session palette beside selection
- [ ] Workflow .643: Profile / Path / Finish viewport tabs drive the existing Sweep session stages
- [ ] Workflow .643: Circle / Rectangle / Draw / Use Selection proxy the existing Sweep controls
- [ ] Workflow .643: viewport Profile Size slider updates live Sweep profile
- [ ] Workflow .643: viewport Circle Sides slider updates live Sweep profile
- [ ] Workflow .643: viewport Edit / Closed / Undo / Clear mirror Profile state
- [ ] Workflow .643: Follow Edges / Draw Path proxy existing path modes
- [ ] Workflow .643: viewport Path Edit / Undo / Delete / Clear work without left-toolbar interaction
- [ ] Workflow .643: Caps mirrors existing state and Apply Sweep completes session
- [ ] Workflow .643: Cancel Sweep cancels/restores through existing Sweep owner
- [ ] Workflow .643: palette disappears after Apply or Cancel
- [ ] Regression .643: ordinary left-toolbar Sweep workflow remains unchanged
- [ ] Regression .643: Face Selection Hub direct-tool BIG PASS set remains intact
- [x] Static .643: viewport Sweep controls proxy existing #sweep* owners; no Sweep geometry kernel duplicated
- [x] Protection .643: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .644: successful Extrude Through completes and clears Face selection
- [x] Static .644: successful Through disarms Extrude, but hands-on Pencil orbit still FAIL
- [ ] Workflow .644: Extrude is visibly disarmed after successful Through
- [ ] Workflow .644: selecting a new Face after Through starts from normal selection state
- [ ] Regression .644: normal outward/inward Extrude remains armed/persistent as before
- [ ] Regression .644: Inset remains armed/persistent as before
- [ ] Regression .644: Through topology result and CLOSED validation unchanged
- [ ] Regression .644: .643 Sweep viewport session remains unchanged
- [x] Static .644: successful Through clears direct Face ownership and emits tool:none
- [x] Protection .644: Through kernel/gate maths unchanged
- [x] Protection .644: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .645: successful Through releases canvas Pencil capture on pointerup
- [ ] Workflow .645: Pencil orbit works on the immediately following gesture
- [ ] Workflow .645: normal Extrude completion does not leave stale Pencil capture
- [ ] Workflow .645: Inset completion does not leave stale Pencil capture
- [ ] Workflow .645: background deselect while Face tool armed does not leave stale Pencil capture
- [ ] Workflow .645: quick Face tap while tool armed does not leave stale Pencil capture
- [ ] Regression .645: .644 successful Through still disarms Extrude
- [ ] Regression .645: .643 Sweep viewport session remains PASS
- [x] Static .645: every Face-direct owned finish path calls releaseDirectPointer before stopImmediatePropagation
- [x] Protection .645: Through kernel/gate unchanged
- [x] Protection .645: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Diagnostic .646: after Through, failed Pencil orbit produces PEN ORBIT ROUTE
- [ ] Diagnostic .646: capture meshHit / selectionCount / faceToolActive / multiEnabled / paintPending / paintActive / controlsEnabled / route
- [ ] Diagnostic .646: if route is FORWARD_ORBIT, PEN ORBIT FORWARDED also appears
- [ ] Regression .646: no change to Face selection, paint selection or Pencil orbit behaviour
- [ ] Regression .646: .643 Sweep viewport session remains PASS
- [x] Static .646: Pencil route logging is diagnostic-only; no routing condition changed
- [x] Static .646: paint debug API is read-only
- [x] Protection .646: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .647: page load Gesture Debug shows PEN ORBIT LISTENER WRAPPED for OrbitControls pointer handlers
- [ ] Workflow .647: after Through, background Pencil-down produces PEN ORBIT ROUTE
- [ ] Workflow .647: background Pencil-down route is FORWARD_ORBIT and camera rotates
- [ ] Workflow .647: PEN ORBIT FORWARDED appears for successful Pencil orbit start
- [ ] Workflow .647: Pencil contact on editable geometry still follows existing selection policy
- [ ] Regression .647: Face tap/hold/paint selection remains intact
- [ ] Regression .647: successful Through remains correct and Extrude disarms
- [ ] Regression .647: .643 Sweep viewport session remains PASS
- [x] Static .647: OrbitControls constructor alone is bracketed by gate registration window
- [x] Static .647: routing policy BLOCK_MESH_HIT/FORWARD_ORBIT unchanged
- [x] Protection .647: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .648: Pencil contact move with buttons=1 is not classified as hover even if pressure=0
- [ ] Workflow .648: background Pencil orbit rotates camera after Through
- [ ] Workflow .648: Gesture Debug shows PEN ORBIT MOVE FORWARD during Pencil drag
- [ ] Workflow .648: true hover with buttons=0/pressure=0 remains swallowed
- [ ] Regression .648: one-finger touch orbit remains unchanged
- [ ] Regression .648: Pencil tap selection remains unchanged
- [ ] Regression .648: .643 Sweep viewport session remains PASS
- [x] Static .648: pen contact classifier uses buttons OR pressure
- [x] Protection .648: selection-vs-orbit mesh-hit policy unchanged
- [x] Protection .648: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .649: launch Inset from radial ring, perform Inset, closed puck reappears immediately
- [ ] Workflow .649: launch Extrude from radial ring, perform Extrude, closed puck reappears immediately
- [ ] Workflow .649: direct tool may remain armed while puck is visible
- [ ] Workflow .649: restored puck cycles normally to Gizmo -> Tools -> Puck
- [ ] Regression .649: Face selection remains intact after Inset
- [ ] Regression .649: .643 Sweep viewport session remains PASS
- [x] Static .649: hub restoration uses existing boxlab-face-direct-committed semantic event
- [x] Protection .649: no Extrude/Inset geometry code changed
- [x] Protection .649: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .650: Pencil pointerdown starts tracked contact
- [ ] Workflow .650: Pencil contact remains active across zero-pressure/zero-buttons move
- [ ] Workflow .650: Pencil orbit works after Through
- [ ] Workflow .650: PEN ORBIT MOVE FORWARD shows contactTracked=true during orbit
- [ ] Workflow .650: pointerup/cancel clears tracked Pencil contact
- [ ] Regression .650: true Pencil hover after lift is swallowed normally
- [ ] Regression .650: finger orbit unchanged
- [ ] Regression .650: Face Pencil tap selection unchanged
- [ ] Regression .650: .643 Sweep viewport session remains PASS
- [x] Static .650: contact lifecycle clears from window capture
- [x] Protection .650: selection-vs-orbit mesh-hit policy unchanged
- [x] Protection .650: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .651: Pencil tap on mesh remains selection/deselection
- [ ] Workflow .651: Pencil hold on mesh still enters existing Loop/Ring/Grow/Shrink browser
- [ ] Workflow .651: Pencil drag >=8px starting on mesh claims orbit
- [ ] Workflow .651: orbit claim restores pre-down component selection
- [ ] Workflow .651: PEN ORBIT DEFER CLAIM appears and subsequent move shows tracked=true
- [ ] Workflow .651: camera rotates when Pencil drag starts on model after Through
- [ ] Workflow .651: paint selection yields cleanly when orbit claims
- [ ] Workflow .651: component transform/tap intent yields cleanly when orbit claims
- [ ] Regression .651: active Extrude/Inset still own Pencil drag over selected Face
- [ ] Regression .651: finger orbit unchanged
- [ ] Regression .651: .643 Sweep viewport session remains PASS
- [x] Static .651: deferred orbit uses actual wrapped OrbitControls pointerdown listener
- [x] Protection .651: no modelling geometry kernels changed
- [x] Protection .651: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .652: arm Extrude, Pencil-down on empty background immediately disarms Extrude
- [ ] Workflow .652: same Pencil-down continues into orbit without lifting/restarting
- [ ] Workflow .652: arm Inset, Pencil-down on empty background immediately disarms Inset and orbits
- [ ] Workflow .652: Pencil-down on another Face while Extrude armed still starts repeat Extrude
- [ ] Workflow .652: Pencil-down on another Face while Inset armed still starts repeat Inset
- [ ] Workflow .652: background navigation does not clear the current Face selection merely from pointerdown
- [ ] Regression .652: finger orbit unchanged
- [ ] Regression .652: .643 Sweep viewport session remains PASS
- [ ] Regression .652: .649 puck restore after Extrude/Inset remains intact
- [x] Static .652: Pencil background-yield path contains no preventDefault / stopImmediatePropagation / setPointerCapture
- [x] Protection .652: Face geometry kernels unchanged
- [x] Protection .652: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Hands-on .652: armed Extrude/Inset + Pencil background-down disarms tool and same gesture orbits â€” PERFECT / PASS
- [ ] Workflow .653: radial Shell opens compact viewport Shell palette beside selection
- [ ] Workflow .653: viewport Thickness slider updates live Shell preview
- [ ] Workflow .653: viewport Thickness output mirrors authoritative Shell value
- [ ] Workflow .653: Apply Shell commits through existing Shell owner and palette disappears
- [ ] Workflow .653: Cancel restores/cancels through existing Shell owner and palette disappears
- [ ] Regression .653: ordinary left-toolbar Shell remains unchanged
- [ ] Regression .653: .643 Sweep viewport session remains PASS
- [ ] Regression .653: .652 Face-direct background-yield remains PASS
- [x] Static .653: Shell viewport controls proxy existing #shell* owners; no Shell kernel duplicated
- [x] Protection .653: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Hands-on .653: radial Shell viewport session PASS
- [ ] Workflow .654: Edge selection shows closed Selection Hub puck
- [ ] Workflow .654: Edge puck -> gizmo -> centre -> Edge tool ring -> centre -> puck
- [ ] Workflow .654: Face ring never appears in Edge mode
- [ ] Workflow .654: Edge Extrude radial sector arms existing Edge Extrude
- [ ] Workflow .654: Bevel radial sector arms existing Bevel
- [ ] Workflow .654: Crease radial sector uses existing Crease owner
- [ ] Workflow .654: Slide radial sector uses existing Edge Slide owner
- [ ] Workflow .654: Offset radial sector uses existing Offset Loop owner
- [ ] Workflow .654: Bridge radial sector respects existing validity/disabled state
- [ ] Workflow .654: Dissolve radial sector uses existing Dissolve Edge owner
- [ ] Workflow .654: Delete radial sector uses existing Delete Edge owner
- [ ] Regression .654: Face Selection Hub remains unchanged
- [ ] Regression .654: .643 Sweep and .653 Shell viewport sessions remain PASS
- [ ] Regression .654: .652 Face-direct background-yield remains PASS
- [x] Static .654: Edge ring proxies existing authoritative buttons; no Edge kernel duplicated
- [x] Protection .654: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .655: hold an Edge until candidate browser fires
- [ ] Workflow .655: first candidate previews alone, not original + candidate
- [ ] Workflow .655: horizontal scrub replaces candidate A with B; A is fully removed
- [ ] Workflow .655: scrub through all offered candidates; no accumulation
- [ ] Workflow .655: branching seed exposes all distinct one-ended/two-ended Loop possibilities found by existing selector
- [ ] Workflow .655: boundary seed offers Boundary candidate when valid
- [ ] Workflow .655: quad seed offers Ring candidate when valid
- [ ] Workflow .655: release commits only currently visible candidate
- [ ] Workflow .655: pointercancel restores pre-hold selection
- [ ] Regression .655: vertical Grow/Shrink scrub still works
- [ ] Regression .655: normal Edge tap selection unchanged
- [ ] Regression .655: .654 Edge Selection Hub remains available after committed selection
- [x] Static .655: candidate probes restore original selection
- [x] Static .655: candidate preview uses candidate.indices without base merge
- [x] Protection .655: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .656: hold a cube Edge and browse candidates
- [ ] Workflow .656: each adjacent Face can appear as a complete Face Boundary candidate
- [ ] Workflow .656: front Face candidate contains all 4 perimeter edges, including the previously missing side edge
- [ ] Workflow .656: opposite adjacent Face perimeter can also appear as a separate Face Boundary candidate
- [ ] Workflow .656: Face Boundary preview replaces prior candidate rather than accumulating
- [ ] Workflow .656: release commits only the complete currently visible perimeter
- [ ] Regression .656: .655 Loop candidates still browse correctly
- [ ] Regression .656: generic Boundary and Ring candidates still appear when valid
- [ ] Regression .656: vertical Grow/Shrink still works
- [x] Static .656: Face perimeter candidate maps mesh Face boundary segments to current edge indices
- [x] Protection .656: no Loop/Ring/Boundary selector kernel changed
- [x] Protection .656: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Static .657: Face Boundary helper exists in main.js
- [x] Static .657: collectEdgeHoldCandidates adds Face Boundary candidates
- [ ] Hands-on .657: cube front Face offers full 4-edge perimeter candidate

- [x] Hands-on .657: closed Face Boundary candidates AWESOME / PASS
- [ ] Workflow .658: unavailable radial tools are visibly dimmed and marked Ã—
- [ ] Workflow .658: unavailable sector remains visible but cannot launch tool
- [ ] Workflow .658: changing selection updates radial availability
- [ ] Workflow .658: active/armed authoritative tool highlights matching radial sector
- [ ] Workflow .658: Face Shell/Sweep availability mirrors underlying buttons
- [ ] Workflow .658: Edge Bridge/Offset/etc availability mirrors underlying buttons
- [ ] Regression .658: available Face tools launch exactly as before
- [ ] Regression .658: available Edge tools launch exactly as before
- [ ] Regression .658: .653 Shell viewport session remains PASS
- [ ] Regression .658: .657 Edge hold browser remains PASS
- [x] Static .658: radial disabled state derives only from authoritative target.disabled
- [x] Protection .658: no modelling kernels changed
- [x] Protection .658: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .659: select one complete Edge loop/perimeter
- [ ] Workflow .659: long-press another Edge; first candidate previews as existing selection + candidate
- [ ] Workflow .659: scrub candidate A -> B; existing selection remains, A disappears, B appears
- [ ] Workflow .659: no candidate-to-candidate accumulation
- [ ] Workflow .659: release commits existing selection + current candidate
- [ ] Workflow .659: pointercancel restores exact pre-hold selection
- [ ] Workflow .659: Face Boundary candidates from .657 still browse correctly
- [ ] Regression .659: starting with no prior selection behaves like candidate-only browser
- [ ] Regression .659: vertical Grow/Shrink remains functional
- [x] Static .659: preview recomputes from fixed hold.baseIndices + current candidate
- [x] Static .659: commit recomputes the same fixed-base result
- [x] Protection .659: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .660: arm Loop Cut and Pencil-down on valid Edge
- [ ] Workflow .660: cut topology appears and same Pencil drag slides inserted loop
- [ ] Workflow .660: camera does not orbit during Loop Cut slide drag
- [ ] Workflow .660: release commits cut/slide normally
- [ ] Workflow .660: after Loop Cut is manually disarmed, Pencil navigation works normally
- [ ] Workflow .660: perform Edge Bevel by Pencil drag
- [ ] Workflow .660: after Bevel release, Bevel button is no longer active
- [ ] Workflow .660: next Edge tap selects normally instead of immediately bevelling
- [ ] Workflow .660: Bevel pointercancel restores mesh and disarms
- [ ] Workflow .660: exact Bevel completion also disarms
- [ ] Regression .660: .652 Face Extrude/Inset background-yield still works
- [ ] Regression .660: .659 additive Edge hold selection still works
- [x] Static .660: Pencil gate recognizes main direct modelling owner
- [x] Static .660: direct Bevel pointerup/pointercancel call disarm
- [x] Protection .660: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Static .661: direct-bevel cache pin matches release
- [x] Static .661: main/pencil gate pins match release
- [ ] Hands-on .661: Loop Cut insert+drag slides, not orbits
- [ ] Hands-on .661: Bevel disarms after commit and next Edge tap selects

- [x] Hands-on .661: Loop Cut slide ownership PASS
- [x] Hands-on .661: Bevel post-commit reset PASS
- [ ] Workflow .662: radial Edge Bevel opens viewport palette
- [ ] Workflow .662: palette Width mirrors left #bevelWidth
- [ ] Workflow .662: palette Segments mirrors left #bevelSegments
- [ ] Workflow .662: Pencil-drag selected Edge still performs normal Bevel
- [ ] Workflow .662: Pencil-drag commit hides palette and disarms Bevel
- [ ] Workflow .662: Apply Exact commits captured radial launch selection using displayed Width/Segments
- [ ] Workflow .662: Apply Exact hides palette and returns to Edge selection
- [ ] Workflow .662: Cancel restores launch selection and disarms Bevel
- [ ] Workflow .662: ordinary left-toolbar Bevel does NOT open viewport palette
- [ ] Regression .662: .659 additive Edge hold remains PASS
- [ ] Regression .662: .658 radial availability remains intact
- [x] Static .662: viewport palette proxies existing Bevel controls/owner only
- [x] Protection .662: no Bevel topology kernel changed
- [x] Protection .662: src/multi-object-transform.js?v=0.36.1.0 unchanged



- [x] Hands-on .662: radial Bevel viewport session PASS
- [ ] Workflow .663: radial Edge Extrude opens simplified Total Gizmo constraint session
- [ ] Workflow .663: simplified gizmo shows Move X/Y/Z axes + centre only
- [ ] Workflow .663: centre selects local Plane constraint without transforming selected Edge
- [ ] Workflow .663: X/Y/Z axis tap changes Edge Extrude constraint without transforming selected Edge
- [ ] Workflow .663: dragging selected boundary Edge after constraint choice creates normal ribbon preview/commit
- [ ] Workflow .663: default radial Edge Extrude constraint remains Plane
- [ ] Workflow .663: successful pull selects new outer rail and gizmo follows it for repeat pull
- [ ] Workflow .663: disarming Edge Extrude restores normal Total Gizmo controls
- [ ] Workflow .663: changing away from Edge mode ends Extrude gizmo constraint session
- [ ] Regression .663: left-toolbar Edge Extrude remains unchanged and does not open simplified gizmo session
- [ ] Regression .663: .662 Bevel viewport session remains PASS
- [ ] Regression .663: .661 Loop Cut ownership + Bevel reset remain PASS
- [ ] Regression .663: .659 additive Edge hold selection remains PASS
- [x] Static .663: Edge Extrude topology/ribbon owner remains src/edge-extrude.js; no duplicate kernel added
- [x] Static .663: radial gizmo session maps constraint only and does not begin component transform
- [x] Protection .663: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .663: radial Edge Extrude ribbon workflow works
- [ ] Workflow .664: radial Edge Extrude constraint control is offset beside selected Edge/chain
- [ ] Workflow .664: side placement flips near viewport edge to avoid running off-screen
- [ ] Workflow .664: default Plane constraint is visibly identified/highlighted
- [ ] Workflow .664: tapping X/Y/Z changes active constraint label/highlight without moving geometry
- [ ] Workflow .664: dragging selected Edge still owns ribbon preview/commit
- [ ] Workflow .664: successful pull selects new outer rail and side palette follows it
- [ ] Regression .664: left-toolbar Edge Extrude remains unchanged
- [ ] Regression .664: .662 Bevel viewport session remains PASS
- [x] Static .664: no Edge Extrude topology/projection/history code changed
- [x] Protection .664: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .664: Edge Extrude radial workflow / drag-on-edge extrusion works really well
- [ ] Workflow .666: visible release remains v0.36.18.666 after release-version refresh
- [ ] Workflow .666: intentional Edge Extrude session exit disarms left-panel Extrude
- [ ] Workflow .666: Edge selection is preserved on Extrude session exit
- [ ] Workflow .666: closed Selection Hub puck reappears on preserved Edge selection
- [ ] Workflow .666: resulting outer rail remains immediately available for next Edge action
- [ ] Regression .666: radial Edge Extrude geometry/drag behaviour remains unchanged
- [x] Static .666: version.json and index.html release version match
- [x] Static .666: Extrude exit calls existing setArmed(false); no geometry kernel change
- [x] Protection .666: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .667: Edge Extrude exit preserves current outer Edge selection
- [ ] Workflow .667: Edge Extrude exit leaves left-panel Extrude OFF
- [ ] Workflow .667: Edge Extrude exit leaves Move transform OFF
- [ ] Workflow .667: closed puck returns on preserved Edge selection
- [ ] Regression .667: Edge Extrude ribbon/constraint behaviour unchanged
- [x] Static .667: exit snapshots/restores Edge IDs and disarms existing transform owner
- [x] Protection .667: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Strengthening .668: connected-chain Edge Bevel / 4-valence quad case recorded in ROADMAP.md
- [ ] Workflow .668: radial Edge Crease opens contextual viewport panel
- [ ] Workflow .668: viewport Strength mirrors authoritative left #creaseStrength control
- [ ] Workflow .668: tapping Edge applies Crease through existing main.js owner
- [ ] Workflow .668: viewport Uncrease delegates to existing selected-edge Uncrease
- [ ] Workflow .668: Done disarms Crease, preserves Edge selection and returns puck
- [ ] Regression .668: left-toolbar Crease does not open viewport panel
- [ ] Regression .668: Edge Extrude radial workflow unchanged
- [x] Static .668: no duplicate Crease kernel/history path added
- [x] Protection .668: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .669: radial Edge Crease reliably opens viewport panel
- [ ] Workflow .669: panel survives immediate radial launch/render sync
- [ ] Workflow .669: Strength mirrors left control
- [ ] Workflow .669: Done preserves Edge selection and returns puck
- [ ] Regression .669: left-panel Crease does not open viewport panel
- [x] Static .669: Total Gizmo directly calls Crease session openFromHub after authoritative Crease click
- [x] Protection .669: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .670: radial Crease preserves preselected Edge(s)
- [ ] Workflow .670: radial Crease does not enter legacy blank paint-selection mode
- [ ] Workflow .670: viewport Crease panel opens immediately beside preserved selection
- [ ] Workflow .670: current Strength applies immediately to captured selection
- [ ] Workflow .670: Strength slider updates same captured selection live
- [ ] Workflow .670: Uncrease sets captured selection to 0
- [ ] Workflow .670: Done commits once, preserves selection and returns puck
- [ ] Regression .670: left-panel Crease retains legacy tap-edge paint workflow
- [x] Static .670: radial session uses main.js authoritative applyCreaseSelection bridge
- [x] Protection .670: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .670: radial Crease selection-first workflow PERFECT / PASS
- [ ] Workflow .671: radial Offset opens contextual viewport panel
- [ ] Workflow .671: Support Spacing slider mirrors left #offsetLoopSpacing
- [ ] Workflow .671: drag selected loop uses existing live Offset preview/commit
- [ ] Workflow .671: drag commit selects created support loops and returns puck
- [ ] Workflow .671: Apply Exact delegates to existing precision Offset owner
- [ ] Workflow .671: exact commit selects created support loops and returns puck
- [ ] Workflow .671: Done without applying preserves original loop selection and returns puck
- [ ] Regression .671: left-panel Offset does not open viewport panel
- [ ] Regression .671: .670 radial Crease remains PASS
- [ ] Regression .671: Edge Extrude remains unchanged
- [x] Static .671: loop-offset + precision-offset emit shared completion semantic
- [x] Static .671: no duplicate Offset topology kernel added
- [x] Protection .671: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .672: radial Edge Slide opens contextual viewport panel
- [ ] Workflow .672: existing direct drag Slide remains unchanged
- [ ] Workflow .672: successful drag preserves Edge selection and returns puck
- [ ] Workflow .672: + exact percentage slides toward one side
- [ ] Workflow .672: - exact percentage slides toward opposite side
- [ ] Workflow .672: exact completion preserves Edge selection and returns puck
- [ ] Workflow .672: Done without action leaves geometry unchanged, preserves selection and returns puck
- [ ] Regression .672: left-panel Edge Slide does not open viewport panel
- [ ] Regression .672: radial Crease remains PASS
- [ ] Regression .672: radial Offset and Edge Extrude unchanged
- [x] Static .672: existing component-slide + precision-edge-slide remain authoritative
- [x] Static .672: no duplicate Slide solver added
- [x] Protection .672: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Regression .673: one finger orbits only
- [ ] Regression .673: two-finger drag pans
- [ ] Regression .673: pinch zooms
- [ ] Regression .673: Pencil orbits
- [ ] Regression .673: after tool interactions, no single-finger pan+zoom corruption
- [x] Static .673: OrbitControls gets touch/pen pointerup/cancel in early capture phase
- [x] Static .673: duplicate Orbit release delivery suppressed
- [x] Protection .673: modelling pointerdown/move ownership unchanged
- [x] Protection .673: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Regression .675: one finger orbits only after fresh load
- [ ] Regression .675: two-finger drag pans
- [ ] Regression .675: pinch zooms
- [ ] Regression .675: Pencil orbits
- [ ] Regression .675: touch navigation remains responsive after prolonged modelling
- [ ] Recovery .675: stale controls.enabled=false self-recovers on fresh first touch
- [ ] Recovery .675: stale controls.enabled=false self-recovers after last contact ends
- [x] Static .675: NAV CONTROLS RECOVER markers added
- [x] Protection .675: modelling pointerdown/move ownership unchanged
- [x] Protection .675: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .676: radial Edge Bridge completes using existing topology owner
- [ ] Workflow .676: successful radial Bridge switches to Face mode
- [ ] Workflow .676: created bridge face(s) remain selected
- [ ] Workflow .676: closed Face puck appears on created bridge face selection
- [ ] Workflow .676: Undo removes Bridge in one step
- [ ] Regression .676: left-panel Edge Bridge retains legacy completion behaviour
- [ ] Regression .676: Face Bridge unchanged
- [ ] Regression .676: Edge Extrude / Bevel / Crease / Offset / Slide radial flows unchanged
- [ ] Monitoring .676: .675 touch navigation remains good during normal modelling
- [x] Static .676: existing bridge-ui topology/history owner retained
- [x] Static .676: no Bridge topology kernel duplicated
- [x] Protection .676: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .675: navigation recovery good for now / provisional PASS
- [ ] Workflow .676: radial Bridge is available from one complete boundary loop
- [ ] Workflow .676: radial Bridge panel opens while legacy drawer Bridge remains disabled
- [ ] Workflow .676: first boundary remains selected during second-boundary acquisition
- [ ] Workflow .676: adding compatible second boundary enables Apply Bridge
- [ ] Workflow .676: Apply delegates to existing bridge owner and creates bridge
- [ ] Workflow .676: created bridge faces become selected in Face mode
- [ ] Workflow .676: Cancel restores first boundary and puck
- [ ] Regression .676: legacy left-panel Edge Bridge still requires complete two-loop selection
- [ ] Regression .676: Face Bridge unchanged
- [x] Static .676: guided session validates combined selection via bridgeEdgeSelectionInfo()
- [x] Static .676: no duplicate Bridge topology kernel added
- [x] Protection .676: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .676: guided radial Edge Bridge PASS
- [ ] Workflow .677: radial Dissolve executes once with no extra panel
- [ ] Workflow .677: next surviving Edge selection gets puck immediately after Dissolve
- [ ] Workflow .677: radial Delete executes once with no extra panel
- [ ] Workflow .677: next surviving Edge selection gets puck immediately after Delete
- [ ] Workflow .677: if valid Edge selection survives either action, closed puck returns on it
- [ ] Regression .677: .676 guided Bridge remains PASS
- [x] Static .677: stale hubSuppressedKey cleared after radial Edge one-shot completion
- [x] Static .677: Dissolve/Delete topology/history owners unchanged
- [x] Protection .677: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .677: Edge radial one-shot cleanup PASS
- [ ] Workflow .678: radial Face Duplicate is available
- [ ] Workflow .678: selected Face(s) duplicate into a new object
- [ ] Workflow .678: source object remains unchanged
- [ ] Workflow .678: duplicate becomes selected and Object mode activates
- [ ] Workflow .678: Object transform gizmo appears immediately on duplicate
- [ ] Workflow .678: Move/Rotate/Scale work immediately on duplicate
- [ ] Regression .678: Extract Faces unchanged
- [x] Static .678: existing duplicate-faces.js owner reused
- [x] Static .678: no duplicate Face duplication kernel added
- [x] Protection .678: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .678: Duplicate Faces works and moves with Object gizmo
- [ ] Workflow .679: background tap dismisses active Object gizmo
- [ ] Workflow .679: background dismiss keeps object selected
- [ ] Workflow .679: tapping object again restores gizmo
- [ ] Workflow .679: selecting a different object restores gizmo automatically
- [ ] Regression .679: Duplicate completion still opens gizmo immediately
- [x] Static .679: Object mode no longer force-reopens gizmo when dismissed
- [x] Protection .679: transform geometry owners unchanged
- [x] Protection .679: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Regression .680: Total Gizmo loads again
- [ ] Workflow .680: Duplicate Faces opens Object gizmo immediately
- [ ] Workflow .680: background tap dismisses gizmo
- [ ] Workflow .680: object remains selected after dismiss
- [ ] Workflow .680: tapping object restores gizmo
- [x] Static .680: duplicate top-level canvas declaration removed
- [x] Protection .680: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .681: Pencil tap empty background dismisses Object gizmo
- [ ] Workflow .681: object remains selected after Pencil dismiss
- [ ] Workflow .681: tapping object restores gizmo
- [ ] Regression .681: finger background dismiss remains PASS
- [ ] Regression .681: Pencil drag on empty background still orbits
- [ ] Regression .681: Pencil orbit drag does not fire background-tap dismiss
- [x] Static .681: semantic boxlab-pencil-background-tap added
- [x] Protection .681: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Workflow .682: repeated Pencil background taps dismiss Object gizmo reliably
- [x] Workflow .682: repeated Pencil object taps restore Object gizmo reliably
- [x] Workflow .682: object/background alternation remains stable
- [x] Regression .682: Pencil drag on background still orbits
- [x] Regression .682: finger background dismiss remains PASS
- [x] Static .682: Object picker routes through authoritative body raycast
- [x] Static .682: Pencil background candidacy begins at window capture
- [x] Protection .682: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .683: radial Extract executes from Face ring
- [ ] Workflow .683: source Faces removed unless whole source would become empty
- [ ] Workflow .683: new Extracted Faces object becomes active
- [ ] Workflow .683: Object gizmo appears immediately on extracted object
- [ ] Workflow .683: Move works immediately
- [ ] Workflow .683: finger/Pencil background dismiss still works
- [ ] Workflow .683: tapping extracted object restores gizmo
- [ ] Workflow .683: Undo restores scene transaction
- [x] Static .683: existing Extract owner reused
- [x] Static .683: no duplicate Extract topology kernel added
- [x] Protection .683: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .684: radial Knife opens compact viewport session
- [ ] Workflow .684: first Knife cut uses existing snapping/preview and commits normally
- [ ] Workflow .684: Knife remains active after cut for repeated cuts
- [ ] Workflow .684: second cut can be made without relaunching Knife
- [ ] Workflow .684: Done disarms Knife and hides viewport session
- [ ] Workflow .684: next Face selection gets fresh puck immediately
- [ ] Regression .684: left-panel Knife does not open radial session
- [ ] Regression .684: Pencil orbit/navigation unchanged
- [x] Static .684: existing Knife geometry/snap/history owner retained
- [x] Static .684: no duplicate Knife topology implementation added
- [x] Protection .684: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .684: radial Knife viewport session PASS
- [ ] Workflow .685: screenshot case accepts Loop Cut across logical quad corridor
- [ ] Workflow .685: Loop Cut stops at genuine non-quad / pole topology
- [ ] Workflow .685: existing collinear boundary vertices are preserved
- [ ] Workflow .685: live Loop Slide still works after generalized cut
- [ ] Workflow .685: Loop count >1 works on generalized corridor
- [ ] Regression .685: ordinary cube Loop Cut unchanged
- [ ] Regression .685: .684 Knife remains PASS
- [x] Static .685: logical quad requires exactly four genuine corners
- [x] Static .685: physical boundary chains retained during reconstruction
- [x] Static .685: existing logical-quad owner strengthened rather than duplicated
- [x] Protection .685: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .686: screenshot case still accepts Loop Cut
- [ ] Workflow .686: no long diagonal/sliver faces after generalized cut
- [ ] Workflow .686: outer boundary detail around opening remains intact
- [ ] Workflow .686: live Loop Slide works after cut
- [ ] Workflow .686: Loop count >1 creates clean bands
- [ ] Regression .686: ordinary cube Loop Cut unchanged
- [x] Static .686: only untouched logical sides used as outer connectors
- [x] Static .686: interior bands reconstructed deterministically
- [x] Protection .686: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [ ] Workflow .687: strengthened Loop Cut still traverses screenshot case
- [ ] Workflow .687: Loop Slide moves in expected direction from touched edge
- [ ] Workflow .687: reversing drag reverses slide
- [ ] Regression .687: .686 clean strip reconstruction remains intact
- [ ] Regression .687: ordinary cube Loop Cut unchanged
- [x] Static .687: logical seed direction derived from clicked physical edge
- [x] Static .687: promoted collinear-side segment direction projects to logical side
- [x] Protection .687: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Workflow .688: ordinary quad Loop Cut matches pre-.685 behaviour
- [x] Workflow .688: Loop Slide direction/feel matches pre-.685 behaviour
- [ ] Workflow .688: multi-loop count remains correct
- [ ] Workflow .688: single Add-vertex logical quad remains supported
- [ ] Safety .688: unsupported complex screenshot topology refuses cleanly rather than creating malformed faces
- [x] Static .688: loop-cut-added-vertex.js restored from known-good v0.36.18.162
- [x] Static .688: .685-.687 generalized reconstruction removed from live core
- [x] Protection .688: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Hands-on .688: Loop Cut / Loop Slide old feel PASS
- [x] Workflow .689: radial Face Delete executes once with no extra panel
- [x] Workflow .689: next surviving Face selection gets puck immediately
- [ ] Workflow .689: valid surviving Face selection returns puck automatically
- [ ] Regression .689: .688 Loop Cut remains PASS
- [x] Static .689: stale Face hubSuppressedKey cleared after radial Delete
- [x] Static .689: Face Delete topology/history owner unchanged
- [x] Protection .689: src/multi-object-transform.js?v=0.36.1.0 unchanged


- [x] Workflow .690: radial Shell Cancel restores Face puck when selection survives
- [x] Workflow .690: radial Shell Apply closes cleanly and restores puck when selection survives
- [x] Workflow .690: radial Sweep Cancel restores Face puck when selection survives
- [x] Workflow .690: radial Sweep Apply closes cleanly with no stale suppression
- [x] Workflow .690: next Face selection gets fresh puck when session ends with no selection
- [x] Regression .690: Knife Done remains PASS
- [x] Static .690: Shell/Sweep geometry/history owners unchanged
- [x] Static .690: Knife/Shell/Sweep share one Face session completion path
- [x] Protection .690: src/multi-object-transform.js?v=0.36.1.0 unchanged


## Release / handoff checks â€” v0.36.18.690

- [x] Static .690: HTML title / data-release-version / version.json all agree on 0.36.18.690
- [x] Static .690: total-gizmo / Shell session / Sweep session are pinned to .690
- [x] Static .690: release-bootstrap.js and release-version.js repinned to .690 after refresh hardening
- [x] Release .690: stale-shell recovery remains live after repeated stale responses instead of stopping permanently after three attempts
- [x] Hands-on .690: iPad actually displays v0.36.18.690 after refresh hardening
- [x] Hands-on .690: Shell Cancel / Apply restore Face puck correctly
- [x] Hands-on .690: Sweep Cancel / Apply leave no stale Selection Hub suppression
- [x] Regression .690: Knife Done remains PASS
- [x] Handoff .690: AI_WORKFLOW release/cache protocol updated
- [x] Protection .690: v0.36.18.162 Loop Cut behaviour remains the protected live core
- [x] Protection .690: src/multi-object-transform.js?v=0.36.1.0 unchanged

## Modeless Face vertical scrub â€” v0.36.18.691

- [x] Hands-on .690: complete refreshed-shell Face-session exit check list PASS; Face radial lifecycle protected
- [x] Automated .691: Face Grow previews recompute from fixed base and return to neutral
- [x] Automated .691: Face Shrink/reversal restores the same starting selection
- [x] Automated .691: neutral band boundary tested; Edge/Vertex behavior unchanged
- [x] Hands-on .691: visibly loads v0.36.18.691
- [x] Hands-on .691: Face hold then UP grows; returning to start restores initial selection
- [x] Hands-on .691: farther UP then back reduces steps rather than accumulating
- [x] Hands-on .691: DOWN shrinks; returning to start restores initial selection; release keeps preview
- [x] Regression .691: Face sideways hold browser and tap select/deselect unchanged
- [x] Protection .691: .690 Shell/Sweep/Knife and .682 Pencil/Object owners unchanged
- [x] Protection .691: .688 Loop Cut core and multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Release .691: release-version and release-bootstrap pins updated to .691; targeted behavioral/release tests 9/9 PASS
- [x] Audit .691: full CI compared with .690 runtime; 285 existing failures, additional release pin mismatch corrected

## Modeless Edge vertical scrub â€” v0.36.18.692

- [x] Hands-on .691: Face neutral return complete manual list PASS and protected
- [x] Automated .692: Edge Grow/reversal/neutral and multi-edge Shrink/neutral restore fixed base
- [x] Automated .692: neutral boundary, protected Face behavior and Vertex baseline tested
- [x] Release .692: shell/manifest/main/refresh pins agree; targeted tests 12/12 PASS
- [ ] Hands-on .692: visibly loads v0.36.18.692
- [ ] Hands-on .692: Edge hold UP grows; return to origin restores starting selection
- [ ] Hands-on .692: farther UP and back reduces steps without accumulation
- [ ] Hands-on .692: DOWN shrinks; neutral restores initial selection; release keeps preview
- [ ] Regression .692: sideways Edge Loop/Ring/Boundary browsing and additive base intact
- [ ] Regression .692: Face .691 neutral return remains PASS
- [x] Protection .692: Loop Cut, radial tool owners and protected multi-object-transform unchanged

## Face radial gaps â€” v0.36.18.693

- [x] Static .693: primary eight Face sectors retain their labels/positions
- [x] Static .693: More pop-out Join proxies existing #joinSelectedCoplanarFacesBtn
- [x] Static .693: existing disabled-state and one-shot puck restoration paths reused
- [x] Protection .693: Join topology/history, Loop Cut and protected multi-object transform unchanged
- [ ] Hands-on .693: visible release .693; Face More pop-out opens beside ring and toggles closed
- [ ] Hands-on .693: selected adjacent coplanar Faces Join into one selected Face with puck
- [ ] Hands-on .693: one Undo restores separate Faces
- [ ] Hands-on .693: one Face/non-coplanar selection disables Join
- [ ] Regression .693: primary Face tools, Shell/Sweep exits and ring centre close remain intact

## Face two-ring batch â€” v0.36.18.694

- [x] Static .694: More UI removed; eight inner sectors unchanged; outer Join/Circle use existing owners
- [x] Protection .694: modelling kernels/Undo owners and protected transform untouched
- [x] Hands-on .694: visible .694; two rings readable and selectable with Pencil/touch
- [x] Hands-on .694: outer Join returns selected-result puck and undoes in one step
- [x] Hands-on .694: outer Circle returns puck and undoes in one step
- [x] Regression .694: disabled actions, ring-centre close and inner tools remain correct
- [x] Layout .694: spacing inspected near viewport edges and at different zooms

## Face outer Poke / Make Planar â€” v0.36.18.695

- [x] Hands-on .694: full manual list PASS; protected two-ring Join/Circle workflow
- [x] Static .695: Poke/Make Planar proxy existing loaded owners; previous sectors unchanged
- [x] Protection .695: modelling/Undo owners and protected transform unchanged
- [x] Hands-on .695: visible .695; both additional outer buttons usable
- [x] Hands-on .695: single/multi-face Poke returns selected-result puck and one-step Undo
- [x] Hands-on .695: one warped Face Make Planar returns puck; one Undo restores warp
- [x] Hands-on .695: planar/multiple Faces disable Make Planar
- [x] Regression .695: Join/Circle, centre close and protected navigation remain intact


## v0.36.18.696 â€” outer Face Triangulate / Flip Faces

- [x] .695 full manual list confirmed PASS by user; protect Poke/Make Planar validation, selection, puck return and one-step Undo.
- [x] iPad visibly shows v0.36.18.696 before judging.
- [x] Triangulate/Flip Faces appear on outer ring; previous sectors remain accessible.
- [x] Quad Triangulate produces two selected triangles, restores puck and undoes in one step; multi-Face works and triangle-only selection disables action.
- [x] Flip Faces reverses selected winding, preserves selection, restores puck and undoes in one step.
- [x] Poke/Make Planar, close and persistent selection/navigation remain intact.


## v0.36.18.697 â€” outer Face orientation tools

- [x] .696 full hands-on list PASS; protect Triangulate/Flip Faces.
- [x] iPad visibly shows .697; Orient Faces/Orient Outward and previous sectors accessible.
- [x] Connected patch with mixed winding becomes consistent; selection/puck return; one Undo restores mismatch.
- [x] Complete closed shell with mixed winding becomes outward; selection/puck return; one Undo restores mismatch.
- [x] Single Face / incomplete shell correctly disable the respective tools.
- [x] Already-correct eligible actions report no change, return puck and add no history.
- [x] Ring close, prior tools, navigation and viewport-edge spacing remain intact.


## v0.36.18.698 â€” radial Face Bridge preview / centre close

- [x] .697 full manual list PASS; orientation tools protected.
- [x] Automated: cycling adds no history; cancel restores mesh/selection; commit adds one history and emits completion after selection cleanup.
- [x] Visible .698; nine outer tools accessible; centre Ã— aligned on puck.
- [x] Compatible two-Face Bridge opens nearby Next/Use Bridge/Cancel controls; Next cycles.
- [x] Cancel restores original Faces/selection and puck without history.
- [x] Use commits once, closes panel and clears selection; Undo restores; next Face tap gets puck.
- [x] Invalid selections disable Bridge; prior Face tools, protected Edge Bridge and navigation intact.


## v0.36.18.699 â€” radial Extrude / Inset exact and repeat controls

- [x] .698 full hands-on list PASS; Face Bridge lifecycle and centred Ã— protected.
- [x] Automated: exact tool/value delegates to existing owner; no-selection disables exact; Repeat/Done delegate/disarm; another radial tool keeps its lifecycle.
- [x] Visible .699; radial Extrude/Inset each open correctly labelled nearby settings.
- [x] Small exact Extrude and Inset values affect selected Faces and each Undo in one step.
- [x] Normal drag updates last-value readout; Repeat toggles and replays existing Face-tap operation.
- [x] Done closes settings, disarms Repeat/tool, returns surviving-selection puck; normal selection/navigation work.
- [x] Other radial tools close settings; Bridge, Shell/Sweep, prior sectors and centred Ã— remain intact.


## v0.36.18.700 â€” top-centre session dock / background Done

- [x] .699 Exact/Repeat/Done confirmed perfect by user.
- [x] Automated: all ten viewport panels/numeric entry use shared dock; contextual background taps preserve selection and complete; drags/cancelled multi-touch bypass completion.
- [x] Visible .700; all Face/Edge session panels and numeric popups top centre, stable during navigation.
- [x] Finger/Pencil background tap ends radial Extrude/Inset settings like Done, keeps surviving selection/puck, disarms Repeat/tool.
- [x] Background drag orbits; pan/pinch and two/three-finger Undo/Redo do not dismiss settings.
- [x] Face taps, Exact/Repeat and explicit Done remain correct.
- [x] Knife/Shell/Sweep/Face Bridge and protected Edge session completions work unchanged; gizmo/ring stay on selection.


## v0.36.18.701 â€” radial Face Coplanar / Connected selection

- [x] .700 full manual list PASS; top-centre popup placement and background Done protected.
- [x] Static: existing loaded button owners/validation reused; all previous targets retained; outer buttons have no overlap with each other/inner buttons.
- [x] Visible .701; eleven outer tools usable and previous eight inner tools unchanged.
- [x] One triangle of a triangulated quad â†’ Coplanar selects flat connected region, preserves geometry and returns puck.
- [x] One cube Face â†’ Connected selects complete shell, excludes disconnected components and returns puck.
- [x] Multi-Face selection disables both seed-based helpers.
- [x] Ring close, previous tools, top-centre panels, background Done/navigation and viewport-edge layout remain intact.


## v0.36.18.702 â€” active-tool-only radial correction

- [x] .701 selection command behavior PASS; user explicitly retires radial selection access.
- [x] Static: no selection button proxies remain on Face ring; all seventeen active tool targets retained.
- [ ] Visible .702; eight inner/nine outer active tools, Coplanar/Connected removed.
- [ ] Existing modelling sectors and centre close work.
- [ ] Normal/long-press selection browsing unchanged.
- [ ] Top-centre session panels and background Done remain correct.


## v0.36.18.703 â€” Face radial whole-object repair batch

- [x] Automated: three launches do not apply; top-centre scope controls; Cancel preserves selection and completes; Apply delegates once and clears stale Face IDs; owner failure preserves selection/reports reason; disabled/locked/context changes and superseding radial tools handled.
- [x] Static: twenty active targets, no selection helpers, no outer/outer or outer/inner button rectangle overlap; protected inner positions/modelling owners/transform/Loop Cut unchanged.
- [ ] Visible .703; eight inner/twelve outer tools and centre close remain usable.
- [ ] Close Holes / Quad Cleanup / Quadify N-gons show whole-active-object scope at top centre; Cancel returns original selected puck with no geometry/history change.
- [ ] Apply on suitable ordinary meshes repairs whole active object once; one Undo restores geometry. Successful Apply clears Face selection; next Face tap gets fresh puck.
- [ ] No eligible candidates disable corresponding tools; owner rollback reports reason and retains selection.
- [ ] Existing Face/Edge sessions, background Done, navigation and long-press selection remain protected.


## v0.36.18.704 â€” Face radial Clean Vertices / Align

- [x] Automated: all four repair launchers delegate existing APIs; cleanup actual owner returns safe success/failure with one history step and no-op cube protection; Align proxy axis delegation/Cancel/context changes/semantic completion/superseding tool; actual Align owner preserves anchor and commits once; existing core/dock/background/Bridge/value/release checks.
- [x] Static: all twenty previous targets retained; 22 active targets with no selection proxies; outer/outer and outer/inner spacing PASS; original inner positions/centre Ã— and protected cores unchanged. Dynamic owner and parent-loader pins current.
- [ ] Visible .704; fourteen outer/eight inner buttons usable and centre close works.
- [ ] Two or more selected Faces â†’ Align â†’ X/Y/Z â†’ tap selected anchor Face: anchor stays fixed, other selected vertices align on chosen axis, selection/puck returns, one Undo restores geometry.
- [ ] Align Cancel before/after axis arming leaves mesh/selection unchanged; one selected Face disables Align; navigation/selection remain correct.
- [ ] Clean Vertices top-centre whole-object panel Cancel preserves mesh/selection; Apply on eligible mesh removes safe redundant vertices once; Face selection clears, next tap gets fresh puck, one Undo restores geometry. Healthy cube disables cleanup.
- [ ] .703 repairs, Face/Edge sessions, Extrude/Inset background Done and protected navigation remain intact.


## v0.36.18.705 â€” Align to Face

- [x] Automated: arbitrary plane/group shape/fixed anchor/tangential positioning/shared hinge/bent and warped rejection, actual owner commit/Undo/Redo/no-op/topology rejection, popup delegation/feedback/Cancel and protected nearby checks.
- [x] Visible .705; existing Align pop-out exposes Align to Face beside X/Y/Z at top centre.
- [x] Selected moving planar Face(s) + tapped fixed selected Face â†’ arbitrary-plane rotation and translation along anchor normal; fixed Face/vertices unchanged, moved group shape preserved, no tangential recentering.
- [x] Bent moving groups, warped anchors/shared-vertex conflicts and collapsing neighbours reject without changing geometry/history; reason stays visible. Shared boundary hinge works when fixed vertices can remain unchanged.
- [x] Success preserves Face selection, closes settings/returns puck, commits one Undo; Cancel changes neither geometry nor history.
- [x] Existing X/Y/Z Align, other radial tools, selection/navigation and protected transform/Loop Cut remain intact.


## v0.36.18.706 â€” Face radial Merge by Distance

- [x] .705 full manual list PASS; Align to Face protected.
- [x] Automated: existing welding/scanner kernels reused; Face panel opens despite disabled Vertex target, explicit tolerance scans without mutation, Cancel preserves selection, whole-object Apply stays Face/clears stale IDs/one history snapshot, invalid/unsafe/joint duplicate-Face batches reject, changed context rescanned/blocked, default Vertex results and intentional loose topology preserved.
- [x] Static: eight inner unchanged, fifteen outer active tools at 220px with no outer/outer or outer/inner rectangle overlap; all prior targets retained; dynamic child/parent pins and release markers updated; protected transform/Loop Cut untouched.
- [ ] Visible .706; Merge Dist and prior tools/centre Ã— usable.
- [ ] Merge Dist top-centre panel clearly states whole active object and distance in model units; distance edits update readiness without geometry/history.
- [ ] Cancel retains original Face selection/puck and geometry/history.
- [ ] Apply on eligible ordinary mesh welds once without mode hop; clears stale Face IDs, next tap fresh puck; one Undo/Redo restores/repeats geometry.
- [ ] Invalid distance/no safe clusters disables Apply; Align to Face, prior repairs, background Done and navigation protected.


## v0.36.18.707 â€” Face radial Bevel

- [x] Automated: existing installed Edge bevel stack reused, Face/perimeter resolution through face-region, internal selected edges excluded, exact chamfer/rounded geometry matches Edge engine, one History Undo/Redo, actual Pencil preview/commit/cancel, failures rollback, lock/mesh/mode/selection guards, semantic Face dispatch without Edge button click, protected Edge drag/exact; nearby Face/dock/release checks.
- [x] Static: eight inner unchanged, sixteen active outer tools at 230px/22.5Â° with no outer/outer or outer/inner rectangle overlap; all previous targets retained; no additional raw-pointer owner or kernel edit; changed modules and release pins updated; protected transform/Loop Cut unchanged.
- [ ] Visible .707; select ordinary cube Face â†’ radial Bevel opens top-centre Width/Segments/Apply Exact/Cancel, stays Face mode.
- [ ] Pencil-drag selected Face horizontally bevels entire perimeter; one Undo/Redo; segments 1 chamfer / multiple segments rounded.
- [ ] Apply Exact matches perimeter bevel, closes cleanly, clears stale selection; next Face tap fresh puck, one Undo restores.
- [ ] Cancel before apply and cancelled previews preserve original geometry/Face selection/history; puck returns and background orbit/pan/zoom work.
- [ ] Connected selected Faces bevel outside boundary only when current Edge engine supports it; unsupported/disconnected/no-boundary selections disabled.
- [ ] Protected Edge Bevel drag/exact/Cancel, prior Face tools, centre Ã— and ring spacing remain correct. .706 pending checks retained.


## v0.36.18.708 â€” Face Bevel blue preview / ownership

- [x] .707 drag reported FAIL; no PASS recorded. Source/live release audit verified .707; exact screenshot stamp absent.
- [x] Automated: snapshot candidate slider preview does not mutate live geometry/history, Shell-blue fill/wire style and unique disposal, Window Face owner precedes consuming document Move handler, actual main fallback guard only during Face session, touch navigation passes, Pencil release retains preview until explicit Apply, one Undo/Redo, cancellation and external-source rejection, protected Edge drag/exact and nearby Face/dock/release checks.
- [x] Static: Edge exclusively canvas / Face exclusively window capture, same handler functions and kernel; direct helper/parent/main/session/release pins .708; ring/blue Shell-Solidify/protected transform/Loop Cut unchanged.
- [x] Visible .708; Face Bevel opens blue fill/wire preview and top-centre Width/Segments/Apply Bevel/Cancel.
- [x] Width/Segments update preview live without modifying original mesh/selection/history.
- [x] Pencil horizontal selected-Face drag adjusts preview without Move; release keeps it ready for explicit Apply.
- [x] Cancel removes preview, restores original selected puck with no geometry/history; background orbit/finger pan/pinch stay functional.
- [x] Apply commits once, removes preview/settings and clears stale Face selection; next Face tap gets puck; one Undo/Redo.
- [x] Protected Edge Bevel drag/exact/Cancel, prior Face tools/navigation remain correct. Pending .706 checks retained.


## v0.36.18.709 â€” Vertex radial Merge pair

- [x] .708 full manual list PASS; Face Bevel preview/ownership protected.
- [x] Automated: real Vertex merge owner through radial click, midpoint and chronological first placement, result selection/puck, one History Undo/Redo, disabled unsafe/single/read-only/wrong-mode no-op; protected Face/Edge ring targets and nearby sessions.
- [ ] Visible .709; Vertex puck â†’ transform centre opens Merge Center / Merge First; centred Ã— closes without changing selection.
- [ ] Adjacent cube vertices â†’ Merge Center: midpoint result selected/puck, one Undo/Redo.
- [ ] Adjacent vertices selected in order â†’ Merge First: first position preserved/result puck, one Undo/Redo.
- [ ] Single/unsafe selection disables actions; Vertex selection/navigation and protected Face/Edge tools remain correct. Earlier pending repair checks retained.

## v0.36.18.710 â€” all existing Vertex radial tools / cross-mode Bevel slot

- [x] Automated: thirteen existing Active Tools targets only; shared inner90Â° Bevel across Face/Edge/Vertex; requested Face/Edge rearrangement; outer/outer and outer/inner Vertex spacing.
- [x] Automated: actual Vertex Bevel exact/kernel/one History Undo/Redo and consuming drag completion; existing Slide rail/exact/drag completion, selected result; native Join/Weld/Delete, Create Face/Circle result modes/puck; Merge/Clean scope and history; existing Merge chronology/midpoint; numeric/readonly/mesh/mode guards; Add/Build arming/Done; nearby protected Face sessions.
- [x] Visible .710. Vertex inner Add/Build Edge/Bevel/Slide/Join/Weld/Create Face/Delete; outer Circle/Merge Center/Merge First/Merge Dist/Clean Vertices; centred Ã— preserves selection.
- [x] Bevel at3 o'clock in all modes. Face Knife next clockwise, Duplicate next, Extract outer. Edge Slide in previous Bevel position, Crease in previous Slide position.
- [x] Add/Build existing placement/navigation and top-centre Done end correctly; Add selects last created vertex, Build ready for next ordinary selection.
- [x] Vertex Bevel/Slide Pencil drag and top-centre numeric settings use existing behavior, commit once, exit cleanly; Cancel/Done/puck/fresh tap and Undo/Redo.
- [x] Join/Weld/Create Face/Delete/Circle normal results and mode handoffs; selected result/puck or fresh next tap; one Undo; genuinely loose Delete remains safe.
- [x] Merge Center/First midpoint/chronological-first placement/result puck, one Undo/Redo. Merge Dist affects only selected vertices at edited tolerance, Apply once/Cancel no change. Clean explicitly affects whole active object, Apply once/Cancel no change.
- [x] Disabled/read-only/context changes safe; long-press selection, protected Face blue Bevel preview, Edge tools and navigation remain intact. Collect refinements before Object. Earlier pending checks retained.


## v0.36.18.711 â€” complete Object Active Tools radial workflow

- [x] User .710 Vertex radial AWESOME / PASS: all13 tools, settings/lifecycle and Bevel consistency protected.
- [x] Automated: ten existing Object launcher targets, spaced inner/outer sectors, original docked nodes/restoration, all eight session clients, owner cancellation/handoffs, original Solidify/Array preview cleanup and unchanged source, one-shot completion, lock/reference/Multi/mode guards, protected Face/Vertex sessions (32 targeted PASS).
- [x] Full1181/897/284; no new failure names versus .710. Historical376 pin check now passes. Syntax/diff/protected owners PASS.
- [ ] Confirm visibly .711; Object centre opens all ten radial tools, Ã— returns gizmo.
- [ ] Solidify/Array original preview/gesture/settings/Apply/Cancel, top centre.
- [ ] Transform/Insert surface placement/tap-cycle and Symmetry plane settings/Align/Bisect Only, top centre, clean Apply/Cancel.
- [ ] Boolean operand selection/Swap/Union/Cut/Intersect/Close, one Undo/Redo, no stale suppression.
- [ ] Revolve Profile full editing/segments/Apply/Cancel; Mesh Health report/repair controls; Join/Clean existing results/history.
- [ ] Navigation and .682 Object finger/Pencil background dismissal/re-tap; Face/Edge/Vertex protected behavior.


## v0.36.18.712 â€” wide popouts / gizmo corner shortcuts

- [x] Screenshots visibly confirm .711 loaded; requested refinements, no full Object PASS.
- [x] 41 targeted: actual Symmetry/Array control identities/listeners; right action rail/staged Apply/hidden roots/lazy operands; all six shortcut actions/mode/disabled/busy guards; corner bounds/centre Move + Rotate wiring; full import/pin graph and nearby Object/Vertex/Face owners.
- [x] Full1190/906/284, identical failure names to clean .711; no new failures. Syntax/diff/protected modelling/multi-object-transform checks PASS.
- [ ] Visible .712; centre free Move and free Rotate ring, top-left radial in every mode, correct close/Bevel slot.
- [ ] Focus/Frame All, Undo/Redo corner shortcuts; Object Multi on/off/pressed state/additive object selection and transforms.
- [ ] Symmetry/Bisect + Array wide/shallow, all settings retained, right Cancel/Apply, original preview/Apply/Cancel/history.
- [ ] Other Face/Edge/Vertex settings wide and complete; blue Bevel/Shell/staged Sweep/repair/exact values retain clean completion/selection.
- [ ] Object Transform/Insert/Solidify/Revolve/Boolean complete controls/Cancel/Apply/history; navigation and .682 Pencil/finger background dismiss/re-tap protected.


## v0.36.18.713 â€” complete Edge Active Tools / shared radial positions

- [x] User .712 AWESOME PASS: wide top-centre popouts, centre transforms/corner shortcuts and additional Object tools protected.
- [x] Audit all nineteen existing Edge Active Tools; original owner actions, enabled states, kernel/history reused. 46 targeted PASS; full1195/911/284 with no new failure names versus .712.
- [x] Shared angular/tier positions match; Vertex outer spacing verified. .688 logical Loop Cut and .632 commit modules/pins untouched; protected multi-object-transform remains1.0.
- [ ] Confirm visibly .713. Edge ring includes all nineteen modelling tools; selection tools remain gesture-only.
- [ ] Loop: original tap/Pencil cut/slide feel, single/multiple Loops count, original Loop Slide value when available, top-centre Done exits and keeps work; next selection gets puck; Undo/Redo unchanged.
- [ ] Split: two non-adjacent edges on same face, repeat split, Done exits cleanly; bad pairs safe, navigation preserved.
- [ ] Sweep from closed Edge profile: top-centre Profile/Path/Finish, original settings/preview, Cancel preserves selection, Apply clean result; no stale suppression, next tap gets puck. Face Sweep regression.
- [ ] Uncrease, Circle, Flip Edge, Dissolve/Dissolve Loop/Delete: correct result, disabled unsafe cases, one Undo/Redo and selected puck/fresh next tap.
- [ ] Fill Face / Grid Fill / Join Coplanar hand result to Face puck; Collapse hands result to Vertex puck; Undo/Redo restores source/result safely.
- [ ] Protected Extrude/Bevel/Crease/Slide/Offset/Bridge still work with clean exits; all navigation/.682 Object behaviour unchanged.
- [ ] Circle outer top and Bevel inner right across Face/Edge/Vertex; Slide/Bridge/Sweep/Join Coplanar/Clean/Merge shared slots; Face Shell outer225 and expanded Vertex outer ring remain comfortable.


## v0.36.18.714 â€” Object List beside Multi

- [x] Original Objects node/actions retained; Focus owner reveals Objects only; toggle/previous disclosure/mode and Focus exit tested. Object-only shortcut/pressed/busy guards and nearby radial checks: 29 PASS.
- [x] Full1198/914/284, no new failure names versus .713. Protected modelling/transform/Loop owners unchanged; release/direct/helper/parent pins current.
- [x] Confirm visible .714; Object gizmo bottom-left has Object List icon beside Multi.
- [x] Focus View â†’ Object List: original list appears, Focus remains on and other drawer controls stay hidden; second tap hides list and icon unhighlights.
- [x] Use object rows/visibility/lock/rename and Multi in revealed list; original selection/gizmo and navigation preserved.
- [x] Leave Object mode or exit Focus: temporary reveal cleared; normal drawer behavior restored. Normal-view icon opens/closes Objects disclosure. .713 Edge checks remain pending.


## v0.36.18.715 â€” repeated Edge Loop / Bevel EXACT sessions

- [x] User .714 PASS: Object List/Multi/Focus toggle and exits protected; other .713 Edge checks remain pending.
- [x] 50 targeted PASS: real Loop commit owner preserves slider position/deferred radial release/one Undo/Redo, persistent session Exact mesh adoption; actual Edge bevel drag/exact repeats/current IDs/history/stationary selection/cancel rollback/navigation release; Face unchanged; shared EXACT action rail and nearby sessions.
- [x] Full1204/920/284, no new failure names versus .7141198/914/284. .688 topology/slide core and multi-object-transform untouched, shared/direct/parent/main/refresh pins current.
- [x] Visible .715; Loop placement/release enables Loop Slide instead of closing. Slider moves latest loop with trusted feel; EXACT finalizes but leaves panel/tool open.
- [x] Another edge adds another Loop with current placement retained; repeat single/multiple count. Background finger/Pencil tap closes cleanly and keeps work; orbit/pan/pinch/cancelled multi-touch do not close. Undo/Redo per cut.
- [x] Edge Bevel drag commits once and stays open/armed for another edge. Stationary edge tap selects for Width/Segments + EXACT; EXACT commits once, clears used IDs, stays ready. Repeat with no stale source IDs.
- [x] Background finger/Pencil tap closes Bevel and returns puck/fresh next tap. Cancelled drag restores source/selection/no history and navigation; unsupported selections safe.
- [x] Face blue Bevel preview/Apply/Cancel, non-radial Edge Bevel, Split Done, Object List/Multi, other protected navigation/tools unchanged.


## v0.36.18.716 â€” affected-only Face Bevel preview / compact Boolean

- [x] User .715 PASS: repeat Loop and Edge Bevel EXACT/drag/background exits protected. Screenshot .714 is Boolean layout reference.
- [x] 51 targeted PASS; real Face preview leaves remote shell normally shaded, unchanged source/history and disposal; existing Face/Edge sessions and original Boolean controls/lazy insertion/dock retained. Full1205/921/284, no new failure names versus .715.
- [ ] Confirm visible .716. Single/connected Face bevel: blue only on changed region; unchanged faces/other shells keep normal shading. Width/Segments/Pencil/Apply/Cancel and Undo/Redo unchanged.
- [ ] Object Boolean: compact A/B/Swap top, Union/Cut/Intersect below, Close right; names/counts, disabled states, Multi/Swap/results/one Undo/Close work.
- [ ] .715 repeated Edge Loop/Bevel and .714 Object List/Focus remain intact.


## v0.36.18.717 â€” Multi first-object gizmo / radial Boolean access

- [x] Actual ordered selection/first-object live anchor/removal/empty selection tested; shared nearest-visible scene hit and Pencil semantic background guard tested. 33 targeted PASS; full1210/926/284, no new failure names versus .716. Protected Multi transform1.0 untouched.
- [ ] Confirm visible .717. Select first Object â†’ Multi â†’ add two others using finger/Pencil: gizmo and radial shortcut remain on first object, not group midpoint; adding/removing later operands retains access.
- [ ] From gizmo radial open Boolean: original Multi operands/Swap/Union/Cut/Intersect/Close, clean selection/result and one Undo/Redo. Compact .716 A/B/Swap above operations and Close right.
- [ ] Remove anchor via Object List: next surviving selected object owns presentation; empty Multi hides gizmo. Focus List toggle and original Multi Move/Rotate/Scale/pivot behavior unchanged.
- [ ] Genuine background finger/Pencil tap dismisses gizmo but retains selection; object tap restores. Orbit/pan/pinch preserve selections. .716 affected-only Face Bevel preview/Apply/Cancel and .715 Edge repeat sessions unchanged.


## v0.36.18.718 â€” viewport Multi repair / icons / Snap / Lasso / Invert

- [x] User reports .717 viewport Multi FAIL, Object Browser works; protected .715 still passed. No .716/.717 PASS inferred.
- [x] 61 targeted PASS; full1215/932/283, no new failure names. Existing authoritative owner early Multi/touch release/navigation/cancel guards, shared icons/original controls/listeners, lazy Lasso, seeded Invert context rejection and protected nearby Face/Edge/Object tested. Multi transform1.0 and modelling kernels untouched.
- [ ] Confirm visible .718. First Object â†’ Multi â†’ finger/Pencil add/remove other viewport objects; gizmo stays at first surviving selected object. Radial Boolean operands/Swap/results/Close/Undo; Object List still works in Focus.
- [ ] Top Undo/Redo/Frame All/Focus icons match gizmo, have hover tooltips; Focus icon remains after toggle, VIEW menu complete.
- [ ] SNAP above unchanged mode buttons: RGB Axis and GEO dot/line/face icons toggle original snapping with active state/tooltips. Lasso icon toggles actual owner in Face/Edge/Vertex/Object; Pencil draws, finger navigation, correct original depth behavior.
- [ ] Single component background tap clears; double nearby tap inverts ORIGINAL pre-first-tap set, using finger/Pencil/mouse. Object single tap retains actual selection/dismisses gizmo, double complements visible objects. No history entries; mode/mesh/selection changes or distant/late taps cannot invert stale set.
- [ ] Orbit/pan/pinch/two-finger Undo/three-finger Redo cancel tap intents and preserve selections; selected object re-tap restores gizmo; protected Multi Move/Rotate/Scale/pivots and Lasso do not compete.
- [ ] .715 Loop/Edge Bevel EXACT-repeat/background exits and .716 affected-only Face blue preview/compact Boolean retain correct completion/history.

## v0.36.18.719 â€” Lasso cancellation / double-background Invert refinement

- [x] Actual main owner: semantic + canvas delivery counts once per physical release in component/Object modes; second release inverts original seed once and does not clear the result.
- [x] Actual Lasso owner: stationary background completion after capture release; current drawing, mesh taps, drawn-away-and-return path and pointercancel do not trigger cancellation. Main retains session exclusions and navigation reset.
- [x] Full1219/936/283; same failure names as clean .7181215/932/283. Protected Multi transform1.0, Loop kernels, frozen betas untouched.
- [ ] Confirm visible .719. Arm Lasso/select components â†’ single background finger/Pencil tap clears selection and turns off Lasso; next tap selects normally. Object tap retains the protected Object-selection contract while turning off Lasso.
- [ ] Face/Edge/Vertex: select a few components â†’ double nearby background tap with finger/Pencil inverts the ORIGINAL selection; single tap clears immediately. Object double-background tap complements visible-object selection once.
- [ ] Lasso drawn selection/depth and finger navigation remain functional; drawn-away-and-return/cancelled paths do not disarm. Orbit/pan/pinch are not taps; two-finger Undo/three-finger Redo stay unchanged.
- [ ] Viewport Multi add/remove and Boolean, .715 Loop/Bevel repeat/background exits and .716 blue Face preview remain intact. Prior pending checks retained; no manual PASS inferred.

## v0.36.18.720 â€” Edge/Lasso completion / native double-tap timing

- [x] Actual Edge Paint owner yields to Lasso, including pending paint, without consuming Lasso move/end; no second raw-pointer owner.
- [x] Actual main window background owner clears Edge selection/disarms Lasso without canvas delivery; duplicate semantic native release cannot clear/invert twice; next same-pointer release accepted without timer expiry.
- [x] Native timestamps tolerate delayed callbacks and invert within500ms/32px; later/negative/context-changing taps do not invert stale seeds. Navigation, cancel, secondary-contact and long main-owner hold excluded.
- [x] Lasso idle-main-tool disarm and busy guard; original semantic timestamp propagation. Protected Face blue Bevel, contextual background Done and nearby ownership checks: 38 targeted PASS.
- [x] Full1226/943/283, same failure names as .7191219/936/283; protected Multi transform/Loop/frozen betas unchanged.
- [ ] Visible .720: Edge selection â†’ Lasso â†’ background finger/Pencil tap clears selection and turns Lasso off; next ordinary edge tap selects normally.
- [ ] Normal quick double-background taps invert original Edge/Face/Vertex selection once (500ms release interval); single tap clears immediately. Object complement follows original visible-object selection contract.
- [ ] Lasso draws correctly starting over edges or empty space; finger orbit/pan/pinch retain selection, cancelled draws do not disarm. Viewport Multi/Boolean and two-finger Undo/three-finger Redo preserved.
- [ ] .715 repeat Loop/Bevel sessions and .716 Face blue-preview/Apply/Cancel remain intact. If background failure persists, capture Gesture Debug BACKGROUND TAP DOWN/BLOCKED/COMPLETE entries; do not stack speculative gesture owners.

## v0.36.18.721 â€” original Modifiers access / Invert diagnosis

- [x] User .720 checks1/3 PASS: Edge background clear/Lasso disarm, Lasso drawing and finger navigation; preserve. Pencil draws while Lasso armed, fingers navigate: expected. Slight hit tightening deferred to final perfection MUCH LATER.
- [x] User .720 check2 FAIL: double-background Invert. .721 adds diagnostics only; do not mark behavior fixed/passed.
- [x] Actual Object List Focus owner reveals original Objects + Modifiers, Modifiers closed each opening; Focus/mode exits restore previous disclosure states. Normal-view opening also collapses Modifiers. Original nodes/owners retained.
- [x] Existing matcher trace reports rejection/reset reasons and dt/px/counts without altering results.21 targeted PASS; full1228/945/283, no new failure names versus .7201226/943/283.
- [ ] Visible .721, Focus â†’ Object List: original Objects and collapsed Modifiers below. Expand and use Mirror/SubD/Cage; same controls and behavior. Reopen starts collapsed; list closes/Focus remains active; mode/Focus exits restore prior normal drawer state.
- [ ] VIEW â†’ Gesture Debug: select some Edge/Face components, double-tap true background once and screenshot BACKGROUND DOUBLE TAP / COMPLETE entries. Diagnose actual rejection before next gesture fix.


## v0.36.18.722 â€” readable background-tap evidence

- [x] Background entries stay pinned through 1500 hover/move/unrelated logs; bounded to six, clear/disable/re-enable reset, actual contact/routing logs retained. 8 targeted PASS.
- [x] Full1231/948/283; same failure names as .721. Gesture/matcher/modelling owners unchanged.
- [ ] Visible .722 â†’ VIEW Gesture Debug â†’ select two edges â†’ two quick taps on true background with ONE finger. Screenshot blue BACKGROUND section immediately; repeat separately with Pencil. Invert remains unresolved until evidence identifies rejection.
- [ ] Confirm original Modifiers under Object List collapsed on opening and original actions work; previous .721 checks remain pending.


## v0.36.18.723 â€” physical contacts alongside tap decisions

- [x] Passive window observer records viewport down/up/cancel with native timing/coordinates, never consumes events; ignores nonviewport and disabled debug. Four amber records bounded/reset separately from blue tap decisions.10 targeted PASS.
- [x] Full1233/950/283 vs clean .7221231/948/283: identical failure names; actual gesture/matcher owners untouched.
- [ ] Visible .723 â†’ enable Gesture Debug â†’ select two components â†’ two quick screen taps on blank background. Immediately screenshot amber physical contacts AND blue decisions. Try finger/Pencil separately; diagnose delivery/reset before changing matcher.
- [ ] Original Modifiers under Objects remains closed on opening and actions work; prior pending checks retained.


## v0.36.18.724 â€” background hold Invert (supersedes double-tap checks)

- [x] Existing owner500ms hold complements current component/Object set once. Both native/semantic release orders retain result and Lasso; quick taps clear, never invert.24 targeted PASS.
- [x] Movement/secondary contact/cancel/context/mesh/selection/session/blur guards; actual Pencil contact required. Nearby Lasso/Edge Paint/tool background completion retained. Full1237/954/283, identical failure names to .723. Protected owners unchanged.
- [ ] Face/Edge/Vertex select some â†’ short background tap clears and Lasso off; select again â†’ stationary hold about half a second inverts once, release retains. Finger and Pencil separately. Double tap no longer inverts.
- [ ] Arm Lasso â†’ stationary background hold inverts and keeps Lasso armed; release retains result; subsequent drawing still works. Short background tap exits Lasso.
- [ ] Background drag/orbit, two-finger pan/pinch cancel hold without inversion; two-finger Undo/three-finger Redo retain behavior. Active modelling sessions keep original background Done/exit semantics.
- [ ] Object hold complements visible objects using original owner; original Modifiers collapsed below Objects remains accessible.


## v0.36.18.725 â€” GEO icon / .724 baseline PASS

- [x] User .724 PERFECT/PASS: background tap/hold behavior accepted and protected. Double-tap remains retired.
- [x] Existing viewport control tests5 PASS; original snap checkbox/listeners/labels retained. Syntax/diff and child/parent cache pins checked.
- [ ] Visible .725: GEO clearly reads dot / line / face beside Axis; toggle retains active highlight and original geometry snapping. Tooltip still describes vertices, edges and faces.


## v0.36.18.726 â€” VIEW Object List access without selection

- [x] Original list/disclosure owner reused without selection/gizmo. Component mode routes through original Object button; busy/missing owner guards, menu closes only on success, iPad pointerup+synthetic click fires once.12 targeted PASS.
- [x] Full1240/957/283 vs clean .7251237/954/283: identical failure names. Passed .724 gesture/main and protected modelling unchanged.
- [ ] Focus, Object mode, empty selection: VIEW â†’ Object List opens original Objects with collapsed Modifiers underneath. Close/reopen works; original row selection/management and Mirror/SubD/Cage controls work.
- [ ] Face mode â†’ VIEW Object List enters Object mode once and opens same panels. Mouse/finger/Pencil activation works; active tool session remains protected.
- [ ] .725 GEO visual/toggle and earlier pending radial/session checks retained; .724 tap/hold PASS stays protected.


## v0.36.18.727 â€” selection depth in viewport strip

- [x] User .726 PASS: VIEW Object List access/reopen accepted; preserve.
- [x] Original Visible/Through group/buttons/listeners retained after move; scoped layout and child/parent pins verified.27 targeted PASS with nearby Lasso/hold/Edge Paint/list owners. Full .726 baseline1240/957/283 retained.
- [ ] Normal and Focus: Visible/Through sits beside Lasso above modes. Toggle active state; Lasso/paint respects original visible-only vs through behavior on overlapping/front/back geometry.
- [ ] Changing mode or Focus retains depth choice. Lasso drawing/finger navigation and passed background tap/hold still work; viewport strip fits without covering mode bar.


## v0.36.18.728 â€” selection-access batch (manual pending)
- Normal and Focus: SELECT opens/closes bounded top-centre panel; Escape and background close it; viewport gesture still works.
- Vertex/Edge/Face: original All/Deselect/Invert, Grow/Shrink/Connected; Edge Loop/Ring/Boundary; Face Angle/Normal threshold and alignment still act on existing selection.
- Object: original Multi/All/Clear/count, Hide/Show and Lock/Unlock update correctly; switch modes and reopen for correct contextual controls.
- Visible/Through, Lasso, .724 short-tap clear/disarm and 500ms hold Invert/retained release; finger navigation/history stay protected.
- Automated:27 targeted PASS; full1244/960/284 vs fresh .7271240/956/284, identical failures. Four new panel/owner tests pass.


## v0.36.18.729 â€” radial/session polish (device checks pending)
- [x] 62 focused tests pass across all four modes, original controls/stages, real nearby owners and new context/drag/exit cases. Full1259/976/283; no new failures vs fresh .7281244/960/284, old loader-pin fixture repaired. Broader112/108/4 existing failures retained.
- [ ] Face: Extrude/Inset Exact and Repeat remain available after operations; Done/background exits cleanly. Bevel/Shell/Sweep Cancel/Apply retains expected selection/puck, original blue-preview navigation.
- [ ] Vertex: Bevel/Slide and Merge/Clean settings/exits remain top-centre and return to selection/puck. No accidental Apply when input unavailable; original Add/Build Edge still exit cleanly.
- [ ] Object: Array/Solidify Cancel then Apply; Boolean Close/operation and one Undo; original full gizmo returns. Symmetry/Revolve retain their plane gizmos and staged Apply visibility.
- [ ] Edge: Slide/Offset exact or drag exits to puck; Crease strength/Uncrease/Done is one Undo. Switch tool/object/mode with settings open: old panel/selection never returns. Loop/Bevel EXACT remains repeatable; background exits; Split Done keeps completed edits.
- [ ] .728 SELECT in normal/Focus and original depth/Lasso; .724 finger/Pencil short tap and500ms hold, orbit/pan/pinch/two-finger Undo/three-finger Redo protected.
- [x] Crease history entry belongs to original owner on FIRST successful preview; Done adds none. Do not defer push across object history-stack swaps or rely only on mesh/reference identity.


## v0.36.18.730 â€” compact UI and Beta6 release-candidate checks
- [x] Visible/Through intentionally removed from UI; original depth host hidden internally. Lasso/SELECT retained. Supersedes .727 depth relocation and fixed720px popout requirements.
- [x] 53 focused PASS; real exact transform Undo/Redo, indexed export channels/morph/import-fit and actual Extract owner covered. All279 src modules syntax-pass. Full1265/982/283 vs .7291259/976/283, identical failure names. Historical RC113/97/16 limitations documented.
- [ ] Normal/Focus: Lasso and SELECT visible, no Visible/Through. SELECT component/Object controls and close work; original Lasso/tap/hold/navigation behavior retained.
- [ ] Sparse popouts fit content with no outer padding; larger Array/Sweep/Boolean settings stay bounded, scrollable, with original stage/Apply/Cancel visibility. Exact fields and notes remain readable.
- [ ] Extract one/two faces, then all faces: new object created, expected source retention/removal, one scene Undo/Redo, Facegroups retained.
- [ ] Move/Rotate/Scale numeric values, Object Multi/Boolean single Undo, orbit/pan/pinch and two-/three-finger history gestures on iPad/Pencil.
- [ ] Export/Save GLB to Files then Nomad; reimport unchanged file: object count, welded geometry, Facegroups, original scale/position and eligible UV/material/morph channels retained. External Nomad app cannot be validated in cloud browser.


## .731 pre-finalization tool checks (device acceptance pending)

- [ ] Face Sweep and closed Edge-loop Sweep open one top-centre Profile/Path/Finish popup; Follow Edges / Draw Path and original Apply/Cancel work, no second editor.
- [ ] Edge Slide stays armed after direct drag and exact Apply for further slides; Done or a short background finger/Pencil tap ends it and returns surviving selection/puck. Background hold must not invert during Slide.
- [ ] Edge Bevel Width/Segments show blue candidate without editing source/history; Apply Bevel commits once; Cancel/background removes ghost; existing in-window/Pencil direct bevel still commits on release and supports repeats.
- [ ] Vertex Bevel Width/exact shows blue candidate; Apply commits once and closes; Cancel retains original geometry/selection; existing in-window/Pencil direct bevel still works. Vertex has Width only, no invented Segments control.
- [ ] Bevel preview never overwrites source after geometry/active-object/mode/lock changes; preview resources dispose on exit; Undo/Redo each committed operation once.
- [ ] Protected Face Bevel blue preview/Apply/Cancel, navigation, Lasso/shorttap/500ms hold, compact panels and Object Multi remain intact.


## v0.36.18.732 â€” grouped iPad checks (awaiting device PASS)

.731 user PASS recorded. Automated:133 focused pass; full1285/1008/277, no new
failure names versus .731; all280 module syntax pass. No .732 device PASS inferred.

1. Open Split and several sparse/larger tool popups in normal and Focus view:
   small comfortable edge packing, variable width, legible hint and reachable actions.
2. Split an edge, then background-tap: tool closes, split and selection remain;
   Undo/Redo restores the edit. Repeat with Knife/Align/Slide/Bevel and idle preview
   Cancel. Orbit/pan must not close a tool; Vertex Add still places a floating vertex.
3. Array: Y puts END above source; X/Z place on their axes. Drag END on each axis,
   change Count, Cancel (source unchanged), Apply then one scene Undo/Redo. Free
   shows XYZ arrows; body drags freely and arrow drag changes only that coordinate.
4. Extrude then open Inset: no Repeat Extrude/Bevel label in Inset. Complete an
   inset: Repeat Inset enables and replays its distance on another Face. Done and
   background close preserve committed edits and original selection/history behavior.
5. Verify top icons Frame All / Undo / Redo / Focus / Object Browser / VIEW. Open
   browser from Face and empty Object selection, list appears on right under icons;
   original object selection/management work; Modifiers starts closed and expands.
   Close/reopen, change mode, and test normal/Focus layout and scrolling.
6. Protected regression: Pencil lasso + finger orbit/pan/pinch, short background
   deselect/Lasso-off, stationary long-hold invert, two-/three-finger Undo/Redo,
   Loop Cut, Multi Move/Rotate/Scale, .731 Sweep and Bevel previews.

Background policy/exceptions and owner audit are recorded in AI_HANDOFF.md.

## .733 â€” Focus launch and Beta 6 final smoke

User PASS .732 recorded. 44 focused pass; full1287/1010/277, same failure names
as .732. Focus starts on each new launch; icon active/aria-pressed true and bright.
Test toggle shows left tool list and removes active state, toggle again hides it;
original icon, right browser and Modifiers remain functional in both views.
Remaining final device gates: Focus check, short navigation/history/Multi/Boolean/
Extract smoke, and Filesâ†’Nomadâ†’BoxLab GLB round-trip. Then freeze/publish Beta6;
see BETA_6_RELEASE_CHECKLIST.md. No device PASS inferred for .733.

## .734 â€” component-gizmo Align regression

106 focused pass; full1292/1015/277, no new failure names vs .733; all280 syntax pass.
- Vertex: select two or more vertices, tap point Align icon, choose X/Y/Z, then
  tap the selected vertex that stays fixed. Other selected vertices align on that
  coordinate. Gizmo hides during anchor picking and returns after apply. Undo/Redo.
- Edge: repeat with two or more edges and line Align icon. Fixed edge endpoints
  unchanged; other selected vertices use original anchor-coordinate alignment.
- Face: face icon opens X/Y/Z and Align to Face; radial no longer contains Align.
  Existing arbitrary-plane option keeps anchor unchanged and rejects invalid groups.
- Cancel/background retain selection, mode/object changes cancel stale session;
  icon is unavailable with insufficient selection or during drag; Object Multi stays.
- Launch Focus still armed; browser and navigation/history regressions unchanged.
Device acceptance pending; no inferred .733/.734 PASS or Beta6 freeze.

## .735 â€” axis colours and native NOMAD handoff

.734 user PASS. 51 focused pass; full1301/1024/277, no new failurÛŸzã–òµë(š+myÑÉ½±ÌÙ¥Í¥‰±”¸(´mátUÍ•ÈàØÜAMLA•¹¥°½™¥¹•È‘É…œÁ…¹ÌìÁ¥¹ é½½µÌì¥ÐÉ•ÍÑ½É•Ìì‰ÕÑÑ½¹ÌÉ•µ…¥¸Ñ…ÁÁ…‰±”¸(´mátUÍ•ÈàØÜAMLI½Ñ…Ñ”½±¥ÀT½XƒŠHÑ½½±‰…È…¹ÑÝ¼´½Ñ¡É•”µ™¥¹•ÈU¹‘¼½I•‘¼É•ÍÑ½É”•á…Ð±…å½ÕÐ¸(´mátUÍ•ÈàØÜAML	…¬Ñ¼€Í•¹‘ÌÍ•ÍÍ¥½¸ì½É¥¥¹…°½É‰¥Ð½Á…¸½Á¥¹ ½Í•±•Ñ¥½¸Ý½É¬ìÉ•½Á•¸É•µ…¥¹Ì±•…¸¸(´lt¥±”9=5	…Í”…™Ñ•ÈUX•‘¥ÑÌÉ•Ñ…¥¹Ì±…å½ÕÐ½Í•…µÌ¥¸9½µ…ìM…Ù”½=Á•¸É•Ñ…¥¹ÌUYÌ¸()%Í±…¹Á¥­¥¹œ½ÑÉ…¹Í™½ÉµÌ…¹Õ¹ÝÉ…À½Á…¥¹Ñ¥¹œ…É”¹½Ð¥µÁ±•µ•¹Ñ•¥¸àØÜ¸]½É­ÍÁ…”‘•Ù¥”AML¥ÌÉ•½É‘•…‰½Ù”ì¹•ÜàØàÍ•±•Ñ¥½¸…Ñ”É•µ…¥¹ÌÍ•Á…É…Ñ”¸(((ŒŒ€¸àØÜÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•€¼ÕÍ•ÈAMLƒŠP€ÈÀÈØ´ÄÀ´ÄÔ()I•±•…Í”ÝˆÐÍ…ŒÔÌÄÍ™˜ÀÅ”ÉˆÍ…‘™ŒÐÕˆàÉ™ŒÜÔáääÄØìÑÉ•”(ÈÄÝ••„á„ÜÍ„ÁÍÌÐàá™ŒØÀÅ…ˆÙˆÐÉˆá…˜É˜¸9½‘”ÈÈ$ÌàØÜÜÜÔÜäÀÄ€¼)©½ˆÄÄØÈÌÔÄÌÄÀÌÜMUMLÈÌÌÉAML¼Á%0¼ÁÍ­¥ÀìA…•ÌÌàØÜÜÜÔÜÈÔÀMUML¸)1¥Ù”Í¡•±°½Ù•ÉÍ¥½¸½Ý½É­ÍÁ…”àØÜ½¹…Ù¥…Ñ¥½¸àØÜ‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä‰•™½É”àØà¡…¹•Ì¸)UÍ•È]½É­ÌÝ•±°AML…•ÁÑÌ±…É”Ý½É­ÍÁ…”°¹…Ù¥…Ñ¥½¸…¹Í•ÍÍ¥½¸•á¥ÐìÁÉ½Ñ•Ð)Í…µ”…¹Ù…Ì½½¹ÑÉ½±Ì½¡¥ÍÑ½Éä…¹±•…¸	…¬Ñ¼Í¸9…Ñ¥Ù”àØÔ…¹àØØÁÉ½Ñ•Ñ¥½¹ÌÉ•Ñ…¥¹•¸((ŒŒ€¸àØàUX¥Í±…¹Í•±•Ñ¥½¸ƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄÔ((´mátÕ±°9½‘”ÈÐèÈÌÌÝAML¼Á%0¼ÁÍ­¥Àì™¥Ù”¹…Ñ¥Ù”Í•±•Ñ¥½¸É•É•ÍÍ¥½¹Ì¸(´mát=É¥¥¹…°¥Í±…¹%Ì…¹Í¡…É•É•¹‘•É•È½Á¥­•Èµ…ÁÁ¥¹œ…™Ñ•Èé½½´½Á…¸ìUX‘…Ñ„Õ¹¡…¹•¸(´mát½¹Ñ¥¹Õ½ÕÌ½ÍÑ…­•½‰½Õ¹‘…Éä½½¹…Ù”½±¥µ¥Ñ•½ÍÑ…±”Á¥­¥¹œìÑ½Áµ½ÍÐÍÑ…­•¥Í±…¹½¹±ä¸(´mátM¥¹±”Á•¸½™¥¹•È½µ½ÕÍ”Í¡½ÉÐÑ…ÀÍ•±•ÑÌì‘É…œ½±½¹œ½…¹•°½µÕ±Ñ¥Ñ½Õ ¹•Ù•ÈÁ¥­Ì¸(´mát½±¡¥¡±¥¡Ð°±•…È½•µÁÑäÑ…À°É•Á½ÉÐÉ•™É•Í ½¡¥ÍÑ½Éä½±½Í”É•Í•ÑÌì¥ÐÉ•Ñ…¥¹ÌÍ•±•Ñ¥½¸¸(´mát9…Ñ¥Ù”•‘¥Ð½¡¥ÍÑ½Éä½•áÁ½ÉÐ½Ý¹•ÉÌÕ¹¡…¹•ìI½Ñ…Ñ”½±¥À±•…É±ä…™™•ÐÝ¡½±”±…å½ÕÐ¸(´mátUÍ•ÈàØàAML¥A…Ñ…ÀÍ•Á…É…Ñ”¥Í±…¹‘ÌèÍ•±•Ñ•¥Í±…¹¡¥¡±¥¡ÑÌ…¹¹Õµ‰•ÈÕÁ‘…Ñ•Ì¸(´mátUÍ•ÈàØàAMLA…¸½Á¥¹ °Ñ¡•¸Ñ…À…¸¥Í±…¹è¡¥¡±¥¡Ð™½±±½ÝÌÑ¡”Ù¥Í¥‰±”¥Í±…¹ì¥ÐÍÑ¥±°Ý½É­Ì¸(´mátUÍ•ÈàØàAML±•…ÈM•±•Ñ¥½¸…¹•µÁÑäÑ…À±•…Èì±½Í”½É•½Á•¸ÍÑ…ÉÑÌÝ¥Ñ ¹¼Í•±•Ñ¥½¸¸(´mátUÍ•ÈàØàAMLQÝ¼´½Ñ¡É•”µ™¥¹•ÈU¹‘¼½I•‘¼…¹	…¬Ñ¼ÍÉ•Ñ…¥¸…•ÁÑ•àØÜ‰•¡…Ù¥½ÕÈ¸()=¹±äÁÉ•Ù¥•Ý•™…•Ì…É”Á¥­…‰±”ìÍÑ…­•¥Í±…¹‘Ì¡½½Í”Ñ½Áµ½ÍÐ¸M•±•Ñ•µ¥Í±…¹)ÑÉ…¹Í™½ÉµÌ°Õ¹ÝÉ…À…¹Á…¥¹Ñ¥¹œ…É”™ÕÑÕÉ”Ý½É¬¸M•±•Ñ¥½¸É•…Ñ•Ì¹¼U¹‘¼¡•­Á½¥¹Ð¸((ŒŒ€¸àØàÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÔ()I•±•…Í”äàÑŒÌÌÈØÕ…‰ŒÌÄÄá•ˆäÜàÄÈÅ‘…ŒäÄÜÌÝŒá…ŒÈÜÉŒìÑ•ÍÑ•ÑÉ•”)••‰™„ÀÀÙŒäÀØÜÜÉˆÁ™ˆàÜÜÍ”Å‘å™”ÔÔÐÅ™‰•„Ä•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)9½‘”ÈÈ$ÌàØäØÐÜàÀäØ½©½ˆÄÄØÈäÐÀäÜÌÈàMUMLÈÌÌÝAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌàØäØÐÜÜÔääMUML¸1¥Ù”Í¡•±°½Ù•ÉÍ¥½¸½5•Í¡!•…±Ñ ½Ý½É­ÍÁ…”½¹…Ù¥…Ñ¥½¸¼)¥¹ÍÁ•Ñ½È½•‘¥ÐàØà°Õ¹¡…¹•¹…Ñ¥Ù”àØÔ°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„Üµ…É­•È)‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸UÍ•ÈàØÜAMLÁÉ½Ñ•Ñ•ìàØà¥Í±…¹Í•±•Ñ¥½¸‘•Ù¥”…Ñ”)Á•¹‘¥¹œ¸9¼Í•±•Ñ•µ¥Í±…¹ÑÉ…¹Í™½ÉµÌ½È¹•ÜUX½¡¥ÍÑ½Éä½É•Í½ÕÉ”½•áÁ½ÉÐÍ¡•µ„¸(((ŒŒ€¸àØäÍ•±•Ñ•µ¥Í±…¹•‘¥ÑÌƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mátUÍ•ÈàØàAMLÁÉ½Ñ•Ñ•èÍ•±•Ñ¥½¸½¡¥¡±¥¡Ð½±•…È½¹…Ù¥…Ñ¥½¸½¡¥ÍÑ½Éä½Í•ÍÍ¥½¸•á¥Ð¸(´mátÕ±°9½‘”ÈÐèÈÌÐÅAML¼Á%0¼ÁÍ­¥Àì™½ÕÈ¹…Ñ¥Ù”Í•±•Ñ•µ•‘¥ÐÉ•É•ÍÍ¥½¹Ì¸(´mát=É¥¥¹…°¥¹ÍÁ•Ñ½È™Õ±°µ™…”½¹¹•Ñ¥Ù¥Ñä€¡¥¹±Õ‘¥¹œ‰•å½¹ÁÉ•Ù¥•Ü¤ìÍ•±•Ñ•Á¥Ù½Ð…Ð¥Í±…¹‰½Õ¹‘Ì•¹ÑÉ”¸(´mátá¥ÍÑ¥¹œUX•‘¥ÐÑÉ…¹Í…Ñ¥½¸½¹…Ñ¥Ù”¡¥ÍÑ½Éä½É•Í½ÕÉ”½Áäµ½¸µÝÉ¥Ñ”ì½Ñ¡•È¥Í±…¹‘Ì½Á••ÉÌ½•½µ•ÑÉäÕ¹¡…¹•¸(´mát9…Ñ¥Ù”ÁÉ½©•Ð½9=4UX‰åÑ•Ì½1•áÁ½ÉÐ°¹¼ÍÑ…±”Ñ…¹•¹ÑÌìÍÑ…±”Í½Á”½Ñ½Á½±½ä½¥¹‘•à½½¹Ñ•áÐ½½Ù•É™±½ÜÉ•™ÕÍ”¸(´mátM•±•Ñ¥½¸ÍÕÉÙ¥Ù•Ì½¹±äµ…Ñ¡¥¹œ™Õ±°µ•µ‰•ÉÍ¡¥À…™Ñ•È•‘¥Ðì¡¥ÍÑ½Éä½±½Í”½É•™É•Í ±•…ÉÌì½É¥¥¹…°Ý¡½±”µ±…å½ÕÐµ…Ñ¡ÌÉ•Ñ…¥¹•¸(´mátUÍ•ÈàØäAMLM•±•Ð¥Í±…¹ƒŠHI½Ñ…Ñ”äÃ
À€¼±¥ÀT€¼±¥ÀXè½¹±äÑ¡…Ð¥Í±…¹¡…¹•Ì°…‰½ÕÐ¥ÑÌ½Ý¸•¹ÑÉ”¸(´mátUÍ•ÈàØäAMLI•Á•…ÐÍ…µ”™±¥ÀÑÝ¥”ìÍ•±•Ñ•¡¥¡±¥¡ÐÉ•µ…¥¹ÌìU¹‘¼½I•‘¼É•ÍÑ½É•Ì½¹”½Á•É…Ñ¥½¸…Ð„Ñ¥µ”¸(´mátUÍ•ÈàØäAML±•…ÈM•±•Ñ¥½¸ƒŠH‰ÕÑÑ½¹Ì…™™•ÐÝ¡½±”±…å½ÕÐìÁ…¸½Á¥¹ ½¥Ð…¹	…¬Ñ¼ÍÉ•Ñ…¥¸àØà‰•¡…Ù¥½È¸(´mátUÍ•ÈàØäAMLM…Ù”½=Á•¸€¹‰½á±…ˆ…¹¥±”9=5	…Í”ÁÉ•Í•ÉÙ”•‘¥Ñ•±…å½ÕÐ½Í•…µÌ¥¸9½µ…¸()9¼¥Í±…¹5½Ù”½M…±”½Õ¹ÝÉ…À½Á…¥¹Ñ¥¹œå•Ð¸UÍ•ÈàØäAML¥ÌÁÉ½Ñ•Ñ•ìàÜÀ¡…Ì„Í•Á…É…Ñ”‘•Ù¥”…Ñ”¸((ŒŒŒ€¸àØä™¥¹…°Í½Á”µ±…‰•°½ÉÉ•Ñ¥½¸()¥¹…°Í½ÕÉ”É•Ù¥•Ü…Õ¡Ð„Ñ•áÐÉ•Á±…•µ•¹Ð…±Í¼¡…¹¥¹œÑ¡”¹¼µÍ•±•Ñ¥½¸±…‰•°ì)Ý¡½±”µ±…å½ÕÐµ…Ñ¡ÌÍÑ…å•½ÉÉ•Ð¸I•ÍÑ½É”•áÁ±¥¥ÐÝ¡½±”µ±…å½ÕÐ±…‰•°Ý¡•¸±•…É•°)…‘…ÑÕ…°Ý½É­ÍÁ…”…ÍÍ•ÉÑ¥½¹Ì…Ð½Á•¸½±•…È…¹É•™É•Í ½¹±ä5•Í¡!•…±Ñ ½Ý½É­ÍÁ…”)…¡”­•åÌÑ¼àØä¸Ä€¡Í¡•±°½Ù•ÉÍ¥½¸àØäì¥¹Ñ•É¹…°5•Í¡!•…±Ñ ÍÑ…µÀàØä¤¸9¼¹•ÜÕÍ•ÈAML¸((ŒŒ€¸àØäÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÔ()¥¹…°É•±•…Í”ÌÄÉ”ÀÌÁäÕ‰ÔàÉ‘ØÐÅˆÄàÌÕ‰„ÄÍ˜ÜÝ•˜äÍ”ÜÐìÑ•ÍÑ•ÑÉ•”)ˆÜÉ˜ÄàÉŒÐÑ˜Å™‰˜ØÅØàÙ”Ñ‘‰˜å•……˜á˜ÜÐäÜÀµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸9½‘”ÈÈ$(ÌàÜÈÐØÈÄÐÀÔ½©½ˆÄÄØÌàÜÈàÐÐàÀMUMLÈÌÐÅAML¼Á%0¼ÁÍ­¥ÀìA…•ÌÌàÜÈÐØÈÄÌÌÄ)MUML¸1¥Ù”Í¡•±°½Ù•ÉÍ¥½¸àØä°5•Í¡!•…±Ñ ½Ý½É­ÍÁ…”àØä¸Ä°•‘¥Ð½¥¹ÍÁ•Ñ½ÈàØä°)¹…ØàØà½¹…Ñ¥Ù”àØÔ½ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸)¥¹…°±…‰•°½ÉÉ•Ñ¥½¸¥¹±Õ‘•ìàØàÕÍ•ÈAMLÁÉ½Ñ•Ñ•¸àØäÍ•±•Ñ•µ¥Í±…¹•‘¥Ð°)U¹‘½I•‘¼…¹ÁÉ½©•Ð½¹…Ñ¥Ù”9½µ…‘•Ù¥”…Ñ”Á•¹‘¥¹œ¸I•Á•…Ñ•€½¹•áÑ‰Õ¥±‘ÕÉ¥¹œ)ÁÕ‰±¥…Ñ¥½¸½¹Ñ¥¹Õ•Ñ¡”…Ñ¥Ù”É•±•…Í”ì¹¼àØäAML½È±…Ñ•È‰Õ¥±¥Ì¥¹™•ÉÉ•¸(((ŒŒ€¸àÜÀÍ•±•Ñ•µ¥Í±…¹¹Õµ•É¥Œ5½Ù”€¼M…±”ƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mátUÍ•ÈàØäAMLÁÉ½Ñ•Ñ•ìÍ•±•Ñ•½Ý¡½±”I½Ñ…Ñ”½±¥À…¹¹…Ñ¥Ù”UXÉ½Õ¹‘ÑÉ¥ÀÉ•Ñ…¥¹•¸(´mátÕ±°9½‘”ÈÐèÈÌÐÕAML¼Á%0¼ÁÍ­¥Àì™½ÕÈ¹…Ñ¥Ù”¹Õµ•É¥ŒÉ•É•ÍÍ¥½¹Ì¸(´mátM•±•Ñ•µ½¹±ä5½Ù”¡T±X¤½Õ¹¥™½É´Á½Í¥Ñ¥Ù”M…±”…É½Õ¹¥Í±…¹•¹ÑÉ”ì½É¥¥¹…°ÑÉ…¹Í…Ñ¥½¸½¡¥ÍÑ½Éä½Õ…É‘Ì¸(´mát=Ñ¡•È¥Í±…¹‘Ì½•½µ•ÑÉä½Í¡…É•É•Í½ÕÉ•Ì½Á••ÉÌÕ¹¡…¹•ì¹…Ñ¥Ù”U¹‘½I•‘¼½ÁÉ½©•Ð½9=4UX‰åÑ•Ì½1…ÑÑÉ¥‰ÕÑ•Ì¸(´máti•É¼5½Ù”½M…±”Ä¹¼¡•­Á½¥¹Ðì‰±…¹¬½¹½¹™¥¹¥Ñ”½¹½¹Á½Í¥Ñ¥Ù”½ÍÑ…±”½±½­•½½Ù•É™±½ÜÉ•™ÕÍ”¸(´mát=É¥¥¹…°Ý½É­ÍÁ…”¹Õµ•É¥Œ‘•±•…Ñ¥½¸½‘¥Í…‰±”½Ù…±¥‘…Ñ¥½¸°É•½Á•¸‘•™…Õ±ÑÌÀ¼À¼Ä…¹¥¹ÁÕÐ	…­ÍÁ…”¸(´mátM•±•Ð¥Í±…¹ƒŠHƒ:QTÀ¸Ä€¼ƒ:QXÀƒŠH5½Ù”è½¹±äÑ¡…Ð¥Í±…¹µ½Ù•ÌÉ¥¡Ðìƒ:QXÀ¸Äµ½Ù•ÌÕÀ¸(´mátM…±”À¸ÔÑ¡•¸ÈèÍ•±•Ñ•¥Í±…¹Í¡É¥¹­ÌÑ¡•¸É•ÑÕÉ¹Ì…‰½ÕÐ¥ÑÌ½Ý¸•¹ÑÉ”ì½Ñ¡•È¥Í±…¹‘ÌÍÑ…äÁÕÐ¸(´mátU¹‘¼½I•‘¼ÍÑ•ÁÌÑ¡É½Õ ¹Õµ•É¥Œ•‘¥ÑÌì±•…È‘¥Í…‰±•Ì5½Ù”½M…±”ìI½Ñ…Ñ”½±¥À…¹Á…¸½Á¥¹ ÍÑ¥±°Ý½É¬¸(´mát¥A…¹Õµ•É¥Œ•¹ÑÉä½‰…­ÍÁ…”…¹±½Í”½É•½Á•¸Ý½É¬ìM…Ù”½=Á•»ŠI¥±”9=5	…Í”É•Ñ…¥¹Ì•‘¥Ñ•UYÌ½Í•…µÌ¸()9Õµ•É¥Œ5½Ù”½M…±”…É”Í•±•Ñ•µ½¹±äì…¹Ù…Ì‘É…œÉ•µ…¥¹ÌÁ…¸¸9¼Õ¹ÝÉ…À½Á…¥¹Ñ¥¹œ½¹•Üµµ•Í UYÌå•Ð¸((ŒŒ€¸àÜÄA•¹¥°5½Ù”™½ÈÍ•±•Ñ•UX¥Í±…¹‘ÌƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mát€¸àÜÀÕÍ•ÈAMLÁÉ½Ñ•Ñ•ì•á…Ð5½Ù”½M…±”É•Ñ…¥¹•Õ¹‘•È½±±…ÁÍ•‘¥Í±½ÍÕÉ”¸(´mátÑÕ…°…¹Ù…Ìµ½Ý¹•ÈA•¹¥°ÁÉ•Ù¥•Ü¥ÌÉ•…µ½¹±äì½¹”½É¥¥¹…°5½Ù”ÑÉ…¹Í…Ñ¥½¸…Ð±¥™Ð¸(´mát9…Ñ¥Ù”¡¥ÍÑ½Éä½Á••È½É•Í½ÕÉ”¥Í½±…Ñ¥½¸°Í•…´µÍ¥‘”ÁÉ•Ù¥•Ü°ÍÑ…‰±”ÁÉ½©•Ñ¥½¸°AH½é½½´µ…ÁÁ¥¹œ¸(´mát)¥ÑÑ•È½…¹•°½±½ÍÐ…ÁÑÕÉ”½É•Á½ÉÐ½±½¬½É•Í¥é”½¥Ð½¡¥ÍÑ½Éä½±½Í”‘¼¹½Ð½µµ¥ÐÁÉ•Ù¥•ÝÌ¸(´mát¥¹•È½Á¥¹ ½‰…­É½Õ¹A•¹¥°¹…Ù¥…Ñ¥½¸…¹Á…±´ÍÕÁÁÉ•ÍÍ¥½¸ìÍÑ…±”½¹Ñ•áÐÉ•™ÕÍ•Ì¸(´mátQ…À…¸¥Í±…¹ìA•¹¥°µ‘É…œ¥ÐÉ¥¡Ð½ÕÀè¥Í±…¹…¹½É…¹”Í•…´½ÕÑ±¥¹•Ì™½±±½Ü°½Ñ¡•ÉÌÍÑ…ä™¥á•¸(´mát1¥™Ð°‘É…œ……¥¸ì½¹”U¹‘¼Á•ÈÍÑÉ½­”…¹I•‘¼É•ÍÑ½É•Ì¸9¼Ñ¥¹äµÑ…Àµ½Ù•µ•¹Ð½ÈÙ¥•Ü©ÕµÀ¸(´mát¥¹•ÈÁ…¸°Á¥¹ é½½´°‰…­É½Õ¹A•¹¥°Á…¸°¥Ð…¹ÑÝ¼´½Ñ¡É•”µ™¥¹•ÈU¹‘½I•‘¼ÍÑ¥±°Ý½É¬¸(´mát	…¬Ñ¼Í°M…Ù”½=Á•¸…¹¥±”9=5	…Í”É•Ñ…¥¸µ½Ù•UYÌ½Í•…µÌì½ÁÑ¥½¹…°á…Ð½¹ÑÉ½±ÌÍÑ¥±°Ý½É¬¸()A•¹¥°5½Ù”…•ÁÑ•ìA•¹¥°M…±”Í¡¥ÁÌ¥¸àÜÈ°Ý¥Ñ I½Ñ…Ñ”Ñ¼™½±±½Ü…™Ñ•È™••‘‰…¬¸((ŒŒ€¸àÜÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄØ()I•±•…Í”‰ˆÀÄäÅ…˜ÁŒÝ•”ÀÈØÙäÔØØÉˆÅ•ŒÈÀÜÍ˜å•ˆÄÈÈÈÐìÑ•ÍÑ•ÑÉ•”(ÝÙ•„ÈÄàÔÁ‘‘•ˆÈåˆå„ÐÄàåÈÕŒÕ‰„É™„ÕˆÅÀ•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)ÑÕ…°9½‘”ÈÈ$ÌààÄàÄÈÜÌÔÌ½©½ˆÄÄØÜÀÜàÀÈÌÜàMUMLÈÌÐåAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌààÄàÄÈØäÈà‰Õ¥±½‘•Á±½äMUML¸A½ÍÑ‘•Á±½åµ•¹Ð±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ°)5•Í¡!•…±Ñ àÜÄ½Ý½É­ÍÁ…”àÜÄ½•‘¥ÐàÜÄ½¥¹ÍÁ•Ñ½ÈàÜÄ°Õ¹¡…¹•¹…Ù¥…Ñ¥½¸àØà°)ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„ÜÙ•ÉÍ¥½¸‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸%¹¥Ñ¥…°±¥Ù”É•…‘Ì)ÁÉ••‘•‘•Á±½åµ•¹Ð…¹É•ÑÕÉ¹•àÜÀì™¥¹…°½µÁ±•Ñ”É…Á µ…Ñ¡•ÌàÜÄ¸±°™½ÕÈ)¡…¹‘½™˜™¥±•ÌÕÉÉ•¹Ð¸UÍ•ÈàÜÀAMLÁÉ½Ñ•Ñ•ìàÜÄA•¹¥°™••°½¹…Ù¥…Ñ¥½¸½¡¥ÍÑ½Éä¼)ÁÉ½©•Ð½¹…Ñ¥Ù”µ•áÁ½ÉÐ‘•Ù¥”…Ñ”Á•¹‘¥¹œ¸M…±”É•µ…¥¹Ì¹Õµ•É¥ŒÕ¹‘•Èá…Ðì)A•¹¥°M…±”½I½Ñ…Ñ”™½±±½Ü™••‘‰…¬°¹¼àÜÄÕÍ•ÈAML¥¹™•ÉÉ•¸((ŒŒ€¸àÜÈA•¹¥°M…±”™½ÈÍ•±•Ñ•UX¥Í±…¹‘ÌƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mátUÍ•ÈàÜÄAMLÁÉ½Ñ•Ñ•ì‘•™…Õ±ÐA•¹¥°5½Ù”°¹…Ñ¥Ù”¡¥ÍÑ½Éä½¹…Ù¥…Ñ¥½¸½•áÁ½ÉÐÉ•Ñ…¥¹•¸(´mátÑÕ…°Ý½É­ÍÁ…”M…±”ÕÍ•Ì½É¥¥¹…°ÑÉ…¹Í…Ñ¥½¸½¹”½¸±¥™ÐìÁÉ•Ù¥•Ü½Á…å±½…½É•Í½ÕÉ”¥Í½±…Ñ¥½¸¸(´mátM¡…É•™Õ±°µ¥Í±…¹Á¥Ù½Ð‰•å½¹ÁÉ•Ù¥•Ü‰Õ‘•Ð°Í•±•Ñ•Í•…´µÍ¥‘”¥Í½±…Ñ¥½¸…¹ÍÑ…‰±”ÁÉ½©•Ñ¥½¸¸(´mát…¹•°½µ½‘”ÍÝ¥Ñ ½¹¼µ½À½©¥ÑÑ•È½¡½É¥é½¹Ñ…°½±½­•½ÍÑ…±”Õ…É‘Ì°Á½Í¥Ñ¥Ù”±¥µ¥ÑÌ…¹É•½Á•¸‘•™…Õ±Ð¸(´mátM•±•Ð¥Í±…¹ƒŠHM…±”ƒŠHA•¹¥°µ‘É…œÕÀ½‘½Ý¸è•¹±…É”½Í¡É¥¹¬…‰½ÕÐ¥ÑÌ•¹ÑÉ”ì½Ñ¡•È¥Í±…¹‘ÌÍÑ…ä™¥á•¸(´mát1¥™Ð°É•Á•…Ð°U¹‘¼½I•‘¼è½¹”ÍÑ•ÀÁ•ÈÍÑÉ½­”¸1¥Ù”™…Ñ½È…¹Í•…´½ÕÑ±¥¹•Ìµ…Ñ ½µµ¥ÑÑ•É•ÍÕ±Ð¸(´mátMÝ¥Ñ ‰…¬Ñ¼5½Ù”ìA•¹¥°5½Ù”°™¥¹•ÈÁ…¸½Á¥¹ …¹‰…­É½Õ¹A•¹¥°Á…¸ÍÑ¥±°Ý½É¬¸(´mátM…Ù”½=Á•¸ƒŠH¥±”9=5	…Í”ÁÉ•Í•ÉÙ•ÌÍ…±•UYÌ½Í•…µÌ¸=ÁÑ¥½¹…°á…ÐM…±”ÍÑ¥±°Ý½É­Ì¸()A•¹¥°I½Ñ…Ñ”¥Ì¹•áÐ…™Ñ•È™••‘‰…¬¸9¼¹•ÜÕ¹ÝÉ…À½Á…¥¹Ñ¥¹œ½µ•Í UX¡…¹¹•°¥¸àÜÈ¸((ŒŒ€¸àÜÈÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄØ()I•±•…Í”‰‰ˆá•™‘™„ÀÁˆÙŒÀÜÌÐÀÁ„å˜ÌØÌÌå™‘ˆÅŒààÀá˜ìÑ•ÍÑ•ÑÉ•”(å„Ñ„ÄØÉ™„Ìá•…™˜ÐÜÉ„ÄÔäÙ™‘ŒÄÈÀÑ„ØÄÉ‘ŒÙ•„à•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)ÑÕ…°9½‘”ÈÈ$ÌààÈÌäØÐÀÐÜ½©½ˆÄÄØÜÈØäÈäÌØàMUMLÈÌÔÍAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌààÈÌäØÈàÐÄ‰Õ¥±½‘•Á±½äMUML¸A½ÍÑ‘•Á±½åµ•¹Ð±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ°)5•Í¡!•…±Ñ àÜÈ½Ý½É­ÍÁ…”àÜÈ½•‘¥ÐàÜÈ½¥¹ÍÁ•Ñ½ÈàÜÈ°Õ¹¡…¹•¹…Ù¥…Ñ¥½¸àØà°)ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„ÜÙ•ÉÍ¥½¸‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸%¹¥Ñ¥…°±¥Ù”É•…‘Ì)ÁÉ••‘•‘•Á±½åµ•¹Ð…¹É•ÑÕÉ¹•àÜÄì™¥¹…°½µÁ±•Ñ”É…Á µ…Ñ¡•ÌàÜÈ¸UÍ•ÈàÜÄAML)ÁÉ½Ñ•Ñ•ìàÜÈA•¹¥°M…±”½¹…Ù¥…Ñ¥½¸½¡¥ÍÑ½Éä½ÁÉ½©•Ð½¹…Ñ¥Ù”µ•áÁ½ÉÐ‘•Ù¥”…Ñ”)Á•¹‘¥¹œ¸±°™½ÕÈ¡…¹‘½™˜™¥±•ÌÕÉÉ•¹ÐìA•¹¥°I½Ñ…Ñ”¹•áÐ…™Ñ•È™••‘‰…¬¸((ŒŒ€¸àÜÌA•¹¥°I½Ñ…Ñ”™½ÈÍ•±•Ñ•UX¥Í±…¹‘ÌƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mátUÍ•ÈàÜÈAMLÁÉ½Ñ•Ñ•ìA•¹¥°5½Ù”½M…±”°Í•¹”¡¥ÍÑ½Éä½¹…Ù¥…Ñ¥½¸½•áÁ½ÉÐÉ•Ñ…¥¹•¸(´mátá¥ÍÑ¥¹œÑÉ…¹Í…Ñ¥½¸€¬Í¡…É•Á½¥¹Ðµ…Ñ¡ÌìÉ•…µ½¹±äÁÉ•Ù¥•Ü°™Õ±°µ¥Í±…¹Á¥Ù½Ð…¹¥Í½±…Ñ•Í•…´Í¥‘•Ì¸(´mátEÕ…ÉÑ•ÈµÑÕÉ¸Á…É¥Ñä°…É‰¥ÑÉ…Éäµ…¹±”ÁÉ½©•Ð½…ÑÕ…°9=4½1UYÌ°Á••È½É•Í½ÕÉ”½¡¥ÍÑ½Éä¥Í½±…Ñ¥½¸¸(´mát…¹•°½µ½‘”ÍÝ¥Ñ ½©¥ÑÑ•È½Ù•ÉÑ¥…°½™Õ±°µÑÕÉ¸½ÍÑ…±”½±½­•½½Ù•É™±½ÜÉ•™ÕÍ…°…¹‘•™…Õ±Ð5½Ù”¸(´mátM•±•Ð¥Í±…¹ƒŠHI½Ñ…Ñ”ƒŠHA•¹¥°µ‘É…œÉ¥¡Ð½±•™Ðè•¹ÑÉ•É½Ñ…Ñ¥½¸Ý¥Ñ ±¥Ù”…¹±”½Í•…´ÁÉ•Ù¥•Üì½Ñ¡•ÉÌ™¥á•¸(´mát1¥™Ð°É•Á•…Ð°U¹‘¼½I•‘¼è½¹”¹…Ñ¥Ù”ÍÑ•ÀÁ•ÈÍÑÉ½­”¸I½Ñ…Ñ”äÀ½±¥ÀÍÑ¥±°Ý½É¬¸(´mátMÝ¥Ñ 5½Ù”½M…±”ìA•¹¥°•‘¥ÑÌ…¹™¥¹•ÈÁ…¸½Á¥¹ ½‰…­É½Õ¹A•¹¥°¹…Ù¥…Ñ¥½¸É•µ…¥¸½½¸(´mátM…Ù”½=Á•¸ƒŠH¥±”9=5	…Í”ÁÉ•Í•ÉÙ•ÌÉ½Ñ…Ñ•UX±…å½ÕÐ½Í•…µÌ¸()9¼¹•ÜÕ¹ÝÉ…À½¹•Üµµ•Í UYÌ½Á…¥¹Ñ¥¹œ¥¸àÜÌ¸•Ù¥”àÜÌ…•ÁÑ…¹”É•µ…¥¹ÌÍ•Á…É…Ñ”¸((ŒŒ€¸àÜÌÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄØ()I•±•…Í”€ÀÀàÝÉ‰”Íá™ÀÁÔàØØÄå•‰àäÁŒÁ˜ÐØØá”Ñ„äìÑ•ÍÑ•ÑÉ•”(ÀÄÕ…ˆÙ‘„Ù™ˆÈÍŒäÁ”Í„åŒÄäÈÑ™……Œå™…ŒÅ˜ÌääÈÜ•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)ÑÕ…°9½‘”ÈÈ$ÌààÈØäÌÄÈÔÈ½©½ˆÄÄØÜÌØÐÐÔÀÔÄMUMLÈÌÔÝAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌààÈØäÌÄÈÐÜ‰Õ¥±½‘•Á±½äMUML¸A½ÍÑ‘•Á±½åµ•¹Ð±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ°)5•Í¡!•…±Ñ àÜÌ½Ý½É­ÍÁ…”àÜÌ½•‘¥ÐàÜÌ½¥¹ÍÁ•Ñ½ÈàÜÌ°Õ¹¡…¹•¹…Ù¥…Ñ¥½¸àØà°)ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„ÜÙ•ÉÍ¥½¸‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸%¹¥Ñ¥…°±¥Ù”É•…‘Ì)ÁÉ••‘•‘•Á±½åµ•¹Ð…¹É•ÑÕÉ¹•àÜÈì™¥¹…°½µÁ±•Ñ”É…Á µ…Ñ¡•ÌàÜÌ¸UÍ•ÈàÜÈAML)ÁÉ½Ñ•Ñ•ìàÜÌA•¹¥°I½Ñ…Ñ”½¹…Ù¥…Ñ¥½¸½¡¥ÍÑ½Éä½ÁÉ½©•Ð½¹…Ñ¥Ù”µ•áÁ½ÉÐ‘•Ù¥”…Ñ”)Á•¹‘¥¹œ¸±°™½ÕÈ¡…¹‘½™˜™¥±•ÌÕÉÉ•¹Ðì¹•áÐUXµ…ÕÑ¡½É¥¹œÍÑ…”¹••‘Ì½Ý¹•È…Õ‘¥Ð)…¹àÜÌ™••‘‰…¬¸9¼¹•ÜÕ¹ÝÉ…À½¹•Üµµ•Í ¡…¹¹•±Ì½Á…¥¹Ñ¥¹œ½È‘•Ù¥”AML¥¹™•ÉÉ•¸((ŒŒ€¸àÜÐ¥ÐÍ•±•Ñ•UX¥Í±…¹Ñ¼Ñ¥±”ƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mátUÍ•ÈàÜÌAMLÁÉ½Ñ•Ñ•ìA•¹¥°5½Ù”½M…±”½I½Ñ…Ñ”½¹…Ù¥…Ñ¥½¸½¡¥ÍÑ½Éä½¹…Ñ¥Ù”•áÁ½ÉÐÉ•Ñ…¥¹•¸(´mátM•±•Ñ•µ½¹±äÁÉ½Á½ÉÑ¥½¹…°•¹ÑÉ¥¹œ¼È”µ…É¥¸°™Õ±°¥Í±…¹‰•å½¹ÁÉ•Ù¥•Ü°Í¡…É•‰½Õ¹‘Ì½Ý¹•È¸(´mát=¹”¡•­Á½¥¹Ð½=\É•Í½ÕÉ”¥Í½±…Ñ¥½¸ìÉ•Á•…Ð¹¼µ½ÀìÍÑ…±”½±½­•½é•É¼µ•áÑ•¹Ð½•áÑÉ•µ”½Ñ¥¹äÕ…É‘Ì¸(´mátÑÕ…°Ý½É­ÍÁ…”…¹•±ÌA•¹¥°ÁÉ•Ù¥•ÜìÙ¥•Ü¥Ð¥Ì¹…Ù¥…Ñ¥½¸ì¹…Ñ¥Ù”ÁÉ½©•Ð½9=4½1½Ù•É…”¸(´mát5½Ù”½Í…±”¥Í±…¹½ÕÑÍ¥‘”Ñ¥±”ƒŠH¥ÐÑ¼Ñ¥±”è•¹ÑÉ•™¥Ð°ÁÉ½Á½ÉÑ¥½¹ÌÉ•Ñ…¥¹•°½Ñ¡•ÉÌ™¥á•¸(´mátU¹‘¼½I•‘¼É•ÍÑ½É•Ì™¥Ð¥¸½¹”ÍÑ•ÀìÉ•Á•…Ð¥ÐÑ¼Ñ¥±”…‘‘Ì¹¼•áÑÉ„U¹‘¼ÍÑ•À¸(´mátY¥•Ü¥Ð¡…¹•Ì½¹±ä™É…µ¥¹œìA•¹¥°5½Ù”½M…±”½I½Ñ…Ñ”°™¥¹•ÈÁ…¸½Á¥¹ É•µ…¥¸¥¹Ñ…Ð¸(´mátM…Ù”½=Á•¸ƒŠH¥±”9=5	…Í”ÁÉ•Í•ÉÙ•Ì™¥ÑÑ•±…å½ÕÐ½Í•…µÌ¸()M•±•Ñ•™¥Ð½¹±äì¹¼…ÕÑ½µ…Ñ¥Œ¥Í±…¹Á…­¥¹œ½¹•Üµµ•Í UYÌ½Õ¹ÝÉ…À½Á…¥¹Ñ¥¹œ¥¸àÜÐ¸((ŒŒ€¸àÜÐÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄØ()I•±•…Í”€ÔäÑ‘”Í”äÕ‰ˆÐå‘ŒàÐàÑ‰”äÈÀÌÁ˜ÙàÁ™”å…Ý„ìÑ•ÍÑ•ÑÉ•”(ÐÙŒàØá„ÜàÕ˜å‘ŒàÐÜÐÐØÀÙ˜ÌÌÐÕ™É‰•ÄÐàÌä•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)ÑÕ…°9½‘”ÈÈ$ÌààÔÈØÐÔÀÐÔ½©½ˆÄÄØàÄÜÀØÈØØÄMUMLÈÌØÅAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌààÔÈØÐÐÈàÌ‰Õ¥±½‘•Á±½äMUML¸A½ÍÑ‘•Á±½åµ•¹Ð±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ°)5•Í¡!•…±Ñ àÜÐ½Ý½É­ÍÁ…”àÜÐ½•‘¥ÐàÜÐ½¥¹ÍÁ•Ñ½ÈàÜÐ°Õ¹¡…¹•¹…Ù¥…Ñ¥½¸àØà°)ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„ÜÙ•ÉÍ¥½¸‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸%¹¥Ñ¥…°±¥Ù”É•…‘Ì)ÁÉ••‘•‘•Á±½åµ•¹Ð…¹É•ÑÕÉ¹•àÜÌì™¥¹…°½µÁ±•Ñ”É…Á µ…Ñ¡•ÌàÜÐ¸UÍ•ÈàÜÌAML)ÁÉ½Ñ•Ñ•ìàÜÐ™¥Ð½…ÍÁ•Ð½¥Í½±…Ñ¥½¸½¡¥ÍÑ½Éä½¹…Ù¥…Ñ¥½¸½ÁÉ½©•Ð½¹…Ñ¥Ù”µ•áÁ½ÉÐ‘•Ù¥”)…Ñ”Á•¹‘¥¹œ¸±°™½ÕÈ¡…¹‘½™˜™¥±•ÌÕÉÉ•¹Ðì¹•áÐ¹…Ñ¥Ù”UXµ¡…¹¹•°½ÁÉ½©•Ñ¥½¸ÍÑ…”)É•ÅÕ¥É•Ì½Ý¹•È…Õ‘¥Ð…¹àÜÐ™••‘‰…¬¸M•±•Ñ•™¥Ð‘½•Ì¹½ÐÁ…¬µÕ±Ñ¥Á±”¥Í±…¹‘Ì¸((ŒŒ€¸àÜÔ9…Ñ¥Ù”	½á1…ˆÁ±…¹…ÈUYÌƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mátUÍ•ÈàÜÐAMLÁÉ½Ñ•Ñ•ì½É¥¥¹…°¥µÁ½ÉÑ•UX…ÕÑ¡½É¥¹œ½™¥±”½9½µ…‰…Í•±¥¹”É•Ñ…¥¹•¸(´mát9…Ñ¥Ù”Í½ÕÉ•‰½á±…ˆ½ØÌUXµ½¹±ä•¹Ù•±½Á”°ÍÑÉ¥ÐÙ…±¥‘…Ñ¥½¸°±•…ä½Á±…¥¸½¥µÁ½ÉÑ•‰åÑ•ÌÉ•Ñ…¥¹•¸(´mátad½ah½ehÍ…µ”•½µ•ÑÉäì½¹”½É¥¥¹…°¡¥ÍÑ½Éä¡•­Á½¥¹Ð°É•Á•…Ñ•¹¼µ½À½É•ÁÉ½©•Ñ¥½¸U¹‘½I•‘¼¸(´mát9…Ñ¥Ù”•‘¥ÑÌ½ÕÁ±¥…Ñ”½‘•±•Ñ•µ½ÁäU¹‘¼½ÁÉ½©•Ð…Ñ½µ¥ŒÉ•Á±…•µ•¹Ð…¹…ÑÕ…°9=4½1UX‰åÑ•Ì¸(´mát1½­•½É•™•É•¹”½±¥¹­•½ÁÉ½•‘ÕÉ…°½¥µÁ½ÉÑ•½µ½‘¥™¥•È½¥¹Ù…±¥½½±±…ÁÍ•É•™ÕÍ…±Ì…¹™¥¹¥Ñ”•áÑÉ•µ•Ì¸(´mát9…Ñ¥Ù”1¥¹­•ÕÁ±¥…Ñ”É•™ÕÍ•Ì‰•™½É”µÕÑ…Ñ¥½¸ìÉ•Í½ÕÉ”µ‰•…É¥¹œ1¥Ù”ÉÉ…äÉ•µ…¥¹ÌÉ•™ÕÍ•¸(´mátÕ±°±½…°9½‘”ÈÐèÈÌØáAML¼Á%0¼ÁÍ­¥ÀìÄÈ™½ÕÍ•¹…Ñ¥Ù”½É•±•…Í”¡•­ÌAML¸(´mátA±…¥¸µ•Í ½MÕ‰½™˜ƒŠH=‰©•Ð5•Í !•…±Ñ ƒŠHUYÌƒŠHA±…¹…ÈadƒŠH=Á•¸UX‘¥Ñ½ÈÍ¡½ÝÌ¹…Ñ¥Ù”±…å½ÕÐ¸(´mátQÉäah½eh…¹U¹‘¼½I•‘¼ìA•¹¥°5½Ù”½M…±”½I½Ñ…Ñ”½¥ÐÝ½É­Ì½¸•¹•É…Ñ•UYÌ°•½µ•ÑÉäÍÑ…åÌ™¥á•¸(´mátM…Ù”½=Á•¸€¹‰½á±…ˆƒŠHÉ•½Á•¸UX‘¥Ñ½ÈƒŠH¥±”9=5	…Í”ÁÉ•Í•ÉÙ•ÌÉ•…Ñ•½•‘¥Ñ•UYÌ¸(´mátá¥ÍÑ¥¹œ¥µÁ½ÉÑ•UXµ•Í ÍÑ¥±°•‘¥ÑÌ½•áÁ½ÉÑÌìA±…¹…È‰ÕÑÑ½¹ÌÍÑ…ä‘¥Í…‰±•™½È¥µÁ½ÉÑ•É•Í½ÕÉ•Ì¸()A±…¹…ÈÁÉ½©•Ñ¥½¸…¸½Ù•É±…À½½±±…ÁÍ”™…•Ìì¹¼™Õ±°Õ¹ÝÉ…À½‰½àµ…ÁÁ¥¹œ½Á…¥¹Ñ¥¹œ½È•Ù…±Õ…Ñ•UYÌå•Ð¸((ŒŒ€¸àÜÔÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄØ()I•±•…Í”€ØÈÜÈÄÄÀÜÄÁÁ„ÔäÁŒÜÀÅåŒÔàÝŒÑ•”Í”ÙÄÉ™‘ìÑ•ÍÑ•ÑÉ•”(ØÙ™àÙ˜äÌØÈÜÌÈÌÀÐÀå…‘˜Ù‰ˆÔÙ”Å”àá„àÁˆÕˆÔÔ•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)ÑÕ…°9½‘”ÈÈ$ÌààÔÜÈÌÀààä½©½ˆÄÄØàÌÄÌÌÈÈÐÀMUMLÈÌØáAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌààÔÜÈÌÀÌää‰Õ¥±½‘•Á±½äMUML¸A½ÍÑ‘•Á±½åµ•¹Ð±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ°)5•Í¡!•…±Ñ ½•‘¥Ð½µ…¹…•È½½‘•Œ½É•Í½ÕÉ”½µ…¹…•µ•¹Ð½‘É…Ý•ÈàÜÔ°Õ¹¡…¹•Ý½É­ÍÁ…”àÜÐ°)1½¹…Ñ¥Ù”•áÁ½ÉÑ•ÉÌàØÔ°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„ÜÙ•ÉÍ¥½¸‰åÑ”µµ…Ñ )É•Á½Í¥Ñ½Éä¸%¹¥Ñ¥…°±¥Ù”É•…‘ÌÁÉ••‘•‘•Á±½åµ•¹Ð…¹É•ÑÕÉ¹•àÜÐì™¥¹…°½µÁ±•Ñ”)ÁÕ‰±¥Í¡•É…Á µ…Ñ¡•ÌàÜÔ¸UÍ•ÈàÜÐAMLÁÉ½Ñ•Ñ•ìàÜÔ¹…Ñ¥Ù”A±…¹…È½•‘¥Ñ½È½¡¥ÍÑ½Éä¼)ÁÉ½©•Ð½¹…Ñ¥Ù”9½µ…‘•Ù¥”…Ñ”Á•¹‘¥¹œ¸±°™½ÕÈ¡…¹‘½™˜™¥±•ÌÕÉÉ•¹Ð¸9…Ñ¥Ù”)É•Í½ÕÉ”ØÌ½Í½ÕÉ•‰½á±…ˆ¥Ì•áÁ±¥¥Ðì¹¼Í•…´Õ¹ÝÉ…À½Á…¥¹Ñ¥¹œ½•Ù…±Õ…Ñ•UX±…¥´¸((ŒŒ€¸àÜØ9…Ñ¥Ù”	½àUYÌƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mátUÍ•ÈàÜÔAMLÁÉ½Ñ•Ñ•ìA±…¹…È½Í½ÕÉ•‰½á±…ˆ½ØÌ½¹…Ñ¥Ù”•‘¥Ñ½È½¡¥ÍÑ½Éä½•áÁ½ÉÐ‰…Í•±¥¹”É•Ñ…¥¹•¸(´mátÕ‰”Í¥à‘¥Í©½¥¹Ð¹½¹½±±…ÁÍ•¥Í±…¹‘Ì¼ÄÉÍ•…µÌ°™¥á•‘¥É•Ñ¥½¹…°•±±Ì°É•Ñ…¹Õ±…ÈÁÉ½Á½ÉÑ¥½¹Ì½‘•¹Í¥Ñä¸(´mát=É¥¥¹…°½¹”¡•­Á½¥¹Ð½=\½A±…¹…ÈÉ•Á±…•µ•¹Ð½¹…Ñ¥Ù”U¹‘¼½¹¼µ½À…¹Í•±•Ñ•µ½¹±ä•‘¥Ð¥Í½±…Ñ¥½¸¸(´mát9…Ñ¥Ù”ÁÉ½©•Ð½9=4¥¹‘•Á•¹‘•¹ÐUXÁ½½°­½É¹•È‰åÑ•Ì½…ÑÕ…°Q¡É•”1UYÌìÕ…É‘•É•™ÕÍ…°½Ù•É…”¸(´mátÕ‰”½MÕ‰½™˜ƒŠH5•Í !•…±Ñ£ŠIUYÏŠI	½àUYÏŠI=Á•¸UX‘¥Ñ½ÈèÍ¥àÍ•Á…É…Ñ”½±½ÕÉ•¥Í±…¹‘Ì¸(´mátA•¹¥°µµ½Ù”½Í…±”½É½Ñ…Ñ”½¹”¥Í±…¹ì½Ñ¡•ÉÌÍÑ…ä™¥á•¸U¹‘¼½I•‘¼É•ÍÑ½É•Ì•… …Ñ¥½¸¸(´mátA±…¹…ËŠI	½ãŠIU¹‘¼É•ÍÑ½É•ÌÁÉ¥½È±…å½ÕÐìÉ•Á•…Ñ•	½à…‘‘Ì¹¼U¹‘¼¸•½µ•ÑÉäÕ¹¡…¹•¸(´mátM…Ù”½=Á•¸€¹‰½á±…ˆƒŠHUX‘¥Ñ½ÈƒŠH¥±”9=5	…Í”É•Ñ…¥¹Ì‰½àÁ…¹•±Ì½Í•…µÌ¸()á¥Ìµ…±¥¹•‰½àÁÉ½©•Ñ¥½¸™¥ÉÍÐì•¹•É…°‘¥É•Ñ¥½¹…°Á…Ñ¡•Ìµ…ä½Ù•É±…À½‘¥ÍÑ½ÉÐ¸)9¼Í•…´Õ¹ÝÉ…À½½ÁÑ¥µ…°Á…­¥¹œ½Á…¥¹Ñ¥¹œ½•Ù…±Õ…Ñ•UYÌ¥¸àÜØ¸((ŒŒ€¸àÜØÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄØ()I•±•…Í”€ÔÅ”ÀÕ˜Ñ‘”äÜØÕ•ÍŒÌàÐÀØàÁˆÄåŒÔÈÁ‘•ˆÜÐìÑ•ÍÑ•ÑÉ•”(àá…™”Õ˜Ìá”ÑŒÁ˜ÅàÔÌÜÔÉŒÙˆäÈÝ•ŒÔÐÔäÄÄØÕ˜•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)ÑÕ…°9½‘”ÈÈ$ÌààØÄäÌÐÐÜÈ½©½ˆÄÄØàÐÔäÔàÄÈÔMUMLÈÌÜÍAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌààØÄäÌÐÄÌà‰Õ¥±½‘•Á±½äMUML¸É•Í ±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ°5•Í¡!•…±Ñ ½•‘¥ÐàÜØ°)Õ¹¡…¹•Ý½É­ÍÁ…”àÜÐ½1­¹…Ñ¥Ù”•áÁ½ÉÑ•ÉÌàØÔ½ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¹	•Ñ„ÜÙ•ÉÍ¥½¸)‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸5…¹…•È½½‘•Œ½É•Í½ÕÉ•ÌàÜÔ…¹…±°ÁÉ½Ñ•Ñ•½™É½é•¸½Ý¹•ÉÌ)Õ¹¡…¹•¸UÍ•ÈàÜÔAMLÁÉ½Ñ•Ñ•ìàÜØ	½àÁ…¹•±Ì½Í•±•Ñ••‘¥ÑÌ½¡¥ÍÑ½Éä½ÁÉ½©•Ð¼)9=5	…Í”‘•Ù¥”…Ñ”Á•¹‘¥¹œ¸±°™½ÕÈ¡…¹‘½™˜™¥±•ÌÕÉÉ•¹Ð¸9¼•¹•É…°Í•…´)Õ¹ÝÉ…À½½ÁÑ¥µ…°Á…­¥¹œ½Á…¥¹Ñ¥¹œ½•Ù…±Õ…Ñ•UX±…¥´ì‘¥É•Ñ¥½¹…°Á…Ñ¡•Ìµ…ä½Ù•É±…À¸((ŒŒ€¸àÜÜ9…Ñ¥Ù”å±¥¹‘•ÈUYÌ€¡d¤ƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mátUÍ•ÈàÜØAMLÁÉ½Ñ•Ñ•ì	½à½A±…¹…È½¹…Ñ¥Ù”ØÌ½•‘¥Ñ½È½¡¥ÍÑ½Éä½9=5	…Í”É•Ñ…¥¹•¸(´mátUÁÉ¥¡Ð±½Í•å±¥¹‘•Èè½¹”µ•…ÍÕÉ•µ•‘”ÍÑÉ¥À½ÑÝ¼…ÁÌ°‘•Ñ•Éµ¥¹¥ÍÑ¥ŒÍ•…´°¹…Ñ¥Ù”½¹”µÍÑ•À¡¥ÍÑ½Éä½¹¼µ½À¸(´mát=‘É¥¹Ì½¡•¥¡Ð‰…¹‘Ì½Í¥‘”­…À‘•¹Í¥Ñä°•½µ•ÑÉä½Á••È½¥Í±…¹¥Í½±…Ñ¥½¸…¹Õ…É‘•É•™ÕÍ…±Ì¸(´mátÕ±°±½…°ÈÌÜáAML¼Á%0¼ÁÍ­¥Àì¹…Ñ¥Ù”1ÁÉ•Í•ÉÙ•Ì…±°Í•…´­…ÀUXÙ…É¥…¹ÑÌì¥µÁ½ÉÑ•Á½±”µÝ•±Á…Ñ Õ¹¡…¹•ì…ÑÕ…°9=4½ÁÉ½©•Ð½1¡•­Ì¸(´mátUÁÉ¥¡Ðå±¥¹‘•È½MÕ‰½™˜ƒŠH5•Í !•…±Ñ£ŠIUYÏŠIå±¥¹‘•ÈUYÌ€¡d§ŠI=Á•¸UX‘¥Ñ½ÈèÍÑÉ¥ÀÁ±ÕÌÑÝ¼…ÁÌ¸(´mátA•¹¥°µ•‘¥ÐÍ¥‘”½…ÀÍ•Á…É…Ñ•±äì½Ñ¡•È¥Í±…¹‘Ì™¥á•¸U¹‘¼½I•‘¼…¹É•Á•…Ñ•µ…ÁÁ¥¹œ‰•¡…Ù”½ÉÉ•Ñ±ä¸(´mátM…Ù”½=Á•¸€¹‰½á±…ˆƒŠHUX‘¥Ñ½ÈƒŠH¥±”9=5	…Í”É•Ñ…¥¹Ì±…å½ÕÐ½Í•…µÌì	…Í”1…±Í¼É•Ñ…¥¹ÌÍ•…´½…ÁÌ¸(´mátá¥ÍÑ¥¹œ	½à½A±…¹…È…¹¥µÁ½ÉÑ•UXÝ½É­™±½ÝÌÍÑ¥±°‰•¡…Ù”…Ì…•ÁÑ•¸()I½Õ¹…±¥¹•Ý½É±µdÉ¥¹Ì™¥ÉÍÐì¹¼•¹•É…°Í•…´Õ¹ÝÉ…À½•±±¥ÁÑ¥Œµ…ÁÁ¥¹œ½Á…¥¹Ñ¥¹œ½•Ù…±Õ…Ñ•UYÌ¸((ŒŒ€¸àÜÜÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄØ()IÕ¹Ñ¥µ”É•±•…Í””ÅÕ™™ÀÌäÐÅˆäàÉ‘˜ÈÕäÐØÍ‘”åˆÀÜÐÙ”Õ”Ñ…€ìÑ•ÍÑ•ÑÉ•”ŒàÜÉ•ŒØÐÝ˜á„ÜÄàá˜ÈÈÝÐáŒÙ™ŒÔÐÔäÈÌÝ„ÐÌÈá€µ…Ñ¡•™•Ñ¡•µ…¥¸•á…Ñ±ä¸ÑÕ…°9½‘”€ÈÈÑ½Á½±½ä$ÉÕ¸€ÌààØÔääÄäÀØ€¼©½ˆ€ÄÄØàÔààÌÔØÌÄÍÕ••‘•è€¨¨ÈÌÜàAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸A…•ÌÉÕ¸€ÌààØÔääÀÜÀÌ‰Õ¥±…¹‘•Á±½äÍÕ••‘•¸É•Í ±¥Ù”Í¡•±°°µ…¹¥™•ÍÐ°5•Í !•…±Ñ ½•‘¥Ð½1Á…¹•°€¸àÜÜ°Õ¹¡…¹•UXÝ½É­ÍÁ…”€¸àÜÐ°¹…Ñ¥Ù”9=4½É”€¸àØÔ°ÁÉ½Ñ•Ñ•5Õ±Ñ¤€¸Ä¸À°…¹™É½é•¸‰•Ñ„´ÜÙ•ÉÍ¥½¸…±°‰åÑ”µµ…Ñ¡•É•Á½Í¥Ñ½Éä™¥±•Ì¸()UÍ•È€¸àÜØAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•¸Q¡”€¸àÜÜ‘•Ù¥”…Ñ”É•µ…¥¹ÌÁ•¹‘¥¹œèÕÁÉ¥¡ÐÉ½Õ¹Ý½É±µdå±¥¹‘•ÈUYÌ°¥¹‘•Á•¹‘•¹ÐA•¹¥°•‘¥ÑÌ°U¹‘¼½I•‘¼°ÁÉ½©•ÐÁ•ÉÍ¥ÍÑ•¹”°9=5	…Í”…¹¹…Ñ¥Ù”1Í•…´¡•­Ì¸9¼•¹•É…°Õ¹ÝÉ…À°•±±¥ÁÑ¥Œµ…ÁÁ¥¹œ°Á…¥¹Ñ¥¹œ°½È•Ù…±Õ…Ñ•µµ½‘¥™¥•ÈUX±…¥´¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä‘½Õµ•¹ÑÌ…É”ÕÉÉ•¹Ð¸(((ŒŒ€¸àÜàUX‘¥Ñ½È¡•­•ÈÉ•™•É•¹”ƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mátUÍ•È€¸àÜÜAMLÁÉ½Ñ•Ñ•ìå±¥¹‘•È½	½à½A±…¹…È½¥µÁ½ÉÑ•¹…Ñ¥Ù”¡¥ÍÑ½Éä½ÁÉ½©•Ð½•áÁ½ÉÐ‰…Í•±¥¹•ÌÉ•Ñ…¥¹•¸(´mátM¡…É•É•¹‘•É•ÈÁÉ½©•Ñ¥½¸½Á¥­¥¹œ½AHÁ…É¥Ñä°±¥ÁÁ•‰½Õ¹‘•ÈÔÙ•±±Ì°•áÑÉ•µ”½Ñ¥±•½½™™ÍÉ••¸½ÍÑ…±”Õ…É‘Ì¸(´mát¡•­•ÈÕ¹‘•È¥Í±…¹Í•±•Ñ¥½¸½Í•…µÌìÁ…å±½…½É•Á½ÉÐÉ•…µ½¹±äì¹¼•‘¥Ð½¡¥ÍÑ½Éä…±±‰…¬™É½´Ñ½±”¸(´mátÑÕ…°Ý½É­ÍÁ…”…¹•±ÌÁ•¹‘¥¹œA•¹¥°½…ÁÑÕÉ”°É•Ñ…¥¹ÌÙ¥•Ü½Í•±•Ñ¥½¸°É•™É•Í ÁÉ•™•É•¹”°É•½Á•¸½™˜¸(´mátÕ±°±½…°9½‘”ÈÐèÈÌàÅAML¼Á%0¼ÁÍ­¥À¸=É¥¥¹…°UX•‘¥Ðµ…Ñ¡Ì½•áÁ½ÉÐ½É•¹‘•È½­•É¹•°½Ý¹•ÉÌÕ¹¡…¹•¸(´mát=Á•¸UX‘¥Ñ½ÈƒŠH¡•­•ÈèÉ•…‘…‰±”ÄÛ\ÄØÉ¥¥¹Í¥‘”Ñ¥±”ÃŠLÄìÑ½±”½™˜É•ÍÑ½É•ÌÁ±…¥¸Ù¥•Ü¸(´mátA…¸½Á¥¹ ¼¬¿Š"H½¥ÐèÉ¥…¹UXÑ¥±”ÍÑ…ä…±¥¹•°Í•±•Ñ¥½¸ÍÑ…åÌÕÍ…‰±”¸(´mátA•¹¥°5½Ù”½M…±”½I½Ñ…Ñ”…¹U¹‘¼½I•‘¼Ý½É¬Ý¥Ñ ¡•­•ÈìÉ¥ÍÑ…åÌ™¥á•Ý¡¥±”¥Í±…¹‘Ìµ½Ù”¸(´mát	…¬Ñ¼Í…¹É•½Á•¸è¡•­•È‘•™…Õ±ÑÌ½™˜ì½É‘¥¹…ÉäÙ¥•ÝÁ½ÉÐ¹…Ù¥…Ñ¥½¸Ý½É­Ì¸((ÉÉ•™•É•¹”½¹±äì€ÍÑ•áÑÕÉ”½ÍÑÉ•Ñ ¥¹ÍÁ•Ñ¥½¸…¹Á…¥¹Ñ¥¹œÉ•µ…¥¸±…Ñ•ÈÍÑ…•Ì¸((ŒŒ€¸àÜàÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄØ()I•±•…Í”€ÝˆÝ˜ÈÜÔÅ”ÌÜÄäÔäÐÌÝ„Ù…ÄÀØÀÅŒäÌÁ˜ÜÈÝ„ØÑ‘€ìÑ•ÍÑ•ÑÉ•”•˜å”ÝˆØÀÀÔÄØÙ˜ÍŒÙ”Ìá•ˆäÌàÌÀäØÍ˜ÄÅ˜ÔÄÍ”ÌÙ€•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸ÑÕ…°9½‘”ÈÈ$ÌààØÜÐÀÈÄÜä½©½ˆÄÄØàØÌÈäÐØÈÀMUML€¨¨ÈÌàÄAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ìA…•ÌÌààØÜÐÀÄààÄ‰Õ¥±½‘•Á±½äMUML¸É•Í ±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ°5•Í¡!•…±Ñ ½Ý½É­ÍÁ…”½¥¹ÍÁ•Ñ½È½•‘¥ÐàÜà°Õ¹¡…¹•1Á…¹•°àÜÜ½ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¹	•Ñ„ÜÙ•ÉÍ¥½¸‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸9…Ñ¥Ù”9=4àØÔ°µ…¹…•È½½‘•Œ½É•Í½ÕÉ•ÌàÜÔ½¹…ØàØà…¹ÁÉ½Ñ•Ñ•µ½‘•±±¥¹œ½Ý¹•ÉÌÕ¹¡…¹•¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä‘½Õµ•¹ÑÌÕÉÉ•¹Ð¸UÍ•ÈàÜÜAMLÁÉ½Ñ•Ñ•ìàÜà¡•­•ÈÉ•…‘…‰¥±¥Ñä½¹…Ù¥…Ñ¥½¸½A•¹¥°½¡¥ÍÑ½Éä½É•½Á•¸‘•Ù¥”…Ñ”Á•¹‘¥¹œ¸Q¡¥Ì¡•­•È¥Ì„€ÉÉ•™•É•¹”½¹±äì€ÍÑ•áÑÕÉ”½ÍÑÉ•Ñ ¥¹ÍÁ•Ñ¥½¸É•µ…¥¹ÌÑ¡”¹•áÐ…Õ‘¥Ñ•ÍÑ…”¸(((ŒŒ€¸àÜäÑ•µÁ½É…Éä€ÍUX¡•­•ÈÙ¥•ÜƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mátUÍ•ÈàÜàAMLÁÉ½Ñ•Ñ•è€É¡•­•È½¹…Ù¥…Ñ¥½¸½A•¹¥°½¡¥ÍÑ½Éä½É•½Á•¸¸(´mát=É¥¥¹…°•áÁ½ÉÑ•ÈÑÉ¥…¹Õ±…Ñ¥½¸½½É¹•Èµ…ÁÁ¥¹œì±¥Ù”Á½Í¥Ñ¥½¹Ì½¹¼¥µÁ½ÉÐµ™¥ÐÉ•ÍÑ½É…Ñ¥½¸ì½¹…Ù”…¹Í•…´Ù…É¥…¹ÑÌ¸(´mát5¥ÍÍ¥¹œ½ÍÑ…±”½Á…ÉÑ¥…°½¥¹Ù…±¥½¹½¹™¥¹¥Ñ”½˜ÌÈ½½Ù•ÈÈÁ¬µ½É¹•ÈÉ•™ÕÍ…°°Í…™”™Õ±°M½±¥™…±±‰…¬¸(´mátÑÕ…°Q¡É•”½Ù•É±…ä‘¥ÍÁ½Í…°½¹”½¸¹…Ñ¥Ù”Í½ÕÉ”µ•½µ•ÑÉä±•…¹ÕÀ½Èµ½‘”¡…¹”ì½É¥¥¹…°‰½‘ä•½µ•ÑÉä½Á¥­¥¹œÉ•Ñ…¥¹•¸(´mátÑÕ…°É•¹‘•È…Ñ¥Ù”‰É¥‘”½¥¹…Ñ¥Ù”½‰©•Ð½™…±±‰…¬½Í•ÍÍ¥½¸µ•¹UXÉ•™É•Í …¹MÑÕ‘¥¼½±…äÉ•ÍÑ½É…Ñ¥½¸¸(´mátå±¥¹‘•ÈÍ•…´­…ÀÙ…É¥…¹ÑÌÁÉ•Í•ÉÙ•ìÁÉ•Ù¥•Ü±•…Ù•Ì¹…Ñ¥Ù”9=4‰åÑ•ÌÕ¹¡…¹•ì…±°•áÁ½ÉÐ½¡¥ÍÑ½ÉäÉ•É•ÍÍ¥½¹ÌÉ•Ñ…¥¹•¸(´mátÕ±°±½…°9½‘”ÈÐèÈÌàÙAML¼Á%0¼ÁÍ­¥ÀìÉ•Ù¥•Ý•…¡”É…Á …¹…±°½É¥¥¹…°àÙ¥•Üµ½‘•ÌÉ•Ñ…¥¹•¸(´mátÕ‰—ŠI	½àUYÌ½ÈÕÁÉ¥¡Ðå±¥¹‘•ËŠIå±¥¹‘•ÈUYÌ¡d¤°MÕ‰½™˜èY%_ŠIUX¡•­•ÈÍ¡½ÝÌ¡•­•È½Ù•ÈÍÕÉ™…”¸(´mát=É‰¥Ð½Á…¸½Á¥¹ É•µ…¥¸¹½Éµ…°ì¥¹ÍÁ•Ð‰½àÁ…¹•±Ì…¹å±¥¹‘•ÈÍ¥‘”½…ÀÍ•…´¸(´mátUX‘¥Ñ½ËŠIM…±”¥Í±…¹“ŠI	…¬Ñ¼Í¡…¹•Ì¡•­•ÈÍ¥é”Ñ¡•É”ìU¹‘¼½I•‘¼É•ÍÑ½É•Ì¥Ð¸(´mátY%_ŠIMÑÕ‘¥¼½M½±¥É•ÍÑ½É•Ì½É‘¥¹…Éä±½½¬ìµ•Í Ý¥Ñ¡½ÕÐUYÌÉ•µ…¥¹ÌÁ±…¥¸¥¸¡•­•Èµ½‘”¸()	…Í”ÍÑ½É•UYÌ½¹±ä°µ…á¥µÕ´ÈÀ°ÀÀÀ™…”½É¹•ÉÌì•Ù…±Õ…Ñ•½±¥¹­•½ÁÉ½•‘ÕÉ…°½ÍÑ…±”¡…¹¹•±ÌÕÍ”M½±¥¸)Q•µÁ½É…ÉäÙ¥•Ü½¹±äì¹¼¥µ…”Á…¥¹Ñ¥¹œ½Á•ÉÍ¥ÍÑ•¹Ðµ…Ñ•É¥…±Ì½•áÁ½ÉÐ¡…¹•Ì¸((ŒŒ€¸àÜäÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄØ()I•±•…Í”€ÙˆÈÁŒÌäÌå„å•‰”ÝˆäàÐÝ™‘ŒÀàÌÁ…‘ˆÔØÕ™Á„Å‰…€ìÑ•ÍÑ•ÑÉ•”€ÜäÐàØÕˆàÔÕ‘˜ÌÌÜØÍ”äÄÄÌÙ”ÔÐÈÅˆÐäÌÌÔØäÔÀÝ…€•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸ÑÕ…°9½‘”ÈÈ$ÌààÜÀÄÄÌÌÄÔ½©½ˆÄÄØàÜÄäÔÔÄÔÈMUML€¨¨ÈÌàØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ìA…•ÌÌààÜÀÄÄÈÐàÄ‰Õ¥±½‘•Á±½äMUML¸¥¹…°™É•Í ±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ½É•¹‘•Èµ½Ý¹•È½ÁÉ•Ù¥•Üµ¡¥±½•áÁ½ÉÐµÁ…¹•°àÜä°Õ¹¡…¹•Ý½É­ÍÁ…”àÜà½¹…Ñ¥Ù”9=4àØÔ½ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¹	•Ñ„ÜÙ•ÉÍ¥½¸‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸%¹¥Ñ¥…°É•…‘ÌÁÉ••‘•‘•Á±½åµ•¹Ð€¡½±àÜà½¡¥±ÐÀÐ¤ì™¥¹…°™Õ±°É…Á µ…Ñ¡•ÌàÜä¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä‘½ÌÕÉÉ•¹Ð¸UÍ•ÈàÜàAMLÁÉ½Ñ•Ñ•ìàÜäÍÕÉ™…”¡•­•È½¹…Ù¥…Ñ¥½¸½UX•‘¥ÓŠIÍ•ÍÍ¥½¸µ•á¥Ð½¡¥ÍÑ½Éä½±½½¬µÉ•ÍÑ½É…Ñ¥½¸‘•Ù¥”…Ñ”Á•¹‘¥¹œ¸MÑ½É•	…Í”UYÌ½¹±äìÕ¹ÍÕÁÁ½ÉÑ•½ÍÑ…±”½½Ù•ÈÈÁ¬µ½É¹•È½‰©•ÑÌÕÍ”M½±¥ì¹¼Á…¥¹Ñ¥¹œ½•Ù…±Õ…Ñ•UXÁÉ½Á……Ñ¥½¸±…¥´¸(((ŒŒ€¸ààÀ•µ‰•‘‘•½±½ÕÈµ¥µ…”É•™•É•¹”ƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mátUÍ•ÈàÜäA•É™•ÐAMLÁÉ½Ñ•Ñ•è€Í¡•­•È½¹…Ù¥…Ñ¥½¸½A•¹¥°½Í•ÍÍ¥½¸É•™É•Í ½¡¥ÍÑ½Éä½±½½¬É•ÍÑ½É…Ñ¥½¸¸(´mátÑÕ…°1¥µÁ½ÉÑ•È¥µ…”½µ…Ñ•É¥…°Í¡…Á”…¹½‘•Œ‰åÑ”½¹Ñ¥¹Õ¥Ñäì½É¥¥¹…°É•Í½ÕÉ•ÌÍ¡…É•É•…µ½¹±ä¸(´mátUÍ•µ…Ñ•É¥…°UXÀ½½É”A9½)AÍ½ÕÉ”É•Í½±ÕÑ¥½¸ìÑÉ…¹Í™½É´½•áÑ•¹Í¥½¸½•áÑ•É¹…°½µ¥ÍÍ¥¹œ½‰…½½Ù•Èá5É•™ÕÍ…°¸(´mát	½Õ¹‘•ÄÀÈÐ‰¥Ñµ…À‘•½‘”°½™˜½Í•±•Ð½±½Í”±•…¹ÕÀ°±…Ñ”É•ÍÕ±Ð±½Í”°…¹•±•µ‰•™½É”µÍÑ…ÉÐÍ­¥À°Í…µ”µ¥µ…”É•ÕÍ”¸(´mátM¡…É•ÁÉ½©•Ñ¥½¸½XÀÙ•ÉÑ¥…°½É¥•¹Ñ…Ñ¥½¸°±¥ÁÁ¥¹œ½‘É…Ü½É‘•È°É•…µ½¹±äÉ•Á½ÉÐ…¹Á¥­¥¹œ½UXµ…Ñ¡ÌÕ¹¡…¹•¸(´mátÑÕ…°Ý½É­ÍÁ…”¥µ…”Ñ½±”½Í½ÕÉ”¡½½Í•È°A•¹¥°…¹•±±…Ñ¥½¸½Ù¥•Ü­Í•±•Ñ¥½¸É•Ñ•¹Ñ¥½¸°¹…Ñ¥Ù”½Á±…¥¸‘¥Í…‰±•¸(´mátÕ±°±½…°9½‘”ÈÐèÈÌäÅAML¼Á%0¼ÁÍ­¥ÀìÍÕÉ™…”¡•­•È½É•¹‘•È½•áÁ½ÉÐ½ÁÉ½Ñ•Ñ•½™É½é•¸½Ý¹•ÉÌÉ•Ñ…¥¹•¸(´mát%µÁ½ÉÐ1Ý¥Ñ •µ‰•‘‘•‰…Í”µ½±½ÕÈ¥µ…”€¡MÁ±¥ÐÉ½ÕÁÌ½™˜¤ƒŠHUX‘¥Ñ½ËŠI%µ…”è¥µ…”‰•¡¥¹UYÌ°½ÉÉ•Ð½É¥•¹Ñ…Ñ¥½¸¸(´mátA…¸½Á¥¹ ½¥ÐìA•¹¥°5½Ù”½M…±”½I½Ñ…Ñ”½Ù•ÈÍÑ…Ñ¥½¹…Éä¥µ…”°U¹‘¼½I•‘¼ì½É¥¥¹…°¡•­•ÈÍÑ¥±°Ý½É­Ì¸(´mát%˜µÕ±Ñ¥Á±”½µÁ…Ñ¥‰±”µ…Ñ•É¥…±Ì•á¥ÍÐ°¥µ…”¡½½Í•È¡…¹•ÌÉ•™•É•¹”ì	…¬Ñ¼Í½É•½Á•¸‘•™…Õ±ÑÌ%µ…”½™˜¸(´mátM…Ù”½=Á•¸€¹‰½á±…ˆƒŠHUX‘¥Ñ½ËŠI%µ…”ÍÑ¥±°Ý½É­ÌìÁ±…¥¸½¹…Ñ¥Ù”µ•Í¡•Ì­••À%µ…”‘¥Í…‰±•¸()]¡½±”Í•±•Ñ•Í½ÕÉ”µ¥µ…”É•™•É•¹”¥¸Ñ¥±”ÃŠLÄ°¹½ÐÁ•Èµ™…”µ…Ñ•É¥…°½A	HÉ•¹‘•É¥¹œ°ÝÉ…ÁÁ¥¹œ°€Í¥µ…”Ñ•áÑÕÉ¥¹œ½ÈÁ…¥¹Ñ¥¹œ¸)=¹±ä•µ‰•‘‘•A9½)AUXÀÝ¥Ñ¡½ÕÐÑ•áÑÕÉ”ÑÉ…¹Í™½ÉµÌ°ƒŠ&á5Í½ÕÉ”ìÉ•™•É•¹”‘•½‘¥¹œÉ•ÅÕ¥É•Ì‰É½ÝÍ•ÈÉ•…Ñ•%µ…•	¥Ñµ…À¸(((ŒŒ€¸ààÄ…Ñ¥Ù”µ½‰©•ÐUX%µ…”ÍÕÉ™…”ƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mát€¸ààÀA•É™•ÐAMLÁÉ½Ñ•Ñ•è¥µ…”É•™•É•¹”½½É¥•¹Ñ…Ñ¥½¸½A•¹¥°½¡½½Í•È½ÁÉ½©•ÐÁ•ÉÍ¥ÍÑ•¹”¸(´mátM¥¹±”µÕÍ•½Á…ÅÕ”¥µ…”½µ…Ñ•É¥…°½Í…µÁ±•ÈÕ…É‘Ì°½‘•Œ½É•Í½ÕÉ”É•…µ½¹±ä¥‘•¹Ñ¥Ñä¸(´mátI•…°Q¡É•”Í½ÕÉ”UYÌ°XÀ½É¥•¹Ñ…Ñ¥½¸°ÍI½±¥¹•…È™…Ñ½È°ÝÉ…À½™¥±Ñ•È½‘½Õ‰±”µÍ¥‘”µ…ÁÁ¥¹œ¸(´mát=É¥¥¹…°Í½ÕÉ”•½µ•ÑÉä½Á¥­¥¹œÉ•Ñ…¥¹•ì•½µ•ÑÉä½µ…Ñ•É¥…°½Ñ•áÑÕÉ”½‰¥Ñµ…À‘¥ÍÁ½Í•½¹”¸(´mátÍå¹Œ…¹•±±…Ñ¥½¸µ‰•™½É”µÍÑ…ÉÐ°±…Ñ”É•ÍÕ±ÑÌ°‘•½‘”™…¥±ÕÉ”…¹µ½‘”½É•‰Õ¥±±•…¹ÕÀ¸(´mátÑÕ…°É•¹‘•È…Ñ¥Ù”µ½¹±ä½	…Í”Õ…É‘Ì°¥¹…Ñ¥Ù”M½±¥°UXÍ•ÍÍ¥½¸É•™É•Í …¹±½½¬É•ÍÑ½É…Ñ¥½¸¸(´mát9…Ñ¥Ù”9=4½ÁÉ½©•Ð½¥µ…”‰åÑ•Ì…¹1UYÌÉ•Ñ…¥¹•ì™Õ±°±½…°ÈÌäÙAML¼Á%0¼ÁÍ­¥À¸(´mátM¥¹±”µµ…Ñ•É¥…°Ñ•áÑÕÉ•1½MÕ‰½™˜ƒŠHY%_ŠIUX%µ…”è½±½ÕÈ¥µ…”½ÉÉ•Ñ±ä½É¥•¹Ñ•½¸…Ñ¥Ù”½‰©•Ðì½É‰¥Ð½Á…¸½Á¥¹ ¹½Éµ…°¸(´mátUX‘¥Ñ½ËŠIA•¹¥°5½Ù”½M…±”¥Í±…¹“ŠI	…¬Ñ¼ÍèÍÕÉ™…”ÕÁ‘…Ñ•ÌìU¹‘¼½I•‘¼É•ÍÑ½É•Ì±…å½ÕÐ¸(´mátY%_ŠIMÑÕ‘¥¼½M½±¥É•ÍÑ½É•Ì½É‘¥¹…Éä±½½¬¸MÝ¥Ñ …Ñ¥Ù”½‰©•Ðè½¹±ä…Ñ¥Ù”ÍÕÁÁ½ÉÑ•½‰©•ÐÉ••¥Ù•Ì¥µ…”¸(´mátA±…¥¸½¹…Ñ¥Ù”½µ¥á•µµ…Ñ•É¥…°½MÕ‰½‰©•ÑÌÉ•µ…¥¸M½±¥ì•á¥ÍÑ¥¹œUX¡•­•È…¹UX‘¥Ñ½È%µ…”ÍÑ¥±°Ý½É¬¸()Q•µÁ½É…ÉäÕ¹±¥Ð…Ñ¥Ù”	…Í”¥¹ÍÁ•Ñ¥½¸½¹±ä°½¹”½Á…ÅÕ”•µ‰•‘‘•A9½)AUXÀµ…Ñ•É¥…°°+Š&á5Í½ÕÉ”¼ÄÀÈÓ
È‰¥Ñµ…À¼ÈÁ¬½É¹•ÉÌ¸9¼Á…¥¹Ñ¥¹œ½ÈÁ•ÉÍ¥ÍÑ•¹Ðµ…Ñ•É¥…°½•áÁ½ÉÐ¡…¹•Ì¸(((ŒŒ€¸ààÈ•á…Ð™…”µµ…Ñ•É¥…°UX%µ…”ƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mátUÍ•ÈààÄAIPAMLÁÉ½Ñ•ÑÌ…Ñ¥Ù”µ¥µ…”½¹…Ù¥…Ñ¥½¸½A•¹¥³ŠIÍÕÉ™…”½¡¥ÍÑ½Éä½±½½¬É•ÍÑ½É…Ñ¥½¸¸(´mátÑÕ…°1Q1½…‘•È½Á…ÉÍ•È…ÍÍ½¥…Ñ¥½¹ÌÁÉ•Í•ÉÙ”É•Ù•ÉÍ•%ÌÝ¥Ñ ¥‘•¹Ñ¥…°µ…Ñ•É¥…°¹…µ•ÌÑ¡É½Õ ±½¥…°µ•É”½Ý•±½ÅÕ…¥µÁ½ÉÐ¸(´mátI•µ½Ù•µ™…”%Ì‘É½À½ÉÉ•Ñ±äìÉ½ÍÌµµ…Ñ•É¥…°•ÅÕ…°µ¹…µ”ÑÉ¥…¹±•Ì…¹¹½Ðµ•É”ìÍ…µ”µµ…Ñ•É¥…°ÅÕ…Á…Ñ É•Ñ…¥¹•¸(´mátá…Ð½ÁÑ¥½¹…°Á…å±½…µ…ÁÁ¥¹œ½Í¥¹…ÑÕÉ”ÍÕÉÙ¥Ù•Ì•á¥ÍÑ¥¹œ½‘•Œì±•…ä™¥±•Ì¹•Ù•ÈÕ•ÍÌ…ÍÍ¥¹µ•¹ÑÌ¸(´mát=É¥¥¹…°ÁÉ•Ù¥•Ü•½µ•ÑÉäµ…Ñ•É¥…°Í±½ÑÌ…±¥¸Ý¥Ñ ÑÉ¥…¹±”Á½Í¥Ñ¥½¹Ì½UYÌìÍÑ…±”½‰…µ…ÁÌÉ•™ÕÍ”ì½É‘¥¹…Éä¡•­•È½•áÁ½ÉÐÉ½ÕÁ¥¹œÕ¹¡…¹•¸(´mátI•…°Q¡É•”µÕ±Ñ¤µÍ±½Ð¥µ…”½™…Ñ½È½Í…µÁ±•Èµ…ÁÁ¥¹œ°Í•É¥…°…±°µÉ•…‘ä‘¥ÍÁ±…ä°…¹•±±…Ñ¥½¸½™…¥±ÕÉ”½‰Õ‘•ÑÌ…¹•á…Ðµ½¹”‘¥ÍÁ½Í…°¸(´mátÑÕ…°¥±”1…±±‰…¬ÍÕÁÁ±¥•Ì…ÍÍ½¥…Ñ¥½¹Ìì•‘¥Ñ…‰±”=	(…±±‰…¬É•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ð¸(´mátÕ±°±½…°ÈÐÀÉAML¼Á%0¼ÁÍ­¥Àì…±°ÁÉ¥½ÈààÄ¼ààÀ¼àÜäÍ•µ…¹Ñ¥ŒÑ•ÍÑÌÉ•Ñ…¥¹•¸(´mátIM ¥µÁ½ÉÐ1Ý¥Ñ ËŠLÐ½Á…ÅÕ”•µ‰•‘‘•µ¥µ…”µ…Ñ•É¥…±Ì°MÁ±¥ÐÉ½ÕÁÌ=½MÕ‰=ƒŠHUX%µ…”è‘¥ÍÑ¥¹Ð¥µ…•Ì½ÕÁä½ÉÉ•Ð™…”…É•…Ì¸(´mátA•¹¥°UX•‘¥ÓŠI	…¬Ñ¼ÍÕÁ‘…Ñ•Ì…™™•Ñ•…É•…ÌìU¹‘¼½I•‘¼É•ÍÑ½É•ÌÑ¡•´¸=É‰¥Ð½Á…¸½Á¥¹ Õ¹¡…¹•¸(´mátM…Ù”½=Á•¸€¹‰½á±…ˆÉ•Ñ…¥¹ÌµÕ±Ñ¤µµ…Ñ•É¥…°UX%µ…”…ÍÍ¥¹µ•¹ÐìÍÝ¥Ñ MÑÕ‘¥¼½M½±¥…¹‰…¬Í…™•±ä¸(´mátá¥ÍÑ¥¹œÍ¥¹±”µµ…Ñ•É¥…°1ÍÑ¥±°Ý½É­ÌìÕ¹ÍÕÁÁ½ÉÑ•½±•…äµ¥á•µµ…Ñ•É¥…°¥¹ÁÕÑÌÉ•µ…¥¸M½±¥¸()É•Í ¥µÁ½ÉÐÉ•ÅÕ¥É•™½È½±µ¥á•µµ…Ñ•É¥…°ÁÉ½©•ÑÌ¸Ñ¥Ù”	…Í”½¹±ä°µ…àÐ½Á…ÅÕ”)¥µ…”µ…Ñ•É¥…±Ì¼á5•¹½‘•…É•…Ñ”¼ÄÀÈÓ
ÈÁ•È‘•½‘”ì…±°µ½ÈµM½±¥¸9¼Á…¥¹Ñ¥¹œ½È)Á•ÉÍ¥ÍÑ•¹Ðµ…Ñ•É¥…°¡…¹•Ì¸á¥ÍÑ¥¹œµÕ±Ñ¤µµ…Ñ•É¥…°1=UQAUPÁ…Ñ¡•ÈÉ•Á…¥ÈÉ•µ…¥¹Ì)Í•Á…É…Ñ”ìààÈÁÉ•Ù¥•Ü½½‘•ŒÑ•ÍÑÌ‘¼¹½Ð±…¥´Ñ¡…Ð•áÁ½ÉÐÉ½ÕÑ”¥ÌÉ•Á…¥É•¸(((ŒŒ€¸ààÌ•á…Ð1µ…Ñ•É¥…°¡…¹‘½™˜ƒŠP‘•Ù¥”…Ñ”Á•¹‘¥¹œ((´mát€¸ààÈAMLÁÉ½Ñ•Ñ•¥¹±Õ‘¥¹œ¥¹Ñ•¹Ñ¥½¹…°…Ñ¥Ù”µ½¹±ä¥µ…”Ù¥•Üì¹…Ñ¥Ù”µ¥ÍÍ¥¹œµÑ•áÑÕÉ”É•Á½ÉÐ¥Ì„Í•Á…É…Ñ”™…¥±ÕÉ”¸(´mátÑÕ…°Q¡É•”1ÑÉ¥…¹±”½µ…Ñ•É¥…°½UXµ…ÁÁ¥¹œ…¹½É¥¥¹…°É½ÕÀÑ…‰±”½%ÌÉ•Ñ…¥¹•…É½ÍÌµ…Ñ•É¥…°ÍÁ±¥ÑÌ¸(´mát5Õ±Ñ¥Á±”½‰©•ÑÌÉ•Ñ…¥¸‘¥ÍÑ¥¹Ð±½‰…°µ…Ñ•É¥…°½Ñ•áÑÕÉ”‰…Í•Ì•Ù•¸Ý¥Ñ ¥‘•¹Ñ¥…°¹…µ•Ì¸(´mát¥¹…°•µ‰•‘‘•¥µ…”‰åÑ•Ì°™¥Ù”½É”Ñ•áÑÕÉ”Í±½ÑÌ½Í…µÁ±•ÉÌ½…±¥¹µ•¹ÐÙ•É¥™¥•ì9½‘”ÁÉ¥Ù…Ñ”Ù•É¥™¥…Ñ¥½¸¥¹ÁÕÐ…Ù½¥‘Ì¥µ…”‘•½‘¥¹œ½¹±ä¸(´mátM•±•Ñ•UX•‘¥Ð€¬É•Í½ÕÉ”ÁÉ½©•ÐÉ½Õ¹‘ÑÉ¥ÀÉ•Ñ…¥¹Ì•á…Ð1µ…Ñ•É¥…°µ…ÁÁ¥¹œ¸(´mát5¥ÍÍ¥¹œ½ÍÑ…±”½¥¹Ù…±¥½•Ù…±Õ…Ñ•µÕ±Ñ¤µµ…Ñ•É¥…°…ÍÍ¥¹µ•¹ÑÌÉ•™ÕÍ”ì™…¥±ÕÉ”±•…¹ÕÀ…¹ÍÕ‰Í•ÅÕ•¹ÐÙ…±¥•áÁ½ÉÐÁ…ÍÌ¸(´mátÕ±°±½…°ÈÐÀÝAML¼Á%0¼ÁÍ­¥Àì¹…Ñ¥Ù”9=4àØÔÝÉ¥Ñ•È½‘½¹½È…¹ÁÉ½Ñ•Ñ•½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸(´lt¥±”™½Éµ…Ð1€¬	…Í”ƒŠHáÁ½ÉÐ½M…Ù”ƒŠH9½µ…è½ÉÉ•Ð¥µ…”½¸•… …É•„Ý¥Ñ ½É¥¥¹…°™…•É½ÕÁÌ¸(´ltA•¹¥°UX•‘¥ÓŠI	…Í”1ŠI9½µ…É•Ñ…¥¹Ì¹•ÜUX±…å½ÕÐ…¹µ…Ñ•É¥…°Á±…•µ•¹Ð¸(´ltM…Ù”½=Á•¸€¹‰½á±…‹ŠI	…Í”1É•Á•…ÑÌ½ÉÉ•Ñ±äì½É‘¥¹…ÉäÍ¥¹±”½Á±…¥¸1É•µ…¥¹Ì…•ÁÑ•¸((ŒŒ=A8¹…Ñ¥Ù”¥±—ŠI9=5Ñ•áÑÕÉ”½µ¥ÍÍ¥½¸ƒŠPÕÍ•ÈÉ•Á½ÉÐÈÀÈØ´ÄÀ´ÄØ((´mátUÍ•È•áÁ±¥¥Ñ±ä½¹™¥ÉµÌ¹…Ñ¥Ù”¥±—ŠI9=5€ ¹¹½´¤°¹½Ð1ìUYÌÍÕÉÙ¥Ù”°¥µ…•Ì‘¼¹½Ð¸(´mátÕ‘¥ÐÁÉ½Ù•ÌÝÉ¥Ñ•ÈàØÔ±…­Ì¥µÁ½ÉÑ•¥µ…”Í•É¥…±¥é…Ñ¥½¸ì‘½¹½È¡…Ì¹¼Ñ•áÑÕÉ”½¥µ…”É•½É‘Ì¸(´mátUÍ•ÈÍÕÁÁ±¥•Ñ•áÑÕÉ•¹…Ñ¥Ù”‘½¹½ÈìààÐ…Õ‘¥ÑÌ•á…Ð¥µ…”½µ…Ñ•É¥…°½¡•…‘•È½¹Ù•¹Ñ¥½¹Ì¸(´mát¥ÉÍÐÍ¥¹±”µµ…Ñ•É¥…°½±½ÕÈµ¥µ…”¥µÁ±•µ•¹Ñ…Ñ¥½¸ààÐ™½±±½ÝÌ‘½¹½È½‰åÑ”½É•Í½ÕÉ”Ñ•ÍÑÌì™Õ±°A	H½Á•Èµ™…”¹…Ñ¥Ù”µ…Ñ•É¥…±ÌÉ•µ…¥¸Á•¹‘¥¹œ¸(´mátUÍ•ÈààÐAML…•ÁÑÌ¹…Ñ¥Ù”½±½ÕÈµ¥µ…”Ñ•áÑÕÉ•ÌÁ±ÕÌàØÔUYÌì…‘‘¥Ñ¥½¹…°µ…ÀÍ±½ÑÌÑÉ…­•Í•Á…É…Ñ•±ä¸((ààÌ1É•Á…¥È¥Ì9=P…•ÁÑ…¹”½É•Á…¥È½˜¹…Ñ¥Ù”Ñ•áÑÕÉ”•áÁ½ÉÐ¸¼¹½Ð¥¹™•È9=4)¥µ…”ÍÕÁÁ½ÉÐ™É½´1™¥¹…°µ‰åÑ”…ÍÍ•ÉÑ¥½¹Ì½È¹…Ñ¥Ù”UXµ½¹±äÑ•ÍÑÌ¸(((ŒŒ€¸ààÐ¹…Ñ¥Ù”½±½ÕÈµ¥µ…”•áÁ½ÉÐƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄØ((´mátI•…°‘½¹½ÈÍ¡•µ„½¡•…‘•ÈÜ½¥µ…”‘•ÍÉ¥ÁÑ½ÉÌ½µ…Ñ•É¥…°½±½ÕÈÍ±½Ð•áÑÉ…Ñ•°M!ÁÉ½Ù•¹…¹”É•½É‘•ì¹¼ÁÉ¥Ù…Ñ”Á¥á•±ÌÍ¡¥ÁÁ•¸(´mátÑÕ…°‘½¹½ÈÄ¸Ñ5)AÉ•Ñ…¥¹•‰åÑ”µ™½Èµ‰åÑ”Ñ¡É½Õ ¹…Ñ¥Ù”ÝÉ¥Ñ•È…Õ‘¥Ð¸(´mát=É¥¥¹…°A9½)A¥µ…”‰åÑ•Ì°¹…Ñ¥Ù”±¥¹­Ì½I™…Ñ½ÉÌ½…±¥¹µ•¹Ð½‰½Õ¹‘ÌìUX½•½µ•ÑÉä™¥•±‘ÌÕ¹¡…¹•¸(´mát5Õ±Ñ¥Á±”Í¥¹±”µµ…Ñ•É¥…°½±½ÕÉ•½Á±…¥¸½‰©•ÑÌ°¹…Ñ¥Ù”µ±½…°¥µ…”‘•‘ÕÀ°µ…Ñ•É¥…°½µ•Í ½™™Í•ÑÌ…¹½Õ¹ÑÌ½ÉÉ•Ð¸(´mátM•±•Ñ•UX•‘¥Ð€¬É•Í½ÕÉ”ÁÉ½©•ÐÉ½Õ¹‘ÑÉ¥ÀÉ•Ñ…¥¸¹…Ñ¥Ù”½±½ÕÈ‰åÑ•Ìì½É¥¥¹…°Í•¹”Á…å±½…Õ¹¡…¹•¸(´mátU¹Í…™”µ…Ñ•É¥…±Ì½UYÌ½Í…µÁ±•ÉÌ½µ¥ÍÍ¥¹œ½½Ù•ÉÍ¥é”½…É•…Ñ”¥µ…”‰Õ‘•ÐÉ•™ÕÍ”±•…É±ä¸(´mátQU0¥±”9=5…Ñ¥½¸‘½Ý¹±½…‘Ì€¹¹½´¥µ…”µ‰•…É¥¹œ‰åÑ•Ì…¹É•Á½ÉÑÌ½±½ÕÈ¥µ…”½Õ¹Ð¸(´mát9¼µ¥µ…”É•Ù¥Í¥½¸Ø½¹…Ñ¥Ù”UXÑ•ÍÑÌÉ•Ñ…¥¹•ì™Õ±°±½…°ÈÐÄÉAML¼Á%0¼ÁÍ­¥À¸(´mát=9½Á…ÅÕ”¥µ…”µµ…Ñ•É¥…°1°UXÀ½‘•™…Õ±ÐÉ•Á•…ÐÍ…µÁ±•È½MÕ‰½™˜ƒŠH¥±—ŠI9=5è¥µ…”Ù¥Í¥‰±”…¹½ÉÉ•Ñ±ä…±¥¹•¥¸9½µ…¸(´mátA•¹¥°µ•‘¥Ð½¹”¥Í±…¹ƒŠH¥±—ŠI9=5É•Ñ…¥¹Ìµ½Ù•UYÌ…¹¥µ…”ì½É¥¥¹…°•½µ•ÑÉä½™…•É½ÕÁÌÉ•Ñ…¥¹•¸(´mátM…Ù”½=Á•¸€¹‰½á±…ˆƒŠH¥±—ŠI9=5É•Á•…ÑÌì½É‘¥¹…ÉäÁ±…¥¸µ•Í¡•ÌÍÑ¥±°½Á•¸¹½Éµ…±±ä¸()%IMP=1=UHÍÑ…”½¹±ä¸9…Ñ¥Ù”¹½Éµ…°½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌ½‘¥ÍÁ±…•µ•¹Ð¥µ…”µ…ÁÌ…¹)Á•Èµ™…”µÕ±Ñ¥Á±”µ…Ñ•É¥…±Ì…É”9=P¥µÁ±•µ•¹Ñ•¸9…Ñ¥Ù”Ù¥ÍÕ…°ÍÕ•ÍÌ¥Ì¹½ÐÁÉ½Ù•¸)‰ä™¥¹…°µ‰åÑ”…ÍÍ•ÉÑ¥½¹ÌìÍ½ÕÉ—Š&á5°Ñ½Ñ…³Š&ÈÑ5°½‰Í•ÉÙ•¹…Ñ¥Ù”É•Ù¥Í¥½¸Ü™½È¥µ…•Ì¸(((ŒŒ€¸ààÔ¹…Ñ¥Ù”¹½Éµ…°€¬•µ¥ÍÍ¥Ù”µ…ÁÌƒŠPÍµ…±±•Èµ…Í”AMLì™Õ±°µµ…Ñ•É¥…°%0É•Í½±Ù•½¸ààÜ((´mátUÍ•ÈààÐAMLÁÉ½Ñ•Ñ•è¹…Ñ¥Ù”½±½ÕÈ¥µ…”½…±¥¹µ•¹Ð½A•¹¥°UXÉ•Á•…Ð½ÁÉ½©•ÐÉ•½Á•¸¸(´mátÕ±°µ…Ñ•É¥…°‘½¹½ÈÍ¡•µ„½ÁÉ½Ù•¹…¹”É•½É‘•ìÁÉ¥Ù…Ñ”Á¥á•±Ì½™¥±”¹½ÐÍ¡¥ÁÁ•¸(´mátM¡…É••µ‰•‘‘•µ¥µ…”½µ…Ñ•É¥…°Õ…É‘ÌÁÉ•Í•ÉÙ”ÁÉ¥½ÈààÃŠLààÐ¡½¥”½ÁÉ•Ù¥•Ü½¹…Ñ¥Ù”‰•¡…Ù¥½È¸(´mátI•…°¹…Ñ¥Ù”µ…ÀÍ±½ÑÌ°½É¥¥¹…°A9½)A‰åÑ•Ì°¹½Éµ…°Í…±”½‘•™…Õ±Ñd½¹Ù•¹Ñ¥½¸°•µ¥ÍÍ¥Ù”I½‘•™…Õ±ÑÌ¸(´mát9½Éµ…°µ½¹±ä½•µ¥ÍÍ¥Ù”µ½¹±äµ…Ñ•É¥…±ÌÝ½É¬Ý¥Ñ¡½ÕÐ™…­”½±½ÕÈ¥µ…•Ì¸(´mátÉ½ÍÌµÍ±½Ð½½‰©•Ð¥µ…”‘•‘ÕÀ°µ…Ñ•É¥…°±¥¹­Ì½½Õ¹ÑÌ½½™™Í•ÑÌ…¹Õ¹¡…¹•UX½•½µ•ÑÉä‰åÑ•Ì¸(´mátU¹ÍÕÁÁ½ÉÑ•Í½ÕÉ”½ÑÉ…¹Í™½É´½UX½Í…µÁ±•È½™…Ñ½È½‰Õ‘•ÑÌÉ•™ÕÍ”ìÍ½ÕÉ”É•Í½ÕÉ•ÌÕ¹¡…¹•¸(´mátÑÕ…°¥±”9=5…Ñ¥½¸€¬Í•±•Ñ•UX½ÁÉ½©•ÐÁ•ÉÍ¥ÍÑ•¹”€¬ÍÑ…ÑÕÌ½Õ¹Ñ•ÉÌÙ•É¥™¥•¸(´mátI•…°‘½¹½È¹½Éµ…°Ä°ÈÐà°àÜÉ…¹•µ¥ÍÍ¥Ù”È°ÜÔÑ¡…Í¡•ÌÉ•Ñ…¥¹•Ñ¡É½Õ ¹…Ñ¥Ù”ÝÉ¥Ñ•È…Õ‘¥Ð¸(´mátÕ±°±½…°ÈÐÄÝAML¼Á%0¼ÁÍ­¥Àì½É¥¥¹…°Ñ•ÍÑÌ½ÁÉ½Ñ•Ñ•½™É½é•¸½¹…Ñ¥Ù”‘½¹½ÈÉ•Ñ…¥¹•¸(´mát%µÁ½ÉÐ½¹”µµ…Ñ•É¥…°1Ý¥Ñ ¹½Éµ…°½•µ¥ÍÍ¥Ù”µ…ÁÌ°MÕ‰½™›ŠI¥±—ŠI9=5èÍ±½ÑÌÁ½ÁÕ±…Ñ•…¹Ù¥Í¥‰±”‰ÕµÀ½•µ¥ÍÍ¥½¸½ÉÉ•Ð¥¸9½µ…¸(´mátA•¹¥°UX•‘¥ÓŠI9=5­••ÁÌµ…À…±¥¹µ•¹Ðì½É¥¥¹…°½±½ÕÈµ¥µ…”‰•¡…Ù¥½ÈÉ•Ñ…¥¹•¸(´mátM…Ù”½=Á•¸€¹‰½á±…‹ŠI9=5É•Á•…ÑÌÝ¥Ñ ¹½Éµ…°½•µ¥ÍÍ¥Ù”É•Í½ÕÉ•Ì¥¹Ñ…Ð¸()µ¥ÍÍ¥Ù”•™™•Ð™½±±½ÝÌÍ½ÕÉ”I™…Ñ½È€¡‘•™…Õ±Ñ‰±…¬¤¸I½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌÁ…­•)¡…¹¹•°½¹Ù•ÉÍ¥½¸°‘¥ÍÁ±…•µ•¹ÐÍ½ÕÉ”‰¥¹‘¥¹œ…¹¹…Ñ¥Ù”Á•Èµ™…”µÕ±Ñ¤µµ…Ñ•É¥…±Ì)É•µ…¥¸Á•¹‘¥¹œ¸!Hµ…Ñ•É¥…°•áÑ•¹Í¥½¹ÌÉ•µ…¥¸Õ¹ÍÕÁÁ½ÉÑ•¥¸¹…Ñ¥Ù”µ…ÀÉ½ÕÑ”¸(((ŒŒ€¸ààØ¹…Ñ¥Ù”É½Õ¡¹•ÍÌ€¬µ•Ñ…±¹•ÍÌƒŠP™Õ±°µµ…Ñ•É¥…°‰±½­•ÈÉ•Í½±Ù•½…•ÁÑ•½¸ààÜ((´mátUÍ•ÈààÔAMLÁÉ½Ñ•Ñ•è¹½Éµ…°½•µ¥ÍÍ¥Ù”ÍÑÉ•¹Ñ¡Ì½…±¥¹µ•¹Ð½UX½ÁÉ½©•Ðì½±½ÕÈààÐ…¹¹…Ñ¥Ù”UXàØÔÉ•Ñ…¥¹•¸(´mát=É¥¥¹…°Á…­•É•˜É•Í½±Ù•È…¹¹…Ñ¥Ù”ÝÉ¥Ñ•ÈÉ•Ñ…¥¹•ìÉ••»ŠIÉ½Õ¡¹•ÍÌ½‰±Õ—ŠIµ•Ñ…±¹•ÍÌ°½É¥¥¹…°É•Í½±ÕÑ¥½¸°Í•Á…É…Ñ”‘½¹½ÈÍ±½ÑÌ½™…Ñ½ÉÌ¸(´mátÑÕ…°Á•ÈµÁ¥á•°Õ¹Á…­¥¹œ½Ù…±¥A9I­¥¹™±…Ñ”½¹…Ñ¥Ù”¥µ…”‰åÑ•Ìì•½µ•ÑÉä½UX™¥•±‘Ì…¹Í½ÕÉ”ÁÉ½©•ÐÉ•Í½ÕÉ•ÌÕ¹¡…¹•¸(´mát±°™¥Ù”½É”µ…ÀÍ±½ÑÌ½•á¥ÍÐìÍ½ÕÉ”µ‰Õ™™•È½¹Ù•ÉÍ¥½¸½¹”…É½ÍÌ½‰©•ÑÌì¹…Ñ¥Ù”‘•‘ÕÀ½½™™Í•ÑÌ½½Õ¹ÑÌ…¹™…Ñ½È‘•™…Õ±ÑÌÕ…É‘•¸(´mátM•±•Ñ•UX½ÁÉ½©•Ð½¹Ñ¥¹Õ¥Ñä…¹Í¹…ÁÍ¡½Ðµ‰•™½É”µ…Ý…¥Ð¥Í½±…Ñ¥½¸™É½´½¹½¥¹œÍ•¹”•‘¥ÑÌ¸(´mátM½ÕÉ”½UX½Í…µÁ±•È½™…Ñ½È½‰¥Ðµ‘•ÁÑ ½‘¥µ•¹Í¥½¹Ì½½É¥•¹Ñ…Ñ¥½¸½…±Á¡„½•¹½‘•­…É•…Ñ”‰Õ‘•ÑÌÉ•™ÕÍ”ì¹¼Í¥±•¹ÐÁ…­•µµ…À±½ÍÌ¸(´mát	¥Ñµ…À½…¹Ù…Ì±•…¹ÕÀ½¸™…¥±ÕÉ”ì)A¡•…‘•È¡•­Ì…¹=4…¹Ù…Ì½Ñ½	±½ˆ™…±±‰…¬ì‰É½ÝÍ•ÈÑÉ…¹ÍÁ½ÉÐ…‘…ÁÑ•¥¸9½‘”¸(´mátQU0¥±”9=5Ý…¥ÑÌ°‘½Ý¹±½…‘ÌÉ•…°¹…Ñ¥Ù”A9Ì°É•Á½ÉÑÌ½Õ¹ÑÌ…¹É•ÍÑ½É•Ì‰ÕÑÑ½¸½¸™…¥±ÕÉ”ìÁÉ¥½È…Ñ¥½¸Í•µ…¹Ñ¥ÌÉ•Ñ…¥¹•¸(´mátÕ±°±½…°ÈÐÈÑAML¼Á%0¼ÁÍ­¥ÀìÉ•Ù¥•Ý•…¡”É…Á ìÁÉ½Ñ•Ñ•µ½‘•±±¥¹œ½5Õ±Ñ¤½™É½é•¸‰•Ñ…Ì½¹…Ñ¥Ù”‘½¹½ÈÕ¹¡…¹•¸(´mát=¹”½Á…ÅÕ”µµ…Ñ•É¥…°1Ý¥Ñ Á…­•É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÏŠ&ÈÀÐã
È°MÕ‰½™›ŠI¥±—ŠI9=5èÍ•Á…É…Ñ”I½Õ¡¹•ÍÌ½5•Ñ…±¹•ÍÌÍ±½ÑÌ…¹½ÉÉ•Ð±½ÍÍä½µ…ÑÑ”½µ•Ñ…±±¥ŒÉ•¥½¹Ì¸(´mát½±½ÕÈ½¹½Éµ…°½•µ¥ÍÍ¥Ù”ÍÑ¥±°ÁÉ•Í•¹Ð…¹½ÉÉ•Ñ±ä…±¥¹•ìA•¹¥°¥Í±…¹•‘¥ÓŠI9=5É•Á•…Ð­••ÁÌ•Ù•Éäµ…À…±¥¹•¸(´mátM…Ù”½=Á•¸€¹‰½á±…‹ŠI9=5É•Á•…ÑÌÝ¥Ñ É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌµ…ÁÌ¥¹Ñ…ÐìÁ±…¥¸µ•Í ÍÑ¥±°½Á•¹Ì¹½Éµ…±±ä¸()½¹Ù•ÉÍ¥½¸ÍÕÁÁ½ÉÑÌ½Á…ÅÕ”àµ‰¥Ð•µ‰•‘‘•A9½)A°¹¼a%½•a%˜½É¥•¹Ñ…Ñ¥½¸µ•Ñ…‘…Ñ„°)UXÀ½‘•™…Õ±ÐÉ•Á•…ÐÍ…µÁ±•È°½¹”µ…Ñ•É¥…°Á•È½‰©•Ð¸M½ÕÉ—Š&á5°‘•É¥Ù•“Š&á5½¥µ…”°)¹…Ñ¥Ù”¥µ…”…É•…Ñ—Š&ÈÑ5¸9¼É•Í…µÁ±¥¹œ½…µµ„½™…Ñ½È‰…­¥¹œìÍ…±…ÈµÕ±Ñ¥Á±¥•ÉÌÍÑ½É•)¥¸¹…Ñ¥Ù”™…Ñ½ÉI½Õ¡¹•ÍÌ½5•Ñ…±¹•ÍÌ¸I•…°M…™…É¤½9½µ……ÁÁ•…É…¹”É•µ…¥¹Ì„‘•Ù¥”…Ñ”¸)¥ÍÁ±…•µ•¹Ð‰¥¹‘¥¹œ°¹…Ñ¥Ù”Á•Èµ™…”µ…Ñ•É¥…±Ì…¹9=4¥µÁ½ÉÐÉ•µ…¥¸Õ¹¥µÁ±•µ•¹Ñ•¸(((ŒŒ€¸ààÜ±…É”¹…Ñ¥Ù”½±½ÕÈ¥µ…”€¼ÁÉ½©•ÐÙ…±¥‘…Ñ¥½¸ƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄÜ((´mátUÍ•ÈààÔ%0ÍÉ••¹Í¡½ÐààØÉ•½É‘•ì•á…ÐU105QI%0¹±ˆM!½µ•Ñ…‘…Ñ„…Õ‘¥Ñ•¸…É±¥•ÈÍµ…±±•Èµ…ÀAML‰…Í•±¥¹•ÌÁÉ½Ñ•Ñ•°¹¼‰±…¹­•Ð™Õ±°µ™¥±”AML¸(´mát=É¥¥¹…°¥µÁ½ÉÑ•ÈÁ…å±½…É•ÁÉ½‘Õ•Ì™…¥±ÕÉ”èÄÄ°ÄÈÄ°ØÀÅ½±½ÕÈ•á••‘Ì¥¹¡•É¥Ñ•á5ÁÉ•Ù¥•ÜÕ…Éì½¹”½Á…ÅÕ”UXÀ½‘•™…Õ±ÐµÍ…µÁ±•Èµ…Ñ•É¥…°¥Ì½Ñ¡•ÉÝ¥Í”ÍÕÁÁ½ÉÑ•¸(´mát9…Ñ¥Ù”É…Ü½±½ÕÈ½¹½Éµ…°½•µ¥ÍÍ¥Ù”½ÁÐ¥¹Ñ¼•á¥ÍÑ¥¹œÈÑ5…É•…Ñ”ìÁÉ•Ù¥•Üá5¼ÄÀÈÓ
È…¹Á…­•á5¼ÈÀÐã
È±¥µ¥ÑÌÕ¹¡…¹•¸(´mátá…Ð½É¥¥¹…°¥µ…”‰åÑ•Ì°¹…Ñ¥Ù”Í±½ÑÌ½½™™Í•ÑÌ½½Õ¹ÑÌ½‘•‘ÕÀìÈÑ5‰½Õ¹‘…Éä½½Ù•ÉÍ¥é”½…É•…Ñ”½Á…­•µÁ½±¥äÕ…É‘Ì¸(´mát=É¥¥¹…°ÁÉ½©•Ð‰…Í”ØÐÙ…±¥‘…Ñ½È¹¼±½¹•È½Ù•É™±½ÝÌÍÑ…¬½¸±…É”¥µ…•ÌìÍÑÉ¥Ð…±Á¡…‰•Ð½Á…‘‘¥¹œ½…¹½¹¥…°‰¥ÑÌ½±•¹Ñ ½Á½½°½Ù•ÉÍ¥½¸¡•­ÌÉ•Ñ…¥¹•¸(´mátM•±•Ñ•UX½É•Í½ÕÉ”É•Á•…Ð€¬QU0¥±”9=5‘½Ý¹±½…‘•‰åÑ•Ì€¬QU0Á½½±•€¹‰½á±…ˆ=Á•¸¡…¹‘±•ÈÁ…ÍÌ¸(´mátÑÕ…°ÕÍ•Èµ™¥±”¹…Ñ¥Ù”…Õ‘¥ÐèÕ¹…Ñ¥Ù•¥µ…•Ì¼Ù™…•Ì¼ÄØ°ÌÄÀ°äÈÑ½ÕÑÁÕÐìÕ¹¡…¹•½±½ÕÈ½¹½Éµ…°½•µ¥ÍÍ¥Ù”¡…Í¡•Ì¸=™™±¥¹”Á…­•ÍÁ±¥Ð¥ÌA¥±±½Ü°¹½Ð‰É½ÝÍ•ÈÙ¥ÍÕ…°ÁÉ½½˜¸(´mátÑÕ…°Ôµ¥µ…”Á½½±•É•Í½ÕÉ”É½Õ¹‘ÑÉ¥ÀÈÔ°ÜÔÀ°ÔÔÕ•¹½‘•€¼Ää°ÌÀÜ°ØÜÁ‘•½‘•É•Ñ…¥¹Ì…±°Í½ÕÉ”‰åÑ•Ì¸(´mátÕ±°±½…°ÈÐÈáAML¼Á%0¼ÁÍ­¥ÀìÁ…É•¹Ð½¡¥±…¡”½¹ÑÉ…ÑÌÉ•Ù¥•Ý•ìÁÉ½Ñ•Ñ•µ½‘•±±¥¹œ½5Õ±Ñ¤½™É½é•¸‰•Ñ…ÌÉ•Ñ…¥¹•¸(´mátMÕÁÁ±¥•U105QI%0¹±ˆ°MÕ‰½™›ŠI¥±—ŠI9=5‘½Ý¹±½…‘ÌÍÕ•ÍÍ™Õ±±ä…¹½Á•¹Ì¥¸9½µ…Ý¥Ñ ½±½ÕÈ½¹½Éµ…°½•µ¥ÍÍ¥Ù”½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌÍ±½ÑÌ¥¹Ñ…Ð¸(´mátA•¹¥°µ•‘¥Ð½¹”UX¥Í±…¹“ŠI9=5É•Ñ…¥¹Ì…±¥¹µ•¹Ð½˜…±°ÍÕÁÁ½ÉÑ•µ…ÁÌ¸(´mátM…Ù”½=Á•¸Ñ¡¥ÌÑ•áÑÕÉ•€¹‰½á±…ˆÁÉ½©•ÓŠI9=5É•Á•…ÑÌÝ¥Ñ¡½ÕÐÙ…±¥‘…Ñ¥½¸•ÉÉ½ÉÌì½É‘¥¹…ÉäÍµ…±°½Á±…¥¸µ•Í¡•ÌÍÑ¥±°•áÁ½ÉÐ¸()1…É”µ¥µ…”ÁÉ•Ù¥•Üµ…äÍÑ…äM½±¥Õ¹‘•ÈÕ¹¡…¹•‘¥ÍÁ±…ä‰Õ‘•Ðì¹…Ñ¥Ù”•áÁ½ÉÐ‰åÑ”)½Áä‘½•Ì¹½ÐÉ•ÅÕ¥É”É•¹‘•É¥¹œÑ¡…Ð¥µ…”¸=Á…¥Ñä½‘¥ÍÁ±…•µ•¹ÐÍ±½ÑÌÉ•µ…¥¸Á•¹‘¥¹œì)±…Ñ•ÍÐ½Á…ÅÕ”9=4‘½¹½È½¹™¥ÉµÌ½Á…¥ÑäMQ=I½¹±ä°1¹…µ”µ½¹±ä•áÑÉ…Ì¹••…Õ‘¥Ð¸(((ŒŒ€¸ààà•áÁ±¥¥Ð9½µ…‘¥ÍÁ±…•µ•¹Ðµ…ÀƒŠP%0èÈÑ5¥µ…”‰Õ‘•Ð½¸‘•Ù¥”((´mátUÍ•ÈààÜAMLÁÉ½Ñ•ÑÌ•á…ÐU105QI%0¹…Ñ¥Ù”™¥Ù”µµ…À•áÁ½ÉÐ°A•¹¥°UXÉ•Á•…Ð…¹±…É”€¹‰½á±…ˆM…Ù”½=Á•¸ìÁÉ¥½ÈààÔ¼ààØÉ•Á½ÉÑ•‰±½­•ÈÉ•Í½±Ù•™½ÈÑ¡¥Ì…Í”¸(´mátA…¥É•1½9=4•áÁ±¥¥ÐÍ±½ÐÉ•™•É•¹”…¹Í…µ”Ø°ÈÀÀ°ÐÔÁÄØµ‰¥ÐA9M!ÁÉ½Ù•¸ìµ•Ñ…‘…Ñ„µ½¹±äÁÉ½Ù•¹…¹”™¥áÑÕÉ”°¹¼ÁÉ¥Ù…Ñ”Á¥á•±ÌÍ¡¥ÁÁ•¸(´mát9¼¥µ…”µ¹…µ”µ½¹±äÕ•ÍÍ¥¹œè•áÁ±¥¥ÐÙ•ÉÍ¥½¸Ä9½µ…‘¥ÍÁ±…•µ•¹ÐÍ±½Ð€¬Õ¹¥ÅÕ”•á…Ð¥µ…”‘•™¥¹¥Ñ¥½¸€¬Õ¹¥ÅÕ”½É”Ñ•áÑÕÉ”±¥¹¬É•ÅÕ¥É•¸(´mát=É¥¥¹…°ÄØµ‰¥Ð¥µ…”‰åÑ•Ì½5%5½½™™Í•ÑÌ°¹…Ñ¥Ù”Í±½Ð½ÍÑÉ•¹Ñ ½µ¥‘Á½¥¹Ð½Ý½É±Í•ÑÑ¥¹œ°•½µ•ÑÉä­UX™¥•±‰åÑ•ÌÉ•Ñ…¥¹•ì¹¼‘•½‘”½É••¹½‘”½‰…­”¸(´mát5¥ÍÍ¥¹œ½…µ‰¥Õ½ÕÌ½Õ¹ÍÕÁÁ½ÉÑ•½¹½¸µUX½ÑÉ…¹Í™½Éµ•½Í…µÁ±•È½™…Ñ½È½ÍÑ…±”½•Ù…±Õ…Ñ•¥¹ÁÕÑÌÉ•™ÕÍ”ì•á¥ÍÑ¥¹œµ…Ñ•É¥…°½Í½ÕÉ”½Á½½°Õ…É‘ÌÉ•Ñ…¥¹•¸(´mát9…Ñ¥Ù”‘•‘ÕÀ¼ÈÑ5…É•…Ñ”¥¹±Õ‘•Ì‘¥ÍÁ±…•µ•¹ÐìÁ…­•½‘¥ÍÁ±…ä½±…É”É…ÜÍ½ÕÉ”‰Õ‘•ÑÌÕ¹¡…¹•¸(´mátM•±•Ñ•UX½ÁÉ½©•ÐÉ•Í½ÕÉ”½¹Ñ¥¹Õ¥Ñä°QU0¥±”9=5Í¥àµÍ±½Ð½ÕÑÁÕÐ½ÍÑ…ÑÕÌ…¹™…¥±ÕÉ”É•½Ù•Éäì¹¼Í•¹”½Í½ÕÉ”µÕÑ…Ñ¥½¸¸(´mátÑÕ…°ÕÍ•Èµ™¥±”½É•Í½ÕÉ”µÉ½Õ¹‘ÑÉ¥À…Õ‘¥ÐÈÈ°ÔÄÄ°ÜäÉ¹…Ñ¥Ù”™¥±”¼Ù¥µ…•Ì¼Ù™…•ÌÉ•Ñ…¥¹Ì½É¥¥¹…°½±½ÕÈ½¹½Éµ…°½•µ¥ÍÍ¥Ù”½‘¥ÍÁ±…•µ•¹Ð¡…Í¡•Ì…¹•á…Ð¹…Ñ¥Ù”Í…±…ÈÍ•ÑÑ¥¹Ì¸(´mátÕ±°±½…°ÈÐÌÍAML¼Á%0¼ÁÍ­¥Àì¹…ÉÉ½Ü…¡”É…Á É•Ù¥•Ý•ìÁÉ½Ñ•Ñ•µ½‘•±±¥¹œ½5Õ±Ñ¤½¹…Ñ¥Ù”‘½¹½È½™É½é•¸‰•Ñ„‰åÑ•ÌÉ•Ñ…¥¹•¸(´ltM…µ”U105QI%0¹±ˆ°MÕ‰½™›ŠI¥±—ŠI9=5è¥ÍÁ±…•µ•¹ÐÑ•áÑÕÉ”Í±½ÐÁ½ÁÕ±…Ñ•Ý¥Ñ Ñ¡”½É¥¥¹…°¥µ…”…¹Í…Ù•ÍÑÉ•¹Ñ ½µ¥‘Á½¥¹Ð½Ý½É±Í•ÑÑ¥¹œ¸(´lt½±½ÕÈ½¹½Éµ…°½•µ¥ÍÍ¥Ù”½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌÉ•µ…¥¸¥¹Ñ…ÐìA•¹¥°¥Í±…¹UX•‘¥ÓŠI9=5­••ÁÌ‘¥ÍÁ±…•µ•¹Ð…±¥¹•¸(´ltM…Ù”½=Á•¸€¹‰½á±…‹ŠI9=5É•Á•…ÑÌÝ¥Ñ ‘¥ÍÁ±…•µ•¹ÐÍ±½Ð½Í•ÑÑ¥¹Ì¥¹Ñ…Ðì½É‘¥¹…ÉäÍµ…±°½Á±…¥¸•áÁ½ÉÐÍÑ¥±°Ý½É­Ì¸()M±½Ð½Í•ÑÑ¥¹Ì¡…¹‘½™˜½¹±äè¹¼	½á1…ˆ‘¥ÍÁ±…•µ•¹Ð‘¥ÍÁ±…ä½•½µ•ÑÉä‰…­”½ÈÍÑÉ•¹Ñ )½µÁ•¹Í…Ñ¥½¸™½È¥µÁ½ÉÐµ™¥Ð½‰…­•½‰©•ÐÍ…±”¸ÄØµ‰¥Ð‰åÑ•ÌÉ•Ñ…¥¹••á…Ñ±ä¸áÁ±¥¥Ð)ÕÑ¼½UX€¬¥‘•¹Ñ¥ÑäÑ•áÑÕÉ”ÑÉ…¹Í™½ÉµÌ½¹±ä¸M•Á…É…Ñ”½Á…¥Ñä¥µ…”¥Ì…‰Í•¹Ð™É½´Ñ¡¥Ì)1ì¹…µ•µ‰ÕÐµµ¥ÍÍ¥¹œ½Á…¥Ñä¥Ì¹½Ð•Ù¥‘•¹”½˜ÕÍ…‰±”Á¥á•±Ì¸•¹•É¥Œ±Q‘¥ÍÁ±…•µ•¹Ð°)ÑÉ…¹ÍÁ…É•¹ä°¹…Ñ¥Ù”Á•Èµ™…”µ…Ñ•É¥…±Ì°Á…¥¹Ñ¥¹œ…¹9=4¥µÁ½ÉÐÉ•µ…¥¸±…Ñ•ÈÍÑ…•Ì¸(((ŒŒ€¸ààäÍ…±…ÈA9•¹½‘¥¹œ€¼¹…Ñ¥Ù”¥µ…”µ‰Õ‘•ÐÉ•Á…¥ÈƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄÜ((´mátUÍ•ÈàààÈÑ5%0É•½É‘•ì•…É±¥•È½™™±¥¹”A¥±±½Üµ•¹½‘•Í¥é”•ÍÑ¥µ…Ñ”‘¥¹½ÐÁÉ½Ù”Á±…Ñ™½É´A9½ÕÑÁÕÐ™¥ÑÌ¸ààÜAMLÁÉ½Ñ•Ñ•¸(´mát=É¥¥¹…°½¹Ù•ÉÑ•È¹½ÜÕÍ•ÌÉ•…°½¹”µ¡…¹¹•°àµ‰¥ÐA9•¹½‘•ÈÝ¥Ñ …‘…ÁÑ¥Ù”™¥±Ñ•ÉÌ½I½é±¥ˆì¹¼Á±…Ñ™½É´I	A9Í•É¥…±¥é…Ñ¥½¸°É•Í¥é”°…µµ„½È±½ÍÍä½µÁÉ•ÍÍ¥½¸¸(´mát%¹‘•Á•¹‘•¹Ð9½‘”I½¥¹™±…Ñ”½¥¹Ù•ÉÍ”µ™¥±Ñ•È¡•­ÌÁÉ•Í•ÉÙ”•Ù•Éä½Á¥á•°°‘¥µ•¹Í¥½¹Ì°™…Ñ½ÉÌ½Í½ÕÉ”É•Í½ÕÉ•Ìì‰½Õ¹‘Ì½µ¥ÍÍ¥¹œ½µÁÉ•ÍÍ¥½¸A$½™…¥±ÕÉ”±•…¹ÕÀÉ•Ñ…¥¹•¸(´mátá¥ÍÑ¥¹œààØÑ•ÍÑÌÉ•Ñ…¥¸Í•µ…¹Ñ¥Ì…¹ÕÍ”…ÑÕ…°ÁÉ½‘ÕÑ¥½¸A9‰åÑ•ÌìÁ±…Ñ™½É´•¹½‘•È…±±Ìé•É¼°=4…¹Ù…ÌÉ•…‘‰…¬™…±±‰…¬É•Ñ…¥¹•¸(´mátQU0¥±”9=5Í¥àµµ…À•áÁ½ÉÐ…ÐÉ•Á½ÉÑ•Í½ÕÉ”‰åÑ”Í¥é•ÌÕÍ•ÌÉ•…°ÁÉ½‘ÕÑ¥½¸½µÁÉ•ÍÍ¥½¸…¹™¥ÑÌÈÑ5ì½É¥¥¹…°½±½ÕÈ½¹½Éµ…°½•µ¥ÍÍ¥Ù”½‘¥ÍÁ±…•µ•¹Ð‰åÑ•ÌÉ•µ…¥¸•á…Ð¸(´mát9…Ñ¥Ù”ÈÑ5Õ…ÉÍÑ¥±°É•©•ÑÌ•á•ÍÌÍ½ÕÉ•Ì°É•Á½ÉÑÌÍ½ÕÉ•Ì½½¹Ù•ÉÑ•5¥€¬½‰©•Ð½Õ¹Ðì¹¼½¹Ñ•¹Ðµ‰…Í•‘•‘ÕÀ½È¥¹É•…Í•±¥µ¥ÑÌ¥µÁ±¥•¸(´mátÑÕ…°ÕÍ•È)AŠIÁÉ½‘ÕÑ¥½¸•¹½‘•ÈéÉ½Õ¡¹•ÍÌÈ°ÀÌÔ°ÔØá½µ•Ñ…±¹•ÍÌÄ°äÐà°ÈäÅì¥¹‘•Á•¹‘•¹ÐA¥±±½Ü‘•½‘”½¹™¥ÉµÌ…±°Á¥á•°‰åÑ•Ì¸(´mátÑÕ…°Í½ÕÉ”…ÍÍ•ÑÌ½¹…Ñ¥Ù”Á¥Á•±¥¹”…Õ‘¥Ðé¥µ…”Á…å±½…ÈÈ°ÔÔÜ°ÔÌÙ¼ÈÄ¸ÔÅ5¥Ý¥Ñ È°ØÀà°Èàá¡•…‘É½½´ì¹…Ñ¥Ù”™¥±”ÈÈ°ØÈä°äÔÙ¸	É½ÝÍ•È‘•½‘”½É•…‘‰…¬…‘…ÁÑ•ì¹¼‘•Ù¥”AML¥¹™•ÉÉ•¸(´mátÕ±°±½…°ÈÐÌÙAML¼Á%0¼ÁÍ­¥Àì¹…ÉÉ½Ü…¡”É…Á …¹ÁÉ½Ñ•Ñ•½™É½é•¸½Ý¹•ÉÌÉ•Ñ…¥¹•¸(´mátI•Í•ÐÍ•¹”ì¥µÁ½ÉÐU105QI%0¹±ˆ=9ìMÕ‰½™›ŠI¥±—ŠI9=5‘½Ý¹±½…‘ÌÝ¥Ñ¡½ÕÐÈÑ5•ÉÉ½È¸(´mát9½µ…Í¡½ÝÌ…±°Í¥àÍ±½ÑÌ¥¹±Õ‘¥¹œ½É¥¥¹…°ÄØµ‰¥Ð‘¥ÍÁ±…•µ•¹Ðì½±½ÕÈ½¹½Éµ…°½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌ½•µ¥ÍÍ¥Ù”…±¥¹µ•¹Ð…¹Í…Ù•‘¥ÍÁ±…•µ•¹ÐÍ•ÑÑ¥¹ÌÉ•Ñ…¥¹•¸(´mátA•¹¥°¥Í±…¹UX•‘¥ÓŠI9=5…¹M…Ù”½=Á•¸€¹‰½á±…‹ŠI9=5É•Á•…Ð¹½Éµ…±±ä¸()%˜½Ù•É‰Õ‘•ÐÉ•µ…¥¹Ì°…ÁÑÕÉ”½µÁ±•Ñ”Í½ÕÉ•Ì½½¹Ù•ÉÑ•½½‰©•Ð‰É•…­‘½Ý¸¸5Õ±Ñ¥Á±”)¥¹‘•Á•¹‘•¹Ð¥µÁ½ÉÑÌ…¸ÍÑ¥±°±•¥Ñ¥µ…Ñ•±ä•á••ÈÑ5ìÁ½½°‘•‘ÕÀ¥Ì‰Õ™™•È¥‘•¹Ñ¥Ñä¸)9¼Í½ÕÉ”Ñ•áÑÕÉ”É•‘ÕÑ¥½¸°‘¥ÍÁ±…•µ•¹Ð…µÁ±¥ÑÕ‘”½µÁ•¹Í…Ñ¥½¸½È	½á1…ˆ•½µ•ÑÉä‰…­”¸)=Á…¥Ñä…¹¹…Ñ¥Ù”µÕ±Ñ¤µµ…Ñ•É¥…°½9=4¥µÁ½ÉÐÉ•µ…¥¸Á•¹‘¥¹œ¸(((ŒŒ€¸àäÀ¥‘•¹Ñ¥…°¹…Ñ¥Ù”¥µ…”½¹Ñ•¹ÐƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄÜ((´mátUÍ•È€¸ààäAMLÁÉ½Ñ•ÑÌ½É¥¥¹…°™Õ±°µµ…Ñ•É¥…°Í¥àµ…ÁÌ°UX½ÁÉ½©•ÐÉ•Á•…Ðì€¸àààÉ•Á½ÉÑ•‰Õ‘•Ð…Í”É•Í½±Ù•‰äààä¸(´mátá¥ÍÑ¥¹œ¹…Ñ¥Ù”Ñ…‰±”½±…å½ÕÐÉ•Ñ…¥¹•ì¥‘•¹Ñ¥…°5%5½±•¹Ñ ½‰åÑ•ÌÍ¡…É”…É½ÍÌ¥¹‘•Á•¹‘•¹ÐÍ½ÕÉ”‰Õ™™•ÉÌì¹¼Í•¹”½¡¥ÍÑ½Éä½É•Í½ÕÉ”µÕÑ…Ñ¥½¸¸(´mátÑÕ…°9X½±±¥Í¥½¸‘½•Ì¹½Ð…±¥…ÌìÍÕ‰…ÉÉ…åÌ°5%5°‘¥™™•É•¹Ð¹…µ•Ì½•ÅÕ…°‰åÑ•Ì…¹Í…µ”¹…µ•Ì½‘¥™™•É•¹Ð‰åÑ•Ì½Ù•É•¸(´mátM…µ”¡•±Á•È½Ù•É¹Ì…Íå¹Œ‰Õ‘•Ð…¹¹…Ñ¥Ù”ÝÉ¥Ñ•Èì•ÅÕ…°Á…­•Í½ÕÉ•Ì½¹Ù•ÉÐ½¹”ì•ÅÕ…°½¹Ù•ÉÑ•Í±½ÑÌ½Õ¹Ð½¹”ì‘¥ÍÑ¥¹ÐÕ¹¥ÅÕ”Í½ÕÉ•ÌÍÑ¥±°É•™ÕÍ”…‰½Ù”ÈÑ5¸(´mátQU0¥±”9=5ÑÝ¼™Õ±°µÍ¥é”¥¹‘•Á•¹‘•¹ÐÍ¥àµµ…ÀÁ…å±½…‘Ì°™…Ñ½ÉÌ½¹…µ•Ì½UYÌ½¹…Ñ¥Ù”™¥•±‘Ì°ÁÉ½©•ÐÉ•½Á•¸…¹Í½ÕÉ”¥¹‘•Á•¹‘•¹”¸(´mát…É±¥•È‰Õ‘•Ð™¥áÑÕÉ•Ì¹½Ü½¹Ñ…¥¸‘¥ÍÑ¥¹Ð‰åÑ•Ìì…±°•á¥ÍÑ¥¹œÕ¹ÍÕÁÁ½ÉÑ•µµ…À½‰Õ‘•Ð…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸(´mátÕ±°9½‘”ÈÐÍÕ¥Ñ”ÈÐÐÁAML¼Á%0¼ÁÍ­¥Àì…ÑÕ…°ÍÕÁÁ±¥•Í½ÕÉ”µ¥µ…”…Õ‘¥ÐÑÝ¼½‰©•ÑÌ½Í¥à¥µ…•Ì¼ÈÈ°ÔÔÜ°ÔÌÙÁ…å±½…°•á…ÐÉ…Ü¡…Í¡•Ì…¹½¹”Á…­•‘•½‘”¸(´mát=Á…¥Ñä‘½¹½È…Õ‘¥Ñ•èÍ•Á…É…Ñ”ÄÀÈÓ
È½Á…¥Ñä¥µ…”…‰Í•¹Ð™É½´1ì•á¥ÍÑ¥¹œ½±½ÕÈ…±Á¡„½¹…Ñ¥Ù”½Á…¥Ñä™±…œÉ•Ñ…¥¹•°¹¼¥¹Ù•¹Ñ•Í•Á…É…Ñ”Í±½Ð½ÈÑÉ…¹ÍÁ…É•¹ä±…¥´¸(´mátI•Í•Ðì¥µÁ½ÉÐU105QI%0¹±ˆQ]%°µ½Ù”½¹”…Í¥‘”°MÕ‰½™˜ì¥±”9=5‘½Ý¹±½…‘Ì…¹½Á•¹ÌÑÝ¼½‰©•ÑÌÝ¥Ñ …±°Í¥àÍÕÁÁ½ÉÑ•µ…ÀÍ±½ÑÌ¸(´mátA•¹¥°µ•‘¥Ð½¹”½‰©•ÐÌUX¥Í±…¹ìÉ•Á•…Ð9=5•áÁ½ÉÐè¥¹‘•Á•¹‘•¹ÐUYÌ…¹µ…ÁÌÉ•µ…¥¸…±¥¹•½¸‰½Ñ ½‰©•ÑÌ¸(´mátM…Ù”½=Á•¸€¹‰½á±…ˆÑ¡•¸9=5É•Á•…ÑÌ¹½Éµ…±±äì½É¥¥¹…°Í¥¹±”µ¥µÁ½ÉÐ•áÁ½ÉÐÍÑ…åÌ½ÉÉ•Ð¸()U¹¥ÅÕ”µ¥µ…”ÈÑ5Á½½°…¹½É¥¥¹…°É…ÜÈÑ5½Á…­•á5¼ÈÀÐã
È½‘¥ÍÁ±…ä‰Õ‘•ÑÌÉ•µ…¥¸¸)9¼Í½ÕÉ”Ñ•áÑÕÉ”É•Í…µÁ±¥¹œ°µ…Ñ•É¥…°µ•É¥¹œ°•½µ•ÑÉä½UX½¡¥ÍÑ½Éä½­•É¹•°¡…¹•Ì¸((ŒŒ€¸àäÀÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()IÕ¹Ñ¥µ”Àá˜ÀÈÔÙ•˜ÔÐäÀÅ˜ÈÀÔÌÄÅˆÈÕäÍˆÀÑˆÌÈÔÁŒÈÜÐØìÑ•ÍÑ•ÑÉ•”)ŒÝ˜Í™äØÁ˜ØåˆàÙ‰‰„ÄÔÁˆÌÜÝŒàÐØÐÙ˜Äá•ÐÜ•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)ÑÕ…°9½‘”ÈÈ¸ÈÌ¸Ì$ÌàäàÔàÔÀäÜÀ½©½ˆÄÄÜÈÔÜÀÈÈÜÜÄMUMLÈÐÐÁAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌàäàÔàÔÀàÜÐ‰Õ¥±½‘•Á±½äMUML¸É•Í ±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ½É•½Ù•Éä½•áÁ½ÉÐµÁ…¹•°¼)Á…­•µ¡¥±½¹…Ñ¥Ù”µ½É”àäÀ°Õ¹¡…¹•Í…±…Èààä½‘¥ÍÁ±…•µ•¹Ðààà½ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À)…¹™É½é•¹	•Ñ„Üµ…É­•È…±°‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸%¹¥Ñ¥…°É•…‘ÌÁÉ••‘•‘•Á±½åµ•¹Ðì)™¥¹…°É…Á µ…Ñ¡•ÌàäÀ¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÁÉ½½˜¡…¹•Ì‘½Ì½¹±ä¸)UÍ•ÈààäAMLÁÉ½Ñ•Ñ•ìàäÀÑÝ¼µ¥¹‘•Á•¹‘•¹Ðµ¥µÁ½ÉÐ½UX½ÁÉ½©•Ð¹…Ñ¥Ù”‘•Ù¥”…Ñ”A9%9¸(((ŒŒ€¸àäÄUX9½Éµ…°€¼µ¥ÍÍ¥Ù”É•™•É•¹•ÌƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄÜ((´mátUÍ•ÈàäÀAMLÁÉ½Ñ•ÑÌÉ•Á•…Ñ•µ¥µÁ½ÉÐ¹…Ñ¥Ù”‘•‘ÕÀ°¥¹‘¥Ù¥‘Õ…°UYÌ…¹ÁÉ½©•ÐÉ•Á•…Ð¸(´mátá¥ÍÑ¥¹œ¡½½Í•È½É•Í½±Ù•È½½¹ÑÉ½±±•ÈÉ•ÕÍ•ì½ÁÑ¥½¹…°Í±½Ð±¥ÍÐ½¹±ä™½ÈUXÝ½É­ÍÁ…”°…±°‘•™…Õ±Ð½±½ÕÈµ½¹±ä½¹ÍÕµ•ÉÌÉ•Ñ…¥¹•¸(´mátá…Ð¥¹‘•à½Í½ÕÉ”‰¥¹‘¥¹œ°5…Ñ•É¥…°ƒ
Üµ…À±…‰•±Ì°UXÀ½A9½)A½•áÑ•¹Í¥½¸½µ¥ÍÍ¥¹œ½‰Õ‘•ÐÕ…É‘Ì°½É¥¥¹…°ÁÉ½©•Ð‰åÑ•ÌÕ¹¡…¹•¸(´mát=¹”ÄÀÈÓ
È‰¥Ñµ…À¼á5Í½ÕÉ”°Í…µ”Í•µ…¹Ñ¥ŒÍ±½Ð…É½ÍÌÉ•™É•Í ½Í¡…É•¥µ…”°ÍÑ…±”µ±…‰•°ÁÉ•Ù•¹Ñ¥½¸°…Íå¹Œ…¹•°½±…Ñ”½±½Í”±•…¹ÕÀ¸(´mátQU0Ý½É­ÍÁ…”¡½½Í•È…¹•±ÌA•¹¥°ÁÉ•Ù¥•ÜÝ¥Ñ¡½ÕÐ•‘¥Ð½¡¥ÍÑ½Éä°­••ÁÌÙ¥•Ü½Í•±•Ñ¥½¸°•á¥ÍÑ¥¹œÁÉ½©•Ñ¥½¸…¹%µ…”µ½™˜É•½Á•¸¸(´mátMÕÁÁ±¥•1…Õ‘¥ÐÉ•Í½±Ù•Ì½É¥¥¹…°¹½Éµ…°Ä¼Ä°ÈÐà°àÜÉ…¹•µ¥ÍÍ¥Ù”È¼È°ÜÔÑì±…É”½±½ÕÈÍÑ¥±°½‰•åÌ½É¥¥¹…°ÁÉ•Ù¥•Ü±¥µ¥Ð¸(´mátÕ±°ÈÐÐÍAML¼Á%0¼ÁÍ­¥ÀìÁ…É•¹Ð½¡¥±…¡”É…Á É•Ù¥•Ý•ìÁÉ½Ñ•Ñ•½™É½é•¸…¹¹…Ñ¥Ù”•áÁ½ÉÐ‰•¡…Ù¥½ÈÉ•Ñ…¥¹•¸(´mát5•Í !•…±Ñ €´øUYÌ€´ø=Á•¸UX‘¥Ñ½È€´ø%µ…”è¡½½Í”9½Éµ…°Ñ¡•¸µ¥ÍÍ¥Ù”ì¥µ…•Ì…±¥¸Ý¥Ñ UX½ÕÑ±¥¹•Ì¸(´mátA•¹¥°5½Ù”½M…±”½I½Ñ…Ñ”€¬U¹‘½I•‘¼…¹Á…¸½Á¥¹ Ý½É¬½Ù•È¡½Í•¸É•™•É•¹”ì	…¬Ñ¼Í½É•½Á•¸ÍÑ…ÉÑÌ%µ…”½™˜¸(´mátM…Ù”½=Á•¸€¹‰½á±…ˆÉ•Ñ…¥¹Ì…Ù…¥±…‰±”¥µ…”¡½¥•Ìì¥±”9=5ÍÑ¥±°•áÁ½ÉÑÌ…±°Í¥àÍÕÁÁ½ÉÑ•µ…ÁÌ½ÉÉ•Ñ±ä¸()I…Ü€ÉÉ•™•É•¹•Ìè¹½Éµ…°ÍÑÉ•¹Ñ ½•µ¥ÍÍ¥Ù”™…Ñ½È…¹A	H±¥¡Ñ¥¹œ…É”¹½Ð•Ù…±Õ…Ñ•¸)9¼Á…¥¹Ñ¥¹œ½Á…­•µ¡…¹¹•°½½Á…¥Ñä½‘¥ÍÁ±…•µ•¹Ð¥¹ÍÁ•Ñ¥½¸½È€Í¹½Éµ…°½•µ¥ÍÍ¥Ù”Í¡…‘¥¹œ¸((ŒŒ€¸àäÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()IÕ¹Ñ¥µ”ÈÜáˆÀÀÐÉˆÑ„ÄàÄÕ”ÄÜØÕ˜Øå•‘Å„ÈÐØÈàØÉ”ØØäìÑ•ÍÑ•ÑÉ•”)™‘˜ÐÑ„ÅˆàÙ”å™…„ÐÜÑ™”ÅˆÜàÕ”ÄÀÑ„ÜÁ„Á„ÄÉ„ÌÐ•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)ÑÕ…°9½‘”ÈÈ¸ÈÌ¸Ì$ÌàäàÜÔØØÄäÌ½©½ˆÄÄÜÈØÈÐÜÜÀÔÀMUMLÈÐÐÍAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌàäàÜÔØØØÈÐ‰Õ¥±½‘•Á±½äMUML¸É•Í ±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ½É•½Ù•Éä½5•Í¡!•…±Ñ ¼)Ý½É­ÍÁ…”½ÁÉ•Ù¥•Ü½ÍÕÉ™…”½É•¹‘•È½•áÁ½ÉÐ½¹…Ñ¥Ù”µÁ…É•¹ÐÉ…Á àäÄ°Í…±…Èààä°ÁÉ½Ñ•Ñ•)5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„Üµ…É­•È…±°‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸%¹¥Ñ¥…°É•…‘ÌÁÉ••‘•)‘•Á±½åµ•¹Ðì™¥¹…°½µÁ±•Ñ”É…Á µ…Ñ¡•ÌàäÄ¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹Ð¸)UÍ•ÈàäÀAMLÁÉ½Ñ•Ñ•ìàäÄUX9½Éµ…°½µ¥ÍÍ¥Ù”½A•¹¥°½ÁÉ½©•Ð½¹…Ñ¥Ù”‘•Ù¥”…Ñ”A9%9¸)AÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±äìÑ•ÍÑ•ÉÕ¹Ñ¥µ”‰åÑ•ÌÕ¹¡…¹•¸(((ŒŒ€¸àäÈUXI½Õ¡¹•ÍÌ€¼5•Ñ…±¹•ÍÌÉ•™•É•¹•ÌƒŠPÕÍ•ÈAMLÈÀÈØ´ÄÀ´ÄÜ((´mátUÍ•ÈàäÄAMLÁÉ½Ñ•ÑÌ9½Éµ…°½µ¥ÍÍ¥Ù”É•™•É•¹•Ì°A•¹¥°½¹…Ù¥…Ñ¥½¸½¡¥ÍÑ½Éä°%µ…”µ½™˜É•½Á•¸°ÁÉ½©•Ð½¹…Ñ¥Ù”•áÁ½ÉÐ¸(´mát=É¥¥¹…°¡½½Í•ÈÉ•Í½±Ù•Ì•á…ÐÁ…­•É•˜èÉ••¸´ùI½Õ¡¹•ÍÌ°‰±Õ”´ù5•Ñ…±¹•ÍÌì¹¼É•½½±ÕÍ¥½¸½¹…µ”¥¹™•É•¹”½™…Ñ½È‰…­¥¹œ½‘•™…Õ±Ð½±½ÕÈµ½¹ÍÕµ•È¡…¹”¸(´mátÑÕ…°€ðôÄÀÈÓ
È‘•½‘•ÈÉ•…‘‰…¬€´ø½Á…ÅÕ”É…åÍ…±”°½É¥¥¹…°Á¥á•°½É¥•¹Ñ…Ñ¥½¸°=™™ÍÉ••¸½=4™…±±‰…¬°¹¼A9½Í•½¹½ÕÑÁÕÐ‰¥Ñµ…À½ÈÍ½ÕÉ”µÕÑ…Ñ¥½¸¸(´mát	¥Ñµ…À±½Í•Ì½¸ÍÕ•ÍÌ½™…¥±ÕÉ”ìÍÉ…Ñ ½½ÕÑÁÕÐ…¹Ù…ÌÉ•Í•ÑÌ½¸½¹Ñ•áÐ½É•…½ÝÉ¥Ñ”½…±Á¡„½±…Ñ”µ…¹•°½¡½½Í•È½Í•ÍÍ¥½¸±•…¹ÕÀ¸(´mátQU0Ý½É­ÍÁ…”É…åÍ…±”Õ¹‘•È½É¥¥¹…°UXÁÉ½©•Ñ¥½¸°A•¹¥°…¹•±±…Ñ¥½¸½Ù¥•Ü½Í•±•Ñ¥½¸°É•½Á•¸…¹Õ¹¡…¹•É•Í½ÕÉ”‰åÑ•Ì¸(´mátÑÕ…°ÍÕÁÁ±¥•Á…­•)AÜÌÌ°ääÍÍ½ÕÉ”…Õ‘¥Ð°•Ù•ÉäÑÉ…¹ÍÁ½ÉÑ•ÄÀÈÓ
È½Á¥á•°Ù•É¥™¥•°½É¥¥¹…°¡…Í •á…Ðì‰É½ÝÍ•ÈÙ¥ÍÕ…°…Ñ”Í•Á…É…Ñ”¸(´mátÕ±°ÈÐÐÝAML¼Á%0¼ÁÍ­¥ÀìÉ•Ù¥•Ý•Á…É•¹Ð…¡”É…Á ì¹…Ñ¥Ù”µ…Ñ¡Ì½ÁÉ½Ñ•Ñ•½™É½é•¸½Ý¹•ÉÌÉ•Ñ…¥¹•¸(´mátUX‘¥Ñ½È€´ø%µ…”€´øI½Õ¡¹•ÍÌ€¡¤°Ñ¡•¸5•Ñ…±¹•ÍÌ€¡¤è‘¥™™•É•¹ÐÉ…åÍ…±”µ…ÁÌÕ¹‘•ÈUX½ÕÑ±¥¹•Ìì9½Éµ…°½µ¥ÍÍ¥Ù”ÍÑ¥±°…Ù…¥±…‰±”¸(´mátA•¹¥°UX•‘¥ÑÌ½U¹‘½I•‘¼…¹Á…¸½Á¥¹ Ý½É¬ìÍÝ¥Ñ¡¥¹œµ…ÁÌÁÉ•Í•ÉÙ•ÌÙ¥•Ü½Í•±•Ñ¥½¸ìÉ•½Á•¹¥¹œÍÑ…ÉÑÌ%µ…”½™˜¸(´mátM…Ù”½=Á•¸€¹‰½á±…ˆÉ•Ñ…¥¹Ì¡½¥•Ì…¹•‘¥Ñ•UYÌì¥±”9=5ÍÑ¥±°ÑÉ…¹Í™•ÉÌÍ¥àÍÕÁÁ½ÉÑ•µ…ÁÌ½ÉÉ•Ñ±ä¸()Q¡Õµ‰¹…¥°É…Üµ¡…¹¹•°É•™•É•¹•Ì°¹½ÐA	H±¥¡Ñ¥¹œ½È™Õ±°µÉ•Í½±ÕÑ¥½¸¹Õµ•É¥Œ…¹…±åÍ¥Ì¸)=¹”¡•±€ðôÄÀÈÓ
ÈÁÉ•Ù¥•Ü¼á5Í½ÕÉ”ìÑ•µÁ½É…ÉäÍ…±…È‰¥Ñµ…À½…¹Ù…Ì½É•…‘‰…¬‰½Õ¹‘•¸((ŒŒ€¸àäÈÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()IÕ¹Ñ¥µ”Øá•”É‘ˆØÑ‰˜ÝˆÍ‰Ù‰ˆÑ‘˜ÜÐÌÌÄÐÅ™•˜Ðá‘ˆÐÑ˜ÜìÑ•ÍÑ•ÑÉ•”)”ÙŒÁ„ÈÅŒÁ™ÐääÈÕ•ÔÔÝÐääÝ•‘‰ˆÕ™„É”Åˆàä•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)ÑÕ…°9½‘”ÈÈ¸ÈÌ¸Ì$ÌàääÄàÐÄÔää½©½ˆÄÄÜÈÜÔÜÈÄäÀØMUMLÈÐÐÝAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌàääÄàÐÄÄÐä‰Õ¥±½‘•Á±½äMUML¸É•Í ±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ½É•½Ù•Éä½5•Í¡!•…±Ñ ¼)Ý½É­ÍÁ…”½ÁÉ•Ù¥•Ü½ÍÕÉ™…”½É•¹‘•È½•áÁ½ÉÐ½¹…Ñ¥Ù”µÁ…É•¹ÐÉ…Á àäÈ°Í…±…Èààä°ÁÉ½Ñ•Ñ•)5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„Üµ…É­•È…±°‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì)ÕÉÉ•¹Ð¸UÍ•ÈàäÄAMLÁÉ½Ñ•Ñ•ìàäÈÉ…åÍ…±”½A•¹¥°½ÁÉ½©•Ð½¹…Ñ¥Ù”‘•Ù¥”…Ñ”A9%9¸)AÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±äìÑ•ÍÑ•ÉÕ¹Ñ¥µ”‰åÑ•ÌÕ¹¡…¹•¸(((ŒŒ€¸àäÌA…¬…±°UX¥Í±…¹‘ÌƒŠPÕÍ•ÈAMLÁÉ½Ñ•Ñ•((´mátUÍ•ÈàäÈAMLÁÉ½Ñ•ÑÌÍ…±…È½•…É±¥•Èµ…ÀÉ•™•É•¹•Ì°A•¹¥°½¹…Ù¥…Ñ¥½¸½¡¥ÍÑ½Éä…¹ÁÉ½©•Ð½¹…Ñ¥Ù”•áÁ½ÉÐ¸(´mát=É¥¥¹…°UX¥¹ÍÁ•Ñ½È½•‘¥Ð½¡¥ÍÑ½Éä½Ý¹•ÉÌìÝ¡½±”µ±…å½ÕÐÉ¥ÇŠLÄÈà¥Í±…¹‘Ì°È”½ÕÑ•Èµ…É¥¸½…ÁÌ°½µµ½¸Í…±”½½É¥•¹Ñ…Ñ¥½¸½É•±…Ñ¥Ù”‘•¹Í¥Ñä°‘•Ñ•Éµ¥¹¥ÍÑ¥Œ…¹É•Á•…Ð¹¼µ½À¸(´mát•½µ•ÑÉä½É•Í½ÕÉ•Ì½Á••ÉÌ½Í½ÕÉ”…ÉÉ…åÌÕ¹¡…¹•ì½¹”¹…Ñ¥Ù”U¹‘½I•‘¼¡•­Á½¥¹Ð°½±Ñ…¹•¹ÑÌÉ•Ñ¥É•ì½É¥¥¹…°ÑÉ…¹Í™½ÉµÌÕ¹¡…¹•¸(´mátMÑ…±”½½¹Ñ•áÐ½¥¹½µÁ±•Ñ”½±½­•½¡¥ÍÑ½Éä½é•É¼µ•áÑ•¹Ð½•áÑÉ•µ”½½±±…ÁÍ•˜ØÐ­˜ÌÈ•‘”É•™ÕÍ…°‰•™½É”µÕÑ…Ñ¥½¸ìÄÈà…±±½Ý•¼ÄÈäÉ•™ÕÍ•¸(´mátQU0Ý½É­ÍÁ…”­5•Í¡!•…±Ñ Ý½É­ÌÝ¥Ñ¡½ÕÐÍ•±•Ñ¥½¸°…¹•±ÌA•¹¥°°É•Ñ…¥¹ÌÍ•±•Ñ•µ•µ‰•ÉÍ¡¥À…¹ÕÍ•Ì½É¥¥¹…°Ù¥•Ü¥Ð½¸ÍÕ•ÍÌ¸(´mátÑÕ…°ÁÉ½©•Ð½‘•Œ½¹…Ñ¥Ù”9=4¥¹‘•Á•¹‘•¹ÐUX¥¹‘¥•Ì­˜ÌÈ½É¹•ÉÌ½Q¡É•”1UYÌ…¹Ñ…¹•¹ÐÉ•Ñ¥É•µ•¹Ð¸(´mátÕ±°ÈÐÔÉAML¼Á%0¼ÁÍ­¥Àì¹…ÉÉ½Ü…¡”É…Á É•Ù¥•Ý•ìÁÉ½Ñ•Ñ•½™É½é•¸½¹…Ñ¥Ù”½Ý¹•ÉÌÉ•Ñ…¥¹•¸(´mátÕ‰”€´ø5•Í¡!•…±Ñ UYÌ€´ø	½àUYÌ€´ø=Á•¸UX‘¥Ñ½È€´øA…¬…±°è¥Í±…¹‘Ì™¥ÐÝ¥Ñ …ÁÌ°Ý¡½±”É•ÍÕ±Ð™É…µ•¸(´mát5½Ù”„Í•±•Ñ•¥Í±…¹Ñ¡•¸A…¬…±°èÍ•±•Ñ¥½¸É•Ñ…¥¹•ìU¹‘½I•‘¼É•ÍÑ½É•Ì±…å½ÕÑÌìÉ•Á•…Ñ•A…¬…±°…‘‘Ì¹¼•áÑÉ„U¹‘¼ÍÑ•À¸(´mátM…Ù”½=Á•¸€¹‰½á±…ˆ…¹¥±”9=5	…Í”ÁÉ•Í•ÉÙ”Á…­•±…å½ÕÐ½Í•…µÌìA•¹¥°½¹…Ù¥…Ñ¥½¸½É•™•É•¹”¡½¥•ÌÍÑ¥±°Ý½É¬¸()5…¹Õ…°UX±…å½ÕÐ½Á•É…Ñ¥½¸è¥µ…•ÌÍÑ…ä™¥á•°Í¼Á…­¥¹œ¡…¹•ÌÑ•áÑÕÉ”Í…µÁ±¥¹œ¸)É¥‰½Õ¹‘¥¹œ‰½á•Ì½¹±äì¹¼½ÁÑ¥µ…°Á…­¥¹œ½Õ¹ÝÉ…À½Ý¥Ñ¡¥¸µ¥Í±…¹½Ù•É±…ÀÉ•Á…¥È½Á…¥¹Ñ¥¹œ¸((ŒŒ€¸àäÌÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()IÕ¹Ñ¥µ•‰‰ŒÁ”ÑˆÈÁÔÕ„ÐÝ™‰…Œå™„Í‘……„ÅˆÑ„ÁŒÈÈÙ„Í”ÀìÑ•ÍÑ•ÑÉ•”)•™àÉ‘™‘”ÐØÉ•„Ù”ÔÍ”Ý•ØÅ˜ÈÍá‰˜ÐÌÌÉ‘Œáˆ•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)ÑÕ…°9½‘”ÈÈ¸ÈÌ¸Ì$ÌäÀÀÌäàÀàÀÀ½©½ˆÄÄÜÌÄÈÔÐäØÔÜMUMLÈÐÔÉAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌäÀÀÌäàÀÈÀÔ‰Õ¥±½‘•Á±½äMUML¸É•Í ±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ½É•½Ù•Éä½5•Í¡!•…±Ñ ¼)Ý½É­ÍÁ…”½•‘¥ÐàäÌ°Õ¹¡…¹•¥¹ÍÁ•Ñ½ÈààÀ½ÁÉ•Ù¥•Ü½É•¹‘•È½¹…Ñ¥Ù”àäÈ°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À)…¹™É½é•¹	•Ñ„Üµ…É­•È…±°‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹Ð¸)UÍ•ÈàäÈAMLÁÉ½Ñ•Ñ•ìàäÌA…¬…±°½™É…µ¥¹œ½¡¥ÍÑ½Éä½ÁÉ½©•Ð½¹…Ñ¥Ù”UX‘•Ù¥”…Ñ”A9%9¸)AÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±äìÑ•ÍÑ•ÉÕ¹Ñ¥µ”‰åÑ•ÌÕ¹¡…¹•¸(((ŒŒ€¸àäÐMÁ¡•É”UYÌ€¡d¤ƒŠPÕÍ•ÈAMLÁÉ½Ñ•Ñ•((´mátUÍ•È€¸àäÌAMLÁÉ½Ñ•ÑÌA…¬…±°½™É…µ¥¹œ½Í•±•Ñ¥½¸½¡¥ÍÑ½Éä½ÁÉ½©•Ð½¹…Ñ¥Ù”•áÁ½ÉÐ…¹ÁÉ¥½ÈA•¹¥°½¹…Ù¥…Ñ¥½¸½µ…ÀÉ•™•É•¹•Ì¸(´mátM…µ”¹…Ñ¥Ù”UXÁÉ½©•Ñ¥½¸½¡¥ÍÑ½Éä½Ý¹•ÈìÉ½Õ¹dµÁ½±”ÍÁ¡•É”°•ÅÕ¥É•Ñ…¹Õ±…È±…å½ÕÐ°…±¥¹•Í•…´°Á•ÈµÝ•‘”Á½±”UYÌ°¹¼•½µ•ÑÉä¡…¹•Ì¸(´mátI•…°U¹‘½I•‘¼½É•Á•…Ð¹¼µ½À°½Áäµ½¸µÝÉ¥Ñ”Á••ÉÌ°	½àÉ•Á±…•µ•¹Ð…¹•á¥ÍÑ¥¹œA…¬…±°¸(´mát5¥¹¥µÕ´½½‘½‘•¹Í”É¥¹Ì°dÉ½Ñ…Ñ¥½¸½ÑÉ…¹Í±…Ñ¥½¸°™¥¹¥Ñ”¡Õ”½Ñ¥¹ä½½É‘¥¹…Ñ•ÌìÕ¹ÍÕÁÁ½ÉÑ•½¥¹Ù…±¥½½¹Ñ•áÐ½¡¥ÍÑ½ÉäÉ•™ÕÍ…±Ì‰•™½É”µÕÑ…Ñ¥½¸¸(´mátÑÕ…°5•Í¡!•…±Ñ …±±‰…¬½Í•ÍÍ¥½¸Õ…Éì…ÑÕ…°€¹‰½á±…ˆ°¹…Ñ¥Ù”9=4UXÁ½½°…¹Q¡É•”1Á½±”µÙ…É¥…¹ÐÁÉ•Í•ÉÙ…Ñ¥½¸¸(´mátÕ±°ÈÐÔÝAML¼Á%0¼ÁÍ­¥ÀìÉ•Ù¥•Ý•¹…ÉÉ½Ü…¡”É…Á ìÁÉ½Ñ•Ñ•½™É½é•¸½Ý¹•ÉÌÉ•Ñ…¥¹•¸(´mát‘MÁ¡•É”€´ø=‰©•Ð5•Í¡!•…±Ñ UYÌ€´øMÁ¡•É”UYÌ€¡d¤€´ø=Á•¸UX‘¥Ñ½Èè±…Ñ¥ÑÕ‘”±…å½ÕÐ¥¹Í¥‘”Ñ¥±”ì¡•­•È½ÍÕÉ™…”Í•…´…¹Á½±”…ÁÁ•…É…¹”¸(´mátA•¹¥°•‘¥Ð°A…¬…±°°U¹‘½I•‘¼°Á…¸½Á¥¹ É•µ…¥¸ÕÍ…‰±”ìÉ•Á•…ÐÁÉ½©•Ñ¥½¸…‘‘Ì¹¼É•‘Õ¹‘…¹ÐU¹‘¼¸(´mátM…Ù”½=Á•¸€¹‰½á±…ˆ…¹¥±”9=5	…Í”ÁÉ•Í•ÉÙ”Ñ¡”ÍÁ¡•É”UX±…å½ÕÐ½Í•…µÌ¸()ÅÕ¥É•Ñ…¹Õ±…ÈÁ½±”‘¥ÍÑ½ÉÑ¥½¸•áÁ•Ñ•¸I½Õ¹dµÁ½±”µ•Í¡•ÌÝ¥Ñ …±¥¹•±½¹¥ÑÕ‘”)É¥¹Ì½¹±äì¹¼•¹•É…°‘•™½Éµ•½EÕ…‘‰…±°Õ¹ÝÉ…À°Í•…´ÕÑÑ¥¹œ°Á…¥¹Ñ¥¹œ½È¹•Ü­•É¹•°¸((ŒŒ€¸àäÐÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()IÕ¹Ñ¥µ”ÈØÀàÄÝ™˜ØÜäÑ”ÐØÜÌÐÙ…ÌÙ‘àÔÐÌäÜá‘…˜ÑÌìÑ•ÍÑ•ÑÉ•”(ØÁˆå„äÔå…˜ÙˆÅŒÁ”ÀÑ‰˜ÜØÙ•„Å…•”àÈÈÔÌäÁ•‘„•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)ÑÕ…°9½‘”ÈÈ¸ÈÌ¸Ì$ÌäÀÀÔÄààÜÄÄ½©½ˆÄÄÜÌÄØÀäÌÌÔØMUMLÈÐÔÝAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌäÀÀÔÄààÐÈÐ‰Õ¥±½‘•Á±½äMUML¸É•Í Á½ÍÑ‘•Á±½åµ•¹Ð±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ¼)É•½Ù•Éä½5•Í¡!•…±Ñ àäÐ½•‘¥ÐàäÐ°Õ¹¡…¹•Ý½É­ÍÁ…”àäÌ½¥¹ÍÁ•Ñ½ÈààÀ½É•¹‘•ÈàäÈ°)ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„Üµ…É­•È…±°‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸%¹¥Ñ¥…°É•…‘Ì)ÁÉ••‘•‘•Á±½åµ•¹Ðì™¥¹…°½µÁ±•Ñ”É…Á µ…Ñ¡•ÌàäÐ¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì)ÕÉÉ•¹Ð¸UÍ•ÈàäÌAMLÁÉ½Ñ•Ñ•ìàäÐMÁ¡•É”±…å½ÕÐ½A•¹¥°½¡¥ÍÑ½Éä½ÁÉ½©•Ð½¹…Ñ¥Ù”UX)‘•Ù¥”…Ñ”A9%9¸AÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±äìÑ•ÍÑ•ÉÕ¹Ñ¥µ”‰åÑ•ÌÕ¹¡…¹•¸(((ŒŒ€¸àäÔÅÕ…±¥é”UX‘•¹Í¥ÑäƒŠP‘•Ù¥”…Ñ”Á•¹‘¥¹œ((´mátUÍ•È€¸àäÐAMLÁÉ½Ñ•ÑÌMÁ¡•É”UYÌ½Í•…µÌ°A•¹¥°½A…¬…±°½¡¥ÍÑ½Éä½¹…Ù¥…Ñ¥½¸½ÁÉ½©•Ð…¹¹…Ñ¥Ù”•áÁ½ÉÐ¸(´mát=É¥¥¹…°•‘¥Ð½¡¥ÍÑ½Éä½Ý½É­ÍÁ…”½Ý¹•ÉÌì…±°ÇŠLÄÈà¥Í±…¹‘Ì°Í…µ”Á½Í¥Ñ¥Ù”Õ¹¥™½É´Í…±”Á•È¥Í±…¹…‰½ÕÐÕ¹¡…¹••¹ÑÉ”°…Ù•É…”UXµ…É•„½	…Í”µ…É•„É…Ñ¥¼•ÅÕ…°ìÑ½Ñ…°UX…É•„ÁÉ•Í•ÉÙ•¸(´mát5¥ÉÉ½É¥¹œ½½É¥•¹Ñ…Ñ¥½¸½…ÍÁ•Ð½Í½ÕÉ”•½µ•ÑÉä½É•Í½ÕÉ•Ì½Á••ÉÌÉ•Ñ…¥¹•ìÑ…¹•¹ÐÉ•Ñ¥É•µ•¹Ð°½¹”¹…Ñ¥Ù”U¹‘½I•‘¼…¹É•Á•…Ð¹¼µ½À¸(´mátA±…¹…È½¹…Ù”½ÅÕ…½ÑÉ¥…¹±•Ì°µÕ±Ñ¤µ™…”¥Í±…¹‘Ì½™Õ±°µ•ÑÉ¥Ì‰•å½¹ÁÉ•Ù¥•Ü°¹½Éµ…±¥é•¡Õ”½Ñ¥¹ä•½µ•ÑÉäì¹½¹Á±…¹…È½‘••¹•É…Ñ”½¹½¹™¥¹¥Ñ”½ÍÑ…±”½¡¥ÍÑ½Éä½½¹Ñ•áÐ½½Õ¹Ð½½±±…ÁÍ”½•áÁ½ÉÐ½Ù•É™±½Ü½¹•ÜÍ•…´µ©½¥¸É•™ÕÍ…°¸(´mátÑÕ…°Ý½É­ÍÁ…”€¬5•Í¡!•…±Ñ Ý½É­ÌÝ¥Ñ¡½ÕÐÍ•±•Ñ¥½¸°…¹•±ÌÁ•¹‘¥¹œA•¹¥°ÁÉ•Ù¥•Ü°É•Ñ…¥¹ÌÍ•±•Ñ¥½¸…¹ÕÍ•Ì½É¥¥¹…°¥Ð½¸ÍÕ•ÍÌ¸(´mátÑÕ…°ÁÉ½©•Ð½‘•Œ°9=4¥¹‘•Á•¹‘•¹ÐUX¥¹‘¥•Ì½˜ÌÈ½É¹•ÉÌ…¹Q¡É•”1UX½Ñ…¹•¹ÐÉ•Ñ¥É•µ•¹Ð¸(´mátÕ±°ÈÐØÉAML¼Á%0¼ÁÍ­¥ÀìÉ•Ù¥•Ý•…¡”É…Á ìÁÉ½Ñ•Ñ•½™É½é•¸½Ý¹•ÉÌÕ¹¡…¹•¸(´ltÕ‰”€´ø	½àUYÌ€´ø=Á•¸UX‘¥Ñ½ÈìA•¹¥°M…±”½¹”¥Í±…¹±…É•È°ÅÕ…±¥é”‘•¹Í¥Ñäµ…­•ÌÍ¥‘•Ì½µÁ…É…‰±”……¥¸ìA…¬…±°Í•Á…É…Ñ•Ì¥Í±…¹‘Ì¸(´ltU¹‘½I•‘¼É•ÍÑ½É•Ì•… ÍÑ•ÀìÉ•Á•…Ñ•ÅÕ…±¥é”…‘‘Ì¹¼É•‘Õ¹‘…¹ÐU¹‘¼ìA•¹¥°½Á…¸½Á¥¹ …¹Í•±•Ñ•µ¥Í±…¹•‘¥Ñ¥¹œÍÑ¥±°Ý½É¬¸(´ltM…Ù”½=Á•¸€¹‰½á±…ˆ…¹¥±”9=5	…Í”ÁÉ•Í•ÉÙ”™¥¹…°‘•¹Í¥Ñä½±…å½ÕÐ½Í•…µÌ¸()±°µ¥Í±…¹UXµ…É•„Í…±¥¹œì¥µ…•Ì½•¹ÑÉ•Ì™¥á•Í¼½Ù•É±…ÁÌ½½ÕÑÍ¥‘”Ñ¥±”…¹¡…¹•)Í…µÁ±¥¹œ…É”Á½ÍÍ¥‰±”¸A…¬Í•Á…É…Ñ•±ä¸M…µ”Á¥á•°‘•¹Í¥Ñä…ÍÍÕµ•Ì•ÅÕ…°µ…ÀÉ•Í½±ÕÑ¥½¸ì)¹¼Ý¥Ñ¡¥¸µ¥Í±…¹ÍÑÉ•Ñ ½ÉÉ•Ñ¥½¸°Á…¥¹Ñ¥¹œ°‰…­¥¹œ°•¹•É…°Í•…´Õ¹ÝÉ…À½È¹•Ü­•É¹•°¸((ŒŒ€¸àäÔÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()IÕ¹Ñ¥µ”ÙˆÅ”ÀÀÌÌÈÑ”Õ”ààÍá„Á˜ÐØÈÕ„Å”Øå‰„ÀÌÌÙ™‘”ÜìÑ•ÍÑ•ÑÉ•”)äÜÉ™‘”Èá‰„ÍˆàÕÍ‘„ÜáŒÑ˜ÌÍ…™”Õ„äÝ„ÜÈÝ…Œ•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)ÑÕ…°9½‘”ÈÈ¸ÈÌ¸Ì$ÌäÀÀÔàÀäÀäÀ½©½ˆÄÄÜÌÄÜäÌäÀÄÐMUMLÈÐØÉAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌäÀÀÔàÀàÜÈÐ‰Õ¥±½‘•Á±½äMUML¸É•Í ±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ½É•½Ù•Éä¼)5•Í¡!•…±Ñ àäÔ½Ý½É­ÍÁ…”àäÔ½•‘¥ÐàäÔ°Õ¹¡…¹•¥¹ÍÁ•Ñ½ÈààÀ½É•¹‘•ÈàäÈ°)ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„Üµ…É­•È…±°‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸±°™½ÕÈ)½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹Ð¸UÍ•ÈàäÐAMLÁÉ½Ñ•Ñ•ìàäÔ‘•¹Í¥Ñä½A…¬½A•¹¥°½¡¥ÍÑ½Éä¼)ÁÉ½©•Ð½¹…Ñ¥Ù”UX‘•Ù¥”…Ñ”A9%9¸AÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±äìÑ•ÍÑ•)ÉÕ¹Ñ¥µ”‰åÑ•ÌÕ¹¡…¹•¸(((ŒŒQ•áÑÕÉ•A…¥¹Ð¥Í½±…Ñ••Ù…±Õ…Ñ¥½¸ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ°‘•Ù¥”…Ñ”Á•¹‘¥¹œ((´mátá…Ð5%PÕÁÍÑÉ•…´½µµ¥Ð½Í½ÕÉ”½¡…Í ½±¥•¹”É•Ñ…¥¹•ìÁ¥á•°µ±•Ù•°½É¥¥¹…°É½ÜµÝÉ…À…¹‘•ÍÑÉÕÑ¥Ù”Ñ•áÑÕÉ”µÉ•Í•Ð‘•™•ÑÌÉ•ÁÉ½‘Õ•¸(´mát‘…ÁÑ•È±¥ÁÌad°ÍI‰åÑ•Ì½™…±±½™˜½ÁÉ•ÍÍÕÉ”½½Á…¥Ñä°¥µµ•‘¥…Ñ”Ñ•áÑÕÉ”¥¹Ù…±¥‘…Ñ¥½¸ìÉ•…°U¹‘½I•‘¼½…¹•°½¹¼µ½À°‰½Õ¹‘•Á¥á•°½¡¥ÍÑ½Éäµ•µ½Éä…¹±•…¹ÕÀ¸(´mátMÉ••¸µÍÁ…”É•Í…µÁ±¥¹œÉ…å…ÍÑÌ…ÑÕ…°Q¡É•”ÍÁ¡•É”ì¹¼±¥¹”¥¹Ñ•ÉÁ½±…Ñ•…É½ÍÌUX…Ñ±…Ìì¹•…É•ÍÐ™É½¹ÐÍÕÉ™…”¡¥Ð¸(´mátQÉ¥…°Í•Á…É…Ñ”™É½´	½á1…ˆÍ•¹”½¡¥ÍÑ½Éä½É•Í½ÕÉ•Ì½±½…‘•ÉÌìµ…¥¸€¸àäÔµ…É­•ÉÌ½Á¥¹Ì…¹ÁÉ½Ñ•Ñ•½™É½é•¸½‘”Õ¹¡…¹•¸9¼€¸àäÔÕÍ•ÈAML¥¹™•ÉÉ•¸(´mát¥Ù”¹•ÜÑ•ÍÑÌì™Õ±°ÈÐØÝAML¼Á%0¼ÁÍ­¥À¸Ù…±Õ…Ñ¥½¸É•Á½ÉÐÉ•½É‘Ì™¥Ð½±¥µ¥Ñ…Ñ¥½¹Ì…¹…ÕÑ¡½É¥Ñ…Ñ¥Ù”ÁÉ½‘ÕÑ¥½¸¥¹Ñ•É…Ñ¥½¸½Ý¹•ÉÌ¸(´ltQÉ¥…°èA•¹¥°Á…¥¹Ð…ÁÁ•…ÉÌ‘ÕÉ¥¹œµ½Ñ¥½¸ì½±½ÕÈ½É…‘¥ÕÌ½¡…É‘¹•ÍÌ½½Á…¥Ñä½ÁÉ•ÍÍÕÉ”ÕÍ…‰±”°™¥¹•ÉÌ½É‰¥Ð½Á…¸½Á¥¹ Ý¥Ñ¡½ÕÐÁ…¥¹Ð¸(´ltU¹‘½I•‘¼½…¹•°½I•Í•ÐÝ½É¬ì¥¹ÍÁ•ÐÍÁ¡•É”Í•…´…¹A±…¹”Ñ•áÑÕÉ”‰½Õ¹‘…É¥•ÌìÉ•Á½ÉÐ‰±••½È±…Ñ•¹ä¸(´lt½Ý¹±½…A9¡…Ìµ…Ñ¡¥¹œ½±½ÕÉÌ½½É¥•¹Ñ…Ñ¥½¸ì	…¬Ñ¼	½á1…ˆ±•…Ù•Ì½É¥¥¹…°Í•¹”Õ¹¡…¹•¸()Y½±…Ñ¥±”Í…µÁ±”µµ•Í ÑÉ¥…°½¹±ä¸9¼±…å•ÉÌ½ÁÉ½©•Ð½9½µ…Á•ÉÍ¥ÍÑ•¹”°…ÑÕ…°	½á1…ˆ)µ•Í Á…¥¹Ð¥¹Ñ•É…Ñ¥½¸°Í•…´ÍÑ¥Ñ¡¥¹œ°Ý½É±µÍ¥é”‰ÉÕÍ ½ÈATµÍÑ…µÁ¥¹œ±…¥´¸((ŒŒQ•áÑÕÉ•A…¥¹Ð•Ù…±Õ…Ñ¥½¸ÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()Ù…±Õ…Ñ¥½¸½µµ¥Ð•ŒÝÁ˜ØØØÙ„ÝˆÜÜÄÍ‰•”ÀÝŒØÀÍ•„Á”äÜÙ•ˆÈØÌÐìÑ•ÍÑ•ÑÉ•”)˜ÄÉÀÐØÄÌäÙˆäá˜ààÍ…ˆÈÜåˆÜÈá‰‰ŒÙÔÄÉŒÔØ•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸¸)9½‘”ÈÈ¸ÈÌ¸Ì$ÌäÀÀØÜÐàÄÌÄ½©½ˆÄÄÜÌÈÀØÔàÜÈØMUMLÈÐØÝAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌäÀÀØÜÐÜØØÔ‰Õ¥±½‘•Á±½äMUML¸É•Í ±¥Ù”ÑÉ¥…°¥¹‘•à½½¹ÑÉ½±±•È½…‘…ÁÑ•È°)‰åÑ”µ•á…ÐÕÁÍÑÉ•…´Í½ÕÉ”½±¥•¹”…¹•Ù…±Õ…Ñ¥½¸É•Á½ÉÐµ…Ñ É•Á½Í¥Ñ½Éä¸5…¥¸)¥¹‘•à½Ù•ÉÍ¥½¸É•µ…¥¸‰åÑ”µ¥‘•¹Ñ¥…°€¸àäÔ¸I•¹‘•É•‰É½ÝÍ•ÈÙ•É¥™¥…Ñ¥½¸‘¥¹½Ð)½µÁ±•Ñ”ì¥A…A•¹¥°½¹…Ù¥…Ñ¥½¸½Í•…´½A9Ñ•ÍÑÌÉ•µ…¥¸Á•¹‘¥¹œ°¹¼‘•Ù¥”AML¥¹™•ÉÉ•¸)±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä‘½ÌÕÉÉ•¹Ð¸9•áÐ¥Ì¡…¹‘Ìµ½¸ÑÉ¥…°™••‘‰…¬‰•™½É”ÁÉ½‘ÕÑ¥½¸)Á…¥¹ÐÉ•Í½ÕÉ”½¡¥ÍÑ½Éä½•ÍÑÕÉ”¥¹Ñ•É…Ñ¥½¸¸AÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±ä¸(((ŒŒUXA…¥¹Ð¥¹Ñ•É…Ñ¥½¸…Õ‘¥ÐƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()UÍ•ÈÍ…åÌQ•áÑÕÉ•A…¥¹Ð‰ÉÕÍ ¹••‘ÌÝ½É¬‰ÕÐÁÉ½µ¥Í¥¹œìÉ•ÅÕ•ÍÑÌ…Õ‘¥Ð½˜Q•áÑÕÉ•A…¥¹Ð)…¹-±•­Ì…¹‘•±•…Ñ•ÌÉ•ÕÍ”µÙ•ÉÍÕÌµ¹•Ü‘•¥Í¥½¸¸9¼‰±…¹­•ÐÑÉ¥…°½È€¸àäÔAML¸)M•”‘½Ì½ÕØµÁ…¥¹Ðµ¥¹Ñ•É…Ñ¥½¸µ…Õ‘¥Ð´ÈÀÈØ´ÄÀ´ÄÜ¹µ¸Õ‘¥Ñ•	½á1…ˆµ…¥¸ÌÔÍ”äààÄ°)Q•áÑÕÉ•A…¥¹ÐÍ…˜á„ØÅ”…¹-±•­ÌŒÈÑ”äÜÜÄÉŒÄäääÈäÜØÀÈÔÀààÅ™™”É”ÈÔÈÌÍ”Ù¸)•¥Í¥½¸è	½á1…ˆµ½Ý¹•…É¡¥Ñ•ÑÕÉ”€¬Í•±•Ñ¥Ù”…ÑÑÉ¥‰ÕÑ•‰ÉÕÍ ½ÍÑÉ½­”½½µÁ½Í¥Ñ½È)É•ÕÍ”ì¹¼Ý¡½±•Í…±”•‘¥Ñ½È½¡¥ÍÑ½Éä½¥¹ÁÕÐ¥µÁ½ÉÐ°¹¼Q•áÑÕÉ•A…¥¹ÐÉÕ¹Ñ¥µ”‘•Á•¹‘•¹ä¸)-±•­ÌA•¸½É…Í•ÈÉ•……¹ÁÕÍ -±!¥ÍÑ½Éäì1…å•É½µÁ½Í¥Ñ½È¥Ì„Íµ…±±•È•áÑÉ…Ñ¥½¸)…¹‘¥‘…Ñ”¸MÉ••¸µÍÁ…”Íµ½½Ñ¡¥¹œ	=IÁ¥­¥¹œì¹¼UXÍÁ±¥¹”…É½ÍÌ¥Í±…¹‘Ì¸)Q¡É•”¥¹ÍÑÉÕµ•¹Ñ•ÕÁÍÑÉ•…´ÁÉ½‰•Ì½¹™¥É´…Ñ±…ÌµÍÁ…¹¹¥¹œ	•é¥•Èµ…É­Ì€ ÄØÈ¤°)Íµ½½Ñ¡¥¹œÁ½Í¥Ñ¥½¸½ÁÉ•ÍÍÕÉ”…¹½µÁ½Í¥Ñ½È…±°½É‘•Èì¹¼É•¹‘•É•Á¥á•°½Á•É˜ÁÉ½½˜¸)á¥ÍÑ¥¹œ™½ÕÍ•ÑÉ¥…°½É•±•…Í”Ñ•ÍÑÌÄÁAML¼Á%0¼ÁÍ­¥Àì¹½Ð„¹•Ü™Õ±°µÍÕ¥Ñ”ÉÕ¸¸)9…Ñ¥Ù”É•Í½ÕÉ”ØÌÉ•µ…¥¹ÌUXµ½¹±äì‘•Í¥¸Á…¥¹ÐÉ•Í½ÕÉ”½½‘•Œ½=\½¡¥ÍÑ½Éä•áÁ±¥¥Ñ±ä¸)9•áÐ¹…ÉÉ½Ü‰Õ¥±è¥Í½±…Ñ•¥‘•¹Ñ¥…°µÍÑÉ½­”½µÁ…É¥Í½¸½¸	½á1…ˆµ•¹•É…Ñ•UX•½µ•ÑÉä°)½¹”½±½ÕÈ±…å•Èì‰•¹¡µ…É¬…‘…ÁÑ•-±•­ÌÙÌÍ¥µÁ±”	½á1…ˆ‰ÉÕÍ ‰•™½É”±¥Ù”¥¹Ñ•É…Ñ¥½¸¸)9¼ÕÁÍÑÉ•…´Í½ÕÉ”¥µÁ½ÉÑ•°¹¼ÉÕ¹Ñ¥µ”½Á¥¸½Ù•ÉÍ¥½¸½™É½é•¸¡…¹•Ìì€¸àäÔÉ•µ…¥¹Ì±¥Ù”¸)9¼¹•Ü¡…¹‘Ìµ½¸Ñ•ÍÐÉ•ÅÕ¥É•™½ÈÑ¡¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±ä…Õ‘¥Ð¸á¥ÍÑ¥¹œ‘•Ù¥”…Ñ•Ì)É•µ…¥¸Á•¹‘¥¹œìÕÍ•È™••‘‰…¬¥ÌÅÕ…±¥Ñ…Ñ¥Ù”¸Õ±°É•Á½ÉÐ…ÉÉ¥•Ì¥¹Ñ•É…Ñ¥½¸½…•ÁÑ…¹”Á±…¸¸((ŒŒ€¸àäØUXA…¥¹Ð1…ˆƒŠPÕÍ•ÈAML°¹½Éµ…±Ì•á•ÁÑ¥½¸É•Á…¥É•¥¸€¸àäÜ((´mát=É¥¥¹…°	½á1…ˆÁÉ¥µ¥Ñ¥Ù”½ÁÉ½©•Ñ¥½¸½UX•½µ•ÑÉä‰Õ¥±‘•È…¹…ÑÕ…°Q¡É•”É…ä¡¥ÑÌ™½ÈMÁ¡•É”½Õ‰”½A±…¹”ì¹¼‘ÕÁ±¥…Ñ”ÑÉ¥…¹Õ±…Ñ½È¸(´mátá…Ð½±½ÕÈ½ÁÉ•ÍÍÕÉ”Í¥é”½½Á…¥Ñä…À½±¥ÁÁ¥¹œ½A9É½ÝÌ°Á…¥É•‰½Õ¹‘•¡¥ÍÑ½Éä°¹¼µ½À½I•‘¼½…¹•°½‘¥ÍÁ½Í…°¸(´mátMÉ••¸Í…µÁ±•ÉÌèÍÕ‰‘¥Ù¥Í¥½¸Á…É¥ÑäÝ¥Ñ¡¥¸Å”´ÄÈ°-±•­ÌÕÉÙ”Ñ…¥°½™¥¹¥Ñ”ÁÉ•ÍÍÕÉ”½‘…ˆ…Àì•Ù•Éä•µ¥ÑÑ•‘…ˆÉ…å…ÍÐ°¹¼UXÍÁ±¥¹”¸(´mátÑÕ…°½¹ÑÉ½±±•Èµ½Ù•µ•¹Ð½‘¥ÉÑäµ™É…µ”Á½±¥ä½U¹‘¼½±½ÍÐ…ÁÑÕÉ”°™¥¹•È½Á…±´½Ý¹•ÉÍ¡¥À°‘•µ¼…¹•°½‰±ÕÈ½É•Í•Ð½‘¥ÍÁ½Í…°°Í½ÕÉ”ÁÉ½Ù•¹…¹”…¹ÁÉ½‘ÕÑ¥½¸¥Í½±…Ñ¥½¸¸(´mátM•Ù•¸¹•ÜÑ•ÍÑÌì™Õ±°9½‘”ÈÐ€ÈÐÜÑAML¼Á%0¼ÁÍ­¥À¸	É½ÝÍ•ÈÑÉ…¹ÍÁ½ÉÐ…‘…ÁÑ•ì¹½ÐÉ•¹‘•É•½A•¹¥°ÁÉ½½˜¸(´mát¥±”ƒŠHUXA…¥¹Ð1…ˆì•µ¼Ñ¡•¸ÍÝ¥Ñ 	½á1…ˆÉ½Õ¹½-±•­ÌÕÉÙ”…¹½µÁ…É”Í¡…Á•Ì½±…œ€ ¸àäØÕÍ•ÈAML¤¸(´mátA•¹¥°Á…¥¹ÑÌ‘ÕÉ¥¹œµ½Ù•µ•¹ÐìÍ¥é”½¡…É‘¹•ÍÌ½½Á…¥Ñä½ÁÉ•ÍÍÕÉ—ŠIÍ¥é”ì™¥¹•ÉÌ½É‰¥Ð½Á…¸½Á¥¹ Ý¥Ñ¡½ÕÐÁ…¥¹ÐìÁ…¥É•U¹‘½I•‘¼…¹¥¹Ñ•ÉÉÕÁÑ•ÍÑÉ½­•ÌÉ•ÍÑ½É”½ÉÉ•Ñ±ä€ ¸àäØÕÍ•ÈAML¤¸(´mátM•±•Ñ•A9½	…¬Ñ¼	½á1…ˆ‰…Í•±¥¹”…•ÁÑ•¥¸€¸àäØì¥¹½¹Í¥ÍÑ•¹Ð½ÕÑÝ…ÉÍ…µÁ±”Ý¥¹‘¥¹œ¥Ì•áÁ±¥¥Ñ±ä•á•ÁÑ•…¹É•Ñ•ÍÑ•¥¸€¸àäÜ¸((ÔÄË
ÈÙ½±…Ñ¥±”Í…µÁ±”±…å•ÉÌ½¹±äìÉ•±½…½I•Í•Ð±•…ÉÌÑ¡•´¸9¼Á•ÉÍ¥ÍÑ•¹ÐÁÉ½©•Ð½¹…Ñ¥Ù”)Á…¥¹Ð°™Õ±°-±•­ÌA•¹	ÉÕÍ ½±…å•ÉÌ°Í•…´ÍÑ¥Ñ¡¥¹œ½Ý½É±É…‘¥ÕÌ½ÍµÕ‘”½A	H±…¥´¸€¸àäÔ)‘•¹Í¥Ñä…Ñ”É•µ…¥¹ÌÁ•¹‘¥¹œìÅÕ…±¥Ñ…Ñ¥Ù”Q•áÑÕÉ•A…¥¹Ð™••‘‰…¬¥Ì¹½Ð‰±…¹­•ÐAML¸((ŒŒ€¸àäØÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()IÕ¹Ñ¥µ”àÄàÜÅ”ÄÅ…„äàäÀÜÐÝ‰•„Å•˜ÌÌÜØäÑ„àØØÙ”Á•…ŒìÑ•ÍÑ•ÑÉ•”(ÀÄÄÀÈÐäàÌØÜÍÅÕÐÁ„Å™ŒÐÐá˜ÐÀÌÄÐäÅ‘‘™‘ˆµ…Ñ¡•Ì™•Ñ¡•µ…¥¸½±½…°•á…Ñ±ä¸)9½‘”ÈÈÑ½Á½±½ä$ÌäÀÄÜØÜÌàÐÌ½©½ˆÄÄÜÌÔÌÀÄÌÐÌäMUMLÈÐÜÑAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌäÀÄÜØÜÌÐØÈ‰Õ¥±ÄÄÜÌÔÌÀÄÐÜàÈ½‘•Á±½äÄÄÜÌÔÌÀäÐÌÀÄMUML¸)É•Í ±¥Ù”Í¡•±°½Ù•ÉÍ¥½¸…¹…±°ä±…ˆÍ½ÕÉ”½Ù•¹‘½È…ÍÍ•ÑÌ‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸)5…¥¸ÁÉ½Ñ•Ñ•µ½‘•±±¥¹œ½5Õ±Ñ¤½™É½é•¸‰•Ñ„‰åÑ•Ì…¹½É¥¥¹…°Q•áÑÕÉ•A…¥¹ÐÑÉ¥…°Õ¹¡…¹•¸)±½Õ¡É½µ”±½…‘Ì±…ˆµ½‘Õ±•Ì½U$‰ÕÐ]•‰0½¹Ñ•áÐÉ•…Ñ¥½¸™…¥±ÌìÕ¹¡…¹•½É¥¥¹…°)Q•áÑÕÉ•A…¥¹ÐÁ…”™…¥±Ì¥‘•¹Ñ¥…±±ä¸Q¡ÕÌÉ•¹‘•É•ÍÕÉ™…”½A•¹¥°½¹…Ù¥…Ñ¥½¸½A9‘•Ù¥”)…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ°¹½ÐÁ…ÍÍ•‰ä‰É½ÝÍ•È¥¹ÍÁ•Ñ¥½¸½È9½‘”…‘…ÁÑ•ÉÌ¸9¼±…¥´)½˜…¸¥A…]•‰0™…¥±ÕÉ”ìÑ¡¥Ì¥ÌÑ¡”½‰Í•ÉÙ•±½Õµ‰É½ÝÍ•È±¥µ¥Ñ…Ñ¥½¸¸9¼àäØÕÍ•ÈAML¸)½Õµ•¹Ñ…Ñ¥½¸ÁÉ½½˜¡…¹•Ì¹¼Ñ•ÍÑ•ÉÕ¹Ñ¥µ”‰åÑ•Ì¸9•áÐèÕÍ•ÈÁ…¥É•µ‰ÉÕÍ ½µÁ…É¥Í½¸°)Ñ¡•¸Í•±•Ñ•É•™¥¹•µ•¹Ð½É•Í½ÕÉ”½½‘•Œ½±½‰…°µ¡¥ÍÑ½ÉäÝ½É¬Á•È‘½Ì½ÕØµÁ…¥¹Ðµ±…ˆ´àäØ¹µ¸((ŒŒ€¸àäÜƒŠPÁÉ•Ù¥•ÜÝ¥¹‘¥¹œì€¸àäØÕÍ•ÈAML((´mátUÍ•ÈàäÙAMLÁÉ½Ñ•ÑÌ‰ÉÕÍ ½A•¹¥°½Í•ÑÑ¥¹Ì½¹…Ù¥…Ñ¥½¸½Á…¥É•U¹‘½I•‘¼½A9Ý½É­™±½ÜìÉ•Á½ÉÑ•Á…¥¹Ð¹½Éµ…±Ì•áÁ±¥¥Ñ±ä•á•ÁÑ•¸àäÔ‘•¹Í¥Ñä…•ÁÑ…¹”¹½Ð¥¹™•ÉÉ•¸(´mátÙ•ÉäMÁ¡•É”½Õ‰”ÁÉ•Ù¥•ÜÑÉ¥…¹±”…¹¹½Éµ…°½ÕÑÝ…ÉìÉ•…°™É½¹ÐµÍ¥‘•É…å…ÍÑÌ™É½´Í¥à‘¥É•Ñ¥½¹Ì¡¥Ð¹•…È•áÑ•É¥½È¸A±…¹”™É½¹ÐÉ•µ…¥¹ÌÙ¥Í¥‰±”¸(´mátQ¥±Ñ•½¹…Ù”½É•Ù•ÉÍ•Á½±å½¹ÌÉ•Ñ…¥¸M=UIÝ¥¹‘¥¹œ…¹•á…ÐUX½Á½Í¥Ñ¥½¸Á…¥É¥¹œì¹¼Í½ÕÉ”µÕÑ…Ñ¥½¹Ì°¹¼½¹Ù•àµ•¹ÑÉ”½ÕÑÝ…ÉÕ•ÍÌ¸(´mát=É‘¥¹…Éä•áÁ½ÉÐ‘•™…Õ±ÐÁ…Ñ ½•½µ•ÑÉäÕ¹¡…¹•ìÍ…µ”ÑÉ¥…¹±”½É¹•ÈÍ•ÑÌ¸Õ±°ÈÐÜÝAML¼Á%0¼ÁÍ­¥Àì‰ÉÕÍ ½­•É¹•°½™É½é•¸½ÁÉ½Ñ•Ñ•½‘”É•Ñ…¥¹•¸(´mát=É‰¥ÐMÁ¡•É”½Õ‰”Ñ¡É½Õ …±°Í¥‘•Ìè¹¼¥¹Í¥‘”µ½ÕÐ½µ¥ÍÍ¥¹œÁ…Ñ¡•ÌìA•¹¥°Á…¥¹ÐÍÑ…åÌ½¸Ù¥Í¥‰±”½ÕÑ•ÈÍÕÉ™…”€ ¸àäÜÕÍ•ÈAML¤¸(´mátA±…¹”Ù¥Í¥‰±”ìÁ…¥É•‰ÉÕÍ ÍÝ¥Ñ¡¥¹œ…¹U¹‘½I•‘¼ÍÑ¥±°Ý½É¬€ ¸àäÜÕÍ•ÈAML¤¸()]¥¹‘¥¹œ™¥à¥ÌÍ¡…É•UXAIY%\½¹±ä¸•¹•É…°™¥±”µ•áÁ½ÉÐÝ¥¹‘¥¹œÉ•Á…¥ÈÉ•µ…¥¹Ì½ÕÐ)½˜Í½Á”ìÁÉ•Í•ÉÙ”¥¹Ñ•¹Ñ¥½¹…±±äÉ•Ù•ÉÍ•Í½ÕÉ”Á½±å½¹Ì¸9¼àäÜ‘•Ù¥”AMLå•Ð¸((ŒŒ€¸àäÜÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()IÕ¹Ñ¥µ”Å‘ˆÔÜØåˆäààá”Ù˜ÙÅŒÕ‰‘„Ñ”äØá™™ÈÝ…™…ˆÅìÑ•ÍÑ•ÑÉ•”(Ðå™ŒÈØàÔÈÑ„ÌÀá‰ˆÙ‘™™˜Á„ÐÔäÌÐÙˆàÜÈÐÝ™Œµ…Ñ¡•Ì™•Ñ¡•µ…¥¸½±½…°•á…Ñ±ä¸)9½‘”ÈÈ¸ÈÌ¸ÌÑ½Á½±½ä$ÌäÀÄààÜÌàÀä½©½ˆÄÄÜÌÔØÐäÔäÜÀMUMLÈÐÜÝAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌäÀÄààÜÌÌÐÀ‰Õ¥±ÄÄÜÌÔØÐäØàäÌ½‘•Á±½äÄÄÜÌÔØÔäØÌÄÌMUML¸)A½ÍÑ‘•Á±½åµ•¹Ð±¥Ù”Í¡•±°½Ù•ÉÍ¥½¸½•áÁ½ÉÐµÁ…É•¹ÐàäÜ…¹±…ˆ¥¹‘•à½½¹ÑÉ½±±•È½Í…µÁ±”àäÜ)‰åÑ”µµ…Ñ É•Á½Í¥Ñ½ÉäìÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¹	•Ñ„Üµ…É­•ÈÕ¹¡…¹•¸%¹¥Ñ¥…°±¥Ù”)É•…‘ÌÁÉ••‘•½µÁ±•Ñ•‘•Á±½åµ•¹Ð…¹Í•ÉÙ•àäØì™¥¹…°Á½ÍÑ‘•Á±½åµ•¹ÐÉ…Á µ…Ñ¡•ÌàäÜ¸)UÍ•ÈàäÙAMLÁÉ½Ñ•ÑÌ‰ÉÕÍ Ý½É­™±½ÜÝ¥Ñ É•Á½ÉÑ•Ý¥¹‘¥¹œ•á•ÁÑ¥½¸ìàäÜ™¥á•ÌÁÉ•Ù¥•Ü)½É¥•¹Ñ…Ñ¥½¸½¹±ä°‘•Ù¥”É•Ñ•ÍÐÁ•¹‘¥¹œ¸9¼àäÝAML¥¹™•ÉÉ•¸AÉ¥½È±½Õ]•‰0±¥µ¥Ñ…Ñ¥½¸)É•µ…¥¹ÌÍ•Á…É…Ñ”™É½´Ñ¡¥Ì…ÑÕ…°Q¡É•”•½µ•ÑÉä½É…å…ÍÐ½Í½ÕÉ”µÝ¥¹‘¥¹œÑ•ÍÐ•Ù¥‘•¹”¸)Q¡¥ÌÙ•É¥™¥…Ñ¥½¸ÕÁ‘…Ñ•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±äìÑ•ÍÑ•ÉÕ¹Ñ¥µ”‰åÑ•ÌÉ•Ñ…¥¹•¸9•áÐè)ÕÍ•È½É‰¥Ð½Á…¥¹ÐÍÁ¡•É”…¹Õ‰”…±°Í¥‘•Ì°Á±…¹”½Á…¥É•¡¥ÍÑ½ÉäÍ…¹¥ÑäìÑ¡•¸Á…¥¹Ð)É•Í½ÕÉ”½½‘•Œ½=\½±½‰…°µ¡¥ÍÑ½Éä‘•Í¥¸Á•ÈÕÉÉ•¹ÐÉ½…‘µ…À¸=É‘¥¹…Éä™¥±”µ•áÁ½ÉÐ)Ý¥¹‘¥¹œÉ•µ…¥¹Ì„Í•Á…É…Ñ”…Õ‘¥Ð¥Ñ•´ì¹¼…ÕÑ½µ…Ñ¥Œ•¹•É…°½ÕÑÝ…ÉµÉ•Á…¥ÈÁÉ½µ¥Í”¸((ŒŒ€¸àäàƒŠPA…¥¹Ð1…ˆÍ•ÍÍ¥½¹Ì°ÕÍ•ÈAMLÁÉ½Ñ•Ñ•((´mát€¸àäÜÕÍ•ÉAMLÁÉ½Ñ•ÑÌ½ÉÉ•Ñ•ÁÉ•Ù¥•ÜÝ¥¹‘¥¹œ½Ù¥Í¥‰±”µÍÕÉ™…”Á…¥¹Ð…¹ÁÉ¥½È‰ÉÕÍ ½¡¥ÍÑ½Éä½¹…Ù¥…Ñ¥½¸¸(´mátY•ÉÍ¥½¸Ä½±½ÕÈÉ•Í½ÕÉ”½Ý¹•½Á¥•Ì…¹•á…Ð¥¹Ñ•É¥ÑäìÍÑÉ¥ÐÍ¥é”½¡…¹¹•°½…±Á¡„½‰¥¹‘¥¹œÕ…É‘Ì¸(´mátÑÕ…°	½á1…ˆÍ•¹”½¹…Ñ¥Ù•UX½‘•Œ…¹•á…Ðµ…ÁÌ½Í•ÑÑ¥¹Ì½Ù¥•Ü™½ÈMÁ¡•É”½Õ‰”½A±…¹”ì¹¼™…­”1½ÈÁ…É…±±•°µ•Í Í¡•µ„¸(´mát	¥¹…Éä½½ÉÉÕÁÑ¥½¸½‰Õ‘•Ð½É•™ÕÍ…°°…Íå¹¡É½¹½ÕÌM…Ù”Í¹…ÁÍ¡½ÑÌ°ÍÕÁ•ÉÍ•‘•½ÍÑ…±”=Á•¸°…Ñ½µ¥ŒÍÑ…•É½±±‰…¬…¹¹•ÜA•¹¥°½¹Ñ…ÐÕ…É‘Ì¸(´mátÑÕ…°½¹ÑÉ½±±•ÈM…Ù”½=Á•¸‰åÑ•Ì°½¹Ñ¥¹Õ•Á…¥É•¡¥ÍÑ½Éä°Í•ÑÑ¥¹Ì½Ù¥•Ü½‰ÉÕÍ É•ÍÑ½É…Ñ¥½¸…¹‘¥ÍÁ½Í…°ì½É¥¥¹…°Ñ•ÍÐ…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸Õ±°ÈÐàÍAML¼Á%0¼ÁÍ­¥À¸(´mát€ ¸àäàÕÍ•ÈAML¤A…¥¹Ð°Í•±•Ð‰ÉÕÍ ½¡…¹”Í•ÑÑ¥¹Ì½Ù¥•ÜƒŠHM…Ù”A…¥¹Ð€ ¹‰½áÁ…¥¹Ð¤ìI•Í•Ð½É•±½…ƒŠH=Á•¸A…¥¹Ð™É½´½Ý¹±½…‘ÌÉ•ÍÑ½É•Ì	=Q É•ÍÕ±ÑÌ½Í•ÑÑ¥¹Ì½Ù¥•Ü¸(´mát€ ¸àäàÕÍ•ÈAML¤½¹Ñ¥¹Õ”Á…¥¹Ñ¥¹œ…™Ñ•È=Á•¸ìU¹‘¼½I•‘¼Ý½É­Ì™½È¹•ÜÍÑÉ½­•Ì°A9É•µ…¥¹Ì½ÉÉ•Ðì½±‘•ÈÁÉ”µÍ…Ù”U¹‘¼¥Ì¥¹Ñ•¹Ñ¥½¹…±±ä…‰Í•¹Ð¸((¹‰½áÁ…¥¹Ð¥Ì„Í•Á…É…Ñ”±…ˆÍ•ÍÍ¥½¸ì¹¼µ…¥¸€¹‰½á±…ˆÁ…¥¹Ð°±…å•ÉÌ°…ÕÑ½Í…Ù”½È¹…Ñ¥Ù”)Á…¥¹Ð•áÁ½ÉÐå•Ð¸%¹Ù…±¥™¥±”µÕÍÐ¹½ÐÉ•Á±…”½µµ¥ÑÑ•Ý½É¬ìÕ¹™¥±Ñ•É•¥A…Á¥­•È¸((ŒŒ€¸àäàÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()IÕ¹Ñ¥µ”ØÈàÐåÜàÉÐÀÜØÝ˜ÌÌÁ…‘˜ÜäÌÐÑŒÄÝˆàÐÍ‰˜á„ÌÐìÑ•ÍÑ•ÑÉ•”(ÐÀÐÝ˜ÙÅŒÕ„ÔÐÁ”ÄÑ”ØÀÕ„ÔàäÝ˜Ù‘‘…‰ˆÄàÈÅµ…Ñ¡•Ì™•Ñ¡•µ…¥¸½±½…°•á…Ñ±ä¸)9½‘”ÈÈ¸ÈÌ¸ÌÑ½Á½±½ä$ÌäÀÈÔÈÔÌÜÔÌ½©½ˆÄÄÜÌÜÐàØÔÐÄàMUMLÈÐàÍAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌäÀÈÔÈÔÌÌÜÈ‰Õ¥±ÄÄÜÌÜÐàØÜÄÈÌ½‘•Á±½äÄÄÜÌÜÐäÔäÐààMUML¸)A½ÍÑ‘•Á±½åµ•¹ÐÍ¡•±°½Ù•ÉÍ¥½¸…¹•á…Ð±…ˆàäà¥¹‘•à½½¹ÑÉ½±±•È½Í…µÁ±”½Í•ÍÍ¥½¸Á±ÕÌ)Á…¥¹ÐµÉ•Í½ÕÉ”àäà‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸%¹¥Ñ¥…°ÁÉ•‘•Á±½åµ•¹ÐÉ•…‘ÌÍ•ÉÙ•àäÜ¼ÐÀÐì)™¥¹…°½µÁ±•Ñ”¡…¹•É…Á µ…Ñ¡•Ìàäà¸5…¥¸½‘•Œ½¹…Ñ¥Ù”É•Í½ÕÉ•Ì½•áÁ½ÉÐ½‰ÉÕÍ ½É”¼)Ý¥¹‘¥¹œ½ÁÉ½Ñ•Ñ•µ½‘•±±¥¹œ…¹™É½é•¸‰•Ñ„‰åÑ•ÌÉ•Ñ…¥¹•¸UÍ•ÈàäÝAMLÁÉ½Ñ•Ñ•¸)½Õµ•¹Ñ…Ñ¥½¸ÁÉ½½˜¡…¹•Ì¹¼Ñ•ÍÑ•ÉÕ¹Ñ¥µ”‰åÑ•Ììàäà™¥±•Á¥­•È½‘½Ý¹±½…½É•±½…¼)=Á•¸½A•¹¥°½¹Ñ¥¹Õ…Ñ¥½¸…Ñ”Á•¹‘¥¹œ°¹¼àäà‘•Ù¥”AML¥¹™•ÉÉ•¸9¼¹•Ü±½Õ]•‰0)½ÈM…™…É¤É•¹‘•É¥¹œÁÉ½½˜¸€¹‰½áÁ…¥¹Ð¥Ì„±…ˆÍ•ÍÍ¥½¸°¹½Ðµ…¥¸€¹‰½á±…ˆ½9½µ…Á…¥¹Ð¸)9•áÐèM…Ù”A…¥¹ÓŠII•Í•Ð½É•±½…“ŠI=Á•¸A…¥¹Ð™É½´½Ý¹±½…‘Ì°½µÁ…É”‰½Ñ É•ÍÕ±ÑÌ½Í•ÑÑ¥¹Ì¼)Ù¥•Ü…¹½¹Ñ¥¹Õ•U¹‘½I•‘¼ìÑ¡•¸½É¥¥¹…°Í•¹”µÉ•Í½ÕÉ”½½‘•Œ½=\½¡¥ÍÑ½Éä¥¹Ñ•É…Ñ¥½¸¸((ŒŒ€¸àääƒŠP½±½ÕÈÁÉ½©•ÐÉ•Í½ÕÉ”™½Õ¹‘…Ñ¥½¸((´mátá…Ð½±½ÕÈ‰åÑ•Ì½‘•ÍÉ¥ÁÑ½È½¹…Ñ¥Ù”UYÌÉ½Õ¹µÑÉ¥ÀÑ¡É½Õ •áÁ±¥¥ÐÁÉ½©•ÑØÈì½É‘¥¹…ÉäØÄÉ•µ…¥¹Ì¥‘•¹Ñ¥…°ìUYØÌÉ•™ÕÍ•ÌÁ…¥¹Ð™¥•±‘Ì¸(´mátÑÕ…°Í¹…ÁÍ¡½Ð½U¹‘½I•‘¼½‘•±•Ñ¥½¸…¹‰½Ñ ½É‘¥¹…ÉäÕÁ±¥…Ñ”½Ý¹•ÉÌÍ¡…É”½µµ¥ÑÑ•É•Í½ÕÉ•ÌìÉ•Á±…•µ•¹ÑÌ¥Í½±…Ñ”•‘¥ÑÌ°•½µ•ÑÉä¥¹‘•Á•¹‘•¹Ð¸(´mátA½½°½¹Ñ•¹Ð½¥‘•¹Ñ¥Ñä‘•‘ÕÀ°á5¥‰½Õ¹‘…Éä°µ…±™½Éµ•Í¡•µ„½…±Á¡„½‰…Í”ØÐ½É•™Ì½½Ý¹•ÉÌÉ•™ÕÍ”ì¹¼Õ¹•¹½‘•Á…¥¹ÐÁ…ÍÍÑ¡É½Õ ¸(´mát=É¥¥¹…°M…Ù”½=Á•¸½‘½Ý¹±½…½…Ñ½µ¥ŒÉ•Á±…•µ•¹Ð…¹É•¹‘•Èµ™…¥±ÕÉ”É½±±‰…¬ÁÉ•Í•ÉÙ”É•Í½ÕÉ”½¡¥ÍÑ½ÉäÍÑ…Ñ”ì™Õ±°ÈÐàÝAML¼Á%0¼ÁÍ­¥À°™½ÕÍ•ÑAML¸(´mát€ ¸àääÕÍ•ÈAML¤9•…É‰äÉ•É•ÍÍ¥½¸è±…ˆM…Ù”½I•Í•Ð½=Á•¸…¹½¹Ñ¥¹Õ•Á…¥¹Ð½U¹‘½I•‘¼ìµ…¥¸½É‘¥¹…ÉäÕÁ±¥…Ñ”½U¹‘¼…¹Á±…¥¸€¹‰½á±…ˆM…Ù”½=Á•¸¸()MÑ½É…”™½Õ¹‘…Ñ¥½¸½¹±ä°¹¼¹•Üµ…¥¸Á…¥¹Ð…ÕÑ¡½É¥¹œ½‘¥ÍÁ±…ä¸	¥¹‘¥¹œ½Á…ÅÕ”Õ¹Ñ¥°)ÁÉ½‘ÕÑ¥½¸Ù…±¥‘¥Ñä½É•‰¥¹‘¥¹œ‰É¥‘”ì¹¼Á…¥¹Ð•áÁ½ÉÐ½UXÁÉ½Á……Ñ¥½¸½M!µ…ÕÑ¡•¹Ñ¥…Ñ•)ÁÉ½©•Ð±…¥´¸€¸àäà™¥±”Ý½É­™±½ÜÕÍ•ÉAMLÁÉ½Ñ•Ñ•¸9¼Íå¹Ñ¡•Ñ¥Œ™¥áÑÕÉ”‘•Ù¥”Ñ•ÍÐ¸((ŒŒ€¸àääÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()IÕ¹Ñ¥µ”ÐÜÄÌØÜÀÅŒåŒØØÝ•‘ˆÐÄÁàå„Ù”áˆÜÔÅŒÜÜÌØàÀìÑ•ÍÑ•ÑÉ•”)‘„Ý˜å”äàÜØÙ‘™˜ääá˜ÜÅ”ØÁÙ‘•ˆÈÀäÐÝ‘ŒØäÉ”Äµ…Ñ¡•Ì™•Ñ¡•µ…¥¸½±½…°•á…Ñ±ä¸)9½‘”ÈÈ¸ÈÌ¸ÌÑ½Á½±½ä$ÌäÀÈàÐÄØÌÈà½©½ˆÄÄÜÌàÌàÜØØÈàMUMLÈÐàÝAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌäÀÈàÐÄÔäÄÈ‰Õ¥±ÄÄÜÌàÌàÜÜÐØÔ½‘•Á±½äÄÄÜÌàÌäÔÌäÜØMUML¸)A½ÍÑ‘•Á±½åµ•¹Ð•á…Ð±¥Ù”Í¡•±°½Ù•ÉÍ¥½¸°±…ˆàää¥¹‘•à½½¹ÑÉ½±±•È½Í•ÍÍ¥½¸…¹¡…¹•)µ…¹…•È½µ…¹…•µ•¹Ð½‘É…Ý•È½½‘•Œ½ÁÉ½©•Ðµ1½¹•ÜÁ…¥¹Ðµ½‘•ŒÉ…Á àää‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éäì)Õ¹¡…¹•É•Í½ÕÉ”àäà…¹É•½Ù•Éä±½…‘•ÈàääÉ…Á …±Í¼µ…Ñ ¸AÉ½Ñ•Ñ•5Õ±Ñ¤µÑÉ…¹Í™½É´¼)™É½é•¸½µ½‘•±±¥¹œ½‰ÉÕÍ ½ÁÉ•Ù¥•Ü‰åÑ•ÌÉ•Ñ…¥¹•¸UÍ•ÈàäáAMLÁÉ½Ñ•Ñ•ìàää¹•…É‰ä±…ˆ½µ…¥¸)ÁÉ½©•Ð‘•Ù¥”Í…¹¥ÑäÁ•¹‘¥¹œ¸9¼¹•ÜÉ•¹‘•É•½A•¹¥°ÁÉ½½˜½Èµ…¥¸Á…¥¹Ð…ÕÑ¡½É¥¹œ±…¥´¸)½Õµ•¹Ñ…Ñ¥½¸ÁÉ½½˜¡…¹•Ì¹¼Ñ•ÍÑ•ÉÕ¹Ñ¥µ”‰åÑ•Ì¸9•áÐ‰½Õ¹‘•½É¥¥¹…°µ½Ý¹•È)Í•±•Ñ•µ½‰©•ÐÁ…¥¹Ð‰É¥‘”É•ÅÕ¥É•ÌÙ…±¥‘¥Ñä½É•‰¥¹‘¥¹œ½±¥™•Ñ¥µ”½É•™ÕÍ…°ÉÕ±•Ì‰•™½É”U$¸((ŒŒ€¸äÀÀƒŠPµ…¥¸Ù¥•ÝÁ½ÉÐUXA…¥¹Ð°‘•Ù¥”…Ñ”Á•¹‘¥¹œ((´mát=É¥¥¹…°UXÑ½Á½±½ä½½‘•Œ‰¥¹‘¥¹œìµ½Ù••½µ•ÑÉä™½±±½ÝÌÕ¹¡…¹•UYÌ°¹…µ•Ì½%Ì•á±Õ‘•ìUX•‘¥ÑÌ½ÍÑ…±”½Õ¹ÍÕÁÁ½ÉÑ•½Ý¹•ÉÌÉ•™ÕÍ”¸(´mátI•…°Q¡É•”…Ñ¥Ù”™É½¹ÐÉ…åÌ½½±ÕÍ¥½¸°¹¼µ½À½I•‘¼½…¹•°°=\¡•­Á½¥¹Ð…¹±½‰…°¡¥ÍÑ½Éä°•á…ÐÁÉ½©•Ð‰åÑ•Ì¸(´mátÍå¹Œ½Á•¹¥¹œ½‘¥ÍÁ±…äÉ…•Ì°½¹”µ½¹±ä‘¥ÍÁ½Í…°°‘¥ÉÑäµ™É…µ”ÕÁ±½…‘Ìì½É¥¥¹…°É•¹‘•È½Ý¹•È…Ñ¥Ù”½±¥Ù”€¬¥¹…Ñ¥Ù”½±½­•…¹½É‘¥¹…Éä±½½¬É•ÍÑ½É…Ñ¥½¸¸(´mátÑÕ…°Á…¥¹ÐU$Ý¥¹‘½Ü…ÁÑÕÉ”½A•¹¥°½¡½Ù•È½™¥¹•È½Á…±´½ÁÉ•ÍÍÕÉ”½¥¹Ñ•ÉÉÕÁÑ¥½¸½½¹Ñ•áÐ±½ÍÌÉ½ÕÑ¥¹œ…‘…ÁÑ•¥¸9½‘”ì™Õ±°ÈÐäÑAML¼Á%0¼ÁÍ­¥À¸(´mát€ ¸äÀÀÕÍ•ÈAML¤9…Ñ¥Ù”UXÕ‰”°MÕ‰½5¥ÉÉ½È½™˜ƒŠH¥±”½A…¥¹ÐÍ•±•Ñ•½‰©•ÐƒŠHA•¹¥°µ…É­Ì…ÁÁ•…È‘ÕÉ¥¹œµ½Ñ¥½¸ì™¥¹•ÉÌ½É‰¥Ð½Á…¸½Á¥¹ Ý¥Ñ¡½ÕÐÁ…¥¹Ð¸(´mát€ ¸äÀÀÕÍ•ÈAML¤QÉä‰½Ñ ‰ÉÕÍ¡•Ì½Í•ÑÑ¥¹Ìì½¹”ƒŠH±½‰…°U¹‘½I•‘¼ìÉ•½Á•¸Ñ¼½¹Ñ¥¹Õ”ì‘ÕÁ±¥…Ñ”½•‘¥Ð±•…Ù•Ì½É¥¥¹…°Á…¥¹Ð¥¹Ñ…Ð¸(´mát€ ¸äÀÀÕÍ•ÈAML¤M…Ù”€¹‰½á±…ˆƒŠHÉ•±½…½=Á•¸É•ÍÑ½É•ÌÁ…¥¹Ð¥¸MÑÕ‘¥¼½M½±¥½UX%µ…”ì½É‘¥¹…Éä½‰©•Ð5½Ù”É•Ñ…¥¹ÌÁ…¥¹Ð¸()¥ÉÍÐÍ¥¹±”½Á…ÅÕ”ÔÄË
È‰…Í”±…å•È½¹±ä¸M•…µÌ…¸‰±••ìUX½Ñ½Á½±½ä•‘¥ÑÌÕ…É‘•°)¹½ÐÍ¥±•¹Ñ±äÉ•‰½Õ¹¸A…¥¹Ñ•=	(½1½9=4…¹)½¥¸É•™ÕÍ”Á•¹‘¥¹œÁÉ½Á……Ñ¥½¸½•áÁ½ÉÐ¸)M…Ù”€¹‰½á±…ˆì±½‰…°¡¥ÍÑ½ÉäÔÀ•¹ÑÉ¥•Ì°ÕÉÉ•¹ÐÕ¹¥ÅÕ”Á½½°á5¥¸•Ù¥”½É•¹‘•É¥¹œ¹½Ð)¥¹™•ÉÉ•™É½´9½‘”½ÈÁÉ•Ù¥½ÕÌ±…ˆAML¸UÍ•ÈàäåAMLÁÉ½Ñ•Ñ•¸((ŒŒ€¸äÀÀÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()IÕ¹Ñ¥µ••ˆÈÙˆääÄÐÅ…˜Ñ„Å”Í„ÜÝÅ˜Àå™”ÔÔäààÜààÁ‘Ý”ìÑ•ÍÑ•ÑÉ•”)ˆØàÝ˜ÉˆÉ˜ÌØØÕ˜Ìàå˜ØÝ”ÀÉ‘ˆÅ”ØÝ‰˜ääÅˆÐàÝ‰˜µ…Ñ¡•Ì™•Ñ¡•µ…¥¸½±½…°•á…Ñ±ä¸)9½‘”ÈÈ¸ÈÌ¸ÌÑ½Á½±½ä$ÌäÀÌÀàÀÐàÄÄ½©½ˆÄÄÜÌäÀØäÌÔÄÔMUMLÈÐäÑAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌäÀÌÀàÀÌØÜÈ‰Õ¥±ÄÄÜÌäÀØäÌàÐÔ½‘•Á±½äÄÄÜÌäÀÜäàÄÌØMUML¸)A½ÍÑ‘•Á±½åµ•¹Ð•á…ÐÍ¡•±°½Ù•ÉÍ¥½¸°µ…¥¸Ù¥•ÝÁ½ÉÐÁ…¥¹Ð½Ñ…É•Ð½½É”½É•¹‘•È½É…‘¥…°¼)µ…¹…•È½µ…¹…•µ•¹Ð½‘É…Ý•È½•áÁ½ÉÐ½É•™ÕÍ…°Á…É•¹ÐÉ…Á äÀÀÁ±ÕÌ1…ˆäÀÀ¥¹‘•à½½¹ÑÉ½±±•È)…¹Õ¹¡…¹•…•ÁÑ•É…ÍÑ•È½ÍÑÉ½­”àäØ‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸I•½Ù•ÉääÀÀµ…Ñ¡•Ì¸)AÉ½Ñ•Ñ•5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À½™É½é•¸½µ½‘•±±¥¹œ…±½É¥Ñ¡µÌ½‰ÉÕÍ ‰åÑ•ÌÉ•Ñ…¥¹•¸UÍ•Èàää)AMLÁÉ½Ñ•Ñ•ìäÀÀ…ÑÕ…°Ù¥•ÝÁ½ÉÐ½A•¹¥°½¹…Ù¥…Ñ¥½¸½ÁÉ½©•Ð‘•Ù¥”…Ñ”Á•¹‘¥¹œ¸)9¼É•¹‘•É•½¥A…ÁÉ½½˜¥¹™•ÉÉ•™É½´9½‘”…‘…ÁÑ•ÉÌ½ÈÁÉ•Ù¥½ÕÌ±½Õ]•‰0±¥µ¥Ñ…Ñ¥½¸¸)½Õµ•¹Ñ…Ñ¥½¸ÁÉ½½˜¡…¹•Ì¹¼Ñ•ÍÑ•ÉÕ¹Ñ¥µ”¸9•áÐè‘•Ù¥”™••‘‰…¬°Ñ¡•¸™±…ÑÑ•¹•)Á…¥¹Ð•áÁ½ÉÐÑ¡É½Õ ½É¥¥¹…°1½9=4½Ý¹•ÉÌìÁ…¥¹Ñ••áÁ½ÉÐÉ•™ÕÍ…°É•µ…¥¹Ìµ•…¹Ý¡¥±”¸((ŒŒ€¸äÀÄƒŠPÁ…¥¹Ñ•¹…Ñ¥Ù”9=4€¼1•áÁ½ÉÐ°‘•Ù¥”…Ñ”Á•¹‘¥¹œ((´mátM¡…É•A9Á…­…¥¹œè•á…ÑIà½ÍI½½Á…ÅÕ”Á¥á•±Ì½É½ÝÌ½I½é±¥ˆ½Í½ÕÉ”½Ý¹•ÉÍ¡¥Àì•á¥ÍÑ¥¹œÍ…±…ÈÑ•ÍÑÌÉ•Ñ…¥¹•¸(´mátÑÕ…°¹…Ñ¥Ù”¥µ…”½µ…Ñ•É¥…°½¡•…‘•È½UX½Á½±å½¸‰åÑ•Ì…¹‘•‘ÕÀì…ÑÕ…°1•áÁ½ÉÑ•È½±½…‘•È½A9½UX½Ý¡¥Ñ”™…Ñ½ÉÌ½Á…¥¹Ñ•Í½ÕÉ”Ý¥¹‘¥¹œ¸(´mát•½µ•ÑÉä½UX½Á¥á•°…ÁÑÕÉ”‰•™½É”…Ý…¥ÐìÍÑ…±”½	…Í”½Õ¹ÍÕÁÁ½ÉÑ•É•™ÕÍ…±ÌìÉ…ÜÍå¹¡É½¹½ÕÌ…¹=	(Í…™•Õ…ÉÉ•Ñ…¥¹•¸(´mátÑÕ…°¥±”9=5…¹1…Ñ¥½¹Ì‘½Ý¹±½…Á…¥¹Ð°É•Á½ÉÐ½±½ÕÈ½Õ¹Ð…¹É•ÍÑ½É”‰ÕÑÑ½¹ÌìÍ¥à™½ÕÍ•¡•­ÌAMLì™Õ±°9½‘”ÈÐ€ÈÔÀÁAML¼Á%0¼ÁÍ­¥À¸(´mát€ ¸äÀÄÕÍ•ÈAML¤A…¥¹Ð…Íåµµ•ÑÉ¥Œ½±½ÕÉÌ½µ…É­Ì°½¹”ƒŠH¥±”9=5ƒŠH½Á•¸¥¸9½µ…è½µÁ…É”Á±…•µ•¹Ð½½É¥•¹Ñ…Ñ¥½¸½½±½ÕÈ¸(´mát€ ¸äÀÄÕÍ•ÈAML¤I•Á•…Ð1­	…Í”ìÁ…¥¹Ñ•‘ÕÁ±¥…Ñ”É•Ñ…¥¹Ì¥ÑÌ½Ý¸½±½ÕÈ½UYÌ…±½¹Í¥‘”½É¥¥¹…°¸(´mát€ ¸äÀÄÕÍ•ÈAML¤½¹Ñ¥¹Õ”	½á1…ˆÁ…¥¹Ð½U¹‘¼…¹€¹‰½á±…ˆM…Ù”½=Á•¸…™Ñ•È•áÁ½ÉÑÌì½É¥¥¹…°É•Í½ÕÉ”É•µ…¥¹Ì•‘¥Ñ…‰±”¸()±…ÑÑ•¹•½±½ÕÈ½¹±ä¥¸9=4½1¸€¹‰½á±…ˆÉ•Ñ…¥¹Ì•‘¥Ñ…‰±”Á…¥¹ÐÉ•Í½ÕÉ”ì¹¼±…å•È¼)‰ÉÕÍ µ¡¥ÍÑ½Éä½A	H•áÁ…¹Í¥½¸½Í•…´µÍ…™”½9=4¥µÁ½ÉÐ±…¥´¸€¸äÀÀ‘•Ù¥”AMLÁÉ½Ñ•Ñ•¸((ŒŒ€¸äÀÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´ÄÜ()IÕ¹Ñ¥µ”ÌÉ„ÀÀÌÌá™ŒÍ‰ààäÑ™ˆå˜ÁŒÝ•å„ÄÐÄÜÅŒÈÈÌìÑ•ÍÑ•ÑÉ•”(ÔÜàÁ„äÌÅ„ØäÍ˜ÐÅ‰˜ÑÜÈÄÈáÐàÈàå˜ÀÄÑ…ÈÀÐµ…Ñ¡•Ì™•Ñ¡•µ…¥¸½±½…°•á…Ñ±ä¸)9½‘”ÈÈ¸ÈÌ¸ÌÑ½Á½±½ä$ÌäÀÌØäÌàÄÐØ½©½ˆÄÄÜÐÀàÔÜÌØÜØMUMLÈÔÀÁAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÌäÀÌØäÌÜÜÀà‰Õ¥±ÄÄÜÐÀàÔÜÔÀÈä½‘•Á±½äÄÄÜÐÀàØàÈÔÀÌMUML¸)A½ÍÑ‘•Á±½åµ•¹Ð•á…Ð±¥Ù”Í¡•±°½Ù•ÉÍ¥½¸…¹•áÁ½ÉÐµÁ…¹•°½¹…Ñ¥Ù”µ½É”½Á…­•µÁ…É•¹Ð¼)A9½¹•ÜÁ…¥¹Ðµ•áÁ½ÉÐÉ…Á äÀÄÁ±ÕÌ1…ˆäÀÄ¥¹‘•à½½¹ÑÉ½±±•È‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸)U¹¡…¹•µ…¥¸Á…¥¹Ð½‰¥¹‘¥¹œäÀÀ…¹É•½Ù•ÉääÀÄµ…Ñ ¸AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸¼)µ½‘•±±¥¹œ½É…ÍÑ•È½¥¹ÁÕÐ‰åÑ•ÌÉ•Ñ…¥¹•¸UÍ•ÈäÀÁAMLÁÉ½Ñ•Ñ•ìäÀÄ•áÑ•É¹…°9½µ……¹)1½±½ÕÈ½½É¥•¹Ñ…Ñ¥½¸½Á±…•µ•¹Ð‘•Ù¥”…Ñ”Á•¹‘¥¹œ°¹¼É•¹‘•É•ÁÉ½½˜¥¹™•ÉÉ•¸)½Õµ•¹Ñ…Ñ¥½¸ÁÉ½½˜¡…¹•Ì¹¼Ñ•ÍÑ•ÉÕ¹Ñ¥µ”¸9•áÐ‘•Ù¥”•áÁ½ÉÐ™••‘‰…¬°Ñ¡•¸±…å•È¼)½µÁ½Í¥Ñ½È‘•Í¥¸Ñ¡É½Õ ½É¥¥¹…°½Ý¹•ÉÌì€¹‰½á±…ˆÉ•µ…¥¹Ì•‘¥Ñ…‰±”Á…¥¹ÐÁÉ½©•Ð¸(((ŒŒ€¸äÀÈƒŠP±…å•È½½µÁ½Í¥Ñ½È™½Õ¹‘…Ñ¥½¸ì€¸äÀÄÕÍ•ÈAMLƒŠP€ÈÀÈØ´ÄÀ´Äà()UÍ•ÈäÀÅAMLÁÉ½Ñ•ÑÌÁ…¥¹Ñ•9=5½1Á±…•µ•¹Ð½½É¥•¹Ñ…Ñ¥½¸½½±½ÕÈ°¥¹‘•Á•¹‘•¹Ð)Á…¥¹Ñ•‘ÕÁ±¥…Ñ•Ì…¹½¹Ñ¥¹Õ•Á…¥¹Ñ¥¹œ½U¹‘¼¼¹‰½á±…ˆ¸Õ‘¥Ðµ…¥¸Á‰™ˆØàÄäèÉ…ÍÑ•ÈàäØ)ÝÉ¥Ñ•Ì½Á…ÅÕ”‰åÑ•Ì°É•Í½ÕÉ”àäà½ÁÉ½©•Ðàää½•áÁ½ÉÐäÀÄ¡…Ù”¹¼•‘¥Ñ…‰±”±…å•ÈÍÑ…¬¸)9•Ü¥Í½±…Ñ•Á…¥¹Ðµ±…å•ÈµÍÑ…¬A$è•á¥ÍÑ¥¹œ½Á…ÅÕ”‰…Í”€¬ÕÀÑ¼ÌÍÑÉ…¥¡Ðµ…±Á¡„(ÔÄË
È½Ù•É±…åÌ°‰½Õ¹‘•%Ì½¹…µ•Ì°Ù¥Í¥‰±”½½Á…¥Ñä°½Ý¹•…ÁÑÕÉ”½…ÁÁ•¹½É•Á±…”°)‰åÑ”µÍÁ…”Í½ÕÉ”µ½Ù•È…¹™±…ÑÑ•¹•É•Í½ÕÉ”Ù¥„=I%%90…ÁÑÕÉ•½±½ÕÉI•Í½ÕÉ”¸)9¼¹•Ü¡¥ÍÑ½Éä½¥¹ÁÕÐ½­•É¹•°½È…ÁÀÝ¥É¥¹œ¸MÑÉ¥ÐÍ¡•µ…Ì½‰Õ‘•ÑÌìÑåÁ•‰Õ™™•ÉÌ)É•…µ½¹±ä‰ä½¹Ù•¹Ñ¥½¸¸ÕÉÉ•¹Ð½Áäµ…±°A$¡…Ì¹¼ÍÁ…ÉÍ”½=\½Á•É™½Éµ…¹”±…¥´¸)¥Ù”™½ÕÍ•¡•­ÌAMLè•á…Ð‰±•¹‘¥¹œ½½É‘•È½Ù¥Í¥‰¥±¥Ñä½½Á…¥Ñä½É½ÝÌ°¥¹ÁÕÐ½•‘¥Ð¼)½ÕÑÁÕÐ¥Í½±…Ñ¥½¸°É•™ÕÍ…°½‰Õ‘•ÑÌ½µ…àÍÑ…¬°…ÑÕ…°½É¥¥¹…°ÁÉ½©•Ð€¬¹…Ñ¥Ù”A9)™±…ÑÑ•¹•¡…¹‘½™˜ì•‘¥Ñ…‰±”ÍÑ…¬ÍÑ¥±°É•™ÕÍ•Ì…ÌÁÉ½©•Ð½±½ÕÉA…¥¹Ð¸)I•…‘½Ì½Á…¥¹Ðµ±…å•ÈµÍÑ…¬´äÀÈ¹µ¸9¼±…å•ÈU$½ÑÉ…¹ÍÁ…É•¹Ð‰ÉÕÍ ½•‘¥Ñ…‰±”±…å•ÈÍ…Ù”)±…¥´¸9¼¹•Ü¡…¹‘Ìµ½¸Ñ•ÍÐì•á¥ÍÑ¥¹œÁ…¥¹Ð½•áÁ½ÉÐÕ¹¡…¹•¸M¡•±°½É•½Ù•ÉääÀÈì)µ…¥¸Á…¥¹ÐäÀÀ½•áÁ½ÉÐäÀÄ½É•Í½ÕÉ”àäà½ÁÉ½©•Ðàää½±…ˆäÀÄ½ÁÉ½Ñ•Ñ•½™É½é•¸‰åÑ•ÌÉ•Ñ…¥¹•¸)9•áÐÍ•Á…É…Ñ”±…å•É•Í•¹”É•Í½ÕÉ”½ÁÉ½©•Ð½‘•Œ€¬…Ñ½µ¥Œ=Á•¸½¡¥ÍÑ½Éä½‘ÕÁ±¥…Ñ”)¥¹Ñ•É…Ñ¥½¸°Ñ¡•¸ÑÉ…¹ÍÁ…É•¹ÐÉ…ÍÑ•È½U$Ñ¡É½Õ ÕÉÉ•¹ÐÙ¥•ÝÁ½ÉÐ½Ý¹•È¸AÕ‰±¥…Ñ¥½¸)…¹™Õ±°µÍÕ¥Ñ”•Ù¥‘•¹”™½±±½Üì¹¼äÀÈ‘•Ù¥”AML¥¹™•ÉÉ•¸((´mát¥Ù”™½ÕÍ•äÀÈ¡•­Ì½Ù•È•á…ÐÍ½ÕÉ”µ½Ù•È½½É‘•É¥¹œ½Ù¥Í¥‰¥±¥Ñä½½Á…¥Ñä°(€½Á…ÅÕ”½ÕÑÁÕÐ½…Íåµµ•ÑÉ¥ŒÉ½ÝÌ°¥¹‘•Á•¹‘•¹Ð…ÁÑÕÉ•Ì½•‘¥ÑÌ½™±…ÑÑ•¸°ÍÑÉ¥ÐÍ¡•µ„¼(€‰Õ™™•È½%½Í¥é”½±…å•È±¥µ¥ÑÌ…¹µ…àÔÄË
ÈÍÑ…¬¸(´mát±…ÑÑ•¹•‰åÑ•ÌÍÕÉÙ¥Ù”½É¥¥¹…°ÁÉ½©•Ð½¹…Ñ¥Ù”9½µ…A9½Ý¹•ÉÌìÁÉ½©•Ð(€É•©•ÑÌÍÑ…¬…Ì½Á…ÅÕ”½±½ÕÉA…¥¹ÐÉ…Ñ¡•ÈÑ¡…¸Í¥±•¹Ñ±ä‘¥Í…É‘¥¹œ±…å•ÉÌ¸(´9¼¹•Ü¡…¹‘Ìµ½¸äÀÈ¡•¬è±…å•ÈA$¥Ì¥¹Ñ•¹Ñ¥½¹…±±ä¹½Ð±½…‘•‰ä…ÁÀ½±…ˆ¸((¸äÀÈ±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°ÍÕ¥Ñ”€¨¨ÈÔÀÔAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì)™¥Ù”¹•Ü™½ÕÍ•½µÁ½Í¥Ñ½È¡•­ÌAML¸9¼¹•Ü‘•Ù¥”½É•¹‘•É•±…å•ÈÁÉ½½˜¸(((ŒŒ€¸äÀÌƒŠPµ…Í­Ì½‰±•¹™½Õ¹‘…Ñ¥½¸…¹µ…Ñ•É¥…°‘¥É•Ñ¥½¸ƒŠP€ÈÀÈØ´ÄÀ´Äà()UÍ•ÈÉ•ÅÕ•ÍÑÌÍÕÉ™…”¥µ…”Á±…•µ•¹Ð½AÉ½©•Ð™É½´Y¥•Ü°%¹Í•ÉÐ5½Ù—ŠII½Ñ…Ñ—ŠIM…±”Ñ…À)å±”°µ…Í­Ì½‰±•¹µ½‘•Ì…¹9½µ…µÍÑå±”µ…Ñ•É¥…°Í±½ÑÌÝ¥Ñ ‘¥ÍÁ±…•µ•¹ÐÁ±…•¡½±‘•È¸)I•…‘½Ì½Á…¥¹Ðµµ…Ñ•É¥…°µ‘¥É•Ñ¥½¸¹µ™½ÈÉ•ÅÕ¥É•µ•¹ÑÌ°Í•ÅÕ•¹¥¹œ…¹±¥µ¥Ñ…Ñ¥½¹Ì¸)Õ‘¥ÐÜàÝ™ˆäèäÀÈ½µÁ½Í¥Ñ½È9½Éµ…°µ½¹±äìäÀÀÁ…¥¹Ð¼àääÁÉ½©•Ð¼äÀÄ•áÁ½ÉÐ½Á…ÅÕ”¸)áÑ•¹M5¥Í½±…Ñ•ÍÑ…¬½Ý¹•ÈÑ¼ØÈÝ¥Ñ ½Ý¹•Á•Èµ½Ù•É±…äàµ‰¥Ð½Ù•É…”µ…Í­Ì°)•¹…‰±”½¥¹Ù•ÉÐ…¹ÈØ½±½ÕÈ‰±•¹µ½‘•Ì¥¸Á…¥¹Ðµ‰±•¹µµ½‘•ÌäÀÌ¸ØÄ9½Éµ…°ÕÁÉ…‘”)‰åÑ”µ¥‘•¹Ñ¥…°ìÍÑÉ¥ÐÕ¹­¹½Ý¸™¥•±‘Ì½¥¹Ù…±¥µ½‘•Ì½µ…Í­Ì…¹ÍÁ…ÉÍ”…ÉÉ…åÌÉ•™ÕÍ”¸)±Á¡‡]½Á…¥Ñç]µ…Í¬…Ñ•Ì‰±•¹‘•Iì9½Éµ…°•á…ÐäÀÈìÍÑ…¹‘…É\Í½±½ÕÈ™½ÉµÕ±…Ì°)•áÑÉ„µ½‘•Ì•áÁ±¥¥Ñ±ä‘•™¥¹•¥¸‘½Ì½Á…¥¹Ðµ±…å•ÉÌ´äÀÌ¹µ¸9½Ð9½µ…‰¥ÐµÁ…É¥Ñä½È)¹½Éµ…°µÙ•Ñ½È½Í…±…È½A	H‰±•¹‘¥¹œ¸	Õ™™•ÉÌÉ•…µ½¹±ä‰ä½¹Ù•¹Ñ¥½¸ìµ…àÐ¸ÜÕ5¥ÍÑ…¬)Á±ÕÌ½Á¥•Ì½™±…Ð½ÕÑÁÕÑÌ°¹¼µ•…ÍÕÉ•Á•É™½Éµ…¹”±…¥´¸)M•Ù•¸™½ÕÍ•äÀÌ¡•­ÌAMLì•á¥ÍÑ¥¹œäÀÈÍ•µ…¹Ñ¥Œ¡•­ÌÉ•Ñ…¥¹•€¡Õ¹­¹½Ý¸µµ½‘”)É•™ÕÍ…°ÍÕÁ•ÉÍ•‘•Ì¥ÑÌ½‰Í½±•Ñ”5Õ±Ñ¥Á±äÉ•™ÕÍ…°¤¸ÑÕ…°½Á…ÅÕ”ÁÉ½©•Ð½¹…Ñ¥Ù”A9)¡…¹‘½™˜É•Ñ…¥¹•¸9¼…ÁÀ½±…ˆ±…å•ÈU$°µ…Í¬‘É…Ý¥¹œ°¥µ…”ÁÉ½©•Ñ¥½¸½È•‘¥Ñ…‰±”)±…å•ÈÁ•ÉÍ¥ÍÑ•¹”å•Ð¸5…¥¸É•Í½ÕÉ”½ÁÉ½©•Ð½•áÁ½ÉÐ½¹Ñ¥¹Õ”É•™ÕÍ¥¹œ•‘¥Ñ…‰±”ÍÑ…¬¸)M¡•±°½É•½Ù•ÉääÀÌ°¥Í½±…Ñ•¡¥±äÀÌìµ…¥¸äÀÀ½•áÁ½ÉÐäÀÄ½±…ˆäÀÄ½‰ÉÕÍ àäØ½ÁÉ½Ñ•Ñ•)5Õ±Ñ¤Ä¸À½™É½é•¸½µ½‘•±±¥¹œ½Ý¹•ÉÌÕ¹¡…¹•¸9¼¹•Ü¡…¹‘Ìµ½¸Ñ•ÍÐ½ÈÕÍ•ÈäÀÍAML¸)9•áÐ•áÁ±¥¥Ð±…å•É•Í•¹”½ÁÉ½©•ÐÁ½½°Ñ¡É½Õ ½É¥¥¹…°½‘•Œ½¡¥ÍÑ½Éä½‘ÕÁ±¥…Ñ”)½Ý¹•ÉÌ°Ñ¡•¸ÑÉ…¹ÍÁ…É•¹Ð‰ÉÕÍ ­±…å•È½µ…Í¬U$ì¥µ…”ÁÉ½©•Ñ¥½¸½%¹Í•ÉÐµå±”™½±±½ÝÌ¸)Õ±°ÍÕ¥Ñ”½ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌìäÀÄÕÍ•ÉAMLÉ•µ…¥¹Ì±…Ñ•ÍÐ…•ÁÑ•‘•Ù¥”…Ñ”¸((´mátÈØ™¥á•É…åÍ…±”Ù•Ñ½ÉÌ€¬¹½¹±¥¹•…È‰É…¹ ½•¹‘Á½¥¹ÑÌì½±½ÕÈµ±Õµ¥¹½Í¥Ñä½…µÕÐ(€…¹Ý¡½±”µI‘…É­•È½±¥¡Ñ•ÈÍ•±•Ñ¥½¸ì…±°ÈØµ½‘•Ì™¥¹¥Ñ”½‰½Õ¹‘•½¸Ðä½±½ÕÈÁ…¥ÉÌ¸(´máu5…Í¬Ý¡¥Ñ”½‰±…¬½É•ä½‘¥Í…‰±•½¥¹Ù•ÉÑ•°½Ù•É…—]…±Á¡‡]½Á…¥Ñä°½Ý¹•‰åÑ•Ì°(€¥¹Ù…±¥Í¡•µ„½µ½‘”½Í¥é”°…Íåµµ•ÑÉ¥ŒUXµØÀµ™¥ÉÍÐÉ½ÝÌ°ØÄÕÁÉ…‘”…¹ÍÁ…ÉÍ”É•™ÕÍ…°¸(´máuA9½ÕÑÁÕÐ•á…Ðì•á¥ÍÑ¥¹œäÀÈ…ÑÕ…°ÁÉ½©•Ð½¹…Ñ¥Ù”¡…¹‘½™˜Ñ•ÍÑÌÉ•Ñ…¥¹•¸(´9¼¹•ÜäÀÌ‘•Ù¥”Ñ•ÍÐèµ…¥¸Á…¥¹Ð½±…ˆU$Õ¹¡…¹•°½µÁ½Í¥Ñ½ÈÍÑ¥±°¥Í½±…Ñ•¸((¸äÀÌ±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨ÈÔÄÈAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì)Í•Ù•¸¹•Ü™½ÕÍ•¡•­Ì€¬•á¥ÍÑ¥¹œäÀÈÑ•ÍÑÌAML¸9¼É•¹‘•É•½‘•Ù¥”…Ñ”¥¹™•ÉÉ•¸(((ŒŒ€¸äÀÐƒŠP•‘¥Ñ…‰±”±…å•É•ÁÉ½©•Ð½¡¥ÍÑ½ÉäÉ•Í½ÕÉ•ÌƒŠP€ÈÀÈØ´ÄÀ´Äà()Õ‘¥ÐÕ•™‘ŒÝäè•á¥ÍÑ¥¹œ½±½ÕÉA…¥¹Ð¡¥ÍÑ½Éä½½É‘¥¹…ÉäÕÁ±¥…Ñ”…±É•…‘äÍ¡…É”É•…µ½¹±ä)É•Í½ÕÉ•Ì¸9•ÜÁ…¥¹Ðµ±…å•ÈµÉ•Í½ÕÉ”½Ý¹•ÈÍÑ½É•Ì•áÁ±¥¥Ð±…å•É•É•Í½ÕÉ•ØÈ¥¸M5)½±½ÕÉA…¥¹Ð™¥•±èÙ…±¥‘…Ñ•½Á…ÅÕ”ÁÉ•Ù¥•Ü€¬½Ý¹•äÀÌÍÑ…¬Ý¥Ñ •á…Ðµ…Í­Ì½µ½‘•Ì¸)=É¥¥¹…°½±½ÕÉA…¥¹ÑA½½°•¹ÑÉåØÈ…¹Í•¹•ÁÉ½©•ÑØÌÑÉ…¹ÍÁ½ÉÐ…±°‰Õ™™•ÉÌÑ¡É½Õ )½É¥¥¹…°…¹½¹¥…°‰åÑ•Ì°Ý¡½±”µÉ•Í½ÕÉ”‘•‘ÕÀìá5¥…É•…Ñ”	=I‘•½‘”¥¹±Õ‘•Ì)™±…Ð½‰…Í”½½Ù•É±…åÌ½µ…Í­Ì¸A±…¥¹ØÄ½½Á…ÅÕ•ØÈÕ¹¡…¹•ìÍÑÉ¥Ð™¥•±½Ù•ÉÍ¥½¸½É•˜½…¡”¼)‰Õ‘•Ð½Õ¹ÍÕÁÁ½ÉÑ•½Ý¹•ÈÕ…É‘Ì¸=É¥¥¹…°¹…Ñ¥Ù•UYØÌÉ•µ…¥¹ÌUXµ½¹±ä¸)M…µ”¡¥ÍÑ½Éä½¡•­Á½¥¹Ð½Í¥¹±”­5Õ±Ñ¤ÕÁ±¥…Ñ”½…Ñ½µ¥Œ=Á•¸½Ý¹•ÉÌÕ¹¡…¹•¸=É¥¥¹…°)ÍÕÉ™…”‘¥ÍÁ±…äÉ•…‘ÌÙ…±¥‘…Ñ•™±…Ð½±½ÕÈì•áÁ½ÉÐ…‘…ÁÑ•ÈÙ…±¥‘…Ñ•Ì½…ÁÑÕÉ•Ì½Ý¹•)™±…ÑØÄ	=I…Ý…¥Ð…¹ÕÍ•Ì•á¥ÍÑ¥¹œ9=4½1ÝÉ¥Ñ•ÉÌ¸‘¥Ñ…‰±”±…å•ÉÌÁ•ÉÍ¥ÍÐ½¹±ä)¥¸¹‰½á±…ˆ¸á¥ÍÑ¥¹œ½Á…ÅÕ”Á…¥¹Ñ•ÈÉ•™ÕÍ•Ì±…å•É•É•Í½ÕÉ”Õ¹Ñ¥°½¹ÑÉ½±Ì±…¹°)ÁÉ•Ù•¹Ñ¥¹œ‘•ÍÑÉÕÑ¥Ù”™±…ÑÑ•¹¥¹œ¸9¼¹•Ü±…å•ÈU$½¥µ…”Í½ÕÉ•Ì½µ…Ñ•É¥…°…ÕÑ¡½É¥¹œ¸)M•Ù•¸™½ÕÍ•äÀÐ¡•­ÌAMLè•á…ÐÉ•Í½ÕÉ”½ÁÉ½©•Ð½Á½½°°É•…°¡¥ÍÑ½Éä½‘ÕÁ±¥…Ñ•Ì°)¥±”M…Ù”½=Á•¸½½ÉÉÕÁÐ¥¹ÁÕÐ½É•¹‘•ÈÉ½±±‰…¬°…ÑÕ…°9=4½1­…Íå¹ŒÍ¹…ÁÍ¡½Ð…¹)½µµ¥ÑÑ•‘¥ÍÁ±…ä½Á…¥¹Ñ•ÈÕ…É¸9½‘”ÑÉ…¹ÍÁ½ÉÐ…‘…ÁÑ•ÉÌ…É”¹½ÐÉ•¹‘•É•½¥A…ÁÉ½½˜¸)I•…‘½Ì½Á…¥¹Ðµ±…å•ÈµÉ•Í½ÕÉ•Ì´äÀÐ¹µ¸¡…¹•½‘•Œ½•áÁ½ÉÐ½‰¥¹‘¥¹œ½Á…¥¹Ð½É•¹‘•È¬)Á…É•¹Ð±½…‘•ÈÉ…Á äÀÐìµ…¥¸µ½‘•±±¥¹œ½5Õ±Ñ¤Ä¸À½™É½é•¸½‰ÉÕÍ …±½É¥Ñ¡µÌÕ¹¡…¹•¸)9¼•áÑÉ„äÀÈ¼äÀÌ¼äÀÐ‘•Ù¥•AML¥¹™•ÉÉ•ìäÀÄÕÍ•ÉAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•¸)9•áÐI0±…å•ÈU$½ÑÉ…¹ÍÁ…É•¹Ð‰ÉÕÍ Ñ¡É½Õ ½É¥¥¹…°Ù¥•ÝÁ½ÉÐ½¡¥ÍÑ½Éä…¹Ñ¡¥Ì)É•Í½ÕÉ”ì‘¼¹½Ð…‘„Á…É…±±•°Á…¥¹Ñ1…å•ÉÌÁÉ½Á•ÉÑä½È¡¥ÍÑ½Éä¸Õ±°ÍÕ¥Ñ”…¹)ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½Ü¸5…¹Õ…°äÀÐè•á¥ÍÑ¥¹œÁ…¥¹Ð½Í…Ù”½É•½Á•¸½U¹‘¼½ÕÁ±¥…Ñ”½•áÁ½ÉÐ)É•É•ÍÍ¥½¸½¹±äì¹•Ü±…å•É•™¥áÑÕÉ•Ì…ÕÑ½µ…Ñ•°¹½ÐÕÍ•ÈÑ…Í­Ì¸((´máu1…å•É•É•Í½ÕÉ•ØÈ•á…ÐÁÉ•Ù¥•Ü½ÍÑ…¬¡•¬…¹½Ý¹•µ…Í­Ì½‰…Í”½½Ù•É±…åÌ¸(´máuá…ÐÍ•¹•ØÌÉ½Õ¹‘ÑÉ¥À½Í¡…É•‘•‘ÕÀìÁ±…¥¹ØÄ½½Á…ÅÕ•ØÈÁÉ•Í•ÉÙ•°ÍÑÉ¥Ð(€Ù•ÉÍ¥½¹Ì½µ½‘•Ì½É•™Ì½½ÉÉÕÁÑ¥½¸½½µÁ±•Ñ”á5¥É…ÜÁ½½°‰•™½É”…±±½…Ñ¥½¸¸(´máuÑÕ…°Í¥¹±”½5Õ±Ñ¤ÕÁ±¥…Ñ”½¡•­Á½¥¹Ð½U¹‘½I•‘¼€¬É•Á±…•µ•¹Ð¥Í½±…Ñ”µ…Í­Ì¸(´máuÑÕ…°M…Ù”½=Á•¸½½ÉÉÕÁÐ±…å•É•ÑÉ…¹ÍÁ½ÉÐ½™…¥±•µÉ•¹‘•ÈÉ½±±‰…¬Õ¹¡…¹•¸(´máuÑÕ…°9=4½1™±…ÑÑ•¸­…Íå¹ŒÍ¹…ÁÍ¡½Ðì½É¥¥¹…°ÍÕÉ™…”½±•…äµÁ…¥¹Ñ•ÈÉ•™ÕÍ…°¸(´mát ¸äÀÐÕÍ•ÈAML¤á¥ÍÑ¥¹œ½Á…ÅÕ”Á…¥¹ÓŠI½¹—ŠIM…Ù”€¹‰½á±…‹ŠIÉ•±½…½=Á•»ŠI½¹Ñ¥¹Õ”½U¹‘½I•‘¼Í…¹¥Ñä¸(´mát ¸äÀÐÕÍ•ÈAML¤=É‘¥¹…ÉäÕÁ±¥…Ñ”¥¹‘•Á•¹‘•¹ÐÁ…¥¹Ð…¹9=5½1½±½ÕÈÉ•É•ÍÍ¥½¸Í…¹¥Ñä¸((¸äÀÐ±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨ÈÔÄäAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì)Í•Ù•¸¹•ÜÉ•Í½ÕÉ”½¡¥ÍÑ½Éä½½‘•Œ½•áÁ½ÉÐ¡•­ÌAML¸9¼‘•Ù¥”…•ÁÑ…¹”¥¹™•ÉÉ•¸(((ŒŒ€¸äÀÔƒŠPÙ¥Í¥‰±”µ…¥¸Ù¥•ÝÁ½ÉÐ½±½ÕÈ±…å•ÉÌì€¸äÀÐAMLƒŠP€ÈÀÈØ´ÄÀ´Äà()UÍ•ÈäÀÑAMLÁÉ½Ñ•ÑÌÁ…¥¹ÐM…Ù”½=Á•¸½U¹‘¼½ÕÁ±¥…Ñ”½9=4½1É•É•ÍÍ¥½¸¸Õ‘¥ÐÅÈÐØÜÌÔè)½¹¹•Ð•á¥ÍÑ¥¹œäÀÀÁ…¥¹Ñ•È¼äÀÌÍÑ…¬¬ÈØ‰±•¹‘Ì¼äÀÐÉ•Í½ÕÉ”…¹½É¥¥¹…°Í•¹”¡¥ÍÑ½Éä¸)1…å•ÉÌÁ…¹•°èÍ•±•Ð½Ñ½Àµ™¥ÉÍÐ°€¬1…å•È€¡µ…àÌ¤°É•¹…µ”½É•½É‘•È½‘•±•Ñ”°Ù¥Í¥‰¥±¥Ñä°)±…å•È½Á…¥Ñä…¹ÈØµ½‘•Ì¸	…Í”Á…¥¹Ñ…‰±”½½Á…ÅÕ”ì•á¥ÍÑ¥¹œØÄ½¹Ù•ÉÑÌ½¹±ä½¸€¬1…å•È¸)M…µ”É…ÍÑ•È…¥¹Ì½ÁÑ¥½¹…°ÍÑÉ…¥¡Ðµ…±Á¡„±…å•Èµ½‘”Ý¥Ñ ÁÉ•Í•ÉÙ•½Á…ÅÕ”‘•™…Õ±Ð°)ÁÉ•ÍÍÕÉ”½¡…É‘¹•ÍÌ½Á•ÈµÍÑÉ½­”…À½…¹•°ìÍ…µ”ÍÑÉ½­”½¥¹ÁÕÐ½É…å…ÍÐ½¹…Ù¥…Ñ¥½¸½Ý¹•ÉÌ¸)M•Á…É…Ñ”µÕÑ…‰±”±…å•È½½µÁ½Í¥Ñ”ÁÉ•Ù¥•Üì½É¥¥¹…°½¹”‘¥ÉÑäÕÁ±½…½™É…µ”ì¹¼µ•…ÍÕÉ•)4ÈÁ•É™½Éµ…¹”±…¥´¸]¡½±”µÍÑ…¬½Á¥•Ì½ÁÉ•™±¥¡ÐÉ•µ…¥¸°¹½ÐÍÁ…ÉÍ”½ÁÑ¥µ¥é…Ñ¥½¸¸)Ù•Éä¡…¹•ÍÑÉ½­”½µ•Ñ…‘…Ñ„½Á•É…Ñ¥½¸¡•­Á½¥¹ÑÌ½É¥¥¹…°Í•¹”…¹=\É•Á±…•Ì)É•Í½ÕÉ”ìÍ•±•Ñ¥½¸½¹¼µ½ÀÉ•…Ñ•Ì¹¼¡¥ÍÑ½Éä¸Õ±°µÍ•¹”á5¥Á½½°¡•­•	=I)¡•­Á½¥¹Ðì¥¹Ù…±¥½‰Õ‘•Ð½¡•­Á½¥¹Ð™…¥±ÕÉ”É•ÍÑ½É•Ì½É¥¥¹…°É•Í½ÕÉ”½ÁÉ•Ù¥•Ü¸)MÑ½É•µ…Í­ÌÁ•ÉÍ¥ÍÐì¹¼µ…Í¬½¥µ…”½µ…Ñ•É¥…°U$±…¥´¸M…Ù”½=Á•¹ØÌ…¹™±…Ð9=4½1ÕÍ”)½É¥¥¹…°äÀÐ½Ý¹•ÉÌ¸!¥‘‘•¸½é•É¼½Á…¥Ñä±…å•ÈÉ•™ÕÍ•ÌÍÑÉ½­•ÌÝ¡¥±”Á…¹•°ÍÑ…åÌ½Á•¸¸)M•Ù•¸™½ÕÍ•äÀÔ¡•­ÌAMLì…±°½É¥¥¹…°äÀÀ…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¥¸•áÑÉ…Ñ•Í¡…É•)ÉÕ¹Ñ¥µ”¸äÀÐÉ•™ÕÍ…°…ÍÍ•ÉÑ¥½¸ÍÕÁ•ÉÍ•‘•‰äÉ•…°±…å•É•½Á•¹¥¹œ½•‘¥Ñ…‰±”µÁ…Ñ Ñ•ÍÑÌ¸)I•…‘½Ì½Á…¥¹Ðµ±…å•ÈµÕ¤´äÀÔ¹µ¸¡…¹•Á…¥¹Ñ•È½Í¡…É•É…ÍÑ•È…¹1…ˆ±½…‘•ÈÉ…Á äÀÔì)½µÁ½Í¥Ñ½ÈäÀÌ½É•Í½ÕÉ”­ÁÉ½©•Ð­•áÁ½ÉÐäÀÐ½ÍÑÉ½­”àäØ½ÁÉ½Ñ•Ñ•½™É½é•¸½Ý¹•ÉÌÉ•Ñ…¥¹•¸)9•áÐY%±…å•È½A•¹¥°½¹…Ù¥…Ñ¥½¸½Á•ÉÍ¥ÍÑ•¹”™••‘‰…¬°Ñ¡•¸µ…Í¬Á…¥¹Ð½U$Ñ¡É½Õ )Í…µ”½Ý¹•ÉÌ°™½±±½Ý•‰ä¥µ…”ÁÉ½©•Ñ¥½¸½%¹Í•ÉÐå±”½µ…Ñ•É¥…°Á±…¸¸Õ±°ÍÕ¥Ñ”…¹)ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½Ü¸9¼äÀÔÕÍ•ÉAML½ÈÉ•¹‘•É•‰É½ÝÍ•È•Ù¥‘•¹”¥¹™•ÉÉ•¸((´máuQÉ…¹ÍÁ…É•¹Ð½½Á…ÅÕ”É…ÍÑ•ÈÙ•Ñ½ÉÌ°…±Á¡„½Ù•É…”½…¹•°°Í…µ”½É¥¥¹…°ÍÑÉ½­”¸(´máuÑÕ…°±…å•ÈU$½A•¹¥°ÍÑ…Ñ”½¡¥ÍÑ½Éä½‰…Í”¥Í½±…Ñ¥½¸½½É‘•È½¹…µ”½Ù¥Í¥‰¥±¥Ñä½‰±•¹‘Ì¸(´máuM•¹”‰Õ‘•Ð½¡•­Á½¥¹ÐÉ½±±‰…¬°µ…Í­ÌÉ•Ñ…¥¹•°ØÌÉ”µ½Á•¸…¹¹…Ñ¥Ù”•áÁ½ÉÐ¸(´mát ¸äÀÔÕÍ•ÈAML¤QÝ¼½¹ÑÉ…ÍÑ¥¹œ±…å•ÉÌ€¬‰…Í”èÍ•±•Ð½É•½É‘•È½¡¥‘”½½Á…¥Ñä½‰±•¹°A•¹¥°½™¥¹•ÉÌ¸(´mát ¸äÀÔÕÍ•ÈAML¤½¹”½U¹‘½I•‘¼½É•½Á•¸…¹€¹‰½á±…ˆÉ•±½…½=Á•¸­••À•‘¥Ñ…‰±”±…å•ÉÌ¸(´mát ¸äÀÔÕÍ•ÈAML¤ÕÁ±¥…Ñ”±…å•È•‘¥ÑÌ¥¹‘•Á•¹‘•¹Ðì¹…Ñ¥Ù”9=4½1½ÁÑ¥½¹…°½±½ÕÈÍ…¹¥Ñä¸((¸äÀÔ±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨ÈÔÈØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì)Í•Ù•¸¹•Ü±…å•È½É…ÍÑ•È½U$¡•­ÌAML°½É¥¥¹…°Í•µ…¹Ñ¥Œ¡•­ÌÉ•Ñ…¥¹•¸¥A……Ñ”Á•¹‘¥¹œ¸(((ŒŒ€¸äÀØƒŠPµ…¥¸Ù¥•ÝÁ½ÉÐ±…å•Èµ…Í¬Á…¥¹Ñ¥¹œì€¸äÀÔAMLƒŠP€ÈÀÈØ´ÄÀ´Äà()UÍ•ÈäÀÕAMLè±…å•ÉÌÝ½É¬Ý•±°ìU$½U`Á½±¥Í …™Ñ•È™•…ÑÕÉ”™±½ÝÌ…É”ÁÉ•Í•¹Ð¸Õ‘¥Ð)µ…¥¹˜àÐÔÔÈÌØ½±½…°Ù•É¥™¥•äÀÔÑÉ••™ˆäÀÈÈÜÐèÉ•ÕÍ”äÀÌµ…Í­Ì½½µÁ½Í¥Ñ½È°äÀÐÉ•Í½ÕÉ”¼)ÁÉ½©•Ð½¡¥ÍÑ½Éä½•áÁ½ÉÐ…¹äÀÔÉ…ÍÑ•È½¥¹ÁÕÐ¸‘5…Í¬Í•±•ÑÌ5…Í¬Á…¥¹ÐÑ…É•ÐìÍ…µ”)½Á…ÅÕ”É…ÍÑ•È•‘¥ÑÌÉ…ÜÉ•ä½Ù•É…”°Hà½µµ¥ÑÑ•°Í½ÕÉ”½±½ÕÈÁ¥á•±ÌÕ¹¡…¹•¸)!¥‘”½I•Ù•…°½É•ä‰ÉÕÍ ÁÉ•Í•ÑÌ…½Õ¹Ð™½È¥¹Ù•ÉÍ¥½¸ìÉ…ÜÙ…±Õ”ÃŠLÈÔÔÍ±¥‘•È°Í¥é”¼)¡…É‘¹•ÍÌ½ÁÉ•ÍÍÕÉ”½½Á…¥Ñä…¹‰½Ñ Í…µÁ±•ÉÌÉ•Ñ…¥¹•¸½±½ÕÈÁ¥­•ÈÁÉ•Í•ÉÙ•½‘¥Í…‰±•)¥¸5…Í¬µ½‘”¸1…å•ÈÍÝ¥Ñ ½É•½Á•¸ÍÑ…ÉÑÌ½±½ÕÈì‰…Í”¡…Ì¹¼µ…Í¬¸¹…‰±•½¥¹Ù•ÉÐ¼)É•µ½Ù”ÕÍ”=\€¬½É¥¥¹…°¡•­Á½¥¹ÑÌìÍ•±•Ñ¥½¸½ÁÉ•Í•Ð½¹¼µ½À‘¼¹½ÐÉ•…Ñ”¡¥ÍÑ½Éä¸)…¹•°½Í•ÑÑ¥¹Ì½Ñ…É•Ð½±…å•È½‰½‘äµ±½ÍÌÉ•ÍÑ½É”µ…Í¬½ÁÉ•Ù¥•Ü½¹…Ù¥…Ñ¥½¸¸A…É•¹Ð±…å•È)µÕÍÐÍ¡½Ü½¹½¹é•É¼½Á…¥Ñä…¹µ…Í¬•¹…‰±•Ñ¼Á…¥¹Ð¸=É¥¥¹…°á5¥ÁÉ•™±¥¡Ð½É½±±‰…¬)ÁÉ•Í•ÉÙ•¸M…µ”É•Í½ÕÉ•ØÈ½ÁÉ½©•ÑØÌ½™±…Ð9=4­1°¹¼¹•ÜÍ¡•µ„½¡¥ÍÑ½Éä½­•É¹•°¸)M•Ù•¸™½ÕÍ•äÀØÑ•ÍÑÌAML¥¹°…ÑÕ…°U$½½É”½Í½ÕÉ”ÁÉ•Í•ÉÙ…Ñ¥½¸°™±…Ì½U¹‘½I•‘¼°)¥¹Ñ•ÉÉÕÁÑ¥½¸½¥¹Ù…±¥½‰Õ‘•Ð½¡•­Á½¥¹ÐÉ½±±‰…¬°•á…ÐM…Ù”½=Á•¸½É”µ•‘¥Ð…¹¹…Ñ¥Ù”)•áÁ½ÉÐ¸Õ±°ÍÕ¥Ñ”½ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌì¹¼É•¹‘•É•½¥A……•ÁÑ…¹”¥¹™•ÉÉ•¸)I•…‘½Ì½Á…¥¹Ðµµ…Í¬µÕ¤´äÀØ¹µ¸=¹±äµ…¥¸Á…¥¹Ñ•È€¬Í¡•±°½É•½Ù•ÉääÀØìÉ…ÍÑ•È½1…ˆäÀÔ°)½µÁ½Í¥Ñ½ÈäÀÌ½É•Í½ÕÉ”­ÁÉ½©•Ð­•áÁ½ÉÐäÀÐ…¹ÁÉ½Ñ•Ñ•µ½‘•±±¥¹œ½5Õ±Ñ¤½™É½é•¸Õ¹Ñ½Õ¡•¸)9•áÐY%µ…Í¬…Ñ”°Ñ¡•¸•‘¥Ñ…‰±”¥µ…”Í½ÕÉ•Ì½AÉ½©•Ð™É½´Y¥•ÜÑ¡É½Õ ½É¥¥¹…°)UX½•½µ•ÑÉä…¹%¹Í•ÉÐå±”¸9¼µ…Ñ•É¥…°½Á…¥Ñä½‘¥ÍÁ±…•µ•¹Ð½È‰É½…U$É•‘•Í¥¸)±…¥´¸AÉ½‘ÕÐ‘¥É•Ñ¥½¸É•µ…¥¹Ì‘½Ì½Á…¥¹Ðµµ…Ñ•É¥…°µ‘¥É•Ñ¥½¸¹µ¸((´máu5…Í¬ÍÑÉ½­•ÌÁÉ•Í•ÉÙ”•á…Ð½±½ÕÈÁ¥á•±Ìì!¥‘”½I•Ù•…°½É•äÉ…Ü½Ù•É…”¸(´máuÑÕ…°U$½ÁÉ•Í•ÑÌ½¥¹Ù•ÉÍ¥½¸½½±½ÕÈÉ•ÑÕÉ¸½É•µ½Ù…°…¹Í•ÑÑ¥¹Ì…¹•±±…Ñ¥½¸¸(´máu±…Ì½¹¼µ½À½½É¥¥¹…°¡•­Á½¥¹ÑÌ½U¹‘½I•‘¼°±½ÍÌ½‰Õ‘•Ð½¡•­Á½¥¹ÐÉ½±±‰…¬¸(´máuá…ÐÁÉ½©•ÑØÌÉ”µ½Á•¸½É”µ•‘¥Ð…¹½É¥¥¹…°¹…Ñ¥Ù”½µÁ½Í•½±½ÕÈ•áÁ½ÉÐ¸(´lt¬5…Í¯ŠI!¥‘”½I•Ù•…°½É•ä½¸µ•Í ìÙ¥Í¥‰±”É•ÍÕ±ÑÌ°A•¹¥°½™¥¹•ÉÌÕ¹¡…¹•¸(´lu¹…‰±•½¥¹Ù•ÉÐ½É•µ½Ù”­U¹‘¼É•ÍÑ½É”Õ¹‘•É±å¥¹œ±…å•ÈìM…Ù”½=Á•¸½É•Í•±•Ð5…Í¬¸((¸äÀØ±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨ÈÔÌÌAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì)Í•Ù•¸¹•Üµ…Í¬U$½½É”Ñ•ÍÑÌAML¸•Ù¥”äÀØÁ•¹‘¥¹œì¹¼É•¹‘•É•ÁÉ½½˜¥¹™•ÉÉ•¸(((ŒŒ€¸äÀÜƒŠP•‘¥Ñ…‰±”¥µ…”Í½ÕÉ”…¹Á±…•µ•¹Ð™½Õ¹‘…Ñ¥½¸ì€¸äÀØAMLƒŠP€ÈÀÈØ´ÄÀ´Äà()UÍ•ÈäÀÙAMLÁÉ½Ñ•ÑÌµ…Í¬½A•¹¥°½¹…Ù¥…Ñ¥½¸½¡¥ÍÑ½Éä½ÁÉ½©•Ð‰•¡…Ù¥½ÕÈ¸Õ‘¥ÐÉ•µ½Ñ”(ÐÜÜàÔØÝŒ…¹•á¥ÍÑ¥¹œÉ•…µ½¹±äUX¥µ…”àäÈ½%¹Í•ÉÐÐÌÜ½Ý¹•ÉÌ¸9•Ü¥Í½±…Ñ•¥µ…”)Í½ÕÉ”¥µÁ½ÉÑ•ÈÉ•Ñ…¥¹Ì½É¥¥¹…°•¹½‘•A9½)A€¬½Ý¹•‘•½‘•I	°ÁÉ•™±¥¡Ð(É5¥¼ÄÀÈÓ
È‰•™½É”‰¥Ñµ…À‘•½‘”°•á…Ð‘¥µ•¹Í¥½¹Ì°…Íå¹ŒÍ¹…ÁÍ¡½Ð…¹±•…¹ÕÀ¸)…µ•É„Á±…•µ•¹ÐÍ¹…ÁÍ¡½ÑÌ½É¥¥¹…°Q¡É•”µ…ÑÉ¥•ÌÁ±ÕÌ9•¹ÑÉ”½Í¥é”½É½Ñ…Ñ¥½¸ì)ÁÉ½©•Ñ½È±¥ÁÌ…µ•É„½¥µ…”‰½Õ¹‘Ì°É•ÑÕÉ¹ÌÑ½Àµ™¥ÉÍÐUYÌ¸=É¥¥¹…°%¹Í•ÉÐå±”)É”µ•áÁ½ÉÑ•Ù•É‰…Ñ¥´ì¹¼¹•ÜÁ½¥¹Ñ•È½µ•Í ½¡¥ÍÑ½Éä½Ý¹•È¸M¥à™½ÕÍ•Ñ•ÍÑÌAML¸)I•…‘½Ì½Á…¥¹Ðµ¥µ…”µÍ½ÕÉ”´äÀÜ¹µ™½È‰É½ÝÍ•È½±½ÕÈ½…±Á¡„½a%…¹µ•µ½Éä±¥µ¥ÑÌ¸)9=P½¹¹•Ñ•Ñ¼Á…¥¹Ñ•È°±…å•È½ÁÉ½©•ÐÍ¡•µ„½ÈU$å•Ð¸½½É‘¥¹…Ñ”ÁÉ½©•Ñ¥½¸)‘½•Ì9=P•¹™½É”™…¥¹œ½…¹±”½Í•¹”½±ÕÍ¥½¸ì•á¥ÍÑ¥¹œÁ…¥¹Ñ•ÈµÕÍÐ‘¼Í¼‰•™½É”)É…ÍÑ•É¥é…Ñ¥½¸¸9¼AÉ½©•Ð™É½´Y¥•Ü½ÍÕÉ™…”Á±…•µ•¹Ð½µ…¹Õ…°‘•Ù¥”±…¥´¸)5…¥¸Á…¥¹ÐäÀØ½É•Í½ÕÉ”äÀÐ½½µÁ½Í¥Ñ½ÈäÀÌ½ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸)9•áÐ•áÁ±¥¥Ð¥µ…”Í½ÕÉ”­Á±…•µ•¹ÐÉ•Í½ÕÉ”½Á½½°Ù•ÉÍ¥½¹¥¹œ…¹½É¥¥¹…°¡¥ÍÑ½Éä¼)ÁÉ½©•Ð½•áÁ½ÉÐ¥¹Ñ•É…Ñ¥½¸°Ñ¡•¸Á¥­•È½½Ù•É±…ä½Ù¥Í¥‰±”µ™É½¹ÐÁÉ½©•Ñ¥½¸U$¸)9¼¹•Ü¡…¹‘Ìµ½¸…Ñ”Ñ¡¥Ì™½Õ¹‘…Ñ¥½¸‰Õ¥±ì€¸äÀØAML¥ÌÁÉ½Ñ•Ñ•°¹½ÐäÀÜ¥µ…”U$¸((´mátUÍ•È€¸äÀØAMLèµ…Í¬‰ÉÕÍ ½™±…Ì½U¹‘½I•‘¼½ÁÉ½©•Ð½¹…Ù¥…Ñ¥½¸ÁÉ½Ñ•Ñ•¸(´mát€¸äÀÜ½É¥¥¹…°‰åÑ”½Á¥á•°½Ý¹•ÉÍ¡¥À°µ…±™½Éµ•½‘¥µ•¹Í¥½¸½‰Õ‘•ÐÉ•™ÕÍ…°¸(´mátÍå¹Œ‘•½‘”Í¹…ÁÍ¡½Ð…¹±•…¹ÕÀ½¸ÍÕ•ÍÌ°‘¥µ•¹Í¥½¸½…¹Ù…Ì™…¥±ÕÉ•Ì¸(´mátÑÕ…°Q¡É•”Á•ÉÍÁ•Ñ¥Ù”½½ÉÑ¡½É…Á¡¥ŒÍ¹…ÁÍ¡½Ð…¹Á±…•µ•¹Ð½½É‘¥¹…Ñ•Ì¸(´mátM¡…É•%¹Í•ÉÐå±”ì¹¼Í•½¹Á½¥¹Ñ•È½Èµ•Í ­•É¹•°¸(´ltÕÑÕÉ”ÁÉ½©•Ñ½È¥¹Ñ•É…Ñ¥½¸µÕÍÐ•¹™½É”™…¥¹œ½…¹±”½Í•¹”½±ÕÍ¥½¸¸(´9¼€¸äÀÜ¥µ…”U$½‘•Ù¥”…Ñ”è¥Í½±…Ñ•µ½‘Õ±•Ì½¹±ä¸((¸äÀÜ±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨ÈÔÌäAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ìÍ¥à¹•Ü)™½ÕÍ•¥µ…”Í½ÕÉ”½Á±…•µ•¹Ð¡•­ÌAML¸9¼¹•Ü¥µ…”U$½È‘•Ù¥”…Ñ”¸(((ŒŒ€¸äÀàƒŠPÉ•Ñ…¥¹•¥µ…”±…å•ÉÌ¥¸½É¥¥¹…°É•Í½ÕÉ”½ÁÉ½©•Ð½Ý¹•ÉÌƒŠP€ÈÀÈØ´ÄÀ´Äà()Õ‘¥Ñ™„àÅ…˜ÍèäÀÜ¥¹ÁÕÐ½Á±…•µ•¹Ð¥Í½±…Ñ•ìäÀÌ¼äÀÐÍÑÉ¥ÐÉ…ÍÑ•Èµ½¹±äÍÑ½É…”¸áÑ•¹)M5ÍÑ…¬½É•Í½ÕÉ”½Á½½°Ñ¼•áÁ±¥¥ÑØÌ…¹Í•¹•ÁÉ½©•ÑØÐ¸%µ…”É•¥Á”É•Ñ…¥¹Ì½É¥¥¹…°)•¹½‘•­‘•½‘•Í½ÕÉ”°Á±…•µ•¹Ð…¹…™™¥¹”…ÁÑÕÉ”™É…µ”°Í•Á…É…Ñ”ÍÕÉ™…”É…ÍÑ•È¸)A…¥É•¥µ…”­ÁÉ•Ù¥•Ü…ÁÁ•¹½É•Á±…”A%Ìì•¹•É¥Œ½±½ÕÈÁ¥á•°•‘¥ÑÌÉ•™ÕÍ”¥µ…•Ì¸)±°Í½ÕÉ”½…¡”½µ…Í¬½™±…Ð½‰…Í”‰åÑ•Ì¡…É•Ñ¼•á¥ÍÑ¥¹œá5¥Á½½°	=I‘•½‘”ì)±•…äÁÉ½©•ÑÌ…¹¹…Ñ¥Ù•UYØÌÕ¹¡…¹•¸=É¥¥¹…°Í•¹”¡¥ÍÑ½Éä½U¹‘¼½Í¥¹±”­5Õ±Ñ¤)ÕÁ±¥…Ñ”½…Ñ½µ¥Œ¥±”=Á•¸…¹™±…ÑÑ•¹•9=4½1É•Ñ…¥¹•¸á¥ÍÑ¥¹œÁ…¥¹Ñ•ÈÍÕÁÁ½ÉÑÌ)ØÌ½¹ÑÉ½±Ì½µ…Í­ÌÝ¥Ñ ¥µ…”±…‰•°…¹½±½ÕÈµÍÑÉ½­”Õ…É°¹¼¥µÁ±¥¥Ð‰…­”¸)¥¡Ð™½ÕÍ•…ÑÕ…°½‘•Œ½¡¥ÍÑ½Éä½¥±”½Á…¥¹Ñ•È½U$½•áÁ½ÉÐ¡•­ÌAML¸9¼¹•Ü¥µ…”)Á¥­•È½AÉ½©•ÐU$°™…¥¹œ½½±ÕÍ¥½¸É…ÍÑ•É¥é•È½ÈÉ•¹‘•É•½‘•Ù¥”±…¥´å•Ð¸)M½ÕÉ”­Á±…•µ•¹ÐäÀÜ½‰ÉÕÍ äÀÔ½‰±•¹äÀÌ½%¹Í•ÉÐÐÌÜ½ÁÉ½Ñ•Ñ•µ½‘•±±¥¹œ½5Õ±Ñ¤½™É½é•¸É•Ñ…¥¹•ì)¡…¹•½Ý¹•ÉÌ…¹Á…É•¹Ð½1…ˆ±½…‘•ÈÉ…Á äÀà¸I•…‘½Ì½Á…¥¹Ðµ¥µ…”µÉ•Í½ÕÉ•Ì´äÀà¹µ¸)9•áÐÙ¥Í¥‰±”Á¥­•È½½Ù•É±…ä½AÉ½©•ÐÙ¥„½É¥¥¹…°UX•½µ•ÑÉä…¹ÕÉÉ•¹ÐÙ¥•ÝÁ½ÉÐ¥¹ÁÕÐ°)™É½¹Ð½…¹±”½Í•¹”½Í•±˜µ½±ÕÍ¥½¸‰•™½É”Ñ•á•°…•ÁÑ…¹”°…Ñ½µ¥ŒÉ•¥Á”­É…ÍÑ•È½µµ¥Ð¸)5…¹Õ…°è•á¥ÍÑ¥¹œÁ…¥¹Ð½µ…Í­ÌM…Ù”½=Á•¸½½¹Ñ¥¹Õ”°U¹‘½I•‘¼°‘ÕÁ±¥…Ñ”½•áÁ½ÉÐÍ…¹¥Ñä¸)1…Ñ•ÍÐÕÍ•ÈäÀÙAMLÁÉ½Ñ•Ñ•ì¹¼äÀÜ¼äÀà‘•Ù¥•AML¥¹™•ÉÉ•¸((´mátäÀà•á…Ð¥µ…”Í½ÕÉ”½…¡”½™É…µ”½Ý¹•ÉÍ¡¥À°½±½µÁ½Í¥Ñ½È…É¥Ñ¡µ•Ñ¥ŒÉ•Ñ…¥¹•¸(´máuAÉ½©•ÑØÐ•á…Ð½É¥¥¹…°‰Õ™™•ÉÌ½µ•Ñ…‘…Ñ„½µ…Í­Ì°Ý¡½±”µÉ•Í½ÕÉ”‘•‘ÕÀ°½±‘ØÇŠLÌ¸(´máuMÑÉ¥ÐÙ•ÉÍ¥½¸½Í¡•µ„½™É…µ”½…¡”½É•™ÕÍ…°ì½µÁ±•Ñ”Í½ÕÉ”­…¡”Á½½°ÁÉ•™±¥¡Ð¸(´máuÑÕ…°¥±”M…Ù”½=Á•¸…Ñ½µ¥ŒÉ½±±‰…¬°Í¥¹±”½5Õ±Ñ¤ÕÁ±¥…Ñ”½±½‰…°¡¥ÍÑ½Éä¸(´máuÑÕ…°¥µ…”µ…Í¬½U$½Á…¥¹Ñ•ÈÕ…É‘Ì°¹½Éµ…°Á…¥¹Ð±…å•ÉÌ…¹É”µ•‘¥Ð…™Ñ•È=Á•¸¸(´máu	Õ‘•Ð½¡•­Á½¥¹ÐÉ½±±‰…¬°½É¥¥¹…°9=4­1™±…ÑÑ•¹•‰åÑ•Ì…¹…Íå¹ŒÍ¹…ÁÍ¡½Ð¸(´ltäÀà•á¥ÍÑ¥¹œÁ…¥¹Ð­µ…Í¬M…Ù”½=Á•¸½½¹Ñ¥¹Õ”…¹™¥¹•ÉÌìU¹‘½I•‘¼½ÕÁ±¥…Ñ”½•áÁ½ÉÐ¸(´ÕÑÕÉ”¥µ…”Á¥­•È½ÁÉ½©•Ñ¥½¸…Ñ”¥ÌÍ•Á…É…Ñ”ì¹¼¥µ…”™¥áÑÕÉ”Ñ…Í¬™½ÈÕÍ•È¸((¸äÀà±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨ÈÔÐÜAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì•¥¡Ð¹•Ü)¥µ…”É•Í½ÕÉ”½¡¥ÍÑ½Éä½ÁÉ½©•Ð½U$½•áÁ½ÉÐ¡•­ÌAML¸•Ù¥”…Ñ”É•µ…¥¹ÌÍ•Á…É…Ñ”¸(((ŒŒ€¸äÀäƒŠP‘ÕÁ±¥…Ñ”Á…¥¹ÐÉ•±•…Í”™¥àì€¸äÀàÕÍ•È%0ƒŠP€ÈÀÈØ´ÄÀ´Äà()UÍ•Èè‘ÕÁ±¥…Ñ”Á…¥¹Ð‘¥Í…ÁÁ•…ÉÌ½¸A•¹¥°É•±•…Í”¸I•ÁÉ½‘Õ•½É¥¥¹…°ÕÁ±¥…Ñ”€¬)…ÑÕ…°U$°Í±…å•ÉÌèÝ¡½±”µÉ•Í½ÕÉ”ÅÕ½Ñ„‘½Õ‰±”µ¡…É•ÌÕ¹¡…¹•‰…Í”½±…å•ÉÌ½™±…Ð…¹)É•™ÕÍ•Ìá5¥½µµ¥Ð¸á¥ÍÑ¥¹œ‘¥É•Ðµ…ÍÍ¥¹µ•¹ÐÕÁ±¥…Ñ”Ñ•ÍÑÌµ¥ÍÍ•…ÑÕ…°É•±•…Í”¸)I•Á…¥ÈM5Á…¥¹ÐÁ½½°è•á…Ð…¹½¹¥…°‰Õ™™•Èµ½¹Ñ•¹Ð‘•‘ÕÀ°á5¥Õ¹¥ÅÕ”€¼ÄÙ5¥)•áÁ…¹‘•É•Í½ÕÉ”…À¸áÁ±¥¥ÐÍ•¹•ØÔÍ¡…É•µ‰åÑ”ÑÉ…¹ÍÁ½ÉÐ½¹±äÝ¡•¸¥¹±¥¹”øá5¥ì)½±Í•¹•ØÇŠLÐ•¹½‘¥¹œÉ•Ñ…¥¹•‰•±½Ü±¥µ¥Ð°½µÁ±•Ñ”ÁÉ•‘•½‘”½Í¡•µ„½É•˜Õ…É‘Ì¸)=É¥¥¹…°¡¥ÍÑ½Éä½U¹‘¼½ÕÁ±¥…Ñ”½…Ñ½µ¥Œ¥±”=Á•¸…¹™±…Ð9=4½1Õ¹¡…¹•¸±°Á…¥¹Ð)½µµ¥ÑÌÁÉ•™±¥¡ÐÍ…µ”Á½½°°¥¹±Õ‘¥¹œ½Á…ÅÕ”ì™…¥±•½µµ¥ÐÉ•ÍÑ½É•Ì‰Õ™™•ÉÌ…¹)­••ÁÌA…¥¹ÐÁ…¹•°½Á•¸¸¥Ù”¹•ÜÉ•É•ÍÍ¥½¹Ì½Ù•ÈÉ•…°Í¥¹±”­5Õ±Ñ¤½ÁäÁ…¥¹Ð½É•±•…Í”°)½µµ¥ÑÑ•‘¥ÍÁ±…ä½¡¥ÍÑ½Éä½…ÑÕ…°M…Ù•=Á•¸½É”µ•‘¥Ð°½ÉÉÕÁÐÁ½½°­‰½Ñ ‰Õ‘•ÑÌ½…Ñ½µ¥Œ)É½±±‰…¬°•¹Õ¥¹”±¥µ¥ÑÌ½ÍÑ…•…‘…¹É•½Ù•É…‰±”U$É•™ÕÍ…°¸äÀØ‰Õ‘•Ð™¥áÑÕÉ”)¹½ÜÕÍ•Ì•¹Õ¥¹•±ä‘¥ÍÑ¥¹Ð‘…Ñ„ìÅÕ½Ñ„½É½±±‰…¬…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸M•”)‘½Ì½Á…¥¹Ðµ‘ÕÁ±¥…Ñ”´äÀä¹µ¸¡…¹•½Ý¹•ÉÌ½Á…É•¹Ð½1…ˆ…¡”äÀäìÍÑ…¬½¥µ…”äÀà°)Í½ÕÉ”äÀÜ½‰ÉÕÍ äÀÔ½‰±•¹äÀÌ½%¹Í•ÉÐÐÌÜ½ÁÉ½Ñ•Ñ•5Õ±Ñ¤½™É½é•¸½µ½‘•±±¥¹œÉ•Ñ…¥¹•¸)1…Ñ•ÍÐ‘•Ù¥•AMLäÀØìäÀà‘ÕÁ±¥…Ñ•%0É•½É‘•ìäÀä‘•Ù¥”É•Ñ•ÍÐÁ•¹‘¥¹œ¸)9•áÐ‘•Ù¥”‘ÕÁ±¥…Ñ”É•±•…Í”½½¹”½M…Ù•=Á•¸½U¹‘¼°Ñ¡•¸É•ÍÕµ”AÉ½©•Ð™É½´Y¥•ÜU$¸((´mátäÀä…ÑÕ…°Í¥¹±”95Õ±Ñ¤™Õ±°µÍÑ…¬‘ÕÁ±¥…Ñ”ÍÑÉ½­•ÌÍÕÉÙ¥Ù”É•±•…Í”¸(´máuM½ÕÉ”Õ¹¡…¹•°½µµ¥ÑÑ•ÍÕÉ™…”½U¹‘½I•‘¼…¹É•…°¥±”M…Ù•=Á•¸½É”µ•‘¥Ð¸(´máuM¡…É•‰åÑ”Á½½°É•™Ì½Ù•ÉÍ¥½¹Ì½…¹½¹¥…°‘…Ñ„½‘ÕÁ±¥…Ñ•Ì½ÕÍ…”É•™ÕÍ”…Ñ½µ¥…±±ä¸(´mátá5¥Õ¹¥ÅÕ”…¹ÄÙ5¥•áÁ…¹‘•ÁÉ•™±¥¡Ð‰•™½É”‘•½‘”ìÍÑ…•ÅÕ½Ñ„É½±±‰…¬¸(´máu•¹Õ¥¹”™…¥±•ÍÑÉ½­”É•ÍÑ½É•Ì‘…Ñ„½¡¥ÍÑ½Éä½½¹ÑÉ½±Ì…¹­••ÁÌA…¥¹Ð½Á•¸¸(´mátäÀäY%‘ÕÁ±¥…Ñ”Í±…å•ÈÁ…¥¹ÐƒŠH±¥™ÐA•¹¥°ƒŠH½¹”½É•Í•±•ÐìÍ½ÕÉ”Õ¹¡…¹•¸UMHäÀåAML¸(´mátäÀäY%M…Ù”½=Á•¸½½¹Ñ¥¹Õ”½U¹‘½I•‘¼½¸‘ÕÁ±¥…Ñ”¸UMHäÀåAML±•…ÉÌäÀàÉ•±•…Í”™…¥±ÕÉ”ì¹…Ñ¥Ù”•áÁ½ÉÐ•á•ÁÑ¥½¸ÑÉ…­•äÄÀ¸((¸äÀä±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨ÈÔÔÈAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì™¥Ù”¹•Ü)…ÑÕ…°‘ÕÁ±¥…Ñ”½Á½½°½É•½Ù•ÉäÉ•É•ÍÍ¥½¹ÌAML¸•Ù¥”É•±•…Í”É•Ñ•ÍÐÁ•¹‘¥¹œ¸(((ŒŒ€¸äÄÀƒŠP¹…Ñ¥Ù”Á…¥¹ÐÑ•áÑÕÉ”µ¹…µ”½±±¥Í¥½¹Ìì€¸äÀäÙ¥•ÝÁ½ÉÐAMLƒŠP€ÈÀÈØ´ÄÀ´Äà()UÍ•ÈäÀåAMLÁÉ½Ñ•ÑÌ‘ÕÁ±¥…Ñ”Á…¥¹ÐÉ•±•…Í”½½¹”½M…Ù•=Á•¸½U¹‘¼ì9=5•á•ÁÑ¥½¸è)½Áä…‘½ÁÑÌ½É¥¥¹…°Á…¥¹Ð¸MÉ••¹Í¡½ÑÌÍ¡½ÜäÀä½É••¸½ÁäÍÑÉ½­•Ì¥¸	½á1…ˆ°…‰Í•¹Ð)¥¸9½µ…¸Õ‘¥ÑŒÅˆÌÔÁ”ÀèÁÉ•Á…É•A9Ì½µ…Ñ•É¥…°­¥µ…”¥¹‘¥•Ì…±É•…‘ä‘¥ÍÑ¥¹Ð°‰ÕÐ…±°)Á…¥¹ÐÑ•áÑÕÉ•Ì¹…µ•‘	½á1…ˆÁ…¥¹Ð¹Á¹œ¸I•Á…¥È…ÕÑ¡½É¥Ñ…Ñ¥Ù”¹…Ñ¥Ù”ÝÉ¥Ñ•È¹…µ”É•¥ÍÑÉäè)9½…Í”µ™½±‘•½±±¥Í¥½¸¹…µ•Ì•Ð¹Õµ•É¥ŒÍÕ™™¥à™½È%I9P¥µ…”¥¹‘¥•Ìì•ÅÕ…°)¥µ…•Ì­••ÀÍ¡…É¥¹œ°Õ¹¥ÅÕ”¹…µ•Ì…¹•á¥ÍÑ¥¹œ…±¥…Í•ÌÉ•Ñ…¥¹•¸áÁ½ÉÐµ±½…°½¹±äì)Í½ÕÉ”‰åÑ•Ì½¹…µ•Ì°àäÀ•á…Ð¥µ…”‘•‘ÕÀ°™…Ñ½ÉÌ½UX½½™™Í•ÑÌ¼ÈÑ5¥‰Õ‘•ÐÕ¹¡…¹•¸)½ÕÈ…ÑÕ…°9=4½¥±”½M…Ù•=Á•¸½…Íå¹Œ½‘•‘ÕÀ½µ¥á•µ¹…µ”É•É•ÍÍ¥½¸Ñ•ÍÑÌAML¸½¹ÍÕµ•È)¹…µ”…¡¥¹œ¥Ì…¸¥¹™•É•¹”ì…ÑÕ…°9½µ…‘•Ù¥”É•Ñ•ÍÐÉ•µ…¥¹ÌÉ•ÅÕ¥É•¸I•…)‘½Ì½Á…¥¹Ðµ¹½µ…µ‘ÕÁ±¥…Ñ”´äÄÀ¹µ¸9…Ñ¥Ù”½¥±”½1…ˆ±½…‘•ÈÉ…Á äÄÀìÙ¥•ÝÁ½ÉÐ½É•Í½ÕÉ”¼)¡¥ÍÑ½Éä½Á½½°äÀä…¹ÁÉ½Ñ•Ñ•5Õ±Ñ¤½µ½‘•±±¥¹œ½™É½é•¸Õ¹¡…¹•¸)9•áÐY%É”µ•áÁ½ÉÐ½É¥¥¹…°­É••¸½Áä™É½´äÄÀì½¹™¥É´‘¥ÍÑ¥¹ÐÁ…¥¹Ð¥¸9½µ…°)Ñ¡•¸Í•½¹•áÁ½ÉÐ…™Ñ•È™ÕÉÑ¡•È½ÁäÁ…¥¹Ñ¥¹œ¸%˜Á•ÉÍ¥ÍÑ•¹Ð¥¹ÍÁ•Ð…ÑÕ…°9=4‰åÑ•Ìì)¹¼¥¹Ù•¹Ñ•¹…Ñ¥Ù”™¥•±‘Ì¸Q¡•¸É•ÍÕµ”½É¥¥¹…°¥µ…”ÁÉ½©•Ñ¥½¸U$Á±…¸¸((´máuUÍ•ÈäÀäAMLè‘ÕÁ±¥…Ñ”É•±•…Í”½½¹”½M…Ù•=Á•¸½U¹‘¼ÁÉ½Ñ•Ñ•ì9=5•á•ÁÑ¥½¸¸(´mátäÄÀ•á…ÐÁ•Èµ½‰©•ÐA9½µ…Ñ•É¥…°½¥µ…”±¥¹­Ì…¹‘¥ÍÑ¥¹Ð¹…Ñ¥Ù”Ñ•áÑÕÉ”¹…µ•Ì¸(´máuÑÕ…°¥±”9=5…™Ñ•ÈÁÉ½©•Ð=Á•¸€¬…Íå¹ŒÍ¹…ÁÍ¡½Ð°¥‘•¹Ñ¥…°µ¥µ…”‘•‘ÕÀ¸(´máu5¥á•½…Í”µ™½±‘•½ÁÉ”µÍÕ™™¥á•¹…µ•Ì‘¥ÍÑ¥¹Ð°‘•Ñ•Éµ¥¹¥ÍÑ¥Œ°Í½ÕÉ”Õ¹Ñ½Õ¡•¸(´mátäÄÀY%™É•Í 9=4èÉ••¸½ÁäÍÑÉ½­•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ð¥¸9½µ…¸UMHäÄÁAML¸(´mátäÄÀY%¹…Ñ¥Ù”‘ÕÁ±¥…Ñ”•áÁ½ÉÐ…•ÁÑ…¹”É•Á½ÉÑ•UMHäÄÁAML¸((¸äÄÀ±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨ÈÔÔØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì™½ÕÈ¹•Ü)¹…Ñ¥Ù”Á…¥¹Ð½•áÁ½ÉÐ½¹…µ”É•É•ÍÍ¥½¹ÌAML¸ÑÕ…°9½µ…É•Ñ•ÍÐÉ•µ…¥¹ÌÁ•¹‘¥¹œ¸(((ŒŒ€¸äÄÄƒŠPÉ•Ñ…¥¹•¥µ…”AÉ½©•Ð™É½´Y¥•Üì€¸äÄÀÕÍ•ÈAMLƒŠP€ÈÀÈØ´ÄÀ´Äà()UÍ•ÈäÄÁAMLÁÉ½Ñ•ÑÌ¥¹‘•Á•¹‘•¹Ð‘ÕÁ±¥…Ñ”Á…¥¹Ð¥¸9½µ…°±•…É¥¹œ•áÑ•É¹…°…Ñ”¸)Õ‘¥ÐˆÁ™Äå„àèÍ½ÕÉ”½Á±…•µ•¹ÐäÀÜ€¬É•Ñ…¥¹•¥µ…”ÍÑ…¬äÀà½Á½½°äÀä…±É•…‘äÁÉ•Í•¹Ðì)µ¥ÍÍ¥¹œÉ•…°Á¥­•È½½Ù•É±…ä½Ù¥Í¥‰±”µ™É½¹ÐÉ…ÍÑ•È¸½¹¹•ÐM5Á…¥¹Ñ•È½¥¹ÁÕÐ½¡¥ÍÑ½Éä¸(¬%µ…”A9½)AƒŠ&ÄÀÈÓ
È¼É5¥ìØÔ”ÍÉ••¸Õ¥‘”°A•¹¥°5½Ù—ŠII½Ñ…Ñ—ŠIM…±”Ñ…Àå±”ÕÍ•Ì)½É¥¥¹…°%¹Í•ÉÐÐÌÜ™Õ¹Ñ¥½¸ì™¥¹•ÉÌ¹…Ù¥…Ñ”‰•¡¥¹¥µ…”¸AÉ½©•Ð…ÁÑÕÉ•ÌÕÉÉ•¹Ð)…µ•É„½‰½‘ä™É…µ”ì½É¥¥¹…°UXÑÉ¥…¹±•Ì½Q¡É•”É…åÌ•¹™½É”Ü×
À™É½¹Ð…¹Í•¹”½Í•±˜)½±ÕÍ¥½¸	=IÑ•á•±Ì¸I•™ÕÍ”Í…µÁ±•½Ù•É±…ÁÁ¥¹œ½É½ÍÌµÑ¥±”UYÌ…¹‰½Õ¹‘•Ý½É¬¸)A…¥É•äÀà¥µ…”É•¥Á”­É…ÍÑ•È…ÁÁ•¹½É•Á±…”°½É¥¥¹…°ÁÉ•™±¥¡Ð½¡•­Á½¥¹Ð½=\ì‘¥Ð)¥µ…”É•ÁÉ½©•ÑÌÉ•Ñ…¥¹•Í½ÕÉ”I=4UII9PY%\°É•Ñ…¥¹Ìµ…Í¬½‰±•¹½¹…µ”½½É‘•È¸)…¹•°½±…å•È¡…¹”½±½Í”½ÍÑ…±”…Íå¹ŒÁÉ•Í•ÉÙ•Ì½µµ¥ÑÑ•Ý½É¬°½É¥¥¹…°U¹‘¼•á¥ÑÌ)A…¥¹Ð¸M…µ”€¹‰½á±…ˆ½‘•Œ½Í½ÕÉ”Á•ÉÍ¥ÍÑ•¹”½™±…Ð9=4­1ì¹¼¹•ÜÍ¡•µ„½¡¥ÍÑ½Éä½­•É¹•°¸)MÉ••¸µÁÉ½©•Ñ½È•ÍÑÕÉ•Ì…É”¹½ÐÑ…¹•¹Ðµ™½±±½Ý¥¹œÍÕÉ™…”‘•…±Ì¸Q¡É•”½Ù•É±…åÌ°(á5¥Õ¹¥ÅÕ”¼ÄÙ5¥•áÁ…¹‘•É•Ñ…¥¹•ì½µÁ±•àÍ•¹•Ìµ…äÉ•™ÕÍ”ì¹¼Í•…´µÍ…™”½Á•É™½Éµ…¹”)±…¥´¸I•…‘½Ì½Á…¥¹Ðµ¥µ…”µÁÉ½©•Ð´äÄÄ¹µ¸M•Ù•¸™½ÕÍ•…ÑÕ…°É…ÍÑ•È½U$½Á•ÉÍ¥ÍÑ•¹”¼)•áÁ½ÉÐÑ•ÍÑÌAMLì9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨ÈÔØÌAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸AÕ‰±¥…Ñ¥½¸)Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌ¸¡…¹•Á…¥¹Ñ•È½½É”­¹•ÜÁÉ½©•Ñ½È¼)½Ù•É±…äÉ…Á äÄÄìäÀÜ¼äÀà¼äÀäÍÑ½É…”°äÄÀ¹…Ñ¥Ù”•áÁ½ÉÑ•È…¹ÁÉ½Ñ•Ñ•µ½‘•±±¥¹œ½5Õ±Ñ¤¼)™É½é•¸É•Ñ…¥¹•¸•Ù¥”äÄÄ…Ñ”Á•¹‘¥¹œ¸9•áÐ¡…¹‘Ìµ½¸AÉ½©•Ð™••‘‰…¬Ñ¡•¸ÍÕÉ™…”´)É•±…Ñ¥Ù”Á±…•µ•¹Ðìµ…Ñ•É¥…°Í±½ÑÌ½U$Á½±¥Í ™½±±½ÜÁÉ½‘ÕÐ‘¥É•Ñ¥½¸¸((´mátäÄÄ•á…ÐÍ½ÕÉ”½É¥•¹Ñ…Ñ¥½¸½…±Á¡„…¹½É¥¥¹…°•½µ•ÑÉä½™É…µ”ÁÉ½©•Ñ¥½¸¸(´mátäÄÄ™É½¹Ð¼Ü×
À½Í•¹”½Í•±˜½±ÕÍ¥½¸ìÍ…µÁ±•UX…µ‰¥Õ¥Ñä½Ý½É¬É•™ÕÍ…°…Ñ½µ¥Œ¸(´mátäÄÄ…ÑÕ…°Á¥­•È½ÍÑ…¥¹œ½A•¹¥°å±”½…¹•°½™¥¹•È½Ý¹•ÉÍ¡¥À€¬½É¥¥¹…°¡¥ÍÑ½Éä¸(´mátäÄÄ…ÑÕ…°ÁÉ½©•Ñ¥½¸€¹‰½á±…ˆ½‘•Œ½=Á•¸½É”µ•‘¥Ð…¹¹…Ñ¥Ù”™±…ÑÑ•¹•A9¸(´mátäÄÄ¡•­Á½¥¹Ð½ÍÑ…¬…¹ÍÑ…±”…Íå¹ŒÉ•™ÕÍ…°ÁÉ•Í•ÉÙ•Ì½µµ¥ÑÑ•ÍÑ…Ñ”¸(´mátäÄÄ½Ù•É±…ä…ÍÁ•Ð½É½Ñ…Ñ¥½¸…™™¥¹”Á…É¥Ñä½‘¥ÍÁ½Í…°ì¹¼Í•½¹Á½¥¹Ñ•È½Ý¹•È¸(´mátäÄÄY%€¬%µ…”ƒŠHA•¹¥°5½Ù”½I½Ñ…Ñ”½M…±”ì™¥¹•ÉÌ…±¥¸Ù¥•ÜƒŠHAÉ½©•Ð¸UMHäÄÅAML¸(´mátäÄÄY%½É‰¥Ð½¹™¥ÉµÌ‰…¬½¡¥‘‘•¸ÍÕÉ™…•Ì±•…¸ì‘¥Ð¥µ…”½…¹•°½É•ÁÉ½©•Ð¸UMHäÄÅAML¸(´mátäÄÄY%U¹‘½I•‘¼½M…Ù•=Á•¸½É”µ•‘¥Ðìµ…Í¬½‰±•¹…¹9½µ…½±½ÕÈÍ…¹¥Ñä¸UMHäÄÅAML¸(((ŒŒ€¸äÄÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´Äà()IÕ¹Ñ¥µ”˜àÙˆÄÑ„ÀÔàÕØÈÐÉ„ÄÍˆÌÀÀÝ„ØÁŒÝ„Ý„å”Å…ŒØÜìÑ•ÍÑ•ÑÉ•”(Å˜ÉˆÐÌÐÀÅ•ŒÈÈÐÕŒÌäÉ…™„ÅàÙäÀØÝ„Ìå™…Üå¸±°ÄÐÕÁ±½…‘•‰±½ˆ¡…Í¡•Ì…¹É•…Ñ•)ÑÉ•”µ…Ñ Ñ•ÍÑ•±½…°Í½ÕÉ”¸•Ñ¡•½É¥¥¸½µ…¥¸¡…Ì•á…Ñ±äÑ¡”Í…µ”ÑÉ•”ì)É•µ½Ñ”µ…¹¥™•ÍÐ½Ñ¥Ñ±”½‘…Ñ„½Ù¥Í¥‰±”±…‰•°…¹É•Ù¥•Ý•Á…¥¹Ñ•ÈäÄÄÉ…Á Ù•É¥™¥•¸)1½…°9½‘”ÈÐ¸Ää¸À™Õ±°ÈÔØÍAML¼Á%0¼ÁÍ­¥Àì9½‘”ÈÈÑ½Á½±½ä$ÌäÄÀÈÀÜØØÐä€¼)©½ˆÄÄÜØÀÀÈÈÐÈäÌMUML¸A…•ÌÌäÄÀÈÀÜØÄÄà‰Õ¥±ÄÄÜØÀÀÈÈÐÔÌÈ€¼)‘•Á±½äÄÄÜØÀÀÌÄÌÔØØMUML¸±°ÄÐ¡•­•Á½ÍÑ‘•Á±½åµ•¹Ð±¥Ù”Í¡•±°½Ù•ÉÍ¥½¸¼)Á…¥¹Ñ•È½½É”½ÁÉ½©•Ñ½È½½Ù•É±…ä½Í½ÕÉ”½Á±…•µ•¹Ð½¥µ…”½ÍÑ…¬½Á½½°½¹…Ñ¥Ù”ÝÉ¥Ñ•È¼)É•½Ù•Éä™¥±•Ì‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸%¹¥Ñ¥…°±¥Ù”µ…¹¥™•ÍÐÍ•ÉÙ•äÄÀ‰•™½É”‘•Á±½äì)™¥¹…°½µÁ±•Ñ”¡•­•É…Á µ…Ñ¡•ÌäÄÄ¸AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½µ½‘•±±¥¹œ½™É½é•¸Õ¹¡…¹•¸)±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä‘½Õµ•¹ÑÌÕÁ‘…Ñ•¸Q¡¥ÌÁÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±äìÑ•ÍÑ•)ÉÕ¹Ñ¥µ”‰åÑ•ÌÉ•Ñ…¥¹•¸UÍ•ÈäÄÁAMLÉ•½É‘•ìäÄÄ…ÑÕ…°M…™…É¤½A•¹¥°½¥µ…”Á¥­•È¼)±…Ñ•¹ä½™É½¹Ðµ½¹±ä…ÁÁ•…É…¹”…Ñ”É•µ…¥¹ÌÁ•¹‘¥¹œ¸9¼É•¹‘•É•…•ÁÑ…¹”¥¹™•ÉÉ•)™É½´9½‘”…¹Ù…Ì…‘…ÁÑ•ÉÌ½È‰åÑ”Ù•É¥™¥…Ñ¥½¸¸9•áÐµ…¹Õ…°AÉ½©•Ð¡•­±¥ÍÐ¥¸)Á…¥¹Ðµ¥µ…”µÁÉ½©•Ð´äÄÄ¹µ°Ñ¡•¸ÍÕÉ™…”µÉ•±…Ñ¥Ù”Á±…•µ•¹Ð™É½´½É¥¥¹…°%¹Í•ÉÐ¸(((ŒŒ€¸äÄÈƒŠPÍÕÉ™…”µÉ•±…Ñ¥Ù”É•Ñ…¥¹•¥µ…•Ìì€¸äÄÄÕÍ•ÈAMLƒŠP€ÈÀÈØ´ÄÀ´Äà()UÍ•ÈäÄÅAMLÁÉ½Ñ•ÑÌAÉ½©•Ð™É½´Y¥•Ü½Á¥­•È½A•¹¥°½¹…Ù¥…Ñ¥½¸½Á•ÉÍ¥ÍÑ•¹”½¡¥ÍÑ½Éä¸)Õ‘¥Ð„ØÐÝÀá˜èÉ•ÕÍ”äÄÄÁÉ½©•Ñ½È…¹äÀà¼äÀäÍÑ½É…”½Á½½°ì¹•ÜÍÕÉ™…”™É…µ”ÕÍ•Ì…ÑÕ…°)%¹Í•ÉÐÐÌÜ…±¥¹µ•¹Ð½å±”…¹äÀÜ½ÉÑ¡½É…Á¡¥Œ…µ•É„…ÁÑÕÉ”°¹¼¹•Ü•½µ•ÑÉä­•É¹•°¸(¬%µ…”½‘¥Ð¥µ…”ƒŠH=¸ÍÕÉ™…”ƒŠHÁ¥¬Í•±•Ñ•µ•Í ¸¥ÉÍÐÑ…ÀÁ±…•ÌìÑ¡•¸Ñ…Àµå±”)5½Ù”½I½Ñ…Ñ”½M…±”°5½Ù”™½±±½ÝÌ½É¥¥¹…°¡¥Ð½ÑÉ¥…¹±”¹½Éµ…°¸A±…¹…ÈØÔ”½¹Ñ…ÐÕ¥‘”ì)±¥™ÐÉ••¹•É…Ñ•Ì•á…ÐUXµ•Í ÁÉ•Ù¥•Ü°ÁÁ±ä½µµ¥ÑÌ=9½É¥¥¹…°Í•¹”¡•­Á½¥¹Ð¸)AÉ•Ù¥•Ü¹•Ù•È…ÍÍ¥¹Ì½‰©•Ð½±½ÕÉA…¥¹Ð½È•¹Ñ•ÉÌM…Ù”½¡¥ÍÑ½Éäì½É¥¥¹…°ÁÉ•™±¥¡Ð°)½µµ¥Ð½=\½•áÁ½ÉÐ…¹€¸äÄÄ™É½¹Ð½½±ÕÍ¥½¸½UX½Ý½É¬±¥µ¥ÑÌÉ•Ñ…¥¹•¸…¹•°½±½Í”½±…å•È¼)‰½‘ä±½ÍÌÉ•ÍÑ½É•Ì½µµ¥ÑÑ•Ý½É¬…¹½¹ÑÉ½±Ì°Õ¥‘”‘¥ÍÁ½Í•¸	…¬Ñ¼Ù¥•ÜÁÉ•Í•ÉÙ•Ì)…•ÁÑ•€¸äÄÄÁ…Ñ ¸‘¥Ð€¼=¸ÍÕÉ™…”ÍÑ…ÉÑÌ™É•Í …¹¡½È½‘•™…Õ±ÐÍ¥é”ìÁ•ÉÍ¥ÍÑ•Í½ÕÉ”¼)ÁÉ½©•Ñ¥½¸½™É…µ”½…¡”ÍÕÁÁ½ÉÐÉ”µÁ±…•µ•¹Ð°¹½Ð…ÕÑ½µ…Ñ¥Œ½±…¹¡½È½ÍÁ¥¸½Í…±”É•ÍÕµ”¸)M…µ”Í•¹”½ÁÉ½©•ÐÍ¡•µ„…¹™±…Ð¹…Ñ¥Ù”¡…¹‘½™˜¸9¼½¹Ñ¥¹Õ½ÕÌÕÉÙ•É…ÍÑ•ÈÝ¡¥±”)½¹Ñ…Ð°Í•…´µÍ…™”ÝÉ…ÁÁ¥¹œ°±…É•È‰Õ‘•ÑÌ½È¥A…Á•É™½Éµ…¹”±…¥´¸I•…)‘½Ì½Á…¥¹Ðµ¥µ…”µÍÕÉ™…”´äÄÈ¹µ¸M•Ù•¸™½ÕÍ•¹•Ü¡•­Ì½Ù•È…ÑÕ…°™É…µ”½Õ¥‘”¼)ÁÉ•Ù¥•Ü½U$½¡¥ÍÑ½Éä½±¥µ¥ÑÌ½ÕÉÙ•MÁ¡•É”UX­M…Ù”½¹…Ñ¥Ù”A9¸9½‘”ÈÐ¸Ää¸À™Õ±°(¨¨ÈÔÜÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ìÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌ¸)¡…¹•Á…¥¹Ñ•È½½É”½¹•Ü¡•±Á•ÈÉ…Á äÄÈìÁÉ½©•Ñ½ÈäÄÄ½Í½ÕÉ”äÀÜ½ÍÑ…¬äÀà½Á½½°äÀä½¹…Ñ¥Ù”)ÝÉ¥Ñ•ÈäÄÀ½%¹Í•ÉÐÐÌÜ…¹ÁÉ½Ñ•Ñ•µ½‘•±±¥¹œ½5Õ±Ñ¤½™É½é•¸É•Ñ…¥¹•¸•Ù¥”äÄÈ…Ñ”Á•¹‘¥¹œ¸)9•áÐÍÕÉ™…”¥¹Ñ•É…Ñ¥½¸™••‘‰…¬°Ñ¡•¸…Õ‘¥Ðµ…Ñ•É¥…°µ¡…¹¹•°Í±½ÑÌ½Á±…•¡½±‘•ÈÁ±…¸¸((´mátäÄÈÍÕÉ™…”™É…µ”…ÍÁ•Ð½ÍÁ¥¸½¹½Éµ…°…¹…ÑÕ…°%¹Í•ÉÐ…±¥¹µ•¹ÐÁ…É¥Ñä¸(´mátäÄÈÕ¥‘”¥Ì¹½¸µÉ…å…ÍÑ…‰±”°Í½ÕÉ”Õ¹¡…¹•…¹‘¥ÍÁ½Í•½¸…±°ÍÑ…”•á¥ÑÌ¸(´mátäÄÈÑÉ…¹Í¥•¹Ð‘¥ÍÁ±…äÍÕÉÙ¥Ù•ÌÑ¥¬ì¹¼Í•¹”É•Í½ÕÉ”½¡¥ÍÑ½Éä½Í…Ù”‰•™½É”ÁÁ±ä¸(´mátäÄÈ½É¥¥¹…°U$Á¥¬½Ñ…Àµå±”½µ½Ù”½…¹•°½™¥¹•È½Á…±´…¹Í¥¹±”¡¥ÍÑ½ÉäÁÁ±ä¸(´mátäÄÈµ…Í­Ì½‰±•¹‘Ì½Í½ÕÉ”Í¡…É¥¹œÉ•Ñ…¥¹•ìÁ½½°½¡•­Á½¥¹Ð½‰½‘äµ±½ÍÌ…Ñ½µ¥ŒÉ•™ÕÍ…°¸(´mátäÄÈÉ•…°ÕÉÙ•ÍÁ¡•É”ÁÉ½©•Ñ¥½¸½½‘•Œ½¹…Ñ¥Ù”™±…ÑÑ•¹•A9Ñ¡É½Õ ½É¥¥¹…°½Ý¹•ÉÌ¸(´mátäÄÈY%™¥ÉÍÐ=¸ÍÕÉ™…”¥µ…”Ý½É­ÌÁ•É™•Ñ±ä°UMHäÄÉAMLìÍ•½¹…‘•á•ÁÑ¥½¸ÑÉ…­•äÄÌ¸(´ltäÄÈY%ÁÁ±äU¹‘½I•‘¼ì‘¥Ð¥µ…”½=¸ÍÕÉ™…”°…¹•°½É•…ÁÁ±ä°M…Ù•=Á•¸½•áÁ½ÉÐ¸(((ŒŒ€¸äÄÈÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´Äà()IÕ¹Ñ¥µ”ÝŒÔÀÀÉ„ÐÈÀÄØØÈÄäÄÙ™ˆÜàÜÑ‘˜ÔÜÁ„ÜÐÈÔØÌàÐÈÄìÑ•ÍÑ•ÑÉ•”(äÈØÐØÔÍ…•™‰‰™˜äÄÕÀäÄÌäÌäÄàÀÝ‰ˆÌäÍÔØàÄ¸±°ÄÌÕÁ±½…‘•‰±½‰Ì…¹É•…Ñ•ÑÉ•”)µ…Ñ Ñ•ÍÑ•±½…°Í½ÕÉ”ì™•Ñ¡•½É¥¥¸½µ…¥¸¡…Ì¥‘•¹Ñ¥…°ÑÉ•”¸5…¥¸Ù•ÉÍ¥½¸¼)Í¡•±°½Á…¥¹Ñ•ÈäÄÈÁ¥¸Ù•É¥™¥•¸9½‘”ÈÐ¸Ää¸À±½…°™Õ±°ÈÔÜÁAML¼Á%0¼ÁÍ­¥Àì)9½‘”ÈÈÑ½Á½±½ä$ÌäÄÀÌÌÜÜàÔÐ½©½ˆÄÄÜØÀÐÀÐÔÄÈÔMUML¸A…•ÌÌäÄÀÌÌÜÜØäÈ€¼)‰Õ¥±ÄÄÜØÀÐÀÐÜÄäÌ½‘•Á±½äÄÄÜØÀÐÄÌØÀÀÜMUML¸±°ÄÔ¡•­•Á½ÍÑ‘•Á±½åµ•¹Ð±¥Ù”)Í¡•±°½Ù•ÉÍ¥½¸½Á…¥¹Ñ•È½½É”½ÍÕÉ™…”½ÁÉ½©•Ñ½È½½Ù•É±…ä½Í½ÕÉ”½Á±…•µ•¹Ð½ÍÑ…¬½Á½½°¼)¹…Ñ¥Ù”ÝÉ¥Ñ•È½%¹Í•ÉÐ…±¥¹µ•¹Ð½É•½Ù•Éä™¥±•Ì‰åÑ”µµ…Ñ É•Á½Í¥Ñ½Éä¸AÉ½Ñ•Ñ•)5Õ±Ñ¤Ä¸À½µ½‘•±±¥¹œ½™É½é•¸Õ¹¡…¹•¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÑ¡¥ÌÁÉ½½˜)¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä…¹É•Ñ…¥¹ÌÑ•ÍÑ•ÉÕ¹Ñ¥µ”‰åÑ•Ì¸UÍ•ÈäÄÅAMLÁÉ½Ñ•Ñ•ì(äÄÈM…™…É¤½A•¹¥°½Õ¥‘”…ÁÁ•…É…¹”½É•±•…Í”µÁÉ•Ù¥•Ü±…Ñ•¹ä…Ñ”Á•¹‘¥¹œ°¹¼É•¹‘•É•)½È4ÈÁ•É™½Éµ…¹”…•ÁÑ…¹”¥¹™•ÉÉ•¸9•áÐ=¸ÍÕÉ™…”µ…¹Õ…°…Ñ”°Ñ¡•¸µ…Ñ•É¥…°¼)¡…¹¹•°½Ý¹•È…Õ‘¥ÐÁ•ÈÁÉ½‘ÕÐ‘¥É•Ñ¥½¸¸=É¥¥¹…°ÍÉ••¸AÉ½©•ÐÉ•µ…¥¹Ì…Ù…¥±…‰±”¸(((ŒŒ€¸äÄÌƒŠPÉ•Á•…Ñ•ÍÕÉ™…”¥µ…”ÅÕ½Ñ„É•Á…¥Èì€¸äÄÈÁ…ÉÑ¥…°AMLƒŠP€ÈÀÈØ´ÄÀ´Äà()UÍ•ÈäÄÉAML™¥ÉÍÐÍÕÉ™…”¥µ…”ì•áÁ±¥¥ÐÍ•½¹µ…‘™…¥±ÕÉ”¸ÑÕ…°äÄÈU$É•ÁÉ½‘Õ•è(ÄÙÁàÍ•½¹¥µ…”Ý½É­ÌìÍ•½¹ÄÀÈÓ
ÈÍ½ÕÉ”™…¥±Ìá5¥ÁÉ•™±¥¡Ð€¡‘•½‘•Í½ÕÉ”Ñ5¥)…±½¹”¤¸9¼ÕÍ•ÈÌ™¥±”ÍÕÁÁ±¥•ìÅÕ½Ñ„•áÁ±…¹…Ñ¥½¸Ù•É¥™¥•°‘•Ù¥”É•Ñ•ÍÐÉ•ÅÕ¥É•¸)M…µ”ÍÑ…¬½É•Í½ÕÉ”½Á½½°½Ý¹•ÉÌÍ•±•Ð‰½Õ¹‘•¥µ…”µ…Á…‰±•ØÌÁÉ½™¥±”ÈÑ5¥Õ¹¥ÅÕ”€¼(Ðá5¥•áÁ…¹‘•ìÉ…ÍÑ•Èµ½¹±äà¼ÄØÉ•Ñ…¥¹•¸Q¡É•”ÄÀÈÓ
ÈÍ½ÕÉ•Ì­•¹½‘•­…¡”­‰…Í”½™±…Ð¼)µ…Í­Ì™¥ÓŠ&ÈÌ¸ÜÕ5¥É•Í½ÕÉ”¸=É¥¥¹…°Í½ÕÉ”‘¥µ•¹Í¥½¹Ì½‰åÑ•Ì°ÔÄË
Èµ…ÁÌ±Ñ¡É•”µ½Ù•É±…ä)…¹ÌÉ5¥™¥±”±¥µ¥ÑÌÕ¹¡…¹•ì¹¼‘½Ý¹Í¥é¥¹œ°¹•ÜÍ¡•µ„½¡¥ÍÑ½Éä½­•É¹•°½ÈÁ•É™½Éµ…¹”)±…¥´¸=É¥¥¹…°á5¥ÑÉ…¹ÍÁ½ÉÐÑ¡É•Í¡½±É•Ñ…¥¹•è±…É•È¥µ…•ÌÕÍ”a%MQ%9Í•¹•ØÔ)Í¡…É•µ‰åÑ”½‘•ŒìÍÑÉ¥ÐÁ•ÈµÉ•Í½ÕÉ”½É•˜½…¹½¹¥…°½ÁÉ•‘•½‘”½…Ñ½µ¥ŒÉ•™ÕÍ…°É•Ñ…¥¹•¸)…¥±•Á½½°ÕÁÉ…‘•Ì…¹¹½ÐÁÕ‰±¥Í ‰Õ™™•ÉÌ½ÈÉ…¥Í”…±±½Ý…¹”¸%µ…”•ÉÉ½ÉÌ¹½Ü…±Í¼)…ÁÁ•…È¥¹Í¥‘”…Ñ¥Ù”Á…¹•°¸I•…‘½Ì½Á…¥¹Ðµ¥µ…”µÉ•Á•…Ð´äÄÌ¹µ¸½ÕÈ¹•Ü™½ÕÍ•É•…°)U$½Í…µ”­‘¥™™•É•¹ÐÄÀÈÓ
È½¥±”½½‘•Œ½¹…Ñ¥Ù”½ÅÕ½Ñ„¡•­Ì…‘‘•¸äÀà¼äÄÈ¥µ…”‰Õ‘•Ð™¥áÑÕÉ•Ì)ÕÁ‘…Ñ•Ñ¼•¹Õ¥¹”ÈÑ5¥½Ù•É™±½Üì…±°É…ÍÑ•Èµ½¹±äà¼ÄØ…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸1½…°)9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨ÈÔÜÐAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ìÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌ¸I•Í½ÕÉ”½Á½½°…¹Á…É•¹Ð½1…ˆÉ…Á äÄÌìÍÕÉ™…”äÄÈ½ÁÉ½©•Ñ½ÈäÄÄ¼)Í½ÕÉ”äÀÜ½%¹Í•ÉÐÐÌÜ½‰ÉÕÍ ½ÁÉ½Ñ•Ñ•µ½‘•±±¥¹œ½5Õ±Ñ¤½™É½é•¸É•Ñ…¥¹•¸9…Ñ¥Ù”ÝÉ¥Ñ•È½¹±ä)Á…É•¹ÐÁ…¥¹Ðµ•áÁ½ÉÐÁ¥¸¡…¹•¸9•áÐY%ÑÝ¼½Ñ¡É•”…‘‘Ì¥¸Í…µ”Í•ÍÍ¥½¸°•‘¥ÐÍ•½¹°)U¹‘½I•‘¼½M…Ù•=Á•¸ìµ…Ñ•É¥…°Ý½É¬™½±±½ÝÌ…•ÁÑ…¹”°¹½Ð…¸¥¹™•ÉÉ•‰±…¹­•ÐäÄÉAML¸((´mátäÄÌ…ÑÕ…°Í•½¹½Ñ¡¥É‘¥ÍÑ¥¹ÐÄÀÈÓ
ÈU$…‘‘ÌÁÉ•Í•ÉÙ”½É¥¥¹…±Ì…¹¡¥ÍÑ½Éä¸(´mátäÄÌÍ…µ”µÍ½ÕÉ”Í•½¹…‘€¼Í•½¹É•Á±…•µ•¹Ð°…¹½¹¥…°Í¡…É•Í•¹”ÑÉ…¹ÍÁ½ÉÐ¸(´mátäÄÌÉ•…°¥±”M…Ù”½=Á•¸ÑÝ¼ÄÀÈÓ
È¥µ…•ÌÑ¡•¸½¹Ñ¥¹Õ”Ñ¡¥Éì•á…Ð¹…Ñ¥Ù”A9¸(´mátäÄÌ¥µ…”ÈÐ¼ÐàÕ¹¥ÅÕ”½•áÁ…¹‘•ÅÕ½Ñ„ÁÉ•™±¥¡Ð…¹…Ñ½µ¥Œ™…¥±ÕÉ”ìÉ…ÍÑ•Èà¼ÄØÉ•Ñ…¥¹•¸(´ltäÄÌY%™¥ÉÍÐ­Í•½¹=¸ÍÕÉ™…”…‘½ÁÁ±ä¥¸M5Á…¥¹ÐÍ•ÍÍ¥½¸ì½É¥¥¹…±ÌÉ•Ñ…¥¹•¸(´ltäÄÌY%½ÁÑ¥½¹…±±äÑ¡¥Éì•‘¥ÐÍ•½¹¥¹‘•Á•¹‘•¹Ñ±ä°U¹‘½I•‘¼½M…Ù•=Á•¸¸(((ŒŒ€¸äÄÌÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´Äà()IÕ¹Ñ¥µ•ˆÐàÐåŒØÀÀäÌàÈÐÌÌÄÅ‘‰”ÜàÈáˆá„ØÐàØå„ÀÜÈìÑ•ÍÑ•ÑÉ•”(á„àÔå…˜ÑˆÅÌÁˆäÝ™„ÌÌÐá‘å…„Á•™‘‘…„äÔÄÐ¸±°ÌÀÕÁ±½…‘•‰±½ˆ¡…Í¡•Ì½É•…Ñ•ÑÉ•”)µ…Ñ ±½…°Ñ•ÍÑ•Í½ÕÉ”ì™•Ñ¡•½É¥¥¸½µ…¥¸¥‘•¹Ñ¥…°¸5…¥¸äÄÌÍ¡•±°½µ…¹¥™•ÍÐ¼)Á…¥¹Ñ•ÈÁ¥¸Ù•É¥™¥•¸1½…°9½‘”ÈÐ¸Ää¸À™Õ±°ÈÔÜÑAML¼Á%0¼ÁÍ­¥Àì9½‘”ÈÈÑ½Á½±½ä)$ÌäÄÀÔÄàÄÄÜà½©½ˆÄÄÜØÀäÌÔÐÜÈàMUML¸A…•ÌÌäÄÀÔÄàÀäÀØ€¼)‰Õ¥±ÄÄÜØÀäÌÔØØàä½‘•Á±½äÄÄÜØÀäÐÐÈØØäMUML¸±°ÈØÁ½ÍÑ‘•Á±½åµ•¹Ð±¥Ù”Í¡•±°¼)Ù•ÉÍ¥½¸½É•Í½ÕÉ”½Á½½°½¹•Ü‰Õ‘•Ð½U$½Á…É•¹Ð½1…ˆ½É•½Ù•ÉäÁ±ÕÌÕ¹¡…¹•ÍÕÉ™…”¼)ÁÉ½©•Ñ½È½Í½ÕÉ”™¥±•Ì‰åÑ”µµ…Ñ Í½ÕÉ”¸%¹¥Ñ¥…°É•…‘Ì‘ÕÉ¥¹œ‘•Á±½åµ•¹Ðµ¥á•äÄÈ)…¹¹•Ü™¥±•Ì½¹•Ü‰Õ‘•ÐÐÀÐì™¥¹…°™É•Í ½µÁ±•Ñ”É…Á ÈØ¼ÈØµ…Ñ¡•ÌäÄÌ¸AÉ½Ñ•Ñ•)5Õ±Ñ¤Ä¸À½™É½é•¸½µ½‘•±±¥¹œ½‰ÉÕÍ ½%¹Í•ÉÐ…±½É¥Ñ¡µÌÉ•Ñ…¥¹•ì¹…Ñ¥Ù”ÝÉ¥Ñ•È½¹±ä±½…‘•È)Á¥¸¡…¹•Ì¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹Ð¸Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Ì½¹±äìÑ•ÍÑ•)ÉÕ¹Ñ¥µ”‰åÑ•ÌÉ•Ñ…¥¹•¸UÍ•ÈäÄÈ™¥ÉÍÐµÁ±…•µ•¹ÐAMLÁÉ½Ñ•Ñ•ìÉ•Á•…Ñ•µ¥µ…”‘•Ù¥”)•á•ÁÑ¥½¸É•µ…¥¹ÌÁ•¹‘¥¹œäÄÌÉ•Ñ•ÍÐ¸9¼…ÑÕ…°ÕÍ•ÈÍ½ÕÉ”™¥±”°M…™…É¤±…Ñ•¹ä½È)4ÈI4…•ÁÑ…¹”¥¹™•ÉÉ•™É½´9½‘”½Í½ÕÉ”µ‰åÑ”¡•­Ì¸9•áÐÉ•Á•…Ðµ…‘M5Í•ÍÍ¥½¸°)Ù•É¥™ä™¥ÉÍÐÁÉ•Í•ÉÙ•°•‘¥ÐÍ•½¹½U¹‘½I•‘¼½M…Ù•=Á•¸ìµ…Ñ•É¥…°Ý½É¬ÍÑ…åÌÅÕ•Õ•¸(((ŒŒ€¸äÄÐƒŠPå±¥¹‘•ÈUYÌ™½È½¹•Ì…¹ÕÁÉ¥¡ÐI•Ù½±Ù•ÌƒŠP€ÈÀÈØ´ÄÀ´Äà()UÍ•ÈÉ•ÅÕ•ÍÑ•å±¥¹‘•ÈUYÌ™½ÈI•Ù½±Ù”½å±¥¹‘•ÉÌ½½¹•Ì…¹½µÁ±•Ñ¥½¸ÕÀÑ¼Ñ¡”)¹•áÐµ…¹Õ…°…Ñ”‰•™½É”Á…ÕÍ¥¹œ½Ù•É¹¥¡Ð¸Õ‘¥Ðè…ÁÁ±¥•I•Ù½±Ù”¡…ÌÉ•Ù½±Ù•AÉ½™¥±”(¡¹½ÐÕÉÙ•AÉ½™¥±”¤°…±É•…‘ä•±¥¥‰±”¥¸5•Í !•…±Ñ ì½¹ÍÑ…¹ÐµÉ…‘¥ÕÌ½…á¥ÌµÍ¥‘”)¡•­Ì¥¸Ñ¡”½É¥¥¹…°å±¥¹‘•Èµ…ÁÁ•ÈÝ•É”Ñ¡”É•™ÕÍ…°¸áÑ•¹Q!Pµ…ÁÁ•È½¹±äè)½É‘¥¹…Éäå±¥¹‘•ÉÌÉ•Ñ…¥¸•á…Ðµ•…ÍÕÉ•µ•‘”ÍÑÉ¥À½ÑÝ¼µ…À±…å½ÕÐì™…±±‰…¬É•½Ù•ÉÌ)É•Õ±…È½¹•¹ÑÉ¥ŒÝ½É±µdÉ¥¹Ì…¹Ñ¡•¥ÈÍ¥¹±”ÁÉ½™¥±”¡…¥¸™É½´	…Í”Ñ½Á½±½ä¸)¹Õ±…ÈÍ•…´Á±ÕÌµ•…ÍÕÉ•É…‘¥ÕÌ½¡•¥¡ÐÁÉ½™¥±”‘¥ÍÑ…¹”ÍÕÁÁ½ÉÑÌÑ…Á•È°Á½¥¹Ñ•)•¹‘Ì°Í¡½Õ±‘•ÉÌ…¹É•ÑÕÉ¸Ý…±±Ì¸A½±”TÍÁ±¥ÑÌÁ•È™…”Ý•‘”ì¸µ½¸…ÁÌÍÑ…äÁ±…¹…È¸)9¼•½µ•ÑÉä°É•¥Á”°µ½‘•±±¥¹œ½•ÍÑÕÉ”½¡¥ÍÑ½Éä½•áÁ½ÉÐ­•É¹•°¡…¹•Ì¸M…µ”¹…Ñ¥Ù”)½É¹•ÈÁ…å±½…°½µµ¥Ð°½É¥¥¹…°UX•‘¥ÑÌ°M…Ù”½=Á•¸…¹1½9=4ÝÉ¥Ñ•ÉÌ¸U$•áÁ±…¥¹Ì)ÕÁÉ¥¡Ðå±¥¹‘•È½½¹”½I•Ù½±Ù”Í½Á”¸Q¥±Ñ•½•±±¥ÁÑ¥…°½ÑÝ¥ÍÑ•½‰É…¹¡¥¹œ½µ…±™½Éµ•)…¹ÁÉ½•‘ÕÉ…°½µ½‘¥™¥•È½¥µÁ½ÉÑ•½¹Ñ•áÑÌÍÑ¥±°É•™ÕÍ”…Ñ½µ¥…±±ä¸9½Ð…É‰¥ÑÉ…Éäµ…á¥Ì)ÁÉ½©•Ñ¥½¸°É•µ•Í¡¥¹œ°…ÕÑ¼µ‰…­”°é•É¼µ‘¥ÍÑ½ÉÑ¥½¸½È…ÕÑ½µ…Ñ¥ŒÁ…­¥¹œ¸±½Í•ÁÉ½™¥±”)±½½ÁÌ…É”Õ¹ÍÕÁÁ½ÉÑ•¸½ÕÈ¹•ÜÑ•ÍÑÌ½Ù•È¹…Ñ¥Ù”½¹”ÏŠLØÐÍ¥‘•Ì½µÕ±Ñ¥Á±”‰…¹‘Ì°)¡Õ”½Ñ¥¹äÍ…±”°½É¥¥¹…°I•Ù½±Ù”½Ý¹•È½ÕÑÁÕÐÝ¥Ñ Á½±•Ì½Ñ…Á•È½Í¡½Õ±‘•ÉÌ½É•ÑÕÉ¸Ý…±±Ì°)¹¼•½µ•ÑÉä½µ•Ñ…‘…Ñ„µÕÑ…Ñ¥½¸°½¹”U¹‘¼½I•‘¼½¥‘•µÁ½Ñ•¹”°UX•‘¥ÑÌ½½‘•Œ½…ÑÕ…°¹…Ñ¥Ù”)…¹1Ù…±Õ•Ì°…Ñ½µ¥ŒÉ•™ÕÍ…°…¹É•Ñ…¥¹•½É¥¥¹…°å±¥¹‘•È±…å½ÕÐ¸¹Ñ¥É”¡…¹•)UX½Á…É•¹Ð½1…ˆÉ…Á …¹Í¡•±°½É•½Ù•Éä­•åÌäÄÐì½Ñ¡•Èµ½‘Õ±”Á¥¹ÌÉ•Ñ…¥¹•¸()9•áÐY%è‘¬å±¥¹‘•È…¹½¹”ƒŠH5•Í !•…±Ñ ƒŠHUYÌƒŠHå±¥¹‘•ÈUYÌ€¡d¤°¥¹ÍÁ•Ð)UX‘¥Ñ½Èì…ÁÁ±äÕÁÉ¥¡ÐI•Ù½±Ù”…¹É•Á•…ÐìU¹‘¼½I•‘¼…¹M…Ù”½=Á•¸°Á…¥¹Ð½•áÁ½ÉÐ)…Ì‘•Í¥É•¸±Í¼É•Ñ•ÍÐäÄÌÑÝ¼¥µ…•Ì¥¸M5=¸ÍÕÉ™…”Í•ÍÍ¥½¸°™¥ÉÍÐÁÉ•Í•ÉÙ•°)Í•½¹¥¹‘•Á•¹‘•¹Ð¸9¼¹•ÜAML¥¹™•ÉÉ•ì™¥ÉÍÐäÄÈÁ±…•µ•¹ÐÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•¸)5…Ñ•É¥…°µ¡…¹¹•°Ý½É¬ÍÑ…åÌÅÕ•Õ•‰•¡¥¹Ñ¡•Í”µ…¹Õ…°…Ñ•Ì¸UÍ•ÈÁ…ÕÍ¥¹œ½Ù•É¹¥¡Ðì)½¹Ñ¥¹Õ”™É½´É•Á½Í¥Ñ½ÉäÑ½µ½ÉÉ½Ü°¹¼™ÕÉÑ¡•È…ÕÑ½µ…Ñ¥Œ‰Õ¥±¹••‘•Ñ½¹¥¡Ð¸((´mátäÄÐ½¹”½É•Ù½±Ù”Ñ½Á½±½ä…¹UYÌè™½ÕÈ™½ÕÍ•…ÕÑ½µ…Ñ•¡•­Ì¸(´mátäÄÐY%å±¥¹‘•È½½¹”½I•Ù½±Ù”UX‘¥Ñ½È½¡¥ÍÑ½Éä½M…Ù•=Á•¸èÕÍ•ÈAMLÈÀÈØ´ÄÀ´Ää¸(´mátäÄÌY%É•Á•…Ñ•=¸ÍÕÉ™…”É•Ñ•ÍÐèÕÍ•ÈäÄÐAMLÈÀÈØ´ÄÀ´Ää¸()1½…°9½‘”ÈÐ¸Ää¸À½µÁ±•Ñ”É•É•ÍÍ¥½¸è€¨¨ÈÔÜàAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)I•Ù¥•Ý•Í¡•±°¡…¹•Ì½¹±ä5•Í !•…±Ñ …¹‰½Ñ É•½Ù•ÉäUI1ÌìUX¡¥±…¹1…ˆ)Á…É•¹Ð¡…¥¸äÄÐ¸=É¥¥¹…°äÄÌÁ…¥¹Ñ•È½É•Í½ÕÉ”‰Õ‘•ÐÉ•Ñ…¥¹•¸¸¥¹¥Ñ¥…°±½…°)…¡”µ½¹ÑÉ…ÐÉÕ¸…Õ¡Ð…¸½Ù•É‰É½…Í¡•±°Á¥¸É•Á±…•µ•¹Ð‘ÕÉ¥¹œÁÉ•Á…É…Ñ¥½¸ì)É•ÍÑ½É•Õ¹É•±…Ñ•äÄÌÁ¥¹Ì‰•™½É”%90™Õ±°ÈÔÜáAMLÉÕ¸¸9¼ÁÕ‰±¥Í¡•‰…É…Á ¸)AÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”Ñ¼™½±±½Üìµ…¹Õ…°‘•Ù¥”…Ñ•ÌÉ•µ…¥¸Á•¹‘¥¹œ¸(((ŒŒ€¸äÄÐÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀÈØ´ÄÀ´Äà()IÕ¹Ñ¥µ”ààÌÄÔÈäÑ‘ˆÈå„äÀÐÙ…”á•˜ÐàäÙŒÐÐå„ÌÄÄØÙ”äìÑ•ÍÑ•ÑÉ•”(Õ‘™˜ÐÄÄÀÝ‰•àÙ„ÐÍˆÌÑ˜Ý‰˜äÔÈÐÀÄÈÉ™„ÈÉ”¸UÁ±½…‘•ÄÌ•á…ÐÍ½ÕÉ”‰±½‰Ì½ÑÉ•”°)™•Ñ¡•µ…¥¸…¹…±¥¹•±½…°•ÅÕ¥Ù…±•¹ÐÑÉ•”¸1½…±9½‘”ÈÐ¸Ää¸À…¹¡½ÍÑ•‘9½‘”ÈÈ)™Õ±°ÈÔÜáAML¼Á%0¼ÁÍ­¥À¸Q½Á½±½å$ÌäÄÈÌÐÌÀÐää½©½ˆÄÄÜØØÌÔÐäÈÔÀMUMLì)A…•ÌÌäÄÈÌÐÈäääÐ½‰Õ¥±ÄÄÜØØÌÔÔÀÐÌÄ½‘•Á±½äÄÄÜØØÌØÔÔÌÄÀMUML¸±°ÄÈ¡•­•)±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ½UX½Ý¹•È½5•Í !•…±Ñ ½1…ˆÁ…É•¹ÑÌ½É•½Ù•Éä½5Õ±Ñ¤½Á…¥¹Ñ•È½‰Õ‘•Ð)™¥±•Ì‰åÑ”µµ…Ñ Í½ÕÉ”…™Ñ•È‘•Á±½åµ•¹Ð¸%¹¥Ñ¥…°ÁÕ‰±¥ŒÁÉ½áäÑ¥µ•½ÕÑÌ½½±äÄÌ)µ…¹¥™•ÍÐÉ•Í½±Ù•½¸É•ÑÉ¥•Ù•ÉÍ¥½¹•™•Ñ ì™¥¹…°ÄÈ¼ÄÈµ…Ñ äÄÐ¸áÑÉ„Õ¹Ù•ÉÍ¥½¹•)µ…¹¥™•ÍÐÉ•ÅÕ•ÍÐÑ¥µ•½ÕÐ…ÐÁÉ½áäì¹¼•Ù¥‘•¹”½˜…ÁÀÉ•É•ÍÍ¥½¸¸AÉ½Ñ•Ñ•)5Õ±Ñ¤Ä¸À½™É½é•¸½µ½‘•±±¥¹œ½Á…¥¹Ð­•É¹•±Ì…¹Õ¹É•±…Ñ•äÄÌÁ¥¹ÌÉ•Ñ…¥¹•¸±°™½ÕÈ)½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÁÉ½½˜¡…¹•Ì‘½Ì½¹±ä¸9¼‘•Ù¥”AML¥¹™•ÉÉ•¸)MÑ½À…Ðµ…¹Õ…°…Ñ”èÑ½µ½ÉÉ½ÜäÄÐå±¥¹‘•È½½¹”½ÕÁÉ¥¡ÐI•Ù½±Ù”UYÌ€¬äÄÌÉ•Á•…Ðµ¥µ…”)É•Ñ…­”ì™¥ÉÍÐäÄÈ¥µ…”Á±…•µ•¹ÐAMLÁÉ½Ñ•Ñ•¸5…Ñ•É¥…°µ¡…¹¹•°Ý½É¬ÍÑ…åÌÅÕ•Õ•¸(((ŒŒ€¸äÄÔƒŠPÁÉ•¥Í”Á…¥¹ÐI€¼!M€¼¡•àì€¸äÄÐÕÍ•ÈAMLƒŠP€ÈÀÈØ´ÄÀ´Ää()UÍ•ÈäÄÑAML…•ÁÑÌÁÉ••‘¥¹œå±¥¹‘•È½½¹”½ÕÁÉ¥¡ÐI•Ù½±Ù”UYÌ°UX‘¥Ñ½È½¡¥ÍÑ½Éä¼)M…Ù•=Á•¸…¹É•Á•…Ñ•=¸ÍÕÉ™…”¥µ…•Ìµ…¹Õ…°±¥ÍÐ¸AÉ½Ñ•ÐäÄÐUX€¬äÄÌÉ•Á•…Ðµ…‘)‰•¡…Ù¥½ÕÈ…¹•…É±¥•ÈÍÕÉ™…”Á±…•µ•¹Ð°µ…Í­Ì½±…å•ÉÌ½Á…¥¹Ð½¹…Ñ¥Ù”•áÁ½ÉÑÌ¸Õ‘¥Ð(Á„Ý‰„ÌÀÈèÁÉ½‘ÕÑ¥½¸Á…¥¹Ð¡…Ì½¹±ä‰É½ÝÍ•ÈÍÝ…Ñ °¹¼¹Õµ•É¥ŒI½!M•‘¥Ñ½È¸)9•ÜÍµ…±°Á…¥¹Ðµ½±½ÕÈµ½¹ÑÉ½±Ì‰¥¹‘Ì=I%%90¥¹ÁÕÐ°ÍIÃŠLÈÔÔ€¼!MX¡Õ”ÃŠLÌØÀ°)Í…ÑÕÉ…Ñ¥½¸­‰É¥¡Ñ¹•ÍÌÃŠLÄÀÀ”°¡•à½ÁÑ¥½¹…°ŒìÍ¡½ÉÑ¡…¹½¹±ä½µµ¥ÑÌ½¸¡…¹”¸)!Õ”ÍÕÉÙ¥Ù•ÌÉ•ä°Í…ÑÕÉ…Ñ¥½¸ÍÕÉÙ¥Ù•Ì‰±…¬ì¥¹Ù…±¥½Á…ÉÑ¥…°½É…¹”•¹ÑÉ¥•Ì¹•Ù•È)ÁÕ‰±¥Í …¹É•Ù•ÉÐ½¸½µµ¥Ð¸M…µ”ÍÝ…Ñ ¥¹ÁÕÐ•Ù•¹Ð½Ý¹ÌÍÑÉ½­”…¹•°½É½±±‰…¬ì)¹¼Á½¥¹Ñ•È½¡¥ÍÑ½Éä½Á…¥¹Ð­•É¹•°½ÈÉ•Í½ÕÉ”½½‘•Œ½•áÁ½ÉÐ¡…¹”¸9Õµ•É¥Œ½¹ÑÉ½±Ì)™½±±½Ü½É¥¥¹…°µ…Í¬½¥µ…”‘¥Í…‰±•ÍÑ…Ñ”¸½±±…ÁÍ•™½±‘½ÕÐ°½É¥¥¹…°ÍÝ…Ñ É•Ñ…¥¹•¸)	ÉÕÍ ÁÉ•™•É•¹•Ì…É”Í•ÍÍ¥½¸U$½¹±ä°¹½Ð½‰©•Ð½Í…Ù”µ•Ñ…‘…Ñ„¸Q¡É•”™½ÕÍ•…ÑÕ…°)U$½Á¥á•°½¡¥ÍÑ½Éä½ÁÉ½©•Ð½¹…Ñ¥Ù”Ñ•ÍÑÌ…‘‘•ì™Õ±°ÍÕ¥Ñ”½ÁÕ‰±¥…Ñ¥½¸™½±±½ÝÌ¸)=¹±äÁ…¥¹Ñ•ÈU$½¹•Ü¡•±Á•È…¹Í¡•±°½É•½Ù•Éä­•åÌäÄÔì½É”½‰Õ‘•ÑÌäÄÌ½UXäÄÐ½™É½é•¸¼)5Õ±Ñ¤Ä¸ÀÉ•µ…¥¸Á¥¹¹•¸I•…‘½Ì½Á…¥¹Ðµ½±½ÕÈµ½¹ÑÉ½±Ì´äÄÔ¹µ™½È½Ý¹•È…Õ‘¥Ð¸)9•áÐY%Í•ÑI½!M½¡•à°Á…¥¹Ð°Á¥­•ÈÍå¹Œ…¹É•çŠI½±½ÕÈ½‰±…¯ŠI½±½ÕÈìµ…Í¬)½±½ÕÈ½¹ÑÉ½±Ì‘¥Í…‰±•ì¡¥ÍÑ½Éä½¥µ…”Á±…•µ•¹ÐÉ•µ…¥¹Ì…•ÁÑ•¸Q¡•¸¥¹‘•Á•¹‘•¹Ð)É½Õ¡¹•ÍÌQµÉ•Í½ÕÉ”€¬•áÁ±¥¥ÐÍ•¹”ÑÉ…¹ÍÁ½ÉÐ™½Õ¹‘…Ñ¥½¸Ñ¡É½Õ …ÕÑ¡½É¥Ñ…Ñ¥Ù”)½Ý¹•ÉÌ°™½±±½Ý•‰äÙ¥Í¥‰±”½¹ÑÉ½±Ì½ÁÉ•Ù¥•Üì¹¼ÍI‰±•¹‘Ì™½È‘…Ñ„½¹½Éµ…°µ…ÁÌ°)¹¼…É‰¥ÑÉ…Éä¹…Ñ¥Ù”µUXµ…Ñ•É¥…°µ•Ñ…‘…Ñ„½È¹•ÜÝÉ¥Ñ•È¸=Ñ¡•Èµ…Ñ•É¥…°Í±½ÑÌÅÕ•Õ•¸((´mátäÄÔ¹Õµ•É¥Œ½±½ÕÈU$±¥¹­¥¹œ°É•ä½‰±…¬µ•µ½Éä…¹¹¼Í•¹”¡¥ÍÑ½Éä½¸Í•±•Ñ¥½¸¸(´mátäÄÔ¥¹Ù…±¥½Á…ÉÑ¥…°Ù…±Õ•Ì°Í¡½ÉÑ¡…¹½µµ¥Ð…¹µ…Í¬µ‘¥Í…‰±•½¹ÑÉ½±Ì¸(´mátäÄÔ…ÑÕ…°ÍÑÉ½­”…¹•°°•á…Ðå…¸Á¥á•±Ì°U¹‘¼½I•‘¼°M…Ù”½=Á•¸…¹¹…Ñ¥Ù”A9¸(´mátäÄÔY%ÁÉ•¥Í•I½!M½¡•à…¹Á…¥¹Ð¡•­ÌèÕÍ•ÈAMLÈÀÈØ´ÄÀ´Ää¸()1½…°9½‘”ÈÐ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸€¨¨ÈÔàÄAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì•á¥ÍÑ¥¹œäÀÔ¼äÀØ)¹•…É‰äÄÑAML…¹¹•ÜäÄÔ™½ÕÍ•ÍAML¸=É¥¥¹…°½±½ÕÈ‰ÉÕÍ ½É•Í½ÕÉ”½¡¥ÍÑ½Éä½UX¼)¥µ…”½•áÁ½ÉÐ½5Õ±Ñ¤½™É½é•¸½Ý¹•ÉÌÕ¹¡…¹•¸AÕ‰±¥…Ñ¥½¸Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌ¸(((ŒŒ€¸äÄÔÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€Ää=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”ÙŒÀäÑ”àÐÐá‘‰‰ŒÌÈÐÄÐÙ…˜ØÈÅ„ÜÀåˆÔÔàÄÄØÁ”ÀØìÑ•ÍÑ•ÑÉ•”(”ÁÑ˜ÔÌÉ”ÝŒÉ„ÔÔáÔàÕÄÔÕ…ŒÄÀÔÈÜØåŒÜäÝ˜äÔ¸UÁ±½…‘•ÄÌ•á…Ð‰±½‰Ì…¹¥‘•¹Ñ¥…°)Ñ•ÍÑ•ÑÉ•”ìµ…¥¸™•Ñ¡•½±½…°•ÅÕ¥Ù…±•¹ÐÑÉ•”…±¥¹•¸9½‘”ÈÐ±½…°€¬9½‘”ÈÈ)¡½ÍÑ•™Õ±°ÈÔàÅAML¼Á%0¼ÁÍ­¥À¸Q½Á½±½å$ÌäÄØÜÔÔÄÄÄÐ½©½ˆÄÄÜÜäÌÔÔàÀÔÄMUMLì)A…•ÌÌäÄØÜÔÔÀÔÔÜ½‰Õ¥±ÄÄÜÜäÌÔÔäÔàÔ½‘•Á±½äÄÄÜÜäÌØäÀÐÀäMUML¸¥¹…°ÄÈ¼ÄÈ¡•­•)±¥Ù”Í¡•±°½µ…¹¥™•ÍÐ½Á…¥¹Ñ•È½¹•Ü½±½ÕÈ¡•±Á•È½É•½Ù•Éä½½É”½UX½5Õ±Ñ¤½‰Õ‘•Ð½ÍÕÉ™…”)™¥±•Ì‰åÑ”µµ…Ñ Í½ÕÉ”¸%¹¥Ñ¥…°¥¸µ™±¥¡ÐÉ•…‘ÌÍ•ÉÙ•äÄÐ…¹¡•±Á•ÈÐÀÐÝ¥Ñ ÁÉ½áä)Ñ¥µ•½ÕÐì™É•Í Á½ÍÑ‘•Á±½åµ•¹Ð½µÁ±•Ñ”É…Á µ…Ñ¡•ÌäÄÔ¸=¹±äÁ…¥¹Ñ•È½¹•Ü¡•±Á•È°)Ñ¡É•”Í¡•±°…¡”­•åÌ…¹É•Ù¥•Ý•™¥áÑÕÉ”¡…¹•ì…±°½Ñ¡•È…±½É¥Ñ¡´Á¥¹ÌÉ•Ñ…¥¹•¸)±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹Ð°ÕÍ•ÈäÄÑAMLÁÉ½Ñ•Ñ•¸Q¡¥ÌÁÉ½½˜¥Ì‘½Ì½¹±äì(äÄÔ‘•Ù¥”½±½ÕÈ½Á¥­•È½É•äµ‰±…¬É•½Ù•Éä½Á…¥¹Ð…Ñ”Á•¹‘¥¹œ¸9•áÐ¥¹‘•Á•¹‘•¹Ð)É½Õ¡¹•ÍÌ‘…Ñ„µÉ•Í½ÕÉ”½ÑÉ…¹ÍÁ½ÉÐ™½Õ¹‘…Ñ¥½¸Á•È‘½Ì½Á…¥¹Ðµ½±½ÕÈµ½¹ÑÉ½±Ì´äÄÔ¹µì)¹¼•áÑÉ„µ…Ñ•É¥…°µ¡…¹¹•°Á…É¥Ñä½È¥A…Á•É™½Éµ…¹”±…¥´¥¹™•ÉÉ•¸(((ŒŒ€¸äÄØƒŠP½µÁ…Ð±•™ÐA…¥¹Ð€¬=‰©•ÐÉ…‘¥…°UXì€¸äÄÔAMLƒŠP€ÈÀÈØ´ÄÀ´Ää()UÍ•ÈäÄÕAMLÁÉ½Ñ•ÑÌ±¥¹­•‘I½!M½¡•à…¹ÁÉ¥½ÈÁ…¥¹Ð½UX¸UÍ•È•áÁ±¥¥Ñ±äÉ•ÅÕ•ÍÑÌ)A…¥¹Ð±•™Ð½Ñ¥‘ä‰•…ÕÍ”‰Õ±­äU$½‰ÍÑÉÕÑÌµ•Í °Á±ÕÌ‘•‘¥…Ñ•‘UX¥¸=‰©•ÐÉ…‘¥…°¸)Q¡¥ÌÕÍ•È‘¥É•Ñ¥½¸Ñ…­•ÌÁÉ¥½É¥Ñä½Ù•ÈÉ½Õ¡¹•ÍÌÝ½É¬ì…Õ‘¥Ð½¹±ä°¹¼É½Õ¡¹•ÍÌ)É•Í½ÕÉ”½Í¡•µ„¡…¹•Ìµ…‘”¸M…µ”Ñ½½°µÍ•ÍÍ¥½¸µÕ¤½Ý¹•ÈÍÁ•¥…°µ…Í•ÍÕØµÁ…¥¹Ð…Ì)±•™ÐáÁà½Ñ½ÀÄÉÁà¼ÈÜÉÁà‰½Õ¹‘•ÍÉ½±±¥¹œ‘½¬°­••ÁÌ½É¥¥¹…°™½½Ñ•È½‰ÕÑÑ½¹Ì¥¹Ñ…Ð°)Í­¥ÁÌÝ¥‘”…Ñ¥½¸É•Á…É•¹Ñ¥¹œì¹•áÐÑ½½°±•…ÉÌÝ¥‘Ñ …¹½É¥¥¹…°•¹ÑÉ•Á±…•µ•¹Ð)É•ÑÕÉ¹Ì¸M¡…É•Á½Í¥Ñ¥½¹•È½Ý¥‘”µ±…å½ÕÐÜÌÈÕ¹¡…¹•¸A…¥¹Ñ•ÈÉ”µÉ½ÕÁÌM5½¹ÑÉ½±Ìè)½±½ÕÈ½Í¥é”½½Á…¥Ñä½±…å•È½‘•áÁ½Í•ì‰ÉÕÍ ½I	!M½±…å•ÈÍ•ÑÑ¥¹Ì½µ…Í­Ì½±±…ÁÍ•°)¥µ…”½¹ÑÉ½±ÌÍÑ…•½¹±äìÍÑ¥­äU¹‘½I•‘½½¹”¸9¼Á½¥¹Ñ•È½‰ÉÕÍ ½É•Í½ÕÉ”¡…¹•Ì¸)UX½ÕÑ•ÈäÃ
À¼ÈÌÁÁà…‘‘•ÁÉ•Í•ÉÙ¥¹œ½Ñ¡•È=‰©•ÐÍ•Ñ½ÉÌì¹•ÝÕÙQ½½±Í	Ñ¸±…Õ¹¡•ÌM5)5•Í !•…±Ñ UX½Ý¹•È¥¹ÕØµÑ½½±ÌÍ•ÍÍ¥½¸°Ñ¥Ñ±•UX…¹‘¥…¹½ÍÑ¥Œ¹½‘•Ì¡¥‘‘•¸¸AÉ½©•Ñ¥½¸¼)Ý½É­ÍÁ…”½¡¥ÍÑ½Éä½Á…å±½…½±½Í”½Ý¹•ÉÌÕ¹¡…¹•ìI•™É•Í ÍÑ…åÌÙ¥Í¥‰±”¸5•Í !•…±Ñ )µ½‘”¡¥‘•ÌUYÌ…¹É•Ñ…¥¹ÌÉ•Á…¥ÉÌ¸UXµ½¹±äÉ•Á½ÉÑÌÍ­¥À¡•…±Ñ …¹…±åÍ¥Ì…¹É•™É•Í )½¸½¹Ñ•áÐ½¡¥ÍÑ½Éä¡…¹•Ì¸±½Í”½±µ½‘”‰•™½É”ÍÝ¥Ñ¡¥¹œ%Ìì½É¥¥¹…°É…‘¥…°¼)‰…­É½Õ¹±½Í”…‘…ÁÑ•ÉÌ¥¹±Õ‘•ÕØµÑ½½±Ì¸9¼Í•½¹•‘¥Ñ½È½­•É¹•°½¡¥ÍÑ½Éä¸)QÝ¼¹•Ü¥¹Ñ•É…Ñ¥½¸¡•­Ì€¬ÕÁ‘…Ñ•½É¥¥¹…°É…‘¥…°½Ý½É­ÍÁ…”¡…É¹•ÍÌÉ•Ñ…¥¸Í•µ…¹Ñ¥Œ)¡•­Ìì™Õ±°ÍÕ¥Ñ”½ÁÕ‰±¥…Ñ¥½¸™½±±½Ü¸±°Ø¡…¹•½Ý¹•ÉÌ­Í¡•±°½É•½Ù•ÉääÄØìÕ¹¡…¹•)Á…¥¹Ð½É”½‰Õ‘•ÑÌäÄÌ½½±½ÕÈäÄÔ½UXµ…ÁÁ•ÈäÄÐ½5Õ±Ñ¤½™É½é•¸½µ½‘•±±¥¹œ½Í¡…É•±…å½ÕÑÌÉ•Ñ…¥¹•¸)I•…‘½Ì½Á…¥¹ÐµÕØµ±…å½ÕÐ´äÄØ¹µ¸9•áÐY%±•™Ð‘½¬™½½ÑÁÉ¥¹Ð½Í•Ñ¥½¹Ì°Á…¥¹Ð½µ…Í¬¼)¥µ…”Á±…•µ•¹Ðì=‰©•ÑUXÁÉ½©•Ð½•‘¥Ñ½È½	…¬½±½Í”…¹5•Í !•…±Ñ É•Á…¥ÈÉ•É•ÍÍ¥½¸¸)Q¡•¸É•ÍÕµ”¥¹‘•Á•¹‘•¹ÐÉ½Õ¡¹•ÍÌ‘…Ñ„µÉ•Í½ÕÉ”½•áÁ±¥¥ÐÑÉ…¹ÍÁ½ÉÐ™½Õ¹‘…Ñ¥½¸¸((´mátäÄØ…ÑÕ…°Í•ÍÍ¥½¸‘½­¥¹œ½¹½‘”¥‘•¹Ñ¥Ñä…¹¹•áÐµÑ½½°•¹ÑÉ”É•ÍÑ½É…Ñ¥½¸¸(´mátäÄØUXµ½¹±äÁÉ½©•Ñ¥½¸½¡¥ÍÑ½Éä½±½Í”…¹5•Í !•…±Ñ µ½‘”É•ÍÑ½É…Ñ¥½¸¸(´mátäÄØY%±•™ÐA…¥¹ÐÍ¥é”½ÍÉ½±°½Í•Ñ¥½¹Ì½½¹”…¹¥µ…”4½H½LèÕÍ•ÈAMLÈÀÈØ´ÄÀ´Ää¸(´mátäÄØY%=‰©•ÐÉ…‘¥…±UX½•‘¥Ñ½È½•á¥Ð…¹5•Í !•…±Ñ èÕÍ•ÈAMLÈÀÈØ´ÄÀ´Ää¸()1½…°9½‘”ÈÐ¸Ää¸À™¥¹…°™Õ±°€¨¨ÈÔàÌAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸%¹¥Ñ¥…°™Õ±°ÉÕ¸)…Õ¡ÐÑÝ¼½ÕÑ‘…Ñ•Ñ•ÍÐ…‘…ÁÑ•ÉÌèÐÌä•áÁ•Ñ•±¥Ñ•É…°™¥á•5•Í !•…±Ñ %°ÜÌÄ)MÝ••À¡½ÍÐ½µ¥ÑÑ•É•…°=4ÍÑå±”ÁÉ½Á•ÉÑä¸UÁ‘…Ñ•™¥áÑÕÉ•ÌÑ¼‘Õ…°%…¹…ÑÕ…°)¡½ÍÐÍ¡…Á”ì­•ÁÐ…±°Í•µ…¹Ñ¥Œ½É•…µ½¹±ä½MÝ••À…ÍÍ•ÉÑ¥½¹Ì¸½ÕÍ•åAML°™¥¹…°™Õ±°(ÈÔàÍAMLì¹¼ÉÕ¹Ñ¥µ”MÝ••À½ÈÍ¡…É•Á½Í¥Ñ¥½¹•È¡…¹•Ì¸AÕ‰±¥…Ñ¥½¸½Ù¥ÍÕ…°ÁÉ½½˜™½±±½ÝÌ¸(((ŒŒ€¸äÄØÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€Ää=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”ÌÈäÔÀÌÉ„É‰àå˜ÝŒÑ„Ý‘”ÍˆàÜÀØÔÙÜØÕ™É˜ìÑ•ÍÑ•ÑÉ•”(Õ‰”àÔÔÔØÜÀÁŒÄÍˆÀáˆàÈäÑ”ÐÔÀàÈÐÀÙ˜Õ”ÉˆäÜÔä¸±°ÈÄÕÁ±½…‘•‰±½‰Ì½ÑÉ•”µ…Ñ Ñ•ÍÑ•)±½…°Í½ÕÉ”ì™•Ñ¡•µ…¥¸½±½…°•ÅÕ¥Ù…±•¹ÐÑÉ•”…±¥¹•¸1½…±9½‘”ÈÐ€¬¡½ÍÑ•‘9½‘”ÈÈ)™Õ±°ÈÔàÍAML¼Á%0¼ÁÍ­¥À¸Q½Á½±½å$ÌäÄÜÌÀØÐäØÈ½©½ˆÄÄÜàÀääàØÐØÐMUMLì)A…•ÌÌäÄÜÌÀØÐÐàØ½‰Õ¥±ÄÄÜàÀääààÄàØ½‘•Á±½äÄÄÜàÄÀÀàÌÀÈàMUML¸1¥Ù”ÄÌ¼ÄÔ¡•­•)™¥±•Ì‰åÑ”µµ…Ñ °¥¹±Õ‘¥¹œÍ¡•±°½µ…¹¥™•ÍÐ…¹10Ø¡…¹•ÉÕ¹Ñ¥µ”½Ý¹•ÉÌ°É•½Ù•Éä)Ù•ÉÍ¥½¸½Ý¥‘”±…å½ÕÐ½5Õ±Ñ¤½½±½ÕÈ½UXµ…ÁÁ•È¸QÝ¼U9!9™¥±•Ì€¡É•±•…Í”µ‰½½ÑÍÑÉ…À°)Í¡…É•Á½Í¥Ñ¥½¹•ÈÜÌÈ¤É•Á•…Ñ•‘±äÁÉ½áäµÑ¥µ•µ½ÕÐ½¸!QQ@É•¡•¬ìÉ•Á½Í¥Ñ½Éä•á…Ð)‰åÑ•Ì½Á¥¹ÌÉ•Ñ…¥¹•…¹ÁÉ•Ù¥½ÕÍ±äÙ•É¥™¥•¸9¼±…¥´Ñ¡½Í”ÑÝ¼Ý•É”™•Ñ¡•äÄØ¸)±½Õ‰É½ÝÍ•È±½…‘•Ù¥Í¥‰±”äÄØÍ¡•±°‰ÕÐ]•‰0½¹Ñ•áÐÉ•…Ñ¥½¸™…¥±•¥¸Õ¹¡…¹•)µ…¥¸àÔÐ½Q¡É•”É•¹‘•É•ÈìÑ¡•É•™½É”¹¼µ•Í ½É…‘¥…°½A…¥¹ÐÉ•¹‘•É•…•ÁÑ…¹”±…¥µ•¸)%Í½±…Ñ•Ñ•ÍÐÑ…ˆ±½Í•ì¹¼ÍÉ••¹Í¡½Ð½˜„‰±…¹¬µ•Í É•ÑÕÉ¹•…Ì±…å½ÕÐÁÉ½½˜¸)ÑÕ…°Í•ÍÍ¥½¸½UX½Ý¹•ÈÍ•µ…¹Ñ¥Ì…¹¹…Ñ¥Ù”Á…¥¹Ð½¥µ…”™±½ÝÌÉ•µ…¥¸Ñ•ÍÑ•‰ä9½‘”ì)¥A…±•™Ðµ‘½¬½Í•Ñ¥½¸½ÍÉ½±°…¹UX¹…Ù¥…Ñ¥½¸µ…¹Õ…°…Ñ”É•µ…¥¹ÌÁ•¹‘¥¹œäÄØ¸)±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì€¬Ý½É­™±½ÜÕÍ•È•á•ÁÑ¥½¸ÕÁ‘…Ñ•¸UÍ•ÈäÄÕAMLÁÉ½Ñ•Ñ•ì)Ñ¡¥ÌÁÉ½½˜¡…¹•Ì‘½Ì½¹±ä¸I½Õ¡¹•ÍÌ…Õ‘¥ÐÉ•…µ½¹±ä°¥µÁ±•µ•¹Ñ…Ñ¥½¸‘•™•ÉÉ•¸(((ŒŒ€¸äÄÜƒŠPÉ½Õ¡¹•ÍÌ‘…Ñ„€¼ÁÉ½©•Ð™½Õ¹‘…Ñ¥½¸ì€¸äÄØÕÍ•ÈAMLƒŠP€ÈÀÈØ´ÄÀ´Ää()UÍ•ÈäÄÙAMLÁÉ½Ñ•ÑÌ½µÁ…Ð1PA…¥¹Ð½Í•Ñ¥½¹Ì½½¹”°½±½ÕÈ½¥µ…”A•¹¥°å±”°)=‰©•ÐÉ…‘¥…±UXÁÉ½©•Ñ¥½¸½•‘¥Ñ½È½•á¥Ð…¹5•Í !•…±Ñ É•Á…¥È‰…Í•±¥¹”¸Õ‘¥ÐÕÉÉ•¹Ð)‘‘˜ÈÐÁ˜Øè½¹±äÍI½±½ÕÈÉ•Í½ÕÉ•Ì•á¥ÍÐì¥µÁ½ÉÑ•Í…±…ÈÝÉ¥Ñ•ÉÌ…±É•…‘ä½Ý¸µ…À)•áÁ½ÉÐ¸‘Í•Á…É…Ñ”HáÉ½Õ¡¹•ÍÌÉ•Í½ÕÉ”ÄÛŠLÔÄÈ…á•Ì°±¥¹•…È‘…Ñ„½UXµØÀµ™¥ÉÍÐ½‰¥¹‘¥¹œ°)½Ý¹•…ÁÑÕÉ”½•¹½‘”½‘•½‘”°½µµ¥ÑÑ•É•…µ½¹±äÍ¡…É¥¹œ½¹Ù•¹Ñ¥½¸¸á…ÐÍ¡•µ„°)…¹½¹¥…°½É¥¥¹…°ÁÉ½©•Ð‰åÑ•Ì°‘•‘ÕÀÑ5¥Õ¹¥ÅÕ”¼á5¥•áÁ…¹‘•…¹ÁÉ•‘•½‘”‰Õ‘•Ð¼)É•˜Ù…±¥‘…Ñ¥½¸¸M•¹•ØØ=91dÝ¥Ñ É½Õ¡¹•ÍÌìµ…¹‘…Ñ½Éå½±½ÕÉA…¥¹ÑY•ÉÍ¥½¸‘•±•…Ñ•Ì)½É¥¥¹…°½±½ÕÉØÇŠLÔ•¹Ù•±½Á”Ñ¼Õ¹¡…¹•½Ý¹•ÉÌ¸]¥Ñ¡½ÕÐÉ½Õ¡¹•ÍÌ•á…Ð±•…å)M=8¼)Ù•ÉÍ¥½¸É•Ñ…¥¹•¸UX•¹Ù•±½Á”ÍÑ…åÌUXµ½¹±äì½É¥¥¹…°ÌÉ5¥™¥±”€¬½±½ÕÈ‰Õ‘•ÑÌÍÑ…ä¸)=É¥¥¹…°Í•¹”Í¹…ÁÍ¡½Ð½É•ÍÑ½É”½…‘‘5•Í ½Í¥¹±”­5Õ±Ñ¤ÕÁ±¥…Ñ”Í¡…É”É•Í½ÕÉ”°•‘¥ÑÌ)É•Á±…”ì…Ñ½µ¥Œ=Á•¸½ÉÉÕÁÑ¥½¸…¹É•¹‘•È™…¥±ÕÉ”É•Ñ…¥¸Í•¹”½É•Í½ÕÉ•Ì½¡¥ÍÑ½Éä¸))½¥¸É•™ÕÍ•ÌÍ…±…Èµ½¹±äÁ…¥¹Ðì±¥¹­•¹…Ñ¥Ù•UXÕ…ÉÉ•Ñ…¥¹•¸M¡…É••áÁ½ÉÐµ•Í )É•Í½±Ù•ÈÉ•™ÕÍ•ÌÉ½Õ¡¹•ÍÌµ‰•…É¥¹œ=	(½1½9=4€¡¥¹±Õ‘¥¹œ…±½¹Í¥‘”½±½ÕÈ¤¥¹ÍÑ•…)½˜Í¥±•¹Ñ±ä‘É½ÁÁ¥¹œÕ¹ÍÕÁÁ½ÉÑ•¡…¹¹•°¸9¼ÝÉ¥Ñ•È½ÁÉ½Ù•¹…¹”½•½µ•ÑÉä½‰ÉÕÍ ½U$)­•É¹•°…‘‘•¸M¥à¹•Ü¥¹Ñ•É…Ñ¥½¸Ñ•ÍÑÌ½Ù•È‘…Ñ„‰åÑ•Ì°…±°±•…ä½±½ÕÈÑÉ…¹ÍÁ½ÉÑÌ°)ÅÕ½Ñ…Ì½É•™Ì½ÁÉ•‘•½‘”½½Ý¹•ÉÍ¡¥À°…ÑÕ…°¡¥ÍÑ½Éä½ÕÁ±¥…Ñ”½¥±”½=Á•¸½É½±±‰…¬…¹ÝÉ¥Ñ•È¼))½¥¸É•™ÕÍ…±Ì¸Õ±°ÍÕ¥Ñ”½ÁÕ‰±¥…Ñ¥½¸™½±±½Ü¸½ÌèÉ½Õ¡¹•ÍÌµÉ•Í½ÕÉ”´äÄÜ¹µ¸)ÑÕ…°É•Í½ÕÉ”½½‘•Œ½µ•Ñ…‘…Ñ„½Õ…É€¬½µÁ±•Ñ”Á…É•¹Ð½1…ˆÉ…Á äÄÜìÁ…¥¹Ñ•ÈU$½¹±ä)Á…É•¹ÐÁ¥¸°É•Ñ…¥¹Ì…•ÁÑ•äÄØ±•™Ð‘½¬½UX…•ÍÌ¸5Õ±Ñ¤Ä¸À½™É½é•¸½UXäÄÐ½½±½ÕÈäÄÔ¼)‰ÉÕÍ ½ÁÉ½©•Ñ¥½¸½±…å½ÕÐ½µ½‘•±±¥¹œ­•É¹•±ÌÕ¹¡…¹•¸9¼É½Õ¡¹•ÍÌ½¹ÑÉ½±Ì½É•¹‘•È¼)•áÁ½ÉÐ½±…å•ÉÌ½‘¥ÍÁ±…•µ•¹ÐÁ…É¥Ñä±…¥´¸9¼¹•Ü‘•Ù¥”É½Õ¡¹•ÍÌÑ•ÍÐÁ½ÍÍ¥‰±”å•Ð¸)9•áÐ½É¥¥¹…°Í…±…ÉA9€¬9=4½1µ…Ñ•É¥…°•áÁ½ÉÐ…‘…ÁÑ…Ñ¥½¸Ý¥Ñ …Íå¹Œ…ÁÑÕÉ”½‰¥¹‘¥¹œ¼)½µ‰¥¹•µ…Ñ•É¥…°¥‘•¹Ñ¥ÑäÑ•ÍÑÌ°Ñ¡•¸Ù¥Í¥‰±”¡…¹¹•°½ÁÉ•Ù¥•ÜÑ¡É½Õ ½É¥¥¹…°Á…¥¹Ñ•È¸)5…¹Õ…°¹•…É‰äè•á¥ÍÑ¥¹œ½±½ÕÈÁ…¥¹ÐM…Ù•=Á•¸½ÕÁ±¥…Ñ”ì‘¼¹½Ð…Í¬Íå¹Ñ¡•Ñ¥ŒHà™¥áÑÕÉ•Ì¸((´mátäÄÜHà½Ý¹•‰åÑ•Ì…¹½±½ÕÉØÇŠLÔ•á…ÐÑÉ…¹ÍÁ½ÉÐÁÉ•Í•ÉÙ…Ñ¥½¸Õ¹‘•È•áÁ±¥¥ÐÍ•¹•ØØ¸(´mátäÄÜµ…±™½Éµ•½É•˜½Õ¹¥ÅÕ”­•áÁ…¹‘•‰Õ‘•ÑÌ‰•™½É”‘•½‘”ì™…¥±•…‘‘Ì‘¼¹½Ð…±Ñ•ÈÁ½½°¸(´mátäÄÜ½É¥¥¹…°¡¥ÍÑ½Éä½Í¥¹±”­5Õ±Ñ¤ÕÁ±¥…Ñ”½¥±”½…Ñ½µ¥Œ=Á•¸…¹É•¹‘•ÈÉ½±±‰…¬¸(´mátäÄÜÕ¹ÍÕÁÁ½ÉÑ•‘…Ñ„•áÁ½ÉÐ½)½¥¸É•™ÕÍ”ì¹¼É½Õ¡¹•ÍÌ¥¹Í¥‘”¹…Ñ¥Ù•UX•¹Ù•±½Á”¸(´ltäÄÜY%¹•…É‰ä•á¥ÍÑ¥¹œ½±½ÕÈÁ…¥¹ÐM…Ù•=Á•¸…¹½É‘¥¹…ÉäÕÁ±¥…Ñ”É•É•ÍÍ¥½¸¸()1½…°9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨ÈÔàäAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ìÍ¥à¹•ÜäÄÜ¡•­Ì…¹)…±°•á¥ÍÑ¥¹œ½±½ÕÈ½UX½±•™Ðµ‘½¬½Á…¥¹Ð½¥µ…”½¹…Ñ¥Ù”É•É•ÍÍ¥½¹ÌÁ…ÍÌ¸I•Ù¥•Ý•½µÁ±•Ñ”)Á…É•¹Ð½1…ˆ…¡”É…Á °Í½ÕÉ”ÍÑ…µÁÌÉ•Ñ…¥¹•°ÁÉ½Ñ•Ñ•5Õ±Ñ¤½™É½é•¸Õ¹¡…¹•¸)AÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½ÝÌì¹¼¹•ÜÉ½Õ¡¹•ÍÌ‘•Ù¥”U$½ÈÉ•¹‘•È±…¥´¸(((ŒŒŒ	Õ¥±€¸äÄÜÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥…Ñ¥½¸()IÕ¹Ñ¥µ”½µµ¥Ð€ÌÁ˜ÌääÜÁ˜àÀá„ÀÈÉ…˜ÀÔÑ˜Á”ÐÔÀÕÈÁ•…•˜ÌäÜÜÉ€°Ñ•ÍÑ•ÑÉ•”€ÁˆÑ‘ŒÔÐÐÅ˜ÌÌääÈÌÉ„ÌÙ‘‘‘™ˆÅ”ÐÔàÔØÝ•ˆØÐÅ€°¥ÌÁÕ‰±¥Í¡•¸!½ÍÑ•9½‘”€ÈÈÉ•É•ÍÍ¥½¸ÉÕ¸€ÌäÄäÐÜàÔàÌà€¡©½ˆ€ÄÄÜàÜÔÀàÄÐàÐ¤Á…ÍÍ•…±°€È°ÔàäÑ•ÍÑÌ°Ý¥Ñ é•É¼™…¥±ÕÉ•Ì½ÈÍ­¥ÁÌ¸A…•ÌÉÕ¸€ÌäÄäÐÜàÔÔØÀ½µÁ±•Ñ•ÍÕ•ÍÍ™Õ±±ä€¡‘•Á±½ä©½ˆ€ÄÄÜàÜÔÈÄØÔÌØ¤¸±°€ÈÔ¡•­•±¥Ù”ÉÕ¹Ñ¥µ”°1…ˆ°É•±•…Í”…¹ÁÉ½Ñ•Ñ•5Õ±Ñ¤™¥±•Ìµ…Ñ¡•É•Á½Í¥Ñ½Éä‰åÑ•Ì¸AÉ½Ñ•Ñ•€¸äÄØÕÍ•ÈAMLÉ•µ…¥¹Ì¥¸™½É”ì¹¼É•¹‘•É•É½Õ¡¹•ÍÌU$…•ÁÑ…¹”¥Ì±…¥µ•¸()!…¹‘Ìµ½¸€¸äÄÜ¡•­ÌèÁ…¥¹Ð„‘¥ÍÑ¥¹Ñ¥Ù”µ…É¬°M…Ù”€¹‰½á±…ˆ…¹É•½Á•¸ì‘ÕÁ±¥…Ñ”„Á…¥¹Ñ•½‰©•Ð°Á…¥¹ÐÑ¡”½Áä°…¹U¹‘¼½I•‘¼Ý¡¥±”½¹™¥Éµ¥¹œÑ¡”½É¥¥¹…°É•µ…¥¹ÌÕ¹¡…¹•¸I½Õ¡¹•ÍÌ¡…Ì¹¼½¹ÑÉ½±Ìå•Ðì¥ÑÌÉ•Í½ÕÉ”½ÁÉ½©•Ð½¡¥ÍÑ½Éä™½Õ¹‘…Ñ¥½¸¥Ì½Ù•É•‰ä…ÕÑ½µ…Ñ•Ñ•ÍÑÌ¸9•áÐ¹…ÉÉ½ÜÝ½É¬É•µ…¥¹ÌÍ…±…ÈA9…¹•á¥ÍÑ¥¹œ•áÁ½ÉÐµ½Ý¹•È…‘…ÁÑ…Ñ¥½¸‰•™½É”Ù¥Í¥‰±”É½Õ¡¹•ÍÌÁ…¥¹Ñ¥¹œ¸(((ŒŒ€¸äÄàƒŠPÉ½Õ¡¹•ÍÌ•áÁ½ÉÐÑ¡É½Õ •á¥ÍÑ¥¹œÝÉ¥Ñ•ÉÌì€¸äÄÜÕÍ•ÈAMLƒŠP€Ää=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäÄÝAMLÁÉ½Ñ•ÑÌ•á¥ÍÑ¥¹œ½±½ÕÈM…Ù”½=Á•¸°Á…¥¹Ñ•ÕÁ±¥…Ñ”¥Í½±…Ñ¥½¸…¹)U¹‘¼½I•‘¼¸Õ‘¥Ðµ…¥¸Á˜ÀÐÁ•È¼¸äÄÜèÍ…±…ÉA9½¹…Ñ¥Ù”µ…Ñ•É¥…°Í±½ÑÌ½1µ…Ñ•É¥…°Á…Ñ )…±É•…‘ä•á¥ÍÐ¸áÑ•¹½É¥¥¹…°Á…¥¹Ðµ•áÁ½ÉÐ…ÁÑÕÉ”Ý¥Ñ ÍÑÉ¥Ð½Ý¹•Hà½Á¥•Ì)‰•™½É”…Ý…¥Ð°•á¥ÍÑ¥¹œ¹…Ñ¥Ù”	…Í”UX­•ä½‘¥•ÍÐ™½È‰½Ñ ¡…¹¹•±Ì°…¹Í…±…ÉA9)•¹½‘¥¹œ€¡¹¼…µµ„½™±¥À½É•Í…µÁ±”½™…Ñ½È‰…­”¤¸=É¥¥¹…°9=4É½Õ¡¹•ÍÌÍ±½Ð½™…Ñ½ÈÄ°)UX½Á½±å½¸½½¹Ñ…¥¹•È½¹…µ”½‘•‘ÕÀ¼ÈÑ5¥‰Õ‘•ÐÉ•Ñ…¥¹•¸1É½Õ¡¹•ÍÍ…Ñ½ÈÄ…¹)µ•Ñ…±±¥…Ñ½ÈÀì¥µ…”¥‘•¹Ñ¥ÑäÍ•Á…É…Ñ”™É½´½µ‰¥¹•½±½ÕÈ­É½Õ¡¹•ÍÌµ…Ñ•É¥…°)¥‘•¹Ñ¥ÑäÍ¼Í¡…É•½±½ÕÈ…¹¹½Ðµ•É”‘¥ÍÑ¥¹ÐÉ½Õ¡¹•ÍÌµ…ÁÌ¸M…±…Èµ½¹±ä…¹)½±½ÕÈ­Í…±…ÈÍÕÁÁ½ÉÑ•ìÕ¹ÁÉ•Á…É•Íå¹Œ¹…Ñ¥Ù”½=	(½)½¥¸ÍÑ¥±°É•™ÕÍ”¸9¼ÁÉ½©•Ð)Í¡•µ„½¡¥ÍÑ½Éä½‰ÉÕÍ ½U$½­•É¹•°½ÁÉ½Ù•¹…¹”¡…¹•Ì¸¥Ù”…ÑÕ…°ÝÉ¥Ñ•È½¥±”½A9½…Íå¹Œ¼)‰¥¹‘¥¹œ½É•™ÕÍ…°½Í½ÕÉ”µ¥µµÕÑ…‰¥±¥ÑäÉ•É•ÍÍ¥½¹Ì…‘‘•ì½±äÄÜ…Íå¹ŒÉ•™ÕÍ…°ÕÁ‘…Ñ•)Ñ¼ÍÑ…±”µ‰¥¹‘¥¹œÙ…±¥‘…Ñ¥½¸°½Ñ¡•ÈÕ…É‘ÌÉ•Ñ…¥¹•¸¡…¹•½Ý¹•ÉÌ…¹É•ÕÉÍ¥Ù”)Á…É•¹Ð½1…ˆ…¡”É…Á äÄàìÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸½µ½‘•±±¥¹œ…¹…•ÁÑ•A…¥¹ÐU$)É•Ñ…¥¹•¸I•…‘½Ì½É½Õ¡¹•ÍÌµ•áÁ½ÉÐ´äÄà¹µ¸Õ±°Ù…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸™½±±½Ü¸)9¼É½Õ¡¹•ÍÌ½¹ÑÉ½±Ì½ÁÉ•Ù¥•Üå•Ðì¹•áÐ½É¥¥¹…°Á…¥¹Ñ•ÈÍ…±…È¡…¹¹•°¥¹Ñ•É…Ñ¥½¸¸)5…¹Õ…°¹•…É‰äè•áÁ½ÉÐ‘¥™™•É•¹Ñ±äÁ…¥¹Ñ•½É¥¥¹…°½½ÁäÑ¼9=5…¹1°½¹™¥É´)¥¹‘•Á•¹‘•¹Ð½±½ÕÈ½UXÁ±…•µ•¹ÐìÁ…¥¹ÐM…Ù”½=Á•¸½¡¥ÍÑ½ÉäÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•äÄÝAML¸((´mátäÄÜY%•á¥ÍÑ¥¹œÁ…¥¹ÐM…Ù”½=Á•¸…¹ÕÁ±¥…Ñ”½U¹‘½I•‘¼èÕÍ•ÈAMLÈÀÈØ´ÄÀ´Ää¸AÉ½Ñ•Ñ•¸(´mátäÄà…ÕÑ½µ…Ñ•Í…±…ÈA9½9=4½1•á…Ð‰åÑ•Ì°UYÌ°½µ‰¥¹•µ…Ñ•É¥…±Ì…¹‘•‘ÕÀ¸(´mátäÄà…ÕÑ½µ…Ñ•…Íå¹Œ…ÁÑÕÉ”°µ…±™½Éµ•½ÍÑ…±”½Ý¹•ÈÉ•™ÕÍ…°…¹Í½ÕÉ”¥µµÕÑ…‰¥±¥Ñä¸(´mátäÄà…ÑÕ…°¥±”9=5½1…Ñ¥½¹Ì‘½Ý¹±½…Í…±…Èµ…ÁÌ…¹É•Á½ÉÐ½Õ¹ÑÌ¸(´ltäÄàY%¹•…É‰ä½±½ÕÈ9=5½1•áÁ½ÉÐ…ÁÁ•…É…¹”ì¹¼É½Õ¡¹•ÍÌ½¹ÑÉ½±Ìå•Ð¸(()UÍ•ÈÉ•µ¥¹‘•ÈƒŠP€Ää=Ñ½‰•È€ÈÀÈØè•Ù•Éä‰Õ¥±½µÁ±•Ñ¥½¸µÕÍÐ•áÁ±¥¥Ñ±äÍÑ…Ñ”)Ý¡•Ñ¡•ÈÑ¡•É”¥ÌÍ½µ•Ñ¡¥¹œÑ¼Ñ•ÍÐ°Ý¥Ñ ‰Õ¥±½É•…‘¥¹•ÍÌ…¹ÅÕ¥¬¡…¹‘Ìµ½¸¡•­Ì°)½È±•…É±äÍÑ…Ñ”¹¼¹•Ü¡…¹‘Ìµ½¸Ñ•ÍÐ¥Ì¹••‘•¸I•…™™¥Éµ•¥¸%}]=I-1=\¹µ¸(((¸äÄà™¥¹…°±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨È°ÔäÐAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)¥Ù”¹•Ü•áÁ½ÉÐ¥¹Ñ•É…Ñ¥½¹Ì…¹…±°•á¥ÍÑ¥¹œÁ…¥¹Ð½¥µ…”½UX½µ½‘•±±¥¹œ¡•­ÌÁ…ÍÌ¸)%¹¥Ñ¥…°…¡”ÁÉ•Á…É…Ñ¥½¸…¥‘•¹Ñ…±±äÉ•Á¥¹¹•Õ¹¡…¹•äÄÜÍ¡•±°½Ý¹•ÉÌìÉ•É•ÍÍ¥½¸)¡•­Ì…Õ¡ÐÑ¡¥Ì°Õ¹É•±…Ñ•Á¥¹ÌÝ•É”É•ÍÑ½É•°É•Ù¥•Ý•½¹ÑÉ…ÐÁ…ÍÍ•°…¹Ñ¡”)™¥¹…°½µÁ±•Ñ”ÍÕ¥Ñ”…‰½Ù”É…¸……¥¹ÍÐ½ÉÉ•Ñ•Í½ÕÉ”¸9¼‰…É…Á ÁÕ‰±¥Í¡•¸)5Õ±Ñ¤Ä¸À…¹™É½é•¸‰•Ñ…ÌÕ¹¡…¹•¸AÕ‰±¥…Ñ¥½¸Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌ¸(((ŒŒ€¸äÄàÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€Ää=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”½µµ¥Ð€ÔÝ„ÔÍ˜äÍ™™ˆáŒå„ÄäÑ‰ˆÅ‰……‰ˆÜÌá…ˆÁáˆäÈÑ€°ÑÉ•”)ŒÄÕ˜ääá”Ù•…„ÐÄÙ”ÄÔå‰„äÔäÌÄÈÌÜÁ”ÐÄåˆÀÐá€°¥ÌÁÕ‰±¥Í¡•¸!½ÍÑ•Ñ½Á½±½ä)É•É•ÍÍ¥½¸ÉÕ¸€ÌäÈÌÈØÜÔÔàá€°©½ˆ€ÄÄÜääÐÄÔÌäÔÝ€°½µÁ±•Ñ•ÍÕ•ÍÍ™Õ±±äì)A…•ÌÉÕ¸€ÌäÈÌÈØÜÔÄÈÕ€½µÁ±•Ñ•ÍÕ•ÍÍ™Õ±±ä¸Q¡”‰Õ¥±ÌÉ•½É‘•±½…°™Õ±°)ÍÕ¥Ñ”¥Ì€È°ÔäÐAML€¼€À%0€¼€ÀÍ­¥ÁÁ•ìÑ¡¥Ì½¹Ñ¥¹Õ…Ñ¥½¸Ù•É¥™¥•¡½ÍÑ•ÍÕ•ÍÌ°)Ý¥Ñ¡½ÕÐÉ•ÉÕ¹¹¥¹œÑ¡”±½…°ÍÕ¥Ñ”¸±°€Ää¡•­•±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ µ…¥¸è)Í¡•±°½µ…¹¥™•ÍÐ°•Ù•Éä¡…¹•ÉÕ¹Ñ¥µ”…¹1…ˆ™¥±”°…¹ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À¸)9¼ÉÕ¹Ñ¥µ”¡…¹•Ì¥¸Ñ¡¥Ì½¹Ñ¥¹Õ…Ñ¥½¸…¹¹¼€¸äÄà‘•Ù¥”AML¥¹™•ÉÉ•¸()Q¡”…ÁÀ¥ÌÉ•…‘ä™½ÈÑ•ÍÑ¥¹œƒŠP‰Õ¥±€¸äÄà¸áÁ½ÉÐ‘¥™™•É•¹Ñ±ä½±½ÕÈµÁ…¥¹Ñ•)½É¥¥¹…°½½ÁäÑ¼9=5…¹1ì¡•¬¥¹‘•Á•¹‘•¹Ð½±½ÕÈ…¹UXÁ±…•µ•¹Ð¸I•Á…¥¹Ð)Ñ¡”½Áä…¹É•Á•…Ð9=5•áÁ½ÉÐÑ¼½¹™¥É´Ñ¡”½É¥¥¹…°É•µ…¥¹ÌÕ¹¡…¹•¸)I½Õ¡¹•ÍÌ™¥áÑÕÉ•Ì…É”…ÕÑ½µ…Ñ•ìÑ¡•É”…É”¹¼É½Õ¡¹•ÍÌ½¹ÑÉ½±ÌÑ¼Ñ•ÍÐå•Ð¸)9•áÐ¹…ÉÉ½Ü‰Õ¥±èÙ¥Í¥‰±”É½Õ¡¹•ÍÌ¡…¹¹•°½ÁÉ•Ù¥•ÜÑ¡É½Õ •á¥ÍÑ¥¹œ½µÁ…ÐA…¥¹Ð°)É…ÍÑ•È½¥¹ÁÕÐ½¡¥ÍÑ½Éä½Ý¹•ÉÌ°ÁÉ•Í•ÉÙ¥¹œÍ…±…È‘…Ñ„Í•µ…¹Ñ¥Ì…¹•á¥ÍÑ¥¹œ•áÁ½ÉÑÌ¸(((ŒŒ€¸äÄäƒŠPI½Õ¡¹•ÍÌA•¹¥°Á…¥¹Ñ¥¹œ…¹É…åÍ…±”¥¹ÍÁ•Ñ¥½¸ƒŠP€Ää=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸äÄàAMLÁÉ½Ñ•ÑÌ¥¹‘•Á•¹‘•¹Ð½É¥¥¹…°½½Áä½±½ÕÈ…¹UXÁ±…•µ•¹Ð¥¸9=5)…¹1°¥¹±Õ‘¥¹œÉ•Á…¥¹Ð½É”µ•áÁ½ÉÐ¥Í½±…Ñ¥½¸¸Õ‘¥ÐŒÀÀÕ˜ÄÀÜè€¸äÄÜÉ•Í½ÕÉ”½ÁÉ½©•Ð¼)¡¥ÍÑ½Éä…¹€¸äÄà½É¥¥¹…°ÝÉ¥Ñ•ÉÌ•á¥ÍÐì¹¼Í…±…È¡…¹¹•°¥¸Ñ¡”Á…¥¹Ñ•È¸áÑ•¹)½É¥¥¹…°Ù¥•ÝÁ½ÉÐµÁ…¥¹Ðµ½É”…¹½µÁ…Ð±•™ÐU$½¹±ä¸¡…¹¹•°½±½ÕÈ½I½Õ¡¹•ÍÌ°(ÃŠLÈÔÔÙ…±Õ”Í±¥‘•È°Í…µ”Í¥é”½¡…É‘¹•ÍÌ½½Á…¥Ñä½ÁÉ•ÍÍÕÉ”…¹	½á1…ˆ½-±•­ÌÍ…µÁ±•ÉÌ¸)=Á…ÅÕ”É…ÍÑ•ÈÌÉ…Üµ‰åÑ”¥¹Ñ•ÉÁ½±…Ñ¥½¸…ÉÉ¥•Ì•ÅÕ…°IÙ…±Õ•ÌìÁÕ‰±¥Í ½Ý¹•Hà)Ñ¡É½Õ ½É¥¥¹…°É½Õ¡¹•ÍÌÉ•Í½ÕÉ”½Á½½°…¹Í•¹”¡•­Á½¥¹Ð¸]¡¥Ñ”‘•™…Õ±Ð€ôÈÔÔì(ÀÍµ½½Ñ €¼ÈÔÔÉ½Õ ¸9¼…µµ„½¹Ù•ÉÍ¥½¸½È½±½ÕÈ‰±•¹µ½‘•Ì¥¸Í…±…Èµ…Ñ ¸)É…åÍ…±”¥¹ÍÁ•Ñ¥½¸¥ÌÑ•µÁ½É…Éä…¹±…‰•±±•ì½¹”É•ÑÕÉ¹Ì•á¥ÍÑ¥¹œ½±½ÕÈ½MÑÕ‘¥¼)…ÁÁ•…É…¹”¸9¼±¥Ðµ…Ñ•É¥…°É½Õ¡¹•ÍÌÁÉ•Ù¥•Üå•Ð¸9•Üµ…ÁÌÔÄË
ÈìÙ…±¥½Ñ¡•ÈÍ¥é•Ì)É•µ…¥¸Í…Ù…‰±”½•áÁ½ÉÑ…‰±”‰ÕÐÁ…¥¹Ñ¥¹œÉ•™ÕÍ•ÌÝ¥Ñ¡½ÕÐÉ•Í…µÁ±¥¹œ¸I½Õ¡¹•ÍÌ¡…¹¹•°)¡…Ì¹¼±…å•ÉÌ½µ…Í­Ì½¥µ…”½Á•É…Ñ¥½¹Ìì½É¥¥¹…°½±½ÕÈ½¹ÑÉ½±Ì‘¥Í…‰±•°É•ÍÑ½É•)½¸½±½ÕÈ¸¡…¹¹•°¡…¹”…¹•±Ì±¥Ù”½¹Ñ…Ð½Á±…•µ•¹Ð°¹•Ù•È…‘‘Ì¡¥ÍÑ½Éä¸()M…±…È¥‘•¹Ñ¥Ñä©½¥¹Ì•á¥ÍÑ¥¹œ…Íå¹Œ½ÕÉÉ•¹ÐµÍÑ…Ñ”Õ…É‘Ì¸%¹Ù…±¥½ÍÑ…±”‰¥¹‘¥¹œ°)ÅÕ½Ñ„½¡•­Á½¥¹Ð™…¥±ÕÉ”É½±±Ì‰…¬ÁÉ•Ù¥•Ü…¹±•…Ù•ÌÍ•¹”½Í¡…É•É•Í½ÕÉ•Ì¥¹Ñ…Ð¸)=É¥¥¹…°Í¥¹±”½5Õ±Ñ¤ÕÁ±¥…Ñ”°¡¥ÍÑ½Éä°Í•¹•ØØM…Ù”½=Á•¸…¹9=4½1ÝÉ¥Ñ•ÉÌÉ•µ…¥¸)½Ý¹•ÉÌ¸=¹±äÑÝ¼Á…¥¹Ñ•Èµ½‘Õ±•Ì…¹Ñ¡•¥ÈÍ¡•±°Á¥¹Ì¡…¹”ì¹•Ü¡¥±É•™•É•¹•Ì)ÕÍ”•á¥ÍÑ¥¹œäÄàÉ•Í½ÕÉ”½Á½½°Á¥¹Ì¸5Õ±Ñ¤Ä¸À½™É½é•¸½µ½‘•±±¥¹œ½É•¹‘•È½•áÁ½ÉÐ­•É¹•±Ì°)1…ˆ…¹‰ÉÕÍ Í½ÕÉ•ÌÕ¹¡…¹•¸M¥à™½ÕÍ•¥¹Ñ•É…Ñ¥½¸¡•­Ì½Ù•È…ÑÕ…°U$°)‰åÑ•Ì½…¹•°½½Ù•É…”°¡¥ÍÑ½Éä½ÁÉ½©•Ð°…ÑÕ…°Í¥¹±”­5Õ±Ñ¤ÕÁ±¥…Ñ”…¹1½¹…Ñ¥Ù”)A9°ÅÕ½Ñ…Ì½É½±±‰…¬…¹ÍÑ…±”½¹½¸ÔÄÈÉ•™ÕÍ…±Ì¸Õ±°Ù…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸‰•±½Ü¸()9•áÐY%èA…¥¹ÐƒŠH¡…¹¹•°I½Õ¡¹•ÍÌ°Á…¥¹ÐÙ…±Õ”ÀÑ¡•¸ÈÔÔ•±Í•Ý¡•É”ì¥¹ÍÁ•ÐÉ…ä)µ…À¸½±½ÕÈÉ•ÑÕÉ¹Ì½É¥¥¹…°Á…¥¹ÐìÉ•Í•±•ÐI½Õ¡¹•ÍÌÑ¼¥¹ÍÁ•ÐÉ•Ñ…¥¹•µ…À¸)½¹”½U¹‘¼½I•‘¼°M…Ù”½=Á•¸Ñ¡•¸I½Õ¡¹•ÍÌì‘ÕÁ±¥…Ñ”½É•Á…¥¹Ð…¹•áÁ½ÉÐ9=5Ñ¼¡•¬)Íµ½½Ñ ½É½Õ É•¥½¹ÌÕ¹‘•È±¥¡Ñ¥¹œ¸9¼É•¹‘•É•½¥A…Á•É™½Éµ…¹”…•ÁÑ…¹”¥¹™•ÉÉ•)™É½´9½‘”…‘…ÁÑ•ÉÌ¸9•áÐ‰Õ¥±è±¥ÐÉ½Õ¡¹•ÍÌÁÉ•Ù¥•ÜÑ¡É½Õ •á¥ÍÑ¥¹œµ…Ñ•É¥…°¼)ÍÕÉ™…”±¥™•Ñ¥µ”½Ý¹•È°É•Ñ…¥¹¥¹œ…•ÁÑ•½±½ÕÈ…ÁÁ•…É…¹”Ý¡•É”¹¼Í…±…È•á¥ÍÑÌ¸((´mát€¸äÄàY%¥¹‘•Á•¹‘•¹Ð½±½ÕÈ½UYÌ¥¸9=5­1…¹É•Á…¥¹Ð¥Í½±…Ñ¥½¸èÕÍ•ÈAML¸AÉ½Ñ•Ñ•¸(´mát€¸äÄäÍ¥à¥¹Ñ•É…Ñ¥½¸¡•­Ìè…ÑÕ…°U$°‰åÑ”¥¹Ñ•ÉÁ½±…Ñ¥½¸½…¹•°°¡¥ÍÑ½Éä½ÁÉ½©•Ð°(€…ÑÕ…°Í¥¹±”½5Õ±Ñ¤ÕÁ±¥…Ñ”€¬¹…Ñ¥Ù”½1µ…ÁÌ°ÅÕ½Ñ„½¡•­Á½¥¹Ð…¹ÍÑ…±”½Í¥é”Õ…É‘Ì¸(´mát€¸äÄäY%I½Õ¡¹•ÍÌÙ…±Õ”À¼ÈÔÔÍÑÉ½­•Ì°¡…¹¹•°É•ÑÕÉ¸…¹É•Ñ…¥¹•É…åÍ…±”èÕÍ•ÈAMLÈÀÈØ´ÄÀ´Ää¸(´mát€¸äÄäY%U¹‘¼½I•‘¼°M…Ù”½=Á•¸°‘ÕÁ±¥…Ñ”¥Í½±…Ñ¥½¸…¹9½µ…Íµ½½Ñ ½É½Õ …ÁÁ•…É…¹”èÕÍ•ÈAMLÈÀÈØ´ÄÀ´Ää¸((¸äÄä™¥¹…°±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨È°ØÀÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)M¥à¹•ÜÍ…±…È¥¹Ñ•É…Ñ¥½¸¡•­ÌÁ…ÍÌìÉ•Ù¥•Ý•É•±•…Í”½¹ÑÉ…ÐÕAML…¹½É¥¥¹…°)½±½ÕÈ½µ…Í¬¡•­ÌÉ•Ñ…¥¹•¸9¼ÉÕ¹Ñ¥µ”Ñ•ÍÑÌÍ­¥ÁÁ•°¹¼ÁÉ½Ñ•Ñ•½™É½é•¸¡…¹•Ì¸)AÕ‰±¥…Ñ¥½¸Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌì…ÑÕ…°¥A…½É…åÍ…±”½¹…Ñ¥Ù”µ±¥¡Ñ¥¹œ…Ñ”Á•¹‘¥¹œ¸(((ŒŒ€¸äÄäÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€Ää=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÜÙ”Ðá”ÍˆÑ•”Õ‘ŒÜÌÀÄá”ÔØÙ„Õ˜á„ÑˆÌÈÍ„Í‰…Œå€°Ñ•ÍÑ•ÑÉ•”)”ÔáÌÕ•”ÔØÌààÅ…”ÜÑ™•™‰ˆÀÍŒÍ™‰™”ØÉ˜ÔØÝˆÉ€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ð…Ñ„)É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°±½…°Ñ•ÍÑ•ÑÉ•”ì™•Ñ¡•½É¥¥¸½µ…¥¸µ…Ñ¡••á…Ñ±ä¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•É•É•ÍÍ¥½¸€ÌäÈÐÈÜÈÌàäÙ€€¼©½ˆ€ÄÄàÀÈÜÄØÔÌÀå€‰½Ñ Á…ÍÌ(È°ØÀÀÑ•ÍÑÌ°é•É¼™…¥±ÕÉ•Ì½Í­¥ÁÌì¡½ÍÑ•½µÁ±•Ñ”±½ÌÙ•É¥™¥•½Õ¹ÑÌ¸A…•Ì)€ÌäÈÐÈÜÈÈÜÔÑ€°‘•Á±½ä©½ˆ€ÄÄàÀÈÜÌÜÌÐÈÝ€°½µÁ±•Ñ•…±°‘•Á±½åµ•¹ÐÍÑ•ÁÌÍÕ•ÍÍ™Õ±±ä¸)Q•¸™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”èÍ¡•±°½Ù•ÉÍ¥½¸°‰½Ñ ¡…¹•Á…¥¹Ñ•È)½Ý¹•ÉÌ°‰½Ñ É•½Ù•ÉäÍÉ¥ÁÑÌ°Á…¥¹ÐÑ…É•Ð°É½Õ¡¹•ÍÌÉ•Í½ÕÉ”½Á½½°…¹5Õ±Ñ¤Ä¸À¸)%¹¥Ñ¥…°ÁÉ•‘•Á±½åµ•¹ÐÉ•ÅÕ•ÍÑÌÍ•ÉÙ•äÄàì™¥¹…°½µÁ±•Ñ”É…Á µ…Ñ¡•ÌäÄä¸)M¡•±°ÁÕÍ ±…­•É•‘•¹Ñ¥…±Ìì½¹¹•Ñ•¥Ð…Ñ„ÁÕ‰±¥…Ñ¥½¸ÕÍ••áÁ•Ñ•µÁ…É•¹Ð°)¹½¸µ™½É•É•˜ÕÁ‘…Ñ”¸9¼ÁÉ½Ñ•Ñ•½™É½é•¸½µ½‘•±±¥¹œ½•áÁ½ÉÐ½É•¹‘•È¡…¹•Ì¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì…É”ÕÉÉ•¹ÐìÑ¡¥ÌÁÉ½½˜¡…¹•Ì‘½Ì½¹±ä¸UÍ•ÈäÄáAML)ÁÉ½Ñ•Ñ•¸€¸äÄä¥A…A•¹¥°½É…åÍ…±”½¹…Ù¥…Ñ¥½¸½¹…Ñ¥Ù”µ±¥¡Ñ¥¹œ…•ÁÑ…¹”Á•¹‘¥¹œì)¹¼…ÑÕ…°É•¹‘•É•ÁÉ½½˜¥¹™•ÉÉ•™É½´9½‘”…‘…ÁÑ•ÉÌ¸I•…‘ä™½È¡…¹‘Ìµ½¸¡•­Ì¥¸)Ñ¡¥Ì‰Õ¥±Ì•¹ÑÉä¸9•áÐ±¥Ðµ…Ñ•É¥…°ÁÉ•Ù¥•ÜÑ¡É½Õ •á¥ÍÑ¥¹œÍÕÉ™…”½±¥™•Ñ¥µ”½Ý¹•È¸(((ŒŒ€¸äÈÀƒŠP±¥ÐÉ½Õ¡¹•ÍÌµ…Ñ•É¥…°ÁÉ•Ù¥•ÜƒŠP€Ää=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸äÄäAMLÁÉ½Ñ•ÑÌI½Õ¡¹•ÍÌÀ¼ÈÔÔA•¹¥°Á…¥¹Ñ¥¹œ°¡…¹¹•°½É…åÍ…±”É•Ñ•¹Ñ¥½¸°)U¹‘¼½I•‘¼°M…Ù”½=Á•¸…¹¹…Ñ¥Ù”Íµ½½Ñ ½É½Õ µ…À¡…¹‘½™˜¸Õ‘¥Ð™ˆÝ˜äÈá„è½É¥¥¹…°)Á…¥¹ÐµÑ…É•ÐÍÕÉ™…”¥ÌÕ¹±¥Ð	…Í¥Œ°É•¹‘•Èµµ½‘•Ì½Ý¹Ì•á¥ÍÑ¥¹œMÑÕ‘¥¼½‰…Í”±¥¡Ñ¥¹œ¸)áÑ•¹M5Á…¥¹ÐÍÕÉ™…”½±¥™•Ñ¥µ”ì¹¼¹•Üµ•Í °É…å…ÍÐ°Í¡…‘•È°±¥¡Ð½È¡¥ÍÑ½Éä½Ý¹•È¸)A…¥¹ÐAÉ•Ù¥•ÜÍ•±•Ð½™™•ÉÌ¡…¹¹•°¡‘•™…Õ±Ð°ÁÉ•Í•ÉÙ¥¹œäÄä¤€¼1¥Ðµ…Ñ•É¥…°¸á¥ÍÑ¥¹œ)U$½¥¹ÁÕÐ½Ý¹•È…¹•±Ì…Ñ¥Ù”½¹Ñ…Ð½Á±…•µ•¹Ð½¸Ñ½±”ì¹¼Í•¹”½¡¥ÍÑ½Éäµ•Ñ…‘…Ñ„¸)1¥Ù”MÑ…¹‘…Éµ…Ñ•É¥…°É••¥Ù•ÌÕÉÉ•¹Ð™±…ÑÑ•¹•½±½ÕÈ¡ÍI¤…¹É½Õ¡¹•ÍÌ¡±¥¹•…È)9½½±½ÉMÁ…”½¤°™…Ñ½ÈÄ½µ•Ñ…±¹•ÍÌÀ½Ý¡¥Ñ”½±½ÕÈ¸]½É­¥¹œÉ½Õ¡¹•ÍÌÉ•…‘ÌÉ…Ü•ÅÕ…°µI)‰åÑ•Ì™É½´½É¥¥¹…°½Á…ÅÕ”É…ÍÑ•Èì¹¼…µµ„½™…Ñ½È‰…­”°É•Í…µÁ±¥¹œ½ÈÍ½ÕÉ”ÝÉ¥Ñ•Ì¸)¥ÉÑäÕÁ‘…Ñ•Ì½…±•Í”Ý¥Ñ ½É¥¥¹…°™É…µ”Ñ¥¬ìÑ•áÑÕÉ•Ì½µ…Ñ•É¥…±ÌÉ•ÕÍ•Õ¹Ñ¥°‘¥ÍÁ½Í”¸()½µµ¥ÑÑ•Ù…±¥É½Õ¡¹•ÍÌ‘¥ÍÁ±…åÌ±¥Ð…™Ñ•È½¹”½É•‰Õ¥±¥¸½É¥¥¹…°MÑÕ‘¥¼½M½±¥¼)UX%µ…”µ½‘•Ì°…Ñ¥Ù”…¹¥¹…Ñ¥Ù”½±½­•½‰©•ÑÌ¸M…±…Èµ½¹±äÕÍ•Ì¹•ÕÑÉ…°Ý¡¥Ñ”ì)½±½ÕÈµ½¹±äÉ•µ…¥¹Ì½É¥¥¹…°Õ¹±¥Ð…ÁÁ•…É…¹”Õ¹±•ÍÌ•áÁ±¥¥ÐA…¥¹Ð1¥ÐÁÉ•Ù¥•Ü¸)	½Ñ ¡…¹¹•°¥‘•¹Ñ¥Ñ¥•Ì½UX‰¥¹‘¥¹œ¡•­•…™Ñ•È…Ý…¥ÐìÍÑ…±”Í…±…È¥Ì¹½ÐÍ…µÁ±•°)Ù…±¥½±½ÕÈ…¸É•Ñ…¥¸	…Í¥Œ™…±±‰…¬¸5…±™½Éµ•Í…±…È½Õ¹ÍÕÁÁ½ÉÑ•½Ý¹•ÉÌÍ…™•±ä)™…±°‰…¬Ñ¼½É¥¥¹…°‰½‘äìÍÑ…±”½±½ÕÈ½È…±°¥¹Ù…±¥¡…¹¹•±Ì‘¥ÍÁ½Í”ÁÉ•Ù¥•Ü¸)á¥ÍÑ¥¹œ‘¥…¹½ÍÑ¥Œµ½‘•Ì±•…ÈÑ¡É½Õ Í…µ”±¥™•Ñ¥µ”½Ý¹•È¸±°ÍÕÉ™…”Ñ•áÑÕÉ•Ì)…É”ÁÉ¥Ù…Ñ•±ä½Ý¹•ì‘¥ÍÁ½Í”½¹”½¸‰½‘ä½µ½‘”½Í•ÍÍ¥½¸±½ÍÌì½É¥¥¹…°‰½‘äÉ•ÍÑ½É•¸)9½¸µÍÅÕ…É”ÄÛŠLÔÄÈ½µµ¥ÑÑ•‘…Ñ„µ…ÁÌ‘¥ÍÁ±…äÝ¥Ñ¡½ÕÐÉ•Í…µÁ±¥¹œ€¡•‘¥Ñ¥¹œÔÄË
ÈÉÕ±”)É•Ñ…¥¹•¤¸Õá¥±¥…Éä±¥ÐÑ•áÑÕÉ•ÌÕÀÑ¼ÑÝ¼ÔÄË
ÉI	‰Õ™™•ÉÌÁ•ÈÍÕÉ™…”°Á±ÕÌ•á¥ÍÑ¥¹œ)¡…¹¹•°ÍÕÉ™…”…¹AT½Á¥•Ìì¹½Ð„µ•…ÍÕÉ•‘•Ù¥”µÁ•É™½Éµ…¹”½µ•µ½Éä±…¥´¸()M¥à™½ÕÍ•¥¹Ñ•É…Ñ¥½¸¡•­Ì½Ù•È•á…Ð‘…Ñ„½ÍI½UX½µ…Ñ•É¥…°Í•ÑÑ¥¹Ì…¹±¥™•Ñ¥µ”°)Í…±…Èµ½¹±ä½½±½ÕÈµ½¹±ä½ÍÑ…±”™…±±‰…¬°…ÑÕ…°U$Ñ½±”½…¹•°½‘¥ÉÑä½…±•Í¥¹œ°±¥Ù”)½±½ÕÈ­Í…±…È¥Í½±…Ñ¥½¸½¡•­Á½¥¹ÐÉ½±±‰…¬½‰½‘ä‘¥ÍÁ½Í…°°…Íå¹Œ½ÁÉ½©•Ð½¡¥ÍÑ½Éä…¹)…ÑÕ…°É•¹‘•È½Ý¹•È…Ñ¥Ù”½¥¹…Ñ¥Ù”½µ½‘”‰•¡…Ù¥½È¸9½‘”ÕÍ•ÌÉ•…°Q¡É•”µ…Ñ•É¥…±Ì°)•½µ•ÑÉä…¹Á¥á•±Ìì¹¼]•‰0É•¹‘•È°¡¥¡±¥¡ÑÌ°¥A…±…Ñ•¹ä½È9½µ…Á…É¥ÑäÁÉ½½˜¸)M…µ”Í½ÕÉ”É•Í½ÕÉ•Ì½ÁÉ½©•ÑØØ½‰ÉÕÍ¡•Ì½•áÁ½ÉÐ…±½É¥Ñ¡µÌÉ•Ñ…¥¹•¸½ÕÈ¡…¹•)ÉÕ¹Ñ¥µ”½Ý¹•ÉÌÁ±ÕÌÉ•ÕÉÍ¥Ù”•áÁ½ÉÐ½1…ˆ…¡”É…Á ì5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸)I•…‘½Ì½É½Õ¡¹•ÍÌµÁÉ•Ù¥•Ü´äÈÀ¹µ¸Õ±°É•É•ÍÍ¥½¸½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”‰•±½Ü¸()9•áÐY%èI½Õ¡¹•ÍÌƒŠHAÉ•Ù¥•Ü1¥Ðµ…Ñ•É¥…°ìÁ…¥¹ÐÀÑ¡•¸ÈÔÔ°½É‰¥Ð¥¸MÑÕ‘¥¼Ñ¼)½µÁ…É”¡¥¡±¥¡ÑÌ¸¡…¹¹•°É•ÑÕÉ¹ÌÉ•Ñ…¥¹•É…åÍ…±”°1¥ÐÉ•ÑÕÉ¹Ì½±½ÕÈ½µ…Ñ•É¥…°¸)½¹”­••ÁÌ±¥ÐÉ½Õ¡¹•ÍÌìM…Ù”½=Á•¸…¹Í•±•Ð„‘¥™™•É•¹Ð½‰©•ÐÉ•Ñ…¥¸…ÁÁ•…É…¹”¸)U¹‘¼½I•‘¼…¹‘ÕÁ±¥…Ñ”¥Í½±…Ñ¥½¸É•µ…¥¸ÁÉ½Ñ•Ñ•¸á¥ÍÑ¥¹œ¹¼µÉ½Õ¡¹•ÍÌ½±½ÕÈ)½‰©•ÑÌÉ•Ñ…¥¸½É¥¥¹…°±½½¬¸Q¡•¸…Õ‘¥ÐÉ•µ…¥¹¥¹œµ…Ñ•É¥…°Í±½ÑÌ°ÍÑ…ÉÑ¥¹œ5•Ñ…±¹•ÍÌ)É•Í½ÕÉ”½•áÁ½ÉÐ½ÁÉ•Ù¥•Ü½Ý¹•ÉÌì­••ÀÍÑ…•Ì¹…ÉÉ½Ü…¹‘…Ñ„µ…Ý…É”°¹¼Á…É¥Ñä±…¥µÌ¸((´mát€¸äÄäY%Í…±…ÈÍÑÉ½­•Ì°¡…¹¹•°É•Ñ•¹Ñ¥½¸°¡¥ÍÑ½Éä½M…Ù•=Á•¸…¹9½µ……ÁÁ•…É…¹”èÕÍ•ÈAML¸AÉ½Ñ•Ñ•¸(´mát€¸äÈÀÍ¥à™½ÕÍ•Ñ•ÍÑÌèÑ•áÑÕÉ”Í•µ…¹Ñ¥Ì°±¥™•Ñ¥µ”°±¥Ù”U$½…¹•°½½…±•Í¥¹œ°(€¡…¹¹•°¥Í½±…Ñ¥½¸½¡•­Á½¥¹ÐÉ½±±‰…¬°¡¥ÍÑ½Éä½ÁÉ½©•Ð…¹É•…°É•¹‘•Èµ½Ý¹•Èµ½‘•Ì¸(´mát€¸äÈÀY%1¥Ðµ…Ñ•É¥…°À¼ÈÔÔ¡¥¡±¥¡ÑÌÕ¹‘•È½É‰¥Ðì¡…¹¹•°½1¥ÐÍÝ¥Ñ ÁÉ•Í•ÉÙ•Ìµ…ÁÌèÕÍ•ÈAMLÈÀÈØ´ÄÀ´Ää¸(´mát€¸äÈÀY%½¹”½M…Ù•=Á•¸½…Ñ¥Ù—ŠQ¥¹…Ñ¥Ù”…ÁÁ•…É…¹”°U¹‘½I•‘¼…¹‘ÕÁ±¥…Ñ”¥Í½±…Ñ¥½¸èÕÍ•ÈAMLÈÀÈØ´ÄÀ´Ää¸((¸äÈÀ%90±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨È°ØÀØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)M¥à¹•Ü™½ÕÍ•¡•­Ì…¹…±°±•…äÍ•µ…¹Ñ¥ÌÁ…ÍÌ¸I•Ù¥•Ý•Í¡•±°½…¡”µ½¹ÑÉ…Ð(ÕAMLì½Ñ¡•È•áÁ½ÉÐ½1…ˆÁ…É•¹Ð•‘¥ÑÌÙ•É¥™¥•Á¥¸µ½¹±äìÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸¥¹Ñ…Ð¸)%¹¥Ñ¥…°ÁÉ•Á…É…Ñ¥½¸ÉÕ¸…Õ¡Ð…¸¥¹½ÉÉ•ÐÑ•µÁ½É…ÉäÝÉ¥Ñ”Ñ…É•ÐÑ¡…ÐÉ•Á±…•Ñ¡”)±½…°!Q50Í¡•±°Ý¥Ñ …¡”µ™¥áÑÕÉ”)M=8¸I•ÍÑ½É•Í¡•±°™É½´µ…¥¸°…ÁÁ±¥•½¹±äÉ•Ù¥•Ý•)Á¥¹Ì½µ…É­•ÉÌ°½ÉÉ•Ñ•™¥áÑÕÉ”‘•ÍÑ¥¹…Ñ¥½¸°Ñ¡•¸É•É…¸Ñ¡”•¹Ñ¥É”™¥¹…°ÍÕ¥Ñ”…‰½Ù”¸)9¼µ…±™½Éµ•Í¡•±°ÁÕ‰±¥Í¡•…¹¹¼‰•¡…Ù¥½È¡•­ÌÉ•±…á•¸AÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌ¸(((ŒŒ€¸äÈÀÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€Ää=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”ˆÍ……”ÔÈØÙ‰™˜Á˜ÈÀØÔÀÁÉ”Õ™•„ÈÜààÈÕ”ÕÐÅ€°Ñ•ÍÑ•ÑÉ•”)€ÈÉˆäÅÌÔÑ‰ˆÀÍ˜Ñ…äÔÐÁ…‘˜ÐäÔÉˆÀÑ„ØåˆÔÐÙ€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ð…Ñ„)É•…Ñ•…¸¥‘•¹Ñ¥…°±½…°Ñ•ÍÑ•ÑÉ•”ì™•Ñ¡•½É¥¥¸½µ…¥¸µ…Ñ¡••á…Ñ±ä¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•É•É•ÍÍ¥½¸€ÌäÈÐÔÐÈÜäÌÝ€€¼©½ˆ€ÄÄàÀÌØÀÜÐØäÙ€‰½Ñ Á…ÍÌ(È°ØÀØÑ•ÍÑÌ°é•É¼™…¥±ÕÉ•Ì½Í­¥ÁÌ€¡¡½ÍÑ•½µÁ±•Ñ”±½ÌÙ•É¥™¥•¤¸A…•ÌÉÕ¸)€ÌäÈÐÔÐÈÜàÄá€‘•Á±½ä©½ˆ€ÄÄàÀÌØÈàäÀÄÝ€½µÁ±•Ñ•…±°‘•Á±½åµ•¹ÐÍÑ•ÁÌÍÕ•ÍÍ™Õ±±ä¸)±°Äà™É•Í ±¥Ù”Í¡•±°½Ù•ÉÍ¥½¸°™½ÕÈÉÕ¹Ñ¥µ”½Ý¹•ÉÌ°½µÁ±•Ñ”¡…¹••áÁ½ÉÐ½1…ˆ)Á…É•¹ÐÉ…Á °É•½Ù•Éä°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°É•Ñ…¥¹•É½Õ¡¹•ÍÌÉ•Í½ÕÉ”½Á½½°…¹)ÁÉ½©•Ð½‘•Œ™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸%¹¥Ñ¥…°ÁÉ•‘•Á±½åµ•¹ÐÉ•…‘ÌÍ•ÉÙ•äÄäì)™¥¹…°½µÁ±•Ñ”¡•­•É…Á µ…Ñ¡•ÌäÈÀ¸9¼™É½é•¸½µ½‘•±±¥¹œ½‰ÉÕÍ ½ÁÉ½©•Ð½•áÁ½ÉÐ)…±½É¥Ñ¡´¡…¹•Ì¸M½ÕÉ”Í…±…È‰åÑ•Ì½‘…Ñ„Í•µ…¹Ñ¥ÌÉ•Ñ…¥¹•ì¹¼ÕÍÑ½´±¥¡ÑÌ¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä‘½Õµ•¹ÑÌÕÁ‘…Ñ•ìÑ¡¥ÌÁÉ½½˜¥Ì‘½Ìµ½¹±ä¸UÍ•ÈäÄåAMLÁÉ½Ñ•Ñ•ì(äÈÀ…ÑÕ…°¥A…¡¥¡±¥¡ÑÌ½µ…Ñ•É¥…°…ÁÁ•…É…¹”½±…Ñ•¹ä…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ°)¹½Ð•ÍÑ…‰±¥Í¡•‰ä9½‘”Q¡É•”µ…Ñ•É¥…°½Ñ•áÑÕÉ”Ñ•ÍÑÌ¸I•…‘ä™½È¡…¹‘Ìµ½¸A…¥¹Ð)I½Õ¡¹•ÍÌƒŠHAÉ•Ù¥•Ü1¥Ðµ…Ñ•É¥…°À¼ÈÔÔ½½É‰¥Ð°¡…¹¹•°É•ÑÕÉ¸°½¹”½M…Ù•=Á•¸½Í•±•Ñ¥½¸)…¹•á¥ÍÑ¥¹œ¹¼µÉ½Õ¡¹•ÍÌ½±½ÕÈ…ÁÁ•…É…¹”¸9•áÐÉ•µ…¥¹¥¹œµ…Ñ•É¥…°µÍ±½Ð…Õ‘¥Ð(¡5•Ñ…±¹•ÍÌ…¹‘¥‘…Ñ”¤™½±±½ÝÌ‘•Ù¥”™••‘‰…¬°Ñ¡É½Õ ½É¥¥¹…°½Ý¹•ÉÌ¸(((ŒŒ€¸äÈÄƒŠPµ•Ñ…±¹•ÍÌ‘…Ñ„½ÁÉ½©•Ð™½Õ¹‘…Ñ¥½¸Ù¥„Í¡…É•Í…±…È½Ý¹•ÉÌƒŠP€Ää=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäÈÁAMLÁÉ½Ñ•ÑÌ1¥Ð½¡…¹¹•°É½Õ¡¹•ÍÌÁÉ•Ù¥•Ü°¡¥¡±¥¡ÑÌ°½¹”½M…Ù•=Á•¸½Í•±•Ñ¥½¸)…ÁÁ•…É…¹”…¹½É¥¥¹…°½±½ÕÈµ½¹±ä±½½¬¸Õ‘¥Ðµ…¥¸ÀÕ‘‘˜ÀàÔè¥µÁ½ÉÑ•9=4½1µ•Ñ…±¹•ÍÌ)Í±½ÑÌ•á¥ÍÐì•‘¥Ñ…‰±”É•Í½ÕÉ”½Í•¹”ÑÉ…¹ÍÁ½ÉÐ‘¼¹½Ð¸áÑÉ…ÐÑ¡”…•ÁÑ•äÄÜHà)Ù…±¥‘…Ñ¥½¸½…¹½¹¥…°‰åÑ”½‘•Œ…¹‘•‘ÕÀ½ÅÕ½Ñ„½ÁÉ•‘•½‘”Á½½°¥¹Ñ¼Í¡…É•Í…±…È)½Ý¹•ÉÌì•á¥ÍÑ¥¹œÉ½Õ¡¹•ÍÌA$½‘•ÍÉ¥ÁÑ½È½‰åÑ”Í•É¥…±¥é…Ñ¥½¸½•ÉÉ½ÉÌ…¹Ñ5¥Õ¹¥ÅÕ”€¼(á5¥•áÁ…¹‘•‰Õ‘•ÑÌÉ•Ñ…¥¹•¸5•Ñ…±¹•ÍÌÕÍ•ÌÍ•Á…É…Ñ”ÍÑÉ¥Ð±¥¹•…ÈHà‘•ÍÉ¥ÁÑ½È°(ÄÛŠLÔÄÈ…á•Ì°UXµØÀµ™¥ÉÍÐ°½Ý¹•…ÁÑÕÉ•Ì°É•…µ½¹±ä½µµ¥ÑÑ•Í¡…É¥¹œ¸9¼I‰±•¹‘¥¹œ°)¹•Ü‰ÉÕÍ ½­•É¹•°½¡¥ÍÑ½Éä½ÝÉ¥Ñ•È½Èµ•Ñ…±¹•ÍÌU$½ÁÉ•Ù¥•Ü‘•±¥Ù•É•¸()áÁ±¥¥ÐÍ•¹•ØÜ=91dÝ¡•¸µ•Ñ…±¹•ÍÌ•á¥ÍÑÌèµ…¹‘…Ñ½ÉåÁ…¥¹ÑAÉ½©•ÑY•ÉÍ¥½¸ÇŠLØ‘•±•…Ñ•Ì)•á¥ÍÑ¥¹œ•¹Ù•±½Á•Ì°É½Õ¡¹•ÍÍØØÉ•Ñ…¥¹Í½±½ÕÉA…¥¹ÑY•ÉÍ¥½¸ÇŠLÔ¸]¥Ñ¡½ÕÐµ•Ñ…±¹•ÍÌ½É¥¥¹…°)±•…ä)M=8½Ù•ÉÍ¥½¸É•Ñ…¥¹••á…Ñ±ä¸%¹‘•Á•¹‘•¹Ðµ•Ñ…±¹•ÍÌÁ½½°Ñ5¥Õ¹¥ÅÕ”¼á5¥)•áÁ…¹‘•°½É¥¥¹…°ÌÉ5¥™¥±”…¹½±½ÕÈ½É½Õ¡¹•ÍÌ‰Õ‘•ÑÌÉ•Ñ…¥¹•¸½µÁ±•Ñ”É•Í½ÕÉ”¼)É•˜½Í¡•µ„½Í¥é”ÁÉ•™±¥¡Ð‰•™½É”µ•Í É•…Ñ¥½¸ì½ÉÉÕÁÑ¥½¸½ÅÕ½Ñ„½Õ¹ÍÕÁÁ½ÉÑ•½Ý¹•ÉÌ)É•™ÕÍ”…Ñ½µ¥…±±ä¸9…Ñ¥Ù”UX•¹Ù•±½Á”É•µ…¥¹ÌUXµ½¹±ä¸=É¥¥¹…°¡¥ÍÑ½ÉäÍ¹…ÁÍ¡½ÑÌ¼)É•ÍÑ½É”½…‘‘5•Í ½Í¥¹±”­5Õ±Ñ¤ÕÁ±¥…Ñ”…ÉÉäµ•Ñ…±¹•ÍÌ‰äÉ•…µ½¹±äÉ•™•É•¹”ì•‘¥ÑÌ)É•Á±…”¸=É¥¥¹…°¥±”M…Ù”½=Á•¸…¹É•¹‘•Èµ™…¥±ÕÉ”Í•¹”½¡¥ÍÑ½ÉäÉ½±±‰…¬É•Ñ…¥¹•¸))½¥¸½±¥¹­•½Á•É…Ñ¥½¹Ì…¹É…Ü½…Íå¹Œ=	(½1½9=4•áÁ½ÉÑÌÉ•™ÕÍ”µ•Ñ…±¹•ÍÌµ‰•…É¥¹œ)½‰©•ÑÌ°•Ù•¸…±½¹Í¥‘”…•ÁÑ•½±½ÕÈ½É½Õ¡¹•ÍÌ°Í¼Á•¹‘¥¹œ¡…¹¹•±Ì…¹¹½ÐÙ…¹¥Í ¸)9¼¥µÁ½ÉÑ•µ•Ñ…±¹•ÍÌ•áÁ½ÉÐ‰•¡…Ù¥½È¡…¹•ì¹…Ñ¥Ù”Á…¥¹Ð•áÁ½ÉÐ…‘…ÁÑ…Ñ¥½¸¹•áÐ¸()M¥à¹•Ü¥¹Ñ•É…Ñ¥½¹Ì½Ù•È½‘•Œ½Ý¹•ÉÍ¡¥À½¡…¹¹•°Í•Á…É…Ñ¥½¸°…±°Í¥à±•…ä™½Éµ…ÑÌ¼)•á…ÐÉ•µ½Ù…°½‘•‘ÕÀ°Í¡•µ…Ì½É•™Ì½ÅÕ½Ñ…Ì½½Ý¹•ÈÕ…É‘Ì°…ÑÕ…°¡¥ÍÑ½Éä­Í¥¹±”½5Õ±Ñ¤)ÕÁ±¥…Ñ”°…ÑÕ…°¥±”M…Ù”½=Á•¸½½ÉÉÕÁÐ½É•¹‘•ÈÉ½±±‰…¬°…±°ÝÉ¥Ñ•È½)½¥¸É•™ÕÍ…±Ì¸)á¥ÍÑ¥¹œäÄßŠLäÈÀÍ…±…È½Á…¥¹Ð½ÁÉ•Ù¥•Ü¹•…É‰äÈÍAML¸½µÁ±•Ñ”É•Ù¥•Ý•É•Í½ÕÉ”½½‘•Œ¼)µ•Ñ…‘…Ñ„½•áÁ½ÉÐ½Á…É•¹Ð½1…ˆÉ…Á äÈÄìU$½É•¹‘•È½‰ÉÕÍ …±½É¥Ñ¡µÌÕ¹¡…¹•¸5Õ±Ñ¤Ä¸À°)™É½é•¸‰•Ñ…Ì…¹µ½‘•±±¥¹œ­•É¹•±ÌÕ¹Ñ½Õ¡•¸I•…‘½Ì½µ•Ñ…±¹•ÍÌµÉ•Í½ÕÉ”´äÈÄ¹µ¸)Õ±°É•É•ÍÍ¥½¸½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”‰•±½Ü¸9¼¹•Üµ•Ñ…±¹•ÍÌ‘•Ù¥”™•…ÑÕÉ”å•Ð¸()9¼¹•Ü¡…¹‘Ìµ½¸Ñ•ÍÐ¹••‘•™½ÈäÈÄìÕÍ•ÈäÈÁAML¥ÌÁÉ½Ñ•Ñ•¸9•Ü™½Õ¹‘…Ñ¥½¸™¥áÑÕÉ•Ì)…É”…ÕÑ½µ…Ñ•°¹•Ù•È„Íå¹Ñ¡•Ñ¥Œ¥A…Ñ…Í¬¸9•áÐ¹…ÉÉ½Ü‰Õ¥±è…ÁÑÕÉ•µ•Ñ…±¹•ÍÌ)Ñ¡É½Õ •á¥ÍÑ¥¹œÍ…±…ÈA9½9=4½1µ…Ñ•É¥…°½Ý¹•ÉÌ°¥¹±Õ‘¥¹œ½µ‰¥¹•½±½ÕÈ¬)É½Õ¡¹•ÍÌ­µ•Ñ…±¹•ÍÌ¥‘•¹Ñ¥Ñ¥•Ì½…Íå¹Œ…ÁÑÕÉ”…¹‘…Ñ„Í•µ…¹Ñ¥Ì¸Q¡•¸Ù¥Í¥‰±”A•¹¥°)¡…¹¹•°…¹±¥ÐÁÉ•Ù¥•ÜÑ¡É½Õ •á¥ÍÑ¥¹œ½µÁ…ÐA…¥¹Ð½µ…Ñ•É¥…°½Ý¹•ÉÌ¸((´mátäÈÀY%1¥Ð½¡…¹¹•°…ÁÁ•…É…¹”…¹½¹”½M…Ù•=Á•¸½Í•±•Ñ¥½¸èÕÍ•ÉAMLÁÉ½Ñ•Ñ•¸(´mátäÈÄÍ¥à…ÕÑ½µ…Ñ•¥¹Ñ•É…Ñ¥½¹ÌèÍ…±…È‰åÑ•Ì½±•…äÇŠLØ½ØÜÍ¡•µ…Ì½ÅÕ½Ñ…Ì°(€½É¥¥¹…°¡¥ÍÑ½Éä½ÕÁ±¥…Ñ”½¥±”½É½±±‰…¬…¹…±°Õ¹ÍÕÁÁ½ÉÑ•ÝÉ¥Ñ•È½)½¥¸É•™ÕÍ…±Ì¸(´9¼¹•ÜäÈÄ¡…¹‘Ìµ½¸…Ñ”½Èµ•Ñ…±¹•ÍÌ½¹ÑÉ½±ÌìäÈÀ…ÁÁ•…É…¹”…•ÁÑ…¹”ÁÉ½Ñ•Ñ•¸((¸äÈÄ™¥¹…°±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨È°ØÄÈAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)M¥à¹•Ü¥¹Ñ•É…Ñ¥½¹Ì€¬•á¥ÍÑ¥¹œäÄßŠLäÈÀ¹•…É‰äÈÍAMLìÉ•±•…Í”½¹ÑÉ…ÐÕAML¸)±°½Ñ¡•È¡…¹•)LÁ…É•¹ÑÌÙ•É¥™¥•Á¥¸µ½¹±äìÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸½µ½‘•±±¥¹œ)…¹•á¥ÍÑ¥¹œÁ…¥¹Ð½ÁÉ•Ù¥•Ü½•áÁ½ÉÐ…±½É¥Ñ¡µÌÉ•Ñ…¥¹•¸9¼‰•¡…Ù¥½È¡•­ÌÉ•±…á•¸)9¼¹•Ü¡…¹‘Ìµ½¸…Ñ”ìÕÍ•ÈäÈÁAMLÁÉ½Ñ•Ñ•¸AÕ‰±¥…Ñ¥½¸Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌ¸(((ŒŒ€¸äÈÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€Ää=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÈÅ•„ØÉ•‰‘‘•˜É„ÐÀÑˆÄÑ”ÀÈå™‘ˆÀÜÐÑ„Å‰ÀàØÉ™€°Ñ•ÍÑ•ÑÉ•”)˜ÁÝ„Í˜äÉ…‰…ˆÔÈÀàÀÙ„Ñ•ÔàÜÑ˜äå˜ÍˆÝˆÈÕ˜É€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ð…Ñ„)É•…Ñ•…¸¥‘•¹Ñ¥…°Ñ•ÍÑ•±½…°ÑÉ•”ì™•Ñ¡•½É¥¥¸½µ…¥¸µ…Ñ¡••á…Ñ±ä¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•É•É•ÍÍ¥½¸€ÌäÈÐàÀÜÐäÄÕ€€¼©½ˆ€ÄÄàÀÐÐÜäÄäàÕ€‰½Ñ Á…ÍÌ(È°ØÄÈÑ•ÍÑÌÝ¥Ñ é•É¼™…¥±ÕÉ•Ì½Í­¥ÁÌì¡½ÍÑ•™Õ±°±½ÌÙ•É¥™¥•¸A…•ÌÉÕ¸)€ÌäÈÐàÀÜÐàÄÍ€°‘•Á±½ä©½ˆ€ÄÄàÀÐÔÀÔÈÈØÑ€°½µÁ±•Ñ•…±°ÍÑ•ÁÌÍÕ•ÍÍ™Õ±±ä¸)±°ÌÀ¡•­•±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”èÍ¡•±°½Ù•ÉÍ¥½¸°•Ù•Éä¡…¹•)ÉÕ¹Ñ¥µ”½Á…É•¹Ð½1…ˆ™¥±”°™½ÕÈ¹•ÜÍ…±…Èµ½‘Õ±•Ì°É•½Ù•Éä°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹)É•Ñ…¥¹•½±½ÕÈÁ½½°¸%¹¥Ñ¥…°¥¸µ™±¥¡ÐÉ•…‘ÌÍ•ÉÙ•äÈÀ½¹•Üµ½‘Õ±•ÌÐÀÐì™¥¹…°Ý¡½±”)¡•­•É…Á µ…Ñ¡•ÌäÈÄ¸9¼ÁÉ½Ñ•Ñ•½™É½é•¸½µ½‘•±±¥¹œ½‰ÉÕÍ ½ÁÉ•Ù¥•Ü…±½É¥Ñ¡´¡…¹•Ì¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÑ¡¥ÌÁÉ½½˜¡…¹•Ì‘½Ì½¹±ä¸UÍ•ÈäÈÁAMLÁÉ½Ñ•ÑÌ)•á¥ÍÑ¥¹œ±¥ÐÉ½Õ¡¹•ÍÌ½¡…¹¹•°½½¹”½M…Ù•=Á•¸½Í•±•Ñ¥½¸½½±½ÕÈ…ÁÁ•…É…¹”¸	Õ¥±äÈÄ¥Ì)½µÁ±•Ñ”ì¹¼¹•Ü¡…¹‘Ìµ½¸Ñ•ÍÐ¹••‘•‰•…ÕÍ”µ•Ñ…±¹•ÍÌ½¹ÑÉ½±Ì½ÁÉ•Ù¥•Ü½•áÁ½ÉÐ…É”)¹½Ð•áÁ½Í•å•Ð¸¥áÑÕÉ”ÑÉ…¹ÍÁ½ÉÐ½¡¥ÍÑ½Éä½…Ñ½µ¥Œ=Á•¸…¹É•™ÕÍ…°¡•­Ì…É”…ÕÑ½µ…Ñ•¸)9•áÐ¹…ÉÉ½Ü‰Õ¥±è…ÁÑÕÉ•µ•Ñ…±¹•ÍÌÑ¡É½Õ ½É¥¥¹…°Í…±…ÈA9½9=4½1ÝÉ¥Ñ•ÉÌ°)Ñ¡•¸½É¥¥¹…°A…¥¹Ð¡…¹¹•°½µ…Ñ•É¥…°ÁÉ•Ù¥•Ü¸9¼µ•Ñ…±¹•ÍÌÙ¥ÍÕ…°…•ÁÑ…¹”±…¥µ•¸(((ŒŒ€¸äÈÈƒŠPµ•Ñ…±¹•ÍÌ•áÁ½ÉÐÑ¡É½Õ ½É¥¥¹…°9=4½1½Ý¹•ÉÌƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()½¹Ñ¥¹Õ”…ÕÑ¡½É¥é•äÈÄ™½Õ¹‘…Ñ¥½¸ì¹¼¹•Ü‘•Ù¥”AML¥¹™•ÉÉ•¸UÍ•ÈäÈÁAMLÉ•µ…¥¹Ì)ÁÉ½Ñ•Ñ•™½ÈÁ…¥¹Ð½±¥ÐÉ½Õ¡¹•ÍÌ½¡…¹¹•°½¡¥ÍÑ½Éä½M…Ù•=Á•¸½Í•±•Ñ¥½¸½½±½ÕÈµ½¹±ä±½½¬¸)Õ‘¥Ðµ…¥¸ÉŒÐÌàÌÐàè•á¥ÍÑ¥¹œ¹…Ñ¥Ù”µ•Ñ…±¹•ÍÌÍ±½Ð°Í…±…ÈA9°Á…¥¹Ð…ÁÑÕÉ”…¹1)µ…Ñ•É¥…°Á…Ñ ½Ý¸É•ÅÕ¥É•ÑÉ…¹ÍÁ½ÉÐ¸áÑ•¹Ñ¡•Í”½Ý¹•ÉÌì¹¼¹•ÜÝÉ¥Ñ•È°Í¡•µ„°)µ•Ñ…‘…Ñ„ÁÉ½Ù•¹…¹”°¡¥ÍÑ½Éä°µ½‘•±±¥¹œ½Á…¥¹Ð­•É¹•°½ÈU$½¹ÑÉ½±Ì¸()…ÁÑÕÉ”½Ý¹•µ•Ñ…±¹•ÍÌ…±½¹Í¥‘”½±½ÕÈ½É½Õ¡¹•ÍÌ½•½µ•ÑÉä½¹…Ñ¥Ù”UYÌ	=I…Ý…¥Ðì)½É¥¥¹…°	…Í”Ñ…É•Ð‘¥•ÍÐÙ…±¥‘…Ñ•Ì…±°¡…¹¹•±Ì¸9…Ñ¥Ù”µ•Ñ…±¹•ÍÌÕÍ•Ì½É¥¥¹…°)±½ÍÍ±•ÍÌÉ…åÍ…±•A9€¬µ•Ñ…±¹•ÍÌÍ±½Ð½™…Ñ½ÈÄìÉ½Õ¡¹•ÍÌ™…Ñ½ÈÄ½‘•™…Õ±ÐÄÉ•Ñ…¥¹•¸)=É¥¥¹…°¹…µ•Ì½½¹Ñ•¹Ð‘•‘ÕÀ½Á½±å½¸UXÁ½½°½½¹Ñ…¥¹•È¼ÈÑ5¥…É•…Ñ”‰Õ‘•ÐÉ•µ…¥¸¸)1ÕÍ•ÌÁ…­•I‘…Ñ„A9õÉ½Õ¡¹•ÍÌ¡½ÈÈÔÔ¤°õµ•Ñ…±¹•ÍÌ°HôÈÔÔ°™…Ñ½ÉÌÄì½¹±ä)É½Õ¡¹•ÍÌÉ•Ñ…¥¹Ì…•ÁÑ•É…åÍ…±”A9½µ•Ñ…±±¥…Ñ½ÈÀ¸M…µ”A9I½™¥±Ñ•È½I½é±¥ˆ)Á…­…•È•ÑÌ•áÁ±¥¥Ð¹¼µ½±½ÕÈµµ•Ñ…‘…Ñ„Á…Ñ °¹½Ð„…¹Ù…Ì½…µµ„½É•Í…µÁ±”•¹½‘•È¸)A…­•Á…¥È…¡”Á±ÕÌ½É¥¥¹…°½±½ÕÈ¥µ…”…¡”…¹™Õ±°µ…Ñ•É¥…°­•ä‘¥ÍÑ¥¹Õ¥Í )…±°½±½ÕÈ½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌ½µ‰¥¹…Ñ¥½¹ÌìÍ¡…É••á…ÐÉ•Í½ÕÉ”Á…¥ÉÌÉ•ÕÍ”¥µ…•Ì¸)‰Í•¹Ð½±½ÕÈÉ•µ…¥¹ÌÝ¡¥Ñ”¸%¹‘•Á•¹‘•¹Ð¹½¸µÍÅÕ…É”µ…ÁÌÉ•µ…¥¸•á…Ð¥¸9=4ì1)É•ÅÕ¥É•Ìµ…Ñ¡¥¹œÉ½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌ‘¥µ•¹Í¥½¹Ì…¹É•™ÕÍ•ÌÉ…Ñ¡•ÈÑ¡…¸É•Í¥é¥¹œ¸)9•Ü‘…Ñ„É½ÝÌÉ•µ…¥¸UXµØÀµ™¥ÉÍÐ°¹¼™…Ñ½È‰…­¥¹œ½ÈÍIµ•Ñ…‘…Ñ„½¸Í…±…È‘…Ñ„¸()=É¥¥¹…°¥±”…Ñ¥½¹ÌÉ•Á½ÉÐµ•Ñ…±¹•ÍÌ½Õ¹ÑÌ¸I…Ü=	(½Õ¹ÁÉ•Á…É•Íå¹Œ¹…Ñ¥Ù”½)½¥¸)ÍÑ¥±°É•™ÕÍ”µ•Ñ…±¹•ÍÌì¥¹Ù…±¥‘•ÍÉ¥ÁÑ½È½ÍÑ…±”‰¥¹‘¥¹œ½•Ù…±Õ…Ñ•½¥µÁ½ÉÑ•½±¥¹­•)½Ý¹•ÉÌÉ•™ÕÍ”¸Íå¹Œ‘½Ý¹±½……ÁÑÕÉ•Ì¹•Ù•È…ÍÍ¥¸µ…ÁÌÑ¼Í½ÕÉ”Í•¹”½È¹…Ñ¥Ù”)UXµ•Ñ…‘…Ñ„¸I•Í½ÕÉ”½ÁÉ½©•ÑØÜ½¡¥ÍÑ½Éä½‰ÉÕÍ ½U$½±¥ÐÁÉ•Ù¥•Ü…±½É¥Ñ¡µÌÕ¹¡…¹•¸)½µÁ±•Ñ”¡…¹•A9½•áÁ½ÉÐ½Á…É•¹Ð½1…ˆÉ…Á äÈÈ½¹±äì5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸)=±äÈÄ…Íå¹Œ‰±…¹­•ÐµÉ•™ÕÍ…°…ÍÍ•ÉÑ¥½¹Ì¹½Ü¡•¬ÍÑ…±”‰¥¹‘¥¹œìÉ…ÜÕ…É‘ÌÉ•Ñ…¥¹•¸()¥¡Ð¹•Ü¥¹Ñ•É…Ñ¥½¸Ñ•ÍÑÌ½Ù•È…ÑÕ…°9=4½1•áÁ½ÉÐ­±½…‘•È…¹¥±”…Ñ¥½¹Ì°)¥¹‘•Á•¹‘•¹ÐA9I½é±¥ˆ½¡…¹¹•°‰åÑ•Ì°½µ‰¥¹…Ñ¥½¹Ì½‘•‘ÕÀ°µ•Ñ…°µ½¹±ä‘•™…Õ±ÑÌ°)Õ¹•ÅÕ…°µÍ¥é”É•™ÕÍ…°½9=4É•Ñ•¹Ñ¥½¸°…Íå¹ŒÍ¹…ÁÍ¡½ÑÌ°¥¹Ù…±¥½Ý¹•ÉÌ°½É¥¥¹…°¹…Ñ¥Ù”(ÈÑ5¥ÁÉ•™±¥¡Ð9™¥¹…°ÝÉ¥Ñ•È…À°A9‘…Ñ„µÙÌµ½±½ÕÈµ•Ñ…‘…Ñ„½½Ý¹•ÉÍ¡¥À¸)9…Ñ¥Ù”ÝÉ¥Ñ•È‰Õ‘•ÐÑ•ÍÐ¥µÁ½ÉÑÌ¥ÑÌQU0Ù•ÉÍ¥½¹•Á…¥¹Ðµ•áÁ½ÉÐ‘•Á•¹‘•¹äè)ÁÉ•Á…É•]•…­5…ÁÌ…É”µ½‘Õ±”µ±½…°°Í¼…¸Õ¹Ù•ÉÍ¥½¹•9½‘”¡•±Á•È…¹¹½ÐÁÉ•Á…É”)…¹½Ñ¡•ÈÙ•ÉÍ¥½¹•µ½‘Õ±”ÌÝÉ¥Ñ•È¸¥ÉÍÐ™¥áÑÕÉ”…ÑÑ•µÁÐ¡¥ÐÑ¡”¥¹Ñ•¹‘•É…ÜÕ…Éì)½ÉÉ•Ñ•Ñ•ÍÐÝ¥É¥¹œ°¹½ÐÑ¡”ÉÕ¹Ñ¥µ”Õ…É¸I•…‘½Ì½µ•Ñ…±¹•ÍÌµ•áÁ½ÉÐ´äÈÈ¹µ¸)Õ±°É•É•ÍÍ¥½¸½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”‰•±½Üì¹¼É•¹‘•É•È½9½µ……ÁÁ•…É…¹”…•ÁÑ…¹”)¥¹™•ÉÉ•™É½´9½‘”…‘…ÁÑ•ÉÌ¸9¼¹•Ü¡…¹‘Ìµ½¸Ñ•ÍÐ¹••‘•èµ•Ñ…±¹•ÍÌ¡…Ì¹¼½¹ÑÉ½±Ì)å•Ð¸9•áÐ½É¥¥¹…°A•¹¥°Í…±…È¡…¹¹•°€¬µ…Ñ•É¥…°ÁÉ•Ù¥•Ü¥¹Ñ•É…Ñ¥½¸¥¸¹…ÉÉ½Ü)ÍÑ…•Ì°ÁÉ•Í•ÉÙ¥¹œ•á¥ÍÑ¥¹œ½±½ÕÈ½É½Õ¡¹•ÍÌ…¹¥¹‘•Á•¹‘•¹ÐÉ•Í½ÕÉ”Í•µ…¹Ñ¥Ì¸((´mátäÈÈ•¥¡Ð¥¹Ñ•É…Ñ¥½¹Ìè•á…Ð¹…Ñ¥Ù”½1½°…±°µ¡…¹¹•°µ…Ñ•É¥…±Ì½‘•‘ÕÀ°(€µ•Ñ…°µ½¹±ä‘•™…Õ±ÑÌ°Õ¹•ÅÕ…°‘¥µÌ°…Íå¹Œ…ÁÑÕÉ”°¥¹Ù…±¥½Ý¹•ÉÌ°¥±”‘½Ý¹±½…‘Ì°(€¹¼ÍI½¸‘…Ñ„A9Ì…¹½É¥¥¹…°¹…Ñ¥Ù”ÈÑ5¥…ÁÌ¸(´mátäÈÄÉ…Ü=	(½Õ¹ÁÉ•Á…É•¹…Ñ¥Ù”½)½¥¸Õ…É‘ÌÉ•Ñ…¥¹•ì…Íå¹ŒÍÑ…±”µ‰¥¹‘¥¹œÑ•ÍÑÌÕÁ‘…Ñ•™½ÈäÈÈ…Á…‰¥±¥Ñä¸(´9¼¹•ÜäÈÈ‘•Ù¥”Ñ…Í¬èµ•Ñ…±¹•ÍÌ½¹ÑÉ½±ÌÁ•¹‘¥¹œìÕÍ•ÈäÈÁAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•¸((¸äÈÈ™¥¹…°±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨È°ØÈÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)¥¡Ð¹•Ü¥¹Ñ•É…Ñ¥½¹Ì…¹…±°•á¥ÍÑ¥¹œÁ…¥¹Ð½ÁÉ•Ù¥•Ü½µ½‘•±±¥¹œ½¥µÁ½ÉÐ½•áÁ½ÉÐ¡•­Ì)Á…ÍÌìÉ•Ù¥•Ý•É•±•…Í”½¹ÑÉ…ÐÕAML¸A9‘…Ñ„µ•Ñ…‘…Ñ„Á…Ñ ÁÉ•Í•ÉÙ•Ì½±½±½ÕÈ¼)Í…±…ÈÍ•µ…¹Ñ¥ÌìÍ½ÕÉ”É•Í½ÕÉ”½ÁÉ½©•Ð½¡¥ÍÑ½Éä½U$…±½É¥Ñ¡µÌ…¹5Õ±Ñ¤½™É½é•¸)Õ¹¡…¹•¸9¼…ÍÍ•ÉÑ¥½¹Ì•á±Õ‘•ì½±…Íå¹ŒÉ•™ÕÍ…°ÕÁÉ…‘•Ñ¼‰¥¹‘¥¹œ½¹ÑÉ…Ð¸)9¼¹•Ü¡…¹‘Ìµ½¸…Ñ”ìÁÕ‰±¥Í¡¥¹œÙ•É¥™¥…Ñ¥½¸™½±±½ÝÌ¸(((ŒŒ€¸äÈÈÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ””ÔÔÁ…”ÔÌåÍ„ÔäÜàå‘”äÕŒÙˆåÄáˆàÀÁ˜Ñ„Ý•ˆÈÝ€°Ñ•ÍÑ•ÑÉ•”)€ÈààØÁÕ‘”äÈÔÉ˜ØÁÌÅ„ÄÄØÌØÀàÈÄÄÍ˜ØÜá‰ŒäÕ€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ð…Ñ„)É•…Ñ•…¸¥‘•¹Ñ¥…°Ñ•ÍÑ•±½…°ÑÉ•”ì™•Ñ¡•½É¥¥¸½µ…¥¸µ…Ñ¡••á…Ñ±ä¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•É•É•ÍÍ¥½¸€ÌäÌÌÔäÜäÜÐÑ€€¼©½ˆ€ÄÄàÌÐÔÐØÄØÀÉ€‰½Ñ Á…ÍÌ(È°ØÈÀÑ•ÍÑÌ°é•É¼™…¥±ÕÉ•Ì½Í­¥ÁÌì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•½Õ¹ÑÌ¸A…•Ì)€ÌäÌÌÔäÜàÐÄÅ€°‘•Á±½ä©½ˆ€ÄÄàÌÐÔØÜÄÐÐÙ€°½µÁ±•Ñ•…±°ÍÑ•ÁÌÍÕ•ÍÍ™Õ±±ä¸)±°Äà¡•­•™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Í½ÕÉ”èÍ¡•±°½Ù•ÉÍ¥½¸°…±°™¥Ù”¡…¹•)•áÁ½ÉÐ½A9ÉÕ¹Ñ¥µ”½Ý¹•ÉÌ…¹1…ˆÁ…É•¹ÑÌ°É•½Ù•Éä°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹É•Ñ…¥¹•)Í…±…ÈÉ•Í½ÕÉ•Ì½ÁÉ½©•Ð½‘•Œ½Á…¥¹Ñ•ÈU$½½É”½Á…¥¹ÐÑ…É•Ð¸%¹¥Ñ¥…°¥¸µ™±¥¡ÐÉ•…‘Ì)Í•ÉÙ•äÈÄì™¥¹…°½µÁ±•Ñ”¡•­•É…Á µ…Ñ¡•ÌäÈÈ¸9¼™É½é•¸½µ½‘•±±¥¹œ½‰ÉÕÍ ¼)ÁÉ½©•Ð½¡¥ÍÑ½Éä½ÁÉ•Ù¥•Ü…±½É¥Ñ¡µÌ¡…¹•ìÍ…µ”¹…Ñ¥Ù”¥µ…”‰Õ‘•Ð…¹É…ÜÕ…É‘Ì¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÑ¡¥ÌÁÉ½½˜¥Ì‘½Ìµ½¹±ä¸	Õ¥±äÈÈ½µÁ±•Ñ”…¹)ÁÕ‰±¥Í¡•¸9¼¹•Ü¡…¹‘Ìµ½¸Ñ•ÍÐ¹••‘•è•‘¥Ñ…‰±”µ•Ñ…±¹•ÍÌ½¹ÑÉ½±Ì½ÁÉ•Ù¥•ÜÉ•µ…¥¸)¹•áÐì•áÁ½ÉÐ™¥áÑÕÉ•Ì…¹…ÑÕ…°¥±”…Ñ¥½¹Ì…É”…ÕÑ½µ…Ñ•°¹¼É•¹‘•É•½¹…Ñ¥Ù”)…ÁÁ•…É…¹”…•ÁÑ…¹”¥¹™•ÉÉ•¸UÍ•ÈäÈÁAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•ì¹¼äÈÄ¼äÈÈ‘•Ù¥•AML)¥¹Ù•¹Ñ•¸9•áÐ½É¥¥¹…°Í…±…ÈA•¹¥°¡…¹¹•°°Ñ¡•¸•á¥ÍÑ¥¹œµ…Ñ•É¥…°ÁÉ•Ù¥•Ü½Ý¹•È¸((ŒŒ€¸äÈÌƒŠP5•Ñ…±¹•ÍÌA•¹¥°¡…¹¹•°…¹•á¥ÍÑ¥¹œ±¥Ðµ…Ñ•É¥…°ÁÉ•Ù¥•ÜƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()Õ‘¥Ðµ…¥¸˜ÉŒá„Ìà€¼€¸äÈÈèÍ…±…ÈÉ•Í½ÕÉ•Ì°½‘•Œ½¡¥ÍÑ½Éä½‘ÕÁ±¥…Ñ”…¹¹…Ñ¥Ù”½1)ÝÉ¥Ñ•ÉÌ…±É•…‘ä•á¥ÍÐì•áÁ½Í”Ñ¡•´Ñ¡É½Õ ½É¥¥¹…°½µÁ…Ð1PA…¥¹Ð…¹ÍÕÉ™…”)½Ý¹•ÉÌ¸M¡…É•Í…±…È½¹™¥ÕÉ…Ñ¥½¸É•ÕÍ•Ì…•ÁÑ•É…ÍÑ•È°ÅÕ½Ñ„½¡•­Á½¥¹Ð…¹)…¹•±±…Ñ¥½¸Á…Ñ¡Ì¸5•Ñ…±¹•ÍÌÍÑ…ÉÑÌ‰±…¬À°‰ÉÕÍ ‘•™…Õ±ÑÌÈÔÔì½Á…ÅÕ”É…Ü•ÅÕ…°µI)Ý½É­¥¹œ‰åÑ•ÌÁÕ‰±¥Í ¥¹‘•Á•¹‘•¹Ð±¥¹•…ÈHà½¹±ä¸½±½ÕÈ½µ…Í­Ì½¥µ…•ÌÍÑ…ä‘¥Í…‰±•)Ý¡¥±”•‘¥Ñ¥¹œ•¥Ñ¡•ÈÍ…±…ÈìÉ•ÑÕÉ¹¥¹œ½±½ÕÈÉ•ÍÑ½É•Ì•á¥ÍÑ¥¹œ½¹ÑÉ½±Ì½±…å•ÉÌ¸)9½¸ÔÄÈÉ•Ñ…¥¹•µ…ÁÌÉ•™ÕÍ”Á…¥¹Ñ¥¹œÉ…Ñ¡•ÈÑ¡…¸É•Í…µÁ±¥¹œ¸±°¥‘•¹Ñ¥Ñä½‰¥¹‘¥¹œ°)‰½‘ä±¥™•Ñ¥µ”°‰Õ‘•Ð…¹¡•­Á½¥¹ÐÉ•™ÕÍ…°ÉÕ±•ÌÉ•Ñ…¥¹•¸()á¥ÍÑ¥¹œÍÕÉ™…”½Ý¹ÌÍ•Á…É…Ñ”±¥¹•…ÈÉ½Õ¡¹•ÍÌ…¹µ•Ñ…±¹•ÍÌÑ•áÑÕÉ•Ììµ•Ñ…°)™…Ñ½ÈÄÝ¥Ñ „µ…À°‘•™…Õ±ÐÀ½Ñ¡•ÉÝ¥Í”¸á¥ÍÑ¥¹œ±¥¡Ñ¥¹œ½UYÌ½½±½ÕÈÍIÉ•µ…¥¸¸)1¥Ù”‘¥ÉÑäÕÁ±½…‘Ì½…±•Í”ìÍÝ¥Ñ¡¥¹œ¡…¹¹•°½1¥Ð½ÈÍ…±…ÉÌ…¹•±Ì½¹Ñ…ÐÝ¥Ñ¡½ÕÐ)¡¥ÍÑ½Éä¸½µµ¥ÑÑ•…Ñ¥Ù”½¥¹…Ñ¥Ù”½±½­•½Ù•É±…åÌÕÍ”Í…µ”½Ý¹•Èì‘¥ÍÁ½Í…°™É••Ìµ…ÁÌ¸)9¼¹•Ü‰ÉÕÍ ½­•É¹•°½ÝÉ¥Ñ•È½¡¥ÍÑ½Éä½Ý¹•È°±¥¡ÑÌ°•¹Ù¥É½¹µ•¹Ð°½Èµ½‘•±±¥¹œ¡…¹•Ì¸)I•Ù•ÉÍ”±½…‘•È½…¡”É…Á É•Ù¥•Ý•…¹Á¥¹¹•äÈÌìÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸¥¹Ñ…Ð¸(ÄÌ¹•Ü¥¹Ñ•É…Ñ¥½¹Ì½Ù•ÈU$½É…ÜÀ¼ÈÔÔ½½Á…¥Ñä½¹¼µ½À°…¹•±±…Ñ¥½¸°ÅÕ½Ñ„½¡•­Á½¥¹Ð°)¥‘•¹Ñ¥Ñä½ÍÑ…±”½¹½¸ÔÄÈ°¡¥ÍÑ½Éä½M…Ù•=Á•¸½Í¥¹±”­5Õ±Ñ¤ÕÁ±¥…Ñ”°…ÑÕ…°9=4½1‰åÑ•Ì°)±¥¹•…Èµ…Ñ•É¥…°°µ…À¥¹‘•Á•¹‘•¹”½±¥™•Ñ¥µ”…¹…Ñ¥Ù”½¥¹…Ñ¥Ù”É•¹‘•È½Ý¹•ÉÍ¡¥À¸)á¥ÍÑ¥¹œÉ½Õ¡¹•ÍÌ½µ…Í¬¹•…É‰äÄåAML¸I•…‘½Ì½µ•Ñ…±¹•ÍÌµÁ…¥¹Ð´äÈÌ¹µ¸()UÍ•ÈäÈÁAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•ì€½¹•áÑ‰Õ¥±…±½¹”¥Ì¹½ÐäÈÄ¼äÈÈ¼äÈÌ‘•Ù¥”…•ÁÑ…¹”¸)Y%äÈÌè5•Ñ…±¹•ÍÌÀ¼ÈÔÔ¡…¹¹•°½1¥Ð°±½ÜI½Õ¡¹•ÍÌ¡¥¡±¥¡ÑÌ°¥¹‘•Á•¹‘•¹Ð¡…¹¹•±Ì°)½¹”½M…Ù•=Á•¸°U¹‘½I•‘¼…¹‘ÕÁ±¥…Ñ”¥Í½±…Ñ¥½¸ì¹…Ñ¥Ù”9½µ…µ…Ñ•É¥…°Í…¹¥Ñä¡•¬¸)9•áÐèÉ•ÍÁ½¹¹…ÉÉ½Ý±äÑ¼äÈÌ‘•Ù¥”™••‘‰…¬‰•™½É”…‘‘¥¹œµ½É”µ…Ñ•É¥…°¡…¹¹•±Ì¸((¸äÈÌ±½…°Ù…±¥‘…Ñ¥½¸è9½‘”ÈÐ¸Ää¸À™Õ±°€¨¨È°ØÌÌAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì(ÄÌ¹•Ü¥¹Ñ•É…Ñ¥½¹Ì°¹•…É‰äÉ½Õ¡¹•ÍÌ½µ…Í¬ÄåAML…¹É•±•…Í”½¹ÑÉ…ÐÕAML¸)9¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•ìÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸½µ½‘•±±¥¹œÕ¹¡…¹•¸)AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•É•É•ÍÍ¥½¸½±¥Ù”µ‰åÑ”Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌ¸•Ù¥”äÈÌÁ•¹‘¥¹œ¸((ŒŒ€¸äÈÌÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ””ÔÀÕ˜ÈÌÈàÔÙ„ÝØÔàÄÌØá‘”Ý˜Ý˜Èå”ÐÕŒÔÄÑ‘…€°Ñ•ÍÑ•ÑÉ•”)€ÌÐÉŒÑ„ÄÈàÉ„äá…ˆäÕ…‰™”ØÕ„ØÙ‰‘ŒÌÄÅ…ŒÜÔÝ€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ð…Ñ„)É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°Ñ•ÍÑ•±½…°ÑÉ•”ì™•Ñ¡•½É¥¥¸½µ…¥¸µ…Ñ¡••á…Ñ±ä¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•É•É•ÍÍ¥½¸€ÌäÌÌÜÄàØØÔå€€¼©½ˆ€ÄÄàÌÐäÐäÀÈàÙ€‰½Ñ Á…ÍÌ(È°ØÌÌÑ•ÍÑÌ°é•É¼™…¥±ÕÉ•Ì½Í­¥ÁÌì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•ÌÉÕ¸)€ÌäÌÌÜÄàØÀÜÑ€°‘•Á±½ä©½ˆ€ÄÄàÌÐäØäàÐÔÅ€°½µÁ±•Ñ•…±°ÍÑ•ÁÌÍÕ•ÍÍ™Õ±±ä¸)±°Ää™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Í½ÕÉ”èÍ¡•±°½Ù•ÉÍ¥½¸°•Ù•Éä¡…¹•ÉÕ¹Ñ¥µ”¼)•áÁ½ÉÐ½Á…É•¹Ð½1…ˆ™¥±”°É•½Ù•Éä°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°É•Ñ…¥¹•Í…±…ÈÉ•Í½ÕÉ•Ì¼)µ•Ñ…±¹•ÍÌÁ½½°…¹ÁÉ½©•Ð½‘•Œ¸%¹¥Ñ¥…°¥¸µ™±¥¡ÐÉ•…‘ÌÍ•ÉÙ•äÈÈì™¥¹…°½µÁ±•Ñ”)¡•­•É…Á µ…Ñ¡•ÌäÈÌ¸9¼™É½é•¸½µ½‘•±±¥¹œ½±¥¡Ñ¥¹œ½UX½ÈÝÉ¥Ñ•È…±½É¥Ñ¡´¡…¹•Ì¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÑ¡¥ÌÁÉ½½˜¥Ì‘½Ìµ½¹±ä¸	Õ¥±äÈÌ½µÁ±•Ñ”…¹)É•…‘ä™½È¡…¹‘Ìµ½¸5•Ñ…±¹•ÍÌÀ¼ÈÔÔ¡…¹¹•°½1¥Ð°±½ÜI½Õ¡¹•ÍÌ¡¥¡±¥¡ÑÌ…¹¥¹‘•Á•¹‘•¹Ð)¡…¹¹•±Ì°½¹”½M…Ù•=Á•¸°U¹‘½I•‘¼…¹‘ÕÁ±¥…Ñ”¥Í½±…Ñ¥½¸¸=ÁÑ¥½¹…°¹…Ñ¥Ù”9½µ…)…ÁÁ•…É…¹”Í…¹¥Ñä¡•¬¸ÑÕ…°AT¡¥¡±¥¡ÑÌ½A•¹¥°±…Ñ•¹ä…¹äÈÌ‘•Ù¥”…•ÁÑ…¹”)É•µ…¥¸Á•¹‘¥¹œìÕÍ•ÈäÈÁAMLÁÉ½Ñ•Ñ•°¹¼äÈÄ¼äÈÈ¼äÈÌ‘•Ù¥•AML¥¹™•ÉÉ•¸)9•áÐèÉ•ÍÁ½¹¹…ÉÉ½Ý±äÑ¼äÈÌ‘•Ù¥”™••‘‰…¬‰•™½É”…¹½Ñ¡•Èµ…Ñ•É¥…°¡…¹¹•°¸((ŒŒ€¸äÈÐƒŠPUXÝ½É­ÍÁ…”±…å•ÉÌ½¹Ñ…¥¹•‰•¹•…Ñ µ…¥¸Ñ½½±‰…ÈƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌ¥¹Ñ•Éµ¥ÑÑ•¹Ðµ¥ÍÍ¥¹œQ=@µI%!P5%8A@‰ÕÑÑ½¹Ì‘ÕÉ¥¹œUX‘¥Ñ½Èì)±…É¥™¥•Ñ¡•Í”…É”É…µ”½U¹‘½I•‘¼½½ÕÌ½=‰©•ÑÌ½Y%\°¹½ÐUXµ±½…°½¹ÑÉ½±Ì¸)Õ‘¥Ðµ…¥¸ÔÔÍ‰„ÀØÄè¹¼UX…Ñ¥½¸‘•±¥‰•É…Ñ•±ä¡¥‘•ÌÑ¡”Ñ½½±‰…È¸!•…‘•ÈÍÑ…­¥¹œ)½¹Ñ•áÐ¥ÌÄÀìÙ¥•ÝÁ½ÉÐ¡…¹¼ÍÑ…­¥¹œ½¹Ñ•áÐ°…±±½Ý¥¹œÝ½É­ÍÁ…”ÄàÀÑ¼½Ù•ÉÁ…¥¹Ð)¡•…‘•È‘•Í•¹‘…¹ÑÌ€¡¥¹±Õ‘¥¹œY%\‘É½Á‘½Ý¸ÈÀÀÑÉ…ÁÁ•¥¹Í¥‘”¡•…‘•ÈÄÀ¤¸)‘½¹”…Ñ¥Ù”µUXµ½¹±ä¥Í½±…Ñ¥½¸ÉÕ±”¥¸½É¥¥¹…°ÕØµÝ½É­ÍÁ…”ÍÑå±•Í¡••ÐèÙ¥•ÝÁ½ÉÐ)½¹Ñ…¥¹Ì¥ÑÌ½Ý¸±…å•ÉÌÝ¡¥±”Ù¥Í¥‰±”Ý½É­ÍÁ…”•á¥ÍÑÌ¸=É¥¥¹…°¡•…‘•ÈÉ•µ…¥¹Ì)…‰½Ù”¥Ðì±½Í¥¹œ½¡¥‘¥¹œUX…ÕÑ½µ…Ñ¥…±±äÉ•µ½Ù•Ì½¹Ñ…¥¹µ•¹Ð¸9¼èµ¥¹‘•à…ÉµÌÉ…”°)=4É•Á±…•µ•¹Ð°•Ù•¹Ð½Á½¥¹Ñ•È½¡¥ÍÑ½Éä½µ½‘•°½UX½Á…¥¹Ð…±½É¥Ñ¡´¡…¹•Ì¸I•™É•Í )UXÝ½É­ÍÁ…”€¬5•Í !•…±Ñ ±½…‘•È…¹Í¡•±°½É•½Ù•ÉääÈÐìÕ¹É•±…Ñ•Á¥¹ÌÉ•Ñ…¥¹•¸()M½ÕÉ”±…å•É¥¹œ‘•™•Ð¥‘•¹Ñ¥™¥•ì•á…Ð¥¹Ñ•Éµ¥ÑÑ•¹Ð¥A…‰ÕÑÑ½¸‘¥Í…ÁÁ•…É…¹”)¹½ÐÉ•ÁÉ½‘Õ•¸±½Õµ…¥¸]•‰0É•…Ñ¥½¸™…¥±Ì€¡Í…µ”­¹½Ý¸•¹Ù¥É½¹µ•¹Ð±¥µ¥Ñ…Ñ¥½¸¤°)Í¼¹¼™Õ±°µ…ÁÀÉ•¹‘•É•…•ÁÑ…¹”±…¥µ•¸Må¹Ñ¡•Ñ¥Œ‘…Ñ„µUI0±…å½ÕÐ•áÁ•É¥µ•¹Ð)‰±½­•‰ä‰É½ÝÍ•ÈUI0Á½±¥äì¹¼Ý½É­…É½Õ¹…ÑÑ•µÁÑ•¸9•…É‰äÝ½É­ÍÁ…”¹…Ù¥…Ñ¥½¸¼)¡¥ÍÑ½Éä½±¥™•Ñ¥µ”½‰…­É½Õ¹½½ÕÌ€¬É•±•…Í”ÈÁAML¸%¹¥Ñ¥…°ÁÉ•À½¹ÑÉ…Ð…Õ¡Ð…¸)½Ù•Èµ‰É½…Í¡•±°Á¥¸É•Á±…•µ•¹ÐìÉ•ÍÑ½É•Õ¹É•±…Ñ•Á¥¹Ì‰•™½É”™¥¹…°Ù…±¥‘…Ñ¥½¸¸)9¼Ñ•ÍÑÌÝ•…­•¹•°¹¼ÕÍ•ÈäÈÍAML¥¹™•ÉÉ•ìÕÍ•ÈäÈÁAML…¹ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸)É•µ…¥¸¸Y%èÉ•Á•…Ñ•‘±ä•¹Ñ•È½•á¥ÐUX°Á…¸½Á¥¹ ½•‘¥Ð½U¹‘½I•‘¼°¡•¬Ñ½ÀµÉ¥¡Ð)‰ÕÑÑ½¹Ì…¹Y%\‘É½Á‘½Ý¸Ý¡¥±”¥¹Í¥‘”UX…¹…™Ñ•È	…¬Ñ¼Í¸%˜‘¥Í…ÁÁ•…É…¹”)Á•ÉÍ¥ÍÑÌ°½‰Ñ…¥¸ÍÉ••¹Í¡½Ð…¹•á…ÐÑÉ¥•È‰•™½É”µ½É”ÁÉ•Í•¹Ñ…Ñ¥½¸¡…¹•Ì¸)5•Ñ…±¹•ÍÌäÈÌ‘•Ù¥”…Ñ”ÍÑ¥±°Á•¹‘¥¹œ¸9•áÐèäÈÐ‘•Ù¥”™••‘‰…¬°¹…ÉÉ½ÜÉ•Á…¥È½¹±ä¸((¸äÈÐ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØÌÌAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì)¹•…É‰äUX½Ý½É­ÍÁ…”½¡¥ÍÑ½Éä½½ÕÌ½‰…­É½Õ¹½É•±•…Í”ÈÁAML¸¥¹…°Í½ÕÉ”½¹Ñ…¥¹Ì)½¹±ä…Ñ¥Ù”µUX¥Í½±…Ñ¥½¸€¬É•Ù¥•Ý•±½…‘•È½É•±•…Í”Á¥¹Ìì¹¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸)9¼É•¹‘•É•½‘•Ù¥”‘¥Í…ÁÁ•…É…¹”…•ÁÑ…¹”¥¹™•ÉÉ•ìÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌ¸((ŒŒ€¸äÈÐÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€äÝ„Ñå”ÄÄá”á„É‰ŒÜÅˆØÙˆäÁ”ÌäÍ••ŒÌàÄá‘ŒÈØÑ€°Ñ•ÍÑ•ÑÉ•”)€ÀÐÄÍ”Õ„àÈÔÍ˜àÈÉäÌÄÔÑ˜Å”ÑÄÐÕˆØå˜Á‰ˆäÝ˜Ù€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ð…Ñ„)É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°Ñ•ÍÑ•±½…°ÑÉ•”ì™•Ñ¡•½É¥¥¸½µ…¥¸µ…Ñ¡••á…Ñ±ä¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•É•É•ÍÍ¥½¸€ÌäÌÌààÜÌÌÜÑ€€¼©½ˆ€ÄÄàÌÔÔÄÐØÔÄá€‰½Ñ Á…ÍÌ(È°ØÌÌÑ•ÍÑÌ°é•É¼™…¥±ÕÉ•Ì½Í­¥ÁÌì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•Ì)€ÌäÌÌààÜÈÐÔÑ€°‘•Á±½ä©½ˆ€ÄÄàÌÔÔÌÜÔÄØÍ€°½µÁ±•Ñ•…±°ÍÑ•ÁÌÍÕ•ÍÍ™Õ±±ä¸)±°ÄØ™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Í½ÕÉ”èÍ¡•±°½Ù•ÉÍ¥½¸°UXÝ½É­ÍÁ…”½5•Í !•…±Ñ )±½…‘•È°É•½Ù•Éä°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°½É¥¥¹…°¡•…‘•È½Ñ½½±‰…È½Ù¥•ÜML…¹½Ý¹•ÉÌ°)Á…¥¹Ñ•È°É•Ñ…¥¹•Í…±…ÈÉ•Í½ÕÉ•Ì½Á½½°…¹ÁÉ½©•Ð½‘•Œ¸%¹¥Ñ¥…°¥¸µ™±¥¡ÐÉ•…‘Ì)Í•ÉÙ•äÈÌì™¥¹…°¡•­•É…Á µ…Ñ¡•ÌäÈÐ¸9¼UX½µ½‘•°½Á…¥¹Ð½¡¥ÍÑ½Éä½¥¹ÁÕÐ…±½É¥Ñ¡´)¡…¹•Ìì½¹±ä½¹”…Ñ¥Ù”µUXMLÉÕ±”…¹É•Ù¥•Ý•É•±•…Í”½…¡”É•™•É•¹•Ì¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÑ¡¥ÌÁÉ½½˜¥Ì‘½Ìµ½¹±ä¸	Õ¥±äÈÐ½µÁ±•Ñ”…¹)É•…‘ä™½È¥A…É•Ñ•ÍÐèÉ•Á•…Ñ•‘±ä•¹Ñ•ÈUX‘¥Ñ½È°Á…¸½Á¥¹ ½•‘¥Ð½¡¥ÍÑ½Éä°ÕÍ”Y%\°)Ñ¡•¸	…¬Ñ¼Íì½¹™¥É´µ…¥¸Ñ½ÀµÉ¥¡Ð‰ÕÑÑ½¹ÌÉ•µ…¥¸Ù¥Í¥‰±”…¹ÕÍ…‰±”¸M½ÕÉ”)±…å•É¥¹œ¥ÍÍÕ”É•Á…¥É•ì•á…Ð¥¹Ñ•Éµ¥ÑÑ•¹ÐM…™…É¤‘¥Í…ÁÁ•…É…¹”ÍÑ¥±°¹••‘ÌÑ¡¥Ì)‘•Ù¥”½¹™¥Éµ…Ñ¥½¸¸±½Õµ…¥¸]•‰0Õ¹…Ù…¥±…‰±”°¹¼™Õ±°µ…ÁÀÉ•¹‘•É•ÁÉ½½˜¸)%˜¥ÐÁ•ÉÍ¥ÍÑÌ½‰Ñ…¥¸ÍÉ••¹Í¡½Ð…¹•á…ÐÑÉ¥•È‰•™½É”™ÕÉÑ¡•ÈU$¡…¹•Ì¸)UÍ•ÈäÈÁAMLÁÉ½Ñ•Ñ•ìäÈÌ5•Ñ…±¹•ÍÌ‘•Ù¥”…Ñ”ÍÑ¥±°Á•¹‘¥¹œ°¹¼¥¹™•ÉÉ•AML¸((ŒŒ•Ù¥”™••‘‰…¬ƒŠP€¸äÈÐÑ½½±‰…ÈAMLì5•Ñ…±¹•ÍÌ%0ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈèƒŠqAML™½ÈÑ¡”™¥à»ŠtAÉ½Ñ•Ð€¸äÈÐµ…¥¸Ñ½ÀµÉ¥¡ÐÑ½½±‰…ÈÙ¥Í¥‰¥±¥ÑäÑ¡É½Õ UX)‘¥Ñ½Èì­••À…Ñ¥Ù”µUXÙ¥•ÝÁ½ÉÐ¥Í½±…Ñ¥½¸…¹½É¥¥¹…°¡•…‘•È½…Ñ¥½¸½Ý¹•ÉÌ¥¹Ñ…Ð¸()5•Ñ…±¹•ÍÌ¥Ì9=P…•ÁÑ•èÕÍ•ÈÉ•Á½ÉÑÌÝ¡½±”µ½‘•°‰±…¬¥¸¡…¹¹•°°Ý¡¥Ñ”‘É…ÝÌ)‰±…¬€¼‰±…¬‘É…ÝÌÝ¡¥Ñ”°1¥ÐÁ…¥¹ÑÌ‰±…¬°…¹¹¼µ•Ñ…°¡…¹¹•°¥¸•áÁ½ÉÐ¸)QÉ•…Ð…±°É•Á½ÉÑ•ÍåµÁÑ½µÌ…Ì…¸½Á•¸‘•Ù¥”™…¥±ÕÉ”ì‘¼¹½Ð¥¹™•È5•Ñ…±¹•ÍÌAML)™É½´Ñ¡”Í•Á…É…Ñ”Ñ½½±‰…È…•ÁÑ…¹”¸9¼ÍÁ•Õ±…Ñ¥Ù”¥¹Ù•ÉÍ¥½¸½ÈÉ•Í½ÕÉ”µ¥É…Ñ¥½¸¸()Õ‘¥ÐÕÉÉ•¹ÐÀÀåÐÕ˜ÌèÍ±¥‘•È™½ÉÝ…É‘Ì¥¹Ñ••ÈÃŠLÈÔÔ‘¥É•Ñ±äìÍ…±…ÈÉ…ÍÑ•ÈÁÕ‰±¥Í¡•Ì)É…ÜHà¥¹‘•Á•¹‘•¹Ð½˜½±½ÕÈì¡…¹¹•°ÕÍ•ÌÉ…åÍ…±”ì1¥ÐÍ…µÁ±•ÌÝ¥Ñ ™…Ñ½ÈÄì)•á¥ÍÑ¥¹œ¹…Ñ¥Ù”Í±½Ð…¹1Á…­•É••¥Ù”…ÁÑÕÉ•µ•Ñ…±¹•ÍÌ¸I•ÉÕ¸…ÑÕ…°U$¼)Á…¥¹Ñ•È½¡¥ÍÑ½Éä½‘ÕÁ±¥…Ñ”½ÁÉ•Ù¥•Ü½•áÁ½ÉÐÍÕ¥Ñ•ÌèÈÅAML¼Á%0¼ÁÍ­¥À¸Q¡½Í”™¥áÑÕÉ•Ì)ÝÉ¥Ñ”ÈÔÔÝ¡¥Ñ”¼Á‰±…¬…¹½¹Ñ…¥¸•á…Ðµ•Ñ…±¹•ÍÌ¥¸9=4½1°Í¼Ñ¡•ä‘¼9=På•Ð)É•ÁÉ½‘Õ”ÕÍ•È™…¥±ÕÉ”¸1¥Ðµ…Ñ•É¥…°½Í•¹”¡…Ù”¹¼É•™±•Ñ¥½¸•¹Ù¥É½¹µ•¹ÐìÁ½ÍÍ¥‰±”)‘…É¬µµ•Ñ…°…ÁÁ•…É…¹”½¹ÑÉ¥‰ÕÑ½È°9=P„½¹™¥Éµ•‘¥…¹½Í¥Ì½˜…±°ÍåµÁÑ½µÌ¸)±½ÕAT±¥µ¥Ñ…Ñ¥½¸ÍÑ¥±°ÁÉ•Ù•¹ÑÌÉ•¹‘•É•µ‘•Ù¥”É•ÁÉ½‘ÕÑ¥½¸¸()9•áÐÉ•ÅÕ¥É••Ù¥‘•¹”è…™™•Ñ•€¹‰½á±…ˆÁÉ½©•Ð…¹¥ÑÌ•áÁ½ÉÑ•€¹¹½´°Á±ÕÌÍÉ••¹Í¡½Ð)Ý¥Ñ ¡…¹¹•°½AÉ•Ù¥•ÜÍ•±•Ñ½È…¹Y…±Õ”Ù¥Í¥‰±”¸QÉ…”•á…Ð…ÕÑ¡½É•‰åÑ•Ì½‰¥¹‘¥¹œ°)…ÑÕ…°•áÁ½ÉÑ•Í±½Ð½™…Ñ½ÉÌ…¹‘¥ÍÁ±…å•ÁÉ•Ù¥•Ü‰•™½É”¡…¹¥¹œÍ±¥‘•ÈÍ•µ…¹Ñ¥Ì¸)¼¹½Ð‘¥Íµ¥ÍÌÉ•Á½ÉÐ‰•…ÕÍ”™¥áÑÕÉ•ÌÁ…ÍÌ¸-••À½É¥¥¹…°½Ý¹•ÉÌì¹¼Á…É…±±•°µ…Ñ•É¥…°)½È‰ÉÕÍ ¥µÁ±•µ•¹Ñ…Ñ¥½¸¸IÕ¹Ñ¥µ”É•µ…¥¹ÌäÈÐ°¹¼¹•Ü‰Õ¥±½È¹•Üµ…¹Õ…°…Ñ”å•Ð¸((ŒŒ€¸äÈÔƒŠPÁ…¥¹Ñ•µ•Ñ…°1¥ÐÁÉ•Ù¥•ÜÉ•™±•Ñ¥½¸¥¹ÁÕÐƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È±…É¥™¥•Ý¥Ñ äÈÐÍÉ••¹Í¡½ÑÌ€¬5Q0QMP¹‰½á±…ˆ¼¹¹½´è¡…¹¹•°ÈÔÔ‘É…ÝÌÝ¡¥Ñ”)½ÉÉ•Ñ±äìµ•Ñ…°•áÁ½ÉÑÌÁ•É™•Ñ±ä¥¸9½µ…¸Mµ½½Ñ µ•Ñ…±±¥ŒÁ…Ñ¡•ÌÑÕÉ¸‰±…¬¥¸)	½á1…ˆ1¥Ð°¥¹±Õ‘¥¹œÝ¡•¸I½Õ¡¹•ÍÌÀ¥ÌÁ…¥¹Ñ•½Ù•Èµ•Ñ…°¸AÉ¥½ÈÍÕÍÁ•Ñ•‰åÑ”)¥¹Ù•ÉÍ¥½¸½•áÁ½ÉÐ±½ÍÌ…É”ÍÕÁ•ÉÍ•‘•‰ä½¹É•Ñ”•Ù¥‘•¹”¸•½‘•…ÑÕ…°ÁÉ½©•Ð)¡…Ì¥¹‘•Á•¹‘•¹ÐÔÄË
È½±½ÕÈ…¹µ•Ñ…±¹•ÍÌìµ•Ñ…°½¹Ñ…¥¹ÌÃŠLÈÔÔ¸ÑÕ…°¹…Ñ¥Ù”µ…Ñ•É¥…°)¡…Ì½±½È­µ•Ñ…±¹•ÍÌ°µ•Ñ…±¹•ÍÌ½™…Ñ½É5•Ñ…±¹•ÍÌÄì•áÁ½ÉÑ•É…åÍ…±•A9µ…Ñ¡•ÌYId)ÁÉ½©•Ðµ•Ñ…±¹•ÍÌ‰åÑ”•á…Ñ±ä¸MÕÁÁ±¥•ÁÉ½©•ÐÁÉ•‘…Ñ•ÌÍ¡½Ý¸É½Õ¡¹•ÍÌ•‘¥Ðì¹¼)É½Õ¡¹•ÍÌµ…ÀÁÉ•Í•¹Ð¥¸Ñ¡…ÐÍ¹…ÁÍ¡½Ð°¹½ÐÁÉ½½˜½˜‘É½ÁÁ•É½Õ¡¹•ÍÌ¸UÁ±½…‘ÌÉ•µ…¥¸)Õ¹µ½‘¥™¥•…¹…É”¹½Ð½Á¥•¥¹Ñ¼ÉÕ¹Ñ¥µ”½É•Á½Í¥Ñ½Éä¸()I½½ÐÍ½ÕÉ”½µ¥ÍÍ¥½¸èMÑ…¹‘…ÉÁ…¥¹Ñ•µ•Ñ…°¡…¹¼Í•¹”½µ…Ñ•É¥…°É•™±•Ñ¥½¸¥¹ÁÕÐ¸)¥É•Ð±¥¡ÑÌ¥Ù”¹…ÉÉ½Ü¡¥¡±¥¡ÑÌìÍµ½½Ñ µ•Ñ…°…¸½Ñ¡•ÉÝ¥Í”Í¡½Ü‰±…¬¸-••ÀÉ…Ü(À½¹½¹µ•Ñ…°€¼ÈÔÕµ•Ñ…°Í•µ…¹Ñ¥Ì…¹•á¥ÍÑ¥¹œÝÉ¥Ñ•ÉÌ¸=É¥¥¹…°ÍÕÉ™…”½±¥™•Ñ¥µ”½Ý¹•È)¹½Ü…ÅÕ¥É•Ì„±½…°É½½´A5I4½¹±ä™½Èµ•Ñ…±±¥Œ1¥Ðµ…Ñ•É¥…°Ý¥Ñ ¹¼•á¥ÍÑ¥¹œÍ•¹”)•¹Ù¥É½¹µ•¹Ð¸=É¥¥¹…°Q¡É•”ÄÜäI½½µ¹Ù¥É½¹µ•¹Ð€¬A5I5•¹•É…Ñ½È°ÄÈáÕ‰”Í¥é”°¹¼!H)¹•ÑÝ½É¬™•Ñ °ÕÍÑ½´Í¡…‘•È½È…‘‘•±¥Ù”µÍ•¹”±¥¡ÑÌ¸%¹‘•Á•¹‘•¹Ð•¹Ù5…ÀÁ•Èµ…Ñ•É¥…°)ÕÍ•ÌÍ¡…É•Á•ÈµÉ•¹‘•É•È½É•™½Õ¹ÐÁ½½°ì•¹•É…Ñ½È½É½½´Ñ•µÁ½É…Éä…ÍÍ•ÑÌ‘¥ÍÁ½Í•…™Ñ•È)É•…Ñ¥½¸°É•¹‘•ÈÑ…É•Ð™É•••á…Ñ±ä½¹”…™Ñ•È±…ÍÐÍÕÉ™…”¸¡…¹¹•°¡½±‘Ì…•ÁÑ•)Õ¹±¥Ðµ…À°½±½ÕÈ½É½Õ¡¹•ÍÌµ½¹±äÁ…Ñ¡ÌÕ¹¡…¹•ì•áÁ±¥¥ÐÍ•¹”•¹Ù¥É½¹µ•¹ÐÉ•ÍÁ•Ñ•¸)M½ÕÉ”Á…¥¹Ð½UYÌ½¡¥ÍÑ½Éä½ÁÉ½©•ÑÌ…¹•áÁ½ÉÐ™…Ñ½ÉÌ½µ…ÁÌÕ¹¡…¹•¸9¼¥¹Ù•ÉÑ•µÍ±¥‘•È)Ý½É­…É½Õ¹°Í½ÕÉ”µ¥É…Ñ¥½¸½ÈÍ•¹”µ±½‰…°±¥¡Ñ¥¹œ¡…¹”¸((Í¹•ÜÉ•É•ÍÍ¥½¹Ì½Ù•È½É¥¥¹…°ÍÕÉ™…”‰¥¹‘¥¹œ½˜É•™±•Ñ¥½¸­•á…ÐÍ…±…È¡…¹¹•±Ì°)¡…¹¹•°½1¥ÐÉ•ÕÍ”½Í½ÕÉ”ÁÉ•Í•ÉÙ…Ñ¥½¸°½±½ÕÈµ½¹±ä½ÕÍÑ½´•¹Ù¥É½¹µ•¹Ð¥Í½±…Ñ¥½¸°)µÕ±Ñ¥Á±”ÍÕÉ™…•Ì½É•™•É•¹”±¥™•Ñ¥µ”°É•¹‘•É•ÈÍ•Á…É…Ñ¥½¸…¹™…¥±•µ•¹•É…Ñ¥½¸É•ÑÉä¸)9•…É‰ä¹•Ü­É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌ½•áÁ½ÉÐÌÁAML°É•±•…Í”ÕAMLì™Õ±°½ÁÕ‰±¥…Ñ¥½¸‰•±½Ü¸)±½ÕAT…¹¹½ÐÉ•¹‘•È…ÑÕ…°µ…¥¸ì™…­”Ñ…É•ÐÙ•É¥™¥•Ì½Ý¹•ÉÍ¡¥À½¹±ä°¹½ÐAT±½½¬¸)=™™¥¥…°A$èÑ¡É••©Ì¹½Éœ½‘½Ì½Á…•Ì½I½½µ¹Ù¥É½¹µ•¹Ð¹¡Ñµ°…¹A5I5•¹•É…Ñ½È¹¡Ñµ°ì)Á¥¹¹•¥¹ÍÑ…±±•Q¡É•”ÄÜäÍ½ÕÉ”Ù•É¥™¥•ÍÕÁÁ½ÉÑÌ™É½µM•¹”½ÁÑ¥½¹Ì¹Í¥é”¸()UÍ•ÈäÈÐÑ½½±‰…ÈAMLÁÉ½Ñ•Ñ•ìÕÉÉ•¹ÐÉÕ¹Ñ¥µ”½ÉÉ•Ñ¥½¸½¹±äÁ…¥¹Ñ•µ…Ñ•É¥…°)É•™±•Ñ¥½¸Á…Ñ …¹É•Ù¥•Ý•É•Ù•ÉÍ”±½…‘•ÈÉ…Á äÈÔ¸5•Ñ…±¹•ÍÌ…ÕÑ¡½É¥¹œ½•áÁ½ÉÑÌ)…É”½¹™¥Éµ•‰äÕÍ•È±…É¥™¥…Ñ¥½¸°äÈÔÙ¥ÍÕ…°…•ÁÑ…¹”Á•¹‘¥¹œ¸Y%èÉ•½Á•¸)Í…Ù•Á…¥¹Ñ•Õ‰”°1¥Ð€¬5•Ñ…±¹•ÍÌÈÔÔ…¹I½Õ¡¹•ÍÌÀ°½É‰¥ÐìÍ¡½Õ±É•™±•ÐÍÑÕ‘¥¼)Á…¹•±ÌÉ…Ñ¡•ÈÑ¡…¸Í½±¥‰±…¬¸½µÁ…É”I½Õ¡¹•ÍÌÈÔÔ°¡…¹¹•°À¼ÈÔÔ°½¹”½É•½Á•¸…¹)9=5•áÁ½ÉÐ¸9•áÐÉ•ÍÁ½¹¹…ÉÉ½Ý±äÑ¼äÈÔÙ¥ÍÕ…°™••‘‰…¬‰•™½É”¹•Ü¡…¹¹•±Ì¸((¸äÈÔ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸Àè€¨¨È°ØÌØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì)¹•…É‰äÌÁAML…¹É•±•…Í”ÕAML¸ÑÕ…°ÍÕÁÁ±¥•9=4½ÁÉ½©•Ðµ•Ñ…±¹•ÍÌ½µÁ…É•‰åÑ”)™½È‰åÑ”è¥‘•¹Ñ¥…°¸9¼Ñ•ÍÐ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•ì¹¼Í½ÕÉ”½ÕÍ•È™¥±”µ½‘¥™¥…Ñ¥½¹Ì¸)AÉ½Ñ•Ñ•äÈÐÑ½½±‰…È…¹5Õ±Ñ¤Ä¸À½™É½é•¸É•Ñ…¥¹•¸AÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌì)É•…°AT¼äÈÔ¥A…É•™±•Ñ¥½¸…ÁÁ•…É…¹”ÍÑ¥±°Á•¹‘¥¹œ¸((ŒŒ€¸äÈÔÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÔäÜØÔå”ÄààäÈÈÁˆÁ„ÈÀåŒÄÀÈá•ŒÔÄáˆÔÈØÀÈÍŒÕ€°Ñ•ÍÑ•ÑÉ•”)€ÜØÁ˜Í„Ù”ÜÐääÐå•ØØÁ˜ÔÌÙÕ•…äá‘…™˜ÀàÈå€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ð…Ñ„)É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°Ñ•ÍÑ•±½…°ÑÉ•”ì™•Ñ¡•½É¥¥¸½µ…¥¸µ…Ñ¡••á…Ñ±ä¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•É•É•ÍÍ¥½¸€ÌäÌØÈÜØÄÜÔÅ€€¼©½ˆ€ÄÄàÐÌÈÐàäàäå€‰½Ñ Á…ÍÌ(È°ØÌØÑ•ÍÑÌ°é•É¼™…¥±ÕÉ•Ì½Í­¥ÁÌì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•Ì)€ÌäÌØÈÜØÄÔÜá€°‘•Á±½ä©½ˆ€ÄÄàÐÌÈØÈÐÀÐÅ€°½µÁ±•Ñ•…±°ÍÑ•ÁÌÍÕ•ÍÍ™Õ±±ä¸)±°ÈÀ™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Í½ÕÉ”èÍ¡•±°½Ù•ÉÍ¥½¸°¹•ÜÉ•™±•Ñ¥½¸¡•±Á•È°)½É¥¥¹…°Á…¥¹ÐÍÕÉ™…”…¹•Ù•Éä¡…¹•ÉÕ¹Ñ¥µ”½•áÁ½ÉÐ½Á…É•¹Ð½1…ˆ™¥±”°É•½Ù•Éä°)ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°É•Ñ…¥¹•Í…±…È½ÁÉ½©•Ð½Ý¹•ÉÌ…¹…•ÁÑ•äÈÐUX¥Í½±…Ñ¥½¸¸)%¹¥Ñ¥…°¥¸µ™±¥¡ÐÉ•…‘ÌÍ•ÉÙ•äÈÐ½¹•Ü¡•±Á•ÈÐÀÐì™¥¹…°¡•­•É…Á µ…Ñ¡•ÌäÈÔ¸)=¹±äÁ…¥¹Ñ•µ…Ñ•É¥…°É•™±•Ñ¥½¸‰•¡…Ù¥½È¡…¹•ì¹…Ñ¥Ù”½1…±½É¥Ñ¡µÌ…¹Í½ÕÉ”)Í…±…ÈÙ…±Õ•ÌÉ•Ñ…¥¸•á…Ð…•ÁÑ•‰åÑ•Ì¸MÕÁÁ±¥•ÁÉ½©•Ð½¹…Ñ¥Ù”™¥±•ÌÕ¹µ½‘¥™¥•¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÑ¡¥ÌÁÉ½½˜¥Ì‘½Ìµ½¹±ä¸	Õ¥±äÈÔ½µÁ±•Ñ”…¹)É•…‘ä™½È¥A…1¥Ðµ…Ñ•É¥…°µ•Ñ…°ÈÔÔ½É½Õ¡¹•ÍÌÀ­½É‰¥ÐÉ•™±•Ñ¥½¸¡•¬°É½Õ ÈÔÔ)‰±ÕÈ½µÁ…É¥Í½¸°¡…¹¹•°À¼ÈÔÔ…¹½¹”½M…Ù•=Á•¸¸á¥ÍÑ¥¹œ¡…¹¹•°…¹¹…Ñ¥Ù”•áÁ½ÉÐ)½¹™¥Éµ•½ÉÉ•Ð‰äÍÕÁÁ±¥•™¥±•Ì½ÕÍ•È±…É¥™¥…Ñ¥½¸°¹½ÐÉ•Ù•ÉÍ•¸I•…°AT)É•™±•Ñ¥½¸…ÁÁ•…É…¹”…¹±…Ñ•¹äÉ•µ…¥¸‘•Ù¥”µÁ•¹‘¥¹œì9½‘”A5I4Ñ…É•Ð…‘…ÁÑ•È)Ù•É¥™¥•Ì‰¥¹‘¥¹œ½Í¡…É¥¹œ½±¥™•Ñ¥µ”½¹±ä¸UÍ•ÈäÈÐÑ½½±‰…ÈAMLÁÉ½Ñ•Ñ•¸)9•áÐèäÈÔÙ¥ÍÕ…°™••‘‰…¬°¹…ÉÉ½Ü™¥á•Ì‰•™½É”™ÕÉÑ¡•Èµ…Ñ•É¥…°µ¡…¹¹•°Ý½É¬¸((ŒŒ€¸äÈØƒŠPÝ¡½±”µ½‰©•ÐQ…À¥±°ìÉ•ÅÕ•ÍÑ•‰ÉÕÍ É½…‘µ…ÀƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäÈÔ™••‘‰…¬èÉ•™±•Ñ¥½¹ÌÍÑ¥±°¹½ÐÙ¥Í¥‰±”¥¸	½á1…ˆÁÉ•Ù¥•Üì9½µ…•áÁ½ÉÐ+ŠqÉ•…ÓŠt…¹ÁÉ½Ñ•Ñ•¸äÈÔÙ¥ÍÕ…°™¥à¥Ì9=P…•ÁÑ•¸9¼™ÕÉÑ¡•ÈÍÁ•Õ±…Ñ¥Ù”±¥¡Ñ¥¹œ)¡…¹”¥¸äÈØìÁÉ•Í•ÉÙ”É…Üµ…ÁÌ…¹½ÉÉ•Ð¹…Ñ¥Ù”¡…¹‘½™˜¸9••…ÑÕ…°äÈÔ¼äÈØÁÉ•Ù¥•Ü)Ù•ÉÍ¥½¸½ÍÑ…Ñ”½ÈÉ•¹‘•É•È‘¥…¹½ÍÑ¥Ì‰•™½É”±…¥µ¥¹œ…¹½Ñ¡•ÈÉ•™±•Ñ¥½¸É•Á…¥È¸)UÍ•ÈÉ•ÅÕ•ÍÑÌQ…ÀÑ¼¥±°°…±Á¡„½µÁ…Ñ¥‰¥±¥Ñä°‘•±•Ñ”µÁ…¥¹Ð½•É…Í•È°‰±ÕÈ…¹ÍµÕ‘”¸)±…É¥™¥•Q…À¥±°‘•™…Õ±Ð]!=1=	)P°Í•±•Ñ•±…å•È½¡…¹¹•°°¹½Ð¥Í±…¹½™±½½É•¥½¸¸)Õ‘¥Ð•á¥ÍÑ¥¹œÉ…ÍÑ•È½¥¹ÁÕÐ½ÍÑ…¬½¡¥ÍÑ½Éä…¹ÁÉ¥½È-±•­Ì¥¹Ñ•É…Ñ¥½¸…Õ‘¥Ð™¥ÉÍÐ¸()=É¥¥¹…°É…ÍÑ•È¹½ÜÍ¡…É•Ì•á…Ñ±äÑ¡”Í…µ”½Ù•É…”½½Á…ÅÕ”½ÍÑÉ…¥¡Ðµ…±Á¡„Ñ•á•°)½Á•É…Ñ¥½¸™½È‰ÉÕÍ …¹™¥±°¸9•ÜQ½½°Í•±•Ñ½È	ÉÕÍ €¼Q…À™¥±°ƒ
ÜÝ¡½±”½‰©•Ð¸)A•¹¥°½µ½ÕÍ”‘½Ý¸µÕÍÐ¡¥ÐÙ¥Í¥‰±”Í•±•Ñ•µ•Í ìÝ¡½±”ÔÄË
ÈÍ•±•Ñ•±…å•È½¡…¹¹•°)ÁÉ•Ù¥•ÝÌ…ÐÕÉÉ•¹Ð½Á…¥Ñä½Ù…±Õ”°É•±•…Í”½µµ¥ÑÌ½¹”Ù¥„½É¥¥¹…°™¥¹¥Í ½ÁÉ•™±¥¡Ð¼)¡•­Á½¥¹Ð½=\¸M¥é”½ÁÉ•ÍÍÕÉ”‘¼¹½Ð±¥µ¥Ð™¥±°¸É…œøáÁà°Á½¥¹Ñ•É…¹•°½Ñ½½°½¡…¹¹•°)ÍÝ¥Ñ ½‰½‘ä±½ÍÌ…¹•°ì™¥¹•ÉÌÍÑ¥±°¹…Ù¥…Ñ”°‰…­É½Õ¹½¹Ñ…ÑÌ¹•Ù•È™¥±°¸)½±½ÕÈ½¥µ…”½¡¥‘‘•¸µ±…å•È½Í…±…È•±¥¥‰¥±¥ÑäÕ…É‘ÌÉ•Ñ…¥¹•ì¥µ…”½±½ÕÈÉ•µ…¥¹Ì)É•…µ½¹±ä°•‘¥Ñ…‰±”µ…Í­Ì™¥±°¹½Éµ…±±ä¸9¼µ½À…‘‘Ì¹¼¡¥ÍÑ½ÉäìÅÕ½Ñ„½¡•­Á½¥¹Ð)™…¥±ÕÉ”É•ÍÑ½É•Ì½É¥¥¹…°É•Í½ÕÉ”½ÁÉ•Ù¥•Ü½¹…Ù¥…Ñ¥½¸¸9¼Í¡•µ„½ÝÉ¥Ñ•È¡…¹•Ì¸((Ñ¹•Ü¥¹Ñ•É…Ñ¥½¹Ìè•á…ÐÍ¡…É•É…ÍÑ•È½Ù•É…”½…±Á¡„½¹¼µ½À½…¹•°ì…ÑÕ…°U$±…å•È)™¥±°…¹Í½ÕÉ”ÁÉ•Í•ÉÙ…Ñ¥½¸½U¹‘½I•‘¼½M…Ù•=Á•¸½¹…Ñ¥Ù”A9ì¥¹‘•Á•¹‘•¹ÐÍ…±…È­µ…Í¬)™¥±°ìµ•Í µ¥ÍÌ½™¥¹•È½‘É…œ½…¹•°½Í•ÑÑ¥¹Ì½‰½‘äµ±½ÍÌ½¡•­Á½¥¹ÐÉ½±±‰…¬¸9•…É‰äÄåAMLì)™Õ±°…¹ÁÕ‰±¥…Ñ¥½¸‰•±½Ü¸=É¥¥¹…°‰ÉÕÍ •áÁ•Ñ…Ñ¥½¹ÌÉ•Ñ…¥¹•°¹¼™É½é•¸½5Õ±Ñ¤½­•É¹•°)¡…¹•Ì¸I•Ù¥•Ý•Í¡…É•É…ÍÑ•È½µ…¥¸­1…ˆÉ•Ù•ÉÍ”…¡”É…Á äÈØ½¹±ä¸()I•µ…¥¹¥¹œÉ•ÅÕ•ÍÑ•‰ÉÕÍ¡•Ì…É”…•ÁÑ•É½…‘µ…À°¹½Ð‘•±¥Ù•É•‰ÕÑÑ½¹Ìè•É…Í•È(¡ÑÉ…¹ÍÁ…É•¹Ð½Ù•É±…åÌ½µ…Í­Ìì•áÁ±¥¥Ð	…Í”É•Í•ÐÍ•µ…¹Ñ¥Ì¤°…±Á¡„Ñ¥ÁÌ€¡‰½Õ¹‘•A9)½Ù•É…”½É½Ñ…Ñ¥½¸Ý¥Ñ ½É¥¥¹…°‰ÉÕÍ ¤°‰±ÕÈ…¹ÍµÕ‘”Ý¥Ñ UXµ¥Í±…¹½Í•…´µ…Ý…É”)Í…µÁ±¥¹œÍ¼¹•¥¡‰½ÕÉ¥¹œ…Ñ±…Ì¥Í±…¹‘Ì…¹¹½Ð½¹Ñ…µ¥¹…Ñ”Õ¹É•±…Ñ•ÍÕÉ™…•Ì¸)9¼	H¥µÁ½ÉÐ½È•¹•É…°9½µ…‰ÉÕÍ µ™½Éµ…Ð½µÁ…Ñ¥‰¥±¥ÑäÁÉ½µ¥Í•¸AÉ•™•È…Õ‘¥Ñ•)-±•­Ì…±½É¥Ñ¡µÌ¥¸•á¥ÍÑ¥¹œÉ…ÍÑ•È½¥¹ÁÕÐ½¡¥ÍÑ½Éä½Ù•È…¹½Ñ¡•ÈÁ…¥¹Ñ¥¹œ•¹¥¹”¸)9•áÐ¹…ÉÉ½Ü‰Õ¥±èÉ•™±•Ñ¥½¸‘¥…¹½ÍÑ¥Œ•Ù¥‘•¹”Á±ÕÌ•É…Í•È½…±Á¡„¥µÁ±•µ•¹Ñ…Ñ¥½¸ì)­••À‰±ÕÈ½ÍµÕ‘”Í½Á”‰½Õ¹‘•…¹Ñ•ÍÐ‰•™½É”•áÁ½Í¥¹œ¸9¼¹•Üµ…Ñ•É¥…°¡…¹¹•°Ý½É¬¸)Y%äÈØè¡½½Í”Q½½°Q…À¥±°°Ñ…Àµ•Í Ý¥Ñ ¡½Í•¸½±½ÕÈìU¹‘½I•‘¼¸¥±°…¸½Ù•É±…ä)…ÐÔÀ”½Á…¥Ñäì½¹™¥É´Õ¹‘•É±å¥¹œÁ…¥¹ÐÉ•Ñ…¥¹•¸¥±°I½Õ¡¹•ÍÌ½5•Ñ…±¹•ÍÌÀ¼ÈÔÔ…¹)¡•¬¡…¹¹•°½•áÁ½ÉÐ¥¹‘•Á•¹‘•¹”ìÍÝ¥Ñ 	ÉÕÍ …¹½¹™¥É´¹½Éµ…°A•¹¥°ÍÑÉ½­•Ì¸((¸äÈØ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØÐÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì)¹•Ü™¥±°ÑAML°¹•…É‰äÄåAML°É•±•…Í”ÕAML¸%¹¥Ñ¥…°ÁÉ•Á…É…Ñ¥½¸½¹ÑÉ…Ð…Õ¡ÐÍ¡…É•)1…ˆÉ…ÍÑ•È½µ¥ÑÑ•™É½´±½…‘•È±½ÍÕÉ”ì½µÁ±•Ñ”µ…¥¸½1…ˆÉ…Á É•Ù¥•Ý•…¹ÕÁ‘…Ñ•)‰•™½É”™¥¹…°ÉÕ¸¸9¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•ìÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸½•áÁ½ÉÐÉ•Ñ…¥¹•¸)I•™±•Ñ¥½¸äÈÔÉ•µ…¥¹ÌÕÍ•ÈµÉ•Á½ÉÑ•Õ¹É•Í½±Ù•°¹¼±¥¡Ñ¥¹œ™¥à±…¥´¥¸äÈØ¸)AÕ‰±¥…Ñ¥½¸…¹¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½Ü¸((ŒŒ€¸äÈØÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÍˆÀÅ‰”ÅØÙˆÝ„ÀÙˆÈÈàØÔØÔàÄÅ˜Õ”ØÜäØÉ…ˆäÅ™€°Ñ•ÍÑ•ÑÉ•”)”ØÀØÄÐÝ”ÌÁˆá˜àÙ‘”ÝˆÀÀåˆÈÕŒÌÅ…˜ÔÌØäØÍ•‘•€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ð…Ñ„)É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°Ñ•ÍÑ•±½…°ÑÉ•”ì™•Ñ¡•½É¥¥¸½µ…¥¸µ…Ñ¡••á…Ñ±ä¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•É•É•ÍÍ¥½¸€ÌäÌØÔÀÄàÌÈÙ€€¼©½ˆ€ÄÄàÐÌäÜÔääÌÝ€‰½Ñ Á…ÍÌ(È°ØÐÀÑ•ÍÑÌ°é•É¼™…¥±ÕÉ•Ì½Í­¥ÁÌì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•Ì)€ÌäÌØÔÀÄÜÔÀÁ€°‘•Á±½ä©½ˆ€ÄÄàÐÌäààäÜÐÝ€°½µÁ±•Ñ•…±°ÍÑ•ÁÌÍÕ•ÍÍ™Õ±±ä¸)±°Ää™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Í½ÕÉ”èÍ¡•±°½Ù•ÉÍ¥½¸°µ…¥¸Á…¥¹Ñ•È½½É”°Í¡…É•)É…ÍÑ•È…¹½µÁ±•Ñ”¡…¹•1…ˆÍ•ÍÍ¥½¸½±½…‘•ÈÉ…Á °É•½Ù•Éä°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°)É•Ñ…¥¹•Í…±…È½½‘•Œ½¹…Ñ¥Ù”•áÁ½ÉÐ½Á…¥¹Ð•áÁ½ÉÐ½µ…Ñ•É¥…°½É•™±•Ñ¥½¸½UX½Ý¹•ÉÌ¸)%¹¥Ñ¥…°¥¸µ™±¥¡ÐÉ•…‘ÌÍ•ÉÙ•äÈÔì™¥¹…°¡•­•É…Á µ…Ñ¡•ÌäÈØ¸9¼™É½é•¸°)µ½‘•±±¥¹œ°ÁÉ½©•Ð½È•áÁ½ÉÐ…±½É¥Ñ¡´¡…¹”ì½É¥¥¹…°‰ÉÕÍ Í•µ…¹Ñ¥ÌÉ•Ñ…¥¹•¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÁÉ½½˜¥Ì‘½Ìµ½¹±ä¸	Õ¥±äÈØ½µÁ±•Ñ”…¹É•…‘ä)™½ÈQ½½°ƒŠHQ…À™¥±°ƒ
ÜÝ¡½±”½‰©•ÐèÑ…À½±½ÕÈ™¥±°½U¹‘½I•‘¼°½Ù•É±…äÔÀ”ÁÉ•Í•ÉÙ…Ñ¥½¸°)Í…±…ÈÀ¼ÈÔÔ¥¹‘•Á•¹‘•¹”…¹É•ÑÕÉ¸Ñ¼	ÉÕÍ ¸±Á¡„Ñ¥ÁÌ°•É…Í•È°‰±ÕÈ…¹ÍµÕ‘”…É”)É•ÅÕ•ÍÑ•Á•¹‘¥¹œÍÑ…•Ì°¹½Ð¥µÁ±•µ•¹Ñ•¸I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÉ•µ…¥¹ÌÕÍ•ÈµÉ•Á½ÉÑ•)Õ¹É•Í½±Ù•‘•ÍÁ¥Ñ”äÈÔ°¹¼¹•Ü±¥¡Ñ¥¹œÉ•Á…¥È±…¥µ•¸9½µ…•áÁ½ÉÐ½¹™¥Éµ•É•…Ð)…¹ÁÉ½Ñ•Ñ•ìäÈÐÑ½½±‰…ÈAMLÁÉ½Ñ•Ñ•¸9•áÐèäÈØ‘•Ù¥”™••‘‰…¬°¹…ÉÉ½Ü•É…Í•È¼)…±Á¡„…‘‘¥Ñ¥½¹Ì…¹•Ù¥‘•¹”µ±•ÁÉ•Ù¥•Ü‘¥…¹½Í¥ÌÑ¡É½Õ ½É¥¥¹…°½Ý¹•ÉÌ¸((ŒŒ€¸äÈÜƒŠP•áÁ±¥¥ÐÍ…±…È±…‰•°É½ÝÌ…¹É…Í•ÈƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäÈÙAMLÁÉ½Ñ•ÑÌÝ¡½±”µ½‰©•ÐQ…À¥±°½½Á…¥Ñä½¡¥ÍÑ½Éä½¡…¹¹•°Ý½É­™±½Ü¸MÉ••¹Í¡½Ð)¥‘•¹Ñ¥™¥•Ì•…É±¥•Èµ•Ñ…°Ý¡¥Ñ”½‰±…¬½¹™ÕÍ¥½¸…Ì¥¹±¥¹”¡¥¹ÐÑ•áÐ©½¥¹¥¹œÉ•…‘½ÕÐè+ŠpÈÔÕ	±…¯Š›Št€¼ƒŠpÁ	±…¯Š›Št¸9¼¥¹Ù•ÉÑ•‰åÑ•Ì¸M¡…É•Í…±…È½¹ÑÉ½±Ì¹½ÜÉ¥É½ÝÌè)±…‰•°€¬™±•á¥‰±”Í±¥‘•È€¬™¥á•Í É•…‘½ÕÐ°Ñ¡•¸Í•Á…É…Ñ”‰±½¬¡¥¹ÑÌ¸áÁ±¥¥Ð(Àõ¹½¸µµ•Ñ…°¡‰±…¬¤¼ÈÔÔõµ•Ñ…°¡Ý¡¥Ñ”¤ìÉ½Õ¡¹•ÍÌÀõÍµ½½Ñ ¡‰±…¬¤¼ÈÔÔõÉ½Õ ¡Ý¡¥Ñ”¤¸)!•±À…¹¹½ÐÍ¥Ð‰•Í¥‘”¹Õµ•É¥Œ½ÕÑÁÕÐ¸½µÁ…Ð1P‘½¬½ÍÉ½±°½™½½Ñ•ÈÉ•Ñ…¥¹•¸)9¼Í…±…È½‘…Ñ„½•áÁ½ÉÐ½±¥¡ÐÍ•µ…¹Ñ¥Œ¡…¹”ìÉ•™±•Ñ¥½¸äÈÔÉ•µ…¥¹ÌÍ•Á…É…Ñ”Õ¹É•Í½±Ù•)É•Á½ÉÐ°¹½Ð¥µÁ±¥•AML™É½´äÈØ½ÈÑ¡¥Ì±…É¥™¥…Ñ¥½¸¸9…Ñ¥Ù”•áÁ½ÉÐÁÉ½Ñ•Ñ•¸()9•áÐÉ•ÅÕ•ÍÑ•¹…ÉÉ½Ü‰ÉÕÍ è½É¥¥¹…°Q½½°Í•±•Ñ½È…¥¹ÌÉ…Í•È¸M…µ”Í…µÁ±•ÉÌ°)ÁÉ•ÍÍÕÉ”½Í¥é”½¡…É‘¹•ÍÌ½µ…á¥µÕ´Á•Èµ½¹Ñ…Ð½Ù•É…”…¹•á¥ÍÑ¥¹œ½µµ¥Ð½¡•­Á½¥¹Ð¼)=\½Á½½±Ì¸QÉ…¹ÍÁ…É•¹Ð½±½ÕÈ½Ù•É±…åÌÉ•‘Õ”…±Á¡„½¹±ä°É•Ñ…¥¹¥¹œI½Í½ÕÉ”½‰…Í”ì)	…Í”É•Í•ÑÌÝ¡¥Ñ”¸I½Õ¡¹•ÍÌÉ•Í•ÑÌÈÔÔ°5•Ñ…±¹•ÍÌÀ°µ…Í­ÌÉ•Ù•…°€¡É…ÜÀ¥˜¥¹Ù•ÉÑ•°(ÈÔÔ½Ñ¡•ÉÝ¥Í”¤¸=É¥¥¹…°¥µ…”½±½ÕÈÍÑ…åÌÉ•Ñ…¥¹•½É•…µ½¹±äì•É…Í”¥ÑÌµ…Í¬¸)9¼Í•¹”½µ…Ñ•É¥…°½Á…¥Ñä°‘•ÍÑÉÕÑ¥Ù”¥µ…”‰…­¥¹œ½È‘•±•Ñ¥½¸½˜±…å•È½É•Í½ÕÉ”¸)½±½ÕÈ½¹ÑÉ½±Ì‘¥Í…‰±”™½ÈÉ…Í•È…¹É•ÍÑ½É”½¸É•ÑÕÉ¸ì½±½ÕÈ‰ÉÕÍ Í•ÑÑ¥¹œÉ•Ñ…¥¹•¸)…¹•±±…Ñ¥½¸½Í•ÑÑ¥¹Ì½‰½‘äµ±½ÍÌ½™…¥±•¡•­Á½¥¹ÐÉ•Ñ…¥¸½É¥¥¹…°Á¥á•±Ì½¡¥ÍÑ½Éä¸)=É¥¥¹…°	ÉÕÍ …¹…•ÁÑ•Q…À¥±°É•Ñ…¥¸Í•µ…¹Ñ¥Ìì¹¼¹•ÜÁ½¥¹Ñ•È½¡¥ÍÑ½Éä½Ý¹•È¸((Í¹•Ü¥¹Ñ•É…Ñ¥½¸Ñ•ÍÑÌ½Ù•È…±Á¡„½Ù•É…”½I½¹¼µ½À½…¹•°ì…ÑÕ…°U$½Ù•É±…ä½	…Í”)¥Í½±…Ñ¥½¸€¬U¹‘½I•‘¼½M…Ù•=Á•¸½•á…Ð½µÁ½Í•¹…Ñ¥Ù”A9ì‘•™…Õ±ÑÌ½µ…Í¬¥¹Ù•ÉÍ¥½¸¼)Í…±…È¥¹‘•Á•¹‘•¹”…¹É•™ÕÍ…°É½±±‰…¬¸á¥ÍÑ¥¹œ™¥±°½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌ½µ…Í¬ÈÍAMLì)™Õ±°½…¡”½ÁÕ‰±¥…Ñ¥½¸‰•±½Ü¸M¡…É•µ…¥¸½1…ˆÉ…ÍÑ•ÈÉ•Ù•ÉÍ”É…Á É•Á¥¹¹•äÈÜ½¹±äì)ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸½µ½‘•±±¥¹œ½UX½ÁÉ½©•Ð½¹…Ñ¥Ù”ÝÉ¥Ñ•ÈÕ¹¡…¹•¸)Y%äÈÜèÉ•…5•Ñ…±¹•ÍÌÀ¼ÈÔÔ¡¥¹Ð‰•±½ÜÍ±¥‘•ÈÝ¥Ñ ¹¼©½¥¹•Ñ•áÐì•É…Í”„Á…¥¹Ñ•)½Ù•É±…äÑ¼É•Ù•…°±½Ý•ÈÁ…¥¹Ð°U¹‘½I•‘¼ì•É…Í”	…Í”½Í…±…ÉÌ°ÍÝ¥Ñ 	ÉÕÍ ½¥±°‰…¬¸)±Á¡„A9Ñ¥ÁÌ¹•áÐ°UXµÍ…™”‰±ÕÈ½ÍµÕ‘”É•µ…¥¸ÅÕ•Õ•¸I•™±•Ñ¥½¸‘¥…¹½Í¥ÌÉ•µ…¥¹Ì)½Á•¸…¹Í¡½Õ±ÕÍ”‘•Ù¥”½Ù•ÉÍ¥½¸½É•¹‘•É•È•Ù¥‘•¹”°¹¼™ÕÉÑ¡•È±¥¡Ñ¥¹œÕ•ÍÍ•Ì¸((¸äÈÜ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸Àè€¨¨È°ØÐÌAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì(Í¹•Ü•É…Í•È¥¹Ñ•É…Ñ¥½¹Ì°¹•…É‰äÈÍAML…¹É•±•…Í”ÕAML¸9¼Ñ•ÍÑÌÉ•±…á•¸)AÉ½Ñ•Ñ•äÈØ¥±°¼äÈÐÑ½½±‰…È½¹…Ñ¥Ù”•áÁ½ÉÐ½5Õ±Ñ¤Ä¸À½™É½é•¸É•Ñ…¥¹•¸M…±…Èµ…ÁÁ¥¹œ)Õ¹¡…¹•ì±…å½ÕÐ½‘•Ù¥”½¹™¥Éµ…Ñ¥½¸…¹É…Í•È¡…¹‘Ìµ½¸…Ñ”Á•¹‘¥¹œ¸)AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•É•É•ÍÍ¥½¸½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌ¸((ŒŒ€¸äÈÜÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€É™…ˆÍ•ˆÜÐÍÀÁ…‘™ˆäÍŒÀÔÌäÔÝ…Åå‰”á˜Ù˜Øá€°Ñ•ÍÑ•ÑÉ•”)ŒäÝ„àÐÈÍ˜ÈÌÙ…•ŒÔÐÉˆÌÄÐÔÐÅˆå„äÔÈäàÐÝˆÀÐÄÍ€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ð…Ñ„)É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°Ñ•ÍÑ•±½…°ÑÉ•”ì™•Ñ¡•½É¥¥¸½µ…¥¸µ…Ñ¡••á…Ñ±ä¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•É•É•ÍÍ¥½¸€ÌäÌØääàÐÔÔÍ€€¼©½ˆ€ÄÄàÐÔÔÐÌÌäàÕ€‰½Ñ Á…ÍÌ(È°ØÐÌÑ•ÍÑÌ°é•É¼™…¥±ÕÉ•Ì½Í­¥ÁÌì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•Ì)€ÌäÌØääàÐÄÄÙ€°‘•Á±½ä©½ˆ€ÄÄàÐÔÔÔààØÀá€°½µÁ±•Ñ•…±°ÍÑ•ÁÌÍÕ•ÍÍ™Õ±±ä¸)±°Ää™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Í½ÕÉ”èÍ¡•±°½Ù•ÉÍ¥½¸°Á…¥¹Ñ•È½½É”½Í¡…É•É…ÍÑ•È°)½µÁ±•Ñ”¡…¹•1…ˆÉ…Á °É•½Ù•Éä°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°É•Ñ…¥¹•Í…±…È½½‘•Œ½¹…Ñ¥Ù”)…¹Á…¥¹Ð•áÁ½ÉÐ½µ…Ñ•É¥…°½É•™±•Ñ¥½¸½UX½Ý¹•ÉÌ¸%¹¥Ñ¥…°¥¸µ™±¥¡ÐÉ•…‘ÌÍ•ÉÙ•äÈØì)™¥¹…°¡•­•É…Á µ…Ñ¡•ÌäÈÜ¸9¼™É½é•¸½µ½‘•±±¥¹œ½UX½ÁÉ½©•Ð½ÝÉ¥Ñ•È¡…¹•Ì¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÁÉ½½˜¥Ì‘½Ìµ½¹±ä¸	Õ¥±äÈÜ½µÁ±•Ñ”…¹É•…‘ä)™½È±…‰•°Í•Á…É…Ñ¥½¸½•áÁ±¥¥ÐÀ´ÈÔÔµ•…¹¥¹œ…¹Q½½°É…Í•È½Ù•É±…äÉ•Ù•…°½U¹‘½I•‘¼°)	…Í”Ý¡¥Ñ”½Í…±…È‘•™…Õ±ÑÌ…¹É•ÑÕÉ¸Ñ¼	ÉÕÍ ½…•ÁÑ•Q…À¥±°¸ÑÕ…°¥A…Ñ•áÐ)±…å½ÕÐ…¹É…Í•È™••°É•µ…¥¸‘•Ù¥”µÁ•¹‘¥¹œì…ÕÑ½µ…Ñ•Ñ•ÍÑÌ…É”¹½ÐÙ¥ÍÕ…°ÁÉ½½˜¸)UÍ•ÈäÈØ¥±°…¹äÈÐÑ½½±‰…ÈAMLÁÉ½Ñ•Ñ•ì¹…Ñ¥Ù”•áÁ½ÉÐ½ÉÉ•Ð¸±Á¡„A9Ñ¥ÁÌ)¹•áÐìUXµÍ…™”‰±ÕÈ½ÍµÕ‘”Á•¹‘¥¹œ¸I•™±•Ñ¥½¸äÈÔÉ•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•°)¹½Ð„Í±¥‘•È¥¹Ù•ÉÍ¥½¸½È…¸¥¹™•ÉÉ•AML™É½´Ñ¡”½ÉÉ•Ñ•¡•±ÀÑ•áÐ¸((ŒŒ€¸äÈàƒŠPA…¥¹ÐÍÑ…åÌ½Á•¸…É½ÍÌU¹‘¼½I•‘¼ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸äÈÜAMLÁÉ½Ñ•Ñ•èÍ…±…È¡¥¹Ð±…å½ÕÐ…¹É…Í•È°…±½¹Í¥‘”€¸äÈØ¥±°…¹(¸äÈÐÑ½½±‰…È¸I•ÅÕ•ÍÑ•¡¥ÍÑ½Éä•ÍÑÕÉ”™¥àÑ…­•ÌÁÉ¥½É¥Ñä½Ù•ÈA9…±Á¡„Ñ¥ÁÌ¸)Õ‘¥Ðè½É¥¥¹…°µ…¥¸‘½U¹‘¼½‘½I•‘¼É•ÍÑ½É•ÌÍ•¹”½‰½‘ä…¹Á…¥¹Ñ•È±½Í•Ì½¸‘¥ÍÁ½Í…°ì)A…¥¹Ð™½½Ñ•È…±Í¼•áÁ±¥¥Ñ±ä±½Í•¸=É¥¥¹…°¡¥ÍÑ½Éä½Ý¹•È¹½Ü‰É…­•ÑÌÉ•ÍÑ½É…Ñ¥½¸)Ý¥Ñ Á…¥¹Ñ•ÈÁÉ•Á…É…Ñ¥½¸½É•ÍÕµ”¸…¹•°ÑÉ…¹Í¥•¹ÐÍÑÉ½­”½¥µ…”‰•™½É”…ÁÑÕÉ”°±½Í”)½±‘¥ÍÁ±…ä°É•½Á•¸½¸É•‰Õ¥±Ð…Ñ¥Ù”‰½‘äìÉ•Ñ…¥¸±…å•È¥˜ÁÉ•Í•¹Ð°¡…¹¹•°½µ…Í¬¥˜)Ù…±¥°1¥Ð½¡…¹¹•°ÁÉ•Ù¥•Ü…¹•á¥ÍÑ¥¹œ‰ÉÕÍ ½…Ñ¥½¸½Í±¥‘•È½¹ÑÉ½±Ì¸9¼‘ÕÁ±¥…Ñ”)¡¥ÍÑ½Éä½È•ÍÑÕÉ”½Ý¹•È½¡•­Á½¥¹Ð¸µÁÑä¡¥ÍÑ½Éä…¹É…Á¥É•Á•…Ñ•¡¥ÍÑ½ÉäÉ•Ñ…¥¸)A…¥¹Ðì½¹”½½Ñ¡•ÈÍ•ÍÍ¥½¸½½‰©•Ð¡…¹•Ì‘•™•…ÐÍÑ…±”É•½Á•¸¸=É¥¥¹…°ÑÝ¼½Ñ¡É•”µ™¥¹•È)•ÍÑÕÉ•Ì°Ñ½½±‰…È…¹™½½Ñ•ÈÍ¡…É”Ñ¡¥ÌÁ…Ñ ¸¥Ù”É•É•ÍÍ¥½¹Ì•á•ÕÑ”½É¥¥¹…°µ…¥¸)U¹‘¼½I•‘¼…¹Ñ½Õ µ•¹™Õ¹Ñ¥½¹ÌÝ¥Ñ É•…°Í•¹”Í¹…ÁÍ¡½ÑÌ°Á…¥¹ÐÉ•Í½ÕÉ•Ì…¹U$¸)I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÉ•µ…¥¹ÌÕ¹É•Í½±Ù•ì¹…Ñ¥Ù”9½µ…•áÁ½ÉÐÉ•µ…¥¹Ì½ÉÉ•Ð¸±Á¡„)A9Ñ¥ÁÌ¹•áÐ°UXµÍ…™”‰±ÕÈ½ÍµÕ‘”Á•¹‘¥¹œ¸•Ù¥”€¸äÈà…•ÁÑ…¹”Á•¹‘¥¹œ¸((´mát€¸äÈàèÁ…¥¹ÐÑÝ¼µ…É­Ì°ÑÝ¼µ™¥¹•ÈU¹‘¼Ñ¡•¸½¹Ñ¥¹Õ”Á…¥¹Ñ¥¹œÝ¥Ñ¡½ÕÐÉ•½Á•¹¥¹œ¸(´mát€¸äÈàèÑ¡É•”µ™¥¹•ÈI•‘¼…¹A…¥¹Ð™½½Ñ•ÈU¹‘¼½I•‘¼­••À¡…¹¹•°½Ñ½½°Í•ÑÑ¥¹Ì¸(´mát€¸äÈàè½¹”ÍÑ¥±°•á¥ÑÌA…¥¹ÐìÉ…Á¥¡¥ÍÑ½Éä‘½•Ì¹½ÐÉ•½Á•¸„±½Í•Í•ÍÍ¥½¸¸((¸äÈà±½…°9½‘”ÈÐ™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ØÐàAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì)™¥Ù”¹•Ü¡¥ÍÑ½ÉäÉ•É•ÍÍ¥½¹Ì…¹É•Ù¥•Ý•É•±•…Í”½¹ÑÉ…ÐÕAML¸AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À)…¹™É½é•¸‰Õ¥±‘ÌÕ¹¡…¹•¸AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”µ‰åÑ”Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌ¸((ŒŒ€¸äÈàÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ØÔàÑ˜áÀØÁ‘‰‰”á„ÔÉ˜äÀÅàÄÑØÔÕ•”ÐÈÀå‰…€°Ñ•ÍÑ•ÑÉ•”)”ÔÔÑ˜ÁŒÜÜÀÄá•ˆÑˆÍ™ÐÄÌÑ…ˆàÁ˜ÔÁ„á‰‘‘äÁ€°ÁÕ‰±¥Í¡•Ñ¡É½Õ ½¹¹•Ñ•¥Ð…Ñ„)Ý¥Ñ Ñ¡”•á…Ð±½…±±äÑ•ÍÑ•ÑÉ•”ì™•Ñ¡•½É¥¥¸½µ…¥¸µ…Ñ¡•…¹Ý½É­¥¹œÑÉ•”±•…¸¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÉÕ¸€ÌäÌÜÌÈÀØÄàÝ€°©½ˆ€ÄÄàÐØÔÐÌÔàÐÉ€°)‰½Ñ €¨¨È°ØÐàAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì™Õ±°¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•¸A…•ÌÉÕ¸)€ÌäÌÜÌÈÀÔÔÌÝ€°‘•Á±½ä€ÄÄàÐØÔÔÜÌÈÀÉ€°½µÁ±•Ñ•ÍÕ•ÍÍ™Õ±±ä¸±°ÄÜ¡•­•™É•Í )±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°¡…¹•µ…¥¸½Á…¥¹Ñ•È°É•½Ù•Éä°Õ¹¡…¹•Á…¥¹Ð)½É”½É…ÍÑ•È½Í…±…È½ÁÉ½©•Ð½•áÁ½ÉÐ½É•™±•Ñ¥½¸½UX…¹ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À¸É½é•¸‰Õ¥±‘Ì)Õ¹¡…¹•¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÑ¡¥ÌÁÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±ä¸()	Õ¥±äÈà½µÁ±•Ñ”…¹É•…‘ä™½ÈÑÝ¼µ™¥¹•ÈU¹‘¼€¼Ñ¡É•”µ™¥¹•ÈI•‘¼Ý¡¥±”A…¥¹ÐÍÑ…åÌ)½Á•¸°½¹Ñ¥¹Õ•A•¹¥°ÍÑÉ½­•Ì°É•Ñ…¥¹•¡…¹¹•°½ÁÉ•Ù¥•Ü½‰ÉÕÍ ½¹ÑÉ½±Ì…¹½É¥¥¹…°)A…¥¹Ð™½½Ñ•È¡¥ÍÑ½Éä¸½¹”ÍÑ¥±°±½Í•Ì¸UÍ•ÈäÈÜAMLÁÉ½Ñ•Ñ•ì…ÑÕ…°äÈà¥A…)…•ÁÑ…¹”Á•¹‘¥¹œ¸I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÉ•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•ì¹…Ñ¥Ù”•áÁ½ÉÐ)½ÉÉ•Ð¸9•áÐ‰½Õ¹‘•A9…±Á¡„Ñ¥ÁÌìUXµÍ…™”‰±ÕÈ½ÍµÕ‘”Á•¹‘¥¹œ¸((ŒŒ€¸äÈäƒŠPA9…±Á¡„‰ÉÕÍ Ñ¥ÁÌì€¸äÈàÕÍ•ÈAMLƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸äÈàAMLÁÉ½Ñ•ÑÌA…¥¹ÐÍÑ…å¥¹œ½Á•¸…É½ÍÌÑÝ¼½Ñ¡É•”µ™¥¹•È…¹™½½Ñ•È)U¹‘¼½I•‘¼°É•Ñ…¥¹•½¹ÑÉ½±Ì…¹½¹Ñ¥¹Õ•A•¹¥°ÍÑÉ½­•Ì¸Õ‘¥Ðµ…¥¸Õ•”á‰ˆÔÐè)½É¥¥¹…°Í¡…É•É…ÍÑ•È½¥¹ÁÕÐ½¡¥ÍÑ½Éä…±É•…‘ä½Ý¸‰ÉÕÍ …¹É…Í•Èì¹¼ÕÍÑ½´Ñ¥À)¥µÁ½ÉÑ•È½Í…µÁ±•È¸‘‰½Õ¹‘•A9½Ù•É…”Ñ¡É½Õ Ñ¡½Í”M5½Ý¹•ÉÌ°É•ÕÍ¥¹œäÀÜ)¥µ…”ÁÉ•™±¥¡Ð½‘•½‘”¸	ÉÕÍ Í•ÑÑ¥¹Ìè1½……±Á¡„A9€¼É½Ñ…Ñ¥½¸€¼I½Õ¹Ñ¥À¸)A9Š&ÈÔÛ
È¼ÈÔÙ-¥°±Õµ¥¹…¹—]…±Á¡„½Ù•É…”ìÝ¡¥Ñ”Á…¥¹ÑÌ°‰±…¬½ÑÉ…¹ÍÁ…É•¹ÐÍ­¥ÁÌ¸)=Ý¹•HàÑ¥ÃŠ&ØÑ-¥°½Á¥•Á•È½¹Ñ…ÐìÑ½Àµ™¥ÉÍÐ½…ÍÁ•ÐµÁÉ•Í•ÉÙ¥¹œÉ½Ñ…Ñ•‰¥±¥¹•…È)Í…µÁ±¥¹œ¥¸UXÑ•á•±Ì¸±Á¡„É•Á±…•ÌÉ½Õ¹¡…É‘¹•ÍÌ°½É¥¥¹…°ÁÉ•ÍÍÕÉ”½½Á…¥Ñä…À¼)Í½ÕÉ”µ½Ù•È½•É…Í”½…¹•°É•Ñ…¥¹•¸]¡½±”µ½‰©•Ð¥±°¥¹½É•ÌÑ¥À¸9¼¹•ÜÁ½¥¹Ñ•È°)¡¥ÍÑ½Éä°Á…¥¹ÐµÉ•Í½ÕÉ”½ÁÉ½©•Ð½¹…Ñ¥Ù”ÝÉ¥Ñ•È½Èµ½‘•±±¥¹œ­•É¹•°¸Q¥ÁÌ½É½Ñ…Ñ¥½¸…É”)Í•ÍÍ¥½¸ÁÉ•™•É•¹•Ì°É•Ñ…¥¹•Ñ¡É½Õ äÈàÉ•½Á•¸‰ÕÐ¹½ÐÍ…Ù•¥¸¹‰½á±…ˆ¸5…É­ÌÁ•ÉÍ¥ÍÐ¸)1…Ñ”½¥¹Ù…±¥¥µÁ½ÉÑÌÉ•Ñ…¥¸ÁÉ•Ù¥½ÕÌÑ¥À…¹½µµ¥ÑÑ•Ý½É¬ì½É¥¥¹…°‘•½‘”±•…¹ÕÀ¸)I•…‘½Ì½Á…¥¹Ðµ…±Á¡„´äÈä¹µ¸½ÕÈ™½ÕÍ•Ñ•ÍÑÌ½Ù•È±¥µ¥ÑÌ½±•…¹ÕÀ½½Ù•É…”½Ý¹•ÉÍ¡¥À°)É½Ñ…Ñ¥½¸½…ÍÁ•Ð½…¹•°½•É…Í”°É•…°U$½¡¥ÍÑ½Éä½ÁÉ½©•Ð½¹…Ñ¥Ù”A9…¹…Íå¹ŒÉ•™ÕÍ…°¸)=É¥¥¹…°Í¡…É•É…ÍÑ•ÈÉ•Ù•ÉÍ”µ…¥¸½1…ˆ…¡”É…Á äÈäÉ•Ù¥•Ý•ì5Õ±Ñ¤Ä¸À½™É½é•¸¥¹Ñ…Ð¸)I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÉ•µ…¥¹ÌÕ¹É•Í½±Ù•°¹…Ñ¥Ù”•áÁ½ÉÐ½ÉÉ•Ð¸±Á¡„‘•Ù¥”…Ñ”Á•¹‘¥¹œ¸)9•áÐ‘•Ù¥”…±Á¡„™••‘‰…¬°Ñ¡•¸UXµÍ…™”‰±ÕÈ½ÍµÕ‘”ìÙ¥•ÝÁ½ÉÐ½‰…­•<…¹‘”µ‰…Í•)Í•…´µ…ÕÑ¡½É¥¹œÉ•µ…¥¸ÅÕ•Õ•™½È•á¥ÍÑ¥¹œµ½Ý¹•È…Õ‘¥ÑÌ°¹½Ð‘•±¥Ù•É•™•…ÑÕÉ•Ì¸)Y…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½ÝÌì¹¼É•¹‘•É•½È‘•Ù¥”Á•É™½Éµ…¹”±…¥´¸((´lt€¸äÈäè	ÉÕÍ Í•ÑÑ¥¹ÌƒŠH1½……±Á¡„A9ƒŠ&ÈÔÛ
ÈìÝ¡¥Ñ”Á…¥¹ÑÌ°‰±…¬½ÑÉ…¹ÍÁ…É•¹ÐÍ­¥ÁÌ¸(´lt€¸äÈäèÉ½Ñ…Ñ”…Íåµµ•ÑÉ¥…°Ñ¥À°Á…¥¹Ð½•É…Í”½Ù•É±…äìU¹‘¼½I•‘¼ÍÑ…åÌ¥¸A…¥¹Ð¸(´lt€¸äÈäèI½Õ¹Ñ¥ÀÉ•ÍÑ½É•Ì¥ÉÕ±…È‰ÉÕÍ ìM…Ù”½=Á•¸…¹9=5É•Ñ…¥¸Á…¥¹Ñ•µ…É­Ì¸((¸äÈä™¥¹…°±½…°9½‘”ÈÐ¸Ää¸Àè€¨¨È°ØÔÈAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)½ÕÈ¹•Ü…±Á¡„Ñ•ÍÑÌ…¹½É¥¥¹…°¹•…É‰äÄáAMLìÉ•±•…Í”½…¡”¡•­Ì¥¹±Õ‘•¸)9¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸M¡…É•É…ÍÑ•Èµ…¥¸½1…ˆÉ•Ù•ÉÍ”É…Á äÈäÉ•Ù¥•Ý•ì5Õ±Ñ¤Ä¸À)…¹™É½é•¸‰Õ¥±‘ÌÕ¹¡…¹•¸AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌ¸((ŒŒ€¸äÈäÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”Œå˜Èå™„ÈÐÁ™„àÝ„Ñ„ÌÌÄÀÄÌàÀÔáˆÅŒÙ˜äÀÙ”Ôá…€°Ñ•ÍÑ•ÑÉ•”)…™‘˜ÜÝŒá‘˜ØÄÉ˜ÐÄÄØÔå•„Å™˜äÔÍˆÕ…‘”ØäÉ™€°ÁÕ‰±¥Í¡•Ù¥„½¹¹•Ñ•¥Ð…Ñ„¸)±°ÄàÕÁ±½…‘•‰±½‰Ì…¹ÑÉ•”µ…Ñ ±½…±±äÑ•ÍÑ•Í½ÕÉ”ì™•Ñ¡•µ…¥¸¥‘•¹Ñ¥…°¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÐÀäÔÜÀäÐä½©½ˆÄÄàÔàÌÜÀàÐÈÀ‰½Ñ (¨¨È°ØÔÈAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì™Õ±°¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•ÌÌäÐÀäÔÜÀàÜÌ°)‘•Á±½äÄÄàÔàÌäÌÔÔÀÌ½µÁ±•Ñ•ÍÕ•ÍÍ™Õ±±ä¸±°ÄØ™É•Í ¡•­•±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ è)Í¡•±°½Ù•ÉÍ¥½¸°•Ù•Éä¡…¹•ÉÕ¹Ñ¥µ”½1…ˆ½Ý¹•È°É•½Ù•Éä°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°)É•Ñ…¥¹•¥µ…”¥µÁ½ÉÑ•È½•áÁ½ÉÐ½Á…¥¹ÐÍÕÉ™…”¸É½é•¸‰Õ¥±‘ÌÕ¹¡…¹•¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÁÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±ä¸	Õ¥±äÈä½µÁ±•Ñ”)…¹É•…‘ä™½È	ÉÕÍ Í•ÑÑ¥¹ÌƒŠH1½……±Á¡„A9Š&ÈÔÛ
È¼ÈÔÙ-¥°É½Ñ…Ñ”½Á…¥¹Ð½½Ù•É±…ä)É…Í•È°U¹‘½I•‘¼…¹½¹Ñ¥¹Õ•Á…¥¹Ñ¥¹œ°I½Õ¹Ñ¥À°M…Ù•=Á•¸½•áÁ½ÉÐÉ•Ñ…¥¹•µ…É­Ì¸)UÍ•ÈäÈáAMLÁÉ½Ñ•Ñ•ìäÈäÙ¥Í¥‰±”½A•¹¥°½Á¥­•È½±…Ñ•¹ä…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ¸)I•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•ì¹…Ñ¥Ù”•áÁ½ÉÑÌ½ÉÉ•Ð¸9•áÐ…±Á¡„)™••‘‰…¬Ñ¡•¸UXµÍ…™”‰±ÕÈ½ÍµÕ‘”ì<…¹‘”Í•…´…Õ‘¥ÑÌÅÕ•Õ•°¹½Ð¥µÁ±•µ•¹Ñ•¸((ŒŒ€¸äÌÀƒŠPÍ½±¥=‰©•Ðµµ½‘”‘¥ÍÁ±…ä°¹¼µ½‘•±±¥¹œ…”ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•ÅÕ•ÍÑÌÉ•µ½Ù¥¹œÑ¡”‘¥ÍÑÉ…Ñ¥¹œ=‰©•Ðµµ½‘”`µÉ…ä°•ÍÁ•¥…±±äÝ¡¥±”Á…¥¹Ñ¥¹œ¸)Õ‘¥ÐÕÉÉ•¹ÐÙ”ØÉ™”Ì¼¸äÈäèµ…¥¸…‘‘…”ÕÍ•Ì‘•ÁÑ¡Q•ÍÐé™…±Í”¹•ÕÑÉ…°…á¥Ìµ±¥¹”µ…Ñ•É¥…°)™½È•Ù•ÉäÍ•±•Ñ•=‰©•Ð•‘”°‘É…Ý¸½Ù•ÈÍ½±¥‰½‘ä½Á…¥¹Ð¸ÑÕ…°Y%\`µI…ä¥Ì„)Í•Á…É…Ñ”•áÁ±¥¥Ð‘¥…¹½ÍÑ¥Œµ½‘”ì‘¼¹½Ð½¹™ÕÍ”¥ÐÝ¥Ñ Ñ¡¥Ì…ÕÑ½µ…Ñ¥Œ…”¸)=É¥¥¹…°…”‰…Ñ •ÑÌ½ÁÑ¥½¹…°Í¡½Ý‘•Ì¡‘•™…Õ±ÑÑÉÕ”¤ìµ…¥¸Á…ÍÍ•Ì™…±Í”¥¸=‰©•Ð°)Í¡½ÝY•ÉÑ¥•ÌÉ•µ…¥¹ÌY•ÉÑ•àµ½¹±ä¸MÕÉ™…”…”•½µ•ÑÉä½‰…Ñ¡•Ì…É”¹½Ð…±±½…Ñ•ì¥Í½±…Ñ•±½½Í”•‘•ÌÉ•µ…¥¸)Ù¥Í¥‰±”Ý¥Ñ ½É‘¥¹…Éä‘•ÁÑ µÑ•ÍÑ••‘•5…Ñ•É¥…°Í¼Ý¥É”µ½¹±ä½‰©•ÑÌ‘¼¹½ÐÙ…¹¥Í ì)½É¥¥¹…°¥¹Ù¥Í¥‰±”¥¹‘•á••‘”½Ù•ÉÑ•àÁ¥­¥¹œÁÉ½á¥•Ì½‰É¥‘”É•¥ÍÑÉäÉ•µ…¥¸¥¹Ñ…Ð¸)5¥ÉÉ½È…”¥Ì…±Í¼½µ¥ÑÑ•¥¸=‰©•Ðì…Ñ¥Ù”MÕ‰¹¼±½¹•È•Ù…±Õ…Ñ•ÌÍÁ…É”µ¥ÉÉ½É•)‰…Í”Í½±•±ä™½ÈÑ¡…Ð½µ¥ÑÑ•Ý¥É”¸=É¥¥¹…°•Ù…±Õ…Ñ•ÍÕÉ™…”…¹¥ÑÌ•½µ•ÑÉä…¡”)…É”Õ¹¡…¹•¸Y•ÉÑ•à½‘”½…”É•ÍÑ½É”Ñ¡•¥È½É¥¥¹…°…•Ì…¹µ…Ñ•É¥…°½½É‘•È½Í•±•Ñ¥½¸)Í•µ…¹Ñ¥Ì¸±•…¸½M½™Ð°5Õ±Ñ¤½É½ÕÀÑ¥¹ÑÌ°¥éµ½Ì°¡¥ÍÑ½Éä°‰ÉÕÍ ½Á…¥¹Ð½µ…Ñ•É¥…°½•áÁ½ÉÐ)½Ý¹•ÉÌÕ¹Ñ½Õ¡•¸áÁ±¥¥ÐY%\]¥É”½`µI…äµ½‘•ÌÉ•Ñ…¥¸‘•±¥‰•É…Ñ”ÕÍ•È½¹ÑÉ½°¸)9¼™É…µ”µÉ…Ñ”½È‰É½…µ•µ½Éä±…¥´ìÉ•µ½Ù•Ù¥ÍÕ…°…”‘É…ÝÌ½…±±½…Ñ¥½¸½¹±ä¸()QÝ¼¹•Ü¹…Ñ¥Ù”µ½Ý¹•ÈÑ•ÍÑÌ½Ù•È=‰©•ÓŠQ½µÁ½¹•¹ÐÑÉ…¹Í¥Ñ¥½¹Ì°…‰Í•¹ÐÙ¥ÍÕ…°‰…Ñ¡•Ì°)…ÑÕ…°Q¡É•”É…å…ÍÐÁÉ½áä%Ì½‘¥ÍÁ½Í…°°µ¥ÉÉ½É•MÕ‰‰…Í”µ…±°½Õ¹ÑÌ…¹•á…ÐÍ½±¥)•½µ•ÑÉä¸á¥ÍÑ¥¹œàÄÀ¼àÔÄ=‰©•ÐÙ¥ÍÕ…°µ…”•áÁ•Ñ…Ñ¥½¸É•Á±…•‰ä¹•ÜÕÍ•ÈÉ•ÅÕ•ÍÐì)…±°½µÁ½¹•¹Ð½ÁÉ½áä…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸á¥ÍÑ¥¹œàÔÀ¼àÀä¼àÄÈÉ•¹‘•È™¥áÑÕÉ•Ì¹½ÜÍÕÁÁ±äÑ¡•¥ÈÉ•…°Í•±•Ñ¥½¹5½‘”ô™…”œ)‘•Á•¹‘•¹äìàÀä=‰©•Ð±½½Í”µÝ¥É”µ…Ñ•É¥…°•áÁ•Ñ…Ñ¥½¸™½±±½ÝÌÑ¡”¹•Ü‘•ÁÑ µÑ•ÍÑ•)Á½±¥ä°…±°½µÁ½¹•¹Ð½•½µ•ÑÉä½µ•Ñ…‘…Ñ„½•¹Õµ•É…Ñ¥½¸…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸9¼ÁÉ½‘ÕÑ¥½¸)™…±±‰…¬½ÈÝ•…­•¹•…¡”½Ñ¥µ¥¹œ¡•­Ì¸)½ÕÍ•…”½…¡”½Ñ¥µ¥¹œ½É•±•…Í”ÈåAML…¹•…É±¥•ÈÁ…¥¹Ðµ¡¥ÍÑ½Éä½Ñ¥¹Ð½…”ÈÑAML¸)1•…äàÀä±½½Í”µÝ¥É”¹½Éµ…±¥é…Ñ¥½¸¥¹ÍÁ•ÑÌ„1=9è½É¥¥¹…°±½½Í”•‘•Ì ¤…¸…‘)¥ÑÌ¡¥ÍÑ½É¥…°™…•Íl´ÅtÍ•¹Ñ¥¹•°¸=É¥¥¹…°Í½ÕÉ”µÁÉ•Í•ÉÙ…Ñ¥½¸…ÍÍ•ÉÑ¥½¸É•Ñ…¥¹•¸)=¹±äµ…¥¸½…”‰…Ñ …¹Í¡•±°½É•½Ù•Éä…¡”äÌÀì5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸±Á¡„äÈä)µ…¹Õ…°…Ñ”¹½Ð¥¹™•ÉÉ•AML¸I•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•ì•áÁ½ÉÑÌ½ÉÉ•Ð¸)9•áÐY%=‰©•Ð½É‰¥Ð½Á…¥¹Ð¹¼Ñ¡É½Õ µ…”ì½µÁ½¹•¹Ð…•ÌÉ•ÑÕÉ¸ì5Õ±Ñ¤½¥éµ¼…¹)A…¥¹ÐU¹‘½I•‘¼ÍÑ…ä¥¹Ñ…Ð¸Q¡•¸É•ÍÕµ”…±Á¡„™••‘‰…¬½UXµÍ…™”‰±ÕÈ½ÍµÕ‘”ì<½Í•…µÌÅÕ•Õ•¸)Õ±°Ù…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸™½±±½ÝÌì¹¼É•¹‘•É•½¥A…ÁÉ½½˜¥¹™•ÉÉ•™É½´9½‘”¸((´mát€¸äÌÀèÍ•±•Ñ•=‰©•ÐÍÑ…åÌÍ½±¥Ý¥Ñ¡½ÕÐ…ÕÑ½µ…Ñ¥ŒÑ¡É½Õ µµ•Í …”ì½É‰¥Ð…¹Á…¥¹Ð¸(´mát€¸äÌÀèY•ÉÑ•à½‘”½…”É•ÍÑ½É”…•ÌìÉ•ÑÕÉ¸=‰©•Ð¡¥‘•ÌÑ¡•´°¥¹±Õ‘¥¹œµ¥ÉÉ½ÉÌ½MÕ‰¸(´mát€¸äÌÀè=‰©•Ð5Õ±Ñ¤Í•±•Ñ¥½¸½¥éµ¼…¹A…¥¹ÐU¹‘½I•‘¼½½¹Ñ¥¹Õ”É•µ…¥¸ÕÍ…‰±”¸((¸äÌÀ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØÔÐAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)½ÕÍ•¹…Ñ¥Ù”…”½…¡”½Ñ¥µ¥¹œ½É•±•…Í”ÈåAMLì½É¥¥¹…°ÍÕÉ™…”½ÁÉ½áä½µ•Ñ…‘…Ñ„°)¡¥ÍÑ½Éä½Á…¥¹Ð½…±Á¡„½¥µ…”½¹…Ñ¥Ù”•áÁ½ÉÐ…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸=¹±äÍÕÁ•ÉÍ•‘•=‰©•Ð)Ù¥ÍÕ…°…”…¹‘•ÁÑ µÑ•ÍÑ•±½½Í”µÝ¥É”•áÁ•Ñ…Ñ¥½¹Ì¡…¹•¸5Õ±Ñ¤Ä¸À½™É½é•¸¥¹Ñ…Ð¸)AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌì¥A…‘¥ÍÁ±…ä…•ÁÑ…¹”Á•¹‘¥¹œ¸((ŒŒ€¸äÌÀÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”‘•™‰ÕˆÜåˆàäÄØÙ……•˜Í„á”ÐÜå…ˆÀå”Ù‰”Å‘˜ØÍ€°Ñ•ÍÑ•ÑÉ•”)ÐÈÌÑ‰™„ÈÜÍ”ÄØÐÁ™˜ÔÄÕˆääÌÝ˜ÀÄÙ˜ÀàÐå•™ˆÈÑ€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ð…Ñ„)ÕÁ±½…‘•…±°ÄÌ•á…Ð±½…°‰±½‰Ì½ÑÉ•”ì™•Ñ¡•µ…¥¸¡…Ì¥‘•¹Ñ¥…°Ñ•ÍÑ•™¥±•Ì¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÐÄÄÈÈÀÀØÐ½©½ˆÄÄàÔàäÄÜÔäÀÌ‰½Ñ Á…ÍÌ(¨¨È°ØÔÐÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•Ì(ÌäÐÄÄÈÄäÐØÜ½‘•Á±½äÄÄàÔàäÌàäÌÈÐ½µÁ±•Ñ•ÍÕ•ÍÍ™Õ±±ä¸±°ÄÄ¡•­•™É•Í ±¥Ù”)™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°µ…¥¸½…”‰…Ñ °É•½Ù•Éä°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹)Õ¹¡…¹•Á…¥¹Ñ•È½É…ÍÑ•È½É•¹‘•È½µ…Ñ•É¥…°ÍÕÉ™…”¸É½é•¸‰Õ¥±‘ÌÕ¹¡…¹•¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÑ¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸	Õ¥±äÌÀ)½µÁ±•Ñ”…¹É•…‘ä™½È=‰©•Ðµµ½‘”Í½±¥½É‰¥Ð½Á…¥¹ÐÝ¥Ñ¡½ÕÐ…ÕÑ½µ…Ñ¥ŒÑ¡É½Õ µ…”°)Y•ÉÑ•à½‘”½…”…”É•ÍÑ½É…Ñ¥½¸°=‰©•ÐÉ•ÑÕÉ¸…¹A…¥¹ÐU¹‘½I•‘¼½½¹Ñ¥¹Õ•µ…É­Ì¸)1½½Í”Ý¥É”•½µ•ÑÉäÉ•µ…¥¹Ì‘•ÁÑ µÑ•ÍÑ•ì½É¥¥¹…°Á¥­¥¹œ½‰É¥‘”½…¡”½Ý¹•ÉÌ¥¹Ñ…Ð¸)9¼µ•…ÍÕÉ•AL±…¥´½ÈÉ•¹‘•É•¥A……•ÁÑ…¹”¥¹™•ÉÉ•¸UÍ•ÈäÈáAMLÁÉ½Ñ•Ñ•ì(äÈä…±Á¡„…Ñ”É•µ…¥¹ÌÁ•¹‘¥¹œ¸I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÉ•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•ì)¹…Ñ¥Ù”•áÁ½ÉÑÌ½ÉÉ•Ð¸I•ÍÕµ”…±Á¡„™••‘‰…¬Ñ¡•¸UXµÍ…™”‰±ÕÈ½ÍµÕ‘”ì<½Í•…µÌÅÕ•Õ•¸((ŒŒ€¸äÌÄƒŠP	±ÕÈÝ¥Ñ¡¥¸½É¥¥¹…°Á½±å½¸™…•Ìì€¸äÌÀÕÍ•ÈAMLƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäÌÁAMLÁÉ½Ñ•ÑÌÍ½±¥=‰©•Ð‘¥ÍÁ±…ä½½µÁ½¹•¹Ð…•Ì…¹A…¥¹Ð½¡¥ÍÑ½Éä¸Õ‘¥Ð)µ…¥¹„å˜É„ÄÁè½É¥¥¹…°UX¥¹ÍÁ•Ñ½È½Ý¹Ì¥Í±…¹‘Ì°•áÁ½ÉÑ•È½Ý¹ÌÑÉ¥…¹±”•µ¥ÍÍ¥½¸ì)¹¼¹•¥¡‰½ÕÈ‰ÉÕÍ •á¥ÍÑÌ¸¥ÉÍÐ	±ÕÈ±¥ÁÌ	=Q É•…‘Ì…¹ÝÉ¥Ñ•ÌÑ¼Á¥­•Á½±å½¸)™…”ì¹•Ù•ÈÍ…µÁ±•Ì…‘©…•¹Ð…Ñ±…Ì™…•Ì¸=É¥¥¹…°ÁÉ•Ù¥•Ü‰Õ¥±‘•È…¥¹Ì½ÁÐµ¥¸™É½é•¸)ÑÉ¥…¹±—ŠIÍ½ÕÉ”µ™…”µ•Ñ…‘…Ñ„™É½´¥ÑÌ•á¥ÍÑ¥¹œ•µ¥ÍÍ¥½¸±½½À€¡É½ÕÀ½É‘•ÈÉ•Ñ…¥¹•¤¸)•™…Õ±ÐÁÉ•Ù¥•ÝÌ½•áÁ½ÉÐ‰åÑ•ÌÕ¹¡…¹•¸A…¥¹Ñ•ÈÉ•ÅÕ•ÍÑÌµ…Àì¹•ÜÍµ…±°™¥±Ñ•Èµ‘½µ…¥¸)É…ÍÑ•È±…‰•±Ì½É¥¥¹…°•½µ•ÑÉä°ÔÄË
È°É4Í…¹¹•‰Õ‘•Ð¸M…µÁ±•¥¹Ñ•É¥½È½Ù•É±…ÁÌ°)½ÕÐµ½˜µÑ¥±”½‘••¹•É…Ñ”½Õ¹ÍÕÁÁ½ÉÑ•UYÌÉ•™ÕÍ”…Ñ½µ¥…±±äì…µ‰¥Õ½ÕÌ‰½É‘•ÉÌ•á±Õ‘•¸)9¼¹•ÜÑÉ¥…¹Õ±…Ñ¥½¸½Í¥¹…ÑÕÉ”½UX•‘¥Ñ½È½¥¹ÁÕÐ½¡¥ÍÑ½Éä½É•Í½ÕÉ”½ÝÉ¥Ñ•È½Ý¹•È¸()Q½½°	±ÕÈƒ
ÜÝ¥Ñ¡¥¸™…”ÕÍ•Ì½É¥¥¹…°É…ÍÑ•È°Í…µÁ±•ÉÌ°É…å…ÍÐ…¹½µµ¥Ð½É½±±‰…¬¸)¥á•™¥Ù”µÑ…À•¹ÑÉ”Ð½…É‘¥¹…°ÄÍµ½½Ñ¡¥¹œ½˜ÍÑÉ½­”µÍÑ…ÉÐÁ¥á•±Ìì™…”µ½¹±äÉ•…‘Ì…¹)ÝÉ¥Ñ•Ì°É•¹½Éµ…±¥é•±¥ÁÁ•Ý•¥¡ÑÌ¸5…á¥µÕ´Á•Èµ½¹Ñ…Ð½Ù•É…”½½Á…¥ÑäÉ•Ñ…¥¹•ì)±¥™Ð½É•Á•…Ð™½ÈÍÑÉ½¹•ÈÍµ½½Ñ¡¥¹œ¸M…µ”Í¥é”½ÁÉ•ÍÍÕÉ”½¡…É‘¹•ÍÌ½…±Á¡„Ñ¥ÁÌ¸QÉ…¹ÍÁ…É•¹Ð)±…å•ÉÌÕÍ”ÁÉ•µÕ±Ñ¥Á±¥•I	™¥±Ñ•É¥¹œ½¥¹Ñ•ÉÁ½±…Ñ¥½¸Ñ¼…Ù½¥¡¥‘‘•¸µ½±½ÕÈ¡…±½Ìì)Í…±…È½µ…Í¬É…ÜÙ…±Õ•ÌÍÑ…ä¥¹‘•Á•¹‘•¹Ð¸½±½ÕÈÁ¥­•È¥¹½É•½‘¥Í…‰±•¸	…Í”½±…å•ÉÌ¼)µ…Í­Ì½I½Õ¡¹•ÍÌ½5•Ñ…±¹•ÍÌÝ½É¬ìÉ•Ñ…¥¹•¥µ…”½±½ÕÈÉ•µ…¥¹ÌÉ•…µ½¹±ä¸9¼…É½ÍÌµ™…”)½ÈÍ•…µ±•ÍÌ½Ý½É±µÉ…‘¥ÕÌ±…¥´°¹¼MµÕ‘”å•Ð¸=É¥¥¹…°Í•¹”¡•­Á½¥¹Ð½=\½Á½½±Ì°)M…Ù•=Á•¸½9=4½1…¹A…¥¹Ð¡¥ÍÑ½ÉääÈàÉ•µ…¥¸ì‘½µ…¥¸Å5¥½Í•ÍÍ¥½¸¬Å5¥½½¹Ñ…Ð¥ÌÑÉ…¹Í¥•¹Ð¸)I•…‘½Ì½Á…¥¹Ðµ‰±ÕÈ´äÌÄ¹µ¸¥Ù”¹•ÜÉ•É•ÍÍ¥½¹Ì€¬¹•…É‰äÈÄôÈÙAMLìÉ•±•…Í”ÕAMLì)™Õ±°½ÁÕ‰±¥…Ñ¥½¸‰•±½Ü¸½µÁ±•Ñ”¡…¹•µ…¥¸½•áÁ½ÉÐ½1…ˆÉ•Ù•ÉÍ”±½…‘•ÈÉ…Á äÌÄì)5Õ±Ñ¤Ä¸À½™É½é•¸…¹…•ÁÑ•äÌÀµ…¥¸½…”‰åÑ•ÌÕ¹¡…¹•¸±Á¡„äÈä‘•Ù¥”…Ñ”¹½Ð)¥¹™•ÉÉ•AML¸I•™±•Ñ¥½¸É•µ…¥¹ÌÕ¹É•Í½±Ù•ì¹…Ñ¥Ù”•áÁ½ÉÐÁÉ½Ñ•Ñ•¸9•áÐY%)¡…Éµ•‘•µ…É¯ŠI	±ÕÈ‰ÉÕÍ ½±¥™Ð½É•Á•…Ð°½Ù•É±…ä¥Í½±…Ñ¥½¸°U¹‘½I•‘¼½½¹Ñ¥¹Õ”°Ñ¡•¸)Í¥µ¥±…É±ä‰½Õ¹‘•MµÕ‘”¸<…¹‘”µÍ•…´…Õ‘¥ÑÌÉ•µ…¥¸ÅÕ•Õ•°¹½Ð‘•±¥Ù•É•¸((´lt€¸äÌÄè¡…Éµ•‘•µ…É¬ƒŠHQ½½°	±ÕÈÝ¥Ñ¡¥¸™…”°M¥é”±…É•ÈÑ¡…¸µ…É¬°‰ÉÕÍ •‘”½±¥™Ð½É•Á•…Ð¸(´lt€¸äÌÄè½Ù•É±…ä	±ÕÈ­••ÁÌ	…Í”ìµ…Í¬½Í…±…È	±ÕÈ•‘¥ÑÌ½¹±äÍ•±•Ñ•Ñ…É•Ð¸(´lt€¸äÌÄèU¹‘½I•‘¼ÍÑ…åÌ¥¸A…¥¹ÐìÉ•ÑÕÉ¸	ÉÕÍ °M…Ù•=Á•¸…¹¹…Ñ¥Ù”•áÁ½ÉÐÉ•Ñ…¥¸É•ÍÕ±ÑÌ¸((¸äÌÄ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØÔäAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)9•Ü	±ÕÈÔ€¬¹•…É‰äÈÄôÈÙAML°É•±•…Í”ÕAMLì¹¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸)•™…Õ±Ð•áÁ½ÉÐ½ÁÉ•Ù¥•Ü•½µ•ÑÉä…¹…•ÁÑ•äÌÀµ…¥¸½…”½ÁÉ½Ñ•Ñ•5Õ±Ñ¤½™É½é•¸‰åÑ•Ì)Õ¹¡…¹•¸AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌì…ÑÕ…°¥A…	±ÕÈ…Ñ”Á•¹‘¥¹œ¸((ŒŒ€¸äÌÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÀÈÈÙ‘ŒÄå‰‘ˆÐÀÅˆÐàÔÅ‰ˆåàÑ•”äÕ…ˆàÜàÕˆäÔÝ€°Ñ•ÍÑ•ÑÉ•”)•ÁˆÄÈÜÜÁ™ŒÔäÔÀÌÕ™‰™•‰ÐÌÕÌäá…ŒÜÝÔå”äÝ€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ð…Ñ„)ÕÁ±½…‘•…±°ÄÜ•á…Ð±½…°‰±½‰Ì½ÑÉ•”ì™•Ñ¡•µ…¥¸µ…Ñ¡•ÌÑ•ÍÑ•Í½ÕÉ”¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÐÄØÌÄäÌÀÜ½©½ˆÄÄàØÀØÄÀÔÌÔÔ‰½Ñ Á…ÍÌ(¨¨È°ØÔäÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•Ì(ÌäÐÄØÌÄäÀÜä½‘•Á±½äÄÄàØÀØÌÀÌÜÌÄ½µÁ±•Ñ•ÍÕ•ÍÍ™Õ±±ä¸±°Äà™É•Í ¡•­•±¥Ù”)™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°•Ù•Éä¡…¹•ÉÕ¹Ñ¥µ”½•áÁ½ÉÐ½1…ˆ½Ý¹•È°¹•Ü™¥±Ñ•È)‘½µ…¥¸°É•½Ù•Éä°…•ÁÑ•äÌÀµ…¥¸½…”°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹É•Ñ…¥¹•Á…¥¹ÐÍÕÉ™…”¼)•áÁ½ÉÐ½¥µ…”ÁÉ½©•Ñ½È¸É½é•¸‰Õ¥±‘ÌÕ¹¡…¹•¸9¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ÐìÑ¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸	Õ¥±äÌÄ)½µÁ±•Ñ”…¹É•…‘ä™½ÈQ½½°	±ÕÈÝ¥Ñ¡¥¸™…”½¸„¡…Éµ•‘•Á…¥¹Ñ•µ…É¬°±…É•È)M¥é”°±¥™Ð½É•Á•…Ð™½ÈÍÑÉ½¹•ÈÍµ½½Ñ¡¥¹œì½Ù•É±…ä½¡…¹¹•°¥Í½±…Ñ¥½¸…¹U¹‘½I•‘¼ÍÑ…ä)¥¸A…¥¹Ð°É•ÑÕÉ¸	ÉÕÍ …¹½¹Ñ¥¹Õ”¸M…Ù•=Á•¸½¹…Ñ¥Ù”•áÁ½ÉÐÉ•Ñ…¥¹ÌÉ•ÍÕ±ÑÌ¸UÍ•ÈäÌÀ)AMLÁÉ½Ñ•Ñ•ì…ÑÕ…°äÌÄ…ÁÁ•…É…¹”½A•¹¥°™••°½±…Ñ•¹ä…¹äÈä…±Á¡„…Ñ”Á•¹‘¥¹œ¸)9¼É•¹‘•É•½¥A…Á•É™½Éµ…¹”±…¥´¸I•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•ì)¹…Ñ¥Ù”•áÁ½ÉÑÌ½ÉÉ•Ð¸9•áÐ	±ÕÈ™••‘‰…¬Ñ¡•¸ÁÉ½Ñ•Ñ•MµÕ‘”ì<½Í•…µÌÅÕ•Õ•¸((ŒŒ€¸äÌÈƒŠP½¹¹•Ñ•µ™…”	±ÕÈÍ…µÁ±¥¹œì€¸äÌÄÕÍ•ÈAMLƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈAMLÁÉ½Ñ•ÑÌ€¸äÌÄ	±ÕÈ…¹ÁÉ¥½È€¸äÌÀÍ½±¥=‰©•Ð‘¥ÍÁ±…ä¸Õ‘¥Ðµ…¥¸ÀÕ„ÜäÁ”àè)½É¥¥¹…°UX¥¹ÍÁ•Ñ½È…±É•…‘ä½Ý¹ÌÁ½±å½¸•‘•Ì°•áÁ½ÉÑ•È½Ý¹ÌÑÉ¥…¹±”•µ¥ÍÍ¥½¸ì)É•ÕÍ”‰½Ñ Ù¥„½ÁÑ¥½¹…°•‘•=Ý¹•ÉÌ…¹½É¥¥¹…°Ù•ÉÑ•à%Ì¸•™…Õ±ÐÉ•Á½ÉÑÌ½•½µ•ÑÉä¼)•áÁ½ÉÑÌÕ¹¡…¹•¸9•ÜÍµ…±°É•…µ½¹±äÍ•…´Á±…¸Õ¹™½±‘Ì½É¥¥¹…°ÑÉ¥…¹±”¹•¥¡‰½ÕÉÌ)…É½ÍÌÉ•…°µ…¹¥™½±•‘•Ì°µ…ÁÁ¥¹œ¥¹Ñ¼‘•Ñ…¡•½É½Ñ…Ñ•½µ¥ÉÉ½É•UX¥Í±…¹‘Ì¸Ñ±…Ì)ÁÉ½á¥µ¥Ñä¹•Ù•È½¹¹•ÑÌ™…•Ì¸%¹Ñ•É¹…°‘¥…½¹…±ÌÕÍ”Ñ¡”Í…µ”½É¥¥¹…°•µ¥ÍÍ¥½¸¸)¥á••¹ÑÉ”Ð½…É‘¥¹…°ÄÍÑÉ½­”µÍÑ…ÉÐ‰±ÕÈ¹½ÜÉ•…‘Ìµ…ÁÁ•½¹¹•Ñ•µ™…”Ñ•á•±Ì¸)]É¥Ñ•ÌÉ•µ…¥¸±¥ÁÁ•Ñ¼Á¥­•™…”èÍÑÉ½­”	=Q Í¥‘•Ì½˜•‘”ì‰ÉÕÍ ™½½ÑÁÉ¥¹Ð‘½•Ì)¹½ÐÝÉ…À…ÕÑ½µ…Ñ¥…±±ä¸9¼Ý½É±µÉ…‘¥ÕÌ½™Õ±°Í•…µ±•ÍÌµ™½½ÑÁÉ¥¹Ð±…¥´°¹¼MµÕ‘”¸)	½Õ¹‘…Éä½¹½¹µ…¹¥™½±½…µ‰¥Õ½ÕÌ½É¹•È½±½¹œÝ…±­Ì±¥Àì¥¹Ù…±¥½ÍÑ…±”½Ý¹•ÉÍ¡¥À…¹)•á¥ÍÑ¥¹œ½Ù•É±…ÁÁ¥¹œ½‘••¹•É…Ñ”½½ÕÐµ½˜µÑ¥±”½½µÁ±•àUXÉ•™ÕÍ…±ÌÍÑ…ä…Ñ½µ¥Œ¸5…àà)É½ÍÍ¥¹Ì½Í…µÁ±”…¹É4Ý…±¬ÍÑ•ÁÌì±…éäÍ•ÍÍ¥½¸Á±…¸ÔÄË
È±…‰•±ÌÅ5¥­±¥¹­ÌÑ5¥°)Ñ•µÁ½É…ÉäÑÉ¥…¹±”µ…ÀÅ5¥ì½Ý¹•½¹Ñ…Ð½Á¥•ÌÕ5¥Á±ÕÌ½É¥¥¹…°ÍÑÉ½­”‰Õ™™•ÉÌ¸)AÉ•µÕ±Ñ¥Á±¥•½±½ÕÈ…±Á¡„°É…Üµ…Í­Ì½Í…±…ÉÌ°…ÁÁ•½Ù•É…”°½É¥¥¹…°…±Á¡„Ñ¥ÁÌ°)¥¹ÁÕÐ½É…å…ÍÐ½¡¥ÍÑ½Éä½=\½M…Ù•=Á•¸½9=4½1½Ý¹•ÉÌÉ•Ñ…¥¹•¸U$Í…åÌ½¹¹•Ñ•™…•Ì)…¹•áÁ±¥¥Ñ±ä…Í­ÌÍÑÉ½­•Ì½Ù•È‰½Ñ Í¥‘•Ì¸9¼µ½‘•±±¥¹œ½UX…ÕÑ¡½É¥¹œ­•É¹•°…‘‘•¸)¥Ù”¹•ÜÑ•ÍÑÌ½Ù•È€ÄÈ™½±½É½Ñ…Ñ¥½¸½µ¥ÉÉ½È±…å½ÕÑÌ°‘¥Í½¹¹•Ñ•…Ñ±…Ì‘•½ä°)¹½¹µ…¹¥™½±½ÍÑ…±”µ•Ñ…‘…Ñ„°•á…ÐÉ…ÍÑ•È…±Á¡„½…¹•°…¹…ÑÕ…°U'ŠI¡¥ÍÑ½ÉçŠIM…Ù•=Á•»ŠH)•á…Ð¹…Ñ¥Ù”A9¸½ÕÍ•ÈÁAML¥¹°É•±•…Í”Ôì™Õ±°½ÁÕ‰±¥…Ñ¥½¸‰•±½Ü¸½µÁ±•Ñ”¡…¹•)É•Ù•ÉÍ”±½…‘•ÈÉ…Á É•Á¥¹¹•äÌÈìÉ•Ñ…¥¹•µ…¥¸½…”½5Õ±Ñ¤Ä¸À½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸)I•…‘½Ì½Á…¥¹ÐµÍ•…µÌ´äÌÈ¹µ¸•Ù¥”äÌÈÍ•…´…ÁÁ•…É…¹”½±…Ñ•¹äÁ•¹‘¥¹œì…±Á¡„äÈä…Ñ”)¹½Ð¥¹™•ÉÉ•¸I•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•ì¹…Ñ¥Ù”•áÁ½ÉÑÌÁÉ½Ñ•Ñ•¸)9•áÐ‘•Ù¥”™••‘‰…¬Ñ¡•¸‰½Õ¹‘•MµÕ‘”Ñ¡É½Õ ½É¥¥¹…°Á…¥¹Ð½Ý¹•Èì<…¹UXÍ•…´)UQ!=I%9É•µ…¥¸ÅÕ•Õ•¸M•…´Í…µÁ±¥¹œ¥Ì¹½ÐÍ•…´…ÕÑ¡½É¥¹œ¸((´mátUÍ•È€¸äÌÄAMLèÝ¥Ñ¡¥¸µ™…”	±ÕÈ°½É¥¥¹…°A…¥¹Ð½¡¥ÍÑ½Éä…¹€¸äÌÀÍ½±¥=‰©•Ð‘¥ÍÁ±…äÁÉ½Ñ•Ñ•¸(´lt€¸äÌÈ‘•Ù¥”èÁ…¥¹Ð‘¥™™•É•¹Ð½±½ÕÉÌ…É½ÍÌ„Õ‰”•‘”°	±ÕÈÍÑÉ½­•Ì½Ù•È‰½Ñ Í¥‘•Ì‰±•¹½¹¹•Ñ•™…•Ì‘•ÍÁ¥Ñ”UXÍÁ±¥Ð¸(´lt€¸äÌÈ‘•Ù¥”è±¥™Ð½É•Á•…ÐÍÑÉ•¹Ñ¡•¹Ì°U¹‘¼½I•‘¼ÍÑ…åÌ¥¸A…¥¹ÐìM…Ù”½=Á•¸É•Ñ…¥¹ÌÉ•ÍÕ±Ð¸(´lt€¸äÌÈ‘•Ù¥”è‰…Í”½±…å•È½µ…Í¬½Í…±…È¥Í½±…Ñ¥½¸°A•¹¥°™••°…¹™¥ÉÍÐµ	±ÕÈ±…Ñ•¹ä…•ÁÑ…‰±”¸((¸äÌÈ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØØÐAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)½ÕÍ•ÈÁAMLì¹¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸!½ÍÑ•½A…•Ì½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌ¸((ŒŒ€¸äÌÈÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”€Õ‰…ŒÄÄàÈÅ˜ÐåÝÐÝŒÙ•äåäÀÜÔÕŒÀÕ™‘•ÄÀÉ€°Ñ•ÍÑ•ÑÉ•”)€á„Ù˜ÈÕÙ”ÌàÀÐÐÉˆáŒÉŒÝŒàäàäÍá˜äÑÄÔÌÐÀÑ‘€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸)½¹¹•Ñ•¥Ð…Ñ„ÕÁ±½…‘•ÈÐ•á…Ð±½…°‰±½‰Ìì™•Ñ¡•µ…¥¸µ…Ñ¡•ÌÑ•ÍÑ•ÑÉ•”¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÐÄàØÄÔàÜÀ½©½ˆÄÄàØÄÌØäÄØäÈ‰½Ñ Á…ÍÌ(¨¨È°ØØÐÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸)A…•ÌÌäÐÄàØÄÔàÔÐ½‘•Á±½äÄÄàØÄÌàØàÔÜàÍÕ••‘•¸±°ÈÈ™É•Í ¡•­•±¥Ù”™¥±•Ì)‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”¡…¹•ÉÕ¹Ñ¥µ”½•áÁ½ÉÐ½UX½1…ˆ±½…‘•ÈÉ…Á °)¹•ÜÍ•…´¡•±Á•È°É•½Ù•Éä°…•ÁÑ•µ…¥¸°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹É•Ñ…¥¹•ÍÕÉ™…”¸)É½é•¸‰Õ¥±‘ÌÕ¹¡…¹•ì¹¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÁ‘…Ñ•¸()	Õ¥±äÌÈ½µÁ±•Ñ”…¹É•…‘ä™½ÈÑ•ÍÑ¥¹œèÁ…¥¹Ð‘¥™™•É•¹Ð½±½ÕÉÌ…É½ÍÌ„Õ‰”•‘”°)	±ÕÈÍÑÉ½­•Ì½Ù•È	=Q Í¥‘•Ì°±¥™Ð½É•Á•…Ð°U¹‘½I•‘¼ÍÑ…ä¥¸A…¥¹Ð°M…Ù•=Á•¸É•Ñ…¥¹Ì¸)Q¡¥Ì½¹¹•ÑÌÍ…µÁ±”É•…‘Ì…É½ÍÌÉ•…°™…”•‘•Ì½UXÍ•…µÌì™½½ÑÁÉ¥¹Ð‘½•Ì¹½ÐÝÉ…À¸)UÍ•ÈäÌÅAMLÁÉ½Ñ•Ñ•ì…ÑÕ…°äÌÈA•¹¥°™••°½…ÁÁ•…É…¹”½™¥ÉÍÐµÕÍ”±…Ñ•¹äÁ•¹‘¥¹œ¸)±Á¡„äÈä‘•Ù¥”…Ñ”É•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ð¸I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÕ¹É•Í½±Ù•ì¹…Ñ¥Ù”•áÁ½ÉÑÌ)½ÉÉ•Ð¸9•áÐ™••‘‰…¬Ñ¡•¸‰½Õ¹‘•MµÕ‘”Ñ¡É½Õ ½É¥¥¹…°½Ý¹•Èì<½Í•…´…ÕÑ¡½É¥¹œ)É•µ…¥¸ÅÕ•Õ•¸Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä°¹½ÐÑ¡”Ù•É¥™¥•ÉÕ¹Ñ¥µ”¸((ŒŒ€¸äÌÌƒŠPMÕÉ™…”¥µ…”ÝÉ…ÁÁ¥¹œìÕÍ•ÈÁÉ¥½É¥ÑäƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•È…Í­Ì¥µ…”Á±…•µ•¹ÐÑ¼ÝÉ…À½¹¹•Ñ•ÍÕÉ™…•ÌÉ…Ñ¡•ÈÑ¡…¸±¥À…Ð½¹”™…”¸)Õ‘¥Ðµ…¥¸ÌØàÐÔÐÔÀ½±¥Ù”äÌÈè€¸äÄÈ=¸ÍÕÉ™…”™½±±½ÝÌ…¹¡½È½¹½Éµ…°‰ÕÐ™••‘Ì™±…Ð)½ÉÑ¡½É…Á¡¥Œ€¸äÄÄÁÉ½©•Ñ½ÈÝ¥Ñ Ü×
À™…¥¹œ½Ù¥Í¥‰¥±¥ÑäÕÑÌì¹¼ÝÉ…ÁÁ¥¹œ¥µ…”½Ý¹•È¸)áÑ•¹Ñ¡…Ð½É¥¥¹…°Á…Ñ ìÁÉ•Í•ÉÙ”Í•Á…É…Ñ”AÉ½©•Ð™É½´Y¥•Ü¸áÑÉ…Ð•á¥ÍÑ¥¹œäÌÈ)É•…µ½¹±äÑÉ¥…¹±”É…Á ¥¹Ñ¼Á…¥¹ÐµÑÉ¥…¹±”µÉ…Á ¹©Ìì½É¥¥¹…°UX¥¹ÍÁ•Ñ½ÈÁ½±å½¸)•‘•Ì…¹•áÁ½ÉÑ•È™…”½Ù•ÉÑ•àµ•Ñ…‘…Ñ„ÍÑ…ä…ÕÑ¡½É¥Ñ…Ñ¥Ù”¸	±ÕÈÕÍ•Ì•á…ÐÍ…µ”É…Á °)•á¥ÍÑ¥¹œÍ…µÁ±”Ý…±¬Õ¹¡…¹•¸9¼‘ÕÁ±¥…Ñ”…‘©…•¹ä½ÑÉ¥…¹Õ±…Ñ¥½¸½µ½‘•±±¥¹œ­•É¹•°¸()=¸ÍÕÉ™…”É•Ñ…¥¹ÌÉ…å…ÍÐÑÉ¥…¹±”¥¹‘•àÝ¥Ñ Á½¥¹Ð½¹½Éµ…°ì5½Ù”ÕÁ‘…Ñ•Ì…±°Ñ¡É•”¸)MÕÉ™…”½É¥•¹Ñ…Ñ¥½¸ÍÑ¥±°%¹Í•ÉÐÌ½É¥¥¹…°¡•±Á•È¸9•ÜÁ…¥¹Ðµ¥µ…”µÝÉ…À¹©Ì…ÉÉ¥•Ì„)±½…°¥µ…”¡…ÉÐ½Ù•ÈÉ•…°µ…¹¥™½±ÑÉ¥…¹±”¹•¥¡‰½ÕÉÌ°Õ¹™½±‘¥¹œ½µµ½¸•‘•ÌÝ¥Ñ )Ý½É±±•¹Ñ¡Ì…¹½ÁÁ½Í¥Ñ”µÍ¥‘”Ñ¡¥ÉÙ•ÉÑ•àìµ¥‘Á½¥¹Ð½•¹ÑÉ½¥‘¥ÍÑ…¹”ÅÕ•Õ”¡½½Í•Ì)½¹”É½ÕÑ”Á•ÈÑÉ¥…¹±”¸I•½¹¥±”Í¡…É•…¹½¹¥…°Ù•ÉÑ•à½½É‘¥¹…Ñ•ÌÑ¼…Ù½¥É…­Ì)…Ð±½…°å±”±½ÍÕÉ•ÌìÍ••ÑÉ¥…¹±”Á¥¹¹•¸ÕÉÙ•½±½Í•Á…Ñ¡•Ì¹••ÍÍ…É¥±äÍÑÉ•Ñ ì)¹½Ð„±½‰…±±ä‘¥ÍÑ½ÉÑ¥½¸µ™É•”ÍÁ¡•É¥…°Õ¹ÝÉ…À¸MÑ½ÁÌ•áÁ…¹‘¥¹œ½ÕÑÍ¥‘”¥µ…”É•Ñ…¹±”°(ÈÁ,ÑÉ¥…¹±•Ì¼ÈÀÁ,ÅÕ•Õ”µÁ½À…À¸	½Õ¹‘…É¥•Ì½¹½¹µ…¹¥™½±½‘¥Í½¹¹•Ñ•½µÁ½¹•¹ÑÌ±¥Àì)¹¼½½É‘¥¹…Ñ”Ý•±‘¥¹œ½È…Ñ±…Ì…‘©…•¹ä¸=É¥¥¹…°€¸äÄÄUXÉ…ÍÑ•È½Í½ÕÉ”…±Á¡„Í…µÁ±¥¹œ°)½Ù•É±…À½Ñ¥±”¼É4Í…¸‰Õ‘•ÑÌ…¹ÍÑ…¬½Á½½°½¡¥ÍÑ½Éä½•áÁ½ÉÐ½Ý¹•ÉÌÉ•µ…¥¸¸]É…ÁÁ•Í…µÁ±•Ì)™½±±½Ü½¹¹•Ñ•Ñ…É•ÐÍÕÉ™…•ÌÉ½Õ¹½É¹•ÉÌ•Ù•¸Ý¡•¸¹½Ð™É½¹Ðµ™…¥¹œ½Ù¥Í¥‰±”™É½´)…¹¡½ÈÁÉ½©•Ñ½ÈìÁ¥­•…¹¡½ÈÍÑ¥±°½‰•åÌ½É¥¥¹…°Ù¥Í¥‰±”µÑ…É•Ð½½±ÕÍ¥½¸¡¥ÐÕ…É¸)±…ÐAÉ½©•Ð™É½´Y¥•ÜÉ•Ñ…¥¹Ì½É¥¥¹…°Ü×
À½Í•¹”½Í•±˜½±ÕÍ¥½¸¼ÌÁ4É…äµÝ½É¬ÉÕ±•Ì¸()á¥ÍÑ¥¹œ½¹Ñ…ÐÑ…¹•¹ÐÕ¥‘”É•µ…¥¹ÌÁ±…¹…Èì±¥™ÐÕÁ‘…Ñ•Ì•á…ÐÝÉ…ÁÁ•µ•Í ÁÉ•Ù¥•Ü¸)ÁÁ±äÉ•½µÁÕÑ•ÌÕÉÉ•¹Ð…¹‘¥‘…Ñ”Ñ¡•¸½µµ¥ÑÌ=9½É¥¥¹…°¡•­Á½¥¹Ð½=\¸…¹•°°)±½Í”°‰½‘ä±½ÍÌ°±…å•È½Ñ…É•Ð¡…¹”…¹É•™ÕÍ…°ÁÉ•Í•ÉÙ”½µµ¥ÑÑ•É•Í½ÕÉ”½¡¥ÍÑ½Éä¸)M½ÕÉ”½É…ÍÑ•ÈÉ•Ñ…¥¹•Ñ½•Ñ¡•ÈÑ¡É½Õ ½É¥¥¹…°É•¥Á”½½‘•Œè¹¼Í¡•µ„½‰Õ‘•Ð¥¹É•…Í”¸)%¹Ñ•É…Ñ¥Ù”ÝÉ…À¡…ÉÐ½…¹¡½È¥ÌÑÉ…¹Í¥•¹Ð°…ÌäÄÈè‘¥Ð¥µ…—ŠI=¸ÍÕÉ™…”É•Á¥­Ì…¹¡½Èì)½±™±…Ðµ…ÑÉ¥à…±½¹”…¹¹½ÐÉ••¹•É…Ñ”„ÝÉ…ÁÁ•¡…ÉÐ¸M…Ù•Á¥á•±Ì½¹…Ñ¥Ù”•áÁ½ÉÑÌ)É•Ñ…¥¸•á…ÐÝÉ…ÁÁ¥¹œì¹•Ù•È…ÕÑ¼µÉ…ÍÑ•É¥é”É•Ñ…¥¹•Í½ÕÉ”™É½´Ñ¡…Ðµ…ÑÉ¥à½¸=Á•¸¸()M¥à¹•ÜÉ•É•ÍÍ¥½¹Ìè•á…Ð…Íåµµ•ÑÉ¥ŒÁ¥á•±Ì…É½ÍÌ™±…Ð½½‰±¥ÅÕ”¼äÃ
À€¬µ¥ÉÉ½É•UYÌ°)‘¥Í½¹¹•Ñ•½¹½¹µ…¹¥™½±•á±ÕÍ¥½¹Ì°½É¥¥¹…°Ù¥•ÜÉÕ±•Ì½ÍÑ…±”…¹¡½È½UXÉ•™ÕÍ…°°)ÑÉ…¹Í™½Éµ•™É…µ”½É½Ñ…Ñ¥½¸½Í…±”°…ÑÕ…°U$‘É…œ½¹Ñ¼…¹½Ñ¡•È™…”½…¹•°½å±—ŠIÁÁ±çŠH)¡¥ÍÑ½ÉçŠIM…Ù•=Á•»ŠI•á…Ð¹…Ñ¥Ù”A9°ÍÁ¡•É”½‘•¹¥•¡•­Á½¥¹Ð…¹Í¡…É•µÙ•ÉÑ•à½¹Ñ¥¹Õ¥Ñä¸)½ÕÍ•¥µ…”­Í•…´ÈÕAML…¹É•±•…Í”ÕAMLì™Õ±°½ÁÕ‰±¥…Ñ¥½¸™½±±½ÝÌ¸½µÁ±•Ñ”¡…¹•)É•Ù•ÉÍ”±½…‘•ÈÉ…Á äÌÌ°É•Ñ…¥¹••áÁ½ÉÑ•È½¥¹ÍÁ•Ñ½È½µ…¥¸½…”½5Õ±Ñ¤½™É½é•¸Õ¹¡…¹•¸)9¼äÌÈ‘•Ù¥”AML¥¹™•ÉÉ•¸•Ù¥”äÌÌÝÉ…À…ÁÁ•…É…¹”½ÍÑÉ•Ñ ½™¥ÉÍÐµÕÍ”±…Ñ•¹äÁ•¹‘¥¹œ¸)I•…‘½Ì½Á…¥¹Ðµ¥µ…”µÝÉ…À´äÌÌ¹µ¸%¹‘•Á•¹‘•¹ÐÉ•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÕ¹É•Í½±Ù•¸()A•¹‘¥¹œÕÍ•ÈÉ•ÅÕ•ÍÑÌ•áÁ±¥¥Ñ±äÉ•Ñ…¥¹•èÍÑÉ½¹•È	±ÕÈ…µ½Õ¹Ð½É…‘¥ÕÌÍ•Á…É…Ñ”™É½´)½Á…¥Ñäì¥µ…”É…ÍÑ•È½¹Ù•ÉÍ¥½¸½•‘¥Ñ…‰±”‰±ÕÈì5•É”½Ý¸½±…ÑÑ•¸Ý¥Ñ ‰±•¹½µ…Í¬)…ÁÁ•…É…¹”ÁÉ•Í•ÉÙ•ìÍÑ…•Ñ•áÑÕÉ”½¥µ…”½…±Á¡„É•Í½±ÕÑ¥½¸…¹±…å•Èµ½Õ¹Ð¡½¥•Ì)Ý¥Ñ µ•µ½Éä‰Õ‘•ÑÌ¸ÕÉÉ•¹ÐÔÄË
ÈÁ…¥¹Ñ•µ…ÁÌ°ÄÀÈÓ
ÈÍ½ÕÉ•Ì°ÈÔÛ
ÈÑ¥ÁÌ±‰…Í”¬Ì½Ù•É±…åÌ)Õ¹¡…¹•¸MµÕ‘”½<½UX•‘”µÍ•…´…ÕÑ¡½É¥¹œÅÕ•Õ•ìÑ¡¥Ì¥Ì¥µ…”ÝÉ…ÁÁ¥¹œ½¹±ä¸((´lt€¸äÌÌ‘•Ù¥”è€­%µ…—ŠI=¸ÍÕÉ™…”ìÁ±…”¹•…ÈÕ‰”•‘”°±¥™Ð°½É‰¥ÐÑ¼Í•”¥µ…”½¹Ñ¥¹Õ”½¹Ñ¼…‘©…•¹Ð™…”¸(´lt€¸äÌÌ‘•Ù¥”èµ½Ù”…¹¡½È½¹Ñ¼¹•áÐ™…”ìÑ…Àµå±”I½Ñ…Ñ”½M…±”°±¥™Ðì¥µ…”É•µ…¥¹ÌÝÉ…ÁÁ•¸QÉäÍÁ¡•É”Á…Ñ ™½È…•ÁÑ…‰±”ÕÉÙ…ÑÕÉ”½ÍÑÉ•Ñ ¸(´lt€¸äÌÌ‘•Ù¥”èÁÁ±çŠIU¹‘¼½I•‘¼°M…Ù”½=Á•¸É•Ñ…¥¹ÌÝÉ…ÁÁ¥¹œì‘¥Ð¥µ…—ŠI=¸ÍÕÉ™…”É•Á¥­Ìì…¹•°ÁÉ•Í•ÉÙ•Ì½µµ¥ÑÑ•¥µ…”¸((¸äÌÌ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØÜÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)M¥à¹•Ü¡•­Ì€¬¹•…É‰äÄä€ôÈÕAMLìÉ•±•…Í”ÕAML¸9¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸)AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌì…ÑÕ…°¥A…äÌÌ…Ñ”Á•¹‘¥¹œ¸((ŒŒ€¸äÌÌÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÈàÑ˜ÈäÈÌÀÙŒÀÙ„àÔÝ™™ŒÀÐÝ‰Õ‘ÐäÜÌÜÀÌÄÈÌÌÝ€°Ñ•ÍÑ•ÑÉ•”)€ÐÈÀå‘‘„ØÐÈØÜØØÔÉˆÜÙ™•ˆàåŒÌÄÐá•ŒÔÕ‘„É˜åˆÉ€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸)½¹¹•Ñ•¥Ð…Ñ„ÕÁ±½…‘•Ää•á…Ð±½…°‰±½‰Ìì™•Ñ¡•µ…¥¸µ…Ñ¡•ÌÑ•ÍÑ•ÑÉ•”¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÔÄÀÌÄÈÄàÌ½©½ˆÄÄàäÈäÌääÈÜÈ‰½Ñ Á…ÍÌ(¨¨È°ØÜÀÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸)A…•ÌÌäÔÄÀÌÄÄÐÀÄ½‘•Á±½äÄÄàäÈäÔàäÜÄÐÍÕ••‘•¸±°ÈÐ™É•Í ¡•­•±¥Ù”™¥±•Ì)‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”¡…¹•¥µ…”½	±ÕÈÉ•Ù•ÉÍ”±½…‘•ÈÉ…Á °)¹•ÜÍ¡…É•É…Á ½ÝÉ…À¡…ÉÐ°É•½Ù•Éä°µ…¥¸½…”°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹É•Ñ…¥¹•)•áÁ½ÉÑ•È½UX¥¹ÍÁ•Ñ½È½É…ÍÑ•È½¥µ…”µÍ½ÕÉ”½É•¥Á”½Ý¹•ÉÌ¸É½é•¸‰Õ¥±‘ÌÕ¹Ñ½Õ¡•ì)¹¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÁ‘…Ñ•¸()	Õ¥±äÌÌ½µÁ±•Ñ”…¹É•…‘äè€­%µ…—ŠI=¸ÍÕÉ™…”°Á±…”¹•…ÈÕ‰”•‘”°±¥™Ð…¹½É‰¥Ð)Ñ¼¥¹ÍÁ•Ð½¹Ñ¥¹Õ…Ñ¥½¸¸É…œ½¹Ñ¼¹•áÐ™…”ìÉ½Ñ…Ñ”½Í…±”°±¥™ÐìÑÉäÕÉÙ•Á…Ñ ¸)ÁÁ±çŠIU¹‘½I•‘¼°M…Ù•=Á•¸É•Ñ…¥¹Ì•á…ÐÉ•ÍÕ±Ð¸½¹Ñ…ÐÕ¥‘”ÍÑ…åÌÁ±…¹…ÈìÝÉ…ÁÁ•)µ•Í ÁÉ•Ù¥•ÜÕÁ‘…Ñ•Ì½¸±¥™Ð¸%¹Ñ•É…Ñ¥Ù”¡…ÉÐÉ•µ…¥¹ÌÑÉ…¹Í¥•¹Ðì‘¥Ð¥µ…—ŠH)=¸ÍÕÉ™…”É•Á¥­Ì°…ÌäÄÈ¸ÕÉÙ…ÑÕÉ”½±…É”±½Í•Á…Ñ¡•Ì…¸ÍÑÉ•Ñ ½É•… ‰½Õ¹‘…Éä¸)9¼‘•Ù¥”äÌÌ…ÁÁ•…É…¹”½±…Ñ•¹äAML¥¹™•ÉÉ•ìäÌÈ	±ÕÈ…¹äÈä…±Á¡„…Ñ•ÌÁ•¹‘¥¹œ¸)9•áÐÍÑÉ½¹•È	±ÕÈ°¥µ…”½¹Ù•ÉÍ¥½¸½‰±ÕÈ°5•É”½±…ÑÑ•¸°‰½Õ¹‘•É•Í½±ÕÑ¥½¸½±…å•È)½ÁÑ¥½¹ÌìMµÕ‘”½<½Í•…´…ÕÑ¡½É¥¹œÉ•µ…¥¸ÅÕ•Õ•¸I•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ð¸)Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±äìÙ•É¥™¥•ÉÕ¹Ñ¥µ”É•µ…¥¹Ì‰åÑ”µ¥‘•¹Ñ¥…°¸((ŒŒ€¸äÌÐƒŠP	±ÕÈµ½Õ¹Ðì€¸äÌÌÕÍ•ÈAMLƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈäÌÍAMLÁÉ½Ñ•ÑÌ¥µ…”ÝÉ…ÁÁ¥¹œ…É½ÍÌÕ‰”•‘•Ì½UXÍ•…µÌ°5½Ù”½I½Ñ…Ñ”½M…±”°)ÁÁ±ä½¡¥ÍÑ½Éä½M…Ù•=Á•¸¸Õ‘¥Ðµ…¥¸ØØàá‘”ÄÜ½±¥Ù”äÌÌè½É¥¥¹…°Á…¥¹Ðµ½É”¡…Ì™¥á•)•¹ÑÉ”Ð½…É‘¥¹…°Ä½¹”µÁ…ÍÌ‰±ÕÈ°¹¼ÍÑÉ½¹•È™¥±Ñ•È½Í±¥‘•È½Ý¹•È¸áÑ•¹½É¥¥¹…°)É…ÍÑ•È½¹±äì¹¼¹•Ü‰ÉÕÍ °…‘©…•¹ä°¥¹ÁÕÐ°¡¥ÍÑ½Éä°É•Í½ÕÉ”½ÈÝÉ¥Ñ•È¥µÁ±•µ•¹Ñ…Ñ¥½¸¸()	±ÕÈÍ¡½ÝÌµ½Õ¹ÐÇŠLÌÈ°‘•™…Õ±Ðà¸µ½Õ¹ÐÉ•Á•…ÑÌ•á¥ÍÑ¥¹œÍµ½½Ñ¡¥¹œ­•É¹•°½Ù•ÈÑ¡”)ÍÑÉ½­”µÍÑ…ÉÐÍ¹…ÁÍ¡½Ðì=Á…¥Ñäµ¥á•Ì™¥±Ñ•É•Ñ…É•ÐÝ¥Ñ ½É¥¥¹…°ìM¥é”½¹ÑÉ½±Ì‰ÉÕÍ )™½½ÑÁÉ¥¹Ð¸½É”™¥±Ñ•È¹…µ½Õ¹Ð‘•™…Õ±ÑÌÄ€¡±•…ä…±±Ì½Í•ÑÑ¥¹ÌÉ•µ…¥¸Ù…±¥¤¸5…¥¸)U$Á…ÍÍ•Ì½ÁÑ¥½¹…°‰±ÕÉµ½Õ¹ÐìÍ¡…É•‰ÉÕÍ ‘•™…Õ±ÑÌ½1…ˆÍ…Ù•Í•ÑÑ¥¹Ì½¹…Ñ¥Ù”Í¡•µ…Ì)Õ¹¡…¹•¸á¥ÍÑ¥¹œ½É¥¥¹…°¹•¥¡‰½ÕÈÑ…‰±”¡…¹‘±•Ì½¹¹•Ñ•™…•Ì½UXÍ•…µÌ½¸•Ù•Éä)Á…ÍÌì¹¼…Ñ±…Ìµ¹•¥¡‰½ÕÈÉ•…‘Ì½È¹•ÜÑ½Á½±½äÁ±…¸¸]É¥Ñ•ÌÍÑ¥±°±¥ÀÑ¼Á¥­•™…”è)ÍÑÉ½­”‰½Ñ Í¥‘•Ì¸=¹”µÁ…ÍÌ•á…Ð…•ÁÑ•€¸äÌÄ¼¸äÌÈ½ÕÑÁÕÑÌÉ•Ñ…¥¹•ìÍÑÉ½¹œ‰±ÕÈ)ÕÍ•ÌÁÉ•µÕ±Ñ¥Á±¥•I	Ñ¡É½Õ …±°Á…ÍÍ•Ì€¡É…Üµ…Í­Ì½Í…±…ÉÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ð¤¸()½µÁÕÑ”Ñ…É•Ð½¹”½½¹Ñ…Ð°ÕÍ¥¹œÑÝ¼‰½Õ¹‘•±½…ÐØÐI	‰Õ™™•ÉÌÑ¼…Ù½¥É½Õ¹‘¥¹œ)‰•ÑÝ••¸Á…ÍÍ•Ìì½¹”Ñ…É•ÐÉ•Ñ…¥¹•™½È½¹Ñ…Ð¸ÐÔÄË
È•… ‰Õ™™•Èá5¥°ÄÙ5¥™¥±Ñ•É¥¹œ)‰Õ™™•ÉÌÑ½Ñ…°ìÑ…É•Ðá5¥É•Ñ…¥¹•Á±ÕÌ•á¥ÍÑ¥¹œ‰•™½É”½½Ù•É…”½‘½µ…¥¸½Á½½°É•Í½ÕÉ•Ì¸)U¹¥™½É´Í½ÕÉ•ÌÍ¡½ÉÑÕÐì½Á…¥ÑäÀÍ­¥ÁÌ™¥±Ñ•É¥¹œ¸5…àÌÈ¨ÔÄË
ÈÑ•á•°Ù¥Í¥ÑÌ°¹¼)Á•Èµ‘…ˆÉ•Á•…Ñ•™¥±Ñ•É¥¹œ½ÈÕ¹‰½Õ¹‘•™••‘‰…¬¸½Ù•É…”É•µ…¥¹Ìµ…à½½¹Ñ…Ðì)±¥™Ð½É•Á•…Ð™½Èµ½É”¸¥¹¥Í ½…¹•°½‘¥ÍÁ½Í”‘É½ÁÌÑ…É•ÐìÙ…±¥‘…Ñ¥½¸ÁÉ••‘•Ì½¹Ñ…Ð)ÍÑ…Ñ”ÁÕ‰±¥…Ñ¥½¸¸µ½Õ¹Ð¥¹ÁÕÐ…¹•±Ì¥¸µ™±¥¡ÐÝ½É¬…¹ÕÁ‘…Ñ•Ì•á¥ÍÑ¥¹œÉ•…‘½ÕÐì)½É¥¥¹…°A…¥¹Ð¡¥ÍÑ½ÉäÉ•½Á•¸É•Ñ…¥¹ÌÑ½½°½…µ½Õ¹Ð¸ÕÉÉ•¹ÐÍ•±•Ñ•±…å•È½¡…¹¹•°½¹±ä¸)%µ…”½±½ÕÈÍÑ…åÌÍ½ÕÉ”µÁÉ•Í•ÉÙ•½É•…µ½¹±äÁ•¹‘¥¹œ•áÁ±¥¥Ð¥µ…”½¹Ù•ÉÍ¥½¸¸()¥Ù”¹•ÜÉ•É•ÍÍ¥½¹Ìè…¹…±åÑ¥…°½¹”½ÑÝ¼¼ÌÈµÁ…ÍÌ¥µÁÕ±Í”…¹¥¹‘•Á•¹‘•¹Ð½Á…¥Ñäì)…±Á¡„½É…ÜÍ…±…È½‘½µ…¥¸½¥¹Ù…±¥½¹¼µ½À½…¹•°ìÍÑÉ½¹œ™½±‘•µÍ•…´Í…µÁ±¥¹œ•á±Õ‘•Ì)…Ñ±…Ì‘•½ä…¹™…Èµ™…”ÝÉ¥Ñ•Ìì…ÑÕ…°U$±½Ü½¡¥ Í½™Ñ¹•ÍÌ°…µ½Õ¹Ðµ¡…¹”É½±±‰…¬°)A…¥¹ÐU¹‘½I•‘¼…¹M…Ù•=Á•¸½•á…Ð¹…Ñ¥Ù”A9ìÍ…±…È½µ…Í¬¥Í½±…Ñ¥½¸½¡•­Á½¥¹ÐÉ•™ÕÍ…°¸)½ÕÍ•ÈÙAML¥¹°€¸äÌÌÝÉ…ÁÁ¥¹œØ…¹A…¥¹Ðµ¡¥ÍÑ½ÉäÔìÉ•±•…Í”ÕAMLì™Õ±°‰•±½Ü¸)9¼½±…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸½µÁ±•Ñ”¡…¹•É…ÍÑ•È½1…ˆ½µ…¥¸É•Ù•ÉÍ”±½…‘•ÈÉ…Á äÌÐì)…•ÁÑ•äÌÌÝÉ…À½É…Á ½•áÁ½ÉÐ½UX¥¹ÍÁ•Ñ½È°µ…¥¸½…”½5Õ±Ñ¤½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸)•Ù¥”äÌÐÍÑÉ•¹Ñ ½™¥ÉÍÐµ½¹Ñ…Ð±…Ñ•¹äÁ•¹‘¥¹œì9½‘”Ñ¥µ¥¹Ì…É”¹½Ð¥A…•Ù¥‘•¹”¸)I•…‘½Ì½Á…¥¹Ðµ‰±ÕÈµ…µ½Õ¹Ð´äÌÐ¹µ¸I•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•¸)9•áÐ¥µ…”µÑ¼µÁ…¥¹Ð½¹Ù•ÉÍ¥½¸½‰±ÕÈ°Ñ¡•¸5•É”½Ý¸½±…ÑÑ•¸°ÍÑ…•É•Í½±ÕÑ¥½¹Ì½±…å•È)‰Õ‘•ÑÌìMµÕ‘”½<½•‘”µÍ•…´…ÕÑ¡½É¥¹œÅÕ•Õ•¸ÕÉÉ•¹ÐÔÄË
È¼ÄÀÈÓ
È¼ÈÔÛ
È½‰…Í”¬ÌÕ¹¡…¹•¸((´mátUÍ•È€¸äÌÌAMLÁÉ½Ñ•ÑÌ½¹¹•Ñ•ÍÕÉ™…”¥µ…”ÝÉ…ÁÁ¥¹œ°¹•áÐµ™…”Á±…•µ•¹Ð½I½Ñ…Ñ”½M…±”°ÁÁ±ä½¡¥ÍÑ½Éä½M…Ù•=Á•¸¸(´lt€¸äÌÐ‘•Ù¥”è½µÁ…É”µ½Õ¹ÐÄÙ•ÉÍÕÌÌÈ½¸Í…µ”Á…¥¹Ñ•µ…É¬€¡U¹‘¼‰•ÑÝ••¸¤°=Á…¥ÑäÄÀÀ”ì¡¥¡•È…µ½Õ¹ÐÙ¥Í¥‰±äÍ½™Ñ•È½Ý¥‘•È¸(´lt€¸äÌÐ‘•Ù¥”è±½Ý•È=Á…¥Ñäµ¥á•Ì±•ÍÌìM¥é”¡…¹•Ì…™™•Ñ•…É•„¸¥ÉÍÐ½¹Ñ…Ð½µ…àµµ½Õ¹Ð±…Ñ•¹ä…•ÁÑ…‰±”¸(´lt€¸äÌÐ‘•Ù¥”è	±ÕÈ½Ù•È‰½Ñ Í¥‘•Ì½˜Õ‰”•‘”°U¹‘¼½I•‘¼ÍÑ…åÌ¥¸A…¥¹ÐÝ¥Ñ µ½Õ¹ÐÉ•Ñ…¥¹•ì½¹Ñ¥¹Õ”Á…¥¹Ñ¥¹œ…¹ÝÉ…ÁÁ•¥µ…•ÌÉ•µ…¥¸¥¹Ñ…Ð¸((¸äÌÐ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØÜÔAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)½ÕÍ•ÈÙAML€¬É•±•…Í”ÕAMLì¹¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸!½ÍÑ•½A…•Ì½±¥Ù”)Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌì…ÑÕ…°¥A…äÌÐÍÑÉ•¹Ñ ½±…Ñ•¹ä…Ñ”Á•¹‘¥¹œ¸((ŒŒ€¸äÌÐÁÕ‰±¥…Ñ¥½¸±½Í•ìÕÍ•ÈAMLƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ•‰ŒàÐÐÔÁ”ÜØÁ„ÔÐÐÈÐäÌá”Á˜ÈÔÐáÀÕ•„Á……˜Å”°Ñ•ÍÑ•ÑÉ••”ÔåˆÉ‰…ŒÍˆåŒÔÌÅ„àÄÔÐÀÍ˜Ù‰…ˆÄàÄÙå”Í„ÀÑ…”°)ÁÕ‰±¥Í¡•¸!½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÔÄÈÈäÐÌÐÜ½©½ˆÄÄàäÌØÀÄØÜÀà±½Ì½¹™¥É´ÈØÜÕAML¼(Á%0¼ÁÍ­¥À°µ…Ñ¡¥¹œÉ•½É‘•±½…°9½‘”ÈÐÉÕ¸¸A…•ÌÌäÔÄÈÈäÌÀÐà½‘•Á±½äÄÄàäÌØÈÈÔÌÜä)ÍÕ••‘•¸1¥Ù”äÌÐµ…¹¥™•ÍÐ…¹…±°ÈÜ¡•­•ÉÕ¹Ñ¥µ”½ÁÉ½Ñ•Ñ•™¥±•Ì‰åÑ”µµ…Ñ Ñ¡”)ÁÕ‰±¥Í¡•äÌÐÍ½ÕÉ”€¡¥ÐµÍ¡½ÜÍ¹…ÁÍ¡½ÐÕÍ•Ý¡¥±”äÌÔÝ½É­¥¹œÑÉ•”Ý…Ì‘¥ÉÑä¤¸UÍ•È)AMLäÌÐÁÉ½Ñ•ÑÌ‘•‘¥…Ñ•	±ÕÈµ½Õ¹ÐÇŠLÌÈ½‘•™…Õ±Ðà°¥¹‘•Á•¹‘•¹Ð=Á…¥Ñä½M¥é”°É•Ñ…¥¹•)A…¥¹Ð¡¥ÍÑ½Éä…¹•…É±¥•ÈäÌÌ¥µ…”ÝÉ…ÁÁ¥¹œ¸AÉ¥½È¥¹Ñ•ÉÉÕÁÑ•ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜¥Ì¹½Ü)±½Í•ì¹¼¹•ÜäÌÐÉÕ¹Ñ¥µ”¡…¹•Ì¸±Á¡„äÈä…•ÁÑ…¹”É•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ñ±äÁ•¹‘¥¹œ¸((ŒŒ€¸äÌÔƒŠP%µ…”Ñ¼Á…¥¹Ð½¹Ù•ÉÍ¥½¸ì€¸äÌÐAMLƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()Õ‘¥Ðµ…¥¹‰ŒàÐÐÔÁŒ½±¥Ù”äÌÐèÍ½ÕÉ”µÁÉ•Í•ÉÙ•¥µ…”…¡”…¹•áÁ±¥¥ÐÁ…¥É•É•Á±…•µ•¹Ð)•á¥ÍÐì¹¼É…ÍÑ•È½¹Ù•ÉÍ¥½¸¸áÑ•¹½É¥¥¹…°Á…¥¹Ðµ±…å•ÈµÍÑ…¬Ý¥Ñ •áÁ±¥¥Ð)É…ÍÑ•É¥é•%µ…•A…¥¹Ñ1…å•ÈèÙ…±¥‘…Ñ•½Ý¹•Í¹…ÁÍ¡½Ð°Í…µ”ÍÑ…¬½Ù•ÉÍ¥½¸½½É‘•È½%½¹…µ”¼)Ù¥Í¥‰¥±¥Ñä½½Á…¥Ñä½‰±•¹½µ…Í¬½Á¥á•±Ìì=91dÍ•±•Ñ•¥µ…”É•¥Á”‰•½µ•Ì¹Õ±°¸á¥ÍÑ¥¹œ)½µÁ½Í¥Ñ½ÈÙ•É¥™¥•Ì¥‘•¹Ñ¥…°…ÁÁ•…É…¹”°¥¹±Õ‘¥¹œ•Ù•ÉäÍÕÁÁ½ÉÑ•‰±•¹…¹¥¹Ù•ÉÑ•)µ…Í¬¸9¼¥µÁ±¥¥Ð½µÁ½Í¥Ñ¥¹œ¥¹Ñ¼‰…Í”°•áÑÉ„±…å•È°É•Í…µÁ±¥¹œ°¹•ÜÝÉ¥Ñ•È½Í¡•µ„°)‰ÉÕÍ °¡¥ÍÑ½Éä°µ½‘•±±¥¹œ½ÈUX½Ý¹•È¸á¥ÍÑ¥¹œÑ¡É•”µ½Ù•É±…ä¼ÔÄË
È±¥µ¥ÑÌÕ¹¡…¹•¸()%µ…”µ½¹±ä½¹Ù•ÉÐÑ¼Á…¥¹Ð‰ÕÑÑ½¸ÕÍ•Ì½É¥¥¹…°±…å•ÉÑ¥½¸½Í•¹”¡•­Á½¥¹Ð½ÁÉ•™±¥¡Ð¼)=\½Ý¹•È¸½¹Ù•ÉÍ¥½¸Í•±•ÑÌ½±½ÕÈ•Ù•¸Ý¡•¸¥µ…”µ…Í¬Ý…ÌÍ•±•Ñ•ì	ÉÕÍ °É…Í•È°)¥±°…¹	±ÕÈÑ¡•¸ÕÍ”½É¥¥¹…°É…ÍÑ•È…¹…•ÁÑ•äÌÐµ½Õ¹Ð¸=Ñ¡•È¥µ…”±…å•ÉÌ­••À)Í½ÕÉ”•‘¥Ñ¥¹œ¸M…µ”Á¥á•±Ì¥¹±Õ‘”äÌÌÝÉ…ÁÁ•Á±…•µ•¹Ð¸‘¥Ð¥µ…”‰ÕÑÑ½¸‘¥Í…ÁÁ•…ÉÌ)‰ä½É¥¥¹…°ÍÑ…Ñ”Ý¡•¸¹¼É•¥Á”ì¹…µ”½Í±½ÐÉ•Ñ…¥¹•¸U¹‘¼É•ÍÑ½É•ÌÉ•Ñ…¥¹•Í½ÕÉ”…¹)Á±…•µ•¹Ð•‘¥Ñ¥¹œ°I•‘¼É•ÍÑ½É•ÌÉ…ÍÑ•È½¹Ù•ÉÍ¥½¸¸™Ñ•ÈM…Ù”½=Á•¸½¹Ù•ÉÑ•±…å•È¥Ì)½É‘¥¹…Éä•‘¥Ñ…‰±”Á¥á•±ÌìÍ½ÕÉ”É•¥Á”¥Í¸ÐÍ•É¥…±¥é•™½ÈÑ¡…Ð±…å•È¸=Ñ¡•È½‰©•ÑÌ)Í¡…É¥¹œ½±É•Í½ÕÉ”…¹½É¥¥¹…°Í…Ù•¥µ…”Í½ÕÉ•ÌÉ•µ…¥¸Õ¹¡…¹•¸M½ÕÉ”É•±•…Í”)É•‘Õ•Ì½µµ¥ÑÑ•É•Í½ÕÉ”‰åÑ•ÌìU¹‘¼µ…äÍÑ¥±°É•Ñ…¥¸¥Ð¥¸‰½Õ¹‘•Í•¹”¡¥ÍÑ½Éä¸()	±½¬½¹Ù•ÉÍ¥½¸Ý¡¥±”ÍÑ…•¥µ…”Á±…•µ•¹Ð•á¥ÍÑÌ°­••Á¥¹œ…¹‘¥‘…Ñ”½½µµ¥ÑÑ•Ý½É¬)¥¹Ñ…ÐìÁÁ±ä½…¹•°™¥ÉÍÐ¸5¥ÍÍ¥¹œ½¹½¹¥µ…”½Í…±…È½ÍÑ…±”Ñ…É•Ð½¡•­Á½¥¹Ð½Á½½°•ÉÉ½ÉÌ)±•…Ù”½µµ¥ÑÑ•É•Í½ÕÉ•Ì½¡¥ÍÑ½ÉäÕ¹Ñ½Õ¡•¸I•…µ½¹±ä¥µ…”µ•ÍÍ…”­••ÁÌ…•ÁÑ•(%µ…”½±½ÕÈ¥ÌÉ•Ñ…¥¹•œÁÉ•™¥à…¹Á½¥¹ÑÌÑ¼½¹Ù•ÉÍ¥½¸¸U$É•ÑÕÉ¸½É•ÍÕ±ÐÉ•ÕÍ•™½È)…ÕÉ…Ñ”ÍÕ•ÍÌÍÑ…ÑÕÌ°¹¼Í•Á…É…Ñ”¥¹ÁÕÐ½±¥ÍÑ•¹•È½¡¥ÍÑ½ÉäÍåÍÑ•´¸ÕÉÉ•¹ÐA…¥¹ÐÍÑ…åÌ¸()¥Ù”¹•ÜÑ•ÍÑÌè…±°µ‰±•¹½µ…Í¬•á…Ð…ÁÁ•…É…¹”…¹½Ý¹•‰Õ™™•ÉÌ½‰åÑ”…½Õ¹Ñ¥¹œì)…ÑÕ…°ÝÉ…ÁÁ•¥µ…”U'ŠI½¹Ù•ÉÓŠIÍÑÉ½¹œ	±ÕËŠIA…¥¹ÐU¹‘½I•‘¿ŠIM…Ù•=Á•»ŠI•á…Ð¹…Ñ¥Ù”A9ì)µ…Í¯ŠI½±½ÕÈ…¹	ÉÕÍ ½É…Í•È½™Õ±°µÍÑ…¬½½Ñ¡•Èµ¥µ…”½Í…±…È‰•¡…Ù¥½ÈìÍÑ…•½µ¥ÍÍ¥¹œ½ÍÑ…±”¼)¡•­Á½¥¹Ð½Á½½°É•™ÕÍ…°ìÍÑ…•U$•‘¥Ð½…¹•°Õ…É¸9•…É‰ääÀà¼äÌÌ¼äÌÐ…¹É•±•…Í”Ô)É•µ…¥¸…Ñ¥Ù”ì™Õ±°½ÁÕ‰±¥…Ñ¥½¸‰•±½Ü¸½µÁ±•Ñ”¡…¹•ÍÑ…¬½É•Í½ÕÉ”½ÁÉ½©•Ð½•áÁ½ÉÐ¼)1…ˆ½µ…¥¸É•Ù•ÉÍ”±½…‘•ÈÉ…Á äÌÔì™Õ¹Ñ¥½¹…°¡…¹”½¹™¥¹•Ñ¼½É¥¥¹…°Ì½Ý¹•ÉÌ¸)•ÁÑ•É…ÍÑ•ÈäÌÐ°ÝÉ…ÀäÌÌ½UX½µ•Í ­•É¹•±Ì½µ…¥¸½…”½5Õ±Ñ¤½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸)I•…‘½Ì½Á…¥¹Ðµ¥µ…”µÉ…ÍÑ•É¥é”´äÌÔ¹µ¸•Ù¥”äÌÔ½¹Ù•ÉÍ¥½¸½‰±ÕÈ½U¹‘¼™••°Á•¹‘¥¹œ¸)9•áÐ5•É”½Ý¸½±…ÑÑ•¸Ñ¡É½Õ •á¥ÍÑ¥¹œ½µÁ½Í¥Ñ½ÈÑ¼™É•”Í±½ÑÌ°Ñ¡•¸ÍÑ…•Ñ•áÑÕÉ”¼)Í½ÕÉ”½…±Á¡„É•Í½±ÕÑ¥½¸…¹±…å•È‰Õ‘•ÑÌ¸MµÕ‘”½<½UX•‘”µÍ•…´…ÕÑ¡½É¥¹œÅÕ•Õ•ì)É•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•¸ÕÉÉ•¹ÐÔÄË
È¼ÄÀÈÓ
È¼ÈÔÛ
È½‰…Í”¬ÌÉ•Ñ…¥¹•¸((´mátUÍ•ÈäÌÑAMLÁÉ½Ñ•ÑÌ	±ÕÈµ½Õ¹Ð½=Á…¥Ñä½M¥é”…¹½É¥¥¹…°A…¥¹Ð½¡¥ÍÑ½Éä°…±½¹Í¥‘”äÌÌÝÉ…ÁÁ•Á±…•µ•¹Ð¸(´lt€¸äÌÔ‘•Ù¥”èÍ•±•Ð…ÁÁ±¥•¥µ…—ŠI½¹Ù•ÉÐÑ¼Á…¥¹Ðì…ÁÁ•…É…¹”½Á±…•µ•¹ÐÕ¹¡…¹•°Ñ¡•¸	ÉÕÍ ½	±ÕÈµ½Õ¹Ð•‘¥ÑÌ¥Ð¸(´lt€¸äÌÔ‘•Ù¥”èU¹‘¼•‘¥ÑÌÑ¡•¸½¹Ù•ÉÍ¥½¸É•ÍÑ½É•Ì‘¥Ð¥µ…”ìI•‘¼É•ÑÕÉ¹Ì½¹Ù•ÉÑ•Á…¥¹Ð°ÍÑ…å¥¹œ¥¸A…¥¹Ð¸(´lt€¸äÌÔ‘•Ù¥”èM…Ù”½=Á•¸É•Ñ…¥¹Ì½¹Ù•ÉÑ•Á…¥¹Ðì½Ñ¡•È¥µ…”±…å•ÉÌÉ•µ…¥¸•‘¥Ñ…‰±”¸ÁÁ±ä½…¹•°ÍÑ…•Á±…•µ•¹Ð‰•™½É”½¹Ù•ÉÍ¥½¸¸((¸äÌÔ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØàÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)½ÕÍ•ÈåAML€¡¹•ÜÔ°¥µ…”äÀà•¥¡Ð°ÝÉ…ÀäÌÌÍ¥à°µ½Õ¹ÐäÌÐ™¥Ù”°É•±•…Í”Ô¤ì¹¼)•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌ¸((ŒŒA•Éµ…¹•¹Ð½µÁ±•Ñ¥½¸µ¥¹ÍÑÉÕÑ¥½¸…Õ‘¥ÐƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á•…Ñ•AML€½¹•áÑ‰Õ¥±Ý¡¥±”äÌÔÁÕ‰±¥…Ñ¥½¸Ý…ÌÁ•¹‘¥¹œ…¹…Í­•Ñ¼…Õ‘¥Ð)µ…¹Õ…°µÑ•ÍÐ¥¹ÍÑÉÕÑ¥½¹Ì¸%}]=I-1=\…±É•…‘ä•áÁ±¥¥Ñ±äÉ•ÅÕ¥É•ÌÉ•…‘¥¹•ÍÌ½‰Õ¥±)¹Õµ‰•È…¹ÏŠLØÅÕ¥¬‘•Ù¥”¡•­Ìì%}!9=…±Í¼½¹Ñ…¥¹•Ñ¡”Ää=Ñ½‰•ÈÉ•µ¥¹‘•È)¥¹Í¥‘”…¸½±‘•È•¹ÑÉä¸AÉ½µ½Ñ•Ñ¡”Í…µ”ÉÕ±”Ñ¼Ñ¡”Q=@½˜%}!9=…Ì„Á•Éµ…¹•¹Ð)Í•Ñ¥½¸¸%Ð…ÁÁ±¥•Ì•Ù•Éä‰Õ¥±°¥¹±Õ‘¥¹œ…¸•áÁ±¥¥Ð¹¼µ¹•ÜµÑ•ÍÐÍÑ…Ñ•µ•¹ÐÝ¡•¸)…ÁÁÉ½ÁÉ¥…Ñ”ì¹•Ù•È•¹Ý¥Ñ ½¹±äÁÉ½É•ÍÌ¸9¼ÉÕ¹Ñ¥µ”¡…¹”¥¸Ñ¡¥Ì…Õ‘¥Ð¸ÕÉÉ•¹Ð)¹•áÐ‰Õ¥±É•µ…¥¹ÌäÌÔ€¡ÁÕ‰±¥Í¡•µ…¥¸Ý…ÌäÌÐÝ¡•¸AML…ÉÉ¥Ù•¤ì™¥¹¥Í äÌÔ…¹¥ÑÌ)¡…¹‘Ìµ½¸¥µ…”½¹Ù•ÉÍ¥½¸½	±ÕÈ½U¹‘¼½M…Ù•=Á•¸±¥ÍÐ‰•™½É”‘•±…É¥¹œ¥ÐÉ•…‘ä¸((ŒŒ€¸äÌÔÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÐÑŒÑ•˜ÀÌÙ™Ý™„ÅØÅ‰‰•”ÐàÀÉ„ÔÀØÄØÙŒÐåˆÍ€°ÁÕ‰±¥Í¡•ÑÉ•”)˜ÌÜÐäàÀÌÈÐÌÄÀÝ„ÀäÝ•ˆÜäáŒÔÙ•‘ˆÁ•ŒÜÍ„ÄäÀÍ€°µ…Ñ¡•Ì±½…°µ…¥¸•á…Ñ±ä¸)=É¥¥¹…°±½…°Ñ•ÍÑ•ÑÉ••…ŒÔØØÌÀÔ¡…¥‘•¹Ñ¥…°ÉÕ¹Ñ¥µ”ì½¹±ä™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì)¡…¹•Ñ¼ÁÉ½µ½Ñ”Ñ¡”Á•Éµ…¹•¹Ð½µÁ±•Ñ¥½¸ÉÕ±”‰•™½É”ÁÕ‰±¥…Ñ¥½¸¸¥Ð…Ñ„ÑÉ•”)Ù•É¥™¥•Ý¥Ñ …±°Èà‰±½‰Ì¸1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÔàØØÀÄÔÔØ¼)©½ˆÄÄäÄÜØäÌÜÌØÀ‰½Ñ Á…ÍÌ€¨¨È°ØàÀÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì™Õ±°¡½ÍÑ•±½Ì)Ù•É¥™¥•¸A…•ÌÌäÔàØØÀÄÀÜä½‘•Á±½äÄÄäÄÜÜÄÔÐÄÌÀÍÕ••‘•¸±°ÌÜ™É•Í ¡•­•±¥Ù”)™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”¡…¹•É•Í½ÕÉ”½ÁÉ½©•Ð½•áÁ½ÉÐ½1…ˆ½Á…¥¹Ð)±½…‘•ÈÉ…Á …¹É•Ñ…¥¹•É…ÍÑ•ÈäÌÐ°ÝÉ…ÀäÌÌ°UX¥¹ÍÁ•Ñ½È°µ…¥¸½…”½5Õ±Ñ¤Ä¸À½É•½Ù•Éä¼)¥µ…”µÍ½ÕÉ”½Ý¹•ÉÌ¸É½é•¸‰Õ¥±‘ÌÕ¹Ñ½Õ¡•ì¹¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸()!…¹‘½™˜…Õ‘¥Ð½µÁ±•Ñ”èÁ•Éµ…¹•¹ÐÉ•…‘¥¹•ÍÌ½‰Õ¥±½µ…¹Õ…°µÑ•ÍÐÉÕ±”Ý…Ì…±É•…‘ä¥¸)%}]=I-1=\…¹…¸½±‘•È%}!9=•¹ÑÉäì¹½ÜÁÉ½µ¥¹•¹Ñ±ä…ÐQ=@½˜%}!9=¸)Ù•Éä™¥¹¥Í¡•‰Õ¥±µÕÍÐ¥Ù”¥ÑÌÉ•…‘¥¹•ÍÌ°‰Õ¥±¹Õµ‰•È…¹Í¡½ÉÐ‘•Ù¥”Ñ•ÍÑÌ°)½È•áÁ±¥¥Ñ±äÍ…ä¹¼¹•ÜÑ•ÍÐ¥Ì¹••‘•¸9•Ù•È•¹Ý¥Ñ ÁÉ½É•ÍÌ…±½¹”¸)±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹Ð¸Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸()	Õ¥±äÌÔ½µÁ±•Ñ”…¹É•…‘äè…ÁÁ±¥•¥µ…”±…å•ËŠI½¹Ù•ÉÐÑ¼Á…¥¹Ð°…ÁÁ•…É…¹”­•ÁÐì)	±ÕÈµ½Õ¹Ð½	ÉÕÍ ½É…Í•È•‘¥ÑÌÁ¥á•±ÌìU¹‘¼•‘¥ÑÌ…¹½¹Ù•ÉÍ¥½¸É•ÍÑ½É•Ì‘¥Ð¥µ…”ì)I•‘¼Ñ¡•¸M…Ù•=Á•¸É•Ñ…¥¹Ì•‘¥Ñ…‰±”Á…¥¹Ð¸M½ÕÉ”É•¥Á”‰•±½¹ÌÑ¼½±U¹‘¼É•Í½ÕÉ”°)¹½ÐÑ¡”½¹Ù•ÉÑ•Í…Ù•±…å•Èìµ…Í­Ì½‰±•¹‘Ì½½Ñ¡•È¥µ…”±…å•ÉÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ð¸)UÍ•ÈäÌÑAMLÁÉ½Ñ•Ñ•ì…ÑÕ…°äÌÔ…ÁÁ•…É…¹”½™••°…Ñ”Á•¹‘¥¹œ¸9•áÐ5•É”½Ý¸½±…ÑÑ•¸)Ñ¼™É•”Í±½ÑÌ°Ñ¡•¸ÍÑ…•É•Í½±ÕÑ¥½¸½±…å•È‰Õ‘•ÑÌìMµÕ‘”½<½Í•…´…ÕÑ¡½É¥¹œÅÕ•Õ•¸)I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÉ•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ðì…±Á¡„äÈä‘•Ù¥”…Ñ”¹½Ð¥¹™•ÉÉ•¸((ŒŒ€¸äÌÔÕÍ•ÈAML€¼€¸äÌØÉ•Í½±ÕÑ¥½¸É•É•ÍÍ¥½¸ƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ((´mátUÍ•È€¸äÌÔAMLè¥µ…—ŠIÁ…¥¹Ð…ÁÁ•…É…¹”½	ÉÕÍ ½É…Í•È½	±ÕÈ°U¹‘¼É•ÍÑ½É•Í½ÕÉ”°(€I•‘¼½M…Ù•=Á•¸•‘¥Ñ…‰±”Á¥á•±Ì¸…É±¥•È€¸äÌÌ¼¸äÌÐ…¹A…¥¹Ðµ¡¥ÍÑ½ÉäAMM•ÌÁÉ½Ñ•Ñ•¸(´ltY%€¸äÌØèA…¥¹ÐƒŠHQ•áÑÕÉ”É•Í½±ÕÑ¥½¸ƒŠH%¹É•…Í”Ñ¼ÄÀÈÓ\ÄÀÈÐì•á¥ÍÑ¥¹œµ…É­Ì(€É•Ñ…¥¹•ì™É•Í ™¥¹”ÍÑÉ½­•Ì½¹•Ý±äÁÉ½©•Ñ•¥µ…”ÕÍ”Í¡…ÉÁ•ÈÉ¥ìA…¥¹ÐÍÑ…åÌ½Á•¸¸(´ltY%èU¹‘¿ŠHÔÄÈ€¼I•‘¿ŠHÄÀÈÐìM…Ù”½=Á•¸É•Ñ…¥¹ÌÄÀÈÐ°½¹Ñ¥¹Õ•Á…¥¹Ðì•áÁ½ÉÐÑ¼(€9½µ…ÁÉ•Í•ÉÙ•Ì¥µ…”Á±…•µ•¹Ð…¹™É•Í µ…É­Ì¸Q•ÍÐ±…É•ÈM¥é”½	±ÕÈ™••°¸(´ltY%èI½Õ¡¹•ÍÌ½5•Ñ…±¹•ÍÌ…¹µ…Í¬½½±½ÕÈÍÝ¥Ñ¡¥¹œÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ð¸(´ÕÑ½µ…Ñ•€¸äÌØè•á…Ð½Ý¹•Ë\½±½ÕÈ½¥µ…”½µ…Í¬É•Á±¥…Ñ¥½¸°É•Ñ…¥¹•Í½ÕÉ”½Í•ÑÑ¥¹Ì°(€½É¥¥¹…°½¹”µ¡•­Á½¥¹ÐU$½¡¥ÍÑ½Éä½½¹Ñ¥¹Õ•ÄÀÈÐ	ÉÕÍ ­	±ÕÈ½µ…Í¬°ÔÄÈÍ…±…È½µ…Ñ•É¥…°(€‘¥µ•¹Í¥½¹Ì°½µµ¥ÑÑ•‘¥ÍÁ±…ä°Ñ¡É•”½Ù•É±…åÌ°Á½½±•Í•¹”ÑÉ…¹ÍÁ½ÉÐ½•á…Ð¹…Ñ¥Ù”A9°(€ÁÉ•‘•½‘”½ÉÉÕÁÑ¥½¸½ÅÕ½Ñ„°ÍÑ…•½¡•­Á½¥¹Ð½ÍÑ…±”É½±±‰…¬¸9¼¥A…Á•É™½Éµ…¹”ÁÉ½½˜¸(´AÉ•Í•ÉÙ”½±ÔÄÈ…¹½Á…ÅÕ•ØÄÅÕ½Ñ„Ñ•ÍÑÌì½¹±ä±…å•É•ÄÀÈÐ½ÁÑÌ¥¹Ñ¼¹•Ü‰Õ‘•ÑÌ¸(€á¥ÍÑ¥¹œÍ½ÕÉ”½Ñ¥À½±…å•Èµ½Õ¹Ð½™¥±”½¹…Ñ¥Ù”…ÁÌ…¹UX½Ý½É¬Õ…É‘ÌÉ•µ…¥¸…Ñ¥Ù”¸((¸äÌØ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØàÜAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)M•Ù•¸¹•ÜÉ•Í½±ÕÑ¥½¸¥¹Ñ•É…Ñ¥½¹ÌÁ±ÕÌ•Ù•Éä½É¥¥¹…°Ñ•ÍÐÁ…ÍÌÕ¹¡…¹•¸I•Ù¥•Ý•)É•±•…Í”½…¡”½¹ÑÉ…ÐÕAML°½É¥¥¹…°äÀÈÍ¥é”ÔÄÌÉ•™ÕÍ…°É•Ñ…¥¹•¸%¹¥Ñ¥…°•áÁ±½É…Ñ½Éä)ÉÕ¸…‘µ¥ÑÑ•¥¹Ñ•Éµ•‘¥…Ñ”Í¥é•Ìì½É¥¥¹…°Õ…É¹½Ü½¹±ä…‘‘Ì•á…ÐÄÀÈÓ
È…‰½Ù”ÔÄÈ¸)1™¥áÑÕÉ”™½±±½ÝÌ…ÑÕ…°ÁÉ¥µ¥Ñ¥Ù”µ…Ñ•É¥…°%ì¹¼ÁÉ½‘ÕÑ¥½¸ÝÉ¥Ñ•ÈÝ½É­…É½Õ¹¸)±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹Ð¸AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌì)…ÑÕ…°€¸äÌØ¥A…Í¡…ÉÁ¹•ÍÌ°‰ÉÕÍ ½	±ÕÈ±…Ñ•¹ä…¹µ•µ½Éä…•ÁÑ…¹”É•µ…¥¸Á•¹‘¥¹œ¸((ŒŒ€¸äÌØÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”‘ÌÄÍ„Àá„ÀÄØÍ•„ÄÙ„àØÀÌÑˆØÀÜÔÔÍ‰™˜ÀÙ”ØÌÕ€°Ñ•ÍÑ•ÑÉ•”)€àÀÄØÔÀàå˜Á•‘”ÌÄÁ••‘”ÐÐÑ˜Ý•‰äÜÉ™™˜äÁÁ€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ð)…Ñ„ÕÁ±½…‘•ÌÄ•á…Ð‰±½‰Ì…¹É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°Ñ•ÍÑ•ÑÉ•”ì™•Ñ¡•µ…¥¸)µ…Ñ¡•…¹±½…°‰É…¹ Ý…Ì…±¥¹•Ý¥Ñ¡½ÕÐ™¥±”¡…¹•Ì¸1½…°9½‘”ÈÐ…¹¡½ÍÑ•)9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÔäÌÌÔØÔÌÐ½©½ˆÄÄäÄääÔÐÔÀÐÀ‰½Ñ Á…ÍÌ€¨¨È°ØàÜÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼(ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•ÌÌäÔäÌÌÔÔÈàÄ½‘•Á±½äÄÄäÄääÜÔØÜÌÜ)ÍÕ••‘•¸±°ÌÄ¡•­•ÉÕ¹Ñ¥µ”½1…ˆ½Í¡•±°½É•½Ù•Éä½ÁÉ½Ñ•Ñ•™¥±•Ì‰åÑ”µµ…Ñ ¸)%¹¥Ñ¥…°™•Ñ ‰•…¸‘ÕÉ¥¹œÉ½±±½ÕÐ…¹É•ÑÕÉ¹•Í¥à€¸äÌÔ…¹•ÍÑ½ÉÌì™É•Í Á½ÍÑ‘•Á±½ä)É•¡•­Ì±½Í•…±°Í¥à¸9¼™É½é•¸½µ…¥¸½…”½5Õ±Ñ¤•‘¥ÑÌ¸±•Ù•¸™Õ¹Ñ¥½¹…°½Ý¹•ÉÌì)•±•Ù•¸É•Ù•ÉÍ”µÉ…Á Á…É•¹Ð™¥±•Ì½¹Ñ…¥¸…¡”µÉ•™•É•¹”¡…¹•Ì½¹±ä¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹Ð¸AÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±ä°Í…µ”ÉÕ¹Ñ¥µ”‰åÑ•Ì¸)UÍ•È€¸äÌÔAMLÁÉ½Ñ•ÑÌ½¹Ù•ÉÍ¥½¸½	±ÕÈ½•‘¥Ð½¡¥ÍÑ½Éä½Á•ÉÍ¥ÍÑ•¹”ì€¸äÌØ‘•Ù¥”‘•Ñ…¥°¼)±…Ñ•¹ä½µ•µ½Éä…Ñ”É•µ…¥¹ÌÁ•¹‘¥¹œ¸I•…‘äèA…¥¹ÐƒŠHQ•áÑÕÉ”É•Í½±ÕÑ¥½¸ƒŠH%¹É•…Í”)Ñ¼ÄÀÈÓ\ÄÀÈÐì™É•Í ÍÑÉ½­•Ì½¹•Ü¥µ…”Á±…•µ•¹Ð°U¹‘¼ÔÄÈ½I•‘¼ÄÀÈÐ°M…Ù•=Á•¸…¹9=5¸)á¥ÍÑ¥¹œÁ¥á•±Ì•¹±…É”•á…Ñ±äìÉ”µÁ±…”É•Ñ…¥¹•Í½ÕÉ•Ì™½È™É•Í ¥µ…”‘•Ñ…¥°¸)%¹‘•Á•¹‘•¹ÐÔÄÈÍ…±…ÉÌ½Í½ÕÉ”ÄÀÈÐ½…±Á¡„ÈÔØ½‰…Í”­Ñ¡É•”±¥µ¥ÑÌÉ•Ñ…¥¹•¸9•áÐÉ•Í½±ÕÑ¥½¸)™••‘‰…¬Ñ¡•¸5•É”½Ý¸½±…ÑÑ•¸ì±…É•ÈÍ½ÕÉ•Ì½µ…ÁÌ½±…å•ÉÌÉ•µ…¥¸ÍÑ…•¸((ŒŒ€¸äÌÜ™É•Í ÄÀÈÐ‘•™…Õ±ÐƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ((´UÍ•È€¸äÌØÉ•Á½ÉÑÌÁ¥á•±…Ñ•¥µ…”…¹™É•Í Õ‰”Á…¥¹Ð…™Ñ•ÈÉ•™É•Í ì9=P„AML¸(€½¹™¥Éµ•…Õ‘¥Ðè€¸äÌØÁÉ½‘ÕÑ¥½¸‘•™…Õ±ÐÉ•µ…¥¹•ÔÄÈ°%¹É•…Í”½ÁÐµ¥¸Ý…Ì½±±…ÁÍ•¸(´ltY%¹•ÜÕ‰”èA…¥¹ÐÍ¡½ÝÌ½±½ÕÈÑ•áÑÕÉ”ÄÀÈÓ\ÄÀÈÐ¥µµ•‘¥…Ñ•±ä°‰•™½É”Á…¥¹Ð(€½È…‘‘¥¹œ¥µ…”ì½µÁ…É”™É•Í ™¥¹”ÍÑÉ½­•Ì½¹•Ü¥µ…”°½É‰¥Ð½é½½´…¹É•ÍÁ½¹Í¥Ù•¹•ÍÌ¸(´ltY%U¹‘¼½I•‘¼É•µ…¥¹Ì¥¸A…¥¹ÐìM…Ù”½=Á•¸­••ÁÌÄÀÈÐ¸á¥ÍÑ¥¹œÔÄÈÁÉ½©•Ð(€½Á•¹Ì…ÐÔÄÈÝ¥Ñ •áÁ½Í•%¹É•…Í”ì•á¥ÍÑ¥¹œÁ¥á•±ÌÍÑ…ä•á…ÐÕ¹Ñ¥°•áÁ±¥¥Ð…Ñ¥½¸¸(´ÕÑ½µ…Ñ•€¸äÌÜ…ÑÕ…°U$èÄÀÈÐ™¥ÉÍÐµ•‘¥ÐÁ…¥¹Ð…¹¥µ…”É…ÍÑ•È°¹¼‰±…¹¬=Á•¸½µµ¥Ð°(€™¥ÉÍÐµÍÑÉ½­”U¹‘¼½I•‘¼½¹•Üµ½¹ÑÉ½±±•ÈÉ•½Á•¸°±•…äÔÄÈ½¹”µÍÑ•À%¹É•…Í”°•á…ÐÍ•¹”¼(€¹…Ñ¥Ù”ÄÀÈÐA9…¹ÔÄÈÍ…±…È¥¹‘•Á•¹‘•¹”¸€¸äÌØ•¹±…É•µ•¹Ð™¥áÑÕÉ•Ì•áÁ±¥¥Ñ±äÔÄÈì(€…±Á¡„¡•­ÌÕÍ”…ÑÕ…°É¥ìÍ…±…È¡•­Ì½Ù•È•Ù•Éä‘¥ÍÁ±…äÑ•á•°……¥¹ÍÐÉ…ÜÔÄÈ¸(´á¥ÍÑ¥¹œ•½µ•ÑÉä½UX½Á…¥¹Ð½ÁÉ½©•Ð½•áÁ½ÉÐ½ÅÕ½Ñ…Ì…¹5Õ±Ñ¤½™É½é•¸½¹ÑÉ…ÑÌÉ•Ñ…¥¹•¸(€•Ù¥”Í¡…ÉÁ¹•ÍÌ¹½Ð¥¹™•ÉÉ•™É½´9½‘”‘¥µ•¹Í¥½¹Ì½Á¥á•°‰åÑ•Ìì„ÄÀÈÐ…Ñ±…Ì¥ÌÍ¡…É•¸((´€¸äÌÜ…ÑÕ…°ÄÀÈÐÑ¡É•”µ±…å•ÈÁ…¥¹Ñ•ÕÁ±¥…Ñ”µÕÍÐM…Ù”½=Á•¸…‰½Ù”ÌÉ5¥Ñ¡É½Õ (€½É¥¥¹…°¥±”…Ñ¥½¹Ì°•á…ÐÉ•Í½ÕÉ”‰åÑ•Ì¸äÙ5¥¡¥ µÉ•Ì…À¼ÌÉ5¥±•…ä…À(€…¹½Ù•Èµ…À½½ÉÉÕÁÑ¥½¸½Í•¹”­¡¥ÍÑ½ÉäÁÉ•Í•ÉÙ…Ñ¥½¸¡•­ÌÉ•µ…¥¸…Ñ¥Ù”¸((¸äÌÜ™¥¹…°±½…°Ù…±¥‘…Ñ¥½¸è½µÁ±•Ñ”È°ØäÄµ¡•¬ÉÕ¸Á…ÍÍ•È°ØäÀìÑ¡”¹•Ü¡¥ µÉ•Ì)¥±”Ñ•ÍÐ¡……±É•…‘äÍ…Ù•½É•½Á•¹••á…ÐÁ¥á•±Ì°Ñ¡•¸„Ñ•ÍÐµ½¹±äÉ½ÍÌµÉ•…±´)•µÁÑäµ…ÉÉ…ä½µÁ…É…Ñ½È™…¥±•¸I•Á±…•Ñ¡…Ð½µÁ…É…Ñ½ÈÝ¥Ñ ½É¥¥¹…°¡¥ÍÑ½Éä±•¹Ñ ¼)¥‘•¹Ñ¥Ñä¡•­Ì°É•Ñ…¥¹¥¹œ•Ù•Éä…ÍÍ•ÉÑ¥½¸¸½ÉÉ•Ñ•™½ÕÍ•¡¥ µÉ•ÌÑ•ÍÐ¹½ÜÅAML( ØåÌ¤°¥¹±Õ‘¥¹œ…ÑÕ…°øÌÉ5¥M…Ù”½=Á•¸°äÙ5¥ÁÉ”µÉ•…‰½Õ¹°ÌÉ5¥±•…ä•±¥¥‰¥±¥Ñä)…¹Õ¹¡…¹•Í•¹”½¡¥ÍÑ½Éä½¸™…¥±ÕÉ•Ì¸9¼ÉÕ¹Ñ¥µ”™…¥±ÕÉ”É•µ…¥¹Ì™É½´Ñ¡…ÐÉÕ¸¸)9•Ü‘•™…Õ±Ð­±•…äÉ•Í½±ÕÑ¥½¸ÄÁAML°¹•…É‰äÍ…±…È½…±Á¡„ÄÙAMLì™¥¹…°É•±•…Í”½…¡”)½¹ÑÉ…ÐÕAML…™Ñ•È½µÁ±•Ñ¥¹œ‘É…Ý•ÈµÕ¤Á…É•¹ÐÁ¥¸¸9¼ÁÉ½Ñ•Ñ•½™É½é•¸¡…¹•Ì¸)!½ÍÑ•™Õ±°µÍÕ¥Ñ”É•ÉÕ¸…¹ÁÕ‰±¥…Ñ¥½¸½±¥Ù”•Ù¥‘•¹”™½±±½Üì‘•Ù¥”Í¡…ÉÁ¹•ÍÌÁ•¹‘¥¹œ¸((ŒŒ€¸äÌÜÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€Å‰‰ˆÑÙÈØÈÁÙ™˜àÀÄÈÔåŒÀÉ™”ØÅŒÙ‘˜äÁ™ŒåÕ€°ÑÉ•”)€Í‰‰™”ÐÄáÄÁ„ØÌÍ”ØÙ˜ÐÔàÀÀäÅ˜Õ˜Ñ˜äÑ˜äÔá•‘‘€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ð…Ñ„)ÕÁ±½…‘•Äà•á…Ð±½…°‰±½‰Ì½ÑÉ•”ì™•Ñ¡•µ…¥¸µ…Ñ¡•Ì±½…°Ñ•ÍÑ•ÑÉ•”¸!½ÍÑ•)9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäØäÐÄÈÀÌäÀ½©½ˆÄÄäÔÐÜÈÈÔàÄäÁ…ÍÍ•Ì€¨¨È°ØäÄÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼(ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”©½ˆ±½ÌÙ•É¥™äÑ½Ñ…±Ì°¥¹±Õ‘¥¹œ½ÉÉ•Ñ•¡¥ µÉ•Ì¥±”Ñ•ÍÐ¸)1½…°½µÁ±•Ñ”ÉÕ¸½Ù•É•È°ØäÀÁ…ÍÍ¥¹œ¡•­Ìì½ÉÉ•Ñ•¥±”…Í”Í•Á…É…Ñ•±äÁ…ÍÍ•°)…¹Ñ¡”¡½ÍÑ•É•ÉÕ¸±½Í•ÌÑ¡”™Õ±°™¥¹…°µÑÉ•”ÁÉ½½˜¸A…•ÌÌäØäÐÄÄäàÔÌÍÕ••‘•¸)±°Ää¡•­•±¥Ù”Í¡•±°½ÉÕ¹Ñ¥µ”½Á…É•¹Ð½É•½Ù•Éä…¹É•Ñ…¥¹•Á…¥¹Ð½Í½ÕÉ”½ÁÉ½©•Ð¼)¹…Ñ¥Ù”µ•áÁ½ÉÐ½5Õ±Ñ¤™¥±•Ì‰åÑ”µµ…Ñ ¸5…¥¸½5Õ±Ñ¤½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸()Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸UÍ•È€¸äÌÔAMLÁÉ½Ñ•Ñ•ì€¸äÌØÁ¥á•±…Ñ¥½¸)É•Á½ÉÐÉ•µ…¥¹Ì„‘•Ù¥”¥ÍÍÕ”…Ý…¥Ñ¥¹œ€¸äÌÜ½¹™¥Éµ…Ñ¥½¸°¹½Ð…¸¥¹™•ÉÉ•AML¸)I•…‘ä™½È¹•ÜÕ‰”ƒŠHA…¥¹ÐÍ¡½Ý¥¹œ½±½ÕÈÑ•áÑÕÉ”ÄÀÈÓ\ÄÀÈÐ	=I™¥ÉÍÐµ…É¬½¥µ…”ì)½µÁ…É”™É•Í ‘•Ñ…¥°°Ñ¡•¸U¹‘½I•‘¼½M…Ù•=Á•¸¸á¥ÍÑ¥¹œÔÄÈÍ…Ù•Ñ•áÑÕÉ•ÌÍÑ…äÔÄÈÕ¹Ñ¥°)Ù¥Í¥‰±”%¹É•…Í”¸!¥¡•ÈµÉ•ÌÁÉ½©•ÐM…Ù”½=Á•¸äÙ5¥€¡½É‘¥¹…ÉäÌÉ5¥¤°Í…±…ÈÔÄÈ…¹)Í½ÕÉ”ÄÀÈÐ½Ñ¥ÀÈÔØ½‰…Í”­Ñ¡É•”±¥µ¥ÑÌÉ•Ñ…¥¹•¸9¼É,¼Ñ,½È…±°µé½½´Á¥á•°µ™É•”±…¥´¸)9•áÐ½¹™¥Éµ•ÄÀÈÐ‘•Ù¥”™••‘‰…¬ì¥¹ÍÁ•ÐÍ½ÕÉ”½UX‘•¹Í¥Ñä¥˜ÍÑ¥±°½…ÉÍ”°Ñ¡•¸)ÍÑ…”±…É•Èµ…ÁÌ½Í½ÕÉ•Ì½µ•µ½ÉäÝ½É¬¸5•É”½±…ÑÑ•¸½MµÕ‘”½<½Í•…µÌÉ•µ…¥¸ÅÕ•Õ•¸((ŒŒ€¸äÌàƒŠP½±½ÕÈµ•É”É•É•ÍÍ¥½¸€¼€¸äÌÜÁÉ½Ñ•Ñ•AML((´mátUÍ•ÈA•É™•ÐAML€¸äÌÜÁÉ½Ñ•ÑÌ™É•Í ÄÀÈÐ‘•™…Õ±Ð½É•…‘½ÕÐ…¹Á…¥¹Ð½¥µ…”‘•Ñ…¥°ìÍ…Ù•ÔÄÈ½ÁÑ¥½¹…°%¹É•…Í”É•Ñ…¥¹•¸%¹‘•Á•¹‘•¹Ð…±Á¡„½É•™±•Ñ¥½¸…Ñ•ÌÉ•µ…¥¸½Á•¸¸(´mát5•É”Í•±•Ñ•½Ù•É±…äÁ±ÕÌ…±°‰•±½ÜÑ¡É½Õ ½É¥¥¹…°½µÁ½Í¥Ñ½Èè•á…ÐÁ¥á•±Ì™½È…±°ÈØ‰±•¹‘Ì°µ…Í­Ì…¹ÝÉ…ÁÁ•¥µ…•ÌìÕÁÁ•ÈÍ½ÕÉ•Ì½½É‘•È½Í•ÑÑ¥¹ÌÍÕÉÙ¥Ù”¸(´mát±…ÑÑ•¸ÁÉ•Í•ÉÙ•ÌÙ¥Í¥‰±”Á¥á•±Ì°É•µ½Ù•Ì…±°½Ù•É±…åÌ¥¹±Õ‘¥¹œ¡¥‘‘•¸½¹•Ì°…¹™É••ÌÍ±½ÑÌ¸%¹ÁÕÐ½Á••È½Í…±…ÈÉ•Í½ÕÉ•ÌÉ•µ…¥¸Õ¹¡…¹•¸(´mát=É¥¥¹…°A…¥¹ÐU¹‘¼½I•‘¼°M…Ù”½=Á•¸…¹…ÑÕ…°¹…Ñ¥Ù”A9ÁÉ•Í•ÉÙ”É•ÍÕ±ÑÌì¡¥ÍÑ½ÉäÉ•ÍÑ½É•Ì½É¥¥¹…°±…å•ÉÌ¸MÑ…•Á±…•µ•¹Ð°ÍÑ…±”Í•ÍÍ¥½¹Ì°¡•­Á½¥¹Ð…¹ÅÕ½Ñ„É•™ÕÍ…°É•µ…¥¸…Ñ½µ¥Œ¸(´mát1½…°™Õ±°ÈØäÝAML¼Á%0¼ÁÍ­¥Àì™½ÕÍ•µ•É”ÙAML°É•Ù¥•Ý•É•±•…Í”ÕAML¸(´mátUÍ•ÈAML€¸äÌàè1…å•ÈÍ•ÑÑ¥¹Ì5•É”Ñ¼	…Í”ÁÉ•Í•ÉÙ•Ì…ÁÁ•…É…¹”…¹™É••Ì•áÁ•Ñ•Í±½ÑÌìU¹‘¼½I•‘¼É•ÍÑ½É•Ì±…å•ÉÌ¸(´mátUÍ•ÈAML€¸äÌàè±…ÑÑ•¸±•…Ù•Ì	…Í”½¹±ä°€¬1…å•ÈÝ½É­Ì°M…Ù”½=Á•¸É•Ñ…¥¹Ì…ÁÁ•…É…¹”¸((ŒŒ€¸äÌàÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”˜ÐÐÅ”äÉˆÀäÔÁ˜Á”ÝˆÉ…ˆÅˆÐÙ„áˆØÝääÐÁ„ÄÈÌäØ°ÑÉ•”(ÈÌå„ÔÕÜÙ‘”Ðå‘‘˜àÐÁ™„Äå…‰‘‰™‰ˆÌÔÅˆÈØÉà°µ…Ñ¡•ÌÑ•ÍÑ•±½…°ÑÉ•”¸)!½ÍÑ•É•É•ÍÍ¥½¸ÌäØääÜØäÔÀÐ½©½ˆÄÄäÔØÔàäÈäÜÔÍÕ••‘•ì™Õ±°©½ˆ±½Ì½¹™¥É´(ÈØäÝAML¼Á%0¼ÁÍ­¥À°µ…Ñ¡¥¹œ½µÁ±•Ñ”±½…°ÉÕ¸¸A…•ÌÌäØääÜØäÀÄÔ‰Õ¥±ÄÄäÔØÔàäÔÐÔÜ¼)‘•Á±½äÄÄäÔØØÀÜàÔØäÍÕ••‘•¸±°ÈÔ¡•­•±¥Ù”Í¡•±°½Ù•ÉÍ¥½¸°¡…¹•ÉÕ¹Ñ¥µ”½1…ˆ°)É•½Ù•Éä…¹É•Ñ…¥¹•½É”½µ…¥¸½5Õ±Ñ¤™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸I•Ù¥•Ý•Á¥¹ÌäÌàì)ÁÉ½Ñ•Ñ•µ…¥¸½…”½5Õ±Ñ¤½™É½é•¸Õ¹¡…¹•¸Q¡¥ÌÁÉ½½˜ÕÁ‘…Ñ•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸)UÍ•È€¸äÌÜAMLÁÉ½Ñ•Ñ•ì€¸äÌà‘•Ù¥”µ•É”½™±…ÑÑ•¸½U¹‘½I•‘¼½M…Ù•=Á•¸…Ñ”Á•¹‘¥¹œ¸((ŒŒ€¸äÌäƒŠPUXµÉ•…‘ä½‰©•ÐÉ•…Ñ¥½¸ì€¸äÌàAMLÁÉ½Ñ•Ñ•((´mátUÍ•È€¸äÌàAMLÁÉ½Ñ•ÑÌ5•É”½±…ÑÑ•¸½™É•”Í±½ÑÌ½U¹‘½I•‘¼½M…Ù•=Á•¸¸…É±¥•È€¸äÌÜÄÀÈÐ½É•…‘½ÕÐ½‘•Ñ…¥°É•µ…¥¹ÌÁÉ½Ñ•Ñ•¸(´mátMÑ…ÉÑÕÀ½É•Í•Ð½É¥¥¹…°Õ¹¥ÐÕ‰”•ÑÌÍ¥à½µÁ±•Ñ”	½à¥Í±…¹‘ÌÝ¥Ñ¡½ÕÐ•áÑÉ„¡¥ÍÑ½Éä½•½µ•ÑÉä¡…¹”¸(´mátÕ‰”½A±…¹”½å±¥¹‘•È½½¹”½MÁ¡•É”ÕÍ”•á…Ð½É¥¥¹…°	½à½ah½å±¥¹‘•È½MÁ¡•É”±…å½ÕÑÌ…Ð…Íåµµ•ÑÉ¥Œ½‘•¹Í”Í•ÑÑ¥¹Ìì½É‘¥¹…ÉäÍ•¹”ÁÉ½©•Ñ¥½¹ÌÍÑ¥±°É•ÅÕ¥É”¡•­Á½¥¹ÑÌ¸(´mátÑÕ…°‘‘•™…Õ±ÑÌ•¹•É…Ñ”UYÌ=8ì=É•Ñ…¥¹ÌÁ±…¥¸Á…Ñ ½Í•ÑÑ¥¹Ì¥¹¡•É¥Ñ…¹”¸UX=8ÕÍ•ÌÁ±…¥¸	…Í”Í•ÑÑ¥¹Ì¸MÑ…¥¹œ½…¹•°½É•™ÕÍ…°ÁÉ•Í•ÉÙ•ÌÍ•¹”½É•‘¼ì½¹”U¹‘¼½I•‘¼…ÉÉ¥•Ì•á…ÐÉ•Í½ÕÉ”¸(´mátÑÕ…°ÁÉ½©•ÐÑÉ…¹ÍÁ½ÉÐ…¹9=4½1½ÕÑÁÕÐÉ•Ñ…¥¸™…”µ½É¹•ÈUXÙ…É¥…¹ÑÌìÍÑ…ÉÑÕÀÕ‰”½Á•¹ÌÁÉ½‘ÕÑ¥½¸A…¥¹Ð¥µµ•‘¥…Ñ•±ä…ÐÄÀÈÐ…¹M…Ù”½=Á•¸É•Ñ…¥¹ÌÁ…¥¹Ñ•‰¥¹‘¥¹œ¸(´mátQ½ÉÕÌ½Q•áÐÉ•µ…¥¸Á±…¥¸Ý¥Ñ Ù¥Í¥‰±”•áÁ±…¹…Ñ¥½¸ìÍÁ•¥…°½‰©•Ð±…Õ¹¡•ÉÌÕ¹¡…¹•¸=É¥¥¹…°ÍÑ…±”½•Ù…±Õ…Ñ•½±¥¹­•Õ…É‘ÌÉ•Ñ…¥¹•ì¹¼…ÕÑ¼µÉ•µ…ÁÁ¥¹œ½±ÁÉ½©•ÑÌ¸(´mátUÍ•ÈAML€¸äÌäèÉ•™É•Í ½ÈI•Í•ÐƒŠHA…¥¹Ð½¸Õ‰”Ý¥Ñ¡½ÕÐ™¥ÉÍÐÁÉ½©•Ñ¥¹œUYÌìUX‘¥Ñ½ÈÍ¡½ÝÌÍ¥à¥Í±…¹‘Ì¸(´mátUÍ•ÈAML€¸äÌäè‘å±¥¹‘•È½½¹”½MÁ¡•É”Ý¥Ñ •¹•É…Ñ”UYÌ¡•­•ì¥¹ÍÁ•ÐUYÌ½Á…¥¹Ð¸U¹Ñ¥¬½¸…¹½Ñ¡•È½‰©•ÐÑ¼É•…Ñ”Ý¥Ñ¡½ÕÐUYÌ¸(´mátUÍ•ÈAML€¸äÌäèU¹‘¼½¹”É•µ½Ù•Ì¹•ÜUX½‰©•Ð°I•‘¼É•ÍÑ½É•ÌìM…Ù”½=Á•¸É•Ñ…¥¹ÌUYÌ½Á…¥¹Ð¸((¸äÌä™¥¹…°±½…°9½‘”ÈÐ™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÀÌAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)9•ÜÉ•…Ñ¥½¸ÙAML°½É¥¥¹…°¹•…É‰ä‘½	½à½MÁ¡•É”ÄåAML°É•Ù¥•Ý•É•±•…Í”ÕAML¸)9¼…ÍÍ•ÉÑ¥½¹ÌÉ•µ½Ù•½ÈÉ•±…á•¸½µÁ±•Ñ”É•Ù¥•Ý•µ…¥¸½1…ˆÉ•Ù•ÉÍ”±½…‘•ÈÉ…Á äÌäì)ÁÉ½Ñ•Ñ•µ…¥¸äÌÀ½…”½5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹Ñ½Õ¡•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½ÝÌì)…ÑÕ…°¥A…UXµÉ•…‘äÉ•…Ñ¥½¸½Á…¥¹Ð½Á•ÉÍ¥ÍÑ•¹”…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ¸((ŒŒ€¸äÌäÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ””ÀÜÙ‰„ÐÁŒØÅ˜ÅŒÕ…ÈÀÈÄÄÉˆØÁ”ØÝ™ÜÕ„Ù„Ý°ÑÉ•”(ÔÉ……˜ÑŒÌÔÀÑ˜ÙŒÙ”á‰„ÉŒÐÑäá™‘á˜Ù‰˜ÐäÝ‰‘Œ°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸)½¹¹•Ñ•¥Ð…Ñ„ÕÁ±½…‘•ÈÀ•á…Ð‰±½‰Ì…¹µ…Ñ¡•Ñ•ÍÑ•ÑÉ•”ì™•Ñ¡•µ…¥¸)µ…Ñ¡•±½…°Í½ÕÉ”¸1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÜÈÈÄàÄÐàÜ¼)©½ˆÄÄäØÌÜäÈÜÈàÄ‰½Ñ Á…ÍÌ€¨¨ÈÜÀÌÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”©½ˆ)±½ÌÙ•É¥™äÑ½Ñ…±Ì¸A…•ÌÌäÜÈÈÄàÄÀÈÐ‰Õ¥±ÄÄäØÌÜäÌÀÄäÀ½‘•Á±½äÄÄäØÌàÀØÜàÀÀÍÕ••‘•¸)±°ÈÀÁ½ÍÑ‘•Á±½åµ•¹Ð¡•­•Í¡•±°½Ù•ÉÍ¥½¸°•Ù•Éä¡…¹•ÉÕ¹Ñ¥µ”½1…ˆ½Ý¹•È°É•½Ù•Éä°)É•Ñ…¥¹•µ…¥¸½…”½5Õ±Ñ¤Ä¸À½ÁÉ¥µ¥Ñ¥Ù”™…Ñ½Éä½Á…¥¹Ð½Ý¹•ÉÌ…¹™É½é•¹	•Ñ„Üµ…É­•È)‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸5…¥¸½…”½5Õ±Ñ¤Ä¸À½™É½é•¸‰•Ñ„‰åÑ•ÌÕ¹¡…¹•¸9¼…ÍÍ•ÉÑ¥½¸)É•±…á•¸Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Ì½¹±äìÍ…µ”ÉÕ¹Ñ¥µ”‰åÑ•Ì¸UÍ•È€¸äÌàAMLÁÉ½Ñ•Ñ•ì(¸äÌä…ÑÕ…°¥A…ÍÑ…ÉÑÕÀ½É•Í•Ð½‘½UX¡•­‰½à½Á…¥¹Ð½¡¥ÍÑ½Éä½M…Ù•=Á•¸…Ñ”Á•¹‘¥¹œ¸((ŒŒ€¸äÐÀƒŠPQ½ÉÕÌUYÌÉ•É•ÍÍ¥½¸ì€¸äÌäÁÉ½Ñ•Ñ•AML((´mátUÍ•È€¸äÌäAMLÁÉ½Ñ•ÑÌUXµÉ•…‘ä¥¹¥Ñ¥…°½É•Í•ÐÕ‰”°‘UX¡½¥”½Á±…¥¸É•…Ñ¥½¸°Á…¥¹Ñ¥¹œ°½¹”µÍÑ•ÀU¹‘½I•‘¼…¹M…Ù•=Á•¸¸(´mátI½Õ¹ÕÁÉ¥¡ÐQ½ÉÕÌÉ¥‘ÌÏŠLÌÈ…É½ÍÌÌØ‘•¹Í¥ÑäÁ…¥ÉÌè•Ù•ÉäÅÕ…µ…ÁÁ•½¹”°Ä¥Í±…¹°‰½Ñ Í•…µÌ°™Õ±°É•Ñ…¹±”Ý¥Ñ¡¥¸Ñ¥±”ì¹¼•½µ•ÑÉäµÕÑ…Ñ¥½¸¸(´mátQÉ…¹Í±…Ñ•½dµÉ½Ñ…Ñ•½•áÑÉ•µ”Í…±”½É•¹Õµ‰•É•É•Õ±…ÈÉ¥‘ÌÍÕÁÁ½ÉÑ•ì‘•™½Éµ•½Ñ¥±Ñ•½¹½¹ÅÕ…½¥¹½µÁ±•Ñ”½Õ¹ÍÕÁÁ½ÉÑ•½¡•­Á½¥¹Ð™…¥±ÕÉ•ÌÉ•Ñ…¥¸µ•Ñ…‘…Ñ„½¡¥ÍÑ½Éä¸(´mát=É¥¥¹…°¹…Ñ¥Ù”Í•¹”ÁÉ½©•Ñ¥½¸½=\½¹¼µ½À½U¹‘½I•‘¼½¥Í±…¹•‘¥ÑÌ…¹…ÑÕ…°UX…±±‰…¬Ý½É¬ì‘Q½ÉÕÌ¡•­•½Õ¹¡•­••… ½¹”½É¥¥¹…°¡•­Á½¥¹Ð¸(´mátáÁ…¹‘•äÌä…ÑÕ…°ÁÉ½©•Ð½9=4½1É•Ñ…¥¸Q½ÉÕÌ½É¹•ÈÙ…É¥…¹ÑÌì¥µµ•‘¥…Ñ”ÁÉ½‘ÕÑ¥½¸ÄÀÈÐA…¥¹Ð½U¹‘½I•‘¼½M…Ù•=Á•¸½¹…Ñ¥Ù”A9•á…Ð¸(´mátUÍ•ÈAML€¸äÐÀè‘Q½ÉÕÌÝ¥Ñ •¹•É…Ñ”UYÌ¡•­•ìA…¥¹ÐÝ½É­Ì¥µµ•‘¥…Ñ•±ä°UX‘¥Ñ½ÈÍ¡½ÝÌ½¹”É•Ñ…¹Õ±…È¥Í±…¹¸(´mátUÍ•ÈAML€¸äÐÀè‘Q½ÉÕÌÕ¹¡•­•°Ñ¡•¸=‰©•ÓŠIU[ŠIQ½ÉÕÌUYÌ€¡d¤ìU¹‘¼½I•‘¼ÁÉ½©•Ñ¥½¸…¹‘‰•¡…Ù”½ÉÉ•Ñ±ä¸(´mátUÍ•ÈAML€¸äÐÀèM…Ù”½=Á•¸É•Ñ…¥¹ÌÁ…¥¹Ñ•Q½ÉÕÌ…¹UXÁ±…•µ•¹Ðì½ÁÑ¥½¹…°9½µ…•áÁ½ÉÐÍ…¹¥Ñä¸()¹Õ±…ÈQ½ÉÕÌµ…ÁÁ¥¹œ¡…Ì¥¹¹•È½½ÕÑ•È‘•¹Í¥ÑäÙ…É¥…Ñ¥½¸¸9¼Ñ¥±Ñ•½‘•™½Éµ•½•¹•É…°)Õ¹ÝÉ…À½ÈUXÁÉ½Á……Ñ¥½¸Ñ¡É½Õ Ñ½Á½±½ä½µ½‘¥™¥•ÉÌì¹…Ñ¥Ù”±¥¹­•Õ…É‘ÌÉ•Ñ…¥¹•¸((¸äÐÀ™¥¹…°±½…°9½‘”ÈÐ™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÀäAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)9•ÜQ½ÉÕÌØ…¹•áÁ…¹‘•äÌäÉ•…Ñ¥½¸Ø€ôÄÈ™½ÕÍ•‘AMLìÉ•Ù¥•Ý•É•±•…Í”ÕAML¸)9¼½É¥¥¹…°‰•¡…Ù¥½ÕÈ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•ìÍÕÁ•ÉÍ•‘•Q½ÉÕÌµÕ¹…Ù…¥±…‰±”¡•­Ì¹½Ü)É•ÅÕ¥É”µ…ÁÁ•½½ÁÑ¥½¹…°Á±…¥¸Q½ÉÕÌ…¹•á…ÐÁÉ½©•Ð½9=4½1½ÕÑÁÕÐ¸AÉ½Ñ•Ñ•)µ…¥¸½…”½5Õ±Ñ¤Ä¸À½™É½é•¸É•Ñ…¥¹•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½ÝÌì‘•Ù¥”äÐÀÁ•¹‘¥¹œ¸((ŒŒ€¸äÐÀÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ””ÌÄÄáŒÁ™ŒÙ„ÈÝŒØÅ˜Ñ˜Ääå”ÌÕ”ÜÝ•àåŒÄåŒÈ°ÑÉ•”)‘‰Õ˜ÜÀàÌØÄÔÉ‰…™‘˜Ý„áˆÌÉ™Œá”ÄÔÀÑ‘ˆÉ‰‘ˆÜ°ÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ð…Ñ„)ÕÁ±½…‘•ÄÐ•á…Ð±½…°‰±½‰Ì…¹µ…Ñ¡•Ñ•ÍÑ•ÑÉ•”ì™•Ñ¡•µ…¥¸¥‘•¹Ñ¥…°¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÜÈÔàÈÀÜÔä½©½ˆÄÄäØÐäÌÐÀÄÐä‰½Ñ Á…ÍÌ(¨¨ÈÜÀäÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™äÑ½Ñ…±Ì¸)A…•ÌÌäÜÈÔàÈÀÈØÌ‰Õ¥±ÄÄäØÐäÌÐÈÔÄÄ½‘•Á±½äÄÄäØÐäÐàØÔØÌÍÕ••‘•¸±°ÈÀ¡•­•)Á½ÍÑ‘•Á±½åµ•¹ÐÍ¡•±°½Ù•ÉÍ¥½¸°¡…¹•UX½‘½5•Í¡!•…±Ñ ½5Õ±Ñ¤Á…É•¹Ð°É•½Ù•Éä…¹)É•Ñ…¥¹•µ…¥¸½…”½5Õ±Ñ¤Ä¸À½™…Ñ½Éä½Í¥¹…ÑÕÉ”½¥µÁ½ÉÐ½•áÁ½ÉÐ½Á…¥¹Ð½É…ÍÑ•È½™É½é•¹	•Ñ„Ü)µ…É­•È™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸I•Ù¥•Ý•É…Á äÐÀìµ…¥¸½…”½5Õ±Ñ¤Ä¸À½™É½é•¸)‰åÑ•ÌÕ¹¡…¹•¸9¼½±‰•¡…Ù¥½ÕÈ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Ì½¹±äì)Í…µ”ÉÕ¹Ñ¥µ”‰åÑ•Ì¸UÍ•È€¸äÌäAMLÁÉ½Ñ•Ñ•ì€¸äÐÀQ½ÉÕÌ‘•Ù¥”…Ñ”Á•¹‘¥¹œ¸((ŒŒ€¸äÐÀÕÍ•ÈAMLƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈAMLÁÉ½Ñ•ÑÌQ½ÉÕÌ…ÕÑ½µ…Ñ¥ŒUYÌ½½ÁÑ¥½¹…°Á±…¥¸‘°Q½ÉÕÌUYÌ€¡d¤°A…¥¹Ð°)UX‘¥Ñ½È°U¹‘½I•‘¼…¹M…Ù•=Á•¸¸€¸äÐÀÉÕ¹Ñ¥µ”½$½A…•Ì½±¥Ù”ÁÉ½½˜…‰½Ù”¥Ì±½Í•¸)9•áÐ…ÕÑ¡½É¥é•€½¹•áÑ‰Õ¥±…Õ‘¥ÑÌ‰½Õ¹‘•MµÕ‘”Ñ¡É½Õ ½É¥¥¹…°Á…¥¹Ð½Ý¹•ÉÌ¸((ŒŒ€¸äÐÄƒŠPMµÕ‘”É•É•ÍÍ¥½¸…¹‘•Ù¥”…Ñ”((´mátUÍ•È€¸äÐÀAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•ì…±°UXµÉ•…‘äÉ•…Ñ¥½¸½Á…¥¹Ð½¡¥ÍÑ½Éä½Á•ÉÍ¥ÍÑ•¹”¸(´mát¹…±åÑ¥…°Á¥­ÕÀ½‘É…œI	°¥¹‘•Á•¹‘•¹Ð=Á…¥Ñä°ÁÉ•µÕ±Ñ¥Á±¥•…±Á¡„°¹¼¥¹¬½¸Ñ…À½É•Á•…Ñ•Á½Í¥Ñ¥½¸°½Ý¹•…¹•±±…Ñ¥½¸¸(´mátM…µ”½É¥¥¹…°™…”É•…‘Ì½ÝÉ¥Ñ•Ì½¹±äì…‘©…•¹Ð…Ñ±…Ì¥Í±…¹‘Ì•á±Õ‘•°™…”½µ¥ÍÌÁ¥­ÕÀÉ•Í•ÑÌì…±Á¡„½É…ÜÉ…åÍ…±”É•Ñ…¥¹•¸(´mátÑÕ…°U$Í•±•Ñ•µ±…å•È¥Í½±…Ñ¥½¸°A…¥¹ÐU¹‘½I•‘¼½Ñ½½°É•Ñ•¹Ñ¥½¸°M…Ù•=Á•¸…¹•á…Ð¹…Ñ¥Ù”A9¸(´mátM…±…È½µ…Í¬¥¹‘•Á•¹‘•¹”°½É¥¥¹…°¡•­Á½¥¹Ð½=\½…¹•°½µ¥ÍÌÉ•™ÕÍ…°ì¥¹Ù…±¥UYÌÉ•™ÕÍ”‰•™½É”¹…Ù¥…Ñ¥½¸½¡¥ÍÑ½Éä¡…¹•Ì¸(´mát	½Õ¹‘•±½¹œÍÑÉ½­”É½±±Ì‰…¬Á¥á•±Ì½É•Í½ÕÉ•Ì½¡¥ÍÑ½Éä°É•±•…Í•Ì…ÁÑÕÉ”½¹…Ù¥…Ñ¥½¸…¹…±±½ÝÌ¹•áÐ	ÉÕÍ ì•Ù•¹ÐÍÕ‰‘¥Ù¥Í¥½¸¥¹Ù…É¥…¹Ð¸(´mátUÍ•ÈAML€¸äÐÄèMµÕ‘”„¡…É½±½ÕÈÁ…Ñ ½ÕÑÝ…É½¸½¹”Õ‰”™…”ì½µÁ…É”±½Ü½¡¥ =Á…¥Ñä…¹¹¼µµ½Ñ¥½¸Ñ…À¸(´mátUÍ•ÈAML€¸äÐÄè½Ù•É±…äMµÕ‘”°U¹‘½I•‘¼­••ÁÌA…¥¹Ð½Á•¸°M…Ù•=Á•¸É•Ñ…¥¹ÌÉ•ÍÕ±Ð¸…”•‘•ÌÉ•ÍÑ…ÉÐÁ¥­ÕÀ¸()ÕÑ½µ…Ñ•Í½ÕÉ”Ñ•ÍÑÌ‘¼¹½Ð•ÍÑ…‰±¥Í ¥A…™••°½±…Ñ•¹ä½I4¸É½ÍÌµ™…”MµÕ‘”°)<…¹‘”µÍ•…´…ÕÑ¡½É¥¹œÉ•µ…¥¸ÅÕ•Õ•ì…±Á¡„äÈä½É•™±•Ñ¥½¸…Ñ•Ì¥¹‘•Á•¹‘•¹Ð¸((¸äÐÄ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ÜÄÔAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)±°Í¥à¹•ÜMµÕ‘”¥¹Ñ•É…Ñ¥½¹ÌÁ…ÍÌ½¸™¥¹…°Í½ÕÉ”°Á±ÕÌ•Ù•Éä•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¸¸)9•…É‰ä	±ÕÈ½Í•…´ÄÕAML…¹É•Ù¥•Ý•É•±•…Í”ÕAML…±Í¼Á…ÍÍ•¸9¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¹Ì)É•±…á•¸½µÁ±•Ñ”µ…¥¸½1…ˆÉ•Ù•ÉÍ”µ±½…‘•È±½ÍÕÉ”äÐÄìÁÉ½Ñ•Ñ•µ…¥¸½…”½5Õ±Ñ¤Ä¸À¼)™É½é•¸Õ¹¡…¹•¸AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌì‘•Ù¥”äÐÄÁ•¹‘¥¹œ¸((ŒŒ€¸äÐÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”„ÌåŒÉ‘ˆá„á……„á”ÀÝ™ÔäÀÈÔÈÄÅˆÄÌÁ„ÔÍ”Á”ÈÜ°Ñ•ÍÑ•ÑÉ•”(ÜÉ”ÐåŒÐÐÌÌØÜÙ„ÜØÅŒÉ…ŒÕ‘˜ØØÉ‘˜Äá„Å„Ý‘„àÝ˜°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ð)…Ñ„ÕÁ±½…‘•ÄÔ•á…Ð‰±½‰ÌìÉ•…Ñ•ÑÉ•”…¹™•Ñ¡•µ…¥¸µ…Ñ ±½…°Ñ•ÍÑ•ÑÉ•”¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÜÔØÔÜÜàÀØ½©½ˆÄÄäÜÐääØàäØÐ‰½Ñ Á…ÍÌ(¨¨ÈÜÄÔÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•¸)A…•ÌÌäÜÔØÔÜÜÔÄÜ‰Õ¥±ÄÄäÜÐääÜÔäÐä½‘•Á±½äÄÄäÜÔÀÈÀÜÈàÌÍÕ••‘•¸±°ÈÀ¡•­•)Á½ÍÑ‘•Á±½åµ•¹ÐÍ¡•±°½Ù•ÉÍ¥½¸°•Ù•Éä¡…¹•µ…¥¸½1…ˆÉÕ¹Ñ¥µ”½Ý¹•È°É•½Ù•Éä…¹)É•Ñ…¥¹•µ…¥¸½5Õ±Ñ¤Ä¸À½UX½™¥±Ñ•È½Í•…´½É…Á ½ÁÉ½©•Ð½•áÁ½ÉÐ½ÁÉ¥µ¥Ñ¥Ù”½™É½é•¹	•Ñ„Üµ…É­•È)™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸9¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•ìÁÉ½Ñ•Ñ•½™É½é•¸)‰åÑ•ÌÕ¹¡…¹•¸Q¡¥ÌÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±ä°Í…µ”ÉÕ¹Ñ¥µ”‰åÑ•Ì¸()	Õ¥±äÐÄ¥Ì½µÁ±•Ñ”…¹É•…‘ä™½È‘•Ù¥”Ñ•ÍÑ¥¹œè¡…É½±½ÕÈÁ…Ñ ½¸Õ‰”ƒŠH)Q½½°MµÕ‘”Ý¥Ñ¡¥¸™…”°‘É…œ½ÕÑÝ…É°½µÁ…É”=Á…¥Ñä°Ñ…Àµ…­•Ì¹¼µ…É¬ìÑÉä…¸)½Ù•É±…ä°U¹‘½I•‘¼ÍÑ…åÌ¥¸A…¥¹Ð°M…Ù•=Á•¸É•Ñ…¥¹ÌÉ•ÍÕ±Ð¸…”•‘•Ì½µ¥ÍÍ•ÌÉ•ÍÑ…ÉÐ)Á¥­ÕÀ¸ÑÕ…°¥A…™••°½±…Ñ•¹äÉ•µ…¥¹ÌÁ•¹‘¥¹œ¸UÍ•ÈäÐÁAMLÁÉ½Ñ•Ñ•ì¥¹‘•Á•¹‘•¹Ð)…±Á¡„äÈä½É•™±•Ñ¥½¸…Ñ•ÌÕ¹¡…¹•¸9•áÐ‘•Ù¥”™••‘‰…¬‰•™½É”É½ÍÌµ™…”MµÕ‘”°)<½È‘”µÍ•…´…ÕÑ¡½É¥¹œì¹¼…ÕÑ½µ…Ñ¥Œ¹•áÐÉÕ¹Ñ¥µ”‰Õ¥±‰•™½É”Ñ¡…Ð…Ñ”¸((ŒŒ€¸äÐÈƒŠP½¹¹•Ñ•µ™…”MµÕ‘”É•É•ÍÍ¥½¸€¼€¸äÐÄÁÉ½Ñ•Ñ•AML((´mátUÍ•È€¸äÐÄAMLÁÉ½Ñ•ÑÌÍ…µ”µ™…”MµÕ‘”½=Á…¥Ñä½Ñ…À½½Ù•É±…ä½¡¥ÍÑ½Éä½M…Ù•=Á•¸¸(´mát=É¥¥¹…°µ…¹¥™½±É…Á ½¹±äè™É½é•¸‘¥É•ÐÁ…¥ÉÌ°ÄÈ™½±‘•½É½Ñ…Ñ•½µ¥ÉÉ½É•±…å½ÕÑÌì¹½¹µ…¹¥™½±½Ù•ÉÑ•àµ½¹±ä½…Ñ±…Ì‘•½ä•á±Õ‘•°Í½ÕÉ•ÌÕ¹¡…¹•¸(´mátá…ÐÁÉ•µÕ±Ñ¥Á±¥•µ•…¸½=Á…¥Ñä½…±Á¡„…É½ÍÌ„Á…¥È°Á¥­•µ™…”µ½¹±äÝÉ¥Ñ•Ìì¹¼½¹¹•Ñ•±¥ÍÐÉ•Ñ…¥¹Ì½É¥¥¹…°™…”µÉ•Í•ÐA$¸(´mát…ÁÑÕÉ•…‘©…•¹ä°ÍÑÉ¥Ð¥¹Ù…±¥½ÍÁ…ÉÍ”½½Ù•ÉÍ¥é”Õ…É‘Ì°µ¥ÍÍ•Ì½‘¥Í½¹¹•Ñ•©ÕµÁÌ…¹É½ÍÌµ™…”Ý½É¬µ±¥µ¥Ð…¹•±±…Ñ¥½¸¸(´mátÑÕ…°½¹Ñ¥¹Õ½ÕÌU$•‘”É½ÍÍ¥¹œ°½¹”A…¥¹ÐU¹‘½I•‘¼°M…Ù•=Á•¸…¹•á…Ð¹…Ñ¥Ù”A9ìÉ…ÜÍ…±…È½µ…Í¬¥Í½±…Ñ¥½¸½¡•­Á½¥¹ÐÉ•™ÕÍ…°¸(´mátUÍ•ÈAML€¸äÐÈèÑÝ¼Õ‰”™…•ÌÙ¥Í¥‰±”°Á…¥¹ÐÁ…Ñ ÕÀÑ¼Í¡…É••‘”°MµÕ‘”…É½ÍÌ½¹Ñ¼¹•áÐ™…”¸½µÁ…É”±½Ü½¡¥ =Á…¥Ñä¸(´mátUÍ•ÈAML€¸äÐÈèÁ…¥¹Ñ•½Ù•É±…ä°U¹‘½I•‘¼É•Ñ…¥¹ÌA…¥¹Ð½MµÕ‘”ìM…Ù•=Á•¸É•Ñ…¥¹ÌÉ½ÍÌµ•‘”½±½ÕÈ¸¥¹”‘•Ñ…¥°…Ù•É…•Ì…ÐÑÉ…¹Í¥Ñ¥½¸¸()5•…¸½±½ÕÈ…ÉÉä‘½•Ì¹½ÐÑÉ…¹ÍÁ½ÉÐ‘•Ñ…¥±•Á…Ñ ½É¥•¹Ñ…Ñ¥½¸½ÈÝÉ…À™½½ÑÁÉ¥¹Ð)½¹Ñ¼Õ¹Á¥­•™…•Ì¸±Á¡„äÈä½É•™±•Ñ¥½¸…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ðì<½Í•…´…ÕÑ¡½É¥¹œÅÕ•Õ•¸((¸äÐÈ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÈÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)¥Ù”¹•Ü½¹¹•Ñ•µMµÕ‘”¡•­Ì°½É¥¥¹…°äÐÄ­Í•…´ÄÄ…¹É•Ù¥•Ý•É•±•…Í”ÔÁ…ÍÌ¸)9¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸I•Ù¥•Ý•¡…¹•µ…¥¸½1…ˆÉ•Ù•ÉÍ”É…Á äÐÈìÁÉ½Ñ•Ñ•)µ…¥¸½…”½5Õ±Ñ¤Ä¸À½ÑÉ¥…¹±”É…Á ½™É½é•¸Õ¹¡…¹•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½ÝÌ¸)UÍ•ÈÉ•Á•…Ñ•AML€½¹•áÑ‰Õ¥±Ý¡¥±”äÐÈÝ…ÌÍÑ¥±°±½…°½¥¸É•É•ÍÍ¥½¸èäÐÄ…•ÁÑ…¹”)É•µ…¥¹ÌÁÉ½Ñ•Ñ•ì¹¼äÐÈ‘•Ù¥”AML¥¹™•ÉÉ•‰•™½É”ÁÕ‰±¥…Ñ¥½¸½µ…¹Õ…°Ñ•ÍÐ±¥ÍÐ¸((ŒŒ€¸äÐÈÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”ˆÐå‰ˆàÅØÜàÌÙ„ÅŒÉŒÔØåäÜÔÕ‘ÔÑ…‰ˆÝˆÕ˜ä°Ñ•ÍÑ•ÑÉ•”(Õ™‰ˆäÌÑ‘…”ÜÔäÑÈÉ‰ŒÑ„ØÐÐÌáˆÁÕ‰ŒÀÀÌÀäÝ™°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ð)…Ñ„ÕÁ±½…‘•ÄÜ•á…Ð‰±½‰ÌìÉ•…Ñ•ÑÉ•”…¹™•Ñ¡•µ…¥¸µ…Ñ ±½…±±äÑ•ÍÑ•ÑÉ•”¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÜØÈÄààÀØÀ½©½ˆÄÄäÜØààÄÌÔÄÄ‰½Ñ Á…ÍÌ(¨¨ÈÜÈÀÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•¸)A…•ÌÌäÜØÈÄàÜÀÔÔ‰Õ¥±ÄÄäÜØààÄØÔÌØ½‘•Á±½äÄÄäÜØäÀÌÌàÌÔÍÕ••‘•¸±°ÈÀ¡•­•)Á½ÍÑ‘•Á±½åµ•¹ÐÍ¡•±°½Ù•ÉÍ¥½¸°¡…¹•µ…¥¸½1…ˆ½™¥±Ñ•È½Í•…´ÉÕ¹Ñ¥µ”É…Á °É•½Ù•Éä°)É•Ñ…¥¹•µ…¥¸½5Õ±Ñ¤Ä¸À½ÑÉ¥…¹±”É…Á ½UX½ÁÉ½©•Ð½•áÁ½ÉÐ½ÁÉ¥µ¥Ñ¥Ù”…¹™É½é•¹	•Ñ„Ü)µ…É­•È™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸=É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•ìÁÉ½Ñ•Ñ•½™É½é•¸)‰åÑ•ÌÕ¹¡…¹•¸Q¡¥ÌÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±ä¸()	Õ¥±äÐÈ½µÁ±•Ñ”…¹É•…‘äèÕ‰”ÑÝ¼™…•ÌÙ¥Í¥‰±”°Á…¥¹ÐÁ…Ñ ÕÀÑ¼Í¡…É••‘”°)MµÕ‘”…É½ÍÌ¥Ð°½µÁ…É”=Á…¥Ñä…¹Á…¥¹Ñ•½Ù•É±…ä°U¹‘½I•‘¼É•Ñ…¥¹ÌA…¥¹Ð°M…Ù•=Á•¸)É•Ñ…¥¹ÌÉ•ÍÕ±Ð¸M•…´ÑÉ…¹Í¥Ñ¥½¸…ÉÉ¥•Ì…Ù•É…•½±½ÕÈ°¹½Ð‘•Ñ…¥±•Á…Ñ ½É¥•¹Ñ…Ñ¥½¸¸)UÍ•ÈäÐÅAMLÁÉ½Ñ•Ñ•¸I•Á•…Ñ•AML½¹•áÑ‰Õ¥±…ÉÉ¥Ù•‰•™½É”äÐÈÁÕ‰±¥…Ñ¥½¸è¥Ð¥Ì)¹½ÐäÐÈ‘•Ù¥”…•ÁÑ…¹”¸ÑÕ…°äÐÈ¥A…Í•…´™••°…Ñ”É•µ…¥¹Ì¹•áÐ¸Q¡•¸É•™¥¹”™É½´)™••‘‰…¬‰•™½É”<½‘”Í•…´…ÕÑ¡½É¥¹œì…±Á¡„äÈä½É•™±•Ñ¥½¸…Ñ•ÌÍÑ…ä¥¹‘•Á•¹‘•¹Ð¸((ŒŒ€¸äÐÈÕÍ•ÈAMLƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()™ÕÉÑ¡•ÈAML½¹•áÑ‰Õ¥±…ÉÉ¥Ù•QHäÐÈ‘•Á±½åµ•¹Ð°ÈÀ±¥Ù”µ™¥±”µ…Ñ¡•Ì…¹¡½ÍÑ•(ÈÜÈÁAMLÙ•É¥™¥…Ñ¥½¸¸•ÁÐÑ¡¥Ì±…Ñ•ÍÐAML™½È1%YäÐÈ½¹¹•Ñ•µ™…”µ•…¸…ÉÉä°)=Á…¥Ñä½½Ù•É±…ä½A…¥¹ÐU¹‘½I•‘¼½M…Ù•=Á•¸ì•…É±¥•ÈÁÉ•ÁÕ‰±¥…Ñ¥½¸É•Á•Ñ¥Ñ¥½¹ÌÉ•µ…¥¸äÐÄ¸)AÉ½Ñ•ÐäÐÈ…±½¹Í¥‘”äÐÄ¸9•áÐ…ÕÑ¡½É¥é•äÐÌ¹…ÉÉ½Ü‰Õ¥±‰•¥¹Ì‰½Õ¹‘•½‰©•Ðµ½¹±ä)<‰…­”™½Õ¹‘…Ñ¥½¸Ù¥„½É¥¥¹…°UX½Ý¹•ÉÍ¡¥À½ÑÉ¥…¹±”•½µ•ÑÉäìÙ¥Í¥‰±”½¹ÑÉ½±Ì™½±±½Ü)Ù…±¥‘…Ñ•‰…­”Á¥á•±Ì½Ý½É¬Õ…É‘Ì¸9¼<U$½ÈÉ•¹‘•É•<…•ÁÑ…¹”¥Ì¥¹™•ÉÉ•¸((ŒŒ€¸äÐÌƒŠPÉ•…µ½¹±ä½‰©•Ð<‰…­”™½Õ¹‘…Ñ¥½¸ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•È€¸äÐÈAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•¸Õ‘¥Ð™½Õ¹¹¼•á¥ÍÑ¥¹œ<‰…­•È¸9•Ü)ÍÉŒ½Á…¥¹Ðµ…¼µ‰…­”¹©Í€ÕÍ•Ì½É¥¥¹…°ÁÉ•Ù¥•ÜÑÉ¥…¹±”½Ý¹•ÉÍ¡¥À½ÑÉ¥…¹±”É…Á °)½É¥¥¹…°Á…¥¹Ðµ™¥±Ñ•Èµ‘½µ…¥¸Ñ•á•°É…ÍÑ•È…¹Q¡É•”I…ä¹¥¹Ñ•ÉÍ•ÑQÉ¥…¹±”¸Q¡”)™¥±Ñ•È‘½µ…¥¸½ÁÑ¥½¹…±±äÉ•ÑÕÉ¹Ì¥ÑÌ•á¥ÍÑ¥¹œÑÉ…¹Í¥•¹ÐÑÉ¥…¹±”µ…Àì½É‘¥¹…Éä)‰ÉÕÍ …±±•ÉÌÉ•Ñ…¥¸•á…ÐÉ•ÑÕÉ¸Í¡…Á”…¹…±±½…Ñ¥½¹Ì¸9¼Í•½¹ÑÉ¥…¹Õ±…Ñ½È°)UXÉ…ÍÑ•É¥é•È°…‘©…•¹ä°‰ÉÕÍ °¡¥ÍÑ½Éä°Í•¹”É•Í½ÕÉ”½È•áÁ½ÉÐ½Ý¹•È¸()AÕÉ”Íå¹¡É½¹½ÕÌ½‰©•Ðµ±½…°‰…­”É•ÑÕÉ¹Ì½Ý¹•±¥¹•…ÈHàÙ¥Í¥‰¥±¥Ñä…¹Í•Á…É…Ñ”)½Ù•É…”°UXµØÀµ™¥ÉÍÐ¸]¡¥Ñ”õÕ¹½±Õ‘•ìÕ¹½Ù•É•Ñ•á•±ÌÝ¡¥Ñ”½½Ù•É…”À¸•Ñ•Éµ¥¹¥ÍÑ¥Œ)½Í¥¹”µÝ•¥¡Ñ•¡•µ¥ÍÁ¡•É”Í…µÁ±•Ì°‘½Õ‰±”µÍ¥‘•Í…µ”µ½‰©•Ð‰±½­•ÉÌ°Í½ÕÉ”Ý¥¹‘¥¹œ)¹½Éµ…°°¹½Éµ…±¥é•½‰©•Ðµ‘¥…½¹…°É…‘¥ÕÌ½‰¥…Ì¸M¥é”ÄÛŠLÄÈà½‘•™…Õ±ÐØÐ°Í…µÁ±•ÌÓŠLØÐ¼)‘•™…Õ±ÐÄØ°É…‘¥ÕÌ€¸ÀÀÇŠLÈ½‘•™…Õ±Ð¸ÈÔ½˜‘¥…½¹…°¸½¹Í•ÉÙ…Ñ¥Ù”á4É…ä½ÑÉ¥…¹±”µÑ•ÍÐ)ÁÉ•™±¥¡ÐÁ±ÕÌ½É¥¥¹…°É4UXÍ…¸…Àì•á•ÍÌ½µÁ±•á¥ÑäÉ•™ÕÍ•ÌÝ¥Ñ ¹¼Í•¹”ÝÉ¥Ñ•Ì¸)9½Éµ…±¥é•ÁÉ¥Ù…Ñ”É…Á Á½¥¹ÑÌ½¹±äìÍ½ÕÉ”µ•Í ½UX½•½µ•ÑÉäÉ•µ…¥¸Õ¹¡…¹•¸)9¼Í•¹”µ¹•¥¡‰½ÕÈ°É½Õ¹µÁ±…¹”°Ý½É±µÑÉ…¹Í™½É´°É•¹‘•É•MM<½È…±‰•‘¼‰…­”å•Ð¸)9¼µ…¥¸µ…ÁÀ<¥µÁ½ÉÐ½‰ÕÑÑ½¸½É•Í½ÕÉ”½Á•ÉÍ¥ÍÑ•¹”½•áÁ½ÉÐ¡…¹”½È‘•Ù¥”µÁ•É™½Éµ…¹”)±…¥´¸Q¡¥Ì¥¹Ñ•¹Ñ¥½¹…±±ä±½ÜµÉ•Í½±ÕÑ¥½¸™½Õ¹‘…Ñ¥½¸¥Ì9=P„¹•ÜÁ…¥¹ÐÉ•Í½±ÕÑ¥½¸¸()¥Ù”¹•ÜÉ•É•ÍÍ¥½¸Ñ•ÍÑÌ½Ù•È½ÁÐµ¥¸•á…Ð½Ý¹•ÉÍ¡¥À°Ý¡¥Ñ”½Á•¸Á±…¹”½½Ù•É…”¼)‘•Ñ•Éµ¥¹¥Í´½½Áä¥Í½±…Ñ¥½¸°™…¥¹œ‰±½­•ÉÌ½É…‘¥ÕÌ½‘½Õ‰±”µÍ¥‘•É…åÌ°ÍÕÁÁ½ÉÑ•Í…±”¼)ÑÉ…¹Í±…Ñ¥½¸½É½Ñ…Ñ•UYÌ°ÍÑ…±”½¥¹Ù…±¥½½Ù•É±…À½Ý½É¬É•™ÕÍ…±Ì…¹Í½ÕÉ”ÁÉ•Í•ÉÙ…Ñ¥½¸¸)Q¥¹äÅ”´àÍ½ÕÉ”™¥áÑÕÉ”Ý…ÌÉ•©•Ñ•‰äÑ¡”=I%%90ÁÉ•Ù¥•Ü‰Õ¥±‘•È‰•™½É”‰…­¥¹œì)Í…±”Ñ•ÍÑÌÕÍ”…•ÁÑ•€¸ÀÇŠLÅ”à•½µ•ÑÉä¥¹ÍÑ•…°¹¼‰Õ¥±‘•ÈÑ½±•É…¹”¡…¹”¸)I•…‘½Ì½Á…¥¹Ðµ…¼µ™½Õ¹‘…Ñ¥½¸´äÐÌ¹µ‘€¸5…¥¸Á…¥¹Ñ•ÈÉ•Ù•ÉÍ”±½…‘•È¡…¥¸€¬Í¡•±°¼)É•½Ù•ÉäÁ¥¹ÌäÐÌÉ•Ù¥•Ý•ì1…ˆ½µ…¥¸½…”½5Õ±Ñ¤Ä¸À½™É½é•¸…±½É¥Ñ¡µÌÕ¹¡…¹•¸()9•áÐè½É¥¥¹…°A…¥¹Ð±…å•È½¡¥ÍÑ½ÉäÑÉ…¹Í…Ñ¥½¸™½È…¸•áÁ±¥¥Ð¹½¸µ‘•ÍÑÉÕÑ¥Ù”<)5Õ±Ñ¥Á±ä±…å•È°Ý¥Ñ …¹•±±…Ñ¥½¸½ÍÑ…±”½Á½½°½¡•­Á½¥¹ÐÕ…É‘Ì…¹Ù¥Í¥‰±”½¹ÑÉ½±Ì°)Ñ¡•¸¥A……ÁÁ•…É…¹”½±…Ñ•¹äÑ•ÍÑ¥¹œ¸¼¹½Ð¥µÁ±ä<U$…•ÁÑ…¹”™É½´ÁÕÉ”Ñ•ÍÑÌ¸)±Á¡„äÈä½É•™±•Ñ¥½¸µÁÉ•Ù¥•Ü…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•¸9¼¹•Ü<¡…¹‘Ìµ½¸)Ñ•ÍÐ•á¥ÍÑÌ¥¸äÐÌì•á¥ÍÑ¥¹œMµÕ‘”½A…¥¹ÐU¹‘½I•‘¼½M…Ù•=Á•¸É•µ…¥¹ÌÑ¡”¹•…É‰ä‰…Í•±¥¹”¸)Y…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½ÝÌì‘¼¹½Ð¥¹™•È½µÁ±•Ñ¥½¸‰•™½É”Ù•É¥™¥…Ñ¥½¸¸((´mátäÐÌ…ÕÑ½µ…Ñ•è½É¥¥¹…°Ñ•á•°½ÑÉ¥…¹±”½Ý¹•ÉÍ¡¥À…¹½É‘¥¹…Éä‰ÉÕÍ Í¡…Á”Õ¹¡…¹•¸(´mátäÐÌ…ÕÑ½µ…Ñ•èÝ¡¥Ñ”½Á•¸ÍÕÉ™…”°½±ÕÍ¥½¸½É…‘¥ÕÌ½‘½Õ‰±”µÍ¥‘•‰±½­•ÉÌ°‘•Ñ•Éµ¥¹¥ÍÑ¥Œ½Ý¹•‰åÑ•Ì…¹¹¼Í½ÕÉ”ÝÉ¥Ñ•Ì¸(´mátäÐÌ…ÕÑ½µ…Ñ•èÍÕÁÁ½ÉÑ•Í…±”½ÑÉ…¹Í±…Ñ¥½¸°É½Ñ…Ñ•UXÁ±…•µ•¹Ðì¥¹Ù…±¥½ÍÑ…±”½½Ù•É±…À½Ý½É¬µ…ÀÉ•™ÕÍ…°¸(´mátäÐÌÁÕ‰±¥…Ñ¥½¸è±½…°­¡½ÍÑ•ÈÜÈÕAML°A…•ÌÍÕ•ÍÌ…¹ÈÀ•á…Ð±¥Ù”µ™¥±”µ…Ñ¡•Ì¸(´9¼¹•ÜäÐÌ<‘•Ù¥”Ñ•ÍÐè¹¼<½¹ÑÉ½±Ì•áÁ½Í•¸=ÁÑ¥½¹…°¹•…É‰ääÐÈMµÕ‘”½U¹‘½I•‘¼½M…Ù•=Á•¸Í…¹¥Ñä½¹±ä¸((¸äÐÌ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸À½µÁ±•Ñ”É•É•ÍÍ¥½¸è€¨¨È°ÜÈÔAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)¥Ù”¹•Ü<½½Ý¹•ÉÍ¡¥À¡•­Ì°½É¥¥¹…°MµÕ‘”äÐÄ¼äÐÈ•±•Ù•¸…¹É•±•…Í”½…¡”™¥Ù”)Á…ÍÌ½¸™¥¹…°ÉÕ¹Ñ¥µ”¸9¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•ìµ…¥¸½…”½5Õ±Ñ¤Ä¸À½™É½é•¸)Õ¹¡…¹•¸!½ÍÑ•É•É•ÍÍ¥½¸½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½ÝÌ¸9¼¹•Ü<‘•Ù¥”½¹ÑÉ½±Ì¸((ŒŒ€¸äÐÌÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€Í™•ˆÌØÀäÝ™ˆØÜÜÄØÕˆÌÄØÉ…ŒàÔÉŒÔáŒÅ”ÐÔÉ˜ÜÌÕ€°Ñ•ÍÑ•ÑÉ•”)€ÈÈÍ”Éá”àÈàÔÔÄÌÝ˜àÀÑ™…˜å”äÔÄÌÐØÄÑ™•”ÔÅ•€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ð)…Ñ„ÕÁ±½…‘•ÄÌ•á…Ð±½…°‰±½‰Ì…¹É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°±½…±±äÑ•ÍÑ•ÑÉ•”ì)™•Ñ¡•µ…¥¸µ…Ñ¡•°±½…°‰É…¹ …±¥¹•Ý¥Ñ ¹¼™¥±”¡…¹•Ì¸1½…°9½‘”ÈÐ…¹)¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÜØÔäÔÀÐÈØ½©½ˆÄÄäÜàÄÌÄÈÄÄÄ‰½Ñ Á…ÍÌ€¨¨ÈÜÈÔÑ•ÍÑÌ€¼€À)™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•€¡¡½ÍÑ•ÈÄä¸áÌ¤¸)A…•ÌÌäÜØÔäÐäØÔä‰Õ¥±ÄÄäÜàÄÌÄØÌØä½‘•Á±½äÄÄäÜàÄÔÄààÌÐÍÕ••‘•¸±°ÈÀ¡•­•)Á½ÍÑ‘•Á±½åµ•¹ÐÍ¡•±°½Ù•ÉÍ¥½¸°•Ù•Éä¡…¹•ÉÕ¹Ñ¥µ”½Ý¹•È°¹•Ü<µ½‘Õ±”°É•½Ù•Éä°)É•Ñ…¥¹•µ…¥¸½…”½5Õ±Ñ¤Ä¸À½ÑÉ¥…¹±”É…Á ½UX½Á…¥¹Ð½ÁÉ½©•Ð½•áÁ½ÉÐ…¹™É½é•¹	•Ñ„Üµ…É­•È)™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸I•Ù¥•Ý•Á¥¹ÌäÐÌìÁÉ½Ñ•Ñ•½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸)9¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¸É•±…á•¸Q¡¥ÌÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì)½¹±ä°Ý¥Ñ ¥‘•¹Ñ¥…°Ñ•ÍÑ•ÉÕ¹Ñ¥µ”‰åÑ•Ì¸()	Õ¥±äÐÌ½µÁ±•Ñ”è¹¼¹•Ü¡…¹‘Ìµ½¸<Ñ•ÍÐ¹••‘•‰•…ÕÍ”¹¼<½¹ÑÉ½±Ì…É”•áÁ½Í•¸)AÕÉ”‰…­”½½Ý¹•ÉÍ¡¥À½Ý½É¬½É•™ÕÍ…°½Ù•É…”¥Ì…ÕÑ½µ…Ñ•¸UÍ•ÈäÐÉAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•ì)¹•áÐ¹…ÉÉ½Ü‰Õ¥±¥¹Ñ•É…Ñ•Ì•áÁ±¥¥Ð<5Õ±Ñ¥Á±äµ±…å•ÈÉ•…Ñ¥½¸Ñ¡É½Õ ½É¥¥¹…°A…¥¹Ð)¡¥ÍÑ½Éä½Á½½°½½µÁ½Í¥Ñ½ÈÝ¥Ñ ÍÑ…•½…¹•°½ÍÑ…±”½É•™ÕÍ…°Õ…É‘Ì…¹Ñ¡•¸Ù¥Í¥‰±”½¹ÑÉ½±Ì¸)<™½Õ¹‘…Ñ¥½¸¥Ì±½…°µ½‰©•ÐÄÛŠLÄÈàÍ…µÁ±•Ì½¹±ä°¹½ÐÉ•¹‘•É•MM<°¹•¥¡‰½ÕÈµ½‰©•Ð)Í¡…‘½ÝÌ°Á•ÉÍ¥ÍÑ•¹Ð<É•Í½ÕÉ•Ì½È¡¥ µÉ•Í½±ÕÑ¥½¸…±‰•‘¼‰…­¥¹œ¸±Á¡„äÈä…¹)É•™±•Ñ¥½¸µÁÉ•Ù¥•Ü…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ð¸á¥ÍÑ¥¹œMµÕ‘”½A…¥¹Ð¡¥ÍÑ½Éä½M…Ù•=Á•¸)¥Ì½ÁÑ¥½¹…°¹•…É‰ä‘•Ù¥”Í…¹¥Ñä°¹½Ð…¸¥¹Ù•¹Ñ•<…•ÁÑ…¹”…Ñ”¸((ŒŒ€¸äÐÐ<±…å•È¥¹Ñ•É…Ñ¥½¸((´mátM…µ”µ™…”½Ù•É…”ÑÉ…¹Í™•ÈÔÄÈ¼ÄÀÈÐ•á±Õ‘•Ì…Ñ±…Ì¹•¥¡‰½ÕÉÌìÕ¹½±Õ‘•ÍÕÉ™…•ÌÝ¡¥Ñ”°…ÁÌÑÉ…¹ÍÁ…É•¹Ð°½É¥¥¹…°Í½ÕÉ•ÌÕ¹¡…¹•¸(´mátÑÕ…°ÁÉ•Ù¥•Ü½…¹•°¹¼É•Í½ÕÉ”½¡¥ÍÑ½ÉäìÁÁ±ä½¹”½É¥¥¹…°¡•­Á½¥¹Ð°Í•±•Ñ••‘¥Ñ…‰±”5Õ±Ñ¥Á±ä±…å•È°¥¹‘•Á•¹‘•¹ÐÁ••È½‰…Í”½Í…±…ÉÌ¸(´mátÑÕ…°ÄÀÈÐU$…¹•°½ÁÁ±äì½É¥¥¹…°A…¥¹Ð¡¥ÍÑ½Éä°M…Ù•=Á•¸…¹•á…Ð¹…Ñ¥Ù”½1A9É•Ñ…¥¸…ÁÁ•…É…¹”½±…å•È‘…Ñ„¸(´mátÕ±°Í±½ÑÌ½Í…±…ÉÌ½µ…Í­Ì½½µÁ±•á¥Ñä½ÍÑ…±”Í½ÕÉ”½¡•­Á½¥¹Ð½Á½½°É•™ÕÍ…°­••ÁÌ½µµ¥ÑÑ•Á…¥¹Ð½¡¥ÍÑ½Éäì™…¥±•ÁÁ±ä…¹‘¥‘…Ñ”…¸…¹•°Í…™•±ä¸(´mátI•Ñ…¥¹•¥µ…•ÌÉ•µ…¥¸Í½ÕÉ”µ•‘¥Ñ…‰±”ì¥µ…”½<ÁÉ•Ù¥•ÝÌµÕÑÕ…±±ä•á±ÕÍ¥Ù”ì½¹”‘É½ÁÌÕ¹…ÁÁ±¥•<¸(´ltY%äÐÐÉ••ÍÍ•UXµ•Í ÁÉ•Ù¥•Ü½I•… ½MÑÉ•¹Ñ °…¹•°½ÁÁ±ä…¹±…å•È½Á…¥Ñä½Ù¥Í¥‰¥±¥Ñä…ÁÁ•…É…¹”½±…Ñ•¹ä¸(´ltY%äÐÐA…¥¹ÐU¹‘½I•‘¼€¡Í•±•Ð<¥˜I•‘¼­••ÁÌ	…Í”¤°M…Ù•=Á•¸½¹…Ñ¥Ù”Í¡…‘••áÁ½ÉÐÍ…¹¥Ñä¸()UÍ•ÈäÐÉAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•ì¹¼¹•Ü<¥A…½A•¹¥°½±…Ñ•¹ä…•ÁÑ…¹”¥¹™•ÉÉ•™É½´)9½‘”•½µ•ÑÉä½µ…Ñ•É¥…°½=4…‘…ÁÑ•ÉÌ¸=É¥¥¹…°±½…°µ½‰©•ÐØÐ¼ÄØ‰…­”½Ý½É¬±¥µ¥ÑÌì)Á±…¥¸½¹Ù•àÕ‰•Ì…¸‰”Õ¹Í¡…‘•¸±Á¡„äÈä½É•™±•Ñ¥½¸µÁÉ•Ù¥•Ü…Ñ•Ì¥¹‘•Á•¹‘•¹Ð¸((¸äÐÐ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÌÄAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)M¥à¹•Ü<¥¹Ñ•É…Ñ¥½¸¡•­Ì€¬•á¥ÍÑ¥¹œÈÜÈÔÁ…ÍÌ½¸™¥¹…°Í½ÕÉ”ì½É¥¥¹…°¹•…É‰ä(äÐÌ¼äÌà¼äÐÈÍ¥áÑ••¸…¹É•Ù¥•Ý•É•±•…Í”™¥Ù”…±Í¼Á…ÍÌ¸9¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹Ì)É•±…á•¸½µÁ±•Ñ”<µ¡•±Á•È½Á…¥¹Ñ•È½Í¡•±°É•Ù•ÉÍ”Á¥¹ÌäÐÐÉ•Ù¥•Ý•ìµ…¥¸½…”½5Õ±Ñ¤Ä¸À¼)™É½é•¸Õ¹¡…¹•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌì‘•Ù¥”äÐÐÁ•¹‘¥¹œ¸((ŒŒ€¸äÐÐÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ””ÐÌääÝˆÄÈÉ˜Ý”Èåˆá‘™˜Èå‘ˆáŒØÜÔÉ‘•ŒÉàÙ€°Ñ•ÍÑ•ÑÉ•”)€ÈÌÌÅ„ÁàÙå”àÜÜÜÅ˜ÈÅ˜Ñ„å‘”ØÝ˜ÔàÅ™„ÀÑ€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ð)…Ñ„ÕÁ±½…‘•ÄÈ•á…Ð‰±½‰Ì…¹É•…Ñ•¥‘•¹Ñ¥…°Ñ•ÍÑ•ÑÉ•”ì™•Ñ¡•µ…¥¸µ…Ñ¡•°)±½…°‰É…¹ …±¥¹•±•…¹±ä¸1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÜÜÈÀØÜàÈÀ¼)©½ˆÄÄäàÀÄÜäÐÄäØ‰½Ñ Á…ÍÌ€¨¨ÈÜÌÄÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•)±½œÑ½Ñ…±ÌÙ•É¥™¥•€ ÈÌÀ¸ÁÌ¤¸A…•ÌÌäÜÜÈÀØØØÀä‰Õ¥±ÄÄäàÀÄÜäØäÔÀ½‘•Á±½äÄÄäàÀÄääØÜÔÈ)ÍÕ••‘•¸±°ÈÀÁ½ÍÑ‘•Á±½åµ•¹Ð¡•­•Í¡•±°½Ù•ÉÍ¥½¸°¡…¹•Á…¥¹Ñ•ÈU$½½É”½¹•Ü)<ÑÉ…¹Í™•È¡•±Á•È°É•Ñ…¥¹•äÐÌ‰…­”½‘½µ…¥¸°É•½Ù•Éä½µ…¥¸½…”½5Õ±Ñ¤Ä¸À½ÑÉ¥…¹±”)•½µ•ÑÉä½UX½Á…¥¹Ð½ÁÉ½©•Ð½•áÁ½ÉÐ…¹™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸)=É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•ìÁÉ½Ñ•Ñ•½™É½é•¸…±½É¥Ñ¡µÌÕ¹¡…¹•¸Q¡¥ÌÁÉ½½˜)ÕÁ‘…Ñ•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±äìÑ•ÍÑ•½ÁÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”‰åÑ•ÌÕ¹¡…¹•¸()	Õ¥±äÐÐ¥Ì½µÁ±•Ñ”…¹É•…‘ä™½È¡…¹‘Ìµ½¸Ñ•ÍÑ¥¹œèÍ¥µÁ±”É••ÍÍ•¹…Ñ¥Ù”UXµ•Í +ŠHA…¥¹ÐƒŠHµ‰¥•¹Ð½±ÕÍ¥½¸ƒŠH	…­”<ÁÉ•Ù¥•Üì½É‰¥Ð°…¹•°É•Ñ…¥¹ÌÁÉ¥½ÈÁ…¥¹Ð¸)	…­—ŠIÁÁ±äÉ•…Ñ•ÌÍ•±•Ñ••‘¥Ñ…‰±”<5Õ±Ñ¥Á±ä±…å•Èì1…å•È½Á…¥Ñä½Ù¥Í¥‰¥±¥Ñä°)A…¥¹ÐU¹‘½I•‘¼°M…Ù•=Á•¸…¹¹…Ñ¥Ù”Í¡…‘••áÁ½ÉÐÍ…¹¥Ñä¸I•‘¼™½±±½ÝÌ½É¥¥¹…°)Í•±•Ñ¥½¸ÉÕ±•Ì…¹…¸­••À	…Í”Í•±•Ñ•ì¡½½Í”<±…å•È¥˜¹••‘•¸½¹Ù•àÕ‰”)µ…äÍ¡½Ü±¥ÑÑ±”½¹¼Í¡…‘½ÜìÍ…µ”µ½‰©•Ð½±½…°ØÓ
È¼ÄØµÉ…ä‰…­”°¹½ÐÍÉ••¸µÍÁ…”½È)¹•¥¡‰½ÕÈµ½‰©•Ð<¸]½É¬½É•™ÕÍ…°±¥µ¥ÑÌÉ•µ…¥¸ìÍµ…±°UXµ•Í¡•Ì™¥ÉÍÐ¸•Ù¥”äÐÐ)…ÁÁ•…É…¹”½±…Ñ•¹ä½Á•ÉÍ¥ÍÑ•¹”…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ°¹½Ð¥¹™•ÉÉ•™É½´9½‘”¸)UÍ•ÈäÐÈ½¹¹•Ñ•MµÕ‘”AMLÁÉ½Ñ•Ñ•ì…±Á¡„äÈä½É•™±•Ñ¥½¸µÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ð¸)9•áÐ¹…ÉÉ½ÜÉÕ¹Ñ¥µ”Ý½É¬™½±±½ÝÌ…ÑÕ…°äÐÐ‘•Ù¥”™••‘‰…¬É…Ñ¡•ÈÑ¡…¸…ÕÑ½µ…Ñ¥Œ)<ÅÕ…±¥Ñä½±¥¡Ñ¥¹œ¡…¹•Ì¸9¼¹•Ü<‘•Ù¥”AML¥¹™•ÉÉ•™É½´€½¹•áÑ‰Õ¥±¸((ŒŒ€¸äÐÔ¡¥¡•ÈµÉ•Í½±ÕÑ¥½¸<€¼€¸äÐÐAMLÝ¥Ñ ÅÕ…±¥Ñä•á•ÁÑ¥½¸((´mátUÍ•ÈäÐÑAMLÁÉ½Ñ•ÑÌ<Ý½É­™±½ÜìÁ½½È½Á…Ñ¡ä…ÁÁ•…É…¹”É•µ…¥¹Ì…¸•áÁ±¥¥Ð½Á•¸¥ÍÍÕ”¸(´mátI•…°ÈÔÛ
È¼ØÐµÉ…ä‰…­”°™¥¹•ÈÍ¡…‘”±•Ù•±Ì…¹¹•ÜÑ¡¥¸µ™…”½Ù•É…”ì¹¼…Ñ±…Ìµ™…”½¹Ñ…µ¥¹…Ñ¥½¸½Í½ÕÉ”ÝÉ¥Ñ•Ì¸(´mátEÕ¥¬ØÐ¼ÄØ…Íå¹Œ½ÕÑÁÕÐ‰åÑ”µ¥‘•¹Ñ¥…°Ñ¼½±Íå¹Œ½ÕÑÁÕÐì½É¥¥¹…°á4½Í¥é”Õ…ÉÑ•ÍÑÌÉ•Ñ…¥¹•¸(´mátAÉ½É•ÍÌ½…¹•°½ÁÉ”µ…‰½ÉÐ½¥¹Ù…±¥ÅÕ…±¥Ñä¼ÄÈá4É•™ÕÍ…°­••À½ÕÑÁÕÐ…Ñ½µ¥Œ¸(´mátÑÕ…°Á…¥¹Ñ•È‰ÕÍä…¹•°½±½Í”½ÍÑ…±”Í½ÕÉ”½É•ÑÉä½Á½½°½¡•­Á½¥¹Ð…¹U$‘•™…Õ±Ð½½¹”±…Ñ”µÉ•ÍÕ±ÐÍÕÁÁÉ•ÍÍ¥½¸¸(´ltY%äÐÔÍ…µ”É••ÍÍ•µ½‘•°EÕ¥¬Ù•ÉÍÕÌ!¥ °½±<¡¥‘‘•¸½‘•±•Ñ•°Í…µ”I•… ½MÑÉ•¹Ñ èÅÕ…±¥Ñä½Á…Ñ¡¥¹•ÍÌ…¹Ý…¥ÐÑ¥µ”¸(´ltY%äÐÔ…¹•°UI%9‰…­”±•…Ù•Ì¹¼±…å•È½¡¥ÍÑ½ÉäìÉ•ÑÉäÁÁ±ä½½Á…¥Ñä½U¹‘½I•‘¼½M…Ù•=Á•¸½¹…Ñ¥Ù”Í¡…‘•½ÕÑÁÕÐ¸()9•ÜÅÕ…±¥Ñä…Ñ•ÌÉ•µ…¥¸Á•¹‘¥¹œ¸5•‘¥Õ´½EÕ¥¬™…±±‰…¬™½È½µÁ±•àÝ½É¬ì¹¼¹•Ü)Á…¥¹Ð½Í½ÕÉ”½Í…±…È±¥µ¥ÑÌ°Í¡•µ…Ì½È±¥¡ÐÍ½ÕÉ”¸=±Í…Ù•<µÕÍÐ‰”É•‰…­•¸((¸äÐÔ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÌÜAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)±°½É¥¥¹…°ÈÜÌÄ…¹Í¥à¹•ÜÅÕ…±¥Ñä½…¹•±±…Ñ¥½¸¡•­ÌÁ…ÍÌ½¸™¥¹…°Í½ÕÉ”ì)½É¥¥¹…°<äÐÌ¼äÐÐ•±•Ù•¸…¹É•Ù¥•Ý•É•±•…Í”™¥Ù”…±Í¼Á…ÍÌ¸9¼…ÍÍ•ÉÑ¥½¹Ì)É•±…á•¸I•Ù¥•Ý•<½Á…¥¹Ñ•È½Í¡•±°É•Ù•ÉÍ”É…Á äÐÔìÁÉ½Ñ•Ñ•µ…¥¸½…”½5Õ±Ñ¤Ä¸À¼)™É½é•¸Õ¹¡…¹•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌì‘•Ù¥”ÅÕ…±¥ÑäÁ•¹‘¥¹œ¸((ŒŒ€¸äÐÔÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”‰ŒÀÑ…‘ˆØØÐÔÜÈÈÍŒÉ„ÌØÔÑ•‰ÀÔå•˜ÐÄàÀÑ„Ñ‰™€°Ñ•ÍÑ•ÑÉ•”)€á…ˆÔÝ‘‘‰™”ÀÌÀÍŒàÀäÌÉ™áÑ”Õ˜äÅ”äÔÅŒÐÁ€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ð)…Ñ„ÕÁ±½…‘•ÄÌ•á…Ð‰±½‰Ì…¹É•…Ñ•¥‘•¹Ñ¥…°Ñ•ÍÑ•ÑÉ•”ì™•Ñ¡•µ…¥¸µ…Ñ¡•)…¹±½…°‰É…¹ …±¥¹•±•…¹±ä¸1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäààÜØÌÜäÌÐ¼)©½ˆÄÈÀÄääÐÌÐÔäÔ‰½Ñ Á…ÍÌ€¨¨ÈÜÌÜÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•)±½œÑ½Ñ…±ÌÙ•É¥™¥•€ ÈÌÌ¸ÅÌ¤¸A…•ÌÌäààÜØÌÜÌäÄ‰Õ¥±ÄÈÀÄääÐÌÜÀÄÌ½‘•Á±½äÄÈÀÄääÔÜÈÌäÈ)ÍÕ••‘•¸±°ÈÀ¡•­•Á½ÍÑ‘•Á±½åµ•¹ÐÍ¡•±°½Ù•ÉÍ¥½¸°¡…¹•<‰…­•È½ÑÉ…¹Í™•È¼)Á…¥¹Ñ•ÈU$½½É”°É•Ñ…¥¹•‘½µ…¥¸½ÑÉ¥…¹±”É…Á °É•½Ù•Éä½µ…¥¸½…”½5Õ±Ñ¤Ä¸À½UX½Á…¥¹Ð¼)ÁÉ½©•Ð½•áÁ½ÉÐ…¹™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸I•Ù¥•Ý•Á¥¹ÌäÐÔì)½É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•°ÁÉ½Ñ•Ñ•½™É½é•¸…±½É¥Ñ¡µÌÕ¹¡…¹•¸Q¡¥ÌÁÉ½½˜)¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±äìÑ•ÍÑ•½ÁÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”‰åÑ•ÌÕ¹¡…¹•¸()	Õ¥±äÐÔ½µÁ±•Ñ”…¹É•…‘ä™½ÈM5µµ½‘•°½µÁ…É¥Í½¸è¡¥‘”½‘•±•Ñ”½±<°EÕ…±¥Ñä)EÕ¥¬ØÐ¼ÄÛŠI	…­”½¥¹ÍÁ•Ð½…¹•°ì!¥ ÈÔØ¼ØÐ…ÐÍ…µ”I•… ½MÑÉ•¹Ñ °½µÁ…É”™¥¹•ÈÍ¡…‘”)…¹Ý…¥ÐÑ¥µ”¸5•‘¥Õ´ÄÈà¼ØÐÉ•µ…¥¹Ì…Ù…¥±…‰±”¥˜!¥ Ý½É¬…ÀÉ•™ÕÍ•Ì¸…¹•°‘ÕÉ¥¹œ)‰…­”±•…Ù•Ì¹¼±…å•È½¡¥ÍÑ½ÉäìÉ•ÑÉä½ÁÁ±ä°1…å•È½Á…¥Ñä½Ù¥Í¥‰¥±¥Ñä°A…¥¹ÐU¹‘½I•‘¼°)M…Ù•=Á•¸½¹…Ñ¥Ù”Í¡…‘¥¹œ¸=±Í…Ù•<Á¥á•±Ì‘¼¹½Ð…ÕÑ½µ…Ñ¥…±±ä¥µÁÉ½Ù”ìÉ•‰…­”¸)UÍ•ÈäÐÑAMLÁÉ½Ñ•ÑÌÝ½É­™±½ÜÝ¥Ñ •áÁ±¥¥ÐÁ½½È½Á…Ñ¡ä…ÁÁ•…É…¹”•á•ÁÑ¥½¸ìäÐÔ)…ÑÕ…°¥A…ÅÕ…±¥Ñä½±…Ñ•¹ä…•ÁÑ…¹”É•µ…¥¹ÌA9%9°¹½Ð¥¹™•ÉÉ•™É½´9½‘”¸)EÕ…±¥ÑäÑ•ÍÐÁÉ½Ù•Ì…ÑÕ…°¡¥¡•ÈÉ¥½µ½É”±•Ù•±Ì½Ñ¡¥¸µ™…”½Ù•É…”°¹½ÐÁ•É™•Ð)Íµ½½Ñ¡¹•ÍÌ½¸•Ù•Éäµ½‘•°¸±Á¡„äÈä½É•™±•Ñ¥½¸…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ð¸9•áÐ)ÉÕ¹Ñ¥µ”É•™¥¹•µ•¹Ð™½±±½ÝÌ‘•Ù¥”½µÁ…É¥Í½¸É…Ñ¡•ÈÑ¡…¸Õ¹É•±…Ñ•±¥¡Ñ¥¹œ¡…¹•Ì¸((ŒŒ€¸äÐØƒŠPÁ…¥¹Ð€¼UXÉ•ÍÑ…ÉÐì€¸äÐÔÕÍ•ÈAMLƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äÉ•Á½ÉÑÌ€¨¨äÐÔ€ôAML¨¨èÁÉ½Ñ•Ð¡¥¡•ÈµÉ•Í½±ÕÑ¥½¸<…¹¥ÑÌ•á¥ÍÑ¥¹œ)ÁÉ•Ù¥•Ü½…¹•°½…ÁÁ±ä½¡¥ÍÑ½ÉäÝ½É­™±½Ü¸Q¡¥ÌÍÕÁ•ÉÍ•‘•Ì•…É±¥•ÈÁ•¹‘¥¹œäÐÔ¹½Ñ•Ìì)¹¼¥µÁ±¥…Ñ¥½¸½˜Á•É™•Ð<½¸…±°µ•Í¡•Ì½È…•ÁÑ…¹”½˜Õ¹É•±…Ñ•½Á•¸…Ñ•Ì¸()Õ‘¥Ðµ…¥¸ÁŒÄÐÀÀè½É¥¥¹…°UXÁÉ½©•Ñ¥½¹Ì…¹A…¬…±°•á¥ÍÐ°¹¼Á…¥¹ÐÉ•Í•Ð…¹)¹¼•¹•É…°…Ñ±…ÌÕ¹ÝÉ…À¸á…Ñ±…Ì…ÁÁ•…ÉÌ½¹±ä¥¸Á…Ñ¡ÑÉ…”‘•Á•¹‘•¹äUI0ìA…¬…±°)…ÉÉ…¹•Ì•á¥ÍÑ¥¹œ¥Í±…¹‘Ì…¹‘½•Ì¹½Ð•¹•É…Ñ”…¸…Ñ±…Ì¸-••À…Ñ±…ÌÕ¹ÝÉ…À…Ì„)Í•Á…É…Ñ”™ÕÑÕÉ”¹…ÉÉ½ÜÑ…Í¬Ñ¡É½Õ ½É¥¥¹…°UX½¡¥ÍÑ½Éä½Ý¹•ÉÌ¸()=‰©•ÐƒŠHUX¹½Ü•áÁ½Í•Ì±•…ÈÁ…¥¹Ð€¡­••ÁÌUYÌ¤…¹±•…ÈÁ…¥¹Ð€¬UYÌ€¡¡½½Í”„)ÁÉ½©•Ñ¥½¸……¥¸¤¸	½Ñ Ý½É¬Ý¥Ñ ÍÑ…±”•½µ•ÑÉä½UX‰¥¹‘¥¹ÌÝ¥Ñ¡½ÕÐ½Á•¹¥¹œA…¥¹Ð¸)±°½±½ÕÈ±…å•ÉÌ½µ…Í­Ì½¥µ…•Ì½<Á±ÕÌÉ½Õ¡¹•ÍÌ…¹µ•Ñ…±¹•ÍÌÉ•Í½ÕÉ•Ì‘•Ñ… ¥¸)½¹”½É¥¥¹…°Í•¹”¡•­Á½¥¹ÐìÍ¡…É•É•Í½ÕÉ•Ì½½Á¥•ÌÉ•µ…¥¸¥¹Ñ…Ð¸9¼É•‰¥¹½˜)½±Á¥á•±Ì°¹¼•½µ•ÑÉä•‘¥ÑÌ°¹¼…ÕÑ½µ…Ñ¥Œ‘¥Í…É½¸UX•‘¥ÑÌ¸U¹‘¼½I•‘¼É•ÍÑ½É•Ì)•á…ÐÉ•Í½ÕÉ•Ì½UYÌ¸I•Í•Ð¥Ì™½È¥¹‘•Á•¹‘•¹Ð	½á1…ˆµ•Í¡•Ìì¥µÁ½ÉÑ•1µ…Ñ•É¥…±Ì°)±¥¹­•½ÁÉ½•‘ÕÉ…°½±½­•½É•™•É•¹”½‰©•ÑÌ…É”É•™ÕÍ•¸á¥ÍÑ¥¹œÁÉ½©•Ñ¥½¸	…Í”)É•ÍÑÉ¥Ñ¥½¹ÌÉ•µ…¥¸¸Y¥•ÝÁ½ÉÐÉ•™É•Í ÕÍ•Ì½É¥¥¹…°É•¹‘•Èµµ½‘”½Ý¹•È¸MÑ…±”Á…¥¹Ð)•ÉÉ½ÉÌ¹½Ü‘¥É•ÐÑ¼=‰©•ÐƒŠHUXƒŠH±•…ÈÁ…¥¹Ð¸()½ÕÈ¹•ÜäÐØÑ•ÍÑÌ½Ù•È…±°µ¡…¹¹•°ÍÑ…±”É•½Ù•Éä…¹É•½Á•¸°…ÑÕ…°U¹‘½I•‘¼½=\°)ÍÑ…±”UXÉ•µ½Ù…°½É•ÁÉ½©•Ð½É•Á…¥¹Ð°‰±…¹¬¹…Ñ¥Ù”M…Ù•=Á•¸°¹¼µ½À½É•™ÕÍ…°…Ñ½µ¥¥Ñä°)…¹½É¥¥¹…°Á…¹•°…±±‰…¬½É•¹‘•È‘•±•…Ñ¥½¸¸9•Üµ…¹Õ…°…Ñ”èÉ•ÁÉ½‘Õ”ÍÑ…±”)Á…¥¹ÐƒŠH±•…ÈÁ…¥¹ÐƒŠHA…¥¹Ðì±•…È‰½Ñ ƒŠH	½à½…ÁÁÉ½ÁÉ¥…Ñ”ÁÉ½©•Ñ¥½¸ƒŠHA…¥¹Ðì)U¹‘½I•‘¼É•Í•Ð…¹M…Ù•=Á•¸‰±…¹¬½É•Á…¥¹Ñ•É•ÍÕ±Ð¸Ñ±…Ì•¹•É…Ñ¥½¸¹½ÐÍ¡¥ÁÁ•¸)I•±•…Í”É…Á äÐØÉ•Ù¥•Ý•ì5Õ±Ñ¤Ä¸À½™É½é•¸™¥±•ÌÕ¹¡…¹•¸Y…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸)É•ÍÕ±ÑÌ™½±±½Üì¹¼äÐØ‘•Ù¥”AML¥¹™•ÉÉ•¸((´mátY%äÐÔÕÍ•È•áÁ±¥¥Ñ±äÉ•Á½ÉÑÌAMLì¡¥¡•ÈµÉ•Í½±ÕÑ¥½¸<Ý½É­™±½ÜÁÉ½Ñ•Ñ•¸(´ltY%äÐØ±•…ÈÁ…¥¹Ð°±•…ÈÁ…¥¹Ð€¬UYÌ°É•ÁÉ½©•Ð½É•Á…¥¹Ð°U¹‘½I•‘¼…¹M…Ù•=Á•¸¸((¸äÐØÉÕ¹Ñ¥µ”ÁÕ‰±¥Í¡•è€å…˜å„ÌÝ•‰•ˆÀäÄÍ”ÍŒÔÁ˜ÜÙ„Á”ÕˆÄäá˜àäÄÐÍ™‘™€°Ñ•ÍÑ•ÑÉ•”)€ÌÄá˜ÐÈÀÄÈÀÌäÉ”ÔÜÍ˜ÐØÍ˜ààÌÑ…˜ÀÔÄÀÌÔØÍŒÙ™€¸1½…°9½‘”ÈÐ™Õ±°É•É•ÍÍ¥½¸è(¨¨È°ÜÐÄAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨€ ÈÄÈ¸åÌ¤°¥¹±Õ‘¥¹œ½É¥¥¹…°ÈÜÌÜ…¹™½ÕÈ¹•Ü)É•½Ù•ÉäÑ•ÍÑÌì¹¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸I•±•…Í”½¹ÑÉ…Ð™¥Ù”Á…ÍÌ¸I•µ½Ñ”)µ…¥¸™•Ñ¡•°•á…ÐÑ•ÍÑ•ÑÉ•”µ…Ñ¡•…¹±½…°‰É…¹ …±¥¹•±•…¹±ä¸)!½ÍÑ•É•É•ÍÍ¥½¸ÌääÀÀäØØÐÈÀ…¹A…•ÌÌääÀÀäØØÈÐÌÙ•É¥™¥•‰•±½Ü¸((¸äÐØÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•è¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌääÀÀäØØÐÈÀ½©½ˆÄÈÀÈÐÈÄäàÌÜÄ)Á…ÍÍ•Ì€¨¨ÈÜÐÄÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨€¡™Õ±°±½œÑ½Ñ…±ÌÙ•É¥™¥•¤°µ…Ñ¡¥¹œ)±½…°9½‘”ÈÐ¸A…•ÌÌääÀÀäØØÈÐÌ‰Õ¥±ÄÈÀÈÐÈÈÀÄÌàÌ½‘•Á±½äÄÈÀÈÐÈÌÐÔÄÐäMUML¸)±°ÈÀ¡•­•Á½ÍÑ‘•Á±½åµ•¹ÐÍ¡•±°½Ù•ÉÍ¥½¸°É•Í•Ð½UX½Á…¥¹Ñ•È½É•…Ñ¥½¸±½…‘•ÉÌ°)É•±•…Í”µÉ•½Ù•Éä½<½µ…¥¸½5Õ±Ñ¤Ä¸À½¥¹ÍÁ•Ñ¥½¸½Á…¥¹Ð½ÁÉ½©•Ð½•áÁ½ÉÐ…¹™É½é•¹	•Ñ„Ü)µ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸9¼Ñ•ÍÑ•ÉÕ¹Ñ¥µ”¡…¹•…™Ñ•ÈÙ…±¥‘…Ñ¥½¸¸()	Õ¥±äÐØ½µÁ±•Ñ”…¹É•…‘ä™½È‘•Ù¥”Ñ•ÍÑ¥¹œè=‰©•ÐƒŠHUXƒŠH±•…ÈÁ…¥¹Ð­••ÁÌ)UYÌ…¹ÍÑ…ÉÑÌ„‰±…¹¬Á…¥¹ÐÍ•ÍÍ¥½¸°¥¹±Õ‘¥¹œÑ¡”½±‰¥¹‘¥¹œµ•ÉÉ½È…Í”¸±•…È)Á…¥¹Ð€¬UYÌÁ•Éµ¥ÑÌ™É•Í 	½à½…ÁÁÉ½ÁÉ¥…Ñ”ÁÉ½©•Ñ¥½¸…¹É•Á…¥¹Ð¸U¹‘½I•‘¼É•ÍÑ½É•Ì)É•Í½ÕÉ•Ì½UYÌìM…Ù•=Á•¸É•Ñ…¥¹Ì±•…É•½É•Á…¥¹Ñ•É•ÍÕ±Ð¸•Ù¥”äÐØA9%9¸UÍ•ÈäÐÔ)AMLÁÉ½Ñ•Ñ•¸•¹•É…°…Ñ±…ÌÕ¹ÝÉ…ÀÉ•µ…¥¹Ì„Í•Á…É…Ñ”™ÕÑÕÉ”‰Õ¥±ìA…¬…±°½¹±ä)…ÉÉ…¹•Ì•á¥ÍÑ¥¹œ¥Í±…¹‘Ì¸Q¡¥ÌÁÉ½½˜¡…¹•Ì½¹Ñ¥¹Õ¥Ñä‘½Ì½¹±ä¸((ŒŒ€¸äÐÜƒŠPÙ¥ÍÕ…°A…¥¹Ð±…å•ÈÍÑ…¬ìÕÍ•ÈäÐÙAMLƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌäÐÙAMLèÁÉ½Ñ•Ð•áÁ±¥¥ÐÕ¹‘½…‰±”±•…ÈÁ…¥¹Ð€¼±•…ÈÁ…¥¹Ð€¬UYÌ°)ÍÑ…±”µ‰¥¹‘¥¹œÉ•½Ù•Éä½É•ÁÉ½©•Ð…¹½É¥¥¹…°É•Í½ÕÉ•Ì½¡¥ÍÑ½Éä¸UÍ•È¹½ÜÁÉ¥½É¥Ñ¥é•Ì)„AÉ½É•…Ñ”µÍÑå±”±…å•È±¥ÍÐì…Ñ±…ÌÕ¹ÝÉ…ÀÉ•µ…¥¹Ì‘•™•ÉÉ•°¹½Ð¥µÁ±•µ•¹Ñ•‰äA…¬¸)Õ‘¥ÐÕÉÉ•¹ÐáŒäàÀÜÈè…±°±…å•È½Á•É…Ñ¥½¹Ì…±É•…‘ä‰•±½¹œÑ¼½É¥¥¹…°A…¥¹Ð½É”…¹)U$½¹ÑÉ½±Ìì½¹±ä‘É½Á‘½Ý¸ÁÉ•Í•¹Ñ…Ñ¥½¸•á¥ÍÑ•°¹¼Ñ¡Õµ‰¹…¥°½±¥ÍÐ½Ý¹•È¸()I•Á±…”Ù¥Í¥‰±”±…å•È‘É½Á‘½Ý¸Ý¥Ñ ½µÁ…ÐÑ½Àµ™¥ÉÍÐ±¥ÍÐ¥¸•á¥ÍÑ¥¹œÈÜÉÁà1P)‘½¬èØÑÁà½¹Ñ•¹ÐÑ¡Õµ‰¹…¥±Ì‘¥ÍÁ±…å•ÐÁÁà½Ù•È¡•­•É‰½…É°¹…µ”°Õ¹¥ÅÕ”ÇŠLÈµ±•ÑÑ•È)‰±•¹½‘”°½Á…¥Ñä”°Ù¥Í¥‰¥±¥ÑäÑ½±”°Í•±•Ñ•‰±Õ”É½Ü…¹¥µ…”½µ…Í¬±…‰•±Ì¸)Q…ÀÉ½ÜÑ¼Í•±•Ðì‰±•¹½½Á…¥Ñä½Á•¹Ì½É¥¥¹…°M•±•Ñ•±…å•ÈÍ•ÑÑ¥¹Ì‰•±½Ü±¥ÍÐ¸)=É¥¥¹…°¡¥‘‘•¸Í•±•Ð½Ù¥Í¥‰¥±¥Ñä¹½‘•ÌÉ•µ…¥¸•Ù•¹ÐÑÉ…¹ÍÁ½ÉÐ™½È½É¥¥¹…°½Ý¹•ÉÌ)…¹É•É•ÍÍ¥½¸½¹ÑÉ…ÑÌ°¹½Ð‘ÕÁ±¥…Ñ”Ù¥Í¥‰±”½¹ÑÉ½±Ì¸€¬1…å•È¼¬%µ…”É•µ…¥¸)‰•Í¥‘”¡•…‘¥¹œì¥µ…”•‘¥Ð½½¹Ù•ÉÍ¥½¸µ½Ù•Ì¥¹Ñ¼Í•±•Ñ•Í•ÑÑ¥¹Ì¸=É¥¥¹…°É•¹…µ”°)½Á…¥Ñä°‰±•¹°½É‘•È°‘•±•Ñ”°µ•É”°™±…ÑÑ•¸°µ…Í­Ì…¹¥µ…”…Ñ¥½¹ÌÉ•Ñ…¥¹•¸)	…Í”Ù¥Í¥‰¥±¥Ñä½‰±•¹½½Á…¥ÑäÍÑ…ä¥µµÕÑ…‰±”ìÍ…±…È¡…¹¹•±Ì¡¥‘”½±½ÕÈÍÑ…¬ì)<ÍÑ…¥¹œ‘¥Í…‰±•ÌÉ½Ü•‘¥ÑÌ¸9¼¹•ÜÁ…¥¹ÐÍ¡•µ„°‰Õ‘•ÑÌ°¡¥ÍÑ½Éä°½µÁ½Í¥Ñ½È½È)µ½‘•±±¥¹œ½Ý¹•È¸±°½É¥¥¹…°ÁÉ½Ñ•Ñ••ÍÑÕÉ•Ì½5Õ±Ñ¤Ä¸À½™É½é•¸™¥±•ÌÉ•Ñ…¥¹•¸()ÍÉŒ½Á…¥¹Ðµ±…å•Èµ±¥ÍÐ¹©Ì¥ÌÁÉ•Í•¹Ñ…Ñ¥½¸½¹±äìÙ¥•ÝÁ½ÉÐÁ…¥¹Ñ•È•áÁ½Í•Ì½Ý¹•Ñ¥¹ä)±…å•ÉQ¡Õµ‰¹…¥°Í¹…ÁÍ¡½ÑÌ½˜½µµ¥ÑÑ•É…Ü½±½ÕÈ½…±Á¡„°‰•™½É”±…å•È½Á…¥Ñä½‰±•¹¼)µ…Í¬¸É•„É•‘ÕÑ¥½¸¥¹±Õ‘•ÌÑ¡¥¸µ…É­Ì…¹…±Á¡„µÝ•¥¡Ñ•I°™±¥ÁÌUYØÀµ™¥ÉÍÐ)É½ÝÌ™½ÈÑ½ÀµÕÀÁÉ•Ù¥•ÝÌ°…¡•Ì‰ä¥µµÕÑ…‰±”Á¥á•°¥‘•¹Ñ¥ÑäÕÍ¥¹œÍ•ÍÍ¥½¸]•…­5…À¸)9¼™Õ±°Ñ•áÑÕÉ”‰åÑ•Ì•áÁ½Í•Ñ¼=4ì¹¼Ñ¡Õµ‰¹…¥±ÌÍ•É¥…±¥é•½È¡¥ÍÑ½Éä•¹ÑÉ¥•Ì)™½È‰É½ÝÍ¥¹œ¸UÁ‘…Ñ•Ì…™Ñ•È½É¥¥¹…°A•¹¥°É•±•…Í”½…Ñ¥½¹Ì½¡¥ÍÑ½ÉäÉ•½Á•¸°±•…ÉÌ)½¸±½Í”¸…¹Ù…ÌÑ¡Õµ‰¹…¥±Ì…É”½¹Ñ•¹ÐÁÉ•Ù¥•ÝÌ°¹½Ð™¥¹…°½µÁ½Í¥Ñ•Ì½Èµ…Í¬µ…ÁÌ¸()¥Ù”¹•ÜÑ•ÍÑÌ½Ù•È…±°ÈØÕ¹¥ÅÕ”‰±•¹½‘•Ì°…±Á¡„½Ñ¡¥¸½½É¥•¹Ñ…Ñ¥½¸½½Ý¹•ÉÍ¡¥À°)…ÑÕ…°U$É½Ü½É‘•È½½¹Ñ•¹Ð½µ…Í¬½É•¹…µ”½‰±•¹½½Á…¥Ñä°Ù¥Í¥‰¥±¥Ñä½¹”¡•­Á½¥¹Ð°)U¹‘½I•‘¼½É•½Á•¸½M…Ù•=Á•¸°ÍÑÉ½­”…¹•°…¹Í…±…È½<½±½Í”Õ…É‘Ì¸=É¥¥¹…°äÀÔ¼äÀØ¼(äÈàÑ…É•Ñ•ÄåAML¸!•…‘±•ÍÌ¡É½µ¥Õ´É•¹‘•É¥¹œ½˜…ÑÕ…°µ…É­ÕÀ½ÍÑå±•Ì½±¥ÍÐµ½‘Õ±”)Ý¥Ñ ™¥áÑÕÉ”µ•Ñ…‘…Ñ„Ù•É¥™¥•¹¼½Ù•É™±½Ü…ÐÈÜÉÁà‘½¬€¼ÄÀÈÐ…¹ÌäÀÙ¥•ÝÁ½ÉÐÝ¥‘Ñ¡Ì°)Í•±•Ñ¥½¸Í•ÑÑ¥¹Ì½Ù¥Í¥‰¥±¥Ñä…¹ÍÉ••¹Í¡½Ð¥¹ÍÁ•Ñ¥½¸ìÉ•…°Á…¥¹Ñ•È½¡¥ÍÑ½ÉäÑ•ÍÑ•)Ñ¡É½Õ ½É¥¥¹…°¥¹Ñ•É…Ñ¥½¸¡…É¹•ÍÌ°¹¼¥A……•ÁÑ…¹”¥¹™•ÉÉ•¸MÉ••¹Í¡½Ð¥ÌE)™¥áÑÕÉ”½¹±äì½É¥¥¹…°…ÁÀ½Í•ÍÍ¥½¸±…å½ÕÐ½Ý¹•ÉÌÕ¹¡…¹•¸Õ±°½ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜)™½±±½ÝÌ¸Y%äÐÜè±…å•ÈÑ…ÁÌ½ÍÑÉ½­•Ì½ÁÉ•Ù¥•ÝÌì‰±•¹½½Á…¥Ñä½Ù¥Í¥‰¥±¥Ñäì½É‘•É¥¹œ¼)¥µ…”­µ…Í¬Í•±•Ñ¥½¸ìU¹‘½I•‘¼½M…Ù•=Á•¸…¹±•™Ð‘½¬ÍÉ½±±¥¹œ½½¹”½¸¥A…¸((´mátY%äÐØÕÍ•ÈAMLèÕ¹‘½…‰±”¹…Ñ¥Ù”A…¥¹Ð½UXÉ•Í•Ð…¹ÍÑ…±”‰¥¹‘¥¹œÉ•½Ù•ÉäÁÉ½Ñ•Ñ•¸(´ltY%äÐÜÙ¥ÍÕ…°ÍÑ…¬Ñ…ÁÌ½Ñ¡Õµ‰¹…¥°É•™É•Í ½Í•ÑÑ¥¹Ì½Ù¥Í¥‰¥±¥Ñä½½É‘•È½U¹‘½I•‘¼½M…Ù•=Á•¸…¹‘½¬ÍÉ½±°¸((¸äÐÜ™¥¹…°±½…°9½‘”ÈÐÉ•É•ÍÍ¥½¸è€¨¨È°ÜÐØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨€ ÄàÀ¸åÌ¤ì)½É¥¥¹…°ÈÜÐÄ…¹™¥Ù”¹•ÜÙ¥ÍÕ…°µ±¥ÍÐ¡•­ÌÉ•Ñ…¥¹•¸=É¥¥¹…°äÀÔ¼äÀØ¼äÈàÑ…É•Ñ•Ää)…¹É•Ù¥•Ý•É•±•…Í”™¥Ù”Á…ÍÌ¸9¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¸É•±…á•¸IÕ¹Ñ¥µ”ÁÕ‰±¥Í¡•)€ÜàääÈÑ”ÄåˆÄÁ•˜ÉˆàÄÐÀåÌÐÈäÁ”Í˜Õ‘àÉ˜Á€°•á…ÐÑ•ÍÑ•ÑÉ•”)‰ˆäÝÅ”Õ™…ŒÌØÝˆÁ˜ÔÉ™•ˆÀÐÁ˜ÈäÀÙ•ˆÌÌØÔÔÙ•€¸•Ñ¡•µ…¥¸µ…Ñ¡•Ñ¡…ÐÑÉ•”…¹)±½…°‰É…¹ …±¥¹•±•…¹±ä¸!½ÍÑ•É•É•ÍÍ¥½¸€¼A…•Ì€¼±¥Ù”µ™¥±”ÁÉ½½˜Ù•É¥™¥•‰•±½Ü¸((ŒŒ€¸äÐÜÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”ÜàääÈÑ”ÄåˆÄÁ•˜ÉˆàÄÐÀåÌÐÈäÁ”Í˜Õ‘àÉ˜À€¼Ñ•ÍÑ•ÑÉ•”)‰ˆäÝÅ”Õ™…ŒÌØÝˆÁ˜ÔÉ™•ˆÀÐÁ˜ÈäÀÙ•ˆÌÌØÔÔÙ”ÁÕ‰±¥Í¡•…¹™•Ñ¡•µ…¥¸µ…Ñ¡••á…Ñ±ä¸)1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌääÀÌÄØàÐÔÌ½©½ˆÄÈÀÈÐäÀØÔàÜà‰½Ñ Á…ÍÌ(¨¨ÈÜÐØÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì™Õ±°¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•¸=É¥¥¹…°)¡•­ÌÉ•Ñ…¥¹•¸A…•ÌÌääÀÌÄØÜäÈÌ‰Õ¥±ÄÈÀÈÐäÀØÜàÔÐ½‘•Á±½äÄÈÀÈÐäÈÀäÜÈÜMUML¸)±°ÈÀ¡•­•±¥Ù”Í¡•±°½Ù•ÉÍ¥½¸°±…å•Èµ±¥ÍÐ½Á…¥¹Ñ•È½É•½Ù•Éä°É•Ñ…¥¹•±…å•È½‰±•¹¼)Á…¥¹Ð½ÁÉ½©•Ð½•áÁ½ÉÐ½<½UX½É•Í•Ð½µ…¥¸½5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•)Í½ÕÉ”¸I•Ù•ÉÍ”±½…‘•È­•åÌäÐÜÉ•Ù¥•Ý•ì¹¼Ñ•ÍÑ•ÉÕ¹Ñ¥µ”¡…¹•Ì…™Ñ•ÈÙ…±¥‘…Ñ¥½¸¸)Q¡¥ÌÁÉ½½˜ÕÁ‘…Ñ•Ì½¹Ñ¥¹Õ¥Ñä‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸()	Õ¥±äÐÜÉ•…‘ä™½È¥A…Ñ•ÍÑ¥¹œè½Á•¸A…¥¹ÐÝ¥Ñ ÑÝ¼½Èµ½É”±…å•ÉÌ°Ñ…ÀÉ½ÝÌ…¹)Á…¥¹Ð‘¥ÍÑ¥¹Ðµ…É­ÌìÁÉ•Ù¥•ÝÌÕÁ‘…Ñ”½¸A•¹¥°±¥™Ð¸	±•¹½‘”€¼½Á…¥Ñä”½Á•¹Ì)Í•±•Ñ•Í•ÑÑ¥¹Ìì•‘¥ÐÑ¡•´…¹¡•¬É½Ü½µ•Í ¸Y¥Í¥‰¥±¥Ñä¡•¬Ñ½±•ÌÍ•±•Ñ•)É½ÜÝ¥Ñ ½¹”½É¥¥¹…°U¹‘¼ì	…Í”¥µµÕÑ…‰±”¸¡•¬¥µ…”½µ…Í¬É½ÝÌ°É•½É‘•ÈUÀ½½Ý¸°)U¹‘½I•‘¼½M…Ù•=Á•¸…¹‰½Õ¹‘•±•™Ð‘½¬ÍÉ½±±¥¹œ½½¹”¸•Ù¥”äÐÜA9%9ìäÐØÕÍ•È)AMLÁÉ½Ñ•Ñ•¸•¹•É…°…Ñ±…ÌÕ¹ÝÉ…ÀÉ•µ…¥¹Ì‘•™•ÉÉ•‰•¡¥¹ÕÉÉ•¹ÐU$É•ÅÕ•ÍÐ¸(((ŒŒ€¸äÐàƒŠP½µµ¥ÑÑ•½±½ÕÈ±¥¡Ñ¥¹œì€¸äÐÜÕÍ•ÈAMLƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈÉ•Á½ÉÑÌ€¸äÐÜAMLèÁÉ½Ñ•ÐÙ¥ÍÕ…°±…å•ÈÍ•±•Ñ¥½¸½Ñ¡Õµ‰¹…¥±Ì°‰±•¹½½Á…¥Ñä¼)Ù¥Í¥‰¥±¥Ñä°¡¥ÍÑ½Éä½Á•ÉÍ¥ÍÑ•¹”…¹‰½Õ¹‘•1P‘½¬¸½¹Ñ¥¹Õ”É•ÅÕ•ÍÑ•É•Á…¥Èè)½±½ÕÈµ½¹±äUXÁ…¥¹Ð½¥µ…”½<½µÁ½Í¥Ñ•ÌµÕÍÐÉ•©½¥¸Í•¹”±¥¡Ñ¥¹œ…™Ñ•ÈA…¥¹Ð½¹”¸)Õ‘¥Ðµ…¥¸ÄÝ‰”ÐÌàè½É¥¥¹…°É•…Ñ•½µµ¥ÑÑ•‘A…¥¹ÑMÕÉ™…”½¹±äÍ•±•Ñ•MÑ…¹‘…É™½È)Ù…±¥É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌì½±½ÕÈµ½¹±ä¥¹Ñ•¹Ñ¥½¹…±±äÍÑ…å•	…Í¥Œ¸MÑÕ‘¥¼Í¡…‘½Ü™±…Ì)Ý•É”ÅÕ•Õ•…™Ñ•Èµ…Ñ•É¥…°É•…Ñ¥½¸…¹½Õ±‰”½Á¥•Ñ½¼•…É±ä¸9¼µ¥ÍÍ¥¹œ±¥¡Ð°)¹•ÜÉ•¹‘•É¥¹œ•¹¥¹”½ÈÍ•½¹µ…Ñ•É¥…°½Ý¹•È¥ÌÉ•ÅÕ¥É•™½ÈÑ¡¥ÌÍÁ•¥™¥Œ‘•™•Ð¸()=É¥¥¹…°½µµ¥ÑÑ•ÍÕÉ™…”¹½Ü…±Ý…åÌ…±±Ì¥ÑÌ•á¥ÍÑ¥¹œMÑ…¹‘…Éµ…Ñ•É¥…°Á…Ñ ™½È)Ù…±¥¡…¹¹•±Ì¸½±½ÕÈÉ•µ…¥¹Ì•á…ÐÍI…±‰•‘¼°Ý¡¥Ñ”™…Ñ½È°‘•™…Õ±ÐÉ½Õ¡¹•ÍÌÄ€¼)µ•Ñ…±¹•ÍÌÀì¹¼Í…±…Èµ…ÁÌ½É•Í½ÕÉ•Ì¥¹Ù•¹Ñ•¸MÑ…±”Í…±…È¥Ì½µ¥ÑÑ•ìÍÑ…±”½±½ÕÈ)ÍÑ¥±°É•™ÕÍ•Ì¸M…µ”½É¥¥¹…°•½µ•ÑÉä½UX½±¥™•Ñ¥µ”…¹…Íå¹Œ¥‘•¹Ñ¥ÑäÕ…É‘Ì¸MÑÕ‘¥¼)Í•ÑÌ½É¥¥¹…°‰½‘ä…ÍÐ½É••¥Ù”™±…ÌÍå¹¡É½¹½ÕÍ±ä‰•™½É”…Íå¹ŒÍÕÉ™…”É•…Ñ¥½¸°)Í¼‰½Ñ …Ñ¥Ù”…¹¥¹…Ñ¥Ù”½±½­•Á…¥¹ÐÉ•Á±…•µ•¹ÑÌ¥¹¡•É¥ÐÍ¡…‘½ÝÌÉ•…É‘±•ÍÌ½˜)‘¥•ÍÐ½™É…µ”½É‘•È¸á¥ÍÑ¥¹œMÑÕ‘¥¼±¥¡ÑÌ½É¥œ½™±½½È…¹É•™±•Ñ¥½¸Á½½°Õ¹¡…¹•¸)A…¥¹Ð¡…¹¹•°É•µ…¥¹Ì¥¹Ñ•¹Ñ¥½¹…±±äÕ¹±¥ÐÝ¡¥±”•‘¥Ñ¥¹œìA…¥¹Ð1¥ÐÁÉ•Ù¥•ÜÕ¹¡…¹•¸)á¥ÍÑ¥¹œÍ…Ù•½±½ÕÈÁÉ½©•ÑÌ…¥¸±¥Ð‘¥ÍÁ±…ä½¸É•½Á•¸½É•‰Õ¥±Ý¥Ñ¡½ÕÐµ¥É…Ñ¥½¸°)É•Í½ÕÉ”½¡¥ÍÑ½Éä½Á¥á•°½•áÁ½ÉÐ¡…¹•Ì¸9¼¹•Ü<‰…­”°•¹•É…°…Ñ±…ÌÕ¹ÝÉ…À½È±…¥´)Ñ¡…ÐÑ¡”½±‘•ÈÍµ½½Ñ µµ•Ñ…°É•™±•Ñ¥½¸É•Á½ÉÐ¥ÌÉ•Í½±Ù•‰äÑ¡¥Ì½±½ÕÈµ½¹±ä™¥à¸()½ÕÈ¹•Ü¥¹Ñ•É…Ñ¥½¹Ì½Ù•ÈÔÄÈ¼ÄÀÈÐ•á…Ð½Ý¹•ÍIÁ¥á•±Ì½UYÌ½Í¡…‘½Ü™±…Ì½‘¥ÍÁ½Í…°°)½É¥¥¹…°MÑÕ‘¥¼…Ñ¥Ù”­¥¹…Ñ¥Ù”½±½­•Á…Ñ 	=IÅÕ•Õ•É•™É•Í °É•‰Õ¥±½‘¥…¹½ÍÑ¥Œ)±•…¹ÕÀ°…ÑÕ…°A…¥¹Ð¡…¹¹•³ŠI½¹—ŠI±¥Ð…¹•á…ÐM…Ù”½=Á•¸Ý¥Ñ¡½ÕÐ•áÑÉ„¡¥ÍÑ½Éä°)ÍÑ…±”½É•Á±…•½‰½‘äµ±½ÍÌÍÕÁÁÉ•ÍÍ¥½¸¸=É¥¥¹…°äÈÀ¼äÈÌ½±½ÕÈµ½¹±ä	…Í¥Œ…ÍÍ•ÉÑ¥½¹Ì¹½Ü)É•ÅÕ¥É”É•ÅÕ•ÍÑ•MÑ…¹‘…É™…±±‰…¬Ý¡¥±”É•Ñ…¥¹¥¹œ•á…ÐÁ¥á•±Ì…¹…‰Í•¹ÐÍÑ…±”)Í…±…Èµ…Àì±¥Ù”¡…¹¹•°•áÁ•Ñ…Ñ¥½¹ÌÉ•µ…¥¸	…Í¥Œ¸=É¥¥¹…°äÀÐ¼äÀä½µµ¥ÑÑ•‘¥ÍÁ±…ä)¡•­ÌÉ•Ñ…¥¸•á…ÐÁ¥á•°•ÅÕ…±¥Ñä…¹¹½ÜÉ•ÅÕ¥É”ÁÉ¥Ù…Ñ”±¥ÐÑ•áÑÕÉ”½Ý¹•ÉÍ¡¥À°…Ì)…±É•…‘äÕÍ•™½ÈÍ…±…Èµ±¥ÐÍÕÉ™…•Ì¸9•Ü­¹•…É‰äÁ…¥¹Ð½±…å•ÉÌ½Í…±…È¼)É•™±•Ñ¥½¸½É•±•…Í”ÌÁAML¸Õ±°É•É•ÍÍ¥½¸½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½ÝÌ¸()I•Ù¥•Ý••¹Ñ¥É”ÍÕÉ™…—ŠIÁ…¥¹Ñ•È½É•¹‘•È½•áÁ½ÉÓŠI1…ˆÉ•Ù•ÉÍ”±½…‘•ÈÉ…Á äÐà…¹Í¡•±°¼)É•½Ù•Éä­•åÌìÁ…É•¹Ð½•áÁ½ÉÐ•‘¥ÑÌ…É”…¡”Á¥¹Ì½¹±ä¸5…¥¸äÌÀ½…”½5Õ±Ñ¤Ä¸À½™É½é•¸°)‰ÉÕÍ¡•Ì½¡¥ÍÑ½Éä½ÁÉ½©•Ð½•áÁ½ÉÐ…±½É¥Ñ¡µÌÕ¹¡…¹•¸ÑÕ…°AT½¥A…Í¡…‘½ÝÌ…¹)…ÁÁ•…É…¹”É•µ…¥¸Y%äÐà…Ñ”°¹½Ð•ÍÑ…‰±¥Í¡•‰ä9½‘”µ…Ñ•É¥…°½Ñ•áÑÕÉ”Ñ•ÍÑÌ¸()Y%äÐàèÁ…¥¹Ð„UXÕ‰”¥¸½±½ÕÈ½¹±ä°½¹—ŠIMÑÕ‘¥¼°½É‰¥Ð™½ÈÍ¡…‘•™…•Ìì…‘)…¹½Ñ¡•Èµ•Í …¹ÍÝ¥Ñ Í•±•Ñ¥½¸°Í¡…‘½ÝÌ½±¥¡Ñ¥¹œÉ•µ…¥¸½¸‰½Ñ ¸I•½Á•¸•á¥ÍÑ¥¹œ)Á…¥¹Ñ•€¹‰½á±…ˆì½µÁ…É”±¥Ð‘¥ÍÁ±…ä…¹Á…¥¹ÐÕ¹¡…¹•¸A…¥¹Ð¡…¹¹•°É•µ…¥¹Ì™±…Ðì)1¥ÐÁÉ•Ù¥•Ü½½¹”É•ÍÑ½É”Í•¹”Í¡…‘¥¹œ¸U¹‘½I•‘¼É•µ…¥¹Ì¥¸A…¥¹Ðì€¸äÐÜ±…å•È±¥ÍÐ)É•µ…¥¹Ì…•ÁÑ•¸9•áÐ¹…ÉÉ½ÜÝ½É¬™½±±½ÝÌäÐà‘•Ù¥”™••‘‰…¬ì­••À¥¹‘•Á•¹‘•¹Ð)…±Á¡„äÈä½É•™±•Ñ¥½¸…Ñ•Ì…¹•¹•É…°…Ñ±…ÌÕ¹ÝÉ…ÀÉ•ÅÕ•ÍÐÙ¥Í¥‰±”¸((´mátY%äÐÜÕÍ•ÈAMLèÙ¥ÍÕ…°±…å•ÈÍÑ…¬½Ñ¡Õµ‰¹…¥±Ì½Í•ÑÑ¥¹Ì½Ù¥Í¥‰¥±¥Ñä½¡¥ÍÑ½Éä½Á•ÉÍ¥ÍÑ•¹”…¹‘½¬ÍÉ½±±¥¹œÁÉ½Ñ•Ñ•¸(´ltY%äÐàè½±½ÕÈµ½¹±äÁ…¥¹Ð…™Ñ•È½¹”¥ÌÍ•¹”µ±¥Ð¥¸MÑÕ‘¥¼ì…Ñ¥Ù”½¥¹…Ñ¥Ù”½‰©•ÑÌ…ÍÐ½É••¥Ù”Í¡…‘½ÝÌ°M…Ù”½=Á•¸É•Ñ…¥¹Ì½±½ÕÈ°¡…¹¹•°•‘¥Ñ¥¹œ½U¹‘½I•‘¼½±…å•È±¥ÍÐÕ¹¡…¹•¸(((¸äÐà™¥¹…°±½…°9½‘”ÈÐ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÔÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( äÜ¸ÝÌ¤¸½ÕÈ¹•Ü¡•­ÌÁ±ÕÌ½É¥¥¹…°ÈÜÐØÉ•Ñ…¥¹•ìÑ…É•Ñ•Á…¥¹Ð½µ…Ñ•É¥…°½±…å•È¼)‘ÕÁ±¥…Ñ”½ÁÉ½©•Ð½É•±•…Í”ÔÁAML¸MÕÁ•ÉÍ•‘•Õ¹±¥Ð½Í¡…É¥¹œ•áÁ•Ñ…Ñ¥½¹Ì¥¸äÈÀ¼äÈÌ…¹(äÀÐ¼äÀäÝ•É”ÕÁ‘…Ñ•Ñ¼É•ÅÕ•ÍÑ•±¥Ð½ÁÉ¥Ù…Ñ”µÑ•áÑÕÉ”‰•¡…Ù¥½Èì•á…ÐÁ¥á•°°ÍÑ…±”)¡…¹¹•°°‘ÕÁ±¥…Ñ”¥Í½±…Ñ¥½¸…¹Á•ÉÍ¥ÍÑ•¹”…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸%¹¥Ñ¥…°•áÁ±½É…Ñ½Éä)™Õ±°ÉÕ¸¡¥ÐÑ¡½Í”½±•áÁ•Ñ…Ñ¥½¹ÌìÑ¡¥Ì%90½µÁ±•Ñ”ÉÕ¸±½Í•Ì…±°É•É•ÍÍ¥½¹Ì¸)I•Ù¥•Ý•±½…‘•È±½ÍÕÉ”äÐàìµ…¥¸äÌÀ½…”½5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸!½ÍÑ•É•É•ÍÍ¥½¸°)A…•Ì…¹Á½ÍÑ‘•Á±½åµ•¹Ð±¥Ù”µ™¥±”Ù•É¥™¥…Ñ¥½¸™½±±½Ü¸•Ù¥”äÐà±¥¡Ñ¥¹œÁ•¹‘¥¹œ¸(((ŒŒ€¸äÐàÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”„ÈÐÔÍ„ÙˆÅˆÄÉÐå„ÌÄÁ˜äåÈàÄÈÀäØÈÑ˜Ñ”ÐÁ„ØÅ€°•á…ÐÑ•ÍÑ•ÑÉ•”)€Ù˜äÌÝŒåŒÍŒÈÔàÀÉ™„ÔÝŒÑ„àÍˆÕ‰˜Ù˜ÐÈäÁˆÌÉ€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•)¥Ð…Ñ„ÕÁ±½…‘•ÈÈ•á…Ð‰±½‰Ì…¹É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°±½…°ÑÉ•”¸•Ñ¡•µ…¥¸)µ…Ñ¡•°±½…°‰É…¹ …±¥¹•±•…¹±ä¸1½…°9½‘”ÈÐ™Õ±°É•É•ÍÍ¥½¸…¹¡½ÍÑ•)9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌääÌÐäÌÄÐäÜ½©½ˆÄÈÀÌÔÈÀÌäÐÈà‰½Ñ Á…ÍÌ€¨¨ÈÜÔÀÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼(ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•€ ÈÐä¸åÌ¤¸A…•ÌÌääÌÐäÌÀÜÌÜ‰Õ¥±(ÄÈÀÌÔÈÀÐÈÀÔä½‘•Á±½äÄÈÀÌÔÈÈÌÔÈØÐÍÕ••‘•¸±°Ää¡•­•Á½ÍÑ‘•Á±½åµ•¹Ð™¥±•Ì(¡Í¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”¡…¹•ÉÕ¹Ñ¥µ”½1…ˆÉ…Á °É•½Ù•Éä°É•Ñ…¥¹•äÐÜ±…å•È±¥ÍÐ°)µ…¥¸äÌÀ½…”½5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„Üµ…É­•È¤‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸I•Ù¥•Ý•Á¥¹Ìì)¹¼ÁÉ½Ñ•Ñ•½™É½é•¸¡…¹•Ì¸Q¡¥ÌÁÉ½½˜ÕÁ‘…Ñ•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±ä…¹­••ÁÌ)Ñ•ÍÑ•½ÁÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”‰åÑ•ÌÕ¹¡…¹•¸UÍ•ÈäÐÝAML¥ÌÁÉ½Ñ•Ñ•°¹½Ð¥¹™•ÉÉ•äÐà¸()	Õ¥±äÐà½µÁ±•Ñ”…¹É•…‘ä™½È‘•Ù¥”Ñ•ÍÑ¥¹œè½±½ÕÈµ½¹±äÁ…¥¹Ñ•UXÕ‰”ƒŠH½¹”ƒŠH)Y%\MÑÕ‘¥¼°½É‰¥Ð™½ÈÍ¡…‘•™…•Ì…¹Í•¹”Í¡…‘½ÝÌ¸‘…¹½Ñ¡•Èµ•Í ½ÍÝ¥Ñ …Ñ¥Ù”)Í•±•Ñ¥½¸ìÁ…¥¹Ñ•¥¹…Ñ¥Ù”½‰©•ÑÌÉ•µ…¥¸Í•¹”µ±¥Ð¸I•½Á•¸•á¥ÍÑ¥¹œÁ…¥¹Ñ•¹‰½á±…ˆ°)½¹™¥É´…ÁÁ•…É…¹”…¹½É¥¥¹…°½±½ÕÈìÉ•½Á•¸A…¥¹Ð™½È¡…¹¹•°¡Õ¹±¥Ð¤½1¥Ð…¹É•Ñ…¥¹•(äÐÜ±…å•È±¥ÍÐ°U¹‘½I•‘¼½½¹Ñ¥¹Õ”Á…¥¹Ñ¥¹œ¸MÑ…¹‘…Éµ…Ñ•É¥…°½Í¡…‘½Ü¥¹¡•É¥Ñ…¹”…¹)•á…Ð‰åÑ•ÌÙ•É¥™¥•…ÕÑ½µ…Ñ¥…±±äìÉ•…°AT½¥A…Í¡…‘½Ü½…ÁÁ•…É…¹”…•ÁÑ…¹”Á•¹‘¥¹œ¸)=±‘•ÈÍµ½½Ñ µµ•Ñ…°É•™±•Ñ¥½¸…¹…±Á¡„äÈä…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ðì•¹•É…°…Ñ±…Ì)Õ¹ÝÉ…ÀÉ•µ…¥¹Ì™ÕÑÕÉ”Ý½É¬€¡A…¬…±°…ÉÉ…¹•Ì•á¥ÍÑ¥¹œ¥Í±…¹‘Ì¤¸9¼¹•Ü±¥¡Ð½‰ÉÕÍ ¼)¡¥ÍÑ½Éä½ÁÉ½©•Ð½•áÁ½ÉÐ½µ½‘•±±¥¹œ½Ý¹•È½ÈÍ½ÕÉ”Á¥á•°½Í¡•µ„¡…¹•Ì¸(((ŒŒ€¸äÐäƒŠP‰½Õ¹‘•…”…Ñ±…ÌUYÌì€¸äÐàÕÍ•ÈAMLƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈAIPAMLäÐàÁÉ½Ñ•ÑÌ½µµ¥ÑÑ•½±½ÕÈµ½¹±äÍ•¹”±¥¡Ñ¥¹œ½MÑÕ‘¥¼Í¡…‘½ÝÌ°)…Ñ¥Ù”½¥¹…Ñ¥Ù”…ÁÁ•…É…¹”°•á¥ÍÑ¥¹œÁ…¥¹Ð½±…å•ÉÌ½¡¥ÍÑ½Éä½Á•ÉÍ¥ÍÑ•¹”…¹¡…¹¹•°½1¥Ð¸)9•áÐ…Õ‘¥Ñ•‘•™•ÉÉ•…Ñ±…ÌÉ•ÅÕ•ÍÐ¸5…¥¸”Õ‰˜ÐÑˆÌ¡…Ì	½à½A±…¹…È½å±¥¹‘•È½MÁ¡•É”½Q½ÉÕÌ°)‘•¹Í¥Ñä•ÅÕ…±¥é…Ñ¥½¸…¹A…¬…±°°‰ÕÐ¹¼©½¥¹•µ¡…ÉÐ½•¹•É…°…Ñ±…ÌÍ½±Ù•È¸á…Ñ±…Ì)¥Ì½¹±ä…¸Õ¹ÕÍ•Á…Ñ¡ÑÉ…”‘•Á•¹‘•¹äUI0¸9¼¹•Ü•áÑ•É¹…°±¥‰É…Éä½­•É¹•°¥µÁ½ÉÑ•¸()=‰©•ÐƒŠHUXƒŠH…”…Ñ±…Ì¹½ÜÍÑ…•Ì=I%%90	½à‘¥É•Ñ¥½¹…°Á•Èµ™…”ÁÉ½©•Ñ¥½¸°)=I%%90‘•¹Í¥Ñå1…å½ÕÐÝ¥Ñ •áÁ±¥¥Ð½¹”µ¥Í±…¹µÁ•ÈµÁ½±å½¸µ•µ‰•ÉÍ¡¥À°Ñ¡•¸=I%%90)Á…­•‘1…å½ÕÐ¸=¹±ä™¥¹…°½É¹•ÉÌ½µµ¥ÐÑ¡É½Õ ½µµ¥Ñ9…Ñ¥Ù•UXè½¹”¹…Ñ¥Ù”¡•­Á½¥¹Ð°)É•…µ½¹±ä½±½Á••ÈÁ…å±½…‘Ì°¹¼Í½ÕÉ”•½µ•ÑÉä½™…”µÉ½ÕÀ¡…¹•Ì¸I•Á•…Ð¥Ì…¸•á…Ð)¹¼µ½À¸=É¥¥¹…°ÁÉ½©•Ñ¥½¹Ì½A…¬½‘•¹Í¥Ñäµ…Ñ …¹‘…ÕÑ½µ…Ñ¥Œ¡½¥•ÌÕ¹¡…¹•¸()Q¡¥Ì¥Ì„%IMP‰½Õ¹‘•™…”…Ñ±…ÌèÇŠLÄÈàÁ±…¹…ÈÁ½±å½¹Ì³Š&ÈÁ,½É¹•ÉÌ°½¹”¥Í±…¹Á•È)™…”°½µµ½¸…Ù•É…”Ý½É±µ…É•„‘•¹Í¥Ñä°•á¥ÍÑ¥¹œ€¸ÀÈÑ¥±”µ…É¥¹Ì½…ÁÌ½É¥Á…­¥¹œ¸)%ÐÕÑÌ•Ù•Éä™…”‰½Õ¹‘…Éäì¥Ð‘½•Ì9=P©½¥¸¡…ÉÑÌ°½ÁÑ¥µ¥é”Á…­¥¹œ°…ÕÑ¡½ÈÍ•…µÌ°)½È¥µÁ±•µ•¹Ðá…Ñ±…Ì½•¹•É…°ÕÉÙ•Õ¹ÝÉ…À¸½µ¥¹…¹ÐµÁ±…¹”ÁÉ½©•Ñ¥½¸É•Ñ…¥¹Ì¥ÑÌ)•á¥ÍÑ¥¹œ…¹Õ±…È‘¥ÍÑ½ÉÑ¥½¸ì•ÅÕ…°‘•¹Í¥Ñä™¥á•Ì…Ù•É…”…É•„°¹½Ð…¹±”‘¥ÍÑ½ÉÑ¥½¸¸)%¹Ù…±¥½¹½¹Á±…¹…È½‘••¹•É…Ñ”½½Ù•Èµ±¥µ¥Ð…¹¥µÁ½ÉÑ•½ÁÉ½•‘ÕÉ…°½µ½‘¥™¥•ÈÑ…É•ÑÌÉ•™ÕÍ”¸)Q¡¥ÌÍ½Á”¥ÌÙ¥Í¥‰±”‰•Í¥‘”Ñ¡”‰ÕÑÑ½¸°¹½Ð¡¥‘‘•¸‰•¡¥¹„•¹•É¥ŒU¹ÝÉ…À±…¥´¸()¹ä½±½ÕÈ½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌÁ…¥¹ÐÉ•™ÕÍ•Ì	=IÍÑ…¥¹œ½¡¥ÍÑ½ÉäìU$‘¥Í…‰±•Ì…”)…Ñ±…ÌÝ¥Ñ Á…¥¹ÐÁÉ•Í•¹Ð…¹Á½¥¹ÑÌÑ¼•áÁ±¥¥Ð•á¥ÍÑ¥¹œ±•…ÈÁ…¥¹Ð€¼±•…ÈÁ…¥¹Ð€¬)UYÌ¸9¼Í¥±•¹ÐÁ…¥¹Ð‘¥Í…É°É•Í…µÁ±¥¹œ½ÈÍÑ…±”µÉ•Í½ÕÉ”É•‰¥¹¸á¥ÍÑ¥¹œÍÑ…±”¹…Ñ¥Ù”)UYÌ…¸‰”É•Á±…•…™Ñ•È±•…É¥¹œÁ…¥¹Ð¸U¹‘¼É•ÍÑ½É•Ì½±UYÌìÁ…¥¹ÐÉ•Í•ÐÉ•µ…¥¹Ì„)Í•Á…É…Ñ”Õ¹‘½…‰±”ÕÍ•È…Ñ¥½¸¸9…Ñ¥Ù”½‘•Œ°½É¥¥¹…°A…¥¹Ð½1¥Ð½M…Ù•=Á•¸½9=4½1½Ý¹•ÉÌ)¡…¹‘±”Õ¹¡…¹•Ù•ÉÍ¥½¸ÄÍ½ÕÉ”é‰½á±…ˆ™…”µ½É¹•ÈÁ…å±½…¸9¼Í¡•µ„½ÝÉ¥Ñ•È½¡¥ÍÑ½Éä)½Èµ½‘•±±¥¹œ­•É¹•°…‘‘•ì¹¼…ÕÑ½µ…Ñ¥Œ…Ñ±…Ì½¸‘°¹¼¹•ÜUXÁ½¥¹Ñ•È½U$½Ý¹•È¸()M¥à¹•Ü¥¹Ñ•É…Ñ¥½¹Ì½Ù•È½¹…Ù”½Ñ¥±Ñ•½‘¥Í½¹¹•Ñ•½ÍÕ‰‘¥Ù¥‘•Á±…¹…È™…•Ì°)¹½¸µ½Ù•É±…ÁÁ¥¹œÍ•Á…É…Ñ”‰½Õ¹‘Ì½•ÅÕ…°…Ù•É…”‘•¹Í¥Ñä½•á…Ð•½µ•ÑÉä°ÄÈàµ™…”±¥µ¥Ð¼)Í…±”½É•™ÕÍ…±Ì°É•…°½É¥¥¹…°U¹‘½I•‘¼½¥‘•µÁ½Ñ•¹”½Á••È=\°•áÁ±¥¥ÐÁ…¥¹ÐÉ•™ÕÍ…°¼)±•…È½É•Á…¥¹Ð°½Ý¹•È½¡¥ÍÑ½Éä…Ñ½µ¥ŒÉ•™ÕÍ…°°•á…Ð¹…Ñ¥Ù”ÁÉ½©•Ð½9=4½1UYÌ…¹)…ÑÕ…°UXÁ…¹•°Ñ…É•Ð½½¹Ñ•áÐ…±±‰…¬¸9•Ü­	½à½A…¬½‘•¹Í¥Ñä½É•Í•Ð½É•±•…Í”ÌÁAMLì)¹¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¸¡…¹•¸Õ±°É•É•ÍÍ¥½¸½ÁÕ‰±¥…Ñ¥½¸™½±±½ÝÌì¥A…äÐäÁ•¹‘¥¹œ¸()MÕÉ™…”…Õ‘¥Ð™½Õ¹1…ˆÍ…µÁ±•Ìœ½±äÄÐUX¥µÁ½ÉÐ…‰Í•¹Ð™É½´Ñ¡”É•Ù¥•Ý•…¡”)µ…¹¥™•ÍÐ¸‘‘•Ñ¡…ÐI0‘•Á•¹‘•¹ä…¹É•™É•Í¡•¥ÑÌÍ…µÁ±•ÏŠI1…‹ŠI¥¹‘•à…¹•ÍÑ½ÉÌ°)…±½¹Í¥‘”½É¥¥¹…°5•Í¡!•…±Ñ ½‘½5Õ±Ñ¤UX¥µÁ½ÉÐÉ…Á äÐä…¹Í¡•±°½É•½Ù•Éä­•åÌ¸)=¹±äUXµ…ÁÁ•È€¬5•Í¡!•…±Ñ ™Õ¹Ñ¥½¹…±¥Ñä¡…¹•Ìì½Ñ¡•ÈÍ½ÕÉ”¡…¹•Ì…É”Á¥¹Ì¸)5…¥¸äÌÀ½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À½™É½é•¸¼äÐá±¥¡Ñ¥¹œ½Á…¥¹Ð½•áÁ½ÉÐ…±½É¥Ñ¡µÌÕ¹¡…¹•¸()Y%äÐäèÁ±…¥¸Õ‰”½ÈÍµ…±°Á±…¹…Èµ™…••áÑÉÕ‘•µ•Í ƒŠH=‰©•ÐƒŠHUXƒŠH…”…Ñ±…Ì+ŠH=Á•¸UX‘¥Ñ½ÈèÍ•Á…É…Ñ”™…”¥Í±…¹‘Ì¥¹Í¥‘”Ñ¥±”¸U¹‘½I•‘¼É•ÍÑ½É•Ì½É•…ÁÁ±¥•ÌUYÌì)A…¥¹Ð½½¹”É•Ñ…¥¹Ì…•ÁÑ•äÐà±¥ÐÍ•¹”¸á¥ÍÑ¥¹œÁ…¥¹Ðè•áÁ±¥¥Ñ±ä±•…ÈÁ…¥¹Ð™¥ÉÍÐ°)Ñ¡•¸…”…Ñ±…Ì½É•Á…¥¹Ð¸M…Ù•=Á•¸…¹½ÁÑ¥½¹…°9=5É•Ñ…¥¸¹•ÜUYÌ½Á…¥¹Ð¸ÄÈàÁ±…¹…È)™…•Ìµ…á¥µÕ´ì¹½¹Á±…¹…È™…•ÌÉ•ÅÕ¥É”½Ñ¡•ÈÁÉ½©•Ñ¥½¸½È™ÕÑÕÉ”¡…ÉÐÕ¹ÝÉ…À¸)9•áÐèäÐä‘•Ù¥”™••‘‰…¬°Ñ¡•¸Í½Á•…Ñ±…Ì½¡…ÉÐ¥µÁÉ½Ù•µ•¹ÑÌ½È‘”Í•…´…ÕÑ¡½É¥¹œ)…Õ‘¥Ð¸•¹•É…°©½¥¹•µ¡…ÉÐÕ¹ÝÉ…ÀÉ•µ…¥¹ÌÅÕ•Õ•ì¹¼…ÕÑ½µ…Ñ¥Œ­•É¹•°É•Á±…•µ•¹Ð¸((´mátY%äÐàÕÍ•ÈAIPAMLè½µµ¥ÑÑ•½±½ÕÈµ½¹±ä±¥¡Ñ¥¹œ½MÑÕ‘¥¼Í¡…‘½ÝÌ…¹ÁÉ¥½ÈÁ…¥¹Ð½¡¥ÍÑ½Éä½Á•ÉÍ¥ÍÑ•¹”ÁÉ½Ñ•Ñ•¸(´ltY%äÐäè…”…Ñ±…Ì½¸Íµ…±°Á±…¹…Èµ•Í °‘¥Ñ½È¥Í±…¹‘Ì°U¹‘½I•‘¼°•áÁ±¥¥Ð±•…È½É•Á…¥¹Ð°M…Ù•=Á•¸…¹É•Ñ…¥¹•äÐà±¥Ð…ÁÁ•…É…¹”¸(((¸äÐä™¥¹…°±½…°9½‘”ÈÐ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÔØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( ÄÀÄ¸ÝÌ¤°É•Ñ…¥¹¥¹œ•Ù•Éä½É¥¥¹…°ÈÜÔÀ¡•¬Á±ÕÌÍ¥à¹•Ü…”…Ñ±…Ì¥¹Ñ•É…Ñ¥½¹Ì¸)9•Ü­¹•…É‰ä	½à½A…¬½‘•¹Í¥Ñä½É•Í•Ð½É•±•…Í”ÌÁAML¸9¼•á¥ÍÑ¥¹œ‰•¡…Ù¥½È…ÍÍ•ÉÑ¥½¸¡…¹•)½ÈÉ•µ½Ù•¸I•Ù¥•Ý•UX½‘½5Õ±Ñ¤½1…ˆÉ•Ù•ÉÍ”Á¥¹ÌäÐä¥¹±Õ‘¥¹œ¹•Ý±äÉ•½É‘•1…ˆ)Í…µÁ±”¥µÁ½ÉÐìµ…¥¸äÌÀ½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À½™É½é•¸¼äÐá±¥¡Ñ¥¹œÕ¹¡…¹•¸!½ÍÑ•)É•É•ÍÍ¥½¸½A…•Ì½±¥Ù”ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌ¸Y%äÐäÉ•µ…¥¹ÌÁ•¹‘¥¹œ¸(((ŒŒ€¸äÐäÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÌÐÉ˜ÀÕˆÑ„ÍˆÈàÈÈÐØÝÀÈÕ‘ŒÄäÀÀÁ˜ÌÈàÄÐÌÐÐäÉ€°•á…ÐÑ•ÍÑ•ÑÉ•”)€ÔÝ™ÐÁ˜ÐÔÍŒÄÔÌØÍŒØÀÜØäÁ™…ˆÑŒÙ”ÈÙ‘”ÔÌá…ˆÅ€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•)¥Ð…Ñ„ÕÁ±½…‘•ÄÔ•á…Ð‰±½‰Ì½ÑÉ•”ì™•Ñ¡•µ…¥¸µ…Ñ¡•°±½…°‰É…¹ …±¥¹•)±•…¹±ä¸1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌääÌÜØÀÈÔÜÔ½©½ˆÄÈÀÌØÀàÜÈÄäÈ‰½Ñ )Á…ÍÌ€¨¨ÈÜÔØÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•( ÄÐÔ¸ÅÌ¤¸A…•ÌÌääÌÜØÀÄÌÔØ‰Õ¥±ÄÈÀÌØÀàÜÔÀÔÌ½‘•Á±½äÄÈÀÌØÄÀØàÄÈÈÍÕ••‘•¸±°ÈÀ)¡•­•Á½ÍÑ‘•Á±½åµ•¹ÐÍ¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”UX½‘½5Õ±Ñ¤½1…ˆÉ…Á °É•½Ù•Éä°)É•Ñ…¥¹•UXÝ½É­ÍÁ…”½¥¹ÍÁ•Ñ½È¼äÐà±¥Ð½Ý¹•ÉÌ½µ…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À¼äÐÜ±…å•È)±¥ÍÐ½™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸9¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹ÌÉ•µ½Ù•½È)¡…¹•¸Q¡¥ÌÁÉ½½˜ÕÁ‘…Ñ•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±ä°É•Ñ…¥¹¥¹œÑ•ÍÑ•ÉÕ¹Ñ¥µ”¸()	Õ¥±äÐä½µÁ±•Ñ”…¹É•…‘ä™½È‘•Ù¥”Ñ•ÍÑ¥¹œèÁ±…¥¸Õ‰”½ÈÍµ…±°Á±…¹…Èµ™…•)•áÑÉÕ‘•µ•Í ƒŠH=‰©•ÐƒŠHUXƒŠH…”…Ñ±…ÌƒŠH=Á•¸UX‘¥Ñ½È¸M•Á…É…Ñ”™…”¥Í±…¹‘Ì°)U¹‘½I•‘¼°A…¥¹Ð½½¹”É•Ñ…¥¹Ì…•ÁÑ•äÐà±¥¡Ñ¥¹œ°M…Ù•=Á•¸…¹½ÁÑ¥½¹…°9=5¸)á¥ÍÑ¥¹œÁ…¥¹ÐµÕÍÐ‰”•áÁ±¥¥Ñ±ä±•…É•™¥ÉÍÐì…Ñ¥½¸¹•Ù•È‘¥Í…É‘Ì¥Ð¸…”…Ñ±…Ì)¥Ì½¹”¥Í±…¹Á•ÈÁ±…¹…È™…”°ÕÀÑ¼ÄÈà™…•Ì¼ÈÁ,½É¹•ÉÌì¥Ð¥Ì¹½Ð©½¥¹•µ¡…ÉÐ½È)•¹•É…°ÕÉÙ•Õ¹ÝÉ…À¸á¥ÍÑ¥¹œ	½à½A±…¹…È½å±¥¹‘•È½MÁ¡•É”½Q½ÉÕÌ½A…¬½…ÕÑ¼µ‘É•Ñ…¥¸)½É¥¥¹…°…±½É¥Ñ¡µÌ¸Y%äÐäÁ•¹‘¥¹œìÕÍ•ÈäÐàAIPAMLÁÉ½Ñ•Ñ•¸9•áÐ…ÑÕ…°(äÐä™••‘‰…¬°Ñ¡•¸Í½Á•…Ñ±…Ì½¡…ÉÐ½Í•…´‘¥É•Ñ¥½¸¸±Á¡„äÈä½É•™±•Ñ¥½¸¥¹‘•Á•¹‘•¹Ð¸(((ŒŒ€¸äÔÀƒŠP…”…Ñ±…ÌÝ…ÉÁ•µ™…”É•Á…¥Èì€¸äÐä‘•Ù¥”%0ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈäÐäÉ•Á½ÉÑÌÑ¡”ÅÕ…±¥é”µ‘•¹Í¥ÑäÁ±…¹…È½¹½¸µ‘••¹•É…Ñ”•ÉÉ½È…™Ñ•È½É‘¥¹…Éä)•áÑÉÕÍ¥½¹Ì½Í…±•Ì¸MÉ••¹Í¡½Ð½¹™¥ÉµÌäÐä…¹ÈÑÙ•ÉÑÌ¼ÈÁ™…•Ì°™…È‰•±½ÜÄÈàµ™…”…À¸)á…ÐÍÕÁÁ±¥•áÑÉÕ‘”…¹Í…±”¹½‰¨É•ÁÉ½‘Õ•ÌÉ•©•Ñ¥½¸è™¥ÉÍÐ™½ÕÈÁ½±å½¹Ì…É”)µ¥±‘±äÝ…ÉÁ•€¡Á½¥¹ÐµÑ¼µÁ±…¹”‘•Ù¥…Ñ¥½¹ÏŠ& ¸ÀÄÃŠL¸ÀÄÌ±½…°Õ¹¥ÑÌ¤¸Q¡¥Ì¥ÌäÐäÌ…Ñ±…Ì)Á±…¹…É¥ÑäÉ•ÍÑÉ¥Ñ¥½¸°¹½Ð•Ù¥‘•¹”½˜‘…µ…•µ½‘•±±¥¹œÑ½Á½±½ä½È„ÍÑ…±”‰Õ¥±¸)=	(•áÁ½ÉÑ•È¡•…‘•ÈàäÈ¥ÌÑ¡”É•Ñ…¥¹•¥¹Ñ•É¹…°ÝÉ¥Ñ•ÈÍÑ…µÀ°¹½ÐÍ¡•±°É•±•…Í”¸)á…Ð¥¹ÁÕÐÉ•Ñ…¥¹•…ÌÑ•ÍÑÌ½™¥áÑÕÉ•Ì½•áÑÉÕ‘”µ…¹µÍ…±”´äÔÀ¹½‰¨ìM!ÈÔØ(ÀÜÄÜáÔÅ…ˆÔØÄÌäÉ™„ÔÀàØÈÑÀààÐØÁ˜ÌÍˆÅ‘„ÔÝ•àÜØÄÝ•‘”ÐÄÌáŒÀäÈÜÉˆÐÙ°¥‘•¹Ñ¥…°Ñ¼ÕÁ±½…¸()=É¥¥¹…°…”…Ñ±…Ì™¥ÉÍÐÑÉ¥•ÌaPäÐäÁ±…¹…ÈÁ…Ñ ¸=¹±ä¥ÑÌÁ±…¹…È½…É•„É•™ÕÍ…°)É•ÅÕ•ÍÑÌÑ¡”=I%%90‰Õ¥±‘UYAÉ•Ù¥•Ý•½µ•ÑÉä¡í™…•%¹‘¥•ÌéÑÉÕ•ô¤½Ý¹•È°™½ÉÝ…É‘•)•áÁ±¥¥Ñ±ä‰ä5•Í¡!•…±Ñ UX…±±‰…¬¸=É¥¥¹…°ÑÉ¥…¹±—ŠI™…”½Ù•ÉÑ•àµ•Ñ…‘…Ñ„‰•½µ•Ì)ÑÉ…¹Í¥•¹Ð±½…°µ½É¹•È±¥ÍÑÌì¹¼ÑÉ¥…¹Õ±…Ñ½È°¹•Ü…‘©…•¹ä½Èµ•Í µÕÑ…Ñ¥½¸¸I•ÅÕ¥É”)½µÁ±•Ñ”»Š"HÈÑÉ¥…¹±•ÌÁ•ÈÁ½±å½¸°Ù…±¥Õ¹¥ÅÕ”½É¹•È½Ý¹•ÉÍ¡¥À°™¥¹¥Ñ”¹½¹é•É¼UX)ÑÉ¥…¹±”…É•…Ì…¹½¹Í¥ÍÑ•¹ÐÁ•Èµ™…”UX½É¥•¹Ñ…Ñ¥½¸¸½±‘•½½±±…ÁÍ•…¹‘¥‘…Ñ•Ì)É•™ÕÍ”Ý¥Ñ ™…”¹Õµ‰•Èì…‰Í•¹Ð½™…¥±•ÁÉ•Ù¥•ÜÉ•™ÕÍ•Ì¸Q•µÁ½É…Éä•½µ•ÑÉä‘¥ÍÁ½Í•Ì)¥¸™¥¹…±±ä½¸ÍÕ•ÍÌ½•ÉÉ½È¸M…µ”½É¥¥¹…°‘•¹Í¥Ñäµ…Ñ ½ÁÑ¥½¹…±±äÍÕµÌµ•…ÍÕÉ•)¹½Éµ…±¥é•€ÍÑÉ¥…¹±”…É•…ÌìÍÑ…¹‘…±½¹”ÅÕ…±¥é”‘•¹Í¥ÑäIQ%9LÍÑÉ¥ÐÁ±…¹…ÈÉÕ±”¸)=É¥¥¹…°Á±…¹…È½ÕÑÁÕÑÌ½•áÑÉ•µ”Í…±•ÌÉ•µ…¥¸•á…Ðì¹¼‰±…¹­•ÐÑ½±•É…¹”É•±…á…Ñ¥½¸¸()¥¹…°…Ñ±…ÌÍÑ¥±°ÕÍ•Ì½É¥¥¹…°A…¬½½µµ¥Ð°½¹”¥Í±…¹Á•ÈÍ½ÕÉ”™…”…¹½¹”Í•¹”)¡•­Á½¥¹ÐìÍ½ÕÉ”ÅÕ…‘Ì½¹½¹Ì½Á½Í¥Ñ¥½¹Ì½É½ÕÁÌ…¹½±½Á••ÈÉ•Í½ÕÉ•ÌÉ•µ…¥¸¥¹Ñ…Ð¸)9¼Á•Éµ…¹•¹ÐÑÉ¥…¹Õ±…Ñ¥½¸½ÈÍ¡•µ„½•áÁ½ÉÐ½¡¥ÍÑ½Éä½‰ÉÕÍ ½±¥¡Ñ¥¹œ¡…¹•Ì¸=É¥¥¹…°(ÄÈá™…•Ì¼ÈÁ-½É¹•È½Á½½°½¡¥ÍÑ½Éä½±•…ÈµÁ…¥¹ÐÕ…É‘ÌÉ•Ñ…¥¹•¸U$¹¼±½¹•È…±±Ì…Ñ±…Ì)Á±…¹…Èµ½¹±äìÍ…åÌÕÉÙ•™…•Ìµ…äÍÑÉ•Ñ ¸Q¡¥Ì¥ÌÍÑ¥±°ÁÉ½©•Ñ•Á•Èµ™…”…Ñ±…Ì°)¹½Ð©½¥¹•µ¡…ÉÐ½•¹•É…°UX½ÁÑ¥µ¥é…Ñ¥½¸½È„Õ…É…¹Ñ•”•Ù•Éä™½±‘•™…”µ…ÁÌ¸()¥Ù”¹•Ü¥¹Ñ•É…Ñ¥½¹Ì•á•É¥Í”•á…ÐÕÍ•È™¥±”Ý¥Ñ ÈÀÍ•Á…É…Ñ••ÅÕ…°µ‘•¹Í¥Ñä¥Í±…¹‘Ì°)Õ¹¡…¹•ÈÐÙ•ÉÑ¥•Ì¼ÄÑÅÕ…‘Ì¼Ù¹½¹Ì°Ñ•µÁ½É…Éä‘¥ÍÁ½Í…°…¹•á…ÐÉ•Á•…Ðì½É‘¥¹…Éä)•áÑÉÕÍ¥½¸­…á¥ÌµÍ…±”É•ÁÉ½‘Õ•È…Ð€¸ÀÄ¼Ä¼ÄÀÀÀÀì½É¥¥¹…°U¹‘½I•‘¼½A…¥¹Ð½•á…ÐM…Ù•=Á•¸¼)…ÑÕ…°9=4…¹1UX­Á…¥¹ÐÍ±½ÑÌìÕ¹…Ù…¥±…‰±”½µ…±™½Éµ•½™½±‘•ÁÉ•Ù¥•Ü½É•™ÕÍ•¡¥ÍÑ½Éä¼)Á…¥¹Ð…Ñ½µ¥¥Ñäì…ÑÕ…°Á…¹•°™½ÉÝ…É‘¥¹œ½Ñ…É•ÐÕ…É‘Ì¸=É¥¥¹…°äÐä¹•…Ñ¥Ù”Õ¹…Ù…¥±…‰±”)Ý…ÉÁ•µÁÉ•Ù¥•ÜÑ•ÍÐÉ•Ñ…¥¹•ì¥ÑÌU$Ý½É‘¥¹œ•áÁ•Ñ…Ñ¥½¸™½±±½ÝÌ¥¹Ñ•¹‘•Í½Á”¡…¹”¸)=É¥¥¹…°àäÔÍÑ…¹‘…±½¹”¹½¹Á±…¹…ÈÉ•™ÕÍ…°ÍÑ…åÌ…Ñ¥Ù”¸½ÕÍ•¹•Ü¼äÐä½‘•¹Í¥Ñä½A…¬¼)É•±•…Í”ÈÙAMLì™Õ±°Ù…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸™½±±½ÝÌ¸9…Ñ¥Ù”Ñ•ÍÐÁÉ•Á…É•ÌÑ¡É½Õ QU0)ÝÉ¥Ñ•ÈÌÙ•ÉÍ¥½¹•Á…¥¹Ðµ•áÁ½ÉÐ½Ý¹•È€¡µ½‘Õ±”µ±½…°]•…­5…ÁÌ¤ì…¹½¹¥…°)M=8¡…¹‘±•Ì)É½ÍÌµÉ•…±´UXÁÉ½Ñ½ÑåÁ•ÌÝ¥Ñ¡½ÕÐÝ•…­•¹¥¹œ•á…ÐÙ…±Õ•Ì¸	¥Ñµ…ÀÍ¡¥´¥ÌÑÉ…¹ÍÁ½ÉÐ)½¹±ä°¹½ÐAT½9½µ…Ù¥ÍÕ…°ÁÉ½½˜¸5…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸()Y%äÔÀèM5ÍÕÁÁ±¥•µ½‘•°ƒŠH=‰©•ÐƒŠHUXƒŠH…”…Ñ±…ÌƒŠH=Á•¸UX‘¥Ñ½ÈÍ¡½Õ±)µ…À…±°ÈÀ™…•Ì¸U¹‘½I•‘¼É•ÍÑ½É•Ì½É•…ÁÁ±¥•Ì½É¥¥¹…°ÅÕ…‘Ì½UYÌìA…¥¹Ð½½¹”É•µ…¥¹Ì)Í•¹”µ±¥ÐìM…Ù•=Á•¸…¹½ÁÑ¥½¹…°9=5Í…¹¥Ñä¸±•…È•á¥ÍÑ¥¹œÁ…¥¹Ð•áÁ±¥¥Ñ±ä™¥ÉÍÐ¸)á…ÐÕÁ±½…‘•µ•Í ¹½Üµ…ÁÌ¥¸…ÕÑ½µ…Ñ•É•…°µ½Ý¹•ÈÁ…Ñ ì…ÑÕ…°¥A…äÔÀ…Ñ”Á•¹‘¥¹œ°)¹½Ð¥¹™•ÉÉ•AML¸äÐàÍ•¹”µ±¥¡Ñ¥¹œ…•ÁÑ…¹”É•µ…¥¹ÌÁÉ½Ñ•Ñ•ìäÐäÝ…ÉÁ•™…¥±ÕÉ”)É•½É‘•¸9•áÐ…ÑÕ…°äÔÀÉ•Ñ•ÍÐì‘½¸Ð…Í¬ÕÍ•ÈÑ¼Á•Éµ…¹•¹Ñ±äÑÉ¥…¹Õ±…Ñ”„Ù…±¥‰½à)µ½‘•°…Ì„Ý½É­…É½Õ¹½È…‘„Í•½¹µ½‘•±±¥¹œ½UX­•É¹•°¸=Ñ¡•È¡…ÉÐ½Í•…´Ý½É¬ÅÕ•Õ•¸((´mátY%äÔÀèÕÍ•ÈAML€½¹•áÑ‰Õ¥±ÁÉ½Ñ•ÑÌÍÕÁÁ±¥••áÑÉÕÍ¥½¸½Í…±”…Ñ±…ÌÉ•Á…¥È¸äÐä½É¥¥¹…°™…¥±ÕÉ”É•Ñ…¥¹•ì½ÁÑ¥½¹…°¹…Ñ¥Ù”µ•áÁ½ÉÐ¡•­Ì…É”¹½ÐÍ•Á…É…Ñ•±ä¥¹™•ÉÉ•¸(((¸äÔÀ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜØÄAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( ÄÀÄ¸åÌ¤°É•Ñ…¥¹¥¹œ½É¥¥¹…°ÈÜÔØÁ±ÕÌ™¥Ù”¹•Ü•á…Ðµ™¥±”½Ý…ÉÁ•µ™…”¥¹Ñ•É…Ñ¥½¹Ì¸)½ÕÍ•¹•Ü¼äÐä½‘•¹Í¥Ñä½A…¬½É•±•…Í”ÈÙAML¸=±äÐäÕ¹…Ù…¥±…‰±”µÁÉ•Ù¥•Ü½‘••¹•É…ä)É•™ÕÍ…±ÌÉ•µ…¥¸ì¥ÑÌU$Ñ•áÐ•áÁ•Ñ…Ñ¥½¸É•™±•ÑÌ¹•ÜÍ½Á”¸MÑ…¹‘…±½¹”‘•¹Í¥ÑäàäÔ)Á±…¹…É¥Ñä½¹ÑÉ…ÐÕ¹¡…¹•¸MÕÁÁ±¥•=	(™¥áÑÕÉ”‰åÑ”µ¥‘•¹Ñ¥…°ì¹¼Í½ÕÉ”ÕÁ±½…)µ½‘¥™¥•¸I•Ù¥•Ý•™Õ±°UX½‘½5Õ±Ñ¤½1…ˆ½É•½Ù•ÉääÔÀÉ…Á °µ…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´¼)™É½é•¸½…•ÁÑ•äÐá±¥¡Ñ¥¹œÕ¹¡…¹•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½ÝÌì‘•Ù¥”äÔÀ)M5µµ½‘•°…Ñ±…Ì½Á…¥¹Ð½U¹‘½I•‘¼½M…Ù•=Á•¸…•ÁÑ…¹”Á•¹‘¥¹œ°¹¼äÐäAML¥¹™•ÉÉ•¸(((ŒŒ€¸äÔÀÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”‘…ŒÁ™ŒØÔÔÜÈÝ„ØàØäÍ…„ÜØÅàÝ•‘”ÐÈÕ”ÄÉ…‰ÀÁ€°•á…ÐÑ•ÍÑ•ÑÉ•”)€ÐÄÜÁŒÜàÜäÐÜÔÕŒÍ˜ØÀÐÄÝˆÐÀÄÉÉ˜äÍÑ…”ØÕ•‘…€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•)¥Ð…Ñ„ÕÁ±½…‘•ÄÜ•á…Ð‰±½‰Ì½ÑÉ•”ì™•Ñ¡•µ…¥¸µ…Ñ¡•…¹±½…°‰É…¹ …±¥¹•)±•…¹±ä¸1½…°9½‘”ÈÐ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌääÐÈÜÔäØÔØ½©½ˆÄÈÀÌÜÜäÔØäàä‰½Ñ )Á…ÍÌ€¨¨ÈÜØÄÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•( ÈÐÜ¸ÉÌ¤¸A…•ÌÌääÐÈÜÔäÐÔØ‰Õ¥±ÄÈÀÌÜÜäØÄÄÀÈ½‘•Á±½äÄÈÀÌÜàÄÔàààÔÍÕ••‘•¸±°ÈÀ)¡•­•Á½ÍÑ‘•Á±½åµ•¹ÐÍ¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”UX½‘½5Õ±Ñ¤½1…ˆÉ…Á °É•½Ù•Éä°)É•Ñ…¥¹•UXÝ½É­ÍÁ…”½¥¹ÍÁ•Ñ½È¼äÐà±¥Ð½Ý¹•ÉÌ½µ…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À¼äÐÜ±…å•È)±¥ÍÐ½™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸=É¥¥¹…°àäÔÁ±…¹…Èµ‘•¹Í¥ÑäÕ…É)É•Ñ…¥¹•ìäÐäU$Ý½É‘¥¹œÕÁ‘…Ñ•™½È¥¹Ñ•¹‘•Ý…ÉÁ•µ™…”ÍÕÁÁ½ÉÐ¸Q¡¥ÌÁÉ½½˜¡…¹•Ì)™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±ä°É•Ñ…¥¹¥¹œÑ•ÍÑ•ÉÕ¹Ñ¥µ”¸=É¥¥¹…°ÍÕÁÁ±¥•=	(Õ¹¡…¹•¸()	Õ¥±äÔÀ½µÁ±•Ñ”…¹É•…‘äèM5•áÑÉÕÍ¥½¸½Í…±”µ•Í ƒŠH=‰©•ÐƒŠHUXƒŠH…”…Ñ±…ÌƒŠH)=Á•¸UX‘¥Ñ½ÈÍ¡½Õ±µ…À…±°ÈÀ™…•Ì¸=É¥¥¹…°ÅÕ…‘Ì½¹½¹ÌÉ•µ…¥¸ìU¹‘½I•‘¼É•ÍÑ½É•Ì)UYÌ°Á…¥¹Ð½½¹”É•Ñ…¥¹ÌäÐà±¥¡Ñ¥¹œ°M…Ù•=Á•¸…¹½ÁÑ¥½¹…°9=5Í…¹¥Ñä¸á…ÐÍÕÁÁ±¥•)™¥±”¹½ÜÁ…ÍÍ•ÌÉ•…°µ½Ý¹•È…Ñ±…Ì½Á…¥¹Ð½¡¥ÍÑ½Éä½ÑÉ…¹ÍÁ½ÉÐ¥¹Ñ•É…Ñ¥½¹Ì°‰ÕÐ¥A…äÔÀ)…ÁÁ•…É…¹”½Á•É™½Éµ…¹”…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ¸±•…È•á¥ÍÑ¥¹œÁ…¥¹Ð•áÁ±¥¥Ñ±ä)™¥ÉÍÐ¸M½ÕÉ”äÐä™…¥±ÕÉ”É•½É‘•°¹½Ð…•ÁÑ•…ÌAMLìÕÍ•ÈäÐàAIPAMLÁÉ½Ñ•Ñ•¸)9•áÐ…ÑÕ…°äÔÀ™••‘‰…¬‰•™½É”Õ¹É•±…Ñ•™•…ÑÕÉ•Ìì¹¼Á•Éµ…¹•¹ÐÑÉ¥…¹Õ±…Ñ¥½¸Ý½É­…É½Õ¹¸(((ŒŒ€¸äÔÄƒŠP=ÁÑ¥½¹…°½Á±…¹…È…Ñ±…Ìì€¸äÔÀÕÍ•ÈAMLÁÉ½Ñ•Ñ•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á±¥•ÌAML€½¹•áÑ‰Õ¥±…™Ñ•ÈäÔÀèÁÉ½Ñ•ÐÑ¡”ÍÕÁÁ±¥••áÑÉÕÍ¥½¸½Í…±”…”…Ñ±…Ì)É•Á…¥È…¹•á¥ÍÑ¥¹œäÐà±¥ÐµÁ…¥¹Ð…•ÁÑ…¹”¸äÐä½É¥¥¹…°Ý…ÉÁ•™…¥±ÕÉ”ÍÑ…åÌÉ•½É‘•¸)Õ‘¥Ðè•á¥ÍÑ¥¹œ	½àÁÉ½©•Ñ¥½¸…±É•…‘ä¥Ù•Ìµ…Ñ¡¥¹œUYÌ½¸…‘©…•¹ÐÍ…µ”µ‘¥É•Ñ¥½¸)™…•Ìì½É¥¥¹…°¥µÁ½ÉÑ•µÕØµ¥¹ÍÁ•Ñ¥½¸½Ý¹Ìµ…¹¥™½±…‘©…•¹ä½Õ¹¥½¸ì‘•¹Í¥Ñä½A…¬…¹)¹…Ñ¥Ù”UX½µµ¥Ð½¡¥ÍÑ½Éä…±É•…‘ä•á¥ÍÐ¸9¼½Ñ¡•È±¥Ù”¡…ÉÐµ©½¥¹¥¹œ…Ñ±…Ì™½Õ¹ìÑ¡”)Á…Ñ¡ÑÉ…•Èá…Ñ±…Ì‘•Á•¹‘•¹ä¥ÌÕ¹É•±…Ñ•¸‘½ÁÑ¥½¹…°=‰©•ÐƒŠHUXƒŠH½Á±…¹…È…Ñ±…Ì¸()	½Ñ µ½‘•ÌÍ¡…É”½É¥¥¹…°ÁÉ¥Ù…Ñ”	½àƒŠH‘•¹Í¥ÑäƒŠHÉ¥A…¬ƒŠH=9½µµ¥ÐÁ¥Á•±¥¹”¸)…”…Ñ±…ÌÉ•Ñ…¥¹Ì½¹”¥Í±…¹Á•È™…”…¹•á…ÐäÔÀ½ÕÑÁÕÑÌ¸½Á±…¹…Èµ½‘”ÕÍ•Ì™¥á•)Í••Á±…¹•Ì€¡¹½Éµ…±¥é•™¥¹¥Ñ”½½É‘¥¹…Ñ•Ì°½É¥•¹Ñ•¹½Éµ…°½Á±…¹…É¥ÑäÑ½±•É…¹”Å”´ÄÀ°)¹¼…ÕµÕ±…Ñ•¹•¥¡‰½ÕÈ‘É¥™Ð¤°±•…Ù¥¹œÝ…ÉÁ•™…•Ì¥Í½±…Ñ•¸=É¥¥¹…°¥¹ÍÁ•Ñ½È)•ÑÌ½ÁÐµ¥¸…¹)½¥¹…•ÌÁÉ•‘¥…Ñ”ì‘•™…Õ±Ð‰•¡…Ù¥½ÈÕ¹¡…¹•¸)½¥¸½¹±ä½ÁÁ½Í¥Ñ”)Í¡…É••‘”‘¥É•Ñ¥½¹Ì°µ…Ñ¡¥¹œ	½àUX•¹‘Á½¥¹ÑÌ°Í…µ”Í••Á±…¹”…¹•á…Ñ±äÑÝ¼)µ…¹¥™½±½Ý¹•ÉÌ¸¥Í½¹¹•Ñ•½½¥¹¥‘•¹ÐÙ•ÉÑ•àÁ½Í¥Ñ¥½¹Ì…¹…µ‰¥Õ½ÕÌ•‘•Ì¹•Ù•È)©½¥¸¸9¼µ•Í •‘¥ÑÌ°¹•ÜÑÉ¥…¹Õ±…Ñ½È½…‘©…•¹ä­•É¹•°°Á•ÉÍ¥ÍÑ•¹Ð¡…ÉÐµ•Ñ…‘…Ñ„½È)UXÍ¡•µ„¸=É¥¥¹…°äÔÀÁÉ•Ù¥•Ü™…±±‰…¬¡…¹‘±•ÌÝ…ÉÁ•…É•„ìÍÑ…¹‘…±½¹”‘•¹Í¥ÑäàäÔ)ÍÑ¥±°Á±…¹…È¸ÄÈàµ™…”¼ÈÁ,µ½É¹•È±¥µ¥Ð…¹•áÁ±¥¥Ð±•…Èµ…±°µÁ…¥¹ÐÁÉ•É•ÅÕ¥Í¥Ñ”ÍÑ…ä¸)Q¡¥Ì¥Ì½¹Í•ÉÙ…Ñ¥Ù”½Á±…¹…ÈÉ½ÕÁ¥¹œ°¹½Ð…É‰¥ÑÉ…ÉäÕ¹ÝÉ…À½È½ÁÑ¥µ…°Á…­¥¹œì)¥¹Ù…±¥Í•±˜µ½Ù•É±…ÁÁ¥¹œ•½µ•ÑÉä…¹•¹•É…°ÕÉÙ•ÍÑÉ•Ñ …É”¹½ÐÍ½±Ù•¸()M¥à¹•ÜÑ•ÍÑÌäÔÄ½Ù•È½¹¹•Ñ•Á…Ñ ½Í•…´•¹‘Á½¥¹ÑÌ½¥Í±…¹•‘¥Ñ¥¹œì‰•¹‘Ì½Ý…ÉÁÌ¼)Í…µ”µÝ¥¹‘¥¹œ‘ÕÁ±¥…Ñ•Ì½½ÁÁ½Í¥Ñ”™…•Ì½‘¥Í½¹¹•Ñ•Á½Í¥Ñ¥½¹Ì½¹½¹µ…¹¥™½±‰½Õ¹‘…É¥•Ìì)•á…ÐÍÕÁÁ±¥•ÈÀµ™…”=	(€ ÄÐ¥Í±…¹‘ÌÙ•ÉÍÕÌ…”…Ñ±…ÌÈÀ¤°Í…±”½ÑÉ…¹Í±…Ñ¥½¸…¹•ÅÕ…°…Ù•É…”¥Í±…¹‘•¹Í¥Ñä½Í•Á…É…Ñ”)Á…­•‰½Õ¹‘ÌìÕ…É‘Ì½É•™ÕÍ•¡¥ÍÑ½Éäì…ÑÕ…°U¹‘½I•‘¼½Á…¥¹Ð½ÁÉ½©•Ð½1½Ý¹•ÈÁ…Ñ ì)…ÑÕ…°Á…¹•°™½ÉÝ…É‘¥¹œ½ÕÉÉ•¹ÐµÑ…É•Ð½¡¥ÍÑ½ÉäÕ…É‘Ì¸½ÕÍ•¹•Ü¼äÐä¼äÔÀ½‘•¹Í¥Ñä¼)A…¬½É•±•…Í”ÌÉAML¸Õ±°±½…°½¡½ÍÑ•…¹ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½ÝÌ‰•±½Ü¸()I•Ù¥•Ý•…¡”±½ÍÕÉ”É•™É•Í¡•ÌUX¥¹ÍÁ•Ñ½È½•‘¥Ð½Á…¹•°°UXÝ½É­ÍÁ…”°Á…¥¹Ð¥µÁ½ÉÐ)…¹•ÍÑ½ÉÌ…¹UX½‘½5Õ±Ñ¤½1…ˆ±½…‘•ÉÌì™Õ¹Ñ¥½¹…°¡…¹•Ì=91d¥¹ÍÁ•Ñ½È½ÁÐµ¥¸°)…Ñ±…Ì½Ý¹•È…¹•á¥ÍÑ¥¹œÁ…¹•°¸5…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸)•Ù¥”äÔÄÉ•µ…¥¹ÌÁ•¹‘¥¹œèÍ…µ”Õ¹Á…¥¹Ñ•ÍÕÁÁ±¥•µ•Í ƒŠH½Á±…¹…È…Ñ±…ÌƒŠHUX‘¥Ñ½Èì)½µÁ…É”…”…Ñ±…ÌÌÈÀ¥Í±…¹‘ÌìU¹‘½I•‘¼°Á…¥¹Ð…É½ÍÌ„™±…ÐÁ…Ñ …¹M…Ù•=Á•¸¸)9•áÐ…Ð½¸äÔÄ™••‘‰…¬ì…±Á¡„äÈä½µ•Ñ…°µÉ•™±•Ñ¥½¸…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ð¸¼¹½Ð)¥¹™•È•¹•É…°ÕÉÙ•Õ¹ÝÉ…À°…É‰¥ÑÉ…Éä½Ù•É±…ÀÉ•Á…¥È½È½ÁÑ¥½¹…°9=5‘•Ù¥”AML¸((´mátUMHäÔÀAMLèÝ…ÉÁ•µ™…”…Ñ±…ÌÉ•Á…¥È…•ÁÑ•ìÁÉ½Ñ•Ð•á…ÐÍÕÁÁ±¥•™¥áÑÕÉ”…¹½É¥¥¹…°äÔÀ‰•¡…Ù¥½È¸(´mátY%äÔÄ…Ñ±…ÌèÕÍ•ÈäÔÄAMLÉ•½É‘•½ÁÉ½Ñ•Ñ•¸M•Á…É…Ñ”¥¹Ñ•Éµ¥ÑÑ•¹Ð¥A…‘AÉ¼UXµ•‘¥Ñ½È½µ…¥¸µÑ½½±‰…È±½ÍÌÉ•µ…¥¹Ì½Á•¸ì¹¼™Õ±°U$µ±½ÍÌAML¥¹™•ÉÉ•¸(((¸äÔÄ™Õ±°±½…°9½‘”ÈÐÉ•É•ÍÍ¥½¸è€¨¨ÈÜØÜAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨€ ää¸ÁÌ¤°)É•Ñ…¥¹¥¹œ…±°ÈÜØÄÁ±ÕÌÍ¥à½Á±…¹…È¥¹Ñ•É…Ñ¥½¹Ì¸½ÕÍ•ÌÉAML¸I•Ù¥•Ý•Ääµ™¥±”)ÉÕ¹Ñ¥µ”±½…‘•È±½ÍÕÉ”°Ñ¡É•”™Õ¹Ñ¥½¹…°½Ý¹•ÉÌ½¹±äìÉ•Ñ…¥¹•µ…¥¸½…”½5Õ±Ñ¤Ä¸À¼)™É½é•¸‰åÑ•Ì…¹É•½Ù•Éä½Ý¹•ÉÌÕ¹¡…¹•¸M½ÕÉ”äÐä¼äÔÀ…”…Ñ±…Ì½ÕÑÁÕÑÌ…¹)ÍÑ…¹‘…±½¹”àäÔ‘•¹Í¥ÑäÕ…É‘ÌÍÑ…äÁÉ½Ñ•Ñ•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½ÝÌì)Y%äÔÄ½µÁ…É¥Í½¸½Á…¥¹Ð½U¹‘½I•‘¼½M…Ù•=Á•¸É•µ…¥¹ÌÁ•¹‘¥¹œ¸(((ŒŒ€¸äÔÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”€ØÍ˜ÑŒØäàØÜÔÙØÕ‘ŒØØàÉˆáŒÜÙ˜ÌÅ˜àÌÑÀÌÕ…•…€°•á…ÐÑ•ÍÑ•ÑÉ•”)™ŒÐÀÔÁ…™„ØÐÌÝå‘„ÈÄÈÝ…˜ÁÁ˜É‘…”åˆÌÄÁ‘€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸±°ÈØÕÁ±½…‘•)‰±½‰Ì…¹¥Ð…Ñ„ÑÉ•”µ…Ñ¡•±½…°¡…Í¡•Ìì™•Ñ¡•µ…¥¸µ…Ñ¡•…¹¡•­½ÕÐ±•…¸¸)1½…°9½‘”ÈÐ™Õ±°É•É•ÍÍ¥½¸ÈÜØÝAML¼Á%0¼ÁÍ­¥ÁÁ•€ ää¸ÁÌ¤ì¡½ÍÑ•9½‘”ÈÈÉÕ¸(ÌääÔÈääÀàÈØ½©½ˆÄÈÀÐÄÄàÀÐààÜ½µÁ±•Ñ”±½œÙ•É¥™¥•ÌÍ…µ”ÈÜØÜ¼À¼À€ Ääà¸ÁÌ¤¸)A…•ÌÌääÔÈääÀÐØÈ‰Õ¥±ÄÈÀÐÄÄàÄÀÔÀÌ½‘•Á±½äÄÈÀÐÄÄääØÔÀÔÍÕ••‘•¸±°ÈäÁ½ÍÑ‘•Á±½åµ•¹Ð)Í¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”É•Ù¥•Ý•UX½‘½5Õ±Ñ¤½1…ˆ½Á…¥¹Ð±½…‘•ÈÉ…Á °É•½Ù•Éä°)É•Ñ…¥¹•äÐá±¥Ð½µ…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À¼äÐÝ±…å•ÉÌ½™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ ¸)AÉ½½˜½µµ¥ÐÕÁ‘…Ñ•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±äìÑ•ÍÑ•ÉÕ¹Ñ¥µ”É•Ñ…¥¹•¸()UÍ•ÈäÔÀAML¥ÌÉ•½É‘•½ÁÉ½Ñ•Ñ•¸	Õ¥±äÔÄ½µÁ±•Ñ”½É•…‘ä™½È‘•Ù¥”Ñ•ÍÑ¥¹œè)Í…µ”Õ¹Á…¥¹Ñ••áÑÉÕÍ¥½¸½Í…±”µ•Í ƒŠH=‰©•ÐƒŠHUXƒŠH½Á±…¹…È…Ñ±…ÌƒŠH=Á•¸UX‘¥Ñ½È¸)á…Ð™¥áÑÕÉ”…ÕÑ½µ…Ñ¥…±±ä¥Ù•ÌÄÐ¥Í±…¹‘ÌÙ•ÉÍÕÌ…”…Ñ±…ÌÈÀ°™½ÕÈÝ…ÉÁ•™…•Ì)ÍÑ…ä¥Í½±…Ñ•…¹…±°½É¥¥¹…°ÈÐÙ•ÉÑ¥•Ì¼ÈÀÅÕ…‘Ì½¹½¹ÌÕ¹¡…¹•¸½µÁ…É”¡…ÉÑÌ°)U¹‘½I•‘¼°Á…¥¹Ð…É½ÍÌ½¹¹•Ñ•™±…Ð™…•Ì…¹M…Ù•=Á•¸¸±•…È•á¥ÍÑ¥¹œÁ…¥¹Ð)•áÁ±¥¥Ñ±ä™¥ÉÍÐ¸Y%äÔÄ…ÁÁ•…É…¹”½Á•É™½Éµ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ¸9•áÐ™½±±½ÜäÔÄ)™••‘‰…¬‰•™½É”‰É½…‘•ÈÕ¹ÝÉ…À½Í•…´Ñ½½±¥¹œì­••À½É¥¥¹…°½Ý¹•ÉÌ…¹ÁÉ½Ñ•Ñ•)µ½‘•±±¥¹œ½¹…Ù¥…Ñ¥½¸½±¥¡Ñ¥¹œ½™É½é•¸‰•¡…Ù¥½È¸9¼•¹•É…°ÕÉÙ•Õ¹ÝÉ…À±…¥´¸(((ŒŒ€¸äÔÈƒŠPUX‘¥Ñ½È±…å•È½•¹ÑÉä¡…É‘•¹¥¹œì€¸äÔÄ…Ñ±…ÌAMLÁÉ½Ñ•Ñ•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäÔÄAML€½¹•áÑ‰Õ¥±°Ý¥Ñ Í•Á…É…Ñ”¥¹Ñ•Éµ¥ÑÑ•¹Ð¥A…AÉ¼U$µ±½ÍÌÉ•Á½ÉÐ¸MÕÁÁ±¥•)ÍÉ••¹Í¡½Ð½¹™¥ÉµÌäÔÄèÝ½É­ÍÁ…”É¥¡ÐÍ•Ñ¥½¸¥¹±Õ‘¥¹œ	…¬Ñ¼Í…¹µ…¥¸Ñ½½±‰…È)‰ÕÑÑ½¹Ìµ¥ÍÍ¥¹œ°Ý¡¥±”UXÑ¥±”É•µ…¥¹Ì‘É…Ý¸¸¼9=PÑÉ•…Ð…Ñ±…Ì…•ÁÑ…¹”…ÌU$µ±½ÍÌ)…•ÁÑ…¹”½È‘¥Íµ¥ÍÌ¥Ð‰•…ÕÍ”¹½‘”Ñ•ÍÑÌÁ…ÍÌ¸=É¥¥¹…°äÈÐÑ½½±‰…È™¥àÝ…Ì…•ÁÑ•)‰ÕÐÑ¡¥Ì¥Ì„É•ÕÉÉ•¹”Ý¥Ñ ÍÉ••¹Í¡½Ð•Ù¥‘•¹”ìÁÉ½Ñ•Ð¥ÑÌ¡•…‘•Èµ…‰½Ù”µÙ¥•ÝÁ½ÉÐ)¥¹Ñ•¹Ð¸á…Ð¥¹Ñ•Éµ¥ÑÑ•¹Ð¥A…½]•‰-¥Ð½µÁ½Í¥Ñ½È™…¥±ÕÉ”¥Ì9=PÉ•ÁÉ½‘Õ•¡•É”¸()Õ‘¥Ðè¹¼…Ñ¥½¸¥¹Ñ•¹Ñ¥½¹…±±ä¡¥‘•Ìµ…¥¸Ñ½½±‰…ÈìÝ½É­ÍÁ…”Ý…Ì„±…É”…‰Í½±ÕÑ”)…¹Ù…Ì½Ù•É±…ä¥¹Í¥‘”]•‰0Ù¥•ÝÁ½ÉÐ…±½¹Í¥‘”‰…­‘É½À½™¥±Ñ•È™±½…Ñ¥¹œÁ…¹•±Ì¸)=¹±ä=I%%90ÕØµÝ½É­ÍÁ…”¡…¹•Ìèµ½Õ¹Ð¥ÑÌ½¹”•á¥ÍÑ¥¹œÍ•Ñ¥½¸‰•Í¥‘”Ù¥•ÝÁ½ÉÐ)Õ¹‘•È€…ÁÀ°ÕÍ”™¥á•Ù¥•ÝÁ½ÉÐ¥¹Í•ÑÌ…¹¡•…‘•È¡•¥¡ÐÙ…É¥…‰±”Ý¥Ñ èä‰•±½Ü¡•…‘•ÈÄÀì)…Ñ¥Ù”µ½¹±äÙ¥•ÝÁ½ÉÐ¥Í½±…Ñ¥½¸É•Ñ…¥¹•Ù¥„ÕÁ‘…Ñ•Í¥‰±¥¹œµ¡½ÍÐÍ•±•Ñ½È€¡½±¹•ÍÑ•)™…±±‰…¬É•Ñ…¥¹•™½È•µ‰•‘‘•½Ñ•ÍÐ¡½ÍÐ¤¸%Í½±…Ñ”½Á…¥¹Ðµ½¹Ñ…¥¸…¹Ù…Ì…É•„ì­••À¥ÑÌ)½É¥¥¹…°…¹Ù…Ì°½¹ÑÉ½±Ì°±¥ÍÑ•¹•ÉÌ…¹5•Í¡!•…±Ñ ½¹Ñ•áÐ½Í•ÍÍ¥½¸½¡¥ÍÑ½Éä…±±‰…­Ì¸)	…¬Ñ¼Íµ½Ù•Ì‰•Í¥‘”Ñ¥Ñ±”ìÝÉ…ÁÁ¥¹œ½¹ÑÉ½±Ì‘¼¹½ÐÍ¡É¥¹¬½ÕÐ½˜Í¡½ÉÐÙ¥•ÝÁ½ÉÐ°)Ý½É­ÍÁ…”ÍÉ½±±ÌÝ¡•¸¹••‘•¸9¼™½É”µATÑÉ…¹Í™½ÉµÌ°èµ¥¹‘•à•Í…±…Ñ¥½¸°‘ÕÁ±¥…Ñ”)U$°µ½‘•±±¥¹œ½UX½Á…¥¹Ð½¡¥ÍÑ½Éä½¹…Ù¥…Ñ¥½¸­•É¹•±Ì½È¡…¹•ÌÑ¼½É¥¥¹…°¡•…‘•È½Ý¹•È¸()=Á•¸µ•…ÍÕÉ•Ì¥µµ•‘¥…Ñ•±ä…¹……¥¸½¹”½¸¹•áÐ…¹¥µ…Ñ¥½¸™É…µ”…™Ñ•È±…Õ¹ ¡¥‘•Ì)Í½ÕÉ”Á…¹•°¸1¥ÍÑ•¸Ñ¼Ù¥ÍÕ…±Y¥•ÝÁ½ÉÐÉ•Í¥é”…ÌÝ•±°…ÌÝ¥¹‘½Ü½I•Í¥é•=‰Í•ÉÙ•È¸)±½Í”…¹•±ÌÅÕ•Õ•™É…µ”…¹É•µ½Ù•Ì‰½Ñ É•Í¥é”±¥ÍÑ•¹•ÉÌì•á¥ÍÑ¥¹œ…ÁÑÕÉ”½•ÍÑÕÉ”¼)¥µ…”…¹•±±…Ñ¥½¸Õ¹¡…¹•¸Q¡É•”¹•ÜÁÉ½‘ÕÑ¥½¸µ½Ý¹•ÈÑ•ÍÑÌèÉ•…°…ÁÀ½¡•…‘•È¼)Ù¥•ÝÁ½ÉÐÍ¥‰±¥¹Ì…¹ÑÝ•±Ù”½Á•¸½±½Í”å±•ÌÕÍ¥¹œÍ…µ”¹½‘•Ì½…Ñ¥½¹Ìì‘•™•ÉÉ•…¹)Ù¥ÍÕ…°É•Í¥é”Á¥á•°Í¥é¥¹œ½¡¥ÍÑ½Éä¹•ÕÑÉ…±¥Ñä½±…Ñ”™É…µ”½±•…¹ÕÀìML¡•…‘•È½É‘•É¥¹œ°)…¹Ù…Ì½¹Ñ…¥¹µ•¹Ð°‰½Õ¹‘•½Ù•É™±½Ü…¹Í¥¹±”±•™ÐµÍ¥‘”•á¥Ð¸=É¥¥¹…°Ñ•ÍÑÌÉ•Ñ…¥¹•¸)±½Õ‰É½ÝÍ•ÈäÔÄµ…¥¸™…¥±Ì]•‰0½¹Ñ•áÐÉ•…Ñ¥½¸°Í¼¹¼™Õ±°É•¹‘•É•½ÈM…™…É¤½¥A…)É•ÁÉ½‘ÕÑ¥½¸±…¥µ•¸I•Á…¥È…‘‘É•ÍÍ•Ì±…å•ÈÑ½Á½±½ä…¹•¹ÑÉäÍ¥é¥¹œì¥A…É•Ñ•ÍÐ¥Ì)É•ÅÕ¥É•‰•™½É”…•ÁÑ¥¹œ¥¹Ñ•Éµ¥ÑÑ•¹Ð‘¥Í…ÁÁ•…É…¹”…Ì™¥á•¸()I•Ù¥•Ý•…¡”±½ÍÕÉ”=91dÝ½É­ÍÁ…”ƒŠH5•Í¡!•…±Ñ ƒŠHÍ¡•±°Á±ÕÌÉ•½Ù•Éä±½…‘•È­•åÌì)¥¹Ñ•É¹…°Ù•ÉÍ¥½¸ÍÑ…µÁÌ…¹Õ¹É•±…Ñ•äÔÄUX½Á…¥¹Ð±½…‘•ÈÁ¥¹ÌÉ•µ…¥¸¸Ñ±…ÌäÔÀ¼äÔÄ°)Á…¥¹ÐäÐà°µ…¥¸äÌÀ°…”äÌÀ°5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À…¹™É½é•¸Í¹…ÁÍ¡½ÑÌÕ¹¡…¹•¸)Y%äÔÈèÉ•Á•…Ñ•‘±ä½Á•¸½	…¬Ñ¼Í½¸¥A…‘AÉ¼°Ù•É¥™ä™Õ±°•‘¥Ñ½È…¹µ…¥¸Ñ½ÀµÉ¥¡Ð)‰ÕÑÑ½¹Ì½Y%\ìÁ…¸½Á¥¹ ½A•¹¥°¥Í±…¹•‘¥Ð…¹U¹‘½I•‘¼ìÉ•ÑÕÉ¸Ñ¼ÍÑ¡•¸É•½Á•¸¸)9•áÐ™½±±½ÜäÔÈU$™••‘‰…¬‰•™½É”™ÕÉÑ¡•ÈÕ¹ÝÉ…ÀÝ½É¬ìÉ•½É•á…ÐÉ•Á•…ÐÑÉ¥•È¥˜)±½ÍÌÁ•ÉÍ¥ÍÑÌ¸=Ñ¡•È…±Á¡„äÈä½µ•Ñ…°É•™±•Ñ¥½¸…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ð¸((´mátUMHäÔÈAMLƒŠPY%äÔÈèÉ•Á•…Ñ•¥A…‘AÉ¼UX•¹ÑÉä½•á¥Ð°•‘¥Ñ½È½	…¬Ñ¼Í…¹µ…¥¸Ñ½½±‰…È½Y%\É•µ…¥¸Ù¥Í¥‰±”ìÁ…¸½Á¥¹ ½A•¹¥°½U¹‘½I•‘¼…¹É•ÑÕÉ¸½É•½Á•¸¸(((¸äÔÈ±½…°9½‘”ÈÐ™Õ±°É•É•ÍÍ¥½¸è€¨¨ÈÜÜÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨€ äÜ¸ÕÌ¤°)…±°ÈÜØÜÉ•Ñ…¥¹•Á±ÕÌÑ¡É•”Ý½É­ÍÁ…”±…å•È½•¹ÑÉä±¥™•å±”Ñ•ÍÑÌ¸½ÕÍ•UX½¡¥ÍÑ½Éä¼)A•¹¥°½¥Í±…¹½¥µ…”µÉ•™•É•¹”½A…¬½‘•¹Í¥Ñä½É•±•…Í”ÔÍAML¸9¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•½È½±)¡•­Ì‘•±•Ñ•¸Õ¹Ñ¥½¹…°¡…¹•Ì½¹±äÕØµÝ½É­ÍÁ…”ì5•Í¡!•…±Ñ ¥µÁ½ÉÐ€¬É•Ù¥•Ý•)Í¡•±°½É•½Ù•Éä…¡”­•åÌäÔÈ¸5…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À…¹™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸)!½ÍÑ•½A…•Ì½±¥Ù”ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½ÝÌ¸Y%äÔÈ¥¹Ñ•Éµ¥ÑÑ•¹Ð¥A…U$µ±½ÍÌ)É•Ñ•ÍÐÉ•µ…¥¹ÌÁ•¹‘¥¹œì¹¼•á…Ð‰É½ÝÍ•È½ATÉ•ÁÉ½‘ÕÑ¥½¸½È‘•Ù¥”™¥àAML±…¥µ•¸(((ŒŒ€¸äÔÈÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÄÀÕˆäÕ„áˆÁÉˆá™™‘”á„ÔÝ„ÄÕŒÌàÀÜÐäÈÌäÐÍ‘€°Ñ•ÍÑ•ÑÉ•”)•„ÔÁ”å”äàääÑŒÑ…‰‰ŒÑ˜ÌàÈå„ÁÄÐÄàäÌáÁŒÌÕ€°ÁÕ‰±¥Í¡•½¸µ…¥¸¸Q•¸ÕÁ±½…‘•)‰±½‰Ì½ÑÉ•”µ…Ñ¡•±½…°¡…Í¡•Ìì™•Ñ¡•µ…¥¸µ…Ñ¡•…¹¡•­½ÕÐ±•…¸¸1½…°)9½‘”ÈÐÉ•É•ÍÍ¥½¸ÈÜÜÁAML¼Á%0¼ÁÍ­¥ÁÁ•€ äÜ¸ÕÌ¤ì¡½ÍÑ•9½‘”ÈÈÉÕ¸ÌääÔÔÜÄÌÀÄÜ€¼)©½ˆÄÈÀÐÈÀäÈÄÀØÔ½µÁ±•Ñ”±½ÌÙ•É¥™äÈÜÜÀ¼À¼À€ ÈÐà¸ÙÌ¤¸A…•ÌÌääÔÔÜÄÈÔÌÐ‰Õ¥±(ÄÈÀÐÈÀäÈÔäÈÄ½‘•Á±½äÄÈÀÐÈÄÄØÜÄàäÍÕ••‘•¸±°ÈäÁ½ÍÑ‘•Á±½åµ•¹Ð¡•­•Í¡•±°½Ù•ÉÍ¥½¸°)Ý½É­ÍÁ…”½5•Í¡!•…±Ñ ½UX½‘½5Õ±Ñ¤½1…ˆ½Á…¥¹Ð±½…‘•ÉÌ°É•½Ù•Éä°É•Ñ…¥¹•µ…¥¸½…”¼)5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À½±¥ÐäÐà½±…å•ÉÌäÐÜ½™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸)Q¡¥ÌÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±äìÑ•ÍÑ•ÉÕ¹Ñ¥µ”É•Ñ…¥¹•¸()	Õ¥±äÔÈ½µÁ±•Ñ”…¹É•…‘ä™½È¥A…‘AÉ¼É•Ñ•ÍÐ¸UÍ•ÈäÔÄ…Ñ±…ÌAMLÁÉ½Ñ•Ñ•ìÍ•Á…É…Ñ”)¥¹Ñ•Éµ¥ÑÑ•¹ÐUX½µ…¥¸µÑ½½±‰…È‘¥Í…ÁÁ•…É…¹”¥ÌÍÑ¥±°Á•¹‘¥¹œY%äÔÈ½¹™¥Éµ…Ñ¥½¸¸)I•Á•…Ñ•‘±ä½Á•¸•‘¥Ñ½È…¹	…¬Ñ¼Íì¡•¬Ý¡½±”•‘¥Ñ½È°•á¥Ð‰•Í¥‘”Ñ¥Ñ±”°µ…¥¸Ñ½ÀµÉ¥¡Ð)‰ÕÑÑ½¹Ì½Y%\°Á…¸½Á¥¹ ½A•¹¥°¥Í±…¹•‘¥Ñ¥¹œ½U¹‘½I•‘¼…¹É•ÑÕÉ¸½É•½Á•¸¸=É¥¥¹…°äÈÐ)¡•…‘•Èµ…‰½Ù”µÙ¥•ÝÁ½ÉÐ‰•¡…Ù¥½ÈÁÉ•Í•ÉÙ•Ý¥Ñ Í¥‰±¥¹œÝ½É­ÍÁ…”±…å•È¸±½Õ]•‰0)Õ¹…Ù…¥±…‰±”°¹¼•á…Ð¥¹Ñ•Éµ¥ÑÑ•¹ÐM…™…É¤É•ÁÉ½‘ÕÑ¥½¸½È™Õ±°µ…ÁÀÉ•¹‘•É•…•ÁÑ…¹”)±…¥µ•¸9•áÐ™½±±½ÜäÔÈ‘•Ù¥”™••‘‰…¬ì‘½¸Ð¥¹™•ÈÑ¡…Ð…ÕÑ½µ…Ñ•Ñ•ÍÑÌÁÉ½Ù”Ñ¡”)É•Á½ÉÑ•¥¹Ñ•Éµ¥ÑÑ•¹Ð‘¥Í…ÁÁ•…É…¹”É•Í½±Ù•¸9¼µ½‘•±±¥¹œ½…Ñ±…Ì½Á…¥¹Ð…±½É¥Ñ¡´¡…¹•Ì¸(((ŒŒ€¸äÔÌƒŠPÍ•±•Ñ•‘”ÕÐUYÌì€¸äÔÈÕÍ•ÈAMLƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈäÔÈAMLÁÉ½Ñ•ÑÌÉ•Á•…Ñ•UX‘¥Ñ½È•¹ÑÉä½•á¥Ð°µ…¥¸Ñ½½±‰…È½Y%\…¹¥Í±…¹)A•¹¥°½¡¥ÍÑ½ÉäÝ½É­™±½Ü…™Ñ•ÈÍ¥‰±¥¹œµ±…å•È¡…É‘•¹¥¹œ¸AÉ¥½ÈäÔÄ…Ñ±…ÌAMLÉ•Ñ…¥¹•¸)9¼¹•Ü…•ÁÑ…¹”½˜¥¹‘•Á•¹‘•¹Ð…±Á¡„äÈä½ÈÍµ½½Ñ µµ•Ñ…°É•™±•Ñ¥½¸…Ñ•Ì¥¹™•ÉÉ•¸()Õ‘¥Ðµ…¥¸ÙˆØÙ˜ÅŒè½É¥¥¹…°¥¹ÍÁ•Ñ½È…±É•…‘ä½Ý¹Ìµ…¹¥™½±…‘©…•¹ä½Õ¹¥½¸…¹¡…Ì)…¹)½¥¹…•Ìì½É¥¥¹…°UX•‘¥Ñ½È½Ý¹ÌA…¬…¹¹…Ñ¥Ù”½µµ¥Ð½¡¥ÍÑ½Éä¸9¼…ÕÑ¡½É•)‘”µÕÐ½µµ…¹•á¥ÍÑÌ¸‘‘”É…‘¥…°½ÕÑ•ÈØÜ¸×
ÀÕÐUYÌÕÍ¥¹œÕÉÉ•¹Ð½É¥¥¹…°)M•±•Ñ¥½¹	É¥‘”•‘”¥¹‘¥•Ì°Ý¥Ñ …±°ÁÉ•Ù¥½ÕÌÑ½½°Á½Í¥Ñ¥½¹ÌÁÉ•Í•ÉÙ•¸M…µ”)5•Í¡!•…±Ñ µ½‘Õ±”¡½ÍÑÌÑ¡”½¹”µÍ¡½Ð‰ÕÑÑ½¸ì¹¼¹•ÜÁ½ÁÕÀ½¥¹ÁÕÐ½¡¥ÍÑ½Éä½­•É¹•°¸()9…Ñ¥Ù”Õ¹Á…¥¹Ñ•¥¹‘•Á•¹‘•¹Ð	…Í”µ•Í¡•ÌÝ¥Ñ ½µÁ±•Ñ”µ…Ñ¡¥¹œUYÌ½¹±ä¸á±Õ‘”)Í•±•Ñ•…ÑÕ…°•‘•Ì™É½´=I%%90¥¹ÍÁ•Ñ½È½¹¹•Ñ¥Ù¥Ñä°É•ÅÕ¥É”•… Í•±•Ñ•)½¹Ñ¥¹Õ½ÕÌUX•‘”Ì½Ý¹•ÉÌÑ¼•¹¥¸‘¥™™•É•¹Ð½µÁ½¹•¹ÑÌ°Ñ¡•¸½É¥¥¹…°É¥A…¬)…¹=9¹…Ñ¥Ù”UX½µµ¥Ð¸½µÁ±•Ñ”‰½Õ¹‘…ÉäµÑ¼µ‰½Õ¹‘…ÉäÕÑÌ½È±½Í•±½½ÁÌÍÁ±¥Ð)¡…ÉÑÌì¥¹½µÁ±•Ñ”Í±¥ÑÌÉ•™ÕÍ”Ñ¡”Ý¡½±”…Ñ¥½¸¸á¥ÍÑ¥¹œÍ•…µÌ½‰½Õ¹‘…É¥•Ì¹¼µ½À¸)Ù•ÉäÕ¹Í•±•Ñ•½¹¹•Ñ¥½¸¥ÌÙ•É¥™¥•Õ¹¡…¹•‰•™½É”¡•­Á½¥¹Ð¸½½É‘¥¹…Ñ•Ì)Á•ÉÍ¥ÍÐ…Ì½É‘¥¹…Éä¹…Ñ¥Ù”UYÌ°¹½ÐÍ•…´™±…Ì½È„¹•ÜÍ¡•µ„¸I•Á…¬…™™•ÑÌ10)¥Í±…¹‘ÌÝ¥Ñ ½¹”½µµ½¸Í…±”ìÍ½ÕÉ”Á½±å½¹Ì½Á½Í¥Ñ¥½¹Ì½É•±…Ñ¥Ù”‘•¹Í¥ÑäÕ¹Ñ½Õ¡•¸)9¼½¹™½Éµ…°Õ¹ÝÉ…À°¹•Ü™±…ÑÑ•¹¥¹œ°Á•ÉÍ¥ÍÑ•¹ÐÍ•…´µ…É­¥¹œ½ÈÍÑ¥Ñ ½µµ…¹¸(ÈÁ,½É¹•ÉÌ€¼½É¥¥¹…°ÄÈàÁ…­•µ¥Í±…¹±¥µ¥ÑÌì…µ‰¥Õ½ÕÌ½¹½¹µ…¹¥™½±½Í…µ”µÝ¥¹‘¥¹œ)Í•±•Ñ••‘•Ì°ÍÑ…±”Ñ…É•Ð½¡¥ÍÑ½Éä™…¥±ÕÉ”É•™ÕÍ”‰•™½É”ÁÕ‰±¥…Ñ¥½¸¸¹ä½±½ÕÈ¼)É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌÁ…¥¹ÐÉ•™ÕÍ•Ì…¹Á½¥¹ÑÌÑ¼•áÁ±¥¥Ð=‰©•ÐUX±•…ÈÁ…¥¹Ð¸)9¼Í¥±•¹ÐÁ¥á•°‘¥Í…É½É•‰¥¹½È¥µÁ½ÉÑ•µ…Ñ•É¥…°É•µ…ÁÁ¥¹œ¸()M¥à¹•Ü¥¹Ñ•É…Ñ¥½¸¡•­Ì½Ù•È½µÁ±•Ñ”ÕÑÌ½±½Í•±½½ÁÌ°µ¥á•Á…ÉÑ¥…°É•™ÕÍ…°°)•á¥ÍÑ¥¹œÍ•…µÌ½‰½Õ¹‘…É¥•Ì°½É¥¥¹…°Á…¬½Ý½É¬½Ñ…É•Ð½¡¥ÍÑ½ÉäÕ…É‘Ì°É•…µ½¹±äÁ••ÉÌ°)Õ¹¡…¹••½µ•ÑÉä…¹Õ¹Í•±•Ñ•©½¥¹Ì°…ÑÕ…°Í•¹”U¹‘½I•‘¼½A…¥¹Ð½M…Ù•=Á•¸½1)É½Õ¹‘ÑÉ¥À°…ÑÕ…°‘”…±±‰…¬½ÕÉÉ•¹ÐÍ•±•Ñ¥½¸½É•¹‘•È…¹É…‘¥…°½¹”µÍ¡½ÐÝ¥É¥¹œ¸)=±ÜÄÌ¼ÜÀäÉ…‘¥…°¥¹Ù•¹Ñ½Éä¹½Ü¥¹±Õ‘•ÌÑ¡”¹•ÜÈÁÑ ‘”…Ñ¥½¸°É•Ñ…¥¹¥¹œ10½±)%Ì…¹É½ÍÌµµ½‘”Á±…•µ•¹ÑÌ¸=Ñ¡•ÈÉÕ¹Ñ¥µ”Í½ÕÉ”¡…¹•Ì…É”É•Ù¥•Ý•É•Ù•ÉÍ”)UX½‘½5Õ±Ñ¤½1…ˆ…¡”Á¥¹Ì…¹Í¡•±°½É•½Ù•Éä­•åÌäÔÌ½¹±ä¸]½É­ÍÁ…”äÔÈ½µ…¥¸äÌÀ¼)…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸Õ±°½ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌ¸()Y%äÔÌè‘Õ¹Á…¥¹Ñ•UXA±…¹”Ý¥Ñ `‘•¹Í¥ÑäÈ°dÄ¸‘”µ½‘”Í•±•Ð¥ÑÌ•¹ÑÉ”)Í¡…É••‘”ƒŠHÉ…‘¥…°ÕÐUYÌ¸=‰©•ÐƒŠHUXƒŠH=Á•¸UX‘¥Ñ½ÈÍ¡½ÝÌÈÍ•Á…É…Ñ•¥Í±…¹‘Ìì)U¹‘½I•‘¼É•ÍÑ½É•Ì½É•…ÁÁ±¥•ÌÕÐìA•¹¥°¥Í±…¹µ½Ù”…™™•ÑÌ½¹”Í¥‘”¸A…¥¹Ð…™Ñ•ÈÕÐ°)M…Ù•=Á•¸É•Ñ…¥¹ÌÉ•ÍÕ±Ð¸I•Á•…ÐÕÐ½¸Í…µ”•‘”…‘‘Ì¹¼¡¥ÍÑ½ÉäìÁ…¥¹Ñ•Ñ…É•ÑÌ)É•™ÕÍ”Õ¹Ñ¥°•áÁ±¥¥Ð±•…ÈÁ…¥¹Ð¸á¥ÍÑ¥¹œÕ‰”™…”‰½Õ¹‘…É¥•Ìµ…ä…±É•…‘ä‰”Í•…µÌ)…¹½ÉÉ•Ñ±ä¹¼µ½À¸½ÈµÕ±Ñ¤µ•‘”Á…Ñ¡ÌÍ•±•ÐÑ¡”Ý¡½±”ÕÐ°¹½Ð…¸¥¹Ñ•É¥½ÈÍ±¥Ð¸)9•áÐ™½±±½ÜäÔÌÑ…Ñ¥±”™••‘‰…¬ì…É‰¥ÑÉ…ÉäÍ•…´µ…É­Ì½ÍÑ¥Ñ ½•¹•É…°ÕÉÙ•Õ¹ÝÉ…À)É•µ…¥¸ÅÕ•Õ•Ñ¡É½Õ ½É¥¥¹…°½Ý¹•ÉÌ¸-••ÀäÔÈU$µ±½ÍÌ…•ÁÑ…¹”ÁÉ½Ñ•Ñ•¸((¸äÔÌ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨ÈÜÜØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( äÄ¸ÙÌ¤°É•Ñ…¥¹¥¹œ½É¥¥¹…°ÈÜÜÀÁ±ÕÌÍ¥à‘”µÕÐ¥¹Ñ•É…Ñ¥½¹Ì¸½ÕÍ•¹•Ü½…Ñ±…Ì¼)Ý½É­ÍÁ…”½É•±•…Í”ÈÁAMLìÉ…‘¥…°ÜÀä¼ÜÄÌÉ•Ñ…¥¹•…±°½±%Ì…¹¹½ÜÉ•ÅÕ¥É•ÌÈÀ‘”)…Ñ¥½¹Ì¸¥ÉÍÐ™Õ±°ÉÕ¸Ì½¹±ä™…¥±ÕÉ”Ý…Ì½±ÜÄÌ¥¹Ù•¹Ñ½ÉäÄäìÕÁ‘…Ñ•Ñ¼¥¹Ñ•¹‘•(ÈÀ…¹™¥¹…°=5A1QÉ•ÉÕ¸…‰½Ù”Á…ÍÍ•Ì¸9¼‰•¡…Ù¥½È…ÍÍ•ÉÑ¥½¸‘É½ÁÁ•½ÈÍ­¥ÁÁ•¸)I•Ù¥•Ý•äµ™¥±”ÉÕ¹Ñ¥µ”½±½…‘•È±½ÍÕÉ”€¬É•½Ù•Éä­•åÌäÔÌìµ…¥¸äÌÀ½…”½5Õ±Ñ¤Ä¸À¼)™É½é•¸Õ¹¡…¹•¸ÑÕ…°äÔÌ¥A…Ñ…Ñ¥±”…•ÁÑ…¹”Á•¹‘¥¹œ¸!½ÍÑ•½A…•Ì½±¥Ù”)ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌ¸I•ÁÉ½©•Ñ¥¹œUYÌÉ•Á±…•ÌÕÑÌì¹¼Á•ÉÍ¥ÍÑ•¹ÐÍ•…´É•¥Á”¸(((ŒŒ€¸äÔÌÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÅÌÄàÕ™ˆÀá•ŒÐÑ‰ØÅ‘ŒÀÅˆÀÁ…„ÌØÀÜá•…‘‘…ˆÐÝ€°Ñ•ÍÑ•ÑÉ•”)”ÌÅ…ˆÔØäÙ„äÄÔÔØäÅ…”ÈÙˆáˆÉ„ØÌÄÍ”ÜÑ••‰á‘‰€°ÁÕ‰±¥Í¡•½¸µ…¥¸¸±°Äà‰±½‰Ì)…¹É•…Ñ•ÑÉ•”µ…Ñ¡•±½…°¡…Í¡•Ìì™•Ñ¡•µ…¥¸µ…Ñ¡••á…Ñ±ä…¹¡•­½ÕÐ)…±¥¹•±•…¹±ä¸1½…°9½‘”ÈÐ™Õ±°ÈÜÜÙAML¼Á%0¼ÁÍ­¥À€ äÄ¸ÙÌ¤ì¡½ÍÑ•9½‘”ÈÈÉÕ¸(ÐÀÀÌäÔàÐäÌÌ½©½ˆÄÈÀÜÀÜÈÌØäÐØ½µÁ±•Ñ”±½ÌÙ•É¥™äÈÜÜØ¼À¼À€ ÈÄÐ¸ÝÌ¤¸A…•ÌÐÀÀÌäÔàÐÔÌÜ)‰Õ¥±ÄÈÀÜÀÜÈÐÀÀÌÈ½‘•Á±½äÄÈÀÜÀÜÌäÜàØÔMUML¸±°ÈÀ¡•­•±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ è)Í¡•±°½Ù•ÉÍ¥½¸°=5A1Q¡…¹•UX½‘½5Õ±Ñ¤½1…ˆ½¥éµ¼É…Á °É•½Ù•Éä°É•Ñ…¥¹•)Ý½É­ÍÁ…”äÔÈ½¥¹ÍÁ•Ñ½ÈäÔÄ½µ…¥¸äÌÀ½…”½5Õ±Ñ¤Ä¸À½¹…Ñ¥Ù”ÝÉ¥Ñ•È½ÁÉ½©•Ð½™É½é•¹	•Ñ„Ü¸)Q¡¥ÌÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä‘½Õµ•¹ÑÌ½¹±äìÑ•ÍÑ•ÉÕ¹Ñ¥µ”É•Ñ…¥¹•¸()	Õ¥±äÔÌÉ•…‘ä™½È¥A…Ñ•ÍÑ¥¹œè‘UXA±…¹”`È½dÄƒŠHÍ•±•Ð•¹ÑÉ”Í¡…É•‘”ƒŠH)É…‘¥…°ÕÐUYÌƒŠH=‰©•ÐUX‘¥Ñ½ÈÍ¡½ÝÌÑÝ¼¥Í±…¹‘Ì¸U¹‘½I•‘¼É•ÍÑ½É•Ì½É•…ÁÁ±¥•Ìì)A•¹¥°¥Í±…¹µ½Ù”°A…¥¹Ð…™Ñ•ÈÕÐ…¹M…Ù•=Á•¸É•Ñ…¥¸±…å½ÕÐ¸á¥ÍÑ¥¹œÍ•…´½‰½Õ¹‘…Éä)É•Á•…Ð¹¼µ½ÁÌìÁ…¥¹ÐÉ•ÅÕ¥É•Ì•áÁ±¥¥Ð±•…ÈÁ…¥¹Ð‰•™½É”ÕÑÑ¥¹œ¸½µÁ±•Ñ”Á…Ñ¡Ì½È)±½Í•±½½ÁÌ½¹±äìÁ…ÉÑ¥…°Í±¥ÑÌÉ•™ÕÍ”…Ñ½µ¥…±±ä¸9¼•¹•É…°Õ¹ÝÉ…À½ÍÑ¥Ñ ½Á•ÉÍ¥ÍÑ•¹Ð)Í•…´É•¥Á”¸UÍ•ÈäÔÈU$½¡¥ÍÑ½ÉäAMLÁÉ½Ñ•Ñ•ìY%äÔÌ™••°½Ù¥Í¥‰¥±¥ÑäÁ•¹‘¥¹œ¸)9•áÐ…ÑÕ…°äÔÌ™••‘‰…¬°Ñ¡•¸Í½Á•Í•…´½ÍÑ¥Ñ ½Õ¹ÝÉ…À…Õ‘¥ÐÑ¡É½Õ ½É¥¥¹…°½Ý¹•ÉÌ¸(((ŒŒ€¸äÔÐƒŠPÍÉ••¸µÁÉ½á¥µ¥Ñä‘”Á¥­¥¹œìÍÕÁÁ±¥•½¹Ù•àµ•‘”É•Á½ÉÐƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈÉ•Á½ÉÑÌ½¹Ù•àµÁ½Í¥Ñ¥½¸•‘•Ì…±µ½ÍÐ¥µÁ½ÍÍ¥‰±”Ñ¼Ñ…À…¹¹•Ý±ä™±¥ÁÁ•)•‘•Ì‰•½µ¥¹œÕ¹Í•±•Ñ…‰±”¸MÉ••¹Í¡½Ð±•…É±ääÔÈìÕÉÉ•¹ÐäÔÌÉ•Ñ…¥¹ÌM5µ…¥¸äÌÀ)Á¥­•È°Í¼É•ÁÉ½‘Õ•½¸ÕÉÉ•¹ÐÍ½ÕÉ”°¹½Ð‘¥Íµ¥ÍÍ•…ÌÍÑ…±”µÍ¡•±°‰•¡…Ù¥½È¸)9¼äÔÌÕÐUYÌAML¥¹™•ÉÉ•¸UÍ•ÈäÔÈUXµ•‘¥Ñ½È…•ÁÑ…¹”É•µ…¥¹ÌÁÉ½Ñ•Ñ•¸)á…ÐÕÁ±½…‘•½¹Ù•à‘”¹½‰¨É•Ñ…¥¹•‰åÑ”µ™½Èµ‰åÑ”…Ð(Ñ•ÍÑÌ½™¥áÑÕÉ•Ì½½¹Ù•àµ•‘”´äÔÐ¹½‰¨ìM!ÈÔØ(ÜàÈÉˆáÌÔÌØÜÜÅŒÍˆÕ˜àÁÜÍ˜Í™…ŒÐÈÄÄÁŒÌàÕ‘Ý„ÄÜÈÌÈÀÁå”Ý„ÐÁŒÄàÜÜáÐ¸(ØÁÙ•ÉÑ¥•Ì¼àÑ™…•Ìµ…Ñ¡•ÌÍÉ••¹Í¡½Ð¸…µ•É„Á½Í”¥Ì¹½Ð¥¸=	(ìÑ•ÍÐ…µ•É…Ì…É”)½¹ÑÉ½±±•É•ÁÉ½‘ÕÑ¥½¹Ì°¹½Ð„±…¥´Ñ¼É•½Ù•È•á…ÐÍÉ••¹Í¡½ÐÙ¥•Ü¸()Õ‘¥Ðè½É¥¥¹…°µ…¥¸Á¥­-¥¹‘!¥ÑÌÕÍ•ÌQ¡É•”1¥¹”Ñ¡É•Í¡½±€¸ÀäÝ½É±Õ¹¥ÑÌÑ¡•¸)…µ•É„µ‘¥ÍÑ…¹”½É‘•È¸=¸•á…ÐÍÕÁÁ±¥••½µ•ÑÉä°ÄÈ¡½Í•¸±¥¹”µ¥‘Á½¥¹ÑÌ10)Í•±•Ð…¹½Ñ¡•È…µ•É„µ¹•…É•È¹•¥¡‰½ÕÉ¥¹œ•‘”¸=É¥¥¹…°ÁÉ½áä½‘¥ÍÁ±…ä‰…Ñ¡¥¹œ)…¹%Ì…É”½ÉÉ•Ðì¹¼Í½ÕÉ”Ñ½Á½±½ä½±¥À­•É¹•°É•Á…¥ÈÉ•ÅÕ¥É•¸M•±•Ñ•µ½¹±ä)½µÁ½¹•¹ÐµÑ…À¡•±Á•È…±Í¼É••‘¥±ä¡½Í”…¹äÍ•±•Ñ••‘”Ý¥Ñ¡¥¸ÈÁÁà°•Ù•¸Ý¡•¸)„‘¥™™•É•¹Ð•‘”±…äÕ¹‘•ÈÑ¡”Á½¥¹Ñ•È¸A•¹¥°…Ñ”…±É•…‘ä‘•±•…Ñ•Ì¹…Ñ¥Ù”Á¥¬¸)‘”µÁ…¥¹Ð½Ý¹•È¥¹‘•Á•¹‘•¹Ñ±äÕÍ•Ñ¡”½±Ý½É±µÉ…‘¥ÕÌ½É‘•É¥¹œ¸()5…¥¸Ì‘”µ½¹±ä‰É…¹ ¹½Ü…±±ÌÍµ…±°É•…µ½¹±ä•‘”µÍÉ••¸µÁ¥­¥¹œ¡•±Á•È½Ù•È)M5É•¹‘•É•¥¹‘•á•±¥¹”ÁÉ½á¥•Ì°ÄÈMLÁ¥á•±Ì°ÍÉ••¸ÁÉ½á¥µ¥Ñä™¥ÉÍÐ°…µ•É„)‘•ÁÑ ™½ÈÅÕ…¹Ñ¥é•ÅÕ…ÉÑ•ÈµÁ¥á•°Ñ¥•Ì¸!½µ½•¹•½ÕÌ™ÉÕÍÑÕ´±¥ÁÁ¥¹œ‰•™½É”‘¥Ù¥‘”)…¹Á•ÉÍÁ•Ñ¥Ù”µ½ÉÉ•ÐÝ½É±¥¹Ñ•ÉÁ½±…Ñ¥½¸ìÁ…É•¹ÐÑÉ…¹Í™½ÉµÌ…¹½ÉÑ¡½É…Á¡¥Œ)…µ•É…ÌÍÕÁÁ½ÉÑ•¸9¼µ•Í ¹•‘•Ì ¤°Ñ½Á½±½ä½ÈÍ½ÕÉ”ÝÉ¥Ñ•Ì°…¡”½¡¥ÍÑ½Éä½¥¹ÁÕÐ)½Ý¹•È¸5…Ñ•É¥…°¹Ù¥Í¥‰±”õ™…±Í”ÁÉ½áä½¹Ù•¹Ñ¥½¸É•Ñ…¥¹•ì½‰©•Ð½…¹•ÍÑ½ÈÙ¥Í¥‰¥±¥Ñä)É•ÍÁ•Ñ•¸…”½Y•ÉÑ•à½=‰©•ÐÉ…äÁ…Ñ¡ÌÕ¹¡…¹•¸Q¡¥Ì¥ÌÑ…É•Ñ¥¹œ°¹½Ð„¹•Ü)ÍÕÉ™…”½±ÕÍ¥½¸½‰…¬µ™…”½Q¡É½Õ µÍ•±•Ñ¥½¸Á½±¥äì¹¼¹•Ü¡¥‘‘•¸µÍÕÉ™…”Õ…É…¹Ñ•”¸()=É¥¥¹…°Í•±•Ñ•µ½µÁ½¹•¹Ð‘”Ñ½±”¹½Ü¡•­ÌM5¹…Ñ¥Ù”¡¥Ð‰•™½É”É•µ½Ù…°ì)Õ¹Í•±•Ñ•¹•¥¡‰½ÕÉÌÁ…ÍÌÑ¼µ…¥¸¸=É¥¥¹…°‘”Á…¥¹ÐÙ¥Í¥‰±”½Ñ¡É½Õ ÕÍ•Ì¹…Ñ¥Ù”)Á¥­!¥ÑÌ½É‘•È…¹½É¥¥¹…°‘•‘ÕÀ½™¥ÉÍÐ½…±°Á½±¥ä°É•Ñ…¥¹¥¹œ™…±±‰…¬™½ÈÍÑ…ÉÑÕÀ¼)¹½¸µ‘”™¥áÑÕÉ•Ì¸M…µ”½É¥¥¹…°±¥ÍÑ•¹•ÉÌ°ÁÉ½Á……Ñ¥½¸…¹•ÍÑÕÉ”½Ý¹•ÉÌì¹¼¹•Ü)É…ÜµÁ½¥¹Ñ•È¡…¹‘±•È¸±¥À‘”•½µ•ÑÉä½¡¥ÍÑ½Éä½É…‘¥…°½Ý½É­ÍÁ…”½UX½Á…¥¹Ð½µ…Ñ•É¥…°)…±½É¥Ñ¡µÌÕ¹¡…¹•¸9•Ü5%8…¡”Á¥¸äÔÐ¥Ì¥¹Ñ•¹Ñ¥½¹…°…ÑÕ…°Á¥­•ÈÉ•Á…¥Èì)½É¥¥¹…°µ…¥¸¥¹Ñ•É¹…°ÍÑ…µÀ…¹…”äÌÀ½5Õ±Ñ¤Ä¸À½™É½é•¸‰åÑ•ÌÉ•µ…¥¸Õ¹¡…¹•¸)¥É•Ðµ‰•Ù•°¡…¹•Ì=91d½µÁ½¹•¹ÐµÑ…À¡¥±…¡”­•äìÍ¡•±°½É•½Ù•Éä½µ…¹¥™•ÍÐ)…¹É•Ù¥•Ý•µ…¥¸½¡¥±±½…‘•ÈÉ…Á äÔÐ¸9¼‰±…¹­•ÐÉ•Á¥¹¹¥¹œ¸()M•Ù•¸¹•Ü¥¹Ñ•É…Ñ¥½¹Ìè•á…ÐÍÕÁÁ±¥•ÄÈÁÉ”µÉ•Á…¥È™…¥±ÕÉ•ÏŠI½ÉÉ•Ð¹…Ñ¥Ù”Á¥¬ì)QU0½É¥¥¹…°±¥À‘”…ÁÁ±ä½É•‰Õ¥±½U¹‘½I•‘¼Á±ÕÌÉ•Í•±•Ð¹•Ü‘¥…½¹…°ìÍ…±”¼)ÁÉ½©•Ñ¥½¸½Á…É•¹Ð½AH¼ÄÉÁà‰½Õ¹‘Ìì±¥À½¡¥‘‘•¸…¹•ÍÑ½È½ÍÕ‰Á¥á•°µ‘•ÁÑ ‰•¡…Ù¥½Èì)…ÑÕ…°Í•±•Ñ•µÑ½±”É•™ÕÍ…°½É•µ½Ù…°Ý¥Ñ ¹¼¡¥ÍÑ½Éäì½É¥¥¹…°‘”µÁ…¥¹Ð¹…Ñ¥Ù”)•Ù•¹Ð½Ù¥Í¥‰±”½Ñ¡É½Õ ‘•±•…Ñ¥½¸ìÉ•…°A•¹¥°…Ñ”½Á…¥¹Ð½Ý¹•ÈÉ•±•…Í”½…¹•°½™¥¹•È)=É‰¥ÐÉ•Ñ•¹Ñ¥½¸¸½ÕÍ•¹•Ü­¹…Ñ¥Ù”…”½Y•ÉÑ•à½™±½…Ñ¥¹œµ¹…Ù¥…Ñ¥½¸½É•±•…Í”ÌáAML¸)=É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•ì™Õ±°…¹ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½Ü¸9½‘”Q¡É•”½¥¹ÁÕÐ)™¥áÑÕÉ•Ì…É”¹½Ð¹…Ñ¥Ù”¥A…½]•‰0É•¹‘•É•…•ÁÑ…¹”¸()Y%äÔÐèM5ÍÕÁÁ±¥•µ•Í °‘•Í•±•Ð…¹Ñ…À¥É±••‘”…¹¹•¥¡‰½ÕÉ¥¹œÝ¡¥Ñ”)•‘”ì½É‰¥Ð½é½½´…¹É•Á•…Ð¸±¥À•±¥¥‰±”•‘”°‘•Í•±•ÐÑ¡•¸É•Í•±•Ð¹•Ü‘¥…½¹…°ì)U¹‘½I•‘¼­••ÁÌ‰½Ñ •½µ•ÑÉä…¹Á¥­¥¹œÕÍ…‰±”¸QÉä¹•…É‰äµÕ±Ñ¤µ•‘”Í•±•Ñ¥½¸°)A•¹¥°‘É…œÍ•±•Ñ¥½¸…¹™¥¹•È½É‰¥Ð½Á…¸½Á¥¹ Ý¥Ñ¡½ÕÐÍ•±•Ñ¥½¸±½ÍÌ¸¡•¬äÔÌ)ÕÐUYÌÍ•Á…É…Ñ•±äÝ¡•¸ÁÉ…Ñ¥…°ì¹¼äÔÌ…•ÁÑ…¹”¥¹™•ÉÉ•™É½´Ñ¡¥Ì‰ÕœÉ•Á½ÉÐ¸)9•áÐÉ•ÍÁ½¹Ñ¼äÔÐ‘•Ù¥”É•ÍÕ±ÑÌ‰•™½É”¹•ÜÍ•…´½Õ¹ÝÉ…À™•…ÑÕÉ•Ì¸9¼Ñ½Á½±½ä)É•Á…¥È½ÑÉ¥…¹Õ±…Ñ¥½¸Ý½É­…É½Õ¹½È™½É•…¡”µ±•…É¥¹œ¹••‘•™½ÈÉ•ÁÉ½‘Õ•‰Õœ¸((¸äÔÐ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨ÈÜàÌAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( äÔ¸ÅÌ¤°½É¥¥¹…°ÈÜÜØÉ•Ñ…¥¹•Á±ÕÌÍ•Ù•¸ÍÕÁÁ±¥•µ™¥±”½Á¥­•È½¥¹ÁÕÐ¥¹Ñ•É…Ñ¥½¹Ì¸)½ÕÍ•¹•Ü½¹…Ñ¥Ù”…”½Y•ÉÑ•à½™±½…Ñ¥¹œµ•‘”½•ÍÑÕÉ”½É•±•…Í”ÌáAML¸9¼½±…ÍÍ•ÉÑ¥½¹Ì)É•±…á•½ÈÉ•µ½Ù•¸UÁ±½…‘•=	(™¥áÑÕÉ”‰åÑ”µ¥‘•¹Ñ¥…°¸5…¥¸Í½ÕÉ”¡…¹•Ì½¹±ä)¡•±Á•È¥µÁ½ÉÐ…¹‘”Á¥­•È‰É…¹ ì‘¥É•Ðµ‰•Ù•°¥ÌÁ¥¸µ½¹±ä¸½µÁ½¹•¹Ð‘”Ñ½±”)…¹‘”µÁ…¥¹ÐÕÍ”•á¥ÍÑ¥¹œ¹…Ñ¥Ù”½Ý¹•Èì¹¼¹•ÜÁ½¥¹Ñ•È½•½µ•ÑÉä½¡¥ÍÑ½Éä¥µÁ±•µ•¹Ñ…Ñ¥½¸¸)I•Ù¥•Ý•…¡”±½ÍÕÉ”äÔÐì…”äÌÀ½5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸!½ÍÑ•½A…•Ì½±¥Ù”µ™¥±”)ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌì…ÑÕ…°äÔÐ¥A…Ñ…À½±¥À½É•Í•±•Ð…•ÁÑ…¹”Á•¹‘¥¹œ¸(((ŒŒ€¸äÔÐÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€äàå„ÅŒÅ„Á•˜äÄå„ÄÀÙ”ÈÌå…ˆÙŒàÕ™…™…Üàá•ŒÅ€°Ñ•ÍÑ•ÑÉ•”)€ÀÝ˜ÀÀÈÐá…ˆÔÁ”àá„Á”ÔÁ„àÉˆÜÄÈÜÔÝ‘„Á”ØÌÌåŒÙ€°ÁÕ‰±¥Í¡•½¸µ…¥¸¸±°ÄÔ‰±½‰Ì)…¹¥Ð…Ñ„ÑÉ•”µ…Ñ¡•±½…°¡…Í¡•Ìì™•Ñ¡•µ…¥¸µ…Ñ¡••á…ÐÑ•ÍÑ•ÑÉ•”…¹)¡•­½ÕÐ…±¥¹•±•…¹±ä¸1½…°9½‘”ÈÐ™Õ±°ÈÜàÍAML¼Á%0¼ÁÍ­¥À€ äÔ¸ÅÌ¤ì¡½ÍÑ•)9½‘”ÈÈÉÕ¸ÐÀÀÐÄÄäÈÄää½©½ˆÄÈÀÜÄÈÐÄØÀÀÐ½µÁ±•Ñ”±½ÌÙ•É¥™äÈÜàÌ¼À¼À€ ÈÐÐ¸ÑÌ¤¸)A…•ÌÐÀÀÐÄÄäÄÌàØ‰Õ¥±ÄÈÀÜÄÈÐÄÜÀäà½‘•Á±½äÄÈÀÜÄÈÔÔàÈÐÄMUML¸±°ÈÀ¡•­•±¥Ù”)™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°¹•ÜÁ¥­•È€¬¡…¹•µ…¥¸½Ñ½±”½‘”µÁ…¥¹Ð½	•Ù•°)±½…‘•ÈÉ…Á °É•½Ù•Éä°É•Ñ…¥¹•Ý½É­ÍÁ…”äÔÈ½UXäÔÌ½¥éµ¼äÔÌ½A•¹¥°…Ñ”½…”äÌÀ¼)5Õ±Ñ¤Ä¸À½±¥ÀÌÌÜ½¹…Ñ¥Ù”ÝÉ¥Ñ•È½ÁÉ½©•Ð½™É½é•¹	•Ñ„Ü¸=É¥¥¹…°ÕÁ±½…™¥áÑÕÉ”Õ¹¡…¹•¸)Q¡¥ÌÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±äìÑ•ÍÑ•½ÁÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”É•Ñ…¥¹•¸()	Õ¥±äÔÐ½µÁ±•Ñ”½É•…‘ä™½ÈM5µ™¥±”¥A…É•Ñ•ÍÐèÕ¹Í•±•Ñ•¥É±••‘”…¹¥ÑÌ)¹•¥¡‰½ÕÉÌ°½É‰¥Ð½é½½´½É•Í•±•Ð°½É¥¥¹…°±¥À‘—ŠI‘•Í•±•ÓŠIÉ•Í•±•Ð¹•Ü‘¥…½¹…°°)U¹‘½I•‘¼°µÕ±Ñ¤µ•‘”Í•±•Ñ¥½¸…¹™¥¹•È¹…Ù¥…Ñ¥½¸¸ÕÑ½µ…Ñ••á…Ðµ™¥±”½¹…Ñ¥Ù”)Á¥­•È…¹É•…°±¥À½¡¥ÍÑ½Éä½¥¹ÁÕÐ™¥áÑÕÉ•ÌÁ…ÍÌì…ÑÕ…°¥A…™••°½…ÁÁ•…É…¹”É•µ…¥¹Ì)Á•¹‘¥¹œ¸MÉ••¹Í¡½ÐäÔÈ™…¥±ÕÉ”É•ÁÉ½‘Õ•½¸Í…µ”Á¥­•È¥¸äÔÌì¹¼™½É•ÍÑ…±”µ…¡”)Ý½É­…É½Õ¹¸UÍ•ÈäÔÈU$½¡¥ÍÑ½ÉäAMLÁÉ½Ñ•Ñ•ìäÔÌÕÐUYÌ‘•Ù¥”…Ñ”É•µ…¥¹ÌÍ•Á…É…Ñ”¸)9•áÐ…ÑÕ…°äÔÐ™••‘‰…¬‰•™½É”™ÕÉÑ¡•ÈÕ¹ÝÉ…À½Í•…´™•…ÑÕÉ•Ìì¹¼¹•ÜäÔÌ¼äÔÐAML¥¹™•ÉÉ•¸(((ŒŒ€¸äÔÔƒŠP½Á±…¹…ÈMÑ¥Ñ UYÌì€¸äÔÌ…¹€¸äÔÐÕÍ•ÈAMLƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•È•áÁ±¥¥Ñ±ääÔÍAML…¹äÔÑAML€½¹•áÑ‰Õ¥±¸AÉ½Ñ•Ð½µÁ±•Ñ”‘”ÕÐUYÌ°)U¹‘½I•‘¼½A…¥¹Ð½M…Ù•=Á•¸…¹ÍÉ••¸µÁÉ½á¥µ¥Ñä‘”Ñ…É•Ñ¥¹œ°±¥À½É•Í•±•Ð°Í•±•Ñ•)¹•¥¡‰½ÕÈÑ½±”½A•¹¥°Á…¥¹ÐÍ•±•Ñ¥½¸…¹™¥¹•È¹…Ù¥…Ñ¥½¸¸äÔÈ•‘¥Ñ½ÈU$…•ÁÑ…¹”)…±Í¼É•Ñ…¥¹•¸AÉ¥½ÈÁ•¹‘¥¹œäÔÌ¼äÔÐ¹½Ñ•Ì‰•±½Ü…É”¡¥ÍÑ½É¥…°°ÍÕÁ•ÉÍ•‘•¡•É”¸)%¹‘•Á•¹‘•¹Ð…±Á¡„äÈä½Íµ½½Ñ µµ•Ñ…°É•™±•Ñ¥½¸…Ñ•Ì…É”¹½Ð¥µÁ±¥•…•ÁÑ•¸()Õ‘¥Ðµ…¥¸Ðàá”ÌÑ•”è¹¼ÍÑ¥Ñ •á¥ÍÑÌ¸=É¥¥¹…°¥¹ÍÁ•Ñ½È½Ý¹Ìµ…¹¥™½±…‘©…•¹ä…¹)¥Í±…¹µ•µ‰•ÉÍ¡¥Àì½É¥¥¹…°	½àÁÉ½©•Ñ¥½¸ÍÕÁÁ±¥•Ì„…¹½¹¥…°Á±…¹”µ…ÁÁ¥¹œì)½É¥¥¹…°½Á±…¹…ÈÍ••É½ÕÁ¥¹œäÔÄ°É¥A…¬…¹¹…Ñ¥Ù”½µµ¥Ð…±É•…‘ä•á¥ÍÐ¸)‘‘”É…‘¥…°½ÕÑ•ÈÄÄÈ¸×
ÀMÑ¥Ñ UYÌ°Ý¥Ñ …±°ÁÉ¥½ÈÁ½Í¥Ñ¥½¹ÌÕ¹¡…¹•¸M¥¹±”)ÕÉÉ•¹ÐÍ•±•Ñ•Í¡…É••‘”ì½É¥¥¹…°‰ÕÑÑ½¸½…Ñ¥½¸¡½ÍÐ¥¸5•Í¡!•…±Ñ …¹½É¥¥¹…°)É…‘¥…°½¹”µÍ¡½Ð½µÁ±•Ñ¥½¸¸9¼¹•ÜÁ½ÁÕÀ½É…Ü¥¹ÁÕÐ½¡¥ÍÑ½Éä½µ•Í ½ÑÉ¥…¹Õ±…Ñ¥½¸½Ý¹•È¸()¥ÉÍÐÍÑ¥Ñ ÍÕÁÁ½ÉÑÌQ]<¥Í±…¹‘Ì½¸M5½É¥•¹Ñ•™±…ÐÍ½ÕÉ”Á±…¹”°¹…Ñ¥Ù”½Á±…¥¸¼)¥¹‘•Á•¹‘•¹ÐÕ¹Á…¥¹Ñ•	…Í”µ•Í¡•Ì½¹±äìÄÈá™…•Ì¼ÈÁ-½É¹•ÉÌ¸á¥ÍÑ¥¹œÕÉÉ•¹Ð¡…ÉÑÌ)µÕÍÐ•… µ…Ñ …¹½¹¥…°Á±…¹”½½É‘¥¹…Ñ•ÌÕ¹‘•ÈÕ¹¥™½É´Í¥µ¥±…É¥Ñä½É•™±•Ñ¥½¸¸)5½Ù•½É½Ñ…Ñ•½Í…±•½™±¥ÁÁ•¡…ÉÑÌÍÕÁÁ½ÉÑ•ì¥¹Ñ•É¹…±±ä‘¥ÍÑ½ÉÑ•½Ý…ÉÁ•½‰•¹Ð¼)¹½¸µ½Á±…¹…È¡…ÉÑÌÉ•™ÕÍ”¸=É¥¥¹…°±½Ý•Èµ™…”¡…ÉÐÍÕÁÁ±¥•ÌÑ¡”™¥Ðìµ½Ù”Ñ¡”½Ñ¡•È)¥¹Ñ¼¥ÑÌÁ±…¹”™É…µ”°Í¹…À½µµ½¸Ù•ÉÑ•àµ%½É¹•ÉÌÑ¼=I%%90•á…Ð…¹¡½ÈÙ…±Õ•Ì¸)±°Í¡…É•‰½Õ¹‘…É¥•Ì‰•ÑÝ••¸Ñ¡…ÐÁ…¥È©½¥¸ì¹¼ÍÁ…Ñ¥…°Ý•±‘¥¹œ°Á•Èµ™…”Ñ½Á½±½ä)¡…¹•Ì½ÈÍ…Ù•Í•…´™±…Ì¸=É¥¥¹…°É¥A…¬Ñ¡•¸É•Á…­Ì10¥Í±…¹‘ÌÝ¥Ñ ½µµ½¸)Í…±”…¹½µµ¥ÑÌ=9¸5½Ù¥¹œ¡…ÉÐ‘•¹Í¥Ñä½½É¥•¹Ñ…Ñ¥½¸µ…Ñ¡•ÌÉ•Ñ…¥¹•¡…ÉÐ‰•™½É”)A…¬ìÕ¹Ñ½Õ¡•¡…ÉÐÍ¡…Á•Ì½É•±…Ñ¥Ù”‘•¹Í¥ÑäÉ•Ñ…¥¹•¸¥¹…°¥¹ÍÁ•Ñ½ÈµÕÍÐÉ•Á½ÉÐ)aP¥¹Ñ•¹‘•ÑÝ¼µÑ¼µ½¹”µ•µ‰•ÉÍ¡¥À°¹¼Õ¹É•±…Ñ•µ•É•Ì½ÍÁ±¥ÑÌ¸M…µ”µ¥Í±…¹©½¥¹•)•‘”¹¼µ½ÁÌì…¸¥¹Ñ•É¹…°Í±¥ÐÉ•™ÕÍ•Ì°…Ì¹¼Ý¡½±”µ¡…ÉÐ©½¥¸…¸É•Á…¥È¥Ð¸()±°½±½ÕÈ½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌÁ…¥¹ÐÉ•™ÕÍ•Ì‰•™½É”ÍÑ…¥¹œ½¡¥ÍÑ½Éä°Ý¥Ñ •áÁ±¥¥Ð)=‰©•ÐUX±•…ÈÁ…¥¹ÐÕ¥‘…¹”¸=É¥¥¹…°Õ¹ÍÕÁÁ½ÉÑ•Ñ…É•Ð½¡¥ÍÑ½Éä½™¥¹¥Ñ”½½±±…ÁÍ”¼)A…¬Õ…É‘ÌÉ•Ñ…¥¹•¸9¼•¹•É…°ÕÉÙ•Õ¹ÝÉ…À°Õ‰”µ¹•ÐÕ¹™½±‘¥¹œ°½ÁÑ¥µ…°Á…­¥¹œ°)…É‰¥ÑÉ…Éä½Ù•É±…ÀÉ•Á…¥È½ÈÁ…¥¹ÐÉ•Í…µÁ±¥¹œ¸9…Ñ¥Ù”Í½ÕÉ”é‰½á±…ˆ½É¹•ÈÍ¡•µ„°)•½µ•ÑÉä°ÁÉ½©•Ð½¡¥ÍÑ½Éä½•áÁ½ÉÐ½Ý¹•ÉÌÉ•µ…¥¸Õ¹¡…¹•¸…¹½¹¥…°	½à¥ÌÑÉ…¹Í¥•¹Ð)Ù…±¥‘…Ñ¥½¸½…±¥¹µ•¹Ð½¹±ä°¹½Ð„É•Á±…•µ•¹Ð±¥Ù”UXµ…ÁÁ¥¹œ½ÈÁ…É…±±•°­•É¹•°¸()M¥à¹•Ü¥¹Ñ•É…Ñ¥½¹ÌèÕÓŠIMÑ¥Ñ •á…Ð•¹‘Á½¥¹ÑÌ½•½µ•ÑÉä½Á••È¥Í½±…Ñ¥½¸½É•Á•…Ð¹¼µ½Àì)É½Ñ…Ñ•½Í…±•½µ¥ÉÉ½É••¥Ñ¡•È¡…ÉÐ…¹Í½ÕÉ”Í…±”½ÑÉ…¹Í±…Ñ¥½¸ìÕ¹É•±…Ñ•¥Í±…¹)µ•µ‰•ÉÍ¡¥Àì¹½¸µÁ±…¹…È½‘¥ÍÑ½ÉÑ•½‰½Õ¹‘…Éä½…µ‰¥Õ½ÕÌ½É•™ÕÍ•Ñ…É•ÑÌ…¹¡¥ÍÑ½Éä½Ý½É¬)…Ñ½µ¥¥Ñäì…ÑÕ…°U¹‘½I•‘¼½A…¥¹Ð½M…Ù•=Á•¸½1ì…ÑÕ…°‘”…±±‰…¬…¹É…‘¥…°±…Õ¹ ¼)ÁÕ¬É•ÍÑ½É…Ñ¥½¸¸=É¥¥¹…°äÔÌ¼äÔÐÍ•µ…¹Ñ¥Œ¡•­ÌÉ•Ñ…¥¹•¸=±ÜÄÌ¼ÜÀä‘”¥¹Ù•¹Ñ½Éä)¹½ÜÈÄ°É•Ñ…¥¹¥¹œ…±°ÁÉ•Ù¥½ÕÌ%Ì…¹Í¡…É•É½ÍÌµµ½‘”Á½Í¥Ñ¥½¹Ì¸½ÕÍ•¹•Ü½ÕÐ¼)Á¥­¥¹œ½É…‘¥…°½É•±•…Í”ÌÕAML¸Õ±°…¹ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌ¸=91dUX•‘¥Ð°)5•Í¡!•…±Ñ …±±‰…¬…¹¥éµ¼™Õ¹Ñ¥½¹…±¥Ñä¡…¹”ì½Ñ¡•ÈÉÕ¹Ñ¥µ”¡…¹•Ì…É”É•Ù¥•Ý•)UX½‘½5Õ±Ñ¤½1…ˆÉ•Ù•ÉÍ”±½…‘•ÈÁ¥¹ÌäÔÔ…¹Í¡•±°½É•½Ù•Éä¸5…¥¸äÔÐ½Á¥­•ÈäÔÐ½…”äÌÀ¼)5Õ±Ñ¤Ä¸À½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸9¼äÔÌ¼äÔÐ…•ÁÑ…¹”±½ÍÐ‘ÕÉ¥¹œÍ•…´Ý½É¬¸()Y%äÔÔèUXA±…¹”`È½dÄƒŠHÍ¡…É•‘”ÕÐUYÌƒŠHÍ•±•ÐM5•‘”ƒŠHMÑ¥Ñ UYÌ¸)UX‘¥Ñ½ÈÍ¡½ÝÌ½¹”©½¥¹•¥Í±…¹ìA•¹¥°µ½Ù”µ½Ù•Ì‰½Ñ ™…•Ì¸U¹‘½I•‘¼ÍÑ•ÁÌÑ¡É½Õ )ÍÑ¥Ñ ½ÕÐÍ•Á…É…Ñ•±ä¸5½Ù”½É½Ñ…Ñ”½Í…±”…¸¥Í±…¹‰•™½É”ÍÑ¥Ñ¡¥¹œìÍ…µ”™±…ÐÁ…Ñ )©½¥¹Ì½É”µÁ…­Ì¸A…¥¹Ð…™Ñ•ÈÍÑ¥Ñ °M…Ù•=Á•¸É•Ñ…¥¹ÌÉ•ÍÕ±Ð¸±É•…‘äµ©½¥¹•É•Á•…Ð)¹¼µ½ÁÌìÕÉÙ•½Í…µ”µÕ‰”µ½É¹•È™…•Ì½ÈÁ…¥¹Ñ•Ñ…É•ÑÌÉ•™ÕÍ”Ý¥Ñ¡½ÕÐ¡…¹¥¹œÝ½É¬¸)9•áÐ…ÑÕ…°äÔÔ‘•Ù¥”™••‘‰…¬‰•™½É”•áÁ…¹‘¥¹œÍÑ¥Ñ ½•¹•É…°Õ¹ÝÉ…ÀìÁÉ•Í•ÉÙ”)…•ÁÑ•äÔÌÕÑÌ¼äÔÐÁ¥­¥¹œ¼äÔÈU$…¹…±°ÁÉ½Ñ•Ñ•¹…Ù¥…Ñ¥½¸½µ½‘•±±¥¹œ‰•¡…Ù¥½È¸((´mátUMHäÔÌAMLèÕÐUYÌ€¼¥Í±…¹•‘¥Ñ¥¹œ€¼U¹‘½I•‘¼€¼A…¥¹Ð€¼M…Ù•=Á•¸ÁÉ½Ñ•Ñ•¸(´mátUMHäÔÐAMLèÍÕÁÁ±¥•½¹Ù•àµ•‘”Í•±•Ñ¥½¸€¼±¥ÀÉ•Í•±•Ð€¼¹…Ù¥…Ñ¥½¸ÁÉ½Ñ•Ñ•¸(´ltY%äÔÔèÕÐÑ¡•¸MÑ¥Ñ „™±…ÐUXA±…¹”ì¥Í±…¹•‘¥Ñ¥¹œ°U¹‘½I•‘¼…¹A…¥¹Ð½M…Ù•=Á•¸¸((¸äÔÔ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨ÈÜàäAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( äÌ¸ÑÌ¤°½É¥¥¹…°ÈÜàÌÉ•Ñ…¥¹•Á±ÕÌÍ¥àMÑ¥Ñ ¥¹Ñ•É…Ñ¥½¹Ì¸9•Ü½ÕÐ½…•ÁÑ•äÔÐ)Á¥­¥¹œ½É…‘¥…°½É•±•…Í”ÌÕAML¸=É¥¥¹…°äÔÌÍ½ÕÉ”µÑ•ÍÐ‰½Õ¹‘…É¥•Ì­•ÁÐ¥¹Ñ…Ð…™Ñ•È)¥¹¥Ñ¥…°¹•Üµ‰ÕÑÑ½¸Á±…•µ•¹Ð•áÁ½Í•„™¥áÑÕÉ”Í±¥”ì‰ÕÑÑ½¸‘•±…É…Ñ¥½¹ÌÁÉ••‘”)‰½Ñ …±±‰…­Ì°…¹½É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•µ…¥¸¸ÜÄÌ¼ÜÀä¥¹Ù•¹Ñ½Éä¹½ÜÈÄÝ¥Ñ •Ù•Éä)½±Ñ½½°É•Ñ…¥¹•¸9¼½±‰•¡…Ù¥½È…ÍÍ•ÉÑ¥½¸É•µ½Ù•½ÈÉ•±…á•¸5…¥¸½Á¥­•È½Ñ½±”¼)‘”µÁ…¥¹ÐäÔÐ°…”äÌÀ½5Õ±Ñ¤Ä¸À½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸I•Ù¥•Ý•äµ™¥±”É•Ù•ÉÍ”UX¼)‘½5Õ±Ñ¤½1…ˆ½¥éµ¼±½ÍÕÉ”äÔÔ…¹É•½Ù•ÉäÁ¥¹Ìì™Õ±°¡½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½ÝÌ¸)ÑÕ…°äÔÔ¥A…™••°½™±…ÐµÍÑ¥Ñ Ý½É­™±½Ü…•ÁÑ…¹”Á•¹‘¥¹œìäÔÌ¼äÔÐÕÍ•ÈAMLÁÉ½Ñ•Ñ•¸(((ŒŒ€¸äÔÔÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÁˆÄÀØÉ‘”ÐÔÄÌÈÝ˜åØàÔÈÐÍ…˜ÌÅ‰‰ŒÉ”ÐÑ‰„ÜäÅ€°Ñ•ÍÑ•ÑÉ•”)ŒàÉ™™”ÌÔàÀàÐÈÌØÈäÔÜÜÀÐàÙÕ„ÄÕ˜ÜàÅ˜ÀÁ”ÕŒÙ€°ÁÕ‰±¥Í¡•½¸µ…¥¸¸±°ÄàÕÁ±½…‘•)‰±½‰Ì…¹¥Ð…Ñ„ÑÉ•”µ…Ñ¡•±½…°¡…Í¡•Ìì™•Ñ¡•µ…¥¸µ…Ñ¡••á…Ñ±ä…¹±½…°)¡•­½ÕÐ…±¥¹•±•…¹±ä¸1½…°9½‘”ÈÐ™Õ±°ÈÜàåAML¼Á%0¼ÁÍ­¥À€ äÌ¸ÑÌ¤ì¡½ÍÑ•)9½‘”ÈÈÉÕ¸ÐÀÀÐÔàÔÄÈÔÀ½©½ˆÄÈÀÜÈÜÈàÀÀàà½µÁ±•Ñ”±½ÌÙ•É¥™äÈÜàä¼À¼À€ ÈÐÐ¸åÌ¤¸)A…•ÌÐÀÀÐÔàÔÄÈÈÔ‰Õ¥±ÄÈÀÜÈÜÈàÌÜàà½‘•Á±½äÄÈÀÜÈÜÐÄÀØäÔMUML¸±°ÈÀ¡•­•±¥Ù”)™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°=5A1Q¡…¹•UX½‘½5Õ±Ñ¤½1…ˆ½¥éµ¼É…Á °)É•½Ù•Éä°É•Ñ…¥¹•äÔÐµ…¥¸½Á¥­•È½½µÁ½¹•¹ÐµÑ½±”½‘”µÁ…¥¹Ð°Ý½É­ÍÁ…”äÔÈ½…”äÌÀ¼)5Õ±Ñ¤Ä¸À½™É½é•¹	•Ñ„Ü¸ÑÕ…°½É¥¥¹…°µ…­•A±…¹” È°È°Ä¤­…ÕÑ½µ…Ñ¥Œah¹…Ñ¥Ù”UX½Ý¹•È)…±Í¼Íµ½­”µÑ•ÍÑ•ÕÓŠIMÑ¥Ñ£ŠI½¹”¥Í±…¹¸Q¡¥ÌÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì)½¹±äìÑ•ÍÑ•½ÁÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”É•Ñ…¥¹•¸UÍ•ÈäÔÌ…¹äÔÐAMLÉ•½É‘•½ÁÉ½Ñ•Ñ•¸()	Õ¥±äÔÔ½µÁ±•Ñ”…¹É•…‘äèÕ¹Á…¥¹Ñ•UXA±…¹”`È½dÄƒŠHÍ¡…É•‘”ÕÐUYÌƒŠHM5)Í•±•Ñ•Í•…´MÑ¥Ñ UYÌƒŠH=‰©•ÐUX‘¥Ñ½ÈÍ¡½ÝÌ=9©½¥¹•¥Í±…¹¸A•¹¥°¥Í±…¹)µ½Ù”µ½Ù•Ì‰½Ñ ™…•ÌìU¹‘½I•‘¼É•ÍÑ½É•Ì½É•…ÁÁ±¥•ÌÍÑ¥Ñ Í•Á…É…Ñ•±ä™É½´ÕÐ¸A…¥¹Ð)Ñ¡•¸M…Ù•=Á•¸É•Ñ…¥¹Ì±…å½ÕÐ½É•ÍÕ±Ð¸]¡½±”ÑÝ¼¡…ÉÑÌµÕÍÐÍ¡…É”½¹”™±…ÐÍ½ÕÉ”)Á±…¹”ìÕÉÙ•½Õ‰”µ½É¹•È½‰•¹Ð¡…ÉÑÌÉ•™ÕÍ”°¹¼•¹•É…°Õ¹ÝÉ…À½ÈÍ•…´É•¥Á”¸)ÑÕ…°äÔÔ¥A……ÁÁ•…É…¹”½™••°É•µ…¥¹ÌÁ•¹‘¥¹œ¸9•áÐ…ÑÕ…°äÔÔ™••‘‰…¬‰•™½É”‰É½…‘•È)ÍÑ¥Ñ ½Õ¹ÝÉ…ÀÝ½É¬ìÉ•Ñ…¥¸…•ÁÑ•äÔÌÕÑÌ¼äÔÐÁ¥­¥¹œ¼äÔÈU$…¹½É¥¥¹…°½Ý¹•ÉÌ¸(((ŒŒ€¸äÔØƒŠP‰½Õ¹‘•…¹±”µ‰…Í•ÕÑ¼…Ñ±…Ìì€ÐÀäØµ™…”±¥µ¥ÐƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈÉ•ÅÕ•ÍÑÌ…ÕÑ½µ…Ñ¥Œ½¹¹•Ñ•µ™…”ÍÑ¥Ñ¡¥¹œ‘ÕÉ¥¹œ…Ñ±…Ì•¹•É…Ñ¥½¸°„ÁÉ…Ñ¥…°)™…”±¥µ¥Ð°‰½Õ¹‘•ÉÕ¹Ñ¥µ”°Ñ¡•¸ÍÕ•ÍÑÌ•‘”…¹±”¸±Í¼…Í­ÌÝ¡•Ñ¡•È¹…µ•(¹‰½á±…ˆÍ…Ù•Ì…¸½Ù•ÉÝÉ¥Ñ”•á¥ÍÑ¥¹œ½Ý¹±½…‘Ì™¥±•Ì¸9¼äÔÔ‘•Ù¥”AML¥¹™•ÉÉ•ì(äÔÌÕÐUYÌ¼äÔÐÁ¥­¥¹œ¼äÔÈ•‘¥Ñ½È…•ÁÑ…¹”É•µ…¥¸ÁÉ½Ñ•Ñ•¸()Õ‘¥Ðµ…¥¸ÌäÌäÜáˆÌè½Á±…¹…È…Ñ±…Ì…±É•…‘ä©½¥¹Ì™±…Ð¡…ÉÑÌÑ¡É½Õ ½É¥¥¹…°)¥¹ÍÁ•Ñ½È…‘©…•¹ä€¬	½àÁÉ½©•Ñ¥½¸°‰ÕÐÝ…Ì±…‰•±±•Í•½¹‘…Éä…¹…ÁÁ•ÄÈá™…•Ìì)A…¬½‘•¹Í¥Ñä…±Í¼ÄÈàÝ¥Ñ ™¥á•È”…ÁÌ°…¹±½‰…°Á±…¹”Í••Í•…É Ý…ÌÅÕ…‘É…Ñ¥Œ¸)I•ÕÍ”M5•á¥ÍÑ¥¹œ‰ÕÑÑ½¸½½Ý¹•È…ÌÁÉ¥µ…ÉäÕÑ¼…Ñ±…Ì€¡‰•™½É”•áÁ±¥¥Ð…”…Ñ±…Ì¤°)…‘©½¥¸…¹±”ÃŠLÌÃ
À½‘•™…Õ±ÐÄÔ¸A$É•…Ñ•½Á±…¹…ÉÑ±…ÍUXÍ¥áÑ ½ÁÑ¥½¹…°…¹±”‘•™…Õ±ÑÌÀ°)ÁÉ•Í•ÉÙ¥¹œ…•ÁÑ•™±…Ð½ÕÑÁÕÑÌ…¹µ…¹Õ…°äÔÔÁ±…¹”É½ÕÁ¥¹œ¸Ã
À€ô•á…ÐÁÉ¥½È)½Á±…¹…ÈÁ½±¥ä¸A½Í¥Ñ¥Ù”…¹±”É•ÅÕ¥É•Ì	=Q …‘©…•¹Ð…Ù•É…”™…”µ¹½Éµ…°…¹±”)…¹„™¥á•Í••µ¹½Éµ…°½¹”Ý¥Ñ¡¥¸ÕÑ½™˜°½ÁÁ½Í¥Ñ”µ…¹¥™½±•‘”‘¥É•Ñ¥½¹Ì…¹)aP½É¥¥¹…°	½àUX•¹‘Á½¥¹ÑÌ¸9¼‘É¥™Ð…±½¹œÕÉÙ•¡…¥¹Ì°½½É‘¥¹…Ñ”Ý•±‘¥¹œ°)Í•½¹ÑÉ¥…¹Õ±…Ñ½È½…‘©…•¹ä½¡¥ÍÑ½Éä½Ý¹•È½È…±±ÌÑ¼µ…¹Õ…°MÑ¥Ñ ¥¸„±½½À¸()Q¡¥Ì¥Ì‰½Õ¹‘•ÁÉ½©•Ñ•µ¡…ÉÐÉ½ÕÁ¥¹œ°¹½Ð½¹™½Éµ…°Õ¹ÝÉ…À½É•±…á…Ñ¥½¸½È…É‰¥ÑÉ…Éä)Õ‰”µ¹•ÐÕ¹™½±‘¥¹œ¸¥™™•É•¹Ð	½à‘¥É•Ñ¥½¹ÌÉ•µ…¥¸Í•…µÌì¡¥¡•È…¹±”µ…äÍÑÉ•Ñ ¸)]…ÉÁ•™…•ÌÍÑ…äÍ•Á…É…Ñ”…ÐÃ
À°µ…ä©½¥¸¥¸…¹±”µ½‘”¥˜½É¥¥¹…°äÔÀÑÉ¥…¹±”½…É•„)Ù…±¥‘…Ñ¥½¸ÍÕ••‘Ì¸9¼Í½ÕÉ”Á½±å½¹Ì½Á½Í¥Ñ¥½¹Ì½É½ÕÁÌ½ÈÁ•ÉÍ¥ÍÑ•¹ÐÍ¡•µ„¡…¹•Ì¸)=É¥¥¹…°ÁÉ¥Ù…Ñ”	½àƒŠHÉ½ÕÁ•‘•¹Í¥ÑäƒŠHA…¬ƒŠH=9¹…Ñ¥Ù”½µµ¥ÐÉ•Ñ…¥¹•¸±°Á…¥¹Ð)¡…¹¹•±ÌÍÑ¥±°É•ÅÕ¥É”•áÁ±¥¥Ð±•…ÈÁ…¥¹ÐìÕ¹ÍÕÁÁ½ÉÑ•½ÍÑ…±”½¡¥ÍÑ½Éä½Ý½É¬É•™ÕÍ…°)…Ñ½µ¥Œ¸áÁ±¥¥Ð…”…Ñ±…ÌÉ•Ñ…¥¹Ì½¹”¥Í±…¹Á•È™…”…¹•á…ÐÍµ…±°½ÕÑÁÕÑÌ¸()Ñ±…Ì™…”…ÀÐÀäØ€ ÌË\ÄÈà¤°½É¥¥¹…°ÈÁ,™…”µ½É¹•È‰Õ‘•ÐÉ•Ñ…¥¹•¸M¡…É•A…¬…±°)…¹ÅÕ…±¥é”‘•¹Í¥ÑäÍÕÁÁ½ÉÐÐÀäØ¥Í±…¹‘ÌÍ¼±…É”…Ñ±…ÌÉ•µ…¥¹Ì•‘¥Ñ…‰±”¸5…¹Õ…°äÔÔ)MÑ¥Ñ ÍÑ¥±°¡…Ì¥ÑÌ¥¹‘•Á•¹‘•¹Ð½¹Í•ÉÙ…Ñ¥Ù”ÄÈàµ™…”Í½Á”¸=É¥¥¹…°€ðôÄÈàµ¥Í±…¹)Á…­¥¹œ…ÀÈ”…¹•á…Ð½ÕÑÁÕÐÉ•Ñ…¥¹•ì±…É•È±…å½ÕÑÌÕÍ”…À€¸È½•¥°¡ÍÅÉÐ¡½Õ¹Ð¤¤°)½ÕÑ•Èµ…É¥¸È”°M5‘•Ñ•Éµ¥¹¥ÍÑ¥Œ½µµ½¸µÍ…±”É¥Í•…É €¡…Ðµ½ÍÐÐÀäØ½±Õµ¹Ì¤¸)ÐÐÀäØ¡…ÉÑÌÑ¡¥Ì¥ÍøÌ¸ÉÁà…À½¸ÄÀÈÐµ…ÁÌì¹¼±…É•ÈÑ•áÑÕÉ”É•Í½±ÕÑ¥½¸±…¥µ•¸()M…µ”Á±…¹”½½¹”É½ÕÁ¥¹œ½Ý¹•È¹½Ü¥¹‘•á•ÌÍ••‰Õ­•ÑÌ™½È€øÄÈá™…•Ìèµ…ààÄ‰Õ­•Ð)±½½­ÕÁÌ¼ØÐÍ••…¹‘¥‘…Ñ•ÌÁ•È™…”€ ÈÜ±½½­ÕÁÌ™½ÈÁ½Í¥Ñ¥Ù”…¹±”¤°Ñ¡•¸=I%%90)ÍÑÉ¥ÐÍ••Ñ•ÍÑÌ¸=Ù•É±½…‘•‰Õ­•ÑÌ½¹Í•ÉÙ…Ñ¥Ù•±ä±•…Ù”•áÑÉ„¡…ÉÑÌÍ•Á…É…Ñ”¸)Mµ…±°™¥á•µÁ±…¹”½ÕÑÁÕÐÁ…Ñ Õ¹¡…¹•ì¹¼¥Ñ•É…Ñ¥Ù”ÍÑ¥Ñ¡¥¹œ½É•±…á…Ñ¥½¸½½ÁÑ¥µ…°)Á…­•È¸!½ÍÐÍµ½­”ÐÀäØµ™…”½É¥¥¹…°‘A±…¹”èÄ×
ÀÕÑ¼ÌÐ¸ÙµÌ°Ã
ÀÐÐ¸ÑµÌ±…”ÄØ¸ÝµÌì)Ñ¡•Í”…É”Í¥¹±”±½…°AT½‰Í•ÉÙ…Ñ¥½¹Ì°9=P¥A…±…Ñ•¹ä½È„Ñ¥µ¥¹œÁÉ½µ¥Í”¸()M•Ù•¸¹•Ü¥¹Ñ•É…Ñ¥½¹Ì½Ù•ÈÐÀäØµ™…”ÕÑ¼½…”°•á…Ð©½¥¹Ì½•½µ•ÑÉä½Á••È½Ý¹•ÉÍ¡¥À¼)É•Á•…Ð½½¹”¡•­Á½¥¹Ðì±…É”A…¬½‘•¹Í¥Ñä…¹É•‘Õ•Ý…ÍÑ•UX…É•„ìÝ…ÉÁ•™…±±‰…¬¼)‘¥Í½¹¹•Ñ•Á±…¹•Ìì±¥µ¥ÑÌ½É•™ÕÍ…±Ìì…ÑÕ…°ÄÀÈÐµ™…”¡¥ÍÑ½Éä½Á…¥¹Ð½M…Ù•=Á•¸½1ì)ÁÉ¥µ…Éä•á¥ÍÑ¥¹œU$½…¹±”™½ÉÝ…É‘¥¹œì•á…ÐÍ…µ”É•ÅÕ•ÍÑ•‘½Ý¹±½…™¥±•¹…µ”ÑÝ¥”ì)…¹Í¡…±±½Ü½Í¡…ÉÀ…¹±”Ñ¡É•Í¡½±‘Ì°™¥á•µ½¹”‘É¥™Ð…¹ÈÔØµ™…”™…ÍÐÁ…Ñ ¸á¥ÍÑ¥¹œ(ÄÈàµ‰½Õ¹‘…ÉäÉ•™ÕÍ…°™¥áÑÕÉ•ÌàäÌ¼àäÔ¼äÐä¼äÔÄ¼äÔÌµ½Ù•Ñ¼ÐÀäÜÝ¥Ñ¡½ÕÐ‘É½ÁÁ¥¹œ…¹ä)…Ñ½µ¥¥Ñä…ÍÍ•ÉÑ¥½¸ìÁÉ¥½ÈÄÈàÍÕ•ÍÌÑ•ÍÑÌÉ•Ñ…¥¹•¸äÔÄÁ…¹•°™¥áÑÕÉ”•áÁ±¥¥Ñ±äÃ
À¸)=É¥¥¹…°½Ñ¡•ÈÉÕ¹Ñ¥µ”…±½É¥Ñ¡µÌÉ•Ñ…¥¹•ì™Õ±°…¹ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌ¸()M…Ù”…Õ‘¥ÐèÁÉ½©•Ñ¥±•9…µ”½•áÁ½ÉÑ	…Í¥AÉ½©•Ð…±É•…‘äÉ•ÅÕ•ÍÐaP¡½Í•¸¹…µ”°)¹¼…ÁÁ•¹‘•½Õ¹Ñ•È¸M…™…É¤½¥=L½Ý¹±½…‘Ì½±±¥Í¥½¸¹…µ¥¹œ¥Ì½ÕÑÍ¥‘”Ñ¡¥Ì‘½Ý¹±½…)A$¸ÕÉÉ•¹Ð58ÁÉ¥µ…Éä½µÁ…Ñ¥‰¥±¥Ñä‘…Ñ„É•½É‘ÌÍ¡½ÝM…Ù•¥±•A¥­•ÈÕ¹ÍÕÁÁ½ÉÑ•)¥¸M…™…É¤½¥=Lì¡É½µ”ÌA$‘½Õµ•¹Ñ…Ñ¥½¸•áÁ±¥¥Ñ±äÍ…åÌ…¹¡½Èµ‘½Ý¹±½…™…±±‰…¬)…¹¹½Ð½Ù•ÉÝÉ¥Ñ”¸9¼É¥Í­äÉ•Á±…•µ•¹Ð½¡¥‘‘•¸¥¹Ñ•É¹…°Í…Ù”½¹•Ü™¥±•ÍåÍÑ•´™•…ÑÕÉ”)…‘‘•¸á¥ÍÑ¥¹œM…Ù”½=Á•¸½½‘•ŒÕ¹¡…¹•ìÉ•É•ÍÍ¥½¸ÁÉ½Ù•ÌÑÝ¼¥‘•¹Ñ¥…°É•ÅÕ•ÍÑ•)¹…µ•Ì¸M½ÕÉ•Ì¡•­•ÈÑ=ÐÈÀÈØè)¡ÑÑÁÌè¼½É…Ü¹¥Ñ¡Õ‰ÕÍ•É½¹Ñ•¹Ð¹½´½µ‘¸½‰É½ÝÍ•Èµ½µÁ…Ðµ‘…Ñ„½µ…¥¸½…Á¤½]¥¹‘½Ü¹©Í½¸)¡ÑÑÁÌè¼½‘•Ù•±½Á•È¹¡É½µ”¹½´½‘½Ì½…Á…‰¥±¥Ñ¥•Ì½Ý•ˆµ…Á¥Ì½™¥±”µÍåÍÑ•´µ…•ÍÌÁ½±å™¥±±¥¹œ()Y%äÔØèÁÉ•Ù¥½ÕÍ±ä½Ù•ÈÄÈàµ™…”Õ¹Á…¥¹Ñ•µ•Í ƒŠH=‰©•ÐUXƒŠHÕÑ¼…Ñ±…ÌÄ×
Àì)¡•¬Ñ¥µ”…¹¡…ÉÐ½Õ¹Ð¸½µÁ…É”Ã
À¼Ä×
À½¸Í¡…±±½Ü‰•¹‘Ì°Í¡…ÉÁ•È½É¹•ÉÌÉ•Ñ…¥¸)Í•…µÌìÉ•…Ñ•È…¹±•Ìµ…äÍÑÉ•Ñ ¸UX‘¥Ñ½È½A…¬½U¹‘½I•‘¼ìA…¥¹Ð…¹M…Ù•=Á•¸É•ÍÕ±Ð¸)9•Ü±¥µ¥ÑÌÐÀäÙ™…•Ì¼ÈÁ-½É¹•ÉÌ°¹½ÐÕ¹±¥µ¥Ñ•¸9•áÐ™½±±½ÜÉ•…°¥A…ÅÕ…±¥Ñä½±…Ñ•¹ä)™••‘‰…¬‰•™½É”‰É½…‘•¹¥¹œÕ¹ÝÉ…ÀìäÔÔµ…¹Õ…°MÑ¥Ñ ‘•Ù¥”…Ñ”É•µ…¥¹ÌÍ•Á…É…Ñ”¸((ŒŒUÍ•ÈÁÉ½‘ÕÐ‘¥É•Ñ¥½¸ƒŠPA…¥¹Ð°™…•É½ÕÁÌ…¹É…Á¡¥…°U$ƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äÍ…åÌÑ¡•Í”…É”UQUIU%1%9L°¹½Ð¥µµ•‘¥…Ñ”É•ÅÕ•ÍÑÌÑ¼¥µÁ±•µ•¹Ð)…±°½˜Ñ¡•´¥¸äÔØ¸AÉ•Í•ÉÙ”ÕÉÉ•¹Ð…Ñ±…Ì‰Õ¥±Í½Á”¸ÕÑÕÉ”‘¥É•Ñ¥½¸è(´A…¥¹Ð™…•É½ÕÁÌ‘¥É•Ñ±ä½¸Ñ¡”µ•Í è…ÍÍ¥¸•á¥ÍÑ¥¹œµ•Í ¹™…•É½ÕÁÌÁ•ÈÁ½±å½¸°(€¹½ÐIÑ•áÑÕÉ”Á¥á•±Ì¸á¥ÍÑ¥¹œ±½¹”½¡¥ÍÑ½Éä½ÁÉ½©•Ð½=	(½9=4É½ÕÀ½Ý¹•ÉÌÍÑ…ä(€…ÕÑ¡½É¥Ñ…Ñ¥Ù”¸I•ÕÍ”ÍÕÉ™…”™…”Á¥­¥¹œ½A•¹¥°½¹…Ù¥…Ñ¥½¸ì„UXµ™É•”É½ÕÀµÑ…É•Ð(€¹••‘Ì‘•±¥‰•É…Ñ”Ñ…É•ÐÙ…±¥‘…Ñ¥½¸É…Ñ¡•ÈÑ¡…¸ÁÉ•Ñ•¹‘¥¹œÕÉÉ•¹ÐUXÁ…¥¹Ñ•È…±É•…‘ä(€ÍÕÁÁ½ÉÑÌ¥Ð¸=¹”Í•¹”¡•­Á½¥¹ÐÁ•ÈÍÑÉ½­”ì¹¼Á…É…±±•°µ•Í ½É½ÕÀ½¡¥ÍÑ½Éä­•É¹•°¸(´	É¥¹œÁÉ½‘ÕÑ¥½¸A…¥¹Ð¥¹Ñ¼µ…¥¹ÍÑÉ•…´…ÁÀ…•ÍÌìÕÉÉ•¹ÐÙ¥•ÝÁ½ÉÐµÁ…¥¹Ð¹©Ì±…Õ¹¡•È(€¥Ì¥¸¥±”¸I•½¹¹•Ð½É¥¥¹…°Á…¥¹Ñ•È½Í•ÍÍ¥½¸°¹½Ð„Í•½¹Á…¥¹Ñ¥¹œ¥µÁ±•µ•¹Ñ…Ñ¥½¸¸(´½¹Ñ•áÑÕ…°Á…¥¹ÐÉ…‘¥…°™½È‰ÉÕÍ¡•Ì…¹±…å•ÉÌ½µ…Í­Ì°É•Ñ…¥¹¥¹œ½É¥¥¹…°½¹ÑÉ½±Ì¼(€…Ñ¥½¸½Ý¹•ÉÌ…¹Ñ¡”…•ÁÑ•±•™Ð‘½¬Õ¹Ñ¥°‘•±¥‰•É…Ñ•±äµ¥É…Ñ•…¹Ñ•ÍÑ•¸(´5½É”É…Á¡¥…°U$è½¹Í¥ÍÑ•¹Ð™Õ¹Ñ¥½¸¥½¹ÌÝ¥Ñ M510Y%M%	1Ñ•áÐ…ÁÑ¥½¹Ì‰•±½Ü°(€¥¹ÍÁ¥É•‰äÕÍ•ÈÌÕÁ±½…‘•9½µ…MÕ±ÁÐÍÉ••¹Í¡½ÐÁÙÙÌÌ´ÄÀäÜ´ÐÄåµØØ´ÔÉäÑÄáàÐÄ¸(€-••ÀÉ•…‘…‰±”±…‰•±Ì½…•ÍÍ¥‰¥±¥Ñä½Ñ½Õ Ñ…É•ÑÌì½¡•É•¹Ð¥½¸™…µ¥±ä…¹…Ñ¥Ù”ÍÑ…Ñ”¸(€MÑ…”¡…¹•Ì¥¸Íµ…±°É•Ù¥•Ý•ÍÕÉ™…•ÌìÉ•Ñ…¥¸…•ÁÑ•É…‘¥…°±½…Ñ¥½¹Ì°•ÍÑÕÉ•Ì°(€½ÕÌ°¡¥ÍÑ½Éä…¹µ½‘•±±•È‰•¡…Ù¥½È¸9¼Ý¡½±•Í…±”É•Í­¥¸…ÕÑ½µ…Ñ¥…±±ä…ÕÑ¡½É¥é•(€…ÌÑ¡”¹•áÐÕ¹Ñ•ÍÑ•¡…¹”¸Q¡•Í”‘¥É•Ñ¥½¹ÌÉ•µ…¥¸¥¸É½…‘µ…À…™Ñ•È…Ñ±…Ì™••‘‰…¬¸()Õ‘¥Ðèµ•Í ¹©ÌÍÑ½É•ÌÍÑÉ¥¹œ½¹Õ±°™…•É½ÕÁÌ…¹ÁÉ•Í•ÉÙ•ÌÑ¡•´½¸±½¹”ì½É¥¥¹…°)™…•É½ÕÀµ½±½ÕÉÌµ½É”‘¥ÍÁ±…åÌÑ¡•´¸AÉ•Ù¥•Ü…±É•…‘ä¡…ÌÍ½ÕÉ”µ™…”ÑÉ¥…¹±”µ…ÁÁ¥¹œ¸(äÔØ‘½•Ì¹½ÐÍ¡¥À™…•É½ÕÀ‰ÉÕÍ¡•Ì°¹•ÜA…¥¹Ð•¹ÑÉä°Á…¥¹ÐÉ…‘¥…°½È¥½¸É•‘•Í¥¸¸((¸äÔØ™¥¹…°±½…°9½‘”ÈÐ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨ÈÜäØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( ÄÀÄ¸ÕÌ¤°½É¥¥¹…°ÈÜàäÁ±ÕÌÍ•Ù•¸¹•Ü…Ñ±…Ì½…¹±”½Í…Ù”µ¹…µ”¡•­Ì¸½ÕÍ•…Ñ±…ÌäÐä¼(äÔÀ¼äÔÄ°ÕÐäÔÌ½ÍÑ¥Ñ äÔÔ°A…¬½‘•¹Í¥Ñä½É•±•…Í”ÔÅAML¸=¹±ä½É¥¥¹…°±¥µ¥Ðµ‰½Õ¹‘…Éä)™¥áÑÕÉ•Ìµ½Ù•Ñ¼É•ÅÕ•ÍÑ•ÐÀäÜì…Ñ½µ¥ŒÉ•™ÕÍ…°…¹ÁÉ¥½ÈÄÈàÍÕ•ÍÌÉ•Ñ…¥¹•¸)=É¥¥¹…°äÔÄÁ…¹•°™¥áÑÕÉ”•áÁ±¥¥Ñ±ä¡½½Í•ÌÃ
ÀÕ¹‘•È¹•ÜU$…¹±”™½ÉÝ…É‘¥¹œ¸9¼)Í­¥ÁÁ•‰•¡…Ù¥½È¡•­Ì¸I•Ù¥•Ý•àµ™¥±”UX½‘½5Õ±Ñ¤½1…ˆÉ•Ù•ÉÍ”…¡”±½ÍÕÉ”äÔØì)µ…¥¸½Á¥­¥¹œäÔÐ½¥éµ¼äÔÔ½Ý½É­ÍÁ…”äÔÈ½5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸M…Ù”½=Á•¸½Ý¹•È…±Í¼)Õ¹¡…¹•ìM…™…É¤•áÑ•É¹…°µ‘½Ý¹±½…½Ù•ÉÝÉ¥Ñ”±¥µ¥Ñ…Ñ¥½¸Ù•É¥™¥•™É½´ÁÉ¥µ…ÉäÍ½ÕÉ•Ì¸)!½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½ÝÌ¸9¼äÔÔ½ÈäÔØ‘•Ù¥”AML¥¹™•ÉÉ•¸(((ŒŒ€¸äÔØÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”½µµ¥Ð˜ÁˆÜäÁ™•ÔÉ•‰™ˆÄäÄØäåÕˆå„ÌÁ•”ÄàÜäÉˆääÕ‰€½¸µ…¥¸ì•á…ÐÑ•ÍÑ•ÑÉ•”)€ÈÜÀÉ‰ˆàÙŒÜØå”á„àÔÑ‰˜äá˜ÌåàÕ…ŒÑ”ÐàÉá€¸1½…°9½‘”ÈÐ¸Ää¸ÀèÈÜäØAML°(À%0¼ÀÍ­¥ÁÁ•€ ÄÀÄÔÀÄ¸ÙµÌ¤ì™½ÕÍ•…Ñ±…Ì½Á…¬½‘•¹Í¥Ñä½É•±•…Í”èÔÄAML¸)!½ÍÑ•9½‘”ÈÈQ½Á½±½äÉ•É•ÍÍ¥½¸ÉÕ¸ÐÀÀÐÜÜÌÌØÀÔ½©½ˆÄÈÀÜÌÌÄàÜÜØÐMUMLè(ÈÜäØAML°À%0¼À…¹•±±•¼ÀÍ­¥ÁÁ•€ ÄÐØÐÈÄ¸ÉµÌ¤°½µÁ±•Ñ•ÈÀÈØ´ÄÀ´ÈÑPÀÄèÀÈèÐÙh¸)¡ÑÑÁÌè¼½¥Ñ¡Õˆ¹½´½É¥Í	•éè½	½á1…ˆ½…Ñ¥½¹Ì½ÉÕ¹Ì¼ÐÀÀÐÜÜÌÌØÀÔ)A…•ÌÉÕ¸ÐÀÀÐÜÜÌÌÌÜÀMUML¸…¡”µ‰ÕÍÑ•ÁÕ‰±¥ŒQÌèÈÀ¼ÈÀ‰åÑ”µ¥‘•¹Ñ¥…°Ñ¼Ñ•ÍÑ•)¡•­½ÕÐ°¥¹±Õ‘¥¹œÙ•ÉÍ¥½¸½¥¹‘•à°…±°àÉ•Ù¥•Ý•UX½‘½5Õ±Ñ¤½1…ˆ¡…¹•…ÍÍ•ÑÌ°)É•±•…Í”±½…‘•ÉÌ°ÁÉ½Ñ•Ñ•äÔÐµ…¥¸½Á¥­•È½Ñ½±”½•‘”µÁ…¥¹Ð°äÔÈÝ½É­ÍÁ…”°äÔÔ¥éµ¼°(äÌÀ…”‰…Ñ¡¥¹œ±5Õ±Ñ¤Ä¸À…¹™É½é•¸‰•Ñ„Üµ…É­•È¸¥ÉÍÐÁÉ”µ‘•Á±½åµ•¹ÐPÉ•ÑÕÉ¹•)½±ÉÕ¹Ñ¥µ”ì™É•Í É•ÅÕ•ÍÑÌ…™Ñ•È‘•Á±½åµ•¹Ðµ…Ñ¡••Ù•Éä™¥±”¸9¼µ¥á•±¥Ù”‰Õ¥±¸)¡ÑÑÁÌè¼½¥Ñ¡Õˆ¹½´½É¥Í	•éè½	½á1…ˆ½…Ñ¥½¹Ì½ÉÕ¹Ì¼ÐÀÀÐÜÜÌÌÌÜÀ()I•…‘ä™½ÈY%äÔØèÁÉ•Ù¥½ÕÍ±ä½Ù•ÈÄÈàµ™…”Õ¹Á…¥¹Ñ•µ½‘•°ƒŠH=‰©•ÐUXƒŠHÕÑ¼…Ñ±…Ì(Ä×
Àì¥¹ÍÁ•Ð¥Í±…¹‘Ì½Ñ¥µ”¸½µÁ…É”Ã
À¼Ä×
ÀÍ¡…±±½Ü‰•¹‘Ì…¹Í¡…ÉÀÍ•…´É•Ñ•¹Ñ¥½¸¸)U¹‘¼½I•‘¼°Á…¥¹Ð„¹•Üµ…À°Ñ¡•¸€¹‰½á±…ˆM…Ù”½=Á•¸Í¡½Õ±ÁÉ•Í•ÉÙ”UYÌ…¹Á…¥¹Ð¸(äÔÌ¼äÔÐ¼äÔÈAMLÁÉ½Ñ•Ñ•¸9¼äÔÔ¼äÔØ‘•Ù¥”AML¥¹™•ÉÉ•¸ÕÑÕÉ”™…•É½ÕÀ‰ÉÕÍ¡•Ì°)µ…¥¹ÍÑÉ•…´A…¥¹Ð…•ÍÌ°Á…¥¹Ð½±…å•ÈÉ…‘¥…°…¹…ÁÑ¥½¹•¥½¸U$É•µ…¥¸É•½É‘•)É½…‘µ…À‘¥É•Ñ¥½¹Ìì¹½¹”…É”Á…ÉÐ½˜äÔØÉÕ¹Ñ¥µ”¸M…™…É¤½Ù•ÉÝÉ¥Ñ”±¥µ¥Ñ…Ñ¥½¸É•µ…¥¹Ì)‰É½ÝÍ•Èµ½Ý¹•ìM…Ù”½=Á•¸™¥±•¹…µ”½Ý¹•ÈÕ¹¡…¹•¸½Ìµ½¹±äÁÉ½½˜½µµ¥Ð™½±±½ÝÌ¸((ŒŒ€¸äÔÜƒŠPÙ…É¥…‰±”µÍ¥é”Í¡•±˜Á…­¥¹œì€¸äÔØAMLƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸äÔØAML€½¹•áÑ‰Õ¥±ÁÉ½Ñ•ÑÌ…¹±”ÕÑ¼…Ñ±…Ì…¹±…É•È±¥µ¥ÑÌ¸Õ‘¥Ðµ…¥¸(àÉ‘‘˜Á‘”èÁ…­•‘1…å½ÕÐ…±±½…Ñ•Ì¥‘•¹Ñ¥…°•±±ÌÕÍ¥¹œ±…É•ÍÐ¡…ÉÐ‰½Õ¹‘Ìì½É¥¥¹…°)UXÝ½É­ÍÁ…”ÍÑ¥±°‘¥Í…‰±•A…¬½‘•¹Í¥Ñä…‰½Ù”ÄÈà‘•ÍÁ¥Ñ”ÐÀäØµ…Á…‰±”½Ý¹•È¸)áÑ•¹M5Á…­•‘1…å½ÕÐÝ¥Ñ ¡•¥¡Ð½Ý¥‘Ñ ½%Í½ÉÑ•¹•áÐµ™¥ÐÍ¡•±Ù•Ì…¹ÈÐ‰½Õ¹‘•)½µµ½¸µÍ…±”ÑÉ¥…±Ì¸¡½½Í”½¹±ä¥˜½µµ½¸Í…±”ÍÑÉ¥Ñ±ä¥µÁÉ½Ù•Ì½Ù•È½É¥¥¹…°)É¥ì•ÅÕ…°µÍ¥é•¡…ÉÑÌÉ•Ñ…¥¸½É¥¥¹…°É¥¸9¼¡…ÉÐÉ½Ñ…Ñ¥½¸°Í¡…Á”¹•ÍÑ¥¹œ°)É•±…á…Ñ¥½¸°Í•…´¡…¹•Ì½È½ÁÑ¥µ…°µÁ…­¥¹œ±…¥´¸M½ÕÉ”•½µ•ÑÉä…¹½É¥¥¹…°)UX½¡¥ÍÑ½Éä½Á…¥¹ÐÉ•™ÕÍ…°½¹Õµ•É¥Œµ½±±…ÁÍ”Ù…±¥‘…Ñ¥½¸É•Ñ…¥¹•¸±°…±±•ÉÌ€¡ÕÑ¼¼)…”…Ñ±…Ì°A…¬°ÕÐ½MÑ¥Ñ É•Á…¬¤É•ÕÍ”½É¥¥¹…°½Ý¹•È¸]½É­ÍÁ…”A…¬½‘•¹Í¥Ñä)¹½Ü•¹…‰±•Ñ¡É½Õ ÐÀäØ¥Í±…¹‘Ì¸5…É¥¸…¹½Õ¹Ðµ‘•Á•¹‘•¹Ð…ÁÌÕ¹¡…¹•¸)9•ÜÑ•ÍÑÌÙ•É¥™äµ¥á•µÍ¥é”½Ù•É…”°½µµ½¸É•±…Ñ¥Ù”‘•¹Í¥Ñä°Í•Á…É…Ñ¥½¸°‰½Õ¹‘Ì°)‘•Ñ•Éµ¥¹¥Í´°•ÅÕ…°µÍ¥é”™…±±‰…¬…¹…ÑÕ…°Ý½É­ÍÁ…”ÄÈä¼ÐÀäØ¼ÐÀäÜ½¹ÑÉ½°…Ñ¥¹œ¸)Y…±¥‘…Ñ¥½¸è™Õ±°ÍÕ¥Ñ”ÈÜäÝAML¼Á%0¼ÁÍ­¥À€ äà¸áÌ¤°Á±ÕÌÑÝ¼¹•ÜÍ¡•±˜Ñ•ÍÑÌ)AMLÍ•Á…É…Ñ•±ä€¡…‘‘•…™Ñ•È™Õ±°ÉÕ¸•¹Õµ•É…Ñ•™¥±•Ì¤ìÈÜää‘¥ÍÑ¥¹ÐÑ•ÍÑÌ½Ù•É•¸)I•±•…Í”­¹•ÜÁ…­¥¹œ½Ý½É­ÍÁ…”™½ÕÍ•ÄÅAML¸9¼…ÍÍ•ÉÑ¥½¹ÌÉ•µ½Ù•½É•±…á•¸)AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”…ŒÙ„ÈÝŒÈÐààÜÀÁ…”ÝŒÈàåŒÅÁ™”ÌÐÄá”ÐÅÌÜÀì•á…ÐÑ•ÍÑ•ÑÉ•”)ŒÁˆÄÉÅˆÙ…‰™”ÜáŒØÐÌå……ˆÈàÀÁ™‘á‰ˆÈØÕ„ÀÙ•É¥™¥•‰•™½É”ÕÁ‘…Ñ¥¹œµ…¥¸¸)A…•ÌÐÀÀØÜÔÄÔÜÀÈMUMLìÄÈ¼ÄÈÁÕ‰±¥Œ™¥±•Ì‰åÑ”µµ…Ñ €¡…±°¡…¹•ÉÕ¹Ñ¥µ”½…¡”)±½…‘•ÉÌÁ±ÕÌÁÉ½Ñ•Ñ•µ…¥¸äÔÐ½5Õ±Ñ¤Ä¸À¤¸!½ÍÑ•É•É•ÍÍ¥½¸ÐÀÀØÜÔÄÔäØÈ½©½ˆÄÈÀÜäÌÜÔØÌÜÔMUMLì½µÁ±•Ñ”¡½ÍÑ•±½Ì)Ù•É¥™äÈÜäåAML¼Á%0¼ÁÍ­¥À¸1½…°™Õ±°…¹™½ÕÍ•¡•­Ì…‰½Ù”Á…ÍÍ•¸)9¼‘•Ù¥”äÔÜAML¥¹™•ÉÉ•¸½Ìµ½¹±äÁÉ½½˜½µµ¥Ð™½±±½ÝÌìÉÕ¹Ñ¥µ”Õ¹¡…¹•¸)I•Ù¥•Ý•É•Ù•ÉÍ”…¡”É…Á äÔÜìµ…¥¸äÔÐ½Á¥­•ÈäÔÐ½¥éµ¼äÔÔ½5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸)Y%äÔÜèÕ¹Á…¥¹Ñ•Ù…É¥•µÍ¥é”µ•Í ƒŠHÕÑ¼…Ñ±…ÌƒŠH¥¹ÍÁ•ÐÁ…­¥¹œì•á¥ÍÑ¥¹œUX)±…å½ÕÐƒŠHA…¬…±°ìU¹‘½I•‘¼ìÁ…¥¹ÐÑ¡•¸M…Ù•=Á•¸¸A…¥¹Ñ•Ñ…É•ÑÌÉ•ÅÕ¥É”±•…ÈÁ…¥¹Ð)‰•™½É”UXÉ•Á…­¥¹œ¸	¥•È¡…ÉÐ‰½Õ¹‘¥¹œ‰½á•Ì‘¼¹½ÐÕ…É…¹Ñ•”Ñ¥¡Ð½¹…Ù”¹•ÍÑ¥¹œ¸)9•áÐ™½±±½Ü…ÑÕ…°Á…­¥¹œÅÕ…±¥Ñä½‘•Ù¥”Ñ¥µ¥¹œ‰•™½É”‰É½…‘•ÈÕ¹ÝÉ…À½ÈU$¡…¹•Ì¸((ŒŒ€¸äÔàƒŠPUXÁ½ÁÕÀ±¥ÁÁ¥¹œ½¹Ñ…¥¹µ•¹ÐƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÍÉ••¹Í¡½Ðå	Øå½¸äÔÜÍ¡½ÝÌÉ¥¡ÐÑ½½±‰…È…¹‰½ÑÑ½´ÍÑ…ÑÕÌ‘¥Í…ÁÁ•…É¥¹œ)…ÐÑ¡”M5Ù•ÉÑ¥…°‰½Õ¹‘…ÉäÝ¡¥±”UXQ==1LÁ½ÁÕÀ¥Ì½Á•¸°‰•™½É”UX]½É­ÍÁ…”¸)9½ÐÍÑ…±”Í¡•±°ì¹½Ð•Ù¥‘•¹”……¥¹ÍÐäÔÜÁ…­¥¹œ¸9¼äÔÜ‘•Ù¥”AML¥¹™•ÉÉ•¸)Õ‘¥ÐÍ¡…É•Ñ½½°µÍ•ÍÍ¥½¸µÕ¤‰•¥¸èUXÑ½½±ÌÕÍ•ÌÑÉ…¹Í™½Éµ•ÍÉ½±±¥¹œÍ¡…É•‘½¬¸)á¥ÍÑ¥¹œäÔÈ]½É­ÍÁ…”Í¥‰±¥¹œ™¥à‘½•Ì¹½Ð…ÁÁ±äÑ¼Ñ¡¥ÌÁÉ••‘¥¹œÁ½ÁÕÀ¸)9…ÉÉ½Üµ¥Ñ¥…Ñ¥½¸è½É¥¥¹…°UXµÑ½½±Ì¡½ÍÐÕÍ•Ì±•™Ð½É¥¡ÐáÁà€¬…ÕÑ¼µ…É¥¹Ì¥¹ÍÑ•…)½˜ÑÉ…¹Í±…Ñ•`•¹ÑÉ¥¹œ°±½…°¥Í½±…Ñ¥½¸…¹±…å½ÕÐ½Á…¥¹Ð½¹Ñ…¥¹µ•¹Ð¸=É¥¥¹…°¹½‘•Ì°)±¥ÍÑ•¹•ÉÌ°Ý¥‘”‰½‘ä½…Ñ¥½¹Ì°¡¥ÍÑ½Éä…¹…±°UX…±½É¥Ñ¡µÌÕ¹¡…¹•¸±•…ÈÑ¡•Í”)UXµ½¹±äÍÑå±•Ì‰•™½É”Ñ¡”¹•áÐ‘½¬€¡¥¹±Õ‘¥¹œ±•™ÐA…¥¹Ð¤ì½É‘¥¹…ÉäÑ½½±Ì­••À)Í¡…É•Á±…•µ•¹Ð¸9¼¹•Ü•‘¥Ñ½È°Á½¥¹Ñ•È±¥ÍÑ•¹•È°É•Í¥é”Á½±±¥¹œ½Èèµ¥¹‘•à•Í…±…Ñ¥½¸¸)á…Ð¥A…½]•‰-¥Ð½µÁ½Í¥Ñ½È™…¥±ÕÉ”¥Ì9=PÉ•ÁÉ½‘Õ•¡•É”ìÑ¡¥Ì¥Ì„Ñ…É•Ñ•)½¹Ñ…¥¹µ•¹ÐÉ•Á…¥ÈÉ•ÅÕ¥É¥¹œ‘•Ù¥”…•ÁÑ…¹”°¹½Ð„ÁÉ½Ù•¸‰É½ÝÍ•Èµ•¹¥¹”‘¥…¹½Í¥Ì¸)9•ÜÑ•ÍÐ•á•ÕÑ•Ì½É¥¥¹…°‰•¥¸™½ÈU[ŠIA…¥¹ÓŠI½É‘¥¹…ÉäÑ½½°…¹Ù•É¥™¥•ÌÍ½Á•±¥À°)ÑÉ…¹Í™½É´µ™É•”UXÁ±…•µ•¹Ð…¹ÍÑå±”±•…¹ÕÀ¸I•±•…Í”½¹ÑÉ…Ð½…¡”­•åÌÉ•Ù¥•Ý•äÔàì)µ…¥¸äÔÐ½Á¥­•ÈäÔÐ½5Õ±Ñ¤Ä¸À½™É½é•¸…¹äÔÜÁ…­¥¹œ½Ý½É­ÍÁ…”Õ¹¡…¹•¸)Y%äÔàèÉ•Á•…Ð=‰©•ÓŠIUX…¹±½Í”°Ý…Ñ ™Õ±°Ñ½ÀµÉ¥¡ÐÑ½½±‰…È½ÍÑ…ÑÕÌìÕÑ¼…Ñ±…Ì°)=Á•¸UX‘¥Ñ½ËŠI	…¬Ñ¼Í°Ñ¡•¸A…¥¹Ð…¹…¹½Ñ¡•ÈÑ½½°Ñ¼¡•¬Á½ÁÕÀÁ½Í¥Ñ¥½¹Ì¸)9•áÐ…ÑÕ…°äÔà¥A…±¥ÁÁ¥¹œÉ•Ñ•ÍÐ‰•™½É”™ÕÉÑ¡•ÈÕ¹É•±…Ñ•‘•Ù•±½Áµ•¹Ð¸)%¹¥Ñ¥…°™Õ±°ÉÕ¸™½Õ¹½¹”½±ÜÄÄ…ÍÍ•ÉÑ¥½¸É•ÅÕ¥É¥¹œ±•™ÐÔÀ”™½ÈUX…ÌÝ•±°…Ì)½É‘¥¹…ÉäÑ½½±ÌìÕÁ‘…Ñ•½¹±äUX•áÁ•Ñ…Ñ¥½¸Ñ¼¥¹Í•ÐáÁà½É¥¡ÐáÁà½¹¼µÑÉ…¹Í™½É´°)É•Ñ…¥¹¥¹œ•Ù•Éä½Ñ¡•È±…Õ¹ ½±½Í”½¡¥ÍÑ½Éä¡•¬¸½ÕÍ•ÈÁAML¸¥¹…°™Õ±°µÉÕ¸ÈàÀÁAML¼Á%0¼ÁÍ­¥À€ äÐ¸äÕÌ¤¸AÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½ÝÌ¸9¼äÔÜÁ…­¥¹œÍ½ÕÉ”¡…¹•¸((¸äÔàÁÕ‰±¥…Ñ¥½¸èÉÕ¹Ñ¥µ”á‘•‰„ÐÅÄÕÀØàÈÕÈá”ÀÄäÕ™”ÐàÙ”ÁÄÐäåˆå”Ô½¸µ…¥¸¸)Q•ÍÑ•ÑÉ•”É„àÀÙ„ÌÐÜÌÕÀÐÕ”ÀÔÝˆÉˆÙ˜ÈÈÑ”ÈÁ„ØÁ‰…µ…Ñ¡•ÕÁ±½…‘•¥ÐÑÉ•”•á…Ñ±ä¸)1½…°™¥¹…°ÈàÀÁAML¼Á%0¼ÁÍ­¥Àì™½ÕÍ•ÈÁAML¸A…•ÌÐÀÀØàÔàÜØàÀMUML¸)±°ÄÌ¡•­•ÁÕ‰±¥Œ™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•¡•­½ÕÐèÍ¡•±°½Ù•ÉÍ¥½¸½¹•ÜÍ•ÍÍ¥½¸U$°)É•Ñ…¥¹•äÔÜUX½Á…­¥¹œ½±½…‘•ÉÌ…¹ÁÉ½Ñ•Ñ•µ…¥¸äÔÐ½5Õ±Ñ¤Ä¸À¸9¼Á…­¥¹œ…±½É¥Ñ¡´)¡…¹•ÌäÔà¸!½ÍÑ•É•É•ÍÍ¥½¸ÐÀÀØàÔààÄäÔ½©½ˆÄÈÀÜäØäÐÄÀÈÐMUMLèÈàÀÁAML¼Á%0¼ÁÍ­¥À¸)ÑÕ…°¥¹Ñ•Éµ¥ÑÑ•¹Ð¥A…™…¥±ÕÉ”¹½ÐÉ•ÁÉ½‘Õ•ìY%äÔàÁ½ÁÕÀ½¡•…‘•È½ÍÑ…ÑÕÌÉ•Ñ•ÍÐ)É•ÅÕ¥É•¸9¼äÔÜ¼äÔà‘•Ù¥”AML¥¹™•ÉÉ•¸½Ìµ½¹±äÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½ÝÌ¸((ŒŒ€¸äÔäƒŠPÉ•½¹¹•ÐÁÉ½‘ÕÑ¥½¸A…¥¹Ð¥¸=‰©•ÐÉ…‘¥…°ì€¸äÔàAMLƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäÔàAML€½¹•áÑ‰Õ¥±ÁÉ½Ñ•ÑÌUXµÁ½ÁÕÀ½¡•…‘•È½ÍÑ…ÑÕÌ±¥ÁÁ¥¹œÉ•Á…¥È…¹ÍÑå±”)±•…¹ÕÀ…É½ÍÌU[ŠIA…¥¹ÓŠI½É‘¥¹…ÉäÑ½½±Ì¸AÉ¥½ÈÁ•¹‘¥¹œäÔà‘•Ù¥”¹½Ñ•ÌÍÕÁ•ÉÍ•‘•¸)Õ‘¥Ðµ…¥¸àÔÔÐÑ„Ý”è½É¥¥¹…°½‰©•ÐµÉ…‘¥…°µÍ•ÍÍ¥½¸…±É•…‘äµ…ÁÌUXA…¥¹ÐÑ¼½É¥¥¹…°)Ù¥•ÝÁ½ÉÑA…¥¹Ñ	Ñ¸½ÕØµÁ…¥¹Ð½}}‰½á±…‰Y¥•ÝÁ½ÉÑA…¥¹Ð°‰ÕÐÑ½Ñ…°µ¥éµ¼É¥¹œ½µ¥ÑÑ•‰ÕÑÑ½¸¸)‘UXA…¥¹Ð…Ð½ÕÑ•ÈÐ×
ÀÉ…‘¥ÕÌÈÌÀì•Ù•Éä•á¥ÍÑ¥¹œÍ•Ñ½ÈÍÑ…åÌ¥¸Á±…”¸=É¥¥¹…°)…‘…ÁÑ•È±…Õ¹¡•ÌM5ÁÉ½‘ÕÑ¥½¸Á…¥¹Ñ•È°½Ý¹Ì…¹•±±…Ñ¥½¸½½µÁ±•Ñ¥½¸½¥éµ¼¡¥‘”ì)•á¥ÍÑ¥¹œ¥±”±…Õ¹¡•ÈÉ•Ñ…¥¹•¸A…¥¹Ñ•È½Á•¹Ì±•™Ð‘½¬…¹•¹™½É•Ì½É¥¥¹…°½¹”)…Ñ¥Ù”¥¹‘•Á•¹‘•¹ÐUX½‰©•Ð½Á…¥¹ÐÑ…É•ÐÕ…É‘Ì¸9¼¹•Ü‰ÉÕÍ ½±…å•È½¡¥ÍÑ½Éä½¥¹ÁÕÐ)½Ý¹•È°¹¼Á…¥¹Ñ•È¡…¹•Ì½È¥½¸½Ù•É¡…Õ°¸=É¥¥¹…°±•™ÐA…¥¹Ð•á•ÁÑ¥½¸É•Ñ…¥¹•¸)áÑ•¹½É¥¥¹…°ÜÄÄ¥¹Ù•¹Ñ½Éä½±…Õ¹ ½±½Í”½ÍÁ…¥¹œ™¥áÑÕÉ”Ý¥Ñ UXA…¥¹Ðì±•™ÐáÁà)•áÁ•Ñ…Ñ¥½¸¥¹±Õ‘•Ì½É¥¥¹…°A…¥¹Ð‘½¬°…±°½±…ÍÍ•ÉÑ¥½¹Ì…¹Á½Í¥Ñ¥½¹ÌÉ•Ñ…¥¹•¸)1½…°™Õ±°ÈàÀÁAML¼Á%0¼ÁÍ­¥À€ äÔ¸äåÌ¤ì™½ÕÍ•ÄåAML°™¥¹…°É…‘¥…°ÄÑAML¸)9¼…ÍÍ•ÉÑ¥½¹ÌÉ•µ½Ù•¸AÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½ÝÌ¸=¹±äÉÕ¹Ñ¥µ”™Õ¹Ñ¥½¹…±¥Ñäè½¹”É…‘¥…°)‰ÕÑÑ½¸ìÍ¡•±°½É•½Ù•Éä½¥éµ¼…¡”Á¥¸äÔä…¹É•Ù¥•Ý•…ÍÍ•Ð½¹ÑÉ…Ð¸M•ÍÍ¥½¸äÔà°)µ…¥¸äÔÐ½Á¥­•ÈäÔÐ½5Õ±Ñ¤Ä¸À½UXäÔÜ½Á…­¥¹œ½™É½é•¸Õ¹¡…¹•¸)Y%äÔäèÍ•±•Ð½¹”UX½‰©•ÐƒŠH=‰©•ÐÉ…‘¥…°ƒŠHUXA…¥¹Ð€¡½ÕÑ•ÈÕÁÁ•ÈµÉ¥¡Ð¤ì)A•¹¥°Á…¥¹Ð°™¥¹•ÉÌ½É‰¥Ð½Á…¸½Á¥¹ °U¹‘½I•‘¼ÍÑ…åÌ¥¸A…¥¹Ðì½¹—ŠIÉ…‘¥…³ŠIÉ•½Á•¸)Í…µ”±…å•ÉÌ¸QÉäUXÁ½ÁÕÃŠI±½Í—ŠIA…¥¹Ð…¹A…¥¹ÓŠI½¹—ŠI…¹½Ñ¡•ÈÑ½½°¸M…Ù•=Á•¸É•Ñ…¥¹Ì)Á…¥¹Ð¸¥±”A…¥¹Ð•¹ÑÉäÍÑ¥±°Ý½É­Ì¸%¹Ù…±¥½¹¼µUXÑ…É•ÑÌÉ•Ñ…¥¸½É¥¥¹…°É•™ÕÍ…°¸)9•áÐ™••‘‰…¬½¸µ…¥¹ÍÑÉ•…´…•ÍÌ‰•™½É”„Í•Á…É…Ñ”Á…¥¹ÐµÑ½½°½±…å•ÈÉ…‘¥…°‰Õ¥±¸((¸äÔäÉÕ¹Ñ¥µ”ÔÝˆÅ„Õ”àÙ…‘‘˜ÁàÜÕ”Ìå™…‘äÑ™”á…ŒÌàÀààÁÕ‰±¥Í¡•½¸µ…¥¸ìÕÁ±½…‘•)ÑÉ•”ÁàÁˆÝ˜ÍŒÈÕ”àÀÕ”åˆÐÈÈÀÜÙ”ÔÄäÈÄÐÜÍ•„ÕØØ•á…Ñ±ä•ÅÕ…±ÌÑ•ÍÑ•±½…°ÑÉ•”¸)1½…°ÈàÀÁAML¼Á%0¼ÁÍ­¥À°™½ÕÍ•ÄåAML°™¥¹…°¥¹Ù•¹Ñ½Éä½±¥™•å±”ÄÑAML¸!½ÍÑ•)É•É•ÍÍ¥½¸ÐÀÀØäÄÐÄÄØÄ½©½ˆÄÈÀÜäàÔäÀÄÜÄMUMLèÈàÀÁAML¼Á%0¼ÁÍ­¥Àì)A…•ÌÐÀÀØäÄÐÀäÈÐMUML¸)±°ÄØ¡•­•ÁÕ‰±¥Œ™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•¡•­½ÕÐ€¡Í¡•±°½Ù•ÉÍ¥½¸½¹•Ü¥éµ¼°)½É¥¥¹…°Á…¥¹Ñ•È½…‘…ÁÑ•È½Í•ÍÍ¥½¸äÔà½UXäÔÜ½Á…­¥¹œ½µ…¥¸äÔÐ½5Õ±Ñ¤Ä¸À…¹±½…‘•ÈÉ…Á ¤¸)UÍ•ÈäÔàAML•áÁ±¥¥Ñ±äÁÉ½Ñ•Ñ•ìäÔä¡…¹‘Ìµ½¸…Ñ”É•µ…¥¹ÌÍ•Á…É…Ñ”¸9¼äÔÜÁ…­¥¹œ)AML¥¹™•ÉÉ•…¹¹¼Á…­¥¹œ½Á…¥¹Ð½UX½Í•ÍÍ¥½¸…±½É¥Ñ¡´¡…¹•¥¸äÔä¸((ŒŒ€¸äØÀƒŠP…ÁÑ¥½¹•‰ÉÕÍ µÑ½½°É…‘¥…°¥¸A…¥¹Ð‘½¬ì€¸äÔäAMLƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäÔäAML€½¹•áÑ‰Õ¥±ÁÉ½Ñ•ÑÌ½É¥¥¹…°=‰©•ÐÉ…‘¥…°UXA…¥¹Ð…•ÍÌ…¹…•ÁÑ•(äÔà±¥ÁÁ¥¹œ™¥à¸Õ‘¥ÐÕÉÉ•¹ÐÀäå˜ÄÄÝèÁ…¥¹Ñ•ÈÌÁ…¥¹Ðµ…Ñ¥½¸Í•±•Ð½Ý¹ÌÑ½½°)Í•ÑÑ¥¹Ì½¡…¹”…¹•±±…Ñ¥½¸°	ÉÕÍ ½¥±°½É…Í•È½MµÕ‘”½	±ÕÈ…±É•…‘ä¥µÁ±•µ•¹Ñ•¸)I•Á±…”Ù¥Í¥‰±”Í•±•ÐÝ¥Ñ ¹…Ñ¥Ù”‘•Ñ…¥±Ì	ÉÕÍ Ñ½½±ÌÁ¥­•È¥¸M5A…¥¹Ð‘½¬ì)½É¥¥¹…°Í•±•ÐÉ•µ…¥¹Ì¡¥‘‘•¸…ÌÍ•ÑÑ¥¹Ì½•Ù•¹Ð½Ý¹•È¸¥Ù”ØÛ\ÔÉÁà‰ÕÑÑ½¹Ì½¸„(ÈÈÁÁàÉ…‘¥…°°MY™Õ¹Ñ¥½¸¥½¹Ì…¹Ù¥Í¥‰±”…ÁÑ¥½¹ÌìÍ•±•Ñ•…É¥„µÁÉ•ÍÍ•¡¥¡±¥¡Ð)…¹½±±…ÁÍ•ÕÉÉ•¹ÐµÑ½½°…ÁÑ¥½¸¸… ±¥¬¡•­Ì½É¥¥¹…°…Ñ¥Ù”½‘¥Í…‰±•…Ñ”°)Í•ÑÌ½É¥¥¹…°Í•±•Ð…¹‘¥ÍÁ…Ñ¡•ÌM5¡…¹”•Ù•¹Ð€¡±•…ÈÍÑ…•¥µ…”½…¹•°±¥Ù”)ÍÑÉ½­”½Íå¹Œ½¹ÑÉ½±Ì¤¸A¥­•È±½Í•Ì½¸¡½¥”…¹Í•ÍÍ¥½¸•¹¸<‘¥Í…‰±•Í•±•Ñ¥½¸)¥Ìµ¥ÉÉ½É•¸9¼¹•ÜÙ¥•ÝÁ½ÉÐ¥¹ÁÕÐ°‰ÉÕÍ É…ÍÑ•È½¡¥ÍÑ½Éä½Á…¥¹ÐÉ•Í½ÕÉ”½È±…å•È½Ý¹•È¸)•ÁÑ•±•™Ð‘½¬½™½½Ñ•È½±…å•ÉÌ½Í•ÑÑ¥¹Ì½•ÍÑÕÉ”½Ñ½½°Á½Í¥Ñ¥½¹ÌÉ•Ñ…¥¹•¸9¼±…å•È)É…‘¥…°°™…•É½ÕÁÌ½È‰É½…É•Í­¥¸¥¸äØÀìÍÑ…•É…Á¡¥…°U$½¹±ä½¸Ñ¡•Í”ÔÑ½½±Ì¸)QÝ¼…ÑÕ…°ÁÉ½‘ÕÑ¥½¸U$¥¹Ñ•É…Ñ¥½¹Ìè…±°ÔÑ½½±Ì½…ÁÑ¥½¸½Í•±•Ñ¥½¸½‰±ÕÈ½¹ÑÉ½±Ì¼)¹¼¡¥ÍÑ½Éä…¹‘¥Í…‰±•É•™ÕÍ…°ì±¥Ù”A•¹¥°ÍÑÉ½­—ŠIÉ…‘¥…°ÍÝ¥Ñ …¹•±Ì½É¥¥¹…°)½¹Ñ…ÐÝ¡¥±”É•Ñ…¥¹¥¹œ½µµ¥ÑÑ•Á…¥¹Ð½¡¥ÍÑ½Éä…¹¹…Ù¥…Ñ¥½¸¸%¹¥Ñ¥…°¹•Ü™¥áÑÕÉ”)É•……É¥„µÁÉ•ÍÍ•™É½´ÁÉ½Á•ÉÑä¥¹ÍÑ•…½˜•á¥ÍÑ¥¹œ…ÑÑÉ¥‰ÕÑ•Ìµ…Àì½ÉÉ•Ñ•Ñ•ÍÐ)…•ÍÌ°¹¼ÁÉ½‘ÕÑ¥½¸Ý½É­…É½Õ¹½È½É¥¥¹…°…ÍÍ•ÉÑ¥½¸É•µ½Ù•¸9•Ü­É•±•…Í”ÝAML°)½É¥¥¹…°äÀÀU$½½É”­É•±•…Í”ÄÉAML¸Õ±°±½…°ÈàÀÉAML¼Á%0¼ÁÍ­¥À€ äÜ¸ÈÁÌ¤ìÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½ÝÌ¸)Y%äØÀè=‰©•ÓŠIUXA…¥¹ÓŠI	ÉÕÍ Ñ½½±Ìì¥¹ÍÁ•Ð¥½¹Ì½…ÁÑ¥½¹Ì°Á¥¬	ÉÕÍ ½É…Í•È¼)¥±°½	±ÕÈ½MµÕ‘”ìÁ¥­•È½±±…ÁÍ•Ì…¹ÕÉÉ•¹ÐÑ½½°…ÁÑ¥½¸™½±±½ÝÌ¸A…¥¹Ð½U¹‘½I•‘¼°)™¥¹•È¹…Ù¥…Ñ¥½¸ì½¹—ŠIÉ•½Á•¸…¹Ù•É¥™ä½µÁ…Ð‘½¬½±…å•ÉÌ¸UXÁ½ÁÕÀ±¥ÁÁ¥¹œ)…¹äÔä=‰©•ÐÉ…‘¥…°•¹ÑÉäÉ•µ…¥¸ÁÉ½Ñ•Ñ•¸9•áÐ™••‘‰…¬‰•™½É”±…å•È½µ…Í¬É…‘¥…°¸((¸äØÀÁÕ‰±¥…Ñ¥½¸èÉÕ¹Ñ¥µ”ØÅ˜åÅˆÜäÐÑ™„ÌÐÄÝŒàØÌå”ÜÉ…”ÌÌäÑˆÐÌÑ”ÑˆÑˆ½¸µ…¥¸ì)•á…ÐÑ•ÍÑ•ÑÉ••ˆÉ…áŒàÕ”ÜàÜÔÀåÙ”ÍˆÙŒÙ™ŒÍàÐÕ˜ÄÀØäÔàÁ˜µ…Ñ¡•¥ÐÕÁ±½…¸)1½…°ÈàÀÉAML¼Á%0¼ÁÍ­¥À€ äÜ¸ÈÁÌ¤ì¹•Ü½É•±•…Í”ÝAML…¹½É¥¥¹…°äÀÀ½É•±•…Í”ÄÉAML¸)A…•ÌÐÀÀÜÄÐÐÈØÄäMUMLìÄØ¼ÄØ¡•­•ÁÕ‰±¥Œ™¥±•Ì‰åÑ”µ¥‘•¹Ñ¥…°Ñ¼Ñ•ÍÑ•¡•­½ÕÐè)Í¡•±°½Ù•ÉÍ¥½¸½¹•ÜÁ…¥¹Ñ•È°É•Ñ…¥¹•äÔä¥éµ¼½…‘…ÁÑ•È°äÔàÍ•ÍÍ¥½¸¡½ÍÐ°äÔÜUX½Á…­¥¹œ¼)±½…‘•ÉÌ°µ…¥¸äÔÐ½5Õ±Ñ¤Ä¸À…¹±…ˆÉ…Á ¸!½ÍÑ•ÐÀÀÜÄÐÐÈØÔà½©½ˆÄÈÀàÀÔÔÐÐÈàÄMUMLèÈàÀÉAML¼Á%0¼ÁÍ­¥À¸)UÍ•ÈäÔåAMLÁÉ½Ñ•Ñ•¸Y%äØÀ¥½¸ÍÁ…¥¹œ½Í•±•Ñ¥½¸½Á…¥¹Ð½¹…Ù¥…Ñ¥½¸½¡¥ÍÑ½Éä)…•ÁÑ…¹”Á•¹‘¥¹œì¹¼‘•Ù¥”AML¥¹™•ÉÉ•¸=É¥¥¹…°±…å•È½µ…Í¬½¹ÑÉ½±ÌÉ•µ…¥¸¸((ŒŒ€¸äØÄƒŠP‰½Õ¹¡¥‘‘•¸¥éµ¼ÁÉ½©•Ñ¥½¸…¹MY½µÁ½Í¥Ñ½ÈÍÕÉ™…”ì€¸äØÀÉ…‘¥…°AML((ÈÐ=Ñ½‰•ÈÈÀÈØ¸UÍ•ÈäØÀAML™½È‰ÉÕÍ É…‘¥…°ìÍ•Á…É…Ñ•±äÉ•Á½ÉÑÌ¥…¹ÐÉ•½É••¸)±¥¹•Ì…™Ñ•ÈA…¥¹Ð½¹”…¹É•ÕÉÉ¥¹œÉ¥¡ÐµÍ¥‘”U$‘¥Í…ÁÁ•…É…¹”™½±±½Ý¥¹œUXÑ½½±Ì¼)µ…ÀÙ¥•ÝÌ°¡…¹¥¹œ…Ì¥éµ¼½½‰©•Ð½É‰¥ÑÌ…É½ÍÌÍÉ••¸¸AÉ¥½ÈäÔà±¥ÁÁ¥¹œAML¥Ì)¡¥ÍÑ½É¥…°ìÉ•ÕÉÉ•¹”¥Ì=A8…¹¹½Ð‘¥Íµ¥ÍÍ•‰äÁÉ¥½ÈAML½È9½‘”É•ÍÕ±ÑÌ¸)I•Ù¥•Ý•ÕÁ±½…‘•ÅÐÐäàÀÍÉ••¹Í¡½Ð…¹ä¸ÝÌMÉ••¹I•½É‘¥¹œÄÜ´ÄÄ´ÌÔ™É…µ•ÌÅÌ¼ÝÌ¸)Y¥‘•¼Í¡½ÝÌ±¥Ù”µ½‘•°½¥éµ¼Ý¡¥±”¡•…‘•È½½‰©•ÐU$‘¥Í…ÁÁ•…ÉÌ¸á…Ð¥A…½µÁ½Í¥Ñ½È)™…Õ±ÐÉ•µ…¥¹ÌÕ¹É•ÁÉ½‘Õ•±½…±±äì‘¼¹½Ð±…¥´„ÁÉ½Ù•¸]•‰-¥Ð•¹¥¹”‘¥…¹½Í¥Ì¸)Õ‘¥ÐÕÉÉ•¹ÐÄÍ„ÁˆÑ„äèÑ½Ñ…°µ¥éµ¼Íå¹ŒÍ•ÑÌÉ½½Ð¹¡¥‘‘•¸‘ÕÉ¥¹œA…¥¹Ð‰ÕÐÍÑ¥±°…±±Ì)Íå¹á¥ÍY¥ÍÕ…±Ì¸ÁÉ½©•Ñ•‘I¥¹A…Ñ ÕÍ•ÌM%iÄäØ½µ…à Ä±¡¥‘‘•¹I•Ð¹Ý¥‘Ñ À¤è¡¥‘‘•¸)ÁÉ½©•Ñ¥½¸µ…¹¥™¥•ÌÉ¥¹œ½½É‘¥¹…Ñ•ÌÄäÛ\ìÉ½½Ð‘É½ÀµÍ¡…‘½Ü™¥±Ñ•È…¹½Ù•É™±½Ý¥¹œ)µ…¥¸MY…±±½Ü•¹½Éµ½ÕÌÁ…¥¹Ð½™¥±Ñ•È‰½Õ¹‘Ì¸	½Ñ ™…¥±ÕÉ•ÌÁ±…ÕÍ¥‰±äÍ¡…É”Ñ¡¥Ì)Õ¹‰½Õ¹‘•ÁÉ•Í•¹Ñ…Ñ¥½¸ÍÕÉ™…”°Õ¹±¥­”ÁÉ•Ù¥½ÕÌÁ½ÁÕÀµ½¹±äµ¥Ñ¥…Ñ¥½¸¸)I•Á…¥ÈM5¥éµ¼½Ý¹•Èè¹¼…á¥ÌÕÁ‘…Ñ”Ý¡¥±”¡¥‘‘•¸ìÁÉ½©•Ñ•‘I¥¹A…Ñ É•ÑÕÉ¹Ì•µÁÑä)™½È¡¥‘‘•¸½é•É¼½¹½¹™¥¹¥Ñ”‘¥µ•¹Í¥½¹Ì½È…¹ä¹½¹™¥¹¥Ñ”½½ÕÐµ½˜µ±½…°ÄäÛ\ÄäØÉ¥¹œÁ½¥¹Ð¸)••¹•É…Ñ”É¥¹Ì±•…È‰½Ñ Ù¥Í¥‰±”…¹¡¥ÐÁ…Ñ¡ÌÑ¡É½Õ •á¥ÍÑ¥¹œÍå¹Œ½Ý¹•Èì)¡¥‘‘•¸¥éµ½ÌÍ­¥ÀÕÁ‘…Ñ•Ì…¹É•½µÁÕÑ”¹½Éµ…±±äÝ¡•¸Í¡½Ý¸¸)I•µ½Ù”É½½Ð‘É½ÀµÍ¡…‘½Ü™¥±Ñ•Èì‰½Õ¹½¹±ä‘¥É•Ðµ…¥¸MY½Ù•É™±½Ü¸áÑ•É¹…°É…‘¥…°)Í•Ñ½ÉÌ½½É¹•ÈÍ¡½ÉÑÕÑÌÉ•µ…¥¸½ÕÑÍ¥‘”µ…¥¸MY…¹­••À½É¥¥¹…°Á±…•µ•¹Ð½¥¹ÁÕÐ¸)9¼ÑÉ…¹Í™½É´•½µ•ÑÉä°•ÍÑÕÉ”°UX½Á…¥¹Ð½¡¥ÍÑ½Éä½É•¹‘•È­•É¹•°½È5Õ±Ñ¤Ä¸À¡…¹•Ì¸(äÔäÉ…‘¥…°¼äØÀ‰ÉÕÍ ½¹ÑÉ½±Ì…¹äÔàÁ½ÁÕÀ½¹Ñ…¥¹µ•¹ÐÕ¹¡…¹•¸Q¡¥ÌÑ…É•ÑÌÑ¡”)…ÑÕ…°¡¥‘‘•¸Í¥é¥¹œ‘•™•Ð…¹½¹ÍÑÉ…¥¹ÌÉ•¹‘•É¥¹œì¥A…É•Ñ•ÍÐ¥ÌÍÑ¥±°É•ÅÕ¥É•¸)QÝ¼Ñ•ÍÑÌ•á•ÕÑ”½É¥¥¹…°É¥¹œ™Õ¹Ñ¥½¹ÌÝ¥Ñ É•…±Q¡É•”Á•ÉÍÁ•Ñ¥Ù”…µ•É„è¹½Éµ…°)aehÁ…Ñ¡Ì°¡¥‘‘•»ŠIé•É¿ŠIÉ•ÍÑ½É”•á…ÐÉ•½Ù•Éä°™¥¹¥Ñ”±½…°½½É‘¥¹…Ñ•Ì°¥¹Ù…±¥)ÁÉ½©•Ñ¥½¸É•™ÕÍ…°ì¡¥‘‘•¸Íå¹ŒÕ…É½µ…¥¸MY½™¥±Ñ•ÈÍ½Á”…¹É•Ñ…¥¹••áÑ•É¹…°)A…¥¹Ð‰ÕÑÑ½¸½Í¡½ÉÑÕÐ½¹ÑÉ…ÑÌ¸½ÕÍ•ÝAMLì±½…°™Õ±°ÈàÀÑAML¼Á%0¼ÁÍ­¥À€ ÄÀÐ¸ÜÍÌ¤¸AÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½ÝÌ¸)Y%äØÄèA…¥¹ÓŠI½¹”½¸Í…µ”µ½‘•°ì¹¼¥…¹Ð½±½ÕÉ•±¥¹•Ì¸I•Á•…ÐUXÑ½½±ÏŠIUX)‘¥Ñ½ËŠI	…¬½±½Í”ì½É‰¥Ðµ½‘•°½¥éµ¼¥¹Ñ¼É¥¡ÐÍ¥‘”…¹Ý…Ñ •¹Ñ¥É”Ñ½½±‰…È½=‰©•Ð)	É½ÝÍ•È½ÍÑ…ÑÕÌÉ•µ…¥¸Ù¥Í¥‰±”¸5½Ù”½I½Ñ…Ñ”½M…±”…¹É…‘¥…°Ñ½½±ÌÍÑ¥±°ÕÍ…‰±”ì)A…¥¹Ð½U¹‘½I•‘¼…¹™¥¹•È¹…Ù¥…Ñ¥½¸ÁÉ•Í•ÉÙ•¸9•áÐ…ÑÕ…°äØÄÉ•¹‘•É¥¹œ™••‘‰…¬)‰•™½É”Õ¹É•±…Ñ•™•…ÑÕÉ•Ì¸%˜É•ÕÉÉ•¹”Á•ÉÍ¥ÍÑÌ°­••À¥¹‘•Á•¹‘•¹Ð±¥ÁÁ¥¹œÉ•Á½ÉÐ)½Á•¸…¹¥¹ÍÁ•Ð½Ñ¡•È™¥±Ñ•É•½½Ù•É™±½Ý¥¹œ±…å•ÉÌì‘¼¹½Ð¥¹™•È…•ÁÑ…¹”¸((ŒŒA…¥¹ÐU$‘¥É•Ñ¥½¸±…É¥™¥•‰äÕÍ•ÈƒŠP€ÈÐ=Ñ½‰•ÈÈÀÈØ()UÍ•ÈÍ…åÌäØÀ‘½¬µ½¹Ñ…¥¹•É…‘¥…°µ¥ÍÕ¹‘•ÉÍÑ½½¥¹Ñ•¹Ð¸•Í¥É•M5™±½…Ñ¥¹œ)Ù¥•ÝÁ½ÉÐÉ…‘¥…°Ñ¡•µ”…ÌY•ÉÑ•à½‘”½…”½=‰©•Ð°Ý¥Ñ A…¥¹Ð½¹Ñ•áÐ¸¡½½Í”‰ÉÕÍ è)É…‘¥…°‘¥Í…ÁÁ•…ÉÌì½µÁ…Ð°½ÉÉ•Ñ±äÍ¥é•½¹Ñ•áÑÕ…°Í•ÑÑ¥¹Ì…ÐQ=@9QIì)É•µ…¥¹¥¹œÙ¥•ÝÁ½ÉÐ±•…È™½ÈÁ…¥¹Ñ¥¹œ¸!½±5AQd	-I=U9Ñ¼É•½Á•¸A…¥¹ÐÉ…‘¥…°°)¡½½Í”	±ÕÈ½•ÑŒ°Ñ¡•¸É…‘¥…°‘¥Í…ÁÁ•…ÉÌ…¹½¹Ñ•áÑÕ…°Ñ½ÀÁ…¹•°¡…¹•Ì¸1…å•ÉÌ°)µ…Í­Ì…¹¥µ…”Á±…•µ•¹ÐÍ¡½Õ±½Á•¸½¹Ñ•áÑÕ…°Á…¹•±Ì½¹±äÝ¡•¸É•ÅÕ•ÍÑ•¸)á¥ÍÑ¥¹œ±•™Ð…±°µ½¹ÑÉ½±Ì‘½¬¥ÌÑÉ…¹Í¥Ñ¥½¹…°°¹½Ð‘•Í¥É•™¥¹…°A…¥¹Ð¥¹Ñ•É™…”¸)UÍ•È•áÁ±¥¥Ñ±ä‘•™•ÉÌÁ½ÍÍ¥‰±”‰½ÑÑ½´µ±•™ÐA…¥¹Ðµ½‘”‰ÕÑÑ½¸…±½¹Í¥‘”Í•±•Ñ¥½¸¸)¼¹½ÐÍ¥±•¹Ñ±äÉ•Á±…”Ñ¡¥ÌÉ•ÅÕ•ÍÐÝ¥Ñ …¹½Ñ¡•ÈÉ…‘¥…°•µ‰•‘‘•¥¸„‘½¬¸)MÑ…”µ¥É…Ñ¥½¸ÕÍ¥¹œÕÉÉ•¹ÐÁ…¥¹Ñ•È½…Ñ¥½¸½¡¥ÍÑ½Éä½±…å•È½Ý¹•ÉÌ…¹Í¡…É•Á…¹•°)Á½Í¥Ñ¥½¸½½µÁ…Ð±…å½ÕÐì¹¼¹•Ü‰ÉÕÍ •¹¥¹”¸A…¥¹Ðµ½¹Ñ•áÐ‰…­É½Õ¹¡½±µÕÍÐ)‰•±½¹œÑ¼Í¥¹±”•á¥ÍÑ¥¹œ•ÍÑÕÉ”½Ý¹•È…¹½Ù•ÉÉ¥‘”µ½‘•±±¥¹œ¥¹Ù•ÉÐ=91dÝ¡¥±”)Á…¥¹Ñ¥¹œì™¥¹•ÉÌÍÑ¥±°½É‰¥Ð½Á…¸½Á¥¹ °A•¹¥°Á…¥¹ÑÌ°U¹‘½I•‘¼ÍÑ…åÌ¥¸A…¥¹Ð¸)¼¹½Ð½Á•¸„É…‘¥…°™É½´„ÍÕÉ™…”Á…¥¹ÐÍÑÉ½­”½È¹…Ù¥…Ñ¥½¸ì…¹•°Á•¹‘¥¹œ¡½±)½¸µ½Ù•µ•¹Ð½µÕ±Ñ¥Ñ½Õ ¸M½Á”É•Õ±…Èµ½‘•±±¥¹œÉ…‘¥…°½•ÍÑÕÉ”½Ý¹•ÉÌÕ¹¡…¹•¸)Q¡¥Ì¥Ì‘½Õµ•¹Ñ•‘¥É•Ñ¥½¸ìäØÄ™¥á•ÌÉ•¹‘•É¥¹œ½¹±ä…¹‘½•Ì¹½ÐÍ¡¥ÀÑ¡¥ÌU$¸((¸äØÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•èÉÕ¹Ñ¥µ”Õ™ˆÑ„Ñ™…‰••”áŒàÄÔÕˆå‘™ŒÍ‰„äÄàÔÌÙˆÕ‰•ÈÌ°)•á…ÐÑ•ÍÑ•ÑÉ•”ÀÁ‰‘˜ÀÅ‰ˆÀÜÄåˆÑ‘‰…ÄÍŒÑ”ÄàÀÈÀÈäÌÝ‰”ÌÔÐ¸1½…°ÈàÀÑAML°(Á%0¼ÁÍ­¥Àì™½ÕÍ•ÝAML¸A…•ÌÐÀÀÜÌàÄàÜàØMUMLì¡½ÍÑ•É•É•ÍÍ¥½¸ÐÀÀÜÌàÄàÔØÐ)MUML¸±°ÄØ¡•­•ÁÕ‰±¥ŒÉÕ¹Ñ¥µ”½±½…‘•È½ÁÉ½Ñ•Ñ•™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•ÑÉ•”¸)•Ù¥”äØÄÉ•½É••¸±¥¹•Ì…¹½É‰¥Ðµ‘•Á•¹‘•¹Ð±¥ÁÁ¥¹œ…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œì)¹¼ÁÉ½½˜½˜¥A…½µÁ½Í¥Ñ½ÈÉ½½Ð…ÕÍ”¥¹™•ÉÉ•™É½´…ÕÑ½µ…Ñ•Á…ÍÍ•Ì¸((ŒŒ€¸äØÈƒŠPÍÑ…ÉÑÕÀ½±¥™•å±”Ù¥•ÝÁ½ÉÐÍ¥é¥¹œì€¸äØÄÉ•¹‘•É¥¹œ%0ƒŠP€ÈÐ=Ñ½‰•ÈÈÀÈØ()UÍ•ÈäØÄ%0èÉ¥¡ÐµÍ¥‘”U$‰É½­•¸¥µµ•‘¥…Ñ•±ä…™Ñ•ÈÉ•™É•Í ìÁ½ÉÑÉ…¥ÓŠI±…¹‘Í…Á”)É•ÍÑ½É•Ì¥Ð¸¼9=Pµ…É¬äØÄÉ•¹‘•É¥¹œ™¥á•™É½´ÈàÀÐ…ÕÑ½µ…Ñ•Á…ÍÍ•Ì¸äØÀ‰ÉÕÍ )É…‘¥…°…•ÁÑ…¹”¥ÌÍ•Á…É…Ñ”ìÕÍ•ÈÌ±…É¥™¥•™±½…Ñ¥¹œÙ¥•ÝÁ½ÉÐA…¥¹ÐÉ…‘¥…°Ý¥Ñ )½µÁ…ÐQ=@½¹Ñ•áÑÕ…°Í•ÑÑ¥¹ÌÉ•µ…¥¹ÌÉ•½É‘•…¹¥Ì9=P¥µÁ±•µ•¹Ñ•¥¸äØÈ¸)Õ‘¥Ðµ…¥¸Õ™ˆÑ„Ñ™„èÉ•¹‘•É•ÈÉ•Í¥é”ÉÕ¹Ì½¹”…ÐÍÑ…ÉÑÕÀ…¹½¸Ý¥¹‘½Ü¹É•Í¥é”½¹±ä°)AH¥ÌÍ•Ð½¹”¸1…Ñ•È±…å½ÕÐ½½¹Ñ…¥¹•È½Ù¥ÍÕ…°Ù¥•ÝÁ½ÉÐ¡…¹•Ì¡…Ù”¹¼Í¥é¥¹œ½Ý¹•È¸)=É¥¥¹…°µ…¥¸É•Í¥é”¹½Ü…•ÁÑÌµ•…ÍÕÉ•Ý¥‘Ñ ½¡•¥¡Ð½…ÁÁ•‘AH…¹ÕÁ‘…Ñ•ÌM5)É•¹‘•É•È½…µ•É„½Í•±•Ñ¥½¸‘¥ÍÁ±…ä¸9•ÜÍµ…±°Ù¥•ÝÁ½ÉÐµÍ¥é¥¹œÍ¡•‘Õ±•È½…±•Í•Ì)I•Í¥é•=‰Í•ÉÙ•È°Ý¥¹‘½ÜÉ•Í¥é”½½É¥•¹Ñ…Ñ¥½¸½Á…•Í¡½Ü°Ù¥ÍÕ…±Y¥•ÝÁ½ÉÐÉ•Í¥é”…¹Í•µ…¹Ñ¥Œ)Ñ½½°µÍ•ÍÍ¥½¸ÑÉ…¹Í¥Ñ¥½¹Ì¥¹Ñ¼½¹”™É…µ”¸MÑ…ÉÑÕÀ¡…Ì…¸…‘‘¥Ñ¥½¹…°Í•ÑÑ±¥¹œ™É…µ”¸)U¹¡…¹•½‰Í•ÉÙ•È‘¥µ•¹Í¥½¹Ì¹¼µ½Àì±¥™•å±”ÑÉ…¹Í¥Ñ¥½¹ÌÉ•ÅÕ•ÍÐ½¹”Í…µ”µÍ¥é”)…¹Ù…ÌÉ•Á…¥¹Ð¸i•É¼Í¥é•Ì‘•™•È°AH¥Ì…ÁÁ•È°¹¼Á•Èµ™É…µ”Á½±±¥¹œ½Íå¹Ñ¡•Ñ¥Œ)É•Í¥é”•Ù•¹ÑÌ½Ñ•µÁ½É…ÉäÅÁà©¥±”½™½É•‘½É¥•¹Ñ…Ñ¥½¸½Í•½¹É•¹‘•É•È½È¥¹ÁÕÐ½Ý¹•È¸)Q¡¥Ì™½±±½ÝÌÉ½Ñ…Ñ¥½¸ÌÉ•Í¥é”½É•Á…¥¹ÐÁ…Ñ ‰ÕÐ•á…Ð¥A…½µÁ½Í¥Ñ½È™…Õ±ÐÉ•µ…¥¹Ì)Õ¹É•ÁÉ½‘Õ•ìäØÈ¥Ì„Ñ…É•Ñ•±¥™•å±”É•Á…¥ÈÉ•ÅÕ¥É¥¹œ‘•Ù¥”™••‘‰…¬¸)5…¥¸¡…¹•Ì=91d¡•±Á•È¥µÁ½ÉÐ°É•Í¥é”™Õ¹Ñ¥½¸…¹‰¥¹‘¥¹œì¥¹Ñ•É¹…°µ…¥¸ÍÑ…µÀ)É•Ñ…¥¹•¸5…¥¸±½…‘•ÈäØÈ¥¹Ñ•¹Ñ¥½¹…°¸äØÄ¥éµ¼‰½Õ¹‘ÌÉ•Ñ…¥¹•ìUX½Á…¥¹Ð½•½µ•ÑÉä¼)¡¥ÍÑ½Éä°ÁÉ½Ñ•Ñ•‘5Õ±Ñ¤Ä¸À…¹™É½é•¸É•±•…Í•ÌÕ¹¡…¹•¸I•Ù¥•Ý•…ÍÍ•Ð½¹ÑÉ…Ð)…‘‘Ì•á…Ðµ…¥»ŠIÙ¥•ÝÁ½ÉÐµÍ¥é¥¹œ¥µÁ½ÉÐìÍ¡•±°½É•½Ù•Éä½µ…¥¸Á¥¹ÌäØÈ¸)Q¡É•”¥¹Ñ•É…Ñ¥½¹Ìè½É¥¥¹…°µ…¥¸É•Í¥é”…±±‰…¬ÁÉ•Í•ÉÙ•ÌÉ•¹‘•É•È½…µ•É„½Á½Í¥Ñ¥½¸ì)ÍÑ…ÉÑÕÀ½Í•ÑÑ±•±…å½ÕÐ½½¹Ñ…¥¹•Èµ½¹±äÉ•Í¥é”½AH½½…±•Í¥¹œ½¹¼)Á½±±¥¹œìÍ…µ”µÍ¥é”Á…•Í¡½Ü½Í•ÍÍ¥½¸½½É¥•¹Ñ…Ñ¥½¸É•Á…¥¹Ð½é•É¼µÍ¥é”½±•…¹ÕÀ¸½ÕÍ•ÝAML¸)Õ±°½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½ÝÌ¸AÉ¥½ÈäØÄÁÉ½½˜…¹±…É¥™¥•A…¥¹Ð‘¥É•Ñ¥½¸…É”)¥¹±Õ‘•¥¸Ñ¡¥Ì¡…¹‘½™˜°ÍÕÁ•ÉÍ•‘•‰ä•áÁ±¥¥ÐäØÄ%0…‰½Ù”¸)Y%äØÈèÉ•™É•Í ¥¸19MAÝ¥Ñ¡½ÕÐÉ½Ñ…Ñ¥½¸ì¥¹ÍÁ•ÐÝ¡½±”É¥¡ÐÑ½½±‰…È½=‰©•Ð)	É½ÝÍ•È½ÍÑ…ÑÕÌ¸UXÑ½½±ÏŠI‘¥Ñ½ËŠI	…¬½±½Í”°½É‰¥ÐÑ¼‰½Ñ Í¥‘•Ì¸A…¥¹ÓŠI½¹”¡•­Ì)±¥¹•Ì¥¹‘•Á•¹‘•¹Ñ±ä°Ñ¡•¸5½Ù”½I½Ñ…Ñ”½M…±”…¹U¹‘½I•‘¼¸I•Á½ÉÐ¥˜É½Ñ…Ñ¥½¸¥ÌÍÑ¥±°)¹••‘•ì‘¼¹½Ð¥¹™•È‘•Ù¥”AML™É½´Ñ•ÍÑÌ¸•™•ÈA…¥¹Ð±…å½ÕÐµ¥É…Ñ¥½¸Õ¹Ñ¥°ÍÑ…‰±”¸((¸äØÈÑ…É•Ñ•Ù…±¥‘…Ñ¥½¸ÌÁAML¼Á%0¼ÁÍ­¥À€¡øÄ¸ÅÌ¤èÁÉ½‘ÕÑ¥½¸Í¥é¥¹œÍ¡•‘Õ±•È¬)µ…¥¸É•Í¥é”°É•±•…Í”½¹ÑÉ…Ð°½É¥¥¹…°äØÄÉ¥¹œÕ…É‘Ì°äÔÐÁ¥­¥¹œ°äÔÈUXÝ½É­ÍÁ…”°(äÀÀ…ÑÕ…°A…¥¹Ð½½É”…¹äØÀ‰ÉÕÍ É…‘¥…°¸Må¹Ñ…à¡•­Ìµ…¥¸½¡•±Á•ÈÁ…ÍÌ¸AÉ¥½È™Õ±°)ÉÕ¸Ý…Ì¥¹Ñ•ÉÉÕÁÑ•…¹Ñ•µÁ½É…Éä±½œÕ¹…Ù…¥±…‰±”ì¹¼™Õ±°äØÈ½Õ¹Ð±…¥µ•¸)UÍ•È…Í­ÌÝ¡ä‰Õ¥±‘ÌÍ±½Üè…Ù½¥‰±½­¥¹œ¡…¹‘½Ù•È½¸‘ÕÁ±¥…Ñ”±½…°­¡½ÍÑ•™Õ±°)ÍÕ¥Ñ”™½È¹…ÉÉ½Ü¡…¹•ÌìÉÕ¸É•±•Ù…¹Ð¡•­Ì…¹Ù•É¥™ä‘•Á±½åµ•¹Ð°É•Á½ÉÐ¡½ÍÑ•)™Õ±°µÍÕ¥Ñ”ÍÑ…ÑÕÌ…ÕÉ…Ñ•±ä¸¥Ñ!ÕˆÍÑ¥±°ÉÕ¹Ì™Õ±°É•É•ÍÍ¥½¸…ÕÑ½µ…Ñ¥…±±ä¸((¸äØÈÁÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”åŒÍÈÈÜÔÜÈÔÕÔàÉˆå‘”ÀØÌÀÁˆÜÐØÝ‘àÌÈäÜÉÐì•á…ÐÕÁ±½…‘•)…¹±½…°Ñ•ÍÑ•ÑÉ••˜ÐÙ™‰ˆÜÀÈÀÈÜÁ…•ˆØÝŒÄÍŒÁ”ÔàÀØÙˆÙ”ÀÔÌäÍ„¸A…•ÌÐÀÀäÔÜÀÀäÈÌ)‰Õ¥±½‘•Á±½äMUMLì¡…¹•Í¡•±°½Ù•ÉÍ¥½¸½µ…¥¸½Í¥é¥¹œ¡•±Á•ÈÐ¼Ð±¥Ù”‰åÑ”µµ…Ñ ¸)Q¡¥ÉÑäÉ•±•Ù…¹Ð¡•­ÌAMLì¹¼™Õ±°äØÈÁ…ÍÌ½Õ¹Ð±…¥µ•¸!½ÍÑ•™Õ±°É•É•ÍÍ¥½¸(ÐÀÀäÔÜÀÄÔÐØ¥¸ÁÉ½É•ÍÌ…Ð¡…¹‘½Ù•Èì¹½Ð‰±½­¥¹œ‘•Ù¥”É•Ñ•ÍÐ¸äØÄÕÍ•È%0)É•½É‘•°Á½ÉÑÉ…¥ÓŠI±…¹‘Í…Á”Ý½É­…É½Õ¹¥Ì‘¥…¹½ÍÑ¥Œ½¹±ä¸Y%äØÈ™É•Í µ±…¹‘Í…Á”)±½…½UXµ•¹ÑÉä½É•ÑÕÉ¸½½É‰¥Ð½É¥¡ÐÑ½½±‰…È­=‰©•ÑÌ­ÍÑ…ÑÕÌÉ•Ñ•ÍÐÉ•ÅÕ¥É•¸A…¥¹ÐÉ…‘¥…°)É•‘•Í¥¸É•µ…¥¹Ì‘½Õµ•¹Ñ•‘¥É•Ñ¥½¸°¹½ÐÍ¡¥ÁÁ•¸9¼‘•Ù¥”äØÈAML¥¹™•ÉÉ•¸(((ŒŒ€¸äØÌƒŠP™±½…Ñ¥¹œA…¥¹ÐÉ…‘¥…°…¹½¹Ñ•áÑÕ…°½¹ÑÉ½±Ìì€¸äØÈAMLƒŠP€ÈÐ=Ñ½‰•È€ÈÀÈØ()UÍ•È½¹™¥ÉµÌ€¸äØÈAMLìÁÉ½Ñ•Ð™É•Í µ±…¹‘Í…Á”Ù¥•ÝÁ½ÉÐÍ¥é¥¹œ°UXÝ½É­ÍÁ…”É•ÑÕÉ¸°)½É‰¥ÐÙ¥Í¥‰¥±¥Ñä…¹A…¥¹Ð½¹”É•¹‘•É¥¹œ¸M¡¥ÀÑ¡”±…É¥™¥•A…¥¹Ð¥¹Ñ•É…Ñ¥½¸ÕÍ¥¹œ)Ñ¡”•á¥ÍÑ¥¹œÙ¥•ÝÁ½ÉÐÁ…¥¹Ñ•È…¹½É¥¥¹…°µ…¥¸‰…­É½Õ¹µ¡½±½Ý¹•È¸Q¡”™±½…Ñ¥¹œ)É…‘¥…°½™™•ÉÌ	ÉÕÍ ½¥±°½É…Í•È½MµÕ‘”½	±ÕÈÁ±ÕÌ1…å•ÉÌ½5…Í¬½%µ…”½<½Q•áÑÕÉ”Á…•Ì¸)¡½½Í¥¹œ…¸¥Ñ•´±½Í•ÌÑ¡”É…‘¥…°ìÑ¡”½É¥¥¹…°Á…¥¹Ñ•È½¹ÑÉ½±Ì…ÁÁ•…È¥¸„½µÁ…Ð)Ñ½Àµ•¹ÑÉ”½¹Ñ•áÑÕ…°Á…¹•°¸!½±‘¥¹œ•µÁÑä‰…­É½Õ¹É•½Á•¹ÌÑ¡”A…¥¹ÐÉ…‘¥…°¸A•¹¥°)ÍÑÉ½­•Ì°™¥¹•È¹…Ù¥…Ñ¥½¸°U¹‘¼½I•‘¼°É•Í½ÕÉ”°<…¹¥µ…”Á±…•µ•¹Ð½¹Ñ¥¹Õ”Ñ¡É½Õ )½É¥¥¹…°½Ý¹•ÉÌ¸A…¥¹Ð¡½±¥Ì…±±½Ý•½¹±äÝ¡¥±”¥‘±”€¡¹¼ÍÑÉ½­”½¥µ…”½<ÁÉ•Ù¥•Ü¤ìÑ¡”)½É¥¥¹…°¡½±…¹•±Ì½¸µ½Ù•µ•¹Ð°µÕ±Ñ¥Ñ½Õ °Á½¥¹Ñ•È…¹•°½ÈÍ•ÍÍ¥½¸¡…¹”¸)A…¥¹ÐÍ•ÑÑ¥¹ÌÕÍ”Ñ¡”Í¡…É•Á…¹•°Á½Í¥Ñ¥½¸½Ý¹•ÈÝ¥Ñ „½µÁ…Ð½ÁÑ¥½¸ì½Ñ¡•ÈÁ½ÁÕÀ)±…å½ÕÑÌÉ•µ…¥¸Õ¹¡…¹•¸¥A…Ñ…Ñ¥±”…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ¸((´A…¥¹ÐÉ…‘¥…°èÑ½½°…¹½¹Ñ•áÑÕ…°µÁ…”¡½¥•Ì±½Í”Ñ¡”™±½…Ñ¥¹œÉ…‘¥…°ì¥‘±”•µÁÑäµ‰…­É½Õ¹¡½±É•½Á•¹Ì¥Ðìµ½Ù•µ•¹Ð°Á…¥¹Ñ¥¹œ½¹Ñ…Ð°¹…Ù¥…Ñ¥½¸…¹µÕ±Ñ¥Ñ½Õ ‘¼¹½ÐÉ•½Á•¸¥Ð¸(((ŒŒ€¸äØÐƒŠP±•™ÐÍ¥‘”½µÁ…ÐA…¥¹ÐÍ•ÑÑ¥¹ÌìÕÍ•È‘¥É•Ñ¥½¸ƒŠP€ÈÔ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•ÅÕ•ÍÑÌA…¥¹Ð½¹Ñ•áÑÕ…°Á½ÁÕÁÌ…Ð1P‰•…ÕÍ”Ñ½Àµ•¹ÑÉ”Í•ÑÑ¥¹Ì½‰ÍÑÉÕÐÑ¡”Ù¥•ÝÁ½ÉÐ¸-••ÀÑ¡”™±½…Ñ¥¹œÉ…‘¥…°…¹•á¥ÍÑ¥¹œÁ…¥¹Ñ•È½½¹ÑÉ½°½Ý¹•ÉÌ™É½´€¸äØÌ¸I•ÕÍ”Í¡…É•Á½Í¥Ñ¥½¸½Ý¹•ÈÝ¥Ñ ½µÁ…Ð±…å½ÕÐìÍ•ÐA…¥¹Ð¡½ÍÐ€áÁà™É½´±•™Ð½Ñ½À°Ý¥‘Ñ …ÁÁ•…ÐÌÈÁÁà°Ù¥•ÝÁ½ÉÐµ¡•¥¡ÐÍÉ½±°¸I•‘Õ”…ÁÌµ½‘•ÍÑ±äÝ¡¥±”ÁÉ•Í•ÉÙ¥¹œÉ•…‘…‰±”±…‰•±Ì…¹µ¥¹¥µÕ´Ñ…À¡•¥¡ÑÌ¸=Ñ¡•ÈÑ½½°Á½ÁÕÁÌÉ•Ñ…¥¸Ñ½Àµ•¹ÑÉ”Á±…•µ•¹Ð¸Y%äØÐè	ÉÕÍ ½	±ÕÈ±•™ÐÁ±…•µ•¹Ð°ÍÁ…¥¹œ°É…‘¥…°¡½±½É•½Á•¸°A•¹¥°°™¥¹•È¹…Ù¥…Ñ¥½¸°U¹‘½I•‘¼°½¹Ñ•áÑÕ…°Á…•Ì…¹½¹”¸9•áÐè½‰Ñ…¥¸¥A……•ÁÑ…¹”½˜É…‘¥…°€¬±•™ÐÁ½ÁÕÀ‰•™½É”µ½É”½¹ÑÉ½±ÌìÑ¡•¸ÁÉ¥½É¥Ñ¥é”™…•É½ÕÀÁ…¥¹Ñ¥¹œ¸((´A…¥¹Ð½¹Ñ•áÑÕ…°Á…¹•±ÌÉ•µ…¥¸¹…ÉÉ½Ü°ÍÉ½±±…‰±”…¹½¸Ñ¡”±•™ÐìÍÁ…¥¹œÍÑ…åÌ½µ™½ÉÑ…‰±”…¹É…‘¥…°¡½±™±½ÜÝ½É­Ì¸(((ŒŒ€¸äØÔƒŠPA…¥¹ÐÝ½É­™±½Ü…¹U$•Ù¥‘•¹”ƒŠP€ÈÔ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸äØÐAML…•ÁÑÌ1P½µÁ…ÐA…¥¹ÐÁ½ÁÕÀ°‰ÕÐÉ•ÕÉÉ¥¹œ¥¹…Ñ¥Ù”É¥¡ÐµÍ¥‘”U$)É•µ…¥¹Ì=A8¸¼¹½Ð¥¹™•ÈÉ•¹‘•É¥¹œÉ•Á…¥É•¸ÕÉÉ•¹ÐÉ•ÅÕ•ÍÑ•U$è‰½ÑÑ½´UXA%9P)‰•Í¥‘”M1Pì¹…Ñ¥Ù”UXÙ…±¥‘…Ñ¥½¸‰•™½É”•¹ÑÉäì½É¥¥¹…°=‰©•ÐÉ…‘¥…°A…¥¹ÐÍ•Ñ½È)É•µ½Ù•¸¥±”­••ÁÌ¹¼‘ÕÁ±¥…Ñ”‰ÕÑÑ½¸½¹”‰½ÑÑ½´‰…È¥ÌÉ•…‘ä¸1…å•ÉÌ¹½Ü…±Ý…åÌ)Ù¥Í¥‰±”…ÐÑ½À°Í•±•Ñ•½¹Ñ•áÑÕ…°Í•ÑÑ¥¹Ì‰•±½Ü¸I…‘¥…°¡½¥•ÌÍÑ…äÙ¥Í¥‰±”Õ¹Ñ¥°)A•¹¥°‰•¥¹Ì„Ù…±¥ÍÕÉ™…”ÍÑÉ½­”½¥µ…”•ÍÑÕÉ”ì‰É½ÝÍ¥¹œ¡½¥•Ì…‘‘Ì¹¼¡¥ÍÑ½Éä¸)I•Á•…Ñ•A…¥¹Ð•¹ÑÉäÉ•½Á•¹ÌÑ½½±Ìì•µÁÑä‰…­É½Õ¹¡½±É•ÕÍ•Ìµ…¥¸ÌÍ¥¹±”Ñ¥µ•È)Ý¥Ñ •áÁ±¥¥ÐA…¥¹Ð‰…­É½Õ¹Á½±¥ä°‰åÁ…ÍÍ¥¹œµ½‘•±±¥¹œ¡¥ÐÁÉ½á¥•Ì¸½¹”•á¥ÑÌì)Í…Á”…¹•±Ì±¥Ù”½¹Ñ…ÐÝ¥Ñ¡½ÕÐ±•…Ù¥¹œA…¥¹Ðì½µÁ•Ñ¥¹œÑ½½°±…Õ¹ ¥ÌÉ•™ÕÍ•¸)%¹Ù…±¥½‘•±•Ñ••½µ•ÑÉäµ…äÍÑ¥±°±½Í”™½ÈÉ•Í½ÕÉ”Í…™•Ñä¸()MµÕ‘”…Õ‘¥Ð™½Õ¹‰½Õ¹‘•€á4µÝ½É¬Õ…ÉÑ¡É•Ü…¹…¹•±±•Ù…±¥ÍÑÉ½­”Á¥á•±Ì¸)Õ…É¹½ÜÁ…ÕÍ•Ì…‘‘¥Ñ¥½¹…°‘…‰Ì…Ð…À…¹•áÁ½Í•Ì„±¥™ÐµÑ¼µ­••ÀÍÑ…ÑÕÌì±¥™Ñ¥¹œ)½µµ¥ÑÌÑ¡”Ù…±¥ÁÉ•™¥à¹½Éµ…±±ä¸…¹•±±…Ñ¥½¸½¡•­Á½¥¹ÐÉ•™ÕÍ…°ÍÑ¥±°É•ÍÑ½É”¸)9¼Õ¹‰½Õ¹‘•É…ÍÑ•ÈÝ½É¬½È¡…¹•…À¸5…ÀÍ¥é”É•Á±…•Ì…µ‰¥Õ½ÕÌQ•áÑÕÉ”…ÁÑ¥½¸è)½±½ÕÈÉ•Í½±ÕÑ¥½¸½±•…äÔÄÈµÑ¼ÄÀÈÐ•¹±…É•µ•¹Ð°¹½Ð„‰ÉÕÍ ¸()¥±”ƒŠHU$•‰Õœ•áÑ•¹‘Ì½É¥¥¹…°½ÁÐµ¥¸•ÍÑÕÉ”‘•‰Õœè‰½Õ¹‘•ÄÀÀ•Ù•¹ÑÌ°É¥¡ÐµÍ¥‘”)¡¥ÐµÑ•ÍÐÍÑ…­Ì°‰½Õ¹‘Ì½ÍÑå±•Ì½Ù¥Í¥‰¥±¥Ñä°…¹Ù…Ì½Ù¥ÍÕ…±Y¥•ÝÁ½ÉÐ°Í•ÍÍ¥½¸°•ÉÉ½ÉÌ…¹)½¹Ñ•áÐ±½ÍÌ¸…ÁÑÕÉ”É•Á½ÉÐÑ¡•¸½ÁäÉ•Á½ÉÐ…™Ñ•È¥¹…Ñ¥Ù”U$½ÕÉÌì™±…œÁ•ÉÍ¥ÍÑÌ)Ñ¡É½Õ É•™É•Í ¸¥…¹½ÍÑ¥ŒÉ•…‘Ì…¹±¥ÍÑ•¹•ÉÌ¹•Ù•È½¹ÍÕµ”¥¹ÁÕÐ¸á…Ð¥A…™…¥±ÕÉ”)¹½ÐÉ•ÁÉ½‘Õ•ì‘•‰Õœµ½‘”…Ñ¡•ÉÌ•Ù¥‘•¹”°‘½•Ì¹½Ð±…¥´„½µÁ½Í¥Ñ½ÈÉ•Á…¥È¸()Y%äØÔè¹¼µUX½‰©•ÐÉ•™ÕÍ•ÌA…¥¹ÐìUX½‰©•Ð½Á•¹Ì™É½´‰½ÑÑ½´¸%¹ÍÁ•ÐÑ½À1…å•ÉÌ)…¹Í•ÑÑ¥¹Ì‰•±½Ü°‰É½ÝÍ”É…‘¥…°¡½¥•ÌÑ¡•¸A•¹¥°Á…¥¹Ð¡¥‘•Ì¥Ðì‰…­É½Õ¹¡½±)É•½Á•¹Ì¸1½¹œMµÕ‘”½±¥™Ð­••ÁÌÁ¥á•±Ì¸¥¹•ÉÌ½U¹‘½I•‘¼…¹½¹”¸¹…‰±”U$•‰Õœ°)É•ÁÉ½‘Õ”É¥¡ÐµÍ¥‘”™…¥±ÕÉ”°…ÁÑÕÉ”É•Á½ÉÐƒŠH½ÁäÉ•Á½ÉÐ…¹Í•¹É•Á½ÉÐ¸(((¸äØÔÙ…±¥‘…Ñ¥½¸è™Õ±°±½…°9½‘”ÈÐÍÕ¥Ñ”ÈàÄÀAML¼À%0¼ÀÍ­¥ÁÁ•€ äÀ¸ÅÌ¤ì)™½ÕÍ•ÁÉ½‘ÕÑ¥½¸½U$½¡½±½‘•‰Õœ½MµÕ‘”…¹É•±•…Í”¡•­ÌÁ…ÍÍ•¸I•Ù¥Í•½±Ñ•ÍÑÌ)½¹±äÝ¡•É”ÕÍ•Èµ‘¥É•Ñ•U$¡…¹•€¡É…‘¥…°Á•ÉÍ¥ÍÑ•¹”°Í…±…Èµ±…å•ÈÙ¥Í¥‰¥±¥Ñä°)É•µ½Ù•=‰©•ÐA…¥¹ÐÍ•Ñ½È¤ìÉ•Ñ…¥¹•É…ÍÑ•È…¹•°½É•™ÕÍ…°…¹ÁÉ½Ñ•Ñ•¥éµ¼)‰½Õ¹‘Ì½¹…Ù¥…Ñ¥½¸…ÍÍ•ÉÑ¥½¹Ì¸=±™¥á•ÜÌÈÍ¡…É•µ‘½¬Á¥¸…ÍÍ•ÉÑ¥½¸¹½ÜÕÍ•ÌÉ•Ù¥•Ý•)…¡”½¹ÑÉ…Ðì¹•…Ñ¥Ù”‰…­É½Õ¹Ñ•ÍÐµÕÑ…Ñ•Ì	=Q ¹…Ñ¥Ù”¡½±‰É…¹¡•Ìì‘•‰Õœ)™¥áÑÕÉ”ÁÉ•Í•ÉÙ•ÌµÕ±Ñ¥Á±”½‰Í•ÉÙ•ÉÌ…¹•á¥ÍÑ¥¹œÉÕ¹Ñ¥µ”µ•ÉÉ½È•áÑÉ…Ñ¥½¸‰½Õ¹‘…Éä¸(¸äØÐÉ•¹‘•É¥¹œ¥ÍÍÕ”É•µ…¥¹Ì=A8ì‘•‰ÕœÉ•Á½ÉÐ¥Ì‘¥…¹½ÍÑ¥Œ•Ù¥‘•¹”°¹½Ð„™¥à¸)IÕ¹Ñ¥µ”ÁÕ‰±¥…Ñ¥½¸…¹¡½ÍÑ•$ÁÉ½½˜…É”Ù•É¥™¥•Í•Á…É…Ñ•±ä…™Ñ•ÈÑ¡¥Ì½µµ¥Ð¸(((ŒŒ€¸äØØƒŠP½¹Ñ¥¹Õ¥¹œMµÕ‘”¥¹ÁÕÐÝ¥¹‘½ÝÌìÍÑ…ÉÑÕÀÑ½½±‰…È•Ù¥‘•¹”ƒŠP€ÈÔ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸äØÔAMLÁÉ½Ñ•ÑÌ‰½ÑÑ½´A…¥¹Ð•¹ÑÉä°Á•ÉÍ¥ÍÑ•¹ÐÉ…‘¥…°°1…å•ÉÌµ™¥ÉÍÐ1P)Í•ÑÑ¥¹Ì…¹­•ÁÐMµÕ‘”Á¥á•±Ì¸UÍ•ÈÉ•Á½ÉÑÌMµÕ‘”ÍÑ¥±°ÍÑ½ÁÌ…™Ñ•È×ŠLØÁ…ÍÍ•Ì¸)=É¥¥¹…°á4É…ÍÑ•ÈÝ½É¬…ÀÝ…Ì½¹Ñ…ÐµÝ¥‘”ìÉ•¹•Ü=91d¥ÑÌÝ½É¬½Õ¹Ñ•ÉÌÁ•È¹…Ñ¥Ù”)MµÕ‘”¥¹ÁÕÐÍ…µÁ±”°É•Ñ…¥¹¥¹œ‰•™½É”Í¹…ÁÍ¡½Ð½½Ù•É…”½Á¥­ÕÀ½‘¥ÉÑäÁ¥á•±Ì¸‰½Õ¹‘•)Í…µÁ±”µ…äÁ…ÕÍ”‘…‰Ì°¹•áÐ¥¹ÁÕÐÉ•ÍÕµ•Ì¸Ð½É¥¥¹…°ÄÈÀÀÀÁ…Ñ µ‘…ˆ…À°É•Í••Í…µ”)½É¥¥¹…°Á…Ñ ½Ý¹•È™É½´±…ÍÐÍÉ••¸¥¹ÁÕÐÝ¡¥±”É•Ñ…¥¹¥¹œÑ¡”É…ÍÑ•È½¹Ñ…Ð¸9¼)•áÑÉ„¡•­Á½¥¹ÑÌ½È±…å•È™¥¹¥Í Õ¹Ñ¥°Á¡åÍ¥…°±¥™ÐèU¹‘¼É•µ…¥¹Ì½¹”ÍÑÉ½­”¸)…¹•°½¡•­Á½¥¹ÐÉ•™ÕÍ…±ÌÉ•Ñ…¥¸…Ñ½µ¥ŒÉ½±±‰…¬¸	ÉÕÍ ½¥±°½É…Í•È½	±ÕÈÕ¹¡…¹•¸()UÍ•ÈÍÕÁÁ±¥•€¸äØÔ‘•‰ÕœÉ•Á½ÉÐ™É½´É•™É•Í ™…¥±ÕÉ”èÄÌØÛ\ààØ°…¹Ù…ÌÄÌØÛ\àÈÙML€¼(ÈÜÌË\ÄØÔÉÁ¥á•±Ì…ÑAHÈ°Á…¥¹Ñ™…±Í”½Í•ÍÍ¥½¹¹Õ±°½½¹ÑÉ½±Í•¹…‰±•ìÍ…µÁ±•É¥¡Ð9YL)½¹Ñ…ÑÌÉ•… Ý¥¹‘½Ü‰Õ‰‰±”¸9¼‰É½…½Ù•É±…ä¥¸Ñ¡½Í”…¹Ù…ÌÍ…µÁ±•Ì¸Q¡¥Ì‘½•Ì9=P)ÁÉ½Ù”Ñ½½±‰…È¡¥ÐÑ•ÍÑ¥¹œ½È½µÁ½Í¥Ñ½ÈÁ…¥¹Ñ¥¹œ¡•…±Ñ¡äè½É¥¥¹…°É¥ÍÑ…ÉÑÍdÜÄ)‰•±½ÜØÁÁà¡•…‘•È…¹½µ¥ÑÑ•€¹Ñ½Àµ…Ñ¥½¹Ì½É¥¡Ð‰ÕÑÑ½¸É•ÑÌ¸UÍ•È½¹™¥ÉµÌÉ•™É•Í )…¸•¹Ñ•È™…¥±•ÍÑ…Ñ”‘¥É•Ñ±ä¸áÑ•¹•á¥ÍÑ¥¹œ‘•‰ÕœÉ•Á½ÉÐÝ¥Ñ •á…ÐÉ¥¡Ðµ‰ÕÑÑ½¸)É•Ð½ÍÑå±•Ì½‘¥Í…‰±•½•áÁ…¹‘•½•¹ÑÉ”¡¥ÐÍÑ…­Ìì…ÁÑÕÉ”Ñ¡•Í”½¸Á•ÉÍ¥ÍÑ•µ‘•‰Õœ)ÍÑ…ÉÑÕÀ½Á…•Í¡½Ü½±¥™•å±”…¹Ñ½½±‰…È±¥¬¸9¼É½½Ð…ÕÍ”½ÈÉ•¹‘•É¥¹œ™¥à±…¥µ•¸()Y%äØØè±½¹œÉ•Á•…Ñ•MµÕ‘”Á…ÍÍ•ÌÕ¹‘•È½¹”A•¹¥°½¹Ñ…Ð½¹Ñ¥¹Õ”ì±¥™Ð­••ÁÌ)É•ÍÕ±Ð°=9U¹‘¼½I•‘¼É•ÍÑ½É•ÌÝ¡½±”½¹Ñ…Ð°…¹•°É•ÍÑ½É•ÌÁÉ”µ½¹Ñ…Ð¸±°€¸äØÔ)U$™±½ÜÉ•µ…¥¹Ì¸¹…‰±”U$•‰Õœ°É•™É•Í ‘¥É•Ñ±ä¥¹Ñ¼É¥¡Ð™…¥±ÕÉ”°…ÁÑÕÉ”½½Áä)¹•ÜÉ•Á½ÉÐ½¹Ñ…¥¹¥¹œ½¹ÑÉ½±Ì…¹ÍÑ…ÉÑÕÀ•Ù¥‘•¹”ìÑ…À…™™•Ñ•É¥¡Ð‰ÕÑÑ½¸™¥ÉÍÐ)¥˜ÁÉ…Ñ¥…°¸á…ÐÑ½½±‰…ÈÁÉ½‰”‘¥ÍÑ¥¹Õ¥Í¡•Ì½™™ÍÉ••¸½‘¥Í…‰±•½½±ÕÍ¥½¸™É½´)=4µ¡•…±Ñ¡ä‰ÕÐÙ¥ÍÕ…±±ä‰É½­•¸U$ì¹…Ñ¥Ù”¥A…É•¹‘•É¥¹œ…Ñ”É•µ…¥¹Ì=A8¸(((¸äØØÙ…±¥‘…Ñ¥½¸è™Õ±°±½…°9½‘”ÈÐÍÕ¥Ñ”ÈàÄÌAML¼À%0¼ÀÍ­¥ÁÁ•€ äÔ¸ÁÌ¤ì)™½ÕÍ•MµÕ‘”½•ÍÑÕÉ”½U$½‘•‰Õœ½1…ˆ½É•±•…Í”ÐÄAML¸9•Ü¡•­ÌÁÉ½Ù”É•¹•Ý•Ý½É¬)Ý¥¹‘½ÝÌÉ•Ñ…¥¸Á¥á•±Ì…¹…¹•±±…Ñ¥½¸‰…Í•±¥¹”ì±½¹œ…ÑÕ…°ÍÕÉ™…”µÁ¥­•MµÕ‘”)Á…ÍÍ•Ì½É¥¥¹…°ÄÈÀÀÀÁ…Ñ ‰Õ‘•Ð°•‘¥ÑÌ±…Ñ”Á¥á•±Ì…¹½µµ¥ÑÌ=9U¹‘¼½I•‘¼•¹ÑÉäì)É¥¡ÐÑ½½±‰…È•¹ÑÉ”ÁÉ½‰•Ì¥¹±Õ‘”¡•…‘•ÉdÌÀ…¹Á•ÉÍ¥ÍÐ¥¸Á…•Í¡½Ü•Ù¥‘•¹”¸)AÉ¥½È€¸äØÔ¡½ÍÑ•É•É•ÍÍ¥½¸ÐÀÄàÄÈÀØÀÐà¡…Ì¹½Ü½µÁ±•Ñ•MUML¸á…ÐÍÕÁÁ±¥•)É•™É•Í É•Á½ÉÐ½‰Í•ÉÙ…Ñ¥½¹Ì…É”…É¡¥Ù•¥¸‘½Ì½Õ¤µ‘•‰ÕœµÉ•™É•Í ´äØÔµÉ•Á½ÉÐ¹µ¸)I¥¡ÐµÍ¥‘”¹…Ñ¥Ù”¥A…™…¥±ÕÉ”É•µ…¥¹Ì=A8ì¹¼É•¹‘•É¥¹œ™¥à¥¹™•ÉÉ•¸(((ŒŒ€¸äØÜƒŠP…¹Ù…Ì½U$½µÁ½Í¥Ñ¥½¸‰½Õ¹‘…Éäì€¸äØØ¥¹Ù¥Í¥‰±”±¥­…‰±”½¹ÑÉ½±ÌƒŠP€ÈÔ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌÉ¥¡Ð½¹ÑÉ½±ÌÉ•µ…¥¸±¥­…‰±”Ý¡¥±”Ù¥ÍÕ…±±ä…‰Í•¹ÐìÍÝ¥Ñ¡¥¹œ…Ý…ä)Ñ¼¡…ÑAP…¹‰…¬É•ÍÑ½É•Ì…ÁÁ•…É…¹”¸á…Ð€¸äØØÉ•Á½ÉÐÄÀèÈÈèÀáhÍ¡½ÝÌÉ¥¡Ð)‰ÕÑÑ½¹Ì½¸µÍÉ••¸½•¹…‰±•½Ù¥Í¥‰±”½½Á…¥ÑäÄ°¹¼ÑÉ…¹Í™½ÉµÌ½™¥±Ñ•ÉÌ½±¥ÀÁ…Ñ¡Ì°•á…Ð)‰ÕÑÑ½¸½MY¡¥ÐÍÑ…­ÌìU¹‘¼±¥¬É•…¡•ÌÝ¥¹‘½Ü‰Õ‰‰±”¸A…¥¹Ñ™…±Í”½Í•ÍÍ¥½¹¹Õ±°¸)MÑ…ÉÑÕÀÑ½½±‰…ÈÉ½ÝÌ™É½´ÄÌÐ¸ÔÙÁàÝ¥‘”…ÐÐÔåµÌÑ¼ÌÄÜ¸ØÅÁà…ÐØÐåµÌ°Ý¥Ñ ½ÉÉ•Ð)±…å½ÕÐ‰ÕÐÉ•Á½ÉÑ•¥¹Ù¥Í¥‰±”Á¥á•±Ì¸Ù¥‘•¹”Á½¥¹ÑÌÑ¼Á…¥¹Ñ¥¹œ½½µÁ½Í¥Ñ¥¹œ°¹½Ð)É•µ½Ù•U$°½™™ÍÉ••¸±…å½ÕÐ°‘¥Í…‰±•½¹ÑÉ½±Ì½È‰É½…¥¹ÁÕÐ¥¹Ñ•É•ÁÑ¥½¸¸Q¡¥Ì)¥Ì…¸¥¹™•É•¹”°9=P„±½…±±äÉ•ÁÉ½‘Õ•]•‰-¥Ðµ•¹¥¹”‘¥…¹½Í¥Ì¸()Q…É•Ñ•É•Á…¥È¥¸½É¥¥¹…°ÍÑå±•Í¡••ÐèÙ¥•ÝÁ½ÉÑ]É…À¥Í½±…Ñ•ÍÑ…¬…ÑèÀ°½É¥¥¹…°)…¹Ù…Ì‰½Õ¹‘•‰ä½¹Ñ…¥¸éÁ…¥¹ÐÝ¥Ñ ¥ÑÌ½Ý¹èÀì¡•…‘•ÈÉ•µ…¥¹ÍèÄÀ…‰½Ù”Ù¥•ÝÁ½ÉÐ¸)!•…‘•È½ÍÑ…ÑÕÌ½=‰©•Ð	É½ÝÍ•È•Ð¥Í½±…Ñ•½µÁ½Í¥Ñ¥¹œ¡¥¹ÑÌÙ¥„Ý¥±°µ¡…¹”é½Á…¥Ñä°)Ý¥Ñ¡½ÕÐÑÉ…¹Í™½ÉµÌ°½Á…¥Ñä¡…¹•Ì°±¥ÁÁ¥¹œU$µ•¹ÕÌ½ÈÉ•Á…É•¹Ñ¥¹œ…¹ä½¹ÑÉ½°¸)Y%\™¥á•Á½ÁÕÀÉ•µ…¥¹ÌÙ¥•ÝÁ½ÉÐµÉ•±…Ñ¥Ù”ì™±½…Ñ¥¹œÑ½½±ÌÉ•Ñ…¥¸Ñ¡•¥È½Ý¸½Ý¹•ÉÌ¸)=É¥¥¹…°Ù¥•ÝÁ½ÉÐµÍ¥é¥¹œÍ¡•‘Õ±•È¹½Ü½…±•Í•Ì™½ÕÌ…¹Ù¥Í¥‰±”µ‘½Õµ•¹Ð•Ù•¹ÑÌ)Ñ¡É½Õ M5É•Í¥é”½É•Á…¥¹Ð½Ý¹•Èì¡¥‘‘•¸µ‘½Õµ•¹Ð•Ù•¹ÑÌ‘¼¹½ÐÉ•‘É…Ü¸Q•…É‘½Ý¸)É•µ½Ù•Ì‰½Ñ ±¥ÍÑ•¹•ÉÌ¸9¼Íå¹Ñ¡•Ñ¥ŒÉ•Í¥é”°Á•Èµ™É…µ”Á½±±¥¹œ°=4¡¥‘¥¹œ°É•±½…°)¹•ÜÉ•¹‘•É•È½¡¥ÍÑ½Éä½¥¹ÁÕÐ½Ý¹•È½Èµ½‘•±±¥¹œ½Á…¥¹Ð¡…¹•Ì¸•‰ÕœÍ¹…ÁÍ¡½ÐÉ•½É‘Ì)½¹Ñ…¥¸½¥Í½±…Ñ¥½¸½Ý¥±°µ¡…¹”Í¼€¸äØÜ±…å•ÈÉÕ±•Ì…¸‰”Ù•É¥™¥•½¸‘•Ù¥”¸((¸äØÔA…¥¹ÐU$AMLÁÉ½Ñ•Ñ•ì€¸äØØ½¹Ñ¥¹Õ¥¹œµMµÕ‘”…•ÁÑ…¹”É•µ…¥¹ÌÍ•Á…É…Ñ”¸)Y%äØÜèÉ•™É•Í ¥¸±…¹‘Í…Á”É•Á•…Ñ•‘±ä°Ù•É¥™ä…±°É¥¡Ð‰ÕÑÑ½¹Ì½ÍÑ…ÑÕÌ…¹)=‰©•Ð	É½ÝÍ•Èì¥¹Ñ•É…Ð‰•™½É”¡…¹¥¹œ…ÁÁÌ°•¹Ñ•È½•á¥ÐUX‘¥Ñ½È…¹A…¥¹Ð°)É½Ñ…Ñ”½½É‰¥Ð¸MÝ¥Ñ …Ý…ä½‰…¬Ù•É¥™¥•ÌÉ•½Ù•Éä‘½•Ì¹½Ð±½Í”U$½Ý½É¬¸%˜¥¹Ù¥Í¥‰±”)½¹ÑÉ½±ÌÉ•ÕÈ°•¹…‰±”U$•‰Õœ‰•™½É”É•™É•Í …¹Í•¹…ÁÑÕÉ”½½ÁäÉ•Á½ÉÐÁ±ÕÌ)ÍÉ••¹Í¡½Ð¥˜ÁÉ…Ñ¥…°¸I•Á…¥ÈÉ•µ…¥¹Ì…¸¥A……Ñ”Õ¹Ñ¥°•áÁ±¥¥Ð™••‘‰…¬¸(((¸äØÜÙ…±¥‘…Ñ¥½¸è™Õ±°±½…°9½‘”ÈÐÍÕ¥Ñ”ÈàÄÔAML¼À%0¼ÀÍ­¥ÁÁ•€ äÌ¸åÌ¤ì)™½ÕÍ•É•±•…Í”½Í¥é¥¹œ½UX½A…¥¹Ð½‘•‰Õœ¡•­ÌÐÀAML¸9•Ü½Ù•É…”¡•­Ì™½ÕÌ½Ù¥Í¥‰±”)É•ÑÕÉ¸½…±•Í¥¹œ°¡¥‘‘•¸µ‘½Õµ•¹ÐÉ•™ÕÍ…°…¹‘¥ÍÁ½Í…°ì…¹Ù…Ì½¹Ñ…¥¹µ•¹Ð…¹)Õ¹ÑÉ…¹Í™½Éµ•½Õ¹±¥ÁÁ•Y%\Á½ÁÕÀ½¹ÑÉ…ÐÉ•Ñ…¥¹•¸±½…°¡É½µ¥Õ´±…å½ÕÐÍµ½­”)Ý…Ì…ÑÑ•µÁÑ•‰ÕÐÑ¡”¥¹ÍÑ…±±•A±…åÝÉ¥¡ÐÁ…­…”¡…Ì¹¼‰É½ÝÍ•È•á•ÕÑ…‰±”¡•É”ì)¹¼É•¹‘•É•µ‰É½ÝÍ•È½È¹…Ñ¥Ù”]•‰-¥ÐÁÉ½½˜±…¥µ•¸UÍ•ÈÌ€¸äØØÉ•Á½ÉÐ¥Ì…É¡¥Ù•)¥¸‘½Ì½Õ¤µ‘•‰Õœµ¥¹Ù¥Í¥‰±”µ½¹ÑÉ½±Ì´äØØ¹µ¸•Ù¥”Ù¥ÍÕ…°…Ñ”É•µ…¥¹Ì=A8¸(((ŒŒ€¸äØÜÁÉ½Ñ•Ñ•ÕÍ•ÈAMLƒŠP€ÈÔ=Ñ½‰•È€ÈÀÈØ((´mátUÍ•ÈAIP€¼AMLèÉ¥¡Ð½¹ÑÉ½±ÌÉ•µ…¥¸Ù¥Í¥‰±”…™Ñ•È±…¹‘Í…Á”É•™É•Í …¹U$ÑÉ…¹Í¥Ñ¥½¹ÌìÉ•Ñ…¥¸€¸äØÜ…¹Ù…Ì½U$¥Í½±…Ñ¥½¸…¹Ù¥Í¥‰±”µÁ…”É•Á…¥¹Ð½Ý¹•È¸(´ltÕÑÕÉ”¥½¸‰Õ¥±‘ÌèÉ•Ù¥•ÜÑ¡É•”Ù¥ÍÕ…°…¹‘¥‘…Ñ•ÌÁ•ÈÑ½½°ì¥¹ÍÑ…±°½¹±äÉ•™¥¹•ÕÍ•ÈÍ•±•Ñ¥½¹Ì°Ý¥Ñ ¥½¸…‰½Ù”Íµ…±°Ù¥Í¥‰±”Ñ¥Ñ±”¸AÉ•Í•ÉÙ”½É¥¥¹…°…Ñ¥½¸Ñ…É•ÑÌ°É…‘¥…°Á½Í¥Ñ¥½¹Ì°Ñ½Õ Ñ…É•ÑÌ…¹¡¥ÍÑ½Éä½•ÍÑÕÉ”½Ý¹•ÉÍ¡¥À¸()A±…¹¹¥¹œÕÁ‘…Ñ”½¹±äèÉÕ¹Ñ¥µ”€¸äØÜÕ¹¡…¹•ì¹¼¹•Ü¡…¹‘Ìµ½¸Ñ•ÍÐÉ•ÅÕ¥É•¸((ŒŒI…‘¥…°Ù¥ÍÕ…°Í•±•Ñ¥½¸Í¡••ÑÌØÄ½µÁ±•Ñ”ƒŠP€ÈÔ=Ñ½‰•È€ÈÀÈØ()•Í¥¸É•Ù¥•Ü½¹±äìÉÕ¹Ñ¥µ”É•µ…¥¹Ì€¸äØÜÝ¥Ñ ÁÉ½Ñ•Ñ•ÕÍ•ÈAIP½AML¸±°ØÔ)Í•µ…¹Ñ¥ŒÑ½½±Ì¹½Ü¡…Ù”Q!I½É¥¥¹…°Ù•Ñ½È…¹‘¥‘…Ñ•ÌèÄäÔMYÌ½¸ÄÀÍ¡••ÑÌ¸)•±¥Ù•É•	½á1…ˆµ%½¸µM•±•Ñ¥½¸¹Á‘˜°	½á1…ˆµ%½¸µI•Ù¥•Ü¹¡Ñµ°…¹)	½á1…ˆµ%½¸µI•Ù¥•ÜµA…¬¹é¥À€¡A½!Q50½A9Í¡••ÑÌ½MYÌ½µ…¹¥™•ÍÐ½É•‰Õ¥±Í½ÕÉ”¤¸)9¼‘•™…Õ±Ð½ÕÍ•È¥½¸Í•±•Ñ¥½¹Ìì…Ý…¥ÐÑ½½°µ¹…µ”€¬½½¡½¥•Ì°Ñ¡•¸É•™¥¹”‰•™½É”)¥¹ÍÑ…±±…Ñ¥½¸¸M¡…É•Íåµ‰½±ÌÉ•Ñ…¥¹•¥¸½¹”É•Ù¥•ÜÉ½ÜìY•ÉÑ•à½=‰©•Ð)½¥¸Í•Á…É…Ñ”¸)M•”‘½Ì½É…‘¥…°µ¥½¸µÉ•Ù¥•ÜµØÄ¹µ¸9¼¹•Ü…ÁÀÑ•ÍÐ½ÈÉÕ¹Ñ¥µ”É•±•…Í”¹••‘•¸((ŒŒ€¸äØà…”¥½¸‘•Ù¥”É•Ù¥•Ü((´mát…”É…‘¥…°Í¡½ÝÌÈÌAÉ½½˜ÀÌ¥½¹ÌÝ¥Ñ ½É¥¥¹…°Íµ…±°…ÁÑ¥½¹Ìì…±°Ñ½½±ÌÉ½ÕÑ”Õ¹¡…¹•¸(´mátáÑÉÕ‘”…ÐÄÈ…¹	•Ù•°…ÐÌì¥½¸…É•„Ñ…ÁÌ±…Õ¹ ½É¥¥¹…°Ñ½½°ìÕ¹…Ù…¥±…‰±”ÍÑ…Ñ•ÌÉ•µ…¥¸±•…È¸(´mát%¹¹•È½½ÕÑ•È¥½¹ÌÉ•µ…¥¸±•¥‰±”½¸¥A…ì¹…Ù¥…Ñ¥½¸°¡¥ÍÑ½Éä…¹€¸äØÜÉ¥¡ÐµÑ½½±‰…ÈÙ¥Í¥‰¥±¥ÑäÁÉ•Í•ÉÙ•¸((ŒŒ€¸äØäY•ÉÑ•à¥½¸‘•Ù¥”É•Ù¥•Ü((¸äØà…”¥½¸É•Ù¥•Ü•áÁ±¥¥Ñ±äAML½¸ÈØ=Ñ½‰•ÈÈÀÈØ¸((´mátY•ÉÑ•àÉ…‘¥…°Í¡½ÝÌÄÐÍ•±•Ñ•AÉ½½˜ÀÌ¥½¹ÌÝ¥Ñ Íµ…±°½É¥¥¹…°…ÁÑ¥½¹Ì…¹‘¥ÍÑ¥¹ÐY•ÉÑ•à)½¥¸¸(´mát=É¥¥¹…°Á½Í¥Ñ¥½¹Ì½…Ñ¥½¹Ì°…Ù…¥±…‰±”½‘¥Í…‰±•ÍÑ…Ñ•Ì°	Õ¥±‘”½M±¥‘”½	•Ù•°Í•ÍÍ¥½¹Ì…¹U¹‘½I•‘¼É•µ…¥¸ÕÍ…‰±”¸(´mát9…Ù¥…Ñ¥½¸½É¥¡ÐµÍ¥‘”U$ÁÉ•Í•ÉÙ•ì…•ÁÑ•…”¥½¹ÌÕ¹¡…¹•¸((ŒŒ€¸äÜÀ=‰©•Ð¥½¸‘•Ù¥”É•Ù¥•Ü((¸äØäY•ÉÑ•à¥½¸É•Ù¥•Ü•áÁ±¥¥Ñ±äAML½¸ÈØ=Ñ½‰•ÈÈÀÈØì€¸äØà…”AMLÉ•Ñ…¥¹•¸((´lt=‰©•ÐÉ…‘¥…°Í¡½ÝÌÄÌ…ÁÁÉ½Ù•¥½¹Ì…¹Íµ…±°…ÁÑ¥½¹Ìì=‰©•Ð)½¥¸‘¥™™•ÉÌ™É½´Y•ÉÑ•à)½¥¸¸(´lt1½¹•È±…‰•±Ì™¥ÐìÕÁ±¥…Ñ”½U¹‘½I•‘¼°ÉÉ…ä½M½±¥‘¥™ä…¹UX½5•Í !•…±Ñ ±…Õ¹ •á¥ÍÑ¥¹œ½Ý¹•ÉÌ¸(´lt5Õ±Ñ¤°¹…Ù¥…Ñ¥½¸…¹É¥¡ÐÑ½½±‰…ÈÉ•µ…¥¸ÕÍ…‰±”ì…”½Y•ÉÑ•à…•ÁÑ•¥½¹ÌÕ¹¡…¹•¸((ŒŒ€¸äÜÄÉÉ…ä€¬É¥¡ÐU$‘•Ù¥”…Ñ”((´lt•™…Õ±ÐUXÕ‰”½É‘¥¹…ÉäÉÉ…äÍÕ••‘ÌÝ¥Ñ ¥¹‘•Á•¹‘•¹ÐUX½Á¥•Ì°½¹”U¹‘½I•‘¼•¹ÑÉä…¹M…Ù•=Á•¸¸(´lt1¥Ù”ÉÉ…ä¹…Ñ¥Ù”UYÌÍÕÉÙ¥Ù”½Õ¹Ð•‘¥ÑÌ½É•½Á•¸½½¹Ù•ÉÐ½U¹‘½I•‘¼…¹M…Ù•=Á•¸Ý¥Ñ¡½ÕÐÉ•ÁÉ½©•Ñ¥½¸¸(´ltA…¥¹Ð½ÍÑ…±”UYÌÉ•™ÕÍ”‰•™½É”¡…¹•Ìì¥¹‘•Á•¹‘•¹Ðµ½Áä™…¥±ÕÉ”±•…Ù•Ì¹¼Á…ÉÑ¥…°Í•¹”¸(´ltI¥¡ÐÑ½½±‰…ÈÉ•µ…¥¹ÌÙ¥Í¥‰±”…™Ñ•ÈÉ•™É•Í °ÉÉ…ä½…¹•°½½¹”…¹¹…Ù¥…Ñ¥½¸ì€¸äÜÀÉ•ÕÉÉ•¹”=A8Õ¹Ñ¥°‘•Ù¥”™••‘‰…¬¸((ŒŒ€¸äÜÈA±…¥¸U$É•¹‘•É¥¹œ‘•Ù¥”…Ñ”()UÍ•ÈÉÉ…ääÜÄÝ½É­Ì½AMLìÉ¥¡ÐU$äÜÄ%0É•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ð¸((´mát=É‘¥¹…Éä…¹1¥Ù”ÉÉ…ääÜÄ…•ÁÑ•‰äÕÍ•È€£ŠqÉÉ…ä¹½ÜÝ½É­ÏŠt¤¸(´ltA±…¥¸½Á…ÅÕ”U$­••ÁÌ…±°É¥¡Ð½¹ÑÉ½±ÌÙ¥Í¥‰±”½¸É•Á•…Ñ•±…¹‘Í…Á”É•™É•Í °‰•™½É”…ÁÀÍÝ¥Ñ¡¥¹œ¸(´lt=‰©•Ð	É½ÝÍ•È½Y%\½UX‘¥Ñ½È½ÉÉ…äÑÉ…¹Í¥Ñ¥½¹Ì…¹¹…Ù¥…Ñ¥½¸É•Ñ…¥¸Ù¥Í¥‰±”U$…¹Õ¹¡…¹•¡¥ÐÑ…É•ÑÌ¸(´lt¥Í…‰±•½…Ñ¥Ù”½¹ÑÉ½±ÌÉ•µ…¥¸±•…ÈÙ¥„½É¥¥¹…°½Á…¥Ñä°‰½É‘•ÉÌ…¹ÍÑÉ½­”™••‘‰…¬¸((ŒŒ€¸äÜÌ=ÁÐµ¥¸…¹Ù…Ì‘¥…¹½ÍÑ¥Œ‘•Ù¥”…Ñ”((¸äÜÈÙ¥ÍÕ…°™…Õ±ÐÁ•ÉÍ¥ÍÑÌÝ¥Ñ Á±…¥¸ÁÉ½™¥±”Ù•É¥™¥•ìÉÉ…ääÜÄÕÍ•ÈAMLÉ•Ñ…¥¹•¸((´ltÕÉ¥¹œ™…¥±ÕÉ”è!¥‘”Í½¹±ä°½‰Í•ÉÙ”É¥¡ÐÑ½½±‰…È°É•½ÉÙ¥Í¥‰±”½µ¥ÍÍ¥¹œÝ¥Ñ¡½ÕÐ…ÁÀÍÝ¥Ñ¡¥¹œ¸(´ltM¡½ÜÍÉ•ÍÑ½É•Ì…¹Ù…Ì½µ½‘•°ì¹½Ñ”Ý¡•Ñ¡•ÈÉ¥¡ÐU$™…¥±Ì……¥¸¸(´lt½ÁäÉ•Á½ÉÐ¥¹±Õ‘•Ì…¹Ù…ÌµÁÉ½‰”µ½‰Í•ÉÙ…Ñ¥½¸…¹É•ÍÑ½É•ÍÑ…Ñ”¸(´lt•‰Õœ½™˜½Á…•¡¥‘”…±Ý…åÌÉ•ÍÑ½É•ÌÁÉ¥½È…¹Ù…ÌÙ¥Í¥‰¥±¥Ñäì¹¼Í•¹”½¡¥ÍÑ½Éä¡…¹•Ì¸((ŒŒ€¸äÜÐ‘”¥½¸‘•Ù¥”É•Ù¥•Ü()UÍ•ÈÉ•Á½ÉÑÌ…¹¹½ÐÉ•ÁÉ½‘Õ”É¥¡ÐÙ¥ÍÕ…°™…Õ±ÐÕÉÉ•¹Ñ±äì¥½¸É½±±½ÕÐÉ•ÍÕµ•)‰ä•áÁ±¥¥Ð¥¹ÍÑÉÕÑ¥½¸¸%¹Ñ•Éµ¥ÑÑ•¹Ð™…Õ±Ð¹½Ðµ…É­•™¥á•ìäÜÌÁÉ½‰”É•Ñ…¥¹•¸((´mát±°ÈÄ‘”¥½¹Ìµ…Ñ AÉ½½˜ÀÌ°Íµ…±°Ñ¥Ñ±•Ì™¥Ð…¹½ÕÑ•ÈÑ…É•ÑÌ‘¼¹½Ð½Ù•É±…À¸(´ltáÑÉÕ‘”ÄÈ½	•Ù•°Ì…¹½É¥¥¹…°Ñ½½°…Ñ¥½¹Ì½‘¥Í…‰±•ÍÑ…Ñ•ÌÉ•Ñ…¥¹•¸(´ltM±¥‘”½	•Ù•°½1½½À½ÕÑUX½MÑ¥Ñ¡UX½U¹‘½I•‘¼…¹¹…Ù¥…Ñ¥½¸É•µ…¥¸ÕÍ…‰±”¸(´lt…”½Y•ÉÑ•à½=‰©•Ð¥½¹Ì…¹ÉÉ…äAMLÕ¹¡…¹•ìÝ…Ñ É¥¡ÐU$Ù¥Í¥‰¥±¥Ñä¸((ŒŒ€¸äÜÔ]½É±µÁ±…¹”áÑÉÕ‘”Á…‘Ì()UÍ•È€¸äÜÐ¥½¹ÌAMLì€¸äÜÔ™Õ¹Ñ¥½¹…°…Ñ”Í•Á…É…Ñ”¸((´lt	½Ñ ‘”½Y•ÉÑ•àáÑÉÕ‘”Í¡½Ü½É¥¥¹…°ad½ah½ehÁ±…¹”ÍÅÕ…É•Ì°Í•±•Ñ¥½¸¡¥¡±¥¡Ð…¹¹…µ•µÁ±…¹”‰…‘”¸(´lt]½É±ad¡½±‘Íh½ah¡½±‘Íd½eh¡½±‘Í`‘ÕÉ¥¹œ‘É…œ°á…Ð…¹I•Á•…Ðì…É‰¥ÑÉ…ÉäÙ¥•Ü½É¥•¹Ñ…Ñ¥½¸ÍÕÁÁ½ÉÑ•¸(´lt•¹ÑÉ•É•”…¹aeh…ÉÉ½ÝÌÉ•µ…¥¸Õ¹¡…¹•ì½¹”½…¹•°½U¹‘½I•‘¼½¹…Ù¥…Ñ¥½¸É•ÍÑ½É”¹½Éµ…±±ä¸(´ltA…É…±±•°µÙ¥•ÜÉ•™ÕÍ…±Ì‘¼¹½ÐµÕÑ…Ñ”µ•Í ½¡¥ÍÑ½Éä½È±•…Ù”…ÁÑÕÉ•¥¹ÁÕÐì½É‰¥ÐÑ¡•¸É•ÑÉä¸(((ŒŒ€¸äÜØƒŠPÉ•½¹¹•ÐÉ•…‘ä‘”	É¥‘”Í•±•Ñ¥½¹ÌƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()Õ‘¥Ðµ…¥¸àÅ‰„Ñ…™½‰Õ¥±äÜÔ¸UÍ•ÈÍÕÁÁ±¥•ÌÍÉ••¹Í¡½ÐäÜÔ…¹•á…Ð‘”…¥° Ä¤¹½‰¨( ÈÐÙ•ÉÑ¥•Ì¼ÄÐÅÕ…‘Ì¤ìÉ•Ñ…¥¸Õ¹¡…¹•™¥áÑÕÉ”Ñ•ÍÑÌ½™¥áÑÕÉ•Ì½•‘”µ‰É¥‘”´äÜØ¹½‰¨¸)Q¡”¡¥¡±¥¡Ñ•‰½Õ¹‘…ÉäÁ…¥È¥Ì=	(Ù•ÉÑ¥•ÌÏŠLÄÀ…¹ÈÏŠLÈÐ€¡ÉÕ¹Ñ¥µ”•‘•ÌÄÈ¼ÌÔ¤¸)	½Ñ ¡…Ù”½¹”™…”½Ý¹•È¸á¥ÍÑ¥¹œ™Õ±±ä¥¹ÍÑ…±±•=Á•¸¡…¥¸	É¥‘”…•ÁÑÌÑ¡”Á…¥È°)É•…Ñ•ÌÅÕ…‘lÌ°ÈÌ°ÈÐ°ÄÁt€¡=	(½¹”µ‰…Í•¤…¹Á…ÍÍ•Ì½É¥¥¹…°Ñ½Á½±½äÙ…±¥‘…Ñ¥½¸¸)I…‘¥…°Õ¥‘•Í•ÍÍ¥½¸ØÜØ¥¹½ÉÉ•Ñ±ä…•ÁÑ•=91d½¹”½µÁ±•Ñ”‰½Õ¹‘…Éä±½½À¥¸)…¹MÑ…ÉÐ½½Á•¹É½µ!Õˆ°‘¥Í½¹¹•Ñ¥¹œ…±É•…‘äµÍÕÁÁ½ÉÑ•É•…‘äÁ…¥ÉÌ¸I•Á…¥ÈM5)Í•ÍÍ¥½¸è‘•±•…Ñ”É•…‘äµÁ…¥È•±¥¥‰¥±¥ÑäÑ¼•á¥ÍÑ¥¹œ‰É¥‘•‘•M•±•Ñ¥½¹%¹™¼°É•Ñ…¥¸)Í¥¹±”µ±½½ÀÕ¥‘••¹ÑÉä°Íå¹ŒÁÁ±ä¥µµ•‘¥…Ñ•±ä°Í¡½ÜÉ•…‘äÍÑ…ÑÕÌ¸=É¥¥¹…°U$°)Ñ½Á½±½ä°Ý¥¹‘¥¹œ½ÅÕ…±¥Ñä½ÑÉ…¹Í…Ñ¥½¸Õ…É‘Ì…¹¡¥ÍÑ½Éä½Ý¸ÁÁ±äÕ¹¡…¹•¸)…¹•°É•Ñ…¥¹Ì¥¹¥Ñ¥…°Á…¥Èì¥¹Ù…±¥½¥¹Ñ•É¥½È½µ¥ÍÍ¥¹œ½Í¥¹±”µ½Á•¸µ•‘”¥¹ÁÕÑÌÉ•™ÕÍ”¸)9¼¹•Ü­•É¹•°½•ÍÑÕÉ”°¥éµ¼¡…¹•Ì°É•¹‘•É•È™¥á•Ì½È¥½¸Ý½É¬¸äÜÔÁ……•ÁÑ…¹”)¹½Ð¥¹™•ÉÉ•™É½´ÕÁ±½…‘•ÍÉ••¹Í¡½Ð¸äÜÐ¥½¸¼äÜÄÉÉ…äAML…¹äÜÈ¼äÜÌÙ¥ÍÕ…°)Í…™•Õ…É‘ÌÉ•µ…¥¸ì¥¹Ñ•Éµ¥ÑÑ•¹ÐÉ¥¡ÐµÍ¥‘”™…Õ±Ð¥ÌÍÑ¥±°=A8¸()Y…±¥‘…Ñ¥½¸èÈÈÔ™½ÕÍ•	É¥‘”½Í•±•Ñ¥½¸µ¡Õˆ½É…‘¥…°½É•±•…Í”Ñ•ÍÑÌAML°Á%0¼ÁÍ­¥À¸)½ÕÈ¹•ÜÉ•…°µ½Ý¹•È¥¹Ñ•É…Ñ¥½¹Ì½Ù•ÈÍÕÁÁ±¥•Á…¥ËŠI…ÑÕ…°É…‘¥…°…Ù…¥±…‰¥±¥ÑçŠH)½É¥¥¹…°U$ÁÁ±çŠI½¹”¡¥ÍÑ½ÉäÍÑ•À½U¹‘½I•‘¼°…¹•°°Õ¥‘•Í¥¹±”µ±½½ÃŠIÍ•½¹µ±½½À°)…¹¥¹Ù…±¥¥¹ÁÕÐ…Ñ½µ¥ŒÉ•™ÕÍ…°¸9½‘”=4…‘…ÁÑ•ÉÌ…É”¹½Ð¹…Ñ¥Ù”¥A…ÁÉ½½˜¸)¡…¹•ÉÕ¹Ñ¥µ”=91dÍ•±•Ñ¥½¸µ¡Õˆµ‰É¥‘”µÍ•ÍÍ¥½¸ìÉ•Ù¥•Ý•Í•ÍÍ¥½¸½É•½Ù•ÉäÁ¥¹ÌäÜØ°)É•±•…Í”µ…É­•ÉÌäÜØ…¹…ÍÍ•Ð¡…Í¡•ÌÕÁ‘…Ñ•ì5Õ±Ñ¤Ä¸À½™É½é•¸½¥½¸½•½µ•ÑÉäÕ¹¡…¹•¸)AÕ‰±¥…Ñ¥½¸Ù•É¥™¥…Ñ¥½¸™½±±½ÝÌÍ•Á…É…Ñ•±ä¸Y%äÜØèÍ…µ”µ½‘•°½ÑÝ¼É••‘•ÌƒŠH)‘”É…‘¥…°	É¥‘”ƒŠHÁÁ±ä	É¥‘”è½¹”±½Í¥¹œÅÕ…¸U¹‘½I•‘¼ìÉ•½Á•¸Ñ¡•¸…¹•°)É•Ñ…¥¹ÌÁ…¥È½•½µ•ÑÉä¸±Í¼Í…¹¥Ñäµ¡•¬•á¥ÍÑ¥¹œÑÝ¼µ±½½À	É¥‘”¸9•áÐ…ÑÕ…°‘•Ù¥”)™••‘‰…¬°Ñ¡•¸A…¥¹Ð¥½¸É½±±½ÕÐìÁÉ•Í•ÉÙ”¥¹‘•Á•¹‘•¹ÐäÜÔáÑÉÕ‘”Á…‘•Ù¥”…Ñ”¸((ŒŒ€¸äÜÜƒŠPÉ…‘¥…°Ý¥É¥¹œ…Õ‘¥Ð…¹¹•…Èµ™É½¹Ðá…ÐáÑÉÕ‘”ƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•ÅÕ•ÍÑÌ…Õ‘¥Ð½˜…±°É…‘¥…°Ñ½½±Ìì½É‰¥ÐÍ½µ•Ñ¥µ•Ì¡…¹•ÌQ¡É½Õ É•™ÕÍ…°¸)Õ‘¥ÐÕÉÉ•¹Ðµ…¥¸ÔØÍ™•‘”ä½‰Õ¥±äÜØ¸Õ±°É½ÕÑ”¥¹Ù•¹Ñ½ÉäàÄ•¹ÑÉ¥•Ì€¡…”ÈÌ½‘”ÈÄ¼)Y•ÉÑ•àÄÐ½=‰©•ÐÄÌ½A…¥¹ÐÄÀ¤°½É¥¥¹…°Ñ…É•ÑÌ½…Ù…¥±…‰¥±¥Ñä½½¹Ñ•áÐ…‘…ÁÑ•ÉÌ½…Ñ¥½¸½Ý¹•ÉÌè(‘½Ì½É…‘¥…°µÝ¥É¥¹œµ…Õ‘¥Ð´ÈÀÈØ´ÄÀ´ÈØ¹µ¸9¼µ¥ÍÍ¥¹œ…Ñ¥½¸½Ý¹•È½ÈÝÉ½¹œµµ½‘”Ñ…É•Ð)™½Õ¹¥¸Í½ÕÉ”É•Ù¥•ÜìÑ¡¥Ì¥Ì¹½Ð•á¡…ÕÍÑ¥Ù”¹…Ñ¥Ù”µ•ÍÑÕÉ”½µ•Í •ÉÑ¥™¥…Ñ¥½¸¸(äÜØ	É¥‘”±…Õ¹¡•È‘•™•ÐÉ•Á…¥É•½ÁÕ‰±¥Í¡•ì…±°Ì¡…¹•±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ ¸)	…Í•±¥¹”äÜØU10ÈàÌÍAML¼Á%0¼ÁÍ­¥À€ ÄÀÀ¸ÝÌ¤°™½ÕÍ•ÈÈÕAML¸()½¹™¥Éµ•Í•Á…É…Ñ”á…Ð‰ÕœèÁÉ•¥Í¥½¸µ™…”ÁÉ½©•Ñ•µ¹½Éµ…°™…±±‰…¬Ñ¡É•Í¡½±Å”´ÕÁà)Ù•ÉÍÕÌ…ÑÕ…°µÕ±Ñ¤µ™…”µ‘¥É•Ð•ÍÑÕÉ”Å”´ÑÁà…¸¥¹Ù•ÉÐÍ¥¸¥¸¹…ÉÉ½Ü¹•…Èµ™É½¹Ð)…µ•É„‰…¹¸á¥ÍÑ¥¹œ‰•Ù•°µ¥¹Í•ÐÜÔÀ™…”Ü°…µ•É„•¹ÑÉ”­¹½Éµ…°¨Ô¬ À°Å”´Ø°À¤èá…Ð(´È¸È¥¹½ÉÉ•Ñ±ä•áÑÉÕ‘•Ì¬È¸Èì½É‰¥Ð¸ÀÄÕÑÌ¥¹Ý…É¸±¥¸=I%%90ÁÉ•¥Í¥½¸ÕÑ½™˜)Ñ¼•ÍÑÕÉ”Å”´Ð=91d¸9¼µ…¥¸½‘É…œ½­•É¹•°½•½µ•ÑÉä½¡¥ÍÑ½Éä½¥¹™•É•¹”½Á¡åÍ¥…°¥¹ÁÕÐ¡…¹”¸)å¹…µ¥ŒÁÉ•¥Í¥½¸µ™…”¡¥±…¹‘É…Ý•ÈµÕ¤Á…É•¹Ð½Í¡•±°­•åÌäÜÜÉ•™É•Í¡•ì½É¥¥¹…°)¥¹Ñ•É¹…°ÍÑ…µÁÌÉ•Ñ…¥¹•¸I•Ù¥•Ý•¡…Í¡•Ì…¹É•±•…Í”É•½Ù•Éä½Í¡•±°µ…É­•ÉÌäÜÜ¸)Q¡É•”¹•ÜÑ•ÍÑÌÕÍ”…ÑÕ…°ÁÉ•¥Í¥½¸ÁÉ½©•Ñ¥½¸€¬¹…Ñ¥Ù”½¹ÑÉ½±±•È½™…±±‰…¬èÄÀ…¹±•Ì°)•á…Ð±½Í•½ÕÑÁÕÐ½U¹‘½I•‘¼°½±µ½‘”µÕÑ…Ñ¥½¸Í•¹Í¥Ñ¥Ù¥Ñä°™¥Ù”Á¡åÍ¥…°‘É…Ì…¹)ÁÕÉ”µÁ±…¸¥¹Ù…É¥…¹”¸½ÕÍ•™¥¹…°ÄÈáAML¼Á%0¼ÁÍ­¥À°¹½Ð™Õ±°äÜÜÉ•ÉÕ¸¸()UÍ•ÈÌÁ¡åÍ¥…°Q¡É½Õ É•™ÕÍ…°É•µ…¥¹ÌÕ¹ÁÉ½Ù•¸½¸…™™•Ñ•µ½‘•°¸…µ•É„¡…¹•Ì)ÁÉ½©•Ñ•‘É…¥¹œ…¹É•™•É•¹”¥¹™•É•¹”ì¹¼‰±…¹­•ÐÉ•™ÕÍ…°™¥à±…¥µ•¸Õ‘¥Ð)…±Í¼É•½É‘ÌÑÝ¼™½±±½ÜµÕÁÌè¹Õµ•É¥ŒÍå¹Ñ¡•Ñ¥Œ¥¹ÁÕÐÍÑ¥±°ÑÉ…Ù•ÉÍ•Ì¥¹™•É•¹”°…¹)ÁÉ•¥Í¥½¸ÍÕ•ÍÌ½É•…‘‰…¬±…­Ì‘½Ý¹ÍÑÉ•…´½µµ¥Ð…­¹½Ý±•‘•µ•¹Ð¸-••ÀÑ¡•Í”=A8)™½È¹…ÉÉ½ÜÉ•ÍÕ±Ð½½¹ÍÑÉ…¥¹ÐÝ½É¬ì‘½¸ÐÉ•±…àÑ½Á½±½äÕ…É‘Ì½ÈÉ•Á±…”­•É¹•°¸()9•ÜÙ¥Í¥‰¥±¥Ñä•Ù¥‘•¹”Ý¡¥±”äÜÜÁÉ•Á…É•è•á…ÐäÜØÉ•Á½ÉÐÀÐèÔÌèÄáhÍ¡½ÝÌ¡¥‘”…¹Ù…Ì)…ÐÈÐØÈØ°É¥¡ÑU$Ù¥Í¥‰±”½‰Í•ÉÙ…Ñ¥½¸ÌÔÀÄÐ°É•ÍÑ½É”ÌÜÈÐØ¸UÍ•È½¹™¥ÉµÌ½¹ÑÉ½±ÌMQd)Ù¥Í¥‰±”…™Ñ•ÈM¡½ÜÍ¸Q½Àµ±•Ù•°¡¥‘‘•¸é™…±Í”¥ÌÉ•ÍÑ½É•ÍÑ…Ñ”¸1…å½ÕÐ½ÍÑå±•Ì½¡¥ÑÌ)¡•…±Ñ¡äÑ¡É½Õ¡½ÕÐì¹½A…¥¹Ð½Í•ÍÍ¥½¸°Á±…¥¸äÜÈ…Ñ¥Ù”¸Q¡¥Ì¥µÁ±¥…Ñ•Ì„…¹Ù…Ì½U$)Á…¥¹Ñ¥¹œ¥¹Ñ•É…Ñ¥½¸‰ÕÐ¹¼•¹¥¹”É½½Ð…ÕÍ”½ÈÁ•Éµ…¹•¹Ð™¥à¥ÌÁÉ½Ù•¸¸I•Ñ…¥¸)=A8É•ÕÉÉ•¹”…¹‘•Ù¥”µÁÉ½Ù•¸µ…¹Õ…°!¥‘”ÍŠIM¡½ÜÍÉ•½Ù•Éäì¹¼…ÕÑ½µ…Ñ¥Œ‰±¥¹¬°)Á½±°½É•±½…½É•¹‘•É•È¡…¹”¸M•”‘½Ì½Õ¤µ…¹Ù…ÌµÁÉ½‰”´äÜØ¹µ™½ÈÁÉ•¥Í”•Ù¥‘•¹”¸()Y%äÜÜè½¹™¥É´äÜÜ°Í…µ”¹•…Ñ¥Ù”á…Ð½¸¹•…Èµ™É½¹ÐÑ¡•¸Í±¥¡Ñ±ä½É‰¥Ñ•Ù¥•Üì)U¹‘½I•‘¼ìÉ•ÑÉä½É¥¥¹…°Á¡åÍ¥…°Q¡É½Õ Ý¥Ñ ¥¹™•É•¹”½™˜½½¸°Í•¹•á…ÐÉ•™ÕÍ…°)…¹ÁÉ”µ…ÑÑ•µÁÐ¹‰½á±…ˆ¥˜É•ÕÉÉ¥¹œ¸	É¥‘”Á…¥ÈÁÁ±ä½…¹•°É•Ñ…¥¹•¸%˜É¥¡ÐU$)™…¥±ÌÕÍ”•á¥ÍÑ¥¹œ!¥‘”ÍŠIM¡½ÜÍìäÜÜ‘½•Ì9=P±…¥´Ñ¼É•Á…¥ÈÙ¥Í¥‰¥±¥Ñä¸9•áÐÁÉ¥½É¥Ñ¥é”)•Ù¥‘•¹”µ±•…¹Ù…Ì½U$‘¥…¹½Í¥Ì°Ñ¡•¸•á…ÐµÉ•ÍÕ±Ð½¥¹™•É•¹”™½±±½ÜµÕÁÌ‰•™½É”µ½É”)™•…ÑÕÉ”É½±±½ÕÐ¸äÜÐ¥½¸¼äÜÄÉÉ…ä…•ÁÑ…¹”…¹ÁÉ½Ñ•Ñ•‘5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸((ŒŒ€¸äÜàƒŠP‘”	É¥‘”ÁÉ•Ù¥•Ü‰•™½É”ÁÁ±äƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•È±…É¥™¥•ÌäÜØ½µµ¥ÑÌ…™Ñ•ÈÁÁ±ä‰ÕÐ‘½•Ì¹½ÐAIY%\°Õ¹±¥­”…•ÁÑ•…”)	É¥‘”¸Q¡¥Ì¥Ì„µ¥ÍÍ¥¹œ¥¹Ñ•É…Ñ¥½¸ÍÑ…”°¹½Ð™…¥±•‰É¥‘”Ñ½Á½±½ä¸AÉ¥½ÈäÜØ)É•…‘äµÁ…¥È±…Õ¹¡•ÈÉ•Á…¥ÈÉ•Ñ…¥¹•ì¹¼‰É½…äÜØ¼äÜÜAML¥¹™•ÉÉ•¸Õ‘¥Ðµ…¥¹˜Ù„Í™˜ÌÀ°)Í…µ”Õ¥‘•‘”Í•ÍÍ¥½¸¡…¹¼ÁÉ•Ù¥•Ü½Ý¹•Èì…”	É¥‘”µÕÑ…Ñ•ÌÁÉ•Ù¥•Üµ•Í °)Ý¡¥±”…•ÁÑ•…”½Y•ÉÑ•à	•Ù•°…±É•…‘äÍ¡…É•Ì„É•¹‘•É¥¹œµ½¹±ä‰±Õ”¡½ÍÐ¡•±Á•È¸)I•ÕÍ”•á¥ÍÑ¥¹œÉ•…Ñ•…•	•Ù•±AÉ•Ù¥•Ü½‘¥ÍÁ½Í•…•	•Ù•±AÉ•Ù¥•ÜÕ¹¡…¹•™½È‘”¸()M5Í•±•Ñ¥½¸µ¡Õˆµ‰É¥‘”µÍ•ÍÍ¥½¸‰Õ¥±‘Ì½É¥¥¹…°‰É¥‘•M•±•Ñ•‘‘•Ì½¸ÁÉ¥Ù…Ñ”)±½¹”…¹É•¹‘•ÉÌ¡…¹•Á½±å½¹ÌÝ¥Ñ ½É¥¥¹…°‰±Õ”ÑÉ…¹Í±Õ•¹Ð™¥±°½Ý¥É”¡•±Á•È¸)=É¥¥¹…°Í½ÕÉ”½Í•±•Ñ¥½¸½µ•Ñ…‘…Ñ„½¡¥ÍÑ½Éä½ÁÉ½©•ÐÉ•µ…¥¸Õ¹Ñ½Õ¡•Õ¹Ñ¥°ÁÁ±äì)¹¼¹•Üµ½‘•±±¥¹œ½ÑÉ¥…¹Õ±…Ñ¥½¸½¡¥ÍÑ½Éä­•É¹•°°µ…¹…•Èµ•Í É•Á±…•µ•¹Ð½ÈÉ•¹‘•É•È¸)…¹‘¥‘…Ñ”±½¹”…±±ÌÁÉ•Í•ÉÙ”…Ñ¥Ù”ÍÑ…Ñ”¹µ•Í ‘•ÍÁ¥Ñ”¡¥ÍÑ½É¥…°•‘•Ì½‰Í•ÉÙ•ÉÌ¸)M•±•Ñ¥½¸µ­•ä…¡”É•ÕÍ•ÌÁÉ•Ù¥•Ü‘ÕÉ¥¹œ½É‰¥ÐìÍ•±•Ñ•µ‰½Õ¹‘…Éä¡…¹”É•‰Õ¥±‘Ì¥Ð°)¥¹½µÁ…Ñ¥‰±”½ÅÕ…±¥ÑäµÉ•™ÕÍ•…¹‘¥‘…Ñ•Ì±•…È¥Ð¸Õ¥‘•™¥ÉÍÐ±½½ÀÍ¡½ÝÌ¹¼¡½ÍÐ)Õ¹Ñ¥°½µÁ…Ñ¥‰±”Í•½¹‰½Õ¹‘…ÉäÍ•±•Ñ•¸ÁÁ±ä‘¥Í…‰±•Ý¥Ñ¡½ÕÐ…ÑÕ…°ÁÉ•Ù¥•Ü¸)ÁÁ±äÉÕ¹Ì½É¥¥¹…°‰É¥‘”µÕ¤½µµ¥Ð½¹”ì…¹•°É•µ½Ù•Ì¡½ÍÐ…¹É•Ñ…¥¹Ì¥¹¥Ñ¥…°)Í•±•Ñ¥½¸¸á¥ÍÑ¥¹œU¹‘½I•‘¼Ý½É­Ì¸AÉ•Ù¥•ÜÉ•¹‘•É•È½¡•±Á•ÉÌ…¹…”	É¥‘”Õ¹¡…¹•¸()M•ÍÍ¥½¸½Ý¹ÌÍ½ÕÉ”Í¹…ÁÍ¡½Ð­•ä°½‰©•Ð½µ½‘”½±½¬½Í•¹”½¹Ñ•áÐ¸áÑ•É¹…°•½µ•ÑÉä¼)µ•Ñ…‘…Ñ„¡…¹•Ì°½‰©•Ð½µ½‘”½Ñ½½°¡…¹”°Á…•¡¥‘”‘¥ÍÁ½Í”¡½ÍÐ]%Q!=UPÉ•ÍÑ½É¥¹œ)ÍÑ…±”µ•Í ½Í•±•Ñ¥½¸½È±½Í¥¹œ¹•Ý•ÈÑ½½°U$¸=É¥¥¹…°‰…­É½Õ¹µ•á¥ÐÉ½ÕÑ”ÍÑ¥±°)…±±Ì±½Í”ì¹¼¹•ÜÉ…ÜµÁ½¥¹Ñ•È½Ý¹•È°Á•Èµ™É…µ”Á½±±¥¹œ½ÈÍ½ÕÉ”É½±±‰…¬¸M¡…É•)•½µ•ÑÉä½µ…Ñ•É¥…°‘¥ÍÁ½Í…°½ÕÉÌ½¹”¸=Ù•É±…ä¥ÌÑÉ…¹Í¥•¹Ð½ÕÑÍ¥‘”Í•¹”½‰©•Ð)µ…¹…•È…¹ÕÍ•Ì•ÍÑ…‰±¥Í¡•	•Ù•°‰±Õ”ÍÑå±”°¹½ÐÍ…Ù••½µ•ÑÉä½È„Í•½¹‰½‘ä¸()½ÕÍ•ÈÌÉAML¼Á%0¼ÁÍ­¥À€¡øÀ¸ØÝÌ¤è½É¥¥¹…°	É¥‘”½É…‘¥…°½Í•±•Ñ¥½¸½¹ÑÉ…ÑÌ…¹äÜÜ)…µ•É„É•É•ÍÍ¥½¹Ìì™½ÕÈ…‘‘•É•…°µ½¹ÑÉ½±±•È½Q¡É•”Í•¹”Ñ•ÍÑÌÁÉ½Ù”Ù¥Í¥‰±”¡½ÍÐ)	=IÁÁ±äÝ¥Ñ ¹¼Í½ÕÉ”½¡¥ÍÑ½Éä¡…¹•Ì°½¹”µÍÑ•À½µµ¥Ð­U¹‘½I•‘¼°Í•±•Ñ¥½¸)ÕÁ‘…Ñ”½É•µ½Ù…°½…¹•°°Í½ÕÉ”½½‰©•Ð½µ½‘”½Ñ½½°½Á…•¡¥‘”±•…¹ÕÀ°¹¼µÍ•¹”É•™ÕÍ…°…¹)Í¥¹±”•½µ•ÑÉä½ÑÝ¼µ…Ñ•É¥…°‘¥ÍÁ½Í…°¸á¥ÍÑ¥¹œäÜØ¡…É¹•ÍÌÍÕÁÁ±¥•ÌÉ•…°Í•¹”½Í¡…É•)ÁÉ•Ù¥•Ü™Õ¹Ñ¥½¹Ìì¹¼½±•½µ•ÑÉä½¡¥ÍÑ½Éä…ÍÍ•ÉÑ¥½¸É•µ½Ù•¸9¼¹…Ñ¥Ù”¥A…Ù¥ÍÕ…°)…•ÁÑ…¹”¥¹™•ÉÉ•¸IÕ¹Ñ¥µ”¡…¹”=91d½É¥¥¹…°‘”	É¥‘”Í•ÍÍ¥½¸ìÍ•ÍÍ¥½¸½É•½Ù•Éä)Á¥¹ÌäÜà°Õ¹¡…¹•ÜÄØÉ•¹‘•É•È¥µÁ½ÉÐ•áÁ±¥¥Ñ±äÉ•Ù¥•Ý•¥¸…ÍÍ•Ð½¹ÑÉ…Ð¸()Y%äÜàèÍ•±•ÐÍ…µ”ÑÝ¼‰½Õ¹‘…Éä•‘•ÌƒŠH‘”É…‘¥…°	É¥‘”è	1UÍÁ…¸Ù¥Í¥‰±”)	=IÁÁ±ä¸=É‰¥ÐÑ¼¥¹ÍÁ•ÐìÁÁ±ä­••ÁÌ‰É¥‘”…¹É•µ½Ù•Ì‰±Õ”°U¹‘½I•‘¼¸)…¹•°É•µ½Ù•Ì‰±Õ”°ÁÉ•Í•ÉÙ•Ì½É¥¥¹…°µ•Í ½Í•±•Ñ¥½¸¸Õ¥‘•ÑÝ¼µ±½½ÀÍ•±•Ñ¥½¸)ÕÁ‘…Ñ•ÌÁÉ•Ù¥•Ü…ÌÍ•½¹‰½Õ¹‘…Éä¥ÌÍ•±•Ñ•¸…”	É¥‘”É•µ…¥¹ÌÕ¹¡…¹•¸)I¥¡ÐµÍ¥‘”™…Õ±ÐÍÑ…åÌ=A8Ý¥Ñ ½¹™¥Éµ•µ…¹Õ…°!¥‘”ÍŠIM¡½ÜÍÉ•½Ù•Éäì¹¼É•¹‘•É¥¹œ)É•Á…¥È½È½Ñ¡•È€¸äÜÜ•á…Ð½¥¹™•É•¹”½É•…‘‰…¬™½±±½ÜµÕÀ¥¹±Õ‘•¸9•áÐ¹…Ñ¥Ù”ÁÉ•Ù¥•Ü)™••‘‰…¬°Ñ¡•¸•Ù¥‘•¹”µ±•…¹Ù…Ì½U$Ý½É¬…¹É•µ…¥¹¥¹œ…Õ‘¥Ð™½±±½ÜµÕÁÌ¸((ŒŒ€¸äÜäƒŠPá…Ð¥¹™•É•¹”¥Í½±…Ñ¥½¸…¹ÑÉÕÑ¡™Õ°½µµ¥ÐÉ•…‘‰…¬ì	É¥‘”äÜàAMLƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äAMM•ÌäÜà	É¥‘”ÁÉ•Ù¥•Ü‰•™½É”ÁÁ±ä½…¹•°ìÁÉ½Ñ•Ð¥ÑÌÁÉ¥Ù…Ñ”)±½¹”½‰±Õ”¡½ÍÐ½Í½ÕÉ”µ¹•ÕÑÉ…°ÁÉ•Ù¥•Ü½½¹”µÍÑ•À½É¥¥¹…°½µµ¥Ð…¹±¥™•å±”¸)UÍ•È€½¹•áÑ‰Õ¥±…ÕÑ¡½É¥é•ÌÑ¡”ÑÝ¼É•µ…¥¹¥¹œá…Ð…Õ‘¥Ð™¥á•Ì¸Õ‘¥ÐÉ•µ½Ñ”½ÕÉÉ•¹Ð)µ…¥¸ÀÈàÜÄá„ä°É•±•…Í”äÜà¸á¥ÍÑ¥¹œ¹Õµ•É¥Œ•ÍÑÕÉ•Ì…±É•…‘äÕÍ”É•Í•ÉÙ•Á½¥¹Ñ•ÈäàÜØì)•á¥ÍÑ¥¹œ‘¥É•Ð½µµ¥ÑÑ••Ù•¹Ð½Ý¹ÌÍÕ•ÍÍ™Õ°•½µ•ÑÉäÙ…±Õ•Ì¸9¼¹•Ü­•É¹•°¹••‘•¸()=É¥¥¹…°…”É•™•É•¹•U¹‘•ÉA½¥¹Ñ•È¹½Ü¥¹½É•Ì=91d¹Õµ•É¥ŒÁ½¥¹Ñ•ÈäàÜØ¸A¡åÍ¥…°)A•¹¥°½µ½ÕÍ”¥¹™•É•¹”…¹Ñ½±”ÍÑ…Ñ”ÍÑ…äÕ¹¡…¹•¸½Ù•ÉÌáÑÉÕ‘”…¹%¹Í•Ðì)½É¥¥¹…°µ½‘•°µÕ¹¥Ð½‘¥É•Ñ¥½¸µ…ÁÁ¥¹œ°äÜÜ…±¥¹•¹•…Èµ™É½¹ÐÁÉ½©•Ñ¥½¸°Q¡É½Õ )Í¡•±°µ•á¥ÐÍ¹…ÁÁ¥¹œ…¹¥¹Í•ÐÍ…™•Ñä±…µÀÉ•µ…¥¸¸á…ÐÍÑ¥±°•¹Ñ•ÉÌ½É¥¥¹…°)½¹ÑÉ½±±•È…¹Õ…É‘••½µ•ÑÉä½¡¥ÍÑ½Éä½Ý¹•ÉÌì¹¼Í•Á…É…Ñ”µ½‘•±±¥¹œ…±½É¥Ñ¡´¸()AÉ•¥Í¥½¸ÑÉ…­Ì½¹”Íå¹¡É½¹½ÕÌ¹Õµ•É¥ŒÉ•ÅÕ•ÍÐ…¹±¥ÍÑ•¹ÌÑ¼=I%%90)‰½á±…ˆµ™…”µ‘¥É•Ðµ½µµ¥ÑÑ•¸%ÐÉ•½É‘ÌÍÕ•ÍÌ½I•Á•…Ð½É•…‘‰…¬½¹±ä…™Ñ•ÈÑ¡…Ð)Í•µ…¹Ñ¥Œ…­¹½Ý±•‘•µ•¹Ð°ÕÍ¥¹œQU0½µµ¥ÑÑ•Ù…±Õ”É…Ñ¡•ÈÑ¡…¸É•ÅÕ•ÍÑ•¥¹ÁÕÐ¸)á¥ÍÑ¥¹œÁ½Í¥Ñ¥Ù”½É••ÍÌ½±½Í•µ¹•…Ñ¥Ù”½%¹Í•Ð•Ù•¹ÑÌÉ•Ñ…¥¹•ì½±½Á•¸µÍ¡••Ð)Q¡É½Õ ÍÕ•ÍÌ‰É…¹ ¹½Ü•µ¥ÑÌÍ…µ”Í•µ…¹Ñ¥Œ•Ù•¹Ð…™Ñ•È½É¥¥¹…°Õ…É‘•½µµ¥Ð¸)á…µÁ±”èÉ•ÅÕ•ÍÑ•´È¸ÈÍÑ½ÁÁ¥¹œ…ÐÍ¡•±°•á¥Ð´È¸ÀÉ•½É‘Ì½‘¥ÍÁ±…åÌ´È¸À¸%¹Í•ÐÉ•ÅÕ•ÍÐ)…‰½Ù”Í…™”É…¹”‘¥ÍÁ±…åÌ½É¥¥¹…°±…µÁ•‘¥ÍÑ…¹”°¹•Ù•È…¸Õ¹Á•É™½Éµ•ÄÀÀ¸()9¼…­¹½Ý±•‘•µ•¹Ðµ•…¹Ì™…±Í”½É•™ÕÍ•ÍÑ…ÑÕÌ°¹¼™…­”Ù…±Õ”µ½µµ¥ÑÑ••Ù•¹Ð°ÁÉ¥½È)ÍÕ•ÍÍ™Õ°Á•ÈµÑ½½°I•Á•…Ð½Ù…±Õ”É•Ñ…¥¹•¸I•™ÕÍ…°É•…‘½ÕÐÍÕÉÙ¥Ù•ÌÍÕ‰Í•ÅÕ•¹ÐÍÑ…ÑÕÌ)½‰Í•ÉÙ•È…±±‰…­Ì°•Ù•¸Ý¥Ñ ¹¼ÁÉ¥½ÈÍÕ•ÍÌì¹•áÐÁ¡åÍ¥…°ÁÉ•ÍÌ½á…Ð…ÑÑ•µÁÐ¼)ÍÕ•ÍÌ±•…ÉÌ¥Ð¸	±…¹¬½é•É¼½¹½¹™¥¹¥Ñ”¥¹ÁÕÐ…¹…‰Í•¹Ð¡¥ÍÑ½ÉäÉ•™ÕÍ”‰•™½É”)Íå¹Ñ¡•Ñ¥Œ•½µ•ÑÉä‘¥ÍÁ…Ñ ¸=É¥¥¹…°É•™ÕÍ…°½É½±±‰…¬½Í•±•Ñ¥½¸½¡¥ÍÑ½ÉäÉ•µ…¥¸¸)A¡åÍ¥…°‘É…œ…±±‰…­ÌÍÑ¥±°É•½É•½µ•ÑÉä¹½Éµ…±±ä¸Q¡¥Ì¥ÌÑÉ…¹Í…Ñ¥½¸É•Á½ÉÑ¥¹œ°)¹½ÐÉ•±…á…Ñ¥½¸½˜Ñ½Á½±½äÉ•™ÕÍ…°½ÈÁÉ½½˜½˜ÕÍ•ÈÌÁ¡åÍ¥…°Q¡É½Õ ™…¥±ÕÉ”É•Á…¥È¸()¥¹…°ÔÄÜ™½ÕÍ•‘AML¼Á%0¼ÁÍ­¥À€ à¸ÝÌ¤è¹•ÜÜ…ÑÕ…°ÁÉ•¥Í¥½¸­‘¥É•Ðµ½¹ÑÉ½±±•ÈÑ•ÍÑÌ)Á±ÕÌ…”½Q¡É½Õ ½¹•…Ñ¥Ù”½É•Á•…Ð½É…‘¥…°½	É¥‘”½É•±•…Í”É•É•ÍÍ¥½¸¸9•Ü™¥áÑÕÉ•ÌÉÕ¸)½É¥¥¹…°Õ¹¥™½É´µ¥¹Í•Ð½Ý¹•ÈÉ…Ñ¡•ÈÑ¡…¸•¹ÑÉ”µ±•ÉÀ™…±±‰…¬¸Q•ÍÐ•á…Ð¸ÌÜ…ÐÌ)…µ•É…Ì°Q¡É½Õ …ÐÑ¹•…È½½‰±¥ÅÕ”Ù¥•ÝÌ°…ÑÕ…°•á¥Ð‘•ÁÑ °U¹‘½I•‘¼½½¹”¡•­Á½¥¹Ð°)É•™ÕÍ••¹Ñ¥É”µÍ½±¥ÕÐÝ¥Ñ Õ¹¡…¹•Í½ÕÉ”½¡¥ÍÑ½Éä½±…ÍÐÙ…±Õ”°…ÑÕ…°±…µÁ•)%¹Í•Ð°¹Õµ•É¥Œ¥¹Ù…±¥½¹¼µ¡¥ÍÑ½ÉäÉ•™ÕÍ…°°É•…°Á¡åÍ¥…°Ù•ÉÑ•à¥¹™•É•¹”ÙÌÍ…µ”)¹Õµ•É¥Œ½¹Ñ…Ð°Á•ÉÍ¥ÍÑ•¹Ð™…¥±ÕÉ”É•…‘½ÕÐ¸9¼¹…Ñ¥Ù”¥A……•ÁÑ…¹”¥¹™•ÉÉ•¸)¡…¹•™Õ¹Ñ¥½¹…±¥Ñä=91dÁÉ•¥Í¥½¸µ™…”…¹Í±¥¹•Ì¥¸½É¥¥¹…°µÕ±Ñ¤µ™…”µ‘¥É•Ðì)‘É…Ý•ÈµÕ¤¡…¹•Ì¡¥±Á¥¸½¹±ä¸I•Ù¥•Ý•Á…É•¹Ð½¡¥±½‘¥É•Ð½É•½Ù•ÉäÁ¥¹ÌäÜä…¹)Í¡•±°µ…É­•ÉÌ½…ÍÍ•Ð¡…Í¡•Ì¸5…¥¸½•½µ•ÑÉä½Q¡É½Õ ­•É¹•±Ì½	É¥‘”äÜà½5Õ±Ñ¤Ä¸À½™É½é•¸¼)¥½¹Ì¼äÜÉÁ±…¥¸¼äÜÍÁÉ½‰”É•µ…¥¸Õ¹¡…¹•¸9¼‘ÕÁ±¥…Ñ”¡¥ÍÑ½Éä½È¥¹ÁÕÐ½Ý¹•È¸()Y%äÜäèÝ¥Ñ ¥¹™•É•¹”=8°…”á…Ð¸ÌÜ€¡½È½¹Ù•¹¥•¹ÐÙ…±Õ”¤°½É‰¥Ð½U¹‘¼½É•ÑÉäì)É•ÍÕ±ÐÍ¡½Õ±É•Ñ…¥¸•¹Ñ•É•‘¥ÍÑ…¹”¸Y…±¥Q¡É½Õ ½Ù•ÉÍ¡½½Ð‘¥ÍÁ±…åÌ…ÑÕ…°•á¥Ð¸)QÉä„É•™ÕÍ•ÕÐè•áÁ±¥¥ÐÉ•™ÕÍ…°°ÁÉ•Ù¥½ÕÌÍÕ•ÍÍ™Õ°Ù…±Õ”É•Ñ…¥¹•ìU¹‘¼µÕÍÐ)Õ¹‘¼Ñ¡”±…ÍÐÍÕ•ÍÍ™Õ°½Á•É…Ñ¥½¸°¹½Ð…¸¥¹Ù•¹Ñ•™…¥±•…Ñ¥½¸¸A¡åÍ¥…°Í¹…À)ÍÑ¥±°Ý½É­Ì¸	É¥‘”ÁÉ•Ù¥•ÜäÜàÉ•µ…¥¹Ì…•ÁÑ•¸I¥¡ÐµÍ¥‘”™…Õ±ÐÍÑ¥±°=A8ìµ…¹Õ…°)!¥‘”ÍŠIM¡½ÜÍÉ•½Ù•Éä½¹™¥Éµ•¸9•áÐ•Ù¥‘•¹”µ±•…¹Ù…Ì½U$Ý½É¬½È…ÑÕ…°äÜä)™••‘‰…¬ì¹¼¹•Ü™•…ÑÕÉ”½¥½¸•áÁ…¹Í¥½¸‰•™½É”½ÕÑÍÑ…¹‘¥¹œÉ•±¥…‰¥±¥Ñä‘¥É•Ñ¥½¸¸((ŒŒ€¸äàÀƒŠP•áÁ±¥¥Ð¥±”I•™É•Í ‘¥ÍÁ±…äÉ•½Ù•Éäì€¸äÜäÕÍ•ÈAMLƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈAMLäÜäÁÉ½Ñ•ÑÌá…Ð¥¹™•É•¹”¥Í½±…Ñ¥½¸°…ÑÕ…°½µµ¥ÐÉ•…‘‰…¬°É•™ÕÍ…°¼)±…ÍÐµÙ…±Õ”½¡¥ÍÑ½Éä…¹•á¥ÍÑ¥¹œÁ¡åÍ¥…°Í¹…ÁÁ¥¹œ¸	É¥‘”äÜàAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•¸)Õ‘¥Ðµ…¥¸É˜É•”Üá„½É•±•…Í”äÜä¸9•áÐÉ•±¥…‰¥±¥Ñä™½ÕÌ¥ÌÉ•ÕÉÉ¥¹œÉ¥¡ÐµÍ¥‘”U$¸(äÜØ‘•Ù¥”ÁÉ½‰”ÁÉ½Ù•!¥‘”ÍÉ•ÍÑ½É•½¹ÑÉ½±Ì…¹M¡½ÜÍ±•™ÐÑ¡•´Ù¥Í¥‰±”ìÑ¡¥Ì)¹…ÉÉ½ÝÌ…¹Ù…Ì½U$Á…¥¹Ñ¥¹œ¥¹Ñ•É…Ñ¥½¸‰ÕÐ‘½•Ì¹½Ð•ÍÑ…‰±¥Í É½½Ð…ÕÍ”¸9¼™ÕÉÑ¡•È)ÍÁ•Õ±…Ñ¥Ù”ML½±…å•È½É•¹‘•É•È¡…¹”½ÈÁ•Éµ…¹•¹ÐÉ•Á…¥È±…¥´¥¸äàÀ¸()‘¥±”ƒŠHI•™É•Í ‘¥ÍÁ±…ä°…Ù…¥±…‰±”]%Q!=UP•¹…‰±¥¹œ‘•‰Õœ¸%ÐÕÍ•ÌM5•á¥ÍÑ¥¹œ)É•…Ñ•…¹Ù…ÍY¥Í¥‰¥±¥ÑåAÉ½‰”¥¹±¥¹”Ù¥Í¥‰¥±¥ÑäÍ…Ù”½É•ÍÑ½É”½Ý¹•È¸áÁ±¥¥ÐÕÍ•È±¥¬)¡¥‘•Ì=91d½É¥¥¹…°…¹Ù…Ì™½È½¹”ÁÉ•Í•¹Ñ•™É…µ”€¡ÑÝ¼I…±±‰…­Ì¤°Ñ¡•¸É•ÍÑ½É•Ì)•á…Ð½É¥¥¹…°Ù¥Í¥‰¥±¥ÑäÙ…±Õ”½ÁÉ¥½É¥Ñä½…‰Í•¹”¸ÈÔÁµÌÑ¥µ•È™…±±‰…¬…¹Á…•¡¥‘”¼)¡¥‘‘•¸µ‘½Õµ•¹Ð½‘•‰Õœµ½™˜…¹•±±…Ñ¥½¸•¹ÍÕÉ”É•ÍÑ½É…Ñ¥½¸¥˜…¹¥µ…Ñ¥½¸™É…µ•ÌÍÑ…±°¸)9¼É•±½…°…¹Ù…ÌÉ”µÉ•…Ñ¥½¸½É•Í¥é”½AH½µ½‘•°½¡¥ÍÑ½Éä½Í•±•Ñ¥½¸µÕÑ…Ñ¥½¸°¹•ÜÉ•¹‘•É•È°)…ÕÑ½µ…Ñ¥ŒÉ•ÕÉÉ¥¹œ‰±¥¹¬°¥‘±”Á½±±¥¹œ°¹…Ù¥…Ñ¥½¸½ÈÁ½¥¹Ñ•È½Ý¹•È¸•‰Õœ½™˜ÍÑ…åÌ)½™˜ì¥±”±½Í•Ì…™Ñ•ÈÍÕ•ÍÍ™Õ°ÍÑ…ÉÐ°‰ÕÑÑ½¸É•Í•ÑÌ…™Ñ•ÈÉ•ÍÑ½É”¸½¹™¥Éµ…Ñ¥½¸)Í…åÌ¥ÍÁ±…äÉ•™É•Í¡•°¹½ÐÑ¡…ÐÑ¡”™…Õ±Ð¥ÌÁ•Éµ…¹•¹Ñ±ä™¥á•¸()A•¹‘¥¹œÉ•™É•Í É•©•ÑÌÉ•Á•…ÑÌ…¹‘½•Ì¹½ÐÑ…­”½Ù•Èµ…¹Õ…±±ä¡¥‘‘•¸‘•‰ÕœÁÉ½‰”¸)á¥ÍÑ¥¹œÁÉ½‰”‰ÕÍäÕ…É¹½Ü…±Í¼¡•­Ìµ…¥¸½…”½‘”½Y•ÉÑ•à½	•Ù•°±¥Ù”‘É…Ìì)A…¥¹Ð½Ñ½½°Í•ÍÍ¥½¸½¥éµ¼Õ…É‘ÌÉ•Ñ…¥¹•¸I•™ÕÍ••¹ÑÉä±•…Ù•ÌÝ½É¬Õ¹Ñ½Õ¡•…¹)…Í­ÌÑ¼™¥¹¥Í …Ñ¥Ù”½Á•É…Ñ¥½¸½ÈM¡½ÜÍ¸•‰ÕœÁÉ½‰”½½‰Í•ÉÙ…Ñ¥½¸‰ÕÑÑ½¹Ì‘¥Í…‰±•)‰É¥•™±ä‘ÕÉ¥¹œÉ•½Ù•Éä¸=ÁÑ¥½¹…°‘•‰Õœ±½ÌÉ•½ÉÍÑ…ÉÐ½•¹…¹¥¹Ù…±¥‘…Ñ”ÍÑ…±”)…¡•É•Á½ÉÑÌ¸=É¥¥¹…°ÑÝ¼µÍÑ•À‘¥…¹½ÍÑ¥Œ…¹ÕÍ•Èµ½‰Í•ÉÙ…Ñ¥½¸™±½ÜÕ¹¡…¹•¸()¥¹…°Ìä™½ÕÍ•‘AML¼Á%0¼ÁÍ­¥À€ À¸ÈáÌ¤è¹•ÜÐÉ•½Ù•ÉäÑ•ÍÑÌ€¬•á¥ÍÑ¥¹œ‘•‰Õœ½‘¥ÍÁ±…ä¼)…¹Ù…ÌäÜÌ½	É¥‘”äÜà½á…ÐäÜä½É•±•…Í”½¹ÑÉ…ÑÌ¸á…Ð¥¹±¥¹”É•ÍÑ½É…Ñ¥½¸…É½ÍÌØ)¥¹¥Ñ¥…°ÍÑ…Ñ•Ì°¡¥‘‘•¸™É…µ”‰•™½É”É•ÍÑ½É”°ÍÑ…±±•µ™É…µ”™…±±‰…¬°…¹•°½±…Ñ”µ™É…µ”)±•…¹ÕÀ°‰ÕÍä½µ…¹Õ…°µÁÉ½‰”É•™ÕÍ…°°Í¡•‘Õ±•È™…¥±ÕÉ”É•ÍÑ½É…Ñ¥½¸°…ÑÕ…°¥±”•¹ÑÉä)Ý¥Ñ ‘•‰Õ=°Á…•¡¥‘”½‘•‰Õœµ½™˜±•…¹ÕÀ°Õ¹¡…¹•‰…­¥¹œ‘¥µ•¹Í¥½¹Ì…¹µ½‘•°¼)¡¥ÍÑ½Éä¥‘•¹Ñ¥ÑäÑ•ÍÑ•¸=É¥¥¹…°äÜÌÑ•ÍÑÌÉ•Ñ…¥¹•¸M¡…É•Ñ•ÍÐ¡•±Á•È½¹±ä…¥¹Ì)½ÁÑ¥½¹…°¥±”¡½ÍÐ¸9¼¹…Ñ¥Ù”¥A…É•½Ù•ÉäµÍÁ••½Ù¥ÍÕ…°…•ÁÑ…¹”¥¹™•ÉÉ•¸)IÕ¹Ñ¥µ”¡…¹”=91d•ÍÑÕÉ”µ‘•‰Õœì‘¥É•ÐÍ¡•±°½É•½Ù•ÉäÁ¥¹ÌäàÀ…¹É•Ù¥•Ý•¡…Í¡•Ì¸(äÜäµ½‘•±±¥¹œ½á…Ð°äÜà	É¥‘”½Í¡…É•É•¹‘•É•È°µ…¥¸½5Õ±Ñ¤Ä¸À½¥½¹Ì½™É½é•¸Õ¹¡…¹•¸()Y%äàÀè¥±—ŠII•™É•Í ‘¥ÍÁ±…äè…¹Ù…ÌÉ•ÑÕÉ¹Ì…ÕÑ½µ…Ñ¥…±±ä°µ½‘•°½Í•±•Ñ¥½¸ÍÑ…äì)U¹‘½I•‘¼ÍÑ¥±°…ÑÌ½¸…ÑÕ…°ÁÉ¥½Èµ½‘•±±¥¹œ¡…¹•Ì¸9¼‘•‰Õœ•¹…‰±”É•ÅÕ¥É•¸)]¡•¸É¥¡Ð½¹ÑÉ½±Ì¹•áÐ‘¥Í…ÁÁ•…È°ÕÍ”Ñ¡¥Ì½¹”…Ñ¥½¸ìÉ•Á½ÉÐ¥˜Ñ¡•äÉ•ÑÕÉ¸…¹)ÍÑ…äÙ¥Í¥‰±”¸á¥ÍÑ¥¹œµ…¹Õ…°!¥‘”ÍŠIM¡½ÜÍÉ•µ…¥¹Ì…Ù…¥±…‰±”¥˜‰É¥•˜É•™É•Í ‘½•Ì)¹½ÐÉ•ÁÉ½‘Õ”¥ÑÌÉ•½Ù•Éä¸Q¡¥Ì¥Ì½¹Ù•¹¥•¹Ð•Ù¥‘•¹”µ‰…Í•I=YId°¹½Ð„±…¥´)Ñ¡…Ð¥¹Ñ•Éµ¥ÑÑ•¹ÐÁ…¥¹Ñ¥¹œ™…Õ±Ð¥Ì™¥á•¸9•áÐ™½±±½Ü¹…Ñ¥Ù”™••‘‰…¬…¹¥¹Ù•ÍÑ¥…Ñ”)…¹Ù…Ì½U$‰½Õ¹‘…Éä™É½´•Ù¥‘•¹”ìÉ•Ñ…¥¸…±°ÁÉ½Ñ•Ñ•äÜä¼äÜà¥¹Ñ•É…Ñ¥½¹Ì¸((ŒŒ€¸äàÄƒŠPUXÁ½ÁÕÀÑ½À±…å•È…¹½µÁ±•Ñ”ÍÕÉ™…”Ñ•…É‘½Ý¸ì€¸äàÀÉ•½Ù•ÉäAML½¹±äƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäàÀAML…•ÁÑÌ•áÁ±¥¥ÐÉ•½Ù•Éä°‰ÕÐÉ•©•ÑÌ¹••‘¥¹œµ…¹Õ…°I•™É•Í …Ì„)Í½±ÕÑ¥½¸…¹ÍÕÁÁ±¥•ÌÉ•ÁÉ½‘Õ¥‰±”UXÝ¥¹‘½ÜÉ•Á½ÉÐÀÜèÔÄèÀåh¸-••ÀÉ¥¡ÐµÍ¥‘”Ù¥ÍÕ…°)™…¥±ÕÉ”=A8ì‘½¸Ðµ¥ÍÉ•½ÉäàÀ…ÌU$É•Á…¥ÈAML¸äÜäá…Ð…¹äÜà	É¥‘”ÁÉ½Ñ•Ñ•¸)Õ‘¥ÐÕÉÉ•¹Ñµ…¥¹„ÀÀØàÕ„àè•Ù•¹Ñ¡…¥¸¥Ì=‰©•ÐUYÑ½½±ÌààÄàÃŠIµ•Í¡!•…±Ñ¡±½Í”äÈàÔÃŠH)™¥¹…±Í•ÍÍ¥½¹¹Õ±°°¹¼UX‘¥Ñ½È½Á…¥¹Ð½‘¥ÍÁ±…åÉ•™É•Í ¹••‘•¸½¹ÑÉ½±Ì½•½µ•ÑÉä½¡¥ÑÌ)¡•…±Ñ¡äì¡¥‘‘•¸Í¡…É•‘¡½ÍÐÉ•µ…¥¹ÌÙ¥•ÝÁ½ÉÐµ½¹Ñ…¥¹•Ý¥Ñ èÄÌÐ½½Ù•É™±½Ý…ÕÑ¼¼)½¹Ñ…¥¹±…å½ÕÑÁ…¥¹Ð½¥Í½±…Ñ¥½¹¥Í½±…Ñ”¸M½ÕÉ”•¹±…­•Ù¥•ÝÁ½ÉÐµÍÑå±”½Á±…•µ•¹Ð)±•…¹ÕÀ¸á…Ð•Ù¥‘•¹”ÍÕµµ…Éä¥¸‘½Ì½Õ¤µÕØµÑÉ¥•È´äàÀ¹µì¹¼ÁÉ½Ù•¸•¹¥¹”…ÕÍ”¸()I•Á…¥È½É¥¥¹…°Ñ½½°µÍ•ÍÍ¥½¸µÕ¤½Ý¹•È°9=P…¸…ÕÑ½µ…Ñ¥ŒÝ½É­…É½Õ¹¸UXÑ½½±ÌÕÍ•Ì)µ…¹Õ…°¹…Ñ¥Ù”A½Á½Ù•ÈÑ½À±…å•È¥˜ÍÕÁÁ½ÉÑ•ì½É¥¥¹…°¡½ÍÐ½½¹ÑÉ½°¹½‘•ÌÉ•µ…¥¸¥¸)=4Í¼•á¥ÍÑ¥¹œÍ½Á•Ý¥‘”ML½±¥ÍÑ•¹•ÉÌ½…Ñ¥½¹ÌÍÕÉÙ¥Ù”¸¥á•Á½Í¥Ñ¥½¹¥¹œ™½±±½ÝÌ)Ù¥•ÝÁ½ÉÐÑ½À¬ÄÉÁàì‘å¹…µ¥ŒÙ¥•ÝÁ½ÉÐ¡•¥¡Ð‰½Õ¹‘Ì°Ý¥¹‘½Ü½Ù¥ÍÕ…°É•Í¥é”±¥ÍÑ•¹•ÉÌ)…Ñ¥Ù”½¹±äÝ¡¥±”Í¡½Ý¸¸=É¥¥¹…°€¸äÔàÑÉ…¹Í™½Éµ™É•”Á½Í¥Ñ¥½¸É•Ñ…¥¹•°‰ÕÐ™…¥±•)Á…¥¹Ðµ½¹Ñ…¥¹µ•¹Ð±…å•ÈÉ•µ½Ù•¸QÉ…¹ÍÁ…É•¹Ð¹½¹¥¹Ñ•É…Ñ¥Ù”‰…­‘É½À°¥¹¡•É¥Ñ•Ñ•áÐ)½±½ÕÈì¹¼µ½‘…°½¥¹•ÉÐ½™½ÕÌµÑÉ…À½È¹•ÜÉ…ÜµÁ½¥¹Ñ•È½Ý¹•È¸=Ñ¡•ÈÑ½½±ÌÕ¹¡…¹•¸()=¸±½Í”½½¹Ñ•áÐÍÝ¥Ñ °¡¥‘”½É•±•…Í”¹…Ñ¥Ù”ÍÕÉ™…”‰•™½É”É•ÑÕÉ¹¥¹œ½É¥¥¹…°)½¹ÑÉ½±Ìì±•…ÈÁ½Á½Ù•È½‘½¬½Ý¥‘”™±…Ì…¹10¥¹±¥¹”Ù¥•ÝÁ½ÉÐÍÑå±•ÌìÁ…É¬•µÁÑä)¡¥‘‘•¸¡½ÍÐ‰…¬¥¸‘É…Ý•È¸UX‘¥Ñ½È¡…¹‘½™˜•áÁ±¥¥Ñ±äÍÕÍÁ•¹‘ÌÍ½ÕÉ”ÍÕÉ™…”)‰•™½É”™¥ÉÍÐÝ½É­ÍÁ…”Á…¥¹ÐÝ¡¥±”ÁÉ•Í•ÉÙ¥¹œ½É¥¥¹…°±½¥…±Í•ÍÍ¥½¸Õ¹Ñ¥°	…¬¼)±½Í”¸Q¡ÕÌ¹¼•µÁÑäÑ½Àµ±…å•ÈÁ½ÁÕÀ…‰½Ù”É•‘¥Ñ½È¸á¥ÍÑ¥¹œÝ½É­ÍÁ…”äÔÈ…¹…±°)UX½…Ñ±…Ì½¡¥ÍÑ½Éä½µ…Ñ ½Ý¹•ÉÌÕ¹Ñ½Õ¡•¸9…Ñ¥Ù”Õ¹ÍÕÁÁ½ÉÑ•½Ñ¡É½Ý¥¹œA$™…±±Ì‰…¬)Í…™•±äÑ¼½É¥¥¹…°Õ¹ÑÉ…¹Í™½Éµ•…‰Í½±ÕÑ”Á…¹•°°Ý¥Ñ¡½ÕÐ½¹Ñ…¥¹µ•¹ÐìÍ…µ”±•…¹ÕÀ¸)9¼…¹Ù…ÍÙ¥Í¥‰¥±¥Ñä½É•™É•Í ½É•Í¥é”½É•¹‘•É•ÈÉ•Í•Ð°Ñ¥µ•È°Á•Èµ™É…µ”Á½±±¥¹œ½Èµ•Í )¡…¹”¥¹ÑÉ½‘Õ•¸á¥ÍÑ¥¹œµ…¹Õ…°É•½Ù•ÉäÉ•µ…¥¹Ì…Ù…¥±…‰±”‰ÕÐ¥Ì¹½Ð¥¹Ù½­•¸()á¥ÍÑ¥¹œ‘•‰ÕœÍ¹…ÁÍ¡½Ð¹½Ü¥¹±Õ‘•ÌÍ½ÕÉ”µÁ…É•¹Ð½Á½Á½Ù•È½Ñ½Á1…å•ÈÍÑ…Ñ”Á±ÕÌ)µ•Í¡!•…±Ñ¡M•ÍÍ¥½¸…¹‰½á±…‰UY]½É­ÍÁ…”°Í¼¹…Ñ¥Ù”É•¹‘•É¥¹œµ½‘”½±•…¸±½Í”…¸‰”)Ù•É¥™¥•¥˜É•ÕÉÉ•¹”Á•ÉÍ¥ÍÑÌ¸Q¡¥Ì¥Ì•Ù¥‘•¹”°¹½ÐÉ•Á±…•µ•¹Ð½¹ÑÉ½±Ì¸(ÌØÐÑ…É•Ñ•‘AML¼Á%0¼ÁÍ­¥À€ Ð¸ÕÌ¤èÕ¹•Ü½¹ÑÉ½±±•È½¹…Ñ¥Ù”µA$µ‘½Õ‰±”Ñ•ÍÑÌ½Ù•ÈÄÔ)½Á•¸½±½Í”å±•Ì°•á…Ð½É¥¥¹…°¹½‘•Ì½½¹Ñ•áÐ°Ñ½Àµ±…å•ÈÉ•±•…Í”½ÍÑå±•Ì½Á…É­¥¹œ°)UX‘¥Ñ½È¡…¹‘½™˜°É•Í¥é”½‘¥ÍÁ½Í…°°½Ñ¡•ÈµÑ½½°ÍÝ¥Ñ …¹Õ¹ÍÕÁÁ½ÉÑ•½Ñ¡É½Ü™…±±‰…¬¸)=É¥¥¹…±UX½Ý½É­ÍÁ…”½Í•ÍÍ¥½¸½¡•…±Ñ ½‘•‰Õœ½	É¥‘”½á…Ð½É•±•…Í”¡•­ÌÉ•Ñ…¥¹•¸äÔà)Ñ•ÍÐ¹½ÜÉ•©•ÑÌ½±½¹Ñ…¥¹µ•¹ÐÉ…Ñ¡•ÈÑ¡…¸ÁÉ•Í•ÉÙ¥¹œ„µ¥Ñ¥…Ñ¥½¸Ñ¡…Ð™…¥±•)½¹‘•Ù¥”¸9¼±½…°¹…Ñ¥Ù”]•‰-¥ÐÙ¥ÍÕ…°É•ÁÉ½‘ÕÑ¥½¸½Õ…É…¹Ñ••Á•Éµ…¹•¹ÐÉ•Á…¥È)±…¥µ•¸•Ù¥”µÕÍÐ½¹™¥É´Ñ¡¥ÌÍÑÉÕÑÕÉ…°Í½ÕÉ”™¥àÁÉ•Ù•¹ÑÌÑ¡”ÑÉ¥•È¸()¡…¹•ÉÕ¹Ñ¥µ”½¹±ä½É¥¥¹…°Í¡…É•‘Í•ÍÍ¥½¸½µ•Í¡¡•…±Ñ ¡…¹‘½™˜½‘•‰Õœ•Ù¥‘•¹”ì‘¥É•Ð)Í¡•±°½É•½Ù•Éä­•åÌäàÄ…¹É•Ù¥•Ý•¡…Í¡•Ì¸9…Ñ¥Ù”A$ÍÕÁÁ½ÉÑ•Í¥¹”M…™…É¤ÄÜì)ÁÉ¥µ…ÉäÍ½ÕÉ•Ì¥¸¥¹¥‘•¹Ñ‘½Œ¸9¼Í¡…É•±…å½ÕÐ½Á½Í¥Ñ¥½¹•È•‘¥ÑÌ°‘ÕÁ±¥…Ñ”Á½ÁÕÀ°)UX­•É¹•°±µ…¥¸°äàÀÉ•½Ù•Éä¥µÁ±•µ•¹Ñ…Ñ¥½¸°äÜåá…Ð°äÜá	É¥‘”±5Õ±Ñ¤Ä¸À½È™É½é•¸¡…¹•Ì¸()Y%äàÄèÝ¥Ñ¡½ÕÐI•™É•Í ½…ÁÀµÍÝ¥Ñ ½É½Ñ…Ñ¥½¸°É•Á•…Ñ•‘±ä=‰©•ÓŠIU[ŠI±½Í”°¥¹ÍÁ•Ð)É¥¡ÐÑ½½±‰…È½ÍÑ…ÑÕÌ•… å±”ìÑ¡•¸ÕÑ¼…Ñ±…Ì½=Á•¸UX‘¥Ñ½È½	…¬…¹½É‰¥ÐÑ¼)É¥¡Ð•‘”¸½¹ÑÉ½±ÌµÕÍÐÍÑ…ä‘É…Ý¸…¹ÕÍ…‰±”¸U$•‰Õœ¥˜É•ÕÉÉ•¹”è¡½ÍÐÁ…É•¹Ð)Í¡½Õ±‰”‘É…Ý•È…™Ñ•É±½Í”°Á½Á½Ù•É¹Õ±°½Ñ½Á1…å•É™…±Í”°½¹Ñ…¥¹¹½¹”ìÍ•¹¹•ÜÉ•Á½ÉÐ¸)¼¹½Ð±½Í”Ù¥ÍÕ…°¥ÍÍÕ”™É½´…ÕÑ½µ…Ñ•AML¸9•áÐ…ÑÕ…°äàÅ‘•Ù¥”É•ÍÕ±Ð‰•™½É”)Õ¹É•±…Ñ•‘™•…ÑÕÉ”É½±±½ÕÐ½ÈÍÁ•Õ±…Ñ¥Ù”™ÕÉÑ¡•ÈML½•¹¥¹”™¥á•Ì¸((ŒŒ€¸äàÈA…¥¹Ð¥½¹Ì…¹ÁÉ½Ñ•Ñ•€¸äàÄUX±¥™•å±”((´mátUÍ•ÈAMLäàÄèÉ•Á•…Ñ•UX½Á•¸½±½Í”…¹‘¥Ñ½ÈÉ•ÑÕÉ¸­••ÀÉ¥¡Ð½¹ÑÉ½±ÌÙ¥Í¥‰±”Ý¥Ñ¡½ÕÐI•™É•Í ‘¥ÍÁ±…äìÉ•Ñ…¥¸¹…Ñ¥Ù”Ñ½Àµ±…å•ÈÉ•±•…Í”½¡½ÍÐÑ•…É‘½Ý¸¸(´mátUÍ•ÈAMLäàÈè…±°ÄÀA…¥¹Ð¥½¹Ìµ…Ñ Í•±•Ñ•AÉ½½˜ÀÌÝ¥Ñ É•…‘…‰±”…ÁÑ¥½¹Ìì½É¥¥¹…°•¹ÑÉ”½½¹ÑÉ½°Á±…•µ•¹ÑÌ…¹Í•±•Ñ•½‘¥Í…‰±•™••‘‰…¬ÍÑ…äÕÍ…‰±”¸(´mátUÍ•ÈAMLäàÈè	ÉÕÍ ½	±ÕÈ½MµÕ‘”…¹1…å•ÉÌ½5…Í¬½%µ…”½<½5…ÀÍ¥é”½Á•¸½É¥¥¹…°±•™Ð½¹ÑÉ½±Ììå±¥¹œ­••ÁÌÉ…‘¥…°Õ¹Ñ¥°A•¹¥°ÍÕÉ™…”ÕÍ”ì‰…­É½Õ¹¡½±É•½Á•¹Ì¸(´ltY%äàÈèA…¥¹ÐU¹‘½I•‘¼½½¹”°µ½‘•±±¥¹œ¥½¹Ì…¹UX±½Í”½É¥¡ÐÑ½½±‰…ÈÍÑ…ä…•ÁÑ•¸(´mátÉÑÝ½É¬…Õ‘¥ÐèÄÀÙ…±¥MYÌ•á…ÐÑ¼AÉ½½˜ÀÌ°é•É¼Ñ…É•Ðµ‰½à½Ù•É±…ÁÌ°‰½Õ¹‘Ì™¥Ð•á¥ÍÑ¥¹œÌÔÁÁàÉ…‘¥…°¸(((ŒŒ€¸äàÌÍÑ…ÉÑÕÀÑ½½±‰…È€¼É•™É•Í É•ÕÉÉ•¹”((´lt=A8èÕÍ•ÈäàÈÉ•Á½ÉÑÌ¥¹Ù¥Í¥‰±”É¥¡Ð½¹ÑÉ½±Ì¥µµ•‘¥…Ñ•±ä…™Ñ•ÈÉ•™É•Í ìÍ•Ù•É…°É•™É•Í¡•ÌÉ•½Ù•É•¸äàÄUX…•ÁÑ…¹”‘½•Ì¹½Ð±½Í”ÍÑ…ÉÑÕÀÙ¥Í¥‰¥±¥Ñä¸(´ltY%äàÌèÉ•Á•…Ñ•É•±½…‘ÌÉ•Ñ…¥¸‘É…Ý¸É¥¡ÐÑ½½±‰…È½ÍÑ…ÑÕÌ‰•™½É”¹…Ù¥…Ñ¥½¸°UX•¹ÑÉä°…ÁÀµÍÝ¥Ñ ½ÈÉ½Ñ…Ñ¥½¸¸(´ltY%äàÌèÉ…µ”±°½U¹‘½I•‘¼½½ÕÌ½=‰©•ÑÌ½Y%\Ý½É¬½¹”½¸½É¥¥¹…°½Ý¹•ÉÌìÉ¥¡Ð‰É½ÝÍ•È½µ•¹Ô‰½Õ¹‘ÌÕ¹¡…¹•¸(´ltY%äàÌèUX½Á•¸½±½Í”½‘¥Ñ½È	…¬…¹…•ÁÑ•A…¥¹Ð¥½¹Ì½Ý½É­™±½ÜÉ•µ…¥¸ÕÍ…‰±”¸(´mátÕÑ½µ…Ñ•èÍ¥¹±”™¥¹…°½É‘•É•Ñ½½±‰…È¥¸Í¡•±°ì½É¥¥¹…°Y%\½MY¹½‘•ÌÉ•Ñ…¥¹•½¸¡å‘É…Ñ¥½¸ì=‰©•ÑÌ½É…µ”‰¥¹½¹”ìÉ•…°…µ•É„™¥Ðì™…±±‰…¬É•…Ñ¥½¸É•Ñ…¥¹•¸((ŒŒ€¸äàÌ¹…Ñ¥Ù”™••‘‰…¬ƒŠP™¥ÉÍÐµÉ•™É•Í ™…¥±ÕÉ”((´mátUÍ•È™Õ¹Ñ¥½¹…°AMLäàÌÉ•½É‘•ì…•ÁÑ•A…¥¹ÐäàÈ…¹½É¥¥¹…°Ñ½½±‰…È…Ñ¥½¹ÌÉ•Ñ…¥¹•¸(´lt%1½=A8è™¥ÉÍÐÉ•™É•Í ÍÑ¥±°±½Í•ÌÉ¥¡Ð½¹ÑÉ½±Ì½¸äàÌìÍÑ…ÉÑÕÀÍ¡•±°ÍÑ…‰¥±¥é…Ñ¥½¸‘¥¹½ÐÁ…ÍÌ¹…Ñ¥Ù”Ù¥Í¥‰¥±¥Ñä¸(´lt…ÁÑÕÉ”™É•Í äàÌU$•‰Õœ½¸%IMP™…¥±•±½…‰•™½É”…¹äÉ•½Ù•Éä½È…ÁÀµÍÝ¥Ñ ìÍÑ…Ñ¥ŒµÑ½½±‰…È¡åÁ½Ñ¡•Í¥Ì¥Ì¹½Ð„½¹™¥Éµ•É½½Ð…ÕÍ”¸((ŒŒ€¸äàÌÉ½Õ¹µÉ•¥½¸•Ù¥‘•¹”ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ((´lt=A8è¹•Ü…ÁÑÕÉ”¡…ÌÙ¥Í¥‰±”U$‰ÕÐµ¥ÍÍ¥¹œÉ¥¡ÐÉ½Õ¹Í¡…‘¥¹œ¸-••ÀÍ•Á…É…Ñ”™É½´•…É±¥•È¥¹Ù¥Í¥‰±”µ½¹ÑÉ½±Ì™…¥±ÕÉ”¸(´mátMÕÁÁ±¥•ÍÑ…ÉÑÕÀ½Á…•Í¡½ÜÑ½½±‰…ÈÝ¥‘Ñ ÍÑ…‰±”ÌÄÜ¸ØÀäÌÜÔì…¹Ù…ÌÈÜÌÉàÄØÔÈì¹¼…Ñ¥Ù”UXÑ½À±…å•È¸=4•Ù¥‘•¹”‘½•Ì¹½Ð•ÍÑ…‰±¥Í ™±½½È½Í¡…‘½ÜÉ•¹‘•É¥¹œ¸(´mát%¹¥Ñ¥…°ÍÉ••¹Í¡½Ð¥¹ÍÁ•Ñ•è€¸äàÌÑ½ÀµÉ¥¡Ð½¹ÑÉ½±ÌÙ¥Í¥‰±”ìÍÑÉ…¥¡ÐÙ•ÉÑ¥…°Í¡…‘¥¹œÍ•…´¹•…ÈÉ¥¡ÐÅÕ…ÉÑ•Èì™±½½È½¹Ñ¥¹Õ•Ì½¸‰½Ñ Í¥‘•Ì°Í•Á…É…Ñ”Í±½Á¥¹œ‘¥ÍÑ…¹Ð•‘”¸(´ltMµ…±°½É‰¥Ð]%Q!=UPÉ•™É•Í ½…ÁÀµÍÝ¥Ñ èÉ•Á½ÉÐÝ¡•Ñ¡•ÈÍ•…´ÍÑ…åÌ™¥á•½¸ÍÉ••¸°µ½Ù•ÌÝ¥Ñ É½Õ¹°½È‘¥Í…ÁÁ•…ÉÌ‰•™½É”¡½½Í¥¹œÍ½ÕÉ”¡…¹”¸9¼É•Á•…Ð¥¹¥Ñ¥…°ÍÉ••¹Í¡½Ð½‘•‰Õœ‘ÕµÀ¹••‘•¸((ŒŒ€¸äàÐÍ•±•Ñ•µ™…”É½ÕÀ…ÕÑ¡½É¥¹œ((´lt…”µ½‘”èÍ•±•Ð™…•Ì°Y%\€ø…•É½ÕÁÌ€ø¹…µ”€øÍÍ¥¸Í•±•Ñ•ì½¹±ä¡½Í•¸™…•Ì¡…¹”É½ÕÀ¸(´ltM…µ”¹…µ”©½¥¹ÌÉ½ÕÀì‘¥™™•É•¹Ð¹…µ”Í•Á…É…Ñ•Ìì±•…ÈÍ•±•Ñ•±•…Ù•Ì½Ñ¡•ÈÉ½ÕÁÌ¥¹Ñ…Ð¸(´ltU¹‘¼½I•‘¼°M…Ù”½=Á•¸É•Ñ…¥¸É½ÕÁÌ…¹•½µ•ÑÉä½UYÌì¹¼UXÉ•ÅÕ¥É•µ•¹Ð¸(´lt9¼Í•±•Ñ¥½¸½ÝÉ½¹œµ½‘”½…Ñ¥Ù”Ñ½½°½±½­•½±¥¹­•½É•¥Á”½‰©•ÑÌÉ•™ÕÍ”Ý¥Ñ¡½ÕÐ¡¥ÍÑ½Éä¸(´mátÕÑ½µ…Ñ•µ•Ñ…‘…Ñ„°Õ¹¡…¹••½µ•ÑÉä½Í½ÕÉ”°¹¼µ½À°Ù…±¥‘…Ñ¥½¸½É•™ÕÍ…°…¹¡•­Á½¥¹ÐÑ•ÍÑÌÁ…ÍÌ¸(´lt%¹Ñ•Éµ¥ÑÑ•¹ÐÉ¥¡ÐµÉ•¥½¸É•¹‘•É¥¹œ½¥éµ¼±½ÍÌÉ•µ…¥¹Ì=A8ì…¹¹½ÐÕÉÉ•¹Ñ±äÉ•ÁÉ½‘Õ”°¹½ÐÉ•Á…¥É•¸((ŒŒ€¸äàÔÉ½ÕÀµ¹…µ”É•ÕÍ”€¼€¸äàÐ…•ÁÑ•((´mátUÍ•ÈAMLäàÐÁÉ½Ñ•ÑÌÍ•±•Ñ•µ™…”É½ÕÀ…ÍÍ¥¹µ•¹Ð½±•…È°U¹‘½I•‘¼…¹M…Ù”½=Á•¸¸(´ltM•±•Ð™…•Ì¥¸½¹”É½ÕÀìUÍ”Í•±•Ñ•É½ÕÀ¹…µ”½Á¥•Ì¥ÑÌ¹…µ”°¡…¹•Ì¹¼™…•Ì½È¡¥ÍÑ½Éä¸(´lt5¥á•½Õ¹É½ÕÁ•½¹¼Í•±•Ñ¥½¸É•™ÕÍ•ÌÁ¥­ÕÀ…¹É•Ñ…¥¹ÌÕÉÉ•¹Ð¹…µ”¸(´lt½ÕÌ¹…µ”¥¹ÁÕÐè•á¥ÍÑ¥¹œ¹…µ•Ì½™™•É•½¹”•… ìÉ•¹…µ”¡½¥”™½±±½Ý•‰äÍÍ¥¸Í•±•Ñ•©½¥¹ÌÉ½ÕÀ¸(´ltU¹‘½I•‘¼…™™•ÑÌ…ÑÕ…°…ÍÍ¥¹µ•¹Ð½¹±äìM…Ù”½=Á•¸É•Ñ…¥¹Ì…•ÁÑ•äàÐ‰•¡…Ù¥½È¸(´mátÕÑ½µ…Ñ•É•…µ½¹±äÉ•ÕÍ”°¥¹Ù…±¥½µ¥á•É•™ÕÍ…°…¹Í…™”½ÁÑ¥½¸¹Ù…±Õ”¥¹Í•ÉÑ¥½¸¡•­ÌÁ…ÍÌ¸((ŒŒ€¸äàØA•¹¥°™…•É½ÕÀÍÑÉ½­•Ì((´mátUÍ•ÈAMLäàÔÁÉ½Ñ•ÑÌ•á¥ÍÑ¥¹œµ¹…µ”É•ÕÍ”…¹äàÐ…ÕÑ¡½É¥¹œ½¡¥ÍÑ½Éä½Í…Ù”‰…Í•±¥¹”¸(´lt…”µ½‘”€øY%\…•É½ÕÁÌ€ø¹…µ”€øA•¹¥°™…•É½ÕÀÍÑÉ½­•ÌìÍÑÉ½­”Ù¥Í¥‰±”™…•Ì°±¥™Ð…ÍÍ¥¹ÌÉ½ÕÀ¸9¼UXÉ•ÅÕ¥É•¸(´lt½±½ÕÉÌÕÁ‘…Ñ”=81%Pì•… ¡…¹•ÍÑÉ½­”¥Ì½¹”U¹‘¼½I•‘¼•¹ÑÉä°¹¼µ½ÀÍÑÉ½­•Ì…‘¹½¹”¸(´lt¥¹•ÉÌ¹…Ù¥…Ñ”ìÍ•½¹…¹Ù…Ì½¹Ñ…Ð…¹•±ÌÕÉÉ•¹ÐÍÑÉ½­”ìMÑ½ÀÉ•ÍÑ½É•Ì½É‘¥¹…ÉäÍ•±•Ñ¥½¸¸(´lt¡…¹”½Á¥¬¹…µ”…¹É•…É´ìÍÝ¥Ñ ±½½¬ÍÑ½ÁÌ‰ÉÕÍ ìM…Ù”½=Á•¸É•Ñ…¥¹ÌÉ½ÕÁÌ¸(´mátÕÑ½µ…Ñ•ÁÕÉ”½É•…°½Ý¹•ÈÉ½ÕÑ¥¹œ½Ù•ÉÌÍ½ÕÉ”µ¹•ÕÑÉ…°ÍÑ…¥¹œ°…¹•±±…Ñ¥½¸°±½ÍÐ…ÁÑÕÉ”½Á…•¡¥‘”°½¹ÑÉ½±ÌÉ•ÍÑ½É…Ñ¥½¸°ÍÑ…±”½¹Ñ•áÐ°½¹”¡•­Á½¥¹Ð…¹‰…­É½Õ¹A•¹¥°¹…Ù¥…Ñ¥½¸¸(´lt9…Ñ¥Ù”A•¹¥°½•ÍÑÕÉ”…•ÁÑ…¹”Á•¹‘¥¹œìÉ•¹‘•É¥¹œ™…Õ±ÐÉ•µ…¥¹Ì=A8¥¹‘•Á•¹‘•¹Ñ±ä¸((ŒŒ€¸äàÜA•¹¥°™…•É½ÕÀ•É…Í•È((´mátUÍ•ÈAMLäàØÁÉ½Ñ•ÑÌ¹…µ•A•¹¥°ÍÑÉ½­•Ì…¹…•ÁÑ•¡¥ÍÑ½Éä½¹…Ù¥…Ñ¥½¸¸(´ltY%\…•É½ÕÁÌ€øÉ…Í”É½ÕÀÍÑÉ½­•ÌìÍ…µÁ±•™…•Ì‰•½µ”Õ¹É½ÕÁ•=81%P¸(´lt=Ñ¡•ÈÉ½ÕÁÌ½•½µ•ÑÉä½UYÌÕ¹¡…¹•ì½¹”U¹‘¼½I•‘¼Á•È¡…¹••É…Í”ÍÑÉ½­”¸(´lt±É•…‘äÕ¹É½ÕÁ•ÍÑÉ½­”…‘‘Ì¹¼¡¥ÍÑ½ÉäìÍÝ¥Ñ ‰…¬Ñ¼¹…µ•ÍÑÉ½­•Ì…¹MÑ½À¸(´ltM…Ù”½=Á•¸…¹™¥¹•È¹…Ù¥…Ñ¥½¸É•µ…¥¸…•ÁÑ•ì¹…Ñ¥Ù”•É…Í•ÈÉ•Ù¥•ÜÁ•¹‘¥¹œ¸(´mátÕÑ½µ…Ñ••É…Í•ÈÍÑ…¥¹œ½¹¼µ½À½Õ¹Ñ½Õ¡•‘…Ñ„½¡•­Á½¥¹Ð½…¹•°½ÍÝ¥Ñ Ñ•ÍÑÌÁ…ÍÌ¸((ŒŒ€¸äàà•á¥ÍÑ¥¹œµÉ½ÕÀ‘É½Á‘½Ý¸É•Á…¥È€¼É•¹‘•É¥¹œÉ•ÕÉÉ•¹”((´lt9…Ñ¥Ù”á¥ÍÑ¥¹œÉ½ÕÀ‘É½Á‘½Ý¸½Á•¹Ì½¸¥A…ìÍ•±•Ð•á¥ÍÑ¥¹œ¹…µ”°…ÍÍ¥¸¹•Ü™…•Ì¸(´lt=É¥¥¹…°É½ÕÀÑ•áÐ¥¹ÁÕÐÉ•…Ñ•Ì¹•Ü¹…µ•ÌìÉ•½Á•¹¥¹œY%\±¥ÍÑÌÕÉÉ•¹Ðµ•Í É½ÕÁÌ¸(´ltM•±•Ñ½È¡½¥”¡…¹•Ì¹¼•½µ•ÑÉä½¡¥ÍÑ½Éä…¹ÍÑ½ÁÌÁÉ¥½È‰ÉÕÍ ìU¹‘½I•‘¼…™™•ÑÌ…ÑÕ…°…ÍÍ¥¹µ•¹Ð¸(´ltÉ…Í•ÈäàÜ…¹M…Ù”½=Á•¸É•µ…¥¸‘•Ù¥”É•Ù¥•Üì¹¼äàÜAML¥¹™•ÉÉ•¸(´mátÕÑ½µ…Ñ•…ÑÕ…°½ÁÑ¥½¸Á½ÁÕ±…Ñ¥½¸½¡…¹”…±±‰…­Ì°É•™É•Í ½•µÁÑä½Ñ•áÐÍ…™•Ñä…¹É•Ñ…¥¹•…ÕÑ¡½É¥¹œ½ÍÑÉ½­”É•É•ÍÍ¥½¹ÌÁ…ÍÌ¸(´lt=A8è±½Ý•ÈµÉ¥¡Ð½Y%\µ•¹Ô‰±…¹¬½È½¹”¥¸äàÜ¸=4½¡¥Ð¡•…±Ñ ‘½•Ì¹½ÐÁÉ½Ù”Á¥á•°É•¹‘•É¥¹œ¸M•”‘½Ì½Õ¤µÉ¥¡ÐµÉ•¥½¸´äàÜ¹µ¸((ŒŒ€¸äàäY%\Á…¹•°‘¥…¹½ÍÑ¥Ì€¼€¸äàà…•ÁÑ…¹”((´mátUÍ•ÈAMLäààÁÉ½Ñ•ÑÌ¹…Ñ¥Ù”á¥ÍÑ¥¹œÉ½ÕÀ‘É½Á‘½Ý¸…¹É•±…Ñ•…ÕÑ¡½É¥¹œ™±½Ü¸(´lt9½Éµ…°Y%\½ÍÉ½±°½É½ÕÀÁ¥­•ÈÉ•µ…¥¸ÕÍ…‰±”Ý¥Ñ ‘•‰Õœ½™˜¸(´lt%˜™…Õ±ÐÉ•ÕÉÌ°‘•‰Õœ½¸€øY%\…ÑÑ•µÁÐ€ø…ÁÑÕÉ”½½Áä‰•™½É”É•½Ù•ÉäìÉ•Á½ÉÐ¥¹±Õ‘•ÌÙ¥•Ý5•¹Ô¹½Á•¸°Á…¹•°¹½‘•Ì½ÍÉ½±°…¹É•¹‘•È½ÍÑÉ½­”ÍÑ…Ñ”¸(´lt9¼™½É•É•ÁÉ½‘ÕÑ¥½¸¹••‘•¥˜™…Õ±Ð…‰Í•¹ÐìÉ•¹‘•É¥¹œ¥ÍÍÕ”ÍÑ…åÌ=A8¸(´mátÑÕ…°É•Á½ÉÐ½½‰Í•ÉÙ•ÈÑ•ÍÑÌ‘¥ÍÑ¥¹Õ¥Í ½Á•¸½±½Í•½µ¥ÍÍ¥¹œ°…ÁÑÕÉ”ÍÉ½±°½µ½‘•Ì°­••À=4Õ¹¡…¹•…¹…Ù½¥µ•…ÍÕÉ•µ•¹ÑÌÝ¡•¸‘•‰Õœ½™˜¸((ŒŒ€¸ääÀ±½Í•Y%\ÍÕÉ™…”±¥™•å±”((´ltÉ•Í ±…Õ¹ ½É•±½…èÉ¥¡ÐU$‘É…Ý¸ìY%\±½Í•¥¹¥Ñ¥…±±ä°¹¼¡½ÍÐÁ…¹•°ÍÕÉ™…”¸(´ltI•Á•…Ñ•Y%\½Á•¸½±½Í”°ÍÉ½±°°É½ÕÀÁ¥­•È…¹Ñ½½°‰ÕÑÑ½¹ÌÉ•Ñ…¥¸‰•¡…Ù¥½È¸(´lt•‰Õœ±½Í•Y%\èÁ…¹•°‘¥ÍÁ±…å¹½¹”½é•É¼É•Ðì½Á•¸Y%\è½É‘¥¹…ÉäÁ…¹•°‰½Õ¹‘Ì½ÍÉ½±°¸(´mát=É¥¥¹…°Ñ½½±‰…È½…Ñ¥½¸½¹½‘”¥‘•¹Ñ¥Ñä°É•±•…Í”…¹‘•‰Õœ½…ÕÑ¡½É¥¹œ¡•­ÌÁ…ÍÌ¸(´lt=A8è¹…Ñ¥Ù”É¥¡ÐµÉ•¥½¸É•¹‘•É¥¹œìääÀ±½Í•µÍÕÉ™…”¡…É‘•¹¥¹œ¥Ì¹½ÐÁ•Éµ…¹•¹ÐÉ•Á…¥ÈÁÉ½½˜¸((ŒŒ€¸ääÄ½µÁ…Ð™…•É½ÕÀÁ…¥¹Ð‘½¬((´mátUÍ•ÈAMLääÀÁÉ½Ñ•ÑÌ±½Í•Y%\ÍÕÉ™…”±¥™•å±”…¹…•ÁÑ•µ•¹Ô½Á¥­•È‰•¡…Ù¥½È¸(´lt=Á•¸™…•É½ÕÀÁ…¥¹Ð½¹ÑÉ½±ÌÍ¡½ÝÌ½µÁ…Ð1P‘½¬ìY%\±½Í•Ì°…”µ½‘”Í•±•Ñ•Ñ¡É½Õ ½É¥¥¹…°‰ÕÑÑ½¸¸(´ltá¥ÍÑ¥¹œÉ½ÕÀ€¼½µÁ±•Ñ•¹…µ”•‘¥Ð…ÉµÌA…¥¹ÐìÁ•ÉÍ¥ÍÑ•¹ÐA…¥¹Ð½É…Í”ÍÝ¥Ñ Ý¥Ñ¡½ÕÐÉ•½Á•¹¥¹œY%\¸(´ltM•±•Ñ•™…•Ì…‘Ù…¹•ÍÍ¥¸½±•…È½UÍ”¹…µ”É•µ…¥¸ìÍÑÉ½­•Ì½U¹‘½I•‘¼½M…Ù•=Á•¸­••À½É¥¥¹…°‰•¡…Ù¥½È¸(´lt½¹”ÍÑ½ÁÌ‰ÉÕÍ ½¡¥‘•Ì‘½¬ìµ½‘”½±½½¬½…¹½Ñ¡•ÈÑ½½°±½Í•Ì¥Ð°¹…Ù¥…Ñ¥½¸Õ¹…™™•Ñ•¸I•½Á•¸É•Ñ…¥¹Ì½É¥¥¹…°Ù…±Õ•Ì¸(´mátÕÑ½µ…Ñ•½É¥¥¹…°µ¹½‘”½Ù…±Õ”½±¥ÍÑ•¹•È±¥™•å±”°½¹”°½µµ…¹É½ÕÑ¥¹œ…¹…Ñ¥Ù”µÑ½½°É•™ÕÍ…°¡•­ÌÁ…ÍÌ¸(´lt9…Ñ¥Ù”¥A…‘½¬É•…‘…‰¥±¥Ñä½Ñ…À½ÑåÁ¥¹œ½Á¥­•È…Ñ”Á•¹‘¥¹œì­••ÀÝ…Ñ ™½ÈÉ•¹‘•É¥¹œÉ•ÕÉÉ•¹”¸((ŒŒ€¸ääÄÉ•¹‘•É¥¹œÉ•ÕÉÉ•¹”•Ù¥‘•¹”((´mát9…Ñ¥Ù”ääÄY%\½Á•¸½±½Í”ÑÉ…¹Í¥Ñ¥½¹Ì…¹ääÀ±½Í•‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘Ì½¹™¥Éµ•‰äÉ•Á½ÉÐ¸(´lt%1½=A8èÕÍ•ÈÉ¥¡ÐµÉ•¥½¸Ù¥ÍÕ…°±½ÍÌÉ•ÕÉÌ‘•ÍÁ¥Ñ”½ÉÉ•Ðµ•¹ÔÍÑ…Ñ”ì¹¼Á•Éµ…¹•¹ÐääÀÉ•Á…¥È±…¥´¸(´ltääÄ±•™Ð‘½¬¹…Ñ¥Ù”U`ÍÑ¥±°Á•¹‘¥¹œìÁ…É­•…ÕÑ¡½É¥¹œ¹½‘•Ì±•¥Ñ¥µ…Ñ•±ä¡…Ù”é•É¼‰½Õ¹‘ÌÕ¹Ñ¥°½Á•¹•¸(´lt%˜Á•ÉÍ¥ÍÑ•¹Ðè½µÁ…É”±•™Ð‘½¬Ù¥Í¥‰¥±¥ÑäÑ¼…™™•Ñ•É¥¡ÐÉ•¥½¸ì¹¼É•Á•…Ð…¹Ù…Ì½Ñ½±”‘ÕµÀÉ•ÅÕ•ÍÑ•¸((ŒŒ€¸ääÈƒŠP™…•É½ÕÀ½±½ÕÈ½¹…µ”±¥ÍÐì€¸ääÄÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•È½¹™¥ÉµÌääÄÁ…¥¹Ð½¹ÑÉ½±ÌÝ½É¬É•…Ð…™Ñ•ÈÉ•™É•Í …¹•áÁ±¥¥Ñ±äAMLääÄ¸)AÉ½Ñ•Ð½µÁ…Ð±•™Ð‘½¬°½É¥¥¹…°½¹ÑÉ½±Ì°Á•ÉÍ¥ÍÑ•¹ÐA…¥¹Ð½É…Í”°½¹”…¹ÍÑÉ½­”)¡¥ÍÑ½Éä½¹…Ù¥…Ñ¥½¸¸MÉ••¹Í¡½ÐáÐäÉÍ¡½ÝÌÉ¥¡ÐY%\‰½É‘•È½‰…­É½Õ¹Ý¥Ñ )‰±…¹¬¥¹Ñ•É¥½È‰•™½É”É•™É•Í ì­••À¥¹Ñ•Éµ¥ÑÑ•¹ÐÉ•¹‘•É¥¹œ…Ñ”=A8¥¹‘•Á•¹‘•¹Ñ±ä¸((ääÈÉ•Á±…•Ìá¥ÍÑ¥¹œÉ½ÕÀ¹…Ñ¥Ù”‘É½Á‘½Ý¸Ý¥Ñ „‰½Õ¹‘•ÈÀÁÁà±…å•ÈµÍÑå±”±¥ÍÐè)½¹”Ñ…ÀÑ…É•ÐÁ•È¹…µ•É½ÕÀ°½±½ÕÈÍÝ…Ñ €¬Í…™”Ñ•áÐ¹…µ”°Í•±•Ñ•µÉ½Ü¡¥¡±¥¡Ð¸)9…µ”™¥•±ÍÑ¥±°É•…Ñ•Ì¹•ÜÉ½ÕÁÌì¡½½Í¥¹œ„É½ÜÉ•ÕÍ•Ì½É¥¥¹…°¥¹ÁÕÐ…¹…ÉµÌ)½É¥¥¹…°A…¥¹Ðµ½‘”¸I½ÝÌ…É”ÁÉ•Í•¹Ñ…Ñ¥½¸½¹±ä°¹¼µ•Í ½¡¥ÍÑ½Éä½µ…Ñ•É¥…°µÕÑ…Ñ¥½¸¸)M¡…É•™…•É½ÕÁA…±•ÑÑ”•áÁ½Í•ÌaP•á¥ÍÑ¥¹œÙ¥•ÝÁ½ÉÐµ•Í µ½É‘•È½½±‘•¸µÉ…Ñ¥¼)½±½ÕÈµ…Àì‰½Ñ É•¹‘•É•È…¹±¥ÍÐÕÍ”¥Ð¸A…±•ÑÑ”½É•Í••½±¥¡Ñ¹•ÍÌ½Í…ÑÕÉ…Ñ¥½¸ÕÁ‘…Ñ”)ÍÝ…Ñ¡•Ì°½É¥¥¹…°É•¹‘•É¥¹œ…±½É¥Ñ¡´Õ¹¡…¹•¸I½ÝÌ­••À¹½‘”½™½ÕÌ¥‘•¹Ñ¥Ñä½¸)Í•±•Ñ¥½¸½½±½ÕÈÉ•™É•Í ìÉ½ÕÀµ•µ‰•ÉÍ¡¥ÀÉ•‰Õ¥±‘Ì±…å½ÕÐ½¹±äÝ¡•¸¡…¹•¸)I•™É•Í ÕÉÉ•¹Ðµ•Í ½¸½Á•¸°¹…µ”½•‘¥Ð½Í•±•Ñ¥½¸°Á…±•ÑÑ”¡…¹•Ì…¹ÅÕ•Õ•½É¥¥¹…°)‰½‘äÉ•‰Õ¥±‘Ì€¡ÍÑÉ½­”½µµ¥Ð°…Ñ¥Ù”½‰©•ÐÍÝ¥Ñ °U¹‘½I•‘¼¤ì¹¼Á½±±¥¹œ½¹•ÜÁ½¥¹Ñ•È)½Ý¹•È¸9…µ•Ì…É”Ñ•áÑ½¹Ñ•¹Ð°¹•Ù•È!Q50¸µÁÑä±¥ÍÐ•áÁ±…¥¹Ì¹…µ”€¬Á…¥¹ÐÝ½É­™±½Ü¸)1•…ääààÁ¥­•ÈÑ•ÍÑÌµ¥É…Ñ”Ñ¼¹•Ü±¥ÍÐ…‘…ÁÑ•ÈÁÉ•Í•ÉÙ¥¹œÕÉÉ•¹Ðµµ•Í ½¹…µ”½¹¼)µÕÑ…Ñ¥½¸½Ù•É…”ì¹•ÜÉ•¹‘•É•ÈÑ•ÍÑÌ½Ù•ÈÍ•±•Ñ¥½¸½¥‘•¹Ñ¥Ñä½•µÁÑä½Ñ•áÐÍ…™•Ñä°)½É¥¥¹…°‰ÉÕÍ …±±‰…¬…¹ÍÝ…Ñ µÑ¼µÉ•¹‘•Èµ…ÑÑÉ¥‰ÕÑ”Á…É¥Ñä…É½ÍÌ…±°ÐÁ…±•ÑÑ•Ì¸)MÑÉ½­”äàÜ½…ÕÑ¡½É¥¹œäàÔ½‘½¬ääÄ½UX½A…¥¹Ð½µ…¥¸½5Õ±Ñ¤Ä¸À…¹ääÀY%\ÉÕ±”Õ¹¡…¹•¸)Y…±¥‘…Ñ¥½¸èäÌÑ…É•Ñ•AML¼Á%0¼ÁÍ­¥ÀìÍå¹Ñ…à…¹‘¥™˜¡•­ÌÁ…ÍÌ¸I•Ù¥•Ý•)¡…¹•É•¹‘•È½½É”½¹•Üµ±¥ÍÐ…¹Í¡•±°½É•½Ù•Éä…¡”­•åÌì¹¼™Õ±°µÍÕ¥Ñ”½¹…Ñ¥Ù”)É•¹‘•É¥¹œÁÉ½½˜±…¥µ•¸Q¡”ÁÉ¥½ÈäàÔÍ…™”µÑ•áÐ…ÍÍ•ÉÑ¥½¸¹½ÜÑ…É•ÑÌ±¥ÍÐ±…‰•±Ì)¥¹ÍÑ•…½˜¹…Ñ¥Ù”½ÁÑ¥½¸¥µÁ±•µ•¹Ñ…Ñ¥½¸¸ääÈ…Ý…¥ÑÌ¥A…±¥ÍÐ…•ÁÑ…¹”¸()ÕÑÕÉ”ÕÍ•È½…°è…•É½ÕÀ‰½Õ¹‘…É¥•Ì‘•™¥¹”UX¥Í±…¹Í•…µÌ°Ñ¡•¸É½ÕÀµÑ…É•Ñ•)¥µ…”½A	H…ÍÍ¥¹µ•¹Ð¸Õ‘¥Ð½É¥¥¹…°UX…Ñ±…Ì½Í•…´½ÍÑ¥Ñ …¹Á…¥¹Ðµ…Í¬½µ…Ñ•É¥…°)½Ý¹•ÉÌ™¥ÉÍÐ¸¥ÉÍÐ±¥­•±äÉ½ÕÑ”Í¡…É•…Ñ±…ÌÝ¥Ñ Á•ÈµÉ½ÕÀµ…Í­Ì½‰…­¥¹œìÍ•Á…É…Ñ”)µ…Ñ•É¥…°Í±½ÑÌÉ•ÅÕ¥É”É•¹‘•É•È½Í…Ù”½=	(½1½9=4…Õ‘¥Ð¸Q¡¥Ì‰Õ¥±=L9=P¥µÁ±•µ•¹Ð)Õ¹ÝÉ…Àµ‰äµÉ½ÕÁÌ½ÈÁ•ÈµÉ½ÕÀµ…Ñ•É¥…±Ì°…¹µÕÍÐ¹½Ð¥µÁ±äÑ¡•ä•á¥ÍÐ¸M…µ”µ¹…µ”)‘¥Í½¹¹•Ñ•™…”Á…Ñ¡•Ìµ…äå¥•±µÕ±Ñ¥Á±”¥Í±…¹‘Ìì•½µ•ÑÉäÍÑ…åÌÝ•±‘•¸()Y%ääÈè½Á•¸…•É½ÕÁÌÁ…¥¹Ð‘½¬ìÁ…¥¹ÐÈ¬É½ÕÀ¹…µ•Ì°¥¹ÍÁ•ÐÍÝ…Ñ ½¹…µ”É½ÝÌ¸)Q…ÀÉ½ÝÌ…¹Á…¥¹Ð½•É…Í”ìÍ•±•Ñ•¹…µ”½¡¥¡±¥¡Ð…¹U¹‘½I•‘¼É•™É•Í ±¥ÍÐ¸‘©ÕÍÐ)Y%\Á…±•ÑÑ”½É•Í••…¹É•½Á•¸‘½¬èÍÝ…Ñ¡•Ì™½±±½ÜÙ¥•ÝÁ½ÉÐ‰…Í”½±½ÕÉÌ€¡±¥¡Ñ¥¹œ)…¸Í¡…‘”µ½‘•°¤¸1½¹œ¹…µ•Ì½µ…¹äÉ½ÕÁÌÍÑ…ä½µÁ…Ðì½¹”½™¥¹•È¹…Ù¥…Ñ¥½¸¸((ŒŒ€¸ääÌƒŠP…”ÁÁ±äá…Ð¹…Ñ¥Ù”µÁ½¥¹Ñ•È…ÁÑÕÉ”É•Á…¥ÈƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌÁÁ±äáÑÉÕ‘”á…Ð‘½•Ì¹½ÐÝ½É¬…¹ÑÉ…ÁÌÑ¡”ÕÍ•È¥¸áÑÉÕ‘”¸)Õ‘¥Ñ•ÕÉÉ•¹Ðµ…¥¸ÔäØÝ‘ˆÈä½‰Õ¥±ääÈ°½É¥¥¹…°…”Á½ÁÕÀ½ÁÉ•¥Í¥½¸½‘¥É•Ð½¹ÑÉ½±±•È°)A•¹¥°…Ñ”…¹Q¡É½Õ ™…±±‰…¬¸9¼¹•Ü•½µ•ÑÉä°¡¥ÍÑ½Éä½È•ÍÑÕÉ”½Ý¹•È¹••‘•¸)½¹™¥Éµ•É•É•ÍÍ¥½¸è¹Õµ•É¥Œá…Ð‘¥ÍÁ…Ñ¡•ÌÉ•Í•ÉÙ•Íå¹Ñ¡•Ñ¥ŒÁ½¥¹Ñ•ÈäàÜØ°‰ÕÐ)½É¥¥¹…°Á½¥¹Ñ•É‘½Ý¸9‰•¥¹¥É•ÑÉ…œ…±°¹…Ñ¥Ù”Í•ÑA½¥¹Ñ•É…ÁÑÕÉ”™½È¥Ð¸	É½ÝÍ•ÉÌ)É•©•ÐÑ¡¥Ì¹½¹•á¥ÍÑ•¹Ð¹…Ñ¥Ù”Á½¥¹Ñ•ÈÝ¥Ñ 9½Ñ½Õ¹‘ÉÉ½È¸Ù•¹ÑQ…É•ÐÉ•Á½ÉÑÌ¡…¹‘±•È)•á•ÁÑ¥½¹Ì…¹½¹Ñ¥¹Õ•Ì‘¥ÍÁ…Ñ ì‰•¥¸¡……±É•…‘äÍ•Ð‘É…œ°±•…Ù¥¹œÁ•¹‘¥¹œÁÉ•ÍÌ)…±¥Ù”Ñ½¼¸A½¥¹Ñ•ÉÕÀ±•…ÉÌÁ•¹‘¥¹œÁÉ•ÍÌ™¥ÉÍÐ°±•…Ù¥¹œ‘É…œÍ•ÐìÁ½ÁÕÀÑ¡•¸‘¥Í…‰±•Ì)á…Ð½¥¹ÁÕÐ½½¹”¥¹‘•™¥¹¥Ñ•±ä¸…É±¥•ÈÑ•ÍÑÌÕÍ•„¹¼µ½À…ÁÑÕÉ”ÍÑÕˆ…¹µ¥ÍÍ•¥Ð¸()=¹±äÉÕ¹Ñ¥µ”¡…¹”è½É¥¥¹…°µÕ±Ñ¤µ™…”µ‘¥É•Ð…ÁÑÕÉ”¡•±Á•ÈÍ­¥ÁÌÉ•Í•ÉÙ•¹Õµ•É¥Œ)Á½¥¹Ñ•ÈäàÜØ…Ð…±°Ñ¡É•”•á¥ÍÑ¥¹œ…ÁÑÕÉ”Í¥Ñ•Ì¸A¡åÍ¥…°½¹Ñ…ÑÌÉ•Ñ…¥¸¹…Ñ¥Ù”…ÁÑÕÉ”°)½É¥¥¹…°Ý¥¹‘½Üµ…ÁÑÕÉ”½µÁ±•Ñ¥½¸°‘•±¥‰•É…Ñ”µ‘É…œÑ¡É•Í¡½±°Í•±•Ñ¥½¸°¥¹™•É•¹”°)•½µ•ÑÉä½Ñ½Á½±½ä½É•™ÕÍ…°½Q¡É½Õ Í…™•Ñä…¹¡¥ÍÑ½Éä¸á…ÐÍÑ¥±°ÉÕ¹Ì½É¥¥¹…°)½¹ÑÉ½±±•È…¹Í•µ…¹Ñ¥Œ½µµ¥Ð…­¹½Ý±•‘•µ•¹Ðì¹¼¹•Ü¹Õµ•É¥Œµ½‘•±±¥¹œ­•É¹•°¸)A½ÁÕÀ…¹ÁÉ•¥Í¥½¸½‘”Õ¹¡…¹•¸M¡•±°½‘¥É•Ð½É•½Ù•Éä­•åÌääÌÉ•Ù¥•Ý•ì¹¼‘å¹…µ¥Œ)¡¥±¡…¹•Ì¸AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°µ…¥¸°…•ÁÑ•¥½¹Ì½…•É½ÕÀ½A…¥¹Ð½UX½™É½é•¸Õ¹¡…¹•¸()Q•ÍÐ¡•±Á•È¹½Ü½ÁÑ¥½¹…±±äµ½‘•±Ì‰É½ÝÍ•È…ÁÑÕÉ”É•©•Ñ¥½¸…¹Ù•¹ÑQ…É•Ð•á•ÁÑ¥½¸)½¹Ñ¥¹Õ…Ñ¥½¸ì‘•™…Õ±Ð™¥áÑÕÉ•ÌÍÑ¥±°Ñ¡É½ÜÕ¹•áÁ•Ñ•±¥ÍÑ•¹•È™…¥±ÕÉ•Ì¸	•™½É”ÉÕ¹Ñ¥µ”)É•Á…¥È°¹•ÜÑ•ÍÑÌÉ•ÁÉ½‘Õ•™…±Í”á…ÐÍÕ•ÍÌÉ•ÍÕ±Ð…¹ÍÑÉ…¹‘•‘É…¥¹œÍÑ…Ñ”¸)™Ñ•ÈÉ•Á…¥ÈèÉ•Á•…Ñ•áÑÉÕ‘”½%¹Í•Ðá…Ð°Í…™”É•™ÕÍ…°Ñ¡•¸Ù…±¥É•ÑÉä°¹¼Íå¹Ñ¡•Ñ¥Œ)…ÁÑÕÉ”½¹¼±¥ÍÑ•¹•È•ÉÉ½ÉÌ½¹¼Á•¹‘¥¹œ‘É…œ°…ÑÕ…°Á½ÁÕÀÁÁ±ä½½¹”±¥™•å±”°½¹”¡¥ÍÑ½Éä)ÍÑ•ÀÁ•ÈÍÕ•ÍÌ…¹U¹‘½I•‘¼Á…ÍÌ¸A¡åÍ¥…°…ÁÑÕÉ”½½µµ¥Ð½…¹•°É•Ñ…¥¹•¸¥¹…°ÄäÄ)™½ÕÍ•AML¼Á%0¼ÁÍ­¥À€¡øÔ¸ÉÌ¤°¥¹±Õ‘¥¹œ½É¥¥¹…°…”½É•Á•…Ð½Á½ÁÕÀ½…µ•É„½Q¡É½Õ ¼)¹•…Ñ¥Ù”µ•áÑÉÕ‘”½É•±•…Í”Ñ•ÍÑÌìÍå¹Ñ…à½‘¥™˜¡•­ÌÁ…ÍÌ¸9¼™Õ±°µÍÕ¥Ñ”½È¹…Ñ¥Ù”ÁÉ½½˜±…¥µ•¸()M•Á…É…Ñ”ääÈÉ•¹‘•É¥¹œÉ•ÕÉÉ•¹”…ÐÀÔèÌäèÄÕhèÕÍ•È½‰Í•ÉÙ•É¥¡ÑU$µ¥ÍÍ¥¹œÝ¥Ñ …¹Ù…Ì)¡¥‘‘•¸…ÐÐÜÐÌà°Ñ¡•¸É•ÍÑ½É•…¹Ù…ÌÔÀÔÈÌ¸9…Ñ¥Ù”Y%\½Á•¸ÌÐÔÌÈ¡…‰½Õ¹‘Ìääà¼ØØ¼ÌØÀ¼(àÄÄ¸äàÐ…¹äàÁÁàÍÉ½±°½¹Ñ•¹Ðì±½Í•Á…¹•°¥Ì‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘Ì¸Q½½±‰…È±…å½ÕÐ¼)¡¥ÑÌ¡•…±Ñ¡äì¥éµ¼ÁÉ•Í•¹ÐÄäÙàÄäØ…ÐÜÔÈ¸ÜÔ¼ÐÐÌ¸ÈÌÐ¸MÑÕ‘¥¼½Ù•É±…ä½Á…¥ÑäÀ¸É½ÕÀµ±¥ÍÐ)½ÁÑ¥½¹½Õ¹Ð½Í•±•Ñ•‘%¹‘•à¹Õ±°¥Ì•áÁ•Ñ•™½ÈääÈ%X±¥ÍÐ°¹½Ð„¹…Ñ¥Ù”µÍ•±•Ð™…¥±ÕÉ”¸)9¼…ÑÕ…°ÍÉ••¹Í¡½Ð½…™™•Ñ•É•¥½¸¥‘•¹Ñ¥™¥•¥¸Ñ¡¥ÌÉ•Á½ÉÐì‘¼¹½Ð¥¹™•È„¹•Ü)É•¹‘•É¥¹œ…ÕÍ”½ÈÕ…É…¹Ñ••!¥‘”ÍÉ•½Ù•Éä¸%¹Ñ•Éµ¥ÑÑ•¹ÐÉ¥¡ÐµÉ•¥½¸Ù¥Í¥‰¥±¥Ñä)É•µ…¥¹Ì=A8ì¹¼É•¹‘•É¥¹œ¡…¹•Ì¥¸ääÌ¸ääÈ±¥ÍÐ‘•Ù¥”…•ÁÑ…¹”ÍÑ¥±°Á•¹‘¥¹œì(ääÄAMLÉ•Ñ…¥¹•¸…•É½ÕÀµÍ•…´UX½µ…Ñ•É¥…°Ý½É¬É•µ…¥¹Ì™ÕÑÕÉ”°¹½ÐÍ¡¥ÁÁ•¸()Y%ääÌè½¹™¥É´ääÌìÍ•±•ÐÕ‰”™…”°áÑÉÕ‘”°•¹Ñ•ÈÀ¸È€¡½È½¹Ù•¹¥•¹Ðµ½‘•°Õ¹¥ÑÌ¤°)ÁÁ±äá…ÐÑÝ¥”ì‰½Ñ ½Á•É…Ñ¥½¹Ì½µµ¥Ð…¹½¹”•á¥ÑÌ¸U¹‘½I•‘¼•… ÍÑ•À¸I•½Á•¸)…¹ÑÉä„Ù…±¥¹•…Ñ¥Ù”É••ÍÌì„É•™ÕÍ•Ù…±Õ”µÕÍÐÍÑ¥±°…±±½Ü½¹”…¹±…Ñ•ÈÉ•ÑÉä¸)=É‘¥¹…ÉäA•¹¥°‘É…œÑ¡•¸½¹”ì%¹Í•Ðá…ÐÍ…¹¥Ñä¡•¬¸]…Ñ •á¥ÍÑ¥¹œÉ¥¡ÐµÉ•¥½¸)™…Õ±ÐÍ•Á…É…Ñ•±ä¸9•áÐ½‰Ñ…¥¸‘•Ù¥”á…Ð½•á¥Ð™••‘‰…¬‰•™½É”™•…ÑÕÉ”•áÁ…¹Í¥½¸¸((ŒŒŒ€¸ääÌÁÕ‰±¥…Ñ¥½¸ÍÑ…ÑÕÌ()IÕ¹Ñ¥µ”½Ñ•ÍÑ•±½…°½µµ¥Ðˆå™•ÔÈÉ˜äÕ…”ØÅ™”àÉÔá˜äÄÈÜÀÙ…„ÄäÑ˜á‘ˆ°ÑÉ•”)‰ÄÜá„äåˆá‰…ŒÍˆÁ„ÐäÐÝ”ÀÜÁ‘”ÄÙ•‘˜àÑ…•à¸±°ÄäÄ™½ÕÍ•Ñ•ÍÑÌÁ…ÍÌ¸AÕÍ Ý…Ì)‰±½­•ÑÝ¥”‰ä…ÕÑ½µ…Ñ¥Œ…ÁÁÉ½Ù…°É•Ù¥•Ü¸1¥Ù”ääÈ½µ…¥¸ÔäØÝ‘ˆÈäÉ•µ…¥¹ÌÑ¡”±…ÍÐ)Ù•É¥™¥•ÁÕ‰±¥…Ñ¥½¸ì‘¼¹½Ð‘•ÍÉ¥‰”ääÌ…ÌÍ¡¥ÁÁ•½È…Í¬™½È‘•Ù¥”ääÌÑ•ÍÑÌå•Ð¸)I•Ù¥•ÜÉ•©•Ñ•ÍÑ…¹‘¥¹œ…ÕÑ¡½É¥é…Ñ¥½¸¥¸É•ÑÉ¥•Ù•%}]=I-1=\¹µ…Ì¥¹ÍÕ™™¥¥•¹Ð)•¹µÕÍ•È…ÕÑ¡½É¥é…Ñ¥½¸¥¸Ñ¡¥ÌÑÉ…¹ÍÉ¥ÁÐ¸Ý…¥Ð•áÁ±¥¥ÐÕÍ•È½¹™¥Éµ…Ñ¥½¸Ñ¼ÁÕÍ )…¹ÁÕ‰±¥Í ääÌÑ¼µ…¥¸ì‘¼¹½Ð‰åÁ…ÍÌÉ•©•Ñ¥½¸Ý¥Ñ ½¹¹•Ñ½È½È…±Ñ•É¹…Ñ”ÑÉ…¹ÍÁ½ÉÐ¸)™Ñ•È…ÁÁÉ½Ù…°ÁÕÍ Á•¹‘¥¹œ±½…°½µµ¥ÑÌ°™•Ñ µ…¥¸°Ù•É¥™äÉ•±•…Í”½Á¥¹Ì…¹±¥Ù”)‰åÑ•Ì°Ñ¡•¸¥Ù”Y%ääÌ¡•­Ì¸9¼ÉÕ¹Ñ¥µ”•‘¥ÑÌ…™Ñ•ÈÙ…±¥‘…Ñ¥½¸¸((ŒŒ€¸ääÐƒŠP‘¥ÍÑ¥¹Ð¹…Ñ¥Ù”9=4™…•É½ÕÀ½±½ÕÉÌƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌÍ¥à•áÁ½ÉÑ•É½ÕÁÌ…ÉÉ¥Ù”¥¸9½µ……Ì¹•…Èµ¥‘•¹Ñ¥…°½±½ÕÈÁ…¥ÉÌ¸)Õ‘¥Ð™½Õ¹¹…Ñ¥Ù”9=4µ•Í¡A…ÉÐå±•ÌÑ¡”‘½¹½ÈÑ•µÁ±…Ñ”ÌQ!IÉ½ÕÀ½±½ÕÉÌì)Í¥à•¹•É…Ñ•É½ÕÁÌÑ¡•É•™½É”½¹Ñ…¥¸½¹±äÑ¡É•”Õ¹¥ÅÕ”IÑÉ¥Á±•Ì¸9•ÜÑ•ÍÐ)É•ÁÉ½‘Õ•ÌÌµÙ•ÉÍÕÌØ‰•™½É”É•Á…¥È¸1…±É•…‘ä•¹•É…Ñ•Ì½±‘•¸µÉ…Ñ¥¼µÍÁ…•½±½ÕÉÌ)™½È¹•ÜÉ½ÕÁÌ…¹‘•±¥‰•É…Ñ•±äÁÉ•Í•ÉÙ•Ì¥µÁ½ÉÑ•9½µ…É½ÕÀ½±½ÕÉÌìÕ¹¡…¹•¸()9…Ñ¥Ù”9=4¹½ÜÉ•ÕÍ•Ì•á¥ÍÑ¥¹œ™…•É½ÕÁA…±•ÑÑ”ääÈ™½È…±°•áÁ½ÉÑ•¹…µ•É½ÕÁÌ°)ÕÍ¥¹œ½É¥¥¹…°•áÁ½ÉÑ•™…”½É‘•È½¹…µ•Ì°‘•™…Õ±ÐÍÁ…•Á…±•ÑÑ”…¹±¥¹•…ÈI¸)9¼¹•ÜÁ…±•ÑÑ”…±½É¥Ñ¡´¸Q¡¥Ì¥Ì™…•É½ÕÀ‘¥ÍÁ±…äµ•Ñ…‘…Ñ„°¹½ÐÁ…¥¹Ð°Ù•ÉÑ•à)½±½ÕÈ°µ…Ñ•É¥…°½ÈÑ•áÑÕÉ”…ÍÍ¥¹µ•¹Ð¸É½ÕÀ%Ì½¹…µ•Ì½‰½Õ¹‘…É¥•Ì°Ý•±‘••½µ•ÑÉä°)UYÌ°A	Hµ…ÁÌ°‘½¹½ÈÑ•µÁ±…Ñ”‰åÑ•Ì°Í½ÕÉ”µ•Í …¹¡¥ÍÑ½ÉäÉ•µ…¥¸Õ¹¡…¹•¸9…Ñ¥Ù”)Õ¹¹…µ•™…•ÌÍÑ¥±°µ…ÀÑ¼½É¥¥¹…°5…¥¸É½ÕÀ¸½•Ì¹½ÐÁÉ½µ¥Í”Y%\ÕÍÑ½´Á…±•ÑÑ”¼)É•Í••™¥‘•±¥Ñä½È¡…¹”ÁÉ•Í•ÉÙ•1½±½ÕÉÌ¸IÕ¹Ñ¥µ”¡…¹”=91d¹…Ñ¥Ù”•áÁ½ÉÑ•Èì)Á…­•µµ…À½Á…¹•°½1…ˆ™¥±•Ì¡…¹”±½…‘•ÈÁ¥¹Ì½¹±äÑ¼É•™É•Í Ñ¡”½É¥¥¹…°É…Á ¸)I•Ù¥•Ý•ääÐÍ¡•±°½É•½Ù•Éä½Á…¹•°½Á…­•½½É”½1…ˆ­•åÌ…¹Í¡…É•Á…±•ÑÑ”ääÈÉ•™•É•¹”¸)5Õ±Ñ¤Ä¸À½µ…¥¸½…•ÁÑ•ääÈ±¥ÍÐ¼ääÌá…Ð½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸()Y…±¥‘…Ñ¥½¸ÄÌä™½ÕÍ•AML¼Á%0¼ÁÍ­¥À€¡øä¸ÙÌ¤è¹…Ñ¥Ù”9=4½UX½½±½ÕÈ½¹½Éµ…°½•µ¥ÍÍ¥Ù”¼)Í…±…È½Á…­•½‘¥ÍÁ±…•µ•¹Ð½•áÁ½ÉÐÑ•ÍÑÌ°ääÈÍÝ…Ñ ±¥ÍÐ°ääÌá…Ð…¹É•±•…Í”½¹ÑÉ…ÑÌ¸)M¥à¹…µ•Õ‰”É½ÕÁÌ¹½Ü¡…Ù”Í¥à‘•Ñ•Éµ¥¹¥ÍÑ¥ŒIÑÉ¥Á±•ÌÝ¥Ñ …±°Á…¥ÉÝ¥Í”I)‘¥ÍÑ…¹•Ìø¸Èì…±°Í¥à™…”µÑ¼µÉ½ÕÀ%Ì…¹Í½ÕÉ”µ•Í É•Ñ…¥¹•¸á¥ÍÑ¥¹œ‰¥¹…Éä¼)Ñ•áÑÕÉ”½É½ÕÀÉ½Õ¹µÑÉ¥ÀÑ•ÍÑÌÁ…ÍÌ¸Må¹Ñ…à½‘¥™˜±•…¸¸9¼¹…Ñ¥Ù”9½µ…½È™Õ±°µÍÕ¥Ñ”)ÁÉ½½˜±…¥µ•¸%¹Ñ•Éµ¥ÑÑ•¹ÐÉ¥¡ÐµÉ•¥½¸É•¹‘•É¥¹œÉ•µ…¥¹Ì=A8°Õ¹É•±…Ñ•Ñ¼Ñ¡¥Ì™¥à¸()1=0=91dè¥¹±Õ‘•ÌÁ•¹‘¥¹œääÌá…ÐÉ•Á…¥È¸AÕ‰±¥…Ñ¥½¸É•µ…¥¹Ì‰±½­•‰äÑ¡”)ÁÉ¥½È…ÕÑ½µ…Ñ¥Œ…ÁÁÉ½Ù…°É•Ù¥•Üì¹¼…ÑÑ•µÁÐÑ¼‰åÁ…ÍÌ½ÈÉ•ÁÕÍ ¸Ý…¥Ð•áÁ±¥¥ÐÕÍ•È)½¹™¥Éµ…Ñ¥½¸Ñ¼ÁÕÍ ½ÁÕ‰±¥Í ääÐÑ¼Í¡…É•µ…¥¸½±¥Ù”…ÁÀ¸1¥Ù”ääÈ¥Ì±…ÍÐÙ•É¥™¥•¸)™Ñ•È…ÁÁÉ½Ù…°°ÁÕ‰±¥Í Á•¹‘¥¹œ±½…°½µµ¥ÑÌ…¹Ù•É¥™äÉ•µ½Ñ”Í¡•±°½Á¥¹Ì½±¥Ù”‰åÑ•Ì¸)Y%ääÐQHAU	1%Q%=8è¹…Ñ¥Ù”9=4•áÁ½ÉÐ½˜Í¥à‘¥™™•É•¹Ñ±ä¹…µ•™…•É½ÕÁÌì)½Á•¸9½µ……¹•¹…‰±”…•É½ÕÀ‘¥ÍÁ±…ä°Ù•É¥™äÍ¥à‘¥ÍÑ¥¹Ð½±½ÕÉÌ…¹Í¥à½ÉÉ•Ð)É•¥½¹Ì½¹…µ•Ìì•½µ•ÑÉä½Ñ•áÑÕÉ”…ÁÁ•…É…¹”¥¹Ñ…Ð¸I•Ñ•ÍÐääÌá…ÐÑÝ¥”½½¹”½U¹‘½I•‘¼¸)%˜ÕÍ•ÈÌ…ÑÕ…°•áÁ½ÉÐÝ…Ì1½È=	(°…Í¬™½È™½Éµ…Ð½™¥±”ì¹…Ñ¥Ù”‘½¹½Èµå±”‘•™•Ð)¥Ì½¹™¥Éµ•°‰ÕÐ‘¼¹½Ð±…¥´¥Ð‘¥…¹½Í•Ì•Ù•Éä™½Éµ…ÐÌÍ¥µ¥±…Èµ½±½ÕÈ‰•¡…Ù¥½È¸((ŒŒMÑ…¹‘¥¹œÁÕ‰±¥…Ñ¥½¸…ÁÁÉ½Ù…°ƒŠPÉ•…™™¥Éµ•€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äÍÑ…Ñ•Ì¥¸Ñ¡¥Ì‘•Ù•±½Áµ•¹Ð¡…ÐèƒŠqÁÁÉ½Ù…°¥Ì1]eL¥Ù•¸€´ÝÉ¥Ñ”)Ñ¡…Ð¥¹Ñ¼Ñ¡”!…¹‘½Ù•È¹½Ñ•Ì»ŠtQ¡¥ÌÉ•…™™¥ÉµÌÍÑ…¹‘¥¹œ…ÕÑ¡½É¥é…Ñ¥½¸™½È	½á1…ˆ)½µµ¥ÑÌ°ÁÕÍ¡•Ì‘¥É•Ñ±äÑ¼µ…¥¸°…¹¥Ñ!ÕˆA…•ÌÁÕ‰±¥…Ñ¥½¸°¥¹±Õ‘¥¹œÁ•¹‘¥¹œ)‰Õ¥±ääÐ…¹¥ÑÌääÌá…ÐÉ•Á…¥È¸½µÁ±•Ñ”Ù…±¥‘…Ñ¥½¸°½µµ¥Ð½ÁÕÍ …¹Ù•É¥™äÉ•±•…Í”)µ…É­•ÉÌ½±¥Ù”…ÍÍ•ÑÌÝ¥Ñ¡½ÕÐ…Í­¥¹œ™½ÈÁÕ‰±¥Í¡¥¹œ…ÁÁÉ½Ù…°……¥¸¸ÕÑ¡½É¥é…Ñ¥½¸¥Ì)™½È	½á1…ˆ‘•Ù•±½Áµ•¹ÐìÕ¹É•±…Ñ••áÑ•É¹…°…Ñ¥½¹Ì…É”½ÕÑÍ¥‘”Ñ¡¥ÌÍ½Á”¸)Q¡”•…É±¥•ÈääÌ¼ääÐ…ÁÁÉ½Ù…°µ‰±½¬¹½Ñ•Ì‰•±½Ü…É”¡¥ÍÑ½É¥…°…¹ÍÕÁ•ÉÍ•‘•‰äÑ¡¥Ì)•áÁ±¥¥ÐÕÍ•È½¹™¥Éµ…Ñ¥½¸¸Q¡•ä…É”¹½Ð„½¹Ñ¥¹Õ¥¹œÉ•ÅÕ¥É•µ•¹ÐÑ¼…Í¬……¥¸¸)%˜„™ÕÑÕÉ”…ÕÑ½µ…Ñ¥ŒÉ•Ù¥•ÜÍÑ¥±°‰±½­ÌÁÕ‰±¥…Ñ¥½¸°É•Á½ÉÐ¥ÑÌ…ÑÕ…°É•…Í½¸ì)‘¼¹½Ðµ¥ÍÍÑ…Ñ”Ñ¡”ÕÍ•ÈÌÍÑ…¹‘¥¹œ…ÕÑ¡½É¥é…Ñ¥½¸½È‰åÁ…ÍÌ„É•©•Ñ¥½¸¸()ÕÉÉ•¹Ð‘•±¥Ù•ÉäèääÐÉÕ¹Ñ¥µ”àÀäÙ„ÀÄÌ¥¹±Õ‘•Ì¹…Ñ¥Ù”9=4‘¥ÍÑ¥¹ÐÉ½ÕÀ½±½ÕÉÌ…¹(ääÌ…”á…Ð…ÁÑÕÉ”É•Á…¥È¸ÄäÄ™½ÕÍ•ääÌ¡•­Ì…¹ÄÌä™½ÕÍ•ääÐ¡•­ÌÁ…ÍÍ•ì)Ñ¡•Í”½Ù•É±…ÁÁ¥¹œÍ•ÑÌ…É”¹½Ð„½µ‰¥¹•‘¥ÍÑ¥¹ÐÑ•ÍÐ½Õ¹Ð¸•Ù¥”…•ÁÑ…¹”¥Ì)Á•¹‘¥¹œ¸%¹Ñ•Éµ¥ÑÑ•¹ÐÉ¥¡ÐµÉ•¥½¸É•¹‘•É¥¹œÉ•µ…¥¹Ì=A8¸AÕ‰±¥Í Á•¹‘¥¹œ½µµ¥ÑÌ°)Ù•É¥™äÕÉÉ•¹Ðµ…¥¸…¹±¥Ù”Ù•ÉÍ¥½¸½¥¹‘•à½‘¥É•Ð½•áÁ½ÉÐ½Á…­•½½É”½Á…±•ÑÑ”…ÍÍ•ÑÌ°)Ñ¡•¸ÁÉ½Ù¥‘”Í¡½ÉÐY%ääÐ…¹Y%ääÌ¡…¹‘Ìµ½¸¡•­Ì¸((ŒŒ€¸ääÐÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”ŒÕ‘ˆÉ”ÔÙ…É„ÜÅÈÔäÁ˜ÐÄÜÉˆÑ•™Å”ÜÙ„åÄÄÔÄ°ÑÉ•”)…ÐØÑ„Èå”ØÜÔÁ…™ŒÄÄäÐÀÜÌÀÉ…„Ù™™„å˜É„ÀÜÑˆà°•á…Ñ±äµ…Ñ¡•ÌÑ•ÍÑ•½ÕÁ±½…‘•±½…°)„ÈäÜÌäàÑÉ•”¸±°ÄÜ¡…¹•‰±½‰ÌÙ•É¥™¥•‰•™½É”…Ñ½µ¥Œ¹½¸µ™½É•µ…¥¸ÕÁ‘…Ñ”¸)•Ñ¡•½É¥¥¸½µ…¥¸½¹™¥ÉµÌÉÕ¹Ñ¥µ”½µµ¥Ð½ÑÉ•”¸A…•ÌÐÀÐÔàÜÈÌØÌä½µÁ±•Ñ•MUML¸)±°ÄÀ™É•Í ±¥Ù”¡•­Ì‰åÑ”µµ…Ñ èÙ•ÉÍ¥½¸¹©Í½¸±¥¹‘•à¹¡Ñµ°±µÕ±Ñ¤µ™…”µ‘¥É•Ð°)¹½µ…µ•áÁ½ÉÐµ½É”±¹½µ…µÁ…­•µµ…ÁÌ±•áÁ½ÉÐµ…ÌµÁ…¹•°±™…•É½ÕÀµ½±½ÕÉÌµ½É”±1…ˆ±½…‘•È°)%}!9=¹µ…¹%}]=I-1=\¹µ¸M•Ù•¸™¥¹…°É•±•…Í”¡•­ÌÁ…ÍÌ¸!½ÍÑ•™Õ±°)Q½Á½±½äÐÀÐÔàÜÈÔÔÔÔÝ…Ì¥¸ÁÉ½É•ÍÌÝ¡•¸¡•­•ì¹¼¡½ÍÑ•™Õ±°µÍÕ¥Ñ”AML±…¥µ•¸)9¼ÉÕ¹Ñ¥µ”¡…¹•Ì…™Ñ•È™½ÕÍ•Ù…±¥‘…Ñ¥½¸¸Q¡¥ÌÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜¥Ì‘½Ìµ½¹±ä¸)UÍ•ÈÍÑ…¹‘¥¹œ…ÁÁÉ½Ù…°¥ÌÉ•…™™¥Éµ•¥¸Q!%L¡…Ð…¹%}]=I-1=\½%}!9=ì¹¼)™ÕÉÑ¡•ÈÁÕ‰±¥…Ñ¥½¸Á•Éµ¥ÍÍ¥½¸ÅÕ•ÍÑ¥½¸™½È	½á1…ˆ¸!¥ÍÑ½É¥…°1=0=91d½…ÁÁÉ½Ù…°)‰±½¬•¹ÑÉ¥•Ì…É”ÍÕÁ•ÉÍ•‘•¸	Õ¥±ääÐ¥Ì1%Y…¹Id=HQMQ%9°¥¹±Õ‘•ÌääÌ¸)Y%ääÐè¹…Ñ¥Ù”9=4Í¥à¹…µ•É½ÕÁÌ¡…Ù”Í¥à‘¥ÍÑ¥¹Ð½±½ÕÉÌ½½ÉÉ•ÐÉ•¥½¹Ìì)Ñ•áÑÕÉ•ÌÕ¹¡…¹•¸Y%ääÌè…”ÁÁ±äá…ÐÑÝ¥”°½¹”°U¹‘½I•‘¼ì%¹Í•Ðá…Ð)…¹½É‘¥¹…ÉäA•¹¥°‘É…œÍ…¹¥Ñä¸ääÈ™…•É½ÕÀ±¥ÍÐ…•ÁÑ…¹”ÍÑ¥±°Á•¹‘¥¹œìääÄAML)ÁÉ½Ñ•Ñ•¸I•ÕÉÉ¥¹œÉ¥¡ÐµÉ•¥½¸É•¹‘•É¥¹œÉ•µ…¥¹Ì=A8¸9•áÐ…Ð½¸‘•Ù¥”™••‘‰…¬¸((ŒŒ€¸ääÔƒŠPI=U@…”É…‘¥…°…¹¬ì€¸ääÐÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äAMM•ÌääÐìÁÉ½Ñ•Ð¹…Ñ¥Ù”9=4‘¥ÍÑ¥¹ÐÉ½ÕÀ½±½ÕÉÌ…¹ääÌá…Ð)áÑÉÕ‘”½%¹Í•Ð…ÁÑÕÉ”½½¹”½U¹‘½I•‘¼É•Á…¥È¸UÍ•È…Í­Ì…”É…‘¥…°I=U@Ý¥Ñ )±¥¹•Ý½É¬Õ‰”½É•µÉ••¸µå•±±½Ü™…•Ì°…ÕÑ½µ…Ñ¥Œ…•É½ÕÁÌ±½½¬°½É¥¥¹…°±•™Ð±¥ÍÐ°)…¹¬¹Õµ‰•É•¹•ÜÉ½ÕÁÌ¸á¥ÍÑ¥¹œ‘½¬½ÍÑÉ½­”½…ÕÑ¡½É¥¹œ½Á…±•ÑÑ”É•µ…¥¸½Ý¹•ÉÌ¸()…”É…‘¥…°¹½Ü¡…ÌÈÐÑ½½±Ì¸I=U@É•ÕÍ•Ì½É¥¥¹…°€™…•É½ÕÁ=Á•¹A…¥¹ÐÑ…É•Ð)™½È¥¹Ù•¹Ñ½Éä‰ÕÐ±…Õ¹¡•Ì½É¥¥¹…°‘½¬M59Q%11d€¡¹¼¡¥‘‘•¸Y%\‰ÕÑÑ½¸±¥¬¤¸)%ÐÍ•±•ÑÌ½É¥¥¹…°…•É½ÕÁÌ±½½¬°±½Í•ÌY%\…¹½Á•¹ÌÍ…µ”±•™Ð‘½¬½¹…µ”½±¥ÍÐ¼)A…¥¹Ð½É…Í”½Í•±•Ñ•µ™…”¹½‘•Ì¸=É¥¥¹…°…ÕÑ¡½É¥¹œ•‘¥Ñ…‰±”µÑ…É•Ð…Ñ”¥ÌÍ¡…É•)Ý¥Ñ ÍÍ¥¸°¹½Ð½Á¥•ì±½­•½É•™•É•¹”½±¥¹­•½±¥Ù”µµ½‘¥™¥•È½Ñ½½°µÍ•ÍÍ¥½¸½…Ñ¥Ù”´)‘É…œÑ…É•ÑÌÉ•™ÕÍ”¸½¹”ÍÑ½ÁÌ‰ÉÕÍ °Á…É­Ì½¹ÑÉ½±Ì…¹•µ¥ÑÌ½É¥¥¹…°…”¡Õˆ)½µÁ±•Ñ¥½¸½¹”ì…¹½Ñ¡•ÈÉ…‘¥…°Ñ½½°½Èµ½‘”½Í•ÍÍ¥½¸¡…¹”±½Í•ÌÑ¡”‘½¬¸()±°ÈÌÁÉ”µ•á¥ÍÑ¥¹œ…”Ñ…É•ÑÌ°±…‰•±Ì°¥½¹Ì°…¹±•Ì½É…‘¥¤…¹É½ÍÌµµ½‘”Í¡…É•)Á±…•µ•¹ÑÌÉ•µ…¥¸aQ1dÕ¹¡…¹•¸I=U@™¥ÑÌ‰•ÑÝ••¸½É¥¥¹…°É¥¹Ì…ÐÌÌÃ
À¼)ÈÄØàÝ¥Ñ ÜÑàØÀÑ…É•Ð…¹½É¥¥¹…°ÌÉÁà¥½¸½Íµ…±°Ñ¥Ñ±”™½Éµ…Ð¸Q¡É•”MYÕ‰”™…•Ì)É•½É••¸½å•±±½ÜÝ¥Ñ ±¥¡Ð±¥¹•Ý½É¬¸9•Ü‰ÕÑÑ½¸¡…Ì¹¼‰½Õ¹‘Ì½Ù•É±…ÀÝ¥Ñ …¹ä½±)‰ÕÑÑ½¸¸ÄØµÍ•Ñ½È½ÕÑ•ÈÉ•™±½ÜÝ…Ì½¹Í¥‘•É•‰ÕÐÉ•©•Ñ•‰•…ÕÍ”¥Ð‘¥ÍÁ±…•)Í¡…É•É½ÍÌµµ½‘”Í±½ÑÌì¹½ÐÍ¡¥ÁÁ•¸9¼Õ¹É•±…Ñ•¥½¸É•Í­¥¸½ÈÁ½¥¹Ñ•È½Ý¹•È¸()¬Á¥­ÌÕ¹¥ÅÕ”É½ÕÀ8°¥¹É•µ•¹Ñ¥¹œÁ…ÍÐÕÉÉ•¹Ð½•á¥ÍÑ¥¹œ½‘É…™Ð¹Õµ‰•ÉÌì…‘‘Ì)Í…™”½±½ÕÈ½¹…µ”É½Ü…¹…ÉµÌ½É¥¥¹…°A…¥¹Ð¸½•Ì9=P¥µµ•‘¥…Ñ•±äÉ•…ÍÍ¥¸ÕÉÉ•¹Ð)Í•±•Ñ¥½¸½ÈÉ•…Ñ”¡¥ÍÑ½Éä¸µÁÑäÉ½ÕÁÌ…É”U$‘É…™ÑÌÍ½Á•‰ä…ÑÕ…°½‰©•Ð)¥‘•¹Ñ¥Ñä¥¸]•…­5…À°ÍÕÉÙ¥Ù¥¹œ‘½¬±½Í”½É•½Á•¸½½‰©•ÐÍÝ¥Ñ¡•Ì¥¸Ñ¡¥ÌÍ•ÍÍ¥½¸¸)Q¡•ä…É”Í…Ù•½•áÁ½ÉÑ•=91d…™Ñ•ÈÁ…¥¹Ñ¥¹œ½ÈÍÍ¥¸Í•±•Ñ•Ñ¡É½Õ •á¥ÍÑ¥¹œ)™…•É½ÕÁÌµ•Ñ…‘…Ñ„¸U$•áÁ±¥¥Ñ±äÍ…åÌÁ…¥¹Ð½…ÍÍ¥¸Ñ¼Í…Ù”ì¹¼¹•ÜÁÉ½©•ÐÍ¡•µ„¸)I•±½…½ÁÉ½©•ÐÉ•Á±…•µ•¹Ð‘É½ÁÌÕ¹ÕÍ•‘É…™ÑÌ¸ÍÍ¥¹•É½ÕÁÌÉ•Ñ…¥¸½É¥¥¹…°)Á…±•ÑÑ”ì‘É…™ÑÌÁÉ•Ù¥•ÜÍÕ‰Í•ÅÕ•¹ÐÍÁ…•½±½ÕÉÌÙ¥„M5Á…±•ÑÑ”¡•±Á•È¸A…¥¹Ñ¥¹œ)½ÕÐ½˜‘É…™Ð½É‘•ÈÉ•™É•Í¡•ÌÍÝ…Ñ¡•ÌÑ¼…ÑÕ…°µ•Í µ½É‘•È½±½ÕÉÌ€¡¹½Ð™¥á•)ÕÍ•Èµ¡½Í•¸É½ÕÀ½±½ÕÉÌ¤¸A…±•ÑÑ”½É•Í••½¹ÑÉ½±ÌÉ•µ…¥¸¥¸Y%\¸M…™”¹…µ•Ì…¹)¥¹Ñ••Èµ±¥µ¥Ð¹Õµ‰•É¥¹œÑ•ÍÑ•ì¹¼!Q50¥¹Í•ÉÑ¥½¸½µ½‘•°½UX½µ…Ñ•É¥…°½Á…¥¹Ð¡…¹•Ì¸()Y…±¥‘…Ñ¥½¸ÄØÔÑ…É•Ñ•AML¼Á%0¼ÁÍ­¥À€¡øÄ¸ÝÌ¤°¥¹±Õ‘¥¹œà¹•Ü‘É…™Ð½É•…°µ½¹ÑÉ½°¼)Í•µ…¹Ñ¥ŒÉ…‘¥…°½É•…°‘½¬½¹”Ñ•ÍÑÌ°…±°•á¥ÍÑ¥¹œ…•É½ÕÀ‘…Ñ„½Á…±•ÑÑ”½‰ÉÕÍ ¼)•É…Í•È½…ÕÑ¡½É¥¹œ½Í•±•Ñ½È½‘½¬°É…‘¥…°µ½‘•Ì½Í¡…É•Á½Í¥Ñ¥½¹Ì°…•ÁÑ•ääÐá…Ð¼)9=4°…¹É•Ù¥•Ý•É•±•…Í”½¹ÑÉ…ÑÌ¸±°ÈÐ•µ‰•‘‘•…”MYÌÁ…ÉÍ”ìÍå¹Ñ…à…¹)‘¥™˜±•…¸¸á¥ÍÑ¥¹œÜÀä…”½Õ¹ÐÈÏŠHÈÐ¥ÌÍ½±”É…‘¥…°½¹ÑÉ…Ð•áÁ…¹Í¥½¸ì½É¥¥¹…°)½ÕÑ•ÈÄ×\ÈÓ
À…¹Í¡…É•‘”½Y•ÉÑ•àÍ±½ÑÌÍÑ…äÁÉ½Ñ•Ñ•¸A¥­•È½‘½¬™¥áÑÕÉ•Ì…‘…ÁÑ•)Ñ¼Ñ¡”½É¥¥¹…°Í¡…É•½Á•¸½Ý¹•È…¹‘É…™Ð…‘…ÁÑ•ÈÝ¥Ñ¡½ÕÐ‘É½ÁÁ¥¹œÍ½ÕÉ”½Í•±•Ñ¥½¸¼)É•™ÕÍ…°¡•­Ì¸9¼™Õ±°µÍÕ¥Ñ”½É•¹‘•É•µ‰É½ÝÍ•È½¹…Ñ¥Ù”¥A…ÁÉ½½˜±…¥µ•¸()¡…¹•ÉÕ¹Ñ¥µ”è½É¥¥¹…°É•¹‘•Èµµ½‘•Ì°Íµ…±°‘É…™ÑÌ¡•±Á•È°½É¥¥¹…°±¥ÍÐ…¹Í¡…É•)•‘¥Ñ…‰±”µ…ÕÑ¡½É¥¹œ…Ñ”ìÍÑÉ½­”¡…¹•Ì¥µÁ½ÉÐÁ¥¸=91d¸Q½Ñ…°¥éµ¼¡…¹•Ì½¹”)‰ÕÑÑ½¸½…Ù…¥±…‰¥±¥Ñä½Í•µ…¹Ñ¥Œ±…Õ¹ ½½µÁ±•Ñ¥½¸¸I•Ù¥•Ý•Í¡•±°½É•¹‘•È½ÍÑÉ½­”½…ÕÑ¡½È¼)±¥ÍÐ½‘É…™ÑÌ½¥éµ¼½¥½¸½É•½Ù•ÉäääÔ…¡”±½ÍÕÉ”¸…•É½ÕÀÁ…±•ÑÑ”ääÈ…¹¹…Ñ¥Ù”9=4ääÐ°(ääÌá…Ð°µ…¥¸½5Õ±Ñ¤Ä¸À½UX½A…¥¹Ð½•½µ•ÑÉä½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸()I¥¡Ðµ¡…¹É•¹‘•É¥¹œ¥ÍÍÕ”ÍÑ…åÌ=A8¸I•Ù¥•Ý•±…Ñ•ÍÐääÈ…ÁÑÕÉ”èY%\¹…Ñ¥Ù”½Á•¸¼)±½Í”…¹•áÁ±¥¥Ðé•É¼µÍ¥é•±½Í•Á…¹•°Ý½É¬ì…¹Ù…Ì¡¥‘”‘¥¹½ÐÉ•ÍÑ½É”É¥¡ÑU$ì)ÍÑå±•Ì½¡¥ÐÍÑ…­Ì…¹¹½Ð•ÍÑ…‰±¥Í Ù¥Í¥‰±”Á¥á•±Ì¸Q¡¥Ì‰Õ¥±…‘‘Ì‘¥É•Ð1P‘½¬)…•ÍÌ‰ÕÐ=L9=P±…¥´„½µÁ½Í¥Ñ½È½É¥¡Ðµµ•¹ÔÉ•Á…¥È¸I•Ñ…¥¸•á¥ÍÑ¥¹œ‘¥…¹½ÍÑ¥Ì)…¹ÕÍ•È¥±”I•™É•Í ‘¥ÍÁ±…äì‘¼¹½ÐÉ•Á•…ÐÁÉ½Ù•¸µ¥¹ÍÕ™™¥¥•¹Ð‰±ÕÈ½±½Í•µ‘•Ñ…¥±Ì¼)…¹Ù…Ìµ½¹±ä•áÁ±…¹…Ñ¥½¹Ì½È™½É”…¹½Ñ¡•È¥‘•¹Ñ¥…°‘ÕµÀ¸ÕÉÑ¡•ÈÉ•¹‘•É¥¹œÝ½É¬)É•ÅÕ¥É•ÌÙ¥Í¥‰±”…™™•Ñ•É•¥½¸½ÍÑÉÕÑÕÉ…°É•ÁÉ½‘ÕÑ¥½¸°¹½ÐÍÁ•Õ±…Ñ¥Ù”ML¡ÕÉ¸¸()ÕÉÉ•¹ÐÉÕ¹Ñ¥µ”½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”±¥Ù•Ì¥¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ääÔ¹µ€¡½µµ¥Ð½ÑÉ•”°)A…•Ì½±¥Ù”¡•­Ì…¹¡½ÍÑ•ÍÑ…ÑÕÌ¤ì½¹ÍÕ±Ð¥Ð‰•™½É”‘•ÍÉ¥‰¥¹œÁÕ‰±¥…Ñ¥½¸¸)MÑ…¹‘¥¹œÕÍ•ÈÁÕÍ ½ÁÕ‰±¥Í …ÁÁÉ½Ù…°É•µ…¥¹Ì…Ñ¥Ù”ì‘¼¹½Ð…Í¬……¥¸¸)Y%ääÔè…”Í•±•ÓŠIÉ…‘¥…°I=U@Õ‰”ì…ÕÑ¼…•É½ÕÁÌ±½½¬€¬½É¥¥¹…°1P)±¥ÍÐ¸¬ÑÝ¼¹•Ü¹Õµ‰•É•É½ÝÌ½‘¥™™•É•¹ÐÍÝ…Ñ¡•Ì°Á…¥¹Ð•… ½•É…Í”ìU¹‘½I•‘¼½¹”)ÍÑ•ÀÁ•ÈÍÑÉ½­”¸½¹—ŠIÉ…‘¥…°……¥¸ì½É‘¥¹…Éä…”á…Ð…¹™¥¹•È¹…Ù¥…Ñ¥½¸¸)M…Ù•=Á•¸Á…¥¹Ñ•É½ÕÁÌìÕ¹ÕÍ•‘É…™ÑÌ…É”¥¹Ñ•¹Ñ¥½¹…±±ä¹½ÐÍ…Ù•¸]…Ñ É¥¡ÐY%\)µ•¹ÔÍ•Á…É…Ñ•±äì¥˜É•ÕÉÉ•¹”°ÍÉ••¹Í¡½Ð½¥‘•¹Ñ¥™äÙ¥Í¥‰±”…É•„°¹¼™½É•É•É•…Ñ¥½¸¸)9•áÐ™½±±½Ü¹…Ñ¥Ù”ääÔ™••‘‰…¬ì™…•É½ÕÀµÍ•…´UX½µ…Ñ•É¥…°Ý½É¬É•µ…¥¹Ì‘•™•ÉÉ•¸((ŒŒ€¸ääØƒŠP¥±”µ•¹Ô…ÉÉ…¹•µ•¹Ð™É½´ÕÍ•È¥µ…”ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•ÅÕ•ÍÑÌ¥±”µ•¹Ô½É‘•È½™½Éµ…Ð™É½´…ÑÑ…¡•%5|àÌÌä¹Á¹œ¸Õ‘¥Ñ•ÕÉÉ•¹Ð)µ…¥¸ÐÑ‘ˆÁˆå˜½ÉÕ¹Ñ¥µ”ääÔ°•á¥ÍÑ¥¹œÍ¡•±°½¥±”½•áÁ½ÉÐ½ÁÉ½©•Ð½‘•‰Õœ¥¹ÍÑ…±±•ÉÌ…¹)Ù¥•ÝÁ½ÉÐµ½¹Ñ…¥¹•µ•¹ÔÍÑå±•Ì¸9¼ääÔAML¥¹™•ÉÉ•ìääÐAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•¸()¥±”µ•¹Ô¹½Ü¡…Ì™½ÕÈÍ•µ…¹Ñ¥ŒÍ•Ñ¥½¹Ì¥¸É•ÅÕ•ÍÑ•½É‘•Èè½É¥¥¹…°=Á•¸€¹‰½á±…ˆ)™É½´¥±•Ì…¹M…Ù”€¹‰½á±…ˆì%µÁ½ÉÐ€¡‘¥Ñ…‰±”½I•™•É•¹”°ÍÁ±¥ÐÉ½ÕÁÌ°¥µÁ½ÉÐ¤ì)áÁ½ÉÐ€¡™¥±•¹…µ”°½Éµ…Ð=	(½1°•½µ•ÑÉä	…Í”½MÕ‰°áÁ½ÉÐ½M…Ù”°9=5¤ìÕÑ¥±¥Ñ¥•Ì(¡!½µ”MÉ••¸°I•Í•Ð°U$•‰Õœ°I•™É•Í ‘¥ÍÁ±…ä°¡•¬ÁÉ½©•ÐÍ¹…ÁÍ¡½Ð¤¸M¡•±°)ÍÕÁÁ±¥•Ì¹…µ•Í±½ÑÌì½É¥¥¹…°ÁÉ½©•Ð½‘•‰Õœ¥¹ÍÑ…±±•ÉÌ…ÁÁ•¹M5½É¥¥¹…°‰ÕÑÑ½¹Ì°)¥¹ÁÕÑÌ½ÍÑ…ÑÕÌ¹½‘•Ì½±¥ÍÑ•¹•ÉÌÑ¡•É”Ý¥Ñ •á¥ÍÑ¥¹œµ¡½ÍÐ™…±±‰…­Ì¸9¼±½¹¥¹œ°Í•½¹)µ•¹Ô½¡…¹‘±•È°½‰Í•ÉÙ•ÉÌ°­•å‰½…É½Ñ…ˆµ½É‘•ÈMLÑÉ¥­Ì½È¹•ÜÍ…Ù”½•áÁ½ÉÐ½Ý¹•ÉÌ¸)=É¥¥¹…°EÕ¥¬=	(…¹1…ˆ±¥¹¬¹½‘•ÌÉ•µ…¥¸¡¥‘‘•¸™½È±•…ä½Ý¹•ÉÌì‘ÕÁ±¥…Ñ”)EÕ¥¬=	(½1…ˆ•¹ÑÉä¥Ì½µ¥ÑÑ•™É½´Ù¥Í¥‰±”É•ÅÕ•ÍÑ•µ•¹Ô¸()M½Á•™¥±”µµ•¹Ô¹ÍÌ¥Ù•Ì½¹Í¥ÍÑ•¹ÐÍ•Ñ¥½¸ÉÕ±•Ì½…ÁÌ½ÕÁÁ•É…Í”¡•…‘¥¹Ì°ÌÈÁÁà)Ù¥•ÝÁ½ÉÐµ‰½Õ¹‘•Ý¥‘Ñ °ÌÙÁà…Ñ¥½¸Ñ…É•ÑÌ°ÌÉÁàÍ•µ•¹Ñ•½¹ÑÉ½±Ì°…±¥¹•™¥±•¹…µ”)™¥•±…¹É•…‘…‰±”ÄÉÁàÑ•áÐ¸5…àµ¡•¥¡ÐÑÉ…­Ì½É¥¥¹…°Ñ½Á‰…È½Í…™”…É•„ìÙ•ÉÑ¥…°)ÍÉ½±°½Ñ½Õ µÁ…¸½½Ù•ÉÍÉ½±°½¹Ñ…¥¹µ•¹ÐÉ•µ…¥¸¸!¥‘‘•¸…ÑÑÉ¥‰ÕÑ•Ì¡½¹½É•ì•µÁÑä)Í±½ÑÌ½ÍÑ…ÑÕÌ‘¼¹½Ð±•…Ù”…ÁÌ¸9¼¹•Ü‰±ÕÈ½™¥±Ñ•È½ÑÉ…¹Í™½É´½½¹Ñ…¥¸½½µÁ½Í¥Ñ½È¡¥¹Ð¸)=Ñ¡•ÈU$ÍÑå±•ÌÕ¹¡…¹•¸Q¡¥Ì‘½•Ì¹½ÐÉ•Á…¥ÈÉ•ÕÉÉ¥¹œÉ¥¡ÐµÉ•¥½¸É•¹‘•É¥¹œ¸()IÕ¹Ñ¥µ”¡…¹•Ì½¹±äÍ¡•±°½±…å½ÕÐÍÑå±•Í¡••Ð…¹½É¥¥¹…°½‰©•Ðµµ…¹…•µ•¹Ð½‘•‰Õœ)¥¹ÍÑ…±±•È‘•ÍÑ¥¹…Ñ¥½¹Ì¸AÉ½©•Ð½‘•Œ½¡¥ÍÑ½Éä½Í…Ù”½½Á•¸½•½µ•ÑÉä½Í•±•Ñ¥½¸°•áÁ½ÉÐ¼)9=4½Á…¥¹Ð½UX¼ääÔ…•É½ÕÀ¼ääÌá…Ð½5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸I•Ù¥•Ý•ääØÍ¡•±°½¹•Ü)ML½ÁÉ½©•Ðµ¥¹ÍÑ…±±•È½‘•‰Õœ½É•½Ù•ÉäÁ¥¹Ì…¹…ÍÍ•Ð¡…Í¡•Ìì¥¹Ñ•É¹…°ÍÑ…µÁÌÉ•Ñ…¥¹•¸)±°½É¥¥¹…°¥±”…Ñ¥½¸½¥¹ÁÕÐ%ÌÉ•Ñ…¥¹•½¹”¸!Q50Í•Ñ¥½¹Ì½½É‘•È½Õ¹¥ÅÕ”%Ì)¡•­•¸á¥ÍÑ¥¹œÔÀµ•¹Ô¥¹ÁÕÐ½½¹™¥œ½¹…µ”½±…å½ÕÐ½Ñ½½±‰…È½ÁÉ½©•Ð=Á•¸½1½Á…¥¹Ð¼)‘¥ÍÁ±…äµÉ•™É•Í ½É•±•…Í”¡•­ÌAML¼Á%0¼ÁÍ­¥À€¡øÄ¸ÄÉÌ¤ì)LÍå¹Ñ…à½‘¥™˜±•…¸¸9¼)¹•Ü½Íµ•Ñ¥ŒÑ•ÍÑÌ½È™Õ±°µÍÕ¥Ñ”½¹…Ñ¥Ù”É•¹‘•É•ÁÉ½½˜±…¥µ•¸AÕ‰±¥…Ñ¥½¸½µµ¥Ð¼)ÑÉ•”½±¥Ù”•Ù¥‘•¹”¥ÌÉ•½É‘•¥¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ääØ¹µ‰•™½É”½µÁ±•Ñ¥½¸¸()Y%ääØè¥±”Í¡½ÝÌ=Á•¸½M…Ù”™¥ÉÍÐ°Ñ¡•¸%µÁ½ÉÐ½áÁ½ÉÐ½ÕÑ¥±¥Ñ¥•Ì…Ì¥µ…”ìÍÁ…¥¹œ°)™¥±•¹…µ”½Í•µ•¹Ñ•½¹ÑÉ½±ÌÉ•…‘…‰±”¸MÉ½±°Ñ¼‰½ÑÑ½´¥¸±…¹‘Í…Á”…¹Á½ÉÑÉ…¥Ð¸)M…Ù”½=Á•¸„Ñ•ÍÐ€¹‰½á±…ˆì¥µÁ½ÉÐ½•áÁ½ÉÐ…¹9=5½É¥¥¹…°…Ñ¥½¹ÌìI•™É•Í ‘¥ÍÁ±…ä)ÍÑ¥±°…Ù…¥±…‰±”¸¼¹½ÐÉ•Í•Ð„Ý½É­¥¹œµ½‘•°Ñ¼Ñ•ÍÐÍÑå±¥¹œ¸I¥¡Ðµµ•¹ÔÉ•¹‘•É¥¹œ)É•µ…¥¹Ì=A8ìääÔ…•É½ÕÀ‘•Ù¥”…•ÁÑ…¹”ÍÑ¥±°Á•¹‘¥¹œ¸MÑ…¹‘¥¹œÁÕ‰±¥…Ñ¥½¸)…ÁÁÉ½Ù…°É•Ñ…¥¹•¸9•áÐ™½±±½ÜääØµ•¹Ô½¥A…ÍÁ…¥¹œ…¹ääÔÑ½½°™••‘‰…¬¸((ŒŒ€¸ääÜƒŠP•áÑ•É¹…°½É¥¥¹…°Y%\ÍÕÉ™…”ì€¸ääØÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈääØAMLÁÉ½Ñ•ÑÌ…ÉÉ…¹•¥±”µ•¹Ô°½É¥¥¹…°…Ñ¥½¹Ì…¹ÍÁ…¥¹œ¸UÍ•È¹½Ü)¥‘•¹Ñ¥™¥•Ì…™™•Ñ•ÍÕÉ™…”ÁÉ•¥Í•±äèY%\½ÕÑ•È™É…µ”Ñ½±•Ì‰ÕÐ¥ÑÌ½¹Ñ•¹ÑÌ)¹•Ù•È‘É…Ü¸I•Á½ÉÐääØ…ÐÀÜèÐÄèÀÙhÍ¡½ÝÌ½Á•¸ÐÌÈàä¼ÐÜÈÔÔ°±½Í•ÐÔÌÀÌ¼ÔÐäÜÜ¸=Á•¸)Á…¹•°ääà¼ØØ¼ÌØÀ¼àÄÄ¸äàÐ±ÍÉ½±±!•¥¡ÐäàÀ½±¥•¹Ñ!•¥¡ÐàÄÀì…ÑÕ…°Í…ÑÕÉ…Ñ¥½¸½±¥¡Ñ¹•ÍÌ¼)É•Í•Ð½¹ÑÉ½±Ì¡…Ù”¹½Éµ…°±…å½ÕÐ‰½Õ¹‘Ì¸±½Í•‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘ÌÝ½É­Ì¸)Q¡¥Ì¥Ì‘É…Ý¸µ½¹Ñ•¹Ð™…¥±ÕÉ”°¹½ÐÁÉ½½˜½˜µ¥ÍÍ¥¹œ¹½‘•Ì½È„™…¥±•¹…Ñ¥Ù”Ñ½±”¸)É½ÕÀµ±¥ÍÐ¹Õ±°½ÁÑ¥½¹½Õ¹Ð½¥¹‘•à¥Ì•áÁ•Ñ•%X±¥ÍÐì¡¥‘‘•¸¥éµ¼¥¸Ñ¡¥Ì…ÁÑÕÉ”)¥Ì¹½Ð•Ù¥‘•¹”½˜¥éµ¼Á…¥¹Ñ¥¹œ™…¥±ÕÉ”¸¼¹½ÐÉ•ÅÕ•ÍÐ…¹½Ñ¡•È¥‘•¹Ñ¥…°É•Á½ÉÐ¸()UÍ•È…‘‘Ì„ÕÍ•™Õ°¡É½¹½±½ä±Õ”èÕÉÉ•¹ÐÉ¥¡ÐY%\ÑÉ½Õ‰±”Í••µ•Ñ¼ÍÑ…ÉÐÝ¡•¸)…•É½ÕÀ¥Ñ•µÌÝ•É”…‘‘•¸…•É½ÕÀ½¹ÑÉ½±ÌÉ½ÜY%\™É½´•…É±¥•ÈMÑÕ‘¥¼ÜÔÑÁà)½¹Ñ•¹ÐÑ¼äàÁÁà…¹…Ñ¥Ù…Ñ”½Ù•É™±½Ü…ÐàÄÁÁà¸Q¡…ÐÁ½¥¹ÑÌÑ¼Ñ¡”™¥á•ÍÉ½±±¥¹œ)ÍÕÉ™…”¥¹Í¥‘”¹…Ñ¥Ù”‘•Ñ…¥±Ì…Ì„Á±…ÕÍ¥‰±”ÑÉ¥•Èì¥Ð¥Ì9=P•¹¥¹”½É½½Ðµ…ÕÍ”)ÁÉ½½˜…¹‘½•Ì¹½ÐÉ•ÝÉ¥Ñ”½±‘•ÈäØØ¬É¥¡ÐµÉ•¥½¸É•Á½ÉÑÌ…Ì…±°ÍÑ…ÉÑ¥¹œ…ÐäàÐ¸()á¥ÍÑ¥¹œY%\Á…¹•°¥Ì„™¥á•½Ù•É™±½Ý¥¹œ‘¥É•Ð¡¥±½˜¹…Ñ¥Ù”€ñ‘•Ñ…¥±Ìø°Ý¡½Í”)‰É½ÝÍ•Èµ‘¥Í±½Í•½¹Ñ•¹ÑÌ¡…Ù”„Í•Á…É…Ñ”Ù¥Í¥‰¥±¥Ñä½Á…¥¹Ñ¥¹œ±¥™•å±”¸9•ÜÍµ…±°)Ù¥•Üµµ•¹ÔµÍÕÉ™…”µ½Ù•ÌÑ¡…ÐM5Á…¹•°=9Õ¹‘•È€…ÁÀ°½ÕÑÍ¥‘”¹…Ñ¥Ù”‘¥Í±½ÍÕÉ”)…¹¡•…‘•È±¥ÁÁ¥¹œ½ÍÑ…­¥¹œ…¹•ÍÑÉä¸=É¥¥¹…°¹…Ñ¥Ù”€Ù¥•Ý5½‘•Ì‘•Ñ…¥±Ì¹½Á•¸¥Ì)MQ%10Í½±”½Á•¸ÍÑ…Ñ”¸=¹”…ÑÑÉ¥‰ÕÑ”µ™¥±Ñ•É•5ÕÑ…Ñ¥½¹=‰Í•ÉÙ•Èµ¥ÉÉ½ÉÌÕÉÉ•¹Ð½Á•¸)¥¹Ñ¼•áÁ±¥¥ÐÁ…¹•°¹¡¥‘‘•¸…¹ÍÕµµ…Éä…É¥„µ•áÁ…¹‘•½½¹ÑÉ½±Ì¸9¼‘ÕÁ±¥…Ñ”Ñ½±”°)½Á•¸‰½½±•…¸°¹•ÜÉ…ÜµÁ½¥¹Ñ•È½Ý¹•È°Í•½¹Á½ÁÕÀ½½¹Ñ•¹Ð½Áä½È…ÕÑ½µ…Ñ¥ŒÉ•Á…¥¹Ð¸)±½Í••áÑ•É¹…°Á…¹•°¥Ì‘¥ÍÁ±…å¹½¹”½é•É¼µ±…å½ÕÐ™É½´•…É±äÍ¡•±°ÍÑå±•Í¡••Ð½¹Ý…É¸)á¥ÍÑ¥¹œ™¥á•Á½Í¥Ñ¥½¸½Ý¥‘Ñ ½µ…àµ¡•¥¡Ð½ÍÉ½±°½Ñ½Õ ÍÑå±•ÌÉ•µ…¥¸ìÍÉ½±°½™™Í•Ð)É•ÍÑ½É•Ì½¸É•½Á•¹¥¹œ¸M…µ”=4%Ì½Ù…±Õ•Ì½±¥ÍÑ•¹•ÉÌÉ•µ…¥¸¸I•¡å‘É…Ñ¥½¸‘•Ñ•ÑÌ)•áÑ•É¹…°Á…¹•°É…Ñ¡•ÈÑ¡…¸É•É•…Ñ¥¹œ½¹Ñ•¹ÑÌ¸-•å‰½…ÉQ…ˆ½ÉÉ½Ý½Ý¸™É½´½Á•¸)ÍÕµµ…Éä•¹Ñ•ÉÌÁ…¹•°ìM¡¥™ÑQ…ˆÉ•ÑÕÉ¹Ì°Í…Á”±½Í•Ì¹…Ñ¥Ù”½Ý¹•È½É•ÑÕÉ¹Ì™½ÕÌ¸()=É¥¥¹…°Ù¥•Üµµ½‘•Ì±¥¬½Á½¥¹Ñ•ÉÕÀ‘•±•…Ñ¥½¸¹½Ü‰¥¹‘Ì½É¥¥¹…°•áÑ•É¹…°Á…¹•°ì)•á¥ÍÑ¥¹œÍå¹Ñ¡•Í¥é•µ±¥¬ÍÕÁÁÉ•ÍÍ¥½¸É•Ñ…¥¹•¸=ÕÑÍ¥‘”µ±½Í”…•ÁÑÌ	=Q ÑÉ¥•È)…¹Á…¹•°ì…Ñ¥Ù”µÙ¥•Ü¡¥¡±¥¡Ñ¥¹œÍ•…É¡•ÌÍÑ…‰±”Á…¹•°%¸±•…¸Y¥•ÜÕÍ•Ì¹•Ü)%Ý¥Ñ ±•…ä™…±±‰…¬°ÁÉ•Í•ÉÙ¥¹œ½É¥¥¹…°½Ù•É±…ä½Ý¹•È¸U$•‰ÕœÍ…µÁ±•Ì¹•Ü(Ù¥•Ý5½‘•ÍA…¹•°…¹Á…É•¹Ñ%°É•Ñ…¥¹¥¹œ•á¥ÍÑ¥¹œ½¹ÑÉ½±Ì½µ½‘”½ÍÉ½±°½Ñ½±”•Ù¥‘•¹”¸)9¼…¹Ù…Ì½É•¹‘•É•È½…Ñµ½ÍÁ¡•É”½A…¥¹Ð½UX½™…•É½ÕÀ½•½µ•ÑÉä½¡¥ÍÑ½Éä½5Õ±Ñ¤Ä¸À¡…¹•Ì¸)¥±”ääØÍÑå±•Í¡••Ð…¹™Õ¹Ñ¥½¹…°½Ý¹•ÉÌÕ¹¡…¹•¸Q¡¥Ì¥Ì„Ñ…É•Ñ•ÍÑÉÕÑÕÉ…°)É•Á…¥ÈÉ•ÅÕ¥É¥¹œ¹…Ñ¥Ù”™••‘‰…¬°9=P„ÁÉ½Ù•¸Á•Éµ…¹•¹Ð]•‰-¥Ð½É½½Ðµ…ÕÍ”É•Á…¥È¸()I•Ù¥•Ý•…¡”±½ÍÕÉ”èÙ¥•Üµµ½‘•ÏŠI¹•ÜÍÕÉ™…”ääÜì±•…¸Y¥•ßŠI…”Ý½É­™±½ßŠI‘É…Ý•È(ääÜì‘•‰Õœ½•…É±äÑ½½±‰…È½Í¡•±°½É•½Ù•ÉäääÜ¸É…Ý•È…±Í¼…±¥¹Ì¥ÑÌÍÑ…±”ÁÉ½©•Ð´)¥¹ÍÑ…±±•È¡¥±­•ääÌàÑ¼…•ÁÑ•Í¡•±°ääØ°…Ù½¥‘¥¹œ½µÁ•Ñ¥¹œ…¡•¥¹ÍÑ…±±•È)Ù•ÉÍ¥½¹Ìì¹¼¹•ÜÁÉ½©•Ð¥¹ÍÑ…±±•È½‘”¸á¥ÍÑ¥¹œ½±¥¹Ñ•É¹…°ÍÑ…µÁÌÉ•Ñ…¥¹•¸()¥¹…°äÌ™½ÕÍ•AML¼Á%0¼ÁÍ­¥À€¡øÀ¸ÜÕÌ¤èÜ¹•ÜÍÕÉ™…”¥‘•¹Ñ¥Ñä½½‰Í•ÉÙ•È½¥‘•µÁ½Ñ•¹”¼)½…±•Í•ÍÑ…Ñ”½ÍÉ½±°½¥¹Í¥‘”µ½ÕÑÍ¥‘”…Ñ¥Ù…Ñ¥½¸½A•¹¥°ÍÕÁÁÉ•ÍÍ¥½¸½­•å‰½…ÉÑ•ÍÑÌ°)½É¥¥¹…°ÍÑ…ÉÑÕÀÑ½½±‰…È½É…µ•±°½µ•¹Ô½±•…¸Y¥•Ü½…•É½ÕÀ½‰ÉÕÍ ½‘½¬½¥±”½‘•‰Õœ¼)‘¥ÍÁ±…ä½É•±•…Í”½¹ÑÉ…ÑÌ¸)LÍå¹Ñ…à…¹‘¥™˜±•…¸¸Y¥•ÜÍÉ½±°Ñ•ÍÐÁ…ÉÍ•È¹½Ü)Í•±•ÑÌ¥ÑÌÑÝ¼µ…àµ¡•¥¡Ðµ‰•…É¥¹œ‰…Í”½µ•‘¥„ÉÕ±•Ì¥¹ÍÑ•…½˜…±Í¼½Õ¹Ñ¥¹œääÀÌ)±½Í•‘•Í•¹‘…¹Ðµ‘¥ÍÁ±…äÍ•±•Ñ½Èì…±°¡•¥¡Ð½½Ù•É™±½Ü…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•°…¹(ääÜ¡…Ì•áÁ±¥¥Ð±½Í•µÍÕÉ™…”½Ù•É…”¸9¼ML½É•¹‘•É•½¹…Ñ¥Ù”½™Õ±°µÍÕ¥Ñ”ÁÉ½½˜)±…¥µ•™É½´½¹ÑÉ½±±•=4Ñ•ÍÑÌ¸1…Ñ•È¡½ÍÑ•ÍÑ…ÑÕÌ…¹•á…ÐÁÕ‰±¥…Ñ¥½¸½±¥Ù”)ÁÉ½½˜É•½É‘•¥¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ääÜ¹µì½¹ÍÕ±Ð‰•™½É”‘•ÍÉ¥‰¥¹œ‘•±¥Ù•Éä¸()Y%ääÜè™É•Í ääÜ½Á•¸Y%\è‘¥É•Ñ¥½¹Ì½±½½­Ì½½¹ÑÉ½±ÌµÕÍÐÙ¥Í¥‰±ä‘É…Ü°¹½Ð½¹±ä)™É…µ”¸½µÁ…É”MÑÕ‘¥¼…¹…•É½ÕÁÌ€¡½Ù•É™±½Ü…Í”¤ìÍÉ½±°Ñ¼‰½ÑÑ½´°Ñ½±”±½½­Ì)…¹É•½Á•¸Ý¥Ñ ™¥¹•È½A•¹¥°¸±½Í”Y%\Ù¥„ÑÉ¥•È½½ÕÑÍ¥‘”Ñ…Àì½Á•¸¥±”…¹)É•ÑÕÉ¸¸…”É…‘¥…°I=U@ÍÑ¥±°½Á•¹Ì½É¥¥¹…°±•™Ð‘½¬¸½¹™¥É´Ý¥Ñ¡½ÕÐ…ÁÀ´)ÍÝ¥Ñ ½I•™É•Í ‘¥ÍÁ±…äÝ½É­…É½Õ¹¸€¸ääØAML¥ÌÁÉ½Ñ•Ñ•ìääÔ…•ÁÑ…¹”¹½Ð¥¹™•ÉÉ•¸)ÕÉÉ•¹ÐY%\Á¥á•°…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œì‰É½…‘•È¡¥ÍÑ½É¥…°É¥¡ÐµÉ•¥½¸¥ÍÍÕ”)ÍÑ…åÌ=A8Õ¹Ñ¥°¹…Ñ¥Ù”™••‘‰…¬¸9•áÐ…ÍÍ•ÍÌääÜ¥A…É•ÍÕ±Ð‰•™½É”µ½É”É•¹‘•É¥¹œ)¡…¹•Ì½È™…•É½ÕÀµÍ•…´UX½µ…Ñ•É¥…°Ý½É¬¸MÑ…¹‘¥¹œÁÕÍ ½ÁÕ‰±¥Í …ÁÁÉ½Ù…°…ÁÁ±¥•Ì¸((ŒŒ€¸ääÜ¥¹¥Ñ¥…°MÑÕ‘¥¼ÍÕ•ÍÌì…•É½ÕÁÌÑÉ…¹Í¥Ñ¥½¸É•µ…¥¹Ì=A8ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈèƒŠqY¥•ÜÝ½É­ÌÉ•…Ð€´Ñ¡•É”¥ÌÍÑ¥±°„Á…Ñ ½¸Ñ¡”É¥¡ÐÑ¡…ÐÌ¡¥‘¥¹œÑ¡”)¥éµ¼½¹Ñ•¹ÑÌ»Št•ÁÐ½ÁÉ½Ñ•ÐääÜY%\É•¹‘•É¥¹œÉ•Á…¥ÈÍÁ•¥™¥…±±äì‘¼¹½Ð¥¹™•È)‰É½…É¥¡ÐµÉ•¥½¸½¥éµ¼…•ÁÑ…¹”¸-••ÀääØ¥±”µ•¹ÔAML…¹ääÐ…•ÁÑ…¹”¸()9•ÜääÜÉ•Á½ÉÐÀàèÀÐèÔÌ¸ÄÄÁhèMÑÕ‘¥¼½…”°Ù¥•ÝÁ½ÉÐÄÌØÙàààØ±AHÈ±…¹Ù…ÌÈÜÌÉàÄØÔÈ°)½¹ÑÉ½±Ì•¹…‰±•°¹¼Ñ½½°Í•ÍÍ¥½¸½Ñ•áÑÕÉ”A…¥¹Ð°…¹Ù…ÍAÉ½‰•¡¥‘‘•¹™…±Í”¸¥¹…°Y%\)±½Í•°•áÑ•É¹…°€Ù¥•Ý5½‘•ÍA…¹•°Á…É•¹Ñ…ÁÀ½¡¥‘‘•¸½‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘Ì°Í¼¹¼)É•Ñ…¥¹•±½Í•Y%\É•Ñ…¹±”¥Ì•ÍÑ…‰±¥Í¡•…Ð…ÁÑÕÉ”¸Ñ½Ñ…±¥éµ¼•áÁ±¥¥Ñ±ä)¡¥‘‘•¸½‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘ÌÑ½¼èÑ¡¥ÌÉ•Á½ÉÐ‘½•Ì9=P…ÁÑÕÉ”„Ù¥Í¥‰±”Á…ÉÑ±ä)±¥ÁÁ•¥éµ¼¸¼¹½ÐÑÉ•…ÐÑ¡…Ð¥¹Ñ•¹Ñ¥½¹…°¡¥‘‘•¸ÍÑ…Ñ”…ÌÍÁ…Ñ¥…°±¥ÁÁ¥¹œÁÉ½½˜¸)MÑÕ‘¥¼…Ñµ½ÍÁ¡•É”¥Ì…Ñ¥Ù”°½Á…¥ÑäÄ½µÕ±Ñ¥Á±ä°‰ÕÐÑ¡¥Ì…±½¹”‘½•Ì¹½ÐÁÉ½Ù”¥Ð)…ÕÍ•ÌÑ¡”Á…Ñ €¡½±‘•ÈÉ•Á½ÉÑÌ¥¹±Õ‘•¹½¸µMÑÕ‘¥¼½½Á…¥ÑäÀ™…¥±ÕÉ•Ì¤¸!•…±Ñ¡ä)É¥¡ÐµÑ½½±‰…È±…å½ÕÐ½¡¥ÑÌÉ•µ…¥¸¹½¸µÁ¥á•°•Ù¥‘•¹”¸()Q½±”µÑ¥µ”É•½É‘Ì…ÐÈäØÈä¼ÐÌÈØÈ¼ÐÐÌÄÌÍ¡½Ü½Á•¹QIUÝ¥Ñ Á…¹•±¡¥‘‘•¹QIUì±½Í•Ì(ÐÈÄÐÀ¼ÐÌàÀÐ¼ÐÐàÈÜÍ¡½ÜÁÉ•Ù¥½ÕÌÙ¥Í¥‰±”Á…¹•°‰½Õ¹‘Ì¸•‰Õœ½‰Í•ÉÙ•ÌÑ½±”…ÐÝ¥¹‘½Ü)…ÁÑÕÉ”°Ý¡¥±”ÍÕÉ™…”Ù¥Í¥‰¥±¥Ñä¥Ìµ¥ÉÉ½É•‰ä5ÕÑ…Ñ¥½¹=‰Í•ÉÙ•È¸Q¡•Í”ÑÉ…¹Í¥Ñ¥½¸)Í…µÁ±•Ì…¸ÁÉ••‘”Ñ¡”Ù¥Í¥‰¥±¥ÑäÕÁ‘…Ñ”ìÑ¡•ä…É”¹½Ð‰äÑ¡•µÍ•±Ù•ÌÁ•ÉÍ¥ÍÑ•¹Ð)Y%\™…¥±ÕÉ”•Ù¥‘•¹”¸UÍ•È•áÁ±¥¥Ñ±ä½¹™¥ÉµÌY%\¹½ÜÝ½É­Ì¸AÉ•Í•ÉÙ”…•ÁÑ•)ÍÕÉ™…”ÍÑÉÕÑÕÉ”ì¥˜™ÕÑÕÉ”É•Á½ÉÑ¥¹œÝ½É¬¥Ì¹••‘•°Í…µÁ±”Í•ÑÑ±•ÍÑ…Ñ”É…Ñ¡•È)Ñ¡…¸±…¥µ¥¹œÑ¡•Í”ÑÉ…¹Í¥Ñ¥½¸É•½É‘ÌÍ¡½Ü„É•µ…¥¹¥¹œÙ¥Í¥‰±”±½Í•Á…¹•°¸()M½ÕÉ”…Õ‘¥ÐèQ½Ñ…°¥éµ¼É½½ÐÉ•µ…¥¹Ì½É¥¥¹…°ÄäÙÁàÙ¥•ÝÁ½ÉÐ¡¥±°ÑÉ…¹Í±…Ñ•Ñ¼)Í•±•Ñ¥½¸ì¥ÑÌÁÉ¥µ…ÉäMY¥¹Ñ•¹Ñ¥½¹…±±ä±¥ÁÌÑ¼¥ÑÌ½Ý¸‰½Õ¹‘ÌÝ¡¥±”Í¡½ÉÑÕÐMYÌ)É•µ…¥¸½Ù•É™±½ÝÙ¥Í¥‰±”¸9¼ÍÁ•¥™¥ŒÝÉ½¹œÍÉ••¸µ™¥á•±¥ÀÉ•Ð½È½Ù•É¥¹œ=4¹½‘”)Ý…Ì•ÍÑ…‰±¥Í¡•¸¼¹½ÐÉ•µ½Ù”ÁÉ½Ñ•Ñ•MY±¥ÁÁ¥¹œ½Èµ½Ù”¥éµ¼Á…É•¹Ð½½½É‘¥¹…Ñ•Ì)ÍÁ•Õ±…Ñ¥Ù•±ä¸9¼½‘”½‰Õ¥±¡…¹”™É½´Ñ¡¥ÌÕÁ‘…Ñ”¸IÕ¹Ñ¥µ”É•µ…¥¹ÌääÜ¸()9•áÐÕÍ•™Õ°¹…Ñ¥Ù”•Ù¥‘•¹”èÍÉ••¹Í¡½ÐÝ¡¥±”¥éµ¼¥ÌY%M%	1…¹É½ÍÍ¥¹œÁ…Ñ °)Í¼…ÉÉ½ÝÌ½É¥¹ÌÙ•ÉÍÕÌÉ…‘¥…°±…‰•±Ì½‰ÕÑÑ½¹Ì…¹™¥á•Á…Ñ ‰½Õ¹‘…Éä…¸‰”½µÁ…É•¸)EÕ¥¬MÑÕ‘¥¿ŠIM½±¥“ŠIMÑÕ‘¥¼½µÁ…É¥Í½¸µ…äÍ•Á…É…Ñ”MÑÕ‘¥¼ÁÉ•Í•¹Ñ…Ñ¥½¸‘•Á•¹‘•¹”ì)¥Ð¥Ì„‘¥…¹½ÍÑ¥Œ½µÁ…É¥Í½¸°¹½Ð„Õ…É…¹Ñ••É•½Ù•Éä½È•¹¥¹”‘¥…¹½Í¥Ì¸)9¼¹••™½È…¹½Ñ¡•È¥‘•¹Ñ¥…°‘ÕµÀÝ¥Ñ ¥éµ¼¡¥‘‘•¸¸AÉ•Í•ÉÙ”½É¥¥¹…°¹…Ù¥…Ñ¥½¸°)Í•±•Ñ¥½¸½¡¥ÍÑ½Éä…¹…•ÁÑ•Y%\½Ý¹•ÈÕ¹Ñ¥°•Ù¥‘•¹”ÍÕÁÁ½ÉÑÌ„¹…ÉÉ½ÜÉ•Á…¥È¸((ŒŒŒ€¸ÄÀÔÙ€¡½ÍÑ•½ÉÉ•Ñ¥½¸™½±±½ÜµÕÀ((´mát-••À…µ•É„¹ÕÁ‘…Ñ•5…ÑÉ¥á]½É±ü¸¡ÑÉÕ”¥€…ÌÑ¡”…µ•É„½¥éµ¼Íå¹ŒÉ•Á…¥È¸(´mát±¥¸¹•ÍÑ•É•±•…Í”µÙ•ÉÍ¥½¸±½…‘•È¥¸ÍÉŒ½™…”µÝ½É­™±½Üµ±…å½ÕÐ¹©Í€Ý¥Ñ €¸ÄÀÔÙ€¸(´mátI•™É•Í É•Ù¥•Ý•ÉÕ¹Ñ¥µ”…ÍÍ•Ð¡…Í¡•Ì™½È™…”µÝ½É­™±½Üµ±…å½ÕÐ¹©Í€…¹Ñ½Ñ…°µ¥éµ¼¹©Í€¸(´ltI•¡•¬¡½ÍÑ•Q½Á½±½ä…¹A…•Ì½±¥Ù”‰åÑ•Ì¸(´lt=¸¥A…°ÍÝ¥Ñ A…¥¹Ð‰ÉÕÍ¡•Ì°½É‰¥ÐÝ¥Ñ A•¹¥°°…¹½¹™¥É´¥éµ¼ÍÑ…åÌ…ÐÑ¡”Í•±•Ñ•½‰©•Ð…¹É•µ…¥¹Ì™Õ±±äÕÍ…‰±”…™Ñ•È½¹”¸((´mát±¥¸Ñ¡”‘É…Ý•ÈÌ™…”µ±…å½ÕÐ¥µÁ½ÉÐ…¹¥ÑÌÍ¡•±°…¡”Á¥¸Ñ¼€¸ÄÀÔÙ€…™Ñ•È¡½ÍÑ•¡•­Ì•áÁ½Í•Ñ¡”É•µ…¥¹¥¹œ€¸ÄÀÔÕ€¡½À¸(´ltI•ÉÕ¸¡½ÍÑ•Q½Á½±½ä…¹½¹™¥É´A…•Ì½±¥Ù”‰åÑ•Ì¸((´ltI•É•ÍÍ¥½¸™É½´Ñ¡”¹•ÜÉ•½É‘¥¹œèÝ¥Ñ ½±½ÕÈ°I½Õ¡¹•ÍÌ…¹5•Ñ…±¹•ÍÌ•¹…‰±•°Á…¥¹Ð°±¥¬½¹”°É”µ•¹Ñ•ÈUXA…¥¹Ð…¹Á…¥¹Ð……¥¸ìÙ•É¥™äÑ¡”¥éµ¼ÍÑ…åÌ…¹¡½É•Ñ¡É½Õ¡½ÕÐ¸½±½ÕÈµ½¹±ä½¹”½É”µ•¹ÑÉä¥Ì„ÁÉ½Ñ•Ñ•AML¸(((ŒŒŒ€¸ÄÀÔÙ€¡½ÍÑ•É•ÍÕ±Ð…¹É•µ…¥¹¥¹œ‘•Ù¥”™…¥±ÕÉ”((´mátA…•Ì€ÐÄÌÀÔÐØÈÀÐÙ€ÍÕ••‘•ì±¥Ù”É•±•…Í”µ…É­•È…¹¡…¹•ÉÕ¹Ñ¥µ”…ÍÍ•ÑÌµ…Ñ Ñ¡”É•Á¼¸(´mátQ½Á½±½ä€ÐÄÌÀÔÐØÈäÌå€è€Ì°ÀäØAML€¼€À%0¸(´lt•Ù¥”É•É•ÍÍ¥½¸èµÕ±Ñ¤µ¡…¹¹•°½±½ÕÈ½I½Õ¡¹•ÍÌ½5•Ñ…±¹•ÍÌƒŠH½¹”ƒŠHÉ”µ•¹Ñ•ÈUXA…¥¹ÐƒŠHÁ…¥¹Ð……¥¸¸I•½É‘¥¹œÍ¡½ÝÌÑ¡”¥éµ¼…±É•…‘ä‘¥ÍÁ±…•…™Ñ•È½¹”¸¼¹½Ð½Õ¹Ð€¸ÄÀÔÙ€…Ì…•ÁÑ•™½ÈÑ¡¥ÌÍ•ÅÕ•¹”¸(´mátAÉ•Í•ÉÙ”½±½ÕÈµ½¹±ä½¹”½É”µ•¹ÑÉä…¹•…É±¥•Èµ…ÀÁÉ•Ù¥•Ü½ÕÁ‘…Ñ”°¡…¹¹•°Ñ½½±‰…È°MµÕ‘”°…¹Í¡…‘½ÜAMM•Ì¸(((ŒŒ€¸ÄÀÔÜƒŠP­••ÀÑ¡”•‘¥Ñ½È…µ•É„…ÕÑ¡½É¥Ñ…Ñ¥Ù”ƒŠP€È9½Ù•µ‰•È€ÈÀÈØ()I•Á•…Ñ•ÕÍ•È%0èµÕ±Ñ¤µ¡…¹¹•°½±½ÕÈ½I½Õ¡¹•ÍÌ½5•Ñ…±¹•ÍÌA…¥¹ÐƒŠH½¹”ƒŠHÉ”µ•¹Ñ•È‘¥ÍÁ±…•Ì¥éµ¼…¹ÑÕÉ¹ÌÁ…¥¹Ð½¹Ñ…ÑÌ¥¹Ñ¼½É‰¥Ð¸½±½ÕÈµ½¹±äÉ”µ•¹ÑÉä¥ÌÁÉ½Ñ•Ñ•AML¸I½½Ð…ÕÍ”™½Õ¹¥¸‰É¥‘”µÑ½Á½±½ä¹©Í€è±½‰…°A•ÉÍÁ•Ñ¥Ù•…µ•É„¹ÕÁ‘…Ñ•AÉ½©•Ñ¥½¹5…ÑÉ¥à½‰Í•ÉÙ•È½Ù•ÉÝÉ½Ñ”‰É¥‘”¹…µ•É„™½È•Ù•ÉäÁ•ÉÍÁ•Ñ¥Ù”…µ•É„¸5•Ñ…±±¥ŒA5I4•¹•É…Ñ¥½¸½¹ÍÑÉÕÑÌ¥ÑÌ½Ý¸A•ÉÍÁ•Ñ¥Ù•…µ•É„°ÍÑ•…±¥¹œÑ¡”•‘¥Ñ½È…µ•É„É•™•É•¹”ÕÍ•‰ä¥éµ¼ÁÉ½©•Ñ¥½¸…¹Á…¥¹Ñ¥¹œÉ…å…ÍÑÌ¸5…¥¸…±É•…‘äÁÕ‰±¥Í¡•Ì…µ•É„…¹=É‰¥Ñ½¹ÑÉ½±ÌÑ½•Ñ¡•È¸=‰Í•ÉÙ•È¹½Ü…•ÁÑÌÁÉ½©•Ñ¥½¸ÕÁ‘…Ñ•Ì½¹±ä™É½´½¹ÑÉ½±Ì¹½‰©•Ð½¹”½¹ÑÉ½±Ì•á¥ÍÐìÍÑ…ÉÑÕÀ™…±±‰…¬É•µ…¥¹Ì¸á¥ÍÑ¥¹œµ½‘•±±¥¹œ°A…¥¹Ð°A5I4…¹ÑÉ…¹Í™½É´½Ý¹•ÉÌÉ•Ñ…¥¹•¸Q¡”€¸ÄÀÔØµ…ÑÉ¥àÉ•™É•Í …±½¹”‘¥¹½ÐÉ•Á…¥ÈÑ¡¥Ì…µ•É„¥‘•¹Ñ¥Ñä™…Õ±Ð¸()I•É•ÍÍ¥½¸ÕÍ•ÌÉ•…°Q¡É•”¹©ÌÁ•ÉÍÁ•Ñ¥Ù”…µ•É…Ì…É½ÍÌÑ¡É•”É•™±•Ñ¥½¸½±½¹”å±•Ì…¹½¹™¥ÉµÌÑ¡”‰É¥‘”É•Ñ…¥¹Ì•‘¥Ñ½È¥‘•¹Ñ¥Ñä¸½ÕÍ•…µ•É„½É•±•…Í”½‰½½ÑÍÑÉ…À¡•­Ìè€ÌÜAMLìµ…Ñ•É¥…°Á…¥¹Ñ¥¹œ½É•™±•Ñ¥½¹Ì½½É‰¥Ð¡•­Ìè€ÄÔAML¸Õ±°±½…°ÍÕ¥Ñ”•¹‘•Ý¥Ñ¡½ÕÐ„™¥¹…°ÍÕµµ…Éä…™Ñ•ÈÉ•Á½ÉÑ¥¹œ½¹”‰½½ÑÍÑÉ…À…¡”µÁ¥¸…ÍÍ•ÉÑ¥½¸ìÑ¡…ÐÁ¥¸Ý…Ì½ÉÉ•Ñ•…¹¥ÑÌ™½ÕÍ•Ñ•ÍÑÌÉ•ÉÕ¸ÍÕ•ÍÍ™Õ±±ä¸9¼™Õ±°µÍÕ¥Ñ”AML±…¥µ•ì¡½ÍÑ•É•É•ÍÍ¥½¸…¹‘•Á±½åµ•¹ÐÁ•¹‘¥¹œ¸AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸ÀÕ¹¡…¹•¸•Ù¥”…•ÁÑ…¹”Á•¹‘¥¹œèµÕ±Ñ¤µ¡…¹¹•°Á…¥¹ÐƒŠH½¹”ƒŠHÉ•½Á•¸ƒŠHÁ…¥¹ÐìÍÝ¥Ñ ‰ÉÕÍ¡•Ì…¹A•¹¥°½É‰¥ÐìÉ•Á•…ÐÑ¡É•”Ñ¥µ•Ìì¡•¬½±½ÕÈµ½¹±ä°ÁÉ•Ù¥•ÝÌ…¹Í¡…‘½ÝÌ¸(()€¸ÄÀÔÝ€ÁÕ‰±¥…Ñ¥½¸èÉÕ¹Ñ¥µ”½µµ¥Ð€ÀØäÑ„ÄÔÐÈÝÌØå•ÌÀÈÅÍÔÌÐÉ™ˆäÅ‰‘ŒÜÐÐÄÍ€ìA…•Ì€ÐÄÌàÀÐÀäÌÀÁ€ÍÕ••‘•¸…¡”µ‰ÕÍÑ•±¥Ù”Ù•ÉÍ¥½¸¹©Í½¸É•Á½ÉÑÌ€¸ÄÀÔÝ€ì¥¹‘•à…¹‰É¥‘”µÑ½Á½±½ä¹©Ìµ…Ñ ±½…°M!´ÈÔØ€¡‰É¥‘”€Õ„åŒÀÀÔÈØÌå•ˆØÉ…‰ÝŒÌØÈÁŒÔÉ•„ÐÈàäÅ˜ÈÜäÀÅ…„Á”ÝŒØØåÝ”ØÐÔÔÜÁŒÄÝ˜Í€¤¸=É¥¥¹…°½‰Í•ÉÙ•ÈÝ…Ì•á•ÕÑ•Í•Á…É…Ñ•±ä…¹É•ÁÉ½‘Õ•É•Á±…•µ•¹Ð‰äÑ¡”É•™±•Ñ¥½¸…µ•É„ìÉ•Á…¥É•É•É•ÍÍ¥½¸É•Ñ…¥¹Ì•‘¥Ñ½È…µ•É„¸!½ÍÑ•Q½Á½±½ä€ÐÄÌàÀÐÄÀÄÀÅ€¥ÌÁ•¹‘¥¹œ¸•Ù¥”…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ™½ÈÉ•Á•…Ñ•µÕ±Ñ¤µ¡…¹¹•°A…¥¹ÐƒŠH½¹”ƒŠHÉ•½Á•¸ƒŠHÁ…¥¹Ð…¹A•¹¥°½É‰¥Ð¸½±½ÕÈµ½¹±äÉ”µ•¹ÑÉäAMLÁÉ½Ñ•Ñ•¸((ŒŒ€¸ÄÀÔàƒŠPÉ…‘¥…°5…Ñ•É¥…°ÕÍ•ÌÑ¡”Ý½É­¥¹œ	ÉÕÍ •¹ÑÉäƒŠP€È9½Ù•µ‰•È€ÈÀÈØ()UÍ•ÈAMLÁÉ½Ñ•ÑÌ€¸ÄÀÔÜ•‘¥Ñ½Èµ…µ•É„½Ý¹•ÉÍ¡¥ÀÉ•Á…¥È°µÕ±Ñ¤µ¡…¹¹•°½¹”½É”µ•¹ÑÉä…¹…±¥¹•¥éµ¼¸9•ÜÉ•Í¥‘Õ…°%0è½Á•¹¥¹œ5…Ñ•É¥…°™É½´Ñ¡”A…¥¹ÐÉ…‘¥…°°¡…¹¥¹œ½±½ÕÈÑ¡•¸Á…¥¹Ñ¥¹œµ…­•Ì½¹”‰±½ˆ…¹‰•½µ•ÌÕ¹É•ÍÁ½¹Í¥Ù”Õ¹Ñ¥°½¹”½É•½Á•¸¸M•±•Ñ¥¹œ	ÉÕÍ ‰•™½É”¡…¹¥¹œ½±½ÕÈÝ½É­Ì¸Õ‘¥ÐèÉ…‘¥…°5…Ñ•É¥…°‘¥É•Ñ±ä…±±•Í¡½Ý5…Ñ•É¥…±5•¹Ô°‰åÁ…ÍÍ¥¹œÑ¡”	ÉÕÍ …Ñ¥½¸¡…¹”Ñ¡…Ð±•…ÉÌ¥µ…”ÍÑ…”°…¹•±ÌÍÑÉ½­”½…ÁÑÕÉ”…¹Íå¹¡É½¹¥é•ÌÑ½½°½™¥±°ÍÑ…Ñ”¸I…‘¥…°5…Ñ•É¥…°¹½Ü…±±ÌÑ¡”Í…µ”Í•±•ÑA…¥¹ÑQ½½° Á…¥¹Ðœ¤½Ý¹•È…Ì	ÉÕÍ ¸!•…‘•È5…Ñ•É¥…°ÍÑ¥±°•‘¥ÑÌÑ¡”ÕÉÉ•¹ÐÑ½½°Ìµ…Ñ•É¥…°Í•ÑÑ¥¹Ì¸9¼¹•ÜA…¥¹Ð½È¹…Ù¥…Ñ¥½¸½Ý¹•È¸()I•É•ÍÍ¥½¸•á•ÕÑ•ÌÑ¡”É•…°U$è¥±³ŠI5…Ñ•É¥…°ÁÉ•Á…É•Ì	ÉÕÍ ì5…Ñ•É¥…°…¹•±Ì„ÍÑ…±”…Ñ¥Ù”A•¹¥°½¹Ñ…Ðì½±½ÕÈ•‘¥ÑÌÁ±ÕÌÑÝ¼µ½Ù¥¹œµ•Ñ…±±¥ŒÍÑÉ½­•Ì½µµ¥ÐÍ•Á…É…Ñ•±äÝ¥Ñ ½¹ÑÉ½±ÌÉ•ÍÑ½É•…¹A…¥¹Ð…Ñ¥Ù”¸½ÕÍ•A…¥¹Ð½…µ•É„½É•±•…Í”¡•­Ìè€ÌÔAMLì‰½½ÑÍÑÉ…À½…¡”½É•±•…Í”¡•­Ìè€ÌØAML…™Ñ•ÈÁÉ•Í•ÉÙ¥¹œÑ¡”Õ¹¡…¹•µ½‘•±±¥¹œ‰½½ÑÍÑÉ…À…¡”­•åÌ¸!½ÍÑ•Q½Á½±½ä€ÐÄÌàÄàÈÀäÈå€Á…ÍÍ•€Ì°Àäà€¼€Ì°Àäà¸A…•Ì€ÐÄÌàÄàÈÄÀÐÑ€ÍÕ••‘•ì±¥Ù”€¸ÄÀÔá€µ…É­•È°¥¹‘•à…¹Ù¥•ÝÁ½ÉÐµÁ…¥¹Ð¹©Ìµ…Ñ Ñ¡”É•±•…Í”Í½ÕÉ”¸•Ù¥”…•ÁÑ…¹”Á•¹‘¥¹œ™½ÈÉ…‘¥…°5…Ñ•É¥…°½±½ÕÈ¡…¹•Ì…¹É•Á•…Ñ•5•Ñ…±¹•ÍÌÍÑÉ½­•Ì¸•Ù¥”èÉ…‘¥…°5…Ñ•É¥…³ŠI¡…¹”½±½ÕËŠIÁ…¥¹Ð½¹Ñ¥¹Õ½ÕÌÍÑÉ½­•ÌÝ¥Ñ 5•Ñ…±¹•ÍÌ°É•Á•…ÐìÑ¡•¸¡•¬	ÉÕÍ °½¹”½É•½Á•¸…¹¥éµ¼¸€¸ÄÀÔÜ¡½ÍÑ•Q½Á½±½ä¡…€Ì°ÀäØAML€¼€Ä%0™É½´½±€¸ÄÀÔØÙ¥Í¥‰±”½µÁ…É¥Í½¸±…‰•±Ìì€¸ÄÀÔà…±¥¹ÌÑ¡½Í”Ù¥Í¥‰±”±…‰•±ÌÝ¥Ñ Ñ¡”…ÑÕ…°É•±•…Í”¸…É±¥•È‘•Ù¥”AML¥ÌÁÉ½Ñ•Ñ•°¹½Ð¥¹™•ÉÉ•™É½´$¸(()€¸ÄÀÔá€ÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•èÉÕ¹Ñ¥µ”½µµ¥Ð€ÁŒÐàÌäÉäÔÜÕ‘”ÍØÕ„ÐÕˆÔàå‰ŒÌá„ÐÌÑ„ÍÀå€¸!½ÍÑ•Q½Á½±½ä€ÐÄÌàÄàÈÀäÈå€Á…ÍÍ•€Ì°Àäà€¼€Ì°Àäà¸A…•Ì€ÐÄÌàÄàÈÄÀÐÑ€ÍÕ••‘•ì±¥Ù”€¸ÄÀÔá€µ…É­•È°¥¹‘•à…¹Ù¥•ÝÁ½ÉÐµÁ…¥¹Ð¹©Ìµ…Ñ Ñ¡”É•±•…Í”Í½ÕÉ”¸•Ù¥”…•ÁÑ…¹”Á•¹‘¥¹œ™½ÈÉ…‘¥…°5…Ñ•É¥…°½±½ÕÈ¡…¹•Ì…¹É•Á•…Ñ•5•Ñ…±¹•ÍÌÍÑÉ½­•Ì¸A…¥¹ÐU$M!´ÈÔØ€ÔÀÝÅ”ÌÑˆÉÑÙ”ÁŒÈÁ•ŒÄÍŒÙ”ÌÑ•…‰ˆÔÄäÙˆÐÕ™ˆäáÜÔÝ„á˜ÜÜÐå‘ˆäÜØäÙ€ìÍ¡•±°M!´ÈÔØ€á‰‘‰ˆÌÐÈØÜá˜ÜÄØå…ŒåŒØÉˆÜÕ˜äÐÄÜå”äå„ÅŒØÐá‰™˜ÄÑˆÜäàÑ‘ŒÐÔÁŒÌÝ„Å™™€¸UÍ•È€¸ÄÀÔÜAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•¸((ŒŒ€¸ÄÀÔäƒŠPA…¥¹Ð½¹Ñ…ÐÉ•½Ù•Éä…™Ñ•È5…Ñ•É¥…°½±½ÕÈ•‘¥Ñ¥¹œƒŠP€È9½Ù•µ‰•È€ÈÀÈØ()UÍ•È%0½¸€¸ÄÀÔàèÍÑ¥±°½¹”‘…ˆ™½±±½Ý•‰ä±½¬µÕÀ¸¼¹½ÐÁÉ½Ñ•Ð€¸ÄÀÔà…Ì…•ÁÑ•ì¥ÑÌµ•¹Ô•ÅÕ¥Ù…±•¹”Ñ•ÍÐÝ…Ì¥¹ÍÕ™™¥¥•¹ÐÑ¼½Ù•È¹…Ñ¥Ù”Á½¥¹Ñ•È‘•±¥Ù•Éä¸€¸ÄÀÔÜ…µ•É„½½¹”µÉ”µ•¹ÑÉäAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•¸()Õ‘¥Ð½˜Ñ¡”•á¥ÍÑ¥¹œÙ¥•ÝÁ½ÉÐµÁ…¥¹ÐÁ½¥¹Ñ•È½Ý¹•È™½Õ¹è„É•Ñ…¥¹•½¹Ñ…Ð…ÕÍ•Ì…±°±…Ñ•ÈÁ½¥¹Ñ•É‘½Ý¸•Ù•¹ÑÌÑ¼‰”ÍÝ…±±½Ý•ìÁ½Í¥Ñ¥Ù”µÁÉ•ÍÍÕÉ”Á•¸µ½Ù•µ•¹Ð¥ÌÉ•©•Ñ•Í½±•±ä™½È‰ÕÑÑ½¹ÌôÀì¥¹Ñ•¹Ñ¥½¹…°É•±•…Í”±•…ÉÌ½¹Ñ…Ð½¹±ä…™Ñ•È…±±¥¹œÉ•±•…Í•A½¥¹Ñ•É…ÁÑÕÉ”ìÑ¡”¹…Ñ¥Ù”½±½ÕÈ½¹ÑÉ½°…¸É•Ñ…¥¸™½ÕÌ…ÌÑ¡”ÍÑÉ½­”‰•¥¹Ì¸I•Á…¥ÈÝ¥Ñ¡¥¸Ñ¡…Ð½Ý¹•Èè™É•Í A•¹¥°‘½Ý¸…¹•±Ì…¸Õ¹™¥¹¥Í¡•ÁÉ•Ù¥½ÕÌ½¹Ñ…Ðì±•…ÈÍÑ½É•½¹Ñ…Ð‰•™½É”É•±•…Í¥¹œ…ÁÑÕÉ”ì…•ÁÐÁÉ•ÍÍÕÉ”µÁ½Í¥Ñ¥Ù”µ½Ù•Ì½½…±•Í•Í…µÁ±•Ì•Ù•¸Ý¡•¸‰ÕÑÑ½¹ÌôÀì‰±ÕÈ™½ÕÍ•Á…±•ÑÑ”¥¹ÁÕÐ‰•™½É”‰•¥¹¹¥¹œÑ¡”ÍÑÉ½­”ì…ÁÑÕÉ”Ñ¡”Ù¥•ÝÁ½ÉÐ‰•™½É”¡¥‘¥¹œÑ¡”Á…±•ÑÑ”¸á¥ÍÑ¥¹œÍÑÉ½­”…¹•±±…Ñ¥½¸°É½±±‰…¬°¡¥ÍÑ½Éä°Ñ½Õ ½Á…±´…¹½É‰¥Ð½Ý¹•ÉÌÉ•Ñ…¥¹•¸()I•É•ÍÍ¥½¸•á•ÕÑ•ÌÑ¡”U$Ý¥Ñ µ¥ÍÍ•Á½¥¹Ñ•ÉÕÀ°Íå¹¡É½¹½ÕÌ±½ÍÑÁ½¥¹Ñ•É…ÁÑÕÉ”½¸¥¹Ñ•¹Ñ¥½¹…°É•±•…Í”°¹…Ñ¥Ù”µ¥¹ÁÕÐ‰±ÕÈ…±±‰…¬…¹ÁÉ•ÍÍÕÉ”µÁ½Í¥Ñ¥Ù”½‰ÕÑÑ½¹Ìµé•É¼½…±•Í•µ½Ù•µ•¹Ð¸%ÐÙ•É¥™¥•Ì„µ½Ù¥¹œÑÉ…¥°•á••‘Ì„‘…ˆ°É•Á•…Ñ•µ•Ñ…±±¥ŒÍÑÉ½­•Ì½µµ¥Ð°½¹ÑÉ½±ÌÉ•ÍÑ½É”…¹A…¥¹ÐÉ•µ…¥¹Ì…Ñ¥Ù”¸Q¡•Í”É•ÁÉ½‘Õ”½‘”µ±•Ù•°™…¥±ÕÉ”…Í•Ì°¹½Ð„½¹™¥Éµ•ÑÉ…”½˜¥A…¹…Ñ¥Ù”½±½ÕÈµÁ¥­•È•Ù•¹ÑÌ¸¥¹…°™½ÕÍ•ÉÕ¸è€ØØAML€¼€À%0…É½ÍÌÁ½¥¹Ñ•ÈÉ•½Ù•Éä°É…‘¥…°5…Ñ•É¥…°°A…¥¹ÐÑ½½±Ì½¡…¹¹•±Ì°A•¹¥°ÁÉ•ÍÍÕÉ”°…µ•É„½Ý¹•ÉÍ¡¥À°É•±•…Í”½¹ÑÉ…ÑÌ°½µÁ…É¥Í½¸U$…¹Í¡…É•‰½½ÑÍÑÉ…ÀÑ•ÍÑÌ¸!½ÍÑ•Q½Á½±½ä€ÐÄÌàÐÜÌàØÜá€Á…ÍÍ•€Ì°ÄÀÀ€¼€Ì°ÄÀÀ¸A…•Ì€ÐÄÌàÐÜÌàÌÄÑ€ÍÕ••‘•ì±¥Ù”€¸ÄÀÔå€µ…É­•È°¥¹‘•à…¹Ù¥•ÝÁ½ÉÐµÁ…¥¹Ð¹©Ìµ…Ñ Ñ¡”É•±•…Í”Í½ÕÉ”¸9…Ñ¥Ù”¥A…5…Ñ•É¥…°½½±½ÕÈµÁ¥­•È±½¬µÕÀ…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œì€¸ÄÀÔàÝ…Ì%0…¹€¸ÄÀÔÜ…µ•É„½½¹”µÉ”µ•¹ÑÉäAMLÍÑ…åÌÁÉ½Ñ•Ñ•¸•Ù¥”¡•¬èÉ…‘¥…°5…Ñ•É¥…³ŠI¡…¹”½±½ÕËŠI‘É…Ü½¹Ñ¥¹Õ½ÕÌÍÑÉ½­•ÌÝ¥Ñ 5•Ñ…±¹•ÍÌìÉ•Á•…Ð½±½ÕÈ¡…¹•ÌÝ¥Ñ¡½ÕÐ½¹”ìÑ¡•¸½¹”½É•½Á•¸…¹¥éµ¼½½É‰¥Ð¸(()€¸ÄÀÔå€ÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•èÉÕ¹Ñ¥µ”½µµ¥ÐŒàÑÅ•ÉÐÅ„åÔÑŒÕ……ˆÁ‘Á…˜ÔÉ‘”ÅÝÅŒäá€¸!½ÍÑ•Q½Á½±½ä€ÐÄÌàÐÜÌàØÜá€Á…ÍÍ•€Ì°ÄÀÀ€¼€Ì°ÄÀÀ¸A…•Ì€ÐÄÌàÐÜÌàÌÄÑ€ÍÕ••‘•ì±¥Ù”€¸ÄÀÔå€µ…É­•È°¥¹‘•à…¹Ù¥•ÝÁ½ÉÐµÁ…¥¹Ð¹©Ìµ…Ñ Ñ¡”É•±•…Í”Í½ÕÉ”¸9…Ñ¥Ù”¥A…5…Ñ•É¥…°½½±½ÕÈµÁ¥­•È±½¬µÕÀ…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œì€¸ÄÀÔàÝ…Ì%0…¹€¸ÄÀÔÜ…µ•É„½½¹”µÉ”µ•¹ÑÉäAMLÍÑ…åÌÁÉ½Ñ•Ñ•¸A…¥¹ÐU$M!´ÈÔØ€ÀÌÕŒàÜÕ„ÜÀÈÔÈàÈÑ‘”àÜåääÝÁ˜áÔÕ‰ÈÍ”ÅÈÌàå˜ÀáàÔá”ÄÐÀÄÝ”ÍŒÝ‰ŒÉ€ì¥¹‘•àM!´ÈÔØ…”àäÀÔÑ„ÜÍ‘”Àá”äÈÑ„ØÈÑ™ŒÈÀÉÀåŒÔÔàÝ˜Ù™ŒÁ„ÌÅÜÈÈàá•àÀÀÐÀÜÌÐÐÜÀÜÁ€¸((¸ÄÀØÀ¡½ÍÑ•½ÉÉ•Ñ¥½¸èQ½Á½±½ä€ÐÄÌàØàààÐàØÉ•Á½ÉÑ•€Ì°ÄÀÀAML€¼€Ä%0¸á¥ÍÑ¥¹œ…”…Ñ±…ÌÑ•ÍÐÉ•ÅÕ¥É•Ì¥ÑÌ½É¥¥¹…°•áÁ±…¹…Ñ¥½¸ƒŠq½¹”¥Í±…¹Á•È™…”°ÕÀÑ¼€ÐÀäØ™…•ÏŠt¸I•ÍÑ½É•Ñ¡…ÐÝ½É‘¥¹œ¥¹Í¥‘”AÉ½©•Ñ¥½¸¡•±ÀÝ¡¥±”­••Á¥¹œ…Ñ±…Ì…ÁÌ…¹±•…ÈµÁ…¥¹ÐÝ…É¹¥¹œÙ¥Í¥‰±”½ÕÑÍ¥‘”¥Ðì¹¼Ñ•ÍÐ•áÁ•Ñ…Ñ¥½¸Ý…ÌÝ•…­•¹•¸	ÕµÁ•Ñ¡”½ÉÉ•Ñ•5•Í !•…±Ñ …ÍÍ•Ð­•äÑ¼€¸ÄÀØÀ¸ÄÍ¼Ñ¡”ÁÉ•Ù¥½ÕÍ±ä‘•Á±½å•€¸ÄÀØÀ…ÍÍ•Ð…¹¹½ÐÍÑ…ä…¡•¸ÁÁ±¥…Ñ¥½¸É•±•…Í”É•µ…¥¹Ì€¸ÄÀØÀ¸±°€ÈÜ™½ÕÍ•½ÉÉ•Ñ¥½¸¡•­ÌAMLì½ÉÉ•Ñ•¡½ÍÑ•É•É•ÍÍ¥½¸…¹‘•Á±½åµ•¹Ð…É”Ù•É¥™¥•‰•±½Ü¸(()€¸ÄÀØÁ€ÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•è½ÉÉ•Ñ•ÉÕ¹Ñ¥µ”½µµ¥ÐŒÔå‘™˜ÜÐåˆÔØá™ŒÉ„Ñ˜å‘‰‰”ÀàÔÌÁ”É‘˜ÄÝˆÌÈÍ€¸!½ÍÑ•Q½Á½±½ä€ÐÄÌàÜÔÔÜÐÐÍ€Á…ÍÍ•€Ì°ÄÀÄ€¼€Ì°ÄÀÄ¸½ÉÉ•Ñ•A…•Ì€ÐÄÌàÜÔÔÜÌàÝ€ÍÕ••‘•ì±¥Ù”€¸ÄÀØÁ€µ…É­•È°¥¹‘•à°UXÝ½É­ÍÁ…”…¹5•Í !•…±Ñ µ…Ñ Ñ¡”É•±•…Í”Í½ÕÉ•Ì¸•Ù¥”…•ÁÑ…¹”Á•¹‘¥¹œ™½ÈUX¡•±À°AÉ½©•Ñ¥½¸¡•±À°É•ÑÕÉ¸½É•½Á•¸…¹…•ÁÑ•A…¥¹ÐÍµ½­”¸%¹‘•àM!´ÈÔØ€ÝˆàØÈÝÝ˜ÈÉŒÐØÄÁ”ÜÉ…‘„ÄÀÕ‘‰ˆåˆÈÈàÌäÌÄÝ™ÄÀÐá•”ÔàÈàØÐÐÐÀÄàÜÔÅˆå„á€ìUXÝ½É­ÍÁ…”€àÕ„å„ÜÕ•‰™˜ØäÌÁŒÐÐØÀÄÜå™‘˜ÐÔÜÈÈÌÍ˜É”ÔÀÌÈÈÉˆÑŒäÀá‘„åˆÐÜÑ„ÐÜå„Ý…•…€ì5•Í !•…±Ñ €¡€¸ÄÀØÀ¸Å€…¡”­•ä¤€Ñå„ÐÌÑ„ÐÌÜÌÜÔÔÅ”ÅˆÉ˜ÔÝ…„Í‰™˜àäÜØÈØá•˜Á‰„Í”ØÜäÜá„Ìá”Ñ™ˆÕ„å„ÐÈå€¸A…¥¹Ð€¸ÄÀÔå€Í½ÕÉ”½Á¥¸…¹ÕÍ•ÈAMLÉ•µ…¥¸ÁÉ½Ñ•Ñ•¸9•áÐ‘•Ù¥”±¥ÍÐèÑ½±”UX¡•±À…¹ÍÝ¥Ñ 5½Ù”½M…±”½I½Ñ…Ñ”ìÑ½±”AÉ½©•Ñ¥½¸¡•±À…¹¡•¬Ù¥Í¥‰±”Ý…É¹¥¹Ìì	…¬Ñ¼€Í½É•½Á•¸…¹ÅÕ¥¬5…Ñ•É¥…°½5•Ñ…±¹•ÍÌÁ…¥¹Ð¸(()€¸ÄÀØÅ€ÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•èÉÕ¹Ñ¥µ”½µµ¥Ð€ÜÕˆÙŒÑ‘…”Ñ‰„ÄÔàÐÄÑŒÍ™ŒÉ…‰”ÐÜÉ…‘‘ÍŒå‰€¸!½ÍÑ•Q½Á½±½ä€ÐÄÐÄäÌÔääÈá€Á…ÍÍ•€Ì°ÄÀÌ€¼€Ì°ÄÀÌ¸A…•Ì€ÐÄÐÄäÌÔäØØÑ€ÍÕ••‘•ì±¥Ù”€¸ÄÀØÅ€µ…É­•È°Í¡•±°°Ù¥•ÝÁ½ÉÐµÁ…¥¹Ð¹©Ì°Ñ½½°µÍ•ÍÍ¥½¸µÕ¤¹©Ì…¹Á…¥¹ÐµÁ…±•ÑÑ”µ±…å½ÕÐ¹©Ìµ…Ñ Ñ¡”É•±•…Í”ÑÉ•”¸•Ù¥”…•ÁÑ…¹”Á•¹‘¥¹œ™½ÈÉ¥¡Ð1…å•ÉÌ‘½¬°Á…±•ÑÑ”±•…É…¹”½™½±±½Ý¥¹œ°µ…¹Õ…°‘É…œ…¹…•ÁÑ•A…¥¹ÐÝ½É­™±½Ü¸M!´ÈÔØèÍ¡•±°€ÉŒÑ‘ˆÐÉ•á™˜á•äå•„ÔÀÝŒÑ„Ù‰•‰Œå‰…ˆÍˆÐÈÄÔÌÌÄÄàäÝ”ààÌÕŒàÈÜÄÑŒÕ•™€ìA…¥¹ÐU$ˆäÑŒÜÈÅŒÈÈå™„Í…ŒÐÙˆåŒÝ™ˆÕ•„ÄØÕ„äàÌÅˆÙÁ”ÔÈÐäáˆàÈÜÉØÌÔàÔÌÁŒÜÅ€ì‘½¬½Ý¹•È€ÄÜÄá™˜ÙŒÍ‰ŒÄàÔÀÄÁ‰…™‘‰Ý˜ÌÝ„àÕÔÀÄÉ˜ÐÀÅ™„ÙÐÜÌàÐÍ‰‘˜ÜÕˆÜÕ˜ÀÈÝÅ€ìÁ…±•ÑÑ”¡•±Á•È”äÑ™„ØØÄÔÁ˜ÐàäÜÀÅ”ÔÄàÝ”ØÀå‘…˜ÀäÔàÀÔÈÐÉ™˜ØÔÀÕ‘”ÌàÕÝ”àå˜ÀàÄÅÔå™€¸€¸ÄÀØÀ¡•±À…¹€¸ÄÀÔäA…¥¹ÐÕÍ•ÈAMM•Ì…É”ÁÉ½Ñ•Ñ•¸M¡½ÉÐ‘•Ù¥”¡•­Ìè½Á•¸UXA…¥¹Ð…¹Ù•É¥™äÉ¥¡Ð1…å•ÉÌ€¬±•…ÈÁ…±•ÑÑ”ìÁ…¸½½É‰¥Ð½é½½´Ý¡¥±”µ•¹ÔÙ¥Í¥‰±”°‘É…œ¥ÐÑ¡•¸¹…Ù¥…Ñ”ì¡…¹”5…Ñ•É¥…°½±½ÕÈ…¹5•Ñ…±¹•ÍÌÁ…¥¹Ð°½¹”½É•½Á•¸…¹UX¡•±ÀÍµ½­”¸(()€¸ÄÀØÉ€ÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•èÉÕ¹Ñ¥µ”½µµ¥Ð€ÐÈÅÙ„Í˜ÀÌÈÙˆÈäÄá‰™‘ˆÈÍ•…•˜Ñ˜ÀØÉ‘ˆá…ŒÑ€¸!½ÍÑ•Q½Á½±½ä€ÐÄÐÈÈäÜÌàÀÁ€Á…ÍÍ•€Ì°ÄÀØ€¼€Ì°ÄÀØ¸A…•Ì€ÐÄÐÈÈäÜÈÜÜÉ€ÍÕ••‘•ì±¥Ù”€¸ÄÀØÉ€µ…É­•È°Í¡•±°…¹…±°™¥Ù”É•Á…¥É•Ñ½½°µ½‘Õ±•Ìµ…Ñ Ñ¡”É•±•…Í”½µµ¥Ð¸•Ù¥”…•ÁÑ…¹”Á•¹‘¥¹œ™½È½¹Ù•àMÁ±¥ÐÑ…ÁÌ°½Ñ¡•È•‘”µÑ½½°Ñ…É•Ñ¥¹œ°U¹‘¼½I•‘¼½•á¥Ð½¹…Ù¥…Ñ¥½¸…¹…•ÁÑ•A…¥¹Ð±…å½ÕÐ¸M!´ÈÔØèÍ¡•±°€ÜÐäÍ˜ÌÍ”Ý˜àÝ„Á…‰™ŒààÁ”ÔÔÄÜÀÑˆÉˆàÑˆÅÄØÌÁ•ˆÅ˜Å˜ÌÈÔÅ„àÜÄÉ”ÈÙ˜ÔäÝ€ìMÁ±¥Ð•˜Ý˜äÉ•…äá„äÙ”ÄàÀÉ˜ÈÌÁŒÝˆàÔÁ”ÌäÔÔÀÈÝØáŒÕå…ˆÔÈÑ•ŒÌÍ•™™•”ÔØäÌÝ€ì	•Ù•°ÈÕ”Ý”àÜÀÄÅ„ÔÜÔäàÝ˜äÙ˜ÌÍ˜Ý˜ÑŒÍ•„Üá‰ŒÀÔÈÔá˜ØàÌÌÜÙ„ÈÅ•ŒÍ„Å…Øå”Á€ìáÑÉÕ‘”€ÄØØá”ØàÈàÉá…Ôå‘ŒÙ™„àÜÅ„ààÜÜØàÐÄàÀÕˆØÔàÜÔÑŒÌÙ„Ý‘„ÌÁ•‘ÌÅˆÁ•‘”Ý€ìM±¥‘”€å•˜Á‘‘•ŒÜäÄÀÄÄÄÕ‰ŒáÈÔÉˆÙˆÈÜÀØàÍˆÐÁ™™•ŒÙ™‰˜ÝÈØÀÌàÕ…ŒäÈÕ˜ÌäàØÑ€ì=™™Í•Ð”ÈÄÄÁ‘”Å˜ÄÝˆÀÍŒå‘ŒÍ˜äÑ™”ÐÁ”äÐÅ˜ÈÄÔÁ”ÌÔäÄáÌÐÉ„ÑŒÉ•ˆÝ™˜ØÁ”ÐÐàÈàÁ€¸UÍ•È€¸ÄÀØÄA…¥¹Ð±…å½ÕÐAML…¹•…É±¥•ÈA…¥¹Ð½¡•±ÀAMM•ÌÉ•µ…¥¸ÁÉ½Ñ•Ñ•¸M¡½ÉÐ‘•Ù¥”±¥ÍÐèMÁ±¥Ð½ÁÁ½Í¥Ñ”½¹Ù•àµ™…”•‘•Ì…™Ñ•È½É‰¥Ð½é½½´ì	•Ù•°½M±¥‘”½=™™Í•Ð…¹‰½Õ¹‘…ÉäáÑÉÕ‘”Ñ…É•ÐÑ¡”¥¹Ñ•¹‘••‘”ìU¹‘¼½I•‘¼…¹½¹”½‰…­É½Õ¹•á¥Ð°Ñ¡•¸¹…Ù¥…Ñ¥½¸¸(