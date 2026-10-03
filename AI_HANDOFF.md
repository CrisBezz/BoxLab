## v0.36.18.689 — radial Face Delete hub cleanup

Current release:
- v0.36.18.689

Hands-on protected:
- .684 radial Knife viewport session: PASS.
- .682 Pencil/Object routing reliability: PERFECT / PASS.
- .688 restored known-good Loop Cut / Loop Slide feel: PASS.

.689:
- Continues Face-ring cleanup with Delete.
- Face Delete itself was already a correct authoritative one-shot action.
- No new panel added.
- Same Selection Hub cleanup pattern as protected .677 Edge Delete:
  - after radial Face Delete, clear hubSuppressedKey
  - if a valid Face selection remains, return closed puck immediately
  - if selection clears, keep hub hidden
  - the next Face selected must receive a fresh puck immediately
- No Face Delete topology/history logic changed.

Immediate hands-on:
1. Select Face(s) -> puck -> Delete.
2. Faces should delete once; no extra panel.
3. If selection clears, tap any surviving Face.
4. Puck should appear immediately.
5. If a valid Face selection happens to remain, puck should return on it.
6. Regression: .688 Loop Cut remains protected.

Next after PASS:
- Face ring is close to complete; reassess Sweep/Shell/Knife/Extract/Duplicate lifecycle for any remaining real gaps before moving into broader modeless gesture work.

Protected:
- .688 Loop Cut core.
- .684 Knife session.
- .682 Object/Pencil contract.
- existing Face Delete owner.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
