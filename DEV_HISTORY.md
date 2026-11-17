

# .1174 — Mode Paint and optional top-left panels — 16 November 2026

User confirms .1173 PASS; protect navigator size, lighting and navigation. Move the original Paint entry into Mode Select, retaining the UV painter and Done owner, with an active Paint highlight. VIEW General Settings adds persisted Mode select at top left and Select options at top left choices alongside Snap. Original panels remain in place; measured widths place enabled panels horizontally in Mode / Snap / Select order, with 8px top/left inset and 8px gaps. Disabled choices retain bottom placement. No modelling, history, Multi1.0 or Helios changes.

Validation: full local suite 3,462/3,462 PASS, zero failures/cancelled/skips (104.616s); final Paint/release focused 8/8 PASS, placement/preferences 3/3 PASS and shell/toolbar/release 25/25 PASS. Syntax and diff checks pass. Browser visual run was unavailable because Chromium could not create its process singleton socket; no native iPad acceptance claimed. Initial stale release/CSS assertions were corrected without removing behavioral coverage.

Device checks: Paint from Mode Select then Done; toggle each placement; enable all three and inspect ordering/gaps; reload and rotate to verify persistence and spacing. Publication is via the connected GitHub release branch, followed by a guarded fast-forward of main and live-byte verification.

## .1174 publication verified

Runtime `c49bf4ba625f0d0cde60a1579539493e9e052c8a` is on main. Pages `43842223919` completed successfully. Cache-busted live version.json, index.html, general-settings.js and viewport-paint.js byte-match the tested checkout. Full local regression: 3,462/3,462 PASS; final Paint highlight/release checks: 8/8 PASS. Hosted Topology `43842225103` was still running at this evidence point; no hosted PASS claimed. Ready for iPad checks listed below; .1173 user PASS protected.

# .1175 — left-edge panel stack and bottom spacing — 16 November 2026

User rejects .1174 horizontal placement. Enabled top panels now stack VERTICALLY along the left edge in Mode / Snap / Select order; all left edges stay 8px from the viewport and each gap is 8px. Placement measures actual panel heights and updates on resize. Mixed checkbox choices skip panels located at the bottom. Bottom Snap placement now uses the actual shorter Select panel height after Paint moved, eliminating the retired Paint-button gap; when Select is at top, bottom Snap uses its empty rail position. Paint remains in Mode Select, and user explicitly confirms it is visible. No Paint behavior changes.

Final focused placement/preferences/toolbar/release checks: 13/13 PASS; all eight placement combinations and bottom offset are checked. Syntax/diff checks pass. Full local regression: 3,462/3,462 PASS, zero failures/cancelled/skips (119.553s). Final bottom-spacing amendment is covered by the 13/13 focused checks. Publication proof will follow. Preserve .1173 navigator PASS and prior modelling/history/Multi protections. Device: all top enabled gives Mode then Snap then Select down the left; all off gives a tight 8px Snap/Select gap; mixed settings and reload/rotation keep left alignment. Paint opens and Done exits.

## .1175 publication verified

Runtime `32aa77e52631274dbdee9383ddc5f6d3fa8667c4` published on main. Pages `43848212921` completed SUCCESS. Cache-busted live version.json and general-settings.js byte-match the tested checkout; release .1175 confirmed. Full local regression 3,462/3,462 PASS; final amended placement/release checks 13/13 PASS. Hosted Topology `43848213169` was in progress at last query; no hosted PASS claimed. Ready for device checks of vertical left stack, tighter bottom rail gap, mixed choices and persistence. Paint visibility user-confirmed.

# .1176 — close vacant bottom panel slots — 16 November 2026

User confirms .1175 PASS: protect vertical top-left stack, 8px gaps, bottom Snap/Select gap and Paint in Mode Select. When Mode is moved to top, its old bottom reserved height is now released. Bottom Select sits at the original status-lane anchor (desktop 27px / compact 25px plus safe-area policy); bottom Snap follows above it by its actual height + 8px. If Select is also at top, Snap occupies the released Select slot. Existing .1175 measured top ordering and Snap offset already handle moved Snap/Select; the new class-scoped anchor completes all mixed combinations. Returning Mode to bottom restores its accepted reserved slot. Original nodes, listeners, Paint/history/modelling/Multi/Helios untouched.

Focused preferences/placement/toolbar/release checks pass 14/14, including all eight placement combinations, resized heights and both desktop/compact anchor rules. Full local suite and publication evidence follow. Device: Mode only at top => Snap and Select lower with no vacant Mode slot; toggle Snap/Select top choices; restore all bottom; reload/rotate and verify status lane and 8px gaps.

## .1176 publication verified

Runtime `8913f783b1210617092134cfe8e2b5d294cc826c` published on main. Pages `43850878723` completed SUCCESS. Cache-busted live version.json, index.html and general-settings.js byte-match tested checkout. Full local regression 3,463/3,463 PASS, zero failures/cancelled/skips (124.840s); focused placement/toolbar/release 14/14 PASS. Syntax and diff checks pass. Hosted Topology `43850879381` was in progress at last query; no hosted PASS claimed. Device checks ready: Mode-only top lets bottom Select and Snap slide into the released bottom slot; mixed settings, all bottom, reload/rotation and 8px gaps. .1175 user PASS protected.

# .1177 — eliminate pre-module tools and oversized-logo flashes — 16 November 2026

User confirms .1176 PASS; protect accepted mixed top/bottom panel placement and all earlier navigator/Paint/modelling behavior. Reviewed supplied refresh recording: transient old drawer and oversized header logo occur before module styling settles. Root cause in source: Focus drawer display:none only installed by view-modes.js, and header logo 34px dimensions only by topbar-layout.js. Both now exist in the render-blocking viewport-toolbar-shell.css, before body paint; logo also has HTML width=34 height=34 for intrinsic space before image decode. Header alignment/gap matches final layout. Existing html.boxlab-focus-view gate remains; original Focus toggle can reveal tools. No startup timeout, blanket app hiding, second UI/renderer, or gesture/history changes. Original late rules match the early state exactly. Repin changed stylesheet and release/cache closure.

Focused first-paint/release checks 7/7 PASS; new tests check shell Focus state, stylesheet-before-body placement, scoped drawer hiding, original toggle and matching HTML/early/late logo dimensions. Full local regression and publication evidence follow. Native device gate: refresh repeatedly, watch for old tools/oversized logo, toggle Hide Tools off/on, then check accepted panel placement/Paint/navigation. Supplied recording stays out of repo.

## .1177 publication and validation verified

Runtime `6edf877ce79f120526d3ed2184fb45a4f8a4da75` published; Pages `43852201610` completed SUCCESS. Cache-busted live version.json, index.html and viewport-toolbar-shell.css byte-match tested checkout. Full local suite ran 3,465 checks: 3,464 PASS / 1 FAIL (128.560s); sole failure was toolbar-startup-983's exact old logo markup lacking the newly required width/height. Corrected that assertion in `84cb25dca5d396f70619bb87208a17d4addca004`; rerun affected startup/first-paint/release tests 10/10 PASS. No runtime changes followed the full suite. No unqualified rerun-full-suite PASS claimed. Hosted Topology `43852201664` was in progress at last query; no hosted result claimed. Native refresh flash acceptance pending; .1176 user PASS protected. Device checks: repeated refresh with tools hidden, logo stays small; toggle Hide Tools off/on; accepted panel positions and Paint entry remain.

# .1178 — viewcube action corners and orbit lock — 16 November 2026

User requests Nomad-style viewcube controls. Existing navigator now has four 38px corner buttons: upper-left orbit lock, upper-right original frameAllBtn (Extents), lower-left original floorToggleBtn (Plane/Grid/Off), lower-right Home glyph replacing 3D, using the same setView('axon') owner. Frame/Floor DOM nodes and listeners move from the top bar; toolbar decoration now leaves navigator-owned buttons in place. No proxy duplicate or second frame/floor implementation. Cube SVG keeps accepted 112.5px size and mode lighting; host shifts left to fit corners within right safe area. Home means the existing axon/perspective return, not new saved cameras.

FreeOrbitControls owns orbitLocked and setOrbitLocked: stop residual spin on toggle, suppress only _rotateLeft/_rotateUp tumble. Existing two-contact direct view-axis twist, original pan projection and pinch remain enabled. Logo drag also refuses tumbling while locked; explicit face taps/Home/Extents remain available. Lock is session-only, initially unlocked; button exposes pressed state and Unlock label. No new raw viewport pointer listener, saved-project data, history or geometry changes. Main/topbar/view module loader keys refreshed for changed nested owners. Protected Multi1.0 unchanged.

Focused navigator/action-reuse/real camera gesture/release checks 20/20 PASS. Tests exercise locked combined pan/pinch/twist with both anchors preserved, blocked single-contact movement, unlock restoration, original Extents/Floor listeners and Home callback. Syntax/diff pass. Full regression/publication evidence follows. Device checks: four corners, Lock→single-finger orbit blocked→two-finger pan/twist/pinch→Unlock; Extents fits, Home returns axon; Plane/Grid/Off cycles; normal logo taps/drag, Paint and top/bottom panel positions. .1177 startup fix native acceptance not inferred from this feature request.

## .1178 publication verified

Runtime `737170b5479dea03312368fe133fc301fc37eac3` is on main. Cache-busted live version.json, index.html, logo-viewcube.js, free-orbit-controls.js and viewport-toolbar-controls.js byte-match tested checkout. Full local suite 3,467/3,467 PASS, zero failures/cancelled/skips (130.454s); focused action/gesture/release 20/20 PASS; syntax/diff checks pass. Pages `43855652696` built successfully and live bytes are verified. Hosted Topology `43855655522` was in progress at last query; no hosted PASS claimed. New test file Git blob and all edited runtime assets verified against release branch. Native corner layout/targets and locked gestures remain device checks. .1177 native startup flash acceptance still unconfirmed; no PASS inferred.

# .1179 — brighter grid and six orthographic planes — 16 November 2026

User confirms .1178 PASS: protect four navigator action corners, orbit lock preserving two-finger pan/twist/pinch, Home/Extents/Floor owners and cube appearance. GridHelper remains the only grid owner: line colours raised to centre 0x9aa8bb / minor 0x627085, opacity Studio .5 / other modes .65. Original 12-unit span, 24 divisions retained. Grid mode continues to hide solid Studio floor and contact shadow, including in 3D; Plane/Grid/Off and Clean View behavior remain original.

Ground presentation now tracks original controls change events through one lightweight callback (no frame polling or scene traversal per gesture). Dominant camera axis selects XY for Front/Rear and YZ for Left/Right at origin; Top/Bottom retain XZ ground. Exact original grid position/quaternion are kept in a WeakMap and restored when perspective returns. Initial/apply synchronizes immediately; replacement controls detach prior listener. No new grid, geometry/helper allocation per frame, saved state, input owner or modelling changes. Main/ground parent loader pins and release graph refreshed. Protected Multi untouched.

Focused floor lifecycle, all six orthographic normals, perspective restoration, floor exclusion and release checks 10/10 PASS; syntax/diff pass. Full regression/publication evidence follows. Device: select Grid, inspect stronger contrast; tap Front/Rear/Left/Right/Top/Bottom; Home returns ground grid without solid floor; Plane and Off still cycle, lock/navigation and startup smoke. Native visual strength remains device acceptance.

## .1179 publication verified

Runtime `b5831f5eb1901fcc8ed5bec4f6f22aa43c771aa4` published on main. Pages `43857253919` completed SUCCESS. Cache-busted live version.json, index.html, main.js and ground-polish.js byte-match tested checkout. Full local regression 3,468/3,468 PASS, zero failures/cancelled/skips (125.640s); focused floor/orthographic/release 10/10 PASS; syntax/diff checks pass. Hosted Topology `43857254985` was queued at last query; no hosted PASS claimed. Ready for native contrast and six-view checks; .1178 user PASS protected. New runtime uses original grid only, with restored 3D ground transform and retained floor/contact exclusion.

# .1180 — startup grid hidden and decimal subdivisions — 16 November 2026

User confirms .1179 PASS for stronger grid, all six orthographic planes and 3D floor replacement; reports initial grid flash and requests 0.1 subdivisions / white 1-unit major lines. Original GridHelper is now constructed once through viewport-grid.js: span 12, divisions 120 (0.1-unit cells), four vertex colours per line pair, every tenth line white 0xf1f4f8 and minors pale 0x697481. Main uses this single factory in place of its original GridHelper constructor; no second helper or overlaid major grid. Original -1.55 ground height retained. Geometry holds 484 vertices; no dynamic rebuild or per-frame allocation added.

Factory sets visible=false BEFORE scene.add and first render. The existing ground presentation owner alone exposes grid when Grid is selected, removing the default Three visible=true startup flash. Plane/Grid/Off preference, .1179 ortho orientation/restoration, Clean View and floor/contact exclusion retained. Main loader and new module cache graph reviewed. Protected modelling, Multi, orbit lock, navigator and Paint unchanged.

Focused geometry/floor/ortho/release checks 11/11 PASS. Actual geometry verifies all 121 coordinates per axis, 0.1 spacing, every 1-unit major and both exact vertex palettes; initial hidden state and original main scene wiring checked. Full regression/publication evidence follows. Device: refresh in default Plane mode without grid flash; select Grid, count 10 cells across 1-unit cube width and inspect major/minor contrast; six ortho views/Home restore; Plane/Grid/Off and lock smoke.

## .1180 publication verified

Runtime `8e51ea121756f7f033b4451c007f302bb07e852b` on main; Pages `43858930604` completed SUCCESS. Cache-busted live version.json, index.html, main.js and new viewport-grid.js byte-match tested checkout. Full local suite 3,469/3,469 PASS, zero failures/cancelled/skips (126.170s); focused grid geometry/floor/ortho/release 11/11 PASS; syntax/diff pass. New factory/test Git blob hashes verified against release branch. Hosted Topology `43858931353` was in progress at last query; no hosted PASS claimed. Native startup flash/major-minor contrast checks ready. .1179 PASS protected; six orthographic orientations and 3D ground grid remain accepted baseline.

# .1181 — continuous Plane / Grid footprint in 3D — 16 November 2026

User confirms .1180 PASS, but requests exact 3D Plane/Grid continuity. Audit: Studio floor follows visible model bounds, minimum span24, at bounds.min.y-.025; grid was fixed span12 at y=-1.55. The same GridHelper now fits the existing Studio floor world centre, height and actual rectangular footprint in perspective. Render-modes refreshStudio publishes its final floor transform to the existing ground owner; camera/ground synchronization also follows it. No duplicate model bounds/floor-size calculations or second grid.

viewport-grid fits the existing helper by regenerating only its line geometry when floor footprint/centre changes, disposing prior geometry; unchanged camera updates reuse it. Lines are clipped to floor edges and remain world-aligned every0.1, major every1, with accepted white/pale colours, without scaling cell size. Original startup hidden state, Plane/Grid/Off visibility, Clean View, six ortho plane normals, lock/Paint/history/Multi remain. Perspective return now intentionally fits the live floor instead of restoring obsolete fixed grid placement. Orthographic plane orientation remains the .1179 owner.

Focused grid/floor/ortho/release 12/12 PASS: exact translated floor world bounds/height, rectangular resize, world0.1 coordinates, unchanged geometry reuse, initial hidden state and original grid palettes. Syntax/diff pass. Full regression/publication evidence follows. Device: repeatedly cycle Plane→Grid→Off→Plane in 3D; same centre/height/extent; move/resize/import model then compare; verify0.1/1-unit lines, six ortho/Home and refresh no grid flash.

## .1181 publication verified

Runtime `bcaa902d4774533206c17c3338849095495c1c8c` on main; Pages `43860500128` completed SUCCESS. Cache-busted live version.json, index.html, viewport-grid.js, ground-polish.js and render-modes.js byte-match tested checkout. Full local suite 3,470/3,470 PASS, zero failures/cancelled/skips (124.857s); focused geometry/floor/ortho/release 12/12 PASS; changed JS syntax/diff pass. Hosted Topology `43860500509` was in progress at last query; no hosted PASS claimed. Device checks ready for same-height/centre/footprint Plane↔Grid swaps and moved/resized model updates, retained 0.1/1-unit grid, ortho/Home and no refresh flash. .1180 user PASS protected.

# .1182 — Knife across connected visible face strips — 16 November 2026

User requests Face > Knife across multiple edges with existing edge/vertex snaps; sketch was not received in this thread, so scope is a straight drag across a connected visible face strip. User separately confirms .1181 PASS; protect exact Plane/Grid footprint continuity and prior grid/navigation behavior. Original Knife owner/cleanDiagonal/connectVertices remain authoritative. End snap search now includes the currently visible face beyond start-incident faces; END/MID/PERP/EDGE priority and release hysteresis stay original.

Single-face cuts retain original path. Longer strokes plan perspective-correct shared-edge crossings along the screen segment against unchanged source. Visible hit depth rejects covered crossings; each interval must lie in a source face containing both boundary endpoints, refusing gaps/disconnected/ambiguous paths. All shared endpoints resolve once, then existing validated diagonals commit together. One history checkpoint; any failed split restores the entire source including groups/creases/loose metadata and preserves redo. Existing object/mode/geometry stale-source checks, cancellation and persistent Knife session retained. A per-drag picker is reused for endpoint motion and released on cancel/release; strip planning reuses one picker, not one geometry allocation per crossed edge. No second topology kernel.

Final focused Knife + release checks 68/68 PASS, including perspective/ortho strips, folded surfaces, END/MID endpoints, hidden back faces, disconnected gaps, late failure rollback, groups/creases and exact Undo/Redo; all original Knife tests retained. Syntax/diff pass. Full regression/publication evidence follows. Device: straight drag boundary-to-boundary across several visible faces; END/edge snaps and MID/PERP with inference on; one Undo/Redo for whole stroke; folded strip and normal single-face Knife, Done/cancel/navigation. .1181 PASS protected.

## .1182 publication verified

Runtime `781df44a0deee1537f0f8831b51a9bcf45ffb0be` published on main. Cache-busted live version.json, index.html and knife-tool.js byte-match tested checkout. Full local regression 3,477/3,477 PASS, zero failures/cancelled/skips (128.045s); final amended per-drag picker reuse/cancellation covered by Knife/release rerun 68/68 PASS. Changed JS syntax/diff pass; new test Git blob verified. Pages `43862424166` live files verified; hosted Topology `43862425457` was in progress at last query, no hosted PASS claimed. Device checks ready: straight multi-face drag with edge/vertex snapping, inference MID/PERP, folded strip, one-step Undo/Redo and normal Knife session exits. Sketch was not attached, so no exact sketch parity claimed. User .1181 PASS recorded and protected.

# .1183 — vertex-touching inward recesses and calmer labelled navigator — 16 November 2026

User accepts .1182 multi-face Knife but reports inward extrusion failures; further screenshot/tests identify both Loop/Knife faces and simultaneous selections touching only at one vertex, plus successive diagonal recesses. Reproduced on closedGrid4: after face21 recess -.096, four diagonal neighbours refused invalid-edge-or-face-topology. Normals/status are valid; exact corner-only cavity contact welds into a four-owner vertical edge. Do NOT weaken validateThrough or revive retired handlers.

Existing buildNegativeExtrude now retries ONLY diagnosed output four-owner contacts (no boundaries/degenerate/duplicate faces), matching bad-edge endpoint positions to original selected source corners. Those corners alone get a tiny finite corner relief, at most128*existing eps and1% adjacent edge length; too-small junctions refuse. All other footprint/depth stays unchanged; original source stays immutable. Bounded8 retries, original clipping/assembly/manifold and vertex-fan validation remain authoritative. Corner-only retries skip optional rectangular-shoulder retopology so the tiny valid junction stays intact. Ordinary successful cuts retain exact original path; genuine buildThrough four-owner refusal remains protected. This is a tolerance-sized geometric corner treatment, not merely status relabelling or invalid topology acceptance.

Navigator adds Front/Back/Left/Right/Top/Bottom text centred on each face with projected face-plane orientation, front-side culling and outlined text. Face labels do not consume pointer input. Exact original geometry/lighting/corners retained. orbitFromLogo uses half its prior angular gain; viewport orbit unchanged. Lock/Home/Extents/Floor retain owners.

Focused extrusion/Knife/Through/navigator/release123/123 PASS, including diagonal selections in four directions, sequential cavity neighbours, real UI preview/commit/Undo, Knife-created vertex-only pairs, exact recess depth, closed topology and bounded volume delta; face labels and exact half angular gain. Syntax/diff pass. Full regression/publication evidence follows. User .1182 ordinary multi-cut acceptance protected, its inward case fixed here; .1181 PASS remains. Device: two faces sharing only a vertex inward together; screenshot sequential diagonal recess; Knife split faces inward and UndoRedo; six view labels and half-sensitive drag, lock/Home smoke.

## .1183 publication verified

Runtime `d219b872bf7b4b12281ddd18663aacbd98f3368c` on main. Cache-busted live version.json, index.html, through-kernel.js and logo-viewcube.js byte-match tested checkout. Full local regression 3,486/3,486 PASS, zero failures/cancelled/skips (123.589s); focused junction/Knife/Through/navigator/release123/123 PASS; syntax/diff pass. Pages `43865009858` live files verified. Hosted Topology `43865010458` was in progress at last query; no hosted PASS claimed. New regression test blob verified against release branch. Device checks ready for vertex-only multi-selection inward, sequential diagonal recess, Knife source faces, UndoRedo and six labelled/half-sensitive viewcube navigation. Tiny diagnosed corner relief is deliberate finite geometry; closure validator was not weakened.

## .1183 user PASS — protected inward-extrusion regression contract — 17 November 2026

User confirms .1183 PASS and explicitly asks that the recurring inward-extrusion defect not return. Protect tests/corner-recess-1183.test.mjs and tests/knife-multiface-1182.test.mjs as required behavioral release gates. They cover vertex-only simultaneous selections, four diagonal directions, successive recesses next to an existing cavity, Knife-created diagonal faces, real preview/commit/Undo, closed/manifold output, exact depth and unchanged input. Genuine invalid Through four-owner refusal remains protected separately. Do not remove, skip, narrow or change these success expectations to accommodate a regression. A deliberate user-approved behavior change must explicitly revise the contract; ordinary refactors must preserve it.

For any Knife, Loop, extrusion, clipping, assembly, seam/weld or selection-owner change, run these tests and the full npm test suite before publication. CI through-regression.yml runs npm test on main pushes and PRs for src/tests/runtime asset changes; package.json includes every tests/*.test.mjs, including these files. Verified 17 November: targeted14/14 PASS. This is documentation/protection only; application remains .1183, no new runtime build or device test required.

Suggested next .1184 (not implemented): multi-face Knife preview feedback—mark crossed edges and distinguish a valid continuous face strip from a refused path before release. Preserve current snap/transaction/history owners; no new cutting kernel.

# .1184 — live Knife crossing / validity preview — 17 November 2026

User invokes /nextbuild after accepting suggested preview refinement. Existing Knife guide now shows markers at each interior crossed edge and a live face count for a valid snapped stroke. Invalid snapped paths render red with a refusal message; unsnapped guides stay neutral. Original endpoint END/MID/PERP/EDGE colours and snapping stay. Crossings come directly from the existing successful multi-face commit result, not a second screen/topology planner.

Preview executes the existing cutting owner on a private mesh clone; live source, selection/history/redo are untouched. It reuses the per-drag ray picker and coalesces raw Pencil moves to one evaluation per animation frame. Pending previews cancel on release/cancel/disarm/context change; all crossing markers clear with the guide. Release independently uses original transactional commit and one Undo checkpoint. No through-kernel, topology or cavity behavior changes; release/cache closure repinned. The .1183 inward-extrusion protected contract in AI_WORKFLOW remains mandatory.

Focused Knife/corner-recess/release78/78 PASS, including two crossing markers/three-face count, immutable source and history before release, red gap/refusal with redo retained, queued update coalescing and no late markers after cancel, all previous Knife snap/transaction tests and protected inward regressions. Syntax/diff pass. Full suite and publication evidence follow. Device: drag across several faces and inspect crossings/count before release; invalid gap/path turns red; release makes one cut/Undo; END/MID/PERP, Done/cancel and vertex-only inward extrusion smoke.

## .1184 publication verified

Runtime `411abfbb0dbe708291d49892fa3320adbf4cf18a` on main. Cache-busted live version.json, index.html and knife-tool.js byte-match tested checkout. Full local regression 3,489/3,489 PASS, zero failures/cancelled/skips (268.612s); focused Knife/protected inward-extrusion/release78/78 PASS; syntax/diff pass. Pages `44008803008` live files verified. Hosted Topology `44008803522` was in progress at last query; no hosted PASS claimed. New preview test Git blob verified against release branch. Inward kernel and protected regression files are byte-unchanged from accepted .1183. Device checks ready: crossing markers and face count, red invalid path, release/one-step Undo, cancel cleanup and inward-extrusion smoke.

# .1185 — reuse fixed-snap Knife preview validation — 17 November 2026

User confirms .1184 PASS and invokes /nextbuild. Protect accepted crossing markers, face count, red invalid paths, snapping, preview cancellation and one-step commit/Undo. Narrow next build avoids repeating the private cutting trial when the snapped endpoint is unchanged. A per-drag single-entry cache retains ONLY validity, segment count and crossing marker data—not the private mesh/history snapshot. Exact key includes snap kind/type/vertex/edge parameter, screen/world position and camera world/projection matrices and projection type. No approximate quantization or topology cache across drags.

Source/object/mode validation still runs before cache lookup. Snap/camera changes revalidate; unsnapped state clears the cache; source edits disarm; release always runs a fresh original commit. Invalid feedback may be reused only for the identical state and refreshes when endpoint becomes valid. Existing one-frame scheduling/cancellation remains. Through-kernel and protected inward regression files are byte-unchanged.

Focused Knife/protected inward/release81/81 PASS. New measured-work test:20 small moves around a fixed midpoint require1 source clone rather than20; changed snap, projection and world camera force new trials. Source edit cancels and invalid→valid refreshes; release still makes exactly1 Undo. Syntax/diff pass. Full suite/publication evidence follows. Device: hover/jitter around vertex/MID snap and check stable markers; move to another edge and verify refresh; release/Undo, invalid red and vertex-only inward extrusion smoke. This saves redundant work while snap holds, not a claim that all large-mesh preview costs are eliminated.

## .1185 publication verified

Runtime `f78d6e2b9f3d37a574fdef85cb520210b102856f` on main; Pages `44015332998` completed SUCCESS. Cache-busted live version.json, index.html and knife-tool.js byte-match tested checkout. Full local suite 3,492/3,492 PASS, zero failures/cancelled/skips (98.330s); focused Knife/protected inward/release81/81 PASS; syntax/diff pass. Hosted Topology `44015333203` was in progress at last query; no hosted PASS claimed. Inward kernel and protected test files remain byte-unchanged. Ready for device responsiveness/marker stability checks while snap holds, changed snap refresh, release/Undo and inward-extrusion smoke. User .1184 PASS protected.


# .1186 — scale corner-contact repair to large inward selections — 17 November 2026

User confirms .1185 PASS; reports five selected regions on a densely cut patterned solid cannot extrude through the rear surface. Reproduced a related size-dependent failure: 18 checkerboard regions on a closed 6x6 grid fail at shallow and through depths because corner relief stops after eight passes. Existing five-recess sloped fixture succeeds already, so screenshot parity is not claimed without the source model. Repair now bounds retries by the finite set of selected source vertices; each retry must still add at least one previously untreated corner. No change to cutter geometry, strict closed/manifold/winding validation, invalid Through refusals or tiny finite corner-web policy. Source remains immutable on trial/failure. Existing single-face and vertex-only contracts remain protected.

New tests/many-region-through-1186.test.mjs covers18 and32 corner-contact regions through the back, expected removed volume and absence of surviving caps, five recessed regions in a sloped dense pattern, real drag/commit plus exact Undo/Redo. Focused new/protected18/18 PASS (20.094s). Full suite/publication evidence follows. This extends correctness to larger selections; repeated trial rebuilding remains a performance limitation. Device: repeat attached five-region cut through; try a large checker selection; Undo/Redo; shallow vertex-touch recess and Knife snapping smoke. If original five-region failure persists, obtain the saved BoxLab mesh to reproduce its exact topology.



## .1186 publication verified

Runtime `38933e322fbf25ef166f1a94d92c040db78ba43f` published to main. Pages `44078558910` build/report/deploy jobs SUCCESS; cache-busted live version.json, index.html, through-kernel.js and multi-face-direct.js byte-match tested checkout. Full final suite3,496/3,496 PASS, zero failures/cancelled/skipped (205.707s). Focused new/protected18/18, original Through12/12, release10/10 and shell/asset15/15 PASS; syntax/diff pass. First full run exposed stale release assertions and visible checklist labels; corrected without weakening behavioral tests, then full suite rerun PASS. Remote staged kernel/test blob hashes verified before fast-forward. Hosted Topology44078559787 was in progress at last observation; no hosted pass claimed. AI_WORKFLOW now explicitly requires large-region tests beside earlier inward gates. .1185 user PASS protected. Exact five-face screenshot topology not reproduced without source mesh; device repeat is required. If it persists, request saved BoxLab model rather than declaring every topology fixed. Known cost: repeated bounded trials may be slow for large dense selections.



# .1187 — preserve multi-face selection when launching Extrude/Inset — 17 November 2026

User marks .1186 FAIL: selected faces become unselected when choosing Extrude, before geometry can be tested. Audit found main.js native setDirectTool explicitly calls clearSelection on Extrude/Inset arming; normal newer document interception can avoid that legacy path, but its fallback semantics were wrong. Native arming now preserves an existing Face selection (including primary and full index array), while switching from another component mode still clears incompatible selection. Radial launch snapshots faces before hub closure/proxy click and restores them afterward only when mode, mesh and active-object identities still match. No deferred resurrection across object changes and no geometry/history operation on launch. Both Extrude and Inset covered. Existing direct controller and geometry owners remain authoritative; through-kernel unchanged from .1186.

New tests/face-extrude-launch-1187.test.mjs exercises actual native setDirectTool, actual radial click handler with a selection-clearing proxy, changed-object refusal, real direct click → selected pair → inward drag → one Undo/exact source restore. VM fixtures test owner behavior, not whole-browser propagation; local Chromium launch was blocked by environment socket restrictions, so no physical-browser pass claimed. Protected Knife/corner/many-region tests remain mandatory. Focused23/23 PASS; full suite/publication follows. Device: select multiple faces → radial Extrude and check all stay highlighted; drag inward/through; Undo/Redo; launch Inset; Done then select another group and repeat. .1186 is FAIL for selection launch, .1185 PASS retained.



## .1187 publication verified

Runtime `1418d544507bd49c107e77f4fa550e3a798fff47` on main; Pages44080441872 build/report/deploy jobs SUCCESS. Cache-busted live version.json, index.html, main.js and total-gizmo.js byte-match tested checkout. Full suite3,501/3,501 PASS, zero failures/cancelled/skipped (132.339s); focused launch plus protected inward/Knife/many-region23/23 PASS. Syntax/diff pass; staged new test Git blob verified against local before main fast-forward. .1186 FAIL recorded for selection lost on launch; no new device PASS claimed. Hosted Topology44080443039 was in progress at last observation; no hosted pass claimed. Kernel geometry unchanged. Native button and radial launch retain multi-face selections; context guards prevent restoration into another object/mesh/mode. Device ready: multi-select → Extrude retains highlight, inward/through drag, Undo/Redo, Inset retention and repeat with another selection. VM owner tests cover transitions; local full Chromium launch blocked by environment socket policy.



# .1188 — warning-based NOMAD geometry fallback for mismatched UVs — 17 November 2026

User asks that stale UVs warn rather than block NOMAD export. File NOMAD now explicitly requests allowGeometryFallback from the existing async map adapter. Preflight identifies stale/evaluated/SubD/partial/invalid UV correspondence, or maps without UVs, before paint preparation/conversion. Only affected export-local objects omit glbPassthrough and colour/roughness/metalness/opacity paint resources; source objects, paint, stored UVs and history remain intact. Valid objects keep UV/maps in mixed scenes. Existing geometry resolver, native writer, facegroups and container validation remain authoritative. Strict default adapter/core callers still reject invalid UV transfer; there is no catch-all suppression of geometry/template/budget errors. Existing native NOM format uses its established neutral UV placeholders for untextured geometry; no usable source UVs/textures are transferred for fallback objects.

Download status starts with WARNING and count; a persistent File note identifies affected objects/reasons and says original UVs/paint remain in the project. It does not silently discard source data or require a confirmation dialog. Removed premature File-level opacity refusal so mismatch fallback can strip opacity locally; valid-UV opacity remains refused by native core as before. Export loader and changed async adapter cache pins refreshed.

Focused10/10 PASS: topology mismatch, partial UV, SubD, mixed valid+stale scene, unchanged source/resource identity, facegroup retention, real File NOMAD download and persistent warning; original strict UV writer contracts retained. Full regression/publication follows. Device: edit an old UV model then File→NOMAD; verify download plus warning and import geometry/facegroups; verify valid UV model retains textures; return to BoxLab and confirm UV/paint data remains. .1187 awaits device selection-retention result; no unreported PASS inferred.



## .1188 publication verified

Runtime `36b47e2b88e2823e5911ae0ad1dde4d34198b262` published to main. Pages44082841702 completed SUCCESS; build/deploy/report jobs successful. Cache-busted live version.json, index.html, export-as-panel.js and nomad-packed-maps.js byte-match tested checkout. Full local suite3,507/3,507 PASS, zero failures/cancelled/skipped (93.407s); focused NOMAD warning/strict UV10/10 PASS. Syntax/diff pass; staged new test Git blob verified against local before fast-forward. Hosted Topology44082843031 was in progress at last observation; no hosted pass claimed. Strict native writer and modelling kernels unchanged. Device ready: edited UV model→File NOMAD downloads with warning, open in Nomad to inspect geometry/facegroups; valid UV model retains textures; BoxLab project still retains source UV/paint. .1187 device status remains unreported, .1186 FAIL preserved.



## 17 November 2026 — .1188 user PASS and coordinated next-build audit

Cris confirms current .1188 PASS; protect warning-based NOMAD export of incompatible-UV geometry and preservation of source UV/paint data. No separate .1187-only device result is invented. Detailed current-source audit: [BoxLab and Helios Studio next builds](docs/NEXT_BUILDS_AUDIT_2026-11-17.md). Recommended next BoxLab build: real-browser selection/radial/Extrude/inward/Undo coverage; shared texture-slot repair and small surface-opacity Reset repair; then measured modelling/navigation performance, authored-opacity NOMAD handoff and accepted Helios setup/fidelity work. Shared allocator wraparound reproduced in both repos with non-GPU dependencies; Helios async/material-fidelity gaps audited. BoxLab .1188 hosted Topology44082843031 now confirmed SUCCESS. Production WASM remains unpromoted; do not repeat .1152 workload. Audit only—runtime stays .1188, no queued feature implemented. Full prior suite3507 PASS; no unchanged runtime retest claimed.

