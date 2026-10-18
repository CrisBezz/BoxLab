# .906 — non-destructive on-surface layer masks

User905PASS confirms layer workflow works well and accepts feature-first UI before
later UX refinement. Audit mainf8455236 and verified local matching treefb902274:
existing903 masks/compositor,904 resource/project/history/export and905 painter/raster
are the authoritative owners. Add mask editing to those; no new resource schema,
compositor, raw pointer owner, history or independent masking editor.

## Workflow

File → Paint selected object → select a paint layer above Base → + Mask. New mask
is all white/enabled/non-inverted and Paint target automatically becomes Mask.
Colour/Mask selector switches editing target without checkpoint. Choosing another
layer returns to Colour. Base colour cannot have a layer mask; controls disabled.

Mask enabled bypasses/restores coverage without losing bytes; Invert mask flips the
coverage interpretation flag without rewriting raw mask pixels. Remove mask restores
full layer coverage and returns to Colour. Each actual add/flag/remove/stroke change
uses original scene checkpoint and COW resource replacement; repeated flag values,
selection and brush presets make no history. Undo/Redo still exits Paint.

Hide brush / Reveal brush / Grey brush select MASK painting and set desired effective
coverage0/255/128. Presets account for inversion (raw255-value when inverted). Mask
value slider directly controls raw0–255 values; inversion reverses its interpretation.
Brush size/hardness/pressure/opacity and both accepted stroke samplers still apply.
Colour picker disabled in Mask mode, previous colour retained for Colour mode.
The brush presets change brush value, not fill the whole mask. Settings are session UI
state; Save/Open preserves masks and starts editing Colour when reopened.

## Implementation

Single session raster switches from transparent colour RGBA to original opaque raster
for mask editing. Stored R8 mask expands to temporary grey RGB/alpha255; same stroke
owner applies numeric grayscale from requested mask value. Core overrides colour RGB
in Mask mode. On preview/commit only R is captured back to R8; underlying colour layer
pixels are unchanged exactly. No mask texture gamma conversion or colour baking.
Same903 compositor multiplies coverage×layer opacity×pixel alpha with enabled/inverted
semantics. User sees final surface result, not a separate grayscale overlay view.

Mask painting requires parent layer visible/nonzero opacity and mask enabled, so hidden
edits do not happen silently. Invalid mask values/metadata/selection refuse before
history; cancel/contact loss/settings/target/layer change or body disposal restores
committed mask/preview and navigation. Existing original budget preflight includes mask
bytes (8MiB unique raw scene pool) before checkpoint; failed edits preserve source.
One dirty texture upload/frame retained; whole-stack/preview-copy costs unchanged plus
temporary R8 conversion. No measured iPad performance or seamless/island-mask claim.

Resourcev2/scenev3, original Save/Open/atomic replacement/Duplicate/history and flattened
NOM/GLB paths remain unchanged. Masks affect layer coverage; material Opacity channel
and physical mesh transparency are separate future work. No image sources/projection,
unlinked mask transforms, mask stack/groups or material/displacement UI yet.

Seven new tests: actual core Hide/Reveal/grey and exact source colour preservation;
actual UI add/select/presets/inversion/picker/colour return/removal/settings cancel;
flags/no-op/checkpoint/UndoRedo; interruption/layer switch/body loss; fractional brush
opacity/no dab accumulation/invalid values/checkpoint/budget rollback; exact projectv3
mask Save/Open/re-edit; native export of actual on-surface mask paint. Existing900/905
assertions retained. Node DOM/render/bitmap adapters are not rendered/iPad evidence.

Only main painter/core plus shell/recovery906 cache graph changes. Shared raster905,
Lab905, compositor903, resource/project/export904, protected modelling/Multi/frozen
owners unchanged. No broad UI cleanup: user prefers full feature set before polishing.

Manual: select painted layer→+ Mask→Hide brush→Pencil hides; Reveal restores, Grey gives
partial coverage. Toggle enabled/invert, remove mask and Undo; source colours return.
Save .boxlab/reload/Open→select layer and Mask→continue; finger navigation unchanged.
Native export optional colour sanity; automated tests cover transport/refusals.
Next image-source/Project from View build through existing geometry/UV owners and
Insert Move→Rotate→Scale cycle, with explicit editable source/placement resource
versioning. See docs/paint-material-direction.md; retain905/906 gates and defer broad
layer UX redesign until image/mask/material feature flows are known.
