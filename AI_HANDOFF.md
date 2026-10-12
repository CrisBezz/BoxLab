# BoxLab AI Handoff — Work migration after .828 acceptance

## Verified state — 2026-10-12
Repository: CrisBezz/BoxLab, main; live https://crisbezz.github.io/BoxLab/; released version 0.36.18.828. User reports **PERFECT** on .828 iPad .boxlab Open recognition fix and is moving development to ChatGPT Work. Keep .828 protected. No new numbered build requested for migration. Read AI_WORKFLOW.md completely, this handoff, TEST_CHECKLIST.md, recent DEV_HISTORY.md and ROADMAP.md, then current code/release markers before making changes. Main is source of truth.

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

## Suggested next /nextbuild
After checking actual .828 device tests, strengthen safe basic Open round-trip and manager replacement/rollback/ID integrity with automation; audit preserved rich data and enable complete .boxlab resources in narrow stages. Nomad .NOM import remains queued, as does UV preservation/unwrap/painting, Balloon/Curve cutter consumers and large-mesh performance. Do NOT add a second modelling, scene, or gesture owner. Work mode should access connected GitHub repository, audit before edits and perform the repo's release protocol, including cache pins, fixtures, tests, handoff docs, main publication and short iPad test gate.

## Important release practices
/nextbuild = audit current main, implement one narrow build on main, repin nested dynamic imports and index, refresh index title/data-release/version.json/bootstrap pins, update tests/fixtures, DEV_HISTORY/TEST_CHECKLIST/ROADMAP/AI_HANDOFF, verify readback. User responds PASS/FAIL; record PASSes protected. Never claim CI passed without an actual test result.
