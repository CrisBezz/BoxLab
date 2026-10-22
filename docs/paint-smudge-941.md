# .941 — bounded, face-confined Smudge

Audited main c2ad16fc (.940). No Smudge owner exists in current production or the
isolated trial. The earlier Klecks audit found full Smudge/Blend brushes coupled to
Canvas/composed layers/history; do not import that editor or add a parallel engine.

Extend the original shared paint-core raster, viewport-paint-core surface adapter
and compact LEFT Paint selector. Existing screen-spaced BoxLab/Klecks samplers,
raycast/occlusion, original face map/filter domain, scene checkpoint/COW, resource
pools, Paint history reopening, project transport and flattened writers remain owners.
No new geometry/UV/history/schema/export/pointer implementation.

Tool **Smudge · within face** picks up a tip-sized patch without changing pixels
on first contact. Subsequent spaced dabs carry that patch, mixing 25% of the local
stroke-start pixels into the reservoir per moving dab. The selected swatch is ignored.
Size/pressure/hardness/alpha control the footprint; Opacity bounds the mix with the
original pixels. Coverage keeps its maximum per contact, while the carried target
can change as the tip moves. This is deliberately a paint-pulling brush, not Blur's
diffusion target. Original Brush/Eraser/Fill/Blur calculations remain unchanged.

Pickup and writes require the SAME original polygon-face label. Face changes,
ambiguous hits, zero pressure and ray misses reset pickup; returning starts fresh.
Atlas proximity, internal UV layout and disconnected faces cannot provide colour.
No cross-face Smudge or automatic footprint wrapping in this first bounded version;
on densely faceted meshes the brush restarts often. Existing connected-face Blur is
unchanged. Both samplers remain screen-space before picking, never UV splines.

Premultiplied RGBA interpolation prevents hidden RGB halos on transparent layers.
Masks and scalar channels use their existing equal-RGB raw data path. Only the
selected layer/channel supplies pixels; base/peers/other layers remain independent.
Image colour retains the existing refusal: Convert to paint before Smudge, or edit
the image mask. Original staged image/cancel/settings/history lifecycle remains.

The reservoir is reused through face changes/misses, at most 139² samples:
309,136 bytes Float32 RGBA + 19,321 validity bytes (about 321 KiB). Additional
transient memory retains the existing stroke snapshot/coverage and face-domain
plan; there are no Blur Float64 filtering buffers for Smudge. The cached original
domain still includes seam links for later Blur use, even though Smudge ignores
cross-face links. Existing 2M UV scan/walk guards remain. Pickup visits are capped
at 8M per contact, plus the corresponding bounded footprint writes and original
12,000-dab sampler cap. Overlong contacts refuse with a lift/restart message and
cancel the ENTIRE transient stroke, freeing capture/navigation without checkpoint.
This is not an iPad latency, total RAM or FPS measurement.

Six new regressions cover analytical carried pixels/opacity/alpha, tap/no-motion,
owned cancellation, adjacent islands/face restart/miss reset, alpha/raw values,
actual UI/layer isolation/Paint UndoRedo/SaveOpen/exact native PNG, scalar/mask
independence/checkpoint/miss rollback, raster+UI work-limit cancellation and actual
surface-picked event subdivision/invalid UV refusal. Original Blur/seam/history,
alpha/image/layer/creation/resource/export and modelling contracts remain active.

Three functional owners only; reviewed main/Lab reverse-loader closure repinned941.
Main/cage/Multi1.0, UV projection/triangle/seam owners, schemas, budgets and frozen
betas unchanged. .940 user PASS protected. Alpha929/reflection-preview gates remain
independent. Device941 Smudge feel is pending; next respond to that feedback before
cross-face carry, AO or Edge-seam authoring work.

Hands-on: paint a hard colour patch on the cube; Smudge from inside it outward on
one face. Compare low/high Opacity; tap alone should leave it unchanged. Try an
overlay, Undo/Redo while Paint stays open, and Save/Open. Face edges restart pickup.
