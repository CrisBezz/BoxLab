## v0.36.18.561 — mode dock clearance + no startup flash

- User reported .559 mode dock location is correct, but the scrolling tool drawer runs behind it.
- User also reported a startup flash where the mode selector briefly appears in its original top/header location before moving to bottom-left.
- .560 introduced reserved bottom clearance for the left scrolling tool drawer so its final controls stop above the mode dock.
- .561 adds startup flash suppression:
  - base CSS keeps `#selectionModes` hidden in its initial header state
  - it becomes visible only after `topbar-layout.js` reparents it into `#viewportWrap`
- The runtime-owned bottom-left dock from .559 remains the single layout owner.
- BoxLab/version topbar branding remains intact.
- No selection logic, gizmo logic, gesture logic or protected transform logic changed.
- Automated syntax/static regression 9/9 PASS.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Frozen Beta 5 v0.36.18.538 untouched.

Hands-on check:
1. Confirm no top-position flash on load.
2. Confirm mode dock remains bottom-left.
3. Scroll the left tool drawer fully down: final controls/sections must remain visible above the mode dock.
4. Confirm BoxLab/version remain visible at the top.
5. Confirm mode switching and navigation gestures remain unchanged.

