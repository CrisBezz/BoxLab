## v0.36.18.647 — explicit OrbitControls registration handoff

Current release:
- Visible/app version: v0.36.18.647
- version.json and HTML shell title synced.

Hands-on history:
- .643 Sweep viewport session: AWESOME / PASS.
- .644: post-Through disarm did not restore Pencil orbit.
- .645: explicit Face-direct pointer release did not restore Pencil orbit.
- .646 diagnostic: RAW POINTERDOWN reaches #viewport, but PEN ORBIT ROUTE never appears.

Confirmed .646 finding:
- pencil-orbit-gate was not wrapping the actual OrbitControls pointer listener.
- The old interception depended on listener.name matching /onPointer/i.
- That assumption is unreliable for the current Three.js OrbitControls registration.

.647 fix:
- pencil-orbit-gate exposes:
  - beginOrbitRegistration()
  - endOrbitRegistration()
- main.js brackets exactly:
  new OrbitControls(camera, canvas)
  inside that registration window.
- While the window is open, canvas pointerdown/move/up/cancel listeners are wrapped as OrbitControls listeners regardless of function name.
- Name matching remains fallback only.
- The actual routing policy is NOT changed:
  - mesh hit -> BLOCK_MESH_HIT
  - background -> FORWARD_ORBIT
- .646 route diagnostics remain active when Gesture Debug is on.

Immediate hands-on:
1. Reload .647 with Gesture Debug ON.
2. Select Face -> Extrude -> successful Through.
3. Lift Pencil.
4. Put Pencil on clear viewport background and drag.
5. Expect PEN ORBIT ROUTE with route=FORWARD_ORBIT.
6. Expect PEN ORBIT FORWARDED.
7. Camera must rotate on that same drag.
8. Quick test Face selection remains normal.
9. Sweep session remains untouched.

If Pencil starts directly on mesh:
- Existing policy intentionally routes geometry contact to selection rather than OrbitControls.
- For this regression test, begin the orbit on clear viewport background.

Protected:
- .640 interaction checkpoint.
- .642 Selection Hub.
- .643 Sweep viewport session.
- Through topology/build/gate.
- Face-direct .645 capture release.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
