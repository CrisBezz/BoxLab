## Current release: .1037 corner UV propagation

Extend the single existing Catmull–Clark owner with a bounded, seam-preserving UV
payload API. Geometry-only callers still get identical `EditableMesh` output. This
build does not connect UV subdivision to viewport rendering and does not implement
displacement preview. Preserve 16,384 output faces / 80,000 per-corner UVs as the
current API limits. Keep .1035 colour-alpha PASS and existing seven-object/VIEW
acceptance protected.

Before displacement can be exposed, connect the UV payload through the existing
surface/display owner, then measure texture sampling precision, topology limits,
transient CPU/GPU memory, and actual device frame time. The .1036 iPad timings cover
CPU mesh generation only and do not clear those gates.

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
subdivision/displacement remains deferred. Publication proof follows below.

## .1026 — native NOM normal / roughness / metalness viewport — 30 October 2026

User explicitly PASSes1025 and requests /nextbuild. Protect accepted native colour/
5x tiling,retained maps/SaveOpen/NOM/source-unit pipeline and1024 lighting. Baseline
mainb20f630d/runtimeb7507920. Audit original resource/UV-image/decoder and existing
paint reflection pool925; no parallel material/geometry/picking/history owner.

Existing Studio/Solid NOM colour overlay adds linear tangent normalMap (factorNormal,
normal_neg_y/legacy flip_y),separate opaque GRAYSCALE roughness/metalness maps and
saved factorRoughness/factorMetalness. Independent supported UV/Auto/repeat sampling.
Data decode uses no colour conversion/premultiplication; scalar canvas replicates
validated grey into RGB for Three G/B reads. Coloured/translucent scalars stay
retained-only rather than guessing a channel. Colour appears first; failed/unsupported
auxiliary keeps it. Always-unlit and UV Image remain accepted colour-only inspection.
Metallic map materials reuse exact925 shared/refcounted room PMREM if scene has no
explicit environment; material-only,unavailable GPU gracefully uses direct lights.
Original source bytes,bit depth,material JSON,codec/import/export behavior unchanged.

Bounds4native surfaces/20k corners each; colour+normal1024square/scalars512square;
combined unique encoded choices<=8MiB per surface. Original24MiB retained pool.
Opacity/emissive/displacement still retained-only; colour source still required;
translation/rotation/triplanar remain unsupported display. No new dense geometry,
new startup default or change to1024 floor/lights/navigation/Pivot/selection/Paint.
NOM import status now describes supported normal/grayscale scalar preview honestly.

Six new actual-owner/real-Three tests cover plans/factors/Y/per-map transforms,
linear decoder/grayscale/alpha/refusals,cancel/late/no-extra-start,reflection cleanup/
explicit environment,unlit/UVImage,SaveOpen/NOM byte stability and actual Studio/Solid
integration/picking/source geometry. Existing1025 colour-only baseline fixtures made
explicitly colour-only; ALL original colour assertions/all-map retention tests kept.
157 focused PASS/0FAIL/0skip. Final full local Node24.22.1 suite3028 PASS/0FAIL/
0skip/0cancel (183.48s); changed JS syntax/diff clean. Cloud WebGL was disabled during1025; no new browser/GPU or
native1026 visual acceptance claimed. Details/docs/nomad-pbr-preview-1026.md.

Generic ready-to-import NOM_PBR_1026.nom (79,292bytes) supplied separately:3 cubes,
normal+roughness / metallic+roughness / colour control. Original procedural128maps,
no private artwork; regenerate from tests/helpers/nomad-pbr-fixture.mjs. No user asks
to construct backend fixtures. Reviewed1026 child/parent/cache closure incl original
UV decoder->workspace/Lab/exports and canonical release->face-layout->drawer; most
changes are pins only. Protected main/Multi1.0/frozen betas and actual1024 lighting
bytes unchanged. No new A/B batch.
Published runtime68320e5cec753747de8ecb5697158aa536cd5428; fetched origin/main tree
7b59ab712d2d6229c6dbf89e691e5b8a7825ce6b exactly matches tested/uploaded source.
All44 changed blobs hash-verified before non-forced expected-main update. Pages
41025737253 SUCCESS;9/9 fresh live files byte-match: shell/manifest,native resource,
decoder,UV surface,import/render owners and unchanged reflection925/Multi1.0.
Hosted41025737405 in_progress at proof; no hosted full PASS claimed. Full local3028
PASS/0FAIL/0skip remains final validation. Build1026 LIVE / READY for native PBR test.
No runtime edits after final full suite; no rendered-browser/iPad acceptance inferred.
DEVICE1026 import sample Studio/Solid,left normal/roughness relief,middle metallic
variation while orbiting,right colour control; SaveOpen.boxlab + NOMAD/Nomad sanity,
old MAP TEST colour/5x accepted. Next native feedback then emissive preview through
same owner; opacity/displacement display deferred.

## .1025 — native NOM map retention and viewport colour — 30 October 2026

User .1024 PASS protected; current baseline main4c45138c/runtimed90b3154.
User requests returning to native NOM texture viewport work and /nextbuild.
Audit confirms1015 importer ignored material/images; existing UV image overlay,
resource pool/codec and native NOM exporter are authoritative. See
`docs/nomad-material-retention-1025.md` for implementation and exact scope.

Native source:'nomad' resource stores material JSON + encoded referenced images,
original UVs and import fit. Resource envelopev4 uses EXISTING24MiB image pool/
transport; strict BoxLab UVv3 and GLBv1/v2 unchanged. No fake GLB provenance.
Original NOM writer copies every native texture slot/byte/settings (including
opacity/emissive/16-bit displacement and separate scalar maps),remaps image indices,
never enters GLB packed conversion. Export-local fit reversal preserves source
world positions/units. Existing topology signature refuses stale textured export;
resources remain saved/Undo-restorable. Native UV editing remains refused initially.

Studio/Solid auto-display supported opaque PNG/JPEG UV/Auto colour maps via original
UV overlay/buildGeometry/decode/disposal with scene-lit Standard material. Original
UV Image is unlit inspection. Existing normals,scalar material constants and scene
lighting retained; other texture maps NOT displayed yet. Original body picking,
selection/history/geometry and1024 lighting unchanged. Source UVs retained; scale
5x5 respected. Rotation/translation,triplanar,transparency are retained-only. Native
node/procedural structure/local-triplanar fidelity after baked transforms not claimed.
Budget4 surfaces/20,000corners each/8MiB source image/1024square decoded preview.
Hidden/reference/linked/modifier/procedural guards retained. Textured native GLB
export explicitly refuses rather than dropping maps; NOMAD/.boxlab retain them.
Untextured NOM geometry/UV GLB path retained. REIMPORT original.nom; old projects
cannot recover maps previously discarded by1015.

Six new actual-owner/real-Three tests cover all slots/raw hashes/16-bit/pooled+inline
SaveOpen/browser NOM export/source units,dispatcher/malformed/stale refusal,lit5x
surface/picking/active+inactive guards/cancel/disposal/display budgets. Original
synthetic paint-warning fixture now has valid empty material; original assertions
retained,new tests explicitly reject invalid material/image refs.159 focused checks
PASS; final full local Node24.22.1 suite3022 PASS/0FAIL/0skip/0cancel (110.32s).
Syntax/diff clean.
Real MAP TEST and MAP TEST(1) both File-import->fit->pooled SaveOpen->browser NOM->
parse PASS: exact colour image hash/settings and5x5 repeat,source worldpositions
within2e-6;496v/504f Cube and7911v/7916f Text preserved. Private files not committed.
No rendered-browser/native iPad or complete PBR/vertex-paint fidelity claim.

Reviewed1025 resource/codec/paint/export/import/render/overlay parents and canonical
release->face-layout->drawer/UV Lab closure; most parent diffs are import pins only.
Accepted1024 actual light code,main/Multi1.0/frozen betas and geometry kernels remain.
No new A/B test batch.
Published runtime b75079208f1b1fc3ca9546c8854c0ea8a954af6d; fetched origin/main tree
80fdac209d1a9778c7a8650fe870b901c8fc2bf3 equals tested/uploaded tree exactly.
All39 changed blobs verified before non-forced expected-main update. Pages
41012329078 SUCCESS; hosted full regression41012329141 completed SUCCESS.
18/27 fresh live file byte matches; remaining9 requests timed out at network proxy,
not counted PASS. Live browser separately confirms title/data/visible1025 and all
six render/import/export/codec-parent/release shell pins1025. Browser's WebGL is
explicitly DISABLED,so no rendered startup/texture visual or native iPad PASS claim.
Build1025 DEPLOYED / READY for native colour/round-trip testing. No runtime edits
after final full3022PASS. Publication proof is documentation-only.
DEVICE1025 reimport MAP TEST.nom in Studio/Solid; colour patterned cube visible with
correct5x tiling,orbit/select/Move. SaveOpen.boxlab retains texture. Export NOMAD,
open in Nomad and compare texture/tiling. Switch looks/UndoRedo;1024 underside and
floor cycle sanity. Next native colour feedback,then normal/scalar/emissive preview
through same retained-resource owner; opacity/displacement display remain deferred.

## .1024 user PASS — 30 October 2026

User explicitly reports “1024 PASS”. Protect accepted Studio/Solid underside
readability: original render owner underside fill .95 Studio/1.6 Solid, unchanged
ambient and Studio controls; Solid remains shadow-free. .1023 PASS retained.
Hosted full regression41009577601 now completed SUCCESS (rechecked after feedback).
Runtime remains d90b3154 / build0.36.18.1024; acceptance documentation only, no new
runtime build or mandatory hands-on test. Next await user direction; NOM texture/
PBR retention remains queued. Existing navigation/Pivot/floor protections retained.

## .1024 — readable underside lighting for Studio and Solid — 30 October 2026

User explicitly PASSes .1023: protect stronger grid, Pivot-only shortcuts and
selected-Face/shared-edge alignment. Baseline main7515be61/runtimeb45a3a9a.
User requests readable underside under full360 orbit without excessive ambient,
and suggests shadow-free Solid for modelling.

Audit: existing Solid uses original Standard material, overhead key3.2 and
hemisphere1.2 with dark ground colour; Studio adds three above-model directional
lights. Original render-modes owner now adds ONE reusable shadow-free directional
underside fill outside the Studio rig,opposing original base key (-4,-7,-5).
Studio intensity .95; Solid1.6. Direction is independent of model position/scale.
No increase to hemisphere intensity/ground colour or emissive material, no extra
shadow map/renderer/frame callback/input owner. Original Studio default, floor,
shadows, Key/Fill/Rim controls and Studio polish light-discovery remain unchanged.
Solid retains shadowMap disabled. Fill hidden in every other look; repeated mode/
body updates reuse it. Active/inactive/paint surfaces share existing scene lights.
No geometry, selection, history, UV/Paint data, Pivot or navigation changes.

46 focused checks PASS/0FAIL/0skip, including2 new actual-owner/real-Three tests:
all six Solid principal normals receive directional energy, bottom/top direct
strength ratio .5, original ambient unchanged, no added shadow, mode isolation,
Studio original3 directional lights, reuse and model-resource preservation.
Existing render/Facegroups/committed paint/floor-contact/release/identity/comparison
checks pass; syntax/whitespace clean. Floor test's isolated syncStudio harness now
stubs the new lighting helper only; all ground assertions retained. No browser/
native iPad appearance or full-suite performance claim from these math/Node checks.

Reviewed1024 direct render pin and shell markers,comparison migration retains1023
ratings; canonical release->face-layout->drawer cache closure refreshed (import-only).
Multi1.0 remains exact Beta6/pin1.0; frozen betas and all other runtime owners retained.
Published runtime d90b31541ad3c621c8cdd88977f036ce3ef9555f; fetched origin/main tree
fd6ca02e4b1e8ce074016a2869ecf47544155382 exactly matches tested/uploaded tree.
All13 changed blobs hash-verified before non-forced expected-main update.
Pages41009576824 SUCCESS;12/12 fresh live files byte-match tested source: shell,
manifest,render owner,canonical cache graph,comparison and unchanged Multi/Pivot/
ground/Studio-polish. Hosted41009577601 in_progress at proof,not claimed PASS.
Build1024 LIVE / READY for iPad lighting-balance testing. No native visual PASS.
DEVICE1024: Studio orbit below model, judge underside readability and shape contrast;
VIEW->Solid repeat full orbit, shadow-free modelling; switch Studio/Solid/Facegroups
and back, floor/grid/off sanity; move model/orbit and confirm consistent fill.
Next native lighting-balance feedback; NOM texture/PBR retention separately queued.

## .1023 — grid visibility / Pivot shortcuts / selected-Face edge snap — 30 October 2026

User1022 PASS protects top-right plane/grid/off cycle and contact-shadow hiding.
User reports Object/Edge pivot-edge alignment works well; protect those workflows.
User requests10% stronger grid,only two pivot icons during Pivot editing,and repair
of selected-Face edge alignment. Baseline main035072b2 / runtime4c10c95f (.1022).

Original ground-polish opacity increases relatively10%: Studio .18->.198,other looks
.34->.374. Original floor cycle/axes/Clean masks/contact shadow owners unchanged.
Original corner-controls hides all shortcut buttons/groups except Pivot and
World/Local while editing; original mode-specific visibility returns on exit.
Actual RGB gizmo axes/planes/rings preview and centre/Y turning remain visible and
unchanged. Pivot artwork/toolbar/history actions unchanged; no duplicate controls.

Reproduced Face error: a ray on a shared polygon edge can select the neighbour's
render triangle,using its normal even when another face is selected. Face placement
now requests selected polygons; per-drag surface/probes retain the latched polygon.
Nearest-surface depth ties prefer selected face. Filtering ray hits alone was
insufficient because exact boundary rays sometimes hit only ONE adjacent triangle.
Read-only fallback recovers selected neighbour ONLY on the same actual shared edge
of that already-visible nearest body,using original mesh edgeKey/faceNormal and a
bounded numerical tolerance. Front-facing check retained; no through-object picking,
new triangulation,diagonal snaps,geometry/history kernel or material edit. Unrelated
selected polygons and occluded/back faces cannot become targets. Object/Edge initial
picking stays unrestricted; all modes retain existing14/20px magnet and X/Z sign
selection with greenY normal. Draft/cancel/one-checkpoint/UndoRedo/SaveOpen retained.

76 focused checks PASS/0FAIL/0skip;3 new checks include reproduced pre-fix Face normal
and shortcut-visibility failures plus tilted-edge Object/Edge/Face mouse/Pencil/touch
parity and unselected/hidden-face refusal. Grid opacity assertions added to original
floor-owner tests. Original pivot projection/selection/history/codec/cancel/occlusion,
corner/toolbar/Objects/Clean/snap/release/cache/identity/comparison checks pass.
Syntax/whitespace clean. No full-suite/rendered-browser/native iPad PASS claimed.
Reviewed1023 ground+shared corner+pivot parents,TotalGizmo,object-management,
viewport-toolbar->topbar,face-layout->drawer and recovery/comparison cache closure.
Other import-parent changes are pins only. Transform owners/Multi1.0/frozen betas,
accepted floor/render/studio-polish and navigation/Paint/UV unchanged.

Published runtimeb45a3a9acd6f15b2d394e6c8f14ddd9fec1314e9; tested/uploaded tree
bf59592796d15b1623a58be8a443ef471b38301f equals fetched origin/main exactly.
All21 blobs hash-verified before non-forced expected-main update. Pages40996655063
SUCCESS;18/18 fresh live files byte-match tested source: shell/manifest,ground,
pivot/corner/TotalGizmo and parent/cache graph plus unchanged transform/Multi1.0/
accepted render/Studio-polish owners. Hosted40996655551 in_progress at proof;
no full-suite/native iPad PASS claimed. Build1023 LIVE / READY for testing.
DEVICE1023: grid subtly clearer; Pivot edit shows ONLY Pivot
and World/Local shortcuts,exit restores original icons; Face select->Pivot->drag
across face and to real edges,X/Z aligns and Y stays selected-face normal,model
still. Include shared-edge start and rotated face; Object/Edge quick parity; finish,
Local transform and UndoRedo. Next native Face feedback; NOM texture/PBR queued.

## .1022 — top-right floor/grid/off toggle; .1021 PASS — 30 October 2026

User explicitly PASSes1021; protect Pivot icon blue bottom-left/green up/red
bottom-right and yellow centre ring. No broader1019 device acceptance inferred.
Baseline main d655f56e / runtime d8ae5d4c. User requests top-right three-state
floor icon: light-grey filled plane -> gridded plane -> unfilled outline -> plane.

Original shell adds ONE40px button before VIEW with24px plane artwork from startup;
original toolbar order/hydration keeps this same node. Existing ground-polish owner
holds a session-only plane/grid/off choice (fresh load starts plane), binds one native
click handler and synchronizes artwork/accessible current+next-state labels. No new
raw pointer owner, renderer, ground mesh, duplicate controls or history entry.
Original grid and Studio floor are mutually exclusive; off hides both and Studio's
separate contact-shadow decal. Original studio-polish refresh respects this choice;
render-modes uses the same state when initializing/synchronizing its floor directly,
without adding a per-body scene traversal. Existing floor placement/shadows/lights,
grid opacity and axes unchanged. Floor remains original Studio-only surface; other
looks retain their prior no-plane behavior. Grid is available across looks. Choice
survives look switches/bridge updates within session. Existing Clean View still hides
grid/axes temporarily and restores chosen grid on exit; it does not change preference.

54 focused checks PASS/0FAIL/0skip; four new actual ground-owner/button/Studio-polish/
render-sync tests cover cycle/icons, early input/late bridge, one listener, invalid
state refusal, no extra scene objects/model transforms, Clean/View restoration and
contact decal not reappearing after pointer-driven polish. Existing toolbar shell
count/order fixture expanded ONLY for requested new button; legacy fallback and all
original action/hydration assertions retained. Existing render/Studio/compact/Objects/
snap/release/cache/identity/comparison checks pass. JS syntax/whitespace clean.
No full-suite, rendered-browser or native iPad PASS claimed.1021 user PASS protected.
Reviewed1022 shell/recovery/comparison,toolbar->topbar,ground+studio-polish->face-layout
->drawer and render-mode pins/hashes. Icon/corner/TotalGizmo1021,local-pivot1019,
transform owners,protected Multi1.0,frozen betas/navigation/Paint/UV unchanged.

Published runtime4c10c95fec6c71eaf0c5c4d77cbf94082962553e; tested/uploaded tree
00f84fc40b976aa8e16be1ccb959c9d0f706bba9 equals fetched origin/main exactly.
All18 blobs hash-verified before non-forced expected-main update. Pages40995326471
SUCCESS;16/16 fresh live files byte-match tested source: shell/manifest,new ground/
Studio/toolbar owners,parent/cache graph and unchanged accepted Pivot icon,Total
Gizmo,local-pivot and protected Multi1.0. Hosted40995327653 in_progress at proof;
no full-suite/native iPad PASS claimed. Build1022 LIVE / READY for testing.
DEVICE1022 in Studio: inspect filled grey plane icon before
VIEW; tap to grid (plane/contact shadow disappear), tap to off (grid disappears),
tap to plane (original floor/shadow return). Orbit after each; check repeated cycle,
Studio->Solid->Studio retains choice, Clean View hides/restores selected grid.
Next: native1022 feedback; NOM texture/PBR retention remains separately queued.

## .1021 — Pivot icon colour order — 30 October 2026

User requests blue bottom-left, green up, red bottom-right to match the gizmo.
Baseline main bdd1b712 / runtime6a05d771 (.1020). Swap ONLY the two lower
arrow stroke colours in original gizmoIcons.pivot; green arrow and yellow centre
ring retained. Original icon size, button/actions and pivot/transform owners unchanged.
Refresh the same reviewed shared-icon parent/cache graph as1020; preserve comparison
ratings including1020. Protected Multi1.0/frozen betas unchanged.
37 focused corner/release/identity/comparison checks PASS,0FAIL/0skip; syntax and
whitespace clean. SVG colour order and unchanged action/other-icon bytes verified.
Initial identity run needed the declared Three dependency; final rerun passes.
Published runtime d8ae5d4c4baaa67ef11a1ad89139c451adeb2299; tested tree
26aa26a19e43db0fea9ea69d9a6a4fa4f1c2e844 matches fetched origin/main exactly.
All16 blobs hash-verified before expected-main non-forced update. Pages40991382103
SUCCESS;14/14 fresh live files byte-match tested checkout, including corrected icon,
shared parent/cache graph and unchanged local-pivot/Multi1.0. Hosted40991382283
in_progress at proof; no full-suite/native device PASS claimed. Build1021 LIVE /
READY for testing. Native1021 icon-order check pending. Prior1017
alignment/1018 preview PASS protected;1019 device edge-snap acceptance still pending.
Next: verify icon colours in normal/active state, then existing Pivot toggle sanity.
NOM texture/PBR retention remains separately queued.

.1020 publication verified — 30 October 2026:
Runtime6a05d77159aa6ee54670c49958b013c5c532964c; tested/uploaded tree
947a0f265f8e273d6f1fe5b90ca67526b7ffdb7d exactly matches fetched origin/main.
All16 blobs hash-verified before non-forced expected-main update. Pages40985099430
build/deploy SUCCESS;14/14 fresh live files match tested runtime: shell/manifest,
RGB Pivot icon and shared import parents,comparison/recovery/canonical loader graph,
unchanged local-pivot and protected Multi1.0.35 focused checks PASS/0FAIL/0skip;
syntax/whitespace clean. Exact SVG inspected24px/enlarged normal/pressed/disabled;
no actual browser/native icon acceptance inferred. Hosted40985099175 in_progress
at proof,not claimed PASS; .1019 full local3007PASS remains baseline,no redundant
full local icon-only rerun. Build1020 LIVE / READY for icon review. Other icon bytes,
action function,pivot alignment/surface drag/edge snap/transform owners unchanged.
All four handoff documents current;.1018 preview/.1017 alignment PASS protected;
.1019 native edge-snap acceptance still pending. DEVICE1020 RGB arrows/yellow centre
ring,normal/active colours,Pivot toggle and existing face placement sanity.

## .1020 — RGB miniature gizmo Pivot icon — 30 October 2026

User requests red/green/blue Pivot artwork with a small yellow circle, resembling
a tiny gizmo. Baseline maind8be0f4/runtime380b61c (.1019). Change ONLY the original
gizmoIcons.pivot SVG: green upward Y, red lower-left X, blue lower-right Z arrows,
small yellow centre ring. Explicit child stroke/fill keeps colours through existing
normal/pressed button colour inheritance; original24px SVG and40px button retained.
No duplicate button, action/label/listener/layout/pivot/geometry/history change.
Other shared icons remain exact. All import parents of shared gizmo-corner-controls
repinned together (TotalGizmo,object-management,viewport-toolbar->topbar,drawer),
plus original release/cache closure. Import-only changes outside SVG owner.

35 focused corner/release/cache/identity/comparison checks PASS; syntax/whitespace
clean. Exact SVG rendered/visually inspected at24px and enlarged in normal,pressed
and disabled states. All other icon artwork and action-function bytes unchanged;
no actual browser/native pixel acceptance claimed. Build1020 LIVE / READY.
.1018 preview PASS/.1017 alignment PASS protected;
.1019 face-drag/edge-snap native acceptance remains pending, no PASS inferred from
this icon request. .1019 full local3007PASS remains baseline, no duplicate full
rerun for icon-only work. DEVICE1020: inspect RGB arrows/yellow ring at normal size,
tap Pivot on/off and verify colours remain; existing face-drag/edge-snap sanity.
Next native feedback; NOM texture/PBR retention separately queued.

.1019 publication verified — 30 October 2026:
Runtime380b61c927e08be121a613ae2db04e89b1390aaa; uploaded/tested tree
4c5ceba0aa70ccadfc93b2669de54f1f1a061af3 exactly matches fetched origin/main.
All14 blobs hash-verified before non-forced expected-main update. Pages40981504272
build/deploy SUCCESS;13/13 fresh live files byte-match tested runtime: shell,
manifest,pivot,gizmo,comparison,canonical loader/recovery graph and unchanged corner,
origin,transform-upgrade,protected Multi1.0.62 focused checks PASS; full local
Node24.22.1:3007 PASS/0FAIL/0skip/0cancel (208.94s), superseding the initial local
in-progress note. Hosted40981504381 remains in_progress at proof,not claimed PASS.
Build1019 LIVE / READY for native iPad face-drag/edge-snap testing. All four handoff
documents current;.1018 preview PASS and .1017 alignment PASS protected. Existing
original-centre/Y turn, per-object WorldLocal, history and SaveOpen owners retained.
No native app/browser visual/feel result inferred from Node projection tests.
DEVICE1019: Pivot->press/drag on a face->approach real edges: actual gizmo moves,
X or Z aligns to edge,Y remains face normal,model still; release then centre/Y
manual turn,Pivot finish,Local transforms,UndoRedo/SaveOpen. New contact on another
face changes normal. NOM texture/PBR retention remains separately queued.

## .1019 — surface-drag local pivot and face-edge alignment — 30 October 2026

User .1018 PASS protects visible actual-gizmo pivot rotation preview; .1017 GIZMO
ALIGN PASS retained. User now requests live pivot movement across a face and edge
alignment of X or Z while Y remains its face normal. Baseline main7e5429d/runtime
bd11e9c, release1018. This is the next narrow user-authorized build.

Original gizmo-local-pivot owner extends its existing window-capture placement,
move/completion listeners. Drag starts on a visible ACTIVE Base face, captures the
pointer and updates only the transient pivot draft on each move. Same actual Total
Gizmo projection previews its position/arrows/planes/front rings and matching hit
paths BEFORE release. One face is latched per contact so crossing a shared edge
cannot flip green Y onto the neighbour; release and start on another face to change
faces. Off-surface/occluded movement holds the last valid placement. Geometry and
selection never move during edit; original Pivot finish commits ONE scene checkpoint.

Real polygon boundaries come from existing renderer triangle ownership metadata,
or a cached read-only lookup of original Base fan ordering when geometry counts
match. No new triangulation, render-mesh rebuild or triangle-diagonal snapping.
Screen magnet enters14 CSSpx/releases20px, with3px corner preference; perspective
interpolation puts pivot on the actual edge under the pointer. Visibility probes
inside that boundary use the same actual body picker; hidden/inactive occluders
cannot become snap targets. X or Z and its sign are chosen closest to the starting
face-aligned frame; the right-handed frame retains exact green Y normal. Non-tangent
warped edges safely decline alignment rather than rotate Y away from the face.
Status names the snapped axis. Leaving the magnet restores the stroke's unsnapped
tangent orientation. Centre->Y turning remains accepted and does not move geometry.

Pointer cancellation/lost capture restores the pre-drag draft; Escape/pagehide
abandons edit and restores controls/listeners. Secondary contacts cannot replace
the active placement. Original per-object record/history/project codec/WorldLocal/
transform owners remain authoritative; Multi1.0, resource/NOM/Paint/navigation,
accepted icons and frozen betas unchanged. No second preview gizmo or pointer owner.

Seven new actual-owner/math/projection tests cover touch/Pencil/mouse live surface
drag, true boundaries versus fan diagonals, axis/sign/normal, oblique silhouette,
visibility, perspective depth, second pointers, cancel/lost/Escape/pagehide cleanup,
original UndoRedo/SaveOpen and actual Total Gizmo paths/hit proxies before release.
The earlier1017 synthetic placement test now emits its real pointerup BEFORE centre
input; all prior geometry/history/transform assertions retained. JSON SaveOpen
compares canonical scalar records because JSON normalizes -0 to0; no codec change.
Validation:62 focused checks PASS/0FAIL/0skip; full local Node24.22.1 suite
3007 PASS/0FAIL/0skip/0cancel (208.94s), syntax/whitespace clean. The earlier
local in-progress note is superseded by that completed result. Hosted full
regression remains separately tracked; no native iPad tactile/visual acceptance
inferred. Build1019 LIVE / READY for native iPad preview/snap acceptance.

Reviewed1019 shell/recovery/comparison and TotalGizmo->pivot child cache closure;
canonical release->face-layout->drawer pins updated. Other transform owners retain
1017 bytes/pins. DEVICE1019: Pivot -> press/drag on face -> approach different edges,
watch actual gizmo move/snap X or Z while greenY remains normal and model still.
Release -> centre/Y manual turn still works -> Pivot finish -> Local transform;
UndoRedo and SaveOpen sanity. Start on another face for a new normal. Next native
feedback, then separately queued NOM texture/PBR retention. No new A/B test batch.

.1018 publication verified — 30 October 2026:
Runtime bd11e9c249b02bd2d1979bcaad2a1b76b7756272; uploaded tree
5f40a8362a19d300967b3024a5d2ed4fdaff3acb exactly matches tested local tree
and fetched origin/main. All12 blobs hash-verified before non-forced expected-main
update. Pages40974848411 SUCCESS;11/11 fresh live files byte-match tested checkout:
shell/manifest/gizmo/comparison/drawer/face-layout/recovery plus unchanged pivot,
transform-upgrade and protected Multi1.0.55 focused checks PASS/0FAIL/0skip; syntax
and whitespace clean. Hosted40974848994 still in_progress at proof, not claimed PASS.
Build1018 LIVE / READY for native preview acceptance. User .1017 alignment PASS
protected. Device: actual RGB gizmo visible through face placement and greenY turn;
model stays still; finish then Local transforms, Cancel/UndoRedo sanity. No native
visual/feel acceptance inferred. NOM texture retention remains separately queued.

## .1018 — live gizmo preview during pivot editing — 30 October 2026

User explicitly reports “GIZMO ALIGN = PASS”; protect .1017 face alignment. This is
alignment acceptance, not a blanket PASS for every .1017 Save/Open/transform gate.
User requests seeing the actual gizmo while turning its pivot.

Audit baseline main c140e6f/runtime6053092d: original live draft frame already drives
Total Gizmo arrows, plane pads and front rotation arcs on every render frame. Two
pivot-edit CSS rules hid axes/heads/planes/scale/screen and non-Y rings, leaving no
useful X/Z orientation feedback. Remove ONLY those hiding rules: the same actual
gizmo now previews its changing draft orientation during placement and Y turning.
Existing centre/Y-only pivot input interception, geometry isolation, finish/cancel,
original history, per-object frame and World/Local owners are unchanged. No duplicate
preview gizmo, pointer listener, renderer or transform kernel. Multi1.0, native NOM,
accepted transforms/navigation/Paint and frozen betas remain unchanged.

Validation:55 focused checks PASS/0FAIL/0skip; syntax and whitespace clean. Covers
actual pivot edit/scene history, transform directions, front rings/hit proxies,
corner controls, shell identity/cache graph and comparison migration. No native
iPad visual acceptance inferred. Browser rendering unavailable in this environment;
no new browser installation attempted for this CSS-only change.

Status: .1018 LIVE / READY for iPad preview testing. .1017 alignment PASS
protected; NOM material/texture retention remains separately queued. Shell release,
comparison and canonical release-loader pins updated; unchanged pivot/transform
implementation and child cache keys retained. Next: publish after focused checks,
then iPad preview acceptance. DEVICE1018: Pivot -> face -> centre -> greenY turn;
watch actual RGB gizmo turn while model stays still. Finish -> Local transform;
Cancel/UndoRedo and World/Local sanity. No repeat A/B screen batch required.

.1017 publication verified — 30 October 2026:
Runtime6053092da3e9770e9975e8c698fbabfe2f46bb86; tested/uploaded tree
e8ee3cb39efaa387ddede24246f5124b93fa80b5 exactly matches fetched origin/main.
All21 blobs hash-verified before atomic non-forced expected-main update. Pages40970022761
completed SUCCESS;17/17 fresh live files byte-match tested checkout: shell/manifest,
new pivot/corners/Total Gizmo/transform owner, origin, icon import parents, canonical
release/cache graph and protected Multi1.0/NOM decoder. Final local Node24.22.1:
3000 PASS/0FAIL/0skip/0cancel (117.43s); final focused25 PASS including cache/scene
replacement checks; syntax/whitespace clean. Hosted40970023491 remains in_progress
at proof,not claimed PASS. Build1017 LIVE / READY for native iPad acceptance.
Exact SVG icon QA only; app/browser/native pixel/feel remains ungraded as recorded.
All four handoff documents current;1016 PASS protected. Scope: independent Base
objects; Multi/group stays original World workflow. DEVICE1017 Pivot->active face
(Y normal/XZ tangent)->centre->greenY turn->Pivot finish, then Local transforms;
World/Local and object recall; UndoRedo and .boxlab Save/Open. NOM texture display
remains separately queued, not added in this gizmo build.

## .1017 — per-object local gizmo pivot workflow — 30 October 2026

Status:1017 LIVE / READY for testing; runtime6053092d. Baseline main951f445c,
runtime25cef857 (.1016 USER PASS protected). User requests removing gizmo Undo/Redo,
face-normal pivot placement, centre-enabled Y twist, World/Local and per-object recall.
Interpretation stated before work: Y follows face normal; XZ lies tangent to face.

Existing object-origin record is the SOLE pivot position owner. New small
gizmo-local-pivot module (src/gizmo-local-pivot.js) edits a transient draft, then
replaces flat origin fields x/y/z/qx/qy/qz/qw/gizmoLocal through original object-history
checkpoint. No parallel modelling/pivot/history kernel or project resource channel.
Existing flat origin spreads already preserve fields across scene capture/restore,
Duplicate and .boxlab codec; no scene version bump. setOrigin now preserves optional
flat fields, preventing original preset/move owners from erasing orientation.

Bottom-right corner pair now Pivot Edit (tiny axes inside ring) and World/Local
(globe/axes artwork); no gizmo Undo/Redo buttons. Header/history gestures unchanged.
Pivot Edit: tap ACTIVE visible face -> exact surface point + geometric face normal;
centre press enables Y turn, drag green Y ring (or centre horizontally); Pivot button
finishes. Geometry/selection untouched during draft; whole edit is one original scene
checkpoint. Escape/pagehide discard; pointer cancel rolls back current spin only.
Canvas navigation/raw touch history is paused ONLY during explicit edit and restored
on exit. Other gizmo shortcuts disabled during edit; Pivot/space remain available.
Click outside gizmo/canvas commits before other UI. Selection changes safely finish.

Ray pick reuses renderer's actual visible Base body/normal transform; nearer inactive
body blocks placement. No new mesh triangulation, phantom through-object picking,
normal painting or UV edits. Current editing gate: one independent unlocked Base
object, no reference/linked/evaluated/procedural/Paint/active modelling session.
Multi/group keeps original World pivot behaviour; local editing refused for Multi.

Local returns stored position and orthonormal quaternion; World uses original
selection centre/world axes. Each object remembers its frame and space choice.
Existing Total Gizmo uses same frame for anchor/arrows/plane pads/front ring paths
AND hit proxies. Original transform-upgrade owns local projected Move, quaternion
Rotate, basis-space Scale and Exact; frozen start frame prevents accumulation/drift.
Object moves/rotates carry origin/frame, including while World displayed; cancel
restores geometry AND origin. Component transforms affect only selected vertices
about same custom frame; object origin itself remains fixed for component edits.
Grey screen ball remains view-axis; explicit axes/1016 direction/detents retained.
No duplicate gesture or transform kernel; protected Multi1.0/frozen betas untouched.

Seven new module/actual-owner tests + one updated corner test: face handedness,
visible picking/occlusion, draft placement/Y twist, actual scene UndoRedo, SaveOpen,
object recall/WorldLocal, refusals, component selection, Exact Move/Rotate/Scale,
real projected drags/cancel/nonaccumulation and shortcut state. 36 focused PASS;
final focused25 PASS including frame-cache/replacement checks. Final local
Node24.22.1:3000 PASS/0FAIL/0skip/0cancel (117.43s); syntax/whitespace clean.
Frame projection reuses the manager's stable mutable scene array (not object
references), avoiding repeated getter-triggered mesh copies; replacement objects
after history restore remain visible. No unmeasured speed/capacity claim.
Standalone exact SVG icons rendered/inspected; actual browser QA unavailable because
Chromium absent and browser download returned truncated archives. No rendered app or
native iPad acceptance claimed. Original test712 replaces ONLY requested Undo/Redo
shortcut assertions with Pivot/space coverage; toolbar/history behaviour retained.

Reviewed1017 shell/recovery/comparison, Total Gizmo->new pivot+corner child,
transform-upgrade and release->face-layout->drawer->object-origin graph. Icon-only
import parents object-management/viewport-toolbar-controls/topbar repinned together;
those parents have import-only changes. Comparison retains1016 ratings/A default.
NOM1015 importer/resources/renderer/navigation/Paint/UV/geometry unchanged.
DEVICE1017: inspect bottom-right icons; Pivot->face->centre->greenY->Pivot, model must
stay still until exit and transform. Local XYZ Move/Rotate/Scale/Exact about chosen
point; World/Local toggle, other object and back; UndoRedo and SaveOpen preserve frame.
Local feature acceptance pending. NOM texture-map import/display remains unimplemented
and separately queued; .1016 PASS retained. See docs/publication-1017.md.

## .1016 user PASS — 30 October 2026

User explicitly replies “PASS” to shipped .1016 gizmo repair. Current build1016
(runtime25cef857) is LIVE / USER ACCEPTED. Protect accepted Object rotation/scale
directions, explicit handle constraints over Axis Snap, component touch/Pencil/mouse
handoff and existing history/selection behaviour. This supersedes earlier1016
pending native acceptance notes; no separate1015 native NOM acceptance inferred.
No runtime, release markers or cache pins changed for this acceptance record.
No fresh automated run or mandatory hands-on test needed for documentation only.
Next recorded candidate remains native NOM texture/PBR retention with Save/Open/NOM
round-trip verification, separately scoped from rendering/displacement preview.
No new feature build requested by PASS alone.

.1016 publication verified — 30 October 2026:
Runtime25cef85786cab23110e7d95d4776e05a8f3053d9; tested/uploaded tree
9d729ee31107db225a9851206746aa37df91856a exactly matches fetched origin/main.
All15 blobs hash-verified before atomic non-forced expected-main update. Pages40958753692
completed SUCCESS;12/12 fresh live byte matches: manifest,shell,transform-upgrade,
object-origin,drawer,face-layout,bootstrap,release,comparison and unchanged Total Gizmo,
Multi1.0 and NOM decoder. Full local Node24.22.1:2992 PASS/0FAIL/0skip/0cancel
(114.10s);40 focused PASS,syntax/whitespace clean. Hosted40958754318 remains
in_progress at proof,not claimed PASS. .1016 LIVE / READY for native iPad tests;
no user acceptance inferred. All four handoff documents updated; retained NOM/PBR
proposal remains separate. DEVICE1016: Object rings/greyball direction and scale
outward/inward from all quadrants; multi-vertex/edge/face Move/Rotate/Scale with
finger/Pencil; selections,UndoRedo,tap/cancel and Multi/group sanity.

## .1016 — gizmo direction and component-touch repair — 30 October 2026

Status:1016 LIVE / USER ACCEPTED; runtime25cef857. Baseline main97a294d0/runtime
6511ca38 (.1015). User reports opposite Object rotation/scale and component gizmos
not acting. No1015 native PASS inferred;1014 acceptance and1015 NOM affine fix retained.

Audited original Total Gizmo onHandleDown -> transform-upgrade semantic owner and
Object/Multi fallback -> original object-origin. Confirmed component touch refused
at semantic begin; Object falls back to synthetic pen, component intentionally blocks
canvas replay. Remove touch rejection ONLY from explicit semantic begin; actual canvas
touch gate/Orbit owner remains. Pencil/mouse path retained; no new pointer listener.

Explicit gizmo constraints now outrank Axis Snap in BOTH existing transform owners;
only Auto opts into inference. Previously Axis Snap could replace XYZ or uniform/free
with an unrelated drag-inferred axis. XYZ gizmo rotation corrects screen winding by
axis dot camera view direction; opposite camera side/inverted view supported. Grey
View-axis ball stays original camera-axis rotation. Uniform scale uses radius change
from initial centre in every quadrant (outward grows/inward shrinks); axis scale uses
original projected positive rail. Legacy canvas gestures retain previous mapping.
Object-origin/Multi reuse same existing pivot/origin/history/geometry owners; protected
multi-object-transform.js1.0 unchanged. No duplicate modelling kernel or UI reskin.

Semantic component tap/cancel now explicitly resets transient gizmo state because
owner window-capture completion consumes raw event before Total Gizmo sees it. Cancel
restores original vertices; tap does not create history or open Exact entry. Committed
drags retain original completion/Exact. Selection and ordinary undo/redo stay owners.

Six new tests execute actual owners and Total Gizmo semantic handoff with touch,
Pencil/mouse, Vertex/Edge/Face selected-only moves, XYZ clockwise90 across both camera
sides/inverted views/Axis Snap ON, uniform scale all quadrants, Multi/group pivots/
origins/scale/cancel and tap reset. First3 tests fail against pre-fix owners. Historical
rotate-owner helper expected Z quaternion changes +90 to -90 for clockwise screen
motion facing +Z; all selection/history/legacy assertions retained (requested fix).
40 focused checks PASS; full local Node24.22.1:2992 PASS/0FAIL/0skip/0cancel
(114.10s). Syntax/whitespace clean. No native Safari feel claimed.

Reviewed1016 shell/bootstrap/release/comparison, transform-upgrade and
release->face-layout->drawer->object-origin cache graph. Total Gizmo visual1012 bytes/
pin unchanged, importer/decoder1015 unchanged, comparison migrates1015 ratings with
A default/no repeat A/B. FrozenBeta2–7, accepted navigation/Paint/NOM/resource/UV/kernel
owners unchanged. DEVICE1016 Object XYZ rings from front/back and grey View ball;
orange ring outward/inward on left/right/top/bottom; select several vertices, edge
or face -> expand gizmo -> Move/Rotate/Scale with finger/Pencil; selection/UndoRedo/
Cancel and Multi/group sanity. Next follow native feedback, then NOM map-retention
proposal separately. Publication evidence: docs/publication-1016.md.

.1015 publication verified — 29 October 2026:
Runtime6511ca38297fb7b5e9f2bf51f029dffe3e6cfb2d; tested/uploaded tree
b60c4c6ae0f673e21f9271a4df47d7bd7dcf42f0 exactly matches fetched origin/main.
All14 blobs verified before atomic non-forced expected-main update. Pages40869617898
completed SUCCESS; all10 fresh live files byte-match tested checkout (shell,manifest,
importer,decoder,release loader chain,comparison and protected Multi1.0). Full local
Node24.22.1:2986 PASS/0FAIL/0skip/0cancel (113.42s),23 focused checks PASS,
syntax/whitespace clean. Hosted40869618748 still in_progress at proof; not claimed PASS.
Build1015 LIVE / READY for native import retest; device acceptance pending.

Second user upload MAP TEST(1).nom (2,805,852bytes) contains ONLY Cube496v/504f with
UVs; Text is absent. It imports on both pre-fix1014 and patched1015. Original first
MAP TEST.nom (3,271,012bytes) includes live Text7911v/7916f with rounded affine w:
pre-fix refuses, patched imports BOTH objects. This comparison confirms the failing
saved Text transform, not proof that validating text rewrites/fixes its matrix.
No editable native-text semantics or texture/material preservation added. User files
remain unchanged and are not committed into repository. Native texture/PBR retention
is still the separate next proposal. DEVICE1015 original first file is meaningful
regression test; second cube-only copy is useful geometry/UV sanity check.

## .1015 — native NOM affine-row rounding repair — 29 October 2026

Status:1015 LIVE / READY for testing; runtime6511ca38. Baseline main0ca3c2f9, live1014
runtime8a33141c / USER PASS retained. User reports “NOM Tex: invalid affine
transform” and supplies MAP TEST.nom. Reproduced on actual file at Text node:
float32 matrix[15]=0.9999997615814209 (2 float32 ULPs below1); exact affine-tail
validation incorrectly refused this saved polygon geometry. No texture-map cause.

Original nomad-import-core remains sole parser/geometry owner. Accept ONLY absolute
1e-6 deviations from [0,0,0,1] at column-major indices3/7/11/15; canonicalize copied
Matrix4 row BEFORE parent composition. Upper3x3 and translation unchanged; source
JSON/bytes never mutated. Bound is independent of large translation/scale. Finite
16-element/type, singularity, limits, UV/index/hierarchy and atomic parse-before-add
checks retained. Larger perspective/non-affine drift, zero w, invalid values and
singular transforms still refuse. No generic transform/Array/geometry-owner change.

Actual source now decodes Cube496v/504f and Text7911v/7916f, BOTH with UVs. Existing
.boxlab Save/Open -> NOM export -> reimport retains their counts/UV presence; source
bytes unchanged. Scene lights/cameras omitted and sculpt-layer flatten warning remain.
Paint/materials/textures/masks remain unsupported by native import; this build does
NOT implement the retained-map proposal. User artwork not copied into repository;
regression uses only exact failing matrix with independent upstream geometry fixture.

Two new actual parser/dispatcher tests cover sample transform/mirror/source/UV,
positive/negative row drift at parent+child, canonical placement and refusal of
perspective/invalid/singular rows (including huge translation). 23 focused checks
PASS; full local Node24.22.1 regression2986 PASS/0FAIL/0skip/0cancel (113.42s).
Syntax/whitespace clean. Native iPad device acceptance pending.
Reviewed1015 shell/bootstrap/release/comparison, import->decoder and canonical
release->face-layout->drawer cache closure. Existing comparison ratings migrate1014;
A default/no repeat A/B gate. Protected Multi1.0/frozen Beta2–7,1014 unfiltered picker,
1012 gizmo/compact,1011 navigation,1010 Paint/gestures, resource/export owners unchanged.

DEVICE1015: refresh to1015; import original MAP TEST.nom, inspect Cube/Text relative
placement and UV Editor. Undo/Redo import; Save/Open .boxlab and NOM geometry/UV export.
User clarifies Text is a live, non-validated Nomad text object; saved polygon
shape imports, not editable Nomad text semantics. Validation may rewrite its matrix
but that workaround is untested and is not required by this bounded repair.
No texture/PBR transfer promise. Next follow native import feedback, then separately
scope native NOM retained-map resources/round-trip. See docs/publication-1015.md.

## Texture/PBR priority and retained-map proposal — 29 October 2026

Current runtime remains .1014 LIVE / USER PASS. User explicitly corrects earlier
vertex-paint recommendation: low-poly BoxLab needs UVs, embedded textures and PBR;
vertex colours are secondary/deferred until mesh density becomes practical. This
supersedes the painted-vertex-colour next-build proposal below. No new build asked
for or implemented during this strategy discussion.

User asks whether opacity/displacement/emissive can be retained without display,
or should be implemented. Recommendation (proposal, not shipped): preserve all
native NOM map slots first as an encoded material resource bundle, independently
of renderer support. Retain original encoded bytes/bit depth, slot/image/material
associations, UV set/transforms/sampling/channel packing, colour-space semantics,
factors and displacement strength/midpoint/world/projection settings. Keep original
import scale/unit semantics; do not silently apply world displacement values to a
rescaled mesh. Reuse existing resource pools/codecs/export owners with truthful
native NOM provenance; no fake GLB provenance or second material/paint kernel.

Pass-through acceptance gate: NOM import -> .boxlab Save/Open -> NOM export retains
map byte hashes, assignments and settings when supported source mapping is unchanged.
UV/topology edits must track compatibility and clearly flag invalid bindings; no
silent resource deletion, re-encoding/resizing or false preview/round-trip claims.
Memory budgets still apply; retain unused maps encoded, avoid eager GPU decode.
Slots can show available preview versus retained-for-export status.

Audit: project-glb-resources already pools/preserves imported GLB bytes + material
JSON; nomad-export-core/nativeMaterialMaps and nomad-displacement-map already export
supported GLB-derived emissive/displacement data. Native NOM import still explicitly
ignores paint/material/image resources. Existing surface preview accepts opaque
materials and currently uses a colour MeshBasicMaterial overlay. Therefore current
BoxLab is not a complete native NOM PBR viewer; reconnect/extend original owners.
Existing native export has strict source/projection/sampler/material limits, so raw
retention and corresponding native NOM export support need explicit tests first.

Rendering recommendation after retention: base colour + normal/roughness/metalness;
emissive preview early (self-lit appearance, not automatic scene lighting/bloom),
opacity next (cutout then blending/sorting/picking/shadows), displacement retained
only initially. Displacement moves existing vertices; detailed results need enough
vertices, not mandatory automatic subdivision. Later optional bounded render-only
subdivision/displacement must preserve editable Base and pass device memory/speed
benchmarks. No dense preview or performance benefit implied in current build.
Primary renderer reference: https://threejs.org/docs/pages/MeshStandardMaterial.html .

Next narrow candidate is native NOM texture/material retention and round-trip
validation; scope preview additions separately as audit permits. This is a recorded
recommendation, not implementation authorization for a new feature build. No
runtime/release/cache changes and no new hands-on tests this session.

## .1014 user PASS / next recommendation — 29 October 2026

Current: .1014 LIVE and USER ACCEPTED. User explicitly: “PERFECT 1014 PASS”.
Protect the unfiltered native mesh chooser and accepted NOM selection/import flow;
do not reinstate accept filtering, wildcard MIME workarounds or duplicate pickers.
This supersedes earlier .1014 pending-picker notes below. It does not add paint,
materials or editable layers to the geometry/UV-only implementation.
Runtime8a33141c, publication docs/publication-1014.md. Hosted full regression
40827907551 now completed SUCCESS; Pages40827906168 SUCCESS (rechecked).
User's positive right-side-screen observation remains recorded; no new A/B batch.

User asks “Whats next?”; this is a roadmap discussion, not a new feature build.
Recommended next narrow candidate: native NOM painted-colour preservation, so the
imported mesh can retain Nomad appearance. Audit existing vertex-colour preview,
project codec and GLB/NOM export owners plus source-layer compositing first; define
bounded supported channels before implementation. Reuse existing resource/geometry
owners, no duplicate renderer or paint kernel. Subsequent stages: roughness/metalness,
then embedded image textures and richer layer/repeat support. Those are proposals,
not features shipped or automatic commitments. .1011 gesture/.1012 gizmo/compact
individual feel has no separate explicit grading beyond supplied build feedback.
No runtime code, release version, cache pins or new build changed in this session.
No new mandatory device test. Optional confidence check: imported NOM -> Save/Open
.boxlab and mapped UV Editor; this is existing .1013 geometry/UV scope, not colour.

## .1014 — unfiltered native file chooser for NOM — 29 October 2026

Status: .1014 LIVE / READY for testing. Runtime8a33141c; Pages40827906168 SUCCESS;
10/10 live byte matches. See docs/publication-1014.md. Baseline maind5bf9f6a/runtime2e31ed3d (.1013).
User reports NOM files GREYED OUT in iPad Files before selection. This blocks native
1013 acceptance before decoder runs; do not treat as a parse failure or native PASS.

Audit: only #importMeshInput shell attribute sets its type restriction; importer
and later modules never rewrite accept. Existing project Open already uses an
unfiltered input. Remove ONLY accept=".obj,.glb,.gltf,.nom" from original mesh chooser.
No wildcard MIME replacement, guessed NOM MIME/UTType, duplicate picker, renaming,
permissions flow or new JS file handler. Button still names supported formats;
original dispatcher refuses unrelated extensions before reading and original NOM
parser validates signature/sections/geometry after selection. Importer/core bytes
and1013 cache pins retained, including limits and geometry/UV-only scope.

This targets native type filtering; exact iPad Files/provider cause not proven.
HTML Standard explains accept is a native picker hint, using platform type tables:
https://html.spec.whatwg.org/multipage/input.html#attr-input-accept . Historical
WebKit229456 documents greyed-out iOS files with wildcard filtering; resolved bug
is not a diagnosis of current device. Never substitute accept="*/*" here.
https://bugs.webkit.org/show_bug.cgi?id=229456 . Native picker validation remains
pending; no DOM/Node claim that Safari's actual chooser has been repaired.

26 focused checks PASS: original NOM decoder/actual dispatch/codec/GLB/NOM tests,
import controls, current release/assets/identity; one new guard asserts the same
shell chooser is unfiltered and unrelated files are refused before reads/adds.
Syntax/whitespace clean. Shell-only feature fix; full local baseline1013 had2983
PASS, not rerun for unchanged decoder/geometry. Hosted CI result recorded at proof.
Canonical1014 release/bootstrap/comparison + release->face-layout->drawer pins
reviewed; comparison migrates1013 with ratings intact, A default unchanged.
Protected Multi1.0/frozenbetas, NOM importer/export/donor,1012 gizmo+compact,
1011 navigation and1010 Paint/three-finger code remain unchanged.

DEVICE1014: refresh to1014; File Import -> NOM should be selectable, then original
native geometry import should run. Try existing OBJ/GLB once. If still grey, report
whether file is local/iCloud/another provider; don't change decoding based on an
unopened file. Broader native NOM geometry/UV gate and paint/material stage remain
as recorded in1013. User's positive right-side observation retained.
Publication evidence: docs/publication-1014.md (verified).

.1014 publication verified — 29 October 2026:
Runtime8a33141cc957ce054294a9a08141257d6c11d39a; tested/uploaded tree
e7d18056cc99d81c0f0618a5f70674ad89101d31. All12 blobs hash-verified before atomic
non-forced expected-main update; fetched main tree exactly matches local checkout.
Pages40827906168 completed SUCCESS.10/10 cache-busted live files match, including
unfiltered shell, release-loader chain and unchanged importer/decoder/Multi1.0.
26 focused checks PASS,syntax/whitespace clean. Full local1013 baseline2983 PASS
retained; no fresh full local run for shell-only change. Hosted40827907551 still
in_progress at proof,not claimed PASS. .1014 LIVE/READY for native chooser retest;
actual iPad Files selectability and subsequent NOM import remain pending.

## .1013 — native NOM polygon import — 29 October 2026

Status: .1013 LIVE / READY for testing. Runtime2e31ed3d; Pages40821570325 SUCCESS;
19/19 live byte matches. Publication:docs/publication-1013.md.
Full local Node24.22.1:2983 PASS/0FAIL/0skip/0cancel (105.64s).
Syntax/whitespace clean.30 focused +19 release-focused +14 final review checks PASS.
Protected Multi1.0, native NOM exporter/donor,1012 gizmo/compact,1011 navigation and
1010 Paint/three-finger owners remain unchanged. Publication/live verification complete; proof below.
 Baseline main4fd7510f / live1012 runtimeb6a6d9d8. Publication evidence:
docs/publication-1013.md; detailed scope/reference:docs/nomad-import-1013.md.

User reports “right side screen issue seems to be fixed!!”. Record explicit positive
native observation/no current recurrence, not a proven permanent engine diagnosis
or blanket .1012 gizmo/compact PASS. .1010 PASS and .1009 completed A/B/A acceptance
remain protected; .1011 gesture feel/.1012 gizmo+compact checks not explicitly graded.

User requests native NOM import and supplies creator Stephane's nom_file.py.
Audit confirms native EXPORT already exists; Import currently OBJ/GLB/GLTF only.
Use current upstream08391c8e (28October), blob6dcb1eab, plus adapter for hierarchy,
triangle/FaceMeta/UV conventions. New independent browser parser in nomad-import-core,
not Python runtime or copied upstream module. Existing export-template header reader,
NOM writer/donor and all Paint/geometry/export owners unchanged. No second modelling
kernel. File chooser/dispatcher/addImported remain authoritative; new format only.

Support raw/zero/legacy/current LZ4 typed geometry arrays, safe modern/legacy headers,
thumbnail beforeJSON/afterbin, native quads and negative-fourth triangles (plus own
export repeated-third compatibility), names, parent transforms, visibility, mirrored
winding+UV correspondence, facegroups and per-corner UV seams. Main saved shape,
active-level topology fallback, baked triplanar if supplied. All geometry decoded/
validated before first manager call. Native indexed topology bypasses existing OBJ/
GLB weld/reconstruction, retaining coincident disconnected indices. Existing common
fit/manager/history/reference owners handle import. File info/status state geometry+
UV only: paint/materials/textures/masks not imported; sculpt layers flatten to saved
shape. Lights/cameras omitted with note. Repeat hints/unbaked procedural/missing
compressed multires topology refuse whole import with actionable save/validate hint.
Limits128MiB file/16MiB JSON/64MiB requested decoded arrays/500k vertices+faces total/
512objects/4096nodes/depth128; not an iPad performance guarantee.

Native UV-only source=boxlab envelope (existing version/schema) survives original
UV Editor/Paint/project/GLB/NOM owners. No fake GLB provenance, new codec or image
schema. Native noUV remains plain geometry. FaceMeta hidden faces imported visible
with note; hidden objects retain visibility. Source file untouched, previous scene
retained. File Import includes .nom and concise scope note before file selection.

9 new checks: independent upstream-writer+nativeLZ4 fixtures verified by upstream
reader (raw7/chunked7/legacy5), malformed lengths/signatures/limits/type/compression,
active fallback/emptylevels/procedural/refusal, saved shape warnings, actual File
route/fit/names/visibility/index preservation/reference, UV SaveOpen/GLB/NOM reimport.
Genuine donor2642v/2640f compressed native geometry and preJSON thumbnail decode.
30 focused checks PASS;19 release-focused PASS;final complete suite2983 PASS/0FAIL (105.64s).

Reviewed1013 cache closure:import-mesh/new core, release/bootstrap/comparison and
canonical release->face-layout->drawer parents. Original import stamp882 retained.
Old comparison ratings preserved by migration1012;A default/no new comparison ask.
Protected Multi1.0, frozen betas, navigation1011, Paint/three-finger1010 and accepted
1012 gizmo/compact code, NOM export and donor all unchanged. No broad UI cleanup.

DEVICE1013: File Import a small low-poly .nom; inspect named objects/relative placement,
quads/triangles/facegroups; UV Editor if source mapped. Reference locks; Save .boxlab,
reopen and export NOM to confirm shape/UVs. Texture/paint appearance is NOT supported
by this stage; File note/status makes this explicit. If rejected, send exact error
and source NOM for targeted compatibility work. No fresh A/B testing required.
Next: native NOM device gate, then staged paint/material/layer/repeat support as
requested; keep positive right-side observation and historical limits honest.

.1013 publication verified — 29 October 2026:
Runtime2e31ed3d96cf1e40b37505a7c3435c6eead0b19f; tested/uploaded tree
01d04607dce98d508d35442488db1e91a0cb8a92. All16 blobs hash-verified before atomic
non-forced expected-main update; fetched main exactly matches local tested tree.
Pages40821570325 completed SUCCESS.19/19 cache-busted live files match the tested
checkout, including new decoder/importer/release loaders and protected NOM exporter/
donor,1012 gizmo/compact,1011 navigation and1010 Paint/three-finger/Multi1.0.
Local2983 PASS/0FAIL/0skip/0cancel (105.64s),final7 release checks PASS.
Hosted40821571190 in_progress at proof,not claimed PASS. .1013 LIVE/READY for native
NOM geometry/UV checks. Native1013 acceptance pending; geometry-only scope retained.
User positive right-side observation recorded without inferring all1012 features PASS.

## .1012 — view-axis rotation ball and optional compact Split View — 29 October 2026

Status: .1012 LIVE / READY for testing. Runtime b6a6d9d8; Pages40819129157 SUCCESS.
17/17 live byte matches; baseline2c6899d3. Full proof: docs/publication-1012.md.
Full local Node24.22.1: 2974 PASS / 0 FAIL / 0 skipped / 0 cancelled (104.38s).
Syntax/whitespace clean. Protected Multi1.0, frozen betas, main/free-orbit1011,
Paint/three-finger1010 unchanged. Publication verified below.

Publication and final regression evidence: docs/publication-1012.md.
User .1010 PASS and completed .1009 A/B/A PASS remain protected; no .1011 or .1012
native acceptance inferred. No repeat comparison batch requested; A stays default.

User's final grey-circle clarification is authoritative: rotate the OBJECT around the
SCREEN/VIEW axis after aligning the camera. This is NOT a 3D arcball or camera orbit.
Audit found this already in transform-upgrade (single/components) and object-origin
(Multi/groups); reuse their existing View quaternion, pivot/origin, selection and
history owners. Explicit kind=screen now prevents Axis Snap inferring XYZ for this
handle only. Other constraints, angle detents, Exact-entry behavior and kernels stay.
An earlier unshipped 3D trackball prototype was discarded following clarification;
no trackball helper, second transform kernel or new raw pointer listener ships.

Total Gizmo replaces old small white View ring with a 52 CSSpx grey rotation ball:
very faint neutral fill, dark charcoal outline, slight yellow active highlight. It is
behind existing XYZ arcs/arrows/pads/scale nodes/Move centre; those retain priority.
XYZ paths AND their hit proxies contain only the camera-facing semicircle; no rear
hit geometry, closing chord or opaque occluding disc. Face-on limb stays a full ring.
Orange Scale circle, corner controls, projected axes, clipping/singularity refusal,
Extrude planes and original Exact flow retained. Reference: IMG_8352.png and
44FFE5E2-ECFA-4300-B539-7F13E195BAAE.png supplied in current chat. Dark/light SVG
projection preview inspected; not a Safari pixel/hit-testing or native acceptance claim.

Split View: original portrait gate offers Continue in compact view. Explicit choice
persists for this browser session (storage-denied fallback stays in memory). Active
only in narrow panes; widening restores normal labels/layout automatically. New
compact-layout.js + scoped CSS are presentation only. Original mode/tool/Paint nodes,
textContent, selected artwork, dispatch and disabled states stay authoritative; labels
remain accessible as aria-label/title. Radials fit within pane, icon-only targets >=44px;
extra-narrow <=400px uses the same original tool buttons as a four-column icon grid.
Only tool-picker centre is fitted; transform gizmo remains on selected geometry.
Paint radial 292px /48px targets, shorter layer list and single-column brush settings;
original LEFT dock, labels/values and Done/Undo/Redo retained. No renderer, backing
size, model, history, reparenting, synthetic resize, polling or gesture changes.
Existing sizing observer handles revealed app/real pane resize. BFCache return
reconnects decoration observer; pagehide disconnects it. Reference split screenshot
195C705C-0E7B-4E54-9369-5B8DB758DF2E.png. iPad feel/visual parity still pending.

Reviewed cache closure: total-gizmo, transform-upgrade, object-origin via drawer,
canonical release-version via face-workflow-layout/drawer, bootstrap and comparison
pins .1012; new compact assets .1012. Comparison only code labels/log migration1011;
old ratings and structure unchanged. Internal old module stamps intentionally stay.
Main/free-orbit1011, Paint/three-finger1010, accepted icon CSS and protected Multi1.0
and frozen Beta2–7 remain byte/pin unchanged. No large UI cleanup applied.

Validation: 9 new actual-owner/presentation checks; 35 focused +22 contract/corner
checks pass. Final complete suite:2974 PASS/0FAIL/0skip/0cancel (104.38s). Older
.358 object-origin fixed-pin assertion now uses reviewed asset contract for the
explicitly requested owner change; protected Multi1.0 assertion unchanged. .712
screen-circle assertion follows new grey markup but retains View owner and Move
centre/corner protections. .961 checks open front path without closing rear chord;
.570 checks original proxy routing while grey ball uses its own filled hit region.

DEVICE1012: inspect gizmo over dark background/light object while orbiting; no rear
arcs. Drag grey interior around centre: object rotates about aligned view, subtle
yellow press; Move centre/XYZ/Scale still work. UndoRedo; try Multi/group. Split View
portrait notice -> Continue compact; mode/tool/Paint icons fit, choose tool/Paint,
Done; resize pane/full screen restores normal labels. Navigation and Paint gestures
from1010/1011 remain; native1011 feel and1012 checks pending explicit PASS.

Next: respond to native gizmo/compact feedback, keep visibility fault watch honest;
no new A/B batches or unsupported permanent compositor repair claim.

.1012 publication verified — 29 October 2026:
Runtime b6a6d9d8c26f594a73b24ad82803afedd469566b; tested/uploaded tree
5b091b02c0efcaa67d076f8f1648a78c0bd28bbd. All22 blobs verified before atomic,
non-forced expected-main update; fetched main exactly matches tested local tree.
Pages40819129157 completed SUCCESS.17/17 cache-busted live files byte-match,
including all changed runtime/loader assets plus protected navigation/Paint/Multi.
Local2974 PASS/0FAIL/0skip/0cancel (104.38s), final7 release checks PASS.
Hosted40819129612 in_progress at proof; not claimed PASS.10 protected navigation,
Paint, Multi and icon files are byte-identical to baseline. .1012 LIVE/READY for
native gizmo/compact checks; no native1011/1012 PASS inferred. See publication proof.

## .1011 — immediate navigation and two-finger anchored twist — 29 October2026

Current:1011 LIVE,runtimef9899386,tested treeb72a6e24;Pages40807730838 SUCCESS,
11/11 live byte matches. Local2965 PASS;hosted CI in_progress at proof.
Publication evidence:docs/publication-1011.md.1010 PASS protected,1011 feel pending.

User “1010 PASS” protects unrestricted one-finger orbit,Studio3finger light,Paint
vertical size/preview,presets/larger radius and original history/navigation behavior.
User explicitly reverses inertia preference: remove its tail. Do not preserve1010
inertia as a required device feature. Current1010 acceptance is explicit,not pending.

Baseline main82ef8f85/runtime7afc6a61;live1010 shell/manifest verified before changes.
Main disables native damping:orbit,pan and dolly stop on release. Existing free-orbit
subclass remains sole rotation extension to Three0.179.1;one-finger full3D tumble
and native pointer/Pencil gate/target/history owners retained. No new gesture listener.

Interpret requested two-finger rotation as SCREEN-PLANE TWIST around held contact,
not a new mesh-picked3D orbit centre. This interpretation was stated to user while
working. Extend SAME _handleTouchStartDollyPan/_handleTouchMoveDollyPan owners:
track contact pair,derive signed twist/pinch,rotate camera up and reuse original
Three dolly and pan projection. Compensate off-centre rotation/zoom with a similarity
mapping in CSS/page coordinates. Less-moving contact is anchor,including at zoom
limits. On controls target-depth plane both contacts track their screen positions;
no surface hit/raycast/scene/model/selection mutation. Empty viewport also works.

Both fingers moving together PAN;separation PINCH;relative angle TWIST,simultaneously.
Either finger can stay planted while other arcs around it. Works after inverted or
oblique orbit and with canvas offsets/page scroll;no ground-bound reset. Contacts
closer than12px safely rebase rather than undefined angle/zero dolly. Native cancel/
lift returns to one-finger state;disabled controls refuse moves. Original tap threshold
continues2fingerUndo/3fingerRedo;1010 three-finger commands untouched.

Changes narrow:main default/import pin and free-orbit controller.1011 shell/recovery/
canonical release-loader layout+drawer pins reviewed;comparison only code labels and
log migration1010,old ratings/PASSes unchanged. Paint/presets/preview/raster,lighting,
Multi1.0,frozen betas,modelling/UV/accepted appearance and sizing bytes/pins unchanged.
58 focused checks PASS,including10 new actual native pointer/controller checks:
either anchor,inverted/oblique camera,parallel pan,pinch+twist,limits,near-coincident
refusal/cancel,disabled move and zero drift. Original1010/Paint/history checks retained.
Full local Node24.22.1:2965 PASS/0FAIL/0skip/0cancel (111.97s).
Syntax/whitespace clean. Publication proof:docs/publication-1011.md. Native1011 feel pending.

DEVICE1011:one-finger orbit/flick→lift stops immediately;two fingers translate/pinch;
hold either finger and arc other→view twists around held point. Combine all3;lift one
and continue one-finger orbit. Check2tapUndo/3tapRedo and1010 light/brush gestures.
Next:device feedback on twist interpretation/feel.1009 A/B complete,PASS protected;
A default retained,no repeat batch or rendering-root-cause claim.

## .1010 — free orbit and three-finger light / brush controls — 29 October2026

Current:1010 LIVE,runtime7afc6a61,tested tree0630b732;Pages40780100247 SUCCESS,
18/18 live files byte-match. Local2955 PASS;hosted CI in_progress at proof.
Publication evidence:docs/publication-1010.md.1009 comparison PASS protected.

Baseline main8e00f2b8/runtime1e34c432, live1009. User explicitly requests free orbit,
inertia,3-finger horizontal light rotation,Paint vertical size + stroke preview,
larger brush and more standard tips. This authorizes changing former upright orbit
behavior; no unrelated modelling or UI cleanup. Audit original main touch/tap owner,
Three0.179.1 OrbitControls,Studio light-angle owner199 and production Paint/alpha.

FreeOrbitControls subclasses SAME Three controller; only rotation math becomes
camera-relative quaternion tumble across both poles, including inverted views.
Native pointer registration/Pencil gate/pan/pinch/wheel/target/change events retained.
Original damping.08 provides inertia; next contact,disabled tool or external camera
view change stops spin. No second pointer owner,model rotation/kernel or ground move.
Never clear native pan/dolly on ordinary idle rotation updates: this was caught and
corrected during1010 validation, now explicitly tested including upside-down pan.

Main's existing touchstart/move/end/tap owner delegates3-finger commands to a pure
state helper (NO listeners). Third finger pauses navigation;12px threshold locks first
dominant direction. Horizontal rotates original Studio angle (.5degrees/CSSpx,wrap
±180) via existing setter/UI/persistence; unlit looks need Studio/material preview to
see lighting. Vertical IN Paint sets same radius control exponentially:UP larger/DOWN
smaller. Fill,image placement,AO,stroke/drag/busy sessions refuse size changes. Controls
restore only after ALL contacts lift; cancel/blur/pagehide/hidden restore safely.
Two-finger tap Undo and three-finger tap Redo retain original history owners; moved
or4-finger gestures never become Redo. Finger1 orbit/finger2 pan+pinch retained.

Paint original raster/settings radius1–256texels (old48); maximum diameter512texels.
Only NEW >48 ordinary/Blur strokes gain8million raster-pixel work window,renewed
per input with SAME snapshot/coverage/history; existing Smudge budget retained.
No silent resize,new texture schema or history entry for changing settings. Built-in
Soft round/Hard round/Flat/Chisel/Dry bristle use original hardness/alpha-tip raster;
imported PNG tips/rotation retained. No airbrush/time-accumulation promise.

Vertical size drag shows a top-centre noninteractive preview card with actual original
raster stroke,selected colour/opacity/hardness/tip and radius readout. Preview represents
a1024texel chart at quarter scale,NOT guaranteed world/screen surface footprint across
UV densities. One queued frame uses latest size; lift/cancel/Done hides and suppresses
late draws. No mesh hit proxy,scene/paint-resource/history mutation. Cancel restores
pre-drag size; ordinary release keeps size. Existing LEFT Paint settings preserved.

Reviewed1010 reverse cache graph:main + new controls/helper;production Paint/raster/
new preset/preview;shared Lab/session imports (pins only),shell/recovery/release and
layout/drawer canonical release-loader parents. Unchanged assets retain older keys.
Protected Multi1.0/frozenBeta2–7/geometry/UV/Fill1004/accepted icons unchanged. Runtime
comparison1010 only code labels + migration1009;both structures/default/resolution intact.

User1009 A/B/A explicitly ALL PASS now protected:5 complete A +5 complete B,0 rated
FAIL;20 unrated excluded. Both shell/checklist1009,actual/saved1x. See exact IDs and
limits in docs/shell-comparison-results-1009.md. Keep A default,comparison gate complete;
no B superiority/permanent engine repair inferred. Historical pixel fault watch remains.
Initial publication was held while user's experiment ran; experiment is now complete
and1010 is published after validation under existing standing authorization.

Tests execute real Three rotation/native pan/dolly,actual main tap handler,command
axis/drain/cancel,production Paint UI and pixel raster/preview,presets,large brush work
renewal,cancel and ONE Undo.928 history fixture now stops extraction before new command
initialization and injects actual helper; all original history assertions retained.
896 invalid-radius fixture49→257 follows deliberate new limit. Full/focused results and
publication proof in docs/publication-1010.md. Full local Node24.22.1:
2955 PASS/0FAIL/0skip/0cancel (117.01s),including10 new actual-owner checks.
Syntax/whitespace clean. Native iPad1010 feel remains pending.

DEVICE1010: continuous1finger tumble past top/bottom;flick/re-touch stops;pan/pinch
and view buttons still work.3finger horizontal Studio drag rotates light without model
motion or Redo. In UV Paint vertical3finger UP enlarges/DOWN shrinks with stroke sample;
lift hides preview and settings remain. Try five tip presets/large Pencil stroke;
UndoRedo one stroke,3finger TAP Redo,Done/navigation. No repeat A/B batch required now.
Next respond to native1010 gesture/brush feel; broader brushes/refinements stay staged.

## .1009 — immutable loaded-shell identity; OBJ release writer removed — 28 October 2026

Current:1009 LIVE, runtime1e34c432; Pages40683927107 SUCCESS; all9 live files
byte-match tested tree20cb43c1. Local2945 PASS; hosted CI in_progress at proof.
See docs/publication-1009.md. Screen beta gate remains OPEN.

Baseline main cf5f8da7 / runtime09b73cc0, live1008 markers and existing pins audited.
Original classic head release-bootstrap captures the initial HTML title synchronously
as non-writable/non-configurable __boxlabLoadedShellVersion BEFORE comparison and
modelling modules. Existing release-version prefers that value, restores both label
text and data-release-version and observes that attribute; public stamp cannot adopt
an arbitrary version. version.json remains available-latest only. Existing startup
cache-recovery/retry and app-return behavior retained; no new updater/repaint owner.

Remove ONLY secondary app label/dataset/title writes from scene-obj-export-238.
Its internal450 stamp, OBJ headers/filenames/MIME, Base/SubD geometry/preflight,
source/history and event routing remain unchanged. Original comparison reads immutable
shell identity, stamps executed1009 independently, preserves1006/1007/1008 records,
ratings/notes/first failures exactly, and starts fresh unrated1009 loads. In-app guidance
now says alternate A/B with original explicit reload controls, same1x/orientation/cube.
Neither profile structure nor default changes; no pixel repair/native PASS claimed.

Reviewed1009 cache closure: bootstrap/release/comparison, canonical direct+nested OBJ
and its conformance parent, canonical direct+nested release and layout/drawer parents.
CSS1008 retained unchanged. Protected Multi1.0, frozen betas, main/sizing/debug, original
Fill1004 PASS and accepted modelling/Paint/UV owners untouched. Previous1008 A4PASS/2FAIL
and B5PASS observations remain protected for THOSE runs; beta screen gate stays OPEN.

48 focused checks PASS/0FAIL/0skip. Five new checks cover actual exporter before/after
release initialization, Base/SubD output equality/source isolation, early immutable
capture, adversarial metadata + manifest/offline returns, comparison identity and exact
1008 evidence retention. Re-running new exporter regression against pre-fix wrapper
fails as expected. Existing canonical-loader tests follow reviewed1009 pins; no semantic
protection removed. Full local Node24.22.1:2945 PASS/0FAIL/0skip/0cancel (117.67s).
Publication proof: docs/publication-1009.md.

DEVICE1009: visible app and checklist both1009; Copy current environment/new rated
observations shellRelease1009, old1008 observations450 remain historical (do not rewrite).
Alternate A/B inside app without app-switch/recovery, startup FIRST; retain resolution
and orientation. Original checklist Hide/UV Back/Paint Done still usable. Follow with B
selection/navigation/gizmo/UV/Paint/UndoRedo/SaveOpen parity before default adoption.
Next act on interleaved native evidence; no speculative compositor or UI reskin change.

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

## .1008 — verify executed code; resume comparison with Hide escape — 28 October 2026

Screenshot1007 still obstructs A UV Back. Found original release-version advanced
visible label on app return without reloading code; fix label to loaded shell and
canonicalize both current release-owner loaders. This is a confirmed metadata bug,
not proven source of right-region pixel loss. Checklist independently stamps1008.
Explicit Hide/reopen guarantees tester can clear viewport controls, inline docking
observes actual UV state without :has. Same changes A/B; preserve prior logs/PASSes.
Resume native comparison after one1008 load. Keep original screen beta blocker OPEN;
no broad reskin or modelling change. Do not interpret stale labels as runtime proof.

## .1007 — unblock comparison before interpreting its results — 28 October 2026

A's UV Back control was covered by the comparison checklist. Fix only test-list
placement using original workspace hidden state: lower-left while UV Editor open,
normal top-left on exit. Same docking in A and B; retain all renderer/tool owners.
Preserve1006 log with per-run release provenance, fresh1007 loads remain unrated.
Resume native A/B comparison; no rendering PASS/FAIL inferred from an obscured exit
control. Original screen issue still blocks beta. See publication-1007 and handoff.

## .1006 — native shell comparison is the beta gate — 28 October 2026

User authorizes comparison build with an in-app test list because switching apps
heals the fault. A current and B separated-canvas use identical original tools,
renderer and resolution. B moves only original canvas to sibling viewport surface;
original UI/gesture/geometry/history owners retained. Default app remains current.
Five-step left checklist/ratings/notes/counters/Copy survive reloads; explicit
reload-only A/B, scene-discard acknowledgement, bounded result storage and busy guards.
Protect1004 Fill user PASS; screen1005 FAIL remains release-blocking. No native
repair claim. Collect5 completed loads per profile if practical; incomplete loads
are not passes and first failures remain recorded. Native startup status/menu/gizmo
and UV/Paint return results decide next shell reduction/consolidation. Both fail:
reduce further using evidence. A fails/B stays healthy: expand native regression
before adopting structure. Both healthy: fault not reproduced, comparison inconclusive.
B alone fails: reject B structure. No broad visual reskin/parallel tool or renderer implementation.
See AI_HANDOFF.md and docs/publication-1006.md; tester follows instructions in app.

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

# BoxLab Development Roadmap

## Radial visual selection sheets v1 complete — 25 October 2026

Design review only; runtime remains .967 with protected user PERFECT/PASS. All65
semantic tools now have THREE original vector candidates:195 SVGs on10 sheets.
Delivered BoxLab-Icon-Selection.pdf, BoxLab-Icon-Review.html and
BoxLab-Icon-Review-Pack.zip (PDF/HTML/PNG sheets/SVGs/manifest/rebuild source).
No default/user icon selections; await tool-name + A/B/C choices, then refine before
installation. Shared symbols retained in one review row; Vertex/Object Join separate.
See docs/radial-icon-review-v1.md. No new app test or runtime release needed.


## .967 user PERFECT / PASS; radial icon review direction — 25 October 2026

User explicitly accepts .967. Protect the canvas/UI composition boundary, right controls
visible on landscape refresh and normal UI transitions, and visible-page repaint recovery.
This closes the .967 invisible-but-clickable right-control device gate; older OPEN notes
below are historical. Do not infer separate unresolved AO/alpha/reflection acceptance.
User wants original Nomad-inspired icons with small visible titles below. Audit all radial
tool names and offer THREE candidates per tool; user selects, then refine before installing.
See docs/radial-icon-audit-2026-10-25.md for actual inventory, 3 concept directions per
semantic tool, naming cautions and staged visual review plan. No runtime change/build bump.
Prior next functional work: UV-free facegroup painting through existing faceGroups owners.
Bring icon review forward per user direction; no wholesale UI reskin or automatic icon choice.


This is the persistent product roadmap for BoxLab.

The repository is the source of truth. Keep this file aligned with `AI_HANDOFF.md`, `DEV_HISTORY.md`, and `TEST_CHECKLIST.md`.

## .898 — paint resource v1 and lab Save/Open; .897 PASS, 2026-10-17

User897PASS protects corrected outward preview, paint/navigation/history/plane baseline.
Audit current6677ce85: no editable paint-resource codec exists; native projectv3 UV-only.
Add src/paint-resource.js: version1 opaque baseColor/sRGB/RGBA8/UV-v0-first, explicit size/
binding, owned pixel capture/async encode/decode copies, exact SHA256 integrity. Metadata
frozen; typed pixels are read-only by caller contract, not magically immutable. No global
history owner or changes to native .boxlab resource envelopes.
Lab Save/Open .boxpaint v1 embeds scene through ORIGINAL BoxLab scene/nativeUV codec,
actual sample geometry/UVs, both512² results, settings/selected brush/camera. Binary header
≤1MiB/file≤4MiB, two exact raw RGBA buffers with descriptors/hash, bounded plain native
sample only. No fake GLB metadata, new mesh kernel, PNG reencoding or main paint save claim.
Save snapshots before await; Open stages/validates before replacement, clears lab history
on success, disposes old resources once. Invalid/corrupt/stale files keep committed work;
revision/generation checks block late Open after a new Pencil contact/settings/history/
reset/candidate/navigation or another Open. Unfiltered iPad picker follows existing
.boxlab Open to avoid unknown-extension filtering. PNG and accepted brush semantics intact.
Six new tests cover owned resource/integrity, exact three-sample pixel/UV/geometry/settings/
view restoration, async capture and load guards, budgets/corruption, real controller Save/
Open/continued Undo/stale-stage rollback/new contact. Extracted original lab test harness;
all original assertions retained. Full Node24 **2483PASS/0FAIL/0skip**. Browser/iPad gate
separate; no rendered/filepicker proof inferred from Node.
Shell/recovery898; lab loader/sample/session/resource898. Export897/codec887/core+stroke896
and all production UV/project/history/import/export/modelling/frozen owners unchanged.
No layers/autosave/main .boxlab paint/global scene history/Nomad paint export claim.
Manual: paint→Save Paint; Reset/reload→Open Paint from Downloads; compare both brushes,
settings/view, then draw/Undo/Redo and PNG. Next original scene-resource/codec/COW/history
integration after feedback. Publication verification follows; no898 device PASS inferred.

## .897 — UV preview winding repair; .896 brush PASS, 2026-10-17

User .896 PASS; only reported issue paint mesh normals not consistently outward.
Protect accepted brush comparison/Pencil/settings/navigation/paired history/PNG workflow;
normal orientation is the explicit exception, not a blanket896 failure or895 PASS.
Audit main53abe68b and original primitive/projection/export preview owners. Source sphere
and cube faces are outward, but projected Earcut triangles lose polygon winding:
original sample sphere240/528 triangles inward; cube6/12 inward. Recomputed normals or
DoubleSide cannot repair picking/culling orientation. Root is existing triangulateFace.
Add preserveFaceWinding option in SAME triangulation owner, enabled ONLY by
buildUVPreviewGeometry. Compare signed projected polygon area with each triangle and
swap two local triangle indices when opposite. Original face winding, including deliberate
reversed/imported surfaces, is preserved; no convex-centre heuristic/new triangulator,
source mesh/UV mutation or general normals repair command. Normals recomputed by original
geometry builder. Preview checker/image consumers also gain correct source winding.
Ordinary editableToGeometry/GLB file export keeps original default false; native NOM,
UV storage, brush raster/strokes/history/input and frozen/protected modelling unchanged.
Known ordinary export winding behavior is NOT repaired or claimed fixed in this scope.
After proper source winding, plane temporary display uses +X90 instead of896 -X90.
Three regressions cover EVERY sphere/cube triangle+normal, real front-sided raycasts from
six external directions/near hit, plane front, concave tilted/reversed polygon winding,
exact position/UV corner correspondence/read-only source and unchanged ordinary export
path plus triangle-corner sets. Full Node24 **2477PASS/0FAIL/0skip**.
Reviewed shell/recovery/export-parent897 and lab index/lab-loader/sample897; shared brush/
curve/core896 and native/export children892 retained. Main exporter internal stamp892
intentionally distinct from loader897. No blind all-module repin. Previous browser WebGL
limitation unchanged; device897 winding confirmation pending, no897 PASS inferred.
Next: orbit sphere/cube, paint around all sides; plane visible; switch brushes/UndoRedo.
Then resume paint resource/codec/COW/global-history design after chosen-brush feedback.
Publication verification follows; no layered or persistent painting claim.

## .896 — isolated UV Paint Lab, 2026-10-17

User /nextbuild after selective-reuse audit. Base main569d4e7e; build896 adds File link
to separate evaluations/uv-paint/?build=896. Shared screen inputs compare BoxLab distance
carry and attributed Klecks-derived BezierLine/PointLine/Vec2 (cc24e977), SAME new opaque
colour raster, two512² buffers, one paired6-step UndoRedo. Original BoxLab primitives/
Planar/Box/Sphere UVs and export-as-panel892 buildUVPreviewGeometry; no second triangulator.
No production paint/scene/input/history/resource integration. Exact upstream source and
MIT notice retained; no full Klecks brush/history/selection/editor/Parcel dependency.
Pressure→size, hardness, per-stroke opacity cap, subpixel stamps; real raycast per screen
dab, at most one texture-dirty mark/frame. CPU timings exclude GPU/frame time. Demo same
inputs, switch candidates, cancel/lost capture/blur/resize/visibility/settings rollback,
palm suppression/finger navigation, reset/disposal and top-down selected PNG.20MiB raw
active paint buffer budget excluding browser/GPU/PNG,12k dabs/candidate cap.
Seven tests plus full Node24 **2474PASS/0FAIL/0skip**. Real Three geometry/raycast/raster,
adapted controller Canvas/WebGL/OrbitControls; browser/iPad separate. Plane test caught
back-facing sample; rotate temporary display -X90 only. Distance parity allows1e-12
floating roundoff, not altered source geometry. All prior semantic checks retained.
Read docs/uv-paint-lab-896.md. Main shell/recovery896; original exporter892, MeshHealth895,
main854 and all protected Multi/frozen/modelling owners unchanged. Existing TexturePaint
trial intact. No layers/.boxlab/Nomad paint persistence, imported texture base, seam-safe
projection/world radius/PBR claim.895 density and trial device gates remain pending;
prior894PASS protected. Consolidated living handoff references exact prior193KB handoff
in git; historical chronology/acceptance retained in DEV_HISTORY/TEST_CHECKLIST.
Next: compare Pencil feel; refine chosen stroke/footprint, then explicit paint resource/
codec/COW/global history before real scene integration. No896 device PASS inferred.
Publication/CI/Pages/live proof follows separately.

## UV Paint integration audit — 2026-10-17

User says TexturePaint brush needs work but promising; requests audit of TexturePaint
and Klecks and delegates reuse-versus-new decision. No blanket trial or .895 PASS.
See docs/uv-paint-integration-audit-2026-10-17.md. Audited BoxLab main353e9881,
TexturePaint3af8a61e and Klecks cc24e97712c199929760250881ffe2e25233ce6d.
Decision: BoxLab-owned architecture + selective attributed brush/stroke/compositor
reuse; no wholesale editor/history/input import, no TexturePaint runtime dependency.
Klecks Pen/Eraser read and push KlHistory; LayerCompositor is a smaller extraction
candidate. Screen-space smoothing BEFORE picking; no UV spline across islands.
Three instrumented upstream probes confirm atlas-spanning Bezier marks (162),
smoothing position/pressure and compositor call order; no rendered pixel/perf proof.
Existing focused trial/release tests10PASS/0FAIL/0skip; not a new full-suite run.
Native resource v3 remains UV-only; design paint resource/codec/COW/history explicitly.
Next narrow build: isolated identical-stroke comparison on BoxLab-generated UV geometry,
one colour layer; benchmark adapted Klecks vs simple BoxLab brush before live integration.
No upstream source imported, no runtime/pin/version/frozen changes; .895 remains live.
No new hands-on test required for this documentation-only audit. Existing device gates
remain pending; user feedback is qualitative. Full report carries integration/acceptance plan.

## TexturePaint evaluation — 2026-10-17

User directs evaluation of ceramicSoda/TexturePaint for direct in-viewport Pencil
painting with instant feedback, ultimately brushes/layers/colour controls. This is
NOT a .895 PASS or a numbered main-app build. .895 density device gate stays pending;
.894 and earlier accepted gates remain protected. Main shell/runtime/pins unchanged895.

Audit upstream master commit3af8a61e9493ff960ff29ed429fc734335c80931 (MIT, source and
licence retained byte-exact) and BoxLab renderer/UV geometry/preview/gesture/tool-session/
resource/history owners. Upstream is CPU DataTexture stamping, no layer engine; confirmed
row-wrap corruption at texture edges and destructive getTexture reset/reallocation.
Other integration gaps: linear colour bytes, aliasing private Undo/no Redo, anonymous
mouse listeners, frame-rate stamping, no pressure/coalescing, seam masks or persistence.
See docs/texturepaint-evaluation-2026-10-17.md for exact findings and production plan.

Add SEPARATE evaluations/texturepaint/ browser trial on sample sphere/plane; no live
BoxLab objects, no production loader imports or app-state mutation. Reuse original
constructor/brush/DataTexture through attributed adapter with clipped stamp blending,
sRGB quantisation, hardness/opacity/pressure, screen-space resampling and real Three
nearest-surface raycasts. Live texture updates during movement. Pencil paints; fingers
use trial OrbitControls orbit/pan/pinch.512² map, radius1–64,12 Undo/Redo snapshots,
cancel/no-op/disposal; Download PNG flattens pixels with correct top-down row order.
Reset/reload clears volatile trial. Labels explicitly say no layers/project/Nomad save.
No claim of actual BoxLab mesh integration, seam stitching, world-radius brush or GPU
stamping. This separate page does NOT replace protected app gesture/history owners.

Five tests reproduce upstream faults and check corrected pixels/bounds/colour/pressure/
opacity, texture invalidation, bounded history/cancel/disposal, sampled actual sphere
raycasts, exact upstream SHA256/licence and app isolation. Full2467PASS/0FAIL/0skip
(Node24). Headless Chromium download returned truncated archives; rendered browser and
iPad acceptance remain distinct. Publish evaluation + report, then verify Pages/assets.

Next: evaluate Pencil feel and seams on M2; production prototype should reuse existing
buildUVPreviewGeometry/render owner and original tool/gesture/history owners. Native
resource v3 is UV-only: design explicit paint-resource transport/COW/codec before
promising Save/Open or native painted exports. Preserve replaceable paint backend.
Do not add further UV utilities in place of proving the requested 3D brush experience.

## .895 — Equalize UV density, 2026-10-17

User .894 PASS protects Sphere UV creation/layout/seams, Pencil edits/Pack all,
UndoRedo/navigation, project reopening and NOMAD Base UV export. Audit main39ae725e /
runtime260817ff, live .894 markers and current loader graph, original projection /
UV inspection/edit/workspace/history/export owners. No existing equal-density action;
Box/Cylinder projections already use common density, Pack all preserves input ratios.

Add Equalize density to ORIGINAL UV workspace for all1–128 islands, with or without
selection. SAME editImportedUV transaction/copy-on-write/native scene checkpoint,
expected payload/object/mesh/session guards, source images/peers/geometry read-only,
tangent retirement and selection retention. No new pointer/history/schema/kernel.
Each island gets one positive uniform scale about its bounding-box centre; preserve
shape, orientation and mirroring. Target is total input UV area / total Base surface
area; preserve total UV area, equalize each island's AVERAGE UV-area/Base-area ratio.
Aggregate ALL faces, including beyond preview. Read-only planar polygon area vectors
and signed UV polygon areas with normalized input; concave planar polygons supported.
No triangulation or source face mutation. Nonplanar/degenerate/missing/nonfinite mesh
or UV area refuses; numeric/export-f32 edge collapse, nonfinite export coordinates,
unsupported count or changed island connectivity refuses BEFORE history/mutation.
Already-equal/repeated result within1e-12 scale tolerance adds no history. Original
Pack all tolerance/maths unchanged; avoid absolute tile-coordinate no-op tolerance
for density because small off-tile coordinates must not hide meaningful rescaling.

Centres stay fixed, so enlarged islands MAY overlap or leave tile; use Pack all next.
Images stay fixed: sampling changes intentionally. This is UV-area density; equal
pixel density assumes the same image resolution. Does not remove within-island
stretch/distortion or bake/repaint textures. Success uses original workspace Fit;
rejection leaves view unchanged. Existing Pencil preview is cancelled on click.

Five new regressions: actual history/COW/peers/metadata/centres/aspect/area/no-op;
unequal surface areas/mirrored UVs, native Box quads+Pack, concave polygons, multi-face
islands/full-face metrics and huge/tiny geometry; stale/invalid/history/nonplanar/
zero-area/export-collapse/new-seam-join/count refusals; ACTUAL workspace+MeshHealth
no-selection action/Pencil cancellation/selection/stale guard; actual project codec,
NOM UV indices/f32 corners and Three GLB UV/tangent retirement.15 focused PASS.
Full Node24 **2462 PASS / 0 FAIL / 0 skipped**. Reviewed narrow graph shell/recovery/
MeshHealth895 -> workspace895/edit895; inspector880/preview/render/native892 and
scalar889 retained. Internal MeshHealth stamp880, Multi1.0/frozen/modelling untouched.

Device895 pending: cube -> MeshHealth UVs -> Box UVs -> Open UV Editor; select island,
Pencil Scale it larger, Equalize density makes six sides comparable again, then Pack
all separates them. UndoRedo, repeat no-op and Pencil/pan/pinch still work. Save/Open
.boxlab and File NOMAD Base retain layout. .894 user PASS protected; no895 device PASS
inferred. Next: density feedback, then audit next narrow UV authoring/painting stage.

## .894 — Sphere UVs (Y), 2026-10-17

User .893 PASS protects Pack all, framing/selection, UndoRedo, project/native UV export
and prior Pencil/navigation/map references. Audited main ccf5e0e4/runtime bbc0e4b2,
current markers/pins and original primitive/projection/UV/history/export owners; no
spherical UV authoring exists in current or frozen code (orbit spherical maths unrelated).

Add Sphere UVs (Y) alongside original MeshHealth Planar/Box/Cylinder buttons. Extend
SAME imported-uv-edit native projection owner and commitNativeUV transaction. Round
sphere with two Y vertex poles and seam-aligned longitude rings, including BoxLab's
Sphere primitive. Equirectangular longitude/latitude with 2% tile margin; deterministic
seam through the first non-pole corner. Split UV poles per face wedge without splitting
geometry. Replaces existing native UVs; refuses imported/resource-bearing, linked,
procedural, locked, modifier, nonround/no-pole/invalid/degenerate/unsupported seam spans
before history/mutation. Coordinates normalized before subtraction for huge/tiny input.
One existing native checkpoint, copy-on-write/peer isolation, repeat no-op. No geometry,
resource schema, exporter, pointer owner or native modelling kernel changes.

Five new regressions: source identity, pole/seam/tile layout, real UndoRedo/no-op;
4/5/12/32 radial and 2/3/8 latitude bands, translations/Y rotations and huge/tiny scales;
Box replacement/shared peers/Pack all; actual MeshHealth context action, project codec,
native NOM UV pool and Three GLB pole variants; context/invalid/history refusals.
15 focused PASS; full Node24 **2457 PASS / 0 FAIL / 0 skipped**. Reviewed cache graph:
shell/recovery/MeshHealth894 -> edit894; workspace893, inspector880, preview/render/
native892, scalar889 unchanged. Internal MeshHealth stamp880 retained. Protected
Multi1.0/modelling/frozen betas unchanged. Publication verified below.

Device894 pending: add Sphere -> Object MeshHealth -> UVs -> Sphere UVs (Y) -> Open
UV Editor; check flat latitude layout, Checker and surface seam/poles. Edit with Pencil,
Pack all, UndoRedo, pan/pinch. Save/Open .boxlab and File NOMAD Base retain UV layout.
Equirectangular mapping intentionally distorts near poles; not equal-density unwrapping.
Does not promise arbitrary deformed/tilted spheres, Quadball mapping, seam cutting,
optimal packing, painting, opacity recovery, native multi-materials or NOM import.
Next: Sphere device feedback, then audit next narrow UV authoring or painting stage.

## .893 — Pack all UV islands, 2026-10-17

User .892 PASS protects Roughness(G)/Metalness(B) references, prior map choices,
Pencil/navigation/history, project reopening and native six-map export. Audit main
321674aa/runtime68ee2db6 and original UV inspection/edit/workspace/history/export owners;
Fit-to-tile exists for ONE island, no all-island packer exists.

Add Pack all to ORIGINAL UV workspace. Whole current object's complete UV layout,
with or without an island selection; supported imported GLB and native BoxLab channels.
Deterministic GRID packing, not optimal polygon packing, seam unwrap or texture baking.
Try column counts for best common uniform scale; preserve every island's orientation,
shape and RELATIVE UV sizes/density. Island IDs/order unchanged.2% tile outer margin
and at least2% gap between island BOUNDING BOXES. At most128 islands; larger layouts
refuse before history. Does not remove overlaps WITHIN an island. Texture images stay
fixed: packing intentionally changes their sampling, like existing UV transforms.
Button title explains all-island scope/fixed images. No auto-pack on import/export.

Extend SAME imported-uv-edit transaction with packImportedUVIslands, using original
inspector connectivity/full faceIslands and shared bounds. Expected payload/scope/context,
complete matching channel, independent/unlocked/resource/history guards retained. Plan
with normalized coordinates to handle huge/tiny finite UVs; reject zero-extent islands,
nonfinite scale, collapsed extents or newly collapsed UV edges in double OR export-f32
precision before mutation. Existing copy-on-write payload/tangent retirement and one
native scene checkpoint. Source mesh, metadata/images, peers and source arrays read-only.
Near-identical repeated packed result (32EPS absolute in0–1) adds no Undo entry. Original
selected-island/whole-layout Rotate/Flip/Move/Scale/Fit maths unchanged.

Pack click cancels pending Pencil preview through existing owner, delegates original
MeshHealth transaction and retains matching selected-island membership. Successful pack
frames resulting tile with EXISTING view Fit; rejection leaves view unchanged. No new
pointer/history/resource/UV signature owner, schema or geometry changes. No packing of
selected subsets or user-adjustable gutters in this first stage.

Five native regressions: common scale/aspect/orientation/bounding gaps/COW/peer isolation/
actual UndoRedo/repeat no-op; native Box UVs, huge/tiny/full-face-beyond-preview layouts;
invalid/stale/locked/no-history/zero-extent/f64/f32 collapse refusals and128 allowed vs129
refused; ACTUAL workspace+MeshHealth no-selection launch/Pencil cancel/selection/context;
actual .boxlab codec, native NOM UV indices/f32 corners and Three GLB UV/tangent roundtrip.
Full local Node24 2452PASS/0FAIL/0skip. Narrow cache graph shell/recovery/MeshHealth893 ->
workspace893/edit893; inspector880/preview892/render/native export892/scalar889 retained.
Internal MeshHealth stamp880 retained. All protected modelling/Multi/frozen bytes unchanged.

Device893: cube -> MeshHealth UVs -> Box UVs -> Open UV Editor -> Pack all: separated
islands inside tile, result framed; select/move island then Pack all with selection
retained. Undo/Redo restores layout; repeated Pack all adds no extra Undo. Save/Open
.boxlab and File NOMAD Base retain packed layout/seams. This is manual UV layout
editing; do not expect imported painted texture appearance to stay fixed after packing.
Next: device packing feedback, then audit staged seam/UV authoring or resource-backed
painting; no new opacity recovery/native multi-material/NOM import claim.

## .892 — UV Editor Roughness / Metalness references, 2026-10-17

User .891 PASS protects Normal/Emissive references, existing Pencil/navigation/history,
Image-off reopen, project resources and native six-map export. Audit current main
433c73f0/runtime278b0042 and original chooser/decoder/controller/workspace plus native
packed-map owner. Existing native export proves glTF roughness=G and metalness=B.

Extend ORIGINAL optional UV map chooser with Roughness (G) and Metalness (B), BOTH
resolving material.pbrMetallicRoughness.metallicRoughnessTexture through the same
embedded-image resolver. Never use red/occlusion, luminance, filenames or inferred
images. Raw channel references: do not bake roughnessFactor/metallicFactor or simulate
PBR shading. Only UV workspace opts into five map kinds; default base-colour consumers
(surface/native writer) retain identical source selection/shape/behaviour.

Extend SAME bounded decodeUVImage: colour/normal/emissive path unchanged. Packed
references request existing <=1024² bitmap with colour conversion/premultiplication
none, use one OffscreenCanvas or DOM canvas for readback, repeat G/B into RGB with
opaque alpha, no Y flip or PNG encoding. Translucent readback refuses because Canvas
premultiplication could lose RGB. Source bitmap closes in finally; failures reset the
scratch canvas. Successful canvas is the single controller-held image, with close()
resetting dimensions to1. No second output bitmap, retained conversion cache, GPU
material change or permanent image/UV/project mutation. Bitmap + canvas + readback
are temporary bounded allocations; inspection is a resized reference, NOT full-resolution
lossless data analysis. Original encoded8MB guard and one held preview remain.

Existing generation cancellation, slot-aware UV-refresh reuse, chooser Pencil-cancel/
capture release/view/selection, tile/V0 projection, pan/pinch/history and Image-off
reopen remain original. Aria label now UV image reference, matching all image choices.
Four regressions cover exact bindings/G/B vs red/factors/default parity/guards, actual
bounded decoder pixels and DOM fallback, context/read/write/alpha failure and late
cleanup, ACTUAL workspace grayscale rendering/switch/Pencil/view/selection/reopen.
Prior891 workspace test now locates its Normal/Emissive entries before the added two;
all previous behavioural assertions retained. Full Node24 2447PASS/0FAIL/0skip.

Actual supplied FULL MATERIAL.glb resolves both to image4/733,993B packed JPEG,
SHA2563c0ec3a61999f04ee7e5e2376ebf4a4324f1c56b09caf1334523b639b3b2d9b5.
Pillow1024² readback transport -> REAL decoder channel conversion verifies every G/B
value in1,048,576 pixels per reference; original source hash unchanged, both source
bitmaps closed. Browser decode/readback adapted; iPad visual gate remains separate.
No private pixels committed or lossless/resizing-equivalence claim for browser thumbnail.

Reviewed shell/recovery/MeshHealth/workspace/shared preview and surface/render/native
parent cache graph892; native parent changes ONLY shared import pins. ScalarPNG889,
UV maths/decoder options for existing maps, all native binary/dedup/kernel/history/
resource/import owners, protected Multi1.0 and frozen betas retained. All four docs current.
Device892: UV Editor -> Image -> Roughness (G), Metalness (B): separate grayscale
references under UV outlines; Normal/Emissive still work. Pencil edits/UndoRedo/pan/
pinch, reopen and Save/Open -> native six-map export remain intact. Next after feedback:
audit next staged UV-authoring/packing capability; separate opacity requires source-
complete input. No opacity/displacement/occlusion inspection, painting or NOM import.

## .891 — UV Editor Normal / Emissive references, 2026-10-17

User .890 Perfect PASS protects two independent FULL MATERIAL.glb imports/native
six-map export, individual UV edits and .boxlab Save/Open; .889 remains protected.
Audit current main a0a56749/runtime08f0256e and original UV chooser/resolver/decoder,
workspace gesture owner and native/render consumers. Importer already retains exact
normalTexture/emissiveTexture links; no UV inspection chooser for those slots existed.

Extend ORIGINAL importedUVImageChoices with an optional colour/normal/emissive slot
list. Default callers stay colour-only with identical output shape/labels/eligibility;
only UV workspace opts into three slots. Same image-source dropdown shows Material ·
Colour/Normal/Emissive, with explicit reference status. Resolve actual material texture
index -> texture.source -> embedded image, never names/array position/facegroup guesses.
Normal/emissive texture extensions, nonUV0/transformed/missing/external/oversize/invalid
sources refuse independently; valid remaining references still available. Read-only
image reference only: normal scale and emissive factors/lighting are not evaluated.
No packed roughness/metalness/displacement/opacity selector, painting or new material UI.

Same controller/one1024² bitmap,8MB encoded source limit, generation cancellation,
late-result cleanup and UV-only payload reuse. Selected semantic slot survives refresh
when still present, including two slots sharing one image; removed slots cannot leave a
stale Normal label on Colour. Switching chooser uses EXISTING Pencil-cancel/capture
release and retains view/island selection without a transaction or history checkpoint.
Close/reopen starts Image off. Original V0/tile clipping/projection/pan/pinch/history
and Pencil Move/Scale/Rotate owner unchanged. 3D UV Image remains base-colour-only;
no additional surface/GPU bitmap residency or changed export/resource schema.

Three native regressions cover exact/reordered map links/default caller parity/codec,
unsupported refs/bytes/budgets, shared-image semantic refresh/cancel/dispose lifecycle,
and ACTUAL workspace labels/1024² decode/Pencil cancellation/view/selection/reopen.
Actual supplied FULL MATERIAL.glb source audit resolves normal image1/1,248,872B and
emissive image2/2,754B. Its11,121,601B colour remains outside existing8MB preview policy;
Normal/Emissive stay inspectable. No private pixels committed, browser visual gate pending.
Full local Node24 2443PASS/0FAIL/0skip. Cache graph reviewed: workspace/preview891,
MeshHealth parent891; shared preview consumers surface/render/native-displacement/
native-core/packed/export parents891 (imports only), scalar889 retained. Internal
MeshHealth stamp880 intentionally retained. Protected Multi1.0/modelling/frozen beta,
actual decoder, native image/dedup maths and source/export image bytes unchanged.

Device891: imported GLB -> Object Mesh Health -> UVs -> Open UV Editor -> Image;
choose Normal, then Emissive; inspect alignment/orientation beneath UV outlines.
Pencil edit/UndoRedo and pan/pinch still work; close/reopen starts Image off.
Save/Open .boxlab -> chooser and native NOMAD six-map export remain intact.
Next after feedback: audit packed-map inspection or the next staged UV-authoring
step; separate opacity still needs source-complete input. No NOM import claim.

## .890 — identical native export images shared by content, 2026-10-17

User .889 PASS protects exact FULL MATERIAL.glb six-slot native download/open,
Pencil UV repeat and .boxlab Save/Open. The .888 24MB device failure is resolved for
that accepted case; keep the failure history and .889 lossless encoding protected.
Audit main a5e671ca/runtime b7c5d1e3, shell .889 and original native writer/preflight.
Native pooling and packed conversion previously used buffer identity only, unlike
existing content-pooled .boxlab files. Re-importing the same GLB independently could
therefore exceed the native 24MB pool although a reopened pooled project fitted.

Extend ORIGINAL native writer with export-local createNomadImageIdentity; no second
binary pool/container/resource owner. MIME + byte length + FNV-1a hash selects a
candidate bucket; full byte comparison decides equality, including subarray offsets.
Hash collisions never merge unequal data; per-buffer/MIME memo avoids repeated scans.
Original image table, alignment, 24MB guard, mesh/UV/material/slot owners retained.
Async preflight uses the SAME identity helper to count unique raw and converted bytes;
equal packed source content converts once even across independent buffers. Distinct
encoded images remain distinct regardless of names. Original image buffers stay
read-only and independent; no content merging in scene/history/import/project state.
Each object keeps its own material factors, texture names, geometry and UVs. No image
resampling/reencoding, increased limits, permanent cache or new modelling/history owner.

Four regressions cover an actual same-length FNV collision, MIME/length/offset identity,
separate materials/names/selected UVs/native field bytes, ACTUAL File NOMAD two full-size
independent six-map payloads, conversion once, project reopen and exact unique budget
including equal converted slots. Existing six historical budget tests now use genuinely
DIFFERENT bytes instead of identical filler; all rejection assertions remain active.
Full local Node24: 2440 PASS / 0 FAIL / 0 skipped. Reviewed graph shell/recovery/export
panel890 -> packed890 -> native-core890; scalar889, displacement888 and all other
resource/UV/render/import/protected modelling/Multi/frozen owners unchanged.

Actual uploaded GLB source images + actual JPEG G/B decode transport, REAL production
scalar encoder/native writer: two independent textured objects with different UVs,
6 unique images, 22,557,536B payload, 2,608,288B headroom; one packed decode. Original
colour/normal/emissive/displacement hashes exact. Browser readback adapted in Node;
iPad/Nomad .890 multiple-import gate remains pending, no device PASS inferred.

Opacity audit of actual paired files: GLB colour PNG RGBA2048x2048 already carries
alpha0..123; native template ALREADY use_color_opacity=1/factorOpacity1, and exporter
retains the encoded colour bytes. NOM separate opacity image is RGB1024x1024,
417,303B, SHA256440163515a426e5017aa0695f537f48ca8d9d20a36717f040ba08161b4e0b440.
That separate image is ABSENT from GLB, whose extras name Water_001_DISP_opacity.png;
NOM slot names Water_001_DISP.png. Do not derive/rename alpha as a recovered separate
map, invent missing pixels, or claim new opacity/transparency support. No opacity
runtime change in890. Public reference: https://nomadsculpt.com/manual/material
(texture-panel Opacity uses colour alpha; Auto uses UV when present).

Device890: reset; import FULL MATERIAL.glb TWICE, SubD off; move one object aside;
File NOMAD must download/open two objects with six maps each. Pencil UV edit one object
then repeat; Save/Open .boxlab repeat. Genuine unique-image excess still refuses with
source/converted/object breakdown. Next: device feedback, then source-complete opacity
input/native material audit or staged UV/texture work; no invented opacity/NOM import.

## .889 — lossless scalar PNG encoding / .888 budget FAIL, 2026-10-17

User reports888 File NOMAD failed: embedded images exceed24MB. Do not mark888 PASS.
Audit main9af5dff1/runtime888, original packed-map preparation and24MB native pool.
Prior offline audit used Pillow scalar PNGs in place of browser output; this did NOT
prove the real platform-encoded files would fit. Actual browser PNG byte sizes were
not captured, and multiple independent textured imports can also exceed source budget.
.887 exact-file five-map/Pencil/project PASS remains protected. Keep888 displacement
binding/schema/16-bit byte tests; repair derived encoding rather than enlarge the pool.

Original splitNomadPackedImage used canvas.createImageData RGBA, repeated G/B into
three channels plus opaque alpha, then platform convertToBlob/toBlob PNG. Scalar data
needs only ONE8-bit channel. New small nomad-scalar-png owner encodes colour type0 PNG,
adaptive per-row None/Sub/Up/Average/Paeth filtering, real CompressionStream('deflate')
zlib and chunk CRCs. Standard: https://www.w3.org/TR/png-3/ and
https://compression.spec.whatwg.org/ . Original2048² bound and8MB derived-image cap
remain; source bytes/dimensions/G/B values unchanged. No gamma/profile/alpha chunks,
resampling, factor baking, lossy compression or quality reduction. Encoder does not
mutate readback/source. Removes full RGBA output scratch allocation and platform PNG
encoder dependency; browser bitmap decode/canvas readback + finally cleanup stay original.
CompressionStream unavailable/failure refuses clearly; no oversized RGBA fallback.

Native24MB aggregate guard stays ACTIVE. Async preparation now reports source-image MiB,
converted-map MiB and visible object count in overbudget error, distinguishing derived
size from repeated/large imports. Dedup still source-buffer identity as protected884;
independent imports of identical bytes are NOT content-deduped. Do not silently raise
limits or claim this permits unlimited scenes. Test one fresh import to isolate result.
Original native writer/displacement helper888/image/surface/resource887/UV/render/kernel/
history/importer/frozen owners unchanged; no duplicate pool, decoder or modelling owner.

Existing886 tests now inspect actual production grayscale PNGs with independent Node
zlib/CRC/inverse-filter reader; retain all exact G/B/geometry/UV/source/factor/resource/
cleanup/DOM-readback assertions. Encoding-failure injection moves to CompressionStream;
platform PNG encoder calls must be zero. Three new regressions cover real compressed
PNG pixels/headers/CRC/filters/bounds/API failure, ACTUAL File NOMAD six-map export at
reported source sizes with real compression and forbidden platform PNG encoder, and
retained24MB source guard with diagnostic breakdown. Full local2436PASS/0FAIL/0skip.

ACTUAL user packed JPEG decoded to RGBA through Pillow as Node transport fixture, then
REAL production scalar encoder/deflate (no substitute PNG encoder): roughness2,035,568B,
metalness1,948,291B. Independent Pillow PNG decode confirms EVERY G/B byte identical.
Actual retained source assets + production split/native facade:6images,22,557,536B image
payload (21.51MiB),2,608,288B pool headroom,22,629,956B native file. Colour/normal/emissive/
displacement original hashes exact, displacement16-bit/settings untouched. Native Box
UVs used for byte-budget audit; original imported UV/history coverage remains in suite.
Browser decoder/readback adapted in Node; no Safari/Nomad visual acceptance inferred.
Private images/readback not committed. This replaces the earlier Pillow-encoded size
estimate;888 failure preserved as device evidence and889 exact-file gate remains pending.

Reviewed889 graph: shell/recovery/export-panel889→packed-child889→new scalar encoder889;
packed child still imports native-core888→displacement888 and source/image helpers887.
All unrelated UI/import/codec/UV maths/protected modelling/Multi/frozen/native donor bytes
unchanged. All four continuity docs updated; publication proof follows.
Device889: reset scene, import FULL MATERIAL.glb ONCE, SubD off→File→NOMAD must download;
check all six native slots including displacement; UV edit and .boxlab Save/Open repeat.
If still overbudget, report FULL new source/converted/object breakdown rather than guess.
Opacity remains pending; displacement numeric settings copied unchanged, no amplitude
rescaling/BoxLab geometry bake/generic glTF displacement/native multi-material/NOM import.

## .888 — explicit Nomad displacement-map handoff, 2026-10-17

User887 PASS /nextbuild protects supplied FULL MATERIAL.glb native download, original
large colour plus normal/emissive/roughness/metalness slots, UV-edit repeat and .boxlab
Save/Open after validator repair. Resolves reported885 FAIL screenshot886 for this case;
earlier smaller native/UV/Pencil/navigation baselines retained. Audit current
main714bd5a1/runtime3f605425/live887/owners and paired user GLB/NOM donors.

Original importer ALREADY retains meshExtras.nomad.version1/textures.displacement
semantic NAME REFERENCE plus all original image definitions/core texture links. Proved
that explicitly named GLB image3 (6,200,450B16-bit PNG) equals BOTH native donors'
displacement image, SHA25645771544a0c7442d03136ce78fc8b79f4341a5a1541eb34f9f6e45cf3cc0b501.
Generator nomad11 observed. Metadata-only paired provenance fixture includes saved native
slot/strength/midpoint/world and a tiny synthetic16-bit PNG; no private pixels committed.
No new import channel, envelope/version, filename-stem inference or duplicate kernel.

Small nomad-displacement-map binding helper reads only explicit version1 Nomad slot.
Require EXACTLY ONE image.definition.name matching that explicit reference and EXACTLY
ONE core texture sourcing it; missing/ambiguous/no-data/unsupported refs refuse before
download. A matching image filename WITHOUT semantic slot never enables displacement.
Shared embeddedUVImage validates PNG/JPEG bytes/MIME≤24MB;16-bit data copied unchanged,
no decode/reencode/downsample or precision loss. Default repeat/linear sampling; source
Auto/UV and identity transforms only, unknown slot keys/transforms/Triplanar refuse.
Observed native Auto encoding used with REQUIRED complete matching Base UV channel
(Auto uses UV when UVs exist; official manual https://nomadsculpt.com/manual/material).
Hardness/world projection metadata and finite source strength/midpoint/world fields
validated; numeric settings preserved VERBATIM, including negative strength and source
world boolean. This stage does not compensate displacement amplitude for import-fit
or baked object scaling, bake displaced geometry, or add a BoxLab displacement renderer.

ORIGINAL nativeMaterialMaps/writer now includes displacement-only input or displacement alongside existing
map slots, original image-table dedup/alignment/24MB aggregate and donor material slot.
Original one opaque material/Base UV/stale/evaluated refusal stays. .887 raw colour/
normal/emissive24MB and display8MB/1024², packed8MB/2048² budgets unchanged. Source
mesh/UV/resources/history stay read-only. Async facade already counts ALL nonpacked
maps in same pool; no duplicate conversion/cache. File NOMAD status adds displacement
count. Plain/no-explicit-slot and prior map output paths retain original behaviour.

Five native regressions: explicit reference vs filename-only/array reorder, valid16-bit
bytes/native donor slot/settings/unchanged geometry+UV fields, ambiguous/missing/sampler/
transform/factor/stale/evaluated refusals, shared-image dedup/aggregate budgets and
selected UV/project continuity, ACTUAL File NOMAD six slots/status/error recovery.
Full local2433PASS/0FAIL/0skip. Actual user GLB→original importer/Three geometry conversion
→resource Save/Open→native output22,511,792B:1object/6faces/1UVobject/6images; colour/
normal/emissive/displacement hashes exact; native strength.17320507764816284, midpoint.5,
worldfalse exact. Import fit scale2 retained as before. Offline packed split uses Pillow
G/B and Node private geometry input strips image refs only; no browser/Nomad appearance
proof inferred. .887 device PASS protected; .888 displacement device gate pending.

Reviewed888 graph: shell/recovery/export-panel→packed-child→native-core→new displacement
binding helper; core/image/surface and new helper's shared decoder remain887. All other
UI/importer/resource/UV math/navigation/protected modelling/Multi/frozen beta/native donor
bytes unchanged. All four continuity docs updated; publication verification follows.
Device888: same FULL MATERIAL.glb/SubD off→File→NOMAD: Displacement slot populated with
original image and saved settings, previous five maps intact; Pencil UV/project repeat.
Separate opacity texture absent from GLB despite named extras, so opacity remains
pending. Do not guess missing pixels or declare generic glTF displacement/NOM import.
Next:888 device feedback; then audit opacity source/baked colour alpha and native material
semantics before adding transparency or unrelated UV painting/native per-face materials.

## .887 — large native colour image / project validation repair, 2026-10-17

User reports885 FAIL; screenshot explicitly shows886 and native File NOMAD refusing
at generic colour-material guard. This supersedes earlier885 PASS for the supplied
FULL MATERIAL case; prior smaller accepted colour/normal/emissive/UV behaviour remains
protected. Audit main44dca980/live886/pins; original importer parses supplied
FULL MATERIAL.glb SHA256a68dbedf6cfa49efcfd3b5a86c0a599d5502410e7235913ff482790e24b1419d.
Exactly one OPAQUE material, alpha1, UV0, default sampler, no material extensions.
Colour PNG11,121,601B fails shared preview's8MB encoded guard. Reproduced same error
with ACTUAL retained importer payload before change; no alpha/material-format guess.

Shared embeddedUVImage takes optional maxBytes, default8MB and capped24MB; existing
choices/surface resolver forward caller policy. ONLY native colour/normal/emissive
byte-copy path opts into24MB. Existing native24MB unique-image aggregate remains exact;
packed source/derived images remain8MB and≤2048² conversion. UV Editor and active surface
preview still enforce8MB/default1024² decode, including large-image Solid/no-image
fallback. No new decoder/material/UV/signature/history owner, downscale/reencode or
change to unsupported material/sampler guards. Original native layout/UV/header/slot/
image-dedup/download owners retained. This is a byte-copy budget repair, not added RAM
for display textures or blanket PBR/opacity/displacement support.

New large-resource test also reproduces RangeError Maximum call stack size exceeded
in ORIGINAL project-glb-resources.decodeBytes repeated-group base64 regex. Replace
only grammar validation with expected padding from decoded byteLength and a flat
invalid-alphabet search; original byte length, atob→btoa canonical check,24MB pool,
resource versions1/2/3,32MB project Open and legacy compatibility retained. No new codec
or looser malformed-padding/unused-bit acceptance. Actual Open handler + large shared
pooled file now passes; inline large resource and selected UV→native repeat pass too.

Four native tests use metadata-only reported fixture + synthetic same-length bytes:
exact11,121,601B native colour/normal/emissive output and preview rejection;24MB boundary,
shared-slot/object dedup/aggregate/packed-budget guards; selected UV/resource/ACTUAL File
NOMAD downloads; pooled .boxlab ACTUAL Open and strict invalid/valid base64 cases.
Full local2428PASS/0FAIL/0skip. Extra ACTUAL user-file audit: original importer/Three
geometry conversion→native cube6faces/1UVobject/5images,16,310,924B file, all colour/
normal/emissive hashes identical to source. Node geometry-loader copy strips image refs
only; original retained resources go to writer. Packed JPEG split in this offline audit
uses Pillow G/B, so browser conversion/Nomad appearance still needs device confirmation.
Actual full5-image pooled resource roundtrip25,750,555B encoded /19,307,670B decoded
retains ALL five image bytes, including unused displacement. No private pixels shipped.

Latest native donor FULL MATERIAL EXPORT(1).nom SHA25689170a6ecc5427413069ad9902c1b0c128ee17ad7136e8737a28be324196e47c
adds textures.opacity index4,417,303B PNG, factorOpacity1/use_color_opacity1; material
stillopaque. GLB meshExtras.nomad has NAME-ONLY displacement/opacity slots and factors;
displacement texture/image3 is unreferenced by core glTF material; opacity named image
is absent. Metadata fixture records this; audit explicit binding/semantics in a later
stage, never assign by image filename alone. No opacity/displacement implementation887.

Reviewed887 cache graph: export-panel→packed-child→native-core→surface/image-helper;
render→surface; MeshHealth→workspace→image-helper; drawer→management→project-codec→
resource helper (also direct management shell entry). Existing internal stamps retained
except export-panel887; all corresponding parent URLs/hash contracts reviewed. Importer882,
UV maths/inspector880/nav868, manager875, protected Multi1.0/native donor/modelling and
frozen betas unchanged. All four continuity docs updated; publication proof follows.
Device887: supplied FULL MATERIAL.glb, SubD off→File→NOMAD must download/open; colour,
normal/emissive/roughness/metalness slots intact; UV edit→export and .boxlab Save/Open→
export repeat. Native visual gate remains pending; do not infer PASS from file upload.
Next: this exact-file retest before advancing opacity/displacement/native multi-materials.

## .886 — native roughness + metalness from packed GLB maps, 2026-10-16

User .885 PASS /nextbuild protects native normal/emissive slots, strengths, alignment,
UV edit repeat and project reopening, alongside accepted .884 colour and .865 UVs.
Audited current main25412b5c/runtime9154caaa and live .885 markers/owners. Original GLB
resources retain pbrMetallicRoughness.metallicRoughnessTexture; no channel conversion
exists. Full donor885 proves separate textures.roughness/metalness and factorRoughness/
factorMetalness. No filename inference, new modelling/material/history kernel or schema.

New small nomad-packed-maps child performs export-local preparation, then delegates
ORIGINAL native writer. Shared nativeMaterialMaps guard now recognizes the packed ref
with the same single opaque material, embedded PNG/JPEG UV0, default repeat/linear
sampling and finite factors. Green→roughness, blue→metalness per official glTF2 spec;
no red/occlusion reuse, luminance conversion, factor baking, gamma maths or Y flip.
Original dimensions retained: at most2048×2048, 8-bit source. Header inspection bounds
BEFORE bitmap decode; 16-bit PNG, EXIF/eXIf orientation metadata and translucent decoded
pixels refuse clearly. Browser createImageBitmap uses colorSpaceConversion:none and
premultiplyAlpha:none, then canvas produces opaque grayscale PNGs. OffscreenCanvas or
original DOM canvas/toBlob fallback; bitmap close and scratch canvas reset in finally,
including encode/decode failure. No preview-thumbnail decoder changes. Original colour/
normal/emissive images stay exact encoded bytes. Full donor's relevant JPEGs are2048²;
its16-bit displacement is a distinct unsupported source, not treated as packed PBR.

One conversion per shared encoded buffer per export. Derived PNGs exist only within
this download, never source/project/history payload. Same native image-table alignment,
byte-identity dedup and≤8MB/image /24MB aggregate guards. Native factorRoughness and
factorMetalness carry source scalar factors (default1); native slot/header7/mesh/UV/
facegroup owners retained. Synchronous core refuses unprepared declared packed maps,
never silently omits them. Async facade captures mesh/settings and read-only payload
BEFORE any await so ongoing scene edits cannot mix UV/geometry states. Plain/no-packed
output remains byte-identical; existing File NOMAD download owner reports both map
counts. Existing GLB/OBJ and surface preview/import/resource/editor math unchanged.

Seven new regressions cover actual G/B pixel arrays→distinct valid PNG bytes (inflate+
CRC), donor slots/factors/native geometry+UV byte identity, all five core maps together,
shared source conversion once across objects, selected UV/project continuity, in-flight
snapshot isolation, source/sampler/UV/factor/size/budget refusals, bitmap/canvas cleanup,
JPEG header/metadata guards, DOM canvas fallback and ACTUAL File NOMAD downloaded bytes/
status/failure recovery. Browser transport is adapted in Node; no browser/Nomad rendering
proof claimed. Prior735/865/884/885 action fixtures now supply real async facade, retaining
all their semantic assertions. Full local2424PASS/0FAIL/0skip; publication proof follows.

Reviewed cache graph: shell/recovery/export-panel886→packed-child886→native-core886;
core→unchanged surface/image885. Render/MeshHealth/workspace885, importer882, UV edit/
inspector880/nav868, Multi1.0, native donor and all modelling/frozen beta bytes unchanged.
Device886: one-material GLB with packed roughness/metalness (≤2048²), SubD off→File→NOMAD:
separate Roughness/Metalness slots, expected glossy/matte and metallic regions; existing
colour/normal/emissive intact; Pencil UV edit and .boxlab Save/Open→export repeat.
Next:886 device feedback, then audit actual source binding for displacement or native
multi-material schema before claiming either. No native NOM import or painting added.

## .885 — native normal + emissive maps from full donor, 2026-10-16

User .884 Perfect PASS protects native colour image visibility/alignment, Pencil UV
edit repeat and project reopening. User requests other maps and supplies FULL MATERIAL
EXPORT.nom, SHA256dc9102c6eb38ea95e4d7705b0d2fe89eb58cf0c1248c35f2cce35a2a15cf8685.
Audit current main3cd0d5ae/native884, full material donor and retained GLB resources.
Donor revision7 confirms slots color/normal/emissive/roughness/metalness/displacement,
same image descriptors/texture projection/samplers; normal_neg_y=false, factorNormal,
factorEmissive and factorEmissiveStrength observed. Only metadata/provenance fixture
committed, not user's large file/images.885 scope: normal+emissive can transfer exact
encoded bytes. Roughness/metalness packed G/B conversion and displacement source
channel identification remain separate; never guess from retained image filenames.

Reuse original image resolver: extract embeddedUVImage from unchanged880 choice rules,
with importedUVImageChoices delegating same exact PNG/JPEG/UV0/mime/≤8MB checks. Same
renderer/decoder lifecycle/math retained. Extract uvImageMaterialSource from original
surface helper for shared single-used opaque/material factor checks; original colour
surface API delegates it and retains original sampler/image policies. No parallel
material/UV/signature/history/picking owner. Only parent import URLs change for UV
workspace/MeshHealth/render, preserving old internal MeshHealth stamp880 deliberately.

Extend ORIGINAL synchronous native writer's884 local image table/material links for
normalTexture→textures.normal, emissiveTexture→textures.emissive. No decode/reencode,
gamma conversion or resampling. Match Base UVs, source UV0/PNG/JPEG/no transforms,
default repeat+linear mipmap sampler and one opaque material. Explicit source normal
scale→factorNormal (finite f32/nonnegative); native normal_neg_y=false matches donor/
glTF convention. Source emissiveFactor→factorEmissive (defaultblack), native strength1.
HDR/material extensions remain refused. Normal/emissive-only materials do not require
fake colour image; base RGB factor supplies constant colour. Existing colour-only/plain
flow retained. Source images shared read-only, byte-identity dedup across slots/objects,
existing≤8MB per image/24MB aggregate. Whole export refuses unsupported declared normal/
emissive refs rather than dropping them. Original geometry/UV bytes/field offsets/native
revision7/donor/header/download owners retained. Status adds normal/emissive map counts.

Five native tests cover donor slot descriptors/raw PNG+JPEG bytes/normal strength/
emissive RGB/defaults, normal-only/emissive-only input, shared-image dedup/material
links/counts, unsupported image/UV/transform/sampler/factor/aggregate guards, selected
UV+project continuity and ACTUAL File NOMAD downloaded bytes/status. All880–884 checks
retained. Full local2417PASS/0FAIL/0skip. Additional real donor audit exported actual
1,248,872-byte normal JPEG and2,754-byte emissive PNG, both original hashes matched.
No browser/Nomad appearance proof claimed. Original .884 colour PASS protected.
Reviewed885 cache graph: export-panel→native-core→surface/image helper; render→surface;
MeshHealth→workspace→image helper. Inspector/edit880/nav868/importer882/native baseline
donor/protected modelling/frozen betas untouched. Publication proof follows.

Device885: one-material GLB containing normal/emissive maps, SubD off → File→NOMAD:
Nomad Material Normal/Emissive slots populated, bump detail/emission factor correct;
Pencil UV edit→export repeat; .boxlab Save/Open→NOMAD; accepted colour map retained.
Next narrow stage after feedback: unpack glTF metallicRoughnessTexture GREEN→roughness,
BLUE→metalness with bounded browser conversion; native slot layout now proven by donor.
Reference: Khronos glTF2.0 Specification additional textures/material metallic-roughness,
https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html . No direct copy of packed RGB
image into scalar slots, no invented displacement reference, no native multi-material
support or Nomad import claim. Keep885 device gate separate from883 GLB export gate.

## .884 — native File→NOMAD colour image embedding, 2026-10-16

User supplied EXPORTED TEXTURED.nom from Nomad during883 publication, lifting the
native-schema fixture blocker. SHA256ab3d9293d51d0597cdd6b17439112378e11a486c2898bc72282686a849dcfd6f.
Read donor fully through existing reader: revision7, JSON offset65608, images table
{length,offset,type} points to RAW JPEG/PNG bytes, material.textures.color.index links
image table. Donor contains colour/roughness/normal/displacement records. Metadata-only
fixture records provenance/header/image descriptors/colour texture convention; user's
10MB file/pixels are NOT committed or used as runtime donor. Frozen tube donor remains
byte-identical.883 GLB device acceptance is NOT inferred from native-file upload.

Extend original nomad-export-core writer, not another container/UV/export kernel.
First stage: one USED opaque core UV0 PNG/JPEG colour-image material per object, same
original uvImageSurfaceSource eligibility through unchanged882 helper. Require matching
complete Base UVs, default repeat wrapping + linear mipmap filters; unsupported/multi/
missing/nonopaque/transformed/invalid/nondefault-sampler inputs refuse clearly instead
of dropping colour. This is colour handoff only, not full PBR: normal/packed roughness-
metalness/displacement/other image slots remain pending. Constant roughness/metallic
factors and RGB baseColorFactor transfer with donor-proven colour slot convention.

Native-local image table embeds ORIGINAL source bytes (no decode/reencode/downscale),
4-byte aligned; image buffer identity dedup across objects within this build, ≤24MB
aggregate, original≤8MB source guard. Existing geometry parts append after images with
same offsetFields owner; mesh.material points to appended native material cloned from
original donor. Temporary table/material/parts are local; shared scene/project/history
payloads untouched. Textured output uses observed header revision7; no-image output
retains original revision6/header and native UV/geometry bytes. Original donor thumbnail/
other settings retained. Count now counts meshes, not binary image/padding parts.
Image field bounds verified with existing reader. Native action reports colour images
count while retaining real .nom MIME/name/download and original UV status.

Five new native tests verify donor metadata convention/header7, exact PNG/JPEG image
bytes/material links/factors, unchanged UV/geometry field bytes, mixed plain/coloured
objects/alignment/shared-image dedup, selected UV/project-resource continuity, unsafe
source/UV/sampler/budget refusals and ACTUAL File NOMAD downloaded bytes/status.881
preview-invariance fixture now uses default sampler for its native baseline; its
clamp/nearest preview tests remain, and new native refusal test explicitly covers them.
Full local2412PASS/0FAIL/0skip. Additional audit exported donor's actual1,412,537-byte
JPEG through new writer: original image hash matched, native revision7, one colour image.
No browser/Nomad visual proof claimed; iPad opening/orientation/appearance gate pending.

Cache graph shell/recovery/export-panel884→native-core884→unchanged surface882→decoder880.
Original importer/render/surface882/UV workspace880/resource875/native donor, protected
modelling and frozen betas unchanged. Only metadata fixture, no user image assets shipped.
All four continuity docs updated; publication proof follows.883 GLB tests remain active.

Device884: ONE-material textured GLB, SubD off → File→NOMAD → open in Nomad: colour
image+UV alignment; Pencil island edit→NOMAD repeat; .boxlab Save/Open→NOMAD; plain mesh
still exports. Multiple supported single-material objects may share one native file.
Next after feedback: native colour device result first; audit additional PBR channels
or native per-face material format using real donors before claiming support. Packed
roughness/metalness cannot be copied as a plain roughness image without channel handling.

## .883 — exact material GLB handoff; native NOM textures still unresolved, 2026-10-16

User .882 PASS /nextbuild after confirming active/selected-only UV Image is expected.
Protect fresh exact multi-material preview, Pencil/history/project persistence and
active-only memory policy. During883 user reports UVs but no textures on return to
Nomad and explicitly confirms File→NOMAD (.nom), NOT GLB. That report is a distinct
NATIVE image omission; do not claim this GLB repair fixes it or mark native textures PASS.

Audit main15e57665: original GLB patcher assigns first retained material to every
primitive. Original exporter now optionally buckets by BOTH facegroup and exact .882
face-material ID, using original triangulator/attribute/fit owners. Shared exporter
faceMaterialAssignments validates imported version/source, original topology signature,
face count and material IDs for both preview and Base GLB. Multi-material missing/
stale/invalid/evaluated/SubD mappings refuse with fresh-import/Base instruction rather
than first-material substitution. Legacy single/plain GLB paths unchanged.

Patch each exported primitive to the corresponding retained material with original
per-object texture/sampler/image base remapping and byte append. Facegroup identity is
independent of material splitting: unique original group table + per-primitive group ID;
several material primitives may belong to ONE Nomad facegroup. Exact multi-material
branch preserves all UV seam variants (old imported pole-collapse path unchanged for
legacy/single exports). GLB inspection remains original Loader self-check. Temporary
export geometry/material cleanup now runs in finally on errors too, shared materials
retired once. No image decoding/painting/render/kernel/resource/history changes.

Five native tests verify actual Three GLB triangles/material IDs/UV corners/group IDs,
reimport names, multiple objects/global material bases with duplicate names, final image
bytes + all five core texture slots/sampler references/alignment, selected UV edit +
resource-codec continuity, missing/stale/invalid/evaluated refusals and failure cleanup.
Image-bound test removes texture refs ONLY from private Node verification copy so actual
Loader can validate geometry without browser decoding; final real exporter/patcher bytes
checked independently. No automated browser/Nomad image rendering proof. Full local
2407PASS/0FAIL/0skip, earlier semantic tests retained.547 source assertion follows
separate group-ID mapping rather than freezing group=index. Reviewed shell/recovery/
export-panel883 only; importer/render/surface882/workspace+decoder880/NOM865/protected
modelling/frozen beta bytes unchanged. Publication proof follows.

NATIVE BLOCKER: nomad-export-core865 explicitly writes geometry/UVs/groups only and
retains donor material; no imported texture/image serialization exists. Sole validated
native donor nomad-tube.nom has material factors but NO image/texture records. No
textured .nom fixture or validated image-link/binary convention exists in repository.
Do not invent native fields or rename GLB as NOM. Request a real textured .nom SAVED BY
NOMAD (simple UV cube + one image sufficient) to inspect image payload/material links
and build a truthful native test before implementation. Native writer/donor unchanged;
accepted865 UVs remain protected. User texture omission remains OPEN, not fixed by883.

Device883 GLB gate: File format GLB + Base→Export/Save (NOT NOMAD button) → Nomad:
correct images/areas + facegroups; UV edit→repeat; .boxlab Save/Open→GLB. Exact maps
require fresh882+ GLB import with Split groups off. Next priority is native .nom
texture sample/format audit and repair once fixture available; painting later.

## .882 — exact imported face materials in UV Image, 2026-10-16

User .881 PERFECT PASS /nextbuild protects active-image orientation/colour/navigation,
Pencil UV edit→surface refresh/history and ordinary look restoration. Audit main007fdfb6
and original importer882 predecessor797 found retained materialIndices are a used-set,
NOT per-face assignments. Exporter buckets group by facegroup labels; duplicate names
are not proof of material identity. Do not infer image assignment from those labels.

Extend ORIGINAL importer conversion/merge/weld/quad owners with optional per-face global
material IDs from glTF.parser.associations. Carry them alongside existing corner channels;
drop matching entries for removed faces, retain IDs for reconstructed quads, and prevent
quad merges across differing IDs even if facegroup labels match. Store only complete
valid IDs in imported payload.faceMaterialIndices + materialTopologySignature. Legacy/
missing associations never claim provenance. File GLB callback supplies parser map; OBJ
flow unchanged. Existing generic imported resource codec/history/COW snapshots carry
optional fields without a new envelope/version/history owner. Old mixed-material project
files need a FRESH GLB import in882 to obtain exact assignments; no name-based migration.

Original buildUVPreviewGeometry adds explicit materials:true inspection option, validates
assignment/signature/IDs, and delegates same editableToGeometry triangulation/corner UVs.
Only that preview option groups by exact material ID and exposes slot IDs in geometry
userData. Ordinary GLB/NOM/OBJ writers and checker retain their original grouping/math;
this stage does NOT repair the older multi-material GLB output patcher's first-material
behavior. Keep that export limitation distinct from correct surface preview.

Extend SAME active-image helper: up to FOUR used opaque embedded-image materials,
aggregate≤8MB encoded source, each original1024² decode (up to16MiB decoded RGBA total
plus GPU textures). Decode serially and show image only after ALL sources are ready.
Any unsupported/missing/transparent/overbudget material, stale/missing map or failed
decode leaves whole object Solid. Source cleanup/mode switch cancels further decoding;
late results and all prior bitmaps/textures/materials/geometry release exactly once.
Per-slot baseColorFactor/sampler/sidedness retained. Existing881 single-material files
remain supported; inactive objects still Solid. No painting, PBR lighting, persistent
material edits, new pointer/kernel/history owner or evaluated UV propagation.

Six new native tests cover actual GLTFLoader reversed IDs/identical material names,
conversion/merge/weld/quad boundary provenance, optional channel codec roundtrip, original
triangulator group/position/UV slot mapping + stale refusal, real Three multi-image
factors/samplers/serial readiness/disposal/failure/cancel/budgets, actual File GLB callback
and independent OBJ callback. Full local2402PASS/0FAIL/0skip. One544 literal importer-call
assertion advances to include parser associations, preserving split-toggle contract;
all earlier tests retained. Reviewed pins shell/recovery/render/importer/export panel/
surface child882; decoder/workspace880/native NOM865/manager875/navigation868/protected
modelling and frozen betas unchanged. Publication proof follows.

Device882: FRESH import2–4 opaque embedded-image materials, Split groups OFF/SubD OFF →
VIEW→UV Image. Inspect correct image areas, edit UVs→Back to3D/history, Save/Open project,
and switch to Studio/Solid. Existing single-material gate remains protected. Next after
feedback audit original GLB patcher's per-face material export (without guessing from
facegroup names) before painting or broader material support.

## .881 — temporary active-object 3D UV Image view, 2026-10-16

User .880 Perfect PASS /nextbuild protects embedded image orientation/reference,
Pencil/navigation/history, source chooser and project persistence. Repeated PASS/
nextbuild while .881 was still in progress continues this release; no .881 device
acceptance inferred. Audit main6b6565c4/.880: retained importer material/sampler/image
resources, .880 bounded decoder, .879 exporter preview geometry and render owner are
sufficient. No second UV/triangulation/history/material-editing kernel.

VIEW→UV Image now inspects the ACTIVE plain independent Base object with exactly ONE
used opaque core material and embedded PNG/JPEG UV0 base-colour image. Unlit sRGB image
with linear baseColorFactor, glTF V0 (flipY=false), original core clamp/repeat/mirrored
wrap and nearest/linear/mipmap filters, material double-sided flag. Original decoder
limits retained (≤8MB encoded source,1024² bitmap). Inactive objects remain Solid,
bounding resident surface preview to one active image. Mixed used materials, alpha
blend/mask/nonopaque factor, material/texture transforms/extensions, missing/external/
invalid resources, linked/procedural/reference/SubD/Mirror/stale/incomplete/over20k-
corner channels retain Solid; no guessed per-face material assignment. UV Editor's
multi-image reference chooser remains accepted and unchanged.

Small uv-image-surface-preview child delegates original geometry builder and decoder.
Original body geometry/raycast untouched; overlay raycast disabled. Solid stays while
loading/on decode failure. Native source geometry disposal or existing render cleanup
removes overlay and disposes geometry/material/texture/bitmap once. Canceled-before-
start requests skip decode; late results close without replacing a newer look. Existing
Mesh Health session-end refresh applies UV changes; native rebuild handles history and
object switches. Startup Studio retained. No persistent textures, resource writes,
painting, PBR lighting, evaluated UV propagation or export changes.

Five real Three/native tests cover source/material/sampler guards + codec continuity,
sRGB/factor/wrap/filter/orientation/UV mapping, exact-once disposal and async cancellation/
failure races, actual render active/inactive/base eligibility + UV session refresh/look
restoration, original image/project/native NOM byte identity + GLB UVs. Full local suite:
2396 PASS /0 FAIL /0 skipped. Original .879/.880 tests remain intact. Render-button
contract now requires original9 plus UV Image. Cache graph shell/recovery881 → render881
→ new surface child881 → unchanged decoder880; exporter879/workspace880/native NOM865/
manager875/navigation868/protected modelling/frozen beta bytes retained.

Device .881 gate pending: textured single-material GLB/SubD off → VIEW→UV Image;
orientation/colour/orbit, Pencil island edit→Back to3D refresh + Undo/Redo, Studio/Solid
restoration, native/plain/mixed-material fallback. Next: .881 device feedback, then audit
per-face material assignments through the ORIGINAL exporter buckets before multi-material
surface support. Keep resource images read-only; painting remains later.

## .880 — embedded base-colour image reference in UV Editor, 2026-10-16

User .879 Perfect PASS protects temporary surface checker, navigation, UV edits/session
refresh/history and ordinary look restoration. Audit main67e01309/live879: importer797
retains materialIndices/materials/textures/embedded image bytes; resource875, history,
Duplicate and codec already preserve them. No image display/decoder exists. Extend the
ORIGINAL UV workspace/renderer with optional Image reference and material-name chooser
when multiple compatible sources exist. Whole selected image behind ALL UV outlines;
this is reference inspection, not face-material assignment or PBR rendering.

Small uv-image-preview helper resolves USED materialIndices → UV0 baseColorTexture →
texture.source → existing embedded PNG/JPEG bytes. No URLs/network fetches or unrelated
normal/roughness images. Texture transforms/other UV sets/texture extensions, external
or missing/invalid/over8MB image records refuse; missing native/plain resources disable
Image. Labels use textContent. Optional browser createImageBitmap produces a1024×1024
reference (square tile mapping); original image bytes never resized/replaced. Browser
unsupported/decode failures show inline status. At most one decoded image held; token
checks discard/close late results, canceled-before-start work never decodes. Switching,
off/close/payload replacement releases bitmap; same read-only image across UV-only payload
replacement reuses it. No new history/resource schema or image editor/cache pool.

Renderer shares original projection/picking, clips canvas+tile0–1, flips vertically so
stored glTF V0 corresponds to image top (GLTFLoader uses flipY=false). Image drawn above
optional checker and beneath outlines/selection/seams; Pencil transforms UVs over fixed
image. Reference is tile-only, not sampler wrapping/material colour-factor evaluation.
Controls cancel pending Pencil without commit, retain view/selection; off on reopen.
No 3D image look, painting, new UV channel, kernel, gesture owner, or topology changes.

Five native regressions cover actual importer container/resource shape+codec bytes,
used-source/unsupported guards, decoder thumbnail/budget/fail/cancel/race/reuse lifecycle,
renderer V0/projection/clip/order/read-only and actual workspace chooser/Pencil/session
cleanup. Full local Node24:2391PASS/0FAIL/0skip; final publication proof follows.
Cache MeshHealth/workspace/edit/inspector880 plus new image helper880 and shell/recovery;
edit880 changes ONLY shared inspector import. Surface checker/render/export879, native
NOM865, manager/codec/resources875/nav868, protected Multi1.0/main854/Loop/Extrude/Boolean
and frozen betas unchanged. Device880 image orientation/readability/Pencil/chooser/file
reopen gate pending. Next after feedback: audit temporary 3D base-colour image view with
per-material ambiguity/sampler/colour/lifetime handling before painting; reuse original
render/geometry/resource owners and keep imported images read-only.

## Protected .879 — user PASS2026-10-16

3D UV Checker surface/seams, orbit/pan/pinch, island Scale→Back to3D refresh, native
Undo/Redo and Studio/Solid restoration accepted. Preserve ephemeral overlay and original
body geometry/picking/export isolation; .880 image reference gate remains separate.

## .879 — temporary 3D UV Checker view, 2026-10-16

User .878 PASS protects 2D Checker readability/alignment/navigation/Pencil/history/
reopen. Audit main033d9950/live878: render-modes568 owns all body looks; exporter877
already owns polygon triangulation and corner UV seam mapping. Add UV Checker as a
ninth look under VIEW, through that same render owner. No new modelling/triangulation/
pointer/history kernel. Studio remains startup default; switching looks restores original
body geometry/material behavior. Plain independent Base meshes with complete valid stored
GLB/native UVs show a repeating16×16 unlit checker over the surface; missing/stale/invalid,
linked/procedural/reference/SubD/Mirror objects retain Solid fallback. Preview bounded to
20,000 face corners; larger channels fall back entirely, never partial checker surfaces.

Exporter exposes guarded buildUVPreviewGeometry, delegating original editableToGeometry/
triangulateFace with seam preservation, no imported-fit restoration (live coordinates),
finite f32/index/corner/signature/completeness guards. Actual GLB/NOM export maths unchanged.
Small uv-checker-preview owns temporary child geometry/ShaderMaterial; no textures/images,
paint or stored material edits. Original body geometry/raycast is untouched, preview
raycast disabled. Existing render cleanup disposes checker exactly once; original body
geometry dispose listener also removes/disposes it during native main/inactive redraw,
without modifying protected main854 or manager875. Read-only payload stays untouched.
Original Mesh Health session-end event refreshes checker after UV edits; native rebuilds
handle scene history/object changes. Importer/editor/navigation/resource codecs unchanged.

Five native regressions cover original corner mapping/live-space/concave triangulation,
invalid/stale/partial/overbudget refusals, actual Three overlay/picking/resource lifecycle,
actual render active bridge/inactive lookup/fallback/look restoration/session refresh,
and cylinder THREE seam+cap variants/native NOM bytes unchanged. Full Node24 suite:
2386PASS/0FAIL/0skip. Existing453 render-button test now requires all original8 plus new
checker, rather than freezing total8. Reviewed render/export-panel/child cache879 and
shell/recovery879 only; MeshHealth/workspace/edit/inspector878/nav868/NOM865 retained.
Protected Multi1.0/Loop/Extrude/Boolean/main and frozen beta bytes unchanged.
Device879: Cube Box UVs or upright Cylinder UVs, SubD off → VIEW→UV Checker; orbit to
inspect seam/stretch/relative density; edit island Scale then Back to3D; Undo/Redo;
VIEW→Studio/Solid. Native Base UVs only, no evaluated UV propagation/painting claim.
Next: device feedback on temporary checker, then imported-image inspection through
original resource/render owners before painting or broader seam unwrap work.

## Protected .878 — user PASS2026-10-16

2D Checker toggle/readability, tile-aligned pan/pinch/Fit, Pencil Move/Scale/Rotate and
Undo/Redo, Back to3D/reopen defaults accepted. .879 surface-checker device gate separate.

## .878 — UV Editor checker reference, 2026-10-16

User .877 PASS protects upright Cylinder strip/caps, Pencil/history, native project/
NOMAD Base and GLB seams; Box/Planar/imported baselines remain protected. Audit current
main83c0b563/live877: no checker inspection exists. Existing inspector canvas owns UV
projection; render-modes568 owns Studio/materials but has no UV-checker surface path.
Add optional Checker toggle to the ORIGINAL large UV workspace and renderer. Fixed
16×16 reference inside tile0–1 uses the same projection as outlines/picking, with
numerically clipped cells and at most256 rectangles regardless of UV bounds/zoom.
Draw under island colours/gold selection/orange seams. Default off on reopen; keep
view and selection when toggled, cancel pending Pencil preview/capture without edit.
Report/history refresh retains checker setting within current session. No scene/resource/
project/history writes, image decoding, new gesture/UV/render kernel or material changes.
This is a 2D size/alignment aid, not 3D stretch inspection or texture painting.

Three actual renderer/workspace regressions cover DPR/pan/zoom/picking, extreme/tiled/
offscreen/stale layouts, draw order/read-only arrays, pending-stroke cancellation,
view/selection/refresh/reopen lifecycle and no edit/history callbacks. Full local Node24
2381PASS/0FAIL/0skip. Cache graph MeshHealth/workspace/inspector878; edit878 changes ONLY
its inspector import pin; original edit maths/guards unchanged. Shell/recovery878.
Export panel877/native NOM865/manager+codec+resources875/nav868, protected Multi1.0,
main854/Loop/Extrude/Boolean and frozen betas unchanged. Publication proof follows.
Device878: Checker toggle/readability, pan/pinch/Fit, Pencil Move/Scale/Rotate + Undo,
close/reopen default off. Next audit a temporary 3D checker through existing render
and triangulation owners; do not add another triangulation kernel or persist a preview
material into resource/history/export. Imported image inspection and painting follow
separately after material/resource budget and lifecycle audit.

## Protected .877 — user PASS2026-10-16

Upright Cylinder UV strip/two caps, separate Pencil island edits, Undo/Redo, Save/Open,
NOMAD Base and Base GLB seam/cap continuity accepted. Preserve native sourceboxlab/v3
transport and imported pole-weld compatibility; .878 checker device gate remains separate.

## .877 — native Cylinder UVs (world Y), 2026-10-16

User876 Perfect PASS protects Box panels/seams/island edits/history/project/NOMAD
Base. Audit main79fec447/live876: no cylindrical mapper exists. Add Cylinder UVs (Y)
to Mesh Health→UVs for plain upright round aligned-ring cylinders/prisms. Uses the
same native eligibility, sourceboxlab/v3 channel and original commit/history owner.
One side strip with deterministic existing-column seam near maximum world X, plus
two separate planar caps for the standard closed Cylinder. No geometry split/change.
Open side-only forms can produce one strip; no general arbitrary seam-cut operation.
Measured cross-section polygon edge lengths unfold the strip, preserving side/cap
edge density, including odd radial counts and multiple height bands. Atlas is fitted
with gaps between strip/caps. Round rings about Y required; nonround/elliptic, axis-
collapsed, unaligned seam, degenerate/invalid/procedural/imported/modifier contexts
refuse before history/payload mutation. User can still use Planar/Box as appropriate.

Extend existing imported-uv-edit with createCylinderUV; read-only normalized positions
and unique radial columns, original native commit. Repeat no-op; replaces native UVs
with one checkpoint, Undo restores original; peers/resources untouched. Original
UV editor, selection, Pencil tools and navigation unchanged. Manager/codec/resources875,
inspector/workspace874/nav868/native NOM865 and protected/frozen owners unchanged.

Related GLB audit found old >=3-UV-variants pole-collapse rule could merge native
seam+cap variants at one geometry vertex. Existing exporter now sets preserveUVSeams
ONLY for sourceboxlab, retaining native UV corner variants; imported GLB pole/weld
path unchanged. No new exporter or triangle kernel. Prior membership-only attribute
tests did not prove this distinction. New real GLB assertion checks all THREE UV
variants of the seam/cap vertex against source values, in addition to NOM UV pool
bytes/project continuity. File NOMAD writer was already seam-correct and unchanged.
Five native regressions cover3islands/seam/no-op/Undo/geometry identity, measured edge
density/odd rings/finite extremes, native replacement/peer/island isolation, actual
MeshHealth/project/NOM/GLB seam variants, and invalid/unsupported refusals. Local Node24 full2378PASS/0FAIL/0skip; publication proof follows below. Cache graph MeshHealth/edit/export-panel877 plus
shell/recovery877; all other owner pins retained. Device877 gate pending;876 PASS
protected. Next after feedback: audit UV checker/texture inspection through existing
render/resource owners before painting or broader curved/seam unwrap work.

## Protected .876 — user PASS2026-10-16

Cube Box six-panel layout/seams, selected Pencil edits, native Undo/Redo/Planar
replacement and Save/Open→NOMAD Base accepted. Preserve Box mapper/sole gesture owner;
.877 Cylinder and native GLB seam gate remains separate.

## .876 — native Box UV mapping, 2026-10-16

User875 PASS protects native Planar/editor/history/SaveOpen→NOMAD Base and existing
imported-UV baseline. Audit main2f29af87/live875: no box/dominant-axis mapper exists;
native sourceboxlab/v3 channel, inspector/seam data and scene/export owners suffice.
Add Box UVs alongside Planar XY/XZ/YZ in Mesh Health→UVs. Whole plain Base mesh maps
by each face's dominant signed Newell normal (deterministic X/Y/Z tie order) into six
fixed3×2 directional cells. Normalized read-only coordinates avoid huge/tiny finite
scale overflow. One common projected-coordinate scale preserves rectangular face
proportions/equal axis-aligned density,2% horizontal tile/cell margins; spare space is
intentional. A normal cube yields six separate quad islands and12 seam edges, without
side-face collapse or opposite-face overlap. Same-direction subdivisions keep shared
UVs. General shapes can still overlap within a directional cell or distort; this is
box projection, not seam-based unwrap/optimal packing or texture painting.

Extend existing native creation owner in imported-uv-edit with createBoxUV. Extract
original native eligibility/commit into private shared helpers used by Planar and Box;
Planar maths/output retained. Invalid indices/nonfinite/degenerate faces/context/history
refuse before resource/history changes. Repeated same Box mapping adds no history;
Box can replace native Planar UVs in one checkpoint, Undo restores the previous payload.
Imported GLB/procedural/modifier/linked/reference/locked resource refusals retained.
Original COW transport, native envelope v3, inspector874/workspace874/navigation868,
manager/codec/resources875 and GLB/native exporters865 unchanged. No modelling kernel,
new schema/pointer/history/exporter or geometry mutation. UI native note now generic,
since same native channel supports more than Planar. All Pencil edits remain original.

Five native tests cover cube6islands/12seams/disjoint atlas/noncollapsed faces/native
Undo/no-op, rectangular proportions/density/same-direction adjacency/extreme finite
scales, Planar replacement/peer isolation/selected edit, actual MeshHealth callback/
project/native NOM independent UV indices+corner bytes/real GLB UVs, invalid/imported/
procedural/modifier/degenerate/history refusals. Local Node24 full2373PASS/0FAIL/0skip; publication proof follows below.
Cache graph MeshHealth/edit876; shell/recovery876. Other owners/protected Multi1.0,
Loop/Extrude/Boolean/main and frozen betas untouched. Device876 box/editor/history/
project/Nomad gate pending;875 PASS protected. Next: feedback on Box mapping, then
seam/unwrap or texture-inspection stages after owner audit; no evaluated UV guarantee.

## Protected .875 — user PASS2026-10-16

Native Planar XY/XZ/YZ layout, original Pencil manipulation/history, native project/
NOMAD Base roundtrip and imported UV baseline accepted. Preserve sourceboxlab/v3
transport and no fake GLB provenance;876 device acceptance remains separate.

## .875 — native BoxLab Planar UV creation, 2026-10-16

User874 PASS protects Fit-to-tile aspect/isolation/idempotence/history, Pencil tools,
navigation and project/Nomad UV roundtrip. Audit mainaeae3081/live874: existing read-
only resource/history/ordinary Duplicate/UV inspector/edit/export paths are sufficient;
no native UV authoring or projection exists. Mesh Health disclosure is now UVs, with
Planar XY/XZ/YZ for plain independent Base meshes (SubD/Mirror/linked/Boolean/Array/
curve/reference/locked/imported-resource contexts refuse). Projects the WHOLE mesh
onto chosen coordinate axes, uniformly fits to tile with2% margin, original geometry
unchanged; repeat same projection no-op. Reprojection replaces only native UVs with
one native scene checkpoint. Axis silhouettes can overlap/collapse opposite/side faces;
this is planar projection, not a box/seam unwrap, packing or painting.

Extend original imported-uv-edit owner with createPlanarUV; no parallel edit/history
kernel. Native channel uses the existing glbPassthrough face-corner RESOURCE TRANSPORT
with explicit source:'boxlab', version1 and only uvTopologySignature/uvCorners. This
is honest native provenance, never source:'glb' or invented material/image metadata.
Project resource envelope version3 encodes native UV-only records; strict keys/finite
corner/signature validation, no images/materials. Existing GLB envelopes1/2, plain
project format1, imported channels and pooled resources unchanged. Older apps refuse
v3 safely. Existing .boxlab codec/SaveOpen/manager atomic replacement now accept this
native record; read-only snapshots, single/Multi Duplicate and copy-on-write edits
reuse original owners. Native Linked Duplicate refuses before source conversion;
LiveArray/source guards already refuse attribute-bearing resources. No linked UV
propagation or topology/modifier UV regeneration promised.

Existing inspector874, workspace874/Pencil/navigation868 and UV Move/Scale/Rotate/
Flip/Fit now also accept native provenance through original edit guard. Existing GLB
and native NOM865 writers ALREADY consume this face-corner format/source-agnostically;
unchanged writers verified with real UV attributes/NOM indices and corner bytes.
Same topology signature owner; topology edits hide stale UVs and unsafe native export
refuses, Undo restores original resource. Initial projection normalizes coordinates
before subtracting, handles huge/tiny finite extents and refuses collapsed planes or
invalid indices/vertices/history without mutation. No texture rendering/paint/OBJ UV
expansion or evaluated UV export in875.

Seven native tests: axes/proportion/one Undo/no-op/reprojection; edits/COW/duplicate/
native scene replacement; strict v3 and legacy/plain codecs; actual NOM/GLB UVs and
stale topology; invalid/imported/procedural/modifier/finite-extreme guards; actual
MeshHealth callback; original single/Multi duplicate/deleted-copy Undo/linked refusal.
VM project replacement preserves incoming/global namespace separation (860 pattern).
Local Node24 full2368PASS/0FAIL/0skip;12 focused native/release PASS. Cache graph:
MeshHealth/edit875; manager875; resource875→codec875→management875→drawer875;
shell/recovery875. Inspector/workspace874/nav868/native+export865/protected kernels
and frozen betas unchanged. Device875 planar/editor/history/file/Nomad gate pending.
Next after feedback: inspect simple box/dominant-axis mapping and UV seams before a
full unwrap; preserve native channel transport and imported GLB protections.

## Protected .874 — user PASS2026-10-16

Fit-to-tile centring/aspect/other-island isolation, repeat no-op, one Undo/Redo,
view Fit distinction, Pencil/navigation and project/native UV roundtrip accepted.
.875 native channel/device acceptance remains separate.

## .874 — Fit selected UV island to tile, 2026-10-16

User873 Awesome PASS protects Pencil Rotate/pivot/seams, one Undo per stroke,
Move/Scale/navigation and project/Nomad UV roundtrip. Audit main3068b720/live873:
no UV fit-to-tile/packing operation exists; view Fit is navigation only. Add selected-
only Fit to tile beside existing workspace tools. Centres selected island at(.5,.5),
uniformly scales its longest UV dimension to.96, leaving2% margin; aspect ratio and
other islands unchanged. Single original UV transaction/checkpoint; repeated fitted
click is a no-op (8EPS centre/span tolerance only for fit-idempotence). This is selected-
island placement, not automatic multi-island packing or overlap prevention.

Extend SAME imported-uv-edit owner with fitImportedUVToTile(scope). Reuse original
island bounds loop through shared read-only importedUVIslandBounds; existing centre
helper delegates unchanged maths. Normalized coordinates avoid overflow/underflow,
including extreme/tiny finite UV extents. Zero-extent islands refuse; original complete-
imported/context/stale/history/locked guards remain. Full selected island includes
unpreviewed faces. Copy touched corners/replace payload/retire stale tangents as before;
resources/geometry/peers untouched. Workspace button cancels pending Pencil preview,
keeps matching selection and current view; original Fit still only frames the view.
Move/Scale/Rotate gesture owner and all original modelling owners unchanged.
Four native regressions cover native history/peer/resource isolation/idempotence,
aspect/full-island/extreme/degenerate guards, actual workspace/view-Fit distinction,
actual MeshHealth callback/stale scope and project/NOM UV bytes/GLB attributes.
Local Node24 full suite:2361PASS/0FAIL/0skip; publication proof follows below. Cache graph MeshHealth/workspace/edit/
inspector874; navigation868/Multi1.0/modelling kernels/frozen betas retained. Device874
gate pending;873 PASS protected. Next after feedback: audit a native BoxLab UV-channel/
projection foundation, using original history/project/export owners; no fake imported
GLB provenance, new-mesh UVs, seam unwrap, evaluated-modifier UVs or painting in874.

## Protected .873 — user PASS2026-10-16

Pencil Rotate centred preview/seams, repeated strokes/one native Undo, Move/Scale/
navigation and Save/Open→native Nomad UV roundtrip accepted. Preserve quarter-turn
parity and sole canvas gesture owner. .874 acceptance remains separate.

## .873 — Pencil Rotate for selected UV islands, 2026-10-16

User872 PASS protects Pencil Scale/pivot/seams, one Undo per stroke, Move/navigation
and project/Nomad UV roundtrip. Audit main89a17b3c/live872 and original workspace/edit
owners: Rotate90 exists, arbitrary-angle selected rotation does not. Add Rotate to
existing Move/Scale controls. Pencil horizontal drag right rotates counterclockwise,
left clockwise;120 CSS pixels =90degrees, live angle readout. Full-island bounds
centre remains shared with Scale, including unpreviewed faces. Default Move on reopen,
finger/background navigation, pinch and palm policy unchanged. Vertical-only/tiny
strokes add no edit. Original Rotate90/Flip buttons and exact Move/Scale remain.

Extend SAME imported-uv-edit transaction with rotateImportedUVByAngle(degrees,scope),
requiring selected island/expected payload/finite angle and all original guards.
Renderer and transaction share rotateImportedUVPoint; exact quarter-turn branches
retain accepted90-degree coordinates, generic angles use sine/cosine. Full turns
are exact no-ops. Read-only preview rotates selected outlines/highlight/orange seam
sides; original payload/other islands/resources remain untouched until lift. One
native checkpoint per changed stroke; mode/capture/report/lock/history/resize/close
cancel preview and original object/mesh/payload release guard remains. No new UV
schema/kernel/history/pointer owner. Four native regressions cover real workspace/
manager/history, reciprocal quarter turns, preview/seam/peer isolation, cancellation/
no-op/full-turn/navigation/palm/zoom/default Move, arbitrary-angle project/actual NOM
UV bytes/GLB attributes, actual MeshHealth callback, invalid/stale/overflow refusal
and full-island pivot. Local Node24 full suite:2357PASS/0FAIL/0skip; publication proof follows below. Cache graph
MeshHealth/workspace/edit/inspector873; navigation868, Multi1.0/modelling kernels and
frozen betas unchanged. Device873 gate pending;872 PASS protected.
Next: device feedback on Pencil Rotate, then audit the next staged UV-authoring step;
projection/unwrap/new-mesh UV channels and painting remain unimplemented, no blanket
UV propagation through topology edits or evaluated modifiers is claimed.

## Protected .872 — user PASS2026-10-16

Pencil Scale around island centre, seam preview, repeated strokes/one Undo, Move/
navigation and Save/Open→native Nomad UV roundtrip accepted. Protect uniform Scale
sensitivity/default Move; .873 device acceptance remains separate.

## .872 — Pencil Scale for selected UV islands, 2026-10-16

User .871 Perfect PASS protects Pencil Move, seam following, one Undo per stroke,
navigation and project/Nomad UV roundtrip. Audit main7864abe9/live871: workspace
owns the sole canvas gesture, imported-uv-edit already owns uniform Scale. Add
selected-only Move/Scale buttons to that workspace; Move remains default on reopen.
Scale: Pencil-drag selected island upward to enlarge/downward to shrink about its
full UV-bounds centre. 120 CSS pixels doubles/halves; positive factor clamped .01–100
per stroke, with live factor readout. Finger/background navigation and palm handling
remain unchanged; horizontal-only/tiny strokes do not scale. Mode switch cancels
preview. Exact fields remain optional under the existing collapsed disclosure.

Reuse the original read-only preview and one on-release Scale transaction/native
checkpoint. Shared importedUVIslandCentre extracts the existing bounds-centre loop
into the inspector; preview and commit use identical full-island bounds, including
faces beyond preview budget. Scale preview transforms only selected outlines/gold
highlight/orange seam sides; payload and report arrays stay unchanged until lift.
Existing stale context/locked/history/no-op/overflow guards and stable projection
remain. No new UV schema/kernel/history or pointer owner. Four native regressions
cover actual workspace/manager/history, preview/pivot/peer/resource isolation,
reciprocal strokes, cancellation/no-ops/mode switch/reopen, navigation/palm/zoom/DPR,
positive limits and bounded-preview/shared-corner seam correctness. Existing native
project/NOM/GLB and Move/Rotate/Flip tests remain active. Local Node24 full suite:2353PASS/0FAIL/0skip; publication proof follows below. Cache graph MeshHealth/workspace/edit/inspector872; nav868 and
protected Multi1.0/modelling kernels/frozen betas unchanged. Device872 gate pending.
Next after feedback: Pencil Rotate through the same workspace/transaction owners;
projection/unwrap/new-mesh UV channels/painting remain later.

## Protected .871 — user PASS2026-10-16

Pencil Move and orange seam following, repeated drags/one native Undo per stroke,
finger/pinch/background navigation and project→native Nomad UV roundtrip accepted.
Default Move remains protected when introducing Scale; .872 acceptance is separate.

## .871 — Pencil Move for selected UV islands, 2026-10-16

User .870 PASS protects numeric Move/Scale, native UndoRedo and project/Nomad UV
roundtrip. User requests Pencil movement instead of typing. Audit current main
604bac15 and live .870; existing workspace canvas owns pointers/navigation and
imported-uv-edit owns Move/history. Extend that canvas owner only: tap to select,
then Pencil-drag the selected island for a read-only live preview. Lift delegates
ONCE to the existing Move transaction (one native checkpoint for a changed stroke).
Finger drag, background/unselected Pencil drag, pinch, wheel and touch UndoRedo
retain navigation ownership. Palm touch while Pencil is down cannot edit UVs.
Exact Move/Scale fields remain available inside a collapsed disclosure; Scale stays
numeric in this narrow build. No new UV channel, edit kernel, scene history or schema.

Renderer preview offsets selected outlines/highlight and their orange seam sides
without changing payload/report arrays; seam-side island IDs avoid shared-corner
reference ambiguity. Screen deltas reuse the renderer projection, with CSS-pixel,
zoom and DPR parity. Workspace keeps projection bounds until Fit/reopen so moving
outside tile 0–1 does not auto-fit/jump. Whole selected island still moves through
existing transaction beyond the preview budget. Other islands/resources stay intact.
Tap jitter <=4px adds no edit. Cancel/lost capture/report replacement/lock/resize/
Fit/history/close discard previews; release guards original object/mesh/payload.
Four native tests exercise the actual workspace plus manager/history, live read-only
preview, repeated strokes/one checkpoint, seam sides, pointer/capture/palm/gesture
lifecycle, view mapping, peers and stale MeshHealth callback. Existing .870 export
regressions retain project, actual NOM corner bytes and GLB UV coverage.

Changed cache graph: MeshHealth871 → workspace871 / edit871 → inspector871;
nav868 and original Move math unchanged; shell/recovery871. Protected Multi1.0,
modelling kernels and frozen betas unchanged. Local Node24 full suite:2349PASS/0FAIL/0skip; final four Pencil tests also rerun
after seam assertions. Publication proof follows after verification. Device .871 Pencil feel/navigation/history/export
gate pending. Next: feedback on Pencil Move, then Pencil Scale/Rotate through the same
canvas/transaction owners; projection/unwrap/new-mesh UVs/painting remain later.

## Protected .870 — user PASS2026-10-16

Selected-island numeric Move/Scale, island isolation, UndoRedo, iPad field editing and
project/native Nomad UV roundtrip accepted. Pencil Move supersedes numeric-first UX
in .871; exact fields remain optional. Do not infer .871 device acceptance.

## .870 — selected-island numeric Move / Scale, 2026-10-16

User869 PASS protects selected Rotate/Flip, pivot/other-island isolation, native history
and project/Nomad UV roundtrip. Audit main82bed89c/live869 and original edit/workspace/
inspector/session/history owners: no UV Move/Scale controls exist. Extend existing
imported-uv-edit transaction with moveImportedUV(U,V,scope) and scaleImportedUV(factor,
scope). Require selected island + expected payload; all existing complete-imported/
context/stale/index/history guards remain. Positive uniform scale about original island
bounds centre; Move uses UV-tile offsets. Whole island includes faces beyond preview.
Other islands/geometry/peer payload/resources untouched; copy touched corners + payload,
retire old tangent basis, one native checkpoint per changed click. Zero Move/Scale1
no-op adds no history; nonfinite/nonpositive/overflow refuses before mutation.
Existing UV workspace gets compact ΔU/ΔV→Move and Scale×→Scale row, selected-only and
original edit eligibility. Fields default0/0/1 on reopen; retained after Apply so clicks
repeat. Blank/nonfinite/nonpositive values show inline error without edit. Original
MeshHealth callback supplies live context/scope, refreshes same report and retains only
matching island membership. Original Rotate/Flip/no-selection scopes unchanged. Canvas
drag stays pan; no new pointer owner/history/kernel/schema. Keyboard guard yields to
input editing, so Backspace/CtrlZ in fields remain normal native input actions.
Four native regressions: Move/Scale geometry/resource/peer/history isolation, project +
actual NOM UV bytes and indexed GLB attributes, no-op/invalid/stale/locked/overflow guards,
and real MeshHealth callback. Original868 workspace integration expanded for numeric
values/invalid/no-selection/UI delegation/Backspace;867 mock gets new callback binding.
Full Node24:2345PASS/0FAIL/0skip. MeshHealth/edit/workspace870, shell/recovery870;
inspector869/nav868/native865/manager+delete867/protected Multi1.0/frozen betas unchanged.
Device870 numeric/iPad keyboard/history/native-export gate pending;869 PASS protected.
Next after feedback: remaining narrow numeric UV transform controls via same edit owner;
projection/unwrap/new-mesh UV channels and painting remain later. No direct drag editing.

## Protected .869 — user PASS2026-10-16

Selected Rotate90°/FlipU/V around own bounds centre, unselected islands unchanged,
selection retention and native history/project/Nomad gate accepted. No-selection
whole-layout behavior and869.1 scope-label correction remain protected.

## .869 — selected-island Rotate / Flip, 2026-10-15

User868 PASS accepts tap selection/highlight, pan/pinch/Fit/clear and native history/
Back to3D. Audit main04ffe1a4/live868: existing imported-uv-edit transaction owns all
Rotate/Flip edits; inspector owns connectivity; no selected-island transform exists.
Extend SAME edit owner with optional island+expected-payload scope. Recompute original
inspector connectivity and validate current topology/payload/index; no stale island ID
silently applies to a replacement resource. Inspector now exposes faceIslands for ALL
mapped faces, retaining preview cap; whole selected island transforms beyond preview.
Selected Rotate90°/FlipU/V pivot around that island's UV bounds centre. Unselected faces
and resources are shared read-only; only touched UV arrays/payload replaced, prior tangent
basis retired. Existing no-op suppression/native checkpoint/guards remain. Without a
selection, original tile-centred WHOLE layout maths and exact APIs remain unchanged.
Original MeshHealth buttons pass workspace selection scope, refresh same report and
retain highlight only if full island membership still matches; merging/splitting clears.
Selection label explicitly says this island vs whole layout. UndoRedo/close/report
refresh still clear ephemeral selection; no new history/project schema or kernel.
Four native regressions cover continuous full island beyond preview, exact transforms/
twice flip, untouched peer/resources/geometry/native UndoRedo, codec + actual NOM UV
bytes and GLB indexed attributes, stale/invalid/locked/overflow refusal and real UI scope.
Existing868 test updated only selected scope text + membership retention/merge refusal;
all prior whole-layout/export/navigation contracts retained. Full Node24:2341PASS/0FAIL/
0skip. MeshHealth/edit/inspector/workspace869; nav868/manager+delete867/native865 unchanged.
Shell/recovery869; frozen betas/protected Multi1.0/modelling kernels unchanged.
Device869 selected edit/history/Nomad/project gate pending;868 PASS protected.
Next: after feedback, selected-island numeric Move/Scale through this same transaction;
no drag transform gesture takeover, unwrap, new-mesh UVs or painting in869.

## Protected .868 — user PASS2026-10-15

Tap selection/gold highlight, clear/empty tap, pan/pinch/Fit and native UndoRedo/Back
to3D accepted. Keep original gesture owner and shared renderer/picker projection.
869 deliberately extends Rotate/Flip from whole layout to current selected island;
no-selection whole-layout behavior remains protected. Stacked selection stays topmost.

## .868 — UV island selection, 2026-10-15

User Works well PASS /nextbuild accepts867 large workspace/navigation/session exit.
Audit current main d7b43cac/live867 and inspector/workspace/navigation/edit owners:
island IDs already exist; extend original inspector renderer and gesture owner.
Tap Pencil/finger/mouse selects the hit island, highlights its preview faces in gold,
and reports Island N of count. Clear Selection/empty tap clears. Shared uvProjection
maps both renderer and picker after pan/zoom; reverse paint order selects topmost
stacked island. Only previewed faces are pickable under existing20,000-corner budget.
Single short stationary tap uses existing navigation owner; restores tiny tap jitter.
Drag/long/multitouch/cancel do not pick; native two-/three-finger history unchanged.
Selection is ephemeral view state; refresh/edit/UndoRedo report replacement and close
clear it, Fit retains it. No UV coordinates/payload/geometry/history/project changes.
Existing Rotate/Flip remain WHOLE LAYOUT, explicitly labelled even with selection.
No selected-island editing yet; next narrow build extends existing edit transaction
with selected-island transforms after device feedback. No parallel UV kernel.
Five native tests cover continuous/stacked/concave/boundary/bounded/stale picking,
shared pan/zoom mapping, pen/mouse/touch and history discrimination, read-only highlight,
and actual workspace clear/reset/close/controls integration. Full Node24:2337PASS,
0FAIL/0skip. MeshHealth/edit/imported-inspector/workspace/navigation868; shell/recovery868.
Manager/delete867/native exporter865/protected Multi1.0/frozen betas unchanged.
Device868 selection/navigation/history gate pending; user867 PASS is protected.

## .867 publication verified / user PASS — 2026-10-15

Release d7b43cac5313fcf01e2b3adfc45b82fc758d9916; tree
217eeca8a73a0d3cd3488cfc601ab6b42cb8af2f. Node22 CI38677757901 /
job116235131037 SUCCESS2332PASS/0FAIL/0skip; Pages38677757250 SUCCESS.
Live shell/version/workspace867/navigation867 byte-match repository before868 changes.
User Works well PASS accepts large workspace, navigation and session exit; protect
same canvas/controls/history and clean Back to3D. Native865 and866 protections retained.

## .867 — large UV workspace, 2026-10-15

User 866 PASS protects Flip U/V, twice restoration, history and native/project UV
roundtrip. User approves dedicated large UV workspace after tiny Mesh Health preview
feedback. Audit main5b85e244/live866: inspector/drawing/edit/history/session owners exist;
no UV workspace/navigation owner. Reuse the same Mesh Health session, original canvas,
Rotate/Flip nodes and native Undo/Redo buttons. Mesh Health retains summary + Open UV
Editor; large overlay uses existing renderer with centred DPR-aware view, drag pan,
pinch/wheel/button zoom and Fit. New uv-navigation is presentation-only CSS-pixel state;
no modelling kernel, UV channel or history stack. Back to 3D/Escape closes original
session; capture/resize cleanup and pen/palm guards retained. Both existing keyboard
Delete owners yield while UV workspace is active. Root touch propagation is scoped,
but toolbar touch default remains available for Safari synthesized clicks.
Six native regressions cover pan/pinch continuation, tap Undo/Redo discrimination,
read-only renderer, original DOM/control/history/session wiring, DPR/resize/capture/
close/reopen/palm cleanup and actual Delete owners. Full Node24:2332PASS/0FAIL/0skip.
MeshHealth/edit/inspector/workspace/navigation867, manager/delete scoped guard pins867,
shell/recovery867; native export865, protected Multi1.0 and frozen betas unchanged.
Device workspace/pan/pinch/toolbar/history/exit/native-export gate pending. Preview
still capped at20,000 corners; no per-island picking/manipulation, unwrap or painting.
Next after feedback: island selection in this workspace using existing island data,
then narrowly scoped selected-island transforms. Do not build another UV edit owner.

## Previous direction — .866 imported UV flips, 2026-10-15

865 native File NOMAD UV gate user PASS protected. Extend existing imported UV edit
owner with Flip U/V beside Rotate; common transaction/guards/copy-on-write/history and
stale tangent retirement. Whole layout about tile centre, no per-island/unwrap feature.
Full2326PASS/0FAIL; four native history/resource/project/GLB/NOM/seam/UI tests, original
rotate/native export tests retained. Device flip/UndoRedo/project/native export pending.
Native865 writer/protected/frozen bytes unchanged; next small authoring step after
feedback and authoritative UV/history/resource/export owner audit.

## Previous direction — .865 native File NOMAD UV repair, 2026-10-15

864 FAIL is confirmed on File→NOMAD, separate native path still writing zeros. Existing
native writer now writes stored valid base UVs with independent UV indices at seams,
preserves polygon/triangulation corner mapping and counts UV objects. Stale/invalid/
evaluated unsupported UVs refuse clearly; no-UV legacy geometry unchanged.
Full2322PASS/0FAIL; four actual native byte/UI/rotation/project/seam/guard regressions.
Native Nomad device UV gate pending before more UV feature work.863 PASS remains
protected;864 broad acceptance not inferred. No native texture/material/layer extension.

## Previous direction — .864 imported UV rotation, 2026-10-15

863 PASS protected. First imported-channel authoring operation: Rotate UVs90° in
existing MeshHealth, full valid independent imported layout only. Copy UV arrays and
replace shared payload; one native scene checkpoint, Undo/Redo/project/export reuse.
Old tangents retired, metadata/images shared read-only; geometry unchanged. No new
UV channel/schema/history/kernel or BoxLab projection/unwrap/painting. Four native
history/resource/codec/GLB/guard/UI tests; full2318PASS/0FAIL. Device rotation/UndoRedo/file/export pending.
Next small UV authoring stage after feedback and authoritative resource/topology audit.

## Previous direction — .863 UV island/seam inspection, 2026-10-15

User862 PASS protects imported layout/stale-Undo/project gate. Extend existing inspector
with connected UV island colours/count and orange discontinuous shared-edge seams.
Vertex-ID adjacency/exact UV endpoints, conservative ambiguous-edge handling; no shared
payload mutations/new channel/history/kernel. Preview budget retained, full diagnostics.
Full2314PASS/0FAIL/0skip; four new native GLB/project/export/connectivity/canvas tests.
iPad colour/seam/layout/history/project gate pending.862 and861 PASS protected;860/859
gates remain separate. Next staged editable UV channel/authoring design after existing
topology/history/resource/export audit; no unwrap/painting/overlap analysis claim.

## Previous direction — .862 imported UV inspection, 2026-10-15

User861 PASS protects affine Array source/history/project gate. Existing importer
corner UV and exporter topology owner supply read-only Imported UVs disclosure in
Object Mesh Health. Shows coverage/base outlines/tile0–1/outside corners, hides stale
or malformed data and bounds preview drawing. Existing MeshHealth session owns lifecycle.
Full2310PASS/0FAIL; four native import/export/codec/channel/canvas/UI tests. iPad visual
and stale-edit/Undo/file sanity pending. No unwrap/painting/editable UV owner or evaluated
SubD/Mirror UV export. Next staged UV/resource work after feedback/authoritative audit;
860 Duplicate and859 Nomad gates remain separately pending.

## Previous direction — .861 affine Live Array reopen repair, 2026-10-14

Repository continuation audits860/main/live and reproduces the queued original-array
failure. Existing reopen owner canonicalizes only its internally inferred near-affine
matrix tail within32*Number.EPSILON. Strict external recipe/file validation remains.
Native tests cover repeated arbitrary rotation/nonuniform scale with count/END Apply,
source Apply/Cancel/history/SubD and project roundtrip; component edits still refuse.
Device861 gate pending;860 duplicate and859 Nomad resource gates remain separate.
Next: hands-on placed-array source/history/project sanity, then staged resource/UV
inspection or measured performance after feedback and authoritative-owner audit.

## Previous direction — .860 ordinary Duplicate retains editable Live Arrays, 2026-10-14

859 published/CI/Pages/live verified after direct standing push/publish approval.
Single Duplicate omitted arrayRecipe; Multi captured but dropped it at addMesh. Existing
addObject now deep-copies serialized recipe; both original duplicate owners forward it.
One independent editable array per copy, native count/END/source/subdivision/file owners
retained. Three native tests cover independent source/parameters, placement/Move/settings,
mixed grouped Multi, count/END Apply, source Cancel/Apply/edit UndoRedo and native project
replacement. Device860 gate pending;859 Nomad duplicate visual gate not yet accepted.
Next: proven existing affine-tail rounding in reopenArray after arbitrary-angle/nonuniform
placement+count/END edits can give[15]=1.0000000000000002 and refuse source reopen. This
also reproduces on original without duplication; repair native recipe owner separately,
retain strict external-transform/file guards and protected instance kernel.

## Previous direction — .859 imported resources through ordinary Duplicate, 2026-10-14

858 user PASS protects imported-resource pooled/legacy .boxlab Save/Open/export.
Audit found ordinary single and Multi Duplicate drop glbPassthrough. Pass read-only
payload through existing manager/addMesh; geometry remains independent, buffers shared.
Native tests cover both owners, mixed/group Multi and Move, delete/UndoRedo, pooled
project replacement and actual GLB UV/material/image bytes with topology safety retained.
Device duplicate→move→Save/Open→Nomad gate pending. Linked-rich project restriction
unchanged; no new history/render/export/texture editor. Next scoped resource work or
imported-UV inspection after feedback and audit of authoritative owners.

## Previous direction — .858 shared project image pool, accepted 2026-10-14

857 SubD Apply accepted.856 imported objects repeat shared image bytes in project JSON.
Existing codec now pools identical bytes once, with per-object metadata and validated
resource-v2 references. New decoded buffers shared read-only; legacy856 inline/plain
files preserve exact Open roundtrip. Full2297PASS/0FAIL.32MB file/24MB unique pool limits.
User858 PASS protects imported multi-object resources/legacy-open gate. No rendering or
texture editing change; next narrow resource stage after feedback.

## Previous direction — .857 SubD Live Array editing repair, 2026-10-14

User856 LiveArray+SubD edit error: universal guard wrongly rejects existing recipe base
geometry. Existing Array/source owners now allow existing Live Array SubD edits and
retain modifier settings, native recipe/history. New Live creation with SubD and Mirror
remain restricted. Full2293PASS/0FAIL, native Apply/Cancel/source/history/codec coverage.
User857 Apply/SubD works after suspected asset refresh; protect it. Source/reopen
checks and856 resource-file gate remain separately pending.
No modelling/render kernel change. Resume resource stage after feedback.

## Previous direction — .856 imported GLB project resources, 2026-10-14

855 PASS protected. Existing .boxlab v1 adds optional versioned imported GLB payload;
canonical binary image encoding, UV/material/metadata preservation, validated native
Save/Open/atomic replacement,32MB file limit. Plain v1 unchanged. Full2290PASS/0FAIL.
Device GLB→.boxlab→Open→GLB→Nomad gate pending. Linked imported GLB and other resource
owners still refuse; texture editing/UV unwrap/pool dedup not implemented. Next scoped
resource validation/pool stage after acceptance, retain accepted history/Loop/optimisation.

## Previous direction — .855 imported GLB scene-history resources, 2026-10-14

854 PASS protected; resume project-resource foundation. Existing imported glbPassthrough
was dropped by scene snapshots/restoration. Carry read-only payload through existing
history, share image buffers, require copy-on-write for future resource edits.
Full2285PASS/0FAIL; native History + UV/metadata/material/image export byte checks.
User855 PASS2026-10-14 protects imported delete/UndoRedo/export. Rich .boxlab remains refused;
resource-aware encode/open is next scoped stage, not silently enabled by this change.

## Previous direction — .854 native Loop completion, 2026-10-14

853 user PASS protected. Replace internal Undo/Redo clicks with existing main slide
cleanup exposed through guarded native commit. Same mesh/history/placed cuts remain;
853 colour detection, exact/repeat/background exit retained. Full2282PASS/0FAIL.
User854 PASS2026-10-14 protects repeat/EXACT/exit/UndoRedo. Next project-resource stage or measured
bottleneck after feedback; accepted owners remain protected.

## Previous direction — .853 Loop/MultiLoop completion repair, 2026-10-14

User852 FAIL: lingering yellow/blue loops and no finalisation. Screenshot counts show
cut topology but5active slide groups. Commit reads wrong proxy material after batching;
use actual cageMaterial. Main disarm retires loop slides, preserving cut/history.
Full2280PASS/0FAIL; actual single/5cut + batch + EXACT + native finish tests.
User853 PASS2026-10-14 protects completion/editable faces/history.
851 PASS protected;852 optimisation acceptance not assumed.

## Previous direction — .852 skip unused active base calculation, 2026-10-14

851 user PASS protected. Audit main: SubD render calculates base even when no body/
mirror cage uses it. Skip only unused base path; nonSubD body, enabled mirror cage,
explicit base export and native SubD/cache remain original. Full2278PASS/0FAIL.
Device SubD/Mirror/ShowCage/edit/history/export gate pending, no speed claim.
Next measured bottleneck or richer project resources after feedback.

## Previous direction — .851 mode-specific vertex dots / frozen Beta 7, 2026-10-14

User requests dots only in Vertex mode. Existing cage batch builder skips visual marker
instances outside Vertex; indexed proxies retained for picking/snapping/bridge. Edges,
face picking, Clean/Soft and original cage suppression retained. Avoids marker drawing
and instance updates outside Vertex, no quantified speed claim. Full2276PASS/0FAIL.
User851 PASS2026-10-14 protects mode-switch/selection/Clean/Soft;850 PASS protected.
Next measured bottleneck or project-resource work after feedback.

## Previous direction — .850 active render geometry reuse / frozen Beta 7, 2026-10-13

849 screenshot113rebuilds mean8.6/max25ms; inactive0.1/6ms with226hits/0misses;
Body2.8/9ms. Cage workload differs from848, no controlled improvement claim.
Reuse one active SubD BufferGeometry through existing main + cache812 display identity;
changed display/modifiers/source replace it, SubD Off releases it; normal cage and
nonSubD cleanup retained. Full2273PASS/0FAIL. User850 PASS2026-10-14 protects
selection/edit/history/modifier/render-look baseline. Latest screenshot851:94rebuilds,
mean6.2/max39ms, Body1.0/9ms; no controlled before/after timing claim. Next measured bottleneck or richer
project resources after feedback; accepted846 and earlier protections retained.

## Previous direction — .849 inactive render geometry reuse / frozen Beta 7, 2026-10-13

848 capture111inactive hits/1miss but6.4ms inactive mean, cage6.2ms and activeSubD5.7ms.
Next narrow build reuses owned buffers for visible independent inactive SubD objects
through existing layer/display identity. Changes invalidate, hidden/active/removed
objects free buffers; shared wire wrappers never dispose retained geometry. Linked
path unchanged. Full2271PASS/0FAIL; same-scene849 visual/resource/timing gate pending.
Next measured cage/active geometry work or richer project resources after acceptance.

## Previous direction — .848 cache owner measurements / frozen Beta 7, 2026-10-13

847 device capture shows281aggregate hits/41misses,106rebuilds mean14.5ms and inactive
mean5.8ms, without comparable pre-change sample. Split existing Performance cache counts
into Active/Inactive while retaining total; no geometry/cache algorithm change.
Full2268PASS/0FAIL; repeat device capture to scope next measured improvement or richer
project resources. Full847 manual visual/history acceptance still not inferred.

## Previous direction — .847 inactive SubD display reuse / frozen Beta 7, 2026-10-13

User PASS .846 completes audited cage display fixes. Resume measured performance:
existing exact-input cache812 now serves each independent inactive SubD object through
native displayMeshFor, avoiding repeat subdivision of unchanged objects. Linked source
path unchanged; GPU geometry still rebuilt. Four native checks/full2266PASS/0FAIL.
Device multi-object surfaces/history/visibility and Performance phase capture pending.
Retains one CPU display result per cached object; iPad speed/memory tradeoff must be
measured. Next measured inactive/render work or staged project resource preservation.

## Previous direction — .846 Soft cage batch compatibility / frozen Beta 7, 2026-10-13

User Perfect PASS .845 protects Clean View. Adjacent existing Soft owner missed810
batch kinds too; now applies original opacity factors to batched lines/vertex markers.
Full restores exact materials, Clean compatibility/picking retained. Full2262PASS/0FAIL;
iPad Soft/Full/Clean/rebuild gate pending. This finishes the audited display mismatch
before staged project resources/measured performance. No new modelling capability.

## Previous direction — .845 Clean View repair / frozen Beta 7, 2026-10-13

User PASS .844 protects Live Array source editing. Clean On screenshot still shows
batched cage: existing Clean owner now handles810 batch kinds and restores prior
visibility safely. Full2259PASS/0FAIL; iPad Clean/rebuild/restore gate pending.
No broader feature change. Resume project resources/performance or concrete Live
Array polish after this repair is accepted; source editing and conversion are passed.

## Previous direction — .844 staged Live Array source editing / frozen Beta 7, 2026-10-13

User PASS .843 protects explicit conversion. Edit Source isolates the placed original
on the same object, with existing component tools and local Undo/Redo. Apply Source
regenerates all items with saved/staged count and END transforms, one final history
step; Cancel restores the original scene and history. Top-centre source bar yields
to existing component tool panels. Source-only stage updates result on Apply.
Full2256PASS/0FAIL; iPad source/exit/history/project gate pending before expansion.
Optional generated preview can be scoped after acceptance; richer project resources
and measured performance remain next broader priorities.

## Previous direction — .843 Live Array conversion / frozen Beta 7, 2026-10-13

User PASS .842 protects progressive endpoint transforms and combined persistence.
Convert to Mesh in the reopened Array panel commits its staged preview as ONE ordinary
editable mesh with a single Undo restoring the live recipe. Apply Array remains live;
separate objects are not created. Full2250PASS/0FAIL; device test pending.
Source component editing is the next Live Array stage after this conversion gate.

## Previous direction — .842 progressive Live Array transforms / frozen Beta 7, 2026-10-13

User PASS .841 protects one-object/reopen/history/project foundation. .842 adds END
rotation rings and uniform/axis scale handles + exact values. Original0°/1× interpolates
to END across intermediate items; per-item centres remain on evenly spaced path.
One recipe persists count/placement/rotation/scale; shared preview/Apply maths and
canonical frame preserve combined effects after whole-object transforms. Full2247PASS/0FAIL;
iPad acceptance pending. Next source editor/conversion or resume resources/performance
following acceptance and authoritative-owner audit.

## Previous direction — .841 accepted Live Array foundation, 2026-10-13

Optional Live mode in existing Array keeps one object with source/count/END recipe.
Reopen count/spacing, Cancel, one-step Undo/Redo and basic .boxlab persistence implemented;
whole-object affine placement recoverable, non-affine edits refuse safely. Full2241PASS/0FAIL.
User PASS .841 protected. Progressive endpoint scale/rotation now implemented842; source component editing
and full requested scope remain queued. Rich resources/performance follow.

## Previous direction — .840 accepted; project resources/performance, 2026-10-13

.839 user FAIL: idle source writes. Legacy bridge-topology edges also writes state.mesh;
.840 dedicated main publication prevents those helper writes taking live ownership.
Expanded actual legacy/live/manager chain fails839, passes840 with1000idle reads stable.
User PASS fresh Linked/Array idle/editing gate on2026-10-13. Protect owner repair.
Next scoped build may resume project resource persistence and measured performance;
linked-file round-trip sanity remains relevant before expanding rich resources.

## Requested Live Array — staged implementation, 2026-10-13

User requests a persistent, non-destructive Live Array presented as ONE object in the
Object Browser, following the existing Live Boolean result/source editing pattern.
Keep the array editable after creation: reopen its source, count, spacing/placement
and endpoint transforms rather than baking separate scene objects on Apply.

- Moving the last item controls the array extent through the existing Array end-copy
  interaction; rotating/scaling that last item controls the final orientation/size.
- Interpolate rotation and scale gradually from the unchanged original to the final
  item across every intermediate item. Support combined placement, rotation and scale.
- Transform handles on the last item remain available when reopening the Live Array;
  editing the original/source updates the generated array without losing parameters.
- Preserve one-object selection, Undo/Redo and .boxlab recipe/resource round-trip.
  Explicit conversion to independent meshes may be a separate operation; normal
  completion must retain the editable procedural array.

Before implementation, audit existing Array end-copy, instance/source, modifier/recipe
and Live Boolean object-list owners. Extend those authoritative owners; do not add a
parallel modelling kernel. Protect .840 linked/Array placement and idle stability.
Count/placement/single-object/persistence stage shipped and accepted in .841; endpoint
rotation/scale shipped842 and user PASS protected. Staged source component editing ships844 (device gate pending); conversion to one
ordinary mesh shipped843 and user PASS protected. Protect accepted .840 drift repair.

## Previous direction — .839 live-mesh identity feedback repair / frozen Beta 7, 2026-10-13

.838 stack identifies temporary instance-local mesh stealing live-world bridge identity,
then inverse placement repeatedly shifts source. .839 bridge honors explicit main owner,
ignores helper edges after publication and publishes bounded identity events. New tests
fail on actual old bridge/pass repaired; full2237PASS/0FAIL. Device Linked/Array move→Face
and linked-file gate pending before further feature work. .830/.831 PASS protected.

## Previous direction — .838 exact instancing source-write audit / frozen Beta 7, 2026-10-13

User .837 repair FAIL. .838 traces exact authoritative shared-source assignment, branch,
geometry bounds/placement and caller stack through existing Debug. No behavior change;
need device writer evidence before correcting placement/edit boundary. Features paused.

## Previous direction — .837 native main Object drag repair / frozen Beta 7, 2026-10-12

User .836 FAIL; diagonal move and Array produce same source jump. .837 covers actual
main direct Object drag completion, which .836 transform-upgrade fix did not own.
Actual main+manager regression reproduces old drift and preserves straight/diagonal
linked/Array-style placements after completion. Local2232PASS/0FAIL; iPad gate pending.
Keep broader feature work paused until Linked Duplicate and Array pass.

## Previous direction — .836 stale transform release repair / frozen Beta 7, 2026-10-12

.835 screenshot confirms shared-source jump with visibility retained. .836 authoritative
transform owner completes at window capture and closes before mode change, preventing
reused Pencil ID from continuing old move. Full2230PASS/0FAIL; iPad original/copy
placement and linked-edit/project gate pending before resources/performance expansion.

## Previous direction — .835 linked original drift diagnosis / frozen Beta 7, 2026-10-12

User screenshots .834 active geometry/placement/visibility agree, original moves far away.
AFTER microtask was early; .835 next-task trace and browser/render-error reporting expose
completed mode/UI/peer geometry. Device failure unresolved; no further feature work.

## Previous direction — .834 linked disappearance evidence / frozen Beta 7, 2026-10-12

.833 user retest FAIL. .834 adds off-by-default read-only LINKED bounds/visibility traces
inside existing Gesture Debug. Obtain iPad mode-switch screenshot before another repair;
no new modeling feature work until this failure is understood and fixed.

## Previous direction — .833 linked mode-transition failure repair / frozen Beta 7, 2026-10-12

User FAIL .832: moved Linked Duplicate disappears on Face-mode switch. .833 flushes
outgoing Object placement before main mode mutation; real-owner regression covers
Face/Edge/Vertex and later shared edits. Retest this case and .832 project persistence
before richer resources/performance expansion. .831/.830 PASS remain protected.

## Previous direction — .832 linked project instances / frozen Beta 7, 2026-10-12

User PASS .831 protected. .832 reopens linked instance pool from existing persisted
world meshes/matrices, validates shared local data, preserves independent placement and
allocator integrity. Save/Open guards and peer-sync tested; device linked edit/Move/Make
Unique/history gate pending. Next rich resource persistence and measured performance;
NOM/Curve cutters/UV remain queued. .830 zero-failure baseline remains protected.

## Previous direction — .831 basic project reference guides / frozen Beta 7, 2026-10-12

User PASS .830 protected. .831 restores mixed reference/editable projects via existing
codec/Open/manager, keeps guides locked, chooses editable primary, refuses reference-only
and linked/rich resources. Full2219PASS/0FAIL/0skip; iPad guide Save/Open gate pending.
Next linked-instance project persistence then rich resources, with performance work
alongside; NOM import/Curve cutters/UV tools remain queued.

## Previous direction — .830 zero regression failures / frozen Beta 7, 2026-10-12

User prioritised failures. .830 fixes new quadball orphan poles with versioned recipes,
keeps old grid recipes editable, reconciles three stale UI/diagnostic checks and tests
safe shallow concavity alongside unsafe-notch refusal. Full2216PASS/0FAIL/0skip.
Next iPad Balloon/merge/navigation sanity, then .boxlab resource completeness and
performance improvements before NOM/Curve cutters/UV painting. .829 Open device gate
also pending. All accepted gestures and frozen Beta7 remain protected.

## Previous direction — .829 project Open hardening / frozen Beta 7, 2026-10-12

.829 hardens existing basic Open manager rollback, allocator and history integrity;
corrects stale Save status and unifies drawer/shell object-management loading.
Focused tests12PASS; full2216/2211PASS/5 existing FAIL, no new failures versus main.
Device Save/Open Cancel/Confirm/Add/edit gate pending. Next audit five existing
Curve/Balloon test failures, then staged project resources; NOM/UV remain queued.


.797 PASS protects the green baseline, GLB group import and Rotate. .796 Add+ previews,
unit-zone scale and Text remain protected. First Editable Boolean build stores independent
A/B source recipes and reopens them for existing Move/Rotate/Scale, explicit Update Preview,
Apply/Cancel and one scene Undo/Redo. User .801 PASS protects activation/exit and corrected radial. Concrete uploaded dense
Extrude repair in .802 takes priority before expanding: existing coalescer now handles
more than256 private wall cells, preserving guarded topology. User .802 PASS protects
the clean extrusion case and continued-modelling/history checks. .803 implements automatic
staged Live Boolean previews through existing editor/solver/history owners; device
acceptance failed for combined source/result presentation. .804 repairs this with
exclusive Result/Sources views; user .804 PASS protected. .805 compacts the Boolean
object list using existing recipes;  .806 removes redundant Update Preview and matches compact popup typography;
User .806 PASS protected; .807 matches startup/reset cube to accepted Add+1unit.
User .807 AWESOME PASS; Beta7 freeze/deployment explicitly requested and implemented
from accepted source; Pages and regression CI succeeded. User then chose to start the shared curve foundation: .808 Add+ Curve draw/edit profiles, user PASS protected. .809 performance readout and crease lookup accepted with iPad captures. .810 batches visible cage edges/markers while retaining authoritative picking proxies. .811 reuses unchanged active SubD results through exact cage/settings comparison; existing kernels and export isolation retained. User .812 Awesome acceptance recorded; readout identifies inactive displays as dominant cost. Performance work paused as requested. .813 brings the audited MeshUtilz Outline Balloon generator into the existing Curve editor, with Depth/rotatable preview, native editable triangle solid and recipe/history reuse. Convex closed outlines first; drawing/point editing and valid-profile preview accepted. .814 repairs over-strict rejection of tiny hand-drawn oval wobbles, explains invalid candidates inside preview; device retest pending. .815 cancels profile sessions on Reset and moves the existing Pencil authoring owner ahead of document modelling consumers; Reset/draw/navigation retest required before expanding. User PASS .815 Reset/Pencil but reports severe Balloon insertion slowdown. .816 adds optional donor Density4–12 for new Balloons, preserves legacy tessellation, and awaits iPad device performance test. User reports .816 substantially more responsive. .817 tests shallow star-shaped concavities through existing donor radial interpolation and actual-rim fold guard; await iPad feedback before promising broad concave support. User .817 accepts concave C and star; deep crescent fails. .818 offers optional quad-dominant ring strips (triangular poles remain), preserving existing triangle fallback. Real iPad test will determine whether stronger quad pole patching is worthwhile. User accepts .818 quad editing and wants cleaner poles. .819 pairs adjacent pole fan triangles for new Balloons; device and CI gates pending before stronger pole patches. User requests true quadball poles, not .819 kite faces. .820 introduces boundary-matched quad grid caps for new Balloons, preserving legacy geometry and needing iPad tests. Remaining triangulation/render-buffer optimisation can resume later; project Save/Open, NOM import, then Balloon and Curve Cutter consumers. Beta7 remains
frozen at .807 and immutable.

## Requested UV/texture workflow and performance — queued

Imported GLB UV/material/texture passthrough exists. Stage imported-UV inspection,
authoritative editable face-corner seam channels, projection/seam unwrap and packing,
then painting through existing Three.js textures. Preserve channels through topology,
history and .boxlab embedded resources. Larger painting/PBR/layer budgets need iPad
measurement; these are not implemented or promised by the Curve build.

User reports rapid slowdown with higher polygon counts. Audit identifies per-edge
Line/per-vertex sphere objects, active-display rebuilds, per-frame marker work and
full mesh/stack history clones. Measure first, then batch/instance cage geometry and
reuse render buffers; cache topology and accelerate picking as justified. Keep recent
Undo resident; optimise duplicate snapshots and evaluate older history in IndexedDB/
OPFS with quota/recovery handling. Exporting history alone will not improve draw calls.

User PASS .821 Pencil point merge. .822 introduces read-only project snapshot preflight through existing scene owner; versioned .boxlab codec and File Save/Open remain next steps, not shipped.\n\n## Added priorities — project files and NOM import

User requests native `.BOXLAB` Save/Open and Nomad `.nom` import. Recommended order:
1. Versioned `.boxlab` project format and File Save/Open, preserving complete editable
   scene including hidden Boolean sources/recipes, groups/links, modifiers and scale.
2. NOM import using existing container reader and scene importer, validated against
   real Nomad files; staged geometry/names/facegroups before richer attributes.
3. Shared curve editor and Balloon silhouette object, auditing existing Balloon code.
4. Extruded curve cutters feeding existing editable Boolean owner.
5. Quad-remeshing feasibility using open algorithms or licensed integration.

The project schema should be portable between browser and a future native iPad app.
Version migrations, validated atomic reopen and future procedural parameters belong
to the design. Native file-type registration and cross-session Undo persistence are
separate decisions. Export/import meshes do not replace native project persistence.
Both additions are queued, not implemented. Editable/live Boolean steps are complete.

## Beta 6 delivery refinement — .736

.735 user PASS. NOMAD now follows validated MeshUtilz browser-download/preview
route instead of generic save/share, with longer URL lifetime. Format/geometry
unchanged. Await iPad Download → Open In/Share → Nomad result and final release
smoke, then accepted candidate freeze. No more native-format features queued.

## Beta 6 native-handoff refinement — .735

.734 user PASS. Shared XYZ button colours and File NOMAD exporter implemented,
reusing MeshUtilz balloon-v0.6 native container/template. Geometry/names/groups,
Base/SubD/Mirror covered; existing GLB retained for richer channels. Await .735
Nomad first-open test and final iPad smoke, then freeze exact accepted Beta6 source.
No unrelated features or NOM-import promise.

## Beta 6 candidate correction — .734

User requests component Align on gizmos. Vertex/Edge original Align functionality
is exposed using point/line icons; Face Align moves out of radial to face icon.
All reuse component-align .705 and original anchor/history behavior. Await .734
Align plus .733 Focus device checks, then final release smoke/Files/Nomad and freeze.
No unrelated features.

## Beta 6 final candidate — .733, 2026-10-05

.732 user PASS. Default-launch Focus and armed toolbar icon implemented in .733.
No further feature work before Beta6 freeze. Release notes draft prepared. Remaining
checks: .733 Focus toggle/browser, final iPad navigation/history/Multi/Boolean/
Extract smoke, Files/Nomad round-trip. After those pass, freeze exact accepted
source into /beta-6/, finalize notes, publish and verify immutable frozen URL.
Existing full-suite test debt is documented, not claimed green.

## Current bundled refinement — .732, 2026-10-05

.731 explicitly PASS. .732 implements popup packing, audited background exits,
Array axis/Free handles, operation-scoped Inset Repeat, and top-bar/right-side
Object Browser with original Modifiers. Automated checks complete; grouped iPad
acceptance pending (TEST_CHECKLIST.md). Resume Beta 6 release checks after feedback;
no Beta 6 freeze or unrelated feature work.

## User-directed priority — updated 2026-10-04

Radial menus contain active modelling/repair tools only. Selection is handled by
long press and gestures. Do not add selection filters/helpers to contextual rings.

All development is now directed at finalizing radial menus and contextual settings.
Defer unrelated feature/gesture/strengthening work until this is complete.

Primary goal: finish contextual radial menus and top-centre pop-out settings so routine
modelling needs as little left-drawer interaction as possible.
Required order: **Face gaps → Vertex → Object → final Edge completeness pass**.
The .690 PASS completed the lifecycle of the existing Face ring; it did NOT prove
that all Face drawer actions/settings had migrated into the contextual workflow.
Edge's existing radial lifecycle is protected, but overall Edge completeness must
be finalized after Vertex and Object. Stop broad gesture expansion while this
radial-menu work is the priority. .691 remains protected; .692 is already published
and its Edge neutral-return hands-on checks remain pending.
Before the next runtime build, compare the full Face drawer against the current
Face rings, audit existing action/settings owners, and choose the next related
Face contextual batch. Preserve current passes. Add contextual access/pop-outs by
reusing owners; remove redundant drawer UI only after its replacement passes.
Do not mistake a working ring lifecycle for complete contextual tool coverage.

## Align to Face — v0.36.18.705

Implemented in the existing top-centre Align pop-out beside X/Y/Z. Select moving
planar Faces plus the fixed Face, choose Align to Face, then tap the selected fixed
Face. Moving group rotates rigidly and translates along anchor normal; shared hinges
work where anchor vertices remain fixed. Bent groups, warped anchors and unsafe
surrounding geometry reject without mutation. Selection/puck and one-step Undo/Redo;
no-op adds no history. Existing anchor owner/quaternion/health audit reused; no new
radial sector or pointer owner. Hands-on PASS. Resume Face gaps → Vertex → Object
→ final Edge after this confirmation.

## Tool-session popup placement

All viewport tool-session popups appear at the top centre, using the shared
placement owner. Preserve selection-relative gizmo/rings. This applies to future
Face, Vertex, Object and Edge session controls and floating numeric entry.

## Product direction

BoxLab is an **iPad-first touch/Pencil polygon modeller and Nomad Sculpt companion**.

Core principle:

**Import → Clean → Model → Export → Nomad Sculpt**

BoxLab should stay fast, direct, topology-aware and shallow. It should not become Blender-on-iPad.

## Phase A — Topology intelligence / Clean for SubD

**Status: COMPLETE at v0.36.18.323.**

Delivered:
- conservative four-triangle fan repair
- sliver/skinny-triangle cleanup
- bounded even triangle-island complete matching up to 40 connected triangles
- complete matching only; no stranded triangle forcing
- surrounding quad-flow quality
- whole-patch boundary guards
- internal proposed-quad flow coherence
- average + worst-local internal-flow ranking
- smooth-interior valence regularity
- average + worst-local valence ranking
- conservative residual triangle-pair merge
- guarded all-quad tangent relaxation
- topology audit for invalid references, repeated/collapsed edges, duplicate faces, non-manifold edges and orphan crease data
- transactional rollback in the core cleanup pipeline
- generated irregular-mesh regression fixtures
- UI-level topology validation remains as a second line of defence

Phase A freeze rule:
- v0.36.18.339 reopened Phase A only for a concrete Clean shape-preservation regression; sharp incident normal breaks are now protected during relaxation
- do not resume blind triangle-cap growth
- do not chase exotic remeshing research without a concrete user-facing failure
- future Clean for SubD changes require a real modelling case or a reproducible regression

## Phase B — Precision modelling

**Status: planned precision slice complete through v0.36.18.340.**

Priority candidates:
- cross-object snapping — **Add Vertex in v0.36.18.324; component Move snapping added in v0.36.18.325**
- precision drag/readback polish — **live component Move ΔX/ΔY/ΔZ readback added in v0.36.18.326**
- Repeat Previous audit/polish for exact repeated operations — **Repeat Extrude / Repeat Inset pre-existed .327; redundant duplicate loader removed in v0.36.18.328**
- Align / Flatten component tools — **existing Make Planar retained; Align X/Y/Z added in .329 and upgraded to explicit pick-anchor workflow in v0.36.18.330**
- Circle / regularize selected components where topology permits — **simple closed Vertex/Edge loop Circle added in .331; single selected Face boundary support added in .333; UI moved from Selection to contextual Active Tools in .334; exact Vertex/Edge/Face Active Tools slots arranged in v0.36.18.336**
- Edge Split canonical-Multi regression — **fixed in v0.36.18.335 by making Edge paint selection yield while Face Split is armed**
- Edge Flip for manual topology-flow correction — **existing Rotate Edge audited as the same triangle-pair diagonal swap; consolidated under the clearer Flip Edge label in v0.36.18.337**
- stronger structured Fill / Grid Fill / Cap workflows — **existing Fill is the current single-face Cap; conservative four-sided all-quad Grid Fill added in v0.36.18.338**
- support-loop construction improvements — **existing Offset Loop audited as the support-loop tool; transactional validation, canonical rail selection and Multi-safe Pencil handoff added in v0.36.18.340**
- **Edge Extrude** — **direct boundary/loose-edge ribbon workflow added in v0.36.18.423; repeated pulls automatically continue from the newly created outer rail; v0.36.18.425 adds Free/X/Y/Z/Auto directional constraints projected perpendicular to the source edge; v0.36.18.426 adds free Plane-constrained pulling perpendicular to the grabbed edge; v0.36.18.427 keeps the tool/constraint armed while tapping or switching boundary-edge selection**
- preserve direct Pencil interaction and minimal mode switching

## Phase C — Object / instance workflow

**Active phase.**

- linked-instance editing robustness — **explicit Linked Duplicate + shared-source manager foundation added in v0.36.18.343; ordinary Duplicate remains independent** — **v0.36.18.362 hardens the shared-geometry / independent-placement contract across activation and modelling edits**; **v0.36.18.363 makes linked-copy creation atomic so second-generation links are born attached before activation** — **v0.36.18.366 makes the live mesh bridge authoritative before every render so linked edits commit the visible mesh**
- Make Unique audit/polish — **explicit Make Unique detach path added in v0.36.18.343; v0.36.18.641 materializes authoritative source+instance placement before detaching active/inactive instances, removing cached-mesh dependence**
- cross-object reference/edit workflows — **Reference imports already served as snap targets; v0.36.18.344 hardens them as permanently read-only modelling guides across single/Multi/Group/history paths**
- stronger multi-object editing — **audit confirmed Multi Move / Scale / Rotate / numeric transforms / grouping / Duplicate / Join / Boolean already existed; Multi Linked Duplicate + Multi Make Unique parity added in v0.36.18.346**
- Join/Boolean workflow polish — **v0.36.18.347 consolidates both workflows onto the authoritative Object scene-history bridge; legacy parallel Boolean Undo/Redo wrapper removed while A/B UX, hidden originals, unique results, linked-instance metadata and Reference exclusions are preserved**
- persistent object/region organization — **v0.36.18.348 makes Group metadata persistent; v0.36.18.349 makes Groups first-class; v0.36.18.350 compacts the tree; v0.36.18.351 centralizes Group ownership; v0.36.18.352 restores two-object viewport feedback + compact naming; v0.36.18.353 fixes focused Rename/live header refresh; v0.36.18.354 adds whole-Group visual context; v0.36.18.355 fixes grouped transform routing; v0.36.18.356 compacts Object/Group rows; v0.36.18.357–.358 harden upward More popovers; v0.36.18.359 restores per-object Delete and adds keyboard Delete/Backspace.; v0.36.18.360 makes Origin/Pivot contextual and compacts the Object Selection toolbar.; v0.36.18.361 adds direct per-object SubD Preview toggles to compact Outliner rows.**

- Group Boolean convenience — **v0.36.18.368–.369:** two complete Groups can act as Boolean A/B operands; .369 replaces the naive disconnected Join operand with a shell-by-shell compound Boolean path, while source Groups remain intact/hidden for Undo.

### Beta 3 release-candidate hardening

**v0.36.18.371** is the approved **frozen Beta 3** checkpoint. The user completed the hands-on release gate on 2026-09-20 and the exact approved release tree is published under `/beta-3/`. Phase D may now resume on live `main` while Beta 3 remains immutable except for an explicitly approved emergency release fix.

### Beta 5 release checkpoint

**v0.36.18.538** is the approved **frozen Beta 5** checkpoint from source commit `343dc4dec00046762c7a9a11edaa92e0160a5a55`, snapshotted under `/beta-5/` by freeze commit `7667df2f889aca84b67bad56bf559d9c8d67478e`. The user completed the hands-on release gate on 2026-09-27. Normal development may resume on live `main`; Beta 5 remains immutable except for an explicitly approved emergency release fix.

### Beta 4 release checkpoint

**v0.36.18.427** is the Beta 4 checkpoint, frozen from main commit `ec45b3ba208ef3ffa40015d7a3b62666c63f379e` under `/beta-4/`. It captures the Phase D Tool Session consolidation plus the direct Edge Extrude ribbon workflow through Plane constraints and live edge-selection handoff. Normal development continues on live `main`; Beta 4 remains immutable except for an explicitly approved emergency fix.

## Phase D — Construction tools
- surface-relative Transform / Insert workflow — **Transform Tool foundation added in v0.36.18.436; v0.36.18.437 upgrades it to source-face → target-face true face-to-face anchoring; v0.36.18.438 adds the linked-instance Insert Tool foundation using the same surface-frame controller and existing sourceId/instanceMatrix architecture.**


Only add focused tools that suit BoxLab:
- topology-aware Symmetry / Bisect / Apply — **origin-plane X/Y/Z foundation with Keep +/- and optional welded Mirror added in v0.36.18.428; movable X/Y/Z plane with Vertex/Edge/Midpoint/Face geometry snapping added in v0.36.18.433; arbitrary-plane rotation and transform ownership added in v0.36.18.434; Align to Face + Flip Plane added in v0.36.18.435**
- Shell / Solidify
- Array
- Sweep where appropriate — **Sweep Path foundation added in v0.36.18.393; v0.36.18.394 added reliable Apply redraw + true 3D Geometry Snap; v0.36.18.395 changes Sweep to a profile-first workflow with a movable Profile Plane, Circle/Rectangle/custom profiles, editable construction state, and dual path sources: SketchUp-style Follow Edges or free Draw Path; v0.36.18.396 refines custom Draw with a compact Profile Plane and explicit Open/Closed profiles, including open-profile surface Sweep preview; v0.36.18.397 fixes profile closure/orientation mirroring; v0.36.18.398 hardens concave closed profiles and exact start-ring placement; v0.36.18.399 corrects side-face normals; v0.36.18.400 fixes Sweep edit ownership/transform disarm; v0.36.18.401 adds Use Selection for a preselected Face or closed Edge loop; v0.36.18.402 adds direct Face/Edge selection launch; v0.36.18.403 fixes closed-profile node insertion; v0.36.18.404 anchors selected profiles directly to the first rail edge; v0.36.18.405 unifies closed-shell normals; v0.36.18.406 moves Sweep into the new exclusive Tool Session UI with PROFILE / PATH / FINISH stages**
- Lathe where appropriate
- lightweight deformers only if they fit direct touch modelling

## Phase E — Import / repair / handoff

- Mesh Health / Inspect workflow — **foundation added in v0.36.18.439: non-destructive Object audit with Closed/Open clean states and topology issue counts; v0.36.18.440 adds transactional Safe Repair for exact duplicate faces, zero-area faces and accidental orphan vertices**
- Auto Close / Make Watertight — **v0.36.18.441 adds conservative Auto Close for Open · Clean meshes made entirely of simple closed boundary loops, with cap orientation reuse and closed-topology validation**
- stronger boundary diagnostics — **v0.36.18.442 classifies connected boundary groups as loops/chains/branched and hands boundary/non-manifold edges directly into native Edge selection**
- normals / triangulation controls — **v0.36.18.443 adds Unify Winding, Flip Normals, and ear-clipped Triangulate controls inside Mesh Health**
- export polish — **v0.36.18.444 adds evaluated-mesh OBJ preflight, per-object Mesh Health metadata, scene health summary, and OBJ group records while preserving permissive export**
- OBJ facegroup / polygroup preservation — **v0.36.18.445 preserves OBJ `g` data as per-face metadata, keeps grouped meshes as one object by default, and adds optional Split objects by groups import**
- viewport facegroup colours — **v0.36.18.446 adds a non-destructive Facegroups Render Look with stable per-group colours and neutral ungrouped faces**
- facegroup colour controls — **v0.36.18.447 adds contextual palette, saturation, lightness, ungrouped colour, reseed and reset controls**
- GLB export if useful for the Nomad/3D handoff workflow

## Phase F — iPad UX polish

- browser-selection interaction guard — **native Safari selection/callout suppressed across BoxLab UI while editable fields remain exempt in v0.36.18.345**
- **Solidify/Shell migrated in .421; Revolve Profile migrated in .422**
- persistent tool modes
- viewport contextual Selection Hub — **Face-mode v1 added in v0.36.18.642: closed puck -> transform gizmo -> contextual tool ring -> closed puck; tool sectors proxy existing authoritative actions and hide during active modelling**
- Edge contextual Selection Hub — **v1 added in v0.36.18.654 with Extrude / Bevel / Crease / Slide / Offset / Bridge / Dissolve / Delete proxies**
- Radial contextual availability — **v0.36.18.658: Face + Edge sectors mirror authoritative enabled/disabled/active state**
- Edge hold browser transactional preview — **v0.36.18.655: candidate probes restore original selection; scrub replaces rather than accumulates; loop enumeration covers both seed endpoints plus Boundary/Ring**
- Edge hold closed Face Boundary candidates — **v0.36.18.657: each Face incident to the held Edge contributes its complete perimeter as a browsable closed candidate**
- Edge hold additive base selection — **v0.36.18.659: pre-hold selection persists while the currently browsed candidate is replaced transactionally**
- Direct-tool Pencil ownership handshake — **v0.36.18.660: main direct tools block Pencil orbit stealing; Bevel disarms after completion**
- Bevel viewport session — **v0.36.18.662: radial Edge Bevel gets Width / Segments / Apply Exact / Cancel beside the model while existing Bevel owner remains authoritative**
- Selection Hub session palettes — **Sweep viewport session proxy added in v0.36.18.643; Profile / Path / Finish controls mirror the existing authoritative Sweep owner beside the model**
- Shell viewport session proxy — **added in v0.36.18.653; Thickness / Apply / Cancel mirror the existing Shell owner beside the model**
- left-hand access
- reduced tap count — **v0.36.18.406 makes Face/Edge → Sweep jump directly to PATH/Follow Edges and removes the need to hunt through Object Active Tools**
- consistent Pencil drag behaviour
- selection-region workflow
- numerical precision entry/readback
- landscape-first layout
- selection visibility at all zoom levels

### Selection Hub / modeless UX checkpoint — v0.36.18.690

- Edge radial lifecycle is complete and hands-on protected through .677.
- Face radial lifecycle is complete and hands-on protected through .690; refreshed-shell Shell/Sweep exits and Knife regression confirmed PASS on 2026-10-03.
- Protected Object-mode contract from .682:
  - finger/Pencil background tap dismisses Object gizmo
  - Pencil background drag still orbits
  - tapping the object restores the gizmo reliably
- Radial menu completion is the active priority: Face gaps → Vertex → Object → final Edge. .691 Face neutral return is protected; .692 Edge parity is published with hands-on checks pending. Broader gestures are secondary.

### Face contextual coverage / Vertex completion batch — .710

- .694 outer-ring Join/Circle and existing eight inner sectors are hands-on PASS and protected.
- .695 Poke/Make Planar are hands-on PASS and protected.
- .696 Triangulate/Flip Faces are hands-on PASS and protected.
- .697 Orient Faces/Orient Outward are hands-on PASS and protected.
- .698 Face Bridge viewport preview and centred × are hands-on PASS and protected.
- .699 Extrude/Inset Exact/Repeat/Done are hands-on PASS and protected.
- .700 shared top-centre session dock and Extrude/Inset background Done are hands-on PASS and protected.
- .701 selection owners passed hands-on, but user clarified that radial menus are active tools only.
- .702 removes Coplanar/Connected radial access and restores nine outer active tools; awaiting hands-on PASS.
- .703 adds Close Holes / Quad Cleanup / Quadify N-gons through a top-centre whole-active-object Apply/Cancel panel, reusing existing owners. Successful rebuilding clears stale Face IDs; Cancel preserves selection. Hands-on pending.
- .704 adds Clean Vertices to whole-object repair controls and Align to X/Y/Z anchor settings at top centre. Existing kernels reused; eight inner/fourteen outer tools. Hands-on pending; .702/.703 also remain pending.
- .705 adds arbitrary-plane Align to Face in the existing Align pop-out; rigid planar group placement, fixed anchor, guarded candidate commit, one-step history. Hands-on PASS.
- .706 exposes existing Merge by Distance through whole-object top-centre exact tolerance/Apply/Cancel, preserving Face mode and using existing safe scanner/weld owner. Fifteen outer tools; combined cluster validation, one history step and stale-ID cleanup. Hands-on pending.
- .707 adds Face Bevel using existing Edge bevel controller/kernel and shared top-centre Width/Segments settings. Single Face or connected region outside boundary, same Pencil drag/exact, Face mode retained, one Undo and guarded cancellation. Sixteen outer tools; hands-on pending.
- .708 responds to .707 Face drag FAIL: early owner dispatch/main fallback guard and Shell-like blue snapshot preview for Width/Segments/Pencil. Release retains preview; explicit Apply commits once, Cancel discards. Existing Edge/kernel/ring preserved; full manual list hands-on PASS and protected.
- Populate complete Face tool coverage before deciding inner/main vs outer/secondary placement. More is an accepted fallback if the completed two-ring layout is crowded.
- .709 Face owner/settings inventory accounted for all 24 active tools; Through already lives in inward Extrude. Pending Face repair confirmations and final placement review remain. Vertex starts with existing Merge Center / Merge First, same owner/history/chronology and puck lifecycle; hands-on pending. User requests all existing Vertex Active Tools in .710, followed by combined testing/refinement.

### Vertex Active Tools radial coverage — .710

All thirteen existing tools exposed: inner Add/Build Edge/Bevel/Slide/Join/Weld/
Create Face/Delete; outer Circle/Merge Center/Merge First/Merge Dist/Clean Vertices.
Existing owners/settings/history reused. Add/Build Done, Bevel Width/Exact/Cancel,
Slide signed exact/Done, selected-only Merge tolerance/Apply/Cancel and whole-object
Clean Apply/Cancel appear at top centre. No new modelling or pointer kernel.
Align is in Selection controls, outside this explicitly Active-Tools-only batch.

Bevel's inner90° /3-o'clock position is now consistent across Face, Edge and Vertex.
Face Knife135°, Duplicate180°, Extract moves outer337.5°; Edge Slide45°/Crease135°.
41 targeted PASS; full1169 tests/884 PASS and same285 failure names as .709.
Hands-on .710 AWESOME / PASS; protected. Object .711 now complete; combined
test/refinement before final Edge. Keep drawer fallbacks, .708 protected Face Bevel and earlier pending checks.

## Strengthening list

Concrete modelling cases to strengthen after the current Selection Hub / gizmo UX pass:

- **Connected-chain Edge Bevel through ordinary quad valence** — current multi-edge chamfer routing rejects some open connected chains when affected vertices are normal 4-valence quad-mesh vertices. Example captured 2026-10-02: a continuous top-profile edge chain across a subdivided/reshaped quad strip should bevel as one connected chain. Treat this as a Bevel capability gap, not invalid user topology. Preserve existing single-edge, loop/perimeter and already-working connected bevel paths while extending support.

## Protected product behaviour

Preserve:
- one-finger orbit
- two-finger pan
- pinch zoom
- two-finger tap Undo
- three-finger tap Redo
- no-jump orbit pivot
- persistent selections during navigation
- Studio realtime default/behaviour
- object management / Multi
- current snapping
- mature Through behaviour
- existing core modelling tools
- transactional topology operations

## Deferred / intentionally not active

- path tracing: abandoned in favour of Studio realtime
- broad sculpting / voxel remesh: belongs in Nomad rather than BoxLab
- Blender-scale scene-management complexity
- speculative topology work without a user-facing failure

- Tool-first UI/UX consolidation — **v0.36.18.450 hides inactive Tool Session settings, contextualises legacy Vertex settings, and moves Boolean behind a Tool Session launcher; planned as the pre-Beta-5 cleanup baseline.**


## Recovery rule after .465

- Current development restarts from the hands-on-good v0.36.18.449 runtime.
- Reintroduce UI/UX cleanup one narrow slice at a time.
- Each slice must pass hands-on interaction checks before the next UI slice begins.
- Do not reapply the v0.36.18.450 bulk consolidation wholesale.

- [ ] Complex logical-quad Loop Cut through multiple collinear boundary vertices — strengthen separately without changing protected v0.36.18.162 Loop Cut reconstruction / slide behaviour.

### Object Active Tools radial coverage — .711

All ten existing launchers now in two rings: Transform, Insert, Solidify, Array,
Boolean, Join, Symmetry/Bisect, Mesh Health; outer Revolve Profile/Clean for SubD.
Original owner controls docked top-centre in Object mode, intact settings/child
controls/Apply/Cancel. Authoritative owner cancellation and completion/gizmo return.
No parallel kernel/pointer owner; protected .710 Vertex and component Bevel positions.
32 targeted PASS; full1181/897/284, no new failures versus .710. Hands-on pending.
Next combined Object test/refine → final Edge inventory/settings audit.


### Coordinated popout / gizmo refinement — .712

User sketches supersede centre-to-radial access: centre free transforms; corner
shortcuts for Radial/Focus+Frame/Undo+Redo/Object Multi. All top tool popouts use
wide settings + stacked right terminal actions through shared presentation owner.
Original controls/geometry/history/gesture owners retained. .711 screenshots confirm
load, but no full Object PASS. 41 targeted PASS; full1190/906/284, no new failures.
Next .712 combined visual/tactile refinement before final Edge inventory/settings.


### Final Edge Active Tools coverage — .713

User .712 AWESOME PASS protects wide popouts/gizmo shortcuts/Object coverage.
All nineteen existing Edge tools exposed, including eleven reported gaps. Loop/Split
settings and Done reuse original owners; Edge Sweep uses existing staged proxy.
One-shot handoffs and shared angular/tier slots aligned across component modes.
No new kernel or protected Loop core changes. 46 targeted PASS; full1195/911/284,
no new failures. Next combined .713 hands-on/refinement; retain drawer fallbacks
until approved. No unrelated gesture/topology expansion.


### Object List access in Focus — .714

Object gizmo gets list icon beside Multi, reusing original Objects disclosure and
Focus owner. Focus reveals only Objects, keeps Focus active, restores state on close
or mode/Focus exit. No parallel outliner/selection owner. 29 targeted PASS; no new
full-suite failure names. Next .714 hands-on plus pending .713 Edge combined checks.


### Persistent Edge radial Loop / Bevel — .715

.714 Object List PASS protected. Loop retains slide rail after placement; EXACT
finalizes without closing, more cuts allowed. Radial Edge Bevel drag/exact stays
ready for new selections. Background tap exits both; original navigation owner,
kernels/history retained. .688/.162 Loop core and Face blue Bevel unchanged.
50 targeted PASS; no new full-suite failure names. Next .715 hands-on and remaining
Edge refinement, retaining drawer fallbacks.


### Face preview / Boolean compact refinement — .716

.715 repeat Edge sessions PASS protected. Blue Face Bevel render overlay now excludes
unchanged polygons/other shells; original candidate and history remain unchanged.
Boolean two-row operands/operations with Close right, original controls retained.
51 targeted PASS; no new full-suite failure names. Next .716 visual/tactile checks.


### Object Multi gizmo / Boolean access — .717

Presentation anchor uses earliest surviving visible selected object from the actual
selection Set. Scene picker shared with activation prevents inactive object taps
from dismissing gizmo, including Pencil semantic guard. Genuine background dismissal
and existing Multi transforms/pivots preserved; protected transform1.0 untouched.
33 targeted PASS; full1210/926/284, no new failure names. .716 visuals remain pending.
Next .717 iPad Multi/Boolean access checks, then radial refinement.


### Combined viewport UI refinement — .718

Viewport Multi repair stays in actual early activation owner; original transform
file1.0 unchanged. Top icons share gizmo shapes, VIEW retained; original Snap/Lasso
controls above mode buttons. Confirmed double-background tap inverts original set
through selection owners with context guards. 61 targeted PASS; no new failures.
Minimal-drawer audit in handoff: modifiers, selection depth/filters/bulk controls and
Object List access with empty selection remain. Keep drawer available; user chooses
remaining homes after .718 hands-on, no unsolicited radial selection items.

### Lasso / Invert completion refinement — .719

Follow-up to .718: stationary background tap ends Lasso through its original owner
and existing main completion; semantic/canvas delivery is deduplicated per release.
No new raw-pointer owner or modelling/history changes. Full regression has identical
283 failure names to .718 (1219/936/283). Next iPad Lasso/Invert/Multi/navigation
confirmation and pending .716/.713 checks; retain drawer fallbacks.

### Edge Lasso / double-background timing refinement — .720

.719 Edge/Lasso and timing FAIL recorded. Existing Edge Paint yields to Lasso;
main background owner uses early window capture; native release timestamps replace
Safari timer-based deduplication and drive500ms Invert. No new gesture owner or
modelling kernel. Seven new regressions,38 targeted PASS; full1226/943/283, same
failure names as .719. Next iPad Edge/Lasso/Invert/navigation confirmation; use
Gesture Debug if still failing. Keep drawer and prior pending checks.

### Object List Modifiers / double-tap diagnosis — .721

.720 Lasso cancellation/drawing/finger navigation passed and protected. Slight
Lasso selection tightening explicitly deferred MUCH LATER to final perfection.
Double-background Invert still FAIL. .721 exposes original collapsed Modifiers
below Objects in Focus Object List; original controls and disclosure restoration.
Existing Invert matcher gains diagnostic-only reason/timing/count logs; behavior
unchanged pending on-device Gesture Debug screenshot before further gesture fixes.
21 targeted PASS; full1228/945/283, same failure names. Next Modifiers hand checks
and double-tap debug capture. Keep other pending checks/drawer fallbacks.


### Readable background-tap evidence — .722

.721 screenshot flooded by Pencil hover/movement; no Invert decision visible.
Pin last six BACKGROUND diagnostics and quiet repetitive logs, without gesture
changes. 8 targeted PASS; full1231/948/283, same failures. Next one-finger then
Pencil double-background trace; Invert and Modifiers device checks still pending.


### Physical double-tap evidence — .723

.722 screenshots do not identify second-contact failure. Preserve read-only
physical down/up/cancel evidence alongside semantic decisions; no gesture change.
10 targeted PASS; full1233/950/283, same failures. Invert and Modifiers device
checks pending. Main/Pencil movement thresholds both8px; do not repeat mismatch claim.


### Background hold replaces double-tap Invert — .724

User chose500ms stationary background hold for current-selection Invert; short tap
clears/exits Lasso, hold retains Lasso and survives release. Existing owner and
original selection APIs, guarded against navigation/multiple contact/context/session
changes. Double-tap retired.24 targeted PASS; full1237/954/283, same failures. Next
iPad hold/tap/release/Lasso/navigation tests, then pending Modifiers/radial refinement.


### Beta6 drawer access — .726

VIEW Object List closes empty-selection/hidden-gizmo Focus access gap by reusing
original mode/list owners. Original collapsed Modifiers included; busy tools guarded.
12 targeted PASS; full1240/957/283, same failures. Next iPad list/Modifiers checks,
remaining selection-depth/filter/bulk Object access audit, combined radial/session
regression before Beta6 freeze. Keep drawer fallback and passed .724 interactions.


### Beta6 viewport selection depth — .727

.726 Object List access user PASS. Move original Visible/Through depth controls to
viewport strip for normal/Focus access. Original owners/listeners and geometry math
retained.27 targeted PASS; .726 full baseline1240/957/283 retained. Next iPad depth/
layout sanity check, remaining advanced filters/bulk Object audit and release regression.


### .728 Beta6 grouped build progress
Selection-access batch implemented: viewport SELECT exposes complete original component filters/commands and contextual Object bulk controls; manual validation pending. Next batch: radial/session polish across all modes, then release-candidate navigation/transform/Multi/Boolean/history/object/file/Nomad regressions, then Beta6 freeze. Lasso tightening remains deferred until final polish.


### .729 Beta6 grouped radial/session audit
Batch2 implemented and automated: all modes' original inventory/availability/settings/lifecycle reviewed; fixed Face drag guards, Edge context/queued exits and puck suppression, Crease single Undo ownership, rejected launches/read-only actions and shared wide-panel spacing/hidden stages. Device acceptance pending. Next /nextbuild 3: release-candidate regression across navigation/transforms/type-in/Multi/Boolean/history/object management/files/Nomad; then combined passes and Beta6 freeze. .728 manual acceptance still pending; Lasso tightening deferred.


### .730 Beta6 release-candidate audit / compact UI
User supersedes fixed-width popouts and removes Visible/Through UI (retain Lasso/SELECT). Compact content-sized panels implemented; RC audit restores missing Extract closing brace, validates279 source modules and actual transform/export/Extract owners.53 focused PASS; full1265/982/283 with identical existing failures. Device/WebGL/Files/Nomad checks still pending; see BETA_6_RELEASE_CHECKLIST.md. Next grouped iPad smoke test and issue review, then Beta6 freeze/notes. No Beta6 release claimed yet.


### .731 quick pre-finalization refinement — device checks pending

Sweep Face/Edge uses one original staged viewport dock; Edge Slide persists until
Done/background; Edge/Vertex popup blue bevel preview added through original owners,
retaining viewport drag bevel. 86 focused PASS; no new full-suite failure names.
Continue .730/.731 grouped iPad checks and Files/Nomad export acceptance; freeze Beta6
only after user feedback and blocker review. Slight Lasso tightening deferred.

## 2026-10-05 — Beta 6 released

Accepted .736 frozen at /beta-6/. No more feature work in this snapshot.
Next: final frozen-link device smoke, then choose post-Beta6 work separately.

## 2026-10-05 — Post-Beta6 reliability path

User approves reliability audit. Complete report/inventory in docs. Next batch
repairs test contracts and visibility without changing accepted runtime/frozenbeta;
then CI gate/coverage, varied Bevel/Knife→Loop, scene history and Nomad handoff.
277 failures are check results, not confirmed app bugs; no blanket quarantine.

## 2026-10-05 — .737 reliability batch1

Release/cache contracts and historicalscope reconciled;333 named scriptchecks,
full1610/1492/118/0skip. Modeller/frozenbetas unchanged. Next currentselection/
Gizmo/tool lifecycle semantic fixtures and OBJgroups before algorithms; CI release
gate follows genuine test reconciliation. See docs/reliability-build-737.md.


### .773 publication verification — 2026-10-09

Published32d70bb2e73151b3cb3b61f387e312d1d4371965; tree86adb0a691e79059379ac202554ac4c7a1d7f145 exactly matches tested checkout.
Actual Node22 Topology37933050867/job113828237624:2050tests/1964PASS/86FAIL/0skip;
all86 failure names match local. Pages37933050504 success. Live shell/version,
unchanged Gizmo and frozenBeta6 version byte-match tested checkout. Focused74PASS.
User .772 PASS recorded; .773 device sanity pending. Runtime source unchanged.

## .778 publication verification — 2026-10-10

Release commit `d0ba0fe19edee45b6a82f41b33d1a37b681d9e5f`, tree
`620c4e497aaef5586a46ffe959a4d5209e00e9af` matches tested checkout.
Actual Node22 Topology run38005274839/job114072505737:2055tests/2000PASS/55FAIL/
0skip; all55 failure names exactly match local inventory. Pages38005274578 succeeded.
Fresh live index.html/version.json, unchanged Face/main owners and frozenBeta6
version byte-match repository. Focused65PASS. User .777 PASS recorded; .778 device
sanity pending. Runtime/frozenBeta unchanged.

## .779 publication verification — 2026-10-10

Release commit `5b24a307f9239286ece4d9947ad6a3f79dfb5542`, tree
`7fc73ef19749c57ec1c910724af03851d6f84905` matches tested checkout.
Actual Node22 Topology run38006619712/job114076765987:2068tests/2013PASS/55FAIL/
0skip; all55 failure names exactly match local inventory and778. Pages38006618687
succeeded. Fresh live index/version/kernel/Face import owner, unchanged main and
frozenBeta6 version byte-match repository.84focusedPASS. User .778 PASS recorded;
.779 supplied-model device acceptance pending.

## .780 publication verification — 2026-10-10

Release commit `2f200c6bec86eebc417034619949923e14633e4a`, tree
`ff10ed4fc279c5e7973b92d798461bc99a02218f` matches tested checkout.
Actual Node22 Topology run38007376560/job114079177377:2071tests/2019PASS/52FAIL/
0skip; all52 failure names exactly match local inventory. Pages38007376421 succeeded.
Fresh live index/version, unchanged main/accepted Through779 and frozenBeta6 version
byte-match repository.120focusedPASS. User .779 PASS recorded; .780 device sanity
pending. Runtime/frozenBeta unchanged.

## .781 publication verification — 2026-10-10

Release commit `c49f57c40528236343c38671313868dc526c82a8`, tree
`f45523d23b7618a672ca93c0c91497a614cfccc2` matches tested checkout.
Actual Node22 Topology run38009270303/job114085236411:2072tests/2025PASS/47FAIL/
0skip; all47 failure names exactly match local inventory. Pages38009270112 succeeded.
Fresh live index/version, unchanged main/Face779 and frozenBeta6 version byte-match
repository.115clean-focusedPASS; target group19PASS/1existing diagnostic FAIL.
User .780 PASS recorded; .781 device sanity pending. Runtime/frozenBeta unchanged.

## .782 publication verification — 2026-10-10

Release commit `8b74b8c1107d1eda3778cca05afaddad0e085710`, tree
`f9ad57892348ae6336d17a2bfae1fb93939f834c` matches tested checkout.
Actual Node22 Topology run38011380865/job114091946863:2073tests/2033PASS/40FAIL/
0skip; all40 failure names exactly match local inventory. Pages38011380490 succeeded.
Fresh live index/version, unchanged central debug/Face779 and frozenBeta6 version
byte-match repository.123focusedPASS; all five original .722 test bodies byte-identical.
User .781 PASS recorded; .782 device sanity pending. Runtime/frozenBeta unchanged.


### .783 publication verification — 2026-10-10

Published release commit `30e2a9f0af57222ea24b27fb960cf486dac2f07d`, tree
`9ef9c75b66c2456700cd3980d54ff4490b834bf0`. Pages run `38015557953`
completed successfully. Topology CI run `38015558359`, job `114104912894`,
completed with the expected active inventory: 2074 tests / 2038 PASS / 36 FAIL /
0 skipped. All 36 failure identities match `docs/reliability-build-783.json`;
four .782 failures removed and no new failures. Focused validation: 131 PASS.
Fresh live `index.html`, `version.json`, `src/main.js`,
`src/multi-face-direct.js`, and `beta-6/version.json` match repository bytes.
Runtime owners and protected pins unchanged. User accepted .782; .783 device
sanity remains pending.


### .784 publication verification — 2026-10-10

Release commit `1ed2807186c94684ff088a6ecdb1955f5f4dacc1`, tree
`f05d5abf98191f9cb1e43a265e27c106480227f8` exactly matches tested checkout.
Actual Node22 Topology run38017194089/job114109994738:2076tests/2041PASS/35FAIL/
0skip; all35failure identities exactly match docs/reliability-build-784.json.
Pages run38017193466 completed successfully.97focusedPASS. Runtime and frozenBeta
unchanged; .783 user PASS protected; .784 device sanity pending.
Fresh live index.html/version.json byte-match .784 repository. Unchanged main762,
Face779 and frozenBeta6 version also byte-match live. Shell markers/recovery784
coherent; reviewed runtime pins and hashes retained.


### .785 publication verification — 2026-10-10

Release commit `4437ecb4ab9e8223260b912163ee1310a2761732`, tree
`e5aadf925fe9b39f57d9a00f32899a24b11f8f23` exactly matches tested checkout.
Actual Node22 Topology run38018332508/job114113537665:2077tests/2045PASS/32FAIL/
0skip; all32failure identities exactly match docs/reliability-build-785.json.
Pages run38018332469 succeeded. Fresh live index.html/version.json byte-match785;
unchanged main762/Face779 and frozenBeta6 version also match live repository bytes.
110focusedPASS; source/frozenBeta unchanged. .784 user PASS protected; .785 device
sanity pending. Shell markers/recovery785 coherent, original modelling pins retained.


### .786 publication verification — 2026-10-10

Release commit `d1bef467466ac66e08433e412686a399c8473f4a`, tree
`bec9f248300ac1fcad0deaaf3b931d732fc7e190` exactly matches tested checkout.
Actual Node22 Topology run38019322721/job114116561321:2081tests/2049PASS/32FAIL/
0skip; all32failure identities exactly match docs/reliability-build-786.json.
Pages run38019322728 succeeded. Fresh live index/version and changed main786/
Face786/Vertex assist786 byte-match repository. Through779, protected Multi1.0 and
frozenBeta6 version also match live repository bytes.267clean-focusedPASS; broader
547/536PASS/11existingFAIL retained. .785 device FAIL and Edge acceptance recorded;
.786 user retest pending. Shell/recovery and reviewed runtime module pins verified.


### .791 publication verification — 2026-10-10

Release commit `f1d134e077726ae88da6a9e6a19644894d8853e8`, tree
`89ba5c3685e6e5cf9a71804e5e961df67d68a559` exactly matches tested checkout.
Actual Node22 Topology run38032058820/job114154883205:2100tests/2081PASS/19FAIL/
0skip; all19failure identities exactly match docs/reliability-build-791.json.
Pages run38032058768 succeeded. Fresh live index/version/shared UI791 byte-match
repository; accepted main/Face/Vertex786, Sweep789/Revolve788, Through779, protected
Multi1.0 and frozenBeta6 version byte-match unchanged repository bytes.124focused
PASS. .790 user PASS protected; .791 Face UI/history sanity pending. Shared UI
cache pin/hash and shell/recovery791 reviewed; no kernel or frozenBeta changes.


### .792 publication verification — 2026-10-10

Release commit `e1372c9cc2c379eb8a4f261fca1728517b318551`, tree
`c87dc4da613e0bb2941fec3a59ac1b50409259d6` exactly matches tested checkout.
Actual Node22 Topology run38033318243/job114158546682:2104tests/2087PASS/17FAIL/
0skip; all17failure identities exactly match docs/reliability-build-792.json.
Pages run38033318385 succeeded. Fresh live index/version byte-match792. Unchanged
Shell/Solidify cores, shared UI791/main/Face/Vertex786, Sweep789/Revolve788, Through779,
protected Multi1.0 and frozenBeta6 version all byte-match repository.71focusedPASS.
No runtime/frozenBeta changes. .791 user PASS protected; .792 Shell/Solidify device
sanity pending. Shell markers/recovery792 coherent; exactly two reviewed recovery
URLs changed with every runtime hash retained.


### .793 publication verification — 2026-10-10

Release commit `f098586bf7c2cf5eeb227d82cd408be294234714`, tree
`f8f3a85abfcc64caa9b53f57cd3e9d2d73fab958` exactly matches tested checkout.
Actual Node22 Topology run38034916611/job114163240465:2108tests/2094PASS/14FAIL/
0skip; all14failure identities exactly match docs/reliability-build-793.json.
Pages run38034916795 succeeded. Fresh live index/version byte-match793. Unchanged
render owner568/colour core547, shared UI791/main/Face/Vertex786, Sweep789/Revolve788,
Through779, protected Multi1.0 and frozenBeta6 version all byte-match repository.
42focusedPASS. .792 user PASS protected; .793 Facegroups device sanity pending.
No runtime/frozenBeta changes. Shell/recovery793 coherent; exactly two reviewed
recovery URLs changed, all runtime hashes retained.


### .794 publication verification — 2026-10-10

Release commit `4ae051d79fc855f0ab4e8224e0d4fb83770c3322`, tree
`4df564fce34f340b525fdcc8186825ebe6a0fd12` exactly matches tested checkout.
Actual Node22 Topology run38036208096/job114167039767:2112tests/2101PASS/11FAIL/
0skip; all11failure identities exactly match docs/reliability-build-794.json.
Pages run38036207720 succeeded. Fresh live index/version byte-match794. Unchanged
styles/topbar734/VIEW732, shared UI791/main/Face/Vertex786, Sweep789/Revolve788,
Through779, protected Multi1.0 and frozenBeta6 version byte-match repository.
48focusedPASS. .793 user PASS protected; .794 menus/modes device sanity pending.
No runtime/frozenBeta changes; shell/recovery794 coherent and exactly two reviewed
recovery URLs changed, all runtime hashes retained.


## .859 local validation — 2026-10-14

Full native Node regression:2300PASS/0FAIL/0skip, including three new duplicate-resource
checks. Reviewed release/cache contract passes; protected Multi1.0 and frozen betas
unchanged. Device859 duplicate→project→Nomad gate pending. Publication proof follows
in AI_HANDOFF/DEV_HISTORY after main/CI/Pages/live verification.


## .859 publication status — 2026-10-14

Complete local build3db33caa;2300PASS/0FAIL/0skip. Automatic approval review rejected
push to main despite recorded repository standing approval; direct authorization for
publication is now required by the review. Remote/live remain858.859 CI/Pages/live
verification and device gate pending. See AI_HANDOFF publication block; do not claim859
published or route around rejection through another tool.


## .860 local validation — 2026-10-14

Full native Node regression:2303PASS/0FAIL/0skip, including three new Live Array
duplicate tests and retained859 resource coverage. Reviewed shell/cache contract passes.
Protected Multi1.0/frozen betas unchanged; device860 gate and proven prior affine-tail
roundoff remain separate. Publication verification pending.


## .860 publication verified — 2026-10-14

Release40f638db7033dff8b79469e880531055a051cc72; tested tree
925bfba7f07e248a7c3ac58e0527ee693e3c68b7 exactly matches local.
Node22 CI38541986782/job115778710723 SUCCESS2303PASS/0FAIL/0skip;
Pages38541985896 build/deploy SUCCESS. Fresh live shell/manifest/manager860/
management860/drawer860, protected Multi1.0 and frozenBeta7 version byte-match.
Connected Git Data publication uses expected-main SHA and verified file/tree hashes.
Device860 duplicate/source/file gate pending;859 imported-duplicate/Nomad gate
not yet accepted. Next proven original-array affine-tail rounding repair remains queued.


## .861 publication verified — 2026-10-14

Releasef36b216a9c272a024e64f773279157858698cab2; tested tree
c94fbe5d4dd85b79ca536df549c190f8931b2f3a exactly matches fetched main.
Node22 CI38556571969/job115827100089 SUCCESS2306PASS/0FAIL/0skip.
Pages38556564998 build/deploy SUCCESS. Fresh postdeployment live shell/manifest,
core861/Array861/source-core861/source-editor861/codec861/management861/drawer861,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial asset reads
preceded completed deployment; complete postdeployment verification matches861.
All four handoff files current; device861 gate pending,860 duplicate and859 imported
resource/Nomad gates remain separately pending. No new user PASS inferred.


## .862 publication verified — 2026-10-15

Release47767d31bdcb54e23493fbe4a40adc4597592c1c; tested tree
e0fe02a94a7be968f147ff487e4c616c480aab65 exactly matches fetched main.
Node22 CI38658512748/job116173915714 SUCCESS2310PASS/0FAIL/0skip.
Pages38658512404 build/deploy SUCCESS. Fresh live shell/manifest, MeshHealth862/
inspection862 and protected Multi1.0/frozenBeta7 version byte-match repository.
861 user PASS protected;862 iPad layout/UV/stale-Undo/project checks pending. Separate
860 Duplicate and859 Nomad/resource gates not inferred. Four handoff files current.


## .863 publication verified — 2026-10-15

Release406cfd1f37ca9ab3e5eccaf7a6dd0c1ad59579ce; tested tree
3a8b20c62f2c5c86c3b3ea4d91135761ec46960b exactly matches fetched main.
Node22 CI38662867643/job116187970520 SUCCESS2314PASS/0FAIL/0skip.
Pages38662867413 build/deploy SUCCESS. Fresh live shell/manifest, MeshHealth863/
inspection863 and protected Multi1.0/frozenBeta7 version byte-match repository.
862 user PASS protected;863 iPad island/seam/coordinate-vs-topology/Undo/project gate
pending. Separate860 Duplicate and859 resource/Nomad gates not inferred. All four
handoff files current; no new authoring/channel/kernel/history owner.


## .864 publication verified — 2026-10-15

Releasec84b5c1b48034be7e597459c9c276e6d51df0dd7; tested tree
55358c7e8530028e071d44fbb502f01735e94ad6 exactly matches fetched main.
Node22 CI38664362797/job116192739572 SUCCESS2318PASS/0FAIL/0skip.
Pages38664361873 SUCCESS. Postdeployment live shell/manifest/MeshHealth864/edit864,
unchanged inspector863 and protected Multi1.0/frozenBeta7 version byte-match repository.
Initial reads preceded deployment; final complete graph matches864.863 user PASS
protected;864 iPad rotation/history/project/BaseGLB→Nomad gate pending. Separate860/859
gates not inferred; all four handoff files current. No geometry/kernel/schema changes.


## .865 publication verified — 2026-10-15

Releaseb080c811a3b4e901b4a360fb314f63adc38034de; tested tree
d548e4c2ff0bf1765933cbec32a9b511e6a06502 exactly matches fetched main.
Node22 CI38665811583/job116197395797 SUCCESS2322PASS/0FAIL/0skip.
Pages38665810713 build/deploy SUCCESS. Postdeployment live shell/manifest/export-panel865/
native-core865 and protected Multi1.0/frozenBeta7 version byte-match repository.
Initial reads preceded deployment; final complete graph matches865. Native Nomad UV
layout/seam device gate pending;864 FAIL recorded specifically on File NOMAD.863 PASS
retained; no native texture/material claim or new device acceptance inferred. Four
handoff files current; frozen donor/protected geometry owners unchanged.


## .866 publication verified — 2026-10-15

Release8186bf45691bed9b173d8db1af5033c136edec34; tested tree
cb39f28fdef41a49b0cb8bee2a05747cf3db611d exactly matches fetched main.
Node22 CI38676132706/job116230036867 SUCCESS2326PASS/0FAIL/0skip.
Pages38676132006 SUCCESS. Postdeployment live shell/manifest/MeshHealth866/edit866,
unchanged inspector863/export-panel865/native-core865 and protected Multi1.0/frozen
Beta7 version byte-match repository.865 native UV roundtrip user PASS protected;866
flip/history/project/native-export device gate pending. All four handoff files current;
no new device PASS inferred and no native schema/exporter/geometry changes.

## .868 publication verified — 2026-10-15

Release984c33265abc3118eb978121dac91737c8ac272c; tested tree
eebfa006c906772b0cfb8773e1dd9fe5541fbea1 exactly matches fetched main.
Node22 CI38696478096/job116294097328 SUCCESS2337PASS/0FAIL/0skip;
Pages38696477599 SUCCESS. Live shell/version/MeshHealth/workspace/navigation/
inspector/edit868, unchanged native865, protected Multi1.0 and frozenBeta7 marker
byte-match repository. User867 PASS protected;868 island selection device gate
pending. No selected-island transforms or new UV/history/resource/export schema.

### .869 final scope-label correction

Final source review caught a text replacement also changing the no-selection label;
whole-layout maths stayed correct. Restore explicit whole-layout label when cleared,
add actual workspace assertions at open/clear and refresh only MeshHealth/workspace
cache keys to869.1 (shell/version869; internal MeshHealth stamp869). No new user PASS.

## .869 publication verified — 2026-10-15

Final release312e030d95bd582dcd641b1835ba13f77ef93e74; tested tree
b72f182c44f1cfbf61d686e4dbf9ceaaf8f74970 matches fetched main. Node22 CI
38724621405/job116387284480 SUCCESS2341PASS/0FAIL/0skip; Pages38724621331
SUCCESS. Live shell/version869, MeshHealth/workspace869.1, edit/inspector869,
nav868/native865/protected Multi1.0/frozenBeta7 marker byte-match repository.
Final label correction included;868 user PASS protected.869 selected-island edit,
UndoRedo and project/native Nomad device gate pending. Repeated /nextbuild during
publication continued the active release; no869 PASS or later build is inferred.

## .871 publication verified — 2026-10-16

Release bb0191af0c7ee0266d95662b1ec2073f9eb12224; tested tree
7d6ea21850ddeb29b9a4189cd25c5ba2cfa5b1d0 exactly matches fetched main.
Actual Node22 CI38818127353/job116707802378 SUCCESS2349PASS/0FAIL/0skip;
Pages38818126928 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth871/workspace871/edit871/inspector871, unchanged navigation868,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial live reads
preceded deployment and returned870; final complete graph matches871. All four
handoff files current. User870 PASS protected;871 Pencil feel/navigation/history/
project/native-export device gate pending. Scale remains numeric under Exact;
Pencil Scale/Rotate follow feedback, no871 user PASS inferred.

## .872 publication verified — 2026-10-16

Release bbb8efdfa00b6ccc073400a9f36339fdb1c8808f; tested tree
9a4a162fa38eaff472a1596fdc1204a612dc6ea8 exactly matches fetched main.
Actual Node22 CI38823964047/job116726929368 SUCCESS2353PASS/0FAIL/0skip;
Pages38823962841 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth872/workspace872/edit872/inspector872, unchanged navigation868,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial live reads
preceded deployment and returned871; final complete graph matches872. User871 PASS
protected;872 Pencil Scale/navigation/history/project/native-export device gate
pending. All four handoff files current; Pencil Rotate next after feedback.

## .873 publication verified — 2026-10-16

Release 0087d2cbe3d8fd00d586619ebd890c0f4668e4a9; tested tree
015ab6da6fb23c90e3a9c1924faac9fac1f39927 exactly matches fetched main.
Actual Node22 CI38826931252/job116736445051 SUCCESS2357PASS/0FAIL/0skip;
Pages38826931247 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth873/workspace873/edit873/inspector873, unchanged navigation868,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial live reads
preceded deployment and returned872; final complete graph matches873. User872 PASS
protected;873 Pencil Rotate/navigation/history/project/native-export device gate
pending. All four handoff files current; next UV-authoring stage needs owner audit
and873 feedback. No new unwrap/new-mesh channels/painting or device PASS inferred.

## .874 publication verified — 2026-10-16

Release 594de3e95bb49dccc8484be92030f6d80fe9ad7a; tested tree
46c868ca785f9dc84744606f3345fd2becd14839 exactly matches fetched main.
Actual Node22 CI38852645045/job116817062661 SUCCESS2361PASS/0FAIL/0skip;
Pages38852644283 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth874/workspace874/edit874/inspector874, unchanged navigation868,
protected Multi1.0 and frozenBeta7 version byte-match repository. Initial live reads
preceded deployment and returned873; final complete graph matches874. User873 PASS
protected;874 fit/aspect/isolation/history/navigation/project/native-export device
gate pending. All four handoff files current; next native UV-channel/projection stage
requires owner audit and874 feedback. Selected fit does not pack multiple islands.

## .875 publication verified — 2026-10-16

Release 6272110710d0a590c701d9c587c4cee3e6d12fdd; tested tree
66fd86f936273230409adf6bb56e1e88a80b5b55 exactly matches fetched main.
Actual Node22 CI38857230889/job116831332240 SUCCESS2368PASS/0FAIL/0skip;
Pages38857230399 build/deploy SUCCESS. Postdeployment live shell/manifest,
MeshHealth/edit/manager/codec/resource/management/drawer875, unchanged workspace874,
GLB/native exporters865, protected Multi1.0 and frozenBeta7 version byte-match
repository. Initial live reads preceded deployment and returned874; final complete
published graph matches875. User874 PASS protected;875 native Planar/editor/history/
project/native Nomad device gate pending. All four handoff files current. Native
resource v3/sourceboxlab is explicit; no seam unwrap/painting/evaluated UV claim.

## .876 publication verified — 2026-10-16

Release 51e05f4cdccce9765ed3c3840680b19c520deb74; tested tree
88afe5f38e4c0f1d853752c6b927ecc54591165f exactly matches fetched main.
Actual Node22 CI38861934472/job116845958125 SUCCESS2373PASS/0FAIL/0skip;
Pages38861934138 build/deploy SUCCESS. Fresh live shell/manifest, MeshHealth/edit876,
unchanged workspace874/GLB+native exporters865/protected Multi1.0/frozenBeta7 version
byte-match repository. Manager/codec/resources875 and all protected/frozen owners
unchanged. User875 PASS protected;876 Box panels/selected edits/history/project/
NOMAD Base device gate pending. All four handoff files current. No general seam
unwrap/optimal packing/painting/evaluated UV claim; directional patches may overlap.

## .877 publication verified — 2026-10-16

Runtime release `e1d5ccffd03941b982df25d9463de9b0746e5e4a`; tested tree `c872ec647f8a7188f227d48c6cfc5459237a4328` matched fetched main exactly. Actual Node 22 topology CI run 38865991906 / job 116858835631 succeeded: **2378 PASS / 0 FAIL / 0 skipped**. Pages run 38865990703 build and deploy succeeded. Fresh live shell, manifest, Mesh Health/edit/GLB panel .877, unchanged UV workspace .874, native NOM core .865, protected Multi .1.0, and frozen beta-7 version all byte-matched repository files.

User .876 PASS remains protected. The .877 device gate remains pending: upright round world-Y Cylinder UVs, independent Pencil edits, Undo/Redo, project persistence, NOMAD Base and native GLB seam checks. No general unwrap, elliptic mapping, painting, or evaluated-modifier UV claim. All four continuity documents are current.

## .878 publication verified — 2026-10-16

Release `7b7cf2751e371959437a6ad10601c930f727a64d`; tested tree `ef9e7b6005166f3c6e38eb93830963f11f513e36` exactly matches fetched main. Actual Node22 CI38867402179/job116863294620 SUCCESS **2381 PASS / 0 FAIL / 0 skipped**; Pages38867401881 build/deploy SUCCESS. Fresh live shell/manifest, MeshHealth/workspace/inspector/edit878, unchanged GLB panel877/protected Multi1.0/frozenBeta7 version byte-match repository. Native NOM865, manager/codec/resources875/nav868 and protected modelling owners unchanged. All four continuity documents current. User877 PASS protected;878 checker readability/navigation/Pencil/history/reopen device gate pending. This checker is a 2D reference only; 3D texture/stretch inspection remains the next audited stage.

## .879 publication verified — 2026-10-16

Release `6b20c3939a9ebe7b9847fdc0830adb565fd0a1ba`; tested tree `794865b855df33763e91136e5421b4933569507a` exactly matches fetched main. Actual Node22 CI38870113315/job116871955152 SUCCESS **2386 PASS / 0 FAIL / 0 skipped**; Pages38870112481 build/deploy SUCCESS. Final fresh live shell/manifest/render-owner/preview-child/export-panel879, unchanged workspace878/native NOM865/protected Multi1.0/frozenBeta7 version byte-match repository. Initial reads preceded deployment (old878/child404); final full graph matches879. All four continuity docs current. User878 PASS protected;879 surface checker/navigation/UV edit→session-exit/history/look-restoration device gate pending. Stored Base UVs only; unsupported/stale/over20k-corner objects use Solid; no painting/evaluated UV propagation claim.

## .890 publication verified — 2026-10-17

Runtime08f0256ef54901f205311b25d93b04b3250c2746; tested tree
c7f3fd960f69b86bba150b377cc84646f18ced47 exactly matches fetched main.
Actual Node22.23.3 CI38985850970/job117257022771 SUCCESS2440PASS/0FAIL/0skip;
Pages38985850874 build/deploy SUCCESS. Fresh live shell/manifest/recovery/export-panel/
packed-child/native-core890, unchanged scalar889/displacement888/protected Multi1.0
and frozenBeta7 marker all byte-match repository. Initial reads preceded deployment;
final graph matches890. All four continuity files current; proof changes docs only.
User889 PASS protected;890 two-independent-import/UV/project native device gate PENDING.

## .891 publication verified — 2026-10-17

Runtime278b0042b4a1815e1765cf69edd1a2462862e669; tested tree
fdf44a1b86e9faa474fe1b785e104a70a0a12a34 exactly matches fetched main.
Actual Node22.23.3 CI38987566193/job117262477050 SUCCESS2443PASS/0FAIL/0skip;
Pages38987566624 build/deploy SUCCESS. Fresh live shell/manifest/recovery/MeshHealth/
workspace/preview/surface/render/export/native-parent graph891, scalar889, protected
Multi1.0 and frozenBeta7 marker all byte-match repository. Initial reads preceded
deployment; final complete graph matches891. All four continuity files current.
User890 PASS protected;891 UV Normal/Emissive/Pencil/project/native device gate PENDING.
Proof is documentation-only; tested runtime bytes unchanged.

## .892 publication verified — 2026-10-17

Runtime68ee2db64bf7b3bd6bb4df7433141fef48db44f7; tested tree
ce6c0a21c0fd49925ed557d4997edbb5fa2e1b89 exactly matches fetched main.
Actual Node22.23.3 CI38991841599/job117275721906 SUCCESS2447PASS/0FAIL/0skip;
Pages38991841149 build/deploy SUCCESS. Fresh live shell/manifest/recovery/MeshHealth/
workspace/preview/surface/render/export/native-parent graph892, scalar889, protected
Multi1.0 and frozenBeta7 marker all byte-match repository. All four continuity files
current. User891 PASS protected;892 grayscale/Pencil/project/native device gate PENDING.
Proof is documentation-only; tested runtime bytes unchanged.

## .893 publication verified — 2026-10-17

Runtimebbc0e4b20d55a47fbac9fa3daaa1b4a0c226a3e0; tested tree
efd82dfde462eca6e53e7ed61f23d8bf4332dc8b exactly matches fetched main.
Actual Node22.23.3 CI39003980800/job117312549657 SUCCESS2452PASS/0FAIL/0skip;
Pages39003980205 build/deploy SUCCESS. Fresh live shell/manifest/recovery/MeshHealth/
workspace/edit893, unchanged inspector880/preview/render/native892, protected Multi1.0
and frozenBeta7 marker all byte-match repository. All four continuity files current.
User892 PASS protected;893 Pack all/framing/history/project/native UV device gate PENDING.
Proof is documentation-only; tested runtime bytes unchanged.

## .894 publication verified — 2026-10-17

Runtime260817ff6794ce467346ad36dd8543978cdaf4d3; tested tree
60b9ca959af6b1c0e04bf766ea1aee8225390eda exactly matches fetched main.
Actual Node22.23.3 CI39005188711/job117316093356 SUCCESS2457PASS/0FAIL/0skip;
Pages39005188424 build/deploy SUCCESS. Fresh postdeployment live shell/manifest/
recovery/MeshHealth894/edit894, unchanged workspace893/inspector880/render892,
protected Multi1.0 and frozenBeta7 marker all byte-match repository. Initial reads
preceded deployment; final complete graph matches894. All four continuity files
current. User893 PASS protected;894 Sphere layout/Pencil/history/project/native UV
device gate PENDING. Proof is documentation-only; tested runtime bytes unchanged.

## .895 publication verified — 2026-10-17

Runtime6b1e003324e5e883d8a0f4625a1e69ba0336fde7; tested tree
d972fde28ba3b85d3cda78c4f33afe5a97a727ac exactly matches fetched main.
Actual Node22.23.3 CI39005809090/job117317939014 SUCCESS2462PASS/0FAIL/0skip;
Pages39005808724 build/deploy SUCCESS. Fresh live shell/manifest/recovery/
MeshHealth895/workspace895/edit895, unchanged inspector880/render892,
protected Multi1.0 and frozenBeta7 marker all byte-match repository. All four
continuity files current. User894 PASS protected;895 density/Pack/Pencil/history/
project/native UV device gate PENDING. Proof changes documentation only; tested
runtime bytes unchanged.

## TexturePaint evaluation publication verified — 2026-10-17

Evaluation commit ec7d0f6666a7b7713bece07c603ea0e976eb2634; tested tree
f12d0461396b98f883acb279cb728bbc6d512c56 exactly matches fetched main.
Node22.23.3 CI39006748131/job117320658726 SUCCESS2467PASS/0FAIL/0skip;
Pages39006747665 build/deploy SUCCESS. Fresh live trial index/controller/adapter,
byte-exact upstream source/licence and evaluation report match repository. Main
index/version remain byte-identical .895. Rendered browser verification did not
complete; iPad Pencil/navigation/seam/PNG tests remain pending, no device PASS inferred.
All four continuity docs current. Next is hands-on trial feedback before production
paint resource/history/gesture integration. Proof is documentation-only.

## .896 publication verified — 2026-10-17

Runtime81871e11aa9890747bea1ef337694a8666ce0eac; tested tree
011024983673d1d5d40a1cfc448f4031491ddfdb matches fetched main/local exactly.
Node22 topology CI39017673843/job117353013439 SUCCESS2474PASS/0FAIL/0skip;
Pages39017673462 build117353014782/deploy117353094301 SUCCESS.
Fresh live shell/version and all9 lab source/vendor assets byte-match repository.
Main protected modelling/Multi/frozen beta bytes and original TexturePaint trial unchanged.
Cloud Chrome loads lab modules/UI but WebGL context creation fails; unchanged original
TexturePaint page fails identically. Thus rendered surface/Pencil/navigation/PNG device
acceptance remains pending, not passed by browser inspection or Node adapters. No claim
of an iPad WebGL failure; this is the observed cloud-browser limitation. No896 user PASS.
Documentation proof changes no tested runtime bytes. Next: user paired-brush comparison,
then selected refinement/resource/codec/global-history work per docs/uv-paint-lab-896.md.

## .897 publication verified — 2026-10-17

Runtime1db5769b9888e6f6d1c5cbda4e968ffd27afab1d; tested tree
49fc268524ca308bb6dffcf0ca459346b87247fc matches fetched main/local exactly.
Node22.23.3 topology CI39018873809/job117356495970 SUCCESS2477PASS/0FAIL/0skip;
Pages39018873340 build117356496893/deploy117356596313 SUCCESS.
Postdeployment live shell/version/export-parent897 and lab index/controller/sample897
byte-match repository; protected Multi1.0/frozenBeta7 marker unchanged. Initial live
reads preceded completed deployment and served896; final postdeployment graph matches897.
User896PASS protects brush workflow with reported winding exception;897 fixes preview
orientation only, device retest pending. No897PASS inferred. Prior cloud WebGL limitation
remains separate from this actual Three geometry/raycast/source-winding test evidence.
This verification updates documentation only; tested runtime bytes retained. Next:
user orbit/paint sphere and cube all sides, plane/paired history sanity; then paint
resource/codec/COW/global-history design per current roadmap. Ordinary file-export
winding remains a separate audit item; no automatic general outward-repair promise.

## .898 publication verified — 2026-10-17

Runtime62849d782d40767f330adf79344c17b843bf8a34; tested tree
4047f6d1c5ca540e14e605ca5897f6ddabb1821d matches fetched main/local exactly.
Node22.23.3 topology CI39025253753/job117374865418 SUCCESS2483PASS/0FAIL/0skip;
Pages39025253372 build117374867123/deploy117374959488 SUCCESS.
Postdeployment shell/version and exact lab898 index/controller/sample/session plus
paint-resource898 byte-match repository. Initial predeployment reads served897/404;
final complete changed graph matches898. Main codec/native resources/export/brush core/
winding/protected modelling and frozen beta bytes retained. User897PASS protected.
Documentation proof changes no tested runtime bytes;898 filepicker/download/reload/
Open/Pencil continuation gate pending, no898 device PASS inferred. No new cloud WebGL
or Safari rendering proof. .boxpaint is a lab session, not main .boxlab/Nomad paint.
Next: Save Paint→Reset/reload→Open Paint from Downloads, compare both results/settings/
view and continued UndoRedo; then original scene-resource/codec/COW/history integration.

## .899 — project colour resource preservation; .898 user PASS — 2026-10-17

User898PASS protects .boxpaint Save/Open/continued brush/history/settings/view;895
not inferred. Audit37c77ab5 synchronous codec/actual history/manager/duplicates: no
colour resource forwarding existed. Separate colourPaint owner, original scene
snapshot/restore/ordinary single+Multi Duplicate share committed read-only buffers;
replace resource for COW edits. Original .boxlab Save/Open handles explicit scenev2
paint pool/ref envelopesv1 using existing canonical binary transport,8MiB unique raw
budget; plain projects retain v1 exactly. Native UVv3 remains strictly UV-only.
Owned decode/pool sharing/content+identity dedup; malformed/unknown/alpha/ref/budget/
linked/procedural/reference owners refuse. Original exact roundtrip/atomic Open,
render-failure rollback/history reset retained. Four tests + full2487PASS/0FAIL/0skip;
focused4PASS includes added failed-render rollback assertions. No rendered/iPad claim.
Binding opaque, no project SHA/current UV validity claim; .boxpaint SHA unchanged.
Main Open says colour preserved but display/editing unavailable. No authoring/transfer
UI/main paint/layers/UV propagation/GLB/Nomad paint export yet. Read
 docs/project-paint-resources-899.md. Next bounded selected-object bridge through
original preview/selection/history, explicit validity/rebinding/lifetime/refusals.
Shell/recovery and changed owner graph899; original sample/resource898, brush896,
preview897 and protected modelling/frozen bytes retained. Publication proof follows.

## .899 publication verified — 2026-10-17

Runtime47136701c9c667ecdb410d89ca6e8b751c773680; tested tree
da7f9e98766dff998f71e60d6deb20947dc692e1 matches fetched main/local exactly.
Node22.23.3 topology CI39028416328/job117383876628 SUCCESS2487PASS/0FAIL/0skip;
Pages39028415912 build117383877465/deploy117383953976 SUCCESS.
Postdeployment exact live shell/version, lab899 index/controller/session and changed
manager/management/drawer/codec/project-GLB/new paint-codec graph899 byte-match repository;
unchanged resource898 and recovery loader899 graph also match. Protected Multi-transform/
frozen/modelling/brush/preview bytes retained. User898PASS protected;899 nearby lab/main
project device sanity pending. No new rendered/Pencil proof or main paint authoring claim.
Documentation proof changes no tested runtime bytes. Next bounded original-owner
selected-object paint bridge requires validity/rebinding/lifetime/refusal rules before UI.

## .900 — main viewport UV Paint; .899 user PASS — 2026-10-17

Audit2c56d33f original native UV preview/raster/scene history/resource/render/input
owners. File Paint selected object, actual main viewport, one plain native UV object,
SubD/Mirror off≤20k corners. Original top-centre Tool Session/transform disarm/radial
lifecycle. Reuse896 raster + both samplers unchanged; opaque512², Pencil paints/fingers
navigate, occlusion/surface rays, one dirty upload/frame. Changed stroke checkpoints
original scene then COW resource; UndoRedo original/exits Paint. Async UV-envelope binding
uses original codec/signature; ordinary movement/deformation follows unchanged UVs,
UV/topology changes hide/refuse stale. Preview/body/context/disposal/capture/controls/
palm/interruption guards. Original render owner active/live + inactive/locked display
in Studio/Solid/UV Image. Main .boxlab v2 persistence through899. Original export resolver
now refuses painted OBJ/GLB/NOM rather than dropping paint; Quick OBJ catches; Join
refuses pending resource propagation. No PBR/layers/imported paint base/seam-safe/export
paint claim. Seven new tests; full2494PASS/0FAIL/0skip, no browser/Pencil proof inferred.
Historical741 pin test uses reviewed contract and retains shell/dynamic equality.
Read docs/viewport-paint-900.md. User899PASS protected;900 device gate pending.
Next hands-on actual paint, then flattened colour export through original owners.
Publication proof follows; protected Multi1.0/frozen/modelling/brush bytes retained.

## .900 publication verified — 2026-10-17

Runtimeeb26b99141af4a1e3a77d1f09fe559887880dd7e; tested tree
b687f2b2f3665f389f67e02db1e67bf991b487bf matches fetched main/local exactly.
Node22.23.3 topology CI39030804811/job117390693515 SUCCESS2494PASS/0FAIL/0skip;
Pages39030803672 build117390693845/deploy117390798136 SUCCESS.
Postdeployment exact shell/version, main viewport paint/target/core/render/radial/
manager/management/drawer/export/refusal parent graph900 plus Lab900 index/controller
and unchanged accepted raster/stroke896 byte-match repository. Recovery900 matches.
Protected Multi-transform1.0/frozen/modelling algorithms/brush bytes retained. User899
PASS protected;900 actual viewport/Pencil/navigation/project device gate pending.
No rendered/iPad proof inferred from Node adapters or previous cloud WebGL limitation.
Documentation proof changes no tested runtime. Next: device feedback, then flattened
paint export through original GLB/NOM owners; painted export refusal remains meanwhile.

## .901 — painted native Nomad / GLB export; .900 user PASS — 2026-10-17

Audit50bcdb2a: original native image/material/UV/container writer and GLB patch already
supply handoff; adapt export-local512² colour through them. New paint-export capture/
UV binding guard/private prepared snapshot association, owned geometry/UV/pixels before
await; no fake imported provenance/stored nativeUV material mutation. Existing PNG owner
adds losslessRGB8/sRGB and reuses CRC/zlib; scalar remains unchanged. Rows follow native/
glTF UV-v0-first convention, no Lab human PNG flip. Native white-factor colour image,
original independent UV/polygon buffers/image pool24MiB/dedup/offset/header. GLB embedded
PNG/neutral material/clamp sampler/original groups/seams/loader verification; painted
path enables existing source-winding flag only. Nonpainted path retained. Painted OBJ/
Join/raw unprepared sync export still refuse; .boxlab remains editable paint project.
Six focused tests PASS: exact PNG/UV/material/geometry/dedup/winding/snapshots/refusals
and both real File download actions. Full Node24 2500PASS/0FAIL/0skip; publication proof follows. User900PASS
protects viewport/Pencil/history/persistence/COW; no new Nomad/device acceptance inferred.
Read docs/paint-export-901.md. Next export feedback, then layer/compositor resource plan
through original owners. No rendered/PBR/seam-safe/imported paint-base/NOM import claim.

## .901 publication verified — 2026-10-17

Runtime32cca00338fc3bcd8894fb9f0c7ed9a14171c223; tested tree
5780a931a693f41bf4d72128d48289f014cad204 matches fetched main/local exactly.
Node22.23.3 topology CI39036938146/job117408573676 SUCCESS2500PASS/0FAIL/0skip;
Pages39036937708 build117408575029/deploy117408682503 SUCCESS.
Postdeployment exact live shell/version and export-panel/native-core/packed-parent/
PNG/new paint-export graph901 plus Lab901 index/controller byte-match repository.
Unchanged main paint/binding900 and recovery901 match. Protected Multi1.0/frozen/
modelling/raster/input bytes retained. User900PASS protected;901 external Nomad and
GLB colour/orientation/placement device gate pending, no rendered proof inferred.
Documentation proof changes no tested runtime. Next device export feedback, then layer/
compositor design through original owners; .boxlab remains editable paint project.


## .902 — layer/compositor foundation; .901 user PASS — 2026-10-18

User901PASS protects painted NOMAD/GLB placement/orientation/colour, independent
painted duplicates and continued painting/Undo/.boxlab. Audit main0bfb6819: raster896
writes opaque bytes, resource898/project899/export901 have no editable layer stack.
New isolated paint-layer-stack API: existing opaque base + up to3 straight-alpha
512² overlays, bounded IDs/names, visible/opacity, owned capture/append/replace,
byte-space source-over and flattened resource via ORIGINAL captureColourResource.
No new history/input/kernel or app wiring. Strict schemas/budgets; typed buffers
read-only by convention. Current copy-all API has no sparse/COW/performance claim.
Five focused checks PASS: exact blending/order/visibility/opacity/rows, input/edit/
output isolation, refusal/budgets/max stack, actual original project + native PNG
flattened handoff; editable stack still refuses as project colourPaint.
Read docs/paint-layer-stack-902.md. No layer UI/transparent brush/editable layer save
claim. No new hands-on test; existing paint/export unchanged. Shell/recovery902;
main paint900/export901/resource898/project899/lab901/protected/frozen bytes retained.
Next separate layered scene resource/project codec + atomic Open/history/duplicate
integration, then transparent raster/UI through current viewport owner. Publication
and full-suite evidence follow; no902 device PASS inferred.

.902 local validation: Node24.19.0 full suite **2505 PASS / 0 FAIL / 0 skipped**;
five new focused compositor checks PASS. No new device/rendered layer proof.


## .903 — masks/blend foundation and material direction — 2026-10-18

User requests surface image placement/Project from View, Insert Move→Rotate→Scale tap
cycle, masks/blend modes and Nomad-style material slots with displacement placeholder.
Read docs/paint-material-direction.md for requirements, sequencing and limitations.
Audit787cfcb9:902 compositor Normal-only;900 paint/899 project/901 export opaque.
Extend SAME isolated stack owner to v2 with owned per-overlay8-bit coverage masks,
enable/invert and26 colour blend modes in paint-blend-modes903. v1 Normal upgrade
byte-identical; strict unknown fields/invalid modes/masks and sparse arrays refuse.
Alpha×opacity×mask gates blended RGB; Normal exact902; standard W3C colour formulas,
extra modes explicitly defined in docs/paint-layers-903.md. Not Nomad bit-parity or
normal-vector/scalar/PBR blending. Buffers read-only by convention; max4.75MiB stack
plus copies/flat outputs, no measured performance claim.
Seven focused903 checks PASS; existing902 semantic checks retained (unknown-mode
refusal supersedes its obsolete Multiply refusal). Actual opaque project/native PNG
handoff retained. No app/lab layer UI, mask drawing, image projection or editable
layer persistence yet. Main resource/project/export continue refusing editable stack.
Shell/recovery903, isolated child903; main900/export901/lab901/brush896/protected
Multi1.0/frozen/modelling owners unchanged. No new hands-on test or user903PASS.
Next explicit layered scene/project pool through original codec/history/duplicate
owners, then transparent brush+layer/mask UI; image projection/Insert-cycle follows.
Full suite/publication proof follows;901 userPASS remains latest accepted device gate.

.903 local validation: Node24.19.0 full **2512 PASS / 0 FAIL / 0 skipped**;
seven new focused checks + existing902 tests PASS. No rendered/device gate inferred.


## .904 — editable layered project/history resources — 2026-10-18

Audit5efdc7d9: existing colourPaint history/ordinary Duplicate already share read-only
resources. New paint-layer-resource owner stores explicit layered resourcev2 in SAME
colourPaint field: validated opaque preview + owned903 stack with exact masks/modes.
Original colourPaintPool entryv2 and sceneprojectv3 transport all buffers through
original canonical bytes, whole-resource dedup;8MiB aggregate BEFORE decode includes
flat/base/overlays/masks. Plainv1/opaquev2 unchanged; strict field/version/ref/cache/
budget/unsupported owner guards. Original nativeUVv3 remains UV-only.
Same history/checkpoint/single+Multi Duplicate/atomic Open owners unchanged. Original
surface display reads validated flat colour; export adapter validates/captures owned
flatv1 BEFORE await and uses existing NOM/GLB writers. Editable layers persist only
in.boxlab. Existing opaque painter refuses layered resource until controls land,
preventing destructive flattening. No new layer UI/image sources/material authoring.
Seven focused904 checks PASS: exact resource/project/pool, real history/duplicates,
File Save/Open/corrupt input/render rollback, actual NOM/GLB+async snapshot and
committed display/painter guard. Node transport adapters are not rendered/iPad proof.
Read docs/paint-layer-resources-904.md. Changed codec/export/binding/paint/render+
parent loader graph904; main modelling/Multi1.0/frozen/brush algorithms unchanged.
No extra902/903/904 devicePASS inferred;901 userPASS remains protected.
Next REAL layer UI/transparent brush through original viewport/history and this
resource; do not add a parallel paintLayers property or history. Full suite and
publication proof follow. Manual904: existing paint/save/reopen/Undo/Duplicate/export
regression only; new layered fixtures automated, not user tasks.

.904 local validation: Node24.19.0 full **2519 PASS / 0 FAIL / 0 skipped**;
seven new resource/history/codec/export checks PASS. No device acceptance inferred.


## .905 — visible main viewport colour layers; .904 PASS — 2026-10-18

User904PASS protects paint Save/Open/Undo/Duplicate/NOM/GLB regression. Audit1d246735:
connect existing900 painter/903 stack+26 blends/904 resource and original scene history.
Layers panel: select/top-first, + Layer (max3), rename/reorder/delete, visibility,
layer opacity and26 modes. Base paintable/opaque; existing v1 converts only on + Layer.
Same raster gains optional straight-alpha layer mode with preserved opaque default,
pressure/hardness/per-stroke cap/cancel; same stroke/input/raycast/navigation owners.
Separate mutable layer/composite preview; original one dirty upload/frame; no measured
M2 performance claim. Whole-stack copies/preflight remain, not sparse optimization.
Every changed stroke/metadata operation checkpoints original scene and COW replaces
resource; selection/no-op creates no history. Full-scene8MiB pool checked BEFORE
checkpoint; invalid/budget/checkpoint failure restores original resource/preview.
Stored masks persist; no mask/image/material UI claim. Save/Openv3 and flat NOM/GLB use
original904 owners. Hidden/zero opacity layer refuses strokes while panel stays open.
Seven focused905 checks PASS; all original900 assertions retained in extracted shared
runtime.904 refusal assertion superseded by real layered opening/editable-path tests.
Read docs/paint-layer-ui-905.md. Changed painter/shared raster and Lab loader graph905;
compositor903/resource+project+export904/stroke896/protected/frozen owners retained.
Next DEVICE layer/Pencil/navigation/persistence feedback, then mask paint/UI through
same owners, followed by image projection/Insert cycle/material plan. Full suite and
publication proof follow. No905 userPASS or rendered browser evidence inferred.

.905 local validation: Node24.19.0 full **2526 PASS / 0 FAIL / 0 skipped**;
seven new layer/raster/UI checks PASS, original semantic checks retained. iPad gate pending.


## .906 — main viewport layer mask painting; .905 PASS — 2026-10-18

User905PASS: layers work well; UI/UX polish after feature flows are present. Audit
mainf8455236/local verified905 treefb902274: reuse903 masks/compositor,904 resource/
project/history/export and905 raster/input. Add Mask selects Mask paint target; same
opaque raster edits raw grey coverage, R8 committed, source colour pixels unchanged.
Hide/Reveal/Grey brush presets account for inversion; raw value0–255 slider, size/
hardness/pressure/opacity and both samplers retained. Colour picker preserved/disabled
in Mask mode. Layer switch/reopen starts Colour; base has no mask. Enabled/invert/
remove use COW + original checkpoints; selection/preset/no-op do not create history.
Cancel/settings/target/layer/body-loss restore mask/preview/navigation. Parent layer
must show/nonzero opacity and mask enabled to paint. Original8MiB preflight/rollback
preserved. Same resourcev2/projectv3/flat NOM+GLB, no new schema/history/kernel.
Seven focused906 tests PASS incl actual UI/core/source preservation, flags/UndoRedo,
interruption/invalid/budget/checkpoint rollback, exact Save/Open/re-edit and native
export. Full suite/publication proof follows; no rendered/iPad acceptance inferred.
Read docs/paint-mask-ui-906.md. Only main painter + shell/recovery906; raster/Lab905,
compositor903/resource+project+export904 and protected modelling/Multi/frozen untouched.
Next DEVICE mask gate, then editable image sources/Project from View through original
UV/geometry and Insert cycle. No material opacity/displacement or broad UI redesign
claim. Product direction remains docs/paint-material-direction.md.

.906 local validation: Node24.19.0 full **2533 PASS / 0 FAIL / 0 skipped**;
seven new mask UI/core tests PASS. Device906 pending; no rendered proof inferred.


## .907 — editable image source and placement foundation; .906 PASS — 2026-10-18

User906PASS protects mask/Pencil/navigation/history/project behaviour. Audit remote
4778567c and existing read-only UV image892/Insert437 owners. New isolated image
source importer retains original encoded PNG/JPEG + owned decoded RGBA, preflight
2MiB/1024² before bitmap decode, exact dimensions, async snapshot and cleanup.
Camera placement snapshots original Three matrices plus NDC centre/size/rotation;
projector clips camera/image bounds, returns top-first UVs. Original Insert cycle
re-exported verbatim; no new pointer/mesh/history owner. Six focused tests PASS.
Read docs/paint-image-source-907.md for browser colour/alpha/EXIF and memory limits.
NOT connected to painter, layer/project schema or UI yet. Coordinate projection
does NOT enforce facing/angle/scene occlusion; existing painter must do so before
rasterization. No Project from View/surface placement/manual device claim.
Main paint906/resource904/compositor903/protected Multi1.0/frozen unchanged.
Next explicit image source+placement resource/pool versioning and original history/
project/export integration, then picker/overlay/visible-front projection UI.
No new hands-on gate this foundation build; .906 PASS is protected, not907 image UI.

.907 local validation: Node24.19.0 full **2539 PASS / 0 FAIL / 0 skipped**; six new
focused image source/placement checks PASS. No new image UI or device gate.


## .908 — retained image layers in original resource/project owners — 2026-10-18

Auditfa81af3d:907 input/placement isolated;903/904 strict raster-only storage. Extend
SAME stack/resource/pool to explicitv3 and sceneprojectv4. Image recipe retains original
encoded+decoded source, placement and affine capture frame, separate surface raster.
Paired image+preview append/replace APIs; generic colour pixel edits refuse images.
All source/cache/mask/flat/base bytes charged to existing8MiB pool BEFORE decode;
legacy projects and nativeUVv3 unchanged. Original scene history/Undo/single+Multi
Duplicate/atomic File Open and flattened NOM/GLB retained. Existing painter supports
v3 controls/masks with image label and colour-stroke guard, no implicit bake.
Eight focused actual codec/history/File/painter/UI/export checks PASS. No new image
picker/Project UI, facing/occlusion rasterizer or rendered/device claim yet.
Source+placement907/brush905/blend903/Insert437/protected modelling/Multi/frozen retained;
changed owners and parent/Lab loader graph908. Read docs/paint-image-resources-908.md.
Next visible picker/overlay/Project via original UV geometry and current viewport input,
front/angle/scene/self-occlusion before texel acceptance, atomic recipe+raster commit.
Manual: existing paint/masks Save/Open/continue, UndoRedo, duplicate/export sanity.
Latest user906PASS protected; no907/908 devicePASS inferred.

.908 local validation: Node24.19.0 full **2547 PASS / 0 FAIL / 0 skipped**; eight new
image resource/history/project/UI/export checks PASS. Device gate remains separate.


## .909 — duplicate paint release fix; .908 user FAIL — 2026-10-18

User: duplicate paint disappears on Pencil release. Reproduced original Duplicate +
actual UI,3layers: whole-resource quota double-charges unchanged base/layers/flat and
refuses8MiB commit. Existing direct-assignment Duplicate tests missed actual release.
Repair SAME paint pool: exact canonical buffer-content dedup,8MiB unique /16MiB
expanded resource cap. Explicit scenev5 shared-byte transport only when inline>8MiB;
old scenev1–4 encoding retained below limit, complete predecode/schema/ref guards.
Original history/Undo/Duplicate/atomic File Open and flat NOM/GLB unchanged. All paint
commits preflight same pool, including opaque; failed commit restores buffers and
keeps Paint panel open. Five new regressions cover real single+Multi copy paint/release,
committed display/history/actual SaveOpen/re-edit, corrupt pool+both budgets/atomic
rollback, genuine limits/staged add and recoverable UI refusal.906 budget fixture
now uses genuinely distinct data; quota/rollback assertions retained. See
docs/paint-duplicate-909.md. Changed owners/parent/Lab cache909; stack/image908,
source907/brush905/blend903/Insert437/protected Multi/frozen/modelling retained.
Latest devicePASS906;908 duplicateFAIL recorded;909 device retest pending.
Next device duplicate release/Done/SaveOpen/Undo, then resume Project from View UI.

.909 local validation: Node24.19.0 full **2552 PASS / 0 FAIL / 0 skipped**; five new
actual duplicate/pool/recovery regressions PASS. Device release retest pending.


## .910 — native paint texture-name collisions; .909 viewport PASS — 2026-10-18

User909PASS protects duplicate paint release/Done/SaveOpen/Undo; NOMAD exception:
copy adopts original paint. Screenshots show909/green copy strokes in BoxLab, absent
in Nomad. Auditc1b350e0: prepared PNGs/material+image indices already distinct, but all
paint textures namedBoxLab paint.png. Repair authoritative native writer name registry:
NFC/case-folded collision names get numeric suffix for DIFFERENT image indices; equal
images keep sharing, unique names and existing aliases retained. Export-local only;
source bytes/names,890 exact image dedup, factors/UV/offsets/24MiB budget unchanged.
Four actual NOM/File/SaveOpen/async/dedup/mixed-name regression tests PASS. Consumer
name caching is an inference; actual Nomad device retest remains required. Read
docs/paint-nomad-duplicate-910.md. Native/File/Lab loader graph910; viewport/resource/
history/pool909 and protected Multi/modelling/frozen unchanged.
Next DEVICE re-export original+green copy from910; confirm distinct paint in Nomad,
then second export after further copy painting. If persistent inspect actual NOM bytes;
no invented native fields. Then resume original image projection UI plan.

.910 local validation: Node24.19.0 full **2556 PASS / 0 FAIL / 0 skipped**; four new
native paint/export/name regressions PASS. Actual Nomad retest remains pending.


## .911 — retained image Project from View; .910 user PASS — 2026-10-18

User910PASS protects independent duplicate paint in Nomad, clearing external gate.
Audit b0fd19a8: source/placement907 + retained image stack908/pool909 already present;
missing real picker/overlay/visible-front raster. Connect SAME painter/input/history.
+ Image PNG/JPEG ≤1024²/2MiB;65% screen guide, Pencil Move→Rotate→Scale tap cycle uses
original Insert437 function; fingers navigate behind image. Project captures current
camera/body frame; original UV triangles/Three rays enforce75° front and scene/self
occlusion BEFORE texels. Refuse sampled overlapping/cross-tile UVs and bounded work.
Paired908 image recipe+raster append/replace, original preflight/checkpoint/COW; Edit
image reprojects retained source FROM CURRENT VIEW, retains mask/blend/name/order.
Cancel/layer change/close/stale async preserves committed work, original Undo exits
Paint. Same .boxlab codec/source persistence/flat NOM+GLB; no new schema/history/kernel.
Screen-projector gestures are not tangent-following surface decals. Three overlays,
8MiB unique/16MiB expanded retained; complex scenes may refuse; no seam-safe/performance
claim. Read docs/paint-image-project-911.md. Seven focused actual raster/UI/persistence/
export tests PASS; Node24.19.0 full **2563 PASS / 0 FAIL / 0 skipped**. Publication
verification follows. Changed painter/core+new projector/
overlay graph911;907/908/909 storage,910 native exporter and protected modelling/Multi/
frozen retained. Device911 gate pending. Next hands-on Project feedback then surface-
relative placement; material slots/UI polish follow product direction.


## .911 publication verified — 2026-10-18

Runtime cf86b14a0585d6242a13b3007a60c7a7a9e1ac67; tested tree
1f2b43401ec2245c392afa1d86d9067a39fad79d. All14 uploaded blob hashes and created
tree match tested local source. Fetched origin/main has exactly the same tree;
remote manifest/title/data/visible label and reviewed painter911 graph verified.
Local Node24.19.0 full2563PASS/0FAIL/0skip; Node22 topology CI39102076649 /
job117600224293 SUCCESS. Pages39102076118 build117600224532 /
deploy117600313566 SUCCESS. All14 checked postdeployment live shell/version/
painter/core/projector/overlay/source/placement/image/stack/pool/native writer/
recovery files byte-match repository. Initial live manifest served910 before deploy;
final complete checked graph matches911. Protected Multi1.0/modelling/frozen unchanged.
All four continuity documents updated. This proof is documentation-only; tested
runtime bytes retained. User910PASS recorded;911 actual Safari/Pencil/image picker/
latency/front-only appearance gate remains pending. No rendered acceptance inferred
from Node canvas adapters or byte verification. Next manual Project checklist in
paint-image-project-911.md, then surface-relative placement from original Insert.


## .912 — surface-relative retained images; .911 user PASS — 2026-10-18

User911PASS protects Project from View/picker/Pencil/navigation/persistence/history.
Audit a647d08f: reuse911 projector and908/909 storage/pool; new surface frame uses actual
Insert437 alignment/cycle and907 orthographic camera capture, no new geometry kernel.
+ Image/Edit image → On surface → pick selected mesh. First tap places; then tap-cycle
Move/Rotate/Scale, Move follows original hit/triangle normal. Planar65% contact guide;
lift regenerates exact UV mesh preview, Apply commits ONE original scene checkpoint.
Preview never assigns object colourPaint or enters Save/history; original preflight,
commit/COW/export and .911 front/occlusion/UV/work limits retained. Cancel/close/layer/
body loss restores committed work and controls, guide disposed. Back to view preserves
accepted .911 path. Edit / On surface starts fresh anchor/default size; persisted source/
projection/frame/cache support re-placement, not automatic old anchor/spin/scale resume.
Same scene/project schema and flat native handoff. No continuous curved raster while
contact, seam-safe wrapping, larger budgets or iPad performance claim. Read
docs/paint-image-surface-912.md. Seven focused new checks cover actual frame/guide/
preview/UI/history/limits/curved Sphere UV+Save/native PNG. Node24.19.0 full
**2570 PASS / 0 FAIL / 0 skipped**; publication verification follows.
Changed painter/core/new helper graph912; projector911/source907/stack908/pool909/native
writer910/Insert437 and protected modelling/Multi/frozen retained. Device912 gate pending.
Next surface interaction feedback, then audit material-channel slots/placeholder plan.


## .912 publication verified — 2026-10-18

Runtime7c5002a42016621916fb7874df570a7425638421; tested tree
9264653aefcbbff915d09139391807bb393d5681. All13 uploaded blobs and created tree
match tested local source; fetched origin/main has identical tree. Main version/
shell/painter912 pin verified. Node24.19.0 local full2570PASS/0FAIL/0skip;
Node22 topology CI39103377854/job117604045125 SUCCESS. Pages39103377692 /
build117604047193/deploy117604136007 SUCCESS. All15 checked postdeployment live
shell/version/painter/core/surface/projector/overlay/source/placement/stack/pool/
native writer/Insert alignment/recovery files byte-match repository. Protected
Multi1.0/modelling/frozen unchanged. All four continuity files current; this proof
changes documentation only and retains tested runtime bytes. User911PASS protected;
912 Safari/Pencil/guide appearance/release-preview latency gate pending, no rendered
or M2 performance acceptance inferred. Next On surface manual gate, then material/
channel owner audit per product direction. Original screen Project remains available.


## .913 — repeated surface image quota repair; .912 partial PASS — 2026-10-18

User912PASS first surface image; explicit second-add failure. Actual912 UI reproduced:
16px second image works; second1024² source fails8MiB preflight (decoded source4MiB
alone). No user's file supplied; quota explanation verified, device retest required.
Same stack/resource/pool owners select bounded image-capablev3 profile24MiB unique /
48MiB expanded; raster-only8/16 retained. Three1024² sources+encoded+cache+base/flat/
masks fit≤23.75MiB resource. Original source dimensions/bytes,512² maps,three-overlay
and32MiB file limits unchanged; no downsizing, new schema/history/kernel or performance
claim. Original8MiB transport threshold retained: larger images use EXISTING scenev5
shared-byte codec; strict per-resource/ref/canonical/predecode/atomic refusal retained.
Failed pool upgrades cannot publish buffers or raise allowance. Image errors now also
appear inside active panel. Read docs/paint-image-repeat-913.md. Four new focused real
UI/same+different1024²/File/codec/native/quota checks added.908/912 image budget fixtures
updated to genuine24MiB overflow; all raster-only8/16 assertions retained. Local
Node24.19.0 full **2574 PASS / 0 FAIL / 0 skipped**; publication verification follows. Resource/pool and parent/Lab graph913; surface912/projector911/
source907/Insert437/brush/protected modelling/Multi/frozen retained. Native writer only
parent paint-export pin changed. Next DEVICE two/three adds in same session, edit second,
UndoRedo/SaveOpen; material work follows acceptance, not an inferred blanket912PASS.


## .913 publication verified — 2026-10-18

Runtimeb4849c600938243311cdcbce7828b8a64869a072; tested tree
8a859acf4b1d30b97fa3348dd9aa0efcddaa9514. All30 uploaded blob hashes/created tree
match local tested source; fetched origin/main identical. Main913 shell/manifest/
painter pin verified. Local Node24.19.0 full2574PASS/0FAIL/0skip; Node22 topology
CI39105181178/job117609354728 SUCCESS. Pages39105180906 /
build117609356689/deploy117609442669 SUCCESS. All26 postdeployment live shell/
version/resource/pool/new budget/UI/parent/Lab/recovery plus unchanged surface/
projector/source files byte-match source. Initial reads during deployment mixed912
and new files/new budget404; final fresh complete graph26/26 matches913. Protected
Multi1.0/frozen/modelling/brush/Insert algorithms retained; native writer only loader
pin changes. All four continuity files current. This proof changes docs only; tested
runtime bytes retained. User912 first-placement PASS protected; repeated-image device
exception remains pending913 retest. No actual user source file, Safari latency or
M2 RAM acceptance inferred from Node/source-byte checks. Next repeat-add SAME session,
verify first preserved, edit second/UndoRedo/SaveOpen; material work stays queued.


## .914 — Cylinder UVs for cones and upright Revolves — 2026-10-18

User requested Cylinder UVs for Revolve/cylinders/cones and completion up to the
next manual gate before pausing overnight. Audit: applied Revolve has revolveProfile
(not curveProfile), already eligible in Mesh Health; constant-radius/axis-side
checks in the original Cylinder mapper were the refusal. Extend THAT mapper only:
ordinary cylinders retain exact measured-edge strip/two-cap layout; fallback recovers
regular concentric world-Y rings and their single profile chain from Base topology.
Angular seam plus measured radius/height profile distance supports taper, pointed
ends, shoulders and return walls. Pole U splits per face wedge; n-gon caps stay planar.
No geometry, recipe, modelling/gesture/history/export kernel changes. Same native
corner payload, commit, original UV edits, Save/Open and GLB/NOM writers. UI explains
upright cylinder/cone/Revolve scope. Tilted/elliptical/twisted/branching/malformed
and procedural/modifier/imported contexts still refuse atomically. Not arbitrary-axis
projection, remeshing, auto-bake, zero-distortion or automatic packing. Closed profile
loops are unsupported. Four new tests cover native cone3–64 sides/multiple bands,
huge/tiny scale, original Revolve owner output with poles/taper/shoulders/return walls,
no geometry/metadata mutation, one Undo/Redo/idempotence, UV edits/codec/actual native
and GLB values, atomic refusal and retained original cylinder layout. Entire changed
UV/parent/Lab graph and shell/recovery keys914; other module pins retained.

Next DEVICE: Add+ Cylinder and Cone → Mesh Health → UVs → Cylinder UVs (Y), inspect
UV Editor; apply upright Revolve and repeat; Undo/Redo and Save/Open, paint/export
as desired. Also retest913 two images in SAME On surface session, first preserved,
second independent. No new PASS inferred; first912 placement remains protected.
Material-channel work stays queued behind these manual gates. User pausing overnight;
continue from repository tomorrow, no further automatic build needed tonight.

Local Node24.19.0 complete regression: **2578 PASS / 0 FAIL / 0 skipped**.
Reviewed shell changes only Mesh Health and both recovery URLs; UV child and Lab
parent chain914. Original913 painter/resource budget retained. An initial local
cache-contract run caught an overbroad shell pin replacement during preparation;
restored unrelated913 pins before FINAL full2578PASS run. No published bad graph.
Publication evidence to follow; manual device gates remain pending.


## .914 publication verified — 2026-10-18

Runtime88315294db29a9046ace8cef4896c449a31166e9; tested tree
 d5dcff41107bed86a43b34f7bf95240122cfa22e. Uploaded13 exact source blobs/tree,
fetched main and aligned local equivalent tree. LocalNode24.19.0 and hostedNode22
full2578PASS/0FAIL/0skip. TopologyCI39123430499/job117663549250 SUCCESS;
Pages39123429994/build117663550431/deploy117663655310 SUCCESS. All12 checked
live shell/manifest/UV owner/Mesh Health/Lab parents/recovery/Multi/painter/budget
files byte-match source after deployment. Initial public proxy timeouts/old913
manifest resolved on retried versioned fetch; final12/12 match914. Extra unversioned
manifest request timed out at proxy; no evidence of app regression. Protected
Multi1.0/frozen/modelling/paint kernels and unrelated913 pins retained. All four
continuity files current; proof changes docs only. No device PASS inferred.
Stop at manual gate: tomorrow914 Cylinder/Cone/upright Revolve UVs +913 repeat-image
retake; first912 image placement PASS protected. Material-channel work stays queued.


## .915 — precise paint RGB / HSB / hex; .914 user PASS — 2026-10-19

User914PASS accepts preceding Cylinder/Cone/upright Revolve UVs, UV Editor/history/
SaveOpen and repeated On surface images manual list. Protect914 UV +913 repeat-add
behaviour and earlier surface placement, masks/layers/paint/native exports. Audit
0a7ba302: production paint has only browser swatch, no numeric RGB/HSB editor.
New small paint-colour-controls binds ORIGINAL input, sRGB0–255 / HSV hue0–360,
saturation+brightness0–100%, hex optional#; shorthand only commits on change.
Hue survives grey, saturation survives black; invalid/partial/range entries never
publish and revert on commit. Same swatch input event owns stroke cancel/rollback;
no pointer/history/paint kernel or resource/codec/export change. Numeric controls
follow original mask/image disabled state. Collapsed foldout, original swatch retained.
Brush preferences are session UI only, not object/save metadata. Three focused actual
UI/pixel/history/project/native tests added; full suite/publication follows.
Only painter UI/new helper and shell/recovery keys915; core/budgets913/UV914/frozen/
Multi1.0 remain pinned. Read docs/paint-colour-controls-915.md for owner audit.
Next DEVICE setRGB/HSB/hex, paint, picker sync and grey→colour/black→colour; mask
colour controls disabled; history/image placement remains accepted. Then independent
roughness DATA-resource + explicit scene transport foundation through authoritative
owners, followed by visible controls/preview; no sRGB blends for data/normal maps,
no arbitrary native-UV material metadata or new writer. Other material slots queued.

Local Node24.19.0 full regression **2581 PASS / 0 FAIL / 0 skipped**; existing905/906
nearby14PASS and new915 focused3PASS. Original colour brush/resource/history/UV/
image/export/Multi/frozen owners unchanged. Publication verification follows.


## .915 publication verified — 19 October 2026 (Brisbane)

Runtime6c094e8448dbbc324146af621a709b5581160e06; tested tree
 e0d4f532e7c2a558d585d155ac1052769c797f95. Uploaded13 exact blobs and identical
tested tree; main fetched/local equivalent tree aligned. Node24 local + Node22
hosted full2581PASS/0FAIL/0skip. TopologyCI39167551114/job117793558051 SUCCESS;
Pages39167550557/build117793559585/deploy117793690409 SUCCESS. Final12/12 checked
live shell/manifest/painter/new colour helper/recovery/core/UV/Multi/budget/surface
files byte-match source. Initial in-flight reads served914 and helper404 with proxy
timeout; fresh postdeployment complete graph matches915. Only painter/new helper,
three shell cache keys and reviewed fixture changed; all other algorithm pins retained.
All four continuity files current, user914PASS protected. This proof is docs only;
915 device colour/picker/grey-black recovery/paint gate pending. Next independent
roughness data-resource/transport foundation per docs/paint-colour-controls-915.md;
no extra material-channel parity or iPad performance claim inferred.


## .916 — compact left Paint + Object radial UV; .915 PASS — 2026-10-19

User915PASS protects linkedRGB/HSB/hex and prior paint/UV. User explicitly requests
Paint left/tidy because bulky UI obstructs mesh, plus dedicatedUV in Object radial.
This user direction takes priority over roughness work; audit only, no roughness
resource/schema changes made. Same tool-session-ui owner special-casesuv-paint as
left8px/top12px/272px bounded scrolling dock, keeps original footer/buttons intact,
skips wide action reparenting; next tool clears width and original centred placement
returns. Shared positioner/wide-layout732 unchanged. Painter re-groups SAME controls:
colour/size/opacity/layer/Add exposed; brush/RGBHSB/layer settings/masks collapsed,
image controls staged only; sticky UndoRedoDone. No pointer/brush/resource changes.
UV outer90°/230px added preserving other Object sectors; newuvToolsBtn launches SAME
Mesh Health UV owner inuv-tools session, titleUV and diagnostic nodes hidden. Projection/
workspace/history/payload/Close owners unchanged; Refresh stays visible. Mesh Health
mode hides UVs and retains repairs. UV-only reports skip health analysis and refresh
on context/history changes. Close old mode before switching IDs; original radial/
background close adapters includeuv-tools. No second editor/kernel/history.
Two new integration checks + updated original radial/workspace harness retain semantic
checks; full suite/publication follow. All6 changed owners+shell/recovery916; unchanged
paint core/budgets913/colour915/UV mapper914/Multi/frozen/modelling/shared layouts retained.
Read docs/paint-uv-layout-916.md. Next DEVICE left dock footprint/sections, paint/mask/
image placement; ObjectUV project/editor/Back/Close and Mesh Health repair regression.
Then resume independent roughness data-resource/explicit transport foundation.

Local Node24.19.0 final full **2583 PASS / 0 FAIL / 0 skipped**. Initial full run
caught two outdated test adapters:439 expected literal fixed Mesh Health ID,731
Sweep host omitted real DOM style property. Updated fixtures to dual ID and actual
host shape; kept all semantic/read-only/Sweep assertions. Focused9PASS, final full
2583PASS; no runtime Sweep or shared positioner changes. Publication/visual proof follows.


## .916 publication verified — 19 October 2026 (Brisbane)

Runtime3295032ca2bd89cf7c4a7de3b870656d765fcd2f; tested tree
5be85556700c13b08b8294e45082406f5e2b9759. All21 uploaded blobs/tree match tested
local source; fetched main/local equivalent tree aligned. LocalNode24 + hostedNode22
full2583PASS/0FAIL/0skip. TopologyCI39173064962/job117809986464 SUCCESS;
Pages39173064486/build117809988186/deploy117810083028 SUCCESS. Live13/15 checked
files byte-match, including shell/manifest and ALL6 changed runtime owners, recovery
version/wide layout/Multi/colour/UV mapper. Two UNCHANGED files (release-bootstrap,
shared positioner732) repeatedly proxy-timed-out on HTTP recheck; repository exact
bytes/pins retained and previously verified. No claim those two were fetched916.
Cloud browser loaded visible916 shell but WebGL context creation failed in unchanged
main854/Three renderer; therefore no mesh/radial/Paint rendered acceptance claimed.
Isolated test tab closed; no screenshot of a blank mesh returned as layout proof.
Actual session/UV owner semantics and native paint/image flows remain tested by Node;
iPad left-dock/section/scroll and UV navigation manual gate remains pending916.
All four continuity files + workflow user exception updated. User915PASS protected;
this proof changes docs only. Roughness audit read-only, implementation deferred.


## .917 — roughness data / project foundation; .916 user PASS — 2026-10-19

User916PASS protects compact LEFT Paint/sections/Done, colour/image Pencil cycle,
Object radialUV projection/editor/exit and Mesh Health repair baseline. Audit current
ddf240f6: only sRGB colour resources exist; imported scalar writers already own map
export. Add separate R8roughness resource16–512 axes, linear data/UV-v0-first/binding,
owned capture/encode/decode, committed read-only sharing convention. Exact schema,
canonical original project bytes, dedup4MiB unique/8MiB expanded and predecode budget/
ref validation. Scenev6 ONLY with roughness; mandatorycolourPaintVersion delegates
original colourv1–5 envelope to unchanged owners. Without roughness exact legacyJSON/
version retained. UV envelope stays UV-only; original32MiB file + colour budgets stay.
Original scene snapshot/restore/addMesh/single+Multi Duplicate share resource, edits
replace; atomic Open corruption and render failure retain scene/resources/history.
Join refuses scalar-only paint; linked nativeUV guard retained. Shared export mesh
resolver refuses roughness-bearing OBJ/GLB/NOM (including alongside colour) instead
of silently dropping unsupported channel. No writer/provenance/geometry/brush/UI
kernel added. Six new integration tests cover data bytes, all legacy colour transports,
quotas/refs/predecode/ownership, actual history/Duplicate/File/Open/rollback and writer/
Join refusals. Full suite/publication follow. Docs: roughness-resource-917.md.
Actual resource/codec/metadata/guard + complete parent/Lab graph917; painter UI only
parent pin, retains accepted916 left dock/UV access. Multi1.0/frozen/UV914/colour915/
brush/projection/layout/modelling kernels unchanged. No roughness controls/render/
export/layers/displacement parity claim. No new device roughness test possible yet.
Next original scalarPNG + NOM/GLB material export adaptation with async capture/binding/
combined material identity tests, then visible channel/preview through original painter.
Manual nearby: existing colour paint SaveOpen/Duplicate; do not ask synthetic R8 fixtures.

Local Node24.19.0 full **2589 PASS / 0 FAIL / 0 skipped**; six new917 checks and
all existing colour/UV/left-dock/paint/image/native regressions pass. Reviewed complete
parent/Lab cache graph, source stamps retained, protected Multi/frozen unchanged.
Publication evidence follows; no new roughness device UI or render claim.


### Build .917 publication verification

Runtime commit `30f39970f808a022af054f0e4505d20eaef39772`, tested tree `0b4dc5441f3399232a36cdddfb1e458567eb641c`, is published. Hosted Node 22 regression run 39194785838 (job 117875081484) passed all 2,589 tests, with zero failures or skips. Pages run 39194785560 completed successfully (deploy job 117875216536). All 25 checked live runtime, Lab, release and protected Multi files matched repository bytes. Protected .916 user PASS remains in force; no rendered roughness UI acceptance is claimed.

Hands-on .917 checks: paint a distinctive mark, Save .boxlab and reopen; duplicate a painted object, paint the copy, and Undo/Redo while confirming the original remains unchanged. Roughness has no controls yet; its resource/project/history foundation is covered by automated tests. Next narrow work remains scalar PNG and existing export-owner adaptation before visible roughness painting.


## .918 — roughness export through existing writers; .917 user PASS — 19 October 2026

User917PASS protects existing colour Save/Open, painted Duplicate isolation and
Undo/Redo. Audit main0f040ed2/.917: scalarPNG/native material slots/GLB material patch
already exist. Extend original paint-export capture with strict owned R8 copies
before await, existing native Base UV key/digest for both channels, and scalarPNG G
encoding (no gamma/flip/resample/factor bake). Original NOM roughness slot/factor1,
UV/polygon/container/name/dedup/24MiB budget retained. GLB G roughnessFactor1 and
metallicFactor0; image identity separate from combined colour+roughness material
identity so shared colour cannot merge distinct roughness maps. Scalar-only and
colour+scalar supported; unprepared sync native/OBJ/Join still refuse. No project
schema/history/brush/UI/kernel/provenance changes. Five actual writer/File/PNG/async/
binding/refusal/source-immutability regressions added; old917 async refusal updated
to stale-binding validation, other guards retained. Changed owners and recursive
parent/Lab cache graph918; protected Multi1.0/frozen/modelling and accepted Paint UI
retained. Read docs/roughness-export-918.md. Full validation/publication follow.
No roughness controls/preview yet; next original painter scalar channel integration.
Manual nearby: export differently painted original/copy to NOMAD and GLB, confirm
independent colour/UV placement; paint Save/Open/history remains protected917PASS.


User reminder — 19 October 2026: every build completion must explicitly state
whether there is something to test, with build/readiness and quick hands-on checks,
or clearly state no new hands-on test is needed. Reaffirmed in AI_WORKFLOW.md.


.918 final local validation: Node24.19.0 full **2,594 PASS / 0 FAIL / 0 skipped**.
Five new export integrations and all existing paint/image/UV/modelling checks pass.
Initial cache preparation accidentally repinned unchanged917 shell owners; regression
checks caught this, unrelated pins were restored, reviewed contract passed, and the
final complete suite above ran against corrected source. No bad graph published.
Multi1.0 and frozen betas unchanged. Publication verification follows.


## .918 publication verified — 19 October 2026 (Brisbane)

Runtime commit `57a53f93ffb8c9a194bb1baaccbb738ab0d8b924`, tree
`c15f998e6ecaa416e159bca959312370e419b048`, is published. Hosted topology
regression run `39232675588`, job `117994153957`, completed successfully;
Pages run `39232675125` completed successfully. The build's recorded local full
suite is 2,594 PASS / 0 FAIL / 0 skipped; this continuation verified hosted success,
without rerunning the local suite. All 19 checked live files byte-match main:
shell/manifest, every changed runtime and Lab file, and protected Multi1.0.
No runtime changes in this continuation and no .918 device PASS inferred.

The app is ready for testing — build .918. Export differently colour-painted
original/copy to NOMAD and GLB; check independent colour and UV placement. Repaint
the copy and repeat NOMAD export to confirm the original remains unchanged.
Roughness fixtures are automated; there are no roughness controls to test yet.
Next narrow build: visible roughness channel/preview through existing compact Paint,
raster/input/history owners, preserving scalar data semantics and existing exports.


## .919 — Roughness Pencil painting and grayscale inspection — 19 October 2026

User .918 PASS protects independent original/copy colour and UV placement in NOMAD
and GLB, including repaint/re-export isolation. Audit c005f107: .917 resource/project/
history and .918 original writers exist; no scalar channel in the painter. Extend
original viewport-paint-core and compact left UI only. Channel Colour/Roughness,
0–255 value slider, same size/hardness/opacity/pressure and BoxLab/Klecks samplers.
Opaque raster's raw-byte interpolation carries equal RGB values; publish owned R8
through original roughness resource/pool and scene checkpoint. White default =255;
0 smooth /255 rough. No gamma conversion or colour blend modes in scalar math.
Grayscale inspection is temporary and labelled; Done returns existing colour/Studio
appearance. No lit material roughness preview yet. New maps512²; valid other sizes
remain savable/exportable but painting refuses without resampling. Roughness channel
has no layers/masks/image operations; original colour controls disabled, restored
on Colour. Channel change cancels live contact/placement, never adds history.

Scalar identity joins existing async/current-state guards. Invalid/stale binding,
quota/checkpoint failure rolls back preview and leaves scene/shared resources intact.
Original single/Multi Duplicate, history, scenev6 Save/Open and NOM/GLB writers remain
owners. Only two painter modules and their shell pins change; new child references
use existing918 resource/pool pins. Multi1.0/frozen/modelling/render/export kernels,
Lab and brush sources unchanged. Six focused integration checks cover actual UI,
bytes/cancel/coverage, history/project, actual single+Multi Duplicate and GLB/native
PNG, quotas/rollback and stale/non512 refusals. Full validation/publication below.

Next DEVICE: Paint → Channel Roughness, paint value0 then255 elsewhere; inspect gray
map. Colour returns original paint; reselect Roughness to inspect retained map.
Done/Undo/Redo, Save/Open then Roughness; duplicate/repaint and export NOMAD to check
smooth/rough regions under lighting. No rendered/iPad performance acceptance inferred
from Node adapters. Next build: lit roughness preview through existing material/
surface lifetime owner, retaining accepted colour appearance where no scalar exists.

.919 final local validation: Node24.19.0 full **2,600 PASS / 0 FAIL / 0 skipped**.
Six new scalar integration checks pass; reviewed release contract5PASS and original
colour/mask checks retained. No runtime tests skipped, no protected/frozen changes.
Publication verification follows; actual iPad/grayscale/native-lighting gate pending.


## .919 publication verified — 19 October 2026 (Brisbane)

Runtime `76e48e3b4ee5dc73018e566a5f8a4b323ca3bac9`, tested tree
`e58d35ee563881ae74fefbb03c3cfbfe62f567b2`, is published. Connected Git Data
created the identical local tested tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39242723896` / job `118027165309` both pass
2,600 tests, zero failures/skips; hosted complete logs verified counts. Pages
`39242722754`, deploy job `118027373427`, completed all deployment steps successfully.
Ten fresh live files byte-match tested source: shell/version, both changed painter
owners, both recovery scripts, paint target, roughness resource/pool and Multi1.0.
Initial predeployment requests served918; final complete graph matches919.
Shell push lacked credentials; connected Git Data publication used expected-parent,
non-forced ref update. No protected/frozen/modelling/export/render changes.

All four continuity files are current; this proof changes docs only. User918PASS
protected. .919 iPad Pencil/grayscale/navigation/native-lighting acceptance pending;
no actual rendered proof inferred from Node adapters. Ready for hands-on checks in
this build's entry. Next lit material preview through existing surface/lifetime owner.


## .920 — lit roughness material preview — 19 October 2026

User .919 PASS protects Roughness0/255 Pencil painting, Channel/grayscale retention,
Undo/Redo, Save/Open and native smooth/rough map handoff. Audit fb7f928a: original
paint-target surface is unlit Basic, render-modes owns existing Studio/base lighting.
Extend SAME paint surface/lifetime; no new mesh, raycast, shader, light or history owner.
Paint Preview select offers Channel(default, preserving919) / Lit material. Existing
UI/input owner cancels active contact/placement on toggle; no scene/history metadata.
Live Standard material receives current flattened colour(sRGB) and roughness(linear
NoColorSpace/G), factor1/metalness0/white colour. Working roughness reads raw equal-RGB
bytes from original opaque raster; no gamma/factor bake, resampling or source writes.
Dirty updates coalesce with original frame tick; textures/materials reused until dispose.

Committed valid roughness displays lit after Done/rebuild in original Studio/Solid/
UV Image modes, active and inactive/locked objects. Scalar-only uses neutral white;
colour-only remains original unlit appearance unless explicit Paint Lit preview.
Both channel identities/UV binding checked after await; stale scalar is not sampled,
valid colour can retain Basic fallback. Malformed scalar/unsupported owners safely
fall back to original body; stale colour or all invalid channels dispose preview.
Existing diagnostic modes clear through same lifetime owner. All surface textures
are privately owned; dispose once on body/mode/session loss; original body restored.
Non-square16–512 committed data maps display without resampling (editing512² rule
retained). Auxiliary lit textures up to two512²RGBA buffers per surface, plus existing
channel surface and GPU copies; not a measured device-performance/memory claim.

Six focused integration checks cover exact data/sRGB/UV/material settings and lifetime,
scalar-only/colour-only/stale fallback, actual UI toggle/cancel/dirty coalescing, live
colour+scalar isolation/checkpoint rollback/body disposal, async/project/history and
actual render owner active/inactive/mode behavior. Node uses real Three materials,
geometry and pixels; no WebGL render, highlights, iPad latency or Nomad parity proof.
Same source resources/projectv6/brushes/export algorithms retained. Four changed
runtime owners plus recursive export/Lab cache graph; Multi1.0/frozen unchanged.
Read docs/roughness-preview-920.md. Full regression/publication evidence below.

Next DEVICE: Roughness → Preview Lit material; paint0 then255, orbit in Studio to
compare highlights. Channel returns retained grayscale, Lit returns colour/material.
Done keeps lit roughness; Save/Open and select a different object retain appearance.
Undo/Redo and duplicate isolation remain protected. Existing no-roughness colour
objects retain original look. Then audit remaining material slots, starting Metalness
resource/export/preview owners; keep stages narrow and data-aware, no parity claims.

.920 FINAL local validation: Node24.19.0 full **2,606 PASS / 0 FAIL / 0 skipped**.
Six new focused checks and all legacy semantics pass. Reviewed shell/cache-contract
5PASS; other export/Lab parent edits verified pin-only; protected Multi1.0/frozen intact.
Initial preparation run caught an incorrect temporary write target that replaced the
local HTML shell with cache-fixture JSON. Restored shell from main, applied only reviewed
pins/markers, corrected fixture destination, then reran the entire final suite above.
No malformed shell published and no behavior checks relaxed. Publication proof follows.


## .920 publication verified — 19 October 2026 (Brisbane)

Runtime `b3aae5266bcff0f206500d2e5fea278825e5cd41`, tested tree
`22b91cd354bb03f4acd9540adf4952b04a69b546`, is published. Connected Git Data
created an identical local tested tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39245427937` / job `118036074696` both pass
2,606 tests, zero failures/skips (hosted complete logs verified). Pages run
`39245427818` deploy job `118036289017` completed all deployment steps successfully.
All18 fresh live shell/version, four runtime owners, complete changed export/Lab
parent graph, recovery, protected Multi1.0, retained roughness resource/pool and
project codec files byte-match tested source. Initial predeployment reads served919;
final complete checked graph matches920. No frozen/modelling/brush/project/export
algorithm changes. Source scalar bytes/data semantics retained; no custom lights.

All four continuity documents updated; this proof is docs-only. User919PASS protected;
920 actual iPad highlights/material appearance/latency acceptance remains pending,
not established by Node Three material/texture tests. Ready for hands-on Paint
Roughness → Preview Lit material0/255/orbit, Channel return, Done/SaveOpen/selection
and existing no-roughness colour appearance. Next remaining material-slot audit
(Metalness candidate) follows device feedback, through original owners.


## .921 — metalness data/project foundation via shared scalar owners — 19 October 2026

User920PASS protects Lit/Channel roughness preview, highlights, Done/SaveOpen/selection
appearance and original colour-only look. Audit main05ddf085: imported NOM/GLB metalness
slots exist; editable resource/scene transport do not. Extract the accepted917 R8
validation/canonical byte codec and dedup/quota/predecode pool into shared scalar
owners; existing roughness API/descriptor/byte serialization/errors and4MiB unique /
8MiB expanded budgets retained. Metalness uses separate strict linear R8 descriptor,
16–512 axes, UV-v0-first, owned captures, read-only committed sharing. No RGB blending,
new brush/kernel/history/writer or metalness UI/preview delivered.

Explicit scenev7 ONLY when metalness exists: mandatorypaintProjectVersion1–6 delegates
existing envelopes, roughnessv6 retainscolourPaintVersion1–5. Without metalness original
legacy JSON/version retained exactly. Independent metalness pool4MiB unique/8MiB
expanded, original32MiB file and colour/roughness budgets retained. Complete resource/
ref/schema/size preflight before mesh creation; corruption/quota/unsupported owners
refuse atomically. Native UV envelope remains UV-only. Original history snapshots/
restore/addMesh/single+Multi Duplicate carry metalness by read-only reference; edits
replace. Original File Save/Open and render-failure scene/history rollback retained.
Join/linked operations and raw/async OBJ/GLB/NOM exports refuse metalness-bearing
objects, even alongside accepted colour/roughness, so pending channels cannot vanish.
No imported metalness export behavior changed; native paint export adaptation next.

Six new integrations cover codec ownership/channel separation, all six legacy formats/
exact removal/dedup, schemas/refs/quotas/owner guards, actual history+single/Multi
Duplicate, actual File Save/Open/corrupt/render rollback, all writer/Join refusals.
Existing917–920 scalar/paint/preview nearby23PASS. Complete reviewed resource/codec/
metadata/export/parent/Lab graph921; UI/render/brush algorithms unchanged. Multi1.0,
frozen betas and modelling kernels untouched. Read docs/metalness-resource-921.md.
Full regression/publication evidence below. No new metalness device feature yet.

No new hands-on test needed for921; user920PASS is protected. New foundation fixtures
are automated, never a synthetic iPad task. Next narrow build: captured metalness
through existing scalar PNG/NOM/GLB material owners, including combined colour+
roughness+metalness identities/async capture and data semantics. Then visible Pencil
channel and lit preview through existing compact Paint/material owners.

.921 final local validation: Node24.19.0 full **2,612 PASS / 0 FAIL / 0 skipped**.
Six new integrations + existing917–920 nearby23PASS; release contract5PASS.
All other changed JS parents verified pin-only; protected Multi1.0/frozen/modelling
and existing paint/preview/export algorithms retained. No behavior checks relaxed.
No new hands-on gate; user920PASS protected. Publication verification follows.


## .921 publication verified — 19 October 2026 (Brisbane)

Runtime `21ea62ebddef2a404b14e029fdb0744a1bd0862f`, tested tree
`f0d7a3f92abab520806a4ed5874f99f3b7cb25f2`, is published. Connected Git Data
created an identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39248074915` / job `118044791985` both pass
2,612 tests with zero failures/skips; hosted full logs verified. Pages run
`39248074813`, deploy job `118045052264`, completed all steps successfully.
All30 checked live files byte-match tested source: shell/version, every changed
runtime/parent/Lab file, four new scalar modules, recovery, protected Multi1.0 and
retained colour pool. Initial in-flight reads served920/new modules404; final whole
checked graph matches921. No protected/frozen/modelling/brush/preview algorithm changes.

All four continuity files current; this proof changes docs only. User920PASS protects
existing lit roughness/Channel/Done/SaveOpen/selection/colour appearance. Build921 is
complete; no new hands-on test needed because metalness controls/preview/export are
not exposed yet. Fixture transport/history/atomic Open and refusal checks are automated.
Next narrow build: captured metalness through original scalar PNG/NOM/GLB writers,
then original Paint channel/material preview. No metalness visual acceptance claimed.


## .922 — metalness export through original NOM/GLB owners — 20 October 2026

Continue authorized921 foundation; no new device PASS inferred. User920PASS remains
protected for paint/lit roughness/Channel/history/SaveOpen/selection/colour-only look.
Audit main2c438348: existing native metalness slot, scalar PNG, paint capture and GLB
material patch own required transport. Extend these owners; no new writer, schema,
metadata provenance, history, modelling/paint kernel or UI controls.

Capture owned metalness alongside colour/roughness/geometry/native UVs BEFORE await;
original Base target digest validates all channels. Native metalness uses original
lossless grayscalePNG + metalness slot/factor1; roughness factor1/default1 retained.
Original names/content dedup/polygon UV pool/container/24MiB aggregate budget remain.
GLB uses packed RGB data PNG G=roughness(or255), B=metalness, R=255, factors1; only
roughness retains accepted grayscale PNG/metallicFactor0. Same PNG RGB/filter/CRC/zlib
packager gets explicit no-colour-metadata path, not a canvas/gamma/resample encoder.
Packed pair cache plus original colour image cache and full material key distinguish
all colour/roughness/metalness combinations; shared exact resource pairs reuse images.
Absent colour remains white. Independent non-square maps remain exact in NOM; GLB
requires matching roughness/metalness dimensions and refuses rather than resizing.
New data rows remain UV-v0-first, no factor baking or sRGB metadata on scalar data.

Original File actions report metalness counts. Raw OBJ/unprepared sync native/Join
still refuse metalness; invalid descriptor/stale binding/evaluated/imported/linked
owners refuse. Async download captures never assign maps to source scene or native
UV metadata. Resource/projectv7/history/brush/UI/lit preview algorithms unchanged.
Complete changed PNG/export/parent/Lab graph922 only; Multi1.0/frozen unchanged.
Old921 async blanket-refusal assertions now check stale binding; raw guards retained.

Eight new integration tests cover actual NOM/GLB export+loader and File actions,
independent PNG CRC/zlib/channel bytes, combinations/dedup, metal-only defaults,
unequal-size refusal/NOM retention, async snapshots, invalid owners, original native
24MiB preflight AND final writer cap, PNG data-vs-colour metadata/ownership.
Native writer budget test imports its ACTUAL versioned paint-export dependency:
prepared WeakMaps are module-local, so an unversioned Node helper cannot prepare
another versioned module's writer. First fixture attempt hit the intended raw guard;
corrected test wiring, not the runtime guard. Read docs/metalness-export-922.md.
Full regression/publication evidence below; no renderer/Nomad appearance acceptance
inferred from Node adapters. No new hands-on test needed: metalness has no controls
yet. Next original Pencil scalar channel + material preview integration in narrow
stages, preserving existing colour/roughness and independent resource semantics.

.922 final local validation: Node24.19.0 full **2,620 PASS / 0 FAIL / 0 skipped**.
Eight new integrations and all existing paint/preview/modelling/import/export checks
pass; reviewed release contract5PASS. PNG data metadata path preserves old colour/
scalar semantics; source resource/project/history/UI algorithms and Multi/frozen
unchanged. No assertions excluded; old async refusal upgraded to binding contract.
No new hands-on gate; publishing verification follows.


## .922 publication verified — 20 October 2026 (Brisbane)

Runtime `e550ae539d3a59789de95c6b9d18b800f4a7eb27`, tested tree
`28860d5de9252cf60d31a11636082113f678bc95`, is published. Connected Git Data
created an identical tested local tree; fetched origin/main matched exactly.
Local Node24 and hosted regression `39335979744` / job `118345461602` both pass
2,620 tests, zero failures/skips; complete hosted logs verified counts. Pages
`39335978411`, deploy job `118345671446`, completed all steps successfully.
All18 checked fresh live files byte-match source: shell/version, all five changed
export/PNG runtime owners and Lab parents, recovery, protected Multi1.0 and retained
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

## .936 — Optional 1024 colour textures; .935 PASS — 21 October 2026 (Brisbane)

User .935 PASS is protected. User priority moves resolution ahead of Merge/Flatten.
Audit: colour resource already permits1024, but painter/stack/projection/display/export
and Blur domain were512. Extend those SAME owners: Paint → Texture resolution →
Increase to1024×1024, one original checkpoint, explicit per-object opt-in. Exact2×
nearest texel replication preserves old base/overlays/masks/blends/image raster and
source; fresh paint/new projections use1,048,576 texels. Wrapped source is NOT silently
reprojected from an insufficient flat recipe. Original Undo restores512; redo/reopen
keeps1024. Sources1024²/2MiB and tips256² unchanged; scalars remain independently512.
Original composite/scene codec/immutable sharing/native+GLB writers retained.

Explicit layered1024v2/v3 dimensions select32/64MiB raster or48/96MiB image pool
profiles (unique/expanded); original opaquev1 and5128/16 or24/48 unchanged. Enlargement
uses existingv2 even with no overlays, no new schema. Existing content dedup/pooledv5,
strict refs/canonical bytes/predecode/atomic errors and32MiB file/24MiB native cap
retained. Unsupported dimensions/checkpoint/stale/budget/staged-placement refuse
without changed resources/history. Larger full image scenes can still hit file limits.

Original raster/filter size ceiling1024 only; accepted32-pass Blur math unchanged.
At1024 Blur has two32MiB Float64 buffers (64MiB filtering peak;32MiB target retained)
plus ownership/stroke/resource/GPU copies; no device RAM/FPS/latency claim. Original
2M UV scan/2M seam-walk/30M projection ray-work guards retained, so complex high-res
layouts can refuse atomically. Brush Size remains texel-based. Shared Lab remains512.
All changed reverse-loader parents repinned936; main930/cage/Multi1.0/frozen unchanged.
Read docs/paint-resolution-936.md for test scope and memory/transport distinctions.
Validation/publication follow; .936 actual iPad feel remains pending.

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

## .937 — Actual1024 fresh Paint default; .936 pixelation feedback — 22 October 2026

User: images still pixelated, then clarified fresh cube paint after refresh too.
No .936 PASS inferred. Audit f1f13afc: fresh production painter still defaulted512;
optional .936 Increase sat in collapsed details. Refresh does not select that control.
Correct production makeController to explicitly request newColourSize1024 from SAME
painter. Only no-colour-resource objects use default. Their temporary1024 base/stack
remains uncommitted until first real paint/image edit; no blank resource or extra
history on Open/Close. First edit uses accepted layeredv2/v3 and high-res pool profile.
Existing512/1024 saved resources override default and retain exact bytes/history.
Original reusable API512/Lab defaults remain; all production UI paths request1024.

Move original resolution nodes into visible row near Channel/Tool, explicit Colour
texture label; Increase exposed for512, hidden at1024, scalar channel guard retained.
Open status reports actual size. No new listeners/history/kernel or automatic raster
upscale/reprojection, source limits/UV/render/native-export/resource-budget/schema change. Original
nearest image sample/linear texture display unchanged; no claim all zoomed pixelation
is solved or that user was definitely painting512. 1024 is whole atlas, shared by faces.
Two painter owners + existing File owner and parent shell/recovery pins937 only; main/Multi/frozen intact.

Three new actual UI tests verify fresh1024 before paint, no Open history/payload,
first-edit resource/UndoRedo/new-controller reopening; existing512 visible opt-in with
one checkpoint; first image projection→SaveOpen→exact native1024 PNG and512 scalar
independence. Original .936 enlargement test now explicitly creates a legacy512 map.
Existing alpha test samples actual paint.width; scalar UI tests compare every displayed
texel to the exact512 source at current display size. Their old fixed512 display indices
were incompatible with the newly requested production default; no raw-data assertions
removed or weakened. Read docs/paint-default-resolution-937.md. Validation follows.

DEVICE: new cube → Paint; visible Colour texture1024×1024 BEFORE first mark. Fresh
fine strokes/new image; orbit/zoom and judge detail/latency. UndoRedo keeps Paint;
SaveOpen retains1024; existing512 project offers Increase and remains512 until tapped.
Actual iPad sharpness gate remains pending. Next device evidence before higher-map/
source/UV-density work; Merge/Flatten and other queued requests preserved.

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

## Current direction — .938, 22 October 2026

.937 accepted Perfect PASS: protect fresh1024/default/readout/detail and saved512
optional Increase. .938 implements queued Merge to Base/Flatten colour through
original compositor/history owners, retaining resolution/budgets/three overlays.
Merge includes selected and all below; hidden merged layers removed; Undo restores.
Local2697PASS; device .938 merge/flatten/history/SaveOpen gate pending. Follow that
feedback before next narrow audited Smudge/AO/seam authoring step. Alpha929 and
reflection preview gates remain independent; no 2K/4K or larger source promise.

## .938 publication verified — 22 October 2026

Runtime f441e92b0950f0e7b2ab1b46a8b67d9940a12396, tree
239a55d76de49ddf840fa19abcdbfbb351b262d8, matches tested local tree.
Hosted regression39699769504/job119565892975 succeeded; full job logs confirm
2697PASS/0FAIL/0skip, matching complete local run. Pages39699769015 build119565895457/
deploy119566078569 succeeded. All25 checked live shell/version, changed runtime/Lab,
recovery and retained core/main/Multi files byte-match tested source. Reviewed pins938;
protected main/cage/Multi/frozen unchanged. This proof updates documentation only.
User .937 PASS protected; .938 device merge/flatten/UndoRedo/SaveOpen gate pending.

## Current direction — .939, 22 October 2026

User .938 Awesome PASS protects Merge/Flatten/free slots/history/SaveOpen. Explicit
new priority delivered: UV-ready initial/reset cube and optionalUV Add for existing
supported Cube/Plane/Cylinder/Cone/Sphere projection owners. Checkbox defaults ON;
plain creation remains available. Torus/Text no automatic unwrap; special procedural
launchers and saved objects unchanged. No geometry/projector duplication or larger
paint budgets. Device .939 startup/reset/Add/UndoRedo/SaveOpen gate next. Follow
feedback before queued Smudge/AO/edge-seam authoring. Torus/general unwrap candidate
future bounded work; native topology/modifier/linked restrictions remain. Reflection
and929 alpha gates independent. Publication/automated results follow.

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

## Current direction — .940, 22 October 2026

User .939 PASS protects UV-ready startup/reset, Add checkbox/plain path, paint/history/
persistence. .940 closes remaining supported primitive Torus gap through original
native UV owner: regular round worldY angular grid, two seams/one rectangle, Add
UV checkbox defaultON, explicit Torus UVs (Y) for older plain tori. Text/procedural
objects and existing projects not auto-unwrapped. No geometry or parallel kernel.
Device .940 Add/Paint/UV/UndoRedo/SaveOpen next; follow feedback then bounded Smudge/
AO/edge-seam authoring audits. General/Text unwrap future, alpha929 and reflection
gates independent. Existing resolution/budgets/native restrictions retained.

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

## Current direction — .941, 22 October 2026

User940PASS protected. First bounded Smudge uses original paint owners, selected
layer/channel only, tip-local premultiplied pickup, existing Size/Opacity/alpha and
history/persistence. Face-confined reads/writes; face changes/misses restart pickup.
No cross-face carry claim, original connected Blur unchanged.8M pickup-visit contact
cap cancels atomically; original resource/File/native limits retained. Device941
Smudge feel next, then refine from evidence before cross-face/AO/Edge seam work.
Alpha929/reflection-preview gates remain independent. See docs/paint-smudge-941.md.

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

## Current direction — .942, 22 October 2026

User941PASS protected. Original manifold seam graph now permits Smudge mean colour
pickup across connected picked faces without atlas contamination. Same-face spatial
pickup941 unchanged; detailed texture patch orientation is not transported at seam.
Existing Size/Opacity/alpha/raw channels/history/persistence retained. Misses/unknown/
nonmanifold/vertex-only restart; strict captured pairs and existing work caps. Device
942 seam/Opacity/overlay/history/SaveOpen feedback next, then narrow refinements or
AO/Edge seam owner audits. Alpha929/reflection gates independent; no new budgets.
See docs/paint-smudge-seams-942.md. Full local2802PASS/0FAIL/0skip (97.20s); publication evidence follows.

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

## .944 — editable AO Multiply layer preview — 22 October 2026 (Brisbane)

Base main0a4e094 /943 audited. No existing AO UI/layer transaction found. New small
paint-ao-layer helper calls the original943 baker at64²/16 rays and original UV
filter-domain raster at64 and current512/1024. Same-face, coverage-aware bilinear
transfer renormalizes only matching source-face samples; atlas neighbours never
contribute. Uncovered/unsampled thin faces stay transparent. Radius remains a
fraction of LOCAL object diagonal; no world-transform/scene-neighbour/ground/SSAO.
Colour Multiply uses existing byte-space compositor, not a physically linear PBR AO
slot or high-resolution ray bake. Current colour/scalar/source/tip budgets unchanged.

Original painter owns transient AO preview, pool validation, one Apply checkpoint,
COW resource assignment and selection. New layer is ordinary editable raster named
AO n, Multiply, user Strength as Layer opacity; existing visibility/mask/eraser/paint/
Delete/Merge/Flatten/history/SaveOpen and flattened native/GLB writers remain owners.
No saved AO descriptor/recipe/schema or new writer/history/gesture/modelling kernel.
Preview never assigns object colourPaint or enters Save/history; Cancel/Done/history/
body loss discards it. Apply rechecks live positions/UV binding/current target and
pool before checkpoint; failures keep committed resources/history unchanged.

Compact LEFT Paint → collapsed Ambient occlusion: Reach5–100% (default25%),
Strength0–100% (default65%), Bake AO preview, Apply AO layer / Cancel AO. Preview
blocks paint and layer/channel edits; fingers still navigate. Apply selects AO layer;
existing layer opacity/visibility can change strength afterward. Existing Undo/Redo
retains Paint with ORIGINAL selection rules (Redo may keep Base selected; select AO).
Image placement must Apply/Cancel first; image sources/scalars stay independent.
Three-overlay cap remains; merge/delete to free a slot. Bake defaults64/16 fixed;
8M ray-work and2M UV-scan limits refuse complex/overlapping/out-of-tile layouts before
resource/history changes. Final transfer≤4 texel samples per512²/1024² destination.
No interactive cancellation during the bounded synchronous calculation or iPad
latency/RAM/appearance claim. Small low-poly UV meshes first; convex cube may show
little/no darkening. Concave/recessed geometry is the meaningful appearance test.

Important failed approach: manager.objects/target getters call saveActive and CLONE
the active mesh. Reference identity cannot establish unchanged AO source. Original
UV key plus exact serialized live vertex content guard the candidate; do not add an
identity-only check or mutate the manager to make such a check pass. Temporary debug
reason text removed. No accepted manager/mesh/export algorithm changed.

Six new integrations pass:512/1024 domain-safe output/source preservation; transient
preview/Cancel/Apply/opacity/visibility/scalar/peer isolation; actual1024 UI+original
Paint history+SaveOpen+exact NOM/GLB PNG; checkpoint/pool/deformed-source/close refusal;
scalar/mask/full stack/complexity guards; retained images/staged mutual exclusion and
Done discarding unapplied AO. Original nearby943/938/942 tests16PASS; release5PASS.
Read docs/paint-ao-layer-944.md. Full local2802PASS/0FAIL/0skip (97.20s); publication evidence follows. User942PASS remains
protected; /nextbuild is not AO device acceptance. Alpha929/reflection gates separate.

DEVICE944: simple recessed UV mesh → Paint → Ambient occlusion → Bake; orbit,
Cancel retains previous paint. Bake→Apply creates AO layer, adjust Layer opacity/
Visible; UndoRedo keeps Paint, select AO if needed; SaveOpen/native export keeps shade.
Next: actual iPad quality/latency feedback, then narrowly refine AO quality/coverage/
work budget as evidence warrants. No automatic further AO feature before device gate.

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

## .945 — higher-resolution AO and cancellable quality jobs — 23 October 2026 (Brisbane)

User944PASS with explicit poor/patchy AO quality exception. Protect the existing
preview/Apply/Cancel/layer/history/persistence workflow; AO appearance is NOT accepted.
User authorizes higher resolution /nextbuild. Audit main6ddd9d2: actual bake64²/16
rays only;1024 colour texture was just interpolated shade. Existing pathtrace-only
remote BVH is unrelated to this CPU baker; no additional kernel/library imported.

Original baker now has ONE generator tracing kernel. Legacy bakePaintAO remains
synchronous, exact64/16 outputs and8M work cap/128 maximum retained. Async high path
permits≤256²/64 rays with a separate FIXED128M conservative ray/triangle-work cap;
original2M UV scan cap/20K triangle bound retained. No unbounded caller work limit.
Chunk events every65,536 visited triangle candidates; runner checks AbortSignal and
yields to browser timers after approximately8ms accumulated work between events.
Ray preparation/UV raster remain bounded synchronous setup; no hard frame-time or
M2 latency guarantee. Trace and final face-safe transfer share same scheduler.
Cancellation drops staged data; source geometry untouched. Owned domain labels reused
for transfer instead of rasterizing low grid twice. No new triangulation/UV raster/
adjacency/ray kernel. Original hemisphere/radius/bias formulas and sampling pattern
unchanged, merely more positions/directions. No denoiser or all-patchiness-solved claim.

Paint AO Quality: High(default)256²/64 samples; Medium128²/64; Quick64²/16. High has
16× baked pixels and4× sampled directions versus944 (up to64× sampling work for the
same coverage/mesh). Geometry/occlusion can require fewer actual intersection visits;
cap refuses complicated layouts, suggest Medium/Quick or simpler mesh. Existing
colour512/1024 textures, source/tip/scalar resolutions, layer/resource/File/export
budgets and schemas unchanged. Old saved AO pixels stay as-is; hide/delete old AO
layer and rebake to compare rather than stacking two shadow layers.

Original Paint session stages async job with progress/Cancel; pending job blocks
paint/layer/channel/quality edits while fingers navigate. Cancel, Done/close/body
loss/history abort it; late results cannot publish into a new/stopped/replaced job.
Fresh mesh-position/UV/current-resource and original pool guards precede preview;
Apply remains ONE original checkpoint/COW commit to an editable Multiply layer.
State flags are transient only; no persistent AO recipe or new history owner.
Quality is session UI preference, not saved project metadata. Existing Quick remains
byte-identical. Same-face coverage transfer still excludes atlas neighbours; thinner
UV faces now get actual256-grid samples rather than borrowing another face's shade.

Six new tests cover genuine256/64 grid and finer shade levels, exact asyncQuick parity,
new thin-face coverage and isolation, progress/abort/pre-abort/invalid quality,
actual painter cancel/close/stale/retry/checkpoint/pool/work refusal, actual UI default/
Cancel while busy/Done late-result suppression/Quick comparison. Original943+944 eleven
and reviewed release five pass. No original assertion relaxed; old943 size129 and
8M refusal checks remain active. Read docs/paint-ao-quality-945.md. Full/publication
proof follows. All changed AO/painter/shell reverse loader pins945 reviewed; main/
cage/Multi1.0/frozen/modelling/UV/project/export algorithms unchanged.

DEVICE945: on SAME recessed model hide old AO, Quality Quick→Bake/inspect/Cancel;
High→Bake/inspect at same Reach/Strength, compare detail/banding and wait time. Cancel
DURING High and confirm no layer/history; rebake/Apply then Layer opacity/visibility,
Paint UndoRedo and SaveOpen/native shading. Use Medium if work guard refuses High.
Actual iPad smoother-result/latency acceptance pending; alpha929/reflection gates
independent. Next narrow improvement follows user comparison; do not guess a light
source or silently smooth unrelated UV islands to hide remaining defects.

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


## .964 — left side compact Paint settings; user direction — 25 October 2026

User requests Paint contextual popups at LEFT because top-centre settings obstruct the viewport. Keep the floating radial and existing painter/control owners from .963. Reuse shared position owner with compact layout; set Paint host 8px from left/top, width capped at320px, viewport-height scroll. Reduce gaps modestly while preserving readable labels and minimum tap heights. Other tool popups retain top-centre placement. DEVICE964: Brush/Blur left placement, spacing, radial hold/reopen, Pencil, finger navigation, UndoRedo, contextual pages and Done. Next: obtain iPad acceptance of radial + left popup before more controls; then prioritize facegroup painting.


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

## .968 — selected Proof 03 icons in Face radial — 26 October 2026

User approved in-app review after choosing all65 icons and refining Proofs02/03.
Install first Face radial only per staged audit: all23 original buttons retain exact
textContent, target selectors, event owners and angular slots (Extrude12/Bevel3).
Scoped face-radial-icons.css supplies original SVG artwork as non-interactive CSS
pseudo-elements above existing small labels; no SVG title/text contaminates routing.
Inner radius112px/76×60 targets accommodate32px icons; outer230px/86×60 retained.
No changes to geometry, gestures, history, Paint, Multi1.0, other radial modes or
.967 accepted composition rules. Complete65-icon Proof03 artwork archived in
 docs/radial-icons-proof-03.json for staged continuation. Bevel stray line removed;
Bridge restored to Proof01, Map size C. No native iPad visual acceptance inferred.
DEVICE968: Face selection → tools; inspect all inner/outer labels and artwork,
Extrude/Inset/Bevel actions and their popups; UndoRedo; finger orbit/pan/pinch;
right toolbar remains visible. Next refine iPad size/contrast then remaining modes.

## .969 — Vertex radial approved icons; .968 user PASS — 26 October 2026

User says “Great result! PASS /nextbuild” for .968. Protect accepted Face icon
artwork,32px size, small captions,60px target height and112px inner radius; retained
Face CSS bytes/cache968. Next agreed mode is Vertex, followed by Object then Edge
and Paint. All14 existing Vertex tools now use selected/refined Proof03 SVGs via
scoped vertex-radial-icons.css, same accepted layout. Join uses Join (Vertex) art,
not Object Join. Original labels/textContent, angular slots, targets, event/history/
geometry owners and disabled-state styles remain untouched. Extrude12/Bevel3 retained.
No runtime JavaScript or Multi1.0, .967 composition, Paint, Face/Edge/Object changes.
.968 runtime17b3d57d; publication docs524ff168 were audited as current main.
DEVICE969: Vertex selection → radial; inspect14 icons/title size; tap Build Edge,
Slide and Bevel and finish their original sessions; Join/Merge Center on suitable
selections; UndoRedo/navigation; switch to Face to confirm accepted icons unchanged.
Native .969 visual acceptance pending. Next Object icons after device feedback.

## .970 — Object radial approved icons; .969 user PASS — 26 October 2026

User “Great PASS /nextbuild” accepts .969 Vertex icons. Protect .968 Face and .969
Vertex artwork, label format,32px icon size and original actions. Audit current main
e1047fbf/runtime a88c5e14, shell969 and13 existing Object sectors; no parallel icon
owner found. Add scoped object-radial-icons.css with approved Proof03 SVGs for all13
original buttons. Join explicitly uses Object artwork, distinct from Vertex Join.
Same60px height/112px inner radius/230px outer radius and small captions; Object
padding3px/gap2px fits two-line Symmetry / Bisect title. Existing angular slots,
labels/textContent, target IDs, tool availability/actions/history and Multi remain.
Accepted Face/Vertex CSS bytes and pins retained; gizmo JS, composition stylesheet,
Paint, geometry and frozen betas unchanged. Object Multi and gizmo shortcuts remain
original owners. No whole-app reskin or new modelling functionality.
DEVICE970: Object radial inspect inner/outer icons and longer labels; Duplicate
and UndoRedo; Array or Solidify opens original settings; UV/Mesh Health panels;
return to Face/Vertex and verify accepted appearance/navigation/right toolbar.
Next Edge icons, then Paint, after device feedback; .970 not yet device accepted.

## .971 — native-UV Array compatibility; right UI recurrence — 26 October 2026

User .970 reports ordinary Array “linked duplicate could not be created” and Live
Array “requires an independent geometry object” on default UV cube. Audit main
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
