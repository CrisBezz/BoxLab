# BoxLab AI Handoff — .832 linked project instances

## Current state — 2026-10-12
CrisBezz/BoxLab main; live https://crisbezz.github.io/BoxLab/; release0.36.18.832.
User PASS .831 mixed reference project Open, guide lock/visibility and editing/history.
User PASS .830 Balloon/merge/navigation remains protected. .832 acceptance pending. Repository is source of truth; read AI_WORKFLOW,
this handoff, TEST_CHECKLIST, recent DEV_HISTORY and ROADMAP before changing code.
Frozen Beta7 .807 and Beta2–6 remain immutable. Protected Multi1.0/Loop715/
Extrude802/Boolean806 and historic user passes remain unchanged.

## Protected recent passes
.820 all-quad Balloon grids; .821 Pencil point merge; .824 inside-pad primary pointer
capture with external orbit/pan/pinch preserved; .825 codec; .826 basic Save download;
.828 .boxlab picker recognition; .830 zero failures plus new/legacy Balloon and merge.
.829 specific Open Cancel/Confirm/Add/history manual gate not separately confirmed.

## .831 native project workflow
Authoritative owners: object-management captureScene/restoreScene/File Save/Open;
multi-object manager/ID allocator; boxlab-project-codec versioned JSON v1.
Basic Save/Open now supports mixed editable meshes and reference guides. Existing
codec already retained reference kind/locked/visible/group/geometry/settings. Removed
blanket Open refusal, validates known kinds and requires references locked. Manager
always stages references locked and selects an unlocked editable object even if file
activeId points to a guide. Reference-only scenes refuse; no new reference-edit owner.
Three actual manager/Open/codec tests retain Cancel/refusal/rollback coverage. Full
local Node24:2219PASS/0FAIL/0skip. CI/publication verify separately. Manager831,
object-management831 and parent drawer831 share identical child URL; codec825,
Curve UI/core/adapter/Add830 and protected modelling owners unchanged.

Open initiated inside BoxLab: File > Open .boxlab from Files. Confirms replacement,
clears old Undo history on success. Cancel/refusal leave scene unchanged. Manager
rollback protects synchronous setup, not every asynchronous render failure.
Rich UV/material/texture/GLB resource pools still refuse; no full
history persistence or complete archival claim. Direct Files association needs native app.

## .830 compatibility details
New Balloon grids flag balloonGridVersion2, remove unused donor pole vertices and remap
faces. Older unflagged recipes preserve exact indices and remain editable. Do not
silently regenerate legacy indices. Grid checks Density4–12, all quads, oriented closed
incidence, Euler2, no orphan vertices and legacy eligibility. Unsafe donor-pole concavity
still refuses; no broader concave support. All five formerly failing tests retained/pass.
.830 release77cbbb6989d6949398a45eb60d1c7f8765818ae3; Node22 CI38236275255/
job114767622444 2216PASS/0FAIL/0skip; Pages38236275003 success, live bytes verified.

## .832 current linked project workflow
Existing codec persisted sourceId/instanceMatrix/world meshes; manager now reconstructs
linkedSources through existing matrixForInstance/localMeshFromWorld/meshesNear owners.
Both Save and Open validate links. Only canonical source-N IDs and finite invertible
affine matrices accepted; local topology/coordinates/creases/groups/loose channels must
agree between peers. Stage sources before mutation; rollback now includes nextSourceId.
Source allocator advances past reopened source numbers. Existing peer-sync propagates
component edits and retains separate world placements. No duplicate instance kernel.
Four actual manager/codec/peer-sync/Open/Save tests; full Node242223PASS/0FAIL/0skip.
Manager/Object-management/Drawer832 share child URL; codec825,Curve830 unchanged.

## Next
Obtain .832 Linked Duplicate > separate placements > Save/Open > component edit sharing,
independent Object move, Make Unique and Undo/Redo sanity. Then rich project resources
and measured performance; NOM/Curve cutters/UV remain queued. Preserve .831 guide and
.830 modelling passes. History is still cleared on successful Open, not persisted.

## Release protocol
/nextbuild: audit, narrow implementation on main, reviewed child/parent cache pins,
coherent title/data/visible/version.json/recovery pins, all tests, docs, publish and
readback. User responds PASS/FAIL; protect passes. Publishing already authorized.

## .831 publication verified
Releasef7ae31c4636f8161ba14987f064dc93d30c7f405; tree616a35bf09d3c01db956db443dd63cc24840c5e3.
Node22 CI38237955024/job114773194656 SUCCESS2219PASS/0FAIL/0skip.
Pages38237954570 SUCCESS; live shell/manifest/three changed owners byte-match.
.831 iPad mixed-guide Save/Open acceptance pending.
