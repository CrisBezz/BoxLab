## v0.36.18.633 — dormant component gizmo + modeless browser ownership

Current release:
- Visible/app version: v0.36.18.633
- Release manifest: version.json = 0.36.18.633

Why .633 exists:
- .632 Loop Cut fix passed hands-on.
- Face hold browser then exposed two UX conflicts:
  1. sideways scrub was being claimed by Paint Select before candidate cycling;
  2. the full Total Gizmo created visual/interaction clutter during selection.

.633 behavior:
- Vertex / Edge / Face selection now displays a compact dormant transform puck at the selection centroid.
- Tap the puck to expand the existing Total Gizmo.
- Clicking Move / Scale / Rotate in the transform controls also expands it.
- Any component selection change collapses back to the puck.
- Object mode, grouped Object selection and Multi keep the existing full gizmo behavior.
- main.js exposes modeless Face/Edge browser ownership.
- edge-paint-select.js yields pending Paint Select once a hold browser has fired, so horizontal scrub belongs to the browser rather than paint selection.
- Ordinary Paint Select remains available when no hold browser is active.

Immediate hands-on:
1. Face mode: select a face. Expect only the small transform puck, not the full gizmo.
2. Tap the puck. Expect the full .615-style gizmo and confirm one Move handle quickly.
3. Select a different face. Expect the gizmo to collapse back to the puck.
4. Face long-press until first candidate appears, then scrub sideways. Expect multiple Face Loop/Ring/Coplanar/Connected candidates to cycle instead of painting adjacent faces.
5. Edge long-press and scrub Loop/Ring; verify the same ownership behavior.
6. Deliberately drag across unselected faces/edges without waiting for hold. Paint Select should still work.
7. Quick Object and Group/Multi gizmo regression only if 1–6 pass.

Protected:
- .615 unified semantic gizmo transform maths unchanged.
- .616 Group/Multi routing unchanged.
- .631 global release ownership unchanged.
- .632 Loop Cut commit fix unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
