## v0.36.18.558 — selection mode dock position correction

- User reported .557 selection modes appeared at the very top of the screen instead of bottom-left.
- Root cause: `#selectionModes` was still physically inside the top header, so CSS-only fixed positioning did not produce the intended dock in the current app layout.
- .558 moves the existing `#selectionModes` element out of `header.topbar` and into `#viewportWrap`, immediately after the canvas.
- The same element ID, buttons, active classes and mode handlers are preserved.
- Viewport-scoped CSS now positions the dock absolutely at bottom-left with safe-area offsets and explicitly clears top/right.
- No mode logic, gizmo logic or gesture logic changed.
- Static relocation regression 9/9 PASS.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Frozen Beta 5 v0.36.18.538 untouched.

Hands-on check:
1. Confirm Vertex / Edge / Face / Object appears at the actual bottom-left of the viewport.
2. Confirm all four modes still switch/highlight correctly.
3. Confirm it does not overlap the bottom status text or left tool drawer.
4. Confirm navigation gestures remain unchanged.

