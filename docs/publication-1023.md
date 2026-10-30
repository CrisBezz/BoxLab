## .1023 — grid visibility / Pivot shortcuts / selected-Face edge snap — 30 October 2026

User1022 PASS protects top-right plane/grid/off cycle and contact-shadow hiding.
User reports Object/Edge pivot-edge alignment works well; protect those workflows.
User requests10% stronger grid,only two pivot icons during Pivot editing,and repair
of selected-Face edge alignment. Baseline main035072b2 / runtime4c10c95f (.1022).

Original ground-polish opacity increases relatively10%: Studio .18->.198,other looks
.34->.374. Original floor cycle/axes/Clean masks/contact shadow owners unchanged.
Original corner-controls hides all shortcut buttons/groups except Pivot and
World/Local while editing; original mode-specific visibility returns on exit.
Actual RGB gizmo axes/planes/rings preview and centre/Y turning remain visible and
unchanged. Pivot artwork/toolbar/history actions unchanged; no duplicate controls.

Reproduced Face error: a ray on a shared polygon edge can select the neighbour's
render triangle,using its normal even when another face is selected. Face placement
now requests selected polygons; per-drag surface/probes retain the latched polygon.
Nearest-surface depth ties prefer selected face. Filtering ray hits alone was
insufficient because exact boundary rays sometimes hit only ONE adjacent triangle.
Read-only fallback recovers selected neighbour ONLY on the same actual shared edge
of that already-visible nearest body,using original mesh edgeKey/faceNormal and a
bounded numerical tolerance. Front-facing check retained; no through-object picking,
new triangulation,diagonal snaps,geometry/history kernel or material edit. Unrelated
selected polygons and occluded/back faces cannot become targets. Object/Edge initial
picking stays unrestricted; all modes retain existing14/20px magnet and X/Z sign
selection with greenY normal. Draft/cancel/one-checkpoint/UndoRedo/SaveOpen retained.

76 focused checks PASS/0FAIL/0skip;3 new checks include reproduced pre-fix Face normal
and shortcut-visibility failures plus tilted-edge Object/Edge/Face mouse/Pencil/touch
parity and unselected/hidden-face refusal. Grid opacity assertions added to original
floor-owner tests. Original pivot projection/selection/history/codec/cancel/occlusion,
corner/toolbar/Objects/Clean/snap/release/cache/identity/comparison checks pass.
Syntax/whitespace clean. No full-suite/rendered-browser/native iPad PASS claimed.
Reviewed1023 ground+shared corner+pivot parents,TotalGizmo,object-management,
viewport-toolbar->topbar,face-layout->drawer and recovery/comparison cache closure.
Other import-parent changes are pins only. Transform owners/Multi1.0/frozen betas,
accepted floor/render/studio-polish and navigation/Paint/UV unchanged.

Published runtimeb45a3a9acd6f15b2d394e6c8f14ddd9fec1314e9; tested/uploaded tree
bf59592796d15b1623a58be8a443ef471b38301f equals fetched origin/main exactly.
All21 blobs hash-verified before non-forced expected-main update. Pages40996655063
SUCCESS;18/18 fresh live files byte-match tested source: shell/manifest,ground,
pivot/corner/TotalGizmo and parent/cache graph plus unchanged transform/Multi1.0/
accepted render/Studio-polish owners. Hosted40996655551 in_progress at proof;
no full-suite/native iPad PASS claimed. Build1023 LIVE / READY for testing.
DEVICE1023: grid subtly clearer; Pivot edit shows ONLY Pivot
and World/Local shortcuts,exit restores original icons; Face select->Pivot->drag
across face and to real edges,X/Z aligns and Y stays selected-face normal,model
still. Include shared-edge start and rotated face; Object/Edge quick parity; finish,
Local transform and UndoRedo. Next native Face feedback; NOM texture/PBR queued.

