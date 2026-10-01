## v0.36.18.646 — Pencil orbit arbitration diagnostic build

Current release:
- Visible/app version: v0.36.18.646
- version.json and HTML shell title synced.

Hands-on status:
- .642 Selection Hub direct tools: BIG PASS.
- .643 Sweep viewport session: AWESOME / PASS.
- .644 post-Through disarm fix: FAIL for Pencil orbit.
- .645 explicit Face-direct pointer-capture release: FAIL for Pencil orbit.
- Screenshot on .645 proves next Pencil RAW POINTERDOWN reaches #viewport.

.646 purpose:
- Diagnostic only. Do not change orbit/selection ownership yet.
- Determine why the next Pencil contact is not reaching OrbitControls.

New Gesture Debug lines:
- PEN ORBIT ROUTE
  - pid
  - pressure / buttons
  - meshHit
  - selectionMode
  - selectionCount
  - faceToolActive
  - multiEnabled
  - paintPending
  - paintActive
  - controlsEnabled
  - route = BLOCK_MESH_HIT or FORWARD_ORBIT
- PEN ORBIT FORWARDED
  - appears only if OrbitControls pointerdown is actually invoked.

Read-only diagnostics:
- __boxlabPaintSelectDebug
- __boxlabPencilOrbitDebug

Immediate hands-on:
1. Gesture Debug ON.
2. Select one Face.
3. Extrude Through.
4. Lift Pencil.
5. Immediately attempt Pencil orbit.
6. Send screenshot containing PEN ORBIT ROUTE and, if present, PEN ORBIT FORWARDED.

Interpretation:
- BLOCK_MESH_HIT + selectionCount 0 = gate is blocking orbit over mesh after Through.
- FORWARD_ORBIT but no camera movement = inspect controls.enabled / OrbitControls internal pointer lifecycle next.
- PAINT PENDING/CLAIM around same pointer = paint selection is winning after gate handoff.

Protected:
- No behaviour changes in .646.
- .640 interaction checkpoint.
- .642 Selection Hub.
- .643 Sweep viewport session.
- Through topology/build/gate.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
