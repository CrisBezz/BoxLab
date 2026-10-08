# BoxLab .759 — Shared Vertex / Edge Extrude session UI

User rejects remaining UI/UX difference. Audit found Vertex top-centre Distance/
Apply Exact/Repeat/Done versus Edge chooser-only. .757/.758 aligned chooser/slots,
not full interface. Use Vertex interface as standard for both via SAME panel DOM,
styles, controls and lifecycle. No cloned panel or parallel extrusion kernel.
Existing Vertex settings owner accepts mode-specific Extrude adapter; other Vertex
sessions stay intact. Edge gets signed Exact/last-vector Repeat through its existing
boundary ribbon builder/private candidate validation/history. Exact applies chosen
axis (perpendicular projection for Edge) or last pull/view-up projected for Plane.
Repeat ON taps a boundary edge, same vector, new outer rail selected, one Undo.
Old direction rows and transform-strip settings hidden during both Extrude sessions.
Shared viewport XYZ arrows/Free centre; Edge centre labelled Free perpendicular
rather than Plane, preserving accepted perpendicular ribbon geometry. Vertex remains
view-plane Free. Same12-o’clock launch, offset chooser, popup and Done→puck/history.
Edge pointer owner retains direct pulls; context/cancel/capture protection, popup
click exemption and semantic completion added so shared controls cannot terminate
or compete with its session. Existing exclusive tool handoff preserves new owner.
Background policy uses Edge rendered hit ownership, protects Repeat from semantic
background delivery and closes Edge shared panel. No new raw background handler.
Edge restore includes facegroups; new ribbon labels explicitly null so committed
state and History clone agree. Source labels/creases retained; no provenance claim
for new ribbons beyond null. Extrusion geometry core unchanged.

10new behavioralPASS, focused62PASS. FullNode24:1916tests/1814PASS/102FAIL/0skip;
all102failure names identical to758. Actual shared DOM/controls, drawer/radial,
Pencil drag, Exact negative/refusal/history, Repeat, panel click capture, source
metadata/private validator failure, context/lock/Escape/background, Done→actual
puck owner tested. Existing Vertex/Edge/radial/background/release suites included.
Four reviewed runtime hashes/pins: Edge owner, shared panel, total-gizmo, background
policy; shell/recovery759. Vertex owner/core752, Edge geometry426, protected main/
Loop715/Multi and frozenbetas unchanged. Syntax/whitespace verified.
Publication/actualNode22/live verification pending; .759 device acceptance pending.

Manual checks:
- Compare Vertex and boundary/loose Edge Extrude: same axis chooser and top panel,
  Distance/Apply Exact/Repeat/Done; no old XYZ/Move controls.
- In each mode choose axis, pull; enter signed Exact, Repeat ON tap another source,
  then Undo/Redo. New tips/outer rails remain selected.
- Done/background restores puck and navigation; repeat next launch. Edge Free
  remains perpendicular to edge; Vertex Free follows view plane.


### .759 publication verification — 2026-10-08

Runtimeb2b5752804be956489e5f007d2f4859331fa1a9b published. Actual Node22 Topology run37757723383/job113246285445:1916tests/1814PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .758. Pages37757723210 succeeded. Live shell/version/all four changed runtime modules, unchanged Vertex Extrude and frozenBeta6 version byte-match tested checkout. Focused62PASS. Device .759 acceptance pending.
