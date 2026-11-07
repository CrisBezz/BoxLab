# .912 — surface-relative image placement

Audit base a647d08f (.911 proof). User .911 PASS protects picker, screen placement /
Project from View and nearby persistence/navigation/history. Keep that path available.

## Workflow

Paint selected object → + Image → On surface → tap a visible point on selected mesh.
The first tap places the image and stays in Move. Further taps cycle Move → Rotate →
Scale → Move through the exact Insert437 cycle. Pencil drag in Move follows picked
surface points and triangle normals. Rotate drags horizontally; Scale uses diagonal
horizontal-minus-vertical drag, clamped .05–20× as in Insert. The mode button cycles too.
Fingers orbit/pan/zoom without moving the anchored image. Tap Back to view to return to
the accepted .911 screen guide; switching discards the uncommitted surface candidate.

During contact a 65% planar tangent guide follows the anchor. Lift Pencil to regenerate
the EXACT image projection on the UV mesh through .911. This is a release-updated mesh
preview, not continuous curved-mesh rasterization during drag. Press Apply image to
commit ONE original scene history step. Cancel image, closing Paint, changing layers,
body loss or active-object changes discard staging. Cancelled contact restores its
previous anchor/preview and original navigation-enabled state.

Select retained image → Edit image → On surface → pick its new location → Apply image.
This replaces the image recipe/raster pair in the SAME layer, retaining name/order/
blend/opacity/mask and original encoded+decoded source. Edit starts a fresh surface
anchor/default patch size, not a restoration of a previous interactive anchor/spin/
scale. The existing v1 projection matrix and capture frame persist the resulting image;
there is no new saved surface-editor schema. .boxlab preserves editable sources; native
NOM/GLB exports still use the existing flattened colour handoff.

## Reused owners and bounds

- One existing window-capture pointer owner in viewport-paint.js, plus its image-stage
  branch. No new listeners in helper or guide. Existing hit() enforces selected-object
  visibility/scene occlusion. Original palm suppression/capture/control restore remains.
- New paint-image-surface.js uses Insert's surfaceAlignmentQuaternion for +Z→world-normal
  orientation plus local spin. Normal matrix handles transformed surface normals.
  Default longest patch side is .45×world bounds diagonal, preserving source aspect.
- Surface camera is a temporary Three OrthographicCamera aligned to that frame. Capture
  through original907 paintImagePlacementFromCamera, then feed the SAME strict v1
  retained recipe, UV triangles and .911 projector. No new ray rasterizer or triangulator.
- Existing .911 75° facing, scene/self occlusion, source sampling, UV overlap/tile checks
  and 2M/30M work caps remain. Source limits1024²/2MiB, three overlays, paint pool8MiB
  unique/16MiB expanded and existing file limits remain. Large patches/scenes can refuse.
  No seamless wrap/geodesic decal or measured M2 responsiveness claim.
- The guide owns exactly one plane/material/DataTexture. It is non-raycastable, tagged
  as overlay, excluded from body-only occlusion/shadow logic and disposed on all stage
  exits. Image-top-first texture flip is guide-only; stored UV cache rows unchanged.
- previewImage prepares paired source/raster via original908 append/replace and the
  original colour resource/pool preflight, then updates ONLY existing display pixels.
  Object colourPaint, saved scene, global history and committed sources remain unchanged.
  tick retains that candidate instead of overwriting it from the brush buffer.
- applyImagePreview rechecks target and whole scene pool before original checkpoint/COW
  replacement. UI recomputes at Apply so current scene occlusion is checked again.
  Refusal restores committed display/history/resource, keeps stage available. Beginning
  a paint stroke or changing a layer discards candidate; no parallel Undo owner.
- Preview owns whole candidate buffers; memory beyond retained-pool limits can include
  source/stack/flat copies and guide/GPU allocations. No sparse/COW-buffer optimization
  or increased layer/resolution allowance is claimed.

## Tests and next step

Seven new focused tests execute frame/projector math, real Three guide lifetime,
original painter/UI pointer flow and real sphere mesh. Cover aspect/rotation/world
normal, off-object pick, Move/tap cycle, cancelled contact, finger/palm handling,
release-only preview without scene/history/save changes, Apply single checkpoint,
retained mask/blend/source sharing and cancel/close, genuine pool/checkpoint refusal,
body disposal, actual Sphere UV projection/codec persistence and native PNG bytes.
The sphere fixture uses original replaceMeshInPlace on the real live bridge: assigning
only manager objects is overwritten by original saveActive in this harness. No runtime
geometry change was needed. .911 regressions remain active and unchanged semantically.
Full local Node24.19.0: **2570 PASS / 0 FAIL / 0 skipped**.
Node Canvas/WebGL transport remains separate from rendered/iPad/Pencil acceptance.

Device gate: + Image → On surface → pick/drag around cube or sphere; tap Rotate/Scale,
lift to inspect mesh result; finger orbit; Apply then Undo/Redo. Edit retained image /
On surface, cancel and reapply; Save/Open and native colour sanity.

Next use surface placement feedback, then audit original material/channel owners for
staged Nomad-style slots (including reserved displacement) per paint-material-direction.
Broader layer UI polish follows feature flows; do not replace accepted owners wholesale.
