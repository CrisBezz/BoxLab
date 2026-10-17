# BoxLab UV Paint: TexturePaint + Klecks integration audit

Date: 17 October 2026. Decision: **BoxLab-owned architecture with selective reuse;
no wholesale TexturePaint or Klecks editor integration, and no all-new research project.**

## Scope and provenance

This is an architecture/source audit, not a numbered runtime build or a claim of
production paint integration. BoxLab main audited at
`353e98810ab3ba57b900da91486ac86bc45bd053`, runtime .895. Runtime shell, release
markers, loader pins, frozen betas and protected modelling/gesture owners are unchanged.

User reports the isolated TexturePaint brush needs work but is promising. This is
qualitative feedback, not blanket acceptance of its Pencil/seam/navigation/PNG gates,
and not a .895 density PASS. User delegates the reuse-versus-new decision after audit.

Pinned inputs:

- [TexturePaint](https://github.com/ceramicSoda/TexturePaint/tree/3af8a61e9493ff960ff29ed429fc734335c80931),
  master `3af8a61e9493ff960ff29ed429fc734335c80931`, reconfirmed through GitHub.
  MIT, copyright ceramicSoda 2023. Existing evaluation retains exact original source/licence.
- [Klecks](https://github.com/bitbof/klecks/tree/cc24e97712c199929760250881ffe2e25233ce6d),
  main `cc24e97712c199929760250881ffe2e25233ce6d`, cloned separately from BoxLab.
  MIT, copyright bitbof 2026. No Klecks source or dependencies imported into BoxLab.
  Retain applicable upstream notices and review each selected dependency/asset before
  adaptation; do not assume the root licence resolves every transitive asset notice.

Klecks paths below are relative to `src/app/script/` at that exact commit. Its app
is TypeScript, uses Parcel, and includes app/build dependencies such as ag-psd,
polygon-clipping and transformation-matrix. These are not automatically requirements
for an extracted brush or compositor. No new bundler or service worker is proposed.

## Findings: TexturePaint

Its `texturePaint.js` uses ordinary Three Raycaster intersections, picks the nearest
hit's UV, and stamps a CPU RGBA buffer exposed as a DataTexture. It does not project
a brush footprint over adjacent triangles, stitch seams, protect islands, or maintain
constant world/screen brush size. The 3D part is useful instructional code, not a
separate sophisticated projection engine that BoxLab must import.

Confirmed original faults remain: flat pixel indexing wraps out-of-range X into
another row; getTexture reallocates/clears without disposal; initial history aliases
live pixels; Undo has no Redo; listeners have no teardown; update stamps per animation
frame; colour bytes do not account for current Three linear colour storage. The
existing isolated adapter fixes several faults, with tests, but is not a production
layer/history engine. Its CPU pixel loops and per-update texture upload need actual
M2 measurement before any performance claim.

**Decision:** keep the isolated trial and its tests as comparisons. Reuse relevant
bounds/colour/cancel test cases. Build production picking through BoxLab's existing
geometry and renderer; do not add a runtime dependency on TexurePaint. Attribute any
actual adapted source; using standard raycasting does not itself require its class.

## Findings: Klecks

| Component | Source evidence | Integration decision |
| --- | --- | --- |
| Pen | `klecks/brushes/pen-brush.ts`: Canvas2D dabs, size/opacity pressure, spacing, scatter, alpha tips, BezierLine interpolation | Useful reference/adaptation candidate, not a standalone plug-in. Isolate dab generation/raster work behind our interface. |
| Stroke interpolation | `bb/math/line.ts`, `bb/math/vec2.ts`: BezierLine and PointLine supply distance-spaced callbacks | Candidate for narrow extraction after dependency/provenance review. Smooth/sample in screen space before surface picking; never blindly spline UV positions. |
| Stabilizer | `klecks/events/line-smoothing.ts`: blends position/pressure; schedules catch-up with 80 ms timeout and 35 ms interval | Reference only initially. BoxLab must own scheduling, cancellation and surface revalidation. Do not copy timer callbacks onto the live viewport. |
| Eraser | `klecks/brushes/eraser-brush.ts`: Canvas compositing plus selection/history access | Later narrow adaptation. Define transparent-layer erase versus background colour explicitly. |
| Layer compositor | `klecks/canvas/layer-compositor.ts` and `get-clipping-groups.ts`: caller-supplied layer drawing, visibility/opacity/mix modes, optional scratch canvas, destroy | Strongest extraction candidate. Much smaller boundary than KlCanvas; begin with normal source-over, visibility and opacity. |
| Layer/document owner | `klecks/canvas/kl-canvas.ts`: layers plus selections, transforms, fills, language, history and other editor operations; max layers 16 | Do not import wholesale. BoxLab needs its own small paint resource, not a second document/editor model. Sixteen is Klecks' limit, not a validated BoxLab budget. |
| History | `klecks/history/kl-history.ts`, push helpers: 256 px tiles, composed state, history events, trimming and app state | Learn tiled deltas and memory accounting; retain BoxLab's single Undo/Redo owner. Upstream itself notes temporary memory overshoot during push. |
| Smudge/blend | `klecks/brushes/smudge-brush.ts`, `blend-brush.ts`: readback, masks, tile/composed history dependencies | Defer. Atlas-neighbour sampling can pull paint from unrelated surface islands; needs surface-aware treatment and measurement. |
| RGB/HSV controls | `bb/color/color.ts`, `klecks/ui/components/kl-color-slider.ts`: conversion plus UI/language/icon/input dependencies | Keep RGB/HSB semantics; build compact BoxLab controls. No need to import the full UI. HSV V corresponds to HSB brightness here. |
| Editor gestures/storage | Easel, pointer event chains, app history and project/storage owners | Do not import. Preserve existing BoxLab Pencil/finger and file owners. |

Crucial coupling: PenBrush.startLine reads `klHistory.getComposed().selection.value`;
endLine pushes changed tiles through getPushableLayerChange into KlHistory. Eraser has
the same dependencies. Blend/smudge reach further into composed layer state. Merely
calling setContext(canvasContext) is insufficient. A fake history adapter would hide
the mismatch and create two authorities; extract the desired behavior instead.

## Executed evidence and limits

- Existing BoxLab `texturepaint-evaluation.test.mjs` and
  `release-contract-current.test.mjs`: **10 PASS / 0 FAIL / 0 skipped**, Node24.19.0.
  Covers original defects, repaired trial lifecycle/pixels, actual Three ray hits,
  provenance/isolation, cache graph and protected Multi pin. This is a focused rerun,
  not a new rerun of the historical 2467-test full suite.
- Three scratch probes executed pinned upstream TypeScript after Node type stripping,
  with imports replaced by explicitly instrumented Canvas/history/math dependencies.
  Actual BezierLine + PointLine + Vec2, supplied positions x500 to x12 at y256 with
  spacing3, emitted **162 marks**, including marks through x100–400. Feeding UV jumps
  directly to a 2D spline would therefore paint across the atlas. This is expected
  2D behavior, not a Klecks bug.
- Actual LineSmoothing at0.5 changed x100 input to x50, pressure0.5 to0.75 after a
  pressure1 origin. Pointer-up cleared its pending timer in that sequence. Production
  disposal/cancel still requires an explicit lifecycle contract.
- Actual LayerCompositor issued bottom source-over/opacity1 then top multiply/opacity0.5,
  skipped a hidden layer, and accepted its explicit destroy lifecycle. This was a
  Canvas call trace, **not pixel raster/compositing correctness or a clipping-group
  pixel test**. It establishes a plausible extraction boundary, not performance.

No rendered browser, Safari/Pencil latency, WebGL upload, memory residency or seam-safe
painting proof is claimed by these probes. No upstream brush was rendered in BoxLab.

## Authoritative BoxLab integration points

1. `export-as-panel.js:buildUVPreviewGeometry` already builds exact face-corner UV
   geometry with the existing triangulator, signature guards and seam preservation.
   It currently refuses more than20,000 corners. Reuse this owner; do not introduce
   another mesh/UV kernel or silently raise its budget.
2. `render-modes.js` and `uv-image-surface-preview.js` own temporary textured surface
   display. Existing overlays deliberately set raycast to a no-op. Create an explicit
   paint hit proxy using the shared UV geometry, with correct object/world transforms,
   material side/occlusion policy and lifetime; do not assume the read-only overlay is
   paintable or permanently change body materials.
3. `pencil-orbit-gate.js`, tool sessions and semantic exits own input. Paint should
   register with these owners. Never copy the trial's standalone OrbitControls or
   Klecks Easel listeners onto the BoxLab canvas. Commit/cancel on owner changes,
   lost capture, blur, visibility/lifecycle changes deliberately; fingers keep navigation.
4. `imported-uv-edit.js` uses existing history capture/checkpointSnapshot, immutable
   payload replacement and context guards. Follow that authority for stroke commits,
   peer isolation and stale object/UV checks. Avoid cloning all images per move.
5. `project-glb-resources.js`: native resource version3 explicitly accepts UV-only
   payloads; imported image pooling has a24MiB encoded-byte limit. Arbitrary layer fields
   on native payloads correctly fail. Design an explicit paint resource/version, codec,
   copy-on-write history and export flattening together. Raw pixel RAM and encoded file
   bytes are different budgets. Existing preview decoders are bounded read-only previews,
   not editable full-resolution texture sources.

## Chosen architecture

BoxLab input -> stabilized screen-space stroke samples -> surface hits / brush-footprint
projection -> attributed brush/dab raster backend -> active paint layer -> compositor ->
existing renderer. Stroke commit goes through BoxLab history and a versioned paint resource.

Keep these responsibilities separate:

- Stroke samples carry position, timestamp, pressure and settings; no editor objects.
- Surface adapter carries object/geometry/UV version, triangle/material identity and
  projected coverage. Break on misses/discontinuities and never connect distant UVs.
- Raster backend receives bounded marks, coverage masks and a destination layer; reports
  dirty bounds/tiles. It never owns global pointer listeners, scene Undo or project I/O.
- Paint document owns layer IDs/pixels/properties and flattened output; scene history
  references immutable committed resource versions/deltas under an explicit memory cap.
- Compositor produces one display texture; invalidate/upload at most once per frame
  when dirty initially. Benchmark before claiming partial uploads or adopting GPU stamps.

A split-at-seam path avoids cross-atlas lines, but does NOT make a brush seamless.
Real seam coverage requires projecting a footprint across surface-adjacent triangles,
clipping each face in UV space, and controlled padding/dilation for filtering. A tiny
UV jump threshold cannot distinguish all seams/overlaps/nearby islands. Likewise smudge
cannot safely sample arbitrary neighbouring atlas texels. Screen smoothing must precede
picking, with scheduled samples revalidated against the current camera and target.

Define whether radius is texel, screen or world units. Constant surface footprints
need anisotropic UV mapping/triangle derivatives; neither upstream supplies this.
Define mirrored/overlapping UV behavior (shared texels share paint), material targets,
backface/occlusion policy, and UV edits after painting. UV edits change texture sampling;
no promise of appearance-preserving reproject/bake. Refuse stale context during strokes.

## Build sequence and acceptance

1. **First narrow build:** isolated comparison, real BoxLab-generated UV geometry in
   a separate test surface, one colour layer, own stroke lifecycle and smooth pressure
   brush. Compare original trial, narrow Klecks-derived brush and simple BoxLab brush
   using identical stroke inputs. Keep real user scenes untouched until proven. Commit
   attribution with any selected source; no whole editor or second history.
2. **Production single layer:** explicit resource/codec/history transaction and native
   renderer/input registration. Save/Open and flattened GLB/native exports must be
   verified before describing this as a persistent painting feature. Native Nomad
   material/UV/image support remains subject to existing exporter eligibility.
3. **Layer controls:** add/remove/reorder, visibility, opacity, normal blending, eraser;
   reuse/adapt compositor if the measured comparison supports it. Preserve layers in
   .boxlab, flatten for destinations without our layer model.
4. **Surface quality:** seams/island protection, footprint projection, measured budgets,
   then textured tips, smudge and PBR channels. Basic colour brushes should not wait for
   advanced effects, but seam limitations must be visible during early trials.

Conservative starting proposal:512², one layer, one active object/material;1024² only
after profiling. RGBA8 at1024² is4MiB per layer: eight layers alone are32MiB CPU pixels,
excluding composite/scratch/history/browser/GPU copies. No 4K/many-layer default.
Use bounded dirty-tile history rather than twelve full-map snapshots at every size.

Required checks: fast/slow and event-rate-independent strokes, pressure/opacity/flow
semantics, zero-motion/no-op, transparent erase, colour/alpha orientation, miss/re-entry,
seam/nearby-island/overlap cases, transformed meshes/occlusion, cancel/capture recovery,
finger navigation, single global Undo chronology with modelling, duplicate COW, Save/Open,
exported image/UV correspondence, and measured sustained latency/memory on the user's M2.

## Final recommendation

**Choose selective reuse.** TexturePaint is a comparison/reference, not the production
3D dependency. Klecks supplies valuable brush/stroke techniques and a promising small
compositor, but its complete brushes require surgery around history/selection. Build
BoxLab's integration, resource model, history and 3D projection deliberately; adapt
small verified upstream pieces where they save work. No need to reinvent every brush
algorithm, and no justification for bolting two complete painting systems together.
