## v0.36.18.611 — expose component gizmo handoff exception

- .610 diagnostic result from iPad:
  - Face X Move press reached OWNER REQUEST.
  - It never reached OWNER BEGIN, HANDOFF OK, HANDOFF FAIL or MOVE.
  - Release only showed GIZMO POINTERUP.
- Conclusion: beginGizmoGesture() is throwing before it can return.
- .611 adds a try/catch around the direct component handoff in Total Gizmo.
- The debug panel now reports:
  - HANDOFF EXCEPTION • <ErrorName>: <message>
- No transform behavior changes in .611.
- Purpose: reveal the exact runtime exception before changing owner setup.
- HTML shell, Total Gizmo pin and version.json synced to 0.36.18.611.
- transform-upgrade remains pinned at .610 because its behavior did not change.
- Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.

Hands-on diagnostic:
1. Load .611.
2. Face mode -> select one face.
3. Press the X Move gizmo arrow once.
4. Read/send the GIZMO DEBUG .611 line.
5. Expected useful output: HANDOFF EXCEPTION with the exact JavaScript error.

Next:
- Fix only the exact exception reported by .611.
