## v0.36.18.683 — radial Extract Faces Object handoff

Current release:
- v0.36.18.683

Hands-on protected:
- .676 guided radial Edge Bridge: PASS.
- .677 Edge radial one-shot cleanup: PASS.
- .678 Duplicate Faces: works great.
- .682 Pencil/Object routing reliability: PERFECT / PASS.

.683:
- Continues Face-ring/modeless polish with Extract Faces.
- Existing extract-faces.js remains authoritative for:
  - removing selected Faces from source when possible
  - preserving source object when extracting all Faces
  - compacting extracted mesh
  - preserving facegroups/creases
  - creating Extracted Faces as a new object
  - scene-level undo transaction
- Added boxlab-face-extract-complete semantic event after successful Extract.
- Total Gizmo consumes the event and immediately activates Object transform on the new extracted object.
- .682 Object lifecycle remains in force:
  - finger/Pencil background tap dismisses gizmo
  - Pencil drag orbits
  - object remains selected
  - tapping object restores gizmo
- No Extract topology kernel duplicated or changed.

Immediate hands-on:
1. Select one or more Faces.
2. Puck -> Face tools -> Extract.
3. Source selected Faces should be removed (unless all Faces were selected, in which case source remains intact by design).
4. New Extracted Faces object becomes active in Object mode.
5. Object gizmo appears immediately.
6. Move extracted object away.
7. Finger/Pencil tap background -> gizmo dismisses.
8. Tap extracted object -> gizmo returns.
9. Undo -> source/new-object transaction restores together.

Next after PASS:
- Audit Knife session completion/cancel interaction for radial launch, then Face Delete one-shot cleanup if needed.

Protected:
- .682 Object/Pencil contract.
- existing Extract topology/history owner.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
