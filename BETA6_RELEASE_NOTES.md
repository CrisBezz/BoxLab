# BoxLab Beta 6 — release notes draft

Status: prepared for the Beta 6 freeze; final .735 candidate/device acceptance and
frozen source commit/URL verification pending. This file is not a release claim.

Beta 6 brings modelling controls into the viewport, with Face, Vertex, Object and
Edge radial tools, contextual settings and previews. It is designed around Pencil
modelling with finger navigation on iPad.

- Focus view opens by default. The highlighted Focus icon shows that the left tool
  list is hidden; tap it to reveal the list and tap again to return to Focus.
- Vertex, Edge and Face gizmos offer distinct Align icons, sharing the original
  axis/fixed-anchor workflow; Face retains Align to Face plane matching.
- Axis buttons share subtle X red / Y green / Z blue reminders and active feedback.
- File NOMAD exports native .nom geometry, names and facegroups, with Base/SubD
  and Mirror support. Regular OBJ/GLB exports remain available.
- Content-sized tool popups use modest padding and reachable Apply/Cancel/Done controls.
- Appropriate tools exit on a stationary background tap; drawing/placement tools
  retain empty-space input. A short background tap clears selection and Lasso;
  a stationary long press inverts selection when no tool owns that input.
- Sweep settings open reliably; Edge Slide stays armed until Done/background.
  Face, Edge and Vertex Bevel offer previews with existing modelling/history owners.
- Array places its ghost directly on X/Y/Z and supports constrained endpoint drags;
  Free provides free movement plus XYZ arrow handles.
- Inset Repeat remembers the committed inset distance independently of Extrude.
- Top-bar Object Browser opens original Objects and initially collapsed Modifiers
  on the right. Toolbar order: Frame All, Undo, Redo, Focus, Object Browser, VIEW.
- Existing Pencil/finger navigation, scene/history operations, Multi transforms,
  Loop Cut and export/import workflows remain part of the protected baseline.

Known limits: slight Lasso selection tightening is deferred. Existing historical
full-suite source/pin/VM test failures remain documented; passing targeted runtime
checks are reported separately from overall CI. Save uses Export/Save-to-Files. Native NOM does not add BoxLab NOM import or
promise rich UV/paint/material/morph/crease metadata round-trip; GLB retains its
existing richer-channel workflow.

Final publication fields: accepted source commit, freeze date, /beta-6/ live URL
verification and Files/Nomad acceptance to be filled after final device checks.
