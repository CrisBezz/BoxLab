# BoxLab .757 — Vertex Extrude viewport axis chooser

User PASS .756; explicitly requests Vertex Extrude method match Edge Extrude's
viewport axis chooser, avoiding old drawer XYZ controls.

Audit: Vertex Extrude already owns Free/XYZ drag and exact vectors with a contextual
panel. Its session unconditionally hid the gizmo. Edge Extrude already uses the
expanded Move arrows/centre as constraint controls, offset beside selected geometry.
Reuse that existing presentation and handle owner for Vertex Extrude. XYZ arrows
select world axis; centre selects Free, without arming Move or moving geometry.
Original Vertex Extrude pointer/kernel/history/Repeat/Exact owners unchanged.
Original top-centre Exact/Repeat/Done and optional local direction buttons remain.
Chooser survives new-tip selection, highlights current direction, shows Free/axis
badge, hides Rotate/Scale/plane handles and retires on session exit. During live
pulls axis changes refuse. Closing hub discards preview through existing owner.
Edge remains XYZ / Plane perpendicular to edge; not changed to Vertex Free semantics.

10 new behavioral checks cover actual gizmo sync/handle/visual/session functions,
existing Vertex owner real Pencil pull, signed direction/exact/history and Edge
constraint event. Focused52PASS. Full Node24:1906tests/1804PASS/102FAIL/0skip;
all102failure names identical to .756, no exclusions. An extracted Object hub test
now loads the new predicate together with setHubState; assertions unchanged.
Syntax and whitespace checks pass. Two runtime bodies only: total-gizmo and
Vertex session explanatory text/version. Original geometry owner unchanged.
Reviewed two hashes and shell/recovery/two module757 keys. Bevel756/Knife755/
Extrude752/core/protected main/Loop715/Multi/frozen betas unchanged.
Publication/actual Node22/live verification pending. Device .757 acceptance pending.

Manual checks:
- Vertex → Extrude: viewport arrows appear beside selection. Tap X/Y/Z then pull;
  tap centre Free and pull diagonally. Axis choice alone does not move the vertex.
- Extrude another selected tip; Exact and Repeat still work. Undo/Redo each pull.
- Done/background returns selection to puck and navigation; Edge Extrude unchanged.
