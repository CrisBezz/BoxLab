## v0.36.18.682 — Pencil/Object routing reliability

Current release:
- v0.36.18.682

Hands-on protected:
- .678 Duplicate Faces works great.
- .680 Total Gizmo loads again.
- .682 Pencil/Object routing reliability: PERFECT / PASS.
- Protected Object contract: finger/Pencil background tap dismisses gizmo; Pencil drag orbits; object tap restores gizmo.

User-reported .681 issues:
- Pencil background tap only dismisses gizmo sometimes.
- Pencil tap on object can select object but fail to restore gizmo.
- Gesture Debug showed raw Pencil down / hover swallow without reliable background-tap completion.

Root causes:
1. .681 background Pencil tap candidacy was created inside OrbitControls wrapped pointerdown, so it depended on OrbitControls receiving that down event.
2. Total Gizmo object re-open check used SelectionBridge.pick('object'), but the bridge picker historically mapped to component pickKind(); authoritative Object picking in main.js raycasts rendered body meshes.

.682:
- main.js now exposes authoritative pickObject(event) through __boxlabSelectionBridge.
- generic bridge pick('object',event) also routes to that same Object body picker.
- Total Gizmo objectHitAt() prefers pickObject().
- pencil-orbit-gate now starts background Pencil tap candidacy from window capture, independent of OrbitControls.
- candidate is only created for Pencil contact on viewport background with no modelling owner.
- Pencil orbit claim marks candidate as orbitClaimed, so drag/orbit still does not dismiss.
- stationary release emits boxlab-pencil-background-tap reliably.

Immediate hands-on:
1. Object gizmo active -> Pencil tap empty background repeatedly (5-10 times): should dismiss every time.
2. Tap object with Pencil -> gizmo should appear/reappear every time.
3. Repeat object/background alternation several times.
4. Pencil drag empty background -> orbit, not dismiss.
5. Finger behavior remains unchanged.

Protected:
- .678 Duplicate semantics.
- .675 navigation recovery.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
