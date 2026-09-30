## v0.36.18.607 — Total Gizmo component integration, phase 1

- .606 hold/scrub Loop/Ring candidate browser is accepted for now and parked.
- Began the next major phase: Total Gizmo for Vertex / Edge / Face selections.
- Existing component transform owner in transform-upgrade.js already supports selected component vertex sets for Move / Scale / Rotate math.
- .607 opens only the gates needed for gizmo-owned component transforms:
  - Total Gizmo now appears for non-empty Vertex, Edge and Face selections.
  - Gizmo pivot is the centroid of the selected component vertices, not the whole object.
  - Object mode keeps the existing whole-object pivot behavior.
  - Gizmo-owned component Move / Scale bypass the direct viewport "must hit selected geometry" gate.
  - Component Rotate is now allowed only when the gesture came from Total Gizmo.
  - Direct viewport component Rotate remains blocked for now.
- Component vertex mapping:
  - Vertex mode -> selected vertices
  - Edge mode -> unique vertices of selected edges
  - Face mode -> unique vertices of selected faces
- Existing component selection is preserved during gizmo transforms.
- Existing soft catches / floating exact entry remain routed through the existing transform owner.
- No second transform system was added.
- .601 Files-based Nomad handoff and .606 modeless Edge selection remain unchanged.
- HTML shell, total-gizmo pin, transform-upgrade pin and version.json are synced to 0.36.18.607.
- Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.

Hands-on check:
1. Confirm .607 loads and stays .607.
2. Vertex mode: select one vertex -> gizmo appears centred on that vertex.
3. Vertex mode: select several vertices -> gizmo centres on their centroid.
4. Edge mode: select one/more edges -> gizmo centres on the selected edge vertex set.
5. Face mode: select one/more faces -> gizmo centres on the selected face vertex set.
6. Move using gizmo axis handles in Vertex / Edge / Face.
7. Scale using gizmo axis/uniform handles in Vertex / Edge / Face.
8. Rotate using gizmo rings in Vertex / Edge / Face.
9. Selection should remain selected after each transform.
10. Object-mode gizmo must remain unchanged.
11. Finger orbit/pan/zoom and .606 Edge hold/scrub selection must remain unchanged.

Next:
- If .607 passes, fix any component-specific pivot/axis/exact-entry issues, then make component gizmo behavior the unified transform baseline.
