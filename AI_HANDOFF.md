## v0.36.18.649 — restore Selection Hub puck after direct Face tools

Current release:
- v0.36.18.649

Hands-on finding:
- Extrude -> puck reappears.
- Inset -> puck did not reappear.

Root cause:
- radial launch sets hubSuppressedKey to the current selection key.
- Hub suppression previously cleared only when selectionKey changed.
- Inset can complete while keeping the exact same Face selection, so suppression survived.

.649:
- total-gizmo listens to existing boxlab-face-direct-committed.
- For tool=extrude or tool=inset:
  - if current mode is Face and a valid selection remains,
  - clear hubSuppressedKey,
  - set hub state CLOSED,
  - show puck immediately.
- Direct tool remains authoritative and may remain armed.
- No modelling geometry code changed.

Immediate hands-on:
1. Face -> radial Tools -> Inset.
2. Perform Inset.
3. Closed puck must reappear immediately.
4. Tap puck -> Gizmo -> centre -> Tools to confirm normal cycle.
5. Repeat with Extrude; same result.
6. Confirm Face selection remains intact.
7. Sweep remains unchanged.

Protected:
- .640 interaction checkpoint.
- .642 Selection Hub state model.
- .643 Sweep viewport session.
- .648 Pencil-orbit work.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
