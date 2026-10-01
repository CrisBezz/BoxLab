## v0.36.18.651 — deferred Pencil mesh-intent to OrbitControls

Current release:
- v0.36.18.651

Confirmed evidence from .650:
- Pencil move reaches OrbitControls: PEN ORBIT MOVE FORWARD.
- tracked=false during every move.
- Therefore OrbitControls never got the matching pointerdown.
- Finger orbit works.

Root cause:
- Pencil orbit gate permanently withheld pointerdown whenever Pencil started over editable mesh.
- That policy made model-started Pencil orbit impossible even though later moves were forwarded.

.651 modeless intent resolver:
- Pencil DOWN on editable mesh, with no active Face direct tool:
  - do not immediately forward to OrbitControls,
  - store DEFER_MESH_INTENT plus the pre-down selection.
- Release without deliberate movement:
  - normal component tap selection continues.
- Existing fired hold browser:
  - wins over orbit.
- Move >= 8 px:
  - dispatch boxlab-pencil-orbit-claim,
  - main cancels pending component tap/drag/hold ownership,
  - paint select cancels pending/active paint ownership,
  - gate restores the pre-down selection,
  - gate replays the original down into the actual OrbitControls down listener,
  - subsequent real moves rotate normally.

Ownership priority:
1. active modelling tool
2. fired hold/browser gesture
3. deliberate Pencil navigation drag
4. tap selection

Immediate hands-on:
1. After Through, put Pencil directly on the model and drag >=8 px.
2. Camera should rotate.
3. Existing Face selection should remain unchanged during orbit.
4. Gesture Debug should show PEN ORBIT DEFER CLAIM.
5. Following moves should show tracked=true.
6. Pencil TAP a Face: still select/deselect, no orbit.
7. Pencil HOLD a Face: contextual hold browser still works.
8. Quick Extrude/Inset drag: modelling tool still owns it.
9. Finger orbit unchanged.
10. Sweep remains PASS.

Protected:
- .640 modeless selection checkpoint.
- .642 Selection Hub.
- .643 Sweep viewport session.
- .649 puck restore.
- Through geometry/gate.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
