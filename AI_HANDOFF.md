## v0.36.18.644 — post-Through Pencil orbit release

Current release:
- Visible/app version: v0.36.18.644
- version.json and HTML shell title are synced to .644.

Hands-on status:
- .642 Selection Hub direct Face tools: BIG PASS.
- .643 Sweep viewport session: AWESOME / PASS.
- New regression found after Extrude Through: Apple Pencil could not orbit immediately after a successful Through.

Root cause:
- Successful Through clears Face selection by design.
- Extrude remained armed.
- With no selected Face, the armed Face-direct owner still captured the next background Pencil pointerdown, preventing Pencil-orbit from starting.

.644 fix:
- Only after SUCCESSFUL Through:
  - keep the existing committed Through mesh
  - clear Face selection as before
  - clear sequential/pending Face-direct state
  - disarm Extrude
  - sync direct-tool UI
  - emit boxlab-direct-tool-exclusive { tool:'none', reason:'through-complete' }
  - log FACE DIRECT THROUGH RELEASE
- Normal Extrude persistence is unchanged.
- Inset persistence is unchanged.
- Through kernel, seam-conformance gate and topology validation are unchanged.

Immediate hands-on:
1. Select a Face and perform Extrude Through.
2. Confirm Through result is correct/CLOSED.
3. Immediately use Apple Pencil on viewport background to orbit.
4. Orbit must start normally on that very next gesture.
5. Confirm Extrude button is no longer armed after Through.
6. Select another Face normally.
7. Quick normal Extrude: it should still remain armed/persistent as before.
8. Quick Sweep launch to confirm .643 is unaffected.

Protected:
- .640 interaction checkpoint.
- .642 Selection Hub.
- .643 Sweep viewport session.
- Through topology/build/gate logic.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
