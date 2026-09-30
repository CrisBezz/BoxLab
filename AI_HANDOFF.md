## v0.36.18.605 — additive modeless Loop/Ring selection sessions

- .604 hands-on PASS for Loop ↔ Ring cycling on the same seed.
- User identified the missing interaction: adding additional modeless Loop/Ring results to the current selection.
- .605 makes Edge hold selection additive:
  - long-press seed A → Loop A
  - long-press seed B → existing selection + Loop B
  - long-press seed C → existing selection + Loop C
- Same-seed cycling remains local to that seed contribution:
  - if seed B was last added as Loop B, repeat hold B replaces only B's contribution with Ring B
  - repeat again replaces only B's contribution with Loop B
  - the previously accumulated base selection remains intact
- The hold owner snapshots the base selection before invoking the existing Loop/Ring selector, then merges the proven selector result back into the base.
- Ambiguous / failed Loop or Ring selection:
  - does not erase the existing base selection
  - resets the cycle rather than guessing
- Background tap still clears the entire selection/session.
- Ordinary Edge tap select/deselect remains unchanged.
- Finger/touch remains excluded from hold gestures.
- Existing Loop and Ring commands remain the topology authorities; no duplicate tracing logic added.
- .602 gizmo soft catches and .601 Files-based Nomad handoff remain unchanged.
- HTML shell, main.js pin and version.json are synced to 0.36.18.605.
- Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.

Hands-on check:
1. Confirm .605 loads and stays .605.
2. Long-press seed A → Loop A.
3. Long-press a different seed B → Loop A + Loop B.
4. Long-press seed B again → Loop A + Ring B.
5. Long-press seed B again → Loop A + Loop B.
6. Add a third seed C and confirm all accumulated selections remain.
7. Try an ambiguous seed: existing selection should remain untouched.
8. Background tap clears everything.
9. Ordinary Edge tap and finger navigation remain unchanged.

Next:
- If .605 passes, park modeless Edge selection and begin Vertex / Edge / Face Total Gizmo integration.
