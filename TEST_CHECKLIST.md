YªçŠx-®éÜj×¢ëiºÚ+Š§j[h‘éÜ¢éíßM<÷}yãßzo+^²‰¢¶×## .1038 â€” UV subdivision timing gate

- [ ] From File â†’ Screen comparison / test list, open â€œUV subdivision timing Â· .1038â€ and run it on iPad without changing orientation/resolution.
- [ ] Confirm the benchmark reports geometry-only, continuous-chart and per-face-seam timings; it should not modify the current project.
- [ ] Copy and send the JSON report. It includes geometry parity, output topology, UV-corner counts, browser and DPR.
- [ ] If it stops on the1.2s per-sample guard or reports a validation mismatch, send the partial report.

Automated regression: `tests/subdivision-uv-benchmark-1038.test.mjs` verifies benchmark owner/presets/caps and both UV chart patterns across every case. It checks geometry output against the existing `subdivide()` result and verifies source UVs are not changed. The report measures CPU mesh/UV generation only; it does not validate image sampling, memory, GPU or rendered frame time, and it is not displacement-preview acceptance.

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
- [ ] Diagnostic .624: registration stack identifies owning module where poss×]µçkh‘éì¶»§q«^u•á…Ñ±äÑ¡”Í…µ”½Ù•É…”½½Á…ÅÕ”½ÍÑÉ…¥¡Ğµ…±Á¡„Ñ•á•°)½Á•É…Ñ¥½¸™½È‰ÉÕÍ …¹™¥±°¸9•ÜQ½½°Í•±•Ñ½È	ÉÕÍ €¼Q…À™¥±°ƒ
Üİ¡½±”½‰©•Ğ¸)A•¹¥°½µ½ÕÍ”‘½İ¸µÕÍĞ¡¥ĞÙ¥Í¥‰±”Í•±•Ñ•µ•Í ìİ¡½±”ÔÄË
ÈÍ•±•Ñ•±…å•È½¡…¹¹•°)ÁÉ•Ù¥•İÌ…ĞÕÉÉ•¹Ğ½Á…¥Ñä½Ù…±Õ”°É•±•…Í”½µµ¥ÑÌ½¹”Ù¥„½É¥¥¹…°™¥¹¥Í ½ÁÉ•™±¥¡Ğ¼)¡•­Á½¥¹Ğ½=\¸M¥é”½ÁÉ•ÍÍÕÉ”‘¼¹½Ğ±¥µ¥Ğ™¥±°¸É…œøáÁà°Á½¥¹Ñ•É…¹•°½Ñ½½°½¡…¹¹•°)Íİ¥Ñ ½‰½‘ä±½ÍÌ…¹•°ì™¥¹•ÉÌÍÑ¥±°¹…Ù¥…Ñ”°‰…­É½Õ¹½¹Ñ…ÑÌ¹•Ù•È™¥±°¸)½±½ÕÈ½¥µ…”½¡¥‘‘•¸µ±…å•È½Í…±…È•±¥¥‰¥±¥ÑäÕ…É‘ÌÉ•Ñ…¥¹•ì¥µ…”½±½ÕÈÉ•µ…¥¹Ì)É•…µ½¹±ä°•‘¥Ñ…‰±”µ…Í­Ì™¥±°¹½Éµ…±±ä¸9¼µ½À…‘‘Ì¹¼¡¥ÍÑ½ÉäìÅÕ½Ñ„½¡•­Á½¥¹Ğ)™…¥±ÕÉ”É•ÍÑ½É•Ì½É¥¥¹…°É•Í½ÕÉ”½ÁÉ•Ù¥•Ü½¹…Ù¥…Ñ¥½¸¸9¼Í¡•µ„½İÉ¥Ñ•È¡…¹•Ì¸((Ñ¹•Ü¥¹Ñ•É…Ñ¥½¹Ìè•á…ĞÍ¡…É•É…ÍÑ•È½Ù•É…”½…±Á¡„½¹¼µ½À½…¹•°ì…ÑÕ…°U$±…å•È)™¥±°…¹Í½ÕÉ”ÁÉ•Í•ÉÙ…Ñ¥½¸½U¹‘½I•‘¼½M…Ù•=Á•¸½¹…Ñ¥Ù”A9ì¥¹‘•Á•¹‘•¹ĞÍ…±…È­µ…Í¬)™¥±°ìµ•Í µ¥ÍÌ½™¥¹•È½‘É…œ½…¹•°½Í•ÑÑ¥¹Ì½‰½‘äµ±½ÍÌ½¡•­Á½¥¹ĞÉ½±±‰…¬¸9•…É‰äÄåAMLì)™Õ±°…¹ÁÕ‰±¥…Ñ¥½¸‰•±½Ü¸=É¥¥¹…°‰ÉÕÍ •áÁ•Ñ…Ñ¥½¹ÌÉ•Ñ…¥¹•°¹¼™É½é•¸½5Õ±Ñ¤½­•É¹•°)¡…¹•Ì¸I•Ù¥•İ•Í¡…É•É…ÍÑ•È½µ…¥¸­1…ˆÉ•Ù•ÉÍ”…¡”É…Á äÈØ½¹±ä¸()I•µ…¥¹¥¹œÉ•ÅÕ•ÍÑ•‰ÉÕÍ¡•Ì…É”…•ÁÑ•É½…‘µ…À°¹½Ğ‘•±¥Ù•É•‰ÕÑÑ½¹Ìè•É…Í•È(¡ÑÉ…¹ÍÁ…É•¹Ğ½Ù•É±…åÌ½µ…Í­Ìì•áÁ±¥¥Ğ	…Í”É•Í•ĞÍ•µ…¹Ñ¥Ì¤°…±Á¡„Ñ¥ÁÌ€¡‰½Õ¹‘•A9)½Ù•É…”½É½Ñ…Ñ¥½¸İ¥Ñ ½É¥¥¹…°‰ÉÕÍ ¤°‰±ÕÈ…¹ÍµÕ‘”İ¥Ñ UXµ¥Í±…¹½Í•…´µ…İ…É”)Í…µÁ±¥¹œÍ¼¹•¥¡‰½ÕÉ¥¹œ…Ñ±…Ì¥Í±…¹‘Ì…¹¹½Ğ½¹Ñ…µ¥¹…Ñ”Õ¹É•±…Ñ•ÍÕÉ™…•Ì¸)9¼	H¥µÁ½ÉĞ½È•¹•É…°9½µ…‰ÉÕÍ µ™½Éµ…Ğ½µÁ…Ñ¥‰¥±¥ÑäÁÉ½µ¥Í•¸AÉ•™•È…Õ‘¥Ñ•)-±•­Ì…±½É¥Ñ¡µÌ¥¸•á¥ÍÑ¥¹œÉ…ÍÑ•È½¥¹ÁÕĞ½¡¥ÍÑ½Éä½Ù•È…¹½Ñ¡•ÈÁ…¥¹Ñ¥¹œ•¹¥¹”¸)9•áĞ¹…ÉÉ½Ü‰Õ¥±èÉ•™±•Ñ¥½¸‘¥…¹½ÍÑ¥Œ•Ù¥‘•¹”Á±ÕÌ•É…Í•È½…±Á¡„¥µÁ±•µ•¹Ñ…Ñ¥½¸ì)­••À‰±ÕÈ½ÍµÕ‘”Í½Á”‰½Õ¹‘•…¹Ñ•ÍĞ‰•™½É”•áÁ½Í¥¹œ¸9¼¹•Üµ…Ñ•É¥…°¡…¹¹•°İ½É¬¸)Y%äÈØè¡½½Í”Q½½°Q…À¥±°°Ñ…Àµ•Í İ¥Ñ ¡½Í•¸½±½ÕÈìU¹‘½I•‘¼¸¥±°…¸½Ù•É±…ä)…ĞÔÀ”½Á…¥Ñäì½¹™¥É´Õ¹‘•É±å¥¹œÁ…¥¹ĞÉ•Ñ…¥¹•¸¥±°I½Õ¡¹•ÍÌ½5•Ñ…±¹•ÍÌÀ¼ÈÔÔ…¹)¡•¬¡…¹¹•°½•áÁ½ÉĞ¥¹‘•Á•¹‘•¹”ìÍİ¥Ñ 	ÉÕÍ …¹½¹™¥É´¹½Éµ…°A•¹¥°ÍÑÉ½­•Ì¸((¸äÈØ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØĞÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì)¹•Ü™¥±°ÑAML°¹•…É‰äÄåAML°É•±•…Í”ÕAML¸%¹¥Ñ¥…°ÁÉ•Á…É…Ñ¥½¸½¹ÑÉ…Ğ…Õ¡ĞÍ¡…É•)1…ˆÉ…ÍÑ•È½µ¥ÑÑ•™É½´±½…‘•È±½ÍÕÉ”ì½µÁ±•Ñ”µ…¥¸½1…ˆÉ…Á É•Ù¥•İ•…¹ÕÁ‘…Ñ•)‰•™½É”™¥¹…°ÉÕ¸¸9¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•ìÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸½•áÁ½ÉĞÉ•Ñ…¥¹•¸)I•™±•Ñ¥½¸äÈÔÉ•µ…¥¹ÌÕÍ•ÈµÉ•Á½ÉÑ•Õ¹É•Í½±Ù•°¹¼±¥¡Ñ¥¹œ™¥à±…¥´¥¸äÈØ¸)AÕ‰±¥…Ñ¥½¸…¹¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½Ü¸((ŒŒ€¸äÈØÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÍˆÀÅ‰”ÅØÙˆİ„ÀÙˆÈÈàØÔØÔàÄÅ˜Õ”ØÜäØÉ…ˆäÅ™€°Ñ•ÍÑ•ÑÉ•”)”ØÀØÄĞİ”ÌÁˆá˜àÙ‘”İˆÀÀåˆÈÕŒÌÅ…˜ÔÌØäØÍ•‘•€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ğ…Ñ„)É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°Ñ•ÍÑ•±½…°ÑÉ•”ì™•Ñ¡•½É¥¥¸½µ…¥¸µ…Ñ¡••á…Ñ±ä¸)1½…°9½‘”ÈĞ…¹¡½ÍÑ•É•É•ÍÍ¥½¸€ÌäÌØÔÀÄàÌÈÙ€€¼©½ˆ€ÄÄàĞÌäÜÔääÌİ€‰½Ñ Á…ÍÌ(È°ØĞÀÑ•ÍÑÌ°é•É¼™…¥±ÕÉ•Ì½Í­¥ÁÌì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•Ì)€ÌäÌØÔÀÄÜÔÀÁ€°‘•Á±½ä©½ˆ€ÄÄàĞÌäààäÜĞİ€°½µÁ±•Ñ•…±°ÍÑ•ÁÌÍÕ•ÍÍ™Õ±±ä¸)±°Ää™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Í½ÕÉ”èÍ¡•±°½Ù•ÉÍ¥½¸°µ…¥¸Á…¥¹Ñ•È½½É”°Í¡…É•)É…ÍÑ•È…¹½µÁ±•Ñ”¡…¹•1…ˆÍ•ÍÍ¥½¸½±½…‘•ÈÉ…Á °É•½Ù•Éä°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°)É•Ñ…¥¹•Í…±…È½½‘•Œ½¹…Ñ¥Ù”•áÁ½ÉĞ½Á…¥¹Ğ•áÁ½ÉĞ½µ…Ñ•É¥…°½É•™±•Ñ¥½¸½UX½İ¹•ÉÌ¸)%¹¥Ñ¥…°¥¸µ™±¥¡ĞÉ•…‘ÌÍ•ÉÙ•äÈÔì™¥¹…°¡•­•É…Á µ…Ñ¡•ÌäÈØ¸9¼™É½é•¸°)µ½‘•±±¥¹œ°ÁÉ½©•Ğ½È•áÁ½ÉĞ…±½É¥Ñ¡´¡…¹”ì½É¥¥¹…°‰ÉÕÍ Í•µ…¹Ñ¥ÌÉ•Ñ…¥¹•¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ĞìÁÉ½½˜¥Ì‘½Ìµ½¹±ä¸	Õ¥±äÈØ½µÁ±•Ñ”…¹É•…‘ä)™½ÈQ½½°ƒŠHQ…À™¥±°ƒ
Üİ¡½±”½‰©•ĞèÑ…À½±½ÕÈ™¥±°½U¹‘½I•‘¼°½Ù•É±…äÔÀ”ÁÉ•Í•ÉÙ…Ñ¥½¸°)Í…±…ÈÀ¼ÈÔÔ¥¹‘•Á•¹‘•¹”…¹É•ÑÕÉ¸Ñ¼	ÉÕÍ ¸±Á¡„Ñ¥ÁÌ°•É…Í•È°‰±ÕÈ…¹ÍµÕ‘”…É”)É•ÅÕ•ÍÑ•Á•¹‘¥¹œÍÑ…•Ì°¹½Ğ¥µÁ±•µ•¹Ñ•¸I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÉ•µ…¥¹ÌÕÍ•ÈµÉ•Á½ÉÑ•)Õ¹É•Í½±Ù•‘•ÍÁ¥Ñ”äÈÔ°¹¼¹•Ü±¥¡Ñ¥¹œÉ•Á…¥È±…¥µ•¸9½µ…•áÁ½ÉĞ½¹™¥Éµ•É•…Ğ)…¹ÁÉ½Ñ•Ñ•ìäÈĞÑ½½±‰…ÈAMLÁÉ½Ñ•Ñ•¸9•áĞèäÈØ‘•Ù¥”™••‘‰…¬°¹…ÉÉ½Ü•É…Í•È¼)…±Á¡„…‘‘¥Ñ¥½¹Ì…¹•Ù¥‘•¹”µ±•ÁÉ•Ù¥•Ü‘¥…¹½Í¥ÌÑ¡É½Õ ½É¥¥¹…°½İ¹•ÉÌ¸((ŒŒ€¸äÈÜƒŠP•áÁ±¥¥ĞÍ…±…È±…‰•°É½İÌ…¹É…Í•ÈƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäÈÙAMLÁÉ½Ñ•ÑÌİ¡½±”µ½‰©•ĞQ…À¥±°½½Á…¥Ñä½¡¥ÍÑ½Éä½¡…¹¹•°İ½É­™±½Ü¸MÉ••¹Í¡½Ğ)¥‘•¹Ñ¥™¥•Ì•…É±¥•Èµ•Ñ…°İ¡¥Ñ”½‰±…¬½¹™ÕÍ¥½¸…Ì¥¹±¥¹”¡¥¹ĞÑ•áĞ©½¥¹¥¹œÉ•…‘½ÕĞè+ŠpÈÔÕ	±…¯Š›Št€¼ƒŠpÁ	±…¯Š›Št¸9¼¥¹Ù•ÉÑ•‰åÑ•Ì¸M¡…É•Í…±…È½¹ÑÉ½±Ì¹½ÜÉ¥É½İÌè)±…‰•°€¬™±•á¥‰±”Í±¥‘•È€¬™¥á•Í É•…‘½ÕĞ°Ñ¡•¸Í•Á…É…Ñ”‰±½¬¡¥¹ÑÌ¸áÁ±¥¥Ğ(Àõ¹½¸µµ•Ñ…°¡‰±…¬¤¼ÈÔÔõµ•Ñ…°¡İ¡¥Ñ”¤ìÉ½Õ¡¹•ÍÌÀõÍµ½½Ñ ¡‰±…¬¤¼ÈÔÔõÉ½Õ ¡İ¡¥Ñ”¤¸)!•±À…¹¹½ĞÍ¥Ğ‰•Í¥‘”¹Õµ•É¥Œ½ÕÑÁÕĞ¸½µÁ…Ğ1P‘½¬½ÍÉ½±°½™½½Ñ•ÈÉ•Ñ…¥¹•¸)9¼Í…±…È½‘…Ñ„½•áÁ½ÉĞ½±¥¡ĞÍ•µ…¹Ñ¥Œ¡…¹”ìÉ•™±•Ñ¥½¸äÈÔÉ•µ…¥¹ÌÍ•Á…É…Ñ”Õ¹É•Í½±Ù•)É•Á½ÉĞ°¹½Ğ¥µÁ±¥•AML™É½´äÈØ½ÈÑ¡¥Ì±…É¥™¥…Ñ¥½¸¸9…Ñ¥Ù”•áÁ½ÉĞÁÉ½Ñ•Ñ•¸()9•áĞÉ•ÅÕ•ÍÑ•¹…ÉÉ½Ü‰ÉÕÍ è½É¥¥¹…°Q½½°Í•±•Ñ½È…¥¹ÌÉ…Í•È¸M…µ”Í…µÁ±•ÉÌ°)ÁÉ•ÍÍÕÉ”½Í¥é”½¡…É‘¹•ÍÌ½µ…á¥µÕ´Á•Èµ½¹Ñ…Ğ½Ù•É…”…¹•á¥ÍÑ¥¹œ½µµ¥Ğ½¡•­Á½¥¹Ğ¼)=\½Á½½±Ì¸QÉ…¹ÍÁ…É•¹Ğ½±½ÕÈ½Ù•É±…åÌÉ•‘Õ”…±Á¡„½¹±ä°É•Ñ…¥¹¥¹œI½Í½ÕÉ”½‰…Í”ì)	…Í”É•Í•ÑÌİ¡¥Ñ”¸I½Õ¡¹•ÍÌÉ•Í•ÑÌÈÔÔ°5•Ñ…±¹•ÍÌÀ°µ…Í­ÌÉ•Ù•…°€¡É…ÜÀ¥˜¥¹Ù•ÉÑ•°(ÈÔÔ½Ñ¡•Éİ¥Í”¤¸=É¥¥¹…°¥µ…”½±½ÕÈÍÑ…åÌÉ•Ñ…¥¹•½É•…µ½¹±äì•É…Í”¥ÑÌµ…Í¬¸)9¼Í•¹”½µ…Ñ•É¥…°½Á…¥Ñä°‘•ÍÑÉÕÑ¥Ù”¥µ…”‰…­¥¹œ½È‘•±•Ñ¥½¸½˜±…å•È½É•Í½ÕÉ”¸)½±½ÕÈ½¹ÑÉ½±Ì‘¥Í…‰±”™½ÈÉ…Í•È…¹É•ÍÑ½É”½¸É•ÑÕÉ¸ì½±½ÕÈ‰ÉÕÍ Í•ÑÑ¥¹œÉ•Ñ…¥¹•¸)…¹•±±…Ñ¥½¸½Í•ÑÑ¥¹Ì½‰½‘äµ±½ÍÌ½™…¥±•¡•­Á½¥¹ĞÉ•Ñ…¥¸½É¥¥¹…°Á¥á•±Ì½¡¥ÍÑ½Éä¸)=É¥¥¹…°	ÉÕÍ …¹…•ÁÑ•Q…À¥±°É•Ñ…¥¸Í•µ…¹Ñ¥Ìì¹¼¹•ÜÁ½¥¹Ñ•È½¡¥ÍÑ½Éä½İ¹•È¸((Í¹•Ü¥¹Ñ•É…Ñ¥½¸Ñ•ÍÑÌ½Ù•È…±Á¡„½Ù•É…”½I½¹¼µ½À½…¹•°ì…ÑÕ…°U$½Ù•É±…ä½	…Í”)¥Í½±…Ñ¥½¸€¬U¹‘½I•‘¼½M…Ù•=Á•¸½•á…Ğ½µÁ½Í•¹…Ñ¥Ù”A9ì‘•™…Õ±ÑÌ½µ…Í¬¥¹Ù•ÉÍ¥½¸¼)Í…±…È¥¹‘•Á•¹‘•¹”…¹É•™ÕÍ…°É½±±‰…¬¸á¥ÍÑ¥¹œ™¥±°½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌ½µ…Í¬ÈÍAMLì)™Õ±°½…¡”½ÁÕ‰±¥…Ñ¥½¸‰•±½Ü¸M¡…É•µ…¥¸½1…ˆÉ…ÍÑ•ÈÉ•Ù•ÉÍ”É…Á É•Á¥¹¹•äÈÜ½¹±äì)ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸½µ½‘•±±¥¹œ½UX½ÁÉ½©•Ğ½¹…Ñ¥Ù”İÉ¥Ñ•ÈÕ¹¡…¹•¸)Y%äÈÜèÉ•…5•Ñ…±¹•ÍÌÀ¼ÈÔÔ¡¥¹Ğ‰•±½ÜÍ±¥‘•Èİ¥Ñ ¹¼©½¥¹•Ñ•áĞì•É…Í”„Á…¥¹Ñ•)½Ù•É±…äÑ¼É•Ù•…°±½İ•ÈÁ…¥¹Ğ°U¹‘½I•‘¼ì•É…Í”	…Í”½Í…±…ÉÌ°Íİ¥Ñ 	ÉÕÍ ½¥±°‰…¬¸)±Á¡„A9Ñ¥ÁÌ¹•áĞ°UXµÍ…™”‰±ÕÈ½ÍµÕ‘”É•µ…¥¸ÅÕ•Õ•¸I•™±•Ñ¥½¸‘¥…¹½Í¥ÌÉ•µ…¥¹Ì)½Á•¸…¹Í¡½Õ±ÕÍ”‘•Ù¥”½Ù•ÉÍ¥½¸½É•¹‘•É•È•Ù¥‘•¹”°¹¼™ÕÉÑ¡•È±¥¡Ñ¥¹œÕ•ÍÍ•Ì¸((¸äÈÜ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸Àè€¨¨È°ØĞÌAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì(Í¹•Ü•É…Í•È¥¹Ñ•É…Ñ¥½¹Ì°¹•…É‰äÈÍAML…¹É•±•…Í”ÕAML¸9¼Ñ•ÍÑÌÉ•±…á•¸)AÉ½Ñ•Ñ•äÈØ¥±°¼äÈĞÑ½½±‰…È½¹…Ñ¥Ù”•áÁ½ÉĞ½5Õ±Ñ¤Ä¸À½™É½é•¸É•Ñ…¥¹•¸M…±…Èµ…ÁÁ¥¹œ)Õ¹¡…¹•ì±…å½ÕĞ½‘•Ù¥”½¹™¥Éµ…Ñ¥½¸…¹É…Í•È¡…¹‘Ìµ½¸…Ñ”Á•¹‘¥¹œ¸)AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•É•É•ÍÍ¥½¸½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½İÌ¸((ŒŒ€¸äÈÜÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€É™…ˆÍ•ˆÜĞÍÀÁ…‘™ˆäÍŒÀÔÌäÔİ…Åå‰”á˜Ù˜Øá€°Ñ•ÍÑ•ÑÉ•”)Œäİ„àĞÈÍ˜ÈÌÙ…•ŒÔĞÉˆÌÄĞÔĞÅˆå„äÔÈäàĞİˆÀĞÄÍ€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ğ…Ñ„)É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°Ñ•ÍÑ•±½…°ÑÉ•”ì™•Ñ¡•½É¥¥¸½µ…¥¸µ…Ñ¡••á…Ñ±ä¸)1½…°9½‘”ÈĞ…¹¡½ÍÑ•É•É•ÍÍ¥½¸€ÌäÌØääàĞÔÔÍ€€¼©½ˆ€ÄÄàĞÔÔĞÌÌäàÕ€‰½Ñ Á…ÍÌ(È°ØĞÌÑ•ÍÑÌ°é•É¼™…¥±ÕÉ•Ì½Í­¥ÁÌì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•Ì)€ÌäÌØääàĞÄÄÙ€°‘•Á±½ä©½ˆ€ÄÄàĞÔÔÔààØÀá€°½µÁ±•Ñ•…±°ÍÑ•ÁÌÍÕ•ÍÍ™Õ±±ä¸)±°Ää™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Í½ÕÉ”èÍ¡•±°½Ù•ÉÍ¥½¸°Á…¥¹Ñ•È½½É”½Í¡…É•É…ÍÑ•È°)½µÁ±•Ñ”¡…¹•1…ˆÉ…Á °É•½Ù•Éä°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°É•Ñ…¥¹•Í…±…È½½‘•Œ½¹…Ñ¥Ù”)…¹Á…¥¹Ğ•áÁ½ÉĞ½µ…Ñ•É¥…°½É•™±•Ñ¥½¸½UX½İ¹•ÉÌ¸%¹¥Ñ¥…°¥¸µ™±¥¡ĞÉ•…‘ÌÍ•ÉÙ•äÈØì)™¥¹…°¡•­•É…Á µ…Ñ¡•ÌäÈÜ¸9¼™É½é•¸½µ½‘•±±¥¹œ½UX½ÁÉ½©•Ğ½İÉ¥Ñ•È¡…¹•Ì¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ĞìÁÉ½½˜¥Ì‘½Ìµ½¹±ä¸	Õ¥±äÈÜ½µÁ±•Ñ”…¹É•…‘ä)™½È±…‰•°Í•Á…É…Ñ¥½¸½•áÁ±¥¥ĞÀ´ÈÔÔµ•…¹¥¹œ…¹Q½½°É…Í•È½Ù•É±…äÉ•Ù•…°½U¹‘½I•‘¼°)	…Í”İ¡¥Ñ”½Í…±…È‘•™…Õ±ÑÌ…¹É•ÑÕÉ¸Ñ¼	ÉÕÍ ½…•ÁÑ•Q…À¥±°¸ÑÕ…°¥A…Ñ•áĞ)±…å½ÕĞ…¹É…Í•È™••°É•µ…¥¸‘•Ù¥”µÁ•¹‘¥¹œì…ÕÑ½µ…Ñ•Ñ•ÍÑÌ…É”¹½ĞÙ¥ÍÕ…°ÁÉ½½˜¸)UÍ•ÈäÈØ¥±°…¹äÈĞÑ½½±‰…ÈAMLÁÉ½Ñ•Ñ•ì¹…Ñ¥Ù”•áÁ½ÉĞ½ÉÉ•Ğ¸±Á¡„A9Ñ¥ÁÌ)¹•áĞìUXµÍ…™”‰±ÕÈ½ÍµÕ‘”Á•¹‘¥¹œ¸I•™±•Ñ¥½¸äÈÔÉ•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•°)¹½Ğ„Í±¥‘•È¥¹Ù•ÉÍ¥½¸½È…¸¥¹™•ÉÉ•AML™É½´Ñ¡”½ÉÉ•Ñ•¡•±ÀÑ•áĞ¸((ŒŒ€¸äÈàƒŠPA…¥¹ĞÍÑ…åÌ½Á•¸…É½ÍÌU¹‘¼½I•‘¼ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸äÈÜAMLÁÉ½Ñ•Ñ•èÍ…±…È¡¥¹Ğ±…å½ÕĞ…¹É…Í•È°…±½¹Í¥‘”€¸äÈØ¥±°…¹(¸äÈĞÑ½½±‰…È¸I•ÅÕ•ÍÑ•¡¥ÍÑ½Éä•ÍÑÕÉ”™¥àÑ…­•ÌÁÉ¥½É¥Ñä½Ù•ÈA9…±Á¡„Ñ¥ÁÌ¸)Õ‘¥Ğè½É¥¥¹…°µ…¥¸‘½U¹‘¼½‘½I•‘¼É•ÍÑ½É•ÌÍ•¹”½‰½‘ä…¹Á…¥¹Ñ•È±½Í•Ì½¸‘¥ÍÁ½Í…°ì)A…¥¹Ğ™½½Ñ•È…±Í¼•áÁ±¥¥Ñ±ä±½Í•¸=É¥¥¹…°¡¥ÍÑ½Éä½İ¹•È¹½Ü‰É…­•ÑÌÉ•ÍÑ½É…Ñ¥½¸)İ¥Ñ Á…¥¹Ñ•ÈÁÉ•Á…É…Ñ¥½¸½É•ÍÕµ”¸…¹•°ÑÉ…¹Í¥•¹ĞÍÑÉ½­”½¥µ…”‰•™½É”…ÁÑÕÉ”°±½Í”)½±‘¥ÍÁ±…ä°É•½Á•¸½¸É•‰Õ¥±Ğ…Ñ¥Ù”‰½‘äìÉ•Ñ…¥¸±…å•È¥˜ÁÉ•Í•¹Ğ°¡…¹¹•°½µ…Í¬¥˜)Ù…±¥°1¥Ğ½¡…¹¹•°ÁÉ•Ù¥•Ü…¹•á¥ÍÑ¥¹œ‰ÉÕÍ ½…Ñ¥½¸½Í±¥‘•È½¹ÑÉ½±Ì¸9¼‘ÕÁ±¥…Ñ”)¡¥ÍÑ½Éä½È•ÍÑÕÉ”½İ¹•È½¡•­Á½¥¹Ğ¸µÁÑä¡¥ÍÑ½Éä…¹É…Á¥É•Á•…Ñ•¡¥ÍÑ½ÉäÉ•Ñ…¥¸)A…¥¹Ğì½¹”½½Ñ¡•ÈÍ•ÍÍ¥½¸½½‰©•Ğ¡…¹•Ì‘•™•…ĞÍÑ…±”É•½Á•¸¸=É¥¥¹…°Ñİ¼½Ñ¡É•”µ™¥¹•È)•ÍÑÕÉ•Ì°Ñ½½±‰…È…¹™½½Ñ•ÈÍ¡…É”Ñ¡¥ÌÁ…Ñ ¸¥Ù”É•É•ÍÍ¥½¹Ì•á•ÕÑ”½É¥¥¹…°µ…¥¸)U¹‘¼½I•‘¼…¹Ñ½Õ µ•¹™Õ¹Ñ¥½¹Ìİ¥Ñ É•…°Í•¹”Í¹…ÁÍ¡½ÑÌ°Á…¥¹ĞÉ•Í½ÕÉ•Ì…¹U$¸)I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÉ•µ…¥¹ÌÕ¹É•Í½±Ù•ì¹…Ñ¥Ù”9½µ…•áÁ½ÉĞÉ•µ…¥¹Ì½ÉÉ•Ğ¸±Á¡„)A9Ñ¥ÁÌ¹•áĞ°UXµÍ…™”‰±ÕÈ½ÍµÕ‘”Á•¹‘¥¹œ¸•Ù¥”€¸äÈà…•ÁÑ…¹”Á•¹‘¥¹œ¸((´mát€¸äÈàèÁ…¥¹ĞÑİ¼µ…É­Ì°Ñİ¼µ™¥¹•ÈU¹‘¼Ñ¡•¸½¹Ñ¥¹Õ”Á…¥¹Ñ¥¹œİ¥Ñ¡½ÕĞÉ•½Á•¹¥¹œ¸(´mát€¸äÈàèÑ¡É•”µ™¥¹•ÈI•‘¼…¹A…¥¹Ğ™½½Ñ•ÈU¹‘¼½I•‘¼­••À¡…¹¹•°½Ñ½½°Í•ÑÑ¥¹Ì¸(´mát€¸äÈàè½¹”ÍÑ¥±°•á¥ÑÌA…¥¹ĞìÉ…Á¥¡¥ÍÑ½Éä‘½•Ì¹½ĞÉ•½Á•¸„±½Í•Í•ÍÍ¥½¸¸((¸äÈà±½…°9½‘”ÈĞ™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ØĞàAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì)™¥Ù”¹•Ü¡¥ÍÑ½ÉäÉ•É•ÍÍ¥½¹Ì…¹É•Ù¥•İ•É•±•…Í”½¹ÑÉ…ĞÕAML¸AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À)…¹™É½é•¸‰Õ¥±‘ÌÕ¹¡…¹•¸AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”µ‰åÑ”Ù•É¥™¥…Ñ¥½¸™½±±½İÌ¸((ŒŒ€¸äÈàÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ØÔàÑ˜áÀØÁ‘‰‰”á„ÔÉ˜äÀÅàÄÑØÔÕ•”ĞÈÀå‰…€°Ñ•ÍÑ•ÑÉ•”)”ÔÔÑ˜ÁŒÜÜÀÄá•ˆÑˆÍ™ĞÄÌÑ…ˆàÁ˜ÔÁ„á‰‘‘äÁ€°ÁÕ‰±¥Í¡•Ñ¡É½Õ ½¹¹•Ñ•¥Ğ…Ñ„)İ¥Ñ Ñ¡”•á…Ğ±½…±±äÑ•ÍÑ•ÑÉ•”ì™•Ñ¡•½É¥¥¸½µ…¥¸µ…Ñ¡•…¹İ½É­¥¹œÑÉ•”±•…¸¸)1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÉÕ¸€ÌäÌÜÌÈÀØÄàİ€°©½ˆ€ÄÄàĞØÔĞÌÔàĞÉ€°)‰½Ñ €¨¨È°ØĞàAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì™Õ±°¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•¸A…•ÌÉÕ¸)€ÌäÌÜÌÈÀÔÔÌİ€°‘•Á±½ä€ÄÄàĞØÔÔÜÌÈÀÉ€°½µÁ±•Ñ•ÍÕ•ÍÍ™Õ±±ä¸±°ÄÜ¡•­•™É•Í )±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°¡…¹•µ…¥¸½Á…¥¹Ñ•È°É•½Ù•Éä°Õ¹¡…¹•Á…¥¹Ğ)½É”½É…ÍÑ•È½Í…±…È½ÁÉ½©•Ğ½•áÁ½ÉĞ½É•™±•Ñ¥½¸½UX…¹ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À¸É½é•¸‰Õ¥±‘Ì)Õ¹¡…¹•¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ĞìÑ¡¥ÌÁÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±ä¸()	Õ¥±äÈà½µÁ±•Ñ”…¹É•…‘ä™½ÈÑİ¼µ™¥¹•ÈU¹‘¼€¼Ñ¡É•”µ™¥¹•ÈI•‘¼İ¡¥±”A…¥¹ĞÍÑ…åÌ)½Á•¸°½¹Ñ¥¹Õ•A•¹¥°ÍÑÉ½­•Ì°É•Ñ…¥¹•¡…¹¹•°½ÁÉ•Ù¥•Ü½‰ÉÕÍ ½¹ÑÉ½±Ì…¹½É¥¥¹…°)A…¥¹Ğ™½½Ñ•È¡¥ÍÑ½Éä¸½¹”ÍÑ¥±°±½Í•Ì¸UÍ•ÈäÈÜAMLÁÉ½Ñ•Ñ•ì…ÑÕ…°äÈà¥A…)…•ÁÑ…¹”Á•¹‘¥¹œ¸I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÉ•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•ì¹…Ñ¥Ù”•áÁ½ÉĞ)½ÉÉ•Ğ¸9•áĞ‰½Õ¹‘•A9…±Á¡„Ñ¥ÁÌìUXµÍ…™”‰±ÕÈ½ÍµÕ‘”Á•¹‘¥¹œ¸((ŒŒ€¸äÈäƒŠPA9…±Á¡„‰ÉÕÍ Ñ¥ÁÌì€¸äÈàÕÍ•ÈAMLƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸äÈàAMLÁÉ½Ñ•ÑÌA…¥¹ĞÍÑ…å¥¹œ½Á•¸…É½ÍÌÑİ¼½Ñ¡É•”µ™¥¹•È…¹™½½Ñ•È)U¹‘¼½I•‘¼°É•Ñ…¥¹•½¹ÑÉ½±Ì…¹½¹Ñ¥¹Õ•A•¹¥°ÍÑÉ½­•Ì¸Õ‘¥Ğµ…¥¸Õ•”á‰ˆÔĞè)½É¥¥¹…°Í¡…É•É…ÍÑ•È½¥¹ÁÕĞ½¡¥ÍÑ½Éä…±É•…‘ä½İ¸‰ÉÕÍ …¹É…Í•Èì¹¼ÕÍÑ½´Ñ¥À)¥µÁ½ÉÑ•È½Í…µÁ±•È¸‘‰½Õ¹‘•A9½Ù•É…”Ñ¡É½Õ Ñ¡½Í”M5½İ¹•ÉÌ°É•ÕÍ¥¹œäÀÜ)¥µ…”ÁÉ•™±¥¡Ğ½‘•½‘”¸	ÉÕÍ Í•ÑÑ¥¹Ìè1½……±Á¡„A9€¼É½Ñ…Ñ¥½¸€¼I½Õ¹Ñ¥À¸)A9Š&ÈÔÛ
È¼ÈÔÙ-¥°±Õµ¥¹…¹—]…±Á¡„½Ù•É…”ìİ¡¥Ñ”Á…¥¹ÑÌ°‰±…¬½ÑÉ…¹ÍÁ…É•¹ĞÍ­¥ÁÌ¸)=İ¹•HàÑ¥ÃŠ&ØÑ-¥°½Á¥•Á•È½¹Ñ…ĞìÑ½Àµ™¥ÉÍĞ½…ÍÁ•ĞµÁÉ•Í•ÉÙ¥¹œÉ½Ñ…Ñ•‰¥±¥¹•…È)Í…µÁ±¥¹œ¥¸UXÑ•á•±Ì¸±Á¡„É•Á±…•ÌÉ½Õ¹¡…É‘¹•ÍÌ°½É¥¥¹…°ÁÉ•ÍÍÕÉ”½½Á…¥Ñä…À¼)Í½ÕÉ”µ½Ù•È½•É…Í”½…¹•°É•Ñ…¥¹•¸]¡½±”µ½‰©•Ğ¥±°¥¹½É•ÌÑ¥À¸9¼¹•ÜÁ½¥¹Ñ•È°)¡¥ÍÑ½Éä°Á…¥¹ĞµÉ•Í½ÕÉ”½ÁÉ½©•Ğ½¹…Ñ¥Ù”İÉ¥Ñ•È½Èµ½‘•±±¥¹œ­•É¹•°¸Q¥ÁÌ½É½Ñ…Ñ¥½¸…É”)Í•ÍÍ¥½¸ÁÉ•™•É•¹•Ì°É•Ñ…¥¹•Ñ¡É½Õ äÈàÉ•½Á•¸‰ÕĞ¹½ĞÍ…Ù•¥¸¹‰½á±…ˆ¸5…É­ÌÁ•ÉÍ¥ÍĞ¸)1…Ñ”½¥¹Ù…±¥¥µÁ½ÉÑÌÉ•Ñ…¥¸ÁÉ•Ù¥½ÕÌÑ¥À…¹½µµ¥ÑÑ•İ½É¬ì½É¥¥¹…°‘•½‘”±•…¹ÕÀ¸)I•…‘½Ì½Á…¥¹Ğµ…±Á¡„´äÈä¹µ¸½ÕÈ™½ÕÍ•Ñ•ÍÑÌ½Ù•È±¥µ¥ÑÌ½±•…¹ÕÀ½½Ù•É…”½İ¹•ÉÍ¡¥À°)É½Ñ…Ñ¥½¸½…ÍÁ•Ğ½…¹•°½•É…Í”°É•…°U$½¡¥ÍÑ½Éä½ÁÉ½©•Ğ½¹…Ñ¥Ù”A9…¹…Íå¹ŒÉ•™ÕÍ…°¸)=É¥¥¹…°Í¡…É•É…ÍÑ•ÈÉ•Ù•ÉÍ”µ…¥¸½1…ˆ…¡”É…Á äÈäÉ•Ù¥•İ•ì5Õ±Ñ¤Ä¸À½™É½é•¸¥¹Ñ…Ğ¸)I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÉ•µ…¥¹ÌÕ¹É•Í½±Ù•°¹…Ñ¥Ù”•áÁ½ÉĞ½ÉÉ•Ğ¸±Á¡„‘•Ù¥”…Ñ”Á•¹‘¥¹œ¸)9•áĞ‘•Ù¥”…±Á¡„™••‘‰…¬°Ñ¡•¸UXµÍ…™”‰±ÕÈ½ÍµÕ‘”ìÙ¥•İÁ½ÉĞ½‰…­•<…¹‘”µ‰…Í•)Í•…´µ…ÕÑ¡½É¥¹œÉ•µ…¥¸ÅÕ•Õ•™½È•á¥ÍÑ¥¹œµ½İ¹•È…Õ‘¥ÑÌ°¹½Ğ‘•±¥Ù•É•™•…ÑÕÉ•Ì¸)Y…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½İÌì¹¼É•¹‘•É•½È‘•Ù¥”Á•É™½Éµ…¹”±…¥´¸((´lt€¸äÈäè	ÉÕÍ Í•ÑÑ¥¹ÌƒŠH1½……±Á¡„A9ƒŠ&ÈÔÛ
Èìİ¡¥Ñ”Á…¥¹ÑÌ°‰±…¬½ÑÉ…¹ÍÁ…É•¹ĞÍ­¥ÁÌ¸(´lt€¸äÈäèÉ½Ñ…Ñ”…Íåµµ•ÑÉ¥…°Ñ¥À°Á…¥¹Ğ½•É…Í”½Ù•É±…äìU¹‘¼½I•‘¼ÍÑ…åÌ¥¸A…¥¹Ğ¸(´lt€¸äÈäèI½Õ¹Ñ¥ÀÉ•ÍÑ½É•Ì¥ÉÕ±…È‰ÉÕÍ ìM…Ù”½=Á•¸…¹9=5É•Ñ…¥¸Á…¥¹Ñ•µ…É­Ì¸((¸äÈä™¥¹…°±½…°9½‘”ÈĞ¸Ää¸Àè€¨¨È°ØÔÈAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)½ÕÈ¹•Ü…±Á¡„Ñ•ÍÑÌ…¹½É¥¥¹…°¹•…É‰äÄáAMLìÉ•±•…Í”½…¡”¡•­Ì¥¹±Õ‘•¸)9¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸M¡…É•É…ÍÑ•Èµ…¥¸½1…ˆÉ•Ù•ÉÍ”É…Á äÈäÉ•Ù¥•İ•ì5Õ±Ñ¤Ä¸À)…¹™É½é•¸‰Õ¥±‘ÌÕ¹¡…¹•¸AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½İÌ¸((ŒŒ€¸äÈäÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”Œå˜Èå™„ÈĞÁ™„àİ„Ñ„ÌÌÄÀÄÌàÀÔáˆÅŒÙ˜äÀÙ”Ôá…€°Ñ•ÍÑ•ÑÉ•”)…™‘˜ÜİŒá‘˜ØÄÉ˜ĞÄÄØÔå•„Å™˜äÔÍˆÕ…‘”ØäÉ™€°ÁÕ‰±¥Í¡•Ù¥„½¹¹•Ñ•¥Ğ…Ñ„¸)±°ÄàÕÁ±½…‘•‰±½‰Ì…¹ÑÉ•”µ…Ñ ±½…±±äÑ•ÍÑ•Í½ÕÉ”ì™•Ñ¡•µ…¥¸¥‘•¹Ñ¥…°¸)1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäĞÀäÔÜÀäĞä½©½ˆÄÄàÔàÌÜÀàĞÈÀ‰½Ñ (¨¨È°ØÔÈAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨ì™Õ±°¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•ÌÌäĞÀäÔÜÀàÜÌ°)‘•Á±½äÄÄàÔàÌäÌÔÔÀÌ½µÁ±•Ñ•ÍÕ•ÍÍ™Õ±±ä¸±°ÄØ™É•Í ¡•­•±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ è)Í¡•±°½Ù•ÉÍ¥½¸°•Ù•Éä¡…¹•ÉÕ¹Ñ¥µ”½1…ˆ½İ¹•È°É•½Ù•Éä°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°)É•Ñ…¥¹•¥µ…”¥µÁ½ÉÑ•È½•áÁ½ÉĞ½Á…¥¹ĞÍÕÉ™…”¸É½é•¸‰Õ¥±‘ÌÕ¹¡…¹•¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ĞìÁÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±ä¸	Õ¥±äÈä½µÁ±•Ñ”)…¹É•…‘ä™½È	ÉÕÍ Í•ÑÑ¥¹ÌƒŠH1½……±Á¡„A9Š&ÈÔÛ
È¼ÈÔÙ-¥°É½Ñ…Ñ”½Á…¥¹Ğ½½Ù•É±…ä)É…Í•È°U¹‘½I•‘¼…¹½¹Ñ¥¹Õ•Á…¥¹Ñ¥¹œ°I½Õ¹Ñ¥À°M…Ù•=Á•¸½•áÁ½ÉĞÉ•Ñ…¥¹•µ…É­Ì¸)UÍ•ÈäÈáAMLÁÉ½Ñ•Ñ•ìäÈäÙ¥Í¥‰±”½A•¹¥°½Á¥­•È½±…Ñ•¹ä…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ¸)I•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•ì¹…Ñ¥Ù”•áÁ½ÉÑÌ½ÉÉ•Ğ¸9•áĞ…±Á¡„)™••‘‰…¬Ñ¡•¸UXµÍ…™”‰±ÕÈ½ÍµÕ‘”ì<…¹‘”Í•…´…Õ‘¥ÑÌÅÕ•Õ•°¹½Ğ¥µÁ±•µ•¹Ñ•¸((ŒŒ€¸äÌÀƒŠPÍ½±¥=‰©•Ğµµ½‘”‘¥ÍÁ±…ä°¹¼µ½‘•±±¥¹œ…”ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•ÅÕ•ÍÑÌÉ•µ½Ù¥¹œÑ¡”‘¥ÍÑÉ…Ñ¥¹œ=‰©•Ğµµ½‘”`µÉ…ä°•ÍÁ•¥…±±äİ¡¥±”Á…¥¹Ñ¥¹œ¸)Õ‘¥ĞÕÉÉ•¹ĞÙ”ØÉ™”Ì¼¸äÈäèµ…¥¸…‘‘…”ÕÍ•Ì‘•ÁÑ¡Q•ÍĞé™…±Í”¹•ÕÑÉ…°…á¥Ìµ±¥¹”µ…Ñ•É¥…°)™½È•Ù•ÉäÍ•±•Ñ•=‰©•Ğ•‘”°‘É…İ¸½Ù•ÈÍ½±¥‰½‘ä½Á…¥¹Ğ¸ÑÕ…°Y%\`µI…ä¥Ì„)Í•Á…É…Ñ”•áÁ±¥¥Ğ‘¥…¹½ÍÑ¥Œµ½‘”ì‘¼¹½Ğ½¹™ÕÍ”¥Ğİ¥Ñ Ñ¡¥Ì…ÕÑ½µ…Ñ¥Œ…”¸)=É¥¥¹…°…”‰…Ñ •ÑÌ½ÁÑ¥½¹…°Í¡½İ‘•Ì¡‘•™…Õ±ÑÑÉÕ”¤ìµ…¥¸Á…ÍÍ•Ì™…±Í”¥¸=‰©•Ğ°)Í¡½İY•ÉÑ¥•ÌÉ•µ…¥¹ÌY•ÉÑ•àµ½¹±ä¸MÕÉ™…”…”•½µ•ÑÉä½‰…Ñ¡•Ì…É”¹½Ğ…±±½…Ñ•ì¥Í½±…Ñ•±½½Í”•‘•ÌÉ•µ…¥¸)Ù¥Í¥‰±”İ¥Ñ ½É‘¥¹…Éä‘•ÁÑ µÑ•ÍÑ••‘•5…Ñ•É¥…°Í¼İ¥É”µ½¹±ä½‰©•ÑÌ‘¼¹½ĞÙ…¹¥Í ì)½É¥¥¹…°¥¹Ù¥Í¥‰±”¥¹‘•á••‘”½Ù•ÉÑ•àÁ¥­¥¹œÁÉ½á¥•Ì½‰É¥‘”É•¥ÍÑÉäÉ•µ…¥¸¥¹Ñ…Ğ¸)5¥ÉÉ½È…”¥Ì…±Í¼½µ¥ÑÑ•¥¸=‰©•Ğì…Ñ¥Ù”MÕ‰¹¼±½¹•È•Ù…±Õ…Ñ•ÌÍÁ…É”µ¥ÉÉ½É•)‰…Í”Í½±•±ä™½ÈÑ¡…Ğ½µ¥ÑÑ•İ¥É”¸=É¥¥¹…°•Ù…±Õ…Ñ•ÍÕÉ™…”…¹¥ÑÌ•½µ•ÑÉä…¡”)…É”Õ¹¡…¹•¸Y•ÉÑ•à½‘”½…”É•ÍÑ½É”Ñ¡•¥È½É¥¥¹…°…•Ì…¹µ…Ñ•É¥…°½½É‘•È½Í•±•Ñ¥½¸)Í•µ…¹Ñ¥Ì¸±•…¸½M½™Ğ°5Õ±Ñ¤½É½ÕÀÑ¥¹ÑÌ°¥éµ½Ì°¡¥ÍÑ½Éä°‰ÉÕÍ ½Á…¥¹Ğ½µ…Ñ•É¥…°½•áÁ½ÉĞ)½İ¹•ÉÌÕ¹Ñ½Õ¡•¸áÁ±¥¥ĞY%\]¥É”½`µI…äµ½‘•ÌÉ•Ñ…¥¸‘•±¥‰•É…Ñ”ÕÍ•È½¹ÑÉ½°¸)9¼™É…µ”µÉ…Ñ”½È‰É½…µ•µ½Éä±…¥´ìÉ•µ½Ù•Ù¥ÍÕ…°…”‘É…İÌ½…±±½…Ñ¥½¸½¹±ä¸()Qİ¼¹•Ü¹…Ñ¥Ù”µ½İ¹•ÈÑ•ÍÑÌ½Ù•È=‰©•ÓŠQ½µÁ½¹•¹ĞÑÉ…¹Í¥Ñ¥½¹Ì°…‰Í•¹ĞÙ¥ÍÕ…°‰…Ñ¡•Ì°)…ÑÕ…°Q¡É•”É…å…ÍĞÁÉ½áä%Ì½‘¥ÍÁ½Í…°°µ¥ÉÉ½É•MÕ‰‰…Í”µ…±°½Õ¹ÑÌ…¹•á…ĞÍ½±¥)•½µ•ÑÉä¸á¥ÍÑ¥¹œàÄÀ¼àÔÄ=‰©•ĞÙ¥ÍÕ…°µ…”•áÁ•Ñ…Ñ¥½¸É•Á±…•‰ä¹•ÜÕÍ•ÈÉ•ÅÕ•ÍĞì)…±°½µÁ½¹•¹Ğ½ÁÉ½áä…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸á¥ÍÑ¥¹œàÔÀ¼àÀä¼àÄÈÉ•¹‘•È™¥áÑÕÉ•Ì¹½ÜÍÕÁÁ±äÑ¡•¥ÈÉ•…°Í•±•Ñ¥½¹5½‘”ô™…”œ)‘•Á•¹‘•¹äìàÀä=‰©•Ğ±½½Í”µİ¥É”µ…Ñ•É¥…°•áÁ•Ñ…Ñ¥½¸™½±±½İÌÑ¡”¹•Ü‘•ÁÑ µÑ•ÍÑ•)Á½±¥ä°…±°½µÁ½¹•¹Ğ½•½µ•ÑÉä½µ•Ñ…‘…Ñ„½•¹Õµ•É…Ñ¥½¸…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸9¼ÁÉ½‘ÕÑ¥½¸)™…±±‰…¬½Èİ•…­•¹•…¡”½Ñ¥µ¥¹œ¡•­Ì¸)½ÕÍ•…”½…¡”½Ñ¥µ¥¹œ½É•±•…Í”ÈåAML…¹•…É±¥•ÈÁ…¥¹Ğµ¡¥ÍÑ½Éä½Ñ¥¹Ğ½…”ÈÑAML¸)1•…äàÀä±½½Í”µİ¥É”¹½Éµ…±¥é…Ñ¥½¸¥¹ÍÁ•ÑÌ„1=9è½É¥¥¹…°±½½Í”•‘•Ì ¤…¸…‘)¥ÑÌ¡¥ÍÑ½É¥…°™…•Íl´ÅtÍ•¹Ñ¥¹•°¸=É¥¥¹…°Í½ÕÉ”µÁÉ•Í•ÉÙ…Ñ¥½¸…ÍÍ•ÉÑ¥½¸É•Ñ…¥¹•¸)=¹±äµ…¥¸½…”‰…Ñ …¹Í¡•±°½É•½Ù•Éä…¡”äÌÀì5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸±Á¡„äÈä)µ…¹Õ…°…Ñ”¹½Ğ¥¹™•ÉÉ•AML¸I•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•ì•áÁ½ÉÑÌ½ÉÉ•Ğ¸)9•áĞY%=‰©•Ğ½É‰¥Ğ½Á…¥¹Ğ¹¼Ñ¡É½Õ µ…”ì½µÁ½¹•¹Ğ…•ÌÉ•ÑÕÉ¸ì5Õ±Ñ¤½¥éµ¼…¹)A…¥¹ĞU¹‘½I•‘¼ÍÑ…ä¥¹Ñ…Ğ¸Q¡•¸É•ÍÕµ”…±Á¡„™••‘‰…¬½UXµÍ…™”‰±ÕÈ½ÍµÕ‘”ì<½Í•…µÌÅÕ•Õ•¸)Õ±°Ù…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸™½±±½İÌì¹¼É•¹‘•É•½¥A…ÁÉ½½˜¥¹™•ÉÉ•™É½´9½‘”¸((´mát€¸äÌÀèÍ•±•Ñ•=‰©•ĞÍÑ…åÌÍ½±¥İ¥Ñ¡½ÕĞ…ÕÑ½µ…Ñ¥ŒÑ¡É½Õ µµ•Í …”ì½É‰¥Ğ…¹Á…¥¹Ğ¸(´mát€¸äÌÀèY•ÉÑ•à½‘”½…”É•ÍÑ½É”…•ÌìÉ•ÑÕÉ¸=‰©•Ğ¡¥‘•ÌÑ¡•´°¥¹±Õ‘¥¹œµ¥ÉÉ½ÉÌ½MÕ‰¸(´mát€¸äÌÀè=‰©•Ğ5Õ±Ñ¤Í•±•Ñ¥½¸½¥éµ¼…¹A…¥¹ĞU¹‘½I•‘¼½½¹Ñ¥¹Õ”É•µ…¥¸ÕÍ…‰±”¸((¸äÌÀ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØÔĞAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)½ÕÍ•¹…Ñ¥Ù”…”½…¡”½Ñ¥µ¥¹œ½É•±•…Í”ÈåAMLì½É¥¥¹…°ÍÕÉ™…”½ÁÉ½áä½µ•Ñ…‘…Ñ„°)¡¥ÍÑ½Éä½Á…¥¹Ğ½…±Á¡„½¥µ…”½¹…Ñ¥Ù”•áÁ½ÉĞ…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸=¹±äÍÕÁ•ÉÍ•‘•=‰©•Ğ)Ù¥ÍÕ…°…”…¹‘•ÁÑ µÑ•ÍÑ•±½½Í”µİ¥É”•áÁ•Ñ…Ñ¥½¹Ì¡…¹•¸5Õ±Ñ¤Ä¸À½™É½é•¸¥¹Ñ…Ğ¸)AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½İÌì¥A…‘¥ÍÁ±…ä…•ÁÑ…¹”Á•¹‘¥¹œ¸((ŒŒ€¸äÌÀÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”‘•™‰ÕˆÜåˆàäÄØÙ……•˜Í„á”ĞÜå…ˆÀå”Ù‰”Å‘˜ØÍ€°Ñ•ÍÑ•ÑÉ•”)ĞÈÌÑ‰™„ÈÜÍ”ÄØĞÁ™˜ÔÄÕˆääÌİ˜ÀÄÙ˜ÀàĞå•™ˆÈÑ€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ğ…Ñ„)ÕÁ±½…‘•…±°ÄÌ•á…Ğ±½…°‰±½‰Ì½ÑÉ•”ì™•Ñ¡•µ…¥¸¡…Ì¥‘•¹Ñ¥…°Ñ•ÍÑ•™¥±•Ì¸)1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäĞÄÄÈÈÀÀØĞ½©½ˆÄÄàÔàäÄÜÔäÀÌ‰½Ñ Á…ÍÌ(¨¨È°ØÔĞÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•Ì(ÌäĞÄÄÈÄäĞØÜ½‘•Á±½äÄÄàÔàäÌàäÌÈĞ½µÁ±•Ñ•ÍÕ•ÍÍ™Õ±±ä¸±°ÄÄ¡•­•™É•Í ±¥Ù”)™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°µ…¥¸½…”‰…Ñ °É•½Ù•Éä°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹)Õ¹¡…¹•Á…¥¹Ñ•È½É…ÍÑ•È½É•¹‘•È½µ…Ñ•É¥…°ÍÕÉ™…”¸É½é•¸‰Õ¥±‘ÌÕ¹¡…¹•¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ĞìÑ¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸	Õ¥±äÌÀ)½µÁ±•Ñ”…¹É•…‘ä™½È=‰©•Ğµµ½‘”Í½±¥½É‰¥Ğ½Á…¥¹Ğİ¥Ñ¡½ÕĞ…ÕÑ½µ…Ñ¥ŒÑ¡É½Õ µ…”°)Y•ÉÑ•à½‘”½…”…”É•ÍÑ½É…Ñ¥½¸°=‰©•ĞÉ•ÑÕÉ¸…¹A…¥¹ĞU¹‘½I•‘¼½½¹Ñ¥¹Õ•µ…É­Ì¸)1½½Í”İ¥É”•½µ•ÑÉäÉ•µ…¥¹Ì‘•ÁÑ µÑ•ÍÑ•ì½É¥¥¹…°Á¥­¥¹œ½‰É¥‘”½…¡”½İ¹•ÉÌ¥¹Ñ…Ğ¸)9¼µ•…ÍÕÉ•AL±…¥´½ÈÉ•¹‘•É•¥A……•ÁÑ…¹”¥¹™•ÉÉ•¸UÍ•ÈäÈáAMLÁÉ½Ñ•Ñ•ì(äÈä…±Á¡„…Ñ”É•µ…¥¹ÌÁ•¹‘¥¹œ¸I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÉ•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•ì)¹…Ñ¥Ù”•áÁ½ÉÑÌ½ÉÉ•Ğ¸I•ÍÕµ”…±Á¡„™••‘‰…¬Ñ¡•¸UXµÍ…™”‰±ÕÈ½ÍµÕ‘”ì<½Í•…µÌÅÕ•Õ•¸((ŒŒ€¸äÌÄƒŠP	±ÕÈİ¥Ñ¡¥¸½É¥¥¹…°Á½±å½¸™…•Ìì€¸äÌÀÕÍ•ÈAMLƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäÌÁAMLÁÉ½Ñ•ÑÌÍ½±¥=‰©•Ğ‘¥ÍÁ±…ä½½µÁ½¹•¹Ğ…•Ì…¹A…¥¹Ğ½¡¥ÍÑ½Éä¸Õ‘¥Ğ)µ…¥¹„å˜É„ÄÁè½É¥¥¹…°UX¥¹ÍÁ•Ñ½È½İ¹Ì¥Í±…¹‘Ì°•áÁ½ÉÑ•È½İ¹ÌÑÉ¥…¹±”•µ¥ÍÍ¥½¸ì)¹¼¹•¥¡‰½ÕÈ‰ÉÕÍ •á¥ÍÑÌ¸¥ÉÍĞ	±ÕÈ±¥ÁÌ	=Q É•…‘Ì…¹İÉ¥Ñ•ÌÑ¼Á¥­•Á½±å½¸)™…”ì¹•Ù•ÈÍ…µÁ±•Ì…‘©…•¹Ğ…Ñ±…Ì™…•Ì¸=É¥¥¹…°ÁÉ•Ù¥•Ü‰Õ¥±‘•È…¥¹Ì½ÁĞµ¥¸™É½é•¸)ÑÉ¥…¹±—ŠIÍ½ÕÉ”µ™…”µ•Ñ…‘…Ñ„™É½´¥ÑÌ•á¥ÍÑ¥¹œ•µ¥ÍÍ¥½¸±½½À€¡É½ÕÀ½É‘•ÈÉ•Ñ…¥¹•¤¸)•™…Õ±ĞÁÉ•Ù¥•İÌ½•áÁ½ÉĞ‰åÑ•ÌÕ¹¡…¹•¸A…¥¹Ñ•ÈÉ•ÅÕ•ÍÑÌµ…Àì¹•ÜÍµ…±°™¥±Ñ•Èµ‘½µ…¥¸)É…ÍÑ•È±…‰•±Ì½É¥¥¹…°•½µ•ÑÉä°ÔÄË
È°É4Í…¹¹•‰Õ‘•Ğ¸M…µÁ±•¥¹Ñ•É¥½È½Ù•É±…ÁÌ°)½ÕĞµ½˜µÑ¥±”½‘••¹•É…Ñ”½Õ¹ÍÕÁÁ½ÉÑ•UYÌÉ•™ÕÍ”…Ñ½µ¥…±±äì…µ‰¥Õ½ÕÌ‰½É‘•ÉÌ•á±Õ‘•¸)9¼¹•ÜÑÉ¥…¹Õ±…Ñ¥½¸½Í¥¹…ÑÕÉ”½UX•‘¥Ñ½È½¥¹ÁÕĞ½¡¥ÍÑ½Éä½É•Í½ÕÉ”½İÉ¥Ñ•È½İ¹•È¸()Q½½°	±ÕÈƒ
Üİ¥Ñ¡¥¸™…”ÕÍ•Ì½É¥¥¹…°É…ÍÑ•È°Í…µÁ±•ÉÌ°É…å…ÍĞ…¹½µµ¥Ğ½É½±±‰…¬¸)¥á•™¥Ù”µÑ…À•¹ÑÉ”Ğ½…É‘¥¹…°ÄÍµ½½Ñ¡¥¹œ½˜ÍÑÉ½­”µÍÑ…ÉĞÁ¥á•±Ìì™…”µ½¹±äÉ•…‘Ì…¹)İÉ¥Ñ•Ì°É•¹½Éµ…±¥é•±¥ÁÁ•İ•¥¡ÑÌ¸5…á¥µÕ´Á•Èµ½¹Ñ…Ğ½Ù•É…”½½Á…¥ÑäÉ•Ñ…¥¹•ì)±¥™Ğ½É•Á•…Ğ™½ÈÍÑÉ½¹•ÈÍµ½½Ñ¡¥¹œ¸M…µ”Í¥é”½ÁÉ•ÍÍÕÉ”½¡…É‘¹•ÍÌ½…±Á¡„Ñ¥ÁÌ¸QÉ…¹ÍÁ…É•¹Ğ)±…å•ÉÌÕÍ”ÁÉ•µÕ±Ñ¥Á±¥•I	™¥±Ñ•É¥¹œ½¥¹Ñ•ÉÁ½±…Ñ¥½¸Ñ¼…Ù½¥¡¥‘‘•¸µ½±½ÕÈ¡…±½Ìì)Í…±…È½µ…Í¬É…ÜÙ…±Õ•ÌÍÑ…ä¥¹‘•Á•¹‘•¹Ğ¸½±½ÕÈÁ¥­•È¥¹½É•½‘¥Í…‰±•¸	…Í”½±…å•ÉÌ¼)µ…Í­Ì½I½Õ¡¹•ÍÌ½5•Ñ…±¹•ÍÌİ½É¬ìÉ•Ñ…¥¹•¥µ…”½±½ÕÈÉ•µ…¥¹ÌÉ•…µ½¹±ä¸9¼…É½ÍÌµ™…”)½ÈÍ•…µ±•ÍÌ½İ½É±µÉ…‘¥ÕÌ±…¥´°¹¼MµÕ‘”å•Ğ¸=É¥¥¹…°Í•¹”¡•­Á½¥¹Ğ½=\½Á½½±Ì°)M…Ù•=Á•¸½9=4½1…¹A…¥¹Ğ¡¥ÍÑ½ÉääÈàÉ•µ…¥¸ì‘½µ…¥¸Å5¥½Í•ÍÍ¥½¸¬Å5¥½½¹Ñ…Ğ¥ÌÑÉ…¹Í¥•¹Ğ¸)I•…‘½Ì½Á…¥¹Ğµ‰±ÕÈ´äÌÄ¹µ¸¥Ù”¹•ÜÉ•É•ÍÍ¥½¹Ì€¬¹•…É‰äÈÄôÈÙAMLìÉ•±•…Í”ÕAMLì)™Õ±°½ÁÕ‰±¥…Ñ¥½¸‰•±½Ü¸½µÁ±•Ñ”¡…¹•µ…¥¸½•áÁ½ÉĞ½1…ˆÉ•Ù•ÉÍ”±½…‘•ÈÉ…Á äÌÄì)5Õ±Ñ¤Ä¸À½™É½é•¸…¹…•ÁÑ•äÌÀµ…¥¸½…”‰åÑ•ÌÕ¹¡…¹•¸±Á¡„äÈä‘•Ù¥”…Ñ”¹½Ğ)¥¹™•ÉÉ•AML¸I•™±•Ñ¥½¸É•µ…¥¹ÌÕ¹É•Í½±Ù•ì¹…Ñ¥Ù”•áÁ½ÉĞÁÉ½Ñ•Ñ•¸9•áĞY%)¡…Éµ•‘•µ…É¯ŠI	±ÕÈ‰ÉÕÍ ½±¥™Ğ½É•Á•…Ğ°½Ù•É±…ä¥Í½±…Ñ¥½¸°U¹‘½I•‘¼½½¹Ñ¥¹Õ”°Ñ¡•¸)Í¥µ¥±…É±ä‰½Õ¹‘•MµÕ‘”¸<…¹‘”µÍ•…´…Õ‘¥ÑÌÉ•µ…¥¸ÅÕ•Õ•°¹½Ğ‘•±¥Ù•É•¸((´lt€¸äÌÄè¡…Éµ•‘•µ…É¬ƒŠHQ½½°	±ÕÈİ¥Ñ¡¥¸™…”°M¥é”±…É•ÈÑ¡…¸µ…É¬°‰ÉÕÍ •‘”½±¥™Ğ½É•Á•…Ğ¸(´lt€¸äÌÄè½Ù•É±…ä	±ÕÈ­••ÁÌ	…Í”ìµ…Í¬½Í…±…È	±ÕÈ•‘¥ÑÌ½¹±äÍ•±•Ñ•Ñ…É•Ğ¸(´lt€¸äÌÄèU¹‘½I•‘¼ÍÑ…åÌ¥¸A…¥¹ĞìÉ•ÑÕÉ¸	ÉÕÍ °M…Ù•=Á•¸…¹¹…Ñ¥Ù”•áÁ½ÉĞÉ•Ñ…¥¸É•ÍÕ±ÑÌ¸((¸äÌÄ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØÔäAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)9•Ü	±ÕÈÔ€¬¹•…É‰äÈÄôÈÙAML°É•±•…Í”ÕAMLì¹¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸)•™…Õ±Ğ•áÁ½ÉĞ½ÁÉ•Ù¥•Ü•½µ•ÑÉä…¹…•ÁÑ•äÌÀµ…¥¸½…”½ÁÉ½Ñ•Ñ•5Õ±Ñ¤½™É½é•¸‰åÑ•Ì)Õ¹¡…¹•¸AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½İÌì…ÑÕ…°¥A…	±ÕÈ…Ñ”Á•¹‘¥¹œ¸((ŒŒ€¸äÌÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÀÈÈÙ‘ŒÄå‰‘ˆĞÀÅˆĞàÔÅ‰ˆåàÑ•”äÕ…ˆàÜàÕˆäÔİ€°Ñ•ÍÑ•ÑÉ•”)•ÁˆÄÈÜÜÁ™ŒÔäÔÀÌÕ™‰™•‰ĞÌÕÌäá…ŒÜİÔå”äİ€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ğ…Ñ„)ÕÁ±½…‘•…±°ÄÜ•á…Ğ±½…°‰±½‰Ì½ÑÉ•”ì™•Ñ¡•µ…¥¸µ…Ñ¡•ÌÑ•ÍÑ•Í½ÕÉ”¸)1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäĞÄØÌÄäÌÀÜ½©½ˆÄÄàØÀØÄÀÔÌÔÔ‰½Ñ Á…ÍÌ(¨¨È°ØÔäÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•Ì(ÌäĞÄØÌÄäÀÜä½‘•Á±½äÄÄàØÀØÌÀÌÜÌÄ½µÁ±•Ñ•ÍÕ•ÍÍ™Õ±±ä¸±°Äà™É•Í ¡•­•±¥Ù”)™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°•Ù•Éä¡…¹•ÉÕ¹Ñ¥µ”½•áÁ½ÉĞ½1…ˆ½İ¹•È°¹•Ü™¥±Ñ•È)‘½µ…¥¸°É•½Ù•Éä°…•ÁÑ•äÌÀµ…¥¸½…”°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹É•Ñ…¥¹•Á…¥¹ĞÍÕÉ™…”¼)•áÁ½ÉĞ½¥µ…”ÁÉ½©•Ñ½È¸É½é•¸‰Õ¥±‘ÌÕ¹¡…¹•¸9¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹ĞìÑ¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸	Õ¥±äÌÄ)½µÁ±•Ñ”…¹É•…‘ä™½ÈQ½½°	±ÕÈİ¥Ñ¡¥¸™…”½¸„¡…Éµ•‘•Á…¥¹Ñ•µ…É¬°±…É•È)M¥é”°±¥™Ğ½É•Á•…Ğ™½ÈÍÑÉ½¹•ÈÍµ½½Ñ¡¥¹œì½Ù•É±…ä½¡…¹¹•°¥Í½±…Ñ¥½¸…¹U¹‘½I•‘¼ÍÑ…ä)¥¸A…¥¹Ğ°É•ÑÕÉ¸	ÉÕÍ …¹½¹Ñ¥¹Õ”¸M…Ù•=Á•¸½¹…Ñ¥Ù”•áÁ½ÉĞÉ•Ñ…¥¹ÌÉ•ÍÕ±ÑÌ¸UÍ•ÈäÌÀ)AMLÁÉ½Ñ•Ñ•ì…ÑÕ…°äÌÄ…ÁÁ•…É…¹”½A•¹¥°™••°½±…Ñ•¹ä…¹äÈä…±Á¡„…Ñ”Á•¹‘¥¹œ¸)9¼É•¹‘•É•½¥A…Á•É™½Éµ…¹”±…¥´¸I•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•ì)¹…Ñ¥Ù”•áÁ½ÉÑÌ½ÉÉ•Ğ¸9•áĞ	±ÕÈ™••‘‰…¬Ñ¡•¸ÁÉ½Ñ•Ñ•MµÕ‘”ì<½Í•…µÌÅÕ•Õ•¸((ŒŒ€¸äÌÈƒŠP½¹¹•Ñ•µ™…”	±ÕÈÍ…µÁ±¥¹œì€¸äÌÄÕÍ•ÈAMLƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈAMLÁÉ½Ñ•ÑÌ€¸äÌÄ	±ÕÈ…¹ÁÉ¥½È€¸äÌÀÍ½±¥=‰©•Ğ‘¥ÍÁ±…ä¸Õ‘¥Ğµ…¥¸ÀÕ„ÜäÁ”àè)½É¥¥¹…°UX¥¹ÍÁ•Ñ½È…±É•…‘ä½İ¹ÌÁ½±å½¸•‘•Ì°•áÁ½ÉÑ•È½İ¹ÌÑÉ¥…¹±”•µ¥ÍÍ¥½¸ì)É•ÕÍ”‰½Ñ Ù¥„½ÁÑ¥½¹…°•‘•=İ¹•ÉÌ…¹½É¥¥¹…°Ù•ÉÑ•à%Ì¸•™…Õ±ĞÉ•Á½ÉÑÌ½•½µ•ÑÉä¼)•áÁ½ÉÑÌÕ¹¡…¹•¸9•ÜÍµ…±°É•…µ½¹±äÍ•…´Á±…¸Õ¹™½±‘Ì½É¥¥¹…°ÑÉ¥…¹±”¹•¥¡‰½ÕÉÌ)…É½ÍÌÉ•…°µ…¹¥™½±•‘•Ì°µ…ÁÁ¥¹œ¥¹Ñ¼‘•Ñ…¡•½É½Ñ…Ñ•½µ¥ÉÉ½É•UX¥Í±…¹‘Ì¸Ñ±…Ì)ÁÉ½á¥µ¥Ñä¹•Ù•È½¹¹•ÑÌ™…•Ì¸%¹Ñ•É¹…°‘¥…½¹…±ÌÕÍ”Ñ¡”Í…µ”½É¥¥¹…°•µ¥ÍÍ¥½¸¸)¥á••¹ÑÉ”Ğ½…É‘¥¹…°ÄÍÑÉ½­”µÍÑ…ÉĞ‰±ÕÈ¹½ÜÉ•…‘Ìµ…ÁÁ•½¹¹•Ñ•µ™…”Ñ•á•±Ì¸)]É¥Ñ•ÌÉ•µ…¥¸±¥ÁÁ•Ñ¼Á¥­•™…”èÍÑÉ½­”	=Q Í¥‘•Ì½˜•‘”ì‰ÉÕÍ ™½½ÑÁÉ¥¹Ğ‘½•Ì)¹½ĞİÉ…À…ÕÑ½µ…Ñ¥…±±ä¸9¼İ½É±µÉ…‘¥ÕÌ½™Õ±°Í•…µ±•ÍÌµ™½½ÑÁÉ¥¹Ğ±…¥´°¹¼MµÕ‘”¸)	½Õ¹‘…Éä½¹½¹µ…¹¥™½±½…µ‰¥Õ½ÕÌ½É¹•È½±½¹œİ…±­Ì±¥Àì¥¹Ù…±¥½ÍÑ…±”½İ¹•ÉÍ¡¥À…¹)•á¥ÍÑ¥¹œ½Ù•É±…ÁÁ¥¹œ½‘••¹•É…Ñ”½½ÕĞµ½˜µÑ¥±”½½µÁ±•àUXÉ•™ÕÍ…±ÌÍÑ…ä…Ñ½µ¥Œ¸5…àà)É½ÍÍ¥¹Ì½Í…µÁ±”…¹É4İ…±¬ÍÑ•ÁÌì±…éäÍ•ÍÍ¥½¸Á±…¸ÔÄË
È±…‰•±ÌÅ5¥­±¥¹­ÌÑ5¥°)Ñ•µÁ½É…ÉäÑÉ¥…¹±”µ…ÀÅ5¥ì½İ¹•½¹Ñ…Ğ½Á¥•ÌÕ5¥Á±ÕÌ½É¥¥¹…°ÍÑÉ½­”‰Õ™™•ÉÌ¸)AÉ•µÕ±Ñ¥Á±¥•½±½ÕÈ…±Á¡„°É…Üµ…Í­Ì½Í…±…ÉÌ°…ÁÁ•½Ù•É…”°½É¥¥¹…°…±Á¡„Ñ¥ÁÌ°)¥¹ÁÕĞ½É…å…ÍĞ½¡¥ÍÑ½Éä½=\½M…Ù•=Á•¸½9=4½1½İ¹•ÉÌÉ•Ñ…¥¹•¸U$Í…åÌ½¹¹•Ñ•™…•Ì)…¹•áÁ±¥¥Ñ±ä…Í­ÌÍÑÉ½­•Ì½Ù•È‰½Ñ Í¥‘•Ì¸9¼µ½‘•±±¥¹œ½UX…ÕÑ¡½É¥¹œ­•É¹•°…‘‘•¸)¥Ù”¹•ÜÑ•ÍÑÌ½Ù•È€ÄÈ™½±½É½Ñ…Ñ¥½¸½µ¥ÉÉ½È±…å½ÕÑÌ°‘¥Í½¹¹•Ñ•…Ñ±…Ì‘•½ä°)¹½¹µ…¹¥™½±½ÍÑ…±”µ•Ñ…‘…Ñ„°•á…ĞÉ…ÍÑ•È…±Á¡„½…¹•°…¹…ÑÕ…°U'ŠI¡¥ÍÑ½ÉçŠIM…Ù•=Á•»ŠH)•á…Ğ¹…Ñ¥Ù”A9¸½ÕÍ•ÈÁAML¥¹°É•±•…Í”Ôì™Õ±°½ÁÕ‰±¥…Ñ¥½¸‰•±½Ü¸½µÁ±•Ñ”¡…¹•)É•Ù•ÉÍ”±½…‘•ÈÉ…Á É•Á¥¹¹•äÌÈìÉ•Ñ…¥¹•µ…¥¸½…”½5Õ±Ñ¤Ä¸À½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸)I•…‘½Ì½Á…¥¹ĞµÍ•…µÌ´äÌÈ¹µ¸•Ù¥”äÌÈÍ•…´…ÁÁ•…É…¹”½±…Ñ•¹äÁ•¹‘¥¹œì…±Á¡„äÈä…Ñ”)¹½Ğ¥¹™•ÉÉ•¸I•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•ì¹…Ñ¥Ù”•áÁ½ÉÑÌÁÉ½Ñ•Ñ•¸)9•áĞ‘•Ù¥”™••‘‰…¬Ñ¡•¸‰½Õ¹‘•MµÕ‘”Ñ¡É½Õ ½É¥¥¹…°Á…¥¹Ğ½İ¹•Èì<…¹UXÍ•…´)UQ!=I%9É•µ…¥¸ÅÕ•Õ•¸M•…´Í…µÁ±¥¹œ¥Ì¹½ĞÍ•…´…ÕÑ¡½É¥¹œ¸((´mátUÍ•È€¸äÌÄAMLèİ¥Ñ¡¥¸µ™…”	±ÕÈ°½É¥¥¹…°A…¥¹Ğ½¡¥ÍÑ½Éä…¹€¸äÌÀÍ½±¥=‰©•Ğ‘¥ÍÁ±…äÁÉ½Ñ•Ñ•¸(´lt€¸äÌÈ‘•Ù¥”èÁ…¥¹Ğ‘¥™™•É•¹Ğ½±½ÕÉÌ…É½ÍÌ„Õ‰”•‘”°	±ÕÈÍÑÉ½­•Ì½Ù•È‰½Ñ Í¥‘•Ì‰±•¹½¹¹•Ñ•™…•Ì‘•ÍÁ¥Ñ”UXÍÁ±¥Ğ¸(´lt€¸äÌÈ‘•Ù¥”è±¥™Ğ½É•Á•…ĞÍÑÉ•¹Ñ¡•¹Ì°U¹‘¼½I•‘¼ÍÑ…åÌ¥¸A…¥¹ĞìM…Ù”½=Á•¸É•Ñ…¥¹ÌÉ•ÍÕ±Ğ¸(´lt€¸äÌÈ‘•Ù¥”è‰…Í”½±…å•È½µ…Í¬½Í…±…È¥Í½±…Ñ¥½¸°A•¹¥°™••°…¹™¥ÉÍĞµ	±ÕÈ±…Ñ•¹ä…•ÁÑ…‰±”¸((¸äÌÈ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØØĞAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)½ÕÍ•ÈÁAMLì¹¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸!½ÍÑ•½A…•Ì½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½İÌ¸((ŒŒ€¸äÌÈÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÀ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”€Õ‰…ŒÄÄàÈÅ˜ĞåİĞİŒÙ•äåäÀÜÔÕŒÀÕ™‘•ÄÀÉ€°Ñ•ÍÑ•ÑÉ•”)€á„Ù˜ÈÕÙ”ÌàÀĞĞÉˆáŒÉŒİŒàäàäÍá˜äÑÄÔÌĞÀÑ‘€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸)½¹¹•Ñ•¥Ğ…Ñ„ÕÁ±½…‘•ÈĞ•á…Ğ±½…°‰±½‰Ìì™•Ñ¡•µ…¥¸µ…Ñ¡•ÌÑ•ÍÑ•ÑÉ•”¸)1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäĞÄàØÄÔàÜÀ½©½ˆÄÄàØÄÌØäÄØäÈ‰½Ñ Á…ÍÌ(¨¨È°ØØĞÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸)A…•ÌÌäĞÄàØÄÔàÔĞ½‘•Á±½äÄÄàØÄÌàØàÔÜàÍÕ••‘•¸±°ÈÈ™É•Í ¡•­•±¥Ù”™¥±•Ì)‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”¡…¹•ÉÕ¹Ñ¥µ”½•áÁ½ÉĞ½UX½1…ˆ±½…‘•ÈÉ…Á °)¹•ÜÍ•…´¡•±Á•È°É•½Ù•Éä°…•ÁÑ•µ…¥¸°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹É•Ñ…¥¹•ÍÕÉ™…”¸)É½é•¸‰Õ¥±‘ÌÕ¹¡…¹•ì¹¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÁ‘…Ñ•¸()	Õ¥±äÌÈ½µÁ±•Ñ”…¹É•…‘ä™½ÈÑ•ÍÑ¥¹œèÁ…¥¹Ğ‘¥™™•É•¹Ğ½±½ÕÉÌ…É½ÍÌ„Õ‰”•‘”°)	±ÕÈÍÑÉ½­•Ì½Ù•È	=Q Í¥‘•Ì°±¥™Ğ½É•Á•…Ğ°U¹‘½I•‘¼ÍÑ…ä¥¸A…¥¹Ğ°M…Ù•=Á•¸É•Ñ…¥¹Ì¸)Q¡¥Ì½¹¹•ÑÌÍ…µÁ±”É•…‘Ì…É½ÍÌÉ•…°™…”•‘•Ì½UXÍ•…µÌì™½½ÑÁÉ¥¹Ğ‘½•Ì¹½ĞİÉ…À¸)UÍ•ÈäÌÅAMLÁÉ½Ñ•Ñ•ì…ÑÕ…°äÌÈA•¹¥°™••°½…ÁÁ•…É…¹”½™¥ÉÍĞµÕÍ”±…Ñ•¹äÁ•¹‘¥¹œ¸)±Á¡„äÈä‘•Ù¥”…Ñ”É•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ğ¸I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÕ¹É•Í½±Ù•ì¹…Ñ¥Ù”•áÁ½ÉÑÌ)½ÉÉ•Ğ¸9•áĞ™••‘‰…¬Ñ¡•¸‰½Õ¹‘•MµÕ‘”Ñ¡É½Õ ½É¥¥¹…°½İ¹•Èì<½Í•…´…ÕÑ¡½É¥¹œ)É•µ…¥¸ÅÕ•Õ•¸Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä°¹½ĞÑ¡”Ù•É¥™¥•ÉÕ¹Ñ¥µ”¸((ŒŒ€¸äÌÌƒŠPMÕÉ™…”¥µ…”İÉ…ÁÁ¥¹œìÕÍ•ÈÁÉ¥½É¥ÑäƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•È…Í­Ì¥µ…”Á±…•µ•¹ĞÑ¼İÉ…À½¹¹•Ñ•ÍÕÉ™…•ÌÉ…Ñ¡•ÈÑ¡…¸±¥À…Ğ½¹”™…”¸)Õ‘¥Ğµ…¥¸ÌØàĞÔĞÔÀ½±¥Ù”äÌÈè€¸äÄÈ=¸ÍÕÉ™…”™½±±½İÌ…¹¡½È½¹½Éµ…°‰ÕĞ™••‘Ì™±…Ğ)½ÉÑ¡½É…Á¡¥Œ€¸äÄÄÁÉ½©•Ñ½Èİ¥Ñ Ü×
À™…¥¹œ½Ù¥Í¥‰¥±¥ÑäÕÑÌì¹¼İÉ…ÁÁ¥¹œ¥µ…”½İ¹•È¸)áÑ•¹Ñ¡…Ğ½É¥¥¹…°Á…Ñ ìÁÉ•Í•ÉÙ”Í•Á…É…Ñ”AÉ½©•Ğ™É½´Y¥•Ü¸áÑÉ…Ğ•á¥ÍÑ¥¹œäÌÈ)É•…µ½¹±äÑÉ¥…¹±”É…Á ¥¹Ñ¼Á…¥¹ĞµÑÉ¥…¹±”µÉ…Á ¹©Ìì½É¥¥¹…°UX¥¹ÍÁ•Ñ½ÈÁ½±å½¸)•‘•Ì…¹•áÁ½ÉÑ•È™…”½Ù•ÉÑ•àµ•Ñ…‘…Ñ„ÍÑ…ä…ÕÑ¡½É¥Ñ…Ñ¥Ù”¸	±ÕÈÕÍ•Ì•á…ĞÍ…µ”É…Á °)•á¥ÍÑ¥¹œÍ…µÁ±”İ…±¬Õ¹¡…¹•¸9¼‘ÕÁ±¥…Ñ”…‘©…•¹ä½ÑÉ¥…¹Õ±…Ñ¥½¸½µ½‘•±±¥¹œ­•É¹•°¸()=¸ÍÕÉ™…”É•Ñ…¥¹ÌÉ…å…ÍĞÑÉ¥…¹±”¥¹‘•àİ¥Ñ Á½¥¹Ğ½¹½Éµ…°ì5½Ù”ÕÁ‘…Ñ•Ì…±°Ñ¡É•”¸)MÕÉ™…”½É¥•¹Ñ…Ñ¥½¸ÍÑ¥±°%¹Í•ÉĞÌ½É¥¥¹…°¡•±Á•È¸9•ÜÁ…¥¹Ğµ¥µ…”µİÉ…À¹©Ì…ÉÉ¥•Ì„)±½…°¥µ…”¡…ÉĞ½Ù•ÈÉ•…°µ…¹¥™½±ÑÉ¥…¹±”¹•¥¡‰½ÕÉÌ°Õ¹™½±‘¥¹œ½µµ½¸•‘•Ìİ¥Ñ )İ½É±±•¹Ñ¡Ì…¹½ÁÁ½Í¥Ñ”µÍ¥‘”Ñ¡¥ÉÙ•ÉÑ•àìµ¥‘Á½¥¹Ğ½•¹ÑÉ½¥‘¥ÍÑ…¹”ÅÕ•Õ”¡½½Í•Ì)½¹”É½ÕÑ”Á•ÈÑÉ¥…¹±”¸I•½¹¥±”Í¡…É•…¹½¹¥…°Ù•ÉÑ•à½½É‘¥¹…Ñ•ÌÑ¼…Ù½¥É…­Ì)…Ğ±½…°å±”±½ÍÕÉ•ÌìÍ••ÑÉ¥…¹±”Á¥¹¹•¸ÕÉÙ•½±½Í•Á…Ñ¡•Ì¹••ÍÍ…É¥±äÍÑÉ•Ñ ì)¹½Ğ„±½‰…±±ä‘¥ÍÑ½ÉÑ¥½¸µ™É•”ÍÁ¡•É¥…°Õ¹İÉ…À¸MÑ½ÁÌ•áÁ…¹‘¥¹œ½ÕÑÍ¥‘”¥µ…”É•Ñ…¹±”°(ÈÁ,ÑÉ¥…¹±•Ì¼ÈÀÁ,ÅÕ•Õ”µÁ½À…À¸	½Õ¹‘…É¥•Ì½¹½¹µ…¹¥™½±½‘¥Í½¹¹•Ñ•½µÁ½¹•¹ÑÌ±¥Àì)¹¼½½É‘¥¹…Ñ”İ•±‘¥¹œ½È…Ñ±…Ì…‘©…•¹ä¸=É¥¥¹…°€¸äÄÄUXÉ…ÍÑ•È½Í½ÕÉ”…±Á¡„Í…µÁ±¥¹œ°)½Ù•É±…À½Ñ¥±”¼É4Í…¸‰Õ‘•ÑÌ…¹ÍÑ…¬½Á½½°½¡¥ÍÑ½Éä½•áÁ½ÉĞ½İ¹•ÉÌÉ•µ…¥¸¸]É…ÁÁ•Í…µÁ±•Ì)™½±±½Ü½¹¹•Ñ•Ñ…É•ĞÍÕÉ™…•ÌÉ½Õ¹½É¹•ÉÌ•Ù•¸İ¡•¸¹½Ğ™É½¹Ğµ™…¥¹œ½Ù¥Í¥‰±”™É½´)…¹¡½ÈÁÉ½©•Ñ½ÈìÁ¥­•…¹¡½ÈÍÑ¥±°½‰•åÌ½É¥¥¹…°Ù¥Í¥‰±”µÑ…É•Ğ½½±ÕÍ¥½¸¡¥ĞÕ…É¸)±…ĞAÉ½©•Ğ™É½´Y¥•ÜÉ•Ñ…¥¹Ì½É¥¥¹…°Ü×
À½Í•¹”½Í•±˜½±ÕÍ¥½¸¼ÌÁ4É…äµİ½É¬ÉÕ±•Ì¸()á¥ÍÑ¥¹œ½¹Ñ…ĞÑ…¹•¹ĞÕ¥‘”É•µ…¥¹ÌÁ±…¹…Èì±¥™ĞÕÁ‘…Ñ•Ì•á…ĞİÉ…ÁÁ•µ•Í ÁÉ•Ù¥•Ü¸)ÁÁ±äÉ•½µÁÕÑ•ÌÕÉÉ•¹Ğ…¹‘¥‘…Ñ”Ñ¡•¸½µµ¥ÑÌ=9½É¥¥¹…°¡•­Á½¥¹Ğ½=\¸…¹•°°)±½Í”°‰½‘ä±½ÍÌ°±…å•È½Ñ…É•Ğ¡…¹”…¹É•™ÕÍ…°ÁÉ•Í•ÉÙ”½µµ¥ÑÑ•É•Í½ÕÉ”½¡¥ÍÑ½Éä¸)M½ÕÉ”½É…ÍÑ•ÈÉ•Ñ…¥¹•Ñ½•Ñ¡•ÈÑ¡É½Õ ½É¥¥¹…°É•¥Á”½½‘•Œè¹¼Í¡•µ„½‰Õ‘•Ğ¥¹É•…Í”¸)%¹Ñ•É…Ñ¥Ù”İÉ…À¡…ÉĞ½…¹¡½È¥ÌÑÉ…¹Í¥•¹Ğ°…ÌäÄÈè‘¥Ğ¥µ…—ŠI=¸ÍÕÉ™…”É•Á¥­Ì…¹¡½Èì)½±™±…Ğµ…ÑÉ¥à…±½¹”…¹¹½ĞÉ••¹•É…Ñ”„İÉ…ÁÁ•¡…ÉĞ¸M…Ù•Á¥á•±Ì½¹…Ñ¥Ù”•áÁ½ÉÑÌ)É•Ñ…¥¸•á…ĞİÉ…ÁÁ¥¹œì¹•Ù•È…ÕÑ¼µÉ…ÍÑ•É¥é”É•Ñ…¥¹•Í½ÕÉ”™É½´Ñ¡…Ğµ…ÑÉ¥à½¸=Á•¸¸()M¥à¹•ÜÉ•É•ÍÍ¥½¹Ìè•á…Ğ…Íåµµ•ÑÉ¥ŒÁ¥á•±Ì…É½ÍÌ™±…Ğ½½‰±¥ÅÕ”¼äÃ
À€¬µ¥ÉÉ½É•UYÌ°)‘¥Í½¹¹•Ñ•½¹½¹µ…¹¥™½±•á±ÕÍ¥½¹Ì°½É¥¥¹…°Ù¥•ÜÉÕ±•Ì½ÍÑ…±”…¹¡½È½UXÉ•™ÕÍ…°°)ÑÉ…¹Í™½Éµ•™É…µ”½É½Ñ…Ñ¥½¸½Í…±”°…ÑÕ…°U$‘É…œ½¹Ñ¼…¹½Ñ¡•È™…”½…¹•°½å±—ŠIÁÁ±çŠH)¡¥ÍÑ½ÉçŠIM…Ù•=Á•»ŠI•á…Ğ¹…Ñ¥Ù”A9°ÍÁ¡•É”½‘•¹¥•¡•­Á½¥¹Ğ…¹Í¡…É•µÙ•ÉÑ•à½¹Ñ¥¹Õ¥Ñä¸)½ÕÍ•¥µ…”­Í•…´ÈÕAML…¹É•±•…Í”ÕAMLì™Õ±°½ÁÕ‰±¥…Ñ¥½¸™½±±½İÌ¸½µÁ±•Ñ”¡…¹•)É•Ù•ÉÍ”±½…‘•ÈÉ…Á äÌÌ°É•Ñ…¥¹••áÁ½ÉÑ•È½¥¹ÍÁ•Ñ½È½µ…¥¸½…”½5Õ±Ñ¤½™É½é•¸Õ¹¡…¹•¸)9¼äÌÈ‘•Ù¥”AML¥¹™•ÉÉ•¸•Ù¥”äÌÌİÉ…À…ÁÁ•…É…¹”½ÍÑÉ•Ñ ½™¥ÉÍĞµÕÍ”±…Ñ•¹äÁ•¹‘¥¹œ¸)I•…‘½Ì½Á…¥¹Ğµ¥µ…”µİÉ…À´äÌÌ¹µ¸%¹‘•Á•¹‘•¹ĞÉ•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÕ¹É•Í½±Ù•¸()A•¹‘¥¹œÕÍ•ÈÉ•ÅÕ•ÍÑÌ•áÁ±¥¥Ñ±äÉ•Ñ…¥¹•èÍÑÉ½¹•È	±ÕÈ…µ½Õ¹Ğ½É…‘¥ÕÌÍ•Á…É…Ñ”™É½´)½Á…¥Ñäì¥µ…”É…ÍÑ•È½¹Ù•ÉÍ¥½¸½•‘¥Ñ…‰±”‰±ÕÈì5•É”½İ¸½±…ÑÑ•¸İ¥Ñ ‰±•¹½µ…Í¬)…ÁÁ•…É…¹”ÁÉ•Í•ÉÙ•ìÍÑ…•Ñ•áÑÕÉ”½¥µ…”½…±Á¡„É•Í½±ÕÑ¥½¸…¹±…å•Èµ½Õ¹Ğ¡½¥•Ì)İ¥Ñ µ•µ½Éä‰Õ‘•ÑÌ¸ÕÉÉ•¹ĞÔÄË
ÈÁ…¥¹Ñ•µ…ÁÌ°ÄÀÈÓ
ÈÍ½ÕÉ•Ì°ÈÔÛ
ÈÑ¥ÁÌ±‰…Í”¬Ì½Ù•É±…åÌ)Õ¹¡…¹•¸MµÕ‘”½<½UX•‘”µÍ•…´…ÕÑ¡½É¥¹œÅÕ•Õ•ìÑ¡¥Ì¥Ì¥µ…”İÉ…ÁÁ¥¹œ½¹±ä¸((´lt€¸äÌÌ‘•Ù¥”è€­%µ…—ŠI=¸ÍÕÉ™…”ìÁ±…”¹•…ÈÕ‰”•‘”°±¥™Ğ°½É‰¥ĞÑ¼Í•”¥µ…”½¹Ñ¥¹Õ”½¹Ñ¼…‘©…•¹Ğ™…”¸(´lt€¸äÌÌ‘•Ù¥”èµ½Ù”…¹¡½È½¹Ñ¼¹•áĞ™…”ìÑ…Àµå±”I½Ñ…Ñ”½M…±”°±¥™Ğì¥µ…”É•µ…¥¹ÌİÉ…ÁÁ•¸QÉäÍÁ¡•É”Á…Ñ ™½È…•ÁÑ…‰±”ÕÉÙ…ÑÕÉ”½ÍÑÉ•Ñ ¸(´lt€¸äÌÌ‘•Ù¥”èÁÁ±çŠIU¹‘¼½I•‘¼°M…Ù”½=Á•¸É•Ñ…¥¹ÌİÉ…ÁÁ¥¹œì‘¥Ğ¥µ…—ŠI=¸ÍÕÉ™…”É•Á¥­Ìì…¹•°ÁÉ•Í•ÉÙ•Ì½µµ¥ÑÑ•¥µ…”¸((¸äÌÌ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØÜÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)M¥à¹•Ü¡•­Ì€¬¹•…É‰äÄä€ôÈÕAMLìÉ•±•…Í”ÕAML¸9¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸)AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½İÌì…ÑÕ…°¥A…äÌÌ…Ñ”Á•¹‘¥¹œ¸((ŒŒ€¸äÌÌÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÈàÑ˜ÈäÈÌÀÙŒÀÙ„àÔİ™™ŒÀĞİ‰Õ‘ĞäÜÌÜÀÌÄÈÌÌİ€°Ñ•ÍÑ•ÑÉ•”)€ĞÈÀå‘‘„ØĞÈØÜØØÔÉˆÜÙ™•ˆàåŒÌÄĞá•ŒÔÕ‘„É˜åˆÉ€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸)½¹¹•Ñ•¥Ğ…Ñ„ÕÁ±½…‘•Ää•á…Ğ±½…°‰±½‰Ìì™•Ñ¡•µ…¥¸µ…Ñ¡•ÌÑ•ÍÑ•ÑÉ•”¸)1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÔÄÀÌÄÈÄàÌ½©½ˆÄÄàäÈäÌääÈÜÈ‰½Ñ Á…ÍÌ(¨¨È°ØÜÀÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸)A…•ÌÌäÔÄÀÌÄÄĞÀÄ½‘•Á±½äÄÄàäÈäÔàäÜÄĞÍÕ••‘•¸±°ÈĞ™É•Í ¡•­•±¥Ù”™¥±•Ì)‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”¡…¹•¥µ…”½	±ÕÈÉ•Ù•ÉÍ”±½…‘•ÈÉ…Á °)¹•ÜÍ¡…É•É…Á ½İÉ…À¡…ÉĞ°É•½Ù•Éä°µ…¥¸½…”°ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…¹É•Ñ…¥¹•)•áÁ½ÉÑ•È½UX¥¹ÍÁ•Ñ½È½É…ÍÑ•È½¥µ…”µÍ½ÕÉ”½É•¥Á”½İ¹•ÉÌ¸É½é•¸‰Õ¥±‘ÌÕ¹Ñ½Õ¡•ì)¹¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÁ‘…Ñ•¸()	Õ¥±äÌÌ½µÁ±•Ñ”…¹É•…‘äè€­%µ…—ŠI=¸ÍÕÉ™…”°Á±…”¹•…ÈÕ‰”•‘”°±¥™Ğ…¹½É‰¥Ğ)Ñ¼¥¹ÍÁ•Ğ½¹Ñ¥¹Õ…Ñ¥½¸¸É…œ½¹Ñ¼¹•áĞ™…”ìÉ½Ñ…Ñ”½Í…±”°±¥™ĞìÑÉäÕÉÙ•Á…Ñ ¸)ÁÁ±çŠIU¹‘½I•‘¼°M…Ù•=Á•¸É•Ñ…¥¹Ì•á…ĞÉ•ÍÕ±Ğ¸½¹Ñ…ĞÕ¥‘”ÍÑ…åÌÁ±…¹…ÈìİÉ…ÁÁ•)µ•Í ÁÉ•Ù¥•ÜÕÁ‘…Ñ•Ì½¸±¥™Ğ¸%¹Ñ•É…Ñ¥Ù”¡…ÉĞÉ•µ…¥¹ÌÑÉ…¹Í¥•¹Ğì‘¥Ğ¥µ…—ŠH)=¸ÍÕÉ™…”É•Á¥­Ì°…ÌäÄÈ¸ÕÉÙ…ÑÕÉ”½±…É”±½Í•Á…Ñ¡•Ì…¸ÍÑÉ•Ñ ½É•… ‰½Õ¹‘…Éä¸)9¼‘•Ù¥”äÌÌ…ÁÁ•…É…¹”½±…Ñ•¹äAML¥¹™•ÉÉ•ìäÌÈ	±ÕÈ…¹äÈä…±Á¡„…Ñ•ÌÁ•¹‘¥¹œ¸)9•áĞÍÑÉ½¹•È	±ÕÈ°¥µ…”½¹Ù•ÉÍ¥½¸½‰±ÕÈ°5•É”½±…ÑÑ•¸°‰½Õ¹‘•É•Í½±ÕÑ¥½¸½±…å•È)½ÁÑ¥½¹ÌìMµÕ‘”½<½Í•…´…ÕÑ¡½É¥¹œÉ•µ…¥¸ÅÕ•Õ•¸I•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ğ¸)Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±äìÙ•É¥™¥•ÉÕ¹Ñ¥µ”É•µ…¥¹Ì‰åÑ”µ¥‘•¹Ñ¥…°¸((ŒŒ€¸äÌĞƒŠP	±ÕÈµ½Õ¹Ğì€¸äÌÌÕÍ•ÈAMLƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈäÌÍAMLÁÉ½Ñ•ÑÌ¥µ…”İÉ…ÁÁ¥¹œ…É½ÍÌÕ‰”•‘•Ì½UXÍ•…µÌ°5½Ù”½I½Ñ…Ñ”½M…±”°)ÁÁ±ä½¡¥ÍÑ½Éä½M…Ù•=Á•¸¸Õ‘¥Ğµ…¥¸ØØàá‘”ÄÜ½±¥Ù”äÌÌè½É¥¥¹…°Á…¥¹Ğµ½É”¡…Ì™¥á•)•¹ÑÉ”Ğ½…É‘¥¹…°Ä½¹”µÁ…ÍÌ‰±ÕÈ°¹¼ÍÑÉ½¹•È™¥±Ñ•È½Í±¥‘•È½İ¹•È¸áÑ•¹½É¥¥¹…°)É…ÍÑ•È½¹±äì¹¼¹•Ü‰ÉÕÍ °…‘©…•¹ä°¥¹ÁÕĞ°¡¥ÍÑ½Éä°É•Í½ÕÉ”½ÈİÉ¥Ñ•È¥µÁ±•µ•¹Ñ…Ñ¥½¸¸()	±ÕÈÍ¡½İÌµ½Õ¹ĞÇŠLÌÈ°‘•™…Õ±Ğà¸µ½Õ¹ĞÉ•Á•…ÑÌ•á¥ÍÑ¥¹œÍµ½½Ñ¡¥¹œ­•É¹•°½Ù•ÈÑ¡”)ÍÑÉ½­”µÍÑ…ÉĞÍ¹…ÁÍ¡½Ğì=Á…¥Ñäµ¥á•Ì™¥±Ñ•É•Ñ…É•Ğİ¥Ñ ½É¥¥¹…°ìM¥é”½¹ÑÉ½±Ì‰ÉÕÍ )™½½ÑÁÉ¥¹Ğ¸½É”™¥±Ñ•È¹…µ½Õ¹Ğ‘•™…Õ±ÑÌÄ€¡±•…ä…±±Ì½Í•ÑÑ¥¹ÌÉ•µ…¥¸Ù…±¥¤¸5…¥¸)U$Á…ÍÍ•Ì½ÁÑ¥½¹…°‰±ÕÉµ½Õ¹ĞìÍ¡…É•‰ÉÕÍ ‘•™…Õ±ÑÌ½1…ˆÍ…Ù•Í•ÑÑ¥¹Ì½¹…Ñ¥Ù”Í¡•µ…Ì)Õ¹¡…¹•¸á¥ÍÑ¥¹œ½É¥¥¹…°¹•¥¡‰½ÕÈÑ…‰±”¡…¹‘±•Ì½¹¹•Ñ•™…•Ì½UXÍ•…µÌ½¸•Ù•Éä)Á…ÍÌì¹¼…Ñ±…Ìµ¹•¥¡‰½ÕÈÉ•…‘Ì½È¹•ÜÑ½Á½±½äÁ±…¸¸]É¥Ñ•ÌÍÑ¥±°±¥ÀÑ¼Á¥­•™…”è)ÍÑÉ½­”‰½Ñ Í¥‘•Ì¸=¹”µÁ…ÍÌ•á…Ğ…•ÁÑ•€¸äÌÄ¼¸äÌÈ½ÕÑÁÕÑÌÉ•Ñ…¥¹•ìÍÑÉ½¹œ‰±ÕÈ)ÕÍ•ÌÁÉ•µÕ±Ñ¥Á±¥•I	Ñ¡É½Õ …±°Á…ÍÍ•Ì€¡É…Üµ…Í­Ì½Í…±…ÉÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ğ¤¸()½µÁÕÑ”Ñ…É•Ğ½¹”½½¹Ñ…Ğ°ÕÍ¥¹œÑİ¼‰½Õ¹‘•±½…ĞØĞI	‰Õ™™•ÉÌÑ¼…Ù½¥É½Õ¹‘¥¹œ)‰•Ñİ••¸Á…ÍÍ•Ìì½¹”Ñ…É•ĞÉ•Ñ…¥¹•™½È½¹Ñ…Ğ¸ĞÔÄË
È•… ‰Õ™™•Èá5¥°ÄÙ5¥™¥±Ñ•É¥¹œ)‰Õ™™•ÉÌÑ½Ñ…°ìÑ…É•Ğá5¥É•Ñ…¥¹•Á±ÕÌ•á¥ÍÑ¥¹œ‰•™½É”½½Ù•É…”½‘½µ…¥¸½Á½½°É•Í½ÕÉ•Ì¸)U¹¥™½É´Í½ÕÉ•ÌÍ¡½ÉÑÕĞì½Á…¥ÑäÀÍ­¥ÁÌ™¥±Ñ•É¥¹œ¸5…àÌÈ¨ÔÄË
ÈÑ•á•°Ù¥Í¥ÑÌ°¹¼)Á•Èµ‘…ˆÉ•Á•…Ñ•™¥±Ñ•É¥¹œ½ÈÕ¹‰½Õ¹‘•™••‘‰…¬¸½Ù•É…”É•µ…¥¹Ìµ…à½½¹Ñ…Ğì)±¥™Ğ½É•Á•…Ğ™½Èµ½É”¸¥¹¥Í ½…¹•°½‘¥ÍÁ½Í”‘É½ÁÌÑ…É•ĞìÙ…±¥‘…Ñ¥½¸ÁÉ••‘•Ì½¹Ñ…Ğ)ÍÑ…Ñ”ÁÕ‰±¥…Ñ¥½¸¸µ½Õ¹Ğ¥¹ÁÕĞ…¹•±Ì¥¸µ™±¥¡Ğİ½É¬…¹ÕÁ‘…Ñ•Ì•á¥ÍÑ¥¹œÉ•…‘½ÕĞì)½É¥¥¹…°A…¥¹Ğ¡¥ÍÑ½ÉäÉ•½Á•¸É•Ñ…¥¹ÌÑ½½°½…µ½Õ¹Ğ¸ÕÉÉ•¹ĞÍ•±•Ñ•±…å•È½¡…¹¹•°½¹±ä¸)%µ…”½±½ÕÈÍÑ…åÌÍ½ÕÉ”µÁÉ•Í•ÉÙ•½É•…µ½¹±äÁ•¹‘¥¹œ•áÁ±¥¥Ğ¥µ…”½¹Ù•ÉÍ¥½¸¸()¥Ù”¹•ÜÉ•É•ÍÍ¥½¹Ìè…¹…±åÑ¥…°½¹”½Ñİ¼¼ÌÈµÁ…ÍÌ¥µÁÕ±Í”…¹¥¹‘•Á•¹‘•¹Ğ½Á…¥Ñäì)…±Á¡„½É…ÜÍ…±…È½‘½µ…¥¸½¥¹Ù…±¥½¹¼µ½À½…¹•°ìÍÑÉ½¹œ™½±‘•µÍ•…´Í…µÁ±¥¹œ•á±Õ‘•Ì)…Ñ±…Ì‘•½ä…¹™…Èµ™…”İÉ¥Ñ•Ìì…ÑÕ…°U$±½Ü½¡¥ Í½™Ñ¹•ÍÌ°…µ½Õ¹Ğµ¡…¹”É½±±‰…¬°)A…¥¹ĞU¹‘½I•‘¼…¹M…Ù•=Á•¸½•á…Ğ¹…Ñ¥Ù”A9ìÍ…±…È½µ…Í¬¥Í½±…Ñ¥½¸½¡•­Á½¥¹ĞÉ•™ÕÍ…°¸)½ÕÍ•ÈÙAML¥¹°€¸äÌÌİÉ…ÁÁ¥¹œØ…¹A…¥¹Ğµ¡¥ÍÑ½ÉäÔìÉ•±•…Í”ÕAMLì™Õ±°‰•±½Ü¸)9¼½±…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸½µÁ±•Ñ”¡…¹•É…ÍÑ•È½1…ˆ½µ…¥¸É•Ù•ÉÍ”±½…‘•ÈÉ…Á äÌĞì)…•ÁÑ•äÌÌİÉ…À½É…Á ½•áÁ½ÉĞ½UX¥¹ÍÁ•Ñ½È°µ…¥¸½…”½5Õ±Ñ¤½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸)•Ù¥”äÌĞÍÑÉ•¹Ñ ½™¥ÉÍĞµ½¹Ñ…Ğ±…Ñ•¹äÁ•¹‘¥¹œì9½‘”Ñ¥µ¥¹Ì…É”¹½Ğ¥A…•Ù¥‘•¹”¸)I•…‘½Ì½Á…¥¹Ğµ‰±ÕÈµ…µ½Õ¹Ğ´äÌĞ¹µ¸I•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•¸)9•áĞ¥µ…”µÑ¼µÁ…¥¹Ğ½¹Ù•ÉÍ¥½¸½‰±ÕÈ°Ñ¡•¸5•É”½İ¸½±…ÑÑ•¸°ÍÑ…•É•Í½±ÕÑ¥½¹Ì½±…å•È)‰Õ‘•ÑÌìMµÕ‘”½<½•‘”µÍ•…´…ÕÑ¡½É¥¹œÅÕ•Õ•¸ÕÉÉ•¹ĞÔÄË
È¼ÄÀÈÓ
È¼ÈÔÛ
È½‰…Í”¬ÌÕ¹¡…¹•¸((´mátUÍ•È€¸äÌÌAMLÁÉ½Ñ•ÑÌ½¹¹•Ñ•ÍÕÉ™…”¥µ…”İÉ…ÁÁ¥¹œ°¹•áĞµ™…”Á±…•µ•¹Ğ½I½Ñ…Ñ”½M…±”°ÁÁ±ä½¡¥ÍÑ½Éä½M…Ù•=Á•¸¸(´lt€¸äÌĞ‘•Ù¥”è½µÁ…É”µ½Õ¹ĞÄÙ•ÉÍÕÌÌÈ½¸Í…µ”Á…¥¹Ñ•µ…É¬€¡U¹‘¼‰•Ñİ••¸¤°=Á…¥ÑäÄÀÀ”ì¡¥¡•È…µ½Õ¹ĞÙ¥Í¥‰±äÍ½™Ñ•È½İ¥‘•È¸(´lt€¸äÌĞ‘•Ù¥”è±½İ•È=Á…¥Ñäµ¥á•Ì±•ÍÌìM¥é”¡…¹•Ì…™™•Ñ•…É•„¸¥ÉÍĞ½¹Ñ…Ğ½µ…àµµ½Õ¹Ğ±…Ñ•¹ä…•ÁÑ…‰±”¸(´lt€¸äÌĞ‘•Ù¥”è	±ÕÈ½Ù•È‰½Ñ Í¥‘•Ì½˜Õ‰”•‘”°U¹‘¼½I•‘¼ÍÑ…åÌ¥¸A…¥¹Ğİ¥Ñ µ½Õ¹ĞÉ•Ñ…¥¹•ì½¹Ñ¥¹Õ”Á…¥¹Ñ¥¹œ…¹İÉ…ÁÁ•¥µ…•ÌÉ•µ…¥¸¥¹Ñ…Ğ¸((¸äÌĞ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØÜÔAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)½ÕÍ•ÈÙAML€¬É•±•…Í”ÕAMLì¹¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸!½ÍÑ•½A…•Ì½±¥Ù”)Ù•É¥™¥…Ñ¥½¸™½±±½İÌì…ÑÕ…°¥A…äÌĞÍÑÉ•¹Ñ ½±…Ñ•¹ä…Ñ”Á•¹‘¥¹œ¸((ŒŒ€¸äÌĞÁÕ‰±¥…Ñ¥½¸±½Í•ìÕÍ•ÈAMLƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ•‰ŒàĞĞÔÁ”ÜØÁ„ÔĞĞÈĞäÌá”Á˜ÈÔĞáÀÕ•„Á……˜Å”°Ñ•ÍÑ•ÑÉ••”ÔåˆÉ‰…ŒÍˆåŒÔÌÅ„àÄÔĞÀÍ˜Ù‰…ˆÄàÄÙå”Í„ÀÑ…”°)ÁÕ‰±¥Í¡•¸!½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÔÄÈÈäĞÌĞÜ½©½ˆÄÄàäÌØÀÄØÜÀà±½Ì½¹™¥É´ÈØÜÕAML¼(Á%0¼ÁÍ­¥À°µ…Ñ¡¥¹œÉ•½É‘•±½…°9½‘”ÈĞÉÕ¸¸A…•ÌÌäÔÄÈÈäÌÀĞà½‘•Á±½äÄÄàäÌØÈÈÔÌÜä)ÍÕ••‘•¸1¥Ù”äÌĞµ…¹¥™•ÍĞ…¹…±°ÈÜ¡•­•ÉÕ¹Ñ¥µ”½ÁÉ½Ñ•Ñ•™¥±•Ì‰åÑ”µµ…Ñ Ñ¡”)ÁÕ‰±¥Í¡•äÌĞÍ½ÕÉ”€¡¥ĞµÍ¡½ÜÍ¹…ÁÍ¡½ĞÕÍ•İ¡¥±”äÌÔİ½É­¥¹œÑÉ•”İ…Ì‘¥ÉÑä¤¸UÍ•È)AMLäÌĞÁÉ½Ñ•ÑÌ‘•‘¥…Ñ•	±ÕÈµ½Õ¹ĞÇŠLÌÈ½‘•™…Õ±Ğà°¥¹‘•Á•¹‘•¹Ğ=Á…¥Ñä½M¥é”°É•Ñ…¥¹•)A…¥¹Ğ¡¥ÍÑ½Éä…¹•…É±¥•ÈäÌÌ¥µ…”İÉ…ÁÁ¥¹œ¸AÉ¥½È¥¹Ñ•ÉÉÕÁÑ•ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜¥Ì¹½Ü)±½Í•ì¹¼¹•ÜäÌĞÉÕ¹Ñ¥µ”¡…¹•Ì¸±Á¡„äÈä…•ÁÑ…¹”É•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ñ±äÁ•¹‘¥¹œ¸((ŒŒ€¸äÌÔƒŠP%µ…”Ñ¼Á…¥¹Ğ½¹Ù•ÉÍ¥½¸ì€¸äÌĞAMLƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()Õ‘¥Ğµ…¥¹‰ŒàĞĞÔÁŒ½±¥Ù”äÌĞèÍ½ÕÉ”µÁÉ•Í•ÉÙ•¥µ…”…¡”…¹•áÁ±¥¥ĞÁ…¥É•É•Á±…•µ•¹Ğ)•á¥ÍĞì¹¼É…ÍÑ•È½¹Ù•ÉÍ¥½¸¸áÑ•¹½É¥¥¹…°Á…¥¹Ğµ±…å•ÈµÍÑ…¬İ¥Ñ •áÁ±¥¥Ğ)É…ÍÑ•É¥é•%µ…•A…¥¹Ñ1…å•ÈèÙ…±¥‘…Ñ•½İ¹•Í¹…ÁÍ¡½Ğ°Í…µ”ÍÑ…¬½Ù•ÉÍ¥½¸½½É‘•È½%½¹…µ”¼)Ù¥Í¥‰¥±¥Ñä½½Á…¥Ñä½‰±•¹½µ…Í¬½Á¥á•±Ìì=91dÍ•±•Ñ•¥µ…”É•¥Á”‰•½µ•Ì¹Õ±°¸á¥ÍÑ¥¹œ)½µÁ½Í¥Ñ½ÈÙ•É¥™¥•Ì¥‘•¹Ñ¥…°…ÁÁ•…É…¹”°¥¹±Õ‘¥¹œ•Ù•ÉäÍÕÁÁ½ÉÑ•‰±•¹…¹¥¹Ù•ÉÑ•)µ…Í¬¸9¼¥µÁ±¥¥Ğ½µÁ½Í¥Ñ¥¹œ¥¹Ñ¼‰…Í”°•áÑÉ„±…å•È°É•Í…µÁ±¥¹œ°¹•ÜİÉ¥Ñ•È½Í¡•µ„°)‰ÉÕÍ °¡¥ÍÑ½Éä°µ½‘•±±¥¹œ½ÈUX½İ¹•È¸á¥ÍÑ¥¹œÑ¡É•”µ½Ù•É±…ä¼ÔÄË
È±¥µ¥ÑÌÕ¹¡…¹•¸()%µ…”µ½¹±ä½¹Ù•ÉĞÑ¼Á…¥¹Ğ‰ÕÑÑ½¸ÕÍ•Ì½É¥¥¹…°±…å•ÉÑ¥½¸½Í•¹”¡•­Á½¥¹Ğ½ÁÉ•™±¥¡Ğ¼)=\½İ¹•È¸½¹Ù•ÉÍ¥½¸Í•±•ÑÌ½±½ÕÈ•Ù•¸İ¡•¸¥µ…”µ…Í¬İ…ÌÍ•±•Ñ•ì	ÉÕÍ °É…Í•È°)¥±°…¹	±ÕÈÑ¡•¸ÕÍ”½É¥¥¹…°É…ÍÑ•È…¹…•ÁÑ•äÌĞµ½Õ¹Ğ¸=Ñ¡•È¥µ…”±…å•ÉÌ­••À)Í½ÕÉ”•‘¥Ñ¥¹œ¸M…µ”Á¥á•±Ì¥¹±Õ‘”äÌÌİÉ…ÁÁ•Á±…•µ•¹Ğ¸‘¥Ğ¥µ…”‰ÕÑÑ½¸‘¥Í…ÁÁ•…ÉÌ)‰ä½É¥¥¹…°ÍÑ…Ñ”İ¡•¸¹¼É•¥Á”ì¹…µ”½Í±½ĞÉ•Ñ…¥¹•¸U¹‘¼É•ÍÑ½É•ÌÉ•Ñ…¥¹•Í½ÕÉ”…¹)Á±…•µ•¹Ğ•‘¥Ñ¥¹œ°I•‘¼É•ÍÑ½É•ÌÉ…ÍÑ•È½¹Ù•ÉÍ¥½¸¸™Ñ•ÈM…Ù”½=Á•¸½¹Ù•ÉÑ•±…å•È¥Ì)½É‘¥¹…Éä•‘¥Ñ…‰±”Á¥á•±ÌìÍ½ÕÉ”É•¥Á”¥Í¸ĞÍ•É¥…±¥é•™½ÈÑ¡…Ğ±…å•È¸=Ñ¡•È½‰©•ÑÌ)Í¡…É¥¹œ½±É•Í½ÕÉ”…¹½É¥¥¹…°Í…Ù•¥µ…”Í½ÕÉ•ÌÉ•µ…¥¸Õ¹¡…¹•¸M½ÕÉ”É•±•…Í”)É•‘Õ•Ì½µµ¥ÑÑ•É•Í½ÕÉ”‰åÑ•ÌìU¹‘¼µ…äÍÑ¥±°É•Ñ…¥¸¥Ğ¥¸‰½Õ¹‘•Í•¹”¡¥ÍÑ½Éä¸()	±½¬½¹Ù•ÉÍ¥½¸İ¡¥±”ÍÑ…•¥µ…”Á±…•µ•¹Ğ•á¥ÍÑÌ°­••Á¥¹œ…¹‘¥‘…Ñ”½½µµ¥ÑÑ•İ½É¬)¥¹Ñ…ĞìÁÁ±ä½…¹•°™¥ÉÍĞ¸5¥ÍÍ¥¹œ½¹½¹¥µ…”½Í…±…È½ÍÑ…±”Ñ…É•Ğ½¡•­Á½¥¹Ğ½Á½½°•ÉÉ½ÉÌ)±•…Ù”½µµ¥ÑÑ•É•Í½ÕÉ•Ì½¡¥ÍÑ½ÉäÕ¹Ñ½Õ¡•¸I•…µ½¹±ä¥µ…”µ•ÍÍ…”­••ÁÌ…•ÁÑ•(%µ…”½±½ÕÈ¥ÌÉ•Ñ…¥¹•œÁÉ•™¥à…¹Á½¥¹ÑÌÑ¼½¹Ù•ÉÍ¥½¸¸U$É•ÑÕÉ¸½É•ÍÕ±ĞÉ•ÕÍ•™½È)…ÕÉ…Ñ”ÍÕ•ÍÌÍÑ…ÑÕÌ°¹¼Í•Á…É…Ñ”¥¹ÁÕĞ½±¥ÍÑ•¹•È½¡¥ÍÑ½ÉäÍåÍÑ•´¸ÕÉÉ•¹ĞA…¥¹ĞÍÑ…åÌ¸()¥Ù”¹•ÜÑ•ÍÑÌè…±°µ‰±•¹½µ…Í¬•á…Ğ…ÁÁ•…É…¹”…¹½İ¹•‰Õ™™•ÉÌ½‰åÑ”…½Õ¹Ñ¥¹œì)…ÑÕ…°İÉ…ÁÁ•¥µ…”U'ŠI½¹Ù•ÉÓŠIÍÑÉ½¹œ	±ÕËŠIA…¥¹ĞU¹‘½I•‘¿ŠIM…Ù•=Á•»ŠI•á…Ğ¹…Ñ¥Ù”A9ì)µ…Í¯ŠI½±½ÕÈ…¹	ÉÕÍ ½É…Í•È½™Õ±°µÍÑ…¬½½Ñ¡•Èµ¥µ…”½Í…±…È‰•¡…Ù¥½ÈìÍÑ…•½µ¥ÍÍ¥¹œ½ÍÑ…±”¼)¡•­Á½¥¹Ğ½Á½½°É•™ÕÍ…°ìÍÑ…•U$•‘¥Ğ½…¹•°Õ…É¸9•…É‰ääÀà¼äÌÌ¼äÌĞ…¹É•±•…Í”Ô)É•µ…¥¸…Ñ¥Ù”ì™Õ±°½ÁÕ‰±¥…Ñ¥½¸‰•±½Ü¸½µÁ±•Ñ”¡…¹•ÍÑ…¬½É•Í½ÕÉ”½ÁÉ½©•Ğ½•áÁ½ÉĞ¼)1…ˆ½µ…¥¸É•Ù•ÉÍ”±½…‘•ÈÉ…Á äÌÔì™Õ¹Ñ¥½¹…°¡…¹”½¹™¥¹•Ñ¼½É¥¥¹…°Ì½İ¹•ÉÌ¸)•ÁÑ•É…ÍÑ•ÈäÌĞ°İÉ…ÀäÌÌ½UX½µ•Í ­•É¹•±Ì½µ…¥¸½…”½5Õ±Ñ¤½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸)I•…‘½Ì½Á…¥¹Ğµ¥µ…”µÉ…ÍÑ•É¥é”´äÌÔ¹µ¸•Ù¥”äÌÔ½¹Ù•ÉÍ¥½¸½‰±ÕÈ½U¹‘¼™••°Á•¹‘¥¹œ¸)9•áĞ5•É”½İ¸½±…ÑÑ•¸Ñ¡É½Õ •á¥ÍÑ¥¹œ½µÁ½Í¥Ñ½ÈÑ¼™É•”Í±½ÑÌ°Ñ¡•¸ÍÑ…•Ñ•áÑÕÉ”¼)Í½ÕÉ”½…±Á¡„É•Í½±ÕÑ¥½¸…¹±…å•È‰Õ‘•ÑÌ¸MµÕ‘”½<½UX•‘”µÍ•…´…ÕÑ¡½É¥¹œÅÕ•Õ•ì)É•™±•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•¸ÕÉÉ•¹ĞÔÄË
È¼ÄÀÈÓ
È¼ÈÔÛ
È½‰…Í”¬ÌÉ•Ñ…¥¹•¸((´mátUÍ•ÈäÌÑAMLÁÉ½Ñ•ÑÌ	±ÕÈµ½Õ¹Ğ½=Á…¥Ñä½M¥é”…¹½É¥¥¹…°A…¥¹Ğ½¡¥ÍÑ½Éä°…±½¹Í¥‘”äÌÌİÉ…ÁÁ•Á±…•µ•¹Ğ¸(´lt€¸äÌÔ‘•Ù¥”èÍ•±•Ğ…ÁÁ±¥•¥µ…—ŠI½¹Ù•ÉĞÑ¼Á…¥¹Ğì…ÁÁ•…É…¹”½Á±…•µ•¹ĞÕ¹¡…¹•°Ñ¡•¸	ÉÕÍ ½	±ÕÈµ½Õ¹Ğ•‘¥ÑÌ¥Ğ¸(´lt€¸äÌÔ‘•Ù¥”èU¹‘¼•‘¥ÑÌÑ¡•¸½¹Ù•ÉÍ¥½¸É•ÍÑ½É•Ì‘¥Ğ¥µ…”ìI•‘¼É•ÑÕÉ¹Ì½¹Ù•ÉÑ•Á…¥¹Ğ°ÍÑ…å¥¹œ¥¸A…¥¹Ğ¸(´lt€¸äÌÔ‘•Ù¥”èM…Ù”½=Á•¸É•Ñ…¥¹Ì½¹Ù•ÉÑ•Á…¥¹Ğì½Ñ¡•È¥µ…”±…å•ÉÌÉ•µ…¥¸•‘¥Ñ…‰±”¸ÁÁ±ä½…¹•°ÍÑ…•Á±…•µ•¹Ğ‰•™½É”½¹Ù•ÉÍ¥½¸¸((¸äÌÔ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØàÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)½ÕÍ•ÈåAML€¡¹•ÜÔ°¥µ…”äÀà•¥¡Ğ°İÉ…ÀäÌÌÍ¥à°µ½Õ¹ĞäÌĞ™¥Ù”°É•±•…Í”Ô¤ì¹¼)•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥…Ñ¥½¸™½±±½İÌ¸((ŒŒA•Éµ…¹•¹Ğ½µÁ±•Ñ¥½¸µ¥¹ÍÑÉÕÑ¥½¸…Õ‘¥ĞƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á•…Ñ•AML€½¹•áÑ‰Õ¥±İ¡¥±”äÌÔÁÕ‰±¥…Ñ¥½¸İ…ÌÁ•¹‘¥¹œ…¹…Í­•Ñ¼…Õ‘¥Ğ)µ…¹Õ…°µÑ•ÍĞ¥¹ÍÑÉÕÑ¥½¹Ì¸%}]=I-1=\…±É•…‘ä•áÁ±¥¥Ñ±äÉ•ÅÕ¥É•ÌÉ•…‘¥¹•ÍÌ½‰Õ¥±)¹Õµ‰•È…¹ÏŠLØÅÕ¥¬‘•Ù¥”¡•­Ìì%}!9=…±Í¼½¹Ñ…¥¹•Ñ¡”Ää=Ñ½‰•ÈÉ•µ¥¹‘•È)¥¹Í¥‘”…¸½±‘•È•¹ÑÉä¸AÉ½µ½Ñ•Ñ¡”Í…µ”ÉÕ±”Ñ¼Ñ¡”Q=@½˜%}!9=…Ì„Á•Éµ…¹•¹Ğ)Í•Ñ¥½¸¸%Ğ…ÁÁ±¥•Ì•Ù•Éä‰Õ¥±°¥¹±Õ‘¥¹œ…¸•áÁ±¥¥Ğ¹¼µ¹•ÜµÑ•ÍĞÍÑ…Ñ•µ•¹Ğİ¡•¸)…ÁÁÉ½ÁÉ¥…Ñ”ì¹•Ù•È•¹İ¥Ñ ½¹±äÁÉ½É•ÍÌ¸9¼ÉÕ¹Ñ¥µ”¡…¹”¥¸Ñ¡¥Ì…Õ‘¥Ğ¸ÕÉÉ•¹Ğ)¹•áĞ‰Õ¥±É•µ…¥¹ÌäÌÔ€¡ÁÕ‰±¥Í¡•µ…¥¸İ…ÌäÌĞİ¡•¸AML…ÉÉ¥Ù•¤ì™¥¹¥Í äÌÔ…¹¥ÑÌ)¡…¹‘Ìµ½¸¥µ…”½¹Ù•ÉÍ¥½¸½	±ÕÈ½U¹‘¼½M…Ù•=Á•¸±¥ÍĞ‰•™½É”‘•±…É¥¹œ¥ĞÉ•…‘ä¸((ŒŒ€¸äÌÔÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ĞÑŒÑ•˜ÀÌÙ™İ™„ÅØÅ‰‰•”ĞàÀÉ„ÔÀØÄØÙŒĞåˆÍ€°ÁÕ‰±¥Í¡•ÑÉ•”)˜ÌÜĞäàÀÌÈĞÌÄÀİ„Àäİ•ˆÜäáŒÔÙ•‘ˆÁ•ŒÜÍ„ÄäÀÍ€°µ…Ñ¡•Ì±½…°µ…¥¸•á…Ñ±ä¸)=É¥¥¹…°±½…°Ñ•ÍÑ•ÑÉ••…ŒÔØØÌÀÔ¡…¥‘•¹Ñ¥…°ÉÕ¹Ñ¥µ”ì½¹±ä™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì)¡…¹•Ñ¼ÁÉ½µ½Ñ”Ñ¡”Á•Éµ…¹•¹Ğ½µÁ±•Ñ¥½¸ÉÕ±”‰•™½É”ÁÕ‰±¥…Ñ¥½¸¸¥Ğ…Ñ„ÑÉ•”)Ù•É¥™¥•İ¥Ñ …±°Èà‰±½‰Ì¸1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÔàØØÀÄÔÔØ¼)©½ˆÄÄäÄÜØäÌÜÌØÀ‰½Ñ Á…ÍÌ€¨¨È°ØàÀÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì™Õ±°¡½ÍÑ•±½Ì)Ù•É¥™¥•¸A…•ÌÌäÔàØØÀÄÀÜä½‘•Á±½äÄÄäÄÜÜÄÔĞÄÌÀÍÕ••‘•¸±°ÌÜ™É•Í ¡•­•±¥Ù”)™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”¡…¹•É•Í½ÕÉ”½ÁÉ½©•Ğ½•áÁ½ÉĞ½1…ˆ½Á…¥¹Ğ)±½…‘•ÈÉ…Á …¹É•Ñ…¥¹•É…ÍÑ•ÈäÌĞ°İÉ…ÀäÌÌ°UX¥¹ÍÁ•Ñ½È°µ…¥¸½…”½5Õ±Ñ¤Ä¸À½É•½Ù•Éä¼)¥µ…”µÍ½ÕÉ”½İ¹•ÉÌ¸É½é•¸‰Õ¥±‘ÌÕ¹Ñ½Õ¡•ì¹¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸()!…¹‘½™˜…Õ‘¥Ğ½µÁ±•Ñ”èÁ•Éµ…¹•¹ĞÉ•…‘¥¹•ÍÌ½‰Õ¥±½µ…¹Õ…°µÑ•ÍĞÉÕ±”İ…Ì…±É•…‘ä¥¸)%}]=I-1=\…¹…¸½±‘•È%}!9=•¹ÑÉäì¹½ÜÁÉ½µ¥¹•¹Ñ±ä…ĞQ=@½˜%}!9=¸)Ù•Éä™¥¹¥Í¡•‰Õ¥±µÕÍĞ¥Ù”¥ÑÌÉ•…‘¥¹•ÍÌ°‰Õ¥±¹Õµ‰•È…¹Í¡½ÉĞ‘•Ù¥”Ñ•ÍÑÌ°)½È•áÁ±¥¥Ñ±äÍ…ä¹¼¹•ÜÑ•ÍĞ¥Ì¹••‘•¸9•Ù•È•¹İ¥Ñ ÁÉ½É•ÍÌ…±½¹”¸)±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹Ğ¸Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸()	Õ¥±äÌÔ½µÁ±•Ñ”…¹É•…‘äè…ÁÁ±¥•¥µ…”±…å•ËŠI½¹Ù•ÉĞÑ¼Á…¥¹Ğ°…ÁÁ•…É…¹”­•ÁĞì)	±ÕÈµ½Õ¹Ğ½	ÉÕÍ ½É…Í•È•‘¥ÑÌÁ¥á•±ÌìU¹‘¼•‘¥ÑÌ…¹½¹Ù•ÉÍ¥½¸É•ÍÑ½É•Ì‘¥Ğ¥µ…”ì)I•‘¼Ñ¡•¸M…Ù•=Á•¸É•Ñ…¥¹Ì•‘¥Ñ…‰±”Á…¥¹Ğ¸M½ÕÉ”É•¥Á”‰•±½¹ÌÑ¼½±U¹‘¼É•Í½ÕÉ”°)¹½ĞÑ¡”½¹Ù•ÉÑ•Í…Ù•±…å•Èìµ…Í­Ì½‰±•¹‘Ì½½Ñ¡•È¥µ…”±…å•ÉÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ğ¸)UÍ•ÈäÌÑAMLÁÉ½Ñ•Ñ•ì…ÑÕ…°äÌÔ…ÁÁ•…É…¹”½™••°…Ñ”Á•¹‘¥¹œ¸9•áĞ5•É”½İ¸½±…ÑÑ•¸)Ñ¼™É•”Í±½ÑÌ°Ñ¡•¸ÍÑ…•É•Í½±ÕÑ¥½¸½±…å•È‰Õ‘•ÑÌìMµÕ‘”½<½Í•…´…ÕÑ¡½É¥¹œÅÕ•Õ•¸)I•™±•Ñ¥½¸ÁÉ•Ù¥•ÜÉ•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ğì…±Á¡„äÈä‘•Ù¥”…Ñ”¹½Ğ¥¹™•ÉÉ•¸((ŒŒ€¸äÌÔÕÍ•ÈAML€¼€¸äÌØÉ•Í½±ÕÑ¥½¸É•É•ÍÍ¥½¸ƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ((´mátUÍ•È€¸äÌÔAMLè¥µ…—ŠIÁ…¥¹Ğ…ÁÁ•…É…¹”½	ÉÕÍ ½É…Í•È½	±ÕÈ°U¹‘¼É•ÍÑ½É•Í½ÕÉ”°(€I•‘¼½M…Ù•=Á•¸•‘¥Ñ…‰±”Á¥á•±Ì¸…É±¥•È€¸äÌÌ¼¸äÌĞ…¹A…¥¹Ğµ¡¥ÍÑ½ÉäAMM•ÌÁÉ½Ñ•Ñ•¸(´ltY%€¸äÌØèA…¥¹ĞƒŠHQ•áÑÕÉ”É•Í½±ÕÑ¥½¸ƒŠH%¹É•…Í”Ñ¼ÄÀÈÓ\ÄÀÈĞì•á¥ÍÑ¥¹œµ…É­Ì(€É•Ñ…¥¹•ì™É•Í ™¥¹”ÍÑÉ½­•Ì½¹•İ±äÁÉ½©•Ñ•¥µ…”ÕÍ”Í¡…ÉÁ•ÈÉ¥ìA…¥¹ĞÍÑ…åÌ½Á•¸¸(´ltY%èU¹‘¿ŠHÔÄÈ€¼I•‘¿ŠHÄÀÈĞìM…Ù”½=Á•¸É•Ñ…¥¹ÌÄÀÈĞ°½¹Ñ¥¹Õ•Á…¥¹Ğì•áÁ½ÉĞÑ¼(€9½µ…ÁÉ•Í•ÉÙ•Ì¥µ…”Á±…•µ•¹Ğ…¹™É•Í µ…É­Ì¸Q•ÍĞ±…É•ÈM¥é”½	±ÕÈ™••°¸(´ltY%èI½Õ¡¹•ÍÌ½5•Ñ…±¹•ÍÌ…¹µ…Í¬½½±½ÕÈÍİ¥Ñ¡¥¹œÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ğ¸(´ÕÑ½µ…Ñ•€¸äÌØè•á…Ğ½İ¹•Ë\½±½ÕÈ½¥µ…”½µ…Í¬É•Á±¥…Ñ¥½¸°É•Ñ…¥¹•Í½ÕÉ”½Í•ÑÑ¥¹Ì°(€½É¥¥¹…°½¹”µ¡•­Á½¥¹ĞU$½¡¥ÍÑ½Éä½½¹Ñ¥¹Õ•ÄÀÈĞ	ÉÕÍ ­	±ÕÈ½µ…Í¬°ÔÄÈÍ…±…È½µ…Ñ•É¥…°(€‘¥µ•¹Í¥½¹Ì°½µµ¥ÑÑ•‘¥ÍÁ±…ä°Ñ¡É•”½Ù•É±…åÌ°Á½½±•Í•¹”ÑÉ…¹ÍÁ½ÉĞ½•á…Ğ¹…Ñ¥Ù”A9°(€ÁÉ•‘•½‘”½ÉÉÕÁÑ¥½¸½ÅÕ½Ñ„°ÍÑ…•½¡•­Á½¥¹Ğ½ÍÑ…±”É½±±‰…¬¸9¼¥A…Á•É™½Éµ…¹”ÁÉ½½˜¸(´AÉ•Í•ÉÙ”½±ÔÄÈ…¹½Á…ÅÕ•ØÄÅÕ½Ñ„Ñ•ÍÑÌì½¹±ä±…å•É•ÄÀÈĞ½ÁÑÌ¥¹Ñ¼¹•Ü‰Õ‘•ÑÌ¸(€á¥ÍÑ¥¹œÍ½ÕÉ”½Ñ¥À½±…å•Èµ½Õ¹Ğ½™¥±”½¹…Ñ¥Ù”…ÁÌ…¹UX½İ½É¬Õ…É‘ÌÉ•µ…¥¸…Ñ¥Ù”¸((¸äÌØ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ØàÜAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)M•Ù•¸¹•ÜÉ•Í½±ÕÑ¥½¸¥¹Ñ•É…Ñ¥½¹ÌÁ±ÕÌ•Ù•Éä½É¥¥¹…°Ñ•ÍĞÁ…ÍÌÕ¹¡…¹•¸I•Ù¥•İ•)É•±•…Í”½…¡”½¹ÑÉ…ĞÕAML°½É¥¥¹…°äÀÈÍ¥é”ÔÄÌÉ•™ÕÍ…°É•Ñ…¥¹•¸%¹¥Ñ¥…°•áÁ±½É…Ñ½Éä)ÉÕ¸…‘µ¥ÑÑ•¥¹Ñ•Éµ•‘¥…Ñ”Í¥é•Ìì½É¥¥¹…°Õ…É¹½Ü½¹±ä…‘‘Ì•á…ĞÄÀÈÓ
È…‰½Ù”ÔÄÈ¸)1™¥áÑÕÉ”™½±±½İÌ…ÑÕ…°ÁÉ¥µ¥Ñ¥Ù”µ…Ñ•É¥…°%ì¹¼ÁÉ½‘ÕÑ¥½¸İÉ¥Ñ•Èİ½É­…É½Õ¹¸)±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹Ğ¸AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½İÌì)…ÑÕ…°€¸äÌØ¥A…Í¡…ÉÁ¹•ÍÌ°‰ÉÕÍ ½	±ÕÈ±…Ñ•¹ä…¹µ•µ½Éä…•ÁÑ…¹”É•µ…¥¸Á•¹‘¥¹œ¸((ŒŒ€¸äÌØÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÄ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”‘ÌÄÍ„Àá„ÀÄØÍ•„ÄÙ„àØÀÌÑˆØÀÜÔÔÍ‰™˜ÀÙ”ØÌÕ€°Ñ•ÍÑ•ÑÉ•”)€àÀÄØÔÀàå˜Á•‘”ÌÄÁ••‘”ĞĞÑ˜İ•‰äÜÉ™™˜äÁÁ€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ğ)…Ñ„ÕÁ±½…‘•ÌÄ•á…Ğ‰±½‰Ì…¹É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°Ñ•ÍÑ•ÑÉ•”ì™•Ñ¡•µ…¥¸)µ…Ñ¡•…¹±½…°‰É…¹ İ…Ì…±¥¹•İ¥Ñ¡½ÕĞ™¥±”¡…¹•Ì¸1½…°9½‘”ÈĞ…¹¡½ÍÑ•)9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÔäÌÌÔØÔÌĞ½©½ˆÄÄäÄääÔĞÔÀĞÀ‰½Ñ Á…ÍÌ€¨¨È°ØàÜÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼(ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™¥•¸A…•ÌÌäÔäÌÌÔÔÈàÄ½‘•Á±½äÄÄäÄääÜÔØÜÌÜ)ÍÕ••‘•¸±°ÌÄ¡•­•ÉÕ¹Ñ¥µ”½1…ˆ½Í¡•±°½É•½Ù•Éä½ÁÉ½Ñ•Ñ•™¥±•Ì‰åÑ”µµ…Ñ ¸)%¹¥Ñ¥…°™•Ñ ‰•…¸‘ÕÉ¥¹œÉ½±±½ÕĞ…¹É•ÑÕÉ¹•Í¥à€¸äÌÔ…¹•ÍÑ½ÉÌì™É•Í Á½ÍÑ‘•Á±½ä)É•¡•­Ì±½Í•…±°Í¥à¸9¼™É½é•¸½µ…¥¸½…”½5Õ±Ñ¤•‘¥ÑÌ¸±•Ù•¸™Õ¹Ñ¥½¹…°½İ¹•ÉÌì)•±•Ù•¸É•Ù•ÉÍ”µÉ…Á Á…É•¹Ğ™¥±•Ì½¹Ñ…¥¸…¡”µÉ•™•É•¹”¡…¹•Ì½¹±ä¸()±°™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•ÌÕÉÉ•¹Ğ¸AÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±ä°Í…µ”ÉÕ¹Ñ¥µ”‰åÑ•Ì¸)UÍ•È€¸äÌÔAMLÁÉ½Ñ•ÑÌ½¹Ù•ÉÍ¥½¸½	±ÕÈ½•‘¥Ğ½¡¥ÍÑ½Éä½Á•ÉÍ¥ÍÑ•¹”ì€¸äÌØ‘•Ù¥”‘•Ñ…¥°¼)±…Ñ•¹ä½µ•µ½Éä…Ñ”É•µ…¥¹ÌÁ•¹‘¥¹œ¸I•…‘äèA…¥¹ĞƒŠHQ•áÑÕÉ”É•Í½±ÕÑ¥½¸ƒŠH%¹É•…Í”)Ñ¼ÄÀÈÓ\ÄÀÈĞì™É•Í ÍÑÉ½­•Ì½¹•Ü¥µ…”Á±…•µ•¹Ğ°U¹‘¼ÔÄÈ½I•‘¼ÄÀÈĞ°M…Ù•=Á•¸…¹9=5¸)á¥ÍÑ¥¹œÁ¥á•±Ì•¹±…É”•á…Ñ±äìÉ”µÁ±…”É•Ñ…¥¹•Í½ÕÉ•Ì™½È™É•Í ¥µ…”‘•Ñ…¥°¸)%¹‘•Á•¹‘•¹ĞÔÄÈÍ…±…ÉÌ½Í½ÕÉ”ÄÀÈĞ½…±Á¡„ÈÔØ½‰…Í”­Ñ¡É•”±¥µ¥ÑÌÉ•Ñ…¥¹•¸9•áĞÉ•Í½±ÕÑ¥½¸)™••‘‰…¬Ñ¡•¸5•É”½İ¸½±…ÑÑ•¸ì±…É•ÈÍ½ÕÉ•Ì½µ…ÁÌ½±…å•ÉÌÉ•µ…¥¸ÍÑ…•¸((ŒŒ€¸äÌÜ™É•Í ÄÀÈĞ‘•™…Õ±ĞƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ((´UÍ•È€¸äÌØÉ•Á½ÉÑÌÁ¥á•±…Ñ•¥µ…”…¹™É•Í Õ‰”Á…¥¹Ğ…™Ñ•ÈÉ•™É•Í ì9=P„AML¸(€½¹™¥Éµ•…Õ‘¥Ğè€¸äÌØÁÉ½‘ÕÑ¥½¸‘•™…Õ±ĞÉ•µ…¥¹•ÔÄÈ°%¹É•…Í”½ÁĞµ¥¸İ…Ì½±±…ÁÍ•¸(´ltY%¹•ÜÕ‰”èA…¥¹ĞÍ¡½İÌ½±½ÕÈÑ•áÑÕÉ”ÄÀÈÓ\ÄÀÈĞ¥µµ•‘¥…Ñ•±ä°‰•™½É”Á…¥¹Ğ(€½È…‘‘¥¹œ¥µ…”ì½µÁ…É”™É•Í ™¥¹”ÍÑÉ½­•Ì½¹•Ü¥µ…”°½É‰¥Ğ½é½½´…¹É•ÍÁ½¹Í¥Ù•¹•ÍÌ¸(´ltY%U¹‘¼½I•‘¼É•µ…¥¹Ì¥¸A…¥¹ĞìM…Ù”½=Á•¸­••ÁÌÄÀÈĞ¸á¥ÍÑ¥¹œÔÄÈÁÉ½©•Ğ(€½Á•¹Ì…ĞÔÄÈİ¥Ñ •áÁ½Í•%¹É•…Í”ì•á¥ÍÑ¥¹œÁ¥á•±ÌÍÑ…ä•á…ĞÕ¹Ñ¥°•áÁ±¥¥Ğ…Ñ¥½¸¸(´ÕÑ½µ…Ñ•€¸äÌÜ…ÑÕ…°U$èÄÀÈĞ™¥ÉÍĞµ•‘¥ĞÁ…¥¹Ğ…¹¥µ…”É…ÍÑ•È°¹¼‰±…¹¬=Á•¸½µµ¥Ğ°(€™¥ÉÍĞµÍÑÉ½­”U¹‘¼½I•‘¼½¹•Üµ½¹ÑÉ½±±•ÈÉ•½Á•¸°±•…äÔÄÈ½¹”µÍÑ•À%¹É•…Í”°•á…ĞÍ•¹”¼(€¹…Ñ¥Ù”ÄÀÈĞA9…¹ÔÄÈÍ…±…È¥¹‘•Á•¹‘•¹”¸€¸äÌØ•¹±…É•µ•¹Ğ™¥áÑÕÉ•Ì•áÁ±¥¥Ñ±äÔÄÈì(€…±Á¡„¡•­ÌÕÍ”…ÑÕ…°É¥ìÍ…±…È¡•­Ì½Ù•È•Ù•Éä‘¥ÍÁ±…äÑ•á•°……¥¹ÍĞÉ…ÜÔÄÈ¸(´á¥ÍÑ¥¹œ•½µ•ÑÉä½UX½Á…¥¹Ğ½ÁÉ½©•Ğ½•áÁ½ÉĞ½ÅÕ½Ñ…Ì…¹5Õ±Ñ¤½™É½é•¸½¹ÑÉ…ÑÌÉ•Ñ…¥¹•¸(€•Ù¥”Í¡…ÉÁ¹•ÍÌ¹½Ğ¥¹™•ÉÉ•™É½´9½‘”‘¥µ•¹Í¥½¹Ì½Á¥á•°‰åÑ•Ìì„ÄÀÈĞ…Ñ±…Ì¥ÌÍ¡…É•¸((´€¸äÌÜ…ÑÕ…°ÄÀÈĞÑ¡É•”µ±…å•ÈÁ…¥¹Ñ•ÕÁ±¥…Ñ”µÕÍĞM…Ù”½=Á•¸…‰½Ù”ÌÉ5¥Ñ¡É½Õ (€½É¥¥¹…°¥±”…Ñ¥½¹Ì°•á…ĞÉ•Í½ÕÉ”‰åÑ•Ì¸äÙ5¥¡¥ µÉ•Ì…À¼ÌÉ5¥±•…ä…À(€…¹½Ù•Èµ…À½½ÉÉÕÁÑ¥½¸½Í•¹”­¡¥ÍÑ½ÉäÁÉ•Í•ÉÙ…Ñ¥½¸¡•­ÌÉ•µ…¥¸…Ñ¥Ù”¸((¸äÌÜ™¥¹…°±½…°Ù…±¥‘…Ñ¥½¸è½µÁ±•Ñ”È°ØäÄµ¡•¬ÉÕ¸Á…ÍÍ•È°ØäÀìÑ¡”¹•Ü¡¥ µÉ•Ì)¥±”Ñ•ÍĞ¡……±É•…‘äÍ…Ù•½É•½Á•¹••á…ĞÁ¥á•±Ì°Ñ¡•¸„Ñ•ÍĞµ½¹±äÉ½ÍÌµÉ•…±´)•µÁÑäµ…ÉÉ…ä½µÁ…É…Ñ½È™…¥±•¸I•Á±…•Ñ¡…Ğ½µÁ…É…Ñ½Èİ¥Ñ ½É¥¥¹…°¡¥ÍÑ½Éä±•¹Ñ ¼)¥‘•¹Ñ¥Ñä¡•­Ì°É•Ñ…¥¹¥¹œ•Ù•Éä…ÍÍ•ÉÑ¥½¸¸½ÉÉ•Ñ•™½ÕÍ•¡¥ µÉ•ÌÑ•ÍĞ¹½ÜÅAML( ØåÌ¤°¥¹±Õ‘¥¹œ…ÑÕ…°øÌÉ5¥M…Ù”½=Á•¸°äÙ5¥ÁÉ”µÉ•…‰½Õ¹°ÌÉ5¥±•…ä•±¥¥‰¥±¥Ñä)…¹Õ¹¡…¹•Í•¹”½¡¥ÍÑ½Éä½¸™…¥±ÕÉ•Ì¸9¼ÉÕ¹Ñ¥µ”™…¥±ÕÉ”É•µ…¥¹Ì™É½´Ñ¡…ĞÉÕ¸¸)9•Ü‘•™…Õ±Ğ­±•…äÉ•Í½±ÕÑ¥½¸ÄÁAML°¹•…É‰äÍ…±…È½…±Á¡„ÄÙAMLì™¥¹…°É•±•…Í”½…¡”)½¹ÑÉ…ĞÕAML…™Ñ•È½µÁ±•Ñ¥¹œ‘É…İ•ÈµÕ¤Á…É•¹ĞÁ¥¸¸9¼ÁÉ½Ñ•Ñ•½™É½é•¸¡…¹•Ì¸)!½ÍÑ•™Õ±°µÍÕ¥Ñ”É•ÉÕ¸…¹ÁÕ‰±¥…Ñ¥½¸½±¥Ù”•Ù¥‘•¹”™½±±½Üì‘•Ù¥”Í¡…ÉÁ¹•ÍÌÁ•¹‘¥¹œ¸((ŒŒ€¸äÌÜÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€Å‰‰ˆÑÙÈØÈÁÙ™˜àÀÄÈÔåŒÀÉ™”ØÅŒÙ‘˜äÁ™ŒåÕ€°ÑÉ•”)€Í‰‰™”ĞÄáÄÁ„ØÌÍ”ØÙ˜ĞÔàÀÀäÅ˜Õ˜Ñ˜äÑ˜äÔá•‘‘€°¥ÌÁÕ‰±¥Í¡•¸½¹¹•Ñ•¥Ğ…Ñ„)ÕÁ±½…‘•Äà•á…Ğ±½…°‰±½‰Ì½ÑÉ•”ì™•Ñ¡•µ…¥¸µ…Ñ¡•Ì±½…°Ñ•ÍÑ•ÑÉ•”¸!½ÍÑ•)9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäØäĞÄÈÀÌäÀ½©½ˆÄÄäÔĞÜÈÈÔàÄäÁ…ÍÍ•Ì€¨¨È°ØäÄÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼(ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”©½ˆ±½ÌÙ•É¥™äÑ½Ñ…±Ì°¥¹±Õ‘¥¹œ½ÉÉ•Ñ•¡¥ µÉ•Ì¥±”Ñ•ÍĞ¸)1½…°½µÁ±•Ñ”ÉÕ¸½Ù•É•È°ØäÀÁ…ÍÍ¥¹œ¡•­Ìì½ÉÉ•Ñ•¥±”…Í”Í•Á…É…Ñ•±äÁ…ÍÍ•°)…¹Ñ¡”¡½ÍÑ•É•ÉÕ¸±½Í•ÌÑ¡”™Õ±°™¥¹…°µÑÉ•”ÁÉ½½˜¸A…•ÌÌäØäĞÄÄäàÔÌÍÕ••‘•¸)±°Ää¡•­•±¥Ù”Í¡•±°½ÉÕ¹Ñ¥µ”½Á…É•¹Ğ½É•½Ù•Éä…¹É•Ñ…¥¹•Á…¥¹Ğ½Í½ÕÉ”½ÁÉ½©•Ğ¼)¹…Ñ¥Ù”µ•áÁ½ÉĞ½5Õ±Ñ¤™¥±•Ì‰åÑ”µµ…Ñ ¸5…¥¸½5Õ±Ñ¤½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸()Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸UÍ•È€¸äÌÔAMLÁÉ½Ñ•Ñ•ì€¸äÌØÁ¥á•±…Ñ¥½¸)É•Á½ÉĞÉ•µ…¥¹Ì„‘•Ù¥”¥ÍÍÕ”…İ…¥Ñ¥¹œ€¸äÌÜ½¹™¥Éµ…Ñ¥½¸°¹½Ğ…¸¥¹™•ÉÉ•AML¸)I•…‘ä™½È¹•ÜÕ‰”ƒŠHA…¥¹ĞÍ¡½İ¥¹œ½±½ÕÈÑ•áÑÕÉ”ÄÀÈÓ\ÄÀÈĞ	=I™¥ÉÍĞµ…É¬½¥µ…”ì)½µÁ…É”™É•Í ‘•Ñ…¥°°Ñ¡•¸U¹‘½I•‘¼½M…Ù•=Á•¸¸á¥ÍÑ¥¹œÔÄÈÍ…Ù•Ñ•áÑÕÉ•ÌÍÑ…äÔÄÈÕ¹Ñ¥°)Ù¥Í¥‰±”%¹É•…Í”¸!¥¡•ÈµÉ•ÌÁÉ½©•ĞM…Ù”½=Á•¸äÙ5¥€¡½É‘¥¹…ÉäÌÉ5¥¤°Í…±…ÈÔÄÈ…¹)Í½ÕÉ”ÄÀÈĞ½Ñ¥ÀÈÔØ½‰…Í”­Ñ¡É•”±¥µ¥ÑÌÉ•Ñ…¥¹•¸9¼É,¼Ñ,½È…±°µé½½´Á¥á•°µ™É•”±…¥´¸)9•áĞ½¹™¥Éµ•ÄÀÈĞ‘•Ù¥”™••‘‰…¬ì¥¹ÍÁ•ĞÍ½ÕÉ”½UX‘•¹Í¥Ñä¥˜ÍÑ¥±°½…ÉÍ”°Ñ¡•¸)ÍÑ…”±…É•Èµ…ÁÌ½Í½ÕÉ•Ì½µ•µ½Éäİ½É¬¸5•É”½±…ÑÑ•¸½MµÕ‘”½<½Í•…µÌÉ•µ…¥¸ÅÕ•Õ•¸((ŒŒ€¸äÌàƒŠP½±½ÕÈµ•É”É•É•ÍÍ¥½¸€¼€¸äÌÜÁÉ½Ñ•Ñ•AML((´mátUÍ•ÈA•É™•ĞAML€¸äÌÜÁÉ½Ñ•ÑÌ™É•Í ÄÀÈĞ‘•™…Õ±Ğ½É•…‘½ÕĞ…¹Á…¥¹Ğ½¥µ…”‘•Ñ…¥°ìÍ…Ù•ÔÄÈ½ÁÑ¥½¹…°%¹É•…Í”É•Ñ…¥¹•¸%¹‘•Á•¹‘•¹Ğ…±Á¡„½É•™±•Ñ¥½¸…Ñ•ÌÉ•µ…¥¸½Á•¸¸(´mát5•É”Í•±•Ñ•½Ù•É±…äÁ±ÕÌ…±°‰•±½ÜÑ¡É½Õ ½É¥¥¹…°½µÁ½Í¥Ñ½Èè•á…ĞÁ¥á•±Ì™½È…±°ÈØ‰±•¹‘Ì°µ…Í­Ì…¹İÉ…ÁÁ•¥µ…•ÌìÕÁÁ•ÈÍ½ÕÉ•Ì½½É‘•È½Í•ÑÑ¥¹ÌÍÕÉÙ¥Ù”¸(´mát±…ÑÑ•¸ÁÉ•Í•ÉÙ•ÌÙ¥Í¥‰±”Á¥á•±Ì°É•µ½Ù•Ì…±°½Ù•É±…åÌ¥¹±Õ‘¥¹œ¡¥‘‘•¸½¹•Ì°…¹™É••ÌÍ±½ÑÌ¸%¹ÁÕĞ½Á••È½Í…±…ÈÉ•Í½ÕÉ•ÌÉ•µ…¥¸Õ¹¡…¹•¸(´mát=É¥¥¹…°A…¥¹ĞU¹‘¼½I•‘¼°M…Ù”½=Á•¸…¹…ÑÕ…°¹…Ñ¥Ù”A9ÁÉ•Í•ÉÙ”É•ÍÕ±ÑÌì¡¥ÍÑ½ÉäÉ•ÍÑ½É•Ì½É¥¥¹…°±…å•ÉÌ¸MÑ…•Á±…•µ•¹Ğ°ÍÑ…±”Í•ÍÍ¥½¹Ì°¡•­Á½¥¹Ğ…¹ÅÕ½Ñ„É•™ÕÍ…°É•µ…¥¸…Ñ½µ¥Œ¸(´mát1½…°™Õ±°ÈØäİAML¼Á%0¼ÁÍ­¥Àì™½ÕÍ•µ•É”ÙAML°É•Ù¥•İ•É•±•…Í”ÕAML¸(´mátUÍ•ÈAML€¸äÌàè1…å•ÈÍ•ÑÑ¥¹Ì5•É”Ñ¼	…Í”ÁÉ•Í•ÉÙ•Ì…ÁÁ•…É…¹”…¹™É••Ì•áÁ•Ñ•Í±½ÑÌìU¹‘¼½I•‘¼É•ÍÑ½É•Ì±…å•ÉÌ¸(´mátUÍ•ÈAML€¸äÌàè±…ÑÑ•¸±•…Ù•Ì	…Í”½¹±ä°€¬1…å•Èİ½É­Ì°M…Ù”½=Á•¸É•Ñ…¥¹Ì…ÁÁ•…É…¹”¸((ŒŒ€¸äÌàÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”˜ĞĞÅ”äÉˆÀäÔÁ˜Á”İˆÉ…ˆÅˆĞÙ„áˆØİääĞÁ„ÄÈÌäØ°ÑÉ•”(ÈÌå„ÔÕÜÙ‘”Ğå‘‘˜àĞÁ™„Äå…‰‘‰™‰ˆÌÔÅˆÈØÉà°µ…Ñ¡•ÌÑ•ÍÑ•±½…°ÑÉ•”¸)!½ÍÑ•É•É•ÍÍ¥½¸ÌäØääÜØäÔÀĞ½©½ˆÄÄäÔØÔàäÈäÜÔÍÕ••‘•ì™Õ±°©½ˆ±½Ì½¹™¥É´(ÈØäİAML¼Á%0¼ÁÍ­¥À°µ…Ñ¡¥¹œ½µÁ±•Ñ”±½…°ÉÕ¸¸A…•ÌÌäØääÜØäÀÄÔ‰Õ¥±ÄÄäÔØÔàäÔĞÔÜ¼)‘•Á±½äÄÄäÔØØÀÜàÔØäÍÕ••‘•¸±°ÈÔ¡•­•±¥Ù”Í¡•±°½Ù•ÉÍ¥½¸°¡…¹•ÉÕ¹Ñ¥µ”½1…ˆ°)É•½Ù•Éä…¹É•Ñ…¥¹•½É”½µ…¥¸½5Õ±Ñ¤™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸I•Ù¥•İ•Á¥¹ÌäÌàì)ÁÉ½Ñ•Ñ•µ…¥¸½…”½5Õ±Ñ¤½™É½é•¸Õ¹¡…¹•¸Q¡¥ÌÁÉ½½˜ÕÁ‘…Ñ•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸)UÍ•È€¸äÌÜAMLÁÉ½Ñ•Ñ•ì€¸äÌà‘•Ù¥”µ•É”½™±…ÑÑ•¸½U¹‘½I•‘¼½M…Ù•=Á•¸…Ñ”Á•¹‘¥¹œ¸((ŒŒ€¸äÌäƒŠPUXµÉ•…‘ä½‰©•ĞÉ•…Ñ¥½¸ì€¸äÌàAMLÁÉ½Ñ•Ñ•((´mátUÍ•È€¸äÌàAMLÁÉ½Ñ•ÑÌ5•É”½±…ÑÑ•¸½™É•”Í±½ÑÌ½U¹‘½I•‘¼½M…Ù•=Á•¸¸…É±¥•È€¸äÌÜÄÀÈĞ½É•…‘½ÕĞ½‘•Ñ…¥°É•µ…¥¹ÌÁÉ½Ñ•Ñ•¸(´mátMÑ…ÉÑÕÀ½É•Í•Ğ½É¥¥¹…°Õ¹¥ĞÕ‰”•ÑÌÍ¥à½µÁ±•Ñ”	½à¥Í±…¹‘Ìİ¥Ñ¡½ÕĞ•áÑÉ„¡¥ÍÑ½Éä½•½µ•ÑÉä¡…¹”¸(´mátÕ‰”½A±…¹”½å±¥¹‘•È½½¹”½MÁ¡•É”ÕÍ”•á…Ğ½É¥¥¹…°	½à½ah½å±¥¹‘•È½MÁ¡•É”±…å½ÕÑÌ…Ğ…Íåµµ•ÑÉ¥Œ½‘•¹Í”Í•ÑÑ¥¹Ìì½É‘¥¹…ÉäÍ•¹”ÁÉ½©•Ñ¥½¹ÌÍÑ¥±°É•ÅÕ¥É”¡•­Á½¥¹ÑÌ¸(´mátÑÕ…°‘‘•™…Õ±ÑÌ•¹•É…Ñ”UYÌ=8ì=É•Ñ…¥¹ÌÁ±…¥¸Á…Ñ ½Í•ÑÑ¥¹Ì¥¹¡•É¥Ñ…¹”¸UX=8ÕÍ•ÌÁ±…¥¸	…Í”Í•ÑÑ¥¹Ì¸MÑ…¥¹œ½…¹•°½É•™ÕÍ…°ÁÉ•Í•ÉÙ•ÌÍ•¹”½É•‘¼ì½¹”U¹‘¼½I•‘¼…ÉÉ¥•Ì•á…ĞÉ•Í½ÕÉ”¸(´mátÑÕ…°ÁÉ½©•ĞÑÉ…¹ÍÁ½ÉĞ…¹9=4½1½ÕÑÁÕĞÉ•Ñ…¥¸™…”µ½É¹•ÈUXÙ…É¥…¹ÑÌìÍÑ…ÉÑÕÀÕ‰”½Á•¹ÌÁÉ½‘ÕÑ¥½¸A…¥¹Ğ¥µµ•‘¥…Ñ•±ä…ĞÄÀÈĞ…¹M…Ù”½=Á•¸É•Ñ…¥¹ÌÁ…¥¹Ñ•‰¥¹‘¥¹œ¸(´mátQ½ÉÕÌ½Q•áĞÉ•µ…¥¸Á±…¥¸İ¥Ñ Ù¥Í¥‰±”•áÁ±…¹…Ñ¥½¸ìÍÁ•¥…°½‰©•Ğ±…Õ¹¡•ÉÌÕ¹¡…¹•¸=É¥¥¹…°ÍÑ…±”½•Ù…±Õ…Ñ•½±¥¹­•Õ…É‘ÌÉ•Ñ…¥¹•ì¹¼…ÕÑ¼µÉ•µ…ÁÁ¥¹œ½±ÁÉ½©•ÑÌ¸(´mátUÍ•ÈAML€¸äÌäèÉ•™É•Í ½ÈI•Í•ĞƒŠHA…¥¹Ğ½¸Õ‰”İ¥Ñ¡½ÕĞ™¥ÉÍĞÁÉ½©•Ñ¥¹œUYÌìUX‘¥Ñ½ÈÍ¡½İÌÍ¥à¥Í±…¹‘Ì¸(´mátUÍ•ÈAML€¸äÌäè‘å±¥¹‘•È½½¹”½MÁ¡•É”İ¥Ñ •¹•É…Ñ”UYÌ¡•­•ì¥¹ÍÁ•ĞUYÌ½Á…¥¹Ğ¸U¹Ñ¥¬½¸…¹½Ñ¡•È½‰©•ĞÑ¼É•…Ñ”İ¥Ñ¡½ÕĞUYÌ¸(´mátUÍ•ÈAML€¸äÌäèU¹‘¼½¹”É•µ½Ù•Ì¹•ÜUX½‰©•Ğ°I•‘¼É•ÍÑ½É•ÌìM…Ù”½=Á•¸É•Ñ…¥¹ÌUYÌ½Á…¥¹Ğ¸((¸äÌä™¥¹…°±½…°9½‘”ÈĞ™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÀÌAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)9•ÜÉ•…Ñ¥½¸ÙAML°½É¥¥¹…°¹•…É‰ä‘½	½à½MÁ¡•É”ÄåAML°É•Ù¥•İ•É•±•…Í”ÕAML¸)9¼…ÍÍ•ÉÑ¥½¹ÌÉ•µ½Ù•½ÈÉ•±…á•¸½µÁ±•Ñ”É•Ù¥•İ•µ…¥¸½1…ˆÉ•Ù•ÉÍ”±½…‘•ÈÉ…Á äÌäì)ÁÉ½Ñ•Ñ•µ…¥¸äÌÀ½…”½5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹Ñ½Õ¡•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½İÌì)…ÑÕ…°¥A…UXµÉ•…‘äÉ•…Ñ¥½¸½Á…¥¹Ğ½Á•ÉÍ¥ÍÑ•¹”…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ¸((ŒŒ€¸äÌäÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ””ÀÜÙ‰„ĞÁŒØÅ˜ÅŒÕ…ÈÀÈÄÄÉˆØÁ”Øİ™ÜÕ„Ù„İ°ÑÉ•”(ÔÉ……˜ÑŒÌÔÀÑ˜ÙŒÙ”á‰„ÉŒĞÑäá™‘á˜Ù‰˜Ğäİ‰‘Œ°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸)½¹¹•Ñ•¥Ğ…Ñ„ÕÁ±½…‘•ÈÀ•á…Ğ‰±½‰Ì…¹µ…Ñ¡•Ñ•ÍÑ•ÑÉ•”ì™•Ñ¡•µ…¥¸)µ…Ñ¡•±½…°Í½ÕÉ”¸1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÜÈÈÄàÄĞàÜ¼)©½ˆÄÄäØÌÜäÈÜÈàÄ‰½Ñ Á…ÍÌ€¨¨ÈÜÀÌÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”©½ˆ)±½ÌÙ•É¥™äÑ½Ñ…±Ì¸A…•ÌÌäÜÈÈÄàÄÀÈĞ‰Õ¥±ÄÄäØÌÜäÌÀÄäÀ½‘•Á±½äÄÄäØÌàÀØÜàÀÀÍÕ••‘•¸)±°ÈÀÁ½ÍÑ‘•Á±½åµ•¹Ğ¡•­•Í¡•±°½Ù•ÉÍ¥½¸°•Ù•Éä¡…¹•ÉÕ¹Ñ¥µ”½1…ˆ½İ¹•È°É•½Ù•Éä°)É•Ñ…¥¹•µ…¥¸½…”½5Õ±Ñ¤Ä¸À½ÁÉ¥µ¥Ñ¥Ù”™…Ñ½Éä½Á…¥¹Ğ½İ¹•ÉÌ…¹™É½é•¹	•Ñ„Üµ…É­•È)‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸5…¥¸½…”½5Õ±Ñ¤Ä¸À½™É½é•¸‰•Ñ„‰åÑ•ÌÕ¹¡…¹•¸9¼…ÍÍ•ÉÑ¥½¸)É•±…á•¸Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Ì½¹±äìÍ…µ”ÉÕ¹Ñ¥µ”‰åÑ•Ì¸UÍ•È€¸äÌàAMLÁÉ½Ñ•Ñ•ì(¸äÌä…ÑÕ…°¥A…ÍÑ…ÉÑÕÀ½É•Í•Ğ½‘½UX¡•­‰½à½Á…¥¹Ğ½¡¥ÍÑ½Éä½M…Ù•=Á•¸…Ñ”Á•¹‘¥¹œ¸((ŒŒ€¸äĞÀƒŠPQ½ÉÕÌUYÌÉ•É•ÍÍ¥½¸ì€¸äÌäÁÉ½Ñ•Ñ•AML((´mátUÍ•È€¸äÌäAMLÁÉ½Ñ•ÑÌUXµÉ•…‘ä¥¹¥Ñ¥…°½É•Í•ĞÕ‰”°‘UX¡½¥”½Á±…¥¸É•…Ñ¥½¸°Á…¥¹Ñ¥¹œ°½¹”µÍÑ•ÀU¹‘½I•‘¼…¹M…Ù•=Á•¸¸(´mátI½Õ¹ÕÁÉ¥¡ĞQ½ÉÕÌÉ¥‘ÌÏŠLÌÈ…É½ÍÌÌØ‘•¹Í¥ÑäÁ…¥ÉÌè•Ù•ÉäÅÕ…µ…ÁÁ•½¹”°Ä¥Í±…¹°‰½Ñ Í•…µÌ°™Õ±°É•Ñ…¹±”İ¥Ñ¡¥¸Ñ¥±”ì¹¼•½µ•ÑÉäµÕÑ…Ñ¥½¸¸(´mátQÉ…¹Í±…Ñ•½dµÉ½Ñ…Ñ•½•áÑÉ•µ”Í…±”½É•¹Õµ‰•É•É•Õ±…ÈÉ¥‘ÌÍÕÁÁ½ÉÑ•ì‘•™½Éµ•½Ñ¥±Ñ•½¹½¹ÅÕ…½¥¹½µÁ±•Ñ”½Õ¹ÍÕÁÁ½ÉÑ•½¡•­Á½¥¹Ğ™…¥±ÕÉ•ÌÉ•Ñ…¥¸µ•Ñ…‘…Ñ„½¡¥ÍÑ½Éä¸(´mát=É¥¥¹…°¹…Ñ¥Ù”Í•¹”ÁÉ½©•Ñ¥½¸½=\½¹¼µ½À½U¹‘½I•‘¼½¥Í±…¹•‘¥ÑÌ…¹…ÑÕ…°UX…±±‰…¬İ½É¬ì‘Q½ÉÕÌ¡•­•½Õ¹¡•­••… ½¹”½É¥¥¹…°¡•­Á½¥¹Ğ¸(´mátáÁ…¹‘•äÌä…ÑÕ…°ÁÉ½©•Ğ½9=4½1É•Ñ…¥¸Q½ÉÕÌ½É¹•ÈÙ…É¥…¹ÑÌì¥µµ•‘¥…Ñ”ÁÉ½‘ÕÑ¥½¸ÄÀÈĞA…¥¹Ğ½U¹‘½I•‘¼½M…Ù•=Á•¸½¹…Ñ¥Ù”A9•á…Ğ¸(´mátUÍ•ÈAML€¸äĞÀè‘Q½ÉÕÌİ¥Ñ •¹•É…Ñ”UYÌ¡•­•ìA…¥¹Ğİ½É­Ì¥µµ•‘¥…Ñ•±ä°UX‘¥Ñ½ÈÍ¡½İÌ½¹”É•Ñ…¹Õ±…È¥Í±…¹¸(´mátUÍ•ÈAML€¸äĞÀè‘Q½ÉÕÌÕ¹¡•­•°Ñ¡•¸=‰©•ÓŠIU[ŠIQ½ÉÕÌUYÌ€¡d¤ìU¹‘¼½I•‘¼ÁÉ½©•Ñ¥½¸…¹‘‰•¡…Ù”½ÉÉ•Ñ±ä¸(´mátUÍ•ÈAML€¸äĞÀèM…Ù”½=Á•¸É•Ñ…¥¹ÌÁ…¥¹Ñ•Q½ÉÕÌ…¹UXÁ±…•µ•¹Ğì½ÁÑ¥½¹…°9½µ…•áÁ½ÉĞÍ…¹¥Ñä¸()¹Õ±…ÈQ½ÉÕÌµ…ÁÁ¥¹œ¡…Ì¥¹¹•È½½ÕÑ•È‘•¹Í¥ÑäÙ…É¥…Ñ¥½¸¸9¼Ñ¥±Ñ•½‘•™½Éµ•½•¹•É…°)Õ¹İÉ…À½ÈUXÁÉ½Á……Ñ¥½¸Ñ¡É½Õ Ñ½Á½±½ä½µ½‘¥™¥•ÉÌì¹…Ñ¥Ù”±¥¹­•Õ…É‘ÌÉ•Ñ…¥¹•¸((¸äĞÀ™¥¹…°±½…°9½‘”ÈĞ™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÀäAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)9•ÜQ½ÉÕÌØ…¹•áÁ…¹‘•äÌäÉ•…Ñ¥½¸Ø€ôÄÈ™½ÕÍ•‘AMLìÉ•Ù¥•İ•É•±•…Í”ÕAML¸)9¼½É¥¥¹…°‰•¡…Ù¥½ÕÈ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•ìÍÕÁ•ÉÍ•‘•Q½ÉÕÌµÕ¹…Ù…¥±…‰±”¡•­Ì¹½Ü)É•ÅÕ¥É”µ…ÁÁ•½½ÁÑ¥½¹…°Á±…¥¸Q½ÉÕÌ…¹•á…ĞÁÉ½©•Ğ½9=4½1½ÕÑÁÕĞ¸AÉ½Ñ•Ñ•)µ…¥¸½…”½5Õ±Ñ¤Ä¸À½™É½é•¸É•Ñ…¥¹•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½İÌì‘•Ù¥”äĞÀÁ•¹‘¥¹œ¸((ŒŒ€¸äĞÀÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ””ÌÄÄáŒÁ™ŒÙ„ÈİŒØÅ˜Ñ˜Ääå”ÌÕ”Üİ•àåŒÄåŒÈ°ÑÉ•”)‘‰Õ˜ÜÀàÌØÄÔÉ‰…™‘˜İ„áˆÌÉ™Œá”ÄÔÀÑ‘ˆÉ‰‘ˆÜ°ÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ğ…Ñ„)ÕÁ±½…‘•ÄĞ•á…Ğ±½…°‰±½‰Ì…¹µ…Ñ¡•Ñ•ÍÑ•ÑÉ•”ì™•Ñ¡•µ…¥¸¥‘•¹Ñ¥…°¸)1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÜÈÔàÈÀÜÔä½©½ˆÄÄäØĞäÌĞÀÄĞä‰½Ñ Á…ÍÌ(¨¨ÈÜÀäÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½ÌÙ•É¥™äÑ½Ñ…±Ì¸)A…•ÌÌäÜÈÔàÈÀÈØÌ‰Õ¥±ÄÄäØĞäÌĞÈÔÄÄ½‘•Á±½äÄÄäØĞäĞàØÔØÌÍÕ••‘•¸±°ÈÀ¡•­•)Á½ÍÑ‘•Á±½åµ•¹ĞÍ¡•±°½Ù•ÉÍ¥½¸°¡…¹•UX½‘½5•Í¡!•…±Ñ ½5Õ±Ñ¤Á…É•¹Ğ°É•½Ù•Éä…¹)É•Ñ…¥¹•µ…¥¸½…”½5Õ±Ñ¤Ä¸À½™…Ñ½Éä½Í¥¹…ÑÕÉ”½¥µÁ½ÉĞ½•áÁ½ÉĞ½Á…¥¹Ğ½É…ÍÑ•È½™É½é•¹	•Ñ„Ü)µ…É­•È™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸I•Ù¥•İ•É…Á äĞÀìµ…¥¸½…”½5Õ±Ñ¤Ä¸À½™É½é•¸)‰åÑ•ÌÕ¹¡…¹•¸9¼½±‰•¡…Ù¥½ÕÈ…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Ì½¹±äì)Í…µ”ÉÕ¹Ñ¥µ”‰åÑ•Ì¸UÍ•È€¸äÌäAMLÁÉ½Ñ•Ñ•ì€¸äĞÀQ½ÉÕÌ‘•Ù¥”…Ñ”Á•¹‘¥¹œ¸((ŒŒ€¸äĞÀÕÍ•ÈAMLƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈAMLÁÉ½Ñ•ÑÌQ½ÉÕÌ…ÕÑ½µ…Ñ¥ŒUYÌ½½ÁÑ¥½¹…°Á±…¥¸‘°Q½ÉÕÌUYÌ€¡d¤°A…¥¹Ğ°)UX‘¥Ñ½È°U¹‘½I•‘¼…¹M…Ù•=Á•¸¸€¸äĞÀÉÕ¹Ñ¥µ”½$½A…•Ì½±¥Ù”ÁÉ½½˜…‰½Ù”¥Ì±½Í•¸)9•áĞ…ÕÑ¡½É¥é•€½¹•áÑ‰Õ¥±…Õ‘¥ÑÌ‰½Õ¹‘•MµÕ‘”Ñ¡É½Õ ½É¥¥¹…°Á…¥¹Ğ½İ¹•ÉÌ¸((ŒŒ€¸äĞÄƒŠPMµÕ‘”É•É•ÍÍ¥½¸…¹‘•Ù¥”…Ñ”((´mátUÍ•È€¸äĞÀAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•ì…±°UXµÉ•…‘äÉ•…Ñ¥½¸½Á…¥¹Ğ½¡¥ÍÑ½Éä½Á•ÉÍ¥ÍÑ•¹”¸(´mát¹…±åÑ¥…°Á¥­ÕÀ½‘É…œI	°¥¹‘•Á•¹‘•¹Ğ=Á…¥Ñä°ÁÉ•µÕ±Ñ¥Á±¥•…±Á¡„°¹¼¥¹¬½¸Ñ…À½É•Á•…Ñ•Á½Í¥Ñ¥½¸°½İ¹•…¹•±±…Ñ¥½¸¸(´mátM…µ”½É¥¥¹…°™…”É•…‘Ì½İÉ¥Ñ•Ì½¹±äì…‘©…•¹Ğ…Ñ±…Ì¥Í±…¹‘Ì•á±Õ‘•°™…”½µ¥ÍÌÁ¥­ÕÀÉ•Í•ÑÌì…±Á¡„½É…ÜÉ…åÍ…±”É•Ñ…¥¹•¸(´mátÑÕ…°U$Í•±•Ñ•µ±…å•È¥Í½±…Ñ¥½¸°A…¥¹ĞU¹‘½I•‘¼½Ñ½½°É•Ñ•¹Ñ¥½¸°M…Ù•=Á•¸…¹•á…Ğ¹…Ñ¥Ù”A9¸(´mátM…±…È½µ…Í¬¥¹‘•Á•¹‘•¹”°½É¥¥¹…°¡•­Á½¥¹Ğ½=\½…¹•°½µ¥ÍÌÉ•™ÕÍ…°ì¥¹Ù…±¥UYÌÉ•™ÕÍ”‰•™½É”¹…Ù¥…Ñ¥½¸½¡¥ÍÑ½Éä¡…¹•Ì¸(´mát	½Õ¹‘•±½¹œÍÑÉ½­”É½±±Ì‰…¬Á¥á•±Ì½É•Í½ÕÉ•Ì½¡¥ÍÑ½Éä°É•±•…Í•Ì…ÁÑÕÉ”½¹…Ù¥…Ñ¥½¸…¹…±±½İÌ¹•áĞ	ÉÕÍ ì•Ù•¹ĞÍÕ‰‘¥Ù¥Í¥½¸¥¹Ù…É¥…¹Ğ¸(´mátUÍ•ÈAML€¸äĞÄèMµÕ‘”„¡…É½±½ÕÈÁ…Ñ ½ÕÑİ…É½¸½¹”Õ‰”™…”ì½µÁ…É”±½Ü½¡¥ =Á…¥Ñä…¹¹¼µµ½Ñ¥½¸Ñ…À¸(´mátUÍ•ÈAML€¸äĞÄè½Ù•É±…äMµÕ‘”°U¹‘½I•‘¼­••ÁÌA…¥¹Ğ½Á•¸°M…Ù•=Á•¸É•Ñ…¥¹ÌÉ•ÍÕ±Ğ¸…”•‘•ÌÉ•ÍÑ…ÉĞÁ¥­ÕÀ¸()ÕÑ½µ…Ñ•Í½ÕÉ”Ñ•ÍÑÌ‘¼¹½Ğ•ÍÑ…‰±¥Í ¥A…™••°½±…Ñ•¹ä½I4¸É½ÍÌµ™…”MµÕ‘”°)<…¹‘”µÍ•…´…ÕÑ¡½É¥¹œÉ•µ…¥¸ÅÕ•Õ•ì…±Á¡„äÈä½É•™±•Ñ¥½¸…Ñ•Ì¥¹‘•Á•¹‘•¹Ğ¸((¸äĞÄ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨È°ÜÄÔAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)±°Í¥à¹•ÜMµÕ‘”¥¹Ñ•É…Ñ¥½¹ÌÁ…ÍÌ½¸™¥¹…°Í½ÕÉ”°Á±ÕÌ•Ù•Éä•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¸¸)9•…É‰ä	±ÕÈ½Í•…´ÄÕAML…¹É•Ù¥•İ•É•±•…Í”ÕAML…±Í¼Á…ÍÍ•¸9¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¹Ì)É•±…á•¸½µÁ±•Ñ”µ…¥¸½1…ˆÉ•Ù•ÉÍ”µ±½…‘•È±½ÍÕÉ”äĞÄìÁÉ½Ñ•Ñ•µ…¥¸½…”½5Õ±Ñ¤Ä¸À¼)™É½é•¸Õ¹¡…¹•¸AÕ‰±¥…Ñ¥½¸½¡½ÍÑ•½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½İÌì‘•Ù¥”äĞÄÁ•¹‘¥¹œ¸((ŒŒ€¸äĞÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”„ÌåŒÉ‘ˆá„á……„á”Àİ™ÔäÀÈÔÈÄÅˆÄÌÁ„ÔÍ”Á”ÈÜ°Ñ•ÍÑ•ÑÉ•”(ÜÉ”ĞåŒĞĞÌÌØÜÙ„ÜØÅŒÉ…ŒÕ‘˜ØØÉ‘˜Äá„Å„İ‘„àİ˜°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ğ)…Ñ„ÕÁ±½…‘•ÄÔ•á…Ğ‰±½‰ÌìÉ•…Ñ•ÑÉ•”…¹™•Ñ¡•µ…¥¸µ…Ñ ±½…°Ñ•ÍÑ•ÑÉ•”¸)1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÜÔØÔÜÜàÀØ½©½ˆÄÄäÜĞääØàäØĞ‰½Ñ Á…ÍÌ(¨¨ÈÜÄÔÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•¸)A…•ÌÌäÜÔØÔÜÜÔÄÜ‰Õ¥±ÄÄäÜĞääÜÔäĞä½‘•Á±½äÄÄäÜÔÀÈÀÜÈàÌÍÕ••‘•¸±°ÈÀ¡•­•)Á½ÍÑ‘•Á±½åµ•¹ĞÍ¡•±°½Ù•ÉÍ¥½¸°•Ù•Éä¡…¹•µ…¥¸½1…ˆÉÕ¹Ñ¥µ”½İ¹•È°É•½Ù•Éä…¹)É•Ñ…¥¹•µ…¥¸½5Õ±Ñ¤Ä¸À½UX½™¥±Ñ•È½Í•…´½É…Á ½ÁÉ½©•Ğ½•áÁ½ÉĞ½ÁÉ¥µ¥Ñ¥Ù”½™É½é•¹	•Ñ„Üµ…É­•È)™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸9¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•ìÁÉ½Ñ•Ñ•½™É½é•¸)‰åÑ•ÌÕ¹¡…¹•¸Q¡¥ÌÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±ä°Í…µ”ÉÕ¹Ñ¥µ”‰åÑ•Ì¸()	Õ¥±äĞÄ¥Ì½µÁ±•Ñ”…¹É•…‘ä™½È‘•Ù¥”Ñ•ÍÑ¥¹œè¡…É½±½ÕÈÁ…Ñ ½¸Õ‰”ƒŠH)Q½½°MµÕ‘”İ¥Ñ¡¥¸™…”°‘É…œ½ÕÑİ…É°½µÁ…É”=Á…¥Ñä°Ñ…Àµ…­•Ì¹¼µ…É¬ìÑÉä…¸)½Ù•É±…ä°U¹‘½I•‘¼ÍÑ…åÌ¥¸A…¥¹Ğ°M…Ù•=Á•¸É•Ñ…¥¹ÌÉ•ÍÕ±Ğ¸…”•‘•Ì½µ¥ÍÍ•ÌÉ•ÍÑ…ÉĞ)Á¥­ÕÀ¸ÑÕ…°¥A…™••°½±…Ñ•¹äÉ•µ…¥¹ÌÁ•¹‘¥¹œ¸UÍ•ÈäĞÁAMLÁÉ½Ñ•Ñ•ì¥¹‘•Á•¹‘•¹Ğ)…±Á¡„äÈä½É•™±•Ñ¥½¸…Ñ•ÌÕ¹¡…¹•¸9•áĞ‘•Ù¥”™••‘‰…¬‰•™½É”É½ÍÌµ™…”MµÕ‘”°)<½È‘”µÍ•…´…ÕÑ¡½É¥¹œì¹¼…ÕÑ½µ…Ñ¥Œ¹•áĞÉÕ¹Ñ¥µ”‰Õ¥±‰•™½É”Ñ¡…Ğ…Ñ”¸((ŒŒ€¸äĞÈƒŠP½¹¹•Ñ•µ™…”MµÕ‘”É•É•ÍÍ¥½¸€¼€¸äĞÄÁÉ½Ñ•Ñ•AML((´mátUÍ•È€¸äĞÄAMLÁÉ½Ñ•ÑÌÍ…µ”µ™…”MµÕ‘”½=Á…¥Ñä½Ñ…À½½Ù•É±…ä½¡¥ÍÑ½Éä½M…Ù•=Á•¸¸(´mát=É¥¥¹…°µ…¹¥™½±É…Á ½¹±äè™É½é•¸‘¥É•ĞÁ…¥ÉÌ°ÄÈ™½±‘•½É½Ñ…Ñ•½µ¥ÉÉ½É•±…å½ÕÑÌì¹½¹µ…¹¥™½±½Ù•ÉÑ•àµ½¹±ä½…Ñ±…Ì‘•½ä•á±Õ‘•°Í½ÕÉ•ÌÕ¹¡…¹•¸(´mátá…ĞÁÉ•µÕ±Ñ¥Á±¥•µ•…¸½=Á…¥Ñä½…±Á¡„…É½ÍÌ„Á…¥È°Á¥­•µ™…”µ½¹±äİÉ¥Ñ•Ìì¹¼½¹¹•Ñ•±¥ÍĞÉ•Ñ…¥¹Ì½É¥¥¹…°™…”µÉ•Í•ĞA$¸(´mát…ÁÑÕÉ•…‘©…•¹ä°ÍÑÉ¥Ğ¥¹Ù…±¥½ÍÁ…ÉÍ”½½Ù•ÉÍ¥é”Õ…É‘Ì°µ¥ÍÍ•Ì½‘¥Í½¹¹•Ñ•©ÕµÁÌ…¹É½ÍÌµ™…”İ½É¬µ±¥µ¥Ğ…¹•±±…Ñ¥½¸¸(´mátÑÕ…°½¹Ñ¥¹Õ½ÕÌU$•‘”É½ÍÍ¥¹œ°½¹”A…¥¹ĞU¹‘½I•‘¼°M…Ù•=Á•¸…¹•á…Ğ¹…Ñ¥Ù”A9ìÉ…ÜÍ…±…È½µ…Í¬¥Í½±…Ñ¥½¸½¡•­Á½¥¹ĞÉ•™ÕÍ…°¸(´mátUÍ•ÈAML€¸äĞÈèÑİ¼Õ‰”™…•ÌÙ¥Í¥‰±”°Á…¥¹ĞÁ…Ñ ÕÀÑ¼Í¡…É••‘”°MµÕ‘”…É½ÍÌ½¹Ñ¼¹•áĞ™…”¸½µÁ…É”±½Ü½¡¥ =Á…¥Ñä¸(´mátUÍ•ÈAML€¸äĞÈèÁ…¥¹Ñ•½Ù•É±…ä°U¹‘½I•‘¼É•Ñ…¥¹ÌA…¥¹Ğ½MµÕ‘”ìM…Ù•=Á•¸É•Ñ…¥¹ÌÉ½ÍÌµ•‘”½±½ÕÈ¸¥¹”‘•Ñ…¥°…Ù•É…•Ì…ĞÑÉ…¹Í¥Ñ¥½¸¸()5•…¸½±½ÕÈ…ÉÉä‘½•Ì¹½ĞÑÉ…¹ÍÁ½ÉĞ‘•Ñ…¥±•Á…Ñ ½É¥•¹Ñ…Ñ¥½¸½ÈİÉ…À™½½ÑÁÉ¥¹Ğ)½¹Ñ¼Õ¹Á¥­•™…•Ì¸±Á¡„äÈä½É•™±•Ñ¥½¸…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ğì<½Í•…´…ÕÑ¡½É¥¹œÅÕ•Õ•¸((¸äĞÈ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÈÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)¥Ù”¹•Ü½¹¹•Ñ•µMµÕ‘”¡•­Ì°½É¥¥¹…°äĞÄ­Í•…´ÄÄ…¹É•Ù¥•İ•É•±•…Í”ÔÁ…ÍÌ¸)9¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸I•Ù¥•İ•¡…¹•µ…¥¸½1…ˆÉ•Ù•ÉÍ”É…Á äĞÈìÁÉ½Ñ•Ñ•)µ…¥¸½…”½5Õ±Ñ¤Ä¸À½ÑÉ¥…¹±”É…Á ½™É½é•¸Õ¹¡…¹•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½İÌ¸)UÍ•ÈÉ•Á•…Ñ•AML€½¹•áÑ‰Õ¥±İ¡¥±”äĞÈİ…ÌÍÑ¥±°±½…°½¥¸É•É•ÍÍ¥½¸èäĞÄ…•ÁÑ…¹”)É•µ…¥¹ÌÁÉ½Ñ•Ñ•ì¹¼äĞÈ‘•Ù¥”AML¥¹™•ÉÉ•‰•™½É”ÁÕ‰±¥…Ñ¥½¸½µ…¹Õ…°Ñ•ÍĞ±¥ÍĞ¸((ŒŒ€¸äĞÈÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”ˆĞå‰ˆàÅØÜàÌÙ„ÅŒÉŒÔØåäÜÔÕ‘ÔÑ…‰ˆİˆÕ˜ä°Ñ•ÍÑ•ÑÉ•”(Õ™‰ˆäÌÑ‘…”ÜÔäÑÈÉ‰ŒÑ„ØĞĞÌáˆÁÕ‰ŒÀÀÌÀäİ™°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ğ)…Ñ„ÕÁ±½…‘•ÄÜ•á…Ğ‰±½‰ÌìÉ•…Ñ•ÑÉ•”…¹™•Ñ¡•µ…¥¸µ…Ñ ±½…±±äÑ•ÍÑ•ÑÉ•”¸)1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÜØÈÄààÀØÀ½©½ˆÄÄäÜØààÄÌÔÄÄ‰½Ñ Á…ÍÌ(¨¨ÈÜÈÀÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•¸)A…•ÌÌäÜØÈÄàÜÀÔÔ‰Õ¥±ÄÄäÜØààÄØÔÌØ½‘•Á±½äÄÄäÜØäÀÌÌàÌÔÍÕ••‘•¸±°ÈÀ¡•­•)Á½ÍÑ‘•Á±½åµ•¹ĞÍ¡•±°½Ù•ÉÍ¥½¸°¡…¹•µ…¥¸½1…ˆ½™¥±Ñ•È½Í•…´ÉÕ¹Ñ¥µ”É…Á °É•½Ù•Éä°)É•Ñ…¥¹•µ…¥¸½5Õ±Ñ¤Ä¸À½ÑÉ¥…¹±”É…Á ½UX½ÁÉ½©•Ğ½•áÁ½ÉĞ½ÁÉ¥µ¥Ñ¥Ù”…¹™É½é•¹	•Ñ„Ü)µ…É­•È™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸=É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•ìÁÉ½Ñ•Ñ•½™É½é•¸)‰åÑ•ÌÕ¹¡…¹•¸Q¡¥ÌÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±ä¸()	Õ¥±äĞÈ½µÁ±•Ñ”…¹É•…‘äèÕ‰”Ñİ¼™…•ÌÙ¥Í¥‰±”°Á…¥¹ĞÁ…Ñ ÕÀÑ¼Í¡…É••‘”°)MµÕ‘”…É½ÍÌ¥Ğ°½µÁ…É”=Á…¥Ñä…¹Á…¥¹Ñ•½Ù•É±…ä°U¹‘½I•‘¼É•Ñ…¥¹ÌA…¥¹Ğ°M…Ù•=Á•¸)É•Ñ…¥¹ÌÉ•ÍÕ±Ğ¸M•…´ÑÉ…¹Í¥Ñ¥½¸…ÉÉ¥•Ì…Ù•É…•½±½ÕÈ°¹½Ğ‘•Ñ…¥±•Á…Ñ ½É¥•¹Ñ…Ñ¥½¸¸)UÍ•ÈäĞÅAMLÁÉ½Ñ•Ñ•¸I•Á•…Ñ•AML½¹•áÑ‰Õ¥±…ÉÉ¥Ù•‰•™½É”äĞÈÁÕ‰±¥…Ñ¥½¸è¥Ğ¥Ì)¹½ĞäĞÈ‘•Ù¥”…•ÁÑ…¹”¸ÑÕ…°äĞÈ¥A…Í•…´™••°…Ñ”É•µ…¥¹Ì¹•áĞ¸Q¡•¸É•™¥¹”™É½´)™••‘‰…¬‰•™½É”<½‘”Í•…´…ÕÑ¡½É¥¹œì…±Á¡„äÈä½É•™±•Ñ¥½¸…Ñ•ÌÍÑ…ä¥¹‘•Á•¹‘•¹Ğ¸((ŒŒ€¸äĞÈÕÍ•ÈAMLƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()™ÕÉÑ¡•ÈAML½¹•áÑ‰Õ¥±…ÉÉ¥Ù•QHäĞÈ‘•Á±½åµ•¹Ğ°ÈÀ±¥Ù”µ™¥±”µ…Ñ¡•Ì…¹¡½ÍÑ•(ÈÜÈÁAMLÙ•É¥™¥…Ñ¥½¸¸•ÁĞÑ¡¥Ì±…Ñ•ÍĞAML™½È1%YäĞÈ½¹¹•Ñ•µ™…”µ•…¸…ÉÉä°)=Á…¥Ñä½½Ù•É±…ä½A…¥¹ĞU¹‘½I•‘¼½M…Ù•=Á•¸ì•…É±¥•ÈÁÉ•ÁÕ‰±¥…Ñ¥½¸É•Á•Ñ¥Ñ¥½¹ÌÉ•µ…¥¸äĞÄ¸)AÉ½Ñ•ĞäĞÈ…±½¹Í¥‘”äĞÄ¸9•áĞ…ÕÑ¡½É¥é•äĞÌ¹…ÉÉ½Ü‰Õ¥±‰•¥¹Ì‰½Õ¹‘•½‰©•Ğµ½¹±ä)<‰…­”™½Õ¹‘…Ñ¥½¸Ù¥„½É¥¥¹…°UX½İ¹•ÉÍ¡¥À½ÑÉ¥…¹±”•½µ•ÑÉäìÙ¥Í¥‰±”½¹ÑÉ½±Ì™½±±½Ü)Ù…±¥‘…Ñ•‰…­”Á¥á•±Ì½İ½É¬Õ…É‘Ì¸9¼<U$½ÈÉ•¹‘•É•<…•ÁÑ…¹”¥Ì¥¹™•ÉÉ•¸((ŒŒ€¸äĞÌƒŠPÉ•…µ½¹±ä½‰©•Ğ<‰…­”™½Õ¹‘…Ñ¥½¸ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•È€¸äĞÈAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•¸Õ‘¥Ğ™½Õ¹¹¼•á¥ÍÑ¥¹œ<‰…­•È¸9•Ü)ÍÉŒ½Á…¥¹Ğµ…¼µ‰…­”¹©Í€ÕÍ•Ì½É¥¥¹…°ÁÉ•Ù¥•ÜÑÉ¥…¹±”½İ¹•ÉÍ¡¥À½ÑÉ¥…¹±”É…Á °)½É¥¥¹…°Á…¥¹Ğµ™¥±Ñ•Èµ‘½µ…¥¸Ñ•á•°É…ÍÑ•È…¹Q¡É•”I…ä¹¥¹Ñ•ÉÍ•ÑQÉ¥…¹±”¸Q¡”)™¥±Ñ•È‘½µ…¥¸½ÁÑ¥½¹…±±äÉ•ÑÕÉ¹Ì¥ÑÌ•á¥ÍÑ¥¹œÑÉ…¹Í¥•¹ĞÑÉ¥…¹±”µ…Àì½É‘¥¹…Éä)‰ÉÕÍ …±±•ÉÌÉ•Ñ…¥¸•á…ĞÉ•ÑÕÉ¸Í¡…Á”…¹…±±½…Ñ¥½¹Ì¸9¼Í•½¹ÑÉ¥…¹Õ±…Ñ½È°)UXÉ…ÍÑ•É¥é•È°…‘©…•¹ä°‰ÉÕÍ °¡¥ÍÑ½Éä°Í•¹”É•Í½ÕÉ”½È•áÁ½ÉĞ½İ¹•È¸()AÕÉ”Íå¹¡É½¹½ÕÌ½‰©•Ğµ±½…°‰…­”É•ÑÕÉ¹Ì½İ¹•±¥¹•…ÈHàÙ¥Í¥‰¥±¥Ñä…¹Í•Á…É…Ñ”)½Ù•É…”°UXµØÀµ™¥ÉÍĞ¸]¡¥Ñ”õÕ¹½±Õ‘•ìÕ¹½Ù•É•Ñ•á•±Ìİ¡¥Ñ”½½Ù•É…”À¸•Ñ•Éµ¥¹¥ÍÑ¥Œ)½Í¥¹”µİ•¥¡Ñ•¡•µ¥ÍÁ¡•É”Í…µÁ±•Ì°‘½Õ‰±”µÍ¥‘•Í…µ”µ½‰©•Ğ‰±½­•ÉÌ°Í½ÕÉ”İ¥¹‘¥¹œ)¹½Éµ…°°¹½Éµ…±¥é•½‰©•Ğµ‘¥…½¹…°É…‘¥ÕÌ½‰¥…Ì¸M¥é”ÄÛŠLÄÈà½‘•™…Õ±ĞØĞ°Í…µÁ±•ÌÓŠLØĞ¼)‘•™…Õ±ĞÄØ°É…‘¥ÕÌ€¸ÀÀÇŠLÈ½‘•™…Õ±Ğ¸ÈÔ½˜‘¥…½¹…°¸½¹Í•ÉÙ…Ñ¥Ù”á4É…ä½ÑÉ¥…¹±”µÑ•ÍĞ)ÁÉ•™±¥¡ĞÁ±ÕÌ½É¥¥¹…°É4UXÍ…¸…Àì•á•ÍÌ½µÁ±•á¥ÑäÉ•™ÕÍ•Ìİ¥Ñ ¹¼Í•¹”İÉ¥Ñ•Ì¸)9½Éµ…±¥é•ÁÉ¥Ù…Ñ”É…Á Á½¥¹ÑÌ½¹±äìÍ½ÕÉ”µ•Í ½UX½•½µ•ÑÉäÉ•µ…¥¸Õ¹¡…¹•¸)9¼Í•¹”µ¹•¥¡‰½ÕÈ°É½Õ¹µÁ±…¹”°İ½É±µÑÉ…¹Í™½É´°É•¹‘•É•MM<½È…±‰•‘¼‰…­”å•Ğ¸)9¼µ…¥¸µ…ÁÀ<¥µÁ½ÉĞ½‰ÕÑÑ½¸½É•Í½ÕÉ”½Á•ÉÍ¥ÍÑ•¹”½•áÁ½ÉĞ¡…¹”½È‘•Ù¥”µÁ•É™½Éµ…¹”)±…¥´¸Q¡¥Ì¥¹Ñ•¹Ñ¥½¹…±±ä±½ÜµÉ•Í½±ÕÑ¥½¸™½Õ¹‘…Ñ¥½¸¥Ì9=P„¹•ÜÁ…¥¹ĞÉ•Í½±ÕÑ¥½¸¸()¥Ù”¹•ÜÉ•É•ÍÍ¥½¸Ñ•ÍÑÌ½Ù•È½ÁĞµ¥¸•á…Ğ½İ¹•ÉÍ¡¥À°İ¡¥Ñ”½Á•¸Á±…¹”½½Ù•É…”¼)‘•Ñ•Éµ¥¹¥Í´½½Áä¥Í½±…Ñ¥½¸°™…¥¹œ‰±½­•ÉÌ½É…‘¥ÕÌ½‘½Õ‰±”µÍ¥‘•É…åÌ°ÍÕÁÁ½ÉÑ•Í…±”¼)ÑÉ…¹Í±…Ñ¥½¸½É½Ñ…Ñ•UYÌ°ÍÑ…±”½¥¹Ù…±¥½½Ù•É±…À½İ½É¬É•™ÕÍ…±Ì…¹Í½ÕÉ”ÁÉ•Í•ÉÙ…Ñ¥½¸¸)Q¥¹äÅ”´àÍ½ÕÉ”™¥áÑÕÉ”İ…ÌÉ•©•Ñ•‰äÑ¡”=I%%90ÁÉ•Ù¥•Ü‰Õ¥±‘•È‰•™½É”‰…­¥¹œì)Í…±”Ñ•ÍÑÌÕÍ”…•ÁÑ•€¸ÀÇŠLÅ”à•½µ•ÑÉä¥¹ÍÑ•…°¹¼‰Õ¥±‘•ÈÑ½±•É…¹”¡…¹”¸)I•…‘½Ì½Á…¥¹Ğµ…¼µ™½Õ¹‘…Ñ¥½¸´äĞÌ¹µ‘€¸5…¥¸Á…¥¹Ñ•ÈÉ•Ù•ÉÍ”±½…‘•È¡…¥¸€¬Í¡•±°¼)É•½Ù•ÉäÁ¥¹ÌäĞÌÉ•Ù¥•İ•ì1…ˆ½µ…¥¸½…”½5Õ±Ñ¤Ä¸À½™É½é•¸…±½É¥Ñ¡µÌÕ¹¡…¹•¸()9•áĞè½É¥¥¹…°A…¥¹Ğ±…å•È½¡¥ÍÑ½ÉäÑÉ…¹Í…Ñ¥½¸™½È…¸•áÁ±¥¥Ğ¹½¸µ‘•ÍÑÉÕÑ¥Ù”<)5Õ±Ñ¥Á±ä±…å•È°İ¥Ñ …¹•±±…Ñ¥½¸½ÍÑ…±”½Á½½°½¡•­Á½¥¹ĞÕ…É‘Ì…¹Ù¥Í¥‰±”½¹ÑÉ½±Ì°)Ñ¡•¸¥A……ÁÁ•…É…¹”½±…Ñ•¹äÑ•ÍÑ¥¹œ¸¼¹½Ğ¥µÁ±ä<U$…•ÁÑ…¹”™É½´ÁÕÉ”Ñ•ÍÑÌ¸)±Á¡„äÈä½É•™±•Ñ¥½¸µÁÉ•Ù¥•Ü…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ñ±äÕ¹É•Í½±Ù•¸9¼¹•Ü<¡…¹‘Ìµ½¸)Ñ•ÍĞ•á¥ÍÑÌ¥¸äĞÌì•á¥ÍÑ¥¹œMµÕ‘”½A…¥¹ĞU¹‘½I•‘¼½M…Ù•=Á•¸É•µ…¥¹ÌÑ¡”¹•…É‰ä‰…Í•±¥¹”¸)Y…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½İÌì‘¼¹½Ğ¥¹™•È½µÁ±•Ñ¥½¸‰•™½É”Ù•É¥™¥…Ñ¥½¸¸((´mátäĞÌ…ÕÑ½µ…Ñ•è½É¥¥¹…°Ñ•á•°½ÑÉ¥…¹±”½İ¹•ÉÍ¡¥À…¹½É‘¥¹…Éä‰ÉÕÍ Í¡…Á”Õ¹¡…¹•¸(´mátäĞÌ…ÕÑ½µ…Ñ•èİ¡¥Ñ”½Á•¸ÍÕÉ™…”°½±ÕÍ¥½¸½É…‘¥ÕÌ½‘½Õ‰±”µÍ¥‘•‰±½­•ÉÌ°‘•Ñ•Éµ¥¹¥ÍÑ¥Œ½İ¹•‰åÑ•Ì…¹¹¼Í½ÕÉ”İÉ¥Ñ•Ì¸(´mátäĞÌ…ÕÑ½µ…Ñ•èÍÕÁÁ½ÉÑ•Í…±”½ÑÉ…¹Í±…Ñ¥½¸°É½Ñ…Ñ•UXÁ±…•µ•¹Ğì¥¹Ù…±¥½ÍÑ…±”½½Ù•É±…À½İ½É¬µ…ÀÉ•™ÕÍ…°¸(´mátäĞÌÁÕ‰±¥…Ñ¥½¸è±½…°­¡½ÍÑ•ÈÜÈÕAML°A…•ÌÍÕ•ÍÌ…¹ÈÀ•á…Ğ±¥Ù”µ™¥±”µ…Ñ¡•Ì¸(´9¼¹•ÜäĞÌ<‘•Ù¥”Ñ•ÍĞè¹¼<½¹ÑÉ½±Ì•áÁ½Í•¸=ÁÑ¥½¹…°¹•…É‰ääĞÈMµÕ‘”½U¹‘½I•‘¼½M…Ù•=Á•¸Í…¹¥Ñä½¹±ä¸((¸äĞÌ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸À½µÁ±•Ñ”É•É•ÍÍ¥½¸è€¨¨È°ÜÈÔAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)¥Ù”¹•Ü<½½İ¹•ÉÍ¡¥À¡•­Ì°½É¥¥¹…°MµÕ‘”äĞÄ¼äĞÈ•±•Ù•¸…¹É•±•…Í”½…¡”™¥Ù”)Á…ÍÌ½¸™¥¹…°ÉÕ¹Ñ¥µ”¸9¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•ìµ…¥¸½…”½5Õ±Ñ¤Ä¸À½™É½é•¸)Õ¹¡…¹•¸!½ÍÑ•É•É•ÍÍ¥½¸½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½İÌ¸9¼¹•Ü<‘•Ù¥”½¹ÑÉ½±Ì¸((ŒŒ€¸äĞÌÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€Í™•ˆÌØÀäİ™ˆØÜÜÄØÕˆÌÄØÉ…ŒàÔÉŒÔáŒÅ”ĞÔÉ˜ÜÌÕ€°Ñ•ÍÑ•ÑÉ•”)€ÈÈÍ”Éá”àÈàÔÔÄÌİ˜àÀÑ™…˜å”äÔÄÌĞØÄÑ™•”ÔÅ•€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ğ)…Ñ„ÕÁ±½…‘•ÄÌ•á…Ğ±½…°‰±½‰Ì…¹É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°±½…±±äÑ•ÍÑ•ÑÉ•”ì)™•Ñ¡•µ…¥¸µ…Ñ¡•°±½…°‰É…¹ …±¥¹•İ¥Ñ ¹¼™¥±”¡…¹•Ì¸1½…°9½‘”ÈĞ…¹)¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÜØÔäÔÀĞÈØ½©½ˆÄÄäÜàÄÌÄÈÄÄÄ‰½Ñ Á…ÍÌ€¨¨ÈÜÈÔÑ•ÍÑÌ€¼€À)™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•€¡¡½ÍÑ•ÈÄä¸áÌ¤¸)A…•ÌÌäÜØÔäĞäØÔä‰Õ¥±ÄÄäÜàÄÌÄØÌØä½‘•Á±½äÄÄäÜàÄÔÄààÌĞÍÕ••‘•¸±°ÈÀ¡•­•)Á½ÍÑ‘•Á±½åµ•¹ĞÍ¡•±°½Ù•ÉÍ¥½¸°•Ù•Éä¡…¹•ÉÕ¹Ñ¥µ”½İ¹•È°¹•Ü<µ½‘Õ±”°É•½Ù•Éä°)É•Ñ…¥¹•µ…¥¸½…”½5Õ±Ñ¤Ä¸À½ÑÉ¥…¹±”É…Á ½UX½Á…¥¹Ğ½ÁÉ½©•Ğ½•áÁ½ÉĞ…¹™É½é•¹	•Ñ„Üµ…É­•È)™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸I•Ù¥•İ•Á¥¹ÌäĞÌìÁÉ½Ñ•Ñ•½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸)9¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¸É•±…á•¸Q¡¥ÌÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì)½¹±ä°İ¥Ñ ¥‘•¹Ñ¥…°Ñ•ÍÑ•ÉÕ¹Ñ¥µ”‰åÑ•Ì¸()	Õ¥±äĞÌ½µÁ±•Ñ”è¹¼¹•Ü¡…¹‘Ìµ½¸<Ñ•ÍĞ¹••‘•‰•…ÕÍ”¹¼<½¹ÑÉ½±Ì…É”•áÁ½Í•¸)AÕÉ”‰…­”½½İ¹•ÉÍ¡¥À½İ½É¬½É•™ÕÍ…°½Ù•É…”¥Ì…ÕÑ½µ…Ñ•¸UÍ•ÈäĞÉAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•ì)¹•áĞ¹…ÉÉ½Ü‰Õ¥±¥¹Ñ•É…Ñ•Ì•áÁ±¥¥Ğ<5Õ±Ñ¥Á±äµ±…å•ÈÉ•…Ñ¥½¸Ñ¡É½Õ ½É¥¥¹…°A…¥¹Ğ)¡¥ÍÑ½Éä½Á½½°½½µÁ½Í¥Ñ½Èİ¥Ñ ÍÑ…•½…¹•°½ÍÑ…±”½É•™ÕÍ…°Õ…É‘Ì…¹Ñ¡•¸Ù¥Í¥‰±”½¹ÑÉ½±Ì¸)<™½Õ¹‘…Ñ¥½¸¥Ì±½…°µ½‰©•ĞÄÛŠLÄÈàÍ…µÁ±•Ì½¹±ä°¹½ĞÉ•¹‘•É•MM<°¹•¥¡‰½ÕÈµ½‰©•Ğ)Í¡…‘½İÌ°Á•ÉÍ¥ÍÑ•¹Ğ<É•Í½ÕÉ•Ì½È¡¥ µÉ•Í½±ÕÑ¥½¸…±‰•‘¼‰…­¥¹œ¸±Á¡„äÈä…¹)É•™±•Ñ¥½¸µÁÉ•Ù¥•Ü…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ğ¸á¥ÍÑ¥¹œMµÕ‘”½A…¥¹Ğ¡¥ÍÑ½Éä½M…Ù•=Á•¸)¥Ì½ÁÑ¥½¹…°¹•…É‰ä‘•Ù¥”Í…¹¥Ñä°¹½Ğ…¸¥¹Ù•¹Ñ•<…•ÁÑ…¹”…Ñ”¸((ŒŒ€¸äĞĞ<±…å•È¥¹Ñ•É…Ñ¥½¸((´mátM…µ”µ™…”½Ù•É…”ÑÉ…¹Í™•ÈÔÄÈ¼ÄÀÈĞ•á±Õ‘•Ì…Ñ±…Ì¹•¥¡‰½ÕÉÌìÕ¹½±Õ‘•ÍÕÉ™…•Ìİ¡¥Ñ”°…ÁÌÑÉ…¹ÍÁ…É•¹Ğ°½É¥¥¹…°Í½ÕÉ•ÌÕ¹¡…¹•¸(´mátÑÕ…°ÁÉ•Ù¥•Ü½…¹•°¹¼É•Í½ÕÉ”½¡¥ÍÑ½ÉäìÁÁ±ä½¹”½É¥¥¹…°¡•­Á½¥¹Ğ°Í•±•Ñ••‘¥Ñ…‰±”5Õ±Ñ¥Á±ä±…å•È°¥¹‘•Á•¹‘•¹ĞÁ••È½‰…Í”½Í…±…ÉÌ¸(´mátÑÕ…°ÄÀÈĞU$…¹•°½ÁÁ±äì½É¥¥¹…°A…¥¹Ğ¡¥ÍÑ½Éä°M…Ù•=Á•¸…¹•á…Ğ¹…Ñ¥Ù”½1A9É•Ñ…¥¸…ÁÁ•…É…¹”½±…å•È‘…Ñ„¸(´mátÕ±°Í±½ÑÌ½Í…±…ÉÌ½µ…Í­Ì½½µÁ±•á¥Ñä½ÍÑ…±”Í½ÕÉ”½¡•­Á½¥¹Ğ½Á½½°É•™ÕÍ…°­••ÁÌ½µµ¥ÑÑ•Á…¥¹Ğ½¡¥ÍÑ½Éäì™…¥±•ÁÁ±ä…¹‘¥‘…Ñ”…¸…¹•°Í…™•±ä¸(´mátI•Ñ…¥¹•¥µ…•ÌÉ•µ…¥¸Í½ÕÉ”µ•‘¥Ñ…‰±”ì¥µ…”½<ÁÉ•Ù¥•İÌµÕÑÕ…±±ä•á±ÕÍ¥Ù”ì½¹”‘É½ÁÌÕ¹…ÁÁ±¥•<¸(´ltY%äĞĞÉ••ÍÍ•UXµ•Í ÁÉ•Ù¥•Ü½I•… ½MÑÉ•¹Ñ °…¹•°½ÁÁ±ä…¹±…å•È½Á…¥Ñä½Ù¥Í¥‰¥±¥Ñä…ÁÁ•…É…¹”½±…Ñ•¹ä¸(´ltY%äĞĞA…¥¹ĞU¹‘½I•‘¼€¡Í•±•Ğ<¥˜I•‘¼­••ÁÌ	…Í”¤°M…Ù•=Á•¸½¹…Ñ¥Ù”Í¡…‘••áÁ½ÉĞÍ…¹¥Ñä¸()UÍ•ÈäĞÉAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•ì¹¼¹•Ü<¥A…½A•¹¥°½±…Ñ•¹ä…•ÁÑ…¹”¥¹™•ÉÉ•™É½´)9½‘”•½µ•ÑÉä½µ…Ñ•É¥…°½=4…‘…ÁÑ•ÉÌ¸=É¥¥¹…°±½…°µ½‰©•ĞØĞ¼ÄØ‰…­”½İ½É¬±¥µ¥ÑÌì)Á±…¥¸½¹Ù•àÕ‰•Ì…¸‰”Õ¹Í¡…‘•¸±Á¡„äÈä½É•™±•Ñ¥½¸µÁÉ•Ù¥•Ü…Ñ•Ì¥¹‘•Á•¹‘•¹Ğ¸((¸äĞĞ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÌÄAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)M¥à¹•Ü<¥¹Ñ•É…Ñ¥½¸¡•­Ì€¬•á¥ÍÑ¥¹œÈÜÈÔÁ…ÍÌ½¸™¥¹…°Í½ÕÉ”ì½É¥¥¹…°¹•…É‰ä(äĞÌ¼äÌà¼äĞÈÍ¥áÑ••¸…¹É•Ù¥•İ•É•±•…Í”™¥Ù”…±Í¼Á…ÍÌ¸9¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹Ì)É•±…á•¸½µÁ±•Ñ”<µ¡•±Á•È½Á…¥¹Ñ•È½Í¡•±°É•Ù•ÉÍ”Á¥¹ÌäĞĞÉ•Ù¥•İ•ìµ…¥¸½…”½5Õ±Ñ¤Ä¸À¼)™É½é•¸Õ¹¡…¹•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½İÌì‘•Ù¥”äĞĞÁ•¹‘¥¹œ¸((ŒŒ€¸äĞĞÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÈ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ””ĞÌääİˆÄÈÉ˜İ”Èåˆá‘™˜Èå‘ˆáŒØÜÔÉ‘•ŒÉàÙ€°Ñ•ÍÑ•ÑÉ•”)€ÈÌÌÅ„ÁàÙå”àÜÜÜÅ˜ÈÅ˜Ñ„å‘”Øİ˜ÔàÅ™„ÀÑ€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ğ)…Ñ„ÕÁ±½…‘•ÄÈ•á…Ğ‰±½‰Ì…¹É•…Ñ•¥‘•¹Ñ¥…°Ñ•ÍÑ•ÑÉ•”ì™•Ñ¡•µ…¥¸µ…Ñ¡•°)±½…°‰É…¹ …±¥¹•±•…¹±ä¸1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäÜÜÈÀØÜàÈÀ¼)©½ˆÄÄäàÀÄÜäĞÄäØ‰½Ñ Á…ÍÌ€¨¨ÈÜÌÄÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•)±½œÑ½Ñ…±ÌÙ•É¥™¥•€ ÈÌÀ¸ÁÌ¤¸A…•ÌÌäÜÜÈÀØØØÀä‰Õ¥±ÄÄäàÀÄÜäØäÔÀ½‘•Á±½äÄÄäàÀÄääØÜÔÈ)ÍÕ••‘•¸±°ÈÀÁ½ÍÑ‘•Á±½åµ•¹Ğ¡•­•Í¡•±°½Ù•ÉÍ¥½¸°¡…¹•Á…¥¹Ñ•ÈU$½½É”½¹•Ü)<ÑÉ…¹Í™•È¡•±Á•È°É•Ñ…¥¹•äĞÌ‰…­”½‘½µ…¥¸°É•½Ù•Éä½µ…¥¸½…”½5Õ±Ñ¤Ä¸À½ÑÉ¥…¹±”)•½µ•ÑÉä½UX½Á…¥¹Ğ½ÁÉ½©•Ğ½•áÁ½ÉĞ…¹™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸)=É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•ìÁÉ½Ñ•Ñ•½™É½é•¸…±½É¥Ñ¡µÌÕ¹¡…¹•¸Q¡¥ÌÁÉ½½˜)ÕÁ‘…Ñ•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±äìÑ•ÍÑ•½ÁÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”‰åÑ•ÌÕ¹¡…¹•¸()	Õ¥±äĞĞ¥Ì½µÁ±•Ñ”…¹É•…‘ä™½È¡…¹‘Ìµ½¸Ñ•ÍÑ¥¹œèÍ¥µÁ±”É••ÍÍ•¹…Ñ¥Ù”UXµ•Í +ŠHA…¥¹ĞƒŠHµ‰¥•¹Ğ½±ÕÍ¥½¸ƒŠH	…­”<ÁÉ•Ù¥•Üì½É‰¥Ğ°…¹•°É•Ñ…¥¹ÌÁÉ¥½ÈÁ…¥¹Ğ¸)	…­—ŠIÁÁ±äÉ•…Ñ•ÌÍ•±•Ñ••‘¥Ñ…‰±”<5Õ±Ñ¥Á±ä±…å•Èì1…å•È½Á…¥Ñä½Ù¥Í¥‰¥±¥Ñä°)A…¥¹ĞU¹‘½I•‘¼°M…Ù•=Á•¸…¹¹…Ñ¥Ù”Í¡…‘••áÁ½ÉĞÍ…¹¥Ñä¸I•‘¼™½±±½İÌ½É¥¥¹…°)Í•±•Ñ¥½¸ÉÕ±•Ì…¹…¸­••À	…Í”Í•±•Ñ•ì¡½½Í”<±…å•È¥˜¹••‘•¸½¹Ù•àÕ‰”)µ…äÍ¡½Ü±¥ÑÑ±”½¹¼Í¡…‘½ÜìÍ…µ”µ½‰©•Ğ½±½…°ØÓ
È¼ÄØµÉ…ä‰…­”°¹½ĞÍÉ••¸µÍÁ…”½È)¹•¥¡‰½ÕÈµ½‰©•Ğ<¸]½É¬½É•™ÕÍ…°±¥µ¥ÑÌÉ•µ…¥¸ìÍµ…±°UXµ•Í¡•Ì™¥ÉÍĞ¸•Ù¥”äĞĞ)…ÁÁ•…É…¹”½±…Ñ•¹ä½Á•ÉÍ¥ÍÑ•¹”…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ°¹½Ğ¥¹™•ÉÉ•™É½´9½‘”¸)UÍ•ÈäĞÈ½¹¹•Ñ•MµÕ‘”AMLÁÉ½Ñ•Ñ•ì…±Á¡„äÈä½É•™±•Ñ¥½¸µÁÉ•Ù¥•Ü¥¹‘•Á•¹‘•¹Ğ¸)9•áĞ¹…ÉÉ½ÜÉÕ¹Ñ¥µ”İ½É¬™½±±½İÌ…ÑÕ…°äĞĞ‘•Ù¥”™••‘‰…¬É…Ñ¡•ÈÑ¡…¸…ÕÑ½µ…Ñ¥Œ)<ÅÕ…±¥Ñä½±¥¡Ñ¥¹œ¡…¹•Ì¸9¼¹•Ü<‘•Ù¥”AML¥¹™•ÉÉ•™É½´€½¹•áÑ‰Õ¥±¸((ŒŒ€¸äĞÔ¡¥¡•ÈµÉ•Í½±ÕÑ¥½¸<€¼€¸äĞĞAMLİ¥Ñ ÅÕ…±¥Ñä•á•ÁÑ¥½¸((´mátUÍ•ÈäĞÑAMLÁÉ½Ñ•ÑÌ<İ½É­™±½ÜìÁ½½È½Á…Ñ¡ä…ÁÁ•…É…¹”É•µ…¥¹Ì…¸•áÁ±¥¥Ğ½Á•¸¥ÍÍÕ”¸(´mátI•…°ÈÔÛ
È¼ØĞµÉ…ä‰…­”°™¥¹•ÈÍ¡…‘”±•Ù•±Ì…¹¹•ÜÑ¡¥¸µ™…”½Ù•É…”ì¹¼…Ñ±…Ìµ™…”½¹Ñ…µ¥¹…Ñ¥½¸½Í½ÕÉ”İÉ¥Ñ•Ì¸(´mátEÕ¥¬ØĞ¼ÄØ…Íå¹Œ½ÕÑÁÕĞ‰åÑ”µ¥‘•¹Ñ¥…°Ñ¼½±Íå¹Œ½ÕÑÁÕĞì½É¥¥¹…°á4½Í¥é”Õ…ÉÑ•ÍÑÌÉ•Ñ…¥¹•¸(´mátAÉ½É•ÍÌ½…¹•°½ÁÉ”µ…‰½ÉĞ½¥¹Ù…±¥ÅÕ…±¥Ñä¼ÄÈá4É•™ÕÍ…°­••À½ÕÑÁÕĞ…Ñ½µ¥Œ¸(´mátÑÕ…°Á…¥¹Ñ•È‰ÕÍä…¹•°½±½Í”½ÍÑ…±”Í½ÕÉ”½É•ÑÉä½Á½½°½¡•­Á½¥¹Ğ…¹U$‘•™…Õ±Ğ½½¹”±…Ñ”µÉ•ÍÕ±ĞÍÕÁÁÉ•ÍÍ¥½¸¸(´ltY%äĞÔÍ…µ”É••ÍÍ•µ½‘•°EÕ¥¬Ù•ÉÍÕÌ!¥ °½±<¡¥‘‘•¸½‘•±•Ñ•°Í…µ”I•… ½MÑÉ•¹Ñ èÅÕ…±¥Ñä½Á…Ñ¡¥¹•ÍÌ…¹İ…¥ĞÑ¥µ”¸(´ltY%äĞÔ…¹•°UI%9‰…­”±•…Ù•Ì¹¼±…å•È½¡¥ÍÑ½ÉäìÉ•ÑÉäÁÁ±ä½½Á…¥Ñä½U¹‘½I•‘¼½M…Ù•=Á•¸½¹…Ñ¥Ù”Í¡…‘•½ÕÑÁÕĞ¸()9•ÜÅÕ…±¥Ñä…Ñ•ÌÉ•µ…¥¸Á•¹‘¥¹œ¸5•‘¥Õ´½EÕ¥¬™…±±‰…¬™½È½µÁ±•àİ½É¬ì¹¼¹•Ü)Á…¥¹Ğ½Í½ÕÉ”½Í…±…È±¥µ¥ÑÌ°Í¡•µ…Ì½È±¥¡ĞÍ½ÕÉ”¸=±Í…Ù•<µÕÍĞ‰”É•‰…­•¸((¸äĞÔ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÌÜAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨¸)±°½É¥¥¹…°ÈÜÌÄ…¹Í¥à¹•ÜÅÕ…±¥Ñä½…¹•±±…Ñ¥½¸¡•­ÌÁ…ÍÌ½¸™¥¹…°Í½ÕÉ”ì)½É¥¥¹…°<äĞÌ¼äĞĞ•±•Ù•¸…¹É•Ù¥•İ•É•±•…Í”™¥Ù”…±Í¼Á…ÍÌ¸9¼…ÍÍ•ÉÑ¥½¹Ì)É•±…á•¸I•Ù¥•İ•<½Á…¥¹Ñ•È½Í¡•±°É•Ù•ÉÍ”É…Á äĞÔìÁÉ½Ñ•Ñ•µ…¥¸½…”½5Õ±Ñ¤Ä¸À¼)™É½é•¸Õ¹¡…¹•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½İÌì‘•Ù¥”ÅÕ…±¥ÑäÁ•¹‘¥¹œ¸((ŒŒ€¸äĞÔÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”‰ŒÀÑ…‘ˆØØĞÔÜÈÈÍŒÉ„ÌØÔÑ•‰ÀÔå•˜ĞÄàÀÑ„Ñ‰™€°Ñ•ÍÑ•ÑÉ•”)€á…ˆÔİ‘‘‰™”ÀÌÀÍŒàÀäÌÉ™áÑ”Õ˜äÅ”äÔÅŒĞÁ€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•¥Ğ)…Ñ„ÕÁ±½…‘•ÄÌ•á…Ğ‰±½‰Ì…¹É•…Ñ•¥‘•¹Ñ¥…°Ñ•ÍÑ•ÑÉ•”ì™•Ñ¡•µ…¥¸µ…Ñ¡•)…¹±½…°‰É…¹ …±¥¹•±•…¹±ä¸1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌäààÜØÌÜäÌĞ¼)©½ˆÄÈÀÄääĞÌĞÔäÔ‰½Ñ Á…ÍÌ€¨¨ÈÜÌÜÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•)±½œÑ½Ñ…±ÌÙ•É¥™¥•€ ÈÌÌ¸ÅÌ¤¸A…•ÌÌäààÜØÌÜÌäÄ‰Õ¥±ÄÈÀÄääĞÌÜÀÄÌ½‘•Á±½äÄÈÀÄääÔÜÈÌäÈ)ÍÕ••‘•¸±°ÈÀ¡•­•Á½ÍÑ‘•Á±½åµ•¹ĞÍ¡•±°½Ù•ÉÍ¥½¸°¡…¹•<‰…­•È½ÑÉ…¹Í™•È¼)Á…¥¹Ñ•ÈU$½½É”°É•Ñ…¥¹•‘½µ…¥¸½ÑÉ¥…¹±”É…Á °É•½Ù•Éä½µ…¥¸½…”½5Õ±Ñ¤Ä¸À½UX½Á…¥¹Ğ¼)ÁÉ½©•Ğ½•áÁ½ÉĞ…¹™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸I•Ù¥•İ•Á¥¹ÌäĞÔì)½É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•°ÁÉ½Ñ•Ñ•½™É½é•¸…±½É¥Ñ¡µÌÕ¹¡…¹•¸Q¡¥ÌÁÉ½½˜)¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±äìÑ•ÍÑ•½ÁÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”‰åÑ•ÌÕ¹¡…¹•¸()	Õ¥±äĞÔ½µÁ±•Ñ”…¹É•…‘ä™½ÈM5µµ½‘•°½µÁ…É¥Í½¸è¡¥‘”½‘•±•Ñ”½±<°EÕ…±¥Ñä)EÕ¥¬ØĞ¼ÄÛŠI	…­”½¥¹ÍÁ•Ğ½…¹•°ì!¥ ÈÔØ¼ØĞ…ĞÍ…µ”I•… ½MÑÉ•¹Ñ °½µÁ…É”™¥¹•ÈÍ¡…‘”)…¹İ…¥ĞÑ¥µ”¸5•‘¥Õ´ÄÈà¼ØĞÉ•µ…¥¹Ì…Ù…¥±…‰±”¥˜!¥ İ½É¬…ÀÉ•™ÕÍ•Ì¸…¹•°‘ÕÉ¥¹œ)‰…­”±•…Ù•Ì¹¼±…å•È½¡¥ÍÑ½ÉäìÉ•ÑÉä½ÁÁ±ä°1…å•È½Á…¥Ñä½Ù¥Í¥‰¥±¥Ñä°A…¥¹ĞU¹‘½I•‘¼°)M…Ù•=Á•¸½¹…Ñ¥Ù”Í¡…‘¥¹œ¸=±Í…Ù•<Á¥á•±Ì‘¼¹½Ğ…ÕÑ½µ…Ñ¥…±±ä¥µÁÉ½Ù”ìÉ•‰…­”¸)UÍ•ÈäĞÑAMLÁÉ½Ñ•ÑÌİ½É­™±½Üİ¥Ñ •áÁ±¥¥ĞÁ½½È½Á…Ñ¡ä…ÁÁ•…É…¹”•á•ÁÑ¥½¸ìäĞÔ)…ÑÕ…°¥A…ÅÕ…±¥Ñä½±…Ñ•¹ä…•ÁÑ…¹”É•µ…¥¹ÌA9%9°¹½Ğ¥¹™•ÉÉ•™É½´9½‘”¸)EÕ…±¥ÑäÑ•ÍĞÁÉ½Ù•Ì…ÑÕ…°¡¥¡•ÈÉ¥½µ½É”±•Ù•±Ì½Ñ¡¥¸µ™…”½Ù•É…”°¹½ĞÁ•É™•Ğ)Íµ½½Ñ¡¹•ÍÌ½¸•Ù•Éäµ½‘•°¸±Á¡„äÈä½É•™±•Ñ¥½¸…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ğ¸9•áĞ)ÉÕ¹Ñ¥µ”É•™¥¹•µ•¹Ğ™½±±½İÌ‘•Ù¥”½µÁ…É¥Í½¸É…Ñ¡•ÈÑ¡…¸Õ¹É•±…Ñ•±¥¡Ñ¥¹œ¡…¹•Ì¸((ŒŒ€¸äĞØƒŠPÁ…¥¹Ğ€¼UXÉ•ÍÑ…ÉĞì€¸äĞÔÕÍ•ÈAMLƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äÉ•Á½ÉÑÌ€¨¨äĞÔ€ôAML¨¨èÁÉ½Ñ•Ğ¡¥¡•ÈµÉ•Í½±ÕÑ¥½¸<…¹¥ÑÌ•á¥ÍÑ¥¹œ)ÁÉ•Ù¥•Ü½…¹•°½…ÁÁ±ä½¡¥ÍÑ½Éäİ½É­™±½Ü¸Q¡¥ÌÍÕÁ•ÉÍ•‘•Ì•…É±¥•ÈÁ•¹‘¥¹œäĞÔ¹½Ñ•Ìì)¹¼¥µÁ±¥…Ñ¥½¸½˜Á•É™•Ğ<½¸…±°µ•Í¡•Ì½È…•ÁÑ…¹”½˜Õ¹É•±…Ñ•½Á•¸…Ñ•Ì¸()Õ‘¥Ğµ…¥¸ÁŒÄĞÀÀè½É¥¥¹…°UXÁÉ½©•Ñ¥½¹Ì…¹A…¬…±°•á¥ÍĞ°¹¼Á…¥¹ĞÉ•Í•Ğ…¹)¹¼•¹•É…°…Ñ±…ÌÕ¹İÉ…À¸á…Ñ±…Ì…ÁÁ•…ÉÌ½¹±ä¥¸Á…Ñ¡ÑÉ…”‘•Á•¹‘•¹äUI0ìA…¬…±°)…ÉÉ…¹•Ì•á¥ÍÑ¥¹œ¥Í±…¹‘Ì…¹‘½•Ì¹½Ğ•¹•É…Ñ”…¸…Ñ±…Ì¸-••À…Ñ±…ÌÕ¹İÉ…À…Ì„)Í•Á…É…Ñ”™ÕÑÕÉ”¹…ÉÉ½ÜÑ…Í¬Ñ¡É½Õ ½É¥¥¹…°UX½¡¥ÍÑ½Éä½İ¹•ÉÌ¸()=‰©•ĞƒŠHUX¹½Ü•áÁ½Í•Ì±•…ÈÁ…¥¹Ğ€¡­••ÁÌUYÌ¤…¹±•…ÈÁ…¥¹Ğ€¬UYÌ€¡¡½½Í”„)ÁÉ½©•Ñ¥½¸……¥¸¤¸	½Ñ İ½É¬İ¥Ñ ÍÑ…±”•½µ•ÑÉä½UX‰¥¹‘¥¹Ìİ¥Ñ¡½ÕĞ½Á•¹¥¹œA…¥¹Ğ¸)±°½±½ÕÈ±…å•ÉÌ½µ…Í­Ì½¥µ…•Ì½<Á±ÕÌÉ½Õ¡¹•ÍÌ…¹µ•Ñ…±¹•ÍÌÉ•Í½ÕÉ•Ì‘•Ñ… ¥¸)½¹”½É¥¥¹…°Í•¹”¡•­Á½¥¹ĞìÍ¡…É•É•Í½ÕÉ•Ì½½Á¥•ÌÉ•µ…¥¸¥¹Ñ…Ğ¸9¼É•‰¥¹½˜)½±Á¥á•±Ì°¹¼•½µ•ÑÉä•‘¥ÑÌ°¹¼…ÕÑ½µ…Ñ¥Œ‘¥Í…É½¸UX•‘¥ÑÌ¸U¹‘¼½I•‘¼É•ÍÑ½É•Ì)•á…ĞÉ•Í½ÕÉ•Ì½UYÌ¸I•Í•Ğ¥Ì™½È¥¹‘•Á•¹‘•¹Ğ	½á1…ˆµ•Í¡•Ìì¥µÁ½ÉÑ•1µ…Ñ•É¥…±Ì°)±¥¹­•½ÁÉ½•‘ÕÉ…°½±½­•½É•™•É•¹”½‰©•ÑÌ…É”É•™ÕÍ•¸á¥ÍÑ¥¹œÁÉ½©•Ñ¥½¸	…Í”)É•ÍÑÉ¥Ñ¥½¹ÌÉ•µ…¥¸¸Y¥•İÁ½ÉĞÉ•™É•Í ÕÍ•Ì½É¥¥¹…°É•¹‘•Èµµ½‘”½İ¹•È¸MÑ…±”Á…¥¹Ğ)•ÉÉ½ÉÌ¹½Ü‘¥É•ĞÑ¼=‰©•ĞƒŠHUXƒŠH±•…ÈÁ…¥¹Ğ¸()½ÕÈ¹•ÜäĞØÑ•ÍÑÌ½Ù•È…±°µ¡…¹¹•°ÍÑ…±”É•½Ù•Éä…¹É•½Á•¸°…ÑÕ…°U¹‘½I•‘¼½=\°)ÍÑ…±”UXÉ•µ½Ù…°½É•ÁÉ½©•Ğ½É•Á…¥¹Ğ°‰±…¹¬¹…Ñ¥Ù”M…Ù•=Á•¸°¹¼µ½À½É•™ÕÍ…°…Ñ½µ¥¥Ñä°)…¹½É¥¥¹…°Á…¹•°…±±‰…¬½É•¹‘•È‘•±•…Ñ¥½¸¸9•Üµ…¹Õ…°…Ñ”èÉ•ÁÉ½‘Õ”ÍÑ…±”)Á…¥¹ĞƒŠH±•…ÈÁ…¥¹ĞƒŠHA…¥¹Ğì±•…È‰½Ñ ƒŠH	½à½…ÁÁÉ½ÁÉ¥…Ñ”ÁÉ½©•Ñ¥½¸ƒŠHA…¥¹Ğì)U¹‘½I•‘¼É•Í•Ğ…¹M…Ù•=Á•¸‰±…¹¬½É•Á…¥¹Ñ•É•ÍÕ±Ğ¸Ñ±…Ì•¹•É…Ñ¥½¸¹½ĞÍ¡¥ÁÁ•¸)I•±•…Í”É…Á äĞØÉ•Ù¥•İ•ì5Õ±Ñ¤Ä¸À½™É½é•¸™¥±•ÌÕ¹¡…¹•¸Y…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸)É•ÍÕ±ÑÌ™½±±½Üì¹¼äĞØ‘•Ù¥”AML¥¹™•ÉÉ•¸((´mátY%äĞÔÕÍ•È•áÁ±¥¥Ñ±äÉ•Á½ÉÑÌAMLì¡¥¡•ÈµÉ•Í½±ÕÑ¥½¸<İ½É­™±½ÜÁÉ½Ñ•Ñ•¸(´ltY%äĞØ±•…ÈÁ…¥¹Ğ°±•…ÈÁ…¥¹Ğ€¬UYÌ°É•ÁÉ½©•Ğ½É•Á…¥¹Ğ°U¹‘½I•‘¼…¹M…Ù•=Á•¸¸((¸äĞØÉÕ¹Ñ¥µ”ÁÕ‰±¥Í¡•è€å…˜å„Ìİ•‰•ˆÀäÄÍ”ÍŒÔÁ˜ÜÙ„Á”ÕˆÄäá˜àäÄĞÍ™‘™€°Ñ•ÍÑ•ÑÉ•”)€ÌÄá˜ĞÈÀÄÈÀÌäÉ”ÔÜÍ˜ĞØÍ˜ààÌÑ…˜ÀÔÄÀÌÔØÍŒÙ™€¸1½…°9½‘”ÈĞ™Õ±°É•É•ÍÍ¥½¸è(¨¨È°ÜĞÄAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨€ ÈÄÈ¸åÌ¤°¥¹±Õ‘¥¹œ½É¥¥¹…°ÈÜÌÜ…¹™½ÕÈ¹•Ü)É•½Ù•ÉäÑ•ÍÑÌì¹¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•¸I•±•…Í”½¹ÑÉ…Ğ™¥Ù”Á…ÍÌ¸I•µ½Ñ”)µ…¥¸™•Ñ¡•°•á…ĞÑ•ÍÑ•ÑÉ•”µ…Ñ¡•…¹±½…°‰É…¹ …±¥¹•±•…¹±ä¸)!½ÍÑ•É•É•ÍÍ¥½¸ÌääÀÀäØØĞÈÀ…¹A…•ÌÌääÀÀäØØÈĞÌÙ•É¥™¥•‰•±½Ü¸((¸äĞØÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•è¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌääÀÀäØØĞÈÀ½©½ˆÄÈÀÈĞÈÄäàÌÜÄ)Á…ÍÍ•Ì€¨¨ÈÜĞÄÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨€¡™Õ±°±½œÑ½Ñ…±ÌÙ•É¥™¥•¤°µ…Ñ¡¥¹œ)±½…°9½‘”ÈĞ¸A…•ÌÌääÀÀäØØÈĞÌ‰Õ¥±ÄÈÀÈĞÈÈÀÄÌàÌ½‘•Á±½äÄÈÀÈĞÈÌĞÔÄĞäMUML¸)±°ÈÀ¡•­•Á½ÍÑ‘•Á±½åµ•¹ĞÍ¡•±°½Ù•ÉÍ¥½¸°É•Í•Ğ½UX½Á…¥¹Ñ•È½É•…Ñ¥½¸±½…‘•ÉÌ°)É•±•…Í”µÉ•½Ù•Éä½<½µ…¥¸½5Õ±Ñ¤Ä¸À½¥¹ÍÁ•Ñ¥½¸½Á…¥¹Ğ½ÁÉ½©•Ğ½•áÁ½ÉĞ…¹™É½é•¹	•Ñ„Ü)µ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸9¼Ñ•ÍÑ•ÉÕ¹Ñ¥µ”¡…¹•…™Ñ•ÈÙ…±¥‘…Ñ¥½¸¸()	Õ¥±äĞØ½µÁ±•Ñ”…¹É•…‘ä™½È‘•Ù¥”Ñ•ÍÑ¥¹œè=‰©•ĞƒŠHUXƒŠH±•…ÈÁ…¥¹Ğ­••ÁÌ)UYÌ…¹ÍÑ…ÉÑÌ„‰±…¹¬Á…¥¹ĞÍ•ÍÍ¥½¸°¥¹±Õ‘¥¹œÑ¡”½±‰¥¹‘¥¹œµ•ÉÉ½È…Í”¸±•…È)Á…¥¹Ğ€¬UYÌÁ•Éµ¥ÑÌ™É•Í 	½à½…ÁÁÉ½ÁÉ¥…Ñ”ÁÉ½©•Ñ¥½¸…¹É•Á…¥¹Ğ¸U¹‘½I•‘¼É•ÍÑ½É•Ì)É•Í½ÕÉ•Ì½UYÌìM…Ù•=Á•¸É•Ñ…¥¹Ì±•…É•½É•Á…¥¹Ñ•É•ÍÕ±Ğ¸•Ù¥”äĞØA9%9¸UÍ•ÈäĞÔ)AMLÁÉ½Ñ•Ñ•¸•¹•É…°…Ñ±…ÌÕ¹İÉ…ÀÉ•µ…¥¹Ì„Í•Á…É…Ñ”™ÕÑÕÉ”‰Õ¥±ìA…¬…±°½¹±ä)…ÉÉ…¹•Ì•á¥ÍÑ¥¹œ¥Í±…¹‘Ì¸Q¡¥ÌÁÉ½½˜¡…¹•Ì½¹Ñ¥¹Õ¥Ñä‘½Ì½¹±ä¸((ŒŒ€¸äĞÜƒŠPÙ¥ÍÕ…°A…¥¹Ğ±…å•ÈÍÑ…¬ìÕÍ•ÈäĞÙAMLƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌäĞÙAMLèÁÉ½Ñ•Ğ•áÁ±¥¥ĞÕ¹‘½…‰±”±•…ÈÁ…¥¹Ğ€¼±•…ÈÁ…¥¹Ğ€¬UYÌ°)ÍÑ…±”µ‰¥¹‘¥¹œÉ•½Ù•Éä½É•ÁÉ½©•Ğ…¹½É¥¥¹…°É•Í½ÕÉ•Ì½¡¥ÍÑ½Éä¸UÍ•È¹½ÜÁÉ¥½É¥Ñ¥é•Ì)„AÉ½É•…Ñ”µÍÑå±”±…å•È±¥ÍĞì…Ñ±…ÌÕ¹İÉ…ÀÉ•µ…¥¹Ì‘•™•ÉÉ•°¹½Ğ¥µÁ±•µ•¹Ñ•‰äA…¬¸)Õ‘¥ĞÕÉÉ•¹ĞáŒäàÀÜÈè…±°±…å•È½Á•É…Ñ¥½¹Ì…±É•…‘ä‰•±½¹œÑ¼½É¥¥¹…°A…¥¹Ğ½É”…¹)U$½¹ÑÉ½±Ìì½¹±ä‘É½Á‘½İ¸ÁÉ•Í•¹Ñ…Ñ¥½¸•á¥ÍÑ•°¹¼Ñ¡Õµ‰¹…¥°½±¥ÍĞ½İ¹•È¸()I•Á±…”Ù¥Í¥‰±”±…å•È‘É½Á‘½İ¸İ¥Ñ ½µÁ…ĞÑ½Àµ™¥ÉÍĞ±¥ÍĞ¥¸•á¥ÍÑ¥¹œÈÜÉÁà1P)‘½¬èØÑÁà½¹Ñ•¹ĞÑ¡Õµ‰¹…¥±Ì‘¥ÍÁ±…å•ĞÁÁà½Ù•È¡•­•É‰½…É°¹…µ”°Õ¹¥ÅÕ”ÇŠLÈµ±•ÑÑ•È)‰±•¹½‘”°½Á…¥Ñä”°Ù¥Í¥‰¥±¥ÑäÑ½±”°Í•±•Ñ•‰±Õ”É½Ü…¹¥µ…”½µ…Í¬±…‰•±Ì¸)Q…ÀÉ½ÜÑ¼Í•±•Ğì‰±•¹½½Á…¥Ñä½Á•¹Ì½É¥¥¹…°M•±•Ñ•±…å•ÈÍ•ÑÑ¥¹Ì‰•±½Ü±¥ÍĞ¸)=É¥¥¹…°¡¥‘‘•¸Í•±•Ğ½Ù¥Í¥‰¥±¥Ñä¹½‘•ÌÉ•µ…¥¸•Ù•¹ĞÑÉ…¹ÍÁ½ÉĞ™½È½É¥¥¹…°½İ¹•ÉÌ)…¹É•É•ÍÍ¥½¸½¹ÑÉ…ÑÌ°¹½Ğ‘ÕÁ±¥…Ñ”Ù¥Í¥‰±”½¹ÑÉ½±Ì¸€¬1…å•È¼¬%µ…”É•µ…¥¸)‰•Í¥‘”¡•…‘¥¹œì¥µ…”•‘¥Ğ½½¹Ù•ÉÍ¥½¸µ½Ù•Ì¥¹Ñ¼Í•±•Ñ•Í•ÑÑ¥¹Ì¸=É¥¥¹…°É•¹…µ”°)½Á…¥Ñä°‰±•¹°½É‘•È°‘•±•Ñ”°µ•É”°™±…ÑÑ•¸°µ…Í­Ì…¹¥µ…”…Ñ¥½¹ÌÉ•Ñ…¥¹•¸)	…Í”Ù¥Í¥‰¥±¥Ñä½‰±•¹½½Á…¥ÑäÍÑ…ä¥µµÕÑ…‰±”ìÍ…±…È¡…¹¹•±Ì¡¥‘”½±½ÕÈÍÑ…¬ì)<ÍÑ…¥¹œ‘¥Í…‰±•ÌÉ½Ü•‘¥ÑÌ¸9¼¹•ÜÁ…¥¹ĞÍ¡•µ„°‰Õ‘•ÑÌ°¡¥ÍÑ½Éä°½µÁ½Í¥Ñ½È½È)µ½‘•±±¥¹œ½İ¹•È¸±°½É¥¥¹…°ÁÉ½Ñ•Ñ••ÍÑÕÉ•Ì½5Õ±Ñ¤Ä¸À½™É½é•¸™¥±•ÌÉ•Ñ…¥¹•¸()ÍÉŒ½Á…¥¹Ğµ±…å•Èµ±¥ÍĞ¹©Ì¥ÌÁÉ•Í•¹Ñ…Ñ¥½¸½¹±äìÙ¥•İÁ½ÉĞÁ…¥¹Ñ•È•áÁ½Í•Ì½İ¹•Ñ¥¹ä)±…å•ÉQ¡Õµ‰¹…¥°Í¹…ÁÍ¡½ÑÌ½˜½µµ¥ÑÑ•É…Ü½±½ÕÈ½…±Á¡„°‰•™½É”±…å•È½Á…¥Ñä½‰±•¹¼)µ…Í¬¸É•„É•‘ÕÑ¥½¸¥¹±Õ‘•ÌÑ¡¥¸µ…É­Ì…¹…±Á¡„µİ•¥¡Ñ•I°™±¥ÁÌUYØÀµ™¥ÉÍĞ)É½İÌ™½ÈÑ½ÀµÕÀÁÉ•Ù¥•İÌ°…¡•Ì‰ä¥µµÕÑ…‰±”Á¥á•°¥‘•¹Ñ¥ÑäÕÍ¥¹œÍ•ÍÍ¥½¸]•…­5…À¸)9¼™Õ±°Ñ•áÑÕÉ”‰åÑ•Ì•áÁ½Í•Ñ¼=4ì¹¼Ñ¡Õµ‰¹…¥±ÌÍ•É¥…±¥é•½È¡¥ÍÑ½Éä•¹ÑÉ¥•Ì)™½È‰É½İÍ¥¹œ¸UÁ‘…Ñ•Ì…™Ñ•È½É¥¥¹…°A•¹¥°É•±•…Í”½…Ñ¥½¹Ì½¡¥ÍÑ½ÉäÉ•½Á•¸°±•…ÉÌ)½¸±½Í”¸…¹Ù…ÌÑ¡Õµ‰¹…¥±Ì…É”½¹Ñ•¹ĞÁÉ•Ù¥•İÌ°¹½Ğ™¥¹…°½µÁ½Í¥Ñ•Ì½Èµ…Í¬µ…ÁÌ¸()¥Ù”¹•ÜÑ•ÍÑÌ½Ù•È…±°ÈØÕ¹¥ÅÕ”‰±•¹½‘•Ì°…±Á¡„½Ñ¡¥¸½½É¥•¹Ñ…Ñ¥½¸½½İ¹•ÉÍ¡¥À°)…ÑÕ…°U$É½Ü½É‘•È½½¹Ñ•¹Ğ½µ…Í¬½É•¹…µ”½‰±•¹½½Á…¥Ñä°Ù¥Í¥‰¥±¥Ñä½¹”¡•­Á½¥¹Ğ°)U¹‘½I•‘¼½É•½Á•¸½M…Ù•=Á•¸°ÍÑÉ½­”…¹•°…¹Í…±…È½<½±½Í”Õ…É‘Ì¸=É¥¥¹…°äÀÔ¼äÀØ¼(äÈàÑ…É•Ñ•ÄåAML¸!•…‘±•ÍÌ¡É½µ¥Õ´É•¹‘•É¥¹œ½˜…ÑÕ…°µ…É­ÕÀ½ÍÑå±•Ì½±¥ÍĞµ½‘Õ±”)İ¥Ñ ™¥áÑÕÉ”µ•Ñ…‘…Ñ„Ù•É¥™¥•¹¼½Ù•É™±½Ü…ĞÈÜÉÁà‘½¬€¼ÄÀÈĞ…¹ÌäÀÙ¥•İÁ½ÉĞİ¥‘Ñ¡Ì°)Í•±•Ñ¥½¸Í•ÑÑ¥¹Ì½Ù¥Í¥‰¥±¥Ñä…¹ÍÉ••¹Í¡½Ğ¥¹ÍÁ•Ñ¥½¸ìÉ•…°Á…¥¹Ñ•È½¡¥ÍÑ½ÉäÑ•ÍÑ•)Ñ¡É½Õ ½É¥¥¹…°¥¹Ñ•É…Ñ¥½¸¡…É¹•ÍÌ°¹¼¥A……•ÁÑ…¹”¥¹™•ÉÉ•¸MÉ••¹Í¡½Ğ¥ÌE)™¥áÑÕÉ”½¹±äì½É¥¥¹…°…ÁÀ½Í•ÍÍ¥½¸±…å½ÕĞ½İ¹•ÉÌÕ¹¡…¹•¸Õ±°½ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜)™½±±½İÌ¸Y%äĞÜè±…å•ÈÑ…ÁÌ½ÍÑÉ½­•Ì½ÁÉ•Ù¥•İÌì‰±•¹½½Á…¥Ñä½Ù¥Í¥‰¥±¥Ñäì½É‘•É¥¹œ¼)¥µ…”­µ…Í¬Í•±•Ñ¥½¸ìU¹‘½I•‘¼½M…Ù•=Á•¸…¹±•™Ğ‘½¬ÍÉ½±±¥¹œ½½¹”½¸¥A…¸((´mátY%äĞØÕÍ•ÈAMLèÕ¹‘½…‰±”¹…Ñ¥Ù”A…¥¹Ğ½UXÉ•Í•Ğ…¹ÍÑ…±”‰¥¹‘¥¹œÉ•½Ù•ÉäÁÉ½Ñ•Ñ•¸(´ltY%äĞÜÙ¥ÍÕ…°ÍÑ…¬Ñ…ÁÌ½Ñ¡Õµ‰¹…¥°É•™É•Í ½Í•ÑÑ¥¹Ì½Ù¥Í¥‰¥±¥Ñä½½É‘•È½U¹‘½I•‘¼½M…Ù•=Á•¸…¹‘½¬ÍÉ½±°¸((¸äĞÜ™¥¹…°±½…°9½‘”ÈĞÉ•É•ÍÍ¥½¸è€¨¨È°ÜĞØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨€ ÄàÀ¸åÌ¤ì)½É¥¥¹…°ÈÜĞÄ…¹™¥Ù”¹•ÜÙ¥ÍÕ…°µ±¥ÍĞ¡•­ÌÉ•Ñ…¥¹•¸=É¥¥¹…°äÀÔ¼äÀØ¼äÈàÑ…É•Ñ•Ää)…¹É•Ù¥•İ•É•±•…Í”™¥Ù”Á…ÍÌ¸9¼½É¥¥¹…°…ÍÍ•ÉÑ¥½¸É•±…á•¸IÕ¹Ñ¥µ”ÁÕ‰±¥Í¡•)€ÜàääÈÑ”ÄåˆÄÁ•˜ÉˆàÄĞÀåÌĞÈäÁ”Í˜Õ‘àÉ˜Á€°•á…ĞÑ•ÍÑ•ÑÉ•”)‰ˆäİÅ”Õ™…ŒÌØİˆÁ˜ÔÉ™•ˆÀĞÁ˜ÈäÀÙ•ˆÌÌØÔÔÙ•€¸•Ñ¡•µ…¥¸µ…Ñ¡•Ñ¡…ĞÑÉ•”…¹)±½…°‰É…¹ …±¥¹•±•…¹±ä¸!½ÍÑ•É•É•ÍÍ¥½¸€¼A…•Ì€¼±¥Ù”µ™¥±”ÁÉ½½˜Ù•É¥™¥•‰•±½Ü¸((ŒŒ€¸äĞÜÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”ÜàääÈÑ”ÄåˆÄÁ•˜ÉˆàÄĞÀåÌĞÈäÁ”Í˜Õ‘àÉ˜À€¼Ñ•ÍÑ•ÑÉ•”)‰ˆäİÅ”Õ™…ŒÌØİˆÁ˜ÔÉ™•ˆÀĞÁ˜ÈäÀÙ•ˆÌÌØÔÔÙ”ÁÕ‰±¥Í¡•…¹™•Ñ¡•µ…¥¸µ…Ñ¡••á…Ñ±ä¸)1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌääÀÌÄØàĞÔÌ½©½ˆÄÈÀÈĞäÀØÔàÜà‰½Ñ Á…ÍÌ(¨¨ÈÜĞØÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì™Õ±°¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•¸=É¥¥¹…°)¡•­ÌÉ•Ñ…¥¹•¸A…•ÌÌääÀÌÄØÜäÈÌ‰Õ¥±ÄÈÀÈĞäÀØÜàÔĞ½‘•Á±½äÄÈÀÈĞäÈÀäÜÈÜMUML¸)±°ÈÀ¡•­•±¥Ù”Í¡•±°½Ù•ÉÍ¥½¸°±…å•Èµ±¥ÍĞ½Á…¥¹Ñ•È½É•½Ù•Éä°É•Ñ…¥¹•±…å•È½‰±•¹¼)Á…¥¹Ğ½ÁÉ½©•Ğ½•áÁ½ÉĞ½<½UX½É•Í•Ğ½µ…¥¸½5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•)Í½ÕÉ”¸I•Ù•ÉÍ”±½…‘•È­•åÌäĞÜÉ•Ù¥•İ•ì¹¼Ñ•ÍÑ•ÉÕ¹Ñ¥µ”¡…¹•Ì…™Ñ•ÈÙ…±¥‘…Ñ¥½¸¸)Q¡¥ÌÁÉ½½˜ÕÁ‘…Ñ•Ì½¹Ñ¥¹Õ¥Ñä‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸()	Õ¥±äĞÜÉ•…‘ä™½È¥A…Ñ•ÍÑ¥¹œè½Á•¸A…¥¹Ğİ¥Ñ Ñİ¼½Èµ½É”±…å•ÉÌ°Ñ…ÀÉ½İÌ…¹)Á…¥¹Ğ‘¥ÍÑ¥¹Ğµ…É­ÌìÁÉ•Ù¥•İÌÕÁ‘…Ñ”½¸A•¹¥°±¥™Ğ¸	±•¹½‘”€¼½Á…¥Ñä”½Á•¹Ì)Í•±•Ñ•Í•ÑÑ¥¹Ìì•‘¥ĞÑ¡•´…¹¡•¬É½Ü½µ•Í ¸Y¥Í¥‰¥±¥Ñä¡•¬Ñ½±•ÌÍ•±•Ñ•)É½Üİ¥Ñ ½¹”½É¥¥¹…°U¹‘¼ì	…Í”¥µµÕÑ…‰±”¸¡•¬¥µ…”½µ…Í¬É½İÌ°É•½É‘•ÈUÀ½½İ¸°)U¹‘½I•‘¼½M…Ù•=Á•¸…¹‰½Õ¹‘•±•™Ğ‘½¬ÍÉ½±±¥¹œ½½¹”¸•Ù¥”äĞÜA9%9ìäĞØÕÍ•È)AMLÁÉ½Ñ•Ñ•¸•¹•É…°…Ñ±…ÌÕ¹İÉ…ÀÉ•µ…¥¹Ì‘•™•ÉÉ•‰•¡¥¹ÕÉÉ•¹ĞU$É•ÅÕ•ÍĞ¸(((ŒŒ€¸äĞàƒŠP½µµ¥ÑÑ•½±½ÕÈ±¥¡Ñ¥¹œì€¸äĞÜÕÍ•ÈAMLƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈÉ•Á½ÉÑÌ€¸äĞÜAMLèÁÉ½Ñ•ĞÙ¥ÍÕ…°±…å•ÈÍ•±•Ñ¥½¸½Ñ¡Õµ‰¹…¥±Ì°‰±•¹½½Á…¥Ñä¼)Ù¥Í¥‰¥±¥Ñä°¡¥ÍÑ½Éä½Á•ÉÍ¥ÍÑ•¹”…¹‰½Õ¹‘•1P‘½¬¸½¹Ñ¥¹Õ”É•ÅÕ•ÍÑ•É•Á…¥Èè)½±½ÕÈµ½¹±äUXÁ…¥¹Ğ½¥µ…”½<½µÁ½Í¥Ñ•ÌµÕÍĞÉ•©½¥¸Í•¹”±¥¡Ñ¥¹œ…™Ñ•ÈA…¥¹Ğ½¹”¸)Õ‘¥Ğµ…¥¸Äİ‰”ĞÌàè½É¥¥¹…°É•…Ñ•½µµ¥ÑÑ•‘A…¥¹ÑMÕÉ™…”½¹±äÍ•±•Ñ•MÑ…¹‘…É™½È)Ù…±¥É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌì½±½ÕÈµ½¹±ä¥¹Ñ•¹Ñ¥½¹…±±äÍÑ…å•	…Í¥Œ¸MÑÕ‘¥¼Í¡…‘½Ü™±…Ì)İ•É”ÅÕ•Õ•…™Ñ•Èµ…Ñ•É¥…°É•…Ñ¥½¸…¹½Õ±‰”½Á¥•Ñ½¼•…É±ä¸9¼µ¥ÍÍ¥¹œ±¥¡Ğ°)¹•ÜÉ•¹‘•É¥¹œ•¹¥¹”½ÈÍ•½¹µ…Ñ•É¥…°½İ¹•È¥ÌÉ•ÅÕ¥É•™½ÈÑ¡¥ÌÍÁ•¥™¥Œ‘•™•Ğ¸()=É¥¥¹…°½µµ¥ÑÑ•ÍÕÉ™…”¹½Ü…±İ…åÌ…±±Ì¥ÑÌ•á¥ÍÑ¥¹œMÑ…¹‘…Éµ…Ñ•É¥…°Á…Ñ ™½È)Ù…±¥¡…¹¹•±Ì¸½±½ÕÈÉ•µ…¥¹Ì•á…ĞÍI…±‰•‘¼°İ¡¥Ñ”™…Ñ½È°‘•™…Õ±ĞÉ½Õ¡¹•ÍÌÄ€¼)µ•Ñ…±¹•ÍÌÀì¹¼Í…±…Èµ…ÁÌ½É•Í½ÕÉ•Ì¥¹Ù•¹Ñ•¸MÑ…±”Í…±…È¥Ì½µ¥ÑÑ•ìÍÑ…±”½±½ÕÈ)ÍÑ¥±°É•™ÕÍ•Ì¸M…µ”½É¥¥¹…°•½µ•ÑÉä½UX½±¥™•Ñ¥µ”…¹…Íå¹Œ¥‘•¹Ñ¥ÑäÕ…É‘Ì¸MÑÕ‘¥¼)Í•ÑÌ½É¥¥¹…°‰½‘ä…ÍĞ½É••¥Ù”™±…ÌÍå¹¡É½¹½ÕÍ±ä‰•™½É”…Íå¹ŒÍÕÉ™…”É•…Ñ¥½¸°)Í¼‰½Ñ …Ñ¥Ù”…¹¥¹…Ñ¥Ù”½±½­•Á…¥¹ĞÉ•Á±…•µ•¹ÑÌ¥¹¡•É¥ĞÍ¡…‘½İÌÉ•…É‘±•ÍÌ½˜)‘¥•ÍĞ½™É…µ”½É‘•È¸á¥ÍÑ¥¹œMÑÕ‘¥¼±¥¡ÑÌ½É¥œ½™±½½È…¹É•™±•Ñ¥½¸Á½½°Õ¹¡…¹•¸)A…¥¹Ğ¡…¹¹•°É•µ…¥¹Ì¥¹Ñ•¹Ñ¥½¹…±±äÕ¹±¥Ğİ¡¥±”•‘¥Ñ¥¹œìA…¥¹Ğ1¥ĞÁÉ•Ù¥•ÜÕ¹¡…¹•¸)á¥ÍÑ¥¹œÍ…Ù•½±½ÕÈÁÉ½©•ÑÌ…¥¸±¥Ğ‘¥ÍÁ±…ä½¸É•½Á•¸½É•‰Õ¥±İ¥Ñ¡½ÕĞµ¥É…Ñ¥½¸°)É•Í½ÕÉ”½¡¥ÍÑ½Éä½Á¥á•°½•áÁ½ÉĞ¡…¹•Ì¸9¼¹•Ü<‰…­”°•¹•É…°…Ñ±…ÌÕ¹İÉ…À½È±…¥´)Ñ¡…ĞÑ¡”½±‘•ÈÍµ½½Ñ µµ•Ñ…°É•™±•Ñ¥½¸É•Á½ÉĞ¥ÌÉ•Í½±Ù•‰äÑ¡¥Ì½±½ÕÈµ½¹±ä™¥à¸()½ÕÈ¹•Ü¥¹Ñ•É…Ñ¥½¹Ì½Ù•ÈÔÄÈ¼ÄÀÈĞ•á…Ğ½İ¹•ÍIÁ¥á•±Ì½UYÌ½Í¡…‘½Ü™±…Ì½‘¥ÍÁ½Í…°°)½É¥¥¹…°MÑÕ‘¥¼…Ñ¥Ù”­¥¹…Ñ¥Ù”½±½­•Á…Ñ 	=IÅÕ•Õ•É•™É•Í °É•‰Õ¥±½‘¥…¹½ÍÑ¥Œ)±•…¹ÕÀ°…ÑÕ…°A…¥¹Ğ¡…¹¹•³ŠI½¹—ŠI±¥Ğ…¹•á…ĞM…Ù”½=Á•¸İ¥Ñ¡½ÕĞ•áÑÉ„¡¥ÍÑ½Éä°)ÍÑ…±”½É•Á±…•½‰½‘äµ±½ÍÌÍÕÁÁÉ•ÍÍ¥½¸¸=É¥¥¹…°äÈÀ¼äÈÌ½±½ÕÈµ½¹±ä	…Í¥Œ…ÍÍ•ÉÑ¥½¹Ì¹½Ü)É•ÅÕ¥É”É•ÅÕ•ÍÑ•MÑ…¹‘…É™…±±‰…¬İ¡¥±”É•Ñ…¥¹¥¹œ•á…ĞÁ¥á•±Ì…¹…‰Í•¹ĞÍÑ…±”)Í…±…Èµ…Àì±¥Ù”¡…¹¹•°•áÁ•Ñ…Ñ¥½¹ÌÉ•µ…¥¸	…Í¥Œ¸=É¥¥¹…°äÀĞ¼äÀä½µµ¥ÑÑ•‘¥ÍÁ±…ä)¡•­ÌÉ•Ñ…¥¸•á…ĞÁ¥á•°•ÅÕ…±¥Ñä…¹¹½ÜÉ•ÅÕ¥É”ÁÉ¥Ù…Ñ”±¥ĞÑ•áÑÕÉ”½İ¹•ÉÍ¡¥À°…Ì)…±É•…‘äÕÍ•™½ÈÍ…±…Èµ±¥ĞÍÕÉ™…•Ì¸9•Ü­¹•…É‰äÁ…¥¹Ğ½±…å•ÉÌ½Í…±…È¼)É•™±•Ñ¥½¸½É•±•…Í”ÌÁAML¸Õ±°É•É•ÍÍ¥½¸½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½İÌ¸()I•Ù¥•İ••¹Ñ¥É”ÍÕÉ™…—ŠIÁ…¥¹Ñ•È½É•¹‘•È½•áÁ½ÉÓŠI1…ˆÉ•Ù•ÉÍ”±½…‘•ÈÉ…Á äĞà…¹Í¡•±°¼)É•½Ù•Éä­•åÌìÁ…É•¹Ğ½•áÁ½ÉĞ•‘¥ÑÌ…É”…¡”Á¥¹Ì½¹±ä¸5…¥¸äÌÀ½…”½5Õ±Ñ¤Ä¸À½™É½é•¸°)‰ÉÕÍ¡•Ì½¡¥ÍÑ½Éä½ÁÉ½©•Ğ½•áÁ½ÉĞ…±½É¥Ñ¡µÌÕ¹¡…¹•¸ÑÕ…°AT½¥A…Í¡…‘½İÌ…¹)…ÁÁ•…É…¹”É•µ…¥¸Y%äĞà…Ñ”°¹½Ğ•ÍÑ…‰±¥Í¡•‰ä9½‘”µ…Ñ•É¥…°½Ñ•áÑÕÉ”Ñ•ÍÑÌ¸()Y%äĞàèÁ…¥¹Ğ„UXÕ‰”¥¸½±½ÕÈ½¹±ä°½¹—ŠIMÑÕ‘¥¼°½É‰¥Ğ™½ÈÍ¡…‘•™…•Ìì…‘)…¹½Ñ¡•Èµ•Í …¹Íİ¥Ñ Í•±•Ñ¥½¸°Í¡…‘½İÌ½±¥¡Ñ¥¹œÉ•µ…¥¸½¸‰½Ñ ¸I•½Á•¸•á¥ÍÑ¥¹œ)Á…¥¹Ñ•€¹‰½á±…ˆì½µÁ…É”±¥Ğ‘¥ÍÁ±…ä…¹Á…¥¹ĞÕ¹¡…¹•¸A…¥¹Ğ¡…¹¹•°É•µ…¥¹Ì™±…Ğì)1¥ĞÁÉ•Ù¥•Ü½½¹”É•ÍÑ½É”Í•¹”Í¡…‘¥¹œ¸U¹‘½I•‘¼É•µ…¥¹Ì¥¸A…¥¹Ğì€¸äĞÜ±…å•È±¥ÍĞ)É•µ…¥¹Ì…•ÁÑ•¸9•áĞ¹…ÉÉ½Üİ½É¬™½±±½İÌäĞà‘•Ù¥”™••‘‰…¬ì­••À¥¹‘•Á•¹‘•¹Ğ)…±Á¡„äÈä½É•™±•Ñ¥½¸…Ñ•Ì…¹•¹•É…°…Ñ±…ÌÕ¹İÉ…ÀÉ•ÅÕ•ÍĞÙ¥Í¥‰±”¸((´mátY%äĞÜÕÍ•ÈAMLèÙ¥ÍÕ…°±…å•ÈÍÑ…¬½Ñ¡Õµ‰¹…¥±Ì½Í•ÑÑ¥¹Ì½Ù¥Í¥‰¥±¥Ñä½¡¥ÍÑ½Éä½Á•ÉÍ¥ÍÑ•¹”…¹‘½¬ÍÉ½±±¥¹œÁÉ½Ñ•Ñ•¸(´ltY%äĞàè½±½ÕÈµ½¹±äÁ…¥¹Ğ…™Ñ•È½¹”¥ÌÍ•¹”µ±¥Ğ¥¸MÑÕ‘¥¼ì…Ñ¥Ù”½¥¹…Ñ¥Ù”½‰©•ÑÌ…ÍĞ½É••¥Ù”Í¡…‘½İÌ°M…Ù”½=Á•¸É•Ñ…¥¹Ì½±½ÕÈ°¡…¹¹•°•‘¥Ñ¥¹œ½U¹‘½I•‘¼½±…å•È±¥ÍĞÕ¹¡…¹•¸(((¸äĞà™¥¹…°±½…°9½‘”ÈĞ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÔÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( äÜ¸İÌ¤¸½ÕÈ¹•Ü¡•­ÌÁ±ÕÌ½É¥¥¹…°ÈÜĞØÉ•Ñ…¥¹•ìÑ…É•Ñ•Á…¥¹Ğ½µ…Ñ•É¥…°½±…å•È¼)‘ÕÁ±¥…Ñ”½ÁÉ½©•Ğ½É•±•…Í”ÔÁAML¸MÕÁ•ÉÍ•‘•Õ¹±¥Ğ½Í¡…É¥¹œ•áÁ•Ñ…Ñ¥½¹Ì¥¸äÈÀ¼äÈÌ…¹(äÀĞ¼äÀäİ•É”ÕÁ‘…Ñ•Ñ¼É•ÅÕ•ÍÑ•±¥Ğ½ÁÉ¥Ù…Ñ”µÑ•áÑÕÉ”‰•¡…Ù¥½Èì•á…ĞÁ¥á•°°ÍÑ…±”)¡…¹¹•°°‘ÕÁ±¥…Ñ”¥Í½±…Ñ¥½¸…¹Á•ÉÍ¥ÍÑ•¹”…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸%¹¥Ñ¥…°•áÁ±½É…Ñ½Éä)™Õ±°ÉÕ¸¡¥ĞÑ¡½Í”½±•áÁ•Ñ…Ñ¥½¹ÌìÑ¡¥Ì%90½µÁ±•Ñ”ÉÕ¸±½Í•Ì…±°É•É•ÍÍ¥½¹Ì¸)I•Ù¥•İ•±½…‘•È±½ÍÕÉ”äĞàìµ…¥¸äÌÀ½…”½5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸!½ÍÑ•É•É•ÍÍ¥½¸°)A…•Ì…¹Á½ÍÑ‘•Á±½åµ•¹Ğ±¥Ù”µ™¥±”Ù•É¥™¥…Ñ¥½¸™½±±½Ü¸•Ù¥”äĞà±¥¡Ñ¥¹œÁ•¹‘¥¹œ¸(((ŒŒ€¸äĞàÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”„ÈĞÔÍ„ÙˆÅˆÄÉĞå„ÌÄÁ˜äåÈàÄÈÀäØÈÑ˜Ñ”ĞÁ„ØÅ€°•á…ĞÑ•ÍÑ•ÑÉ•”)€Ù˜äÌİŒåŒÍŒÈÔàÀÉ™„ÔİŒÑ„àÍˆÕ‰˜Ù˜ĞÈäÁˆÌÉ€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•)¥Ğ…Ñ„ÕÁ±½…‘•ÈÈ•á…Ğ‰±½‰Ì…¹É•…Ñ•Ñ¡”¥‘•¹Ñ¥…°±½…°ÑÉ•”¸•Ñ¡•µ…¥¸)µ…Ñ¡•°±½…°‰É…¹ …±¥¹•±•…¹±ä¸1½…°9½‘”ÈĞ™Õ±°É•É•ÍÍ¥½¸…¹¡½ÍÑ•)9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌääÌĞäÌÄĞäÜ½©½ˆÄÈÀÌÔÈÀÌäĞÈà‰½Ñ Á…ÍÌ€¨¨ÈÜÔÀÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼(ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•€ ÈĞä¸åÌ¤¸A…•ÌÌääÌĞäÌÀÜÌÜ‰Õ¥±(ÄÈÀÌÔÈÀĞÈÀÔä½‘•Á±½äÄÈÀÌÔÈÈÌÔÈØĞÍÕ••‘•¸±°Ää¡•­•Á½ÍÑ‘•Á±½åµ•¹Ğ™¥±•Ì(¡Í¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”¡…¹•ÉÕ¹Ñ¥µ”½1…ˆÉ…Á °É•½Ù•Éä°É•Ñ…¥¹•äĞÜ±…å•È±¥ÍĞ°)µ…¥¸äÌÀ½…”½5Õ±Ñ¤Ä¸À…¹™É½é•¹	•Ñ„Üµ…É­•È¤‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸I•Ù¥•İ•Á¥¹Ìì)¹¼ÁÉ½Ñ•Ñ•½™É½é•¸¡…¹•Ì¸Q¡¥ÌÁÉ½½˜ÕÁ‘…Ñ•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±ä…¹­••ÁÌ)Ñ•ÍÑ•½ÁÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”‰åÑ•ÌÕ¹¡…¹•¸UÍ•ÈäĞİAML¥ÌÁÉ½Ñ•Ñ•°¹½Ğ¥¹™•ÉÉ•äĞà¸()	Õ¥±äĞà½µÁ±•Ñ”…¹É•…‘ä™½È‘•Ù¥”Ñ•ÍÑ¥¹œè½±½ÕÈµ½¹±äÁ…¥¹Ñ•UXÕ‰”ƒŠH½¹”ƒŠH)Y%\MÑÕ‘¥¼°½É‰¥Ğ™½ÈÍ¡…‘•™…•Ì…¹Í•¹”Í¡…‘½İÌ¸‘…¹½Ñ¡•Èµ•Í ½Íİ¥Ñ …Ñ¥Ù”)Í•±•Ñ¥½¸ìÁ…¥¹Ñ•¥¹…Ñ¥Ù”½‰©•ÑÌÉ•µ…¥¸Í•¹”µ±¥Ğ¸I•½Á•¸•á¥ÍÑ¥¹œÁ…¥¹Ñ•¹‰½á±…ˆ°)½¹™¥É´…ÁÁ•…É…¹”…¹½É¥¥¹…°½±½ÕÈìÉ•½Á•¸A…¥¹Ğ™½È¡…¹¹•°¡Õ¹±¥Ğ¤½1¥Ğ…¹É•Ñ…¥¹•(äĞÜ±…å•È±¥ÍĞ°U¹‘½I•‘¼½½¹Ñ¥¹Õ”Á…¥¹Ñ¥¹œ¸MÑ…¹‘…Éµ…Ñ•É¥…°½Í¡…‘½Ü¥¹¡•É¥Ñ…¹”…¹)•á…Ğ‰åÑ•ÌÙ•É¥™¥•…ÕÑ½µ…Ñ¥…±±äìÉ•…°AT½¥A…Í¡…‘½Ü½…ÁÁ•…É…¹”…•ÁÑ…¹”Á•¹‘¥¹œ¸)=±‘•ÈÍµ½½Ñ µµ•Ñ…°É•™±•Ñ¥½¸…¹…±Á¡„äÈä…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ğì•¹•É…°…Ñ±…Ì)Õ¹İÉ…ÀÉ•µ…¥¹Ì™ÕÑÕÉ”İ½É¬€¡A…¬…±°…ÉÉ…¹•Ì•á¥ÍÑ¥¹œ¥Í±…¹‘Ì¤¸9¼¹•Ü±¥¡Ğ½‰ÉÕÍ ¼)¡¥ÍÑ½Éä½ÁÉ½©•Ğ½•áÁ½ÉĞ½µ½‘•±±¥¹œ½İ¹•È½ÈÍ½ÕÉ”Á¥á•°½Í¡•µ„¡…¹•Ì¸(((ŒŒ€¸äĞäƒŠP‰½Õ¹‘•…”…Ñ±…ÌUYÌì€¸äĞàÕÍ•ÈAMLƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈAIPAMLäĞàÁÉ½Ñ•ÑÌ½µµ¥ÑÑ•½±½ÕÈµ½¹±äÍ•¹”±¥¡Ñ¥¹œ½MÑÕ‘¥¼Í¡…‘½İÌ°)…Ñ¥Ù”½¥¹…Ñ¥Ù”…ÁÁ•…É…¹”°•á¥ÍÑ¥¹œÁ…¥¹Ğ½±…å•ÉÌ½¡¥ÍÑ½Éä½Á•ÉÍ¥ÍÑ•¹”…¹¡…¹¹•°½1¥Ğ¸)9•áĞ…Õ‘¥Ñ•‘•™•ÉÉ•…Ñ±…ÌÉ•ÅÕ•ÍĞ¸5…¥¸”Õ‰˜ĞÑˆÌ¡…Ì	½à½A±…¹…È½å±¥¹‘•È½MÁ¡•É”½Q½ÉÕÌ°)‘•¹Í¥Ñä•ÅÕ…±¥é…Ñ¥½¸…¹A…¬…±°°‰ÕĞ¹¼©½¥¹•µ¡…ÉĞ½•¹•É…°…Ñ±…ÌÍ½±Ù•È¸á…Ñ±…Ì)¥Ì½¹±ä…¸Õ¹ÕÍ•Á…Ñ¡ÑÉ…”‘•Á•¹‘•¹äUI0¸9¼¹•Ü•áÑ•É¹…°±¥‰É…Éä½­•É¹•°¥µÁ½ÉÑ•¸()=‰©•ĞƒŠHUXƒŠH…”…Ñ±…Ì¹½ÜÍÑ…•Ì=I%%90	½à‘¥É•Ñ¥½¹…°Á•Èµ™…”ÁÉ½©•Ñ¥½¸°)=I%%90‘•¹Í¥Ñå1…å½ÕĞİ¥Ñ •áÁ±¥¥Ğ½¹”µ¥Í±…¹µÁ•ÈµÁ½±å½¸µ•µ‰•ÉÍ¡¥À°Ñ¡•¸=I%%90)Á…­•‘1…å½ÕĞ¸=¹±ä™¥¹…°½É¹•ÉÌ½µµ¥ĞÑ¡É½Õ ½µµ¥Ñ9…Ñ¥Ù•UXè½¹”¹…Ñ¥Ù”¡•­Á½¥¹Ğ°)É•…µ½¹±ä½±½Á••ÈÁ…å±½…‘Ì°¹¼Í½ÕÉ”•½µ•ÑÉä½™…”µÉ½ÕÀ¡…¹•Ì¸I•Á•…Ğ¥Ì…¸•á…Ğ)¹¼µ½À¸=É¥¥¹…°ÁÉ½©•Ñ¥½¹Ì½A…¬½‘•¹Í¥Ñäµ…Ñ …¹‘…ÕÑ½µ…Ñ¥Œ¡½¥•ÌÕ¹¡…¹•¸()Q¡¥Ì¥Ì„%IMP‰½Õ¹‘•™…”…Ñ±…ÌèÇŠLÄÈàÁ±…¹…ÈÁ½±å½¹Ì³Š&ÈÁ,½É¹•ÉÌ°½¹”¥Í±…¹Á•È)™…”°½µµ½¸…Ù•É…”İ½É±µ…É•„‘•¹Í¥Ñä°•á¥ÍÑ¥¹œ€¸ÀÈÑ¥±”µ…É¥¹Ì½…ÁÌ½É¥Á…­¥¹œ¸)%ĞÕÑÌ•Ù•Éä™…”‰½Õ¹‘…Éäì¥Ğ‘½•Ì9=P©½¥¸¡…ÉÑÌ°½ÁÑ¥µ¥é”Á…­¥¹œ°…ÕÑ¡½ÈÍ•…µÌ°)½È¥µÁ±•µ•¹Ğá…Ñ±…Ì½•¹•É…°ÕÉÙ•Õ¹İÉ…À¸½µ¥¹…¹ĞµÁ±…¹”ÁÉ½©•Ñ¥½¸É•Ñ…¥¹Ì¥ÑÌ)•á¥ÍÑ¥¹œ…¹Õ±…È‘¥ÍÑ½ÉÑ¥½¸ì•ÅÕ…°‘•¹Í¥Ñä™¥á•Ì…Ù•É…”…É•„°¹½Ğ…¹±”‘¥ÍÑ½ÉÑ¥½¸¸)%¹Ù…±¥½¹½¹Á±…¹…È½‘••¹•É…Ñ”½½Ù•Èµ±¥µ¥Ğ…¹¥µÁ½ÉÑ•½ÁÉ½•‘ÕÉ…°½µ½‘¥™¥•ÈÑ…É•ÑÌÉ•™ÕÍ”¸)Q¡¥ÌÍ½Á”¥ÌÙ¥Í¥‰±”‰•Í¥‘”Ñ¡”‰ÕÑÑ½¸°¹½Ğ¡¥‘‘•¸‰•¡¥¹„•¹•É¥ŒU¹İÉ…À±…¥´¸()¹ä½±½ÕÈ½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌÁ…¥¹ĞÉ•™ÕÍ•Ì	=IÍÑ…¥¹œ½¡¥ÍÑ½ÉäìU$‘¥Í…‰±•Ì…”)…Ñ±…Ìİ¥Ñ Á…¥¹ĞÁÉ•Í•¹Ğ…¹Á½¥¹ÑÌÑ¼•áÁ±¥¥Ğ•á¥ÍÑ¥¹œ±•…ÈÁ…¥¹Ğ€¼±•…ÈÁ…¥¹Ğ€¬)UYÌ¸9¼Í¥±•¹ĞÁ…¥¹Ğ‘¥Í…É°É•Í…µÁ±¥¹œ½ÈÍÑ…±”µÉ•Í½ÕÉ”É•‰¥¹¸á¥ÍÑ¥¹œÍÑ…±”¹…Ñ¥Ù”)UYÌ…¸‰”É•Á±…•…™Ñ•È±•…É¥¹œÁ…¥¹Ğ¸U¹‘¼É•ÍÑ½É•Ì½±UYÌìÁ…¥¹ĞÉ•Í•ĞÉ•µ…¥¹Ì„)Í•Á…É…Ñ”Õ¹‘½…‰±”ÕÍ•È…Ñ¥½¸¸9…Ñ¥Ù”½‘•Œ°½É¥¥¹…°A…¥¹Ğ½1¥Ğ½M…Ù•=Á•¸½9=4½1½İ¹•ÉÌ)¡…¹‘±”Õ¹¡…¹•Ù•ÉÍ¥½¸ÄÍ½ÕÉ”é‰½á±…ˆ™…”µ½É¹•ÈÁ…å±½…¸9¼Í¡•µ„½İÉ¥Ñ•È½¡¥ÍÑ½Éä)½Èµ½‘•±±¥¹œ­•É¹•°…‘‘•ì¹¼…ÕÑ½µ…Ñ¥Œ…Ñ±…Ì½¸‘°¹¼¹•ÜUXÁ½¥¹Ñ•È½U$½İ¹•È¸()M¥à¹•Ü¥¹Ñ•É…Ñ¥½¹Ì½Ù•È½¹…Ù”½Ñ¥±Ñ•½‘¥Í½¹¹•Ñ•½ÍÕ‰‘¥Ù¥‘•Á±…¹…È™…•Ì°)¹½¸µ½Ù•É±…ÁÁ¥¹œÍ•Á…É…Ñ”‰½Õ¹‘Ì½•ÅÕ…°…Ù•É…”‘•¹Í¥Ñä½•á…Ğ•½µ•ÑÉä°ÄÈàµ™…”±¥µ¥Ğ¼)Í…±”½É•™ÕÍ…±Ì°É•…°½É¥¥¹…°U¹‘½I•‘¼½¥‘•µÁ½Ñ•¹”½Á••È=\°•áÁ±¥¥ĞÁ…¥¹ĞÉ•™ÕÍ…°¼)±•…È½É•Á…¥¹Ğ°½İ¹•È½¡¥ÍÑ½Éä…Ñ½µ¥ŒÉ•™ÕÍ…°°•á…Ğ¹…Ñ¥Ù”ÁÉ½©•Ğ½9=4½1UYÌ…¹)…ÑÕ…°UXÁ…¹•°Ñ…É•Ğ½½¹Ñ•áĞ…±±‰…¬¸9•Ü­	½à½A…¬½‘•¹Í¥Ñä½É•Í•Ğ½É•±•…Í”ÌÁAMLì)¹¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¸¡…¹•¸Õ±°É•É•ÍÍ¥½¸½ÁÕ‰±¥…Ñ¥½¸™½±±½İÌì¥A…äĞäÁ•¹‘¥¹œ¸()MÕÉ™…”…Õ‘¥Ğ™½Õ¹1…ˆÍ…µÁ±•Ìœ½±äÄĞUX¥µÁ½ÉĞ…‰Í•¹Ğ™É½´Ñ¡”É•Ù¥•İ•…¡”)µ…¹¥™•ÍĞ¸‘‘•Ñ¡…ĞI0‘•Á•¹‘•¹ä…¹É•™É•Í¡•¥ÑÌÍ…µÁ±•ÏŠI1…‹ŠI¥¹‘•à…¹•ÍÑ½ÉÌ°)…±½¹Í¥‘”½É¥¥¹…°5•Í¡!•…±Ñ ½‘½5Õ±Ñ¤UX¥µÁ½ÉĞÉ…Á äĞä…¹Í¡•±°½É•½Ù•Éä­•åÌ¸)=¹±äUXµ…ÁÁ•È€¬5•Í¡!•…±Ñ ™Õ¹Ñ¥½¹…±¥Ñä¡…¹•Ìì½Ñ¡•ÈÍ½ÕÉ”¡…¹•Ì…É”Á¥¹Ì¸)5…¥¸äÌÀ½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À½™É½é•¸¼äĞá±¥¡Ñ¥¹œ½Á…¥¹Ğ½•áÁ½ÉĞ…±½É¥Ñ¡µÌÕ¹¡…¹•¸()Y%äĞäèÁ±…¥¸Õ‰”½ÈÍµ…±°Á±…¹…Èµ™…••áÑÉÕ‘•µ•Í ƒŠH=‰©•ĞƒŠHUXƒŠH…”…Ñ±…Ì+ŠH=Á•¸UX‘¥Ñ½ÈèÍ•Á…É…Ñ”™…”¥Í±…¹‘Ì¥¹Í¥‘”Ñ¥±”¸U¹‘½I•‘¼É•ÍÑ½É•Ì½É•…ÁÁ±¥•ÌUYÌì)A…¥¹Ğ½½¹”É•Ñ…¥¹Ì…•ÁÑ•äĞà±¥ĞÍ•¹”¸á¥ÍÑ¥¹œÁ…¥¹Ğè•áÁ±¥¥Ñ±ä±•…ÈÁ…¥¹Ğ™¥ÉÍĞ°)Ñ¡•¸…”…Ñ±…Ì½É•Á…¥¹Ğ¸M…Ù•=Á•¸…¹½ÁÑ¥½¹…°9=5É•Ñ…¥¸¹•ÜUYÌ½Á…¥¹Ğ¸ÄÈàÁ±…¹…È)™…•Ìµ…á¥µÕ´ì¹½¹Á±…¹…È™…•ÌÉ•ÅÕ¥É”½Ñ¡•ÈÁÉ½©•Ñ¥½¸½È™ÕÑÕÉ”¡…ÉĞÕ¹İÉ…À¸)9•áĞèäĞä‘•Ù¥”™••‘‰…¬°Ñ¡•¸Í½Á•…Ñ±…Ì½¡…ÉĞ¥µÁÉ½Ù•µ•¹ÑÌ½È‘”Í•…´…ÕÑ¡½É¥¹œ)…Õ‘¥Ğ¸•¹•É…°©½¥¹•µ¡…ÉĞÕ¹İÉ…ÀÉ•µ…¥¹ÌÅÕ•Õ•ì¹¼…ÕÑ½µ…Ñ¥Œ­•É¹•°É•Á±…•µ•¹Ğ¸((´mátY%äĞàÕÍ•ÈAIPAMLè½µµ¥ÑÑ•½±½ÕÈµ½¹±ä±¥¡Ñ¥¹œ½MÑÕ‘¥¼Í¡…‘½İÌ…¹ÁÉ¥½ÈÁ…¥¹Ğ½¡¥ÍÑ½Éä½Á•ÉÍ¥ÍÑ•¹”ÁÉ½Ñ•Ñ•¸(´ltY%äĞäè…”…Ñ±…Ì½¸Íµ…±°Á±…¹…Èµ•Í °‘¥Ñ½È¥Í±…¹‘Ì°U¹‘½I•‘¼°•áÁ±¥¥Ğ±•…È½É•Á…¥¹Ğ°M…Ù•=Á•¸…¹É•Ñ…¥¹•äĞà±¥Ğ…ÁÁ•…É…¹”¸(((¸äĞä™¥¹…°±½…°9½‘”ÈĞ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜÔØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( ÄÀÄ¸İÌ¤°É•Ñ…¥¹¥¹œ•Ù•Éä½É¥¥¹…°ÈÜÔÀ¡•¬Á±ÕÌÍ¥à¹•Ü…”…Ñ±…Ì¥¹Ñ•É…Ñ¥½¹Ì¸)9•Ü­¹•…É‰ä	½à½A…¬½‘•¹Í¥Ñä½É•Í•Ğ½É•±•…Í”ÌÁAML¸9¼•á¥ÍÑ¥¹œ‰•¡…Ù¥½È…ÍÍ•ÉÑ¥½¸¡…¹•)½ÈÉ•µ½Ù•¸I•Ù¥•İ•UX½‘½5Õ±Ñ¤½1…ˆÉ•Ù•ÉÍ”Á¥¹ÌäĞä¥¹±Õ‘¥¹œ¹•İ±äÉ•½É‘•1…ˆ)Í…µÁ±”¥µÁ½ÉĞìµ…¥¸äÌÀ½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À½™É½é•¸¼äĞá±¥¡Ñ¥¹œÕ¹¡…¹•¸!½ÍÑ•)É•É•ÍÍ¥½¸½A…•Ì½±¥Ù”ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½İÌ¸Y%äĞäÉ•µ…¥¹ÌÁ•¹‘¥¹œ¸(((ŒŒ€¸äĞäÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÌĞÉ˜ÀÕˆÑ„ÍˆÈàÈÈĞØİÀÈÕ‘ŒÄäÀÀÁ˜ÌÈàÄĞÌĞĞäÉ€°•á…ĞÑ•ÍÑ•ÑÉ•”)€Ôİ™ĞÁ˜ĞÔÍŒÄÔÌØÍŒØÀÜØäÁ™…ˆÑŒÙ”ÈÙ‘”ÔÌá…ˆÅ€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•)¥Ğ…Ñ„ÕÁ±½…‘•ÄÔ•á…Ğ‰±½‰Ì½ÑÉ•”ì™•Ñ¡•µ…¥¸µ…Ñ¡•°±½…°‰É…¹ …±¥¹•)±•…¹±ä¸1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌääÌÜØÀÈÔÜÔ½©½ˆÄÈÀÌØÀàÜÈÄäÈ‰½Ñ )Á…ÍÌ€¨¨ÈÜÔØÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•( ÄĞÔ¸ÅÌ¤¸A…•ÌÌääÌÜØÀÄÌÔØ‰Õ¥±ÄÈÀÌØÀàÜÔÀÔÌ½‘•Á±½äÄÈÀÌØÄÀØàÄÈÈÍÕ••‘•¸±°ÈÀ)¡•­•Á½ÍÑ‘•Á±½åµ•¹ĞÍ¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”UX½‘½5Õ±Ñ¤½1…ˆÉ…Á °É•½Ù•Éä°)É•Ñ…¥¹•UXİ½É­ÍÁ…”½¥¹ÍÁ•Ñ½È¼äĞà±¥Ğ½İ¹•ÉÌ½µ…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À¼äĞÜ±…å•È)±¥ÍĞ½™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸9¼•á¥ÍÑ¥¹œ…ÍÍ•ÉÑ¥½¹ÌÉ•µ½Ù•½È)¡…¹•¸Q¡¥ÌÁÉ½½˜ÕÁ‘…Ñ•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±ä°É•Ñ…¥¹¥¹œÑ•ÍÑ•ÉÕ¹Ñ¥µ”¸()	Õ¥±äĞä½µÁ±•Ñ”…¹É•…‘ä™½È‘•Ù¥”Ñ•ÍÑ¥¹œèÁ±…¥¸Õ‰”½ÈÍµ…±°Á±…¹…Èµ™…•)•áÑÉÕ‘•µ•Í ƒŠH=‰©•ĞƒŠHUXƒŠH…”…Ñ±…ÌƒŠH=Á•¸UX‘¥Ñ½È¸M•Á…É…Ñ”™…”¥Í±…¹‘Ì°)U¹‘½I•‘¼°A…¥¹Ğ½½¹”É•Ñ…¥¹Ì…•ÁÑ•äĞà±¥¡Ñ¥¹œ°M…Ù•=Á•¸…¹½ÁÑ¥½¹…°9=5¸)á¥ÍÑ¥¹œÁ…¥¹ĞµÕÍĞ‰”•áÁ±¥¥Ñ±ä±•…É•™¥ÉÍĞì…Ñ¥½¸¹•Ù•È‘¥Í…É‘Ì¥Ğ¸…”…Ñ±…Ì)¥Ì½¹”¥Í±…¹Á•ÈÁ±…¹…È™…”°ÕÀÑ¼ÄÈà™…•Ì¼ÈÁ,½É¹•ÉÌì¥Ğ¥Ì¹½Ğ©½¥¹•µ¡…ÉĞ½È)•¹•É…°ÕÉÙ•Õ¹İÉ…À¸á¥ÍÑ¥¹œ	½à½A±…¹…È½å±¥¹‘•È½MÁ¡•É”½Q½ÉÕÌ½A…¬½…ÕÑ¼µ‘É•Ñ…¥¸)½É¥¥¹…°…±½É¥Ñ¡µÌ¸Y%äĞäÁ•¹‘¥¹œìÕÍ•ÈäĞàAIPAMLÁÉ½Ñ•Ñ•¸9•áĞ…ÑÕ…°(äĞä™••‘‰…¬°Ñ¡•¸Í½Á•…Ñ±…Ì½¡…ÉĞ½Í•…´‘¥É•Ñ¥½¸¸±Á¡„äÈä½É•™±•Ñ¥½¸¥¹‘•Á•¹‘•¹Ğ¸(((ŒŒ€¸äÔÀƒŠP…”…Ñ±…Ìİ…ÉÁ•µ™…”É•Á…¥Èì€¸äĞä‘•Ù¥”%0ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈäĞäÉ•Á½ÉÑÌÑ¡”ÅÕ…±¥é”µ‘•¹Í¥ÑäÁ±…¹…È½¹½¸µ‘••¹•É…Ñ”•ÉÉ½È…™Ñ•È½É‘¥¹…Éä)•áÑÉÕÍ¥½¹Ì½Í…±•Ì¸MÉ••¹Í¡½Ğ½¹™¥ÉµÌäĞä…¹ÈÑÙ•ÉÑÌ¼ÈÁ™…•Ì°™…È‰•±½ÜÄÈàµ™…”…À¸)á…ĞÍÕÁÁ±¥•áÑÉÕ‘”…¹Í…±”¹½‰¨É•ÁÉ½‘Õ•ÌÉ•©•Ñ¥½¸è™¥ÉÍĞ™½ÕÈÁ½±å½¹Ì…É”)µ¥±‘±äİ…ÉÁ•€¡Á½¥¹ĞµÑ¼µÁ±…¹”‘•Ù¥…Ñ¥½¹ÏŠ& ¸ÀÄÃŠL¸ÀÄÌ±½…°Õ¹¥ÑÌ¤¸Q¡¥Ì¥ÌäĞäÌ…Ñ±…Ì)Á±…¹…É¥ÑäÉ•ÍÑÉ¥Ñ¥½¸°¹½Ğ•Ù¥‘•¹”½˜‘…µ…•µ½‘•±±¥¹œÑ½Á½±½ä½È„ÍÑ…±”‰Õ¥±¸)=	(•áÁ½ÉÑ•È¡•…‘•ÈàäÈ¥ÌÑ¡”É•Ñ…¥¹•¥¹Ñ•É¹…°İÉ¥Ñ•ÈÍÑ…µÀ°¹½ĞÍ¡•±°É•±•…Í”¸)á…Ğ¥¹ÁÕĞÉ•Ñ…¥¹•…ÌÑ•ÍÑÌ½™¥áÑÕÉ•Ì½•áÑÉÕ‘”µ…¹µÍ…±”´äÔÀ¹½‰¨ìM!ÈÔØ(ÀÜÄÜáÔÅ…ˆÔØÄÌäÉ™„ÔÀàØÈÑÀààĞØÁ˜ÌÍˆÅ‘„Ôİ•àÜØÄİ•‘”ĞÄÌáŒÀäÈÜÉˆĞÙ°¥‘•¹Ñ¥…°Ñ¼ÕÁ±½…¸()=É¥¥¹…°…”…Ñ±…Ì™¥ÉÍĞÑÉ¥•ÌaPäĞäÁ±…¹…ÈÁ…Ñ ¸=¹±ä¥ÑÌÁ±…¹…È½…É•„É•™ÕÍ…°)É•ÅÕ•ÍÑÌÑ¡”=I%%90‰Õ¥±‘UYAÉ•Ù¥•İ•½µ•ÑÉä¡í™…•%¹‘¥•ÌéÑÉÕ•ô¤½İ¹•È°™½Éİ…É‘•)•áÁ±¥¥Ñ±ä‰ä5•Í¡!•…±Ñ UX…±±‰…¬¸=É¥¥¹…°ÑÉ¥…¹±—ŠI™…”½Ù•ÉÑ•àµ•Ñ…‘…Ñ„‰•½µ•Ì)ÑÉ…¹Í¥•¹Ğ±½…°µ½É¹•È±¥ÍÑÌì¹¼ÑÉ¥…¹Õ±…Ñ½È°¹•Ü…‘©…•¹ä½Èµ•Í µÕÑ…Ñ¥½¸¸I•ÅÕ¥É”)½µÁ±•Ñ”»Š"HÈÑÉ¥…¹±•ÌÁ•ÈÁ½±å½¸°Ù…±¥Õ¹¥ÅÕ”½É¹•È½İ¹•ÉÍ¡¥À°™¥¹¥Ñ”¹½¹é•É¼UX)ÑÉ¥…¹±”…É•…Ì…¹½¹Í¥ÍÑ•¹ĞÁ•Èµ™…”UX½É¥•¹Ñ…Ñ¥½¸¸½±‘•½½±±…ÁÍ•…¹‘¥‘…Ñ•Ì)É•™ÕÍ”İ¥Ñ ™…”¹Õµ‰•Èì…‰Í•¹Ğ½™…¥±•ÁÉ•Ù¥•ÜÉ•™ÕÍ•Ì¸Q•µÁ½É…Éä•½µ•ÑÉä‘¥ÍÁ½Í•Ì)¥¸™¥¹…±±ä½¸ÍÕ•ÍÌ½•ÉÉ½È¸M…µ”½É¥¥¹…°‘•¹Í¥Ñäµ…Ñ ½ÁÑ¥½¹…±±äÍÕµÌµ•…ÍÕÉ•)¹½Éµ…±¥é•€ÍÑÉ¥…¹±”…É•…ÌìÍÑ…¹‘…±½¹”ÅÕ…±¥é”‘•¹Í¥ÑäIQ%9LÍÑÉ¥ĞÁ±…¹…ÈÉÕ±”¸)=É¥¥¹…°Á±…¹…È½ÕÑÁÕÑÌ½•áÑÉ•µ”Í…±•ÌÉ•µ…¥¸•á…Ğì¹¼‰±…¹­•ĞÑ½±•É…¹”É•±…á…Ñ¥½¸¸()¥¹…°…Ñ±…ÌÍÑ¥±°ÕÍ•Ì½É¥¥¹…°A…¬½½µµ¥Ğ°½¹”¥Í±…¹Á•ÈÍ½ÕÉ”™…”…¹½¹”Í•¹”)¡•­Á½¥¹ĞìÍ½ÕÉ”ÅÕ…‘Ì½¹½¹Ì½Á½Í¥Ñ¥½¹Ì½É½ÕÁÌ…¹½±½Á••ÈÉ•Í½ÕÉ•ÌÉ•µ…¥¸¥¹Ñ…Ğ¸)9¼Á•Éµ…¹•¹ĞÑÉ¥…¹Õ±…Ñ¥½¸½ÈÍ¡•µ„½•áÁ½ÉĞ½¡¥ÍÑ½Éä½‰ÉÕÍ ½±¥¡Ñ¥¹œ¡…¹•Ì¸=É¥¥¹…°(ÄÈá™…•Ì¼ÈÁ-½É¹•È½Á½½°½¡¥ÍÑ½Éä½±•…ÈµÁ…¥¹ĞÕ…É‘ÌÉ•Ñ…¥¹•¸U$¹¼±½¹•È…±±Ì…Ñ±…Ì)Á±…¹…Èµ½¹±äìÍ…åÌÕÉÙ•™…•Ìµ…äÍÑÉ•Ñ ¸Q¡¥Ì¥ÌÍÑ¥±°ÁÉ½©•Ñ•Á•Èµ™…”…Ñ±…Ì°)¹½Ğ©½¥¹•µ¡…ÉĞ½•¹•É…°UX½ÁÑ¥µ¥é…Ñ¥½¸½È„Õ…É…¹Ñ•”•Ù•Éä™½±‘•™…”µ…ÁÌ¸()¥Ù”¹•Ü¥¹Ñ•É…Ñ¥½¹Ì•á•É¥Í”•á…ĞÕÍ•È™¥±”İ¥Ñ ÈÀÍ•Á…É…Ñ••ÅÕ…°µ‘•¹Í¥Ñä¥Í±…¹‘Ì°)Õ¹¡…¹•ÈĞÙ•ÉÑ¥•Ì¼ÄÑÅÕ…‘Ì¼Ù¹½¹Ì°Ñ•µÁ½É…Éä‘¥ÍÁ½Í…°…¹•á…ĞÉ•Á•…Ğì½É‘¥¹…Éä)•áÑÉÕÍ¥½¸­…á¥ÌµÍ…±”É•ÁÉ½‘Õ•È…Ğ€¸ÀÄ¼Ä¼ÄÀÀÀÀì½É¥¥¹…°U¹‘½I•‘¼½A…¥¹Ğ½•á…ĞM…Ù•=Á•¸¼)…ÑÕ…°9=4…¹1UX­Á…¥¹ĞÍ±½ÑÌìÕ¹…Ù…¥±…‰±”½µ…±™½Éµ•½™½±‘•ÁÉ•Ù¥•Ü½É•™ÕÍ•¡¥ÍÑ½Éä¼)Á…¥¹Ğ…Ñ½µ¥¥Ñäì…ÑÕ…°Á…¹•°™½Éİ…É‘¥¹œ½Ñ…É•ĞÕ…É‘Ì¸=É¥¥¹…°äĞä¹•…Ñ¥Ù”Õ¹…Ù…¥±…‰±”)İ…ÉÁ•µÁÉ•Ù¥•ÜÑ•ÍĞÉ•Ñ…¥¹•ì¥ÑÌU$İ½É‘¥¹œ•áÁ•Ñ…Ñ¥½¸™½±±½İÌ¥¹Ñ•¹‘•Í½Á”¡…¹”¸)=É¥¥¹…°àäÔÍÑ…¹‘…±½¹”¹½¹Á±…¹…ÈÉ•™ÕÍ…°ÍÑ…åÌ…Ñ¥Ù”¸½ÕÍ•¹•Ü¼äĞä½‘•¹Í¥Ñä½A…¬¼)É•±•…Í”ÈÙAMLì™Õ±°Ù…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸™½±±½İÌ¸9…Ñ¥Ù”Ñ•ÍĞÁÉ•Á…É•ÌÑ¡É½Õ QU0)İÉ¥Ñ•ÈÌÙ•ÉÍ¥½¹•Á…¥¹Ğµ•áÁ½ÉĞ½İ¹•È€¡µ½‘Õ±”µ±½…°]•…­5…ÁÌ¤ì…¹½¹¥…°)M=8¡…¹‘±•Ì)É½ÍÌµÉ•…±´UXÁÉ½Ñ½ÑåÁ•Ìİ¥Ñ¡½ÕĞİ•…­•¹¥¹œ•á…ĞÙ…±Õ•Ì¸	¥Ñµ…ÀÍ¡¥´¥ÌÑÉ…¹ÍÁ½ÉĞ)½¹±ä°¹½ĞAT½9½µ…Ù¥ÍÕ…°ÁÉ½½˜¸5…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸()Y%äÔÀèM5ÍÕÁÁ±¥•µ½‘•°ƒŠH=‰©•ĞƒŠHUXƒŠH…”…Ñ±…ÌƒŠH=Á•¸UX‘¥Ñ½ÈÍ¡½Õ±)µ…À…±°ÈÀ™…•Ì¸U¹‘½I•‘¼É•ÍÑ½É•Ì½É•…ÁÁ±¥•Ì½É¥¥¹…°ÅÕ…‘Ì½UYÌìA…¥¹Ğ½½¹”É•µ…¥¹Ì)Í•¹”µ±¥ĞìM…Ù•=Á•¸…¹½ÁÑ¥½¹…°9=5Í…¹¥Ñä¸±•…È•á¥ÍÑ¥¹œÁ…¥¹Ğ•áÁ±¥¥Ñ±ä™¥ÉÍĞ¸)á…ĞÕÁ±½…‘•µ•Í ¹½Üµ…ÁÌ¥¸…ÕÑ½µ…Ñ•É•…°µ½İ¹•ÈÁ…Ñ ì…ÑÕ…°¥A…äÔÀ…Ñ”Á•¹‘¥¹œ°)¹½Ğ¥¹™•ÉÉ•AML¸äĞàÍ•¹”µ±¥¡Ñ¥¹œ…•ÁÑ…¹”É•µ…¥¹ÌÁÉ½Ñ•Ñ•ìäĞäİ…ÉÁ•™…¥±ÕÉ”)É•½É‘•¸9•áĞ…ÑÕ…°äÔÀÉ•Ñ•ÍĞì‘½¸Ğ…Í¬ÕÍ•ÈÑ¼Á•Éµ…¹•¹Ñ±äÑÉ¥…¹Õ±…Ñ”„Ù…±¥‰½à)µ½‘•°…Ì„İ½É­…É½Õ¹½È…‘„Í•½¹µ½‘•±±¥¹œ½UX­•É¹•°¸=Ñ¡•È¡…ÉĞ½Í•…´İ½É¬ÅÕ•Õ•¸((´mátY%äÔÀèÕÍ•ÈAML€½¹•áÑ‰Õ¥±ÁÉ½Ñ•ÑÌÍÕÁÁ±¥••áÑÉÕÍ¥½¸½Í…±”…Ñ±…ÌÉ•Á…¥È¸äĞä½É¥¥¹…°™…¥±ÕÉ”É•Ñ…¥¹•ì½ÁÑ¥½¹…°¹…Ñ¥Ù”µ•áÁ½ÉĞ¡•­Ì…É”¹½ĞÍ•Á…É…Ñ•±ä¥¹™•ÉÉ•¸(((¸äÔÀ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨È°ÜØÄAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( ÄÀÄ¸åÌ¤°É•Ñ…¥¹¥¹œ½É¥¥¹…°ÈÜÔØÁ±ÕÌ™¥Ù”¹•Ü•á…Ğµ™¥±”½İ…ÉÁ•µ™…”¥¹Ñ•É…Ñ¥½¹Ì¸)½ÕÍ•¹•Ü¼äĞä½‘•¹Í¥Ñä½A…¬½É•±•…Í”ÈÙAML¸=±äĞäÕ¹…Ù…¥±…‰±”µÁÉ•Ù¥•Ü½‘••¹•É…ä)É•™ÕÍ…±ÌÉ•µ…¥¸ì¥ÑÌU$Ñ•áĞ•áÁ•Ñ…Ñ¥½¸É•™±•ÑÌ¹•ÜÍ½Á”¸MÑ…¹‘…±½¹”‘•¹Í¥ÑäàäÔ)Á±…¹…É¥Ñä½¹ÑÉ…ĞÕ¹¡…¹•¸MÕÁÁ±¥•=	(™¥áÑÕÉ”‰åÑ”µ¥‘•¹Ñ¥…°ì¹¼Í½ÕÉ”ÕÁ±½…)µ½‘¥™¥•¸I•Ù¥•İ•™Õ±°UX½‘½5Õ±Ñ¤½1…ˆ½É•½Ù•ÉääÔÀÉ…Á °µ…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´¼)™É½é•¸½…•ÁÑ•äĞá±¥¡Ñ¥¹œÕ¹¡…¹•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½İÌì‘•Ù¥”äÔÀ)M5µµ½‘•°…Ñ±…Ì½Á…¥¹Ğ½U¹‘½I•‘¼½M…Ù•=Á•¸…•ÁÑ…¹”Á•¹‘¥¹œ°¹¼äĞäAML¥¹™•ÉÉ•¸(((ŒŒ€¸äÔÀÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”‘…ŒÁ™ŒØÔÔÜÈİ„ØàØäÍ…„ÜØÅàİ•‘”ĞÈÕ”ÄÉ…‰ÀÁ€°•á…ĞÑ•ÍÑ•ÑÉ•”)€ĞÄÜÁŒÜàÜäĞÜÔÕŒÍ˜ØÀĞÄİˆĞÀÄÉÉ˜äÍÑ…”ØÕ•‘…€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸½¹¹•Ñ•)¥Ğ…Ñ„ÕÁ±½…‘•ÄÜ•á…Ğ‰±½‰Ì½ÑÉ•”ì™•Ñ¡•µ…¥¸µ…Ñ¡•…¹±½…°‰É…¹ …±¥¹•)±•…¹±ä¸1½…°9½‘”ÈĞ…¹¡½ÍÑ•9½‘”ÈÈÉ•É•ÍÍ¥½¸ÌääĞÈÜÔäØÔØ½©½ˆÄÈÀÌÜÜäÔØäàä‰½Ñ )Á…ÍÌ€¨¨ÈÜØÄÑ•ÍÑÌ€¼€À™…¥±ÕÉ•Ì€¼€ÀÍ­¥ÁÁ•¨¨ì½µÁ±•Ñ”¡½ÍÑ•±½œÑ½Ñ…±ÌÙ•É¥™¥•( ÈĞÜ¸ÉÌ¤¸A…•ÌÌääĞÈÜÔäĞÔØ‰Õ¥±ÄÈÀÌÜÜäØÄÄÀÈ½‘•Á±½äÄÈÀÌÜàÄÔàààÔÍÕ••‘•¸±°ÈÀ)¡•­•Á½ÍÑ‘•Á±½åµ•¹ĞÍ¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”UX½‘½5Õ±Ñ¤½1…ˆÉ…Á °É•½Ù•Éä°)É•Ñ…¥¹•UXİ½É­ÍÁ…”½¥¹ÍÁ•Ñ½È¼äĞà±¥Ğ½İ¹•ÉÌ½µ…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À¼äĞÜ±…å•È)±¥ÍĞ½™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸=É¥¥¹…°àäÔÁ±…¹…Èµ‘•¹Í¥ÑäÕ…É)É•Ñ…¥¹•ìäĞäU$İ½É‘¥¹œÕÁ‘…Ñ•™½È¥¹Ñ•¹‘•İ…ÉÁ•µ™…”ÍÕÁÁ½ÉĞ¸Q¡¥ÌÁÉ½½˜¡…¹•Ì)™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±ä°É•Ñ…¥¹¥¹œÑ•ÍÑ•ÉÕ¹Ñ¥µ”¸=É¥¥¹…°ÍÕÁÁ±¥•=	(Õ¹¡…¹•¸()	Õ¥±äÔÀ½µÁ±•Ñ”…¹É•…‘äèM5•áÑÉÕÍ¥½¸½Í…±”µ•Í ƒŠH=‰©•ĞƒŠHUXƒŠH…”…Ñ±…ÌƒŠH)=Á•¸UX‘¥Ñ½ÈÍ¡½Õ±µ…À…±°ÈÀ™…•Ì¸=É¥¥¹…°ÅÕ…‘Ì½¹½¹ÌÉ•µ…¥¸ìU¹‘½I•‘¼É•ÍÑ½É•Ì)UYÌ°Á…¥¹Ğ½½¹”É•Ñ…¥¹ÌäĞà±¥¡Ñ¥¹œ°M…Ù•=Á•¸…¹½ÁÑ¥½¹…°9=5Í…¹¥Ñä¸á…ĞÍÕÁÁ±¥•)™¥±”¹½ÜÁ…ÍÍ•ÌÉ•…°µ½İ¹•È…Ñ±…Ì½Á…¥¹Ğ½¡¥ÍÑ½Éä½ÑÉ…¹ÍÁ½ÉĞ¥¹Ñ•É…Ñ¥½¹Ì°‰ÕĞ¥A…äÔÀ)…ÁÁ•…É…¹”½Á•É™½Éµ…¹”…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ¸±•…È•á¥ÍÑ¥¹œÁ…¥¹Ğ•áÁ±¥¥Ñ±ä)™¥ÉÍĞ¸M½ÕÉ”äĞä™…¥±ÕÉ”É•½É‘•°¹½Ğ…•ÁÑ•…ÌAMLìÕÍ•ÈäĞàAIPAMLÁÉ½Ñ•Ñ•¸)9•áĞ…ÑÕ…°äÔÀ™••‘‰…¬‰•™½É”Õ¹É•±…Ñ•™•…ÑÕÉ•Ìì¹¼Á•Éµ…¹•¹ĞÑÉ¥…¹Õ±…Ñ¥½¸İ½É­…É½Õ¹¸(((ŒŒ€¸äÔÄƒŠP=ÁÑ¥½¹…°½Á±…¹…È…Ñ±…Ìì€¸äÔÀÕÍ•ÈAMLÁÉ½Ñ•Ñ•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á±¥•ÌAML€½¹•áÑ‰Õ¥±…™Ñ•ÈäÔÀèÁÉ½Ñ•ĞÑ¡”ÍÕÁÁ±¥••áÑÉÕÍ¥½¸½Í…±”…”…Ñ±…Ì)É•Á…¥È…¹•á¥ÍÑ¥¹œäĞà±¥ĞµÁ…¥¹Ğ…•ÁÑ…¹”¸äĞä½É¥¥¹…°İ…ÉÁ•™…¥±ÕÉ”ÍÑ…åÌÉ•½É‘•¸)Õ‘¥Ğè•á¥ÍÑ¥¹œ	½àÁÉ½©•Ñ¥½¸…±É•…‘ä¥Ù•Ìµ…Ñ¡¥¹œUYÌ½¸…‘©…•¹ĞÍ…µ”µ‘¥É•Ñ¥½¸)™…•Ìì½É¥¥¹…°¥µÁ½ÉÑ•µÕØµ¥¹ÍÁ•Ñ¥½¸½İ¹Ìµ…¹¥™½±…‘©…•¹ä½Õ¹¥½¸ì‘•¹Í¥Ñä½A…¬…¹)¹…Ñ¥Ù”UX½µµ¥Ğ½¡¥ÍÑ½Éä…±É•…‘ä•á¥ÍĞ¸9¼½Ñ¡•È±¥Ù”¡…ÉĞµ©½¥¹¥¹œ…Ñ±…Ì™½Õ¹ìÑ¡”)Á…Ñ¡ÑÉ…•Èá…Ñ±…Ì‘•Á•¹‘•¹ä¥ÌÕ¹É•±…Ñ•¸‘½ÁÑ¥½¹…°=‰©•ĞƒŠHUXƒŠH½Á±…¹…È…Ñ±…Ì¸()	½Ñ µ½‘•ÌÍ¡…É”½É¥¥¹…°ÁÉ¥Ù…Ñ”	½àƒŠH‘•¹Í¥ÑäƒŠHÉ¥A…¬ƒŠH=9½µµ¥ĞÁ¥Á•±¥¹”¸)…”…Ñ±…ÌÉ•Ñ…¥¹Ì½¹”¥Í±…¹Á•È™…”…¹•á…ĞäÔÀ½ÕÑÁÕÑÌ¸½Á±…¹…Èµ½‘”ÕÍ•Ì™¥á•)Í••Á±…¹•Ì€¡¹½Éµ…±¥é•™¥¹¥Ñ”½½É‘¥¹…Ñ•Ì°½É¥•¹Ñ•¹½Éµ…°½Á±…¹…É¥ÑäÑ½±•É…¹”Å”´ÄÀ°)¹¼…ÕµÕ±…Ñ•¹•¥¡‰½ÕÈ‘É¥™Ğ¤°±•…Ù¥¹œİ…ÉÁ•™…•Ì¥Í½±…Ñ•¸=É¥¥¹…°¥¹ÍÁ•Ñ½È)•ÑÌ½ÁĞµ¥¸…¹)½¥¹…•ÌÁÉ•‘¥…Ñ”ì‘•™…Õ±Ğ‰•¡…Ù¥½ÈÕ¹¡…¹•¸)½¥¸½¹±ä½ÁÁ½Í¥Ñ”)Í¡…É••‘”‘¥É•Ñ¥½¹Ì°µ…Ñ¡¥¹œ	½àUX•¹‘Á½¥¹ÑÌ°Í…µ”Í••Á±…¹”…¹•á…Ñ±äÑİ¼)µ…¹¥™½±½İ¹•ÉÌ¸¥Í½¹¹•Ñ•½½¥¹¥‘•¹ĞÙ•ÉÑ•àÁ½Í¥Ñ¥½¹Ì…¹…µ‰¥Õ½ÕÌ•‘•Ì¹•Ù•È)©½¥¸¸9¼µ•Í •‘¥ÑÌ°¹•ÜÑÉ¥…¹Õ±…Ñ½È½…‘©…•¹ä­•É¹•°°Á•ÉÍ¥ÍÑ•¹Ğ¡…ÉĞµ•Ñ…‘…Ñ„½È)UXÍ¡•µ„¸=É¥¥¹…°äÔÀÁÉ•Ù¥•Ü™…±±‰…¬¡…¹‘±•Ìİ…ÉÁ•…É•„ìÍÑ…¹‘…±½¹”‘•¹Í¥ÑäàäÔ)ÍÑ¥±°Á±…¹…È¸ÄÈàµ™…”¼ÈÁ,µ½É¹•È±¥µ¥Ğ…¹•áÁ±¥¥Ğ±•…Èµ…±°µÁ…¥¹ĞÁÉ•É•ÅÕ¥Í¥Ñ”ÍÑ…ä¸)Q¡¥Ì¥Ì½¹Í•ÉÙ…Ñ¥Ù”½Á±…¹…ÈÉ½ÕÁ¥¹œ°¹½Ğ…É‰¥ÑÉ…ÉäÕ¹İÉ…À½È½ÁÑ¥µ…°Á…­¥¹œì)¥¹Ù…±¥Í•±˜µ½Ù•É±…ÁÁ¥¹œ•½µ•ÑÉä…¹•¹•É…°ÕÉÙ•ÍÑÉ•Ñ …É”¹½ĞÍ½±Ù•¸()M¥à¹•ÜÑ•ÍÑÌäÔÄ½Ù•È½¹¹•Ñ•Á…Ñ ½Í•…´•¹‘Á½¥¹ÑÌ½¥Í±…¹•‘¥Ñ¥¹œì‰•¹‘Ì½İ…ÉÁÌ¼)Í…µ”µİ¥¹‘¥¹œ‘ÕÁ±¥…Ñ•Ì½½ÁÁ½Í¥Ñ”™…•Ì½‘¥Í½¹¹•Ñ•Á½Í¥Ñ¥½¹Ì½¹½¹µ…¹¥™½±‰½Õ¹‘…É¥•Ìì)•á…ĞÍÕÁÁ±¥•ÈÀµ™…”=	(€ ÄĞ¥Í±…¹‘ÌÙ•ÉÍÕÌ…”…Ñ±…ÌÈÀ¤°Í…±”½ÑÉ…¹Í±…Ñ¥½¸…¹•ÅÕ…°…Ù•É…”¥Í±…¹‘•¹Í¥Ñä½Í•Á…É…Ñ”)Á…­•‰½Õ¹‘ÌìÕ…É‘Ì½É•™ÕÍ•¡¥ÍÑ½Éäì…ÑÕ…°U¹‘½I•‘¼½Á…¥¹Ğ½ÁÉ½©•Ğ½1½İ¹•ÈÁ…Ñ ì)…ÑÕ…°Á…¹•°™½Éİ…É‘¥¹œ½ÕÉÉ•¹ĞµÑ…É•Ğ½¡¥ÍÑ½ÉäÕ…É‘Ì¸½ÕÍ•¹•Ü¼äĞä¼äÔÀ½‘•¹Í¥Ñä¼)A…¬½É•±•…Í”ÌÉAML¸Õ±°±½…°½¡½ÍÑ•…¹ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½İÌ‰•±½Ü¸()I•Ù¥•İ•…¡”±½ÍÕÉ”É•™É•Í¡•ÌUX¥¹ÍÁ•Ñ½È½•‘¥Ğ½Á…¹•°°UXİ½É­ÍÁ…”°Á…¥¹Ğ¥µÁ½ÉĞ)…¹•ÍÑ½ÉÌ…¹UX½‘½5Õ±Ñ¤½1…ˆ±½…‘•ÉÌì™Õ¹Ñ¥½¹…°¡…¹•Ì=91d¥¹ÍÁ•Ñ½È½ÁĞµ¥¸°)…Ñ±…Ì½İ¹•È…¹•á¥ÍÑ¥¹œÁ…¹•°¸5…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸)•Ù¥”äÔÄÉ•µ…¥¹ÌÁ•¹‘¥¹œèÍ…µ”Õ¹Á…¥¹Ñ•ÍÕÁÁ±¥•µ•Í ƒŠH½Á±…¹…È…Ñ±…ÌƒŠHUX‘¥Ñ½Èì)½µÁ…É”…”…Ñ±…ÌÌÈÀ¥Í±…¹‘ÌìU¹‘½I•‘¼°Á…¥¹Ğ…É½ÍÌ„™±…ĞÁ…Ñ …¹M…Ù•=Á•¸¸)9•áĞ…Ğ½¸äÔÄ™••‘‰…¬ì…±Á¡„äÈä½µ•Ñ…°µÉ•™±•Ñ¥½¸…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ğ¸¼¹½Ğ)¥¹™•È•¹•É…°ÕÉÙ•Õ¹İÉ…À°…É‰¥ÑÉ…Éä½Ù•É±…ÀÉ•Á…¥È½È½ÁÑ¥½¹…°9=5‘•Ù¥”AML¸((´mátUMHäÔÀAMLèİ…ÉÁ•µ™…”…Ñ±…ÌÉ•Á…¥È…•ÁÑ•ìÁÉ½Ñ•Ğ•á…ĞÍÕÁÁ±¥•™¥áÑÕÉ”…¹½É¥¥¹…°äÔÀ‰•¡…Ù¥½È¸(´mátY%äÔÄ…Ñ±…ÌèÕÍ•ÈäÔÄAMLÉ•½É‘•½ÁÉ½Ñ•Ñ•¸M•Á…É…Ñ”¥¹Ñ•Éµ¥ÑÑ•¹Ğ¥A…‘AÉ¼UXµ•‘¥Ñ½È½µ…¥¸µÑ½½±‰…È±½ÍÌÉ•µ…¥¹Ì½Á•¸ì¹¼™Õ±°U$µ±½ÍÌAML¥¹™•ÉÉ•¸(((¸äÔÄ™Õ±°±½…°9½‘”ÈĞÉ•É•ÍÍ¥½¸è€¨¨ÈÜØÜAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨€ ää¸ÁÌ¤°)É•Ñ…¥¹¥¹œ…±°ÈÜØÄÁ±ÕÌÍ¥à½Á±…¹…È¥¹Ñ•É…Ñ¥½¹Ì¸½ÕÍ•ÌÉAML¸I•Ù¥•İ•Ääµ™¥±”)ÉÕ¹Ñ¥µ”±½…‘•È±½ÍÕÉ”°Ñ¡É•”™Õ¹Ñ¥½¹…°½İ¹•ÉÌ½¹±äìÉ•Ñ…¥¹•µ…¥¸½…”½5Õ±Ñ¤Ä¸À¼)™É½é•¸‰åÑ•Ì…¹É•½Ù•Éä½İ¹•ÉÌÕ¹¡…¹•¸M½ÕÉ”äĞä¼äÔÀ…”…Ñ±…Ì½ÕÑÁÕÑÌ…¹)ÍÑ…¹‘…±½¹”àäÔ‘•¹Í¥ÑäÕ…É‘ÌÍÑ…äÁÉ½Ñ•Ñ•¸!½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½İÌì)Y%äÔÄ½µÁ…É¥Í½¸½Á…¥¹Ğ½U¹‘½I•‘¼½M…Ù•=Á•¸É•µ…¥¹ÌÁ•¹‘¥¹œ¸(((ŒŒ€¸äÔÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”€ØÍ˜ÑŒØäàØÜÔÙØÕ‘ŒØØàÉˆáŒÜÙ˜ÌÅ˜àÌÑÀÌÕ…•…€°•á…ĞÑ•ÍÑ•ÑÉ•”)™ŒĞÀÔÁ…™„ØĞÌİå‘„ÈÄÈİ…˜ÁÁ˜É‘…”åˆÌÄÁ‘€°¥ÌÁÕ‰±¥Í¡•½¸µ…¥¸¸±°ÈØÕÁ±½…‘•)‰±½‰Ì…¹¥Ğ…Ñ„ÑÉ•”µ…Ñ¡•±½…°¡…Í¡•Ìì™•Ñ¡•µ…¥¸µ…Ñ¡•…¹¡•­½ÕĞ±•…¸¸)1½…°9½‘”ÈĞ™Õ±°É•É•ÍÍ¥½¸ÈÜØİAML¼Á%0¼ÁÍ­¥ÁÁ•€ ää¸ÁÌ¤ì¡½ÍÑ•9½‘”ÈÈÉÕ¸(ÌääÔÈääÀàÈØ½©½ˆÄÈÀĞÄÄàÀĞààÜ½µÁ±•Ñ”±½œÙ•É¥™¥•ÌÍ…µ”ÈÜØÜ¼À¼À€ Ääà¸ÁÌ¤¸)A…•ÌÌääÔÈääÀĞØÈ‰Õ¥±ÄÈÀĞÄÄàÄÀÔÀÌ½‘•Á±½äÄÈÀĞÄÄääØÔÀÔÍÕ••‘•¸±°ÈäÁ½ÍÑ‘•Á±½åµ•¹Ğ)Í¡•±°½Ù•ÉÍ¥½¸°½µÁ±•Ñ”É•Ù¥•İ•UX½‘½5Õ±Ñ¤½1…ˆ½Á…¥¹Ğ±½…‘•ÈÉ…Á °É•½Ù•Éä°)É•Ñ…¥¹•äĞá±¥Ğ½µ…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À¼äĞİ±…å•ÉÌ½™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ ¸)AÉ½½˜½µµ¥ĞÕÁ‘…Ñ•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±äìÑ•ÍÑ•ÉÕ¹Ñ¥µ”É•Ñ…¥¹•¸()UÍ•ÈäÔÀAML¥ÌÉ•½É‘•½ÁÉ½Ñ•Ñ•¸	Õ¥±äÔÄ½µÁ±•Ñ”½É•…‘ä™½È‘•Ù¥”Ñ•ÍÑ¥¹œè)Í…µ”Õ¹Á…¥¹Ñ••áÑÉÕÍ¥½¸½Í…±”µ•Í ƒŠH=‰©•ĞƒŠHUXƒŠH½Á±…¹…È…Ñ±…ÌƒŠH=Á•¸UX‘¥Ñ½È¸)á…Ğ™¥áÑÕÉ”…ÕÑ½µ…Ñ¥…±±ä¥Ù•ÌÄĞ¥Í±…¹‘ÌÙ•ÉÍÕÌ…”…Ñ±…ÌÈÀ°™½ÕÈİ…ÉÁ•™…•Ì)ÍÑ…ä¥Í½±…Ñ•…¹…±°½É¥¥¹…°ÈĞÙ•ÉÑ¥•Ì¼ÈÀÅÕ…‘Ì½¹½¹ÌÕ¹¡…¹•¸½µÁ…É”¡…ÉÑÌ°)U¹‘½I•‘¼°Á…¥¹Ğ…É½ÍÌ½¹¹•Ñ•™±…Ğ™…•Ì…¹M…Ù•=Á•¸¸±•…È•á¥ÍÑ¥¹œÁ…¥¹Ğ)•áÁ±¥¥Ñ±ä™¥ÉÍĞ¸Y%äÔÄ…ÁÁ•…É…¹”½Á•É™½Éµ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ¸9•áĞ™½±±½ÜäÔÄ)™••‘‰…¬‰•™½É”‰É½…‘•ÈÕ¹İÉ…À½Í•…´Ñ½½±¥¹œì­••À½É¥¥¹…°½İ¹•ÉÌ…¹ÁÉ½Ñ•Ñ•)µ½‘•±±¥¹œ½¹…Ù¥…Ñ¥½¸½±¥¡Ñ¥¹œ½™É½é•¸‰•¡…Ù¥½È¸9¼•¹•É…°ÕÉÙ•Õ¹İÉ…À±…¥´¸(((ŒŒ€¸äÔÈƒŠPUX‘¥Ñ½È±…å•È½•¹ÑÉä¡…É‘•¹¥¹œì€¸äÔÄ…Ñ±…ÌAMLÁÉ½Ñ•Ñ•ƒŠP€ÈÌ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäÔÄAML€½¹•áÑ‰Õ¥±°İ¥Ñ Í•Á…É…Ñ”¥¹Ñ•Éµ¥ÑÑ•¹Ğ¥A…AÉ¼U$µ±½ÍÌÉ•Á½ÉĞ¸MÕÁÁ±¥•)ÍÉ••¹Í¡½Ğ½¹™¥ÉµÌäÔÄèİ½É­ÍÁ…”É¥¡ĞÍ•Ñ¥½¸¥¹±Õ‘¥¹œ	…¬Ñ¼Í…¹µ…¥¸Ñ½½±‰…È)‰ÕÑÑ½¹Ìµ¥ÍÍ¥¹œ°İ¡¥±”UXÑ¥±”É•µ…¥¹Ì‘É…İ¸¸¼9=PÑÉ•…Ğ…Ñ±…Ì…•ÁÑ…¹”…ÌU$µ±½ÍÌ)…•ÁÑ…¹”½È‘¥Íµ¥ÍÌ¥Ğ‰•…ÕÍ”¹½‘”Ñ•ÍÑÌÁ…ÍÌ¸=É¥¥¹…°äÈĞÑ½½±‰…È™¥àİ…Ì…•ÁÑ•)‰ÕĞÑ¡¥Ì¥Ì„É•ÕÉÉ•¹”İ¥Ñ ÍÉ••¹Í¡½Ğ•Ù¥‘•¹”ìÁÉ½Ñ•Ğ¥ÑÌ¡•…‘•Èµ…‰½Ù”µÙ¥•İÁ½ÉĞ)¥¹Ñ•¹Ğ¸á…Ğ¥¹Ñ•Éµ¥ÑÑ•¹Ğ¥A…½]•‰-¥Ğ½µÁ½Í¥Ñ½È™…¥±ÕÉ”¥Ì9=PÉ•ÁÉ½‘Õ•¡•É”¸()Õ‘¥Ğè¹¼…Ñ¥½¸¥¹Ñ•¹Ñ¥½¹…±±ä¡¥‘•Ìµ…¥¸Ñ½½±‰…Èìİ½É­ÍÁ…”İ…Ì„±…É”…‰Í½±ÕÑ”)…¹Ù…Ì½Ù•É±…ä¥¹Í¥‘”]•‰0Ù¥•İÁ½ÉĞ…±½¹Í¥‘”‰…­‘É½À½™¥±Ñ•È™±½…Ñ¥¹œÁ…¹•±Ì¸)=¹±ä=I%%90ÕØµİ½É­ÍÁ…”¡…¹•Ìèµ½Õ¹Ğ¥ÑÌ½¹”•á¥ÍÑ¥¹œÍ•Ñ¥½¸‰•Í¥‘”Ù¥•İÁ½ÉĞ)Õ¹‘•È€…ÁÀ°ÕÍ”™¥á•Ù¥•İÁ½ÉĞ¥¹Í•ÑÌ…¹¡•…‘•È¡•¥¡ĞÙ…É¥…‰±”İ¥Ñ èä‰•±½Ü¡•…‘•ÈÄÀì)…Ñ¥Ù”µ½¹±äÙ¥•İÁ½ÉĞ¥Í½±…Ñ¥½¸É•Ñ…¥¹•Ù¥„ÕÁ‘…Ñ•Í¥‰±¥¹œµ¡½ÍĞÍ•±•Ñ½È€¡½±¹•ÍÑ•)™…±±‰…¬É•Ñ…¥¹•™½È•µ‰•‘‘•½Ñ•ÍĞ¡½ÍĞ¤¸%Í½±…Ñ”½Á…¥¹Ğµ½¹Ñ…¥¸…¹Ù…Ì…É•„ì­••À¥ÑÌ)½É¥¥¹…°…¹Ù…Ì°½¹ÑÉ½±Ì°±¥ÍÑ•¹•ÉÌ…¹5•Í¡!•…±Ñ ½¹Ñ•áĞ½Í•ÍÍ¥½¸½¡¥ÍÑ½Éä…±±‰…­Ì¸)	…¬Ñ¼Íµ½Ù•Ì‰•Í¥‘”Ñ¥Ñ±”ìİÉ…ÁÁ¥¹œ½¹ÑÉ½±Ì‘¼¹½ĞÍ¡É¥¹¬½ÕĞ½˜Í¡½ÉĞÙ¥•İÁ½ÉĞ°)İ½É­ÍÁ…”ÍÉ½±±Ìİ¡•¸¹••‘•¸9¼™½É”µATÑÉ…¹Í™½ÉµÌ°èµ¥¹‘•à•Í…±…Ñ¥½¸°‘ÕÁ±¥…Ñ”)U$°µ½‘•±±¥¹œ½UX½Á…¥¹Ğ½¡¥ÍÑ½Éä½¹…Ù¥…Ñ¥½¸­•É¹•±Ì½È¡…¹•ÌÑ¼½É¥¥¹…°¡•…‘•È½İ¹•È¸()=Á•¸µ•…ÍÕÉ•Ì¥µµ•‘¥…Ñ•±ä…¹……¥¸½¹”½¸¹•áĞ…¹¥µ…Ñ¥½¸™É…µ”…™Ñ•È±…Õ¹ ¡¥‘•Ì)Í½ÕÉ”Á…¹•°¸1¥ÍÑ•¸Ñ¼Ù¥ÍÕ…±Y¥•İÁ½ÉĞÉ•Í¥é”…Ìİ•±°…Ìİ¥¹‘½Ü½I•Í¥é•=‰Í•ÉÙ•È¸)±½Í”…¹•±ÌÅÕ•Õ•™É…µ”…¹É•µ½Ù•Ì‰½Ñ É•Í¥é”±¥ÍÑ•¹•ÉÌì•á¥ÍÑ¥¹œ…ÁÑÕÉ”½•ÍÑÕÉ”¼)¥µ…”…¹•±±…Ñ¥½¸Õ¹¡…¹•¸Q¡É•”¹•ÜÁÉ½‘ÕÑ¥½¸µ½İ¹•ÈÑ•ÍÑÌèÉ•…°…ÁÀ½¡•…‘•È¼)Ù¥•İÁ½ÉĞÍ¥‰±¥¹Ì…¹Ñİ•±Ù”½Á•¸½±½Í”å±•ÌÕÍ¥¹œÍ…µ”¹½‘•Ì½…Ñ¥½¹Ìì‘•™•ÉÉ•…¹)Ù¥ÍÕ…°É•Í¥é”Á¥á•°Í¥é¥¹œ½¡¥ÍÑ½Éä¹•ÕÑÉ…±¥Ñä½±…Ñ”™É…µ”½±•…¹ÕÀìML¡•…‘•È½É‘•É¥¹œ°)…¹Ù…Ì½¹Ñ…¥¹µ•¹Ğ°‰½Õ¹‘•½Ù•É™±½Ü…¹Í¥¹±”±•™ĞµÍ¥‘”•á¥Ğ¸=É¥¥¹…°Ñ•ÍÑÌÉ•Ñ…¥¹•¸)±½Õ‰É½İÍ•ÈäÔÄµ…¥¸™…¥±Ì]•‰0½¹Ñ•áĞÉ•…Ñ¥½¸°Í¼¹¼™Õ±°É•¹‘•É•½ÈM…™…É¤½¥A…)É•ÁÉ½‘ÕÑ¥½¸±…¥µ•¸I•Á…¥È…‘‘É•ÍÍ•Ì±…å•ÈÑ½Á½±½ä…¹•¹ÑÉäÍ¥é¥¹œì¥A…É•Ñ•ÍĞ¥Ì)É•ÅÕ¥É•‰•™½É”…•ÁÑ¥¹œ¥¹Ñ•Éµ¥ÑÑ•¹Ğ‘¥Í…ÁÁ•…É…¹”…Ì™¥á•¸()I•Ù¥•İ•…¡”±½ÍÕÉ”=91dİ½É­ÍÁ…”ƒŠH5•Í¡!•…±Ñ ƒŠHÍ¡•±°Á±ÕÌÉ•½Ù•Éä±½…‘•È­•åÌì)¥¹Ñ•É¹…°Ù•ÉÍ¥½¸ÍÑ…µÁÌ…¹Õ¹É•±…Ñ•äÔÄUX½Á…¥¹Ğ±½…‘•ÈÁ¥¹ÌÉ•µ…¥¸¸Ñ±…ÌäÔÀ¼äÔÄ°)Á…¥¹ĞäĞà°µ…¥¸äÌÀ°…”äÌÀ°5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À…¹™É½é•¸Í¹…ÁÍ¡½ÑÌÕ¹¡…¹•¸)Y%äÔÈèÉ•Á•…Ñ•‘±ä½Á•¸½	…¬Ñ¼Í½¸¥A…‘AÉ¼°Ù•É¥™ä™Õ±°•‘¥Ñ½È…¹µ…¥¸Ñ½ÀµÉ¥¡Ğ)‰ÕÑÑ½¹Ì½Y%\ìÁ…¸½Á¥¹ ½A•¹¥°¥Í±…¹•‘¥Ğ…¹U¹‘½I•‘¼ìÉ•ÑÕÉ¸Ñ¼ÍÑ¡•¸É•½Á•¸¸)9•áĞ™½±±½ÜäÔÈU$™••‘‰…¬‰•™½É”™ÕÉÑ¡•ÈÕ¹İÉ…Àİ½É¬ìÉ•½É•á…ĞÉ•Á•…ĞÑÉ¥•È¥˜)±½ÍÌÁ•ÉÍ¥ÍÑÌ¸=Ñ¡•È…±Á¡„äÈä½µ•Ñ…°É•™±•Ñ¥½¸…Ñ•ÌÉ•µ…¥¸¥¹‘•Á•¹‘•¹Ğ¸((´mátUMHäÔÈAMLƒŠPY%äÔÈèÉ•Á•…Ñ•¥A…‘AÉ¼UX•¹ÑÉä½•á¥Ğ°•‘¥Ñ½È½	…¬Ñ¼Í…¹µ…¥¸Ñ½½±‰…È½Y%\É•µ…¥¸Ù¥Í¥‰±”ìÁ…¸½Á¥¹ ½A•¹¥°½U¹‘½I•‘¼…¹É•ÑÕÉ¸½É•½Á•¸¸(((¸äÔÈ±½…°9½‘”ÈĞ™Õ±°É•É•ÍÍ¥½¸è€¨¨ÈÜÜÀAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨€ äÜ¸ÕÌ¤°)…±°ÈÜØÜÉ•Ñ…¥¹•Á±ÕÌÑ¡É•”İ½É­ÍÁ…”±…å•È½•¹ÑÉä±¥™•å±”Ñ•ÍÑÌ¸½ÕÍ•UX½¡¥ÍÑ½Éä¼)A•¹¥°½¥Í±…¹½¥µ…”µÉ•™•É•¹”½A…¬½‘•¹Í¥Ñä½É•±•…Í”ÔÍAML¸9¼…ÍÍ•ÉÑ¥½¹ÌÉ•±…á•½È½±)¡•­Ì‘•±•Ñ•¸Õ¹Ñ¥½¹…°¡…¹•Ì½¹±äÕØµİ½É­ÍÁ…”ì5•Í¡!•…±Ñ ¥µÁ½ÉĞ€¬É•Ù¥•İ•)Í¡•±°½É•½Ù•Éä…¡”­•åÌäÔÈ¸5…¥¸½…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À…¹™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸)!½ÍÑ•½A…•Ì½±¥Ù”ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½İÌ¸Y%äÔÈ¥¹Ñ•Éµ¥ÑÑ•¹Ğ¥A…U$µ±½ÍÌ)É•Ñ•ÍĞÉ•µ…¥¹ÌÁ•¹‘¥¹œì¹¼•á…Ğ‰É½İÍ•È½ATÉ•ÁÉ½‘ÕÑ¥½¸½È‘•Ù¥”™¥àAML±…¥µ•¸(((ŒŒ€¸äÔÈÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÄÀÕˆäÕ„áˆÁÉˆá™™‘”á„Ôİ„ÄÕŒÌàÀÜĞäÈÌäĞÍ‘€°Ñ•ÍÑ•ÑÉ•”)•„ÔÁ”å”äàääÑŒÑ…‰‰ŒÑ˜ÌàÈå„ÁÄĞÄàäÌáÁŒÌÕ€°ÁÕ‰±¥Í¡•½¸µ…¥¸¸Q•¸ÕÁ±½…‘•)‰±½‰Ì½ÑÉ•”µ…Ñ¡•±½…°¡…Í¡•Ìì™•Ñ¡•µ…¥¸µ…Ñ¡•…¹¡•­½ÕĞ±•…¸¸1½…°)9½‘”ÈĞÉ•É•ÍÍ¥½¸ÈÜÜÁAML¼Á%0¼ÁÍ­¥ÁÁ•€ äÜ¸ÕÌ¤ì¡½ÍÑ•9½‘”ÈÈÉÕ¸ÌääÔÔÜÄÌÀÄÜ€¼)©½ˆÄÈÀĞÈÀäÈÄÀØÔ½µÁ±•Ñ”±½ÌÙ•É¥™äÈÜÜÀ¼À¼À€ ÈĞà¸ÙÌ¤¸A…•ÌÌääÔÔÜÄÈÔÌĞ‰Õ¥±(ÄÈÀĞÈÀäÈÔäÈÄ½‘•Á±½äÄÈÀĞÈÄÄØÜÄàäÍÕ••‘•¸±°ÈäÁ½ÍÑ‘•Á±½åµ•¹Ğ¡•­•Í¡•±°½Ù•ÉÍ¥½¸°)İ½É­ÍÁ…”½5•Í¡!•…±Ñ ½UX½‘½5Õ±Ñ¤½1…ˆ½Á…¥¹Ğ±½…‘•ÉÌ°É•½Ù•Éä°É•Ñ…¥¹•µ…¥¸½…”¼)5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À½±¥ĞäĞà½±…å•ÉÌäĞÜ½™É½é•¹	•Ñ„Üµ…É­•È‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸)Q¡¥ÌÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±äìÑ•ÍÑ•ÉÕ¹Ñ¥µ”É•Ñ…¥¹•¸()	Õ¥±äÔÈ½µÁ±•Ñ”…¹É•…‘ä™½È¥A…‘AÉ¼É•Ñ•ÍĞ¸UÍ•ÈäÔÄ…Ñ±…ÌAMLÁÉ½Ñ•Ñ•ìÍ•Á…É…Ñ”)¥¹Ñ•Éµ¥ÑÑ•¹ĞUX½µ…¥¸µÑ½½±‰…È‘¥Í…ÁÁ•…É…¹”¥ÌÍÑ¥±°Á•¹‘¥¹œY%äÔÈ½¹™¥Éµ…Ñ¥½¸¸)I•Á•…Ñ•‘±ä½Á•¸•‘¥Ñ½È…¹	…¬Ñ¼Íì¡•¬İ¡½±”•‘¥Ñ½È°•á¥Ğ‰•Í¥‘”Ñ¥Ñ±”°µ…¥¸Ñ½ÀµÉ¥¡Ğ)‰ÕÑÑ½¹Ì½Y%\°Á…¸½Á¥¹ ½A•¹¥°¥Í±…¹•‘¥Ñ¥¹œ½U¹‘½I•‘¼…¹É•ÑÕÉ¸½É•½Á•¸¸=É¥¥¹…°äÈĞ)¡•…‘•Èµ…‰½Ù”µÙ¥•İÁ½ÉĞ‰•¡…Ù¥½ÈÁÉ•Í•ÉÙ•İ¥Ñ Í¥‰±¥¹œİ½É­ÍÁ…”±…å•È¸±½Õ]•‰0)Õ¹…Ù…¥±…‰±”°¹¼•á…Ğ¥¹Ñ•Éµ¥ÑÑ•¹ĞM…™…É¤É•ÁÉ½‘ÕÑ¥½¸½È™Õ±°µ…ÁÀÉ•¹‘•É•…•ÁÑ…¹”)±…¥µ•¸9•áĞ™½±±½ÜäÔÈ‘•Ù¥”™••‘‰…¬ì‘½¸Ğ¥¹™•ÈÑ¡…Ğ…ÕÑ½µ…Ñ•Ñ•ÍÑÌÁÉ½Ù”Ñ¡”)É•Á½ÉÑ•¥¹Ñ•Éµ¥ÑÑ•¹Ğ‘¥Í…ÁÁ•…É…¹”É•Í½±Ù•¸9¼µ½‘•±±¥¹œ½…Ñ±…Ì½Á…¥¹Ğ…±½É¥Ñ¡´¡…¹•Ì¸(((ŒŒ€¸äÔÌƒŠPÍ•±•Ñ•‘”ÕĞUYÌì€¸äÔÈÕÍ•ÈAMLƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈäÔÈAMLÁÉ½Ñ•ÑÌÉ•Á•…Ñ•UX‘¥Ñ½È•¹ÑÉä½•á¥Ğ°µ…¥¸Ñ½½±‰…È½Y%\…¹¥Í±…¹)A•¹¥°½¡¥ÍÑ½Éäİ½É­™±½Ü…™Ñ•ÈÍ¥‰±¥¹œµ±…å•È¡…É‘•¹¥¹œ¸AÉ¥½ÈäÔÄ…Ñ±…ÌAMLÉ•Ñ…¥¹•¸)9¼¹•Ü…•ÁÑ…¹”½˜¥¹‘•Á•¹‘•¹Ğ…±Á¡„äÈä½ÈÍµ½½Ñ µµ•Ñ…°É•™±•Ñ¥½¸…Ñ•Ì¥¹™•ÉÉ•¸()Õ‘¥Ğµ…¥¸ÙˆØÙ˜ÅŒè½É¥¥¹…°¥¹ÍÁ•Ñ½È…±É•…‘ä½İ¹Ìµ…¹¥™½±…‘©…•¹ä½Õ¹¥½¸…¹¡…Ì)…¹)½¥¹…•Ìì½É¥¥¹…°UX•‘¥Ñ½È½İ¹ÌA…¬…¹¹…Ñ¥Ù”½µµ¥Ğ½¡¥ÍÑ½Éä¸9¼…ÕÑ¡½É•)‘”µÕĞ½µµ…¹•á¥ÍÑÌ¸‘‘”É…‘¥…°½ÕÑ•ÈØÜ¸×
ÀÕĞUYÌÕÍ¥¹œÕÉÉ•¹Ğ½É¥¥¹…°)M•±•Ñ¥½¹	É¥‘”•‘”¥¹‘¥•Ì°İ¥Ñ …±°ÁÉ•Ù¥½ÕÌÑ½½°Á½Í¥Ñ¥½¹ÌÁÉ•Í•ÉÙ•¸M…µ”)5•Í¡!•…±Ñ µ½‘Õ±”¡½ÍÑÌÑ¡”½¹”µÍ¡½Ğ‰ÕÑÑ½¸ì¹¼¹•ÜÁ½ÁÕÀ½¥¹ÁÕĞ½¡¥ÍÑ½Éä½­•É¹•°¸()9…Ñ¥Ù”Õ¹Á…¥¹Ñ•¥¹‘•Á•¹‘•¹Ğ	…Í”µ•Í¡•Ìİ¥Ñ ½µÁ±•Ñ”µ…Ñ¡¥¹œUYÌ½¹±ä¸á±Õ‘”)Í•±•Ñ•…ÑÕ…°•‘•Ì™É½´=I%%90¥¹ÍÁ•Ñ½È½¹¹•Ñ¥Ù¥Ñä°É•ÅÕ¥É”•… Í•±•Ñ•)½¹Ñ¥¹Õ½ÕÌUX•‘”Ì½İ¹•ÉÌÑ¼•¹¥¸‘¥™™•É•¹Ğ½µÁ½¹•¹ÑÌ°Ñ¡•¸½É¥¥¹…°É¥A…¬)…¹=9¹…Ñ¥Ù”UX½µµ¥Ğ¸½µÁ±•Ñ”‰½Õ¹‘…ÉäµÑ¼µ‰½Õ¹‘…ÉäÕÑÌ½È±½Í•±½½ÁÌÍÁ±¥Ğ)¡…ÉÑÌì¥¹½µÁ±•Ñ”Í±¥ÑÌÉ•™ÕÍ”Ñ¡”İ¡½±”…Ñ¥½¸¸á¥ÍÑ¥¹œÍ•…µÌ½‰½Õ¹‘…É¥•Ì¹¼µ½À¸)Ù•ÉäÕ¹Í•±•Ñ•½¹¹•Ñ¥½¸¥ÌÙ•É¥™¥•Õ¹¡…¹•‰•™½É”¡•­Á½¥¹Ğ¸½½É‘¥¹…Ñ•Ì)Á•ÉÍ¥ÍĞ…Ì½É‘¥¹…Éä¹…Ñ¥Ù”UYÌ°¹½ĞÍ•…´™±…Ì½È„¹•ÜÍ¡•µ„¸I•Á…¬…™™•ÑÌ10)¥Í±…¹‘Ìİ¥Ñ ½¹”½µµ½¸Í…±”ìÍ½ÕÉ”Á½±å½¹Ì½Á½Í¥Ñ¥½¹Ì½É•±…Ñ¥Ù”‘•¹Í¥ÑäÕ¹Ñ½Õ¡•¸)9¼½¹™½Éµ…°Õ¹İÉ…À°¹•Ü™±…ÑÑ•¹¥¹œ°Á•ÉÍ¥ÍÑ•¹ĞÍ•…´µ…É­¥¹œ½ÈÍÑ¥Ñ ½µµ…¹¸(ÈÁ,½É¹•ÉÌ€¼½É¥¥¹…°ÄÈàÁ…­•µ¥Í±…¹±¥µ¥ÑÌì…µ‰¥Õ½ÕÌ½¹½¹µ…¹¥™½±½Í…µ”µİ¥¹‘¥¹œ)Í•±•Ñ••‘•Ì°ÍÑ…±”Ñ…É•Ğ½¡¥ÍÑ½Éä™…¥±ÕÉ”É•™ÕÍ”‰•™½É”ÁÕ‰±¥…Ñ¥½¸¸¹ä½±½ÕÈ¼)É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌÁ…¥¹ĞÉ•™ÕÍ•Ì…¹Á½¥¹ÑÌÑ¼•áÁ±¥¥Ğ=‰©•ĞUX±•…ÈÁ…¥¹Ğ¸)9¼Í¥±•¹ĞÁ¥á•°‘¥Í…É½É•‰¥¹½È¥µÁ½ÉÑ•µ…Ñ•É¥…°É•µ…ÁÁ¥¹œ¸()M¥à¹•Ü¥¹Ñ•É…Ñ¥½¸¡•­Ì½Ù•È½µÁ±•Ñ”ÕÑÌ½±½Í•±½½ÁÌ°µ¥á•Á…ÉÑ¥…°É•™ÕÍ…°°)•á¥ÍÑ¥¹œÍ•…µÌ½‰½Õ¹‘…É¥•Ì°½É¥¥¹…°Á…¬½İ½É¬½Ñ…É•Ğ½¡¥ÍÑ½ÉäÕ…É‘Ì°É•…µ½¹±äÁ••ÉÌ°)Õ¹¡…¹••½µ•ÑÉä…¹Õ¹Í•±•Ñ•©½¥¹Ì°…ÑÕ…°Í•¹”U¹‘½I•‘¼½A…¥¹Ğ½M…Ù•=Á•¸½1)É½Õ¹‘ÑÉ¥À°…ÑÕ…°‘”…±±‰…¬½ÕÉÉ•¹ĞÍ•±•Ñ¥½¸½É•¹‘•È…¹É…‘¥…°½¹”µÍ¡½Ğİ¥É¥¹œ¸)=±ÜÄÌ¼ÜÀäÉ…‘¥…°¥¹Ù•¹Ñ½Éä¹½Ü¥¹±Õ‘•ÌÑ¡”¹•ÜÈÁÑ ‘”…Ñ¥½¸°É•Ñ…¥¹¥¹œ10½±)%Ì…¹É½ÍÌµµ½‘”Á±…•µ•¹ÑÌ¸=Ñ¡•ÈÉÕ¹Ñ¥µ”Í½ÕÉ”¡…¹•Ì…É”É•Ù¥•İ•É•Ù•ÉÍ”)UX½‘½5Õ±Ñ¤½1…ˆ…¡”Á¥¹Ì…¹Í¡•±°½É•½Ù•Éä­•åÌäÔÌ½¹±ä¸]½É­ÍÁ…”äÔÈ½µ…¥¸äÌÀ¼)…”½5Õ±Ñ¤µÑÉ…¹Í™½É´Ä¸À½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸Õ±°½ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½İÌ¸()Y%äÔÌè‘Õ¹Á…¥¹Ñ•UXA±…¹”İ¥Ñ `‘•¹Í¥ÑäÈ°dÄ¸‘”µ½‘”Í•±•Ğ¥ÑÌ•¹ÑÉ”)Í¡…É••‘”ƒŠHÉ…‘¥…°ÕĞUYÌ¸=‰©•ĞƒŠHUXƒŠH=Á•¸UX‘¥Ñ½ÈÍ¡½İÌÈÍ•Á…É…Ñ•¥Í±…¹‘Ìì)U¹‘½I•‘¼É•ÍÑ½É•Ì½É•…ÁÁ±¥•ÌÕĞìA•¹¥°¥Í±…¹µ½Ù”…™™•ÑÌ½¹”Í¥‘”¸A…¥¹Ğ…™Ñ•ÈÕĞ°)M…Ù•=Á•¸É•Ñ…¥¹ÌÉ•ÍÕ±Ğ¸I•Á•…ĞÕĞ½¸Í…µ”•‘”…‘‘Ì¹¼¡¥ÍÑ½ÉäìÁ…¥¹Ñ•Ñ…É•ÑÌ)É•™ÕÍ”Õ¹Ñ¥°•áÁ±¥¥Ğ±•…ÈÁ…¥¹Ğ¸á¥ÍÑ¥¹œÕ‰”™…”‰½Õ¹‘…É¥•Ìµ…ä…±É•…‘ä‰”Í•…µÌ)…¹½ÉÉ•Ñ±ä¹¼µ½À¸½ÈµÕ±Ñ¤µ•‘”Á…Ñ¡ÌÍ•±•ĞÑ¡”İ¡½±”ÕĞ°¹½Ğ…¸¥¹Ñ•É¥½ÈÍ±¥Ğ¸)9•áĞ™½±±½ÜäÔÌÑ…Ñ¥±”™••‘‰…¬ì…É‰¥ÑÉ…ÉäÍ•…´µ…É­Ì½ÍÑ¥Ñ ½•¹•É…°ÕÉÙ•Õ¹İÉ…À)É•µ…¥¸ÅÕ•Õ•Ñ¡É½Õ ½É¥¥¹…°½İ¹•ÉÌ¸-••ÀäÔÈU$µ±½ÍÌ…•ÁÑ…¹”ÁÉ½Ñ•Ñ•¸((¸äÔÌ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨ÈÜÜØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( äÄ¸ÙÌ¤°É•Ñ…¥¹¥¹œ½É¥¥¹…°ÈÜÜÀÁ±ÕÌÍ¥à‘”µÕĞ¥¹Ñ•É…Ñ¥½¹Ì¸½ÕÍ•¹•Ü½…Ñ±…Ì¼)İ½É­ÍÁ…”½É•±•…Í”ÈÁAMLìÉ…‘¥…°ÜÀä¼ÜÄÌÉ•Ñ…¥¹•…±°½±%Ì…¹¹½ÜÉ•ÅÕ¥É•ÌÈÀ‘”)…Ñ¥½¹Ì¸¥ÉÍĞ™Õ±°ÉÕ¸Ì½¹±ä™…¥±ÕÉ”İ…Ì½±ÜÄÌ¥¹Ù•¹Ñ½ÉäÄäìÕÁ‘…Ñ•Ñ¼¥¹Ñ•¹‘•(ÈÀ…¹™¥¹…°=5A1QÉ•ÉÕ¸…‰½Ù”Á…ÍÍ•Ì¸9¼‰•¡…Ù¥½È…ÍÍ•ÉÑ¥½¸‘É½ÁÁ•½ÈÍ­¥ÁÁ•¸)I•Ù¥•İ•äµ™¥±”ÉÕ¹Ñ¥µ”½±½…‘•È±½ÍÕÉ”€¬É•½Ù•Éä­•åÌäÔÌìµ…¥¸äÌÀ½…”½5Õ±Ñ¤Ä¸À¼)™É½é•¸Õ¹¡…¹•¸ÑÕ…°äÔÌ¥A…Ñ…Ñ¥±”…•ÁÑ…¹”Á•¹‘¥¹œ¸!½ÍÑ•½A…•Ì½±¥Ù”)ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½İÌ¸I•ÁÉ½©•Ñ¥¹œUYÌÉ•Á±…•ÌÕÑÌì¹¼Á•ÉÍ¥ÍÑ•¹ĞÍ•…´É•¥Á”¸(((ŒŒ€¸äÔÌÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÅÌÄàÕ™ˆÀá•ŒĞÑ‰ØÅ‘ŒÀÅˆÀÁ…„ÌØÀÜá•…‘‘…ˆĞİ€°Ñ•ÍÑ•ÑÉ•”)”ÌÅ…ˆÔØäÙ„äÄÔÔØäÅ…”ÈÙˆáˆÉ„ØÌÄÍ”ÜÑ••‰á‘‰€°ÁÕ‰±¥Í¡•½¸µ…¥¸¸±°Äà‰±½‰Ì)…¹É•…Ñ•ÑÉ•”µ…Ñ¡•±½…°¡…Í¡•Ìì™•Ñ¡•µ…¥¸µ…Ñ¡••á…Ñ±ä…¹¡•­½ÕĞ)…±¥¹•±•…¹±ä¸1½…°9½‘”ÈĞ™Õ±°ÈÜÜÙAML¼Á%0¼ÁÍ­¥À€ äÄ¸ÙÌ¤ì¡½ÍÑ•9½‘”ÈÈÉÕ¸(ĞÀÀÌäÔàĞäÌÌ½©½ˆÄÈÀÜÀÜÈÌØäĞØ½µÁ±•Ñ”±½ÌÙ•É¥™äÈÜÜØ¼À¼À€ ÈÄĞ¸İÌ¤¸A…•ÌĞÀÀÌäÔàĞÔÌÜ)‰Õ¥±ÄÈÀÜÀÜÈĞÀÀÌÈ½‘•Á±½äÄÈÀÜÀÜÌäÜàØÔMUML¸±°ÈÀ¡•­•±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ è)Í¡•±°½Ù•ÉÍ¥½¸°=5A1Q¡…¹•UX½‘½5Õ±Ñ¤½1…ˆ½¥éµ¼É…Á °É•½Ù•Éä°É•Ñ…¥¹•)İ½É­ÍÁ…”äÔÈ½¥¹ÍÁ•Ñ½ÈäÔÄ½µ…¥¸äÌÀ½…”½5Õ±Ñ¤Ä¸À½¹…Ñ¥Ù”İÉ¥Ñ•È½ÁÉ½©•Ğ½™É½é•¹	•Ñ„Ü¸)Q¡¥ÌÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä‘½Õµ•¹ÑÌ½¹±äìÑ•ÍÑ•ÉÕ¹Ñ¥µ”É•Ñ…¥¹•¸()	Õ¥±äÔÌÉ•…‘ä™½È¥A…Ñ•ÍÑ¥¹œè‘UXA±…¹”`È½dÄƒŠHÍ•±•Ğ•¹ÑÉ”Í¡…É•‘”ƒŠH)É…‘¥…°ÕĞUYÌƒŠH=‰©•ĞUX‘¥Ñ½ÈÍ¡½İÌÑİ¼¥Í±…¹‘Ì¸U¹‘½I•‘¼É•ÍÑ½É•Ì½É•…ÁÁ±¥•Ìì)A•¹¥°¥Í±…¹µ½Ù”°A…¥¹Ğ…™Ñ•ÈÕĞ…¹M…Ù•=Á•¸É•Ñ…¥¸±…å½ÕĞ¸á¥ÍÑ¥¹œÍ•…´½‰½Õ¹‘…Éä)É•Á•…Ğ¹¼µ½ÁÌìÁ…¥¹ĞÉ•ÅÕ¥É•Ì•áÁ±¥¥Ğ±•…ÈÁ…¥¹Ğ‰•™½É”ÕÑÑ¥¹œ¸½µÁ±•Ñ”Á…Ñ¡Ì½È)±½Í•±½½ÁÌ½¹±äìÁ…ÉÑ¥…°Í±¥ÑÌÉ•™ÕÍ”…Ñ½µ¥…±±ä¸9¼•¹•É…°Õ¹İÉ…À½ÍÑ¥Ñ ½Á•ÉÍ¥ÍÑ•¹Ğ)Í•…´É•¥Á”¸UÍ•ÈäÔÈU$½¡¥ÍÑ½ÉäAMLÁÉ½Ñ•Ñ•ìY%äÔÌ™••°½Ù¥Í¥‰¥±¥ÑäÁ•¹‘¥¹œ¸)9•áĞ…ÑÕ…°äÔÌ™••‘‰…¬°Ñ¡•¸Í½Á•Í•…´½ÍÑ¥Ñ ½Õ¹İÉ…À…Õ‘¥ĞÑ¡É½Õ ½É¥¥¹…°½İ¹•ÉÌ¸(((ŒŒ€¸äÔĞƒŠPÍÉ••¸µÁÉ½á¥µ¥Ñä‘”Á¥­¥¹œìÍÕÁÁ±¥•½¹Ù•àµ•‘”É•Á½ÉĞƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈÉ•Á½ÉÑÌ½¹Ù•àµÁ½Í¥Ñ¥½¸•‘•Ì…±µ½ÍĞ¥µÁ½ÍÍ¥‰±”Ñ¼Ñ…À…¹¹•İ±ä™±¥ÁÁ•)•‘•Ì‰•½µ¥¹œÕ¹Í•±•Ñ…‰±”¸MÉ••¹Í¡½Ğ±•…É±ääÔÈìÕÉÉ•¹ĞäÔÌÉ•Ñ…¥¹ÌM5µ…¥¸äÌÀ)Á¥­•È°Í¼É•ÁÉ½‘Õ•½¸ÕÉÉ•¹ĞÍ½ÕÉ”°¹½Ğ‘¥Íµ¥ÍÍ•…ÌÍÑ…±”µÍ¡•±°‰•¡…Ù¥½È¸)9¼äÔÌÕĞUYÌAML¥¹™•ÉÉ•¸UÍ•ÈäÔÈUXµ•‘¥Ñ½È…•ÁÑ…¹”É•µ…¥¹ÌÁÉ½Ñ•Ñ•¸)á…ĞÕÁ±½…‘•½¹Ù•à‘”¹½‰¨É•Ñ…¥¹•‰åÑ”µ™½Èµ‰åÑ”…Ğ(Ñ•ÍÑÌ½™¥áÑÕÉ•Ì½½¹Ù•àµ•‘”´äÔĞ¹½‰¨ìM!ÈÔØ(ÜàÈÉˆáÌÔÌØÜÜÅŒÍˆÕ˜àÁÜÍ˜Í™…ŒĞÈÄÄÁŒÌàÕ‘İ„ÄÜÈÌÈÀÁå”İ„ĞÁŒÄàÜÜáĞ¸(ØÁÙ•ÉÑ¥•Ì¼àÑ™…•Ìµ…Ñ¡•ÌÍÉ••¹Í¡½Ğ¸…µ•É„Á½Í”¥Ì¹½Ğ¥¸=	(ìÑ•ÍĞ…µ•É…Ì…É”)½¹ÑÉ½±±•É•ÁÉ½‘ÕÑ¥½¹Ì°¹½Ğ„±…¥´Ñ¼É•½Ù•È•á…ĞÍÉ••¹Í¡½ĞÙ¥•Ü¸()Õ‘¥Ğè½É¥¥¹…°µ…¥¸Á¥­-¥¹‘!¥ÑÌÕÍ•ÌQ¡É•”1¥¹”Ñ¡É•Í¡½±€¸Àäİ½É±Õ¹¥ÑÌÑ¡•¸)…µ•É„µ‘¥ÍÑ…¹”½É‘•È¸=¸•á…ĞÍÕÁÁ±¥••½µ•ÑÉä°ÄÈ¡½Í•¸±¥¹”µ¥‘Á½¥¹ÑÌ10)Í•±•Ğ…¹½Ñ¡•È…µ•É„µ¹•…É•È¹•¥¡‰½ÕÉ¥¹œ•‘”¸=É¥¥¹…°ÁÉ½áä½‘¥ÍÁ±…ä‰…Ñ¡¥¹œ)…¹%Ì…É”½ÉÉ•Ğì¹¼Í½ÕÉ”Ñ½Á½±½ä½±¥À­•É¹•°É•Á…¥ÈÉ•ÅÕ¥É•¸M•±•Ñ•µ½¹±ä)½µÁ½¹•¹ĞµÑ…À¡•±Á•È…±Í¼É••‘¥±ä¡½Í”…¹äÍ•±•Ñ••‘”İ¥Ñ¡¥¸ÈÁÁà°•Ù•¸İ¡•¸)„‘¥™™•É•¹Ğ•‘”±…äÕ¹‘•ÈÑ¡”Á½¥¹Ñ•È¸A•¹¥°…Ñ”…±É•…‘ä‘•±•…Ñ•Ì¹…Ñ¥Ù”Á¥¬¸)‘”µÁ…¥¹Ğ½İ¹•È¥¹‘•Á•¹‘•¹Ñ±äÕÍ•Ñ¡”½±İ½É±µÉ…‘¥ÕÌ½É‘•É¥¹œ¸()5…¥¸Ì‘”µ½¹±ä‰É…¹ ¹½Ü…±±ÌÍµ…±°É•…µ½¹±ä•‘”µÍÉ••¸µÁ¥­¥¹œ¡•±Á•È½Ù•È)M5É•¹‘•É•¥¹‘•á•±¥¹”ÁÉ½á¥•Ì°ÄÈMLÁ¥á•±Ì°ÍÉ••¸ÁÉ½á¥µ¥Ñä™¥ÉÍĞ°…µ•É„)‘•ÁÑ ™½ÈÅÕ…¹Ñ¥é•ÅÕ…ÉÑ•ÈµÁ¥á•°Ñ¥•Ì¸!½µ½•¹•½ÕÌ™ÉÕÍÑÕ´±¥ÁÁ¥¹œ‰•™½É”‘¥Ù¥‘”)…¹Á•ÉÍÁ•Ñ¥Ù”µ½ÉÉ•Ğİ½É±¥¹Ñ•ÉÁ½±…Ñ¥½¸ìÁ…É•¹ĞÑÉ…¹Í™½ÉµÌ…¹½ÉÑ¡½É…Á¡¥Œ)…µ•É…ÌÍÕÁÁ½ÉÑ•¸9¼µ•Í ¹•‘•Ì ¤°Ñ½Á½±½ä½ÈÍ½ÕÉ”İÉ¥Ñ•Ì°…¡”½¡¥ÍÑ½Éä½¥¹ÁÕĞ)½İ¹•È¸5…Ñ•É¥…°¹Ù¥Í¥‰±”õ™…±Í”ÁÉ½áä½¹Ù•¹Ñ¥½¸É•Ñ…¥¹•ì½‰©•Ğ½…¹•ÍÑ½ÈÙ¥Í¥‰¥±¥Ñä)É•ÍÁ•Ñ•¸…”½Y•ÉÑ•à½=‰©•ĞÉ…äÁ…Ñ¡ÌÕ¹¡…¹•¸Q¡¥Ì¥ÌÑ…É•Ñ¥¹œ°¹½Ğ„¹•Ü)ÍÕÉ™…”½±ÕÍ¥½¸½‰…¬µ™…”½Q¡É½Õ µÍ•±•Ñ¥½¸Á½±¥äì¹¼¹•Ü¡¥‘‘•¸µÍÕÉ™…”Õ…É…¹Ñ•”¸()=É¥¥¹…°Í•±•Ñ•µ½µÁ½¹•¹Ğ‘”Ñ½±”¹½Ü¡•­ÌM5¹…Ñ¥Ù”¡¥Ğ‰•™½É”É•µ½Ù…°ì)Õ¹Í•±•Ñ•¹•¥¡‰½ÕÉÌÁ…ÍÌÑ¼µ…¥¸¸=É¥¥¹…°‘”Á…¥¹ĞÙ¥Í¥‰±”½Ñ¡É½Õ ÕÍ•Ì¹…Ñ¥Ù”)Á¥­!¥ÑÌ½É‘•È…¹½É¥¥¹…°‘•‘ÕÀ½™¥ÉÍĞ½…±°Á½±¥ä°É•Ñ…¥¹¥¹œ™…±±‰…¬™½ÈÍÑ…ÉÑÕÀ¼)¹½¸µ‘”™¥áÑÕÉ•Ì¸M…µ”½É¥¥¹…°±¥ÍÑ•¹•ÉÌ°ÁÉ½Á……Ñ¥½¸…¹•ÍÑÕÉ”½İ¹•ÉÌì¹¼¹•Ü)É…ÜµÁ½¥¹Ñ•È¡…¹‘±•È¸±¥À‘”•½µ•ÑÉä½¡¥ÍÑ½Éä½É…‘¥…°½İ½É­ÍÁ…”½UX½Á…¥¹Ğ½µ…Ñ•É¥…°)…±½É¥Ñ¡µÌÕ¹¡…¹•¸9•Ü5%8…¡”Á¥¸äÔĞ¥Ì¥¹Ñ•¹Ñ¥½¹…°…ÑÕ…°Á¥­•ÈÉ•Á…¥Èì)½É¥¥¹…°µ…¥¸¥¹Ñ•É¹…°ÍÑ…µÀ…¹…”äÌÀ½5Õ±Ñ¤Ä¸À½™É½é•¸‰åÑ•ÌÉ•µ…¥¸Õ¹¡…¹•¸)¥É•Ğµ‰•Ù•°¡…¹•Ì=91d½µÁ½¹•¹ĞµÑ…À¡¥±…¡”­•äìÍ¡•±°½É•½Ù•Éä½µ…¹¥™•ÍĞ)…¹É•Ù¥•İ•µ…¥¸½¡¥±±½…‘•ÈÉ…Á äÔĞ¸9¼‰±…¹­•ĞÉ•Á¥¹¹¥¹œ¸()M•Ù•¸¹•Ü¥¹Ñ•É…Ñ¥½¹Ìè•á…ĞÍÕÁÁ±¥•ÄÈÁÉ”µÉ•Á…¥È™…¥±ÕÉ•ÏŠI½ÉÉ•Ğ¹…Ñ¥Ù”Á¥¬ì)QU0½É¥¥¹…°±¥À‘”…ÁÁ±ä½É•‰Õ¥±½U¹‘½I•‘¼Á±ÕÌÉ•Í•±•Ğ¹•Ü‘¥…½¹…°ìÍ…±”¼)ÁÉ½©•Ñ¥½¸½Á…É•¹Ğ½AH¼ÄÉÁà‰½Õ¹‘Ìì±¥À½¡¥‘‘•¸…¹•ÍÑ½È½ÍÕ‰Á¥á•°µ‘•ÁÑ ‰•¡…Ù¥½Èì)…ÑÕ…°Í•±•Ñ•µÑ½±”É•™ÕÍ…°½É•µ½Ù…°İ¥Ñ ¹¼¡¥ÍÑ½Éäì½É¥¥¹…°‘”µÁ…¥¹Ğ¹…Ñ¥Ù”)•Ù•¹Ğ½Ù¥Í¥‰±”½Ñ¡É½Õ ‘•±•…Ñ¥½¸ìÉ•…°A•¹¥°…Ñ”½Á…¥¹Ğ½İ¹•ÈÉ•±•…Í”½…¹•°½™¥¹•È)=É‰¥ĞÉ•Ñ•¹Ñ¥½¸¸½ÕÍ•¹•Ü­¹…Ñ¥Ù”…”½Y•ÉÑ•à½™±½…Ñ¥¹œµ¹…Ù¥…Ñ¥½¸½É•±•…Í”ÌáAML¸)=É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•ì™Õ±°…¹ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½Ü¸9½‘”Q¡É•”½¥¹ÁÕĞ)™¥áÑÕÉ•Ì…É”¹½Ğ¹…Ñ¥Ù”¥A…½]•‰0É•¹‘•É•…•ÁÑ…¹”¸()Y%äÔĞèM5ÍÕÁÁ±¥•µ•Í °‘•Í•±•Ğ…¹Ñ…À¥É±••‘”…¹¹•¥¡‰½ÕÉ¥¹œİ¡¥Ñ”)•‘”ì½É‰¥Ğ½é½½´…¹É•Á•…Ğ¸±¥À•±¥¥‰±”•‘”°‘•Í•±•ĞÑ¡•¸É•Í•±•Ğ¹•Ü‘¥…½¹…°ì)U¹‘½I•‘¼­••ÁÌ‰½Ñ •½µ•ÑÉä…¹Á¥­¥¹œÕÍ…‰±”¸QÉä¹•…É‰äµÕ±Ñ¤µ•‘”Í•±•Ñ¥½¸°)A•¹¥°‘É…œÍ•±•Ñ¥½¸…¹™¥¹•È½É‰¥Ğ½Á…¸½Á¥¹ İ¥Ñ¡½ÕĞÍ•±•Ñ¥½¸±½ÍÌ¸¡•¬äÔÌ)ÕĞUYÌÍ•Á…É…Ñ•±äİ¡•¸ÁÉ…Ñ¥…°ì¹¼äÔÌ…•ÁÑ…¹”¥¹™•ÉÉ•™É½´Ñ¡¥Ì‰ÕœÉ•Á½ÉĞ¸)9•áĞÉ•ÍÁ½¹Ñ¼äÔĞ‘•Ù¥”É•ÍÕ±ÑÌ‰•™½É”¹•ÜÍ•…´½Õ¹İÉ…À™•…ÑÕÉ•Ì¸9¼Ñ½Á½±½ä)É•Á…¥È½ÑÉ¥…¹Õ±…Ñ¥½¸İ½É­…É½Õ¹½È™½É•…¡”µ±•…É¥¹œ¹••‘•™½ÈÉ•ÁÉ½‘Õ•‰Õœ¸((¸äÔĞ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸ÀÉ•É•ÍÍ¥½¸è€¨¨ÈÜàÌAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( äÔ¸ÅÌ¤°½É¥¥¹…°ÈÜÜØÉ•Ñ…¥¹•Á±ÕÌÍ•Ù•¸ÍÕÁÁ±¥•µ™¥±”½Á¥­•È½¥¹ÁÕĞ¥¹Ñ•É…Ñ¥½¹Ì¸)½ÕÍ•¹•Ü½¹…Ñ¥Ù”…”½Y•ÉÑ•à½™±½…Ñ¥¹œµ•‘”½•ÍÑÕÉ”½É•±•…Í”ÌáAML¸9¼½±…ÍÍ•ÉÑ¥½¹Ì)É•±…á•½ÈÉ•µ½Ù•¸UÁ±½…‘•=	(™¥áÑÕÉ”‰åÑ”µ¥‘•¹Ñ¥…°¸5…¥¸Í½ÕÉ”¡…¹•Ì½¹±ä)¡•±Á•È¥µÁ½ÉĞ…¹‘”Á¥­•È‰É…¹ ì‘¥É•Ğµ‰•Ù•°¥ÌÁ¥¸µ½¹±ä¸½µÁ½¹•¹Ğ‘”Ñ½±”)…¹‘”µÁ…¥¹ĞÕÍ”•á¥ÍÑ¥¹œ¹…Ñ¥Ù”½İ¹•Èì¹¼¹•ÜÁ½¥¹Ñ•È½•½µ•ÑÉä½¡¥ÍÑ½Éä¥µÁ±•µ•¹Ñ…Ñ¥½¸¸)I•Ù¥•İ•…¡”±½ÍÕÉ”äÔĞì…”äÌÀ½5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸!½ÍÑ•½A…•Ì½±¥Ù”µ™¥±”)ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½İÌì…ÑÕ…°äÔĞ¥A…Ñ…À½±¥À½É•Í•±•Ğ…•ÁÑ…¹”Á•¹‘¥¹œ¸(((ŒŒ€¸äÔĞÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€äàå„ÅŒÅ„Á•˜äÄå„ÄÀÙ”ÈÌå…ˆÙŒàÕ™…™…Üàá•ŒÅ€°Ñ•ÍÑ•ÑÉ•”)€Àİ˜ÀÀÈĞá…ˆÔÁ”àá„Á”ÔÁ„àÉˆÜÄÈÜÔİ‘„Á”ØÌÌåŒÙ€°ÁÕ‰±¥Í¡•½¸µ…¥¸¸±°ÄÔ‰±½‰Ì)…¹¥Ğ…Ñ„ÑÉ•”µ…Ñ¡•±½…°¡…Í¡•Ìì™•Ñ¡•µ…¥¸µ…Ñ¡••á…ĞÑ•ÍÑ•ÑÉ•”…¹)¡•­½ÕĞ…±¥¹•±•…¹±ä¸1½…°9½‘”ÈĞ™Õ±°ÈÜàÍAML¼Á%0¼ÁÍ­¥À€ äÔ¸ÅÌ¤ì¡½ÍÑ•)9½‘”ÈÈÉÕ¸ĞÀÀĞÄÄäÈÄää½©½ˆÄÈÀÜÄÈĞÄØÀÀĞ½µÁ±•Ñ”±½ÌÙ•É¥™äÈÜàÌ¼À¼À€ ÈĞĞ¸ÑÌ¤¸)A…•ÌĞÀÀĞÄÄäÄÌàØ‰Õ¥±ÄÈÀÜÄÈĞÄÜÀäà½‘•Á±½äÄÈÀÜÄÈÔÔàÈĞÄMUML¸±°ÈÀ¡•­•±¥Ù”)™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°¹•ÜÁ¥­•È€¬¡…¹•µ…¥¸½Ñ½±”½‘”µÁ…¥¹Ğ½	•Ù•°)±½…‘•ÈÉ…Á °É•½Ù•Éä°É•Ñ…¥¹•İ½É­ÍÁ…”äÔÈ½UXäÔÌ½¥éµ¼äÔÌ½A•¹¥°…Ñ”½…”äÌÀ¼)5Õ±Ñ¤Ä¸À½±¥ÀÌÌÜ½¹…Ñ¥Ù”İÉ¥Ñ•È½ÁÉ½©•Ğ½™É½é•¹	•Ñ„Ü¸=É¥¥¹…°ÕÁ±½…™¥áÑÕÉ”Õ¹¡…¹•¸)Q¡¥ÌÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì½¹±äìÑ•ÍÑ•½ÁÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”É•Ñ…¥¹•¸()	Õ¥±äÔĞ½µÁ±•Ñ”½É•…‘ä™½ÈM5µ™¥±”¥A…É•Ñ•ÍĞèÕ¹Í•±•Ñ•¥É±••‘”…¹¥ÑÌ)¹•¥¡‰½ÕÉÌ°½É‰¥Ğ½é½½´½É•Í•±•Ğ°½É¥¥¹…°±¥À‘—ŠI‘•Í•±•ÓŠIÉ•Í•±•Ğ¹•Ü‘¥…½¹…°°)U¹‘½I•‘¼°µÕ±Ñ¤µ•‘”Í•±•Ñ¥½¸…¹™¥¹•È¹…Ù¥…Ñ¥½¸¸ÕÑ½µ…Ñ••á…Ğµ™¥±”½¹…Ñ¥Ù”)Á¥­•È…¹É•…°±¥À½¡¥ÍÑ½Éä½¥¹ÁÕĞ™¥áÑÕÉ•ÌÁ…ÍÌì…ÑÕ…°¥A…™••°½…ÁÁ•…É…¹”É•µ…¥¹Ì)Á•¹‘¥¹œ¸MÉ••¹Í¡½ĞäÔÈ™…¥±ÕÉ”É•ÁÉ½‘Õ•½¸Í…µ”Á¥­•È¥¸äÔÌì¹¼™½É•ÍÑ…±”µ…¡”)İ½É­…É½Õ¹¸UÍ•ÈäÔÈU$½¡¥ÍÑ½ÉäAMLÁÉ½Ñ•Ñ•ìäÔÌÕĞUYÌ‘•Ù¥”…Ñ”É•µ…¥¹ÌÍ•Á…É…Ñ”¸)9•áĞ…ÑÕ…°äÔĞ™••‘‰…¬‰•™½É”™ÕÉÑ¡•ÈÕ¹İÉ…À½Í•…´™•…ÑÕÉ•Ìì¹¼¹•ÜäÔÌ¼äÔĞAML¥¹™•ÉÉ•¸(((ŒŒ€¸äÔÔƒŠP½Á±…¹…ÈMÑ¥Ñ UYÌì€¸äÔÌ…¹€¸äÔĞÕÍ•ÈAMLƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•È•áÁ±¥¥Ñ±ääÔÍAML…¹äÔÑAML€½¹•áÑ‰Õ¥±¸AÉ½Ñ•Ğ½µÁ±•Ñ”‘”ÕĞUYÌ°)U¹‘½I•‘¼½A…¥¹Ğ½M…Ù•=Á•¸…¹ÍÉ••¸µÁÉ½á¥µ¥Ñä‘”Ñ…É•Ñ¥¹œ°±¥À½É•Í•±•Ğ°Í•±•Ñ•)¹•¥¡‰½ÕÈÑ½±”½A•¹¥°Á…¥¹ĞÍ•±•Ñ¥½¸…¹™¥¹•È¹…Ù¥…Ñ¥½¸¸äÔÈ•‘¥Ñ½ÈU$…•ÁÑ…¹”)…±Í¼É•Ñ…¥¹•¸AÉ¥½ÈÁ•¹‘¥¹œäÔÌ¼äÔĞ¹½Ñ•Ì‰•±½Ü…É”¡¥ÍÑ½É¥…°°ÍÕÁ•ÉÍ•‘•¡•É”¸)%¹‘•Á•¹‘•¹Ğ…±Á¡„äÈä½Íµ½½Ñ µµ•Ñ…°É•™±•Ñ¥½¸…Ñ•Ì…É”¹½Ğ¥µÁ±¥•…•ÁÑ•¸()Õ‘¥Ğµ…¥¸Ğàá”ÌÑ•”è¹¼ÍÑ¥Ñ •á¥ÍÑÌ¸=É¥¥¹…°¥¹ÍÁ•Ñ½È½İ¹Ìµ…¹¥™½±…‘©…•¹ä…¹)¥Í±…¹µ•µ‰•ÉÍ¡¥Àì½É¥¥¹…°	½àÁÉ½©•Ñ¥½¸ÍÕÁÁ±¥•Ì„…¹½¹¥…°Á±…¹”µ…ÁÁ¥¹œì)½É¥¥¹…°½Á±…¹…ÈÍ••É½ÕÁ¥¹œäÔÄ°É¥A…¬…¹¹…Ñ¥Ù”½µµ¥Ğ…±É•…‘ä•á¥ÍĞ¸)‘‘”É…‘¥…°½ÕÑ•ÈÄÄÈ¸×
ÀMÑ¥Ñ UYÌ°İ¥Ñ …±°ÁÉ¥½ÈÁ½Í¥Ñ¥½¹ÌÕ¹¡…¹•¸M¥¹±”)ÕÉÉ•¹ĞÍ•±•Ñ•Í¡…É••‘”ì½É¥¥¹…°‰ÕÑÑ½¸½…Ñ¥½¸¡½ÍĞ¥¸5•Í¡!•…±Ñ …¹½É¥¥¹…°)É…‘¥…°½¹”µÍ¡½Ğ½µÁ±•Ñ¥½¸¸9¼¹•ÜÁ½ÁÕÀ½É…Ü¥¹ÁÕĞ½¡¥ÍÑ½Éä½µ•Í ½ÑÉ¥…¹Õ±…Ñ¥½¸½İ¹•È¸()¥ÉÍĞÍÑ¥Ñ ÍÕÁÁ½ÉÑÌQ]<¥Í±…¹‘Ì½¸M5½É¥•¹Ñ•™±…ĞÍ½ÕÉ”Á±…¹”°¹…Ñ¥Ù”½Á±…¥¸¼)¥¹‘•Á•¹‘•¹ĞÕ¹Á…¥¹Ñ•	…Í”µ•Í¡•Ì½¹±äìÄÈá™…•Ì¼ÈÁ-½É¹•ÉÌ¸á¥ÍÑ¥¹œÕÉÉ•¹Ğ¡…ÉÑÌ)µÕÍĞ•… µ…Ñ …¹½¹¥…°Á±…¹”½½É‘¥¹…Ñ•ÌÕ¹‘•ÈÕ¹¥™½É´Í¥µ¥±…É¥Ñä½É•™±•Ñ¥½¸¸)5½Ù•½É½Ñ…Ñ•½Í…±•½™±¥ÁÁ•¡…ÉÑÌÍÕÁÁ½ÉÑ•ì¥¹Ñ•É¹…±±ä‘¥ÍÑ½ÉÑ•½İ…ÉÁ•½‰•¹Ğ¼)¹½¸µ½Á±…¹…È¡…ÉÑÌÉ•™ÕÍ”¸=É¥¥¹…°±½İ•Èµ™…”¡…ÉĞÍÕÁÁ±¥•ÌÑ¡”™¥Ğìµ½Ù”Ñ¡”½Ñ¡•È)¥¹Ñ¼¥ÑÌÁ±…¹”™É…µ”°Í¹…À½µµ½¸Ù•ÉÑ•àµ%½É¹•ÉÌÑ¼=I%%90•á…Ğ…¹¡½ÈÙ…±Õ•Ì¸)±°Í¡…É•‰½Õ¹‘…É¥•Ì‰•Ñİ••¸Ñ¡…ĞÁ…¥È©½¥¸ì¹¼ÍÁ…Ñ¥…°İ•±‘¥¹œ°Á•Èµ™…”Ñ½Á½±½ä)¡…¹•Ì½ÈÍ…Ù•Í•…´™±…Ì¸=É¥¥¹…°É¥A…¬Ñ¡•¸É•Á…­Ì10¥Í±…¹‘Ìİ¥Ñ ½µµ½¸)Í…±”…¹½µµ¥ÑÌ=9¸5½Ù¥¹œ¡…ÉĞ‘•¹Í¥Ñä½½É¥•¹Ñ…Ñ¥½¸µ…Ñ¡•ÌÉ•Ñ…¥¹•¡…ÉĞ‰•™½É”)A…¬ìÕ¹Ñ½Õ¡•¡…ÉĞÍ¡…Á•Ì½É•±…Ñ¥Ù”‘•¹Í¥ÑäÉ•Ñ…¥¹•¸¥¹…°¥¹ÍÁ•Ñ½ÈµÕÍĞÉ•Á½ÉĞ)aP¥¹Ñ•¹‘•Ñİ¼µÑ¼µ½¹”µ•µ‰•ÉÍ¡¥À°¹¼Õ¹É•±…Ñ•µ•É•Ì½ÍÁ±¥ÑÌ¸M…µ”µ¥Í±…¹©½¥¹•)•‘”¹¼µ½ÁÌì…¸¥¹Ñ•É¹…°Í±¥ĞÉ•™ÕÍ•Ì°…Ì¹¼İ¡½±”µ¡…ÉĞ©½¥¸…¸É•Á…¥È¥Ğ¸()±°½±½ÕÈ½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌÁ…¥¹ĞÉ•™ÕÍ•Ì‰•™½É”ÍÑ…¥¹œ½¡¥ÍÑ½Éä°İ¥Ñ •áÁ±¥¥Ğ)=‰©•ĞUX±•…ÈÁ…¥¹ĞÕ¥‘…¹”¸=É¥¥¹…°Õ¹ÍÕÁÁ½ÉÑ•Ñ…É•Ğ½¡¥ÍÑ½Éä½™¥¹¥Ñ”½½±±…ÁÍ”¼)A…¬Õ…É‘ÌÉ•Ñ…¥¹•¸9¼•¹•É…°ÕÉÙ•Õ¹İÉ…À°Õ‰”µ¹•ĞÕ¹™½±‘¥¹œ°½ÁÑ¥µ…°Á…­¥¹œ°)…É‰¥ÑÉ…Éä½Ù•É±…ÀÉ•Á…¥È½ÈÁ…¥¹ĞÉ•Í…µÁ±¥¹œ¸9…Ñ¥Ù”Í½ÕÉ”é‰½á±…ˆ½É¹•ÈÍ¡•µ„°)•½µ•ÑÉä°ÁÉ½©•Ğ½¡¥ÍÑ½Éä½•áÁ½ÉĞ½İ¹•ÉÌÉ•µ…¥¸Õ¹¡…¹•¸…¹½¹¥…°	½à¥ÌÑÉ…¹Í¥•¹Ğ)Ù…±¥‘…Ñ¥½¸½…±¥¹µ•¹Ğ½¹±ä°¹½Ğ„É•Á±…•µ•¹Ğ±¥Ù”UXµ…ÁÁ¥¹œ½ÈÁ…É…±±•°­•É¹•°¸()M¥à¹•Ü¥¹Ñ•É…Ñ¥½¹ÌèÕÓŠIMÑ¥Ñ •á…Ğ•¹‘Á½¥¹ÑÌ½•½µ•ÑÉä½Á••È¥Í½±…Ñ¥½¸½É•Á•…Ğ¹¼µ½Àì)É½Ñ…Ñ•½Í…±•½µ¥ÉÉ½É••¥Ñ¡•È¡…ÉĞ…¹Í½ÕÉ”Í…±”½ÑÉ…¹Í±…Ñ¥½¸ìÕ¹É•±…Ñ•¥Í±…¹)µ•µ‰•ÉÍ¡¥Àì¹½¸µÁ±…¹…È½‘¥ÍÑ½ÉÑ•½‰½Õ¹‘…Éä½…µ‰¥Õ½ÕÌ½É•™ÕÍ•Ñ…É•ÑÌ…¹¡¥ÍÑ½Éä½İ½É¬)…Ñ½µ¥¥Ñäì…ÑÕ…°U¹‘½I•‘¼½A…¥¹Ğ½M…Ù•=Á•¸½1ì…ÑÕ…°‘”…±±‰…¬…¹É…‘¥…°±…Õ¹ ¼)ÁÕ¬É•ÍÑ½É…Ñ¥½¸¸=É¥¥¹…°äÔÌ¼äÔĞÍ•µ…¹Ñ¥Œ¡•­ÌÉ•Ñ…¥¹•¸=±ÜÄÌ¼ÜÀä‘”¥¹Ù•¹Ñ½Éä)¹½ÜÈÄ°É•Ñ…¥¹¥¹œ…±°ÁÉ•Ù¥½ÕÌ%Ì…¹Í¡…É•É½ÍÌµµ½‘”Á½Í¥Ñ¥½¹Ì¸½ÕÍ•¹•Ü½ÕĞ¼)Á¥­¥¹œ½É…‘¥…°½É•±•…Í”ÌÕAML¸Õ±°…¹ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½İÌ¸=91dUX•‘¥Ğ°)5•Í¡!•…±Ñ …±±‰…¬…¹¥éµ¼™Õ¹Ñ¥½¹…±¥Ñä¡…¹”ì½Ñ¡•ÈÉÕ¹Ñ¥µ”¡…¹•Ì…É”É•Ù¥•İ•)UX½‘½5Õ±Ñ¤½1…ˆÉ•Ù•ÉÍ”±½…‘•ÈÁ¥¹ÌäÔÔ…¹Í¡•±°½É•½Ù•Éä¸5…¥¸äÔĞ½Á¥­•ÈäÔĞ½…”äÌÀ¼)5Õ±Ñ¤Ä¸À½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸9¼äÔÌ¼äÔĞ…•ÁÑ…¹”±½ÍĞ‘ÕÉ¥¹œÍ•…´İ½É¬¸()Y%äÔÔèUXA±…¹”`È½dÄƒŠHÍ¡…É•‘”ÕĞUYÌƒŠHÍ•±•ĞM5•‘”ƒŠHMÑ¥Ñ UYÌ¸)UX‘¥Ñ½ÈÍ¡½İÌ½¹”©½¥¹•¥Í±…¹ìA•¹¥°µ½Ù”µ½Ù•Ì‰½Ñ ™…•Ì¸U¹‘½I•‘¼ÍÑ•ÁÌÑ¡É½Õ )ÍÑ¥Ñ ½ÕĞÍ•Á…É…Ñ•±ä¸5½Ù”½É½Ñ…Ñ”½Í…±”…¸¥Í±…¹‰•™½É”ÍÑ¥Ñ¡¥¹œìÍ…µ”™±…ĞÁ…Ñ )©½¥¹Ì½É”µÁ…­Ì¸A…¥¹Ğ…™Ñ•ÈÍÑ¥Ñ °M…Ù•=Á•¸É•Ñ…¥¹ÌÉ•ÍÕ±Ğ¸±É•…‘äµ©½¥¹•É•Á•…Ğ)¹¼µ½ÁÌìÕÉÙ•½Í…µ”µÕ‰”µ½É¹•È™…•Ì½ÈÁ…¥¹Ñ•Ñ…É•ÑÌÉ•™ÕÍ”İ¥Ñ¡½ÕĞ¡…¹¥¹œİ½É¬¸)9•áĞ…ÑÕ…°äÔÔ‘•Ù¥”™••‘‰…¬‰•™½É”•áÁ…¹‘¥¹œÍÑ¥Ñ ½•¹•É…°Õ¹İÉ…ÀìÁÉ•Í•ÉÙ”)…•ÁÑ•äÔÌÕÑÌ¼äÔĞÁ¥­¥¹œ¼äÔÈU$…¹…±°ÁÉ½Ñ•Ñ•¹…Ù¥…Ñ¥½¸½µ½‘•±±¥¹œ‰•¡…Ù¥½È¸((´mátUMHäÔÌAMLèÕĞUYÌ€¼¥Í±…¹•‘¥Ñ¥¹œ€¼U¹‘½I•‘¼€¼A…¥¹Ğ€¼M…Ù•=Á•¸ÁÉ½Ñ•Ñ•¸(´mátUMHäÔĞAMLèÍÕÁÁ±¥•½¹Ù•àµ•‘”Í•±•Ñ¥½¸€¼±¥ÀÉ•Í•±•Ğ€¼¹…Ù¥…Ñ¥½¸ÁÉ½Ñ•Ñ•¸(´ltY%äÔÔèÕĞÑ¡•¸MÑ¥Ñ „™±…ĞUXA±…¹”ì¥Í±…¹•‘¥Ñ¥¹œ°U¹‘½I•‘¼…¹A…¥¹Ğ½M…Ù•=Á•¸¸((¸äÔÔ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨ÈÜàäAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( äÌ¸ÑÌ¤°½É¥¥¹…°ÈÜàÌÉ•Ñ…¥¹•Á±ÕÌÍ¥àMÑ¥Ñ ¥¹Ñ•É…Ñ¥½¹Ì¸9•Ü½ÕĞ½…•ÁÑ•äÔĞ)Á¥­¥¹œ½É…‘¥…°½É•±•…Í”ÌÕAML¸=É¥¥¹…°äÔÌÍ½ÕÉ”µÑ•ÍĞ‰½Õ¹‘…É¥•Ì­•ÁĞ¥¹Ñ…Ğ…™Ñ•È)¥¹¥Ñ¥…°¹•Üµ‰ÕÑÑ½¸Á±…•µ•¹Ğ•áÁ½Í•„™¥áÑÕÉ”Í±¥”ì‰ÕÑÑ½¸‘•±…É…Ñ¥½¹ÌÁÉ••‘”)‰½Ñ …±±‰…­Ì°…¹½É¥¥¹…°…ÍÍ•ÉÑ¥½¹ÌÉ•µ…¥¸¸ÜÄÌ¼ÜÀä¥¹Ù•¹Ñ½Éä¹½ÜÈÄİ¥Ñ •Ù•Éä)½±Ñ½½°É•Ñ…¥¹•¸9¼½±‰•¡…Ù¥½È…ÍÍ•ÉÑ¥½¸É•µ½Ù•½ÈÉ•±…á•¸5…¥¸½Á¥­•È½Ñ½±”¼)‘”µÁ…¥¹ĞäÔĞ°…”äÌÀ½5Õ±Ñ¤Ä¸À½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸I•Ù¥•İ•äµ™¥±”É•Ù•ÉÍ”UX¼)‘½5Õ±Ñ¤½1…ˆ½¥éµ¼±½ÍÕÉ”äÔÔ…¹É•½Ù•ÉäÁ¥¹Ìì™Õ±°¡½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½İÌ¸)ÑÕ…°äÔÔ¥A…™••°½™±…ĞµÍÑ¥Ñ İ½É­™±½Ü…•ÁÑ…¹”Á•¹‘¥¹œìäÔÌ¼äÔĞÕÍ•ÈAMLÁÉ½Ñ•Ñ•¸(((ŒŒ€¸äÔÔÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()IÕ¹Ñ¥µ”€ÁˆÄÀØÉ‘”ĞÔÄÌÈİ˜åØàÔÈĞÍ…˜ÌÅ‰‰ŒÉ”ĞÑ‰„ÜäÅ€°Ñ•ÍÑ•ÑÉ•”)ŒàÉ™™”ÌÔàÀàĞÈÌØÈäÔÜÜÀĞàÙÕ„ÄÕ˜ÜàÅ˜ÀÁ”ÕŒÙ€°ÁÕ‰±¥Í¡•½¸µ…¥¸¸±°ÄàÕÁ±½…‘•)‰±½‰Ì…¹¥Ğ…Ñ„ÑÉ•”µ…Ñ¡•±½…°¡…Í¡•Ìì™•Ñ¡•µ…¥¸µ…Ñ¡••á…Ñ±ä…¹±½…°)¡•­½ÕĞ…±¥¹•±•…¹±ä¸1½…°9½‘”ÈĞ™Õ±°ÈÜàåAML¼Á%0¼ÁÍ­¥À€ äÌ¸ÑÌ¤ì¡½ÍÑ•)9½‘”ÈÈÉÕ¸ĞÀÀĞÔàÔÄÈÔÀ½©½ˆÄÈÀÜÈÜÈàÀÀàà½µÁ±•Ñ”±½ÌÙ•É¥™äÈÜàä¼À¼À€ ÈĞĞ¸åÌ¤¸)A…•ÌĞÀÀĞÔàÔÄÈÈÔ‰Õ¥±ÄÈÀÜÈÜÈàÌÜàà½‘•Á±½äÄÈÀÜÈÜĞÄÀØäÔMUML¸±°ÈÀ¡•­•±¥Ù”)™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½Ù•ÉÍ¥½¸°=5A1Q¡…¹•UX½‘½5Õ±Ñ¤½1…ˆ½¥éµ¼É…Á °)É•½Ù•Éä°É•Ñ…¥¹•äÔĞµ…¥¸½Á¥­•È½½µÁ½¹•¹ĞµÑ½±”½‘”µÁ…¥¹Ğ°İ½É­ÍÁ…”äÔÈ½…”äÌÀ¼)5Õ±Ñ¤Ä¸À½™É½é•¹	•Ñ„Ü¸ÑÕ…°½É¥¥¹…°µ…­•A±…¹” È°È°Ä¤­…ÕÑ½µ…Ñ¥Œah¹…Ñ¥Ù”UX½İ¹•È)…±Í¼Íµ½­”µÑ•ÍÑ•ÕÓŠIMÑ¥Ñ£ŠI½¹”¥Í±…¹¸Q¡¥ÌÁÉ½½˜¡…¹•Ì™½ÕÈ½¹Ñ¥¹Õ¥Ñä™¥±•Ì)½¹±äìÑ•ÍÑ•½ÁÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”É•Ñ…¥¹•¸UÍ•ÈäÔÌ…¹äÔĞAMLÉ•½É‘•½ÁÉ½Ñ•Ñ•¸()	Õ¥±äÔÔ½µÁ±•Ñ”…¹É•…‘äèÕ¹Á…¥¹Ñ•UXA±…¹”`È½dÄƒŠHÍ¡…É•‘”ÕĞUYÌƒŠHM5)Í•±•Ñ•Í•…´MÑ¥Ñ UYÌƒŠH=‰©•ĞUX‘¥Ñ½ÈÍ¡½İÌ=9©½¥¹•¥Í±…¹¸A•¹¥°¥Í±…¹)µ½Ù”µ½Ù•Ì‰½Ñ ™…•ÌìU¹‘½I•‘¼É•ÍÑ½É•Ì½É•…ÁÁ±¥•ÌÍÑ¥Ñ Í•Á…É…Ñ•±ä™É½´ÕĞ¸A…¥¹Ğ)Ñ¡•¸M…Ù•=Á•¸É•Ñ…¥¹Ì±…å½ÕĞ½É•ÍÕ±Ğ¸]¡½±”Ñİ¼¡…ÉÑÌµÕÍĞÍ¡…É”½¹”™±…ĞÍ½ÕÉ”)Á±…¹”ìÕÉÙ•½Õ‰”µ½É¹•È½‰•¹Ğ¡…ÉÑÌÉ•™ÕÍ”°¹¼•¹•É…°Õ¹İÉ…À½ÈÍ•…´É•¥Á”¸)ÑÕ…°äÔÔ¥A……ÁÁ•…É…¹”½™••°É•µ…¥¹ÌÁ•¹‘¥¹œ¸9•áĞ…ÑÕ…°äÔÔ™••‘‰…¬‰•™½É”‰É½…‘•È)ÍÑ¥Ñ ½Õ¹İÉ…Àİ½É¬ìÉ•Ñ…¥¸…•ÁÑ•äÔÌÕÑÌ¼äÔĞÁ¥­¥¹œ¼äÔÈU$…¹½É¥¥¹…°½İ¹•ÉÌ¸(((ŒŒ€¸äÔØƒŠP‰½Õ¹‘•…¹±”µ‰…Í•ÕÑ¼…Ñ±…Ìì€ĞÀäØµ™…”±¥µ¥ĞƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ€¡	É¥Í‰…¹”¤()UÍ•ÈÉ•ÅÕ•ÍÑÌ…ÕÑ½µ…Ñ¥Œ½¹¹•Ñ•µ™…”ÍÑ¥Ñ¡¥¹œ‘ÕÉ¥¹œ…Ñ±…Ì•¹•É…Ñ¥½¸°„ÁÉ…Ñ¥…°)™…”±¥µ¥Ğ°‰½Õ¹‘•ÉÕ¹Ñ¥µ”°Ñ¡•¸ÍÕ•ÍÑÌ•‘”…¹±”¸±Í¼…Í­Ìİ¡•Ñ¡•È¹…µ•(¹‰½á±…ˆÍ…Ù•Ì…¸½Ù•ÉİÉ¥Ñ”•á¥ÍÑ¥¹œ½İ¹±½…‘Ì™¥±•Ì¸9¼äÔÔ‘•Ù¥”AML¥¹™•ÉÉ•ì(äÔÌÕĞUYÌ¼äÔĞÁ¥­¥¹œ¼äÔÈ•‘¥Ñ½È…•ÁÑ…¹”É•µ…¥¸ÁÉ½Ñ•Ñ•¸()Õ‘¥Ğµ…¥¸ÌäÌäÜáˆÌè½Á±…¹…È…Ñ±…Ì…±É•…‘ä©½¥¹Ì™±…Ğ¡…ÉÑÌÑ¡É½Õ ½É¥¥¹…°)¥¹ÍÁ•Ñ½È…‘©…•¹ä€¬	½àÁÉ½©•Ñ¥½¸°‰ÕĞİ…Ì±…‰•±±•Í•½¹‘…Éä…¹…ÁÁ•ÄÈá™…•Ìì)A…¬½‘•¹Í¥Ñä…±Í¼ÄÈàİ¥Ñ ™¥á•È”…ÁÌ°…¹±½‰…°Á±…¹”Í••Í•…É İ…ÌÅÕ…‘É…Ñ¥Œ¸)I•ÕÍ”M5•á¥ÍÑ¥¹œ‰ÕÑÑ½¸½½İ¹•È…ÌÁÉ¥µ…ÉäÕÑ¼…Ñ±…Ì€¡‰•™½É”•áÁ±¥¥Ğ…”…Ñ±…Ì¤°)…‘©½¥¸…¹±”ÃŠLÌÃ
À½‘•™…Õ±ĞÄÔ¸A$É•…Ñ•½Á±…¹…ÉÑ±…ÍUXÍ¥áÑ ½ÁÑ¥½¹…°…¹±”‘•™…Õ±ÑÌÀ°)ÁÉ•Í•ÉÙ¥¹œ…•ÁÑ•™±…Ğ½ÕÑÁÕÑÌ…¹µ…¹Õ…°äÔÔÁ±…¹”É½ÕÁ¥¹œ¸Ã
À€ô•á…ĞÁÉ¥½È)½Á±…¹…ÈÁ½±¥ä¸A½Í¥Ñ¥Ù”…¹±”É•ÅÕ¥É•Ì	=Q …‘©…•¹Ğ…Ù•É…”™…”µ¹½Éµ…°…¹±”)…¹„™¥á•Í••µ¹½Éµ…°½¹”İ¥Ñ¡¥¸ÕÑ½™˜°½ÁÁ½Í¥Ñ”µ…¹¥™½±•‘”‘¥É•Ñ¥½¹Ì…¹)aP½É¥¥¹…°	½àUX•¹‘Á½¥¹ÑÌ¸9¼‘É¥™Ğ…±½¹œÕÉÙ•¡…¥¹Ì°½½É‘¥¹…Ñ”İ•±‘¥¹œ°)Í•½¹ÑÉ¥…¹Õ±…Ñ½È½…‘©…•¹ä½¡¥ÍÑ½Éä½İ¹•È½È…±±ÌÑ¼µ…¹Õ…°MÑ¥Ñ ¥¸„±½½À¸()Q¡¥Ì¥Ì‰½Õ¹‘•ÁÉ½©•Ñ•µ¡…ÉĞÉ½ÕÁ¥¹œ°¹½Ğ½¹™½Éµ…°Õ¹İÉ…À½É•±…á…Ñ¥½¸½È…É‰¥ÑÉ…Éä)Õ‰”µ¹•ĞÕ¹™½±‘¥¹œ¸¥™™•É•¹Ğ	½à‘¥É•Ñ¥½¹ÌÉ•µ…¥¸Í•…µÌì¡¥¡•È…¹±”µ…äÍÑÉ•Ñ ¸)]…ÉÁ•™…•ÌÍÑ…äÍ•Á…É…Ñ”…ĞÃ
À°µ…ä©½¥¸¥¸…¹±”µ½‘”¥˜½É¥¥¹…°äÔÀÑÉ¥…¹±”½…É•„)Ù…±¥‘…Ñ¥½¸ÍÕ••‘Ì¸9¼Í½ÕÉ”Á½±å½¹Ì½Á½Í¥Ñ¥½¹Ì½É½ÕÁÌ½ÈÁ•ÉÍ¥ÍÑ•¹ĞÍ¡•µ„¡…¹•Ì¸)=É¥¥¹…°ÁÉ¥Ù…Ñ”	½àƒŠHÉ½ÕÁ•‘•¹Í¥ÑäƒŠHA…¬ƒŠH=9¹…Ñ¥Ù”½µµ¥ĞÉ•Ñ…¥¹•¸±°Á…¥¹Ğ)¡…¹¹•±ÌÍÑ¥±°É•ÅÕ¥É”•áÁ±¥¥Ğ±•…ÈÁ…¥¹ĞìÕ¹ÍÕÁÁ½ÉÑ•½ÍÑ…±”½¡¥ÍÑ½Éä½İ½É¬É•™ÕÍ…°)…Ñ½µ¥Œ¸áÁ±¥¥Ğ…”…Ñ±…ÌÉ•Ñ…¥¹Ì½¹”¥Í±…¹Á•È™…”…¹•á…ĞÍµ…±°½ÕÑÁÕÑÌ¸()Ñ±…Ì™…”…ÀĞÀäØ€ ÌË\ÄÈà¤°½É¥¥¹…°ÈÁ,™…”µ½É¹•È‰Õ‘•ĞÉ•Ñ…¥¹•¸M¡…É•A…¬…±°)…¹ÅÕ…±¥é”‘•¹Í¥ÑäÍÕÁÁ½ÉĞĞÀäØ¥Í±…¹‘ÌÍ¼±…É”…Ñ±…ÌÉ•µ…¥¹Ì•‘¥Ñ…‰±”¸5…¹Õ…°äÔÔ)MÑ¥Ñ ÍÑ¥±°¡…Ì¥ÑÌ¥¹‘•Á•¹‘•¹Ğ½¹Í•ÉÙ…Ñ¥Ù”ÄÈàµ™…”Í½Á”¸=É¥¥¹…°€ğôÄÈàµ¥Í±…¹)Á…­¥¹œ…ÀÈ”…¹•á…Ğ½ÕÑÁÕĞÉ•Ñ…¥¹•ì±…É•È±…å½ÕÑÌÕÍ”…À€¸È½•¥°¡ÍÅÉĞ¡½Õ¹Ğ¤¤°)½ÕÑ•Èµ…É¥¸È”°M5‘•Ñ•Éµ¥¹¥ÍÑ¥Œ½µµ½¸µÍ…±”É¥Í•…É €¡…Ğµ½ÍĞĞÀäØ½±Õµ¹Ì¤¸)ĞĞÀäØ¡…ÉÑÌÑ¡¥Ì¥ÍøÌ¸ÉÁà…À½¸ÄÀÈĞµ…ÁÌì¹¼±…É•ÈÑ•áÑÕÉ”É•Í½±ÕÑ¥½¸±…¥µ•¸()M…µ”Á±…¹”½½¹”É½ÕÁ¥¹œ½İ¹•È¹½Ü¥¹‘•á•ÌÍ••‰Õ­•ÑÌ™½È€øÄÈá™…•Ìèµ…ààÄ‰Õ­•Ğ)±½½­ÕÁÌ¼ØĞÍ••…¹‘¥‘…Ñ•ÌÁ•È™…”€ ÈÜ±½½­ÕÁÌ™½ÈÁ½Í¥Ñ¥Ù”…¹±”¤°Ñ¡•¸=I%%90)ÍÑÉ¥ĞÍ••Ñ•ÍÑÌ¸=Ù•É±½…‘•‰Õ­•ÑÌ½¹Í•ÉÙ…Ñ¥Ù•±ä±•…Ù”•áÑÉ„¡…ÉÑÌÍ•Á…É…Ñ”¸)Mµ…±°™¥á•µÁ±…¹”½ÕÑÁÕĞÁ…Ñ Õ¹¡…¹•ì¹¼¥Ñ•É…Ñ¥Ù”ÍÑ¥Ñ¡¥¹œ½É•±…á…Ñ¥½¸½½ÁÑ¥µ…°)Á…­•È¸!½ÍĞÍµ½­”ĞÀäØµ™…”½É¥¥¹…°‘A±…¹”èÄ×
ÀÕÑ¼ÌĞ¸ÙµÌ°Ã
ÀĞĞ¸ÑµÌ±…”ÄØ¸İµÌì)Ñ¡•Í”…É”Í¥¹±”±½…°AT½‰Í•ÉÙ…Ñ¥½¹Ì°9=P¥A…±…Ñ•¹ä½È„Ñ¥µ¥¹œÁÉ½µ¥Í”¸()M•Ù•¸¹•Ü¥¹Ñ•É…Ñ¥½¹Ì½Ù•ÈĞÀäØµ™…”ÕÑ¼½…”°•á…Ğ©½¥¹Ì½•½µ•ÑÉä½Á••È½İ¹•ÉÍ¡¥À¼)É•Á•…Ğ½½¹”¡•­Á½¥¹Ğì±…É”A…¬½‘•¹Í¥Ñä…¹É•‘Õ•İ…ÍÑ•UX…É•„ìİ…ÉÁ•™…±±‰…¬¼)‘¥Í½¹¹•Ñ•Á±…¹•Ìì±¥µ¥ÑÌ½É•™ÕÍ…±Ìì…ÑÕ…°ÄÀÈĞµ™…”¡¥ÍÑ½Éä½Á…¥¹Ğ½M…Ù•=Á•¸½1ì)ÁÉ¥µ…Éä•á¥ÍÑ¥¹œU$½…¹±”™½Éİ…É‘¥¹œì•á…ĞÍ…µ”É•ÅÕ•ÍÑ•‘½İ¹±½…™¥±•¹…µ”Ñİ¥”ì)…¹Í¡…±±½Ü½Í¡…ÉÀ…¹±”Ñ¡É•Í¡½±‘Ì°™¥á•µ½¹”‘É¥™Ğ…¹ÈÔØµ™…”™…ÍĞÁ…Ñ ¸á¥ÍÑ¥¹œ(ÄÈàµ‰½Õ¹‘…ÉäÉ•™ÕÍ…°™¥áÑÕÉ•ÌàäÌ¼àäÔ¼äĞä¼äÔÄ¼äÔÌµ½Ù•Ñ¼ĞÀäÜİ¥Ñ¡½ÕĞ‘É½ÁÁ¥¹œ…¹ä)…Ñ½µ¥¥Ñä…ÍÍ•ÉÑ¥½¸ìÁÉ¥½ÈÄÈàÍÕ•ÍÌÑ•ÍÑÌÉ•Ñ…¥¹•¸äÔÄÁ…¹•°™¥áÑÕÉ”•áÁ±¥¥Ñ±äÃ
À¸)=É¥¥¹…°½Ñ¡•ÈÉÕ¹Ñ¥µ”…±½É¥Ñ¡µÌÉ•Ñ…¥¹•ì™Õ±°…¹ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½İÌ¸()M…Ù”…Õ‘¥ĞèÁÉ½©•Ñ¥±•9…µ”½•áÁ½ÉÑ	…Í¥AÉ½©•Ğ…±É•…‘äÉ•ÅÕ•ÍĞaP¡½Í•¸¹…µ”°)¹¼…ÁÁ•¹‘•½Õ¹Ñ•È¸M…™…É¤½¥=L½İ¹±½…‘Ì½±±¥Í¥½¸¹…µ¥¹œ¥Ì½ÕÑÍ¥‘”Ñ¡¥Ì‘½İ¹±½…)A$¸ÕÉÉ•¹Ğ58ÁÉ¥µ…Éä½µÁ…Ñ¥‰¥±¥Ñä‘…Ñ„É•½É‘ÌÍ¡½İM…Ù•¥±•A¥­•ÈÕ¹ÍÕÁÁ½ÉÑ•)¥¸M…™…É¤½¥=Lì¡É½µ”ÌA$‘½Õµ•¹Ñ…Ñ¥½¸•áÁ±¥¥Ñ±äÍ…åÌ…¹¡½Èµ‘½İ¹±½…™…±±‰…¬)…¹¹½Ğ½Ù•ÉİÉ¥Ñ”¸9¼É¥Í­äÉ•Á±…•µ•¹Ğ½¡¥‘‘•¸¥¹Ñ•É¹…°Í…Ù”½¹•Ü™¥±•ÍåÍÑ•´™•…ÑÕÉ”)…‘‘•¸á¥ÍÑ¥¹œM…Ù”½=Á•¸½½‘•ŒÕ¹¡…¹•ìÉ•É•ÍÍ¥½¸ÁÉ½Ù•ÌÑİ¼¥‘•¹Ñ¥…°É•ÅÕ•ÍÑ•)¹…µ•Ì¸M½ÕÉ•Ì¡•­•ÈÑ=ĞÈÀÈØè)¡ÑÑÁÌè¼½É…Ü¹¥Ñ¡Õ‰ÕÍ•É½¹Ñ•¹Ğ¹½´½µ‘¸½‰É½İÍ•Èµ½µÁ…Ğµ‘…Ñ„½µ…¥¸½…Á¤½]¥¹‘½Ü¹©Í½¸)¡ÑÑÁÌè¼½‘•Ù•±½Á•È¹¡É½µ”¹½´½‘½Ì½…Á…‰¥±¥Ñ¥•Ì½İ•ˆµ…Á¥Ì½™¥±”µÍåÍÑ•´µ…•ÍÌÁ½±å™¥±±¥¹œ()Y%äÔØèÁÉ•Ù¥½ÕÍ±ä½Ù•ÈÄÈàµ™…”Õ¹Á…¥¹Ñ•µ•Í ƒŠH=‰©•ĞUXƒŠHÕÑ¼…Ñ±…ÌÄ×
Àì)¡•¬Ñ¥µ”…¹¡…ÉĞ½Õ¹Ğ¸½µÁ…É”Ã
À¼Ä×
À½¸Í¡…±±½Ü‰•¹‘Ì°Í¡…ÉÁ•È½É¹•ÉÌÉ•Ñ…¥¸)Í•…µÌìÉ•…Ñ•È…¹±•Ìµ…äÍÑÉ•Ñ ¸UX‘¥Ñ½È½A…¬½U¹‘½I•‘¼ìA…¥¹Ğ…¹M…Ù•=Á•¸É•ÍÕ±Ğ¸)9•Ü±¥µ¥ÑÌĞÀäÙ™…•Ì¼ÈÁ-½É¹•ÉÌ°¹½ĞÕ¹±¥µ¥Ñ•¸9•áĞ™½±±½ÜÉ•…°¥A…ÅÕ…±¥Ñä½±…Ñ•¹ä)™••‘‰…¬‰•™½É”‰É½…‘•¹¥¹œÕ¹İÉ…ÀìäÔÔµ…¹Õ…°MÑ¥Ñ ‘•Ù¥”…Ñ”É•µ…¥¹ÌÍ•Á…É…Ñ”¸((ŒŒUÍ•ÈÁÉ½‘ÕĞ‘¥É•Ñ¥½¸ƒŠPA…¥¹Ğ°™…•É½ÕÁÌ…¹É…Á¡¥…°U$ƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äÍ…åÌÑ¡•Í”…É”UQUIU%1%9L°¹½Ğ¥µµ•‘¥…Ñ”É•ÅÕ•ÍÑÌÑ¼¥µÁ±•µ•¹Ğ)…±°½˜Ñ¡•´¥¸äÔØ¸AÉ•Í•ÉÙ”ÕÉÉ•¹Ğ…Ñ±…Ì‰Õ¥±Í½Á”¸ÕÑÕÉ”‘¥É•Ñ¥½¸è(´A…¥¹Ğ™…•É½ÕÁÌ‘¥É•Ñ±ä½¸Ñ¡”µ•Í è…ÍÍ¥¸•á¥ÍÑ¥¹œµ•Í ¹™…•É½ÕÁÌÁ•ÈÁ½±å½¸°(€¹½ĞIÑ•áÑÕÉ”Á¥á•±Ì¸á¥ÍÑ¥¹œ±½¹”½¡¥ÍÑ½Éä½ÁÉ½©•Ğ½=	(½9=4É½ÕÀ½İ¹•ÉÌÍÑ…ä(€…ÕÑ¡½É¥Ñ…Ñ¥Ù”¸I•ÕÍ”ÍÕÉ™…”™…”Á¥­¥¹œ½A•¹¥°½¹…Ù¥…Ñ¥½¸ì„UXµ™É•”É½ÕÀµÑ…É•Ğ(€¹••‘Ì‘•±¥‰•É…Ñ”Ñ…É•ĞÙ…±¥‘…Ñ¥½¸É…Ñ¡•ÈÑ¡…¸ÁÉ•Ñ•¹‘¥¹œÕÉÉ•¹ĞUXÁ…¥¹Ñ•È…±É•…‘ä(€ÍÕÁÁ½ÉÑÌ¥Ğ¸=¹”Í•¹”¡•­Á½¥¹ĞÁ•ÈÍÑÉ½­”ì¹¼Á…É…±±•°µ•Í ½É½ÕÀ½¡¥ÍÑ½Éä­•É¹•°¸(´	É¥¹œÁÉ½‘ÕÑ¥½¸A…¥¹Ğ¥¹Ñ¼µ…¥¹ÍÑÉ•…´…ÁÀ…•ÍÌìÕÉÉ•¹ĞÙ¥•İÁ½ÉĞµÁ…¥¹Ğ¹©Ì±…Õ¹¡•È(€¥Ì¥¸¥±”¸I•½¹¹•Ğ½É¥¥¹…°Á…¥¹Ñ•È½Í•ÍÍ¥½¸°¹½Ğ„Í•½¹Á…¥¹Ñ¥¹œ¥µÁ±•µ•¹Ñ…Ñ¥½¸¸(´½¹Ñ•áÑÕ…°Á…¥¹ĞÉ…‘¥…°™½È‰ÉÕÍ¡•Ì…¹±…å•ÉÌ½µ…Í­Ì°É•Ñ…¥¹¥¹œ½É¥¥¹…°½¹ÑÉ½±Ì¼(€…Ñ¥½¸½İ¹•ÉÌ…¹Ñ¡”…•ÁÑ•±•™Ğ‘½¬Õ¹Ñ¥°‘•±¥‰•É…Ñ•±äµ¥É…Ñ•…¹Ñ•ÍÑ•¸(´5½É”É…Á¡¥…°U$è½¹Í¥ÍÑ•¹Ğ™Õ¹Ñ¥½¸¥½¹Ìİ¥Ñ M510Y%M%	1Ñ•áĞ…ÁÑ¥½¹Ì‰•±½Ü°(€¥¹ÍÁ¥É•‰äÕÍ•ÈÌÕÁ±½…‘•9½µ…MÕ±ÁĞÍÉ••¹Í¡½ĞÁÙÙÌÌ´ÄÀäÜ´ĞÄåµØØ´ÔÉäÑÄáàĞÄ¸(€-••ÀÉ•…‘…‰±”±…‰•±Ì½…•ÍÍ¥‰¥±¥Ñä½Ñ½Õ Ñ…É•ÑÌì½¡•É•¹Ğ¥½¸™…µ¥±ä…¹…Ñ¥Ù”ÍÑ…Ñ”¸(€MÑ…”¡…¹•Ì¥¸Íµ…±°É•Ù¥•İ•ÍÕÉ™…•ÌìÉ•Ñ…¥¸…•ÁÑ•É…‘¥…°±½…Ñ¥½¹Ì°•ÍÑÕÉ•Ì°(€½ÕÌ°¡¥ÍÑ½Éä…¹µ½‘•±±•È‰•¡…Ù¥½È¸9¼İ¡½±•Í…±”É•Í­¥¸…ÕÑ½µ…Ñ¥…±±ä…ÕÑ¡½É¥é•(€…ÌÑ¡”¹•áĞÕ¹Ñ•ÍÑ•¡…¹”¸Q¡•Í”‘¥É•Ñ¥½¹ÌÉ•µ…¥¸¥¸É½…‘µ…À…™Ñ•È…Ñ±…Ì™••‘‰…¬¸()Õ‘¥Ğèµ•Í ¹©ÌÍÑ½É•ÌÍÑÉ¥¹œ½¹Õ±°™…•É½ÕÁÌ…¹ÁÉ•Í•ÉÙ•ÌÑ¡•´½¸±½¹”ì½É¥¥¹…°)™…•É½ÕÀµ½±½ÕÉÌµ½É”‘¥ÍÁ±…åÌÑ¡•´¸AÉ•Ù¥•Ü…±É•…‘ä¡…ÌÍ½ÕÉ”µ™…”ÑÉ¥…¹±”µ…ÁÁ¥¹œ¸(äÔØ‘½•Ì¹½ĞÍ¡¥À™…•É½ÕÀ‰ÉÕÍ¡•Ì°¹•ÜA…¥¹Ğ•¹ÑÉä°Á…¥¹ĞÉ…‘¥…°½È¥½¸É•‘•Í¥¸¸((¸äÔØ™¥¹…°±½…°9½‘”ÈĞ¸Ää¸À™Õ±°É•É•ÍÍ¥½¸è€¨¨ÈÜäØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•¨¨( ÄÀÄ¸ÕÌ¤°½É¥¥¹…°ÈÜàäÁ±ÕÌÍ•Ù•¸¹•Ü…Ñ±…Ì½…¹±”½Í…Ù”µ¹…µ”¡•­Ì¸½ÕÍ•…Ñ±…ÌäĞä¼(äÔÀ¼äÔÄ°ÕĞäÔÌ½ÍÑ¥Ñ äÔÔ°A…¬½‘•¹Í¥Ñä½É•±•…Í”ÔÅAML¸=¹±ä½É¥¥¹…°±¥µ¥Ğµ‰½Õ¹‘…Éä)™¥áÑÕÉ•Ìµ½Ù•Ñ¼É•ÅÕ•ÍÑ•ĞÀäÜì…Ñ½µ¥ŒÉ•™ÕÍ…°…¹ÁÉ¥½ÈÄÈàÍÕ•ÍÌÉ•Ñ…¥¹•¸)=É¥¥¹…°äÔÄÁ…¹•°™¥áÑÕÉ”•áÁ±¥¥Ñ±ä¡½½Í•ÌÃ
ÀÕ¹‘•È¹•ÜU$…¹±”™½Éİ…É‘¥¹œ¸9¼)Í­¥ÁÁ•‰•¡…Ù¥½È¡•­Ì¸I•Ù¥•İ•àµ™¥±”UX½‘½5Õ±Ñ¤½1…ˆÉ•Ù•ÉÍ”…¡”±½ÍÕÉ”äÔØì)µ…¥¸½Á¥­¥¹œäÔĞ½¥éµ¼äÔÔ½İ½É­ÍÁ…”äÔÈ½5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸M…Ù”½=Á•¸½İ¹•È…±Í¼)Õ¹¡…¹•ìM…™…É¤•áÑ•É¹…°µ‘½İ¹±½…½Ù•ÉİÉ¥Ñ”±¥µ¥Ñ…Ñ¥½¸Ù•É¥™¥•™É½´ÁÉ¥µ…ÉäÍ½ÕÉ•Ì¸)!½ÍÑ•½A…•Ì½±¥Ù”ÁÉ½½˜™½±±½İÌ¸9¼äÔÔ½ÈäÔØ‘•Ù¥”AML¥¹™•ÉÉ•¸(((ŒŒ€¸äÔØÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”½µµ¥Ğ˜ÁˆÜäÁ™•ÔÉ•‰™ˆÄäÄØäåÕˆå„ÌÁ•”ÄàÜäÉˆääÕ‰€½¸µ…¥¸ì•á…ĞÑ•ÍÑ•ÑÉ•”)€ÈÜÀÉ‰ˆàÙŒÜØå”á„àÔÑ‰˜äá˜ÌåàÕ…ŒÑ”ĞàÉá€¸1½…°9½‘”ÈĞ¸Ää¸ÀèÈÜäØAML°(À%0¼ÀÍ­¥ÁÁ•€ ÄÀÄÔÀÄ¸ÙµÌ¤ì™½ÕÍ•…Ñ±…Ì½Á…¬½‘•¹Í¥Ñä½É•±•…Í”èÔÄAML¸)!½ÍÑ•9½‘”ÈÈQ½Á½±½äÉ•É•ÍÍ¥½¸ÉÕ¸ĞÀÀĞÜÜÌÌØÀÔ½©½ˆÄÈÀÜÌÌÄàÜÜØĞMUMLè(ÈÜäØAML°À%0¼À…¹•±±•¼ÀÍ­¥ÁÁ•€ ÄĞØĞÈÄ¸ÉµÌ¤°½µÁ±•Ñ•ÈÀÈØ´ÄÀ´ÈÑPÀÄèÀÈèĞÙh¸)¡ÑÑÁÌè¼½¥Ñ¡Õˆ¹½´½É¥Í	•éè½	½á1…ˆ½…Ñ¥½¹Ì½ÉÕ¹Ì¼ĞÀÀĞÜÜÌÌØÀÔ)A…•ÌÉÕ¸ĞÀÀĞÜÜÌÌÌÜÀMUML¸…¡”µ‰ÕÍÑ•ÁÕ‰±¥ŒQÌèÈÀ¼ÈÀ‰åÑ”µ¥‘•¹Ñ¥…°Ñ¼Ñ•ÍÑ•)¡•­½ÕĞ°¥¹±Õ‘¥¹œÙ•ÉÍ¥½¸½¥¹‘•à°…±°àÉ•Ù¥•İ•UX½‘½5Õ±Ñ¤½1…ˆ¡…¹•…ÍÍ•ÑÌ°)É•±•…Í”±½…‘•ÉÌ°ÁÉ½Ñ•Ñ•äÔĞµ…¥¸½Á¥­•È½Ñ½±”½•‘”µÁ…¥¹Ğ°äÔÈİ½É­ÍÁ…”°äÔÔ¥éµ¼°(äÌÀ…”‰…Ñ¡¥¹œ±5Õ±Ñ¤Ä¸À…¹™É½é•¸‰•Ñ„Üµ…É­•È¸¥ÉÍĞÁÉ”µ‘•Á±½åµ•¹ĞPÉ•ÑÕÉ¹•)½±ÉÕ¹Ñ¥µ”ì™É•Í É•ÅÕ•ÍÑÌ…™Ñ•È‘•Á±½åµ•¹Ğµ…Ñ¡••Ù•Éä™¥±”¸9¼µ¥á•±¥Ù”‰Õ¥±¸)¡ÑÑÁÌè¼½¥Ñ¡Õˆ¹½´½É¥Í	•éè½	½á1…ˆ½…Ñ¥½¹Ì½ÉÕ¹Ì¼ĞÀÀĞÜÜÌÌÌÜÀ()I•…‘ä™½ÈY%äÔØèÁÉ•Ù¥½ÕÍ±ä½Ù•ÈÄÈàµ™…”Õ¹Á…¥¹Ñ•µ½‘•°ƒŠH=‰©•ĞUXƒŠHÕÑ¼…Ñ±…Ì(Ä×
Àì¥¹ÍÁ•Ğ¥Í±…¹‘Ì½Ñ¥µ”¸½µÁ…É”Ã
À¼Ä×
ÀÍ¡…±±½Ü‰•¹‘Ì…¹Í¡…ÉÀÍ•…´É•Ñ•¹Ñ¥½¸¸)U¹‘¼½I•‘¼°Á…¥¹Ğ„¹•Üµ…À°Ñ¡•¸€¹‰½á±…ˆM…Ù”½=Á•¸Í¡½Õ±ÁÉ•Í•ÉÙ”UYÌ…¹Á…¥¹Ğ¸(äÔÌ¼äÔĞ¼äÔÈAMLÁÉ½Ñ•Ñ•¸9¼äÔÔ¼äÔØ‘•Ù¥”AML¥¹™•ÉÉ•¸ÕÑÕÉ”™…•É½ÕÀ‰ÉÕÍ¡•Ì°)µ…¥¹ÍÑÉ•…´A…¥¹Ğ…•ÍÌ°Á…¥¹Ğ½±…å•ÈÉ…‘¥…°…¹…ÁÑ¥½¹•¥½¸U$É•µ…¥¸É•½É‘•)É½…‘µ…À‘¥É•Ñ¥½¹Ìì¹½¹”…É”Á…ÉĞ½˜äÔØÉÕ¹Ñ¥µ”¸M…™…É¤½Ù•ÉİÉ¥Ñ”±¥µ¥Ñ…Ñ¥½¸É•µ…¥¹Ì)‰É½İÍ•Èµ½İ¹•ìM…Ù”½=Á•¸™¥±•¹…µ”½İ¹•ÈÕ¹¡…¹•¸½Ìµ½¹±äÁÉ½½˜½µµ¥Ğ™½±±½İÌ¸((ŒŒ€¸äÔÜƒŠPÙ…É¥…‰±”µÍ¥é”Í¡•±˜Á…­¥¹œì€¸äÔØAMLƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸äÔØAML€½¹•áÑ‰Õ¥±ÁÉ½Ñ•ÑÌ…¹±”ÕÑ¼…Ñ±…Ì…¹±…É•È±¥µ¥ÑÌ¸Õ‘¥Ğµ…¥¸(àÉ‘‘˜Á‘”èÁ…­•‘1…å½ÕĞ…±±½…Ñ•Ì¥‘•¹Ñ¥…°•±±ÌÕÍ¥¹œ±…É•ÍĞ¡…ÉĞ‰½Õ¹‘Ìì½É¥¥¹…°)UXİ½É­ÍÁ…”ÍÑ¥±°‘¥Í…‰±•A…¬½‘•¹Í¥Ñä…‰½Ù”ÄÈà‘•ÍÁ¥Ñ”ĞÀäØµ…Á…‰±”½İ¹•È¸)áÑ•¹M5Á…­•‘1…å½ÕĞİ¥Ñ ¡•¥¡Ğ½İ¥‘Ñ ½%Í½ÉÑ•¹•áĞµ™¥ĞÍ¡•±Ù•Ì…¹ÈĞ‰½Õ¹‘•)½µµ½¸µÍ…±”ÑÉ¥…±Ì¸¡½½Í”½¹±ä¥˜½µµ½¸Í…±”ÍÑÉ¥Ñ±ä¥µÁÉ½Ù•Ì½Ù•È½É¥¥¹…°)É¥ì•ÅÕ…°µÍ¥é•¡…ÉÑÌÉ•Ñ…¥¸½É¥¥¹…°É¥¸9¼¡…ÉĞÉ½Ñ…Ñ¥½¸°Í¡…Á”¹•ÍÑ¥¹œ°)É•±…á…Ñ¥½¸°Í•…´¡…¹•Ì½È½ÁÑ¥µ…°µÁ…­¥¹œ±…¥´¸M½ÕÉ”•½µ•ÑÉä…¹½É¥¥¹…°)UX½¡¥ÍÑ½Éä½Á…¥¹ĞÉ•™ÕÍ…°½¹Õµ•É¥Œµ½±±…ÁÍ”Ù…±¥‘…Ñ¥½¸É•Ñ…¥¹•¸±°…±±•ÉÌ€¡ÕÑ¼¼)…”…Ñ±…Ì°A…¬°ÕĞ½MÑ¥Ñ É•Á…¬¤É•ÕÍ”½É¥¥¹…°½İ¹•È¸]½É­ÍÁ…”A…¬½‘•¹Í¥Ñä)¹½Ü•¹…‰±•Ñ¡É½Õ ĞÀäØ¥Í±…¹‘Ì¸5…É¥¸…¹½Õ¹Ğµ‘•Á•¹‘•¹Ğ…ÁÌÕ¹¡…¹•¸)9•ÜÑ•ÍÑÌÙ•É¥™äµ¥á•µÍ¥é”½Ù•É…”°½µµ½¸É•±…Ñ¥Ù”‘•¹Í¥Ñä°Í•Á…É…Ñ¥½¸°‰½Õ¹‘Ì°)‘•Ñ•Éµ¥¹¥Í´°•ÅÕ…°µÍ¥é”™…±±‰…¬…¹…ÑÕ…°İ½É­ÍÁ…”ÄÈä¼ĞÀäØ¼ĞÀäÜ½¹ÑÉ½°…Ñ¥¹œ¸)Y…±¥‘…Ñ¥½¸è™Õ±°ÍÕ¥Ñ”ÈÜäİAML¼Á%0¼ÁÍ­¥À€ äà¸áÌ¤°Á±ÕÌÑİ¼¹•ÜÍ¡•±˜Ñ•ÍÑÌ)AMLÍ•Á…É…Ñ•±ä€¡…‘‘•…™Ñ•È™Õ±°ÉÕ¸•¹Õµ•É…Ñ•™¥±•Ì¤ìÈÜää‘¥ÍÑ¥¹ĞÑ•ÍÑÌ½Ù•É•¸)I•±•…Í”­¹•ÜÁ…­¥¹œ½İ½É­ÍÁ…”™½ÕÍ•ÄÅAML¸9¼…ÍÍ•ÉÑ¥½¹ÌÉ•µ½Ù•½É•±…á•¸)AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”…ŒÙ„ÈİŒÈĞààÜÀÁ…”İŒÈàåŒÅÁ™”ÌĞÄá”ĞÅÌÜÀì•á…ĞÑ•ÍÑ•ÑÉ•”)ŒÁˆÄÉÅˆÙ…‰™”ÜáŒØĞÌå……ˆÈàÀÁ™‘á‰ˆÈØÕ„ÀÙ•É¥™¥•‰•™½É”ÕÁ‘…Ñ¥¹œµ…¥¸¸)A…•ÌĞÀÀØÜÔÄÔÜÀÈMUMLìÄÈ¼ÄÈÁÕ‰±¥Œ™¥±•Ì‰åÑ”µµ…Ñ €¡…±°¡…¹•ÉÕ¹Ñ¥µ”½…¡”)±½…‘•ÉÌÁ±ÕÌÁÉ½Ñ•Ñ•µ…¥¸äÔĞ½5Õ±Ñ¤Ä¸À¤¸!½ÍÑ•É•É•ÍÍ¥½¸ĞÀÀØÜÔÄÔäØÈ½©½ˆÄÈÀÜäÌÜÔØÌÜÔMUMLì½µÁ±•Ñ”¡½ÍÑ•±½Ì)Ù•É¥™äÈÜäåAML¼Á%0¼ÁÍ­¥À¸1½…°™Õ±°…¹™½ÕÍ•¡•­Ì…‰½Ù”Á…ÍÍ•¸)9¼‘•Ù¥”äÔÜAML¥¹™•ÉÉ•¸½Ìµ½¹±äÁÉ½½˜½µµ¥Ğ™½±±½İÌìÉÕ¹Ñ¥µ”Õ¹¡…¹•¸)I•Ù¥•İ•É•Ù•ÉÍ”…¡”É…Á äÔÜìµ…¥¸äÔĞ½Á¥­•ÈäÔĞ½¥éµ¼äÔÔ½5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸)Y%äÔÜèÕ¹Á…¥¹Ñ•Ù…É¥•µÍ¥é”µ•Í ƒŠHÕÑ¼…Ñ±…ÌƒŠH¥¹ÍÁ•ĞÁ…­¥¹œì•á¥ÍÑ¥¹œUX)±…å½ÕĞƒŠHA…¬…±°ìU¹‘½I•‘¼ìÁ…¥¹ĞÑ¡•¸M…Ù•=Á•¸¸A…¥¹Ñ•Ñ…É•ÑÌÉ•ÅÕ¥É”±•…ÈÁ…¥¹Ğ)‰•™½É”UXÉ•Á…­¥¹œ¸	¥•È¡…ÉĞ‰½Õ¹‘¥¹œ‰½á•Ì‘¼¹½ĞÕ…É…¹Ñ•”Ñ¥¡Ğ½¹…Ù”¹•ÍÑ¥¹œ¸)9•áĞ™½±±½Ü…ÑÕ…°Á…­¥¹œÅÕ…±¥Ñä½‘•Ù¥”Ñ¥µ¥¹œ‰•™½É”‰É½…‘•ÈÕ¹İÉ…À½ÈU$¡…¹•Ì¸((ŒŒ€¸äÔàƒŠPUXÁ½ÁÕÀ±¥ÁÁ¥¹œ½¹Ñ…¥¹µ•¹ĞƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÍÉ••¹Í¡½Ğå	Øå½¸äÔÜÍ¡½İÌÉ¥¡ĞÑ½½±‰…È…¹‰½ÑÑ½´ÍÑ…ÑÕÌ‘¥Í…ÁÁ•…É¥¹œ)…ĞÑ¡”M5Ù•ÉÑ¥…°‰½Õ¹‘…Éäİ¡¥±”UXQ==1LÁ½ÁÕÀ¥Ì½Á•¸°‰•™½É”UX]½É­ÍÁ…”¸)9½ĞÍÑ…±”Í¡•±°ì¹½Ğ•Ù¥‘•¹”……¥¹ÍĞäÔÜÁ…­¥¹œ¸9¼äÔÜ‘•Ù¥”AML¥¹™•ÉÉ•¸)Õ‘¥ĞÍ¡…É•Ñ½½°µÍ•ÍÍ¥½¸µÕ¤‰•¥¸èUXÑ½½±ÌÕÍ•ÌÑÉ…¹Í™½Éµ•ÍÉ½±±¥¹œÍ¡…É•‘½¬¸)á¥ÍÑ¥¹œäÔÈ]½É­ÍÁ…”Í¥‰±¥¹œ™¥à‘½•Ì¹½Ğ…ÁÁ±äÑ¼Ñ¡¥ÌÁÉ••‘¥¹œÁ½ÁÕÀ¸)9…ÉÉ½Üµ¥Ñ¥…Ñ¥½¸è½É¥¥¹…°UXµÑ½½±Ì¡½ÍĞÕÍ•Ì±•™Ğ½É¥¡ĞáÁà€¬…ÕÑ¼µ…É¥¹Ì¥¹ÍÑ•…)½˜ÑÉ…¹Í±…Ñ•`•¹ÑÉ¥¹œ°±½…°¥Í½±…Ñ¥½¸…¹±…å½ÕĞ½Á…¥¹Ğ½¹Ñ…¥¹µ•¹Ğ¸=É¥¥¹…°¹½‘•Ì°)±¥ÍÑ•¹•ÉÌ°İ¥‘”‰½‘ä½…Ñ¥½¹Ì°¡¥ÍÑ½Éä…¹…±°UX…±½É¥Ñ¡µÌÕ¹¡…¹•¸±•…ÈÑ¡•Í”)UXµ½¹±äÍÑå±•Ì‰•™½É”Ñ¡”¹•áĞ‘½¬€¡¥¹±Õ‘¥¹œ±•™ĞA…¥¹Ğ¤ì½É‘¥¹…ÉäÑ½½±Ì­••À)Í¡…É•Á±…•µ•¹Ğ¸9¼¹•Ü•‘¥Ñ½È°Á½¥¹Ñ•È±¥ÍÑ•¹•È°É•Í¥é”Á½±±¥¹œ½Èèµ¥¹‘•à•Í…±…Ñ¥½¸¸)á…Ğ¥A…½]•‰-¥Ğ½µÁ½Í¥Ñ½È™…¥±ÕÉ”¥Ì9=PÉ•ÁÉ½‘Õ•¡•É”ìÑ¡¥Ì¥Ì„Ñ…É•Ñ•)½¹Ñ…¥¹µ•¹ĞÉ•Á…¥ÈÉ•ÅÕ¥É¥¹œ‘•Ù¥”…•ÁÑ…¹”°¹½Ğ„ÁÉ½Ù•¸‰É½İÍ•Èµ•¹¥¹”‘¥…¹½Í¥Ì¸)9•ÜÑ•ÍĞ•á•ÕÑ•Ì½É¥¥¹…°‰•¥¸™½ÈU[ŠIA…¥¹ÓŠI½É‘¥¹…ÉäÑ½½°…¹Ù•É¥™¥•ÌÍ½Á•±¥À°)ÑÉ…¹Í™½É´µ™É•”UXÁ±…•µ•¹Ğ…¹ÍÑå±”±•…¹ÕÀ¸I•±•…Í”½¹ÑÉ…Ğ½…¡”­•åÌÉ•Ù¥•İ•äÔàì)µ…¥¸äÔĞ½Á¥­•ÈäÔĞ½5Õ±Ñ¤Ä¸À½™É½é•¸…¹äÔÜÁ…­¥¹œ½İ½É­ÍÁ…”Õ¹¡…¹•¸)Y%äÔàèÉ•Á•…Ğ=‰©•ÓŠIUX…¹±½Í”°İ…Ñ ™Õ±°Ñ½ÀµÉ¥¡ĞÑ½½±‰…È½ÍÑ…ÑÕÌìÕÑ¼…Ñ±…Ì°)=Á•¸UX‘¥Ñ½ËŠI	…¬Ñ¼Í°Ñ¡•¸A…¥¹Ğ…¹…¹½Ñ¡•ÈÑ½½°Ñ¼¡•¬Á½ÁÕÀÁ½Í¥Ñ¥½¹Ì¸)9•áĞ…ÑÕ…°äÔà¥A…±¥ÁÁ¥¹œÉ•Ñ•ÍĞ‰•™½É”™ÕÉÑ¡•ÈÕ¹É•±…Ñ•‘•Ù•±½Áµ•¹Ğ¸)%¹¥Ñ¥…°™Õ±°ÉÕ¸™½Õ¹½¹”½±ÜÄÄ…ÍÍ•ÉÑ¥½¸É•ÅÕ¥É¥¹œ±•™ĞÔÀ”™½ÈUX…Ìİ•±°…Ì)½É‘¥¹…ÉäÑ½½±ÌìÕÁ‘…Ñ•½¹±äUX•áÁ•Ñ…Ñ¥½¸Ñ¼¥¹Í•ĞáÁà½É¥¡ĞáÁà½¹¼µÑÉ…¹Í™½É´°)É•Ñ…¥¹¥¹œ•Ù•Éä½Ñ¡•È±…Õ¹ ½±½Í”½¡¥ÍÑ½Éä¡•¬¸½ÕÍ•ÈÁAML¸¥¹…°™Õ±°µÉÕ¸ÈàÀÁAML¼Á%0¼ÁÍ­¥À€ äĞ¸äÕÌ¤¸AÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½İÌ¸9¼äÔÜÁ…­¥¹œÍ½ÕÉ”¡…¹•¸((¸äÔàÁÕ‰±¥…Ñ¥½¸èÉÕ¹Ñ¥µ”á‘•‰„ĞÅÄÕÀØàÈÕÈá”ÀÄäÕ™”ĞàÙ”ÁÄĞäåˆå”Ô½¸µ…¥¸¸)Q•ÍÑ•ÑÉ•”É„àÀÙ„ÌĞÜÌÕÀĞÕ”ÀÔİˆÉˆÙ˜ÈÈÑ”ÈÁ„ØÁ‰…µ…Ñ¡•ÕÁ±½…‘•¥ĞÑÉ•”•á…Ñ±ä¸)1½…°™¥¹…°ÈàÀÁAML¼Á%0¼ÁÍ­¥Àì™½ÕÍ•ÈÁAML¸A…•ÌĞÀÀØàÔàÜØàÀMUML¸)±°ÄÌ¡•­•ÁÕ‰±¥Œ™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•¡•­½ÕĞèÍ¡•±°½Ù•ÉÍ¥½¸½¹•ÜÍ•ÍÍ¥½¸U$°)É•Ñ…¥¹•äÔÜUX½Á…­¥¹œ½±½…‘•ÉÌ…¹ÁÉ½Ñ•Ñ•µ…¥¸äÔĞ½5Õ±Ñ¤Ä¸À¸9¼Á…­¥¹œ…±½É¥Ñ¡´)¡…¹•ÌäÔà¸!½ÍÑ•É•É•ÍÍ¥½¸ĞÀÀØàÔààÄäÔ½©½ˆÄÈÀÜäØäĞÄÀÈĞMUMLèÈàÀÁAML¼Á%0¼ÁÍ­¥À¸)ÑÕ…°¥¹Ñ•Éµ¥ÑÑ•¹Ğ¥A…™…¥±ÕÉ”¹½ĞÉ•ÁÉ½‘Õ•ìY%äÔàÁ½ÁÕÀ½¡•…‘•È½ÍÑ…ÑÕÌÉ•Ñ•ÍĞ)É•ÅÕ¥É•¸9¼äÔÜ¼äÔà‘•Ù¥”AML¥¹™•ÉÉ•¸½Ìµ½¹±äÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½İÌ¸((ŒŒ€¸äÔäƒŠPÉ•½¹¹•ĞÁÉ½‘ÕÑ¥½¸A…¥¹Ğ¥¸=‰©•ĞÉ…‘¥…°ì€¸äÔàAMLƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäÔàAML€½¹•áÑ‰Õ¥±ÁÉ½Ñ•ÑÌUXµÁ½ÁÕÀ½¡•…‘•È½ÍÑ…ÑÕÌ±¥ÁÁ¥¹œÉ•Á…¥È…¹ÍÑå±”)±•…¹ÕÀ…É½ÍÌU[ŠIA…¥¹ÓŠI½É‘¥¹…ÉäÑ½½±Ì¸AÉ¥½ÈÁ•¹‘¥¹œäÔà‘•Ù¥”¹½Ñ•ÌÍÕÁ•ÉÍ•‘•¸)Õ‘¥Ğµ…¥¸àÔÔĞÑ„İ”è½É¥¥¹…°½‰©•ĞµÉ…‘¥…°µÍ•ÍÍ¥½¸…±É•…‘äµ…ÁÌUXA…¥¹ĞÑ¼½É¥¥¹…°)Ù¥•İÁ½ÉÑA…¥¹Ñ	Ñ¸½ÕØµÁ…¥¹Ğ½}}‰½á±…‰Y¥•İÁ½ÉÑA…¥¹Ğ°‰ÕĞÑ½Ñ…°µ¥éµ¼É¥¹œ½µ¥ÑÑ•‰ÕÑÑ½¸¸)‘UXA…¥¹Ğ…Ğ½ÕÑ•ÈĞ×
ÀÉ…‘¥ÕÌÈÌÀì•Ù•Éä•á¥ÍÑ¥¹œÍ•Ñ½ÈÍÑ…åÌ¥¸Á±…”¸=É¥¥¹…°)…‘…ÁÑ•È±…Õ¹¡•ÌM5ÁÉ½‘ÕÑ¥½¸Á…¥¹Ñ•È°½İ¹Ì…¹•±±…Ñ¥½¸½½µÁ±•Ñ¥½¸½¥éµ¼¡¥‘”ì)•á¥ÍÑ¥¹œ¥±”±…Õ¹¡•ÈÉ•Ñ…¥¹•¸A…¥¹Ñ•È½Á•¹Ì±•™Ğ‘½¬…¹•¹™½É•Ì½É¥¥¹…°½¹”)…Ñ¥Ù”¥¹‘•Á•¹‘•¹ĞUX½‰©•Ğ½Á…¥¹ĞÑ…É•ĞÕ…É‘Ì¸9¼¹•Ü‰ÉÕÍ ½±…å•È½¡¥ÍÑ½Éä½¥¹ÁÕĞ)½İ¹•È°¹¼Á…¥¹Ñ•È¡…¹•Ì½È¥½¸½Ù•É¡…Õ°¸=É¥¥¹…°±•™ĞA…¥¹Ğ•á•ÁÑ¥½¸É•Ñ…¥¹•¸)áÑ•¹½É¥¥¹…°ÜÄÄ¥¹Ù•¹Ñ½Éä½±…Õ¹ ½±½Í”½ÍÁ…¥¹œ™¥áÑÕÉ”İ¥Ñ UXA…¥¹Ğì±•™ĞáÁà)•áÁ•Ñ…Ñ¥½¸¥¹±Õ‘•Ì½É¥¥¹…°A…¥¹Ğ‘½¬°…±°½±…ÍÍ•ÉÑ¥½¹Ì…¹Á½Í¥Ñ¥½¹ÌÉ•Ñ…¥¹•¸)1½…°™Õ±°ÈàÀÁAML¼Á%0¼ÁÍ­¥À€ äÔ¸äåÌ¤ì™½ÕÍ•ÄåAML°™¥¹…°É…‘¥…°ÄÑAML¸)9¼…ÍÍ•ÉÑ¥½¹ÌÉ•µ½Ù•¸AÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½İÌ¸=¹±äÉÕ¹Ñ¥µ”™Õ¹Ñ¥½¹…±¥Ñäè½¹”É…‘¥…°)‰ÕÑÑ½¸ìÍ¡•±°½É•½Ù•Éä½¥éµ¼…¡”Á¥¸äÔä…¹É•Ù¥•İ•…ÍÍ•Ğ½¹ÑÉ…Ğ¸M•ÍÍ¥½¸äÔà°)µ…¥¸äÔĞ½Á¥­•ÈäÔĞ½5Õ±Ñ¤Ä¸À½UXäÔÜ½Á…­¥¹œ½™É½é•¸Õ¹¡…¹•¸)Y%äÔäèÍ•±•Ğ½¹”UX½‰©•ĞƒŠH=‰©•ĞÉ…‘¥…°ƒŠHUXA…¥¹Ğ€¡½ÕÑ•ÈÕÁÁ•ÈµÉ¥¡Ğ¤ì)A•¹¥°Á…¥¹Ğ°™¥¹•ÉÌ½É‰¥Ğ½Á…¸½Á¥¹ °U¹‘½I•‘¼ÍÑ…åÌ¥¸A…¥¹Ğì½¹—ŠIÉ…‘¥…³ŠIÉ•½Á•¸)Í…µ”±…å•ÉÌ¸QÉäUXÁ½ÁÕÃŠI±½Í—ŠIA…¥¹Ğ…¹A…¥¹ÓŠI½¹—ŠI…¹½Ñ¡•ÈÑ½½°¸M…Ù•=Á•¸É•Ñ…¥¹Ì)Á…¥¹Ğ¸¥±”A…¥¹Ğ•¹ÑÉäÍÑ¥±°İ½É­Ì¸%¹Ù…±¥½¹¼µUXÑ…É•ÑÌÉ•Ñ…¥¸½É¥¥¹…°É•™ÕÍ…°¸)9•áĞ™••‘‰…¬½¸µ…¥¹ÍÑÉ•…´…•ÍÌ‰•™½É”„Í•Á…É…Ñ”Á…¥¹ĞµÑ½½°½±…å•ÈÉ…‘¥…°‰Õ¥±¸((¸äÔäÉÕ¹Ñ¥µ”ÔİˆÅ„Õ”àÙ…‘‘˜ÁàÜÕ”Ìå™…‘äÑ™”á…ŒÌàÀààÁÕ‰±¥Í¡•½¸µ…¥¸ìÕÁ±½…‘•)ÑÉ•”ÁàÁˆİ˜ÍŒÈÕ”àÀÕ”åˆĞÈÈÀÜÙ”ÔÄäÈÄĞÜÍ•„ÕØØ•á…Ñ±ä•ÅÕ…±ÌÑ•ÍÑ•±½…°ÑÉ•”¸)1½…°ÈàÀÁAML¼Á%0¼ÁÍ­¥À°™½ÕÍ•ÄåAML°™¥¹…°¥¹Ù•¹Ñ½Éä½±¥™•å±”ÄÑAML¸!½ÍÑ•)É•É•ÍÍ¥½¸ĞÀÀØäÄĞÄÄØÄ½©½ˆÄÈÀÜäàÔäÀÄÜÄMUMLèÈàÀÁAML¼Á%0¼ÁÍ­¥Àì)A…•ÌĞÀÀØäÄĞÀäÈĞMUML¸)±°ÄØ¡•­•ÁÕ‰±¥Œ™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•¡•­½ÕĞ€¡Í¡•±°½Ù•ÉÍ¥½¸½¹•Ü¥éµ¼°)½É¥¥¹…°Á…¥¹Ñ•È½…‘…ÁÑ•È½Í•ÍÍ¥½¸äÔà½UXäÔÜ½Á…­¥¹œ½µ…¥¸äÔĞ½5Õ±Ñ¤Ä¸À…¹±½…‘•ÈÉ…Á ¤¸)UÍ•ÈäÔàAML•áÁ±¥¥Ñ±äÁÉ½Ñ•Ñ•ìäÔä¡…¹‘Ìµ½¸…Ñ”É•µ…¥¹ÌÍ•Á…É…Ñ”¸9¼äÔÜÁ…­¥¹œ)AML¥¹™•ÉÉ•…¹¹¼Á…­¥¹œ½Á…¥¹Ğ½UX½Í•ÍÍ¥½¸…±½É¥Ñ¡´¡…¹•¥¸äÔä¸((ŒŒ€¸äØÀƒŠP…ÁÑ¥½¹•‰ÉÕÍ µÑ½½°É…‘¥…°¥¸A…¥¹Ğ‘½¬ì€¸äÔäAMLƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäÔäAML€½¹•áÑ‰Õ¥±ÁÉ½Ñ•ÑÌ½É¥¥¹…°=‰©•ĞÉ…‘¥…°UXA…¥¹Ğ…•ÍÌ…¹…•ÁÑ•(äÔà±¥ÁÁ¥¹œ™¥à¸Õ‘¥ĞÕÉÉ•¹ĞÀäå˜ÄÄİèÁ…¥¹Ñ•ÈÌÁ…¥¹Ğµ…Ñ¥½¸Í•±•Ğ½İ¹ÌÑ½½°)Í•ÑÑ¥¹Ì½¡…¹”…¹•±±…Ñ¥½¸°	ÉÕÍ ½¥±°½É…Í•È½MµÕ‘”½	±ÕÈ…±É•…‘ä¥µÁ±•µ•¹Ñ•¸)I•Á±…”Ù¥Í¥‰±”Í•±•Ğİ¥Ñ ¹…Ñ¥Ù”‘•Ñ…¥±Ì	ÉÕÍ Ñ½½±ÌÁ¥­•È¥¸M5A…¥¹Ğ‘½¬ì)½É¥¥¹…°Í•±•ĞÉ•µ…¥¹Ì¡¥‘‘•¸…ÌÍ•ÑÑ¥¹Ì½•Ù•¹Ğ½İ¹•È¸¥Ù”ØÛ\ÔÉÁà‰ÕÑÑ½¹Ì½¸„(ÈÈÁÁàÉ…‘¥…°°MY™Õ¹Ñ¥½¸¥½¹Ì…¹Ù¥Í¥‰±”…ÁÑ¥½¹ÌìÍ•±•Ñ•…É¥„µÁÉ•ÍÍ•¡¥¡±¥¡Ğ)…¹½±±…ÁÍ•ÕÉÉ•¹ĞµÑ½½°…ÁÑ¥½¸¸… ±¥¬¡•­Ì½É¥¥¹…°…Ñ¥Ù”½‘¥Í…‰±•…Ñ”°)Í•ÑÌ½É¥¥¹…°Í•±•Ğ…¹‘¥ÍÁ…Ñ¡•ÌM5¡…¹”•Ù•¹Ğ€¡±•…ÈÍÑ…•¥µ…”½…¹•°±¥Ù”)ÍÑÉ½­”½Íå¹Œ½¹ÑÉ½±Ì¤¸A¥­•È±½Í•Ì½¸¡½¥”…¹Í•ÍÍ¥½¸•¹¸<‘¥Í…‰±•Í•±•Ñ¥½¸)¥Ìµ¥ÉÉ½É•¸9¼¹•ÜÙ¥•İÁ½ÉĞ¥¹ÁÕĞ°‰ÉÕÍ É…ÍÑ•È½¡¥ÍÑ½Éä½Á…¥¹ĞÉ•Í½ÕÉ”½È±…å•È½İ¹•È¸)•ÁÑ•±•™Ğ‘½¬½™½½Ñ•È½±…å•ÉÌ½Í•ÑÑ¥¹Ì½•ÍÑÕÉ”½Ñ½½°Á½Í¥Ñ¥½¹ÌÉ•Ñ…¥¹•¸9¼±…å•È)É…‘¥…°°™…•É½ÕÁÌ½È‰É½…É•Í­¥¸¥¸äØÀìÍÑ…•É…Á¡¥…°U$½¹±ä½¸Ñ¡•Í”ÔÑ½½±Ì¸)Qİ¼…ÑÕ…°ÁÉ½‘ÕÑ¥½¸U$¥¹Ñ•É…Ñ¥½¹Ìè…±°ÔÑ½½±Ì½…ÁÑ¥½¸½Í•±•Ñ¥½¸½‰±ÕÈ½¹ÑÉ½±Ì¼)¹¼¡¥ÍÑ½Éä…¹‘¥Í…‰±•É•™ÕÍ…°ì±¥Ù”A•¹¥°ÍÑÉ½­—ŠIÉ…‘¥…°Íİ¥Ñ …¹•±Ì½É¥¥¹…°)½¹Ñ…Ğİ¡¥±”É•Ñ…¥¹¥¹œ½µµ¥ÑÑ•Á…¥¹Ğ½¡¥ÍÑ½Éä…¹¹…Ù¥…Ñ¥½¸¸%¹¥Ñ¥…°¹•Ü™¥áÑÕÉ”)É•……É¥„µÁÉ•ÍÍ•™É½´ÁÉ½Á•ÉÑä¥¹ÍÑ•…½˜•á¥ÍÑ¥¹œ…ÑÑÉ¥‰ÕÑ•Ìµ…Àì½ÉÉ•Ñ•Ñ•ÍĞ)…•ÍÌ°¹¼ÁÉ½‘ÕÑ¥½¸İ½É­…É½Õ¹½È½É¥¥¹…°…ÍÍ•ÉÑ¥½¸É•µ½Ù•¸9•Ü­É•±•…Í”İAML°)½É¥¥¹…°äÀÀU$½½É”­É•±•…Í”ÄÉAML¸Õ±°±½…°ÈàÀÉAML¼Á%0¼ÁÍ­¥À€ äÜ¸ÈÁÌ¤ìÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½İÌ¸)Y%äØÀè=‰©•ÓŠIUXA…¥¹ÓŠI	ÉÕÍ Ñ½½±Ìì¥¹ÍÁ•Ğ¥½¹Ì½…ÁÑ¥½¹Ì°Á¥¬	ÉÕÍ ½É…Í•È¼)¥±°½	±ÕÈ½MµÕ‘”ìÁ¥­•È½±±…ÁÍ•Ì…¹ÕÉÉ•¹ĞÑ½½°…ÁÑ¥½¸™½±±½İÌ¸A…¥¹Ğ½U¹‘½I•‘¼°)™¥¹•È¹…Ù¥…Ñ¥½¸ì½¹—ŠIÉ•½Á•¸…¹Ù•É¥™ä½µÁ…Ğ‘½¬½±…å•ÉÌ¸UXÁ½ÁÕÀ±¥ÁÁ¥¹œ)…¹äÔä=‰©•ĞÉ…‘¥…°•¹ÑÉäÉ•µ…¥¸ÁÉ½Ñ•Ñ•¸9•áĞ™••‘‰…¬‰•™½É”±…å•È½µ…Í¬É…‘¥…°¸((¸äØÀÁÕ‰±¥…Ñ¥½¸èÉÕ¹Ñ¥µ”ØÅ˜åÅˆÜäĞÑ™„ÌĞÄİŒàØÌå”ÜÉ…”ÌÌäÑˆĞÌÑ”ÑˆÑˆ½¸µ…¥¸ì)•á…ĞÑ•ÍÑ•ÑÉ••ˆÉ…áŒàÕ”ÜàÜÔÀåÙ”ÍˆÙŒÙ™ŒÍàĞÕ˜ÄÀØäÔàÁ˜µ…Ñ¡•¥ĞÕÁ±½…¸)1½…°ÈàÀÉAML¼Á%0¼ÁÍ­¥À€ äÜ¸ÈÁÌ¤ì¹•Ü½É•±•…Í”İAML…¹½É¥¥¹…°äÀÀ½É•±•…Í”ÄÉAML¸)A…•ÌĞÀÀÜÄĞĞÈØÄäMUMLìÄØ¼ÄØ¡•­•ÁÕ‰±¥Œ™¥±•Ì‰åÑ”µ¥‘•¹Ñ¥…°Ñ¼Ñ•ÍÑ•¡•­½ÕĞè)Í¡•±°½Ù•ÉÍ¥½¸½¹•ÜÁ…¥¹Ñ•È°É•Ñ…¥¹•äÔä¥éµ¼½…‘…ÁÑ•È°äÔàÍ•ÍÍ¥½¸¡½ÍĞ°äÔÜUX½Á…­¥¹œ¼)±½…‘•ÉÌ°µ…¥¸äÔĞ½5Õ±Ñ¤Ä¸À…¹±…ˆÉ…Á ¸!½ÍÑ•ĞÀÀÜÄĞĞÈØÔà½©½ˆÄÈÀàÀÔÔĞĞÈàÄMUMLèÈàÀÉAML¼Á%0¼ÁÍ­¥À¸)UÍ•ÈäÔåAMLÁÉ½Ñ•Ñ•¸Y%äØÀ¥½¸ÍÁ…¥¹œ½Í•±•Ñ¥½¸½Á…¥¹Ğ½¹…Ù¥…Ñ¥½¸½¡¥ÍÑ½Éä)…•ÁÑ…¹”Á•¹‘¥¹œì¹¼‘•Ù¥”AML¥¹™•ÉÉ•¸=É¥¥¹…°±…å•È½µ…Í¬½¹ÑÉ½±ÌÉ•µ…¥¸¸((ŒŒ€¸äØÄƒŠP‰½Õ¹¡¥‘‘•¸¥éµ¼ÁÉ½©•Ñ¥½¸…¹MY½µÁ½Í¥Ñ½ÈÍÕÉ™…”ì€¸äØÀÉ…‘¥…°AML((ÈĞ=Ñ½‰•ÈÈÀÈØ¸UÍ•ÈäØÀAML™½È‰ÉÕÍ É…‘¥…°ìÍ•Á…É…Ñ•±äÉ•Á½ÉÑÌ¥…¹ĞÉ•½É••¸)±¥¹•Ì…™Ñ•ÈA…¥¹Ğ½¹”…¹É•ÕÉÉ¥¹œÉ¥¡ĞµÍ¥‘”U$‘¥Í…ÁÁ•…É…¹”™½±±½İ¥¹œUXÑ½½±Ì¼)µ…ÀÙ¥•İÌ°¡…¹¥¹œ…Ì¥éµ¼½½‰©•Ğ½É‰¥ÑÌ…É½ÍÌÍÉ••¸¸AÉ¥½ÈäÔà±¥ÁÁ¥¹œAML¥Ì)¡¥ÍÑ½É¥…°ìÉ•ÕÉÉ•¹”¥Ì=A8…¹¹½Ğ‘¥Íµ¥ÍÍ•‰äÁÉ¥½ÈAML½È9½‘”É•ÍÕ±ÑÌ¸)I•Ù¥•İ•ÕÁ±½…‘•ÅĞĞäàÀÍÉ••¹Í¡½Ğ…¹ä¸İÌMÉ••¹I•½É‘¥¹œÄÜ´ÄÄ´ÌÔ™É…µ•ÌÅÌ¼İÌ¸)Y¥‘•¼Í¡½İÌ±¥Ù”µ½‘•°½¥éµ¼İ¡¥±”¡•…‘•È½½‰©•ĞU$‘¥Í…ÁÁ•…ÉÌ¸á…Ğ¥A…½µÁ½Í¥Ñ½È)™…Õ±ĞÉ•µ…¥¹ÌÕ¹É•ÁÉ½‘Õ•±½…±±äì‘¼¹½Ğ±…¥´„ÁÉ½Ù•¸]•‰-¥Ğ•¹¥¹”‘¥…¹½Í¥Ì¸)Õ‘¥ĞÕÉÉ•¹ĞÄÍ„ÁˆÑ„äèÑ½Ñ…°µ¥éµ¼Íå¹ŒÍ•ÑÌÉ½½Ğ¹¡¥‘‘•¸‘ÕÉ¥¹œA…¥¹Ğ‰ÕĞÍÑ¥±°…±±Ì)Íå¹á¥ÍY¥ÍÕ…±Ì¸ÁÉ½©•Ñ•‘I¥¹A…Ñ ÕÍ•ÌM%iÄäØ½µ…à Ä±¡¥‘‘•¹I•Ğ¹İ¥‘Ñ À¤è¡¥‘‘•¸)ÁÉ½©•Ñ¥½¸µ…¹¥™¥•ÌÉ¥¹œ½½É‘¥¹…Ñ•ÌÄäÛ\ìÉ½½Ğ‘É½ÀµÍ¡…‘½Ü™¥±Ñ•È…¹½Ù•É™±½İ¥¹œ)µ…¥¸MY…±±½Ü•¹½Éµ½ÕÌÁ…¥¹Ğ½™¥±Ñ•È‰½Õ¹‘Ì¸	½Ñ ™…¥±ÕÉ•ÌÁ±…ÕÍ¥‰±äÍ¡…É”Ñ¡¥Ì)Õ¹‰½Õ¹‘•ÁÉ•Í•¹Ñ…Ñ¥½¸ÍÕÉ™…”°Õ¹±¥­”ÁÉ•Ù¥½ÕÌÁ½ÁÕÀµ½¹±äµ¥Ñ¥…Ñ¥½¸¸)I•Á…¥ÈM5¥éµ¼½İ¹•Èè¹¼…á¥ÌÕÁ‘…Ñ”İ¡¥±”¡¥‘‘•¸ìÁÉ½©•Ñ•‘I¥¹A…Ñ É•ÑÕÉ¹Ì•µÁÑä)™½È¡¥‘‘•¸½é•É¼½¹½¹™¥¹¥Ñ”‘¥µ•¹Í¥½¹Ì½È…¹ä¹½¹™¥¹¥Ñ”½½ÕĞµ½˜µ±½…°ÄäÛ\ÄäØÉ¥¹œÁ½¥¹Ğ¸)••¹•É…Ñ”É¥¹Ì±•…È‰½Ñ Ù¥Í¥‰±”…¹¡¥ĞÁ…Ñ¡ÌÑ¡É½Õ •á¥ÍÑ¥¹œÍå¹Œ½İ¹•Èì)¡¥‘‘•¸¥éµ½ÌÍ­¥ÀÕÁ‘…Ñ•Ì…¹É•½µÁÕÑ”¹½Éµ…±±äİ¡•¸Í¡½İ¸¸)I•µ½Ù”É½½Ğ‘É½ÀµÍ¡…‘½Ü™¥±Ñ•Èì‰½Õ¹½¹±ä‘¥É•Ğµ…¥¸MY½Ù•É™±½Ü¸áÑ•É¹…°É…‘¥…°)Í•Ñ½ÉÌ½½É¹•ÈÍ¡½ÉÑÕÑÌÉ•µ…¥¸½ÕÑÍ¥‘”µ…¥¸MY…¹­••À½É¥¥¹…°Á±…•µ•¹Ğ½¥¹ÁÕĞ¸)9¼ÑÉ…¹Í™½É´•½µ•ÑÉä°•ÍÑÕÉ”°UX½Á…¥¹Ğ½¡¥ÍÑ½Éä½É•¹‘•È­•É¹•°½È5Õ±Ñ¤Ä¸À¡…¹•Ì¸(äÔäÉ…‘¥…°¼äØÀ‰ÉÕÍ ½¹ÑÉ½±Ì…¹äÔàÁ½ÁÕÀ½¹Ñ…¥¹µ•¹ĞÕ¹¡…¹•¸Q¡¥ÌÑ…É•ÑÌÑ¡”)…ÑÕ…°¡¥‘‘•¸Í¥é¥¹œ‘•™•Ğ…¹½¹ÍÑÉ…¥¹ÌÉ•¹‘•É¥¹œì¥A…É•Ñ•ÍĞ¥ÌÍÑ¥±°É•ÅÕ¥É•¸)Qİ¼Ñ•ÍÑÌ•á•ÕÑ”½É¥¥¹…°É¥¹œ™Õ¹Ñ¥½¹Ìİ¥Ñ É•…±Q¡É•”Á•ÉÍÁ•Ñ¥Ù”…µ•É„è¹½Éµ…°)aehÁ…Ñ¡Ì°¡¥‘‘•»ŠIé•É¿ŠIÉ•ÍÑ½É”•á…ĞÉ•½Ù•Éä°™¥¹¥Ñ”±½…°½½É‘¥¹…Ñ•Ì°¥¹Ù…±¥)ÁÉ½©•Ñ¥½¸É•™ÕÍ…°ì¡¥‘‘•¸Íå¹ŒÕ…É½µ…¥¸MY½™¥±Ñ•ÈÍ½Á”…¹É•Ñ…¥¹••áÑ•É¹…°)A…¥¹Ğ‰ÕÑÑ½¸½Í¡½ÉÑÕĞ½¹ÑÉ…ÑÌ¸½ÕÍ•İAMLì±½…°™Õ±°ÈàÀÑAML¼Á%0¼ÁÍ­¥À€ ÄÀĞ¸ÜÍÌ¤¸AÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½İÌ¸)Y%äØÄèA…¥¹ÓŠI½¹”½¸Í…µ”µ½‘•°ì¹¼¥…¹Ğ½±½ÕÉ•±¥¹•Ì¸I•Á•…ĞUXÑ½½±ÏŠIUX)‘¥Ñ½ËŠI	…¬½±½Í”ì½É‰¥Ğµ½‘•°½¥éµ¼¥¹Ñ¼É¥¡ĞÍ¥‘”…¹İ…Ñ •¹Ñ¥É”Ñ½½±‰…È½=‰©•Ğ)	É½İÍ•È½ÍÑ…ÑÕÌÉ•µ…¥¸Ù¥Í¥‰±”¸5½Ù”½I½Ñ…Ñ”½M…±”…¹É…‘¥…°Ñ½½±ÌÍÑ¥±°ÕÍ…‰±”ì)A…¥¹Ğ½U¹‘½I•‘¼…¹™¥¹•È¹…Ù¥…Ñ¥½¸ÁÉ•Í•ÉÙ•¸9•áĞ…ÑÕ…°äØÄÉ•¹‘•É¥¹œ™••‘‰…¬)‰•™½É”Õ¹É•±…Ñ•™•…ÑÕÉ•Ì¸%˜É•ÕÉÉ•¹”Á•ÉÍ¥ÍÑÌ°­••À¥¹‘•Á•¹‘•¹Ğ±¥ÁÁ¥¹œÉ•Á½ÉĞ)½Á•¸…¹¥¹ÍÁ•Ğ½Ñ¡•È™¥±Ñ•É•½½Ù•É™±½İ¥¹œ±…å•ÉÌì‘¼¹½Ğ¥¹™•È…•ÁÑ…¹”¸((ŒŒA…¥¹ĞU$‘¥É•Ñ¥½¸±…É¥™¥•‰äÕÍ•ÈƒŠP€ÈĞ=Ñ½‰•ÈÈÀÈØ()UÍ•ÈÍ…åÌäØÀ‘½¬µ½¹Ñ…¥¹•É…‘¥…°µ¥ÍÕ¹‘•ÉÍÑ½½¥¹Ñ•¹Ğ¸•Í¥É•M5™±½…Ñ¥¹œ)Ù¥•İÁ½ÉĞÉ…‘¥…°Ñ¡•µ”…ÌY•ÉÑ•à½‘”½…”½=‰©•Ğ°İ¥Ñ A…¥¹Ğ½¹Ñ•áĞ¸¡½½Í”‰ÉÕÍ è)É…‘¥…°‘¥Í…ÁÁ•…ÉÌì½µÁ…Ğ°½ÉÉ•Ñ±äÍ¥é•½¹Ñ•áÑÕ…°Í•ÑÑ¥¹Ì…ĞQ=@9QIì)É•µ…¥¹¥¹œÙ¥•İÁ½ÉĞ±•…È™½ÈÁ…¥¹Ñ¥¹œ¸!½±5AQd	-I=U9Ñ¼É•½Á•¸A…¥¹ĞÉ…‘¥…°°)¡½½Í”	±ÕÈ½•ÑŒ°Ñ¡•¸É…‘¥…°‘¥Í…ÁÁ•…ÉÌ…¹½¹Ñ•áÑÕ…°Ñ½ÀÁ…¹•°¡…¹•Ì¸1…å•ÉÌ°)µ…Í­Ì…¹¥µ…”Á±…•µ•¹ĞÍ¡½Õ±½Á•¸½¹Ñ•áÑÕ…°Á…¹•±Ì½¹±äİ¡•¸É•ÅÕ•ÍÑ•¸)á¥ÍÑ¥¹œ±•™Ğ…±°µ½¹ÑÉ½±Ì‘½¬¥ÌÑÉ…¹Í¥Ñ¥½¹…°°¹½Ğ‘•Í¥É•™¥¹…°A…¥¹Ğ¥¹Ñ•É™…”¸)UÍ•È•áÁ±¥¥Ñ±ä‘•™•ÉÌÁ½ÍÍ¥‰±”‰½ÑÑ½´µ±•™ĞA…¥¹Ğµ½‘”‰ÕÑÑ½¸…±½¹Í¥‘”Í•±•Ñ¥½¸¸)¼¹½ĞÍ¥±•¹Ñ±äÉ•Á±…”Ñ¡¥ÌÉ•ÅÕ•ÍĞİ¥Ñ …¹½Ñ¡•ÈÉ…‘¥…°•µ‰•‘‘•¥¸„‘½¬¸)MÑ…”µ¥É…Ñ¥½¸ÕÍ¥¹œÕÉÉ•¹ĞÁ…¥¹Ñ•È½…Ñ¥½¸½¡¥ÍÑ½Éä½±…å•È½İ¹•ÉÌ…¹Í¡…É•Á…¹•°)Á½Í¥Ñ¥½¸½½µÁ…Ğ±…å½ÕĞì¹¼¹•Ü‰ÉÕÍ •¹¥¹”¸A…¥¹Ğµ½¹Ñ•áĞ‰…­É½Õ¹¡½±µÕÍĞ)‰•±½¹œÑ¼Í¥¹±”•á¥ÍÑ¥¹œ•ÍÑÕÉ”½İ¹•È…¹½Ù•ÉÉ¥‘”µ½‘•±±¥¹œ¥¹Ù•ÉĞ=91dİ¡¥±”)Á…¥¹Ñ¥¹œì™¥¹•ÉÌÍÑ¥±°½É‰¥Ğ½Á…¸½Á¥¹ °A•¹¥°Á…¥¹ÑÌ°U¹‘½I•‘¼ÍÑ…åÌ¥¸A…¥¹Ğ¸)¼¹½Ğ½Á•¸„É…‘¥…°™É½´„ÍÕÉ™…”Á…¥¹ĞÍÑÉ½­”½È¹…Ù¥…Ñ¥½¸ì…¹•°Á•¹‘¥¹œ¡½±)½¸µ½Ù•µ•¹Ğ½µÕ±Ñ¥Ñ½Õ ¸M½Á”É•Õ±…Èµ½‘•±±¥¹œÉ…‘¥…°½•ÍÑÕÉ”½İ¹•ÉÌÕ¹¡…¹•¸)Q¡¥Ì¥Ì‘½Õµ•¹Ñ•‘¥É•Ñ¥½¸ìäØÄ™¥á•ÌÉ•¹‘•É¥¹œ½¹±ä…¹‘½•Ì¹½ĞÍ¡¥ÀÑ¡¥ÌU$¸((¸äØÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•èÉÕ¹Ñ¥µ”Õ™ˆÑ„Ñ™…‰••”áŒàÄÔÕˆå‘™ŒÍ‰„äÄàÔÌÙˆÕ‰•ÈÌ°)•á…ĞÑ•ÍÑ•ÑÉ•”ÀÁ‰‘˜ÀÅ‰ˆÀÜÄåˆÑ‘‰…ÄÍŒÑ”ÄàÀÈÀÈäÌİ‰”ÌÔĞ¸1½…°ÈàÀÑAML°(Á%0¼ÁÍ­¥Àì™½ÕÍ•İAML¸A…•ÌĞÀÀÜÌàÄàÜàØMUMLì¡½ÍÑ•É•É•ÍÍ¥½¸ĞÀÀÜÌàÄàÔØĞ)MUML¸±°ÄØ¡•­•ÁÕ‰±¥ŒÉÕ¹Ñ¥µ”½±½…‘•È½ÁÉ½Ñ•Ñ•™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•ÑÉ•”¸)•Ù¥”äØÄÉ•½É••¸±¥¹•Ì…¹½É‰¥Ğµ‘•Á•¹‘•¹Ğ±¥ÁÁ¥¹œ…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œì)¹¼ÁÉ½½˜½˜¥A…½µÁ½Í¥Ñ½ÈÉ½½Ğ…ÕÍ”¥¹™•ÉÉ•™É½´…ÕÑ½µ…Ñ•Á…ÍÍ•Ì¸((ŒŒ€¸äØÈƒŠPÍÑ…ÉÑÕÀ½±¥™•å±”Ù¥•İÁ½ÉĞÍ¥é¥¹œì€¸äØÄÉ•¹‘•É¥¹œ%0ƒŠP€ÈĞ=Ñ½‰•ÈÈÀÈØ()UÍ•ÈäØÄ%0èÉ¥¡ĞµÍ¥‘”U$‰É½­•¸¥µµ•‘¥…Ñ•±ä…™Ñ•ÈÉ•™É•Í ìÁ½ÉÑÉ…¥ÓŠI±…¹‘Í…Á”)É•ÍÑ½É•Ì¥Ğ¸¼9=Pµ…É¬äØÄÉ•¹‘•É¥¹œ™¥á•™É½´ÈàÀĞ…ÕÑ½µ…Ñ•Á…ÍÍ•Ì¸äØÀ‰ÉÕÍ )É…‘¥…°…•ÁÑ…¹”¥ÌÍ•Á…É…Ñ”ìÕÍ•ÈÌ±…É¥™¥•™±½…Ñ¥¹œÙ¥•İÁ½ÉĞA…¥¹ĞÉ…‘¥…°İ¥Ñ )½µÁ…ĞQ=@½¹Ñ•áÑÕ…°Í•ÑÑ¥¹ÌÉ•µ…¥¹ÌÉ•½É‘•…¹¥Ì9=P¥µÁ±•µ•¹Ñ•¥¸äØÈ¸)Õ‘¥Ğµ…¥¸Õ™ˆÑ„Ñ™„èÉ•¹‘•É•ÈÉ•Í¥é”ÉÕ¹Ì½¹”…ĞÍÑ…ÉÑÕÀ…¹½¸İ¥¹‘½Ü¹É•Í¥é”½¹±ä°)AH¥ÌÍ•Ğ½¹”¸1…Ñ•È±…å½ÕĞ½½¹Ñ…¥¹•È½Ù¥ÍÕ…°Ù¥•İÁ½ÉĞ¡…¹•Ì¡…Ù”¹¼Í¥é¥¹œ½İ¹•È¸)=É¥¥¹…°µ…¥¸É•Í¥é”¹½Ü…•ÁÑÌµ•…ÍÕÉ•İ¥‘Ñ ½¡•¥¡Ğ½…ÁÁ•‘AH…¹ÕÁ‘…Ñ•ÌM5)É•¹‘•É•È½…µ•É„½Í•±•Ñ¥½¸‘¥ÍÁ±…ä¸9•ÜÍµ…±°Ù¥•İÁ½ÉĞµÍ¥é¥¹œÍ¡•‘Õ±•È½…±•Í•Ì)I•Í¥é•=‰Í•ÉÙ•È°İ¥¹‘½ÜÉ•Í¥é”½½É¥•¹Ñ…Ñ¥½¸½Á…•Í¡½Ü°Ù¥ÍÕ…±Y¥•İÁ½ÉĞÉ•Í¥é”…¹Í•µ…¹Ñ¥Œ)Ñ½½°µÍ•ÍÍ¥½¸ÑÉ…¹Í¥Ñ¥½¹Ì¥¹Ñ¼½¹”™É…µ”¸MÑ…ÉÑÕÀ¡…Ì…¸…‘‘¥Ñ¥½¹…°Í•ÑÑ±¥¹œ™É…µ”¸)U¹¡…¹•½‰Í•ÉÙ•È‘¥µ•¹Í¥½¹Ì¹¼µ½Àì±¥™•å±”ÑÉ…¹Í¥Ñ¥½¹ÌÉ•ÅÕ•ÍĞ½¹”Í…µ”µÍ¥é”)…¹Ù…ÌÉ•Á…¥¹Ğ¸i•É¼Í¥é•Ì‘•™•È°AH¥Ì…ÁÁ•È°¹¼Á•Èµ™É…µ”Á½±±¥¹œ½Íå¹Ñ¡•Ñ¥Œ)É•Í¥é”•Ù•¹ÑÌ½Ñ•µÁ½É…ÉäÅÁà©¥±”½™½É•‘½É¥•¹Ñ…Ñ¥½¸½Í•½¹É•¹‘•É•È½È¥¹ÁÕĞ½İ¹•È¸)Q¡¥Ì™½±±½İÌÉ½Ñ…Ñ¥½¸ÌÉ•Í¥é”½É•Á…¥¹ĞÁ…Ñ ‰ÕĞ•á…Ğ¥A…½µÁ½Í¥Ñ½È™…Õ±ĞÉ•µ…¥¹Ì)Õ¹É•ÁÉ½‘Õ•ìäØÈ¥Ì„Ñ…É•Ñ•±¥™•å±”É•Á…¥ÈÉ•ÅÕ¥É¥¹œ‘•Ù¥”™••‘‰…¬¸)5…¥¸¡…¹•Ì=91d¡•±Á•È¥µÁ½ÉĞ°É•Í¥é”™Õ¹Ñ¥½¸…¹‰¥¹‘¥¹œì¥¹Ñ•É¹…°µ…¥¸ÍÑ…µÀ)É•Ñ…¥¹•¸5…¥¸±½…‘•ÈäØÈ¥¹Ñ•¹Ñ¥½¹…°¸äØÄ¥éµ¼‰½Õ¹‘ÌÉ•Ñ…¥¹•ìUX½Á…¥¹Ğ½•½µ•ÑÉä¼)¡¥ÍÑ½Éä°ÁÉ½Ñ•Ñ•‘5Õ±Ñ¤Ä¸À…¹™É½é•¸É•±•…Í•ÌÕ¹¡…¹•¸I•Ù¥•İ•…ÍÍ•Ğ½¹ÑÉ…Ğ)…‘‘Ì•á…Ğµ…¥»ŠIÙ¥•İÁ½ÉĞµÍ¥é¥¹œ¥µÁ½ÉĞìÍ¡•±°½É•½Ù•Éä½µ…¥¸Á¥¹ÌäØÈ¸)Q¡É•”¥¹Ñ•É…Ñ¥½¹Ìè½É¥¥¹…°µ…¥¸É•Í¥é”…±±‰…¬ÁÉ•Í•ÉÙ•ÌÉ•¹‘•É•È½…µ•É„½Á½Í¥Ñ¥½¸ì)ÍÑ…ÉÑÕÀ½Í•ÑÑ±•±…å½ÕĞ½½¹Ñ…¥¹•Èµ½¹±äÉ•Í¥é”½AH½½…±•Í¥¹œ½¹¼)Á½±±¥¹œìÍ…µ”µÍ¥é”Á…•Í¡½Ü½Í•ÍÍ¥½¸½½É¥•¹Ñ…Ñ¥½¸É•Á…¥¹Ğ½é•É¼µÍ¥é”½±•…¹ÕÀ¸½ÕÍ•İAML¸)Õ±°½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½İÌ¸AÉ¥½ÈäØÄÁÉ½½˜…¹±…É¥™¥•A…¥¹Ğ‘¥É•Ñ¥½¸…É”)¥¹±Õ‘•¥¸Ñ¡¥Ì¡…¹‘½™˜°ÍÕÁ•ÉÍ•‘•‰ä•áÁ±¥¥ĞäØÄ%0…‰½Ù”¸)Y%äØÈèÉ•™É•Í ¥¸19MAİ¥Ñ¡½ÕĞÉ½Ñ…Ñ¥½¸ì¥¹ÍÁ•Ğİ¡½±”É¥¡ĞÑ½½±‰…È½=‰©•Ğ)	É½İÍ•È½ÍÑ…ÑÕÌ¸UXÑ½½±ÏŠI‘¥Ñ½ËŠI	…¬½±½Í”°½É‰¥ĞÑ¼‰½Ñ Í¥‘•Ì¸A…¥¹ÓŠI½¹”¡•­Ì)±¥¹•Ì¥¹‘•Á•¹‘•¹Ñ±ä°Ñ¡•¸5½Ù”½I½Ñ…Ñ”½M…±”…¹U¹‘½I•‘¼¸I•Á½ÉĞ¥˜É½Ñ…Ñ¥½¸¥ÌÍÑ¥±°)¹••‘•ì‘¼¹½Ğ¥¹™•È‘•Ù¥”AML™É½´Ñ•ÍÑÌ¸•™•ÈA…¥¹Ğ±…å½ÕĞµ¥É…Ñ¥½¸Õ¹Ñ¥°ÍÑ…‰±”¸((¸äØÈÑ…É•Ñ•Ù…±¥‘…Ñ¥½¸ÌÁAML¼Á%0¼ÁÍ­¥À€¡øÄ¸ÅÌ¤èÁÉ½‘ÕÑ¥½¸Í¥é¥¹œÍ¡•‘Õ±•È¬)µ…¥¸É•Í¥é”°É•±•…Í”½¹ÑÉ…Ğ°½É¥¥¹…°äØÄÉ¥¹œÕ…É‘Ì°äÔĞÁ¥­¥¹œ°äÔÈUXİ½É­ÍÁ…”°(äÀÀ…ÑÕ…°A…¥¹Ğ½½É”…¹äØÀ‰ÉÕÍ É…‘¥…°¸Må¹Ñ…à¡•­Ìµ…¥¸½¡•±Á•ÈÁ…ÍÌ¸AÉ¥½È™Õ±°)ÉÕ¸İ…Ì¥¹Ñ•ÉÉÕÁÑ•…¹Ñ•µÁ½É…Éä±½œÕ¹…Ù…¥±…‰±”ì¹¼™Õ±°äØÈ½Õ¹Ğ±…¥µ•¸)UÍ•È…Í­Ìİ¡ä‰Õ¥±‘ÌÍ±½Üè…Ù½¥‰±½­¥¹œ¡…¹‘½Ù•È½¸‘ÕÁ±¥…Ñ”±½…°­¡½ÍÑ•™Õ±°)ÍÕ¥Ñ”™½È¹…ÉÉ½Ü¡…¹•ÌìÉÕ¸É•±•Ù…¹Ğ¡•­Ì…¹Ù•É¥™ä‘•Á±½åµ•¹Ğ°É•Á½ÉĞ¡½ÍÑ•)™Õ±°µÍÕ¥Ñ”ÍÑ…ÑÕÌ…ÕÉ…Ñ•±ä¸¥Ñ!ÕˆÍÑ¥±°ÉÕ¹Ì™Õ±°É•É•ÍÍ¥½¸…ÕÑ½µ…Ñ¥…±±ä¸((¸äØÈÁÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”åŒÍÈÈÜÔÜÈÔÕÔàÉˆå‘”ÀØÌÀÁˆÜĞØİ‘àÌÈäÜÉĞì•á…ĞÕÁ±½…‘•)…¹±½…°Ñ•ÍÑ•ÑÉ••˜ĞÙ™‰ˆÜÀÈÀÈÜÁ…•ˆØİŒÄÍŒÁ”ÔàÀØÙˆÙ”ÀÔÌäÍ„¸A…•ÌĞÀÀäÔÜÀÀäÈÌ)‰Õ¥±½‘•Á±½äMUMLì¡…¹•Í¡•±°½Ù•ÉÍ¥½¸½µ…¥¸½Í¥é¥¹œ¡•±Á•ÈĞ¼Ğ±¥Ù”‰åÑ”µµ…Ñ ¸)Q¡¥ÉÑäÉ•±•Ù…¹Ğ¡•­ÌAMLì¹¼™Õ±°äØÈÁ…ÍÌ½Õ¹Ğ±…¥µ•¸!½ÍÑ•™Õ±°É•É•ÍÍ¥½¸(ĞÀÀäÔÜÀÄÔĞØ¥¸ÁÉ½É•ÍÌ…Ğ¡…¹‘½Ù•Èì¹½Ğ‰±½­¥¹œ‘•Ù¥”É•Ñ•ÍĞ¸äØÄÕÍ•È%0)É•½É‘•°Á½ÉÑÉ…¥ÓŠI±…¹‘Í…Á”İ½É­…É½Õ¹¥Ì‘¥…¹½ÍÑ¥Œ½¹±ä¸Y%äØÈ™É•Í µ±…¹‘Í…Á”)±½…½UXµ•¹ÑÉä½É•ÑÕÉ¸½½É‰¥Ğ½É¥¡ĞÑ½½±‰…È­=‰©•ÑÌ­ÍÑ…ÑÕÌÉ•Ñ•ÍĞÉ•ÅÕ¥É•¸A…¥¹ĞÉ…‘¥…°)É•‘•Í¥¸É•µ…¥¹Ì‘½Õµ•¹Ñ•‘¥É•Ñ¥½¸°¹½ĞÍ¡¥ÁÁ•¸9¼‘•Ù¥”äØÈAML¥¹™•ÉÉ•¸(((ŒŒ€¸äØÌƒŠP™±½…Ñ¥¹œA…¥¹ĞÉ…‘¥…°…¹½¹Ñ•áÑÕ…°½¹ÑÉ½±Ìì€¸äØÈAMLƒŠP€ÈĞ=Ñ½‰•È€ÈÀÈØ()UÍ•È½¹™¥ÉµÌ€¸äØÈAMLìÁÉ½Ñ•Ğ™É•Í µ±…¹‘Í…Á”Ù¥•İÁ½ÉĞÍ¥é¥¹œ°UXİ½É­ÍÁ…”É•ÑÕÉ¸°)½É‰¥ĞÙ¥Í¥‰¥±¥Ñä…¹A…¥¹Ğ½¹”É•¹‘•É¥¹œ¸M¡¥ÀÑ¡”±…É¥™¥•A…¥¹Ğ¥¹Ñ•É…Ñ¥½¸ÕÍ¥¹œ)Ñ¡”•á¥ÍÑ¥¹œÙ¥•İÁ½ÉĞÁ…¥¹Ñ•È…¹½É¥¥¹…°µ…¥¸‰…­É½Õ¹µ¡½±½İ¹•È¸Q¡”™±½…Ñ¥¹œ)É…‘¥…°½™™•ÉÌ	ÉÕÍ ½¥±°½É…Í•È½MµÕ‘”½	±ÕÈÁ±ÕÌ1…å•ÉÌ½5…Í¬½%µ…”½<½Q•áÑÕÉ”Á…•Ì¸)¡½½Í¥¹œ…¸¥Ñ•´±½Í•ÌÑ¡”É…‘¥…°ìÑ¡”½É¥¥¹…°Á…¥¹Ñ•È½¹ÑÉ½±Ì…ÁÁ•…È¥¸„½µÁ…Ğ)Ñ½Àµ•¹ÑÉ”½¹Ñ•áÑÕ…°Á…¹•°¸!½±‘¥¹œ•µÁÑä‰…­É½Õ¹É•½Á•¹ÌÑ¡”A…¥¹ĞÉ…‘¥…°¸A•¹¥°)ÍÑÉ½­•Ì°™¥¹•È¹…Ù¥…Ñ¥½¸°U¹‘¼½I•‘¼°É•Í½ÕÉ”°<…¹¥µ…”Á±…•µ•¹Ğ½¹Ñ¥¹Õ”Ñ¡É½Õ )½É¥¥¹…°½İ¹•ÉÌ¸A…¥¹Ğ¡½±¥Ì…±±½İ•½¹±äİ¡¥±”¥‘±”€¡¹¼ÍÑÉ½­”½¥µ…”½<ÁÉ•Ù¥•Ü¤ìÑ¡”)½É¥¥¹…°¡½±…¹•±Ì½¸µ½Ù•µ•¹Ğ°µÕ±Ñ¥Ñ½Õ °Á½¥¹Ñ•È…¹•°½ÈÍ•ÍÍ¥½¸¡…¹”¸)A…¥¹ĞÍ•ÑÑ¥¹ÌÕÍ”Ñ¡”Í¡…É•Á…¹•°Á½Í¥Ñ¥½¸½İ¹•Èİ¥Ñ „½µÁ…Ğ½ÁÑ¥½¸ì½Ñ¡•ÈÁ½ÁÕÀ)±…å½ÕÑÌÉ•µ…¥¸Õ¹¡…¹•¸¥A…Ñ…Ñ¥±”…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ¸((´A…¥¹ĞÉ…‘¥…°èÑ½½°…¹½¹Ñ•áÑÕ…°µÁ…”¡½¥•Ì±½Í”Ñ¡”™±½…Ñ¥¹œÉ…‘¥…°ì¥‘±”•µÁÑäµ‰…­É½Õ¹¡½±É•½Á•¹Ì¥Ğìµ½Ù•µ•¹Ğ°Á…¥¹Ñ¥¹œ½¹Ñ…Ğ°¹…Ù¥…Ñ¥½¸…¹µÕ±Ñ¥Ñ½Õ ‘¼¹½ĞÉ•½Á•¸¥Ğ¸(((ŒŒ€¸äØĞƒŠP±•™ĞÍ¥‘”½µÁ…ĞA…¥¹ĞÍ•ÑÑ¥¹ÌìÕÍ•È‘¥É•Ñ¥½¸ƒŠP€ÈÔ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•ÅÕ•ÍÑÌA…¥¹Ğ½¹Ñ•áÑÕ…°Á½ÁÕÁÌ…Ğ1P‰•…ÕÍ”Ñ½Àµ•¹ÑÉ”Í•ÑÑ¥¹Ì½‰ÍÑÉÕĞÑ¡”Ù¥•İÁ½ÉĞ¸-••ÀÑ¡”™±½…Ñ¥¹œÉ…‘¥…°…¹•á¥ÍÑ¥¹œÁ…¥¹Ñ•È½½¹ÑÉ½°½İ¹•ÉÌ™É½´€¸äØÌ¸I•ÕÍ”Í¡…É•Á½Í¥Ñ¥½¸½İ¹•Èİ¥Ñ ½µÁ…Ğ±…å½ÕĞìÍ•ĞA…¥¹Ğ¡½ÍĞ€áÁà™É½´±•™Ğ½Ñ½À°İ¥‘Ñ …ÁÁ•…ĞÌÈÁÁà°Ù¥•İÁ½ÉĞµ¡•¥¡ĞÍÉ½±°¸I•‘Õ”…ÁÌµ½‘•ÍÑ±äİ¡¥±”ÁÉ•Í•ÉÙ¥¹œÉ•…‘…‰±”±…‰•±Ì…¹µ¥¹¥µÕ´Ñ…À¡•¥¡ÑÌ¸=Ñ¡•ÈÑ½½°Á½ÁÕÁÌÉ•Ñ…¥¸Ñ½Àµ•¹ÑÉ”Á±…•µ•¹Ğ¸Y%äØĞè	ÉÕÍ ½	±ÕÈ±•™ĞÁ±…•µ•¹Ğ°ÍÁ…¥¹œ°É…‘¥…°¡½±½É•½Á•¸°A•¹¥°°™¥¹•È¹…Ù¥…Ñ¥½¸°U¹‘½I•‘¼°½¹Ñ•áÑÕ…°Á…•Ì…¹½¹”¸9•áĞè½‰Ñ…¥¸¥A……•ÁÑ…¹”½˜É…‘¥…°€¬±•™ĞÁ½ÁÕÀ‰•™½É”µ½É”½¹ÑÉ½±ÌìÑ¡•¸ÁÉ¥½É¥Ñ¥é”™…•É½ÕÀÁ…¥¹Ñ¥¹œ¸((´A…¥¹Ğ½¹Ñ•áÑÕ…°Á…¹•±ÌÉ•µ…¥¸¹…ÉÉ½Ü°ÍÉ½±±…‰±”…¹½¸Ñ¡”±•™ĞìÍÁ…¥¹œÍÑ…åÌ½µ™½ÉÑ…‰±”…¹É…‘¥…°¡½±™±½Üİ½É­Ì¸(((ŒŒ€¸äØÔƒŠPA…¥¹Ğİ½É­™±½Ü…¹U$•Ù¥‘•¹”ƒŠP€ÈÔ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸äØĞAML…•ÁÑÌ1P½µÁ…ĞA…¥¹ĞÁ½ÁÕÀ°‰ÕĞÉ•ÕÉÉ¥¹œ¥¹…Ñ¥Ù”É¥¡ĞµÍ¥‘”U$)É•µ…¥¹Ì=A8¸¼¹½Ğ¥¹™•ÈÉ•¹‘•É¥¹œÉ•Á…¥É•¸ÕÉÉ•¹ĞÉ•ÅÕ•ÍÑ•U$è‰½ÑÑ½´UXA%9P)‰•Í¥‘”M1Pì¹…Ñ¥Ù”UXÙ…±¥‘…Ñ¥½¸‰•™½É”•¹ÑÉäì½É¥¥¹…°=‰©•ĞÉ…‘¥…°A…¥¹ĞÍ•Ñ½È)É•µ½Ù•¸¥±”­••ÁÌ¹¼‘ÕÁ±¥…Ñ”‰ÕÑÑ½¸½¹”‰½ÑÑ½´‰…È¥ÌÉ•…‘ä¸1…å•ÉÌ¹½Ü…±İ…åÌ)Ù¥Í¥‰±”…ĞÑ½À°Í•±•Ñ•½¹Ñ•áÑÕ…°Í•ÑÑ¥¹Ì‰•±½Ü¸I…‘¥…°¡½¥•ÌÍÑ…äÙ¥Í¥‰±”Õ¹Ñ¥°)A•¹¥°‰•¥¹Ì„Ù…±¥ÍÕÉ™…”ÍÑÉ½­”½¥µ…”•ÍÑÕÉ”ì‰É½İÍ¥¹œ¡½¥•Ì…‘‘Ì¹¼¡¥ÍÑ½Éä¸)I•Á•…Ñ•A…¥¹Ğ•¹ÑÉäÉ•½Á•¹ÌÑ½½±Ìì•µÁÑä‰…­É½Õ¹¡½±É•ÕÍ•Ìµ…¥¸ÌÍ¥¹±”Ñ¥µ•È)İ¥Ñ •áÁ±¥¥ĞA…¥¹Ğ‰…­É½Õ¹Á½±¥ä°‰åÁ…ÍÍ¥¹œµ½‘•±±¥¹œ¡¥ĞÁÉ½á¥•Ì¸½¹”•á¥ÑÌì)Í…Á”…¹•±Ì±¥Ù”½¹Ñ…Ğİ¥Ñ¡½ÕĞ±•…Ù¥¹œA…¥¹Ğì½µÁ•Ñ¥¹œÑ½½°±…Õ¹ ¥ÌÉ•™ÕÍ•¸)%¹Ù…±¥½‘•±•Ñ••½µ•ÑÉäµ…äÍÑ¥±°±½Í”™½ÈÉ•Í½ÕÉ”Í…™•Ñä¸()MµÕ‘”…Õ‘¥Ğ™½Õ¹‰½Õ¹‘•€á4µİ½É¬Õ…ÉÑ¡É•Ü…¹…¹•±±•Ù…±¥ÍÑÉ½­”Á¥á•±Ì¸)Õ…É¹½ÜÁ…ÕÍ•Ì…‘‘¥Ñ¥½¹…°‘…‰Ì…Ğ…À…¹•áÁ½Í•Ì„±¥™ĞµÑ¼µ­••ÀÍÑ…ÑÕÌì±¥™Ñ¥¹œ)½µµ¥ÑÌÑ¡”Ù…±¥ÁÉ•™¥à¹½Éµ…±±ä¸…¹•±±…Ñ¥½¸½¡•­Á½¥¹ĞÉ•™ÕÍ…°ÍÑ¥±°É•ÍÑ½É”¸)9¼Õ¹‰½Õ¹‘•É…ÍÑ•Èİ½É¬½È¡…¹•…À¸5…ÀÍ¥é”É•Á±…•Ì…µ‰¥Õ½ÕÌQ•áÑÕÉ”…ÁÑ¥½¸è)½±½ÕÈÉ•Í½±ÕÑ¥½¸½±•…äÔÄÈµÑ¼ÄÀÈĞ•¹±…É•µ•¹Ğ°¹½Ğ„‰ÉÕÍ ¸()¥±”ƒŠHU$•‰Õœ•áÑ•¹‘Ì½É¥¥¹…°½ÁĞµ¥¸•ÍÑÕÉ”‘•‰Õœè‰½Õ¹‘•ÄÀÀ•Ù•¹ÑÌ°É¥¡ĞµÍ¥‘”)¡¥ĞµÑ•ÍĞÍÑ…­Ì°‰½Õ¹‘Ì½ÍÑå±•Ì½Ù¥Í¥‰¥±¥Ñä°…¹Ù…Ì½Ù¥ÍÕ…±Y¥•İÁ½ÉĞ°Í•ÍÍ¥½¸°•ÉÉ½ÉÌ…¹)½¹Ñ•áĞ±½ÍÌ¸…ÁÑÕÉ”É•Á½ÉĞÑ¡•¸½ÁäÉ•Á½ÉĞ…™Ñ•È¥¹…Ñ¥Ù”U$½ÕÉÌì™±…œÁ•ÉÍ¥ÍÑÌ)Ñ¡É½Õ É•™É•Í ¸¥…¹½ÍÑ¥ŒÉ•…‘Ì…¹±¥ÍÑ•¹•ÉÌ¹•Ù•È½¹ÍÕµ”¥¹ÁÕĞ¸á…Ğ¥A…™…¥±ÕÉ”)¹½ĞÉ•ÁÉ½‘Õ•ì‘•‰Õœµ½‘”…Ñ¡•ÉÌ•Ù¥‘•¹”°‘½•Ì¹½Ğ±…¥´„½µÁ½Í¥Ñ½ÈÉ•Á…¥È¸()Y%äØÔè¹¼µUX½‰©•ĞÉ•™ÕÍ•ÌA…¥¹ĞìUX½‰©•Ğ½Á•¹Ì™É½´‰½ÑÑ½´¸%¹ÍÁ•ĞÑ½À1…å•ÉÌ)…¹Í•ÑÑ¥¹Ì‰•±½Ü°‰É½İÍ”É…‘¥…°¡½¥•ÌÑ¡•¸A•¹¥°Á…¥¹Ğ¡¥‘•Ì¥Ğì‰…­É½Õ¹¡½±)É•½Á•¹Ì¸1½¹œMµÕ‘”½±¥™Ğ­••ÁÌÁ¥á•±Ì¸¥¹•ÉÌ½U¹‘½I•‘¼…¹½¹”¸¹…‰±”U$•‰Õœ°)É•ÁÉ½‘Õ”É¥¡ĞµÍ¥‘”™…¥±ÕÉ”°…ÁÑÕÉ”É•Á½ÉĞƒŠH½ÁäÉ•Á½ÉĞ…¹Í•¹É•Á½ÉĞ¸(((¸äØÔÙ…±¥‘…Ñ¥½¸è™Õ±°±½…°9½‘”ÈĞÍÕ¥Ñ”ÈàÄÀAML¼À%0¼ÀÍ­¥ÁÁ•€ äÀ¸ÅÌ¤ì)™½ÕÍ•ÁÉ½‘ÕÑ¥½¸½U$½¡½±½‘•‰Õœ½MµÕ‘”…¹É•±•…Í”¡•­ÌÁ…ÍÍ•¸I•Ù¥Í•½±Ñ•ÍÑÌ)½¹±äİ¡•É”ÕÍ•Èµ‘¥É•Ñ•U$¡…¹•€¡É…‘¥…°Á•ÉÍ¥ÍÑ•¹”°Í…±…Èµ±…å•ÈÙ¥Í¥‰¥±¥Ñä°)É•µ½Ù•=‰©•ĞA…¥¹ĞÍ•Ñ½È¤ìÉ•Ñ…¥¹•É…ÍÑ•È…¹•°½É•™ÕÍ…°…¹ÁÉ½Ñ•Ñ•¥éµ¼)‰½Õ¹‘Ì½¹…Ù¥…Ñ¥½¸…ÍÍ•ÉÑ¥½¹Ì¸=±™¥á•ÜÌÈÍ¡…É•µ‘½¬Á¥¸…ÍÍ•ÉÑ¥½¸¹½ÜÕÍ•ÌÉ•Ù¥•İ•)…¡”½¹ÑÉ…Ğì¹•…Ñ¥Ù”‰…­É½Õ¹Ñ•ÍĞµÕÑ…Ñ•Ì	=Q ¹…Ñ¥Ù”¡½±‰É…¹¡•Ìì‘•‰Õœ)™¥áÑÕÉ”ÁÉ•Í•ÉÙ•ÌµÕ±Ñ¥Á±”½‰Í•ÉÙ•ÉÌ…¹•á¥ÍÑ¥¹œÉÕ¹Ñ¥µ”µ•ÉÉ½È•áÑÉ…Ñ¥½¸‰½Õ¹‘…Éä¸(¸äØĞÉ•¹‘•É¥¹œ¥ÍÍÕ”É•µ…¥¹Ì=A8ì‘•‰ÕœÉ•Á½ÉĞ¥Ì‘¥…¹½ÍÑ¥Œ•Ù¥‘•¹”°¹½Ğ„™¥à¸)IÕ¹Ñ¥µ”ÁÕ‰±¥…Ñ¥½¸…¹¡½ÍÑ•$ÁÉ½½˜…É”Ù•É¥™¥•Í•Á…É…Ñ•±ä…™Ñ•ÈÑ¡¥Ì½µµ¥Ğ¸(((ŒŒ€¸äØØƒŠP½¹Ñ¥¹Õ¥¹œMµÕ‘”¥¹ÁÕĞİ¥¹‘½İÌìÍÑ…ÉÑÕÀÑ½½±‰…È•Ù¥‘•¹”ƒŠP€ÈÔ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸äØÔAMLÁÉ½Ñ•ÑÌ‰½ÑÑ½´A…¥¹Ğ•¹ÑÉä°Á•ÉÍ¥ÍÑ•¹ĞÉ…‘¥…°°1…å•ÉÌµ™¥ÉÍĞ1P)Í•ÑÑ¥¹Ì…¹­•ÁĞMµÕ‘”Á¥á•±Ì¸UÍ•ÈÉ•Á½ÉÑÌMµÕ‘”ÍÑ¥±°ÍÑ½ÁÌ…™Ñ•È×ŠLØÁ…ÍÍ•Ì¸)=É¥¥¹…°á4É…ÍÑ•Èİ½É¬…Àİ…Ì½¹Ñ…Ğµİ¥‘”ìÉ•¹•Ü=91d¥ÑÌİ½É¬½Õ¹Ñ•ÉÌÁ•È¹…Ñ¥Ù”)MµÕ‘”¥¹ÁÕĞÍ…µÁ±”°É•Ñ…¥¹¥¹œ‰•™½É”Í¹…ÁÍ¡½Ğ½½Ù•É…”½Á¥­ÕÀ½‘¥ÉÑäÁ¥á•±Ì¸‰½Õ¹‘•)Í…µÁ±”µ…äÁ…ÕÍ”‘…‰Ì°¹•áĞ¥¹ÁÕĞÉ•ÍÕµ•Ì¸Ğ½É¥¥¹…°ÄÈÀÀÀÁ…Ñ µ‘…ˆ…À°É•Í••Í…µ”)½É¥¥¹…°Á…Ñ ½İ¹•È™É½´±…ÍĞÍÉ••¸¥¹ÁÕĞİ¡¥±”É•Ñ…¥¹¥¹œÑ¡”É…ÍÑ•È½¹Ñ…Ğ¸9¼)•áÑÉ„¡•­Á½¥¹ÑÌ½È±…å•È™¥¹¥Í Õ¹Ñ¥°Á¡åÍ¥…°±¥™ĞèU¹‘¼É•µ…¥¹Ì½¹”ÍÑÉ½­”¸)…¹•°½¡•­Á½¥¹ĞÉ•™ÕÍ…±ÌÉ•Ñ…¥¸…Ñ½µ¥ŒÉ½±±‰…¬¸	ÉÕÍ ½¥±°½É…Í•È½	±ÕÈÕ¹¡…¹•¸()UÍ•ÈÍÕÁÁ±¥•€¸äØÔ‘•‰ÕœÉ•Á½ÉĞ™É½´É•™É•Í ™…¥±ÕÉ”èÄÌØÛ\ààØ°…¹Ù…ÌÄÌØÛ\àÈÙML€¼(ÈÜÌË\ÄØÔÉÁ¥á•±Ì…ÑAHÈ°Á…¥¹Ñ™…±Í”½Í•ÍÍ¥½¹¹Õ±°½½¹ÑÉ½±Í•¹…‰±•ìÍ…µÁ±•É¥¡Ğ9YL)½¹Ñ…ÑÌÉ•… İ¥¹‘½Ü‰Õ‰‰±”¸9¼‰É½…½Ù•É±…ä¥¸Ñ¡½Í”…¹Ù…ÌÍ…µÁ±•Ì¸Q¡¥Ì‘½•Ì9=P)ÁÉ½Ù”Ñ½½±‰…È¡¥ĞÑ•ÍÑ¥¹œ½È½µÁ½Í¥Ñ½ÈÁ…¥¹Ñ¥¹œ¡•…±Ñ¡äè½É¥¥¹…°É¥ÍÑ…ÉÑÍdÜÄ)‰•±½ÜØÁÁà¡•…‘•È…¹½µ¥ÑÑ•€¹Ñ½Àµ…Ñ¥½¹Ì½É¥¡Ğ‰ÕÑÑ½¸É•ÑÌ¸UÍ•È½¹™¥ÉµÌÉ•™É•Í )…¸•¹Ñ•È™…¥±•ÍÑ…Ñ”‘¥É•Ñ±ä¸áÑ•¹•á¥ÍÑ¥¹œ‘•‰ÕœÉ•Á½ÉĞİ¥Ñ •á…ĞÉ¥¡Ğµ‰ÕÑÑ½¸)É•Ğ½ÍÑå±•Ì½‘¥Í…‰±•½•áÁ…¹‘•½•¹ÑÉ”¡¥ĞÍÑ…­Ìì…ÁÑÕÉ”Ñ¡•Í”½¸Á•ÉÍ¥ÍÑ•µ‘•‰Õœ)ÍÑ…ÉÑÕÀ½Á…•Í¡½Ü½±¥™•å±”…¹Ñ½½±‰…È±¥¬¸9¼É½½Ğ…ÕÍ”½ÈÉ•¹‘•É¥¹œ™¥à±…¥µ•¸()Y%äØØè±½¹œÉ•Á•…Ñ•MµÕ‘”Á…ÍÍ•ÌÕ¹‘•È½¹”A•¹¥°½¹Ñ…Ğ½¹Ñ¥¹Õ”ì±¥™Ğ­••ÁÌ)É•ÍÕ±Ğ°=9U¹‘¼½I•‘¼É•ÍÑ½É•Ìİ¡½±”½¹Ñ…Ğ°…¹•°É•ÍÑ½É•ÌÁÉ”µ½¹Ñ…Ğ¸±°€¸äØÔ)U$™±½ÜÉ•µ…¥¹Ì¸¹…‰±”U$•‰Õœ°É•™É•Í ‘¥É•Ñ±ä¥¹Ñ¼É¥¡Ğ™…¥±ÕÉ”°…ÁÑÕÉ”½½Áä)¹•ÜÉ•Á½ÉĞ½¹Ñ…¥¹¥¹œ½¹ÑÉ½±Ì…¹ÍÑ…ÉÑÕÀ•Ù¥‘•¹”ìÑ…À…™™•Ñ•É¥¡Ğ‰ÕÑÑ½¸™¥ÉÍĞ)¥˜ÁÉ…Ñ¥…°¸á…ĞÑ½½±‰…ÈÁÉ½‰”‘¥ÍÑ¥¹Õ¥Í¡•Ì½™™ÍÉ••¸½‘¥Í…‰±•½½±ÕÍ¥½¸™É½´)=4µ¡•…±Ñ¡ä‰ÕĞÙ¥ÍÕ…±±ä‰É½­•¸U$ì¹…Ñ¥Ù”¥A…É•¹‘•É¥¹œ…Ñ”É•µ…¥¹Ì=A8¸(((¸äØØÙ…±¥‘…Ñ¥½¸è™Õ±°±½…°9½‘”ÈĞÍÕ¥Ñ”ÈàÄÌAML¼À%0¼ÀÍ­¥ÁÁ•€ äÔ¸ÁÌ¤ì)™½ÕÍ•MµÕ‘”½•ÍÑÕÉ”½U$½‘•‰Õœ½1…ˆ½É•±•…Í”ĞÄAML¸9•Ü¡•­ÌÁÉ½Ù”É•¹•İ•İ½É¬)İ¥¹‘½İÌÉ•Ñ…¥¸Á¥á•±Ì…¹…¹•±±…Ñ¥½¸‰…Í•±¥¹”ì±½¹œ…ÑÕ…°ÍÕÉ™…”µÁ¥­•MµÕ‘”)Á…ÍÍ•Ì½É¥¥¹…°ÄÈÀÀÀÁ…Ñ ‰Õ‘•Ğ°•‘¥ÑÌ±…Ñ”Á¥á•±Ì…¹½µµ¥ÑÌ=9U¹‘¼½I•‘¼•¹ÑÉäì)É¥¡ĞÑ½½±‰…È•¹ÑÉ”ÁÉ½‰•Ì¥¹±Õ‘”¡•…‘•ÉdÌÀ…¹Á•ÉÍ¥ÍĞ¥¸Á…•Í¡½Ü•Ù¥‘•¹”¸)AÉ¥½È€¸äØÔ¡½ÍÑ•É•É•ÍÍ¥½¸ĞÀÄàÄÈÀØÀĞà¡…Ì¹½Ü½µÁ±•Ñ•MUML¸á…ĞÍÕÁÁ±¥•)É•™É•Í É•Á½ÉĞ½‰Í•ÉÙ…Ñ¥½¹Ì…É”…É¡¥Ù•¥¸‘½Ì½Õ¤µ‘•‰ÕœµÉ•™É•Í ´äØÔµÉ•Á½ÉĞ¹µ¸)I¥¡ĞµÍ¥‘”¹…Ñ¥Ù”¥A…™…¥±ÕÉ”É•µ…¥¹Ì=A8ì¹¼É•¹‘•É¥¹œ™¥à¥¹™•ÉÉ•¸(((ŒŒ€¸äØÜƒŠP…¹Ù…Ì½U$½µÁ½Í¥Ñ¥½¸‰½Õ¹‘…Éäì€¸äØØ¥¹Ù¥Í¥‰±”±¥­…‰±”½¹ÑÉ½±ÌƒŠP€ÈÔ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌÉ¥¡Ğ½¹ÑÉ½±ÌÉ•µ…¥¸±¥­…‰±”İ¡¥±”Ù¥ÍÕ…±±ä…‰Í•¹ĞìÍİ¥Ñ¡¥¹œ…İ…ä)Ñ¼¡…ÑAP…¹‰…¬É•ÍÑ½É•Ì…ÁÁ•…É…¹”¸á…Ğ€¸äØØÉ•Á½ÉĞÄÀèÈÈèÀáhÍ¡½İÌÉ¥¡Ğ)‰ÕÑÑ½¹Ì½¸µÍÉ••¸½•¹…‰±•½Ù¥Í¥‰±”½½Á…¥ÑäÄ°¹¼ÑÉ…¹Í™½ÉµÌ½™¥±Ñ•ÉÌ½±¥ÀÁ…Ñ¡Ì°•á…Ğ)‰ÕÑÑ½¸½MY¡¥ĞÍÑ…­ÌìU¹‘¼±¥¬É•…¡•Ìİ¥¹‘½Ü‰Õ‰‰±”¸A…¥¹Ñ™…±Í”½Í•ÍÍ¥½¹¹Õ±°¸)MÑ…ÉÑÕÀÑ½½±‰…ÈÉ½İÌ™É½´ÄÌĞ¸ÔÙÁàİ¥‘”…ĞĞÔåµÌÑ¼ÌÄÜ¸ØÅÁà…ĞØĞåµÌ°İ¥Ñ ½ÉÉ•Ğ)±…å½ÕĞ‰ÕĞÉ•Á½ÉÑ•¥¹Ù¥Í¥‰±”Á¥á•±Ì¸Ù¥‘•¹”Á½¥¹ÑÌÑ¼Á…¥¹Ñ¥¹œ½½µÁ½Í¥Ñ¥¹œ°¹½Ğ)É•µ½Ù•U$°½™™ÍÉ••¸±…å½ÕĞ°‘¥Í…‰±•½¹ÑÉ½±Ì½È‰É½…¥¹ÁÕĞ¥¹Ñ•É•ÁÑ¥½¸¸Q¡¥Ì)¥Ì…¸¥¹™•É•¹”°9=P„±½…±±äÉ•ÁÉ½‘Õ•]•‰-¥Ğµ•¹¥¹”‘¥…¹½Í¥Ì¸()Q…É•Ñ•É•Á…¥È¥¸½É¥¥¹…°ÍÑå±•Í¡••ĞèÙ¥•İÁ½ÉÑ]É…À¥Í½±…Ñ•ÍÑ…¬…ÑèÀ°½É¥¥¹…°)…¹Ù…Ì‰½Õ¹‘•‰ä½¹Ñ…¥¸éÁ…¥¹Ğİ¥Ñ ¥ÑÌ½İ¹èÀì¡•…‘•ÈÉ•µ…¥¹ÍèÄÀ…‰½Ù”Ù¥•İÁ½ÉĞ¸)!•…‘•È½ÍÑ…ÑÕÌ½=‰©•Ğ	É½İÍ•È•Ğ¥Í½±…Ñ•½µÁ½Í¥Ñ¥¹œ¡¥¹ÑÌÙ¥„İ¥±°µ¡…¹”é½Á…¥Ñä°)İ¥Ñ¡½ÕĞÑÉ…¹Í™½ÉµÌ°½Á…¥Ñä¡…¹•Ì°±¥ÁÁ¥¹œU$µ•¹ÕÌ½ÈÉ•Á…É•¹Ñ¥¹œ…¹ä½¹ÑÉ½°¸)Y%\™¥á•Á½ÁÕÀÉ•µ…¥¹ÌÙ¥•İÁ½ÉĞµÉ•±…Ñ¥Ù”ì™±½…Ñ¥¹œÑ½½±ÌÉ•Ñ…¥¸Ñ¡•¥È½İ¸½İ¹•ÉÌ¸)=É¥¥¹…°Ù¥•İÁ½ÉĞµÍ¥é¥¹œÍ¡•‘Õ±•È¹½Ü½…±•Í•Ì™½ÕÌ…¹Ù¥Í¥‰±”µ‘½Õµ•¹Ğ•Ù•¹ÑÌ)Ñ¡É½Õ M5É•Í¥é”½É•Á…¥¹Ğ½İ¹•Èì¡¥‘‘•¸µ‘½Õµ•¹Ğ•Ù•¹ÑÌ‘¼¹½ĞÉ•‘É…Ü¸Q•…É‘½İ¸)É•µ½Ù•Ì‰½Ñ ±¥ÍÑ•¹•ÉÌ¸9¼Íå¹Ñ¡•Ñ¥ŒÉ•Í¥é”°Á•Èµ™É…µ”Á½±±¥¹œ°=4¡¥‘¥¹œ°É•±½…°)¹•ÜÉ•¹‘•É•È½¡¥ÍÑ½Éä½¥¹ÁÕĞ½İ¹•È½Èµ½‘•±±¥¹œ½Á…¥¹Ğ¡…¹•Ì¸•‰ÕœÍ¹…ÁÍ¡½ĞÉ•½É‘Ì)½¹Ñ…¥¸½¥Í½±…Ñ¥½¸½İ¥±°µ¡…¹”Í¼€¸äØÜ±…å•ÈÉÕ±•Ì…¸‰”Ù•É¥™¥•½¸‘•Ù¥”¸((¸äØÔA…¥¹ĞU$AMLÁÉ½Ñ•Ñ•ì€¸äØØ½¹Ñ¥¹Õ¥¹œµMµÕ‘”…•ÁÑ…¹”É•µ…¥¹ÌÍ•Á…É…Ñ”¸)Y%äØÜèÉ•™É•Í ¥¸±…¹‘Í…Á”É•Á•…Ñ•‘±ä°Ù•É¥™ä…±°É¥¡Ğ‰ÕÑÑ½¹Ì½ÍÑ…ÑÕÌ…¹)=‰©•Ğ	É½İÍ•Èì¥¹Ñ•É…Ğ‰•™½É”¡…¹¥¹œ…ÁÁÌ°•¹Ñ•È½•á¥ĞUX‘¥Ñ½È…¹A…¥¹Ğ°)É½Ñ…Ñ”½½É‰¥Ğ¸Mİ¥Ñ …İ…ä½‰…¬Ù•É¥™¥•ÌÉ•½Ù•Éä‘½•Ì¹½Ğ±½Í”U$½İ½É¬¸%˜¥¹Ù¥Í¥‰±”)½¹ÑÉ½±ÌÉ•ÕÈ°•¹…‰±”U$•‰Õœ‰•™½É”É•™É•Í …¹Í•¹…ÁÑÕÉ”½½ÁäÉ•Á½ÉĞÁ±ÕÌ)ÍÉ••¹Í¡½Ğ¥˜ÁÉ…Ñ¥…°¸I•Á…¥ÈÉ•µ…¥¹Ì…¸¥A……Ñ”Õ¹Ñ¥°•áÁ±¥¥Ğ™••‘‰…¬¸(((¸äØÜÙ…±¥‘…Ñ¥½¸è™Õ±°±½…°9½‘”ÈĞÍÕ¥Ñ”ÈàÄÔAML¼À%0¼ÀÍ­¥ÁÁ•€ äÌ¸åÌ¤ì)™½ÕÍ•É•±•…Í”½Í¥é¥¹œ½UX½A…¥¹Ğ½‘•‰Õœ¡•­ÌĞÀAML¸9•Ü½Ù•É…”¡•­Ì™½ÕÌ½Ù¥Í¥‰±”)É•ÑÕÉ¸½…±•Í¥¹œ°¡¥‘‘•¸µ‘½Õµ•¹ĞÉ•™ÕÍ…°…¹‘¥ÍÁ½Í…°ì…¹Ù…Ì½¹Ñ…¥¹µ•¹Ğ…¹)Õ¹ÑÉ…¹Í™½Éµ•½Õ¹±¥ÁÁ•Y%\Á½ÁÕÀ½¹ÑÉ…ĞÉ•Ñ…¥¹•¸±½…°¡É½µ¥Õ´±…å½ÕĞÍµ½­”)İ…Ì…ÑÑ•µÁÑ•‰ÕĞÑ¡”¥¹ÍÑ…±±•A±…åİÉ¥¡ĞÁ…­…”¡…Ì¹¼‰É½İÍ•È•á•ÕÑ…‰±”¡•É”ì)¹¼É•¹‘•É•µ‰É½İÍ•È½È¹…Ñ¥Ù”]•‰-¥ĞÁÉ½½˜±…¥µ•¸UÍ•ÈÌ€¸äØØÉ•Á½ÉĞ¥Ì…É¡¥Ù•)¥¸‘½Ì½Õ¤µ‘•‰Õœµ¥¹Ù¥Í¥‰±”µ½¹ÑÉ½±Ì´äØØ¹µ¸•Ù¥”Ù¥ÍÕ…°…Ñ”É•µ…¥¹Ì=A8¸(((ŒŒ€¸äØÜÁÉ½Ñ•Ñ•ÕÍ•ÈAMLƒŠP€ÈÔ=Ñ½‰•È€ÈÀÈØ((´mátUÍ•ÈAIP€¼AMLèÉ¥¡Ğ½¹ÑÉ½±ÌÉ•µ…¥¸Ù¥Í¥‰±”…™Ñ•È±…¹‘Í…Á”É•™É•Í …¹U$ÑÉ…¹Í¥Ñ¥½¹ÌìÉ•Ñ…¥¸€¸äØÜ…¹Ù…Ì½U$¥Í½±…Ñ¥½¸…¹Ù¥Í¥‰±”µÁ…”É•Á…¥¹Ğ½İ¹•È¸(´ltÕÑÕÉ”¥½¸‰Õ¥±‘ÌèÉ•Ù¥•ÜÑ¡É•”Ù¥ÍÕ…°…¹‘¥‘…Ñ•ÌÁ•ÈÑ½½°ì¥¹ÍÑ…±°½¹±äÉ•™¥¹•ÕÍ•ÈÍ•±•Ñ¥½¹Ì°İ¥Ñ ¥½¸…‰½Ù”Íµ…±°Ù¥Í¥‰±”Ñ¥Ñ±”¸AÉ•Í•ÉÙ”½É¥¥¹…°…Ñ¥½¸Ñ…É•ÑÌ°É…‘¥…°Á½Í¥Ñ¥½¹Ì°Ñ½Õ Ñ…É•ÑÌ…¹¡¥ÍÑ½Éä½•ÍÑÕÉ”½İ¹•ÉÍ¡¥À¸()A±…¹¹¥¹œÕÁ‘…Ñ”½¹±äèÉÕ¹Ñ¥µ”€¸äØÜÕ¹¡…¹•ì¹¼¹•Ü¡…¹‘Ìµ½¸Ñ•ÍĞÉ•ÅÕ¥É•¸((ŒŒI…‘¥…°Ù¥ÍÕ…°Í•±•Ñ¥½¸Í¡••ÑÌØÄ½µÁ±•Ñ”ƒŠP€ÈÔ=Ñ½‰•È€ÈÀÈØ()•Í¥¸É•Ù¥•Ü½¹±äìÉÕ¹Ñ¥µ”É•µ…¥¹Ì€¸äØÜİ¥Ñ ÁÉ½Ñ•Ñ•ÕÍ•ÈAIP½AML¸±°ØÔ)Í•µ…¹Ñ¥ŒÑ½½±Ì¹½Ü¡…Ù”Q!I½É¥¥¹…°Ù•Ñ½È…¹‘¥‘…Ñ•ÌèÄäÔMYÌ½¸ÄÀÍ¡••ÑÌ¸)•±¥Ù•É•	½á1…ˆµ%½¸µM•±•Ñ¥½¸¹Á‘˜°	½á1…ˆµ%½¸µI•Ù¥•Ü¹¡Ñµ°…¹)	½á1…ˆµ%½¸µI•Ù¥•ÜµA…¬¹é¥À€¡A½!Q50½A9Í¡••ÑÌ½MYÌ½µ…¹¥™•ÍĞ½É•‰Õ¥±Í½ÕÉ”¤¸)9¼‘•™…Õ±Ğ½ÕÍ•È¥½¸Í•±•Ñ¥½¹Ìì…İ…¥ĞÑ½½°µ¹…µ”€¬½½¡½¥•Ì°Ñ¡•¸É•™¥¹”‰•™½É”)¥¹ÍÑ…±±…Ñ¥½¸¸M¡…É•Íåµ‰½±ÌÉ•Ñ…¥¹•¥¸½¹”É•Ù¥•ÜÉ½ÜìY•ÉÑ•à½=‰©•Ğ)½¥¸Í•Á…É…Ñ”¸)M•”‘½Ì½É…‘¥…°µ¥½¸µÉ•Ù¥•ÜµØÄ¹µ¸9¼¹•Ü…ÁÀÑ•ÍĞ½ÈÉÕ¹Ñ¥µ”É•±•…Í”¹••‘•¸((ŒŒ€¸äØà…”¥½¸‘•Ù¥”É•Ù¥•Ü((´mát…”É…‘¥…°Í¡½İÌÈÌAÉ½½˜ÀÌ¥½¹Ìİ¥Ñ ½É¥¥¹…°Íµ…±°…ÁÑ¥½¹Ìì…±°Ñ½½±ÌÉ½ÕÑ”Õ¹¡…¹•¸(´mátáÑÉÕ‘”…ĞÄÈ…¹	•Ù•°…ĞÌì¥½¸…É•„Ñ…ÁÌ±…Õ¹ ½É¥¥¹…°Ñ½½°ìÕ¹…Ù…¥±…‰±”ÍÑ…Ñ•ÌÉ•µ…¥¸±•…È¸(´mát%¹¹•È½½ÕÑ•È¥½¹ÌÉ•µ…¥¸±•¥‰±”½¸¥A…ì¹…Ù¥…Ñ¥½¸°¡¥ÍÑ½Éä…¹€¸äØÜÉ¥¡ĞµÑ½½±‰…ÈÙ¥Í¥‰¥±¥ÑäÁÉ•Í•ÉÙ•¸((ŒŒ€¸äØäY•ÉÑ•à¥½¸‘•Ù¥”É•Ù¥•Ü((¸äØà…”¥½¸É•Ù¥•Ü•áÁ±¥¥Ñ±äAML½¸ÈØ=Ñ½‰•ÈÈÀÈØ¸((´mátY•ÉÑ•àÉ…‘¥…°Í¡½İÌÄĞÍ•±•Ñ•AÉ½½˜ÀÌ¥½¹Ìİ¥Ñ Íµ…±°½É¥¥¹…°…ÁÑ¥½¹Ì…¹‘¥ÍÑ¥¹ĞY•ÉÑ•à)½¥¸¸(´mát=É¥¥¹…°Á½Í¥Ñ¥½¹Ì½…Ñ¥½¹Ì°…Ù…¥±…‰±”½‘¥Í…‰±•ÍÑ…Ñ•Ì°	Õ¥±‘”½M±¥‘”½	•Ù•°Í•ÍÍ¥½¹Ì…¹U¹‘½I•‘¼É•µ…¥¸ÕÍ…‰±”¸(´mát9…Ù¥…Ñ¥½¸½É¥¡ĞµÍ¥‘”U$ÁÉ•Í•ÉÙ•ì…•ÁÑ•…”¥½¹ÌÕ¹¡…¹•¸((ŒŒ€¸äÜÀ=‰©•Ğ¥½¸‘•Ù¥”É•Ù¥•Ü((¸äØäY•ÉÑ•à¥½¸É•Ù¥•Ü•áÁ±¥¥Ñ±äAML½¸ÈØ=Ñ½‰•ÈÈÀÈØì€¸äØà…”AMLÉ•Ñ…¥¹•¸((´lt=‰©•ĞÉ…‘¥…°Í¡½İÌÄÌ…ÁÁÉ½Ù•¥½¹Ì…¹Íµ…±°…ÁÑ¥½¹Ìì=‰©•Ğ)½¥¸‘¥™™•ÉÌ™É½´Y•ÉÑ•à)½¥¸¸(´lt1½¹•È±…‰•±Ì™¥ĞìÕÁ±¥…Ñ”½U¹‘½I•‘¼°ÉÉ…ä½M½±¥‘¥™ä…¹UX½5•Í !•…±Ñ ±…Õ¹ •á¥ÍÑ¥¹œ½İ¹•ÉÌ¸(´lt5Õ±Ñ¤°¹…Ù¥…Ñ¥½¸…¹É¥¡ĞÑ½½±‰…ÈÉ•µ…¥¸ÕÍ…‰±”ì…”½Y•ÉÑ•à…•ÁÑ•¥½¹ÌÕ¹¡…¹•¸((ŒŒ€¸äÜÄÉÉ…ä€¬É¥¡ĞU$‘•Ù¥”…Ñ”((´lt•™…Õ±ĞUXÕ‰”½É‘¥¹…ÉäÉÉ…äÍÕ••‘Ìİ¥Ñ ¥¹‘•Á•¹‘•¹ĞUX½Á¥•Ì°½¹”U¹‘½I•‘¼•¹ÑÉä…¹M…Ù•=Á•¸¸(´lt1¥Ù”ÉÉ…ä¹…Ñ¥Ù”UYÌÍÕÉÙ¥Ù”½Õ¹Ğ•‘¥ÑÌ½É•½Á•¸½½¹Ù•ÉĞ½U¹‘½I•‘¼…¹M…Ù•=Á•¸İ¥Ñ¡½ÕĞÉ•ÁÉ½©•Ñ¥½¸¸(´ltA…¥¹Ğ½ÍÑ…±”UYÌÉ•™ÕÍ”‰•™½É”¡…¹•Ìì¥¹‘•Á•¹‘•¹Ğµ½Áä™…¥±ÕÉ”±•…Ù•Ì¹¼Á…ÉÑ¥…°Í•¹”¸(´ltI¥¡ĞÑ½½±‰…ÈÉ•µ…¥¹ÌÙ¥Í¥‰±”…™Ñ•ÈÉ•™É•Í °ÉÉ…ä½…¹•°½½¹”…¹¹…Ù¥…Ñ¥½¸ì€¸äÜÀÉ•ÕÉÉ•¹”=A8Õ¹Ñ¥°‘•Ù¥”™••‘‰…¬¸((ŒŒ€¸äÜÈA±…¥¸U$É•¹‘•É¥¹œ‘•Ù¥”…Ñ”()UÍ•ÈÉÉ…ääÜÄİ½É­Ì½AMLìÉ¥¡ĞU$äÜÄ%0É•µ…¥¹Ì¥¹‘•Á•¹‘•¹Ğ¸((´mát=É‘¥¹…Éä…¹1¥Ù”ÉÉ…ääÜÄ…•ÁÑ•‰äÕÍ•È€£ŠqÉÉ…ä¹½Üİ½É­ÏŠt¤¸(´ltA±…¥¸½Á…ÅÕ”U$­••ÁÌ…±°É¥¡Ğ½¹ÑÉ½±ÌÙ¥Í¥‰±”½¸É•Á•…Ñ•±…¹‘Í…Á”É•™É•Í °‰•™½É”…ÁÀÍİ¥Ñ¡¥¹œ¸(´lt=‰©•Ğ	É½İÍ•È½Y%\½UX‘¥Ñ½È½ÉÉ…äÑÉ…¹Í¥Ñ¥½¹Ì…¹¹…Ù¥…Ñ¥½¸É•Ñ…¥¸Ù¥Í¥‰±”U$…¹Õ¹¡…¹•¡¥ĞÑ…É•ÑÌ¸(´lt¥Í…‰±•½…Ñ¥Ù”½¹ÑÉ½±ÌÉ•µ…¥¸±•…ÈÙ¥„½É¥¥¹…°½Á…¥Ñä°‰½É‘•ÉÌ…¹ÍÑÉ½­”™••‘‰…¬¸((ŒŒ€¸äÜÌ=ÁĞµ¥¸…¹Ù…Ì‘¥…¹½ÍÑ¥Œ‘•Ù¥”…Ñ”((¸äÜÈÙ¥ÍÕ…°™…Õ±ĞÁ•ÉÍ¥ÍÑÌİ¥Ñ Á±…¥¸ÁÉ½™¥±”Ù•É¥™¥•ìÉÉ…ääÜÄÕÍ•ÈAMLÉ•Ñ…¥¹•¸((´ltÕÉ¥¹œ™…¥±ÕÉ”è!¥‘”Í½¹±ä°½‰Í•ÉÙ”É¥¡ĞÑ½½±‰…È°É•½ÉÙ¥Í¥‰±”½µ¥ÍÍ¥¹œİ¥Ñ¡½ÕĞ…ÁÀÍİ¥Ñ¡¥¹œ¸(´ltM¡½ÜÍÉ•ÍÑ½É•Ì…¹Ù…Ì½µ½‘•°ì¹½Ñ”İ¡•Ñ¡•ÈÉ¥¡ĞU$™…¥±Ì……¥¸¸(´lt½ÁäÉ•Á½ÉĞ¥¹±Õ‘•Ì…¹Ù…ÌµÁÉ½‰”µ½‰Í•ÉÙ…Ñ¥½¸…¹É•ÍÑ½É•ÍÑ…Ñ”¸(´lt•‰Õœ½™˜½Á…•¡¥‘”…±İ…åÌÉ•ÍÑ½É•ÌÁÉ¥½È…¹Ù…ÌÙ¥Í¥‰¥±¥Ñäì¹¼Í•¹”½¡¥ÍÑ½Éä¡…¹•Ì¸((ŒŒ€¸äÜĞ‘”¥½¸‘•Ù¥”É•Ù¥•Ü()UÍ•ÈÉ•Á½ÉÑÌ…¹¹½ĞÉ•ÁÉ½‘Õ”É¥¡ĞÙ¥ÍÕ…°™…Õ±ĞÕÉÉ•¹Ñ±äì¥½¸É½±±½ÕĞÉ•ÍÕµ•)‰ä•áÁ±¥¥Ğ¥¹ÍÑÉÕÑ¥½¸¸%¹Ñ•Éµ¥ÑÑ•¹Ğ™…Õ±Ğ¹½Ğµ…É­•™¥á•ìäÜÌÁÉ½‰”É•Ñ…¥¹•¸((´mát±°ÈÄ‘”¥½¹Ìµ…Ñ AÉ½½˜ÀÌ°Íµ…±°Ñ¥Ñ±•Ì™¥Ğ…¹½ÕÑ•ÈÑ…É•ÑÌ‘¼¹½Ğ½Ù•É±…À¸(´ltáÑÉÕ‘”ÄÈ½	•Ù•°Ì…¹½É¥¥¹…°Ñ½½°…Ñ¥½¹Ì½‘¥Í…‰±•ÍÑ…Ñ•ÌÉ•Ñ…¥¹•¸(´ltM±¥‘”½	•Ù•°½1½½À½ÕÑUX½MÑ¥Ñ¡UX½U¹‘½I•‘¼…¹¹…Ù¥…Ñ¥½¸É•µ…¥¸ÕÍ…‰±”¸(´lt…”½Y•ÉÑ•à½=‰©•Ğ¥½¹Ì…¹ÉÉ…äAMLÕ¹¡…¹•ìİ…Ñ É¥¡ĞU$Ù¥Í¥‰¥±¥Ñä¸((ŒŒ€¸äÜÔ]½É±µÁ±…¹”áÑÉÕ‘”Á…‘Ì()UÍ•È€¸äÜĞ¥½¹ÌAMLì€¸äÜÔ™Õ¹Ñ¥½¹…°…Ñ”Í•Á…É…Ñ”¸((´lt	½Ñ ‘”½Y•ÉÑ•àáÑÉÕ‘”Í¡½Ü½É¥¥¹…°ad½ah½ehÁ±…¹”ÍÅÕ…É•Ì°Í•±•Ñ¥½¸¡¥¡±¥¡Ğ…¹¹…µ•µÁ±…¹”‰…‘”¸(´lt]½É±ad¡½±‘Íh½ah¡½±‘Íd½eh¡½±‘Í`‘ÕÉ¥¹œ‘É…œ°á…Ğ…¹I•Á•…Ğì…É‰¥ÑÉ…ÉäÙ¥•Ü½É¥•¹Ñ…Ñ¥½¸ÍÕÁÁ½ÉÑ•¸(´lt•¹ÑÉ•É•”…¹aeh…ÉÉ½İÌÉ•µ…¥¸Õ¹¡…¹•ì½¹”½…¹•°½U¹‘½I•‘¼½¹…Ù¥…Ñ¥½¸É•ÍÑ½É”¹½Éµ…±±ä¸(´ltA…É…±±•°µÙ¥•ÜÉ•™ÕÍ…±Ì‘¼¹½ĞµÕÑ…Ñ”µ•Í ½¡¥ÍÑ½Éä½È±•…Ù”…ÁÑÕÉ•¥¹ÁÕĞì½É‰¥ĞÑ¡•¸É•ÑÉä¸(((ŒŒ€¸äÜØƒŠPÉ•½¹¹•ĞÉ•…‘ä‘”	É¥‘”Í•±•Ñ¥½¹ÌƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()Õ‘¥Ğµ…¥¸àÅ‰„Ñ…™½‰Õ¥±äÜÔ¸UÍ•ÈÍÕÁÁ±¥•ÌÍÉ••¹Í¡½ĞäÜÔ…¹•á…Ğ‘”…¥° Ä¤¹½‰¨( ÈĞÙ•ÉÑ¥•Ì¼ÄĞÅÕ…‘Ì¤ìÉ•Ñ…¥¸Õ¹¡…¹•™¥áÑÕÉ”Ñ•ÍÑÌ½™¥áÑÕÉ•Ì½•‘”µ‰É¥‘”´äÜØ¹½‰¨¸)Q¡”¡¥¡±¥¡Ñ•‰½Õ¹‘…ÉäÁ…¥È¥Ì=	(Ù•ÉÑ¥•ÌÏŠLÄÀ…¹ÈÏŠLÈĞ€¡ÉÕ¹Ñ¥µ”•‘•ÌÄÈ¼ÌÔ¤¸)	½Ñ ¡…Ù”½¹”™…”½İ¹•È¸á¥ÍÑ¥¹œ™Õ±±ä¥¹ÍÑ…±±•=Á•¸¡…¥¸	É¥‘”…•ÁÑÌÑ¡”Á…¥È°)É•…Ñ•ÌÅÕ…‘lÌ°ÈÌ°ÈĞ°ÄÁt€¡=	(½¹”µ‰…Í•¤…¹Á…ÍÍ•Ì½É¥¥¹…°Ñ½Á½±½äÙ…±¥‘…Ñ¥½¸¸)I…‘¥…°Õ¥‘•Í•ÍÍ¥½¸ØÜØ¥¹½ÉÉ•Ñ±ä…•ÁÑ•=91d½¹”½µÁ±•Ñ”‰½Õ¹‘…Éä±½½À¥¸)…¹MÑ…ÉĞ½½Á•¹É½µ!Õˆ°‘¥Í½¹¹•Ñ¥¹œ…±É•…‘äµÍÕÁÁ½ÉÑ•É•…‘äÁ…¥ÉÌ¸I•Á…¥ÈM5)Í•ÍÍ¥½¸è‘•±•…Ñ”É•…‘äµÁ…¥È•±¥¥‰¥±¥ÑäÑ¼•á¥ÍÑ¥¹œ‰É¥‘•‘•M•±•Ñ¥½¹%¹™¼°É•Ñ…¥¸)Í¥¹±”µ±½½ÀÕ¥‘••¹ÑÉä°Íå¹ŒÁÁ±ä¥µµ•‘¥…Ñ•±ä°Í¡½ÜÉ•…‘äÍÑ…ÑÕÌ¸=É¥¥¹…°U$°)Ñ½Á½±½ä°İ¥¹‘¥¹œ½ÅÕ…±¥Ñä½ÑÉ…¹Í…Ñ¥½¸Õ…É‘Ì…¹¡¥ÍÑ½Éä½İ¸ÁÁ±äÕ¹¡…¹•¸)…¹•°É•Ñ…¥¹Ì¥¹¥Ñ¥…°Á…¥Èì¥¹Ù…±¥½¥¹Ñ•É¥½È½µ¥ÍÍ¥¹œ½Í¥¹±”µ½Á•¸µ•‘”¥¹ÁÕÑÌÉ•™ÕÍ”¸)9¼¹•Ü­•É¹•°½•ÍÑÕÉ”°¥éµ¼¡…¹•Ì°É•¹‘•É•È™¥á•Ì½È¥½¸İ½É¬¸äÜÔÁ……•ÁÑ…¹”)¹½Ğ¥¹™•ÉÉ•™É½´ÕÁ±½…‘•ÍÉ••¹Í¡½Ğ¸äÜĞ¥½¸¼äÜÄÉÉ…äAML…¹äÜÈ¼äÜÌÙ¥ÍÕ…°)Í…™•Õ…É‘ÌÉ•µ…¥¸ì¥¹Ñ•Éµ¥ÑÑ•¹ĞÉ¥¡ĞµÍ¥‘”™…Õ±Ğ¥ÌÍÑ¥±°=A8¸()Y…±¥‘…Ñ¥½¸èÈÈÔ™½ÕÍ•	É¥‘”½Í•±•Ñ¥½¸µ¡Õˆ½É…‘¥…°½É•±•…Í”Ñ•ÍÑÌAML°Á%0¼ÁÍ­¥À¸)½ÕÈ¹•ÜÉ•…°µ½İ¹•È¥¹Ñ•É…Ñ¥½¹Ì½Ù•ÈÍÕÁÁ±¥•Á…¥ËŠI…ÑÕ…°É…‘¥…°…Ù…¥±…‰¥±¥ÑçŠH)½É¥¥¹…°U$ÁÁ±çŠI½¹”¡¥ÍÑ½ÉäÍÑ•À½U¹‘½I•‘¼°…¹•°°Õ¥‘•Í¥¹±”µ±½½ÃŠIÍ•½¹µ±½½À°)…¹¥¹Ù…±¥¥¹ÁÕĞ…Ñ½µ¥ŒÉ•™ÕÍ…°¸9½‘”=4…‘…ÁÑ•ÉÌ…É”¹½Ğ¹…Ñ¥Ù”¥A…ÁÉ½½˜¸)¡…¹•ÉÕ¹Ñ¥µ”=91dÍ•±•Ñ¥½¸µ¡Õˆµ‰É¥‘”µÍ•ÍÍ¥½¸ìÉ•Ù¥•İ•Í•ÍÍ¥½¸½É•½Ù•ÉäÁ¥¹ÌäÜØ°)É•±•…Í”µ…É­•ÉÌäÜØ…¹…ÍÍ•Ğ¡…Í¡•ÌÕÁ‘…Ñ•ì5Õ±Ñ¤Ä¸À½™É½é•¸½¥½¸½•½µ•ÑÉäÕ¹¡…¹•¸)AÕ‰±¥…Ñ¥½¸Ù•É¥™¥…Ñ¥½¸™½±±½İÌÍ•Á…É…Ñ•±ä¸Y%äÜØèÍ…µ”µ½‘•°½Ñİ¼É••‘•ÌƒŠH)‘”É…‘¥…°	É¥‘”ƒŠHÁÁ±ä	É¥‘”è½¹”±½Í¥¹œÅÕ…¸U¹‘½I•‘¼ìÉ•½Á•¸Ñ¡•¸…¹•°)É•Ñ…¥¹ÌÁ…¥È½•½µ•ÑÉä¸±Í¼Í…¹¥Ñäµ¡•¬•á¥ÍÑ¥¹œÑİ¼µ±½½À	É¥‘”¸9•áĞ…ÑÕ…°‘•Ù¥”)™••‘‰…¬°Ñ¡•¸A…¥¹Ğ¥½¸É½±±½ÕĞìÁÉ•Í•ÉÙ”¥¹‘•Á•¹‘•¹ĞäÜÔáÑÉÕ‘”Á…‘•Ù¥”…Ñ”¸((ŒŒ€¸äÜÜƒŠPÉ…‘¥…°İ¥É¥¹œ…Õ‘¥Ğ…¹¹•…Èµ™É½¹Ğá…ĞáÑÉÕ‘”ƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•ÅÕ•ÍÑÌ…Õ‘¥Ğ½˜…±°É…‘¥…°Ñ½½±Ìì½É‰¥ĞÍ½µ•Ñ¥µ•Ì¡…¹•ÌQ¡É½Õ É•™ÕÍ…°¸)Õ‘¥ĞÕÉÉ•¹Ğµ…¥¸ÔØÍ™•‘”ä½‰Õ¥±äÜØ¸Õ±°É½ÕÑ”¥¹Ù•¹Ñ½ÉäàÄ•¹ÑÉ¥•Ì€¡…”ÈÌ½‘”ÈÄ¼)Y•ÉÑ•àÄĞ½=‰©•ĞÄÌ½A…¥¹ĞÄÀ¤°½É¥¥¹…°Ñ…É•ÑÌ½…Ù…¥±…‰¥±¥Ñä½½¹Ñ•áĞ…‘…ÁÑ•ÉÌ½…Ñ¥½¸½İ¹•ÉÌè(‘½Ì½É…‘¥…°µİ¥É¥¹œµ…Õ‘¥Ğ´ÈÀÈØ´ÄÀ´ÈØ¹µ¸9¼µ¥ÍÍ¥¹œ…Ñ¥½¸½İ¹•È½ÈİÉ½¹œµµ½‘”Ñ…É•Ğ)™½Õ¹¥¸Í½ÕÉ”É•Ù¥•ÜìÑ¡¥Ì¥Ì¹½Ğ•á¡…ÕÍÑ¥Ù”¹…Ñ¥Ù”µ•ÍÑÕÉ”½µ•Í •ÉÑ¥™¥…Ñ¥½¸¸(äÜØ	É¥‘”±…Õ¹¡•È‘•™•ĞÉ•Á…¥É•½ÁÕ‰±¥Í¡•ì…±°Ì¡…¹•±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ ¸)	…Í•±¥¹”äÜØU10ÈàÌÍAML¼Á%0¼ÁÍ­¥À€ ÄÀÀ¸İÌ¤°™½ÕÍ•ÈÈÕAML¸()½¹™¥Éµ•Í•Á…É…Ñ”á…Ğ‰ÕœèÁÉ•¥Í¥½¸µ™…”ÁÉ½©•Ñ•µ¹½Éµ…°™…±±‰…¬Ñ¡É•Í¡½±Å”´ÕÁà)Ù•ÉÍÕÌ…ÑÕ…°µÕ±Ñ¤µ™…”µ‘¥É•Ğ•ÍÑÕÉ”Å”´ÑÁà…¸¥¹Ù•ÉĞÍ¥¸¥¸¹…ÉÉ½Ü¹•…Èµ™É½¹Ğ)…µ•É„‰…¹¸á¥ÍÑ¥¹œ‰•Ù•°µ¥¹Í•ĞÜÔÀ™…”Ü°…µ•É„•¹ÑÉ”­¹½Éµ…°¨Ô¬ À°Å”´Ø°À¤èá…Ğ(´È¸È¥¹½ÉÉ•Ñ±ä•áÑÉÕ‘•Ì¬È¸Èì½É‰¥Ğ¸ÀÄÕÑÌ¥¹İ…É¸±¥¸=I%%90ÁÉ•¥Í¥½¸ÕÑ½™˜)Ñ¼•ÍÑÕÉ”Å”´Ğ=91d¸9¼µ…¥¸½‘É…œ½­•É¹•°½•½µ•ÑÉä½¡¥ÍÑ½Éä½¥¹™•É•¹”½Á¡åÍ¥…°¥¹ÁÕĞ¡…¹”¸)å¹…µ¥ŒÁÉ•¥Í¥½¸µ™…”¡¥±…¹‘É…İ•ÈµÕ¤Á…É•¹Ğ½Í¡•±°­•åÌäÜÜÉ•™É•Í¡•ì½É¥¥¹…°)¥¹Ñ•É¹…°ÍÑ…µÁÌÉ•Ñ…¥¹•¸I•Ù¥•İ•¡…Í¡•Ì…¹É•±•…Í”É•½Ù•Éä½Í¡•±°µ…É­•ÉÌäÜÜ¸)Q¡É•”¹•ÜÑ•ÍÑÌÕÍ”…ÑÕ…°ÁÉ•¥Í¥½¸ÁÉ½©•Ñ¥½¸€¬¹…Ñ¥Ù”½¹ÑÉ½±±•È½™…±±‰…¬èÄÀ…¹±•Ì°)•á…Ğ±½Í•½ÕÑÁÕĞ½U¹‘½I•‘¼°½±µ½‘”µÕÑ…Ñ¥½¸Í•¹Í¥Ñ¥Ù¥Ñä°™¥Ù”Á¡åÍ¥…°‘É…Ì…¹)ÁÕÉ”µÁ±…¸¥¹Ù…É¥…¹”¸½ÕÍ•™¥¹…°ÄÈáAML¼Á%0¼ÁÍ­¥À°¹½Ğ™Õ±°äÜÜÉ•ÉÕ¸¸()UÍ•ÈÌÁ¡åÍ¥…°Q¡É½Õ É•™ÕÍ…°É•µ…¥¹ÌÕ¹ÁÉ½Ù•¸½¸…™™•Ñ•µ½‘•°¸…µ•É„¡…¹•Ì)ÁÉ½©•Ñ•‘É…¥¹œ…¹É•™•É•¹”¥¹™•É•¹”ì¹¼‰±…¹­•ĞÉ•™ÕÍ…°™¥à±…¥µ•¸Õ‘¥Ğ)…±Í¼É•½É‘ÌÑİ¼™½±±½ÜµÕÁÌè¹Õµ•É¥ŒÍå¹Ñ¡•Ñ¥Œ¥¹ÁÕĞÍÑ¥±°ÑÉ…Ù•ÉÍ•Ì¥¹™•É•¹”°…¹)ÁÉ•¥Í¥½¸ÍÕ•ÍÌ½É•…‘‰…¬±…­Ì‘½İ¹ÍÑÉ•…´½µµ¥Ğ…­¹½İ±•‘•µ•¹Ğ¸-••ÀÑ¡•Í”=A8)™½È¹…ÉÉ½ÜÉ•ÍÕ±Ğ½½¹ÍÑÉ…¥¹Ğİ½É¬ì‘½¸ĞÉ•±…àÑ½Á½±½äÕ…É‘Ì½ÈÉ•Á±…”­•É¹•°¸()9•ÜÙ¥Í¥‰¥±¥Ñä•Ù¥‘•¹”İ¡¥±”äÜÜÁÉ•Á…É•è•á…ĞäÜØÉ•Á½ÉĞÀĞèÔÌèÄáhÍ¡½İÌ¡¥‘”…¹Ù…Ì)…ĞÈĞØÈØ°É¥¡ÑU$Ù¥Í¥‰±”½‰Í•ÉÙ…Ñ¥½¸ÌÔÀÄĞ°É•ÍÑ½É”ÌÜÈĞØ¸UÍ•È½¹™¥ÉµÌ½¹ÑÉ½±ÌMQd)Ù¥Í¥‰±”…™Ñ•ÈM¡½ÜÍ¸Q½Àµ±•Ù•°¡¥‘‘•¸é™…±Í”¥ÌÉ•ÍÑ½É•ÍÑ…Ñ”¸1…å½ÕĞ½ÍÑå±•Ì½¡¥ÑÌ)¡•…±Ñ¡äÑ¡É½Õ¡½ÕĞì¹½A…¥¹Ğ½Í•ÍÍ¥½¸°Á±…¥¸äÜÈ…Ñ¥Ù”¸Q¡¥Ì¥µÁ±¥…Ñ•Ì„…¹Ù…Ì½U$)Á…¥¹Ñ¥¹œ¥¹Ñ•É…Ñ¥½¸‰ÕĞ¹¼•¹¥¹”É½½Ğ…ÕÍ”½ÈÁ•Éµ…¹•¹Ğ™¥à¥ÌÁÉ½Ù•¸¸I•Ñ…¥¸)=A8É•ÕÉÉ•¹”…¹‘•Ù¥”µÁÉ½Ù•¸µ…¹Õ…°!¥‘”ÍŠIM¡½ÜÍÉ•½Ù•Éäì¹¼…ÕÑ½µ…Ñ¥Œ‰±¥¹¬°)Á½±°½É•±½…½É•¹‘•É•È¡…¹”¸M•”‘½Ì½Õ¤µ…¹Ù…ÌµÁÉ½‰”´äÜØ¹µ™½ÈÁÉ•¥Í”•Ù¥‘•¹”¸()Y%äÜÜè½¹™¥É´äÜÜ°Í…µ”¹•…Ñ¥Ù”á…Ğ½¸¹•…Èµ™É½¹ĞÑ¡•¸Í±¥¡Ñ±ä½É‰¥Ñ•Ù¥•Üì)U¹‘½I•‘¼ìÉ•ÑÉä½É¥¥¹…°Á¡åÍ¥…°Q¡É½Õ İ¥Ñ ¥¹™•É•¹”½™˜½½¸°Í•¹•á…ĞÉ•™ÕÍ…°)…¹ÁÉ”µ…ÑÑ•µÁĞ¹‰½á±…ˆ¥˜É•ÕÉÉ¥¹œ¸	É¥‘”Á…¥ÈÁÁ±ä½…¹•°É•Ñ…¥¹•¸%˜É¥¡ĞU$)™…¥±ÌÕÍ”•á¥ÍÑ¥¹œ!¥‘”ÍŠIM¡½ÜÍìäÜÜ‘½•Ì9=P±…¥´Ñ¼É•Á…¥ÈÙ¥Í¥‰¥±¥Ñä¸9•áĞÁÉ¥½É¥Ñ¥é”)•Ù¥‘•¹”µ±•…¹Ù…Ì½U$‘¥…¹½Í¥Ì°Ñ¡•¸•á…ĞµÉ•ÍÕ±Ğ½¥¹™•É•¹”™½±±½ÜµÕÁÌ‰•™½É”µ½É”)™•…ÑÕÉ”É½±±½ÕĞ¸äÜĞ¥½¸¼äÜÄÉÉ…ä…•ÁÑ…¹”…¹ÁÉ½Ñ•Ñ•‘5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸((ŒŒ€¸äÜàƒŠP‘”	É¥‘”ÁÉ•Ù¥•Ü‰•™½É”ÁÁ±äƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•È±…É¥™¥•ÌäÜØ½µµ¥ÑÌ…™Ñ•ÈÁÁ±ä‰ÕĞ‘½•Ì¹½ĞAIY%\°Õ¹±¥­”…•ÁÑ•…”)	É¥‘”¸Q¡¥Ì¥Ì„µ¥ÍÍ¥¹œ¥¹Ñ•É…Ñ¥½¸ÍÑ…”°¹½Ğ™…¥±•‰É¥‘”Ñ½Á½±½ä¸AÉ¥½ÈäÜØ)É•…‘äµÁ…¥È±…Õ¹¡•ÈÉ•Á…¥ÈÉ•Ñ…¥¹•ì¹¼‰É½…äÜØ¼äÜÜAML¥¹™•ÉÉ•¸Õ‘¥Ğµ…¥¹˜Ù„Í™˜ÌÀ°)Í…µ”Õ¥‘•‘”Í•ÍÍ¥½¸¡…¹¼ÁÉ•Ù¥•Ü½İ¹•Èì…”	É¥‘”µÕÑ…Ñ•ÌÁÉ•Ù¥•Üµ•Í °)İ¡¥±”…•ÁÑ•…”½Y•ÉÑ•à	•Ù•°…±É•…‘äÍ¡…É•Ì„É•¹‘•É¥¹œµ½¹±ä‰±Õ”¡½ÍĞ¡•±Á•È¸)I•ÕÍ”•á¥ÍÑ¥¹œÉ•…Ñ•…•	•Ù•±AÉ•Ù¥•Ü½‘¥ÍÁ½Í•…•	•Ù•±AÉ•Ù¥•ÜÕ¹¡…¹•™½È‘”¸()M5Í•±•Ñ¥½¸µ¡Õˆµ‰É¥‘”µÍ•ÍÍ¥½¸‰Õ¥±‘Ì½É¥¥¹…°‰É¥‘•M•±•Ñ•‘‘•Ì½¸ÁÉ¥Ù…Ñ”)±½¹”…¹É•¹‘•ÉÌ¡…¹•Á½±å½¹Ìİ¥Ñ ½É¥¥¹…°‰±Õ”ÑÉ…¹Í±Õ•¹Ğ™¥±°½İ¥É”¡•±Á•È¸)=É¥¥¹…°Í½ÕÉ”½Í•±•Ñ¥½¸½µ•Ñ…‘…Ñ„½¡¥ÍÑ½Éä½ÁÉ½©•ĞÉ•µ…¥¸Õ¹Ñ½Õ¡•Õ¹Ñ¥°ÁÁ±äì)¹¼¹•Üµ½‘•±±¥¹œ½ÑÉ¥…¹Õ±…Ñ¥½¸½¡¥ÍÑ½Éä­•É¹•°°µ…¹…•Èµ•Í É•Á±…•µ•¹Ğ½ÈÉ•¹‘•É•È¸)…¹‘¥‘…Ñ”±½¹”…±±ÌÁÉ•Í•ÉÙ”…Ñ¥Ù”ÍÑ…Ñ”¹µ•Í ‘•ÍÁ¥Ñ”¡¥ÍÑ½É¥…°•‘•Ì½‰Í•ÉÙ•ÉÌ¸)M•±•Ñ¥½¸µ­•ä…¡”É•ÕÍ•ÌÁÉ•Ù¥•Ü‘ÕÉ¥¹œ½É‰¥ĞìÍ•±•Ñ•µ‰½Õ¹‘…Éä¡…¹”É•‰Õ¥±‘Ì¥Ğ°)¥¹½µÁ…Ñ¥‰±”½ÅÕ…±¥ÑäµÉ•™ÕÍ•…¹‘¥‘…Ñ•Ì±•…È¥Ğ¸Õ¥‘•™¥ÉÍĞ±½½ÀÍ¡½İÌ¹¼¡½ÍĞ)Õ¹Ñ¥°½µÁ…Ñ¥‰±”Í•½¹‰½Õ¹‘…ÉäÍ•±•Ñ•¸ÁÁ±ä‘¥Í…‰±•İ¥Ñ¡½ÕĞ…ÑÕ…°ÁÉ•Ù¥•Ü¸)ÁÁ±äÉÕ¹Ì½É¥¥¹…°‰É¥‘”µÕ¤½µµ¥Ğ½¹”ì…¹•°É•µ½Ù•Ì¡½ÍĞ…¹É•Ñ…¥¹Ì¥¹¥Ñ¥…°)Í•±•Ñ¥½¸¸á¥ÍÑ¥¹œU¹‘½I•‘¼İ½É­Ì¸AÉ•Ù¥•ÜÉ•¹‘•É•È½¡•±Á•ÉÌ…¹…”	É¥‘”Õ¹¡…¹•¸()M•ÍÍ¥½¸½İ¹ÌÍ½ÕÉ”Í¹…ÁÍ¡½Ğ­•ä°½‰©•Ğ½µ½‘”½±½¬½Í•¹”½¹Ñ•áĞ¸áÑ•É¹…°•½µ•ÑÉä¼)µ•Ñ…‘…Ñ„¡…¹•Ì°½‰©•Ğ½µ½‘”½Ñ½½°¡…¹”°Á…•¡¥‘”‘¥ÍÁ½Í”¡½ÍĞ]%Q!=UPÉ•ÍÑ½É¥¹œ)ÍÑ…±”µ•Í ½Í•±•Ñ¥½¸½È±½Í¥¹œ¹•İ•ÈÑ½½°U$¸=É¥¥¹…°‰…­É½Õ¹µ•á¥ĞÉ½ÕÑ”ÍÑ¥±°)…±±Ì±½Í”ì¹¼¹•ÜÉ…ÜµÁ½¥¹Ñ•È½İ¹•È°Á•Èµ™É…µ”Á½±±¥¹œ½ÈÍ½ÕÉ”É½±±‰…¬¸M¡…É•)•½µ•ÑÉä½µ…Ñ•É¥…°‘¥ÍÁ½Í…°½ÕÉÌ½¹”¸=Ù•É±…ä¥ÌÑÉ…¹Í¥•¹Ğ½ÕÑÍ¥‘”Í•¹”½‰©•Ğ)µ…¹…•È…¹ÕÍ•Ì•ÍÑ…‰±¥Í¡•	•Ù•°‰±Õ”ÍÑå±”°¹½ĞÍ…Ù••½µ•ÑÉä½È„Í•½¹‰½‘ä¸()½ÕÍ•ÈÌÉAML¼Á%0¼ÁÍ­¥À€¡øÀ¸ØİÌ¤è½É¥¥¹…°	É¥‘”½É…‘¥…°½Í•±•Ñ¥½¸½¹ÑÉ…ÑÌ…¹äÜÜ)…µ•É„É•É•ÍÍ¥½¹Ìì™½ÕÈ…‘‘•É•…°µ½¹ÑÉ½±±•È½Q¡É•”Í•¹”Ñ•ÍÑÌÁÉ½Ù”Ù¥Í¥‰±”¡½ÍĞ)	=IÁÁ±äİ¥Ñ ¹¼Í½ÕÉ”½¡¥ÍÑ½Éä¡…¹•Ì°½¹”µÍÑ•À½µµ¥Ğ­U¹‘½I•‘¼°Í•±•Ñ¥½¸)ÕÁ‘…Ñ”½É•µ½Ù…°½…¹•°°Í½ÕÉ”½½‰©•Ğ½µ½‘”½Ñ½½°½Á…•¡¥‘”±•…¹ÕÀ°¹¼µÍ•¹”É•™ÕÍ…°…¹)Í¥¹±”•½µ•ÑÉä½Ñİ¼µ…Ñ•É¥…°‘¥ÍÁ½Í…°¸á¥ÍÑ¥¹œäÜØ¡…É¹•ÍÌÍÕÁÁ±¥•ÌÉ•…°Í•¹”½Í¡…É•)ÁÉ•Ù¥•Ü™Õ¹Ñ¥½¹Ìì¹¼½±•½µ•ÑÉä½¡¥ÍÑ½Éä…ÍÍ•ÉÑ¥½¸É•µ½Ù•¸9¼¹…Ñ¥Ù”¥A…Ù¥ÍÕ…°)…•ÁÑ…¹”¥¹™•ÉÉ•¸IÕ¹Ñ¥µ”¡…¹”=91d½É¥¥¹…°‘”	É¥‘”Í•ÍÍ¥½¸ìÍ•ÍÍ¥½¸½É•½Ù•Éä)Á¥¹ÌäÜà°Õ¹¡…¹•ÜÄØÉ•¹‘•É•È¥µÁ½ÉĞ•áÁ±¥¥Ñ±äÉ•Ù¥•İ•¥¸…ÍÍ•Ğ½¹ÑÉ…Ğ¸()Y%äÜàèÍ•±•ĞÍ…µ”Ñİ¼‰½Õ¹‘…Éä•‘•ÌƒŠH‘”É…‘¥…°	É¥‘”è	1UÍÁ…¸Ù¥Í¥‰±”)	=IÁÁ±ä¸=É‰¥ĞÑ¼¥¹ÍÁ•ĞìÁÁ±ä­••ÁÌ‰É¥‘”…¹É•µ½Ù•Ì‰±Õ”°U¹‘½I•‘¼¸)…¹•°É•µ½Ù•Ì‰±Õ”°ÁÉ•Í•ÉÙ•Ì½É¥¥¹…°µ•Í ½Í•±•Ñ¥½¸¸Õ¥‘•Ñİ¼µ±½½ÀÍ•±•Ñ¥½¸)ÕÁ‘…Ñ•ÌÁÉ•Ù¥•Ü…ÌÍ•½¹‰½Õ¹‘…Éä¥ÌÍ•±•Ñ•¸…”	É¥‘”É•µ…¥¹ÌÕ¹¡…¹•¸)I¥¡ĞµÍ¥‘”™…Õ±ĞÍÑ…åÌ=A8İ¥Ñ ½¹™¥Éµ•µ…¹Õ…°!¥‘”ÍŠIM¡½ÜÍÉ•½Ù•Éäì¹¼É•¹‘•É¥¹œ)É•Á…¥È½È½Ñ¡•È€¸äÜÜ•á…Ğ½¥¹™•É•¹”½É•…‘‰…¬™½±±½ÜµÕÀ¥¹±Õ‘•¸9•áĞ¹…Ñ¥Ù”ÁÉ•Ù¥•Ü)™••‘‰…¬°Ñ¡•¸•Ù¥‘•¹”µ±•…¹Ù…Ì½U$İ½É¬…¹É•µ…¥¹¥¹œ…Õ‘¥Ğ™½±±½ÜµÕÁÌ¸((ŒŒ€¸äÜäƒŠPá…Ğ¥¹™•É•¹”¥Í½±…Ñ¥½¸…¹ÑÉÕÑ¡™Õ°½µµ¥ĞÉ•…‘‰…¬ì	É¥‘”äÜàAMLƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äAMM•ÌäÜà	É¥‘”ÁÉ•Ù¥•Ü‰•™½É”ÁÁ±ä½…¹•°ìÁÉ½Ñ•Ğ¥ÑÌÁÉ¥Ù…Ñ”)±½¹”½‰±Õ”¡½ÍĞ½Í½ÕÉ”µ¹•ÕÑÉ…°ÁÉ•Ù¥•Ü½½¹”µÍÑ•À½É¥¥¹…°½µµ¥Ğ…¹±¥™•å±”¸)UÍ•È€½¹•áÑ‰Õ¥±…ÕÑ¡½É¥é•ÌÑ¡”Ñİ¼É•µ…¥¹¥¹œá…Ğ…Õ‘¥Ğ™¥á•Ì¸Õ‘¥ĞÉ•µ½Ñ”½ÕÉÉ•¹Ğ)µ…¥¸ÀÈàÜÄá„ä°É•±•…Í”äÜà¸á¥ÍÑ¥¹œ¹Õµ•É¥Œ•ÍÑÕÉ•Ì…±É•…‘äÕÍ”É•Í•ÉÙ•Á½¥¹Ñ•ÈäàÜØì)•á¥ÍÑ¥¹œ‘¥É•Ğ½µµ¥ÑÑ••Ù•¹Ğ½İ¹ÌÍÕ•ÍÍ™Õ°•½µ•ÑÉäÙ…±Õ•Ì¸9¼¹•Ü­•É¹•°¹••‘•¸()=É¥¥¹…°…”É•™•É•¹•U¹‘•ÉA½¥¹Ñ•È¹½Ü¥¹½É•Ì=91d¹Õµ•É¥ŒÁ½¥¹Ñ•ÈäàÜØ¸A¡åÍ¥…°)A•¹¥°½µ½ÕÍ”¥¹™•É•¹”…¹Ñ½±”ÍÑ…Ñ”ÍÑ…äÕ¹¡…¹•¸½Ù•ÉÌáÑÉÕ‘”…¹%¹Í•Ğì)½É¥¥¹…°µ½‘•°µÕ¹¥Ğ½‘¥É•Ñ¥½¸µ…ÁÁ¥¹œ°äÜÜ…±¥¹•¹•…Èµ™É½¹ĞÁÉ½©•Ñ¥½¸°Q¡É½Õ )Í¡•±°µ•á¥ĞÍ¹…ÁÁ¥¹œ…¹¥¹Í•ĞÍ…™•Ñä±…µÀÉ•µ…¥¸¸á…ĞÍÑ¥±°•¹Ñ•ÉÌ½É¥¥¹…°)½¹ÑÉ½±±•È…¹Õ…É‘••½µ•ÑÉä½¡¥ÍÑ½Éä½İ¹•ÉÌì¹¼Í•Á…É…Ñ”µ½‘•±±¥¹œ…±½É¥Ñ¡´¸()AÉ•¥Í¥½¸ÑÉ…­Ì½¹”Íå¹¡É½¹½ÕÌ¹Õµ•É¥ŒÉ•ÅÕ•ÍĞ…¹±¥ÍÑ•¹ÌÑ¼=I%%90)‰½á±…ˆµ™…”µ‘¥É•Ğµ½µµ¥ÑÑ•¸%ĞÉ•½É‘ÌÍÕ•ÍÌ½I•Á•…Ğ½É•…‘‰…¬½¹±ä…™Ñ•ÈÑ¡…Ğ)Í•µ…¹Ñ¥Œ…­¹½İ±•‘•µ•¹Ğ°ÕÍ¥¹œQU0½µµ¥ÑÑ•Ù…±Õ”É…Ñ¡•ÈÑ¡…¸É•ÅÕ•ÍÑ•¥¹ÁÕĞ¸)á¥ÍÑ¥¹œÁ½Í¥Ñ¥Ù”½É••ÍÌ½±½Í•µ¹•…Ñ¥Ù”½%¹Í•Ğ•Ù•¹ÑÌÉ•Ñ…¥¹•ì½±½Á•¸µÍ¡••Ğ)Q¡É½Õ ÍÕ•ÍÌ‰É…¹ ¹½Ü•µ¥ÑÌÍ…µ”Í•µ…¹Ñ¥Œ•Ù•¹Ğ…™Ñ•È½É¥¥¹…°Õ…É‘•½µµ¥Ğ¸)á…µÁ±”èÉ•ÅÕ•ÍÑ•´È¸ÈÍÑ½ÁÁ¥¹œ…ĞÍ¡•±°•á¥Ğ´È¸ÀÉ•½É‘Ì½‘¥ÍÁ±…åÌ´È¸À¸%¹Í•ĞÉ•ÅÕ•ÍĞ)…‰½Ù”Í…™”É…¹”‘¥ÍÁ±…åÌ½É¥¥¹…°±…µÁ•‘¥ÍÑ…¹”°¹•Ù•È…¸Õ¹Á•É™½Éµ•ÄÀÀ¸()9¼…­¹½İ±•‘•µ•¹Ğµ•…¹Ì™…±Í”½É•™ÕÍ•ÍÑ…ÑÕÌ°¹¼™…­”Ù…±Õ”µ½µµ¥ÑÑ••Ù•¹Ğ°ÁÉ¥½È)ÍÕ•ÍÍ™Õ°Á•ÈµÑ½½°I•Á•…Ğ½Ù…±Õ”É•Ñ…¥¹•¸I•™ÕÍ…°É•…‘½ÕĞÍÕÉÙ¥Ù•ÌÍÕ‰Í•ÅÕ•¹ĞÍÑ…ÑÕÌ)½‰Í•ÉÙ•È…±±‰…­Ì°•Ù•¸İ¥Ñ ¹¼ÁÉ¥½ÈÍÕ•ÍÌì¹•áĞÁ¡åÍ¥…°ÁÉ•ÍÌ½á…Ğ…ÑÑ•µÁĞ¼)ÍÕ•ÍÌ±•…ÉÌ¥Ğ¸	±…¹¬½é•É¼½¹½¹™¥¹¥Ñ”¥¹ÁÕĞ…¹…‰Í•¹Ğ¡¥ÍÑ½ÉäÉ•™ÕÍ”‰•™½É”)Íå¹Ñ¡•Ñ¥Œ•½µ•ÑÉä‘¥ÍÁ…Ñ ¸=É¥¥¹…°É•™ÕÍ…°½É½±±‰…¬½Í•±•Ñ¥½¸½¡¥ÍÑ½ÉäÉ•µ…¥¸¸)A¡åÍ¥…°‘É…œ…±±‰…­ÌÍÑ¥±°É•½É•½µ•ÑÉä¹½Éµ…±±ä¸Q¡¥Ì¥ÌÑÉ…¹Í…Ñ¥½¸É•Á½ÉÑ¥¹œ°)¹½ĞÉ•±…á…Ñ¥½¸½˜Ñ½Á½±½äÉ•™ÕÍ…°½ÈÁÉ½½˜½˜ÕÍ•ÈÌÁ¡åÍ¥…°Q¡É½Õ ™…¥±ÕÉ”É•Á…¥È¸()¥¹…°ÔÄÜ™½ÕÍ•‘AML¼Á%0¼ÁÍ­¥À€ à¸İÌ¤è¹•ÜÜ…ÑÕ…°ÁÉ•¥Í¥½¸­‘¥É•Ğµ½¹ÑÉ½±±•ÈÑ•ÍÑÌ)Á±ÕÌ…”½Q¡É½Õ ½¹•…Ñ¥Ù”½É•Á•…Ğ½É…‘¥…°½	É¥‘”½É•±•…Í”É•É•ÍÍ¥½¸¸9•Ü™¥áÑÕÉ•ÌÉÕ¸)½É¥¥¹…°Õ¹¥™½É´µ¥¹Í•Ğ½İ¹•ÈÉ…Ñ¡•ÈÑ¡…¸•¹ÑÉ”µ±•ÉÀ™…±±‰…¬¸Q•ÍĞ•á…Ğ¸ÌÜ…ĞÌ)…µ•É…Ì°Q¡É½Õ …ĞÑ¹•…È½½‰±¥ÅÕ”Ù¥•İÌ°…ÑÕ…°•á¥Ğ‘•ÁÑ °U¹‘½I•‘¼½½¹”¡•­Á½¥¹Ğ°)É•™ÕÍ••¹Ñ¥É”µÍ½±¥ÕĞİ¥Ñ Õ¹¡…¹•Í½ÕÉ”½¡¥ÍÑ½Éä½±…ÍĞÙ…±Õ”°…ÑÕ…°±…µÁ•)%¹Í•Ğ°¹Õµ•É¥Œ¥¹Ù…±¥½¹¼µ¡¥ÍÑ½ÉäÉ•™ÕÍ…°°É•…°Á¡åÍ¥…°Ù•ÉÑ•à¥¹™•É•¹”ÙÌÍ…µ”)¹Õµ•É¥Œ½¹Ñ…Ğ°Á•ÉÍ¥ÍÑ•¹Ğ™…¥±ÕÉ”É•…‘½ÕĞ¸9¼¹…Ñ¥Ù”¥A……•ÁÑ…¹”¥¹™•ÉÉ•¸)¡…¹•™Õ¹Ñ¥½¹…±¥Ñä=91dÁÉ•¥Í¥½¸µ™…”…¹Í±¥¹•Ì¥¸½É¥¥¹…°µÕ±Ñ¤µ™…”µ‘¥É•Ğì)‘É…İ•ÈµÕ¤¡…¹•Ì¡¥±Á¥¸½¹±ä¸I•Ù¥•İ•Á…É•¹Ğ½¡¥±½‘¥É•Ğ½É•½Ù•ÉäÁ¥¹ÌäÜä…¹)Í¡•±°µ…É­•ÉÌ½…ÍÍ•Ğ¡…Í¡•Ì¸5…¥¸½•½µ•ÑÉä½Q¡É½Õ ­•É¹•±Ì½	É¥‘”äÜà½5Õ±Ñ¤Ä¸À½™É½é•¸¼)¥½¹Ì¼äÜÉÁ±…¥¸¼äÜÍÁÉ½‰”É•µ…¥¸Õ¹¡…¹•¸9¼‘ÕÁ±¥…Ñ”¡¥ÍÑ½Éä½È¥¹ÁÕĞ½İ¹•È¸()Y%äÜäèİ¥Ñ ¥¹™•É•¹”=8°…”á…Ğ¸ÌÜ€¡½È½¹Ù•¹¥•¹ĞÙ…±Õ”¤°½É‰¥Ğ½U¹‘¼½É•ÑÉäì)É•ÍÕ±ĞÍ¡½Õ±É•Ñ…¥¸•¹Ñ•É•‘¥ÍÑ…¹”¸Y…±¥Q¡É½Õ ½Ù•ÉÍ¡½½Ğ‘¥ÍÁ±…åÌ…ÑÕ…°•á¥Ğ¸)QÉä„É•™ÕÍ•ÕĞè•áÁ±¥¥ĞÉ•™ÕÍ…°°ÁÉ•Ù¥½ÕÌÍÕ•ÍÍ™Õ°Ù…±Õ”É•Ñ…¥¹•ìU¹‘¼µÕÍĞ)Õ¹‘¼Ñ¡”±…ÍĞÍÕ•ÍÍ™Õ°½Á•É…Ñ¥½¸°¹½Ğ…¸¥¹Ù•¹Ñ•™…¥±•…Ñ¥½¸¸A¡åÍ¥…°Í¹…À)ÍÑ¥±°İ½É­Ì¸	É¥‘”ÁÉ•Ù¥•ÜäÜàÉ•µ…¥¹Ì…•ÁÑ•¸I¥¡ĞµÍ¥‘”™…Õ±ĞÍÑ¥±°=A8ìµ…¹Õ…°)!¥‘”ÍŠIM¡½ÜÍÉ•½Ù•Éä½¹™¥Éµ•¸9•áĞ•Ù¥‘•¹”µ±•…¹Ù…Ì½U$İ½É¬½È…ÑÕ…°äÜä)™••‘‰…¬ì¹¼¹•Ü™•…ÑÕÉ”½¥½¸•áÁ…¹Í¥½¸‰•™½É”½ÕÑÍÑ…¹‘¥¹œÉ•±¥…‰¥±¥Ñä‘¥É•Ñ¥½¸¸((ŒŒ€¸äàÀƒŠP•áÁ±¥¥Ğ¥±”I•™É•Í ‘¥ÍÁ±…äÉ•½Ù•Éäì€¸äÜäÕÍ•ÈAMLƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈAMLäÜäÁÉ½Ñ•ÑÌá…Ğ¥¹™•É•¹”¥Í½±…Ñ¥½¸°…ÑÕ…°½µµ¥ĞÉ•…‘‰…¬°É•™ÕÍ…°¼)±…ÍĞµÙ…±Õ”½¡¥ÍÑ½Éä…¹•á¥ÍÑ¥¹œÁ¡åÍ¥…°Í¹…ÁÁ¥¹œ¸	É¥‘”äÜàAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•¸)Õ‘¥Ğµ…¥¸É˜É•”Üá„½É•±•…Í”äÜä¸9•áĞÉ•±¥…‰¥±¥Ñä™½ÕÌ¥ÌÉ•ÕÉÉ¥¹œÉ¥¡ĞµÍ¥‘”U$¸(äÜØ‘•Ù¥”ÁÉ½‰”ÁÉ½Ù•!¥‘”ÍÉ•ÍÑ½É•½¹ÑÉ½±Ì…¹M¡½ÜÍ±•™ĞÑ¡•´Ù¥Í¥‰±”ìÑ¡¥Ì)¹…ÉÉ½İÌ…¹Ù…Ì½U$Á…¥¹Ñ¥¹œ¥¹Ñ•É…Ñ¥½¸‰ÕĞ‘½•Ì¹½Ğ•ÍÑ…‰±¥Í É½½Ğ…ÕÍ”¸9¼™ÕÉÑ¡•È)ÍÁ•Õ±…Ñ¥Ù”ML½±…å•È½É•¹‘•É•È¡…¹”½ÈÁ•Éµ…¹•¹ĞÉ•Á…¥È±…¥´¥¸äàÀ¸()‘¥±”ƒŠHI•™É•Í ‘¥ÍÁ±…ä°…Ù…¥±…‰±”]%Q!=UP•¹…‰±¥¹œ‘•‰Õœ¸%ĞÕÍ•ÌM5•á¥ÍÑ¥¹œ)É•…Ñ•…¹Ù…ÍY¥Í¥‰¥±¥ÑåAÉ½‰”¥¹±¥¹”Ù¥Í¥‰¥±¥ÑäÍ…Ù”½É•ÍÑ½É”½İ¹•È¸áÁ±¥¥ĞÕÍ•È±¥¬)¡¥‘•Ì=91d½É¥¥¹…°…¹Ù…Ì™½È½¹”ÁÉ•Í•¹Ñ•™É…µ”€¡Ñİ¼I…±±‰…­Ì¤°Ñ¡•¸É•ÍÑ½É•Ì)•á…Ğ½É¥¥¹…°Ù¥Í¥‰¥±¥ÑäÙ…±Õ”½ÁÉ¥½É¥Ñä½…‰Í•¹”¸ÈÔÁµÌÑ¥µ•È™…±±‰…¬…¹Á…•¡¥‘”¼)¡¥‘‘•¸µ‘½Õµ•¹Ğ½‘•‰Õœµ½™˜…¹•±±…Ñ¥½¸•¹ÍÕÉ”É•ÍÑ½É…Ñ¥½¸¥˜…¹¥µ…Ñ¥½¸™É…µ•ÌÍÑ…±°¸)9¼É•±½…°…¹Ù…ÌÉ”µÉ•…Ñ¥½¸½É•Í¥é”½AH½µ½‘•°½¡¥ÍÑ½Éä½Í•±•Ñ¥½¸µÕÑ…Ñ¥½¸°¹•ÜÉ•¹‘•É•È°)…ÕÑ½µ…Ñ¥ŒÉ•ÕÉÉ¥¹œ‰±¥¹¬°¥‘±”Á½±±¥¹œ°¹…Ù¥…Ñ¥½¸½ÈÁ½¥¹Ñ•È½İ¹•È¸•‰Õœ½™˜ÍÑ…åÌ)½™˜ì¥±”±½Í•Ì…™Ñ•ÈÍÕ•ÍÍ™Õ°ÍÑ…ÉĞ°‰ÕÑÑ½¸É•Í•ÑÌ…™Ñ•ÈÉ•ÍÑ½É”¸½¹™¥Éµ…Ñ¥½¸)Í…åÌ¥ÍÁ±…äÉ•™É•Í¡•°¹½ĞÑ¡…ĞÑ¡”™…Õ±Ğ¥ÌÁ•Éµ…¹•¹Ñ±ä™¥á•¸()A•¹‘¥¹œÉ•™É•Í É•©•ÑÌÉ•Á•…ÑÌ…¹‘½•Ì¹½ĞÑ…­”½Ù•Èµ…¹Õ…±±ä¡¥‘‘•¸‘•‰ÕœÁÉ½‰”¸)á¥ÍÑ¥¹œÁÉ½‰”‰ÕÍäÕ…É¹½Ü…±Í¼¡•­Ìµ…¥¸½…”½‘”½Y•ÉÑ•à½	•Ù•°±¥Ù”‘É…Ìì)A…¥¹Ğ½Ñ½½°Í•ÍÍ¥½¸½¥éµ¼Õ…É‘ÌÉ•Ñ…¥¹•¸I•™ÕÍ••¹ÑÉä±•…Ù•Ìİ½É¬Õ¹Ñ½Õ¡•…¹)…Í­ÌÑ¼™¥¹¥Í …Ñ¥Ù”½Á•É…Ñ¥½¸½ÈM¡½ÜÍ¸•‰ÕœÁÉ½‰”½½‰Í•ÉÙ…Ñ¥½¸‰ÕÑÑ½¹Ì‘¥Í…‰±•)‰É¥•™±ä‘ÕÉ¥¹œÉ•½Ù•Éä¸=ÁÑ¥½¹…°‘•‰Õœ±½ÌÉ•½ÉÍÑ…ÉĞ½•¹…¹¥¹Ù…±¥‘…Ñ”ÍÑ…±”)…¡•É•Á½ÉÑÌ¸=É¥¥¹…°Ñİ¼µÍÑ•À‘¥…¹½ÍÑ¥Œ…¹ÕÍ•Èµ½‰Í•ÉÙ…Ñ¥½¸™±½ÜÕ¹¡…¹•¸()¥¹…°Ìä™½ÕÍ•‘AML¼Á%0¼ÁÍ­¥À€ À¸ÈáÌ¤è¹•ÜĞÉ•½Ù•ÉäÑ•ÍÑÌ€¬•á¥ÍÑ¥¹œ‘•‰Õœ½‘¥ÍÁ±…ä¼)…¹Ù…ÌäÜÌ½	É¥‘”äÜà½á…ĞäÜä½É•±•…Í”½¹ÑÉ…ÑÌ¸á…Ğ¥¹±¥¹”É•ÍÑ½É…Ñ¥½¸…É½ÍÌØ)¥¹¥Ñ¥…°ÍÑ…Ñ•Ì°¡¥‘‘•¸™É…µ”‰•™½É”É•ÍÑ½É”°ÍÑ…±±•µ™É…µ”™…±±‰…¬°…¹•°½±…Ñ”µ™É…µ”)±•…¹ÕÀ°‰ÕÍä½µ…¹Õ…°µÁÉ½‰”É•™ÕÍ…°°Í¡•‘Õ±•È™…¥±ÕÉ”É•ÍÑ½É…Ñ¥½¸°…ÑÕ…°¥±”•¹ÑÉä)İ¥Ñ ‘•‰Õ=°Á…•¡¥‘”½‘•‰Õœµ½™˜±•…¹ÕÀ°Õ¹¡…¹•‰…­¥¹œ‘¥µ•¹Í¥½¹Ì…¹µ½‘•°¼)¡¥ÍÑ½Éä¥‘•¹Ñ¥ÑäÑ•ÍÑ•¸=É¥¥¹…°äÜÌÑ•ÍÑÌÉ•Ñ…¥¹•¸M¡…É•Ñ•ÍĞ¡•±Á•È½¹±ä…¥¹Ì)½ÁÑ¥½¹…°¥±”¡½ÍĞ¸9¼¹…Ñ¥Ù”¥A…É•½Ù•ÉäµÍÁ••½Ù¥ÍÕ…°…•ÁÑ…¹”¥¹™•ÉÉ•¸)IÕ¹Ñ¥µ”¡…¹”=91d•ÍÑÕÉ”µ‘•‰Õœì‘¥É•ĞÍ¡•±°½É•½Ù•ÉäÁ¥¹ÌäàÀ…¹É•Ù¥•İ•¡…Í¡•Ì¸(äÜäµ½‘•±±¥¹œ½á…Ğ°äÜà	É¥‘”½Í¡…É•É•¹‘•É•È°µ…¥¸½5Õ±Ñ¤Ä¸À½¥½¹Ì½™É½é•¸Õ¹¡…¹•¸()Y%äàÀè¥±—ŠII•™É•Í ‘¥ÍÁ±…äè…¹Ù…ÌÉ•ÑÕÉ¹Ì…ÕÑ½µ…Ñ¥…±±ä°µ½‘•°½Í•±•Ñ¥½¸ÍÑ…äì)U¹‘½I•‘¼ÍÑ¥±°…ÑÌ½¸…ÑÕ…°ÁÉ¥½Èµ½‘•±±¥¹œ¡…¹•Ì¸9¼‘•‰Õœ•¹…‰±”É•ÅÕ¥É•¸)]¡•¸É¥¡Ğ½¹ÑÉ½±Ì¹•áĞ‘¥Í…ÁÁ•…È°ÕÍ”Ñ¡¥Ì½¹”…Ñ¥½¸ìÉ•Á½ÉĞ¥˜Ñ¡•äÉ•ÑÕÉ¸…¹)ÍÑ…äÙ¥Í¥‰±”¸á¥ÍÑ¥¹œµ…¹Õ…°!¥‘”ÍŠIM¡½ÜÍÉ•µ…¥¹Ì…Ù…¥±…‰±”¥˜‰É¥•˜É•™É•Í ‘½•Ì)¹½ĞÉ•ÁÉ½‘Õ”¥ÑÌÉ•½Ù•Éä¸Q¡¥Ì¥Ì½¹Ù•¹¥•¹Ğ•Ù¥‘•¹”µ‰…Í•I=YId°¹½Ğ„±…¥´)Ñ¡…Ğ¥¹Ñ•Éµ¥ÑÑ•¹ĞÁ…¥¹Ñ¥¹œ™…Õ±Ğ¥Ì™¥á•¸9•áĞ™½±±½Ü¹…Ñ¥Ù”™••‘‰…¬…¹¥¹Ù•ÍÑ¥…Ñ”)…¹Ù…Ì½U$‰½Õ¹‘…Éä™É½´•Ù¥‘•¹”ìÉ•Ñ…¥¸…±°ÁÉ½Ñ•Ñ•äÜä¼äÜà¥¹Ñ•É…Ñ¥½¹Ì¸((ŒŒ€¸äàÄƒŠPUXÁ½ÁÕÀÑ½À±…å•È…¹½µÁ±•Ñ”ÍÕÉ™…”Ñ•…É‘½İ¸ì€¸äàÀÉ•½Ù•ÉäAML½¹±äƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäàÀAML…•ÁÑÌ•áÁ±¥¥ĞÉ•½Ù•Éä°‰ÕĞÉ•©•ÑÌ¹••‘¥¹œµ…¹Õ…°I•™É•Í …Ì„)Í½±ÕÑ¥½¸…¹ÍÕÁÁ±¥•ÌÉ•ÁÉ½‘Õ¥‰±”UXİ¥¹‘½ÜÉ•Á½ÉĞÀÜèÔÄèÀåh¸-••ÀÉ¥¡ĞµÍ¥‘”Ù¥ÍÕ…°)™…¥±ÕÉ”=A8ì‘½¸Ğµ¥ÍÉ•½ÉäàÀ…ÌU$É•Á…¥ÈAML¸äÜäá…Ğ…¹äÜà	É¥‘”ÁÉ½Ñ•Ñ•¸)Õ‘¥ĞÕÉÉ•¹Ñµ…¥¹„ÀÀØàÕ„àè•Ù•¹Ñ¡…¥¸¥Ì=‰©•ĞUYÑ½½±ÌààÄàÃŠIµ•Í¡!•…±Ñ¡±½Í”äÈàÔÃŠH)™¥¹…±Í•ÍÍ¥½¹¹Õ±°°¹¼UX‘¥Ñ½È½Á…¥¹Ğ½‘¥ÍÁ±…åÉ•™É•Í ¹••‘•¸½¹ÑÉ½±Ì½•½µ•ÑÉä½¡¥ÑÌ)¡•…±Ñ¡äì¡¥‘‘•¸Í¡…É•‘¡½ÍĞÉ•µ…¥¹ÌÙ¥•İÁ½ÉĞµ½¹Ñ…¥¹•İ¥Ñ èÄÌĞ½½Ù•É™±½İ…ÕÑ¼¼)½¹Ñ…¥¹±…å½ÕÑÁ…¥¹Ğ½¥Í½±…Ñ¥½¹¥Í½±…Ñ”¸M½ÕÉ”•¹±…­•Ù¥•İÁ½ÉĞµÍÑå±”½Á±…•µ•¹Ğ)±•…¹ÕÀ¸á…Ğ•Ù¥‘•¹”ÍÕµµ…Éä¥¸‘½Ì½Õ¤µÕØµÑÉ¥•È´äàÀ¹µì¹¼ÁÉ½Ù•¸•¹¥¹”…ÕÍ”¸()I•Á…¥È½É¥¥¹…°Ñ½½°µÍ•ÍÍ¥½¸µÕ¤½İ¹•È°9=P…¸…ÕÑ½µ…Ñ¥Œİ½É­…É½Õ¹¸UXÑ½½±ÌÕÍ•Ì)µ…¹Õ…°¹…Ñ¥Ù”A½Á½Ù•ÈÑ½À±…å•È¥˜ÍÕÁÁ½ÉÑ•ì½É¥¥¹…°¡½ÍĞ½½¹ÑÉ½°¹½‘•ÌÉ•µ…¥¸¥¸)=4Í¼•á¥ÍÑ¥¹œÍ½Á•İ¥‘”ML½±¥ÍÑ•¹•ÉÌ½…Ñ¥½¹ÌÍÕÉÙ¥Ù”¸¥á•Á½Í¥Ñ¥½¹¥¹œ™½±±½İÌ)Ù¥•İÁ½ÉĞÑ½À¬ÄÉÁàì‘å¹…µ¥ŒÙ¥•İÁ½ÉĞ¡•¥¡Ğ‰½Õ¹‘Ì°İ¥¹‘½Ü½Ù¥ÍÕ…°É•Í¥é”±¥ÍÑ•¹•ÉÌ)…Ñ¥Ù”½¹±äİ¡¥±”Í¡½İ¸¸=É¥¥¹…°€¸äÔàÑÉ…¹Í™½Éµ™É•”Á½Í¥Ñ¥½¸É•Ñ…¥¹•°‰ÕĞ™…¥±•)Á…¥¹Ğµ½¹Ñ…¥¹µ•¹Ğ±…å•ÈÉ•µ½Ù•¸QÉ…¹ÍÁ…É•¹Ğ¹½¹¥¹Ñ•É…Ñ¥Ù”‰…­‘É½À°¥¹¡•É¥Ñ•Ñ•áĞ)½±½ÕÈì¹¼µ½‘…°½¥¹•ÉĞ½™½ÕÌµÑÉ…À½È¹•ÜÉ…ÜµÁ½¥¹Ñ•È½İ¹•È¸=Ñ¡•ÈÑ½½±ÌÕ¹¡…¹•¸()=¸±½Í”½½¹Ñ•áĞÍİ¥Ñ °¡¥‘”½É•±•…Í”¹…Ñ¥Ù”ÍÕÉ™…”‰•™½É”É•ÑÕÉ¹¥¹œ½É¥¥¹…°)½¹ÑÉ½±Ìì±•…ÈÁ½Á½Ù•È½‘½¬½İ¥‘”™±…Ì…¹10¥¹±¥¹”Ù¥•İÁ½ÉĞÍÑå±•ÌìÁ…É¬•µÁÑä)¡¥‘‘•¸¡½ÍĞ‰…¬¥¸‘É…İ•È¸UX‘¥Ñ½È¡…¹‘½™˜•áÁ±¥¥Ñ±äÍÕÍÁ•¹‘ÌÍ½ÕÉ”ÍÕÉ™…”)‰•™½É”™¥ÉÍĞİ½É­ÍÁ…”Á…¥¹Ğİ¡¥±”ÁÉ•Í•ÉÙ¥¹œ½É¥¥¹…°±½¥…±Í•ÍÍ¥½¸Õ¹Ñ¥°	…¬¼)±½Í”¸Q¡ÕÌ¹¼•µÁÑäÑ½Àµ±…å•ÈÁ½ÁÕÀ…‰½Ù”É•‘¥Ñ½È¸á¥ÍÑ¥¹œİ½É­ÍÁ…”äÔÈ…¹…±°)UX½…Ñ±…Ì½¡¥ÍÑ½Éä½µ…Ñ ½İ¹•ÉÌÕ¹Ñ½Õ¡•¸9…Ñ¥Ù”Õ¹ÍÕÁÁ½ÉÑ•½Ñ¡É½İ¥¹œA$™…±±Ì‰…¬)Í…™•±äÑ¼½É¥¥¹…°Õ¹ÑÉ…¹Í™½Éµ•…‰Í½±ÕÑ”Á…¹•°°İ¥Ñ¡½ÕĞ½¹Ñ…¥¹µ•¹ĞìÍ…µ”±•…¹ÕÀ¸)9¼…¹Ù…ÍÙ¥Í¥‰¥±¥Ñä½É•™É•Í ½É•Í¥é”½É•¹‘•É•ÈÉ•Í•Ğ°Ñ¥µ•È°Á•Èµ™É…µ”Á½±±¥¹œ½Èµ•Í )¡…¹”¥¹ÑÉ½‘Õ•¸á¥ÍÑ¥¹œµ…¹Õ…°É•½Ù•ÉäÉ•µ…¥¹Ì…Ù…¥±…‰±”‰ÕĞ¥Ì¹½Ğ¥¹Ù½­•¸()á¥ÍÑ¥¹œ‘•‰ÕœÍ¹…ÁÍ¡½Ğ¹½Ü¥¹±Õ‘•ÌÍ½ÕÉ”µÁ…É•¹Ğ½Á½Á½Ù•È½Ñ½Á1…å•ÈÍÑ…Ñ”Á±ÕÌ)µ•Í¡!•…±Ñ¡M•ÍÍ¥½¸…¹‰½á±…‰UY]½É­ÍÁ…”°Í¼¹…Ñ¥Ù”É•¹‘•É¥¹œµ½‘”½±•…¸±½Í”…¸‰”)Ù•É¥™¥•¥˜É•ÕÉÉ•¹”Á•ÉÍ¥ÍÑÌ¸Q¡¥Ì¥Ì•Ù¥‘•¹”°¹½ĞÉ•Á±…•µ•¹Ğ½¹ÑÉ½±Ì¸(ÌØĞÑ…É•Ñ•‘AML¼Á%0¼ÁÍ­¥À€ Ğ¸ÕÌ¤èÕ¹•Ü½¹ÑÉ½±±•È½¹…Ñ¥Ù”µA$µ‘½Õ‰±”Ñ•ÍÑÌ½Ù•ÈÄÔ)½Á•¸½±½Í”å±•Ì°•á…Ğ½É¥¥¹…°¹½‘•Ì½½¹Ñ•áĞ°Ñ½Àµ±…å•ÈÉ•±•…Í”½ÍÑå±•Ì½Á…É­¥¹œ°)UX‘¥Ñ½È¡…¹‘½™˜°É•Í¥é”½‘¥ÍÁ½Í…°°½Ñ¡•ÈµÑ½½°Íİ¥Ñ …¹Õ¹ÍÕÁÁ½ÉÑ•½Ñ¡É½Ü™…±±‰…¬¸)=É¥¥¹…±UX½İ½É­ÍÁ…”½Í•ÍÍ¥½¸½¡•…±Ñ ½‘•‰Õœ½	É¥‘”½á…Ğ½É•±•…Í”¡•­ÌÉ•Ñ…¥¹•¸äÔà)Ñ•ÍĞ¹½ÜÉ•©•ÑÌ½±½¹Ñ…¥¹µ•¹ĞÉ…Ñ¡•ÈÑ¡…¸ÁÉ•Í•ÉÙ¥¹œ„µ¥Ñ¥…Ñ¥½¸Ñ¡…Ğ™…¥±•)½¹‘•Ù¥”¸9¼±½…°¹…Ñ¥Ù”]•‰-¥ĞÙ¥ÍÕ…°É•ÁÉ½‘ÕÑ¥½¸½Õ…É…¹Ñ••Á•Éµ…¹•¹ĞÉ•Á…¥È)±…¥µ•¸•Ù¥”µÕÍĞ½¹™¥É´Ñ¡¥ÌÍÑÉÕÑÕÉ…°Í½ÕÉ”™¥àÁÉ•Ù•¹ÑÌÑ¡”ÑÉ¥•È¸()¡…¹•ÉÕ¹Ñ¥µ”½¹±ä½É¥¥¹…°Í¡…É•‘Í•ÍÍ¥½¸½µ•Í¡¡•…±Ñ ¡…¹‘½™˜½‘•‰Õœ•Ù¥‘•¹”ì‘¥É•Ğ)Í¡•±°½É•½Ù•Éä­•åÌäàÄ…¹É•Ù¥•İ•¡…Í¡•Ì¸9…Ñ¥Ù”A$ÍÕÁÁ½ÉÑ•Í¥¹”M…™…É¤ÄÜì)ÁÉ¥µ…ÉäÍ½ÕÉ•Ì¥¸¥¹¥‘•¹Ñ‘½Œ¸9¼Í¡…É•±…å½ÕĞ½Á½Í¥Ñ¥½¹•È•‘¥ÑÌ°‘ÕÁ±¥…Ñ”Á½ÁÕÀ°)UX­•É¹•°±µ…¥¸°äàÀÉ•½Ù•Éä¥µÁ±•µ•¹Ñ…Ñ¥½¸°äÜåá…Ğ°äÜá	É¥‘”±5Õ±Ñ¤Ä¸À½È™É½é•¸¡…¹•Ì¸()Y%äàÄèİ¥Ñ¡½ÕĞI•™É•Í ½…ÁÀµÍİ¥Ñ ½É½Ñ…Ñ¥½¸°É•Á•…Ñ•‘±ä=‰©•ÓŠIU[ŠI±½Í”°¥¹ÍÁ•Ğ)É¥¡ĞÑ½½±‰…È½ÍÑ…ÑÕÌ•… å±”ìÑ¡•¸ÕÑ¼…Ñ±…Ì½=Á•¸UX‘¥Ñ½È½	…¬…¹½É‰¥ĞÑ¼)É¥¡Ğ•‘”¸½¹ÑÉ½±ÌµÕÍĞÍÑ…ä‘É…İ¸…¹ÕÍ…‰±”¸U$•‰Õœ¥˜É•ÕÉÉ•¹”è¡½ÍĞÁ…É•¹Ğ)Í¡½Õ±‰”‘É…İ•È…™Ñ•É±½Í”°Á½Á½Ù•É¹Õ±°½Ñ½Á1…å•É™…±Í”°½¹Ñ…¥¹¹½¹”ìÍ•¹¹•ÜÉ•Á½ÉĞ¸)¼¹½Ğ±½Í”Ù¥ÍÕ…°¥ÍÍÕ”™É½´…ÕÑ½µ…Ñ•AML¸9•áĞ…ÑÕ…°äàÅ‘•Ù¥”É•ÍÕ±Ğ‰•™½É”)Õ¹É•±…Ñ•‘™•…ÑÕÉ”É½±±½ÕĞ½ÈÍÁ•Õ±…Ñ¥Ù”™ÕÉÑ¡•ÈML½•¹¥¹”™¥á•Ì¸((ŒŒ€¸äàÈA…¥¹Ğ¥½¹Ì…¹ÁÉ½Ñ•Ñ•€¸äàÄUX±¥™•å±”((´mátUÍ•ÈAMLäàÄèÉ•Á•…Ñ•UX½Á•¸½±½Í”…¹‘¥Ñ½ÈÉ•ÑÕÉ¸­••ÀÉ¥¡Ğ½¹ÑÉ½±ÌÙ¥Í¥‰±”İ¥Ñ¡½ÕĞI•™É•Í ‘¥ÍÁ±…äìÉ•Ñ…¥¸¹…Ñ¥Ù”Ñ½Àµ±…å•ÈÉ•±•…Í”½¡½ÍĞÑ•…É‘½İ¸¸(´mátUÍ•ÈAMLäàÈè…±°ÄÀA…¥¹Ğ¥½¹Ìµ…Ñ Í•±•Ñ•AÉ½½˜ÀÌİ¥Ñ É•…‘…‰±”…ÁÑ¥½¹Ìì½É¥¥¹…°•¹ÑÉ”½½¹ÑÉ½°Á±…•µ•¹ÑÌ…¹Í•±•Ñ•½‘¥Í…‰±•™••‘‰…¬ÍÑ…äÕÍ…‰±”¸(´mátUÍ•ÈAMLäàÈè	ÉÕÍ ½	±ÕÈ½MµÕ‘”…¹1…å•ÉÌ½5…Í¬½%µ…”½<½5…ÀÍ¥é”½Á•¸½É¥¥¹…°±•™Ğ½¹ÑÉ½±Ììå±¥¹œ­••ÁÌÉ…‘¥…°Õ¹Ñ¥°A•¹¥°ÍÕÉ™…”ÕÍ”ì‰…­É½Õ¹¡½±É•½Á•¹Ì¸(´ltY%äàÈèA…¥¹ĞU¹‘½I•‘¼½½¹”°µ½‘•±±¥¹œ¥½¹Ì…¹UX±½Í”½É¥¡ĞÑ½½±‰…ÈÍÑ…ä…•ÁÑ•¸(´mátÉÑİ½É¬…Õ‘¥ĞèÄÀÙ…±¥MYÌ•á…ĞÑ¼AÉ½½˜ÀÌ°é•É¼Ñ…É•Ğµ‰½à½Ù•É±…ÁÌ°‰½Õ¹‘Ì™¥Ğ•á¥ÍÑ¥¹œÌÔÁÁàÉ…‘¥…°¸(((ŒŒ€¸äàÌÍÑ…ÉÑÕÀÑ½½±‰…È€¼É•™É•Í É•ÕÉÉ•¹”((´lt=A8èÕÍ•ÈäàÈÉ•Á½ÉÑÌ¥¹Ù¥Í¥‰±”É¥¡Ğ½¹ÑÉ½±Ì¥µµ•‘¥…Ñ•±ä…™Ñ•ÈÉ•™É•Í ìÍ•Ù•É…°É•™É•Í¡•ÌÉ•½Ù•É•¸äàÄUX…•ÁÑ…¹”‘½•Ì¹½Ğ±½Í”ÍÑ…ÉÑÕÀÙ¥Í¥‰¥±¥Ñä¸(´ltY%äàÌèÉ•Á•…Ñ•É•±½…‘ÌÉ•Ñ…¥¸‘É…İ¸É¥¡ĞÑ½½±‰…È½ÍÑ…ÑÕÌ‰•™½É”¹…Ù¥…Ñ¥½¸°UX•¹ÑÉä°…ÁÀµÍİ¥Ñ ½ÈÉ½Ñ…Ñ¥½¸¸(´ltY%äàÌèÉ…µ”±°½U¹‘½I•‘¼½½ÕÌ½=‰©•ÑÌ½Y%\İ½É¬½¹”½¸½É¥¥¹…°½İ¹•ÉÌìÉ¥¡Ğ‰É½İÍ•È½µ•¹Ô‰½Õ¹‘ÌÕ¹¡…¹•¸(´ltY%äàÌèUX½Á•¸½±½Í”½‘¥Ñ½È	…¬…¹…•ÁÑ•A…¥¹Ğ¥½¹Ì½İ½É­™±½ÜÉ•µ…¥¸ÕÍ…‰±”¸(´mátÕÑ½µ…Ñ•èÍ¥¹±”™¥¹…°½É‘•É•Ñ½½±‰…È¥¸Í¡•±°ì½É¥¥¹…°Y%\½MY¹½‘•ÌÉ•Ñ…¥¹•½¸¡å‘É…Ñ¥½¸ì=‰©•ÑÌ½É…µ”‰¥¹½¹”ìÉ•…°…µ•É„™¥Ğì™…±±‰…¬É•…Ñ¥½¸É•Ñ…¥¹•¸((ŒŒ€¸äàÌ¹…Ñ¥Ù”™••‘‰…¬ƒŠP™¥ÉÍĞµÉ•™É•Í ™…¥±ÕÉ”((´mátUÍ•È™Õ¹Ñ¥½¹…°AMLäàÌÉ•½É‘•ì…•ÁÑ•A…¥¹ĞäàÈ…¹½É¥¥¹…°Ñ½½±‰…È…Ñ¥½¹ÌÉ•Ñ…¥¹•¸(´lt%1½=A8è™¥ÉÍĞÉ•™É•Í ÍÑ¥±°±½Í•ÌÉ¥¡Ğ½¹ÑÉ½±Ì½¸äàÌìÍÑ…ÉÑÕÀÍ¡•±°ÍÑ…‰¥±¥é…Ñ¥½¸‘¥¹½ĞÁ…ÍÌ¹…Ñ¥Ù”Ù¥Í¥‰¥±¥Ñä¸(´lt…ÁÑÕÉ”™É•Í äàÌU$•‰Õœ½¸%IMP™…¥±•±½…‰•™½É”…¹äÉ•½Ù•Éä½È…ÁÀµÍİ¥Ñ ìÍÑ…Ñ¥ŒµÑ½½±‰…È¡åÁ½Ñ¡•Í¥Ì¥Ì¹½Ğ„½¹™¥Éµ•É½½Ğ…ÕÍ”¸((ŒŒ€¸äàÌÉ½Õ¹µÉ•¥½¸•Ù¥‘•¹”ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ((´lt=A8è¹•Ü…ÁÑÕÉ”¡…ÌÙ¥Í¥‰±”U$‰ÕĞµ¥ÍÍ¥¹œÉ¥¡ĞÉ½Õ¹Í¡…‘¥¹œ¸-••ÀÍ•Á…É…Ñ”™É½´•…É±¥•È¥¹Ù¥Í¥‰±”µ½¹ÑÉ½±Ì™…¥±ÕÉ”¸(´mátMÕÁÁ±¥•ÍÑ…ÉÑÕÀ½Á…•Í¡½ÜÑ½½±‰…Èİ¥‘Ñ ÍÑ…‰±”ÌÄÜ¸ØÀäÌÜÔì…¹Ù…ÌÈÜÌÉàÄØÔÈì¹¼…Ñ¥Ù”UXÑ½À±…å•È¸=4•Ù¥‘•¹”‘½•Ì¹½Ğ•ÍÑ…‰±¥Í ™±½½È½Í¡…‘½ÜÉ•¹‘•É¥¹œ¸(´mát%¹¥Ñ¥…°ÍÉ••¹Í¡½Ğ¥¹ÍÁ•Ñ•è€¸äàÌÑ½ÀµÉ¥¡Ğ½¹ÑÉ½±ÌÙ¥Í¥‰±”ìÍÑÉ…¥¡ĞÙ•ÉÑ¥…°Í¡…‘¥¹œÍ•…´¹•…ÈÉ¥¡ĞÅÕ…ÉÑ•Èì™±½½È½¹Ñ¥¹Õ•Ì½¸‰½Ñ Í¥‘•Ì°Í•Á…É…Ñ”Í±½Á¥¹œ‘¥ÍÑ…¹Ğ•‘”¸(´ltMµ…±°½É‰¥Ğ]%Q!=UPÉ•™É•Í ½…ÁÀµÍİ¥Ñ èÉ•Á½ÉĞİ¡•Ñ¡•ÈÍ•…´ÍÑ…åÌ™¥á•½¸ÍÉ••¸°µ½Ù•Ìİ¥Ñ É½Õ¹°½È‘¥Í…ÁÁ•…ÉÌ‰•™½É”¡½½Í¥¹œÍ½ÕÉ”¡…¹”¸9¼É•Á•…Ğ¥¹¥Ñ¥…°ÍÉ••¹Í¡½Ğ½‘•‰Õœ‘ÕµÀ¹••‘•¸((ŒŒ€¸äàĞÍ•±•Ñ•µ™…”É½ÕÀ…ÕÑ¡½É¥¹œ((´lt…”µ½‘”èÍ•±•Ğ™…•Ì°Y%\€ø…•É½ÕÁÌ€ø¹…µ”€øÍÍ¥¸Í•±•Ñ•ì½¹±ä¡½Í•¸™…•Ì¡…¹”É½ÕÀ¸(´ltM…µ”¹…µ”©½¥¹ÌÉ½ÕÀì‘¥™™•É•¹Ğ¹…µ”Í•Á…É…Ñ•Ìì±•…ÈÍ•±•Ñ•±•…Ù•Ì½Ñ¡•ÈÉ½ÕÁÌ¥¹Ñ…Ğ¸(´ltU¹‘¼½I•‘¼°M…Ù”½=Á•¸É•Ñ…¥¸É½ÕÁÌ…¹•½µ•ÑÉä½UYÌì¹¼UXÉ•ÅÕ¥É•µ•¹Ğ¸(´lt9¼Í•±•Ñ¥½¸½İÉ½¹œµ½‘”½…Ñ¥Ù”Ñ½½°½±½­•½±¥¹­•½É•¥Á”½‰©•ÑÌÉ•™ÕÍ”İ¥Ñ¡½ÕĞ¡¥ÍÑ½Éä¸(´mátÕÑ½µ…Ñ•µ•Ñ…‘…Ñ„°Õ¹¡…¹••½µ•ÑÉä½Í½ÕÉ”°¹¼µ½À°Ù…±¥‘…Ñ¥½¸½É•™ÕÍ…°…¹¡•­Á½¥¹ĞÑ•ÍÑÌÁ…ÍÌ¸(´lt%¹Ñ•Éµ¥ÑÑ•¹ĞÉ¥¡ĞµÉ•¥½¸É•¹‘•É¥¹œ½¥éµ¼±½ÍÌÉ•µ…¥¹Ì=A8ì…¹¹½ĞÕÉÉ•¹Ñ±äÉ•ÁÉ½‘Õ”°¹½ĞÉ•Á…¥É•¸((ŒŒ€¸äàÔÉ½ÕÀµ¹…µ”É•ÕÍ”€¼€¸äàĞ…•ÁÑ•((´mátUÍ•ÈAMLäàĞÁÉ½Ñ•ÑÌÍ•±•Ñ•µ™…”É½ÕÀ…ÍÍ¥¹µ•¹Ğ½±•…È°U¹‘½I•‘¼…¹M…Ù”½=Á•¸¸(´ltM•±•Ğ™…•Ì¥¸½¹”É½ÕÀìUÍ”Í•±•Ñ•É½ÕÀ¹…µ”½Á¥•Ì¥ÑÌ¹…µ”°¡…¹•Ì¹¼™…•Ì½È¡¥ÍÑ½Éä¸(´lt5¥á•½Õ¹É½ÕÁ•½¹¼Í•±•Ñ¥½¸É•™ÕÍ•ÌÁ¥­ÕÀ…¹É•Ñ…¥¹ÌÕÉÉ•¹Ğ¹…µ”¸(´lt½ÕÌ¹…µ”¥¹ÁÕĞè•á¥ÍÑ¥¹œ¹…µ•Ì½™™•É•½¹”•… ìÉ•¹…µ”¡½¥”™½±±½İ•‰äÍÍ¥¸Í•±•Ñ•©½¥¹ÌÉ½ÕÀ¸(´ltU¹‘½I•‘¼…™™•ÑÌ…ÑÕ…°…ÍÍ¥¹µ•¹Ğ½¹±äìM…Ù”½=Á•¸É•Ñ…¥¹Ì…•ÁÑ•äàĞ‰•¡…Ù¥½È¸(´mátÕÑ½µ…Ñ•É•…µ½¹±äÉ•ÕÍ”°¥¹Ù…±¥½µ¥á•É•™ÕÍ…°…¹Í…™”½ÁÑ¥½¸¹Ù…±Õ”¥¹Í•ÉÑ¥½¸¡•­ÌÁ…ÍÌ¸((ŒŒ€¸äàØA•¹¥°™…•É½ÕÀÍÑÉ½­•Ì((´mátUÍ•ÈAMLäàÔÁÉ½Ñ•ÑÌ•á¥ÍÑ¥¹œµ¹…µ”É•ÕÍ”…¹äàĞ…ÕÑ¡½É¥¹œ½¡¥ÍÑ½Éä½Í…Ù”‰…Í•±¥¹”¸(´lt…”µ½‘”€øY%\…•É½ÕÁÌ€ø¹…µ”€øA•¹¥°™…•É½ÕÀÍÑÉ½­•ÌìÍÑÉ½­”Ù¥Í¥‰±”™…•Ì°±¥™Ğ…ÍÍ¥¹ÌÉ½ÕÀ¸9¼UXÉ•ÅÕ¥É•¸(´lt½±½ÕÉÌÕÁ‘…Ñ”=81%Pì•… ¡…¹•ÍÑÉ½­”¥Ì½¹”U¹‘¼½I•‘¼•¹ÑÉä°¹¼µ½ÀÍÑÉ½­•Ì…‘¹½¹”¸(´lt¥¹•ÉÌ¹…Ù¥…Ñ”ìÍ•½¹…¹Ù…Ì½¹Ñ…Ğ…¹•±ÌÕÉÉ•¹ĞÍÑÉ½­”ìMÑ½ÀÉ•ÍÑ½É•Ì½É‘¥¹…ÉäÍ•±•Ñ¥½¸¸(´lt¡…¹”½Á¥¬¹…µ”…¹É•…É´ìÍİ¥Ñ ±½½¬ÍÑ½ÁÌ‰ÉÕÍ ìM…Ù”½=Á•¸É•Ñ…¥¹ÌÉ½ÕÁÌ¸(´mátÕÑ½µ…Ñ•ÁÕÉ”½É•…°½İ¹•ÈÉ½ÕÑ¥¹œ½Ù•ÉÌÍ½ÕÉ”µ¹•ÕÑÉ…°ÍÑ…¥¹œ°…¹•±±…Ñ¥½¸°±½ÍĞ…ÁÑÕÉ”½Á…•¡¥‘”°½¹ÑÉ½±ÌÉ•ÍÑ½É…Ñ¥½¸°ÍÑ…±”½¹Ñ•áĞ°½¹”¡•­Á½¥¹Ğ…¹‰…­É½Õ¹A•¹¥°¹…Ù¥…Ñ¥½¸¸(´lt9…Ñ¥Ù”A•¹¥°½•ÍÑÕÉ”…•ÁÑ…¹”Á•¹‘¥¹œìÉ•¹‘•É¥¹œ™…Õ±ĞÉ•µ…¥¹Ì=A8¥¹‘•Á•¹‘•¹Ñ±ä¸((ŒŒ€¸äàÜA•¹¥°™…•É½ÕÀ•É…Í•È((´mátUÍ•ÈAMLäàØÁÉ½Ñ•ÑÌ¹…µ•A•¹¥°ÍÑÉ½­•Ì…¹…•ÁÑ•¡¥ÍÑ½Éä½¹…Ù¥…Ñ¥½¸¸(´ltY%\…•É½ÕÁÌ€øÉ…Í”É½ÕÀÍÑÉ½­•ÌìÍ…µÁ±•™…•Ì‰•½µ”Õ¹É½ÕÁ•=81%P¸(´lt=Ñ¡•ÈÉ½ÕÁÌ½•½µ•ÑÉä½UYÌÕ¹¡…¹•ì½¹”U¹‘¼½I•‘¼Á•È¡…¹••É…Í”ÍÑÉ½­”¸(´lt±É•…‘äÕ¹É½ÕÁ•ÍÑÉ½­”…‘‘Ì¹¼¡¥ÍÑ½ÉäìÍİ¥Ñ ‰…¬Ñ¼¹…µ•ÍÑÉ½­•Ì…¹MÑ½À¸(´ltM…Ù”½=Á•¸…¹™¥¹•È¹…Ù¥…Ñ¥½¸É•µ…¥¸…•ÁÑ•ì¹…Ñ¥Ù”•É…Í•ÈÉ•Ù¥•ÜÁ•¹‘¥¹œ¸(´mátÕÑ½µ…Ñ••É…Í•ÈÍÑ…¥¹œ½¹¼µ½À½Õ¹Ñ½Õ¡•‘…Ñ„½¡•­Á½¥¹Ğ½…¹•°½Íİ¥Ñ Ñ•ÍÑÌÁ…ÍÌ¸((ŒŒ€¸äàà•á¥ÍÑ¥¹œµÉ½ÕÀ‘É½Á‘½İ¸É•Á…¥È€¼É•¹‘•É¥¹œÉ•ÕÉÉ•¹”((´lt9…Ñ¥Ù”á¥ÍÑ¥¹œÉ½ÕÀ‘É½Á‘½İ¸½Á•¹Ì½¸¥A…ìÍ•±•Ğ•á¥ÍÑ¥¹œ¹…µ”°…ÍÍ¥¸¹•Ü™…•Ì¸(´lt=É¥¥¹…°É½ÕÀÑ•áĞ¥¹ÁÕĞÉ•…Ñ•Ì¹•Ü¹…µ•ÌìÉ•½Á•¹¥¹œY%\±¥ÍÑÌÕÉÉ•¹Ğµ•Í É½ÕÁÌ¸(´ltM•±•Ñ½È¡½¥”¡…¹•Ì¹¼•½µ•ÑÉä½¡¥ÍÑ½Éä…¹ÍÑ½ÁÌÁÉ¥½È‰ÉÕÍ ìU¹‘½I•‘¼…™™•ÑÌ…ÑÕ…°…ÍÍ¥¹µ•¹Ğ¸(´ltÉ…Í•ÈäàÜ…¹M…Ù”½=Á•¸É•µ…¥¸‘•Ù¥”É•Ù¥•Üì¹¼äàÜAML¥¹™•ÉÉ•¸(´mátÕÑ½µ…Ñ•…ÑÕ…°½ÁÑ¥½¸Á½ÁÕ±…Ñ¥½¸½¡…¹”…±±‰…­Ì°É•™É•Í ½•µÁÑä½Ñ•áĞÍ…™•Ñä…¹É•Ñ…¥¹•…ÕÑ¡½É¥¹œ½ÍÑÉ½­”É•É•ÍÍ¥½¹ÌÁ…ÍÌ¸(´lt=A8è±½İ•ÈµÉ¥¡Ğ½Y%\µ•¹Ô‰±…¹¬½È½¹”¥¸äàÜ¸=4½¡¥Ğ¡•…±Ñ ‘½•Ì¹½ĞÁÉ½Ù”Á¥á•°É•¹‘•É¥¹œ¸M•”‘½Ì½Õ¤µÉ¥¡ĞµÉ•¥½¸´äàÜ¹µ¸((ŒŒ€¸äàäY%\Á…¹•°‘¥…¹½ÍÑ¥Ì€¼€¸äàà…•ÁÑ…¹”((´mátUÍ•ÈAMLäààÁÉ½Ñ•ÑÌ¹…Ñ¥Ù”á¥ÍÑ¥¹œÉ½ÕÀ‘É½Á‘½İ¸…¹É•±…Ñ•…ÕÑ¡½É¥¹œ™±½Ü¸(´lt9½Éµ…°Y%\½ÍÉ½±°½É½ÕÀÁ¥­•ÈÉ•µ…¥¸ÕÍ…‰±”İ¥Ñ ‘•‰Õœ½™˜¸(´lt%˜™…Õ±ĞÉ•ÕÉÌ°‘•‰Õœ½¸€øY%\…ÑÑ•µÁĞ€ø…ÁÑÕÉ”½½Áä‰•™½É”É•½Ù•ÉäìÉ•Á½ÉĞ¥¹±Õ‘•ÌÙ¥•İ5•¹Ô¹½Á•¸°Á…¹•°¹½‘•Ì½ÍÉ½±°…¹É•¹‘•È½ÍÑÉ½­”ÍÑ…Ñ”¸(´lt9¼™½É•É•ÁÉ½‘ÕÑ¥½¸¹••‘•¥˜™…Õ±Ğ…‰Í•¹ĞìÉ•¹‘•É¥¹œ¥ÍÍÕ”ÍÑ…åÌ=A8¸(´mátÑÕ…°É•Á½ÉĞ½½‰Í•ÉÙ•ÈÑ•ÍÑÌ‘¥ÍÑ¥¹Õ¥Í ½Á•¸½±½Í•½µ¥ÍÍ¥¹œ°…ÁÑÕÉ”ÍÉ½±°½µ½‘•Ì°­••À=4Õ¹¡…¹•…¹…Ù½¥µ•…ÍÕÉ•µ•¹ÑÌİ¡•¸‘•‰Õœ½™˜¸((ŒŒ€¸ääÀ±½Í•Y%\ÍÕÉ™…”±¥™•å±”((´ltÉ•Í ±…Õ¹ ½É•±½…èÉ¥¡ĞU$‘É…İ¸ìY%\±½Í•¥¹¥Ñ¥…±±ä°¹¼¡½ÍĞÁ…¹•°ÍÕÉ™…”¸(´ltI•Á•…Ñ•Y%\½Á•¸½±½Í”°ÍÉ½±°°É½ÕÀÁ¥­•È…¹Ñ½½°‰ÕÑÑ½¹ÌÉ•Ñ…¥¸‰•¡…Ù¥½È¸(´lt•‰Õœ±½Í•Y%\èÁ…¹•°‘¥ÍÁ±…å¹½¹”½é•É¼É•Ğì½Á•¸Y%\è½É‘¥¹…ÉäÁ…¹•°‰½Õ¹‘Ì½ÍÉ½±°¸(´mát=É¥¥¹…°Ñ½½±‰…È½…Ñ¥½¸½¹½‘”¥‘•¹Ñ¥Ñä°É•±•…Í”…¹‘•‰Õœ½…ÕÑ¡½É¥¹œ¡•­ÌÁ…ÍÌ¸(´lt=A8è¹…Ñ¥Ù”É¥¡ĞµÉ•¥½¸É•¹‘•É¥¹œìääÀ±½Í•µÍÕÉ™…”¡…É‘•¹¥¹œ¥Ì¹½ĞÁ•Éµ…¹•¹ĞÉ•Á…¥ÈÁÉ½½˜¸((ŒŒ€¸ääÄ½µÁ…Ğ™…•É½ÕÀÁ…¥¹Ğ‘½¬((´mátUÍ•ÈAMLääÀÁÉ½Ñ•ÑÌ±½Í•Y%\ÍÕÉ™…”±¥™•å±”…¹…•ÁÑ•µ•¹Ô½Á¥­•È‰•¡…Ù¥½È¸(´lt=Á•¸™…•É½ÕÀÁ…¥¹Ğ½¹ÑÉ½±ÌÍ¡½İÌ½µÁ…Ğ1P‘½¬ìY%\±½Í•Ì°…”µ½‘”Í•±•Ñ•Ñ¡É½Õ ½É¥¥¹…°‰ÕÑÑ½¸¸(´ltá¥ÍÑ¥¹œÉ½ÕÀ€¼½µÁ±•Ñ•¹…µ”•‘¥Ğ…ÉµÌA…¥¹ĞìÁ•ÉÍ¥ÍÑ•¹ĞA…¥¹Ğ½É…Í”Íİ¥Ñ İ¥Ñ¡½ÕĞÉ•½Á•¹¥¹œY%\¸(´ltM•±•Ñ•™…•Ì…‘Ù…¹•ÍÍ¥¸½±•…È½UÍ”¹…µ”É•µ…¥¸ìÍÑÉ½­•Ì½U¹‘½I•‘¼½M…Ù•=Á•¸­••À½É¥¥¹…°‰•¡…Ù¥½È¸(´lt½¹”ÍÑ½ÁÌ‰ÉÕÍ ½¡¥‘•Ì‘½¬ìµ½‘”½±½½¬½…¹½Ñ¡•ÈÑ½½°±½Í•Ì¥Ğ°¹…Ù¥…Ñ¥½¸Õ¹…™™•Ñ•¸I•½Á•¸É•Ñ…¥¹Ì½É¥¥¹…°Ù…±Õ•Ì¸(´mátÕÑ½µ…Ñ•½É¥¥¹…°µ¹½‘”½Ù…±Õ”½±¥ÍÑ•¹•È±¥™•å±”°½¹”°½µµ…¹É½ÕÑ¥¹œ…¹…Ñ¥Ù”µÑ½½°É•™ÕÍ…°¡•­ÌÁ…ÍÌ¸(´lt9…Ñ¥Ù”¥A…‘½¬É•…‘…‰¥±¥Ñä½Ñ…À½ÑåÁ¥¹œ½Á¥­•È…Ñ”Á•¹‘¥¹œì­••Àİ…Ñ ™½ÈÉ•¹‘•É¥¹œÉ•ÕÉÉ•¹”¸((ŒŒ€¸ääÄÉ•¹‘•É¥¹œÉ•ÕÉÉ•¹”•Ù¥‘•¹”((´mát9…Ñ¥Ù”ääÄY%\½Á•¸½±½Í”ÑÉ…¹Í¥Ñ¥½¹Ì…¹ääÀ±½Í•‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘Ì½¹™¥Éµ•‰äÉ•Á½ÉĞ¸(´lt%1½=A8èÕÍ•ÈÉ¥¡ĞµÉ•¥½¸Ù¥ÍÕ…°±½ÍÌÉ•ÕÉÌ‘•ÍÁ¥Ñ”½ÉÉ•Ğµ•¹ÔÍÑ…Ñ”ì¹¼Á•Éµ…¹•¹ĞääÀÉ•Á…¥È±…¥´¸(´ltääÄ±•™Ğ‘½¬¹…Ñ¥Ù”U`ÍÑ¥±°Á•¹‘¥¹œìÁ…É­•…ÕÑ¡½É¥¹œ¹½‘•Ì±•¥Ñ¥µ…Ñ•±ä¡…Ù”é•É¼‰½Õ¹‘ÌÕ¹Ñ¥°½Á•¹•¸(´lt%˜Á•ÉÍ¥ÍÑ•¹Ğè½µÁ…É”±•™Ğ‘½¬Ù¥Í¥‰¥±¥ÑäÑ¼…™™•Ñ•É¥¡ĞÉ•¥½¸ì¹¼É•Á•…Ğ…¹Ù…Ì½Ñ½±”‘ÕµÀÉ•ÅÕ•ÍÑ•¸((ŒŒ€¸ääÈƒŠP™…•É½ÕÀ½±½ÕÈ½¹…µ”±¥ÍĞì€¸ääÄÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•È½¹™¥ÉµÌääÄÁ…¥¹Ğ½¹ÑÉ½±Ìİ½É¬É•…Ğ…™Ñ•ÈÉ•™É•Í …¹•áÁ±¥¥Ñ±äAMLääÄ¸)AÉ½Ñ•Ğ½µÁ…Ğ±•™Ğ‘½¬°½É¥¥¹…°½¹ÑÉ½±Ì°Á•ÉÍ¥ÍÑ•¹ĞA…¥¹Ğ½É…Í”°½¹”…¹ÍÑÉ½­”)¡¥ÍÑ½Éä½¹…Ù¥…Ñ¥½¸¸MÉ••¹Í¡½ĞáĞäÉÍ¡½İÌÉ¥¡ĞY%\‰½É‘•È½‰…­É½Õ¹İ¥Ñ )‰±…¹¬¥¹Ñ•É¥½È‰•™½É”É•™É•Í ì­••À¥¹Ñ•Éµ¥ÑÑ•¹ĞÉ•¹‘•É¥¹œ…Ñ”=A8¥¹‘•Á•¹‘•¹Ñ±ä¸((ääÈÉ•Á±…•Ìá¥ÍÑ¥¹œÉ½ÕÀ¹…Ñ¥Ù”‘É½Á‘½İ¸İ¥Ñ „‰½Õ¹‘•ÈÀÁÁà±…å•ÈµÍÑå±”±¥ÍĞè)½¹”Ñ…ÀÑ…É•ĞÁ•È¹…µ•É½ÕÀ°½±½ÕÈÍİ…Ñ €¬Í…™”Ñ•áĞ¹…µ”°Í•±•Ñ•µÉ½Ü¡¥¡±¥¡Ğ¸)9…µ”™¥•±ÍÑ¥±°É•…Ñ•Ì¹•ÜÉ½ÕÁÌì¡½½Í¥¹œ„É½ÜÉ•ÕÍ•Ì½É¥¥¹…°¥¹ÁÕĞ…¹…ÉµÌ)½É¥¥¹…°A…¥¹Ğµ½‘”¸I½İÌ…É”ÁÉ•Í•¹Ñ…Ñ¥½¸½¹±ä°¹¼µ•Í ½¡¥ÍÑ½Éä½µ…Ñ•É¥…°µÕÑ…Ñ¥½¸¸)M¡…É•™…•É½ÕÁA…±•ÑÑ”•áÁ½Í•ÌaP•á¥ÍÑ¥¹œÙ¥•İÁ½ÉĞµ•Í µ½É‘•È½½±‘•¸µÉ…Ñ¥¼)½±½ÕÈµ…Àì‰½Ñ É•¹‘•É•È…¹±¥ÍĞÕÍ”¥Ğ¸A…±•ÑÑ”½É•Í••½±¥¡Ñ¹•ÍÌ½Í…ÑÕÉ…Ñ¥½¸ÕÁ‘…Ñ”)Íİ…Ñ¡•Ì°½É¥¥¹…°É•¹‘•É¥¹œ…±½É¥Ñ¡´Õ¹¡…¹•¸I½İÌ­••À¹½‘”½™½ÕÌ¥‘•¹Ñ¥Ñä½¸)Í•±•Ñ¥½¸½½±½ÕÈÉ•™É•Í ìÉ½ÕÀµ•µ‰•ÉÍ¡¥ÀÉ•‰Õ¥±‘Ì±…å½ÕĞ½¹±äİ¡•¸¡…¹•¸)I•™É•Í ÕÉÉ•¹Ğµ•Í ½¸½Á•¸°¹…µ”½•‘¥Ğ½Í•±•Ñ¥½¸°Á…±•ÑÑ”¡…¹•Ì…¹ÅÕ•Õ•½É¥¥¹…°)‰½‘äÉ•‰Õ¥±‘Ì€¡ÍÑÉ½­”½µµ¥Ğ°…Ñ¥Ù”½‰©•ĞÍİ¥Ñ °U¹‘½I•‘¼¤ì¹¼Á½±±¥¹œ½¹•ÜÁ½¥¹Ñ•È)½İ¹•È¸9…µ•Ì…É”Ñ•áÑ½¹Ñ•¹Ğ°¹•Ù•È!Q50¸µÁÑä±¥ÍĞ•áÁ±…¥¹Ì¹…µ”€¬Á…¥¹Ğİ½É­™±½Ü¸)1•…ääààÁ¥­•ÈÑ•ÍÑÌµ¥É…Ñ”Ñ¼¹•Ü±¥ÍĞ…‘…ÁÑ•ÈÁÉ•Í•ÉÙ¥¹œÕÉÉ•¹Ğµµ•Í ½¹…µ”½¹¼)µÕÑ…Ñ¥½¸½Ù•É…”ì¹•ÜÉ•¹‘•É•ÈÑ•ÍÑÌ½Ù•ÈÍ•±•Ñ¥½¸½¥‘•¹Ñ¥Ñä½•µÁÑä½Ñ•áĞÍ…™•Ñä°)½É¥¥¹…°‰ÉÕÍ …±±‰…¬…¹Íİ…Ñ µÑ¼µÉ•¹‘•Èµ…ÑÑÉ¥‰ÕÑ”Á…É¥Ñä…É½ÍÌ…±°ĞÁ…±•ÑÑ•Ì¸)MÑÉ½­”äàÜ½…ÕÑ¡½É¥¹œäàÔ½‘½¬ääÄ½UX½A…¥¹Ğ½µ…¥¸½5Õ±Ñ¤Ä¸À…¹ääÀY%\ÉÕ±”Õ¹¡…¹•¸)Y…±¥‘…Ñ¥½¸èäÌÑ…É•Ñ•AML¼Á%0¼ÁÍ­¥ÀìÍå¹Ñ…à…¹‘¥™˜¡•­ÌÁ…ÍÌ¸I•Ù¥•İ•)¡…¹•É•¹‘•È½½É”½¹•Üµ±¥ÍĞ…¹Í¡•±°½É•½Ù•Éä…¡”­•åÌì¹¼™Õ±°µÍÕ¥Ñ”½¹…Ñ¥Ù”)É•¹‘•É¥¹œÁÉ½½˜±…¥µ•¸Q¡”ÁÉ¥½ÈäàÔÍ…™”µÑ•áĞ…ÍÍ•ÉÑ¥½¸¹½ÜÑ…É•ÑÌ±¥ÍĞ±…‰•±Ì)¥¹ÍÑ•…½˜¹…Ñ¥Ù”½ÁÑ¥½¸¥µÁ±•µ•¹Ñ…Ñ¥½¸¸ääÈ…İ…¥ÑÌ¥A…±¥ÍĞ…•ÁÑ…¹”¸()ÕÑÕÉ”ÕÍ•È½…°è…•É½ÕÀ‰½Õ¹‘…É¥•Ì‘•™¥¹”UX¥Í±…¹Í•…µÌ°Ñ¡•¸É½ÕÀµÑ…É•Ñ•)¥µ…”½A	H…ÍÍ¥¹µ•¹Ğ¸Õ‘¥Ğ½É¥¥¹…°UX…Ñ±…Ì½Í•…´½ÍÑ¥Ñ …¹Á…¥¹Ğµ…Í¬½µ…Ñ•É¥…°)½İ¹•ÉÌ™¥ÉÍĞ¸¥ÉÍĞ±¥­•±äÉ½ÕÑ”Í¡…É•…Ñ±…Ìİ¥Ñ Á•ÈµÉ½ÕÀµ…Í­Ì½‰…­¥¹œìÍ•Á…É…Ñ”)µ…Ñ•É¥…°Í±½ÑÌÉ•ÅÕ¥É”É•¹‘•É•È½Í…Ù”½=	(½1½9=4…Õ‘¥Ğ¸Q¡¥Ì‰Õ¥±=L9=P¥µÁ±•µ•¹Ğ)Õ¹İÉ…Àµ‰äµÉ½ÕÁÌ½ÈÁ•ÈµÉ½ÕÀµ…Ñ•É¥…±Ì°…¹µÕÍĞ¹½Ğ¥µÁ±äÑ¡•ä•á¥ÍĞ¸M…µ”µ¹…µ”)‘¥Í½¹¹•Ñ•™…”Á…Ñ¡•Ìµ…äå¥•±µÕ±Ñ¥Á±”¥Í±…¹‘Ìì•½µ•ÑÉäÍÑ…åÌİ•±‘•¸()Y%ääÈè½Á•¸…•É½ÕÁÌÁ…¥¹Ğ‘½¬ìÁ…¥¹ĞÈ¬É½ÕÀ¹…µ•Ì°¥¹ÍÁ•ĞÍİ…Ñ ½¹…µ”É½İÌ¸)Q…ÀÉ½İÌ…¹Á…¥¹Ğ½•É…Í”ìÍ•±•Ñ•¹…µ”½¡¥¡±¥¡Ğ…¹U¹‘½I•‘¼É•™É•Í ±¥ÍĞ¸‘©ÕÍĞ)Y%\Á…±•ÑÑ”½É•Í••…¹É•½Á•¸‘½¬èÍİ…Ñ¡•Ì™½±±½ÜÙ¥•İÁ½ÉĞ‰…Í”½±½ÕÉÌ€¡±¥¡Ñ¥¹œ)…¸Í¡…‘”µ½‘•°¤¸1½¹œ¹…µ•Ì½µ…¹äÉ½ÕÁÌÍÑ…ä½µÁ…Ğì½¹”½™¥¹•È¹…Ù¥…Ñ¥½¸¸((ŒŒ€¸ääÌƒŠP…”ÁÁ±äá…Ğ¹…Ñ¥Ù”µÁ½¥¹Ñ•È…ÁÑÕÉ”É•Á…¥ÈƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌÁÁ±äáÑÉÕ‘”á…Ğ‘½•Ì¹½Ğİ½É¬…¹ÑÉ…ÁÌÑ¡”ÕÍ•È¥¸áÑÉÕ‘”¸)Õ‘¥Ñ•ÕÉÉ•¹Ğµ…¥¸ÔäØİ‘ˆÈä½‰Õ¥±ääÈ°½É¥¥¹…°…”Á½ÁÕÀ½ÁÉ•¥Í¥½¸½‘¥É•Ğ½¹ÑÉ½±±•È°)A•¹¥°…Ñ”…¹Q¡É½Õ ™…±±‰…¬¸9¼¹•Ü•½µ•ÑÉä°¡¥ÍÑ½Éä½È•ÍÑÕÉ”½İ¹•È¹••‘•¸)½¹™¥Éµ•É•É•ÍÍ¥½¸è¹Õµ•É¥Œá…Ğ‘¥ÍÁ…Ñ¡•ÌÉ•Í•ÉÙ•Íå¹Ñ¡•Ñ¥ŒÁ½¥¹Ñ•ÈäàÜØ°‰ÕĞ)½É¥¥¹…°Á½¥¹Ñ•É‘½İ¸9‰•¥¹¥É•ÑÉ…œ…±°¹…Ñ¥Ù”Í•ÑA½¥¹Ñ•É…ÁÑÕÉ”™½È¥Ğ¸	É½İÍ•ÉÌ)É•©•ĞÑ¡¥Ì¹½¹•á¥ÍÑ•¹Ğ¹…Ñ¥Ù”Á½¥¹Ñ•Èİ¥Ñ 9½Ñ½Õ¹‘ÉÉ½È¸Ù•¹ÑQ…É•ĞÉ•Á½ÉÑÌ¡…¹‘±•È)•á•ÁÑ¥½¹Ì…¹½¹Ñ¥¹Õ•Ì‘¥ÍÁ…Ñ ì‰•¥¸¡……±É•…‘äÍ•Ğ‘É…œ°±•…Ù¥¹œÁ•¹‘¥¹œÁÉ•ÍÌ)…±¥Ù”Ñ½¼¸A½¥¹Ñ•ÉÕÀ±•…ÉÌÁ•¹‘¥¹œÁÉ•ÍÌ™¥ÉÍĞ°±•…Ù¥¹œ‘É…œÍ•ĞìÁ½ÁÕÀÑ¡•¸‘¥Í…‰±•Ì)á…Ğ½¥¹ÁÕĞ½½¹”¥¹‘•™¥¹¥Ñ•±ä¸…É±¥•ÈÑ•ÍÑÌÕÍ•„¹¼µ½À…ÁÑÕÉ”ÍÑÕˆ…¹µ¥ÍÍ•¥Ğ¸()=¹±äÉÕ¹Ñ¥µ”¡…¹”è½É¥¥¹…°µÕ±Ñ¤µ™…”µ‘¥É•Ğ…ÁÑÕÉ”¡•±Á•ÈÍ­¥ÁÌÉ•Í•ÉÙ•¹Õµ•É¥Œ)Á½¥¹Ñ•ÈäàÜØ…Ğ…±°Ñ¡É•”•á¥ÍÑ¥¹œ…ÁÑÕÉ”Í¥Ñ•Ì¸A¡åÍ¥…°½¹Ñ…ÑÌÉ•Ñ…¥¸¹…Ñ¥Ù”…ÁÑÕÉ”°)½É¥¥¹…°İ¥¹‘½Üµ…ÁÑÕÉ”½µÁ±•Ñ¥½¸°‘•±¥‰•É…Ñ”µ‘É…œÑ¡É•Í¡½±°Í•±•Ñ¥½¸°¥¹™•É•¹”°)•½µ•ÑÉä½Ñ½Á½±½ä½É•™ÕÍ…°½Q¡É½Õ Í…™•Ñä…¹¡¥ÍÑ½Éä¸á…ĞÍÑ¥±°ÉÕ¹Ì½É¥¥¹…°)½¹ÑÉ½±±•È…¹Í•µ…¹Ñ¥Œ½µµ¥Ğ…­¹½İ±•‘•µ•¹Ğì¹¼¹•Ü¹Õµ•É¥Œµ½‘•±±¥¹œ­•É¹•°¸)A½ÁÕÀ…¹ÁÉ•¥Í¥½¸½‘”Õ¹¡…¹•¸M¡•±°½‘¥É•Ğ½É•½Ù•Éä­•åÌääÌÉ•Ù¥•İ•ì¹¼‘å¹…µ¥Œ)¡¥±¡…¹•Ì¸AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°µ…¥¸°…•ÁÑ•¥½¹Ì½…•É½ÕÀ½A…¥¹Ğ½UX½™É½é•¸Õ¹¡…¹•¸()Q•ÍĞ¡•±Á•È¹½Ü½ÁÑ¥½¹…±±äµ½‘•±Ì‰É½İÍ•È…ÁÑÕÉ”É•©•Ñ¥½¸…¹Ù•¹ÑQ…É•Ğ•á•ÁÑ¥½¸)½¹Ñ¥¹Õ…Ñ¥½¸ì‘•™…Õ±Ğ™¥áÑÕÉ•ÌÍÑ¥±°Ñ¡É½ÜÕ¹•áÁ•Ñ•±¥ÍÑ•¹•È™…¥±ÕÉ•Ì¸	•™½É”ÉÕ¹Ñ¥µ”)É•Á…¥È°¹•ÜÑ•ÍÑÌÉ•ÁÉ½‘Õ•™…±Í”á…ĞÍÕ•ÍÌÉ•ÍÕ±Ğ…¹ÍÑÉ…¹‘•‘É…¥¹œÍÑ…Ñ”¸)™Ñ•ÈÉ•Á…¥ÈèÉ•Á•…Ñ•áÑÉÕ‘”½%¹Í•Ğá…Ğ°Í…™”É•™ÕÍ…°Ñ¡•¸Ù…±¥É•ÑÉä°¹¼Íå¹Ñ¡•Ñ¥Œ)…ÁÑÕÉ”½¹¼±¥ÍÑ•¹•È•ÉÉ½ÉÌ½¹¼Á•¹‘¥¹œ‘É…œ°…ÑÕ…°Á½ÁÕÀÁÁ±ä½½¹”±¥™•å±”°½¹”¡¥ÍÑ½Éä)ÍÑ•ÀÁ•ÈÍÕ•ÍÌ…¹U¹‘½I•‘¼Á…ÍÌ¸A¡åÍ¥…°…ÁÑÕÉ”½½µµ¥Ğ½…¹•°É•Ñ…¥¹•¸¥¹…°ÄäÄ)™½ÕÍ•AML¼Á%0¼ÁÍ­¥À€¡øÔ¸ÉÌ¤°¥¹±Õ‘¥¹œ½É¥¥¹…°…”½É•Á•…Ğ½Á½ÁÕÀ½…µ•É„½Q¡É½Õ ¼)¹•…Ñ¥Ù”µ•áÑÉÕ‘”½É•±•…Í”Ñ•ÍÑÌìÍå¹Ñ…à½‘¥™˜¡•­ÌÁ…ÍÌ¸9¼™Õ±°µÍÕ¥Ñ”½È¹…Ñ¥Ù”ÁÉ½½˜±…¥µ•¸()M•Á…É…Ñ”ääÈÉ•¹‘•É¥¹œÉ•ÕÉÉ•¹”…ĞÀÔèÌäèÄÕhèÕÍ•È½‰Í•ÉÙ•É¥¡ÑU$µ¥ÍÍ¥¹œİ¥Ñ …¹Ù…Ì)¡¥‘‘•¸…ĞĞÜĞÌà°Ñ¡•¸É•ÍÑ½É•…¹Ù…ÌÔÀÔÈÌ¸9…Ñ¥Ù”Y%\½Á•¸ÌĞÔÌÈ¡…‰½Õ¹‘Ìääà¼ØØ¼ÌØÀ¼(àÄÄ¸äàĞ…¹äàÁÁàÍÉ½±°½¹Ñ•¹Ğì±½Í•Á…¹•°¥Ì‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘Ì¸Q½½±‰…È±…å½ÕĞ¼)¡¥ÑÌ¡•…±Ñ¡äì¥éµ¼ÁÉ•Í•¹ĞÄäÙàÄäØ…ĞÜÔÈ¸ÜÔ¼ĞĞÌ¸ÈÌĞ¸MÑÕ‘¥¼½Ù•É±…ä½Á…¥ÑäÀ¸É½ÕÀµ±¥ÍĞ)½ÁÑ¥½¹½Õ¹Ğ½Í•±•Ñ•‘%¹‘•à¹Õ±°¥Ì•áÁ•Ñ•™½ÈääÈ%X±¥ÍĞ°¹½Ğ„¹…Ñ¥Ù”µÍ•±•Ğ™…¥±ÕÉ”¸)9¼…ÑÕ…°ÍÉ••¹Í¡½Ğ½…™™•Ñ•É•¥½¸¥‘•¹Ñ¥™¥•¥¸Ñ¡¥ÌÉ•Á½ÉĞì‘¼¹½Ğ¥¹™•È„¹•Ü)É•¹‘•É¥¹œ…ÕÍ”½ÈÕ…É…¹Ñ••!¥‘”ÍÉ•½Ù•Éä¸%¹Ñ•Éµ¥ÑÑ•¹ĞÉ¥¡ĞµÉ•¥½¸Ù¥Í¥‰¥±¥Ñä)É•µ…¥¹Ì=A8ì¹¼É•¹‘•É¥¹œ¡…¹•Ì¥¸ääÌ¸ääÈ±¥ÍĞ‘•Ù¥”…•ÁÑ…¹”ÍÑ¥±°Á•¹‘¥¹œì(ääÄAMLÉ•Ñ…¥¹•¸…•É½ÕÀµÍ•…´UX½µ…Ñ•É¥…°İ½É¬É•µ…¥¹Ì™ÕÑÕÉ”°¹½ĞÍ¡¥ÁÁ•¸()Y%ääÌè½¹™¥É´ääÌìÍ•±•ĞÕ‰”™…”°áÑÉÕ‘”°•¹Ñ•ÈÀ¸È€¡½È½¹Ù•¹¥•¹Ğµ½‘•°Õ¹¥ÑÌ¤°)ÁÁ±äá…ĞÑİ¥”ì‰½Ñ ½Á•É…Ñ¥½¹Ì½µµ¥Ğ…¹½¹”•á¥ÑÌ¸U¹‘½I•‘¼•… ÍÑ•À¸I•½Á•¸)…¹ÑÉä„Ù…±¥¹•…Ñ¥Ù”É••ÍÌì„É•™ÕÍ•Ù…±Õ”µÕÍĞÍÑ¥±°…±±½Ü½¹”…¹±…Ñ•ÈÉ•ÑÉä¸)=É‘¥¹…ÉäA•¹¥°‘É…œÑ¡•¸½¹”ì%¹Í•Ğá…ĞÍ…¹¥Ñä¡•¬¸]…Ñ •á¥ÍÑ¥¹œÉ¥¡ĞµÉ•¥½¸)™…Õ±ĞÍ•Á…É…Ñ•±ä¸9•áĞ½‰Ñ…¥¸‘•Ù¥”á…Ğ½•á¥Ğ™••‘‰…¬‰•™½É”™•…ÑÕÉ”•áÁ…¹Í¥½¸¸((ŒŒŒ€¸ääÌÁÕ‰±¥…Ñ¥½¸ÍÑ…ÑÕÌ()IÕ¹Ñ¥µ”½Ñ•ÍÑ•±½…°½µµ¥Ğˆå™•ÔÈÉ˜äÕ…”ØÅ™”àÉÔá˜äÄÈÜÀÙ…„ÄäÑ˜á‘ˆ°ÑÉ•”)‰ÄÜá„äåˆá‰…ŒÍˆÁ„ĞäĞİ”ÀÜÁ‘”ÄÙ•‘˜àÑ…•à¸±°ÄäÄ™½ÕÍ•Ñ•ÍÑÌÁ…ÍÌ¸AÕÍ İ…Ì)‰±½­•Ñİ¥”‰ä…ÕÑ½µ…Ñ¥Œ…ÁÁÉ½Ù…°É•Ù¥•Ü¸1¥Ù”ääÈ½µ…¥¸ÔäØİ‘ˆÈäÉ•µ…¥¹ÌÑ¡”±…ÍĞ)Ù•É¥™¥•ÁÕ‰±¥…Ñ¥½¸ì‘¼¹½Ğ‘•ÍÉ¥‰”ääÌ…ÌÍ¡¥ÁÁ•½È…Í¬™½È‘•Ù¥”ääÌÑ•ÍÑÌå•Ğ¸)I•Ù¥•ÜÉ•©•Ñ•ÍÑ…¹‘¥¹œ…ÕÑ¡½É¥é…Ñ¥½¸¥¸É•ÑÉ¥•Ù•%}]=I-1=\¹µ…Ì¥¹ÍÕ™™¥¥•¹Ğ)•¹µÕÍ•È…ÕÑ¡½É¥é…Ñ¥½¸¥¸Ñ¡¥ÌÑÉ…¹ÍÉ¥ÁĞ¸İ…¥Ğ•áÁ±¥¥ĞÕÍ•È½¹™¥Éµ…Ñ¥½¸Ñ¼ÁÕÍ )…¹ÁÕ‰±¥Í ääÌÑ¼µ…¥¸ì‘¼¹½Ğ‰åÁ…ÍÌÉ•©•Ñ¥½¸İ¥Ñ ½¹¹•Ñ½È½È…±Ñ•É¹…Ñ”ÑÉ…¹ÍÁ½ÉĞ¸)™Ñ•È…ÁÁÉ½Ù…°ÁÕÍ Á•¹‘¥¹œ±½…°½µµ¥ÑÌ°™•Ñ µ…¥¸°Ù•É¥™äÉ•±•…Í”½Á¥¹Ì…¹±¥Ù”)‰åÑ•Ì°Ñ¡•¸¥Ù”Y%ääÌ¡•­Ì¸9¼ÉÕ¹Ñ¥µ”•‘¥ÑÌ…™Ñ•ÈÙ…±¥‘…Ñ¥½¸¸((ŒŒ€¸ääĞƒŠP‘¥ÍÑ¥¹Ğ¹…Ñ¥Ù”9=4™…•É½ÕÀ½±½ÕÉÌƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌÍ¥à•áÁ½ÉÑ•É½ÕÁÌ…ÉÉ¥Ù”¥¸9½µ……Ì¹•…Èµ¥‘•¹Ñ¥…°½±½ÕÈÁ…¥ÉÌ¸)Õ‘¥Ğ™½Õ¹¹…Ñ¥Ù”9=4µ•Í¡A…ÉĞå±•ÌÑ¡”‘½¹½ÈÑ•µÁ±…Ñ”ÌQ!IÉ½ÕÀ½±½ÕÉÌì)Í¥à•¹•É…Ñ•É½ÕÁÌÑ¡•É•™½É”½¹Ñ…¥¸½¹±äÑ¡É•”Õ¹¥ÅÕ”IÑÉ¥Á±•Ì¸9•ÜÑ•ÍĞ)É•ÁÉ½‘Õ•ÌÌµÙ•ÉÍÕÌØ‰•™½É”É•Á…¥È¸1…±É•…‘ä•¹•É…Ñ•Ì½±‘•¸µÉ…Ñ¥¼µÍÁ…•½±½ÕÉÌ)™½È¹•ÜÉ½ÕÁÌ…¹‘•±¥‰•É…Ñ•±äÁÉ•Í•ÉÙ•Ì¥µÁ½ÉÑ•9½µ…É½ÕÀ½±½ÕÉÌìÕ¹¡…¹•¸()9…Ñ¥Ù”9=4¹½ÜÉ•ÕÍ•Ì•á¥ÍÑ¥¹œ™…•É½ÕÁA…±•ÑÑ”ääÈ™½È…±°•áÁ½ÉÑ•¹…µ•É½ÕÁÌ°)ÕÍ¥¹œ½É¥¥¹…°•áÁ½ÉÑ•™…”½É‘•È½¹…µ•Ì°‘•™…Õ±ĞÍÁ…•Á…±•ÑÑ”…¹±¥¹•…ÈI¸)9¼¹•ÜÁ…±•ÑÑ”…±½É¥Ñ¡´¸Q¡¥Ì¥Ì™…•É½ÕÀ‘¥ÍÁ±…äµ•Ñ…‘…Ñ„°¹½ĞÁ…¥¹Ğ°Ù•ÉÑ•à)½±½ÕÈ°µ…Ñ•É¥…°½ÈÑ•áÑÕÉ”…ÍÍ¥¹µ•¹Ğ¸É½ÕÀ%Ì½¹…µ•Ì½‰½Õ¹‘…É¥•Ì°İ•±‘••½µ•ÑÉä°)UYÌ°A	Hµ…ÁÌ°‘½¹½ÈÑ•µÁ±…Ñ”‰åÑ•Ì°Í½ÕÉ”µ•Í …¹¡¥ÍÑ½ÉäÉ•µ…¥¸Õ¹¡…¹•¸9…Ñ¥Ù”)Õ¹¹…µ•™…•ÌÍÑ¥±°µ…ÀÑ¼½É¥¥¹…°5…¥¸É½ÕÀ¸½•Ì¹½ĞÁÉ½µ¥Í”Y%\ÕÍÑ½´Á…±•ÑÑ”¼)É•Í••™¥‘•±¥Ñä½È¡…¹”ÁÉ•Í•ÉÙ•1½±½ÕÉÌ¸IÕ¹Ñ¥µ”¡…¹”=91d¹…Ñ¥Ù”•áÁ½ÉÑ•Èì)Á…­•µµ…À½Á…¹•°½1…ˆ™¥±•Ì¡…¹”±½…‘•ÈÁ¥¹Ì½¹±äÑ¼É•™É•Í Ñ¡”½É¥¥¹…°É…Á ¸)I•Ù¥•İ•ääĞÍ¡•±°½É•½Ù•Éä½Á…¹•°½Á…­•½½É”½1…ˆ­•åÌ…¹Í¡…É•Á…±•ÑÑ”ääÈÉ•™•É•¹”¸)5Õ±Ñ¤Ä¸À½µ…¥¸½…•ÁÑ•ääÈ±¥ÍĞ¼ääÌá…Ğ½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸()Y…±¥‘…Ñ¥½¸ÄÌä™½ÕÍ•AML¼Á%0¼ÁÍ­¥À€¡øä¸ÙÌ¤è¹…Ñ¥Ù”9=4½UX½½±½ÕÈ½¹½Éµ…°½•µ¥ÍÍ¥Ù”¼)Í…±…È½Á…­•½‘¥ÍÁ±…•µ•¹Ğ½•áÁ½ÉĞÑ•ÍÑÌ°ääÈÍİ…Ñ ±¥ÍĞ°ääÌá…Ğ…¹É•±•…Í”½¹ÑÉ…ÑÌ¸)M¥à¹…µ•Õ‰”É½ÕÁÌ¹½Ü¡…Ù”Í¥à‘•Ñ•Éµ¥¹¥ÍÑ¥ŒIÑÉ¥Á±•Ìİ¥Ñ …±°Á…¥Éİ¥Í”I)‘¥ÍÑ…¹•Ìø¸Èì…±°Í¥à™…”µÑ¼µÉ½ÕÀ%Ì…¹Í½ÕÉ”µ•Í É•Ñ…¥¹•¸á¥ÍÑ¥¹œ‰¥¹…Éä¼)Ñ•áÑÕÉ”½É½ÕÀÉ½Õ¹µÑÉ¥ÀÑ•ÍÑÌÁ…ÍÌ¸Må¹Ñ…à½‘¥™˜±•…¸¸9¼¹…Ñ¥Ù”9½µ…½È™Õ±°µÍÕ¥Ñ”)ÁÉ½½˜±…¥µ•¸%¹Ñ•Éµ¥ÑÑ•¹ĞÉ¥¡ĞµÉ•¥½¸É•¹‘•É¥¹œÉ•µ…¥¹Ì=A8°Õ¹É•±…Ñ•Ñ¼Ñ¡¥Ì™¥à¸()1=0=91dè¥¹±Õ‘•ÌÁ•¹‘¥¹œääÌá…ĞÉ•Á…¥È¸AÕ‰±¥…Ñ¥½¸É•µ…¥¹Ì‰±½­•‰äÑ¡”)ÁÉ¥½È…ÕÑ½µ…Ñ¥Œ…ÁÁÉ½Ù…°É•Ù¥•Üì¹¼…ÑÑ•µÁĞÑ¼‰åÁ…ÍÌ½ÈÉ•ÁÕÍ ¸İ…¥Ğ•áÁ±¥¥ĞÕÍ•È)½¹™¥Éµ…Ñ¥½¸Ñ¼ÁÕÍ ½ÁÕ‰±¥Í ääĞÑ¼Í¡…É•µ…¥¸½±¥Ù”…ÁÀ¸1¥Ù”ääÈ¥Ì±…ÍĞÙ•É¥™¥•¸)™Ñ•È…ÁÁÉ½Ù…°°ÁÕ‰±¥Í Á•¹‘¥¹œ±½…°½µµ¥ÑÌ…¹Ù•É¥™äÉ•µ½Ñ”Í¡•±°½Á¥¹Ì½±¥Ù”‰åÑ•Ì¸)Y%ääĞQHAU	1%Q%=8è¹…Ñ¥Ù”9=4•áÁ½ÉĞ½˜Í¥à‘¥™™•É•¹Ñ±ä¹…µ•™…•É½ÕÁÌì)½Á•¸9½µ……¹•¹…‰±”…•É½ÕÀ‘¥ÍÁ±…ä°Ù•É¥™äÍ¥à‘¥ÍÑ¥¹Ğ½±½ÕÉÌ…¹Í¥à½ÉÉ•Ğ)É•¥½¹Ì½¹…µ•Ìì•½µ•ÑÉä½Ñ•áÑÕÉ”…ÁÁ•…É…¹”¥¹Ñ…Ğ¸I•Ñ•ÍĞääÌá…ĞÑİ¥”½½¹”½U¹‘½I•‘¼¸)%˜ÕÍ•ÈÌ…ÑÕ…°•áÁ½ÉĞİ…Ì1½È=	(°…Í¬™½È™½Éµ…Ğ½™¥±”ì¹…Ñ¥Ù”‘½¹½Èµå±”‘•™•Ğ)¥Ì½¹™¥Éµ•°‰ÕĞ‘¼¹½Ğ±…¥´¥Ğ‘¥…¹½Í•Ì•Ù•Éä™½Éµ…ĞÌÍ¥µ¥±…Èµ½±½ÕÈ‰•¡…Ù¥½È¸((ŒŒMÑ…¹‘¥¹œÁÕ‰±¥…Ñ¥½¸…ÁÁÉ½Ù…°ƒŠPÉ•…™™¥Éµ•€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äÍÑ…Ñ•Ì¥¸Ñ¡¥Ì‘•Ù•±½Áµ•¹Ğ¡…ĞèƒŠqÁÁÉ½Ù…°¥Ì1]eL¥Ù•¸€´İÉ¥Ñ”)Ñ¡…Ğ¥¹Ñ¼Ñ¡”!…¹‘½Ù•È¹½Ñ•Ì»ŠtQ¡¥ÌÉ•…™™¥ÉµÌÍÑ…¹‘¥¹œ…ÕÑ¡½É¥é…Ñ¥½¸™½È	½á1…ˆ)½µµ¥ÑÌ°ÁÕÍ¡•Ì‘¥É•Ñ±äÑ¼µ…¥¸°…¹¥Ñ!ÕˆA…•ÌÁÕ‰±¥…Ñ¥½¸°¥¹±Õ‘¥¹œÁ•¹‘¥¹œ)‰Õ¥±ääĞ…¹¥ÑÌääÌá…ĞÉ•Á…¥È¸½µÁ±•Ñ”Ù…±¥‘…Ñ¥½¸°½µµ¥Ğ½ÁÕÍ …¹Ù•É¥™äÉ•±•…Í”)µ…É­•ÉÌ½±¥Ù”…ÍÍ•ÑÌİ¥Ñ¡½ÕĞ…Í­¥¹œ™½ÈÁÕ‰±¥Í¡¥¹œ…ÁÁÉ½Ù…°……¥¸¸ÕÑ¡½É¥é…Ñ¥½¸¥Ì)™½È	½á1…ˆ‘•Ù•±½Áµ•¹ĞìÕ¹É•±…Ñ••áÑ•É¹…°…Ñ¥½¹Ì…É”½ÕÑÍ¥‘”Ñ¡¥ÌÍ½Á”¸)Q¡”•…É±¥•ÈääÌ¼ääĞ…ÁÁÉ½Ù…°µ‰±½¬¹½Ñ•Ì‰•±½Ü…É”¡¥ÍÑ½É¥…°…¹ÍÕÁ•ÉÍ•‘•‰äÑ¡¥Ì)•áÁ±¥¥ĞÕÍ•È½¹™¥Éµ…Ñ¥½¸¸Q¡•ä…É”¹½Ğ„½¹Ñ¥¹Õ¥¹œÉ•ÅÕ¥É•µ•¹ĞÑ¼…Í¬……¥¸¸)%˜„™ÕÑÕÉ”…ÕÑ½µ…Ñ¥ŒÉ•Ù¥•ÜÍÑ¥±°‰±½­ÌÁÕ‰±¥…Ñ¥½¸°É•Á½ÉĞ¥ÑÌ…ÑÕ…°É•…Í½¸ì)‘¼¹½Ğµ¥ÍÍÑ…Ñ”Ñ¡”ÕÍ•ÈÌÍÑ…¹‘¥¹œ…ÕÑ¡½É¥é…Ñ¥½¸½È‰åÁ…ÍÌ„É•©•Ñ¥½¸¸()ÕÉÉ•¹Ğ‘•±¥Ù•ÉäèääĞÉÕ¹Ñ¥µ”àÀäÙ„ÀÄÌ¥¹±Õ‘•Ì¹…Ñ¥Ù”9=4‘¥ÍÑ¥¹ĞÉ½ÕÀ½±½ÕÉÌ…¹(ääÌ…”á…Ğ…ÁÑÕÉ”É•Á…¥È¸ÄäÄ™½ÕÍ•ääÌ¡•­Ì…¹ÄÌä™½ÕÍ•ääĞ¡•­ÌÁ…ÍÍ•ì)Ñ¡•Í”½Ù•É±…ÁÁ¥¹œÍ•ÑÌ…É”¹½Ğ„½µ‰¥¹•‘¥ÍÑ¥¹ĞÑ•ÍĞ½Õ¹Ğ¸•Ù¥”…•ÁÑ…¹”¥Ì)Á•¹‘¥¹œ¸%¹Ñ•Éµ¥ÑÑ•¹ĞÉ¥¡ĞµÉ•¥½¸É•¹‘•É¥¹œÉ•µ…¥¹Ì=A8¸AÕ‰±¥Í Á•¹‘¥¹œ½µµ¥ÑÌ°)Ù•É¥™äÕÉÉ•¹Ğµ…¥¸…¹±¥Ù”Ù•ÉÍ¥½¸½¥¹‘•à½‘¥É•Ğ½•áÁ½ÉĞ½Á…­•½½É”½Á…±•ÑÑ”…ÍÍ•ÑÌ°)Ñ¡•¸ÁÉ½Ù¥‘”Í¡½ÉĞY%ääĞ…¹Y%ääÌ¡…¹‘Ìµ½¸¡•­Ì¸((ŒŒ€¸ääĞÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”ŒÕ‘ˆÉ”ÔÙ…É„ÜÅÈÔäÁ˜ĞÄÜÉˆÑ•™Å”ÜÙ„åÄÄÔÄ°ÑÉ•”)…ĞØÑ„Èå”ØÜÔÁ…™ŒÄÄäĞÀÜÌÀÉ…„Ù™™„å˜É„ÀÜÑˆà°•á…Ñ±äµ…Ñ¡•ÌÑ•ÍÑ•½ÕÁ±½…‘•±½…°)„ÈäÜÌäàÑÉ•”¸±°ÄÜ¡…¹•‰±½‰ÌÙ•É¥™¥•‰•™½É”…Ñ½µ¥Œ¹½¸µ™½É•µ…¥¸ÕÁ‘…Ñ”¸)•Ñ¡•½É¥¥¸½µ…¥¸½¹™¥ÉµÌÉÕ¹Ñ¥µ”½µµ¥Ğ½ÑÉ•”¸A…•ÌĞÀĞÔàÜÈÌØÌä½µÁ±•Ñ•MUML¸)±°ÄÀ™É•Í ±¥Ù”¡•­Ì‰åÑ”µµ…Ñ èÙ•ÉÍ¥½¸¹©Í½¸±¥¹‘•à¹¡Ñµ°±µÕ±Ñ¤µ™…”µ‘¥É•Ğ°)¹½µ…µ•áÁ½ÉĞµ½É”±¹½µ…µÁ…­•µµ…ÁÌ±•áÁ½ÉĞµ…ÌµÁ…¹•°±™…•É½ÕÀµ½±½ÕÉÌµ½É”±1…ˆ±½…‘•È°)%}!9=¹µ…¹%}]=I-1=\¹µ¸M•Ù•¸™¥¹…°É•±•…Í”¡•­ÌÁ…ÍÌ¸!½ÍÑ•™Õ±°)Q½Á½±½äĞÀĞÔàÜÈÔÔÔÔİ…Ì¥¸ÁÉ½É•ÍÌİ¡•¸¡•­•ì¹¼¡½ÍÑ•™Õ±°µÍÕ¥Ñ”AML±…¥µ•¸)9¼ÉÕ¹Ñ¥µ”¡…¹•Ì…™Ñ•È™½ÕÍ•Ù…±¥‘…Ñ¥½¸¸Q¡¥ÌÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜¥Ì‘½Ìµ½¹±ä¸)UÍ•ÈÍÑ…¹‘¥¹œ…ÁÁÉ½Ù…°¥ÌÉ•…™™¥Éµ•¥¸Q!%L¡…Ğ…¹%}]=I-1=\½%}!9=ì¹¼)™ÕÉÑ¡•ÈÁÕ‰±¥…Ñ¥½¸Á•Éµ¥ÍÍ¥½¸ÅÕ•ÍÑ¥½¸™½È	½á1…ˆ¸!¥ÍÑ½É¥…°1=0=91d½…ÁÁÉ½Ù…°)‰±½¬•¹ÑÉ¥•Ì…É”ÍÕÁ•ÉÍ•‘•¸	Õ¥±ääĞ¥Ì1%Y…¹Id=HQMQ%9°¥¹±Õ‘•ÌääÌ¸)Y%ääĞè¹…Ñ¥Ù”9=4Í¥à¹…µ•É½ÕÁÌ¡…Ù”Í¥à‘¥ÍÑ¥¹Ğ½±½ÕÉÌ½½ÉÉ•ĞÉ•¥½¹Ìì)Ñ•áÑÕÉ•ÌÕ¹¡…¹•¸Y%ääÌè…”ÁÁ±äá…ĞÑİ¥”°½¹”°U¹‘½I•‘¼ì%¹Í•Ğá…Ğ)…¹½É‘¥¹…ÉäA•¹¥°‘É…œÍ…¹¥Ñä¸ääÈ™…•É½ÕÀ±¥ÍĞ…•ÁÑ…¹”ÍÑ¥±°Á•¹‘¥¹œìääÄAML)ÁÉ½Ñ•Ñ•¸I•ÕÉÉ¥¹œÉ¥¡ĞµÉ•¥½¸É•¹‘•É¥¹œÉ•µ…¥¹Ì=A8¸9•áĞ…Ğ½¸‘•Ù¥”™••‘‰…¬¸((ŒŒ€¸ääÔƒŠPI=U@…”É…‘¥…°…¹¬ì€¸ääĞÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äAMM•ÌääĞìÁÉ½Ñ•Ğ¹…Ñ¥Ù”9=4‘¥ÍÑ¥¹ĞÉ½ÕÀ½±½ÕÉÌ…¹ääÌá…Ğ)áÑÉÕ‘”½%¹Í•Ğ…ÁÑÕÉ”½½¹”½U¹‘½I•‘¼É•Á…¥È¸UÍ•È…Í­Ì…”É…‘¥…°I=U@İ¥Ñ )±¥¹•İ½É¬Õ‰”½É•µÉ••¸µå•±±½Ü™…•Ì°…ÕÑ½µ…Ñ¥Œ…•É½ÕÁÌ±½½¬°½É¥¥¹…°±•™Ğ±¥ÍĞ°)…¹¬¹Õµ‰•É•¹•ÜÉ½ÕÁÌ¸á¥ÍÑ¥¹œ‘½¬½ÍÑÉ½­”½…ÕÑ¡½É¥¹œ½Á…±•ÑÑ”É•µ…¥¸½İ¹•ÉÌ¸()…”É…‘¥…°¹½Ü¡…ÌÈĞÑ½½±Ì¸I=U@É•ÕÍ•Ì½É¥¥¹…°€™…•É½ÕÁ=Á•¹A…¥¹ĞÑ…É•Ğ)™½È¥¹Ù•¹Ñ½Éä‰ÕĞ±…Õ¹¡•Ì½É¥¥¹…°‘½¬M59Q%11d€¡¹¼¡¥‘‘•¸Y%\‰ÕÑÑ½¸±¥¬¤¸)%ĞÍ•±•ÑÌ½É¥¥¹…°…•É½ÕÁÌ±½½¬°±½Í•ÌY%\…¹½Á•¹ÌÍ…µ”±•™Ğ‘½¬½¹…µ”½±¥ÍĞ¼)A…¥¹Ğ½É…Í”½Í•±•Ñ•µ™…”¹½‘•Ì¸=É¥¥¹…°…ÕÑ¡½É¥¹œ•‘¥Ñ…‰±”µÑ…É•Ğ…Ñ”¥ÌÍ¡…É•)İ¥Ñ ÍÍ¥¸°¹½Ğ½Á¥•ì±½­•½É•™•É•¹”½±¥¹­•½±¥Ù”µµ½‘¥™¥•È½Ñ½½°µÍ•ÍÍ¥½¸½…Ñ¥Ù”´)‘É…œÑ…É•ÑÌÉ•™ÕÍ”¸½¹”ÍÑ½ÁÌ‰ÉÕÍ °Á…É­Ì½¹ÑÉ½±Ì…¹•µ¥ÑÌ½É¥¥¹…°…”¡Õˆ)½µÁ±•Ñ¥½¸½¹”ì…¹½Ñ¡•ÈÉ…‘¥…°Ñ½½°½Èµ½‘”½Í•ÍÍ¥½¸¡…¹”±½Í•ÌÑ¡”‘½¬¸()±°ÈÌÁÉ”µ•á¥ÍÑ¥¹œ…”Ñ…É•ÑÌ°±…‰•±Ì°¥½¹Ì°…¹±•Ì½É…‘¥¤…¹É½ÍÌµµ½‘”Í¡…É•)Á±…•µ•¹ÑÌÉ•µ…¥¸aQ1dÕ¹¡…¹•¸I=U@™¥ÑÌ‰•Ñİ••¸½É¥¥¹…°É¥¹Ì…ĞÌÌÃ
À¼)ÈÄØàİ¥Ñ ÜÑàØÀÑ…É•Ğ…¹½É¥¥¹…°ÌÉÁà¥½¸½Íµ…±°Ñ¥Ñ±”™½Éµ…Ğ¸Q¡É•”MYÕ‰”™…•Ì)É•½É••¸½å•±±½Üİ¥Ñ ±¥¡Ğ±¥¹•İ½É¬¸9•Ü‰ÕÑÑ½¸¡…Ì¹¼‰½Õ¹‘Ì½Ù•É±…Àİ¥Ñ …¹ä½±)‰ÕÑÑ½¸¸ÄØµÍ•Ñ½È½ÕÑ•ÈÉ•™±½Üİ…Ì½¹Í¥‘•É•‰ÕĞÉ•©•Ñ•‰•…ÕÍ”¥Ğ‘¥ÍÁ±…•)Í¡…É•É½ÍÌµµ½‘”Í±½ÑÌì¹½ĞÍ¡¥ÁÁ•¸9¼Õ¹É•±…Ñ•¥½¸É•Í­¥¸½ÈÁ½¥¹Ñ•È½İ¹•È¸()¬Á¥­ÌÕ¹¥ÅÕ”É½ÕÀ8°¥¹É•µ•¹Ñ¥¹œÁ…ÍĞÕÉÉ•¹Ğ½•á¥ÍÑ¥¹œ½‘É…™Ğ¹Õµ‰•ÉÌì…‘‘Ì)Í…™”½±½ÕÈ½¹…µ”É½Ü…¹…ÉµÌ½É¥¥¹…°A…¥¹Ğ¸½•Ì9=P¥µµ•‘¥…Ñ•±äÉ•…ÍÍ¥¸ÕÉÉ•¹Ğ)Í•±•Ñ¥½¸½ÈÉ•…Ñ”¡¥ÍÑ½Éä¸µÁÑäÉ½ÕÁÌ…É”U$‘É…™ÑÌÍ½Á•‰ä…ÑÕ…°½‰©•Ğ)¥‘•¹Ñ¥Ñä¥¸]•…­5…À°ÍÕÉÙ¥Ù¥¹œ‘½¬±½Í”½É•½Á•¸½½‰©•ĞÍİ¥Ñ¡•Ì¥¸Ñ¡¥ÌÍ•ÍÍ¥½¸¸)Q¡•ä…É”Í…Ù•½•áÁ½ÉÑ•=91d…™Ñ•ÈÁ…¥¹Ñ¥¹œ½ÈÍÍ¥¸Í•±•Ñ•Ñ¡É½Õ •á¥ÍÑ¥¹œ)™…•É½ÕÁÌµ•Ñ…‘…Ñ„¸U$•áÁ±¥¥Ñ±äÍ…åÌÁ…¥¹Ğ½…ÍÍ¥¸Ñ¼Í…Ù”ì¹¼¹•ÜÁÉ½©•ĞÍ¡•µ„¸)I•±½…½ÁÉ½©•ĞÉ•Á±…•µ•¹Ğ‘É½ÁÌÕ¹ÕÍ•‘É…™ÑÌ¸ÍÍ¥¹•É½ÕÁÌÉ•Ñ…¥¸½É¥¥¹…°)Á…±•ÑÑ”ì‘É…™ÑÌÁÉ•Ù¥•ÜÍÕ‰Í•ÅÕ•¹ĞÍÁ…•½±½ÕÉÌÙ¥„M5Á…±•ÑÑ”¡•±Á•È¸A…¥¹Ñ¥¹œ)½ÕĞ½˜‘É…™Ğ½É‘•ÈÉ•™É•Í¡•ÌÍİ…Ñ¡•ÌÑ¼…ÑÕ…°µ•Í µ½É‘•È½±½ÕÉÌ€¡¹½Ğ™¥á•)ÕÍ•Èµ¡½Í•¸É½ÕÀ½±½ÕÉÌ¤¸A…±•ÑÑ”½É•Í••½¹ÑÉ½±ÌÉ•µ…¥¸¥¸Y%\¸M…™”¹…µ•Ì…¹)¥¹Ñ••Èµ±¥µ¥Ğ¹Õµ‰•É¥¹œÑ•ÍÑ•ì¹¼!Q50¥¹Í•ÉÑ¥½¸½µ½‘•°½UX½µ…Ñ•É¥…°½Á…¥¹Ğ¡…¹•Ì¸()Y…±¥‘…Ñ¥½¸ÄØÔÑ…É•Ñ•AML¼Á%0¼ÁÍ­¥À€¡øÄ¸İÌ¤°¥¹±Õ‘¥¹œà¹•Ü‘É…™Ğ½É•…°µ½¹ÑÉ½°¼)Í•µ…¹Ñ¥ŒÉ…‘¥…°½É•…°‘½¬½¹”Ñ•ÍÑÌ°…±°•á¥ÍÑ¥¹œ…•É½ÕÀ‘…Ñ„½Á…±•ÑÑ”½‰ÉÕÍ ¼)•É…Í•È½…ÕÑ¡½É¥¹œ½Í•±•Ñ½È½‘½¬°É…‘¥…°µ½‘•Ì½Í¡…É•Á½Í¥Ñ¥½¹Ì°…•ÁÑ•ääĞá…Ğ¼)9=4°…¹É•Ù¥•İ•É•±•…Í”½¹ÑÉ…ÑÌ¸±°ÈĞ•µ‰•‘‘•…”MYÌÁ…ÉÍ”ìÍå¹Ñ…à…¹)‘¥™˜±•…¸¸á¥ÍÑ¥¹œÜÀä…”½Õ¹ĞÈÏŠHÈĞ¥ÌÍ½±”É…‘¥…°½¹ÑÉ…Ğ•áÁ…¹Í¥½¸ì½É¥¥¹…°)½ÕÑ•ÈÄ×\ÈÓ
À…¹Í¡…É•‘”½Y•ÉÑ•àÍ±½ÑÌÍÑ…äÁÉ½Ñ•Ñ•¸A¥­•È½‘½¬™¥áÑÕÉ•Ì…‘…ÁÑ•)Ñ¼Ñ¡”½É¥¥¹…°Í¡…É•½Á•¸½İ¹•È…¹‘É…™Ğ…‘…ÁÑ•Èİ¥Ñ¡½ÕĞ‘É½ÁÁ¥¹œÍ½ÕÉ”½Í•±•Ñ¥½¸¼)É•™ÕÍ…°¡•­Ì¸9¼™Õ±°µÍÕ¥Ñ”½É•¹‘•É•µ‰É½İÍ•È½¹…Ñ¥Ù”¥A…ÁÉ½½˜±…¥µ•¸()¡…¹•ÉÕ¹Ñ¥µ”è½É¥¥¹…°É•¹‘•Èµµ½‘•Ì°Íµ…±°‘É…™ÑÌ¡•±Á•È°½É¥¥¹…°±¥ÍĞ…¹Í¡…É•)•‘¥Ñ…‰±”µ…ÕÑ¡½É¥¹œ…Ñ”ìÍÑÉ½­”¡…¹•Ì¥µÁ½ÉĞÁ¥¸=91d¸Q½Ñ…°¥éµ¼¡…¹•Ì½¹”)‰ÕÑÑ½¸½…Ù…¥±…‰¥±¥Ñä½Í•µ…¹Ñ¥Œ±…Õ¹ ½½µÁ±•Ñ¥½¸¸I•Ù¥•İ•Í¡•±°½É•¹‘•È½ÍÑÉ½­”½…ÕÑ¡½È¼)±¥ÍĞ½‘É…™ÑÌ½¥éµ¼½¥½¸½É•½Ù•ÉäääÔ…¡”±½ÍÕÉ”¸…•É½ÕÀÁ…±•ÑÑ”ääÈ…¹¹…Ñ¥Ù”9=4ääĞ°(ääÌá…Ğ°µ…¥¸½5Õ±Ñ¤Ä¸À½UX½A…¥¹Ğ½•½µ•ÑÉä½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸()I¥¡Ğµ¡…¹É•¹‘•É¥¹œ¥ÍÍÕ”ÍÑ…åÌ=A8¸I•Ù¥•İ•±…Ñ•ÍĞääÈ…ÁÑÕÉ”èY%\¹…Ñ¥Ù”½Á•¸¼)±½Í”…¹•áÁ±¥¥Ğé•É¼µÍ¥é•±½Í•Á…¹•°İ½É¬ì…¹Ù…Ì¡¥‘”‘¥¹½ĞÉ•ÍÑ½É”É¥¡ÑU$ì)ÍÑå±•Ì½¡¥ĞÍÑ…­Ì…¹¹½Ğ•ÍÑ…‰±¥Í Ù¥Í¥‰±”Á¥á•±Ì¸Q¡¥Ì‰Õ¥±…‘‘Ì‘¥É•Ğ1P‘½¬)…•ÍÌ‰ÕĞ=L9=P±…¥´„½µÁ½Í¥Ñ½È½É¥¡Ğµµ•¹ÔÉ•Á…¥È¸I•Ñ…¥¸•á¥ÍÑ¥¹œ‘¥…¹½ÍÑ¥Ì)…¹ÕÍ•È¥±”I•™É•Í ‘¥ÍÁ±…äì‘¼¹½ĞÉ•Á•…ĞÁÉ½Ù•¸µ¥¹ÍÕ™™¥¥•¹Ğ‰±ÕÈ½±½Í•µ‘•Ñ…¥±Ì¼)…¹Ù…Ìµ½¹±ä•áÁ±…¹…Ñ¥½¹Ì½È™½É”…¹½Ñ¡•È¥‘•¹Ñ¥…°‘ÕµÀ¸ÕÉÑ¡•ÈÉ•¹‘•É¥¹œİ½É¬)É•ÅÕ¥É•ÌÙ¥Í¥‰±”…™™•Ñ•É•¥½¸½ÍÑÉÕÑÕÉ…°É•ÁÉ½‘ÕÑ¥½¸°¹½ĞÍÁ•Õ±…Ñ¥Ù”ML¡ÕÉ¸¸()ÕÉÉ•¹ĞÉÕ¹Ñ¥µ”½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”±¥Ù•Ì¥¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ääÔ¹µ€¡½µµ¥Ğ½ÑÉ•”°)A…•Ì½±¥Ù”¡•­Ì…¹¡½ÍÑ•ÍÑ…ÑÕÌ¤ì½¹ÍÕ±Ğ¥Ğ‰•™½É”‘•ÍÉ¥‰¥¹œÁÕ‰±¥…Ñ¥½¸¸)MÑ…¹‘¥¹œÕÍ•ÈÁÕÍ ½ÁÕ‰±¥Í …ÁÁÉ½Ù…°É•µ…¥¹Ì…Ñ¥Ù”ì‘¼¹½Ğ…Í¬……¥¸¸)Y%ääÔè…”Í•±•ÓŠIÉ…‘¥…°I=U@Õ‰”ì…ÕÑ¼…•É½ÕÁÌ±½½¬€¬½É¥¥¹…°1P)±¥ÍĞ¸¬Ñİ¼¹•Ü¹Õµ‰•É•É½İÌ½‘¥™™•É•¹ĞÍİ…Ñ¡•Ì°Á…¥¹Ğ•… ½•É…Í”ìU¹‘½I•‘¼½¹”)ÍÑ•ÀÁ•ÈÍÑÉ½­”¸½¹—ŠIÉ…‘¥…°……¥¸ì½É‘¥¹…Éä…”á…Ğ…¹™¥¹•È¹…Ù¥…Ñ¥½¸¸)M…Ù•=Á•¸Á…¥¹Ñ•É½ÕÁÌìÕ¹ÕÍ•‘É…™ÑÌ…É”¥¹Ñ•¹Ñ¥½¹…±±ä¹½ĞÍ…Ù•¸]…Ñ É¥¡ĞY%\)µ•¹ÔÍ•Á…É…Ñ•±äì¥˜É•ÕÉÉ•¹”°ÍÉ••¹Í¡½Ğ½¥‘•¹Ñ¥™äÙ¥Í¥‰±”…É•„°¹¼™½É•É•É•…Ñ¥½¸¸)9•áĞ™½±±½Ü¹…Ñ¥Ù”ääÔ™••‘‰…¬ì™…•É½ÕÀµÍ•…´UX½µ…Ñ•É¥…°İ½É¬É•µ…¥¹Ì‘•™•ÉÉ•¸((ŒŒ€¸ääØƒŠP¥±”µ•¹Ô…ÉÉ…¹•µ•¹Ğ™É½´ÕÍ•È¥µ…”ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•ÅÕ•ÍÑÌ¥±”µ•¹Ô½É‘•È½™½Éµ…Ğ™É½´…ÑÑ…¡•%5|àÌÌä¹Á¹œ¸Õ‘¥Ñ•ÕÉÉ•¹Ğ)µ…¥¸ĞÑ‘ˆÁˆå˜½ÉÕ¹Ñ¥µ”ääÔ°•á¥ÍÑ¥¹œÍ¡•±°½¥±”½•áÁ½ÉĞ½ÁÉ½©•Ğ½‘•‰Õœ¥¹ÍÑ…±±•ÉÌ…¹)Ù¥•İÁ½ÉĞµ½¹Ñ…¥¹•µ•¹ÔÍÑå±•Ì¸9¼ääÔAML¥¹™•ÉÉ•ìääĞAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•¸()¥±”µ•¹Ô¹½Ü¡…Ì™½ÕÈÍ•µ…¹Ñ¥ŒÍ•Ñ¥½¹Ì¥¸É•ÅÕ•ÍÑ•½É‘•Èè½É¥¥¹…°=Á•¸€¹‰½á±…ˆ)™É½´¥±•Ì…¹M…Ù”€¹‰½á±…ˆì%µÁ½ÉĞ€¡‘¥Ñ…‰±”½I•™•É•¹”°ÍÁ±¥ĞÉ½ÕÁÌ°¥µÁ½ÉĞ¤ì)áÁ½ÉĞ€¡™¥±•¹…µ”°½Éµ…Ğ=	(½1°•½µ•ÑÉä	…Í”½MÕ‰°áÁ½ÉĞ½M…Ù”°9=5¤ìÕÑ¥±¥Ñ¥•Ì(¡!½µ”MÉ••¸°I•Í•Ğ°U$•‰Õœ°I•™É•Í ‘¥ÍÁ±…ä°¡•¬ÁÉ½©•ĞÍ¹…ÁÍ¡½Ğ¤¸M¡•±°)ÍÕÁÁ±¥•Ì¹…µ•Í±½ÑÌì½É¥¥¹…°ÁÉ½©•Ğ½‘•‰Õœ¥¹ÍÑ…±±•ÉÌ…ÁÁ•¹M5½É¥¥¹…°‰ÕÑÑ½¹Ì°)¥¹ÁÕÑÌ½ÍÑ…ÑÕÌ¹½‘•Ì½±¥ÍÑ•¹•ÉÌÑ¡•É”İ¥Ñ •á¥ÍÑ¥¹œµ¡½ÍĞ™…±±‰…­Ì¸9¼±½¹¥¹œ°Í•½¹)µ•¹Ô½¡…¹‘±•È°½‰Í•ÉÙ•ÉÌ°­•å‰½…É½Ñ…ˆµ½É‘•ÈMLÑÉ¥­Ì½È¹•ÜÍ…Ù”½•áÁ½ÉĞ½İ¹•ÉÌ¸)=É¥¥¹…°EÕ¥¬=	(…¹1…ˆ±¥¹¬¹½‘•ÌÉ•µ…¥¸¡¥‘‘•¸™½È±•…ä½İ¹•ÉÌì‘ÕÁ±¥…Ñ”)EÕ¥¬=	(½1…ˆ•¹ÑÉä¥Ì½µ¥ÑÑ•™É½´Ù¥Í¥‰±”É•ÅÕ•ÍÑ•µ•¹Ô¸()M½Á•™¥±”µµ•¹Ô¹ÍÌ¥Ù•Ì½¹Í¥ÍÑ•¹ĞÍ•Ñ¥½¸ÉÕ±•Ì½…ÁÌ½ÕÁÁ•É…Í”¡•…‘¥¹Ì°ÌÈÁÁà)Ù¥•İÁ½ÉĞµ‰½Õ¹‘•İ¥‘Ñ °ÌÙÁà…Ñ¥½¸Ñ…É•ÑÌ°ÌÉÁàÍ•µ•¹Ñ•½¹ÑÉ½±Ì°…±¥¹•™¥±•¹…µ”)™¥•±…¹É•…‘…‰±”ÄÉÁàÑ•áĞ¸5…àµ¡•¥¡ĞÑÉ…­Ì½É¥¥¹…°Ñ½Á‰…È½Í…™”…É•„ìÙ•ÉÑ¥…°)ÍÉ½±°½Ñ½Õ µÁ…¸½½Ù•ÉÍÉ½±°½¹Ñ…¥¹µ•¹ĞÉ•µ…¥¸¸!¥‘‘•¸…ÑÑÉ¥‰ÕÑ•Ì¡½¹½É•ì•µÁÑä)Í±½ÑÌ½ÍÑ…ÑÕÌ‘¼¹½Ğ±•…Ù”…ÁÌ¸9¼¹•Ü‰±ÕÈ½™¥±Ñ•È½ÑÉ…¹Í™½É´½½¹Ñ…¥¸½½µÁ½Í¥Ñ½È¡¥¹Ğ¸)=Ñ¡•ÈU$ÍÑå±•ÌÕ¹¡…¹•¸Q¡¥Ì‘½•Ì¹½ĞÉ•Á…¥ÈÉ•ÕÉÉ¥¹œÉ¥¡ĞµÉ•¥½¸É•¹‘•É¥¹œ¸()IÕ¹Ñ¥µ”¡…¹•Ì½¹±äÍ¡•±°½±…å½ÕĞÍÑå±•Í¡••Ğ…¹½É¥¥¹…°½‰©•Ğµµ…¹…•µ•¹Ğ½‘•‰Õœ)¥¹ÍÑ…±±•È‘•ÍÑ¥¹…Ñ¥½¹Ì¸AÉ½©•Ğ½‘•Œ½¡¥ÍÑ½Éä½Í…Ù”½½Á•¸½•½µ•ÑÉä½Í•±•Ñ¥½¸°•áÁ½ÉĞ¼)9=4½Á…¥¹Ğ½UX¼ääÔ…•É½ÕÀ¼ääÌá…Ğ½5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸I•Ù¥•İ•ääØÍ¡•±°½¹•Ü)ML½ÁÉ½©•Ğµ¥¹ÍÑ…±±•È½‘•‰Õœ½É•½Ù•ÉäÁ¥¹Ì…¹…ÍÍ•Ğ¡…Í¡•Ìì¥¹Ñ•É¹…°ÍÑ…µÁÌÉ•Ñ…¥¹•¸)±°½É¥¥¹…°¥±”…Ñ¥½¸½¥¹ÁÕĞ%ÌÉ•Ñ…¥¹•½¹”¸!Q50Í•Ñ¥½¹Ì½½É‘•È½Õ¹¥ÅÕ”%Ì)¡•­•¸á¥ÍÑ¥¹œÔÀµ•¹Ô¥¹ÁÕĞ½½¹™¥œ½¹…µ”½±…å½ÕĞ½Ñ½½±‰…È½ÁÉ½©•Ğ=Á•¸½1½Á…¥¹Ğ¼)‘¥ÍÁ±…äµÉ•™É•Í ½É•±•…Í”¡•­ÌAML¼Á%0¼ÁÍ­¥À€¡øÄ¸ÄÉÌ¤ì)LÍå¹Ñ…à½‘¥™˜±•…¸¸9¼)¹•Ü½Íµ•Ñ¥ŒÑ•ÍÑÌ½È™Õ±°µÍÕ¥Ñ”½¹…Ñ¥Ù”É•¹‘•É•ÁÉ½½˜±…¥µ•¸AÕ‰±¥…Ñ¥½¸½µµ¥Ğ¼)ÑÉ•”½±¥Ù”•Ù¥‘•¹”¥ÌÉ•½É‘•¥¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ääØ¹µ‰•™½É”½µÁ±•Ñ¥½¸¸()Y%ääØè¥±”Í¡½İÌ=Á•¸½M…Ù”™¥ÉÍĞ°Ñ¡•¸%µÁ½ÉĞ½áÁ½ÉĞ½ÕÑ¥±¥Ñ¥•Ì…Ì¥µ…”ìÍÁ…¥¹œ°)™¥±•¹…µ”½Í•µ•¹Ñ•½¹ÑÉ½±ÌÉ•…‘…‰±”¸MÉ½±°Ñ¼‰½ÑÑ½´¥¸±…¹‘Í…Á”…¹Á½ÉÑÉ…¥Ğ¸)M…Ù”½=Á•¸„Ñ•ÍĞ€¹‰½á±…ˆì¥µÁ½ÉĞ½•áÁ½ÉĞ…¹9=5½É¥¥¹…°…Ñ¥½¹ÌìI•™É•Í ‘¥ÍÁ±…ä)ÍÑ¥±°…Ù…¥±…‰±”¸¼¹½ĞÉ•Í•Ğ„İ½É­¥¹œµ½‘•°Ñ¼Ñ•ÍĞÍÑå±¥¹œ¸I¥¡Ğµµ•¹ÔÉ•¹‘•É¥¹œ)É•µ…¥¹Ì=A8ìääÔ…•É½ÕÀ‘•Ù¥”…•ÁÑ…¹”ÍÑ¥±°Á•¹‘¥¹œ¸MÑ…¹‘¥¹œÁÕ‰±¥…Ñ¥½¸)…ÁÁÉ½Ù…°É•Ñ…¥¹•¸9•áĞ™½±±½ÜääØµ•¹Ô½¥A…ÍÁ…¥¹œ…¹ääÔÑ½½°™••‘‰…¬¸((ŒŒ€¸ääÜƒŠP•áÑ•É¹…°½É¥¥¹…°Y%\ÍÕÉ™…”ì€¸ääØÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈääØAMLÁÉ½Ñ•ÑÌ…ÉÉ…¹•¥±”µ•¹Ô°½É¥¥¹…°…Ñ¥½¹Ì…¹ÍÁ…¥¹œ¸UÍ•È¹½Ü)¥‘•¹Ñ¥™¥•Ì…™™•Ñ•ÍÕÉ™…”ÁÉ•¥Í•±äèY%\½ÕÑ•È™É…µ”Ñ½±•Ì‰ÕĞ¥ÑÌ½¹Ñ•¹ÑÌ)¹•Ù•È‘É…Ü¸I•Á½ÉĞääØ…ĞÀÜèĞÄèÀÙhÍ¡½İÌ½Á•¸ĞÌÈàä¼ĞÜÈÔÔ°±½Í•ĞÔÌÀÌ¼ÔĞäÜÜ¸=Á•¸)Á…¹•°ääà¼ØØ¼ÌØÀ¼àÄÄ¸äàĞ±ÍÉ½±±!•¥¡ĞäàÀ½±¥•¹Ñ!•¥¡ĞàÄÀì…ÑÕ…°Í…ÑÕÉ…Ñ¥½¸½±¥¡Ñ¹•ÍÌ¼)É•Í•Ğ½¹ÑÉ½±Ì¡…Ù”¹½Éµ…°±…å½ÕĞ‰½Õ¹‘Ì¸±½Í•‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘Ìİ½É­Ì¸)Q¡¥Ì¥Ì‘É…İ¸µ½¹Ñ•¹Ğ™…¥±ÕÉ”°¹½ĞÁÉ½½˜½˜µ¥ÍÍ¥¹œ¹½‘•Ì½È„™…¥±•¹…Ñ¥Ù”Ñ½±”¸)É½ÕÀµ±¥ÍĞ¹Õ±°½ÁÑ¥½¹½Õ¹Ğ½¥¹‘•à¥Ì•áÁ•Ñ•%X±¥ÍĞì¡¥‘‘•¸¥éµ¼¥¸Ñ¡¥Ì…ÁÑÕÉ”)¥Ì¹½Ğ•Ù¥‘•¹”½˜¥éµ¼Á…¥¹Ñ¥¹œ™…¥±ÕÉ”¸¼¹½ĞÉ•ÅÕ•ÍĞ…¹½Ñ¡•È¥‘•¹Ñ¥…°É•Á½ÉĞ¸()UÍ•È…‘‘Ì„ÕÍ•™Õ°¡É½¹½±½ä±Õ”èÕÉÉ•¹ĞÉ¥¡ĞY%\ÑÉ½Õ‰±”Í••µ•Ñ¼ÍÑ…ÉĞİ¡•¸)…•É½ÕÀ¥Ñ•µÌİ•É”…‘‘•¸…•É½ÕÀ½¹ÑÉ½±ÌÉ½ÜY%\™É½´•…É±¥•ÈMÑÕ‘¥¼ÜÔÑÁà)½¹Ñ•¹ĞÑ¼äàÁÁà…¹…Ñ¥Ù…Ñ”½Ù•É™±½Ü…ĞàÄÁÁà¸Q¡…ĞÁ½¥¹ÑÌÑ¼Ñ¡”™¥á•ÍÉ½±±¥¹œ)ÍÕÉ™…”¥¹Í¥‘”¹…Ñ¥Ù”‘•Ñ…¥±Ì…Ì„Á±…ÕÍ¥‰±”ÑÉ¥•Èì¥Ğ¥Ì9=P•¹¥¹”½É½½Ğµ…ÕÍ”)ÁÉ½½˜…¹‘½•Ì¹½ĞÉ•İÉ¥Ñ”½±‘•ÈäØØ¬É¥¡ĞµÉ•¥½¸É•Á½ÉÑÌ…Ì…±°ÍÑ…ÉÑ¥¹œ…ĞäàĞ¸()á¥ÍÑ¥¹œY%\Á…¹•°¥Ì„™¥á•½Ù•É™±½İ¥¹œ‘¥É•Ğ¡¥±½˜¹…Ñ¥Ù”€ñ‘•Ñ…¥±Ìø°İ¡½Í”)‰É½İÍ•Èµ‘¥Í±½Í•½¹Ñ•¹ÑÌ¡…Ù”„Í•Á…É…Ñ”Ù¥Í¥‰¥±¥Ñä½Á…¥¹Ñ¥¹œ±¥™•å±”¸9•ÜÍµ…±°)Ù¥•Üµµ•¹ÔµÍÕÉ™…”µ½Ù•ÌÑ¡…ĞM5Á…¹•°=9Õ¹‘•È€…ÁÀ°½ÕÑÍ¥‘”¹…Ñ¥Ù”‘¥Í±½ÍÕÉ”)…¹¡•…‘•È±¥ÁÁ¥¹œ½ÍÑ…­¥¹œ…¹•ÍÑÉä¸=É¥¥¹…°¹…Ñ¥Ù”€Ù¥•İ5½‘•Ì‘•Ñ…¥±Ì¹½Á•¸¥Ì)MQ%10Í½±”½Á•¸ÍÑ…Ñ”¸=¹”…ÑÑÉ¥‰ÕÑ”µ™¥±Ñ•É•5ÕÑ…Ñ¥½¹=‰Í•ÉÙ•Èµ¥ÉÉ½ÉÌÕÉÉ•¹Ğ½Á•¸)¥¹Ñ¼•áÁ±¥¥ĞÁ…¹•°¹¡¥‘‘•¸…¹ÍÕµµ…Éä…É¥„µ•áÁ…¹‘•½½¹ÑÉ½±Ì¸9¼‘ÕÁ±¥…Ñ”Ñ½±”°)½Á•¸‰½½±•…¸°¹•ÜÉ…ÜµÁ½¥¹Ñ•È½İ¹•È°Í•½¹Á½ÁÕÀ½½¹Ñ•¹Ğ½Áä½È…ÕÑ½µ…Ñ¥ŒÉ•Á…¥¹Ğ¸)±½Í••áÑ•É¹…°Á…¹•°¥Ì‘¥ÍÁ±…å¹½¹”½é•É¼µ±…å½ÕĞ™É½´•…É±äÍ¡•±°ÍÑå±•Í¡••Ğ½¹İ…É¸)á¥ÍÑ¥¹œ™¥á•Á½Í¥Ñ¥½¸½İ¥‘Ñ ½µ…àµ¡•¥¡Ğ½ÍÉ½±°½Ñ½Õ ÍÑå±•ÌÉ•µ…¥¸ìÍÉ½±°½™™Í•Ğ)É•ÍÑ½É•Ì½¸É•½Á•¹¥¹œ¸M…µ”=4%Ì½Ù…±Õ•Ì½±¥ÍÑ•¹•ÉÌÉ•µ…¥¸¸I•¡å‘É…Ñ¥½¸‘•Ñ•ÑÌ)•áÑ•É¹…°Á…¹•°É…Ñ¡•ÈÑ¡…¸É•É•…Ñ¥¹œ½¹Ñ•¹ÑÌ¸-•å‰½…ÉQ…ˆ½ÉÉ½İ½İ¸™É½´½Á•¸)ÍÕµµ…Éä•¹Ñ•ÉÌÁ…¹•°ìM¡¥™ÑQ…ˆÉ•ÑÕÉ¹Ì°Í…Á”±½Í•Ì¹…Ñ¥Ù”½İ¹•È½É•ÑÕÉ¹Ì™½ÕÌ¸()=É¥¥¹…°Ù¥•Üµµ½‘•Ì±¥¬½Á½¥¹Ñ•ÉÕÀ‘•±•…Ñ¥½¸¹½Ü‰¥¹‘Ì½É¥¥¹…°•áÑ•É¹…°Á…¹•°ì)•á¥ÍÑ¥¹œÍå¹Ñ¡•Í¥é•µ±¥¬ÍÕÁÁÉ•ÍÍ¥½¸É•Ñ…¥¹•¸=ÕÑÍ¥‘”µ±½Í”…•ÁÑÌ	=Q ÑÉ¥•È)…¹Á…¹•°ì…Ñ¥Ù”µÙ¥•Ü¡¥¡±¥¡Ñ¥¹œÍ•…É¡•ÌÍÑ…‰±”Á…¹•°%¸±•…¸Y¥•ÜÕÍ•Ì¹•Ü)%İ¥Ñ ±•…ä™…±±‰…¬°ÁÉ•Í•ÉÙ¥¹œ½É¥¥¹…°½Ù•É±…ä½İ¹•È¸U$•‰ÕœÍ…µÁ±•Ì¹•Ü(Ù¥•İ5½‘•ÍA…¹•°…¹Á…É•¹Ñ%°É•Ñ…¥¹¥¹œ•á¥ÍÑ¥¹œ½¹ÑÉ½±Ì½µ½‘”½ÍÉ½±°½Ñ½±”•Ù¥‘•¹”¸)9¼…¹Ù…Ì½É•¹‘•É•È½…Ñµ½ÍÁ¡•É”½A…¥¹Ğ½UX½™…•É½ÕÀ½•½µ•ÑÉä½¡¥ÍÑ½Éä½5Õ±Ñ¤Ä¸À¡…¹•Ì¸)¥±”ääØÍÑå±•Í¡••Ğ…¹™Õ¹Ñ¥½¹…°½İ¹•ÉÌÕ¹¡…¹•¸Q¡¥Ì¥Ì„Ñ…É•Ñ•ÍÑÉÕÑÕÉ…°)É•Á…¥ÈÉ•ÅÕ¥É¥¹œ¹…Ñ¥Ù”™••‘‰…¬°9=P„ÁÉ½Ù•¸Á•Éµ…¹•¹Ğ]•‰-¥Ğ½É½½Ğµ…ÕÍ”É•Á…¥È¸()I•Ù¥•İ•…¡”±½ÍÕÉ”èÙ¥•Üµµ½‘•ÏŠI¹•ÜÍÕÉ™…”ääÜì±•…¸Y¥•ßŠI…”İ½É­™±½ßŠI‘É…İ•È(ääÜì‘•‰Õœ½•…É±äÑ½½±‰…È½Í¡•±°½É•½Ù•ÉäääÜ¸É…İ•È…±Í¼…±¥¹Ì¥ÑÌÍÑ…±”ÁÉ½©•Ğ´)¥¹ÍÑ…±±•È¡¥±­•ääÌàÑ¼…•ÁÑ•Í¡•±°ääØ°…Ù½¥‘¥¹œ½µÁ•Ñ¥¹œ…¡•¥¹ÍÑ…±±•È)Ù•ÉÍ¥½¹Ìì¹¼¹•ÜÁÉ½©•Ğ¥¹ÍÑ…±±•È½‘”¸á¥ÍÑ¥¹œ½±¥¹Ñ•É¹…°ÍÑ…µÁÌÉ•Ñ…¥¹•¸()¥¹…°äÌ™½ÕÍ•AML¼Á%0¼ÁÍ­¥À€¡øÀ¸ÜÕÌ¤èÜ¹•ÜÍÕÉ™…”¥‘•¹Ñ¥Ñä½½‰Í•ÉÙ•È½¥‘•µÁ½Ñ•¹”¼)½…±•Í•ÍÑ…Ñ”½ÍÉ½±°½¥¹Í¥‘”µ½ÕÑÍ¥‘”…Ñ¥Ù…Ñ¥½¸½A•¹¥°ÍÕÁÁÉ•ÍÍ¥½¸½­•å‰½…ÉÑ•ÍÑÌ°)½É¥¥¹…°ÍÑ…ÉÑÕÀÑ½½±‰…È½É…µ•±°½µ•¹Ô½±•…¸Y¥•Ü½…•É½ÕÀ½‰ÉÕÍ ½‘½¬½¥±”½‘•‰Õœ¼)‘¥ÍÁ±…ä½É•±•…Í”½¹ÑÉ…ÑÌ¸)LÍå¹Ñ…à…¹‘¥™˜±•…¸¸Y¥•ÜÍÉ½±°Ñ•ÍĞÁ…ÉÍ•È¹½Ü)Í•±•ÑÌ¥ÑÌÑİ¼µ…àµ¡•¥¡Ğµ‰•…É¥¹œ‰…Í”½µ•‘¥„ÉÕ±•Ì¥¹ÍÑ•…½˜…±Í¼½Õ¹Ñ¥¹œääÀÌ)±½Í•‘•Í•¹‘…¹Ğµ‘¥ÍÁ±…äÍ•±•Ñ½Èì…±°¡•¥¡Ğ½½Ù•É™±½Ü…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•°…¹(ääÜ¡…Ì•áÁ±¥¥Ğ±½Í•µÍÕÉ™…”½Ù•É…”¸9¼ML½É•¹‘•É•½¹…Ñ¥Ù”½™Õ±°µÍÕ¥Ñ”ÁÉ½½˜)±…¥µ•™É½´½¹ÑÉ½±±•=4Ñ•ÍÑÌ¸1…Ñ•È¡½ÍÑ•ÍÑ…ÑÕÌ…¹•á…ĞÁÕ‰±¥…Ñ¥½¸½±¥Ù”)ÁÉ½½˜É•½É‘•¥¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ääÜ¹µì½¹ÍÕ±Ğ‰•™½É”‘•ÍÉ¥‰¥¹œ‘•±¥Ù•Éä¸()Y%ääÜè™É•Í ääÜ½Á•¸Y%\è‘¥É•Ñ¥½¹Ì½±½½­Ì½½¹ÑÉ½±ÌµÕÍĞÙ¥Í¥‰±ä‘É…Ü°¹½Ğ½¹±ä)™É…µ”¸½µÁ…É”MÑÕ‘¥¼…¹…•É½ÕÁÌ€¡½Ù•É™±½Ü…Í”¤ìÍÉ½±°Ñ¼‰½ÑÑ½´°Ñ½±”±½½­Ì)…¹É•½Á•¸İ¥Ñ ™¥¹•È½A•¹¥°¸±½Í”Y%\Ù¥„ÑÉ¥•È½½ÕÑÍ¥‘”Ñ…Àì½Á•¸¥±”…¹)É•ÑÕÉ¸¸…”É…‘¥…°I=U@ÍÑ¥±°½Á•¹Ì½É¥¥¹…°±•™Ğ‘½¬¸½¹™¥É´İ¥Ñ¡½ÕĞ…ÁÀ´)Íİ¥Ñ ½I•™É•Í ‘¥ÍÁ±…äİ½É­…É½Õ¹¸€¸ääØAML¥ÌÁÉ½Ñ•Ñ•ìääÔ…•ÁÑ…¹”¹½Ğ¥¹™•ÉÉ•¸)ÕÉÉ•¹ĞY%\Á¥á•°…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œì‰É½…‘•È¡¥ÍÑ½É¥…°É¥¡ĞµÉ•¥½¸¥ÍÍÕ”)ÍÑ…åÌ=A8Õ¹Ñ¥°¹…Ñ¥Ù”™••‘‰…¬¸9•áĞ…ÍÍ•ÍÌääÜ¥A…É•ÍÕ±Ğ‰•™½É”µ½É”É•¹‘•É¥¹œ)¡…¹•Ì½È™…•É½ÕÀµÍ•…´UX½µ…Ñ•É¥…°İ½É¬¸MÑ…¹‘¥¹œÁÕÍ ½ÁÕ‰±¥Í …ÁÁÉ½Ù…°…ÁÁ±¥•Ì¸((ŒŒ€¸ääÜ¥¹¥Ñ¥…°MÑÕ‘¥¼ÍÕ•ÍÌì…•É½ÕÁÌÑÉ…¹Í¥Ñ¥½¸É•µ…¥¹Ì=A8ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈèƒŠqY¥•Üİ½É­ÌÉ•…Ğ€´Ñ¡•É”¥ÌÍÑ¥±°„Á…Ñ ½¸Ñ¡”É¥¡ĞÑ¡…ĞÌ¡¥‘¥¹œÑ¡”)¥éµ¼½¹Ñ•¹ÑÌ»Št•ÁĞ½ÁÉ½Ñ•ĞääÜY%\É•¹‘•É¥¹œÉ•Á…¥ÈÍÁ•¥™¥…±±äì‘¼¹½Ğ¥¹™•È)‰É½…É¥¡ĞµÉ•¥½¸½¥éµ¼…•ÁÑ…¹”¸-••ÀääØ¥±”µ•¹ÔAML…¹ääĞ…•ÁÑ…¹”¸()9•ÜääÜÉ•Á½ÉĞÀàèÀĞèÔÌ¸ÄÄÁhèMÑÕ‘¥¼½…”°Ù¥•İÁ½ÉĞÄÌØÙàààØ±AHÈ±…¹Ù…ÌÈÜÌÉàÄØÔÈ°)½¹ÑÉ½±Ì•¹…‰±•°¹¼Ñ½½°Í•ÍÍ¥½¸½Ñ•áÑÕÉ”A…¥¹Ğ°…¹Ù…ÍAÉ½‰•¡¥‘‘•¹™…±Í”¸¥¹…°Y%\)±½Í•°•áÑ•É¹…°€Ù¥•İ5½‘•ÍA…¹•°Á…É•¹Ñ…ÁÀ½¡¥‘‘•¸½‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘Ì°Í¼¹¼)É•Ñ…¥¹•±½Í•Y%\É•Ñ…¹±”¥Ì•ÍÑ…‰±¥Í¡•…Ğ…ÁÑÕÉ”¸Ñ½Ñ…±¥éµ¼•áÁ±¥¥Ñ±ä)¡¥‘‘•¸½‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘ÌÑ½¼èÑ¡¥ÌÉ•Á½ÉĞ‘½•Ì9=P…ÁÑÕÉ”„Ù¥Í¥‰±”Á…ÉÑ±ä)±¥ÁÁ•¥éµ¼¸¼¹½ĞÑÉ•…ĞÑ¡…Ğ¥¹Ñ•¹Ñ¥½¹…°¡¥‘‘•¸ÍÑ…Ñ”…ÌÍÁ…Ñ¥…°±¥ÁÁ¥¹œÁÉ½½˜¸)MÑÕ‘¥¼…Ñµ½ÍÁ¡•É”¥Ì…Ñ¥Ù”°½Á…¥ÑäÄ½µÕ±Ñ¥Á±ä°‰ÕĞÑ¡¥Ì…±½¹”‘½•Ì¹½ĞÁÉ½Ù”¥Ğ)…ÕÍ•ÌÑ¡”Á…Ñ €¡½±‘•ÈÉ•Á½ÉÑÌ¥¹±Õ‘•¹½¸µMÑÕ‘¥¼½½Á…¥ÑäÀ™…¥±ÕÉ•Ì¤¸!•…±Ñ¡ä)É¥¡ĞµÑ½½±‰…È±…å½ÕĞ½¡¥ÑÌÉ•µ…¥¸¹½¸µÁ¥á•°•Ù¥‘•¹”¸()Q½±”µÑ¥µ”É•½É‘Ì…ĞÈäØÈä¼ĞÌÈØÈ¼ĞĞÌÄÌÍ¡½Ü½Á•¹QIUİ¥Ñ Á…¹•±¡¥‘‘•¹QIUì±½Í•Ì(ĞÈÄĞÀ¼ĞÌàÀĞ¼ĞĞàÈÜÍ¡½ÜÁÉ•Ù¥½ÕÌÙ¥Í¥‰±”Á…¹•°‰½Õ¹‘Ì¸•‰Õœ½‰Í•ÉÙ•ÌÑ½±”…Ğİ¥¹‘½Ü)…ÁÑÕÉ”°İ¡¥±”ÍÕÉ™…”Ù¥Í¥‰¥±¥Ñä¥Ìµ¥ÉÉ½É•‰ä5ÕÑ…Ñ¥½¹=‰Í•ÉÙ•È¸Q¡•Í”ÑÉ…¹Í¥Ñ¥½¸)Í…µÁ±•Ì…¸ÁÉ••‘”Ñ¡”Ù¥Í¥‰¥±¥ÑäÕÁ‘…Ñ”ìÑ¡•ä…É”¹½Ğ‰äÑ¡•µÍ•±Ù•ÌÁ•ÉÍ¥ÍÑ•¹Ğ)Y%\™…¥±ÕÉ”•Ù¥‘•¹”¸UÍ•È•áÁ±¥¥Ñ±ä½¹™¥ÉµÌY%\¹½Üİ½É­Ì¸AÉ•Í•ÉÙ”…•ÁÑ•)ÍÕÉ™…”ÍÑÉÕÑÕÉ”ì¥˜™ÕÑÕÉ”É•Á½ÉÑ¥¹œİ½É¬¥Ì¹••‘•°Í…µÁ±”Í•ÑÑ±•ÍÑ…Ñ”É…Ñ¡•È)Ñ¡…¸±…¥µ¥¹œÑ¡•Í”ÑÉ…¹Í¥Ñ¥½¸É•½É‘ÌÍ¡½Ü„É•µ…¥¹¥¹œÙ¥Í¥‰±”±½Í•Á…¹•°¸()M½ÕÉ”…Õ‘¥ĞèQ½Ñ…°¥éµ¼É½½ĞÉ•µ…¥¹Ì½É¥¥¹…°ÄäÙÁàÙ¥•İÁ½ÉĞ¡¥±°ÑÉ…¹Í±…Ñ•Ñ¼)Í•±•Ñ¥½¸ì¥ÑÌÁÉ¥µ…ÉäMY¥¹Ñ•¹Ñ¥½¹…±±ä±¥ÁÌÑ¼¥ÑÌ½İ¸‰½Õ¹‘Ìİ¡¥±”Í¡½ÉÑÕĞMYÌ)É•µ…¥¸½Ù•É™±½İÙ¥Í¥‰±”¸9¼ÍÁ•¥™¥ŒİÉ½¹œÍÉ••¸µ™¥á•±¥ÀÉ•Ğ½È½Ù•É¥¹œ=4¹½‘”)İ…Ì•ÍÑ…‰±¥Í¡•¸¼¹½ĞÉ•µ½Ù”ÁÉ½Ñ•Ñ•MY±¥ÁÁ¥¹œ½Èµ½Ù”¥éµ¼Á…É•¹Ğ½½½É‘¥¹…Ñ•Ì)ÍÁ•Õ±…Ñ¥Ù•±ä¸9¼½‘”½‰Õ¥±¡…¹”™É½´Ñ¡¥ÌÕÁ‘…Ñ”¸IÕ¹Ñ¥µ”É•µ…¥¹ÌääÜ¸()9•áĞÕÍ•™Õ°¹…Ñ¥Ù”•Ù¥‘•¹”èÍÉ••¹Í¡½Ğİ¡¥±”¥éµ¼¥ÌY%M%	1…¹É½ÍÍ¥¹œÁ…Ñ °)Í¼…ÉÉ½İÌ½É¥¹ÌÙ•ÉÍÕÌÉ…‘¥…°±…‰•±Ì½‰ÕÑÑ½¹Ì…¹™¥á•Á…Ñ ‰½Õ¹‘…Éä…¸‰”½µÁ…É•¸)EÕ¥¬MÑÕ‘¥¿ŠIM½±¥“ŠIMÑÕ‘¥¼½µÁ…É¥Í½¸µ…äÍ•Á…É…Ñ”MÑÕ‘¥¼ÁÉ•Í•¹Ñ…Ñ¥½¸‘•Á•¹‘•¹”ì)¥Ğ¥Ì„‘¥…¹½ÍÑ¥Œ½µÁ…É¥Í½¸°¹½Ğ„Õ…É…¹Ñ••É•½Ù•Éä½È•¹¥¹”‘¥…¹½Í¥Ì¸)9¼¹••™½È…¹½Ñ¡•È¥‘•¹Ñ¥…°‘ÕµÀİ¥Ñ ¥éµ¼¡¥‘‘•¸¸AÉ•Í•ÉÙ”½É¥¥¹…°¹…Ù¥…Ñ¥½¸°)Í•±•Ñ¥½¸½¡¥ÍÑ½Éä…¹…•ÁÑ•Y%\½İ¹•ÈÕ¹Ñ¥°•Ù¥‘•¹”ÍÕÁÁ½ÉÑÌ„¹…ÉÉ½ÜÉ•Á…¥È¸(