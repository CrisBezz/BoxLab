## v0.36.18.565 — left tool drawer scroll boundary above mode dock

- User confirmed Selection is back in the desired original drawer position, but the left tool drawer still scrolls underneath the bottom-left mode strip.
- Root cause: the drawer still used a loose max-height, so its scroll box extended behind the mode dock.
- .565 replaces that with a hard bottom boundary:
  - normal layout: `bottom:104px; max-height:none`
  - compact/mobile layout: `bottom:96px; max-height:none`
- This makes the scroll container physically end above the Vertex / Edge / Face / Object dock.
- Selection remains inside the drawer.
- Mode dock remains bottom-left.
- Topbar/Viewport layout from .563/.564 remains unchanged.
- Automated syntax/static regression 5/5 PASS.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. Scroll the left tool drawer to the very bottom.
2. Final controls must stop above the mode dock and remain fully visible/clickable.
3. Selection remains at the top of the drawer.
4. Mode dock remains fixed bottom-left.
5. Navigation and selection behavior remain unchanged.

