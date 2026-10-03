## v0.36.18.686 — logical-quad Loop Cut strip reconstruction fix

Current release:
- v0.36.18.686

Hands-on protected:
- .684 radial Knife viewport session: PASS.
- .682 Pencil/Object routing reliability: PERFECT / PASS.

.685 result:
- Previously failing Loop Cut path now traverses the logical quad corridor.
- User reported bad long/sliver/diagonal faces after cut.

Root cause:
- .685 traversal was correct, but splitLogicalFace() could choose the wrong outer boundary connector between the two cut sides.
- That paired endpoints across the face incorrectly and created malformed polygons.

.686:
- Keeps .685 generalized logical-quad recognition.
- Replaces ambiguous connector reconstruction with deterministic logical-quad strip rebuilding.
- The two cut sides must be opposite logical sides.
- The two untouched sides are the only valid outer connectors.
- First strip inherits one untouched boundary chain.
- Last strip inherits the other untouched boundary chain.
- Interior strips are clean bands between corresponding cut points.
- Existing collinear detail along the two cut sides is preserved inside the appropriate strip.
- Genuine ngons/poles remain stops.
- No second Loop Cut kernel added.

Immediate hands-on:
1. Retry exact screenshot model/case.
2. Loop Cut should still traverse the corridor.
3. New faces should be clean strips — no long diagonal/sliver faces.
4. Slide the loop and release.
5. Inspect the opening/detail side carefully.
6. Try Loop count >1.
7. Simple cube Loop Cut remains unchanged.

Protected:
- .684 Knife session.
- .682 Object/Pencil contract.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
