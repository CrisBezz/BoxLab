## v0.36.18.652 — armed Extrude/Inset yields background Pencil to orbit

Current release:
- v0.36.18.652

Confirmed user diagnosis:
- Post-tool Pencil orbit still FAIL while Extrude/Inset remains armed.
- Manually deselecting Extrude/Inset from left toolbar immediately restores Pencil orbit.
- Therefore Face-direct tool ownership is the blocker.

Root cause:
- multi-face-direct document capture sees armed-tool background Pencil-down before OrbitControls.
- Previous no-hit branch:
  - created pendingBackgroundPress
  - preventDefault()
  - stopImmediatePropagation()
  - canvas.setPointerCapture()
- So the tool retained ownership and OrbitControls never received that Pencil-down.

.652 ownership rule:
- When Extrude or Inset is armed:
  - Pencil DOWN on a Face -> tool keeps ownership for repeat modelling.
  - Pencil DOWN on empty background -> tool is finished/disarmed and yields the SAME event to navigation.
- Background-yield path:
  - clear pending Face/background/selection state
  - clear sequential preference/reference visuals
  - armed=null
  - sync direct-tool UI/status
  - emit boxlab-direct-tool-exclusive {tool:'none', reason:'background-navigation'}
  - no preventDefault
  - no stopPropagation/stopImmediatePropagation
  - no pointer capture
- Therefore the same original event can reach Pencil orbit gate / OrbitControls naturally.

Immediate hands-on:
1. Select Face -> radial Extrude -> perform normal Extrude.
2. Extrude remains armed for repeat.
3. Put Pencil on clear background and drag WITHOUT manually touching the left toolbar.
4. Extrude should visibly disarm and camera should orbit on that same drag.
5. Repeat with Inset.
6. Confirm Pencil-down on another Face while tool remains armed still begins another Extrude/Inset.
7. Finger orbit unchanged.
8. Sweep remains PASS.

Protected:
- Face geometry unchanged.
- .640 modeless selection checkpoint.
- .642 Selection Hub.
- .643 Sweep viewport session.
- .649 puck restore.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
