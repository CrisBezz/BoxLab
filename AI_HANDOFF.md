## v0.36.18.661 — Loop Cut drag ownership + Bevel reset

Current release:
- v0.36.18.661

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary selection: AWESOME / PASS.
- .659 additive Edge hold browser implemented; awaiting hands-on confirmation.

User findings before .660:
1. Loop Cut:
   - loop topology inserts,
   - Pencil drag rotates model instead of sliding inserted loop.
2. Edge Bevel:
   - bevel completes,
   - Bevel remains armed in left menu,
   - subsequent Edge taps bevel rather than select.

.660 Loop Cut ownership:
- main.js exposes __boxlabMainDirectTool.active() / ownsModellingGesture().
- pencil-orbit-gate checks this in addition to Face-direct.
- Any active main direct modelling tool blocks deferred Pencil orbit on mesh.
- Loop Cut therefore keeps the Pencil from pointerdown through its loop-slide drag.
- Orbit still works normally when no modelling owner is active.

.660 Bevel reset:
- direct-bevel pointerup:
  - commit/restore
  - release pointer capture
  - clear Edge selection
  - disarm Bevel
  - semantic tool:none
  - Edge selection ready
- pointercancel restores and disarms.
- applyExact also disarms.
- __boxlabDirectBevel now exposes disarm / active for future Selection Hub session work.

Immediate hands-on:
1. Edge mode -> Loop Cut.
2. Pencil down on valid edge and drag immediately.
3. Inserted loop must slide; camera must NOT rotate.
4. Release and confirm topology.
5. Bevel an Edge with Pencil.
6. On release, left Bevel button must switch off.
7. Tap another Edge: it must select, not bevel.
8. Quick .659 additive Edge hold test.
9. Quick Face Extrude background-orbit test if desired.

Next after PASS:
- Bevel viewport settings palette.
- Edge Extrude gizmo-assisted plane/axis workflow.
- continue radial availability polish if needed.

Protected:
- .652 background-yield rule.
- .657 Face Boundary candidates.
- .659 additive Edge hold semantics.
- .658 radial availability.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.


Publish correction:
- .660 source was correct, but direct-bevel.js remained cache-pinned to .253.
- .661 is the build to hands-on test; all three touched owners are repinned:
  - main.js
  - pencil-orbit-gate.js
  - direct-bevel.js
