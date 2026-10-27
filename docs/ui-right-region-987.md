# .987 right-region / VIEW disappearance evidence — 27 October 2026

User reports lower-right area hidden during Facegroups, then supplies screenshot
47C7D5BD-0A02-44A0-8567-0E21CF4387CF.jpeg (10:22 local) showing VIEW panel
continuing below a sharp cutoff at Saturation row. Later entire VIEW menu visually
disappeared and cannot currently be reproduced. Keep recurring rendering fault OPEN.

Separate supplied debug timestamp 2026-10-27T00:14:09.533Z, release987:
viewport1366x886/DPR2, visual viewport same/offset0/scale1. Canvas CSS1366x826
at y60/backing2732x1652, canvasProbe.hidden=false, controlsEnabled=true. sessionnull,
texturePaintfalse (does NOT report facegroup brush state). UV workspace absent;
hidden shared host unstyled/not top-layer. Footer rect x10/y845/w1340/h16, hiddenfalse,
displayflex/visibilityvisible/opacity1/z121/no filter/transform/contain. Top controls
in bounds with expected hit stacks. Gizmo displaynone/hiddenTRUE/zero rect: this
capture cannot assess earlier visible-gizmo clipping. Canvas hit tests do not prove
footer/text pixels were drawn (footer pointerEventsnone). Active render mode, VIEW
panel rect/scroll state, facegroup brush state and Studio overlay are not captured.

This is consistent with a painting/clipping symptom but does not establish native
engine cause or prove a specific overlay. Facegroups recurrence weakens Studio-only
vignette theory; overlay opacity was not directly sampled. No speculative floor,
shadow, z-index, blend or renderer change follows from this evidence.

Independent confirmed usability fault: existing-group suggestions did not open.
985/987 UI used text input+datalist, not an explicit group selector.988 replaces
that dependency with native select plus original editable new-name field. This
repairs the group-list access path, not the broader rendering fault. No987 PASS.
