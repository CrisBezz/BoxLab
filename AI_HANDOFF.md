## v0.36.18.575 — Total Gizmo planar move + interaction refinement

- Added true XY / XZ / YZ planar move handles to the Object-mode Total Gizmo.
- Planar handles are projected from the current world axes and update as the camera orbits.
- main.js now creates the drag plane from the selected gizmo plane:
  - XY => world Z normal
  - XZ => world Y normal
  - YZ => world X normal
- Planar movement is therefore a real world-plane constraint, not a fake screen-plane drag.
- Rotation arcs use segmented/dashed rendering to read more clearly through overlapping gizmo geometry.
- Hit priority refined:
  - axis shafts retain generous 16px hit zones
  - rotation arcs reduced to 12px hit zones
  - screen/uniform rings use 13px hit zones
  - planar pads use direct filled-area hit testing
- Existing X/Y/Z explicit constraints from .573/.574 remain authoritative.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 9/9 PASS.

Hands-on check:
1. XY pad moves only in XY.
2. XZ pad moves only in XZ.
3. YZ pad moves only in YZ.
4. Orbit camera and confirm plane pads continue to sit between the correct projected axes.
5. Rotation arcs remain easy to identify and grab.
6. Axis arrows/scale nodes should win when directly targeted near overlapping rings.
7. Navigation and legacy transforms remain unchanged.

Next: precision HUD + exact transform input.

