# BoxLab .763 — Knife same-mesh source validity

.762 user PASS. Resume Bevel/Knife/Loop reliability. .755 Knife context guards mesh
identity/object/mode/lock, but same-instance geometry edits leave cached snaps and
face indices active. Whole-owner tests reproduce12 failures: changed coordinate,
vertex count, face winding/order or face count before move/release/state notification
still permits stale input. .763 retains an owned geometric source snapshot at down;
existing context validation compares vertex values and real face cycles before
endpoint work/commit and on bridge state. Invalid source uses existing disarm/
capture/marker cleanup; never restores the old source over a newer edit or adds
history. No changed snapping, thresholds, cut kernel, Repeat or raw pointer owner.

Geometry comparison is value-based: replaced arrays with identical values allowed.
Facegroup/crease metadata is not preview geometry; fresh tryCut snapshot preserves
latest metadata in committed source and history. No blanket metadata invalidation.
Thirteen new whole-owner/real-raycast cases: before12FAIL/1PASS, after13PASS; metadata
allowance, newer source/history/redo/capture/markers checked. Two legacy synthetic
startCut fixtures were missing newly required source: initial full run had17 extra
failures, fixed by calling same actual captureDragSource helper when constructing
their injected drag. No assertions removed or guard bypassed; whole-pointer-owner
cases remain separate.156focusedPASS including concave/refusal/exception and
Bevel/Knife/Loop/partial-chain/cage/history suites. FullNode24:1948/1846PASS/102FAIL/
0skip; all102 failure identities exactly match .762. Syntax/whitespace pass.
Knife hash/pin763, shell/recovery763; main762/scaffold761/Gate-Lasso-Drawer760/
Extrude759/Loop715/Multi1.0/frozen betas unchanged. Publication/live verification
pending; .763 device acceptance pending. No exclusions or CI gate installed.

Device checks:
- Bevel a cube edge, then make two Knife cuts; confirm accepted snaps/feel.
- Add a supported Loop cut afterwards and adjust slide.
- Undo/Redo each edit, then Done and orbit: no stuck Knife capture/markers.
In-place stale geometry mutation is covered automatically; no synthetic device
reproduction requested. Next varied Bevel/Knife/Loop reliability/test reconciliation.


### .763 publication verification — 2026-10-08

Runtime4b4f909d8ed2b1c0fda3174f07c6b53860a362ed published. Actual Node22 Topology run37772536234/job113295375073:1948tests/1846PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .762. Pages37772535751 succeeded. Live shell/version/Knife and unchanged main/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused156PASS. Device .763 acceptance pending.
