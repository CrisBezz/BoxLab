## HANDS-ON RESULT — v0.36.18.612 PASS

- User confirmed .612 works perfectly.
- Direct Vertex / Edge / Face Total Gizmo ownership is now proven.
- The root blocker was the incorrect call to SweepPath.editing as a function.
- Preserve the .612 direct semantic handoff architecture.
- Do not revert to synthetic component pointerdown routing.
- Next build:
  - remove temporary GIZMO DEBUG panel
  - keep Object gizmo behavior unchanged
  - continue component gizmo polish only from the .612 owner path
  - verify component exact-entry / multi-selection / pivot/orientation as needed
- Protected src/multi-object-transform.js?v=0.36.1.0 remains unchanged.

## v0.36.18.612 — fix component gizmo owner exception

- .611 diagnostic screenshot identified the exact runtime failure:
  - TypeError: globalThis.__boxlabSweepPath?.editing is not a function
- Root cause:
  - SweepPath exposes editing as a getter/boolean property.
  - transform-upgrade incorrectly called it as editing?.().
  - This threw during beginGizmoGesture() after OWNER REQUEST and before OWNER BEGIN.
  - Total Gizmo then fell back to the old synthetic path, explaining why the face could move but ignored the requested X axis.
- .612 fixes both transform entry guards to read:
  - globalThis.__boxlabSweepPath?.editing
  instead of calling it.
- EdgeExtrude.isArmed remains a function and is unchanged.
- Diagnostic panel remains for one verification build.
- Expected successful chain:
  - HANDLE DOWN
  - OWNER REQUEST
  - OWNER BEGIN
  - HANDOFF OK
  - MOVE
  - OWNER FINISH
  - GIZMO POINTERUP
- No other transform math changed in this build.
- HTML shell, transform-upgrade pin, Total Gizmo pin and version.json synced to 0.36.18.612.
- Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.

Hands-on check:
1. Face mode -> select one face.
2. Drag X Move arrow.
3. Confirm face moves only on X.
4. Confirm debug reaches OWNER BEGIN / HANDOFF OK / MOVE / OWNER FINISH.
5. If that passes, quickly test Y/Z Move and one axis Scale.
6. Do not yet remove diagnostics until component gizmo path is proven.

Next:
- If .612 reaches the direct owner, resume component transform fixes from the now-correct runtime path.
