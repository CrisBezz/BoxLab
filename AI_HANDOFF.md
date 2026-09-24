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

- Current live version / branch target: **v0.36.18.452**
- Current main HEAD at audit: **b4ad4077d6813df50699fb53dccd11252809d5b5**
- Latest code-bearing release merge: **v0.36.18.451 / PR #138 / squash `b4ad4077d6813df50699fb53dccd11252809d5b5`**
- Latest regression: **35984043420 PASS**
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
- Phase D — Construction tools: **mature current slice**
- Phase E — Import / repair / handoff: **active**
- Phase F — iPad UX polish: **continuous as real issues surface**

## Current development

### v0.36.18.452 — Authoritative tool ownership + Boolean one-step Undo

- Hands-on .451 retest passed Extrude Through, Revolve Profile and UI presentation, but Inset, Edge Bevel, Vertex Bevel, Boolean Undo and Edge Revolve still failed.
- Root cause for the modelling-tool failures: the transform layer could still begin a Move/Scale/Rotate gesture while a direct component tool was armed. Through survived because its transactional takeover has its own higher-priority path.
- `transform-upgrade.js` now explicitly yields whenever Face Extrude/Inset, Edge Bevel, Vertex Bevel or Edge Revolve owns the interaction.
- Proven modelling controllers remain byte-for-byte unchanged: `multi-face-direct.js?v=0.36.18.242`, `direct-bevel.js?v=0.36.18.253`, and `direct-multi-vertex-bevel.js?v=0.30.1`.
- Edge Revolve now exposes an authoritative `arm()` API; the clean launcher calls that directly instead of synthesising a click on hidden controls.
- Boolean Undo is converted from pre-mutation `checkpoint()` to the transactional scene pattern: capture exact pre-Boolean scene, perform the Boolean, then store that scene once with `checkpointSnapshot(beforeScene)` after successful result creation.
- This is a concrete regression fix, so `boolean-prototype.js` intentionally advances from the previously protected .369 pin to .452.
- Beta 5 remains blocked until hands-on confirms these five regressions.

### v0.36.18.451 — Cross-mode UI regression recovery

**Released on main via PR #138; squash merge `b4ad4077d6813df50699fb53dccd11252809d5b5`. Final PR regression run `35984043420` passed.**

- .450 hands-on testing found that the UI cleanup was too invasive: Boolean lost expected one-step Undo, Revolve Profile launch/cancel UX was incomplete, and Face/Edge/Vertex tool arming appeared broken across Inset / Through / Bevel workflows.
- Source audit confirmed the proven modelling controllers for Face Inset/Extrude/Through, Edge Bevel and Vertex Bevel were unchanged from the working .449 baseline.
- Restores the proven .449 shared Tool Session implementation rather than changing topology/model algorithms.
- Adds a late-loaded **presentation-only** UI wrapper that changes visibility after tool state changes but never calls `preventDefault`, never owns pointer events, and never mutates selection.
- Face exact controls are hidden at rest and relabel to **Extrude Exact** or **Inset Exact** only while that direct tool is armed.
- Edge Bevel / Edge Slide / Offset / Loop settings are contextual. Lathe/Revolve is a single launcher at rest; axis/segments/Apply/Cancel appear only while active.
- Vertex Slide and Vertex Bevel settings are contextual without changing their established arming controllers.
- Boolean keeps the protected `boolean-prototype.js?v=0.36.18.369` solver/history path and uses a presentation-only show/hide launcher; the wrapper adds no history operation.
- Revolve Profile is now directly launchable from Active Tools without first using Object > Add, and has **Cancel** which restores the pre-tool scene/history depth.
- Strong cavity-aware Extrude Through remains the required baseline; there is no intended reduction in supported Through behaviour.
- Beta 5 remains blocked until this recovery receives a hands-on pass.

### v0.36.18.450 — Tool-first UI/UX consolidation

**Released on main via PR #137; squash merge `d77ec35968d0f59a75747c7be573a3fc3d33bc8c`. Final regression run `35976396864` passed.**

- Begins the dedicated pre-Beta-5 UI/UX cleanup without changing modelling algorithms.
- Establishes the UI rule: **mode home shows tool buttons only; tool settings are visible only while that tool is active**.
- Fixes the shared Tool Session visibility bug where `.boxlab-tool-session-shell { display:flex }` could override `hidden=true` and expose inactive Object/Face session panels.
- Object Tool Sessions such as Symmetry/Bisect, Transform, Insert, Mesh Health, Array, Revolve Profile and Sweep now remain visually hidden until activated by their launcher/workflow.
- Face Shell settings remain hidden until Shell is launched.
- Vertex Slide exact controls/readout remain hidden until Slide is armed.
- Vertex Bevel Width + Exact controls/readout remain hidden until Bevel is armed.
- Boolean is migrated from an always-open operation block to a single **Boolean** launcher that opens a Tool Session containing Union / Cut / Intersect and Close.
- Protected modelling/navigation runtimes remain unchanged: `main.js?v=0.36.18.366`, `multi-object.js?v=0.36.18.367`, `multi-object-transform.js?v=0.36.1.0`, and `styles.css?v=0.36.18.270`.
- Next step after hands-on UI pass: freeze **Beta 5** for wider testing.

### v0.36.18.449 — Scrollable Viewport menu

**Released on main via PR #136; squash merge `df6f10db0df4fb6b8bdcc9af4367db9bf9c9827c`. Final regression run `35974096070` passed.**

- Fixes Viewport settings overflowing off-screen on iPad now that Facegroup colour controls increased menu height.
- Viewport panel now has a viewport-relative maximum height and vertical scrolling.
- Adds iPad-friendly inertial scrolling, contained overscroll and vertical pan touch handling.
- Keeps the Viewport button and floating-panel placement unchanged.
- No modelling, facegroup, export, selection or navigation behaviour is changed.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.448 — Facegroups first-activation fix

**Released on main via PR #135; squash merge `7c8eb0c1c36fe0bc8a69397390771043c0aefe20`. Final regression run `35970042762` passed.**

- Fixes a hands-on regression where entering Viewport > Facegroups could initially show the mesh nearly black until a palette button was pressed.
- Root cause: the first render-mode pass could occur before evaluated mesh/body geometry were fully synchronised; the vertex-colour material was still being assigned even when colour application failed.
- Facegroup material is now assigned only when the colour attribute is successfully generated.
- Entering Facegroups normalises the current viewport colour preferences, forces a clean viewport rebuild, then reapplies colours after the viewport settles.
- Failed first-pass colour application now falls back to the normal front material instead of rendering a dark/invalid vertex-colour state.
- No facegroup IDs, mesh topology, OBJ handoff data, or protected modelling/navigation runtimes are changed.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.447 — Facegroup colour controls

**Released on main via PR #134; squash merge `cfd8e9e64f84e8a3f5b19dfb0dd5de3f421a0bf3`. Final regression run `35955642406` passed.**

- Extends Viewport > Facegroups with contextual colour controls shown only while the Facegroups Render Look is active.
- Adds palette presets: **Default, Soft, Vivid, High Contrast**.
- Adds Saturation and Lightness controls.
- Adds a user-selectable **Ungrouped** face colour.
- Adds **Reseed Colours** to change deterministic group colour assignment without changing group IDs.
- Adds **Reset** to restore the default palette, saturation, lightness, seed and ungrouped colour.
- Preferences persist in browser local storage as viewport-only settings.
- No mesh topology, facegroup IDs, OBJ import/export data, or protected modelling/navigation runtimes are changed.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.446 — Viewport Facegroup Colours

**Released on main via PR #133; squash merge `fcd19de9f38bfca2d65a1de643387a64e03ab318`. Final regression run `35950814715` passed.**

- Adds **Facegroups** as a Viewport > Render Look option.
- Uses preserved `EditableMesh.faceGroups[]` metadata from .445; no mesh/export data is changed by the display mode.
- Each facegroup gets a stable deterministic colour from its group name.
- Ungrouped faces display in neutral grey.
- Facegroup colours are lighting-aware through a MeshStandardMaterial rather than a flat debug overlay.
- Active and inactive scene objects both use the evaluated display mesh, so Mirror/SubD inherited facegroups display correctly.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.445 — OBJ facegroup preservation foundation

**Released on main via PR #132; squash merge `66e9e6e00d7734a0c5f0df28b1f8413bd6a220b9`. Final regression run `35949682949` passed.**

- Corrects editable OBJ semantics so `o` defines BoxLab object boundaries while `g` is preserved as per-face facegroup metadata inside that object.
- Adds `EditableMesh.faceGroups[]`, aligned one-to-one with `faces[]`; clone and common face-topology methods preserve or inherit it.
- Editable OBJ import now keeps one OBJ object as one BoxLab object by default even when it contains many groups.
- Adds **Split objects by groups** in File > Import, OFF by default. When enabled, OBJ groups are deliberately split into separate BoxLab objects.
- OBJ export writes preserved facegroups back as `g` records within each `o` object instead of using `g` as a duplicate object record.
- Obvious descendants inherit parent facegroups through Extrude, Inset, face split, Triangulate, Mirror and SubD.
- Safe Repair preserves surviving facegroups; Auto Close creates new cap faces as ungrouped.
- Object transforms / linked-instance placement preserve facegroups through the existing mesh clone path.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.444 — OBJ export polish / topology preflight

**Released on main via PR #131; squash merge `b9e16eaedad2044c8ce031bc8ae56f7ee736de4f`. Final regression run `35934485708` passed.**

- Keeps the existing multi-object scene OBJ exporter as the authoritative export path.
- Adds an export-core preflight that resolves the exact mesh being written, including Mirror and optional SubD evaluation.
- Every exported object is audited with Mesh Health before serialization.
- OBJ output now embeds compact per-object health comments: Closed/Open/Issues, boundary count, non-manifold count, winding count, and triangle/quad/ngon mix.
- Export header includes a scene preflight summary with counts of closed-clean, open-clean, and issue-bearing objects.
- OBJ now writes both `o` and `g` records for each BoxLab object to improve handoff grouping in downstream apps.
- Export remains permissive: open/problem meshes are reported, not silently blocked.
- Status bar reports the export preflight immediately after download.
- Reference objects remain excluded exactly as before.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.443 — Mesh Health normals / triangulation controls

**Released on main via PR #130; squash merge `1313089ed7c445ac03124ad2a71f7185eb89afee`. Final regression run `35933890155` passed.**

- Adds explicit Object-level normals and triangulation preparation controls inside Mesh Health.
- **Unify Winding** propagates consistent face orientation across manifold connected faces without guessing outward vs inward.
- **Flip Normals** deliberately reverses every face in the active mesh.
- **Triangulate** converts polygon faces to triangles using projected ear-clipping rather than naive fan splitting, including concave n-gons.
- Unify Winding refuses invalid/non-manifold ambiguity and validates zero inconsistent winding before commit.
- Triangulate preserves vertices and validates that invalid/non-manifold/boundary counts do not worsen.
- Each operation is transactional and records one Object Undo step; Mesh Health refreshes immediately afterward.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.442 — Mesh Health boundary diagnostics

**Released on main via PR #129; squash merge `cd3bc0ad6b5da3298b1b3e9d408e49c03c2f4a71`. Final regression run `35929633430` passed.**

- Extends Mesh Health with stronger boundary diagnostics rather than another automatic repair.
- Boundary edges are grouped into connected components and classified as **loop**, **chain**, **branched**, or other.
- Mesh Health shows the number of boundary groups plus loop/chain/branched counts.
- **Select Boundary** exits Mesh Health into normal Edge mode with all boundary edges selected.
- **Select Non-Manifold** does the same for non-manifold edges.
- Diagnostic selection deliberately hands control back to the mature native modelling tools instead of inventing a separate viewport overlay/highlight system.
- No geometry mutation occurs during diagnostic selection.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.441 — Mesh Health Auto Close / Make Watertight foundation

**Released on main via PR #128; squash merge `d4e964e3741d7e53ac0176c1a811b05ea3edb727`. Final regression run `35928602689` passed.**

- Extends Mesh Health with conservative **Auto Close** for otherwise-clean open meshes.
- Reuses the existing Boundary / Fill rules: boundary components must be simple closed loops and cap winding is oriented opposite the neighbouring face along the shared boundary.
- Auto Close is enabled only for **Open · Clean** meshes whose entire boundary graph resolves into one or more simple loops.
- All simple boundary loops are capped in one transaction; multiple disjoint holes can be closed together.
- Branched/open boundary graphs, non-manifold input, duplicate/degenerate/winding issues, and other ambiguous topology are refused rather than guessed.
- Candidate topology must re-audit as **Closed · Clean** with zero boundary/non-manifold/winding issues before commit.
- Successful Auto Close is one Object Undo step and Mesh Health immediately refreshes to show the watertight result.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.440 — Mesh Health Safe Repair

**Released on main via PR #127; squash merge `73e6958874de73d8e553f0bb2ad73cd31c503004`. Final regression run `35858042579` passed.**

- Extends the .439 Mesh Health inspector with a deliberately conservative **Safe Repair** action.
- Safe Repair currently fixes only high-confidence topology defects: exact same-direction duplicate faces, zero-area faces, and accidental orphan vertices.
- Opposite-winding coincident faces are left untouched because they can represent ambiguous double-sided/shell intent.
- Holes, non-manifold structures, boundary reconstruction, and broad winding repair remain diagnostic-only for now.
- Repair runs on a cloned candidate first and is refused if invalid/non-manifold/winding issue counts worsen or the overall issue load does not improve.
- Apply is transactional through Object scene history and becomes one Undo step.
- Linked instances keep the existing shared-geometry / independent-placement contract because Object save-back remains authoritative.
- Mesh Health immediately re-runs after repair so unresolved findings remain visible.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.439 — Mesh Health / Inspect foundation

**Released on main via PR #126; squash merge `60187e2f17c444c319c6862a80e3a107588dc9cb`. Final regression run `35854298290` passed.**

- Starts Phase E Import / Repair / Handoff with a non-destructive Object-mode **Mesh Health** Tool Session.
- Reports verts/faces/edges plus triangle/quad/ngon mix.
- Distinguishes **Closed · Clean**, **Open · Clean**, and **Issues Found** rather than treating every open mesh as broken.
- Detects boundary edges, non-manifold edges, invalid/degenerate faces, zero-area faces, duplicate faces, inconsistent winding, orphan vertices, and intentional loose geometry.
- Refresh reruns the audit without changing geometry; Close exits cleanly.
- Uses the existing topology seam-conformance summary as the base rather than inventing a parallel topology definition.
- Frozen Beta 4 remains v0.36.18.427; protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

### v0.36.18.438 — linked-instance Insert Tool foundation

**Released on main via PR #125; squash merge `3483edd3b8809b38fca738ed8e6f3085bb2e26f6`. Final regression run `35843005403` passed.**

- Adds Nomad-inspired **Insert** beside Transform in Object Active Tools.
- Workflow: choose a source face on the selected editable object, then choose a target face on another visible object.
- The target pick creates a **Linked Duplicate**, not an independent copy: geometry stays shared through the existing sourceId/instanceMatrix architecture.
- The inserted source face lands face-to-face on the target using the same `surface-transform-core.js` placement engine as Transform.
- After placement, Pencil/mouse keeps the established Move → Rotate → Scale → Move tap-cycle; touch remains ordinary navigation.
- Move slides on the target surface plane, Rotate spins about the target normal, and Scale acts about the placement point.
- Cancel restores the exact pre-tool Object scene, including removing the inserted linked instance; Apply records one Object Undo step.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Beta 4 remains frozen at v0.36.18.427.


### v0.36.18.437 — Surface Transform face-to-face anchoring

**Released on main via PR #124; squash merge `5a6ef4338c2997b5e65dbf59f77bc129d7e152cd`. Final regression run `35841565536` passed.**

- Corrects .436 centre-of-mass placement after hands-on testing.
- Transform now uses a two-face workflow: first tap source face on selected object, second tap target face on another visible object.
- Source face centre is the placement anchor.
- Source face normal aligns opposite the target face normal for true face-to-face contact.
- Existing Move / Rotate / Scale tap-cycle is preserved exactly after placement.
- `surface-transform-core.js` now supports sourceAnchor/sourceNormal + oppose mode, keeping the future Insert Tool on the same placement engine.
- Beta 4 remains frozen at v0.36.18.427.


### v0.36.18.436 — Surface Transform Tool foundation

**Released on main via PR #123; squash merge `db817eb623ebc52ff2d7b6e344f2911873ead8d6`. Final regression run `35839401940` passed.**

- Product direction now includes a Nomad-inspired surface-relative Transform / future Insert workflow rather than separate conventional Align commands.
- New Object-mode Transform Tool: tap a target face on another visible object, selected object centre snaps to the hit and source +Y aligns to that face normal.
- Surface frame persists through Move / Rotate / Scale. Move slides across the target plane; Rotate spins around target normal; Scale works about the placement point.
- Pencil/mouse tap cycles Move → Rotate → Scale → Move. Touch remains protected navigation.
- Existing 15° rotation snap is reused.
- Tool is transactional via pre-launch Object scene capture: Cancel restores exact prior state; Apply checkpoints it as one Object Undo step.
- `surface-transform-core.js` is intentionally reusable by the planned Insert Tool, which should place linked instances through the same controller.
- Linked-instance placement should remain independent via existing Object-mode `instanceMatrix` derivation; shared geometry must stay protected.
- Beta 4 remains frozen at v0.36.18.427.


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

### Beta 5 checkpoint after .451 regression-recovery hands-on pass

1. Hands-on audit Object / Face / Edge / Vertex mode homes for any remaining orphan settings.
2. Fix only concrete UI regressions found in that pass.
3. Freeze the resulting clean main as **Beta 5** for wider user testing.
4. Resume Phase E / Phase F development from live main after the checkpoint.


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
- `src/boolean-prototype.js?v=0.36.18.369` is regression-protected; UI changes must wrap it rather than repin/rewrite it casually.
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
- Live main / active development target: **v0.36.18.438**

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

> Continue BoxLab from current main. Read AI_WORKFLOW.md, AI_HANDOFF.md, TEST_CHECKLIST.md, newest DEV_HISTORY.md and ROADMAP.md, then inspect current main before coding. Live development target is v0.36.18.438; Beta 4 is frozen at v0.36.18.427. Surface Transform .437 is the face-to-face placement baseline. Current work is the linked-instance Insert Tool using the same surface-frame controller and existing sourceId/instanceMatrix architecture. Preserve all protected iPad navigation, mature topology/construction systems, linked-instance geometry/placement separation, and src/multi-object-transform.js?v=0.36.1.0 exactly.
