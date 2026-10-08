# BoxLab .758 — Radial spacing and Vertex Extrude controls

User requests hiding old Vertex Extrude Free/XYZ buttons, moving Vertex Extrude
into shared Face/Edge location and normalizing Face outer ring after Align removal.
Existing owners audited: presentation only, no pointer/kernel/history changes.
Vertex panel direction row remains hidden; viewport arrows/Free centre are sole
visible direction chooser. Exact/Repeat/Done retained.
Extrude inner0°/12-o'clock across Face/Edge/Vertex. Add moves to former Vertex
Extrude outer216° slot; all14Vertex tools remain. Bevel90° unchanged.
Face15outer tools spread evenly at24° intervals, clockwise order retained and
Circle0° anchored. Align remains on gizmo. Shared Join Coplanar Edge24°, Vertex
Clean Vertices288°/Merge Dist312° match Face slots; other shared slots retained.
Existing cross-mode placement assertion caught that Face-only spacing would break
shared outer positions; coordinated those three controls rather than weakening it.
58focusedPASS; fullNode24:1906tests/1804PASS/102FAIL/0skip, identical102failure
identities to757. Existing inventory/spacing/hidden-controls assertions extended;
no new duplicate implementation/tests. Computed outer-button bounds do not overlap
in Face/Edge/Vertex. Original inner geometry retained. Syntax/whitespace pass.
Two reviewed runtime hashes and shell/recovery/total-gizmo/Vertex-panel758 pins.
Original VertexExtrude752/core, main732/Loop715/Multi1.0 and frozenbetas unchanged.
Publication/Node22/live verification pending. Device .758 acceptance pending.

Manual checks:
- Vertex Extrude: only viewport axes/Free centre; Exact/Repeat/Done still present.
- Extrude at12-o'clock in Face/Edge/Vertex; Vertex Add accessible on outer ring.
- Face outer ring evenly spaced, all tools reachable; Bevel remains3-o'clock.


### .758 publication verification — 2026-10-08

Runtime39a699296bcf990cadecb7621f7f5c4c9970c61b published. Actual Node22 Topology run37754720314/job113236320113:1906tests/1804PASS/102FAIL/0skip; all102failure names exactly match local inventory and .757. Pages37754719444 succeeded. Live shell/version/total-gizmo/Vertex panel, unchanged Vertex Extrude and frozenBeta6 version byte-match tested checkout. Focused58PASS. Device .758 acceptance pending.
