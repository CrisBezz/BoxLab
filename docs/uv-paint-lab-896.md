# .896 — UV Paint Lab

Standalone comparison: `/evaluations/uv-paint/?build=896`, also linked from File in
main .896. This implements the first isolated step in the integration audit, not
production painting on user scene objects. Reset/reload clears the lab; PNG saves
only the selected flattened colour texture. No layers, .boxlab/Nomad paint persistence,
PBR, seam stitching, surface-space radius or imported texture editing is promised.

## Candidates and shared inputs

- BoxLab round: new distance-carry linear screen sampler.
- Klecks curve: adapted PointLine/BezierLine/Vec2 at upstream
  `cc24e97712c199929760250881ffe2e25233ce6d`. Exact line.ts/vec2.ts and MIT notice
  retained under vendor, runtime adaptation in klecks-curve.js. Only the curve and
  spacing components are used. This is NOT the full Klecks PenBrush or brush engine;
  no KlHistory, selection, editor gestures, BB barrel or Parcel dependency.
- Both candidates use the SAME new BoxLab round raster, colour/settings/input/camera
  and separate512² colour buffers. Every emitted SCREEN dab gets a real nearest Three
  raycast and then a UV stamp. Curve interpolation never connects UV coordinates.
  The demo resets the comparison and sends100 intervals of identical input to both.

Sphere/Cube/Plane use ORIGINAL primitive-factory and createSphereUV/createBoxUV/
createPlanarUV. The standalone page imports the original export-as-panel892 owner,
whose file UI nodes are absent, to call buildUVPreviewGeometry; same triangulation,
corner UV/signature/budget guards. It does not load main.js, manager, modelling input,
scene history, service worker or production paint resources. Export dependencies are
read-only and no native export/template request runs. Plane temporary display rotates
-X90deg to face the camera; no production geometry changes.

Pressure changes brush radius; size is TEXEL radius, not world radius. Hardness shapes
smooth falloff with a subpixel circle centre; opacity is the maximum coverage within
ONE stroke, composited against its starting pixels, so stationary/repeated dabs do not
stack opacity. Separate strokes accumulate. This intentionally does not implement flow,
smudge or the original trial's pressure→opacity behavior. Shared opaque sRGB-byte layer;
no alpha editing or colour-management conversion of imported textures.

One texture per candidate; dirty layers mark their texture only once per animation
frame, not once per dab. Three uploads a dirty texture when displayed; no partial GPU
upload optimization is claimed. CPU timings count per-candidate stroke/raycast/raster
calls only; they exclude WebGL rendering/upload/frame latency and are not FPS benchmarks.
Klecks' look-ahead can delay a short segment until later input/lift; compare the actual
Pencil feel rather than choosing by CPU time alone.

## Isolation and lifetime

Pencil/mouse Paint is captured before standalone OrbitControls; fingers retain native
OrbitControls orbit/pan/pinch. A palm introduced during paint is suppressed until its
release, even if the Pencil ends first. An existing finger-navigation contact blocks
starting Pencil paint. Orbit mode permits mouse navigation. The camera has no damping
in this comparison so paired raycasts use the same stable view during each stroke.

Both candidates share ONE paired six-step lab Undo/Redo history. A changed result in
only one candidate still checkpoints both. Cancel/lost capture/blur/hidden page/resize/
settings switch/candidate switch roll back both. No-op strokes add no history and do
not discard Redo. Demo callbacks have cancellation tokens; Reset/model changes dispose
old geometry/material/textures/document. Normal pagehide disposes; BFCache pagehide only
cancels so the retained page remains usable. Download snapshots the selected buffer into
a row-flipped top-down canvas before asynchronous PNG encoding and retains its candidate
name. PNG has no layer model.

512² RGBA8:2MiB current pixels across candidates; at most12MiB retained paired Undo/Redo
pixels combined. Active stroke adds paired before/rollback/coverage arrays: raw CPU
paint-buffer peak about20MiB, excluding JS object overhead, PNG scratch, geometry, browser
canvas storage, renderer and GPU.12,000 emitted dabs per candidate bounds a long stroke;
limit is reported on completion. No new 4K or many-layer default.

## Validation

Seven new Node tests cover exact colour/opacity/pressure/clipping/PNG rows; paired history,
no-op/cancel/limits/disposal; sampler subdivision tolerance, curve tail and dab bound;
actual BoxLab UV geometry and Three hits; actual lab controller movement/texture dirty
frames/Undo/capture rollback/candidate switch; palm/finger/demo/blur/reset/disposal;
source provenance and main isolation. Browser Canvas/WebGL/OrbitControls are adapted in
controller tests; real Three geometry/raycast and actual new raster/stroke code execute.
Node24 full suite **2474 PASS / 0 FAIL / 0 skipped**. Rendering/iPad acceptance is separate.
Original TexturePaint comparison and its five tests are unchanged. Main modelling,
UV editor, native exports/resources, all protected Multi/Loop/Extrude/Boolean code and
frozen betas are unchanged. Main release896 shell/recovery keys coherent; main's only
new capability is the File navigation link. The standalone loader graph pins896; original
read-only geometry/import modules retain their audited existing pins.

## Hands-on gate and next step

1. File → UV Paint Lab; Demo stroke, then switch BoxLab round/Klecks curve. Compare
   stroke shape and any lag; do not interpret CPU readout as total frame performance.
2. Pencil paint and change colour/size/hardness/opacity/pressure. Fingers navigate;
   Undo/Redo restores BOTH candidates and interrupted strokes do not remain.
3. Try Cube and Plane; PNG matches selected brush colour/orientation. Reset/reload is
   intentionally destructive to this temporary session; production scene is separate.

Known limits: UV-space circles distort with mapping and can bleed into neighbouring
islands; split/screen sampling alone is not seam-safe projected coverage. No textured
base, imported file support, persistent layers, appearance-preserving UV edits or generic
painting export. Next after feedback: refine chosen stroke/footprint, then design the
explicit paint resource/codec/COW/history transaction before production scene integration.
