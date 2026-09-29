## v0.36.18.577 — projected rotation rings visibility repair

- .576 hands-on FAIL: projected X/Y/Z rotation rings were not visible.
- .577 simplifies the ring rendering path to remove the fragile front/back segmentation.
- Each axis now uses one full closed projected path:
  - X ring from a 3D circle in YZ
  - Y ring from XZ
  - Z ring from XY
- Ring points are projected directly through the active camera into canvas coordinates, then converted into Total Gizmo SVG coordinates using canvas width/height.
- 96 samples per ring for a smooth perspective curve.
- Front/back fading is intentionally postponed until basic projected-ring visibility and perspective behavior are hands-on confirmed.
- Screen rotate and uniform scale rings remain unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 9/9 PASS.

Hands-on check:
1. Confirm red/green/blue rotation rings are visible.
2. Orbit camera: each ring should change shape continuously with perspective.
3. Face-on ring should approach circular; edge-on should collapse toward a line.
4. X/Y/Z ring dragging should still rotate around the correct axis.
5. Planar move and axis transforms unchanged.

