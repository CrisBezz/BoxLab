## v0.36.18.568 — Viewport ownership fix + far-right placement + compact Facegroups

- User reported .567 reintroduced ownership flashing around the Viewport control.
- Root cause: `view-modes.js` created `#viewModes` inside `.top-actions`, then `topbar-layout.js` touched/reordered that same element later.
- .568 makes `view-modes.js` the sole owner of Viewport placement:
  - Viewport is created with `topActions.append(wrap)`
  - therefore it appears at the far-right of the top action row from first paint
  - `topbar-layout.js` no longer queries/reparents/reorders Viewport
  - `.top-actions>#viewModes{margin-left:auto}` keeps it pushed right
- Existing right-edge Viewport flyout anchoring from .567 is retained.
- Facegroup Viewport controls are normalized to compact UI sizing:
  - buttons: 32px high / 12px text
  - range labels/outputs: 11px
  - compact slider rows and colour control
  - consistent gaps/padding
- No viewport camera/render behavior changed.
- Automated syntax/static regression 13/13 PASS.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. No Viewport ownership/reordering flash during startup.
2. Viewport button is at the far-right of the top action row.
3. Viewport flyout still opens at the right border.
4. Facegroup panel buttons/text/sliders match compact BoxLab sizing.
5. All Facegroup palette/sliders/reset/reseed controls still work.

