## v0.36.18.567 — Viewport menu anchored to right edge

- User requested the Viewport flyout open against the actual right border rather than inward beneath its trigger.
- .567 changes the Viewport panel from trigger-relative absolute positioning to viewport-fixed positioning.
- Flyout now anchors to the app/device right safe-area edge with an 8px minimum margin.
- Top position remains directly below the main topbar.
- Width remains constrained for iPad/narrow layouts.
- Viewport trigger button stays in its current top-action position.
- No viewport commands or camera behavior changed.
- Automated syntax/static regression 5/5 PASS.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. Open Viewport.
2. Panel should sit flush to the right side with only the small safe-area margin.
3. It should no longer open about a quarter-screen inward.
4. All View Direction / Render Look controls remain usable.

