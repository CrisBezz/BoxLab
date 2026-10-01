## v0.36.18.641 — Make Unique authoritative materialization

Current release:
- Visible/app version: v0.36.18.641
- version.json and HTML shell title are synced to .641.

Protected checkpoint:
- v0.36.18.640 is hands-on PASS for the completed interaction branch:
  - modeless Vertex / Edge / Face selection gestures
  - horizontal Face/Edge candidate browsing
  - vertical Grow/Shrink scrubbing
  - truly dormant component gizmo puck
  - explicit gizmo activation/collapse ownership
  - armed Face-tool selection/deselection
  - reliable Extrude/Inset global release completion
- Do not reopen that interaction architecture without a concrete regression.

Why .641 exists:
- Roadmap Phase C still listed Make Unique robustness/polish.
- Audit found inactive Make Unique relied on object.mesh already containing the latest evaluated linked instance.
- Authoritative linked state is source mesh + instanceMatrix, so cached object.mesh should not be trusted as the detach source.

.641 behavior:
- Before removing sourceId / instanceMatrix, Make Unique evaluates source mesh through the object's current instanceMatrix.
- That evaluated world mesh becomes the new standalone object mesh.
- Active live mesh is refreshed from exactly the same materialized result.
- Multi Make Unique still uses the existing one-scene Undo checkpoint.
- Remaining linked peers stay linked and unchanged.

Immediate hands-on:
1. Create a Linked Duplicate and move/rotate/scale the copy away from its source.
2. Make the moved copy Unique while it is active. It must not jump.
3. Create another linked pair, transform the inactive copy, select it through Multi/Outliner and Make Unique. It must not jump.
4. Edit geometry on the unique copy: former peers must not change.
5. Edit one still-linked peer: its linked peers must still update.
6. Undo Make Unique: shared editing/link metadata should return.
7. Redo: unique object should return at the same placement.

Protected:
- .640 interaction checkpoint.
- existing instance placement/source geometry contract.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
