# BoxLab — AI Development Handoff

## Read this first

This is the **current-state handoff**, not the historical archive.

Before changing code:
1. read `AI_WORKFLOW.md`
2. read this file completely
3. read `TEST_CHECKLIST.md`
4. read the newest relevant entries in `DEV_HISTORY.md`
5. inspect current `main`
6. read `ROADMAP.md` before choosing the next build

The repository is authoritative. `DEV_HISTORY.md` holds chronology; keep this file concise and current.

## Project

- Repository: `CrisBezz/BoxLab`
- Production branch: `main`
- Live app: https://crisbezz.github.io/BoxLab/
- Frozen Beta 2: https://crisbezz.github.io/BoxLab/beta-2/
- Frozen Beta 3: https://crisbezz.github.io/BoxLab/beta-3/
- Frozen Beta 4: https://crisbezz.github.io/BoxLab/beta-4/
- Product: **iPad-first touch/Pencil polygon modeller and Nomad Sculpt companion**
- Core principle: **Import → Clean → Model → Export → Nomad Sculpt**
- Product rule: stay direct, shallow and topology-aware; do not become Blender-on-iPad.

## Authoritative current state

Audited from `main` on 2026-09-23.

- Current live version: **v0.36.18.435**
- Current main HEAD at audit: **38b5b5a5486c0b4bd03e3024c19b0830b22817f4**
- Latest code-bearing release merge: **v0.36.18.433 / PR #120 / squash `ff9be6110c7e34b79fac08e82589b3bd40b66237`**
- Latest regression: **35812426602 PASS**
- Frozen release checkpoint: **Beta 4 = v0.36.18.427**
- Beta 4 frozen source commit: **ec45b3ba208ef3ffa40015d7a3b62666c63f379e**
- Beta 4 freeze PR: **#113**
- Beta 4 freeze merge: **2743d9d0e10f8fb9605e1e37ab92f0c53c636837**
- Beta 4 frozen regression: **35713131703 PASS**
- `/beta-4/` is immutable during normal development.

### Phase status

- Phase A — Clean for SubD: **frozen except concrete regressions**
- Phase B — Precision modelling: **planned slice complete**
- Phase C — Object / instance workflow: **mature baseline reached**
- Phase D — Construction tools: **active**
- Phase E — Import / repair / handoff: **next major phase after current Symmetry work**
- Phase F — iPad UX polish: **continuous as real issues surface**

## Current development

### v0.36.18.435 — Symmetry Align to Face + Flip Plane

**Released on main via PR #122; squash merge `6bf2b5a5308d639c0e03f7cd2862695d10624591`. Final regression run `35819789567` passed.**

- Adds one-shot Align to Face inside the Symmetry/Bisect Tool Session.
- Pencil/mouse tap on a source face sets plane point to the hit and plane normal to that face normal.
- Touch remains normal navigation while alignment is armed.
- Flip Plane reverses the plane normal in place so Keep +/- direction can be inverted without moving the cut.
- X/Y/Z presets, Move/Rotate plane ownership, snapping and arbitrary-plane Apply remain intact.
- Beta 4 remains frozen at v0.36.18.427.


### v0.36.18.434 — Symmetry plane transform ownership + arbitrary rotation

**Released on main via PR #121; squash merge `6cb0a5aca9d2d69dbed23511ef617d381a1871c6`. Final regression run `35818444568` passed.**

- Fixes .433 hands-on issue where Rotate acted on the source object instead of the yellow symmetry plane.
- While Symmetry / Bisect is active, shared Object transforms yield to the construction plane.
- Move/direct plane drag moves the plane; Rotate changes the plane normal; Scale is disabled during the session.
- X/Y/Z remain quick orientation presets; rotated planes become Custom.
- Existing transform X/Y/Z constraints and 15° rotation snap are reused for plane rotation.
- Core clipping/mirroring now supports arbitrary plane point+normal, so rotated previews and Apply are genuine oblique topology operations.
- Touch remains navigation; Pencil/mouse handles plane transforms.
- Beta 4 remains frozen at v0.36.18.427.


### v0.36.18.433 — Movable / snappable Symmetry plane

**Released on main via PR #120; squash merge `ff9be6110c7e34b79fac08e82589b3bd40b66237`. Final regression run `35812426602` passed.**

- Symmetry/Bisect plane is no longer locked to object origin.
- X/Y/Z plane offset is topology-aware in the core.
- Pencil/mouse drag on the yellow plane moves it along its normal while touch remains normal navigation.
- Geometry Snap targets Vertex, Edge, Midpoint and Face hit positions from active/visible geometry.
- Reset Origin restores offset 0.
- Keep + / Keep − and optional Mirror remain live while the plane moves.
- Mirrored results weld on the moved plane by translating to/from the proven origin-based Mirror engine.
- Face-normal orientation / Align to Selection remains a likely .434 refinement.

## Latest completed work

### v0.36.18.432 — Face Delete orphan compaction

User isolated the recent Solidify failure to Face Delete rather than Mirror.

Root cause:
- deleting three adjacent cube faces left an unused/orphan vertex
- Solidify offset solving iterates every vertex
- the orphan had no incident face normal and caused `zero-vertex-normal`
- Extract/Duplicate worked because that workflow already compacts the mesh

Current fix:
- `EditableMesh.compactUnusedVertices()` removes accidental orphan vertices
- remaps faces and creases
- preserves intentional `looseVertices` / `looseEdges`
- Face Delete runs compaction once after the requested multi-face delete transaction
- exact cube-minus-three-faces → Solidify case is regression-protected

Hands-on status: **PASS from user: “PERFECT!! Finally found the issue.”**

### v0.36.18.431 — Mirror-seam-aware Solidify

Keep this behavior:
- Solidify receives active Mirror axes
- boundary edges lying on an active mirror plane are treated as symmetry seams
- no Solidify side wall is created on the symmetry seam
- inner seam vertices stay pinned to the mirror plane
- validation uses the evaluated mirrored result
- Mirror remains non-destructive and enabled after Apply

This work remains valid even though the user’s original failing test was ultimately caused by Face Delete orphan topology.

### v0.36.18.428 — Symmetry / Bisect foundation

Current implemented foundation:
- Object-mode destructive **Symmetry / Bisect** Tool Session
- fixed object-origin plane
- X / Y / Z axis
- Keep + / Keep −
- optional **Mirror kept half**
- welded centre-plane result through existing Mirror path
- live translucent result preview + visible plane
- Apply = one Object-history step
- Cancel leaves source unchanged
- existing non-destructive Mirror remains separate

## Next intended build

### Potential follow-up v0.36.18.434:
- face-normal orientation / Align to Selection
- flip plane / side indication
- weld tolerance polish
- clearer preview-side visualization

After Symmetry/Bisect:
1. Mesh Health / Inspect
2. Make Watertight / Auto Close
3. stronger boundary diagnostics
4. normals / triangulation controls
5. export / handoff polish
6. GLB export only if it materially improves Nomad/3D handoff

## Protected interaction behavior

Preserve unless the user explicitly asks to change it:

- one-finger orbit
- two-finger pan
- pinch zoom
- two-finger tap Undo
- three-finger tap Redo
- no-jump orbit pivot
- persistent component selections during navigation
- Studio realtime default
- object management / Multi behavior
- current snapping behavior
- mature Through topology and cavity-aware Through behavior
- connected multi-face Extrude
- established Knife / Loop Cut / Bevel / Inset / Face Extrude behavior
- direct Edge Extrude ribbon workflow
- Tool Session ownership behavior
- transactional topology validation / rollback

## Critical protected files / pins

Do not casually edit:

- `src/multi-object-transform.js?v=0.36.1.0`
  - protected blob SHA: `0b6f676900bf9a3787cf420e276bbb0f57ac46ff`
- `styles.css?v=0.36.18.270` intentionally pinned
- `src/component-multi-init.js?v=0.36.18.314` protects fresh-load additive component Multi
- `src/main.js?v=0.36.18.366` remains the current main runtime pin
- `src/object-management.js?v=0.36.18.392`
- `src/drawer-ui.js?v=0.36.18.361`
- `src/boolean-ux-history.js?v=0.36.18.369`
- `src/quad-clean.js?v=0.36.18.339`
- no service worker
- avoid broad MutationObservers

Current live wrappers in `index.html` are versioned with the live release:
- `tool-session-ui.js?v=0.36.18.432`
- `solidify.js?v=0.36.18.432`
- `symmetry-bisect.js?v=0.36.18.432`
- `shell.js?v=0.36.18.432`
- `linear-array.js?v=0.36.18.432`
- `revolve.js?v=0.36.18.432`
- `revolve-profile.js?v=0.36.18.432`
- `sweep-path.js?v=0.36.18.432`
- `edge-extrude.js?v=0.36.18.432`
- `transform-upgrade.js?v=0.36.18.432`

Do not assume a wrapper’s cache pin equals the version of its core algorithm; inspect imports before editing.

## Mature Phase D systems

### Tool Session lineage

Shared Tool Session UX is now the expected architecture for substantial construction tools.

Migrated / implemented:
- Sweep
- Array
- Solidify
- Shell
- Revolve Profile
- Symmetry / Bisect foundation

Important behavior:
- exclusive ownership where appropriate
- Active Tools drawer stays available while session owns it
- navigation must continue to work
- Pencil/mouse modelling ownership must not steal normal touch navigation

### Edge Extrude

Mature current workflow:
- boundary edge / compatible non-branching chain / loose edge
- direct drag creates welded quad ribbon
- newly created outer rail remains selected
- tool remains armed for repeated pulls
- Free / X / Y / Z / Auto constraints
- Plane constraint = free 2D movement within plane perpendicular to grabbed edge
- can switch/deselect boundary edges while tool remains armed
- can drag a different valid edge directly to switch-and-extrude
- each pull is one Undo step

Do not extend Edge Extrude speculatively. Only revisit for a concrete modelling/UX case.

### Sweep

Sweep is mature enough to protect:
- Profile-first workflow
- selected Face / closed Edge-loop launch
- Follow Edges path authoring
- free Draw Path
- 3D Geometry Snap
- custom/open/closed profiles
- Tool Session PROFILE / PATH / FINISH stages
- correct closed-shell normals
- immediate redraw on Apply

### Solidify / Shell

- Shell currently behaves correctly with non-destructive Mirror.
- Solidify now also supports Mirror seam logic.
- Face Delete compaction fixed the orphan-vertex failure that masqueraded as a Mirror issue.
- If a future Solidify failure appears, first inspect mesh cleanliness / boundary topology before blaming modifiers.

## Known architecture lessons / failed approaches

Keep these so the next chat does not repeat them:

- **Do not bake Mirror into Solidify by default.** The .429 bake-on-apply experiment was the wrong modifier architecture.
- Solidify/Shell should operate on the authoritative editable base mesh; non-destructive Mirror should remain a modifier.
- Mirror-plane boundaries need special Solidify seam treatment, but not all Solidify failures are Mirror failures.
- Face deletion can expose orphan topology; compact after destructive face removal while preserving intentional loose geometry.
- Extract Faces works from a compacted mesh and was the clue that revealed the Face Delete bug.
- Do not patch topology failures by only special-casing the latest arrangement.
- Path tracing was abandoned; Studio realtime is the rendering path.
- Do not add Blender-scale scene-management complexity.

## Release checkpoints

- Beta 2: frozen legacy checkpoint
- Beta 3: **v0.36.18.371**
- Beta 4: **v0.36.18.427**
- Live main / active development target: **v0.36.18.435**

Future Beta folders are immutable snapshots. Normal development continues at the live root.

## Git / release workflow

User has repeatedly granted permission to create branches, open PRs, merge and update main without asking again.

For each build:
1. audit current `main`
2. make a narrow branch
3. add / update synthetic regression fixtures
4. update `version.json` and runtime pins only for code-bearing releases
5. update `AI_HANDOFF.md`, `DEV_HISTORY.md`, and `TEST_CHECKLIST.md`
6. open PR
7. wait for topology regression
8. fix real failures or stale contract tests
9. squash merge after PASS
10. record PR / merge SHA / workflow run
11. give the user only 3–6 focused hands-on checks

Documentation-only handoff cleanup does **not** require a runtime version bump.

## What to tell a new chat

Use this:

> Continue BoxLab from current main. Read AI_WORKFLOW.md, AI_HANDOFF.md, TEST_CHECKLIST.md, newest DEV_HISTORY.md and ROADMAP.md, then inspect current main before coding. Live development target is v0.36.18.435; Beta 4 is frozen at v0.36.18.427. .434 Symmetry transform ownership/arbitrary rotation is hands-on PASS. Current work adds Align to Face and Flip Plane to finish the main Symmetry construction-plane workflow. Preserve all protected iPad navigation, Tool Session behavior, mature Through, Edge Extrude, Sweep, Solidify/Shell, object-management behavior, and src/multi-object-transform.js?v=0.36.1.0 exactly.
