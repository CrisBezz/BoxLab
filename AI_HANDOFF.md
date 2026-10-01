## v0.36.18.632 — Loop Cut commit cleanup

Current release:
- Visible/app version: v0.36.18.632
- Release manifest: version.json = 0.36.18.632

Current focus:
- Resume testing the .631 modeless Face/Edge hold ownership fix after verifying Loop Cut is clean enough to build a subdivided test mesh.

What changed in .632:
- Fixed repeated/random extra Loop Cuts caused by legacy src/loop-cut-commit.js.
- The old module replayed synthetic pointer taps over the finished yellow loop to convert it into edge selection.
- Under the current persistent direct Loop Cut owner, those synthetic taps were interpreted as more Loop Cut commands and created extra topology.
- The commit module now maps the finished yellow loop back to edge indices and selects them directly with __boxlabSelectionBridge.set('edge', indices).
- Existing Undo/Redo commit step remains in place to clear the temporary Loop Slide session while retaining the finished cut.
- No Loop Cut topology solver, Edge hold candidate solver, gizmo transform maths, or Group/Multi code changed.

Immediate hands-on:
1. Fresh cube -> Edge -> Loop -> Loops=1 -> tap one edge once.
2. Expect exactly one clean loop, not multiple/random extra loops.
3. Confirm Loop Slide still moves that one loop.
4. Add a second intentional loop and confirm only one additional loop is created.
5. If .632 passes, resume .631 Face/Edge hold tests on the subdivided mesh.

Protected:
- .631 global Face/Edge/pending-Paint release ownership via window capture remains unchanged.
- .615 unified semantic gizmo baseline remains protected.
- .616 Group/Multi routing remains protected.
- src/multi-object-transform.js?v=0.36.1.0 remains unchanged.
