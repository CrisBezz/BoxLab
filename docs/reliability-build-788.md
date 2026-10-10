# Build .788 reliability evidence

## .788 — Revolve launch contract and Cancel history repair — 2026-10-10

User .787 PASS recorded/protected: Edge repeated Y pulls, fresh Free/Plane session,
history/navigation. .786 Vertex/Face picking and accepted Edge remain protected.
Parent main `43889bf279386791f74c19f9416c26e3229e06d1`.
Audit current Revolve owner469/517 recovery/defaults, .389/.422 history and existing
.469/.517 tests. The two failing checks expect retired hidden launcher and Edit-off
creation; current launcher is always available and new construction starts editing.
Reconcile these two only, preserving all other historical assertions and core tests.

Behavior audit also reproduced a real Cancel bug: profile creation checkpoints
through actual object-history bridge and History.push clears redo or evicts oldest
undo at the limit. Original Cancel restored stack lengths only, yielding missing
redo tokens/wrong undo tokens. Existing Revolve transaction now retains shallow
copies of both stacks and restores entries in place on Cancel. Original token
identities preserve bridge WeakMap scene metadata. Apply drops saved rollback
entries through original completion listener. No new history owner or geometry
kernel; no Sweep/general-session rewrite. Revolve owner stamp/cache pin788 reviewed.

Reuse controlled DOM/dispatch/camera fixture with whole Revolve owner and real
Three/core/mesh/History; execute actual object-management installHistoryBridge with
controlled scene capture/restore, manager and shared-session boundary. Launcher
creates/reuses/cancels/restarts. Creation starts Edit, touch yields, Pencil authors
plane UV; Edit-off yields and reposition keeps UV; Apply selection/mesh and one
history step plus Undo/Redo verified. Mesh.clone normalizes missing group slots to
null for history equality; no Facegroup behavior changed. Cancel restores original
scene and exact redo/evicted undo tokens. Real bridge tagged redo restores future
scene after Cancel. Four mutations reject hidden launcher/Edit-off creation and
length-only undo/redo restoration. Not whole Safari, Object manager or shared-session
host execution; controlled adapters are explicit.

88focusedPASS. FullNode24:2087tests/2058PASS/29FAIL/0skip; exactly two reviewed .389/
.422 failures removed from787, no new identities. Remaining28source-pattern/1version-
pin stay active. Only runtime change is Revolve Cancel stacks/stamp; geometry,
launcher/Edit defaults, existing transforms and frozenBeta2–6 unchanged. Main/Face/
Vertex assist786, Through779/Multi1.0/Loop715 retained. Shell/recovery788, reviewed
Revolve URL/hash/stamp and two recovery URLs refreshed. Publication pending.
Next: audit remaining29 checks, then scoped Bevel/Knife/Loop reliability. Other
session Cancel length-only approaches (e.g. Sweep) require separate owner audit;
do not infer their safety from this Revolve fix.
Manual: create an undoable edit then Undo; open Revolve Profile, Cancel, Redo must
restore prior edit. Reopen, author simple profile, switch Edit off/on, Apply then
Undo/Redo. Confirm existing component selection/navigation remains intact.
