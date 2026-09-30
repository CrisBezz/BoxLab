## v0.36.18.617 — modeless double/triple-tap selection expansion

- .616 hands-on PASS and protected Group/Multi gizmo routing baseline.
- Resumed the parked modeless interaction roadmap.
- .617 adds one shared multi-tap primitive for Vertex / Edge / Face using the existing component tap owner.
- Gesture semantics:
  - single tap on unselected component: existing additive select
  - single tap on selected component: existing tap-to-remove
  - double-tap same component: invoke existing Grow selection command
  - triple-tap same component: invoke existing Connected selection command
- No new topology solver was added.
- Grow / Connected buttons remain the authoritative selection operations.
- Tap chain requirements:
  - same component
  - within 360 ms between taps
  - within 22 px
- Drag, long-hold, timeout, background tap, or mode change breaks the tap chain.
- Edge long-press + horizontal scrub Loop/Ring remains unchanged and authoritative.
- Background deselect remains unchanged.
- Object / Group / Multi selection and gizmo ownership remain unchanged.
- .615/.616 gizmo architecture untouched.
- Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.
- HTML shell, main.js pin and version.json synced to 0.36.18.617.

Hands-on checks:
1. Face single tap selects; selected Face single tap removes.
2. Face double-tap grows one adjacency step.
3. Face triple-tap selects the connected face island.
4. Edge double-tap grows adjacent edges.
5. Edge triple-tap selects connected edge structure.
6. Vertex double-tap grows adjacent vertices.
7. Vertex triple-tap selects connected vertex structure.
8. Edge long-press/scrub still enters Loop/Ring candidate browser rather than multi-tap.
9. Deliberate component drag does not trigger Grow/Connected afterward.
10. Background tap still deselects all.
11. Gizmo regression: Vertex/Edge/Face/single Object unchanged.
12. Group/Multi gizmo regression from .616 unchanged.

Next if PASS:
- continue modeless interaction roadmap with tap-drag selection / contextual gesture work.
