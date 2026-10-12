# BoxLab AI Handoff — .834 linked disappearance diagnostics

## Current state — 2026-10-12
CrisBezz/BoxLab main; live https://crisbezz.github.io/BoxLab/; release0.36.18.834.
User PASS .831 mixed reference project Open, guide lock/visibility and editing/history.
User PASS .830 Balloon/merge/navigation remains protected. .832 user FAIL: moved Linked Duplicate disappears on Face-mode selection. .833 retest pending. Repository is source of truth; read AI_WORKFLOW,
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

## .833 current repair / .832 user FAIL
User reports moved Linked Duplicate disappears when selecting Face mode. Existing
saveActive chooses placement vs component mutation based on current mode; main switches
mode before rendering, so an unsaved Object move can be reinterpreted as shared geometry
with stale instance matrix. Automated real-owner fixture reproduces source corruption,
not full WebGL disappearance. Manager window-capture mode-button click flush saves outgoing
linked Object placement before document main handler mutates mode. Face/Edge/Vertex tests
preserve source/peer placement and then propagate genuine component edits. No gesture/
transform kernel change or protected Multi1.0 edit. Manager833; other project owners832,
Curve830 unchanged. Full local validation and publication results below when verified.

## .834 diagnosis / .833 FAIL
User reports .833 no good; moved linked copy still disappears on Face switch. Do NOT
claim .833 solved the device failure. New build adds read-only linkedModeTrace through
existing Gesture Debug. Before/Saved/After mode switch shows mode/object ID, live/stored/
evaluated/source mesh centres, object/solo/body visibility and face count. Off by default;
LINKED summaries share existing bounded pinned diagnostic section so pointer traffic cannot
bury them. No geometry/placement/render behavior change; .833 guard remains pending.
New test proves trace off/read-only and distinguishes stale evaluated vs moved live bounds.
Need on-device evidence before further algorithm changes; cloud WebGL unavailable.

## Next
User: VIEW > Gesture Debug, Linked Duplicate, move aside, Face; screenshot pinned LINKED
BEFORE/SAVED/AFTER lines. Compare geometry bounds and visibility to distinguish source/
placement corruption from render/bridge/context reset. If no LINKED lines, mode shortcut
bypasses expected click owner. .832/.833 remain FAIL/pending; .831/.830 protected.

## Release protocol
/nextbuild: audit, narrow implementation on main, reviewed child/parent cache pins,
coherent title/data/visible/version.json/recovery pins, all tests, docs, publish and
readback. User responds PASS/FAIL; protect passes. Publishing already authorized.

## .831 publication verified
Releasef7ae31c4636f8161ba14987f064dc93d30c7f405; tree616a35bf09d3c01db956db443dd63cc24840c5e3.
Node22 CI38237955024/job114773194656 SUCCESS2219PASS/0FAIL/0skip.
Pages38237954570 SUCCESS; live shell/manifest/three changed owners byte-match.
.831 iPad mixed-guide Save/Open acceptance pending.

## .832 publication verified
Releasecce8e76a25d78d40e33fe63ba4441363fda70876; treea508345e37ea19ad835bdccb67c777fa99aa9208.
Node22 CI38239991844/job114779926952 SUCCESS2223PASS/0FAIL/0skip.
Pages38239990977 SUCCESS; live shell/manifest/three changed owners byte-match.
.832 linked-instance project iPad gate pending.

.833 full local Node24:2225PASS/0FAIL/0skip; iPad mode-switch retest pending.

## .833 publication verified
Releaseaf69a754f0e6005c11f577e9d834c5b8e98a7264; treed2bd74cd6c611263888e6b44b625888cfc51a769.
Node22 CI38240986196/job114783239634 SUCCESS2225PASS/0FAIL/0skip.
Pages38240986065 SUCCESS; live shell/manifest/manager byte-match.
User must retest moved Linked Duplicate > Face before accepting fix.

.834 full local Node24:2226PASS/0FAIL/0skip; device failure unresolved pending trace.

## .834 publication verified
Release49e6449772222413a6b8972ad005f80bd8c09f14; tree9de1b70e9417417f15f4a165dc0772da4641e172.
Node22 CI38242145811/job114787121113 SUCCESS2226PASS/0FAIL/0skip.
Pages38242145077 SUCCESS; live shell/manifest/manager/Debug byte-match.
Read-only diagnostic release, not a claimed fix. Device trace needed.
