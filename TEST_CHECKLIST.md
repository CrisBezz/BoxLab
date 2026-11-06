Warning: truncated output (original token count: 245958)
Total output lines: 13017

## .1087 — imported NOM/GLB UV Paint — native acceptance pending

This stage enables the existing UV Paint owner only for imported NOM/GLB meshes with complete UV corners inside tile 0–1, one solid material, no embedded images, vertex colours, tangent maps or morph targets, and at most 20,000 corners. Imported source data stays in the original payload. Paint starts with the imported solid base colour and uses the existing history and `.boxlab` project codec.

- [ ] Import a low-poly untextured NOM with valid UVs. Open Object → UV → UV Paint, paint a stroke, press Done, then reopen and paint again. Confirm the imported solid base colour remains outside the stroke.
- [ ] Repeat with an untextured GLB that has one solid material. Confirm the stroke starts from its material colour.
- [ ] Save `.boxlab`, reopen it, and confirm imported source metadata and painted pixels remain. Undo/Redo one stroke.
- [ ] Confirm a textured or multi-material imported object remains protected with a clear Paint eligibility message; do not alter its original UVs or source maps.
- [x] Automated: actual NOM and GLB imported Paint owner opens, starts from source solid colour, commits a stroke, binds it to the original UVs, and survives project encode/decode. Textured, multi-material and out-of-tile targets refuse before mutation/history. Nearby Paint/project/export/NOM-retention regressions pass.

Imported texture compositing remains the next required stage before WASM feasibility begins. Do not count `.1087` as full imported-texture Paint completion.

## .1086 GLB opacity export — protected native PASS

The `.1085` Pencil/combined-channel acceptance is protected. User also reports PASS for `Done → reopen UV Paint → draw again`.

`.1086` carries the existing opacity R8 map into the GLB base-colour texture alpha. Colour-plus-opacity uses authored RGB; opacity-only uses white RGB. glTF material is blended and double-sided. NOMAD and OBJ opacity refusals remain expected.

- [x] Paint Colour with Opacity enabled in Also paint; both update in one stroke.
- [x] Done, reopen UV Paint, and draw again.
- [x] Export GLB; open in Nomad Sculpt; colour, transparent region, and reverse faces through the surface PASS.
- [x] Export an opacity-only object; GLB retains the transparent area.
User reports PASS for all `.1086` checks. Protect combined paint, re-entry smoke, transparent/double-sided GLB, and opacity-only GLB export.

Build `.1086` is published and native acceptance is protected. Local focused tests verify PNG alpha bytes, opacity-only white RGB, GLB `BLEND`/double-sided material, loader transparency, source immutability, and continued NOMAD/OBJ refusals. Full local suite: 3,168 PASS / 0 FAIL.

## .1085 — Pencil Paint — protected PASS

- [x] Slow-light Pencil strokes start without oversized blobs; steady pressure retains the full brush size.
- [x] Deliberate tap and Undo/Redo.
- [x] Colour, Roughness, Metalness and Opacity paint in the same stroke.
- [x] Done → reopen UV Paint → draw again smoke check.

User confirms `.1085` PASS. Protect this acceptance and existing `.1077` compact Paint/four-channel, `.1076` two-sided opacity, `.1075` opacity authoring, `.1074` brush-controls, `.1071` image adjustments and `.1070` proportional image import PASSes.

## Protected device results — 4 November 2026

PASS .1074 Pencil onset and brush pressure controls. PASS .1071 image adjustments. PASS .1070 proportional image import. Keep all three PASS results protected.

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

## .1056 — Total Gizmo follows Pencil orbit in UV Paint

- [ ] In UV Paint, change among Brush, Eraser and Smudge; paint after each change.
- [ ] Orbit the model with Pencil while Paint is active. Confirm the Total Gizmo remains aligned with the selected object during the orbit and after Pencil lifts.
- [ ] Press Done. Confirm the full gizmo is still over the object; Move, Rotate and Scale remain usable.
- [x] Preserve Roughness/Metalness preview and live-update PASS, separate Paint channel/toolbars PASS, Smudge improvement PASS, and prior Metalness-only shadow PASS.

First hosted `.1056` CI run failed on 33 legacy fake-camera calls and one stale release-version pin. The compatibility guard and pin are corrected; record the rerun before device acceptance. No local tests were added or run.

## .1055 — combined-map shadows, Paint hit routing and gizmo recovery

- [x] Pages reports `.1055`; live release marker and cache-busted runtime assets match `main`.
- [x] Hosted Topology `41296990402` passed 3,096 / 3,096 after restoring the offline evaluation fixture reference.
- [x] UV Paint → Layers Roughness/Metalness previews and live updates PASS; retain this behavior.
- [ ] Compare Studio shadow contrast for Metalness-only and Colour+Metalness. Confirm metal-only retains its PASS and combined maps regain the stronger shadow contrast.
- [ ] In UV Paint, switch Brush → Eraser/Smudge → Brush and paint the same visible face after each change; confirm strokes do not fall through to orbit.
- [ ] Pencil-drag empty background to orbit; reselect the object and confirm the complete Total Gizmo and Move/Rotate/Scale handles return and work.

## .1054 — release identity repair and material map previews

- [x] Roughness and Metalness map previews display correctly.
- [x] Map previews update correctly while painting.
- [ ] Combined Colour+Metalness shadow contrast; Pencil brush switching/orbit; complete Total Gizmo after orbit (carried into .1055).

`.1053` Pages (`41293655018`) succeeded and live files matched `main`. Its hosted Topology run had 3,094 PASS / 2 FAIL: the `.1041` preserved-release check still expected `.1052`, and shell-comparison headings remained `.1052`. `.1054` updates the visible labels and preserved release assertion; prior logs remain accepted. No local tests were run or added. Commit `889ab5a226245cd62a030a8baf415b881c61f716` is on `main`; Pages `41294085210` succeeded; live `.1054` index, shell-comparison and runtime asset manifest match `main`. Hosted Topology `41294085728` is still running. Verify live assets and hosted regression before hands-on checks.
---

# BoxLab manual test checklist

## .1049 — stronger painted Metalness shadows and stable Pencil Paint/orbit handoff

- [ ] In Studio, paint Metalness on a surface with no Colour map. Confirm the shadow remains visible and has stronger contrast than .1048.
- [ ] Repeat with both Colour and Metalness maps. Confirm both painted responses and the shadow remain visible; compare shadow strength with metal-only.
- [ ] In UV Paint, paint a stroke, switch among Brush, Eraser or Smudge, then paint again on the mesh. Confirm the second stroke paints rather than orbiting.
- [ ] In UV Paint, Pencil-drag empty background to orbit, then rotate the object with Total Gizmo. Confirm orbit does not leave the gizmo unusable.
- [x] Separate material-channel painting and Paint toolbars PASS; .1048 combined Colour+Metalness shadow presence PASS with reduced strength noted; .1047 metal-only shadow case PASS; .1046 Smudge PASS remain protected.

Automated .1049 coverage: focused material/Pencil/gizmo/shell/release set 42 PASS / 0 FAIL; full Node suite 3,096 PASS / 0 FAIL / 0 skipped (296.37s). Changed JS syntax, reviewed runtime pin/hash contract, protected Multi pin, and `git diff --check` pass. Hosted Topology regression `41289594202` passed. Pages run `41289594359` failed twice because GitHub says the prior `.1048` deployment is still in progress; live `version.json` remains `.1048`, so .1049 is not yet available for device testing. Focused regressions exercise `.55` Metalness fill with both shadow flags, active-Paint mesh Pencil routing after brush changes versus background orbit, matching-pointer gizmo cancellation, and preserved gizmo rotation behavior. Native iPad rendering and Pencil feel must be confirmed after Pages is unblocked and the checks above can be run.


## .1047 — separate Paint channels and metal-only shadow

User confirms painting Metalness and Colour through their separate channels/toolbar flow PASS. The Colour-map case with Metalness loses the shadow; `.1048` fixes that combined-material path. The orbit test was not reported again and remains a hands-on check.

## .1046 — Metalness shading and stronger Smudge — user report

The .1046 Metalness-only shading claim did not pass on device: the user saw no shadow following Metalness painting without a Colour map. The stronger Smudge behavior passed and is protected. The .1047 shadow contrast repair addresses the reported case.


## .1045 — combined material strokes and UV Paint input/menu fixes — user PASS protected

User replied **1045 PASS** on 1 November 2026. Protect combined scalar strokes, Lit Paint preview, Pencil orbit, direct Brush menu and the .1045 Smudge behavior. The report also identifies a Metalness-only Studio shading restoration defect and asks for stronger Smudge; .1046 covers these fixes.


- [x] Open the Brush radial action. It should go straight to **Material & Paint**; the
  previous Brush controls screen should not appear first. Confirm Colour, Roughness,
  Metalness, brush size, stroke opacity and tip controls are present.
- [x] Enable “Also paint in this stroke” for Roughness and Metalness. Paint one Colour
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


## .1044 — UV Paint material & values menu — device test pending

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

## .1043 — contextual Paint help and copy audit — device test pending

- [ ] The floating Paint controls show a small “i” help button. Tap it on iPad to
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

## .1042 — UV Paint draggable contextual palette — device test pending

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

## .1041 — displacement feasibility report received (benchmark only)

- [x] The .1041 page ran all nine generated-map render combinations on the iPad; no
  case stopped early. This confirms the gate and its copyable report work.
- [x] Largest generated case: 16,384 output faces / 65,536 UV corners; UV subdivision
  21 ms median, geometry expansion 5–8 ms, expanded arrays 3 MiB.
- [x] 2048² generated PNG decoded in 48 ms; estimated base RGBA 16 MiB. RAF intervals
  were 17 ms median and 17–18 ms p95. GPU timer query was unavailable.

Interpretation: favorable bounded CPU/frame-scheduling evidence, not a product PASS or
GPU/memory safety proof. The benchmark used a single mesh and generated 8-bit maps; it
did not test actual Nomad 16-bit decode, BoxLab viewport time, shadows or full memory.
Next validation must audit the actual retained Nomad displacement image and the native
factor/midpoint/world settings before preview implementation. Keep current viewport
20,000-corner and aggregate-image budgets. No displacement feature is enabled in .1041.

Automated .1041 coverage checks the benchmark entry point, canonical corner-UV kernel,
displacement shader usage, case caps, timeout/report contract and release markers. The
full Node suite passed 3,083 / 0 / 0; live .1041 Pages deployment was verified.

## .1040 — textured SubD on inactive NOM objects — user PASS protected

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

## .1039 — active textured SubD; base-material PASS, inactive gap reported

The user confirmed all seven base materials displayed correctly in .1039. The follow-
up test found that only the selected object displayed its material after SubD was
enabled on multiple objects. The .1040 checklist above covers this repair.

## .1037 user PASS protected — corner UV subdivision

User replied PASS after the .1037 release. Protect seam-preserving per-corner UV propagation, unchanged geometry-only SubD behavior and the16,384-face/80,000-corner refusal limits. The helper is currently not connected to viewport rendering. Existing seven-object loading, VIEW stability and .1035 colour-alpha PASS remain protected.

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

## .1032 explicit user acceptance — 31 October 2026

- [x] User1032 PASS: all7 cubes visible; no VIEW mode disappearance. Protect sample spacing and VIEW startup/mode availability/reopen.
- [ ] OPEN: native Normal/Emissive/Roughness/Metalness/Opacity without colour texture still falls back to plain3D shading; retained maps remain inspectable. No standalone-PBR PASS inferred.
- [ ] OPEN: sample colour RGB is constant cyan with alpha checker OFF. Nomad solid cyan expected; BoxLab checker/black squares require alphaOFF decoder/material investigation. Use opaque RGB checker in future comparison fixture.
- [ ] Displacement viewport remains deferred; inspection/export retention only.
- [x] Documentation-only acceptance/source audit; runtime remains1032, no new build/manual mandatory test.

## .1032 — repair .1031 FAIL — 31 October 2026

- [x] User .1031 FAIL recorded; last accepted .1030 protected. Original .1031 sample contains ONE cube/seven maps; no false seven-object claim.
- [x] Actual1031 installer reproduces lost early Cavity/Silhouette and failed ready-host restoration (2 baseline failures). Repaired original installer preserves optional nodes/listeners and restores missing base modes on VIEW open; binds once.
- [x] Workspace-only native image adapter; shared3D resolver has no inspection dependency. Existing map/byte/cancel/read-only tests retained.
- [x] New sample NOM_SEVEN_OBJECTS_1032.nom has7 named independent cubes/one map each; actual File dispatcher imports all7; checked bytes equal generator.
- [x] 85 focused PASS/0FAIL/0skip; syntax/diff/cache checks valid.
- [x] Full local Node24.22.1:3055 PASS/0FAIL/0skip/0cancel (107.16s); no runtime/test edits after start.
- [x] App674828d5/final fixture+tests b73818ed exact validated trees; final sample4a9a16d4 clear of startup cube; Pages41147618892 SUCCESS;8/8 live paths match. UI/DOM1032 all12 controls and Studio/Solid/reopen checked; cloudGPU unavailable.
- [x] CI mismatch reproduced3053PASS/2FAIL: compression bytes varied byNode. Independent fixture pixels/CRC/geometry/maps checks plus unchanged exact source round trips; final Node22 full3055PASS,Node24 full3055PASS+final6 fixture checks. Hosted final result: docs/publication-1032-ci.md.
- [ ] DEVICE1032 VIEW before import: all12 looks,Cavity/Silhouette,Studio/Solid/reopen. New sample seven named cubes; selecteach -> Object radial UV -> UV Editor -> Image -> one raw map. BackTo3D/Close/recheckVIEW; navigation/UndoRedo/accepted1030 sample. Exact iPad missing-menu cause remains unproven.

## .1031 — native NOM UV image inspection — 30 October 2026

- [x] User .1030 PASS protects accepted native map transforms/PBR/alpha/round trips; hosted .1030 regression41052704373 SUCCESS.
- [x] Original UV Image/dropdown/controller/canvas resolves native exact Colour/Normal/Emissive/Roughness/Metalness/Opacity/Displacement; native scalars never use glTF G/B extraction.
- [x] Raw-image/inspection-only/mapping-not-applied status; original source bytes/16-bit displacement retained, no native UV editing or displacement rendering.
- [x] Five real-owner checks plus accepted native/GLB/workspace/release coverage:79 focused PASS/0FAIL/0skip; syntax/diff/cache graph and protected owners checked.
- [x] Full local Node24.22.1:3051 PASS/0FAIL/0skip/0cancel (121.47s); no runtime/test edits after start.
- [x] Runtime80e2d61d/tree8c1f7130 equals validated/uploaded tree;25 blobs verified; Pages41058750880 SUCCESS;9/9 live matches. Hosted41058751078 in_progress at proof; native gate pending.
- [ ] USER .1031 FAIL — VIEW modes missing; expected seven objects (original file actually one cube/seven maps). Retest with .1032. Historical DEVICE1031 NOM_MAP_INSPECTION_1031.nom -> Object radial UV -> UV Editor -> Image: inspect all7 dropdown entries, pan/zoom/switch, Back to3D/Close/reopen; SaveOpen.boxlab and NOMAD maps intact. Accepted1030 viewport sample unchanged.

## .1030 — native UV texture transforms — 30 October 2026

- [x] Explicit .1029 user PASS protects native colour alpha/opacity and earlier PBR/round trips.
- [x] Existing resource/overlay owner: independent per-map offset/radians/scale; verified Blender-conjugate matrix, original UVs/bytes untouched.
- [x] Four actual-owner tests: signed/nonuniform scale, both rotations, all six maps, colour spaces/alpha, malformed/late cleanup, unlit/UV Image, pooled+inline project/NOM round trips.
- [x] 41 focused checks PASS/0FAIL/0skip; protected main/Multi/frozen and syntax/diff checks retained.
- [x] Full local Node24.22.1: 3046 PASS/0FAIL/0skip/0cancel (214.23s); final canonical parent-pin checks 11 PASS after pin-only correction.
- [x] Runtime caf0dede/tree8f0661e0 exact tested/uploaded match;44 blobs verified; Pages41052704232 SUCCESS;8/8 live byte matches; final15 checks PASS. Hosted41052704373 in_progress at proof; native gate pending.
- [x] User .1030 PASS: import docs/samples/NOM_TEXTURE_TRANSFORM_1030.nom: original left, shifted middle, sideways/twice-repeated right; compare same file in Nomad. Studio/Solid/orbit, Move/UndoRedo, looks/back, SaveOpen.boxlab, NOMAD/Nomad. Accepted colour-alpha sample unchanged.

## .1029 — native colour-image alpha — 30 October 2026

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

## .1028 — native opacity preview — 30 October 2026

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

## .1027 — native emissive preview — 30 October 2026

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

## .1026 — native NOM normal and scalar preview — 30 October 2026

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

## .1025 — NOM maps and colour viewport — 30 October 2026

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

## .1024 protected acceptance — 30 October 2026

- [x] Explicit .1024 user PASS protects Studio/Solid underside lighting, original ambient and shadow-free Solid.
- [x] Hosted full regression41009577601 completed SUCCESS, rechecked after feedback.
- [x] Documentation only; current build .1024, no new mandatory device test.

## .1024 — underside inspection lighting — 30 October 2026

- [x] User .1023 PASS protects grid/Pivot shortcut/selected-Face edge alignment.
- [x] Existing render owner reuses one directional lower fill in Studio/Solid only;
  original hemisphere/materials/KeyFillRim/floor controls unchanged; no extra shadow.
- [x]46 focused PASS/0FAIL/0skip: actual six-normal illumination/mode/reuse/isolation,
  original render/paint/floor/contact/release/cache/identity/comparison checks.
- [x] User .1024 PASS: DEVICE1024 Studio underside readable with shape contrast; Solid underside
  readable without shadows; look switches and floor/grid/off; moved model consistent.
- [x] Published runtime d90b3154/treefd6ca02e equals tested tree; Pages41009576824 SUCCESS;12/12 live byte matches. Hosted41009577601 in_progress at proof; no full-suite/browser/iPad PASS claimed.

## .1023 — Pivot/Face refinement and brighter grid — 30 October 2026

- [x] User1022 PASS protects floor/grid/off and contact-shadow behavior; Object/Edge pivot-edge workflow reported good. Face acceptance remains pending.
- [x] Original grid opacity +10% relative (.198 Studio/.374 other); floor states/Clean mask/axes retained.
- [x] Pivot editing exposes only Pivot and World/Local shortcut buttons/groups,restores original mode-specific icons on exit; real gizmo preview/centre/Y unchanged.
- [x] Selected Face owns shared-edge start and latched surface; nearest-only ray tie plus real shared-edge fallback preserves selected normal,actual edge X/Z snap and occlusion refusal. No model/selection mutation during draft.
- [x]76 focused PASS/0FAIL/0skip;3 new pre-fix/tilted-edge/hidden-face/shortcut checks and original pivot/history/codec/projection/floor/Clean/toolbar/cache/release checks; syntax/whitespace clean.
- [x]Runtimeb45a3a9a/treebf595927 exactly equals tested tree;21 blobs hash-verified; Pages40996655063 SUCCESS;18/18 live byte matches. Hosted40996655551 in_progress at proof; native Face acceptance pending.
- [ ] DEVICE1023 grid subtly clearer; Pivot shows two shortcuts then restores; selected Face drag to multiple/tilted/shared edges,greenY normal,model still; Object/Edge parity,finish Local transform/UndoRedo.

## .1022 — floor/grid/off shortcut — 30 October 2026

- [x] User1021 PASS protects corrected Pivot icon colour order; no1019 edge-snap PASS inferred.
- [x] Original top-right shell button cycles plane/grid/off/plane via existing ground owner, matching filled/grid/outline SVG and accessible labels. Fresh load plane; no geometry/history/extra renderer.
- [x] Existing grid/Studio floor exclusive; off hides both and contact decal. Original polish refresh cannot reveal decal in grid/off. Look/bridge restores chosen state; Clean View grid/axes masking retained.
- [x]54 focused checks PASS/0FAIL/0skip, including4 new actual-owner checks and original toolbar/render/clean/compact/Objects/snap/release/identity/comparison; syntax/whitespace clean. No full-suite/native PASS claimed.
- [x]Runtime4c10c95f/tree00f84fc4 exactly equals tested tree;18 blobs hash-verified; Pages40995326471 SUCCESS;16/16 live byte matches. Hosted40995327653 in_progress at proof; native acceptance pending.
- [ ] DEVICE1022 Studio: grey plane -> grid -> outline/off -> plane; orbit after each, no floating shadow; Studio/Solid/Studio choice, Clean grid hide/restore; nearby top-right actions and accepted Pivot icon remain usable.

## .1021 — Pivot icon colour order — 30 October 2026

- [x] Original Pivot SVG: blue bottom-left, green up, red bottom-right; yellow centre ring retained. Action owners unchanged.
- [x]37 focused release/corner/identity/comparison checks PASS; syntax/whitespace clean; exact SVG colour order and unchanged actions/other icons verified.
- [x]Runtime d8ae5d4c/tree26aa26a1 equals tested tree; all16 blobs hash-verified; Pages40991382103 SUCCESS;14/14 live bytes match. Hosted40991382283 in_progress at proof, no full-suite/native PASS claimed.
- [ ] DEVICE1021: verify order at normal size and with Pivot active; toggle/face placement sanity. No1019 device PASS inferred.

## .1020 — RGB Pivot icon — 30 October 2026

- [x] Original Pivot SVG only: red X/green Y/blue Z arrows and small yellow centre ring; explicit SVG colours, existing24px icon/40px button and all original action owners retained.
- [x]35 focused corner/release/cache/identity/comparison checks PASS; syntax/whitespace clean. Exact SVG XML valid and normal/active/disabled24px/enlarged render visually inspected.
- [x] Runtime6a05d77/tree947a0f26 exact tested match; Pages40985099430 SUCCESS;14/14 live byte matches. Hosted40985099175 in_progress at proof, no hosted PASS claim.
- [ ] DEVICE1020: RGB/yellow icon legible; colours persist when Pivot active. Toggle Pivot, existing face drag/edge snap and finish. .1019 native acceptance not inferred.

## .1019 — live face-drag / edge-aligned local pivot — 30 October 2026

- [x] User .1018 PASS and .1017 GIZMO ALIGN PASS protected. Original draft/history/transform owners retained.
- [x] Live touch/Pencil/mouse draft movement, actual gizmo projection/rings/hit proxies BEFORE release; no geometry/selection mutation. Base polygon edges only; Y latched to starting face normal, nearest X/Z sign, perspective-correct14/20 CSSpx magnet, no occluded snap.
- [x] Actual owner tests cover secondary contacts, per-drag rollback/capture loss, Escape/pagehide/control/listener restoration, UndoRedo/SaveOpen and no fan-diagonal snaps.
- [x]62 focused owner/projection/nearby/cache/release checks PASS; full local Node24.22.1:3007 PASS/0FAIL/0skip/0cancel (208.94s); syntax/whitespace clean.
- [x] Runtime380b61c/tree4c5ceba0 exact tested match; Pages40981504272 SUCCESS;13/13 fresh live bytes match. Hosted40981504381 in_progress at proof, no hosted PASS claim.
- [ ] DEVICE1019: Pivot -> press/drag face -> edges: visible gizmo moves and X or Z snaps, Y normal and model still. Release -> centre/Y manual turn -> Pivot finish -> Local transform; UndoRedo/SaveOpen. New contact on another face changes normal.

## .1018 — pivot-edit actual gizmo preview — 30 October 2026

- [x] User .1017 GIZMO ALIGN PASS protected; other .1017 device gates not inferred.
- [x] Reuse original live draft frame and actual Total Gizmo arrows/planes/front arcs; remove pivot-only visibility suppression. Existing centre/Y input gate and geometry/history/finish/cancel owners unchanged.
- [x]55 focused pivot/direction/ring/corner/release/identity/comparison checks PASS; syntax/whitespace clean. Native visual acceptance still pending.
- [x] Runtime bd11e9c/tree5f40a836 exact tested match; Pages40974848411 SUCCESS;11/11 live byte matches. Hosted40974848994 in_progress at proof, no hosted PASS claim.
- [x] User .1018 PASS accepts actual-gizmo preview. DEVICE1018: Pivot -> face -> centre -> greenY: actual RGB gizmo visibly turns, model stays still. Finish -> aligned Local transform; Cancel/UndoRedo and World/Local sanity.

## .1017 — local pivot / gizmo controls — 30 October 2026

- [x] Original per-object origin + flat quaternion/local fields; existing scene history/copy/project owners retained. Edit is transient, one scene checkpoint on finish, no model mutation; Escape/pagehide/cancel and controls restoration covered.
- [x] Active visible Base face hit, occlusion refusal; Y normal/XZ tangent right-handed frame. Centre enables Y twist; end via Pivot icon. Other shortcuts disabled during edit; Undo/Redo removed ONLY from gizmo.
- [x] World/Local icon state/artwork; per-object frame/space recall and existing Save/Open/UndoRedo; no new project version/channel.
- [x] Actual original exact/local projected Move/Rotate/Scale about custom pivot, component selected-only changes, object frame carrying, fixed start basis/nonaccumulation and cancel restoring geometry+origin.
- [x] Seven new owner/math/scene tests + updated corner tests;36 focused then25 final focused PASS. Final local Node24.22.1:3000 PASS/0FAIL/0skip/0cancel (117.43s); syntax/whitespace clean.
- [x] Local editing refuses Multi/locked/reference/linked/evaluated/procedural/busy/Paint; protected Multi1.0/frozen betas and1016 accepted direction/navigation unchanged.
- [x] Exact SVG icons rendered and inspected. Actual rendered app/browser QA unavailable (missing Chromium/truncated download); no native visual/feel claim.
- [x]Runtime6053092d/treee8ee3cb3; Pages40970022761 SUCCESS;17/17 live byte matches. Hosted40970023491 in_progress at proof; no hosted PASS claim.
- [ ] DEVICE1017 Pivot->face->centre->Y turn->exit; model unchanged during pivot edit. Local Move/Rotate/Scale/Exact, World/Local, second object/back, UndoRedo and Save/Open.

## .1016 protected user acceptance — 30 October 2026

- [x] Explicit user PASS accepts shipped1016 gizmo repair; protect Object rotation/scale directions, explicit constraints and component touch handoff with existing history/selection behaviour.
- [x] Runtime remains1016; documentation-only acceptance record. No new build/tests or separate1015 native NOM acceptance inferred.

## .1016 — gizmo directions / component touch — 30 October 2026

- [x] Reproduce component touch handoff refusal, explicit constraints overwritten by Axis Snap, XYZ opposite screen winding and quadrant-dependent uniform scale; original3 new tests fail before repair.
- [x] Existing semantic owner accepts touch/Pencil/mouse only on explicit gizmo launch; canvas touch navigation gate and co…195958 tokens truncated…33370

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

- Paint radial: tool and contextual-page choices close the floating radial; idle empty-background hold reopens it; movement, painting contact, navigation and multitouch do not reopen it.


## .964 — left side compact Paint settings; user direction — 25 October 2026

User requests Paint contextual popups at LEFT because top-centre settings obstruct the viewport. Keep the floating radial and existing painter/control owners from .963. Reuse shared position owner with compact layout; set Paint host 8px from left/top, width capped at320px, viewport-height scroll. Reduce gaps modestly while preserving readable labels and minimum tap heights. Other tool popups retain top-centre placement. DEVICE964: Brush/Blur left placement, spacing, radial hold/reopen, Pencil, finger navigation, UndoRedo, contextual pages and Done. Next: obtain iPad acceptance of radial + left popup before more controls; then prioritize facegroup painting.

- Paint contextual panels remain narrow, scrollable and on the left; spacing stays comfortable and radial hold flow works.


## .965 — Paint workflow and UI evidence — 25 October 2026

User .964 PASS accepts LEFT compact Paint popup, but recurring inactive right-side UI
remains OPEN. Do not infer rendering repaired. Current requested UI: bottom UV PAINT
beside SELECT; native UV validation before entry; original Object radial Paint sector
removed. File keeps no duplicate button once bottom bar is ready. Layers now always
visible at top, selected contextual settings below. Radial choices stay visible until
Pencil begins a valid surface stroke/image gesture; browsing choices adds no history.
Repeated Paint entry reopens tools; empty background hold reuses main's single timer
with explicit Paint background policy, bypassing modelling hit proxies. Done exits;
Escape cancels live contact without leaving Paint; competing tool launch is refused.
Invalid/deleted geometry may still close for resource safety.

Smudge audit found bounded 8M-work guard threw and cancelled valid stroke pixels.
Guard now pauses additional dabs at cap and exposes a lift-to-keep status; lifting
commits the valid prefix normally. Cancellation/checkpoint refusal still restore.
No unbounded raster work or changed cap. Map size replaces ambiguous Texture caption:
colour resolution/legacy512-to1024 enlargement, not a brush.

File → UI Debug extends original opt-in gesture debug: bounded100 events, right-side
hit-test stacks, bounds/styles/visibility, canvas/visualViewport, session, errors and
context loss. Capture report then Copy report after inactive UI occurs; flag persists
through refresh. Diagnostic reads and listeners never consume input. Exact iPad failure
not reproduced; debug mode gathers evidence, does not claim a compositor repair.

DEVICE965: no-UV object refuses Paint; UV object opens from bottom. Inspect top Layers
and settings below, browse radial choices then Pencil paint hides it; background hold
reopens. Long Smudge/lift keeps pixels. Fingers/UndoRedo and Done. Enable UI Debug,
reproduce right-side failure, Capture report → Copy report and send report.


.965 validation: full local Node24 suite2810 PASS/0 FAIL/0 skipped (90.1s);
focused production/UI/hold/debug/Smudge and release checks passed. Revised old tests
only where user-directed UI changed (radial persistence, scalar-layer visibility,
removed Object Paint sector); retained raster cancel/refusal and protected gizmo
bounds/navigation assertions. Old fixed732 shared-dock pin assertion now uses reviewed
cache contract; negative background test mutates BOTH native hold branches; debug
fixture preserves multiple observers and existing runtime-error extraction boundary.
.964 rendering issue remains OPEN; debug report is diagnostic evidence, not a fix.
Runtime publication and hosted CI proof are verified separately after this commit.


## .966 — continuing Smudge input windows; startup toolbar evidence — 25 October 2026

User .965 PASS protects bottom Paint entry, persistent radial, Layers-first LEFT
settings and kept Smudge pixels. User reports Smudge still stops after5–6 passes.
Original8M raster work cap was contact-wide; renew ONLY its work counters per native
Smudge input sample, retaining before snapshot/coverage/pickup/dirty pixels. A bounded
sample may pause dabs, next input resumes. At original12000 path-dab cap, reseed same
original path owner from last screen input while retaining the raster contact. No
extra checkpoints or layer finish until physical lift: Undo remains one stroke.
Cancel/checkpoint refusals retain atomic rollback. Brush/Fill/Eraser/Blur unchanged.

User supplied .965 debug report from refresh failure:1366×886, canvas1366×826CSS /
2732×1652pixels atDPR2, paintfalse/sessionnull/controlsenabled; sampled right CANVAS
contacts reach window bubble. No broad overlay in those canvas samples. This does NOT
prove toolbar hit testing or compositor painting healthy: original grid startsY71
below60px header and omitted .top-actions/right button rects. User confirms refresh
can enter failed state directly. Extend existing debug report with exact right-button
rect/styles/disabled/expanded/centre hit stacks; capture these on persisted-debug
startup/pageshow/lifecycle and toolbar click. No root cause or rendering fix claimed.

DEVICE966: long repeated Smudge passes under one Pencil contact continue; lift keeps
result, ONE Undo/Redo restores whole contact, cancel restores pre-contact. All .965
UI flow remains. Enable UI Debug, refresh directly into right failure, Capture/Copy
new report containing controls and startup evidence; tap affected right button first
if practical. Exact toolbar probe distinguishes offscreen/disabled/occlusion from
DOM-healthy but visually broken UI; native iPad rendering gate remains OPEN.


.966 validation: full local Node24 suite2813 PASS/0 FAIL/0 skipped (95.0s);
focused Smudge/gesture/UI/debug/Lab/release41 PASS. New checks prove renewed work
windows retain pixels and cancellation baseline; long actual surface-picked Smudge
passes original12000 path budget, edits late pixels and commits ONE Undo/Redo entry;
right toolbar centre probes include headerY30 and persist in pageshow evidence.
Prior .965 hosted regression40181206048 has now completed SUCCESS. Exact supplied
refresh report observations are archived in docs/ui-debug-refresh-965-report.md.
Right-side native iPad failure remains OPEN; no rendering fix inferred.


## .967 — canvas/UI composition boundary; .966 invisible clickable controls — 25 October 2026

User reports right controls remain clickable while visually absent; switching away
to ChatGPT and back restores appearance. Exact .966 report10:22:08Z shows right
buttons on-screen/enabled/visible/opacity1, no transforms/filters/clip paths, exact
button/SVG hit stacks; Undo click reaches window bubble. Paintfalse/sessionnull.
Startup toolbar grows from134.56px wide at459ms to317.61px at649ms, with correct
layout but reported invisible pixels. Evidence points to painting/compositing, not
removed UI, offscreen layout, disabled controls or broad input interception. This
is an inference, NOT a locally reproduced WebKit-engine diagnosis.

Targeted repair in original stylesheet: viewportWrap isolated stack atz0, original
canvas bounded by contain:paint with its ownz0; header remainsz10 above viewport.
Header/status/Object Browser get isolated compositing hints via will-change:opacity,
without transforms, opacity changes, clipping UI menus or reparenting any control.
VIEW fixed popup remains viewport-relative; floating tools retain their own owners.
Original viewport-sizing scheduler now coalesces focus and visible-document events
through SAME resize/repaint owner; hidden-document events do not redraw. Teardown
removes both listeners. No synthetic resize, per-frame polling, DOM hiding, reload,
new renderer/history/input owner or modelling/paint changes. Debug snapshot records
contain/isolation/will-change so .967 layer rules can be verified on device.

.965 Paint UI PASS protected; .966 continuing-Smudge acceptance remains separate.
DEVICE967: refresh in landscape repeatedly, verify all right buttons/status and
Object Browser; interact before changing apps, enter/exit UV Editor and Paint,
rotate/orbit. Switch away/back verifies recovery does not lose UI/work. If invisible
controls recur, enable UI Debug before refresh and send Capture/Copy report plus
screenshot if practical. Repair remains an iPad gate until explicit feedback.


.967 validation: full local Node24 suite2815 PASS/0 FAIL/0 skipped (93.9s);
focused release/sizing/UV/Paint/debug checks40 PASS. New coverage checks focus/visible
return coalescing, hidden-document refusal and disposal; canvas containment and
untransformed/unclipped VIEW popup contract retained. A local Chromium layout smoke
was attempted but the installed Playwright package has no browser executable here;
no rendered-browser or native WebKit proof claimed. User's .966 report is archived
in docs/ui-debug-invisible-controls-966.md. Device visual gate remains OPEN.


## .967 protected user PASS — 25 October 2026

- [x] User PERFECT / PASS: right controls remain visible after landscape refresh and UI transitions; retain .967 canvas/UI isolation and visible-page repaint owner.
- [ ] Future icon builds: review three visual candidates per tool; install only refined user selections, with icon above small visible title. Preserve original action targets, radial positions, touch targets and history/gesture ownership.

Planning update only: runtime .967 unchanged; no new hands-on test required.

## Radial visual selection sheets v1 complete — 25 October 2026

Design review only; runtime remains .967 with protected user PERFECT/PASS. All65
semantic tools now have THREE original vector candidates:195 SVGs on10 sheets.
Delivered BoxLab-Icon-Selection.pdf, BoxLab-Icon-Review.html and
BoxLab-Icon-Review-Pack.zip (PDF/HTML/PNG sheets/SVGs/manifest/rebuild source).
No default/user icon selections; await tool-name + A/B/C choices, then refine before
installation. Shared symbols retained in one review row; Vertex/Object Join separate.
See docs/radial-icon-review-v1.md. No new app test or runtime release needed.

## .968 Face icon device review

- [x] Face radial shows23 Proof03 icons with original small captions; all tools route unchanged.
- [x] Extrude at12 and Bevel at3; icon area taps launch original tool; unavailable states remain clear.
- [x] Inner/outer icons remain legible on iPad; navigation, history and .967 right-toolbar visibility preserved.

## .969 Vertex icon device review

.968 Face icon review explicitly PASS on26 October2026.

- [x] Vertex radial shows14 selected Proof03 icons with small original captions and distinct Vertex Join.
- [x] Original positions/actions, available/disabled states, Build Edge/Slide/Bevel sessions and UndoRedo remain usable.
- [x] Navigation/right-side UI preserved; accepted Face icons unchanged.

## .970 Object icon device review

.969 Vertex icon review explicitly PASS on26 October2026; .968 Face PASS retained.

- [ ] Object radial shows13 approved icons and small captions; Object Join differs from Vertex Join.
- [ ] Longer labels fit; Duplicate/UndoRedo, Array/Solidify and UV/Mesh Health launch existing owners.
- [ ] Multi, navigation and right toolbar remain usable; Face/Vertex accepted icons unchanged.

## .971 Array + right UI device gate

- [ ] Default UV cube ordinary Array succeeds with independent UV copies, one UndoRedo entry and SaveOpen.
- [ ] Live Array native UVs survive count edits/reopen/Convert/UndoRedo and SaveOpen without reprojection.
- [ ] Paint/stale UVs refuse before changes; independent-copy failure leaves no partial scene.
- [ ] Right toolbar remains visible after refresh, Array/Cancel/Done and navigation; .970 recurrence OPEN until device feedback.

## .972 Plain UI rendering device gate

User Array971 works/PASS; right UI971 FAIL remains independent.

- [x] Ordinary and Live Array971 accepted by user (“Array now works”).
- [ ] Plain opaque UI keeps all right controls visible on repeated landscape refresh, before app switching.
- [ ] Object Browser/VIEW/UV Editor/Array transitions and navigation retain visible UI and unchanged hit targets.
- [ ] Disabled/active controls remain clear via original opacity, borders and stroke feedback.

## .973 Opt-in canvas diagnostic device gate

.972 visual fault persists with plain profile verified; Array971 user PASS retained.

- [ ] During failure: Hide3D only, observe right toolbar, record visible/missing without app switching.
- [ ] Show3D restores canvas/model; note whether right UI fails again.
- [ ] Copy report includes canvas-probe-observation and restored state.
- [ ] Debug off/pagehide always restores prior canvas visibility; no scene/history changes.

## .974 Edge icon device review

User reports cannot reproduce right visual fault currently; icon rollout resumed
by explicit instruction. Intermittent fault not marked fixed;973 probe retained.

- [x] All21 Edge icons match Proof03, small titles fit and outer targets do not overlap.
- [ ] Extrude12/Bevel3 and original tool actions/disabled states retained.
- [ ] Slide/Bevel/Loop/CutUV/StitchUV/UndoRedo and navigation remain usable.
- [ ] Face/Vertex/Object icons and Array PASS unchanged; watch right UI visibility.

## .975 World-plane Extrude pads

User .974 icons PASS; .975 functional gate separate.

- [ ] Both Edge/Vertex Extrude show original XY/XZ/YZ plane squares, selection highlight and named-plane badge.
- [ ] World XY holdsZ/XZ holdsY/YZ holdsX during drag, Exact and Repeat; arbitrary view orientation supported.
- [ ] CentreFree and XYZ arrows remain unchanged; Done/cancel/UndoRedo/navigation restore normally.
- [ ] Parallel-view refusals do not mutate mesh/history or leave captured input; orbit then retry.


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

## .982 Paint icons and protected .981 UV lifecycle

- [x] User PASS981: repeated UV open/Close and Editor return keep right controls visible without Refresh display; retain native top-layer release/host teardown.
- [x] User PASS982: all10 Paint icons match selected Proof03 with readable captions; original centre/control placements and selected/disabled feedback stay usable.
- [x] User PASS982: Brush/Blur/Smudge and Layers/Mask/Image/AO/Map size open original left controls; cycling keeps radial until Pencil surface use; background hold reopens.
- [ ] DEVICE982: Paint UndoRedo/Done, modelling icons and UV Close/right toolbar stay accepted.
- [x] Artwork audit:10 valid SVGs exact to Proof03, zero target-box overlaps, bounds fit existing350px radial.


## .983 startup toolbar / refresh recurrence

- [ ] OPEN: user982 reports invisible right controls immediately after refresh; several refreshes recovered.981 UV acceptance does not close startup visibility.
- [ ] DEVICE983: repeated reloads retain drawn right toolbar/status before navigation, UV entry, app-switch or rotation.
- [ ] DEVICE983: Frame All/UndoRedo/Focus/Objects/VIEW work once on original owners; right browser/menu bounds unchanged.
- [ ] DEVICE983: UV open/Close/Editor Back and accepted Paint icons/workflow remain usable.
- [x] Automated: single final ordered toolbar in shell; original VIEW/SVG nodes retained on hydration; Objects/Frame bind once; real camera fit; fallback creation retained.

## .983 native feedback — first-refresh failure

- [x] User functional PASS983 recorded; accepted Paint982 and original toolbar actions retained.
- [ ] FAILED/OPEN: first refresh still loses right controls on983; startup shell stabilization did not pass native visibility.
- [ ] Capture fresh983 UI Debug on FIRST failed load before any recovery or app-switch; static-toolbar hypothesis is not a confirmed root cause.

## .983 ground-region evidence — 27 October 2026

- [ ] OPEN: new capture has visible UI but missing right ground shading. Keep separate from earlier invisible-controls failure.
- [x] Supplied startup/pageshow toolbar width stable317.609375; canvas2732x1652; no active UV top layer. DOM evidence does not establish floor/shadow rendering.
- [x] Initial screenshot inspected: .983 top-right controls visible; straight vertical shading seam near right quarter; floor continues on both sides, separate sloping distant edge.
- [ ] Small orbit WITHOUT refresh/app-switch: report whether seam stays fixed on screen, moves with ground, or disappears before choosing source change. No repeat initial screenshot/debug dump needed.

## .984 selected-face group authoring

- [ ] Face mode: select faces, VIEW > Facegroups > name > Assign selected; only chosen faces change group.
- [ ] Same name joins group; different name separates; Clear selected leaves other groups intact.
- [ ] Undo/Redo, Save/Open retain groups and geometry/UVs; no UV requirement.
- [ ] No selection/wrong mode/active tool/locked/linked/recipe objects refuse without history.
- [x] Automated metadata, unchanged geometry/source, no-op, validation/refusal and checkpoint tests pass.
- [ ] Intermittent right-region rendering/gizmo loss remains OPEN; cannot currently reproduce, not repaired.

## .985 group-name reuse / .984 accepted

- [x] User PASS984 protects selected-face group assignment/clear, UndoRedo and Save/Open.
- [ ] Select faces in one group; Use selected group name copies its name, changes no faces or history.
- [ ] Mixed/ungrouped/no selection refuses pickup and retains current name.
- [ ] Focus name input: existing names offered once each; rename choice followed by Assign selected joins group.
- [ ] UndoRedo affects actual assignment only; Save/Open retains accepted984 behavior.
- [x] Automated read-only reuse, invalid/mixed refusal and safe option.value insertion checks pass.

## .986 Pencil facegroup strokes

- [x] User PASS985 protects existing-name reuse and984 authoring/history/save baseline.
- [ ] Face mode > VIEW Facegroups > name > Pencil facegroup strokes; stroke visible faces, lift assigns group. No UV required.
- [ ] Colours update ON LIFT; each changed stroke is one Undo/Redo entry, no-op strokes add none.
- [ ] Fingers navigate; second canvas contact cancels current stroke; Stop restores ordinary selection.
- [ ] Change/pick name and rearm; switch look stops brush; Save/Open retains groups.
- [x] Automated pure/real owner routing covers source-neutral staging, cancellation, lost capture/pagehide, controls restoration, stale context, one checkpoint and background Pencil navigation.
- [ ] Native Pencil/gesture acceptance pending; rendering fault remains OPEN independently.

## .987 Pencil facegroup eraser

- [x] User PASS986 protects named Pencil strokes and accepted history/navigation.
- [ ] VIEW Facegroups > Erase group strokes; sampled faces become ungrouped ON LIFT.
- [ ] Other groups/geometry/UVs unchanged; one Undo/Redo per changed erase stroke.
- [ ] Already ungrouped stroke adds no history; switch back to named strokes and Stop.
- [ ] Save/Open and finger navigation remain accepted; native eraser review pending.
- [x] Automated eraser staging/no-op/untouched data/checkpoint/cancel/switch tests pass.

## .988 existing-group dropdown repair / rendering recurrence

- [ ] Native Existing group dropdown opens on iPad; select existing name, assign new faces.
- [ ] Original Group text input creates new names; reopening VIEW lists current mesh groups.
- [ ] Selector choice changes no geometry/history and stops prior brush; UndoRedo affects actual assignment.
- [ ] Eraser987 and Save/Open remain device review; no987 PASS inferred.
- [x] Automated actual option population/change callbacks, refresh/empty/text safety and retained authoring/stroke regressions pass.
- [ ] OPEN: lower-right/VIEW menu blank or gone in987. DOM/hit health does not prove pixel rendering. See docs/ui-right-region-987.md.

## .989 VIEW panel diagnostics / .988 acceptance

- [x] User PASS988 protects native Existing group dropdown and related authoring flow.
- [ ] Normal VIEW/scroll/group picker remain usable with debug off.
- [ ] If fault recurs, debug on > VIEW attempt > Capture/Copy before recovery; report includes viewMenu.open, panel nodes/scroll and render/stroke state.
- [ ] No forced reproduction needed if fault absent; rendering issue stays OPEN.
- [x] Actual report/observer tests distinguish open/closed/missing, capture scroll/modes, keep DOM unchanged and avoid measurements when debug off.

## .990 closed VIEW surface lifecycle

- [ ] Fresh launch/reload: right UI drawn; VIEW closed initially, no ghost panel surface.
- [ ] Repeated VIEW open/close, scroll, group picker and tool buttons retain behavior.
- [ ] Debug closed VIEW: panel displaynone/zero rect; open VIEW: ordinary panel bounds/scroll.
- [x] Original toolbar/action/node identity, release and debug/authoring checks pass.
- [ ] OPEN: native right-region rendering;990 closed-surface hardening is not permanent repair proof.

## .991 compact facegroup paint dock

- [x] User PASS990 protects closed VIEW surface lifecycle and accepted menu/picker behavior.
- [ ] Open facegroup paint controls shows compact LEFT dock; VIEW closes, Face mode selected through original button.
- [ ] Existing group / completed name edit arms Paint; persistent Paint/Erase switch without reopening VIEW.
- [ ] Selected faces advanced Assign/Clear/Use name remain; strokes/UndoRedo/SaveOpen keep original behavior.
- [ ] Done stops brush/hides dock; mode/look/another tool closes it, navigation unaffected. Reopen retains original values.
- [x] Automated original-node/value/listener lifecycle, Done, command routing and active-tool refusal checks pass.
- [ ] Native iPad dock readability/tap/typing/picker gate pending; keep watch for rendering recurrence.

## .991 rendering recurrence evidence

- [x] Native991 VIEW open/close transitions and990 closed displaynone/zero bounds confirmed by report.
- [ ] FAILED/OPEN: user right-region visual loss recurs despite correct menu state; no permanent990 repair claim.
- [ ]991 left dock native UX still pending; parked authoring nodes legitimately have zero bounds until opened.
- [ ] If persistent: compare left dock visibility to affected right region; no repeat canvas/toggle dump requested.

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
