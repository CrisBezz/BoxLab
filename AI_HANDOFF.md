## v0.36.18.564 — compact Selection panel sizing

- User requested the Selection panel match the agreed compact UI sizing.
- Existing Selection CSS had accumulated mixed 11px / 12px / 14px / 15px type sizes and 29px / 32px button heights.
- .564 standardises Selection controls:
  - regular control text: 12px
  - button height: 32px
  - consistent 5px × 6px padding
  - Selection heading: 12px
  - compact symbol-only grow/shrink/angle/normal buttons: 13px for legibility
  - angle/output text: 11px
- No selection logic or layout ownership changed.
- Bottom-left mode dock and .563 topbar real-estate cleanup remain intact.
- Automated static regression 8/8 PASS.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. Selection panel feels visually consistent with other compact tool controls.
2. Visible / Through / Lasso / Deselect / All / Invert use consistent text and height.
3. Loop / Ring / Boundary and grow/shrink controls no longer look oversized.
4. Selection heading hierarchy feels correct without wasting vertical space.
5. Selection behaviour is unchanged.

