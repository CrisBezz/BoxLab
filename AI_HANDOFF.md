## v0.36.18.571 — Total Gizmo black-fill bug fix + thinner idle graphics

- User screenshot of .570 showed a large black circular background and only the blue/Z rotation arc reading clearly.
- Root cause: invisible SVG hit-target clones had `.tg-handle` removed, which also removed `fill:none`; SVG default fill therefore rendered cloned circles/ellipses solid black over the visible gizmo.
- .571 fixes hit proxies with explicit `fill:none` both as attribute and CSS.
- This should expose all X/Y/Z rotation arcs instead of the hit proxies obscuring red/green.
- Idle graphics are substantially slimmed:
  - axis shafts 1.35px
  - rotation arcs 1.05px
  - screen rotate ring 1.05px
  - uniform scale ring 1.1px
  - scale nodes 1.25px outline
  - center puck 1.1px outline
- Hover/active handles thicken to 3px only when targeted.
- Invisible hit strokes remain 16px, preserving easy Pencil/finger selection despite thin visible linework.
- No transform logic changed.
- Syntax/static regression 9/9 PASS.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. Confirm the black circular background is completely gone.
2. Confirm red, green and blue rotation arcs are all visible.
3. Confirm idle linework feels significantly thinner/lighter.
4. Confirm handles are still easy to hit despite thin graphics.
5. Confirm hover/active target thickens clearly.
6. Confirm transforms and navigation remain unchanged.

