## v0.36.18.616 — grouped / multi Object gizmo ownership correction

- .615 unified Vertex / Edge / Face / single Object semantic gizmo ownership and passed hands-on.
- New hands-on issue:
  - when a GROUP is selected, the gizmo acts only on the active object instead of the whole group.
- Root cause:
  - .615 classified multi-object ownership using __boxlabObjectSelection.multi.
  - object-origin.js intentionally masks .multi in some group/pivot transform contexts.
  - grouped selections can therefore expose multiple effective object ids while .multi is false.
  - .615 then incorrectly routed them into the single-Object semantic owner.
- .616 changes ownership classification only:
  - Object mode is "single Object" only when effective selection ids.size <= 1.
  - Any Object selection with ids.size > 1 is routed away from transform-upgrade's single-object owner and back through the established synthetic canvas route.
  - This includes ordinary Multi and Group-expanded selection.
- Existing group-aware transform owner in object-origin.js remains authoritative.
- Existing protected src/multi-object-transform.js?v=0.36.1.0 remains untouched.
- No group transform maths, origin maths or pivot rules changed.
- .615 single Object semantic gizmo path remains unchanged.
- .614 Face deselect and component Plane Move remain unchanged.
- Planned modeless .616 work was deferred; this bugfix owns the .616 version.

Hands-on checks:
1. Select a whole Group -> gizmo Move should move all group members together.
2. Group Scale should affect all members using existing group pivot rules.
3. Group Rotate should affect all members using existing group pivot rules.
4. Group X/Y/Z Move regression.
5. Group Free Move regression.
6. Single Object gizmo remains exactly as .615.
7. Vertex/Edge/Face gizmo remains exactly as .615.
8. Ordinary Multi-object Move/Scale/Rotate regression.
9. Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.

Next after PASS:
- Resume parked modeless interaction roadmap.
