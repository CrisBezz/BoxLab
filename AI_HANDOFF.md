## v0.36.18.578 — projected rotation ring visibility root-cause fix

- .577 hands-on FAIL: X/Y/Z projected rings still not visibly readable.
- Root cause: the projected ring delta (about 52 screen pixels) was converted into SVG coordinates using the full canvas width/height. On a large iPad viewport this collapsed the ring radius to roughly the centre-puck size.
- .578 now maps projected screen deltas against the Total Gizmo's own rendered width/height, preserving the intended ~52px ring radius inside the 196×196 SVG.
- Also fixes the interaction proxy: projected ring hit-clones were created with empty d="" and never updated. Each visual ring now owns its hit proxy and both receive the same projected path every frame.
- Ring model remains:
  - X = YZ world-plane circle
  - Y = XZ world-plane circle
  - Z = XY world-plane circle
  - 96 camera-projected samples per ring
- No front/back fading yet; visibility/perspective must be hands-on confirmed first.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 7/7 PASS.

Hands-on check:
1. Confirm red/green/blue rotation rings are now visible at useful size.
2. Orbit camera and confirm each ring deforms naturally with perspective.
3. Confirm ring hit targets work, not just visuals.
4. Confirm X/Y/Z ring drag rotates around the correct axis.
5. Screen-rotate/uniform-scale/planar move remain unchanged.

