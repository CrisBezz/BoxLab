# BoxLab AI Handoff — .842 progressive Live Array END transforms

## Current state — 2026-10-13
CrisBezz/BoxLab main; live https://crisbezz.github.io/BoxLab/; release0.36.18.842.
Read AI_WORKFLOW completely, this handoff, TEST_CHECKLIST, recent DEV_HISTORY and
ROADMAP before code. Repository is source of truth. Standing publish authorization.
Frozen Beta7 .807 and Beta2–6 immutable. Protect Multi1.0, Loop715, Extrude802,
Boolean806 and all accepted Pencil/navigation/selection behaviour.

## .842 scope — device acceptance pending
User PASS .841 protected: one object/count/END/reopen/Cancel/history/.boxlab checks.
Existing END gesture owner now has Live-only Move END / Rotate END / Scale END.
Rotate uses selected XYZ ring plus exact degree fields; scale uses END drag in Free
for uniform factors or axis cube for one factor, with exact XYZ scale fields.
Each intermediate interpolates XYZ degrees and XYZ factors linearly from original0°/1×
to END. Full turns preserved (360° is a turn, not zero). Each item rotates/scales about
its own source bounding centre; centres remain evenly spaced on existing END path.
Original unchanged. Preview and Apply use same arrayItemMatrix in live-array-core,
which still delegates mesh transformations/combination to existing instance/join owners.
No new raw pointer listeners, modelling kernel, history stack or protected Multi edit.

Optional rotation/scale/placement fields extend arrayRecipe v1; .841 recipes default
0°/1×/identity and preserve old encoded shape. Reopen retains a canonical shared frame
plus inferred whole-object placement, including nonuniform scale/shear, so combined
endpoint effects do not jump or change shape. Move END remains world-axis/view-plane;
Rotate/Scale handles follow the persisted array frame. Apply/Cancel/history still owned
by existing Array/object manager/session. Ordinary unchecked Array unchanged.
Child core/codec/management/drawer/Array graph repinned842; shell/recovery markers842.
Full local2247PASS/0FAIL/0skip; six new real geometry/raycast/gesture/history checks.
Publication and Node22/live verification appended after completion. Device retest pending.

## Protected .841 scope and authoritative owners
User requests Live Array: ONE persistent editable Object Browser object like Live
Boolean, with gradual last-item scale/rotation across the array. This first narrow
stage adds the optional Live checkbox to existing linear-array.js. Ordinary unchecked
Array still creates linked objects through existing end-copy/manager owners.
Live Apply replaces the independent source object's geometry with disconnected copies
and stores arrayRecipe v1 on that same object. Object row displays Array ×count.
Reopening existing Array launcher retrieves source/count/END vector; cyan preview hides
old result through manager display policy only, never changes stored visibility.
Count and END placement can be edited repeatedly. Cancel leaves scene untouched.
Undo during session cancels preview; Apply checkpoints pre-result mesh plus real scene
snapshot once, so Undo/Redo restores geometry AND recipe through existing history owner.

New live-array-core.js is recipe orchestration: reuse existing EditableMesh,
instance-core transform/derive placement and object-join combine. No new topology kernel.
Whole-object affine moves/rotations/scales are recovered on reopen. Non-affine component
edits refuse reopening instead of discarding them. Live creation currently refuses
linked/Boolean/rich-resource/SubD/Mirror objects; ordinary Array remains available.
Separate source component editing and conversion controls remain queued;
endpoint rotation/scale interpolation now shipped in .842. Default Live checkbox off; explicitly check it for new arrays.

object-management snapshots/restores and v1 .boxlab codec preserve/validate optional
arrayRecipe. No schema-version change; older projects retain original encoding.
Changed loader graph: Array841→core841; codec841→core841; object-management841→codec841;
drawer841→object-management841. Shell/main/recovery/manager parents coherently841.
Protected source modules/frozen betas unchanged. Tests reconcile three old Array cache
assertions with reviewed841 owner; all original semantic tests retained.

## Validation / device gate
Full local Node24:2241PASS/0FAIL/0skip. Four new native checks cover distribution,
source immutability, transformed reopen/refusal, real snapshots/codec, actual Array
Apply + manager replacement + scene Undo/Redo and session Undo cancellation.
Release9dcb5d538acb16a470e1b2cac9bacdc089b6a244; tree1caa33d0933512872831d9c43fe5206871f8c498.
Node22 CI38341669287/job115113811558 SUCCESS2241/0/0skip; Pages38341668618 SUCCESS.
Pinned live shell/manifest/Array/core/manager/codec/management/drawer byte-match.
Manual: Object Array→Live check→count4→END drag→Apply, one row; reopen change count/END,
Cancel then Apply; Undo/Redo; Save/Open then reopen; linked Save/Open sanity.
User PASS2026-10-13 protects .841 one-object/count/END/reopen/Cancel/history/project gate.

## Protected .840 shared-source drift repair
User PASS2026-10-13: Linked Duplicate/Array move→component modes, idle stability and
shared editing/history. Source/write loop resolved on device; protect core publication.
Exact cause: bridge-topology edges() wrapper assigns state.mesh=this for every mesh,
including inverse-local helpers. Legacy live bridge inferred live owner from those
helpers; repeated saveActive inverse placement moved sources without input.
.839 generic setter fix failed. .840 main publishes through dedicated publishCoreMesh
before state assignment/root rebuild. Generic legacy assignments cannot replace core.
Actual legacy/live bridge+manager chain:20redraws/1000idle reads stable; true component
edit shares. Do not suppress debug writes instead of preserving owner correctness.
.833/.836/.837 stale-drag candidate fixes failed device case; history retains evidence.
.840 release703f8ad78429697559c1be3b453fed812a322eae; CI38326579309 successful2237/0;
Pages38326579350 verified pinned bytes. .830/.831 and earlier accepted gates protected.

## Project persistence / remaining work
Existing File Save/Open + object-management snapshot + multi-object source pool +
boxlab-project-codec own persistence. Basic meshes, groups/settings/recipes, mixed locked
references and linked placement pool supported. Linked project device round-trip remains
worth checking beyond accepted drift gate. Source pool reconstruction uses existing
inverse placement, validates source IDs/finite invertible affine matrices/peer agreement;
allocator/history/render rollback guarded. Open confirms replacement and clears old Undo.
Rich GLB/UV/material/texture pools still refuse; full cross-session history/native file
association not implemented. .830 Balloon gridVersion2 removes orphan poles while legacy
recipes keep indices/editability.

## Next
Await .842 device tests: scale END uniformly/axis, rotate ring/degree fields, combine
with count/placement, Apply/reopen/Cancel/Undo/Redo, Save/Open and whole-object Move/reopen.
Record acceptance before expanding. Source component editing and explicit conversion
remain queued alongside richer project resources/measured performance; NOM/Curve cutters/
UV tools queued. Full requested Live Array scope lives in ROADMAP.md.

## Release workflow
/nextbuild = audit current main/live/pins; one narrow build; coherent release markers and
reviewed child+parent cache URLs/hashes; appropriate tests; update handoff/history/checklist/
roadmap; publish and verify. User PASS/FAIL becomes repository contract. No new numbered
build on PASS alone. Give short real iPad manual tests when release is ready.
