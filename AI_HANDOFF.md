## v0.36.18.597 — transform-menu gizmo transient reset

- User reported that clicking anything in the Transform menu could leave the Total Gizmo stuck.
- Root cause/audit:
  - Transform tool/constraint menu clicks changed transform arming state but did not explicitly clear Total Gizmo transient ownership.
  - Total Gizmo can retain transient fields such as active handle, pointer ID, explicit gizmo constraint, dragging dataset state, HUD state, and `__boxlabActiveGizmoDrag`.
- .597 adds a narrow `resetTransient()` API to Total Gizmo.
- Move / Scale / Rotate tool-button clicks and Free / X / Y / Z / Auto constraint clicks now call that reset before applying the new transform-menu state.
- The reset does NOT disarm the selected transform; it only clears stale gizmo drag/visual ownership so the gizmo returns to idle and remains reusable.
- Floating exact-entry UI is dismissed when the user deliberately changes transform menu state.
- .596 single-file iPad Share / Open In fix remains unchanged.
- Release-manifest correction: `version.json` is now synced to `0.36.18.597`. A stale `version.json` at `.595` was causing the live `.597` shell to flash briefly and then be rewritten back to `.595` by `release-version.js`.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. Select an object so Total Gizmo is visible.
2. Click Move, Scale, Rotate and several Free/X/Y/Z/Auto controls in the Transform menu.
3. After each click, confirm the gizmo remains idle, follows the object normally, and can immediately start a new gizmo drag.
4. Regression: gizmo floating exact-entry still appears after a completed Move/Rotate/Scale drag.
5. Regression: Share / Open In .596 still sends one model file only.

Next:
- If .597 passes, resume .595 Rotate/Scale soft-detent hands-on verification.
