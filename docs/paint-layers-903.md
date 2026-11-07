# .903 — masks and colour blend modes

Audit main787cfcb9: .902 isolated stack allows Normal only; main900 raster/resource898/
project899/export901 are single opaque colour. User adds image placement/project-from-
view, Insert tap cycle, masks/blend modes and material slots/displacement placeholder.
Full product direction is docs/paint-material-direction.md. No extra user PASS inferred.

Extend same paint-layer-stack.js owner, no second compositor/scene/history/gesture.
New stacks v2 add per-overlay blendMode and mask (null or enabled/inverted plus one
Uint8 byte per texel). Black0 hides, white255 reveals, grey partial. Effective coverage
is pixelAlpha/255 × opacity × enabledMask/255; inversion uses255-mask. Disabled masks
retain bytes but contribute1. Hiding/inverting/disabling never edits source colour.
Mask row order is same UV-v0-first; dimensions inherited exactly from base. All fields
strict, owned buffer copies on capture/replace; frozen metadata, read-only typed pixels
by caller contract. Sparse layer arrays now refuse at capture. Same512² and3 overlay
limit;3 masks add768KiB, so max committed stack4.75MiB, additional temporary copies and
flat output not counted. No performance/sparse-copy claim.

Old v1 captures/flatten remain supported; upgrade explicitly fills Normal/null mask.
Append/replace upgrade to2 without changing colour bytes. v1 extra mode/mask fields
still refuse. Existing902 test rejecting multiply as unsupported now rejects an unknown
mode: deliberate contract extension, not removed refusal coverage. Main project and
export still reject editable stacks as opaque resources; no schema silently added to
nativeUV envelopev3, colourPaint or .boxlab. Flatten returns original v1 opaque resource.

New paint-blend-modes.js exposes26 modes from user's screenshot. Standard modes follow
https://www.w3.org/TR/compositing-1/#blending including nonseparable luminosity/saturation
adjustment and gamut clipping, not HSV component swapping. BoxLab extra conventions:
- Linear Burn=max(0,b+s-1), Linear Dodge=min(1,b+s).
- Darker/Lighter Color choose whole RGB by .3R+.59G+.11B; equal luminosity keeps backdrop.
- Vivid Light uses Color Burn(b,2s) below/equal.5 and Color Dodge(b,2s-1) above.
- Linear Light=clamp(b+2s-1); Pin Light=min(b,2s) below/equal.5 else max(b,2s-1).
- Hard Mix thresholds Vivid Light at.5; equal.5 yields1.
- Subtract=max(0,b-s); Divide=min(1,b/s), s=0 yields1 including0/0.
All use normalized sRGB BYTE space, then source-over original opaque base with effective
coverage and per-layer byte rounding. Normal uses exact902 byte arithmetic. No Nomad
bitwise-parity, linear-light, normal-vector/PBR/scalar interpretation promised.

Seven new tests:26 fixed analytic grayscale vectors; nonlinear branch/endpoints;
colour/luminosity/gamut/whole-RGB selection; all modes finite/bounded on49 coloured+
endpoint pairs without mutation; masks/alpha/opacity/invert/disable/PNG exact bytes;
owned mask schema/invalid coverage/typos; old902 upgrade; non-Normal coverage and
asymmetric mask rows/sparse arrays. Existing902 real project/native export tests remain.

Only shell/recovery903 updates; main paint900/export901/lab901/raster896 and all protected
modelling/frozen owners unchanged. New compositor child903 pin reviewed in its existing
isolated parent. No layer panel/mask drawing, image import/projection/material UI,
editable-layer persistence/history or rendered iPad test claim. No new hands-on gate.
Next explicit layered project/scene resource before main UI, per product direction.
