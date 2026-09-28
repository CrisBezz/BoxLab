## v0.36.18.557 — bottom-left selection mode dock

- First incremental UI/UX pass after verified .556 Nomad round-trip checkpoint.
- Vertex / Edge / Face / Object selector moved visually to the bottom-left for easier iPad thumb/Pencil access.
- Layout-only change: existing `#selectionModes` DOM, IDs, buttons, active-state logic and mode handlers are unchanged.
- Implemented with a fixed safe-area-aware dock rather than moving selection logic or rebuilding the header.
- Button target height increased to 42px for touch access.
- Mobile breakpoint keeps icon-only compact behaviour.
- No gizmo or gesture changes in this build.
- Automated static regression 6/6 PASS.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Frozen Beta 5 v0.36.18.538 untouched.

Hands-on check:
1. Confirm Vertex / Edge / Face / Object now appears bottom-left in landscape iPad.
2. Confirm all four modes switch exactly as before.
3. Confirm active mode highlight follows correctly.
4. Confirm the dock does not block important Selection/Active Tools controls or the bottom status text.
5. Confirm orbit/pan/zoom/Undo/Redo behaviour is unchanged.

Next planned UI/UX task after PASS: unified Move / Rotate / Scale gizmo, object-mode first.

