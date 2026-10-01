## v0.36.18.650 — lifecycle-tracked Pencil contact

Current release:
- v0.36.18.650

Hands-on status:
- .643 Sweep viewport session: AWESOME / PASS.
- .648 Pencil orbit still FAIL.
- Finger orbit works.

Diagnosis:
- pressure/buttons cannot reliably distinguish Pencil contact from hover on iPad move events.
- A Pencil can apparently remain in physical contact while move reports pressure=0 and buttons=0.
- Therefore classifying every move independently is wrong.

.650 fix:
- activePenContacts Set added in pencil-orbit-gate.
- Pencil pointerdown with real contact marks pointerId active.
- All later pointermove events for that pointerId are contact regardless of pressure/buttons.
- window capture pointerup/pointercancel clears pointerId.
- This cleanup does not depend on canvas release propagation.
- pressure/buttons remain only fallback for untracked events.
- PEN ORBIT MOVE FORWARD / HOVER BLOCK now include contactTracked.

Immediate hands-on:
1. Gesture Debug ON.
2. Successful Through.
3. Start Pencil orbit on clear viewport background.
4. Camera should rotate.
5. During drag expect PEN ORBIT MOVE FORWARD with contactTracked=true.
6. Lift Pencil; hover should again be swallowed.
7. Finger orbit must still work.
8. Face Pencil tap selection must still work.

Protected:
- Selection-vs-orbit mesh-hit policy unchanged.
- .640 selection checkpoint.
- .642 Selection Hub.
- .643 Sweep viewport session.
- .649 puck restore.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
