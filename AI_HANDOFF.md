## v0.36.18.579 — projected rotation ring visible-path selector fix

- .578 hands-on FAIL: projected rings still invisible.
- Root cause: each ring's invisible hit-proxy clone is inserted before the visible path and retains the `.tg-arc` class.
- `syncRotationRings()` used a generic `.tg-arc[data-ring-axis]` selector, so it updated the transparent hit proxy first while the visible coloured path remained `d=""`.
- .579 explicitly targets `.tg-handle.tg-arc[data-ring-axis]` for the visible ring, then copies that generated path to its linked hit proxy.
- No ring math or transform logic changed.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Syntax/static regression 4/4 PASS.

Hands-on check:
1. Red/green/blue projected rotation rings are visible.
2. Rings deform with camera perspective.
3. Hit paths follow the visible rings.
4. X/Y/Z rotation remains correct.

