## .1046 â€” Metalness shading and stronger Smudge â€” device test pending

- [ ] Open UV Paint on a Studio object that has no painted Colour map; choose Metalness and paint a region. Confirm the surface keeps the original Studio colour and shading while the Metalness value changes.
- [ ] Tap Done. Confirm Studio colour, lighting, shadows and normal viewport display return. Re-enter Paint and confirm the painted Metalness values remain.
- [ ] Paint colour, then paint Metalness on a different region. Confirm both colour and metal response remain visible in Studio after Done.
- [ ] Smudge across two contrasting colours. Confirm the carried colour travels more strongly with the brush and blends into the target colour. Check a folded connected edge and avoid unrelated UV islands.
- [ ] Undo and Redo one Smudge stroke; confirm one step restores and reapplies it.

Automated .1046 validation: full Node suite 3,092 PASS / 0 FAIL / 0 skipped; focused Paint, Smudge, release and shell set 46 PASS / 0 FAIL. JS syntax and `git diff --check` pass. Coverage includes committed scalar material shading, Studio base colour/shadow flags, connected and rotated/mirrored UV Smudge, premultiplied alpha, work limits, cancellation, UI strokes, Undo/Redo, Save/Open and NOM pixels. Native iPad appearance and touch acceptance remain pending.


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

.734 user PASS. 51 focused pass; full1301/1024/277, no new failure names vs .734;
all281 source syntax pass. Native output parsed/validated locally; Nomad device
acceptance still required. No .nom import into BoxLab is claimed.
1. Align Vertex/Edge/Face, Move and Array buttons: X subtle red, Y green, Z blue;
   active state clearly stronger, disabled state/selection and gestures unchanged.
2. File NOMAD button replaces secondary Save GLB and explanatory note; filename
   uses name field + .nom; stays NOMAD when OBJ/GLB format switches.
3. Export a named multi-object scene with facegroups as Base, save/share to Files,
   open in Nomad. Inspect scene names, geometry/scale/quad topology/groups. Frame All
   if needed. Source BoxLab scene and Undo stack unchanged; hidden/reference omitted.
4. Repeat SubD/Mirror export; check displayed result in Nomad. Cancel saving safely;
   regular OBJ/GLB export still works. Rich GLB channels keep their previous workflow.
After device PASS, final Beta6 release smoke/freeze gate remains in checklist.

## .736 â€” NOM browser download/Open In delivery

User PASS .735.14 focused pass; full1302/1025/277 same failure names; changed syntax
and whitespace pass. Native NOMAD now downloads via anchor, preserving .nom name
and MIME, keeping URL60s. It must not call save picker/Web Share first.
- In iPad browser tap NOMAD, confirm ordinary browser download/preview. Open saved
  download then Open In/Share â†’ Nomad; check object names, geometry/groups unchanged.
- Check normal GLB/OBJ save/share and cancellation remain unchanged.
Actual Open In/app targeting controlled by iOS/browser, not guaranteed by website;
record device result before Beta6 freeze. No .736 device PASS inferred.

## Beta 6 frozen release â€” 2026-10-05

- [ ] /beta-6/ fresh launch shows .736, Focus armed; toggle reveals tool list.
- [ ] Frozen navigation, selection, Undo/Redo and Multi retain accepted behavior.
- [ ] Frozen NOMAD download opens in Nomad; regular GLB remains available.
- [x] Runtime snapshot equals accepted .736; relative assets/recovery stay isolated.

## Post-Beta 6 reliability audit â€” 2026-10-05

- [x] Reproduce full suite and inventory each failure (1302/1025/277/0 skipped).
- [x] Trace aggregate script subchecks separately (31 scripts /121 failed checks).
- [ ] Reconcile old version pins with current shell and protected intentional pins.
- [ ] Replace superseded source assertions with current semantic behavior coverage.
- [ ] Scope recovery sentinels explicitly; do not blanket skip to claim green.
- [ ] Repeat on CI Node22; expand runtime path triggers and validated release gate.
- [ ] Extend diverse Bevel chains, actual Knifeâ†’Loop and scene Undo/Redo fixtures.
See docs/reliability-audit-2026-10-05.md; audit makes no runtime changes.

## .737 test-contract baseline

- [x] Shell title/visible stamp/manifest agree; assets retain reviewed pins/bytes.
- [x] Missing/truncated/wrong pin, changed source, wrong order, stale shell rejected.
- [x]31 historical scripts expose333 namedcases; no original check silently removed.
- [x] .453 historical constraints run against exact accepted archival fixture.
- [x] Bootstrap survives10 stale reloads within frozen path; matching shell stays.
- [x] Actual Repeat delegates tool/value/face to current owner; invalid/busy rejected.
- [x] CI triggers allruntime sources/assets.
- [ ] Reconcile118 remaining active behavior/source checks; full suite still red.
- [x] Actual Node22 CI matches local1610/1492/118 and all118 failure names.
- [ ] Install validated release gate after reconciliation.
- [ ] iPad .737 Focus launch and normal edit/Undo smoke; modeller unchanged.

## .738 Boolean scene-history owner fixtures

- [x] Actual Object/Group Boolean apply captures scene before hide/create and
  checkpoints it after result activation; one scene Undo/Redo restores all objects.
- [x] Geometry/facegroups, linked transforms/origin, group labels/collapse state,
  settings, reference locks, active ID and selection survive history restoration.
- [x] Ineligible/refused/returned creation failure preserves original visibility
  and both history stacks (including existing Redo).
- [x] Join capture listener uses the installed Object history bridge.
- [x] Full1623/1507/116, zero skips; no new failure identities versus .737.
- [x] .738 Node22 CI37303253624 independently matches1623/1507/116/0 and all116 failure names.
- [ ] .738 iPad launch/edit/Undo/Redo smoke; runtime modelling owners unchanged.

## .739 selection hub and Bevel lifecycle fixtures

- [x] Component selection starts at puck; actual controller handles transform/tools/
  close, selection change/loss/reselection and semantic completion return.
- [x] Object full gizmo/empty Multi and Face suspension/resume retain current owner.
- [x] Active sessions/Align hide gizmo; lost selection stays hidden after completion.
- [x] Edge Extrude close disarms existing owners and preserves selected edges.
- [x] Actual Bevel session closes on mode/mesh/object change; background defers while
  busy, Cancel preserves launch selection; Face invalid context cancels via owner.
- [x] Full1653/1544/109/0 skips; seven old failures resolve, no new identities.
- [x] .739 Node22CI37304998451 matches1653/1544/109/0 and all109 failure names;
  Pages37304998035success and live .739 shell byte-verified. No device PASS inferred.
- [ ] iPad .739 Focus; Face puck/gizmo/radial/tool Cancel; Edge Bevel exitâ†’Pencil
  orbit, ordinary edit Undo/Redo. Runtime unchanged; no broad requalification.

## .740 contextual radial / Sweep routing fixtures

- [x] Actual corner callback opens tools in all modes; tools centre returns to
  component puck; same-selection suppression clears on selection change.
- [x] Generic target availability/active feedback, specialized session availability,
  locked-object guards and guided Edge Bridge exception execute current owner.
- [x] Actual Sweep semantic handlers accept Face/Edge; completion emits once with
  original mode; wrong modes/tools/unrelated end ignored; controls own visibility.
- [x] Full1669/1566/103/0; six old failures reconcile, no new failure identities.
- [x] .740 Node22CI37306258245 matches1669/1566/103/0 and all103 failure names;
  Pages37306257859success, live .740 version/shell byte-verified. Device PASS separate.
- [ ] .740 Focus/radial feedback; Face or Edge Sweep Cancel; Pencil navigation/edit
  Undo/Redo. Runtime unchanged; no broad device requalification.

## .741 scene OBJ round-trip reliability

- [x] Explicit g reset before first ungrouped face isolates prior-object group state.
- [x] CR/LF facegroup names cannot create extra OBJ geometry/object records.
- [x] Base/SubD/Mirror/plain multi-object round trips preserve evaluated geometry,
  winding/quads/groups/names; global indices valid; empty objects do not offset.
- [x] Sources unchanged; real facegroups retained, no synthetic object-name groups.
- [x] Full1679/1577/102/0, no new failures; one obsolete assertion reconciled.
- [x] .741 Node22CI37307745974 matches1679/1577/102/0 and all102 failure names;
  Pages37307745660success; live shell/version/5changed assets byte-verified.
- [ ] Export named grouped+ungrouped objects, reimport OBJ (Base and SubD), inspect
  separation/groups; normal GLB/NOM handoff remains usable.

- [x] Shell/integrity guard share the same refreshed Quick OBJ URL; changed parent
  pins and all five reviewed hashes verified. Final export-focused38PASS.


## v0.36.18.742 â€” negative Extrude side breakout / polygon preservation

- [x] Supplied four-band overlapping source reproduces despite old closed-health check.
- [x] Recovered pre-cut cage from actual source sidewall endpoints; original retained.
- [x] Finite prism subtraction removes side strips, preserves caps/volume/winding.
- [x] Rectangular band/inset/corner/rotated fixtures produce0triangles; boundary
  subdivisions retained for conformity, no arbitrary all-quad guarantee.
- [x] Full cuts remove caps/disarm; positive connected-miter route retained.
- [x] Actual Face preview/commit/cancel/replay/selection; one Undo/Redo; source,
  groups/creases/loose data and refusal redo stack retention covered.
- [x] Exact synthetic event path now uses press origin; smallnegative/positive/zero
  covered; physical Pencil8px modelling threshold preserved.
- [x] Accepted old corner/Loop/Knife Through source fixtures pass finite cutter.
- [x] Add actual splitter creates two children + crease inheritance; real Three
  boundary-line ray picking selects each child independently. User issue unconfirmed.
- [x] New27PASS, focused53PASS, full1706/1604PASS/102FAIL/0skip; no new failures.
- [x] Actual Node22CI37463033743/job112267082488 matches1706/1604/102/0
  and102failure names; Pages37463032493success; live shell/version/two changed
  modules/before+correctedOBJ/Beta6 version byte-verified.
- [ ] iPad four-band inward cut: side strips disappear, clean cage/no flicker.
- [ ] iPad shallow/full cut + Undo/Redo + negative Exact/Repeat + positive Extrude.
- [ ] iPad Add Vertex: exit Add, Edge mode, select both halves independently.

Use tests/fixtures/negative-extrude-742-before.obj or Undo the old extrusion first.
Already overlapping old output is not automatically repaired by this build.


## v0.36.18.743 â€” single Face negative-cut owner

- [x] User PASS .742 multiple-region cuts; single-face screenshot issue reproduced
  with both actual loaded handlers, not inferred from isolated-kernel tests.
- [x] Legacy takeover without ownership capability reproduces52triangles.
- [x] Explicit closed Extrude ownership prevents fallback planning/arming.
- [x] Actual window-before-document capture route, cancellation and event stopping.
- [x] Single shallow/deep/Through0tris, exact volume/caps, one Undo/Redo; Cancel
  preserves source/selection/redo; Multi unchanged; ownership tool/mesh scope.
- [x] Seven new tests and focused64PASS.
- [x] Full1713/1611PASS/102FAIL/0skip; same102 failure identities as .742.
- [x] Actual Node22CI37544260019/job112544354430 agrees counts/all102names;
  Pages37544259082success; live shell/version/3changed assets/Beta6 byte-verified.
- [ ] iPad one band shallow recess and full Through: no diagonal mesh fragments.
- [ ] Next single cut + Undo/Redo; two selected bands remain clean.

Undo old triangular cut or use negative-extrude-742-before.obj first.


## v0.36.18.744 â€” Bevel / Knife / Loop combinations

- [x] User PASS .743 stronger single/multiple negative Extrude.
- [x] Add Vertex explicitly deferred to watch list; no runtime fix claimed.
- [x] Bevel1/3segmentsâ†’Loop1/3cuts at every seed: closed shell, unchanged volume.
- [x] Actual Knife releaseâ†’Loop preserves existing subdivisions; reverse order.
- [x] Single/multiple Slide, History Undo/Redo; groups/creases; ordinary cube placement.
- [x] Coincident disconnected shells remain separate; no new triangulation.
- [x] Full1726/1624PASS/102FAIL/0skip, same102 failure identities as .743.
- [x] User PASS .744 Bevel/Knife/Loop combinations2026-10-07.
- [x] iPad Bevel an edge, then Loop nearby: no crack at the bevelled polygon.
- [x] Knife across a face, then single/multiple Loop and Slide nearby.
- [x] Undo/Redo each stage; selection/tool exit and navigation remain comfortable.
- [ ] Follow-up Bevel-after-Loop eligibility refusal and Bevel group provenance.

- [x] .744 Node22CI37552628205/job112571439435 matches counts/all102failures;
  Pages37552627347success; live shell/version/two changed modules/Beta6 verified.


## v0.36.18.745 â€” Bevel after Loop/Knife / facegroups

- [x] Mixed endpoint corner cap reused; all20Loop edges bevel1/3segments.
- [x] Knife releaseâ†’Bevel; rounded perimeter shared profile avoids duplicate caps.
- [x] Full polygon normals; shared-edge winding including rotated/translated cages.
- [x] All6bevel engines keep source groups; uniform-generated groups/mixed null.
- [x] Actual Edge/Face preview Apply/Cancel/drag Cancel; one Undo/Redo with groups.
- [x] Failure/null/exception/third-owner rollback includes topology/groups/loose data.
- [x] Repeated Loop/Bevel/Knife history; bevelled OBJ groups round-trip.
- [x] Inset and shell share one bootstrap745 URL; refreshed import-only Face parent.
- [x]29newPASS, focused103PASS; full1755/1653/102/0, same102failure names as .744.
- [ ] iPad Loop-cut cube â†’ Edge Bevel near a corner: chamfer then rounded profile.
- [ ] Knife â†’ Face/Edge Bevel; facegroup colours/export retain sensible labels.
- [ ] Cancel preview, Undo/Redo repeated edits, return to selection/navigation.

- [x] .745 actual Node22CI37568114774/job112620395437 matches counts/all102names;
  Pages37568114308success, live shell/version/all13src/Beta6 bytes verified.


## v0.36.18.746 â€” uploaded bevelled cage / horizontal Loop

- [x] Exact31vert24face source retained; native edge0 refusal and partial paths found.
- [x] All13vertical seeds complete7face closed strips; no triangles/volume change.
- [x] Single3positions; multi2/3/8; level Slide; original vertices/groups/creases.
- [x] Actual715commit retains rail selection, one Undo/Redo; rotated source.
- [x] Nonplanar/open/vertex-hit fallback refuses unchanged; native cube unaffected.
- [x]15newPASS/focused63PASS/full1770/1668/102/0, same102failure identities.
- [x] User big PASS .746: original LOOP CUT.obj horizontal Loop at red-line height.
- [x] .746 user PASS: Slide/EXACT, repeat/multiple cuts; no crack/triangle fan.
- [x] .746 user PASS: Undo/Redo, selection and navigation.


### .746 publication verification

Runtime commit 48595c3d767dc99b34458b1c6c9793070d53a461 published. Actual Node22 CI run 37585236460, job 112673733525: 1770 tests, 1668 PASS, 102 FAIL, 0 skipped; all 102 failure names match the recorded baseline. Pages run 37585235717 succeeded. Live index, version, Drawer loader, Loop addon, original OBJ fixture and Beta6 version byte-match main. Focused 63 PASS; device .746 acceptance remains pending.


## 2026-10-07 â€” v0.36.18.747 supplied-cage combinations / Bevel winding guard

- User â€œbig PASSâ€ .746; Add Vertex remains deferred.
- All67eligible cage edges after polygon Loop bevel1/3segments cleanly; actual
  Knife on every quad and repeated Loopâ†’Knifeâ†’Bevelâ†’Loop preserve exact history.
- Existing watertight guard accepted injected reversed face with two edge owners.
  Check opposite shared-edge winding for initially closed oriented inputs; restore
  full mesh metadata and expose existing error on failure. No current engine defect
  claimed; open/already inconsistently oriented inputs retain prior routing.
-7newPASS/focused69PASS; full1777/1675PASS/102FAIL/0skip; same102identities.
- Guard only runtime edit; bootstrap/Inset/Face import-only cache chain747. Four
  reviewed hashes/pins; protected Loop715/main/Multi/frozen betas untouched.
- Publication verification pending; .747 device acceptance pending.

- [x] User PASS .747: supplied cage Loop â†’ Knife â†’ chamfer/rounded Bevel.
- [x] .747 user PASS: Cancel preview, Undo/Redo and nearby Loop.
- [x] .747 user PASS: selection/puck and navigation.


### .747 publication verification

Runtime fd498652f9339c3df639e8bb5ea276ebd980875f published. Actual Node22 CI37594432292/job112703460695:1777tests/1675PASS/102FAIL/0skip; all102failure names match baseline. Pages37594431221 success; live shell/version/guard/bootstrap/Inset/Face loader and frozenBeta6 version byte-match main. Focused69PASS. Device .747 acceptance pending.


## 2026-10-07 â€” v0.36.18.748 partial-chain Bevel through four-way vertices

- User PASS .747; Add Vertex remains deferred.
- Actual prior multi-chamfer rejects consecutive7/35 or7/35/42 on supplied loop
  cage. Existing engine extended to one open nonbranching strip chain, four-valence
  straight-through internal vertices and one-selected-edge endpoints.
- Directed local one-owner boundary rings supply complete end caps, preserving
  rounded subdivisions. Chamfer two triangular end caps are necessary geometry;
  rounded caps are polygons. Existing groups/creases/loose remapping retained.
- Four-way turns/branches remain safe refusal; complete loops retain dedicated
  engine. Early widening accidentally routed complete rings to connected engine;
  existing semantic tests caught it, fixed by explicit connected-open-chain gate.
-10newPASS/140partialpaths; focused120PASS; full1787/1685/102/0, same102identities.
- Multi-chamfer runtime only; bootstrap/Inset/Face import-only chain748, guard747;
  reviewed4hashes/pins; main/Loop715/Multi/frozen betas untouched.
- Node22/Pages verification and device .748 acceptance pending.

- [x] User PASS .748: partial2â€“3edge Loop chains Bevel1/3segments.
- [x] .748 user PASS: Cancel/Undo/Redo, Knife and nearby Loop.
- [x] .748 user PASS: complete-loop Bevel and selection/navigation.


### .748 publication verification

Runtime ac7ef2c96274dbd4a96a929c595f3fb0a7fad159 published. Actual Node22 CI37609372174/job112752603609:1787tests/1685PASS/102FAIL/0skip; all102failure names match baseline. Pages37609371712 success; live shell/version/multi-chamfer/bootstrap/Inset/Face loader and frozenBeta6 version byte-match main. Focused120PASS. Device .748 acceptance pending.


## 2026-10-07 â€” v0.36.18.749 Knife diagonal validity / transactional rollback

- User PASS .748; Add Vertex remains deferred.
- Actual prior Knife release on U-notched planar face creates exterior diagonal3/6,
  two faces and one history entry. Topology-only mesh splitter unchanged.
- Knife validates proposed chord in source plane: reject outside/vertex-hit/boundary
  sliver/nonplanar cuts, keep valid concave cuts. Source-relative projection/tolerance.
- Catch failures/exceptions with vertices/faces/groups/creases/loose restoration;
  invalid edge-snap splits retain source and redo. Actual gesture/snapping unchanged.
-10newPASS/focused89PASS; full1797/1695PASS/102FAIL/0skip, same102identities as748.
- Knife body only; shell/directKnife/recovery749, all other loaded pins retained;
  one reviewed hash. main/Loop715/Multi/frozen betas untouched.
- Publication/Node22/live verification and device .749 acceptance pending.

- [ ] .749 normal Knife after Loop/Bevel; valid strokes retain feel.
- [ ] Concave notched face: outside chord refuses, inside chord succeeds.
- [ ] Undo/Redo and selection/navigation remain accepted.


### .749 publication verification

Runtime df89e43581f82d325d9431b31e23191cacd3489b published. Actual Node22 CI37619318589/job112785293117:1797tests/1695PASS/102FAIL/0skip; all102failure names match baseline. Pages37619317487 success; live shell/version/Knife and frozenBeta6 version byte-match main. Focused89PASS. Device .749 acceptance pending.


## 2026-10-07 â€” v0.36.18.750 Bevel + Inset inward cuts on uploaded source

- User .748 screenshot/file BEVEL ISSUE.obj42verts36faces: selected inset7 planar,
  rounded caps30/31 warped~.06348. Existing finite target triangulation refuses
  every cut as nonplanar-input-face. Export header736 is not app build version.
- Exact untouched source retained in tests/fixtures/bevel-inset-750.obj.
- Finite cutter uses displayed first-vertex fan privately for warped targets;
  planar target handling unchanged. Uncut polygons retain points/fan anchor/groups.
- Rejoin accepted wall/cap pieces across complete reversed edges, preserve ambiguous
  unions; bounded optional coalescing256pieces. No flattening or wholesale triangles.
-15newPASS/focused81PASS; full1812/1710PASS/102FAIL/0skip, same102identities as749.
  Seven depths,zero triangles/closed,exact shallow prism volume, rotated source,
  groups, physical/Exact actual combined-owner history/Cancel covered.
- Selected warped source still refuses; legacyThrough path unchanged. No all-quad
  promise for arbitrary intersected warped surfaces or self-intersection detection.
- Kernel body only; Face import-only/kernel/shell750, all other pins retained;
  two reviewed hashes. main/Loop715/Multi/frozen betas untouched.
- Publication/Node22/live verification and device .750 acceptance pending.

- [x] User PASS .750: original Bevel/Inset source inward Exact/drag.
- [x] .750 user PASS: deeper/full cut, Cancel/Undo/Redo and positive Extrude.
- [ ] Bevel/Knife/Loop and selection/navigation retain accepted behavior.


### .750 publication verification

Runtime 4036c0fdf9c5cabc1173d68a3cf4281d7674b049 published. Actual Node22 CI37620905333/job112790634635:1812tests/1710PASS/102FAIL/0skip; all102failure names match baseline. Pages37620904201 success; live shell/version/kernel/Face loader/original OBJ fixture and frozenBeta6 version byte-match main. Focused81PASS. Device .750 acceptance pending.


## 2026-10-08 â€” v0.36.18.751 warped-target Through planning / ordered exits

- User PASS .750. Remaining legacy planner still rejects supplied Bevel/Inset
  object as nonplanar-input-face; target surface representation now shares750fan.
- Selected source remains strictly planar/convex. Warped-target buildThrough uses
  existing finite cutter at chosen ordered targetDepth + existing epsilon overshoot.
  Original planar legacy build preserved; no pointer/tool owner changes.
-8newPASS/focused78PASS; full1820/1718PASS/102FAIL/0skip, identical102identities.
  Source7 exactexit2; clean42faces/0tris; warped two-shell targets2/5 and first-only
  second shell untouched; rotation/scaling/volume, actual physical/Exact/history/
  selection clear and shallow cut compatibility covered.
- Kernel body only; Face import-only/kernel/shell751, retained other pins. Two
  reviewed hashes; main/Loop715/Multi/frozen betas untouched.
- Publication/Node22/live verification and device .751 acceptance pending.

- [x] User PASS .751: supplied object: shallow recess then full inward cut at shell exit.
- [x] User PASS .751: Cancel and Undo/Redo; selection clears when the cut passes through.
- [x] User PASS .751: ordinary cube Through and selection/navigation retain accepted feel.


### .751 publication verification

Runtime 5c3007ce3b9f5863dc924a12bce60c7b3946dc87 published. Node22 Topology run37697834551/job113053828900:1820tests/1718PASS/102FAIL/0skip; all102 failure names exactly match the local inventory and prior build. Pages run37697833503 succeeded. Live shell/version, Through kernel, Face direct, original source fixture and beta-6 version bytes match the tested checkout. Device .751 acceptance remains pending.


## v0.36.18.752 â€” Vertex Extrude scaffolding

- [x] User PASS .751 recorded; frozen betas/Loop715/Multi/main preserved.
- [x] New tips + loose edges on attached/boundary/loose/multi source vertices;
      existing faces, positions, groups, creases and source object retained.
- [x] Actual radial/drawer launch, original top-centre session, rendered picking,
      Free repeated pulls, signed XYZ Exact, last-vector Repeat and selected tips.
- [x] One successful pull = one Undo/Redo; cancelled/no-op/invalid preview retains redo.
- [x] Lock/changed mesh/object/mode, competing Build Edge, Escape/blur/capture cleanup.
- [x] Original Pencil background policy does not close a loose-tip Repeat tap;
      true background retains navigation and exits through existing session.
- [x] Closed scaffolding is eligible for original Create Face after existing Join.
- [x] 12 new PASS; focused88PASS/full1832/1730/102/0, same102failure identities.
- [x] User PASS .752: select vertex â†’ radial Extrude â†’ Free drag â†’ drag selected tip again.
- [x] User PASS .752: XYZ signed Exact and Repeat ON tap another vertex; multi vertices create one edge each.
- [x] User PASS .752: Done â†’ Join/Build Edge to close scaffold â†’ original Create Face/Fill.
- [x] User PASS .752: Cancelled gesture, Undo/Redo, background exit and Pencil/finger navigation.


### .752 publication verification

Runtime 9be399909982719b9b7ecdf757bbf00c4695631f published. Actual Node22 Topology run37712338609/job113100902832:1832tests/1730PASS/102FAIL/0skip; all102failure names exactly match the local inventory. Pages37712337662 success; live shell/version/new Extrude core and owner/Vertex panel/gizmo/background policy and frozenBeta6 version byte-match the tested checkout. User PASS .752 on2026-10-08. Browser smoke attempt timed out; device acceptance is the user report.


## 2026-10-08 â€” v0.36.18.753 Vertex Bevel facegroup preservation

- User PASS .752 /nextbuild. Resume scoped Bevel/Knife/Loop reliability audit.
- Reproduced existing single/multi Vertex Bevel appending caps without group entries:
  grouped cube becomes7/8faces but retains only6labels; blue Apply also omitted groups.
- Repair existing kernels: source labels retained; cap inherits unanimous incident
  group, otherwise null, matching accepted Edge Bevel provenance. No geometry changes.
- Existing direct owner restores groups on preview Apply/repeated drag/Cancel and
  disarm; a changed facegroup invalidates old blue preview instead of overwriting it.
-16new behavioral PASS/focused82PASS; full1848/1746PASS/102FAIL/0skip; identical
  failure names to .752, all checks active. Real kernels/direct owner/history, single/
  adjacent/separate multi, mixed/uniform groups, creases/loose geometry, closed
  winding, Loop/Knife combinations and OBJ groups covered.
- Three runtime bodies changed; bootstrap/Inset/Face direct imports only repinned.
  Six reviewed hashes; required parent/recovery/shell753 pins. Through child751,
  Extrude752, protected main/Loop715/Multi/frozenbeta unchanged.
- Publication/actual Node22/live verification and .753 device acceptance pending.

- [x] User PASS .753: grouped model â†’ Vertex Bevel Width preview â†’ Apply retains groups.
- [x] User PASS .753: Multi Vertex Bevel, repeated Pencil Width drag and Cancel preserve source.
- [x] User PASS .753: Apply â†’ Undo â†’ Redo restores geometry/groups; ordinary Vertex Extrude still works.


### .753 publication verification

Runtime 0f11d92e7eb0655fac0c8b15ddd362278256c772 published. Actual Node22 Topology run37721519156/job113130013158:1848tests/1746PASS/102FAIL/0skip; all102failure names exactly match the local inventory and .752. Pages37721518051 succeeded. Live shell/version, all six changed runtime modules/loader parents, accepted Vertex Extrude owner and frozenBeta6 version byte-match the tested checkout. Focused82PASS; .753 device acceptance pending.


### .753 acceptance

User PASS .753 on2026-10-08: Vertex Bevel Apply/Cancel/multi drag/Undo/Redo and retained Vertex Extrude.


## 2026-10-08 â€” v0.36.18.754 Knife perspective EDGE accuracy

- User PASS .753 /nextbuild. Bevel/Knife/Loop audit reproduced Knife EDGE using a
  screen-space fraction as a world-edge fraction. Angled planar source worldt=.3
  resolves .2112676: .44366model units /42.88066screen pixels from shown marker.
- Existing freeBoundaryPoint now converts with camera clip weights before world
  interpolation. Orthographic weights1 preserve old result; END/MID/PERP priority,
  distances, release hysteresis, gestures, topology splitter/history unchanged.
-16new behavioral tests: before11FAIL/5PASS, after16PASS; focused88PASS.
  Full Node24:1864/1762PASS/102FAIL/0skip, same102failure identities as .753.
  Actual whole-owner camera/raycast/Pencil cut, reversed edges, rotations/transforms,
  .01/1/100scale, viewport offsets, groups/creases, Cancel/redo, exact Undo/Redo,
  Bevel1/3â†’Knifeâ†’supported Loop closed shells covered. No blanket exclusions.
- Runtime body only Knife; one reviewed hash and shell/recovery/Knife754 pins.
  Face/bootstrap/VertexBevel753, Extrude752, Through751 retained. Protected main,
  Loop715/Multi/frozen betas untouched. No near-plane clipping implementation;
  EDGE conversion refuses nonfinite or nonpositive clip weights.
- Publication/actual Node22/live verification and .754 device acceptance pending.

- [x] User PASS .754: angled perspective face, Knife arbitrary EDGEâ†’EDGE endpoints follow markers.
- [x] User PASS .754: Inference ON retains END/MID/PERP snapping; ordinary cube Knife still feels familiar.
- [x] User PASS .754: Bevelâ†’Knifeâ†’supported Loop; Undo/Redo restores each operation.


### .754 publication verification

Runtime 5a7f6d585a72f076fe9d80f1bb05fd6a3b269915 published. Actual Node22 Topology run37725898931/job113143857359:1864tests/1762PASS/102FAIL/0skip; all102failure names match local inventory and .753 exactly. Pages37725898285 succeeded after a delayed deployment step; live shell/version/Knife, accepted Vertex Extrude and frozenBeta6 version byte-match the tested checkout. Focused88PASS. .754 device acceptance pending.


### .754 acceptance â€” 2026-10-08

User PASS .754: perspective Knife EDGE placement, END/MID/PERP, Bevelâ†’Knifeâ†’Loop and Undo/Redo. No new runtime changes or build started.


## 2026-10-08 â€” v0.36.18.755 Knife gesture context / cancellation

- User PASS .754 /nextbuild. Actual Pencil reproduction: start on cube1, swap
  active mesh/object to cube2 before release; cube1 stays6faces, cube2 becomes7,
  history1. Knife had no starting mesh/object/lock guard and cancel leaked capture.
- Existing owner stores starting mesh/activeId, checks Face mode/unlocked state
  before starting, previewing and committing. Changed context disarms semantically
  without cutting/history; locked Knife arming refuses. No parallel input owner.
- One cancellation helper retires drag before releasing capture and removing markers;
  used by Done/exclusive/context, pointercancel/lostcapture and Escape/blur.
  Ordinary pointercancel/lostcapture keep Knife armed for another cut; terminal
  exits emit existing boxlab-knife-disarmed for original session close.
-17new whole-owner behavioral tests: before16FAIL/1PASS, after17PASS; focused105PASS.
  Full Node24:1881/1779PASS/102FAIL/0skip, same102names as754. Real camera/raycast/
  Pencil moves/releases, changed mesh/object/lock/mode at move and up, marker/capture
  cleanup, repeat/Undo/Redo/redo retention and existing Bevel/Knife/Loop covered.
- Two historical prepared-endpoint release fixtures now supply actual starting
  mesh/object context; no guard bypass or weakened assertions. Screen harness
  records real semantic events/capture/markers. Protected/frozen diff clean.
- Runtime body only Knife; one reviewed hash and required recovery/shell/Knife755.
  .754 perspective conversion/snap priorities, topology splitter and Loop untouched.
  Same-instance in-place geometry edits are not fingerprinted by this context guard;
  existing tool-exclusive events still own their cancellation.
- Publication/actual Node22/live verification and .755 device acceptance pending.

- [x] User PASS .755: two ordinary Knife cuts remain armed; each Undo/Redo restores one cut.
- [x] User PASS .755: Done or switch modelling mode/tool â†’ ordinary navigation, no stuck capture/markers.
- [x] User PASS .755: Locked object refuses Knife; unlock and launch again permits the ordinary cut.


### .755 publication verification

Runtime cb28427114df517083239ef07b31e3abc4cac9d9 published. Actual Node22 Topology run37737755836/job113181100425:1881tests/1779PASS/102FAIL/0skip; all102failure names exactly match the local inventory and .754. Pages37737755773 succeeded. Live shell/version/Knife, accepted Vertex Extrude and frozenBeta6 version byte-match the tested checkout. Focused105PASS; .755 device acceptance pending.


### .755 acceptance â€” 2026-10-08

User PASS .755: repeated Knife/history, Done/tool/mode/navigation and locked-object refusal.


## 2026-10-08 â€” v0.36.18.756 Bevel preview facegroup validity

- User PASS .755 /nextbuild. Reproduced Face Bevel staged source Original labels,
  then external Reassigned label: Apply accepts and restores Original into live
  geometry and Undo. Edge blue preview likewise ignores label changes, although
  Edge exact already recomputes from current mesh rather than restoring old groups.
- Existing shared sourceUnchanged now compares effective label for every real face.
  Changed/deleted labels invalidate stale Face/Edge preview/Apply; Cancel retains
  current source and redo. Fresh relaunch uses current provenance/history.
- Missing legacy labels equal explicit null. Initial strict array-length comparison
  rejected the existing disconnected unlabelled-shell preview fixture; corrected to
  per-face semantic comparison, without editing/weakening that rendering test.
  Extra entries without a corresponding real face are not part of this comparison.
-15new tests: before9FAIL/6PASS, after15PASS; focused121PASS. Full Node24:
  1896/1794PASS/102FAIL/0skip; same102failure identities as755. Actual shared owner/
  session/history, reassignment/removal/truncation, Cancel/redo, fresh Apply/Undo/Redo,
  array replacement with same values, legacy unlabelled previews, Face Bevelâ†’Knifeâ†’
  supported Loop closed shells/current labels covered. No blanket exclusions.
- Runtime body only shared Bevel validation; geometry/gestures/history algorithms
  unchanged. One reviewed hash; required shell/recovery/direct-Bevel756 pins.
  Knife755/VertexBevel753/Extrude752/Through751/protected main/Loop715/Multi/frozen
  betas retained. Publication/actual Node22/live verification and device756 pending.

- [ ] .756 iPad: grouped Face Bevel Width/Segments preview â†’ Cancel retains source labels.
- [ ] Face and Edge Bevel Apply â†’ Undo â†’ Redo retains expected geometry/groups.
- [ ] Normal Knife and supported Loop after Bevel retain accepted feel.


### .756 publication verification â€” 2026-10-08

Runtime d1832204c878212a4254701c8996171e446215a3 published. Actual Node22 Topology run37750469278/job113222151677:1896tests/1794PASS/102FAIL/0skip; all102failure names exactly match the local inventory and .755. Pages37750468365 succeeded. Live shell/version/direct Bevel, accepted Knife and frozenBeta6 version byte-match the tested checkout. Focused121PASS; .756 device acceptance pending.


## 2026-10-08 â€” .756 acceptance / .757 Vertex Extrude axis chooser

User PASS .756.

User PASS .756; explicitly requests Vertex Extrude method match Edge Extrude's
viewport axis chooser, avoiding old drawer XYZ controls.

Audit: Vertex Extrude already owns Free/XYZ drag and exact vectors with a contextual
panel. Its session unconditionally hid the gizmo. Edge Extrude already uses the
expanded Move arrows/centre as constraint controls, offset beside selected geometry.
Reuse that existing presentation and handle owner for Vertex Extrude. XYZ arrows
select world axis; centre selects Free, without arming Move or moving geometry.
Original Vertex Extrude pointer/kernel/history/Repeat/Exact owners unchanged.
Original top-centre Exact/Repeat/Done and optional local direction buttons remain.
Chooser survives new-tip selection, highlights current direction, shows Free/axis
badge, hides Rotate/Scale/plane handles and retires on session exit. During live
pulls axis changes refuse. Closing hub discards preview through existing owner.
Edge remains XYZ / Plane perpendicular to edge; not changed to Vertex Free semantics.

10 new behavioral checks cover actual gizmo sync/handle/visual/session functions,
existing Vertex owner real Pencil pull, signed direction/exact/history and Edge
constraint event. Focused52PASS. Full Node24:1906tests/1804PASS/102FAIL/0skip;
all102failure names identical to .756, no exclusions. An extracted Object hub test
now loads the new predicate together with setHubState; assertions unchanged.
Syntax and whitespace checks pass. Two runtime bodies only: total-gizmo and
Vertex session explanatory text/version. Original geometry owner unchanged.
Reviewed two hashes and shell/recovery/two module757 keys. Bevel756/Knife755/
Extrude752/core/protected main/Loop715/Multi/frozen betas unchanged.
Publication/actual Node22/live verification pending. Device .757 acceptance pending.

Manual checks:
- Vertex â†’ Extrude: viewport arrows appear beside selection. Tap X/Y/Z then pull;
  tap centre Free and pull diagonally. Axis choice alone does not move the vertex.
- Extrude another selected tip; Exact and Repeat still work. Undo/Redo each pull.
- Done/background returns selection to puck and navigation; Edge Extrude unchanged.


### .757 publication verification â€” 2026-10-08

Runtime 98ed74d9df3b09aa97856b38ef271a429a36a6bb published. Actual Node22 Topology run37753453091/job113232091538:1906tests/1804PASS/102FAIL/0skip; all102failure names exactly match local inventory and .756. Pages37753452518 succeeded. Live version/shell/total-gizmo/Vertex session, unchanged Vertex Extrude and frozenBeta6 version byte-match the tested checkout. Focused52PASS. Device .757 acceptance pending.


## 2026-10-08 â€” .758 radial UI refinement

User requests hiding old Vertex Extrude Free/XYZ buttons, moving Vertex Extrude
into shared Face/Edge location and normalizing Face outer ring after Align removal.
Existing owners audited: presentation only, no pointer/kernel/history changes.
Vertex panel direction row remains hidden; viewport arrows/Free centre are sole
visible direction chooser. Exact/Repeat/Done retained.
Extrude inner0Â°/12-o'clock across Face/Edge/Vertex. Add moves to former Vertex
Extrude outer216Â° slot; all14Vertex tools remain. Bevel90Â° unchanged.
Face15outer tools spread evenly at24Â° intervals, clockwise order retained and
Circle0Â° anchored. Align remains on gizmo. Shared Join Coplanar Edge24Â°, Vertex
Clean Vertices288Â°/Merge Dist312Â° match Face slots; other shared slots retained.
Existing cross-mode placement assertion caught that Face-only spacing would break
shared outer positions; coordinated those three controls rather than weakening it.
58focusedPASS; fullNode24:1906tests/1804PASS/102FAIL/0skip, identical102failure
identities to757. Existing inventory/spacing/hidden-controls assertions extended;
no new duplicate implementation/tests. Computed outer-button bounds do not overlap
in Face/Edge/Vertex. Original inner geometry retained. Syntax/whitespace pass.
Two reviewed runtime hashes and shell/recovery/total-gizmo/Vertex-panel758 pins.
Original VertexExtrude752/core, main732/Loop715/Multi1.0 and frozenbetas unchanged.
Publication/Node22/live verification pending. Device .758 acceptance pending.

Manual checks:
- Vertex Extrude: only viewport axes/Free centre; Exact/Repeat/Done still present.
- Extrude at12-o'clock in Face/Edge/Vertex; Vertex Add accessible on outer ring.
- Face outer ring evenly spaced, all tools reachable; Bevel remains3-o'clock.


### .758 publication verification â€” 2026-10-08

Runtime39a699296bcf990cadecb7621f7f5c4c9970c61b published. Actual Node22 Topology run37754720314/job113236320113:1906tests/1804PASS/102FAIL/0skip; all102failure names exactly match local inventory and .757. Pages37754719444 succeeded. Live shell/version/total-gizmo/Vertex panel, unchanged Vertex Extrude and frozenBeta6 version byte-match tested checkout. Focused58PASS. Device .758 acceptance pending.


## 2026-10-08 â€” .759 full Vertex / Edge Extrude UI parity

User rejects remaining UI/UX difference. Audit found Vertex top-centre Distance/
Apply Exact/Repeat/Done versus Edge chooser-only. .757/.758 aligned chooser/slots,
not full interface. Use Vertex interface as standard for both via SAME panel DOM,
styles, controls and lifecycle. No cloned panel or parallel extrusion kernel.
Existing Vertex settings owner accepts mode-specific Extrude adapter; other Vertex
sessions stay intact. Edge gets signed Exact/last-vector Repeat through its existing
boundary ribbon builder/private candidate validation/history. Exact applies chosen
axis (perpendicular projection for Edge) or last pull/view-up projected for Plane.
Repeat ON taps a boundary edge, same vector, new outer rail selected, one Undo.
Old direction rows and transform-strip settings hidden during both Extrude sessions.
Shared viewport XYZ arrows/Free centre; Edge centre labelled Free perpendicular
rather than Plane, preserving accepted perpendicular ribbon geometry. Vertex remains
view-plane Free. Same12-oâ€™clock launch, offset chooser, popup and Doneâ†’puck/history.
Edge pointer owner retains direct pulls; context/cancel/capture protection, popup
click exemption and semantic completion added so shared controls cannot terminate
or compete with its session. Existing exclusive tool handoff preserves new owner.
Background policy uses Edge rendered hit ownership, protects Repeat from semantic
background delivery and closes Edge shared panel. No new raw background handler.
Edge restore includes facegroups; new ribbon labels explicitly null so committed
state and History clone agree. Source labels/creases retained; no provenance claim
for new ribbons beyond null. Extrusion geometry core unchanged.

10new behavioralPASS, focused62PASS. FullNode24:1916tests/1814PASS/102FAIL/0skip;
all102failure names identical to758. Actual shared DOM/controls, drawer/radial,
Pencil drag, Exact negative/refusal/history, Repeat, panel click capture, source
metadata/private validator failure, context/lock/Escape/background, Doneâ†’actual
puck owner tested. Existing Vertex/Edge/radial/background/release suites included.
Four reviewed runtime hashes/pins: Edge owner, shared panel, total-gizmo, background
policy; shell/recovery759. Vertex owner/core752, Edge geometry426, protected main/
Loop715/Multi and frozenbetas unchanged. Syntax/whitespace verified.
Publication/actualNode22/live verification pending; .759 device acceptance pending.

Manual checks:
- Compare Vertex and boundary/loose Edge Extrude: same axis chooser and top panel,
  Distance/Apply Exact/Repeat/Done; no old XYZ/Move controls.
- In each mode choose axis, pull; enter signed Exact, Repeat ON tap another source,
  then Undo/Redo. New tips/outer rails remain selected.
- Done/background restores puck and navigation; repeat next launch. Edge Free
  remains perpendicular to edge; Vertex Free follows view plane.


### .759 publication verification â€” 2026-10-08

Runtimeb2b5752804be956489e5f007d2f4859331fa1a9b published. Actual Node22 Topology run37757723383/job113246285445:1916tests/1814PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .758. Pages37757723210 succeeded. Live shell/version/all four changed runtime modules, unchanged Vertex Extrude and frozenBeta6 version byte-match tested checkout. Focused62PASS. Device .759 acceptance pending.


## .760 floating Edge selection regression

- [x] .759 user PASS recorded; accepted Extrude/radial UI retained
- [x] Seven new automated checks reproduce six baseline failures and pass after repair
- [x] Floating Edge tap survives window release without semantic background clear
- [x] Multi Edge Paint claims pending/active drag before Orbit
- [x] Held horizontal/vertical browser state receives moves without Orbit (state stub)
- [x] Visible Lasso selects no-body and foreground rails, rejects nearer occluders;
      Through retains hidden-edge selection; stationary Edge tap stays selected
- [x] Genuine background Pencil and finger Orbit forwarding preserved
- [x] Focused69PASS; full1923/1821PASS/102FAIL/0skip; exact759 failure identities
- [ ] iPad floating Edge tap persistence and Multi horizontal/vertical hold gestures
- [ ] iPad Visible Lasso floating rails, including foreground rails over another body
- [ ] Finger navigation and empty-background Pencil orbit still work
- [x] Pages publication and live760 shell/loader/module bytes verified


### .760 publication verification â€” 2026-10-08

Runtime a85585c2a0c6ce42b74d808ed939660ebd257d34 published. Actual Node22 Topology run37766273730/job113274606897:1923tests/1821PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .759. Pages37766272406 succeeded. Live shell/version/Gate/Lasso/Drawer, accepted Edge Extrude and frozenBeta6 version byte-match tested checkout. Focused69PASS. Device .760 acceptance pending.


## .761 floating scaffold hold / Fill Face

- [x] Ten new behavioral checks pass; .760 actual hold-to-Close-Face fault reproduced
- [x] Branched wire cube/grid return individual planar closed cells through loose seed
- [x] Subdivided rails, tails, rotated/scaled geometry covered; open/warped/crossing refused
- [x] Actual hold timer, horizontal browse, window release and Pencil gate retain outline
- [x] Original Fill creates one face, one history entry, Undo/Redo; cancel restores base
- [x] Actual Grow owner still receives vertical scrub; surfaced candidates exactly unchanged
- [x] Focused79PASS; full1933/1831PASS/102FAIL/0skip, exact .760 failure identities
- [x] iPad floating hold -> sideways browse -> release -> Fill Face -> Undo/Redo (.761 user PASS)
- [ ] Surface loops plus floating tap/Lasso and finger/empty-background navigation
- [x] Pages/live shell/main/new helper bytes verified


### .761 publication verification â€” 2026-10-08

Runtime8d4d0d51af2b09908863ab9e47b88d96fdfe2a70 published. Actual Node22 Topology run37770573916/job113288865380:1933tests/1831PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .760. Pages37770573883 succeeded. Live shell/version/main/scaffold helper, unchanged Pencil gate/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused79PASS. Device .761 acceptance pending.


## .762 Edge vertical selection release

- [x] .761 user PASS recorded; accepted closed scaffold outlines preserved
- [x] Actual main .761 reproduces Grow/Shrink/neutral release failures (9PASS/3FAIL)
- [x] Current12PASS: actual hold/move/window release preserves Grow preview on wire/surface
- [x] Shrink-to-empty and neutral return survive release; cancel restores pre-hold selection
- [x] Vertical completion retires horizontal cycle without new history
- [x] Existing sideways browser/Fill Face/Undo/Redo tests retained
- [x] Focused81PASS; full1935/1833PASS/102FAIL/0skip, exact .761 failure identities
- [x] iPad UP/DOWN preview retained after release; neutral return and sideways browser (.762 user PASS)
- [x] Pages/live shell/main bytes verified


### .762 publication verification â€” 2026-10-08

Runtimec3bf95c4173341917fe203527178bd9cd24c2a79 published. Actual Node22 Topology run37771704243/job113292612101:1935tests/1833PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .761. Pages37771703594 succeeded. Live shell/version/main and unchanged scaffold helper/Pencil gate/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused81PASS. Device .762 acceptance pending.


## .763 Knife same-mesh source validity

- [x] .762 user PASS recorded; original gesture/Fill Face releases retained
- [x] Whole-owner source edit tests reproduce12FAIL/1PASS on old Knife
- [x] New13PASS: coordinate/count/winding/topology changes cancel before endpoint work
- [x] Newer source/history/redo/capture/markers preserved; no stale rollback
- [x] Identical-value array replacements and latest metadata permit normal cut
- [x] Legacy injected drags capture source via actual owner helper; assertions intact
- [x] Focused156PASS; full1948/1846PASS/102FAIL/0skip, exact .762 failure identities
- [ ] iPad Bevel â†’ two Knife cuts â†’ supported Loop/Slide â†’ Undo/Redo â†’ Done/navigation
- [x] Pages/live shell/Knife bytes verified


### .763 publication verification â€” 2026-10-08

Runtime4b4f909d8ed2b1c0fda3174f07c6b53860a362ed published. Actual Node22 Topology run37772536234/job113295375073:1948tests/1846PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .762. Pages37772535751 succeeded. Live shell/version/Knife and unchanged main/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused156PASS. Device .763 acceptance pending.


## v0.36.18.764 â€” direct Edge Bevel drag ownership

- [x] User .763 PASS;24 new controller checks and153focusedPASS. Full1972/1870PASS/102FAIL/0skip, exact .763 failures. No exclusions.
- [x] Newer coordinate/topology/groups/creases/loose edits survive move/release/cancel/disarm; changed mesh/object/mode/lock refuses stale commit. Owned preview rollback, capture/control release, equal arrays and repeated history covered.
- [x] Visible .764: Edge Bevel repeated Pencil drags and Width/Segments Exact work; Undo/Redo restores each result.
- [x] Cancel/Done during Edge Bevel restores only its own preview; switching mode/object or locking cannot commit stale geometry; navigation resumes.
- [x] Face/Vertex blue Bevel Apply/Cancel and Bevelâ†’Knifeâ†’Loop still work; accepted floating scaffold selection/Fill Face preserved.


### .764 publication verification â€” 2026-10-08

Runtime b7bc824eaafb8b9cc109d27cb980b61946d1cf35 published. Actual Node22 Topology run37849650856/job113559106858:1972tests/1870PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .763. Pages37849650385 succeeded. Live shell/version/direct-Bevel and unchanged main/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused153PASS. Device .764 acceptance pending.


## v0.36.18.765 â€” additive Edge hold regression contracts

- [x] User .764 PASS recorded2026-10-09. Exactly four obsolete candidate-only expectations replaced with semantic fixed-base/candidate/probe/perimeter checks; other35 assertions retained.
- [x] Existing12 scaffold/vertical-release assertions retained through shared original fixture; real owner blocks/selectors/raycast, controlled down adapter documented.
- [x] Four deliberate bad-source mutations caught; original source byte-restored. Focused102PASS/full1972/1874PASS/98FAIL/0skip; no new failure names, exclusions or skips.
- [ ] Visible .765: with an existing Edge selection, hold another edge and browse sideways; prior selection survives and old previews do not pile up.
- [ ] Cancel restores prior selection; UP/DOWN Grow/Shrink keeps its result after release.
- [ ] Floating scaffold outline â†’ Fill Face â†’ Undo/Redo works; navigation resumes.


### .765 publication verification â€” 2026-10-09

Runtime201d8c4aa2bc24006542d4ad69df37e6781dfa6d published. ActualNode22 Topology run37862651977/job113601797169:1972tests/1874PASS/98FAIL/0skip; all98failure names exactly match local inventory. Exactly four reviewed .764 failures resolved, no new failures. Pages37862651054 succeeded. Live shell/version and unchanged main/direct-Bevel/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused102PASS. Device .765 sanity pending.


## v0.36.18.766 â€” Edge selection paint versus Orbit

- [x] User .765 PASS with remaining Edge selection dragâ†’Orbit report; no blanket gesture PASS inferred.
- [x] Actual gate/paint baseline14/8PASS/6FAIL; repaired14PASS. Seven new cases; original seven .760 assertions unchanged. Pending/active body-backed rails, horizontal/vertical and surfaced boundary cancellation covered.
- [x] Existing actual scaffold/vertical-release/selection/Extrude and shell checks92PASS. Full1979/1881PASS/98FAIL/0skip; exact .765 failures, no exclusions. Navigation with no paint claim retained.
- [x] Visible .766: Multi Edge Pencil drag across edges over a body and floating rails keeps selection ownership; try quick movement and a small move followed by a longer drag.
- [x] Edge hold â†’ sideways candidates and UP/DOWN Grow/Shrink retain results on release; floating Fill Face still works.
- [x] Pencil background Orbit and finger Orbit/pan/pinch still work, keeping selections; no stuck controls after selection drag/cancel.


### .766 publication verification â€” 2026-10-09

Runtimeb4d3270032543270603c5512ea205b883f0c8cca published. ActualNode22 Topology run37863375359/job113604189509:1979tests/1881PASS/98FAIL/0skip; all98failure names exactly match local inventory and .765. Pages37863374755 succeeded. Live shell/version/updated Pencil Orbit gate and unchanged main/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused92PASS. Device .766 acceptance pending.


## v0.36.18.767 â€” Vertex Bevel live-drag ownership

- [x] User .766 PASS recorded2026-10-09; accepted body-backed/floating Edge selection and navigation retained.
- [x] Initial25-case actual-owner baseline2PASS/23FAIL; new28PASS. Geometry/metadata/loose/context preservation, owned rollback, exact Undo/Redo, capture cleanup, equal arrays and start/no-op guards covered.
- [x] Focused156PASS; full2007/1909PASS/98FAIL/0skip, exact .766 failures. No exclusions/skips or gate. Accepted .753 blue previews/provenance and Bevelâ†’Knifeâ†’Loop preserved.
- [x] Visible .767: single/multi Vertex Bevel Pencil drags still commit once; Undo/Redo restores source/result.
- [x] Blue Width preview â†’ Apply and Cancel still work; cancel a drag/session and resume selection/navigation cleanly.
- [x] Vertex Bevel followed by supported Knife/Loop still works; .766 Edge drag-selection stays protected.


### .767 publication verification â€” 2026-10-09

Runtime85bc2cd65bf1f99f18a2ce823db7d62efd5859c8 published. ActualNode22 Topology run37863984676/job113606195654:2007tests/1909PASS/98FAIL/0skip; all98failure names exactly match local inventory and .766. Pages37863983873 succeeded. Live shell/version/updated direct Vertex Bevel and unchanged accepted Pencil Orbit gate/Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused156PASS. Device .767 acceptance pending.


## v0.36.18.768 â€” Pencil/Orbit validation reconciliation

- [x] User .767 PASS recorded2026-10-09.
- [x] Five obsolete checks replaced; other43 historical and14 floating/body-backed Edge assertions retained. Four intentional routing mutations caught by behavioral replacements; runtime restored.
- [x] Focused107PASS; full2007/1914PASS/93FAIL/0skip. Exactly five reviewed failures removed; no new failures or exclusions. All modelling pins/hashes unchanged.
- [x] Visible .768: Edge Multi tap/drag/hold and scaffold Fill Face stay reliable over background and bodies.
- [x] Pencil background navigation and selection recover after release/cancel; active tools keep ownership.
- [x] Vertex Bevel/Undo/Redo and shared Extrude axis chooser remain as accepted.


### .768 publication verification â€” 2026-10-09

Runtimed77866b4d110eb569de247a9b318e474203f9ab2 published. ActualNode22 Topology run37865322509/job113610547339:2007tests/1914PASS/93FAIL/0skip; all93failure names exactly match local inventory. Exactly five reviewed .767 failures resolved; no new failure identities. Pages37865321691 succeeded. Live shell/version and unchanged Pencil Orbit gate/Vertex Bevel/Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused107PASS. User .767 PASS recorded; device .768 sanity pending.


## v0.36.18.769 â€” Face Bevel session ownership

- [x] User .768 PASS recorded2026-10-09. Fill Face is the scaffold-cap action, reusing #fillFaceBtn.
- [x] Initial15-case baseline6PASS/9FAIL;19 current owner/panel/kernel cases pass. Active-object change with same mesh refuses stale preview/Apply/press; drag terminals/panel sync clean capture/controls/ghosts. Cancel preserves newer Face IDs and mesh/context/history.
- [x] Focused231PASS; full2026/1933PASS/93FAIL/0skip with exact .768 failures. Bevel kernel/Edge repeat and all unrelated pins unchanged; no exclusions/skips.
- [x] Visible .769: single/connected multi-Face Bevel Pencil and Width preview â†’ Apply commits once; Undo/Redo restores source/result.
- [x] Face Bevel Cancel leaves original mesh/selection; a fresh Face selection can launch Bevel again and navigation resumes.
- [x] Edge/Vertex Bevel and subsequent supported Knife/Loop work as accepted.


### .769 publication verification â€” 2026-10-09

Runtime7f0469d5eb8874db98d5ba795237dd986b43db14 published. ActualNode22 Topology run37893155389/job113698392066:2026tests/1933PASS/93FAIL/0skip; all93failure names exactly match local inventory and .768. Pages37893154964 succeeded. Live shell/version/updated direct Bevel and unchanged Vertex Bevel/Pencil Orbit gate/frozenBeta6 version byte-match tested checkout. Focused231PASS. User .768 PASS recorded; device .769 Face Bevel sanity pending.


## v0.36.18.770 â€” Face background / Orbit registration checks

- [x] User .769 PASS recorded2026-10-09.
- [x] Exactly four obsolete checks replaced; other21 historical checks and existing negative-cut assertions retained. Whole owners/real kernels; DOM/picking/Orbit callbacks remain c×¯<ãFòµë(š+myÐ¢22ãƒcV&Æ–6F–öâfW&–f–VB(	B##bÓÓ@ ¥&VÆV6Vc3f##f–3#s&#FScFcss3#s“SsƒSƒc“†6##²FW7FVBG&VP¦3“Ff&SVCFFCƒV#s–6S3fFcSC–3“cƒ“3#&c6W†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤æöFS#"4“3ƒSScSs“c’ö¦ö#Sƒ#sƒ’5T44U53#3e52ód”Âó6¶—à¥vW33ƒSScScC““‚'V–ÆBöFWÆ÷’5T44U52âg&W6‚÷7FFWÆ÷–ÖVçBÆ—fR6†VÆÂöÖæ–fW7BÀ¦6÷&Sƒcô'&“ƒc÷6÷W&6RÖ6÷&Sƒc÷6÷W&6RÖVF—F÷#ƒcö6öFV3ƒcöÖævVÖVçCƒcöG&vW#ƒcÀ§&÷FV7FVB×VÇF“ãæBg&÷¦Vä&WFrfW'6–öâ'—FRÖÖF6‚&W÷6—F÷'’â–æ—F–Â76WB&VG0§&V6VFVB6ö×ÆWFVBFWÆ÷–ÖVçC²6ö×ÆWFR÷7FFWÆ÷–ÖVçBfW&–f–6F–öâÖF6†W3ƒcà¤ÆÂf÷W"†æFöfbf–ÆW27W'&VçC²FWf–6SƒcvFRVæF–ærÃƒcGWÆ–6FRæCƒS’–×÷'FV@§&W6÷W&6RôæöÖBvFW2&VÖ–â6W&FVÇ’VæF–ærâæòæWrW6W"52–æfW'&VBà  ¢22ãƒcW6W"52&÷FV7FVB(	B##bÓÓP ¥W6W"5266WG3ƒcv†öÆRÖ'&’&÷FF–öâöæöçVæ–f÷&Ò66Æ^(i&6÷VçBôTäBÇ’÷&V÷VâÀ¤VF—B6÷W&6RÇ’ô6æ6VÂv—F‚7V$BÂVæFõ&VFòæBæ&÷†Æ"&V÷Vââ7G&–7BW‡FW&æÂff–æP§fÆ–FF–öâæBæöâÖff–æR6ö×öæVçB&VgW6Â&WF–æVBãƒcóƒS’VæF–ærvFW27F’6W&FRà ¢22ãƒc"–×÷'FVBUb–ç7V7F–öâ(	BFWf–6RvFRVæF–æs##bÓÓP ¤f÷W"æF—fR&Vw&W76–öç3¢&VÂtÄ"–×÷'FW"öW‡÷'FW"æBæ&÷†Æ"6†ææVÂ&÷VæGG&—À§&VBÖöæÇ’–ÆöBÂ÷&–v–æÂW‡÷'FW"F÷öÆöw’öf6Vw&÷W6–væGW&RÂ6ö÷&F–æFRÖöæÇ’VF—G2À§7FÆRö–çfÆ–BöÖ—76–ær÷'F–Â6†ææVÇ3²6çf2F–ÆRö÷&–VçFF–öâ÷F–ÆVBöW‡G&VÖRf–æ—FRUg2À£#Ö6÷&æW"'VFvWC²÷&–v–æÂÖW6„†VÇF‚ÆVæ6‚öW‡æBõ&Vg&W6‚ö6Æ÷6Rö6öçFW‡BÆ–fV7–6ÆP§v—F†÷WB†—7F÷'’w&—FW2âgVÆÃ#352ód”Âó6¶—âæò'&÷w6W"f—7VÂ&ööb„6‡&öÖ—VÐ¦&6†—fRF÷væÆöBG'Væ6FVB“²&VÂ•B6çf2÷67&öÆÂöÆ–÷WBvFR&VÖ–ç2VæF–ærà¤ÖçVÃƒc# ¢Ò–×÷'B¶æ÷vâUbtÄ.(i$ö&¦V7N(i$ÖW6‚†VÇFŽ(i&W‡æB–×÷'FVBUg3¢f6R6÷fW&vRæB7–à¢÷WFÆ–æW2f—6–&ÆS²w&W’7V&R6†÷w2F–ÆS(	3âÆ–â7V&R&W÷'G2æò–×÷'FVBUg2à¢Ò6Æ÷6RÂÖ¶RF÷öÆöw’VF—BÂ&V÷Vã¢7FÆRÖW76vRæBæòÆ–÷WBâVæFòF†RVF—Bæ@¢&V÷Vã¢UbÆ–÷WB&WGW&ç2â–ç7V7F–öâFG2æòVæFò7FWà¢Ò6fRæ&÷†Æ.(i'&W6WN(i$÷Vî(i&–ç7V7Bv–ã²÷&–v–æÂUbÖ&V&–ærtÄ"W‡÷'B7F–ÆÂv÷&·2à¤&6RUb–ç7V7F–öâöæÇ“²æòVçw&÷–çF–ær÷FW‡GW&RF—7Æ’÷"7V$BôÖ—'&÷"UbW‡÷'Bà¥7FG26÷fW"gVÆÂ6†ææVÃ²&Wf–Wr63#6÷&æW'2v—F‚F—7Æ–VBÖf6R6÷VçBv†VâÆ–Ö—FVBà£ƒc52&÷FV7FVC³ƒcGWÆ–6FRæCƒS’–×÷'FVB×&W6÷W&6RôæöÖBvFW2&VÖ–â6W&FRà  ¢22ãƒc"V&Æ–6F–öâfW&–f–VB(	B##bÓÓP ¥&VÆV6SCsscvC3&F6#SFS#3C“6f&SFCF3CS“sS“&33²FW7FVBG&VP¦SfS&“Fv&S“c†cCvfcCƒvSF3cf3Cƒ#cRW†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤æöFS#"4“3ƒcSƒS#sC‚ö¦ö#cs3“SsB5T44U53#352ód”Âó6¶—à¥vW33ƒcSƒS#CB'V–ÆBöFWÆ÷’5T44U52âg&W6‚Æ—fR6†VÆÂöÖæ–fW7BÂÖW6„†VÇFƒƒc"ð¦–ç7V7F–öãƒc"æB&÷FV7FVB×VÇF“ãög&÷¦Vä&WFrfW'6–öâ'—FRÖÖF6‚&W÷6—F÷'’à£ƒcW6W"52&÷FV7FVC³ƒc"•BÆ–÷WBõUb÷7FÆRÕVæFò÷&ö¦V7B6†V6·2VæF–ærâ6W&FP£ƒcGWÆ–6FRæCƒS’æöÖB÷&W6÷W&6RvFW2æ÷B–æfW'&VBâf÷W"†æFöfbf–ÆW27W'&VçBà  ¢22ãƒc"W6W"52&÷FV7FVB(	B##bÓÓP ¥W6W"5266WG2–×÷'FVBUbf6R6÷fW&vRöÆ–÷WBÂÆ–âÖÖW6‚æòÖ6†ææVÂ7FFRÀ§7FÆRÖgFW"×F÷öÆöw’ÖVF—B†–F–æ~(i%VæFò&Wf–Wr&V6÷fW'’ÂæBæF—fRæ&÷†Æ"&V÷Væ–ærà¥&W6÷W&6W2&VÖ–â&VBÖöæÇ“²÷&–v–æÂW‡÷'FW"F÷öÆöw’6–væGW&RæB†—7F÷'’&WF–æVBà ¢22ãƒc2Ub—6ÆæB÷6VÒ–ç7V7F–öâ(	BFWf–6RvFRVæF–æs##bÓÓP ¤f÷W"æF—fR&Vw&W76–öç2&÷FV7B6†&VBfW'FW‚Ô”BF¦6Væ7’Âv–æF–ærÖ–æFWVæFVçBW†7@¥UbVæGö–çBÖF6†–ærÂF–ç’–çFVçF–öæÂ7Æ—G2Âö–çB×F÷V6‚öF—66öææV7FVB÷fW&ÆÀ¦Ö—76–ærUb&÷&FW'2öÖ&–wV÷W2æöâÖÖæ–föÆBVFvR6W&F–öâÂ7FÆR&VgW6ÂæBgVÆÀ¦6öææV7F—f—G’&W–öæB&Wf–Wr'VFvWBâ&VÂtÄ"–×÷'N(i'&ö¦V7N(i&W‡÷'B7F—2Væ6†ævVC°¦æòÖW6‚æVFvW2‚’6–FRVffV7G2âFWFW&Ö–æ—7F–2ÆWGFRæB÷&ævR6VÒ6–FW2&÷VæFVB'¦÷&–v–æÂ&Wf–Wr'VFvWBâ÷&–v–æÃƒc"FW7G2&WF–æVC²gVÆÃ#3E52ód”Âó6¶—à¤ÖçVÃƒc3 ¢Ò¶æ÷vâ6VÖVBtÄ.(i$ö&¦V7BÖW6‚†VÇFŽ(i$–×÷'FVBUg3¢—6ÆæB6÷VçBö6öÆ÷W'2æB÷&ævP¢6VÒ6–FW2f—6–&ÆRâw&W’F–ÆRæBf6R6÷fW&vR&VÖ–â&VF&ÆRà¢Ò6Æ÷6^(i&Ö÷fRfW'FWƒ¢Æ–÷WB7F–ÆÂf–Æ&ÆRâF÷öÆöw’VF—N(i'&V÷Vã¢7FÆR&Wf–Wp¢†–FFVã²VæFòVF—N(i'&V÷Vã¢—6ÆæB÷6VÒf–Wr&WGW&ç2Âæò–ç7V7F–öâVæFò7FWà¢Ò6fRæ&÷†Æ.(i'&W6WN(i$÷Vî(i&–ç7V7C¢6ÖR6÷VçG2öÆ–÷WBæBæ÷&ÖÂtÄ"W‡÷'Bà¥6—‚Ö6öÆ÷W"ÆWGFR7–6ÆW2â—6ÆæG2&R6öææV7F—f—G’F–væ÷7F–72Âæ÷B÷fW&ÆFWFV7F–öã°§‡—6–6ÂöÖ—76–ærÕUb&÷&FW'2&Ræ÷BÆ&VÆÆVB–çFW&–÷"6VÒVFvW2âæòUbWF†÷&–ær–WBà£ƒc"óƒc52&÷FV7FVC³ƒcGWÆ–6FRæCƒS’&W6÷W&6RôæöÖBvFW27F’6W&FRà  ¢22ãƒc2V&Æ–6F–öâfW&–f–VB(	B##bÓÓP ¥&VÆV6SCf6fCc3v6–#6SVV66cvfFC3CS“Ss–6S²FW7FVBG&VP£6†##3c&c&3V3ƒf36#6VFC“3SscV3Cc“c"W†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤æöFS#"4“3ƒcc#ƒcscC2ö¦ö#cƒs“sS#5T44U53#3E52ód”Âó6¶—à¥vW33ƒcc#ƒcsC2'V–ÆBöFWÆ÷’5T44U52âg&W6‚Æ—fR6†VÆÂöÖæ–fW7BÂÖW6„†VÇFƒƒc2ð¦–ç7V7F–öãƒc2æB&÷FV7FVB×VÇF“ãög&÷¦Vä&WFrfW'6–öâ'—FRÖÖF6‚&W÷6—F÷'’à£ƒc"W6W"52&÷FV7FVC³ƒc2•B—6ÆæB÷6VÒö6ö÷&F–æFR×g2×F÷öÆöw’õVæFò÷&ö¦V7BvFP§VæF–ærâ6W&FSƒcGWÆ–6FRæCƒS’&W6÷W&6RôæöÖBvFW2æ÷B–æfW'&VBâÆÂf÷W ¦†æFöfbf–ÆW27W'&VçC²æòæWrWF†÷&–ærö6†ææVÂö¶W&æVÂö†—7F÷'’÷væW"à  ¢22ãƒc2W6W"52&÷FV7FVB(	B##bÓÓP ¥W6W"5266WG2—6ÆæB6÷VçBö6öÆ÷W'2ö÷&ævR6V×2Â6ö÷&F–æFRÖöæÇ’g2F÷öÆöw’VF—@§7FÆR†æFÆ–æræBVæFò&V6÷fW'’Âæ&÷†Æ"W'6—7FVæ6Rãƒc"óƒc&÷FV7F–öç2&WF–æVBà ¢22ãƒcB–×÷'FVBUb&÷FFS“+(	BFWf–6RvFRVæF–æs##bÓÓP ¤æF—fR&Vw&W76–öç3¢–ÆöB6÷’Ööâ×w&—FR÷6†&VB÷&–v–æÂVæ6†ævVBÂ–ÖvRöÖWFFF¦–FVçF—G’ÂÆ—fRvVöÖWG'’Væ6†ævVBÂöæR7GVÂ66VæRVæFõ&VFò7FWÂ&ö¦V7B6öFV2æ@§&VÂF‡&VRtÄ"&÷FFVBUbGG&–'WFW2v—F‚&–÷"FævVçB&6—2W†6ÇVFVBâwV&BÆ–æ¶VBð¦Æö6¶VB÷&VfW&Væ6R÷&ö6VGW&Â÷7FÆR÷'F–Â6öçFW‡G2æBÖ—76–æröf–ÆVB†—7F÷'“²6VçG&À¥UbæòÖ÷FG2æò6†V6·ö–çBâ7GVÂÖW6„†VÇF‚7F–öâFVÆVvFW2÷væW"æB&Vg&W6†W2à¤ÖçVÃƒcC ¢ÒfÆ–BUbÖ&V&–ærtÄ.(i$ö&¦V7BÖW6„†VÇFŽ(i$–×÷'FVBUg>(i%&÷FFRUg3“+¢f—6–&ÆRÆ–÷W@¢&÷FF–öã²f÷W"6Æ–6·2&WGW&âFò7F'F–ær÷&–VçFF–öââ—6ÆæB÷6VÒ6÷VçG27F’6æRà¢Ò6Æ÷6^(i%VæFþ(i'&V÷VâÂF†Vâ&VFþ(i'&V÷Vã¢öÆBöæWrUbÆ–÷WBÂVæ6†ævVBÖöFVÂvVöÖWG'’à¢Ò6fRæ&÷†Æ.(i'&W6WN(i$÷Vî(i&–ç7V7N(i&W‡÷'B&6RtÄ"FòæöÖC¢&÷FFVBUbÖ&WF–æVBà¥Æ–â÷7FÆRö–æ6ö×ÆWFRöÆö6¶VBöÆ–æ¶VB÷&ö6VGW&ÂÖW6†W26ææ÷B&÷FFRUg2â&6R6†ææVÀ¦öæÇ“²W†—7F–ærWfÇVFVB7V$BôÖ—'&÷"UbÖW‡÷'B&W7G&–7F–öç27F’âæòUbVçw&÷–çF–ærà£ƒc2óƒc"óƒc52&÷FV7FVC³ƒcGWÆ–6FRæCƒS’&W6÷W&6RôæöÖBvFW2&VÖ–â6W&FRà  ¢22ãƒcBÆö6ÂfÆ–FF–öâ(	B##bÓÓP ¤gVÆÂæF—fRæöFS#B&Vw&W76–öã#3…52ód”Âó6¶—Â–æ6ÇVF–ærf÷W"æWrUbWF†÷&–æp¦6†V6·2æBVæ6†ævVCƒc"óƒc2–ç7V7F–öâ6÷fW&vRâ&Wf–WvVB6†VÆÂö66†Rw&‚6ö†W&VçC°§&÷FV7FVBög&÷¦Vâf–ÆW2Væ6†ævVBâFWf–6SƒcBUb&÷FFRö†—7F÷'’÷&ö¦V7BöW‡÷'BvFRVæF–ærà¥V&Æ–6F–öâ4’õvW2öÆ—fR&ööbföÆÆ÷w2gFW"fW&–f–6F–öâà  ¢22ãƒcBV&Æ–6F–öâfW&–f–VB(	B##bÓÓP ¥&VÆV6V3ƒF#V3#Cƒ3F&SvSS“sCS–3–3#sfSfCSFcFCs²FW7FVBG&VP£SS3S†3vSƒS3#†SsCCFf&#S&cs3VS“FCbW†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤æöFS#"4“3ƒccC3c#s“rö¦ö#c“#s3“Ss"5T44U53#3…52ód”Âó6¶—à¥vW33ƒccC3cƒs25T44U52â÷7FFWÆ÷–ÖVçBÆ—fR6†VÆÂöÖæ–fW7BôÖW6„†VÇFƒƒcBöVF—CƒcBÀ§Væ6†ævVB–ç7V7F÷#ƒc2æB&÷FV7FVB×VÇF“ãög&÷¦Vä&WFrfW'6–öâ'—FRÖÖF6‚&W÷6—F÷'’à¤–æ—F–Â&VG2&V6VFVBFWÆ÷–ÖVçC²f–æÂ6ö×ÆWFRw&‚ÖF6†W3ƒcBãƒc2W6W"50§&÷FV7FVC³ƒcB•B&÷FF–öâö†—7F÷'’÷&ö¦V7Bô&6TtÄ.(i$æöÖBvFRVæF–ærâ6W&FSƒcóƒS¦vFW2æ÷B–æfW'&VC²ÆÂf÷W"†æFöfbf–ÆW27W'&VçBâæòvVöÖWG'’ö¶W&æVÂ÷66†VÖ6†ævW2à  ¢22ãƒcBd”ÂæF—fRf–ÆRäôÔBòãƒcRUb&W—"(	B##bÓÓP ¥W6W"6öæf—&×2f–Æ–ær&÷WFRf–Æ^(i$äôÔBâFòæ÷B–æfW"&6RtÄ"÷"Ub×&÷FF–öâf–ÇW&S°¦öÆBæF—fRw&—FW"Çv—27F÷&VB¦W&÷2âf÷W"æWræF—fRFW7G26†V6²7GVÂäôÒUb&–æ'¦6ö÷&F–æFW2ö–æFWVæFVçBf6RUb–æF–6W2B6V×2Â&÷FFVN(i'&ö¦V7N(i&7GVÂäôÔBF÷væÆöBÀ§G&–ævÆRöævöâ6÷'&W7öæFVæ6R÷6†&VBUb–æF–6W2öÖ—†VBö&¦V7Böfg6WG2Â–çfÆ–B÷7FÆRð§'F–ÂöWfÇVFVB&VgW6ÂâgVÆÃ#3#%52ód”Âó6¶—²÷&–v–æÂæF—fRôtÄ"FW7G2&WF–æVBà¤ÖçVÃƒcR†æF—fRæöÖB6ö×F–&–Æ—G’VæF–ær“ ¢Ò¶æ÷vâUbÖ&V&–ærtÄ.(i'&÷FFRUg3“+(i$f–ÆRäôÔBv—F‚&6RvVöÖWG'ž(i&÷Vâ–âæöÖC°¢–ç7V7BUbÆ–÷WBæB6V×2–âæöÖBw2Ubf–Wr†æ÷BÖFW&–ÂV&æ6R’à¢Ò6fRô÷Vâæ&÷†Æ"æB&WVBf–ÆRäôÔC¢&÷FFVBÆ–÷WB&W6W'fVBà¢ÒÆ–â7V&Rf–ÆRäôÔC¢vVöÖWG'’öw&÷W2–çF7C²÷&–v–æÂ&6RtÄ"UbW‡÷'B6æ—G’à¤–b¶æ÷vâ7F÷&VBUg26ææ÷BÖF6‚WfÇVFVBvVöÖWG'’ÂäôÔB×W7Bv—fRâW‡Æ–6—BW'&÷ §&F†W"F†â6–ÆVçB¦W&òÕUbf–ÆRâæF—fRÖFW&–Ç2÷FW‡GW&W2öÆ–W'2æ÷BW‡FVæFVB†W&Rà£ƒcB'&öB66WFæ6RVæF–æs³ƒc2óƒc"óƒc52æB&÷FV7FVBög&÷¦Vâ&6VÆ–æR&WF–æVBà  ¢22ãƒcRV&Æ–6F–öâfW&–f–VB(	B##bÓÓP ¥&VÆV6V#ƒ3ƒ6#FS“#F3cf#3Fcc6F33ƒ3FFS²FW7FVBG&VP¦CSC†SF3&fc&cscS“366&V33&–#SSfcS"W†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤æöFS#"4“3ƒccSƒSƒ2ö¦ö#c“s3“Ss“r5T44U53#3#%52ód”Âó6¶—à¥vW33ƒccSƒs2'V–ÆBöFWÆ÷’5T44U52â÷7FFWÆ÷–ÖVçBÆ—fR6†VÆÂöÖæ–fW7BöW‡÷'B×æVÃƒcRð¦æF—fRÖ6÷&SƒcRæB&÷FV7FVB×VÇF“ãög&÷¦Vä&WFrfW'6–öâ'—FRÖÖF6‚&W÷6—F÷'’à¤–æ—F–Â&VG2&V6VFVBFWÆ÷–ÖVçC²f–æÂ6ö×ÆWFRw&‚ÖF6†W3ƒcRâæF—fRæöÖBU`¦Æ–÷WB÷6VÒFWf–6RvFRVæF–æs³ƒcBd”Â&V6÷&FVB7V6–f–6ÆÇ’öâf–ÆRäôÔBãƒc250§&WF–æVC²æòæF—fRFW‡GW&RöÖFW&–Â6Æ–Ò÷"æWrFWf–6R66WFæ6R–æfW'&VBâf÷W ¦†æFöfbf–ÆW27W'&VçC²g&÷¦VâFöæ÷"÷&÷FV7FVBvVöÖWG'’÷væW'2Væ6†ævVBà  ¢22ãƒcRW6W"52&÷FV7FVB(	B##bÓÓP ¥W6W"W&fV7B5266WG2æF—fRf–ÆRäôÔBUbÆ–÷WB÷6V×2Â&÷FFVBÆ–÷WBæB&ö¦V7@§&V÷Vî(i&æF—fRW‡÷'Bâ&÷FV7B6W&FRUb–æF–6W2ö6÷VçG2æBöÇ–vöâÖ6÷&æW"Ö–ærÀ¦÷&–v–æÂvVöÖWG'’öw&÷W2ö†VFW"öFöæ÷"æB6ÆV"–æ6ö×F–&ÆRÕUb&VgW6ÂãƒcBæF—fR×&÷WFP¤d”Â7WW'6VFVBf÷"F†—266S²÷F†W"VæF–ærvFW2æ÷B–æfW'&VBà ¢22ãƒcb–×÷'FVBUbfÆ—Rõb(	BFWf–6RvFRVæF–æs##bÓÓP ¤f÷W"æWræF—fRFW7G3¢Rõb6ö÷&F–æFRG&ç6f÷&×2ÂGv–6R&W7F÷&W2÷&–v–æÂÂöæR7GVÀ§66VæRVæFõ&VFò6†V6·ö–çBW"6†ævRÂ6†&VB–ÆöBö–ÖvW2öÖWFFF÷VW"–æFWVæFVæ6RÀ¦vVöÖWG'’Væ6†ævVBÂ&ö¦V7B&÷VæGG&—Â&VÂæF—fRäôÒUb÷6VÒ–æF–6W2æBF‡&VRtÄ ¥UbGG&–'WFW2÷FævVçBW†6ÇW6–öââVç7W÷'FVB÷7FÆR÷'F–Âö†—2öæòÖ÷wV&G2æB7GVÀ¤ÖW6„†VÇF‚7F–öç2&WF–æVBâgVÆÃ#3#e52ód”Âó6¶—²÷&–v–æÂ&÷FFRôäôÒFW7G2Væ6†ævVBà¤ÖçVÃƒcc ¢Ò–×÷'FVBUg>(i$fÆ—R††÷&—¦öçFÂ’ôfÆ—b‡fW'F–6Â“¢&Wf–WrÖ—'&÷'3²&WVBF†R6ÖP¢fÆ—&W7F÷&W27F'F–ær÷&–VçFF–öââ&÷FFS“+7F–ÆÂv÷&·2&W6–FRF†VÒà¢Ò6Æ÷6^(i%VæFòõ&VFþ(i'&V÷Vã¢W‡V7FVBUbÖæBVæ6†ævVBÖW6‚vVöÖWG'’à¢Ò6fRô÷Vâæ&÷†Æ.(i$f–ÆRäôÔBv—F‚&6RvVöÖWG'“¢æöÖBUbf–Wr¶VW2fÆ—VBÆ–÷W@¢æB6V×2âW†—7F–æsƒcRæF—fRvFR—2&÷FV7FVBà¥v†öÆR–×÷'FVBÆ–÷WBöæÇ’âÆ–â÷7FÆR÷'F–ÂöÆö6¶VBöÆ–æ¶VB÷&ö6VGW&Â6öçG&öÇ27F§Væf–Æ&ÆRâæò&ö¦V7F–öâ÷W"Ö—6ÆæBG&ç6f÷&×2÷Vçw&÷–çF–ær–âF†—2'V–ÆBà  ¢22ãƒcbV&Æ–6F–öâfW&–f–VB(	B##bÓÓP ¥&VÆV6Sƒƒf&cCSc“&VC–#s6C†F#cS3633fVFV33C²FW7FVBG&VP¦6#3–c#†fFVcCC–#6#†&VS&SsCv6c6F#cBW†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤æöFS#"4“3ƒcsc3#sbö¦ö#c#33cƒcr5T44U53#3#e52ód”Âó6¶—à¥vW33ƒcsc3#b5T44U52â÷7FFWÆ÷–ÖVçBÆ—fR6†VÆÂöÖæ–fW7BôÖW6„†VÇFƒƒcböVF—CƒcbÀ§Væ6†ævVB–ç7V7F÷#ƒc2öW‡÷'B×æVÃƒcRöæF—fRÖ6÷&SƒcRæB&÷FV7FVB×VÇF“ãög&÷¦Và¤&WFrfW'6–öâ'—FRÖÖF6‚&W÷6—F÷'’ãƒcRæF—fRUb&÷VæGG&—W6W"52&÷FV7FVC³ƒc`¦fÆ—ö†—7F÷'’÷&ö¦V7BöæF—fRÖW‡÷'BFWf–6RvFRVæF–ærâÆÂf÷W"†æFöfbf–ÆW27W'&VçC°¦æòæWrFWf–6R52–æfW'&VBæBæòæF—fR66†VÖöW‡÷'FW"övVöÖWG'’6†ævW2à  ¢22ãƒcbW6W"52&÷FV7FVBòãƒcrUbv÷&·76R(	B##bÓÓP ¢Ò·…ÒW6W"ãƒcb53¢fÆ—RõbÂGv–6R&W7F÷&F–öâÂæF—fR†—7F÷'’æBUb&÷VæGG&—&÷FV7FVBà¢Ò·…ÒgVÆÂæöFS#B&Vw&W76–öã£#33%52ód”Âó6¶—Â6—‚v÷&·76R&Vw&W76–öç2à¢Ò·…Ò6ÖRÖW6‚†VÇF‚6W76–öâö÷&–v–æÂ6çf2öVF—B'WGFöç2öæF—fR†—7F÷'“²æòGWÆ–6FRVF—B¶W&æVÂà¢Ò·…Ò66÷VBâ÷–æ6‚æ6†÷"6öçF–çVF–öâÂf—Bö&÷VæFVB¦ööÒÂFÖ†—7F÷'’F—67&–Ö–æF–öâæBVâ÷ÆÒwV&Bà¢Ò·…ÒE"6—¦–ærÂö'6W'fW"ö6GW&R6ÆVçWÂ6Æ÷6R÷&V÷VâæB&÷F‚æF—fR¶W–&ö&BFVÆWFRwV&G2à¢Ò·…ÒW6W#ƒcr52•C¢ÖW6‚†VÇF‚(i"÷VâUbVF—F÷"v—fW2Æ&vR&VF&ÆRÆ–÷WC²7VÖÖ'’æB6öçG&öÇ2f—6–&ÆRà¢Ò·…ÒW6W#ƒcr52Væ6–Âöf–ævW"G&rç3²–æ6‚¦öö×3²f—B&W7F÷&W3²'WGFöç2&VÖ–âF&ÆRà¢Ò·…ÒW6W#ƒcr52&÷FFRôfÆ—Rõb(i"FööÆ&"æBGvòÒ÷F‡&VRÖf–ævW"VæFòõ&VFò&W7F÷&RW†7BÆ–÷WBà¢Ò·…ÒW6W#ƒcr52&6²Fò4BVæG26W76–öã²÷&–v–æÂ÷&&—B÷â÷–æ6‚÷6VÆV7F–öâv÷&³²&V÷Vâ&VÖ–ç26ÆVâà¢Ò²Òf–ÆRäôÔB&6RgFW"UbVF—G2&WF–ç2Æ–÷WB÷6V×2–âæöÖC²6fRô÷Vâ&WF–ç2Ug2à ¤—6ÆæB–6¶–ær÷G&ç6f÷&×2æBVçw&÷–çF–ær&Ræ÷B–×ÆVÖVçFVB–ãƒcrâv÷&·76RFWf–6R52—2&V6÷&FVB&÷fS²æWsƒc‚6VÆV7F–öâvFR&VÖ–ç26W&FRà  ¢22ãƒcrV&Æ–6F–öâfW&–f–VBòW6W"52(	B##bÓÓP ¥&VÆV6RCv#C663S36f6cS&#6Ff3CV#ƒ&f3sS†C““c²G&VP£#vVV6†s6C66C3Cƒ†6f3c#f#C&6#†c&bâæöFS#"4“3ƒcsssSs“ð¦¦ö#c#3S33r5T44U53#33%52ód”Âó6¶—²vW33ƒcsssSs#S5T44U52à¤Æ—fR6†VÆÂ÷fW'6–öâ÷v÷&·76Sƒcröæf–vF–öãƒcr'—FRÖÖF6‚&W÷6—F÷'’&Vf÷&Sƒc‚6†ævW2à¥W6W"v÷&·2vVÆÂ5266WG2Æ&vRv÷&·76RÂæf–vF–öâæB6W76–öâW†—C²&÷FV7@§6ÖR6çf2ö6öçG&öÇ2ö†—7F÷'’æB6ÆVâ&6²Fó4BâæF—fSƒcRæCƒcb&÷FV7F–öç2&WF–æVBà ¢22ãƒc‚Ub—6ÆæB6VÆV7F–öâ(	BW6W"53##bÓÓP ¢Ò·…ÒgVÆÂæöFS#C£#33u52ód”Âó6¶—²f—fRæF—fR6VÆV7F–öâ&Vw&W76–öç2à¢Ò·…Ò÷&–v–æÂ—6ÆæB”G2æB6†&VB&VæFW&W"÷–6¶W"Ö–ærgFW"¦ööÒ÷ã²UbFFVæ6†ævVBà¢Ò·…Ò6öçF–çV÷W2÷7F6¶VBö&÷VæF'’ö6öæ6fRöÆ–Ö—FVB÷7FÆR–6¶–æs²F÷Ö÷7B7F6¶VB—6ÆæBöæÇ’à¢Ò·…Ò6–ævÆRVâöf–ævW"öÖ÷W6R6†÷'BF6VÆV7G3²G&röÆöærö6æ6VÂö×VÇF—F÷V6‚æWfW"–6·2à¢Ò·…ÒvöÆB†–v†Æ–v‡BÂ6ÆV"öV×G’FÂ&W÷'B&Vg&W6‚ö†—7F÷'’ö6Æ÷6R&W6WG3²f—B&WF–ç26VÆV7F–öâà¢Ò·…ÒæF—fRVF—Bö†—7F÷'’öW‡÷'B÷væW'2Væ6†ævVC²&÷FFRôfÆ—6ÆV&Ç’ffV7Bv†öÆRÆ–÷WBà¢Ò·…ÒW6W#ƒc‚52•BF6W&FR—6ÆæG3¢6VÆV7FVB—6ÆæB†–v†Æ–v‡G2æBçVÖ&W"WFFW2à¢Ò·…ÒW6W#ƒc‚52â÷–æ6‚ÂF†VâFâ—6ÆæC¢†–v†Æ–v‡BföÆÆ÷w2F†Rf—6–&ÆR—6ÆæC²f—B7F–ÆÂv÷&·2à¢Ò·…ÒW6W#ƒc‚526ÆV"6VÆV7F–öâæBV×G’F6ÆV#²6Æ÷6R÷&V÷Vâ7F'G2v—F‚æò6VÆV7F–öâà¢Ò·…ÒW6W#ƒc‚52GvòÒ÷F‡&VRÖf–ævW"VæFòõ&VFòæB&6²Fó4B&WF–â66WFVCƒcr&V†f–÷W"à ¤öæÇ’&Wf–WvVBf6W2&R–6¶&ÆS²7F6¶VB—6ÆæG26†ö÷6RF÷Ö÷7Bâ6VÆV7FVBÖ—6Ææ@§G&ç6f÷&×2ÂVçw&æB–çF–ær&RgWGW&Rv÷&²â6VÆV7F–öâ7&VFW2æòVæFò6†V6·ö–çBà ¢22ãƒc‚V&Æ–6F–öâfW&–f–VB(	B##bÓÓP ¥&VÆV6S“ƒF333#cV&33†V#“sƒ#F3“s3v3†3#s&3²FW7FVBG&VP¦VV&ff3“css&#6f#ƒss6SFC–fSSSCf&VW†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤æöFS#"4“3ƒc“cCsƒ“bö¦ö#c#“C“s3#‚5T44U53#33u52ód”Âó6¶—°¥vW33ƒc“cCssS“’5T44U52âÆ—fR6†VÆÂ÷fW'6–öâôÖW6„†VÇF‚÷v÷&·76Röæf–vF–öâð¦–ç7V7F÷"öVF—Cƒc‚ÂVæ6†ævVBæF—fSƒcRÂ&÷FV7FVB×VÇF“ãæBg&÷¦Vä&WFrÖ&¶W ¦'—FRÖÖF6‚&W÷6—F÷'’âW6W#ƒcr52&÷FV7FVC³ƒc‚—6ÆæB6VÆV7F–öâFWf–6RvFP§VæF–ærâæò6VÆV7FVBÖ—6ÆæBG&ç6f÷&×2÷"æWrUbö†—7F÷'’÷&W6÷W&6RöW‡÷'B66†VÖà  ¢22ãƒc’6VÆV7FVBÖ—6ÆæBVF—G2(	BW6W"53##bÓÓ` ¢Ò·…ÒW6W#ƒc‚52&÷FV7FVC¢6VÆV7F–öâö†–v†Æ–v‡Bö6ÆV"öæf–vF–öâö†—7F÷'’÷6W76–öâW†—Bà¢Ò·…ÒgVÆÂæöFS#C£#3C52ód”Âó6¶—²f÷W"æF—fR6VÆV7FVBÖVF—B&Vw&W76–öç2à¢Ò·…Ò÷&–v–æÂ–ç7V7F÷"gVÆÂÖf6R6öææV7F—f—G’†–æ6ÇVF–ær&W–öæB&Wf–Wr“²6VÆV7FVB—f÷BB—6ÆæB&÷VæG26VçG&Rà¢Ò·…ÒW†—7F–ærUbVF—BG&ç67F–öâöæF—fR†—7F÷'’÷&W6÷W&6R6÷’Ööâ×w&—FS²÷F†W"—6ÆæG2÷VW'2övVöÖWG'’Væ6†ævVBà¢Ò·…ÒæF—fR&ö¦V7BôäôÒUb'—FW2ôtÄ"W‡÷'BÂæò7FÆRFævVçG3²7FÆR66÷R÷F÷öÆöw’ö–æFW‚ö6öçFW‡Bö÷fW&fÆ÷r&VgW6Rà¢Ò·…Ò6VÆV7F–öâ7W'f—fW2öæÇ’ÖF6†–ærgVÆÂÖVÖ&W'6†—gFW"VF—C²†—7F÷'’ö6Æ÷6R÷&Vg&W6‚6ÆV'3²÷&–v–æÂv†öÆRÖÆ–÷WBÖF‡2&WF–æVBà¢Ò·…ÒW6W#ƒc’526VÆV7B—6ÆæB(i"&÷FFS“+òfÆ—RòfÆ—c¢öæÇ’F†B—6ÆæB6†ævW2Â&÷WB—G2÷vâ6VçG&Rà¢Ò·…ÒW6W#ƒc’52&WVB6ÖRfÆ—Gv–6S²6VÆV7FVB†–v†Æ–v‡B&VÖ–ç3²VæFòõ&VFò&W7F÷&W2öæR÷W&F–öâBF–ÖRà¢Ò·…ÒW6W#ƒc’526ÆV"6VÆV7F–öâ(i"'WGFöç2ffV7Bv†öÆRÆ–÷WC²â÷–æ6‚ôf—BæB&6²Fó4B&WF–ãƒc‚&V†f–÷"à¢Ò·…ÒW6W#ƒc’526fRô÷Vâæ&÷†Æ"æBf–ÆRäôÔB&6R&W6W'fRVF—FVBÆ–÷WB÷6V×2–âæöÖBà ¤æò—6ÆæBÖ÷fRõ66ÆR÷Vçw&÷–çF–ær–WBâW6W#ƒc’52—2&÷FV7FVC³ƒs†26W&FRFWf–6RvFRà ¢222ãƒc’f–æÂ66÷RÖÆ&VÂ6÷'&V7F–öà ¤f–æÂ6÷W&6R&Wf–Wr6Vv‡BFW‡B&WÆ6VÖVçBÇ6ò6†æv–ærF†Ræò×6VÆV7F–öâÆ&VÃ°§v†öÆRÖÆ–÷WBÖF‡27F–VB6÷'&V7Bâ&W7F÷&RW‡Æ–6—Bv†öÆRÖÆ–÷WBÆ&VÂv†Vâ6ÆV&VBÀ¦FB7GVÂv÷&·76R76W'F–öç2B÷Vâö6ÆV"æB&Vg&W6‚öæÇ’ÖW6„†VÇF‚÷v÷&·76P¦66†R¶W—2Fóƒc’ã‡6†VÆÂ÷fW'6–öãƒc“²–çFW&æÂÖW6„†VÇF‚7F×ƒc’’âæòæWrW6W"52à ¢22ãƒc’V&Æ–6F–öâfW&–f–VB(	B##bÓÓP ¤f–æÂ&VÆV6S3&S3C“V&CSƒ&F6CcC#ƒ3V&6csvVc“6SsC²FW7FVBG&VP¦#s&cƒ&3CFc6f&ccCcƒfSFF&c–6Vc†csC“sÖF6†W2fWF6†VBÖ–ââæöFS#"4£3ƒs#Cc#CRö¦ö#c3ƒs#ƒCCƒ5T44U53#3C52ód”Âó6¶—²vW33ƒs#Cc#33¥5T44U52âÆ—fR6†VÆÂ÷fW'6–öãƒc’ÂÖW6„†VÇF‚÷v÷&·76Sƒc’ãÂVF—Bö–ç7V7F÷#ƒc’À¦æcƒc‚öæF—fSƒcR÷&÷FV7FVB×VÇF“ãög&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚&W÷6—F÷'’à¤f–æÂÆ&VÂ6÷'&V7F–öâ–æ6ÇVFVC³ƒc‚W6W"52&÷FV7FVBãƒc’6VÆV7FVBÖ—6ÆæBVF—BÀ¥VæFõ&VFòæB&ö¦V7BöæF—fRæöÖBFWf–6RvFRVæF–ærâ&WVFVBöæW‡F'V–ÆBGW&–æp§V&Æ–6F–öâ6öçF–çVVBF†R7F—fR&VÆV6S²æóƒc’52÷"ÆFW"'V–ÆB—2–æfW'&VBà  ¢22ãƒs6VÆV7FVBÖ—6ÆæBçVÖW&–2Ö÷fRò66ÆR(	BW6W"53##bÓÓ` ¢Ò·…ÒW6W#ƒc’52&÷FV7FVC²6VÆV7FVB÷v†öÆR&÷FFRôfÆ—æBæF—fRUb&÷VæGG&—&WF–æVBà¢Ò·…ÒgVÆÂæöFS#C£#3CU52ód”Âó6¶—²f÷W"æF—fRçVÖW&–2&Vw&W76–öç2à¢Ò·…Ò6VÆV7FVBÖöæÇ’Ö÷fR…RÅb’÷Væ–f÷&Ò÷6—F—fR66ÆR&÷VæB—6ÆæB6VçG&S²÷&–v–æÂG&ç67F–öâö†—7F÷'’öwV&G2à¢Ò·…Ò÷F†W"—6ÆæG2övVöÖWG'’÷6†&VB&W6÷W&6W2÷VW'2Væ6†ævVC²æF—fRVæFõ&VFò÷&ö¦V7BôäôÒUb'—FW2ôtÄ"GG&–'WFW2à¢Ò·…Ò¦W&òÖ÷fRõ66ÆSæò6†V6·ö–çC²&Ææ²öæöæf–æ—FRöæöç÷6—F—fR÷7FÆRöÆö6¶VBö÷fW&fÆ÷r&VgW6Rà¢Ò·…Ò÷&–v–æÂv÷&·76RçVÖW&–2FVÆVvF–öâöF—6&ÆR÷fÆ–FF–öâÂ&V÷VâFVfVÇG3óóæB–çWB&6·76Rà¢Ò·…Ò6VÆV7B—6ÆæB(i"éESãòéEc(i"Ö÷fS¢öæÇ’F†B—6ÆæBÖ÷fW2&–v‡C²éEcãÖ÷fW2Wà¢Ò·…Ò66ÆSãRF†Vã#¢6VÆV7FVB—6ÆæB6‡&–æ·2F†Vâ&WGW&ç2&÷WB—G2÷vâ6VçG&S²÷F†W"—6ÆæG27F’WBà¢Ò·…ÒVæFòõ&VFò7FW2F‡&÷Vv‚çVÖW&–2VF—G3²6ÆV"F—6&ÆW2Ö÷fRõ66ÆS²&÷FFRôfÆ—æBâ÷–æ6‚7F–ÆÂv÷&²à¢Ò·…Ò•BçVÖW&–2VçG'’ö&6·76RæB6Æ÷6R÷&V÷Vâv÷&³²6fRô÷Vî(i$f–ÆRäôÔB&6R&WF–ç2VF—FVBUg2÷6V×2à ¤çVÖW&–2Ö÷fRõ66ÆR&R6VÆV7FVBÖöæÇ“²6çf2G&r&VÖ–ç2ââæòVçw&÷–çF–æröæWrÖÖW6‚Ug2–WBà ¢22ãƒsVæ6–ÂÖ÷fRf÷"6VÆV7FVBUb—6ÆæG2(	BW6W"53##bÓÓ` ¢Ò·…ÒãƒsW6W"52&÷FV7FVC²W†7BÖ÷fRõ66ÆR&WF–æVBVæFW"6öÆÆ6VBF—66Æ÷7W&Rà¢Ò·…Ò7GVÂ6çf2Ö÷væW"Væ6–Â&Wf–Wr—2&VBÖöæÇ“²öæR÷&–v–æÂÖ÷fRG&ç67F–öâBÆ–gBà¢Ò·…ÒæF—fR†—7F÷'’÷VW"÷&W6÷W&6R—6öÆF–öâÂ6VÒ×6–FR&Wf–WrÂ7F&ÆR&ö¦V7F–öâÂE"÷¦ööÒÖ–ærà¢Ò·…Ò¦—GFW"ö6æ6VÂöÆ÷7B6GW&R÷&W÷'BöÆö6²÷&W6—¦Rôf—Bö†—7F÷'’ö6Æ÷6RFòæ÷B6öÖÖ—B&Wf–Ww2à¢Ò·…Òf–ævW"÷–æ6‚ö&6¶w&÷VæBVæ6–Âæf–vF–öâæBÆÒ7W&W76–öã²7FÆR6öçFW‡B&VgW6W2à¢Ò·…ÒFâ—6ÆæC²Væ6–ÂÖG&r—B&–v‡B÷W¢—6ÆæBæB÷&ævR6VÒ÷WFÆ–æW2föÆÆ÷rÂ÷F†W'27F’f—†VBà¢Ò·…ÒÆ–gBÂG&rv–ã²öæRVæFòW"7G&ö¶RæB&VFò&W7F÷&W2âæòF–ç’×FÖ÷fVÖVçB÷"f–Wr§V×à¢Ò·…Òf–ævW"âÂ–æ6‚¦ööÒÂ&6¶w&÷VæBVæ6–ÂâÂf—BæBGvòÒ÷F‡&VRÖf–ævW"VæFõ&VFò7F–ÆÂv÷&²à¢Ò·…Ò&6²Fó4BÂ6fRô÷VâæBf–ÆRäôÔB&6R&WF–âÖ÷fVBUg2÷6V×3²÷F–öæÂW†7B6öçG&öÇ27F–ÆÂv÷&²à ¥Væ6–ÂÖ÷fR66WFVC²Væ6–Â66ÆR6†—2–ãƒs"Âv—F‚&÷FFRFòföÆÆ÷rgFW"fVVF&6²à ¢22ãƒsV&Æ–6F–öâfW&–f–VB(	B##bÓÓ` ¥&VÆV6R&#“c3vVS#cfC“Scc&#V3#s6c–V####C²FW7FVBG&VP£vCfV#ƒSFFV##–#–Cƒ–6C#V3V&&6fV#CW†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤7GVÂæöFS#"4“3ƒƒƒ#s3S2ö¦ö#cssƒ#3s‚5T44U53#3C•52ód”Âó6¶—°¥vW33ƒƒƒ#c“#‚'V–ÆBöFWÆ÷’5T44U52â÷7FFWÆ÷–ÖVçBÆ—fR6†VÆÂöÖæ–fW7BÀ¤ÖW6„†VÇFƒƒs÷v÷&·76SƒsöVF—Cƒsö–ç7V7F÷#ƒsÂVæ6†ævVBæf–vF–öãƒc‚À§&÷FV7FVB×VÇF“ãæBg&÷¦Vä&WFrfW'6–öâ'—FRÖÖF6‚&W÷6—F÷'’â–æ—F–ÂÆ—fR&VG0§&V6VFVBFWÆ÷–ÖVçBæB&WGW&æVCƒs²f–æÂ6ö×ÆWFRw&‚ÖF6†W3ƒsâÆÂf÷W ¦†æFöfbf–ÆW27W'&VçBâW6W#ƒs52&÷FV7FVC³ƒsVæ6–ÂfVVÂöæf–vF–öâö†—7F÷'’ð§&ö¦V7BöæF—fRÖW‡÷'BFWf–6RvFRVæF–ærâ66ÆR&VÖ–ç2çVÖW&–2VæFW"W†7C°¥Væ6–Â66ÆRõ&÷FFRföÆÆ÷rfVVF&6²ÂæóƒsW6W"52–æfW'&VBà ¢22ãƒs"Væ6–Â66ÆRf÷"6VÆV7FVBUb—6ÆæG2(	BW6W"53##bÓÓ` ¢Ò·…ÒW6W#ƒs52&÷FV7FVC²FVfVÇBVæ6–ÂÖ÷fRÂæF—fR†—7F÷'’öæf–vF–öâöW‡÷'B&WF–æVBà¢Ò·…Ò7GVÂv÷&·76R66ÆRW6W2÷&–v–æÂG&ç67F–öâöæ6RöâÆ–gC²&Wf–Wr÷–ÆöB÷&W6÷W&6R—6öÆF–öâà¢Ò·…Ò6†&VBgVÆÂÖ—6ÆæB—f÷B&W–öæB&Wf–Wr'VFvWBÂ6VÆV7FVB6VÒ×6–FR—6öÆF–öâæB7F&ÆR&ö¦V7F–öâà¢Ò·…Ò6æ6VÂöÖöFR7v—F6‚öæòÖ÷ö¦—GFW"ö†÷&—¦öçFÂöÆö6¶VB÷7FÆRwV&G2Â÷6—F—fRÆ–Ö—G2æB&V÷VâFVfVÇBà¢Ò·…Ò6VÆV7B—6ÆæB(i"66ÆR(i"Væ6–ÂÖG&rWöF÷vã¢VæÆ&vR÷6‡&–æ²&÷WB—G26VçG&S²÷F†W"—6ÆæG27F’f—†VBà¢Ò·…ÒÆ–gBÂ&WVBÂVæFòõ&VFó¢öæR7FWW"7G&ö¶RâÆ—fRf7F÷"æB6VÒ÷WFÆ–æW2ÖF6‚6öÖÖ—GFVB&W7VÇBà¢Ò·…Ò7v—F6‚&6²FòÖ÷fS²Væ6–ÂÖ÷fRÂf–ævW"â÷–æ6‚æB&6¶w&÷VæBVæ6–Ââ7F–ÆÂv÷&²à¢Ò·…Ò6fRô÷Vâ(i"f–ÆRäôÔB&6R&W6W'fW266ÆVBUg2÷6V×2â÷F–öæÂW†7B66ÆR7F–ÆÂv÷&·2à ¥Væ6–Â&÷FFR—2æW‡BgFW"fVVF&6²âæòæWrVçw&÷–çF–æröÖW6‚Ub6†ææVÂ–ãƒs"à ¢22ãƒs"V&Æ–6F–öâfW&–f–VB(	B##bÓÓ` ¥&VÆV6R&&#†VfFf#f663s3C–c3c33–fF#3ƒƒ†c²FW7FVBG&VP£–Fc&f3†VfcCs&S“ffF3#Fc&F3fV‚W†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤7GVÂæöFS#"4“3ƒƒ#3“cCCrö¦ö#cs#c“#“3c‚5T44U53#3S552ód”Âó6¶—°¥vW33ƒƒ#3“c#ƒC'V–ÆBöFWÆ÷’5T44U52â÷7FFWÆ÷–ÖVçBÆ—fR6†VÆÂöÖæ–fW7BÀ¤ÖW6„†VÇFƒƒs"÷v÷&·76Sƒs"öVF—Cƒs"ö–ç7V7F÷#ƒs"ÂVæ6†ævVBæf–vF–öãƒc‚À§&÷FV7FVB×VÇF“ãæBg&÷¦Vä&WFrfW'6–öâ'—FRÖÖF6‚&W÷6—F÷'’â–æ—F–ÂÆ—fR&VG0§&V6VFVBFWÆ÷–ÖVçBæB&WGW&æVCƒs²f–æÂ6ö×ÆWFRw&‚ÖF6†W3ƒs"âW6W#ƒs50§&÷FV7FVC³ƒs"Væ6–Â66ÆRöæf–vF–öâö†—7F÷'’÷&ö¦V7BöæF—fRÖW‡÷'BFWf–6RvFP§VæF–ærâÆÂf÷W"†æFöfbf–ÆW27W'&VçC²Væ6–Â&÷FFRæW‡BgFW"fVVF&6²à ¢22ãƒs2Væ6–Â&÷FFRf÷"6VÆV7FVBUb—6ÆæG2(	BW6W"53##bÓÓ` ¢Ò·…ÒW6W#ƒs"52&÷FV7FVC²Væ6–ÂÖ÷fRõ66ÆRÂ66VæR†—7F÷'’öæf–vF–öâöW‡÷'B&WF–æVBà¢Ò·…ÒW†—7F–ærG&ç67F–öâ²6†&VBö–çBÖF‡3²&VBÖöæÇ’&Wf–WrÂgVÆÂÖ—6ÆæB—f÷BæB—6öÆFVB6VÒ6–FW2à¢Ò·…ÒV'FW"×GW&â&—G’Â&&—G&'’ÖævÆR&ö¦V7Bö7GVÂäôÒôtÄ"Ug2ÂVW"÷&W6÷W&6Rö†—7F÷'’—6öÆF–öâà¢Ò·…Ò6æ6VÂöÖöFR7v—F6‚ö¦—GFW"÷fW'F–6ÂögVÆÂ×GW&â÷7FÆRöÆö6¶VBö÷fW&fÆ÷r&VgW6ÂæBFVfVÇBÖ÷fRà¢Ò·…Ò6VÆV7B—6ÆæB(i"&÷FFR(i"Væ6–ÂÖG&r&–v‡BöÆVgC¢6VçG&VB&÷FF–öâv—F‚Æ—fRævÆR÷6VÒ&Wf–Ws²÷F†W'2f—†VBà¢Ò·…ÒÆ–gBÂ&WVBÂVæFòõ&VFó¢öæRæF—fR7FWW"7G&ö¶Râ&÷FFS“ôfÆ—7F–ÆÂv÷&²à¢Ò·…Ò7v—F6‚Ö÷fRõ66ÆS²Væ6–ÂVF—G2æBf–ævW"â÷–æ6‚ö&6¶w&÷VæBVæ6–Âæf–vF–öâ&VÖ–âvööBà¢Ò·…Ò6fRô÷Vâ(i"f–ÆRäôÔB&6R&W6W'fW2&÷FFVBUbÆ–÷WB÷6V×2à ¤æòæWrVçw&öæWrÖÖW6‚Ug2÷–çF–ær–ãƒs2âFWf–6Sƒs266WFæ6R&VÖ–ç26W&FRà ¢22ãƒs2V&Æ–6F–öâfW&–f–VB(	B##bÓÓ` ¥&VÆV6RƒvC&6&S6C†fCCSƒcc–V&Cƒ“3cCcc†SF“²FW7FVBG&VP£V#fFff##63“S6–3“#Ff3–f3c3““#rW†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤7GVÂæöFS#"4“3ƒƒ#c“3#S"ö¦ö#cs3cCCSS5T44U53#3Su52ód”Âó6¶—°¥vW33ƒƒ#c“3#Cr'V–ÆBöFWÆ÷’5T44U52â÷7FFWÆ÷–ÖVçBÆ—fR6†VÆÂöÖæ–fW7BÀ¤ÖW6„†VÇFƒƒs2÷v÷&·76Sƒs2öVF—Cƒs2ö–ç7V7F÷#ƒs2ÂVæ6†ævVBæf–vF–öãƒc‚À§&÷FV7FVB×VÇF“ãæBg&÷¦Vä&WFrfW'6–öâ'—FRÖÖF6‚&W÷6—F÷'’â–æ—F–ÂÆ—fR&VG0§&V6VFVBFWÆ÷–ÖVçBæB&WGW&æVCƒs#²f–æÂ6ö×ÆWFRw&‚ÖF6†W3ƒs2âW6W#ƒs"50§&÷FV7FVC³ƒs2Væ6–Â&÷FFRöæf–vF–öâö†—7F÷'’÷&ö¦V7BöæF—fRÖW‡÷'BFWf–6RvFP§VæF–ærâÆÂf÷W"†æFöfbf–ÆW27W'&VçC²æW‡BUbÖWF†÷&–ær7FvRæVVG2÷væW"VF—@¦æCƒs2fVVF&6²âæòæWrVçw&öæWrÖÖW6‚6†ææVÇ2÷–çF–ær÷"FWf–6R52–æfW'&VBà ¢22ãƒsBf—B6VÆV7FVBUb—6ÆæBFòF–ÆR(	BW6W"53##bÓÓ` ¢Ò·…ÒW6W#ƒs252&÷FV7FVC²Væ6–ÂÖ÷fRõ66ÆRõ&÷FFRöæf–vF–öâö†—7F÷'’öæF—fRW‡÷'B&WF–æVBà¢Ò·…Ò6VÆV7FVBÖöæÇ’&÷÷'F–öæÂ6VçG&–æró"RÖ&v–âÂgVÆÂ—6ÆæB&W–öæB&Wf–WrÂ6†&VB&÷VæG2÷væW"à¢Ò·…ÒöæR6†V6·ö–çBô4õr&W6÷W&6R—6öÆF–öã²&WVBæòÖ÷²7FÆRöÆö6¶VB÷¦W&òÖW‡FVçBöW‡G&VÖR÷F–ç’wV&G2à¢Ò·…Ò7GVÂv÷&·76R6æ6VÇ2Væ6–Â&Wf–Ws²f–Wrf—B—2æf–vF–öã²æF—fR&ö¦V7BôäôÒôtÄ"6÷fW&vRà¢Ò·…ÒÖ÷fR÷66ÆR—6ÆæB÷WG6–FRF–ÆR(i"f—BFòF–ÆS¢6VçG&VBf—BÂ&÷÷'F–öç2&WF–æVBÂ÷F†W'2f—†VBà¢Ò·…ÒVæFòõ&VFò&W7F÷&W2f—B–âöæR7FW²&WVBf—BFòF–ÆRFG2æòW‡G&VæFò7FWà¢Ò·…Òf–Wrf—B6†ævW2öæÇ’g&Ö–æs²Væ6–ÂÖ÷fRõ66ÆRõ&÷FFRÂf–ævW"â÷–æ6‚&VÖ–â–çF7Bà¢Ò·…Ò6fRô÷Vâ(i"f–ÆRäôÔB&6R&W6W'fW2f—GFVBÆ–÷WB÷6V×2à ¥6VÆV7FVBf—BöæÇ“²æòWFöÖF–2—6ÆæB6¶–æröæWrÖÖW6‚Ug2÷Vçw&÷–çF–ær–ãƒsBà ¢22ãƒsBV&Æ–6F–öâfW&–f–VB(	B##bÓÓ` ¥&VÆV6RS“FFS6S“V&#C–F663ƒCƒF&S“#3cfCƒfS–Cv²FW7FVBG&VP£Cf3ƒc†6sƒVc–F3ƒCsCCcfc33CVfC&&V6CCƒ3’W†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤7GVÂæöFS#"4“3ƒƒS#cCSCRö¦ö#cƒsc#cc5T44U53#3c52ód”Âó6¶—°¥vW33ƒƒS#cCC#ƒ2'V–ÆBöFWÆ÷’5T44U52â÷7FFWÆ÷–ÖVçBÆ—fR6†VÆÂöÖæ–fW7BÀ¤ÖW6„†VÇFƒƒsB÷v÷&·76SƒsBöVF—CƒsBö–ç7V7F÷#ƒsBÂVæ6†ævVBæf–vF–öãƒc‚À§&÷FV7FVB×VÇF“ãæBg&÷¦Vä&WFrfW'6–öâ'—FRÖÖF6‚&W÷6—F÷'’â–æ—F–ÂÆ—fR&VG0§&V6VFVBFWÆ÷–ÖVçBæB&WGW&æVCƒs3²f–æÂ6ö×ÆWFRw&‚ÖF6†W3ƒsBâW6W#ƒs250§&÷FV7FVC³ƒsBf—Bö7V7Bö—6öÆF–öâö†—7F÷'’öæf–vF–öâ÷&ö¦V7BöæF—fRÖW‡÷'BFWf–6P¦vFRVæF–ærâÆÂf÷W"†æFöfbf–ÆW27W'&VçC²æW‡BæF—fRUbÖ6†ææVÂ÷&ö¦V7F–öâ7FvP§&WV—&W2÷væW"VF—BæCƒsBfVVF&6²â6VÆV7FVBf—BFöW2æ÷B6²×VÇF—ÆR—6ÆæG2à ¢22ãƒsRæF—fR&÷„Æ"Ææ"Ug2(	BW6W"53##bÓÓ` ¢Ò·…ÒW6W#ƒsB52&÷FV7FVC²÷&–v–æÂ–×÷'FVBUbWF†÷&–æröf–ÆRôæöÖB&6VÆ–æR&WF–æVBà¢Ò·…ÒæF—fR6÷W&6V&÷†Æ"÷c2UbÖöæÇ’VçfVÆ÷RÂ7G&–7BfÆ–FF–öâÂÆVv7’÷Æ–âö–×÷'FVB'—FW2&WF–æVBà¢Ò·…Ò…’õ…¢õ•¢6ÖRvVöÖWG'“²öæR÷&–v–æÂ†—7F÷'’6†V6·ö–çBÂ&WVFVBæòÖ÷÷&W&ö¦V7F–öâVæFõ&VFòà¢Ò·…ÒæF—fRVF—G2ôGWÆ–6FRöFVÆWFVBÖ6÷’VæFò÷&ö¦V7BFöÖ–2&WÆ6VÖVçBæB7GVÂäôÒôtÄ"Ub'—FW2à¢Ò·…ÒÆö6¶VB÷&VfW&Væ6RöÆ–æ¶VB÷&ö6VGW&Âö–×÷'FVBöÖöF–f–W"ö–çfÆ–Bö6öÆÆ6VB&VgW6Ç2æBf–æ—FRW‡G&VÖW2à¢Ò·…ÒæF—fRÆ–æ¶VBGWÆ–6FR&VgW6W2&Vf÷&R×WFF–öã²&W6÷W&6RÖ&V&–ærÆ—fR'&’&VÖ–ç2&VgW6VBà¢Ò·…ÒgVÆÂÆö6ÂæöFS#C£#3c…52ód”Âó6¶—³"fö7W6VBæF—fR÷&VÆV6R6†V6·252à¢Ò·…ÒÆ–âÖW6‚õ7V$Böfb(i"ö&¦V7BÖW6‚†VÇF‚(i"Ug2(i"Ææ"…’(i"÷VâUbVF—F÷"6†÷w2æF—fRÆ–÷WBà¢Ò·…ÒG'’…¢õ•¢æBVæFòõ&VFó²Væ6–ÂÖ÷fRõ66ÆRõ&÷FFRôf—Bv÷&·2öâvVæW&FVBUg2ÂvVöÖWG'’7F—2f—†VBà¢Ò·…Ò6fRô÷Vâæ&÷†Æ"(i"&V÷VâUbVF—F÷"(i"f–ÆRäôÔB&6R&W6W'fW27&VFVBöVF—FVBUg2à¢Ò·…ÒW†—7F–ær–×÷'FVBUbÖW6‚7F–ÆÂVF—G2öW‡÷'G3²Ææ"'WGFöç27F’F—6&ÆVBf÷"–×÷'FVB&W6÷W&6W2à ¥Ææ"&ö¦V7F–öâ6â÷fW&Æö6öÆÆ6Rf6W3²æògVÆÂVçw&ö&÷‚Ö–ær÷–çF–ær÷"WfÇVFVBUg2–WBà ¢22ãƒsRV&Æ–6F–öâfW&–f–VB(	B##bÓÓ` ¥&VÆV6Rc#s#sCS“3sC–3Sƒv3F6VS6SfC&fFC²FW7FVBG&VP£cffCƒfc“3c#s3#3C–Fcf&#SfSSƒ†ƒ#V#SRW†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤7GVÂæöFS#"4“3ƒƒSs#3ƒƒ’ö¦ö#cƒ333##C5T44U53#3c…52ód”Âó6¶—°¥vW33ƒƒSs#33“’'V–ÆBöFWÆ÷’5T44U52â÷7FFWÆ÷–ÖVçBÆ—fR6†VÆÂöÖæ–fW7BÀ¤ÖW6„†VÇF‚öVF—BöÖævW"ö6öFV2÷&W6÷W&6RöÖævVÖVçBöG&vW#ƒsRÂVæ6†ævVBv÷&·76SƒsBÀ¤tÄ"öæF—fRW‡÷'FW'3ƒcRÂ&÷FV7FVB×VÇF“ãæBg&÷¦Vä&WFrfW'6–öâ'—FRÖÖF6€§&W÷6—F÷'’â–æ—F–ÂÆ—fR&VG2&V6VFVBFWÆ÷–ÖVçBæB&WGW&æVCƒsC²f–æÂ6ö×ÆWFP§V&Æ—6†VBw&‚ÖF6†W3ƒsRâW6W#ƒsB52&÷FV7FVC³ƒsRæF—fRÆæ"öVF—F÷"ö†—7F÷'’ð§&ö¦V7BöæF—fRæöÖBFWf–6RvFRVæF–ærâÆÂf÷W"†æFöfbf–ÆW27W'&VçBâæF—fP§&W6÷W&6Rc2÷6÷W&6V&÷†Æ"—2W‡Æ–6—C²æò6VÒVçw&÷–çF–æröWfÇVFVBUb6Æ–Òà ¢22ãƒsbæF—fR&÷‚Ug2(	BW6W"53##bÓÓ` ¢Ò·…ÒW6W#ƒsR52&÷FV7FVC²Ææ"÷6÷W&6V&÷†Æ"÷c2öæF—fRVF—F÷"ö†—7F÷'’öW‡÷'B&6VÆ–æR&WF–æVBà¢Ò·…Ò7V&R6—‚F—6¦ö–çBæöæ6öÆÆ6VB—6ÆæG2ó'6V×2Âf—†VBF—&V7F–öæÂ6VÆÇ2Â&V7FæwVÆ"&÷÷'F–öç2öFVç6—G’à¢Ò·…Ò÷&–v–æÂöæR6†V6·ö–çBô4õrõÆæ"&WÆ6VÖVçBöæF—fRVæFòöæòÖ÷æB6VÆV7FVBÖöæÇ’VF—B—6öÆF–öâà¢Ò·…ÒæF—fR&ö¦V7BôäôÒ–æFWVæFVçBUbööÂ¶6÷&æW"'—FW2ö7GVÂF‡&VRtÄ"Ug3²wV&FVB&VgW6Â6÷fW&vRà¢Ò·…Ò7V&Rõ7V$Böfb(i"ÖW6‚†VÇFŽ(i%Ug>(i$&÷‚Ug>(i$÷VâUbVF—F÷#¢6—‚6W&FR6öÆ÷W&VB—6ÆæG2à¢Ò·…ÒVæ6–ÂÖÖ÷fR÷66ÆR÷&÷FFRöæR—6ÆæC²÷F†W'27F’f—†VBâVæFòõ&VFò&W7F÷&W2V6‚7F–öâà¢Ò·…ÒÆæ.(i$&÷Ž(i%VæFò&W7F÷&W2&–÷"Æ–÷WC²&WVFVB&÷‚FG2æòVæFòâvVöÖWG'’Væ6†ævVBà¢Ò·…Ò6fRô÷Vâæ&÷†Æ"(i"UbVF—F÷"(i"f–ÆRäôÔB&6R&WF–ç2&÷‚æVÇ2÷6V×2à ¤†—2ÖÆ–væVB&÷‚&ö¦V7F–öâf—'7C²vVæW&ÂF—&V7F–öæÂF6†W2Ö’÷fW&ÆöF—7F÷'Bà¤æò6VÒVçw&ö÷F–ÖÂ6¶–ær÷–çF–æröWfÇVFVBUg2–ãƒsbà ¢22ãƒsbV&Æ–6F–öâfW&–f–VB(	B##bÓÓ` ¥&VÆV6RSSVcF6F666S“scVVC633ƒCcƒ#–3S#FV#sC²FW7FVBG&VP£ƒ†fSVc3†SF3cCƒS3sS&3f#“#vV63SCS“cVbW†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤7GVÂæöFS#"4“3ƒƒc“3CCs"ö¦ö#cƒCS“Sƒ#R5T44U53#3s552ód”Âó6¶—°¥vW33ƒƒc“3C3‚'V–ÆBöFWÆ÷’5T44U52âg&W6‚Æ—fR6†VÆÂöÖæ–fW7BÂÖW6„†VÇF‚öVF—CƒsbÀ§Væ6†ævVBv÷&·76SƒsBôtÄ"¶æF—fRW‡÷'FW'3ƒcR÷&÷FV7FVB×VÇF“ãög&÷¦Vä&WFrfW'6–öà¦'—FRÖÖF6‚&W÷6—F÷'’âÖævW"ö6öFV2÷&W6÷W&6W3ƒsRæBÆÂ&÷FV7FVBög&÷¦Vâ÷væW'0§Væ6†ævVBâW6W#ƒsR52&÷FV7FVC³ƒsb&÷‚æVÇ2÷6VÆV7FVBVF—G2ö†—7F÷'’÷&ö¦V7Bð¤äôÔB&6RFWf–6RvFRVæF–ærâÆÂf÷W"†æFöfbf–ÆW27W'&VçBâæòvVæW&Â6VÐ§Vçw&ö÷F–ÖÂ6¶–ær÷–çF–æröWfÇVFVBUb6Æ–Ó²F—&V7F–öæÂF6†W2Ö’÷fW&Æà ¢22ãƒsræF—fR7–Æ–æFW"Ug2…’’(	BW6W"53##bÓÓ` ¢Ò·…ÒW6W#ƒsb52&÷FV7FVC²&÷‚õÆæ"öæF—fRc2öVF—F÷"ö†—7F÷'’ôäôÔB&6R&WF–æVBà¢Ò·…ÒW&–v‡B6Æ÷6VB7–Æ–æFW#¢öæRÖV7W&VBÖVFvR7G&—÷Gvò62ÂFWFW&Ö–æ—7F–26VÒÂæF—fRöæR×7FW†—7F÷'’öæòÖ÷à¢Ò·…ÒöFB&–æw2ö†V–v‡B&æG2÷6–FR¶6FVç6—G’ÂvVöÖWG'’÷VW"ö—6ÆæB—6öÆF–öâæBwV&FVB&VgW6Ç2à¢Ò·…ÒgVÆÂÆö6Ã#3s…52ód”Âó6¶—²æF—fRtÄ"&W6W'fW2ÆÂ6VÒ¶6Ubf&–çG3²–×÷'FVBöÆR×vVÆBF‚Væ6†ævVC²7GVÂäôÒ÷&ö¦V7BôtÄ"6†V6·2à¢Ò·…ÒW&–v‡B7–Æ–æFW"õ7V$Böfb(i"ÖW6‚†VÇFŽ(i%Ug>(i$7–Æ–æFW"Ug2…’ž(i$÷VâUbVF—F÷#¢7G&—ÇW2Gvò62à¢Ò·…ÒVæ6–ÂÖVF—B6–FRö66W&FVÇ“²÷F†W"—6ÆæG2f—†VBâVæFòõ&VFòæB&WVFVBÖ–ær&V†fR6÷'&V7FÇ’à¢Ò·…Ò6fRô÷Vâæ&÷†Æ"(i"UbVF—F÷"(i"f–ÆRäôÔB&6R&WF–ç2Æ–÷WB÷6V×3²&6RtÄ"Ç6ò&WF–ç26VÒö62à¢Ò·…ÒW†—7F–ær&÷‚õÆæ"æB–×÷'FVBUbv÷&¶fÆ÷w27F–ÆÂ&V†fR266WFVBà ¥&÷VæBÆ–væVBv÷&ÆBÕ’&–æw2f—'7C²æòvVæW&Â6VÒVçw&öVÆÆ—F–2Ö–ær÷–çF–æröWfÇVFVBUg2à ¢22ãƒsrV&Æ–6F–öâfW&–f–VB(	B##bÓÓ` ¥'VçF–ÖR&VÆV6RSCV66ffC3“C#“ƒ&Fc#VC“Cc6FS–#sCfSVSF²FW7FVBG&VR3ƒs&V3cCvc†sƒ†c##vCC†3f6f3SCS“#3vC3#†ÖF6†VBfWF6†VBÖ–âW†7FÇ’â7GVÂæöFR#"F÷öÆöw’4’'Vâ3ƒƒcS“““bò¦ö"cƒSƒƒ3Sc37V66VVFVC¢¢£#3s‚52òd”Âò6¶—VB¢¢âvW2'Vâ3ƒƒcS““s2'V–ÆBæBFWÆ÷’7V66VVFVBâg&W6‚Æ—fR6†VÆÂÂÖæ–fW7BÂÖW6‚†VÇF‚öVF—BôtÄ"æVÂãƒsrÂVæ6†ævVBUbv÷&·76RãƒsBÂæF—fRäôÒ6÷&RãƒcRÂ&÷FV7FVB×VÇF’ããÂæBg&÷¦Vâ&WFÓrfW'6–öâÆÂ'—FRÖÖF6†VB&W÷6—F÷'’f–ÆW2à ¥W6W"ãƒsb52&VÖ–ç2&÷FV7FVBâF†RãƒsrFWf–6RvFR&VÖ–ç2VæF–æs¢W&–v‡B&÷VæBv÷&ÆBÕ’7–Æ–æFW"Ug2Â–æFWVæFVçBVæ6–ÂVF—G2ÂVæFòõ&VFòÂ&ö¦V7BW'6—7FVæ6RÂäôÔB&6RæBæF—fRtÄ"6VÒ6†V6·2âæòvVæW&ÂVçw&ÂVÆÆ—F–2Ö–ærÂ–çF–ærÂ÷"WfÇVFVBÖÖöF–f–W"Ub6Æ–ÒâÆÂf÷W"6öçF–çV—G’Fö7VÖVçG2&R7W'&VçBà  ¢22ãƒs‚UbVF—F÷"6†V6¶W"&VfW&Væ6R(	BW6W"53##bÓÓ` ¢Ò·…ÒW6W"ãƒsr52&÷FV7FVC²7–Æ–æFW"ô&÷‚õÆæ"ö–×÷'FVBæF—fR†—7F÷'’÷&ö¦V7BöW‡÷'B&6VÆ–æW2&WF–æVBà¢Ò·…Ò6†&VB&VæFW&W"&ö¦V7F–öâ÷–6¶–ærôE"&—G’Â6Æ—VB&÷VæFVC#Sf6VÆÇ2ÂW‡G&VÖR÷F–ÆVBööfg67&VVâ÷7FÆRwV&G2à¢Ò·…Ò6†V6¶W"VæFW"—6ÆæB6VÆV7F–öâ÷6V×3²–ÆöB÷&W÷'B&VBÖöæÇ“²æòVF—Bö†—7F÷'’6ÆÆ&6²g&öÒFövvÆRà¢Ò·…Ò7GVÂv÷&·76R6æ6VÇ2VæF–ærVæ6–Âö6GW&RÂ&WF–ç2f–Wr÷6VÆV7F–öâÂ&Vg&W6‚&VfW&Væ6RÂ&V÷Vâöfbà¢Ò·…ÒgVÆÂÆö6ÂæöFS#C£#3ƒ52ód”Âó6¶—â÷&–v–æÂUbVF—BÖF‡2öW‡÷'B÷&VæFW"ö¶W&æVÂ÷væW'2Væ6†ævVBà¢Ò·…Ò÷VâUbVF—F÷"(i"6†V6¶W#¢&VF&ÆSl9sbw&–B–ç6–FRF–ÆS(	3²FövvÆRöfb&W7F÷&W2Æ–âf–Wrà¢Ò·…Òâ÷–æ6‚ò²þ(‰"ôf—C¢w&–BæBUbF–ÆR7F’Æ–væVBÂ6VÆV7F–öâ7F—2W6&ÆRà¢Ò·…ÒVæ6–ÂÖ÷fRõ66ÆRõ&÷FFRæBVæFòõ&VFòv÷&²v—F‚6†V6¶W#²w&–B7F—2f—†VBv†–ÆR—6ÆæG2Ö÷fRà¢Ò·…Ò&6²Fó4BæB&V÷Vã¢6†V6¶W"FVfVÇG2öfc²÷&F–æ'’f–Ww÷'Bæf–vF–öâv÷&·2à £$B&VfW&Væ6RöæÇ“²4BFW‡GW&R÷7G&WF6‚–ç7V7F–öâæB–çF–ær&VÖ–âÆFW"7FvW2à ¢22ãƒs‚V&Æ–6F–öâfW&–f–VB(	B##bÓÓ` ¥&VÆV6Rv#v6c#sSS3s“S“C3vfCc3“3cs#vcFF²FW7FVBG&VRVc–Sv#cScfc63fS3†V#“3ƒ3“c6ccS6S3fW†7FÇ’ÖF6†W2fWF6†VBÖ–ââ7GVÂæöFS#"4“3ƒƒcsC#s’ö¦ö#cƒc3#“Cc#5T44U52¢£#3ƒ52òd”Âò6¶—VB¢£²vW33ƒƒcsCƒƒ'V–ÆBöFWÆ÷’5T44U52âg&W6‚Æ—fR6†VÆÂöÖæ–fW7BÂÖW6„†VÇF‚÷v÷&·76Rö–ç7V7F÷"öVF—Cƒs‚ÂVæ6†ævVBtÄ"æVÃƒsr÷&÷FV7FVB×VÇF“ãög&÷¦Vä&WFrfW'6–öâ'—FRÖÖF6‚&W÷6—F÷'’âæF—fRäôÓƒcRÂÖævW"ö6öFV2÷&W6÷W&6W3ƒsRöæcƒc‚æB&÷FV7FVBÖöFVÆÆ–ær÷væW'2Væ6†ævVBâÆÂf÷W"6öçF–çV—G’Fö7VÖVçG27W'&VçBâW6W#ƒsr52&÷FV7FVC³ƒs‚6†V6¶W"&VF&–Æ—G’öæf–vF–öâõVæ6–Âö†—7F÷'’÷&V÷VâFWf–6RvFRVæF–ærâF†—26†V6¶W"—2$B&VfW&Væ6RöæÇ“²4BFW‡GW&R÷7G&WF6‚–ç7V7F–öâ&VÖ–ç2F†RæW‡BVF—FVB7FvRà  ¢22ãƒs’FV×÷&'’4BUb6†V6¶W"f–Wr(	BW6W"53##bÓÓ` ¢Ò·…ÒW6W#ƒs‚52&÷FV7FVC¢$B6†V6¶W"öæf–vF–öâõVæ6–Âö†—7F÷'’÷&V÷Vâà¢Ò·…Ò÷&–v–æÂW‡÷'FW"G&–æwVÆF–öâö6÷&æW"Ö–æs²Æ—fR÷6—F–öç2öæò–×÷'BÖf—B&W7F÷&F–öã²6öæ6fRæB6VÒf&–çG2à¢Ò·…ÒÖ—76–ær÷7FÆR÷'F–Âö–çfÆ–Böæöæf–æ—FRöc3"ö÷fW##²Ö6÷&æW"&VgW6ÂÂ6fRgVÆÂ6öÆ–BfÆÆ&6²à¢Ò·…Ò7GVÂF‡&VR÷fW&Æ’F—7÷6Âöæ6RöâæF—fR6÷W&6RÖvVöÖWG'’6ÆVçW÷"ÖöFR6†ævS²÷&–v–æÂ&öG’vVöÖWG'’÷–6¶–ær&WF–æVBà¢Ò·…Ò7GVÂ&VæFW"7F—fR'&–FvRö–æ7F—fRö&¦V7BöfÆÆ&6²÷6W76–öâÖVæBUb&Vg&W6‚æB7GVF–òô6Æ’&W7F÷&F–öâà¢Ò·…Ò7–Æ–æFW"6VÒ¶6f&–çG2&W6W'fVC²&Wf–WrÆVfW2æF—fRäôÒ'—FW2Væ6†ævVC²ÆÂW‡÷'Bö†—7F÷'’&Vw&W76–öç2&WF–æVBà¢Ò·…ÒgVÆÂÆö6ÂæöFS#C£#3ƒe52ód”Âó6¶—²&Wf–WvVB66†Rw&‚æBÆÂ÷&–v–æÃ‚f–WrÖöFW2&WF–æVBà¢Ò·…Ò7V&^(i$&÷‚Ug2÷"W&–v‡B7–Æ–æFW.(i$7–Æ–æFW"Ug2…’’Â7V$Böfc¢d”U~(i%Ub6†V6¶W"6†÷w26†V6¶W"÷fW"7W&f6Rà¢Ò·…Ò÷&&—B÷â÷–æ6‚&VÖ–âæ÷&ÖÃ²–ç7V7B&÷‚æVÇ2æB7–Æ–æFW"6–FRö66VÒà¢Ò·…ÒUbVF—F÷.(i%66ÆR—6ÆæN(i$&6²Fó4B6†ævW26†V6¶W"6—¦RF†W&S²VæFòõ&VFò&W7F÷&W2—Bà¢Ò·…Òd”U~(i%7GVF–òõ6öÆ–B&W7F÷&W2÷&F–æ'’Æöö³²ÖW6‚v—F†÷WBUg2&VÖ–ç2Æ–â–â6†V6¶W"ÖöFRà ¤&6R7F÷&VBUg2öæÇ’ÂÖ†–×VÓ#Ãf6R6÷&æW'3²WfÇVFVBöÆ–æ¶VB÷&ö6VGW&Â÷7FÆR6†ææVÇ2W6R6öÆ–Bà¥FV×÷&'’f–WröæÇ“²æò–ÖvR–çF–ær÷W'6—7FVçBÖFW&–Ç2öW‡÷'B6†ævW2à ¢22ãƒs’V&Æ–6F–öâfW&–f–VB(	B##bÓÓ` ¥&VÆV6Rf##33“3––V&Sv#“ƒCvfF3ƒ3F#ScVfC&²FW7FVBG&VRs“CƒcV#ƒSVFc33sc6S“3fSSC##C“33Sc“SvW†7FÇ’ÖF6†W2fWF6†VBÖ–ââ7GVÂæöFS#"4“3ƒƒs33Rö¦ö#cƒs“SSS"5T44U52¢£#3ƒb52òd”Âò6¶—VB¢£²vW33ƒƒs#Cƒ'V–ÆBöFWÆ÷’5T44U52âf–æÂg&W6‚Æ—fR6†VÆÂöÖæ–fW7B÷&VæFW"Ö÷væW"÷&Wf–WrÖ6†–ÆBöW‡÷'B×æVÃƒs’ÂVæ6†ævVBv÷&·76Sƒs‚öæF—fRäôÓƒcR÷&÷FV7FVB×VÇF“ãög&÷¦Vä&WFrfW'6–öâ'—FRÖÖF6‚&W÷6—F÷'’â–æ—F–Â&VG2&V6VFVBFWÆ÷–ÖVçB†öÆCƒs‚ö6†–ÆCCB“²f–æÂgVÆÂw&‚ÖF6†W3ƒs’âÆÂf÷W"6öçF–çV—G’Fö727W'&VçBâW6W#ƒs‚52&÷FV7FVC³ƒs’7W&f6R6†V6¶W"öæf–vF–öâõUbVF—N(i'6W76–öâÖW†—Bö†—7F÷'’öÆöö²×&W7F÷&F–öâFWf–6RvFRVæF–ærâ7F÷&VB&6RUg2öæÇ“²Vç7W÷'FVB÷7FÆRö÷fW##²Ö6÷&æW"ö&¦V7G2W6R6öÆ–C²æò–çF–æröWfÇVFVBUb&÷vF–öâ6Æ–Òà  ¢22ãƒƒVÖ&VFFVB6öÆ÷W"Ö–ÖvR&VfW&Væ6R(	BW6W"53##bÓÓ` ¢Ò·…ÒW6W#ƒs’W&fV7B52&÷FV7FVC¢4B6†V6¶W"öæf–vF–öâõVæ6–Â÷6W76–öâ&Vg&W6‚ö†—7F÷'’öÆöö²&W7F÷&F–öâà¢Ò·…Ò7GVÂtÄ"–×÷'FW"–ÖvRöÖFW&–Â6†RæB6öFV2'—FR6öçF–çV—G“²÷&–v–æÂ&W6÷W&6W26†&VB&VBÖöæÇ’à¢Ò·…ÒW6VBÖFW&–ÂUcö6÷&Rärô¥Tr6÷W&6R&W6öÇWF–öã²G&ç6f÷&ÒöW‡FVç6–öâöW‡FW&æÂöÖ—76–ærö&Bö÷fW#„Ô"&VgW6Âà¢Ò·…Ò&÷VæFVC#B&—FÖFV6öFRÂöfb÷6VÆV7Bö6Æ÷6R6ÆVçWÂÆFR&W7VÇB6Æ÷6RÂ6æ6VÆVBÖ&Vf÷&R×7F'B6¶—Â6ÖRÖ–ÖvR&WW6Rà¢Ò·…Ò6†&VB&ö¦V7F–öâõcfW'F–6Â÷&–VçFF–öâÂ6Æ—–æröG&r÷&FW"Â&VBÖöæÇ’&W÷'BæB–6¶–ærõUbÖF‡2Væ6†ævVBà¢Ò·…Ò7GVÂv÷&·76R–ÖvRFövvÆR÷6÷W&6R6†ö÷6W"ÂVæ6–Â6æ6VÆÆF–öâ÷f–Wr·6VÆV7F–öâ&WFVçF–öâÂæF—fR÷Æ–âF—6&ÆVBà¢Ò·…ÒgVÆÂÆö6ÂæöFS#C£#3“52ód”Âó6¶—²7W&f6R6†V6¶W"÷&VæFW"öW‡÷'B÷&÷FV7FVBög&÷¦Vâ÷væW'2&WF–æVBà¢Ò·…Ò–×÷'BtÄ"v—F‚VÖ&VFFVB&6RÖ6öÆ÷W"–ÖvR…7Æ—Bw&÷W2öfb’(i"UbVF—F÷.(i$–ÖvS¢–ÖvR&V†–æBUg2Â6÷'&V7B÷&–VçFF–öâà¢Ò·…Òâ÷–æ6‚ôf—C²Væ6–ÂÖ÷fRõ66ÆRõ&÷FFR÷fW"7FF–öæ'’–ÖvRÂVæFòõ&VFó²÷&–v–æÂ6†V6¶W"7F–ÆÂv÷&·2à¢Ò·…Ò–b×VÇF—ÆR6ö×F–&ÆRÖFW&–Ç2W†—7BÂ–ÖvR6†ö÷6W"6†ævW2&VfW&Væ6S²&6²Fó4B÷&V÷VâFVfVÇG2–ÖvRöfbà¢Ò·…Ò6fRô÷Vâæ&÷†Æ"(i"UbVF—F÷.(i$–ÖvR7F–ÆÂv÷&·3²Æ–âöæF—fRÖW6†W2¶VW–ÖvRF—6&ÆVBà ¥v†öÆR6VÆV7FVB6÷W&6RÖ–ÖvR&VfW&Væ6R–âF–ÆS(	3Âæ÷BW"Öf6RÖFW&–Âõ%"&VæFW&–ærÂw&–ærÂ4B–ÖvRFW‡GW&–ær÷"–çF–ærà¤öæÇ’VÖ&VFFVBärô¥TrUcv—F†÷WBFW‡GW&RG&ç6f÷&×2Â(šC„Ô"6÷W&6S²&VfW&Væ6RFV6öF–ær&WV—&W2'&÷w6W"7&VFT–ÖvT&—FÖà  ¢22ãƒƒ7F—fRÖö&¦V7BUb–ÖvR7W&f6R(	BW6W"53##bÓÓ` ¢Ò·…ÒãƒƒW&fV7B52&÷FV7FVC¢–ÖvR&VfW&Væ6Rö÷&–VçFF–öâõVæ6–Âö6†ö÷6W"÷&ö¦V7BW'6—7FVæ6Rà¢Ò·…Ò6–ævÆR×W6VB÷VR–ÖvRöÖFW&–Â÷6×ÆW"wV&G2Â6öFV2÷&W6÷W&6R&VBÖöæÇ’–FVçF—G’à¢Ò·…Ò&VÂF‡&VR6÷W&6RUg2Âc÷&–VçFF–öâÂ5$t"öÆ–æV"f7F÷"Âw&öf–ÇFW"öF÷V&ÆR×6–FRÖ–ærà¢Ò·…Ò÷&–v–æÂ6÷W&6RvVöÖWG'’÷–6¶–ær&WF–æVC²vVöÖWG'’öÖFW&–Â÷FW‡GW&Rö&—FÖF—7÷6VBöæ6Rà¢Ò·…Ò7–æ26æ6VÆÆF–öâÖ&Vf÷&R×7F'BÂÆFR&W7VÇG2ÂFV6öFRf–ÇW&RæBÖöFR÷&V'V–ÆB6ÆVçWà¢Ò·…Ò7GVÂ&VæFW"7F—fRÖöæÇ’ô&6RwV&G2Â–æ7F—fR6öÆ–BÂUb6W76–öâ&Vg&W6‚æBÆöö²&W7F÷&F–öâà¢Ò·…ÒæF—fRäôÒ÷&ö¦V7Bö–ÖvR'—FW2æBtÄ"Ug2&WF–æVC²gVÆÂÆö6Ã#3“e52ód”Âó6¶—à¢Ò·…Ò6–ævÆRÖÖFW&–ÂFW‡GW&VBtÄ"õ7V$Böfb(i"d”U~(i%Ub–ÖvS¢6öÆ÷W"–ÖvR6÷'&V7FÇ’÷&–VçFVBöâ7F—fRö&¦V7C²÷&&—B÷â÷–æ6‚æ÷&ÖÂà¢Ò·…ÒUbVF—F÷.(i%Væ6–ÂÖ÷fRõ66ÆR—6ÆæN(i$&6²Fó4C¢7W&f6RWFFW3²VæFòõ&VFò&W7F÷&W2Æ–÷WBà¢Ò·…Òd”U~(i%7GVF–òõ6öÆ–B&W7F÷&W2÷&F–æ'’Æöö²â7v—F6‚7F—fRö&¦V7C¢öæÇ’7F—fR7W÷'FVBö&¦V7B&V6V—fW2–ÖvRà¢Ò·…ÒÆ–âöæF—fRöÖ—†VBÖÖFW&–Âõ7V$Bö&¦V7G2&VÖ–â6öÆ–C²W†—7F–ærUb6†V6¶W"æBUbVF—F÷"–ÖvR7F–ÆÂv÷&²à ¥FV×÷&'’VæÆ—B7F—fR&6R–ç7V7F–öâöæÇ’ÂöæR÷VRVÖ&VFFVBärô¥TrUcÖFW&–ÂÀ®(šC„Ô"6÷W&6Ró#L+"&—FÖó#²6÷&æW'2âæò–çF–ær÷"W'6—7FVçBÖFW&–ÂöW‡÷'B6†ævW2à  ¢22ãƒƒ"W†7Bf6RÖÖFW&–ÂUb–ÖvR(	BW6W"53##bÓÓ` ¢Ò·…ÒW6W#ƒƒU$dT5B52&÷FV7G27F—fRÖ–ÖvRöæf–vF–öâõVæ6–Î(i'7W&f6Rö†—7F÷'’öÆöö²&W7F÷&F–öâà¢Ò·…Ò7GVÂtÅDdÆöFW"÷'6W"76ö6–F–öç2&W6W'fR&WfW'6VB”G2v—F‚–FVçF–6ÂÖFW&–ÂæÖW2F‡&÷Vv‚Æöv–6ÂÖW&vR÷vVÆB÷VB–×÷'Bà¢Ò·…Ò&VÖ÷fVBÖf6R”G2G&÷6÷'&V7FÇ“²7&÷72ÖÖFW&–ÂWVÂÖæÖRG&–ævÆW26ææ÷BÖW&vS²6ÖRÖÖFW&–ÂVBF‚&WF–æVBà¢Ò·…ÒW†7B÷F–öæÂ–ÆöBÖ–ær÷6–væGW&R7W'f—fW2W†—7F–ær6öFV3²ÆVv7’f–ÆW2æWfW"wVW7276–væÖVçG2à¢Ò·…Ò÷&–v–æÂ&Wf–WrvVöÖWG'’ÖFW&–Â6Æ÷G2Æ–vâv—F‚G&–ævÆR÷6—F–öç2õUg3²7FÆRö&BÖ2&VgW6S²÷&F–æ'’6†V6¶W"öW‡÷'Bw&÷W–ærVæ6†ævVBà¢Ò·…Ò&VÂF‡&VR×VÇF’×6Æ÷B–ÖvRöf7F÷"÷6×ÆW"Ö–ærÂ6W&–ÂÆÂ×&VG’F—7Æ’Â6æ6VÆÆF–öâöf–ÇW&Rö'VFvWG2æBW†7BÖöæ6RF—7÷6Âà¢Ò·…Ò7GVÂf–ÆRtÄ"6ÆÆ&6²7WÆ–W276ö6–F–öç3²VF—F&ÆRô$¢6ÆÆ&6²&VÖ–ç2–æFWVæFVçBà¢Ò·…ÒgVÆÂÆö6Ã#C%52ód”Âó6¶—²ÆÂ&–÷#ƒƒóƒƒóƒs’6VÖçF–2FW7G2&WF–æVBà¢Ò·…Òe$U4‚–×÷'BtÄ"v—Fƒ.(	3B÷VRVÖ&VFFVBÖ–ÖvRÖFW&–Ç2Â7Æ—Bw&÷W2ôdbõ7V$Bôdb(i"Ub–ÖvS¢F—7F–æ7B–ÖvW2ö67W’6÷'&V7Bf6R&V2à¢Ò·…ÒVæ6–ÂUbVF—N(i$&6²Fó4BWFFW2ffV7FVB&V3²VæFòõ&VFò&W7F÷&W2F†VÒâ÷&&—B÷â÷–æ6‚Væ6†ævVBà¢Ò·…Ò6fRô÷Vâæ&÷†Æ"&WF–ç2×VÇF’ÖÖFW&–ÂUb–ÖvR76–væÖVçC²7v—F6‚7GVF–òõ6öÆ–BæB&6²6fVÇ’à¢Ò·…ÒW†—7F–ær6–ævÆRÖÖFW&–ÂtÄ"7F–ÆÂv÷&·3²Vç7W÷'FVBöÆVv7’Ö—†VBÖÖFW&–Â–çWG2&VÖ–â6öÆ–Bà ¤g&W6‚–×÷'B&WV—&VBf÷"öÆBÖ—†VBÖÖFW&–Â&ö¦V7G2â7F—fR&6RöæÇ’ÂÖƒB÷VP¦–ÖvRÖFW&–Ç2ó„Ô"Væ6öFVBvw&VvFRó#L+"W"FV6öFS²ÆÂÖ÷"Õ6öÆ–Bâæò–çF–ær÷ §W'6—7FVçBÖFW&–Â6†ævW2âW†—7F–ær×VÇF’ÖÖFW&–ÂtÄ"õUEUBF6†W"&W—"&VÖ–ç0§6W&FS³ƒƒ"&Wf–Wrö6öFV2FW7G2Fòæ÷B6Æ–ÒF†BW‡÷'B&÷WFR—2&W—&VBà  ¢22ãƒƒ2W†7BtÄ"ÖFW&–Â†æFöfb(	BFWf–6RvFRVæF–æp ¢Ò·…Òãƒƒ"52&÷FV7FVB–æ6ÇVF–ær–çFVçF–öæÂ7F—fRÖöæÇ’–ÖvRf–Ws²æF—fRÖ—76–ær×FW‡GW&R&W÷'B—26W&FRf–ÇW&Rà¢Ò·…Ò7GVÂF‡&VRtÄ"G&–ævÆRöÖFW&–ÂõUbÖ–æræB÷&–v–æÂw&÷WF&ÆRô”G2&WF–æVB7&÷72ÖFW&–Â7Æ—G2à¢Ò·…Ò×VÇF—ÆRö&¦V7G2&WF–âF—7F–æ7BvÆö&ÂÖFW&–Â÷FW‡GW&R&6W2WfVâv—F‚–FVçF–6ÂæÖW2à¢Ò·…Òf–æÂVÖ&VFFVB–ÖvR'—FW2Âf—fR6÷&RFW‡GW&R6Æ÷G2÷6×ÆW'2öÆ–væÖVçBfW&–f–VC²æöFR&—fFRfW&–f–6F–öâ–çWBfö–G2–ÖvRFV6öF–æröæÇ’à¢Ò·…Ò6VÆV7FVBUbVF—B²&W6÷W&6R&ö¦V7B&÷VæGG&—&WF–ç2W†7BtÄ"ÖFW&–ÂÖ–ærà¢Ò·…ÒÖ—76–ær÷7FÆRö–çfÆ–BöWfÇVFVB×VÇF’ÖÖFW&–Â76–væÖVçG2&VgW6S²f–ÇW&R6ÆVçWæB7V'6WVVçBfÆ–BW‡÷'B72à¢Ò·…ÒgVÆÂÆö6Ã#Cu52ód”Âó6¶—²æF—fRäôÓƒcRw&—FW"öFöæ÷"æB&÷FV7FVBög&÷¦Vâ'—FW2Væ6†ævVBà¢Ò²Òf–ÆRf÷&ÖBtÄ"²&6R(i"W‡÷'Bõ6fR(i"æöÖC¢6÷'&V7B–ÖvRöâV6‚&Vv—F‚÷&–v–æÂf6Vw&÷W2à¢Ò²ÒVæ6–ÂUbVF—N(i$&6RtÄ.(i$æöÖB&WF–ç2æWrUbÆ–÷WBæBÖFW&–ÂÆ6VÖVçBà¢Ò²Ò6fRô÷Vâæ&÷†Æ.(i$&6RtÄ"&WVG26÷'&V7FÇ“²÷&F–æ'’6–ævÆR÷Æ–âtÄ"&VÖ–ç266WFVBà ¢22õTâæF—fRf–Æ^(i$äôÔBFW‡GW&RöÖ—76–öâ(	BW6W"&W÷'C##bÓÓ` ¢Ò·…ÒW6W"W‡Æ–6—FÇ’6öæf—&×2æF—fRf–Æ^(i$äôÔB‚ææöÒ’Âæ÷BtÄ#²Ug27W'f—fRÂ–ÖvW2Fòæ÷Bà¢Ò·…ÒVF—B&÷fW2w&—FW#ƒcRÆ6·2–×÷'FVB–ÖvR6W&–Æ—¦F–öã²Föæ÷"†2æòFW‡GW&Rö–ÖvR&V6÷&G2à¢Ò·…ÒW6W"7WÆ–VBFW‡GW&VBæF—fRFöæ÷#³ƒƒBVF—G2W†7B–ÖvRöÖFW&–Âö†VFW"6öçfVçF–öç2à¢Ò·…Òf—'7B6–ævÆRÖÖFW&–Â6öÆ÷W"Ö–ÖvR–×ÆVÖVçFF–öãƒƒBföÆÆ÷w2Föæ÷"ö'—FR÷&W6÷W&6RFW7G3²gVÆÂ%"÷W"Öf6RæF—fRÖFW&–Ç2&VÖ–âVæF–ærà¢Ò·…ÒW6W#ƒƒB5266WG2æF—fR6öÆ÷W"Ö–ÖvRFW‡GW&W2ÇW3ƒcRUg3²FF—F–öæÂÖ6Æ÷G2G&6¶VB6W&FVÇ’à £ƒƒ2tÄ"&W—"—2äõB66WFæ6R÷&W—"öbæF—fRFW‡GW&RW‡÷'BâFòæ÷B–æfW"äôÐ¦–ÖvR7W÷'Bg&öÒtÄ"f–æÂÖ'—FR76W'F–öç2÷"æF—fRUbÖöæÇ’FW7G2à  ¢22ãƒƒBæF—fR6öÆ÷W"Ö–ÖvRW‡÷'B(	BW6W"53##bÓÓ` ¢Ò·…Ò&VÂFöæ÷"66†VÖö†VFW#rö–ÖvRFW67&—F÷'2öÖFW&–Â6öÆ÷W"6Æ÷BW‡G&7FVBÂ4„&÷fVææ6R&V6÷&FVC²æò&—fFR—†VÇ26†—VBà¢Ò·…Ò7GVÂFöæ÷#ãDÔ"¥Tr&WF–æVB'—FRÖf÷"Ö'—FRF‡&÷Vv‚æF—fRw&—FW"VF—Bà¢Ò·…Ò÷&–v–æÂärô¥Tr–ÖvR'—FW2ÂæF—fRÆ–æ·2õ$t"f7F÷'2öÆ–væÖVçBö&÷VæG3²UbövVöÖWG'’f–VÆG2Væ6†ævVBà¢Ò·…Ò×VÇF—ÆR6–ævÆRÖÖFW&–Â6öÆ÷W&VB÷Æ–âö&¦V7G2ÂæF—fRÖÆö6Â–ÖvRFVGWÂÖFW&–ÂöÖW6‚öfg6WG2æB6÷VçG26÷'&V7Bà¢Ò·…Ò6VÆV7FVBUbVF—B²&W6÷W&6R&ö¦V7B&÷VæGG&—&WF–âæF—fR6öÆ÷W"'—FW3²÷&–v–æÂ66VæR–ÆöBVæ6†ævVBà¢Ò·…ÒVç6fRÖFW&–Ç2õUg2÷6×ÆW'2öÖ—76–ærö÷fW'6—¦Rövw&VvFR–ÖvR'VFvWB&VgW6R6ÆV&Ç’à¢Ò·…Ò5ETÂf–ÆRäôÔB7F–öâF÷væÆöG2ææöÒ–ÖvRÖ&V&–ær'—FW2æB&W÷'G26öÆ÷W"–ÖvR6÷VçBà¢Ò·…ÒæòÖ–ÖvR&Wf—6–öãböæF—fRUbFW7G2&WF–æVC²gVÆÂÆö6Ã#C%52ód”Âó6¶—à¢Ò·…ÒôäR÷VR–ÖvRÖÖFW&–ÂtÄ"ÂUcöFVfVÇB&WVB6×ÆW"õ7V$Böfb(i"f–Æ^(i$äôÔC¢–ÖvRf—6–&ÆRæB6÷'&V7FÇ’Æ–væVB–âæöÖBà¢Ò·…ÒVæ6–ÂÖVF—BöæR—6ÆæB(i"f–Æ^(i$äôÔB&WF–ç2Ö÷fVBUg2æB–ÖvS²÷&–v–æÂvVöÖWG'’öf6Vw&÷W2&WF–æVBà¢Ò·…Ò6fRô÷Vâæ&÷†Æ"(i"f–Æ^(i$äôÔB&WVG3²÷&F–æ'’Æ–âÖW6†W27F–ÆÂ÷Vâæ÷&ÖÆÇ’à ¤d•%5B4ôÄõU"7FvRöæÇ’âæF—fRæ÷&ÖÂ÷&÷Vv†æW72öÖWFÆæW72öF—7Æ6VÖVçB–ÖvRÖ2æ@§W"Öf6R×VÇF—ÆRÖFW&–Ç2&RäõB–×ÆVÖVçFVBâæF—fRf—7VÂ7V66W72—2æ÷B&÷fVà¦'’f–æÂÖ'—FR76W'F–öç3²6÷W&6^(šC„Ô"ÂF÷FÎ(šC#DÔ"Âö'6W'fVBæF—fR&Wf—6–öãrf÷"–ÖvW2à  ¢22ãƒƒRæF—fRæ÷&ÖÂ²VÖ—76—fRÖ2(	B6ÖÆÆW"Ö66R53²gVÆÂÖÖFW&–Âd”Â&W6öÇfVBöãƒƒp ¢Ò·…ÒW6W#ƒƒB52&÷FV7FVC¢æF—fR6öÆ÷W"–ÖvRöÆ–væÖVçBõVæ6–ÂUb&WVB÷&ö¦V7B&V÷Vâà¢Ò·…ÒgVÆÂÖFW&–ÂFöæ÷"66†VÖ÷&÷fVææ6R&V6÷&FVC²&—fFR—†VÇ2öf–ÆRæ÷B6†—VBà¢Ò·…Ò6†&VBVÖ&VFFVBÖ–ÖvRöÖFW&–ÂwV&G2&W6W'fR&–÷#ƒƒ(	3ƒƒB6†ö–6R÷&Wf–WröæF—fR&V†f–÷"à¢Ò·…Ò&VÂæF—fRÖ6Æ÷G2Â÷&–v–æÂärô¥Tr'—FW2Âæ÷&ÖÂ66ÆRöFVfVÇE’6öçfVçF–öâÂVÖ—76—fR$t"öFVfVÇG2à¢Ò·…Òæ÷&ÖÂÖöæÇ’öVÖ—76—fRÖöæÇ’ÖFW&–Ç2v÷&²v—F†÷WBf¶R6öÆ÷W"–ÖvW2à¢Ò·…Ò7&÷72×6Æ÷Böö&¦V7B–ÖvRFVGWÂÖFW&–ÂÆ–æ·2ö6÷VçG2ööfg6WG2æBVæ6†ævVBUbövVöÖWG'’'—FW2à¢Ò·…ÒVç7W÷'FVB6÷W&6R÷G&ç6f÷&ÒõUb÷6×ÆW"öf7F÷"ö'VFvWG2&VgW6S²6÷W&6R&W6÷W&6W2Væ6†ævVBà¢Ò·…Ò7GVÂf–ÆRäôÔB7F–öâ²6VÆV7FVBUb÷&ö¦V7BW'6—7FVæ6R²7FGW26÷VçFW'2fW&–f–VBà¢Ò·…Ò&VÂFöæ÷"æ÷&ÖÃÃ#C‚Ãƒs$"æBVÖ—76—fS"ÃsSD"†6†W2&WF–æVBF‡&÷Vv‚æF—fRw&—FW"VF—Bà¢Ò·…ÒgVÆÂÆö6Ã#Cu52ód”Âó6¶—²÷&–v–æÂFW7G2÷&÷FV7FVBög&÷¦VâöæF—fRFöæ÷"&WF–æVBà¢Ò·…Ò–×÷'BöæRÖÖFW&–ÂtÄ"v—F‚æ÷&ÖÂöVÖ—76—fRÖ2Â7V$Böfn(i$f–Æ^(i$äôÔC¢6Æ÷G2÷VÆFVBæBf—6–&ÆR'V×öVÖ—76–öâ6÷'&V7B–âæöÖBà¢Ò·…ÒVæ6–ÂUbVF—N(i$äôÔB¶VW2ÖÆ–væÖVçC²÷&–v–æÂ6öÆ÷W"Ö–ÖvR&V†f–÷"&WF–æVBà¢Ò·…Ò6fRô÷Vâæ&÷†Æ.(i$äôÔB&WVG2v—F‚æ÷&ÖÂöVÖ—76—fR&W6÷W&6W2–çF7Bà ¤VÖ—76—fRVffV7BföÆÆ÷w26÷W&6R$t"f7F÷"†FVfVÇF&Æ6²’â&÷Vv†æW72öÖWFÆæW726¶V@¦6†ææVÂ6öçfW'6–öâÂF—7Æ6VÖVçB6÷W&6R&–æF–æræBæF—fRW"Öf6R×VÇF’ÖÖFW&–Ç0§&VÖ–âVæF–ærâ„E"ÖFW&–ÂW‡FVç6–öç2&VÖ–âVç7W÷'FVB–âæF—fRÖ&÷WFRà  ¢22ãƒƒbæF—fR&÷Vv†æW72²ÖWFÆæW72(	BgVÆÂÖÖFW&–Â&Æö6¶W"&W6öÇfVBö66WFVBöãƒƒp ¢Ò·…ÒW6W#ƒƒR52&÷FV7FVC¢æ÷&ÖÂöVÖ—76—fR7G&VæwF‡2öÆ–væÖVçBõUb÷&ö¦V7C²6öÆ÷W#ƒƒBæBæF—fRUcƒcR&WF–æVBà¢Ò·…Ò÷&–v–æÂ6¶VB&Vb&W6öÇfW"æBæF—fRw&—FW"&WF–æVC²w&VVî(i'&÷Vv†æW72ö&ÇV^(i&ÖWFÆæW72Â÷&–v–æÂ&W6öÇWF–öâÂ6W&FRFöæ÷"6Æ÷G2öf7F÷'2à¢Ò·…Ò7GVÂW"×—†VÂVç6¶–ær÷fÆ–Bär5$2¶–æfÆFRöæF—fR–ÖvR'—FW3²vVöÖWG'’õUbf–VÆG2æB6÷W&6R&ö¦V7B&W6÷W&6W2Væ6†ævVBà¢Ò·…ÒÆÂf—fR6÷&RÖ6Æ÷G26öW†—7C²6÷W&6RÖ'VffW"6öçfW'6–öâöæ6R7&÷72ö&¦V7G3²æF—fRFVGWööfg6WG2ö6÷VçG2æBf7F÷"FVfVÇG2wV&FVBà¢Ò·…Ò6VÆV7FVBUb÷&ö¦V7B6öçF–çV—G’æB6æ6†÷BÖ&Vf÷&RÖv—B—6öÆF–öâg&öÒöævö–ær66VæRVF—G2à¢Ò·…Ò6÷W&6RõUb÷6×ÆW"öf7F÷"ö&—BÖFWF‚öF–ÖVç6–öç2ö÷&–VçFF–öâöÇ†öVæ6öFVB¶vw&VvFR'VFvWG2&VgW6S²æò6–ÆVçB6¶VBÖÖÆ÷72à¢Ò·…Ò&—FÖö6çf26ÆVçWöâf–ÇW&S²¥Tr†VFW"6†V6·2æBDôÒ6çf2÷Fô&Æö"fÆÆ&6³²'&÷w6W"G&ç7÷'BFFVB–âæöFRà¢Ò·…Ò5ETÂf–ÆRäôÔBv—G2ÂF÷væÆöG2&VÂæF—fRäw2Â&W÷'G26÷VçG2æB&W7F÷&W2'WGFöâöâf–ÇW&S²&–÷"7F–öâ6VÖçF–72&WF–æVBà¢Ò·…ÒgVÆÂÆö6Ã#C#E52ód”Âó6¶—²&Wf–WvVB66†Rw&ƒ²&÷FV7FVBÖöFVÆÆ–ærô×VÇF’ög&÷¦Vâ&WF2öæF—fRFöæ÷"Væ6†ævVBà¢Ò·…ÒöæR÷VRÖÖFW&–ÂtÄ"v—F‚6¶VB&÷Vv†æW72öÖWFÆæW7>(šC#CŒ+"Â7V$Böfn(i$f–Æ^(i$äôÔC¢6W&FR&÷Vv†æW72ôÖWFÆæW726Æ÷G2æB6÷'&V7BvÆ÷77’öÖGFRöÖWFÆÆ–2&Vv–öç2à¢Ò·…Ò6öÆ÷W"öæ÷&ÖÂöVÖ—76—fR7F–ÆÂ&W6VçBæB6÷'&V7FÇ’Æ–væVC²Væ6–Â—6ÆæBVF—N(i$äôÔB&WVB¶VW2WfW'’ÖÆ–væVBà¢Ò·…Ò6fRô÷Vâæ&÷†Æ.(i$äôÔB&WVG2v—F‚&÷Vv†æW72öÖWFÆæW72Ö2–çF7C²Æ–âÖW6‚7F–ÆÂ÷Vç2æ÷&ÖÆÇ’à ¤6öçfW'6–öâ7W÷'G2÷VS‚Ö&—BVÖ&VFFVBärô¥TrÂæòU„”böU„–b÷&–VçFF–öâÖWFFFÀ¥UcöFVfVÇB&WVB6×ÆW"ÂöæRÖFW&–ÂW"ö&¦V7Bâ6÷W&6^(šC„Ô"ÂFW&—fVN(šC„Ô"ö–ÖvRÀ¦æF—fR–ÖvRvw&VvF^(šC#DÔ"âæò&W6×Æ–ærövÖÖöf7F÷"&¶–æs²66Æ"×VÇF—Æ–W'27F÷&V@¦–âæF—fRf7F÷%&÷Vv†æW72ôÖWFÆæW72â&VÂ6f&’ôæöÖBV&æ6R&VÖ–ç2FWf–6RvFRà¤F—7Æ6VÖVçB&–æF–ærÂæF—fRW"Öf6RÖFW&–Ç2æBäôÒ–×÷'B&VÖ–âVæ–×ÆVÖVçFVBà  ¢22ãƒƒrÆ&vRæF—fR6öÆ÷W"–ÖvRò&ö¦V7BfÆ–FF–öâ(	BW6W"53##bÓÓp ¢Ò·…ÒW6W#ƒƒRd”Â67&VVç6†÷Cƒƒb&V6÷&FVC²W†7BeTÄÂÔDU$”ÂævÆ"4„öÖWFFFVF—FVBâV&Æ–W"6ÖÆÆW"Ö52&6VÆ–æW2&÷FV7FVBÂæò&Ææ¶WBgVÆÂÖf–ÆR52à¢Ò·…Ò÷&–v–æÂ–×÷'FW"–ÆöB&W&öGV6W2f–ÇW&S£Ã#Ãc"6öÆ÷W"W†6VVG2–æ†W&—FVC„Ô"&Wf–WrwV&C²öæR÷VRUcöFVfVÇB×6×ÆW"ÖFW&–Â—2÷F†W'v—6R7W÷'FVBà¢Ò·…ÒæF—fR&r6öÆ÷W"öæ÷&ÖÂöVÖ—76—fR÷B–çFòW†—7F–æs#DÔ"vw&VvFS²&Wf–Ws„Ô"ó#L+"æB6¶VC„Ô"ó#CŒ+"Æ–Ö—G2Væ6†ævVBà¢Ò·…ÒW†7B÷&–v–æÂ–ÖvR'—FW2ÂæF—fR6Æ÷G2ööfg6WG2ö6÷VçG2öFVGW³#DÔ"&÷VæF'’ö÷fW'6—¦Rövw&VvFR÷6¶VB×öÆ–7’wV&G2à¢Ò·…Ò÷&–v–æÂ&ö¦V7B&6ScBfÆ–FF÷"æòÆöævW"÷fW&fÆ÷w27F6²öâÆ&vR–ÖvW3²7G&–7BÇ†&WB÷FF–ærö6æöæ–6Â&—G2öÆVæwF‚÷ööÂ÷fW'6–öâ6†V6·2&WF–æVBà¢Ò·…Ò6VÆV7FVBUb÷&W6÷W&6R&WVB²5ETÂf–ÆRäôÔBF÷væÆöFVB'—FW2²5ETÂööÆVBæ&÷†Æ"÷Vâ†æFÆW"72à¢Ò·…Ò7GVÂW6W"Öf–ÆRæF—fRVF—C£VæF—fV–ÖvW2óff6W2óbÃ3Ã“#D"÷WGWC²Væ6†ævVB6öÆ÷W"öæ÷&ÖÂöVÖ—76—fR†6†W2âöffÆ–æR6¶VB7Æ—B—2–ÆÆ÷rÂæ÷B'&÷w6W"f—7VÂ&ööbà¢Ò·…Ò7GVÃRÖ–ÖvRööÆVB&W6÷W&6R&÷VæGG&—#RÃsSÃSST"Væ6öFVBó’Ã3rÃcs"FV6öFVB&WF–ç2ÆÂ6÷W&6R'—FW2à¢Ò·…ÒgVÆÂÆö6Ã#C#…52ód”Âó6¶—²&VçBö6†–ÆB66†R6öçG&7G2&Wf–WvVC²&÷FV7FVBÖöFVÆÆ–ærô×VÇF’ög&÷¦Vâ&WF2&WF–æVBà¢Ò·…Ò7WÆ–VBeTÄÂÔDU$”ÂævÆ"Â7V$Böfn(i$f–Æ^(i$äôÔBF÷væÆöG27V66W76gVÆÇ’æB÷Vç2–âæöÖBv—F‚6öÆ÷W"öæ÷&ÖÂöVÖ—76—fR÷&÷Vv†æW72öÖWFÆæW726Æ÷G2–çF7Bà¢Ò·…ÒVæ6–ÂÖVF—BöæRUb—6ÆæN(i$äôÔB&WF–ç2Æ–væÖVçBöbÆÂ7W÷'FVBÖ2à¢Ò·…Ò6fRô÷VâF†—2FW‡GW&VBæ&÷†Æ"&ö¦V7N(i$äôÔB&WVG2v—F†÷WBfÆ–FF–öâW'&÷'3²÷&F–æ'’6ÖÆÂ÷Æ–âÖW6†W27F–ÆÂW‡÷'Bà ¤Æ&vRÖ–ÖvR&Wf–WrÖ’7F’6öÆ–BVæFW"Væ6†ævVBF—7Æ’'VFvWC²æF—fRW‡÷'B'—FP¦6÷’FöW2æ÷B&WV—&R&VæFW&–ærF†B–ÖvRâ÷6—G’öF—7Æ6VÖVçB6Æ÷G2&VÖ–âVæF–æs°¦ÆFW7B÷VRäôÒFöæ÷"6öæf—&×2÷6—G’5Dõ$tRöæÇ’ÂtÄ"æÖRÖöæÇ’W‡G&2æVVBVF—Bà  ¢22ãƒƒ‚W‡Æ–6—BæöÖBF—7Æ6VÖVçBÖ(	Bd”Ã£#DÔ"–ÖvR'VFvWBöâFWf–6P ¢Ò·…ÒW6W#ƒƒr52&÷FV7G2W†7BeTÄÂÔDU$”ÂæF—fRf—fRÖÖW‡÷'BÂVæ6–ÂUb&WVBæBÆ&vRæ&÷†Æ"6fRô÷Vã²&–÷#ƒƒRóƒƒb&W÷'FVB&Æö6¶W"&W6öÇfVBf÷"F†—266Rà¢Ò·…Ò—&VBtÄ"ôäôÒW‡Æ–6—B6Æ÷B&VfW&Væ6RæB6ÖSbÃ#ÃCS#bÖ&—Bär4„&÷fVã²ÖWFFFÖöæÇ’&÷fVææ6Rf—‡GW&RÂæò&—fFR—†VÇ26†—VBà¢Ò·…Òæò–ÖvRÖæÖRÖöæÇ’wVW76–æs¢W‡Æ–6—BfW'6–öãæöÖBF—7Æ6VÖVçB6Æ÷B²Væ—VRW†7B–ÖvRFVf–æ—F–öâ²Væ—VR6÷&RFW‡GW&RÆ–æ²&WV—&VBà¢Ò·…Ò÷&–v–æÃbÖ&—B–ÖvR'—FW2ôÔ”ÔRööfg6WG2ÂæF—fR6Æ÷B÷7G&VæwF‚öÖ–Gö–çB÷v÷&ÆB6WGF–ærÂvVöÖWG'’µUbf–VÆB'—FW2&WF–æVC²æòFV6öFR÷&VVæ6öFRö&¶Rà¢Ò·…ÒÖ—76–æröÖ&–wV÷W2÷Vç7W÷'FVBöæöâÕUb÷G&ç6f÷&ÖVB÷6×ÆW"öf7F÷"÷7FÆRöWfÇVFVB–çWG2&VgW6S²W†—7F–ærÖFW&–Â÷6÷W&6R÷ööÂwV&G2&WF–æVBà¢Ò·…ÒæF—fRFVGWó#DÔ"vw&VvFR–æ6ÇVFW2F—7Æ6VÖVçC²6¶VBöF—7Æ’öÆ&vR&r6÷W&6R'VFvWG2Væ6†ævVBà¢Ò·…Ò6VÆV7FVBUb÷&ö¦V7B&W6÷W&6R6öçF–çV—G’Â5ETÂf–ÆRäôÔB6—‚×6Æ÷B÷WGWB÷7FGW2æBf–ÇW&R&V6÷fW'“²æò66VæR÷6÷W&6R×WFF–öâà¢Ò·…Ò7GVÂW6W"Öf–ÆR÷&W6÷W&6R×&÷VæGG&—VF—C#"ÃSÃs“$"æF—fRf–ÆRóf–ÖvW2óff6W2&WF–ç2÷&–v–æÂ6öÆ÷W"öæ÷&ÖÂöVÖ—76—fRöF—7Æ6VÖVçB†6†W2æBW†7BæF—fR66Æ"6WGF–æw2à¢Ò·…ÒgVÆÂÆö6Ã#C3552ód”Âó6¶—²æ'&÷r66†Rw&‚&Wf–WvVC²&÷FV7FVBÖöFVÆÆ–ærô×VÇF’öæF—fRFöæ÷"ög&÷¦Vâ&WF'—FW2&WF–æVBà¢Ò²Ò6ÖReTÄÂÔDU$”ÂævÆ"Â7V$Böfn(i$f–Æ^(i$äôÔC¢F—7Æ6VÖVçBFW‡GW&R6Æ÷B÷VÆFVBv—F‚F†R÷&–v–æÂ–ÖvRæB6fVB7G&VæwF‚öÖ–Gö–çB÷v÷&ÆB6WGF–ærà¢Ò²Ò6öÆ÷W"öæ÷&ÖÂöVÖ—76—fR÷&÷Vv†æW72öÖWFÆæW72&VÖ–â–çF7C²Væ6–Â—6ÆæBUbVF—N(i$äôÔB¶VW2F—7Æ6VÖVçBÆ–væVBà¢Ò²Ò6fRô÷Vâæ&÷†Æ.(i$äôÔB&WVG2v—F‚F—7Æ6VÖVçB6Æ÷B÷6WGF–æw2–çF7C²÷&F–æ'’6ÖÆÂ÷Æ–âW‡÷'B7F–ÆÂv÷&·2à ¥6Æ÷B÷6WGF–æw2†æFöfböæÇ“¢æò&÷„Æ"F—7Æ6VÖVçBF—7Æ’övVöÖWG'’&¶R÷"7G&VæwF€¦6ö×Vç6F–öâf÷"–×÷'BÖf—Bö&¶VBö&¦V7B66ÆRãbÖ&—B'—FW2&WF–æVBW†7FÇ’âW‡Æ–6—@¤WFòõUb²–FVçF—G’FW‡GW&RG&ç6f÷&×2öæÇ’â6W&FR÷6—G’–ÖvR—2'6VçBg&öÒF†—0¤tÄ#²æÖVBÖ'WBÖÖ—76–ær÷6—G’—2æ÷BWf–FVæ6RöbW6&ÆR—†VÇ2âvVæW&–2vÅDbF—7Æ6VÖVçBÀ§G&ç7&Væ7’ÂæF—fRW"Öf6RÖFW&–Ç2Â–çF–æræBäôÒ–×÷'B&VÖ–âÆFW"7FvW2à  ¢22ãƒƒ’66Æ"ärVæ6öF–æròæF—fR–ÖvRÖ'VFvWB&W—"(	BW6W"53##bÓÓp ¢Ò·…ÒW6W#ƒƒƒ#DÔ"d”Â&V6÷&FVC²V&Æ–W"öffÆ–æR–ÆÆ÷rÖVæ6öFVB6—¦RW7F–ÖFRF–Bæ÷B&÷fRÆFf÷&Òär÷WGWBf—G2ãƒƒr52&÷FV7FVBà¢Ò·…Ò÷&–v–æÂ6öçfW'FW"æ÷rW6W2&VÂöæRÖ6†ææVÃ‚Ö&—BärVæ6öFW"v—F‚FF—fRf–ÇFW'2ô5$2÷¦Æ–#²æòÆFf÷&Ò$t$är6W&–Æ—¦F–öâÂ&W6—¦RÂvÖÖ÷"Æ÷77’6ö×&W76–öâà¢Ò·…Ò–æFWVæFVçBæöFR5$2ö–æfÆFRö–çfW'6RÖf–ÇFW"6†V6·2&W6W'fRWfW'’rô"—†VÂÂF–ÖVç6–öç2Âf7F÷'2÷6÷W&6R&W6÷W&6W3²&÷VæG2öÖ—76–ær6ö×&W76–öâ’öf–ÇW&R6ÆVçW&WF–æVBà¢Ò·…ÒW†—7F–æsƒƒbFW7G2&WF–â6VÖçF–72æBW6R7GVÂ&öGV7F–öâär'—FW3²ÆFf÷&ÒVæ6öFW"6ÆÇ2¦W&òÂDôÒ6çf2&VF&6²fÆÆ&6²&WF–æVBà¢Ò·…Ò5ETÂf–ÆRäôÔB6—‚ÖÖW‡÷'BB&W÷'FVB6÷W&6R'—FR6—¦W2W6W2&VÂ&öGV7F–öâ6ö×&W76–öâæBf—G3#DÔ#²÷&–v–æÂ6öÆ÷W"öæ÷&ÖÂöVÖ—76—fRöF—7Æ6VÖVçB'—FW2&VÖ–âW†7Bà¢Ò·…ÒæF—fS#DÔ"wV&B7F–ÆÂ&V¦V7G2W†6W726÷W&6W2Â&W÷'G26÷W&6W2ö6öçfW'FVBÖ”"²ö&¦V7B6÷VçC²æò6öçFVçBÖ&6VBFVGW÷"–æ7&V6VBÆ–Ö—G2–×Æ–VBà¢Ò·…Ò7GVÂW6W"¥T~(i'&öGV7F–öâVæ6öFW#§&÷Vv†æW73"Ã3RÃSc„"öÖWFÆæW73Ã“C‚Ã#“#²–æFWVæFVçB–ÆÆ÷rFV6öFR6öæf—&×2ÆÂ—†VÂ'—FW2à¢Ò·…Ò7GVÂ6÷W&6R76WG2öæF—fR—VÆ–æRVF—C¦–ÖvR–ÆöC#"ÃSSrÃS3d"ó#ãSÖ”"v—Fƒ"Ãc‚Ã#ƒ„"†VG&ööÓ²æF—fRf–ÆS#"Ãc#’Ã“Sd"â'&÷w6W"FV6öFR÷&VF&6²FFVC²æòFWf–6R52–æfW'&VBà¢Ò·…ÒgVÆÂÆö6Ã#C3e52ód”Âó6¶—²æ'&÷r66†Rw&‚æB&÷FV7FVBög&÷¦Vâ÷væW'2&WF–æVBà¢Ò·…Ò&W6WB66VæS²–×÷'BeTÄÂÔDU$”ÂævÆ"ôä4S²7V$Böfn(i$f–Æ^(i$äôÔBF÷væÆöG2v—F†÷WC#DÔ"W'&÷"à¢Ò·…ÒæöÖB6†÷w2ÆÂ6—‚6Æ÷G2–æ6ÇVF–ær÷&–v–æÃbÖ&—BF—7Æ6VÖVçC²6öÆ÷W"öæ÷&ÖÂ÷&÷Vv†æW72öÖWFÆæW72öVÖ—76—fRÆ–væÖVçBæB6fVBF—7Æ6VÖVçB6WGF–æw2&WF–æVBà¢Ò·…ÒVæ6–Â—6ÆæBUbVF—N(i$äôÔBæB6fRô÷Vâæ&÷†Æ.(i$äôÔB&WVBæ÷&ÖÆÇ’à ¤–b÷fW&'VFvWB&VÖ–ç2Â6GW&R6ö×ÆWFR6÷W&6W2ö6öçfW'FVBöö&¦V7B'&V¶F÷vââ×VÇF—ÆP¦–æFWVæFVçB–×÷'G26â7F–ÆÂÆVv—F–ÖFVÇ’W†6VVC#DÔ#²ööÂFVGW—2'VffW"–FVçF—G’à¤æò6÷W&6RFW‡GW&R&VGV7F–öâÂF—7Æ6VÖVçB×Æ—GVFR6ö×Vç6F–öâ÷"&÷„Æ"vVöÖWG'’&¶Rà¤÷6—G’æBæF—fR×VÇF’ÖÖFW&–ÂôäôÒ–×÷'B&VÖ–âVæF–ærà  ¢22ãƒ“–FVçF–6ÂæF—fR–ÖvR6öçFVçB(	BW6W"53##bÓÓp ¢Ò·…ÒW6W"ãƒƒ’52&÷FV7G2÷&–v–æÂgVÆÂÖÖFW&–Â6—‚Ö2ÂUb÷&ö¦V7B&WVC²ãƒƒ‚&W÷'FVB'VFvWB66R&W6öÇfVB'“ƒƒ’à¢Ò·…ÒW†—7F–æræF—fRF&ÆRöÆ–÷WB&WF–æVC²–FVçF–6ÂÔ”ÔRöÆVæwF‚ö'—FW26†&R7&÷72–æFWVæFVçB6÷W&6R'VffW'3²æò66VæRö†—7F÷'’÷&W6÷W&6R×WFF–öâà¢Ò·…Ò7GVÂdåb6öÆÆ—6–öâFöW2æ÷BÆ–3²7V&'&—2ÂÔ”ÔRÂF–ffW&VçBæÖW2öWVÂ'—FW2æB6ÖRæÖW2öF–ffW&VçB'—FW26÷fW&VBà¢Ò·…Ò6ÖR†VÇW"v÷fW&ç27–æ2'VFvWBæBæF—fRw&—FW#²WVÂ6¶VB6÷W&6W26öçfW'Böæ6S²WVÂ6öçfW'FVB6Æ÷G26÷VçBöæ6S²F—7F–æ7BVæ—VR6÷W&6W27F–ÆÂ&VgW6R&÷fS#DÔ"à¢Ò·…Ò5ETÂf–ÆRäôÔBGvògVÆÂ×6—¦R–æFWVæFVçB6—‚ÖÖ–ÆöG2Âf7F÷'2öæÖW2õUg2öæF—fRf–VÆG2Â&ö¦V7B&V÷VâæB6÷W&6R–æFWVæFVæ6Rà¢Ò·…ÒV&Æ–W"'VFvWBf—‡GW&W2æ÷r6öçF–âF—7F–æ7B'—FW3²ÆÂW†—7F–ærVç7W÷'FVBÖÖö'VFvWB76W'F–öç2&WF–æVBà¢Ò·…ÒgVÆÂæöFS#B7V—FS#CC52ód”Âó6¶—²7GVÂ7WÆ–VB6÷W&6RÖ–ÖvRVF—BGvòö&¦V7G2÷6—‚–ÖvW2ó#"ÃSSrÃS3d"–ÆöBÂW†7B&r†6†W2æBöæR6¶VBFV6öFRà¢Ò·…Ò÷6—G’Föæ÷"VF—FVC¢6W&FS#L+"÷6—G’–ÖvR'6VçBg&öÒtÄ#²W†—7F–ær6öÆ÷W"Ç†öæF—fR÷6—G’fÆr&WF–æVBÂæò–çfVçFVB6W&FR6Æ÷B÷"G&ç7&Væ7’6Æ–Òà¢Ò·…Ò&W6WC²–×÷'BeTÄÂÔDU$”ÂævÆ"Et”4RÂÖ÷fRöæR6–FRÂ7V$Böfc²f–ÆRäôÔBF÷væÆöG2æB÷Vç2Gvòö&¦V7G2v—F‚ÆÂ6—‚7W÷'FVBÖ6Æ÷G2à¢Ò·…ÒVæ6–ÂÖVF—BöæRö&¦V7Bw2Ub—6ÆæC²&WVBäôÔBW‡÷'C¢–æFWVæFVçBUg2æBÖ2&VÖ–âÆ–væVBöâ&÷F‚ö&¦V7G2à¢Ò·…Ò6fRô÷Vâæ&÷†Æ"F†VâäôÔB&WVG2æ÷&ÖÆÇ“²÷&–v–æÂ6–ævÆRÖ–×÷'BW‡÷'B7F—26÷'&V7Bà ¥Væ—VRÖ–ÖvS#DÔ"ööÂæB÷&–v–æÂ&s#DÔ"÷6¶VC„Ô"ó#CŒ+"öF—7Æ’'VFvWG2&VÖ–âà¤æò6÷W&6RFW‡GW&R&W6×Æ–ærÂÖFW&–ÂÖW&v–ærÂvVöÖWG'’õUbö†—7F÷'’ö¶W&æVÂ6†ævW2à ¢22ãƒ“V&Æ–6F–öâfW&–f–VB(	B##bÓÓp ¥'VçF–ÖS†c#SfVcSC“c#S3##VC“6#F#3#S3#sCc²FW7FVBG&VP¦3vc6fC“ccc–#ƒf&&S#3sv63ƒCcCfc†6VCCrW†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤7GVÂæöFS#"ã#2ã24“3ƒ“ƒSƒS“sö¦ö#s#Ss##ss5T44U53#CC52ód”Âó6¶—°¥vW33ƒ“ƒSƒSƒsB'V–ÆBöFWÆ÷’5T44U52âg&W6‚Æ—fR6†VÆÂöÖæ–fW7B÷&V6÷fW'’öW‡÷'B×æVÂð§6¶VBÖ6†–ÆBöæF—fRÖ6÷&Sƒ“ÂVæ6†ævVB66Æ#ƒƒ’öF—7Æ6VÖVçCƒƒ‚÷&÷FV7FVB×VÇF“ã ¦æBg&÷¦Vä&WFrÖ&¶W"ÆÂ'—FRÖÖF6‚&W÷6—F÷'’â–æ—F–Â&VG2&V6VFVBFWÆ÷–ÖVçC°¦f–æÂw&‚ÖF6†W3ƒ“âÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçC²&ööb6†ævW2Fö72öæÇ’à¥W6W#ƒƒ’52&÷FV7FVC³ƒ“GvòÖ–æFWVæFVçBÖ–×÷'BõUb÷&ö¦V7BæF—fRFWf–6RvFRTäD”ärà  ¢22ãƒ“Ubæ÷&ÖÂòVÖ—76—fR&VfW&Væ6W2(	BW6W"53##bÓÓp ¢Ò·…ÒW6W#ƒ“52&÷FV7G2&WVFVBÖ–×÷'BæF—fRFVGWÂ–æF—f–GVÂUg2æB&ö¦V7B&WVBà¢Ò·…ÒW†—7F–ær6†ö÷6W"÷&W6öÇfW"ö6öçG&öÆÆW"&WW6VC²÷F–öæÂ6Æ÷BÆ—7BöæÇ’f÷"Ubv÷&·76RÂÆÂFVfVÇB6öÆ÷W"ÖöæÇ’6öç7VÖW'2&WF–æVBà¢Ò·…ÒW†7B–æFW‚÷6÷W&6R&–æF–ærÂÖFW&–Â+rÖÆ&VÇ2ÂUcõärô¥TröW‡FVç6–öâöÖ—76–ærö'VFvWBwV&G2Â÷&–v–æÂ&ö¦V7B'—FW2Væ6†ævVBà¢Ò·…ÒöæS#L+"&—FÖó„Ô"6÷W&6RÂ6ÖR6VÖçF–26Æ÷B7&÷72&Vg&W6‚÷6†&VB–ÖvRÂ7FÆRÖÆ&VÂ&WfVçF–öâÂ7–æ26æ6VÂöÆFRö6Æ÷6R6ÆVçWà¢Ò·…Ò5ETÂv÷&·76R6†ö÷6W"6æ6VÇ2Væ6–Â&Wf–Wrv—F†÷WBVF—Bö†—7F÷'’Â¶VW2f–Wr÷6VÆV7F–öâÂW†—7F–ær&ö¦V7F–öâæB–ÖvRÖöfb&V÷Vâà¢Ò·…Ò7WÆ–VBtÄ"VF—B&W6öÇfW2÷&–v–æÂæ÷&ÖÃóÃ#C‚Ãƒs$"æBVÖ—76—fS"ó"ÃsSD#²Æ&vR6öÆ÷W"7F–ÆÂö&W—2÷&–v–æÂ&Wf–WrÆ–Ö—Bà¢Ò·…ÒgVÆÃ#CC552ód”Âó6¶—²&VçBö6†–ÆB66†Rw&‚&Wf–WvVC²&÷FV7FVBög&÷¦VâæBæF—fRW‡÷'B&V†f–÷"&WF–æVBà¢Ò·…ÒÖW6‚†VÇF‚ÓâUg2Óâ÷VâUbVF—F÷"Óâ–ÖvS¢6†ö÷6Ræ÷&ÖÂF†VâVÖ—76—fS²–ÖvW2Æ–vâv—F‚Ub÷WFÆ–æW2à¢Ò·…ÒVæ6–ÂÖ÷fRõ66ÆRõ&÷FFR²VæFõ&VFòæBâ÷–æ6‚v÷&²÷fW"6†÷6Vâ&VfW&Væ6S²&6²Fó4B÷&V÷Vâ7F'G2–ÖvRöfbà¢Ò·…Ò6fRô÷Vâæ&÷†Æ"&WF–ç2f–Æ&ÆR–ÖvR6†ö–6W3²f–ÆRäôÔB7F–ÆÂW‡÷'G2ÆÂ6—‚7W÷'FVBÖ26÷'&V7FÇ’à ¥&r$B&VfW&Væ6W3¢æ÷&ÖÂ7G&VæwF‚öVÖ—76—fRf7F÷"æB%"Æ–v‡F–ær&Ræ÷BWfÇVFVBà¤æò–çF–ær÷6¶VBÖ6†ææVÂö÷6—G’öF—7Æ6VÖVçB–ç7V7F–öâ÷"4Bæ÷&ÖÂöVÖ—76—fR6†F–ærà ¢22ãƒ“V&Æ–6F–öâfW&–f–VB(	B##bÓÓp ¥'VçF–ÖS#s†#C&#FƒVSscV6cc–VFC#Cc#ƒc&Scc“²FW7FVBG&VP¦fFcCF#ƒfS–fCsFfS#sƒVSFs&3BW†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤7GVÂæöFS#"ã#2ã24“3ƒ“ƒsScc“2ö¦ö#s#c#CssS5T44U53#CC552ód”Âó6¶—°¥vW33ƒ“ƒsSccc#B'V–ÆBöFWÆ÷’5T44U52âg&W6‚Æ—fR6†VÆÂöÖæ–fW7B÷&V6÷fW'’ôÖW6„†VÇF‚ð§v÷&·76R÷&Wf–Wr÷7W&f6R÷&VæFW"öW‡÷'BöæF—fR×&VçBw&ƒƒ“Â66Æ#ƒƒ’Â&÷FV7FV@¤×VÇF“ãæBg&÷¦Vä&WFrÖ&¶W"ÆÂ'—FRÖÖF6‚&W÷6—F÷'’â–æ—F–Â&VG2&V6VFV@¦FWÆ÷–ÖVçC²f–æÂ6ö×ÆWFRw&‚ÖF6†W3ƒ“âÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçBà¥W6W#ƒ“52&÷FV7FVC³ƒ“Ubæ÷&ÖÂôVÖ—76—fRõVæ6–Â÷&ö¦V7BöæF—fRFWf–6RvFRTäD”ärà¥&ööb—2Fö7VÖVçFF–öâÖöæÇ“²FW7FVB'VçF–ÖR'—FW2Væ6†ævVBà  ¢22ãƒ“"Ub&÷Vv†æW72òÖWFÆæW72&VfW&Væ6W2(	BW6W"53##bÓÓp ¢Ò·…ÒW6W#ƒ“52&÷FV7G2æ÷&ÖÂôVÖ—76—fR&VfW&Væ6W2ÂVæ6–Âöæf–vF–öâö†—7F÷'’Â–ÖvRÖöfb&V÷VâÂ&ö¦V7BöæF—fRW‡÷'Bà¢Ò·…Ò÷&–v–æÂ6†ö÷6W"&W6öÇfW2W†7B6¶VB&Vc¢w&VVâÓå&÷Vv†æW72Â&ÇVRÓäÖWFÆæW73²æò&VBöö66ÇW6–öâöæÖR–æfW&Væ6Röf7F÷"&¶–æröFVfVÇB6öÆ÷W"Ö6öç7VÖW"6†ævRà¢Ò·…Ò7GVÂÃÓ#L+"FV6öFW"&VF&6²Óâ÷VRw&—66ÆRÂ÷&–v–æÂ—†VÂ÷&–VçFF–öâÂöfg67&VVâôDôÒfÆÆ&6²Âæòär÷6V6öæB÷WGWB&—FÖ÷"6÷W&6R×WFF–öâà¢Ò·…Ò&—FÖ6Æ÷6W2öâ7V66W72öf–ÇW&S²67&F6‚ö÷WGWB6çf2&W6WG2öâ6öçFW‡B÷&VB÷w&—FRöÇ†öÆFRÖ6æ6VÂö6†ö÷6W"÷6W76–öâ6ÆVçWà¢Ò·…Ò5ETÂv÷&·76Rw&—66ÆRVæFW"÷&–v–æÂUb&ö¦V7F–öâÂVæ6–Â6æ6VÆÆF–öâ÷f–Wr÷6VÆV7F–öâÂ&V÷VâæBVæ6†ævVB&W6÷W&6R'—FW2à¢Ò·…Ò7GVÂ7WÆ–VB6¶VB¥Tss32Ã““4"6÷W&6RVF—BÂWfW'’G&ç7÷'FVC#L+"rô"—†VÂfW&–f–VBÂ÷&–v–æÂ†6‚W†7C²'&÷w6W"f—7VÂvFR6W&FRà¢Ò·…ÒgVÆÃ#CCu52ód”Âó6¶—²&Wf–WvVB&VçB66†Rw&ƒ²æF—fRÖF‡2÷&÷FV7FVBög&÷¦Vâ÷væW'2&WF–æVBà¢Ò·…ÒUbVF—F÷"Óâ–ÖvRÓâ&÷Vv†æW72„r’ÂF†VâÖWFÆæW72„"“¢F–ffW&VçBw&—66ÆRÖ2VæFW"Ub÷WFÆ–æW3²æ÷&ÖÂôVÖ—76—fR7F–ÆÂf–Æ&ÆRà¢Ò·…ÒVæ6–ÂUbVF—G2õVæFõ&VFòæBâ÷–æ6‚v÷&³²7v—F6†–ærÖ2&W6W'fW2f–Wr÷6VÆV7F–öã²&V÷Væ–ær7F'G2–ÖvRöfbà¢Ò·…Ò6fRô÷Vâæ&÷†Æ"&WF–ç26†ö–6W2æBVF—FVBUg3²f–ÆRäôÔB7F–ÆÂG&ç6fW'26—‚7W÷'FVBÖ26÷'&V7FÇ’à ¥F‡VÖ&æ–Â&rÖ6†ææVÂ&VfW&Væ6W2Âæ÷B%"Æ–v‡F–ær÷"gVÆÂ×&W6öÇWF–öâçVÖW&–2æÇ—6—2à¤öæR†VÆBÃÓ#L+"&Wf–Wró„Ô"6÷W&6S²FV×÷&'’66Æ"&—FÖö6çf2÷&VF&6²&÷VæFVBà ¢22ãƒ“"V&Æ–6F–öâfW&–f–VB(	B##bÓÓp ¥'VçF–ÖSc†VS&F#cF&cv#6&Cf&#FFcsC33CfVcC†F#CFcs²FW7FVBG&VP¦6Sf3#3fCC““#VVCSSvCC““vVF&#Vf&S#ƒ’W†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤7GVÂæöFS#"ã#2ã24“3ƒ““ƒCS“’ö¦ö#s#sSs#“b5T44U53#CCu52ód”Âó6¶—°¥vW33ƒ““ƒCC’'V–ÆBöFWÆ÷’5T44U52âg&W6‚Æ—fR6†VÆÂöÖæ–fW7B÷&V6÷fW'’ôÖW6„†VÇF‚ð§v÷&·76R÷&Wf–Wr÷7W&f6R÷&VæFW"öW‡÷'BöæF—fR×&VçBw&ƒƒ“"Â66Æ#ƒƒ’Â&÷FV7FV@¤×VÇF“ãæBg&÷¦Vä&WFrÖ&¶W"ÆÂ'—FRÖÖF6‚&W÷6—F÷'’âÆÂf÷W"6öçF–çV—G’f–ÆW0¦7W'&VçBâW6W#ƒ“52&÷FV7FVC³ƒ“"w&—66ÆRõVæ6–Â÷&ö¦V7BöæF—fRFWf–6RvFRTäD”ärà¥&ööb—2Fö7VÖVçFF–öâÖöæÇ“²FW7FVB'VçF–ÖR'—FW2Væ6†ævVBà  ¢22ãƒ“26²ÆÂUb—6ÆæG2(	BW6W"52&÷FV7FV@ ¢Ò·…ÒW6W#ƒ“"52&÷FV7G266Æ"öV&Æ–W"Ö&VfW&Væ6W2ÂVæ6–Âöæf–vF–öâö†—7F÷'’æB&ö¦V7BöæF—fRW‡÷'Bà¢Ò·…Ò÷&–v–æÂUb–ç7V7F÷"öVF—Bö†—7F÷'’÷væW'3²v†öÆRÖÆ–÷WBw&–C(	3#‚—6ÆæG2Ã"R÷WFW"Ö&v–âöv2Â6öÖÖöâ66ÆRö÷&–VçFF–öâ÷&VÆF—fRFVç6—G’ÂFWFW&Ö–æ—7F–2æB&WVBæòÖ÷à¢Ò·…ÒvVöÖWG'’÷&W6÷W&6W2÷VW'2÷6÷W&6R'&—2Væ6†ævVC²öæRæF—fRVæFõ&VFò6†V6·ö–çBÂöÆBFævVçG2&WF—&VC²÷&–v–æÂG&ç6f÷&×2Væ6†ævVBà¢Ò·…Ò7FÆRö6öçFW‡Bö–æ6ö×ÆWFRöÆö6¶VBö†—7F÷'’÷¦W&òÖW‡FVçBöW‡G&VÖRö6öÆÆ6VBccB¶c3"VFvR&VgW6Â&Vf÷&R×WFF–öã³#‚ÆÆ÷vVBó#’&VgW6VBà¢Ò·…Ò5ETÂv÷&·76R´ÖW6„†VÇF‚v÷&·2v—F†÷WB6VÆV7F–öâÂ6æ6VÇ2Væ6–ÂÂ&WF–ç26VÆV7FVBÖVÖ&W'6†—æBW6W2÷&–v–æÂf–Wrf—Böâ7V66W72à¢Ò·…Ò7GVÂ&ö¦V7B6öFV2öæF—fRäôÒ–æFWVæFVçBUb–æF–6W2¶c3"6÷&æW'2õF‡&VRtÄ"Ug2æBFævVçB&WF—&VÖVçBà¢Ò·…ÒgVÆÃ#CS%52ód”Âó6¶—²æ'&÷r66†Rw&‚&Wf–WvVC²&÷FV7FVBög&÷¦VâöæF—fR÷væW'2&WF–æVBà¢Ò·…Ò7V&RÓâÖW6„†VÇF‚Ug2Óâ&÷‚Ug2Óâ÷VâUbVF—F÷"Óâ6²ÆÃ¢—6ÆæG2f—Bv—F‚v2Âv†öÆR&W7VÇBg&ÖVBà¢Ò·…ÒÖ÷fR6VÆV7FVB—6ÆæBF†Vâ6²ÆÃ¢6VÆV7F–öâ&WF–æVC²VæFõ&VFò&W7F÷&W2Æ–÷WG3²&WVFVB6²ÆÂFG2æòW‡G&VæFò7FWà¢Ò·…Ò6fRô÷Vâæ&÷†Æ"æBf–ÆRäôÔB&6R&W6W'fR6¶VBÆ–÷WB÷6V×3²Væ6–Âöæf–vF–öâ÷&VfW&Væ6R6†ö–6W27F–ÆÂv÷&²à ¤ÖçVÂUbÆ–÷WB÷W&F–öã¢–ÖvW27F’f—†VBÂ6ò6¶–ær6†ævW2FW‡GW&R6×Æ–ærà¤w&–B&÷VæF–ær&÷†W2öæÇ“²æò÷F–ÖÂ6¶–ær÷Vçw&÷v—F†–âÖ—6ÆæB÷fW&Æ&W—"÷–çF–ærà ¢22ãƒ“2V&Æ–6F–öâfW&–f–VB(	B##bÓÓp ¥'VçF–ÖV&&3SF##CSVCvf&3–f6F#F3##f6S²FW7FVBG&VP¦VfCƒ&FfFSCc&V6fSS6SvVCcc#6C†&cC33&F3†"W†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤7GVÂæöFS#"ã#2ã24“3“3“ƒƒö¦ö#s3#SC“cSr5T44U53#CS%52ód”Âó6¶—°¥vW33“3“ƒ#R'V–ÆBöFWÆ÷’5T44U52âg&W6‚Æ—fR6†VÆÂöÖæ–fW7B÷&V6÷fW'’ôÖW6„†VÇF‚ð§v÷&·76RöVF—Cƒ“2ÂVæ6†ævVB–ç7V7F÷#ƒƒ÷&Wf–Wr÷&VæFW"öæF—fSƒ“"Â&÷FV7FVB×VÇF“ã ¦æBg&÷¦Vä&WFrÖ&¶W"ÆÂ'—FRÖÖF6‚&W÷6—F÷'’âÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçBà¥W6W#ƒ“"52&÷FV7FVC³ƒ“26²ÆÂög&Ö–ærö†—7F÷'’÷&ö¦V7BöæF—fRUbFWf–6RvFRTäD”ärà¥&ööb—2Fö7VÖVçFF–öâÖöæÇ“²FW7FVB'VçF–ÖR'—FW2Væ6†ævVBà  ¢22ãƒ“B7†W&RUg2…’’(	BW6W"52&÷FV7FV@ ¢Ò·…ÒW6W"ãƒ“252&÷FV7G26²ÆÂög&Ö–ær÷6VÆV7F–öâö†—7F÷'’÷&ö¦V7BöæF—fRW‡÷'BæB&–÷"Væ6–Âöæf–vF–öâöÖ&VfW&Væ6W2à¢Ò·…Ò6ÖRæF—fRUb&ö¦V7F–öâö†—7F÷'’÷væW#²&÷VæB’×öÆR7†W&RÂWV—&V7FæwVÆ"Æ–÷WBÂÆ–væVB6VÒÂW"×vVFvRöÆRUg2ÂæòvVöÖWG'’6†ævW2à¢Ò·…Ò&VÂVæFõ&VFò÷&WVBæòÖ÷Â6÷’Ööâ×w&—FRVW'2Â&÷‚&WÆ6VÖVçBæBW†—7F–ær6²ÆÂà¢Ò·…ÒÖ–æ–×VÒööFBöFVç6R&–æw2Â’&÷FF–öâ÷G&ç6ÆF–öâÂf–æ—FR‡VvR÷F–ç’6ö÷&F–æFW3²Vç7W÷'FVBö–çfÆ–Bö6öçFW‡Bö†—7F÷'’&VgW6Ç2&Vf÷&R×WFF–öâà¢Ò·…Ò7GVÂÖW6„†VÇF‚6ÆÆ&6²÷6W76–öâwV&C²7GVÂæ&÷†Æ"ÂæF—fRäôÒUbööÂæBF‡&VRtÄ"öÆR×f&–çB&W6W'fF–öâà¢Ò·…ÒgVÆÃ#CSu52ód”Âó6¶—²&Wf–WvVBæ'&÷r66†Rw&ƒ²&÷FV7FVBög&÷¦Vâ÷væW'2&WF–æVBà¢Ò·…ÒFB7†W&RÓâö&¦V7BÖW6„†VÇF‚Ug2Óâ7†W&RUg2…’’Óâ÷VâUbVF—F÷#¢ÆF—GVFRÆ–÷WB–ç6–FRF–ÆS²6†V6¶W"÷7W&f6R6VÒæBöÆRV&æ6Rà¢Ò·…ÒVæ6–ÂVF—BÂ6²ÆÂÂVæFõ&VFòÂâ÷–æ6‚&VÖ–âW6&ÆS²&WVB&ö¦V7F–öâFG2æò&VGVæFçBVæFòà¢Ò·…Ò6fRô÷Vâæ&÷†Æ"æBf–ÆRäôÔB&6R&W6W'fRF†R7†W&RUbÆ–÷WB÷6V×2à ¤WV—&V7FæwVÆ"öÆRF—7F÷'F–öâW‡V7FVBâ&÷VæB’×öÆRÖW6†W2v—F‚Æ–væVBÆöæv—GVFP§&–æw2öæÇ“²æòvVæW&ÂFVf÷&ÖVBõVF&ÆÂVçw&Â6VÒ7WGF–ærÂ–çF–ær÷"æWr¶W&æVÂà ¢22ãƒ“BV&Æ–6F–öâfW&–f–VB(	B##bÓÓp ¥'VçF–ÖS#cƒvfccs“F6SCcs3CfC3fFCƒSC3“s†6FcFC3²FW7FVBG&VP£c#–6“S–cf#3SF&cscfVVSƒ##S3“VFW†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤7GVÂæöFS#"ã#2ã24“3“Sƒƒsö¦ö#s3c“33Sb5T44U53#CSu52ód”Âó6¶—°¥vW33“SƒƒC#B'V–ÆBöFWÆ÷’5T44U52âg&W6‚÷7FFWÆ÷–ÖVçBÆ—fR6†VÆÂöÖæ–fW7Bð§&V6÷fW'’ôÖW6„†VÇFƒƒ“BöVF—Cƒ“BÂVæ6†ævVBv÷&·76Sƒ“2ö–ç7V7F÷#ƒƒ÷&VæFW#ƒ“"À§&÷FV7FVB×VÇF“ãæBg&÷¦Vä&WFrÖ&¶W"ÆÂ'—FRÖÖF6‚&W÷6—F÷'’â–æ—F–Â&VG0§&V6VFVBFWÆ÷–ÖVçC²f–æÂ6ö×ÆWFRw&‚ÖF6†W3ƒ“BâÆÂf÷W"6öçF–çV—G’f–ÆW0¦7W'&VçBâW6W#ƒ“252&÷FV7FVC³ƒ“B7†W&RÆ–÷WBõVæ6–Âö†—7F÷'’÷&ö¦V7BöæF—fRU`¦FWf–6RvFRTäD”ärâ&ööb—2Fö7VÖVçFF–öâÖöæÇ“²FW7FVB'VçF–ÖR'—FW2Væ6†ævVBà  ¢22ãƒ“RWVÆ—¦RUbFVç6—G’(	BFWf–6RvFRVæF–æp ¢Ò·…ÒW6W"ãƒ“B52&÷FV7G27†W&RUg2÷6V×2ÂVæ6–Âõ6²ÆÂö†—7F÷'’öæf–vF–öâ÷&ö¦V7BæBæF—fRW‡÷'Bà¢Ò·…Ò÷&–v–æÂVF—Bö†—7F÷'’÷v÷&·76R÷væW'3²ÆÃ(	3#‚—6ÆæG2Â6ÖR÷6—F—fRVæ–f÷&Ò66ÆRW"—6ÆæB&÷WBVæ6†ævVB6VçG&RÂfW&vRUbÖ&Vô&6RÖ&V&F–òWVÃ²F÷FÂUb&V&W6W'fVBà¢Ò·…ÒÖ—'&÷&–ærö÷&–VçFF–öâö7V7B÷6÷W&6RvVöÖWG'’÷&W6÷W&6W2÷VW'2&WF–æVC²FævVçB&WF—&VÖVçBÂöæRæF—fRVæFõ&VFòæB&WVBæòÖ÷à¢Ò·…ÒÆæ"6öæ6fR÷VB÷G&–ævÆW2Â×VÇF’Öf6R—6ÆæG2ögVÆÂÖWG&–72&W–öæB&Wf–WrÂæ÷&ÖÆ—¦VB‡VvR÷F–ç’vVöÖWG'“²æöçÆæ"öFVvVæW&FRöæöæf–æ—FR÷7FÆRö†—7F÷'’ö6öçFW‡Bö6÷VçBö6öÆÆ6RöW‡÷'B÷fW&fÆ÷röæWr6VÒÖ¦ö–â&VgW6Âà¢Ò·…Ò7GVÂv÷&·76R²ÖW6„†VÇF‚v÷&·2v—F†÷WB6VÆV7F–öâÂ6æ6VÇ2VæF–ærVæ6–Â&Wf–WrÂ&WF–ç26VÆV7F–öâæBW6W2÷&–v–æÂf—Böâ7V66W72à¢Ò·…Ò7GVÂ&ö¦V7B6öFV2ÂäôÒ–æFWVæFVçBUb–æF–6W2öc3"6÷&æW'2æBF‡&VRtÄ"Ub÷FævVçB&WF—&VÖVçBà¢Ò·…ÒgVÆÃ#Cc%52ód”Âó6¶—²&Wf–WvVB66†Rw&ƒ²&÷FV7FVBög&÷¦Vâ÷væW'2Væ6†ævVBà¢Ò²Ò7V&RÓâ&÷‚Ug2Óâ÷VâUbVF—F÷#²Væ6–Â66ÆRöæR—6ÆæBÆ&vW"ÂWVÆ—¦RFVç6—G’Ö¶W26–FW26ö×&&ÆRv–ã²6²ÆÂ6W&FW2—6ÆæG2à¢Ò²ÒVæFõ&VFò&W7F÷&W2V6‚7FW²&WVFVBWVÆ—¦RFG2æò&VGVæFçBVæFó²Væ6–Â÷â÷–æ6‚æB6VÆV7FVBÖ—6ÆæBVF—F–ær7F–ÆÂv÷&²à¢Ò²Ò6fRô÷Vâæ&÷†Æ"æBf–ÆRäôÔB&6R&W6W'fRf–æÂFVç6—G’öÆ–÷WB÷6V×2à ¤ÆÂÖ—6ÆæBUbÖ&V66Æ–æs²–ÖvW2ö6VçG&W2f—†VB6ò÷fW&Æ2ö÷WG6–FRF–ÆRæB6†ævV@§6×Æ–ær&R÷76–&ÆRâ6²6W&FVÇ’â6ÖR—†VÂFVç6—G’77VÖW2WVÂÖ&W6öÇWF–öã°¦æòv—F†–âÖ—6ÆæB7G&WF6‚6÷'&V7F–öâÂ–çF–ærÂ&¶–ærÂvVæW&Â6VÒVçw&÷"æWr¶W&æVÂà ¢22ãƒ“RV&Æ–6F–öâfW&–f–VB(	B##bÓÓp ¥'VçF–ÖSf#S33#FSVSƒƒ6C†cCc#VSc–&33ffFSs²FW7FVBG&VP¦C“s&fFS#†&6#ƒVC66Fs†3Fc36fSV“vs#v2W†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤7GVÂæöFS#"ã#2ã24“3“Sƒ““ö¦ö#s3s“3“B5T44U53#Cc%52ód”Âó6¶—°¥vW33“Sƒƒs#B'V–ÆBöFWÆ÷’5T44U52âg&W6‚Æ—fR6†VÆÂöÖæ–fW7B÷&V6÷fW'’ð¤ÖW6„†VÇFƒƒ“R÷v÷&·76Sƒ“RöVF—Cƒ“RÂVæ6†ævVB–ç7V7F÷#ƒƒ÷&VæFW#ƒ“"À§&÷FV7FVB×VÇF“ãæBg&÷¦Vä&WFrÖ&¶W"ÆÂ'—FRÖÖF6‚&W÷6—F÷'’âÆÂf÷W ¦6öçF–çV—G’f–ÆW27W'&VçBâW6W#ƒ“B52&÷FV7FVC³ƒ“RFVç6—G’õ6²õVæ6–Âö†—7F÷'’ð§&ö¦V7BöæF—fRUbFWf–6RvFRTäD”ärâ&ööb6†ævW2Fö7VÖVçFF–öâöæÇ“²FW7FV@§'VçF–ÖR'—FW2Væ6†ævVBà  ¢22FW‡GW&U–çB—6öÆFVBWfÇVF–öâ(	B##bÓÓrÂFWf–6RvFRVæF–æp ¢Ò·…ÒW†7BÔ•BW7G&VÒ6öÖÖ—B÷6÷W&6Rö†6‚öÆ–6Væ6R&WF–æVC²—†VÂÖÆWfVÂ÷&–v–æÂ&÷r×w&æBFW7G'V7F—fRFW‡GW&R×&W6WBFVfV7G2&W&öGV6VBà¢Ò·…ÒFFW"6Æ—2…’Â5$t"'—FW2öfÆÆöfb÷&W77W&Rö÷6—G’Â–ÖÖVF–FRFW‡GW&R–çfÆ–FF–öã²&VÂVæFõ&VFòö6æ6VÂöæòÖ÷Â&÷VæFVB—†VÂö†—7F÷'’ÖVÖ÷'’æB6ÆVçWà¢Ò·…Ò67&VVâ×76R&W6×Æ–ær&–67G27GVÂF‡&VR7†W&S²æòÆ–æR–çFW'öÆFVB7&÷72UbFÆ3²æV&W7Bg&öçB7W&f6R†—Bà¢Ò·…ÒG&–Â6W&FRg&öÒ&÷„Æ"66VæRö†—7F÷'’÷&W6÷W&6W2öÆöFW'3²Ö–âãƒ“RÖ&¶W'2÷–ç2æB&÷FV7FVBög&÷¦Vâ6öFRVæ6†ævVBâæòãƒ“RW6W"52–æfW'&VBà¢Ò·…Òf—fRæWrFW7G3²gVÆÃ#Ccu52ód”Âó6¶—âWfÇVF–öâ&W÷'B&V6÷&G2f—BöÆ–Ö—FF–öç2æBWF†÷&—FF—fR&öGV7F–öâ–çFVw&F–öâ÷væW'2à¢Ò²ÒG&–Ã¢Væ6–Â–çBV'2GW&–ærÖ÷F–öã²6öÆ÷W"÷&F—W2ö†&FæW72ö÷6—G’÷&W77W&RW6&ÆRÂf–ævW'2÷&&—B÷â÷–æ6‚v—F†÷WB–çBà¢Ò²ÒVæFõ&VFòö6æ6VÂõ&W6WBv÷&³²–ç7V7B7†W&R6VÒæBÆæRFW‡GW&R&÷VæF&–W3²&W÷'B&ÆVVB÷"ÆFVæ7’à¢Ò²ÒF÷væÆöBär†2ÖF6†–ær6öÆ÷W'2ö÷&–VçFF–öã²&6²Fò&÷„Æ"ÆVfW2÷&–v–æÂ66VæRVæ6†ævVBà ¥föÆF–ÆR6×ÆRÖÖW6‚G&–ÂöæÇ’âæòÆ–W'2÷&ö¦V7BôæöÖBW'6—7FVæ6RÂ7GVÂ&÷„Æ ¦ÖW6‚–çB–çFVw&F–öâÂ6VÒ7F—F6†–ærÂv÷&ÆB×6—¦R''W6‚÷"uR×7F×–ær6Æ–Òà ¢22FW‡GW&U–çBWfÇVF–öâV&Æ–6F–öâfW&–f–VB(	B##bÓÓp ¤WfÇVF–öâ6öÖÖ—BV3vCccccfv#ss6&V6Sv3c6VS“sfV##c3C²FW7FVBG&VP¦c&CCc3“f#“†cƒƒ66##s–6#s#†&&3fCS&3SbW†7FÇ’ÖF6†W2fWF6†VBÖ–âà¤æöFS#"ã#2ã24“3“csCƒ3ö¦ö#s3#cSƒs#b5T44U53#Ccu52ód”Âó6¶—°¥vW33“csCsccR'V–ÆBöFWÆ÷’5T44U52âg&W6‚Æ—fRG&–Â–æFW‚ö6öçG&öÆÆW"öFFW"À¦'—FRÖW†7BW7G&VÒ6÷W&6RöÆ–6Væ6RæBWfÇVF–öâ&W÷'BÖF6‚&W÷6—F÷'’âÖ–à¦–æFW‚÷fW'6–öâ&VÖ–â'—FRÖ–FVçF–6Âãƒ“Râ&VæFW&VB'&÷w6W"fW&–f–6F–öâF–Bæ÷@¦6ö×ÆWFS²•BVæ6–Âöæf–vF–öâ÷6VÒõärFW7G2&VÖ–âVæF–ærÂæòFWf–6R52–æfW'&VBà¤ÆÂf÷W"6öçF–çV—G’Fö727W'&VçBâæW‡B—2†æG2ÖöâG&–ÂfVVF&6²&Vf÷&R&öGV7F–öà§–çB&W6÷W&6Rö†—7F÷'’övW7GW&R–çFVw&F–öââ&ööb—2Fö7VÖVçFF–öâÖöæÇ’à  ¢22Ub–çB–çFVw&F–öâVF—B(	B##bÓÓp ¥W6W"6—2FW‡GW&U–çB''W6‚æVVG2v÷&²'WB&öÖ—6–æs²&WVW7G2VF—BöbFW‡GW&U–ç@¦æB¶ÆV6·2æBFVÆVvFW2&WW6R×fW'7W2ÖæWrFV6—6–öââæò&Ææ¶WBG&–Â÷"ãƒ“R52à¥6VRFö72÷Wb×–çBÖ–çFVw&F–öâÖVF—BÓ##bÓÓræÖBâVF—FVB&÷„Æ"Ö–ã3S6S“ƒƒÀ¥FW‡GW&U–çC6c†cRæB¶ÆV6·263#FS“ss&3“““#“sc#SƒƒffS&S#S#366SfBà¤FV6—6–öã¢&÷„Æ"Ö÷væVB&6†—FV7GW&R²6VÆV7F—fRGG&–'WFVB''W6‚÷7G&ö¶Rö6ö×÷6—F÷ §&WW6S²æòv†öÆW6ÆRVF—F÷"ö†—7F÷'’ö–çWB–×÷'BÂæòFW‡GW&U–çB'VçF–ÖRFWVæFVæ7’à¤¶ÆV6·2VâôW&6W"&VBæBW6‚¶Ä†—7F÷'“²Æ–W$6ö×÷6—F÷"—26ÖÆÆW"W‡G&7F–öà¦6æF–FFRâ67&VVâ×76R6Öö÷F†–ær$Tdõ$R–6¶–æs²æòUb7Æ–æR7&÷72—6ÆæG2à¥F‡&VR–ç7G'VÖVçFVBW7G&VÒ&ö&W26öæf—&ÒFÆ2×7ææ–ær&W¦–W"Ö&·2ƒc"’À§6Öö÷F†–ær÷6—F–öâ÷&W77W&RæB6ö×÷6—F÷"6ÆÂ÷&FW#²æò&VæFW&VB—†VÂ÷W&b&ööbà¤W†—7F–ærfö7W6VBG&–Â÷&VÆV6RFW7G352ód”Âó6¶—²æ÷BæWrgVÆÂ×7V—FR'Vâà¤æF—fR&W6÷W&6Rc2&VÖ–ç2UbÖöæÇ“²FW6–vâ–çB&W6÷W&6Rö6öFV2ô4õrö†—7F÷'’W‡Æ–6—FÇ’à¤æW‡Bæ'&÷r'V–ÆC¢—6öÆFVB–FVçF–6Â×7G&ö¶R6ö×&—6öâöâ&÷„Æ"ÖvVæW&FVBUbvVöÖWG'’À¦öæR6öÆ÷W"Æ–W#²&Væ6†Ö&²FFVB¶ÆV6·2g26–×ÆR&÷„Æ"''W6‚&Vf÷&RÆ—fR–çFVw&F–öâà¤æòW7G&VÒ6÷W&6R–×÷'FVBÂæò'VçF–ÖR÷–â÷fW'6–öâög&÷¦Vâ6†ævW3²ãƒ“R&VÖ–ç2Æ—fRà¤æòæWr†æG2ÖöâFW7B&WV—&VBf÷"F†—2Fö7VÖVçFF–öâÖöæÇ’VF—BâW†—7F–ærFWf–6RvFW0§&VÖ–âVæF–æs²W6W"fVVF&6²—2VÆ—FF—fRâgVÆÂ&W÷'B6'&–W2–çFVw&F–öâö66WFæ6RÆâà ¢22ãƒ“bUb–çBÆ"(	BW6W"52Âæ÷&ÖÇ2W†6WF–öâ&W—&VB–âãƒ“p ¢Ò·…Ò÷&–v–æÂ&÷„Æ"&–Ö—F—fR÷&ö¦V7F–öâõUbvVöÖWG'’'V–ÆFW"æB7GVÂF‡&VR&’†—G2f÷"7†W&Rô7V&RõÆæS²æòGWÆ–6FRG&–æwVÆF÷"à¢Ò·…ÒW†7B6öÆ÷W"÷&W77W&R6—¦Rö÷6—G’6ö6Æ—–ærõär&÷w2Â—&VB&÷VæFVB†—7F÷'’ÂæòÖ÷õ&VFòö6æ6VÂöF—7÷6Âà¢Ò·…Ò67&VVâ6×ÆW'3¢7V&F—f—6–öâ&—G’v—F†–ãRÓ"Â¶ÆV6·27W'fRF–Âöf–æ—FR&W77W&RöF"6²WfW'’VÖ—GFVBF"&–67BÂæòUb7Æ–æRà¢Ò·…Ò7GVÂ6öçG&öÆÆW"Ö÷fVÖVçBöF—'G’Ög&ÖRöÆ–7’õVæFòöÆ÷7B6GW&RÂf–ævW"÷ÆÒ÷væW'6†—ÂFVÖò6æ6VÂö&ÇW"÷&W6WBöF—7÷6ÂÂ6÷W&6R&÷fVææ6RæB&öGV7F–öâ—6öÆF–öâà¢Ò·…Ò6WfVâæWrFW7G3²gVÆÂæöFS#B#CsE52ód”Âó6¶—â'&÷w6W"G&ç7÷'BFFVC²æ÷B&VæFW&VBõVæ6–Â&ööbà¢Ò·…Òf–ÆR(i"Ub–çBÆ#²FVÖòF†Vâ7v—F6‚&÷„Æ"&÷VæBô¶ÆV6·27W'fRæB6ö×&R6†W2öÆr‚ãƒ“bW6W"52’à¢Ò·…ÒVæ6–Â–çG2GW&–ærÖ÷fVÖVçC²6—¦Rö†&FæW72ö÷6—G’÷&W77W&^(i'6—¦S²f–ævW'2÷&&—B÷â÷–æ6‚v—F†÷WB–çC²—&VBVæFõ&VFòæB–çFW''WFVB7G&ö¶W2&W7F÷&R6÷'&V7FÇ’‚ãƒ“bW6W"52’à¢Ò·…Ò6VÆV7FVBärô&6²Fò&÷„Æ"&6VÆ–æR66WFVB–âãƒ“c²–æ6öç6—7FVçB÷WGv&B6×ÆRv–æF–ær—2W‡Æ–6—FÇ’W†6WFVBæB&WFW7FVB–âãƒ“rà £S,+"föÆF–ÆR6×ÆRÆ–W'2öæÇ“²&VÆöBõ&W6WB6ÆV'2F†VÒâæòW'6—7FVçB&ö¦V7BöæF—fP§–çBÂgVÆÂ¶ÆV6·2Vä''W6‚öÆ–W'2Â6VÒ7F—F6†–ær÷v÷&ÆB&F—W2÷6×VFvRõ%"6Æ–Òâãƒ“P¦FVç6—G’vFR&VÖ–ç2VæF–æs²VÆ—FF—fRFW‡GW&U–çBfVVF&6²—2æ÷B&Ææ¶WB52à ¢22ãƒ“bV&Æ–6F–öâfW&–f–VB(	B##bÓÓp ¥'VçF–ÖSƒƒsS“ƒ“sCv&VVc33sc“Fƒccf6SV3²FW7FVBG&VP£#C“ƒ3cs6CCVCC6f3CC†cC3C“FFfF"ÖF6†W2fWF6†VBÖ–âöÆö6ÂW†7FÇ’à¤æöFS#"F÷öÆöw’4“3“scs3ƒC2ö¦ö#s3S33C3’5T44U53#CsE52ód”Âó6¶—°¥vW33“scs3Cc"'V–ÆCs3S3Csƒ"öFWÆ÷“s3S3“C35T44U52à¤g&W6‚Æ—fR6†VÆÂ÷fW'6–öâæBÆÃ’Æ"6÷W&6R÷fVæF÷"76WG2'—FRÖÖF6‚&W÷6—F÷'’à¤Ö–â&÷FV7FVBÖöFVÆÆ–ærô×VÇF’ög&÷¦Vâ&WF'—FW2æB÷&–v–æÂFW‡GW&U–çBG&–ÂVæ6†ævVBà¤6Æ÷VB6‡&öÖRÆöG2Æ"ÖöGVÆW2õT’'WBvV$tÂ6öçFW‡B7&VF–öâf–Ç3²Væ6†ævVB÷&–v–æÀ¥FW‡GW&U–çBvRf–Ç2–FVçF–6ÆÇ’âF‡W2&VæFW&VB7W&f6RõVæ6–Âöæf–vF–öâõärFWf–6P¦66WFæ6R&VÖ–ç2VæF–ærÂæ÷B76VB'’'&÷w6W"–ç7V7F–öâ÷"æöFRFFW'2âæò6Æ–Ð¦öbâ•BvV$tÂf–ÇW&S²F†—2—2F†Rö'6W'fVB6Æ÷VBÖ'&÷w6W"Æ–Ö—FF–öââæóƒ“bW6W"52à¤Fö7VÖVçFF–öâ&ööb6†ævW2æòFW7FVB'VçF–ÖR'—FW2âæW‡C¢W6W"—&VBÖ''W6‚6ö×&—6öâÀ§F†Vâ6VÆV7FVB&Vf–æVÖVçB÷&W6÷W&6Rö6öFV2övÆö&ÂÖ†—7F÷'’v÷&²W"Fö72÷Wb×–çBÖÆ"Óƒ“bæÖBà ¢22ãƒ“r(	B&Wf–Wrv–æF–æs²ãƒ“bW6W"50 ¢Ò·…ÒW6W#ƒ“e52&÷FV7G2''W6‚õVæ6–Â÷6WGF–æw2öæf–vF–öâ÷—&VBVæFõ&VFòõärv÷&¶fÆ÷s²&W÷'FVB–çBæ÷&ÖÇ2W‡Æ–6—FÇ’W†6WFVBãƒ“RFVç6—G’66WFæ6Ræ÷B–æfW'&VBà¢Ò·…ÒWfW'’7†W&Rô7V&R&Wf–WrG&–ævÆRæBæ÷&ÖÂ÷WGv&C²&VÂg&öçB×6–FVB&–67G2g&öÒ6—‚F—&V7F–öç2†—BæV"W‡FW&–÷"âÆæRg&öçB&VÖ–ç2f—6–&ÆRà¢Ò·…ÒF–ÇFVB6öæ6fR÷&WfW'6VBöÇ–vöç2&WF–â4õU$4Rv–æF–æræBW†7BUb÷÷6—F–öâ—&–æs²æò6÷W&6R×WFF–öç2Âæò6öçfW‚Ö6VçG&R÷WGv&BwVW72à¢Ò·…Ò÷&F–æ'’W‡÷'BFVfVÇBF‚övVöÖWG'’Væ6†ævVC²6ÖRG&–ævÆR6÷&æW"6WG2âgVÆÃ#Csu52ód”Âó6¶—²''W6‚ö¶W&æVÂög&÷¦Vâ÷&÷FV7FVB6öFR&WF–æVBà¢Ò·…Ò÷&&—B7†W&Rô7V&RF‡&÷Vv‚ÆÂ6–FW3¢æò–ç6–FRÖ÷WBöÖ—76–ærF6†W3²Væ6–Â–çB7F—2öâf—6–&ÆR÷WFW"7W&f6R‚ãƒ“rW6W"52’à¢Ò·…ÒÆæRf—6–&ÆS²—&VB''W6‚7v—F6†–æræBVæFõ&VFò7F–ÆÂv÷&²‚ãƒ“rW6W"52’à ¥v–æF–ærf—‚—26†&VBUb$Ud”UröæÇ’âvVæW&Âf–ÆRÖW‡÷'Bv–æF–ær&W—"&VÖ–ç2÷W@¦öb66÷S²&W6W'fR–çFVçF–öæÆÇ’&WfW'6VB6÷W&6RöÇ–vöç2âæóƒ“rFWf–6R52–WBà ¢22ãƒ“rV&Æ–6F–öâfW&–f–VB(	B##bÓÓp ¥'VçF–ÖSF#Ssc–#“ƒƒ†SfcfC3V6&FFS“c†ffC#vf#C²FW7FVBG&VP£C–f3#cƒS#F63†&#fFff6c6CS“3Cf#ƒs#Cvf2ÖF6†W2fWF6†VBÖ–âöÆö6ÂW†7FÇ’à¤æöFS#"ã#2ã2F÷öÆöw’4“3“ƒƒs3ƒ’ö¦ö#s3ScC“S“s5T44U53#Csu52ód”Âó6¶—°¥vW33“ƒƒs33C'V–ÆCs3ScC“cƒ“2öFWÆ÷“s3ScS“c325T44U52à¥÷7FFWÆ÷–ÖVçBÆ—fR6†VÆÂ÷fW'6–öâöW‡÷'B×&VçCƒ“ræBÆ"–æFW‚ö6öçG&öÆÆW"÷6×ÆSƒ“p¦'—FRÖÖF6‚&W÷6—F÷'“²&÷FV7FVB×VÇF“ãög&÷¦Vä&WFrÖ&¶W"Væ6†ævVBâ–æ—F–ÂÆ—fP§&VG2&V6VFVB6ö×ÆWFVBFWÆ÷–ÖVçBæB6W'fVCƒ“c²f–æÂ÷7FFWÆ÷–ÖVçBw&‚ÖF6†W3ƒ“rà¥W6W#ƒ“e52&÷FV7G2''W6‚v÷&¶fÆ÷rv—F‚&W÷'FVBv–æF–ærW†6WF–öã³ƒ“rf—†W2&Wf–Wp¦÷&–VçFF–öâöæÇ’ÂFWf–6R&WFW7BVæF–ærâæóƒ“u52–æfW'&VBâ&–÷"6Æ÷VBvV$tÂÆ–Ö—FF–öà§&VÖ–ç26W&FRg&öÒF†—27GVÂF‡&VRvVöÖWG'’÷&–67B÷6÷W&6R×v–æF–ærFW7BWf–FVæ6Rà¥F†—2fW&–f–6F–öâWFFW2Fö7VÖVçFF–öâöæÇ“²FW7FVB'VçF–ÖR'—FW2&WF–æVBâæW‡C §W6W"÷&&—B÷–çB7†W&RæB7V&RÆÂ6–FW2ÂÆæR÷—&VB†—7F÷'’6æ—G“²F†Vâ–ç@§&W6÷W&6Rö6öFV2ô4õrövÆö&ÂÖ†—7F÷'’FW6–vâW"7W'&VçB&öFÖâ÷&F–æ'’f–ÆRÖW‡÷'@§v–æF–ær&VÖ–ç26W&FRVF—B—FVÓ²æòWFöÖF–2vVæW&Â÷WGv&B×&W—"&öÖ—6Rà ¢22ãƒ“‚(	B–çBÆ"6W76–öç2ÂW6W"52&÷FV7FV@ ¢Ò·…Òãƒ“rW6W%52&÷FV7G26÷'&V7FVB&Wf–Wrv–æF–ær÷f—6–&ÆR×7W&f6R–çBæB&–÷"''W6‚ö†—7F÷'’öæf–vF–öâà¢Ò·…ÒfW'6–öã6öÆ÷W"&W6÷W&6R÷væVB6÷–W2æBW†7B–çFVw&—G“²7G&–7B6—¦Rö6†ææVÂöÇ†ö&–æF–ærwV&G2à¢Ò·…Ò7GVÂ&÷„Æ"66VæRöæF—fUUb6öFV2æBW†7BÖ2÷6WGF–æw2÷f–Wrf÷"7†W&Rô7V&RõÆæS²æòf¶RtÄ"÷"&ÆÆVÂÖW6‚66†VÖà¢Ò·…Ò&–æ'’ö6÷''WF–öâö'VFvWB÷&VgW6ÂÂ7–æ6‡&öæ÷W26fR6æ6†÷G2Â7WW'6VFVB÷7FÆR÷VâÂFöÖ–27FvVB&öÆÆ&6²æBæWrVæ6–Â6öçF7BwV&G2à¢Ò·…Ò7GVÂ6öçG&öÆÆW"6fRô÷Vâ'—FW2Â6öçF–çVVB—&VB†—7F÷'’Â6WGF–æw2÷f–Wrö''W6‚&W7F÷&F–öâæBF—7÷6Ã²÷&–v–æÂFW7B76W'F–öç2&WF–æVBâgVÆÃ#Cƒ552ód”Âó6¶—à¢Ò·…Ò‚ãƒ“‚W6W"52’–çBÂ6VÆV7B''W6‚ö6†ævR6WGF–æw2÷f–Wr(i"6fR–çB‚æ&÷‡–çB“²&W6WB÷&VÆöB(i"÷Vâ–çBg&öÒF÷væÆöG2&W7F÷&W2$õD‚&W7VÇG2÷6WGF–æw2÷f–Wrà¢Ò·…Ò‚ãƒ“‚W6W"52’6öçF–çVR–çF–ærgFW"÷Vã²VæFòõ&VFòv÷&·2f÷"æWr7G&ö¶W2Âär&VÖ–ç26÷'&V7C²öÆFW"&R×6fRVæFò—2–çFVçF–öæÆÇ’'6VçBà ¢æ&÷‡–çB—26W&FRÆ"6W76–öã²æòÖ–âæ&÷†Æ"–çBÂÆ–W'2ÂWF÷6fR÷"æF—fP§–çBW‡÷'B–WBâ–çfÆ–Bf–ÆR×W7Bæ÷B&WÆ6R6öÖÖ—GFVBv÷&³²Væf–ÇFW&VB•B–6¶W"à ¢22ãƒ“‚V&Æ–6F–öâfW&–f–VB(	B##bÓÓp ¥'VçF–ÖSc#ƒC–Csƒ&CCscvc33Fcs“3CF3v#ƒC6&c†3C²FW7FVBG&VP£CCvcfC3V6SCSFScV6Sƒ“vcfFF&#ƒ#BÖF6†W2fWF6†VBÖ–âöÆö6ÂW†7FÇ’à¤æöFS#"ã#2ã2F÷öÆöw’4“3“#S#S3sS2ö¦ö#s3sCƒcSC‚5T44U53#Cƒ552ód”Âó6¶—°¥vW33“#S#S33s"'V–ÆCs3sCƒcs#2öFWÆ÷“s3sC“S“Cƒ‚5T44U52à¥÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâæBW†7BÆ#ƒ“‚–æFW‚ö6öçG&öÆÆW"÷6×ÆR÷6W76–öâÇW0§–çB×&W6÷W&6Sƒ“‚'—FRÖÖF6‚&W÷6—F÷'’â–æ—F–Â&VFWÆ÷–ÖVçB&VG26W'fVCƒ“róCC°¦f–æÂ6ö×ÆWFR6†ævVBw&‚ÖF6†W3ƒ“‚âÖ–â6öFV2öæF—fR&W6÷W&6W2öW‡÷'Bö''W6‚6÷&Rð§v–æF–ær÷&÷FV7FVBÖöFVÆÆ–æræBg&÷¦Vâ&WF'—FW2&WF–æVBâW6W#ƒ“u52&÷FV7FVBà¤Fö7VÖVçFF–öâ&ööb6†ævW2æòFW7FVB'VçF–ÖR'—FW3³ƒ“‚f–ÆW–6¶W"öF÷væÆöB÷&VÆöBð¤÷VâõVæ6–Â6öçF–çVF–öâvFRVæF–ærÂæóƒ“‚FWf–6R52–æfW'&VBâæòæWr6Æ÷VBvV$tÀ¦÷"6f&’&VæFW&–ær&ööbâæ&÷‡–çB—2Æ"6W76–öâÂæ÷BÖ–âæ&÷†Æ"ôæöÖB–çBà¤æW‡C¢6fR–çN(i%&W6WB÷&VÆöN(i$÷Vâ–çBg&öÒF÷væÆöG2Â6ö×&R&÷F‚&W7VÇG2÷6WGF–æw2ð§f–WræB6öçF–çVVBVæFõ&VFó²F†Vâ÷&–v–æÂ66VæR×&W6÷W&6Rö6öFV2ô4õrö†—7F÷'’–çFVw&F–öâà ¢22ãƒ“’(	B6öÆ÷W"&ö¦V7B&W6÷W&6Rf÷VæFF–öà ¢Ò·…ÒW†7B6öÆ÷W"'—FW2öFW67&—F÷"öæF—fRUg2&÷VæB×G&—F‡&÷Vv‚W‡Æ–6—B&ö¦V7Gc#²÷&F–æ'’c&VÖ–ç2–FVçF–6Ã²Ugc2&VgW6W2–çBf–VÆG2à¢Ò·…Ò7GVÂ6æ6†÷BõVæFõ&VFòöFVÆWF–öâæB&÷F‚÷&F–æ'’GWÆ–6FR÷væW'26†&R6öÖÖ—GFVB&W6÷W&6W3²&WÆ6VÖVçG2—6öÆFRVF—G2ÂvVöÖWG'’–æFWVæFVçBà¢Ò·…ÒööÂ6öçFVçBö–FVçF—G’FVGWÃ„Ö”"&÷VæF'’ÂÖÆf÷&ÖVB66†VÖöÇ†ö&6ScB÷&Vg2ö÷væW'2&VgW6S²æòVæVæ6öFVB–çB77F‡&÷Vv‚à¢Ò·…Ò÷&–v–æÂ6fRô÷VâöF÷væÆöBöFöÖ–2&WÆ6VÖVçBæB&VæFW"Öf–ÇW&R&öÆÆ&6²&W6W'fR&W6÷W&6Rö†—7F÷'’7FFS²gVÆÃ#Cƒu52ód”Âó6¶—Âfö7W6VCE52à¢Ò·…Ò‚ãƒ“’W6W"52’æV&'’&Vw&W76–öã¢Æ"6fRõ&W6WBô÷VâæB6öçF–çVVB–çBõVæFõ&VFó²Ö–â÷&F–æ'’GWÆ–6FRõVæFòæBÆ–âæ&÷†Æ"6fRô÷Vâà ¥7F÷&vRf÷VæFF–öâöæÇ’ÂæòæWrÖ–â–çBWF†÷&–æröF—7Æ’â&–æF–ær÷VRVçF–À§&öGV7F–öâfÆ–F—G’÷&V&–æF–ær'&–FvS²æò–çBW‡÷'BõUb&÷vF–öâõ4„ÖWF†VçF–6FV@§&ö¦V7B6Æ–Òâãƒ“‚f–ÆRv÷&¶fÆ÷rW6W%52&÷FV7FVBâæò7–çF†WF–2f—‡GW&RFWf–6RFW7Bà ¢22ãƒ“’V&Æ–6F–öâfW&–f–VB(	B##bÓÓp ¥'VçF–ÖSCs3cs3–3ccvV6F#CCƒ–6fS†#sS3ss3cƒ²FW7FVBG&VP¦Fvc–S“ƒscfFfc““†csScCfFV##“CvF3c“&SÖF6†W2fWF6†VBÖ–âöÆö6ÂW†7FÇ’à¤æöFS#"ã#2ã2F÷öÆöw’4“3“#ƒCc3#‚ö¦ö#s3ƒ3ƒscc#‚5T44U53#Cƒu52ód”Âó6¶—°¥vW33“#ƒCS“"'V–ÆCs3ƒ3ƒssCcRöFWÆ÷“s3ƒ3“S3“sb5T44U52à¥÷7FFWÆ÷–ÖVçBW†7BÆ—fR6†VÆÂ÷fW'6–öâÂÆ#ƒ“’–æFW‚ö6öçG&öÆÆW"÷6W76–öâæB6†ævV@¦ÖævW"öÖævVÖVçBöG&vW"ö6öFV2÷&ö¦V7BÔtÄ"öæWr–çBÖ6öFV2w&ƒƒ“’'—FRÖÖF6‚&W÷6—F÷'“°§Væ6†ævVB&W6÷W&6Sƒ“‚æB&V6÷fW'’ÆöFW#ƒ“’w&‚Ç6òÖF6‚â&÷FV7FVB×VÇF’×G&ç6f÷&Òð¦g&÷¦VâöÖöFVÆÆ–ærö''W6‚÷&Wf–Wr'—FW2&WF–æVBâW6W#ƒ“…52&÷FV7FVC³ƒ“’æV&'’Æ"öÖ–à§&ö¦V7BFWf–6R6æ—G’VæF–ærâæòæWr&VæFW&VBõVæ6–Â&ööb÷"Ö–â–çBWF†÷&–ær6Æ–Òà¤Fö7VÖVçFF–öâ&ööb6†ævW2æòFW7FVB'VçF–ÖR'—FW2âæW‡B&÷VæFVB÷&–v–æÂÖ÷væW §6VÆV7FVBÖö&¦V7B–çB'&–FvR&WV—&W2fÆ–F—G’÷&V&–æF–æröÆ–fWF–ÖR÷&VgW6Â'VÆW2&Vf÷&RT’à ¢22ã“(	BÖ–âf–Ww÷'BUb–çBÂFWf–6RvFRVæF–æp ¢Ò·…Ò÷&–v–æÂUbF÷öÆöw’ö6öFV2&–æF–æs²Ö÷fVBvVöÖWG'’föÆÆ÷w2Væ6†ævVBUg2ÂæÖW2ô”G2W†6ÇVFVC²UbVF—G2÷7FÆR÷Vç7W÷'FVB÷væW'2&VgW6Rà¢Ò·…Ò&VÂF‡&VR7F—fRg&öçB&—2öö66ÇW6–öâÂæòÖ÷õ&VFòö6æ6VÂÂ4õr6†V6·ö–çBæBvÆö&Â†—7F÷'’ÂW†7B&ö¦V7B'—FW2à¢Ò·…Ò7–æ2÷Væ–æröF—7Æ’&6W2Âöæ6RÖöæÇ’F—7÷6ÂÂF—'G’Ög&ÖRWÆöG3²÷&–v–æÂ&VæFW"÷væW"7F—fRöÆ—fR²–æ7F—fRöÆö6¶VBæB÷&F–æ'’Æöö²&W7F÷&F–öâà¢Ò·…Ò7GVÂ–çBT’v–æF÷r6GW&RõVæ6–Âö†÷fW"öf–ævW"÷ÆÒ÷&W77W&Rö–çFW''WF–öâö6öçFW‡BÆ÷72&÷WF–ærFFVB–âæöFS²gVÆÃ#C“E52ód”Âó6¶—à¢Ò·…Ò‚ã“W6W"52’æF—fRUb7V&RÂ7V$BôÖ—'&÷"öfb(i"f–ÆRõ–çB6VÆV7FVBö&¦V7B(i"Væ6–ÂÖ&·2V"GW&–ærÖ÷F–öã²f–ævW'2÷&&—B÷â÷–æ6‚v—F†÷WB–çBà¢Ò·…Ò‚ã“W6W"52’G'’&÷F‚''W6†W2÷6WGF–æw3²FöæR(i"vÆö&ÂVæFõ&VFó²&V÷VâFò6öçF–çVS²GWÆ–6FRöVF—BÆVfW2÷&–v–æÂ–çB–çF7Bà¢Ò·…Ò‚ã“W6W"52’6fRæ&÷†Æ"(i"&VÆöBô÷Vâ&W7F÷&W2–çB–â7GVF–òõ6öÆ–BõUb–ÖvS²÷&F–æ'’ö&¦V7BÖ÷fR&WF–ç2–çBà ¤f—'7B6–ævÆR÷VSS,+"&6RÆ–W"öæÇ’â6V×26â&ÆVVC²Ub÷F÷öÆöw’VF—G2wV&FVBÀ¦æ÷B6–ÆVçFÇ’&V&÷VæBâ–çFVBô$¢ôtÄ"ôäôÒæB¦ö–â&VgW6RVæF–ær&÷vF–öâöW‡÷'Bà¥6fRæ&÷†Æ#²vÆö&Â†—7F÷'“SVçG&–W2Â7W'&VçBVæ—VRööÃ„Ö”"âFWf–6R÷&VæFW&–æræ÷@¦–æfW'&VBg&öÒæöFR÷"&Wf–÷W2Æ"52âW6W#ƒ“•52&÷FV7FVBà ¢22ã“V&Æ–6F–öâfW&–f–VB(	B##bÓÓp ¥'VçF–ÖVV##f#““CcFS6svCc–fSSS“ƒƒsƒƒFCvS²FW7FVBG&VP¦#cƒvc&#&c3ccVc3ƒ–ccvS&F#Scv&c““#Cƒv&bÖF6†W2fWF6†VBÖ–âöÆö6ÂW†7FÇ’à¤æöFS#"ã#2ã2F÷öÆöw’4“3“3ƒCƒö¦ö#s3“c“3SR5T44U53#C“E52ód”Âó6¶—°¥vW33“3ƒ3cs"'V–ÆCs3“c“3ƒCRöFWÆ÷“s3“s“ƒ3b5T44U52à¥÷7FFWÆ÷–ÖVçBW†7B6†VÆÂ÷fW'6–öâÂÖ–âf–Ww÷'B–çB÷F&vWBö6÷&R÷&VæFW"÷&F–Âð¦ÖævW"öÖævVÖVçBöG&vW"öW‡÷'B÷&VgW6Â&VçBw&ƒ“ÇW2Æ#“–æFW‚ö6öçG&öÆÆW ¦æBVæ6†ævVB66WFVB&7FW"÷7G&ö¶Sƒ“b'—FRÖÖF6‚&W÷6—F÷'’â&V6÷fW'““ÖF6†W2à¥&÷FV7FVB×VÇF’×G&ç6f÷&Óãög&÷¦VâöÖöFVÆÆ–ærÆv÷&—F†×2ö''W6‚'—FW2&WF–æVBâW6W#ƒ“¥52&÷FV7FVC³“7GVÂf–Ww÷'BõVæ6–Âöæf–vF–öâ÷&ö¦V7BFWf–6RvFRVæF–ærà¤æò&VæFW&VBö•B&ööb–æfW'&VBg&öÒæöFRFFW'2÷"&Wf–÷W26Æ÷VBvV$tÂÆ–Ö—FF–öâà¤Fö7VÖVçFF–öâ&ööb6†ævW2æòFW7FVB'VçF–ÖRâæW‡C¢FWf–6RfVVF&6²ÂF†VâfÆGFVæV@§–çBW‡÷'BF‡&÷Vv‚÷&–v–æÂtÄ"ôäôÒ÷væW'3²–çFVBW‡÷'B&VgW6Â&VÖ–ç2ÖVçv†–ÆRà ¢22ã“(	B–çFVBæF—fRäôÒòtÄ"W‡÷'BÂFWf–6RvFRVæF–æp ¢Ò·…Ò6†&VBär6¶v–æs¢W†7E$t#‚÷5$t"ö÷VR—†VÇ2÷&÷w2ô5$2÷¦Æ–"÷6÷W&6R÷væW'6†—²W†—7F–ær66Æ"FW7G2&WF–æVBà¢Ò·…Ò7GVÂæF—fR–ÖvRöÖFW&–Âö†VFW"õUb÷öÇ–vöâ'—FW2æBFVGW²7GVÂtÄ"W‡÷'FW"öÆöFW"õärõUb÷v†—FRf7F÷'2÷–çFVB6÷W&6Rv–æF–ærà¢Ò·…ÒvVöÖWG'’õUb÷—†VÂ6GW&R&Vf÷&Rv—C²7FÆRô&6R÷Vç7W÷'FVB&VgW6Ç3²&r7–æ6‡&öæ÷W2æBô$¢6fVwV&B&WF–æVBà¢Ò·…Ò7GVÂf–ÆRäôÔBæBtÄ"7F–öç2F÷væÆöB–çBÂ&W÷'B6öÆ÷W"6÷VçBæB&W7F÷&R'WGFöç3²6—‚fö7W6VB6†V6·253²gVÆÂæöFS#B#S52ód”Âó6¶—à¢Ò·…Ò‚ã“W6W"52’–çB7–ÖÖWG&–26öÆ÷W'2öÖ&·2ÂFöæR(i"f–ÆRäôÔB(i"÷Vâ–âæöÖC¢6ö×&RÆ6VÖVçBö÷&–VçFF–öâö6öÆ÷W"à¢Ò·…Ò‚ã“W6W"52’&WVBtÄ"´&6S²–çFVBGWÆ–6FR&WF–ç2—G2÷vâ6öÆ÷W"õUg2Æöæw6–FR÷&–v–æÂà¢Ò·…Ò‚ã“W6W"52’6öçF–çVR&÷„Æ"–çBõVæFòæBæ&÷†Æ"6fRô÷VâgFW"W‡÷'G3²÷&–v–æÂ&W6÷W&6R&VÖ–ç2VF—F&ÆRà ¤fÆGFVæVB6öÆ÷W"öæÇ’–âäôÒôtÄ"âæ&÷†Æ"&WF–ç2VF—F&ÆR–çB&W6÷W&6S²æòÆ–W"ð¦''W6‚Ö†—7F÷'’õ%"W‡ç6–öâ÷6VÒ×6fRôäôÒ–×÷'B6Æ–Òâã“FWf–6R52&÷FV7FVBà ¢22ã“V&Æ–6F–öâfW&–f–VB(	B##bÓÓp ¥'VçF–ÖS3&6633†f36&6Cƒƒ“Ff#–c3vVC–Cs3##3²FW7FVBG&VP£Ssƒ“3c“6cC&cFCs##†CCƒ#ƒ–cF6C#BÖF6†W2fWF6†VBÖ–âöÆö6ÂW†7FÇ’à¤æöFS#"ã#2ã2F÷öÆöw’4“3“3c“3ƒCbö¦ö#sCƒSs3csb5T44U53#S52ód”Âó6¶—°¥vW33“3c“3ss‚'V–ÆCsCƒSsS#’öFWÆ÷“sCƒcƒ#S25T44U52à¥÷7FFWÆ÷–ÖVçBW†7BÆ—fR6†VÆÂ÷fW'6–öâæBW‡÷'B×æVÂöæF—fRÖ6÷&R÷6¶VB×&VçBð¥äröæWr–çBÖW‡÷'Bw&ƒ“ÇW2Æ#“–æFW‚ö6öçG&öÆÆW"'—FRÖÖF6‚&W÷6—F÷'’à¥Væ6†ævVBÖ–â–çBö&–æF–æs“æB&V6÷fW'““ÖF6‚â&÷FV7FVB×VÇF“ãög&÷¦Vâð¦ÖöFVÆÆ–ær÷&7FW"ö–çWB'—FW2&WF–æVBâW6W#“52&÷FV7FVC³“W‡FW&æÂæöÖBæ@¤tÄ"6öÆ÷W"ö÷&–VçFF–öâ÷Æ6VÖVçBFWf–6RvFRVæF–ærÂæò&VæFW&VB&ööb–æfW'&VBà¤Fö7VÖVçFF–öâ&ööb6†ævW2æòFW7FVB'VçF–ÖRâæW‡BFWf–6RW‡÷'BfVVF&6²ÂF†VâÆ–W"ð¦6ö×÷6—F÷"FW6–vâF‡&÷Vv‚÷&–v–æÂ÷væW'3²æ&÷†Æ"&VÖ–ç2VF—F&ÆR–çB&ö¦V7Bà  ¢22ã“"(	BÆ–W"ö6ö×÷6—F÷"f÷VæFF–öã²ã“W6W"52(	B##bÓÓ€ ¥W6W#“52&÷FV7G2–çFVBäôÔBôtÄ"Æ6VÖVçBö÷&–VçFF–öâö6öÆ÷W"Â–æFWVæFVç@§–çFVBGWÆ–6FW2æB6öçF–çVVB–çF–ærõVæFòòæ&÷†Æ"âVF—BÖ–ã&f#cƒ“¢&7FW#ƒ“`§w&—FW2÷VR'—FW2Â&W6÷W&6Sƒ“‚÷&ö¦V7Cƒ“’öW‡÷'C“†fRæòVF—F&ÆRÆ–W"7F6²à¤æWr—6öÆFVB–çBÖÆ–W"×7F6²“¢W†—7F–ær÷VR&6R²WFó27G&–v‡BÖÇ†£S,+"÷fW&Æ—2Â&÷VæFVB”G2öæÖW2Âf—6–&ÆRö÷6—G’Â÷væVB6GW&RöVæB÷&WÆ6RÀ¦'—FR×76R6÷W&6RÖ÷fW"æBfÆGFVæVB&W6÷W&6Rf–õ$”t”äÂ6GW&T6öÆ÷W%&W6÷W&6Rà¤æòæWr†—7F÷'’ö–çWBö¶W&æVÂ÷"v—&–ærâ7G&–7B66†VÖ2ö'VFvWG3²G—VB'VffW'0§&VBÖöæÇ’'’6öçfVçF–öââ7W'&VçB6÷’ÖÆÂ’†2æò7'6Rô4õr÷W&f÷&Öæ6R6Æ–Òà¤f—fRfö7W6VB6†V6·253¢W†7B&ÆVæF–ærö÷&FW"÷f—6–&–Æ—G’ö÷6—G’÷&÷w2Â–çWBöVF—Bð¦÷WGWB—6öÆF–öâÂ&VgW6Âö'VFvWG2öÖ‚7F6²Â7GVÂ÷&–v–æÂ&ö¦V7B²æF—fRäp¦fÆGFVæVB†æFöfc²VF—F&ÆR7F6²7F–ÆÂ&VgW6W22&ö¦V7B6öÆ÷W%–çBà¥&VBFö72÷–çBÖÆ–W"×7F6²Ó“"æÖBâæòÆ–W"T’÷G&ç7&VçB''W6‚öVF—F&ÆRÆ–W"6fP¦6Æ–ÒâæòæWr†æG2ÖöâFW7C²W†—7F–ær–çBöW‡÷'BVæ6†ævVBâ6†VÆÂ÷&V6÷fW'““#°¦Ö–â–çC“öW‡÷'C“÷&W6÷W&6Sƒ“‚÷&ö¦V7Cƒ“’öÆ#“÷&÷FV7FVBög&÷¦Vâ'—FW2&WF–æVBà¤æW‡B6W&FRÆ–W&VB66VæR&W6÷W&6R÷&ö¦V7B6öFV2²FöÖ–2÷Vâö†—7F÷'’öGWÆ–6FP¦–çFVw&F–öâÂF†VâG&ç7&VçB&7FW"õT’F‡&÷Vv‚7W'&VçBf–Ww÷'B÷væW"âV&Æ–6F–öà¦æBgVÆÂ×7V—FRWf–FVæ6RföÆÆ÷s²æó“"FWf–6R52–æfW'&VBà ¢Ò·…Òf—fRfö7W6VC“"6†V6·26÷fW"W†7B6÷W&6RÖ÷fW"ö÷&FW&–ær÷f—6–&–Æ—G’ö÷6—G’À¢÷VR÷WGWBö7–ÖÖWG&–2&÷w2Â–æFWVæFVçB6GW&W2öVF—G2öfÆGFVâÂ7G&–7B66†VÖð¢'VffW"ô”B÷6—¦RöÆ–W"Æ–Ö—G2æBÖƒS,+"7F6²à¢Ò·…ÒfÆGFVæVB'—FW27W'f—fR÷&–v–æÂ&ö¦V7BöæF—fRæöÖBär÷væW'3²&ö¦V7@¢&V¦V7G27F6²2÷VR6öÆ÷W%–çB&F†W"F†â6–ÆVçFÇ’F—66&F–ærÆ–W'2à¢ÒæòæWr†æG2Ööã“"6†V6³¢Æ–W"’—2–çFVçF–öæÆÇ’æ÷BÆöFVB'’öÆ"à ¢ã“"Æö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ7V—FR¢£#SR52òd”Âò6¶—VB¢£°¦f—fRæWrfö7W6VB6ö×÷6—F÷"6†V6·252âæòæWrFWf–6R÷&VæFW&VBÆ–W"&ööbà  ¢22ã“2(	BÖ6·2ö&ÆVæBf÷VæFF–öâæBÖFW&–ÂF—&V7F–öâ(	B##bÓÓ€ ¥W6W"&WVW7G27W&f6R–ÖvRÆ6VÖVçBõ&ö¦V7Bg&öÒf–WrÂ–ç6W'BÖ÷f^(i%&÷FF^(i%66ÆRF ¦7–6ÆRÂÖ6·2ö&ÆVæBÖöFW2æBæöÖB×7G–ÆRÖFW&–Â6Æ÷G2v—F‚F—7Æ6VÖVçBÆ6V†öÆFW"à¥&VBFö72÷–çBÖÖFW&–ÂÖF—&V7F–öâæÖBf÷"&WV—&VÖVçG2Â6WVVæ6–æræBÆ–Ö—FF–öç2à¤VF—Csƒv6f6#“£“"6ö×÷6—F÷"æ÷&ÖÂÖöæÇ“³“–çBóƒ“’&ö¦V7Bó“W‡÷'B÷VRà¤W‡FVæB4ÔR—6öÆFVB7F6²÷væW"Fòc"v—F‚÷væVBW"Ö÷fW&Æ“‚Ö&—B6÷fW&vRÖ6·2À¦Væ&ÆRö–çfW'BæC#b6öÆ÷W"&ÆVæBÖöFW2–â–çBÖ&ÆVæBÖÖöFW3“2âcæ÷&ÖÂWw&FP¦'—FRÖ–FVçF–6Ã²7G&–7BVæ¶æ÷vâf–VÆG2ö–çfÆ–BÖöFW2öÖ6·2æB7'6R'&—2&VgW6Rà¤Ç†9v÷6—Gœ9vÖ6²vFW2&ÆVæFVB$t#²æ÷&ÖÂW†7C“#²7FæF&Bs426öÆ÷W"f÷&×VÆ2À¦W‡G&ÖöFW2W‡Æ–6—FÇ’FVf–æVB–âFö72÷–çBÖÆ–W'2Ó“2æÖBâæ÷BæöÖB&—B×&—G’÷ ¦æ÷&ÖÂ×fV7F÷"÷66Æ"õ%"&ÆVæF–ærâ'VffW'2&VBÖöæÇ’'’6öçfVçF–öã²ÖƒBãsTÖ”"7F6°§ÇW26÷–W2öfÆB÷WGWG2ÂæòÖV7W&VBW&f÷&Öæ6R6Æ–Òà¥6WfVâfö7W6VC“26†V6·253²W†—7F–æs“"6VÖçF–26†V6·2&WF–æVB‡Væ¶æ÷vâÖÖöFP§&VgW6Â7WW'6VFW2—G2ö'6öÆWFR×VÇF—Ç’&VgW6Â’â7GVÂ÷VR&ö¦V7BöæF—fRäp¦†æFöfb&WF–æVBâæòöÆ"Æ–W"T’ÂÖ6²G&v–ærÂ–ÖvR&ö¦V7F–öâ÷"VF—F&ÆP¦Æ–W"W'6—7FVæ6R–WBâÖ–â&W6÷W&6R÷&ö¦V7BöW‡÷'B6öçF–çVR&VgW6–ærVF—F&ÆR7F6²à¥6†VÆÂ÷&V6÷fW'““2Â—6öÆFVB6†–ÆC“3²Ö–ã“öW‡÷'C“öÆ#“ö''W6ƒƒ“b÷&÷FV7FV@¤×VÇF“ãög&÷¦VâöÖöFVÆÆ–ær÷væW'2Væ6†ævVBâæòæWr†æG2ÖöâFW7B÷"W6W#“552à¤æW‡BW‡Æ–6—BÆ–W&VB66VæR÷&ö¦V7BööÂF‡&÷Vv‚÷&–v–æÂ6öFV2ö†—7F÷'’öGWÆ–6FP¦÷væW'2ÂF†VâG&ç7&VçB''W6‚¶Æ–W"öÖ6²T“²–ÖvR&ö¦V7F–öâô–ç6W'BÖ7–6ÆRföÆÆ÷w2à¤gVÆÂ7V—FR÷V&Æ–6F–öâ&ööbföÆÆ÷w3³“W6W%52&VÖ–ç2ÆFW7B66WFVBFWf–6RvFRà ¢Ò·…Ó#bf—†VBw&—66ÆRfV7F÷'2²æöæÆ–æV"'&æ6‚öVæGö–çG3²6öÆ÷W"ÖÇVÖ–æ÷6—G’öv×W@¢æBv†öÆRÕ$t"F&¶W"öÆ–v‡FW"6VÆV7F–öã²ÆÃ#bÖöFW2f–æ—FRö&÷VæFVBöãC’6öÆ÷W"—'2à¢Ò·…ÔÖ6²v†—FRö&Æ6²öw&W’öF—6&ÆVBö–çfW'FVBÂ6÷fW&v\9vÇ†9v÷6—G’Â÷væVB'—FW2À¢–çfÆ–B66†VÖöÖöFR÷6—¦RÂ7–ÖÖWG&–2Ub×cÖf—'7B&÷w2ÂcWw&FRæB7'6R&VgW6Âà¢Ò·…Õär÷WGWBW†7C²W†—7F–æs“"7GVÂ&ö¦V7BöæF—fR†æFöfbFW7G2&WF–æVBà¢ÒæòæWs“2FWf–6RFW7C¢Ö–â–çBöÆ"T’Væ6†ævVBÂ6ö×÷6—F÷"7F–ÆÂ—6öÆFVBà ¢ã“2Æö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£#S"52òd”Âò6¶—VB¢£°§6WfVâæWrfö7W6VB6†V6·2²W†—7F–æs“"FW7G252âæò&VæFW&VBöFWf–6RvFR–æfW'&VBà  ¢22ã“B(	BVF—F&ÆRÆ–W&VB&ö¦V7Bö†—7F÷'’&W6÷W&6W2(	B##bÓÓ€ ¤VF—CVVfF3vC“¢W†—7F–ær6öÆ÷W%–çB†—7F÷'’ö÷&F–æ'’GWÆ–6FRÇ&VG’6†&R&VBÖöæÇ§&W6÷W&6W2âæWr–çBÖÆ–W"×&W6÷W&6R÷væW"7F÷&W2W‡Æ–6—BÆ–W&VB&W6÷W&6Wc"–â4ÔP¦6öÆ÷W%–çBf–VÆC¢fÆ–FFVB÷VR&Wf–Wr²÷væVC“27F6²v—F‚W†7BÖ6·2öÖöFW2à¤÷&–v–æÂ6öÆ÷W%–çEööÂVçG'—c"æB66VæW&ö¦V7Gc2G&ç7÷'BÆÂ'VffW'2F‡&÷Vv€¦÷&–v–æÂ6æöæ–6Â'—FW2Âv†öÆR×&W6÷W&6RFVGW³„Ö”"vw&VvFR$Tdõ$RFV6öFR–æ6ÇVFW0¦fÆBö&6Rö÷fW&Æ—2öÖ6·2âÆ–çcö÷VWc"Væ6†ævVC²7G&–7Bf–VÆB÷fW'6–öâ÷&Vbö66†Rð¦'VFvWB÷Vç7W÷'FVB÷væW"wV&G2â÷&–v–æÂæF—fUUgc2&VÖ–ç2UbÖöæÇ’à¥6ÖR†—7F÷'’ö6†V6·ö–çB÷6–ævÆR´×VÇF’GWÆ–6FRöFöÖ–2÷Vâ÷væW'2Væ6†ævVBâ÷&–v–æÀ§7W&f6RF—7Æ’&VG2fÆ–FFVBfÆB6öÆ÷W#²W‡÷'BFFW"fÆ–FFW2ö6GW&W2÷væV@¦fÆGc$Tdõ$Rv—BæBW6W2W†—7F–æräôÒôtÄ"w&—FW'2âVF—F&ÆRÆ–W'2W'6—7BöæÇ¦–âæ&÷†Æ"âW†—7F–ær÷VR–çFW"&VgW6W2Æ–W&VB&W6÷W&6RVçF–Â6öçG&öÇ2ÆæBÀ§&WfVçF–ærFW7G'V7F—fRfÆGFVæ–ærâæòæWrÆ–W"T’ö–ÖvR6÷W&6W2öÖFW&–ÂWF†÷&–ærà¥6WfVâfö7W6VC“B6†V6·253¢W†7B&W6÷W&6R÷&ö¦V7B÷ööÂÂ&VÂ†—7F÷'’öGWÆ–6FW2À¤f–ÆR6fRô÷Vâö6÷''WB–çWB÷&VæFW"&öÆÆ&6²Â7GVÂäôÒôtÄ"¶7–æ26æ6†÷Bæ@¦6öÖÖ—GFVBF—7Æ’÷–çFW"wV&BâæöFRG&ç7÷'BFFW'2&Ræ÷B&VæFW&VBö•B&ööbà¥&VBFö72÷–çBÖÆ–W"×&W6÷W&6W2Ó“BæÖBâ6†ævVB6öFV2öW‡÷'Bö&–æF–ær÷–çB÷&VæFW"°§&VçBÆöFW"w&ƒ“C²Ö–âÖöFVÆÆ–ærô×VÇF“ãög&÷¦Vâö''W6‚Æv÷&—F†×2Væ6†ævVBà¤æòW‡G&“"ó“2ó“BFWf–6U52–æfW'&VC³“W6W%52&VÖ–ç2&÷FV7FVBà¤æW‡B$TÂÆ–W"T’÷G&ç7&VçB''W6‚F‡&÷Vv‚÷&–v–æÂf–Ww÷'Bö†—7F÷'’æBF†—0§&W6÷W&6S²Fòæ÷BFB&ÆÆVÂ–çDÆ–W'2&÷W'G’÷"†—7F÷'’âgVÆÂ7V—FRæ@§V&Æ–6F–öâ&ööbföÆÆ÷râÖçVÃ“C¢W†—7F–ær–çB÷6fR÷&V÷VâõVæFòôGWÆ–6FRöW‡÷'@§&Vw&W76–öâöæÇ“²æWrÆ–W&VBf—‡GW&W2WFöÖFVBÂæ÷BW6W"F6·2à ¢Ò·…ÔÆ–W&VB&W6÷W&6Wc"W†7B&Wf–Wr÷7F6²6†V6²æB÷væVBÖ6·2ö&6Rö÷fW&Æ—2à¢Ò·…ÔW†7B66VæWc2&÷VæGG&—÷6†&VBFVGW²Æ–çcö÷VWc"&W6W'fVBÂ7G&–7@¢fW'6–öç2öÖöFW2÷&Vg2ö6÷''WF–öâö6ö×ÆWFS„Ö”"&rööÂ&Vf÷&RÆÆö6F–öâà¢Ò·…Ô7GVÂ6–ævÆRô×VÇF’GWÆ–6FRö6†V6·ö–çBõVæFõ&VFò²&WÆ6VÖVçB—6öÆFRÖ6·2à¢Ò·…Ô7GVÂ6fRô÷Vâö6÷''WBÆ–W&VBG&ç7÷'Böf–ÆVB×&VæFW"&öÆÆ&6²Væ6†ævVBà¢Ò·…Ô7GVÂäôÒôtÄ"fÆGFVâ¶7–æ26æ6†÷C²÷&–v–æÂ7W&f6RöÆVv7’×–çFW"&VgW6Âà¢Ò·…Ò‚ã“BW6W"52’W†—7F–ær÷VR–çN(i$Föæ^(i%6fRæ&÷†Æ.(i'&VÆöBô÷Vî(i&6öçF–çVRõVæFõ&VFò6æ—G’à¢Ò·…Ò‚ã“BW6W"52’÷&F–æ'’GWÆ–6FR–æFWVæFVçB–çBæBäôÔBôtÄ"6öÆ÷W"&Vw&W76–öâ6æ—G’à ¢ã“BÆö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£#S’52òd”Âò6¶—VB¢£°§6WfVâæWr&W6÷W&6Rö†—7F÷'’ö6öFV2öW‡÷'B6†V6·252âæòFWf–6R66WFæ6R–æfW'&VBà  ¢22ã“R(	Bf—6–&ÆRÖ–âf–Ww÷'B6öÆ÷W"Æ–W'3²ã“B52(	B##bÓÓ€ ¥W6W#“E52&÷FV7G2–çB6fRô÷VâõVæFòôGWÆ–6FRôäôÒôtÄ"&Vw&W76–öââVF—CC#Ccs3S ¦6öææV7BW†—7F–æs“–çFW"ó“27F6²³#b&ÆVæG2ó“B&W6÷W&6RæB÷&–v–æÂ66VæR†—7F÷'’à¤Æ–W'2æVÃ¢6VÆV7B÷F÷Öf—'7BÂ²Æ–W"†Öƒ2’Â&VæÖR÷&V÷&FW"öFVÆWFRÂf—6–&–Æ—G’À¦Æ–W"÷6—G’æC#bÖöFW2â&6R–çF&ÆRö÷VS²W†—7F–ærc6öçfW'G2öæÇ’öâ²Æ–W"à¥6ÖR&7FW"v–ç2÷F–öæÂ7G&–v‡BÖÇ†Æ–W"ÖöFRv—F‚&W6W'fVB÷VRFVfVÇBÀ§&W77W&Rö†&FæW72÷W"×7G&ö¶R6ö6æ6VÃ²6ÖR7G&ö¶Rö–çWB÷&–67Böæf–vF–öâ÷væW'2à¥6W&FR×WF&ÆRÆ–W"ö6ö×÷6—FR&Wf–Ws²÷&–v–æÂöæRF—'G’WÆöBög&ÖS²æòÖV7W&V@¤Ó"W&f÷&Öæ6R6Æ–Òâv†öÆR×7F6²6÷–W2÷&VfÆ–v‡B&VÖ–âÂæ÷B7'6R÷F–Ö—¦F–öâà¤WfW'’6†ævVB7G&ö¶RöÖWFFF÷W&F–öâ6†V6·ö–çG2÷&–v–æÂ66VæRæB4õr&WÆ6W0§&W6÷W&6S²6VÆV7F–öâöæòÖ÷7&VFW2æò†—7F÷'’âgVÆÂ×66VæS„Ö”"ööÂ6†V6¶VB$Tdõ$P¦6†V6·ö–çC²–çfÆ–Bö'VFvWBö6†V6·ö–çBf–ÇW&R&W7F÷&W2÷&–v–æÂ&W6÷W&6R÷&Wf–Wrà¥7F÷&VBÖ6·2W'6—7C²æòÖ6²ö–ÖvRöÖFW&–ÂT’6Æ–Òâ6fRô÷Vçc2æBfÆBäôÒôtÄ"W6P¦÷&–v–æÃ“B÷væW'2â†–FFVâ÷¦W&ò÷6—G’Æ–W"&VgW6W27G&ö¶W2v†–ÆRæVÂ7F—2÷Vâà¥6WfVâfö7W6VC“R6†V6·253²ÆÂ÷&–v–æÃ“76W'F–öç2&WF–æVB–âW‡G&7FVB6†&V@§'VçF–ÖRã“B&VgW6Â76W'F–öâ7WW'6VFVB'’&VÂÆ–W&VB÷Væ–æröVF—F&ÆR×F‚FW7G2à¥&VBFö72÷–çBÖÆ–W"×V’Ó“RæÖBâ6†ævVB–çFW"÷6†&VB&7FW"æBÆ"ÆöFW"w&ƒ“S°¦6ö×÷6—F÷#“2÷&W6÷W&6R·&ö¦V7B¶W‡÷'C“B÷7G&ö¶Sƒ“b÷&÷FV7FVBög&÷¦Vâ÷væW'2&WF–æVBà¤æW‡BDUd”4RÆ–W"õVæ6–Âöæf–vF–öâ÷W'6—7FVæ6RfVVF&6²ÂF†VâÖ6²–çBõT’F‡&÷Vv€§6ÖR÷væW'2ÂföÆÆ÷vVB'’–ÖvR&ö¦V7F–öâô–ç6W'B7–6ÆRöÖFW&–ÂÆââgVÆÂ7V—FRæ@§V&Æ–6F–öâ&ööbföÆÆ÷râæó“RW6W%52÷"&VæFW&VB'&÷w6W"Wf–FVæ6R–æfW'&VBà ¢Ò·…ÕG&ç7&VçBö÷VR&7FW"fV7F÷'2ÂÇ†6÷fW&vRö6æ6VÂÂ6ÖR÷&–v–æÂ7G&ö¶Rà¢Ò·…Ô7GVÂÆ–W"T’õVæ6–Â7FFRö†—7F÷'’ö&6R—6öÆF–öâö÷&FW"öæÖR÷f—6–&–Æ—G’ö&ÆVæG2à¢Ò·…Õ66VæR'VFvWBö6†V6·ö–çB&öÆÆ&6²ÂÖ6·2&WF–æVBÂc2&RÖ÷VâæBæF—fRW‡÷'Bà¢Ò·…Ò‚ã“RW6W"52’Gvò6öçG&7F–ærÆ–W'2²&6S¢6VÆV7B÷&V÷&FW"ö†–FRö÷6—G’ö&ÆVæBÂVæ6–Âöf–ævW'2à¢Ò·…Ò‚ã“RW6W"52’FöæRõVæFõ&VFò÷&V÷VâæBæ&÷†Æ"&VÆöBô÷Vâ¶VWVF—F&ÆRÆ–W'2à¢Ò·…Ò‚ã“RW6W"52’GWÆ–6FRÆ–W"VF—G2–æFWVæFVçC²æF—fRäôÒôtÄ"÷F–öæÂ6öÆ÷W"6æ—G’à ¢ã“RÆö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£#S#b52òd”Âò6¶—VB¢£°§6WfVâæWrÆ–W"÷&7FW"õT’6†V6·252Â÷&–v–æÂ6VÖçF–26†V6·2&WF–æVBâ•BvFRVæF–ærà  ¢22ã“b(	BÖ–âf–Ww÷'BÆ–W"Ö6²–çF–æs²ã“R52(	B##bÓÓ€ ¥W6W#“U53¢Æ–W'2v÷&²vVÆÃ²T’õU‚öÆ—6‚gFW"fVGW&RfÆ÷w2&R&W6VçBâVF—@¦Ö–æcƒCSS#3böÆö6ÂfW&–f–VC“RG&VVf#“##sC¢&WW6S“2Ö6·2ö6ö×÷6—F÷"Ã“B&W6÷W&6Rð§&ö¦V7Bö†—7F÷'’öW‡÷'BæC“R&7FW"ö–çWBâFBÖ6²6VÆV7G2Ö6²–çBF&vWC²6ÖP¦÷VR&7FW"VF—G2&rw&W’6÷fW&vRÂ#‚6öÖÖ—GFVBÂ6÷W&6R6öÆ÷W"—†VÇ2Væ6†ævVBà¤†–FRõ&WfVÂôw&W’''W6‚&W6WG266÷VçBf÷"–çfW'6–öã²&rfÇVS(	3#SR6Æ–FW"Â6—¦Rð¦†&FæW72÷&W77W&Rö÷6—G’æB&÷F‚6×ÆW'2&WF–æVBâ6öÆ÷W"–6¶W"&W6W'fVBöF—6&ÆV@¦–âÖ6²ÖöFRâÆ–W"7v—F6‚÷&V÷Vâ7F'G26öÆ÷W#²&6R†2æòÖ6²âVæ&ÆVBö–çfW'Bð§&VÖ÷fRW6R4õr²÷&–v–æÂ6†V6·ö–çG3²6VÆV7F–öâ÷&W6WBöæòÖ÷Fòæ÷B7&VFR†—7F÷'’à¤6æ6VÂ÷6WGF–æw2÷F&vWBöÆ–W"ö&öG’ÖÆ÷72&W7F÷&RÖ6²÷&Wf–Wröæf–vF–öââ&VçBÆ–W ¦×W7B6†÷röæöç¦W&ò÷6—G’æBÖ6²Væ&ÆVBFò–çBâ÷&–v–æÃ„Ö”"&VfÆ–v‡B÷&öÆÆ&6°§&W6W'fVBâ6ÖR&W6÷W&6Wc"÷&ö¦V7Gc2öfÆBäôÒ´tÄ"ÂæòæWr66†VÖö†—7F÷'’ö¶W&æVÂà¥6WfVâfö7W6VC“bFW7G252–æ6Â7GVÂT’ö6÷&R÷6÷W&6R&W6W'fF–öâÂfÆw2õVæFõ&VFòÀ¦–çFW''WF–öâö–çfÆ–Bö'VFvWBö6†V6·ö–çB&öÆÆ&6²ÂW†7B6fRô÷Vâ÷&RÖVF—BæBæF—fP¦W‡÷'BâgVÆÂ7V—FR÷V&Æ–6F–öâ&ööbföÆÆ÷w3²æò&VæFW&VBö•B66WFæ6R–æfW'&VBà¥&VBFö72÷–çBÖÖ6²×V’Ó“bæÖBâöæÇ’Ö–â–çFW"²6†VÆÂ÷&V6÷fW'““c²&7FW"ôÆ#“RÀ¦6ö×÷6—F÷#“2÷&W6÷W&6R·&ö¦V7B¶W‡÷'C“BæB&÷FV7FVBÖöFVÆÆ–ærô×VÇF’ög&÷¦VâVçF÷V6†VBà¤æW‡BDUd”4RÖ6²vFRÂF†VâVF—F&ÆR–ÖvR6÷W&6W2õ&ö¦V7Bg&öÒf–WrF‡&÷Vv‚÷&–v–æÀ¥UbövVöÖWG'’æB–ç6W'B7–6ÆRâæòÖFW&–Â÷6—G’öF—7Æ6VÖVçB÷"'&öBT’&VFW6–và¦6Æ–Òâ&öGV7BF—&V7F–öâ&VÖ–ç2Fö72÷–çBÖÖFW&–ÂÖF—&V7F–öâæÖBà ¢Ò·…ÔÖ6²7G&ö¶W2&W6W'fRW†7B6öÆ÷W"—†VÇ3²†–FRõ&WfVÂöw&W’&r6÷fW&vRà¢Ò·…Ô7GVÂT’÷&W6WG2ö–çfW'6–öâö6öÆ÷W"&WGW&â÷&VÖ÷fÂæB6WGF–æw26æ6VÆÆF–öâà¢Ò·…ÔfÆw2öæòÖ÷ö÷&–v–æÂ6†V6·ö–çG2õVæFõ&VFòÂÆ÷72ö'VFvWBö6†V6·ö–çB&öÆÆ&6²à¢Ò·…ÔW†7B&ö¦V7Gc2&RÖ÷Vâ÷&RÖVF—BæB÷&–v–æÂæF—fR6ö×÷6VB6öÆ÷W"W‡÷'Bà¢Ò²Ò²Ö6¾(i$†–FRõ&WfVÂôw&W’öâÖW6ƒ²f—6–&ÆR&W7VÇG2ÂVæ6–Âöf–ævW'2Væ6†ævVBà¢Ò²ÔVæ&ÆVBö–çfW'B÷&VÖ÷fRµVæFò&W7F÷&RVæFW&Ç––ærÆ–W#²6fRô÷Vâ÷&W6VÆV7BÖ6²à ¢ã“bÆö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£#S3252òd”Âò6¶—VB¢£°§6WfVâæWrÖ6²T’ö6÷&RFW7G252âFWf–6S“bVæF–æs²æò&VæFW&VB&ööb–æfW'&VBà  ¢22ã“r(	BVF—F&ÆR–ÖvR6÷W&6RæBÆ6VÖVçBf÷VæFF–öã²ã“b52(	B##bÓÓ€ ¥W6W#“e52&÷FV7G2Ö6²õVæ6–Âöæf–vF–öâö†—7F÷'’÷&ö¦V7B&V†f–÷W"âVF—B&VÖ÷FP£CssƒScv2æBW†—7F–ær&VBÖöæÇ’Ub–ÖvSƒ“"ô–ç6W'CC3r÷væW'2âæWr—6öÆFVB–ÖvP§6÷W&6R–×÷'FW"&WF–ç2÷&–v–æÂVæ6öFVBärô¥Tr²÷væVBFV6öFVB$t$Â&VfÆ–v‡@£$Ö”"ó#L+"&Vf÷&R&—FÖFV6öFRÂW†7BF–ÖVç6–öç2Â7–æ26æ6†÷BæB6ÆVçWà¤6ÖW&Æ6VÖVçB6æ6†÷G2÷&–v–æÂF‡&VRÖG&–6W2ÇW2äD26VçG&R÷6—¦R÷&÷FF–öã°§&ö¦V7F÷"6Æ—26ÖW&ö–ÖvR&÷VæG2Â&WGW&ç2F÷Öf—'7BUg2â÷&–v–æÂ–ç6W'B7–6ÆP§&RÖW‡÷'FVBfW&&F–Ó²æòæWrö–çFW"öÖW6‚ö†—7F÷'’÷væW"â6—‚fö7W6VBFW7G252à¥&VBFö72÷–çBÖ–ÖvR×6÷W&6RÓ“ræÖBf÷"'&÷w6W"6öÆ÷W"öÇ†ôU„”bæBÖVÖ÷'’Æ–Ö—G2à¤äõB6öææV7FVBFò–çFW"ÂÆ–W"÷&ö¦V7B66†VÖ÷"T’–WBâ6ö÷&F–æFR&ö¦V7F–öà¦FöW2äõBVæf÷&6Rf6–æröævÆR÷66VæRö66ÇW6–öã²W†—7F–ær–çFW"×W7BFò6ò&Vf÷&P§&7FW&—¦F–öââæò&ö¦V7Bg&öÒf–Wr÷7W&f6RÆ6VÖVçBöÖçVÂFWf–6R6Æ–Òà¤Ö–â–çC“b÷&W6÷W&6S“Bö6ö×÷6—F÷#“2÷&÷FV7FVB×VÇF“ãög&÷¦VâVæ6†ævVBà¤æW‡BW‡Æ–6—B–ÖvR6÷W&6R·Æ6VÖVçB&W6÷W&6R÷ööÂfW'6–öæ–æræB÷&–v–æÂ†—7F÷'’ð§&ö¦V7BöW‡÷'B–çFVw&F–öâÂF†Vâ–6¶W"ö÷fW&Æ’÷f—6–&ÆRÖg&öçB&ö¦V7F–öâT’à¤æòæWr†æG2ÖöâvFRF†—2f÷VæFF–öâ'V–ÆC²ã“b52—2&÷FV7FVBÂæ÷C“r–ÖvRT’à ¢Ò·…ÒW6W"ã“b53¢Ö6²''W6‚öfÆw2õVæFõ&VFò÷&ö¦V7Böæf–vF–öâ&÷FV7FVBà¢Ò·…Òã“r÷&–v–æÂ'—FR÷—†VÂ÷væW'6†—ÂÖÆf÷&ÖVBöF–ÖVç6–öâö'VFvWB&VgW6Âà¢Ò·…Ò7–æ2FV6öFR6æ6†÷BæB6ÆVçWöâ7V66W72ÂF–ÖVç6–öâö6çf2f–ÇW&W2à¢Ò·…Ò7GVÂF‡&VRW'7V7F—fRö÷'F†öw&†–26æ6†÷BæBÆ6VÖVçB6ö÷&F–æFW2à¢Ò·…Ò6†&VB–ç6W'B7–6ÆS²æò6V6öæBö–çFW"÷"ÖW6‚¶W&æVÂà¢Ò²ÒgWGW&R&ö¦V7F÷"–çFVw&F–öâ×W7BVæf÷&6Rf6–æröævÆR÷66VæRö66ÇW6–öâà¢Òæòã“r–ÖvRT’öFWf–6RvFS¢—6öÆFVBÖöGVÆW2öæÇ’à ¢ã“rÆö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£#S3’52òd”Âò6¶—VB¢£²6—‚æWp¦fö7W6VB–ÖvR6÷W&6R÷Æ6VÖVçB6†V6·252âæòæWr–ÖvRT’÷"FWf–6RvFRà  ¢22ã“‚(	B&WF–æVB–ÖvRÆ–W'2–â÷&–v–æÂ&W6÷W&6R÷&ö¦V7B÷væW'2(	B##bÓÓ€ ¤VF—Ffƒc6C£“r–çWB÷Æ6VÖVçB—6öÆFVC³“2ó“B7G&–7B&7FW"ÖöæÇ’7F÷&vRâW‡FVæ@¥4ÔR7F6²÷&W6÷W&6R÷ööÂFòW‡Æ–6—Gc2æB66VæW&ö¦V7GcBâ–ÖvR&V6—R&WF–ç2÷&–v–æÀ¦Væ6öFVB¶FV6öFVB6÷W&6RÂÆ6VÖVçBæBff–æR6GW&Rg&ÖRÂ6W&FR7W&f6R&7FW"à¥—&VB–ÖvR·&Wf–WrVæB÷&WÆ6R—3²vVæW&–26öÆ÷W"—†VÂVF—G2&VgW6R–ÖvW2à¤ÆÂ6÷W&6Rö66†RöÖ6²öfÆBö&6R'—FW26†&vVBFòW†—7F–æs„Ö”"ööÂ$Tdõ$RFV6öFS°¦ÆVv7’&ö¦V7G2æBæF—fUUgc2Væ6†ævVBâ÷&–v–æÂ66VæR†—7F÷'’õVæFò÷6–ævÆR´×VÇF¤GWÆ–6FRöFöÖ–2f–ÆR÷VâæBfÆGFVæVBäôÒôtÄ"&WF–æVBâW†—7F–ær–çFW"7W÷'G0§c26öçG&öÇ2öÖ6·2v—F‚–ÖvRÆ&VÂæB6öÆ÷W"×7G&ö¶RwV&BÂæò–×Æ–6—B&¶Rà¤V–v‡Bfö7W6VB7GVÂ6öFV2ö†—7F÷'’ôf–ÆR÷–çFW"õT’öW‡÷'B6†V6·252âæòæWr–ÖvP§–6¶W"õ&ö¦V7BT’Âf6–æröö66ÇW6–öâ&7FW&—¦W"÷"&VæFW&VBöFWf–6R6Æ–Ò–WBà¥6÷W&6R·Æ6VÖVçC“rö''W6ƒ“Rö&ÆVæC“2ô–ç6W'CC3r÷&÷FV7FVBÖöFVÆÆ–ærô×VÇF’ög&÷¦Vâ&WF–æVC°¦6†ævVB÷væW'2æB&VçBôÆ"ÆöFW"w&ƒ“‚â&VBFö72÷–çBÖ–ÖvR×&W6÷W&6W2Ó“‚æÖBà¤æW‡Bf—6–&ÆR–6¶W"ö÷fW&Æ’õ&ö¦V7Bf–÷&–v–æÂUbvVöÖWG'’æB7W'&VçBf–Ww÷'B–çWBÀ¦g&öçBöævÆR÷66VæR÷6VÆbÖö66ÇW6–öâ&Vf÷&RFW†VÂ66WFæ6RÂFöÖ–2&V6—R·&7FW"6öÖÖ—Bà¤ÖçVÃ¢W†—7F–ær–çBöÖ6·26fRô÷Vâö6öçF–çVRÂVæFõ&VFòÂGWÆ–6FRöW‡÷'B6æ—G’à¤ÆFW7BW6W#“e52&÷FV7FVC²æó“ró“‚FWf–6U52–æfW'&VBà ¢Ò·…Ó“‚W†7B–ÖvR6÷W&6Rö66†Rög&ÖR÷væW'6†—ÂöÆB6ö×÷6—F÷"&—F†ÖWF–2&WF–æVBà¢Ò·…Õ&ö¦V7GcBW†7B÷&–v–æÂ'VffW'2öÖWFFFöÖ6·2Âv†öÆR×&W6÷W&6RFVGWÂöÆGc(	32à¢Ò·…Õ7G&–7BfW'6–öâ÷66†VÖög&ÖRö66†R÷&VgW6Ã²6ö×ÆWFR6÷W&6R¶66†RööÂ&VfÆ–v‡Bà¢Ò·…Ô7GVÂf–ÆR6fRô÷VâFöÖ–2&öÆÆ&6²Â6–ævÆRô×VÇF’GWÆ–6FRövÆö&Â†—7F÷'’à¢Ò·…Ô7GVÂ–ÖvRÖ6²õT’÷–çFW"wV&G2Âæ÷&ÖÂ–çBÆ–W'2æB&RÖVF—BgFW"÷Vâà¢Ò·…Ô'VFvWBö6†V6·ö–çB&öÆÆ&6²Â÷&–v–æÂäôÒ´tÄ"fÆGFVæVB'—FW2æB7–æ26æ6†÷Bà¢Ò²Ó“‚W†—7F–ær–çB¶Ö6²6fRô÷Vâö6öçF–çVRæBf–ævW'3²VæFõ&VFòôGWÆ–6FRöW‡÷'Bà¢ÒgWGW&R–ÖvR–6¶W"÷&ö¦V7F–öâvFR—26W&FS²æò–ÖvRf—‡GW&RF6²f÷"W6W"à ¢ã“‚Æö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£#SCr52òd”Âò6¶—VB¢£²V–v‡BæWp¦–ÖvR&W6÷W&6Rö†—7F÷'’÷&ö¦V7BõT’öW‡÷'B6†V6·252âFWf–6RvFR&VÖ–ç26W&FRà  ¢22ã“’(	BGWÆ–6FR–çB&VÆV6Rf—ƒ²ã“‚W6W"d”Â(	B##bÓÓ€ ¥W6W#¢GWÆ–6FR–çBF—6V'2öâVæ6–Â&VÆV6Râ&W&öGV6VB÷&–v–æÂGWÆ–6FR°¦7GVÂT’Ã6Æ–W'3¢v†öÆR×&W6÷W&6RV÷FF÷V&ÆRÖ6†&vW2Væ6†ævVB&6RöÆ–W'2öfÆBæ@§&VgW6W3„Ö”"6öÖÖ—BâW†—7F–ærF—&V7BÖ76–væÖVçBGWÆ–6FRFW7G2Ö—76VB7GVÂ&VÆV6Rà¥&W—"4ÔR–çBööÃ¢W†7B6æöæ–6Â'VffW"Ö6öçFVçBFVGWÃ„Ö”"Væ—VRódÖ” ¦W‡æFVB&W6÷W&6R6âW‡Æ–6—B66VæWcR6†&VBÖ'—FRG&ç7÷'BöæÇ’v†Vâ–æÆ–æSã„Ö”#°¦öÆB66VæWc(	3BVæ6öF–ær&WF–æVB&VÆ÷rÆ–Ö—BÂ6ö×ÆWFR&VFV6öFR÷66†VÖ÷&VbwV&G2à¤÷&–v–æÂ†—7F÷'’õVæFòôGWÆ–6FRöFöÖ–2f–ÆR÷VâæBfÆBäôÒôtÄ"Væ6†ævVBâÆÂ–ç@¦6öÖÖ—G2&VfÆ–v‡B6ÖRööÂÂ–æ6ÇVF–ær÷VS²f–ÆVB6öÖÖ—B&W7F÷&W2'VffW'2æ@¦¶VW2–çBæVÂ÷Vââf—fRæWr&Vw&W76–öç26÷fW"&VÂ6–ævÆR´×VÇF’6÷’–çB÷&VÆV6RÀ¦6öÖÖ—GFVBF—7Æ’ö†—7F÷'’ö7GVÂ6fT÷Vâ÷&RÖVF—BÂ6÷''WBööÂ¶&÷F‚'VFvWG2öFöÖ–0§&öÆÆ&6²ÂvVçV–æRÆ–Ö—G2÷7FvVBFBæB&V6÷fW&&ÆRT’&VgW6Âã“b'VFvWBf—‡GW&P¦æ÷rW6W2vVçV–æVÇ’F—7F–æ7BFF²V÷F÷&öÆÆ&6²76W'F–öç2&WF–æVBâ6VP¦Fö72÷–çBÖGWÆ–6FRÓ“’æÖBâ6†ævVB÷væW'2÷&VçBôÆ"66†S““²7F6²ö–ÖvS“‚À§6÷W&6S“rö''W6ƒ“Rö&ÆVæC“2ô–ç6W'CC3r÷&÷FV7FVB×VÇF’ög&÷¦VâöÖöFVÆÆ–ær&WF–æVBà¤ÆFW7BFWf–6U53“c³“‚GWÆ–6FTd”Â&V6÷&FVC³“’FWf–6R&WFW7BVæF–ærà¤æW‡BFWf–6RGWÆ–6FR&VÆV6RôFöæRõ6fT÷VâõVæFòÂF†Vâ&W7VÖR&ö¦V7Bg&öÒf–WrT’à ¢Ò·…Ó“’7GVÂ6–ævÆRäB×VÇF’gVÆÂ×7F6²GWÆ–6FR7G&ö¶W27W'f—fR&VÆV6Rà¢Ò·…Õ6÷W&6RVæ6†ævVBÂ6öÖÖ—GFVB7W&f6RõVæFõ&VFòæB&VÂf–ÆR6fT÷Vâ÷&RÖVF—Bà¢Ò·…Õ6†&VB'—FRööÂ&Vg2÷fW'6–öç2ö6æöæ–6ÂFFöGWÆ–6FW2÷W6vR&VgW6RFöÖ–6ÆÇ’à¢Ò·…Ó„Ö”"Væ—VRæCdÖ”"W‡æFVB&VfÆ–v‡B&Vf÷&RFV6öFS²7FvVBV÷F&öÆÆ&6²à¢Ò·…ÔvVçV–æRf–ÆVB7G&ö¶R&W7F÷&W2FFö†—7F÷'’ö6öçG&öÇ2æB¶VW2–çB÷Vâà¢Ò·…Ó“’DUd”4RGWÆ–6FS6Æ–W"–çB(i"Æ–gBVæ6–Â(i"FöæR÷&W6VÆV7C²6÷W&6RVæ6†ævVBâU4U#“•52à¢Ò·…Ó“’DUd”4R6fRô÷Vâö6öçF–çVRõVæFõ&VFòöâGWÆ–6FRâU4U#“•526ÆV'3“‚&VÆV6Rf–ÇW&S²æF—fRW‡÷'BW†6WF–öâG&6¶VC“à ¢ã“’Æö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£#SS"52òd”Âò6¶—VB¢£²f—fRæWp¦7GVÂGWÆ–6FR÷ööÂ÷&V6÷fW'’&Vw&W76–öç252âFWf–6R&VÆV6R&WFW7BVæF–ærà  ¢22ã“(	BæF—fR–çBFW‡GW&RÖæÖR6öÆÆ—6–öç3²ã“’f–Ww÷'B52(	B##bÓÓ€ ¥W6W#“•52&÷FV7G2GWÆ–6FR–çB&VÆV6RôFöæRõ6fT÷VâõVæFó²äôÔBW†6WF–öã ¦6÷’F÷G2÷&–v–æÂ–çBâ67&VVç6†÷G26†÷s“’öw&VVâ6÷’7G&ö¶W2–â&÷„Æ"Â'6Vç@¦–âæöÖBâVF—F3#3SS¢&W&VBäw2öÖFW&–Â¶–ÖvR–æF–6W2Ç&VG’F—7F–æ7BÂ'WBÆÀ§–çBFW‡GW&W2æÖVD&÷„Æ"–çBçærâ&W—"WF†÷&—FF—fRæF—fRw&—FW"æÖR&Vv—7G'“ ¤äd2ö66RÖföÆFVB6öÆÆ—6–öâæÖW2vWBçVÖW&–27Vff—‚f÷"D”ddU$TåB–ÖvR–æF–6W3²WVÀ¦–ÖvW2¶VW6†&–ærÂVæ—VRæÖW2æBW†—7F–ærÆ–6W2&WF–æVBâW‡÷'BÖÆö6ÂöæÇ“°§6÷W&6R'—FW2öæÖW2Ãƒ“W†7B–ÖvRFVGWÂf7F÷'2õUbööfg6WG2ó#DÖ”"'VFvWBVæ6†ævVBà¤f÷W"7GVÂäôÒôf–ÆRõ6fT÷Vâö7–æ2öFVGWöÖ—†VBÖæÖR&Vw&W76–öâFW7G252â6öç7VÖW ¦æÖR66†–ær—2â–æfW&Væ6S²7GVÂæöÖBFWf–6R&WFW7B&VÖ–ç2&WV—&VBâ&V@¦Fö72÷–çBÖæöÖBÖGWÆ–6FRÓ“æÖBâæF—fRôf–ÆRôÆ"ÆöFW"w&ƒ“²f–Ww÷'B÷&W6÷W&6Rð¦†—7F÷'’÷ööÃ“’æB&÷FV7FVB×VÇF’öÖöFVÆÆ–ærög&÷¦VâVæ6†ævVBà¤æW‡BDUd”4R&RÖW‡÷'B÷&–v–æÂ¶w&VVâ6÷’g&öÓ“²6öæf—&ÒF—7F–æ7B–çB–âæöÖBÀ§F†Vâ6V6öæBW‡÷'BgFW"gW'F†W"6÷’–çF–ærâ–bW'6—7FVçB–ç7V7B7GVÂäôÒ'—FW3°¦æò–çfVçFVBæF—fRf–VÆG2âF†Vâ&W7VÖR÷&–v–æÂ–ÖvR&ö¦V7F–öâT’Æâà ¢Ò·…ÕW6W#“’53¢GWÆ–6FR&VÆV6RôFöæRõ6fT÷VâõVæFò&÷FV7FVC²äôÔBW†6WF–öâà¢Ò·…Ó“W†7BW"Öö&¦V7BäröÖFW&–Âö–ÖvRÆ–æ·2æBF—7F–æ7BæF—fRFW‡GW&RæÖW2à¢Ò·…Ô7GVÂf–ÆRäôÔBgFW"&ö¦V7B÷Vâ²7–æ26æ6†÷BÂ–FVçF–6ÂÖ–ÖvRFVGWà¢Ò·…ÔÖ—†VBö66RÖföÆFVB÷&R×7Vff—†VBæÖW2F—7F–æ7BÂFWFW&Ö–æ—7F–2Â6÷W&6RVçF÷V6†VBà¢Ò·…Ó“DUd”4Rg&W6‚äôÓ¢w&VVâ6÷’7G&ö¶W2&VÖ–â–æFWVæFVçB–âæöÖBâU4U#“52à¢Ò·…Ó“DUd”4RæF—fRGWÆ–6FRW‡÷'B66WFæ6R&W÷'FVBU4U#“52à ¢ã“Æö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£#SSb52òd”Âò6¶—VB¢£²f÷W"æWp¦æF—fR–çBöW‡÷'BöæÖR&Vw&W76–öç252â7GVÂæöÖB&WFW7B&VÖ–ç2VæF–ærà  ¢22ã“(	B&WF–æVB–ÖvR&ö¦V7Bg&öÒf–Ws²ã“W6W"52(	B##bÓÓ€ ¥W6W#“52&÷FV7G2–æFWVæFVçBGWÆ–6FR–çB–âæöÖBÂ6ÆV&–ærW‡FW&æÂvFRà¤VF—B#fC–ƒ¢6÷W&6R÷Æ6VÖVçC“r²&WF–æVB–ÖvR7F6³“‚÷ööÃ“’Ç&VG’&W6VçC°¦Ö—76–ær&VÂ–6¶W"ö÷fW&Æ’÷f—6–&ÆRÖg&öçB&7FW"â6öææV7B4ÔR–çFW"ö–çWBö†—7F÷'’à¢²–ÖvRärô¥Tr(šC#L+"ó$Ö”#³cRR67&VVâwV–FRÂVæ6–ÂÖ÷f^(i%&÷FF^(i%66ÆRF7–6ÆRW6W0¦÷&–v–æÂ–ç6W'CC3rgVæ7F–öã²f–ævW'2æf–vFR&V†–æB–ÖvRâ&ö¦V7B6GW&W27W'&Vç@¦6ÖW&ö&öG’g&ÖS²÷&–v–æÂUbG&–ævÆW2õF‡&VR&—2Væf÷&6Ss\+g&öçBæB66VæR÷6VÆ`¦ö66ÇW6–öâ$Tdõ$RFW†VÇ2â&VgW6R6×ÆVB÷fW&Æ–ærö7&÷72×F–ÆRUg2æB&÷VæFVBv÷&²à¥—&VC“‚–ÖvR&V6—R·&7FW"VæB÷&WÆ6RÂ÷&–v–æÂ&VfÆ–v‡Bö6†V6·ö–çBô4õs²VF—@¦–ÖvR&W&ö¦V7G2&WF–æVB6÷W&6Re$ôÒ5U%$TåBd”UrÂ&WF–ç2Ö6²ö&ÆVæBöæÖRö÷&FW"à¤6æ6VÂöÆ–W"6†ævRö6Æ÷6R÷7FÆR7–æ2&W6W'fW26öÖÖ—GFVBv÷&²Â÷&–v–æÂVæFòW†—G0¥–çBâ6ÖRæ&÷†Æ"6öFV2÷6÷W&6RW'6—7FVæ6RöfÆBäôÒ´tÄ#²æòæWr66†VÖö†—7F÷'’ö¶W&æVÂà¥67&VVâ×&ö¦V7F÷"vW7GW&W2&Ræ÷BFævVçBÖföÆÆ÷v–ær7W&f6RFV6Ç2âF‡&VR÷fW&Æ—2À£„Ö”"Væ—VRódÖ”"W‡æFVB&WF–æVC²6ö×ÆW‚66VæW2Ö’&VgW6S²æò6VÒ×6fR÷W&f÷&Öæ6P¦6Æ–Òâ&VBFö72÷–çBÖ–ÖvR×&ö¦V7BÓ“æÖBâ6WfVâfö7W6VB7GVÂ&7FW"õT’÷W'6—7FVæ6Rð¦W‡÷'BFW7G253²æöFS#Bã’ãgVÆÂ¢£#Sc252òd”Âò6¶—VB¢¢âV&Æ–6F–öà§fW&–f–6F–öâföÆÆ÷w2â6†ævVB–çFW"ö6÷&R¶æWr&ö¦V7F÷"ð¦÷fW&Æ’w&ƒ“³“ró“‚ó“’7F÷&vRÃ“æF—fRW‡÷'FW"æB&÷FV7FVBÖöFVÆÆ–ærô×VÇF’ð¦g&÷¦Vâ&WF–æVBâFWf–6S“vFRVæF–ærâæW‡B†æG2Ööâ&ö¦V7BfVVF&6²F†Vâ7W&f6RÐ§&VÆF—fRÆ6VÖVçC²ÖFW&–Â6Æ÷G2õT’öÆ—6‚föÆÆ÷r&öGV7BF—&V7F–öâà ¢Ò·…Ó“W†7B6÷W&6R÷&–VçFF–öâöÇ†æB÷&–v–æÂvVöÖWG'’ög&ÖR&ö¦V7F–öâà¢Ò·…Ó“g&öçBós\+÷66VæR÷6VÆbö66ÇW6–öã²6×ÆVBUbÖ&–wV—G’÷v÷&²&VgW6ÂFöÖ–2à¢Ò·…Ó“7GVÂ–6¶W"÷7Fv–ærõVæ6–Â7–6ÆRö6æ6VÂöf–ævW"÷væW'6†—²÷&–v–æÂ†—7F÷'’à¢Ò·…Ó“7GVÂ&ö¦V7F–öâæ&÷†Æ"6öFV2ô÷Vâ÷&RÖVF—BæBæF—fRfÆGFVæVBärà¢Ò·…Ó“6†V6·ö–çB÷7F6²æB7FÆR7–æ2&VgW6Â&W6W'fW26öÖÖ—GFVB7FFRà¢Ò·…Ó“÷fW&Æ’7V7B÷&÷FF–öâff–æR&—G’öF—7÷6Ã²æò6V6öæBö–çFW"÷væW"à¢Ò·…Ó“DUd”4R²–ÖvR(i"Væ6–ÂÖ÷fRõ&÷FFRõ66ÆS²f–ævW'2Æ–vâf–Wr(i"&ö¦V7BâU4U#“52à¢Ò·…Ó“DUd”4R÷&&—B6öæf—&×2&6²ö†–FFVâ7W&f6W26ÆVã²VF—B–ÖvRö6æ6VÂ÷&W&ö¦V7BâU4U#“52à¢Ò·…Ó“DUd”4RVæFõ&VFòõ6fT÷Vâ÷&RÖVF—C²Ö6²ö&ÆVæBæBæöÖB6öÆ÷W"6æ—G’âU4U#“52à  ¢22ã“V&Æ–6F–öâfW&–f–VB(	B##bÓÓ€ ¥'VçF–ÖR6cƒf#FSƒVCc#C&6#3vc3vv–S3cs²FW7FVBG&VP£c&#C3CV3##CV33“&fCƒfC“cv3–fCs–BâÆÃBWÆöFVB&Æö"†6†W2æB7&VFV@§G&VRÖF6‚FW7FVBÆö6Â6÷W&6RâfWF6†VB÷&–v–âöÖ–â†2W†7FÇ’F†R6ÖRG&VS°§&VÖ÷FRÖæ–fW7B÷F—FÆRöFF÷f—6–&ÆRÆ&VÂæB&Wf–WvVB–çFW#“w&‚fW&–f–VBà¤Æö6ÂæöFS#Bã’ãgVÆÃ#Sc552ód”Âó6¶—²æöFS#"F÷öÆöw’4“3“#sccC’ð¦¦ö#sc##C#“25T44U52âvW33“#sc‚'V–ÆCsc##CS3"ð¦FWÆ÷“sc33Scb5T44U52âÆÃB6†V6¶VB÷7FFWÆ÷–ÖVçBÆ—fR6†VÆÂ÷fW'6–öâð§–çFW"ö6÷&R÷&ö¦V7F÷"ö÷fW&Æ’÷6÷W&6R÷Æ6VÖVçBö–ÖvR÷7F6²÷ööÂöæF—fRw&—FW"ð§&V6÷fW'’f–ÆW2'—FRÖÖF6‚&W÷6—F÷'’â–æ—F–ÂÆ—fRÖæ–fW7B6W'fVC“&Vf÷&RFWÆ÷“°¦f–æÂ6ö×ÆWFR6†V6¶VBw&‚ÖF6†W3“â&÷FV7FVB×VÇF“ãöÖöFVÆÆ–ærög&÷¦VâVæ6†ævVBà¤ÆÂf÷W"6öçF–çV—G’Fö7VÖVçG2WFFVBâF†—2&ööb—2Fö7VÖVçFF–öâÖöæÇ“²FW7FV@§'VçF–ÖR'—FW2&WF–æVBâW6W#“52&V6÷&FVC³“7GVÂ6f&’õVæ6–Âö–ÖvR–6¶W"ð¦ÆFVæ7’ög&öçBÖöæÇ’V&æ6RvFR&VÖ–ç2VæF–ærâæò&VæFW&VB66WFæ6R–æfW'&V@¦g&öÒæöFR6çf2FFW'2÷"'—FRfW&–f–6F–öââæW‡BÖçVÂ&ö¦V7B6†V6¶Æ—7B–à§–çBÖ–ÖvR×&ö¦V7BÓ“æÖBÂF†Vâ7W&f6R×&VÆF—fRÆ6VÖVçBg&öÒ÷&–v–æÂ–ç6W'Bà  ¢22ã“"(	B7W&f6R×&VÆF—fR&WF–æVB–ÖvW3²ã“W6W"52(	B##bÓÓ€ ¥W6W#“52&÷FV7G2&ö¦V7Bg&öÒf–Wr÷–6¶W"õVæ6–Âöæf–vF–öâ÷W'6—7FVæ6Rö†—7F÷'’à¤VF—BcCvC†c¢&WW6S“&ö¦V7F÷"æC“‚ó“’7F÷&vR÷ööÃ²æWr7W&f6Rg&ÖRW6W27GVÀ¤–ç6W'CC3rÆ–væÖVçBö7–6ÆRæC“r÷'F†öw&†–26ÖW&6GW&RÂæòæWrvVöÖWG'’¶W&æVÂà¢²–ÖvRôVF—B–ÖvR(i"öâ7W&f6R(i"–6²6VÆV7FVBÖW6‚âf—'7BFÆ6W3²F†VâFÖ7–6ÆP¤Ö÷fRõ&÷FFRõ66ÆRÂÖ÷fRföÆÆ÷w2÷&–v–æÂ†—B÷G&–ævÆRæ÷&ÖÂâÆæ#cRR6öçF7BwV–FS°¦Æ–gB&VvVæW&FW2W†7BUbÖW6‚&Wf–WrÂÇ’6öÖÖ—G2ôäR÷&–v–æÂ66VæR6†V6·ö–çBà¥&Wf–WræWfW"76–vç2ö&¦V7B6öÆ÷W%–çB÷"VçFW'26fRö†—7F÷'“²÷&–v–æÂ&VfÆ–v‡BÀ¦6öÖÖ—Bô4õröW‡÷'BæBã“g&öçBöö66ÇW6–öâõUb÷v÷&²Æ–Ö—G2&WF–æVBâ6æ6VÂö6Æ÷6RöÆ–W"ð¦&öG’Æ÷72&W7F÷&W26öÖÖ—GFVBv÷&²æB6öçG&öÇ2ÂwV–FRF—7÷6VBâ&6²Fòf–Wr&W6W'fW0¦66WFVBã“F‚âVF—Bòöâ7W&f6R7F'G2g&W6‚æ6†÷"öFVfVÇB6—¦S²W'6—7FVB6÷W&6Rð§&ö¦V7F–öâög&ÖRö66†R7W÷'B&R×Æ6VÖVçBÂæ÷BWFöÖF–2öÆBæ6†÷"÷7–â÷66ÆR&W7VÖRà¥6ÖR66VæR÷&ö¦V7B66†VÖæBfÆBæF—fR†æFöfbâæò6öçF–çV÷W27W'fVB&7FW"v†–ÆP¦6öçF7BÂ6VÒ×6fRw&–ærÂÆ&vW"'VFvWG2÷"•BW&f÷&Öæ6R6Æ–Òâ&V@¦Fö72÷–çBÖ–ÖvR×7W&f6RÓ“"æÖBâ6WfVâfö7W6VBæWr6†V6·26÷fW"7GVÂg&ÖRöwV–FRð§&Wf–WrõT’ö†—7F÷'’öÆ–Ö—G2ö7W'fVB7†W&RUbµ6fRöæF—fRärâæöFS#Bã’ãgVÆÀ¢¢£#Ss52òd”Âò6¶—VB¢£²V&Æ–6F–öâfW&–f–6F–öâföÆÆ÷w2à¤6†ævVB–çFW"ö6÷&RöæWr†VÇW"w&ƒ“#²&ö¦V7F÷#“÷6÷W&6S“r÷7F6³“‚÷ööÃ“’öæF—fP§w&—FW#“ô–ç6W'CC3ræB&÷FV7FVBÖöFVÆÆ–ærô×VÇF’ög&÷¦Vâ&WF–æVBâFWf–6S“"vFRVæF–ærà¤æW‡B7W&f6R–çFW&7F–öâfVVF&6²ÂF†VâVF—BÖFW&–ÂÖ6†ææVÂ6Æ÷G2÷Æ6V†öÆFW"Æâà ¢Ò·…Ó“"7W&f6Rg&ÖR7V7B÷7–âöæ÷&ÖÂæB7GVÂ–ç6W'BÆ–væÖVçB&—G’à¢Ò·…Ó“"wV–FR—2æöâ×&–67F&ÆRÂ6÷W&6RVæ6†ævVBæBF—7÷6VBöâÆÂ7FvRW†—G2à¢Ò·…Ó“"G&ç6–VçBF—7Æ’7W'f—fW2F–6³²æò66VæR&W6÷W&6Rö†—7F÷'’÷6fR&Vf÷&RÇ’à¢Ò·…Ó“"÷&–v–æÂT’–6²÷FÖ7–6ÆRöÖ÷fRö6æ6VÂöf–ævW"÷ÆÒæB6–ævÆR†—7F÷'’Ç’à¢Ò·…Ó“"Ö6·2ö&ÆVæG2÷6÷W&6R6†&–ær&WF–æVC²ööÂö6†V6·ö–çBö&öG’ÖÆ÷72FöÖ–2&VgW6Âà¢Ò·…Ó“"&VÂ7W'fVB7†W&R&ö¦V7F–öâö6öFV2öæF—fRfÆGFVæVBärF‡&÷Vv‚÷&–v–æÂ÷væW'2à¢Ò·…Ó“"DUd”4Rf—'7Böâ7W&f6R–ÖvRv÷&·2W&fV7FÇ’ÂU4U#“%53²6V6öæBFBW†6WF–öâG&6¶VC“2à¢Ò²Ó“"DUd”4RÇ’VæFõ&VFó²VF—B–ÖvRôöâ7W&f6RÂ6æ6VÂ÷&VÇ’Â6fT÷VâöW‡÷'Bà  ¢22ã“"V&Æ–6F–öâfW&–f–VB(	B##bÓÓ€ ¥'VçF–ÖSv3S&C#cc#“ff#sƒsFFcSssC#Sc3ƒC#²FW7FVBG&VP£“#cCcS6Vf6&&fc“VC“3“3“ƒv&#3“6CScƒâÆÃ2WÆöFVB&Æö'2æB7&VFVBG&VP¦ÖF6‚FW7FVBÆö6Â6÷W&6S²fWF6†VB÷&–v–âöÖ–â†2–FVçF–6ÂG&VRâÖ–âfW'6–öâð§6†VÆÂ÷–çFW#“"–âfW&–f–VBâæöFS#Bã’ãÆö6ÂgVÆÃ#Ss52ód”Âó6¶—°¤æöFS#"F÷öÆöw’4“3“33ssƒSBö¦ö#scCCS#R5T44U52âvW33“33ssc“"ð¦'V–ÆCscCCs“2öFWÆ÷“scC3cr5T44U52âÆÃR6†V6¶VB÷7FFWÆ÷–ÖVçBÆ—fP§6†VÆÂ÷fW'6–öâ÷–çFW"ö6÷&R÷7W&f6R÷&ö¦V7F÷"ö÷fW&Æ’÷6÷W&6R÷Æ6VÖVçB÷7F6²÷ööÂð¦æF—fRw&—FW"ô–ç6W'BÆ–væÖVçB÷&V6÷fW'’f–ÆW2'—FRÖÖF6‚&W÷6—F÷'’â&÷FV7FV@¤×VÇF“ãöÖöFVÆÆ–ærög&÷¦VâVæ6†ævVBâÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçC²F†—2&öö`¦6†ævW2Fö7VÖVçFF–öâöæÇ’æB&WF–ç2FW7FVB'VçF–ÖR'—FW2âW6W#“52&÷FV7FVC°£“"6f&’õVæ6–ÂöwV–FRV&æ6R÷&VÆV6R×&Wf–WrÆFVæ7’vFRVæF–ærÂæò&VæFW&V@¦÷"Ó"W&f÷&Öæ6R66WFæ6R–æfW'&VBâæW‡Böâ7W&f6RÖçVÂvFRÂF†VâÖFW&–Âð¦6†ææVÂ÷væW"VF—BW"&öGV7BF—&V7F–öââ÷&–v–æÂ67&VVâ&ö¦V7B&VÖ–ç2f–Æ&ÆRà  ¢22ã“2(	B&WVFVB7W&f6R–ÖvRV÷F&W—#²ã“"'F–Â52(	B##bÓÓ€ ¥W6W#“%52f—'7B7W&f6R–ÖvS²W‡Æ–6—B6V6öæBÖFBf–ÇW&Râ7GVÃ“"T’&W&öGV6VC £g‚6V6öæB–ÖvRv÷&·3²6V6öæC#L+"6÷W&6Rf–Ç3„Ö”"&VfÆ–v‡B†FV6öFVB6÷W&6SDÖ” ¦ÆöæR’âæòW6W"w2f–ÆR7WÆ–VC²V÷FW‡ÆæF–öâfW&–f–VBÂFWf–6R&WFW7B&WV—&VBà¥6ÖR7F6²÷&W6÷W&6R÷ööÂ÷væW'26VÆV7B&÷VæFVB–ÖvRÖ6&ÆWc2&öf–ÆS#DÖ”"Væ—VRð£C„Ö”"W‡æFVC²&7FW"ÖöæÇ“‚ób&WF–æVBâF‡&VS#L+"6÷W&6W2¶Væ6öFVB¶66†R¶&6RöfÆBð¦Ö6·2f—N(šC#2ãsTÖ”"&W6÷W&6Râ÷&–v–æÂ6÷W&6RF–ÖVç6–öç2ö'—FW2ÃS,+"Ö2ÇF‡&VRÖ÷fW&Æ¦æC3$Ö”"f–ÆRÆ–Ö—G2Væ6†ævVC²æòF÷vç6—¦–ærÂæWr66†VÖö†—7F÷'’ö¶W&æVÂ÷"W&f÷&Öæ6P¦6Æ–Òâ÷&–v–æÃ„Ö”"G&ç7÷'BF‡&W6†öÆB&WF–æVC¢Æ&vW"–ÖvW2W6RU„•5D”är66VæWcP§6†&VBÖ'—FR6öFV3²7G&–7BW"×&W6÷W&6R÷&Vbö6æöæ–6Â÷&VFV6öFRöFöÖ–2&VgW6Â&WF–æVBà¤f–ÆVBööÂWw&FW26ææ÷BV&Æ—6‚'VffW'2÷"&—6RÆÆ÷væ6Râ–ÖvRW'&÷'2æ÷rÇ6ð¦V"–ç6–FR7F—fRæVÂâ&VBFö72÷–çBÖ–ÖvR×&WVBÓ“2æÖBâf÷W"æWrfö7W6VB&VÀ¥T’÷6ÖR¶F–ffW&VçC#L+"ôf–ÆRö6öFV2öæF—fR÷V÷F6†V6·2FFVBã“‚ó“"–ÖvR'VFvWBf—‡GW&W0§WFFVBFòvVçV–æS#DÖ”"÷fW&fÆ÷s²ÆÂ&7FW"ÖöæÇ“‚ób76W'F–öç2&WF–æVBâÆö6À¤æöFS#Bã’ãgVÆÂ¢£#SsB52òd”Âò6¶—VB¢£²V&Æ–6F–öâfW&–f–6F–öâföÆÆ÷w2â&W6÷W&6R÷ööÂæB&VçBôÆ"w&ƒ“3²7W&f6S“"÷&ö¦V7F÷#“ð§6÷W&6S“rô–ç6W'CC3rö''W6‚÷&÷FV7FVBÖöFVÆÆ–ærô×VÇF’ög&÷¦Vâ&WF–æVBâæF—fRw&—FW"öæÇ§&VçB–çBÖW‡÷'B–â6†ævVBâæW‡BDUd”4RGvò÷F‡&VRFG2–â6ÖR6W76–öâÂVF—B6V6öæBÀ¥VæFõ&VFòõ6fT÷Vã²ÖFW&–Âv÷&²föÆÆ÷w266WFæ6RÂæ÷Bâ–æfW'&VB&Ææ¶WC“%52à ¢Ò·…Ó“27GVÂ6V6öæB÷F†—&BF—7F–æ7C#L+"T’FG2&W6W'fR÷&–v–æÇ2æB†—7F÷'’à¢Ò·…Ó“26ÖR×6÷W&6R6V6öæBFBò6V6öæB&WÆ6VÖVçBÂ6æöæ–6Â6†&VB66VæRG&ç7÷'Bà¢Ò·…Ó“2&VÂf–ÆR6fRô÷VâGvó#L+"–ÖvW2F†Vâ6öçF–çVRF†—&C²W†7BæF—fRärà¢Ò·…Ó“2–ÖvS#BóC‚Væ—VRöW‡æFVBV÷F&VfÆ–v‡BæBFöÖ–2f–ÇW&S²&7FW#‚ób&WF–æVBà¢Ò²Ó“2DUd”4Rf—'7B·6V6öæBöâ7W&f6RFBôÇ’–â4ÔR–çB6W76–öã²÷&–v–æÇ2&WF–æVBà¢Ò²Ó“2DUd”4R÷F–öæÆÇ’F†—&C²VF—B6V6öæB–æFWVæFVçFÇ’ÂVæFõ&VFòõ6fT÷Vâà  ¢22ã“2V&Æ–6F–öâfW&–f–VB(	B##bÓÓ€ ¥'VçF–ÖV#CƒC–3c“3ƒ#C336F6&6Ssƒ#†#†cCƒc–s#²FW7FVBG&VP£†ƒS–6cF#C3#“vf33C†FC–Vf6FF“SBâÆÃ3WÆöFVB&Æö"†6†W2ö7&VFVBG&VP¦ÖF6‚Æö6ÂFW7FVB6÷W&6S²fWF6†VB÷&–v–âöÖ–â–FVçF–6ÂâÖ–ã“26†VÆÂöÖæ–fW7Bð§–çFW"–âfW&–f–VBâÆö6ÂæöFS#Bã’ãgVÆÃ#SsE52ód”Âó6¶—²æöFS#"F÷öÆöw¤4“3“Sƒs‚ö¦ö#sc“3SCs#‚5T44U52âvW33“Sƒ“bð¦'V–ÆCsc“3Sccƒ’öFWÆ÷“sc“CC#cc’5T44U52âÆÃ#b÷7FFWÆ÷–ÖVçBÆ—fR6†VÆÂð§fW'6–öâ÷&W6÷W&6R÷ööÂöæWr'VFvWBõT’÷&VçBôÆ"÷&V6÷fW'’ÇW2Væ6†ævVB7W&f6Rð§&ö¦V7F÷"÷6÷W&6Rf–ÆW2'—FRÖÖF6‚6÷W&6Râ–æ—F–Â&VG2GW&–ærFWÆ÷–ÖVçBÖ—†VC“ ¦æBæWrf–ÆW2öæWr'VFvWCCC²f–æÂg&W6‚6ö×ÆWFRw&ƒ#bó#bÖF6†W3“2â&÷FV7FV@¤×VÇF“ãög&÷¦VâöÖöFVÆÆ–ærö''W6‚ô–ç6W'BÆv÷&—F†×2&WF–æVC²æF—fRw&—FW"öæÇ’ÆöFW §–â6†ævW2âÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçBâF†—2&ööb6†ævW2Fö72öæÇ“²FW7FV@§'VçF–ÖR'—FW2&WF–æVBâW6W#“"f—'7B×Æ6VÖVçB52&÷FV7FVC²&WVFVBÖ–ÖvRFWf–6P¦W†6WF–öâ&VÖ–ç2VæF–æs“2&WFW7Bâæò7GVÂW6W"6÷W&6Rf–ÆRÂ6f&’ÆFVæ7’÷ ¤Ó"$Ò66WFæ6R–æfW'&VBg&öÒæöFR÷6÷W&6RÖ'—FR6†V6·2âæW‡B&WVBÖFB4ÔR6W76–öâÀ§fW&–g’f—'7B&W6W'fVBÂVF—B6V6öæBõVæFõ&VFòõ6fT÷Vã²ÖFW&–Âv÷&²7F—2VWVVBà  ¢22ã“B(	B7–Æ–æFW"Ug2f÷"6öæW2æBW&–v‡B&WföÇfW2(	B##bÓÓ€ ¥W6W"&WVW7FVB7–Æ–æFW"Ug2f÷"&WföÇfRö7–Æ–æFW'2ö6öæW2æB6ö×ÆWF–öâWFòF†P¦æW‡BÖçVÂvFR&Vf÷&RW6–ær÷fW&æ–v‡BâVF—C¢Æ–VB&WföÇfR†2&WföÇfU&öf–ÆP¢†æ÷B7W'fU&öf–ÆR’ÂÇ&VG’VÆ–v–&ÆR–âÖW6‚†VÇFƒ²6öç7FçB×&F—W2ö†—2×6–FP¦6†V6·2–âF†R÷&–v–æÂ7–Æ–æFW"ÖW"vW&RF†R&VgW6ÂâW‡FVæBD„BÖW"öæÇ“ ¦÷&F–æ'’7–Æ–æFW'2&WF–âW†7BÖV7W&VBÖVFvR7G&—÷GvòÖ6Æ–÷WC²fÆÆ&6²&V6÷fW'0§&VwVÆ"6öæ6VçG&–2v÷&ÆBÕ’&–æw2æBF†V—"6–ævÆR&öf–ÆR6†–âg&öÒ&6RF÷öÆöw’à¤æwVÆ"6VÒÇW2ÖV7W&VB&F—W2ö†V–v‡B&öf–ÆRF—7Fæ6R7W÷'G2FW"Âö–çFV@¦VæG2Â6†÷VÆFW'2æB&WGW&âvÆÇ2âöÆRR7Æ—G2W"f6RvVFvS²âÖvöâ627F’Ææ"à¤æòvVöÖWG'’Â&V6—RÂÖöFVÆÆ–ærövW7GW&Rö†—7F÷'’öW‡÷'B¶W&æVÂ6†ævW2â6ÖRæF—fP¦6÷&æW"–ÆöBÂ6öÖÖ—BÂ÷&–v–æÂUbVF—G2Â6fRô÷VâæBtÄ"ôäôÒw&—FW'2âT’W‡Æ–ç0§W&–v‡B7–Æ–æFW"ö6öæRõ&WföÇfR66÷RâF–ÇFVBöVÆÆ—F–6Â÷Gv—7FVBö'&æ6†–æröÖÆf÷&ÖV@¦æB&ö6VGW&ÂöÖöF–f–W"ö–×÷'FVB6öçFW‡G27F–ÆÂ&VgW6RFöÖ–6ÆÇ’âæ÷B&&—G&'’Ö†—0§&ö¦V7F–öâÂ&VÖW6†–ærÂWFòÖ&¶RÂ¦W&òÖF—7F÷'F–öâ÷"WFöÖF–26¶–ærâ6Æ÷6VB&öf–ÆP¦Æö÷2&RVç7W÷'FVBâf÷W"æWrFW7G26÷fW"æF—fR6öæS>(	3cB6–FW2ö×VÇF—ÆR&æG2À¦‡VvR÷F–ç’66ÆRÂ÷&–v–æÂ&WföÇfR÷væW"÷WGWBv—F‚öÆW2÷FW"÷6†÷VÆFW'2÷&WGW&âvÆÇ2À¦æòvVöÖWG'’öÖWFFF×WFF–öâÂöæRVæFòõ&VFòö–FV×÷FVæ6RÂUbVF—G2ö6öFV2ö7GVÂæF—fP¦æBtÄ"fÇVW2ÂFöÖ–2&VgW6ÂæB&WF–æVB÷&–v–æÂ7–Æ–æFW"Æ–÷WBâVçF—&R6†ævV@¥Ub÷&VçBôÆ"w&‚æB6†VÆÂ÷&V6÷fW'’¶W—3“C²÷F†W"ÖöGVÆR–ç2&WF–æVBà ¤æW‡BDUd”4S¢FB²7–Æ–æFW"æB6öæR(i"ÖW6‚†VÇF‚(i"Ug2(i"7–Æ–æFW"Ug2…’’Â–ç7V7@¥UbVF—F÷#²Ç’W&–v‡B&WföÇfRæB&WVC²VæFòõ&VFòæB6fRô÷VâÂ–çBöW‡÷'@¦2FW6—&VBâÇ6ò&WFW7C“2Gvò–ÖvW2–â4ÔRöâ7W&f6R6W76–öâÂf—'7B&W6W'fVBÀ§6V6öæB–æFWVæFVçBâæòæWr52–æfW'&VC²f—'7C“"Æ6VÖVçB&VÖ–ç2&÷FV7FVBà¤ÖFW&–ÂÖ6†ææVÂv÷&²7F—2VWVVB&V†–æBF†W6RÖçVÂvFW2âW6W"W6–ær÷fW&æ–v‡C°¦6öçF–çVRg&öÒ&W÷6—F÷'’FöÖ÷'&÷rÂæògW'F†W"WFöÖF–2'V–ÆBæVVFVBFöæ–v‡Bà ¢Ò·…Ó“B6öæR÷&WföÇfRF÷öÆöw’æBUg3¢f÷W"fö7W6VBWFöÖFVB6†V6·2à¢Ò·…Ó“BDUd”4R7–Æ–æFW"ô6öæRõ&WföÇfRUbVF—F÷"ö†—7F÷'’õ6fT÷Vã¢W6W"53##bÓÓ’à¢Ò·…Ó“2DUd”4R&WVFVBöâ7W&f6R&WFW7C¢W6W#“B53##bÓÓ’à ¤Æö6ÂæöFS#Bã’ã6ö×ÆWFR&Vw&W76–öã¢¢£#Ss‚52òd”Âò6¶—VB¢¢à¥&Wf–WvVB6†VÆÂ6†ævW2öæÇ’ÖW6‚†VÇF‚æB&÷F‚&V6÷fW'’U$Ç3²Ub6†–ÆBæBÆ §&VçB6†–ã“Bâ÷&–v–æÃ“2–çFW"÷&W6÷W&6R'VFvWB&WF–æVBââ–æ—F–ÂÆö6À¦66†RÖ6öçG&7B'Vâ6Vv‡Bâ÷fW&'&öB6†VÆÂ–â&WÆ6VÖVçBGW&–ær&W&F–öã°§&W7F÷&VBVç&VÆFVC“2–ç2&Vf÷&Rd”äÂgVÆÃ#Ss…52'VââæòV&Æ—6†VB&Bw&‚à¥V&Æ–6F–öâWf–FVæ6RFòföÆÆ÷s²ÖçVÂFWf–6RvFW2&VÖ–âVæF–ærà  ¢22ã“BV&Æ–6F–öâfW&–f–VB(	B##bÓÓ€ ¥'VçF–ÖSƒƒ3S#“FF##–“Cf6S†6VcCƒ“f3CC–3cfS“²FW7FVBG&VP¢CVF6fcCv&VCƒfC6#3Fcv&c“S#C#&6f#&RâWÆöFVC2W†7B6÷W&6R&Æö'2÷G&VRÀ¦fWF6†VBÖ–âæBÆ–væVBÆö6ÂWV—fÆVçBG&VRâÆö6ÄæöFS#Bã’ãæB†÷7FVDæöFS# ¦gVÆÃ#Ss…52ód”Âó6¶—âF÷öÆöw”4“3“#3C3C“’ö¦ö#scc3SC“#S5T44U53°¥vW33“#3C#“““Bö'V–ÆCscc3SSC3öFWÆ÷“scc3cSS35T44U52âÆÃ"6†V6¶V@¦Æ—fR6†VÆÂöÖæ–fW7BõUb÷væW"ôÖW6‚†VÇF‚ôÆ"&VçG2÷&V6÷fW'’ô×VÇF’÷–çFW"ö'VFvW@¦f–ÆW2'—FRÖÖF6‚6÷W&6RgFW"FWÆ÷–ÖVçBâ–æ—F–ÂV&Æ–2&÷‡’F–ÖV÷WG2ööÆC“0¦Öæ–fW7B&W6öÇfVBöâ&WG&–VBfW'6–öæVBfWF6ƒ²f–æÃ"ó"ÖF6ƒ“BâW‡G&VçfW'6–öæV@¦Öæ–fW7B&WVW7BF–ÖVB÷WBB&÷‡“²æòWf–FVæ6Röb&Vw&W76–öââ&÷FV7FV@¤×VÇF“ãög&÷¦VâöÖöFVÆÆ–ær÷–çB¶W&æVÇ2æBVç&VÆFVC“2–ç2&WF–æVBâÆÂf÷W ¦6öçF–çV—G’f–ÆW27W'&VçC²&ööb6†ævW2Fö72öæÇ’âæòFWf–6R52–æfW'&VBà¥7F÷BÖçVÂvFS¢FöÖ÷'&÷s“B7–Æ–æFW"ô6öæR÷W&–v‡B&WföÇfRUg2³“2&WVBÖ–ÖvP§&WF¶S²f—'7C“"–ÖvRÆ6VÖVçB52&÷FV7FVBâÖFW&–ÂÖ6†ææVÂv÷&²7F—2VWVVBà  ¢22ã“R(	B&V6—6R–çB$t"ò…4"ò†Wƒ²ã“BW6W"52(	B##bÓÓ ¥W6W#“E5266WG2&V6VF–ær7–Æ–æFW"ô6öæR÷W&–v‡B&WföÇfRUg2ÂUbVF—F÷"ö†—7F÷'’ð¥6fT÷VâæB&WVFVBöâ7W&f6R–ÖvW2ÖçVÂÆ—7Bâ&÷FV7C“BUb³“2&WVBÖF@¦&V†f–÷W"æBV&Æ–W"7W&f6RÆ6VÖVçBÂÖ6·2öÆ–W'2÷–çBöæF—fRW‡÷'G2âVF—@£v&3#¢&öGV7F–öâ–çB†2öæÇ’'&÷w6W"7vF6‚ÂæòçVÖW&–2$t"ô…4"VF—F÷"à¤æWr6ÖÆÂ–çBÖ6öÆ÷W"Ö6öçG&öÇ2&–æG2õ$”t”äÂ–çWBÂ5$t#(	3#SRò…5b‡VS(	33cÀ§6GW&F–öâ¶'&–v‡FæW73(	3RÂ†W‚÷F–öæÂ3²6†÷'F†æBöæÇ’6öÖÖ—G2öâ6†ævRà¤‡VR7W'f—fW2w&W’Â6GW&F–öâ7W'f—fW2&Æ6³²–çfÆ–B÷'F–Â÷&ævRVçG&–W2æWfW §V&Æ—6‚æB&WfW'Böâ6öÖÖ—Bâ6ÖR7vF6‚–çWBWfVçB÷vç27G&ö¶R6æ6VÂ÷&öÆÆ&6³°¦æòö–çFW"ö†—7F÷'’÷–çB¶W&æVÂ÷"&W6÷W&6Rö6öFV2öW‡÷'B6†ævRâçVÖW&–26öçG&öÇ0¦föÆÆ÷r÷&–v–æÂÖ6²ö–ÖvRF—6&ÆVB7FFRâ6öÆÆ6VBföÆF÷WBÂ÷&–v–æÂ7vF6‚&WF–æVBà¤''W6‚&VfW&Væ6W2&R6W76–öâT’öæÇ’Âæ÷Bö&¦V7B÷6fRÖWFFFâF‡&VRfö7W6VB7GVÀ¥T’÷—†VÂö†—7F÷'’÷&ö¦V7BöæF—fRFW7G2FFVC²gVÆÂ7V—FR÷V&Æ–6F–öâföÆÆ÷w2à¤öæÇ’–çFW"T’öæWr†VÇW"æB6†VÆÂ÷&V6÷fW'’¶W—3“S²6÷&Rö'VFvWG3“2õUc“Bög&÷¦Vâð¤×VÇF“ã&VÖ–â–ææVBâ&VBFö72÷–çBÖ6öÆ÷W"Ö6öçG&öÇ2Ó“RæÖBf÷"÷væW"VF—Bà¤æW‡BDUd”4R6WE$t"ô…4"ö†W‚Â–çBÂ–6¶W"7–æ2æBw&Wž(i&6öÆ÷W"ö&Æ6¾(i&6öÆ÷W#²Ö6°¦6öÆ÷W"6öçG&öÇ2F—6&ÆVC²†—7F÷'’ö–ÖvRÆ6VÖVçB&VÖ–ç266WFVBâF†Vâ–æFWVæFVç@§&÷Vv†æW72DD×&W6÷W&6R²W‡Æ–6—B66VæRG&ç7÷'Bf÷VæFF–öâF‡&÷Vv‚WF†÷&—FF—fP¦÷væW'2ÂföÆÆ÷vVB'’f—6–&ÆR6öçG&öÇ2÷&Wf–Ws²æò5$t"&ÆVæG2f÷"FFöæ÷&ÖÂÖ2À¦æò&&—G&'’æF—fRÕUbÖFW&–ÂÖWFFF÷"æWrw&—FW"â÷F†W"ÖFW&–Â6Æ÷G2VWVVBà ¢Ò·…Ó“RçVÖW&–26öÆ÷W"T’Æ–æ¶–ærÂw&W’ö&Æ6²ÖVÖ÷'’æBæò66VæR†—7F÷'’öâ6VÆV7F–öâà¢Ò·…Ó“R–çfÆ–B÷'F–ÂfÇVW2Â6†÷'F†æB6öÖÖ—BæBÖ6²ÖF—6&ÆVB6öçG&öÇ2à¢Ò·…Ó“R7GVÂ7G&ö¶R6æ6VÂÂW†7B7–â—†VÇ2ÂVæFòõ&VFòÂ6fRô÷VâæBæF—fRärà¢Ò·…Ó“RDUd”4R&V6—6U$t"ô…4"ö†W‚æB–çB6†V6·3¢W6W"53##bÓÓ’à ¤Æö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öâ¢£#Sƒ52òd”Âò6¶—VB¢£²W†—7F–æs“Ró“`¦æV&'“E52æBæWs“Rfö7W6VC552â÷&–v–æÂ6öÆ÷W"''W6‚÷&W6÷W&6Rö†—7F÷'’õUbð¦–ÖvRöW‡÷'Bô×VÇF’ög&÷¦Vâ÷væW'2Væ6†ævVBâV&Æ–6F–öâfW&–f–6F–öâföÆÆ÷w2à  ¢22ã“RV&Æ–6F–öâfW&–f–VB(	B’ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖSf3“FSƒCC†F&&33#CCfcc#s–#SSƒcSc²FW7FVBG&VP¢SCFcS3&Sv3&SS†CSƒVCSV3S#sc–3s“vc“RâWÆöFVC2W†7B&Æö'2æB–FVçF–6À§FW7FVBG&VS²Ö–âfWF6†VBöÆö6ÂWV—fÆVçBG&VRÆ–væVBâæöFS#BÆö6Â²æöFS# ¦†÷7FVBgVÆÃ#Sƒ52ód”Âó6¶—âF÷öÆöw”4“3“csSSBö¦ö#ss“3SSƒS5T44U53°¥vW33“csSSSSrö'V–ÆCss“3SS“SƒRöFWÆ÷“ss“3c“C’5T44U52âf–æÃ"ó"6†V6¶V@¦Æ—fR6†VÆÂöÖæ–fW7B÷–çFW"öæWr6öÆ÷W"†VÇW"÷&V6÷fW'’ö6÷&RõUbô×VÇF’ö'VFvWB÷7W&f6P¦f–ÆW2'—FRÖÖF6‚6÷W&6Râ–æ—F–Â–âÖfÆ–v‡B&VG26W'fVC“BæB†VÇW#CBv—F‚&÷‡§F–ÖV÷WC²g&W6‚÷7FFWÆ÷–ÖVçB6ö×ÆWFRw&‚ÖF6†W3“RâöæÇ’–çFW"öæWr†VÇW"À§F‡&VR6†VÆÂ66†R¶W—2æB&Wf–WvVBf—‡GW&R6†ævVC²ÆÂ÷F†W"Æv÷&—F†Ò–ç2&WF–æVBà¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçBÂW6W#“E52&÷FV7FVBâF†—2&ööb—2Fö72öæÇ“°£“RFWf–6R6öÆ÷W"÷–6¶W"öw&W’Ö&Æ6²&V6÷fW'’÷–çBvFRVæF–ærâæW‡B–æFWVæFVç@§&÷Vv†æW72FF×&W6÷W&6R÷G&ç7÷'Bf÷VæFF–öâW"Fö72÷–çBÖ6öÆ÷W"Ö6öçG&öÇ2Ó“RæÖC°¦æòW‡G&ÖFW&–ÂÖ6†ææVÂ&—G’÷"•BW&f÷&Öæ6R6Æ–Ò–æfW'&VBà  ¢22ã“b(	B6ö×7BÆVgB–çB²ö&¦V7B&F–ÂUc²ã“R52(	B##bÓÓ ¥W6W#“U52&÷FV7G2Æ–æ¶VE$t"ô…4"ö†W‚æB&–÷"–çBõUbâW6W"W‡Æ–6—FÇ’&WVW7G0¥–çBÆVgB÷F–G’&V6W6R'VÆ·’T’ö'7G'V7G2ÖW6‚ÂÇW2FVF–6FVEUb–âö&¦V7B&F–Âà¥F†—2W6W"F—&V7F–öâF¶W2&–÷&—G’÷fW"&÷Vv†æW72v÷&³²VF—BöæÇ’Âæò&÷Vv†æW70§&W6÷W&6R÷66†VÖ6†ævW2ÖFRâ6ÖRFööÂ×6W76–öâ×V’÷væW"7V6–ÂÖ66W7Wb×–çB0¦ÆVgC‡‚÷F÷'‚ó#s'‚&÷VæFVB67&öÆÆ–ærFö6²Â¶VW2÷&–v–æÂfö÷FW"ö'WGFöç2–çF7BÀ§6¶—2v–FR7F–öâ&W&VçF–æs²æW‡BFööÂ6ÆV'2v–GF‚æB÷&–v–æÂ6VçG&VBÆ6VÖVç@§&WGW&ç2â6†&VB÷6—F–öæW"÷v–FRÖÆ–÷WCs3"Væ6†ævVBâ–çFW"&RÖw&÷W24ÔR6öçG&öÇ3 ¦6öÆ÷W"÷6—¦Rö÷6—G’öÆ–W"ôFBW‡÷6VC²''W6‚õ$t$…4"öÆ–W"6WGF–æw2öÖ6·26öÆÆ6VBÀ¦–ÖvR6öçG&öÇ27FvVBöæÇ“²7F–6·’VæFõ&VFôFöæRâæòö–çFW"ö''W6‚÷&W6÷W&6R6†ævW2à¥Ub÷WFW#“+ó#3‚FFVB&W6W'f–ær÷F†W"ö&¦V7B6V7F÷'3²æWwWeFööÇ4'FâÆVæ6†W24ÔP¤ÖW6‚†VÇF‚Ub÷væW"–çWb×FööÇ26W76–öâÂF—FÆUUbæBF–væ÷7F–2æöFW2†–FFVââ&ö¦V7F–öâð§v÷&·76Rö†—7F÷'’÷–ÆöBô6Æ÷6R÷væW'2Væ6†ævVC²&Vg&W6‚7F—2f—6–&ÆRâÖW6‚†VÇF€¦ÖöFR†–FW2Ug2æB&WF–ç2&W—'2âUbÖöæÇ’&W÷'G26¶—†VÇF‚æÇ—6—2æB&Vg&W6€¦öâ6öçFW‡Bö†—7F÷'’6†ævW2â6Æ÷6RöÆBÖöFR&Vf÷&R7v—F6†–ær”G3²÷&–v–æÂ&F–Âð¦&6¶w&÷VæB6Æ÷6RFFW'2–æ6ÇVFWWb×FööÇ2âæò6V6öæBVF—F÷"ö¶W&æVÂö†—7F÷'’à¥GvòæWr–çFVw&F–öâ6†V6·2²WFFVB÷&–v–æÂ&F–Â÷v÷&·76R†&æW72&WF–â6VÖçF–0¦6†V6·3²gVÆÂ7V—FR÷V&Æ–6F–öâföÆÆ÷râÆÃb6†ævVB÷væW'2·6†VÆÂ÷&V6÷fW'““c²Væ6†ævV@§–çB6÷&Rö'VFvWG3“2ö6öÆ÷W#“RõUbÖW#“Bô×VÇF’ög&÷¦VâöÖöFVÆÆ–ær÷6†&VBÆ–÷WG2&WF–æVBà¥&VBFö72÷–çB×WbÖÆ–÷WBÓ“bæÖBâæW‡BDUd”4RÆVgBFö6²fö÷G&–çB÷6V7F–öç2Â–çBöÖ6²ð¦–ÖvRÆ6VÖVçC²ö&¦V7EUb&ö¦V7BöVF—F÷"ô&6²ô6Æ÷6RæBÖW6‚†VÇF‚&W—"&Vw&W76–öâà¥F†Vâ&W7VÖR–æFWVæFVçB&÷Vv†æW72FF×&W6÷W&6RöW‡Æ–6—BG&ç7÷'Bf÷VæFF–öâà ¢Ò·…Ó“b7GVÂ6W76–öâFö6¶–æröæöFR–FVçF—G’æBæW‡B×FööÂ6VçG&R&W7F÷&F–öâà¢Ò·…Ó“bUbÖöæÇ’&ö¦V7F–öâö†—7F÷'’ö6Æ÷6RæBÖW6‚†VÇF‚ÖöFR&W7F÷&F–öâà¢Ò·…Ó“bDUd”4RÆVgB–çB6—¦R÷67&öÆÂ÷6V7F–öç2ôFöæRæB–ÖvRÒõ"õ3¢W6W"53##bÓÓ’à¢Ò·…Ó“bDUd”4Rö&¦V7B&F–ÅUböVF—F÷"öW†—BæBÖW6‚†VÇFƒ¢W6W"53##bÓÓ’à ¤Æö6ÂæöFS#Bã’ãf–æÂgVÆÂ¢£#Sƒ252òd”Âò6¶—VB¢¢â–æ—F–ÂgVÆÂ'Và¦6Vv‡BGvò÷WFFFVBFW7BFFW'3£C3’W‡V7FVBÆ—FW&Âf—†VBÖW6‚†VÇF‚”BÃs3¥7vVW†÷7BöÖ—GFVB&VÂDôÒ7G–ÆR&÷W'G’âWFFVBf—‡GW&W2FòGVÂ”BæB7GVÀ¦†÷7B6†S²¶WBÆÂ6VÖçF–2÷&VBÖöæÇ’õ7vVW76W'F–öç2âfö7W6VC•52Âf–æÂgVÆÀ£#Sƒ553²æò'VçF–ÖR7vVW÷"6†&VB÷6—F–öæW"6†ævW2âV&Æ–6F–öâ÷f—7VÂ&ööbföÆÆ÷w2à  ¢22ã“bV&Æ–6F–öâfW&–f–VB(	B’ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖS3#“S3&6&&Cƒ–6cv3FvFS6#ƒscSfCscVf6C&c²FW7FVBG&VP£V&SƒSSScs36#†#ƒ#“FSCSƒ#CfcVS&#“sS’âÆÃ#WÆöFVB&Æö'2÷G&VRÖF6‚FW7FV@¦Æö6Â6÷W&6S²fWF6†VBÖ–âöÆö6ÂWV—fÆVçBG&VRÆ–væVBâÆö6ÄæöFS#B²†÷7FVDæöFS# ¦gVÆÃ#Sƒ552ód”Âó6¶—âF÷öÆöw”4“3“s3cC“c"ö¦ö#sƒ““ƒcCcB5T44U53°¥vW33“s3cCCƒbö'V–ÆCsƒ““ƒƒƒböFWÆ÷“sƒƒ3#‚5T44U52âÆ—fS2óR6†V6¶V@¦f–ÆW2'—FRÖÖF6‚Â–æ6ÇVF–ær6†VÆÂöÖæ–fW7BæBÄÃb6†ævVB'VçF–ÖR÷væW'2Â&V6÷fW'§fW'6–öâ÷v–FRÆ–÷WBô×VÇF’ö6öÆ÷W"õUbÖW"âGvòTä4„ätTBf–ÆW2‡&VÆV6RÖ&ö÷G7G&À§6†&VB÷6—F–öæW#s3"’&WVFVFÇ’&÷‡’×F–ÖVBÖ÷WBöâ…EE&V6†V6³²&W÷6—F÷'’W†7@¦'—FW2÷–ç2&WF–æVBæB&Wf–÷W6Ç’fW&–f–VBâæò6Æ–ÒF†÷6RGvòvW&RfWF6†VC“bà¤6Æ÷VB'&÷w6W"ÆöFVBf—6–&ÆS“b6†VÆÂ'WBvV$tÂ6öçFW‡B7&VF–öâf–ÆVB–âVæ6†ævV@¦Ö–ãƒSBõF‡&VR&VæFW&W#²F†W&Vf÷&RæòÖW6‚÷&F–Âõ–çB&VæFW&VB66WFæ6R6Æ–ÖVBà¤—6öÆFVBFW7BF"6Æ÷6VC²æò67&VVç6†÷Böb&Ææ²ÖW6‚&WGW&æVB2Æ–÷WB&ööbà¤7GVÂ6W76–öâõUb÷væW"6VÖçF–72æBæF—fR–çBö–ÖvRfÆ÷w2&VÖ–âFW7FVB'’æöFS°¦•BÆVgBÖFö6²÷6V7F–öâ÷67&öÆÂæBUbæf–vF–öâÖçVÂvFR&VÖ–ç2VæF–æs“bà¤ÆÂf÷W"6öçF–çV—G’f–ÆW2²v÷&¶fÆ÷rW6W"W†6WF–öâWFFVBâW6W#“U52&÷FV7FVC°§F†—2&ööb6†ævW2Fö72öæÇ’â&÷Vv†æW72VF—B&VBÖöæÇ’Â–×ÆVÖVçFF–öâFVfW'&VBà  ¢22ã“r(	B&÷Vv†æW72FFò&ö¦V7Bf÷VæFF–öã²ã“bW6W"52(	B##bÓÓ ¥W6W#“e52&÷FV7G26ö×7BÄTeB–çB÷6V7F–öç2ôFöæRÂ6öÆ÷W"ö–ÖvRVæ6–Â7–6ÆRÀ¤ö&¦V7B&F–ÅUb&ö¦V7F–öâöVF—F÷"öW†—BæBÖW6‚†VÇF‚&W—"&6VÆ–æRâVF—B7W'&Vç@¦FFc#Ccc¢öæÇ’5$t"6öÆ÷W"&W6÷W&6W2W†—7C²–×÷'FVB66Æ"w&—FW'2Ç&VG’÷vâÖ ¦W‡÷'BâFB6W&FR#‡&÷Vv†æW72&W6÷W&6Sn(	3S"†W2ÂÆ–æV"FFõUb×cÖf—'7Bö&–æF–ærÀ¦÷væVB6GW&RöVæ6öFRöFV6öFRÂ6öÖÖ—GFVB&VBÖöæÇ’6†&–ær6öçfVçF–öââW†7B66†VÖÀ¦6æöæ–6Â÷&–v–æÂ&ö¦V7B'—FW2ÂFVGWDÖ”"Væ—VRó„Ö”"W‡æFVBæB&VFV6öFR'VFvWBð§&VbfÆ–FF–öââ66VæWcbôäÅ’v—F‚&÷Vv†æW73²ÖæFF÷'–6öÆ÷W%–çEfW'6–öâFVÆVvFW0¦÷&–v–æÂ6öÆ÷W'c(	3RVçfVÆ÷RFòVæ6†ævVB÷væW'2âv—F†÷WB&÷Vv†æW72W†7BÆVv7”¥4ôâð§fW'6–öâ&WF–æVBâUbVçfVÆ÷R7F—2UbÖöæÇ“²÷&–v–æÃ3$Ö”"f–ÆR²6öÆ÷W"'VFvWG27F’à¤÷&–v–æÂ66VæR6æ6†÷B÷&W7F÷&RöFDÖW6‚÷6–ævÆR´×VÇF’GWÆ–6FR6†&R&W6÷W&6RÂVF—G0§&WÆ6S²FöÖ–2÷Vâ6÷''WF–öâæB&VæFW"f–ÇW&R&WF–â66VæR÷&W6÷W&6W2ö†—7F÷'’à¤¦ö–â&VgW6W266Æ"ÖöæÇ’–çC²Æ–æ¶VBæF—fUUbwV&B&WF–æVBâ6†&VBW‡÷'BÖW6€§&W6öÇfW"&VgW6W2&÷Vv†æW72Ö&V&–ærô$¢ôtÄ"ôäôÒ†–æ6ÇVF–ærÆöæw6–FR6öÆ÷W"’–ç7FV@¦öb6–ÆVçFÇ’G&÷–ærVç7W÷'FVB6†ææVÂâæòw&—FW"÷&÷fVææ6RövVöÖWG'’ö''W6‚õT¦¶W&æVÂFFVBâ6—‚æWr–çFVw&F–öâFW7G26÷fW"FF'—FW2ÂÆÂÆVv7’6öÆ÷W"G&ç7÷'G2À§V÷F2÷&Vg2÷&VFV6öFRö÷væW'6†—Â7GVÂ†—7F÷'’ôGWÆ–6FRôf–ÆRô÷Vâ÷&öÆÆ&6²æBw&—FW"ð¤¦ö–â&VgW6Ç2âgVÆÂ7V—FR÷V&Æ–6F–öâföÆÆ÷râFö73¢&÷Vv†æW72×&W6÷W&6RÓ“ræÖBà¤7GVÂ&W6÷W&6Rö6öFV2öÖWFFFöwV&B²6ö×ÆWFR&VçBôÆ"w&ƒ“s²–çFW"T’öæÇ§&VçB–âÂ&WF–ç266WFVC“bÆVgBFö6²õUb66W72â×VÇF“ãög&÷¦VâõUc“Bö6öÆ÷W#“Rð¦''W6‚÷&ö¦V7F–öâöÆ–÷WBöÖöFVÆÆ–ær¶W&æVÇ2Væ6†ævVBâæò&÷Vv†æW726öçG&öÇ2÷&VæFW"ð¦W‡÷'BöÆ–W'2öF—7Æ6VÖVçB&—G’6Æ–ÒâæòæWrFWf–6R&÷Vv†æW72FW7B÷76–&ÆR–WBà¤æW‡B÷&–v–æÂ66Æ%är²äôÒôtÄ"ÖFW&–ÂW‡÷'BFFF–öâv—F‚7–æ26GW&Rö&–æF–ærð¦6öÖ&–æVBÖFW&–Â–FVçF—G’FW7G2ÂF†Vâf—6–&ÆR6†ææVÂ÷&Wf–WrF‡&÷Vv‚÷&–v–æÂ–çFW"à¤ÖçVÂæV&'“¢W†—7F–ær6öÆ÷W"–çB6fT÷VâôGWÆ–6FS²Fòæ÷B6²7–çF†WF–2#‚f—‡GW&W2à ¢Ò·…Ó“r#‚÷væVB'—FW2æB6öÆ÷W'c(	3RW†7BG&ç7÷'B&W6W'fF–öâVæFW"W‡Æ–6—B66VæWcbà¢Ò·…Ó“rÖÆf÷&ÖVB÷&Vb÷Væ—VR¶W‡æFVB'VFvWG2&Vf÷&RFV6öFS²f–ÆVBFG2Fòæ÷BÇFW"ööÂà¢Ò·…Ó“r÷&–v–æÂ†—7F÷'’÷6–ævÆR´×VÇF’GWÆ–6FRôf–ÆRöFöÖ–2÷VâæB&VæFW"&öÆÆ&6²à¢Ò·…Ó“rVç7W÷'FVBFFW‡÷'Bô¦ö–â&VgW6S²æò&÷Vv†æW72–ç6–FRæF—fUUbVçfVÆ÷Rà¢Ò²Ó“rDUd”4RæV&'’W†—7F–ær6öÆ÷W"–çB6fT÷VâæB÷&F–æ'’GWÆ–6FR&Vw&W76–öâà ¤Æö6ÂæöFS#Bã’ãgVÆÂ¢£#Sƒ’52òd”Âò6¶—VB¢£²6—‚æWs“r6†V6·2æ@¦ÆÂW†—7F–ær6öÆ÷W"õUböÆVgBÖFö6²÷–çBö–ÖvRöæF—fR&Vw&W76–öç272â&Wf–WvVB6ö×ÆWFP§&VçBôÆ"66†Rw&‚Â6÷W&6R7F×2&WF–æVBÂ&÷FV7FVB×VÇF’ög&÷¦VâVæ6†ævVBà¥V&Æ–6F–öâWf–FVæ6RföÆÆ÷w3²æòæWr&÷Vv†æW72FWf–6RT’÷"&VæFW"6Æ–Òà  ¢222'V–ÆBã“rV&Æ–6F–öâfW&–f–6F–öà ¥'VçF–ÖR6öÖÖ—B3c3““scƒ†#&cSFcSCSVC#VVc3“ss&ÂFW7FVBG&VR#FF3SCCc33““#3&3f6FFFf#SCSƒScvV#cC6Â—2V&Æ—6†VBâ†÷7FVBæöFR#"&Vw&W76–öâ'Vâ3““CsƒSƒ3‚†¦ö"sƒsSƒCƒB’76VBÆÂ"ÃSƒ’FW7G2Âv—F‚¦W&òf–ÇW&W2÷"6¶—2âvW2'Vâ3““CsƒSSc6ö×ÆWFVB7V66W76gVÆÇ’†FWÆ÷’¦ö"sƒsS#cS3b’âÆÂ#R6†V6¶VBÆ—fR'VçF–ÖRÂÆ"Â&VÆV6RæB&÷FV7FVB×VÇF’f–ÆW2ÖF6†VB&W÷6—F÷'’'—FW2â&÷FV7FVBã“bW6W"52&VÖ–ç2–âf÷&6S²æò&VæFW&VB&÷Vv†æW72T’66WFæ6R—26Æ–ÖVBà ¤†æG2Ööâã“r6†V6·3¢–çBF—7F–æ7F—fRÖ&²Â6fRæ&÷†Æ"æB&V÷Vã²GWÆ–6FR–çFVBö&¦V7BÂ–çBF†R6÷’ÂæBVæFòõ&VFòv†–ÆR6öæf—&Ö–ærF†R÷&–v–æÂ&VÖ–ç2Væ6†ævVBâ&÷Vv†æW72†2æò6öçG&öÇ2–WC²—G2&W6÷W&6R÷&ö¦V7Bö†—7F÷'’f÷VæFF–öâ—26÷fW&VB'’WFöÖFVBFW7G2âæW‡Bæ'&÷rv÷&²&VÖ–ç266Æ"äræBW†—7F–ærW‡÷'BÖ÷væW"FFF–öâ&Vf÷&Rf—6–&ÆR&÷Vv†æW72–çF–ærà  ¢22ã“‚(	B&÷Vv†æW72W‡÷'BF‡&÷Vv‚W†—7F–ærw&—FW'3²ã“rW6W"52(	B’ö7Fö&W"##` ¥W6W#“u52&÷FV7G2W†—7F–ær6öÆ÷W"6fRô÷VâÂ–çFVBGWÆ–6FR—6öÆF–öâæ@¥VæFòõ&VFòâVF—BÖ–ãcCVC"òã“s¢66Æ%äröæF—fRÖFW&–Â6Æ÷G2ôtÄ"ÖFW&–ÂF6€¦Ç&VG’W†—7BâW‡FVæB÷&–v–æÂ–çBÖW‡÷'B6GW&Rv—F‚7G&–7B÷væVB#‚6÷–W0¦&Vf÷&Rv—BÂW†—7F–æræF—fR&6RUb¶W’öF–vW7Bf÷"&÷F‚6†ææVÇ2ÂæB66Æ%ärp¦Væ6öF–ær†æòvÖÖöfÆ—÷&W6×ÆRöf7F÷"&¶R’â÷&–v–æÂäôÒ&÷Vv†æW726Æ÷Böf7F÷#À¥Ub÷öÇ–vöâö6öçF–æW"öæÖRöFVGWó#DÖ”"'VFvWB&WF–æVBâtÄ"r&÷Vv†æW74f7F÷#æ@¦ÖWFÆÆ–4f7F÷#²–ÖvR–FVçF—G’6W&FRg&öÒ6öÖ&–æVB6öÆ÷W"·&÷Vv†æW72ÖFW&–À¦–FVçF—G’6ò6†&VB6öÆ÷W"6ææ÷BÖW&vRF—7F–æ7B&÷Vv†æW72Ö2â66Æ"ÖöæÇ’æ@¦6öÆ÷W"·66Æ"7W÷'FVC²Vç&W&VB7–æ2æF—fRôô$¢ô¦ö–â7F–ÆÂ&VgW6Râæò&ö¦V7@§66†VÖö†—7F÷'’ö''W6‚õT’ö¶W&æVÂ÷&÷fVææ6R6†ævW2âf—fR7GVÂw&—FW"ôf–ÆRõärö7–æ2ð¦&–æF–ær÷&VgW6Â÷6÷W&6RÖ–Ö×WF&–Æ—G’&Vw&W76–öç2FFVC²öÆC“r7–æ2&VgW6ÂWFFV@§Fò7FÆRÖ&–æF–ærfÆ–FF–öâÂ÷F†W"wV&G2&WF–æVBâ6†ævVB÷væW'2æB&V7W'6—fP§&VçBôÆ"66†Rw&ƒ“ƒ²&÷FV7FVB×VÇF“ãög&÷¦VâöÖöFVÆÆ–æræB66WFVB–çBT§&WF–æVBâ&VBFö72÷&÷Vv†æW72ÖW‡÷'BÓ“‚æÖBâgVÆÂfÆ–FF–öâ÷V&Æ–6F–öâföÆÆ÷rà¤æò&÷Vv†æW726öçG&öÇ2÷&Wf–Wr–WC²æW‡B÷&–v–æÂ–çFW"66Æ"6†ææVÂ–çFVw&F–öâà¤ÖçVÂæV&'“¢W‡÷'BF–ffW&VçFÇ’–çFVB÷&–v–æÂö6÷’FòäôÔBæBtÄ"Â6öæf—&Ð¦–æFWVæFVçB6öÆ÷W"õUbÆ6VÖVçC²–çB6fRô÷Vâö†—7F÷'’&VÖ–ç2&÷FV7FVC“u52à ¢Ò·…Ó“rDUd”4RW†—7F–ær–çB6fRô÷VâæBGWÆ–6FRõVæFõ&VFó¢W6W"53##bÓÓ’â&÷FV7FVBà¢Ò·…Ó“‚WFöÖFVB66Æ"ärôäôÒôtÄ"W†7B'—FW2ÂUg2Â6öÖ&–æVBÖFW&–Ç2æBFVGWà¢Ò·…Ó“‚WFöÖFVB7–æ26GW&RÂÖÆf÷&ÖVB÷7FÆR÷væW"&VgW6ÂæB6÷W&6R–Ö×WF&–Æ—G’à¢Ò·…Ó“‚7GVÂf–ÆRäôÔBôtÄ"7F–öç2F÷væÆöB66Æ"Ö2æB&W÷'B6÷VçG2à¢Ò²Ó“‚DUd”4RæV&'’6öÆ÷W"äôÔBôtÄ"W‡÷'BV&æ6S²æò&÷Vv†æW726öçG&öÇ2–WBà  ¥W6W"&VÖ–æFW"(	B’ö7Fö&W"##c¢WfW'’'V–ÆB6ö×ÆWF–öâ×W7BW‡Æ–6—FÇ’7FFP§v†WF†W"F†W&R—26öÖWF†–ærFòFW7BÂv—F‚'V–ÆB÷&VF–æW72æBV–6²†æG2Ööâ6†V6·2À¦÷"6ÆV&Ç’7FFRæòæWr†æG2ÖöâFW7B—2æVVFVBâ&Vff—&ÖVB–â•õtõ$´dÄõræÖBà  ¢ã“‚f–æÂÆö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£"ÃS“B52òd”Âò6¶—VB¢¢à¤f—fRæWrW‡÷'B–çFVw&F–öç2æBÆÂW†—7F–ær–çBö–ÖvRõUböÖöFVÆÆ–ær6†V6·272à¤–æ—F–Â66†R&W&F–öâ66–FVçFÆÇ’&W–ææVBVæ6†ævVC“r6†VÆÂ÷væW'3²&Vw&W76–öà¦6†V6·26Vv‡BF†—2ÂVç&VÆFVB–ç2vW&R&W7F÷&VBÂ&Wf–WvVB6öçG&7B76VBÂæBF†P¦f–æÂ6ö×ÆWFR7V—FR&÷fR&âv–ç7B6÷'&V7FVB6÷W&6Râæò&Bw&‚V&Æ—6†VBà¤×VÇF“ãæBg&÷¦Vâ&WF2Væ6†ævVBâV&Æ–6F–öâfW&–f–6F–öâföÆÆ÷w2à  ¢22ã“‚V&Æ–6F–öâfW&–f–VB(	B’ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR6öÖÖ—BSvS6c“6ff#†3–“F&#&66&#s3†#C†#“#FÂG&VP¦3Vc““†SfV6CfSS–&6“S“3#3sSC–#C†Â—2V&Æ—6†VBâ†÷7FVBF÷öÆöw§&Vw&W76–öâ'Vâ3“#3#csSSƒ†Â¦ö"s““CS3“SvÂ6ö×ÆWFVB7V66W76gVÆÇ“°¥vW2'Vâ3“#3#csS#V6ö×ÆWFVB7V66W76gVÆÇ’âF†R'V–ÆBw2&V6÷&FVBÆö6ÂgVÆÀ§7V—FR—2"ÃS“B52òd”Âò6¶—VC²F†—26öçF–çVF–öâfW&–f–VB†÷7FVB7V66W72À§v—F†÷WB&W'Vææ–ærF†RÆö6Â7V—FRâÆÂ’6†V6¶VBÆ—fRf–ÆW2'—FRÖÖF6‚Ö–ã §6†VÆÂöÖæ–fW7BÂWfW'’6†ævVB'VçF–ÖRæBÆ"f–ÆRÂæB&÷FV7FVB×VÇF“ãà¤æò'VçF–ÖR6†ævW2–âF†—26öçF–çVF–öâæBæòã“‚FWf–6R52–æfW'&VBà ¥F†R—2&VG’f÷"FW7F–ær(	B'V–ÆBã“‚âW‡÷'BF–ffW&VçFÇ’6öÆ÷W"×–çFV@¦÷&–v–æÂö6÷’FòäôÔBæBtÄ#²6†V6²–æFWVæFVçB6öÆ÷W"æBUbÆ6VÖVçBâ&W–ç@§F†R6÷’æB&WVBäôÔBW‡÷'BFò6öæf—&ÒF†R÷&–v–æÂ&VÖ–ç2Væ6†ævVBà¥&÷Vv†æW72f—‡GW&W2&RWFöÖFVC²F†W&R&Ræò&÷Vv†æW726öçG&öÇ2FòFW7B–WBà¤æW‡Bæ'&÷r'V–ÆC¢f—6–&ÆR&÷Vv†æW726†ææVÂ÷&Wf–WrF‡&÷Vv‚W†—7F–ær6ö×7B–çBÀ§&7FW"ö–çWBö†—7F÷'’÷væW'2Â&W6W'f–ær66Æ"FF6VÖçF–72æBW†—7F–ærW‡÷'G2à  ¢22ã“’(	B&÷Vv†æW72Væ6–Â–çF–æræBw&—66ÆR–ç7V7F–öâ(	B’ö7Fö&W"##` ¥W6W"ã“‚52&÷FV7G2–æFWVæFVçB÷&–v–æÂö6÷’6öÆ÷W"æBUbÆ6VÖVçB–âäôÔ@¦æBtÄ"Â–æ6ÇVF–ær&W–çB÷&RÖW‡÷'B—6öÆF–öââVF—B3Vcs¢ã“r&W6÷W&6R÷&ö¦V7Bð¦†—7F÷'’æBã“‚÷&–v–æÂw&—FW'2W†—7C²æò66Æ"6†ææVÂ–âF†R–çFW"âW‡FVæ@¦÷&–v–æÂf–Ww÷'B×–çBÖ6÷&RæB6ö×7BÆVgBT’öæÇ’â6†ææVÂ6öÆ÷W"õ&÷Vv†æW72À£(	3#SRfÇVR6Æ–FW"Â6ÖR6—¦Rö†&FæW72ö÷6—G’÷&W77W&RæB&÷„Æ"ô¶ÆV6·26×ÆW'2à¤÷VR&7FW"w2&rÖ'—FR–çFW'öÆF–öâ6'&–W2WVÂ$t"fÇVW3²V&Æ—6‚÷væVB#€§F‡&÷Vv‚÷&–v–æÂ&÷Vv†æW72&W6÷W&6R÷ööÂæB66VæR6†V6·ö–çBâv†—FRFVfVÇBÓ#SS°£6Öö÷F‚ó#SR&÷Vv‚âæòvÖÖ6öçfW'6–öâ÷"6öÆ÷W"&ÆVæBÖöFW2–â66Æ"ÖF‚à¤w&—66ÆR–ç7V7F–öâ—2FV×÷&'’æBÆ&VÆÆVC²FöæR&WGW&ç2W†—7F–ær6öÆ÷W"õ7GVF–ð¦V&æ6RâæòÆ—BÖFW&–Â&÷Vv†æW72&Wf–Wr–WBâæWrÖ3S,+#²fÆ–B÷F†W"6—¦W0§&VÖ–â6f&ÆRöW‡÷'F&ÆR'WB–çF–ær&VgW6W2v—F†÷WB&W6×Æ–ærâ&÷Vv†æW726†ææVÀ¦†2æòÆ–W'2öÖ6·2ö–ÖvR÷W&F–öç3²÷&–v–æÂ6öÆ÷W"6öçG&öÇ2F—6&ÆVBÂ&W7F÷&V@¦öâ6öÆ÷W"â6†ææVÂ6†ævR6æ6VÇ2Æ—fR6öçF7B÷Æ6VÖVçBÂæWfW"FG2†—7F÷'’à ¥66Æ"–FVçF—G’¦ö–ç2W†—7F–ær7–æ2ö7W'&VçB×7FFRwV&G2â–çfÆ–B÷7FÆR&–æF–ærÀ§V÷Fö6†V6·ö–çBf–ÇW&R&öÆÇ2&6²&Wf–WræBÆVfW266VæR÷6†&VB&W6÷W&6W2–çF7Bà¤÷&–v–æÂ6–ævÆRô×VÇF’GWÆ–6FRÂ†—7F÷'’Â66VæWcb6fRô÷VâæBäôÒôtÄ"w&—FW'2&VÖ–à¦÷væW'2âöæÇ’Gvò–çFW"ÖöGVÆW2æBF†V—"6†VÆÂ–ç26†ævS²æWr6†–ÆB&VfW&Væ6W0§W6RW†—7F–æs“‚&W6÷W&6R÷ööÂ–ç2â×VÇF“ãög&÷¦VâöÖöFVÆÆ–ær÷&VæFW"öW‡÷'B¶W&æVÇ2À¤Æ"æB''W6‚6÷W&6W2Væ6†ævVBâ6—‚fö7W6VB–çFVw&F–öâ6†V6·26÷fW"7GVÂT’À¦'—FW2ö6æ6VÂö6÷fW&vRÂ†—7F÷'’÷&ö¦V7BÂ7GVÂ6–ævÆR´×VÇF’GWÆ–6FRæBtÄ"öæF—fP¥ärÂV÷F2÷&öÆÆ&6²æB7FÆRöæöãS"&VgW6Ç2âgVÆÂfÆ–FF–öâ÷V&Æ–6F–öâ&VÆ÷rà ¤æW‡BDUd”4S¢–çB(i"6†ææVÂ&÷Vv†æW72Â–çBfÇVSF†Vã#SRVÇ6Wv†W&S²–ç7V7Bw&¦Öâ6öÆ÷W"&WGW&ç2÷&–v–æÂ–çC²&W6VÆV7B&÷Vv†æW72Fò–ç7V7B&WF–æVBÖà¤FöæRõVæFòõ&VFòÂ6fRô÷VâF†Vâ&÷Vv†æW73²GWÆ–6FR÷&W–çBæBW‡÷'BäôÔBFò6†V6°§6Öö÷F‚÷&÷Vv‚&Vv–öç2VæFW"Æ–v‡F–ærâæò&VæFW&VBö•BW&f÷&Öæ6R66WFæ6R–æfW'&V@¦g&öÒæöFRFFW'2âæW‡B'V–ÆC¢Æ—B&÷Vv†æW72&Wf–WrF‡&÷Vv‚W†—7F–ærÖFW&–Âð§7W&f6RÆ–fWF–ÖR÷væW"Â&WF–æ–ær66WFVB6öÆ÷W"V&æ6Rv†W&Ræò66Æ"W†—7G2à ¢Ò·…Òã“‚DUd”4R–æFWVæFVçB6öÆ÷W"õUg2–âäôÔB´tÄ"æB&W–çB—6öÆF–öã¢W6W"52â&÷FV7FVBà¢Ò·…Òã“’6—‚–çFVw&F–öâ6†V6·3¢7GVÂT’Â'—FR–çFW'öÆF–öâö6æ6VÂÂ†—7F÷'’÷&ö¦V7BÀ¢7GVÂ6–ævÆRô×VÇF’GWÆ–6FR²æF—fRôtÄ"Ö2ÂV÷Fö6†V6·ö–çBæB7FÆR÷6—¦RwV&G2à¢Ò·…Òã“’DUd”4R&÷Vv†æW72fÇVSó#SR7G&ö¶W2Â6†ææVÂ&WGW&âæB&WF–æVBw&—66ÆS¢W6W"53##bÓÓ’à¢Ò·…Òã“’DUd”4RVæFòõ&VFòÂ6fRô÷VâÂGWÆ–6FR—6öÆF–öâæBæöÖB6Öö÷F‚÷&÷Vv‚V&æ6S¢W6W"53##bÓÓ’à ¢ã“’f–æÂÆö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£"Ãc52òd”Âò6¶—VB¢¢à¥6—‚æWr66Æ"–çFVw&F–öâ6†V6·273²&Wf–WvVB&VÆV6R6öçG&7CU52æB÷&–v–æÀ¦6öÆ÷W"öÖ6²6†V6·2&WF–æVBâæò'VçF–ÖRFW7G26¶—VBÂæò&÷FV7FVBög&÷¦Vâ6†ævW2à¥V&Æ–6F–öâfW&–f–6F–öâföÆÆ÷w3²7GVÂ•Böw&—66ÆRöæF—fRÖÆ–v‡F–ærvFRVæF–ærà  ¢22ã“’V&Æ–6F–öâfW&–f–VB(	B’ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRsfSC†S6#FVSVF3s3†SScfVc†F#3#666&3–ÂFW7FVBG&VP¦SS†C3VVSSc3ƒƒSsFfVf&#6366f&fSc&cScv#&Â—2V&Æ—6†VBâ6öææV7FVBv—BFF¦7&VFVBF†R–FVçF–6ÂÆö6ÂFW7FVBG&VS²fWF6†VB÷&–v–âöÖ–âÖF6†VBW†7FÇ’à¤Æö6ÂæöFS#BæB†÷7FVB&Vw&W76–öâ3“#C#s#3ƒ“fò¦ö"ƒ#scS3–&÷F‚70£"ÃcFW7G2Â¦W&òf–ÇW&W2÷6¶—3²†÷7FVB6ö×ÆWFRÆöw2fW&–f–VB6÷VçG2âvW0¦3“#C#s##sSFÂFWÆ÷’¦ö"ƒ#s3s3C#vÂ6ö×ÆWFVBÆÂFWÆ÷–ÖVçB7FW27V66W76gVÆÇ’à¥FVâg&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6S¢6†VÆÂ÷fW'6–öâÂ&÷F‚6†ævVB–çFW ¦÷væW'2Â&÷F‚&V6÷fW'’67&—G2Â–çBF&vWBÂ&÷Vv†æW72&W6÷W&6R÷ööÂæB×VÇF“ãà¤–æ—F–Â&VFWÆ÷–ÖVçB&WVW7G26W'fVC“ƒ²f–æÂ6ö×ÆWFRw&‚ÖF6†W3“’à¥6†VÆÂW6‚Æ6¶VB7&VFVçF–Ç3²6öææV7FVBv—BFFV&Æ–6F–öâW6VBW‡V7FVB×&VçBÀ¦æöâÖf÷&6VB&VbWFFRâæò&÷FV7FVBög&÷¦VâöÖöFVÆÆ–æröW‡÷'B÷&VæFW"6†ævW2à ¤ÆÂf÷W"6öçF–çV—G’f–ÆW2&R7W'&VçC²F†—2&ööb6†ævW2Fö72öæÇ’âW6W#“…50§&÷FV7FVBâã“’•BVæ6–Âöw&—66ÆRöæf–vF–öâöæF—fRÖÆ–v‡F–ær66WFæ6RVæF–æs°¦æò7GVÂ&VæFW&VB&ööb–æfW'&VBg&öÒæöFRFFW'2â&VG’f÷"†æG2Ööâ6†V6·2–à§F†—2'V–ÆBw2VçG'’âæW‡BÆ—BÖFW&–Â&Wf–WrF‡&÷Vv‚W†—7F–ær7W&f6RöÆ–fWF–ÖR÷væW"à  ¢22ã“#(	BÆ—B&÷Vv†æW72ÖFW&–Â&Wf–Wr(	B’ö7Fö&W"##` ¥W6W"ã“’52&÷FV7G2&÷Vv†æW73ó#SRVæ6–Â–çF–ærÂ6†ææVÂöw&—66ÆR&WFVçF–öâÀ¥VæFòõ&VFòÂ6fRô÷VâæBæF—fR6Öö÷F‚÷&÷Vv‚Ö†æFöfbâVF—Bf#vc“#†¢÷&–v–æÀ§–çB×F&vWB7W&f6R—2VæÆ—B&6–2Â&VæFW"ÖÖöFW2÷vç2W†—7F–ær7GVF–òö&6RÆ–v‡F–ærà¤W‡FVæB4ÔR–çB7W&f6RöÆ–fWF–ÖS²æòæWrÖW6‚Â&–67BÂ6†FW"ÂÆ–v‡B÷"†—7F÷'’÷væW"à¥–çB&Wf–Wr6VÆV7BöffW'26†ææVÂ†FVfVÇBÂ&W6W'f–æs“’’òÆ—BÖFW&–ÂâW†—7F–æp¥T’ö–çWB÷væW"6æ6VÇ27F—fR6öçF7B÷Æ6VÖVçBöâFövvÆS²æò66VæRö†—7F÷'’ÖWFFFà¤Æ—fR7FæF&BÖFW&–Â&V6V—fW27W'&VçBfÆGFVæVB6öÆ÷W"‡5$t"’æB&÷Vv†æW72†Æ–æV ¤æô6öÆ÷%76Rôr’Âf7F÷#öÖWFÆæW73÷v†—FR6öÆ÷W"âv÷&¶–ær&÷Vv†æW72&VG2&rWVÂÕ$t ¦'—FW2g&öÒ÷&–v–æÂ÷VR&7FW#²æòvÖÖöf7F÷"&¶RÂ&W6×Æ–ær÷"6÷W&6Rw&—FW2à¤F—'G’WFFW26öÆW66Rv—F‚÷&–v–æÂg&ÖRF–6³²FW‡GW&W2öÖFW&–Ç2&WW6VBVçF–ÂF—7÷6Rà ¤6öÖÖ—GFVBfÆ–B&÷Vv†æW72F—7Æ—2Æ—BgFW"FöæR÷&V'V–ÆB–â÷&–v–æÂ7GVF–òõ6öÆ–Bð¥Ub–ÖvRÖöFW2Â7F—fRæB–æ7F—fRöÆö6¶VBö&¦V7G2â66Æ"ÖöæÇ’W6W2æWWG&Âv†—FS°¦6öÆ÷W"ÖöæÇ’&VÖ–ç2÷&–v–æÂVæÆ—BV&æ6RVæÆW72W‡Æ–6—B–çBÆ—B&Wf–Wrà¤&÷F‚6†ææVÂ–FVçF—F–W2õUb&–æF–ær6†V6¶VBgFW"v—C²7FÆR66Æ"—2æ÷B6×ÆVBÀ§fÆ–B6öÆ÷W"6â&WF–â&6–2fÆÆ&6²âÖÆf÷&ÖVB66Æ"÷Vç7W÷'FVB÷væW'26fVÇ¦fÆÂ&6²Fò÷&–v–æÂ&öG“²7FÆR6öÆ÷W"÷"ÆÂ–çfÆ–B6†ææVÇ2F—7÷6R&Wf–Wrà¤W†—7F–ærF–væ÷7F–2ÖöFW26ÆV"F‡&÷Vv‚6ÖRÆ–fWF–ÖR÷væW"âÆÂ7W&f6RFW‡GW&W0¦&R&—fFVÇ’÷væVC²F—7÷6Röæ6Röâ&öG’öÖöFR÷6W76–öâÆ÷73²÷&–v–æÂ&öG’&W7F÷&VBà¤æöâ×7V&Sn(	3S"6öÖÖ—GFVBFFÖ2F—7Æ’v—F†÷WB&W6×Æ–ær†VF—F–æsS,+"'VÆP§&WF–æVB’âW†–Æ–'’Æ—BFW‡GW&W2WFòGvóS,+%$t$'VffW'2W"7W&f6RÂÇW2W†—7F–æp¦6†ææVÂ7W&f6RæBuR6÷–W3²æ÷BÖV7W&VBFWf–6R×W&f÷&Öæ6RöÖVÖ÷'’6Æ–Òà ¥6—‚fö7W6VB–çFVw&F–öâ6†V6·26÷fW"W†7BFF÷5$t"õUböÖFW&–Â6WGF–æw2æBÆ–fWF–ÖRÀ§66Æ"ÖöæÇ’ö6öÆ÷W"ÖöæÇ’÷7FÆRfÆÆ&6²Â7GVÂT’FövvÆRö6æ6VÂöF—'G’6öÆW66–ærÂÆ—fP¦6öÆ÷W"·66Æ"—6öÆF–öâö6†V6·ö–çB&öÆÆ&6²ö&öG’F—7÷6ÂÂ7–æ2÷&ö¦V7Bö†—7F÷'’æ@¦7GVÂ&VæFW"÷væW"7F—fRö–æ7F—fRöÖöFR&V†f–÷"âæöFRW6W2&VÂF‡&VRÖFW&–Ç2À¦vVöÖWG'’æB—†VÇ3²æòvV$tÂ&VæFW"Â†–v†Æ–v‡G2Â•BÆFVæ7’÷"æöÖB&—G’&ööbà¥6ÖR6÷W&6R&W6÷W&6W2÷&ö¦V7Gcbö''W6†W2öW‡÷'BÆv÷&—F†×2&WF–æVBâf÷W"6†ævV@§'VçF–ÖR÷væW'2ÇW2&V7W'6—fRW‡÷'BôÆ"66†Rw&ƒ²×VÇF“ãög&÷¦VâVæ6†ævVBà¥&VBFö72÷&÷Vv†æW72×&Wf–WrÓ“#æÖBâgVÆÂ&Vw&W76–öâ÷V&Æ–6F–öâWf–FVæ6R&VÆ÷rà ¤æW‡BDUd”4S¢&÷Vv†æW72(i"&Wf–WrÆ—BÖFW&–Ã²–çCF†Vã#SRÂ÷&&—B–â7GVF–òFð¦6ö×&R†–v†Æ–v‡G2â6†ææVÂ&WGW&ç2&WF–æVBw&—66ÆRÂÆ—B&WGW&ç26öÆ÷W"öÖFW&–Âà¤FöæR¶VW2Æ—B&÷Vv†æW73²6fRô÷VâæB6VÆV7BF–ffW&VçBö&¦V7B&WF–âV&æ6Rà¥VæFòõ&VFòæBGWÆ–6FR—6öÆF–öâ&VÖ–â&÷FV7FVBâW†—7F–æræò×&÷Vv†æW726öÆ÷W ¦ö&¦V7G2&WF–â÷&–v–æÂÆöö²âF†VâVF—B&VÖ–æ–ærÖFW&–Â6Æ÷G2Â7F'F–ærÖWFÆæW70§&W6÷W&6RöW‡÷'B÷&Wf–Wr÷væW'3²¶VW7FvW2æ'&÷ræBFFÖv&RÂæò&—G’6Æ–×2à ¢Ò·…Òã“’DUd”4R66Æ"7G&ö¶W2Â6†ææVÂ&WFVçF–öâÂ†—7F÷'’õ6fT÷VâæBæöÖBV&æ6S¢W6W"52â&÷FV7FVBà¢Ò·…Òã“#6—‚fö7W6VBFW7G3¢FW‡GW&R6VÖçF–72ÂÆ–fWF–ÖRÂÆ—fRT’ö6æ6VÂö6öÆW66–ærÀ¢6†ææVÂ—6öÆF–öâö6†V6·ö–çB&öÆÆ&6²Â†—7F÷'’÷&ö¦V7BæB&VÂ&VæFW"Ö÷væW"ÖöFW2à¢Ò·…Òã“#DUd”4RÆ—BÖFW&–Ãó#SR†–v†Æ–v‡G2VæFW"÷&&—C²6†ææVÂôÆ—B7v—F6‚&W6W'fW2Ö3¢W6W"53##bÓÓ’à¢Ò·…Òã“#DUd”4RFöæRõ6fT÷Vâö7F—f^(iF–æ7F—fRV&æ6RÂVæFõ&VFòæBGWÆ–6FR—6öÆF–öã¢W6W"53##bÓÓ’à ¢ã“#d”äÂÆö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£"Ãcb52òd”Âò6¶—VB¢¢à¥6—‚æWrfö7W6VB6†V6·2æBÆÂÆVv7’6VÖçF–7272â&Wf–WvVB6†VÆÂö66†RÖ6öçG&7@£U53²÷F†W"W‡÷'BôÆ"&VçBVF—G2fW&–f–VB–âÖöæÇ“²&÷FV7FVB×VÇF“ãög&÷¦Vâ–çF7Bà¤–æ—F–Â&W&F–öâ'Vâ6Vv‡Bâ–æ6÷'&V7BFV×÷&'’w&—FRF&vWBF†B&WÆ6VBF†P¦Æö6Â…DÔÂ6†VÆÂv—F‚66†RÖf—‡GW&R¥4ôââ&W7F÷&VB6†VÆÂg&öÒÖ–âÂÆ–VBöæÇ’&Wf–WvV@§–ç2öÖ&¶W'2Â6÷'&V7FVBf—‡GW&RFW7F–æF–öâÂF†Vâ&W&âF†RVçF—&Rf–æÂ7V—FR&÷fRà¤æòÖÆf÷&ÖVB6†VÆÂV&Æ—6†VBæBæò&V†f–÷"6†V6·2&VÆ†VBâV&Æ–6F–öâ&ööbföÆÆ÷w2à  ¢22ã“#V&Æ–6F–öâfW&–f–VB(	B’ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR#6SS#cf&6fcc#cSC&SVfV#sƒƒ#VSV6CCÂFW7FVBG&VP¦#&#“6C3SF&#6cF6C“SCFcC“S&#Fc–#SCfÂ—2V&Æ—6†VBâ6öææV7FVBv—BFF¦7&VFVBâ–FVçF–6ÂÆö6ÂFW7FVBG&VS²fWF6†VB÷&–v–âöÖ–âÖF6†VBW†7FÇ’à¤Æö6ÂæöFS#BæB†÷7FVB&Vw&W76–öâ3“#CSC#s“3vò¦ö"ƒ3csCc“f&÷F‚70£"ÃcbFW7G2Â¦W&òf–ÇW&W2÷6¶—2††÷7FVB6ö×ÆWFRÆöw2fW&–f–VB’âvW2'Và¦3“#CSC#sƒ†FWÆ÷’¦ö"ƒ3c#ƒ“v6ö×ÆWFVBÆÂFWÆ÷–ÖVçB7FW27V66W76gVÆÇ’à¤ÆÃ‚g&W6‚Æ—fR6†VÆÂ÷fW'6–öâÂf÷W"'VçF–ÖR÷væW'2Â6ö×ÆWFR6†ævVBW‡÷'BôÆ §&VçBw&‚Â&V6÷fW'’Â&÷FV7FVB×VÇF“ãÂ&WF–æVB&÷Vv†æW72&W6÷W&6R÷ööÂæ@§&ö¦V7B6öFV2f–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6Râ–æ—F–Â&VFWÆ÷–ÖVçB&VG26W'fVC““°¦f–æÂ6ö×ÆWFR6†V6¶VBw&‚ÖF6†W3“#âæòg&÷¦VâöÖöFVÆÆ–ærö''W6‚÷&ö¦V7BöW‡÷'@¦Æv÷&—F†Ò6†ævW2â6÷W&6R66Æ"'—FW2öFF6VÖçF–72&WF–æVC²æò7W7FöÒÆ–v‡G2à ¤ÆÂf÷W"6öçF–çV—G’Fö7VÖVçG2WFFVC²F†—2&ööb—2Fö72ÖöæÇ’âW6W#“•52&÷FV7FVC°£“#7GVÂ•B†–v†Æ–v‡G2öÖFW&–ÂV&æ6RöÆFVæ7’66WFæ6R&VÖ–ç2VæF–ærÀ¦æ÷BW7F&Æ—6†VB'’æöFRF‡&VRÖFW&–Â÷FW‡GW&RFW7G2â&VG’f÷"†æG2Ööâ–ç@¥&÷Vv†æW72(i"&Wf–WrÆ—BÖFW&–Ãó#SRö÷&&—BÂ6†ææVÂ&WGW&âÂFöæRõ6fT÷Vâ÷6VÆV7F–öà¦æBW†—7F–æræò×&÷Vv†æW726öÆ÷W"V&æ6RâæW‡B&VÖ–æ–ærÖFW&–Â×6Æ÷BVF—@¢„ÖWFÆæW726æF–FFR’föÆÆ÷w2FWf–6RfVVF&6²ÂF‡&÷Vv‚÷&–v–æÂ÷væW'2à  ¢22ã“#(	BÖWFÆæW72FF÷&ö¦V7Bf÷VæFF–öâf–6†&VB66Æ"÷væW'2(	B’ö7Fö&W"##` ¥W6W#“#52&÷FV7G2Æ—Bô6†ææVÂ&÷Vv†æW72&Wf–WrÂ†–v†Æ–v‡G2ÂFöæRõ6fT÷Vâ÷6VÆV7F–öà¦V&æ6RæB÷&–v–æÂ6öÆ÷W"ÖöæÇ’Æöö²âVF—BÖ–ãVFFcƒS¢–×÷'FVBäôÒôtÄ"ÖWFÆæW70§6Æ÷G2W†—7C²VF—F&ÆR&W6÷W&6R÷66VæRG&ç7÷'BFòæ÷BâW‡G&7BF†R66WFVC“r#€§fÆ–FF–öâö6æöæ–6Â'—FR6öFV2æBFVGW÷V÷F÷&VFV6öFRööÂ–çFò6†&VB66Æ ¦÷væW'3²W†—7F–ær&÷Vv†æW72’öFW67&—F÷"ö'—FR6W&–Æ—¦F–öâöW'&÷'2æCDÖ”"Væ—VRð£„Ö”"W‡æFVB'VFvWG2&WF–æVBâÖWFÆæW72W6W26W&FR7G&–7BÆ–æV"#‚FW67&—F÷"À£n(	3S"†W2ÂUb×cÖf—'7BÂ÷væVB6GW&W2Â&VBÖöæÇ’6öÖÖ—GFVB6†&–ærâæò$t"&ÆVæF–ærÀ¦æWr''W6‚ö¶W&æVÂö†—7F÷'’÷w&—FW"÷"ÖWFÆæW72T’÷&Wf–WrFVÆ—fW&VBà ¤W‡Æ–6—B66VæWcrôäÅ’v†VâÖWFÆæW72W†—7G3¢ÖæFF÷'—–çE&ö¦V7EfW'6–öã(	3bFVÆVvFW0¦W†—7F–ærVçfVÆ÷W2Â&÷Vv†æW77cb&WF–ç66öÆ÷W%–çEfW'6–öã(	3Râv—F†÷WBÖWFÆæW72÷&–v–æÀ¦ÆVv7’¥4ôâ÷fW'6–öâ&WF–æVBW†7FÇ’â–æFWVæFVçBÖWFÆæW72ööÃDÖ”"Væ—VRó„Ö” ¦W‡æFVBÂ÷&–v–æÃ3$Ö”"f–ÆRæB6öÆ÷W"÷&÷Vv†æW72'VFvWG2&WF–æVBâ6ö×ÆWFR&W6÷W&6Rð§&Vb÷66†VÖ÷6—¦R&VfÆ–v‡B&Vf÷&RÖW6‚7&VF–öã²6÷''WF–öâ÷V÷F÷Vç7W÷'FVB÷væW'0§&VgW6RFöÖ–6ÆÇ’âæF—fRUbVçfVÆ÷R&VÖ–ç2UbÖöæÇ’â÷&–v–æÂ†—7F÷'’6æ6†÷G2ð§&W7F÷&RöFDÖW6‚÷6–ævÆR´×VÇF’GWÆ–6FR6''’ÖWFÆæW72'’&VBÖöæÇ’&VfW&Væ6S²VF—G0§&WÆ6Râ÷&–v–æÂf–ÆR6fRô÷VâæB&VæFW"Öf–ÇW&R66VæRö†—7F÷'’&öÆÆ&6²&WF–æVBà¤¦ö–âöÆ–æ¶VB÷W&F–öç2æB&rö7–æ2ô$¢ôtÄ"ôäôÒW‡÷'G2&VgW6RÖWFÆæW72Ö&V&–æp¦ö&¦V7G2ÂWfVâÆöæw6–FR66WFVB6öÆ÷W"÷&÷Vv†æW72Â6òVæF–ær6†ææVÇ26ææ÷Bfæ—6‚à¤æò–×÷'FVBÖWFÆæW72W‡÷'B&V†f–÷"6†ævVC²æF—fR–çBW‡÷'BFFF–öâæW‡Bà ¥6—‚æWr–çFVw&F–öç26÷fW"6öFV2÷væW'6†—ö6†ææVÂ6W&F–öâÂÆÂ6—‚ÆVv7’f÷&ÖG2ð¦W†7B&VÖ÷fÂöFVGWÂ66†VÖ2÷&Vg2÷V÷F2ö÷væW"wV&G2Â7GVÂ†—7F÷'’·6–ævÆRô×VÇF¤GWÆ–6FRÂ7GVÂf–ÆR6fRô÷Vâö6÷''WB÷&VæFW"&öÆÆ&6²ÂÆÂw&—FW"ô¦ö–â&VgW6Ç2à¤W†—7F–æs“~(	3“#66Æ"÷–çB÷&Wf–WræV&'“#552â6ö×ÆWFR&Wf–WvVB&W6÷W&6Rö6öFV2ð¦ÖWFFFöW‡÷'B÷&VçBôÆ"w&ƒ“#²T’÷&VæFW"ö''W6‚Æv÷&—F†×2Væ6†ævVBâ×VÇF“ãÀ¦g&÷¦Vâ&WF2æBÖöFVÆÆ–ær¶W&æVÇ2VçF÷V6†VBâ&VBFö72öÖWFÆæW72×&W6÷W&6RÓ“#æÖBà¤gVÆÂ&Vw&W76–öâ÷V&Æ–6F–öâWf–FVæ6R&VÆ÷râæòæWrÖWFÆæW72FWf–6RfVGW&R–WBà ¤æòæWr†æG2ÖöâFW7BæVVFVBf÷#“#²W6W#“#52—2&÷FV7FVBâæWrf÷VæFF–öâf—‡GW&W0¦&RWFöÖFVBÂæWfW"7–çF†WF–2•BF6²âæW‡Bæ'&÷r'V–ÆC¢6GW&VBÖWFÆæW70§F‡&÷Vv‚W†—7F–ær66Æ"ärôäôÒôtÄ"ÖFW&–Â÷væW'2Â–æ6ÇVF–ær6öÖ&–æVB6öÆ÷W"°§&÷Vv†æW72¶ÖWFÆæW72–FVçF—F–W2ö7–æ26GW&RæBFF6VÖçF–72âF†Vâf—6–&ÆRVæ6–À¦6†ææVÂæBÆ—B&Wf–WrF‡&÷Vv‚W†—7F–ær6ö×7B–çBöÖFW&–Â÷væW'2à ¢Ò·…Ó“#DUd”4RÆ—Bô6†ææVÂV&æ6RæBFöæRõ6fT÷Vâ÷6VÆV7F–öã¢W6W%52&÷FV7FVBà¢Ò·…Ó“#6—‚WFöÖFVB–çFVw&F–öç3¢66Æ"'—FW2öÆVv7“(	3b÷cr66†VÖ2÷V÷F2À¢÷&–v–æÂ†—7F÷'’ôGWÆ–6FRôf–ÆR÷&öÆÆ&6²æBÆÂVç7W÷'FVBw&—FW"ô¦ö–â&VgW6Ç2à¢ÒæòæWs“#†æG2ÖöâvFR÷"ÖWFÆæW726öçG&öÇ3³“#V&æ6R66WFæ6R&÷FV7FVBà ¢ã“#f–æÂÆö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£"Ãc"52òd”Âò6¶—VB¢¢à¥6—‚æWr–çFVw&F–öç2²W†—7F–æs“~(	3“#æV&'“#553²&VÆV6R6öçG&7CU52à¤ÆÂ÷F†W"6†ævVB¥2&VçG2fW&–f–VB–âÖöæÇ“²&÷FV7FVB×VÇF“ãög&÷¦VâöÖöFVÆÆ–æp¦æBW†—7F–ær–çB÷&Wf–WröW‡÷'BÆv÷&—F†×2&WF–æVBâæò&V†f–÷"6†V6·2&VÆ†VBà¤æòæWr†æG2ÖöâvFS²W6W#“#52&÷FV7FVBâV&Æ–6F–öâfW&–f–6F–öâföÆÆ÷w2à  ¢22ã“#V&Æ–6F–öâfW&–f–VB(	B’ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR#Vc&V&FFVc&CF#FS#–fF#sCF&Cƒc&fÂFW7FVBG&VP¦cCv6c“&&#S#ƒfFVCSƒsFc“–c6#v6##Vc&Â—2V&Æ—6†VBâ6öææV7FVBv—BFF¦7&VFVBâ–FVçF–6ÂFW7FVBÆö6ÂG&VS²fWF6†VB÷&–v–âöÖ–âÖF6†VBW†7FÇ’à¤Æö6ÂæöFS#BæB†÷7FVB&Vw&W76–öâ3“#CƒsC“Vò¦ö"ƒCCs““ƒV&÷F‚70£"Ãc"FW7G2v—F‚¦W&òf–ÇW&W2÷6¶—3²†÷7FVBgVÆÂÆöw2fW&–f–VBâvW2'Và¦3“#CƒsCƒ6ÂFWÆ÷’¦ö"ƒCSS##cFÂ6ö×ÆWFVBÆÂ7FW27V66W76gVÆÇ’à¤ÆÃ36†V6¶VBÆ—fRf–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6S¢6†VÆÂ÷fW'6–öâÂWfW'’6†ævV@§'VçF–ÖR÷&VçBôÆ"f–ÆRÂf÷W"æWr66Æ"ÖöGVÆW2Â&V6÷fW'’Â&÷FV7FVB×VÇF“ãæ@§&WF–æVB6öÆ÷W"ööÂâ–æ—F–Â–âÖfÆ–v‡B&VG26W'fVC“#öæWrÖöGVÆW3CC²f–æÂv†öÆP¦6†V6¶VBw&‚ÖF6†W3“#âæò&÷FV7FVBög&÷¦VâöÖöFVÆÆ–ærö''W6‚÷&Wf–WrÆv÷&—F†Ò6†ævW2à ¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçC²F†—2&ööb6†ævW2Fö72öæÇ’âW6W#“#52&÷FV7G0¦W†—7F–ærÆ—B&÷Vv†æW72ô6†ææVÂôFöæRõ6fT÷Vâ÷6VÆV7F–öâö6öÆ÷W"V&æ6Râ'V–ÆC“#—0¦6ö×ÆWFS²æòæWr†æG2ÖöâFW7BæVVFVB&V6W6RÖWFÆæW726öçG&öÇ2÷&Wf–WröW‡÷'B&P¦æ÷BW‡÷6VB–WBâf—‡GW&RG&ç7÷'Bö†—7F÷'’öFöÖ–2÷VâæB&VgW6Â6†V6·2&RWFöÖFVBà¤æW‡Bæ'&÷r'V–ÆC¢6GW&VBÖWFÆæW72F‡&÷Vv‚÷&–v–æÂ66Æ"ärôäôÒôtÄ"w&—FW'2À§F†Vâ÷&–v–æÂ–çB6†ææVÂöÖFW&–Â&Wf–WrâæòÖWFÆæW72f—7VÂ66WFæ6R6Æ–ÖVBà  ¢22ã“#"(	BÖWFÆæW72W‡÷'BF‡&÷Vv‚÷&–v–æÂäôÒôtÄ"÷væW'2(	B#ö7Fö&W"##` ¤6öçF–çVRWF†÷&—¦VC“#f÷VæFF–öã²æòæWrFWf–6R52–æfW'&VBâW6W#“#52&VÖ–ç0§&÷FV7FVBf÷"–çBöÆ—B&÷Vv†æW72ô6†ææVÂö†—7F÷'’õ6fT÷Vâ÷6VÆV7F–öâö6öÆ÷W"ÖöæÇ’Æöö²à¤VF—BÖ–ã&3C3ƒ3Cƒ¢W†—7F–æræF—fRÖWFÆæW726Æ÷BÂ66Æ"ärÂ–çB6GW&RæBtÄ ¦ÖFW&–ÂF6‚÷vâ&WV—&VBG&ç7÷'BâW‡FVæBF†W6R÷væW'3²æòæWrw&—FW"Â66†VÖÀ¦ÖWFFF&÷fVææ6RÂ†—7F÷'’ÂÖöFVÆÆ–ær÷–çB¶W&æVÂ÷"T’6öçG&öÇ2à ¤6GW&R÷væVBÖWFÆæW72Æöæw6–FR6öÆ÷W"÷&÷Vv†æW72övVöÖWG'’öæF—fRUg2$Tdõ$Rv—C°¦÷&–v–æÂ&6RF&vWBF–vW7BfÆ–FFW2ÆÂ6†ææVÇ2âæF—fRÖWFÆæW72W6W2÷&–v–æÀ¦Æ÷76ÆW72w&—66ÆUär²ÖWFÆæW726Æ÷Böf7F÷#²&÷Vv†æW72f7F÷#öFVfVÇC&WF–æVBà¤÷&–v–æÂæÖW2ö6öçFVçBFVGW÷öÇ–vöâUbööÂö6öçF–æW"ó#DÖ”"vw&VvFR'VFvWB&VÖ–âà¤tÄ"W6W26¶VB$t"FFärs×&÷Vv†æW72†÷##SR’Â#ÖÖWFÆæW72Â#Ó#SRÂf7F÷'3²öæÇ§&÷Vv†æW72&WF–ç266WFVBw&—66ÆRäröÖWFÆÆ–4f7F÷#â6ÖRär$t"öf–ÇFW"ô5$2÷¦Æ– §6¶vW"vWG2W‡Æ–6—BæòÖ6öÆ÷W"ÖÖWFFFF‚Âæ÷B6çf2övÖÖ÷&W6×ÆRVæ6öFW"à¥6¶VB—"66†RÇW2÷&–v–æÂ6öÆ÷W"–ÖvR66†RæBgVÆÂÖFW&–Â¶W’F—7F–æwV—6€¦ÆÂ6öÆ÷W"÷&÷Vv†æW72öÖWFÆæW726öÖ&–æF–öç3²6†&VBW†7B&W6÷W&6R—'2&WW6R–ÖvW2à¤'6VçB6öÆ÷W"&VÖ–ç2v†—FRâ–æFWVæFVçBæöâ×7V&RÖ2&VÖ–âW†7B–âäôÓ²tÄ §&WV—&W2ÖF6†–ær&÷Vv†æW72öÖWFÆæW72F–ÖVç6–öç2æB&VgW6W2&F†W"F†â&W6—¦–ærà¤æWrFF&÷w2&VÖ–âUb×cÖf—'7BÂæòf7F÷"&¶–ær÷"5$t"ÖWFFFöâ66Æ"FFà ¤÷&–v–æÂf–ÆR7F–öç2&W÷'BÖWFÆæW726÷VçG2â&rô$¢÷Vç&W&VB7–æ2æF—fRô¦ö–à§7F–ÆÂ&VgW6RÖWFÆæW73²–çfÆ–BFW67&—F÷"÷7FÆR&–æF–æröWfÇVFVBö–×÷'FVBöÆ–æ¶V@¦÷væW'2&VgW6Râ7–æ2F÷væÆöB6GW&W2æWfW"76–vâÖ2Fò6÷W&6R66VæR÷"æF—fP¥UbÖWFFFâ&W6÷W&6R÷&ö¦V7Gcrö†—7F÷'’ö''W6‚õT’öÆ—B&Wf–WrÆv÷&—F†×2Væ6†ævVBà¤6ö×ÆWFR6†ævVBäröW‡÷'B÷&VçBôÆ"w&ƒ“#"öæÇ“²×VÇF“ãög&÷¦VâVæ6†ævVBà¤öÆC“#7–æ2&Ææ¶WB×&VgW6Â76W'F–öç2æ÷r6†V6²7FÆR&–æF–æs²&rwV&G2&WF–æVBà ¤V–v‡BæWr–çFVw&F–öâFW7G26÷fW"7GVÂäôÒôtÄ"W‡÷'B¶ÆöFW"æBf–ÆR7F–öç2À¦–æFWVæFVçBär5$2÷¦Æ–"ö6†ææVÂ'—FW2Â6öÖ&–æF–öç2öFVGWÂÖWFÂÖöæÇ’FVfVÇG2À§VæWVÂ×6—¦R&VgW6ÂôäôÒ&WFVçF–öâÂ7–æ26æ6†÷G2Â–çfÆ–B÷væW'2Â÷&–v–æÂæF—fP£#DÖ”"&VfÆ–v‡BäBf–æÂw&—FW"6ÂärFF×g2Ö6öÆ÷W"ÖWFFFö÷væW'6†—à¤æF—fRw&—FW"'VFvWBFW7B–×÷'G2—G25ETÂfW'6–öæVB–çBÖW‡÷'BFWVæFVæ7“ §&W&VBvV´Ö2&RÖöGVÆRÖÆö6ÂÂ6òâVçfW'6–öæVBæöFR†VÇW"6ææ÷B&W&P¦æ÷F†W"fW'6–öæVBÖöGVÆRw2w&—FW"âf—'7Bf—‡GW&RGFV×B†—BF†R–çFVæFVB&rwV&C°¦6÷'&V7FVBFW7Bv—&–ærÂæ÷BF†R'VçF–ÖRwV&Bâ&VBFö72öÖWFÆæW72ÖW‡÷'BÓ“#"æÖBà¤gVÆÂ&Vw&W76–öâ÷V&Æ–6F–öâWf–FVæ6R&VÆ÷s²æò&VæFW&W"ôæöÖBV&æ6R66WFæ6P¦–æfW'&VBg&öÒæöFRFFW'2âæòæWr†æG2ÖöâFW7BæVVFVC¢ÖWFÆæW72†2æò6öçG&öÇ0§–WBâæW‡B÷&–v–æÂVæ6–Â66Æ"6†ææVÂ²ÖFW&–Â&Wf–Wr–çFVw&F–öâ–âæ'&÷p§7FvW2Â&W6W'f–ærW†—7F–ær6öÆ÷W"÷&÷Vv†æW72æB–æFWVæFVçB&W6÷W&6R6VÖçF–72à ¢Ò·…Ó“#"V–v‡B–çFVw&F–öç3¢W†7BæF—fRôtÄ"rô"ÂÆÂÖ6†ææVÂÖFW&–Ç2öFVGWÀ¢ÖWFÂÖöæÇ’FVfVÇG2ÂVæWVÂF–×2Â7–æ26GW&RÂ–çfÆ–B÷væW'2Âf–ÆRF÷væÆöG2À¢æò5$t"öâFFäw2æB÷&–v–æÂæF—fS#DÖ”"62à¢Ò·…Ó“#&rô$¢÷Vç&W&VBæF—fRô¦ö–âwV&G2&WF–æVC²7–æ27FÆRÖ&–æF–ærFW7G2WFFVBf÷#“#"6&–Æ—G’à¢ÒæòæWs“#"FWf–6RF6³¢ÖWFÆæW726öçG&öÇ2VæF–æs²W6W#“#52&VÖ–ç2&÷FV7FVBà ¢ã“#"f–æÂÆö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£"Ãc#52òd”Âò6¶—VB¢¢à¤V–v‡BæWr–çFVw&F–öç2æBÆÂW†—7F–ær–çB÷&Wf–WröÖöFVÆÆ–ærö–×÷'BöW‡÷'B6†V6·0§73²&Wf–WvVB&VÆV6R6öçG&7CU52âärFFÖWFFFF‚&W6W'fW2öÆB6öÆ÷W"ð§66Æ"6VÖçF–73²6÷W&6R&W6÷W&6R÷&ö¦V7Bö†—7F÷'’õT’Æv÷&—F†×2æB×VÇF’ög&÷¦Và§Væ6†ævVBâæò76W'F–öç2W†6ÇVFVC²öÆB7–æ2&VgW6ÂWw&FVBFò&–æF–ær6öçG&7Bà¤æòæWr†æG2ÖöâvFS²V&Æ—6†–ærfW&–f–6F–öâföÆÆ÷w2à  ¢22ã“#"V&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRSSSSS3–C6S“sƒ–FS“V3f#–C†#ƒcFvV##vÂFW7FVBG&VP¦#ƒƒcCVFS“#S&6ccC3c3cƒ#6ccs†&3“VÂ—2V&Æ—6†VBâ6öææV7FVBv—BFF¦7&VFVBâ–FVçF–6ÂFW7FVBÆö6ÂG&VS²fWF6†VB÷&–v–âöÖ–âÖF6†VBW†7FÇ’à¤Æö6ÂæöFS#BæB†÷7FVB&Vw&W76–öâ3“33S“s“sCFò¦ö"ƒ3CSCcc&&÷F‚70£"Ãc#FW7G2Â¦W&òf–ÇW&W2÷6¶—3²6ö×ÆWFR†÷7FVBÆöw2fW&–f–VB6÷VçG2âvW0¦3“33S“sƒCÂFWÆ÷’¦ö"ƒ3CScsCCfÂ6ö×ÆWFVBÆÂ7FW27V66W76gVÆÇ’à¤ÆÃ‚6†V6¶VBg&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚6÷W&6S¢6†VÆÂ÷fW'6–öâÂÆÂf—fR6†ævV@¦W‡÷'Bõär'VçF–ÖR÷væW'2æBÆ"&VçG2Â&V6÷fW'’Â&÷FV7FVB×VÇF“ãæB&WF–æV@§66Æ"&W6÷W&6W2÷&ö¦V7B6öFV2÷–çFW"T’ö6÷&R÷–çBF&vWBâ–æ—F–Â–âÖfÆ–v‡B&VG0§6W'fVC“#²f–æÂ6ö×ÆWFR6†V6¶VBw&‚ÖF6†W3“#"âæòg&÷¦VâöÖöFVÆÆ–ærö''W6‚ð§&ö¦V7Bö†—7F÷'’÷&Wf–WrÆv÷&—F†×26†ævVC²6ÖRæF—fR–ÖvR'VFvWBæB&rwV&G2à ¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçC²F†—2&ööb—2Fö72ÖöæÇ’â'V–ÆC“#"6ö×ÆWFRæ@§V&Æ—6†VBâæòæWr†æG2ÖöâFW7BæVVFVC¢VF—F&ÆRÖWFÆæW726öçG&öÇ2÷&Wf–Wr&VÖ–à¦æW‡C²W‡÷'Bf—‡GW&W2æB7GVÂf–ÆR7F–öç2&RWFöÖFVBÂæò&VæFW&VBöæF—fP¦V&æ6R66WFæ6R–æfW'&VBâW6W#“#52&VÖ–ç2&÷FV7FVC²æó“#ó“#"FWf–6U50¦–çfVçFVBâæW‡B÷&–v–æÂ66Æ"Væ6–Â6†ææVÂÂF†VâW†—7F–ærÖFW&–Â&Wf–Wr÷væW"à ¢22ã“#2(	BÖWFÆæW72Væ6–Â6†ææVÂæBW†—7F–ærÆ—BÖFW&–Â&Wf–Wr(	B#ö7Fö&W"##` ¤VF—BÖ–âc&63†3‚òã“##¢66Æ"&W6÷W&6W2Â6öFV2ö†—7F÷'’öGWÆ–6FRæBæF—fRôtÄ §w&—FW'2Ç&VG’W†—7C²W‡÷6RF†VÒF‡&÷Vv‚÷&–v–æÂ6ö×7BÄTeB–çBæB7W&f6P¦÷væW'2â6†&VB66Æ"6öæf–wW&F–öâ&WW6W266WFVB&7FW"ÂV÷Fö6†V6·ö–çBæ@¦6æ6VÆÆF–öâF‡2âÖWFÆæW727F'G2&Æ6³Â''W6‚FVfVÇG3#SS²÷VR&rWVÂÕ$t §v÷&¶–ær'—FW2V&Æ—6‚–æFWVæFVçBÆ–æV"#‚öæÇ’â6öÆ÷W"öÖ6·2ö–ÖvW27F’F—6&ÆV@§v†–ÆRVF—F–ærV—F†W"66Æ#²&WGW&æ–ær6öÆ÷W"&W7F÷&W2W†—7F–ær6öçG&öÇ2öÆ–W'2à¤æöãS"&WF–æVBÖ2&VgW6R–çF–ær&F†W"F†â&W6×Æ–ærâÆÂ–FVçF—G’ö&–æF–ærÀ¦&öG’Æ–fWF–ÖRÂ'VFvWBæB6†V6·ö–çB&VgW6Â'VÆW2&WF–æVBà ¤W†—7F–ær7W&f6R÷vç26W&FRÆ–æV"&÷Vv†æW72ræBÖWFÆæW72"FW‡GW&W3²ÖWFÀ¦f7F÷#v—F‚ÖÂFVfVÇC÷F†W'v—6RâW†—7F–ærÆ–v‡F–ærõUg2ö6öÆ÷W"5$t"&VÖ–âà¤Æ—fRF—'G’WÆöG26öÆW66S²7v—F6†–ær6†ææVÂôÆ—B÷"66Æ'26æ6VÇ26öçF7Bv—F†÷W@¦†—7F÷'’â6öÖÖ—GFVB7F—fRö–æ7F—fRöÆö6¶VB÷fW&Æ—2W6R6ÖR÷væW#²F—7÷6Âg&VW2Ö2à¤æòæWr''W6‚ö¶W&æVÂ÷w&—FW"ö†—7F÷'’÷væW"ÂÆ–v‡G2ÂVçf—&öæÖVçBÂ÷"ÖöFVÆÆ–ær6†ævW2à¥&WfW'6RÆöFW"ö66†Rw&‚&Wf–WvVBæB–ææVC“#3²&÷FV7FVB×VÇF“ãög&÷¦Vâ–çF7Bà£2æWr–çFVw&F–öç26÷fW"T’÷&só#SRö÷6—G’öæòÖ÷Â6æ6VÆÆF–öâÂV÷Fö6†V6·ö–çBÀ¦–FVçF—G’÷7FÆRöæöãS"Â†—7F÷'’õ6fT÷Vâ÷6–ævÆR´×VÇF’GWÆ–6FRÂ7GVÂäôÒôtÄ"'—FW2À¦Æ–æV""ÖFW&–ÂÂÖ–æFWVæFVæ6RöÆ–fWF–ÖRæB7F—fRö–æ7F—fR&VæFW"÷væW'6†—à¤W†—7F–ær&÷Vv†æW72öÖ6²æV&'“•52â&VBFö72öÖWFÆæW72×–çBÓ“#2æÖBà ¥W6W#“#52&VÖ–ç2&÷FV7FVC²öæW‡F'V–ÆBÆöæR—2æ÷C“#ó“#"ó“#2FWf–6R66WFæ6Rà¤DUd”4S“#3¢ÖWFÆæW73ó#SR6†ææVÂôÆ—BÂÆ÷r&÷Vv†æW72†–v†Æ–v‡G2Â–æFWVæFVçB6†ææVÇ2À¤FöæRõ6fT÷VâÂVæFõ&VFòæBGWÆ–6FR—6öÆF–öã²æF—fRæöÖBÖFW&–Â6æ—G’6†V6²à¤æW‡C¢&W7öæBæ'&÷vÇ’Fó“#2FWf–6RfVVF&6²&Vf÷&RFF–ærÖ÷&RÖFW&–Â6†ææVÇ2à ¢ã“#2Æö6ÂfÆ–FF–öã¢æöFS#Bã’ãgVÆÂ¢£"Ãc3252òd”Âò6¶—VB¢£°£2æWr–çFVw&F–öç2ÂæV&'’&÷Vv†æW72öÖ6³•52æB&VÆV6R6öçG&7CU52à¤æòW†—7F–ær76W'F–öç2&VÆ†VC²&÷FV7FVB×VÇF“ãög&÷¦VâöÖöFVÆÆ–ærVæ6†ævVBà¥V&Æ–6F–öâö†÷7FVB&Vw&W76–öâöÆ—fRÖ'—FRfW&–f–6F–öâföÆÆ÷w2âFWf–6S“#2VæF–ærà ¢22ã“#2V&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRSSVc#3#ƒSfvCcSƒ3c†FSvcv6c#–SCV63SFFÂFW7FVBG&VP¦3C&3F6#ƒ&“†#“V&fScVcf&66F333sSvÂ—2V&Æ—6†VBâ6öææV7FVBv—BFF¦7&VFVBF†R–FVçF–6ÂFW7FVBÆö6ÂG&VS²fWF6†VB÷&–v–âöÖ–âÖF6†VBW†7FÇ’à¤Æö6ÂæöFS#BæB†÷7FVB&Vw&W76–öâ3“33sƒccS–ò¦ö"ƒ3C“C“#ƒf&÷F‚70£"Ãc32FW7G2Â¦W&òf–ÇW&W2÷6¶—3²6ö×ÆWFR†÷7FVBÆöw2fW&–f–VBâvW2'Và¦3“33sƒcsFÂFWÆ÷’¦ö"ƒ3C“c“ƒCSÂ6ö×ÆWFVBÆÂ7FW27V66W76gVÆÇ’à¤ÆÃ’g&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚6÷W&6S¢6†VÆÂ÷fW'6–öâÂWfW'’6†ævVB'VçF–ÖRð¦W‡÷'B÷&VçBôÆ"f–ÆRÂ&V6÷fW'’Â&÷FV7FVB×VÇF“ãÂ&WF–æVB66Æ"&W6÷W&6W2ð¦ÖWFÆæW72ööÂæB&ö¦V7B6öFV2â–æ—F–Â–âÖfÆ–v‡B&VG26W'fVC“##²f–æÂ6ö×ÆWFP¦6†V6¶VBw&‚ÖF6†W3“#2âæòg&÷¦VâöÖöFVÆÆ–æröÆ–v‡F–ærõUb÷"w&—FW"Æv÷&—F†Ò6†ævW2à ¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçC²F†—2&ööb—2Fö72ÖöæÇ’â'V–ÆC“#26ö×ÆWFRæ@§&VG’f÷"†æG2ÖöâÖWFÆæW73ó#SR6†ææVÂôÆ—BÂÆ÷r&÷Vv†æW72†–v†Æ–v‡G2æB–æFWVæFVç@¦6†ææVÇ2ÂFöæRõ6fT÷VâÂVæFõ&VFòæBGWÆ–6FR—6öÆF–öââ÷F–öæÂæF—fRæöÖ@¦V&æ6R6æ—G’6†V6²â7GVÂuR†–v†Æ–v‡G2õVæ6–ÂÆFVæ7’æC“#2FWf–6R66WFæ6P§&VÖ–âVæF–æs²W6W#“#52&÷FV7FVBÂæó“#ó“#"ó“#2FWf–6U52–æfW'&VBà¤æW‡C¢&W7öæBæ'&÷vÇ’Fó“#2FWf–6RfVVF&6²&Vf÷&Ræ÷F†W"ÖFW&–Â6†ææVÂà ¢22ã“#B(	BUbv÷&·76RÆ–W'26öçF–æVB&VæVF‚Ö–âFööÆ&"(	B#ö7Fö&W"##` ¥W6W"&W÷'G2–çFW&Ö—GFVçBÖ—76–ærDõÕ$”t…BÔ”â'WGFöç2GW&–ærUbVF—F÷#°¦6Æ&–f–VBF†W6R&Rg&ÖRõVæFõ&VFòôfö7W2ôö&¦V7G2õd”UrÂæ÷BUbÖÆö6Â6öçG&öÇ2à¤VF—BÖ–ãSS6&c¢æòUb7F–öâFVÆ–&W&FVÇ’†–FW2F†RFööÆ&"â†VFW"7F6¶–æp¦6öçFW‡B—3²f–Ww÷'B†Bæò7F6¶–ær6öçFW‡BÂÆÆ÷v–ærv÷&·76SƒFò÷fW'–ç@¦†VFW"FW66VæFçG2†–æ6ÇVF–ærd”UrG&÷F÷vã#G&VB–ç6–FR†VFW#’à¤FBöæR7F—fRÕUbÖöæÇ’—6öÆF–öâ'VÆR–â÷&–v–æÂWb×v÷&·76R7G–ÆW6†VWC¢f–Ww÷'@¦6öçF–ç2—G2÷vâÆ–W'2v†–ÆRf—6–&ÆRv÷&·76RW†—7G2â÷&–v–æÂ†VFW"&VÖ–ç0¦&÷fR—C²6Æ÷6–ærö†–F–ærUbWFöÖF–6ÆÇ’&VÖ÷fW26öçF–æÖVçBâæò¢Ö–æFW‚&×2&6RÀ¤DôÒ&WÆ6VÖVçBÂWfVçB÷ö–çFW"ö†—7F÷'’öÖöFVÂõUb÷–çBÆv÷&—F†Ò6†ævW2â&Vg&W6€¥Ubv÷&·76R²ÖW6‚†VÇF‚ÆöFW"æB6†VÆÂ÷&V6÷fW'““#C²Vç&VÆFVB–ç2&WF–æVBà ¥6÷W&6RÆ–W&–ærFVfV7B–FVçF–f–VC²W†7B–çFW&Ö—GFVçB•B'WGFöâF—6V&æ6P¦æ÷B&W&öGV6VBâ6Æ÷VBÖ–âvV$tÂ7&VF–öâf–Ç2‡6ÖR¶æ÷vâVçf—&öæÖVçBÆ–Ö—FF–öâ’À§6òæògVÆÂÖ&VæFW&VB66WFæ6R6Æ–ÖVBâ7–çF†WF–2FFÕU$ÂÆ–÷WBW‡W&–ÖVç@¦&Æö6¶VB'’'&÷w6W"U$ÂöÆ–7“²æòv÷&¶&÷VæBGFV×FVBâæV&'’v÷&·76Ræf–vF–öâð¦†—7F÷'’öÆ–fWF–ÖRö&6¶w&÷VæBôfö7W2²&VÆV6S#52â–æ—F–Â&W6öçG&7B6Vv‡Bà¦÷fW"Ö'&öB6†VÆÂ–â&WÆ6VÖVçC²&W7F÷&VBVç&VÆFVB–ç2&Vf÷&Rf–æÂfÆ–FF–öâà¤æòFW7G2vV¶VæVBÂæòW6W#“#552–æfW'&VC²W6W#“#52æB&÷FV7FVB×VÇF“ãög&÷¦Và§&VÖ–ââDUd”4S¢&WVFVFÇ’VçFW"öW†—BUbÂâ÷–æ6‚öVF—BõVæFõ&VFòÂ6†V6²F÷×&–v‡@¦'WGFöç2æBd”UrG&÷F÷vâv†–ÆR–ç6–FRUbæBgFW"&6²Fó4Bâ–bF—6V&æ6P§W'6—7G2Âö'F–â67&VVç6†÷BæBW†7BG&–vvW"&Vf÷&RÖ÷&R&W6VçFF–öâ6†ævW2à¤ÖWFÆæW73“#2FWf–6RvFR7F–ÆÂVæF–ærâæW‡C£“#BFWf–6RfVVF&6²Âæ'&÷r&W—"öæÇ’à ¢ã“#Bf–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£"Ãc3252òd”Âò6¶—VB¢£°¦æV&'’Ub÷v÷&·76Rö†—7F÷'’ôfö7W2ö&6¶w&÷VæB÷&VÆV6S#52âf–æÂ6÷W&6R6öçF–ç0¦öæÇ’7F—fRÕUb—6öÆF–öâ²&Wf–WvVBÆöFW"÷&VÆV6R–ç3²æò76W'F–öç2&VÆ†VBà¤æò&VæFW&VBöFWf–6RF—6V&æ6R66WFæ6R–æfW'&VC²V&Æ–6F–öâ&ööbföÆÆ÷w2à ¢22ã“#BV&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR“vFC–S†S†&&3s#cf#“S3“6VV33ƒ†F3#cFÂFW7FVBG&VP¦C6SVƒ#S6cƒ#&C“3SFcSFCCV#c–c&#“vcfÂ—2V&Æ—6†VBâ6öææV7FVBv—BFF¦7&VFVBF†R–FVçF–6ÂFW7FVBÆö6ÂG&VS²fWF6†VB÷&–v–âöÖ–âÖF6†VBW†7FÇ’à¤Æö6ÂæöFS#BæB†÷7FVB&Vw&W76–öâ3“33ƒƒs33sFò¦ö"ƒ3SSCcS†&÷F‚70£"Ãc32FW7G2Â¦W&òf–ÇW&W2÷6¶—3²6ö×ÆWFR†÷7FVBÆöw2fW&–f–VBâvW0¦3“33ƒƒs#CSFÂFWÆ÷’¦ö"ƒ3SS3sSc6Â6ö×ÆWFVBÆÂ7FW27V66W76gVÆÇ’à¤ÆÃbg&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚6÷W&6S¢6†VÆÂ÷fW'6–öâÂUbv÷&·76RôÖW6‚†VÇF€¦ÆöFW"Â&V6÷fW'’Â&÷FV7FVB×VÇF“ãÂ÷&–v–æÂ†VFW"÷FööÆ&"÷f–Wr552æB÷væW'2À§–çFW"Â&WF–æVB66Æ"&W6÷W&6W2÷ööÂæB&ö¦V7B6öFV2â–æ—F–Â–âÖfÆ–v‡B&VG0§6W'fVC“#3²f–æÂ6†V6¶VBw&‚ÖF6†W3“#BâæòUböÖöFVÂ÷–çBö†—7F÷'’ö–çWBÆv÷&—F†Ð¦6†ævW3²öæÇ’öæR7F—fRÕUb552'VÆRæB&Wf–WvVB&VÆV6Rö66†R&VfW&Væ6W2à ¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçC²F†—2&ööb—2Fö72ÖöæÇ’â'V–ÆC“#B6ö×ÆWFRæ@§&VG’f÷"•B&WFW7C¢&WVFVFÇ’VçFW"UbVF—F÷"Ââ÷–æ6‚öVF—Bö†—7F÷'’ÂW6Rd”UrÀ§F†Vâ&6²Fó4C²6öæf—&ÒÖ–âF÷×&–v‡B'WGFöç2&VÖ–âf—6–&ÆRæBW6&ÆRâ6÷W&6P¦Æ–W&–ær—77VR&W—&VC²W†7B–çFW&Ö—GFVçB6f&’F—6V&æ6R7F–ÆÂæVVG2F†—0¦FWf–6R6öæf—&ÖF–öââ6Æ÷VBÖ–âvV$tÂVæf–Æ&ÆRÂæògVÆÂÖ&VæFW&VB&ööbà¤–b—BW'6—7G2ö'F–â67&VVç6†÷BæBW†7BG&–vvW"&Vf÷&RgW'F†W"T’6†ævW2à¥W6W#“#52&÷FV7FVC³“#2ÖWFÆæW72FWf–6RvFR7F–ÆÂVæF–ærÂæò–æfW'&VB52à ¢22FWf–6RfVVF&6²(	Bã“#BFööÆ&"53²ÖWFÆæW72d”Â(	B#ö7Fö&W"##` ¥W6W#¢(	Å52f÷"F†Rf—‚î(	Ò&÷FV7Bã“#BÖ–âF÷×&–v‡BFööÆ&"f—6–&–Æ—G’F‡&÷Vv‚U`¤VF—F÷#²¶VW7F—fRÕUbf–Ww÷'B—6öÆF–öâæB÷&–v–æÂ†VFW"ö7F–öâ÷væW'2–çF7Bà ¤ÖWFÆæW72—2äõB66WFVC¢W6W"&W÷'G2v†öÆRÖöFVÂ&Æ6²–â6†ææVÂÂv†—FRG&w0¦&Æ6²ò&Æ6²G&w2v†—FRÂÆ—B–çG2&Æ6²ÂæBæòÖWFÂ6†ææVÂ–âW‡÷'Bà¥G&VBÆÂ&W÷'FVB7–×Fö×22â÷VâFWf–6Rf–ÇW&S²Fòæ÷B–æfW"ÖWFÆæW7250¦g&öÒF†R6W&FRFööÆ&"66WFæ6Râæò7V7VÆF—fR–çfW'6–öâ÷"&W6÷W&6RÖ–w&F–öâà ¤VF—B7W'&VçC–CCVc3¢6Æ–FW"f÷'v&G2–çFVvW#(	3#SRF—&V7FÇ“²66Æ"&7FW"V&Æ—6†W0§&r#‚–æFWVæFVçBöb6öÆ÷W#²6†ææVÂW6W2w&—66ÆS²Æ—B6×ÆW2"v—F‚f7F÷#°¦W†—7F–æræF—fR6Æ÷BæBtÄ"6¶VB"&V6V—fR6GW&VBÖWFÆæW72â&W'Vâ7GVÂT’ð§–çFW"ö†—7F÷'’öGWÆ–6FR÷&Wf–WröW‡÷'B7V—FW3£#52ód”Âó6¶—âF†÷6Rf—‡GW&W0§w&—FS#SRv†—FRó&Æ6²æB6öçF–âW†7BÖWFÆæW72–âäôÒôtÄ"Â6òF†W’FòäõB–W@§&W&öGV6RW6W"f–ÇW&RâÆ—BÖFW&–Â÷66VæR†fRæò&VfÆV7F–öâVçf—&öæÖVçC²÷76–&ÆP¦F&²ÖÖWFÂV&æ6R6öçG&–'WF÷"ÂäõB6öæf—&ÖVBF–væ÷6—2öbÆÂ7–×Fö×2à¤6Æ÷VBuRÆ–Ö—FF–öâ7F–ÆÂ&WfVçG2&VæFW&VBÖFWf–6R&W&öGV7F–öâà ¤æW‡B&WV—&VBWf–FVæ6S¢ffV7FVBæ&÷†Æ"&ö¦V7BæB—G2W‡÷'FVBææöÒÂÇW267&VVç6†÷@§v—F‚6†ææVÂõ&Wf–Wr6VÆV7F÷"æBfÇVRf—6–&ÆRâG&6RW†7BWF†÷&VB'—FW2ö&–æF–ærÀ¦7GVÂW‡÷'FVB6Æ÷Böf7F÷'2æBF—7Æ–VB&Wf–Wr&Vf÷&R6†æv–ær6Æ–FW"6VÖçF–72à¤Fòæ÷BF—6Ö—72&W÷'B&V6W6Rf—‡GW&W272â¶VW÷&–v–æÂ÷væW'3²æò&ÆÆVÂÖFW&–À¦÷"''W6‚–×ÆVÖVçFF–öââ'VçF–ÖR&VÖ–ç3“#BÂæòæWr'V–ÆB÷"æWrÖçVÂvFR–WBà ¢22ã“#R(	B–çFVBÖWFÂÆ—B&Wf–Wr&VfÆV7F–öâ–çWB(	B#ö7Fö&W"##` ¥W6W"6Æ&–f–VBv—Fƒ“#B67&VVç6†÷G2²ÔUDÂDU5Bæ&÷†Æ"òææöÓ¢6†ææVÃ#SRG&w2v†—FP¦6÷'&V7FÇ“²ÖWFÂW‡÷'G2W&fV7FÇ’–âæöÖBâ6Öö÷F‚ÖWFÆÆ–2F6†W2GW&â&Æ6²–à¤&÷„Æ"Æ—BÂ–æ6ÇVF–ærv†Vâ&÷Vv†æW73—2–çFVB÷fW"ÖWFÂâ&–÷"7W7V7FVB'—FP¦–çfW'6–öâöW‡÷'BÆ÷72&R7WW'6VFVB'’6öæ7&WFRWf–FVæ6RâFV6öFVB7GVÂ&ö¦V7@¦†2–æFWVæFVçCS,+"6öÆ÷W"æBÖWFÆæW73²ÖWFÂ6öçF–ç3(	3#SRâ7GVÂæF—fRÖFW&–À¦†26öÆ÷"¶ÖWFÆæW72ÂÖWFÆæW72öf7F÷$ÖWFÆæW73²W‡÷'FVBw&—66ÆUärÖF6†W2UdU%§&ö¦V7BÖWFÆæW72'—FRW†7FÇ’â7WÆ–VB&ö¦V7B&VFFW26†÷vâ&÷Vv†æW72VF—C²æð§&÷Vv†æW72Ö&W6VçB–âF†B6æ6†÷BÂæ÷B&ööböbG&÷VB&÷Vv†æW72âWÆöG2&VÖ–à§VæÖöF–f–VBæB&Ræ÷B6÷–VB–çFò'VçF–ÖR÷&W÷6—F÷'’à ¥&ö÷B6÷W&6RöÖ—76–öã¢7FæF&B–çFVBÖWFÂ†Bæò66VæRöÖFW&–Â&VfÆV7F–öâ–çWBà¤F—&V7BÆ–v‡G2v—fRæ'&÷r†–v†Æ–v‡G3²6Öö÷F‚ÖWFÂ6â÷F†W'v—6R6†÷r&Æ6²â¶VW&p£öæöæÖWFÂó#SVÖWFÂ6VÖçF–72æBW†—7F–ærw&—FW'2â÷&–v–æÂ7W&f6RöÆ–fWF–ÖR÷væW ¦æ÷r7V—&W2Æö6Â&ööÒÕ$TÒöæÇ’f÷"ÖWFÆÆ–2Æ—BÖFW&–Âv—F‚æòW†—7F–ær66VæP¦Vçf—&öæÖVçBâ÷&–v–æÂF‡&VSs’&ööÔVçf—&öæÖVçB²Õ$TÔvVæW&F÷"Ã#†7V&R6—¦RÂæò„E ¦æWGv÷&²fWF6‚Â7W7FöÒ6†FW"÷"FFVBÆ—fR×66VæRÆ–v‡G2â–æFWVæFVçBVçdÖW"ÖFW&–À§W6W26†&VBW"×&VæFW&W"÷&Vf6÷VçBööÃ²vVæW&F÷"÷&ööÒFV×÷&'’76WG2F—7÷6VBgFW ¦7&VF–öâÂ&VæFW"F&vWBg&VVBW†7FÇ’öæ6RgFW"Æ7B7W&f6Râ6†ææVÂ†öÆG266WFV@§VæÆ—BÖÂ6öÆ÷W"÷&÷Vv†æW72ÖöæÇ’F‡2Væ6†ævVC²W‡Æ–6—B66VæRVçf—&öæÖVçB&W7V7FVBà¥6÷W&6R–çBõUg2ö†—7F÷'’÷&ö¦V7G2æBW‡÷'Bf7F÷'2öÖ2Væ6†ævVBâæò–çfW'FVB×6Æ–FW §v÷&¶&÷VæBÂ6÷W&6RÖ–w&F–öâ÷"66VæRÖvÆö&ÂÆ–v‡F–ær6†ævRà £6æWr&Vw&W76–öç26÷fW"÷&–v–æÂ7W&f6R&–æF–æröb&VfÆV7F–öâ¶W†7B66Æ"6†ææVÇ2À¤6†ææVÂôÆ—B&WW6R÷6÷W&6R&W6W'fF–öâÂ6öÆ÷W"ÖöæÇ’ö7W7FöÒVçf—&öæÖVçB—6öÆF–öâÀ¦×VÇF—ÆR7W&f6W2÷&VfW&Væ6RÆ–fWF–ÖRÂ&VæFW&W"6W&F–öâæBf–ÆVBÖvVæW&F–öâ&WG'’à¤æV&'’æWr·&÷Vv†æW72öÖWFÆæW72öW‡÷'C352Â&VÆV6SU53²gVÆÂ÷V&Æ–6F–öâ&VÆ÷rà¤6Æ÷VBuR6ææ÷B&VæFW"7GVÂÖ–ã²f¶RF&vWBfW&–f–W2÷væW'6†—öæÇ’Âæ÷BuRÆöö²à¤öff–6–Â“¢F‡&VV§2æ÷&röFö72÷vW2õ&ööÔVçf—&öæÖVçBæ‡FÖÂæBÕ$TÔvVæW&F÷"æ‡FÖÃ°§–ææVB–ç7FÆÆVBF‡&VSs’6÷W&6RfW&–f–VB7W÷'G2g&öÕ66VæR÷F–öç2ç6—¦Rà ¥W6W#“#BFööÆ&"52&÷FV7FVC²7W'&VçB'VçF–ÖR6÷'&V7F–öâöæÇ’–çFVBÖFW&–À§&VfÆV7F–öâF‚æB&Wf–WvVB&WfW'6RÆöFW"w&ƒ“#RâÖWFÆæW72WF†÷&–æröW‡÷'G0¦&R6öæf—&ÖVB'’W6W"6Æ&–f–6F–öâÃ“#Rf—7VÂ66WFæ6RVæF–ærâDUd”4S¢&V÷Và§6fVB–çFVB7V&RÂÆ—B²ÖWFÆæW73#SRæB&÷Vv†æW73Â÷&&—C²6†÷VÆB&VfÆV7B7GVF–ð§æVÇ2&F†W"F†â6öÆ–B&Æ6²â6ö×&R&÷Vv†æW73#SRÂ6†ææVÃó#SRÂFöæR÷&V÷Vâæ@¤äôÔBW‡÷'BâæW‡B&W7öæBæ'&÷vÇ’Fó“#Rf—7VÂfVVF&6²&Vf÷&RæWr6†ææVÇ2à ¢ã“#Rf–æÂÆö6ÂæöFS#Bã’ã¢¢£"Ãc3b52òd”Âò6¶—VB¢£°¦æV&'“352æB&VÆV6SU52â7GVÂ7WÆ–VBäôÒ÷&ö¦V7BÖWFÆæW726ö×&VB'—FP¦f÷"'—FS¢–FVçF–6ÂâæòFW7B76W'F–öç2&VÆ†VC²æò6÷W&6R÷W6W"f–ÆRÖöF–f–6F–öç2à¥&÷FV7FVC“#BFööÆ&"æB×VÇF“ãög&÷¦Vâ&WF–æVBâV&Æ–6F–öâ&ööbföÆÆ÷w3°§&VÂuRó“#R•B&VfÆV7F–öâV&æ6R7F–ÆÂVæF–ærà ¢22ã“#RV&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRS“scS–Sƒƒ“####–3#†V3S†6#S#c#63VÂFW7FVBG&VP¦scc6fSsC““C–6VCcc6cS3fCVVC“†Ffcƒ#–Â—2V&Æ—6†VBâ6öææV7FVBv—BFF¦7&VFVBF†R–FVçF–6ÂFW7FVBÆö6ÂG&VS²fWF6†VB÷&–v–âöÖ–âÖF6†VBW†7FÇ’à¤Æö6ÂæöFS#BæB†÷7FVB&Vw&W76–öâ3“3c#scsSò¦ö"ƒC3#Cƒ“ƒ“–&÷F‚70£"Ãc3bFW7G2Â¦W&òf–ÇW&W2÷6¶—3²6ö×ÆWFR†÷7FVBÆöw2fW&–f–VBâvW0¦3“3c#scSs†ÂFWÆ÷’¦ö"ƒC3#c#CCÂ6ö×ÆWFVBÆÂ7FW27V66W76gVÆÇ’à¤ÆÃ#g&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚6÷W&6S¢6†VÆÂ÷fW'6–öâÂæWr&VfÆV7F–öâ†VÇW"À¦÷&–v–æÂ–çB7W&f6RæBWfW'’6†ævVB'VçF–ÖRöW‡÷'B÷&VçBôÆ"f–ÆRÂ&V6÷fW'’À§&÷FV7FVB×VÇF“ãÂ&WF–æVB66Æ"÷&ö¦V7B÷væW'2æB66WFVC“#BUb—6öÆF–öâà¤–æ—F–Â–âÖfÆ–v‡B&VG26W'fVC“#BöæWr†VÇW#CC²f–æÂ6†V6¶VBw&‚ÖF6†W3“#Rà¤öæÇ’–çFVBÖFW&–Â&VfÆV7F–öâ&V†f–÷"6†ævVC²æF—fRôtÄ"Æv÷&—F†×2æB6÷W&6P§66Æ"fÇVW2&WF–âW†7B66WFVB'—FW2â7WÆ–VB&ö¦V7BöæF—fRf–ÆW2VæÖöF–f–VBà ¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçC²F†—2&ööb—2Fö72ÖöæÇ’â'V–ÆC“#R6ö×ÆWFRæ@§&VG’f÷"•BÆ—BÖFW&–ÂÖWFÃ#SR÷&÷Vv†æW73¶÷&&—B&VfÆV7F–öâ6†V6²Â&÷Vvƒ#SP¦&ÇW"6ö×&—6öâÂ6†ææVÃó#SRæBFöæRõ6fT÷VââW†—7F–ær6†ææVÂæBæF—fRW‡÷'@¦6öæf—&ÖVB6÷'&V7B'’7WÆ–VBf–ÆW2÷W6W"6Æ&–f–6F–öâÂæ÷B&WfW'6VBâ&VÂuP§&VfÆV7F–öâV&æ6RæBÆFVæ7’&VÖ–âFWf–6R×VæF–æs²æöFRÕ$TÒF&vWBFFW §fW&–f–W2&–æF–ær÷6†&–æröÆ–fWF–ÖRöæÇ’âW6W#“#BFööÆ&"52&÷FV7FVBà¤æW‡C£“#Rf—7VÂfVVF&6²Âæ'&÷rf—†W2&Vf÷&RgW'F†W"ÖFW&–ÂÖ6†ææVÂv÷&²à ¢22ã“#b(	Bv†öÆRÖö&¦V7BFf–ÆÃ²&WVW7FVB''W6‚&öFÖ(	B#ö7Fö&W"##` ¥W6W#“#RfVVF&6³¢&VfÆV7F–öç27F–ÆÂæ÷Bf—6–&ÆR–â&÷„Æ"&Wf–Ws²æöÖBW‡÷'@®(	Æw&VN(	ÒæB&÷FV7FVBã“#Rf—7VÂf—‚—2äõB66WFVBâæògW'F†W"7V7VÆF—fRÆ–v‡F–æp¦6†ævR–ã“#c²&W6W'fR&rÖ2æB6÷'&V7BæF—fR†æFöfbâæVVB7GVÃ“#Ró“#b&Wf–Wp§fW'6–öâ÷7FFR÷"&VæFW&W"F–væ÷7F–72&Vf÷&R6Æ–Ö–æræ÷F†W"&VfÆV7F–öâ&W—"à¥W6W"&WVW7G2FFòf–ÆÂÂÇ†6ö×F–&–Æ—G’ÂFVÆWFR×–çBöW&6W"Â&ÇW"æB6×VFvRà¤6Æ&–f–VBFf–ÆÂFVfVÇBt„ôÄRô$¤T5BÂ6VÆV7FVBÆ–W"ö6†ææVÂÂæ÷B—6ÆæBöfÆööB&Vv–öâà¤VF—BW†—7F–ær&7FW"ö–çWB÷7F6²ö†—7F÷'’æB&–÷"¶ÆV6·2–çFVw&F–öâVF—Bf—'7Bà ¤÷&–v–æÂ&7FW"æ÷r6†&W2W†7FÇ’F†R6ÖR6÷fW&vRö÷VR÷7G&–v‡BÖÇ†FW†VÀ¦÷W&F–öâf÷"''W6‚æBf–ÆÂâæWrFööÂ6VÆV7F÷"''W6‚òFf–ÆÂ+rv†öÆRö&¦V7Bà¥Væ6–ÂöÖ÷W6RF÷vâ×W7B†—Bf—6–&ÆR6VÆV7FVBÖW6ƒ²v†öÆSS,+"6VÆV7FVBÆ–W"ö6†ææVÀ§&Wf–Ww2B7W'&VçB÷6—G’÷fÇVRÂ&VÆV6R6öÖÖ—G2öæ6Rf–÷&–v–æÂf–æ—6‚÷&VfÆ–v‡Bð¦6†V6·ö–çBô4õrâ6—¦R÷&W77W&RFòæ÷BÆ–Ö—Bf–ÆÂâG&sã‡‚Âö–çFW&6æ6VÂ÷FööÂö6†ææVÀ§7v—F6‚ö&öG’Æ÷726æ6VÃ²f–ævW'27F–ÆÂæf–vFRÂ&6¶w&÷VæB6öçF7G2æWfW"f–ÆÂà¤6öÆ÷W"ö–ÖvRö†–FFVâÖÆ–W"÷66Æ"VÆ–v–&–Æ—G’wV&G2&WF–æVC²–ÖvR6öÆ÷W"&VÖ–ç0§&VBÖöæÇ’ÂVF—F&ÆRÖ6·2f–ÆÂæ÷&ÖÆÇ’âæòÖ÷FG2æò†—7F÷'“²V÷Fö6†V6·ö–ç@¦f–ÇW&R&W7F÷&W2÷&–v–æÂ&W6÷W&6R÷&Wf–Wröæf–vF–öââæò66†VÖ÷w&—FW"6†ævW2à £FæWr–çFVw&F–öç3¢W†7B6†&VB&7FW"6÷fW&vRöÇ†öæòÖ÷ö6æ6VÃ²7GVÂT’Æ–W ¦f–ÆÂæB6÷W&6R&W6W'fF–öâõVæFõ&VFòõ6fT÷VâöæF—fRäs²–æFWVæFVçB66Æ"¶Ö6°¦f–ÆÃ²ÖW6‚Ö—72öf–ævW"öG&rö6æ6VÂ÷6WGF–æw2ö&öG’ÖÆ÷72ö6†V6·ö–çB&öÆÆ&6²âæV&'“•53°¦gVÆÂæBV&Æ–6F–öâ&VÆ÷râ÷&–v–æÂ''W6‚W‡V7FF–öç2&WF–æVBÂæòg&÷¦Vâô×VÇF’ö¶W&æVÀ¦6†ævW2â&Wf–WvVB6†&VB&7FW"öÖ–â´Æ"&WfW'6R66†Rw&ƒ“#böæÇ’à ¥&VÖ–æ–ær&WVW7FVB''W6†W2&R66WFVB&öFÖÂæ÷BFVÆ—fW&VB'WGFöç3¢W&6W ¢‡G&ç7&VçB÷fW&Æ—2öÖ6·3²W‡Æ–6—B&6R&W6WB6VÖçF–72’ÂÇ†F—2†&÷VæFVBäp¦6÷fW&vR÷&÷FF–öâv—F‚÷&–v–æÂ''W6‚’Â&ÇW"æB6×VFvRv—F‚UbÖ—6ÆæB÷6VÒÖv&P§6×Æ–ær6òæV–v†&÷W&–ærFÆ2—6ÆæG26ææ÷B6öçFÖ–æFRVç&VÆFVB7W&f6W2à¤æò%"–×÷'B÷"vVæW&ÂæöÖB''W6‚Öf÷&ÖB6ö×F–&–Æ—G’&öÖ—6VBâ&VfW"VF—FV@¤¶ÆV6·2Æv÷&—F†×2–âW†—7F–ær&7FW"ö–çWBö†—7F÷'’÷fW"æ÷F†W"–çF–ærVæv–æRà¤æW‡Bæ'&÷r'V–ÆC¢&VfÆV7F–öâF–væ÷7F–2Wf–FVæ6RÇW2W&6W"öÇ†–×ÆVÖVçFF–öã°¦¶VW&ÇW"÷6×VFvR66÷R&÷VæFVBæBFW7B&Vf÷&RW‡÷6–ærâæòæWrÖFW&–Â6†ææVÂv÷&²à¤DUd”4S“#c¢6†ö÷6RFööÂFf–ÆÂÂFÖW6‚v—F‚6†÷6Vâ6öÆ÷W#²VæFõ&VFòâf–ÆÂâ÷fW&Æ¦CSR÷6—G“²6öæf—&ÒVæFW&Ç––ær–çB&WF–æVBâf–ÆÂ&÷Vv†æW72ôÖWFÆæW73ó#SRæ@¦6†V6²6†ææVÂöW‡÷'B–æFWVæFVæ6S²7v—F6‚''W6‚æB6öæf—&Òæ÷&ÖÂVæ6–Â7G&ö¶W2à ¢ã“#bf–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£"ÃcC52òd”Âò6¶—VB¢£°¦æWrf–ÆÃE52ÂæV&'“•52Â&VÆV6SU52â–æ—F–Â&W&F–öâ6öçG&7B6Vv‡B6†&V@¤Æ"&7FW"öÖ—GFVBg&öÒÆöFW"6Æ÷7W&S²6ö×ÆWFRÖ–âôÆ"w&‚&Wf–WvVBæBWFFV@¦&Vf÷&Rf–æÂ'Vââæò76W'F–öç2&VÆ†VC²&÷FV7FVB×VÇF“ãög&÷¦VâöW‡÷'B&WF–æVBà¥&VfÆV7F–öã“#R&VÖ–ç2W6W"×&W÷'FVBVç&W6öÇfVBÂæòÆ–v‡F–ærf—‚6Æ–Ò–ã“#bà¥V&Æ–6F–öâæB†÷7FVBöÆ—fRfW&–f–6F–öâföÆÆ÷rà ¢22ã“#bV&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR6#&6SCcf#vf###ƒcScSƒcVScs“c&#“fÂFW7FVBG&VP¦SccCvS3#†cƒfFSv#–##V33cS3c“c6VFV6Â—2V&Æ—6†VBâ6öææV7FVBv—BFF¦7&VFVBF†R–FVçF–6ÂFW7FVBÆö6ÂG&VS²fWF6†VB÷&–v–âöÖ–âÖF6†VBW†7FÇ’à¤Æö6ÂæöFS#BæB†÷7FVB&Vw&W76–öâ3“3cSƒ3#fò¦ö"ƒC3“sS““3v&÷F‚70£"ÃcCFW7G2Â¦W&òf–ÇW&W2÷6¶—3²6ö×ÆWFR†÷7FVBÆöw2fW&–f–VBâvW0¦3“3cSsSÂFWÆ÷’¦ö"ƒC3“ƒƒ“sCvÂ6ö×ÆWFVBÆÂ7FW27V66W76gVÆÇ’à¤ÆÃ’g&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚6÷W&6S¢6†VÆÂ÷fW'6–öâÂÖ–â–çFW"ö6÷&RÂ6†&V@§&7FW"æB6ö×ÆWFR6†ævVBÆ"6W76–öâöÆöFW"w&‚Â&V6÷fW'’Â&÷FV7FVB×VÇF“ãÀ§&WF–æVB66Æ"ö6öFV2öæF—fRW‡÷'B÷–çBW‡÷'BöÖFW&–Â÷&VfÆV7F–öâõUb÷væW'2à¤–æ—F–Â–âÖfÆ–v‡B&VG26W'fVC“#S²f–æÂ6†V6¶VBw&‚ÖF6†W3“#bâæòg&÷¦VâÀ¦ÖöFVÆÆ–ærÂ&ö¦V7B÷"W‡÷'BÆv÷&—F†Ò6†ævS²÷&–v–æÂ''W6‚6VÖçF–72&WF–æVBà ¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçC²&ööb—2Fö72ÖöæÇ’â'V–ÆC“#b6ö×ÆWFRæB&VG¦f÷"FööÂ(i"Ff–ÆÂ+rv†öÆRö&¦V7C¢F6öÆ÷W"f–ÆÂõVæFõ&VFòÂ÷fW&Æ“SR&W6W'fF–öâÀ§66Æ#ó#SR–æFWVæFVæ6RæB&WGW&âFò''W6‚âÇ†F—2ÂW&6W"Â&ÇW"æB6×VFvR&P§&WVW7FVBVæF–ær7FvW2Âæ÷B–×ÆVÖVçFVBâ&VfÆV7F–öâ&Wf–Wr&VÖ–ç2W6W"×&W÷'FV@§Vç&W6öÇfVBFW7—FS“#RÂæòæWrÆ–v‡F–ær&W—"6Æ–ÖVBâæöÖBW‡÷'B6öæf—&ÖVBw&V@¦æB&÷FV7FVC³“#BFööÆ&"52&÷FV7FVBâæW‡C£“#bFWf–6RfVVF&6²Âæ'&÷rW&6W"ð¦Ç†FF—F–öç2æBWf–FVæ6RÖÆVB&Wf–WrF–væ÷6—2F‡&÷Vv‚÷&–v–æÂ÷væW'2à ¢22ã“#r(	BW‡Æ–6—B66Æ"Æ&VÂ&÷w2æBW&6W"(	B#ö7Fö&W"##` ¥W6W#“#e52&÷FV7G2v†öÆRÖö&¦V7BFf–ÆÂö÷6—G’ö†—7F÷'’ö6†ææVÂv÷&¶fÆ÷râ67&VVç6†÷@¦–FVçF–f–W2V&Æ–W"ÖWFÂv†—FRö&Æ6²6öægW6–öâ2–æÆ–æR†–çBFW‡B¦ö–æ–ær&VF÷WC ®(	Ã#ST&Æ6¾(
n(	Òò(	Ã&Æ6¾(
n(	Òâæò–çfW'FVB'—FW2â6†&VB66Æ"6öçG&öÇ2æ÷rw&–B&÷w3 ¦Æ&VÂ²fÆW†–&ÆR6Æ–FW"²f—†VC66‚&VF÷WBÂF†Vâ6W&FR&Æö6²†–çG2âW‡Æ–6—@£ÖæöâÖÖWFÂ†&Æ6²’ó#SSÖÖWFÂ‡v†—FR“²&÷Vv†æW73×6Öö÷F‚†&Æ6²’ó#SS×&÷Vv‚‡v†—FR’à¤†VÇ6ææ÷B6—B&W6–FRçVÖW&–2÷WGWBâ6ö×7BÄTeBFö6²÷67&öÆÂöfö÷FW"&WF–æVBà¤æò66Æ"öFFöW‡÷'BöÆ–v‡B6VÖçF–26†ævS²&VfÆV7F–öã“#R&VÖ–ç26W&FRVç&W6öÇfV@§&W÷'BÂæ÷B–×Æ–VB52g&öÓ“#b÷"F†—26Æ&–f–6F–öââæF—fRW‡÷'B&÷FV7FVBà ¤æW‡B&WVW7FVBæ'&÷r''W6ƒ¢÷&–v–æÂFööÂ6VÆV7F÷"v–ç2W&6W"â6ÖR6×ÆW'2À§&W77W&R÷6—¦Rö†&FæW72öÖ†–×VÒW"Ö6öçF7B6÷fW&vRæBW†—7F–ær6öÖÖ—Bö6†V6·ö–çBð¤4õr÷ööÇ2âG&ç7&VçB6öÆ÷W"÷fW&Æ—2&VGV6RÇ†öæÇ’Â&WF–æ–ær$t"÷6÷W&6Rö&6S°¤&6R&W6WG2v†—FRâ&÷Vv†æW72&W6WG3#SRÂÖWFÆæW73ÂÖ6·2&WfVÂ‡&s–b–çfW'FVBÀ£#SR÷F†W'v—6R’â÷&–v–æÂ–ÖvR6öÆ÷W"7F—2&WF–æVB÷&VBÖöæÇ“²W&6R—G2Ö6²à¤æò66VæRöÖFW&–Â÷6—G’ÂFW7G'V7F—fR–ÖvR&¶–ær÷"FVÆWF–öâöbÆ–W"÷&W6÷W&6Rà¤6öÆ÷W"6öçG&öÇ2F—6&ÆRf÷"W&6W"æB&W7F÷&Röâ&WGW&ã²6öÆ÷W"''W6‚6WGF–ær&WF–æVBà¤6æ6VÆÆF–öâ÷6WGF–æw2ö&öG’ÖÆ÷72öf–ÆVB6†V6·ö–çB&WF–â÷&–v–æÂ—†VÇ2ö†—7F÷'’à¤÷&–v–æÂ''W6‚æB66WFVBFf–ÆÂ&WF–â6VÖçF–73²æòæWrö–çFW"ö†—7F÷'’÷væW"à £6æWr–çFVw&F–öâFW7G26÷fW"Ç†6÷fW&vRõ$t"öæòÖ÷ö6æ6VÃ²7GVÂT’÷fW&Æ’ô&6P¦—6öÆF–öâ²VæFõ&VFòõ6fT÷VâöW†7B6ö×÷6VBæF—fRäs²FVfVÇG2öÖ6²–çfW'6–öâð§66Æ"–æFWVæFVæ6RæB&VgW6Â&öÆÆ&6²âW†—7F–ærf–ÆÂ÷&÷Vv†æW72öÖWFÆæW72öÖ6³#553°¦gVÆÂö66†R÷V&Æ–6F–öâ&VÆ÷râ6†&VBÖ–âôÆ"&7FW"&WfW'6Rw&‚&W–ææVC“#röæÇ“°§&÷FV7FVB×VÇF“ãög&÷¦VâöÖöFVÆÆ–ærõUb÷&ö¦V7BöæF—fRw&—FW"Væ6†ævVBà¤DUd”4S“#s¢&VBÖWFÆæW73ó#SR†–çB&VÆ÷r6Æ–FW"v—F‚æò¦ö–æVBFW‡C²W&6R–çFV@¦÷fW&Æ’Fò&WfVÂÆ÷vW"–çBÂVæFõ&VFó²W&6R&6R÷66Æ'2Â7v—F6‚''W6‚ôf–ÆÂ&6²à¤Ç†ärF—2æW‡BÂUb×6fR&ÇW"÷6×VFvR&VÖ–âVWVVBâ&VfÆV7F–öâF–væ÷6—2&VÖ–ç0¦÷VâæB6†÷VÆBW6RFWf–6R÷fW'6–öâ÷&VæFW&W"Wf–FVæ6RÂæògW'F†W"Æ–v‡F–ærwVW76W2à ¢ã“#rf–æÂÆö6ÂæöFS#Bã’ã¢¢£"ÃcC252òd”Âò6¶—VB¢£°£6æWrW&6W"–çFVw&F–öç2ÂæV&'“#552æB&VÆV6SU52âæòFW7G2&VÆ†VBà¥&÷FV7FVC“#bf–ÆÂó“#BFööÆ&"öæF—fRW‡÷'Bô×VÇF“ãög&÷¦Vâ&WF–æVBâ66Æ"Ö–æp§Væ6†ævVC²Æ–÷WBöFWf–6R6öæf—&ÖF–öâæBW&6W"†æG2ÖöâvFRVæF–ærà¥V&Æ–6F–öâö†÷7FVB&Vw&W76–öâöÆ—fRfW&–f–6F–öâföÆÆ÷w2à ¢22ã“#rV&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR&f#6V#sC6C6Ff#“63S3“SvCC–&S†cfcc†ÂFW7FVBG&VP¦3“vƒC#6c#3fV3SC&#3CSC#–“S#“ƒCv#C6Â—2V&Æ—6†VBâ6öææV7FVBv—BFF¦7&VFVBF†R–FVçF–6ÂFW7FVBÆö6ÂG&VS²fWF6†VB÷&–v–âöÖ–âÖF6†VBW†7FÇ’à¤Æö6ÂæöFS#BæB†÷7FVB&Vw&W76–öâ3“3c““ƒCSS6ò¦ö"ƒCSSC33“ƒV&÷F‚70£"ÃcC2FW7G2Â¦W&òf–ÇW&W2÷6¶—3²6ö×ÆWFR†÷7FVBÆöw2fW&–f–VBâvW0¦3“3c““ƒCfÂFWÆ÷’¦ö"ƒCSSSƒƒc†Â6ö×ÆWFVBÆÂ7FW27V66W76gVÆÇ’à¤ÆÃ’g&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚6÷W&6S¢6†VÆÂ÷fW'6–öâÂ–çFW"ö6÷&R÷6†&VB&7FW"À¦6ö×ÆWFR6†ævVBÆ"w&‚Â&V6÷fW'’Â&÷FV7FVB×VÇF“ãÂ&WF–æVB66Æ"ö6öFV2öæF—fP¦æB–çBW‡÷'BöÖFW&–Â÷&VfÆV7F–öâõUb÷væW'2â–æ—F–Â–âÖfÆ–v‡B&VG26W'fVC“#c°¦f–æÂ6†V6¶VBw&‚ÖF6†W3“#râæòg&÷¦VâöÖöFVÆÆ–ærõUb÷&ö¦V7B÷w&—FW"6†ævW2à ¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçC²&ööb—2Fö72ÖöæÇ’â'V–ÆC“#r6ö×ÆWFRæB&VG¦f÷"Æ&VÂ6W&F–öâöW‡Æ–6—CÓ#SRÖVæ–æræBFööÂW&6W"÷fW&Æ’&WfVÂõVæFõ&VFòÀ¤&6Rv†—FR÷66Æ"FVfVÇG2æB&WGW&âFò''W6‚ö66WFVBFf–ÆÂâ7GVÂ•BFW‡@¦Æ–÷WBæBW&6W"fVVÂ&VÖ–âFWf–6R×VæF–æs²WFöÖFVBFW7G2&Ræ÷Bf—7VÂ&ööbà¥W6W#“#bf–ÆÂæC“#BFööÆ&"52&÷FV7FVC²æF—fRW‡÷'B6÷'&V7BâÇ†ärF—0¦æW‡C²Ub×6fR&ÇW"÷6×VFvRVæF–ærâ&VfÆV7F–öã“#R&VÖ–ç2–æFWVæFVçFÇ’Vç&W6öÇfVBÀ¦æ÷B6Æ–FW"–çfW'6–öâ÷"â–æfW'&VB52g&öÒF†R6÷'&V7FVB†VÇFW‡Bà ¢22ã“#‚(	B–çB7F—2÷Vâ7&÷72VæFòõ&VFò(	B#ö7Fö&W"##` ¥W6W"ã“#r52&÷FV7FVC¢66Æ"†–çBÆ–÷WBæBW&6W"ÂÆöæw6–FRã“#bf–ÆÂæ@¢ã“#BFööÆ&"â&WVW7FVB†—7F÷'’vW7GW&Rf—‚F¶W2&–÷&—G’÷fW"ärÇ†F—2à¤VF—C¢÷&–v–æÂÖ–âFõVæFòöFõ&VFò&W7F÷&W266VæRö&öG’æB–çFW"6Æ÷6W2öâF—7÷6Ã°¥–çBfö÷FW"Ç6òW‡Æ–6—FÇ’6Æ÷6VBâ÷&–v–æÂ†—7F÷'’÷væW"æ÷r'&6¶WG2&W7F÷&F–öà§v—F‚–çFW"&W&F–öâ÷&W7VÖRâ6æ6VÂG&ç6–VçB7G&ö¶Rö–ÖvR&Vf÷&R6GW&RÂ6Æ÷6P¦öÆBF—7Æ’Â&V÷Vâöâ&V'V–ÇB7F—fR&öG“²&WF–âÆ–W"–b&W6VçBÂ6†ææVÂöÖ6²–`§fÆ–BÂÆ—Bô6†ææVÂ&Wf–WræBW†—7F–ær''W6‚ö7F–öâ÷6Æ–FW"6öçG&öÇ2âæòGWÆ–6FP¦†—7F÷'’÷"vW7GW&R÷væW"ö6†V6·ö–çBâV×G’†—7F÷'’æB&–B&WVFVB†—7F÷'’&WF–à¥–çC²FöæRö÷F†W"6W76–öâöö&¦V7B6†ævW2FVfVB7FÆR&V÷Vââ÷&–v–æÂGvò÷F‡&VRÖf–ævW ¦vW7GW&W2ÂFööÆ&"æBfö÷FW"6†&RF†—2F‚âf—fR&Vw&W76–öç2W†V7WFR÷&–v–æÂÖ–à¥VæFòõ&VFòæBF÷V6‚ÖVæBgVæ7F–öç2v—F‚&VÂ66VæR6æ6†÷G2Â–çB&W6÷W&6W2æBT’à¥&VfÆV7F–öâ&Wf–Wr&VÖ–ç2Vç&W6öÇfVC²æF—fRæöÖBW‡÷'B&VÖ–ç26÷'&V7BâÇ†¥ärF—2æW‡BÂUb×6fR&ÇW"÷6×VFvRVæF–ærâFWf–6Rã“#‚66WFæ6RVæF–ærà ¢Ò·…Òã“#ƒ¢–çBGvòÖ&·2ÂGvòÖf–ævW"VæFòF†Vâ6öçF–çVR–çF–ærv—F†÷WB&V÷Væ–ærà¢Ò·…Òã“#ƒ¢F‡&VRÖf–ævW"&VFòæB–çBfö÷FW"VæFòõ&VFò¶VW6†ææVÂ÷FööÂ6WGF–æw2à¢Ò·…Òã“#ƒ¢FöæR7F–ÆÂW†—G2–çC²&–B†—7F÷'’FöW2æ÷B&V÷Vâ6Æ÷6VB6W76–öâà ¢ã“#‚Æö6ÂæöFS#BgVÆÂ&Vw&W76–öã¢¢£"ÃcC‚52òd”Âò6¶—VB¢£°¦f—fRæWr†—7F÷'’&Vw&W76–öç2æB&Wf–WvVB&VÆV6R6öçG&7CU52â&÷FV7FVB×VÇF“ã ¦æBg&÷¦Vâ'V–ÆG2Væ6†ævVBâV&Æ–6F–öâö†÷7FVBöÆ—fRÖ'—FRfW&–f–6F–öâföÆÆ÷w2à ¢22ã“#‚V&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRcSƒFc†CcF&&S†S&c“CƒFCcSV6V6SC#–&ÂFW7FVBG&VP¦SSSF66c3ss†V#F#6fCC3F#ƒcS†&FFC“ÂV&Æ—6†VBF‡&÷Vv‚6öææV7FVBv—BFF§v—F‚F†RW†7BÆö6ÆÇ’FW7FVBG&VS²fWF6†VB÷&–v–âöÖ–âÖF6†VBæBv÷&¶–ærG&VR6ÆVâà¤Æö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öâ'Vâ3“3s3#cƒvÂ¦ö"ƒCcSC3SƒC&À¦&÷F‚¢£"ÃcC‚52òd”Âò6¶—VB¢£²gVÆÂ†÷7FVBÆörF÷FÇ2fW&–f–VBâvW2'Và¦3“3s3#SS3vÂFWÆ÷’ƒCcSSs3#&Â6ö×ÆWFVB7V66W76gVÆÇ’âÆÃr6†V6¶VBg&W6€¦Æ—fRf–ÆW2'—FRÖÖF6ƒ¢6†VÆÂ÷fW'6–öâÂ6†ævVBÖ–â÷–çFW"Â&V6÷fW'’ÂVæ6†ævVB–ç@¦6÷&R÷&7FW"÷66Æ"÷&ö¦V7BöW‡÷'B÷&VfÆV7F–öâõUbæB&÷FV7FVB×VÇF“ãâg&÷¦Vâ'V–ÆG0§Væ6†ævVBâÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçC²F†—2&ööb—2Fö7VÖVçFF–öâÖöæÇ’à ¤'V–ÆC“#‚6ö×ÆWFRæB&VG’f÷"GvòÖf–ævW"VæFòòF‡&VRÖf–ævW"&VFòv†–ÆR–çB7F—0¦÷VâÂ6öçF–çVVBVæ6–Â7G&ö¶W2Â&WF–æVB6†ææVÂ÷&Wf–Wrö''W6‚6öçG&öÇ2æB÷&–v–æÀ¥–çBfö÷FW"†—7F÷'’âFöæR7F–ÆÂ6Æ÷6W2âW6W#“#r52&÷FV7FVC²7GVÃ“#‚•@¦66WFæ6RVæF–ærâ&VfÆV7F–öâ&Wf–Wr&VÖ–ç2–æFWVæFVçFÇ’Vç&W6öÇfVC²æF—fRW‡÷'@¦6÷'&V7BâæW‡B&÷VæFVBärÇ†F—3²Ub×6fR&ÇW"÷6×VFvRVæF–ærà ¢22ã“#’(	BärÇ†''W6‚F—3²ã“#‚W6W"52(	B#ö7Fö&W"##` ¥W6W"ã“#‚52&÷FV7G2–çB7F––ær÷Vâ7&÷72Gvò÷F‡&VRÖf–ævW"æBfö÷FW ¥VæFòõ&VFòÂ&WF–æVB6öçG&öÇ2æB6öçF–çVVBVæ6–Â7G&ö¶W2âVF—BÖ–ãVVS†&#SC ¦÷&–v–æÂ6†&VB&7FW"ö–çWBö†—7F÷'’Ç&VG’÷vâ''W6‚æBW&6W#²æò7W7FöÒF— ¦–×÷'FW"÷6×ÆW"âFB&÷VæFVBär6÷fW&vRF‡&÷Vv‚F†÷6R4ÔR÷væW'2Â&WW6–æs“p¦–ÖvR&VfÆ–v‡BöFV6öFRâ''W6‚6WGF–æw3¢ÆöBÇ†ärò&÷FF–öâò&÷VæBF—à¥ä~(šC#Sl+"ó#Sd¶”"ÂÇVÖ–ææ6\9vÇ†6÷fW&vS²v†—FR–çG2Â&Æ6²÷G&ç7&VçB6¶—2à¤÷væVB#‚F—(šCcD¶”"Â6÷–VBW"6öçF7C²F÷Öf—'7Bö7V7B×&W6W'f–ær&÷FFVB&–Æ–æV §6×Æ–ær–âUbFW†VÇ2âÇ†&WÆ6W2&÷VæB†&FæW72Â÷&–v–æÂ&W77W&Rö÷6—G’6ð§6÷W&6RÖ÷fW"öW&6Rö6æ6VÂ&WF–æVBâv†öÆRÖö&¦V7Bf–ÆÂ–væ÷&W2F—âæòæWrö–çFW"À¦†—7F÷'’Â–çB×&W6÷W&6R÷&ö¦V7BöæF—fRw&—FW"÷"ÖöFVÆÆ–ær¶W&æVÂâF—2÷&÷FF–öâ&P§6W76–öâ&VfW&Væ6W2Â&WF–æVBF‡&÷Vvƒ“#‚&V÷Vâ'WBæ÷B6fVB–âæ&÷†Æ"âÖ&·2W'6—7Bà¤ÆFRö–çfÆ–B–×÷'G2&WF–â&Wf–÷W2F—æB6öÖÖ—GFVBv÷&³²÷&–v–æÂFV6öFR6ÆVçWà¥&VBFö72÷–çBÖÇ†Ó“#’æÖBâf÷W"fö7W6VBFW7G26÷fW"Æ–Ö—G2ö6ÆVçWö6÷fW&vR÷væW'6†—À§&÷FF–öâö7V7Bö6æ6VÂöW&6RÂ&VÂT’ö†—7F÷'’÷&ö¦V7BöæF—fRäræB7–æ2&VgW6Âà¤÷&–v–æÂ6†&VB&7FW"&WfW'6RÖ–âôÆ"66†Rw&ƒ“#’&Wf–WvVC²×VÇF“ãög&÷¦Vâ–çF7Bà¥&VfÆV7F–öâ&Wf–Wr&VÖ–ç2Vç&W6öÇfVBÂæF—fRW‡÷'B6÷'&V7BâÇ†FWf–6RvFRVæF–ærà¤æW‡BFWf–6RÇ†fVVF&6²ÂF†VâUb×6fR&ÇW"÷6×VFvS²f–Ww÷'Bö&¶VBòæBVFvRÖ&6V@§6VÒÖWF†÷&–ær&VÖ–âVWVVBf÷"W†—7F–ærÖ÷væW"VF—G2Âæ÷BFVÆ—fW&VBfVGW&W2à¥fÆ–FF–öâ÷V&Æ–6F–öâWf–FVæ6RföÆÆ÷w3²æò&VæFW&VB÷"FWf–6RW&f÷&Öæ6R6Æ–Òà ¢Ò²Òã“#“¢''W6‚6WGF–æw2(i"ÆöBÇ†är(šC#Sl+#²v†—FR–çG2Â&Æ6²÷G&ç7&VçB6¶—2à¢Ò²Òã“#“¢&÷FFR7–ÖÖWG&–6ÂF—Â–çBöW&6R÷fW&Æ“²VæFòõ&VFò7F—2–â–çBà¢Ò²Òã“#“¢&÷VæBF—&W7F÷&W26—&7VÆ"''W6ƒ²6fRô÷VâæBäôÔB&WF–â–çFVBÖ&·2à ¢ã“#’f–æÂÆö6ÂæöFS#Bã’ã¢¢£"ÃcS"52òd”Âò6¶—VB¢¢à¤f÷W"æWrÇ†FW7G2æB÷&–v–æÂæV&'“…53²&VÆV6Rö66†R6†V6·2–æ6ÇVFVBà¤æò76W'F–öç2&VÆ†VBâ6†&VB&7FW"Ö–âôÆ"&WfW'6Rw&ƒ“#’&Wf–WvVC²×VÇF“ã ¦æBg&÷¦Vâ'V–ÆG2Væ6†ævVBâV&Æ–6F–öâö†÷7FVBöÆ—fRfW&–f–6F–öâföÆÆ÷w2à ¢22ã“#’V&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR3–c#–f#CfƒvF333ƒS†#63fc“fSS†ÂFW7FVBG&VP¦6fFcsv3†6F6cc&cCcS–Vfc“S6#VFSc“&fÂV&Æ—6†VBf–6öææV7FVBv—BFFà¤ÆÃ‚WÆöFVB&Æö'2æBG&VRÖF6‚Æö6ÆÇ’FW7FVB6÷W&6S²fWF6†VBÖ–â–FVçF–6Âà¤Æö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“C“Ss“C’ö¦ö#ƒSƒ3sƒC#&÷F€¢¢£"ÃcS"52òd”Âò6¶—VB¢£²gVÆÂ†÷7FVBÆöw2fW&–f–VBâvW33“C“Ssƒs2À¦FWÆ÷“ƒSƒ3“3SS26ö×ÆWFVB7V66W76gVÆÇ’âÆÃbg&W6‚6†V6¶VBÆ—fRf–ÆW2'—FRÖÖF6ƒ §6†VÆÂ÷fW'6–öâÂWfW'’6†ævVB'VçF–ÖRôÆ"÷væW"Â&V6÷fW'’Â&÷FV7FVB×VÇF“ãÀ§&WF–æVB–ÖvR–×÷'FW"öW‡÷'B÷–çB7W&f6Râg&÷¦Vâ'V–ÆG2Væ6†ævVBà ¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçC²&ööb—2Fö7VÖVçFF–öâÖöæÇ’â'V–ÆC“#’6ö×ÆWFP¦æB&VG’f÷"''W6‚6WGF–æw2(i"ÆöBÇ†ä~(šC#Sl+"ó#Sd¶”"Â&÷FFR÷–çBö÷fW&Æ¤W&6W"ÂVæFõ&VFòæB6öçF–çVVB–çF–ærÂ&÷VæBF—Â6fT÷VâöW‡÷'B&WF–æVBÖ&·2à¥W6W#“#…52&÷FV7FVC³“#’f—6–&ÆRõVæ6–Â÷–6¶W"öÆFVæ7’66WFæ6R&VÖ–ç2VæF–ærà¥&VfÆV7F–öâ&Wf–Wr–æFWVæFVçFÇ’Vç&W6öÇfVC²æF—fRW‡÷'G26÷'&V7BâæW‡BÇ†¦fVVF&6²F†VâUb×6fR&ÇW"÷6×VFvS²òæBVFvR6VÒVF—G2VWVVBÂæ÷B–×ÆVÖVçFVBà ¢22ã“3(	B6öÆ–Bö&¦V7BÖÖöFRF—7Æ’ÂæòÖöFVÆÆ–ær6vR(	B#ö7Fö&W"##` ¥W6W"&WVW7G2&VÖ÷f–ærF†RF—7G&7F–ærö&¦V7BÖÖöFR‚×&’ÂW7V6–ÆÇ’v†–ÆR–çF–ærà¤VF—B7W'&VçCf6Sc&fS2òã“#“¢Ö–âFD6vRW6W2FWF…FW7C¦fÇ6RæWWG&Â†—2ÖÆ–æRÖFW&–À¦f÷"WfW'’6VÆV7FVBö&¦V7BVFvRÂG&vâ÷fW"6öÆ–B&öG’÷–çBâ7GVÂd”Ur‚Õ&’—2§6W&FRW‡Æ–6—BF–væ÷7F–2ÖöFS²Fòæ÷B6öægW6R—Bv—F‚F†—2WFöÖF–26vRà¤÷&–v–æÂ6vR&F6‚vWG2÷F–öæÂ6†÷tVFvW2†FVfVÇGG'VR“²Ö–â76W2fÇ6R–âö&¦V7BÀ§6†÷ufW'F–6W2&VÖ–ç2fW'FW‚ÖöæÇ’â7W&f6R6vRvVöÖWG'’ö&F6†W2&Ræ÷BÆÆö6FVC²—6öÆFVBÆö÷6RVFvW2&VÖ–à§f—6–&ÆRv—F‚÷&F–æ'’FWF‚×FW7FVBVFvTÖFW&–Â6òv—&RÖöæÇ’ö&¦V7G2Fòæ÷Bfæ—6ƒ°¦÷&–v–æÂ–çf—6–&ÆR–æFW†VBVFvR÷fW'FW‚–6¶–ær&÷†–W2ö'&–FvR&Vv—7G'’&VÖ–â–çF7Bà¤Ö—'&÷"6vR—2Ç6òöÖ—GFVB–âö&¦V7C²7F—fR7V$BæòÆöævW"WfÇVFW27&RÖ—'&÷&V@¦&6R6öÆVÇ’f÷"F†BöÖ—GFVBv—&Râ÷&–v–æÂWfÇVFVB7W&f6RæB—G2vVöÖWG'’66†P¦&RVæ6†ævVBâfW'FW‚ôVFvRôf6R&W7F÷&RF†V—"÷&–v–æÂ6vW2æBÖFW&–Âö÷&FW"÷6VÆV7F–öà§6VÖçF–72â6ÆVâõ6ögBÂ×VÇF’öw&÷WF–çG2Âv—¦Ö÷2Â†—7F÷'’Â''W6‚÷–çBöÖFW&–ÂöW‡÷'@¦÷væW'2VçF÷V6†VBâW‡Æ–6—Bd”Urv—&Rõ‚Õ&’ÖöFW2&WF–âFVÆ–&W&FRW6W"6öçG&öÂà¤æòg&ÖR×&FR÷"'&öBÖVÖ÷'’6Æ–Ó²&VÖ÷fVBf—7VÂ6vRG&w2öÆÆö6F–öâöæÇ’à ¥GvòæWræF—fRÖ÷væW"FW7G26÷fW"ö&¦V7N(iF6ö×öæVçBG&ç6—F–öç2Â'6VçBf—7VÂ&F6†W2À¦7GVÂF‡&VR&–67B&÷‡’”G2öF—7÷6ÂÂÖ—'&÷&VB7V$B&6RÖ6ÆÂ6÷VçG2æBW†7B6öÆ–@¦vVöÖWG'’âW†—7F–æsƒóƒSö&¦V7Bf—7VÂÖ6vRW‡V7FF–öâ&WÆ6VB'’æWrW6W"&WVW7C°¦ÆÂ6ö×öæVçB÷&÷‡’76W'F–öç2&WF–æVBâW†—7F–æsƒSóƒ’óƒ"&VæFW"f—‡GW&W2æ÷r7WÇ’F†V—"&VÂ6VÆV7F–öäÖöFSÒvf6Rp¦FWVæFVæ7“³ƒ’ö&¦V7BÆö÷6R×v—&RÖFW&–ÂW‡V7FF–öâföÆÆ÷w2F†RæWrFWF‚×FW7FV@§öÆ–7’ÂÆÂ6ö×öæVçBövVöÖWG'’öÖWFFFöVçVÖW&F–öâ76W'F–öç2&WF–æVBâæò&öGV7F–öà¦fÆÆ&6²÷"vV¶VæVB66†R÷F–Ö–ær6†V6·2à¤fö7W6VB6vRö66†R÷F–Ö–ær÷&VÆV6S#•52æBV&Æ–W"–çBÖ†—7F÷'’÷F–çBö6vS#E52à¤ÆVv7“ƒ’Æö÷6R×v—&Ræ÷&ÖÆ—¦F–öâ–ç7V7G24ÄôäS¢÷&–v–æÂÆö÷6RVFvW2‚’6âF@¦—G2†—7F÷&–6Âf6W5²ÓÒ6VçF–æVÂâ÷&–v–æÂ6÷W&6R×&W6W'fF–öâ76W'F–öâ&WF–æVBà¤öæÇ’Ö–âö6vR&F6‚æB6†VÆÂ÷&V6÷fW'’66†S“3²×VÇF“ãög&÷¦VâVæ6†ævVBâÇ†“#¦ÖçVÂvFRæ÷B–æfW'&VB52â&VfÆV7F–öâ&Wf–Wr–æFWVæFVçFÇ’Vç&W6öÇfVC²W‡÷'G26÷'&V7Bà¤æW‡BDUd”4Rö&¦V7B÷&&—B÷–çBæòF‡&÷Vv‚Ö6vS²6ö×öæVçB6vW2&WGW&ã²×VÇF’öv—¦Öòæ@¥–çBVæFõ&VFò7F’–çF7BâF†Vâ&W7VÖRÇ†fVVF&6²õUb×6fR&ÇW"÷6×VFvS²ò÷6V×2VWVVBà¤gVÆÂfÆ–FF–öâ÷V&Æ–6F–öâföÆÆ÷w3²æò&VæFW&VBö•B&ööb–æfW'&VBg&öÒæöFRà ¢Ò·…Òã“3¢6VÆV7FVBö&¦V7B7F—26öÆ–Bv—F†÷WBWFöÖF–2F‡&÷Vv‚ÖÖW6‚6vS²÷&&—BæB–çBà¢Ò·…Òã“3¢fW'FW‚ôVFvRôf6R&W7F÷&R6vW3²&WGW&âö&¦V7B†–FW2F†VÒÂ–æ6ÇVF–ærÖ—'&÷'2õ7V$Bà¢Ò·…Òã“3¢ö&¦V7B×VÇF’6VÆV7F–öâöv—¦ÖòæB–çBVæFõ&VFòö6öçF–çVR&VÖ–âW6&ÆRà ¢ã“3f–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£"ÃcSB52òd”Âò6¶—VB¢¢à¤fö7W6VBæF—fR6vRö66†R÷F–Ö–ær÷&VÆV6S#•53²÷&–v–æÂ7W&f6R÷&÷‡’öÖWFFFÀ¦†—7F÷'’÷–çBöÇ†ö–ÖvRöæF—fRW‡÷'B76W'F–öç2&WF–æVBâöæÇ’7WW'6VFVBö&¦V7@§f—7VÂ6vRæBFWF‚×FW7FVBÆö÷6R×v—&RW‡V7FF–öç26†ævVBâ×VÇF“ãög&÷¦Vâ–çF7Bà¥V&Æ–6F–öâö†÷7FVBöÆ—fRfW&–f–6F–öâföÆÆ÷w3²•BF—7Æ’66WFæ6RVæF–ærà ¢22ã“3V&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRFVf&CV#s–#ƒ“cfVc6†SCs–#–Sf&6SFcc6ÂFW7FVBG&VP¦CC#3F&f#s6ScCfcSV#““3vcfcƒC–Vf##FÂ—2V&Æ—6†VBâ6öææV7FVBv—BFF§WÆöFVBÆÃ2W†7BÆö6Â&Æö'2÷G&VS²fWF6†VBÖ–â†2–FVçF–6ÂFW7FVBf–ÆW2à¤Æö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“C##cBö¦ö#ƒSƒ“sS“2&÷F‚70¢¢£"ÃcSBFW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆöw2fW&–f–VBâvW0£3“C#“CcröFWÆ÷“ƒSƒ“3ƒ“3#B6ö×ÆWFVB7V66W76gVÆÇ’âÆÃ6†V6¶VBg&W6‚Æ—fP¦f–ÆW2'—FRÖÖF6ƒ¢6†VÆÂ÷fW'6–öâÂÖ–âö6vR&F6‚Â&V6÷fW'’Â&÷FV7FVB×VÇF“ãæ@§Væ6†ævVB–çFW"÷&7FW"÷&VæFW"öÖFW&–Â7W&f6Râg&÷¦Vâ'V–ÆG2Væ6†ævVBà ¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçC²F†—2&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’â'V–ÆC“3 ¦6ö×ÆWFRæB&VG’f÷"ö&¦V7BÖÖöFR6öÆ–B÷&&—B÷–çBv—F†÷WBWFöÖF–2F‡&÷Vv‚Ö6vRÀ¥fW'FW‚ôVFvRôf6R6vR&W7F÷&F–öâÂö&¦V7B&WGW&âæB–çBVæFõ&VFòö6öçF–çVVBÖ&·2à¤Æö÷6Rv—&RvVöÖWG'’&VÖ–ç2FWF‚×FW7FVC²÷&–v–æÂ–6¶–ærö'&–FvRö66†R÷væW'2–çF7Bà¤æòÖV7W&VBe26Æ–Ò÷"&VæFW&VB•B66WFæ6R–æfW'&VBâW6W#“#…52&÷FV7FVC°£“#’Ç†vFR&VÖ–ç2VæF–ærâ&VfÆV7F–öâ&Wf–Wr&VÖ–ç2–æFWVæFVçFÇ’Vç&W6öÇfVC°¦æF—fRW‡÷'G26÷'&V7Bâ&W7VÖRÇ†fVVF&6²F†VâUb×6fR&ÇW"÷6×VFvS²ò÷6V×2VWVVBà ¢22ã“3(	B&ÇW"v—F†–â÷&–v–æÂöÇ–vöâf6W3²ã“3W6W"52(	B#ö7Fö&W"##` ¥W6W#“352&÷FV7G26öÆ–Bö&¦V7BF—7Æ’ö6ö×öæVçB6vW2æB–çBö†—7F÷'’âVF—@¦Ö–æ–c&C¢÷&–v–æÂUb–ç7V7F÷"÷vç2—6ÆæG2ÂW‡÷'FW"÷vç2G&–ævÆRVÖ—76–öã°¦æòæV–v†&÷W"''W6‚W†—7G2âf—'7B&ÇW"6Æ—2$õD‚&VG2æBw&—FW2Fò–6¶VBöÇ–vöà¦f6S²æWfW"6×ÆW2F¦6VçBFÆ2f6W2â÷&–v–æÂ&Wf–Wr'V–ÆFW"v–ç2÷BÖ–âg&÷¦Và§G&–ævÆ^(i'6÷W&6RÖf6RÖWFFFg&öÒ—G2W†—7F–ærVÖ—76–öâÆö÷†w&÷W÷&FW"&WF–æVB’à¤FVfVÇB&Wf–Ww2öW‡÷'B'—FW2Væ6†ævVBâ–çFW"&WVW7G2Ö²æWr6ÖÆÂf–ÇFW"ÖFöÖ–à§&7FW"Æ&VÇ2÷&–v–æÂvVöÖWG'’ÃS,+"Ã$Ò66ææVB'VFvWBâ6×ÆVB–çFW&–÷"÷fW&Æ2À¦÷WBÖöb×F–ÆRöFVvVæW&FR÷Vç7W÷'FVBUg2&VgW6RFöÖ–6ÆÇ“²Ö&–wV÷W2&÷&FW'2W†6ÇVFVBà¤æòæWrG&–æwVÆF–öâ÷6–væGW&RõUbVF—F÷"ö–çWBö†—7F÷'’÷&W6÷W&6R÷w&—FW"÷væW"à ¥FööÂ&ÇW"+rv—F†–âf6RW6W2÷&–v–æÂ&7FW"Â6×ÆW'2Â&–67BæB6öÖÖ—B÷&öÆÆ&6²à¤f—†VBf—fR×F6VçG&SBö6&F–æÃ6Öö÷F†–æröb7G&ö¶R×7F'B—†VÇ3²f6RÖöæÇ’&VG2æ@§w&—FW2Â&Væ÷&ÖÆ—¦VB6Æ—VBvV–v‡G2âÖ†–×VÒW"Ö6öçF7B6÷fW&vRö÷6—G’&WF–æVC°¦Æ–gB÷&WVBf÷"7G&öævW"6Öö÷F†–ærâ6ÖR6—¦R÷&W77W&Rö†&FæW72öÇ†F—2âG&ç7&Vç@¦Æ–W'2W6R&V×VÇF—Æ–VB$t$f–ÇFW&–ærö–çFW'öÆF–öâFòfö–B†–FFVâÖ6öÆ÷W"†Æ÷3°§66Æ"öÖ6²&rfÇVW27F’–æFWVæFVçBâ6öÆ÷W"–6¶W"–væ÷&VBöF—6&ÆVBâ&6RöÆ–W'2ð¦Ö6·2õ&÷Vv†æW72ôÖWFÆæW72v÷&³²&WF–æVB–ÖvR6öÆ÷W"&VÖ–ç2&VBÖöæÇ’âæò7&÷72Öf6P¦÷"6VÖÆW72÷v÷&ÆB×&F—W26Æ–ÒÂæò6×VFvR–WBâ÷&–v–æÂ66VæR6†V6·ö–çBô4õr÷ööÇ2À¥6fT÷VâôäôÒôtÄ"æB–çB†—7F÷'““#‚&VÖ–ã²FöÖ–ãÖ”"÷6W76–öâ³Ö”"ö6öçF7B—2G&ç6–VçBà¥&VBFö72÷–çBÖ&ÇW"Ó“3æÖBâf—fRæWr&Vw&W76–öç2²æV&'“#Ó#e53²&VÆV6SU53°¦gVÆÂ÷V&Æ–6F–öâ&VÆ÷râ6ö×ÆWFR6†ævVBÖ–âöW‡÷'BôÆ"&WfW'6RÆöFW"w&ƒ“3°¤×VÇF“ãög&÷¦VâæB66WFVC“3Ö–âö6vR'—FW2Væ6†ævVBâÇ†“#’FWf–6RvFRæ÷@¦–æfW'&VB52â&VfÆV7F–öâ&VÖ–ç2Vç&W6öÇfVC²æF—fRW‡÷'B&÷FV7FVBâæW‡BDUd”4P¦†&BÖVFvVBÖ&¾(i$&ÇW"''W6‚öÆ–gB÷&WVBÂ÷fW&Æ’—6öÆF–öâÂVæFõ&VFòö6öçF–çVRÂF†Và§6–Ö–Æ&Ç’&÷VæFVB6×VFvRâòæBVFvR×6VÒVF—G2&VÖ–âVWVVBÂæ÷BFVÆ—fW&VBà ¢Ò²Òã“3¢†&BÖVFvVBÖ&²(i"FööÂ&ÇW"v—F†–âf6RÂ6—¦RÆ&vW"F†âÖ&²Â''W6‚VFvRöÆ–gB÷&WVBà¢Ò²Òã“3¢÷fW&Æ’&ÇW"¶VW2&6S²Ö6²÷66Æ"&ÇW"VF—G2öæÇ’6VÆV7FVBF&vWBà¢Ò²Òã“3¢VæFõ&VFò7F—2–â–çC²&WGW&â''W6‚Â6fT÷VâæBæF—fRW‡÷'B&WF–â&W7VÇG2à ¢ã“3f–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£"ÃcS’52òd”Âò6¶—VB¢¢à¤æWr&ÇW#R²æV&'“#Ó#e52Â&VÆV6SU53²æòW†—7F–ær76W'F–öç2&VÆ†VBà¤FVfVÇBW‡÷'B÷&Wf–WrvVöÖWG'’æB66WFVC“3Ö–âö6vR÷&÷FV7FVB×VÇF’ög&÷¦Vâ'—FW0§Væ6†ævVBâV&Æ–6F–öâö†÷7FVBöÆ—fRfW&–f–6F–öâföÆÆ÷w3²7GVÂ•B&ÇW"vFRVæF–ærà ¢22ã“3V&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR##fF3–&F#C#CƒS&#–CƒFVS“V6#ƒsƒV#“SvÂFW7FVBG&VP¦VC##ssf3S“S3Vf&fV&CC3VC3“†3svCS–S“vÂ—2V&Æ—6†VBâ6öææV7FVBv—BFF§WÆöFVBÆÃrW†7BÆö6Â&Æö'2÷G&VS²fWF6†VBÖ–âÖF6†W2FW7FVB6÷W&6Rà¤Æö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“Cc3“3rö¦ö#ƒccS3SR&÷F‚70¢¢£"ÃcS’FW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆöw2fW&–f–VBâvW0£3“Cc3“s’öFWÆ÷“ƒcc33s36ö×ÆWFVB7V66W76gVÆÇ’âÆÃ‚g&W6‚6†V6¶VBÆ—fP¦f–ÆW2'—FRÖÖF6ƒ¢6†VÆÂ÷fW'6–öâÂWfW'’6†ævVB'VçF–ÖRöW‡÷'BôÆ"÷væW"ÂæWrf–ÇFW ¦FöÖ–âÂ&V6÷fW'’Â66WFVC“3Ö–âö6vRÂ&÷FV7FVB×VÇF“ãæB&WF–æVB–çB7W&f6Rð¦W‡÷'Bö–ÖvR&ö¦V7F÷"âg&÷¦Vâ'V–ÆG2Væ6†ævVBâæò76W'F–öç2&VÆ†VBà ¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçC²F†—2&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’â'V–ÆC“3¦6ö×ÆWFRæB&VG’f÷"FööÂ&ÇW"v—F†–âf6Röâ†&BÖVFvVB–çFVBÖ&²ÂÆ&vW ¥6—¦RÂÆ–gB÷&WVBf÷"7G&öævW"6Öö÷F†–æs²÷fW&Æ’ö6†ææVÂ—6öÆF–öâæBVæFõ&VFò7F¦–â–çBÂ&WGW&â''W6‚æB6öçF–çVRâ6fT÷VâöæF—fRW‡÷'B&WF–ç2&W7VÇG2âW6W#“3 ¥52&÷FV7FVC²7GVÃ“3V&æ6RõVæ6–ÂfVVÂöÆFVæ7’æC“#’Ç†vFRVæF–ærà¤æò&VæFW&VBö•BW&f÷&Öæ6R6Æ–Òâ&VfÆV7F–öâ&Wf–Wr–æFWVæFVçFÇ’Vç&W6öÇfVC°¦æF—fRW‡÷'G26÷'&V7BâæW‡B&ÇW"fVVF&6²F†Vâ&÷FV7FVB6×VFvS²ò÷6V×2VWVVBà ¢22ã“3"(	B6öææV7FVBÖf6R&ÇW"6×Æ–æs²ã“3W6W"52(	B#ö7Fö&W"##` ¥W6W"52&÷FV7G2ã“3&ÇW"æB&–÷"ã“36öÆ–Bö&¦V7BF—7Æ’âVF—BÖ–ãVs“Sƒ ¦÷&–v–æÂUb–ç7V7F÷"Ç&VG’÷vç2öÇ–vöâVFvW2ÂW‡÷'FW"÷vç2G&–ævÆRVÖ—76–öã°§&WW6R&÷F‚f–÷F–öæÂVFvT÷væW'2æB÷&–v–æÂfW'FW‚”G2âFVfVÇB&W÷'G2övVöÖWG'’ð¦W‡÷'G2Væ6†ævVBâæWr6ÖÆÂ&VBÖöæÇ’6VÒÆâVæföÆG2÷&–v–æÂG&–ævÆRæV–v†&÷W'0¦7&÷72&VÂÖæ–föÆBVFvW2ÂÖ–ær–çFòFWF6†VB÷&÷FFVBöÖ—'&÷&VBUb—6ÆæG2âFÆ0§&÷†–Ö—G’æWfW"6öææV7G2f6W2â–çFW&æÂF–vöæÇ2W6RF†R6ÖR÷&–v–æÂVÖ—76–öâà¤f—†VB6VçG&SBö6&F–æÃ7G&ö¶R×7F'B&ÇW"æ÷r&VG2ÖVB6öææV7FVBÖf6RFW†VÇ2à¥w&—FW2&VÖ–â6Æ—VBFò–6¶VBf6S¢7G&ö¶R$õD‚6–FW2öbVFvS²''W6‚fö÷G&–çBFöW0¦æ÷Bw&WFöÖF–6ÆÇ’âæòv÷&ÆB×&F—W2ögVÆÂ6VÖÆW72Öfö÷G&–çB6Æ–ÒÂæò6×VFvRà¤&÷VæF'’öæöæÖæ–föÆBöÖ&–wV÷W26÷&æW"öÆöærvÆ·26Æ—²–çfÆ–B÷7FÆR÷væW'6†—æ@¦W†—7F–ær÷fW&Æ–æröFVvVæW&FRö÷WBÖöb×F–ÆRö6ö×ÆW‚Ub&VgW6Ç27F’FöÖ–2âÖƒ€¦7&÷76–æw2÷6×ÆRæC$ÒvÆ²7FW3²Æ§’6W76–öâÆãS,+"Æ&VÇ3Ö”"¶Æ–æ·3DÖ”"À§FV×÷&'’G&–ævÆRÖÖ”#²÷væVB6öçF7B6÷–W3TÖ”"ÇW2÷&–v–æÂ7G&ö¶R'VffW'2à¥&V×VÇF—Æ–VB6öÆ÷W"Ç†Â&rÖ6·2÷66Æ'2Â6VB6÷fW&vRÂ÷&–v–æÂÇ†F—2À¦–çWB÷&–67Bö†—7F÷'’ô4õrõ6fT÷VâôäôÒôtÄ"÷væW'2&WF–æVBâT’6—26öææV7FVBf6W0¦æBW‡Æ–6—FÇ’6·27G&ö¶W2÷fW"&÷F‚6–FW2âæòÖöFVÆÆ–ærõUbWF†÷&–ær¶W&æVÂFFVBà¤f—fRæWrFW7G26÷fW""föÆB÷&÷FF–öâöÖ—'&÷"Æ–÷WG2ÂF—66öææV7FVBFÆ2FV6÷’À¦æöæÖæ–föÆB÷7FÆRÖWFFFÂW†7B&7FW"Ç†ö6æ6VÂæB7GVÂTž(i&†—7F÷'ž(i%6fT÷Vî(i ¦W†7BæF—fRärâfö7W6VC#52–æ6Â&VÆV6SS²gVÆÂ÷V&Æ–6F–öâ&VÆ÷râ6ö×ÆWFR6†ævV@§&WfW'6RÆöFW"w&‚&W–ææVC“3#²&WF–æVBÖ–âö6vRô×VÇF“ãög&÷¦Vâ'—FW2Væ6†ævVBà¥&VBFö72÷–çB×6V×2Ó“3"æÖBâFWf–6S“3"6VÒV&æ6RöÆFVæ7’VæF–æs²Ç†“#’vFP¦æ÷B–æfW'&VBâ&VfÆV7F–öâ&Wf–Wr–æFWVæFVçFÇ’Vç&W6öÇfVC²æF—fRW‡÷'G2&÷FV7FVBà¤æW‡BFWf–6RfVVF&6²F†Vâ&÷VæFVB6×VFvRF‡&÷Vv‚÷&–v–æÂ–çB÷væW#²òæBUb6VÐ¤UD„õ$”är&VÖ–âVWVVBâ6VÒ6×Æ–ær—2æ÷B6VÒWF†÷&–ærà ¢Ò·…ÒW6W"ã“353¢v—F†–âÖf6R&ÇW"Â÷&–v–æÂ–çBö†—7F÷'’æBã“36öÆ–Bö&¦V7BF—7Æ’&÷FV7FVBà¢Ò²Òã“3"FWf–6S¢–çBF–ffW&VçB6öÆ÷W'27&÷727V&RVFvRÂ&ÇW"7G&ö¶W2÷fW"&÷F‚6–FW2&ÆVæB6öææV7FVBf6W2FW7—FRUb7Æ—Bà¢Ò²Òã“3"FWf–6S¢Æ–gB÷&WVB7G&VæwF†Vç2ÂVæFòõ&VFò7F—2–â–çC²6fRô÷Vâ&WF–ç2&W7VÇBà¢Ò²Òã“3"FWf–6S¢&6RöÆ–W"öÖ6²÷66Æ"—6öÆF–öâÂVæ6–ÂfVVÂæBf—'7BÔ&ÇW"ÆFVæ7’66WF&ÆRà ¢ã“3"f–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£"ÃccB52òd”Âò6¶—VB¢¢à¤fö7W6VC#53²æòW†—7F–ær76W'F–öç2&VÆ†VBâ†÷7FVBõvW2öÆ—fRfW&–f–6F–öâföÆÆ÷w2à ¢22ã“3"V&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##` ¥'VçF–ÖRV&3ƒ#cC–CvCCv3fVC“–6C“sSV3VfFVC&ÂFW7FVBG&VP¦†fc#VCfS3ƒCC&#†3&3v3ƒ“ƒ“6C†c“FCS3CFFÂ—2V&Æ—6†VBöâÖ–âà¤6öææV7FVBv—BFFWÆöFVC#BW†7BÆö6Â&Æö'3²fWF6†VBÖ–âÖF6†W2FW7FVBG&VRà¤Æö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“CƒcSƒsö¦ö#ƒc3c“c“"&÷F‚70¢¢£"ÃccBFW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆöw2fW&–f–VBà¥vW33“CƒcSƒSBöFWÆ÷“ƒc3ƒcƒSs‚7V66VVFVBâÆÃ#"g&W6‚6†V6¶VBÆ—fRf–ÆW0¦'—FRÖÖF6ƒ¢6†VÆÂ÷fW'6–öâÂ6ö×ÆWFR6†ævVB'VçF–ÖRöW‡÷'BõUbôÆ"ÆöFW"w&‚À¦æWr6VÒ†VÇW"Â&V6÷fW'’Â66WFVBÖ–âÂ&÷FV7FVB×VÇF“ãæB&WF–æVB7W&f6Rà¤g&÷¦Vâ'V–ÆG2Væ6†ævVC²æò76W'F–öç2&VÆ†VBâÆÂf÷W"6öçF–çV—G’f–ÆW2WFFVBà ¤'V–ÆC“3"6ö×ÆWFRæB&VG’f÷"FW7F–æs¢–çBF–ffW&VçB6öÆ÷W'27&÷727V&RVFvRÀ¤&ÇW"7G&ö¶W2÷fW"$õD‚6–FW2ÂÆ–gB÷&WVBÂVæFõ&VFò7F’–â–çBÂ6fT÷Vâ&WF–ç2à¥F†—26öææV7G26×ÆR&VG27&÷72&VÂf6RVFvW2õUb6V×3²fö÷G&–çBFöW2æ÷Bw&à¥W6W#“352&÷FV7FVC²7GVÃ“3"Væ6–ÂfVVÂöV&æ6Röf—'7B×W6RÆFVæ7’VæF–ærà¤Ç†“#’FWf–6RvFR&VÖ–ç2–æFWVæFVçBâ&VfÆV7F–öâ&Wf–WrVç&W6öÇfVC²æF—fRW‡÷'G0¦6÷'&V7BâæW‡BfVVF&6²F†Vâ&÷VæFVB6×VFvRF‡&÷Vv‚÷&–v–æÂ÷væW#²ò÷6VÒWF†÷&–æp§&VÖ–âVWVVBâF†—2&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’Âæ÷BF†RfW&–f–VB'VçF–ÖRà ¢22ã“32(	B7W&f6R–ÖvRw&–æs²W6W"&–÷&—G’(	B#ö7Fö&W"##b„'&—6&æR ¥W6W"6·2–ÖvRÆ6VÖVçBFòw&6öææV7FVB7W&f6W2&F†W"F†â6Æ—BöæRf6Rà¤VF—BÖ–ã3cƒCSCSöÆ—fS“3#¢ã“"öâ7W&f6RföÆÆ÷w2æ6†÷"öæ÷&ÖÂ'WBfVVG2fÆ@¦÷'F†öw&†–2ã“&ö¦V7F÷"v—Fƒs\+f6–ær÷f—6–&–Æ—G’7WG3²æòw&–ær–ÖvR÷væW"à¤W‡FVæBF†B÷&–v–æÂFƒ²&W6W'fR6W&FR&ö¦V7Bg&öÒf–WrâW‡G&7BW†—7F–æs“3 §&VBÖöæÇ’G&–ævÆRw&‚–çFò–çB×G&–ævÆRÖw&‚æ§3²÷&–v–æÂUb–ç7V7F÷"öÇ–vöà¦VFvW2æBW‡÷'FW"f6R÷fW'FW‚ÖWFFF7F’WF†÷&—FF—fRâ&ÇW"W6W2W†7B6ÖRw&‚À¦W†—7F–ær6×ÆRvÆ²Væ6†ævVBâæòGWÆ–6FRF¦6Væ7’÷G&–æwVÆF–öâöÖöFVÆÆ–ær¶W&æVÂà ¤öâ7W&f6R&WF–ç2&–67BG&–ævÆR–æFW‚v—F‚ö–çBöæ÷&ÖÃ²Ö÷fRWFFW2ÆÂF‡&VRà¥7W&f6R÷&–VçFF–öâ7F–ÆÂ–ç6W'Bw2÷&–v–æÂ†VÇW"âæWr–çBÖ–ÖvR×w&æ§26'&–W2¦Æö6Â–ÖvR6†'B÷fW"&VÂÖæ–föÆBG&–ævÆRæV–v†&÷W'2ÂVæföÆF–ær6öÖÖöâVFvW2v—F€§v÷&ÆBÆVæwF‡2æB÷÷6—FR×6–FRF†—&BfW'FWƒ²Ö–Gö–çBö6VçG&ö–BF—7Fæ6RVWVR6†ö÷6W0¦öæR&÷WFRW"G&–ævÆRâ&V6öæ6–ÆR6†&VB6æöæ–6ÂfW'FW‚6ö÷&F–æFW2Fòfö–B7&6·0¦BÆö6Â7–6ÆR6Æ÷7W&W3²6VVBG&–ævÆR–ææVBâ7W'fVBö6Æ÷6VBF6†W2æV6W76&–Ç’7G&WF6ƒ°¦æ÷BvÆö&ÆÇ’F—7F÷'F–öâÖg&VR7†W&–6ÂVçw&â7F÷2W‡æF–ær÷WG6–FR–ÖvR&V7FævÆRÀ£#²G&–ævÆW2ó#²VWVR×÷6â&÷VæF&–W2öæöæÖæ–föÆBöF—66öææV7FVB6ö×öæVçG26Æ—°¦æò6ö÷&F–æFRvVÆF–ær÷"FÆ2F¦6Væ7’â÷&–v–æÂã“Ub&7FW"÷6÷W&6RÇ†6×Æ–ærÀ¦÷fW&Æ÷F–ÆRó$Ò66â'VFvWG2æB7F6²÷ööÂö†—7F÷'’öW‡÷'B÷væW'2&VÖ–ââw&VB6×ÆW0¦föÆÆ÷r6öææV7FVBF&vWB7W&f6W2&÷VæB6÷&æW'2WfVâv†Vâæ÷Bg&öçBÖf6–ær÷f—6–&ÆRg&öÐ¦æ6†÷"&ö¦V7F÷#²–6¶VBæ6†÷"7F–ÆÂö&W—2÷&–v–æÂf—6–&ÆR×F&vWBöö66ÇW6–öâ†—BwV&Bà¤fÆB&ö¦V7Bg&öÒf–Wr&WF–ç2÷&–v–æÃs\+÷66VæR÷6VÆbö66ÇW6–öâó3Ò&’×v÷&²'VÆW2à ¤W†—7F–ær6öçF7BFævVçBwV–FR&VÖ–ç2Ææ#²Æ–gBWFFW2W†7Bw&VBÖW6‚&Wf–Wrà¤Ç’&V6ö×WFW27W'&VçB6æF–FFRF†Vâ6öÖÖ—G2ôäR÷&–v–æÂ6†V6·ö–çBô4õrâ6æ6VÂÀ¦6Æ÷6RÂ&öG’Æ÷72ÂÆ–W"÷F&vWB6†ævRæB&VgW6Â&W6W'fR6öÖÖ—GFVB&W6÷W&6Rö†—7F÷'’à¥6÷W&6R÷&7FW"&WF–æVBFövWF†W"F‡&÷Vv‚÷&–v–æÂ&V6—Rö6öFV3¢æò66†VÖö'VFvWB–æ7&V6Rà¤–çFW&7F—fRw&6†'Böæ6†÷"—2G&ç6–VçBÂ3“#¢VF—B–Öv^(i$öâ7W&f6R&W–6·2æ6†÷#°¦öÆBfÆBÖG&—‚ÆöæR6ææ÷B&VvVæW&FRw&VB6†'Bâ6fVB—†VÇ2öæF—fRW‡÷'G0§&WF–âW†7Bw&–æs²æWfW"WFò×&7FW&—¦R&WF–æVB6÷W&6Rg&öÒF†BÖG&—‚öâ÷Vâà ¥6—‚æWr&Vw&W76–öç3¢W†7B7–ÖÖWG&–2—†VÇ27&÷72fÆBöö&Æ—VRó“+²Ö—'&÷&VBUg2À¦F—66öææV7FVBöæöæÖæ–föÆBW†6ÇW6–öç2Â÷&–v–æÂf–Wr'VÆW2÷7FÆRæ6†÷"õUb&VgW6ÂÀ§G&ç6f÷&ÖVBg&ÖR÷&÷FF–öâ÷66ÆRÂ7GVÂT’G&röçFòæ÷F†W"f6Rö6æ6VÂö7–6Æ^(i$Çž(i ¦†—7F÷'ž(i%6fT÷Vî(i&W†7BæF—fRärÂ7†W&RöFVæ–VB6†V6·ö–çBæB6†&VB×fW'FW‚6öçF–çV—G’à¤fö7W6VB–ÖvR·6VÓ#U52æB&VÆV6SU53²gVÆÂ÷V&Æ–6F–öâföÆÆ÷w2â6ö×ÆWFR6†ævV@§&WfW'6RÆöFW"w&ƒ“32Â&WF–æVBW‡÷'FW"ö–ç7V7F÷"öÖ–âö6vRô×VÇF’ög&÷¦VâVæ6†ævVBà¤æó“3"FWf–6R52–æfW'&VBâFWf–6S“32w&V&æ6R÷7G&WF6‚öf—'7B×W6RÆFVæ7’VæF–ærà¥&VBFö72÷–çBÖ–ÖvR×w&Ó“32æÖBâ–æFWVæFVçB&VfÆV7F–öâ&Wf–WrVç&W6öÇfVBà ¥VæF–ærW6W"&WVW7G2W‡Æ–6—FÇ’&WF–æVC¢7G&öævW"&ÇW"Ö÷VçB÷&F—W26W&FRg&öÐ¦÷6—G“²–ÖvR&7FW"6öçfW'6–öâöVF—F&ÆR&ÇW#²ÖW&vRF÷vâôfÆGFVâv—F‚&ÆVæBöÖ6°¦V&æ6R&W6W'fVC²7FvVBFW‡GW&Rö–ÖvRöÇ†&W6öÇWF–öâæBÆ–W"Ö6÷VçB6†ö–6W0§v—F‚ÖVÖ÷'’'VFvWG2â7W'&VçCS,+"–çFVBÖ2Ã#L+"6÷W&6W2Ã#Sl+"F—2Æ&6R³2÷fW&Æ—0§Væ6†ævVBâ6×VFvRôòõUbVFvR×6VÒWF†÷&–ærVWVVC²F†—2—2–ÖvRw&–æröæÇ’à ¢Ò²Òã“32FWf–6S¢´–Öv^(i$öâ7W&f6S²Æ6RæV"7V&RVFvRÂÆ–gBÂ÷&&—BFò6VR–ÖvR6öçF–çVRöçFòF¦6VçBf6Rà¢Ò²Òã“32FWf–6S¢Ö÷fRæ6†÷"öçFòæW‡Bf6S²FÖ7–6ÆR&÷FFRõ66ÆRÂÆ–gC²–ÖvR&VÖ–ç2w&VBâG'’7†W&RF6‚f÷"66WF&ÆR7W'fGW&R÷7G&WF6‚à¢Ò²Òã“32FWf–6S¢Çž(i%VæFòõ&VFòÂ6fRô÷Vâ&WF–ç2w&–æs²VF—B–Öv^(i$öâ7W&f6R&W–6·3²6æ6VÂ&W6W'fW26öÖÖ—GFVB–ÖvRà ¢ã“32f–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£"Ãcs52òd”Âò6¶—VB¢¢à¥6—‚æWr6†V6·2²æV&'“’Ó#U53²&VÆV6SU52âæòW†—7F–ær76W'F–öç2&VÆ†VBà¥V&Æ–6F–öâö†÷7FVBöÆ—fRfW&–f–6F–öâföÆÆ÷w3²7GVÂ•C“32vFRVæF–ærà ¢22ã“32V&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR#ƒFc#“#3f3fƒSvff3Cv&CVFCC“s3s3#33vÂFW7FVBG&VP¦C#–FFcC#csccS&#sffV#ƒ–33C†V3SVF&c–#&Â—2V&Æ—6†VBöâÖ–âà¤6öææV7FVBv—BFFWÆöFVC’W†7BÆö6Â&Æö'3²fWF6†VBÖ–âÖF6†W2FW7FVBG&VRà¤Æö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“S3#ƒ2ö¦ö#ƒ“#“3““#s"&÷F‚70¢¢£"ÃcsFW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆöw2fW&–f–VBà¥vW33“S3CöFWÆ÷“ƒ“#“Sƒ“sB7V66VVFVBâÆÃ#Bg&W6‚6†V6¶VBÆ—fRf–ÆW0¦'—FRÖÖF6ƒ¢6†VÆÂ÷fW'6–öâÂ6ö×ÆWFR6†ævVB–ÖvRô&ÇW"&WfW'6RÆöFW"w&‚À¦æWr6†&VBw&‚÷w&6†'BÂ&V6÷fW'’ÂÖ–âö6vRÂ&÷FV7FVB×VÇF“ãæB&WF–æV@¦W‡÷'FW"õUb–ç7V7F÷"÷&7FW"ö–ÖvR×6÷W&6R÷&V6—R÷væW'2âg&÷¦Vâ'V–ÆG2VçF÷V6†VC°¦æò76W'F–öç2&VÆ†VBâÆÂf÷W"6öçF–çV—G’f–ÆW2WFFVBà ¤'V–ÆC“326ö×ÆWFRæB&VG“¢´–Öv^(i$öâ7W&f6RÂÆ6RæV"7V&RVFvRÂÆ–gBæB÷&&—@§Fò–ç7V7B6öçF–çVF–öââG&röçFòæW‡Bf6S²&÷FFR÷66ÆRÂÆ–gC²G'’7W'fVBF6‚à¤Çž(i%VæFõ&VFòÂ6fT÷Vâ&WF–ç2W†7B&W7VÇBâ6öçF7BwV–FR7F—2Ææ#²w&V@¦ÖW6‚&Wf–WrWFFW2öâÆ–gBâ–çFW&7F—fR6†'B&VÖ–ç2G&ç6–VçC²VF—B–Öv^(i ¤öâ7W&f6R&W–6·2Â3“"â7W'fGW&RöÆ&vR6Æ÷6VBF6†W26â7G&WF6‚÷&V6‚&÷VæF'’à¤æòFWf–6S“32V&æ6RöÆFVæ7’52–æfW'&VC³“3"&ÇW"æC“#’Ç†vFW2VæF–ærà¤æW‡B7G&öævW"&ÇW"Â–ÖvR6öçfW'6–öâö&ÇW"ÂÖW&vRôfÆGFVâÂ&÷VæFVB&W6öÇWF–öâöÆ–W ¦÷F–öç3²6×VFvRôò÷6VÒWF†÷&–ær&VÖ–âVWVVBâ&VfÆV7F–öâ&Wf–Wr–æFWVæFVçBà¥F†—2&ööb6†ævW2Fö7VÖVçFF–öâöæÇ“²fW&–f–VB'VçF–ÖR&VÖ–ç2'—FRÖ–FVçF–6Âà ¢22ã“3B(	B&ÇW"Ö÷VçC²ã“32W6W"52(	B#ö7Fö&W"##b„'&—6&æR ¥W6W#“3552&÷FV7G2–ÖvRw&–ær7&÷727V&RVFvW2õUb6V×2ÂÖ÷fRõ&÷FFRõ66ÆRÀ¤Ç’ö†—7F÷'’õ6fT÷VââVF—BÖ–ãccƒ†FSröÆ—fS“33¢÷&–v–æÂ–çBÖ6÷&R†2f—†V@¦6VçG&SBö6&F–æÃöæR×72&ÇW"Âæò7G&öævW"f–ÇFW"÷6Æ–FW"÷væW"âW‡FVæB÷&–v–æÀ§&7FW"öæÇ“²æòæWr''W6‚ÂF¦6Væ7’Â–çWBÂ†—7F÷'’Â&W6÷W&6R÷"w&—FW"–×ÆVÖVçFF–öâà ¤&ÇW"6†÷w2Ö÷VçC(	33"ÂFVfVÇC‚âÖ÷VçB&WVG2W†—7F–ær6Öö÷F†–ær¶W&æVÂ÷fW"F†P§7G&ö¶R×7F'B6æ6†÷C²÷6—G’Ö—†W2f–ÇFW&VBF&vWBv—F‚÷&–v–æÃ²6—¦R6öçG&öÇ2''W6€¦fö÷G&–çBâ6÷&Rf–ÇFW"æÖ÷VçBFVfVÇG3†ÆVv7’6ÆÇ2÷6WGF–æw2&VÖ–âfÆ–B’âÖ–à¥T’76W2÷F–öæÂ&ÇW$Ö÷VçC²6†&VB''W6‚FVfVÇG2ôÆ"6fVB6WGF–æw2öæF—fR66†VÖ0§Væ6†ævVBâW†—7F–ær÷&–v–æÂæV–v†&÷W"F&ÆR†æFÆW26öææV7FVBf6W2õUb6V×2öâWfW'§73²æòFÆ2ÖæV–v†&÷W"&VG2÷"æWrF÷öÆöw’Æââw&—FW27F–ÆÂ6Æ—Fò–6¶VBf6S §7G&ö¶R&÷F‚6–FW2âöæR×72W†7B66WFVBã“3òã“3"÷WGWG2&WF–æVC²7G&öær&ÇW §W6W2&V×VÇF—Æ–VB$t$F‡&÷Vv‚ÆÂ76W2‡&rÖ6·2÷66Æ'2&VÖ–â–æFWVæFVçB’à ¤6ö×WFRF&vWBöæ6Rö6öçF7BÂW6–ærGvò&÷VæFVBfÆöCcB$t$'VffW'2Fòfö–B&÷VæF–æp¦&WGvVVâ76W3²öæRF&vWB&WF–æVBf÷"6öçF7BâCS,+"V6‚'VffW#„Ö”"ÃdÖ”"f–ÇFW&–æp¦'VffW'2F÷FÃ²F&vWC„Ö”"&WF–æVBÇW2W†—7F–ær&Vf÷&Rö6÷fW&vRöFöÖ–â÷ööÂ&W6÷W&6W2à¥Væ–f÷&Ò6÷W&6W26†÷'F7WC²÷6—G“6¶—2f–ÇFW&–ærâÖƒ3"£S,+"FW†VÂf—6—G2Âæð§W"ÖF"&WVFVBf–ÇFW&–ær÷"Væ&÷VæFVBfVVF&6²â6÷fW&vR&VÖ–ç2Ö‚ö6öçF7C°¦Æ–gB÷&WVBf÷"Ö÷&Râf–æ—6‚ö6æ6VÂöF—7÷6RG&÷2F&vWC²fÆ–FF–öâ&V6VFW26öçF7@§7FFRV&Æ–6F–öââÖ÷VçB–çWB6æ6VÇ2–âÖfÆ–v‡Bv÷&²æBWFFW2W†—7F–ær&VF÷WC°¦÷&–v–æÂ–çB†—7F÷'’&V÷Vâ&WF–ç2FööÂöÖ÷VçBâ7W'&VçB6VÆV7FVBÆ–W"ö6†ææVÂöæÇ’à¤–ÖvR6öÆ÷W"7F—26÷W&6R×&W6W'fVB÷&VBÖöæÇ’VæF–ærW‡Æ–6—B–ÖvR6öçfW'6–öâà ¤f—fRæWr&Vw&W76–öç3¢æÇ—F–6ÂöæR÷Gvòó3"×72–×VÇ6RæB–æFWVæFVçB÷6—G“°¦Ç†÷&r66Æ"öFöÖ–âö–çfÆ–BöæòÖ÷ö6æ6VÃ²7G&öærföÆFVB×6VÒ6×Æ–ærW†6ÇVFW0¦FÆ2FV6÷’æBf"Öf6Rw&—FW3²7GVÂT’Æ÷rö†–v‚6ögFæW72ÂÖ÷VçBÖ6†ævR&öÆÆ&6²À¥–çBVæFõ&VFòæB6fT÷VâöW†7BæF—fRäs²66Æ"öÖ6²—6öÆF–öâö6†V6·ö–çB&VgW6Âà¤fö7W6VC#e52–æ6Âã“32w&–æsbæB–çBÖ†—7F÷'“S²&VÆV6SU53²gVÆÂ&VÆ÷rà¤æòöÆB76W'F–öç2&VÆ†VBâ6ö×ÆWFR6†ævVB&7FW"ôÆ"öÖ–â&WfW'6RÆöFW"w&ƒ“3C°¦66WFVC“32w&öw&‚öW‡÷'BõUb–ç7V7F÷"ÂÖ–âö6vRô×VÇF’ög&÷¦Vâ'—FW2Væ6†ævVBà¤FWf–6S“3B7G&VæwF‚öf—'7BÖ6öçF7BÆFVæ7’VæF–æs²æöFRF–Ö–æw2&Ræ÷B•BWf–FVæ6Rà¥&VBFö72÷–çBÖ&ÇW"ÖÖ÷VçBÓ“3BæÖBâ&VfÆV7F–öâ&Wf–Wr–æFWVæFVçFÇ’Vç&W6öÇfVBà¤æW‡B–ÖvR×Fò×–çB6öçfW'6–öâö&ÇW"ÂF†VâÖW&vRF÷vâôfÆGFVâÂ7FvVB&W6öÇWF–öç2öÆ–W ¦'VFvWG3²6×VFvRôòöVFvR×6VÒWF†÷&–ærVWVVBâ7W'&VçCS,+"ó#L+"ó#Sl+"ö&6R³2Væ6†ævVBà ¢Ò·…ÒW6W"ã“3252&÷FV7G26öææV7FVB7W&f6R–ÖvRw&–ærÂæW‡BÖf6RÆ6VÖVçBõ&÷FFRõ66ÆRÂÇ’ö†—7F÷'’õ6fT÷Vâà¢Ò²Òã“3BFWf–6S¢6ö×&RÖ÷VçCfW'7W33"öâ6ÖR–çFVBÖ&²…VæFò&WGvVVâ’Â÷6—G“S²†–v†W"Ö÷VçBf—6–&Ç’6ögFW"÷v–FW"à¢Ò²Òã“3BFWf–6S¢Æ÷vW"÷6—G’Ö—†W2ÆW73²6—¦R6†ævW2ffV7FVB&Vâf—'7B6öçF7BöÖ‚ÔÖ÷VçBÆFVæ7’66WF&ÆRà¢Ò²Òã“3BFWf–6S¢&ÇW"÷fW"&÷F‚6–FW2öb7V&RVFvRÂVæFòõ&VFò7F—2–â–çBv—F‚Ö÷VçB&WF–æVC²6öçF–çVR–çF–æræBw&VB–ÖvW2&VÖ–â–çF7Bà ¢ã“3Bf–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£"ÃcsR52òd”Âò6¶—VB¢¢à¤fö7W6VC#e52²&VÆV6SU53²æòW†—7F–ær76W'F–öç2&VÆ†VBâ†÷7FVBõvW2öÆ—fP§fW&–f–6F–öâföÆÆ÷w3²7GVÂ•C“3B7G&VæwF‚öÆFVæ7’vFRVæF–ærà ¢22ã“3BV&Æ–6F–öâ6Æ÷6VC²W6W"52(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖV&3ƒCCS6SscSCC#C“3†Sc#SC†CVV6cRÂFW7FVBG&VVSS–#&&36#–3S3ƒSC6cf&#ƒfC–S6FRÀ§V&Æ—6†VBâ†÷7FVBæöFS#"&Vw&W76–öã3“S##“C3Crö¦ö#ƒ“3ccs‚Æöw26öæf—&Ó#csU52ð£d”Âó6¶—ÂÖF6†–ær&V6÷&FVBÆö6ÂæöFS#B'VââvW33“S##“3C‚öFWÆ÷“ƒ“3c##S3s§7V66VVFVBâÆ—fS“3BÖæ–fW7BæBÆÃ#r6†V6¶VB'VçF–ÖR÷&÷FV7FVBf–ÆW2'—FRÖÖF6‚F†P§V&Æ—6†VC“3B6÷W&6R†v—B×6†÷r6æ6†÷BW6VBv†–ÆS“3Rv÷&¶–ærG&VRv2F—'G’’âW6W ¥53“3B&÷FV7G2FVF–6FVB&ÇW"Ö÷VçC(	33"öFVfVÇC‚Â–æFWVæFVçB÷6—G’õ6—¦RÂ&WF–æV@¥–çB†—7F÷'’æBV&Æ–W#“32–ÖvRw&–ærâ&–÷"–çFW''WFVBV&Æ–6F–öâ&ööb—2æ÷p¦6Æ÷6VC²æòæWs“3B'VçF–ÖR6†ævW2âÇ†“#’66WFæ6R&VÖ–ç2–æFWVæFVçFÇ’VæF–ærà ¢22ã“3R(	B–ÖvRFò–çB6öçfW'6–öã²ã“3B52(	B#ö7Fö&W"##b„'&—6&æR ¤VF—BÖ–æ&3ƒCCS2öÆ—fS“3C¢6÷W&6R×&W6W'fVB–ÖvR66†RæBW‡Æ–6—B—&VB&WÆ6VÖVç@¦W†—7C²æò&7FW"6öçfW'6–öââW‡FVæB÷&–v–æÂ–çBÖÆ–W"×7F6²v—F‚W‡Æ–6—@§&7FW&—¦T–ÖvU–çDÆ–W#¢fÆ–FFVB÷væVB6æ6†÷BÂ6ÖR7F6²÷fW'6–öâö÷&FW"ô”BöæÖRð§f—6–&–Æ—G’ö÷6—G’ö&ÆVæBöÖ6²÷—†VÇ3²ôäÅ’6VÆV7FVB–ÖvR&V6—R&V6öÖW2çVÆÂâW†—7F–æp¦6ö×÷6—F÷"fW&–f–W2–FVçF–6ÂV&æ6RÂ–æ6ÇVF–ærWfW'’7W÷'FVB&ÆVæBæB–çfW'FV@¦Ö6²âæò–×Æ–6—B6ö×÷6—F–ær–çFò&6RÂW‡G&Æ–W"Â&W6×Æ–ærÂæWrw&—FW"÷66†VÖÀ¦''W6‚Â†—7F÷'’ÂÖöFVÆÆ–ær÷"Ub÷væW"âW†—7F–ærF‡&VRÖ÷fW&Æ’óS,+"Æ–Ö—G2Væ6†ævVBà ¤–ÖvRÖöæÇ’6öçfW'BFò–çB'WGFöâW6W2÷&–v–æÂÆ–W$7F–öâ÷66VæR6†V6·ö–çB÷&VfÆ–v‡Bð¤4õr÷væW"â6öçfW'6–öâ6VÆV7G26öÆ÷W"WfVâv†Vâ–ÖvRÖ6²v26VÆV7FVC²''W6‚ÂW&6W"À¤f–ÆÂæB&ÇW"F†VâW6R÷&–v–æÂ&7FW"æB66WFVC“3BÖ÷VçBâ÷F†W"–ÖvRÆ–W'2¶VW §6÷W&6RVF—F–ærâ6ÖR—†VÇ2–æ6ÇVFS“32w&VBÆ6VÖVçBâVF—B–ÖvR'WGFöâF—6V'0¦'’÷&–v–æÂ7FFRv†Vâæò&V6—S²æÖR÷6Æ÷B&WF–æVBâVæFò&W7F÷&W2&WF–æVB6÷W&6Ræ@§Æ6VÖVçBVF—F–ærÂ&VFò&W7F÷&W2&7FW"6öçfW'6–öââgFW"6fRô÷Vâ6öçfW'FVBÆ–W"—0¦÷&F–æ'’VF—F&ÆR—†VÇ3²6÷W&6R&V6—R—6âwB6W&–Æ—¦VBf÷"F†BÆ–W"â÷F†W"ö&¦V7G0§6†&–æröÆB&W6÷W&6RæB÷&–v–æÂ6fVB–ÖvR6÷W&6W2&VÖ–âVæ6†ævVBâ6÷W&6R&VÆV6P§&VGV6W26öÖÖ—GFVB&W6÷W&6R'—FW3²VæFòÖ’7F–ÆÂ&WF–â—B–â&÷VæFVB66VæR†—7F÷'’à ¤&Æö6²6öçfW'6–öâv†–ÆR7FvVB–ÖvRÆ6VÖVçBW†—7G2Â¶VW–ær6æF–FFRö6öÖÖ—GFVBv÷&°¦–çF7C²Ç’ô6æ6VÂf—'7BâÖ—76–æröæöæ–ÖvR÷66Æ"÷7FÆRF&vWBö6†V6·ö–çB÷ööÂW'&÷'0¦ÆVfR6öÖÖ—GFVB&W6÷W&6W2ö†—7F÷'’VçF÷V6†VBâ&VBÖöæÇ’–ÖvRÖW76vR¶VW266WFV@¢t–ÖvR6öÆ÷W"—2&WF–æVBr&Vf—‚æBö–çG2Fò6öçfW'6–öââT’&WGW&â÷&W7VÇB&WW6VBf÷ ¦67W&FR7V66W727FGW2Âæò6W&FR–çWBöÆ—7FVæW"ö†—7F÷'’7—7FVÒâ7W'&VçB–çB7F—2à ¤f—fRæWrFW7G3¢ÆÂÖ&ÆVæBöÖ6²W†7BV&æ6RæB÷væVB'VffW'2ö'—FR66÷VçF–æs°¦7GVÂw&VB–ÖvRTž(i&6öçfW'N(i'7G&öær&ÇW.(i%–çBVæFõ&VFþ(i%6fT÷Vî(i&W†7BæF—fRäs°¦Ö6¾(i$6öÆ÷W"æB''W6‚ôW&6W"ögVÆÂ×7F6²ö÷F†W"Ö–ÖvR÷66Æ"&V†f–÷#²7FvVBöÖ—76–ær÷7FÆRð¦6†V6·ö–çB÷ööÂ&VgW6Ã²7FvVBT’VF—Bö6æ6VÂwV&BâæV&'““‚ó“32ó“3BæB&VÆV6SP§&VÖ–â7F—fS²gVÆÂ÷V&Æ–6F–öâ&VÆ÷râ6ö×ÆWFR6†ævVB7F6²÷&W6÷W&6R÷&ö¦V7BöW‡÷'Bð¤Æ"öÖ–â&WfW'6RÆöFW"w&ƒ“3S²gVæ7F–öæÂ6†ævR6öæf–æVBFò÷&–v–æÃ2÷væW'2à¤66WFVB&7FW#“3BÂw&“32õUböÖW6‚¶W&æVÇ2öÖ–âö6vRô×VÇF’ög&÷¦Vâ'—FW2Væ6†ævVBà¥&VBFö72÷–çBÖ–ÖvR×&7FW&—¦RÓ“3RæÖBâFWf–6S“3R6öçfW'6–öâö&ÇW"õVæFòfVVÂVæF–ærà¤æW‡BÖW&vRF÷vâôfÆGFVâF‡&÷Vv‚W†—7F–ær6ö×÷6—F÷"Fòg&VR6Æ÷G2ÂF†Vâ7FvVBFW‡GW&Rð§6÷W&6RöÇ†&W6öÇWF–öâæBÆ–W"'VFvWG2â6×VFvRôòõUbVFvR×6VÒWF†÷&–ærVWVVC°§&VfÆV7F–öâ&Wf–Wr–æFWVæFVçFÇ’Vç&W6öÇfVBâ7W'&VçCS,+"ó#L+"ó#Sl+"ö&6R³2&WF–æVBà ¢Ò·…ÒW6W#“3E52&÷FV7G2&ÇW"Ö÷VçBô÷6—G’õ6—¦RæB÷&–v–æÂ–çBö†—7F÷'’ÂÆöæw6–FS“32w&VBÆ6VÖVçBà¢Ò²Òã“3RFWf–6S¢6VÆV7BÆ–VB–Öv^(i$6öçfW'BFò–çC²V&æ6R÷Æ6VÖVçBVæ6†ævVBÂF†Vâ''W6‚ô&ÇW"Ö÷VçBVF—G2—Bà¢Ò²Òã“3RFWf–6S¢VæFòVF—G2F†Vâ6öçfW'6–öâ&W7F÷&W2VF—B–ÖvS²&VFò&WGW&ç26öçfW'FVB–çBÂ7F––ær–â–çBà¢Ò²Òã“3RFWf–6S¢6fRô÷Vâ&WF–ç26öçfW'FVB–çC²÷F†W"–ÖvRÆ–W'2&VÖ–âVF—F&ÆRâÇ’ô6æ6VÂ7FvVBÆ6VÖVçB&Vf÷&R6öçfW'6–öâà ¢ã“3Rf–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£"Ãcƒ52òd”Âò6¶—VB¢¢à¤fö7W6VC#•52†æWsRÂ–ÖvS“‚V–v‡BÂw&“326—‚ÂÖ÷VçC“3Bf—fRÂ&VÆV6SR“²æð¦W†—7F–ær76W'F–öç2&VÆ†VBâ†÷7FVBõvW2öÆ—fRV&Æ–6F–öâfW&–f–6F–öâföÆÆ÷w2à ¢22W&ÖæVçB6ö×ÆWF–öâÖ–ç7G'V7F–öâVF—B(	B#ö7Fö&W"##` ¥W6W"&WVFVB52öæW‡F'V–ÆBv†–ÆS“3RV&Æ–6F–öâv2VæF–æræB6¶VBFòVF—@¦ÖçVÂ×FW7B–ç7G'V7F–öç2â•õtõ$´dÄõrÇ&VG’W‡Æ–6—FÇ’&WV—&W2&VF–æW72ö'V–Æ@¦çVÖ&W"æC>(	3bV–6²FWf–6R6†V6·3²•ô„äDôdbÇ6ò6öçF–æVBF†S’ö7Fö&W"&VÖ–æFW ¦–ç6–FRâöÆFW"VçG'’â&öÖ÷FVBF†R6ÖR'VÆRFòF†RDõöb•ô„äDôdb2W&ÖæVç@§6V7F–öââ—BÆ–W2WfW'’'V–ÆBÂ–æ6ÇVF–ærâW‡Æ–6—BæòÖæWr×FW7B7FFVÖVçBv†Và¦&÷&–FS²æWfW"VæBv—F‚öæÇ’&öw&W72âæò'VçF–ÖR6†ævR–âF†—2VF—Bâ7W'&Vç@¦æW‡B'V–ÆB&VÖ–ç3“3R‡V&Æ—6†VBÖ–âv3“3Bv†Vâ52'&—fVB“²f–æ—6ƒ“3RæB—G0¦†æG2Ööâ–ÖvR6öçfW'6–öâô&ÇW"õVæFòõ6fT÷VâÆ—7B&Vf÷&RFV6Æ&–ær—B&VG’à ¢22ã“3RV&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRCF3FV66c3ffCvfCc&&VSCƒ&Sccf3C–#6ÂV&Æ—6†VBG&VP¦c3sC“ƒ3#C3v“vV6#s“†3SfVF#V3s6“6ÂÖF6†W2Æö6ÂÖ–âW†7FÇ’à¤÷&–v–æÂÆö6ÂFW7FVBG&VV3Scc3R†B–FVçF–6Â'VçF–ÖS²öæÇ’f÷W"6öçF–çV—G’f–ÆW0¦6†ævVBFò&öÖ÷FRF†RW&ÖæVçB6ö×ÆWF–öâ'VÆR&Vf÷&RV&Æ–6F–öââv—BFFG&VP§fW&–f–VBv—F‚ÆÃ#‚&Æö'2âÆö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“SƒccSSbð¦¦ö#“sc“3s3c&÷F‚72¢£"ÃcƒFW7G2òf–ÇW&W2ò6¶—VB¢£²gVÆÂ†÷7FVBÆöw0§fW&–f–VBâvW33“Sƒccs’öFWÆ÷““ssSC37V66VVFVBâÆÃ3rg&W6‚6†V6¶VBÆ—fP¦f–ÆW2'—FRÖÖF6ƒ¢6†VÆÂ÷fW'6–öâÂ6ö×ÆWFR6†ævVB&W6÷W&6R÷&ö¦V7BöW‡÷'BôÆ"÷–ç@¦ÆöFW"w&‚æB&WF–æVB&7FW#“3BÂw&“32ÂUb–ç7V7F÷"ÂÖ–âö6vRô×VÇF“ã÷&V6÷fW'’ð¦–ÖvR×6÷W&6R÷væW'2âg&÷¦Vâ'V–ÆG2VçF÷V6†VC²æò76W'F–öç2&VÆ†VBà ¤†æFöfbVF—B6ö×ÆWFS¢W&ÖæVçB&VF–æW72ö'V–ÆBöÖçVÂ×FW7B'VÆRv2Ç&VG’–à¤•õtõ$´dÄõræBâöÆFW"•ô„äDôdbVçG'“²æ÷r&öÖ–æVçFÇ’BDõöb•ô„äDôdbà¤WfW'’f–æ—6†VB'V–ÆB×W7Bv—fR—G2&VF–æW72Â'V–ÆBçVÖ&W"æB6†÷'BFWf–6RFW7G2À¦÷"W‡Æ–6—FÇ’6’æòæWrFW7B—2æVVFVBâæWfW"VæBv—F‚&öw&W72ÆöæRà¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçBâF†—2&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’à ¤'V–ÆC“3R6ö×ÆWFRæB&VG“¢Æ–VB–ÖvRÆ–W.(i$6öçfW'BFò–çBÂV&æ6R¶WC°¤&ÇW"Ö÷VçBô''W6‚ôW&6W"VF—G2—†VÇ3²VæFòVF—G2æB6öçfW'6–öâ&W7F÷&W2VF—B–ÖvS°¥&VFòF†Vâ6fT÷Vâ&WF–ç2VF—F&ÆR–çBâ6÷W&6R&V6—R&VÆöæw2FòöÆBVæFò&W6÷W&6RÀ¦æ÷BF†R6öçfW'FVB6fVBÆ–W#²Ö6·2ö&ÆVæG2ö÷F†W"–ÖvRÆ–W'2&VÖ–â–æFWVæFVçBà¥W6W#“3E52&÷FV7FVC²7GVÃ“3RV&æ6RöfVVÂvFRVæF–ærâæW‡BÖW&vRF÷vâôfÆGFVà§Fòg&VR6Æ÷G2ÂF†Vâ7FvVB&W6öÇWF–öâöÆ–W"'VFvWG3²6×VFvRôò÷6VÒWF†÷&–ærVWVVBà¥&VfÆV7F–öâ&Wf–Wr&VÖ–ç2–æFWVæFVçC²Ç†“#’FWf–6RvFRæ÷B–æfW'&VBà ¢22ã“3RW6W"52òã“3b&W6öÇWF–öâ&Vw&W76–öâ(	B#ö7Fö&W"##` ¢Ò·…ÒW6W"ã“3R53¢–Öv^(i'–çBV&æ6Rô''W6‚ôW&6W"ô&ÇW"ÂVæFò&W7F÷&VB6÷W&6RÀ¢&VFòõ6fT÷VâVF—F&ÆR—†VÇ2âV&Æ–W"ã“32òã“3BæB–çBÖ†—7F÷'’56W2&÷FV7FVBà¢Ò²ÒDUd”4Rã“3c¢–çB(i"FW‡GW&R&W6öÇWF–öâ(i"–æ7&V6RFó#L9s#C²W†—7F–ærÖ&·0¢&WF–æVC²g&W6‚f–æR7G&ö¶W2öæWvÇ’&ö¦V7FVB–ÖvRW6R6†'W"w&–C²–çB7F—2÷Vâà¢Ò²ÒDUd”4S¢VæFþ(i#S"ò&VFþ(i##C²6fRô÷Vâ&WF–ç3#BÂ6öçF–çVVB–çC²W‡÷'BFð¢æöÖB&W6W'fW2–ÖvRÆ6VÖVçBæBg&W6‚Ö&·2âFW7BÆ&vW"6—¦Rô&ÇW"fVVÂà¢Ò²ÒDUd”4S¢&÷Vv†æW72ôÖWFÆæW72æBÖ6²ö6öÆ÷W"7v—F6†–ær&VÖ–â–æFWVæFVçBà¢ÒWFöÖFVBã“3c¢W†7B÷væVC,9r6öÆ÷W"ö–ÖvRöÖ6²&WÆ–6F–öâÂ&WF–æVB6÷W&6R÷6WGF–æw2À¢÷&–v–æÂöæRÖ6†V6·ö–çBT’ö†—7F÷'’ö6öçF–çVVC#B''W6‚´&ÇW"öÖ6²ÃS"66Æ"öÖFW&–À¢F–ÖVç6–öç2Â6öÖÖ—GFVBF—7Æ’ÂF‡&VR÷fW&Æ—2ÂööÆVB66VæRG&ç7÷'BöW†7BæF—fRärÀ¢&VFV6öFR6÷''WF–öâ÷V÷FÂ7FvVBö6†V6·ö–çB÷7FÆR&öÆÆ&6²âæò•BW&f÷&Öæ6R&ööbà¢Ò&W6W'fRöÆCS"æB÷VWcV÷FFW7G3²öæÇ’Æ–W&VC#B÷G2–çFòæWr'VFvWG2à¢W†—7F–ær6÷W&6R÷F—öÆ–W"Ö6÷VçBöf–ÆRöæF—fR62æBUb÷v÷&²wV&G2&VÖ–â7F—fRà ¢ã“3bf–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£"Ãcƒr52òd”Âò6¶—VB¢¢à¥6WfVâæWr&W6öÇWF–öâ–çFVw&F–öç2ÇW2WfW'’÷&–v–æÂFW7B72Væ6†ævVBâ&Wf–WvV@§&VÆV6Rö66†R6öçG&7CU52Â÷&–v–æÃ“"6—¦SS2&VgW6Â&WF–æVBâ–æ—F–ÂW‡Æ÷&F÷'§'VâFÖ—GFVB–çFW&ÖVF–FR6—¦W3²÷&–v–æÂwV&Bæ÷röæÇ’FG2W†7C#L+"&÷fSS"à¤tÄ"f—‡GW&RföÆÆ÷w27GVÂ&–Ö—F—fRÖFW&–Â”C²æò&öGV7F–öâw&—FW"v÷&¶&÷VæBà¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçBâV&Æ–6F–öâö†÷7FVBöÆ—fRfW&–f–6F–öâföÆÆ÷w3°¦7GVÂã“3b•B6†'æW72Â''W6‚ô&ÇW"ÆFVæ7’æBÖVÖ÷'’66WFæ6R&VÖ–âVæF–ærà ¢22ã“3bV&Æ–6F–öâfW&–f–VB(	B#ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRFC36†c6Vf6ƒc3F#csSS6&fcfSc3VÂFW7FVBG&VP¦ƒcSƒ–cV6FS3VVFSCCFcvV&C“s&ff6c“CÂ—2V&Æ—6†VBöâÖ–ââ6öææV7FVBv—@¤FFWÆöFVC3W†7B&Æö'2æB7&VFVBF†R–FVçF–6ÂFW7FVBG&VS²fWF6†VBÖ–à¦ÖF6†VBæBÆö6Â'&æ6‚v2Æ–væVBv—F†÷WBf–ÆR6†ævW2âÆö6ÂæöFS#BæB†÷7FV@¤æöFS#"&Vw&W76–öã3“S“33ScS3Bö¦ö#“““SCSC&÷F‚72¢£"ÃcƒrFW7G2òf–ÇW&W2ð£6¶—VB¢£²6ö×ÆWFR†÷7FVBÆöw2fW&–f–VBâvW33“S“33SS#ƒöFWÆ÷““““sScs3p§7V66VVFVBâÆÃ36†V6¶VB'VçF–ÖRôÆ"÷6†VÆÂ÷&V6÷fW'’÷&÷FV7FVBf–ÆW2'—FRÖÖF6‚à¤–æ—F–ÂfWF6‚&VvâGW&–ær&öÆÆ÷WBæB&WGW&æVB6—‚ã“3Ræ6W7F÷'3²g&W6‚÷7FFWÆ÷§&V6†V6·26Æ÷6VBÆÂ6—‚âæòg&÷¦VâöÖ–âö6vRô×VÇF’VF—G2âVÆWfVâgVæ7F–öæÂ÷væW'3°¦VÆWfVâ&WfW'6RÖw&‚&VçBf–ÆW26öçF–â66†R×&VfW&Væ6R6†ævW2öæÇ’à ¤ÆÂf÷W"6öçF–çV—G’f–ÆW27W'&VçBâ&ööb—2Fö7VÖVçFF–öâÖöæÇ’Â6ÖR'VçF–ÖR'—FW2à¥W6W"ã“3R52&÷FV7G26öçfW'6–öâô&ÇW"öVF—Bö†—7F÷'’÷W'6—7FVæ6S²ã“3bFWf–6RFWF–Âð¦ÆFVæ7’öÖVÖ÷'’vFR&VÖ–ç2VæF–ærâ&VG“¢–çB(i"FW‡GW&R&W6öÇWF–öâ(i"–æ7&V6P§Fó#L9s#C²g&W6‚7G&ö¶W2öæWr–ÖvRÆ6VÖVçBÂVæFóS"õ&VFó#BÂ6fT÷VâæBäôÔBà¤W†—7F–ær—†VÇ2VæÆ&vRW†7FÇ“²&R×Æ6R&WF–æVB6÷W&6W2f÷"g&W6‚–ÖvRFWF–Âà¤–æFWVæFVçCS"66Æ'2÷6÷W&6S#BöÇ†#Sbö&6R·F‡&VRÆ–Ö—G2&WF–æVBâæW‡B&W6öÇWF–öà¦fVVF&6²F†VâÖW&vRF÷vâôfÆGFVã²Æ&vW"6÷W&6W2öÖ2öÆ–W'2&VÖ–â7FvVBà ¢22ã“3rg&W6ƒ#BFVfVÇB(	B#"ö7Fö&W"##` ¢ÒW6W"ã“3b&W÷'G2—†VÆFVB–ÖvRæBg&W6‚7V&R–çBgFW"&Vg&W6ƒ²äõB52à¢6öæf—&ÖVBVF—C¢ã“3b&öGV7F–öâFVfVÇB&VÖ–æVCS"Â–æ7&V6R÷BÖ–âv26öÆÆ6VBà¢Ò²ÒDUd”4RæWr7V&S¢–çB6†÷w26öÆ÷W"FW‡GW&S#L9s#B–ÖÖVF–FVÇ’Â&Vf÷&R–ç@¢÷"FF–ær–ÖvS²6ö×&Rg&W6‚f–æR7G&ö¶W2öæWr–ÖvRÂ÷&&—B÷¦ööÒæB&W7öç6—fVæW72à¢Ò²ÒDUd”4RVæFòõ&VFò&VÖ–ç2–â–çC²6fRô÷Vâ¶VW3#BâW†—7F–æsS"&ö¦V7@¢÷Vç2CS"v—F‚W‡÷6VB–æ7&V6S²W†—7F–ær—†VÇ27F’W†7BVçF–ÂW‡Æ–6—B7F–öâà¢ÒWFöÖFVBã“3r7GVÂT“£#Bf—'7BÖVF—B–çBæB–ÖvR&7FW"Âæò&Ææ²÷Vâ6öÖÖ—BÀ¢f—'7B×7G&ö¶RVæFòõ&VFòöæWrÖ6öçG&öÆÆW"&V÷VâÂÆVv7“S"öæR×7FW–æ7&V6RÂW†7B66VæRð¢æF—fS#BäræCS"66Æ"–æFWVæFVæ6Râã“3bVæÆ&vVÖVçBf—‡GW&W2W‡Æ–6—FÇ“S#°¢Ç†6†V6·2W6R7GVÂw&–C²66Æ"6†V6·26÷fW"WfW'’F—7Æ’FW†VÂv–ç7B&sS"à¢ÒW†—7F–ærvVöÖWG'’õUb÷–çB÷&ö¦V7BöW‡÷'B÷V÷F2æB×VÇF’ög&÷¦Vâ6öçG&7G2&WF–æVBà¢FWf–6R6†'æW72æ÷B–æfW'&VBg&öÒæöFRF–ÖVç6–öç2÷—†VÂ'—FW3²#BFÆ2—26†&VBà ¢Òã“3r7GVÃ#BF‡&VRÖÆ–W"–çFVBGWÆ–6FR×W7B6fRô÷Vâ&÷fS3$Ö”"F‡&÷Vv€¢÷&–v–æÂf–ÆR7F–öç2ÂW†7B&W6÷W&6R'—FW2ã“dÖ”"†–v‚×&W26ó3$Ö”"ÆVv7’6 ¢æB÷fW"Ö6ö6÷''WF–öâ÷66VæR¶†—7F÷'’&W6W'fF–öâ6†V6·2&VÖ–â7F—fRà ¢ã“3rf–æÂÆö6ÂfÆ–FF–öã¢6ö×ÆWFS"Ãc“Ö6†V6²'Vâ76VC"Ãc“²F†RæWr†–v‚×&W0¤f–ÆRFW7B†BÇ&VG’6fVB÷&V÷VæVBW†7B—†VÇ2ÂF†VâFW7BÖöæÇ’7&÷72×&VÆÐ¦V×G’Ö'&’6ö×&F÷"f–ÆVBâ&WÆ6VBF†B6ö×&F÷"v—F‚÷&–v–æÂ†—7F÷'’ÆVæwF‚ð¦–FVçF—G’6†V6·2Â&WF–æ–ærWfW'’76W'F–öââ6÷'&V7FVBfö7W6VB†–v‚×&W2FW7Bæ÷s50¢ƒc—2’Â–æ6ÇVF–ær7GVÃã3$Ö”"6fRô÷VâÃ“dÖ”"&R×&VB&÷VæBÃ3$Ö”"ÆVv7’VÆ–v–&–Æ—G¦æBVæ6†ævVB66VæRö†—7F÷'’öâf–ÇW&W2âæò'VçF–ÖRf–ÇW&R&VÖ–ç2g&öÒF†B'Vâà¤æWrFVfVÇB¶ÆVv7’&W6öÇWF–öã52ÂæV&'’66Æ"öÇ†e53²f–æÂ&VÆV6Rö66†P¦6öçG&7CU52gFW"6ö×ÆWF–ærG&vW"×V’&VçB–ââæò&÷FV7FVBög&÷¦Vâ6†ævW2à¤†÷7FVBgVÆÂ×7V—FR&W'VâæBV&Æ–6F–öâöÆ—fRWf–FVæ6RföÆÆ÷s²FWf–6R6†'æW72VæF–ærà ¢22ã“3rV&Æ–6F–öâfW&–f–VB(	B#"ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR&&#FCfC#c#Cffcƒ#S–3&fSc3fFc“f3–CVÂG&VP¦6&&fSC†Cc36ScfcCSƒ“cVcFc“Fc“S†VFFÂ—2V&Æ—6†VBâ6öææV7FVBv—BFF§WÆöFVC‚W†7BÆö6Â&Æö'2÷G&VS²fWF6†VBÖ–âÖF6†W2Æö6ÂFW7FVBG&VRâ†÷7FV@¤æöFS#"&Vw&W76–öã3“c“C#3“ö¦ö#“SCs##Sƒ’76W2¢£"Ãc“FW7G2òf–ÇW&W2ð£6¶—VB¢£²6ö×ÆWFR¦ö"Æöw2fW&–g’F÷FÇ2Â–æ6ÇVF–ær6÷'&V7FVB†–v‚×&W2f–ÆRFW7Bà¤Æö6Â6ö×ÆWFR'Vâ6÷fW&VC"Ãc“76–ær6†V6·3²6÷'&V7FVBf–ÆR66R6W&FVÇ’76VBÀ¦æBF†R†÷7FVB&W'Vâ6Æ÷6W2F†RgVÆÂf–æÂ×G&VR&ööbâvW33“c“C“ƒS27V66VVFVBà¤ÆÃ’6†V6¶VBÆ—fR6†VÆÂ÷'VçF–ÖR÷&VçB÷&V6÷fW'’æB&WF–æVB–çB÷6÷W&6R÷&ö¦V7Bð¦æF—fRÖW‡÷'Bô×VÇF’f–ÆW2'—FRÖÖF6‚âÖ–âô×VÇF’ög&÷¦Vâ'—FW2Væ6†ævVBà ¥F†—2&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’âW6W"ã“3R52&÷FV7FVC²ã“3b—†VÆF–öà§&W÷'B&VÖ–ç2FWf–6R—77VRv—F–ærã“3r6öæf—&ÖF–öâÂæ÷Bâ–æfW'&VB52à¥&VG’f÷"æWr7V&R(i"–çB6†÷v–ær6öÆ÷W"FW‡GW&S#L9s#B$Tdõ$Rf—'7BÖ&²ö–ÖvS°¦6ö×&Rg&W6‚FWF–ÂÂF†VâVæFõ&VFòõ6fT÷VââW†—7F–æsS"6fVBFW‡GW&W27F“S"VçF–À§f—6–&ÆR–æ7&V6Râ†–v†W"×&W2&ö¦V7B6fRô÷Vã“dÖ”"†÷&F–æ'“3$Ö”"’Â66Æ#S"æ@§6÷W&6S#B÷F—#Sbö&6R·F‡&VRÆ–Ö—G2&WF–æVBâæó$²óD²÷"ÆÂ×¦ööÒ—†VÂÖg&VR6Æ–Òà¤æW‡B6öæf—&ÖVC#BFWf–6RfVVF&6³²–ç7V7B6÷W&6RõUbFVç6—G’–b7F–ÆÂ6ö'6RÂF†Và§7FvRÆ&vW"Ö2÷6÷W&6W2öÖVÖ÷'’v÷&²âÖW&vRôfÆGFVâõ6×VFvRôò÷6V×2&VÖ–âVWVVBà ¢22ã“3‚(	B6öÆ÷W"ÖW&vR&Vw&W76–öâòã“3r&÷FV7FVB50 ¢Ò·…ÒW6W"W&fV7B52ã“3r&÷FV7G2g&W6ƒ#BFVfVÇB÷&VF÷WBæB–çBö–ÖvRFWF–Ã²6fVCS"÷F–öæÂ–æ7&V6R&WF–æVBâ–æFWVæFVçBÇ†÷&VfÆV7F–öâvFW2&VÖ–â÷Vâà¢Ò·…ÒÖW&vR6VÆV7FVB÷fW&Æ’ÇW2ÆÂ&VÆ÷rF‡&÷Vv‚÷&–v–æÂ6ö×÷6—F÷#¢W†7B—†VÇ2f÷"ÆÃ#b&ÆVæG2ÂÖ6·2æBw&VB–ÖvW3²WW"6÷W&6W2ö÷&FW"÷6WGF–æw27W'f—fRà¢Ò·…ÒfÆGFVâ&W6W'fW2f—6–&ÆR—†VÇ2Â&VÖ÷fW2ÆÂ÷fW&Æ—2–æ6ÇVF–ær†–FFVâöæW2ÂæBg&VW26Æ÷G2â–çWB÷VW"÷66Æ"&W6÷W&6W2&VÖ–âVæ6†ævVBà¢Ò·…Ò÷&–v–æÂ–çBVæFòõ&VFòÂ6fRô÷VâæB7GVÂæF—fRär&W6W'fR&W7VÇG3²†—7F÷'’&W7F÷&W2÷&–v–æÂÆ–W'2â7FvVBÆ6VÖVçBÂ7FÆR6W76–öç2Â6†V6·ö–çBæBV÷F&VgW6Â&VÖ–âFöÖ–2à¢Ò·…ÒÆö6ÂgVÆÃ#c“u52ód”Âó6¶—²fö7W6VBÖW&vSe52Â&Wf–WvVB&VÆV6SU52à¢Ò·…ÒW6W"52ã“3ƒ¢Æ–W"6WGF–æw2ÖW&vRFò&6R&W6W'fW2V&æ6RæBg&VW2W‡V7FVB6Æ÷G3²VæFòõ&VFò&W7F÷&W2Æ–W'2à¢Ò·…ÒW6W"52ã“3ƒ¢fÆGFVâÆVfW2&6RöæÇ’Â²Æ–W"v÷&·2Â6fRô÷Vâ&WF–ç2V&æ6Rà ¢22ã“3‚V&Æ–6F–öâfW&–f–VB(	B#"ö7Fö&W"##` ¥'VçF–ÖRcCCS“&#“ScSv#&##Cf†#cvC““C#3“bÂG&VP£#3–SVCsfFSC–FFcƒCf–&6F&f&#3S##c&C‚ÂÖF6†W2FW7FVBÆö6ÂG&VRà¤†÷7FVB&Vw&W76–öã3“c““sc“SBö¦ö#“ScSƒ“#“sR7V66VVFVC²gVÆÂ¦ö"Æöw26öæf—&Ð£#c“u52ód”Âó6¶—ÂÖF6†–ær6ö×ÆWFRÆö6Â'VââvW33“c““sc“R'V–ÆC“ScSƒ“SCSrð¦FWÆ÷““SccsƒSc’7V66VVFVBâÆÃ#R6†V6¶VBÆ—fR6†VÆÂ÷fW'6–öâÂ6†ævVB'VçF–ÖRôÆ"À§&V6÷fW'’æB&WF–æVB6÷&RöÖ–âô×VÇF’f–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6Râ&Wf–WvVB–ç3“3ƒ°§&÷FV7FVBÖ–âö6vRô×VÇF’ög&÷¦VâVæ6†ævVBâF†—2&ööbWFFW2Fö7VÖVçFF–öâöæÇ’à¥W6W"ã“3r52&÷FV7FVC²ã“3‚FWf–6RÖW&vRöfÆGFVâõVæFõ&VFòõ6fT÷VâvFRVæF–ærà ¢22ã“3’(	BUb×&VG’ö&¦V7B7&VF–öã²ã“3‚52&÷FV7FV@ ¢Ò·…ÒW6W"ã“3‚52&÷FV7G2ÖW&vRôfÆGFVâög&VR6Æ÷G2õVæFõ&VFòõ6fT÷VââV&Æ–W"ã“3s#B÷&VF÷WBöFWF–Â&VÖ–ç2&÷FV7FVBà¢Ò·…Ò7F'GW÷&W6WB÷&–v–æÂVæ—B7V&RvWG26—‚6ö×ÆWFR&÷‚—6ÆæG2v—F†÷WBW‡G&†—7F÷'’övVöÖWG'’6†ævRà¢Ò·…Ò7V&RõÆæRô7–Æ–æFW"ô6öæRõ7†W&RW6RW†7B÷&–v–æÂ&÷‚õ…¢ô7–Æ–æFW"õ7†W&RÆ–÷WG2B7–ÖÖWG&–2öFVç6R6WGF–æw3²÷&F–æ'’66VæR&ö¦V7F–öç27F–ÆÂ&WV—&R6†V6·ö–çG2à¢Ò·…Ò7GVÂFBFVfVÇG2vVæW&FRUg2ôã²ôdb&WF–ç2Æ–âF‚÷6WGF–æw2–æ†W&—Fæ6RâUbôâW6W2Æ–â&6R6WGF–æw2â7Fv–ærô6æ6VÂ÷&VgW6Â&W6W'fW266VæR÷&VFó²öæRVæFòõ&VFò6'&–W2W†7B&W6÷W&6Rà¢Ò·…Ò7GVÂ&ö¦V7BG&ç7÷'BæBäôÒôtÄ"÷WGWB&WF–âf6RÖ6÷&æW"Ubf&–çG3²7F'GW7V&R÷Vç2&öGV7F–öâ–çB–ÖÖVF–FVÇ’C#BæB6fRô÷Vâ&WF–ç2–çFVB&–æF–ærà¢Ò·…ÒF÷'W2õFW‡B&VÖ–âÆ–âv—F‚f—6–&ÆRW‡ÆæF–öã²7V6–Âö&¦V7BÆVæ6†W'2Væ6†ævVBâ÷&–v–æÂ7FÆRöWfÇVFVBöÆ–æ¶VBwV&G2&WF–æVC²æòWFò×&VÖ–æröÆB&ö¦V7G2à¢Ò·…ÒW6W"52ã“3“¢&Vg&W6‚÷"&W6WB(i"–çBöâ7V&Rv—F†÷WBf—'7B&ö¦V7F–ærUg3²UbVF—F÷"6†÷w26—‚—6ÆæG2à¢Ò·…ÒW6W"52ã“3“¢FB7–Æ–æFW"ô6öæRõ7†W&Rv—F‚vVæW&FRUg26†V6¶VC²–ç7V7BUg2÷–çBâVçF–6²öâæ÷F†W"ö&¦V7BFò7&VFRv—F†÷WBUg2à¢Ò·…ÒW6W"52ã“3“¢VæFòöæ6R&VÖ÷fW2æWrUbö&¦V7BÂ&VFò&W7F÷&W3²6fRô÷Vâ&WF–ç2Ug2÷–çBà ¢ã“3’f–æÂÆö6ÂæöFS#BgVÆÂ&Vw&W76–öã¢¢£"Ãs252òd”Âò6¶—VB¢¢à¤æWr7&VF–öãe52Â÷&–v–æÂæV&'’FBô&÷‚õ7†W&S•52Â&Wf–WvVB&VÆV6SU52à¤æò76W'F–öç2&VÖ÷fVB÷"&VÆ†VBâ6ö×ÆWFR&Wf–WvVBÖ–âôÆ"&WfW'6RÆöFW"w&ƒ“3“°§&÷FV7FVBÖ–ã“3ö6vRô×VÇF“ãög&÷¦VâVçF÷V6†VBâ†÷7FVBõvW2öÆ—fR&ööbföÆÆ÷w3°¦7GVÂ•BUb×&VG’7&VF–öâ÷–çB÷W'6—7FVæ6R66WFæ6R&VÖ–ç2VæF–ærà ¢22ã“3’V&Æ–6F–öâfW&–f–VB(	B#"ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRSsf&C3cc3VC##&#cScvfCsVfv66BÂG&VP£S&cF33SFcf3fS†&&3CFC“†fFC†cf&cC“v&F2Â—2V&Æ—6†VBöâÖ–âà¤6öææV7FVBv—BFFWÆöFVC#W†7B&Æö'2æBÖF6†VBFW7FVBG&VS²fWF6†VBÖ–à¦ÖF6†VBÆö6Â6÷W&6RâÆö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“s##ƒCƒrð¦¦ö#“c3s“#s#ƒ&÷F‚72¢£#s2FW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR¦ö ¦Æöw2fW&–g’F÷FÇ2âvW33“s##ƒ#B'V–ÆC“c3s“3“öFWÆ÷““c3ƒcsƒ7V66VVFVBà¤ÆÃ#÷7FFWÆ÷–ÖVçB6†V6¶VB6†VÆÂ÷fW'6–öâÂWfW'’6†ævVB'VçF–ÖRôÆ"÷væW"Â&V6÷fW'’À§&WF–æVBÖ–âö6vRô×VÇF“ã÷&–Ö—F—fRf7F÷'’÷–çB÷væW'2æBg&÷¦Vä&WFrÖ&¶W ¦'—FRÖÖF6‚FW7FVB6÷W&6RâÖ–âö6vRô×VÇF“ãög&÷¦Vâ&WF'—FW2Væ6†ævVBâæò76W'F–öà§&VÆ†VBâF†—2&ööb6†ævW2Fö72öæÇ“²6ÖR'VçF–ÖR'—FW2âW6W"ã“3‚52&÷FV7FVC°¢ã“3’7GVÂ•B7F'GW÷&W6WBôFBõUb6†V6¶&÷‚÷–çBö†—7F÷'’õ6fT÷VâvFRVæF–ærà ¢22ã“C(	BF÷'W2Ug2&Vw&W76–öã²ã“3’&÷FV7FVB50 ¢Ò·…ÒW6W"ã“3’52&÷FV7G2Ub×&VG’–æ—F–Â÷&W6WB7V&RÂFBUb6†ö–6R÷Æ–â7&VF–öâÂ–çF–ærÂöæR×7FWVæFõ&VFòæB6fT÷Vâà¢Ò·…Ò&÷VæBW&–v‡BF÷'W2w&–G3>(	33"7&÷733bFVç6—G’—'3¢WfW'’VBÖVBöæ6RÃ—6ÆæBÂ&÷F‚6V×2ÂgVÆÂ&V7FævÆRv—F†–âF–ÆS²æòvVöÖWG'’×WFF–öâà¢Ò·…ÒG&ç6ÆFVBõ’×&÷FFVBöW‡G&VÖR66ÆR÷&VçVÖ&W&VB&VwVÆ"w&–G27W÷'FVC²FVf÷&ÖVB÷F–ÇFVBöæöçVBö–æ6ö×ÆWFR÷Vç7W÷'FVBö6†V6·ö–çBf–ÇW&W2&WF–âÖWFFFö†—7F÷'’à¢Ò·…Ò÷&–v–æÂæF—fR66VæR&ö¦V7F–öâô4õröæòÖ÷õVæFõ&VFòö—6ÆæBVF—G2æB7GVÂUb6ÆÆ&6²v÷&³²FBF÷'W26†V6¶VB÷Væ6†V6¶VBV6‚öæR÷&–v–æÂ6†V6·ö–çBà¢Ò·…ÒW‡æFVC“3’7GVÂ&ö¦V7BôäôÒôtÄ"&WF–âF÷'W26÷&æW"f&–çG3²–ÖÖVF–FR&öGV7F–öã#B–çBõVæFõ&VFòõ6fT÷VâöæF—fRärW†7Bà¢Ò·…ÒW6W"52ã“C¢FBF÷'W2v—F‚vVæW&FRUg26†V6¶VC²–çBv÷&·2–ÖÖVF–FVÇ’ÂUbVF—F÷"6†÷w2öæR&V7FæwVÆ"—6ÆæBà¢Ò·…ÒW6W"52ã“C¢FBF÷'W2Væ6†V6¶VBÂF†Vâö&¦V7N(i%Un(i%F÷'W2Ug2…’“²VæFòõ&VFò&ö¦V7F–öâæBFB&V†fR6÷'&V7FÇ’à¢Ò·…ÒW6W"52ã“C¢6fRô÷Vâ&WF–ç2–çFVBF÷'W2æBUbÆ6VÖVçC²÷F–öæÂæöÖBW‡÷'B6æ—G’à ¤æwVÆ"F÷'W2Ö–ær†2–ææW"ö÷WFW"FVç6—G’f&–F–öââæòF–ÇFVBöFVf÷&ÖVBövVæW&À§Vçw&÷"Ub&÷vF–öâF‡&÷Vv‚F÷öÆöw’öÖöF–f–W'3²æF—fRÆ–æ¶VBwV&G2&WF–æVBà ¢ã“Cf–æÂÆö6ÂæöFS#BgVÆÂ&Vw&W76–öã¢¢£"Ãs’52òd”Âò6¶—VB¢¢à¤æWrF÷'W3bæBW‡æFVC“3’7&VF–öãbÓ"fö7W6VE53²&Wf–WvVB&VÆV6SU52à¤æò÷&–v–æÂ&V†f–÷W"76W'F–öç2&VÆ†VC²7WW'6VFVBF÷'W2×Væf–Æ&ÆR6†V6·2æ÷p§&WV—&RÖVBö÷F–öæÂÆ–âF÷'W2æBW†7B&ö¦V7BôäôÒôtÄ"÷WGWBâ&÷FV7FV@¦Ö–âö6vRô×VÇF“ãög&÷¦Vâ&WF–æVBâ†÷7FVBõvW2öÆ—fR&ööbföÆÆ÷w3²FWf–6S“CVæF–ærà ¢22ã“CV&Æ–6F–öâfW&–f–VB(	B#"ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRS3†3f3f#v3ccFc“–S3V6SsvV66Cƒ–3–3"ÂG&VP¦F&CVcsƒ3cS&&fFcv†#3&6f3†SSFF#&&F#rÂV&Æ—6†VBöâÖ–ââ6öææV7FVBv—BFF§WÆöFVCBW†7BÆö6Â&Æö'2æBÖF6†VBFW7FVBG&VS²fWF6†VBÖ–â–FVçF–6Âà¤Æö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“s#Sƒ#sS’ö¦ö#“cC“3CC’&÷F‚70¢¢£#s’FW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆöw2fW&–g’F÷FÇ2à¥vW33“s#Sƒ##c2'V–ÆC“cC“3C#SöFWÆ÷““cC“CƒcSc27V66VVFVBâÆÃ#6†V6¶V@§÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂ6†ævVBUbôFBôÖW6„†VÇF‚ô×VÇF’&VçBÂ&V6÷fW'’æ@§&WF–æVBÖ–âö6vRô×VÇF“ãöf7F÷'’÷6–væGW&Rö–×÷'BöW‡÷'B÷–çB÷&7FW"ög&÷¦Vä&WFp¦Ö&¶W"f–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6Râ&Wf–WvVBw&ƒ“C²Ö–âö6vRô×VÇF“ãög&÷¦Và¦'—FW2Væ6†ævVBâæòöÆB&V†f–÷W"76W'F–öç2&VÆ†VBâF†—2&ööb6†ævW2Fö72öæÇ“°§6ÖR'VçF–ÖR'—FW2âW6W"ã“3’52&÷FV7FVC²ã“CF÷'W2FWf–6RvFRVæF–ærà ¢22ã“CW6W"52(	B#"ö7Fö&W"##b„'&—6&æR ¥W6W"52&÷FV7G2F÷'W2WFöÖF–2Ug2ö÷F–öæÂÆ–âFBÂF÷'W2Ug2…’’Â–çBÀ¥UbVF—F÷"ÂVæFõ&VFòæB6fT÷Vââã“C'VçF–ÖRô4’õvW2öÆ—fR&ööb&÷fR—26Æ÷6VBà¤æW‡BWF†÷&—¦VBöæW‡F'V–ÆBVF—G2&÷VæFVB6×VFvRF‡&÷Vv‚÷&–v–æÂ–çB÷væW'2à ¢22ã“C(	B6×VFvR&Vw&W76–öâæBFWf–6RvFP ¢Ò·…ÒW6W"ã“C52&VÖ–ç2&÷FV7FVC²ÆÂUb×&VG’7&VF–öâ÷–çBö†—7F÷'’÷W'6—7FVæ6Rà¢Ò·…ÒæÇ—F–6Â–6·WöG&r$t$Â–æFWVæFVçB÷6—G’Â&V×VÇF—Æ–VBÇ†Âæò–æ²öâF÷&WVFVB÷6—F–öâÂ÷væVB6æ6VÆÆF–öâà¢Ò·…Ò6ÖR÷&–v–æÂf6R&VG2÷w&—FW2öæÇ“²F¦6VçBFÆ2—6ÆæG2W†6ÇVFVBÂf6RöÖ—72–6·W&W6WG3²Ç†÷&rw&—66ÆR&WF–æVBà¢Ò·…Ò7GVÂT’6VÆV7FVBÖÆ–W"—6öÆF–öâÂ–çBVæFõ&VFò÷FööÂ&WFVçF–öâÂ6fT÷VâæBW†7BæF—fRärà¢Ò·…Ò66Æ"öÖ6²–æFWVæFVæ6RÂ÷&–v–æÂ6†V6·ö–çBô4õrö6æ6VÂöÖ—72&VgW6Ã²–çfÆ–BUg2&VgW6R&Vf÷&Ræf–vF–öâö†—7F÷'’6†ævW2à¢Ò·…Ò&÷VæFVBÆöær7G&ö¶R&öÆÇ2&6²—†VÇ2÷&W6÷W&6W2ö†—7F÷'’Â&VÆV6W26GW&Röæf–vF–öâæBÆÆ÷w2æW‡B''W6ƒ²WfVçB7V&F—f—6–öâ–çf&–çBà¢Ò·…ÒW6W"52ã“C¢6×VFvR†&B6öÆ÷W"F6‚÷WGv&BöâöæR7V&Rf6S²6ö×&RÆ÷rö†–v‚÷6—G’æBæòÖÖ÷F–öâFà¢Ò·…ÒW6W"52ã“C¢÷fW&Æ’6×VFvRÂVæFõ&VFò¶VW2–çB÷VâÂ6fT÷Vâ&WF–ç2&W7VÇBâf6RVFvW2&W7F'B–6·Wà ¤WFöÖFVB6÷W&6RFW7G2Fòæ÷BW7F&Æ—6‚•BfVVÂöÆFVæ7’õ$Òâ7&÷72Öf6R6×VFvRÀ¤òæBVFvR×6VÒWF†÷&–ær&VÖ–âVWVVC²Ç†“#’÷&VfÆV7F–öâvFW2–æFWVæFVçBà ¢ã“Cf–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£"ÃsR52òd”Âò6¶—VB¢¢à¤ÆÂ6—‚æWr6×VFvR–çFVw&F–öç272öâf–æÂ6÷W&6RÂÇW2WfW'’W†—7F–ær76W'F–öâà¤æV&'’&ÇW"÷6VÓU52æB&Wf–WvVB&VÆV6SU52Ç6ò76VBâæò÷&–v–æÂ76W'F–öç0§&VÆ†VBâ6ö×ÆWFRÖ–âôÆ"&WfW'6RÖÆöFW"6Æ÷7W&S“C²&÷FV7FVBÖ–âö6vRô×VÇF“ãð¦g&÷¦VâVæ6†ævVBâV&Æ–6F–öâö†÷7FVBöÆ—fRfW&–f–6F–öâföÆÆ÷w3²FWf–6S“CVæF–ærà ¢22ã“CV&Æ–6F–öâfW&–f–VB(	B#"ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR3–3&F#†††Svf6CS“#S##3S6SS#rÂFW7FVBG&VP£s&SC–3CC33csfsc3&3VFccc&Fc†vFƒvbÂ—2V&Æ—6†VBöâÖ–ââ6öææV7FVBv—@¤FFWÆöFVCRW†7B&Æö'3²7&VFVBG&VRæBfWF6†VBÖ–âÖF6‚Æö6ÂFW7FVBG&VRà¤Æö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“sScSssƒbö¦ö#“sC““cƒ“cB&÷F‚70¢¢£#sRFW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆörF÷FÇ2fW&–f–VBà¥vW33“sScSssSr'V–ÆC“sC““sS“C’öFWÆ÷““sS#s#ƒ27V66VVFVBâÆÃ#6†V6¶V@§÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂWfW'’6†ævVBÖ–âôÆ"'VçF–ÖR÷væW"Â&V6÷fW'’æ@§&WF–æVBÖ–âô×VÇF“ãõUböf–ÇFW"÷6VÒöw&‚÷&ö¦V7BöW‡÷'B÷&–Ö—F—fRög&÷¦Vä&WFrÖ&¶W ¦f–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6Râæò÷&–v–æÂ76W'F–öç2&VÆ†VC²&÷FV7FVBög&÷¦Và¦'—FW2Væ6†ævVBâF†—2&ööb6†ævW2f÷W"6öçF–çV—G’f–ÆW2öæÇ’Â6ÖR'VçF–ÖR'—FW2à ¤'V–ÆC“C—26ö×ÆWFRæB&VG’f÷"FWf–6RFW7F–æs¢†&B6öÆ÷W"F6‚öâ7V&R(i ¥FööÂ6×VFvRv—F†–âf6RÂG&r÷WGv&BÂ6ö×&R÷6—G’ÂFÖ¶W2æòÖ&³²G'’à¦÷fW&Æ’ÂVæFõ&VFò7F—2–â–çBÂ6fT÷Vâ&WF–ç2&W7VÇBâf6RVFvW2öÖ—76W2&W7F'@§–6·Wâ7GVÂ•BfVVÂöÆFVæ7’&VÖ–ç2VæF–ærâW6W#“C52&÷FV7FVC²–æFWVæFVç@¦Ç†“#’÷&VfÆV7F–öâvFW2Væ6†ævVBâæW‡BFWf–6RfVVF&6²&Vf÷&R7&÷72Öf6R6×VFvRÀ¤ò÷"VFvR×6VÒWF†÷&–æs²æòWFöÖF–2æW‡B'VçF–ÖR'V–ÆB&Vf÷&RF†BvFRà ¢22ã“C"(	B6öææV7FVBÖf6R6×VFvR&Vw&W76–öâòã“C&÷FV7FVB50 ¢Ò·…ÒW6W"ã“C52&÷FV7G26ÖRÖf6R6×VFvRô÷6—G’÷Fö÷fW&Æ’ö†—7F÷'’õ6fT÷Vâà¢Ò·…Ò÷&–v–æÂÖæ–föÆBw&‚öæÇ“¢g&÷¦VâF—&V7B—'2Ã"föÆFVB÷&÷FFVBöÖ—'&÷&VBÆ–÷WG3²æöæÖæ–föÆB÷fW'FW‚ÖöæÇ’öFÆ2FV6÷’W†6ÇVFVBÂ6÷W&6W2Væ6†ævVBà¢Ò·…ÒW†7B&V×VÇF—Æ–VBÖVâô÷6—G’öÇ†7&÷72—"Â–6¶VBÖf6RÖöæÇ’w&—FW3²æò6öææV7FVBÆ—7B&WF–ç2÷&–v–æÂf6R×&W6WB’à¢Ò·…Ò6GW&VBF¦6Væ7’Â7G&–7B–çfÆ–B÷7'6Rö÷fW'6—¦RwV&G2ÂÖ—76W2öF—66öææV7FVB§V×2æB7&÷72Öf6Rv÷&²ÖÆ–Ö—B6æ6VÆÆF–öâà¢Ò·…Ò7GVÂ6öçF–çV÷W2T’VFvR7&÷76–ærÂöæR–çBVæFõ&VFòÂ6fT÷VâæBW†7BæF—fRäs²&r66Æ"öÖ6²—6öÆF–öâö6†V6·ö–çB&VgW6Âà¢Ò·…ÒW6W"52ã“C#¢Gvò7V&Rf6W2f—6–&ÆRÂ–çBF6‚WFò6†&VBVFvRÂ6×VFvR7&÷72öçFòæW‡Bf6Râ6ö×&RÆ÷rö†–v‚÷6—G’à¢Ò·…ÒW6W"52ã“C#¢–çFVB÷fW&Æ’ÂVæFõ&VFò&WF–ç2–çBõ6×VFvS²6fT÷Vâ&WF–ç27&÷72ÖVFvR6öÆ÷W"âf–æRFWF–ÂfW&vW2BG&ç6—F–öâà ¤ÖVâ6öÆ÷W"6''’FöW2æ÷BG&ç7÷'BFWF–ÆVBF6‚÷&–VçFF–öâ÷"w&fö÷G&–ç@¦öçFòVç–6¶VBf6W2âÇ†“#’÷&VfÆV7F–öâvFW2&VÖ–â–æFWVæFVçC²ò÷6VÒWF†÷&–ærVWVVBà ¢ã“C"f–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£"Ãs#52òd”Âò6¶—VB¢¢à¤f—fRæWr6öææV7FVBÕ6×VFvR6†V6·2Â÷&–v–æÃ“C·6VÓæB&Wf–WvVB&VÆV6SR72à¤æò÷&–v–æÂ76W'F–öç2&VÆ†VBâ&Wf–WvVB6†ævVBÖ–âôÆ"&WfW'6Rw&ƒ“C#²&÷FV7FV@¦Ö–âö6vRô×VÇF“ã÷G&–ævÆRw&‚ög&÷¦VâVæ6†ævVBâ†÷7FVBõvW2öÆ—fR&ööbföÆÆ÷w2à¥W6W"&WVFVB52öæW‡F'V–ÆBv†–ÆS“C"v27F–ÆÂÆö6Âö–â&Vw&W76–öã£“C66WFæ6P§&VÖ–ç2&÷FV7FVC²æó“C"FWf–6R52–æfW'&VB&Vf÷&RV&Æ–6F–öâöÖçVÂFW7BÆ—7Bà ¢22ã“C"V&Æ–6F–öâfW&–f–VB(	B#"ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR#C–&#ƒCcsƒ3f3&63Sc–C“sSV6FCSF&#v#Vc’ÂFW7FVBG&VP£Vf&#“3FFSsS“FC#&&3FcCC3†#CV&33“vfBÂ—2V&Æ—6†VBöâÖ–ââ6öææV7FVBv—@¤FFWÆöFVCrW†7B&Æö'3²7&VFVBG&VRæBfWF6†VBÖ–âÖF6‚Æö6ÆÇ’FW7FVBG&VRà¤Æö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“sc#ƒƒcö¦ö#“scƒƒ3S&÷F‚70¢¢£#s#FW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆörF÷FÇ2fW&–f–VBà¥vW33“sc#ƒsSR'V–ÆC“scƒƒcS3böFWÆ÷““sc“33ƒ3R7V66VVFVBâÆÃ#6†V6¶V@§÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂ6†ævVBÖ–âôÆ"öf–ÇFW"÷6VÒ'VçF–ÖRw&‚Â&V6÷fW'’À§&WF–æVBÖ–âô×VÇF“ã÷G&–ævÆRw&‚õUb÷&ö¦V7BöW‡÷'B÷&–Ö—F—fRæBg&÷¦Vä&WFp¦Ö&¶W"f–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6Râ÷&–v–æÂ76W'F–öç2&WF–æVC²&÷FV7FVBög&÷¦Và¦'—FW2Væ6†ævVBâF†—2V&Æ–6F–öâ&ööb6†ævW2f÷W"6öçF–çV—G’f–ÆW2öæÇ’à ¤'V–ÆC“C"6ö×ÆWFRæB&VG“¢7V&RGvòf6W2f—6–&ÆRÂ–çBF6‚WFò6†&VBVFvRÀ¥6×VFvR7&÷72—BÂ6ö×&R÷6—G’æB–çFVB÷fW&Æ’ÂVæFõ&VFò&WF–ç2–çBÂ6fT÷Và§&WF–ç2&W7VÇBâ6VÒG&ç6—F–öâ6'&–W2fW&vVB6öÆ÷W"Âæ÷BFWF–ÆVBF6‚÷&–VçFF–öâà¥W6W#“C52&÷FV7FVBâ&WVFVB52öæW‡F'V–ÆB'&—fVB&Vf÷&S“C"V&Æ–6F–öã¢—B—0¦æ÷C“C"FWf–6R66WFæ6Râ7GVÃ“C"•B6VÒfVVÂvFR&VÖ–ç2æW‡BâF†Vâ&Vf–æRg&öÐ¦fVVF&6²&Vf÷&RòôVFvR6VÒWF†÷&–æs²Ç†“#’÷&VfÆV7F–öâvFW27F’–æFWVæFVçBà ¢22ã“C"W6W"52(	B#"ö7Fö&W"##b„'&—6&æR ¤gW'F†W"52öæW‡F'V–ÆB'&—fVBeDU#“C"FWÆ÷–ÖVçBÃ#Æ—fRÖf–ÆRÖF6†W2æB†÷7FV@£#s#52fW&–f–6F–öââ66WBF†—2ÆFW7B52f÷"Ä•dS“C"6öææV7FVBÖf6RÖVâ6''’À¤÷6—G’ö÷fW&Æ’õ–çBVæFõ&VFòõ6fT÷Vã²V&Æ–W"&WV&Æ–6F–öâ&WWF—F–öç2&VÖ–ã“Cà¥&÷FV7C“C"Æöæw6–FS“CâæW‡BWF†÷&—¦VC“C2æ'&÷r'V–ÆB&Vv–ç2&÷VæFVBö&¦V7BÖöæÇ¤ò&¶Rf÷VæFF–öâf–÷&–v–æÂUb÷væW'6†—÷G&–ævÆRvVöÖWG'“²f—6–&ÆR6öçG&öÇ2föÆÆ÷p§fÆ–FFVB&¶R—†VÇ2÷v÷&²wV&G2âæòòT’÷"&VæFW&VBò66WFæ6R—2–æfW'&VBà ¢22ã“C2(	B&VBÖöæÇ’ö&¦V7Bò&¶Rf÷VæFF–öâ(	B#"ö7Fö&W"##b„'&—6&æR ¥W6W"ã“C"52&VÖ–ç2&÷FV7FVBâVF—Bf÷VæBæòW†—7F–ærò&¶W"âæWp¦7&2÷–çBÖòÖ&¶Ræ§6W6W2÷&–v–æÂ&Wf–WrG&–ævÆR÷væW'6†—÷G&–ævÆRw&‚À¦÷&–v–æÂ–çBÖf–ÇFW"ÖFöÖ–âFW†VÂ&7FW"æBF‡&VR&’æ–çFW'6V7EG&–ævÆRâF†P¦f–ÇFW"FöÖ–â÷F–öæÆÇ’&WGW&ç2—G2W†—7F–ærG&ç6–VçBG&–ævÆRÖ²÷&F–æ'¦''W6‚6ÆÆW'2&WF–âW†7B&WGW&â6†RæBÆÆö6F–öç2âæò6V6öæBG&–æwVÆF÷"À¥Ub&7FW&—¦W"ÂF¦6Væ7’Â''W6‚Â†—7F÷'’Â66VæR&W6÷W&6R÷"W‡÷'B÷væW"à ¥W&R7–æ6‡&öæ÷W2ö&¦V7BÖÆö6Â&¶R&WGW&ç2÷væVBÆ–æV"#‚f—6–&–Æ—G’æB6W&FP¦6÷fW&vRÂUb×cÖf—'7Bâv†—FS×Væö66ÇVFVC²Væ6÷fW&VBFW†VÇ2v†—FRö6÷fW&vSâFWFW&Ö–æ—7F–0¦6÷6–æR×vV–v‡FVB†VÖ—7†W&R6×ÆW2ÂF÷V&ÆR×6–FVB6ÖRÖö&¦V7B&Æö6¶W'2Â6÷W&6Rv–æF–æp¦æ÷&ÖÂÂæ÷&ÖÆ—¦VBö&¦V7BÖF–vöæÂ&F—W2ö&–2â6—¦Sn(	3#‚öFVfVÇCcBÂ6×ÆW3N(	3cBð¦FVfVÇCbÂ&F—W2ã(	3"öFVfVÇBã#RöbF–vöæÂâ6öç6W'fF—fS„Ò&’÷G&–ævÆR×FW7@§&VfÆ–v‡BÇW2÷&–v–æÃ$ÒUb66â6²W†6W726ö×ÆW†—G’&VgW6W2v—F‚æò66VæRw&—FW2à¤æ÷&ÖÆ—¦VB&—fFRw&‚ö–çG2öæÇ“²6÷W&6RÖW6‚õUbövVöÖWG'’&VÖ–âVæ6†ævVBà¤æò66VæRÖæV–v†&÷W"Âw&÷VæB×ÆæRÂv÷&ÆB×G&ç6f÷&ÒÂ&VæFW&VB54ò÷"Æ&VFò&¶R–WBà¤æòÖ–âÖò–×÷'Bö'WGFöâ÷&W6÷W&6R÷W'6—7FVæ6RöW‡÷'B6†ævR÷"FWf–6R×W&f÷&Öæ6P¦6Æ–ÒâF†—2–çFVçF–öæÆÇ’Æ÷r×&W6öÇWF–öâf÷VæFF–öâ—2äõBæWr–çB&W6öÇWF–öâà ¤f—fRæWr&Vw&W76–öâFW7G26÷fW"÷BÖ–âW†7B÷væW'6†—Âv†—FR÷VâÆæRö6÷fW&vRð¦FWFW&Ö–æ—6Òö6÷’—6öÆF–öâÂf6–ær&Æö6¶W'2÷&F—W2öF÷V&ÆR×6–FVB&—2Â7W÷'FVB66ÆRð§G&ç6ÆF–öâ÷&÷FFVBUg2Â7FÆRö–çfÆ–Bö÷fW&Æ÷v÷&²&VgW6Ç2æB6÷W&6R&W6W'fF–öâà¥F–ç“RÓ‚6÷W&6Rf—‡GW&Rv2&V¦V7FVB'’F†Rõ$”t”äÂ&Wf–Wr'V–ÆFW"&Vf÷&R&¶–æs°§66ÆRFW7G2W6R66WFVBã(	3S‚vVöÖWG'’–ç7FVBÂæò'V–ÆFW"FöÆW&æ6R6†ævRà¥&VBFö72÷–çBÖòÖf÷VæFF–öâÓ“C2æÖFâÖ–â–çFW"&WfW'6RÆöFW"6†–â²6†VÆÂð§&V6÷fW'’–ç3“C2&Wf–WvVC²Æ"öÖ–âö6vRô×VÇF“ãög&÷¦VâÆv÷&—F†×2Væ6†ævVBà ¤æW‡C¢÷&–v–æÂ–çBÆ–W"ö†—7F÷'’G&ç67F–öâf÷"âW‡Æ–6—BæöâÖFW7G'V7F—fRð¤×VÇF—Ç’Æ–W"Âv—F‚6æ6VÆÆF–öâ÷7FÆR÷ööÂö6†V6·ö–çBwV&G2æBf—6–&ÆR6öçG&öÇ2À§F†Vâ•BV&æ6RöÆFVæ7’FW7F–ærâFòæ÷B–×Ç’òT’66WFæ6Rg&öÒW&RFW7G2à¤Ç†“#’÷&VfÆV7F–öâ×&Wf–WrvFW2&VÖ–â–æFWVæFVçFÇ’Vç&W6öÇfVBâæòæWrò†æG2Ööà§FW7BW†—7G2–ã“C3²W†—7F–ær6×VFvRõ–çBVæFõ&VFòõ6fT÷Vâ&VÖ–ç2F†RæV&'’&6VÆ–æRà¥fÆ–FF–öâ÷V&Æ–6F–öâWf–FVæ6RföÆÆ÷w3²Fòæ÷B–æfW"6ö×ÆWF–öâ&Vf÷&RfW&–f–6F–öâà ¢Ò·…Ó“C2WFöÖFVC¢÷&–v–æÂFW†VÂ÷G&–ævÆR÷væW'6†—æB÷&F–æ'’''W6‚6†RVæ6†ævVBà¢Ò·…Ó“C2WFöÖFVC¢v†—FR÷Vâ7W&f6RÂö66ÇW6–öâ÷&F—W2öF÷V&ÆR×6–FVB&Æö6¶W'2ÂFWFW&Ö–æ—7F–2÷væVB'—FW2æBæò6÷W&6Rw&—FW2à¢Ò·…Ó“C2WFöÖFVC¢7W÷'FVB66ÆR÷G&ç6ÆF–öâÂ&÷FFVBUbÆ6VÖVçC²–çfÆ–B÷7FÆRö÷fW&Æ÷v÷&²Ö6&VgW6Âà¢Ò·…Ó“C2V&Æ–6F–öã¢Æö6Â¶†÷7FVC#s#U52ÂvW27V66W72æC#W†7BÆ—fRÖf–ÆRÖF6†W2à¢ÒæòæWs“C2òFWf–6RFW7C¢æòò6öçG&öÇ2W‡÷6VBâ÷F–öæÂæV&'““C"6×VFvRõVæFõ&VFòõ6fT÷Vâ6æ—G’öæÇ’à ¢ã“C2f–æÂÆö6ÂæöFS#Bã’ã6ö×ÆWFR&Vw&W76–öã¢¢£"Ãs#R52òd”Âò6¶—VB¢¢à¤f—fRæWròö÷væW'6†—6†V6·2Â÷&–v–æÂ6×VFvS“Có“C"VÆWfVâæB&VÆV6Rö66†Rf—fP§72öâf–æÂ'VçF–ÖRâæò÷&–v–æÂ76W'F–öç2&VÆ†VC²Ö–âö6vRô×VÇF“ãög&÷¦Và§Væ6†ævVBâ†÷7FVB&Vw&W76–öâõvW2öÆ—fR&ööbföÆÆ÷w2âæòæWròFWf–6R6öçG&öÇ2à ¢22ã“C2V&Æ–6F–öâfW&–f–VB(	B#"ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR6fV#3c“vf#csscV#3c&3ƒS&3S†3SCS&cs3VÂFW7FVBG&VP¦##6S&C†Sƒ#ƒSS3vcƒFfc–S“S3CcFf6VSSVÂ—2V&Æ—6†VBöâÖ–ââ6öææV7FVBv—@¤FFWÆöFVC2W†7BÆö6Â&Æö'2æB7&VFVBF†R–FVçF–6ÂÆö6ÆÇ’FW7FVBG&VS°¦fWF6†VBÖ–âÖF6†VBÂÆö6Â'&æ6‚Æ–væVBv—F‚æòf–ÆR6†ævW2âÆö6ÂæöFS#Bæ@¦†÷7FVBæöFS#"&Vw&W76–öã3“scS“SC#bö¦ö#“sƒ3#&÷F‚72¢£#s#RFW7G2ò ¦f–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆörF÷FÇ2fW&–f–VB††÷7FVC#’ã‡2’à¥vW33“scS“C“cS’'V–ÆC“sƒ3c3c’öFWÆ÷““sƒSƒƒ3B7V66VVFVBâÆÃ#6†V6¶V@§÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂWfW'’6†ævVB'VçF–ÖR÷væW"ÂæWròÖöGVÆRÂ&V6÷fW'’À§&WF–æVBÖ–âö6vRô×VÇF“ã÷G&–ævÆRw&‚õUb÷–çB÷&ö¦V7BöW‡÷'BæBg&÷¦Vä&WFrÖ&¶W ¦f–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6Râ&Wf–WvVB–ç3“C3²&÷FV7FVBög&÷¦Vâ'—FW2Væ6†ævVBà¤æò÷&–v–æÂ76W'F–öâ&VÆ†VBâF†—2V&Æ–6F–öâ&ööb6†ævW2f÷W"6öçF–çV—G’f–ÆW0¦öæÇ’Âv—F‚–FVçF–6ÂFW7FVB'VçF–ÖR'—FW2à ¤'V–ÆC“C26ö×ÆWFS¢æòæWr†æG2ÖöâòFW7BæVVFVB&V6W6Ræòò6öçG&öÇ2&RW‡÷6VBà¥W&R&¶Rö÷væW'6†—÷v÷&²÷&VgW6Â6÷fW&vR—2WFöÖFVBâW6W#“C%52&VÖ–ç2&÷FV7FVC°¦æW‡Bæ'&÷r'V–ÆB–çFVw&FW2W‡Æ–6—Bò×VÇF—Ç’ÖÆ–W"7&VF–öâF‡&÷Vv‚÷&–v–æÂ–ç@¦†—7F÷'’÷ööÂö6ö×÷6—F÷"v—F‚7FvVBö6æ6VÂ÷7FÆR÷&VgW6ÂwV&G2æBF†Vâf—6–&ÆR6öçG&öÇ2à¤òf÷VæFF–öâ—2Æö6ÂÖö&¦V7Cn(	3#‚6×ÆW2öæÇ’Âæ÷B&VæFW&VB54òÂæV–v†&÷W"Öö&¦V7@§6†F÷w2ÂW'6—7FVçBò&W6÷W&6W2÷"†–v‚×&W6öÇWF–öâÆ&VFò&¶–ærâÇ†“#’æ@§&VfÆV7F–öâ×&Wf–WrvFW2&VÖ–â–æFWVæFVçBâW†—7F–ær6×VFvRõ–çB†—7F÷'’õ6fT÷Và¦—2÷F–öæÂæV&'’FWf–6R6æ—G’Âæ÷Bâ–çfVçFVBò66WFæ6RvFRà ¢22ã“CBòÆ–W"–çFVw&F–öà ¢Ò·…Ò6ÖRÖf6R6÷fW&vRG&ç6fW#S"ó#BW†6ÇVFW2FÆ2æV–v†&÷W'3²Væö66ÇVFVB7W&f6W2v†—FRÂv2G&ç7&VçBÂ÷&–v–æÂ6÷W&6W2Væ6†ævVBà¢Ò·…Ò7GVÂ&Wf–Wrô6æ6VÂæò&W6÷W&6Rö†—7F÷'“²Ç’öæR÷&–v–æÂ6†V6·ö–çBÂ6VÆV7FVBVF—F&ÆR×VÇF—Ç’Æ–W"Â–æFWVæFVçBVW"ö&6R÷66Æ'2à¢Ò·…Ò7GVÃ#BT’6æ6VÂôÇ“²÷&–v–æÂ–çB†—7F÷'’Â6fT÷VâæBW†7BæF—fRôtÄ"är&WF–âV&æ6RöÆ–W"FFà¢Ò·…ÒgVÆÂ6Æ÷G2÷66Æ'2öÖ6·2ö6ö×ÆW†—G’÷7FÆR6÷W&6Rö6†V6·ö–çB÷ööÂ&VgW6Â¶VW26öÖÖ—GFVB–çBö†—7F÷'“²f–ÆVBÇ’6æF–FFR6â6æ6VÂ6fVÇ’à¢Ò·…Ò&WF–æVB–ÖvW2&VÖ–â6÷W&6RÖVF—F&ÆS²–ÖvRôò&Wf–Ww2×WGVÆÇ’W†6ÇW6—fS²FöæRG&÷2VæÆ–VBòà¢Ò²ÒDUd”4S“CB&V6W76VBUbÖW6‚&Wf–Wrõ&V6‚õ7G&VæwF‚Â6æ6VÂôÇ’æBÆ–W"÷6—G’÷f—6–&–Æ—G’V&æ6RöÆFVæ7’à¢Ò²ÒDUd”4S“CB–çBVæFõ&VFò‡6VÆV7Bò–b&VFò¶VW2&6R’Â6fT÷VâöæF—fR6†FVBW‡÷'B6æ—G’à ¥W6W#“C%52&VÖ–ç2&÷FV7FVC²æòæWrò•BõVæ6–ÂöÆFVæ7’66WFæ6R–æfW'&VBg&öÐ¤æöFRvVöÖWG'’öÖFW&–ÂôDôÒFFW'2â÷&–v–æÂÆö6ÂÖö&¦V7CcBób&¶R÷v÷&²Æ–Ö—G3°§Æ–â6öçfW‚7V&W26â&RVç6†FVBâÇ†“#’÷&VfÆV7F–öâ×&Wf–WrvFW2–æFWVæFVçBà ¢ã“CBf–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£"Ãs352òd”Âò6¶—VB¢¢à¥6—‚æWrò–çFVw&F–öâ6†V6·2²W†—7F–æs#s#R72öâf–æÂ6÷W&6S²÷&–v–æÂæV&'£“C2ó“3‚ó“C"6—‡FVVâæB&Wf–WvVB&VÆV6Rf—fRÇ6ò72âæòW†—7F–ær76W'F–öç0§&VÆ†VBâ6ö×ÆWFRòÖ†VÇW"÷–çFW"÷6†VÆÂ&WfW'6R–ç3“CB&Wf–WvVC²Ö–âö6vRô×VÇF“ãð¦g&÷¦VâVæ6†ævVBâ†÷7FVBõvW2öÆ—fRV&Æ–6F–öâ&ööbföÆÆ÷w3²FWf–6S“CBVæF–ærà ¢22ã“CBV&Æ–6F–öâfW&–f–VB(	B#"ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRSC3““v##&cvS#–6#†Ffc#–F#†3csS&FV663&CƒfÂFW7FVBG&VP¦#33Cƒf6C–Sƒsss6c#cF6–FScvcSƒ6fFÂ—2V&Æ—6†VBöâÖ–ââ6öææV7FVBv—@¤FFWÆöFVC"W†7B&Æö'2æB7&VFVB–FVçF–6ÂFW7FVBG&VS²fWF6†VBÖ–âÖF6†VBÀ¦Æö6Â'&æ6‚Æ–væVB6ÆVæÇ’âÆö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“ss#csƒ#ð¦¦ö#“ƒs“C“b&÷F‚72¢£#s3FW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FV@¦ÆörF÷FÇ2fW&–f–VBƒ#3ã2’âvW33“ss#ccc’'V–ÆC“ƒs“c“SöFWÆ÷““ƒ““csS §7V66VVFVBâÆÃ#÷7FFWÆ÷–ÖVçB6†V6¶VB6†VÆÂ÷fW'6–öâÂ6†ævVB–çFW"T’ö6÷&RöæWp¤òG&ç6fW"†VÇW"Â&WF–æVC“C2&¶RöFöÖ–âÂ&V6÷fW'’öÖ–âö6vRô×VÇF“ã÷G&–ævÆP¦vVöÖWG'’õUb÷–çB÷&ö¦V7BöW‡÷'BæBg&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚FW7FVB6÷W&6Rà¤÷&–v–æÂ76W'F–öç2&WF–æVC²&÷FV7FVBög&÷¦VâÆv÷&—F†×2Væ6†ævVBâF†—2&öö`§WFFW2f÷W"6öçF–çV—G’f–ÆW2öæÇ“²FW7FVB÷V&Æ—6†VB'VçF–ÖR'—FW2Væ6†ævVBà ¤'V–ÆC“CB—26ö×ÆWFRæB&VG’f÷"†æG2ÖöâFW7F–æs¢6–×ÆR&V6W76VBæF—fRUbÖW6€®(i"–çB(i"Ö&–VçBö66ÇW6–öâ(i"&¶Rò&Wf–Ws²÷&&—BÂ6æ6VÂ&WF–ç2&–÷"–çBà¤&¶^(i$Ç’7&VFW26VÆV7FVBVF—F&ÆRò×VÇF—Ç’Æ–W#²Æ–W"÷6—G’÷f—6–&–Æ—G’À¥–çBVæFõ&VFòÂ6fT÷VâæBæF—fR6†FVBW‡÷'B6æ—G’â&VFòföÆÆ÷w2÷&–v–æÀ§6VÆV7F–öâ'VÆW2æB6â¶VW&6R6VÆV7FVC²6†ö÷6RòÆ–W"–bæVVFVBâ6öçfW‚7V&P¦Ö’6†÷rÆ—GFÆRöæò6†F÷s²6ÖRÖö&¦V7BöÆö6ÃcL+"ób×&’&¶RÂæ÷B67&VVâ×76R÷ ¦æV–v†&÷W"Öö&¦V7Bòâv÷&²÷&VgW6ÂÆ–Ö—G2&VÖ–ã²6ÖÆÂUbÖW6†W2f—'7BâFWf–6S“C@¦V&æ6RöÆFVæ7’÷W'6—7FVæ6R66WFæ6R&VÖ–ç2VæF–ærÂæ÷B–æfW'&VBg&öÒæöFRà¥W6W#“C"6öææV7FVB6×VFvR52&÷FV7FVC²Ç†“#’÷&VfÆV7F–öâ×&Wf–Wr–æFWVæFVçBà¤æW‡Bæ'&÷r'VçF–ÖRv÷&²föÆÆ÷w27GVÃ“CBFWf–6RfVVF&6²&F†W"F†âWFöÖF–0¤òVÆ—G’öÆ–v‡F–ær6†ævW2âæòæWròFWf–6R52–æfW'&VBg&öÒöæW‡F'V–ÆBà ¢22ã“CR†–v†W"×&W6öÇWF–öâòòã“CB52v—F‚VÆ—G’W†6WF–öà ¢Ò·…ÒW6W#“CE52&÷FV7G2òv÷&¶fÆ÷s²ö÷"÷F6‡’V&æ6R&VÖ–ç2âW‡Æ–6—B÷Vâ—77VRà¢Ò·…Ò&VÃ#Sl+"ócB×&’&¶RÂf–æW"6†FRÆWfVÇ2æBæWrF†–âÖf6R6÷fW&vS²æòFÆ2Öf6R6öçFÖ–æF–öâ÷6÷W&6Rw&—FW2à¢Ò·…ÒV–6³cBób7–æ2÷WGWB'—FRÖ–FVçF–6ÂFòöÆB7–æ2÷WGWC²÷&–v–æÃ„Ò÷6—¦RwV&BFW7G2&WF–æVBà¢Ò·…Ò&öw&W72ö6æ6VÂ÷&RÖ&÷'Bö–çfÆ–BVÆ—G’ó#„Ò&VgW6Â¶VW÷WGWBFöÖ–2à¢Ò·…Ò7GVÂ–çFW"'W7’6æ6VÂö6Æ÷6R÷7FÆR6÷W&6R÷&WG'’÷ööÂö6†V6·ö–çBæBT’FVfVÇBôFöæRÆFR×&W7VÇB7W&W76–öâà¢Ò²ÒDUd”4S“CR6ÖR&V6W76VBÖöFVÂV–6²fW'7W2†–v‚ÂöÆBò†–FFVâöFVÆWFVBÂ6ÖR&V6‚õ7G&VæwFƒ¢VÆ—G’÷F6†–æW72æBv—BF–ÖRà¢Ò²ÒDUd”4S“CR6æ6VÂEU$”är&¶RÆVfW2æòÆ–W"ö†—7F÷'“²&WG'’Ç’ö÷6—G’õVæFõ&VFòõ6fT÷VâöæF—fR6†FVB÷WGWBà ¤æWrVÆ—G’vFW2&VÖ–âVæF–ærâÖVF—VÒõV–6²fÆÆ&6²f÷"6ö×ÆW‚v÷&³²æòæWp§–çB÷6÷W&6R÷66Æ"Æ–Ö—G2Â66†VÖ2÷"Æ–v‡B6÷W&6RâöÆB6fVBò×W7B&R&V&¶VBà ¢ã“CRf–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£"Ãs3r52òd”Âò6¶—VB¢¢à¤ÆÂ÷&–v–æÃ#s3æB6—‚æWrVÆ—G’ö6æ6VÆÆF–öâ6†V6·272öâf–æÂ6÷W&6S°¦÷&–v–æÂó“C2ó“CBVÆWfVâæB&Wf–WvVB&VÆV6Rf—fRÇ6ò72âæò76W'F–öç0§&VÆ†VBâ&Wf–WvVBò÷–çFW"÷6†VÆÂ&WfW'6Rw&ƒ“CS²&÷FV7FVBÖ–âö6vRô×VÇF“ãð¦g&÷¦VâVæ6†ævVBâ†÷7FVBõvW2öÆ—fRV&Æ–6F–öâ&ööbföÆÆ÷w3²FWf–6RVÆ—G’VæF–ærà ¢22ã“CRV&Æ–6F–öâfW&–f–VB(	B#2ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR&3FF#ccCSs##63&3cSFV6&CS–VcCƒFF&fÂFW7FVBG&VP¦†#SvF6F&6fS363ƒ“3&6fC†CFSVc“S“S3CÂ—2V&Æ—6†VBöâÖ–ââ6öææV7FVBv—@¤FFWÆöFVC2W†7B&Æö'2æB7&VFVB–FVçF–6ÂFW7FVBG&VS²fWF6†VBÖ–âÖF6†V@¦æBÆö6Â'&æ6‚Æ–væVB6ÆVæÇ’âÆö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“ƒƒsc3s“3Bð¦¦ö##““C3CS“R&÷F‚72¢£#s3rFW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FV@¦ÆörF÷FÇ2fW&–f–VBƒ#32ã2’âvW33“ƒƒsc3s3“'V–ÆC#““C3s2öFWÆ÷“#““Ss#3“ §7V66VVFVBâÆÃ#6†V6¶VB÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂ6†ævVBò&¶W"÷G&ç6fW"ð§–çFW"T’ö6÷&RÂ&WF–æVBFöÖ–â÷G&–ævÆRw&‚Â&V6÷fW'’öÖ–âö6vRô×VÇF“ãõUb÷–çBð§&ö¦V7BöW‡÷'BæBg&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚FW7FVB6÷W&6Râ&Wf–WvVB–ç3“CS°¦÷&–v–æÂ76W'F–öç2&WF–æVBÂ&÷FV7FVBög&÷¦VâÆv÷&—F†×2Væ6†ævVBâF†—2&öö`¦6†ævW2f÷W"6öçF–çV—G’f–ÆW2öæÇ“²FW7FVB÷V&Æ—6†VB'VçF–ÖR'—FW2Væ6†ævVBà ¤'V–ÆC“CR6ö×ÆWFRæB&VG’f÷"4ÔRÖÖöFVÂ6ö×&—6öã¢†–FRöFVÆWFRöÆBòÂVÆ—G¥V–6³cBón(i$&¶Rö–ç7V7Bô6æ6VÃ²†–vƒ#SbócBB6ÖR&V6‚õ7G&VæwF‚Â6ö×&Rf–æW"6†FP¦æBv—BF–ÖRâÖVF—VÓ#‚ócB&VÖ–ç2f–Æ&ÆR–b†–v‚v÷&²6&VgW6W2â6æ6VÂGW&–æp¦&¶RÆVfW2æòÆ–W"ö†—7F÷'“²&WG'’ôÇ’ÂÆ–W"÷6—G’÷f—6–&–Æ—G’Â–çBVæFõ&VFòÀ¥6fT÷VâöæF—fR6†F–ærâöÆB6fVBò—†VÇ2Fòæ÷BWFöÖF–6ÆÇ’–×&÷fS²&V&¶Rà¥W6W#“CE52&÷FV7G2v÷&¶fÆ÷rv—F‚W‡Æ–6—Bö÷"÷F6‡’V&æ6RW†6WF–öã³“CP¦7GVÂ•BVÆ—G’öÆFVæ7’66WFæ6R&VÖ–ç2TäD”ärÂæ÷B–æfW'&VBg&öÒæöFRà¥VÆ—G’FW7B&÷fW27GVÂ†–v†W"w&–BöÖ÷&RÆWfVÇ2÷F†–âÖf6R6÷fW&vRÂæ÷BW&fV7@§6Öö÷F†æW72öâWfW'’ÖöFVÂâÇ†“#’÷&VfÆV7F–öâvFW2&VÖ–â–æFWVæFVçBâæW‡@§'VçF–ÖR&Vf–æVÖVçBföÆÆ÷w2FWf–6R6ö×&—6öâ&F†W"F†âVç&VÆFVBÆ–v‡F–ær6†ævW2à ¢22ã“Cb(	B–çBòUb&W7F'C²ã“CRW6W"52(	B#2ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’&W÷'G2¢£“CRÒ52¢£¢&÷FV7B†–v†W"×&W6öÇWF–öâòæB—G2W†—7F–æp§&Wf–Wrö6æ6VÂöÇ’ö†—7F÷'’v÷&¶fÆ÷râF†—27WW'6VFW2V&Æ–W"VæF–æs“CRæ÷FW3°¦æò–×Æ–6F–öâöbW&fV7BòöâÆÂÖW6†W2÷"66WFæ6RöbVç&VÆFVB÷VâvFW2à ¤VF—BÖ–âC3C¢÷&–v–æÂUb&ö¦V7F–öç2æB6²ÆÂW†—7BÂæò–çB&W6WBæ@¦æòvVæW&ÂFÆ2Vçw&â†FÆ2V'2öæÇ’–âF‡G&6RFWVæFVæ7’U$Ã²6²ÆÀ¦'&ævW2W†—7F–ær—6ÆæG2æBFöW2æ÷BvVæW&FRâFÆ2â¶VWFÆ2Vçw&2§6W&FRgWGW&Ræ'&÷rF6²F‡&÷Vv‚÷&–v–æÂUbö†—7F÷'’÷væW'2à ¤ö&¦V7B(i"Ubæ÷rW‡÷6W26ÆV"–çB†¶VW2Ug2’æB6ÆV"–çB²Ug2†6†ö÷6R§&ö¦V7F–öâv–â’â&÷F‚v÷&²v—F‚7FÆRvVöÖWG'’õUb&–æF–æw2v—F†÷WB÷Væ–ær–çBà¤ÆÂ6öÆ÷W"Æ–W'2öÖ6·2ö–ÖvW2ôòÇW2&÷Vv†æW72æBÖWFÆæW72&W6÷W&6W2FWF6‚–à¦öæR÷&–v–æÂ66VæR6†V6·ö–çC²6†&VB&W6÷W&6W2ö6÷–W2&VÖ–â–çF7Bâæò&V&–æBö`¦öÆB—†VÇ2ÂæòvVöÖWG'’VF—G2ÂæòWFöÖF–2F—66&BöâUbVF—G2âVæFòõ&VFò&W7F÷&W0¦W†7B&W6÷W&6W2õUg2â&W6WB—2f÷"–æFWVæFVçB&÷„Æ"ÖW6†W3²–×÷'FVBtÄ"ÖFW&–Ç2À¦Æ–æ¶VB÷&ö6VGW&ÂöÆö6¶VB÷&VfW&Væ6Rö&¦V7G2&R&VgW6VBâW†—7F–ær&ö¦V7F–öâ&6P§&W7G&–7F–öç2&VÖ–ââf–Ww÷'B&Vg&W6‚W6W2÷&–v–æÂ&VæFW"ÖÖöFR÷væW"â7FÆR–ç@¦W'&÷'2æ÷rF—&V7BFòö&¦V7B(i"Ub(i"6ÆV"–çBà ¤f÷W"æWs“CbFW7G26÷fW"ÆÂÖ6†ææVÂ7FÆR&V6÷fW'’æB&V÷VâÂ7GVÂVæFõ&VFòô4õrÀ§7FÆRUb&VÖ÷fÂ÷&W&ö¦V7B÷&W–çBÂ&Ææ²æF—fR6fT÷VâÂæòÖ÷÷&VgW6ÂFöÖ–6—G’À¦æB÷&–v–æÂæVÂ6ÆÆ&6²÷&VæFW"FVÆVvF–öââæWrÖçVÂvFS¢&W&öGV6R7FÆP§–çB(i"6ÆV"–çB(i"–çC²6ÆV"&÷F‚(i"&÷‚ö&÷&–FR&ö¦V7F–öâ(i"–çC°¥VæFõ&VFò&W6WBæB6fT÷Vâ&Ææ²÷&W–çFVB&W7VÇBâFÆ2vVæW&F–öâæ÷B6†—VBà¥&VÆV6Rw&ƒ“Cb&Wf–WvVC²×VÇF“ãög&÷¦Vâf–ÆW2Væ6†ævVBâfÆ–FF–öâ÷V&Æ–6F–öà§&W7VÇG2föÆÆ÷s²æó“CbFWf–6R52–æfW'&VBà ¢Ò·…ÒDUd”4S“CRW6W"W‡Æ–6—FÇ’&W÷'G253²†–v†W"×&W6öÇWF–öâòv÷&¶fÆ÷r&÷FV7FVBà¢Ò²ÒDUd”4S“Cb6ÆV"–çBÂ6ÆV"–çB²Ug2Â&W&ö¦V7B÷&W–çBÂVæFõ&VFòæB6fT÷Vâà ¢ã“Cb'VçF–ÖRV&Æ—6†VC¢–c–3vV&V#“6S63ScsfSV#“†cƒ“C6fFfÂFW7FVBG&VP¦3†cC##3“&SSs6cCc6cƒƒ3FcS3Sc63ff6âÆö6ÂæöFS#BgVÆÂ&Vw&W76–öã ¢¢£"ÃsC52òd”Âò6¶—VB¢¢ƒ#"ã—2’Â–æ6ÇVF–ær÷&–v–æÃ#s3ræBf÷W"æWp§&V6÷fW'’FW7G3²æò÷&–v–æÂ76W'F–öç2&VÆ†VBâ&VÆV6R6öçG&7Bf—fR72â&VÖ÷FP¦Ö–âfWF6†VBÂW†7BFW7FVBG&VRÖF6†VBæBÆö6Â'&æ6‚Æ–væVB6ÆVæÇ’à¤†÷7FVB&Vw&W76–öã3“““ccC#æBvW33“““cc#C2fW&–f–VB&VÆ÷rà ¢ã“CbV&Æ–6F–öâfW&–f–VC¢†÷7FVBæöFS#"&Vw&W76–öã3“““ccC#ö¦ö###C#“ƒ3s§76W2¢£#sCFW7G2òf–ÇW&W2ò6¶—VB¢¢†gVÆÂÆörF÷FÇ2fW&–f–VB’ÂÖF6†–æp¦Æö6ÂæöFS#BâvW33“““cc#C2'V–ÆC##C##3ƒ2öFWÆ÷“##C#3CSC’5T44U52à¤ÆÃ#6†V6¶VB÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂ&W6WBõUb÷–çFW"ö7&VF–öâÆöFW'2À§&VÆV6R×&V6÷fW'’ôòöÖ–âô×VÇF“ãö–ç7V7F–öâ÷–çB÷&ö¦V7BöW‡÷'BæBg&÷¦Vä&WFp¦Ö&¶W"'—FRÖÖF6‚FW7FVB6÷W&6RâæòFW7FVB'VçF–ÖR6†ævVBgFW"fÆ–FF–öâà ¤'V–ÆC“Cb6ö×ÆWFRæB&VG’f÷"FWf–6RFW7F–æs¢ö&¦V7B(i"Ub(i"6ÆV"–çB¶VW0¥Ug2æB7F'G2&Ææ²–çB6W76–öâÂ–æ6ÇVF–ærF†RöÆB&–æF–ærÖW'&÷"66Râ6ÆV §–çB²Ug2W&Ö—G2g&W6‚&÷‚ö&÷&–FR&ö¦V7F–öâæB&W–çBâVæFõ&VFò&W7F÷&W0§&W6÷W&6W2õUg3²6fT÷Vâ&WF–ç26ÆV&VB÷&W–çFVB&W7VÇBâFWf–6S“CbTäD”ärâW6W#“CP¥52&÷FV7FVBâvVæW&ÂFÆ2Vçw&&VÖ–ç26W&FRgWGW&R'V–ÆC²6²ÆÂöæÇ¦'&ævW2W†—7F–ær—6ÆæG2âF†—2&ööb6†ævW26öçF–çV—G’Fö72öæÇ’à ¢22ã“Cr(	Bf—7VÂ–çBÆ–W"7F6³²W6W#“Ce52(	B#2ö7Fö&W"##` ¥W6W"&W÷'G3“Ce53¢&÷FV7BW‡Æ–6—BVæFö&ÆR6ÆV"–çBò6ÆV"–çB²Ug2À§7FÆRÖ&–æF–ær&V6÷fW'’÷&W&ö¦V7BæB÷&–v–æÂ&W6÷W&6W2ö†—7F÷'’âW6W"æ÷r&–÷&—F—¦W0¦&ö7&VFR×7G–ÆRÆ–W"Æ—7C²FÆ2Vçw&&VÖ–ç2FVfW'&VBÂæ÷B–×ÆVÖVçFVB'’6²à¤VF—B7W'&VçC†3“ƒs#¢ÆÂÆ–W"÷W&F–öç2Ç&VG’&VÆöærFò÷&–v–æÂ–çB6÷&Ræ@¥T’6öçG&öÇ3²öæÇ’G&÷F÷vâ&W6VçFF–öâW†—7FVBÂæòF‡VÖ&æ–ÂöÆ—7B÷væW"à ¥&WÆ6Rf—6–&ÆRÆ–W"G&÷F÷vâv—F‚6ö×7BF÷Öf—'7BÆ—7B–âW†—7F–æs#s'‚ÄTe@¦Fö6³£cG‚6öçFVçBF‡VÖ&æ–Ç2F—7Æ–VCC‚÷fW"6†V6¶W&&ö&BÂæÖRÂVæ—VS(	3"ÖÆWGFW ¦&ÆVæB6öFRÂ÷6—G’RÂf—6–&–Æ—G’FövvÆRÂ6VÆV7FVB&ÇVR&÷ræB–ÖvRöÖ6²Æ&VÇ2à¥F&÷rFò6VÆV7C²&ÆVæBö÷6—G’÷Vç2÷&–v–æÂ6VÆV7FVBÆ–W"6WGF–æw2&VÆ÷rÆ—7Bà¤÷&–v–æÂ†–FFVâ6VÆV7B÷f—6–&–Æ—G’æöFW2&VÖ–âWfVçBG&ç7÷'Bf÷"÷&–v–æÂ÷væW'0¦æB&Vw&W76–öâ6öçG&7G2Âæ÷BGWÆ–6FRf—6–&ÆR6öçG&öÇ2â²Æ–W"ò²–ÖvR&VÖ–à¦&W6–FR†VF–æs²–ÖvRVF—Bö6öçfW'6–öâÖ÷fW2–çFò6VÆV7FVB6WGF–æw2â÷&–v–æÂ&VæÖRÀ¦÷6—G’Â&ÆVæBÂ÷&FW"ÂFVÆWFRÂÖW&vRÂfÆGFVâÂÖ6·2æB–ÖvR7F–öç2&WF–æVBà¤&6Rf—6–&–Æ—G’ö&ÆVæBö÷6—G’7F’–Ö×WF&ÆS²66Æ"6†ææVÇ2†–FR6öÆ÷W"7F6³°¤ò7Fv–ærF—6&ÆW2&÷rVF—G2âæòæWr–çB66†VÖÂ'VFvWG2Â†—7F÷'’Â6ö×÷6—F÷"÷ ¦ÖöFVÆÆ–ær÷væW"âÆÂ÷&–v–æÂ&÷FV7FVBvW7GW&W2ô×VÇF“ãög&÷¦Vâf–ÆW2&WF–æVBà §7&2÷–çBÖÆ–W"ÖÆ—7Bæ§2—2&W6VçFF–öâöæÇ“²f–Ww÷'B–çFW"W‡÷6W2÷væVBF–ç¦Æ–W%F‡VÖ&æ–Â6æ6†÷G2öb6öÖÖ—GFVB&r6öÆ÷W"öÇ†Â&Vf÷&RÆ–W"÷6—G’ö&ÆVæBð¦Ö6²â&V&VGV7F–öâ–æ6ÇVFW2F†–âÖ&·2æBÇ†×vV–v‡FVB$t"ÂfÆ—2UgcÖf—'7@§&÷w2f÷"F÷×W&Wf–Ww2Â66†W2'’–Ö×WF&ÆR—†VÂ–FVçF—G’W6–ær6W76–öâvV´Öà¤æògVÆÂFW‡GW&R'—FW2W‡÷6VBFòDôÓ²æòF‡VÖ&æ–Ç26W&–Æ—¦VB÷"†—7F÷'’VçG&–W0¦f÷"'&÷w6–ærâWFFW2gFW"÷&–v–æÂVæ6–Â&VÆV6Rö7F–öç2ö†—7F÷'’&V÷VâÂ6ÆV'0¦öâ6Æ÷6Râ6çf2F‡VÖ&æ–Ç2&R6öçFVçB&Wf–Ww2Âæ÷Bf–æÂ6ö×÷6—FW2÷"Ö6²Ö2à ¤f—fRæWrFW7G26÷fW"ÆÃ#bVæ—VR&ÆVæB6öFW2ÂÇ†÷F†–âö÷&–VçFF–öâö÷væW'6†—À¦7GVÂT’&÷r÷&FW"ö6öçFVçBöÖ6²÷&VæÖRö&ÆVæBö÷6—G’Âf—6–&–Æ—G’öæR6†V6·ö–çBÀ¥VæFõ&VFò÷&V÷Vâõ6fT÷VâÂ7G&ö¶R6æ6VÂæB66Æ"ôòö6Æ÷6RwV&G2â÷&–v–æÃ“Ró“bð£“#‚F&vWFVC•52â†VFÆW726‡&öÖ—VÒ&VæFW&–æröb7GVÂÖ&·W÷7G–ÆW2öÆ—7BÖöGVÆP§v—F‚f—‡GW&RÖWFFFfW&–f–VBæò÷fW&fÆ÷rC#s'‚Fö6²ó#BæC3“f–Ww÷'Bv–GF‡2À§6VÆV7F–öâ6WGF–æw2÷f—6–&–Æ—G’æB67&VVç6†÷B–ç7V7F–öã²&VÂ–çFW"ö†—7F÷'’FW7FV@§F‡&÷Vv‚÷&–v–æÂ–çFVw&F–öâ†&æW72Âæò•B66WFæ6R–æfW'&VBâ67&VVç6†÷B—2¦f—‡GW&RöæÇ“²÷&–v–æÂ÷6W76–öâÆ–÷WB÷væW'2Væ6†ævVBâgVÆÂ÷V&Æ–6F–öâ&öö`¦föÆÆ÷w2âDUd”4S“Cs¢Æ–W"F2÷7G&ö¶W2÷&Wf–Ww3²&ÆVæBö÷6—G’÷f—6–&–Æ—G“²÷&FW&–ærð¦–ÖvR¶Ö6²6VÆV7F–öã²VæFõ&VFòõ6fT÷VâæBÆVgBFö6²67&öÆÆ–ærôFöæRöâ•Bà ¢Ò·…ÒDUd”4S“CbW6W"53¢VæFö&ÆRæF—fR–çBõUb&W6WBæB7FÆR&–æF–ær&V6÷fW'’&÷FV7FVBà¢Ò²ÒDUd”4S“Crf—7VÂ7F6²F2÷F‡VÖ&æ–Â&Vg&W6‚÷6WGF–æw2÷f—6–&–Æ—G’ö÷&FW"õVæFõ&VFòõ6fT÷VâæBFö6²67&öÆÂà ¢ã“Crf–æÂÆö6ÂæöFS#B&Vw&W76–öã¢¢£"ÃsCb52òd”Âò6¶—VB¢¢ƒƒã—2“°¦÷&–v–æÃ#sCæBf—fRæWrf—7VÂÖÆ—7B6†V6·2&WF–æVBâ÷&–v–æÃ“Ró“bó“#‚F&vWFVC¦æB&Wf–WvVB&VÆV6Rf—fR72âæò÷&–v–æÂ76W'F–öâ&VÆ†VBâ'VçF–ÖRV&Æ—6†V@¦sƒ““#FS–#6Vc&#ƒC–C3C#“S6cVF66Cƒ&cÂW†7BFW7FVBG&VP¦&#“vCSVf633cv#cS&fV#Cc#“fV#33cSSfVâfWF6†VBÖ–âÖF6†VBF†BG&VRæ@¦Æö6Â'&æ6‚Æ–væVB6ÆVæÇ’â†÷7FVB&Vw&W76–öâòvW2òÆ—fRÖf–ÆR&ööbfW&–f–VB&VÆ÷rà ¢22ã“CrV&Æ–6F–öâfW&–f–VB(	B#2ö7Fö&W"##` ¥'VçF–ÖSsƒ““#FS–#6Vc&#ƒC–C3C#“S6cVF66Cƒ&còFW7FVBG&VP¦&#“vCSVf633cv#cS&fV#Cc#“fV#33cSSfRV&Æ—6†VBæBfWF6†VBÖ–âÖF6†VBW†7FÇ’à¤Æö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3““3cƒCS2ö¦ö###C“cSƒs‚&÷F‚70¢¢£#sCbFW7G2òf–ÇW&W2ò6¶—VB¢£²gVÆÂ†÷7FVBÆörF÷FÇ2fW&–f–VBâ÷&–v–æÀ¦6†V6·2&WF–æVBâvW33““3cs“#2'V–ÆC##C“csƒSBöFWÆ÷“##C“#“s#r5T44U52à¤ÆÃ#6†V6¶VBÆ—fR6†VÆÂ÷fW'6–öâÂÆ–W"ÖÆ—7B÷–çFW"÷&V6÷fW'’Â&WF–æVBÆ–W"ö&ÆVæBð§–çB÷&ö¦V7BöW‡÷'BôòõUb÷&W6WBöÖ–âô×VÇF“ãæBg&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚FW7FV@§6÷W&6Râ&WfW'6RÆöFW"¶W—3“Cr&Wf–WvVC²æòFW7FVB'VçF–ÖR6†ævW2gFW"fÆ–FF–öâà¥F†—2&ööbWFFW26öçF–çV—G’Fö7VÖVçFF–öâöæÇ’à ¤'V–ÆC“Cr&VG’f÷"•BFW7F–æs¢÷Vâ–çBv—F‚Gvò÷"Ö÷&RÆ–W'2ÂF&÷w2æ@§–çBF—7F–æ7BÖ&·3²&Wf–Ww2WFFRöâVæ6–ÂÆ–gBâ&ÆVæB6öFRò÷6—G’R÷Vç0§6VÆV7FVB6WGF–æw3²VF—BF†VÒæB6†V6²&÷röÖW6‚âf—6–&–Æ—G’6†V6²FövvÆW26VÆV7FV@§&÷rv—F‚öæR÷&–v–æÂVæFó²&6R–Ö×WF&ÆRâ6†V6²–ÖvRöÖ6²&÷w2Â&V÷&FW"WôF÷vâÀ¥VæFõ&VFòõ6fT÷VâæB&÷VæFVBÆVgBFö6²67&öÆÆ–ærôFöæRâFWf–6S“CrTäD”äs³“CbW6W ¥52&÷FV7FVBâvVæW&ÂFÆ2Vçw&&VÖ–ç2FVfW'&VB&V†–æB7W'&VçBT’&WVW7Bà  ¢22ã“C‚(	B6öÖÖ—GFVB6öÆ÷W"Æ–v‡F–æs²ã“CrW6W"52(	B#2ö7Fö&W"##b„'&—6&æR ¥W6W"&W÷'G2ã“Cr53¢&÷FV7Bf—7VÂÆ–W"6VÆV7F–öâ÷F‡VÖ&æ–Ç2Â&ÆVæBö÷6—G’ð§f—6–&–Æ—G’Â†—7F÷'’÷W'6—7FVæ6RæB&÷VæFVBÄTeBFö6²â6öçF–çVR&WVW7FVB&W—# ¦6öÆ÷W"ÖöæÇ’Ub–çBö–ÖvRôò6ö×÷6—FW2×W7B&V¦ö–â66VæRÆ–v‡F–ærgFW"–çBFöæRà¤VF—BÖ–âCv&SC3ƒ¢÷&–v–æÂ7&VFT6öÖÖ—GFVE–çE7W&f6RöæÇ’6VÆV7FVB7FæF&Bf÷ §fÆ–B&÷Vv†æW72öÖWFÆæW73²6öÆ÷W"ÖöæÇ’–çFVçF–öæÆÇ’7F–VB&6–2â7GVF–ò6†F÷rfÆw0§vW&RVWVVBgFW"ÖFW&–Â7&VF–öâæB6÷VÆB&R6÷–VBFöòV&Ç’âæòÖ—76–ærÆ–v‡BÀ¦æWr&VæFW&–ærVæv–æR÷"6V6öæBÖFW&–Â÷væW"—2&WV—&VBf÷"F†—27V6–f–2FVfV7Bà ¤÷&–v–æÂ6öÖÖ—GFVB7W&f6Ræ÷rÇv—26ÆÇ2—G2W†—7F–ær7FæF&BÖFW&–ÂF‚f÷ §fÆ–B6†ææVÇ2â6öÆ÷W"&VÖ–ç2W†7B5$t"Æ&VFòÂv†—FRf7F÷"ÂFVfVÇB&÷Vv†æW73ð¦ÖWFÆæW73²æò66Æ"Ö2÷&W6÷W&6W2–çfVçFVBâ7FÆR66Æ"—2öÖ—GFVC²7FÆR6öÆ÷W §7F–ÆÂ&VgW6W2â6ÖR÷&–v–æÂvVöÖWG'’õUböÆ–fWF–ÖRæB7–æ2–FVçF—G’wV&G2â7GVF–ð§6WG2÷&–v–æÂ&öG’67B÷&V6V—fRfÆw27–æ6‡&öæ÷W6Ç’&Vf÷&R7–æ27W&f6R7&VF–öâÀ§6ò&÷F‚7F—fRæB–æ7F—fRöÆö6¶VB–çB&WÆ6VÖVçG2–æ†W&—B6†F÷w2&Vv&FÆW72ö`¦F–vW7Bög&ÖR÷&FW"âW†—7F–ær7GVF–òÆ–v‡G2÷&–röfÆö÷"æB&VfÆV7F–öâööÂVæ6†ævVBà¥–çB6†ææVÂ&VÖ–ç2–çFVçF–öæÆÇ’VæÆ—Bv†–ÆRVF—F–æs²–çBÆ—B&Wf–WrVæ6†ævVBà¤W†—7F–ær6fVB6öÆ÷W"&ö¦V7G2v–âÆ—BF—7Æ’öâ&V÷Vâ÷&V'V–ÆBv—F†÷WBÖ–w&F–öâÀ§&W6÷W&6Rö†—7F÷'’÷—†VÂöW‡÷'B6†ævW2âæòæWrò&¶RÂvVæW&ÂFÆ2Vçw&÷"6Æ–Ð§F†BF†RöÆFW"6Öö÷F‚ÖÖWFÂ&VfÆV7F–öâ&W÷'B—2&W6öÇfVB'’F†—26öÆ÷W"ÖöæÇ’f—‚à ¤f÷W"æWr–çFVw&F–öç26÷fW#S"ó#BW†7B÷væVB5$t"—†VÇ2õUg2÷6†F÷rfÆw2öF—7÷6ÂÀ¦÷&–v–æÂ7GVF–ò7F—fR¶–æ7F—fRöÆö6¶VBF‚$Tdõ$RVWVVB&Vg&W6‚Â&V'V–ÆBöF–væ÷7F–0¦6ÆVçWÂ7GVÂ–çB6†ææVÎ(i$Föæ^(i&Æ—BæBW†7B6fRô÷Vâv—F†÷WBW‡G&†—7F÷'’À§7FÆR÷&WÆ6VBö&öG’ÖÆ÷727W&W76–öââ÷&–v–æÃ“#ó“#26öÆ÷W"ÖöæÇ’&6–276W'F–öç2æ÷p§&WV—&R&WVW7FVB7FæF&BfÆÆ&6²v†–ÆR&WF–æ–ærW†7B—†VÇ2æB'6VçB7FÆP§66Æ"Ö²Æ—fR6†ææVÂW‡V7FF–öç2&VÖ–â&6–2â÷&–v–æÃ“Bó“’6öÖÖ—GFVBF—7Æ¦6†V6·2&WF–âW†7B—†VÂWVÆ—G’æBæ÷r&WV—&R&—fFRÆ—BFW‡GW&R÷væW'6†—Â0¦Ç&VG’W6VBf÷"66Æ"ÖÆ—B7W&f6W2âæWr¶æV&'’–çBöÆ–W'2÷66Æ"ð§&VfÆV7F–öâ÷&VÆV6S352âgVÆÂ&Vw&W76–öâ÷V&Æ–6F–öâWf–FVæ6RföÆÆ÷w2à ¥&Wf–WvVBVçF—&R7W&f6^(i'–çFW"÷&VæFW"öW‡÷'N(i$Æ"&WfW'6RÆöFW"w&ƒ“C‚æB6†VÆÂð§&V6÷fW'’¶W—3²&VçBöW‡÷'BVF—G2&R66†R–ç2öæÇ’âÖ–ã“3ö6vRô×VÇF“ãög&÷¦VâÀ¦''W6†W2ö†—7F÷'’÷&ö¦V7BöW‡÷'BÆv÷&—F†×2Væ6†ævVBâ7GVÂuRö•B6†F÷w2æ@¦V&æ6R&VÖ–âDUd”4S“C‚vFRÂæ÷BW7F&Æ—6†VB'’æöFRÖFW&–Â÷FW‡GW&RFW7G2à ¤DUd”4S“Cƒ¢–çBUb7V&R–â6öÆ÷W"öæÇ’ÂFöæ^(i%7GVF–òÂ÷&&—Bf÷"6†FVBf6W3²F@¦æ÷F†W"ÖW6‚æB7v—F6‚6VÆV7F–öâÂ6†F÷w2öÆ–v‡F–ær&VÖ–âöâ&÷F‚â&V÷VâW†—7F–æp§–çFVBæ&÷†Æ#²6ö×&RÆ—BF—7Æ’æB–çBVæ6†ævVBâ–çB6†ææVÂ&VÖ–ç2fÆC°¤Æ—B&Wf–WrôFöæR&W7F÷&R66VæR6†F–ærâVæFõ&VFò&VÖ–ç2–â–çC²ã“CrÆ–W"Æ—7@§&VÖ–ç266WFVBâæW‡Bæ'&÷rv÷&²föÆÆ÷w3“C‚FWf–6RfVVF&6³²¶VW–æFWVæFVç@¦Ç†“#’÷&VfÆV7F–öâvFW2æBvVæW&ÂFÆ2Vçw&&WVW7Bf—6–&ÆRà ¢Ò·…ÒDUd”4S“CrW6W"53¢f—7VÂÆ–W"7F6²÷F‡VÖ&æ–Ç2÷6WGF–æw2÷f—6–&–Æ—G’ö†—7F÷'’÷W'6—7FVæ6RæBFö6²67&öÆÆ–ær&÷FV7FVBà¢Ò²ÒDUd”4S“Cƒ¢6öÆ÷W"ÖöæÇ’–çBgFW"FöæR—266VæRÖÆ—B–â7GVF–ó²7F—fRö–æ7F—fRö&¦V7G267B÷&V6V—fR6†F÷w2Â6fRô÷Vâ&WF–ç26öÆ÷W"Â6†ææVÂVF—F–ærõVæFõ&VFòöÆ–W"Æ—7BVæ6†ævVBà  ¢ã“C‚f–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£"ÃsS52òd”Âò6¶—VB¢ ¢ƒ“rãw2’âf÷W"æWr6†V6·2ÇW2÷&–v–æÃ#sCb&WF–æVC²F&vWFVB–çBöÖFW&–ÂöÆ–W"ð¦GWÆ–6FR÷&ö¦V7B÷&VÆV6SS52â7WW'6VFVBVæÆ—B÷6†&–ærW‡V7FF–öç2–ã“#ó“#2æ@£“Bó“’vW&RWFFVBFò&WVW7FVBÆ—B÷&—fFR×FW‡GW&R&V†f–÷#²W†7B—†VÂÂ7FÆP¦6†ææVÂÂGWÆ–6FR—6öÆF–öâæBW'6—7FVæ6R76W'F–öç2&WF–æVBâ–æ—F–ÂW‡Æ÷&F÷'¦gVÆÂ'Vâ†—BF†÷6RöÆBW‡V7FF–öç3²F†—2d”äÂ6ö×ÆWFR'Vâ6Æ÷6W2ÆÂ&Vw&W76–öç2à¥&Wf–WvVBÆöFW"6Æ÷7W&S“Cƒ²Ö–ã“3ö6vRô×VÇF“ãög&÷¦VâVæ6†ævVBâ†÷7FVB&Vw&W76–öâÀ¥vW2æB÷7FFWÆ÷–ÖVçBÆ—fRÖf–ÆRfW&–f–6F–öâföÆÆ÷râFWf–6S“C‚Æ–v‡F–ærVæF–ærà  ¢22ã“C‚V&Æ–6F–öâfW&–f–VB(	B#2ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR#CS6f##&CC–3c“–C#ƒ#“c#FcFSCcÂW†7BFW7FVBG&VP¦fc“3v3–363#Sƒ&fSv63Fƒ6#V&6cfcC#“6#3&Â—2V&Æ—6†VBöâÖ–ââ6öææV7FV@¤v—BFFWÆöFVC#"W†7B&Æö'2æB7&VFVBF†R–FVçF–6ÂÆö6ÂG&VRâfWF6†VBÖ–à¦ÖF6†VBÂÆö6Â'&æ6‚Æ–væVB6ÆVæÇ’âÆö6ÂæöFS#BgVÆÂ&Vw&W76–öâæB†÷7FV@¤æöFS#"&Vw&W76–öã3““3C“3C“rö¦ö##3S#3“C#‚&÷F‚72¢£#sSFW7G2òf–ÇW&W2ð£6¶—VB¢£²6ö×ÆWFR†÷7FVBÆörF÷FÇ2fW&–f–VBƒ#C’ã—2’âvW33““3C“3s3r'V–Æ@£#3S#C#S’öFWÆ÷“#3S##3S#cB7V66VVFVBâÆÃ’6†V6¶VB÷7FFWÆ÷–ÖVçBf–ÆW0¢‡6†VÆÂ÷fW'6–öâÂ6ö×ÆWFR6†ævVB'VçF–ÖRôÆ"w&‚Â&V6÷fW'’Â&WF–æVC“CrÆ–W"Æ—7BÀ¦Ö–ã“3ö6vRô×VÇF“ãæBg&÷¦Vä&WFrÖ&¶W"’'—FRÖÖF6‚FW7FVB6÷W&6Râ&Wf–WvVB–ç3°¦æò&÷FV7FVBög&÷¦Vâ6†ævW2âF†—2&ööbWFFW2f÷W"6öçF–çV—G’f–ÆW2öæÇ’æB¶VW0§FW7FVB÷V&Æ—6†VB'VçF–ÖR'—FW2Væ6†ævVBâW6W#“Cu52—2&÷FV7FVBÂæ÷B–æfW'&VC“C‚à ¤'V–ÆC“C‚6ö×ÆWFRæB&VG’f÷"FWf–6RFW7F–æs¢6öÆ÷W"ÖöæÇ’–çFVBUb7V&R(i"FöæR(i ¥d”Ur7GVF–òÂ÷&&—Bf÷"6†FVBf6W2æB66VæR6†F÷w2âFBæ÷F†W"ÖW6‚÷7v—F6‚7F—fP§6VÆV7F–öã²–çFVB–æ7F—fRö&¦V7G2&VÖ–â66VæRÖÆ—Bâ&V÷VâW†—7F–ær–çFVBæ&÷†Æ"À¦6öæf—&ÒV&æ6RæB÷&–v–æÂ6öÆ÷W#²&V÷Vâ–çBf÷"6†ææVÂ‡VæÆ—B’ôÆ—BæB&WF–æV@£“CrÆ–W"Æ—7BÂVæFõ&VFòö6öçF–çVR–çF–ærâ7FæF&BÖFW&–Â÷6†F÷r–æ†W&—Fæ6Ræ@¦W†7B'—FW2fW&–f–VBWFöÖF–6ÆÇ“²&VÂuRö•B6†F÷röV&æ6R66WFæ6RVæF–ærà¤öÆFW"6Öö÷F‚ÖÖWFÂ&VfÆV7F–öâæBÇ†“#’vFW2&VÖ–â–æFWVæFVçC²vVæW&ÂFÆ0§Vçw&&VÖ–ç2gWGW&Rv÷&²…6²ÆÂ'&ævW2W†—7F–ær—6ÆæG2’âæòæWrÆ–v‡Bö''W6‚ð¦†—7F÷'’÷&ö¦V7BöW‡÷'BöÖöFVÆÆ–ær÷væW"÷"6÷W&6R—†VÂ÷66†VÖ6†ævW2à  ¢22ã“C’(	B&÷VæFVBf6RFÆ2Ug3²ã“C‚W6W"52(	B#2ö7Fö&W"##b„'&—6&æR ¥W6W"U$dT5B53“C‚&÷FV7G26öÖÖ—GFVB6öÆ÷W"ÖöæÇ’66VæRÆ–v‡F–ærõ7GVF–ò6†F÷w2À¦7F—fRö–æ7F—fRV&æ6RÂW†—7F–ær–çBöÆ–W'2ö†—7F÷'’÷W'6—7FVæ6RæB6†ææVÂôÆ—Bà¤æW‡BVF—FVBFVfW'&VBFÆ2&WVW7BâÖ–âSV&cCF#2†2&÷‚õÆæ"ô7–Æ–æFW"õ7†W&RõF÷'W2À¦FVç6—G’WVÆ—¦F–öâæB6²ÆÂÂ'WBæò¦ö–æVBÖ6†'BövVæW&ÂFÆ26öÇfW"â†FÆ0¦—2öæÇ’âVçW6VBF‡G&6RFWVæFVæ7’U$ÂâæòæWrW‡FW&æÂÆ–'&'’ö¶W&æVÂ–×÷'FVBà ¤ö&¦V7B(i"Ub(i"f6RFÆ2æ÷r7FvW2õ$”t”äÂ&÷‚F—&V7F–öæÂW"Öf6R&ö¦V7F–öâÀ¤õ$”t”äÂFVç6—G”Æ–÷WBv—F‚W‡Æ–6—BöæRÖ—6ÆæB×W"×öÇ–vöâÖVÖ&W'6†—ÂF†Vâõ$”t”äÀ§6¶VDÆ–÷WBâöæÇ’f–æÂ6÷&æW'26öÖÖ—BF‡&÷Vv‚6öÖÖ—DæF—fUUc¢öæRæF—fR6†V6·ö–çBÀ§&VBÖöæÇ’öÆB÷VW"–ÆöG2Âæò6÷W&6RvVöÖWG'’öf6RÖw&÷W6†ævW2â&WVB—2âW†7@¦æòÖ÷â÷&–v–æÂ&ö¦V7F–öç2õ6²öFVç6—G’ÖF‚æBFBWFöÖF–26†ö–6W2Væ6†ævVBà ¥F†—2—2d•%5B&÷VæFVBf6RFÆ3£(	3#‚Ææ"öÇ–vöç2Î(šC#²6÷&æW'2ÂöæR—6ÆæBW ¦f6RÂ6öÖÖöâfW&vRv÷&ÆBÖ&VFVç6—G’ÂW†—7F–ærã"F–ÆRÖ&v–ç2öv2öw&–B6¶–ærà¤—B7WG2WfW'’f6R&÷VæF'“²—BFöW2äõB¦ö–â6†'G2Â÷F–Ö—¦R6¶–ærÂWF†÷"6V×2À¦÷"–×ÆVÖVçB†FÆ2övVæW&Â7W'fVBVçw&âFöÖ–æçB×ÆæR&ö¦V7F–öâ&WF–ç2—G0¦W†—7F–æræwVÆ"F—7F÷'F–öã²WVÂFVç6—G’f—†W2fW&vR&VÂæ÷BævÆRF—7F÷'F–öâà¤–çfÆ–BöæöçÆæ"öFVvVæW&FRö÷fW"ÖÆ–Ö—BæB–×÷'FVB÷&ö6VGW&ÂöÖöF–f–W"F&vWG2&VgW6Rà¥F†—266÷R—2f—6–&ÆR&W6–FRF†R'WGFöâÂæ÷B†–FFVâ&V†–æBvVæW&–2Vçw&6Æ–Òà ¤ç’6öÆ÷W"÷&÷Vv†æW72öÖWFÆæW72–çB&VgW6W2$Tdõ$R7Fv–ærö†—7F÷'“²T’F—6&ÆW2f6P¦FÆ2v—F‚–çB&W6VçBæBö–çG2FòW‡Æ–6—BW†—7F–ær6ÆV"–çBò6ÆV"–çB°¥Ug2âæò6–ÆVçB–çBF—66&BÂ&W6×Æ–ær÷"7FÆR×&W6÷W&6R&V&–æBâW†—7F–ær7FÆRæF—fP¥Ug26â&R&WÆ6VBgFW"6ÆV&–ær–çBâVæFò&W7F÷&W2öÆBUg3²–çB&W6WB&VÖ–ç2§6W&FRVæFö&ÆRW6W"7F–öââæF—fR6öFV2Â÷&–v–æÂ–çBôÆ—Bõ6fT÷VâôäôÒôtÄ"÷væW'0¦†æFÆRVæ6†ævVBfW'6–öã6÷W&6S¦&÷†Æ"f6RÖ6÷&æW"–ÆöBâæò66†VÖ÷w&—FW"ö†—7F÷'¦÷"ÖöFVÆÆ–ær¶W&æVÂFFVC²æòWFöÖF–2FÆ2öâFBÂæòæWrUbö–çFW"õT’÷væW"à ¥6—‚æWr–çFVw&F–öç26÷fW"6öæ6fR÷F–ÇFVBöF—66öææV7FVB÷7V&F—f–FVBÆæ"f6W2À¦æöâÖ÷fW&Æ–ær6W&FR&÷VæG2öWVÂfW&vRFVç6—G’öW†7BvVöÖWG'’Ã#‚Öf6RÆ–Ö—Bð§66ÆR÷&VgW6Ç2Â&VÂ÷&–v–æÂVæFõ&VFòö–FV×÷FVæ6R÷VW"4õrÂW‡Æ–6—B–çB&VgW6Âð¦6ÆV"÷&W–çBÂ÷væW"ö†—7F÷'’FöÖ–2&VgW6ÂÂW†7BæF—fR&ö¦V7BôäôÒôtÄ"Ug2æ@¦7GVÂUbæVÂF&vWBö6öçFW‡B6ÆÆ&6²âæWr´&÷‚õ6²öFVç6—G’÷&W6WB÷&VÆV6S353°¦æòW†—7F–ær76W'F–öâ6†ævVBâgVÆÂ&Vw&W76–öâ÷V&Æ–6F–öâföÆÆ÷w3²•C“C’VæF–ærà ¥7W&f6RVF—Bf÷VæBÆ"6×ÆW2röÆC“BUb–×÷'B'6VçBg&öÒF†R&Wf–WvVB66†P¦Öæ–fW7BâFFVBF†B$TÂFWVæFVæ7’æB&Vg&W6†VB—G26×ÆW>(i$Æ.(i&–æFW‚æ6W7F÷'2À¦Æöæw6–FR÷&–v–æÂÖW6„†VÇF‚ôFBô×VÇF’Ub–×÷'Bw&ƒ“C’æB6†VÆÂ÷&V6÷fW'’¶W—2à¤öæÇ’UbÖW"²ÖW6„†VÇF‚gVæ7F–öæÆ—G’6†ævW3²÷F†W"6÷W&6R6†ævW2&R–ç2à¤Ö–ã“3ö6vRô×VÇF’×G&ç6f÷&Óãög&÷¦Vâó“C†Æ–v‡F–ær÷–çBöW‡÷'BÆv÷&—F†×2Væ6†ævVBà ¤DUd”4S“C“¢Æ–â7V&R÷"6ÖÆÂÆæ"Öf6VBW‡G'VFVBÖW6‚(i"ö&¦V7B(i"Ub(i"f6RFÆ0®(i"÷VâUbVF—F÷#¢6W&FRf6R—6ÆæG2–ç6–FRF–ÆRâVæFõ&VFò&W7F÷&W2÷&VÆ–W2Ug3°¥–çBôFöæR&WF–ç266WFVC“C‚Æ—B66VæRâW†—7F–ær–çC¢W‡Æ–6—FÇ’6ÆV"–çBf—'7BÀ§F†Vâf6RFÆ2÷&W–çBâ6fT÷VâæB÷F–öæÂäôÔB&WF–âæWrUg2÷–çBã#‚Ææ ¦f6W2Ö†–×VÓ²æöçÆæ"f6W2&WV—&R÷F†W"&ö¦V7F–öâ÷"gWGW&R6†'BVçw&à¤æW‡C£“C’FWf–6RfVVF&6²ÂF†Vâ66÷VBFÆ2ö6†'B–×&÷fVÖVçG2÷"VFvR6VÒWF†÷&–æp¦VF—BâvVæW&Â¦ö–æVBÖ6†'BVçw&&VÖ–ç2VWVVC²æòWFöÖF–2¶W&æVÂ&WÆ6VÖVçBà ¢Ò·…ÒDUd”4S“C‚W6W"U$dT5B53¢6öÖÖ—GFVB6öÆ÷W"ÖöæÇ’Æ–v‡F–ærõ7GVF–ò6†F÷w2æB&–÷"–çBö†—7F÷'’÷W'6—7FVæ6R&÷FV7FVBà¢Ò²ÒDUd”4S“C“¢f6RFÆ2öâ6ÖÆÂÆæ"ÖW6‚ÂVF—F÷"—6ÆæG2ÂVæFõ&VFòÂW‡Æ–6—B6ÆV"÷&W–çBÂ6fT÷VâæB&WF–æVC“C‚Æ—BV&æ6Rà  ¢ã“C’f–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£"ÃsSb52òd”Âò6¶—VB¢ ¢ƒãw2’Â&WF–æ–ærWfW'’÷&–v–æÃ#sS6†V6²ÇW26—‚æWrf6RFÆ2–çFVw&F–öç2à¤æWr¶æV&'’&÷‚õ6²öFVç6—G’÷&W6WB÷&VÆV6S352âæòW†—7F–ær&V†f–÷"76W'F–öâ6†ævV@¦÷"&VÖ÷fVBâ&Wf–WvVBUbôFBô×VÇF’ôÆ"&WfW'6R–ç3“C’–æ6ÇVF–æræWvÇ’&V6÷&FVBÆ §6×ÆR–×÷'C²Ö–ã“3ö6vRô×VÇF’×G&ç6f÷&Óãög&÷¦Vâó“C†Æ–v‡F–ærVæ6†ævVBâ†÷7FV@§&Vw&W76–öâõvW2öÆ—fRV&Æ–6F–öâ&ööbföÆÆ÷w2âDUd”4S“C’&VÖ–ç2VæF–ærà  ¢22ã“C’V&Æ–6F–öâfW&–f–VB(	B#2ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR3C&cV#F6##ƒ##CcvC#VF3“c3#ƒC3CC“&ÂW†7BFW7FVBG&VP¦SvfCCcCS63S3c63csc“f#F3fS#fFSS3†#Â—2V&Æ—6†VBöâÖ–ââ6öææV7FV@¤v—BFFWÆöFVCRW†7B&Æö'2÷G&VS²fWF6†VBÖ–âÖF6†VBÂÆö6Â'&æ6‚Æ–væV@¦6ÆVæÇ’âÆö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3““3sc#SsRö¦ö##3cƒs#“"&÷F€§72¢£#sSbFW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆörF÷FÇ2fW&–f–V@¢ƒCRã2’âvW33““3sc3Sb'V–ÆC#3cƒsSS2öFWÆ÷“#3ccƒ#"7V66VVFVBâÆÃ# ¦6†V6¶VB÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂ6ö×ÆWFRUbôFBô×VÇF’ôÆ"w&‚Â&V6÷fW'’À§&WF–æVBUbv÷&·76Rö–ç7V7F÷"ó“C‚Æ—B÷væW'2öÖ–âö6vRô×VÇF’×G&ç6f÷&Óãó“CrÆ–W ¦Æ—7Bög&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚FW7FVB6÷W&6RâæòW†—7F–ær76W'F–öç2&VÖ÷fVB÷ ¦6†ævVBâF†—2&ööbWFFW2f÷W"6öçF–çV—G’f–ÆW2öæÇ’Â&WF–æ–ærFW7FVB'VçF–ÖRà ¤'V–ÆC“C’6ö×ÆWFRæB&VG’f÷"FWf–6RFW7F–æs¢Æ–â7V&R÷"6ÖÆÂÆæ"Öf6V@¦W‡G'VFVBÖW6‚(i"ö&¦V7B(i"Ub(i"f6RFÆ2(i"÷VâUbVF—F÷"â6W&FRf6R—6ÆæG2À¥VæFõ&VFòÂ–çBôFöæR&WF–ç266WFVC“C‚Æ–v‡F–ærÂ6fT÷VâæB÷F–öæÂäôÔBà¤W†—7F–ær–çB×W7B&RW‡Æ–6—FÇ’6ÆV&VBf—'7C²7F–öâæWfW"F—66&G2—Bâf6RFÆ0¦—2öæR—6ÆæBW"Ææ"f6RÂWFó#‚f6W2ó#²6÷&æW'3²—B—2æ÷B¦ö–æVBÖ6†'B÷ ¦vVæW&Â7W'fVBVçw&âW†—7F–ær&÷‚õÆæ"ô7–Æ–æFW"õ7†W&RõF÷'W2õ6²öWFòÔFB&WF–à¦÷&–v–æÂÆv÷&—F†×2âDUd”4S“C’VæF–æs²W6W#“C‚U$dT5B52&÷FV7FVBâæW‡B7GVÀ£“C’fVVF&6²ÂF†Vâ66÷VBFÆ2ö6†'B÷6VÒF—&V7F–öââÇ†“#’÷&VfÆV7F–öâ–æFWVæFVçBà  ¢22ã“S(	Bf6RFÆ2v'VBÖf6R&W—#²ã“C’FWf–6Rd”Â(	B#2ö7Fö&W"##b„'&—6&æR ¥W6W#“C’&W÷'G2F†RWVÆ—¦RÖFVç6—G’Ææ"öæöâÖFVvVæW&FRW'&÷"gFW"÷&F–æ'¦W‡G'W6–öç2÷66ÆW2â67&VVç6†÷B6öæf—&×3“C’æC#GfW'G2ó#f6W2Âf"&VÆ÷s#‚Öf6R6à¤W†7B7WÆ–VBW‡G'VFRæB66ÆRæö&¢&W&öGV6W2&V¦V7F–öã¢f—'7Bf÷W"öÇ–vöç2&P¦Ö–ÆFÇ’v'VB‡ö–çB×Fò×ÆæRFWf–F–öç>(˜‚ã(	2ã2Æö6ÂVæ—G2’âF†—2—3“C’w2FÆ0§Ææ&—G’&W7G&–7F–öâÂæ÷BWf–FVæ6RöbFÖvVBÖöFVÆÆ–ærF÷öÆöw’÷"7FÆR'V–ÆBà¤ô$¢W‡÷'FW"†VFW#ƒ“"—2F†R&WF–æVB–çFW&æÂw&—FW"7F×Âæ÷B6†VÆÂ&VÆV6Rà¤W†7B–çWB&WF–æVB2FW7G2öf—‡GW&W2öW‡G'VFRÖæB×66ÆRÓ“Sæö&£²4„#S`£ss†CS#Sc3“&fSƒc#FCƒƒCcc36#FSvVCƒscvVFSC3†3“#s&#CfBÂ–FVçF–6ÂFòWÆöBà ¤÷&–v–æÂf6RFÆ2f—'7BG&–W2U„5C“C’Ææ"F‚âöæÇ’—G2Ææ"ö&V&VgW6À§&WVW7G2F†Rõ$”t”äÂ'V–ÆEUe&Wf–WtvVöÖWG'’‡¶f6T–æF–6W3§G'VWÒ’÷væW"Âf÷'v&FV@¦W‡Æ–6—FÇ’'’ÖW6„†VÇF‚Ub6ÆÆ&6²â÷&–v–æÂG&–ævÆ^(i&f6R÷fW'FW‚ÖWFFF&V6öÖW0§G&ç6–VçBÆö6ÂÖ6÷&æW"Æ—7G3²æòG&–æwVÆF÷"ÂæWrF¦6Væ7’÷"ÖW6‚×WFF–öââ&WV—&P¦6ö×ÆWFRî(‰#"G&–ævÆW2W"öÇ–vöâÂfÆ–BVæ—VR6÷&æW"÷væW'6†—Âf–æ—FRæöç¦W&òU`§G&–ævÆR&V2æB6öç6—7FVçBW"Öf6RUb÷&–VçFF–öââföÆFVBö6öÆÆ6VB6æF–FFW0§&VgW6Rv—F‚f6RçVÖ&W#²'6VçBöf–ÆVB&Wf–Wr&VgW6W2âFV×÷&'’vVöÖWG'’F—7÷6W0¦–âf–æÆÇ’öâ7V66W72öW'&÷"â6ÖR÷&–v–æÂFVç6—G’ÖF‚÷F–öæÆÇ’7V×2ÖV7W&V@¦æ÷&ÖÆ—¦VB4BG&–ævÆR&V3²7FæFÆöæRWVÆ—¦RFVç6—G’$UD”å27G&–7BÆæ"'VÆRà¤÷&–v–æÂÆæ"÷WGWG2öW‡G&VÖR66ÆW2&VÖ–âW†7C²æò&Ææ¶WBFöÆW&æ6R&VÆ†F–öâà ¤f–æÂFÆ27F–ÆÂW6W2÷&–v–æÂ6²ö6öÖÖ—BÂöæR—6ÆæBW"6÷W&6Rf6RæBöæR66VæP¦6†V6·ö–çC²6÷W&6RVG2öævöç2÷÷6—F–öç2öw&÷W2æBöÆB÷VW"&W6÷W&6W2&VÖ–â–çF7Bà¤æòW&ÖæVçBG&–æwVÆF–öâ÷"66†VÖöW‡÷'Bö†—7F÷'’ö''W6‚öÆ–v‡F–ær6†ævW2â÷&–v–æÀ£#†f6W2ó#¶6÷&æW"÷ööÂö†—7F÷'’ö6ÆV"×–çBwV&G2&WF–æVBâT’æòÆöævW"6ÆÇ2FÆ0§Ææ"ÖöæÇ“²6—27W'fVBf6W2Ö’7G&WF6‚âF†—2—27F–ÆÂ&ö¦V7FVBW"Öf6RFÆ2À¦æ÷B¦ö–æVBÖ6†'BövVæW&ÂUb÷F–Ö—¦F–öâ÷"wV&çFVRWfW'’föÆFVBf6RÖ2à ¤f—fRæWr–çFVw&F–öç2W†W&6—6RW†7BW6W"f–ÆRv—Fƒ#6W&FVBWVÂÖFVç6—G’—6ÆæG2À§Væ6†ævVC#BfW'F–6W2óGVG2ófævöç2ÂFV×÷&'’F—7÷6ÂæBW†7B&WVC²÷&F–æ'¦W‡G'W6–öâ¶†—2×66ÆR&W&öGV6W"Bãóó²÷&–v–æÂVæFõ&VFòõ–çBöW†7B6fT÷Vâð¦7GVÂäôÒæBtÄ"Ub·–çB6Æ÷G3²Væf–Æ&ÆRöÖÆf÷&ÖVBöföÆFVB&Wf–Wr÷&VgW6VB†—7F÷'’ð§–çBFöÖ–6—G“²7GVÂæVÂf÷'v&F–ær÷F&vWBwV&G2â÷&–v–æÃ“C’æVvF—fRVæf–Æ&ÆP§v'VB×&Wf–WrFW7B&WF–æVC²—G2T’v÷&F–ærW‡V7FF–öâföÆÆ÷w2–çFVæFVB66÷R6†ævRà¤÷&–v–æÃƒ“R7FæFÆöæRæöçÆæ"&VgW6Â7F—27F—fRâfö7W6VBæWró“C’öFVç6—G’õ6²ð§&VÆV6S#e53²gVÆÂfÆ–FF–öâ÷V&Æ–6F–öâföÆÆ÷w2âæF—fRFW7B&W&W2F‡&÷Vv‚5ETÀ§w&—FW"w2fW'6–öæVB–çBÖW‡÷'B÷væW"†ÖöGVÆRÖÆö6ÂvV´Ö2“²6æöæ–6Â¥4ôâ†æFÆW0¦7&÷72×&VÆÒUb&÷F÷G—W2v—F†÷WBvV¶Væ–ærW†7BfÇVW2â&—FÖ6†–Ò—2G&ç7÷'@¦öæÇ’Âæ÷BuRôæöÖBf—7VÂ&ööbâÖ–âö6vRô×VÇF’×G&ç6f÷&Òög&÷¦Vâ'—FW2Væ6†ævVBà ¤DUd”4S“S¢4ÔR7WÆ–VBÖöFVÂ(i"ö&¦V7B(i"Ub(i"f6RFÆ2(i"÷VâUbVF—F÷"6†÷VÆ@¦ÖÆÃ#f6W2âVæFõ&VFò&W7F÷&W2÷&VÆ–W2÷&–v–æÂVG2õUg3²–çBôFöæR&VÖ–ç0§66VæRÖÆ—C²6fT÷VâæB÷F–öæÂäôÔB6æ—G’â6ÆV"W†—7F–ær–çBW‡Æ–6—FÇ’f—'7Bà¤W†7BWÆöFVBÖW6‚æ÷rÖ2–âWFöÖFVB&VÂÖ÷væW"Fƒ²7GVÂ•C“SvFRVæF–ærÀ¦æ÷B–æfW'&VB52ã“C‚66VæRÖÆ–v‡F–ær66WFæ6R&VÖ–ç2&÷FV7FVC³“C’v'VBf–ÇW&P§&V6÷&FVBâæW‡B7GVÃ“S&WFW7C²FöâwB6²W6W"FòW&ÖæVçFÇ’G&–æwVÆFRfÆ–B&÷€¦ÖöFVÂ2v÷&¶&÷VæB÷"FB6V6öæBÖöFVÆÆ–ærõUb¶W&æVÂâ÷F†W"6†'B÷6VÒv÷&²VWVVBà ¢Ò·…ÒDUd”4S“S¢W6W"52öæW‡F'V–ÆB&÷FV7G27WÆ–VBW‡G'W6–öâ÷66ÆRFÆ2&W—"ã“C’÷&–v–æÂf–ÇW&R&WF–æVC²÷F–öæÂæF—fRÖW‡÷'B6†V6·2&Ræ÷B6W&FVÇ’–æfW'&VBà  ¢ã“Sf–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£"Ãsc52òd”Âò6¶—VB¢ ¢ƒã—2’Â&WF–æ–ær÷&–v–æÃ#sSbÇW2f—fRæWrW†7BÖf–ÆR÷v'VBÖf6R–çFVw&F–öç2à¤fö7W6VBæWró“C’öFVç6—G’õ6²÷&VÆV6S#e52âöÆC“C’Væf–Æ&ÆR×&Wf–WröFVvVæW&7§&VgW6Ç2&VÖ–ã²—G2T’FW‡BW‡V7FF–öâ&VfÆV7G2æWr66÷Râ7FæFÆöæRFVç6—G“ƒ“P§Ææ&—G’6öçG&7BVæ6†ævVBâ7WÆ–VBô$¢f—‡GW&R'—FRÖ–FVçF–6Ã²æò6÷W&6RWÆö@¦ÖöF–f–VBâ&Wf–WvVBgVÆÂUbôFBô×VÇF’ôÆ"÷&V6÷fW'““Sw&‚ÂÖ–âö6vRô×VÇF’×G&ç6f÷&Òð¦g&÷¦Vâö66WFVC“C†Æ–v‡F–ærVæ6†ævVBâ†÷7FVBõvW2öÆ—fR&ööbföÆÆ÷w3²FWf–6S“S ¥4ÔRÖÖöFVÂFÆ2÷–çBõVæFõ&VFòõ6fT÷Vâ66WFæ6RVæF–ærÂæó“C’52–æfW'&VBà  ¢22ã“SV&Æ–6F–öâfW&–f–VB(	B#2ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRF3f3cSSs#vcƒc“6scCƒvVFSC#VS&&CÂW†7BFW7FVBG&VP¦Cs3sƒs“CsSV36ccCv#C&C&c“6CFScVVFÂ—2V&Æ—6†VBöâÖ–ââ6öææV7FV@¤v—BFFWÆöFVCrW†7B&Æö'2÷G&VS²fWF6†VBÖ–âÖF6†VBæBÆö6Â'&æ6‚Æ–væV@¦6ÆVæÇ’âÆö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3““C#sS“cSbö¦ö##3ss“Sc“ƒ’&÷F€§72¢£#scFW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆörF÷FÇ2fW&–f–V@¢ƒ#Crã'2’âvW33““C#sS“CSb'V–ÆC#3ss“c"öFWÆ÷“#3sƒSƒƒƒR7V66VVFVBâÆÃ# ¦6†V6¶VB÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂ6ö×ÆWFRUbôFBô×VÇF’ôÆ"w&‚Â&V6÷fW'’À§&WF–æVBUbv÷&·76Rö–ç7V7F÷"ó“C‚Æ—B÷væW'2öÖ–âö6vRô×VÇF’×G&ç6f÷&Óãó“CrÆ–W ¦Æ—7Bög&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚FW7FVB6÷W&6Râ÷&–v–æÃƒ“RÆæ"ÖFVç6—G’wV&@§&WF–æVC³“C’T’v÷&F–ærWFFVBf÷"–çFVæFVBv'VBÖf6R7W÷'BâF†—2&ööb6†ævW0¦f÷W"6öçF–çV—G’f–ÆW2öæÇ’Â&WF–æ–ærFW7FVB'VçF–ÖRâ÷&–v–æÂ7WÆ–VBô$¢Væ6†ævVBà ¤'V–ÆC“S6ö×ÆWFRæB&VG“¢4ÔRW‡G'W6–öâ÷66ÆRÖW6‚(i"ö&¦V7B(i"Ub(i"f6RFÆ2(i ¤÷VâUbVF—F÷"6†÷VÆBÖÆÃ#f6W2â÷&–v–æÂVG2öævöç2&VÖ–ã²VæFõ&VFò&W7F÷&W0¥Ug2Â–çBôFöæR&WF–ç3“C‚Æ–v‡F–ærÂ6fT÷VâæB÷F–öæÂäôÔB6æ—G’âW†7B7WÆ–V@¦f–ÆRæ÷r76W2&VÂÖ÷væW"FÆ2÷–çBö†—7F÷'’÷G&ç7÷'B–çFVw&F–öç2Â'WB•C“S ¦V&æ6R÷W&f÷&Öæ6R66WFæ6R&VÖ–ç2VæF–ærâ6ÆV"W†—7F–ær–çBW‡Æ–6—FÇ¦f—'7Bâ6÷W&6S“C’f–ÇW&R&V6÷&FVBÂæ÷B66WFVB253²W6W#“C‚U$dT5B52&÷FV7FVBà¤æW‡B7GVÃ“SfVVF&6²&Vf÷&RVç&VÆFVBfVGW&W3²æòW&ÖæVçBG&–æwVÆF–öâv÷&¶&÷VæBà  ¢22ã“S(	B÷F–öæÂ6÷Ææ"FÆ3²ã“SW6W"52&÷FV7FVB(	B#2ö7Fö&W"##` ¥W6W"&WÆ–W252öæW‡F'V–ÆBgFW#“S¢&÷FV7BF†R7WÆ–VBW‡G'W6–öâ÷66ÆRf6RFÆ0§&W—"æBW†—7F–æs“C‚Æ—B×–çB66WFæ6Rã“C’÷&–v–æÂv'VBf–ÇW&R7F—2&V6÷&FVBà¤VF—C¢W†—7F–ær&÷‚&ö¦V7F–öâÇ&VG’v—fW2ÖF6†–ærUg2öâF¦6VçB6ÖRÖF—&V7F–öà¦f6W3²÷&–v–æÂ–×÷'FVB×WbÖ–ç7V7F–öâ÷vç2Öæ–föÆBF¦6Væ7’÷Væ–öã²FVç6—G’õ6²æ@¦æF—fRUb6öÖÖ—Bö†—7F÷'’Ç&VG’W†—7Bâæò÷F†W"Æ—fR6†'BÖ¦ö–æ–ærFÆ2f÷VæC²F†P§F‡G&6W"†FÆ2FWVæFVæ7’—2Vç&VÆFVBâFB÷F–öæÂö&¦V7B(i"Ub(i"6÷Ææ"FÆ2à ¤&÷F‚ÖöFW26†&R÷&–v–æÂ&—fFR&÷‚(i"FVç6—G’(i"w&–B6²(i"ôäR6öÖÖ—B—VÆ–æRà¤f6RFÆ2&WF–ç2öæR—6ÆæBW"f6RæBW†7C“S÷WGWG2â6÷Ææ"ÖöFRW6W2f—†V@§6VVBÆæW2†æ÷&ÖÆ—¦VBf–æ—FR6ö÷&F–æFW2Â÷&–VçFVBæ÷&ÖÂ÷Ææ&—G’FöÆW&æ6SRÓÀ¦æò67V×VÆFVBæV–v†&÷W"G&–gB’ÂÆVf–ærv'VBf6W2—6öÆFVBâ÷&–v–æÂ–ç7V7F÷ ¦vWG2÷BÖ–â6ä¦ö–äf6W2&VF–6FS²FVfVÇB&V†f–÷"Væ6†ævVBâ¦ö–âöæÇ’÷÷6—FP§6†&VBVFvRF—&V7F–öç2ÂÖF6†–ær&÷‚UbVæGö–çG2Â6ÖR6VVBÆæRæBW†7FÇ’Gvð¦Öæ–föÆB÷væW'2âF—66öææV7FVBö6ö–æ6–FVçBfW'FW‚÷6—F–öç2æBÖ&–wV÷W2VFvW2æWfW ¦¦ö–ââæòÖW6‚VF—G2ÂæWrG&–æwVÆF÷"öF¦6Væ7’¶W&æVÂÂW'6—7FVçB6†'BÖWFFF÷ ¥Ub66†VÖâ÷&–v–æÃ“S&Wf–WrfÆÆ&6²†æFÆW2v'VB&V²7FæFÆöæRFVç6—G“ƒ“P§7F–ÆÂÆæ"ã#‚Öf6Ró#²Ö6÷&æW"Æ–Ö—BæBW‡Æ–6—B6ÆV"ÖÆÂ×–çB&W&WV—6—FR7F’à¥F†—2—26öç6W'fF—fR6÷Ææ"w&÷W–ærÂæ÷B&&—G&'’Vçw&÷"÷F–ÖÂ6¶–æs°¦–çfÆ–B6VÆbÖ÷fW&Æ–ærvVöÖWG'’æBvVæW&Â7W'fVB7G&WF6‚&Ræ÷B6öÇfVBà ¥6—‚æWrFW7G3“S6÷fW"6öææV7FVBF6‚÷6VÒVæGö–çG2ö—6ÆæBVF—F–æs²&VæG2÷v'2ð§6ÖR×v–æF–ærGWÆ–6FW2ö÷÷6—FRf6W2öF—66öææV7FVB÷6—F–öç2öæöæÖæ–föÆB&÷VæF&–W3°¦W†7B7WÆ–VC#Öf6Rô$¢ƒB—6ÆæG2fW'7W2f6RFÆ3#’Â66ÆR÷G&ç6ÆF–öâæBWVÂfW&vR—6ÆæBFVç6—G’÷6W&FP§6¶VB&÷VæG3²wV&G2÷&VgW6VB†—7F÷'“²7GVÂVæFõ&VFò÷–çB÷&ö¦V7BôtÄ"÷væW"Fƒ°¦7GVÂæVÂf÷'v&F–ærö7W'&VçB×F&vWBö†—7F÷'’wV&G2âfö7W6VBæWró“C’ó“SöFVç6—G’ð¥6²÷&VÆV6S3%52âgVÆÂÆö6Âö†÷7FVBæBV&Æ–6F–öâWf–FVæ6RföÆÆ÷w2&VÆ÷rà ¥&Wf–WvVB66†R6Æ÷7W&R&Vg&W6†W2Ub–ç7V7F÷"öVF—B÷æVÂÂUbv÷&·76RÂ–çB–×÷'@¦æ6W7F÷'2æBUbôFBô×VÇF’ôÆ"ÆöFW'3²gVæ7F–öæÂ6†ævW2ôäÅ’–ç7V7F÷"÷BÖ–âÀ¦FÆ2÷væW"æBW†—7F–æræVÂâÖ–âö6vRô×VÇF’×G&ç6f÷&Óãög&÷¦Vâ'—FW2Væ6†ævVBà¤FWf–6S“S&VÖ–ç2VæF–æs¢6ÖRVç–çFVB7WÆ–VBÖW6‚(i"6÷Ææ"FÆ2(i"UbVF—F÷#°¦6ö×&Rf6RFÆ2w3#—6ÆæG3²VæFõ&VFòÂ–çB7&÷72fÆBF6‚æB6fT÷Vâà¤æW‡B7Böã“SfVVF&6³²Ç†“#’öÖWFÂ×&VfÆV7F–öâvFW2&VÖ–â–æFWVæFVçBâFòæ÷@¦–æfW"vVæW&Â7W'fVBVçw&Â&&—G&'’÷fW&Æ&W—"÷"÷F–öæÂäôÔBFWf–6R52à ¢Ò·…ÒU4U#“S53¢v'VBÖf6RFÆ2&W—"66WFVC²&÷FV7BW†7B7WÆ–VBf—‡GW&RæB÷&–v–æÃ“S&V†f–÷"à¢Ò·…ÒDUd”4S“SFÆ3¢W6W#“S52&V6÷&FVB÷&÷FV7FVBâ6W&FR–çFW&Ö—GFVçB•E&òUbÖVF—F÷"öÖ–â×FööÆ&"Æ÷72&VÖ–ç2÷Vã²æògVÆÂT’ÖÆ÷7252–æfW'&VBà  ¢ã“SgVÆÂÆö6ÂæöFS#B&Vw&W76–öã¢¢£#scr52òd”Âò6¶—VB¢¢ƒ“’ã2’À§&WF–æ–ærÆÃ#scÇW26—‚6÷Ææ"–çFVw&F–öç2âfö7W6VC3%52â&Wf–WvVC’Öf–ÆP§'VçF–ÖRÆöFW"6Æ÷7W&RÂF‡&VRgVæ7F–öæÂ÷væW'2öæÇ“²&WF–æVBÖ–âö6vRô×VÇF“ãð¦g&÷¦Vâ'—FW2æB&V6÷fW'’÷væW'2Væ6†ævVBâ6÷W&6S“C’ó“Sf6RFÆ2÷WGWG2æ@§7FæFÆöæSƒ“RFVç6—G’wV&G27F’&÷FV7FVBâ†÷7FVBõvW2öÆ—fR&ööbföÆÆ÷w3°¤DUd”4S“S6ö×&—6öâ÷–çBõVæFõ&VFòõ6fT÷Vâ&VÖ–ç2VæF–ærà  ¢22ã“SV&Æ–6F–öâfW&–f–VB(	B#2ö7Fö&W"##` ¥'VçF–ÖRc6cF3c“ƒcsSfCcVF3ccƒ&#†3sfc3cƒ3FC3VVÂW†7BFW7FVBG&VP¦f3CSfcC3vC–F6##vcCc&6FS–#36FÂ—2V&Æ—6†VBöâÖ–ââÆÃ#bWÆöFV@¦&Æö'2æBv—BFFG&VRÖF6†VBÆö6Â†6†W3²fWF6†VBÖ–âÖF6†VBæB6†V6¶÷WB6ÆVâà¤Æö6ÂæöFS#BgVÆÂ&Vw&W76–öã#scu52ód”Âó6¶—VBƒ“’ã2“²†÷7FVBæöFS#"'Và£3““S#““ƒ#bö¦ö##CƒCƒƒr6ö×ÆWFRÆörfW&–f–W26ÖS#scróóƒ“‚ã2’à¥vW33““S#““Cc"'V–ÆC#CƒS2öFWÆ÷“#C““cSR7V66VVFVBâÆÃ#’÷7FFWÆ÷–ÖVç@§6†VÆÂ÷fW'6–öâÂ6ö×ÆWFR&Wf–WvVBUbôFBô×VÇF’ôÆ"÷–çBÆöFW"w&‚Â&V6÷fW'’À§&WF–æVC“C†Æ—BöÖ–âö6vRô×VÇF’×G&ç6f÷&Óãó“CvÆ–W'2ög&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚à¥&ööb6öÖÖ—BWFFW2f÷W"6öçF–çV—G’f–ÆW2öæÇ“²FW7FVB'VçF–ÖR&WF–æVBà ¥W6W#“S52—2&V6÷&FVB÷&÷FV7FVBâ'V–ÆC“S6ö×ÆWFR÷&VG’f÷"FWf–6RFW7F–æs §6ÖRVç–çFVBW‡G'W6–öâ÷66ÆRÖW6‚(i"ö&¦V7B(i"Ub(i"6÷Ææ"FÆ2(i"÷VâUbVF—F÷"à¤W†7Bf—‡GW&RWFöÖF–6ÆÇ’v—fW3B—6ÆæG2fW'7W2f6RFÆ3#Âf÷W"v'VBf6W0§7F’—6öÆFVBæBÆÂ÷&–v–æÃ#BfW'F–6W2ó#VG2öævöç2Væ6†ævVBâ6ö×&R6†'G2À¥VæFõ&VFòÂ–çB7&÷726öææV7FVBfÆBf6W2æB6fT÷Vââ6ÆV"W†—7F–ær–ç@¦W‡Æ–6—FÇ’f—'7BâDUd”4S“SV&æ6R÷W&f÷&Öæ6R&VÖ–ç2VæF–ærâæW‡BföÆÆ÷s“S¦fVVF&6²&Vf÷&R'&öFW"Vçw&÷6VÒFööÆ–æs²¶VW÷&–v–æÂ÷væW'2æB&÷FV7FV@¦ÖöFVÆÆ–æröæf–vF–öâöÆ–v‡F–ærög&÷¦Vâ&V†f–÷"âæòvVæW&Â7W'fVBVçw&6Æ–Òà  ¢22ã“S"(	BUbVF—F÷"Æ–W"öVçG'’†&FVæ–æs²ã“SFÆ252&÷FV7FVB(	B#2ö7Fö&W"##` ¥W6W#“S52öæW‡F'V–ÆBÂv—F‚6W&FR–çFW&Ö—GFVçB•B&òT’ÖÆ÷72&W÷'Bâ7WÆ–V@§67&VVç6†÷B6öæf—&×3“S¢v÷&·76R&–v‡B6V7F–öâ–æ6ÇVF–ær&6²Fó4BæBÖ–âFööÆ& ¦'WGFöç2Ö—76–ærÂv†–ÆRUbF–ÆR&VÖ–ç2G&vââFòäõBG&VBFÆ266WFæ6R2T’ÖÆ÷70¦66WFæ6R÷"F—6Ö—72—B&V6W6RæöFRFW7G272â÷&–v–æÃ“#BFööÆ&"f—‚v266WFV@¦'WBF†—2—2&V7W'&Væ6Rv—F‚67&VVç6†÷BWf–FVæ6S²&÷FV7B—G2†VFW"Ö&÷fR×f–Ww÷'@¦–çFVçBâW†7B–çFW&Ö—GFVçB•BõvV$¶—B6ö×÷6—F÷"f–ÇW&R—2äõB&W&öGV6VB†W&Rà ¤VF—C¢æò7F–öâ–çFVçF–öæÆÇ’†–FW2Ö–âFööÆ&#²v÷&·76Rv2Æ&vR'6öÇWFP¦6çf2÷fW&Æ’–ç6–FRvV$tÂf–Ww÷'BÆöæw6–FR&6¶G&÷öf–ÇFW"fÆöF–æræVÇ2à¤öæÇ’õ$”t”äÂWb×v÷&·76R6†ævW3¢Ö÷VçB—G2öæRW†—7F–ær6V7F–öâ&W6–FRf–Ww÷'@§VæFW"6ÂW6Rf—†VBf–Ww÷'B–ç6WG2æB†VFW"†V–v‡Bf&–&ÆRv—F‚£’&VÆ÷r†VFW#°¦7F—fRÖöæÇ’f–Ww÷'B—6öÆF–öâ&WF–æVBf–WFFVB6–&Æ–ærÖ†÷7B6VÆV7F÷"†öÆBæW7FV@¦fÆÆ&6²&WF–æVBf÷"VÖ&VFFVB÷FW7B†÷7B’â—6öÆFR÷–çBÖ6öçF–â6çf2&V²¶VW—G0¦÷&–v–æÂ6çf2Â6öçG&öÇ2ÂÆ—7FVæW'2æBÖW6„†VÇF‚6öçFW‡B÷6W76–öâö†—7F÷'’6ÆÆ&6·2à¤&6²Fó4BÖ÷fW2&W6–FRF—FÆS²w&–ær6öçG&öÇ2Fòæ÷B6‡&–æ²÷WBöb6†÷'Bf–Ww÷'BÀ§v÷&·76R67&öÆÇ2v†VâæVVFVBâæòf÷&6RÔuRG&ç6f÷&×2Â¢Ö–æFW‚W66ÆF–öâÂGWÆ–6FP¥T’ÂÖöFVÆÆ–ærõUb÷–çBö†—7F÷'’öæf–vF–öâ¶W&æVÇ2÷"6†ævW2Fò÷&–v–æÂ†VFW"÷væW"à ¤÷VâÖV7W&W2–ÖÖVF–FVÇ’æBv–âöæ6RöâæW‡Bæ–ÖF–öâg&ÖRgFW"ÆVæ6‚†–FW0§6÷W&6RæVÂâÆ—7FVâFòf—7VÅf–Ww÷'B&W6—¦R2vVÆÂ2v–æF÷rõ&W6—¦Tö'6W'fW"à¤6Æ÷6R6æ6VÇ2VWVVBg&ÖRæB&VÖ÷fW2&÷F‚&W6—¦RÆ—7FVæW'3²W†—7F–ær6GW&RövW7GW&Rð¦–ÖvR6æ6VÆÆF–öâVæ6†ævVBâF‡&VRæWr&öGV7F–öâÖ÷væW"FW7G3¢&VÂö†VFW"ð§f–Ww÷'B6–&Æ–æw2æBGvVÇfR÷Vâö6Æ÷6R7–6ÆW2W6–ær6ÖRæöFW2ö7F–öç3²FVfW'&VBæ@§f—7VÂ&W6—¦R—†VÂ6—¦–ærö†—7F÷'’æWWG&Æ—G’öÆFRg&ÖRö6ÆVçW²552†VFW"÷&FW&–ærÀ¦6çf26öçF–æÖVçBÂ&÷VæFVB÷fW&fÆ÷ræB6–ævÆRÆVgB×6–FRW†—Bâ÷&–v–æÂFW7G2&WF–æVBà¤6Æ÷VB'&÷w6W#“SÖ–âf–Ç2vV$tÂ6öçFW‡B7&VF–öâÂ6òæògVÆÂ&VæFW&VB÷"6f&’ö•@§&W&öGV7F–öâ6Æ–ÖVBâ&W—"FG&W76W2Æ–W"F÷öÆöw’æBVçG'’6—¦–æs²•B&WFW7B—0§&WV—&VB&Vf÷&R66WF–ær–çFW&Ö—GFVçBF—6V&æ6R2f—†VBà ¥&Wf–WvVB66†R6Æ÷7W&RôäÅ’v÷&·76R(i"ÖW6„†VÇF‚(i"6†VÆÂÇW2&V6÷fW'’ÆöFW"¶W—3°¦–çFW&æÂfW'6–öâ7F×2æBVç&VÆFVC“SUb÷–çBÆöFW"–ç2&VÖ–ââFÆ3“Só“SÀ§–çC“C‚ÂÖ–ã“3Â6vS“3Â×VÇF’×G&ç6f÷&ÓãæBg&÷¦Vâ6æ6†÷G2Væ6†ævVBà¤DUd”4S“S#¢&WVFVFÇ’÷Vâô&6²Fó4Böâ•E&òÂfW&–g’gVÆÂVF—F÷"æBÖ–âF÷×&–v‡@¦'WGFöç2õd”Us²â÷–æ6‚õVæ6–Â—6ÆæBVF—BæBVæFõ&VFó²&WGW&âFó4BF†Vâ&V÷Vâà¤æW‡BföÆÆ÷s“S"T’fVVF&6²&Vf÷&RgW'F†W"Vçw&v÷&³²&V6÷&BW†7B&WVBG&–vvW"–`¦Æ÷72W'6—7G2â÷F†W"Ç†“#’öÖWFÂ&VfÆV7F–öâvFW2&VÖ–â–æFWVæFVçBà ¢Ò·…ÒU4U#“S"52(	BDUd”4S“S#¢&WVFVB•E&òUbVçG'’öW†—BÂVF—F÷"ô&6²Fó4BæBÖ–âFööÆ&"õd”Ur&VÖ–âf—6–&ÆS²â÷–æ6‚õVæ6–ÂõVæFõ&VFòæB&WGW&â÷&V÷Vâà  ¢ã“S"Æö6ÂæöFS#BgVÆÂ&Vw&W76–öã¢¢£#ss52òd”Âò6¶—VB¢¢ƒ“rãW2’À¦ÆÃ#scr&WF–æVBÇW2F‡&VRv÷&·76RÆ–W"öVçG'’Æ–fV7–6ÆRFW7G2âfö7W6VBUbö†—7F÷'’ð¥Væ6–Âö—6ÆæBö–ÖvR×&VfW&Væ6Rõ6²öFVç6—G’÷&VÆV6SS552âæò76W'F–öç2&VÆ†VB÷"öÆ@¦6†V6·2FVÆWFVBâgVæ7F–öæÂ6†ævW2öæÇ’Wb×v÷&·76S²ÖW6„†VÇF‚–×÷'B²&Wf–WvV@§6†VÆÂ÷&V6÷fW'’66†R¶W—3“S"âÖ–âö6vRô×VÇF’×G&ç6f÷&ÓãæBg&÷¦Vâ'—FW2Væ6†ævVBà¤†÷7FVBõvW2öÆ—fRV&Æ–6F–öâWf–FVæ6RföÆÆ÷w2âDUd”4S“S"–çFW&Ö—GFVçB•BT’ÖÆ÷70§&WFW7B&VÖ–ç2VæF–æs²æòW†7B'&÷w6W"ôuR&W&öGV7F–öâ÷"FWf–6Rf—‚526Æ–ÖVBà  ¢22ã“S"V&Æ–6F–öâfW&–f–VB(	B#Bö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRV#“V6†#6C&#†ffFS†SvV33ƒsC“#3“C6FÂFW7FVBG&VP¦VSS–S“ƒ““F3F&6&3Fc3ƒ#–CCƒ“3†C33VÂV&Æ—6†VBöâÖ–ââFVâWÆöFV@¦&Æö'2÷G&VRÖF6†VBÆö6Â†6†W3²fWF6†VBÖ–âÖF6†VBæB6†V6¶÷WB6ÆVââÆö6À¤æöFS#B&Vw&W76–öã#ss52ód”Âó6¶—VBƒ“rãW2“²†÷7FVBæöFS#"'Vã3““SSs3rð¦¦ö##C#“#cR6ö×ÆWFRÆöw2fW&–g“#ssóóƒ#C‚ãg2’âvW33““SSs#S3B'V–Æ@£#C#“#S“#öFWÆ÷“#C#csƒ’7V66VVFVBâÆÃ#’÷7FFWÆ÷–ÖVçB6†V6¶VB6†VÆÂ÷fW'6–öâÀ§v÷&·76RôÖW6„†VÇF‚õUbôFBô×VÇF’ôÆ"÷–çBÆöFW'2Â&V6÷fW'’Â&WF–æVBÖ–âö6vRð¤×VÇF’×G&ç6f÷&ÓãöÆ—C“C‚öÆ–W'3“Crög&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚FW7FVB6÷W&6Rà¥F†—2&ööb6†ævW2f÷W"6öçF–çV—G’f–ÆW2öæÇ“²FW7FVB'VçF–ÖR&WF–æVBà ¤'V–ÆC“S"6ö×ÆWFRæB&VG’f÷"•E&ò&WFW7BâW6W#“SFÆ252&÷FV7FVC²6W&FP¦–çFW&Ö—GFVçBUböÖ–â×FööÆ&"F—6V&æ6R—27F–ÆÂVæF–ærDUd”4S“S"6öæf—&ÖF–öâà¥&WVFVFÇ’÷VâVF—F÷"æB&6²Fó4C²6†V6²v†öÆRVF—F÷"ÂW†—B&W6–FRF—FÆRÂÖ–âF÷×&–v‡@¦'WGFöç2õd”UrÂâ÷–æ6‚õVæ6–Â—6ÆæBVF—F–ærõVæFõ&VFòæB&WGW&â÷&V÷Vââ÷&–v–æÃ“#@¦†VFW"Ö&÷fR×f–Ww÷'B&V†f–÷"&W6W'fVBv—F‚6–&Æ–ærv÷&·76RÆ–W"â6Æ÷VBvV$tÀ§Væf–Æ&ÆRÂæòW†7B–çFW&Ö—GFVçB6f&’&W&öGV7F–öâ÷"gVÆÂÖ&VæFW&VB66WFæ6P¦6Æ–ÖVBâæW‡BföÆÆ÷s“S"FWf–6RfVVF&6³²FöâwB–æfW"F†BWFöÖFVBFW7G2&÷fRF†P§&W÷'FVB–çFW&Ö—GFVçBF—6V&æ6R&W6öÇfVBâæòÖöFVÆÆ–æröFÆ2÷–çBÆv÷&—F†Ò6†ævW2à  ¢22ã“S2(	B6VÆV7FVBVFvR7WBUg3²ã“S"W6W"52(	B#Bö7Fö&W"##b„'&—6&æR ¥W6W#“S"52&÷FV7G2&WVFVBUbVF—F÷"VçG'’öW†—BÂÖ–âFööÆ&"õd”UræB—6Ææ@¥Væ6–Âö†—7F÷'’v÷&¶fÆ÷rgFW"6–&Æ–ærÖÆ–W"†&FVæ–ærâ&–÷#“SFÆ252&WF–æVBà¤æòæWr66WFæ6Röb–æFWVæFVçBÇ†“#’÷"6Öö÷F‚ÖÖWFÂ&VfÆV7F–öâvFW2–æfW'&VBà ¤VF—BÖ–ãf6#cfc3¢÷&–v–æÂ–ç7V7F÷"Ç&VG’÷vç2Öæ–föÆBF¦6Væ7’÷Væ–öâæB†0¦6ä¦ö–äf6W3²÷&–v–æÂUbVF—F÷"÷vç26²æBæF—fR6öÖÖ—Bö†—7F÷'’âæòWF†÷&V@¤VFvRÖ7WB6öÖÖæBW†—7G2âFBVFvR&F–Â÷WFW#crã\+7WBUg2W6–ær7W'&VçB÷&–v–æÀ¥6VÆV7F–öä'&–FvRVFvR–æF–6W2Âv—F‚ÆÂ&Wf–÷W2FööÂ÷6—F–öç2&W6W'fVBâ6ÖP¤ÖW6„†VÇF‚ÖöGVÆR†÷7G2F†RöæR×6†÷B'WGFöã²æòæWr÷Wö–çWBö†—7F÷'’ö¶W&æVÂà ¤æF—fRVç–çFVB–æFWVæFVçB&6RÖW6†W2v—F‚6ö×ÆWFRÖF6†–ærUg2öæÇ’âW†6ÇVFP§6VÆV7FVB7GVÂVFvW2g&öÒõ$”t”äÂ–ç7V7F÷"6öææV7F—f—G’Â&WV—&RV6‚6VÆV7FV@¦6öçF–çV÷W2UbVFvRw2÷væW'2FòVæB–âF–ffW&VçB6ö×öæVçG2ÂF†Vâ÷&–v–æÂw&–B6°¦æBôäRæF—fRUb6öÖÖ—Bâ6ö×ÆWFR&÷VæF'’×FòÖ&÷VæF'’7WG2÷"6Æ÷6VBÆö÷27Æ—@¦6†'G3²–æ6ö×ÆWFR6Æ—G2&VgW6RF†Rv†öÆR7F–öââW†—7F–ær6V×2ö&÷VæF&–W2æòÖ÷à¤WfW'’Vç6VÆV7FVB6öææV7F–öâ—2fW&–f–VBVæ6†ævVB&Vf÷&R6†V6·ö–çBâ6ö÷&F–æFW0§W'6—7B2÷&F–æ'’æF—fRUg2Âæ÷B6VÒfÆw2÷"æWr66†VÖâ&W6²ffV7G2ÄÀ¦—6ÆæG2v—F‚öæR6öÖÖöâ66ÆS²6÷W&6RöÇ–vöç2÷÷6—F–öç2÷&VÆF—fRFVç6—G’VçF÷V6†VBà¤æò6öæf÷&ÖÂVçw&ÂæWrfÆGFVæ–ærÂW'6—7FVçB6VÒÖ&¶–ær÷"7F—F6‚6öÖÖæBà£#²6÷&æW'2ò÷&–v–æÃ#‚6¶VBÖ—6ÆæBÆ–Ö—G3²Ö&–wV÷W2öæöæÖæ–föÆB÷6ÖR×v–æF–æp§6VÆV7FVBVFvW2Â7FÆRF&vWBö†—7F÷'’f–ÇW&R&VgW6R&Vf÷&RV&Æ–6F–öââç’6öÆ÷W"ð§&÷Vv†æW72öÖWFÆæW72–çB&VgW6W2æBö–çG2FòW‡Æ–6—Bö&¦V7BUb6ÆV"–çBà¤æò6–ÆVçB—†VÂF—66&B÷&V&–æB÷"–×÷'FVBÖFW&–Â&VÖ–ærà ¥6—‚æWr–çFVw&F–öâ6†V6·26÷fW"6ö×ÆWFR7WG2ö6Æ÷6VBÆö÷2ÂÖ—†VB'F–Â&VgW6ÂÀ¦W†—7F–ær6V×2ö&÷VæF&–W2Â÷&–v–æÂ6²÷v÷&²÷F&vWBö†—7F÷'’wV&G2Â&VBÖöæÇ’VW'2À§Væ6†ævVBvVöÖWG'’æBVç6VÆV7FVB¦ö–ç2Â7GVÂ66VæRVæFõ&VFòõ–çBõ6fT÷VâôtÄ §&÷VæGG&—Â7GVÂVFvR6ÆÆ&6²ö7W'&VçB6VÆV7F–öâ÷&VæFW"æB&F–ÂöæR×6†÷Bv—&–ærà¤öÆCs2ós’&F–Â–çfVçF÷'’æ÷r–æ6ÇVFW2F†RæWs#F‚VFvR7F–öâÂ&WF–æ–ærÄÂöÆ@¤”G2æB7&÷72ÖÖöFRÆ6VÖVçG2â÷F†W"'VçF–ÖR6÷W&6R6†ævW2&R&Wf–WvVB&WfW'6P¥UbôFBô×VÇF’ôÆ"66†R–ç2æB6†VÆÂ÷&V6÷fW'’¶W—3“S2öæÇ’âv÷&·76S“S"öÖ–ã“3ð¦6vRô×VÇF’×G&ç6f÷&Óãög&÷¦Vâ'—FW2Væ6†ævVBâgVÆÂ÷V&Æ–6F–öâ&ööbföÆÆ÷w2à ¤DUd”4S“S3¢FBVç–çFVBUbÆæRv—F‚‚FVç6—G“"Â“âVFvRÖöFR6VÆV7B—G26VçG&P§6†&VBVFvR(i"&F–Â7WBUg2âö&¦V7B(i"Ub(i"÷VâUbVF—F÷"6†÷w3"6W&FVB—6ÆæG3°¥VæFõ&VFò&W7F÷&W2÷&VÆ–W27WC²Væ6–Â—6ÆæBÖ÷fRffV7G2öæR6–FRâ–çBgFW"7WBÀ¥6fT÷Vâ&WF–ç2&W7VÇBâ&WVB7WBöâ6ÖRVFvRFG2æò†—7F÷'“²–çFVBF&vWG0§&VgW6RVçF–ÂW‡Æ–6—B6ÆV"–çBâW†—7F–ær7V&Rf6R&÷VæF&–W2Ö’Ç&VG’&R6V×0¦æB6÷'&V7FÇ’æòÖ÷âf÷"×VÇF’ÖVFvRF‡26VÆV7BF†Rv†öÆR7WBÂæ÷Bâ–çFW&–÷"6Æ—Bà¤æW‡BföÆÆ÷s“S2F7F–ÆRfVVF&6³²&&—G&'’6VÒÖ&·2÷7F—F6‚övVæW&Â7W'fVBVçw& §&VÖ–âVWVVBF‡&÷Vv‚÷&–v–æÂ÷væW'2â¶VW“S"T’ÖÆ÷7266WFæ6R&÷FV7FVBà ¢ã“S2f–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£#ssb52òd”Âò6¶—VB¢ ¢ƒ“ãg2’Â&WF–æ–ær÷&–v–æÃ#ssÇW26—‚VFvRÖ7WB–çFVw&F–öç2âfö7W6VBæWröFÆ2ð§v÷&·76R÷&VÆV6S#53²&F–Ãs’ós2&WF–æVBÆÂöÆB”G2æBæ÷r&WV—&W3#VFvP¦7F–öç2âf—'7BgVÆÂ'Vâw2öæÇ’f–ÇW&Rv2öÆCs2–çfVçF÷'““²WFFVBFò–çFVæFV@£#æBf–æÂ4ôÕÄUDR&W'Vâ&÷fR76W2âæò&V†f–÷"76W'F–öâG&÷VB÷"6¶—VBà¥&Wf–WvVC’Öf–ÆR'VçF–ÖRöÆöFW"6Æ÷7W&R²&V6÷fW'’¶W—3“S3²Ö–ã“3ö6vRô×VÇF“ãð¦g&÷¦VâVæ6†ævVBâ7GVÃ“S2•BF7F–ÆR66WFæ6RVæF–ærâ†÷7FVBõvW2öÆ—fP§V&Æ–6F–öâ&ööbföÆÆ÷w2â&W&ö¦V7F–ærUg2&WÆ6W27WG3²æòW'6—7FVçB6VÒ&V6—Rà  ¢22ã“S2V&Æ–6F–öâfW&–f–VB(	B#Bö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRC3ƒVf#†V3CF&CcF3#3cs†VFF#CvÂFW7FVBG&VP¦S3#Sc“f“SSc“S#f#†#&c36SsFVV&C†F&ÂV&Æ—6†VBöâÖ–ââÆÃ‚&Æö'0¦æB7&VFVBG&VRÖF6†VBÆö6Â†6†W3²fWF6†VBÖ–âÖF6†VBW†7FÇ’æB6†V6¶÷W@¦Æ–væVB6ÆVæÇ’âÆö6ÂæöFS#BgVÆÃ#sse52ód”Âó6¶—ƒ“ãg2“²†÷7FVBæöFS#"'Và£C3“SƒC“32ö¦ö##ss#3c“Cb6ö×ÆWFRÆöw2fW&–g“#ssbóóƒ#Bãw2’âvW3C3“SƒCS3p¦'V–ÆC#ss#C3"öFWÆ÷“#ss3“sƒcR5T44U52âÆÃ#6†V6¶VBÆ—fRf–ÆW2'—FRÖÖF6ƒ §6†VÆÂ÷fW'6–öâÂ4ôÕÄUDR6†ævVBUbôFBô×VÇF’ôÆ"öv—¦Öòw&‚Â&V6÷fW'’Â&WF–æV@§v÷&·76S“S"ö–ç7V7F÷#“SöÖ–ã“3ö6vRô×VÇF“ãöæF—fRw&—FW"÷&ö¦V7Bög&÷¦Vä&WFrà¥F†—2&ööb6†ævW2f÷W"6öçF–çV—G’Fö7VÖVçG2öæÇ“²FW7FVB'VçF–ÖR&WF–æVBà ¤'V–ÆC“S2&VG’f÷"•BFW7F–æs¢FBUbÆæRƒ"õ“(i"6VÆV7B6VçG&R6†&VBVFvR(i §&F–Â7WBUg2(i"ö&¦V7BUbVF—F÷"6†÷w2Gvò—6ÆæG2âVæFõ&VFò&W7F÷&W2÷&VÆ–W3°¥Væ6–Â—6ÆæBÖ÷fRÂ–çBgFW"7WBæB6fT÷Vâ&WF–âÆ–÷WBâW†—7F–ær6VÒö&÷VæF'§&WVBæòÖ÷3²–çB&WV—&W2W‡Æ–6—B6ÆV"–çB&Vf÷&R7WGF–ærâ6ö×ÆWFRF‡2÷ ¦6Æ÷6VBÆö÷2öæÇ“²'F–Â6Æ—G2&VgW6RFöÖ–6ÆÇ’âæòvVæW&ÂVçw&÷7F—F6‚÷W'6—7FVç@§6VÒ&V6—RâW6W#“S"T’ö†—7F÷'’52&÷FV7FVC²DUd”4S“S2fVVÂ÷f—6–&–Æ—G’VæF–ærà¤æW‡B7GVÃ“S2fVVF&6²ÂF†Vâ66÷VB6VÒ÷7F—F6‚÷Vçw&VF—BF‡&÷Vv‚÷&–v–æÂ÷væW'2à  ¢22ã“SB(	B67&VVâ×&÷†–Ö—G’VFvR–6¶–æs²7WÆ–VB6öçfW‚ÖVFvR&W÷'B(	B#Bö7Fö&W"##b„'&—6&æR ¥W6W"&W÷'G26öçfW‚×÷6—F–öâVFvW2ÆÖ÷7B–×÷76–&ÆRFòFæBæWvÇ’fÆ—V@¦VFvW2&V6öÖ–ærVç6VÆV7F&ÆRâ67&VVç6†÷B6ÆV&Ç““S#²7W'&VçC“S2&WF–ç24ÔRÖ–ã“3 §–6¶W"Â6ò&W&öGV6VBöâ7W'&VçB6÷W&6RÂæ÷BF—6Ö—76VB27FÆR×6†VÆÂ&V†f–÷"à¤æó“S27WBUg252–æfW'&VBâW6W#“S"UbÖVF—F÷"66WFæ6R&VÖ–ç2&÷FV7FVBà¤W†7BWÆöFVB6öçfW‚VFvRæö&¢&WF–æVB'—FRÖf÷"Ö'—FR@¢FW7G2öf—‡GW&W2ö6öçfW‚ÖVFvRÓ“SBæö&£²4„#S`£sƒ#&#†C3S3css36#VcƒCs6c6f3C#33ƒVFCvs#3#C–SvC3ƒss†CBà£cfW'F–6W2óƒFf6W2ÖF6†W267&VVç6†÷Bâ6ÖW&÷6R—2æ÷B–âô$£²FW7B6ÖW&2&P¦6öçG&öÆÆVB&W&öGV7F–öç2Âæ÷B6Æ–ÒFò&V6÷fW"W†7B67&VVç6†÷Bf–Wrà ¤VF—C¢÷&–v–æÂÖ–â–6´¶–æD†—G2W6W2F‡&VRÆ–æRF‡&W6†öÆBã’v÷&ÆBVæ—G2F†Và¦6ÖW&ÖF—7Fæ6R÷&FW"âöâW†7B7WÆ–VBvVöÖWG'’Ã"6†÷6VâÆ–æRÖ–Gö–çG2ÄÀ§6VÆV7Bæ÷F†W"6ÖW&ÖæV&W"æV–v†&÷W&–ærVFvRâ÷&–v–æÂ&÷‡’öF—7Æ’&F6†–æp¦æB”G2&R6÷'&V7C²æò6÷W&6RF÷öÆöw’ôfÆ—¶W&æVÂ&W—"&WV—&VBâ6VÆV7FVBÖöæÇ¦6ö×öæVçB×F†VÇW"Ç6òw&VVF–Ç’6†÷6Rç’6VÆV7FVBVFvRv—F†–ã#‚ÂWfVâv†Và¦F–ffW&VçBVFvRÆ’VæFW"F†Rö–çFW"âVæ6–ÂvFRÇ&VG’FVÆVvFW2æF—fR–6²à¤VFvR×–çB÷væW"–æFWVæFVçFÇ’W6VBF†RöÆBv÷&ÆB×&F—W2÷&FW&–ærà ¤Ö–âw2VFvRÖöæÇ’'&æ6‚æ÷r6ÆÇ26ÖÆÂ&VBÖöæÇ’VFvR×67&VVâ×–6¶–ær†VÇW"÷fW ¥4ÔR&VæFW&VB–æFW†VBÆ–æR&÷†–W2Ã"552—†VÇ2Â67&VVâ&÷†–Ö—G’f—'7BÂ6ÖW&¦FWF‚f÷"VçF—¦VBV'FW"×—†VÂF–W2â†öÖövVæV÷W2g'W7GVÒ6Æ—–ær&Vf÷&RF—f–FP¦æBW'7V7F—fRÖ6÷'&V7Bv÷&ÆB–çFW'öÆF–öã²&VçBG&ç6f÷&×2æB÷'F†öw&†–0¦6ÖW&27W÷'FVBâæòÖW6‚æVFvW2‚’ÂF÷öÆöw’÷"6÷W&6Rw&—FW2Â66†Rö†—7F÷'’ö–çW@¦÷væW"âÖFW&–Âçf—6–&ÆSÖfÇ6R&÷‡’6öçfVçF–öâ&WF–æVC²ö&¦V7Böæ6W7F÷"f—6–&–Æ—G§&W7V7FVBâf6RõfW'FW‚ôö&¦V7B&’F‡2Væ6†ævVBâF†—2—2F&vWF–ærÂæ÷BæWp§7W&f6Rö66ÇW6–öâö&6²Öf6RõF‡&÷Vv‚×6VÆV7F–öâöÆ–7“²æòæWr†–FFVâ×7W&f6RwV&çFVRà ¤÷&–v–æÂ6VÆV7FVBÖ6ö×öæVçBVFvRFövvÆRæ÷r6†V6·24ÔRæF—fR†—B&Vf÷&R&VÖ÷fÃ°§Vç6VÆV7FVBæV–v†&÷W'272FòÖ–ââ÷&–v–æÂVFvR–çBf—6–&ÆR÷F‡&÷Vv‚W6W2æF—fP§–6´†—G2÷&FW"æB÷&–v–æÂFVGWöf—'7BöÆÂöÆ–7’Â&WF–æ–ærfÆÆ&6²f÷"7F'GWð¦æöâÔVFvRf—‡GW&W2â6ÖR÷&–v–æÂÆ—7FVæW'2Â&÷vF–öâæBvW7GW&R÷væW'3²æòæWp§&r×ö–çFW"†æFÆW"âfÆ—VFvRvVöÖWG'’ö†—7F÷'’÷&F–Â÷v÷&·76RõUb÷–çBöÖFW&–À¦Æv÷&—F†×2Væ6†ævVBâæWrÔ”â66†R–ã“SB—2–çFVçF–öæÂ7GVÂ–6¶W"&W—#°¦÷&–v–æÂÖ–â–çFW&æÂ7F×æB6vS“3ô×VÇF“ãög&÷¦Vâ'—FW2&VÖ–âVæ6†ævVBà¤F—&V7BÖ&WfVÂ6†ævW2ôäÅ’6ö×öæVçB×F6†–ÆB66†R¶W“²6†VÆÂ÷&V6÷fW'’öÖæ–fW7@¦æB&Wf–WvVBÖ–âö6†–ÆBÆöFW"w&ƒ“SBâæò&Ææ¶WB&W–ææ–ærà ¥6WfVâæWr–çFVw&F–öç3¢W†7B7WÆ–VC"&R×&W—"f–ÇW&W>(i&6÷'&V7BæF—fR–6³°¤5ETÂ÷&–v–æÂfÆ—VFvRÇ’÷&V'V–ÆBõVæFõ&VFòÇW2&W6VÆV7BæWrF–vöæÃ²66ÆRð§&ö¦V7F–öâ÷&VçBôE"ó'‚&÷VæG3²6Æ—ö†–FFVâæ6W7F÷"÷7V'—†VÂÖFWF‚&V†f–÷#°¦7GVÂ6VÆV7FVB×FövvÆR&VgW6Â÷&VÖ÷fÂv—F‚æò†—7F÷'“²÷&–v–æÂVFvR×–çBæF—fP¦WfVçB÷f—6–&ÆR÷F‡&÷Vv‚FVÆVvF–öã²&VÂVæ6–ÂvFR÷–çB÷væW"&VÆV6Rö6æ6VÂöf–ævW ¤÷&&—B&WFVçF–öââfö7W6VBæWr¶æF—fRf6RõfW'FW‚öfÆöF–ærÖæf–vF–öâ÷&VÆV6S3…52à¤÷&–v–æÂ76W'F–öç2&WF–æVC²gVÆÂæBV&Æ–6F–öâWf–FVæ6RföÆÆ÷râæöFRF‡&VRö–çW@¦f—‡GW&W2&Ræ÷BæF—fR•BõvV$tÂ&VæFW&VB66WFæ6Rà ¤DUd”4S“SC¢4ÔR7WÆ–VBÖW6‚ÂFW6VÆV7BæBF6—&6ÆVBVFvRæBæV–v†&÷W&–ærv†—FP¦VFvS²÷&&—B÷¦ööÒæB&WVBâfÆ—VÆ–v–&ÆRVFvRÂFW6VÆV7BF†Vâ&W6VÆV7BæWrF–vöæÃ°¥VæFõ&VFò¶VW2&÷F‚vVöÖWG'’æB–6¶–ærW6&ÆRâG'’æV&'’×VÇF’ÖVFvR6VÆV7F–öâÀ¥Væ6–ÂG&r6VÆV7F–öâæBf–ævW"÷&&—B÷â÷–æ6‚v—F†÷WB6VÆV7F–öâÆ÷72â6†V6³“S0¤7WBUg26W&FVÇ’v†Vâ&7F–6Ã²æó“S266WFæ6R–æfW'&VBg&öÒF†—2'Vr&W÷'Bà¤æW‡B&W7öæBFó“SBFWf–6R&W7VÇG2&Vf÷&RæWr6VÒ÷Vçw&fVGW&W2âæòF÷öÆöw§&W—"÷G&–æwVÆF–öâv÷&¶&÷VæB÷"f÷&6VB66†RÖ6ÆV&–æræVVFVBf÷"&W&öGV6VB'Vrà ¢ã“SBf–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£#sƒ252òd”Âò6¶—VB¢ ¢ƒ“Rã2’Â÷&–v–æÃ#ssb&WF–æVBÇW26WfVâ7WÆ–VBÖf–ÆR÷–6¶W"ö–çWB–çFVw&F–öç2à¤fö7W6VBæWröæF—fRf6RõfW'FW‚öfÆöF–ærÖVFvRövW7GW&R÷&VÆV6S3…52âæòöÆB76W'F–öç0§&VÆ†VB÷"&VÖ÷fVBâWÆöFVBô$¢f—‡GW&R'—FRÖ–FVçF–6ÂâÖ–â6÷W&6R6†ævW2öæÇ¦†VÇW"–×÷'BæBVFvR–6¶W"'&æ6ƒ²F—&V7BÖ&WfVÂ—2–âÖöæÇ’â6ö×öæVçBVFvRFövvÆP¦æBVFvR×–çBW6RW†—7F–æræF—fR÷væW#²æòæWrö–çFW"övVöÖWG'’ö†—7F÷'’–×ÆVÖVçFF–öâà¥&Wf–WvVB66†R6Æ÷7W&S“SC²6vS“3ô×VÇF“ãög&÷¦VâVæ6†ævVBâ†÷7FVBõvW2öÆ—fRÖf–ÆP§V&Æ–6F–öâ&ööbföÆÆ÷w3²7GVÃ“SB•BFôfÆ—÷&W6VÆV7B66WFæ6RVæF–ærà  ¢22ã“SBV&Æ–6F–öâfW&–f–VB(	B#Bö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR“ƒ–3Vc“–fS#3–#f3ƒVffCsƒ†V63ÂFW7FVBG&VP¦vc#C†#SSƒ†SSƒ&#s#sSvFSc33–3fÂV&Æ—6†VBöâÖ–ââÆÃR&Æö'0¦æBv—BFFG&VRÖF6†VBÆö6Â†6†W3²fWF6†VBÖ–âÖF6†VBW†7BFW7FVBG&VRæ@¦6†V6¶÷WBÆ–væVB6ÆVæÇ’âÆö6ÂæöFS#BgVÆÃ#sƒ552ód”Âó6¶—ƒ“Rã2“²†÷7FV@¤æöFS#"'VãCC“#“’ö¦ö##s#CcB6ö×ÆWFRÆöw2fW&–g“#sƒ2óóƒ#CBãG2’à¥vW3CC“3ƒb'V–ÆC#s#Cs“‚öFWÆ÷“#s#SSƒ#C5T44U52âÆÃ#6†V6¶VBÆ—fP¦f–ÆW2'—FRÖÖF6ƒ¢6†VÆÂ÷fW'6–öâÂæWr–6¶W"²6†ævVBÖ–â÷FövvÆRôVFvR×–çBô&WfVÀ¦ÆöFW"w&‚Â&V6÷fW'’Â&WF–æVBv÷&·76S“S"õUc“S2öv—¦Öó“S2õVæ6–ÂvFRö6vS“3ð¤×VÇF“ãôfÆ—33röæF—fRw&—FW"÷&ö¦V7Bög&÷¦Vä&WFrâ÷&–v–æÂWÆöBf—‡GW&RVæ6†ævVBà¥F†—2&ööb6†ævW2f÷W"6öçF–çV—G’f–ÆW2öæÇ“²FW7FVB÷V&Æ—6†VB'VçF–ÖR&WF–æVBà ¤'V–ÆC“SB6ö×ÆWFR÷&VG’f÷"4ÔRÖf–ÆR•B&WFW7C¢Vç6VÆV7FVB6—&6ÆVBVFvRæB—G0¦æV–v†&÷W'2Â÷&&—B÷¦ööÒ÷&W6VÆV7BÂ÷&–v–æÂfÆ—VFv^(i&FW6VÆV7N(i'&W6VÆV7BæWrF–vöæÂÀ¥VæFõ&VFòÂ×VÇF’ÖVFvR6VÆV7F–öâæBf–ævW"æf–vF–öââWFöÖFVBW†7BÖf–ÆRöæF—fP§–6¶W"æB&VÂfÆ—ö†—7F÷'’ö–çWBf—‡GW&W273²7GVÂ•BfVVÂöV&æ6R&VÖ–ç0§VæF–ærâ67&VVç6†÷C“S"f–ÇW&R&W&öGV6VBöâ6ÖR–6¶W"–ã“S3²æòf÷&6VB7FÆRÖ66†P§v÷&¶&÷VæBâW6W#“S"T’ö†—7F÷'’52&÷FV7FVC³“S27WBUg2FWf–6RvFR&VÖ–ç26W&FRà¤æW‡B7GVÃ“SBfVVF&6²&Vf÷&RgW'F†W"Vçw&÷6VÒfVGW&W3²æòæWs“S2ó“SB52–æfW'&VBà  ¢22ã“SR(	B6÷Ææ"7F—F6‚Ug3²ã“S2æBã“SBW6W"52(	B#Bö7Fö&W"##b„'&—6&æR ¥W6W"W‡Æ–6—FÇ““S552æC“SE52öæW‡F'V–ÆBâ&÷FV7B6ö×ÆWFRVFvR7WBUg2À¥VæFõ&VFòõ–çBõ6fT÷VâæB67&VVâ×&÷†–Ö—G’VFvRF&vWF–ærÂfÆ—÷&W6VÆV7BÂ6VÆV7FV@¦æV–v†&÷W"FövvÆRõVæ6–Â–çB6VÆV7F–öâæBf–ævW"æf–vF–öâã“S"VF—F÷"T’66WFæ6P¦Ç6ò&WF–æVBâ&–÷"VæF–æs“S2ó“SBæ÷FW2&VÆ÷r&R†—7F÷&–6ÂÂ7WW'6VFVB†W&Rà¤–æFWVæFVçBÇ†“#’÷6Öö÷F‚ÖÖWFÂ&VfÆV7F–öâvFW2&Ræ÷B–×Æ–VB66WFVBà ¤VF—BÖ–ãCƒ†S3FVS¢æò7F—F6‚W†—7G2â÷&–v–æÂ–ç7V7F÷"÷vç2Öæ–föÆBF¦6Væ7’æ@¦—6ÆæBÖVÖ&W'6†—²÷&–v–æÂ&÷‚&ö¦V7F–öâ7WÆ–W26æöæ–6ÂÆæRÖ–æs°¦÷&–v–æÂ6÷Ææ"6VVBw&÷W–æs“SÂw&–B6²æBæF—fR6öÖÖ—BÇ&VG’W†—7Bà¤FBVFvR&F–Â÷WFW#"ã\+7F—F6‚Ug2Âv—F‚ÆÂ&–÷"÷6—F–öç2Væ6†ævVBâ6–ævÆP¦7W'&VçB6VÆV7FVB6†&VBVFvS²÷&–v–æÂ'WGFöâö7F–öâ†÷7B–âÖW6„†VÇF‚æB÷&–v–æÀ§&F–ÂöæR×6†÷B6ö×ÆWF–öââæòæWr÷W÷&r–çWBö†—7F÷'’öÖW6‚÷G&–æwVÆF–öâ÷væW"à ¤f—'7B7F—F6‚7W÷'G2Etò—6ÆæG2öâ4ÔR÷&–VçFVBfÆB6÷W&6RÆæRÂæF—fR÷Æ–âð¦–æFWVæFVçBVç–çFVB&6RÖW6†W2öæÇ“³#†f6W2ó#¶6÷&æW'2âW†—7F–ær7W'&VçB6†'G0¦×W7BV6‚ÖF6‚6æöæ–6ÂÆæR6ö÷&F–æFW2VæFW"Væ–f÷&Ò6–Ö–Æ&—G’÷&VfÆV7F–öâà¤Ö÷fVB÷&÷FFVB÷66ÆVBöfÆ—VB6†'G27W÷'FVC²–çFW&æÆÇ’F—7F÷'FVB÷v'VBö&VçBð¦æöâÖ6÷Ææ"6†'G2&VgW6Râ÷&–v–æÂÆ÷vW"Öf6R6†'B7WÆ–W2F†Rf—C²Ö÷fRF†R÷F†W ¦–çFò—G2ÆæRg&ÖRÂ6æ6öÖÖöâfW'FW‚Ô”B6÷&æW'2Fòõ$”t”äÂW†7Bæ6†÷"fÇVW2à¤ÆÂ6†&VB&÷VæF&–W2&WGvVVâF†B—"¦ö–ã²æò7F–ÂvVÆF–ærÂW"Öf6RF÷öÆöw¦6†ævW2÷"6fVB6VÒfÆw2â÷&–v–æÂw&–B6²F†Vâ&W6·2ÄÂ—6ÆæG2v—F‚6öÖÖöà§66ÆRæB6öÖÖ—G2ôä4RâÖ÷f–ær6†'BFVç6—G’ö÷&–VçFF–öâÖF6†W2&WF–æVB6†'B&Vf÷&P¥6³²VçF÷V6†VB6†'B6†W2÷&VÆF—fRFVç6—G’&WF–æVBâf–æÂ–ç7V7F÷"×W7B&W÷'@¤U„5B–çFVæFVBGvò×FòÖöæRÖVÖ&W'6†—ÂæòVç&VÆFVBÖW&vW2÷7Æ—G2â6ÖRÖ—6ÆæB¦ö–æV@¦VFvRæòÖ÷3²â–çFW&æÂ6Æ—B&VgW6W2Â2æòv†öÆRÖ6†'B¦ö–â6â&W—"—Bà ¤ÆÂ6öÆ÷W"÷&÷Vv†æW72öÖWFÆæW72–çB&VgW6W2&Vf÷&R7Fv–ærö†—7F÷'’Âv—F‚W‡Æ–6—@¤ö&¦V7BUb6ÆV"–çBwV–Fæ6Râ÷&–v–æÂVç7W÷'FVBF&vWBö†—7F÷'’öf–æ—FRö6öÆÆ6Rð¥6²wV&G2&WF–æVBâæòvVæW&Â7W'fVBVçw&Â7V&RÖæWBVæföÆF–ærÂ÷F–ÖÂ6¶–ærÀ¦&&—G&'’÷fW&Æ&W—"÷"–çB&W6×Æ–ærâæF—fR6÷W&6S¦&÷†Æ"6÷&æW"66†VÖÀ¦vVöÖWG'’Â&ö¦V7Bö†—7F÷'’öW‡÷'B÷væW'2&VÖ–âVæ6†ævVBâ6æöæ–6Â&÷‚—2G&ç6–Vç@§fÆ–FF–öâöÆ–væÖVçBöæÇ’Âæ÷B&WÆ6VÖVçBÆ—fRUbÖ–ær÷"&ÆÆVÂ¶W&æVÂà ¥6—‚æWr–çFVw&F–öç3¢7WN(i%7F—F6‚W†7BVæGö–çG2övVöÖWG'’÷VW"—6öÆF–öâ÷&WVBæòÖ÷°§&÷FFVB÷66ÆVBöÖ—'&÷&VBV—F†W"6†'BæB6÷W&6R66ÆR÷G&ç6ÆF–öã²Vç&VÆFVB—6Ææ@¦ÖVÖ&W'6†—²æöâ×Ææ"öF—7F÷'FVBö&÷VæF'’öÖ&–wV÷W2÷&VgW6VBF&vWG2æB†—7F÷'’÷v÷&°¦FöÖ–6—G“²7GVÂVæFõ&VFòõ–çBõ6fT÷VâôtÄ#²7GVÂVFvR6ÆÆ&6²æB&F–ÂÆVæ6‚ð§V6²&W7F÷&F–öââ÷&–v–æÃ“S2ó“SB6VÖçF–26†V6·2&WF–æVBâöÆCs2ós’VFvR–çfVçF÷'¦æ÷s#Â&WF–æ–ærÆÂ&Wf–÷W2”G2æB6†&VB7&÷72ÖÖöFR÷6—F–öç2âfö7W6VBæWrô7WBð§–6¶–ær÷&F–Â÷&VÆV6S3U52âgVÆÂæBV&Æ–6F–öâ&ööbföÆÆ÷w2âôäÅ’UbVF—BÀ¤ÖW6„†VÇF‚6ÆÆ&6²æBv—¦ÖògVæ7F–öæÆ—G’6†ævS²÷F†W"'VçF–ÖR6†ævW2&R&Wf–WvV@¥UbôFBô×VÇF’ôÆ"&WfW'6RÆöFW"–ç3“SRæB6†VÆÂ÷&V6÷fW'’âÖ–ã“SB÷–6¶W#“SBö6vS“3ð¤×VÇF“ãög&÷¦Vâ'—FW2Væ6†ævVBâæó“S2ó“SB66WFæ6RÆ÷7BGW&–ær6VÒv÷&²à ¤DUd”4S“SS¢UbÆæRƒ"õ“(i"6†&VBVFvR7WBUg2(i"6VÆV7B4ÔRVFvR(i"7F—F6‚Ug2à¥UbVF—F÷"6†÷w2öæR¦ö–æVB—6ÆæC²Væ6–ÂÖ÷fRÖ÷fW2&÷F‚f6W2âVæFõ&VFò7FW2F‡&÷Vv€§7F—F6‚ö7WB6W&FVÇ’âÖ÷fR÷&÷FFR÷66ÆRâ—6ÆæB&Vf÷&R7F—F6†–æs²6ÖRfÆBF6€¦¦ö–ç2÷&R×6·2â–çBgFW"7F—F6‚Â6fT÷Vâ&WF–ç2&W7VÇBâÇ&VG’Ö¦ö–æVB&WV@¦æòÖ÷3²7W'fVB÷6ÖRÖ7V&RÖ6÷&æW"f6W2÷"–çFVBF&vWG2&VgW6Rv—F†÷WB6†æv–ærv÷&²à¤æW‡B7GVÃ“SRFWf–6RfVVF&6²&Vf÷&RW‡æF–ær7F—F6‚övVæW&ÂVçw&²&W6W'fP¦66WFVC“S27WG2ó“SB–6¶–æró“S"T’æBÆÂ&÷FV7FVBæf–vF–öâöÖöFVÆÆ–ær&V†f–÷"à ¢Ò·…ÒU4U#“S253¢7WBUg2ò—6ÆæBVF—F–æròVæFõ&VFòò–çBò6fT÷Vâ&÷FV7FVBà¢Ò·…ÒU4U#“SB53¢7WÆ–VB6öçfW‚ÖVFvR6VÆV7F–öâòfÆ—&W6VÆV7Bòæf–vF–öâ&÷FV7FVBà¢Ò²ÒDUd”4S“SS¢7WBF†Vâ7F—F6‚fÆBUbÆæS²—6ÆæBVF—F–ærÂVæFõ&VFòæB–çBõ6fT÷Vâà ¢ã“SRf–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£#sƒ’52òd”Âò6¶—VB¢ ¢ƒ“2ãG2’Â÷&–v–æÃ#sƒ2&WF–æVBÇW26—‚7F—F6‚–çFVw&F–öç2âæWrô7WBö66WFVC“S@§–6¶–ær÷&F–Â÷&VÆV6S3U52â÷&–v–æÃ“S26÷W&6R×FW7B&÷VæF&–W2¶WB–çF7BgFW ¦–æ—F–ÂæWrÖ'WGFöâÆ6VÖVçBW‡÷6VBf—‡GW&R6Æ–6S²'WGFöâFV6Æ&F–öç2&V6VFP¦&÷F‚6ÆÆ&6·2ÂæB÷&–v–æÂ76W'F–öç2&VÖ–âãs2ós’–çfVçF÷'’æ÷s#v—F‚WfW'¦öÆBFööÂ&WF–æVBâæòöÆB&V†f–÷"76W'F–öâ&VÖ÷fVB÷"&VÆ†VBâÖ–â÷–6¶W"÷FövvÆRð¤VFvR×–çC“SBÂ6vS“3ô×VÇF“ãög&÷¦Vâ'—FW2Væ6†ævVBâ&Wf–WvVC’Öf–ÆR&WfW'6RUbð¤FBô×VÇF’ôÆ"öv—¦Öò6Æ÷7W&S“SRæB&V6÷fW'’–ç3²gVÆÂ†÷7FVBõvW2öÆ—fR&ööbföÆÆ÷w2à¤7GVÃ“SR•BfVVÂöfÆB×7F—F6‚v÷&¶fÆ÷r66WFæ6RVæF–æs³“S2ó“SBW6W"52&÷FV7FVBà  ¢22ã“SRV&Æ–6F–öâfW&–f–VB(	B#Bö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR#c&FSCS3#vc–CcƒS#C6c3&6&3&SCF&s“ÂFW7FVBG&VP¦3ƒ&ffS3SƒƒC#3c#“SssCƒfCVVcsƒcSV3fÂV&Æ—6†VBöâÖ–ââÆÃ‚WÆöFV@¦&Æö'2æBv—BFFG&VRÖF6†VBÆö6Â†6†W3²fWF6†VBÖ–âÖF6†VBW†7FÇ’æBÆö6À¦6†V6¶÷WBÆ–væVB6ÆVæÇ’âÆö6ÂæöFS#BgVÆÃ#sƒ•52ód”Âó6¶—ƒ“2ãG2“²†÷7FV@¤æöFS#"'VãCCSƒS#Sö¦ö##s#s#ƒƒ‚6ö×ÆWFRÆöw2fW&–g“#sƒ’óóƒ#CBã—2’à¥vW3CCSƒS##R'V–ÆC#s#s#ƒ3sƒ‚öFWÆ÷“#s#sCc“R5T44U52âÆÃ#6†V6¶VBÆ—fP¦f–ÆW2'—FRÖÖF6ƒ¢6†VÆÂ÷fW'6–öâÂ4ôÕÄUDR6†ævVBUbôFBô×VÇF’ôÆ"öv—¦Öòw&‚À§&V6÷fW'’Â&WF–æVC“SBÖ–â÷–6¶W"ö6ö×öæVçB×FövvÆRôVFvR×–çBÂv÷&·76S“S"ö6vS“3ð¤×VÇF“ãög&÷¦Vä&WFrâ7GVÂ÷&–v–æÂÖ¶UÆæRƒ"Ã"Ã’¶WFöÖF–2…¢æF—fRUb÷væW ¦Ç6ò6Öö¶R×FW7FVB7WN(i%7F—F6Ž(i&öæR—6ÆæBâF†—2&ööb6†ævW2f÷W"6öçF–çV—G’f–ÆW0¦öæÇ“²FW7FVB÷V&Æ—6†VB'VçF–ÖR&WF–æVBâW6W#“S2æC“SB52&V6÷&FVB÷&÷FV7FVBà ¤'V–ÆC“SR6ö×ÆWFRæB&VG“¢Vç–çFVBUbÆæRƒ"õ“(i"6†&VBVFvR7WBUg2(i"4ÔP§6VÆV7FVB6VÒ7F—F6‚Ug2(i"ö&¦V7BUbVF—F÷"6†÷w2ôäR¦ö–æVB—6ÆæBâVæ6–Â—6Ææ@¦Ö÷fRÖ÷fW2&÷F‚f6W3²VæFõ&VFò&W7F÷&W2÷&VÆ–W27F—F6‚6W&FVÇ’g&öÒ7WBâ–ç@§F†Vâ6fT÷Vâ&WF–ç2Æ–÷WB÷&W7VÇBâv†öÆRGvò6†'G2×W7B6†&RöæRfÆB6÷W&6P§ÆæS²7W'fVBö7V&RÖ6÷&æW"ö&VçB6†'G2&VgW6RÂæòvVæW&ÂVçw&÷"6VÒ&V6—Rà¤7GVÃ“SR•BV&æ6RöfVVÂ&VÖ–ç2VæF–ærâæW‡B7GVÃ“SRfVVF&6²&Vf÷&R'&öFW §7F—F6‚÷Vçw&v÷&³²&WF–â66WFVC“S27WG2ó“SB–6¶–æró“S"T’æB÷&–v–æÂ÷væW'2à  ¢22ã“Sb(	B&÷VæFVBævÆRÖ&6VBWFòFÆ3²C“bÖf6RÆ–Ö—B(	B#Bö7Fö&W"##b„'&—6&æR ¥W6W"&WVW7G2WFöÖF–26öææV7FVBÖf6R7F—F6†–ærGW&–ærFÆ2vVæW&F–öâÂ&7F–6À¦f6RÆ–Ö—BÂ&÷VæFVB'VçF–ÖRÂF†Vâ7VvvW7G2VFvRævÆRâÇ6ò6·2v†WF†W"æÖV@¢æ&÷†Æ"6fW26â÷fW'w&—FRW†—7F–ærF÷væÆöG2f–ÆW2âæó“SRFWf–6R52–æfW'&VC°£“S27WBUg2ó“SB–6¶–æró“S"VF—F÷"66WFæ6R&VÖ–â&÷FV7FVBà ¤VF—BÖ–ã3“3“s†#3¢6÷Ææ"FÆ2Ç&VG’¦ö–ç2fÆB6†'G2F‡&÷Vv‚÷&–v–æÀ¦–ç7V7F÷"F¦6Væ7’²&÷‚&ö¦V7F–öâÂ'WBv2Æ&VÆÆVB6V6öæF'’æB6VC#†f6W3°¥6²öFVç6—G’Ç6ó#‚v—F‚f—†VC"Rv2ÂæBvÆö&ÂÆæR6VVB6V&6‚v2VG&F–2à¥&WW6R4ÔRW†—7F–ær'WGFöâö÷væW"2&–Ö'’WFòFÆ2†&Vf÷&RW‡Æ–6—Bf6RFÆ2’À¦FB¦ö–âævÆS(	33+öFVfVÇCRâ’7&VFT6÷Ææ$FÆ5Ub6—‡F‚÷F–öæÂævÆRFVfVÇG3À§&W6W'f–ær66WFVBfÆB÷WGWG2æBÖçVÃ“SRÆæRw&÷W–ærã+ÒW†7B&–÷ ¦6÷Ææ"öÆ–7’â÷6—F—fRævÆR&WV—&W2$õD‚F¦6VçBfW&vRf6RÖæ÷&ÖÂævÆP¦æBf—†VB6VVBÖæ÷&ÖÂ6öæRv—F†–â7WFöfbÂ÷÷6—FRÖæ–föÆBVFvRF—&V7F–öç2æ@¤U„5B÷&–v–æÂ&÷‚UbVæGö–çG2âæòG&–gBÆöær7W'fVB6†–ç2Â6ö÷&F–æFRvVÆF–ærÀ§6V6öæBG&–æwVÆF÷"öF¦6Væ7’ö†—7F÷'’÷væW"÷"6ÆÇ2FòÖçVÂ7F—F6‚–âÆö÷à ¥F†—2—2&÷VæFVB&ö¦V7FVBÖ6†'Bw&÷W–ærÂæ÷B6öæf÷&ÖÂVçw&÷&VÆ†F–öâ÷"&&—G&'¦7V&RÖæWBVæföÆF–ærâF–ffW&VçB&÷‚F—&V7F–öç2&VÖ–â6V×3²†–v†W"ævÆRÖ’7G&WF6‚à¥v'VBf6W27F’6W&FRC+ÂÖ’¦ö–â–âævÆRÖöFR–b÷&–v–æÃ“SG&–ævÆRö&V§fÆ–FF–öâ7V66VVG2âæò6÷W&6RöÇ–vöç2÷÷6—F–öç2öw&÷W2÷"W'6—7FVçB66†VÖ6†ævW2à¤÷&–v–æÂ&—fFR&÷‚(i"w&÷WVBFVç6—G’(i"6²(i"ôäRæF—fR6öÖÖ—B&WF–æVBâÆÂ–ç@¦6†ææVÇ27F–ÆÂ&WV—&RW‡Æ–6—B6ÆV"–çC²Vç7W÷'FVB÷7FÆRö†—7F÷'’÷v÷&²&VgW6À¦FöÖ–2âW‡Æ–6—Bf6RFÆ2&WF–ç2öæR—6ÆæBW"f6RæBW†7B6ÖÆÂ÷WGWG2à ¤FÆ2f6R6C“bƒ3,9s#‚’Â÷&–v–æÃ#²f6RÖ6÷&æW"'VFvWB&WF–æVBâ6†&VB6²ÆÀ¦æBWVÆ—¦RFVç6—G’7W÷'CC“b—6ÆæG26òÆ&vRFÆ2&VÖ–ç2VF—F&ÆRâÖçVÃ“SP¥7F—F6‚7F–ÆÂ†2—G2–æFWVæFVçB6öç6W'fF—fS#‚Öf6R66÷Râ÷&–v–æÂÃÓ#‚Ö—6Ææ@§6¶–ærv"RæBW†7B÷WGWB&WF–æVC²Æ&vW"Æ–÷WG2W6Rvã"ö6V–Â‡7'B†6÷VçB’’À¦÷WFW"Ö&v–ã"RÂ4ÔRFWFW&Ö–æ—7F–26öÖÖöâ×66ÆRw&–B6V&6‚†BÖ÷7CC“b6öÇVÖç2’à¤CC“b6†'G2F†—2—7ã2ã'‚vöã#BÖ3²æòÆ&vW"FW‡GW&R&W6öÇWF–öâ6Æ–ÖVBà ¥6ÖRÆæRö6öæRw&÷W–ær÷væW"æ÷r–æFW†W26VVB'V6¶WG2f÷"ã#†f6W3¢Öƒƒ'V6¶W@¦Æöö·W2ócB6VVB6æF–FFW2W"f6Rƒ#rÆöö·W2f÷"÷6—F—fRævÆR’ÂF†Vâõ$”t”äÀ§7G&–7B6VVBFW7G2â÷fW&ÆöFVB'V6¶WG26öç6W'fF—fVÇ’ÆVfRW‡G&6†'G26W&FRà¥6ÖÆÂf—†VB×ÆæR÷WGWBF‚Væ6†ævVC²æò—FW&F—fR7F—F6†–ær÷&VÆ†F–öâö÷F–ÖÀ§6¶W"â†÷7B6Öö¶SC“bÖf6R÷&–v–æÂFBÆæS£\+WFó3Bãf×2Ã+CBãF×2Äf6Sbãv×3°§F†W6R&R6–ævÆRÆö6Â5Rö'6W'fF–öç2ÂäõB•BÆFVæ7’÷"F–Ö–ær&öÖ—6Rà ¥6WfVâæWr–çFVw&F–öç26÷fW#C“bÖf6RWFòôf6RÂW†7B¦ö–ç2övVöÖWG'’÷VW"÷væW'6†—ð§&WVBööæR6†V6·ö–çC²Æ&vR6²öFVç6—G’æB&VGV6VBv7FVBUb&V²v'VBfÆÆ&6²ð¦F—66öææV7FVBÆæW3²Æ–Ö—G2÷&VgW6Ç3²7GVÃ#BÖf6R†—7F÷'’÷–çBõ6fT÷VâôtÄ#°§&–Ö'’W†—7F–ærT’öævÆRf÷'v&F–æs²W†7B6ÖR&WVW7FVBF÷væÆöBf–ÆVæÖRGv–6S°¦æB6†ÆÆ÷r÷6†'ævÆRF‡&W6†öÆG2Âf—†VBÖ6öæRG&–gBæC#SbÖf6Rf7BF‚âW†—7F–æp£#‚Ö&÷VæF'’&VgW6Âf—‡GW&W3ƒ“2óƒ“Ró“C’ó“Só“S2Ö÷fVBFóC“rv—F†÷WBG&÷–ærç¦FöÖ–6—G’76W'F–öã²&–÷##‚7V66W72FW7G2&WF–æVBã“SæVÂf—‡GW&RW‡Æ–6—FÇ“+à¤÷&–v–æÂ÷F†W"'VçF–ÖRÆv÷&—F†×2&WF–æVC²gVÆÂæBV&Æ–6F–öâ&ööbföÆÆ÷w2à ¥6fRVF—C¢&ö¦V7Df–ÆTæÖRöW‡÷'D&6–5&ö¦V7BÇ&VG’&WVW7BU„5B6†÷6VâæÖRÀ¦æòVæFVB6÷VçFW"â6f&’ö”õ2F÷væÆöG26öÆÆ—6–öâæÖ–ær—2÷WG6–FRF†—2F÷væÆö@¤’â7W'&VçBÔDâ&–Ö'’6ö×F–&–Æ—G’FF&V6÷&G26†÷u6fTf–ÆU–6¶W"Vç7W÷'FV@¦–â6f&’ö”õ3²6‡&öÖRw2’Fö7VÖVçFF–öâW‡Æ–6—FÇ’6—2æ6†÷"ÖF÷væÆöBfÆÆ&6°¦6ææ÷B÷fW'w&—FRâæò&—6·’&WÆ6VÖVçBö†–FFVâ–çFW&æÂ6fRöæWrf–ÆW7—7FVÒfVGW&P¦FFVBâW†—7F–ær6fRô÷Vâö6öFV2Væ6†ævVC²&Vw&W76–öâ&÷fW2Gvò–FVçF–6Â&WVW7FV@¦æÖW2â6÷W&6W26†V6¶VC#Dö7C##c ¦‡GG3¢ò÷&ræv—F‡V'W6W&6öçFVçBæ6öÒöÖFâö'&÷w6W"Ö6ö×BÖFFöÖ–âö’õv–æF÷ræ§6öà¦‡GG3¢òöFWfVÆ÷W"æ6‡&öÖRæ6öÒöFö72ö6&–Æ—F–W2÷vV"Ö—2öf–ÆR×7—7FVÒÖ66W727öÇ–f–ÆÆ–æp ¤DUd”4S“Sc¢&Wf–÷W6Ç’÷fW##‚Öf6RVç–çFVBÖW6‚(i"ö&¦V7BUb(i"WFòFÆ3\+°¦6†V6²F–ÖRæB6†'B6÷VçBâ6ö×&S+ó\+öâ6†ÆÆ÷r&VæG2Â6†'W"6÷&æW'2&WF–à§6V×3²w&VFW"ævÆW2Ö’7G&WF6‚âUbVF—F÷"õ6²õVæFõ&VFó²–çBæB6fT÷Vâ&W7VÇBà¤æWrÆ–Ö—G3C“ff6W2ó#¶6÷&æW'2Âæ÷BVæÆ–Ö—FVBâæW‡BföÆÆ÷r&VÂ•BVÆ—G’öÆFVæ7¦fVVF&6²&Vf÷&R'&öFVæ–ærVçw&³“SRÖçVÂ7F—F6‚FWf–6RvFR&VÖ–ç26W&FRà ¢22W6W"&öGV7BF—&V7F–öâ(	B–çBÂf6Vw&÷W2æBw&†–6ÂT’(	B#Bö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’6—2F†W6R&ReUEU$RuT”DTÄ”äU2Âæ÷B–ÖÖVF–FR&WVW7G2Fò–×ÆVÖVç@¦ÆÂöbF†VÒ–ã“Sbâ&W6W'fR7W'&VçBFÆ2'V–ÆB66÷RâgWGW&RF—&V7F–öã ¢Ò–çBf6Vw&÷W2F—&V7FÇ’öâF†RÖW6ƒ¢76–vâW†—7F–ærÖW6‚æf6Tw&÷W2W"öÇ–vöâÀ¢æ÷B$t"FW‡GW&R—†VÇ2âW†—7F–ær6ÆöæRö†—7F÷'’÷&ö¦V7Bôô$¢ôäôÒw&÷W÷væW'27F¢WF†÷&—FF—fRâ&WW6R7W&f6Rf6R–6¶–ærõVæ6–Âöæf–vF–öã²UbÖg&VRw&÷W×F&vW@¢æVVG2FVÆ–&W&FRF&vWBfÆ–FF–öâ&F†W"F†â&WFVæF–ær7W'&VçBUb–çFW"Ç&VG¢7W÷'G2—BâöæR66VæR6†V6·ö–çBW"7G&ö¶S²æò&ÆÆVÂÖW6‚öw&÷Wö†—7F÷'’¶W&æVÂà¢Ò'&–ær&öGV7F–öâ–çB–çFòÖ–ç7G&VÒ66W73²7W'&VçBf–Ww÷'B×–çBæ§2ÆVæ6†W ¢—2–âf–ÆRâ&V6öææV7B÷&–v–æÂ–çFW"÷6W76–öâÂæ÷B6V6öæB–çF–ær–×ÆVÖVçFF–öâà¢Ò6öçFW‡GVÂ–çB&F–Âf÷"''W6†W2æBÆ–W'2öÖ6·2Â&WF–æ–ær÷&–v–æÂ6öçG&öÇ2ð¢7F–öâ÷væW'2æBF†R66WFVBÆVgBFö6²VçF–ÂFVÆ–&W&FVÇ’Ö–w&FVBæBFW7FVBà¢ÒÖ÷&Rw&†–6ÂT“¢6öç6—7FVçBgVæ7F–öâ–6öç2v—F‚4ÔÄÂd•4”$ÄRFW‡B6F–öç2&VÆ÷rÀ¢–ç7—&VB'’W6W"w2WÆöFVBæöÖB67VÇB67&VVç6†÷CCd3dC32Ó“rÓC”RÔ3cbÓS$#“D#„CƒCà¢¶VW&VF&ÆRÆ&VÇ2ö66W76–&–Æ—G’÷F÷V6‚F&vWG3²6ö†W&VçB–6öâfÖ–Ç’æB7F—fR7FFRà¢7FvR6†ævW2–â6ÖÆÂ&Wf–WvVB7W&f6W3²&WF–â66WFVB&F–ÂÆö6F–öç2ÂvW7GW&W2À¢fö7W2Â†—7F÷'’æBÖöFVÆÆW"&V†f–÷"âæòv†öÆW6ÆR&W6¶–âWFöÖF–6ÆÇ’WF†÷&—¦V@¢2F†RæW‡BVçFW7FVB6†ævRâF†W6RF—&V7F–öç2&VÖ–â–â&öFÖgFW"FÆ2fVVF&6²à ¤VF—C¢ÖW6‚æ§27F÷&W27G&–æröçVÆÂf6Tw&÷W2æB&W6W'fW2F†VÒöâ6ÆöæS²÷&–v–æÀ¦f6Vw&÷WÖ6öÆ÷W'2Ö6÷&RF—7Æ—2F†VÒâ&Wf–WrÇ&VG’†26÷W&6RÖf6RG&–ævÆRÖ–ærà£“SbFöW2æ÷B6†—f6Vw&÷W''W6†W2ÂæWr–çBVçG'’Â–çB&F–Â÷"–6öâ&VFW6–vâà ¢ã“Sbf–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£#s“b52òd”Âò6¶—VB¢ ¢ƒãW2’Â÷&–v–æÃ#sƒ’ÇW26WfVâæWrFÆ2öævÆR÷6fRÖæÖR6†V6·2âfö7W6VBFÆ3“C’ð£“Só“SÂ7WC“S2÷7F—F6ƒ“SRÂ6²öFVç6—G’÷&VÆV6SS52âöæÇ’÷&–v–æÂÆ–Ö—BÖ&÷VæF'¦f—‡GW&W2Ö÷fVBFò&WVW7FVCC“s²FöÖ–2&VgW6ÂæB&–÷##‚7V66W72&WF–æVBà¤÷&–v–æÃ“SæVÂf—‡GW&RW‡Æ–6—FÇ’6†ö÷6W3+VæFW"æWrT’ævÆRf÷'v&F–ærâæð§6¶—VB&V†f–÷"6†V6·2â&Wf–WvVC‚Öf–ÆRUbôFBô×VÇF’ôÆ"&WfW'6R66†R6Æ÷7W&S“Sc°¦Ö–â÷–6¶–æs“SBöv—¦Öó“SR÷v÷&·76S“S"ô×VÇF“ãög&÷¦VâVæ6†ævVBâ6fRô÷Vâ÷væW"Ç6ð§Væ6†ævVC²6f&’W‡FW&æÂÖF÷væÆöB÷fW'w&—FRÆ–Ö—FF–öâfW&–f–VBg&öÒ&–Ö'’6÷W&6W2à¤†÷7FVBõvW2öÆ—fR&ööbföÆÆ÷w2âæó“SR÷#“SbFWf–6R52–æfW'&VBà  ¢22ã“SbV&Æ–6F–öâfW&–f–VB(	B#Bö7Fö&W"##` ¥'VçF–ÖR6öÖÖ—Bc#s“fVCS&V&f#“c“–CV#–3VSƒs“&#““V&öâÖ–ã²W†7BFW7FVBG&VP¦#s&&#ƒf3sc–S†6ƒSF&c“†66c3–CƒV3FSCƒ&C†âÆö6ÂæöFS#Bã’ã£#s“b52À£d”Âó6¶—VBƒSãf×2“²fö7W6VBFÆ2÷6²öFVç6—G’÷&VÆV6S£S52à¤†÷7FVBæöFS#"F÷öÆöw’&Vw&W76–öâ'VãCCss33cRö¦ö##s33ƒsscB5T44U53 £#s“b52Ãd”Âó6æ6VÆÆVBó6¶—VBƒCcC#ã&×2’Â6ö×ÆWFVC##bÓÓ#EC£#£Ce¢à¦‡GG3¢òöv—F‡V"æ6öÒô7&—4&W§¢ô&÷„Æ"ö7F–öç2÷'Vç2óCCss33cP¥vW2'VãCCss333s5T44U52â66†RÖ'W7FVBV&Æ–2tUG3£#ó#'—FRÖ–FVçF–6ÂFòFW7FV@¦6†V6¶÷WBÂ–æ6ÇVF–ærfW'6–öâö–æFW‚ÂÆÃ‚&Wf–WvVBUbôFBô×VÇF’ôÆ"6†ævVB76WG2À§&VÆV6RÆöFW'2Â&÷FV7FVC“SBÖ–â÷–6¶W"÷FövvÆRöVFvR×–çBÃ“S"v÷&·76RÃ“SRv—¦ÖòÀ£“36vR&F6†–ærÄ×VÇF“ãæBg&÷¦Vâ&WFrÖ&¶W"âf—'7B&RÖFWÆ÷–ÖVçBtUB&WGW&æV@¦öÆB'VçF–ÖS²g&W6‚&WVW7G2gFW"FWÆ÷–ÖVçBÖF6†VBWfW'’f–ÆRâæòÖ—†VBÆ—fR'V–ÆBà¦‡GG3¢òöv—F‡V"æ6öÒô7&—4&W§¢ô&÷„Æ"ö7F–öç2÷'Vç2óCCss333s  ¥&VG’f÷"DUd”4S“Sc¢&Wf–÷W6Ç’÷fW##‚Öf6RVç–çFVBÖöFVÂ(i"ö&¦V7BUb(i"WFòFÆ0£\+²–ç7V7B—6ÆæG2÷F–ÖRâ6ö×&S+ó\+6†ÆÆ÷r&VæG2æB6†'6VÒ&WFVçF–öâà¥VæFòõ&VFòÂ–çBæWrÖÂF†Vâæ&÷†Æ"6fRô÷Vâ6†÷VÆB&W6W'fRUg2æB–çBà£“S2ó“SBó“S"52&÷FV7FVBâæó“SRó“SbFWf–6R52–æfW'&VBâgWGW&Rf6Vw&÷W''W6†W2À¦Ö–ç7G&VÒ–çB66W72Â–çBöÆ–W"&F–ÂæB6F–öæVB–6öâT’&VÖ–â&V6÷&FV@§&öFÖF—&V7F–öç3²æöæR&R'Böc“Sb'VçF–ÖRâ6f&’÷fW'w&—FRÆ–Ö—FF–öâ&VÖ–ç0¦'&÷w6W"Ö÷væVC²6fRô÷Vâf–ÆVæÖR÷væW"Væ6†ævVBâFö72ÖöæÇ’&ööb6öÖÖ—BföÆÆ÷w2à ¢22ã“Sr(	Bf&–&ÆR×6—¦R6†VÆb6¶–æs²ã“Sb52(	B#Bö7Fö&W"##` ¥W6W"ã“Sb52öæW‡F'V–ÆB&÷FV7G2ævÆRWFòFÆ2æBÆ&vW"Æ–Ö—G2âVF—BÖ–à£ƒ&FFcFS¢6¶VDÆ–÷WBÆÆö6FW2–FVçF–6Â6VÆÇ2W6–ærÆ&vW7B6†'B&÷VæG3²÷&–v–æÀ¥Ubv÷&·76R7F–ÆÂF—6&ÆVB6²öFVç6—G’&÷fS#‚FW7—FSC“bÖ6&ÆR÷væW"à¤W‡FVæB4ÔR6¶VDÆ–÷WBv—F‚†V–v‡B÷v–GF‚ô”B6÷'FVBæW‡BÖf—B6†VÇfW2æC#B&÷VæFV@¦6öÖÖöâ×66ÆRG&–Ç2â6†ö÷6RöæÇ’–b6öÖÖöâ66ÆR7G&–7FÇ’–×&÷fW2÷fW"÷&–v–æÀ¦w&–C²WVÂ×6—¦VB6†'G2&WF–â÷&–v–æÂw&–Bâæò6†'B&÷FF–öâÂ6†RæW7F–ærÀ§&VÆ†F–öâÂ6VÒ6†ævW2÷"÷F–ÖÂ×6¶–ær6Æ–Òâ6÷W&6RvVöÖWG'’æB÷&–v–æÀ¥Ubö†—7F÷'’÷–çB&VgW6ÂöçVÖW&–2Ö6öÆÆ6RfÆ–FF–öâ&WF–æVBâÆÂ6ÆÆW'2„WFòð¤f6RFÆ2Â6²Â7WBõ7F—F6‚&W6²’&WW6R÷&–v–æÂ÷væW"âv÷&·76R6²öFVç6—G¦æ÷rVæ&ÆVBF‡&÷VvƒC“b—6ÆæG2âÖ&v–âæB6÷VçBÖFWVæFVçBv2Væ6†ævVBà¤æWrFW7G2fW&–g’Ö—†VB×6—¦R6÷fW&vRÂ6öÖÖöâ&VÆF—fRFVç6—G’Â6W&F–öâÂ&÷VæG2À¦FWFW&Ö–æ—6ÒÂWVÂ×6—¦RfÆÆ&6²æB7GVÂv÷&·76S#’óC“bóC“r6öçG&öÂvF–ærà¥fÆ–FF–öã¢gVÆÂ7V—FS#s“u52ód”Âó6¶—ƒ“‚ã‡2’ÂÇW2GvòæWr6†VÆbFW7G0¥526W&FVÇ’†FFVBgFW"gVÆÂ'VâVçVÖW&FVBf–ÆW2“³#s“’F—7F–æ7BFW7G26÷fW&VBà¥&VÆV6R¶æWr6¶–ær÷v÷&·76Rfö7W6VC52âæò76W'F–öç2&VÖ÷fVB÷&VÆ†VBà¥V&Æ—6†VB'VçF–ÖR63f#v3#CƒƒsSv3#ƒ–3CfS3C†6SCC3s²W†7BFW7FVBG&VP¦3#&C6#f&fSs†63cC3–##ƒfFC†&##cVfW&–f–VB&Vf÷&RWFF–ærÖ–âà¥vW3CcsSSs"5T44U53³"ó"V&Æ–2f–ÆW2'—FRÖÖF6‚†ÆÂ6†ævVB'VçF–ÖRö66†P¦ÆöFW'2ÇW2&÷FV7FVBÖ–ã“SBô×VÇF“ã’â†÷7FVB&Vw&W76–öãCcsSS“c"ö¦ö##s“3sSc3sR5T44U53²6ö×ÆWFR†÷7FVBÆöw0§fW&–g“#s“•52ód”Âó6¶—âÆö6ÂgVÆÂæBfö7W6VB6†V6·2&÷fR76VBà¤æòFWf–6S“Sr52–æfW'&VBâFö72ÖöæÇ’&ööb6öÖÖ—BföÆÆ÷w3²'VçF–ÖRVæ6†ævVBà¥&Wf–WvVB&WfW'6R66†Rw&ƒ“Ss²Ö–ã“SB÷–6¶W#“SBöv—¦Öó“SRô×VÇF“ãög&÷¦VâVæ6†ævVBà¤DUd”4S“Ss¢Vç–çFVBf&–VB×6—¦RÖW6‚(i"WFòFÆ2(i"–ç7V7B6¶–æs²W†—7F–ærU`¦Æ–÷WB(i"6²ÆÃ²VæFõ&VFó²–çBF†Vâ6fT÷Vââ–çFVBF&vWG2&WV—&R6ÆV"–ç@¦&Vf÷&RUb&W6¶–ærâ&–vvW"6†'B&÷VæF–ær&÷†W2Fòæ÷BwV&çFVRF–v‡B6öæ6fRæW7F–ærà¤æW‡BföÆÆ÷r7GVÂ6¶–ærVÆ—G’öFWf–6RF–Ö–ær&Vf÷&R'&öFW"Vçw&÷"T’6†ævW2à ¢22ã“S‚(	BUb÷W6Æ—–ær6öçF–æÖVçB(	B#Bö7Fö&W"##` ¥W6W"67&VVç6†÷Bd”$#c”Böã“Sr6†÷w2&–v‡BFööÆ&"æB&÷GFöÒ7FGW2F—6V&–æp¦BF†R4ÔRfW'F–6Â&÷VæF'’v†–ÆRUbDôôÅ2÷W—2÷VâÂ&Vf÷&RUbv÷&·76Rà¤æ÷B7FÆR6†VÆÃ²æ÷BWf–FVæ6Rv–ç7C“Sr6¶–ærâæó“SrFWf–6R52–æfW'&VBà¤VF—B6†&VBFööÂ×6W76–öâ×V’&Vv–ã¢UbFööÇ2W6W2G&ç6f÷&ÖVB67&öÆÆ–ær6†&VBFö6²à¤W†—7F–æs“S"v÷&·76R6–&Æ–ærf—‚FöW2æ÷BÇ’FòF†—2&V6VF–ær÷Wà¤æ'&÷rÖ—F–vF–öã¢÷&–v–æÂUb×FööÇ2†÷7BW6W2ÆVgB÷&–v‡C‡‚²WFòÖ&v–ç2–ç7FV@¦öbG&ç6ÆFU‚6VçG&–ærÂÆö6Â—6öÆF–öâæBÆ–÷WB÷–çB6öçF–æÖVçBâ÷&–v–æÂæöFW2À¦Æ—7FVæW'2Âv–FR&öG’ö7F–öç2Â†—7F÷'’æBÆÂUbÆv÷&—F†×2Væ6†ævVBâ6ÆV"F†W6P¥UbÖöæÇ’7G–ÆW2&Vf÷&RF†RæW‡BFö6²†–æ6ÇVF–ærÆVgB–çB“²÷&F–æ'’FööÇ2¶VW §6†&VBÆ6VÖVçBâæòæWrVF—F÷"Âö–çFW"Æ—7FVæW"Â&W6—¦RöÆÆ–ær÷"¢Ö–æFW‚W66ÆF–öâà¤W†7B•BõvV$¶—B6ö×÷6—F÷"f–ÇW&R—2äõB&W&öGV6VB†W&S²F†—2—2F&vWFV@¦6öçF–æÖVçB&W—"&WV—&–ærFWf–6R66WFæ6RÂæ÷B&÷fVâ'&÷w6W"ÖVæv–æRF–væ÷6—2à¤æWrFW7BW†V7WFW2÷&–v–æÂ&Vv–âf÷"Un(i%–çN(i&÷&F–æ'’FööÂæBfW&–f–W266÷VB6Æ—À§G&ç6f÷&ÒÖg&VRUbÆ6VÖVçBæB7G–ÆR6ÆVçWâ&VÆV6R6öçG&7Bö66†R¶W—2&Wf–WvVC“Sƒ°¦Ö–ã“SB÷–6¶W#“SBô×VÇF“ãög&÷¦VâæC“Sr6¶–ær÷v÷&·76RVæ6†ævVBà¤DUd”4S“Sƒ¢&WVBö&¦V7N(i%UbæB6Æ÷6RÂvF6‚gVÆÂF÷×&–v‡BFööÆ&"÷7FGW3²WFòFÆ2À¤÷VâUbVF—F÷.(i$&6²Fó4BÂF†Vâ–çBæBæ÷F†W"FööÂFò6†V6²÷W÷6—F–öç2à¤æW‡B7GVÃ“S‚•B6Æ—–ær&WFW7B&Vf÷&RgW'F†W"Vç&VÆFVBFWfVÆ÷ÖVçBà¤–æ—F–ÂgVÆÂ'Vâf÷VæBöæRöÆCs76W'F–öâ&WV—&–ærÆVgCSRf÷"Ub2vVÆÂ0¦÷&F–æ'’FööÇ3²WFFVBöæÇ’UbW‡V7FF–öâFò–ç6WC‡‚÷&–v‡C‡‚öæò×G&ç6f÷&ÒÀ§&WF–æ–ærWfW'’÷F†W"ÆVæ6‚ö6Æ÷6Rö†—7F÷'’6†V6²âfö7W6VC#52âf–æÂgVÆÂ×'Vã#ƒ52ód”Âó6¶—ƒ“Bã“W2’âV&Æ–6F–öâWf–FVæ6RföÆÆ÷w2âæó“Sr6¶–ær6÷W&6R6†ævVBà ¢ã“S‚V&Æ–6F–öã¢'VçF–ÖS†FV&CCVCcƒ#VC#†S“VfSCƒfSCC“–#–SRöâÖ–âà¥FW7FVBG&VS&ƒf3Cs3VCCVSSv#&6#fc##FS#c666&BÖF6†VBWÆöFVBv—BG&VRW†7FÇ’à¤Æö6Âf–æÃ#ƒ52ód”Âó6¶—²fö7W6VC#52âvW3CcƒSƒscƒ5T44U52à¤ÆÃ26†V6¶VBV&Æ–2f–ÆW2'—FRÖÖF6‚FW7FVB6†V6¶÷WC¢6†VÆÂ÷fW'6–öâöæWr6W76–öâT’À§&WF–æVC“SrUb÷6¶–æröÆöFW'2æB&÷FV7FVBÖ–ã“SBô×VÇF“ãâæò6¶–ærÆv÷&—F†Ð¦6†ævW3“S‚â†÷7FVB&Vw&W76–öãCcƒSƒƒ“Rö¦ö##s“c“C#B5T44U53£#ƒ52ód”Âó6¶—à¤7GVÂ–çFW&Ö—GFVçB•Bf–ÇW&Ræ÷B&W&öGV6VC²DUd”4S“S‚÷Wö†VFW"÷7FGW2&WFW7@§&WV—&VBâæó“Sró“S‚FWf–6R52–æfW'&VBâFö72ÖöæÇ’V&Æ–6F–öâ&ööbföÆÆ÷w2à ¢22ã“S’(	B&V6öææV7B&öGV7F–öâ–çB–âö&¦V7B&F–Ã²ã“S‚52(	B#Bö7Fö&W"##` ¥W6W#“S‚52öæW‡F'V–ÆB&÷FV7G2Ub×÷Wö†VFW"÷7FGW26Æ—–ær&W—"æB7G–ÆP¦6ÆVçW7&÷72Un(i%–çN(i&÷&F–æ'’FööÇ2â&–÷"VæF–æs“S‚FWf–6Ræ÷FW27WW'6VFVBà¤VF—BÖ–ãƒSSCFvS¢÷&–v–æÂö&¦V7B×&F–Â×6W76–öâÇ&VG’Ö2Ub–çBFò÷&–v–æÀ§f–Ww÷'E–çD'Fâ÷Wb×–çBõõö&÷†Æ%f–Ww÷'E–çBÂ'WBF÷FÂÖv—¦Öò&–æröÖ—GFVB'WGFöâà¤FBUb–çBB÷WFW#C\+&F—W3#3²WfW'’W†—7F–ær6V7F÷"7F—2–âÆ6Râ÷&–v–æÀ¦FFW"ÆVæ6†W24ÔR&öGV7F–öâ–çFW"Â÷vç26æ6VÆÆF–öâö6ö×ÆWF–öâöv—¦Öò†–FS°¦W†—7F–ærf–ÆRÆVæ6†W"&WF–æVBâ–çFW"÷Vç2ÆVgBFö6²æBVæf÷&6W2÷&–v–æÂöæP¦7F—fR–æFWVæFVçBUbö&¦V7B÷–çBF&vWBwV&G2âæòæWr''W6‚öÆ–W"ö†—7F÷'’ö–çW@¦÷væW"Âæò–çFW"6†ævW2÷"–6öâ÷fW&†VÂâ÷&–v–æÂÆVgB–çBW†6WF–öâ&WF–æVBà¤W‡FVæB÷&–v–æÃs–çfVçF÷'’öÆVæ6‚ö6Æ÷6R÷76–ærf—‡GW&Rv—F‚Ub–çC²ÆVgC‡€¦W‡V7FF–öâ–æ6ÇVFW2÷&–v–æÂ–çBFö6²ÂÆÂöÆB76W'F–öç2æB÷6—F–öç2&WF–æVBà¤Æö6ÂgVÆÃ#ƒ52ód”Âó6¶—ƒ“Rã“—2“²fö7W6VC•52Âf–æÂ&F–ÃE52à¤æò76W'F–öç2&VÖ÷fVBâV&Æ–6F–öâWf–FVæ6RföÆÆ÷w2âöæÇ’'VçF–ÖRgVæ7F–öæÆ—G“¢öæR&F–À¦'WGFöã²6†VÆÂ÷&V6÷fW'’öv—¦Öò66†R–ã“S’æB&Wf–WvVB76WB6öçG&7Bâ6W76–öã“S‚À¦Ö–ã“SB÷–6¶W#“SBô×VÇF“ãõUc“Sr÷6¶–ærög&÷¦VâVæ6†ævVBà¤DUd”4S“S“¢6VÆV7BöæRUbö&¦V7B(i"ö&¦V7B&F–Â(i"Ub–çB†÷WFW"WW"×&–v‡B“°¥Væ6–Â–çBÂf–ævW'2÷&&—B÷â÷–æ6‚ÂVæFõ&VFò7F—2–â–çC²Föæ^(i'&F–Î(i'&V÷Và§6ÖRÆ–W'2âG'’Ub÷W(i&6Æ÷6^(i%–çBæB–çN(i$Föæ^(i&æ÷F†W"FööÂâ6fT÷Vâ&WF–ç0§–çBâf–ÆR–çBVçG'’7F–ÆÂv÷&·2â–çfÆ–BöæòÕUbF&vWG2&WF–â÷&–v–æÂ&VgW6Âà¤æW‡BfVVF&6²öâÖ–ç7G&VÒ66W72&Vf÷&R6W&FR–çB×FööÂöÆ–W"&F–Â'V–ÆBà ¢ã“S’'VçF–ÖSSv6#6VSƒfFFcCƒsVS3–fFC“Ff6S†33ƒƒ‚V&Æ—6†VBöâÖ–ã²WÆöFV@§G&VSCƒ#vc63#VSƒVS–#C##sfSS“#Cs66VVCcbW†7FÇ’WVÇ2FW7FVBÆö6ÂG&VRà¤Æö6Ã#ƒ52ód”Âó6¶—Âfö7W6VC•52Âf–æÂ–çfVçF÷'’öÆ–fV7–6ÆSE52â†÷7FV@§&Vw&W76–öãCc“Ccö¦ö##s“ƒS“s5T44U53£#ƒ52ód”Âó6¶—°¥vW3Cc“C“#B5T44U52à¤ÆÃb6†V6¶VBV&Æ–2f–ÆW2'—FRÖÖF6‚FW7FVB6†V6¶÷WB‡6†VÆÂ÷fW'6–öâöæWrv—¦ÖòÀ¦÷&–v–æÂ–çFW"öFFW"÷6W76–öã“S‚õUc“Sr÷6¶–æröÖ–ã“SBô×VÇF“ãæBÆöFW"w&‚’à¥W6W#“S‚52W‡Æ–6—FÇ’&÷FV7FVC³“S’†æG2ÖöâvFR&VÖ–ç26W&FRâæó“Sr6¶–æp¥52–æfW'&VBæBæò6¶–ær÷–çBõUb÷6W76–öâÆv÷&—F†Ò6†ævVB–ã“S’à ¢22ã“c(	B6F–öæVB''W6‚×FööÂ&F–Â–â–çBFö6³²ã“S’52(	B#Bö7Fö&W"##` ¥W6W#“S’52öæW‡F'V–ÆB&÷FV7G2÷&–v–æÂö&¦V7B&F–ÂUb–çB66W72æB66WFV@£“S‚6Æ—–ærf—‚âVF—B7W'&VçC“–cvC¢–çFW"w2–çBÖ7F–öâ6VÆV7B÷vç2FööÀ§6WGF–æw2ö6†ævR6æ6VÆÆF–öâÂ''W6‚ôf–ÆÂôW&6W"õ6×VFvRô&ÇW"Ç&VG’–×ÆVÖVçFVBà¥&WÆ6Rf—6–&ÆR6VÆV7Bv—F‚æF—fRFWF–Ç2''W6‚FööÇ2–6¶W"–â4ÔR–çBFö6³°¦÷&–v–æÂ6VÆV7B&VÖ–ç2†–FFVâ26WGF–æw2öWfVçB÷væW"âf—fScl9sS'‚'WGFöç2öâ£##‚&F–ÂÂ5drgVæ7F–öâ–6öç2æBf—6–&ÆR6F–öç3²6VÆV7FVB&–×&W76VB†–v†Æ–v‡@¦æB6öÆÆ6VB7W'&VçB×FööÂ6F–öââV6‚6Æ–6²6†V6·2÷&–v–æÂ7F—fRöF—6&ÆVBvFRÀ§6WG2÷&–v–æÂ6VÆV7BæBF—7F6†W24ÔR6†ævRWfVçB†6ÆV"7FvVB–ÖvRö6æ6VÂÆ—fP§7G&ö¶R÷7–æ26öçG&öÇ2’â–6¶W"6Æ÷6W2öâ6†ö–6RæB6W76–öâVæBâòF—6&ÆVB6VÆV7F–öà¦—2Ö—'&÷&VBâæòæWrf–Ww÷'B–çWBÂ''W6‚&7FW"ö†—7F÷'’÷–çB&W6÷W&6R÷"Æ–W"÷væW"à¤66WFVBÆVgBFö6²öfö÷FW"öÆ–W'2÷6WGF–æw2övW7GW&R÷FööÂ÷6—F–öç2&WF–æVBâæòÆ–W §&F–ÂÂf6Vw&÷W2÷"'&öB&W6¶–â–ã“c²7FvVBw&†–6ÂT’öæÇ’öâF†W6SRFööÇ2à¥Gvò7GVÂ&öGV7F–öâT’–çFVw&F–öç3¢ÆÃRFööÇ2ö6F–öâ÷6VÆV7F–öâö&ÇW"6öçG&öÇ2ð¦æò†—7F÷'’æBF—6&ÆVB&VgW6Ã²Æ—fRVæ6–Â7G&ö¶^(i'&F–Â7v—F6‚6æ6VÇ2÷&–v–æÀ¦6öçF7Bv†–ÆR&WF–æ–ær6öÖÖ—GFVB–çBö†—7F÷'’æBæf–vF–öââ–æ—F–ÂæWrf—‡GW&P§&VB&–×&W76VBg&öÒ&÷W'G’–ç7FVBöbW†—7F–ærGG&–'WFW2Ö²6÷'&V7FVBFW7@¦66W72Âæò&öGV7F–öâv÷&¶&÷VæB÷"÷&–v–æÂ76W'F–öâ&VÖ÷fVBâæWr·&VÆV6Su52À¦÷&–v–æÃ“T’ö6÷&R·&VÆV6S%52âgVÆÂÆö6Ã#ƒ%52ód”Âó6¶—ƒ“rã#2“²V&Æ–6F–öâWf–FVæ6RföÆÆ÷w2à¤DUd”4S“c¢ö&¦V7N(i%Ub–çN(i$''W6‚FööÇ3²–ç7V7B–6öç2ö6F–öç2Â–6²''W6‚ôW&6W"ð¤f–ÆÂô&ÇW"õ6×VFvS²–6¶W"6öÆÆ6W2æB7W'&VçBFööÂ6F–öâföÆÆ÷w2â–çBõVæFõ&VFòÀ¦f–ævW"æf–vF–öã²Föæ^(i'&V÷VâæBfW&–g’6ö×7BFö6²öÆ–W'2âUb÷W6Æ—–æp¦æC“S’ö&¦V7B&F–ÂVçG'’&VÖ–â&÷FV7FVBâæW‡BfVVF&6²&Vf÷&RÆ–W"öÖ6²&F–Âà ¢ã“cV&Æ–6F–öã¢'VçF–ÖScc–C#s“CFf3Cv3ƒc3–Ss&S33“F#C3FSF#F"öâÖ–ã°¦W†7BFW7FVBG&VV#&C†63ƒVSsƒsS–CfS6#f3ff36CƒCVcc“SƒbÖF6†VBv—BWÆöBà¤Æö6Ã#ƒ%52ód”Âó6¶—ƒ“rã#2“²æWr÷&VÆV6Su52æB÷&–v–æÃ“÷&VÆV6S%52à¥vW3CsCC#c’5T44U53³bób6†V6¶VBV&Æ–2f–ÆW2'—FRÖ–FVçF–6ÂFòFW7FVB6†V6¶÷WC §6†VÆÂ÷fW'6–öâöæWr–çFW"Â&WF–æVC“S’v—¦ÖòöFFW"Ã“S‚6W76–öâ†÷7BÃ“SrUb÷6¶–ærð¦ÆöFW'2ÂÖ–ã“SBô×VÇF“ãæBÆ"w&‚â†÷7FVCCsCC#cS‚ö¦ö##ƒSSCC#ƒ5T44U53£#ƒ%52ód”Âó6¶—à¥W6W#“S•52&÷FV7FVBâDUd”4S“c–6öâ76–ær÷6VÆV7F–öâ÷–çBöæf–vF–öâö†—7F÷'¦66WFæ6RVæF–æs²æòFWf–6R52–æfW'&VBâ÷&–v–æÂÆ–W"öÖ6²6öçG&öÇ2&VÖ–âà ¢22ã“c(	B&÷VæB†–FFVâv—¦Öò&ö¦V7F–öâæB5dr6ö×÷6—F÷"7W&f6S²ã“c&F–Â50 £#Bö7Fö&W###bâW6W#“c52f÷"''W6‚&F–Ã²6W&FVÇ’&W÷'G2v–çB&VBöw&VVà¦Æ–æW2gFW"–çBFöæRæB&V7W'&–ær&–v‡B×6–FRT’F—6V&æ6RföÆÆ÷v–ærUbFööÇ2ð¦Öf–Ww2Â6†æv–ær2v—¦Öòöö&¦V7B÷&&—G27&÷7267&VVââ&–÷#“S‚6Æ—–ær52—0¦†—7F÷&–6Ã²&V7W'&Væ6R—2õTâæBæ÷BF—6Ö—76VB'’&–÷"52÷"æöFR&W7VÇG2à¥&Wf–WvVBWÆöFVCT3CC“ƒ67&VVç6†÷BæC’ãw267&VVå&V6÷&F–æsrÓÓ3Rg&ÖW32ów2à¥f–FVò6†÷w2Æ—fRÖöFVÂöv—¦Öòv†–ÆR†VFW"öö&¦V7BT’F—6V'2âW†7B•B6ö×÷6—F÷ ¦fVÇB&VÖ–ç2Vç&W&öGV6VBÆö6ÆÇ“²Fòæ÷B6Æ–Ò&÷fVâvV$¶—BVæv–æRF–væ÷6—2à¤VF—B7W'&VçC6#F“¢F÷FÂÖv—¦Öò7–æ26WG2&ö÷Bæ†–FFVâGW&–ær–çB'WB7F–ÆÂ6ÆÇ0§7–æ4†—5f—7VÇ2â&ö¦V7FVE&–æuF‚W6W24•¤S“böÖ‚ƒÆ†–FFVå&V7Bçv–GFƒ“¢†–FFVà§&ö¦V7F–öâÖvæ–f–W2&–ær6ö÷&F–æFW3“l9s²&ö÷BG&÷×6†F÷rf–ÇFW"æB÷fW&fÆ÷v–æp¦Ö–â5drÆÆ÷rVæ÷&Ö÷W2–çBöf–ÇFW"&÷VæG2â&÷F‚f–ÇW&W2ÆW6–&Ç’6†&RF†—0§Væ&÷VæFVB&W6VçFF–öâ7W&f6RÂVæÆ–¶R&Wf–÷W2÷WÖöæÇ’Ö—F–vF–öâà¥&W—"4ÔRv—¦Öò÷væW#¢æò†—2WFFRv†–ÆR†–FFVã²&ö¦V7FVE&–æuF‚&WGW&ç2V×G¦f÷"†–FFVâ÷¦W&òöæöæf–æ—FRF–ÖVç6–öç2÷"ç’æöæf–æ—FRö÷WBÖöbÖÆö6Ã“l9s“b&–ærö–çBà¤FVvVæW&FR&–æw26ÆV"&÷F‚f—6–&ÆRæB†—BF‡2F‡&÷Vv‚W†—7F–ær7–æ2÷væW#°¦†–FFVâv—¦Ö÷26¶—WFFW2æB&V6ö×WFRæ÷&ÖÆÇ’v†Vâ6†÷vâà¥&VÖ÷fR&ö÷BG&÷×6†F÷rf–ÇFW#²&÷VæBöæÇ’F—&V7BÖ–â5dr÷fW&fÆ÷râW‡FW&æÂ&F–À§6V7F÷'2ö6÷&æW"6†÷'F7WG2&VÖ–â÷WG6–FRÖ–â5dræB¶VW÷&–v–æÂÆ6VÖVçBö–çWBà¤æòG&ç6f÷&ÒvVöÖWG'’ÂvW7GW&RÂUb÷–çBö†—7F÷'’÷&VæFW"¶W&æVÂ÷"×VÇF“ã6†ævW2à£“S’&F–Âó“c''W6‚6öçG&öÇ2æC“S‚÷W6öçF–æÖVçBVæ6†ævVBâF†—2F&vWG2F†P¦7GVÂ†–FFVâ6—¦–ærFVfV7BæB6öç7G&–ç2&VæFW&–æs²•B&WFW7B—27F–ÆÂ&WV—&VBà¥GvòFW7G2W†V7WFR÷&–v–æÂ&–ærgVæ7F–öç2v—F‚&VÅF‡&VRW'7V7F—fR6ÖW&¢æ÷&ÖÀ¥…•¢F‡2Â†–FFVî(i'¦W&þ(i'&W7F÷&RW†7B&V6÷fW'’Âf–æ—FRÆö6Â6ö÷&F–æFW2Â–çfÆ–@§&ö¦V7F–öâ&VgW6Ã²†–FFVâ7–æ2wV&BöÖ–â5dröf–ÇFW"66÷RæB&WF–æVBW‡FW&æÀ¥–çB'WGFöâ÷6†÷'F7WB6öçG&7G2âfö7W6VCu53²Æö6ÂgVÆÃ#ƒE52ód”Âó6¶—ƒBãs72’âV&Æ–6F–öâWf–FVæ6RföÆÆ÷w2à¤DUd”4S“c¢–çN(i$FöæRöâ6ÖRÖöFVÃ²æòv–çB6öÆ÷W&VBÆ–æW2â&WVBUbFööÇ>(i%U`¤VF—F÷.(i$&6²ô6Æ÷6S²÷&&—BÖöFVÂöv—¦Öò–çFò&–v‡B6–FRæBvF6‚VçF—&RFööÆ&"ôö&¦V7@¤'&÷w6W"÷7FGW2&VÖ–âf—6–&ÆRâÖ÷fRõ&÷FFRõ66ÆRæB&F–ÂFööÇ27F–ÆÂW6&ÆS°¥–çBõVæFõ&VFòæBf–ævW"æf–vF–öâ&W6W'fVBâæW‡B7GVÃ“c&VæFW&–ærfVVF&6°¦&Vf÷&RVç&VÆFVBfVGW&W2â–b&V7W'&Væ6RW'6—7G2Â¶VW–æFWVæFVçB6Æ—–ær&W÷'@¦÷VâæB–ç7V7B÷F†W"f–ÇFW&VBö÷fW&fÆ÷v–ærÆ–W'3²Fòæ÷B–æfW"66WFæ6Rà ¢22–çBT’F—&V7F–öâ6Æ&–f–VB'’W6W"(	B#Bö7Fö&W###` ¥W6W"6—3“cFö6²Ö6öçF–æVB&F–ÂÖ—7VæFW'7FööB–çFVçBâFW6—&VB4ÔRfÆöF–æp§f–Ww÷'B&F–ÂF†VÖR2fW'FW‚ôVFvRôf6Rôö&¦V7BÂv—F‚–çB6öçFW‡Bâ6†ö÷6R''W6ƒ §&F–ÂF—6V'3²6ö×7BÂ6÷'&V7FÇ’6—¦VB6öçFW‡GVÂ6WGF–æw2BDõ4TåE$S°§&VÖ–æ–ærf–Ww÷'B6ÆV"f÷"–çF–ærâ†öÆBTÕE’$4´u$õTäBFò&V÷Vâ–çB&F–ÂÀ¦6†ö÷6R&ÇW"öWF2ÂF†Vâ&F–ÂF—6V'2æB6öçFW‡GVÂF÷æVÂ6†ævW2âÆ–W'2À¦Ö6·2æB–ÖvRÆ6VÖVçB6†÷VÆB÷Vâ6öçFW‡GVÂæVÇ2öæÇ’v†Vâ&WVW7FVBà¤W†—7F–ærÆVgBÆÂÖ6öçG&öÇ2Fö6²—2G&ç6—F–öæÂÂæ÷BFW6—&VBf–æÂ–çB–çFW&f6Rà¥W6W"W‡Æ–6—FÇ’FVfW'2÷76–&ÆR&÷GFöÒÖÆVgB–çBÖöFR'WGFöâÆöæw6–FR6VÆV7F–öâà¤Fòæ÷B6–ÆVçFÇ’&WÆ6RF†—2&WVW7Bv—F‚æ÷F†W"&F–ÂVÖ&VFFVB–âFö6²à¥7FvRÖ–w&F–öâW6–ær7W'&VçB–çFW"ö7F–öâö†—7F÷'’öÆ–W"÷væW'2æB6†&VBæVÀ§÷6—F–öâö6ö×7BÆ–÷WC²æòæWr''W6‚Væv–æRâ–çBÖ6öçFW‡B&6¶w&÷VæB†öÆB×W7@¦&VÆöærFò6–ævÆRW†—7F–ærvW7GW&R÷væW"æB÷fW'&–FRÖöFVÆÆ–ær–çfW'BôäÅ’v†–ÆP§–çF–æs²f–ævW'27F–ÆÂ÷&&—B÷â÷–æ6‚ÂVæ6–Â–çG2ÂVæFõ&VFò7F—2–â–çBà¤Fòæ÷B÷Vâ&F–Âg&öÒ7W&f6R–çB7G&ö¶R÷"æf–vF–öã²6æ6VÂVæF–ær†öÆ@¦öâÖ÷fVÖVçBö×VÇF—F÷V6‚â66÷R&VwVÆ"ÖöFVÆÆ–ær&F–ÂövW7GW&R÷væW'2Væ6†ævVBà¥F†—2—2Fö7VÖVçFVBF—&V7F–öã³“cf—†W2&VæFW&–æröæÇ’æBFöW2æ÷B6†—F†—2T’à ¢ã“cV&Æ–6F–öâfW&–f–VC¢'VçF–ÖSVf#FFf&VVS†3ƒSV#–Ff366&“ƒS3f#V&VC#2À¦W†7BFW7FVBG&VS6&Fc&#s–#FF&6C63FSƒ##“3v&S3SBâÆö6Ã#ƒE52À£d”Âó6¶—²fö7W6VCu52âvW3Cs3ƒƒsƒb5T44U53²†÷7FVB&Vw&W76–öãCs3ƒƒSc@¥5T44U52âÆÃb6†V6¶VBV&Æ–2'VçF–ÖRöÆöFW"÷&÷FV7FVBf–ÆW2'—FRÖÖF6‚FW7FVBG&VRà¤FWf–6S“c&VBöw&VVâÆ–æW2æB÷&&—BÖFWVæFVçB6Æ—–ær66WFæ6R&VÖ–ç2VæF–æs°¦æò&ööböb•B6ö×÷6—F÷"&ö÷B6W6R–æfW'&VBg&öÒWFöÖFVB76W2à ¢22ã“c"(	B7F'GWöÆ–fV7–6ÆRf–Ww÷'B6—¦–æs²ã“c&VæFW&–ærd”Â(	B#Bö7Fö&W###` ¥W6W#“cd”Ã¢&–v‡B×6–FRT’'&ö¶Vâ–ÖÖVF–FVÇ’gFW"&Vg&W6ƒ²÷'G&—N(i&ÆæG66P§&W7F÷&W2—BâFòäõBÖ&³“c&VæFW&–ærf—†VBg&öÓ#ƒBWFöÖFVB76W2ã“c''W6€§&F–Â66WFæ6R—26W&FS²W6W"w26Æ&–f–VBfÆöF–ærf–Ww÷'B–çB&F–Âv—F€¦6ö×7BDõ6öçFW‡GVÂ6WGF–æw2&VÖ–ç2&V6÷&FVBæB—2äõB–×ÆVÖVçFVB–ã“c"à¤VF—BÖ–ãVf#FFf¢&VæFW&W"&W6—¦R'Vç2öæ6RB7F'GWæBöâv–æF÷rç&W6—¦RöæÇ’À¤E"—26WBöæ6RâÆFW"Æ–÷WBö6öçF–æW"÷f—7VÂf–Ww÷'B6†ævW2†fRæò6—¦–ær÷væW"à¤÷&–v–æÂÖ–â&W6—¦Ræ÷r66WG2ÖV7W&VBv–GF‚ö†V–v‡Bö6VDE"æBWFFW24ÔP§&VæFW&W"ö6ÖW&÷6VÆV7F–öâF—7Æ’âæWr6ÖÆÂf–Ww÷'B×6—¦–ær66†VGVÆW"6öÆW66W0¥&W6—¦Tö'6W'fW"Âv–æF÷r&W6—¦Rö÷&–VçFF–öâ÷vW6†÷rÂf—7VÅf–Ww÷'B&W6—¦RæB6VÖçF–0§FööÂ×6W76–öâG&ç6—F–öç2–çFòöæRg&ÖRâ7F'GW†2âFF—F–öæÂ6WGFÆ–ærg&ÖRà¥Væ6†ævVBö'6W'fW"F–ÖVç6–öç2æòÖ÷²Æ–fV7–6ÆRG&ç6—F–öç2&WVW7BöæR6ÖR×6—¦P¦6çf2&W–çBâ¦W&ò6—¦W2FVfW"ÂE"—26VC"ÂæòW"Ög&ÖRöÆÆ–ær÷7–çF†WF–0§&W6—¦RWfVçG2÷FV×÷&'“‚¦–vvÆRöf÷&6VF÷&–VçFF–öâ÷6V6öæB&VæFW&W"÷"–çWB÷væW"à¥F†—2föÆÆ÷w2&÷FF–öâw2&W6—¦R÷&W–çBF‚'WBW†7B•B6ö×÷6—F÷"fVÇB&VÖ–ç0§Vç&W&öGV6VC³“c"—2F&vWFVBÆ–fV7–6ÆR&W—"&WV—&–ærFWf–6RfVVF&6²à¤Ö–â6†ævW2ôäÅ’†VÇW"–×÷'BÂ&W6—¦RgVæ7F–öâæB&–æF–æs²–çFW&æÂÖ–â7F× §&WF–æVBâÖ–âÆöFW#“c"–çFVçF–öæÂã“cv—¦Öò&÷VæG2&WF–æVC²Ub÷–çBövVöÖWG'’ð¦†—7F÷'’Â&÷FV7FVD×VÇF“ãæBg&÷¦Vâ&VÆV6W2Væ6†ævVBâ&Wf–WvVB76WB6öçG&7@¦FG2W†7BÖ–î(i'f–Ww÷'B×6—¦–ær–×÷'C²6†VÆÂ÷&V6÷fW'’öÖ–â–ç3“c"à¥F‡&VR–çFVw&F–öç3¢÷&–v–æÂÖ–â&W6—¦R6ÆÆ&6²&W6W'fW2&VæFW&W"ö6ÖW&÷÷6—F–öã°§7F'GW÷6WGFÆVBÆ–÷WBö6öçF–æW"ÖöæÇ’&W6—¦RôE"ö6öÆW66–æröæð§öÆÆ–æs²6ÖR×6—¦RvW6†÷r÷6W76–öâö÷&–VçFF–öâ&W–çB÷¦W&ò×6—¦Rö6ÆVçWâfö7W6VCu52à¤gVÆÂ÷V&Æ–6F–öâWf–FVæ6RföÆÆ÷w2â&–÷#“c&ööbæB6Æ&–f–VB–çBF—&V7F–öâ&P¦–æ6ÇVFVB–âF†—2†æFöfbÂ7WW'6VFVB'’W‡Æ–6—C“cd”Â&÷fRà¤DUd”4S“c#¢&Vg&W6‚–âÄäE44Rv—F†÷WB&÷FF–öã²–ç7V7Bv†öÆR&–v‡BFööÆ&"ôö&¦V7@¤'&÷w6W"÷7FGW2âUbFööÇ>(i$VF—F÷.(i$&6²ô6Æ÷6RÂ÷&&—BFò&÷F‚6–FW2â–çN(i$FöæR6†V6·0¦Æ–æW2–æFWVæFVçFÇ’ÂF†VâÖ÷fRõ&÷FFRõ66ÆRæBVæFõ&VFòâ&W÷'B–b&÷FF–öâ—27F–ÆÀ¦æVVFVC²Fòæ÷B–æfW"FWf–6R52g&öÒFW7G2âFVfW"–çBÆ–÷WBÖ–w&F–öâVçF–Â7F&ÆRà ¢ã“c"F&vWFVBfÆ–FF–öã352ód”Âó6¶—‡ãã2“¢&öGV7F–öâ6—¦–ær66†VGVÆW"°¦Ö–â&W6—¦RÂ&VÆV6R6öçG&7BÂ÷&–v–æÃ“c&–ærwV&G2Ã“SB–6¶–ærÃ“S"Ubv÷&·76RÀ£“7GVÂ–çBö6÷&RæC“c''W6‚&F–Ââ7–çF‚6†V6·2Ö–âö†VÇW"72â&–÷"gVÆÀ§'Vâv2–çFW''WFVBæBFV×÷&'’ÆörVæf–Æ&ÆS²æògVÆÃ“c"6÷VçB6Æ–ÖVBà¥W6W"6·2v‡’'V–ÆG26Æ÷s¢fö–B&Æö6¶–ær†æF÷fW"öâGWÆ–6FRÆö6Â¶†÷7FVBgVÆÀ§7V—FRf÷"æ'&÷r6†ævW3²'Vâ&VÆWfçB6†V6·2æBfW&–g’FWÆ÷–ÖVçBÂ&W÷'B†÷7FV@¦gVÆÂ×7V—FR7FGW267W&FVÇ’âv—D‡V"7F–ÆÂ'Vç2gVÆÂ&Vw&W76–öâWFöÖF–6ÆÇ’à ¢ã“c"V&Æ—6†VB'VçF–ÖS–36C##sSs#SVCSƒ&#–FSc3#sCcvFCƒ3#“s&CC²W†7BWÆöFV@¦æBÆö6ÂFW7FVBG&VVcCff6&#s##sV6#cv363SSƒcf#fSS3“6âvW3C“Ss“#0¦'V–ÆBöFWÆ÷’5T44U53²6†ævVB6†VÆÂ÷fW'6–öâöÖ–â÷6—¦–ær†VÇW#BóBÆ—fR'—FRÖÖF6‚à¥F†—'G’&VÆWfçB6†V6·253²æògVÆÃ“c"726÷VçB6Æ–ÖVBâ†÷7FVBgVÆÂ&Vw&W76–öà£C“SsSCb–â&öw&W72B†æF÷fW#²æ÷B&Æö6¶–ærFWf–6R&WFW7Bã“cW6W"d”À§&V6÷&FVBÂ÷'G&—N(i&ÆæG66Rv÷&¶&÷VæB—2F–væ÷7F–2öæÇ’âDUd”4S“c"g&W6‚ÖÆæG66P¦ÆöBõUbÖVçG'’÷&WGW&âö÷&&—B÷&–v‡BFööÆ&"´ö&¦V7G2·7FGW2&WFW7B&WV—&VBâ–çB&F–À§&VFW6–vâ&VÖ–ç2Fö7VÖVçFVBF—&V7F–öâÂæ÷B6†—VBâæòFWf–6S“c"52–æfW'&VBà  ¢22ã“c2(	BfÆöF–ær–çB&F–ÂæB6öçFW‡GVÂ6öçG&öÇ3²ã“c"52(	B#Bö7Fö&W"##` ¥W6W"6öæf—&×2ã“c"53²&÷FV7Bg&W6‚ÖÆæG66Rf–Ww÷'B6—¦–ærÂUbv÷&·76R&WGW&âÀ¦÷&&—Bf—6–&–Æ—G’æB–çBFöæR&VæFW&–ærâ6†—F†R6Æ&–f–VB–çB–çFW&7F–öâW6–æp§F†RW†—7F–ærf–Ww÷'B–çFW"æB÷&–v–æÂÖ–â&6¶w&÷VæBÖ†öÆB÷væW"âF†RfÆöF–æp§&F–ÂöffW'2''W6‚ôf–ÆÂôW&6W"õ6×VFvRô&ÇW"ÇW2Æ–W'2ôÖ6²ô–ÖvRôòõFW‡GW&RvW2à¤6†ö÷6–ærâ—FVÒ6Æ÷6W2F†R&F–Ã²F†R÷&–v–æÂ–çFW"6öçG&öÇ2V"–â6ö×7@§F÷Ö6VçG&R6öçFW‡GVÂæVÂâ†öÆF–ærV×G’&6¶w&÷VæB&V÷Vç2F†R–çB&F–ÂâVæ6–À§7G&ö¶W2Âf–ævW"æf–vF–öâÂVæFòõ&VFòÂ&W6÷W&6RÂòæB–ÖvRÆ6VÖVçB6öçF–çVRF‡&÷Vv€¦÷&–v–æÂ÷væW'2â–çB†öÆB—2ÆÆ÷vVBöæÇ’v†–ÆR–FÆR†æò7G&ö¶Rö–ÖvRôò&Wf–Wr“²F†P¦÷&–v–æÂ†öÆB6æ6VÇ2öâÖ÷fVÖVçBÂ×VÇF—F÷V6‚Âö–çFW"6æ6VÂ÷"6W76–öâ6†ævRà¥–çB6WGF–æw2W6RF†R6†&VBæVÂ÷6—F–öâ÷væW"v—F‚6ö×7B÷F–öã²÷F†W"÷W ¦Æ–÷WG2&VÖ–âVæ6†ævVBâ•BF7F–ÆR66WFæ6R&VÖ–ç2VæF–ærà ¢Ò–çB&F–Ã¢FööÂæB6öçFW‡GVÂ×vR6†ö–6W26Æ÷6RF†RfÆöF–ær&F–Ã²–FÆRV×G’Ö&6¶w&÷VæB†öÆB&V÷Vç2—C²Ö÷fVÖVçBÂ–çF–ær6öçF7BÂæf–vF–öâæB×VÇF—F÷V6‚Fòæ÷B&V÷Vâ—Bà  ¢22ã“cB(	BÆVgB6–FR6ö×7B–çB6WGF–æw3²W6W"F—&V7F–öâ(	B#Rö7Fö&W"##` ¥W6W"&WVW7G2–çB6öçFW‡GVÂ÷W2BÄTeB&V6W6RF÷Ö6VçG&R6WGF–æw2ö'7G'V7BF†Rf–Ww÷'Bâ¶VWF†RfÆöF–ær&F–ÂæBW†—7F–ær–çFW"ö6öçG&öÂ÷væW'2g&öÒã“c2â&WW6R6†&VB÷6—F–öâ÷væW"v—F‚6ö×7BÆ–÷WC²6WB–çB†÷7B‡‚g&öÒÆVgB÷F÷Âv–GF‚6VBC3#‚Âf–Ww÷'BÖ†V–v‡B67&öÆÂâ&VGV6Rv2ÖöFW7FÇ’v†–ÆR&W6W'f–ær&VF&ÆRÆ&VÇ2æBÖ–æ–×VÒF†V–v‡G2â÷F†W"FööÂ÷W2&WF–âF÷Ö6VçG&RÆ6VÖVçBâDUd”4S“cC¢''W6‚ô&ÇW"ÆVgBÆ6VÖVçBÂ76–ærÂ&F–Â†öÆB÷&V÷VâÂVæ6–ÂÂf–ævW"æf–vF–öâÂVæFõ&VFòÂ6öçFW‡GVÂvW2æBFöæRâæW‡C¢ö'F–â•B66WFæ6Röb&F–Â²ÆVgB÷W&Vf÷&RÖ÷&R6öçG&öÇ3²F†Vâ&–÷&—F—¦Rf6Vw&÷W–çF–ærà ¢Ò–çB6öçFW‡GVÂæVÇ2&VÖ–âæ'&÷rÂ67&öÆÆ&ÆRæBöâF†RÆVgC²76–ær7F—26öÖf÷'F&ÆRæB&F–Â†öÆBfÆ÷rv÷&·2à  ¢22ã“cR(	B–çBv÷&¶fÆ÷ræBT’Wf–FVæ6R(	B#Rö7Fö&W"##` ¥W6W"ã“cB5266WG2ÄTeB6ö×7B–çB÷WÂ'WB&V7W'&–ær–æ7F—fR&–v‡B×6–FRT§&VÖ–ç2õTââFòæ÷B–æfW"&VæFW&–ær&W—&VBâ7W'&VçB&WVW7FVBT“¢&÷GFöÒUb”å@¦&W6–FR4TÄT5C²æF—fRUbfÆ–FF–öâ&Vf÷&RVçG'“²÷&–v–æÂö&¦V7B&F–Â–çB6V7F÷ §&VÖ÷fVBâf–ÆR¶VW2æòGWÆ–6FR'WGFöâöæ6R&÷GFöÒ&"—2&VG’âÆ–W'2æ÷rÇv—0§f—6–&ÆRBF÷Â6VÆV7FVB6öçFW‡GVÂ6WGF–æw2&VÆ÷râ&F–Â6†ö–6W27F’f—6–&ÆRVçF–À¥Væ6–Â&Vv–ç2fÆ–B7W&f6R7G&ö¶Rö–ÖvRvW7GW&S²'&÷w6–ær6†ö–6W2FG2æò†—7F÷'’à¥&WVFVB–çBVçG'’&V÷Vç2FööÇ3²V×G’&6¶w&÷VæB†öÆB&WW6W2Ö–âw26–ævÆRF–ÖW §v—F‚W‡Æ–6—B–çB&6¶w&÷VæBöÆ–7’Â'—76–ærÖöFVÆÆ–ær†—B&÷†–W2âFöæRW†—G3°¤W66R6æ6VÇ2Æ—fR6öçF7Bv—F†÷WBÆVf–ær–çC²6ö×WF–ærFööÂÆVæ6‚—2&VgW6VBà¤–çfÆ–BöFVÆWFVBvVöÖWG'’Ö’7F–ÆÂ6Æ÷6Rf÷"&W6÷W&6R6fWG’à ¥6×VFvRVF—Bf÷VæB&÷VæFVB„Ò×v÷&²wV&BF‡&WræB6æ6VÆÆVBfÆ–B7G&ö¶R—†VÇ2à¤wV&Bæ÷rW6W2FF—F–öæÂF'2B6æBW‡÷6W2Æ–gB×FòÖ¶VW7FGW3²Æ–gF–æp¦6öÖÖ—G2F†RfÆ–B&Vf—‚æ÷&ÖÆÇ’â6æ6VÆÆF–öâö6†V6·ö–çB&VgW6Â7F–ÆÂ&W7F÷&Rà¤æòVæ&÷VæFVB&7FW"v÷&²÷"6†ævVB6âÖ6—¦R&WÆ6W2Ö&–wV÷W2FW‡GW&R6F–öã ¦6öÆ÷W"&W6öÇWF–öâöÆVv7“S"×Fó#BVæÆ&vVÖVçBÂæ÷B''W6‚à ¤f–ÆR(i"T’FV'VrW‡FVæG2÷&–v–æÂ÷BÖ–âvW7GW&RFV'Vs¢&÷VæFVCWfVçG2Â&–v‡B×6–FP¦†—B×FW7B7F6·2Â&÷VæG2÷7G–ÆW2÷f—6–&–Æ—G’Â6çf2÷f—7VÅf–Ww÷'BÂ6W76–öâÂW'&÷'2æ@¦6öçFW‡BÆ÷72â6GW&R&W÷'BF†Vâ6÷’&W÷'BgFW"–æ7F—fRT’ö67W'3²fÆrW'6—7G0§F‡&÷Vv‚&Vg&W6‚âF–væ÷7F–2&VG2æBÆ—7FVæW'2æWfW"6öç7VÖR–çWBâW†7B•Bf–ÇW&P¦æ÷B&W&öGV6VC²FV'VrÖöFRvF†W'2Wf–FVæ6RÂFöW2æ÷B6Æ–Ò6ö×÷6—F÷"&W—"à ¤DUd”4S“cS¢æòÕUbö&¦V7B&VgW6W2–çC²Ubö&¦V7B÷Vç2g&öÒ&÷GFöÒâ–ç7V7BF÷Æ–W'0¦æB6WGF–æw2&VÆ÷rÂ'&÷w6R&F–Â6†ö–6W2F†VâVæ6–Â–çB†–FW2—C²&6¶w&÷VæB†öÆ@§&V÷Vç2âÆöær6×VFvRöÆ–gB¶VW2—†VÇ2âf–ævW'2õVæFõ&VFòæBFöæRâVæ&ÆRT’FV'VrÀ§&W&öGV6R&–v‡B×6–FRf–ÇW&RÂ6GW&R&W÷'B(i"6÷’&W÷'BæB6VæB&W÷'Bà  ¢ã“cRfÆ–FF–öã¢gVÆÂÆö6ÂæöFS#B7V—FS#ƒ52ód”Âó6¶—VBƒ“ã2“°¦fö7W6VB&öGV7F–öâõT’ö†öÆBöFV'Vrõ6×VFvRæB&VÆV6R6†V6·276VBâ&Wf—6VBöÆBFW7G0¦öæÇ’v†W&RW6W"ÖF—&V7FVBT’6†ævVB‡&F–ÂW'6—7FVæ6RÂ66Æ"ÖÆ–W"f—6–&–Æ—G’À§&VÖ÷fVBö&¦V7B–çB6V7F÷"“²&WF–æVB&7FW"6æ6VÂ÷&VgW6ÂæB&÷FV7FVBv—¦Öð¦&÷VæG2öæf–vF–öâ76W'F–öç2âöÆBf—†VCs3"6†&VBÖFö6²–â76W'F–öâæ÷rW6W2&Wf–WvV@¦66†R6öçG&7C²æVvF—fR&6¶w&÷VæBFW7B×WFFW2$õD‚æF—fR†öÆB'&æ6†W3²FV'Vp¦f—‡GW&R&W6W'fW2×VÇF—ÆRö'6W'fW'2æBW†—7F–ær'VçF–ÖRÖW'&÷"W‡G&7F–öâ&÷VæF'’à¢ã“cB&VæFW&–ær—77VR&VÖ–ç2õTã²FV'Vr&W÷'B—2F–væ÷7F–2Wf–FVæ6RÂæ÷Bf—‚à¥'VçF–ÖRV&Æ–6F–öâæB†÷7FVB4’&ööb&RfW&–f–VB6W&FVÇ’gFW"F†—26öÖÖ—Bà  ¢22ã“cb(	B6öçF–çV–ær6×VFvR–çWBv–æF÷w3²7F'GWFööÆ&"Wf–FVæ6R(	B#Rö7Fö&W"##` ¥W6W"ã“cR52&÷FV7G2&÷GFöÒ–çBVçG'’ÂW'6—7FVçB&F–ÂÂÆ–W'2Öf—'7BÄTe@§6WGF–æw2æB¶WB6×VFvR—†VÇ2âW6W"&W÷'G26×VFvR7F–ÆÂ7F÷2gFW#^(	3b76W2à¤÷&–v–æÃ„Ò&7FW"v÷&²6v26öçF7B×v–FS²&VæWrôäÅ’—G2v÷&²6÷VçFW'2W"æF—fP¥6×VFvR–çWB6×ÆRÂ&WF–æ–ær&Vf÷&R6æ6†÷Bö6÷fW&vR÷–6·WöF—'G’—†VÇ2â&÷VæFV@§6×ÆRÖ’W6RF'2ÂæW‡B–çWB&W7VÖW2âB÷&–v–æÃ#F‚ÖF"6Â&W6VVB6ÖP¦÷&–v–æÂF‚÷væW"g&öÒÆ7B67&VVâ–çWBv†–ÆR&WF–æ–ærF†R&7FW"6öçF7Bâæð¦W‡G&6†V6·ö–çG2÷"Æ–W"f–æ—6‚VçF–Â‡—6–6ÂÆ–gC¢VæFò&VÖ–ç2öæR7G&ö¶Rà¤6æ6VÂö6†V6·ö–çB&VgW6Ç2&WF–âFöÖ–2&öÆÆ&6²â''W6‚ôf–ÆÂôW&6W"ô&ÇW"Væ6†ævVBà ¥W6W"7WÆ–VBã“cRFV'Vr&W÷'Bg&öÒ&Vg&W6‚f–ÇW&S£3cl9sƒƒbÂ6çf33cl9sƒ#d552ð£#s3,9scS'—†VÇ2DE#"Â–çFfÇ6R÷6W76–öæçVÆÂö6öçG&öÇ6Væ&ÆVC²6×ÆVB&–v‡B4åd0¦6öçF7G2&V6‚v–æF÷r'V&&ÆRâæò'&öB÷fW&Æ’–âF†÷6R6çf26×ÆW2âF†—2FöW2äõ@§&÷fRFööÆ&"†—BFW7F–ær÷"6ö×÷6—F÷"–çF–ær†VÇF‡“¢÷&–v–æÂw&–B7F'G5“s¦&VÆ÷sc‚†VFW"æBöÖ—GFVBçF÷Ö7F–öç2÷&–v‡B'WGFöâ&V7G2âW6W"6öæf—&×2&Vg&W6€¦6âVçFW"f–ÆVB7FFRF—&V7FÇ’âW‡FVæBW†—7F–ærFV'Vr&W÷'Bv—F‚W†7B&–v‡BÖ'WGFöà§&V7B÷7G–ÆW2öF—6&ÆVBöW‡æFVBö6VçG&R†—B7F6·3²6GW&RF†W6RöâW'6—7FVBÖFV'Vp§7F'GW÷vW6†÷röÆ–fV7–6ÆRæBFööÆ&"6Æ–6²âæò&ö÷B6W6R÷"&VæFW&–ærf—‚6Æ–ÖVBà ¤DUd”4S“cc¢Æöær&WVFVB6×VFvR76W2VæFW"öæRVæ6–Â6öçF7B6öçF–çVS²Æ–gB¶VW0§&W7VÇBÂôäRVæFòõ&VFò&W7F÷&W2v†öÆR6öçF7BÂ6æ6VÂ&W7F÷&W2&RÖ6öçF7BâÆÂã“cP¥T’fÆ÷r&VÖ–ç2âVæ&ÆRT’FV'VrÂ&Vg&W6‚F—&V7FÇ’–çFò&–v‡Bf–ÇW&RÂ6GW&Rô6÷¦æWr&W÷'B6öçF–æ–ær6öçG&öÇ2æB7F'GWWf–FVæ6S²FffV7FVB&–v‡B'WGFöâf—'7@¦–b&7F–6ÂâW†7BFööÆ&"&ö&RF—7F–æwV—6†W2öfg67&VVâöF—6&ÆVBöö66ÇW6–öâg&öÐ¤DôÒÖ†VÇF‡’'WBf—7VÆÇ’'&ö¶VâT“²æF—fR•B&VæFW&–ærvFR&VÖ–ç2õTâà  ¢ã“cbfÆ–FF–öã¢gVÆÂÆö6ÂæöFS#B7V—FS#ƒ252ód”Âó6¶—VBƒ“Rã2“°¦fö7W6VB6×VFvRövW7GW&RõT’öFV'VrôÆ"÷&VÆV6SC52âæWr6†V6·2&÷fR&VæWvVBv÷&°§v–æF÷w2&WF–â—†VÇ2æB6æ6VÆÆF–öâ&6VÆ–æS²Æöær7GVÂ7W&f6R×–6¶VB6×VFvP§76W2÷&–v–æÃ#F‚'VFvWBÂVF—G2ÆFR—†VÇ2æB6öÖÖ—G2ôäRVæFòõ&VFòVçG'“°§&–v‡BFööÆ&"6VçG&R&ö&W2–æ6ÇVFR†VFW%“3æBW'6—7B–âvW6†÷rWf–FVæ6Rà¥&–÷"ã“cR†÷7FVB&Vw&W76–öãCƒ#cC‚†2æ÷r6ö×ÆWFVB5T44U52âW†7B7WÆ–V@§&Vg&W6‚&W÷'Bö'6W'fF–öç2&R&6†—fVB–âFö72÷V’ÖFV'Vr×&Vg&W6‚Ó“cR×&W÷'BæÖBà¥&–v‡B×6–FRæF—fR•Bf–ÇW&R&VÖ–ç2õTã²æò&VæFW&–ærf—‚–æfW'&VBà  ¢22ã“cr(	B6çf2õT’6ö×÷6—F–öâ&÷VæF'“²ã“cb–çf—6–&ÆR6Æ–6¶&ÆR6öçG&öÇ2(	B#Rö7Fö&W"##` ¥W6W"&W÷'G2&–v‡B6öçG&öÇ2&VÖ–â6Æ–6¶&ÆRv†–ÆRf—7VÆÇ’'6VçC²7v—F6†–ærv§Fò6†DuBæB&6²&W7F÷&W2V&æ6RâW†7Bã“cb&W÷'C£##£…¢6†÷w2&–v‡@¦'WGFöç2öâ×67&VVâöVæ&ÆVB÷f—6–&ÆRö÷6—G“ÂæòG&ç6f÷&×2öf–ÇFW'2ö6Æ—F‡2ÂW†7@¦'WGFöâõ5dr†—B7F6·3²VæFò6Æ–6²&V6†W2v–æF÷r'V&&ÆRâ–çFfÇ6R÷6W76–öæçVÆÂà¥7F'GWFööÆ&"w&÷w2g&öÓ3BãSg‚v–FRCCS–×2Fó3rãc‚CcC–×2Âv—F‚6÷'&V7@¦Æ–÷WB'WB&W÷'FVB–çf—6–&ÆR—†VÇ2âWf–FVæ6Rö–çG2Fò–çF–ærö6ö×÷6—F–ærÂæ÷@§&VÖ÷fVBT’Âöfg67&VVâÆ–÷WBÂF—6&ÆVB6öçG&öÇ2÷"'&öB–çWB–çFW&6WF–öââF†—0¦—2â–æfW&Væ6RÂäõBÆö6ÆÇ’&W&öGV6VBvV$¶—BÖVæv–æRF–væ÷6—2à ¥F&vWFVB&W—"–â÷&–v–æÂ7G–ÆW6†VWC¢f–Ww÷'Ew&—6öÆFVB7F6²G£Â÷&–v–æÀ¦6çf2&÷VæFVB'’6öçF–ã§–çBv—F‚—G2÷vç£²†VFW"&VÖ–ç7£&÷fRf–Ww÷'Bà¤†VFW"÷7FGW2ôö&¦V7B'&÷w6W"vWB—6öÆFVB6ö×÷6—F–ær†–çG2f–v–ÆÂÖ6†ævS¦÷6—G’À§v—F†÷WBG&ç6f÷&×2Â÷6—G’6†ævW2Â6Æ—–ærT’ÖVçW2÷"&W&VçF–ærç’6öçG&öÂà¥d”Urf—†VB÷W&VÖ–ç2f–Ww÷'B×&VÆF—fS²fÆöF–ærFööÇ2&WF–âF†V—"÷vâ÷væW'2à¤÷&–v–æÂf–Ww÷'B×6—¦–ær66†VGVÆW"æ÷r6öÆW66W2fö7W2æBf—6–&ÆRÖFö7VÖVçBWfVçG0§F‡&÷Vv‚4ÔR&W6—¦R÷&W–çB÷væW#²†–FFVâÖFö7VÖVçBWfVçG2Fòæ÷B&VG&râFV&F÷và§&VÖ÷fW2&÷F‚Æ—7FVæW'2âæò7–çF†WF–2&W6—¦RÂW"Ög&ÖRöÆÆ–ærÂDôÒ†–F–ærÂ&VÆöBÀ¦æWr&VæFW&W"ö†—7F÷'’ö–çWB÷væW"÷"ÖöFVÆÆ–ær÷–çB6†ævW2âFV'Vr6æ6†÷B&V6÷&G0¦6öçF–âö—6öÆF–öâ÷v–ÆÂÖ6†ævR6òã“crÆ–W"'VÆW26â&RfW&–f–VBöâFWf–6Rà ¢ã“cR–çBT’52&÷FV7FVC²ã“cb6öçF–çV–ærÕ6×VFvR66WFæ6R&VÖ–ç26W&FRà¤DUd”4S“cs¢&Vg&W6‚–âÆæG66R&WVFVFÇ’ÂfW&–g’ÆÂ&–v‡B'WGFöç2÷7FGW2æ@¤ö&¦V7B'&÷w6W#²–çFW&7B&Vf÷&R6†æv–ær2ÂVçFW"öW†—BUbVF—F÷"æB–çBÀ§&÷FFRö÷&&—Bâ7v—F6‚v’ö&6²fW&–f–W2&V6÷fW'’FöW2æ÷BÆ÷6RT’÷v÷&²â–b–çf—6–&ÆP¦6öçG&öÇ2&V7W"ÂVæ&ÆRT’FV'Vr&Vf÷&R&Vg&W6‚æB6VæB6GW&Rô6÷’&W÷'BÇW0§67&VVç6†÷B–b&7F–6Ââ&W—"&VÖ–ç2â•BvFRVçF–ÂW‡Æ–6—BfVVF&6²à  ¢ã“crfÆ–FF–öã¢gVÆÂÆö6ÂæöFS#B7V—FS#ƒR52ód”Âó6¶—VBƒ“2ã—2“°¦fö7W6VB&VÆV6R÷6—¦–ærõUbõ–çBöFV'Vr6†V6·3C52âæWr6÷fW&vR6†V6·2fö7W2÷f—6–&ÆP§&WGW&â6öÆW66–ærÂ†–FFVâÖFö7VÖVçB&VgW6ÂæBF—7÷6Ã²6çf26öçF–æÖVçBæ@§VçG&ç6f÷&ÖVB÷Væ6Æ—VBd”Ur÷W6öçG&7B&WF–æVBâÆö6Â6‡&öÖ—VÒÆ–÷WB6Öö¶P§v2GFV×FVB'WBF†R–ç7FÆÆVBÆ—w&–v‡B6¶vR†2æò'&÷w6W"W†V7WF&ÆR†W&S°¦æò&VæFW&VBÖ'&÷w6W"÷"æF—fRvV$¶—B&ööb6Æ–ÖVBâW6W"w2ã“cb&W÷'B—2&6†—fV@¦–âFö72÷V’ÖFV'VrÖ–çf—6–&ÆRÖ6öçG&öÇ2Ó“cbæÖBâFWf–6Rf—7VÂvFR&VÖ–ç2õTâà  ¢22ã“cr&÷FV7FVBW6W"52(	B#Rö7Fö&W"##` ¢Ò·…ÒW6W"U$dT5Bò53¢&–v‡B6öçG&öÇ2&VÖ–âf—6–&ÆRgFW"ÆæG66R&Vg&W6‚æBT’G&ç6—F–öç3²&WF–âã“cr6çf2õT’—6öÆF–öâæBf—6–&ÆR×vR&W–çB÷væW"à¢Ò²ÒgWGW&R–6öâ'V–ÆG3¢&Wf–WrF‡&VRf—7VÂ6æF–FFW2W"FööÃ²–ç7FÆÂöæÇ’&Vf–æVBW6W"6VÆV7F–öç2Âv—F‚–6öâ&÷fR6ÖÆÂf—6–&ÆRF—FÆRâ&W6W'fR÷&–v–æÂ7F–öâF&vWG2Â&F–Â÷6—F–öç2ÂF÷V6‚F&vWG2æB†—7F÷'’övW7GW&R÷væW'6†—à ¥Æææ–ærWFFRöæÇ“¢'VçF–ÖRã“crVæ6†ævVC²æòæWr†æG2ÖöâFW7B&WV—&VBà ¢22&F–Âf—7VÂ6VÆV7F–öâ6†VWG2c6ö×ÆWFR(	B#Rö7Fö&W"##` ¤FW6–vâ&Wf–WröæÇ“²'VçF–ÖR&VÖ–ç2ã“crv—F‚&÷FV7FVBW6W"U$dT5Bõ52âÆÃcP§6VÖçF–2FööÇ2æ÷r†fRD…$TR÷&–v–æÂfV7F÷"6æF–FFW3£“R5dw2öã6†VWG2à¤FVÆ—fW&VB&÷„Æ"Ô–6öâÕ6VÆV7F–öâçFbÂ&÷„Æ"Ô–6öâÕ&Wf–Wræ‡FÖÂæ@¤&÷„Æ"Ô–6öâÕ&Wf–WrÕ6²ç¦—…Dbô…DÔÂõär6†VWG2õ5dw2öÖæ–fW7B÷&V'V–ÆB6÷W&6R’à¤æòFVfVÇB÷W6W"–6öâ6VÆV7F–öç3²v—BFööÂÖæÖR²ô"ô26†ö–6W2ÂF†Vâ&Vf–æR&Vf÷&P¦–ç7FÆÆF–öââ6†&VB7–Ö&öÇ2&WF–æVB–âöæR&Wf–Wr&÷s²fW'FW‚ôö&¦V7B¦ö–â6W&FRà¥6VRFö72÷&F–ÂÖ–6öâ×&Wf–Wr×cæÖBâæòæWrFW7B÷"'VçF–ÖR&VÆV6RæVVFVBà ¢22ã“c‚f6R–6öâFWf–6R&Wf–Wp ¢Ò·…Òf6R&F–Â6†÷w3#2&ööc2–6öç2v—F‚÷&–v–æÂ6ÖÆÂ6F–öç3²ÆÂFööÇ2&÷WFRVæ6†ævVBà¢Ò·…ÒW‡G'VFRC"æB&WfVÂC3²–6öâ&VF2ÆVæ6‚÷&–v–æÂFööÃ²Væf–Æ&ÆR7FFW2&VÖ–â6ÆV"à¢Ò·…Ò–ææW"ö÷WFW"–6öç2&VÖ–âÆVv–&ÆRöâ•C²æf–vF–öâÂ†—7F÷'’æBã“cr&–v‡B×FööÆ&"f—6–&–Æ—G’&W6W'fVBà ¢22ã“c’fW'FW‚–6öâFWf–6R&Wf–Wp ¢ã“c‚f6R–6öâ&Wf–WrW‡Æ–6—FÇ’52öã#bö7Fö&W###bà ¢Ò·…ÒfW'FW‚&F–Â6†÷w3B6VÆV7FVB&ööc2–6öç2v—F‚6ÖÆÂ÷&–v–æÂ6F–öç2æBF—7F–æ7BfW'FW‚¦ö–âà¢Ò·…Ò÷&–v–æÂ÷6—F–öç2ö7F–öç2Âf–Æ&ÆRöF—6&ÆVB7FFW2Â'V–ÆBVFvRõ6Æ–FRô&WfVÂ6W76–öç2æBVæFõ&VFò&VÖ–âW6&ÆRà¢Ò·…Òæf–vF–öâ÷&–v‡B×6–FRT’&W6W'fVC²66WFVBf6R–6öç2Væ6†ævVBà ¢22ã“sö&¦V7B–6öâFWf–6R&Wf–Wp ¢ã“c’fW'FW‚–6öâ&Wf–WrW‡Æ–6—FÇ’52öã#bö7Fö&W###c²ã“c‚f6R52&WF–æVBà ¢Ò²Òö&¦V7B&F–Â6†÷w32&÷fVB–6öç2æB6ÖÆÂ6F–öç3²ö&¦V7B¦ö–âF–ffW'2g&öÒfW'FW‚¦ö–âà¢Ò²ÒÆöævW"Æ&VÇ2f—C²GWÆ–6FRõVæFõ&VFòÂ'&’õ6öÆ–F–g’æBUbôÖW6‚†VÇF‚ÆVæ6‚W†—7F–ær÷væW'2à¢Ò²Ò×VÇF’Âæf–vF–öâæB&–v‡BFööÆ&"&VÖ–âW6&ÆS²f6RõfW'FW‚66WFVB–6öç2Væ6†ævVBà ¢22ã“s'&’²&–v‡BT’FWf–6RvFP ¢Ò²ÒFVfVÇBUb7V&R÷&F–æ'’'&’7V66VVG2v—F‚–æFWVæFVçBUb6÷–W2ÂöæRVæFõ&VFòVçG'’æB6fT÷Vâà¢Ò²ÒÆ—fR'&’æF—fRUg27W'f—fR6÷VçBVF—G2÷&V÷Vâô6öçfW'BõVæFõ&VFòæB6fT÷Vâv—F†÷WB&W&ö¦V7F–öâà¢Ò²Ò–çB÷7FÆRUg2&VgW6R&Vf÷&R6†ævW3²–æFWVæFVçBÖ6÷’f–ÇW&RÆVfW2æò'F–Â66VæRà¢Ò²Ò&–v‡BFööÆ&"&VÖ–ç2f—6–&ÆRgFW"&Vg&W6‚Â'&’ô6æ6VÂôFöæRæBæf–vF–öã²ã“s&V7W'&Væ6RõTâVçF–ÂFWf–6RfVVF&6²à ¢22ã“s"Æ–âT’&VæFW&–ærFWf–6RvFP ¥W6W"'&““sv÷&·2õ53²&–v‡BT““sd”Â&VÖ–ç2–æFWVæFVçBà ¢Ò·…Ò÷&F–æ'’æBÆ—fR'&““s66WFVB'’W6W"Ž(	Ä'&’æ÷rv÷&·>(	Ò’à¢Ò²ÒÆ–â÷VRT’¶VW2ÆÂ&–v‡B6öçG&öÇ2f—6–&ÆRöâ&WVFVBÆæG66R&Vg&W6‚Â&Vf÷&R7v—F6†–ærà¢Ò²Òö&¦V7B'&÷w6W"õd”UrõUbVF—F÷"ô'&’G&ç6—F–öç2æBæf–vF–öâ&WF–âf—6–&ÆRT’æBVæ6†ævVB†—BF&vWG2à¢Ò²ÒF—6&ÆVBö7F—fR6öçG&öÇ2&VÖ–â6ÆV"f–÷&–v–æÂ÷6—G’Â&÷&FW'2æB7G&ö¶RfVVF&6²à ¢22ã“s2÷BÖ–â6çf2F–væ÷7F–2FWf–6RvFP ¢ã“s"f—7VÂfVÇBW'6—7G2v—F‚Æ–â&öf–ÆRfW&–f–VC²'&““sW6W"52&WF–æVBà ¢Ò²ÒGW&–ærf–ÇW&S¢†–FS4BöæÇ’Âö'6W'fR&–v‡BFööÆ&"Â&V6÷&Bf—6–&ÆRöÖ—76–ærv—F†÷WB7v—F6†–ærà¢Ò²Ò6†÷s4B&W7F÷&W26çf2öÖöFVÃ²æ÷FRv†WF†W"&–v‡BT’f–Ç2v–âà¢Ò²Ò6÷’&W÷'B–æ6ÇVFW26çf2×&ö&RÖö'6W'fF–öâæB&W7F÷&VB7FFRà¢Ò²ÒFV'Vröfb÷vV†–FRÇv—2&W7F÷&W2&–÷"6çf2f—6–&–Æ—G“²æò66VæRö†—7F÷'’6†ævW2à ¢22ã“sBVFvR–6öâFWf–6R&Wf–Wp ¥W6W"&W÷'G26ææ÷B&W&öGV6R&–v‡Bf—7VÂfVÇB7W'&VçFÇ“²–6öâ&öÆÆ÷WB&W7VÖV@¦'’W‡Æ–6—B–ç7G'V7F–öââ–çFW&Ö—GFVçBfVÇBæ÷BÖ&¶VBf—†VC³“s2&ö&R&WF–æVBà ¢Ò·…ÒÆÃ#VFvR–6öç2ÖF6‚&ööc2Â6ÖÆÂF—FÆW2f—BæB÷WFW"F&vWG2Fòæ÷B÷fW&Æà¢Ò²ÒW‡G'VFS"ô&WfVÃ2æB÷&–v–æÂFööÂ7F–öç2öF—6&ÆVB7FFW2&WF–æVBà¢Ò²Ò6Æ–FRô&WfVÂôÆö÷ô7WEUbõ7F—F6…UbõVæFõ&VFòæBæf–vF–öâ&VÖ–âW6&ÆRà¢Ò²Òf6RõfW'FW‚ôö&¦V7B–6öç2æB'&’52Væ6†ævVC²vF6‚&–v‡BT’f—6–&–Æ—G’à ¢22ã“sRv÷&ÆB×ÆæRW‡G'VFRG0 ¥W6W"ã“sB–6öç253²ã“sRgVæ7F–öæÂvFR6W&FRà ¢Ò²Ò&÷F‚VFvRõfW'FW‚W‡G'VFR6†÷r÷&–v–æÂ…’õ…¢õ•¢ÆæR7V&W2Â6VÆV7F–öâ†–v†Æ–v‡BæBæÖVB×ÆæR&FvRà¢Ò²Òv÷&ÆB…’†öÆG5¢õ…¢†öÆG5’õ•¢†öÆG5‚GW&–ærG&rÂW†7BæB&WVC²&&—G&'’f–Wr÷&–VçFF–öâ7W÷'FVBà¢Ò²Ò6VçG&Tg&VRæB…•¢'&÷w2&VÖ–âVæ6†ævVC²FöæRö6æ6VÂõVæFõ&VFòöæf–vF–öâ&W7F÷&Ræ÷&ÖÆÇ’à¢Ò²Ò&ÆÆVÂ×f–Wr&VgW6Ç2Fòæ÷B×WFFRÖW6‚ö†—7F÷'’÷"ÆVfR6GW&VB–çWC²÷&&—BF†Vâ&WG'’à  ¢22ã“sb(	B&V6öææV7B&VG’VFvR'&–FvR6VÆV7F–öç2(	B#bö7Fö&W"##` ¤VF—BÖ–ãƒ&FfBö'V–ÆC“sRâW6W"7WÆ–W267&VVç6†÷C“sRæBW†7BVFvRf–Âƒ’æö& ¢ƒ#BfW'F–6W2óBVG2“²&WF–âVæ6†ævVBf—‡GW&RFW7G2öf—‡GW&W2öVFvRÖ'&–FvRÓ“sbæö&¢à¥F†R†–v†Æ–v‡FVB&÷VæF'’—"—2ô$¢fW'F–6W3>(	3æC#>(	3#B‡'VçF–ÖRVFvW3"ó3R’à¤&÷F‚†fRöæRf6R÷væW"âW†—7F–ærgVÆÇ’–ç7FÆÆVB÷Vâ6†–â'&–FvR66WG2F†R—"À¦7&VFW2VE³2Ã#2Ã#BÃÒ„ô$¢öæRÖ&6VB’æB76W2÷&–v–æÂF÷öÆöw’fÆ–FF–öâà¥&F–ÂwV–FVB6W76–öãcsb–æ6÷'&V7FÇ’66WFVBôäÅ’öæR6ö×ÆWFR&÷VæF'’Æö÷–à¦6å7F'Bö÷Väg&öÔ‡V"ÂF—66öææV7F–ærÇ&VG’×7W÷'FVB&VG’—'2â&W—"4ÔP§6W76–öã¢FVÆVvFR&VG’×—"VÆ–v–&–Æ—G’FòW†—7F–ær'&–FvTVFvU6VÆV7F–öä–æfòÂ&WF–à§6–ævÆRÖÆö÷wV–FVBVçG'’Â7–æ2Ç’–ÖÖVF–FVÇ’Â6†÷r&VG’7FGW2â÷&–v–æÂT’À§F÷öÆöw’Âv–æF–ær÷VÆ—G’÷G&ç67F–öâwV&G2æB†—7F÷'’÷vâÇ’Væ6†ævVBà¤6æ6VÂ&WF–ç2–æ—F–Â—#²–çfÆ–Bö–çFW&–÷"öÖ—76–ær÷6–ævÆRÖ÷VâÖVFvR–çWG2&VgW6Rà¤æòæWr¶W&æVÂövW7GW&RÂv—¦Öò6†ævW2Â&VæFW&W"f—†W2÷"–6öâv÷&²ã“sRB66WFæ6P¦æ÷B–æfW'&VBg&öÒWÆöFVB67&VVç6†÷Bã“sB–6öâó“s'&’52æC“s"ó“s2f—7VÀ§6fVwV&G2&VÖ–ã²–çFW&Ö—GFVçB&–v‡B×6–FRfVÇB—27F–ÆÂõTâà ¥fÆ–FF–öã£##Rfö7W6VB'&–FvR÷6VÆV7F–öâÖ‡V"÷&F–Â÷&VÆV6RFW7G252Ãd”Âó6¶—à¤f÷W"æWr&VÂÖ÷væW"–çFVw&F–öç26÷fW"7WÆ–VB—.(i&7GVÂ&F–Âf–Æ&–Æ—Gž(i ¦÷&–v–æÂT’Çž(i&öæR†—7F÷'’7FWõVæFõ&VFòÂ6æ6VÂÂwV–FVB6–ævÆRÖÆö÷(i'6V6öæBÖÆö÷À¦æB–çfÆ–B–çWBFöÖ–2&VgW6ÂâæöFRDôÒFFW'2&Ræ÷BæF—fR•B&ööbà¤6†ævVB'VçF–ÖRôäÅ’6VÆV7F–öâÖ‡V"Ö'&–FvR×6W76–öã²&Wf–WvVB6W76–öâ÷&V6÷fW'’–ç3“sbÀ§&VÆV6RÖ&¶W'3“sbæB76WB†6†W2WFFVC²×VÇF“ãög&÷¦Vâö–6öâövVöÖWG'’Væ6†ævVBà¥V&Æ–6F–öâfW&–f–6F–öâföÆÆ÷w26W&FVÇ’âDUd”4S“sc¢6ÖRÖöFVÂ÷Gvò&VBVFvW2(i ¤VFvR&F–Â'&–FvR(i"Ç’'&–FvS¢öæR6Æ÷6–ærVBâVæFõ&VFó²&V÷VâF†Vâ6æ6VÀ§&WF–ç2—"övVöÖWG'’âÇ6ò6æ—G’Ö6†V6²W†—7F–ærGvòÖÆö÷'&–FvRâæW‡B7GVÂFWf–6P¦fVVF&6²ÂF†Vâ–çB–6öâ&öÆÆ÷WC²&W6W'fR–æFWVæFVçC“sRW‡G'VFRBFWf–6RvFRà ¢22ã“sr(	B&F–Âv—&–ærVF—BæBæV"Ög&öçBW†7BW‡G'VFR(	B#bö7Fö&W"##` ¥W6W"&WVW7G2VF—BöbÆÂ&F–ÂFööÇ3²÷&&—B6öÖWF–ÖW26†ævW2F‡&÷Vv‚&VgW6Âà¤VF—B7W'&VçBÖ–ãSc6fVFS’ö'V–ÆC“sbâgVÆÂ&÷WFR–çfVçF÷'“ƒVçG&–W2„f6S#2ôVFvS#ð¥fW'FWƒBôö&¦V7C2õ–çC’Â÷&–v–æÂF&vWG2öf–Æ&–Æ—G’ö6öçFW‡BFFW'2ö7F–öâ÷væW'3 ¢Fö72÷&F–Â×v—&–ærÖVF—BÓ##bÓÓ#bæÖBâæòÖ—76–ær7F–öâ÷væW"÷"w&öærÖÖöFRF&vW@¦f÷VæB–â6÷W&6R&Wf–Ws²F†—2—2æ÷BW††W7F—fRæF—fRÖvW7GW&RöÖW6‚6W'F–f–6F–öâà£“sb'&–FvRÆVæ6†W"FVfV7B&W—&VB÷V&Æ—6†VC²ÆÃ26†ævVBÆ—fRf–ÆW2'—FRÖÖF6‚à¤&6VÆ–æS“sbeTÄÃ#ƒ3552ód”Âó6¶—ƒãw2’Âfö7W6VC##U52à ¤6öæf—&ÖVB6W&FRW†7B'Vs¢&V6—6–öâÖf6R&ö¦V7FVBÖæ÷&ÖÂfÆÆ&6²F‡&W6†öÆCRÓW€§fW'7W27GVÂ×VÇF’Öf6RÖF—&V7BvW7GW&SRÓG‚6â–çfW'B6–vâ–âæ'&÷ræV"Ög&öç@¦6ÖW&&æBâW†—7F–ær&WfVÂÖ–ç6WCsSf6SrÂ6ÖW&6VçG&R¶æ÷&ÖÂ£R²ƒÃRÓbÃ“¢W†7@¢Ó"ã"–æ6÷'&V7FÇ’W‡G'VFW2³"ã#²÷&&—Bã7WG2–çv&BâÆ–vâõ$”t”äÂ&V6—6–öâ7WFöf`§FòvW7GW&SRÓBôäÅ’âæòÖ–âöG&rö¶W&æVÂövVöÖWG'’ö†—7F÷'’ö–æfW&Væ6R÷‡—6–6Â–çWB6†ævRà¤G–æÖ–2&V6—6–öâÖf6R6†–ÆBæBG&vW"×V’&VçB÷6†VÆÂ¶W—3“sr&Vg&W6†VC²÷&–v–æÀ¦–çFW&æÂ7F×2&WF–æVBâ&Wf–WvVB†6†W2æB&VÆV6R&V6÷fW'’÷6†VÆÂÖ&¶W'3“srà¥F‡&VRæWrFW7G2W6R7GVÂ&V6—6–öâ&ö¦V7F–öâ²æF—fR6öçG&öÆÆW"öfÆÆ&6³£ævÆW2À¦W†7B6Æ÷6VB÷WGWBõVæFõ&VFòÂöÆBÖ6öFR×WFF–öâ6Vç6—F—f—G’Âf—fR‡—6–6ÂG&w2æ@§W&R×Æâ–çf&–æ6Râfö7W6VBf–æÃ#…52ód”Âó6¶—Âæ÷BgVÆÃ“sr&W'Vâà ¥W6W"w2‡—6–6ÂF‡&÷Vv‚&VgW6Â&VÖ–ç2Vç&÷fVâöâffV7FVBÖöFVÂâ6ÖW&6†ævW0§&ö¦V7FVBG&vv–æræB&VfW&Væ6R–æfW&Væ6S²æò&Ææ¶WB&VgW6Âf—‚6Æ–ÖVBâVF—@¦Ç6ò&V6÷&G2GvòföÆÆ÷r×W3¢çVÖW&–27–çF†WF–2–çWB7F–ÆÂG&fW'6W2–æfW&Væ6RÂæ@§&V6—6–öâ7V66W72÷&VF&6²Æ6·2F÷vç7G&VÒ6öÖÖ—B6¶æ÷vÆVFvVÖVçBâ¶VWF†W6RõTà¦f÷"æ'&÷r&W7VÇBö6öç7G&–çBv÷&³²FöâwB&VÆ‚F÷öÆöw’wV&G2÷"&WÆ6R¶W&æVÂà ¤æWrf—6–&–Æ—G’Wf–FVæ6Rv†–ÆS“sr&W&VC¢W†7C“sb&W÷'CC£S3£…¢6†÷w2†–FR6çf0¦C#Cc#bÂ&–v‡ET’f—6–&ÆRö'6W'fF–öã3SBÂ&W7F÷&S3s#CbâW6W"6öæf—&×26öçG&öÇ25D§f—6–&ÆRgFW"6†÷s4BâF÷ÖÆWfVÂ†–FFVã¦fÇ6R—2&W7F÷&VB7FFRâÆ–÷WB÷7G–ÆW2ö†—G0¦†VÇF‡’F‡&÷Vv†÷WC²æõ–çB÷6W76–öâÂÆ–ã“s"7F—fRâF†—2–×Æ–6FW26çf2õT§–çF–ær–çFW&7F–öâ'WBæòVæv–æR&ö÷B6W6R÷"W&ÖæVçBf—‚—2&÷fVââ&WF–à¤õTâ&V7W'&Væ6RæBFWf–6R×&÷fVâÖçVÂ†–FS4N(i%6†÷s4B&V6÷fW'“²æòWFöÖF–2&Æ–æ²À§öÆÂ÷&VÆöB÷&VæFW&W"6†ævRâ6VRFö72÷V’Ö6çf2×&ö&RÓ“sbæÖBf÷"&V6—6RWf–FVæ6Rà ¤DUd”4S“ss¢6öæf—&Ó“srÂ6ÖRæVvF—fRW†7BöâæV"Ög&öçBF†Vâ6Æ–v‡FÇ’÷&&—FVBf–Ws°¥VæFõ&VFó²&WG'’÷&–v–æÂ‡—6–6ÂF‡&÷Vv‚v—F‚–æfW&Væ6RöfbööâÂ6VæBW†7B&VgW6À¦æB&RÖGFV×Bæ&÷†Æ"–b&V7W'&–ærâ'&–FvR—"Ç’ô6æ6VÂ&WF–æVBâ–b&–v‡BT¦f–Ç2W6RW†—7F–ær†–FS4N(i%6†÷s4C³“srFöW2äõB6Æ–ÒFò&W—"f—6–&–Æ—G’âæW‡B&–÷&—F—¦P¦Wf–FVæ6RÖÆVB6çf2õT’F–væ÷6—2ÂF†VâW†7B×&W7VÇBö–æfW&Væ6RföÆÆ÷r×W2&Vf÷&RÖ÷&P¦fVGW&R&öÆÆ÷WBã“sB–6öâó“s'&’66WFæ6RæB&÷FV7FVD×VÇF“ãög&÷¦VâVæ6†ævVBà ¢22ã“s‚(	BVFvR'&–FvR&Wf–Wr&Vf÷&RÇ’(	B#bö7Fö&W"##` ¥W6W"6Æ&–f–W3“sb6öÖÖ—G2gFW"Ç’'WBFöW2æ÷B$Ud”UrÂVæÆ–¶R66WFVBf6P¤'&–FvRâF†—2—2Ö—76–ær–çFW&7F–öâ7FvRÂæ÷Bf–ÆVB'&–FvRF÷öÆöw’â&–÷#“s`§&VG’×—"ÆVæ6†W"&W—"&WF–æVC²æò'&öC“sbó“sr52–æfW'&VBâVF—BÖ–æcf6fc3À§6ÖRwV–FVBVFvR6W76–öâ†Bæò&Wf–Wr÷væW#²f6R'&–FvR×WFFW2&Wf–WrÖW6‚À§v†–ÆR66WFVBf6RõfW'FW‚&WfVÂÇ&VG’6†&W2&VæFW&–ærÖöæÇ’&ÇVRv†÷7B†VÇW"à¥&WW6RW†—7F–ær7&VFTf6T&WfVÅ&Wf–WröF—7÷6Tf6T&WfVÅ&Wf–WrVæ6†ævVBf÷"VFvRà ¥4ÔR6VÆV7F–öâÖ‡V"Ö'&–FvR×6W76–öâ'V–ÆG2÷&–v–æÂ'&–FvU6VÆV7FVDVFvW2öâ&—fFP¦6ÆöæRæB&VæFW'26†ævVBöÇ–vöç2v—F‚÷&–v–æÂ&ÇVRG&ç6ÇV6VçBf–ÆÂ÷v—&R†VÇW"à¤÷&–v–æÂ6÷W&6R÷6VÆV7F–öâöÖWFFFö†—7F÷'’÷&ö¦V7B&VÖ–âVçF÷V6†VBVçF–ÂÇ“°¦æòæWrÖöFVÆÆ–ær÷G&–æwVÆF–öâö†—7F÷'’¶W&æVÂÂÖævW"ÖW6‚&WÆ6VÖVçB÷"&VæFW&W"à¤6æF–FFR6ÆöæR6ÆÇ2&W6W'fR7F—fR7FFRæÖW6‚FW7—FR†—7F÷&–6ÂVFvW2ö'6W'fW'2à¥6VÆV7F–öâÖ¶W’66†R&WW6W2&Wf–WrGW&–ær÷&&—C²6VÆV7FVBÖ&÷VæF'’6†ævR&V'V–ÆG2—BÀ¦–æ6ö×F–&ÆR÷VÆ—G’×&VgW6VB6æF–FFW26ÆV"—BâwV–FVBf—'7BÆö÷6†÷w2æòv†÷7@§VçF–Â6ö×F–&ÆR6V6öæB&÷VæF'’6VÆV7FVBâÇ’F—6&ÆVBv—F†÷WB7GVÂ&Wf–Wrà¤Ç’'Vç2÷&–v–æÂ'&–FvR×V’6öÖÖ—Böæ6S²6æ6VÂ&VÖ÷fW2v†÷7BæB&WF–ç2–æ—F–À§6VÆV7F–öââW†—7F–ærVæFõ&VFòv÷&·2â&Wf–Wr&VæFW&W"ö†VÇW'2æBf6R'&–FvRVæ6†ævVBà ¥6W76–öâ÷vç26÷W&6R6æ6†÷B¶W’Âö&¦V7BöÖöFRöÆö6²÷66VæR6öçFW‡BâW‡FW&æÂvVöÖWG'’ð¦ÖWFFF6†ævW2Âö&¦V7BöÖöFR÷FööÂ6†ævRÂvV†–FRF—7÷6Rv†÷7Bt•D„õUB&W7F÷&–æp§7FÆRÖW6‚÷6VÆV7F–öâ÷"6Æ÷6–æræWvW"FööÂT’â÷&–v–æÂ&6¶w&÷VæBÖW†—B&÷WFR7F–ÆÀ¦6ÆÇ26Æ÷6S²æòæWr&r×ö–çFW"÷væW"ÂW"Ög&ÖRöÆÆ–ær÷"6÷W&6R&öÆÆ&6²â6†&V@¦vVöÖWG'’öÖFW&–ÂF—7÷6Âö67W'2öæ6Râ÷fW&Æ’—2G&ç6–VçB÷WG6–FR66VæRö&¦V7@¦ÖævW"æBW6W2W7F&Æ—6†VB&WfVÂ&ÇVR7G–ÆRÂæ÷B6fVBvVöÖWG'’÷"6V6öæB&öG’à ¤fö7W6VC#3%52ód”Âó6¶—‡ããcw2“¢÷&–v–æÂ'&–FvR÷&F–Â÷6VÆV7F–öâ6öçG&7G2æC“sp¦6ÖW&&Vw&W76–öç3²f÷W"FFVB&VÂÖ6öçG&öÆÆW"õF‡&VR66VæRFW7G2&÷fRf—6–&ÆRv†÷7@¤$Tdõ$RÇ’v—F‚æò6÷W&6Rö†—7F÷'’6†ævW2ÂöæR×7FW6öÖÖ—BµVæFõ&VFòÂ6VÆV7F–öà§WFFR÷&VÖ÷fÂô6æ6VÂÂ6÷W&6Röö&¦V7BöÖöFR÷FööÂ÷vV†–FR6ÆVçWÂæò×66VæR&VgW6Âæ@§6–ævÆRvVöÖWG'’÷GvòÖFW&–ÂF—7÷6ÂâW†—7F–æs“sb†&æW727WÆ–W2&VÂ66VæR÷6†&V@§&Wf–WrgVæ7F–öç3²æòöÆBvVöÖWG'’ö†—7F÷'’76W'F–öâ&VÖ÷fVBâæòæF—fR•Bf—7VÀ¦66WFæ6R–æfW'&VBâ'VçF–ÖR6†ævRôäÅ’÷&–v–æÂVFvR'&–FvR6W76–öã²6W76–öâ÷&V6÷fW'§–ç3“s‚ÂVæ6†ævVCsb&VæFW&W"–×÷'BW‡Æ–6—FÇ’&Wf–WvVB–â76WB6öçG&7Bà ¤DUd”4S“sƒ¢6VÆV7B6ÖRGvò&÷VæF'’VFvW2(i"VFvR&F–Â'&–FvS¢$ÅTR7âf—6–&ÆP¤$Tdõ$RÇ’â÷&&—BFò–ç7V7C²Ç’¶VW2'&–FvRæB&VÖ÷fW2&ÇVRÂVæFõ&VFòà¤6æ6VÂ&VÖ÷fW2&ÇVRÂ&W6W'fW2÷&–v–æÂÖW6‚÷6VÆV7F–öââwV–FVBGvòÖÆö÷6VÆV7F–öà§WFFW2&Wf–Wr26V6öæB&÷VæF'’—26VÆV7FVBâf6R'&–FvR&VÖ–ç2Væ6†ævVBà¥&–v‡B×6–FRfVÇB7F—2õTâv—F‚6öæf—&ÖVBÖçVÂ†–FS4N(i%6†÷s4B&V6÷fW'“²æò&VæFW&–æp§&W—"÷"÷F†W"ã“srW†7Bö–æfW&Væ6R÷&VF&6²föÆÆ÷r×W–æ6ÇVFVBâæW‡BæF—fR&Wf–Wp¦fVVF&6²ÂF†VâWf–FVæ6RÖÆVB6çf2õT’v÷&²æB&VÖ–æ–ærVF—BföÆÆ÷r×W2à ¢22ã“s’(	BW†7B–æfW&Væ6R—6öÆF–öâæBG'WF†gVÂ6öÖÖ—B&VF&6³²'&–FvS“s‚52(	B#bö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’56W3“s‚'&–FvR&Wf–Wr&Vf÷&RÇ’ô6æ6VÃ²&÷FV7B—G2&—fFP¦6ÆöæRö&ÇVRv†÷7B÷6÷W&6RÖæWWG&Â&Wf–WrööæR×7FW÷&–v–æÂ6öÖÖ—BæBÆ–fV7–6ÆRà¥W6W"öæW‡F'V–ÆBWF†÷&—¦W2F†RGvò&VÖ–æ–ærW†7BVF—Bf—†W2âVF—B&VÖ÷FRö7W'&Vç@¦Ö–ã#ƒs†’Â&VÆV6S“s‚âW†—7F–ærçVÖW&–2vW7GW&W2Ç&VG’W6R&W6W'fVBö–çFW#“ƒsc°¦W†—7F–ærF—&V7B6öÖÖ—GFVBWfVçB÷vç27V66W76gVÂvVöÖWG'’fÇVW2âæòæWr¶W&æVÂæVVFVBà ¤÷&–v–æÂf6R&VfW&Væ6UVæFW%ö–çFW"æ÷r–væ÷&W2ôäÅ’çVÖW&–2ö–çFW#“ƒsbâ‡—6–6À¥Væ6–ÂöÖ÷W6R–æfW&Væ6RæBFövvÆR7FFR7F’Væ6†ævVBâ6÷fW'2W‡G'VFRæB–ç6WC°¦÷&–v–æÂÖöFVÂ×Væ—BöF—&V7F–öâÖ–ærÃ“srÆ–væVBæV"Ög&öçB&ö¦V7F–öâÂF‡&÷Vv€§6†VÆÂÖW†—B6æ–æræB–ç6WB6fWG’6Æ×&VÖ–ââW†7B7F–ÆÂVçFW'2÷&–v–æÀ¦6öçG&öÆÆW"æBwV&FVBvVöÖWG'’ö†—7F÷'’÷væW'3²æò6W&FRÖöFVÆÆ–ærÆv÷&—F†Òà ¥&V6—6–öâG&6·2öæR7–æ6‡&öæ÷W2çVÖW&–2&WVW7BæBÆ—7FVç2Fòõ$”t”äÀ¦&÷†Æ"Öf6RÖF—&V7BÖ6öÖÖ—GFVBâ—B&V6÷&G27V66W72õ&WVB÷&VF&6²öæÇ’gFW"F†@§6VÖçF–26¶æ÷vÆVFvVÖVçBÂW6–ær5ETÂ6öÖÖ—GFVBfÇVR&F†W"F†â&WVW7FVB–çWBà¤W†—7F–ær÷6—F—fR÷&V6W72ö6Æ÷6VBÖæVvF—fRô–ç6WBWfVçG2&WF–æVC²öÆB÷Vâ×6†VW@¥F‡&÷Vv‚7V66W72'&æ6‚æ÷rVÖ—G26ÖR6VÖçF–2WfVçBgFW"÷&–v–æÂwV&FVB6öÖÖ—Bà¤W†×ÆS¢&WVW7FVBÓ"ã"7F÷–ærB6†VÆÂW†—BÓ"ã&V6÷&G2öF—7Æ—2Ó"ãâ–ç6WB&WVW7@¦&÷fR6fR&ævRF—7Æ—2÷&–v–æÂ6Æ×VBF—7Fæ6RÂæWfW"âVçW&f÷&ÖVCà ¤æò6¶æ÷vÆVFvVÖVçBÖVç2fÇ6R÷&VgW6VB7FGW2Âæòf¶RfÇVRÖ6öÖÖ—GFVBWfVçBÂ&–÷ §7V66W76gVÂW"×FööÂ&WVB÷fÇVR&WF–æVBâ&VgW6Â&VF÷WB7W'f—fW27V'6WVVçB7FGW0¦ö'6W'fW"6ÆÆ&6·2ÂWfVâv—F‚æò&–÷"7V66W73²æW‡B‡—6–6Â&W72ôW†7BGFV×Bð§7V66W726ÆV'2—Bâ&Ææ²÷¦W&òöæöæf–æ—FR–çWBæB'6VçB†—7F÷'’&VgW6R&Vf÷&P§7–çF†WF–2vVöÖWG'’F—7F6‚â÷&–v–æÂ&VgW6Â÷&öÆÆ&6²÷6VÆV7F–öâö†—7F÷'’&VÖ–âà¥‡—6–6ÂG&r6ÆÆ&6·27F–ÆÂ&V6÷&BvVöÖWG'’æ÷&ÖÆÇ’âF†—2—2G&ç67F–öâ&W÷'F–ærÀ¦æ÷B&VÆ†F–öâöbF÷öÆöw’&VgW6Â÷"&ööböbW6W"w2‡—6–6ÂF‡&÷Vv‚f–ÇW&R&W—"à ¤f–æÃSrfö7W6VE52ód”Âó6¶—ƒ‚ãw2“¢æWsr7GVÂ&V6—6–öâ¶F—&V7BÖ6öçG&öÆÆW"FW7G0§ÇW2f6RõF‡&÷Vv‚öæVvF—fR÷&WVB÷&F–Âô'&–FvR÷&VÆV6R&Vw&W76–öââæWrf—‡GW&W2'Và¦÷&–v–æÂVæ–f÷&ÒÖ–ç6WB÷væW"&F†W"F†â6VçG&RÖÆW'fÆÆ&6²âFW7BW†7Bã3rC0¦6ÖW&2ÂF‡&÷Vv‚CFæV"öö&Æ—VRf–Ww2Â7GVÂW†—BFWF‚ÂVæFõ&VFòööæR6†V6·ö–çBÀ§&VgW6VBVçF—&R×6öÆ–B7WBv—F‚Væ6†ævVB6÷W&6Rö†—7F÷'’öÆ7BfÇVRÂ7GVÂ6Æ×V@¤–ç6WBÂçVÖW&–2–çfÆ–BöæòÖ†—7F÷'’&VgW6ÂÂ&VÂ‡—6–6ÂfW'FW‚–æfW&Væ6Rg26ÖP¦çVÖW&–26öçF7BÂW'6—7FVçBf–ÇW&R&VF÷WBâæòæF—fR•B66WFæ6R–æfW'&VBà¤6†ævVBgVæ7F–öæÆ—G’ôäÅ’&V6—6–öâÖf6RæC6Æ–æW2–â÷&–v–æÂ×VÇF’Öf6RÖF—&V7C°¦G&vW"×V’6†ævW26†–ÆB–âöæÇ’â&Wf–WvVB&VçBö6†–ÆBöF—&V7B÷&V6÷fW'’–ç3“s’æ@§6†VÆÂÖ&¶W'2ö76WB†6†W2âÖ–âövVöÖWG'’õF‡&÷Vv‚¶W&æVÇ2ô'&–FvS“s‚ô×VÇF“ãög&÷¦Vâð¦–6öç2ó“s'Æ–âó“s7&ö&R&VÖ–âVæ6†ævVBâæòGWÆ–6FR†—7F÷'’÷"–çWB÷væW"à ¤DUd”4S“s“¢v—F‚–æfW&Væ6RôâÂf6RW†7Bã3r†÷"6öçfVæ–VçBfÇVR’Â÷&&—BõVæFò÷&WG'“°§&W7VÇB6†÷VÆB&WF–âVçFW&VBF—7Fæ6RâfÆ–BF‡&÷Vv‚÷fW'6†ö÷BF—7Æ—27GVÂW†—Bà¥G'’&VgW6VB7WC¢W‡Æ–6—B&VgW6ÂÂ&Wf–÷W27V66W76gVÂfÇVR&WF–æVC²VæFò×W7@§VæFòF†RÆ7B7V66W76gVÂ÷W&F–öâÂæ÷Bâ–çfVçFVBf–ÆVB7F–öââ‡—6–6Â6æ §7F–ÆÂv÷&·2â'&–FvR&Wf–Ws“s‚&VÖ–ç266WFVBâ&–v‡B×6–FRfVÇB7F–ÆÂõTã²ÖçVÀ¤†–FS4N(i%6†÷s4B&V6÷fW'’6öæf—&ÖVBâæW‡BWf–FVæ6RÖÆVB6çf2õT’v÷&²÷"7GVÃ“s¦fVVF&6³²æòæWrfVGW&Rö–6öâW‡ç6–öâ&Vf÷&R÷WG7FæF–ær&VÆ–&–Æ—G’F—&V7F–öâà ¢22ã“ƒ(	BW‡Æ–6—Bf–ÆR&Vg&W6‚F—7Æ’&V6÷fW'“²ã“s’W6W"52(	B#bö7Fö&W"##` ¥W6W"53“s’&÷FV7G2W†7B–æfW&Væ6R—6öÆF–öâÂ7GVÂ6öÖÖ—B&VF&6²Â&VgW6Âð¦Æ7B×fÇVRö†—7F÷'’æBW†—7F–ær‡—6–6Â6æ–ærâ'&–FvS“s‚52&VÖ–ç2&÷FV7FVBà¤VF—BÖ–ã&c&VSs†÷&VÆV6S“s’âæW‡B&VÆ–&–Æ—G’fö7W2—2&V7W'&–ær&–v‡B×6–FRT’à£“sbFWf–6R&ö&R&÷fVB†–FS4B&W7F÷&VB6öçG&öÇ2æB6†÷s4BÆVgBF†VÒf—6–&ÆS²F†—0¦æ'&÷w26çf2õT’–çF–ær–çFW&7F–öâ'WBFöW2æ÷BW7F&Æ—6‚&ö÷B6W6RâæògW'F†W §7V7VÆF—fR552öÆ–W"÷&VæFW&W"6†ævR÷"W&ÖæVçB&W—"6Æ–Ò–ã“ƒà ¤FBf–ÆR(i"&Vg&W6‚F—7Æ’Âf–Æ&ÆRt•D„õUBVæ&Æ–ærFV'Vrâ—BW6W24ÔRW†—7F–æp¦7&VFT6çf5f—6–&–Æ—G•&ö&R–æÆ–æRf—6–&–Æ—G’6fR÷&W7F÷&R÷væW"âW‡Æ–6—BW6W"6Æ–6°¦†–FW2ôäÅ’÷&–v–æÂ6çf2f÷"öæR&W6VçFVBg&ÖR‡Gvò$b6ÆÆ&6·2’ÂF†Vâ&W7F÷&W0¦W†7B÷&–v–æÂf—6–&–Æ—G’fÇVR÷&–÷&—G’ö'6Væ6Rã#S×2F–ÖW"fÆÆ&6²æBvV†–FRð¦†–FFVâÖFö7VÖVçBöFV'VrÖöfb6æ6VÆÆF–öâVç7W&R&W7F÷&F–öâ–bæ–ÖF–öâg&ÖW27FÆÂà¤æò&VÆöBÂ6çf2&RÖ7&VF–öâ÷&W6—¦RôE"öÖöFVÂö†—7F÷'’÷6VÆV7F–öâ×WFF–öâÂæWr&VæFW&W"À¦WFöÖF–2&V7W'&–ær&Æ–æ²Â–FÆRöÆÆ–ærÂæf–vF–öâ÷"ö–çFW"÷væW"âFV'Vröfb7F—0¦öfc²f–ÆR6Æ÷6W2gFW"7V66W76gVÂ7F'BÂ'WGFöâ&W6WG2gFW"&W7F÷&Râ6öæf—&ÖF–öà§6—2F—7Æ’&Vg&W6†VBÂæ÷BF†BF†RfVÇB—2W&ÖæVçFÇ’f—†VBà ¥VæF–ær&Vg&W6‚&V¦V7G2&WVG2æBFöW2æ÷BF¶R÷fW"ÖçVÆÇ’†–FFVâFV'Vr&ö&Rà¤W†—7F–ær&ö&R'W7’wV&Bæ÷rÇ6ò6†V6·2Ö–âôf6RôVFvRõfW'FW‚ô&WfVÂÆ—fRG&w3°¥–çB÷FööÂ6W76–öâöv—¦ÖòwV&G2&WF–æVBâ&VgW6VBVçG'’ÆVfW2v÷&²VçF÷V6†VBæ@¦6·2Fòf–æ—6‚7F—fR÷W&F–öâ÷"6†÷s4BâFV'Vr&ö&Röö'6W'fF–öâ'WGFöç2F—6&ÆV@¦'&–VfÇ’GW&–ær&V6÷fW'’â÷F–öæÂFV'VrÆöw2&V6÷&B7F'BöVæBæB–çfÆ–FFR7FÆP¦66†VB&W÷'G2â÷&–v–æÂGvò×7FWF–væ÷7F–2æBW6W"Öö'6W'fF–öâfÆ÷rVæ6†ævVBà ¤f–æÃ3’fö7W6VE52ód”Âó6¶—ƒã#‡2“¢æWsB&V6÷fW'’FW7G2²W†—7F–ærFV'VröF—7Æ’ð¦6çf3“s2ô'&–FvS“s‚ôW†7C“s’÷&VÆV6R6öçG&7G2âW†7B–æÆ–æR&W7F÷&F–öâ7&÷73`¦–æ—F–Â7FFW2Â†–FFVâg&ÖR&Vf÷&R&W7F÷&RÂ7FÆÆVBÖg&ÖRfÆÆ&6²Â6æ6VÂöÆFRÖg&ÖP¦6ÆVçWÂ'W7’öÖçVÂ×&ö&R&VgW6ÂÂ66†VGVÆW"f–ÇW&R&W7F÷&F–öâÂ7GVÂf–ÆRVçG'§v—F‚FV'VtôdbÂvV†–FRöFV'VrÖöfb6ÆVçWÂVæ6†ævVB&6¶–ærF–ÖVç6–öç2æBÖöFVÂð¦†—7F÷'’–FVçF—G’FW7FVBâ÷&–v–æÃ“s2FW7G2&WF–æVBâ6†&VBFW7B†VÇW"öæÇ’v–ç0¦÷F–öæÂf–ÆR†÷7BâæòæF—fR•B&V6÷fW'’×7VVB÷f—7VÂ66WFæ6R–æfW'&VBà¥'VçF–ÖR6†ævRôäÅ’vW7GW&RÖFV'Vs²F—&V7B6†VÆÂ÷&V6÷fW'’–ç3“ƒæB&Wf–WvVB†6†W2à£“s’ÖöFVÆÆ–ærôW†7BÃ“s‚'&–FvR÷6†&VB&VæFW&W"ÂÖ–âô×VÇF“ãö–6öç2ög&÷¦VâVæ6†ævVBà ¤DUd”4S“ƒ¢f–Æ^(i%&Vg&W6‚F—7Æ“¢6çf2&WGW&ç2WFöÖF–6ÆÇ’ÂÖöFVÂ÷6VÆV7F–öâ7F“°¥VæFõ&VFò7F–ÆÂ7G2öâ7GVÂ&–÷"ÖöFVÆÆ–ær6†ævW2âæòFV'VrVæ&ÆR&WV—&VBà¥v†Vâ&–v‡B6öçG&öÇ2æW‡BF—6V"ÂW6RF†—2öæR7F–öã²&W÷'B–bF†W’&WGW&âæ@§7F’f—6–&ÆRâW†—7F–ærÖçVÂ†–FS4N(i%6†÷s4B&VÖ–ç2f–Æ&ÆR–b'&–Vb&Vg&W6‚FöW0¦æ÷B&W&öGV6R—G2&V6÷fW'’âF†—2—26öçfVæ–VçBWf–FVæ6RÖ&6VB$T4õdU%’Âæ÷B6Æ–Ð§F†B–çFW&Ö—GFVçB–çF–ærfVÇB—2f—†VBâæW‡BföÆÆ÷ræF—fRfVVF&6²æB–çfW7F–vFP¦6çf2õT’&÷VæF'’g&öÒWf–FVæ6S²&WF–âÆÂ&÷FV7FVC“s’ó“s‚–çFW&7F–öç2à ¢22ã“ƒ(	BUb÷WF÷Æ–W"æB6ö×ÆWFR7W&f6RFV&F÷vã²ã“ƒ&V6÷fW'’52öæÇ’(	B#bö7Fö&W"##` ¥W6W#“ƒ5266WG2W‡Æ–6—B&V6÷fW'’Â'WB&V¦V7G2æVVF–ærÖçVÂ&Vg&W6‚2§6öÇWF–öâæB7WÆ–W2&W&öGV6–&ÆRUbv–æF÷r&W÷'Cs£S£•¢â¶VW&–v‡B×6–FRf—7VÀ¦f–ÇW&RõTã²FöâwBÖ—7&V6÷&C“ƒ2T’&W—"52ã“s’W†7BæC“s‚'&–FvR&÷FV7FVBà¤VF—B7W'&VçFÖ–æcƒVƒ¢WfVçF6†–â—2ö&¦V7BUgFööÇ3ƒƒƒ(i&ÖW6„†VÇF„6Æ÷6S“#ƒS(i ¦f–æÇ6W76–öæçVÆÂÂæòUbVF—F÷"÷–çBöF—7Æ—&Vg&W6‚æVVFVBâ6öçG&öÇ2övVöÖWG'’ö†—G0¦†VÇF‡“²†–FFVâ6†&VF†÷7B&VÖ–ç2f–Ww÷'BÖ6öçF–æVBv—F‚£3Bö÷fW&fÆ÷vWFòð¦6öçF–æÆ–÷WG–çBö—6öÆF–öæ—6öÆFRâ6÷W&6RVæBÆ6¶VBf–Ww÷'B×7G–ÆR÷Æ6VÖVç@¦6ÆVçWâW†7BWf–FVæ6R7VÖÖ'’–âFö72÷V’×Wb×G&–vvW"Ó“ƒæÖC²æò&÷fVâVæv–æR6W6Rà ¥&W—"÷&–v–æÂFööÂ×6W76–öâ×V’÷væW"ÂäõBâWFöÖF–2v÷&¶&÷VæBâUbFööÇ2W6W0¦ÖçVÂæF—fR÷÷fW"F÷Æ–W"–b7W÷'FVC²÷&–v–æÂ†÷7Bö6öçG&öÂæöFW2&VÖ–â–à¤DôÒ6òW†—7F–ær66÷VBv–FR552öÆ—7FVæW'2ö7F–öç27W'f—fRâf—†VB÷6—F–öæ–ærföÆÆ÷w0§f–Ww÷'BF÷³'ƒ²G–æÖ–2f–Ww÷'B†V–v‡B&÷VæG2Âv–æF÷r÷f—7VÂ&W6—¦RÆ—7FVæW'0¦7F—fRöæÇ’v†–ÆR6†÷vââ÷&–v–æÂã“S‚G&ç6f÷&Ög&VR÷6—F–öâ&WF–æVBÂ'WBf–ÆV@§–çBÖ6öçF–æÖVçBÆ–W"&VÖ÷fVBâG&ç7&VçBæöæ–çFW&7F—fR&6¶G&÷Â–æ†W&—FVBFW‡@¦6öÆ÷W#²æòÖöFÂö–æW'Böfö7W2×G&÷"æWr&r×ö–çFW"÷væW"â÷F†W"FööÇ2Væ6†ævVBà ¤öâ6Æ÷6Rö6öçFW‡B7v—F6‚Â†–FR÷&VÆV6RæF—fR7W&f6R&Vf÷&R&WGW&æ–ær÷&–v–æÀ¦6öçG&öÇ3²6ÆV"÷÷fW"öFö6²÷v–FRfÆw2æBÄÂ–æÆ–æRf–Ww÷'B7G–ÆW3²&²V×G¦†–FFVâ†÷7B&6²–âG&vW"âUbVF—F÷"†æFöfbW‡Æ–6—FÇ’7W7VæG26÷W&6R7W&f6P¦&Vf÷&Rf—'7Bv÷&·76R–çBv†–ÆR&W6W'f–ær÷&–v–æÂÆöv–6Ç6W76–öâVçF–Â&6²ð¤6Æ÷6RâF‡W2æòV×G’F÷ÖÆ–W"÷W&÷fS$BVF—F÷"âW†—7F–ærv÷&·76S“S"æBÆÀ¥UböFÆ2ö†—7F÷'’öÖF‚÷væW'2VçF÷V6†VBâæF—fRVç7W÷'FVB÷F‡&÷v–ær’fÆÇ2&6°§6fVÇ’Fò÷&–v–æÂVçG&ç6f÷&ÖVB'6öÇWFRæVÂÂv—F†÷WB6öçF–æÖVçC²6ÖR6ÆVçWà¤æò6çf7f—6–&–Æ—G’÷&Vg&W6‚÷&W6—¦R÷&VæFW&W"&W6WBÂF–ÖW"ÂW"Ög&ÖRöÆÆ–ær÷"ÖW6€¦6†ævR–çG&öGV6VBâW†—7F–ærÖçVÂ&V6÷fW'’&VÖ–ç2f–Æ&ÆR'WB—2æ÷B–çfö¶VBà ¤W†—7F–ærFV'Vr6æ6†÷Bæ÷r–æ6ÇVFW26÷W&6R×&VçB÷÷÷fW"÷F÷Æ–W"7FFRÇW0¦ÖW6„†VÇF…6W76–öâæB&÷†Æ%Uev÷&·76RÂ6òæF—fR&VæFW&–ærÖöFRö6ÆVâ6Æ÷6R6â&P§fW&–f–VB–b&V7W'&Væ6RW'6—7G2âF†—2—2Wf–FVæ6RÂæ÷B&WÆ6VÖVçB6öçG&öÇ2à£3cBF&vWFVE52ód”Âó6¶—ƒBãW2“£VæWr6öçG&öÆÆW"öæF—fRÔ’ÖF÷V&ÆRFW7G26÷fW#P¦÷Vâö6Æ÷6R7–6ÆW2ÂW†7B÷&–v–æÂæöFW2ö6öçFW‡BÂF÷ÖÆ–W"&VÆV6R÷7G–ÆW2÷&¶–ærÀ¥UbVF—F÷"†æFöfbÂ&W6—¦RöF—7÷6ÂÂ÷F†W"×FööÂ7v—F6‚æBVç7W÷'FVB÷F‡&÷rfÆÆ&6²à¤÷&–v–æÅUb÷v÷&·76R÷6W76–öâö†VÇF‚öFV'Vrô'&–FvRôW†7B÷&VÆV6R6†V6·2&WF–æVBã“S€§FW7Bæ÷r&V¦V7G2öÆB6öçF–æÖVçB&F†W"F†â&W6W'f–ærÖ—F–vF–öâF†Bf–ÆV@¦öæFWf–6RâæòÆö6ÂæF—fRvV$¶—Bf—7VÂ&W&öGV7F–öâöwV&çFVVBW&ÖæVçB&W— ¦6Æ–ÖVBâFWf–6R×W7B6öæf—&ÒF†—27G'V7GW&Â6÷W&6Rf—‚&WfVçG2F†RG&–vvW"à ¤6†ævVB'VçF–ÖRöæÇ’÷&–v–æÂ6†&VG6W76–öâöÖW6††VÇF‚†æFöfböFV'VrWf–FVæ6S²F—&V7@§6†VÆÂ÷&V6÷fW'’¶W—3“ƒæB&Wf–WvVB†6†W2âæF—fR’7W÷'FVB6–æ6R6f&“s°§&–Ö'’6÷W&6W2–â–æ6–FVçFFö2âæò6†&VBÆ–÷WB÷÷6—F–öæW"VF—G2ÂGWÆ–6FR÷WÀ¥Ub¶W&æVÂÆÖ–âÃ“ƒ&V6÷fW'’–×ÆVÖVçFF–öâÃ“s”W†7BÃ“s„'&–FvRÄ×VÇF“ã÷"g&÷¦Vâ6†ævW2à ¤DUd”4S“ƒ¢v—F†÷WB&Vg&W6‚ö×7v—F6‚÷&÷FF–öâÂ&WVFVFÇ’ö&¦V7N(i%Un(i$6Æ÷6RÂ–ç7V7@§&–v‡BFööÆ&"÷7FGW2V6‚7–6ÆS²F†VâWFòFÆ2ô÷VâUbVF—F÷"ô&6²æB÷&&—BFð§&–v‡BVFvRâ6öçG&öÇ2×W7B7F’G&vâæBW6&ÆRâT’FV'Vr–b&V7W'&Væ6S¢†÷7B&Vç@§6†÷VÆB&RG&vW"gFW&6Æ÷6RÂ÷÷fW&çVÆÂ÷F÷Æ–W&fÇ6RÂ6öçF–ææöæS²6VæBæWr&W÷'Bà¤Fòæ÷B6Æ÷6Rf—7VÂ—77VRg&öÒWFöÖFVB52âæW‡B7GVÃ“ƒFWf–6R&W7VÇB&Vf÷&P§Vç&VÆFVFfVGW&R&öÆÆ÷WB÷"7V7VÆF—fRgW'F†W"552öVæv–æRf—†W2à ¢22ã“ƒ"–çB–6öç2æB&÷FV7FVBã“ƒUbÆ–fV7–6ÆP ¢Ò·…ÒW6W"53“ƒ¢&WVFVBUb÷Vâô6Æ÷6RæBVF—F÷"&WGW&â¶VW&–v‡B6öçG&öÇ2f—6–&ÆRv—F†÷WB&Vg&W6‚F—7Æ“²&WF–âæF—fRF÷ÖÆ–W"&VÆV6Rö†÷7BFV&F÷vâà¢Ò·…ÒW6W"53“ƒ#¢ÆÃ–çB–6öç2ÖF6‚6VÆV7FVB&ööc2v—F‚&VF&ÆR6F–öç3²÷&–v–æÂ6VçG&Rö6öçG&öÂÆ6VÖVçG2æB6VÆV7FVBöF—6&ÆVBfVVF&6²7F’W6&ÆRà¢Ò·…ÒW6W"53“ƒ#¢''W6‚ô&ÇW"õ6×VFvRæBÆ–W'2ôÖ6²ô–ÖvRôòôÖ6—¦R÷Vâ÷&–v–æÂÆVgB6öçG&öÇ3²7–6Æ–ær¶VW2&F–ÂVçF–ÂVæ6–Â7W&f6RW6S²&6¶w&÷VæB†öÆB&V÷Vç2à¢Ò²ÒDUd”4S“ƒ#¢–çBVæFõ&VFòôFöæRÂÖöFVÆÆ–ær–6öç2æBUb6Æ÷6R÷&–v‡BFööÆ&"7F’66WFVBà¢Ò·…Ò'Gv÷&²VF—C£fÆ–B5dw2W†7BFò&ööc2Â¦W&òF&vWBÖ&÷‚÷fW&Æ2Â&÷VæG2f—BW†—7F–æs3S‚&F–Âà  ¢22ã“ƒ27F'GWFööÆ&"ò&Vg&W6‚&V7W'&Væ6P ¢Ò²ÒõTã¢W6W#“ƒ"&W÷'G2–çf—6–&ÆR&–v‡B6öçG&öÇ2–ÖÖVF–FVÇ’gFW"&Vg&W6ƒ²6WfW&Â&Vg&W6†W2&V6÷fW&VBã“ƒUb66WFæ6RFöW2æ÷B6Æ÷6R7F'GWf—6–&–Æ—G’à¢Ò²ÒDUd”4S“ƒ3¢&WVFVB&VÆöG2&WF–âG&vâ&–v‡BFööÆ&"÷7FGW2&Vf÷&Ræf–vF–öâÂUbVçG'’Â×7v—F6‚÷"&÷FF–öâà¢Ò²ÒDUd”4S“ƒ3¢g&ÖRÆÂõVæFõ&VFòôfö7W2ôö&¦V7G2õd”Urv÷&²öæ6Röâ÷&–v–æÂ÷væW'3²&–v‡B'&÷w6W"öÖVçR&÷VæG2Væ6†ævVBà¢Ò²ÒDUd”4S“ƒ3¢Ub÷Vâô6Æ÷6RôVF—F÷"&6²æB66WFVB–çB–6öç2÷v÷&¶fÆ÷r&VÖ–âW6&ÆRà¢Ò·…ÒWFöÖFVC¢6–ævÆRf–æÂ÷&FW&VBFööÆ&"–â6†VÆÃ²÷&–v–æÂd”Urõ5dræöFW2&WF–æVBöâ‡–G&F–öã²ö&¦V7G2ôg&ÖR&–æBöæ6S²&VÂ6ÖW&f—C²fÆÆ&6²7&VF–öâ&WF–æVBà ¢22ã“ƒ2æF—fRfVVF&6²(	Bf—'7B×&Vg&W6‚f–ÇW&P ¢Ò·…ÒW6W"gVæ7F–öæÂ53“ƒ2&V6÷&FVC²66WFVB–çC“ƒ"æB÷&–v–æÂFööÆ&"7F–öç2&WF–æVBà¢Ò²Òd”ÄTBôõTã¢f—'7B&Vg&W6‚7F–ÆÂÆ÷6W2&–v‡B6öçG&öÇ2öã“ƒ3²7F'GW6†VÆÂ7F&–Æ—¦F–öâF–Bæ÷B72æF—fRf—6–&–Æ—G’à¢Ò²Ò6GW&Rg&W6ƒ“ƒ2T’FV'Vröâd•%5Bf–ÆVBÆöB&Vf÷&Rç’&V6÷fW'’÷"×7v—F6ƒ²7FF–2×FööÆ&"‡—÷F†W6—2—2æ÷B6öæf—&ÖVB&ö÷B6W6Rà ¢22ã“ƒ2w&÷VæB×&Vv–öâWf–FVæ6R(	B#rö7Fö&W"##` ¢Ò²ÒõTã¢æWr6GW&R†2f—6–&ÆRT’'WBÖ—76–ær&–v‡Bw&÷VæB6†F–ærâ¶VW6W&FRg&öÒV&Æ–W"–çf—6–&ÆRÖ6öçG&öÇ2f–ÇW&Rà¢Ò·…Ò7WÆ–VB7F'GW÷vW6†÷rFööÆ&"v–GF‚7F&ÆS3rãc“3sS²6çf3#s3'ƒcS#²æò7F—fRUbF÷Æ–W"âDôÒWf–FVæ6RFöW2æ÷BW7F&Æ—6‚fÆö÷"÷6†F÷r&VæFW&–ærà¢Ò·…Ò–æ—F–Â67&VVç6†÷B–ç7V7FVC¢ã“ƒ2F÷×&–v‡B6öçG&öÇ2f—6–&ÆS²7G&–v‡BfW'F–6Â6†F–ær6VÒæV"&–v‡BV'FW#²fÆö÷"6öçF–çVW2öâ&÷F‚6–FW2Â6W&FR6Æ÷–ærF—7FçBVFvRà¢Ò²Ò6ÖÆÂ÷&&—Bt•D„õUB&Vg&W6‚ö×7v—F6ƒ¢&W÷'Bv†WF†W"6VÒ7F—2f—†VBöâ67&VVâÂÖ÷fW2v—F‚w&÷VæBÂ÷"F—6V'2&Vf÷&R6†ö÷6–ær6÷W&6R6†ævRâæò&WVB–æ—F–Â67&VVç6†÷BöFV'VrGV×æVVFVBà ¢22ã“ƒB6VÆV7FVBÖf6Rw&÷WWF†÷&–æp ¢Ò²Òf6RÖöFS¢6VÆV7Bf6W2Âd”Urâf6Vw&÷W2âæÖRâ76–vâ6VÆV7FVC²öæÇ’6†÷6Vâf6W26†ævRw&÷Wà¢Ò²Ò6ÖRæÖR¦ö–ç2w&÷W²F–ffW&VçBæÖR6W&FW3²6ÆV"6VÆV7FVBÆVfW2÷F†W"w&÷W2–çF7Bà¢Ò²ÒVæFòõ&VFòÂ6fRô÷Vâ&WF–âw&÷W2æBvVöÖWG'’õUg3²æòUb&WV—&VÖVçBà¢Ò²Òæò6VÆV7F–öâ÷w&öærÖöFRö7F—fRFööÂöÆö6¶VBöÆ–æ¶VB÷&V6—Rö&¦V7G2&VgW6Rv—F†÷WB†—7F÷'’à¢Ò·…ÒWFöÖFVBÖWFFFÂVæ6†ævVBvVöÖWG'’÷6÷W&6RÂæòÖ÷ÂfÆ–FF–öâ÷&VgW6ÂæB6†V6·ö–çBFW7G272à¢Ò²Ò–çFW&Ö—GFVçB&–v‡B×&Vv–öâ&VæFW&–æröv—¦ÖòÆ÷72&VÖ–ç2õTã²6ææ÷B7W'&VçFÇ’&W&öGV6RÂæ÷B&W—&VBà ¢22ã“ƒRw&÷WÖæÖR&WW6Ròã“ƒB66WFV@ ¢Ò·…ÒW6W"53“ƒB&÷FV7G26VÆV7FVBÖf6Rw&÷W76–væÖVçBö6ÆV"ÂVæFõ&VFòæB6fRô÷Vâà¢Ò²Ò6VÆV7Bf6W2–âöæRw&÷W²W6R6VÆV7FVBw&÷WæÖR6÷–W2—G2æÖRÂ6†ævW2æòf6W2÷"†—7F÷'’à¢Ò²ÒÖ—†VB÷Væw&÷WVBöæò6VÆV7F–öâ&VgW6W2–6·WæB&WF–ç27W'&VçBæÖRà¢Ò²Òfö7W2æÖR–çWC¢W†—7F–æræÖW2öffW&VBöæ6RV6ƒ²&VæÖR6†ö–6RföÆÆ÷vVB'’76–vâ6VÆV7FVB¦ö–ç2w&÷Wà¢Ò²ÒVæFõ&VFòffV7G27GVÂ76–væÖVçBöæÇ“²6fRô÷Vâ&WF–ç266WFVC“ƒB&V†f–÷"à¢Ò·…ÒWFöÖFVB&VBÖöæÇ’&WW6RÂ–çfÆ–BöÖ—†VB&VgW6ÂæB6fR÷F–öâçfÇVR–ç6W'F–öâ6†V6·272à ¢22ã“ƒbVæ6–Âf6Vw&÷W7G&ö¶W0 ¢Ò·…ÒW6W"53“ƒR&÷FV7G2W†—7F–ærÖæÖR&WW6RæC“ƒBWF†÷&–ærö†—7F÷'’÷6fR&6VÆ–æRà¢Ò²Òf6RÖöFRâd”Urf6Vw&÷W2âæÖRâVæ6–Âf6Vw&÷W7G&ö¶W3²7G&ö¶Rf—6–&ÆRf6W2ÂÆ–gB76–vç2w&÷WâæòUb&WV—&VBà¢Ò²Ò6öÆ÷W'2WFFRôâÄ”eC²V6‚6†ævVB7G&ö¶R—2öæRVæFòõ&VFòVçG'’ÂæòÖ÷7G&ö¶W2FBæöæRà¢Ò²Òf–ævW'2æf–vFS²6V6öæB6çf26öçF7B6æ6VÇ27W'&VçB7G&ö¶S²7F÷&W7F÷&W2÷&F–æ'’6VÆV7F–öâà¢Ò²Ò6†ævR÷–6²æÖRæB&V&Ó²7v—F6‚Æöö²7F÷2''W6ƒ²6fRô÷Vâ&WF–ç2w&÷W2à¢Ò·…ÒWFöÖFVBW&R÷&VÂ÷væW"&÷WF–ær6÷fW'26÷W&6RÖæWWG&Â7Fv–ærÂ6æ6VÆÆF–öâÂÆ÷7B6GW&R÷vV†–FRÂ6öçG&öÇ2&W7F÷&F–öâÂ7FÆR6öçFW‡BÂöæR6†V6·ö–çBæB&6¶w&÷VæBVæ6–Âæf–vF–öâà¢Ò²ÒæF—fRVæ6–ÂövW7GW&R66WFæ6RVæF–æs²&VæFW&–ærfVÇB&VÖ–ç2õTâ–æFWVæFVçFÇ’à ¢22ã“ƒrVæ6–Âf6Vw&÷WW&6W  ¢Ò·…ÒW6W"53“ƒb&÷FV7G2æÖVBVæ6–Â7G&ö¶W2æB66WFVB†—7F÷'’öæf–vF–öâà¢Ò²Òd”Urf6Vw&÷W2âW&6Rw&÷W7G&ö¶W3²6×ÆVBf6W2&V6öÖRVæw&÷WVBôâÄ”eBà¢Ò²Ò÷F†W"w&÷W2övVöÖWG'’õUg2Væ6†ævVC²öæRVæFòõ&VFòW"6†ævVBW&6R7G&ö¶Rà¢Ò²ÒÇ&VG’Væw&÷WVB7G&ö¶RFG2æò†—7F÷'“²7v—F6‚&6²FòæÖVB7G&ö¶W2æB7F÷à¢Ò²Ò6fRô÷VâæBf–ævW"æf–vF–öâ&VÖ–â66WFVC²æF—fRW&6W"&Wf–WrVæF–ærà¢Ò·…ÒWFöÖFVBW&6W"7Fv–æröæòÖ÷÷VçF÷V6†VBFFö6†V6·ö–çBö6æ6VÂ÷7v—F6‚FW7G272à ¢22ã“ƒ‚W†—7F–ærÖw&÷WG&÷F÷vâ&W—"ò&VæFW&–ær&V7W'&Væ6P ¢Ò²ÒæF—fRW†—7F–ærw&÷WG&÷F÷vâ÷Vç2öâ•C²6VÆV7BW†—7F–æræÖRÂ76–vâæWrf6W2à¢Ò²Ò÷&–v–æÂw&÷WFW‡B–çWB7&VFW2æWræÖW3²&V÷Væ–ærd”UrÆ—7G27W'&VçBÖW6‚w&÷W2à¢Ò²Ò6VÆV7F÷"6†ö–6R6†ævW2æòvVöÖWG'’ö†—7F÷'’æB7F÷2&–÷"''W6ƒ²VæFõ&VFòffV7G27GVÂ76–væÖVçBà¢Ò²ÒW&6W#“ƒræB6fRô÷Vâ&VÖ–âFWf–6R&Wf–Ws²æó“ƒr52–æfW'&VBà¢Ò·…ÒWFöÖFVB7GVÂ÷F–öâ÷VÆF–öâö6†ævR6ÆÆ&6·2Â&Vg&W6‚öV×G’÷FW‡B6fWG’æB&WF–æVBWF†÷&–ær÷7G&ö¶R&Vw&W76–öç272à¢Ò²ÒõTã¢Æ÷vW"×&–v‡Bõd”UrÖVçR&Ææ²÷"vöæR–ã“ƒrâDôÒö†—B†VÇF‚FöW2æ÷B&÷fR—†VÂ&VæFW&–ærâ6VRFö72÷V’×&–v‡B×&Vv–öâÓ“ƒræÖBà ¢22ã“ƒ’d”UræVÂF–væ÷7F–72òã“ƒ‚66WFæ6P ¢Ò·…ÒW6W"53“ƒ‚&÷FV7G2æF—fRW†—7F–ærw&÷WG&÷F÷vâæB&VÆFVBWF†÷&–ærfÆ÷rà¢Ò²Òæ÷&ÖÂd”Ur÷67&öÆÂöw&÷W–6¶W"&VÖ–âW6&ÆRv—F‚FV'Vröfbà¢Ò²Ò–bfVÇB&V7W'2ÂFV'Vröââd”UrGFV×Bâ6GW&Rô6÷’&Vf÷&R&V6÷fW'“²&W÷'B–æ6ÇVFW2f–WtÖVçRæ÷VâÂæVÂæöFW2÷67&öÆÂæB&VæFW"÷7G&ö¶R7FFRà¢Ò²Òæòf÷&6VB&W&öGV7F–öâæVVFVB–bfVÇB'6VçC²&VæFW&–ær—77VR7F—2õTâà¢Ò·…Ò7GVÂ&W÷'Böö'6W'fW"FW7G2F—7F–æwV—6‚÷Vâö6Æ÷6VBöÖ—76–ærÂ6GW&R67&öÆÂöÖöFW2Â¶VWDôÒVæ6†ævVBæBfö–BÖV7W&VÖVçG2v†VâFV'Vröfbà ¢22ã““6Æ÷6VBd”Ur7W&f6RÆ–fV7–6ÆP ¢Ò²Òg&W6‚ÆVæ6‚÷&VÆöC¢&–v‡BT’G&vã²d”Ur6Æ÷6VB–æ—F–ÆÇ’Âæòv†÷7BæVÂ7W&f6Rà¢Ò²Ò&WVFVBd”Ur÷Vâö6Æ÷6RÂ67&öÆÂÂw&÷W–6¶W"æBFööÂ'WGFöç2&WF–â&V†f–÷"à¢Ò²ÒFV'Vr6Æ÷6VBd”Us¢æVÂF—7Æ–æöæR÷¦W&ò&V7C²÷Vâd”Us¢÷&F–æ'’æVÂ&÷VæG2÷67&öÆÂà¢Ò·…Ò÷&–v–æÂFööÆ&"ö7F–öâöæöFR–FVçF—G’Â&VÆV6RæBFV'VröWF†÷&–ær6†V6·272à¢Ò²ÒõTã¢æF—fR&–v‡B×&Vv–öâ&VæFW&–æs³““6Æ÷6VB×7W&f6R†&FVæ–ær—2æ÷BW&ÖæVçB&W—"&ööbà ¢22ã““6ö×7Bf6Vw&÷W–çBFö6° ¢Ò·…ÒW6W"53““&÷FV7G26Æ÷6VBd”Ur7W&f6RÆ–fV7–6ÆRæB66WFVBÖVçR÷–6¶W"&V†f–÷"à¢Ò²Ò÷Vâf6Vw&÷W–çB6öçG&öÇ26†÷w26ö×7BÄTeBFö6³²d”Ur6Æ÷6W2Âf6RÖöFR6VÆV7FVBF‡&÷Vv‚÷&–v–æÂ'WGFöâà¢Ò²ÒW†—7F–ærw&÷Wò6ö×ÆWFVBæÖRVF—B&×2–çC²W'6—7FVçB–çBôW&6R7v—F6‚v—F†÷WB&V÷Væ–ærd”Urà¢Ò²Ò6VÆV7FVBf6W2Gfæ6VB76–vâô6ÆV"õW6RæÖR&VÖ–ã²7G&ö¶W2õVæFõ&VFòõ6fT÷Vâ¶VW÷&–v–æÂ&V†f–÷"à¢Ò²ÒFöæR7F÷2''W6‚ö†–FW2Fö6³²ÖöFRöÆöö²öæ÷F†W"FööÂ6Æ÷6W2—BÂæf–vF–öâVæffV7FVBâ&V÷Vâ&WF–ç2÷&–v–æÂfÇVW2à¢Ò·…ÒWFöÖFVB÷&–v–æÂÖæöFR÷fÇVRöÆ—7FVæW"Æ–fV7–6ÆRÂFöæRÂ6öÖÖæB&÷WF–æræB7F—fR×FööÂ&VgW6Â6†V6·272à¢Ò²ÒæF—fR•BFö6²&VF&–Æ—G’÷F÷G—–ær÷–6¶W"vFRVæF–æs²¶VWvF6‚f÷"&VæFW&–ær&V7W'&Væ6Rà ¢22ã““&VæFW&–ær&V7W'&Væ6RWf–FVæ6P ¢Ò·…ÒæF—fS““d”Ur÷Vâö6Æ÷6RG&ç6—F–öç2æC““6Æ÷6VBF—7Æ–æöæR÷¦W&ò&÷VæG26öæf—&ÖVB'’&W÷'Bà¢Ò²Òd”ÄTBôõTã¢W6W"&–v‡B×&Vv–öâf—7VÂÆ÷72&V7W'2FW7—FR6÷'&V7BÖVçR7FFS²æòW&ÖæVçC““&W—"6Æ–Òà¢Ò²Ó““ÆVgBFö6²æF—fRU‚7F–ÆÂVæF–æs²&¶VBWF†÷&–æræöFW2ÆVv—F–ÖFVÇ’†fR¦W&ò&÷VæG2VçF–Â÷VæVBà¢Ò²Ò–bW'6—7FVçC¢6ö×&RÆVgBFö6²f—6–&–Æ—G’FòffV7FVB&–v‡B&Vv–öã²æò&WVB6çf2÷FövvÆRGV×&WVW7FVBà ¢22ã““"(	Bf6Vw&÷W6öÆ÷W"öæÖRÆ—7C²ã““W6W"52(	B#rö7Fö&W"##` ¥W6W"6öæf—&×3““–çB6öçG&öÇ2v÷&²w&VBgFW"&Vg&W6‚æBW‡Æ–6—FÇ’53““à¥&÷FV7B6ö×7BÆVgBFö6²Â÷&–v–æÂ6öçG&öÇ2ÂW'6—7FVçB–çBôW&6RÂFöæRæB7G&ö¶P¦†—7F÷'’öæf–vF–öââ67&VVç6†÷BC„T3C“$6†÷w2&–v‡Bd”Ur&÷&FW"ö&6¶w&÷VæBv—F€¦&Ææ²–çFW&–÷"&Vf÷&R&Vg&W6ƒ²¶VW–çFW&Ö—GFVçB&VæFW&–ærvFRõTâ–æFWVæFVçFÇ’à £““"&WÆ6W2W†—7F–ærw&÷WæF—fRG&÷F÷vâv—F‚&÷VæFVC#‚Æ–W"×7G–ÆRÆ—7C ¦öæRFF&vWBW"æÖVBw&÷WÂ6öÆ÷W"7vF6‚²6fRFW‡BæÖRÂ6VÆV7FVB×&÷r†–v†Æ–v‡Bà¤æÖRf–VÆB7F–ÆÂ7&VFW2æWrw&÷W3²6†ö÷6–ær&÷r&WW6W2÷&–v–æÂ–çWBæB&×0¦÷&–v–æÂ–çBÖöFRâ&÷w2&R&W6VçFF–öâöæÇ’ÂæòÖW6‚ö†—7F÷'’öÖFW&–Â×WFF–öâà¥6†&VBf6Tw&÷WÆWGFRW‡÷6W2U„5BW†—7F–ærf–Ww÷'BÖW6‚Ö÷&FW"övöÆFVâ×&F–ð¦6öÆ÷W"Ö²&÷F‚&VæFW&W"æBÆ—7BW6R—BâÆWGFR÷&W6VVBöÆ–v‡FæW72÷6GW&F–öâWFFP§7vF6†W2Â÷&–v–æÂ&VæFW&–ærÆv÷&—F†ÒVæ6†ævVBâ&÷w2¶VWæöFRöfö7W2–FVçF—G’öà§6VÆV7F–öâö6öÆ÷W"&Vg&W6ƒ²w&÷WÖVÖ&W'6†—&V'V–ÆG2Æ–÷WBöæÇ’v†Vâ6†ævVBà¥&Vg&W6‚7W'&VçBÖW6‚öâ÷VâÂæÖRöVF—B÷6VÆV7F–öâÂÆWGFR6†ævW2æBVWVVB÷&–v–æÀ¦&öG’&V'V–ÆG2‡7G&ö¶R6öÖÖ—BÂ7F—fRö&¦V7B7v—F6‚ÂVæFõ&VFò“²æòöÆÆ–æröæWrö–çFW ¦÷væW"âæÖW2&RFW‡D6öçFVçBÂæWfW"…DÔÂâV×G’Æ—7BW‡Æ–ç2æÖR²–çBv÷&¶fÆ÷rà¤ÆVv7““ƒ‚–6¶W"FW7G2Ö–w&FRFòæWrÆ—7BFFW"&W6W'f–ær7W'&VçBÖÖW6‚öæÖRöæð¦×WFF–öâ6÷fW&vS²æWr&VæFW&W"FW7G26÷fW"6VÆV7F–öâö–FVçF—G’öV×G’÷FW‡B6fWG’À¦÷&–v–æÂ''W6‚6ÆÆ&6²æB7vF6‚×Fò×&VæFW"ÖGG&–'WFR&—G’7&÷72ÆÃBÆWGFW2à¥7G&ö¶S“ƒröWF†÷&–æs“ƒRöFö6³““õUbõ–çBöÖ–âô×VÇF“ãæC““d”Ur'VÆRVæ6†ævVBà¥fÆ–FF–öã£“2F&vWFVB52ód”Âó6¶—²7–çF‚æBF–fb6†V6·272â&Wf–WvV@¦6†ævVB&VæFW"ö6÷&RöæWrÖÆ—7BæB6†VÆÂ÷&V6÷fW'’66†R¶W—3²æògVÆÂ×7V—FRöæF—fP§&VæFW&–ær&ööb6Æ–ÖVBâF†R&–÷#“ƒR6fR×FW‡B76W'F–öâæ÷rF&vWG2Æ—7BÆ&VÇ0¦–ç7FVBöbæF—fR÷F–öâ–×ÆVÖVçFF–öâã““"v—G2•BÆ—7B66WFæ6Rà ¤gWGW&RW6W"vöÃ¢f6Vw&÷W&÷VæF&–W2FVf–æRUb—6ÆæB6V×2ÂF†Vâw&÷W×F&vWFV@¦–ÖvRõ%"76–væÖVçBâVF—B÷&–v–æÂUbFÆ2÷6VÒ÷7F—F6‚æB–çBÖ6²öÖFW&–À¦÷væW'2f—'7Bâf—'7BÆ–¶VÇ’&÷WFR6†&VBFÆ2v—F‚W"Öw&÷WÖ6·2ö&¶–æs²6W&FP¦ÖFW&–Â6Æ÷G2&WV—&R&VæFW&W"÷6fRôô$¢ôtÄ"ôäôÒVF—BâF†—2'V–ÆBDôU2äõB–×ÆVÖVç@§Vçw&Ö'’Öw&÷W2÷"W"Öw&÷WÖFW&–Ç2ÂæB×W7Bæ÷B–×Ç’F†W’W†—7Bâ6ÖRÖæÖP¦F—66öææV7FVBf6RF6†W2Ö’––VÆB×VÇF—ÆR—6ÆæG3²vVöÖWG'’7F—2vVÆFVBà ¤DUd”4S““#¢÷Vâf6Vw&÷W2–çBFö6³²–çC"²w&÷WæÖW2Â–ç7V7B7vF6‚öæÖR&÷w2à¥F&÷w2æB–çBöW&6S²6VÆV7FVBæÖRö†–v†Æ–v‡BæBVæFõ&VFò&Vg&W6‚Æ—7BâF§W7@¥d”UrÆWGFR÷&W6VVBæB&V÷VâFö6³¢7vF6†W2föÆÆ÷rf–Ww÷'B&6R6öÆ÷W'2†Æ–v‡F–æp¦6â6†FRÖöFVÂ’âÆöæræÖW2öÖç’w&÷W27F’6ö×7C²FöæRöf–ævW"æf–vF–öâà ¢22ã““2(	Bf6RÇ’W†7BæF—fR×ö–çFW"6GW&R&W—"(	B#rö7Fö&W"##` ¥W6W"&W÷'G2Ç’W‡G'VFRW†7BFöW2æ÷Bv÷&²æBG&2F†RW6W"–âW‡G'VFRà¤VF—FVB7W'&VçBÖ–ãS“cvF##’ö'V–ÆC““"Â÷&–v–æÂf6R÷W÷&V6—6–öâöF—&V7B6öçG&öÆÆW"À¥Væ6–ÂvFRæBF‡&÷Vv‚fÆÆ&6²âæòæWrvVöÖWG'’Â†—7F÷'’÷"vW7GW&R÷væW"æVVFVBà¤6öæf—&ÖVB&Vw&W76–öã¢çVÖW&–2W†7BF—7F6†W2&W6W'fVB7–çF†WF–2ö–çFW#“ƒsbÂ'W@¦÷&–v–æÂö–çFW&F÷vâäB&Vv–äF—&V7DG&r6ÆÂæF—fR6WEö–çFW$6GW&Rf÷"—Bâ'&÷w6W'0§&V¦V7BF†—2æöæW†—7FVçBæF—fRö–çFW"v—F‚æ÷Df÷VæDW'&÷"âWfVçEF&vWB&W÷'G2†æFÆW ¦W†6WF–öç2æB6öçF–çVW2F—7F6ƒ²&Vv–â†BÇ&VG’6WBG&rÂÆVf–ærVæF–ær&W70¦Æ—fRFöòâö–çFW'W6ÆV'2VæF–ær&W72f—'7BÂÆVf–ærG&r6WC²÷WF†VâF—6&ÆW0¤W†7Bö–çWBôFöæR–æFVf–æ—FVÇ’âV&Æ–W"FW7G2W6VBæòÖ÷6GW&R7GV"æBÖ—76VB—Bà ¤öæÇ’'VçF–ÖR6†ævS¢÷&–v–æÂ×VÇF’Öf6RÖF—&V7B6GW&R†VÇW"6¶—2&W6W'fVBçVÖW&–0§ö–çFW#“ƒsbBÆÂF‡&VRW†—7F–ær6GW&R6—FW2â‡—6–6Â6öçF7G2&WF–âæF—fR6GW&RÀ¦÷&–v–æÂv–æF÷rÖ6GW&R6ö×ÆWF–öâÂFVÆ–&W&FRÖG&rF‡&W6†öÆBÂ6VÆV7F–öâÂ–æfW&Væ6RÀ¦vVöÖWG'’÷F÷öÆöw’÷&VgW6ÂõF‡&÷Vv‚6fWG’æB†—7F÷'’âW†7B7F–ÆÂ'Vç2÷&–v–æÀ¦6öçG&öÆÆW"æB6VÖçF–26öÖÖ—B6¶æ÷vÆVFvVÖVçC²æòæWrçVÖW&–2ÖöFVÆÆ–ær¶W&æVÂà¥÷WæB&V6—6–öâ6öFRVæ6†ævVBâ6†VÆÂöF—&V7B÷&V6÷fW'’¶W—3““2&Wf–WvVC²æòG–æÖ–0¦6†–ÆB6†ævW2â&÷FV7FVB×VÇF“ãÂÖ–âÂ66WFVB–6öç2ôf6Vw&÷Wõ–çBõUbög&÷¦VâVæ6†ævVBà ¥FW7B†VÇW"æ÷r÷F–öæÆÇ’ÖöFVÇ2'&÷w6W"6GW&R&V¦V7F–öâæBWfVçEF&vWBW†6WF–öà¦6öçF–çVF–öã²FVfVÇBf—‡GW&W27F–ÆÂF‡&÷rVæW‡V7FVBÆ—7FVæW"f–ÇW&W2â&Vf÷&R'VçF–ÖP§&W—"ÂæWrFW7G2&W&öGV6VBfÇ6RW†7B7V66W72&W7VÇBæB7G&æFVBG&vv–ær7FFRà¤gFW"&W—#¢&WVFVBW‡G'VFRô–ç6WBW†7BÂ6fR&VgW6ÂF†VâfÆ–B&WG'’Âæò7–çF†WF–0¦6GW&RöæòÆ—7FVæW"W'&÷'2öæòVæF–ærG&rÂ7GVÂ÷WÇ’ôFöæRÆ–fV7–6ÆRÂöæR†—7F÷'§7FWW"7V66W72æBVæFõ&VFò72â‡—6–6Â6GW&Rö6öÖÖ—Bö6æ6VÂ&WF–æVBâf–æÃ“¦fö7W6VB52ód”Âó6¶—‡ãRã'2’Â–æ6ÇVF–ær÷&–v–æÂf6R÷&WVB÷÷Wö6ÖW&õF‡&÷Vv‚ð¦æVvF—fRÖW‡G'VFR÷&VÆV6RFW7G3²7–çF‚öF–fb6†V6·272âæògVÆÂ×7V—FR÷"æF—fR&ööb6Æ–ÖVBà ¥6W&FS““"&VæFW&–ær&V7W'&Væ6RCS£3“£U£¢W6W"ö'6W'fVB&–v‡ET’Ö—76–ærv—F‚6çf0¦†–FFVâCCsC3‚ÂF†Vâ&W7F÷&VB6çf3SS#2âæF—fRd”Ur÷Vã3CS3"†B&÷VæG3““‚ócbó3cð£ƒã“ƒBæC“ƒ‚67&öÆÂ6öçFVçC²6Æ÷6VBæVÂ—2F—7Æ–æöæR÷¦W&ò&÷VæG2âFööÆ&"Æ–÷WBð¦†—G2†VÇF‡“²v—¦Öò&W6VçC“gƒ“bCsS"ãsRóCC2ã#3Bâ7GVF–ò÷fW&Æ’÷6—G“âw&÷WÖÆ—7@¦÷F–öä6÷VçB÷6VÆV7FVD–æFW‚çVÆÂ—2W‡V7FVBf÷#““"D•bÆ—7BÂæ÷BæF—fR×6VÆV7Bf–ÇW&Rà¤æò7GVÂ67&VVç6†÷BöffV7FVB&Vv–öâ–FVçF–f–VB–âF†—2&W÷'C²Fòæ÷B–æfW"æWp§&VæFW&–ær6W6R÷"wV&çFVVB†–FS4B&V6÷fW'’â–çFW&Ö—GFVçB&–v‡B×&Vv–öâf—6–&–Æ—G§&VÖ–ç2õTã²æò&VæFW&–ær6†ævW2–ã““2ã““"Æ—7BFWf–6R66WFæ6R7F–ÆÂVæF–æs°£““52&WF–æVBâf6Vw&÷W×6VÒUböÖFW&–Âv÷&²&VÖ–ç2gWGW&RÂæ÷B6†—VBà ¤DUd”4S““3¢6öæf—&Ó““3²6VÆV7B7V&Rf6RÂW‡G'VFRÂVçFW#ã"†÷"6öçfVæ–VçBÖöFVÂVæ—G2’À¤Ç’W†7BGv–6S²&÷F‚÷W&F–öç26öÖÖ—BæBFöæRW†—G2âVæFõ&VFòV6‚7FWâ&V÷Và¦æBG'’fÆ–BæVvF—fR&V6W73²&VgW6VBfÇVR×W7B7F–ÆÂÆÆ÷rFöæRæBÆFW"&WG'’à¤÷&F–æ'’Væ6–ÂG&rF†VâFöæS²–ç6WBW†7B6æ—G’6†V6²âvF6‚W†—7F–ær&–v‡B×&Vv–öà¦fVÇB6W&FVÇ’âæW‡Bö'F–âFWf–6RW†7BöW†—BfVVF&6²&Vf÷&RfVGW&RW‡ç6–öâà ¢222ã““2V&Æ–6F–öâ7FGW0 ¥'VçF–ÖR÷FW7FVBÆö6Â6öÖÖ—B#–fVCS#&c“VScfSƒ&CS†c“#sf66“Fc†F"ÂG&VP¦&Cs†“–#†&36#C“CvSs6FSfVF6cƒFVC‚âÆÃ“fö7W6VBFW7G272âW6‚v0¦&Æö6¶VBGv–6R'’WFöÖF–2&÷fÂ&Wf–WrâÆ—fS““"öÖ–ãS“cvF##’&VÖ–ç2F†RÆ7@§fW&–f–VBV&Æ–6F–öã²Fòæ÷BFW67&–&S““226†—VB÷"6²f÷"FWf–6S““2FW7G2–WBà¥&Wf–Wr&V¦V7FVB7FæF–ærWF†÷&—¦F–öâ–â&WG&–WfVB•õtõ$´dÄõræÖB2–ç7Vff–6–Vç@¦VæB×W6W"WF†÷&—¦F–öâ–âF†—2G&ç67&—Bâv—BW‡Æ–6—BW6W"6öæf—&ÖF–öâFòW6€¦æBV&Æ—6ƒ““2FòÖ–ã²Fòæ÷B'—72&V¦V7F–öâv—F‚6öææV7F÷"÷"ÇFW&æFRG&ç7÷'Bà¤gFW"&÷fÂW6‚VæF–ærÆö6Â6öÖÖ—G2ÂfWF6‚Ö–âÂfW&–g’&VÆV6R÷–ç2æBÆ—fP¦'—FW2ÂF†Vâv—fRDUd”4S““26†V6·2âæò'VçF–ÖRVF—G2gFW"fÆ–FF–öâà ¢22ã““B(	BF—7F–æ7BæF—fRäôÒf6Vw&÷W6öÆ÷W'2(	B#rö7Fö&W"##` ¥W6W"&W÷'G26—‚W‡÷'FVBw&÷W2'&—fR–âæöÖB2æV"Ö–FVçF–6Â6öÆ÷W"—'2à¤VF—Bf÷VæBæF—fRäôÒÖW6…'B7–6ÆW2F†RFöæ÷"FV×ÆFRw2D…$TRw&÷W6öÆ÷W'3°§6—‚vVæW&FVBw&÷W2F†W&Vf÷&R6öçF–âöæÇ’F‡&VRVæ—VR$t"G&—ÆW2âæWrFW7@§&W&öGV6W32×fW'7W3b&Vf÷&R&W—"âtÄ"Ç&VG’vVæW&FW2vöÆFVâ×&F–ò×76VB6öÆ÷W'0¦f÷"æWrw&÷W2æBFVÆ–&W&FVÇ’&W6W'fW2–×÷'FVBæöÖBw&÷W6öÆ÷W'3²Væ6†ævVBà ¤æF—fRäôÒæ÷r&WW6W2W†—7F–ærf6Tw&÷WÆWGFS““"f÷"ÆÂW‡÷'FVBæÖVBw&÷W2À§W6–ær÷&–v–æÂW‡÷'FVBf6R÷&FW"öæÖW2ÂFVfVÇB76VBÆWGFRæBÆ–æV"$t"à¤æòæWrÆWGFRÆv÷&—F†ÒâF†—2—2f6Vw&÷WF—7Æ’ÖWFFFÂæ÷B–çBÂfW'FW€¦6öÆ÷W"ÂÖFW&–Â÷"FW‡GW&R76–væÖVçBâw&÷W”G2öæÖW2ö&÷VæF&–W2ÂvVÆFVBvVöÖWG'’À¥Ug2Â%"Ö2ÂFöæ÷"FV×ÆFR'—FW2Â6÷W&6RÖW6‚æB†—7F÷'’&VÖ–âVæ6†ævVBâæF—fP§VææÖVBf6W27F–ÆÂÖFò÷&–v–æÂÖ–âw&÷WâFöW2æ÷B&öÖ—6Rd”Ur7W7FöÒÆWGFRð§&W6VVBf–FVÆ—G’÷"6†ævR&W6W'fVBtÄ"6öÆ÷W'2â'VçF–ÖR6†ævRôäÅ’æF—fRW‡÷'FW#°§6¶VBÖÖ÷æVÂôÆ"f–ÆW26†ævRÆöFW"–ç2öæÇ’Fò&Vg&W6‚F†R÷&–v–æÂw&‚à¥&Wf–WvVC““B6†VÆÂ÷&V6÷fW'’÷æVÂ÷6¶VBö6÷&RôÆ"¶W—2æB6†&VBÆWGFS““"&VfW&Væ6Rà¤×VÇF“ãöÖ–âö66WFVC““"Æ—7Bó““2W†7Bög&÷¦Vâ'—FW2Væ6†ævVBà ¥fÆ–FF–öã3’fö7W6VB52ód”Âó6¶—‡ã’ãg2“¢æF—fRäôÒõUbö6öÆ÷W"öæ÷&ÖÂöVÖ—76—fRð§66Æ"÷6¶VBöF—7Æ6VÖVçBöW‡÷'BFW7G2Ã““"7vF6‚Æ—7BÃ““2W†7BæB&VÆV6R6öçG&7G2à¥6—‚æÖVB7V&Rw&÷W2æ÷r†fR6—‚FWFW&Ö–æ—7F–2$t"G&—ÆW2v—F‚ÆÂ—'v—6R$t ¦F—7Fæ6W3âã#²ÆÂ6—‚f6R×FòÖw&÷W”G2æB6÷W&6RÖW6‚&WF–æVBâW†—7F–ær&–æ'’ð§FW‡GW&Röw&÷W&÷VæB×G&—FW7G272â7–çF‚öF–fb6ÆVââæòæF—fRæöÖB÷"gVÆÂ×7V—FP§&ööb6Æ–ÖVBâ–çFW&Ö—GFVçB&–v‡B×&Vv–öâ&VæFW&–ær&VÖ–ç2õTâÂVç&VÆFVBFòF†—2f—‚à ¤Äô4ÂôäÅ“¢–æ6ÇVFW2VæF–æs““2W†7B&W—"âV&Æ–6F–öâ&VÖ–ç2&Æö6¶VB'’F†P§&–÷"WFöÖF–2&÷fÂ&Wf–Ws²æòGFV×BFò'—72÷"&WW6‚âv—BW‡Æ–6—BW6W ¦6öæf—&ÖF–öâFòW6‚÷V&Æ—6ƒ““BFò6†&VBÖ–âöÆ—fRâÆ—fS““"—2Æ7BfW&–f–VBà¤gFW"&÷fÂÂV&Æ—6‚VæF–ærÆö6Â6öÖÖ—G2æBfW&–g’&VÖ÷FR6†VÆÂ÷–ç2öÆ—fR'—FW2à¤DUd”4S““BeDU"T$Ä”4D”ôã¢æF—fRäôÒW‡÷'Böb6—‚F–ffW&VçFÇ’æÖVBf6Vw&÷W3°¦÷VâæöÖBæBVæ&ÆRf6Vw&÷WF—7Æ’ÂfW&–g’6—‚F—7F–æ7B6öÆ÷W'2æB6—‚6÷'&V7@§&Vv–öç2öæÖW3²vVöÖWG'’÷FW‡GW&RV&æ6R–çF7Bâ&WFW7C““2W†7BGv–6RôFöæRõVæFõ&VFòà¤–bW6W"w27GVÂW‡÷'Bv2tÄ"÷"ô$¢Â6²f÷"f÷&ÖBöf–ÆS²æF—fRFöæ÷"Ö7–6ÆRFVfV7@¦—26öæf—&ÖVBÂ'WBFòæ÷B6Æ–Ò—BF–væ÷6W2WfW'’f÷&ÖBw26–Ö–Æ"Ö6öÆ÷W"&V†f–÷"à ¢227FæF–ærV&Æ–6F–öâ&÷fÂ(	B&Vff—&ÖVB#rö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’7FFW2–âF†—2FWfVÆ÷ÖVçB6†C¢(	Ä&÷fÂ—2Åt•2v—fVâÒw&—FP§F†B–çFòF†R†æF÷fW"æ÷FW2î(	ÒF†—2&Vff—&×27FæF–ærWF†÷&—¦F–öâf÷"&÷„Æ ¦6öÖÖ—G2ÂW6†W2F—&V7FÇ’FòÖ–âÂæBv—D‡V"vW2V&Æ–6F–öâÂ–æ6ÇVF–ærVæF–æp¦'V–ÆC““BæB—G3““2W†7B&W—"â6ö×ÆWFRfÆ–FF–öâÂ6öÖÖ—B÷W6‚æBfW&–g’&VÆV6P¦Ö&¶W'2öÆ—fR76WG2v—F†÷WB6¶–ærf÷"V&Æ—6†–ær&÷fÂv–ââWF†÷&—¦F–öâ—0¦f÷"&÷„Æ"FWfVÆ÷ÖVçC²Vç&VÆFVBW‡FW&æÂ7F–öç2&R÷WG6–FRF†—266÷Rà¥F†RV&Æ–W#““2ó““B&÷fÂÖ&Æö6²æ÷FW2&VÆ÷r&R†—7F÷&–6ÂæB7WW'6VFVB'’F†—0¦W‡Æ–6—BW6W"6öæf—&ÖF–öââF†W’&Ræ÷B6öçF–çV–ær&WV—&VÖVçBFò6²v–âà¤–bgWGW&RWFöÖF–2&Wf–Wr7F–ÆÂ&Æö6·2V&Æ–6F–öâÂ&W÷'B—G27GVÂ&V6öã°¦Fòæ÷BÖ—77FFRF†RW6W"w27FæF–ærWF†÷&—¦F–öâ÷"'—72&V¦V7F–öâà ¤7W'&VçBFVÆ—fW'“£““B'VçF–ÖSƒ“f2–æ6ÇVFW2æF—fRäôÒF—7F–æ7Bw&÷W6öÆ÷W'2æ@£““2f6RW†7B6GW&R&W—"ã“fö7W6VC““26†V6·2æC3’fö7W6VC““B6†V6·276VC°§F†W6R÷fW&Æ–ær6WG2&Ræ÷B6öÖ&–æVBF—7F–æ7BFW7B6÷VçBâFWf–6R66WFæ6R—0§VæF–ærâ–çFW&Ö—GFVçB&–v‡B×&Vv–öâ&VæFW&–ær&VÖ–ç2õTââV&Æ—6‚VæF–ær6öÖÖ—G2À§fW&–g’7W'&VçBÖ–âæBÆ—fRfW'6–öâö–æFW‚öF—&V7BöW‡÷'B÷6¶VBö6÷&R÷ÆWGFR76WG2À§F†Vâ&÷f–FR6†÷'BDUd”4S““BæBDUd”4S““2†æG2Ööâ6†V6·2à ¢22ã““BV&Æ–6F–öâfW&–f–VB(	B#rö7Fö&W"##` ¥V&Æ—6†VB'VçF–ÖR3VF#&SSfC&sC#S“cCs&#FVfCSsf–CSÂG&VP¦CCcF#–ScsSf3“Cs3&fff–c&sF#‚ÂW†7FÇ’ÖF6†W2FW7FVB÷WÆöFVBÆö6À¦6#“s3“‚G&VRâÆÃr6†ævVB&Æö'2fW&–f–VB&Vf÷&RFöÖ–2æöâÖf÷&6VBÖ–âWFFRà¤fWF6†VB÷&–v–âöÖ–â6öæf—&×2'VçF–ÖR6öÖÖ—B÷G&VRâvW3CCSƒs#3c3’6ö×ÆWFVB5T44U52à¤ÆÃg&W6‚Æ—fR6†V6·2'—FRÖÖF6ƒ¢fW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÆ×VÇF’Öf6RÖF—&V7BÀ¦æöÖBÖW‡÷'BÖ6÷&RÆæöÖB×6¶VBÖÖ2ÆW‡÷'BÖ2×æVÂÆf6Vw&÷WÖ6öÆ÷W'2Ö6÷&RÄÆ"ÆöFW"À¤•ô„äDôdbæÖBæB•õtõ$´dÄõræÖBâ6WfVâf–æÂ&VÆV6R6†V6·272â†÷7FVBgVÆÀ¥F÷öÆöw“CCSƒs#SSSRv2–â&öw&W72v†Vâ6†V6¶VC²æò†÷7FVBgVÆÂ×7V—FR526Æ–ÖVBà¤æò'VçF–ÖR6†ævW2gFW"fö7W6VBfÆ–FF–öââF†—2V&Æ–6F–öâ&ööb—2Fö72ÖöæÇ’à¥W6W"7FæF–ær&÷fÂ—2&Vff—&ÖVB–âD„•26†BæB•õtõ$´dÄõrô•ô„äDôdc²æð¦gW'F†W"V&Æ–6F–öâW&Ö—76–öâVW7F–öâf÷"&÷„Æ"â†—7F÷&–6ÂÄô4ÂôäÅ’ö&÷fÀ¦&Æö6²VçG&–W2&R7WW'6VFVBâ'V–ÆC““B—2Ä•dRæB$TE’dõ"DU5D”ärÂ–æ6ÇVFW3““2à¤DUd”4S““C¢æF—fRäôÒ6—‚æÖVBw&÷W2†fR6—‚F—7F–æ7B6öÆ÷W'2ö6÷'&V7B&Vv–öç3°§FW‡GW&W2Væ6†ævVBâDUd”4S““3¢f6RÇ’W†7BGv–6RÂFöæRÂVæFõ&VFó²–ç6WBW†7@¦æB÷&F–æ'’Væ6–ÂG&r6æ—G’ã““"f6Vw&÷WÆ—7B66WFæ6R7F–ÆÂVæF–æs³““50§&÷FV7FVBâ&V7W'&–ær&–v‡B×&Vv–öâ&VæFW&–ær&VÖ–ç2õTââæW‡B7BöâFWf–6RfVVF&6²à ¢22ã““R(	Bd4Tu$õUf6R&F–ÂæBDB³²ã““BW6W"52(	B#rö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’56W3““C²&÷FV7BæF—fRäôÒF—7F–æ7Bw&÷W6öÆ÷W'2æC““2W†7@¤W‡G'VFRô–ç6WB6GW&RôFöæRõVæFõ&VFò&W—"âW6W"6·2f6R&F–Âd4Tu$õUv—F€¦Æ–æWv÷&²7V&R÷&VBÖw&VVâ×–VÆÆ÷rf6W2ÂWFöÖF–2f6Vw&÷W2Æöö²Â÷&–v–æÂÆVgBÆ—7BÀ¦æBDB²çVÖ&W&VBæWrw&÷W2âW†—7F–ærFö6²÷7G&ö¶RöWF†÷&–ær÷ÆWGFR&VÖ–â÷væW'2à ¤f6R&F–Âæ÷r†3#BFööÇ2âd4Tu$õU&WW6W2÷&–v–æÂ6f6Vw&÷W÷Vå–çBF&vW@¦f÷"–çfVçF÷'’'WBÆVæ6†W2÷&–v–æÂFö6²4TÔåD”4ÄÅ’†æò†–FFVâd”Ur'WGFöâ6Æ–6²’à¤—B6VÆV7G2÷&–v–æÂf6Vw&÷W2Æöö²Â6Æ÷6W2d”UræB÷Vç26ÖRÆVgBFö6²öæÖRöÆ—7Bð¥–çBôW&6R÷6VÆV7FVBÖf6RæöFW2â÷&–v–æÂWF†÷&–ærVF—F&ÆR×F&vWBvFR—26†&V@§v—F‚76–vâÂæ÷B6÷–VC²Æö6¶VB÷&VfW&Væ6RöÆ–æ¶VBöÆ—fRÖÖöF–f–W"÷FööÂ×6W76–öâö7F—fRÐ¦G&rF&vWG2&VgW6RâFöæR7F÷2''W6‚Â&·26öçG&öÇ2æBVÖ—G2÷&–v–æÂf6R‡V ¦6ö×ÆWF–öâöæ6S²æ÷F†W"&F–ÂFööÂ÷"ÖöFR÷6W76–öâ6†ævR6Æ÷6W2F†RFö6²à ¤ÆÃ#2&RÖW†—7F–ærf6RF&vWG2ÂÆ&VÇ2Â–6öç2ÂævÆW2÷&F–’æB7&÷72ÖÖöFR6†&V@§Æ6VÖVçG2&VÖ–âU„5DÅ’Væ6†ævVBâd4Tu$õUf—G2&WGvVVâ÷&–v–æÂ&–æw2C33+ð§#c‚v—FƒsGƒcF&vWBæB÷&–v–æÃ3'‚–6öâ÷6ÖÆÂF—FÆRf÷&ÖBâF‡&VR5dr7V&Rf6W0§&VBöw&VVâ÷–VÆÆ÷rv—F‚Æ–v‡BÆ–æWv÷&²âæWr'WGFöâ†2æò&÷VæG2÷fW&Æv—F‚ç’öÆ@¦'WGFöââb×6V7F÷"÷WFW"&VfÆ÷rv26öç6–FW&VB'WB&V¦V7FVB&V6W6R—BF—7Æ6V@§6†&VB7&÷72ÖÖöFR6Æ÷G3²æ÷B6†—VBâæòVç&VÆFVB–6öâ&W6¶–â÷"ö–çFW"÷væW"à ¤DB²–6·2Væ—VRw&÷WâÂ–æ7&VÖVçF–ær7B7W'&VçBöW†—7F–æröG&gBçVÖ&W'3²FG0§6fR6öÆ÷W"öæÖR&÷ræB&×2÷&–v–æÂ–çBâFöW2äõB–ÖÖVF–FVÇ’&V76–vâ7W'&Vç@§6VÆV7F–öâ÷"7&VFR†—7F÷'’âV×G’w&÷W2&RT’G&gG266÷VB'’7GVÂö&¦V7@¦–FVçF—G’–âvV´ÖÂ7W'f—f–ærFö6²6Æ÷6R÷&V÷Vâöö&¦V7B7v—F6†W2–âF†—26W76–öâà¥F†W’&R6fVBöW‡÷'FVBôäÅ’gFW"–çF–ær÷"76–vâ6VÆV7FVBF‡&÷Vv‚W†—7F–æp¦f6Tw&÷W2ÖWFFFâT’W‡Æ–6—FÇ’6—2–çBö76–vâFò6fS²æòæWr&ö¦V7B66†VÖà¥&VÆöB÷&ö¦V7B&WÆ6VÖVçBG&÷2VçW6VBG&gG2â76–væVBw&÷W2&WF–â÷&–v–æÀ§ÆWGFS²G&gG2&Wf–Wr7V'6WVVçB76VB6öÆ÷W'2f–4ÔRÆWGFR†VÇW"â–çF–æp¦÷WBöbG&gB÷&FW"&Vg&W6†W27vF6†W2Fò7GVÂÖW6‚Ö÷&FW"6öÆ÷W'2†æ÷Bf—†V@§W6W"Ö6†÷6Vâw&÷W6öÆ÷W'2’âÆWGFR÷&W6VVB6öçG&öÇ2&VÖ–â–âd”Urâ6fRæÖW2æ@¦–çFVvW"ÖÆ–Ö—BçVÖ&W&–ærFW7FVC²æò…DÔÂ–ç6W'F–öâöÖöFVÂõUböÖFW&–Â÷–çB6†ævW2à ¥fÆ–FF–öãcRF&vWFVB52ód”Âó6¶—‡ããw2’Â–æ6ÇVF–æs‚æWrG&gB÷&VÂÖ6öçG&öÂð§6VÖçF–2&F–Â÷&VÂFö6²FöæRFW7G2ÂÆÂW†—7F–ærf6Vw&÷WFF÷ÆWGFRö''W6‚ð¦W&6W"öWF†÷&–ær÷6VÆV7F÷"öFö6²Â&F–ÂÖöFW2÷6†&VB÷6—F–öç2Â66WFVC““BW†7Bð¤äôÒÂæB&Wf–WvVB&VÆV6R6öçG&7G2âÆÃ#BVÖ&VFFVBf6R5dw2'6S²7–çF‚æ@¦F–fb6ÆVââW†—7F–æss’f6R6÷VçC#>(i##B—26öÆR&F–Â6öçG&7BW‡ç6–öã²÷&–v–æÀ¦÷WFW#\9s#L+æB6†&VBVFvRõfW'FW‚6Æ÷G27F’&÷FV7FVBâ–6¶W"öFö6²f—‡GW&W2FFV@§FòF†R÷&–v–æÂ6†&VB÷Vâ÷væW"æBG&gBFFW"v—F†÷WBG&÷–ær6÷W&6R÷6VÆV7F–öâð§&VgW6Â6†V6·2âæògVÆÂ×7V—FR÷&VæFW&VBÖ'&÷w6W"öæF—fR•B&ööb6Æ–ÖVBà ¤6†ævVB'VçF–ÖS¢÷&–v–æÂ&VæFW"ÖÖöFW2Â6ÖÆÂG&gG2†VÇW"Â÷&–v–æÂÆ—7BæB6†&V@¦VF—F&ÆRÖWF†÷&–ærvFS²7G&ö¶R6†ævW2–×÷'B–âôäÅ’âF÷FÂv—¦Öò6†ævW2öæP¦'WGFöâöf–Æ&–Æ—G’÷6VÖçF–2ÆVæ6‚ö6ö×ÆWF–öââ&Wf–WvVB6†VÆÂ÷&VæFW"÷7G&ö¶RöWF†÷"ð¦Æ—7BöG&gG2öv—¦Öòö–6öâ÷&V6÷fW'“““R66†R6Æ÷7W&Râf6Vw&÷WÆWGFS““"æBæF—fRäôÓ““BÀ£““2W†7BÂÖ–âô×VÇF“ãõUbõ–çBövVöÖWG'’ög&÷¦Vâ'—FW2Væ6†ævVBà ¥&–v‡BÖ†æB&VæFW&–ær—77VR7F—2õTââ&Wf–WvVBÆFW7C““"6GW&S¢d”UræF—fR÷Vâð¦6Æ÷6RæBW‡Æ–6—B¦W&ò×6—¦VB6Æ÷6VBæVÂv÷&³²6çf2†–FRF–Bæ÷B&W7F÷&R&–v‡ET“°§7G–ÆW2ö†—B7F6·26ææ÷BW7F&Æ—6‚f—6–&ÆR—†VÇ2âF†—2'V–ÆBFG2F—&V7BÄTeBFö6°¦66W72'WBDôU2äõB6Æ–Ò6ö×÷6—F÷"÷&–v‡BÖÖVçR&W—"â&WF–âW†—7F–ærF–væ÷7F–70¦æBW6W"f–ÆR&Vg&W6‚F—7Æ“²Fòæ÷B&WVB&÷fVâÖ–ç7Vff–6–VçB&ÇW"ö6Æ÷6VBÖFWF–Ç2ð¦6çf2ÖöæÇ’W‡ÆæF–öç2÷"f÷&6Ræ÷F†W"–FVçF–6ÂGV×âgW'F†W"&VæFW&–ærv÷&°§&WV—&W2f—6–&ÆRffV7FVB&Vv–öâ÷7G'V7GW&Â&W&öGV7F–öâÂæ÷B7V7VÆF—fR5526‡W&âà ¤7W'&VçB'VçF–ÖR÷V&Æ–6F–öâWf–FVæ6RÆ—fW2–âFö72÷V&Æ–6F–öâÓ““RæÖB†6öÖÖ—B÷G&VRÀ¥vW2öÆ—fR6†V6·2æB†÷7FVB7FGW2“²6öç7VÇB—B&Vf÷&RFW67&–&–ærV&Æ–6F–öâà¥7FæF–ærW6W"W6‚÷V&Æ—6‚&÷fÂ&VÖ–ç27F—fS²Fòæ÷B6²v–âà¤DUd”4S““S¢f6R6VÆV7N(i'&F–Âd4Tu$õU7V&S²WFòf6Vw&÷W2Æöö²²÷&–v–æÂÄTe@¦Æ—7BâDB²GvòæWrçVÖ&W&VB&÷w2öF–ffW&VçB7vF6†W2Â–çBV6‚öW&6S²VæFõ&VFòöæP§7FWW"7G&ö¶RâFöæ^(i'&F–Âv–ã²÷&F–æ'’f6RW†7BæBf–ævW"æf–vF–öâà¥6fT÷Vâ–çFVBw&÷W3²VçW6VBG&gG2&R–çFVçF–öæÆÇ’æ÷B6fVBâvF6‚&–v‡Bd”Up¦ÖVçR6W&FVÇ“²–b&V7W'&Væ6RÂ67&VVç6†÷Bö–FVçF–g’f—6–&ÆR&VÂæòf÷&6VB&V7&VF–öâà¤æW‡BföÆÆ÷ræF—fS““RfVVF&6³²f6Vw&÷W×6VÒUböÖFW&–Âv÷&²&VÖ–ç2FVfW'&VBà ¢22ã““b(	Bf–ÆRÖVçR'&ævVÖVçBg&öÒW6W"–ÖvR(	B#rö7Fö&W"##` ¥W6W"&WVW7G2f–ÆRÖVçR÷&FW"öf÷&ÖBg&öÒGF6†VB”Ôuóƒ33’çærâVF—FVB7W'&Vç@¦Ö–ãCFF##–b÷'VçF–ÖS““RÂW†—7F–ær6†VÆÂôf–ÆRöW‡÷'B÷&ö¦V7BöFV'Vr–ç7FÆÆW'2æ@§f–Ww÷'BÖ6öçF–æVBÖVçR7G–ÆW2âæó““R52–æfW'&VC³““B52&VÖ–ç2&÷FV7FVBà ¤f–ÆRÖVçRæ÷r†2f÷W"6VÖçF–26V7F–öç2–â&WVW7FVB÷&FW#¢÷&–v–æÂ÷Vâæ&÷†Æ ¦g&öÒf–ÆW2æB6fRæ&÷†Æ#²–×÷'B„VF—F&ÆRõ&VfW&Væ6RÂ7Æ—Bw&÷W2Â–×÷'B“°¤W‡÷'B†f–ÆVæÖRÂf÷&ÖBô$¢ôtÄ"ÂvVöÖWG'’&6Rõ7V$BÂW‡÷'Bõ6fRÂäôÔB“²WF–Æ—F–W0¢„†öÖR67&VVâÂ&W6WBÂT’FV'VrÂ&Vg&W6‚F—7Æ’Â6†V6²&ö¦V7B6æ6†÷B’â6†VÆÀ§7WÆ–W2æÖVB6Æ÷G3²÷&–v–æÂ&ö¦V7BöFV'Vr–ç7FÆÆW'2VæB4ÔR÷&–v–æÂ'WGFöç2À¦–çWG2÷7FGW2æöFW2öÆ—7FVæW'2F†W&Rv—F‚W†—7F–ærÖ†÷7BfÆÆ&6·2âæò6Æöæ–ærÂ6V6öæ@¦ÖVçRö†æFÆW"Âö'6W'fW'2Â¶W–&ö&B÷F"Ö÷&FW"552G&–6·2÷"æWr6fRöW‡÷'B÷væW'2à¤÷&–v–æÂV–6²ô$¢æBÆ"Æ–æ²æöFW2&VÖ–â†–FFVâf÷"ÆVv7’÷væW'3²GWÆ–6FP¥V–6²ô$¢ôÆ"VçG'’—2öÖ—GFVBg&öÒf—6–&ÆR&WVW7FVBÖVçRà ¥66÷VBf–ÆRÖÖVçRæ772v—fW26öç6—7FVçB6V7F–öâ'VÆW2öv2÷WW&66R†VF–æw2Ã3#€§f–Ww÷'BÖ&÷VæFVBv–GF‚Ã3g‚7F–öâF&vWG2Ã3'‚6VvÖVçFVB6öçG&öÇ2ÂÆ–væVBf–ÆVæÖP¦f–VÆBæB&VF&ÆS'‚FW‡BâÖ‚Ö†V–v‡BG&6·2÷&–v–æÂF÷&"÷6fR&V²fW'F–6À§67&öÆÂ÷F÷V6‚×âö÷fW'67&öÆÂ6öçF–æÖVçB&VÖ–ââ†–FFVâGG&–'WFW2†öæ÷&VC²V×G§6Æ÷G2÷7FGW2Fòæ÷BÆVfRv2âæòæWr&ÇW"öf–ÇFW"÷G&ç6f÷&Òö6öçF–âö6ö×÷6—F÷"†–çBà¤÷F†W"T’7G–ÆW2Væ6†ævVBâF†—2FöW2æ÷B&W—"&V7W'&–ær&–v‡B×&Vv–öâ&VæFW&–ærà ¥'VçF–ÖR6†ævW2öæÇ’6†VÆÂöÆ–÷WB7G–ÆW6†VWBæB÷&–v–æÂö&¦V7BÖÖævVÖVçBöFV'Vp¦–ç7FÆÆW"FW7F–æF–öç2â&ö¦V7B6öFV2ö†—7F÷'’÷6fRö÷VâövVöÖWG'’÷6VÆV7F–öâÂW‡÷'Bð¤äôÒ÷–çBõUbó““Rf6Vw&÷Wó““2W†7Bô×VÇF“ãög&÷¦VâVæ6†ævVBâ&Wf–WvVC““b6†VÆÂöæWp¤552÷&ö¦V7BÖ–ç7FÆÆW"öFV'Vr÷&V6÷fW'’–ç2æB76WB†6†W3²–çFW&æÂ7F×2&WF–æVBà¤ÆÂ÷&–v–æÂf–ÆR7F–öâö–çWB”G2&WF–æVBöæ6Râ…DÔÂ6V7F–öç2ö÷&FW"÷Væ—VR”G0¦6†V6¶VBâW†—7F–æsSÖVçR–çWBö6öæf–röæÖRöÆ–÷WB÷FööÆ&"÷&ö¦V7B÷VâôtÄ"÷–çBð¦F—7Æ’×&Vg&W6‚÷&VÆV6R6†V6·252ód”Âó6¶—‡ãã'2“²¥27–çF‚öF–fb6ÆVââæð¦æWr6÷6ÖWF–2FW7G2÷"gVÆÂ×7V—FRöæF—fR&VæFW&VB&ööb6Æ–ÖVBâV&Æ–6F–öâ6öÖÖ—Bð§G&VRöÆ—fRWf–FVæ6R—2&V6÷&FVB–âFö72÷V&Æ–6F–öâÓ““bæÖB&Vf÷&R6ö×ÆWF–öâà ¤DUd”4S““c¢f–ÆR6†÷w2÷Vâõ6fRf—'7BÂF†Vâ–×÷'BôW‡÷'B÷WF–Æ—F–W22–ÖvS²76–ærÀ¦f–ÆVæÖR÷6VvÖVçFVB6öçG&öÇ2&VF&ÆRâ67&öÆÂFò&÷GFöÒ–âÆæG66RæB÷'G&—Bà¥6fRô÷VâFW7Bæ&÷†Æ#²–×÷'BöW‡÷'BæBäôÔB÷&–v–æÂ7F–öç3²&Vg&W6‚F—7Æ§7F–ÆÂf–Æ&ÆRâFòæ÷B&W6WBv÷&¶–ærÖöFVÂFòFW7B7G–Æ–ærâ&–v‡BÖÖVçR&VæFW&–æp§&VÖ–ç2õTã³““Rf6Vw&÷WFWf–6R66WFæ6R7F–ÆÂVæF–ærâ7FæF–ærV&Æ–6F–öà¦&÷fÂ&WF–æVBâæW‡BföÆÆ÷s““bÖVçRö•B76–æræC““RFööÂfVVF&6²à ¢22ã““r(	BW‡FW&æÂ÷&–v–æÂd”Ur7W&f6S²ã““bW6W"52(	B#rö7Fö&W"##` ¥W6W#““b52&÷FV7G2'&ævVBf–ÆRÖVçRÂ÷&–v–æÂ7F–öç2æB76–ærâW6W"æ÷p¦–FVçF–f–W2ffV7FVB7W&f6R&V6—6VÇ“¢d”Ur÷WFW"g&ÖRFövvÆW2'WB—G26öçFVçG0¦æWfW"G&râ&W÷'C““bCs£C£e¢6†÷w2÷VãC3#ƒ’óCs#SRÂ6Æ÷6VCCS32óSC“srâ÷Và§æVÃ““‚ócbó3cóƒã“ƒBÇ67&öÆÄ†V–v‡C“ƒö6Æ–VçD†V–v‡Cƒ²7GVÂ6GW&F–öâöÆ–v‡FæW72ð§&W6WB6öçG&öÇ2†fRæ÷&ÖÂÆ–÷WB&÷VæG2â6Æ÷6VBF—7Æ–æöæR÷¦W&ò&÷VæG2v÷&·2à¥F†—2—2G&vâÖ6öçFVçBf–ÇW&RÂæ÷B&ööböbÖ—76–æræöFW2÷"f–ÆVBæF—fRFövvÆRà¤w&÷WÖÆ—7BçVÆÂ÷F–öä6÷VçBö–æFW‚—2W‡V7FVBD•bÆ—7C²†–FFVâv—¦Öò–âF†—26GW&P¦—2æ÷BWf–FVæ6Röbv—¦Öò–çF–ærf–ÇW&RâFòæ÷B&WVW7Bæ÷F†W"–FVçF–6Â&W÷'Bà ¥W6W"FG2W6VgVÂ6‡&öæöÆöw’6ÇVS¢7W'&VçB&–v‡Bd”UrG&÷V&ÆR6VVÖVBFò7F'Bv†Và¤f6Vw&÷W—FV×2vW&RFFVBâf6Vw&÷W6öçG&öÇ2w&÷rd”Urg&öÒV&Æ–W"7GVF–ósSG€¦6öçFVçBFó“ƒ‚æB7F—fFR÷fW&fÆ÷rCƒ‚âF†Bö–çG2FòF†Rf—†VB67&öÆÆ–æp§7W&f6R–ç6–FRæF—fRFWF–Ç22ÆW6–&ÆRG&–vvW#²—B—2äõBVæv–æR÷&ö÷BÖ6W6P§&ööbæBFöW2æ÷B&Ww&—FRöÆFW#“cb²&–v‡B×&Vv–öâ&W÷'G22ÆÂ7F'F–ærC“ƒBà ¤W†—7F–ærd”UræVÂ—2f—†VB÷fW&fÆ÷v–ærF—&V7B6†–ÆBöbæF—fRÆFWF–Ç3âÂv†÷6P¦'&÷w6W"ÖF—66Æ÷6VB6öçFVçG2†fR6W&FRf—6–&–Æ—G’÷–çF–ærÆ–fV7–6ÆRâæWr6ÖÆÀ§f–WrÖÖVçR×7W&f6RÖ÷fW2F†B4ÔRæVÂôä4RVæFW"6Â÷WG6–FRæF—fRF—66Æ÷7W&P¦æB†VFW"6Æ—–ær÷7F6¶–æræ6W7G'’â÷&–v–æÂæF—fR7f–WtÖöFW2FWF–Ç2æ÷Vâ—0¥5D”ÄÂ6öÆR÷Vâ7FFRâöæRGG&–'WFRÖf–ÇFW&VB×WFF–öäö'6W'fW"Ö—'&÷'27W'&VçB÷Và¦–çFòW‡Æ–6—BæVÂæ†–FFVâæB7VÖÖ'’&–ÖW‡æFVBö6öçG&öÇ2âæòGWÆ–6FRFövvÆRÀ¦÷Vâ&ööÆVâÂæWr&r×ö–çFW"÷væW"Â6V6öæB÷Wö6öçFVçB6÷’÷"WFöÖF–2&W–çBà¤6Æ÷6VBW‡FW&æÂæVÂ—2F—7Æ–æöæR÷¦W&òÖÆ–÷WBg&öÒV&Ç’6†VÆÂ7G–ÆW6†VWBöçv&Bà¤W†—7F–ærf—†VB÷6—F–öâ÷v–GF‚öÖ‚Ö†V–v‡B÷67&öÆÂ÷F÷V6‚7G–ÆW2&VÖ–ã²67&öÆÂöfg6W@§&W7F÷&W2öâ&V÷Væ–ærâ6ÖRDôÒ”G2÷fÇVW2öÆ—7FVæW'2&VÖ–ââ&V‡–G&F–öâFWFV7G0¦W‡FW&æÂæVÂ&F†W"F†â&V7&VF–ær6öçFVçG2â¶W–&ö&BF"ô'&÷tF÷vâg&öÒ÷Và§7VÖÖ'’VçFW'2æVÃ²6†–gEF"&WGW&ç2ÂW66R6Æ÷6W2æF—fR÷væW"÷&WGW&ç2fö7W2à ¤÷&–v–æÂf–WrÖÖöFW26Æ–6²÷ö–çFW'WFVÆVvF–öâæ÷r&–æG2÷&–v–æÂW‡FW&æÂæVÃ°¦W†—7F–ær7–çF†W6—¦VBÖ6Æ–6²7W&W76–öâ&WF–æVBâ÷WG6–FRÖ6Æ÷6R66WG2$õD‚G&–vvW ¦æBæVÃ²7F—fR×f–Wr†–v†Æ–v‡F–ær6V&6†W27F&ÆRæVÂ”Bâ6ÆVâf–WrW6W2æWp¤”Bv—F‚ÆVv7’fÆÆ&6²Â&W6W'f–ær÷&–v–æÂ÷fW&Æ’÷væW"âT’FV'Vr6×ÆW2æWp¢7f–WtÖöFW5æVÂæB&VçD–BÂ&WF–æ–ærW†—7F–ær6öçG&öÇ2öÖöFR÷67&öÆÂ÷FövvÆRWf–FVæ6Rà¤æò6çf2÷&VæFW&W"öFÖ÷7†W&Rõ–çBõUböf6Vw&÷WövVöÖWG'’ö†—7F÷'’ô×VÇF“ã6†ævW2à¤f–ÆS““b7G–ÆW6†VWBæBgVæ7F–öæÂ÷væW'2Væ6†ævVBâF†—2—2F&vWFVB7G'V7GW&À§&W—"&WV—&–æræF—fRfVVF&6²ÂäõB&÷fVâW&ÖæVçBvV$¶—B÷&ö÷BÖ6W6R&W—"à ¥&Wf–WvVB66†R6Æ÷7W&S¢f–WrÖÖöFW>(i&æWr7W&f6S““s²6ÆVâf–W~(i$f6Rv÷&¶fÆ÷~(i&G&vW £““s²FV'VröV&Ç’FööÆ&"÷6†VÆÂ÷&V6÷fW'“““râG&vW"Ç6òÆ–vç2—G27FÆR&ö¦V7BÐ¦–ç7FÆÆW"6†–ÆB¶W““3‚Fò66WFVB6†VÆÃ““bÂfö–F–ær6ö×WF–ær66†VB–ç7FÆÆW §fW'6–öç3²æòæWr&ö¦V7B–ç7FÆÆW"6öFRâW†—7F–æröÆB–çFW&æÂ7F×2&WF–æVBà ¤f–æÃ“2fö7W6VB52ód”Âó6¶—‡ããsW2“£ræWr7W&f6R–FVçF—G’öö'6W'fW"ö–FV×÷FVæ6Rð¦6öÆW66VB7FFR÷67&öÆÂö–ç6–FRÖ÷WG6–FR7F—fF–öâõVæ6–Â7W&W76–öâö¶W–&ö&BFW7G2À¦÷&–v–æÂ7F'GWFööÆ&"ôg&ÖTÆÂöÖVçRô6ÆVâf–Wrôf6Vw&÷Wö''W6‚öFö6²ôf–ÆRöFV'Vrð¦F—7Æ’÷&VÆV6R6öçG&7G2â¥27–çF‚æBF–fb6ÆVââf–Wr67&öÆÂFW7B'6W"æ÷p§6VÆV7G2—G2GvòÖ‚Ö†V–v‡BÖ&V&–ær&6RöÖVF–'VÆW2–ç7FVBöbÇ6ò6÷VçF–æs““w0¦6Æ÷6VBFW66VæFçBÖF—7Æ’6VÆV7F÷#²ÆÂ†V–v‡Bö÷fW&fÆ÷r76W'F–öç2&WF–æVBÂæ@£““r†2W‡Æ–6—B6Æ÷6VB×7W&f6R6÷fW&vRâæò552÷&VæFW&VBöæF—fRögVÆÂ×7V—FR&öö`¦6Æ–ÖVBg&öÒ6öçG&öÆÆVBDôÒFW7G2âÆFW"†÷7FVB7FGW2æBW†7BV&Æ–6F–öâöÆ—fP§&ööb&V6÷&FVB–âFö72÷V&Æ–6F–öâÓ““ræÖC²6öç7VÇB&Vf÷&RFW67&–&–ærFVÆ—fW'’à ¤DUd”4S““s¢g&W6ƒ““r÷Vâd”Us¢F—&V7F–öç2öÆöö·2ö6öçG&öÇ2×W7Bf—6–&Ç’G&rÂæ÷BöæÇ¦g&ÖRâ6ö×&R7GVF–òæBf6Vw&÷W2†÷fW&fÆ÷r66R“²67&öÆÂFò&÷GFöÒÂFövvÆRÆöö·0¦æB&V÷Vâv—F‚f–ævW"õVæ6–Ââ6Æ÷6Rd”Urf–G&–vvW"ö÷WG6–FRF²÷Vâf–ÆRæ@§&WGW&ââf6R&F–Âd4Tu$õU7F–ÆÂ÷Vç2÷&–v–æÂÆVgBFö6²â6öæf—&Òv—F†÷WBÐ§7v—F6‚õ&Vg&W6‚F—7Æ’v÷&¶&÷VæBâã““b52—2&÷FV7FVC³““R66WFæ6Ræ÷B–æfW'&VBà¤7W'&VçBd”Ur—†VÂ66WFæ6R&VÖ–ç2VæF–æs²'&öFW"†—7F÷&–6Â&–v‡B×&Vv–öâ—77VP§7F—2õTâVçF–ÂæF—fRfVVF&6²âæW‡B76W73““r•B&W7VÇB&Vf÷&RÖ÷&R&VæFW&–æp¦6†ævW2÷"f6Vw&÷W×6VÒUböÖFW&–Âv÷&²â7FæF–ærW6‚÷V&Æ—6‚&÷fÂÆ–W2à ¢22ã““r–æ—F–Â7GVF–ò7V66W73²f6Vw&÷W2G&ç6—F–öâ&VÖ–ç2õTâ(	B#rö7Fö&W"##` ¥W6W#¢(	Åf–Wrv÷&·2w&VBÒF†W&R—27F–ÆÂF6‚öâF†R&–v‡BF†Bw2†–F–ærF†P¦v—¦Öò6öçFVçG2î(	Ò66WB÷&÷FV7C““rd”Ur&VæFW&–ær&W—"7V6–f–6ÆÇ“²Fòæ÷B–æfW ¦'&öB&–v‡B×&Vv–öâöv—¦Öò66WFæ6Râ¶VW““bf–ÆRÖVçR52æC““B66WFæ6Rà ¤æWs““r&W÷'Cƒ£C£S2ã£¢7GVF–òôf6RÂf–Ww÷'C3cgƒƒƒbÄE#"Æ6çf3#s3'ƒcS"À¦6öçG&öÇ2Væ&ÆVBÂæòFööÂ6W76–öâ÷FW‡GW&R–çBÂ6çf5&ö&V†–FFVæfÇ6Râf–æÂd”Up¦6Æ÷6VBÂW‡FW&æÂ7f–WtÖöFW5æVÂ&VçFö†–FFVâöF—7Æ–æöæR÷¦W&ò&÷VæG2Â6òæð§&WF–æVB6Æ÷6VBd”Ur&V7FævÆR—2W7F&Æ—6†VBB6GW&RâF÷FÄv—¦ÖòW‡Æ–6—FÇ¦†–FFVâöF—7Æ–æöæR÷¦W&ò&÷VæG2Föó¢F†—2&W÷'BFöW2äõB6GW&Rf—6–&ÆR'FÇ¦6Æ—VBv—¦ÖòâFòæ÷BG&VBF†B–çFVçF–öæÂ†–FFVâ7FFR27F–Â6Æ—–ær&ööbà¥7GVF–òFÖ÷7†W&R—27F—fRÂ÷6—G“ö×VÇF—Ç’Â'WBF†—2ÆöæRFöW2æ÷B&÷fR—@¦6W6W2F†RF6‚†öÆFW"&W÷'G2–æ6ÇVFVBæöâÕ7GVF–òö÷6—G“f–ÇW&W2’â†VÇF‡§&–v‡B×FööÆ&"Æ–÷WBö†—G2&VÖ–âæöâ×—†VÂWf–FVæ6Rà ¥FövvÆR×F–ÖR&V6÷&G2C#“c#’óC3#c"óCC326†÷r÷VåE%TRv—F‚æVÆ†–FFVåE%TS²6Æ÷6W0£C#CóC3ƒBóCCƒ#r6†÷r&Wf–÷W2f—6–&ÆRæVÂ&÷VæG2âFV'Vrö'6W'fW2FövvÆRBv–æF÷p¦6GW&RÂv†–ÆR7W&f6Rf—6–&–Æ—G’—2Ö—'&÷&VB'’×WFF–öäö'6W'fW"âF†W6RG&ç6—F–öà§6×ÆW26â&V6VFRF†Rf—6–&–Æ—G’WFFS²F†W’&Ræ÷B'’F†V×6VÇfW2W'6—7FVç@¥d”Urf–ÇW&RWf–FVæ6RâW6W"W‡Æ–6—FÇ’6öæf—&×2d”Uræ÷rv÷&·2â&W6W'fR66WFV@§7W&f6R7G'V7GW&S²–bgWGW&R&W÷'F–ærv÷&²—2æVVFVBÂ6×ÆR6WGFÆVB7FFR&F†W §F†â6Æ–Ö–ærF†W6RG&ç6—F–öâ&V6÷&G26†÷r&VÖ–æ–ærf—6–&ÆR6Æ÷6VBæVÂà ¥6÷W&6RVF—C¢F÷FÂv—¦Öò&ö÷B&VÖ–ç2÷&–v–æÃ“g‚f–Ww÷'B6†–ÆBÂG&ç6ÆFVBFð§6VÆV7F–öã²—G2&–Ö'’5dr–çFVçF–öæÆÇ’6Æ—2Fò—G2÷vâ&÷VæG2v†–ÆR6†÷'F7WB5dw0§&VÖ–â÷fW&fÆ÷wf—6–&ÆRâæò7V6–f–2w&öær67&VVâÖf—†VB6Æ—&V7B÷"6÷fW&–ærDôÒæöFP§v2W7F&Æ—6†VBâFòæ÷B&VÖ÷fR&÷FV7FVB5dr6Æ—–ær÷"Ö÷fRv—¦Öò&VçBö6ö÷&F–æFW0§7V7VÆF—fVÇ’âæò6öFRö'V–ÆB6†ævRg&öÒF†—2WFFRâ'VçF–ÖR&VÖ–ç3““rà ¤æW‡BW6VgVÂæF—fRWf–FVæ6S¢67&VVç6†÷Bv†–ÆRv—¦Öò—2d•4”$ÄRæB7&÷76–ærF6‚À§6ò'&÷w2÷&–æw2fW'7W2&F–ÂÆ&VÇ2ö'WGFöç2æBf—†VBF6‚&÷VæF'’6â&R6ö×&VBà¥V–6²7GVF–þ(i%6öÆ–N(i%7GVF–ò6ö×&—6öâÖ’6W&FR7GVF–ò&W6VçFF–öâFWVæFVæ6S°¦—B—2F–væ÷7F–26ö×&—6öâÂæ÷BwV&çFVVB&V6÷fW'’÷"Væv–æRF–væ÷6—2à¤æòæVVBf÷"æ÷F†W"–FVçF–6ÂGV×v—F‚v—¦Öò†–FFVââ&W6W'fR÷&–v–æÂæf–vF–öâÀ§6VÆV7F–öâö†—7F÷'’æB66WFVBd”Ur÷væW"VçF–ÂWf–FVæ6R7W÷'G2æ'&÷r&W—"à 