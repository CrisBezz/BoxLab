Warning: truncated output (original token count: 227294)
Total output lines: 12647

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
- [x] Existing semantic owner accepts touch/Pencil/mouse only on explicit gizmo launch; canvas touch navigation gate and component no-synthetic-replay retained. Actual onHandleDown capture verified for Move/Rotate/Scale in Vertex/Edge/Face.
- [x] ExplicitXYZ/free/uniform remains authoritative with Axis Snap ON; rotation direction across both camera sides/inverted views; uniform radius out/in all quadrants; selected-only changes, one history entry, selection retained.
- [x] Original Multi/group owner XYZ rotation/axis+uniform scale, pivots/origins and cancellation covered. Protected Multi1.0 unchanged.
- [x] Component tap/cancel explicitly clears transient gizmo state; cancel restores geometry and no-op tap leaves history unchanged. Grey View-axis ball and legacy canvas ownership retained.
- [x] Six new tests plus nearby/old gizmo/rotation/Multi/release checks:40 focused PASS. Full local Node24.22.1:2992 PASS/0FAIL/0skip/0cancel (114.10s); syntax/whitespace clean.
- [x] Reviewed1016 transform/object-origin/cache graph; Total Gizmo artwork1012, native NOM1015, navigation/Paint and frozen betas unchanged. No1015 native PASS inferred.
- [x]Runtime25cef857/tree9d729ee3; Pages40958753692 SUCCESS;12/12 live byte matches. Hosted40958754318 in_progress at proof; no hosted PASS claim.
- [x] DEVICE1016 user PASS accepts shipped gizmo repair: Object XYZ and grey rotation direction; orange uniform ring outward/inward around all quadrants, axis scale; component multi-vertex/edge/face Move/Rotate/Scale with finger/Pencil; UndoRedo/cancel and Multi/group.

## .1015 — native affine-row rounding repair — 29 October 2026

- [x] Actual MAP TEST.nom reproduces pre-fix refusal at Text matrix[15]=0.9999997615814209; patched decode imports Cube496v/504f and Text7911v/7916f with UVs. Source bytes unchanged.
- [x] Absolute1e-6 affine-row tolerance/canonicalization BEFORE hierarchy composition only; exact source upper3x3/translation preserved. Sample/mirror/UV/source/positive+negative parent+child drift covered.
- [x] Larger perspective/non-affine, invalid/non-finite/zero-w/singular matrices remain refused; large translations do not loosen tolerance; actual dispatcher adds nothing on refusal.
- [x] Actual uploaded geometry/UV .boxlab Save/Open and NOM export/reimport succeeds. No texture/material/paint import added; retained-map proposal stays deferred.
- [x]23 focused parser/dispatcher/release/identity checks PASS. Full local2986 PASS/0FAIL/0skip/0cancel (113.42s); syntax/whitespace clean.
- [x] Reviewed1015 importer->decoder and shell/canonical release/cache graph;1014 comparison ratings retained, A default; protected picker/Multi/frozen/UI/gestures unchanged.
- [x]Runtime6511ca38/treeb60c4c6a; Pages40869617898 SUCCESS;10/10 live byte matches. Hosted40869618748 in_progress at proof; no hosted PASS claim. Second cube-only MAP TEST(1).nom imports before/after repair; original live Text sample fails before and passes after.
- [ ] DEVICE1015 original MAP TEST.nom imports; inspect Cube/Text placement and UVs, import Undo/Redo, Save/Open and NOM geometry/UV export. Native acceptance pending.

## Planned native NOM material-retention gates — 29 October 2026

User direction: UV/embedded textures/PBR first; vertex paint deferred. Strategy only;
.1014 remains accepted, no implementation or new device-test request this session.

- [ ] Future NOM->.boxlab Save/Open->NOM preserves original image byte hashes/bit depth, map bindings/UV settings/material factors (including opacity/emissive/displacement), with unchanged supported mapping.
- [ ] Future UV/topology/import-scale handling marks stale bindings and preserves retained resources; no silent map loss, resampling or false rendering support.
- [ ] Future slots distinguish displayed from retained-only maps. Emissive self-lit preview, opacity cutout/blending and optional bounded displacement preview are separate device/benchmark gates.

## .1014 protected user acceptance — 29 October 2026

- [x] Explicit user “PERFECT 1014 PASS”: protect native NOM chooser and accepted selection/import workflow. Do not reintroduce picker accept filtering.
- [x] Hosted full regression40827907551 SUCCESS and Pages40827906168 SUCCESS rechecked after publication. No new code/build for this acceptance record.
- [x] Current runtime remains1014; NOM paint/material/layer preservation remains unimplemented. No full colour/material round-trip acceptance inferred.
- [ ] Optional existing-scope confidence check: imported NOM Save/Open .boxlab, mapped UV Editor. No new mandatory tests requested.

## .1014 — selectable NOM files / native chooser — 29 October 2026

- [x] Record1013 device blocker: NOM greyed out BEFORE selection; decoder/native import remains ungraded.
- [x] Original #importMeshInput has no accept/capture/multiple filter; no dynamic module reinstates it. Same button/input/listener/dispatcher retained.
- [x] Supported extensions still validated by app; unrelated extension refuses before file read or object addition. NOM content parser unchanged.
- [x]26 focused checks PASS; original NOM compressed/raw/legacy/native donor, actual import/UV SaveOpen/GLB/NOM tests and release identity retained. Syntax/whitespace clean.
- [x]Full1013 baseline2983 PASS retained; no fresh full local rerun for this shell-only change. Decoder/importer/exporter/protected navigation/UI/Multi/betas unchanged.
- [x]Runtime8a33141c/treee7d18056/Pages40827906168 SUCCESS;10/10 live byte matches; docs/publication-1014.md. Hosted40827907551 running at proof.
- [x]DEVICE1014 user PASS: native NOM picker/import workflow accepted; reported grey-file blocker closed for tested case.

## .1013 — native Nomad geometry import — 29 October 2026

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

## .1012 — grey View rotation ball / compact Split View — 29 October 2026

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

## .1011 — anchored twist / no inertia;1010 user PASS — 29 October2026

- [x]Published runtimef9899386,treeb72a6e24,Pages40807730838 SUCCESS,11/11 live files match.
- [x]Explicit1010 PASS protects free orbit,light/Paint gestures,presets/preview/large brush/history. Inertia is deliberately removed by subsequent user request.
- [x]Existing Three native pointer/pan/dolly owner maps both contacts on target plane:parallel pan,pinch,twist,held finger1 or2,inverted/oblique view and page offsets.
- [x]Zoom limit preserves held point;near-coincident contacts rebase;disabled/cancel/release transitions retain native owner. Default orbit/pan/zoom show no post-release drift.
- [x]Full local2965 PASS/0FAIL/0skip/0cancel (111.97s),syntax/whitespace clean.
- [x]58 focused checks PASS,including10 new native pointer/controller checks;no original Paint/history/three-finger assertions dropped.
- [ ]DEVICE1011 orbit/flick stops on lift;twofinger parallel pan and pinch remain.
- [ ]Hold either finger and arc other:SCREEN-PLANE twist around held point;combine pan/pinch/twist,release one and resume orbit.
- [ ]Twofinger tapUndo/threefinger tapRedo,threefinger light and Paint size remain accepted. No repeat A/B required.

## .1010 — navigation, light and Paint gesture regression — 29 October2026

- [x]Published runtime7afc6a61,tested tree0630b732,Pages40780100247 SUCCESS,18/18 live byte matches.
- [x]Full local2955 PASS/0FAIL/0skip/0cancel (117.01s),10 new actual-owner checks;syntax/whitespace clean.
- [x]User1009 A/B/A ALL PASS:5 complete A +5 complete B,0 rated FAIL,20 unrated excluded; version identity1009 and saved/backing1x confirmed. Protect exact workflow acceptance; keep A default. See docs/shell-comparison-results-1009.md.
- [x]Real native-controller subclass crosses both poles,keeps distance/target,native pan/dolly after inverted orbit,inertia decay/contact stop/disabled/view reset.
- [x]Main actual touch owner retains2tapUndo/3tapRedo;3drag has axis lock/no history/drains all contacts/cancel restore. No second raw event owner.
- [x]Original Paint UI size1–256,standard five tips,preview uses original raster and coalesces latest setting;late/hidden preview suppressed. Size changes create no paint resource/history;cancel restores.
- [x]Large raster work window remains bounded,renews same snapshot,exact cancel;actual large Pencil stroke is ONE UndoRedo.
- [x]User1010 PASS:free tumble,onefinger orbit,twofinger pan/pinch,view commands;inertia deliberately superseded by1011.
- [x]User1010 PASS:Studio3finger horizontal light,tap3 Redo,release restores navigation.
- [x]User1010 PASS:Paint3finger vertical size/preview,presets/large stroke/UndoRedo/Done;Fill/left dock retained.
- [x]Native1010 PASS explicitly supplied by user;no inference from Node and no extra A/B batch required.

## .1009 — protect loaded shell provenance — 28 October 2026

- [x]Published runtime1e34c432, exact tested tree20cb43c1, Pages40683927107 SUCCESS and all9 live files byte-match; docs/publication-1009.md.

- [x] Classic head captures immutable shell identity before comparison/modules; actual OBJ exporter cannot write app version in either initialization order.
- [x] Original release owner repairs label AND dataset; metadata contamination before initialization, attribute-only mutation, arbitrary stamp argument, newer manifest and offline return cannot relabel loaded code.
- [x] Real OBJ Base/SubD wrapper output equals original production core with internal450 stamp; source mesh remains unchanged. Existing MIME/round-trip tests retained.
- [x] Comparison uses immutable identity, independently stamps1009, preserves exact1006/1007/1008 ratings/notes/first failures, and never copies PASS into new loads.
- [x]Full local2945 PASS/0FAIL/0skip/0cancel (117.67s).48 focused checks PASS; old actual exporter fails new regression. Protected Multi1.0/frozen/model/Paint/UV owners unchanged.
- [ ]DEVICE1009 visible app/checklist1009 and new Copy observations shellRelease1009; retain historical450 metadata unchanged.
- [ ]Alternate A/B with in-app controls, same resolution/orientation/default cube, startup FIRST; original five visible checks. Beta screen gate remains OPEN.
- [ ]B extended parity: navigation/selection/gizmo, UV Back/Paint Done, UndoRedo and SaveOpen before default adoption. No device1009 acceptance inferred from Node.

## .1008 native comparison results — 28 October 2026

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

## .1008 — running-code identity and unobstructed UV test controls — 28 October 2026

- [x] Screenshot confirms apparent1007 and blocked A UV return; first3 A PASS toggles observed for ONE run, no broad rendering PASS inferred.
- [x] Network latest may differ; displayed version/title stay on loaded shell through pageshow/visibilitychange/legacy overwrite; no forced recovery.
- [x] Direct/nested release owner use same1008 URL; layout/drawer parent pins refreshed, protected Multi1.0 unchanged.
- [x] Actual runner Hide removes full list; small left-centre TEST LIST reopens with ratings preserved. Independent checklist .1008 stamp.
- [x] Actual app/UV hidden-state observer drives inline docking, restores on Back, stops on Hide/pagehide and resumes appropriately; no viewport/model writes.
- [x]1006/1007 records and notes retain original release; fresh1008 results remain unrated.
- [ ]DEVICE1008 checklist header .1008, A UV Back visible/clickable after Hide even if docking fails; reopen list, preserve ratings.
- [ ]Same B UV check, then finish native A/B; original beta rendering gate remains OPEN.

## .1007 — checklist must clear UV exit controls — 28 October 2026

- [x] User1006 A UV check blocked by test list; do not count as native compositor evidence.
- [x] 34 focused comparison/original UV/VIEW/release checks PASS, including exact1006 log migration and unrated new1007 load.
- [ ] UV Editor: expanded AND collapsed checklist below upper toolbar in A and B; Back to3D is visible and receives input.
- [ ] Back/Close returns checklist to normal top-left; viewport size/resolution/UV/history/navigation unchanged.
- [ ] Copy results retains1006 entries/notes/ratings/failure evidence tagged1006, new runs tagged1007; no prior PASS auto-copied.

## .1006 — shell comparison regression and native gate — 28 October 2026

- [x]1004 Fill behaviour explicitly user PASS; preserve accepted Face/Facegroup/Object scopes and hold/history.
- [x]1005 screen explicitly FAIL: empty Facegroup menu / missing bottom-right status at startup; beta blocker remains OPEN.
- [x]1006 A retains original hierarchy; B moves SAME canvas once before modules, retaining viewport/UI/renderer/input owners and dimensions.
- [x]1006 actual in-app checklist PASS/FAIL, notes, first-failure evidence, persistent bounded build-tagged logs, incomplete-versus-complete counts.
- [x]1006 storage corruption/denial/no-op failure, clipboard fallback, discard acknowledgement and busy guards; no silent reload/model loss.
- [x]1006 explicit reload-only profile switching, unchanged resolution settings; original Paint image-overlay parent/coordinates/disposal retained.
- [x]50 focused + full2935 local PASS/0FAIL/0skip; hosted40663447564 and Pages40663446569 SUCCESS;8 live files match.
- [x]Cloud UI-only A→B/rating/notes/Copy/viewport/hit/SELECT/Facegroups smoke passes; WebGL disabled, no native pixel acceptance.
- [ ]DEVICE1006 A: use in-app five-step list across up to5 reloads, startup FIRST before menus/collapse. No app-switch.
- [ ]DEVICE1006 B: same iPad/orientation/resolution/default cube; same five steps across up to5 reloads. No forced display recovery.
- [ ]Copy results after testing; retain which profile/load/step failed. Correct DOM/bounds do NOT establish visible pixels.
- [ ]Native B input parity: canvas orbit/pan/pinch, gizmo handles, UV workspace and Paint UI remain interactive; original pass-through overlays stay non-pickable.

## .1005 device feedback — Fill PASS; screen FAIL — 28 October 2026

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

## .1005 continuation audit — 28 October 2026

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

## .1005 — opt-in startup 1x, after .1004 recurrence — 28 October 2026

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

New File -> UI Debug -> Keep1× on reload explicitly saves1x launch preference and
applies current1x. Same button becomes Use normal on reload to remove preference.
Original temporary Test1×/Restore normal controls retained. Debug off/pagehide now
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

DEVICE1005: Finish tools -> File/UI Debug -> Keep1× on reload. Confirm button reads
Use normal on reload, then refresh ONCE. Inspect right toolbar/menu/gizmo immediately
and after normal navigation. Copy report if failure returns; savedStartup1 plus
requested1/backing1366x826 establishes fresh1x launch. Debug off keeps saved1x. Use
normal on reload restores original resolution if wanted. No repeated cache-clearing
or identical old diagnostics requested.1004 Fill behavior retained; not marked PASS.

## .1004 — UV Paint Fill Face / Facegroup and hold expansion — 28 October 2026

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
UVs in tile0–1, original bounded geometry/work limits. Shared/ambiguous boundary
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

## .1003 — explicit render-resolution diagnostic; .1002 PASS protected — 28 October 2026

User requests further attempts after model change. Implement controlled1x versus
normal DPR through ORIGINAL viewport-sizing owner; default remains automatic capped2.
File -> UI Debug -> Test1× render resolution toggles temporary cap1; same button
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

DEVICE1003: while fault visible, finish tool -> File/UI Debug -> Test1× render
resolution. Inspect right gizmo/menu; repeat original failing workflow at1x. Restore
normal resolution and repeat. Copy report while affected. Report whether1x prevents
recurrence, both switches only recover temporarily, or neither helps. Debug off
restores normal;1x intentionally looks softer. Fill Face/Facegroup remains unshipped.

## .1002 user PASS; shared gizmo/menu audit — 28 October 2026

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

## .1002 — uniform Facegroup colours, including undersides — 28 October 2026

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

## .1001 recurrence — blank Facegroups VIEW and right-region gizmo loss — 28 October 2026

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

## .1001 — UV Editor plain composition; .1000 feature PASS — 27 October 2026

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

## .1000 — UV Paint handoff and Facegroups → UV Seams — 27 October 2026

User says “PASS 999 so far”. Record PROVISIONAL .999 PASS and protect the exact
main/styles/retired-atmosphere startup baseline. This is not an unlimited native
visibility acceptance. User explicitly requests the next UV/Facegroups workflow.

UV PAINT now uses the existing paintTargetKey validator before entering Paint.
Missing/stale/incompatible UVs open the ORIGINAL UV session through __boxlabUVTools,
with “Valid UVs required for UV Paint” at the TOP. No UV/paint/history is authored
by the redirect. Valid targets in Facegroups view switch through the existing Studio
button, stopping the original Facegroup stroke/dock owners, before Paint opens.
Finished UV-tools sessions hand off directly to bottom UV PAINT; busy unwraps require
Finish/Cancel first. Existing other-tool protections remain intact.

UV menu adds “Facegroups → UV Seams”, orbitable orange boundary preview, explicit
“Confirm UV Unwrap”, elapsed timer and Cancel. Preview has no history or UV edits,
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

DEVICE1000: (1) no-UV object → UV PAINT → original UV menu + top reminder;
(2) valid UV object in Facegroups → UV PAINT → Studio + paint;
(3) UV → Facegroups → UV Seams → orbit/check → Confirm UV Unwrap → timer → checker
and orange boundaries; (4) Undo/Redo and Save/Open retain UVs/groups; Cancel creates
no UV/history edits. Also check .999 initial/right viewport remains healthy.
Current build .1000; feature acceptance pending device test.

## .999 — rebuild initial viewport baseline; .998 FAIL — 27 October 2026

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

## .998 — Facegroups transition repair, native acceptance pending — 27 October 2026

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
- [ ] Revolve Profile: new plane remains positionable before editing; moving/snapping or launcher opens exclusive Tool Session; Pencil profile editing, Segments 3–64 and Apply remain unchanged
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
- [ ] duplicate works and uses padded numbering (01, 02, 03…) instead of appending copy
- [ ] duplicating an already-numbered sibling continues the same numbering family rather than nesting another suffix
- [ ] linked and Multi duplicate naming follows the same numbered object-name rule
- [ ] rename works
- [ ] Object Rename opens the BoxLab rename field already focused with the current text selected for immediate typing
- [ ] Object footer is compact Add / Duplicate / More, while Rename / Delete / Linked Duplicate / Make Unique remain available and correctly enabled inside More
- [ ] delete works
- [ ] each object-row More menu includes Delete Object and deletes that specific object with one Undo step
- [ ] in Object mode, Delete and Backspace trigger the authoritative Delete action for the current single/Multi/Group selection
- [ ] Delete / Backspace do nothing while typing in Rename or another editable field
- [ ] Boolean results use compact B numbering (B1, B2, B3…) from the active/base object name instead of concatenating operand names
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

- [ ] component Move displays live ΔX / ΔY / ΔZ while dragging
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
- [ ] Grid Fill creates an all-quad U×V patch and selects the new faces
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

## Phase D — Array

- [ ] Array opens with Count=2: source + exactly one highlighted END preview copy
- [ ] Spacing slider is no longer part of the primary Array UX
- [ ] END preview can be dragged with Pencil/finger
- [ ] Free endpoint movement follows the current camera/view plane
- [ ] X / Y / Z endpoint modes constrain only the selected world-axis component
- [ ] switching Free/X/Y/Z during one preview preserves the existing endpoint position
- [ ] Count includes source and END and supports 2–12 total objects
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

## Cross-mode — Delete / Backspace keyboard routing

- [ ] Delete/Backspace in Object mode triggers existing Outliner Delete behavior
- [ ] Delete/Backspace in Face mode deletes selected face(s) exactly like Face > Delete
- [ ] Delete/Backspace in Edge mode deletes selected edge(s) exactly like Edge > Delete
- [ ] Delete/Backspace in Vertex mode deletes selected vertex/vertices exactly like Vertex > Delete
- [ ] component Delete remains one normal Undo step through existing handlers
- [ ] Delete/Backspace does not fire while typing in inputs, textareas, selects or contenteditable fields
- [ ] Object Multi/Group delete behavior remains unchanged

## Phase D — Revolve Profile — .392 post-Apply selection

- [ ] Apply Revolve leaves the Revolve object as the normal single active Object selection
- [ ] any previously active/inactive cube loses stale amber/blue Boolean tint after Apply
- [ ] Object Multi mode is not left armed by Revolve Apply
- [ ] Boolean A/B tint still appears correctly when two objects are deliberately selected afterward
- [ ] Undo/Redo of Revolve Apply does not corrupt authoritative Object selection
- [ ] Studio/Solid view materials remain normal after Apply

## Phase D — Revolve Profile — .391 Active Tools

- [ ] newly added Revolve Profile may remain in positioning mode without forcing Active Tools
- [ ] moving the Revolve plane opens Active Tools automatically
- [ ] rotating the Revolve plane opens Active Tools automatically
- [ ] scaling the Revolve plane opens Active Tools automatically
- [ ] snapping/repositioning the Revolve plane opens Active Tools automatically
- [ ] Edit Profile opens Active Tools immediately
- [ ] Active Tools stays open while active Revolve construction tooling is in use
- [ ] Apply Revolve releases the drawer lock
- [ ] switching away from the construction does not leave a stale drawer lock

## Phase D — Revolve Profile — .390 point editing

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

## Phase D — Revolve Profile — .389 refinement

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

## Phase D — Live Revolve Profile construction

- [ ] Add → Revolve Profile creates a construction plane
- [ ] left edge of construction plane is visibly blue and acts as the revolve axis
- [ ] Edit Profile: tap plane adds points constrained to the plane
- [ ] consecutive profile points connect automatically as one open chain
- [ ] dragging a profile point keeps it on the construction plane
- [ ] dragging a profile point updates the revolved fill + wire preview live
- [ ] profile points near the blue axis snap exactly onto it
- [ ] toggling Edit Profile off restores viewport navigation without losing points
- [ ] toggling Edit Profile back on resumes profile editing
- [ ] Segments 6–64 updates preview live with finger and Apple Pencil
- [ ] Undo Point reverses the last profile authoring gesture
- [ ] Clear removes profile points but preserves the construction plane
- [ ] moving/rotating/scaling the construction plane keeps profile + preview attached
- [ ] Apply Revolve converts the construction to ordinary editable mesh geometry
- [ ] Apply Revolve is one Undo step; undo back to construction plane restores live profile state
- [ ] legacy loose-edge Revolve remains available

## Phase D — Revolve / Lathe

- [ ] Revolve is available in Edge mode for a standalone loose-edge profile
- [ ] entire loose profile must be selected; partial selection refuses
- [ ] branched loose profiles refuse
- [ ] closed-loop loose profiles refuse in the foundation build
- [ ] stray loose vertices outside the profile refuse
- [ ] X / Y / Z axis buttons revolve through active Object Origin
- [ ] Segments 6–64 updates preview live with finger and Apple Pencil
- [ ] first Revolve tap creates a non-destructive translucent fill + wire preview
- [ ] Revolve preview shows the active axis guide
- [ ] profile vertices on the axis collapse to a single pole rather than duplicate degenerate rings
- [ ] endpoints off-axis remain open boundary rings
- [ ] Apply Revolve converts the loose profile into ordinary editable faces
- [ ] Apply Revolve clears loose topology and is one Undo step
- [ ] existing Array, outward/inward Extrude, Through and navigation remain unchanged

## Phase D — Solidify / Shell foundation

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
- [ ] a 90° folded multi-sheet preserves full requested thickness to both source planes using a proper miter/plane intersection
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
- [ ] SubD levels 1–4 behave correctly
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


## Phase D — Sweep Path — .393

- [ ] Add → Sweep Path creates a movable/snappable construction plane in Object mode
- [ ] Edit Path lets Apple Pencil/mouse add, insert, select and drag path points while touch navigation remains one-finger orbit / two-finger pan / pinch zoom
- [ ] Undo Point / Delete Point / Clear update the live preview without committing geometry
- [ ] Radius updates the live preview and is Pencil-draggable without late Safari value snap-back
- [ ] Sides 3–24 updates the live preview and is Pencil-draggable
- [ ] Caps On/Off toggles both sweep end caps
- [ ] curved multi-point paths keep a coherent section orientation without obvious 180° flips
- [ ] Apply Sweep converts the construction into ordinary editable mesh, returns to normal single-object selection and clears stale Boolean A/B tint
- [ ] one Undo returns the applied object geometry to the construction plane state
- [ ] Revolve, Array, Solidify, Shell, Through and touch navigation remain unchanged


## Phase D — Sweep Path — .394

- [ ] Apply Sweep immediately shows the generated Sweep result without requiring object reselection
- [ ] Apply Sweep immediately removes the construction plane/preview overlay
- [ ] Geometry Snap ON can place Sweep path points on visible external vertices
- [ ] Geometry Snap ON can place Sweep path points on visible external edges
- [ ] Geometry Snap ON can place Sweep path points on visible external face hit-points
- [ ] snapped Sweep points may sit off the construction plane and the live preview follows the resulting 3D path
- [ ] Geometry Snap OFF preserves free construction-plane path drawing
- [ ] touch orbit/pan/pinch remain normal while Pencil/mouse edits the Sweep path


## Phase D — Sweep Profile + dual path — .395

- [ ] Add → Sweep creates a movable/snappable **Profile Plane**, not a visible path plane
- [ ] Circle and Rectangle create live built-in profiles on the Profile Plane
- [ ] Draw creates a closed editable custom profile on the Profile Plane
- [ ] Edit Profile converts a built-in Circle/Rectangle into editable profile points without losing its current shape
- [ ] profile points can be inserted/moved and Undo Profile / Clear Profile update the live preview
- [ ] Follow Edges can use visible existing object/reference edges even when Geometry Snap is OFF
- [ ] Follow Edges extends along connected existing edges and refuses disconnected continuation edges
- [ ] Draw Path can create/edit path points without displaying a path construction plane
- [ ] Draw Path uses external Vertex/Edge/Face Geometry Snap when enabled
- [ ] profile and path can be edited alternately before Apply without restarting Sweep
- [ ] bent paths keep a stable transported profile orientation without obvious 180° flips
- [ ] touch orbit/pan/pinch remain available while Pencil/mouse authors profile/path geometry
- [ ] Apply Sweep converts preview to ordinary editable mesh and removes Profile Plane/preview immediately
- [ ] Apply Sweep remains one normal history step and preserves authoritative single-object selection


## Phase D — Sweep Draw Profile fixes — .396

- [ ] Profile Plane starts close to the default Circle profile size rather than filling the viewport
- [ ] Draw Profile starts Open and accepts 3+ points by appending points naturally
- [ ] Open Draw Profile previews after 2 points as a swept surface
- [ ] Closed button refuses closure below 3 points and closes a valid 3+ point profile explicitly
- [ ] Closed profile preview generates the normal closed-section Sweep and Caps become available
- [ ] Open profile shows Caps N/A and produces no profile seam/end caps
- [ ] Closed profile can be reopened without losing points
- [ ] Circle/Rectangle remain closed and unchanged
- [ ] Edit Profile on Circle/Rectangle converts current shape to editable closed Draw points


## Phase D — Sweep profile orientation — .397

- [ ] Closing a custom Draw profile connects the final authored point directly back to point 0 without reordering points
- [ ] Clockwise and counter-clockwise custom profiles preserve authored vertex order
- [ ] Dragging a profile point left moves the Sweep preview left, never mirrored right
- [ ] Profile Plane U/V orientation remains visually consistent whether the path leaves along +normal or -normal
- [ ] Existing Circle/Rectangle profile orientation remains unchanged


## Phase D — Sweep concave/start-ring hardening — .398

- [ ] Ring 0 exactly matches the authored Profile Plane section; no shifted/rotated/mirrored start section
- [ ] Closed concave C-shaped profile sweeps without inside-out side faces
- [ ] Concave start/end caps triangulate cleanly without fan-overlap artifacts
- [ ] Start cap faces outward opposite the first path segment and end cap faces outward along the final segment
- [ ] Convex Circle/Rectangle/custom profiles remain unchanged
- [ ] Open profiles remain uncapped and unaffected


## Phase D — Sweep side normals — .399

- [ ] Same concave C-profile used for .398 displays outward side normals around the complete Sweep
- [ ] Side normals stay outward through corners/path direction changes
- [ ] Concave inner returns face the cavity, outer edges face away from the section
- [ ] Clockwise and counter-clockwise authored profiles both produce outward side faces
- [ ] Exact ring-0 profile placement from .398 remains unchanged
- [ ] Concave cap triangulation and convex cap topology remain unchanged


## Phase D — Sweep edit ownership — .400

- [ ] Draw Profile starts/stays Open until the user explicitly presses Closed
- [ ] Draw Profile accepts point 4 and subsequent points without requiring Open to be reselected
- [ ] Edit Profile disarms Move/Scale/Rotate before Pencil/mouse profile editing begins
- [ ] Draw Path / Follow Edges / Edit Path disarm Move/Scale/Rotate before path authoring begins
- [ ] transform gesture layer yields while Sweep profile/path editing owns the viewport
- [ ] touch orbit/pan/pinch remain available during Sweep editing
- [ ] leaving Sweep editing does not silently re-arm Move


## Phase D — Sweep Use Selection — .401

- [ ] Select one Face, Add → Sweep, then Use Selection reproduces that face outline on an aligned Profile Plane
- [ ] Select a connected closed Edge loop, Add → Sweep, then Use Selection reproduces the loop in connected order
- [ ] Use Selection is disabled when no valid Face/closed Edge-loop source was captured before Add → Sweep
- [ ] open/disconnected/branched edge selections are rejected rather than converted
- [ ] non-planar selected outlines are rejected rather than flattened silently
- [ ] source object/selection geometry remains unchanged after Use Selection
- [ ] imported selection becomes an editable closed Draw profile via Edit Profile
- [ ] applying Use Selection clears stale path points if the Profile Plane is repositioned


## Phase D — Sweep direct selection launch — .402

- [ ] With one Face selected, Face Active Tools exposes Sweep from Selection
- [ ] Sweep from Selection captures the Face before Object mode clears component selection
- [ ] Face launch creates Sweep, enters Object mode and immediately loads/aligned the selected Face as the editable profile
- [ ] With a closed Edge loop selected, Edge Active Tools exposes Sweep from Selection
- [ ] Edge launch captures the loop before Object mode handoff and loads it as the editable profile
- [ ] user does not need to manually enter Object mode before launching selected-profile Sweep
- [ ] invalid open/branched/non-planar Edge selections are still rejected by .401 validation


## Phase D — closed Sweep profile insertion — .403

- [ ] Closed Draw profile in Edit Profile accepts a new node on any profile segment
- [ ] Closing segment from last point back to point 0 also accepts insertion
- [ ] Existing profile vertices still drag normally
- [ ] Open profile append behaviour remains unchanged
- [ ] inserted node updates live Sweep preview immediately


## Phase D — selected-profile Sweep anchor — .404

- [ ] Face → Sweep → Follow Edges begins directly from a profile vertex on the selected rail, with no profile-centre lead-in
- [ ] nearest profile vertex to the first selected rail endpoint becomes the anchor
- [ ] Profile Plane translates so the anchor vertex sits exactly on that endpoint
- [ ] selected profile shape/offset remains unchanged relative to the anchor
- [ ] subsequent connected Follow Edges continue from the same rail path
- [ ] same behaviour works for closed Edge-loop profile sources
- [ ] Circle/Rectangle Sweep remains centre-anchored
- [ ] Draw Path behaviour remains unchanged when no Follow Edge anchor is established


## Phase D — Sweep shell normal unification — .405

- [ ] Closed capped selected-Face Sweep has outward normals after Apply
- [ ] Closed capped clockwise and counter-clockwise profiles both resolve to outward shell orientation
- [ ] anchored profile geometry/path placement from .404 remains unchanged
- [ ] concave C-profile Sweep remains clean and outward-oriented
- [ ] open-profile Sweep surfaces are not auto-reversed
- [ ] uncapped closed-profile Sweep surfaces are not volume-flipped


## Phase F — Tool Session / Sweep UX — .406

- [ ] Face mode with one selected Face shows Sweep near the top of Face Active Tools, not appended at the bottom
- [ ] closed Edge-loop selection shows the same compact Sweep launch near the top of Edge Active Tools
- [ ] Face/Edge → Sweep takes exclusive ownership of Active Tools and opens directly on PATH
- [ ] normal Object tools (Array, Boolean, Clean for SubD, Solidify, etc.) are hidden while the Sweep Tool Session is active
- [ ] PROFILE / PATH / FINISH switch cleanly without scrolling through unrelated controls
- [ ] switching PROFILE/PATH prevents the hidden editor from retaining viewport gesture ownership
- [ ] Object Add → Sweep begins on PROFILE
- [ ] Apply Sweep ends the Tool Session and restores the previous Active Tools drawer state
- [ ] Sweep geometry, snapping, anchoring, normals and Apply behaviour remain unchanged from .405


## Phase D — Sweep local winding — .407

- [ ] previously isolated Sweep backface is gone
- [ ] every manifold shared edge has opposite face-edge traversal
- [ ] bent selected-profile Sweep remains outward and clean
- [ ] concave C-profile Sweep remains outward and clean
- [ ] .406 Tool Session UX remains unchanged


## Phase D/F — Sweep rail-edge visibility — .408

- [ ] PATH → Follow Edges shows the full edge network of eligible visible meshes
- [ ] Knife-cut edge across a face is visibly available as a rail
- [ ] Loop Cut/internal topology edges are visible, not only boundary/silhouette edges
- [ ] rail guide is sourced from the same evaluated meshes used by Follow Edges snapping
- [ ] PROFILE hides the rail guide
- [ ] Draw Path hides the rail guide
- [ ] FINISH and Apply remove the rail guide
- [ ] .406 Tool Session and .407 winding behaviour remain unchanged


## Phase D/F — Sweep rail contrast / hover — .409

- [ ] candidate Follow Edges network has stronger contrast than .408
- [ ] edge under Pencil/cursor receives a distinct hot highlight before selection
- [ ] hot highlight corresponds to the exact edge Follow Edges would select
- [ ] accepted Sweep path is visually distinct from both candidate and hot states
- [ ] hot state clears when leaving PATH or switching to Draw Path
- [ ] Apply/exit clears all temporary rail highlighting
- [ ] .408 internal-edge visibility remains intact


## Phase D/F — Follow Edges picker regression — .410

- [ ] Follow Edges selects an edge when tapping near either endpoint
- [ ] Vertex proximity no longer steals/rejects a Follow Edges pick
- [ ] hot edge and clicked edge use the same edge-only picker
- [ ] mid-edge picking remains reliable
- [ ] rail reference cache refreshes on entering Follow Edges and clears on exit/Apply
- [ ] Draw Path generic Vertex/Edge/Face snapping remains unchanged
- [ ] .409 candidate/hot/accepted contrast remains intact


## Phase D/F — Follow Edges state + rail visibility — .411

- [ ] Follow Edges lights immediately when activated
- [ ] Draw Path lights immediately when activated
- [ ] path buttons expose matching aria-pressed state
- [ ] Knife-cut/internal rail edge remains visible over a shaded face
- [ ] rail guide remains temporary and only visible in PATH → Follow Edges
- [ ] .410 edge-only picker behaviour remains unchanged


## Phase D/F — hard Follow Edges active-state indicator — .412

- [ ] active Follow Edges button literally reads `Follow Edges · Active`
- [ ] inactive Follow Edges button reads `Follow Edges`
- [ ] selected path button styling is driven by aria-pressed and remains visible regardless of generic button CSS
- [ ] active candidate rail guide is fully opaque over shaded surfaces
- [ ] .410 picker and .411 rail visibility behavior remain unchanged


## Phase D/F — atomic selected-profile Follow Edges handoff — .413

- [ ] Face → Sweep opens PATH with `Follow Edges · Active` immediately
- [ ] closed Edge-loop → Sweep does the same
- [ ] selected-profile auto launch has `editPath=true`, `pathMode='edges'`, `sessionStage='path'` before save/render events
- [ ] rail refs and button state initialize before `manager.saveActive()`
- [ ] manual Use Selection remains profile-only unless path mode is explicitly activated
- [ ] .410 picker and .412 hard visual state remain unchanged


## Phase D/F — Follow Edges rail-state declaration regression — .414

- [ ] Follow Edges activates without runtime error
- [ ] `hotRailHit` is declared at module scope
- [ ] `railSnapRefs` is declared at module scope
- [ ] Follow Edges button shows `Follow Edges · Active`
- [ ] rail candidate overlay appears immediately
- [ ] .410 edge-only picker and .413 atomic handoff remain intact


## Phase D/F — fresh Sweep placement — .415

- [ ] Object → Add → Sweep profile plane appears visibly in front of the current active object/scene
- [ ] fresh Sweep plane is camera-facing
- [ ] fresh Sweep remains the active object after creation
- [ ] real Move is armed automatically on the next frame
- [ ] fresh Sweep no longer spawns buried inside the default cube
- [ ] Face → Sweep and Edge-loop → Sweep still use the selected source geometry position/orientation exactly


## Phase F — Array Tool Session — .416

- [ ] normal Object Active Tools shows one compact Array launcher, not permanent Array controls
- [ ] launching Array makes Array exclusively own Active Tools
- [ ] unrelated Object tools are hidden during Array preview
- [ ] Free / X / Y / Z endpoint constraints behave as before
- [ ] highlighted END copy remains directly draggable in the viewport
- [ ] Count remains Pencil-friendly and redistributes preview live
- [ ] Apply creates evenly spaced linked instances in one scene-history step and restores normal Active Tools
- [ ] Cancel removes preview without creating objects and restores normal Active Tools
- [ ] changing active object or leaving Object mode cancels Array preview safely


## Phase F — Array Tool Session ownership — .417

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
- [ ] Symmetry/Bisect Keep + / Keep −: retained side swaps correctly
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
- [ ] Symmetry/Bisect .433: Keep + / Keep − and Mirror remain live while the plane is moved
- [ ] Symmetry/Bisect .433: Apply welds mirrored geometry on the moved plane and Undo restores the source object in one step

- [ ] Symmetry/Bisect .434: while the Tool Session is active, Rotate changes the yellow plane and does not rotate the source object
- [ ] Symmetry/Bisect .434: Move continues to move the plane; Scale is disabled for the infinite plane
- [ ] Symmetry/Bisect .434: Free Rotate produces a true oblique cut/mirror, not just a rotated guide
- [ ] Symmetry/Bisect .434: X/Y/Z transform constraints rotate the plane around the chosen world axis; 15° rotation snap still applies
- [ ] Symmetry/Bisect .434: Apply/Cancel restores normal Object transform ownership

- [ ] Symmetry/Bisect .435: Align to Face arms a one-shot pick and tapping a source face moves/orients the plane to that face
- [ ] Symmetry/Bisect .435: Align to Face ignores touch navigation and uses Pencil/mouse for the face pick
- [ ] Symmetry/Bisect .435: Flip Plane reverses the plane normal in place and Keep + / Keep − responds predictably
- [ ] Symmetry/Bisect .435: after Align to Face, Move and Rotate continue to edit the plane and Apply creates the matching cut/mirror

- [ ] Transform Tool .436: select one editable object, start Transform, tap a face on another visible object and confirm the object centre snaps to the hit while +Y aligns to the face normal
- [ ] Transform Tool .436: Pencil/mouse drag in Move slides across the picked surface plane while touch still orbits/pans/zooms
- [ ] Transform Tool .436: a tap cycles Move → Rotate → Scale → Move without moving the object
- [ ] Transform Tool .436: Rotate spins around the target face normal and honours existing 15° snap; Scale works from the placement point
- [ ] Transform Tool .436: Cancel restores the exact pre-tool scene; Apply is one Object Undo step
- [ ] Transform Tool .436: linked objects retain shared geometry while placement remains independent through the existing instanceMatrix path

- [ ] Transform Tool .437: launch Transform and first tap chooses a source face on the selected object
- [ ] Transform Tool .437: second tap chooses the target face on another visible object
- [ ] Transform Tool .437: source face centre lands on the target hit point and source/target normals oppose, producing face-to-face contact without half the object intersecting the target
- [ ] Transform Tool .437: Move → Rotate → Scale tap-cycle remains unchanged after face-to-face placement

- [ ] Insert Tool .438: select one editable Object, launch Insert, pick a source face, then pick a target face on another visible object
- [ ] Insert Tool .438: the target pick creates a linked instance and leaves the original source object in place
- [ ] Insert Tool .438: the source face lands face-to-face on the target; Move → Rotate → Scale tap-cycle behaves like Transform while touch navigation remains normal
- [ ] Insert Tool .438: after Apply, component edits propagate between source and inserted instance while their Object placements remain independent
- [ ] Insert Tool .438: Cancel removes the temporary inserted instance exactly; Apply is one Object Undo step and Undo removes the insertion

- [ ] Mesh Health .439: default closed cube reports Closed · Clean with zero boundary/non-manifold/orphan issues
- [ ] Mesh Health .439: a valid open sheet reports Open · Clean rather than Issues Found
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

- [ ] Mesh Health .441: cube with one deleted face reports Open · Clean and enables Auto Close
- [ ] Mesh Health .441: Auto Close caps the hole with correct winding and immediately reports Closed · Clean
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
- [ ] Mesh Health .443: Triangulate converts cube quads to triangles while staying Closed · Clean
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
- [ ] Facegroups .456: Studio ↔ Facegroups switching remains clean
- [ ] Facegroups .456: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .457: first tap from Studio/Solid immediately shows facegroup colours without pressing Reseed
- [ ] Facegroups .457: first activation never renders the mesh near-black while geometry is unsynchronised
- [ ] Facegroups .457: persisted palette/Saturation/Lightness/Ungrouped settings apply on first activation
- [ ] Facegroups .457: switching away and back immediately restores colours
- [ ] Facegroups .457: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .458: first activation shows group colours without Reseed
- [ ] Facegroups .458: temporarily unsynchronised body remains normal material, never dark vertex-colour material
- [ ] Facegroups .458: pending body retries automatically and clears pending when colours apply
- [ ] Facegroups .458: switching Studio ↔ Facegroups remains clean
- [ ] Facegroups .458: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .459: grouped OBJ + Mirror X shows the same facegroup colour on source and mirrored descendant faces
- [ ] Facegroups .459: Mirror Y/Z and multi-axis Mirror preserve facegroups without colour mismatch/dark fallback
- [ ] Facegroups .459: inactive mirrored objects also show inherited Facegroup colours
- [ ] Facegroups .459: first Facegroups activation remains immediate without Reseed
- [ ] Facegroups .459: Inset, Edge Bevel, Vertex Bevel, Extrude and navigation remain unaffected


- [ ] Facegroups .460: grouped OBJ + SubD Preview preserves parent colours on all subdivided child faces
- [ ] Facegroups .460: SubD levels 1–4 preserve facegroup assignment consistently
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
- [ ] Workflow .483: 15° button ON snaps component Rotate to 15-degree increments
- [ ] Workflow .483: 15° button OFF allows smooth unsnapped rotation
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
- [ ] Regression .594: legacy Rotate retains existing 15° snap behavior
- [ ] Regression .594: Move adaptive soft detents unchanged
- [x] Automated .594: prepublish syntax/static regression 7/7 PASS
- [x] Protection .594: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Regression .595: Move floating exact entry remains working
- [ ] Regression .595: Rotate floating exact entry remains working
- [ ] Regression .595: Scale/Uniform floating exact entry remains working
- [ ] Workflow .595: gizmo Rotate soft catches work with legacy 15° snap ON
- [ ] Workflow .595: gizmo Rotate soft catches still work with legacy 15° snap OFF
- [ ] Workflow .595: gizmo Rotate catch releases when drag continues
- [ ] Workflow .595: gizmo Scale catches at useful ratios
- [ ] Workflow .595: gizmo Scale catch releases when drag continues
- [ ] Regression .595: legacy/non-gizmo Rotate retains existing 15° snap
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
- [ ] Workflow .600: GLB secondary action reads Save for Nomad…
- [ ] Workflow .600: GLB note instructs Save to Files, then Files Share → Nomad Sculpt
- [ ] Workflow .600: GLB share uses one real File with model/gltf-binary
- [ ] Workflow .600: saved GLB opens in Nomad from Files
- [ ] Regression .600: OBJ secondary action remains Share / Open In…
- [ ] Regression .600: normal Export / Save remains functional
- [x] Protection .600: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [x] Finding .601: direct Safari/Web Share -> Nomad closed as unsupported
- [ ] Workflow .601: GLB secondary action reads Save GLB to Files…
- [ ] Workflow .601: GLB note explains Files -> Share -> Nomad Sculpt
- [ ] Workflow .601: saved GLB opens in Nomad from Files
- [ ] Regression .601: OBJ secondary action remains Share / Open In…
- [ ] Regression .601: normal Export / Save remains functional
- [x] Protection .601: src/multi-object-transform.js?v=0.36.1.0 unchanged

- [ ] Workflow .602: gizmo Rotate has clearly noticeable soft catches
- [ ] Workflow .602: gizmo Rotate soft catches remain with legacy 15° snap OFF
- [ ] Workflow .602: gizmo Rotate does not revert to rigid 15° stepping when legacy snap is ON
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
- [ ] Workflow .605: repeated hold on last seed cycles only that seed Loop ↔ Ring
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
- [ ] Workflow .637: Inset follows the same sus…107294 tokens truncated…ers and Lab parents, recovery, protected Multi1.0 and retained
scalar resources/project codec/painter UI/core/paint target. Initial in-flight reads
served921; final complete checked graph matches922. No frozen/modelling/brush/
project/history/preview algorithms changed; same native image budget and raw guards.

All four continuity files current; this proof is docs-only. Build922 complete and
published. No new hands-on test needed: editable metalness controls/preview remain
next; export fixtures and actual File actions are automated, no rendered/native
appearance acceptance inferred. User920PASS remains protected; no921/922 devicePASS
invented. Next original scalar Pencil channel, then existing material preview owner.

## .923 — Metalness Pencil channel and existing lit material preview — 20 October 2026

Audit main f2cc8a38 / .922: scalar resources, codec/history/duplicate and native/GLB
writers already exist; expose them through original compact LEFT Paint and surface
owners. Shared scalar configuration reuses accepted raster, quota/checkpoint and
cancellation paths. Metalness starts black0, brush defaults255; opaque raw equal-RGB
working bytes publish independent linear R8 only. Colour/masks/images stay disabled
while editing either scalar; returning Colour restores existing controls/layers.
Non512 retained maps refuse painting rather than resampling. All identity/binding,
body lifetime, budget and checkpoint refusal rules retained.

Existing surface owns separate linear roughness G and metalness B textures; metal
factor1 with a map, default0 otherwise. Existing lighting/UVs/colour sRGB remain.
Live dirty uploads coalesce; switching Channel/Lit or scalars cancels contact without
history. Committed active/inactive/locked overlays use same owner; disposal frees maps.
No new brush/kernel/writer/history owner, lights, environment, or modelling changes.
Reverse loader/cache graph reviewed and pinned923; protected Multi1.0/frozen intact.
13 new integrations cover UI/raw0/255/opacity/no-op, cancellation, quota/checkpoint,
identity/stale/non512, history/SaveOpen/single+Multi Duplicate, actual NOM/GLB bytes,
linear B material, map independence/lifetime and active/inactive render ownership.
Existing roughness/mask nearby19PASS. Read docs/metalness-paint-923.md.

User920PASS remains protected; /nextbuild alone is not921/922/923 device acceptance.
DEVICE923: Metalness0/255 Channel/Lit, low Roughness highlights, independent channels,
Done/SaveOpen, UndoRedo and duplicate isolation; native Nomad material sanity check.
Next: respond narrowly to923 device feedback before adding more material channels.

.923 local validation: Node24.19.0 full **2,633 PASS / 0 FAIL / 0 skipped**;
13 new integrations, nearby roughness/mask19PASS and release contract5PASS.
No existing assertions relaxed; protected Multi1.0/frozen/modelling unchanged.
Publication/hosted regression/live-byte verification follows. Device923 pending.

## .923 publication verified — 20 October 2026 (Brisbane)

Runtime `e505f232856a7d6581368de7f7cf29e45cc514da`, tested tree
`342c4ca1282a98ab95abfe65a66bccdc311ac757`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39337186659` / job `118349490286` both pass
2,633 tests, zero failures/skips; complete hosted logs verified. Pages run
`39337186074`, deploy job `118349698451`, completed all steps successfully.
All19 fresh live files byte-match source: shell/version, every changed runtime/
export/parent/Lab file, recovery, protected Multi1.0, retained scalar resources/
metalness pool and project codec. Initial in-flight reads served922; final complete
checked graph matches923. No frozen/modelling/lighting/UV or writer algorithm changes.

All four continuity files current; this proof is docs-only. Build923 complete and
ready for hands-on Metalness0/255 Channel/Lit, low Roughness highlights and independent
channels, Done/SaveOpen, UndoRedo and duplicate isolation. Optional native Nomad
appearance sanity check. Actual GPU highlights/Pencil latency and923 device acceptance
remain pending; user920PASS protected, no921/922/923 devicePASS inferred.
Next: respond narrowly to923 device feedback before another material channel.

## .924 — UV workspace layers contained beneath main toolbar — 20 October 2026

User reports intermittent missing TOP-RIGHT MAIN APP buttons during UV Editor;
clarified these are Frame/UndoRedo/Focus/Objects/VIEW, not UV-local controls.
Audit main553ba061: no UV action deliberately hides the toolbar. Header stacking
context is10; viewport had no stacking context, allowing workspace180 to overpaint
header descendants (including VIEW dropdown200 trapped inside header10).
Add one active-UV-only isolation rule in original uv-workspace stylesheet: viewport
contains its own layers while visible workspace exists. Original header remains
above it; closing/hiding UV automatically removes containment. No z-index arms race,
DOM replacement, event/pointer/history/model/UV/paint algorithm changes. Refresh
UV workspace + Mesh Health loader and shell/recovery924; unrelated pins retained.

Source layering defect identified; exact intermittent iPad button disappearance
not reproduced. Cloud main WebGL creation fails (same known environment limitation),
so no full-app rendered acceptance claimed. Synthetic data-URL layout experiment
blocked by browser URL policy; no workaround attempted. Nearby workspace navigation/
history/lifetime/background/Focus + release20PASS. Initial prep contract caught an
over-broad shell pin replacement; restored unrelated pins before final validation.
No tests weakened, no user923PASS inferred; user920PASS and protected Multi1.0/frozen
remain. DEVICE: repeatedly enter/exit UV, pan/pinch/edit/UndoRedo, check top-right
buttons and VIEW dropdown while inside UV and after Back to3D. If disappearance
persists, obtain screenshot and exact trigger before more presentation changes.
Metalness923 device gate still pending. Next:924 device feedback, narrow repair only.

.924 final local Node24.19.0 regression: **2,633 PASS / 0 FAIL / 0 skipped**;
nearby UV/workspace/history/Focus/background/release20PASS. Final source contains
only active-UV isolation + reviewed loader/release pins; no assertions relaxed.
No rendered/device disappearance acceptance inferred; publication proof follows.

## .924 publication verified — 20 October 2026 (Brisbane)

Runtime `97a4d9e118e8a2bc71b66b90e393eec3818dc264`, tested tree
`0413e5a8253f822d93154f1e4d145b69f0bb97f6`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39338873374` / job `118355146518` both pass
2,633 tests, zero failures/skips; complete hosted logs verified. Pages
`39338872454`, deploy job `118355375163`, completed all steps successfully.
All16 fresh live files byte-match source: shell/version, UV workspace/Mesh Health
loader, recovery, protected Multi1.0, original header/toolbar/view CSS and owners,
painter, retained scalar resources/pool and project codec. Initial in-flight reads
served923; final checked graph matches924. No UV/model/paint/history/input algorithm
changes; only one active-UV CSS rule and reviewed release/cache references.

All four continuity files current; this proof is docs-only. Build924 complete and
ready for iPad retest: repeatedly enter UV Editor, pan/pinch/edit/history, use VIEW,
then Back to3D; confirm main top-right buttons remain visible and usable. Source
layering issue repaired; exact intermittent Safari disappearance still needs this
device confirmation. Cloud main WebGL unavailable, no full-app rendered proof.
If it persists obtain screenshot and exact trigger before further UI changes.
User920PASS protected;923 Metalness device gate still pending, no inferred PASS.

## Device feedback — .924 toolbar PASS; Metalness FAIL — 20 October 2026

User: “PASS for the fix.” Protect .924 main top-right toolbar visibility through UV
Editor; keep active-UV viewport isolation and original header/action owners intact.

Metalness is NOT accepted: user reports whole model black in Channel, white draws
black / black draws white, Lit paints black, and no metal channel in export.
Treat all reported symptoms as an open device failure; do not infer Metalness PASS
from the separate toolbar acceptance. No speculative inversion or resource migration.

Audit current009d45f3: slider forwards integer0–255 directly; scalar raster publishes
raw R8 independent of colour; Channel uses grayscale; Lit samples B with factor1;
existing native slot and GLB packed B receive captured metalness. Rerun actual UI/
painter/history/duplicate/preview/export suites:21PASS/0FAIL/0skip. Those fixtures
write255 white/0black and contain exact metalness in NOM/GLB, so they do NOT yet
reproduce user failure. Lit material/scene have no reflection environment; possible
dark-metal appearance contributor, NOT a confirmed diagnosis of all symptoms.
Cloud GPU limitation still prevents rendered-device reproduction.

Next required evidence: affected .boxlab project and its exported .nom, plus screenshot
with Channel/Preview selector and Value visible. Trace exact authored bytes/binding,
actual exported slot/factors and displayed preview before changing slider semantics.
Do not dismiss report because fixtures pass. Keep original owners; no parallel material
or brush implementation. Runtime remains924, no new build or new manual gate yet.

## .925 — painted metal Lit preview reflection input — 20 October 2026

User clarified with924 screenshots + METAL TEST.boxlab/.nom: Channel255 draws white
correctly; metal exports perfectly in Nomad. Smooth metallic patches turn black in
BoxLab Lit, including when Roughness0 is painted over metal. Prior suspected byte
inversion/export loss are superseded by concrete evidence. Decoded actual project
has independent512² colour and metalness; metal contains0–255. Actual native material
has color+metalness, metalness/factorMetalness1; exported grayscalePNG matches EVERY
project metalness byte exactly. Supplied project predates shown roughness edit; no
roughness map present in that snapshot, not proof of dropped roughness. Uploads remain
unmodified and are not copied into runtime/repository.

Root source omission: Standard painted metal had no scene/material reflection input.
Direct lights give narrow highlights; smooth metal can otherwise show black. Keep raw
0/nonmetal /255metal semantics and existing writers. Original surface/lifetime owner
now acquires a local room PMREM only for metallic Lit material with no existing scene
environment. Original Three179 RoomEnvironment + PMREMGenerator,128cube size, no HDR
network fetch, custom shader or added live-scene lights. Independent envMap per material
uses shared per-renderer/refcount pool; generator/room temporary assets disposed after
creation, render target freed exactly once after last surface. Channel holds accepted
unlit map, colour/roughness-only paths unchanged; explicit scene environment respected.
Source paint/UVs/history/projects and export factors/maps unchanged. No inverted-slider
workaround, source migration or scene-global lighting change.

3new regressions cover original surface binding of reflection+exact scalar channels,
Channel/Lit reuse/source preservation, colour-only/custom environment isolation,
multiple surfaces/reference lifetime, renderer separation and failed-generation retry.
Nearby new+roughness/metalness/export30PASS, release5PASS; full/publication below.
Cloud GPU cannot render actual main; fake target verifies ownership only, not GPU look.
Official API: threejs.org/docs/pages/RoomEnvironment.html and PMREMGenerator.html;
pinned installed Three179 source verified supports fromScene options.size.

User924 toolbar PASS protected; current runtime correction only painted material
reflection path and reviewed reverse loader graph925. Metalness authoring/exports
are confirmed by user clarification,925 visual acceptance pending. DEVICE: reopen
saved painted cube, Lit + Metalness255 and Roughness0, orbit; should reflect studio
panels rather than solid black. Compare Roughness255, Channel0/255, Done/reopen and
NOMAD export. Next respond narrowly to925 visual feedback before new channels.

.925 final local Node24.19.0: **2,636 PASS / 0 FAIL / 0 skipped**;
nearby30PASS and release5PASS. Actual supplied NOM/project metalness compared byte
for byte: identical. No test assertions relaxed; no source/user file modifications.
Protected924 toolbar and Multi1.0/frozen retained. Publication proof follows;
real GPU/925 iPad reflection appearance still pending.

## .925 publication verified — 20 October 2026 (Brisbane)

Runtime `597659e1889220b0a209c1028ec518cb526023c5`, tested tree
`760f3a6e749949ced660cf536d5ead98daff0829`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39362761751` / job `118432489899` both pass
2,636 tests, zero failures/skips; complete hosted logs verified. Pages
`39362761578`, deploy job `118432624041`, completed all steps successfully.
All20 fresh live files byte-match source: shell/version, new reflection helper,
original paint surface and every changed runtime/export/parent/Lab file, recovery,
protected Multi1.0, retained scalar/project owners and accepted924 UV isolation.
Initial in-flight reads served924/new helper404; final checked graph matches925.
Only painted material reflection behavior changed; native/GLB algorithms and source
scalar values retain exact accepted bytes. Supplied project/native files unmodified.

All four continuity files current; this proof is docs-only. Build925 complete and
ready for iPad Lit material metal255/roughness0+orbit reflection check, rough255
blur comparison, Channel0/255 and Done/SaveOpen. Existing Channel and native export
confirmed correct by supplied files/user clarification, not reversed. Real GPU
reflection appearance and latency remain device-pending; Node PMREM target adapter
verifies binding/sharing/lifetime only. User924 toolbar PASS protected.
Next:925 visual feedback, narrow fixes before further material-channel work.

## .926 — whole-object Tap Fill; requested brush roadmap — 20 October 2026

User925 feedback: reflections still not visible in BoxLab preview; Nomad export
“great” and protected.925 visual fix is NOT accepted. No further speculative lighting
change in926; preserve raw maps and correct native handoff. Need actual925/926 preview
version/state or renderer diagnostics before claiming another reflection repair.
User requests Tap to Fill, alpha compatibility, delete-paint/eraser, blur and smudge.
Clarified Tap Fill default WHOLE OBJECT, selected layer/channel, not island/flood region.
Audit existing raster/input/stack/history and prior Klecks integration audit first.

Original raster now shares exactly the same coverage/opaque/straight-alpha texel
operation for brush and fill. New Tool selector Brush / Tap fill · whole object.
Pencil/mouse down must hit visible selected mesh; whole512² selected layer/channel
previews at current opacity/value, release commits once via original finish/preflight/
checkpoint/COW. Size/pressure do not limit fill. Drag>8px, pointercancel/tool/channel
switch/body loss cancel; fingers still navigate, background contacts never fill.
Colour/image/hidden-layer/scalar eligibility guards retained; image colour remains
read-only, editable masks fill normally. No-op adds no history; quota/checkpoint
failure restores original resource/preview/navigation. No schema/writer changes.

4new integrations: exact shared raster coverage/alpha/no-op/cancel; actual UI layer
fill and source preservation/UndoRedo/SaveOpen/native PNG; independent scalar+mask
fill; mesh miss/finger/drag/cancel/settings/body-loss/checkpoint rollback. Nearby19PASS;
full and publication below. Original brush expectations retained, no frozen/Multi/kernel
changes. Reviewed shared raster/main+Lab reverse cache graph926 only.

Remaining requested brushes are accepted roadmap, not delivered buttons: eraser
(transparent overlays/masks; explicit Base reset semantics), alpha tips (bounded PNG
coverage/rotation with original brush), blur and smudge with UV-island/seam-aware
sampling so neighbouring atlas islands cannot contaminate unrelated surfaces.
No ABR import or general Nomad brush-format compatibility promised. Prefer audited
Klecks algorithms in existing raster/input/history over another painting engine.
Next narrow build: reflection diagnostic evidence plus eraser/alpha implementation;
keep blur/smudge scope bounded and test before exposing. No new material channel work.
DEVICE926: choose Tool Tap Fill, tap mesh with chosen colour; UndoRedo. Fill an overlay
at50% opacity; confirm underlying paint retained. Fill Roughness/Metalness0/255 and
check Channel/export independence; switch Brush and confirm normal Pencil strokes.

.926 final local Node24.19.0 regression: **2,640 PASS / 0 FAIL / 0 skipped**;
new fill4PASS, nearby19PASS, release5PASS. Initial preparation contract caught shared
Lab raster omitted from loader closure; complete main/Lab graph reviewed and updated
before final run. No assertions relaxed; protected Multi1.0/frozen/export retained.
Reflection925 remains user-reported unresolved, no lighting fix claim in926.
Publication and hosted/live verification follow.

## .926 publication verified — 20 October 2026 (Brisbane)

Runtime `3b01bce1d66b7a06b2286565811f5e67962ab91f`, tested tree
`e606147e30b8f86de7b009b25c31af536963edec`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39365018326` / job `118439759937` both pass
2,640 tests, zero failures/skips; complete hosted logs verified. Pages
`39365017500`, deploy job `118439889747`, completed all steps successfully.
All19 fresh live files byte-match source: shell/version, main painter/core, shared
raster and complete changed Lab session/loader graph, recovery, protected Multi1.0,
retained scalar/codec/native export/paint export/material/reflection/UV owners.
Initial in-flight reads served925; final checked graph matches926. No frozen,
modelling, project or export algorithm change; original brush semantics retained.

All four continuity files current; proof is docs-only. Build926 complete and ready
for Tool → Tap fill · whole object: tap colour fill/UndoRedo, overlay50% preservation,
scalar0/255 independence and return to Brush. Alpha tips, eraser, blur and smudge are
requested pending stages, not implemented. Reflection preview remains user-reported
unresolved despite925, no new lighting repair claimed. Nomad export confirmed great
and protected;924 toolbar PASS protected. Next:926 device feedback, narrow eraser/
alpha additions and evidence-led preview diagnosis through original owners.

## .927 — explicit scalar label rows and Eraser — 20 October 2026

User926PASS protects whole-object Tap Fill/opacity/history/channel workflow. Screenshot
identifies earlier metal white/black confusion as inline hint text joining readout:
“255Black…” / “0Black…”. No inverted bytes. Shared scalar controls now grid rows:
label + flexible slider + fixed3ch readout, then separate block hints. Explicit
0=non-metal(black)/255=metal(white); roughness0=smooth(black)/255=rough(white).
Help cannot sit beside numeric output. Compact LEFT dock/scroll/footer retained.
No scalar/data/export/light semantic change; reflection925 remains separate unresolved
report, not implied PASS from926 or this clarification. Native export protected.

Next requested narrow brush: original Tool selector gains Eraser. Same samplers,
pressure/size/hardness/maximum per-contact coverage and existing commit/checkpoint/
COW/pools. Transparent colour overlays reduce alpha only, retaining RGB/source/base;
Base resets white. Roughness resets255, Metalness0, masks reveal (raw0 if inverted,
255 otherwise). Original image colour stays retained/read-only; erase its mask.
No scene/material opacity, destructive image baking or deletion of layer/resource.
Colour controls disable for Eraser and restore on return; colour brush setting retained.
Cancellation/settings/body-loss/failed checkpoint retain original pixels/history.
Original Brush and accepted Tap Fill retain semantics; no new pointer/history owner.

3new integration tests cover alpha coverage/RGB/no-op/cancel; actual UI overlay/Base
isolation + UndoRedo/SaveOpen/exact composed native PNG; defaults/mask inversion/
scalar independence and refusal rollback. Existing fill/roughness/metalness/mask23PASS;
full/cache/publication below. Shared main/Lab raster reverse graph repinned927 only;
protected Multi1.0/frozen/modelling/UV/project/native writer unchanged.
DEVICE927: read Metalness0/255 hint below slider with no joined text; erase a painted
overlay to reveal lower paint, UndoRedo; erase Base/scalars, switch Brush/Fill back.
Alpha PNG tips next, UV-safe blur/smudge remain queued. Reflection diagnosis remains
open and should use device/version/renderer evidence, no further lighting guesses.

.927 final local Node24.19.0: **2,643 PASS / 0 FAIL / 0 skipped**;
3new eraser integrations, nearby23PASS and release5PASS. No tests relaxed.
Protected926 Fill/924 toolbar/native export/Multi1.0/frozen retained. Scalar mapping
unchanged; layout/device confirmation and Eraser hands-on gate pending.
Publication/hosted regression/live verification follows.

## .927 publication verified — 20 October 2026 (Brisbane)

Runtime `2fab3eb743d00acdfb93c053957ad1d9be8f6f68`, tested tree
`c97a8423f236aec542b314541b9a9529847b0413`, is published. Connected Git Data
created the identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39369984553` / job `118455433985` both pass
2,643 tests, zero failures/skips; complete hosted logs verified. Pages
`39369984116`, deploy job `118455588608`, completed all steps successfully.
All19 fresh live files byte-match source: shell/version, painter/core/shared raster,
complete changed Lab graph, recovery, protected Multi1.0, retained scalar/codec/native
and paint export/material/reflection/UV owners. Initial in-flight reads served926;
final checked graph matches927. No frozen/modelling/UV/project/writer changes.

All four continuity files current; proof is docs-only. Build927 complete and ready
for label separation/explicit0-255 meaning and Tool Eraser overlay reveal/UndoRedo,
Base white/scalar defaults and return to Brush/accepted Tap Fill. Actual iPad text
layout and Eraser feel remain device-pending; automated tests are not visual proof.
User926 Fill and924 toolbar PASS protected; native export correct. Alpha PNG tips
next; UV-safe blur/smudge pending. Reflection925 remains independently unresolved,
not a slider inversion or an inferred PASS from the corrected help text.

## .928 — Paint stays open across Undo/Redo — 20 October 2026

User .927 PASS protected: scalar hint layout and Eraser, alongside .926 Fill and
.924 toolbar. Requested history gesture fix takes priority over PNG alpha tips.
Audit: original main doUndo/doRedo restores scene/body and painter closes on disposal;
Paint footer also explicitly closed. Original history owner now brackets restoration
with painter preparation/resume. Cancel transient stroke/image before capture, close
old display, reopen on rebuilt active body; retain layer if present, channel/mask if
valid, Lit/Channel preview and existing brush/action/slider controls. No duplicate
history or gesture owner/checkpoint. Empty history and rapid repeated history retain
Paint; Done/other session/object changes defeat stale reopen. Original two/three-finger
gestures, toolbar and footer share this path. Five regressions execute original main
Undo/Redo and touch-end functions with real scene snapshots, paint resources and UI.
Reflection preview remains unresolved; native Nomad export remains correct. Alpha
PNG tips next, UV-safe blur/smudge pending. Device .928 acceptance pending.

- [x] .928: paint two marks, two-finger Undo then continue painting without reopening.
- [x] .928: three-finger Redo and Paint footer Undo/Redo keep channel/tool settings.
- [x] .928: Done still exits Paint; rapid history does not reopen a closed session.

.928 local Node24 full regression: **2,648 PASS / 0 FAIL / 0 skipped**;
five new history regressions and reviewed release contract5PASS. Protected Multi1.0
and frozen builds unchanged. Publication/hosted/live-byte verification follows.

## .928 publication verified — 20 October 2026 (Brisbane)

Runtime `6584f8d060dbbe8a52f901d814d655cece4209ba`, tested tree
`e554ccf0c77018eb4b3fd4134ab80f50a8bddd90`, published through connected Git Data
with the exact locally tested tree; fetched origin/main matched and working tree clean.
Local Node24 and hosted Node22 regression run `39373206187`, job `118465435842`,
both **2,648 PASS / 0 FAIL / 0 skipped**; full hosted log totals verified. Pages run
`39373205537`, deploy `118465573202`, completed successfully. All17 checked fresh
live files byte-match: shell/version, changed main/painter, recovery, unchanged paint
core/raster/scalar/project/export/reflection/UV and protected Multi1.0. Frozen builds
unchanged. All four continuity files current; this proof is documentation-only.

Build928 complete and ready for two-finger Undo / three-finger Redo while Paint stays
open, continued Pencil strokes, retained channel/preview/brush controls and original
Paint footer history. Done still closes. User927 PASS protected; actual928 iPad
acceptance pending. Reflection preview remains independently unresolved; native export
correct. Next bounded PNG alpha tips; UV-safe blur/smudge pending.

## .929 — PNG alpha brush tips; .928 user PASS — 20 October 2026

User .928 PASS protects Paint staying open across two/three-finger and footer
Undo/Redo, retained controls and continued Pencil strokes. Audit main5ee8bb54:
original shared raster/input/history already own brush and Eraser; no custom tip
importer/sampler. Add bounded PNG coverage through those SAME owners, reusing907
image preflight/decode. Brush settings: Load alpha PNG / rotation / Round tip.
PNG≤256²/256KiB, luminance×alpha coverage; white paints, black/transparent skips.
Owned R8 tip≤64KiB, copied per contact; top-first/aspect-preserving rotated bilinear
sampling in UV texels. Alpha replaces round hardness, original pressure/opacity cap/
source-over/erase/cancel retained. Whole-object Fill ignores tip. No new pointer,
history, paint-resource/project/native writer or modelling kernel. Tips/rotation are
session preferences, retained through928 reopen but not saved in.boxlab. Marks persist.
Late/invalid imports retain previous tip and committed work; original decode cleanup.
Read docs/paint-alpha-929.md. Four focused tests cover limits/cleanup/coverage ownership,
rotation/aspect/cancel/erase, real UI/history/project/native PNG and async refusal.
Original shared raster reverse main/Lab cache graph929 reviewed; Multi1.0/frozen intact.
Reflection preview remains unresolved, native export correct. Alpha device gate pending.
Next device alpha feedback, then UV-safe blur/smudge; viewport/baked AO and Edge-based
seam-authoring remain queued for existing-owner audits, not delivered features.
Validation/publication evidence follows; no rendered or device performance claim.

- [ ] .929: Brush settings → Load alpha PNG ≤256²; white paints, black/transparent skips.
- [ ] .929: rotate asymmetrical tip, paint/erase overlay; Undo/Redo stays in Paint.
- [ ] .929: Round tip restores circular brush; Save/Open and NOMAD retain painted marks.

.929 final local Node24.19.0: **2,652 PASS / 0 FAIL / 0 skipped**.
Four new alpha tests and original nearby18PASS; release/cache checks included.
No assertions relaxed. Shared raster main/Lab reverse graph929 reviewed; Multi1.0
and frozen builds unchanged. Publication/hosted/live verification follows.

## .929 publication verified — 20 October 2026 (Brisbane)

Runtime `c9f29fa240fa87a4a3310138058b1cc6f906e58a`, tested tree
`cafdf77c8cdcf612f411659ea1ff953b5ade692f`, published via connected Git Data.
All18 uploaded blobs and tree match locally tested source; fetched main identical.
Local Node24 and hosted Node22 regression39409570949/job118583708420 both
**2,652 PASS / 0 FAIL / 0 skipped**; full hosted logs verified. Pages39409570873,
deploy118583935503 completed successfully. All16 fresh checked live files byte-match:
shell/version, every changed runtime/Lab owner, recovery, protected Multi1.0,
retained image importer/export/paint surface. Frozen builds unchanged.

All four continuity files current; proof is documentation-only. Build929 complete
and ready for Brush settings → Load alpha PNG≤256²/256KiB, rotate/paint/overlay
Eraser, UndoRedo and continued painting, Round tip, SaveOpen/export retained marks.
User928PASS protected;929 visible/Pencil/picker/latency acceptance remains pending.
Reflection preview independently unresolved; native exports correct. Next alpha
feedback then UV-safe blur/smudge; AO and Edge seam audits queued, not implemented.

## .930 — solid Object-mode display, no modelling cage — 20 October 2026

User requests removing the distracting Object-mode X-ray, especially while painting.
Audit current6ce62fe3/.929: main addCage uses depthTest:false neutral axis-line material
for every selected Object edge, drawn over solid body/paint. Actual VIEW X-Ray is a
separate explicit diagnostic mode; do not confuse it with this automatic cage.
Original cage batch gets optional showEdges(defaulttrue); main passes false in Object,
showVertices remains Vertex-only. Surface cage geometry/batches are not allocated; isolated loose edges remain
visible with ordinary depth-tested edgeMaterial so wire-only objects do not vanish;
original invisible indexed edge/vertex picking proxies/bridge registry remain intact.
Mirror cage is also omitted in Object; active SubD no longer evaluates spare mirrored
base solely for that omitted wire. Original evaluated surface and its geometry cache
are unchanged. Vertex/Edge/Face restore their original cages and material/order/selection
semantics. Clean/Soft, Multi/group tints, gizmos, history, brush/paint/material/export
owners untouched. Explicit VIEW Wire/X-Ray modes retain deliberate user control.
No frame-rate or broad memory claim; removed visual cage draws/allocation only.

Two new native-owner tests cover Object↔component transitions, absent visual batches,
actual Three raycast proxy IDs/disposal, mirrored SubD base-call counts and exact solid
geometry. Existing810/851 Object visual-cage expectation replaced by new user request;
all component/proxy assertions retained. Existing850/809/812 render fixtures now supply their real selectionMode='face'
dependency;809 Object loose-wire material expectation follows the new depth-tested
policy, all component/geometry/metadata/enumeration assertions retained. No production
fallback or weakened cache/timing checks.
Focused cage/cache/timing/release29PASS and earlier paint-history/tint/cage24PASS.
Legacy809 loose-wire normalization inspects a CLONE: original loose edges() can add
its historical faces[-1] sentinel. Original source-preservation assertion retained.
Only main/cage batch and shell/recovery cache930; Multi1.0/frozen unchanged. Alpha929
manual gate not inferred PASS. Reflection preview independently unresolved; exports correct.
Next DEVICE Object orbit/paint no through-cage; component cages return; Multi/gizmo and
Paint UndoRedo stay intact. Then resume alpha feedback/UV-safe blur/smudge; AO/seams queued.
Full validation/publication follows; no rendered/iPad proof inferred from Node.

- [x] .930: selected Object stays solid without automatic through-mesh cage; orbit and paint.
- [x] .930: Vertex/Edge/Face restore cages; return Object hides them, including mirrors/SubD.
- [x] .930: Object Multi selection/gizmo and Paint UndoRedo/continue remain usable.

.930 final local Node24.19.0 regression: **2,654 PASS / 0 FAIL / 0 skipped**.
Focused native cage/cache/timing/release29PASS; original surface/proxy/metadata,
history/paint/alpha/image/native export assertions retained. Only superseded Object
visual cage and depth-tested loose-wire expectations changed. Multi1.0/frozen intact.
Publication/hosted/live verification follows; iPad display acceptance pending.

## .930 publication verified — 20 October 2026 (Brisbane)

Runtime `defbd5b79b89166aaef3a8e479ab09e6bce1df63`, tested tree
`d4234bfa273e1640ff515b9937f016f0849efb24`, is published. Connected Git Data
uploaded all13 exact local blobs/tree; fetched main has identical tested files.
Local Node24 and hosted Node22 regression39411220064/job118589175903 both pass
**2,654 tests / 0 failures / 0 skipped**; complete hosted logs verified. Pages
39411219467/deploy118589389324 completed successfully. All11 checked fresh live
files byte-match: shell/version, main/cage batch, recovery, protected Multi1.0 and
unchanged painter/raster/render/material surface. Frozen builds unchanged.

All four continuity files current; this proof changes documentation only. Build930
complete and ready for Object-mode solid orbit/paint without automatic through-cage,
Vertex/Edge/Face cage restoration, Object return and Paint UndoRedo/continued marks.
Loose wire geometry remains depth-tested; original picking/bridge/cache owners intact.
No measured FPS claim or rendered iPad acceptance inferred. User928PASS protected;
929 alpha gate remains pending. Reflection preview remains independently unresolved;
native exports correct. Resume alpha feedback then UV-safe blur/smudge; AO/seams queued.

## .931 — Blur within original polygon faces; .930 user PASS — 20 October 2026

User930PASS protects solid Object display/component cages and Paint/history. Audit
maina9f2a10d: original UV inspector owns islands, exporter owns triangle emission;
no neighbour brush exists. First Blur clips BOTH reads and writes to picked polygon
face; never samples adjacent atlas faces. Original preview builder gains opt-in frozen
triangle→source-face metadata from its existing emission loop (group order retained).
Default previews/export bytes unchanged. Painter requests map; new small filter-domain
raster labels original geometry,512²,2M scanned budget. Sampled interior overlaps,
out-of-tile/degenerate/unsupported UVs refuse atomically; ambiguous borders excluded.
No new triangulation/signature/UV editor/input/history/resource/writer owner.

Tool Blur · within face uses original raster, samplers, raycast and commit/rollback.
Fixed five-tap centre4/cardinal1 smoothing of stroke-start pixels; face-only reads and
writes, renormalized clipped weights. Maximum per-contact coverage/opacity retained;
lift/repeat for stronger smoothing. Same size/pressure/hardness/alpha tips. Transparent
layers use premultiplied RGBA filtering/interpolation to avoid hidden-colour halos;
scalar/mask raw values stay independent. Colour picker ignored/disabled. Base/layers/
masks/Roughness/Metalness work; retained image colour remains read-only. No across-face
or seamless/world-radius claim, no Smudge yet. Original scene checkpoint/COW/pools,
SaveOpen/NOM/GLB and Paint history928 remain; domain1MiB/session+1MiB/contact is transient.
Read docs/paint-blur-931.md. Five new regressions + nearby21=26PASS; release5PASS;
full/publication below. Complete changed main/export/Lab reverse loader graph931;
Multi1.0/frozen and accepted930 main/cage bytes unchanged. Alpha929 device gate not
inferred PASS. Reflection remains unresolved; native export protected. Next DEVICE
hard-edged mark→Blur brush/lift/repeat, overlay isolation, UndoRedo/continue, then
similarly bounded Smudge. AO and Edge-seam audits remain queued, not delivered.

- [ ] .931: hard-edged mark → Tool Blur within face, Size larger than mark, brush edge/lift/repeat.
- [ ] .931: overlay Blur keeps Base; mask/scalar Blur edits only selected target.
- [ ] .931: UndoRedo stays in Paint; return Brush, SaveOpen and native export retain results.

.931 final local Node24.19.0 regression: **2,659 PASS / 0 FAIL / 0 skipped**.
New Blur5 + nearby21=26PASS, release5PASS; no existing assertions relaxed.
Default export/preview geometry and accepted930 main/cage/protected Multi/frozen bytes
unchanged. Publication/hosted/live verification follows; actual iPad Blur gate pending.

## .931 publication verified — 20 October 2026 (Brisbane)

Runtime `0226dc19bdb401b4851bb9d84ee95acb8785b957`, tested tree
`ed0b12770fc595035fbfebd435d398ac77d59e97`, is published. Connected Git Data
uploaded all17 exact local blobs/tree; fetched main matches tested source.
Local Node24 and hosted Node22 regression39416319307/job118606105355 both pass
**2,659 tests / 0 failures / 0 skipped**; complete hosted logs verified. Pages
39416319079/deploy118606303731 completed successfully. All18 fresh checked live
files byte-match: shell/version, every changed runtime/export/Lab owner, new filter
domain, recovery, accepted930 main/cage, protected Multi1.0 and retained paint surface/
export/image projector. Frozen builds unchanged. No assertions relaxed.

All four continuity files current; this proof changes documentation only. Build931
complete and ready for Tool Blur within face on a hard-edged painted mark, larger
Size, lift/repeat for stronger smoothing; overlay/channel isolation and UndoRedo stay
in Paint, return Brush and continue. SaveOpen/native export retains results. User930
PASS protected; actual931 appearance/Pencil feel/latency and929 alpha gate pending.
No rendered/iPad performance claim. Reflection preview independently unresolved;
native exports correct. Next Blur feedback then protected Smudge; AO/seams queued.

## .932 — Connected-face Blur sampling; .931 user PASS — 20 October 2026

User PASS protects .931 Blur and prior .930 solid Object display. Audit main05a790e8:
original UV inspector already owns polygon edges, exporter owns triangle emission;
reuse both via optional edgeOwners and original vertex IDs. Default reports/geometry/
exports unchanged. New small read-only seam plan unfolds original triangle neighbours
across real manifold edges, mapping into detached/rotated/mirrored UV islands. Atlas
proximity never connects faces. Internal diagonals use the same original emission.
Fixed centre4/cardinal1 stroke-start blur now reads mapped connected-face texels.
Writes remain clipped to picked face: stroke BOTH sides of edge; brush footprint does
not wrap automatically. No world-radius/full seamless-footprint claim, no Smudge.
Boundary/nonmanifold/ambiguous corner/long walks clip; invalid/stale ownership and
existing overlapping/degenerate/out-of-tile/complex UV refusals stay atomic. Max8
crossings/sample and2M walk steps; lazy session plan512² labels1MiB+links4MiB,
temporary triangle map1MiB; owned contact copies5MiB plus original stroke buffers.
Premultiplied colour alpha, raw masks/scalars, capped coverage, original alpha tips,
input/raycast/history/COW/SaveOpen/NOM/GLB owners retained. UI says connected faces
and explicitly asks strokes over both sides. No modelling/UV authoring kernel added.
Five new tests cover 12 fold/rotation/mirror layouts, disconnected atlas decoy,
nonmanifold/stale metadata, exact raster alpha/cancel and actual UI→history→SaveOpen→
exact native PNG. Focused20PASS incl release5; full/publication below. Complete changed
reverse loader graph repinned932; retained main/cage/Multi1.0/frozen bytes unchanged.
Read docs/paint-seams-932.md. Device932 seam appearance/latency pending; alpha929 gate
not inferred. Reflection preview independently unresolved; native exports protected.
Next device feedback then bounded Smudge through original paint owner; AO and UV seam
AUTHORING remain queued. Seam sampling is not seam authoring.

- [x] User .931 PASS: within-face Blur, original Paint/history and .930 solid Object display protected.
- [ ] .932 device: paint different colours across a cube edge, Blur strokes over both sides blend connected faces despite UV split.
- [ ] .932 device: lift/repeat strengthens, Undo/Redo stays in Paint; Save/Open retains result.
- [ ] .932 device: base/layer/mask/scalar isolation, Pencil feel and first-Blur latency acceptable.

.932 final local Node24.19.0 regression: **2,664 PASS / 0 FAIL / 0 skipped**.
Focused20PASS; no existing assertions relaxed. Hosted/Pages/live verification follows.

## .932 publication verified — 20 October 2026

Runtime `5bac11821f49d7d47c6ed99cd90755c05fded102`, tested tree
`8a6f25d6e380442b8c2c7c89893d8f94d153404d`, is published on main.
Connected Git Data uploaded24 exact local blobs; fetched main matches tested tree.
Local Node24 and hosted Node22 regression39418615870/job118613691692 both pass
**2,664 tests / 0 failures / 0 skipped**; complete hosted logs verified.
Pages39418615854/deploy118613868578 succeeded. All22 fresh checked live files
byte-match: shell/version, complete changed runtime/export/UV/Lab loader graph,
new seam helper, recovery, accepted main, protected Multi1.0 and retained surface.
Frozen builds unchanged; no assertions relaxed. All four continuity files updated.

Build932 complete and ready for testing: paint different colours across a cube edge,
Blur strokes over BOTH sides, lift/repeat, UndoRedo stay in Paint, SaveOpen retains.
This connects sample reads across real face edges/UV seams; footprint does not wrap.
User931PASS protected; actual932 Pencil feel/appearance/first-use latency pending.
Alpha929 device gate remains independent. Reflection preview unresolved; native exports
correct. Next feedback then bounded Smudge through original owner; AO/seam authoring
remain queued. This proof changes documentation only, not the verified runtime.

## .933 — Surface image wrapping; user priority — 21 October 2026 (Brisbane)

User asks image placement to wrap connected surfaces rather than clip at one face.
Audit main36845450/live932: .912 On surface follows anchor/normal but feeds flat
orthographic .911 projector with75° facing/visibility cuts; no wrapping image owner.
Extend that original path; preserve separate Project from View. Extract existing932
read-only triangle graph into paint-triangle-graph.js; original UV inspector polygon
edges and exporter face/vertex metadata stay authoritative. Blur uses exact same graph,
existing sample walk unchanged. No duplicate adjacency/triangulation/modelling kernel.

On surface retains raycast triangle index with point/normal; Move updates all three.
Surface orientation still Insert's original helper. New paint-image-wrap.js carries a
local image chart over real manifold triangle neighbours, unfolding common edges with
world lengths and opposite-side third vertex; midpoint/centroid distance queue chooses
one route per triangle. Reconcile shared canonical vertex coordinates to avoid cracks
at local cycle closures; seed triangle pinned. Curved/closed patches necessarily stretch;
not a globally distortion-free spherical unwrap. Stops expanding outside image rectangle,
20K triangles/200K queue-pop cap. Boundaries/nonmanifold/disconnected components clip;
no coordinate welding or atlas adjacency. Original .911 UV raster/source alpha sampling,
overlap/tile/2M scan budgets and stack/pool/history/export owners remain. Wrapped samples
follow connected target surfaces round corners even when not front-facing/visible from
anchor projector; picked anchor still obeys original visible-target/occlusion hit guard.
Flat Project from View retains original75°/scene/self occlusion/30M ray-work rules.

Existing contact tangent guide remains planar; lift updates exact wrapped mesh preview.
Apply recomputes current candidate then commits ONE original checkpoint/COW. Cancel,
close, body loss, layer/target change and refusal preserve committed resource/history.
Source/raster retained together through original recipe/codec: no schema/budget increase.
Interactive wrap chart/anchor is transient, as912: Edit image→On surface repicks anchor;
old flat matrix alone cannot regenerate a wrapped chart. Saved pixels/native exports
retain exact wrapping; never auto-rasterize retained source from that matrix on Open.

Six new regressions: exact asymmetric pixels across flat/oblique/90° + mirrored UVs,
disconnected/nonmanifold exclusions, original view rules/stale anchor/UV refusal,
transformed frame/rotation/scale, actual UI drag onto another face/cancel/cycle→Apply→
history→SaveOpen→exact native PNG, sphere/denied checkpoint and shared-vertex continuity.
Focused image+seam25PASS and release5PASS; full/publication follows. Complete changed
reverse loader graph933, retained exporter/inspector/main/cage/Multi/frozen unchanged.
No932 device PASS inferred. Device933 wrap appearance/stretch/first-use latency pending.
Read docs/paint-image-wrap-933.md. Independent reflection preview unresolved.

Pending user requests explicitly retained: stronger Blur amount/radius separate from
opacity; image raster conversion/editable blur; Merge Down/Flatten with blend/mask
appearance preserved; staged texture/image/alpha resolution and layer-count choices
with memory budgets. Current512² painted maps,1024² sources,256² tips,base+3 overlays
unchanged. Smudge/AO/UV edge-seam authoring queued; this is image wrapping only.

- [ ] .933 device: +Image→On surface; place near cube edge, lift, orbit to see image continue onto adjacent face.
- [ ] .933 device: move anchor onto next face; tap-cycle Rotate/Scale, lift; image remains wrapped. Try sphere patch for acceptable curvature/stretch.
- [ ] .933 device: Apply→Undo/Redo, Save/Open retains wrapping; Edit image→On surface repicks; Cancel preserves committed image.

.933 final local Node24.19.0 regression: **2,670 PASS / 0 FAIL / 0 skipped**.
Six new checks + nearby19 =25PASS; release5PASS. No existing assertions relaxed.
Publication/hosted/live verification follows; actual iPad933 gate pending.

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

- [x] User .933 PASS protects connected surface image wrapping, next-face placement/Rotate/Scale, Apply/history/SaveOpen.
- [ ] .934 device: compare Amount1 versus32 on same painted mark (Undo between), Opacity100%; higher amount visibly softer/wider.
- [ ] .934 device: lower Opacity mixes less; Size changes affected area. First contact/max-Amount latency acceptable.
- [ ] .934 device: Blur over both sides of cube edge, Undo/Redo stays in Paint with Amount retained; continue painting and wrapped images remain intact.

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

- [x] User934PASS protects Blur Amount/Opacity/Size and original Paint/history, alongside933 wrapped placement.
- [ ] .935 device: select applied image→Convert to paint; appearance/placement unchanged, then Brush/Blur Amount edits it.
- [ ] .935 device: Undo edits then conversion restores Edit image; Redo returns converted paint, staying in Paint.
- [ ] .935 device: Save/Open retains converted paint; other image layers remain editable. Apply/Cancel staged placement before conversion.

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

## .935 user PASS / .936 resolution regression — 21 October 2026

- [x] User .935 PASS: image→paint appearance/Brush/Eraser/Blur, Undo restored source,
  Redo/SaveOpen editable pixels. Earlier .933/.934 and Paint-history PASSes protected.
- [ ] DEVICE .936: Paint → Texture resolution → Increase to1024×1024; existing marks
  retained; fresh fine strokes/newly projected image use sharper grid; Paint stays open.
- [ ] DEVICE: Undo→512 / Redo→1024; Save/Open retains1024, continued paint; export to
  Nomad preserves image placement and fresh marks. Test larger Size/Blur feel.
- [ ] DEVICE: Roughness/Metalness and mask/colour switching remain independent.
- Automated .936: exact owned2× colour/image/mask replication, retained source/settings,
  original one-checkpoint UI/history/continued1024 Brush+Blur/mask,512 scalar/material
  dimensions, committed display, three overlays, pooled scene transport/exact native PNG,
  predecode corruption/quota, staged/checkpoint/stale rollback. No iPad performance proof.
- Preserve old512 and opaquev1 quota tests; only layered1024 opts into new budgets.
  Existing source/tip/layer-count/file/native caps and UV/work guards remain active.

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

## .937 fresh1024 default — 22 October 2026

- User .936 reports pixelated image and fresh cube paint after refresh; NOT a PASS.
  Confirmed audit: .936 production default remained512, Increase opt-in was collapsed.
- [ ] DEVICE new cube: Paint shows Colour texture1024×1024 immediately, before paint
  or adding image; compare fresh fine strokes/new image, orbit/zoom and responsiveness.
- [ ] DEVICE Undo/Redo remains in Paint; Save/Open keeps1024. Existing512 project
  opens at512 with exposed Increase; existing pixels stay exact until explicit action.
- Automated .937 actual UI:1024 first-edit paint and image raster, no blank Open commit,
  first-stroke Undo/Redo/new-controller reopen, legacy512 one-step Increase, exact scene/
  native1024 PNG and512 scalar independence. .936 enlargement fixtures explicitly512;
  alpha checks use actual grid; scalar checks cover every display texel against raw512.
- Existing geometry/UV/paint/project/export/quotas and Multi/frozen contracts retained.
  Device sharpness not inferred from Node dimensions/pixel bytes; a1024 atlas is shared.

- .937 actual1024 three-layer painted Duplicate must Save/Open above32MiB through
  original File actions, exact resource bytes.96MiB high-res cap/32MiB legacy cap
  and over-cap/corruption/scene+history preservation checks remain active.

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

## .938 — colour merge regression / .937 protected PASS

- [x] User Perfect PASS .937 protects fresh1024 default/readout and paint/image detail; saved512 optional Increase retained. Independent alpha/reflection gates remain open.
- [x] Merge selected overlay plus all below through original compositor: exact pixels for all26 blends, masks and wrapped images; upper sources/order/settings survive.
- [x] Flatten preserves visible pixels, removes all overlays including hidden ones, and frees slots. Input/peer/scalar resources remain unchanged.
- [x] Original Paint Undo/Redo, Save/Open and actual native PNG preserve results; history restores original layers. Staged placement, stale sessions, checkpoint and quota refusal remain atomic.
- [x] Local full2697PASS/0FAIL/0skip; focused merge6PASS, reviewed release5PASS.
- [x] User PASS .938: Layer settings Merge to Base preserves appearance and frees expected slots; Undo/Redo restores layers.
- [x] User PASS .938: Flatten leaves Base only, + Layer works, Save/Open retains appearance.

## .938 publication verified — 22 October 2026

Runtime f441e92b0950f0e7b2ab1b46a8b67d9940a12396, tree
239a55d76de49ddf840fa19abcdbfbb351b262d8, matches tested local tree.
Hosted regression39699769504/job119565892975 succeeded; full job logs confirm
2697PASS/0FAIL/0skip, matching complete local run. Pages39699769015 build119565895457/
deploy119566078569 succeeded. All25 checked live shell/version, changed runtime/Lab,
recovery and retained core/main/Multi files byte-match tested source. Reviewed pins938;
protected main/cage/Multi/frozen unchanged. This proof updates documentation only.
User .937 PASS protected; .938 device merge/flatten/UndoRedo/SaveOpen gate pending.

## .939 — UV-ready object creation; .938 PASS protected

- [x] User .938 PASS protects Merge/Flatten/free slots/UndoRedo/SaveOpen. Earlier .9371024/readout/detail remains protected.
- [x] Startup/reset original unit cube gets six complete Box islands without extra history/geometry change.
- [x] Cube/Plane/Cylinder/Cone/Sphere use exact original Box/XZ/Cylinder/Sphere layouts at asymmetric/dense settings; ordinary scene projections still require checkpoints.
- [x] Actual Add defaults Generate UVs ON; OFF retains plain path/settings inheritance. UV ON uses plain Base settings. Staging/Cancel/refusal preserves scene/redo; one Undo/Redo carries exact resource.
- [x] Actual project transport and NOM/GLB output retain face-corner UV variants; startup cube opens production Paint immediately at1024 and Save/Open retains painted binding.
- [x] Torus/Text remain plain with visible explanation; special object launchers unchanged. Original stale/evaluated/linked guards retained; no auto-remapping old projects.
- [x] User PASS .939: refresh or Reset → Paint on cube without first projecting UVs; UV Editor shows six islands.
- [x] User PASS .939: Add Cylinder/Cone/Sphere with Generate UVs checked; inspect UVs/paint. Untick on another object to create without UVs.
- [x] User PASS .939: Undo once removes new UV object, Redo restores; Save/Open retains UVs/paint.

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

## .940 — Torus UVs regression; .939 protected PASS

- [x] User .939 PASS protects UV-ready initial/reset cube, Add UV choice/plain creation, painting, one-step UndoRedo and SaveOpen.
- [x] Round upright Torus grids3–32 across36 density pairs: every quad mapped once,1 island, both seams, full rectangle within tile; no geometry mutation.
- [x] Translated/Y-rotated/extreme scale/renumbered regular grids supported; deformed/tilted/nonquad/incomplete/unsupported/checkpoint failures retain metadata/history.
- [x] Original native scene projection/COW/no-op/UndoRedo/island edits and actual UV callback work; Add Torus checked/unchecked each one original checkpoint.
- [x] Expanded939 actual project/NOM/GLB retain Torus corner variants; immediate production1024 Paint/UndoRedo/SaveOpen/native PNG exact.
- [x] User PASS .940: Add Torus with Generate UVs checked; Paint works immediately, UV Editor shows one rectangular island.
- [x] User PASS .940: Add Torus unchecked, then Object→UV→Torus UVs (Y); Undo/Redo projection and Add behave correctly.
- [x] User PASS .940: Save/Open retains painted Torus and UV placement; optional Nomad export sanity.

Angular Torus mapping has inner/outer density variation. No tilted/deformed/general
unwrap or UV propagation through topology/modifiers; native linked guards retained.

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

## .941 — Smudge regression and device gate

- [x] User .940 PASS remains protected; all UV-ready creation/paint/history/persistence.
- [x] Analytical pickup/drag RGBA, independent Opacity, premultiplied alpha, no ink on tap/repeated position, owned cancellation.
- [x] Same original face reads/writes only; adjacent atlas islands excluded, face/miss pickup resets; alpha/raw grayscale retained.
- [x] Actual UI selected-layer isolation, Paint UndoRedo/tool retention, SaveOpen and exact native PNG.
- [x] Scalar/mask independence, original checkpoint/COW/cancel/miss refusal; invalid UVs refuse before navigation/history changes.
- [x] Bounded long stroke rolls back pixels/resources/history, releases capture/navigation and allows next Brush; event subdivision invariant.
- [x] User PASS .941: Smudge a hard colour patch outward on one cube face; compare low/high Opacity and no-motion tap.
- [x] User PASS .941: overlay Smudge, UndoRedo keeps Paint open, SaveOpen retains result. Face edges restart pickup.

Automated source tests do not establish iPad feel/latency/RAM. Cross-face Smudge,
AO and Edge-seam authoring remain queued; alpha929/reflection gates independent.

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

## .942 — connected-face Smudge regression / .941 protected PASS

- [x] User .941 PASS protects same-face Smudge/Opacity/tap/overlay/history/SaveOpen.
- [x] Original manifold graph only: frozen direct pairs,12 folded/rotated/mirrored layouts; nonmanifold/vertex-only/atlas decoy excluded, sources unchanged.
- [x] Exact premultiplied mean/Opacity/alpha across a pair, picked-face-only writes; no connected list retains original face-reset API.
- [x] Captured adjacency, strict invalid/sparse/oversize guards, misses/disconnected jumps and cross-face work-limit cancellation.
- [x] Actual continuous UI edge crossing, one Paint UndoRedo, SaveOpen and exact native PNG; raw scalar/mask isolation/checkpoint refusal.
- [x] User PASS .942: two cube faces visible, paint patch up to shared edge, Smudge across onto next face. Compare low/high Opacity.
- [x] User PASS .942: painted overlay, UndoRedo retains Paint/Smudge; SaveOpen retains cross-edge colour. Fine detail averages at transition.

Mean colour carry does not transport detailed patch orientation or wrap footprint
onto unpicked faces. Alpha929/reflection gates remain independent; AO/seam authoring queued.

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

## .943 — read-only object AO bake foundation — 22 October 2026 (Brisbane)

User .942 PASS remains protected. Audit found no existing AO baker. New
`src/paint-ao-bake.js` uses original preview triangle ownership/triangle graph,
original paint-filter-domain texel raster and Three Ray.intersectTriangle. The
filter domain optionally returns its existing transient triangle map; ordinary
brush callers retain exact return shape and allocations. No second triangulator,
UV rasterizer, adjacency, brush, history, scene resource or export owner.

Pure synchronous object-local bake returns owned linear R8 visibility and separate
coverage, UV-v0-first. White=unoccluded; uncovered texels white/coverage0. Deterministic
cosine-weighted hemisphere samples, double-sided same-object blockers, source winding
normal, normalized object-diagonal radius/bias. Size16–128/default64, samples4–64/
default16, radius .001–2/default.25 of diagonal. Conservative8M ray/triangle-test
preflight plus original2M UV scan cap; excess complexity refuses with no scene writes.
Normalized private graph points only; source mesh/UV/geometry remain unchanged.
No scene-neighbour, ground-plane, world-transform, rendered SSAO or albedo bake yet.
No main-app AO import/button/resource/persistence/export change or device-performance
claim. This intentionally low-resolution foundation is NOT a new paint resolution.

Five new regression tests cover opt-in exact ownership, white open plane/coverage/
determinism/copy isolation, facing blockers/radius/double-sided rays, supported scale/
translation/rotated UVs, stale/invalid/overlap/work refusals and source preservation.
Tiny1e-8 source fixture was rejected by the ORIGINAL preview builder before baking;
scale tests use accepted .01–1e8 geometry instead, no builder tolerance change.
Read `docs/paint-ao-foundation-943.md`. Main painter reverse loader chain + shell/
recovery pins943 reviewed; Lab/main/cage/Multi1.0/frozen algorithms unchanged.

Next: original Paint layer/history transaction for an explicit non-destructive AO
Multiply layer, with cancellation/stale/pool/checkpoint guards and visible controls,
then iPad appearance/latency testing. Do not imply AO UI acceptance from pure tests.
Alpha929/reflection-preview gates remain independently unresolved. No new AO hands-on
test exists in943; existing Smudge/Paint UndoRedo/SaveOpen remains the nearby baseline.
Validation/publication evidence follows; do not infer completion before verification.

- [x]943 automated: original texel/triangle ownership and ordinary brush shape unchanged.
- [x]943 automated: white open surface, occlusion/radius/double-sided blockers, deterministic owned bytes and no source writes.
- [x]943 automated: supported scale/translation, rotated UV placement; invalid/stale/overlap/work-cap refusal.
- [x]943 publication: local+hosted2725PASS, Pages success and20 exact live-file matches.
- No new943 AO device test: no AO controls exposed. Optional nearby942 Smudge/UndoRedo/SaveOpen sanity only.

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

## .944 AO layer integration

- [x] Same-face coverage transfer512/1024 excludes atlas neighbours; unoccluded surfaces white, gaps transparent, original sources unchanged.
- [x] Actual preview/Cancel no resource/history; Apply one original checkpoint, selected editable Multiply layer, independent peer/base/scalars.
- [x] Actual1024 UI Cancel/Apply; original Paint history, SaveOpen and exact native/GLB PNG retain appearance/layer data.
- [x] Full slots/scalars/masks/complexity/stale source/checkpoint/pool refusal keeps committed paint/history; failed Apply candidate can cancel safely.
- [x] Retained images remain source-editable; image/AO previews mutually exclusive; Done drops unapplied AO.
- [ ] DEVICE944 recessed UV mesh preview/Reach/Strength, Cancel/Apply and layer opacity/visibility appearance/latency.
- [ ] DEVICE944 Paint UndoRedo (select AO if Redo keeps Base), SaveOpen/native shaded export sanity.

User942PASS remains protected; no new AO iPad/Pencil/latency acceptance inferred from
Node geometry/material/DOM adapters. Original local-object64/16 bake/work limits;
plain convex cubes can be unshaded. Alpha929/reflection-preview gates independent.

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

## .945 higher-resolution AO / .944 PASS with quality exception

- [x] User944PASS protects AO workflow; poor/patchy appearance remains an explicit open issue.
- [x] Real256²/64-ray bake, finer shade levels and new thin-face coverage; no atlas-face contamination/source writes.
- [x] Quick64/16 async output byte-identical to old sync output; original8M/size guard tests retained.
- [x] Progress/cancel/pre-abort/invalid quality/128M refusal keep output atomic.
- [x] Actual painter busy Cancel/close/stale source/retry/pool/checkpoint and UI default/Done late-result suppression.
- [ ] DEVICE945 same recessed model Quick versus High, old AO hidden/deleted, same Reach/Strength: quality/patchiness and wait time.
- [ ] DEVICE945 Cancel DURING bake leaves no layer/history; retry Apply/opacity/UndoRedo/SaveOpen/native shaded output.

New quality gates remain pending. Medium/Quick fallback for complex work; no new
paint/source/scalar limits, schemas or light source. Old saved AO must be rebaked.

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

## .946 — paint / UV restart; .945 user PASS — 23 October 2026

User explicitly reports **945 = PASS**: protect higher-resolution AO and its existing
preview/cancel/apply/history workflow. This supersedes earlier pending945 notes;
no implication of perfect AO on all meshes or acceptance of unrelated open gates.

Audit main d0c1400: original UV projections and Pack all exist, no paint reset and
no general atlas unwrap. xatlas appears only in pathtrace dependency URL; Pack all
arranges existing islands and does not generate an atlas. Keep atlas unwrap as a
separate future narrow task through original UV/history owners.

Object → UV now exposes Clear paint (keeps UVs) and Clear paint + UVs (choose a
projection again). Both work with stale geometry/UV bindings without opening Paint.
All colour layers/masks/images/AO plus roughness and metalness resources detach in
one original scene checkpoint; shared resources/copies remain intact. No rebind of
old pixels, no geometry edits, no automatic discard on UV edits. Undo/Redo restores
exact resources/UVs. Reset is for independent BoxLab meshes; imported GLB materials,
linked/procedural/locked/reference objects are refused. Existing projection Base
restrictions remain. Viewport refresh uses original render-mode owner. Stale paint
errors now direct to Object → UV → Clear paint.

Four new946 tests cover all-channel stale recovery and reopen, actual UndoRedo/COW,
stale UV removal/reproject/repaint, blank native SaveOpen, no-op/refusal atomicity,
and original panel callback/render delegation. New manual gate: reproduce stale
paint → Clear paint → Paint; clear both → Box/appropriate projection → Paint;
UndoRedo reset and SaveOpen blank/repainted result. Atlas generation not shipped.
Release graph946 reviewed; Multi1.0/frozen files unchanged. Validation/publication
results follow; no946 device PASS inferred.

- [x] DEVICE945 user explicitly reports PASS; higher-resolution AO workflow protected.
- [ ] DEVICE946 Clear paint, clear paint + UVs, reproject/repaint, UndoRedo and SaveOpen.

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

## .947 — visual Paint layer stack; user946PASS — 23 October 2026

User reports946PASS: protect explicit undoable Clear paint / Clear paint + UVs,
stale-binding recovery/reproject and original resources/history. User now prioritizes
a Procreate-style layer list; atlas unwrap remains deferred, not implemented by Pack.
Audit current8c98072: all layer operations already belong to original Paint core and
UI controls; only dropdown presentation existed, no thumbnail/list owner.

Replace visible layer dropdown with compact top-first list in existing272px LEFT
dock:64px content thumbnails displayed40px over checkerboard, name, unique1–2-letter
blend code, opacity%, visibility toggle, selected blue row and image/mask labels.
Tap row to select; blend/opacity opens original Selected layer settings below list.
Original hidden select/visibility nodes remain event transport for original owners
and regression contracts, not duplicate visible controls. + Layer/+ Image remain
beside heading; image edit/conversion moves into selected settings. Original rename,
opacity, blend, order, delete, merge, flatten, masks and image actions retained.
Base visibility/blend/opacity stay immutable; scalar channels hide colour stack;
AO staging disables row edits. No new paint schema, budgets, history, compositor or
modelling owner. All original protected gestures/Multi1.0/frozen files retained.

src/paint-layer-list.js is presentation only; viewport painter exposes owned tiny
layerThumbnail snapshots of committed raw colour/alpha, before layer opacity/blend/
mask. Area reduction includes thin marks and alpha-weighted RGB, flips UVv0-first
rows for top-up previews, caches by immutable pixel identity using session WeakMap.
No full texture bytes exposed to DOM; no thumbnails serialized or history entries
for browsing. Updates after original Pencil release/actions/history reopen, clears
on close. Canvas thumbnails are content previews, not final composites or mask maps.

Five new tests cover all26 unique blend codes, alpha/thin/orientation/ownership,
actual UI row order/content/mask/rename/blend/opacity, visibility one checkpoint,
UndoRedo/reopen/SaveOpen, stroke Cancel and scalar/AO/close guards. Original905/906/
928 targeted19PASS. Headless Chromium rendering of actual markup/styles/list module
with fixture metadata verified no overflow at272px dock /1024 and390 viewport widths,
selection settings/visibility and screenshot inspection; real painter/history tested
through original integration harness, no iPad acceptance inferred. Screenshot is QA
fixture only; original app/session layout owners unchanged. Full/publication proof
follows. DEVICE947: layer taps/strokes/previews; blend/opacity/visibility; ordering/
image+mask selection; UndoRedo/SaveOpen and left dock scrolling/Done on iPad.

- [x] DEVICE946 user PASS: undoable native Paint/UV reset and stale binding recovery protected.
- [ ] DEVICE947 visual stack taps/thumbnail refresh/settings/visibility/order/UndoRedo/SaveOpen and dock scroll.

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


## .948 — committed colour lighting; .947 user PASS — 23 October 2026 (Brisbane)

User reports .947 PASS: protect visual layer selection/thumbnails, blend/opacity/
visibility, history/persistence and bounded LEFT dock. Continue requested repair:
colour-only UV paint/image/AO composites must rejoin scene lighting after Paint Done.
Audit main d17be438: original createCommittedPaintSurface only selected Standard for
valid roughness/metalness; colour-only intentionally stayed Basic. Studio shadow flags
were queued after material creation and could be copied too early. No missing light,
new rendering engine or second material owner is required for this specific defect.

Original committed surface now always calls its existing Standard material path for
valid channels. Colour remains exact sRGB albedo, white factor, default roughness1 /
metalness0; no scalar maps/resources invented. Stale scalar is omitted; stale colour
still refuses. Same original geometry/UV/lifetime and async identity guards. Studio
sets original body cast/receive flags synchronously before async surface creation,
so both active and inactive/locked paint replacements inherit shadows regardless of
digest/frame order. Existing Studio lights/rig/floor and reflection pool unchanged.
Paint Channel remains intentionally unlit while editing; Paint Lit preview unchanged.
Existing saved colour projects gain lit display on reopen/rebuild without migration,
resource/history/pixel/export changes. No new AO bake, general atlas unwrap or claim
that the older smooth-metal reflection report is resolved by this colour-only fix.

Four new integrations cover512/1024 exact owned sRGB pixels/UVs/shadow flags/disposal,
original Studio active+inactive/locked path BEFORE queued refresh, rebuild/diagnostic
cleanup, actual Paint Channel→Done→lit and exact Save/Open without extra history,
stale/replaced/body-loss suppression. Original920/923 colour-only Basic assertions now
require requested Standard fallback while retaining exact pixels and absent stale
scalar map; live Channel expectations remain Basic. Original904/909 committed display
checks retain exact pixel equality and now require private lit texture ownership, as
already used for scalar-lit surfaces. New+nearby paint/layers/scalar/
reflection/release30PASS. Full regression/publication evidence follows.

Reviewed entire surface→painter/render/export→Lab reverse loader graph948 and shell/
recovery keys; parent/export edits are cache pins only. Main930/cage/Multi1.0/frozen,
brushes/history/project/export algorithms unchanged. Actual GPU/iPad shadows and
appearance remain DEVICE948 gate, not established by Node material/texture tests.

DEVICE948: paint a UV cube in Colour only, Done→Studio, orbit for shaded faces; add
another mesh and switch selection, shadows/lighting remain on both. Reopen existing
painted .boxlab; compare lit display and paint unchanged. Paint Channel remains flat;
Lit preview/Done restore scene shading. UndoRedo remains in Paint; .947 layer list
remains accepted. Next narrow work follows948 device feedback; keep independent
alpha929/reflection gates and general atlas unwrap request visible.

- [x] DEVICE947 user PASS: visual layer stack/thumbnails/settings/visibility/history/persistence and dock scrolling protected.
- [ ] DEVICE948: colour-only paint after Done is scene-lit in Studio; active/inactive objects cast/receive shadows, Save/Open retains colour, Channel editing/UndoRedo/layer list unchanged.


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


## .949 — bounded Face atlas UVs; .948 user PASS — 23 October 2026 (Brisbane)

User PERFECT PASS948 protects committed colour-only scene lighting/Studio shadows,
active/inactive appearance, existing paint/layers/history/persistence and Channel/Lit.
Next audited deferred atlas request. Main e5bf44b3 has Box/Planar/Cylinder/Sphere/Torus,
density equalization and Pack all, but no joined-chart/general atlas solver. xatlas
is only an unused pathtrace dependency URL. No new external library/kernel imported.

Object → UV → Face atlas now stages ORIGINAL Box directional per-face projection,
ORIGINAL densityLayout with explicit one-island-per-polygon membership, then ORIGINAL
packedLayout. Only final corners commit through commitNativeUV: one native checkpoint,
read-only old/peer payloads, no source geometry/face-group changes. Repeat is an exact
no-op. Original projections/Pack/density math and Add automatic choices unchanged.

This is a FIRST bounded face atlas:1–128 planar polygons,≤20K corners, one island per
face, common average world-area density, existing .02 tile margins/gaps/grid packing.
It cuts every face boundary; it does NOT join charts, optimize packing, author seams,
or implement xatlas/general curved unwrap. Dominant-plane projection retains its
existing angular distortion; equal density fixes average area, not angle distortion.
Invalid/nonplanar/degenerate/over-limit and imported/procedural/modifier targets refuse.
This scope is visible beside the button, not hidden behind a generic Unwrap claim.

Any colour/roughness/metalness paint refuses BEFORE staging/history; UI disables Face
atlas with paint present and points to explicit existing Clear paint / Clear paint +
UVs. No silent paint discard, resampling or stale-resource rebind. Existing stale native
UVs can be replaced after clearing paint. Undo restores old UVs; paint reset remains a
separate undoable user action. Native codec, original Paint/Lit/SaveOpen/NOM/GLB owners
handle unchanged version1 source:boxlab face-corner payload. No schema/writer/history
or modelling kernel added; no automatic atlas on Add, no new UV pointer/UI owner.

Six new integrations cover concave/tilted/disconnected/subdivided planar faces,
non-overlapping separate bounds/equal average density/exact geometry,128-face limit/
scale/refusals, real original UndoRedo/idempotence/peer COW, explicit paint refusal/
clear/repaint, owner/history atomic refusal, exact native project/NOM/GLB UVs and
actual UV panel target/context callback. New+Box/Pack/density/reset/release30PASS;
no existing assertion changed. Full regression/publication follows; iPad949 pending.

Surface audit found Lab samples' old914 UV import absent from the reviewed cache
manifest. Added that REAL dependency and refreshed its samples→Lab→index ancestors,
alongside original MeshHealth/Add/Multi UV import graph949 and shell/recovery keys.
Only UV mapper + MeshHealth functionality changes; other source changes are pins.
Main930/cage/Multi-transform1.0/frozen/948lighting/paint/export algorithms unchanged.

DEVICE949: plain cube or small planar-faced extruded mesh → Object → UV → Face atlas
→ Open UV Editor: separate face islands inside tile. UndoRedo restores/reapplies UVs;
Paint/Done retains accepted948 lit scene. Existing paint: explicitly Clear paint first,
then Face atlas/repaint. SaveOpen and optional NOMAD retain new UVs/paint.128 planar
faces maximum; nonplanar faces require other projection or future chart unwrap.
Next:949 device feedback, then scoped atlas/chart improvements or Edge seam authoring
audit. General joined-chart unwrap remains queued; no automatic kernel replacement.

- [x] DEVICE948 user PERFECT PASS: committed colour-only lighting/Studio shadows and prior paint/history/persistence protected.
- [ ] DEVICE949: Face atlas on small planar mesh, Editor islands, UndoRedo, explicit clear/repaint, SaveOpen and retained948 lit appearance.


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


## .950 — Face atlas warped-face repair; .949 device FAIL — 23 October 2026 (Brisbane)

User949 reports the Equalize-density planar/non-degenerate error after ordinary
extrusions/scales. Screenshot confirms949 and24verts/20faces, far below128-face cap.
Exact supplied Extrude and scale.obj reproduces rejection: first four polygons are
mildly warped (point-to-plane deviations≈.010–.013 local units). This is949's atlas
planarity restriction, not evidence of damaged modelling topology or a stale build.
OBJ exporter header892 is the retained internal writer stamp, not shell release.
Exact input retained as tests/fixtures/extrude-and-scale-950.obj; SHA256
07178d51ab561392fa508624d088460f33b1da57ed87617ede4138c09272b46d, identical to upload.

Original Face atlas first tries EXACT949 planar path. Only its planar/area refusal
requests the ORIGINAL buildUVPreviewGeometry({faceIndices:true}) owner, forwarded
explicitly by MeshHealth UV callback. Original triangle→face/vertex metadata becomes
transient local-corner lists; no triangulator, new adjacency or mesh mutation. Require
complete n−2 triangles per polygon, valid unique corner ownership, finite nonzero UV
triangle areas and consistent per-face UV orientation. Folded/collapsed candidates
refuse with face number; absent/failed preview refuses. Temporary geometry disposes
in finally on success/error. Same original density math optionally sums measured
normalized 3D triangle areas; standalone Equalize density RETAINS strict planar rule.
Original planar outputs/extreme scales remain exact; no blanket tolerance relaxation.

Final atlas still uses original Pack/commit, one island per source face and one scene
checkpoint; source quads/ngons/positions/groups and old/peer resources remain intact.
No permanent triangulation or schema/export/history/brush/lighting changes. Original
128faces/20Kcorner/pool/history/clear-paint guards retained. UI no longer calls atlas
planar-only; says curved faces may stretch. This is still projected per-face atlas,
not joined-chart/general UV optimization or a guarantee every folded face maps.

Five new integrations exercise exact user file with20 separated equal-density islands,
unchanged24 vertices/14quads/6ngons, temporary disposal and exact repeat; ordinary
extrusion+axis-scale reproducer at .01/1/10000; original UndoRedo/Paint/exact SaveOpen/
actual NOM and GLB UV+paint slots; unavailable/malformed/folded preview/refused history/
paint atomicity; actual panel forwarding/target guards. Original949 negative unavailable
warped-preview test retained; its UI wording expectation follows intended scope change.
Original895 standalone nonplanar refusal stays active. Focused new/949/density/Pack/
release26PASS; full validation/publication follows. Native test prepares through ACTUAL
writer's versioned paint-export owner (module-local WeakMaps); canonical JSON handles
cross-realm UV prototypes without weakening exact values. Bitmap shim is transport
only, not GPU/Nomad visual proof. Main/cage/Multi-transform/frozen bytes unchanged.

DEVICE950: SAME supplied model → Object → UV → Face atlas → Open UV Editor should
map all20 faces. UndoRedo restores/reapplies original quads/UVs; Paint/Done remains
scene-lit; SaveOpen and optional NOMAD sanity. Clear existing paint explicitly first.
Exact uploaded mesh now maps in automated real-owner path; actual iPad950 gate pending,
not inferred PASS.948 scene-lighting acceptance remains protected;949 warped failure
recorded. Next actual950 retest; don't ask user to permanently triangulate a valid box
model as a workaround or add a second modelling/UV kernel. Other chart/seam work queued.

- [x] DEVICE950: user PASS /nextbuild protects supplied extrusion/scale atlas repair.949 original failure retained; optional native-export checks are not separately inferred.


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


## .951 — Optional Coplanar atlas; .950 user PASS protected — 23 October 2026

User replies PASS /nextbuild after950: protect the supplied extrusion/scale Face atlas
repair and existing948 lit-paint acceptance.949 original warped failure stays recorded.
Audit: existing Box projection already gives matching UVs on adjacent same-direction
faces; original imported-uv-inspection owns manifold adjacency/union; density/Pack and
native UV commit/history already exist. No other live chart-joining atlas found; the
pathtracer xatlas dependency is unrelated. Add optional Object → UV → Coplanar atlas.

Both modes share original private Box → density → grid Pack → ONE commit pipeline.
Face atlas retains one island per face and exact950 outputs. Coplanar mode uses fixed
seed planes (normalized finite coordinates, oriented normal/planarity tolerance1e-10,
no accumulated neighbour drift), leaving warped faces isolated. Original inspector
gets opt-in canJoinFaces predicate; default behavior unchanged. Join only opposite
shared edge directions, matching Box UV endpoints, same seed plane and exactly two
manifold owners. Disconnected/coincident vertex positions and ambiguous edges never
join. No mesh edits, new triangulator/adjacency kernel, persistent chart metadata or
UV schema. Original950 preview fallback handles warped area; standalone density895
still planar.128-face/20K-corner limit and explicit clear-all-paint prerequisite stay.
This is conservative coplanar grouping, not arbitrary unwrap or optimal packing;
invalid self-overlapping geometry and general curved stretch are not solved.

Six new tests951 cover connected patch/seam endpoints/island editing; bends/warps/
same-winding duplicates/opposite faces/disconnected positions/nonmanifold boundaries;
exact supplied20-face OBJ (14 islands versus Face atlas20), scale/translation and equal average island density/separate
packed bounds; guards/refused history; actual UndoRedo/paint/project/GLB owner path;
actual panel forwarding/current-target/history guards. Focused new/949/950/density/
Pack/release32PASS. Full local/hosted and publication evidence follows below.

Reviewed cache closure refreshes UV inspector/edit/panel, UV workspace, paint import
ancestors and UV/Add/Multi/Lab loaders; functional changes ONLY inspector opt-in,
atlas owner and existing panel. Main/cage/Multi-transform1.0/frozen bytes unchanged.
Device951 remains pending: same unpainted supplied mesh → Coplanar atlas → UV Editor;
compare Face atlas's20 islands; UndoRedo, paint across a flat patch and SaveOpen.
Next act on951 feedback; alpha929/metal-reflection gates remain independent. Do not
infer general curved unwrap, arbitrary overlap repair or optional NOMAD device PASS.

- [x] USER950 PASS: warped-face atlas repair accepted; protect exact supplied fixture and original950 behavior.
- [x] DEVICE951 atlas: user951 PASS recorded/protected. Separate intermittent iPadPro UV-editor/main-toolbar loss remains open; no full UI-loss PASS inferred.


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


## .952 — UV Editor layer/entry hardening; .951 atlas PASS protected — 23 October 2026

User951 PASS /nextbuild, with separate intermittent iPad Pro UI-loss report. Supplied
screenshot confirms951: workspace right section including Back to3D and main toolbar
buttons missing, while UV tile remains drawn. Do NOT treat atlas acceptance as UI-loss
acceptance or dismiss it because node tests pass. Original924 toolbar fix was accepted
but this is a recurrence with screenshot evidence; protect its header-above-viewport
intent. Exact intermittent iPad/WebKit compositor failure is NOT reproduced here.

Audit: no action intentionally hides main toolbar; workspace was a large absolute
canvas overlay inside WebGL viewport alongside backdrop/filter floating panels.
Only ORIGINAL uv-workspace changes: mount its one existing section beside viewport
under #app, use fixed viewport insets and header height variable with z9 below header10;
active-only viewport isolation retained via updated sibling-host selector (old nested
fallback retained for embedded/test host). Isolate/paint-contain canvas area; keep its
original canvas, controls, listeners and MeshHealth context/session/history callbacks.
Back to3D moves beside title; wrapping controls do not shrink out of short viewport,
workspace scrolls when needed. No force-GPU transforms, z-index escalation, duplicate
UI, modelling/UV/paint/history/navigation kernels or changes to original header owner.

Open measures immediately and again once on next animation frame after launch hides
source panel. Listen to visualViewport resize as well as window/ResizeObserver.
Close cancels queued frame and removes both resize listeners; existing capture/gesture/
image cancellation unchanged. Three new production-owner tests: real app/header/
viewport siblings and twelve open/close cycles using same nodes/actions; deferred and
visual resize pixel sizing/history neutrality/late frame/cleanup; CSS header ordering,
canvas containment, bounded overflow and single left-side exit. Original tests retained.
Cloud browser951 main fails WebGL context creation, so no full rendered or Safari/iPad
reproduction claimed. Repair addresses layer topology and entry sizing; iPad retest is
required before accepting intermittent disappearance as fixed.

Reviewed cache closure ONLY workspace → MeshHealth → shell plus recovery loader keys;
internal version stamps and unrelated951 UV/paint loader pins remain. Atlas950/951,
paint948, main930, cage930, Multi-transform1.0 and frozen snapshots unchanged.
DEVICE952: repeatedly open/Back to3D on iPadPro, verify full editor and main top-right
buttons/VIEW; pan/pinch/Pencil island edit and UndoRedo; return to3D then reopen.
Next follow952 UI feedback before further unwrap work; record exact repeat trigger if
loss persists. Other alpha929/metal reflection gates remain independent.

- [x] USER952 PASS — DEVICE952: repeated iPadPro UV entry/exit, editor/Back to3D and main toolbar/VIEW remain visible; pan/pinch/Pencil/UndoRedo and return/reopen.


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


## .953 — selected Edge Cut UVs; .952 user PASS — 24 October 2026 (Brisbane)

User952 PASS protects repeated UV Editor entry/exit, main toolbar/VIEW and island
Pencil/history workflow after sibling-layer hardening. Prior951 atlas PASS retained.
No new acceptance of independent alpha929 or smooth-metal reflection gates inferred.

Audit main6cb66f1c: original inspector already owns manifold adjacency/union and has
canJoinFaces; original UV editor owns Pack and native commit/history. No authored
Edge-cut command exists. Add Edge radial outer67.5° Cut UVs using current original
SelectionBridge edge indices, with all previous tool positions preserved. Same
MeshHealth module hosts the one-shot button; no new popup/input/history/kernel.

Native unpainted independent Base meshes with complete matching UVs only. Exclude
selected actual edges from ORIGINAL inspector connectivity, require each selected
continuous UV edge's owners to end in different components, then original grid Pack
and ONE native UV commit. Complete boundary-to-boundary cuts or closed loops split
charts; incomplete slits refuse the whole action. Existing seams/boundaries no-op.
Every unselected connection is verified unchanged before checkpoint. Coordinates
persist as ordinary native UVs, not seam flags or a new schema. Repack affects ALL
islands with one common scale; source polygons/positions/relative density untouched.
No conformal unwrap, new flattening, persistent seam marking or stitch command.
20K corners / original128 packed-island limits; ambiguous/nonmanifold/same-winding
selected edges, stale target/history failure refuse before publication. Any colour/
roughness/metalness paint refuses and points to explicit Object UV Clear paint.
No silent pixel discard/rebind or imported material remapping.

Six new integration checks cover complete cuts/closed loops, mixed partial refusal,
existing seams/boundaries, original pack/work/target/history guards, read-only peers,
unchanged geometry and unselected joins, actual scene UndoRedo/Paint/SaveOpen/GLB
roundtrip, actual Edge callback/current selection/render and radial one-shot wiring.
Old713/709 radial inventory now includes the new20th Edge action, retaining ALL old
IDs and cross-mode placements. Other runtime source changes are reviewed reverse
UV/Add/Multi/Lab cache pins and shell/recovery keys953 only. Workspace952/main930/
cage/Multi-transform1.0/frozen bytes unchanged. Full/publication proof follows.

DEVICE953: Add unpainted UV Plane with X density2, Y1. Edge mode select its centre
shared edge → radial Cut UVs. Object → UV → Open UV Editor shows2 separated islands;
UndoRedo restores/reapplies cut; Pencil island move affects one side. Paint after cut,
SaveOpen retains result. Repeat cut on same edge adds no history; painted targets
refuse until explicit Clear paint. Existing cube face boundaries may already be seams
and correctly no-op. For multi-edge paths select the whole cut, not an interior slit.
Next follow953 tactile feedback; arbitrary seam marks/stitch/general curved unwrap
remain queued through original owners. Keep952 UI-loss acceptance protected.

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


## .954 — screen-proximity Edge picking; supplied convex-edge report — 24 October 2026 (Brisbane)

User reports convex-position edges almost impossible to tap and newly flipped
edges becoming unselectable. Screenshot clearly952; current953 retains SAME main930
picker, so reproduced on current source, not dismissed as stale-shell behavior.
No953 Cut UVs PASS inferred. User952 UV-editor acceptance remains protected.
Exact uploaded Convex Edge.obj retained byte-for-byte at
 tests/fixtures/convex-edge-954.obj; SHA256
7822b8d3536771c3b5f80d73f3fac42110c385dd7a1723200d9e7a40c18778d4.
60vertices/84faces matches screenshot. Camera pose is not in OBJ; test cameras are
controlled reproductions, not a claim to recover exact screenshot view.

Audit: original main pickKindHits uses Three Line threshold .09 world units then
camera-distance order. On exact supplied geometry,12 chosen line midpoints ALL
select another camera-nearer neighbouring edge. Original proxy/display batching
and IDs are correct; no source topology/Flip kernel repair required. Selected-only
component-tap helper also greedily chose any selected edge within20px, even when
a different edge lay under the pointer. Pencil gate already delegates native pick.
Edge-paint owner independently used the old world-radius ordering.

Main's Edge-only branch now calls small read-only edge-screen-picking helper over
SAME rendered indexed line proxies,12 CSS pixels, screen proximity first, camera
depth for quantized quarter-pixel ties. Homogeneous frustum clipping before divide
and perspective-correct world interpolation; parent transforms and orthographic
cameras supported. No mesh.edges(), topology or source writes, cache/history/input
owner. Material.visible=false proxy convention retained; object/ancestor visibility
respected. Face/Vertex/Object ray paths unchanged. This is targeting, not a new
surface occlusion/back-face/Through-selection policy; no new hidden-surface guarantee.

Original selected-component Edge toggle now checks SAME native hit before removal;
unselected neighbours pass to main. Original Edge paint visible/through uses native
pickHits order and original dedup/first/all policy, retaining fallback for startup/
non-Edge fixtures. Same original listeners, propagation and gesture owners; no new
raw-pointer handler. Flip Edge geometry/history/radial/workspace/UV/paint/material
algorithms unchanged. New MAIN cache pin954 is intentional actual picker repair;
original main internal stamp and cage930/Multi1.0/frozen bytes remain unchanged.
Direct-bevel changes ONLY component-tap child cache key; shell/recovery/manifest
and reviewed main/child loader graph954. No blanket repinning.

Seven new integrations: exact supplied12 pre-repair failures→correct native pick;
ACTUAL original Flip Edge apply/rebuild/UndoRedo plus reselect new diagonal; scale/
projection/parent/DPR/12px bounds; clip/hidden ancestor/subpixel-depth behavior;
actual selected-toggle refusal/removal with no history; original Edge-paint native
event/visible/through delegation; real Pencil gate/paint owner release/cancel/finger
Orbit retention. Focused new+native Face/Vertex/floating-navigation/release38PASS.
Original assertions retained; full and publication evidence follow. Node Three/input
fixtures are not native iPad/WebGL rendered acceptance.

DEVICE954: SAME supplied mesh, deselect and tap circled edge and neighbouring white
edge; orbit/zoom and repeat. Flip eligible edge, deselect then reselect new diagonal;
UndoRedo keeps both geometry and picking usable. Try nearby multi-edge selection,
Pencil drag selection and finger orbit/pan/pinch without selection loss. Check953
Cut UVs separately when practical; no953 acceptance inferred from this bug report.
Next respond to954 device results before new seam/unwrap features. No topology
repair/triangulation workaround or forced cache-clearing needed for reproduced bug.

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


## .955 — coplanar Stitch UVs; .953 and .954 user PASS — 24 October 2026 (Brisbane)

User explicitly953PASS and954PASS /nextbuild. Protect complete Edge Cut UVs,
UndoRedo/Paint/SaveOpen and screen-proximity Edge targeting, Flip/reselect, selected
neighbour toggle/Pencil paint selection and finger navigation.952 editor UI acceptance
also retained. Prior pending953/954 notes below are historical, superseded here.
Independent alpha929/smooth-metal reflection gates are not implied accepted.

Audit main488e34ee: no stitch exists. Original inspector owns manifold adjacency and
island membership; original Box projection supplies a canonical plane mapping;
original coplanar seed grouping951, grid Pack and native commit already exist.
Add Edge radial outer112.5° Stitch UVs, with all prior positions unchanged. Single
current selected shared edge; original button/action host in MeshHealth and original
radial one-shot completion. No new popup/raw input/history/mesh/triangulation owner.

First stitch supports TWO islands on SAME oriented flat source plane, native/plain/
independent unpainted Base meshes only;128faces/20Kcorners. Existing current charts
must each match canonical plane coordinates under uniform similarity/reflection.
Moved/rotated/scaled/flipped charts supported; internally distorted/warped/bent/
non-coplanar charts refuse. Original lower-face chart supplies the fit; move the other
into its plane frame, snap common vertex-ID corners to ORIGINAL exact anchor values.
All shared boundaries between that pair join; no spatial welding, per-face topology
changes or saved seam flags. Original grid Pack then repacks ALL islands with common
scale and commits ONCE. Moving chart density/orientation matches retained chart before
Pack; untouched chart shapes/relative density retained. Final inspector must report
EXACT intended two-to-one membership, no unrelated merges/splits. Same-island joined
edge no-ops; an internal slit refuses, as no whole-chart join can repair it.

All colour/roughness/metalness paint refuses before staging/history, with explicit
Object UV Clear paint guidance. Original unsupported target/history/finite/collapse/
Pack guards retained. No general curved unwrap, cube-net unfolding, optimal packing,
arbitrary overlap repair or paint resampling. Native source:boxlab corner schema,
geometry, project/history/export owners remain unchanged. Canonical Box is transient
validation/alignment only, not a replacement live UV mapping or parallel kernel.

Six new integrations: Cut→Stitch exact endpoints/geometry/peer isolation/repeat no-op;
rotated/scaled/mirrored either chart and source scale/translation; unrelated island
membership; non-planar/distorted/boundary/ambiguous/refused targets and history/work
atomicity; actual UndoRedo/Paint/SaveOpen/GLB; actual Edge callback and radial launch/
puck restoration. Original953/954 semantic checks retained. Old713/709 Edge inventory
now21, retaining all previous IDs and shared cross-mode positions. Focused new/Cut/
picking/radial/release35PASS. Full and publication proof follows. ONLY UV edit,
MeshHealth callback and gizmo functionality change; other runtime changes are reviewed
UV/Add/Multi/Lab reverse loader pins955 and shell/recovery. Main954/picker954/cage930/
Multi1.0/frozen bytes unchanged. No953/954 acceptance lost during seam work.

DEVICE955: UV Plane X2/Y1 → shared Edge Cut UVs → select SAME edge → Stitch UVs.
UV Editor shows one joined island; Pencil move moves both faces. UndoRedo steps through
stitch/cut separately. Move/rotate/scale an island before stitching; same flat patch
joins/re-packs. Paint after stitch, SaveOpen retains result. Already-joined repeat
no-ops; curved/same-cube-corner faces or painted targets refuse without changing work.
Next actual955 device feedback before expanding stitch/general unwrap; preserve
accepted953 cuts/954 picking/952 UI and all protected navigation/modelling behavior.

- [x] USER953 PASS: Cut UVs / island editing / UndoRedo / Paint / SaveOpen protected.
- [x] USER954 PASS: supplied convex-edge selection / Flip reselect / navigation protected.
- [ ] DEVICE955: Cut then Stitch a flat UV Plane; island editing, UndoRedo and Paint/SaveOpen.

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


## .956 — bounded angle-based Auto atlas; 4096-face limit — 24 October 2026 (Brisbane)

User requests automatic connected-face stitching during atlas generation, a practical
face limit, bounded runtime, then suggests edge angle. Also asks whether named
.boxlab saves can overwrite existing Downloads files. No955 device PASS inferred;
953 Cut UVs/954 picking/952 editor acceptance remain protected.

Audit main393978b3: Coplanar atlas already joins flat charts through original
inspector adjacency + Box projection, but was labelled secondary and capped128faces;
Pack/density also128 with fixed2% gaps, and global plane seed search was quadratic.
Reuse SAME existing button/owner as primary Auto atlas (before explicit Face atlas),
add join angle0–30°/default15. API createCoplanarAtlasUV sixth optional angle defaults0,
preserving accepted flat outputs and manual955 plane grouping.0° = exact prior
coplanar policy. Positive angle requires BOTH adjacent average face-normal angle
and a fixed seed-normal cone within cutoff, opposite manifold edge directions and
EXACT original Box UV endpoints. No drift along curved chains, coordinate welding,
second triangulator/adjacency/history owner or calls to manual Stitch in a loop.

This is bounded projected-chart grouping, not conformal unwrap/relaxation or arbitrary
cube-net unfolding. Different Box directions remain seams; higher angle may stretch.
Warped faces stay separate at0°, may join in angle mode if original950 triangle/area
validation succeeds. No source polygons/positions/groups or persistent schema changes.
Original private Box → grouped density → Pack → ONE native commit retained. All paint
channels still require explicit Clear paint; unsupported/stale/history/work refusal
atomic. Explicit Face atlas retains one island per face and exact small outputs.

Atlas face cap4096 (32×128), original20K face-corner budget retained. Shared Pack all
and Equalize density support4096 islands so large atlas remains editable. Manual955
Stitch still has its independent conservative128-face scope. Original <=128-island
packing gap2% and exact output retained; larger layouts use gap .2/ceil(sqrt(count)),
outer margin2%, SAME deterministic common-scale grid search (at most4096 columns).
At4096 charts this is~3.2px gap on1024 maps; no larger texture resolution claimed.

Same plane/cone grouping owner now indexes seed buckets for >128faces: max81 bucket
lookups/64 seed candidates per face (27 lookups for positive angle), then ORIGINAL
strict seed tests. Overloaded buckets conservatively leave extra charts separate.
Small fixed-plane output path unchanged; no iterative stitching/relaxation/optimal
packer. Host smoke4096-face original Add Plane:15° Auto34.6ms,0°44.4ms,Face16.7ms;
these are single local CPU observations, NOT iPad latency or a timing promise.

Seven new integrations cover4096-face Auto/Face, exact joins/geometry/peer ownership/
repeat/one checkpoint; large Pack/density and reduced wasted UV area; warped fallback/
disconnected planes; limits/refusals; actual1024-face history/paint/SaveOpen/GLB;
primary existing UI/angle forwarding; exact same requested download filename twice;
and shallow/sharp angle thresholds, fixed-cone drift and256-face fast path. Existing
128-boundary refusal fixtures893/895/949/951/953 moved to4097 without dropping any
atomicity assertion; prior128 success tests retained.951 panel fixture explicitly0°.
Original other runtime algorithms retained; full and publication proof follows.

Save audit: projectFileName/exportBasicProject already request EXACT chosen name,
no appended counter. Safari/iOS Downloads collision naming is outside this download
API. Current MDN primary compatibility data records showSaveFilePicker unsupported
in Safari/iOS; Chrome's API documentation explicitly says anchor-download fallback
cannot overwrite. No risky replacement/hidden internal save/new filesystem feature
added. Existing Save/Open/codec unchanged; regression proves two identical requested
names. Sources checked24Oct2026:
https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/Window.json
https://developer.chrome.com/docs/capabilities/web-apis/file-system-access#polyfilling

DEVICE956: previously over128-face unpainted mesh → Object UV → Auto atlas15°;
check time and chart count. Compare0°/15° on shallow bends, sharper corners retain
seams; greater angles may stretch. UV Editor/Pack/UndoRedo; Paint and SaveOpen result.
New limits4096faces/20Kcorners, not unlimited. Next follow real iPad quality/latency
feedback before broadening unwrap;955 manual Stitch device gate remains separate.

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
