## v0.36.18.576 — 3D-projected Total Gizmo rotation rings

- Rebuilt X/Y/Z rotation rings from fixed SVG ellipses into camera-projected circles defined in world space.
- Ring planes now match the actual rotation axes:
  - X rotation ring lies in YZ
  - Y rotation ring lies in XZ
  - Z rotation ring lies in XY
- Each ring is sampled as 72 points in 3D, projected through the active camera every frame, then drawn as an SVG path.
- Ring size is derived from camera distance/FOV to stay approximately screen-size stable.
- Each projected ring is split into front/back halves:
  - front half normal prominence
  - back half faint
- The previous dashed ellipse treatment is removed.
- Screen-rotate and uniform-scale rings remain camera-facing circles by design.
- Existing planar move handles and explicit X/Y/Z constraints remain unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 10/10 PASS.

Hands-on check:
1. Orbit around object and confirm all X/Y/Z rotation rings continuously change shape with perspective.
2. Face-on ring should appear close to circular.
3. Oblique ring should become elliptical.
4. Edge-on ring should collapse toward a line.
5. Front half should read stronger than rear half.
6. Screen-rotate ring should remain circular.
7. Ring grabbing/rotation behavior should still work on X/Y/Z.
8. Planar move and axis movement should remain unchanged.

