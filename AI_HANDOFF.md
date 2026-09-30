## v0.36.18.619 — modeless multi-tap through gizmo overlay

- .618 hands-on FAIL: double/triple tap still did not work.
- User observed the Total Gizmo physically gets in the way of the second tap.
- Root cause:
  - tap #1 selects component and causes gizmo to appear.
  - tap #2 may land on gizmo SVG rather than viewport canvas.
  - modeless tap owner therefore never receives tap #2.
  - timing was not the primary blocker.
- .619 adds a gizmo-overlay continuation handoff:
  - main.js exposes __boxlabModelessTap.claimGizmoPointerDown(event)
  - while a valid rapid component tap chain is active, a gizmo pointerdown near the prior tap can be claimed by the modeless tap owner.
  - claimed gizmo taps do not arm or start a gizmo transform.
  - global pointer move/up/cancel completes that claimed tap through the same single modeless tap completion logic.
- Outside an active tap chain the gizmo behaves exactly normally.
- No gizmo delay or pointer-events disabling was added.
- Intended semantics remain:
  - single tap -> existing select/deselect
  - double-tap same component -> Grow
  - triple-tap same component -> Connected
- .615/.616 transform ownership remains untouched.
- Edge long-press/scrub remains untouched.
- Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.

Hands-on:
1. Face double-tap in area overlapped by gizmo -> Grow.
2. Face triple-tap -> Connected.
3. Repeat on Edge and Vertex.
4. Normal gizmo handle drag still works when not in a tap chain.
5. Single-tap selected component still removes.
6. Edge long-press/scrub still works.
