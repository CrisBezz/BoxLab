# Whole-object Tap Fill — .926

Paint Tool offers Brush and Tap fill · whole object. Tap a visible part of the
selected mesh to fill its selected layer/channel using current opacity and colour
or scalar value. Fill covers the whole512² map, including unmapped atlas texels;
these do not affect the mesh. It is not UV-island or tolerance-based flood fill.
Brush size and pressure do not constrain Fill. Fingers continue navigation.

Fill previews on down and commits once on release. Drag more than8px, cancel,
change tool/channel or lose the body to restore the previous pixels. Background
misses and no-ops create no history. Original budgets, UV/binding/eligibility,
checkpoint, copy-on-write, project and native export owners remain authoritative.
Image-layer colour remains retained; fill its mask or select a paint layer.
Transparent overlays use original source-over; Base stays opaque; masks/scalars
keep independent raw values. Returning Brush uses accepted samplers/coverage.

Four integrations cover real UI/persistence/history/export and cancellation/refusal.
User925 reflection preview remains failing; no new reflection fix included. Native
export confirmed good. Eraser, bounded PNG alpha tips, UV-safe blur and smudge are
requested next stages, not implemented or claimed as full Nomad/ABR compatibility.
