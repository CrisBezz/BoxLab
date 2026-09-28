## v0.36.18.559 — runtime-owned bottom-left selection mode dock

- .557/.558 hands-on FAIL: selection modes flashed/fought the UI and ended up at the top; BoxLab/version branding disappeared.
- Root cause identified in `src/topbar-layout.js`: runtime code explicitly called `row.append(selectionModes)`, reparenting `#selectionModes` into the top command bar after static HTML/CSS placement.
- .559 restores original header markup and removes the conflicting .557/.558 CSS relocation blocks.
- `topbar-layout.js` is now the single owner of the relocation:
  - initial DOM keeps `#selectionModes` in the original header position
  - runtime moves the same existing node into `#viewportWrap`
  - runtime CSS positions it bottom-left with safe-area offsets
- BoxLab + version branding is explicitly preserved in the topbar, including narrow layouts.
- No selection mode logic, gizmo logic, gesture logic or protected transform code changed.
- Runtime/static ownership regression 11/11 PASS.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Frozen Beta 5 v0.36.18.538 untouched.

Hands-on check:
1. Confirm no flashing/tug-of-war on load.
2. Confirm BoxLab + version remain visible at the top.
3. Confirm Vertex / Edge / Face / Object sits at the true bottom-left.
4. Confirm all four modes still switch/highlight normally.
5. Confirm navigation gestures remain unchanged.

