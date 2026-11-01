Warning: truncated output (original token count: 134324)
Total output lines: 7419

# BoxLab current handoff — build .1054

`.1050` is the last intended feature build, with Roughness/Metalness previews; `.1049` never deployed separately and its fixes are included in `.1050`. `.1050` Topology had 3,093 PASS / 3 FAIL; `.1051` had 3,094 PASS / 2 FAIL; `.1052` had 3,093 PASS / 3 FAIL. Their Pages deployments succeeded. `.1053` also deployed successfully (Pages `41293655018`) and live `.1053` assets matched `main`, but Topology had 3,094 PASS / 2 FAIL: an old `.1052` expectation remained in the `.1041` preserved-release test, and shell-comparison's user-visible title/launcher still showed `.1052` while its identity was `.1053`. `.1054` updates the assertion and display strings while preserving prior comparison-log compatibility. Commit `889ab5a226245cd62a030a8baf415b881c61f716` is on `main`; Pages `41294085210` succeeded; live `version.json` reports `.1054`, and cache-busted index, shell-comparison and runtime asset manifest byte-match `main`. Hosted Topology `41294085728` is still running.

The `.1050` feature adds read-only 64×64 grayscale Roughness and Metalness previews on the existing UV Paint Layers page. Colour layer rows stay intact; these maps are object-level resources, not per-colour-layer data. Missing maps say “No map”. White Metalness affects reflections; it is not multiplied directly into Colour. The previews do not alter material values, shading, history or painting behavior. `.1051`–`.1054` are release/cache/asset-contract repairs only; preview implementation is unchanged.

Protected user PASSes: separate material channels/toolbars; `.1048` combined Colour+Metalness shadow presence (strength tuning pending); `.1047` metal-only shadow restoration; `.1046` Smudge; `.1045` combined material strokes. `.1049` shadow strength, brush-switch painting, Pencil orbit and gizmo recovery still need device acceptance. `src/multi-object-transform.js?v=0.36.1.0` remains protected and unchanged.

No local tests were run or added in these repair stages. `.1054` keeps index and nested `release-version.js` on the same cache pin, bumps `drawer-ui`/Face workflow cache closure, and updates the visible comparison checklist label and release expectation. Keep `.1050`–`.1053` comparison logs in the compatibility list. Recheck `tests/fixtures/runtime-asset-contract.json` hashes whenever these modules change.

Next: publish `.1054`, verify Pages and live assets, inspect hosted Topology, then ask the user to inspect both map previews/bright patch and retest `.1049` shadow strength, brush switching, Paint strokes, Pencil orbit and Total Gizmo rotation.
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
Audit confirms native EXPORT already e…84324 tokens truncated…source.
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
