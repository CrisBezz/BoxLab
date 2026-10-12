# BoxLab AI Handoff — .830 zero regression failures

## Verified state — 2026-10-12
Repository: CrisBezz/BoxLab, main; live https://crisbezz.github.io/BoxLab/; released version 0.36.18.830 (device acceptance pending). User reports **PERFECT** on .828 iPad .boxlab Open recognition fix and is moving development to ChatGPT Work. Keep .828 protected. Build .829 follows the user /nextbuild in Work. Parent main b13d1c86. Read AI_WORKFLOW.md completely, this handoff, TEST_CHECKLIST.md, recent DEV_HISTORY.md and ROADMAP.md, then current code/release markers before making changes. Main is source of truth.

## Recent accepted builds
- .820 Quadball: genuine all-quad gridded caps, no radial pole vertex; user PASS.
- .821 shared Curve/Balloon Pencil drag point to another → red merge target → release merges, Undo restores; user PASS.
- .824 drawing ownership regression hotfix: primary pointer drawing inside curve pad, no 3D camera movement; user PASS; preserve protected external finger orbit, two-finger pan/pinch.
- .825 in-memory JSON-safe v1 scene codec round-trip preflight; user PASS.
- .826 File > Save .boxlab (basic scene) browser download to iPad Files; user PASS.
- .828 File > Open .boxlab from Files: browser picker accept unfiltered, validated .boxlab extension after choosing, repaired .827 double-escape regex. User says PERFECT. This establishes successful recognition; do not infer that every cancel/confirm/edit/resource regression has been individually tested. .823 compact scrollable File menu and generic "Rotate device to landscape" were shipped; no separate explicit PASS recorded.
- Frozen Beta7 .807 must remain immutable. Protect Multi1.0, Loop715, Extrude802, Boolean806, and other historical user PASSes.

## Current native file workflow / limitations
Authoritative scene snapshot/restore owner: src/object-management.js; manager and object-ID allocator: src/multi-object.js; versioned JSON scene codec: src/boxlab-project-codec.js. Basic Save encodes mesh vertices/faces, creases, facegroups, loose topology, object metadata, groups, settings, procedural Boolean/Curve profiles and round-trip checks before a download. Basic Open is initiated **inside BoxLab** using File > Open .boxlab from Files > Browse/Downloads. A web app cannot yet register .boxlab direct Open In from iPad Files; that needs native app document registration. Open validates, reconstructs separately, refuses unsupported reference/linked-instance/rich-resource projects, and asks before destructively replacing the current scene. Confirm clears scene Undo history; Cancel leaves scene unchanged. No embedded GLB passthrough textures/UV/material resource bundles, no full history preservation. Do not claim complete project archival.

## .829 current build / validation
Existing manager replacement now stages independent meshes/settings, keeps live mesh identity,
and restores prior live geometry, objects/active/solo IDs, allocator, linked-source map and
Undo/Redo tokens on synchronous settings/render/outliner setup failure. History clears only
after successful setup. Reserved maximum safe ID refuses to leave space for the next Add.
Save status no longer incorrectly says Open disabled. Drawer dynamic import and shell now
load object-management with the same .829 URL, avoiding a second module evaluation.
Reviewed stale .828 shell pins and runtime hashes reconciled; unchanged assets retain bytes.
Five new tests exercise actual manager/Open functions with controlled owners and a native
EditableMesh codec reconstruction. Focused 12/12 PASS. Full local Node24:2216 tests,
2211 PASS,5 FAIL,0 skipped. Baseline b13d1c86:2211 tests,2181 PASS,30 FAIL. No new failure
identities;25 stale release-contract dependent checks resolved. Remaining five Curve/Balloon
checks stay active, recorded in docs/reliability-build-829.json; no full-green or Safari claim.
Protected Multi1.0/Loop715/Extrude802/Boolean806 and frozenBeta2–7 untouched.

## .830 current build
All five remaining tests resolved; full local Node24 2216PASS/0FAIL/0skip, none removed.
Runtime fix: new Balloon grid recipes carry balloonGridVersion2; compact unreferenced
pole vertices with remapped quad faces. Legacy recipes without flag retain exact layout
and remain editable; do not silently regenerate their indices. Grid test covers Density4–12,
all quads, directed closed incidence, Euler2, no orphan vertices and legacy eligibility.
Three stale tests corrected: query current SVG merge target after draw replaces nodes;
accept actual concavity refusal diagnosis; primary inside-pad touch authoring follows
protected824, outside-pad touch still yields. Concave817 deep notch refuses safely because
donor pole is outside visibility kernel; shallow notch accepted with donor parity. No
relaxed fold guard, new concave capability or altered donor. UI/core/adapter/Add830;
scene-manager/drawer829 still use identical object-management829 URL. No protected
modelling/frozenBeta changes. Node22 CI/publication must be verified separately.

## Suggested next /nextbuild
Obtain .830 iPad new/legacy Balloon, merge/Undo and navigation feedback plus .829
Save/Open Cancel/Confirm/Add/edit gate. Then staged .boxlab resources and performance,
followed by NOM/Curve cutters/UV workflow. Keep existing authoritative owners.

## Important release practices
/nextbuild = audit current main, implement one narrow build on main, repin nested dynamic imports and index, refresh index title/data-release/version.json/bootstrap pins, update tests/fixtures, DEV_HISTORY/TEST_CHECKLIST/ROADMAP/AI_HANDOFF, verify readback. User responds PASS/FAIL; record PASSes protected. Never claim CI passed without an actual test result.

## Publication verified — .829
Release commit b4ecfacdb667b7e9ab38c3b37aa643b476a4860c; tested tree
0922b4b6f8c243524fc3383f4bad1d64208159eb. Pages38234000894 succeeded;
fresh live shell/manifest and three changed runtime files byte-match checkout.
Node22 CI38234001316/job114760078286 confirms2216/2211PASS/5FAIL/0skip,
exact same five existing failure identities; CI is not green. iPad gate pending.

## Publication verified — .830
Release77cbbb6989d6949398a45eb60d1c7f8765818ae3; tested tree
5b44a811281881e48be8316723e3ccff54e262e2. Node22 CI38236275255/job114767622444
SUCCESS:2216PASS/0FAIL/0skip. Pages38236275003 SUCCESS. Fresh live shell/manifest/
Add parent/Curve UI/core/adapter bytes verified. All five failures resolved; iPad gate pending.
