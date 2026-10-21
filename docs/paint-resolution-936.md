# .936 — Optional 1024 colour texture grid

The user accepted .935 and prioritized higher image-layer and paint resolution.
Main before this build:4db83c38, live .935. Existing paint-resource supports up to1024
but painter, layered stack, projector, Blur domain, material display and export gate
fixed the production grid at512. No hidden high-resolution selector or separate owner
was found. Reuse these owners; no replacement mesh/UV/history/paint/export subsystem.

Paint → Texture resolution shows the current colour map dimensions and an explicit
Increase to1024×1024 button, disabled once enlarged or in a scalar channel. New objects
still open at512. Existing files open at their saved size. Enlargement checkpoints once,
preserves layer selection and Paint mode, and enlarges colour base, image/raster layers
and masks together. Settings/order/identity/source bytes stay the same. Every old texel
becomes a2×2 block; existing detail is not reconstructed. To use source detail anew,
add or re-place an image AFTER enlargement. Never regenerate a wrapped image from its
saved flat projection matrix: the interactive wrap anchor/chart was transient before936.
Undo/Redo uses the original scene owner and .928 reopen; shared originals stay unchanged.

Fresh Brush/Fill/Eraser/Blur/image projection and masks use the1024 grid, including Save/
Open and exact flattened NOM/GLB PNG. Retained sources are still1024²/2MiB; alpha tips
256²/256KiB; three overlays. Roughness and metalness remain512 working maps, independent
of colour; only their temporary grayscale display is enlarged, never their saved/exported
data. Material preview reads actual map sizes. Blur domain cache changes with target size.
Brush Size remains measured in texels, so an unchanged slider covers less UV area at1024.
No global default migration, downscaling,2K/4K, source-size increase or layer-count increase.

The existing layeredv2/v3 descriptor already stores dimensions. Layered square1024 opts
into32MiB unique/64MiB expanded raster pool,48/96 image pool. Enlargement always creates
an existing layered resource (even no overlays), so opaque legacyv1 descriptors cannot
raise allowances. Original512 raster8/16 and image24/48 profiles remain exact; tests of
old opaque1024 quota fixtures remain unchanged. Failed pool upgrades do not publish flags
or buffers. Existing strict descriptors/ref uniqueness/canonical bytes/whole-resource
predecode validation remain. Existing scenev5 shared bytes kicks in at8MiB expanded;
no schema or native UV metadata change. Existing32MiB File and24MiB native image caps
remain; scenes near these bounds can refuse Save/export, with original state retained.
Budgets bound committed/transport bytes, NOT total browser or scene-history memory.

At1024 the original Blur uses two32MiB Float64 buffers while filtering; one32MiB target
lives per contact. Domain labels4MiB, neighbour table16MiB plus triangle map4MiB during
construction; contact-owned domain+links20MiB, snapshot4MiB and coverage4MiB, working
layer4MiB, preview4MiB, resource/compositor/history/GPU/browser copies additional.
32 passes visit at most32×1024² texels. Existing2M UV scan,2M seam-walk and30M ray-work
caps are unchanged; complicated layouts may refuse at higher resolution. This build
makes no measured M2 RAM, latency or FPS claim; device checks include stroke/Blur feel.

Seven focused integration tests run actual owners: exact replication/isolation, UI and
history/continued1024 paint/mask/Blur +512 scalar/material, actual high-res source/retained
project + native PNG bytes, old quota/checkpoint/stale refusal, high-res pool/corruption,
retained wrapped source and staged-placement guard. Legacy tests remain active and are
not relaxed to accept a new cap; profile eligibility deliberately preserves old fixtures.
Complete reverse cache graph includes budget/resource/pool/project/export/main UI and
shared raster/Lab loaders; protected modelling/main/cage/Multi/frozen bytes unchanged.

Manual: increase to1024, fresh strokes and fresh image; Undo/Redo, Save/Open and NOMAD.
Then resolution feedback → Merge/Flatten; larger maps/sources/layers remain staged.

Validation preparation: the first full run caught an unintended acceptance of513²
layered maps after raising the maximum. Tightened the original base guard to retain
ALL old dimensions≤512 and admit only exactly1024² above that, preserving the existing
902 rejection assertion unchanged. Full regression then passed2686/0/0, with six new
resolution tests. Added a seventh actual GLB test; its first fixture assumed material0
was painted. Corrected it to follow the exported primitive's real material index; the
writer and all production guards were unchanged. The corrected test passes; final
full-suite/publication results follow. No old assertions were weakened.
