## v0.36.18.609 — direct component Total Gizmo handoff

- .608 hands-on FAIL: user reported component gizmo behavior appeared effectively unchanged across Face / Edge / Vertex.
- Deployment was verified successful, so this was not a stale-build issue.
- Structural root cause addressed:
  - component Total Gizmo previously pressed an SVG handle, then fabricated a synthetic canvas pointerdown and relied on transform-upgrade to reconstruct tool/constraint from global/UI state
  - this indirect bridge was fragile on iPad and could silently fall through to legacy/main.js behavior
- .609 removes the synthetic bridge for Vertex / Edge / Face:
  - Total Gizmo passes the REAL pointer event plus exact handle spec {tool,constraint,kind} directly to transform-upgrade
  - transform-upgrade exposes beginGizmoGesture(spec,event) as the semantic component transform entry point
  - component gesture state is created directly from the current selection vertex set and gizmo spec
  - the pressed SVG handle captures the real pointer for the drag
- Object mode retains its existing synthetic handoff for now because Object gizmo is hands-on proven.
- .608 ownership rules remain:
  - component transform-upgrade is gizmo-only
  - ordinary viewport component drags remain main.js owned
  - gizmo no-drag click does not toggle selection
  - axis Scale uses axis-projected gesture motion
- Selection centroid pivoting remains from .607.
- .606 modeless Edge selection and .601 Files-based Nomad handoff unchanged.
- HTML shell, Total Gizmo pin, transform-upgrade pin and version.json synced to 0.36.18.609.
- Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.

Hands-on check:
1. Confirm .609 loads and stays .609.
2. Face: drag X/Y/Z Move arrows. Movement must follow the selected world axis.
3. Face: drag X/Y/Z Scale nodes. Only that axis scales; Uniform Scale remains uniform.
4. Face Rotate regression.
5. Edge: axis Move on single and multi-edge selection.
6. Edge: Free Move on multi-edge selection.
7. Edge: axis Scale drag.
8. Edge: click/release Scale node -> floating exact input -> value applies without losing selection.
9. Vertex: select multiple vertices, then test axis Move / Scale / Rotate.
10. Gizmo handles near mesh edges should not fall through to orbit.
11. Object gizmo regression.
12. .606 Edge hold/scrub regression.

Next:
- If .609 still behaves like .607, add a visible runtime owner diagnostic before changing transform math again.
