## v0.36.18.687 — restore clicked-edge Loop Slide direction

Current release:
- v0.36.18.687

Hands-on protected:
- .684 radial Knife viewport session: PASS.
- .682 Pencil/Object routing reliability: PERFECT / PASS.

Recent Loop Cut strengthening:
- .685 restored traversal through generalized logical quads but produced malformed strips.
- .686 fixed strip reconstruction, but user reported Loop Slide direction felt reversed compared with original behaviour.

Root cause:
- generalized logical-quad traversal seeded direction from the logical face edge ordering.
- original Loop Cut behaviour derives direction from the actual physical edge the user touched.
- when a touched edge is only one segment of a promoted logical side, logical face ordering may be opposite to the physical touched-edge direction, effectively mapping t to 1-t.

.687:
- Adds logicalSeedDirection().
- The actual touched physical edge segment now determines logical seed direction.
- For promoted sides with collinear intermediate vertices:
  - locate the touched segment in the physical boundary chain
  - project that segment direction onto the logical side endpoints
- Propagation through subsequent quads inherits this restored direction.
- .686 deterministic strip reconstruction remains unchanged.
- No change to ordinary base Loop Cut fallback.

Immediate hands-on:
1. Retry exact .686 model/case.
2. Loop Cut should still traverse the strengthened logical-quad corridor.
3. Drag/slide direction should now match the direction expected from the touched edge, as before strengthening.
4. Reverse drag should reverse slide normally.
5. Confirm no malformed diagonal/sliver faces return.
6. Simple cube Loop Cut regression.

Protected:
- .684 Knife session.
- .682 Object/Pencil contract.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
