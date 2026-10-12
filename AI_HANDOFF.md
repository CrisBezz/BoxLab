# BoxLab AI Handoff — .838 exact shared-source-write evidence

## Current state — 2026-10-12
CrisBezz/BoxLab main; live https://crisbezz.github.io/BoxLab/; release0.36.18.838.
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

## .835 screenshot evidence / diagnostics correction
User screenshots .834 show live/stored/evaluated centres matching (1.707 then1.013,0,0),
source0,0,0 and body/object visible. User observes ORIGINAL object moves far away.
Do not conclude hidden body from these traces. The AFTER line used queueMicrotask in
window capture; browser microtask checkpoints can precede later target handlers, so
mode=object is not reliable final-state evidence. Face active + Edge footer suggests
possible interrupted render, not established root cause. .835 replaces AFTER scheduling
with setTimeout0, includes UI mode/all peer centres and visibility/inactive body count.
Existing Gesture Debug pins uncaught runtime/rejection and inactive render-skip errors.
Off by default; no geometry mutation/further speculative repair. Two tests cover true
post-handler sampling and off/enabled error reporting. User .832/.833 failure unresolved.

## .836 repair from .835 device evidence
Screenshot .835 BEFORE/SAVED:copyX1.65/sourceX0; AFTER face:copyX-16.498/sourceX-18.148,
UI/modeFace, visibletrue/bodytrue/inactive1. Shared source/live shift ~-18.148 confirmed;
not lost instance matrix or hidden body. transform-upgrade release at document capture
can be blocked by earlier document consumers. Its old gesture then handles same Pencil
ID later, applying delta from old plane/start after mode switch; component save propagates
the whole-object jump to shared source. Existing finish now window capture; mode-button
window capture commits/closes owned preview before manager placement save. No parallel
transform owner, no geometry/instance algorithm change. Two actual owner tests: mode
switch and consumed document release cannot revive move on reused ID. Whole rotate-owner
helper dispatch now models window before document completion. Full local2230PASS/0FAIL.
Only transform-upgrade runtime changes; other runtime pins repinned/reviewed with identical
bytes. Diagnostics remain available. User .832/.833 failures recorded; .836 iPad pending.

## .837 current repair / .836 FAIL
User .836 jump persists and follows initial move direction; Array also affected.
.836 fixed transform-upgrade owner only. Main also owns direct Object drag and receives
release on canvas; consuming upstream handlers may prevent its completion. Existing
main pointermove replaces mesh from startMesh and applies total delta; if drag survives
Face switch, same Pencil ID applies old Object translation in component context and
manager writes it into shared source. NEW actual-main-move + actual-manager-save fixture
reproduces source jump with old incomplete sequence. Straight/diagonal moves and a third
Array-style placed peer stay exact when completed, one Undo token/source revision0.
Main now retires only component-kind/Object-selection drag on window up/cancel, and calls
same endDrag before mode click mutates context. Non-Object tap completion unchanged.
No new transform maths/instance owner or Multi1.0 edit. Full local2232PASS/0FAIL/0skip.
Main837; other repinned runtime files unchanged. Prior .833/.836 incomplete owner fixes
are NOT device-accepted. .837 Linked Duplicate/Array iPad retest pending.

## .838 current diagnosis / .837 user FAIL
User reports .837 did not fix it. Both transform-upgrade and main drag repairs remain
unaccepted on device; synthetic stale-drag fixtures reproduce a possible corruption path,
NOT the established device root cause. Current manager source mutation automatically
infers component edit from currentMode; audit its exact write before changing semantics.
Read-only off-by-default traceLinkedSourceWrite logs LINKED SOURCE WRITE immediately
before BOTH Object-fallback and component source assignments: id/branch/mode, source
from/to centres, live/stored centres, placement translation and five caller frames.
Pinned through existing Debug; no instance/geometry behavior change. Test confirms true
component source mutation evidence with one revision, no extra mutation/off logging.

## Next
On .838 Gesture Debug ON, reproduce Linked Duplicate or Array Move→Face; obtain SOURCE
WRITE lines with stack. Need exact writer/trigger, not another before/after inference.
Then reproduce that path and fix authoritative placement/component boundary. Broader
features paused. User .831/.830 PASS protected; .832/.833/.836/.837 device FAIL recorded.

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

.835 full local Node24:2228PASS/0FAIL/0skip; linked device failure unresolved.

## .835 publication verified
Releasec46b2eff501e05989ab2de861fa2b2ff19b01362; treefbff479119df53209e04c11359300e249096a64f.
Node22 CI38245284982/job114797502516 SUCCESS2228PASS/0FAIL/0skip.
Pages38245284604 SUCCESS; pinned live shell/manifest/manager/Debug byte-match.
Diagnostic only; original-object drift not fixed/accepted.

## .836 publication verified
Release7b689c234474e27a5d5c042f57f2048d8f5a345e; tree33926a9397320b1f34c93726a29578e5fcc792c2.
Node22 CI38246212104/job114800613228 SUCCESS2230PASS/0FAIL/0skip.
Pages38246212136 SUCCESS; pinned live shell/manifest/transform owner byte-match.
Repair build, awaits moved Linked Duplicate→Face iPad retest.

## .837 publication verified
Release8386bedcdd75b72977d85bd45f076dce9728f387; treeb07166bc85ee839e4843f4cb1b1be599062922e3.
Node22 CI38247942108/job114806468896 SUCCESS2232PASS/0FAIL/0skip.
Pages38247941344 SUCCESS; pinned live shell/manifest/main owner byte-match.
Native main repair awaits Linked Duplicate/Array diagonal mode-switch iPad acceptance.

.838 full local Node24:2233PASS/0FAIL/0skip; device issue unresolved.

## .838 publication verified
Release37cbd70cb8fc6446529003c6c3c87c5e662187ab; treee5c28a09ba20c5a66ddb2f76bf440409ab25ef38.
Node22 CI38324508602/job115059953152 SUCCESS2233PASS/0FAIL/0skip.
Pages38324508260 SUCCESS; pinned live shell/manifest/manager byte-match.
Diagnostic only; .837 failure unresolved. Fresh-scene SOURCE WRITE screenshot required.
