# Precise paint colour — .915, 19 October 2026

User .914 PASS covers the preceding manual list: Cylinder/Cone/upright Revolve UVs,
UV Editor/history/project checks and the repeated On surface image retest. Preserve
these accepted behaviours. No additional performance or arbitrary-axis support claim.

Audit found the production painter had only a browser colour input. No existing RGB /
HSV/HSB editor was found in production paint owners; facegroup HSL generation has a
different purpose. Product direction requests RGB/HSB alongside material channels.
This narrow colour-control build finishes precise selection before data-map stacks.

`paint-colour-controls.js` binds the ORIGINAL colour input. RGB is 8-bit sRGB0–255;
HSB is HSV: hue0–360°, saturation/brightness0–100%. RGB rounds only at HSV→hex byte
conversion; display percentages round to0.1. This is not HSL, scene-linear editing,
material opacity or a new colour-management/rendering path. Hue is remembered when
grey, and saturation when black; changing Brightness can restore the chosen colour.
These are brush UI preferences in memory, not per-object paint/project metadata.
Six-digit hex input supports optional #; three-digit shorthand commits on change so
ordinary six-digit typing is not expanded prematurely. Incomplete/invalid/out-of-range
entries never publish; leaving an invalid field restores current brush values.

The helper dispatches the original colour input event only when the hex changes:
existing viewport cancel releases current stroke/pointer/controls and owns rollback.
No raw pointer listeners, second painter, scene checkpoint, resource schema, codec or
export adaptation added. Mask/image contexts disable the same numeric controls as the
original swatch. The colour details foldout starts collapsed; original swatch stays.
The three new integration tests cover field links/grey+black memory/no scene edit,
invalid/partial/shorthand/mask guards, actual UI stroke rollback and next exact cyan
pixels, original Undo/Redo, project Save/Open and actual Nomad PNG equality.

## Material-channel owner audit and next step

- `paint-target.js` + `viewport-paint-core.js`: native Base UV eligibility, single
  painter/surface/history owner; display is intentionally current unlit colour.
- `paint-layer-resource.js`, project paint pool/byte pool + scene codec: strict
  baseColor/sRGB resource schemas, bounded sharing and atomic Open. Do not insert
  roughness or vectors into the existing colour stack under different labels.
- `paint-export.js`: export-local flatten/PNG adapter. `nomad-packed-maps.js` and
  `nomad-export-core.js` already own scalar/normal/emissive imported-map transport;
  original GLB writer remains in `export-as-panel.js`. Reuse these writers.
- Native UV payload is strictly UV-only. Imported material provenance is not an
  editable native material recipe; never attach material fields to native UVs.

Next narrow material implementation: independent roughness scalar/data-map resource
foundation, explicit guarded project envelope/history/duplicate transport and reuse of
existing native/GLB material writers; then visible editing/preview. Do not silently
route data maps through RGB blends. Normal requires vector composition; opacity stays
separate from mask coverage; displacement remains a truthful disabled placeholder
until density/geometry/Undo implementation exists. Full channel parity is not .915.
