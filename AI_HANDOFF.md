## v0.36.18.566 — lower bottom mode dock / reclaim vertical space

- User requested maximum vertical viewport/tool-drawer space.
- .565 correctly stopped the tool drawer above the bottom mode dock, but the dock still sat conservatively high above the physical bottom edge.
- .566 lowers the mode dock close to the actual device safe-area bottom:
  - normal: `bottom:max(10px, env(safe-area-inset-bottom) + 6px)`
  - compact/iPad: `bottom:max(8px, env(safe-area-inset-bottom) + 4px)`
- The left tool drawer bottom boundary follows the dock downward:
  - normal: 72px
  - compact/iPad: 66px
- Drawer bottom padding reduced from 18px to 14px.
- This recovers roughly 20–30px of useful vertical tool space while keeping the mode dock reachable and clear of the safe-area edge.
- No mode logic, selection logic or navigation logic changed.
- Automated syntax/static regression 7/7 PASS.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. Mode dock sits noticeably closer to the bottom edge.
2. It still clears the iPad safe area/home indicator comfortably.
3. Tool drawer scroll still ends above the dock.
4. Final controls remain fully visible/clickable.
5. Navigation and mode switching remain unchanged.

