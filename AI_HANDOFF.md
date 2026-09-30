## HANDS-ON RESULT — v0.36.18.615 PASS

- User confirmed .615 works perfectly.
- .615 becomes the unified semantic gizmo baseline for:
  - Vertex
  - Edge
  - Face
  - single Object
- Shared contract is now:
  - real gizmo pointer event
  - exact {tool,constraint,kind}
  - semantic transform owner
- X/Y/Z, XY/XZ/YZ Plane Move, Free Move, Scale, Rotate and exact entry are now consistent across those modes.
- True Multi-object transforms intentionally remain on protected src/multi-object-transform.js?v=0.36.1.0.
- Preserve .614 Face tap-to-remove.
- Preserve .606 Edge hold/scrub.
- Do not reintroduce synthetic pointerdown for Vertex/Edge/Face/single Object.

## v0.36.18.615 — unify single Object with semantic Total Gizmo handoff

- .614 hands-on PASS:
  - Face tap-to-remove works.
  - Component Plane Move works correctly.
- User identified Object Plane Move still behaved differently.
- Architecture audit confirmed:
  - Vertex / Edge / Face use direct semantic Total Gizmo handoff.
  - single Object previously still used the older synthetic canvas pointerdown path.
  - true Multi-object transforms are owned by protected src/multi-object-transform.js?v=0.36.1.0.

.615 change:
- Single Object mode now uses the same semantic gizmo contract as components:
  - real gizmo handle pointer event
  - exact {tool,constraint,kind}
  - direct call to transform-upgrade.beginGizmoGesture(spec,event)
- This gives single Object the same real world-plane Move semantics:
  - XY keeps Z fixed
  - XZ keeps Y fixed
  - YZ keeps X fixed
- Move / Scale / Rotate continue through transform-upgrade for single Object.
- Existing exact-entry logic remains in transform-upgrade.
- True Multi-object selection is explicitly detected as:
  - object mode
  - __boxlabObjectSelection.multi
  - selected ids.size > 1
- True Multi keeps the previous synthetic pointerdown route so protected multi-object-transform.js remains the owner.
- No changes to src/multi-object-transform.js?v=0.36.1.0.
- No changes to .614 Face deselect or component Plane Move behavior.
- HTML shell, Total Gizmo pin, transform-upgrade pin and version.json synced to 0.36.18.615.

Hands-on check:
1. Single Object X/Y/Z Move regression.
2. Single Object XY Plane Move -> Z fixed.
3. Single Object XZ Plane Move -> Y fixed.
4. Single Object YZ Plane Move -> X fixed.
5. Single Object Free Move regression.
6. Single Object axis/uniform Scale regression.
7. Single Object Rotate regression.
8. Single Object floating exact-entry regression.
9. Component Face/Edge/Vertex gizmo regression from .614.
10. Face tap-to-remove regression from .614.
11. True Multi-object Move / Scale / Rotate regression: must remain on protected owner.

Architecture note:
- Semantic gizmo front-end is now shared by Vertex / Edge / Face / single Object.
- True Multi-object remains the one deliberate exception until/unless its protected owner gets a safe semantic entry point.
