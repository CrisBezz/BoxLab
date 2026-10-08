# BoxLab .754 reliability slice

## 2026-10-08 — v0.36.18.754 Knife perspective EDGE accuracy

- User PASS .753 /nextbuild. Bevel/Knife/Loop audit reproduced Knife EDGE using a
  screen-space fraction as a world-edge fraction. Angled planar source worldt=.3
  resolves .2112676: .44366model units /42.88066screen pixels from shown marker.
- Existing freeBoundaryPoint now converts with camera clip weights before world
  interpolation. Orthographic weights1 preserve old result; END/MID/PERP priority,
  distances, release hysteresis, gestures, topology splitter/history unchanged.
-16new behavioral tests: before11FAIL/5PASS, after16PASS; focused88PASS.
  Full Node24:1864/1762PASS/102FAIL/0skip, same102failure identities as .753.
  Actual whole-owner camera/raycast/Pencil cut, reversed edges, rotations/transforms,
  .01/1/100scale, viewport offsets, groups/creases, Cancel/redo, exact Undo/Redo,
  Bevel1/3→Knife→supported Loop closed shells covered. No blanket exclusions.
- Runtime body only Knife; one reviewed hash and shell/recovery/Knife754 pins.
  Face/bootstrap/VertexBevel753, Extrude752, Through751 retained. Protected main,
  Loop715/Multi/frozen betas untouched. No near-plane clipping implementation;
  EDGE conversion refuses nonfinite or nonpositive clip weights.
- Publication/actual Node22/live verification and .754 device acceptance pending.

Manual checks use an angled cube/bevelled model, arbitrary edge locations away
from END/MID markers, inference snaps and Undo/Redo. Device acceptance separate
from real-kernel/DOM-double automated coverage. No all-quad or self-intersection guarantee.


### .754 publication verification

Runtime 5a7f6d585a72f076fe9d80f1bb05fd6a3b269915 published. Actual Node22 Topology run37725898931/job113143857359:1864tests/1762PASS/102FAIL/0skip; all102failure names match local inventory and .753 exactly. Pages37725898285 succeeded after a delayed deployment step; live shell/version/Knife, accepted Vertex Extrude and frozenBeta6 version byte-match the tested checkout. Focused88PASS. .754 device acceptance pending.


### .754 acceptance — 2026-10-08

User PASS .754: perspective Knife EDGE placement, END/MID/PERP, Bevel→Knife→Loop and Undo/Redo. No new runtime changes or build started.
