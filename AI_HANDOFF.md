## v0.36.18.678 — radial Duplicate Faces restored

Current release:
- v0.36.18.678

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.
- .663/.664 Edge Extrude radial workflow: works really well.
- .670 radial Crease selection-first workflow: PERFECT / PASS.
- .675 navigation recovery: good for now / provisional PASS.
- .676 guided radial Edge Bridge: PASS.
- .677 Edge radial one-shot cleanup: PASS.

Strengthening list:
- Connected-chain Edge Bevel through ordinary 4-valence quad vertices remains recorded in ROADMAP.md.

.678:
- Begins Face-ring/modeless polish with Duplicate Faces.
- Audit found the radial Face ring already exposed Duplicate, but its existing authoritative owner src/duplicate-faces.js was not loaded by index.html.
- Reused and upgraded the existing Duplicate owner rather than creating a new kernel.
- Existing Duplicate semantics are preserved:
  - selected Faces are copied into a new object
  - source object remains unchanged
  - copied facegroups/creases are preserved by existing compactSelection path
  - new duplicate object enters Object mode
- duplicate-faces.js now emits boxlab-face-duplicate-complete and returns success.
- Total Gizmo listens for successful Duplicate completion and immediately opens Object transform gizmo on the newly created duplicate.
- This makes the radial flow:
  Face selection -> Duplicate -> new object selected -> Object transform gizmo ready.
- No new face topology/duplication implementation added.

Immediate hands-on:
1. Select one or more Faces.
2. Puck -> Face tools -> Duplicate.
3. Duplicate should now be available and execute.
4. Source remains unchanged.
5. New object should be selected and BoxLab should enter Object mode.
6. Transform gizmo should appear immediately on the duplicate.
7. Move/Rotate/Scale the duplicate to confirm clean handoff.
8. Undo should restore the scene transaction according to the existing Duplicate/Object history owner.
9. Regression: Extract remains unchanged.

Next after PASS:
- Continue Face-ring gaps: likely Extract handoff polish or Knife contextual lifecycle, depending on audit.

Protected:
- .677 complete Edge radial workflow.
- .675 navigation recovery.
- existing Duplicate Faces owner semantics.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
