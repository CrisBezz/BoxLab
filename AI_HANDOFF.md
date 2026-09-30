## v0.36.18.604 — modeless Edge Loop ↔ Ring hold cycling

- .603 hands-on PASS:
  - Edge Pencil long-press Loop selection works well.
  - strict refusal-to-guess behavior is approved and protected.
- .604 extends the SAME Edge hold owner:
  - first long-press on an edge → Loop
  - repeat long-press on the same seed edge, while the previous modeless result is still the active selection → Ring
  - repeat again on the same seed/result session → Loop
- Ordinary tap is NOT used for cycling, so existing Edge tap select/deselect behavior remains intact.
- Changing seed edge, background-deselecting, transforming, or changing selection mode resets the cycle to Loop-first.
- Loop still uses the existing strict Loop selector.
- Ring still uses the existing Ring selector.
- No duplicate topology tracing was added in main.js.
- Finger/touch remains excluded from Edge hold gestures, protecting one-finger orbit.
- .602 gizmo soft-catch behavior remains unchanged.
- .601 Files-based Nomad handoff remains unchanged.
- HTML shell, main.js pin and version.json are synced to 0.36.18.604.
- Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.

Hands-on check:
1. Confirm .604 loads and stays .604.
2. Edge mode: long-press a clean seed edge → Loop selects.
3. Long-press the same seed edge again → Ring selects.
4. Long-press the same seed edge again → Loop selects again.
5. Change to another seed edge → first long-press must start with Loop again.
6. Tap background to deselect, then long-press → starts with Loop again.
7. Ordinary Edge tap select/deselect remains unchanged.
8. Finger orbit/pan/zoom remains unchanged.
9. Ambiguous Loop topology must still refuse rather than guess.

Next:
- If .604 passes, move to component Total Gizmo integration before adding more modeless transform gestures.
