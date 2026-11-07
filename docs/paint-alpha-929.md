# PNG alpha brush tips — .929

Audited base: main 5ee8bb54 (.928). The existing shared paint-core raster owns
colour, transparent overlays, masks and scalar texel operations; viewport-paint
owns Pencil input and UI. No existing custom tip importer/sampler was connected.
Reuse paint-image-source's PNG preflight/browser decode and original stroke,
raycast, per-contact coverage, cancellation, checkpoint/COW and export owners.

Brush settings → Load alpha PNG, Tip rotation (0–360°), Round tip. PNG only,
maximum 256 × 256 and 256 KiB, rejected before bitmap decode. Coverage is byte-space
Rec.709 weighted RGB luminance times alpha: white paints, black/transparent skips.
The source is temporary; retain one owned top-first R8 tip (≤64 KiB) and copy once
at stroke begin. Old tip stays on invalid/stale load; original bitmap/canvas cleanup
runs on success or error. Selection/settings/new contact/close/history invalidate
late loads. Loaded tip/rotation survive Paint history reopening and Done in the
current document, but are not project metadata or part of saved Undo history.
Painted results use unchanged .boxlab/NOM/GLB transport.

Same opaque/source-over/erase operation; per-contact maximum opacity and pressure
size remain. Bilinear coverage samples a rotated, aspect-preserving square footprint,
with top-first PNG rows flipped into UV-v0-first orientation. Rotation is in UV
texels, not a surface tangent frame. Alpha replaces circular hardness/falloff; normal
round brush is byte-identical without a tip. Whole-object Tap Fill ignores tip and
rotation. Images remain read-only; their masks remain paintable. No ABR/Nomad brush
container import, saved brush library, scattering, depth sculpting, world radius or
seam-safe brush claim. Existing atlas bleed limitations remain; blur/smudge require
an island/face sampling audit before UI exposure.

Four focused integrations cover predecode limits/cleanup/exact coverage ownership,
asymmetry/rotation/aspect/cancel/opacity/pressure/erase, actual UI layer/base isolation,
original history + Save/Open + exact composed native PNG, and stale/invalid imports.
Existing history928/eraser927/fill926/Lab898 checks retain original assertions.
Node executes real raster/Three/painter/project/native writer; browser decoder is
adapted. iPad picker, visible footprint, Pencil latency and appearance need device
confirmation. No performance or rendered-device acceptance inferred.

Manual: load a white-on-black/transparent PNG tip, paint and rotate; try Eraser on
an overlay; Undo/Redo and continue painting; Round tip restores circular brush;
Save/Open retains marks and native export retains their placement.

Next: device alpha feedback; UV-safe blur/smudge. Reflection preview remains
independently unresolved; no speculative lighting change. Queue viewport AO and
optional separate AO bake layer plus seams via existing Edge selection, with an
owner audit before implementation; no AO or seam-authoring UI delivered here.
