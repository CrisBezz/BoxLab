# Roughness export through original owners — .918

19 October 2026 (Brisbane). User .917 PASS protects existing colour paint Save/Open,
Duplicate isolation and Undo/Redo checks. This is an export foundation; there is no
roughness brush, material slider or rendered roughness preview yet.

Audit: paint-export.js already captures colour/geometry/settings/native UVs before
await; nomad-scalar-png.js owns lossless scalar encoding; nomad-export-core.js owns
native material slots/image identity/budgets/container; export-as-panel.js owns GLB
binary material patching, UV geometry and loader verification. Extend these owners.
No alternate writer, modelling kernel, provenance or native UV metadata added.

The roughness owner exposes its existing strict descriptor validation as an owned
copy operation. Export capture copies R8 pixels, geometry and UVs before await,
sharing only export-local copies for shared committed resources. Original
paintTargetKey/digest validates current Base/native UV binding for BOTH channels.
Stale bindings, malformed descriptors/lengths, linked/evaluated/procedural/imported
owners refuse. OBJ/Join and unprepared synchronous native calls still refuse.
Project scene v6 and legacy colour envelopes are unchanged.

R8 expands temporarily into the existing scalar encoder's G input. PNG remains
8-bit grayscale, without sRGB metadata, row flips, resampling or factor baking;
all 0–255 values and non-square16–512 dimensions survive. NOM uses its existing
roughness slot/factor1 and original independent UV pool, polygons, names, exact
image dedup and 24MiB aggregate image budget. GLB reads roughness from G with
roughnessFactor1/metallicFactor0; the grayscale B value has zero metallic effect.
Colour is white when absent. Original native texture sampling and GLB clamp/linear
conventions remain unchanged. GLB material identity includes BOTH colour and
roughness texture IDs; a shared colour cannot merge different roughness materials.
Shared image data are reused independently from material combinations.

Five integration checks exercise actual native/Three GLB exporter+loader and File
actions, independent PNG CRC/zlib decoding and exact G values, resource/material
sharing/separation, non-square maps, UV/geometry bytes, async mutation isolation,
refusals and source/project immutability. The old .917 async blanket-refusal check
now checks stale-binding refusal; raw OBJ/native/Join guards remain protected.
Node bitmap transport adapters do not establish rendering or external app acceptance.

Next: visible roughness channel/preview through the existing compact Paint session
and raster/input/history owners. Do not label colour blend modes as scalar blending;
no roughness layers/metalness/normal/opacity/displacement parity is delivered here.
Manual nearby smoke: export two differently colour-painted objects to NOMAD and GLB,
verify independent colour and UV placement; retain paint Save/Open/history checks.
New roughness fixtures are automated, not a synthetic device task.
