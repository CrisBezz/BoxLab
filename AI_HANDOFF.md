## v0.36.18.584 — direct exact transforms + Focus View activation fix

- .583 hands-on feedback:
  - Move exact type-in worked.
  - Rotate and Scale exact type-in still did not.
  - Focus View did not hide the left drawer.
  - Share/Open In remains inconclusive; user can already download GLB and open it in Nomad manually.
- .584 fixes the two BoxLab issues directly:
  - `transform-upgrade.js` now exposes a direct exact-transform API: `applyExact(tool,constraint,value)`.
  - Gizmo HUD exact entry no longer synthesizes Enter into the legacy value field; it calls that exact-transform API directly with the gizmo's tool/constraint/value.
  - Exact Rotate does not inherit the 15-degree drag snap; typed degrees are exact.
  - Exact Scale uses the same direct path and history/undo engine.
  - Gizmo HUD input gets explicit iPad touch/Pencil focus handling.
  - Focus View bug traced to stale `fullscreenBtn` handler branches after the rename.
  - Focus View now calls `toggleFocusView()` correctly.
  - Touch/Pencil Viewport actions use pointerup plus a 700ms synthesized-click suppression window, preventing Focus View from toggling on and immediately back off.
- Share/Open In is unchanged in this build.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 8/8 PASS.

Hands-on check:
1. Use gizmo Rotate, release, tap HUD, type exact degrees, Enter.
2. Confirm typed angle is exact even if 15° rotation snap is enabled.
3. Undo exact Rotate.
4. Use gizmo Scale, release, tap HUD, type factor, Enter.
5. Undo exact Scale.
6. Viewport > Focus View should hide the left drawer on the first tap and keep the top action row.
7. Exit Focus View should restore the left drawer.
8. Move exact type-in remains working.

