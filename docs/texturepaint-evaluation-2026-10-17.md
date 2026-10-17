# TexturePaint evaluation — 17 October 2026

## Decision

**Conditional prototype fit; not a production drop-in.** TexturePaint supplies a small
Three.js DataTexture/brush example. It is CPU stamping, not GPU surface projection,
and has no layer stack. Keep BoxLab's renderer, gestures, mesh/UV/resource/history
owners. Prove the direct-Pencil experience before extending native project resources.

[Live trial](https://crisbezz.github.io/BoxLab/evaluations/texturepaint/) paints directly
on a sample sphere or plane with immediate texture updates. It is a SEPARATE page,
not an editing session for BoxLab objects. Main app remains .895. Trial paint is
volatile; Download PNG saves a flattened image. No layer/project/Nomad persistence.

## Exact provenance

- Repository: https://github.com/ceramicSoda/TexturePaint
- Reviewed commit: `3af8a61e9493ff960ff29ed429fc734335c80931` (master at audit).
- Exact source: https://github.com/ceramicSoda/TexturePaint/blob/3af8a61e9493ff960ff29ed429fc734335c80931/texturePaint.js
- Vendored original: `evaluations/texturepaint/vendor/texturePaint.upstream.js`, byte-identical.
- Original MIT licence/copyright retained in `vendor/LICENSE`; original README retained.
- Upstream package v0.1.2 depends on Three ^0.150.0. Trial uses BoxLab's Three0.179.1.
- Original is preserved for reproductions; adapter changes are separate and attributed.

## Findings reproduced in automated tests

1. **Tile-edge row wrapping:** original stamp loop flattens out-of-range X into the
   next/previous texture row. A brush at the left edge marks the right edge elsewhere.
2. **Texture reset/reallocation:** `getTexture()` replaces both buffer and texture,
   clears pixels and does not dispose the prior texture.
3. **Colour handling:** raw `THREE.Color` linear components are written into bytes;
   sRGB selection/display needs explicit handling under current Three colour management.
4. Original history is private to the demo, initially aliases the live buffer, and
   has no Redo. Its `mouse()` installs anonymous listeners without a teardown API.
5. `update()` stamps each frame rather than sampling stroke distance. No coalesced
   Pencil events/pressure, seam projection, occlusion policy, layering or persistence.
6. The original "hardness" controls intensity rather than a hard centre/soft falloff.
   Marker alignment uses a local normal and is not a complete world/screen brush cursor.

## Bounded adapter

Reuses upstream constructor, brush object and DataTexture. It avoids upstream mouse,
marker, getTexture, update and history owners. Attributed blending loop is adapted
with explicit XY clipping, brush falloff, sRGB byte conversion/quantisation, opacity
and pressure. Pixel writes mark the existing texture dirty during movement, not just
on stroke release. Screen-space interpolation raycasts each sample against the 3D
mesh; it never draws a line across distant UV coordinates. Misses do not stamp.

Trial has512² opaque-white colour surface, radius1–64 texels, twelve Undo snapshots,
Redo/cancel/no-op semantics and disposal. Current pixels + active snapshot + twelve
history buffers are at most14MiB raw CPU pixel data, excluding renderer/GPU/mesh/browser
allocations. No undo snapshot per pointermove. Pointer capture/coalesced events;
Pencil paints, fingers retain original Three OrbitControls orbit/pan/pinch. Mouse
Paint/Orbit toggle. Pointercancel/blur rolls back current stroke; pagehide disposes.
PNG download flips native texture rows into image top-down orientation.

## What this evaluation does NOT establish

- iPad M2 Pencil feel, sustained FPS/latency or Safari memory behaviour still need hands-on testing.
- UV brush footprint is a circle in UV space, not constant-size in world space.
- No seam stitching/dilation or island mask: stamps can bleed to adjacent UV islands,
  and overlapping UVs intentionally share paint. Sample sphere seam may be discontinuous.
- No production layer stack, masks, textured brush tips, PBR-channel painting, imported
  texture base, native object integration, scene-history or project/export persistence.
- Headless browser installation in this environment returned truncated archives;
  native Node/Three tests alone do not prove a rendered Safari viewport.

## Neat production integration path

1. Use `export-as-panel.js`'s **existing buildUVPreviewGeometry** for actual selected
   Base mesh triangles, exact face-corner UV seams and authoritative triangulation.
   Do not create a second modelling/triangulation/UV kernel from this sample geometry.
2. Integrate display with **render-modes.js** / the existing UV surface preview owners.
   The current read-only overlays disable raycasting; painting needs a deliberate
   surface hit proxy with exact UVs, rather than raycasting the old UV-less body.
3. Use original tool-session, selection/radial exit and global gesture ownership.
   This trial has a separate canvas; its listeners must NOT be copied onto BoxLab's
   viewport wholesale. Preserve Pencil paint versus finger navigation deliberately.
4. Design native editable paint resources before promising Save/Open. Native resource
   v3 is strictly UV-only (`project-glb-resources.js`); attaching arbitrary texture/layer
   fields would correctly fail. Extend an explicit resource version, object history and
   codec together, with copy-on-write per committed stroke and bounded pixel/delta history.
5. Start with one colour layer persisted through project + flattened native/GLB export,
   then layers/masks/PBR channels. Evaluate GPU render-target stamping if CPU upload or
   seam-aware projection is the measured bottleneck. Keep a replaceable paint backend.

## Validation

Five Node tests reproduce upstream defects and check adapter clipping, sRGB pixels,
pressure/opacity, immediate texture invalidation, real UndoRedo/cancel/no-op, bounded
memory/history/disposal, bounded screen sampling, actual Three sphere ray hits, exact
upstream SHA256/licence and main-app isolation. Full suite result/publication proof
is recorded in the continuity documents. Browser/Pencil acceptance is separate.

## Hands-on evaluation

1. Draw on the sphere with Pencil; change colour/radius/hardness/opacity and pressure.
   Paint should appear while moving. Fingers should orbit/pan/pinch without painting.
2. Undo/Redo; start a stroke then interrupt it; check no orphaned navigation or paint.
   Orbit around the sphere seam and compare the Plane sample's texture-edge behaviour.
3. Download PNG and inspect colour/orientation. Return to BoxLab: its scene is unchanged.
   Reset/reload intentionally clears the trial. Do not use this trial for work needing layers.
