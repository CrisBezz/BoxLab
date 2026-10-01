## v0.36.18.648 — Pencil contact classification fix

Current release:
- v0.36.18.648

Hands-on:
- .643 Sweep viewport session: AWESOME / PASS.
- .647 Pencil orbit still FAIL.
- User confirms finger orbit works normally.

New evidence / exact Three.js r179 audit:
- OrbitControls onPointerDown treats pointerType='touch' as touch.
- All other pointer types, including 'pen', go through _onMouseDown/_onMouseMove.
- Therefore Pen orbit is supported by the same pointer stream if BoxLab lets it through.
- BoxLab was classifying Pencil hover solely from pressure==0.
- This can swallow contact pointermove events when iPad reports transient pressure=0.

.648 fix:
- isPenContact(event):
  - false for pointerup/pointercancel
  - true when pointerType='pen' AND ((buttons & 1)===1 OR pressure>0)
- isPenHover = pen && !isPenContact
- True hover remains swallowed.
- Contact moves are allowed through.
- Added PEN ORBIT MOVE FORWARD and PEN ORBIT MOVE HOVER BLOCK diagnostics.
- .647 explicit OrbitControls registration remains.
- No selection arbitration policy changed.

Immediate hands-on:
1. Gesture Debug ON.
2. Successful Through.
3. Start Pencil orbit on clear viewport background.
4. Camera should rotate.
5. During drag expect PEN ORBIT MOVE FORWARD.
6. Hover after lift may show PEN ORBIT MOVE HOVER BLOCK / PEN HOVER SWALLOW.
7. Confirm finger orbit still works.
8. Confirm Face Pencil tap selection still works.

Protected:
- .640 selection interaction checkpoint.
- .642 Selection Hub.
- .643 Sweep viewport session.
- Through topology.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
