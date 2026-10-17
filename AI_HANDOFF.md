# BoxLab AI Handoff — .896 / UV Paint Lab

## Current state — 17 October 2026

Repository CrisBezz/BoxLab, main. Release0.36.18.896 implements the isolated brush
comparison agreed in docs/uv-paint-integration-audit-2026-10-17.md. Main app adds a
File → UV Paint Lab link opening a separate tab. Lab URL:
https://crisbezz.github.io/BoxLab/evaluations/uv-paint/?build=896 .

Base before this build: audit569d4e7e09d34e043bae7cd1038b9034c31823a7;
previous runtime895=6b1e003324e5e883d8a0f4625a1e69ba0336fde7.
Local full Node24 validation2474PASS/0FAIL/0skip. Publication/Node22 CI/Pages/live
verification is recorded below when complete; do not infer it from local results.
User .894 PASS remains protected; .895 density gate remains pending. TexturePaint
feedback “brush needs work but promising” is qualitative, not blanket trial acceptance.
No .896 device PASS is inferred. User authorizes ongoing pushing/publishing.

Read AI_WORKFLOW.md completely, this handoff completely, relevant TEST_CHECKLIST,
recent DEV_HISTORY and ROADMAP before code. Repository is authoritative. This file
now consolidates current state; full older handoff is preserved at main569d4e7e:
https://github.com/CrisBezz/BoxLab/blob/569d4e7e09d34e043bae7cd1038b9034c31823a7/AI_HANDOFF.md .
All earlier chronology, failures, acceptance and publication evidence remain in
DEV_HISTORY/TEST_CHECKLIST and git. Do not treat historical pending-gate paragraphs
as overriding later explicit PASS or current state.

## .896 scope / owners

Read docs/uv-paint-lab-896.md for implementation, limits, budgets and manual gate.
Two candidates get identical screen-space inputs: BoxLab linear distance carry and
Klecks-derived Bézier curve. Both use SAME new BoxLab colour raster and settings,
separate512² maps, ONE paired6-step lab Undo/Redo. This is a curve comparison, NOT
full Klecks PenBrush integration. Upstream pinned cc24e97712c199929760250881ffe2e25233ce6d;
exact line.ts/vec2.ts and MIT notice retained, unrelated Paint.NET spline not in runtime.
No Klecks history/selection/editor/gesture/Parcel owner imported. TexturePaint original
trial at evaluations/texturepaint remains unchanged; not a production dependency.

Lab sample Sphere/Cube/Plane come from original primitive-factory and native UV projection
owners. It loads original export-as-panel892 ONLY in the separate document to call
buildUVPreviewGeometry (same authoritative triangulation/corner mapping). No main.js,
manager, scene history or modelling input loaded there. Main HTML loads no paint modules;
new File link only. Preserve existing module pins, not blanket shell-version repinning.

New raster: opaque sRGB bytes, texel-radius circle, hardness, maximum per-stroke opacity,
pressure→size, subpixel position, immediate CPU edits, at most one dirty texture mark per
frame. CPU readout is stroke/raycast/raster time, NOT GPU upload/render/FPS. Curve can
show look-ahead lag. Both output sample positions are raycast on surface; no UV spline.

Cancellation/lost capture/blur/visibility/resize/settings/candidate changes roll back both.
Palm/finger ownership is isolated to lab OrbitControls. Reset/model replacement/page exit
release resources; BFCache cancel without disposal. PNG exports selected flattened pixels
with top-down row conversion. Six paired history entries and12,000-dab/candidate cap;
raw active CPU paint-buffer peak~20MiB excluding PNG/browser/GPU/geometry allocations.

Limits are explicit: volatile sample-mesh painting only, no layers/project/native export
persistence, real user-object editing, imported texture base, seam stitching/island masks,
world-radius projection, smudge or PBR. Adjacent islands can bleed. Do not promise that
splitting paths alone makes painting seamless or that CPU timings establish M2 performance.

## Next narrow step

First obtain .896 Pencil feel comparison: Demo and manual strokes; switch candidates;
pressure/size/hardness/opacity; fingers orbit/pan/pinch; paired UndoRedo/cancel; Cube/Plane
and PNG. Ask only3–6 practical checks. No synthetic fixtures for the user.
After feedback, refine chosen stroke/footprint. Before editing actual BoxLab objects,
design explicit paint resource version/codec/immutable copy-on-write history and flattened
export. Do not divert into further UV utilities instead of proving direct3D painting.
Keep backend replaceable; small attributed reuse, no wholesale editor import.

## Protected interaction and modelling baseline

- One-finger orbit; two-finger pan; pinch; two-finger tap Undo; three-finger tap Redo;
  no-jump orbit pivot and persistent selections through navigation.
- Studio default and Focus default on launch. Original Object Browser right-side placement,
  Multi/group/object management, snapping, modeless radial/gizmo interaction.
- src/multi-object-transform.js?v=0.36.1.0 explicitly protected, byte-identical Beta6.
  Frozen Beta2–7 immutable (Beta7 runtime .807). No service worker.
- Existing Loop topology715, Extrude802, Boolean806 kernels and accepted modelling tools.
  Actual Loop completion/main owner854 repairs supersede older “never touch715” wording;
  do not undo their accepted EXACT/repeat/exit behavior.
- Face/Edge/Vertex Extrude inner12-o’clock; Bevel inner3-o’clock across component modes;
  Circle outer12-o’clock. Selection helpers stay with gestures, not modelling radial slots.
- Tool popups top-centre via original shared placement, compact/wide terminal layout;
  Object Browser remains the intentional right-side exception. Gizmo centre free transform;
  corner shortcuts retain actual Focus/history/Multi/radial owners.
- Main core-mesh publication840 fixes linked-instance drift; generic bridge edges() assignments
  must never replace core. Linked source editing, no idle source-write loop and per-instance
  placements remain protected. No duplicate modelling/triangulation/history kernels.
- Live Array source/count/END rotation+scale, single object, conversion and source edit,
  SubD re-edit857, deep independent duplicate860, internal affine-tail canonicalization861.
  External matrix/recipe validation stays exact; arbitrary non-affine result editing refuses.
- Active/inactive SubD reuse847–852, Vertex-only visual dots851, Clean845 and Soft846
  batches, original invisible picking proxies. No unmeasured generic performance claim.

## Protected UV/resource/export baseline

- Imported resources are shared READ-ONLY through history855 and ordinary Duplicate859.
  Future edits replace payload and copy only touched data/buffers. Never mutate shared images.
- .boxlab native mesh/group/settings/linked placement/Array/curve recipes; imported GLB
  resources856 and pooled v2 images858; canonical bytes/bounds/atomic Open rollback.
  Linked-rich resources and unrelated resource owners still refuse. Save/Open32MB limit;
  shared encoded GLB image pool24MiB. Scene Undo history is not persisted across sessions.
- Native UV payload uses source:'boxlab', version1, only topology signature/corner UVs;
  project resource envelopev3 is STRICTLY UV-ONLY. Adding arbitrary paint fields must fail.
  Original exporter topologySignature is authoritative; no duplicate signature algorithm.
- UV inspector862/863; native file UV pool865; Flip866; large workspace867; selection868;
  island scoped edits869/870; Pencil Move871/Scale872/Rotate873; fit874; native Planar875,
  Box876, Cylinder877;2D checker878; temporary surface checker879; image chooser880;
  active surface image881/multiple exact face materials882; material GLB handoff883;
  native colour884/normal+emissive885/packed maps886/large resource887/displacement888;
  lossless scalar PNG889/content image dedup890; image references891/892; Pack893;
  Sphere894; density895. Accepted gates through .894 protected; .895 gate not inferred.
- Original native scene history/copy-on-write/selected island membership and payload guards;
  no second pointer owner. UV topology changes hide stale channel; Undo restores it.
  Pack grid1–128islands2% margin/gaps preserves relative density; Equalize density preserves
  total area but centres fixed, so Pack afterwards. Images fixed: UV edits change sampling.
- UV surface previews use original buildUVPreviewGeometry, max20,000face corners, Base only,
  independent plain targets; overlays intentionally non-raycastable. Production painting
  needs explicit hit proxy, transform/occlusion/sidedness and lifetime, not overlay mutation.
- Read-only image previews≤8MiB encoded/1024²; active≤4materials with exact IDs/assignments.
  Whole Solid fallback for unsupported/stale/missing resources; original bitmap/disposal races.
  Preview decoding is NOT an editable full-resolution texture decoder.
- Native File NOMAD retains real NOM container/donor/material/UV offsets/independent UV pool;
  ordinary GLB/OBJ remain. Native known-stale/evaluated UVs refuse; no invented fields.
  Colour/normal/emissive raw byte copies≤24MiB aggregate; roughness=G/metalness=B bounded
  conversion≤2048² using production scalar PNG889, no factor baking/resampling. Content
  dedup890 requires exact bytes after hash bucket. Displacement only explicit supported
  Nomad binding;16-bit source/settings copied, no physical amplitude compensation promised.
- Supplied FULL MATERIAL opacity separate image is ABSENT from GLB despite extras names.
  Do not invent recovery, use filenames to guess assignments, or claim NOM import, arbitrary
  native per-face materials, general unwrap, painting persistence or evaluated UV propagation.

## Testing, cache and publication

Use reviewed tests/helpers/release-contract.mjs and runtime-asset-contract.json.
Module internal version, asset pin and shell release are distinct. Only refresh changed
owners/parent loader graph after review. .896 changes shell title/data/visible label/
version.json plus release-bootstrap/release-version loader keys896 (source unchanged),
and new lab graph896. Original exporter892/MeshHealth895 and other accepted pins retained.

Seven new lab checks and full2474PASS/0FAIL/0skip locally. Controller Canvas/WebGL/OrbitControls
adapted in Node; actual Three geometry/raycast and paint code execute. Browser render and
iPad gates remain separate. Do not claim historical2467 suite is a new result.

Before completion: update this handoff/DEV_HISTORY/TEST_CHECKLIST/ROADMAP, commit/push main,
verify remote tree against tested local tree, CI/Pages and live graph. Standing publishing
authorization applies; no repeat permission. If shell git has no credentials, connected
Git Data tools create exact blobs/tree/commit with old main parent, non-forced expected-SHA
ref update. Check every blob matches local hash (large base64 tool stdout can truncate).
Never publish a mismatched tree. Version896 navigation link loads no painting in main.

## Publication evidence

Pending at preparation; append verified commit/CI/Pages/live evidence after publication.
